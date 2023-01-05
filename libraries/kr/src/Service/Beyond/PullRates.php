<?php
/**
 * @package     Know Reservations
 * @subpackage  Site Controller
 * @copyright   Copyright (c) 2020, Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR\Service\Beyond;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Service\Beyond;
use HighlandVision\KR\TickTock;
use HighlandVision\KR\Utility;
use InvalidArgumentException;
use RuntimeException;
use stdClass;

use function file_get_contents;
use function json_decode;

/**
 * Service Beyond pricing
 *
 * @since 2.4.0
 */
class PullRates extends Beyond
{
	/** @var object Accounts data returned from Beyond */
	protected object $accounts;
	/** @var array Beyond request ids generated from valid properties */
	protected array $channel_listings = [];
	/** @var array Current rates */
	protected array $rates = [];
	/** @var array Seasons for minimum stay */
	protected array $seasons = [];

	/**
	 * @param   int  $test  1 for live
	 *
	 * @throws Exception
	 * @since  2.4.0
	 */
	public function __construct(int $test = 0)
	{
		parent::__construct($test);
	}

	/**
	 * Get the account listings
	 *
	 * @throws Exception
	 * @throws InvalidArgumentException
	 * @since  2.4.0
	 */
	public function pullRates()
	{
		try
		{
			$this->accounts = $this->pullAccounts();
			$this->getListings();
			$this->channel_listings[] = 6763;
			if (!count($this->channel_listings))
			{
				throw new Exception('No matching listings / properties returned from Beyond');
			}

			$this->pullListingRates();
			$this->addLog(true);
		}
		catch (Exception $e)
		{
			$this->exception = $e;
			$this->addLog(false);
		}
	}

	/**
	 * Process calendar and rates from beyond
	 *
	 * @param   array  $calendar  Calendar returned from listings method
	 *
	 * @throws Exception
	 * @since  2.4.0
	 */
	protected function updateRates(array $calendar)
	{
		$this->readRates();

		$updates = [];
		foreach ($calendar as $c)
		{
			$rate = $this->setRate($c);
			if ($rate > 0)
			{
				$id               = $this->setRateId($c->date);
				$tmp              = new stdClass();
				$tmp->id          = $id;
				$tmp->property_id = $this->property_id;
				$tmp->valid_from  = $c->date;
				$tmp->valid_to    = $c->date;
				$tmp->rate        = $rate;
				$tmp->min_nights  = $this->setMinNights($c->date);
				$tmp->max_nights  = $this->settings['max_nights'];
				$tmp->min_guests  = 1;
				$tmp->max_guests  = $this->settings['base_guests'];
				$tmp->ignore_pppn = 1;
				$tmp->start_day   = 7;
				$tmp->more_guests = $this->setMoreGuests();
				$tmp->state       = 1;
				if (!$id)
				{
					$tmp->created_at = TickTock::getTS();
				}
				else
				{
					$tmp->updated_at = TickTock::getTS();
				}
				$updates[] = $tmp;
			}
			else
			{
				$this->messages[] = KrMethods::plain('Beyond did not send a rate for ' . $this->property->property_name
					. ' on ' . $c->date);
			}
		}

		if (count($updates))
		{
			KrFactory::getAdminModel('rates')->insertUpdateRates($updates);
			KrFactory::getAdminModel('servicequeue')::serviceQueueUpdate('updatePropertyRates',
				(int) $item->property_id);
		}
	}

	/**
	 * Pull account listings for all Beyond accounts for user
	 * for nominated channel and account email or if not set then for all
	 *
	 * @since 2.4.0
	 */
	protected function getListings()
	{
		foreach ($this->accounts->accounts as $a)
		{
			if ($a->channel === $this->parameters->channel
				&& ($a->email === $this->parameters->account_email
					|| $this->parameters->account_email === ''))
			{
				foreach ($a->channel_listings_ids as $l)
				{
					$this->verifyListings($l);
				}
			}
		}
	}

	/**
	 * Get account listings data from Beyond
	 *
	 * @since  2.4.0
	 * @return mixed
	 */
	protected function pullAccounts(): mixed
	{
		$this->method = 'accounts';

		$accounts = $this->sendCurlRequest();
		if (empty($accounts->accounts) || !is_countable($accounts->accounts) || !count($accounts->accounts))
		{
			throw new RuntimeException('Beyond did not return any accounts');
		}

		return $accounts;
	}

	/**
	 * Get listing rates from Beyond for each matching listing found
	 *
	 * @throws Exception
	 * @throws Exception
	 * @throws Exception
	 * @throws InvalidArgumentException
	 * @since  2.4.0
	 */
	protected function pullListingRates()
	{
		$this->method = 'listings';
		$this->readSeasons();

		foreach ($this->channel_listings as $id)
		{
			if ($this->test)
			{
				$data           = $this->zzTestListing();
				$data           = str_replace(["\r\n",
				                               "\n",
				                               "\r"], "", $data);
				$this->response = $data;
				$data           = json_decode($data);
			}
			else
			{
				$data = $this->sendCurlRequest(null, $id);
			}

			if ($data && $data->id === $id)
			{
				$this->foreign_key = $id;
				$this->property_id = array_search($id, $this->xrefs);
				$this->readProperty($this->property_id);
				$this->getSettings($this->property_id);
				$this->updateRates($data->calendar);
			}
			else
			{
				$this->messages[] = 'Beyond returned non matching ID for listings request';
			}
		}
	}

	/**
	 * Read existing property rates and write an array
	 * of rates using valid from as the key
	 *
	 * @throws Exception
	 * @since  2.4.0
	 */
	protected function readRates()
	{
		$this->rates = [];

		$rows = KrFactory::getListModel('rates')->getRatesForProperty($this->property_id, $this->today);
		foreach ($rows as $r)
		{
			if ($r->valid_from < $this->today)
			{
				$this->rates[$this->today] = $r;
			}
			else
			{
				$this->rates[$r->valid_from] = $r;
			}
		}
	}

	/**
	 * Read seasons
	 *
	 * @throws Exception
	 * @since  2.4.0
	 */
	protected function readSeasons()
	{
		$this->seasons = KrFactory::getListModel('seasons')->getSeasons();
	}

	/**
	 * Set more guests for rates
	 *
	 * @since  2.4.0
	 * @return string
	 */
	protected function setMoreGuests(): string
	{
		$max = $this->property->sleeps + $this->property->sleeps_extra;
		if ($max <= $this->settings['base_guests'])
		{
			return '';
		}

		$tmp              = [];
		$tmp['more_min']  = $this->settings['base_guests'] + 1;
		$tmp['more_max']  = $max;
		$tmp['more_rate'] = $this->settings['extra_person_rate'];
		$tmp['more_pppn'] = 0;

		return Utility::encodeJson(array($tmp));
	}

	/**
	 * Set Beyond rate based on calendar settings
	 * posting_state is not set or active use price_modeled; if user, price_user
	 *
	 * @param   object  $listing  Calendar object from Beyond
	 *
	 * @since  2.4.0
	 * @return float
	 */
	protected function setRate(object $listing): float
	{
		if (!isset($listing->posting_state) || $listing->posting_state === 'active')
		{
			return (float) $listing->price_modeled;
		}
		else if ($listing->posting_state === 'user')
		{
			return (float) $listing->price_user;
		}

		return '0.0';
	}

	/**
	 * Return rate ID for a date or 0 if not exists
	 *
	 * @param   string  $date  Set rate for a date
	 *
	 * @since  2.4.0
	 * @return int
	 */
	protected function setRateId(string $date): int
	{
		if (isset($this->rates[$date]))
		{
			$rate = $this->rates[$date];

			return $rate->id;
		}
		else
		{
			return 0;
		}
	}

	/**
	 * Set minimum stay night for rate date
	 *
	 * @param   string  $date  Rate date
	 *
	 * @since  2.4.0
	 * @return int
	 */
	protected function setMinNights(string $date): int
	{
		foreach ($this->seasons as $s)
		{
			if ($s->cluster_id == $this->settings['cluster'] && $date >= $s->valid_from && $date <= $s->valid_to)
			{
				return $s->minimum_nights;
			}
		}

		return $this->settings['min_nights'];
	}

	/**
	 * Set the master listing ref by reading through the channels and
	 * save those that have a matching entry on service xref
	 *
	 * @param   string  $channel_id  Channel identifier
	 *
	 * @since  2.4.0
	 */
	protected function verifyListings(string $channel_id)
	{
		foreach ($this->accounts->channel_listings as $channel)
		{
			if ($channel->id == $channel_id)
			{
				if (in_array((string) $channel->master_listing_id, $this->xrefs))
				{
					$this->channel_listings[] = (string) $channel->master_listing_id;
				}
			}
		}
	}

	/**
	 * Get test file
	 *
	 * @since  3.3.4
	 * @return bool|string
	 */
	protected function zzTestListing(): bool|string
	{
		$file = 'Z:\laragon\www\jkr/beyond.json';

		return file_get_contents($file);
	}
}