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
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\AdminModel;
use HighlandVision\KR\Translations;
use Joomla\CMS\Object\CMSObject;
use Joomla\CMS\Versioning\VersionableControllerTrait;

use function uasort;

/**
 * Knowres property field model.
 *
 * @since 1.0.0
 */
class PropertyfieldModel extends AdminModel
{
	use VersionableControllerTrait;

	/**  @var string The type alias. */
	public $typeAlias = 'com_knowres.propertyfield';
	/** @var mixed Batch copy/move command. If set to false, the batch copy/move command is not supported. */
	protected $batch_copymove = false;
	/**  @var ?string The prefix to use with controller messages. */
	protected $text_prefix = 'COM_KNOWRES_PROPERTYFIELD';

	/**
	 * Compare values
	 *
	 * @param   string  $a  Value 1
	 * @param   string  $b  Value 2
	 *
	 * @since  1.0.0
	 * @return int
	 */
	private static function cmp(string $a, string $b): int
	{
		if ($a == $b)
		{
			return 0;
		}

		return ($a < $b) ? -1 : 1;
	}

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
		/** @var PropertyfieldModel $item */
		$item = parent::getItem($pk);
		if ($item)
		{
			$Translations      = new Translations();
			$item->label       = $Translations->getText('propertyfield', $item->id, 'label');
			$item->description = $Translations->getText('propertyfield', $item->id, 'description');
		}

		return $item;
	}

	//	/**
	//	 * Set options for special property fields
	//	 *
	//	 * @param  mixed  $a  Key value
	//	 * @param  mixed  $b  Option
	//	 *
	//	 * @since  4.0.0
	//	 * @return int
	//	 */
	//	function sort(mixed $a, mixed $b): int
	//	{
	//		if ($a == $b)
	//		{
	//			return 0;
	//		}
	//
	//		return ($a < $b) ? -1 : 1;
	//	}

	/**
	 * Set options for special property fields
	 *
	 * @since  4.0.0
	 * @return array
	 */
	public function getOptions(): array
	{
		$options = [
			'1'  => KrMethods::plain('COM_KNOWRES_FORM_PROPERTYFIELD_SPECIAL_1'),
			'2'  => KrMethods::plain('COM_KNOWRES_FORM_PROPERTYFIELD_SPECIAL_2'),
			'3'  => KrMethods::plain('COM_KNOWRES_FORM_PROPERTYFIELD_SPECIAL_3'),
			'4'  => KrMethods::plain('COM_KNOWRES_FORM_PROPERTYFIELD_SPECIAL_4'),
			'5'  => KrMethods::plain('COM_KNOWRES_FORM_PROPERTYFIELD_SPECIAL_5'),
			'8'  => KrMethods::plain('COM_KNOWRES_FORM_PROPERTYFIELD_SPECIAL_8'),
			'9'  => KrMethods::plain('COM_KNOWRES_FORM_PROPERTYFIELD_SPECIAL_9'),
			'10' => KrMethods::plain('COM_KNOWRES_FORM_PROPERTYFIELD_SPECIAL_10'),
			'11' => KrMethods::plain('COM_KNOWRES_FORM_PROPERTYFIELD_SPECIAL_11'),
			'12' => KrMethods::plain('COM_KNOWRES_FORM_PROPERTYFIELD_SPECIAL_12'),
		];

		uasort($options, array(
			'HighlandVision\Component\Knowres\Administrator\Model\PropertyfieldModel',
			'cmp'
		));

		return $options;
	}

	/**
	 * Get the tab name for a special property field
	 *
	 * @param   int  $special  The special field ID
	 *
	 * @since  4.0.0
	 * @return string
	 */
	public function getPropertyTab(int $special): string
	{
		$tabs = [
			1  => 'propertyfields',
			2  => 'propertyfields',
			3  => 'security',
			4  => 'basic',
			5  => 'propertyfields',
			8  => 'checkinout',
			9  => 'checkinout',
			10 => 'basic',
			11 => 'basic',
			12 => 'basic',
		];

		if (!empty($tabs[$special]))
		{
			return $tabs[$special];
		}

		return 'propertyfields';
	}

	/**
	 * Return name for special property field
	 *
	 * @param   string  $special   Special name
	 * @param   bool    $external  External or internal display required
	 *
	 * @since  1.2.2
	 * @return string
	 */
	public function propertyFieldSpecial(string $special, bool $external = true): string
	{
		if ($external)
		{
			$textvar = "COM_KNOWRES_FORM_PROPERTYFIELD_SPECIAL_" . $special;

			return KrMethods::plain($textvar);
		}
		else
		{
			$name = [
				1  => 'meta_title',
				2  => 'meta_description',
				3  => 'security_text',
				4  => 'tagline',
				5  => 'terms_conditions',
				8  => 'nearest_transport',
				9  => 'where_keys',
				10 => 'channel_name',
				11 => 'licence_id',
				12 => 'catastral',
			];

			if (!empty(($name[$special])))
			{
				return $name[$special];
			}
		}

		return '';
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
		$data = KrMethods::getUserState('com_knowres.edit.propertyfield.data', []);

		if (empty($data))
		{
			$data = $this->getItem();
		}

		return $data;
	}
}