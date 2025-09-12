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

use function count;

/**
 * Property rooms field for JSA
 *
 * @since 1.0.0
 */
class JsonroomtypesField extends FormField
{
	/**
	 * Get the field input data.
	 *
	 * @since  1.6
	 * @return string    The field input markup.
	 */
	public function getInput(): string
	{
		$this->layout = 'form.field.json.generic';
		$this->type   = 'Jsonroomtypes';
		$group        = 'rooms';
		$occurs       = 6;
		$values       = [];

		foreach ($this->value as $v)
		{
			$tmp      = [$v->room_id, $v->sleeps, $v->maxsell];
			$values[] = $tmp;
		}

		while (count($values) < $occurs)
		{
			$tmp      = [0, 0, 0];
			$values[] = $tmp;
		}

		$form = KrFactory::getAdhocForm('json-roomtypes', 'json_roomtypes.xml', 'administrator', null);

		$data           = [];
		$data['form']   = $form;
		$data['values'] = $values;
		$data['group']  = $group;

		$renderer = $this->getRenderer($this->layout);

		return $renderer->render($data);
	}
}