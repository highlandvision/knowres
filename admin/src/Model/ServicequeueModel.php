<?php
/**
 * @package    Know Reservations
 * @subpackage Admin Models
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\Model;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\AdminModel;
use HighlandVision\KR\Session as KrSession;
use HighlandVision\KR\TickTock;
use HighlandVision\KR\Utility;
use InvalidArgumentException;
use Joomla\CMS\Factory;
use Joomla\CMS\Table\Table;
use Joomla\CMS\Versioning\VersionableControllerTrait;
use RuntimeException;
use stdClass;

use function array_map;
use function count;
use function implode;
use function is_countable;

/**
 * Knowres Service queue model.
 *
 * @since 1.0.0
 */
class ServicequeueModel extends AdminModel
{
	use VersionableControllerTrait;

	/**  @var string The type alias. */
	public $typeAlias = 'com_knowres.servicequeue';
	/** @var mixed Batch copy/move command. If set to false, the batch copy/move command is not supported. */
	protected $batch_copymove = false;
	/**  @var ?string The prefix to use with controller messages. */
	protected $text_prefix = 'COM_KNOWRES_SERVICEQUEUE';

	/**
	 * Check if property is for cluster and thus to be updated
	 *
	 * @param  int    $cluster_id   |ID of cluster
	 * @param  int    $property_id  ID of property
	 * @param  array  $cluster      Cluster setttings
	 * @param  array  $managed      Managed settings
	 * @param  array  $beyond       Beyond settings
	 *
	 * @since  3.3.0
	 * @return bool
	 */
	public static function checkCluster(int $cluster_id, int $property_id, array $cluster, array $managed,
		array $beyond): bool
	{
		$update = false;

		$managed = $managed[$property_id] ?? $managed[0];
		$beyond  = $beyond[$property_id] ?? $beyond[0];
		if ($managed || $beyond)
		{
			$property_cluster = $cluster[$property_id] ?? $cluster[0];
			if ((int) $property_cluster == $cluster_id)
			{
				$update = true;
			}
		}

		return $update;
	}

	/**
	 * Delete old service queue rows
	 *
	 * @param  string  $date  Delete before this date
	 *
	 * @throws RuntimeException
	 * @throws InvalidArgumentException
	 * @since  3.3.0
	 */
	public static function deleteOldQueue(string $date): void
	{
		$db    = KrFactory::getDatabase();
		$query = $db->getQuery(true);

		$conditions = array(
			$db->qn('created_at') . ' < ' . $db->q($date)
		);
		$query->delete($db->qn('#__knowres_service_queue'))
		      ->where($conditions);

		$db->setQuery($query);
		$db->execute();
	}

	/**
	 * Insert queue row
	 *
	 * @param  object   $xref       Service xref data
	 * @param  string   $method     Queue method
	 * @param  ?string  $arrival    Arrival for reervations or valid from date for rates
	 * @param  ?string  $departure  Departure fo reservations or valid to date for rates
	 *
	 * @throws Exception
	 * @since  3.3.0
	 */
	public static function insertQueue(object $xref, string $method, ?string $arrival = null, ?string $departure = null): void
	{
		$queue               = new stdClass();
		$queue->id           = 0;
		$queue->service_id   = $xref->service_id;
		$queue->foreign_key  = $xref->foreign_key;
		$queue->contract_id  = 0;
		$queue->agent_id     = 0;
		$queue->property_id  = $xref->property_id;
		$queue->arrival      = $arrival;
		$queue->departure    = $departure;
		$queue->availability = 0;
		$queue->actioned     = 0;
		$queue->method       = $method;
		$queue->state        = 1;
		$queue->created_at   = TickTock::getTS();
		$queue->created_by   = KrMethods::getUser()->id;
		KrFactory::insert('service_queue', $queue);
	}

	/**
	 * Get all the channels for property or all properties excluding any current unactioned queue record
	 * and update queue.
	 * If cluster is set then have to get all properties for cluster and update each
	 * NOTE: Combines all the previous update functions from earlier versions
	 *
	 * @param  string   $method       API method
	 * @param  int      $property_id  ID of updated property
	 * @param  int      $cluster_id   ID of updated cluster
	 * @param  ?string  $plugin       Service plugin to be updated or null for all
	 * @param  ?string  $arrival      Applicable arrival (valid from ) date for rates
	 * @param  ?string  $departure    Applicable departure (valid to ) date for rates
	 *
	 * @throws Exception
	 * @since  3.3.0
	 */
	public static function serviceQueueUpdate(string $method, int $property_id = 0, int $cluster_id = 0,
		?string $plugin = null, ?string $arrival = null, ?string $departure = null): void
	{
		$result = KrFactory::getListModel('servicexrefs')->getPropertiesForAllServices($property_id, $method, $plugin);
		if (is_countable($result) && count($result))
		{
			if ($cluster_id)
			{
				$settings_cluster       = KrFactory::getListModel('propertysettings')->getOneSetting('cluster');
				$settings_managed_rates = KrFactory::getListModel('propertysettings')->getOneSetting('managed_rates');
				$settings_beyond_rates  = KrFactory::getListModel('propertysettings')->getOneSetting('beyond_rates');
			}

			foreach ($result as $r)
			{
				if ($method == 'updateProperty')
				{
					$parameters = Utility::decodeJson($r->parameters);
					if (!isset($parameters->upload_properties) || !$parameters->upload_properties)
					{
						continue;
					}
				}

				if ($cluster_id)
				{
					if (!self::checkCluster($cluster_id, $r->property_id, $settings_cluster, $settings_managed_rates,
						$settings_beyond_rates))
					{
						continue;
					}
				}

				self::insertQueue($r, $method, $arrival, $departure);
			}
		}
	}

	/**
	 * Resend selected queue records
	 *
	 * @param  array  $pks  IDs to be resent
	 *
	 * @throws RuntimeException
	 * @since  1.2.0
	 */
	public function resend(array $pks): void
	{
		if (!is_countable($pks) || !count($pks))
		{
			return;
		}

		$db = KrFactory::getDatabase();

		$fields     = [$db->qn('q.actioned') . '=0'];
		$conditions = [$db->qn('q.id') . '=' . implode(' OR ' . $db->qn('q.id') . '=', $pks),
		               $db->qn('q.actioned') . '=1'];

		$query = $db->getQuery(true);
		$query->update($db->qn('#__knowres_service_queue', 'q'))
		      ->set($fields)
		      ->where($conditions);

		$db->setQuery($query);
		$db->execute();
	}

	/**
	 * Method to test whether a record can be deleted.
	 *
	 * @param  object  $record  A record object.
	 *
	 * @since  3.0.0
	 * @return bool  True if allowed to delete the record. Defaults to the permission for the component.
	 */
	protected function canDelete($record): bool
	{
		$userSession = new KrSession\User();

		return $userSession->getAccessLevel() == 40 || Factory::getUser()->authorise('core.delete', $this->option);
	}

	/**
	 * Method to get the data that should be injected in the form.
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return mixed The data for the form.
	 */
	protected function loadFormData(): mixed
	{
		$data = KrMethods::getUserState('com_knowres.edit.servicequeue.data', []);
		if (empty($data))
		{
			$data = $this->getItem();
		}

		return $data;
	}

	/**
	 * Update queue records to actioned
	 *
	 * @param  array  $ids  Queue ids to update
	 *
	 * @throws Exception
	 * @since  3.1.0
	 */
	public static function setQueueActioned(array $ids): void
	{
		if (is_countable($ids) && count($ids))
		{
			$db    = KrFactory::getDatabase();
			$query = $db->getQuery(true);

			$query->update($db->qn('#__knowres_service_queue'))
			      ->set($db->qn('actioned') . '=1')
			      ->set($db->qn('updated_at') . '=' . $db->q(TickTock::getTS()))
			      ->where($db->qn('id') . ' IN (' . implode(',', array_map('intval', $ids)) . ')');
			$db->setQuery($query);
			$db->execute();
		}
	}

	/**
	 * Prepare and sanitise the table prior to saving.
	 *
	 * @param  Table  $table  Table instance
	 *
	 * @throws RuntimeException
	 * @throws Exception
	 * @since  4.0.0
	 */
	protected function prepareTable($table): void
	{
		if ($table->method != 'updateAvailability' && $table->method != 'updatePropertyRates')
		{
			$table->arrival     = null;
			$table->departure   = null;
			$table->contract_id = 0;
		}

		parent::prepareTable($table);
	}
}