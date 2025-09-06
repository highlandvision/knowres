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
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Service\Xero;
use Joomla\CMS\HTML\HTMLHelper;

/**
 * Form field for xero accounts select
 *
 * @since    3.1.0
 */
class ListxerotaxrateField extends ListField
{

	/** @var string   The form field type * */
	protected string $type = 'ListxerotaxrateField';

	/**
	 * Get the field options.
	 *
	 * @since  5.2
	 * @return array The field options.
	 */
	public function getOptions(): array
	{
		$options = [];

		$service_id = KrFactory::getListModel('services')::checkForSingleService(true, 'xero');
		$xero       = new Xero($service_id);
		$data       = $xero->getTaxRates(true);

		if (!count($data)) {
			$options[] = HTMLHelper::_('select.option', '0', KrMethods::plain('COM_KNOWRES_XERO_SELECT_TAXRATE_ADD'));
		} else {
			$options[] = HTMLHelper::_('select.option', 0, KrMethods::plain('COM_KNOWRES_XERO_SELECT_TAXRATE'));

			foreach ($data as $d) {
				$options[] = HTMLHelper::_('select.option', $d->Name, $d->Name);
			}
		}

		return array_merge(parent::getOptions(), $options);
	}
}