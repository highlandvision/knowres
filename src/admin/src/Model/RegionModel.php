<?php
/**
 * @package    Know Reservations
 * @subpackage Models
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

/** @noinspection MissingSinceTagDocInspection */

namespace HighlandVision\Component\Knowres\Administrator\Model;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\AdminModel;
use HighlandVision\KR\Translations;
use Joomla\CMS\Versioning\VersionableModelTrait;

/**
 * Knowres region model.
 *
 * @since 1.0.0
 */
class RegionModel extends AdminModel
{
	use VersionableModelTrait;

	/**  @var string The type alias. */
	public $typeAlias = 'com_knowres.region';
	/** @var mixed Batch copy/move command. If set to false, the batch copy/move command is not supported. */
	protected $batch_copymove = false;
	/**  @var ?string The prefix to use with controller messages. */
	protected $text_prefix = 'COM_KNOWRES_REGION';

	/**
	 * Method to get a region row.
	 *
	 * @param  null  $pk  The id of the primary key.
	 *
	 * @since  1.0.0
	 * @return false|object Object on success, false on failure.
	 */
	public function getItem($pk = null): false|object
	{
		$item = parent::getItem($pk);
		if ($item) {
			$Translations = new Translations();
			$item->name   = $Translations->getText('region', $item->id);
			$item->blurb  = $Translations->getText('region', $item->id, 'blurb');

			if (isset($item->country_id) && $item->country_id > 0) {
				$item->country_name = $Translations->getText('country', $item->country_id);
			}
		}

		return $item;
	}

	/**
	 * Method to get the data to be injected into the form.
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return mixed The data for the form.
	 */
	protected function loadFormData(): mixed
	{
		$data = KrMethods::getUserState('com_knowres.edit.region.data', []);
		if (empty($data)) {
			$data = $this->getItem();
		}

		return $data;
	}
}