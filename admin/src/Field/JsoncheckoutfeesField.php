<?php
/**
 * @package     KR
 * @subpackage  Admin models
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\Field;

defined('JPATH_BASE') or die;

use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Session as KrSession;
use Joomla\CMS\Form\FormField;

use RuntimeException;

use function count;

/**
 * Supports a value from an external table
 *
 * @since 1.0.0
 */
class JsoncheckoutfeesField extends FormField
{
	/**
	 * Get the field input.
	 *
	 * @throws RuntimeException
	 * @since  1.6
	 * @return string
	 */
	public function getInput(): string
	{
		$this->layout = 'form.field.json.generic';
		$this->type   = 'Jsoncheckoutfees';
		$group        = 'checkout_fees';
		$occurs       = 3;
		$values       = [];

		$userSession = new KrSession\User();
		$userData    = $userSession->getData();
		$property_id = (int) $userData->cr_property_id;

		$settings = KrFactory::getListModel('propertysettings')->getOneSetting('currency');
		$currency = !isset($settings[$property_id]) ? $settings[0] : $settings[$property_id];

		foreach ($this->value as $v)
		{
			$tmp      = [$v->checkout_fees_from, $v->checkout_fees_to, $v->checkout_fees_amount];
			$values[] = $tmp;
		}

		while (count($values) < $occurs)
		{
			$tmp      = [0, 0, 0];
			$values[] = $tmp;
		}

		$form = KrFactory::getAdhocForm('json-checkoutfees', 'json_checkoutfees.xml', 'administrator', null);
		$form->setFieldAttribute('checkout_fees_amount', 'addonBefore', $currency);

		$data           = [];
		$data['form']   = $form;
		$data['values'] = $values;
		$data['group']  = $group;

		$renderer = $this->getRenderer($this->layout);

		return $renderer->render($data);
	}
}