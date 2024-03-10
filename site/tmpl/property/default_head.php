<?php
/**
 * @package     Know Reservations
 * @subpackage  Views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Utility;
use Joomla\CMS\HTML\HTMLHelper;

if ($this->item->lat && $this->item->lng) {
	HTMLHelper::script(trim(Utility::getGmapsURL()), [], ['async' => 'async', 'defer' => 'defer']);
}

if ((int) $this->settings['display_calendar']) {
	$style = 'table.legend tr td div {box-sizing: border-box}'
		. 'table.amonth tr td div.bookme, table.legend tr td div.bookme {' . 'border-top-color:'
		. $this->params->get('calendar_available') . ';' . 'border-left-color:'
		. $this->params->get('calendar_available') . ';' . 'border-right-width: 0;' . 'border-bottom-width: 0;' . '}'
		. 'table.amonth tr td div.bgbook, table.legend tr td div.bgbook {' . 'border-top-color: '
		. $this->params->get('calendar_booked') . ';' . 'border-left-color: ' . $this->params->get('calendar_booked')
		. ';' . 'border-right-width: 0;' . 'border-bottom-width: 0;' . '}'
		. 'table.amonth tr td div.bgprov, table.legend tr td div.bgprov {' . 'border-top-color: '
		. $this->params->get('calendar_provisional') . ';' . 'border-left-color: '
		. $this->params->get('calendar_provisional') . ';' . 'border-right-width: 0;' . 'border-bottom-width: 0;' . '}'
		. 'table.amonth tr td div.bgfrombook, table.legend tr td div.bgfrombook {' . 'border-top-color: '
		. $this->params->get('calendar_booked') . ';' . 'border-left-color: ' . $this->params->get('calendar_booked')
		. ';' . '}' . 'table.amonth tr td div.bgfromavail {' . 'border-top-color: '
		. $this->params->get('calendar_available') . ';' . 'border-left-color: '
		. $this->params->get('calendar_available') . ';' . '}' . 'table.amonth tr td div.bgfromprov {'
		. 'border-top-color: ' . $this->params->get('calendar_provisional') . ';' . 'border-left-color: '
		. $this->params->get('calendar_provisional') . ';' . '}' . 'table.amonth tr td div.bgtobook {'
		. 'border-bottom-color: ' . $this->params->get('calendar_booked') . ';' . 'border-right-color: '
		. $this->params->get('calendar_booked') . ';' . '}'
		. 'table.amonth tr td div.bgtoavail, table.legend tr td div.bgtoavail {' . 'border-bottom-color: '
		. $this->params->get('calendar_available') . ';' . 'border-right-color: '
		. $this->params->get('calendar_available') . ';' . '}' . 'table.amonth tr td div.bgtoprov {'
		. 'border-bottom-color: ' . $this->params->get('calendar_provisional') . ';' . 'border-right-color: '
		. $this->params->get('calendar_provisional') . ';' . '}';

	$this->document->addStyleDeclaration($style);
}
?>

<?php if ($this->booking_type): ?>
	<div id="kr-property-load" data-pid="<?php echo $this->item->id; ?>" data-arrival="<?php echo $this->arrival; ?>"
	     data-departure="<?php echo $this->departure; ?>" data-maxdate="<?php echo $this->max_date; ?>"
	     data-mindate="<?php echo $this->min_date; ?>"
	     data-atext="<?php echo KrMethods::plain("COM_KNOWRES_QUOTE_SELECT_CHECK_IN"); ?>"
	     data-dtext="<?php echo KrMethods::plain("COM_KNOWRES_QUOTE_SELECT_CHECK_OUT"); ?>"></div>
<?php endif; ?>