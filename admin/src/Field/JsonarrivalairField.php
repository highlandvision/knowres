<?php
/**
 * @package    Know Reservations
 * @subpackage Admin Models
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\Field;

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrFactory;
use Joomla\CMS\Form\FormField;

use function count;

/**
 * Supports a value from an external table
 *
 * @since 1.0.0
 */
class JsonarrivalairField extends FormField
{
	/**
	 * Get the field options.
	 *
	 * @since  1.0.0
	 * @return string  The field input markup.
	 */
	public function getInput(): string
	{
		$this->type = 'Jsonarrivalair';
		$group      = 'arrival_air';
		$occurs     = 5;
		$values     = [];

		foreach ($this->value as $v)
		{
			$tmp      = [$v->airline, $v->flight, $v->from, $v->to, $v->eta];
			$values[] = $tmp;
		}

		while (count($values) < $occurs)
		{
			$tmp      = ['', '', '', '', ''];
			$values[] = $tmp;
		}

		$form = KrFactory::getAdhocForm('json-arrival-air', 'json_arrival_air.xml', 'administrator', null);

		$data           = [];
		$data['form']   = $form;
		$data['values'] = $values;
		$data['group']  = $group;

		$renderer = $this->getRenderer($this->layout);

		return $renderer->render($data);
	}
}