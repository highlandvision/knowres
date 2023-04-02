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

/**
 * Displays json telephone field in form
 *
 * @since 1.0.0
 */
class JsontelephoneField extends FormField
{
	/**
	 * Get the field input.
	 *
	 * @since  4.0.0
	 * @return string
	 */
	public function getInput(): string
	{
		$this->type = 'Jsontelephone';
		$group      = 'telephone';
		$occurs     = 2;
		$values     = [];

		foreach ($this->value as $v)
		{
			$tmp      = [$v->country, $v->number, $v->type];
			$values[] = $tmp;
		}

		while (count($values) < $occurs)
		{
			$tmp      = [0, '', 0];
			$values[] = $tmp;
		}

		$data           = [];
		$data['form']   = KrFactory::getAdhocForm('json-telephone', 'json_telephone.xml', 'administrator', null);
		$data['values'] = $values;
		$data['group']  = $group;

		$renderer = $this->getRenderer($this->layout);

		return $renderer->render($data);
	}
}