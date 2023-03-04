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
use HighlandVision\KR\Joomla\Extend\AdminModel;
use HighlandVision\KR\Session as KrSession;
use HighlandVision\KR\TickTock;
use Joomla\CMS\Factory;
use Joomla\Database\DatabaseInterface;
use RuntimeException;

/**
 * Knowres iCal block model.
 *
 * @since 1.0.0
 */
class IcalblockModel extends AdminModel
{
	/**  @var string The type alias. */
	public $typeAlias = 'com_knowres.icalblock';
	/** @var mixed Batch copy/move command. If set to false, the batch copy/move command is not supported. */
	protected $batch_copymove = false;
	/**  @var ?string The prefix to use with controller messages. */
	protected $text_prefix = 'COM_KNOWRES_ICALBLOCK';

	/**
	 * Get last ical block update
	 *
	 * @throws RuntimeException
	 * @since  3.4.0
	 * @return array
	 */
	public function getLatestUpdatePerProperty(): array
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select('MAX(' . $db->qn('c.created_at') . ')  as ' . $db->qn('maxdate'))
		      ->select($db->qn('c.property_id', 'pid'))
		      ->from($db->qn('#__knowres_ical_block', 'c'))
		      ->group($db->qn('pid'));

		$db->setQuery($query);

		return $db->loadAssocList('pid');
	}

	/**
	 * Delete blocks for a property
	 *
	 * @param  int                     $property_id  ID of property
	 * @param  int                     $service_id   ID of service
	 * @param  DatabaseInterface|null  $db           Database instance
	 *
	 * @since  3.3.0
	 */
	public function deleteExisting(int $property_id, int $service_id = 0, ?DatabaseInterface $db = null)
	{
		if (is_null($db))
		{
			$db = $this->getDatabase();
		}
		$query = $db->getQuery(true);

		$conditions[] = $db->qn('property_id') . '=' . $property_id;
		if ($service_id)
		{
			$conditions[] = $db->qn('service_id') . '=' . $service_id;
		}

		$query->delete($db->qn('#__knowres_ical_block'))
		      ->where($conditions);

		$db->setQuery($query);
		$db->execute();
	}

	/**
	 * Method to get a knowres record.
	 *
	 * @param  int  $pk  The id of the primary key.
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return false|object  Object on success, false on failure.
	 */
	public function getItem($pk = null): false|object
	{
		$item = parent::getItem($pk);
		if ($item)
		{
			if (isset($item->service_id) && $item->service_id > 0)
			{
				$service            = KrFactory::getAdminModel('service')->getItem((int) $item->service_id);
				$item->service_name = $service->name ?? $item->service_id;
			}
			else
			{
				$item->service_name = 'Manual Import';
			}

			$item->property_name = '';
			if (isset($item->property_id) && $item->property_id != 0)
			{
				$property            = KrFactory::getAdminModel('property')->getItem($item->property_id);
				$item->property_name = $property->property_name ?? $item->property_id;
			}
		}

		return $item;
	}

	/**
	 * Refresh ical data for a property
	 *
	 * @param  int    $property_id  ID of property
	 * @param  array  $blocks       New blocks to import
	 * @param  int    $service_id   Ical Service ID
	 *
	 * @throws Exception
	 * @since  3.3.0
	 */
	public function refreshIcalBlocks(int $property_id, array $blocks, int $service_id)
	{
		$db = $this->getDatabase();

		try
		{
			$db->transactionStart();
			$this->deleteExisting($property_id, $service_id, $db);
			$this->insertBlocks($blocks, $db);
			$this->deleteOldIcalData($property_id, $db);
			$db->transactionCommit();
		}
		catch (Exception $e)
		{
			$db->transactionRollback();
			throw $e;
		}
	}

	/**
	 * Method to test whether a record can be deleted.
	 *
	 * @param  object  $record  A record object.
	 *
	 * @since   3.0.0
	 * @return  bool  True if allowed to delete the record. Defaults to the permission for the component.
	 */
	protected function canDelete($record): bool
	{
		$userSession = new KrSession\User();

		return $userSession->getAccessLevel() == 40 || Factory::getUser()->authorise('core.delete', $this->option);
	}

	/**
	 * Delete old ical data introduced V3.3.0
	 * Should only be needed after first successful run of new code
	 *
	 * @param  int                $property_id  ID of property
	 * @param  DatabaseInterface  $db           DB Instance
	 *
	 * @since  3.3.0
	 */
	protected function deleteOldIcalData(int $property_id, DatabaseInterface $db)
	{
		$query      = $db->getQuery(true);
		$conditions = [
			$db->qn('property_id') . '=' . $property_id,
			$db->qn('black_booking') . '=2'
		];

		$query->delete($db->qn('#__knowres_contract'))
		      ->where($conditions);
		$db->setQuery($query);
		$db->execute();
	}

	/**
	 * Insert new ical blocks
	 *
	 * @param  array              $blocks  New blocks
	 * @param  DatabaseInterface  $db      Database instance
	 *
	 * @since  3.3.0
	 */
	protected function insertBlocks(array $blocks, DatabaseInterface $db)
	{
		foreach ($blocks as $block)
		{
			$db->insertObject('#__knowres_ical_block', $block);
		}
	}

	/**
	 * Prepare and sanitise the table prior to saving.
	 *
	 * @param $table
	 *
	 * @throws Exception
	 * @since  2.4.0
	 */
	protected function prepareTable($table)
	{
		if (empty($table->id))
		{
			$table->created_at = TickTock::getTS();
		}
	}
}