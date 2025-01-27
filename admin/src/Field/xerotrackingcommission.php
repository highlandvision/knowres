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
use Joomla\CMS\Form\FormHelper;
use Joomla\CMS\HTML\HTMLHelper;

FormHelper::loadFieldClass('list');

/**
 * Form field for xero accounts select
 *
 * @since    3.1.0
 */
class JFormFieldXerotrackingcommission extends JFormField
{
	/**
	 * The form field type.
	 *
	 * @since    3.1.0
	 * @var        string
	 */
	protected $type = 'Xerotrackingcommission';

	/**
	 * Get the field options.ader
	 *
	 * @throws Exception
	 * @since  3.1.0
	 * @return string    The field input markup
	 */
	public function getInput(): string
	{
		$xero_tracking = [];
		$html          = [];
		$message       = '';

		while (true)
		{
			$service_id = KrFactory::getListModel('services')::checkForSingleService(true, 'xero');
			$xero       = new Xero($service_id);
			$tracking   = $xero->getTracking();
			if (!$tracking)
			{
				$message = 'Please configure relevant tracking options on Xero';
				break;
			}

			$xero_tracking[] = HTMLHelper::_('select.option', '', KrMethods::plain('JSELECT'));

			foreach ($tracking as $d)
			{
				if ($d->Status == 'ACTIVE')
				{
					$top = $d->Name;
					foreach ($d->Options as $o)
					{
						if ($o->Status == 'ACTIVE')
						{
							$option = array(
								$top,
								$o->Name
							);

							$xero_tracking[] = HTMLHelper::_('select.option', Utility::encodeJson($option),
								$top . ' / ' . $o->Name);
						}
					}
				}
			}

			$input_options = [];
			if ($this->class)
			{
				$input_options[] = 'class="' . $this->class . '"';
			}

			$types = array(
				'Gross',
				'Net'
			);

			$data = Utility::decodeJson($this->value, true);
			foreach ($types as $r)
			{
				$default = '';
				if (count($data) && isset($data[$r]))
				{
					$default = $data[$r];
				}

				$id     = "map_commission" . $r;
				$html[] = '<div class="control-group">';
				$html[] = '<div class="control-label">';
				$html[] = $r;
				$html[] = '</div>';
				$html[] = '<div class="controls">';
				$html[] = HTMLHelper::_('select.genericlist', $xero_tracking, "map_commission[$r]",
					implode(' ', $input_options), 'value', 'text', $default, $id);
				$html[] = '</div>';
				$html[] = '</div>';
			}

			return implode('', $html);
		}

		return $message;
	}
}