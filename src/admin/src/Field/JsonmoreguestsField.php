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

use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Utility;
use Joomla\CMS\Form\FormField;

use function count;

/**
 * Supports a value from an external table
 *
 * @since 1.0.0
 */
class JsonmoreguestsField extends FormField
{
	/**
	 * Get the field options.
	 *
	 * @since    1.0.0
	 * @return    string    The field input markup.
	 */
	public function getInput(): string
	{
		$this->layout = 'form.field.json.generic';
		$this->type   = 'Jsonmoreguests';
		$group        = 'more_guests';
		$occurs       = 5;
		$values       = [];

		if (is_string($this->value))
		{
			$this->value = Utility::decodeJson($this->value);
		}

		foreach ($this->value as $v)
		{
			$tmp      = [$v->more_min, $v->more_max, $v->more_rate, $v->more_pppn];
			$values[] = $tmp;
		}

		while (count($values) < $occurs)
		{
			$tmp      = ['', '', '', 0];
			$values[] = $tmp;
		}

		$form = KrFactory::getAdhocForm('json-moreguests', 'json_moreguests.xml', 'administrator', null);

		$data           = [];
		$data['form']   = $form;
		$data['values'] = $values;
		$data['group']  = $group;

		$renderer = $this->getRenderer($this->layout);

		return $renderer->render($data);
	}
}