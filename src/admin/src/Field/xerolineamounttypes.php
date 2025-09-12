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

require_once(JPATH_LIBRARIES . '/knowres/vendor/autoload.php');

use InvalidArgumentException;
use Joomla\CMS\Form\FormHelper;
use Joomla\CMS\HTML\HTMLHelper;
use XeroPHP\Models\Accounting\Invoice;

FormHelper::loadFieldClass('list');

/**
 * Form field for xero accounts select
 *
 * @since    3.1.0
 */
class JFormFieldXerolineamounttypes extends JFormField
{

	/**
	 * The form field type.
	 *
	 * @since 3.1.0
	 * @var   string
	 */
	protected string $type = 'Xerolineamounttypes';

	/**
	 * Get the field options.ader
	 *
	 * @throws InvalidArgumentException
	 * @since  3.1.0
	 * @return string    The field input markup
	 */
	public function getInput(): string
	{
		$options = [];

		$options[] = HTMLHelper::_('select.option', Invoice::LINEAMOUNT_TYPE_EXCLUSIVE,
			Invoice::LINEAMOUNT_TYPE_EXCLUSIVE);
		$options[] = HTMLHelper::_('select.option', Invoice::LINEAMOUNT_TYPE_INCLUSIVE,
			Invoice::LINEAMOUNT_TYPE_INCLUSIVE);
		$options[] = HTMLHelper::_('select.option', Invoice::LINEAMOUNT_TYPE_NOTAX, Invoice::LINEAMOUNT_TYPE_NOTAX);

		$input_options = [];
		if ($this->class)
		{
			$input_options[] = 'class="' . $this->class . '"';
		}

		return HTMLHelper::_('select.genericlist', $options, $this->name, implode(' ', $input_options), 'value', 'text',
			$this->value);

		return $html;
	}
}