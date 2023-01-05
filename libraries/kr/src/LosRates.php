<?php
/**
 * @package    Know Reservations
 * @subpackage Library
 * @copyright  Copyright (c) 2020, Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Session as KnowresSession;

use function count;
use function is_countable;
use function min;

/**
 * Los rates calculation for multiple dates and stays
 *
 * @since 3.4.0
 */
class LosRates
{
	/** @var Calendar Calendar class */
	protected Calendar $Calendar;
	/** @var array Computations required for rate calculation */
	protected array $computations = [];
	/** @var array Discounts for property */
	protected array $discounts = [];
	/** @var bool Include discounts in rates calculation */
	protected bool $do_discounts;
	/** @var Hub Computations controller */
	protected Hub $Hub;
	/** @var bool Hub initialise required */
	protected bool $init_hub = true;
	/** @var int Percentage rate markup */
	protected int $markup = 0;
	/** @var int ID of property */
	protected int $property_id;
	/** @var array Rate markups */
	protected array $ratemarkups = [];
	/** @var array Rates */
	protected array $rates = [];
	/** @var array Season data */
	protected array $seasons = [];
	/** @var array Property settings */
	protected array $settings;

	/**
	 * Constructor
	 *
	 * @param   int    $property_id   ID of property
	 * @param   array  $settings      Property settings
	 * @param   int    $markup        Markup to be applied to rate
	 * @param   bool   $do_discounts  True to deduct discount from rate
	 *
	 * @since  3.4.0
	 */
	public function __construct(int $property_id, array $settings, int $markup = 0, bool $do_discounts = false)
	{
		$this->property_id  = $property_id;
		$this->settings     = $settings;
		$this->markup       = $markup;
		$this->do_discounts = $do_discounts;
	}

	/**
	 * Get LOS rates content
	 *
	 * @param   string  $first       First date for rates
	 * @param   string  $final       Final date for rates
	 * @param   int     $max_nights  Maximum length of stay to be calculated. Defaults to max_nights in rates
	 *                               but can be overridden for channel requirements if necessary
	 *                               e.g. VRBO only allows 31 nights per date
	 *
	 * @throws Exception
	 * @since  3.4.0
	 * @return array
	 */
	public function getPrices(string $first, string $final, int $max_nights = 0): array
	{
		$this->rates = KrFactory::getListModel('rates')->getRatesForProperty($this->property_id);
		if ($this->do_discounts)
		{
			$this->discounts = KrFactory::getListModel('discounts')->getDiscounts($this->property_id);
		}

		$this->Calendar = new Calendar\Los($this->property_id, $first, $final, $this->rates);

		return $this->setPrices($first, $final, $max_nights);
	}

	/**
	 * Generate the base rate for the first date
	 *
	 * @param   object  $r            Rate row
	 * @param   string  $arrival      Arrival date
	 * @param   array   $more_guests  Additional guests
	 * @param   int     $min_nights   Minimum stay for date
	 * @param   int     $max_nights   Maximum stay for date
	 *
	 * @throws Exception
	 * @since  3.4
	 * @return array
	 */
	private function calcLosBaseRate(object $r, string $arrival, array $more_guests, int $min_nights,
		int $max_nights): array
	{
		$base   = [];
		$wcod = $this->Calendar->weeklyChangeOverDay($arrival);

		for ($nights = 1; $nights <= $max_nights; $nights++)
		{
			if ($nights < $min_nights || !$wcod)
			{
				$base[$r->max_guests][$nights] = 0;
			}
			else
			{
				$departure                     = TickTock::modifyDays($arrival, $nights);
				$date_range                    = TickTock::allDatesBetween($arrival, $departure, true);
				$base[$r->max_guests][$nights] = $this->computeLosRate($arrival, $departure, $r->max_guests, $nights,
					$date_range);
			}

			foreach ($more_guests as $m)
			{
				if (!empty($m->more_pppn))
				{
					if ($nights < $min_nights || !$wcod)
					{
						$base[(int) $m->more_max][$nights] = 0;
					}
					else
					{
						$base[(int) $m->more_max][$nights] = $this->computeLosRate($arrival, $departure,
							(int) $m->more_max, $nights, $date_range);
					}
				}
				else if (!empty($m->more_min) && !empty($m->more_max))
				{
					for ($g = (int) $m->more_min; $g <= (int) $m->more_max; $g++)
					{
						if ($nights < $min_nights || !$wcod)
						{
							$base[$g][$nights] = 0;
						}
						else
						{
							$base[$g][$nights] = $this->computeLosRate($arrival, $departure, $g, $nights,
								$date_range);
						}
					}
				}

				if (empty($m->more_pppn))
				{
					break;
				}
			}
		}

		return $base;
	}

	/**
	 * Get los rates for a date
	 *
	 * @param   array   $prices       Existing array of prices
	 * @param   object  $r            Rate row being prcoessed
	 * @param   string  $arrival      Arrival date
	 * @param   array   $more_guests  Additional guests
	 * @param   array   $qrates       Base rates for today
	 * @param   int     $max_nights   Maximum nioghts stay
	 *
	 * @throws Exception
	 * @since  3.4.0
	 * @return array
	 */
	private function calcLosRates(array $prices, object $r, string $arrival, array $more_guests, array $qrates,
		int $max_nights): array
	{
		for ($nights = 1; $nights <= $max_nights; $nights++)
		{
			$wcod = $this->Calendar->weeklyChangeOverDay(TickTock::modifyDays($arrival, $nights));
			if (!$wcod)
			{
				$prices[$arrival][$r->max_guests][$nights] = 0;
			}
			else if (count($qrates))
			{
				$prices[$arrival][$r->max_guests][$nights] = $qrates[$r->max_guests][$nights];
			}
			else
			{
				$departure  = TickTock::modifyDays($arrival, $nights);
				$date_range = TickTock::allDatesBetween($arrival, $departure, true);

				$prices[$arrival][$r->max_guests][$nights] = $this->computeLosRate($arrival, $departure,
					$r->max_guests, $nights, $date_range);
			}

			foreach ($more_guests as $m)
			{
				if (!(int) $m->more_min)
				{
					break;
				}

				if ((int) $m->more_pppn)
				{
					if (!$wcod)
					{
						$prices[$arrival][$m->more_max][$nights] = 0;
					}
					else if (count($qrates))
					{
						$prices[$arrival][$m->more_max][$nights] = $qrates[$m->more_max][$nights];
					}
					else
					{
						$prices[$arrival][$m->more_max][$nights] = $this->computeLosRate($arrival, $departure,
							$m->more_max, $nights, $date_range);
					}
				}
				else
				{
					for ($g = (int) $m->more_min; $g <= (int) $m->more_max; $g++)
					{
						if (!$wcod)
						{
							$prices[$arrival][$g][$nights] = 0;
						}
						else if (count($qrates))
						{
							$prices[$arrival][$g][$nights] = $qrates[$g][$nights];
						}
						else
						{
							$prices[$arrival][$g][$nights] = $this->computeLosRate($arrival, $departure, $g,
								$nights, $date_range);
						}
					}
				}
			}
		}

		return $prices;
	}

	/**
	 * Check if quick rate calculation can be used
	 * This calculates one rate per date range excluding the last "max days" for the rate
	 *
	 * @throws Exception
	 * @since  3.4.0
	 * @return bool
	 */
	private function checkForQuickie(): bool
	{
		if ($this->settings['beyond_rates'])
		{
			return false;
		}
		if ($this->do_discounts && count($this->discounts))
		{
			return false;
		}
		if (!empty($this->settings['canwebook']))
		{
			return false;
		}
		if (!empty($this->settings['shortbook']))
		{
			return false;
		}

		if ($this->settings['net_rates'])
		{
			$this->ratemarkups = KrFactory::getListModel('ratemarkups')->getMarkups($this->property_id);
			if (is_countable($this->ratemarkups) && count($this->ratemarkups))
			{
				return false;
			}
		}

		if ($this->settings['managed_rates'] && $this->settings['cluster'])
		{
			$this->seasons = KrFactory::getListModel('seasons')->getSeasons($this->settings['cluster']);
			if (is_countable($this->seasons) && count($this->seasons))
			{
				return false;
			}
		}

		if ($this->settings['managed_rates'])
		{
			if ($this->settings['sunday_pc'] != 100
				|| $this->settings['monday_pc'] != 100
				|| $this->settings['tuesday_pc'] != 100
				|| $this->settings['wednesday_pc'] != 100
				|| $this->settings['thursday_pc'] != 100
				|| $this->settings['friday_pc'] != 100
				|| $this->settings['saturday_pc'] != 100)
			{
				return false;
			}
		}

		return true;
	}

	/**
	 * Set LOS rate for a single date, nights and guests
	 *
	 * @param   string  $arrival     Arrival date yyyy-mm-dd
	 * @param   string  $departure   Departure date yyyy-mm-dd
	 * @param   int     $guests      #Guests
	 * @param   int     $nights      #Nights
	 * @param   array   $date_range  Date range
	 *
	 * @throws Exception
	 * @since  3.3.0
	 * @return float
	 */
	private function computeLosRate(string $arrival, string $departure, int $guests, int $nights,
		array $date_range): float
	{
		if ($this->init_hub)
		{
			$this->initHub($arrival, $departure, $guests);
		}
		else
		{
			$this->Hub->setValue('arrival', $arrival);
			$this->Hub->setValue('canwebook', $this->settings['canwebook']);
			$this->Hub->setValue('departure', $departure);
			$this->Hub->setValue('discount', 0);
			$this->Hub->setValue('discount_system', 0);
			$this->Hub->setValue('discounts', []);
			$this->Hub->setValue('guests', $guests);
			$this->Hub->setValue('nights', $nights);
			$this->Hub->setValue('date_range', $date_range);
			$this->Hub->setValue('contract_total', 0);
			$this->Hub->setValue('room_total', 0);
			$this->Hub->setValue('room_total_gross', 0);

			$this->Hub->settings['canwebook'] = $this->settings['canwebook'];
			$this->Hub->settings['shortbook'] = $this->settings['shortbook'];

			$this->Hub->setValue('tax_total', 0);
		}

		$this->setComputations($nights);
		$this->Hub->compute($this->computations, true);
		$rate = $this->Hub->getValue('contract_total');

		if (!empty($this->markup))
		{
			$rate = $this->Hub->round($rate + ($rate * $this->markup / 100));
		}

		return (float) $rate;
	}

	/**
	 * Initiate Hub for calculations
	 *
	 * @param   string  $arrival    Arrival date
	 * @param   string  $departure  Departure date
	 * @param   int     $guests     #Guests
	 *
	 * @throws Exception
	 * @since  3.4.0
	 */
	private function initHub(string $arrival, string $departure, int $guests): void
	{
		$contractSession             = new KnowresSession\Contract();
		$contractData                = $contractSession->resetData();
		$contractData->adjustmentsRq = false;
		$contractData->arrival       = $arrival;
		$contractData->canwebook     = $this->settings['canwebook'];
		$contractData->departure     = $departure;
		$contractData->discountsDb   = $this->discounts;
		$contractData->discountsRq   = false;
		$contractData->guests        = $guests;
		$contractData->property_id   = $this->property_id;
		$contractData->ratesDb       = $this->rates;
		$contractData->ratesRq       = false;
		$contractData->ratemarkupsDb = $this->ratemarkups;
		$contractData->ratemarkupsRq = false;
		$contractData->seasonsDb     = $this->seasons;
		$contractData->seasonsRq     = false;
		$contractData->source        = 'losrates';

		$this->Hub      = new Hub($contractData);
		$this->init_hub = false;
	}

	/**
	 * Set the required computations. Some of these are tested in compute but
	 * done here to save some time
	 *
	 * @param   int  $nights  #Nights stay
	 *
	 * @since  3.4.0
	 */
	private function setComputations(int $nights): void
	{
		$this->computations   = [];
		$this->computations[] = 'base';

		if ($this->settings['managed_rates'])
		{
			if ($this->settings['sunday_pc'] != 100
				|| $this->settings['monday_pc'] != 100
				|| $this->settings['tuesday_pc'] != 100
				|| $this->settings['wednesday_pc'] != 100
				|| $this->settings['thursday_pc'] != 100
				|| $this->settings['friday_pc'] != 100
				|| $this->settings['saturday_pc'] != 100)
			{
				$this->computations[] = 'dow';
			}
			if (count($this->seasons))
			{
				$this->computations[] = 'seasons';
			}
		}

		if ($nights > 1 && $nights < 7)
		{
			$this->computations[] = 'shortstay';
		}
		if ((int) $this->settings['longstay_days1'] > 0 && $nights >= (int) $this->settings['longstay_days1'])
		{
			$this->computations[] = 'longstay';
		}
		if ($this->do_discounts && count($this->discounts))
		{
			$this->computations[] = 'discount';
		}
		if ($this->settings['net_rates'])
		{
			$this->computations[] = 'ratemarkup';
		}
		//		$this->computations[] = 'commission';
	}

	/**
	 * Set LOS rates content
	 *
	 * @param   string  $first       First date
	 * @param   string  $final       Final date
	 * @param   int     $max_nights  Maximum stay to be calculated, defaults to max nights in rates if not set
	 *
	 * @throws Exception
	 * @since  3.4.0
	 * @return array
	 */
	private function setPrices(string $first, string $final, int $max_nights = 0): array
	{
		$quickie = $this->checkForQuickie();
		$prices  = [];

		foreach ($this->rates as $r)
		{
			$start      = max($r->valid_from, $first);
			$min_nights = $r->min_nights;
			$max_nights = $max_nights ?: $r->max_nights;
			$cutoff     = TickTock::modifyDays($r->valid_to, $max_nights, '-');

			$more_guests = Utility::decodeJson($r->more_guests);
			if (!is_countable($more_guests))
			{
				$more_guests = [];
			}

			$qrates = [];
			if ($quickie && $cutoff > $start && $r->start_day == 7)
			{
				$qrates = $this->calcLosBaseRate($r, $start, $more_guests, $min_nights, $max_nights);
			}

			$dates = TickTock::allDatesBetween($start, min($r->valid_to, $final));
			foreach ($dates as $arrival)
			{
				if ($quickie && $arrival > $cutoff && count($qrates))
				{
					$qrates = [];
				}

				if (!$this->Calendar->weeklyChangeOverDay($arrival))
				{
					continue;
				}

				$prices = $this->calcLosRates($prices, $r, $arrival, $more_guests, $qrates, $max_nights);
			}
		}

		return $prices;
	}
}