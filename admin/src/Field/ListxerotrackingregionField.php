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

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Service\Xero;
use HighlandVision\KR\Utility;
use Joomla\CMS\HTML\HTMLHelper;

/**
 * Form field for xero accounts select
 *
 * @since    3.1.0
 */
class ListxerotrackingregionField extends ListField
{
	/** @var string   The form field type * */
	protected string $type = 'ListxerotrackingregionField';

	/**
	 * Get the field options.ader
	 *
	 * @throws Exception
	 * @since  3.1.0
	 * @return array    The field options.
	 */
	public function getOptions(): array
	{
		$message = '';
		$options = [];

		while (true) {
			$service_id = KrFactory::getListModel('services')::checkForSingleService(true, 'xero');
			$xero       = new Xero($service_id);
			$tracking   = $xero->getTracking();
			if (!$tracking) {
				$message = KrMethods::plain('COM_KNOWRES_SERVICE_XERO_TRACKING');
				break;
			}

			$options[] = HTMLHelper::_('select.option', 0, KrMethods::plain('JSELECT'));

			foreach ($tracking as $d) {
				if ($d->Status == 'ACTIVE') {
					$top = $d->Name;
					foreach ($d->Options as $o) {
						if ($o->Status == 'ACTIVE') {
							$option = [$top, $o->Name];

							$options[] = HTMLHelper::_('select.option',
								Utility::encodeJson($option),
								$top . ' / ' . $o->Name);
						}
					}
				}
			}

			return array_merge(parent::getOptions(), $options);
		}

		return [$message];
	}
}