<?php
/**
 * @package    Know Reservations
 * @subpackage Admin Models
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */
/** @noinspection PhpUnused */

namespace HighlandVision\Component\Knowres\Administrator\Field;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\Component\Knowres\Administrator\Model\PropertyModel;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Session as KrSession;
use HighlandVision\KR\Utility;
use Joomla\CMS\Form\FormField;
use RuntimeException;
use stdClass;

use function count;
use function is_array;

/**
 * Foramt bed types for property
 *
 * @since 1.0.0
 */
class JsonbedtypesField extends FormField
{
	/** @var string $type The form field type. */
	protected $type = 'Jsonbedtypes';

	/**
	 * Get the field options.
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return string
	 */
	public function getInput(): string
	{
		$property_id = $this->getProperty();
		if (!$property_id)
		{
			throw new RuntimeException('Session property not found');
		}

		$allbedtypes = KrFactory::getListModel('bedtypes')->getAll();
		if (!is_countable($allbedtypes) || !count($allbedtypes))
		{
			throw new RuntimeException('Bed types not found');
		}

		/** @var PropertyModel $property */
		$property = KrFactory::getAdminModel('property')->getItem($property_id);
		$bedrooms = $property->id ? $property->bedrooms : 2;
		$lines    = $bedrooms + 3;
		$count    = 1;
		$sub      = [];
		$values   = [];

		if (is_null($this->value))
		{
			$this->value = new stdClass();
		}
		if (is_array($this->value))
		{
			$this->value = Utility::arrayToObject($this->value);
		}

		foreach ($this->value as $v)
		{
			if (is_countable($v->bed_types))
			{
				foreach ($v->bed_types as $bedtypes => $bed_number)
				{
					foreach ($bed_number as $b)
					{
						$sub[$bedtypes] = $b;
					}
				}

				$room_number = $v->room_number ?: $count;
				$tmp         = [$v->room_id, $room_number, $sub];
				$values[]    = $tmp;
				$count++;
			}
		}

		for ($i = $count; $i <= $lines; $i++)
		{
			foreach ($allbedtypes as $b)
			{
				$sub[$b->name] = $b->name;
			}
			$tmp      = [0, $i, $sub];
			$values[] = $tmp;
		}

		$data                = [];
		$data['allbedtypes'] = $allbedtypes;
		$data['form']        = KrFactory::getAdhocForm('json-bedtypes', 'json_bedtypes.xml', 'administrator', null);
		$data['group']       = 'bed_types';
		$data['values']      = $values;

		$renderer = $this->getRenderer($this->layout);

		return $renderer->render($data);
	}

	/**
	 * Get the currenct property from the session
	 *
	 * @since  4.0.0
	 * @return int
	 */
	private function getProperty(): int
	{
		$userSession = new KrSession\User();
		$userData    = $userSession->getData();

		return (int) $userData->cr_property_id;
	}
}