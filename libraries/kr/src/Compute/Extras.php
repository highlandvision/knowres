<?php
/**
 * @package     Know Hubs
 * @subpackage  Library
 * @copyright   Copyright (c) 2020, Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR\Compute;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Hub;

use function count;
use function is_countable;

/**
 * Hub Pricing
 *
 * @since 3.9.3
 */
class Extras
{
	/** @var Hub Hub data. */
	protected Hub $Hub;

	/**
	 * Calculate extras
	 *
	 * @param  Hub  $Hub  Hub base class
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	public function calculate(Hub $Hub): void
	{
		$this->Hub   = $Hub;
		$extra_total = 0;
		$extras      = [];

		// Ignore extras for any channnel agent bookings set not to charge
		if ($this->Hub->getValue('agent_id') && $this->Hub->getValue('service_id'))
		{
			if (!$this->Hub->agent->mandatory_extras_charge)
			{
				$this->Hub->setValue('extra_total', 0);
				$this->Hub->setValue('extras', []);

				return;
			}
		}

		if ($this->Hub->getValue('extrasRq'))
		{
			$extrasDb = KrFactory::getListModel('extras')->getPricingExtras($this->Hub->getValue('property_id'));
		}
		else
		{
			$extrasDb = $this->Hub->getValue('extrasDb');
		}

		if (is_countable($extrasDb) && count($extrasDb))
		{
			list($extra_total, $extras) = $this->setExtras($extrasDb);
		}

		$this->Hub->setValue('extra_total', $extra_total);
		$this->Hub->setValue('extras', $extras);
	}

	/**
	 * Calculate the value of extras
	 *
	 * @param  array  $extrasDb  Extras for property
	 *
	 * @since 1.0.0
	 * @return array
	 */
	protected function setExtras(array $extrasDb): array
	{
		$total  = 0;
		$extras = $this->Hub->getValue('extras');

		foreach ($extrasDb as $e)
		{
			if ($e->mandatory && !array_key_exists($e->id, $extras))
			{
				$extras[$e->id] = [
					'quantity' => 1,
					'value'    => 0
				];
			}

			if (array_key_exists($e->id, $extras))
			{
				switch ($e->model)
				{
					case '1': // Per week
						$qty  = ceil($this->Hub->getValue('nights') / 7);
						$calc = $qty * $e->price;
						break;
					case '2': // per days
						$qty  = $this->Hub->getValue('nights');
						$calc = $qty * $e->price;
						break;
					case '3': // per booking
						$calc = $e->price;
						break;
					case '4': // per person per booking
						$qty  = $this->Hub->getValue('guests');
						$calc = $qty * $e->price;
						break;
					case '5': // per person per day
						$qty  = $this->Hub->getValue('guests') * $this->Hub->getValue('nights');
						$calc = $qty * $e->price;
						break;
					case '11': // pc of accommodation
						$pc   = $e->percentage;
						$calc = $this->Hub->getValue('room_total') * $pc / 100;
						break;
					case '12': // pc of nightly rate
						$pc   = $e->percentage;
						$calc = $this->Hub->getValue('room_total') * $pc / 100 / $this->Hub->getValue('nights');
						break;
					default:
						break;
				}

				$quantity                = $extras[$e->id]['quantity'];
				$calc                    = $this->Hub->round($quantity * $calc);
				$extras[$e->id]['value'] = $calc;
				$total                   += $calc;
			}
		}

		return [$total,
		        $extras];
	}
}