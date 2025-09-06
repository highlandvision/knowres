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

use Joomla\CMS\Form\FormHelper;
use Joomla\CMS\HTML\HTMLHelper;
use XeroPHP\Models\Accounting\Invoice;

FormHelper::loadFieldClass('list');

/**
 * Form field for xero accounts select
 *
 * @since    3.1.0
 */
class ListxerolineamounttypesField extends ListField
{
	/** @var string   The form field type * */
	protected string $type = 'ListxerolineamounttypesField';

	/**
	 * Get the field options.
	 *
	 * @since  5.2
	 * @return array The field options.
	 */
	public function getOptions(): array
	{
		$options = [];

		$options[] = HTMLHelper::_('select.option',
			Invoice::LINEAMOUNT_TYPE_EXCLUSIVE,
			Invoice::LINEAMOUNT_TYPE_EXCLUSIVE);
		$options[] = HTMLHelper::_('select.option',
			Invoice::LINEAMOUNT_TYPE_INCLUSIVE,
			Invoice::LINEAMOUNT_TYPE_INCLUSIVE);
		$options[] = HTMLHelper::_('select.option', Invoice::LINEAMOUNT_TYPE_NOTAX, Invoice::LINEAMOUNT_TYPE_NOTAX);

		return array_merge(parent::getOptions(), $options);
	}
}