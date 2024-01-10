<?php
/**
 * @package    Know Reservations
 * @subpackage Admin Models
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

/** @noinspection MissingSinceTagDocInspection */

namespace HighlandVision\Component\Knowres\Administrator\Model;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\AdminModel;
use HighlandVision\KR\Media\Images\Property;
use HighlandVision\KR\Session as KrSession;
use HighlandVision\KR\TickTock;
use HighlandVision\KR\Translations;
use Joomla\CMS\Factory;
use Joomla\CMS\Table\Table;
use Joomla\CMS\Versioning\VersionableControllerTrait;
use Joomla\Utilities\ArrayHelper;
use RuntimeException;
use UnexpectedValueException;

/**
 * Image model
 *
 * @since 1.0.0
 */
class ImageModel extends AdminModel
{
	use VersionableControllerTrait;

	/**  @var string The type alias. */
	public $typeAlias = 'com_knowres.image';
	/** @var mixed Batch copy/move command. If set to false, the batch copy/move command is not supported. */
	protected $batch_copymove = false;
	/**  @var ?string The prefix to use with controller messages. */
	protected $text_prefix = 'COM_KNOWRES_IMAGE';

	/**
	 * Delete Images
	 *
	 * @param  array  $pks Image IDs for deletion
	 *
	 * @throws Exception
	 * @throws RuntimeException
	 * @throws UnexpectedValueException
	 * @since  1.0.0
	 * @return bool
	 */
	public function delete(&$pks): bool
	{
		$property_id = 0;
		$ids         = ArrayHelper::toInteger((array) $pks);
		$db          = $this->getDatabase();

		for ($i = 0; $i < count($ids); $i++)
		{
			$query = $db->getQuery(true);
			$query->select($db->qn(['property_id', 'filename']));
			$query->from($db->qn('#__knowres_image'))
			      ->where($db->qn('id') . '=' . (int) $ids[$i]);

			$db->setQuery($query);
			$result = $db->loadObject();

			if (!empty($result->property_id) && !empty($result->filename))
			{
				$property_id = $result->property_id;
				$property    = new Property($property_id);
				$property->deleteImage($result->filename);
			}
		}

		parent::delete($pks);

		$row = $this->getTable();
		$row->reorder($db->qn('property_id') . '=' . (int) $property_id);

		return true;
	}

	/**
	 * Method to get a knowres record.
	 *
	 * @param  int  $pk  The id of the primary key.
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return false|object  Object on success, false on failure.
	 */
	public function getItem($pk = null): false|object
	{
		/** @var ImageModel $item */
		$item = parent::getItem($pk);
		if ($item)
		{
			$Translations      = new Translations();
			$item->description = $Translations->getText('image', $item->id, 'description');
			$item->alt_text    = $Translations->getText('image', $item->id, 'alt_text');
		}

		return $item;
	}

	/**
	 * Override publish function
	 *
	 * @param  array   &$pks    A list of the primary keys to change.
	 * @param  int      $value  The value of the published state.
	 *
	 * @throws Exception
	 * @since  3.1.0
	 * @return bool
	 */
	public function publish(&$pks, $value = 1): bool
	{
		if (parent::publish($pks, $value))
		{
			foreach ($pks as $id)
			{
				KrFactory::getAdminModel('servicequeue')::serviceQueueUpdate('updateProperty', $id, 0, 'ru');
				self::setUpdatedAt($id, 'image');
			}

			return true;
		}

		return false;
	}

	/**
	 * Save image
	 *
	 * @param  string  $filename  Image file name
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return bool
	 */
	public function store(string $filename): bool
	{
		$property_id = KrMethods::inputInt('property_id');
		$params      = KrMethods::getParams();
		$ordering    = (int) $params->get('new_ordering');

		$row                 = $this->getTable();
		$row->property_id    = $property_id;
		$row->filename       = $filename;
		$row->property_order = !$ordering ? 0 : $row->getNextOrder('property_id = ' . $property_id);
		$row->state          = $params->get('publish_image');
		$row->created_by     = KrMethods::getUser()->id;
		$row->created_at     = TickTock::getTs();
		$row->version        = 1;

		if (!$row->store())
		{
			echo $row->getError();

			return false;
		}

		if (!$ordering)
		{
			$row->reorder('property_id = ' . (int) $row->property_id);
		}

		return true;
	}

	/**
	 * Set image ordering after online shuffle
	 * It is used despite the error
	 *
	 * @param  string  $order  New ordering
	 *
	 * @throws RuntimeException
	 * @since  3.3.0
	 */
	public function updateOrdering(string $order): void
	{
		$ordering = explode(',', $order);

		$db    = $this->getDatabase();
		$query = 'UPDATE ' . $db->qn('#__knowres_image') . ' SET ' . $db->qn('property_order') . '=' . " CASE "
			. $db->qn('id');

		foreach ($ordering as $k => $v)
		{
			$query .= ' WHEN ' . (int) $v . ' THEN ' . (int) $k . '+1';
		}

		$query .= ' END ';
		$query .= ' WHERE ' . $db->qn('id') . ' IN (' . $order . ')';

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
		$data = KrMethods::getUserState('com_knowres.edit.image.data', []);
		if (empty($data))
		{
			$data = $this->getItem();
		}

		return $data;
	}

	/**
	 * Prepare and sanitise the table prior to saving.
	 *
	 * @param  Table  $table  Table data
	 *
	 * @throws RuntimeException
	 * @throws Exception
	 * @since  2.4.0
	 */
	protected function prepareTable($table): void
	{
		if (empty($table->id))
		{
			$table->created_at = TickTock::getTS();
			$table->created_by = KrMethods::getUser()->id;

			if (empty($table->property_order))
			{
				$db    = $this->getDatabase();
				$query = $db->getQuery(true)
				            ->select('MAX(property_order)')
				            ->from($db->qn($table->getTableName()))
				            ->where($db->qn('property_id') . '=' . $db->q($table->property_id));

				$db->setQuery($query);
				$max = $db->loadResult();

				$table->property_order = $max + 1;
			}
		}
		else
		{
			$table->updated_at = TickTock::getTS();
			$table->updated_by = KrMethods::getUser()->id;
		}

		$table->version++;
	}
}