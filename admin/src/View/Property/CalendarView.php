<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\View\Property;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\HtmlView as KrHtmlView;
use HighlandVision\KR\TickTock;
use Joomla\CMS\Factory;
use Joomla\CMS\Toolbar\Toolbar;
use Joomla\CMS\Toolbar\ToolbarHelper;

/**
 * Calendar view
 *
 * @since   1.0.0
 */
class CalendarView extends KrHtmlView\Property
{
	/* $var array Dates for calendar */
	protected array $dates = [];
	/* $var string Current calendar date */
	protected string $dateYmd = '';
	/* $var int #months to display */
	protected int $monthsToShow = 18;
	/* $var int Ordering? */
	protected int $order = 0;
	/* $var string Start date */
	protected string $startDate = '';
	/* $var string Start month */
	protected string $startMonth = '';

	/**
	 * Display the view
	 *
	 * @param  ?string  $tpl  A template file to load. [optional]
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return void
	 */
	public function display($tpl = null): void
	{
		$this->setLayout('calendar');
		$this->getUserSessionData();

		$this->params = KrMethods::getParams();
		$booked       = KrFactory::getListModel('contracts')
		                         ->getBookedDates($this->item->id, TickTock::getDate(), false, 0, false);
		$this->dates  = $this->prepareData($booked);
		if ($this->allow_block || $this->allow_book)
		{
			$this->form = KrFactory::getAdhocForm('calendar', 'calendar.xml');
		}

		$this->checkErrors();

		Factory::getApplication()->input->set('hidemainmenu', true);
		$title = KrMethods::plain('COM_KNOWRES_TITLE_PROPERTY_CALENDAR') . ' - ' . $this->property_name;
		ToolbarHelper::title($title, 'fas fa-calendar knowres');
		$Toolbar = Toolbar::getInstance();
		$this->addToolbar($Toolbar, 'calendar');

		KrMethods::setUserState('com_knowres.gobackto', 'task=property.calendar&property_id=' . $this->property_id);

		$this->startMonth = TickTock::getDate('now', 'Y-m');
		$this->startDate  = $this->startMonth . '-01';
		$this->today      = TickTock::getDate();

		parent::display($tpl);
	}

	/**
	 * Prepare data for calendar
	 *
	 * @param   array  $booked  Booked dates
	 *
	 * @since 3.3.0
	 * @return array Formatted array of date blocks
	 */
	protected function prepareData(array $booked): array
	{
		$dates = [];

		foreach ($booked as $b)
		{
			$confirmed = $b->booking_status > 9;
			$black     = $b->black_booking;

			$bdates = TickTock::allDatesBetween($b->arrival, $b->departure, true);
			foreach ($bdates as $d)
			{
				$arrival = false;
				if ($d == $b->arrival)
				{
					$arrival = true;
				}

				$dates[$d] = [
					'id'        => $b->id,
					'confirmed' => $confirmed,
					'black'     => $black,
					'arrival'   => $arrival,
					'ical'      => $b->black_booking == 2 ? 1 : 0
				];
			}
		}

		return $dates;
	}
}