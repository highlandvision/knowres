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
use Joomla\CMS\Form\FormField;

use function count;

/**
 * Supports a value from an external table
 *
 * @since 1.0.0
 */
class JsoncancellationpenaltyField extends FormField
{
	/**
	 * Get the field input.
	 *
	 * @since  1.6
	 * @return string
	 */
	public function getInput(): string
	{
		$this->layout = 'form.field.json.generic';
		$this->type   = 'Jsoncancellationpenalty';
		$group        = 'cancellation_penalty';
		$occurs       = 5;
		$values       = [];

		foreach ($this->value as $v)
		{
			$tmp      = [$v->cancellation_penalty_from, $v->cancellation_penalty_to, $v->cancellation_penalty_pc];
			$values[] = $tmp;
		}

		while (count($values) < $occurs)
		{
			$tmp      = [0, 0, 0];
			$values[] = $tmp;
		}

		$form = KrFactory::getAdhocForm('json-cancellationpenalty', 'json_cancellationpenalty.xml', 'administrator', null);

		$data           = [];
		$data['form']   = $form;
		$data['values'] = $values;
		$data['group']  = $group;

		$renderer = $this->getRenderer($this->layout);

		return $renderer->render($data);
	}
}