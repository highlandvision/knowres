<?php
/**
 * @package    Know Reservations
 * @subpackage Models
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
use Joomla\CMS\Versioning\VersionableModelTrait;

/**
 * Knowres Agency model
 *
 * @since 1.0.0
 */
class AgencyModel extends AdminModel
{
	use VersionableModelTrait;

	/**  @var string The type alias. */
	public $typeAlias = 'com_knowres.agency';
	/** @var mixed Batch copy/move command. If set to false, the batch copy/move command is not supported. */
	protected $batch_copymove = false;
	/**  @var ?string The prefix to use with controller messages. */
	protected $text_prefix = 'COM_KNOWRES_AGENCY_TITLE';

	/**
	 * Method to get an agency row.
	 *
	 * @param  ?int  $pk  The id of the primary key.
	 *
	 * @since  1.0.0
	 * @return object|false  Object on success, false on failure.
	 */
	public function getItem($pk = null): object|false
	{
		$item = parent::getItem($pk);
		if ($item)
		{
			$Translations               = new Translations();
			$item->country_name         = $Translations->getText('country', $item->country_id);
			$item->region_name          = $Translations->getText('region', $item->region_id);
			$item->gdpr_statement       = $Translations->getText('agency', $item->id, 'gdpr_statement');
			$item->cancellation_terms   = $Translations->getText('agency', $item->id, 'cancellation_terms');
			$item->insurance_disclaimer = $Translations->getText('agency', $item->id, 'insurance_disclaimer');
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
		$data = KrMethods::getUserState('com_knowres.edit.agency.data', []);
		if (empty($data))
		{
			$data = $this->getItem();
		}

		return $data;
	}
}