<?php
/**
 * @package    Know Reservations
 * @subpackage Admin Model
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\Field;

defined('JPATH_BASE') or die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Session as KrSession;
use HighlandVision\KR\Translations;
use HighlandVision\KR\Utility;
use Joomla\CMS\Form\FormField;

/**
 * Contract extras field
 *
 * @since 1.0.0
 */
class JsonextrasField extends FormField
{
	/**
	 * Get the field options.
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return string    The field input markup.
	 */
	public function getInput(): string
	{
		$this->layout = 'form.field.json.extras';
		$this->type   = 'Jsonextras';
		$group        = 'extra';
		$values       = [];
		$attributes   = [];
		$Translations = new Translations();

		$userSession = new KrSession\User();
		$userData    = $userSession->getData();
		$property_id = (int) $userData->cr_property_id;
		if (empty($property_id))
		{
			Utility::goto('properties');
		}

		$extras   = KrFactory::getListModel('extras')->getByProperty($property_id);
		$settings = KrFactory::getListModel('propertysettings')->getPropertysettings($property_id, 'currency');
		foreach ($extras as $e)
		{
			if ($e->price > 0)
			{
				$price = $e->model < 11 ? Utility::displayValue($e->price, $settings['currency'])
					: $e->percentage . '%';
			}
			else
			{
				$price = $e->model < 11 ? KrMethods::plain('COM_KNOWRES_FREE') : $e->percentage . '%';
			}
			$label       = $Translations->getText('extra', $e->id) . ' ' . $price . ' ' . $this->getText($e->model);
			$description = $Translations->getText('extra', $e->id, 'description');

			$first    = $e->mandatory ? 1 : 0;
			$quantity = $first;
			foreach ($this->value as $k => $v)
			{
				if ($k == $e->id)
				{
					$quantity = $v['quantity'];
				}
			}

			$values[$e->id]     = $quantity;
			$attributes[$e->id] = ['label' => $label, 'description' => $description, 'first' => $first,
			                       'last'  => $e->max_quantity];
		}

		$data               = [];
		$data['form']       = KrFactory::getAdhocForm('json-extras', 'json_extras.xml', 'administrator', null);
		$data['group']      = $group;
		$data['values']     = $values;
		$data['attributes'] = $attributes;

		$renderer = $this->getRenderer($this->layout);

		return $renderer->render($data);
	}

	/**
	 * Set the model text for the extra
	 *
	 * @param   int  $model  Extra model
	 *
	 * @since  4.0.0
	 * @return string
	 */
	protected function getText(int $model): string
	{
		return match ($model)
		{
			1 => KrMethods::plain('COM_KNOWRES_EXTRA_MODEL_PERWEEK'),
			2 => KrMethods::plain('COM_KNOWRES_EXTRA_MODEL_PERDAY'),
			3 => KrMethods::plain('COM_KNOWRES_EXTRA_MODEL_PERBOOKING'),
			4 => KrMethods::plain('COM_KNOWRES_EXTRA_MODEL_PERPERSONPERBOOKING'),
			5 => KrMethods::plain('COM_KNOWRES_EXTRA_MODEL_PERPERSONPERDAY'),
			11 => KrMethods::plain('COM_KNOWRES_EXTRA_MODEL_PERBOOKINGPC'),
			12 => KrMethods::plain('COM_KNOWRES_EXTRA_MODEL_PERDAYPC'),
		};
	}
}