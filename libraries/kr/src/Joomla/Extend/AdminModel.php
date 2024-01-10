<?php
/**
 * @package     Know Reservations (KR)
 * @subpackage  Admin Models
 * @copyright   Copyright (C) 2020 Highland Vision. All rights reserved.
 * @license     See the file LICENSE.txt for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR\Joomla\Extend;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Logger;
use HighlandVision\KR\TickTock;
use HighlandVision\KR\Utility;
use Joomla\CMS\Form\Form;
use Joomla\CMS\Table\Table;
use RuntimeException;
use stdClass;
use UnexpectedValueException;

use function str_replace;

/**
 * KR extension of AdminModel
 *
 * @since 3.7.0
 */
class AdminModel extends \Joomla\CMS\MVC\Model\AdminModel
{
	/**
	 * Constructor.
	 *
	 * @param  array  $config  An optional associative array of configuration settings.
	 *
	 * @throws Exception
	 * @since  3.0.0
	 */
	public function __construct($config = [])
	{
		parent::__construct($config);
	}

	/**
	 * Set updated_at timestamp for publish/unpublish listing option
	 *
	 * @param  int     $id     ID of item
	 * @param  string  $table  Table to update (table name only)
	 *
	 * @throws Exception
	 * @since   3.3.0
	 */
	public static function setUpdatedAt(int $id, string $table): void
	{
		if ($id && $table) {
			$update             = new stdClass();
			$update->id         = $id;
			$update->updated_at = TickTock::getTS();
			$update->updated_by = KrMethods::getUser()->id;
			KrFactory::update($table, $update);
		}
	}

	/**
	 * Method to get a model record.
	 *
	 * @param  int  $pk  The id of the primary key.
	 *
	 * @since  1.6
	 * @return object|false  Object on success, false on failure.
	 */
	public function getItem($pk = null): object|false
	{
		return parent::getItem($pk);
	}

	/**
	 * Method to get the record form.
	 *
	 * @param  array    $data      An optional array of data for the form to interogate.
	 * @param  bool     $loadData  True if the form is to load its own data (default case), false if not.
	 * @param  ?string  $source    The form name if required.
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return Form|false
	 */
	public function getForm($data = [], $loadData = true, ?string $source = null): Form|false
	{
		try {
			if (empty($source)) {
				$source = str_replace('com_knowres.', '', $this->typeAlias);
			}

			return $this->loadForm($this->typeAlias, $source, ['control'   => 'jform',
			                                                   'load_data' => $loadData
			]);
		} catch (Exception $e) {
			KrMethods::message(KrMethods::plain('COM_KNOWRES_ERROR_FATAL'));
			Logger::logMe($e->getMessage());
			return false;
		}
	}

	/**
	 * Method to save the form data.
	 *
	 * @param  array  $data  The form data.
	 *
	 * @throws Exception
	 * @since  3.2
	 * @return bool  True on success.
	 */
	public function save($data): bool
	{
		if (KrMethods::inputString('task', '') === 'save2copy') {
			if (isset($data['name'])) {
				$data['name'] = Utility::generateNewName($data['name']);
			}

			if (isset($data['state'])) {
				$data['state'] = 0;
			}
		}

		if (!parent::save($data)) {
			throw new RuntimeException('Save failed with error ' . $this->getError());
		}

		return true;
	}

	/**
	 * Set form attributes
	 *
	 * @param  int     $setting   Setting for field
	 *                            0 = Optional, 1 = Required, 2 = Hidden
	 * @param  string  $name      Field name
	 *                            0 = Optional, 1 = Required, 2 = Hidden
	 * @param  Form    $form      Form object
	 *
	 * @throws UnexpectedValueException
	 * @since  4.0.0
	 * @return Form $form
	 */
	protected function setAttribute(int $setting, string $name, Form $form): Form
	{
		if ($setting == 2) {
			$form->setFieldAttribute($name, 'type', 'hidden');
		}

		if ($setting == 0 || $setting == 2) {
			$attr  = 'required';
			$value = 'false';
		}
		else if ($setting == 1) {
			$attr  = 'required';
			$value = 'true';
		}

		$form->setFieldAttribute($name, $attr, $value);

		return $form;
	}

	/**
	 * Prepare and sanitise the table prior to saving.
	 *
	 * @param  Table  $table  Table data
	 *
	 * @throws RuntimeException
	 * @throws Exception
	 * @since  3.2.0
	 */
	protected function prepareTable($table): void
	{
		if (empty($table->id)) {
			$table->created_at = TickTock::getTS();
			$table->created_by = KrMethods::getUser()->id;

			if (isset($table->ordering) && empty($table->ordering)) {
				$db    = $this->getDatabase();
				$query = $db->getQuery(true)->select('MAX(ordering)')->from($db->qn($table->getTableName()));

				$db->setQuery($query);
				$max = $db->loadResult();

				$table->ordering = $max + 1;
			}
		}
		else {
			$table->updated_at = TickTock::getTS();
			$table->updated_by = KrMethods::getUser()->id;

			if (isset($table->created_at) && $table->created_at == '') {
				unset($table->created_at);
			}
		}

		if (isset($table->version)) {
			$table->version++;
		}
	}
}