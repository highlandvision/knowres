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
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\AdminModel;
use HighlandVision\KR\Translations;
use HighlandVision\KR\Utility;
use Joomla\CMS\Factory;
use Joomla\CMS\Object\CMSObject;
use Joomla\CMS\Versioning\VersionableControllerTrait;
use RuntimeException;

/**
 * KnowresEmail template model.
 *
 * @since 1.0.0
 */
class EmailtemplateModel extends AdminModel
{
	use VersionableControllerTrait;

	/**  @var string The type alias. */
	public $typeAlias = 'com_knowres.emailtemplate';
	/** @var mixed Batch copy/move command. If set to false, the batch copy/move command is not supported. */
	protected $batch_copymove = false;
	/**  @var ?string The prefix to use with controller messages. */
	protected $text_prefix = 'EMAILTEMPLATE';

	/**
	 * Method to get a knowres record.
	 *
	 * @param   int  $pk  The id of the primary key.
	 *
	 * @since  1.0.0
	 * @return CMSObject|false  Object on success, false on failure.
	 */
	public function getItem($pk = null): CMSObject|false
	{
		/* @var EmailtemplateModel $item */
		$item = parent::getItem($pk);
		if ($item)
		{
			$item->pdf_uploaded = Utility::decodeJson($item->pdf_uploaded, true);
			$item->pdf_auto     = Utility::decodeJson($item->pdf_auto, true);

			$Translations  = new Translations();
			$item->name    = $Translations->getText('emailtemplate', $item->id);
			$item->subject = $Translations->getText('emailtemplate', $item->id, 'subject');
			$item->blurb   = $Translations->getText('emailtemplate', $item->id, 'blurb');
		}

		return $item;
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
		$data = KrMethods::getUserState('com_knowres.edit.emailtemplate.data', []);
		if (empty($data))
		{
			$data = $this->getItem();
		}

		return $data;
	}

	/**
	 * Prepare and sanitise the table prior to saving.
	 *
	 * @param $table
	 *
	 * @throws RuntimeException
	 * @throws Exception
	 * @since    2.4.0
	 */
	protected function prepareTable($table)
	{
		$jform = Factory::getApplication()->input->post->get('jform', [], 'array');

		if (!isset($jform['pdf_uploaded']))
		{
			$table->pdf_uploaded = "";
		}

		if (!isset($jform['pdf_auto']))
		{
			$table->pdf_auto = "";
		}

		parent::prepareTable($table);
	}
}