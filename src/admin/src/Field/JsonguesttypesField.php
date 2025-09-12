<?php
/**
 * @package     KR
 * @subpackage  Admin models
 * @copyright   2017 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\Field;

defined('JPATH_BASE') or die;

use HighlandVision\KR\Framework\KrFactory;
use Joomla\CMS\Form\FormField;

/**
 * Property guest types tield for JSA
 *
 * @since 1.0.0
 */
class JsonguesttypesField extends FormField
{
	/**
	 * Get the field options.
	 *
	 * @since  1.6
	 * @return string    The field input markup.
	 */
	public function getInput(): string
	{
		$this->layout = 'form.field.json.generic';
		$this->type   = 'Jsonguesttypes';
		$group        = 'guest_types';
		$occurs       = 6;
		$values       = [];

		foreach ($this->value as $v)
		{
			$tmp      = [$v->type, $v->max];
			$values[] = $tmp;
		}

		while (count($values) < $occurs)
		{
			$tmp      = ['', 0];
			$values[] = $tmp;
		}

		$form = KrFactory::getAdhocForm('json-guesttypes', 'json_guesttypes.xml', 'administrator', null);

		$data           = [];
		$data['form']   = $form;
		$data['values'] = $values;
		$data['group']  = $group;

		$renderer = $this->getRenderer($this->layout);

		return $renderer->render($data);
	}
}