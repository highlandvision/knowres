<?php
/**
 * @package    Know Reservations
 * @subpackage Library
 * @copyright  Copyright (c) 2020, Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR\Core;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Hub;
use HighlandVision\KR\TickTock;
use stdClass;

use function count;

/**
 * Checks for updates required for channels
 *
 * @since 1.0.0
 */
class Servicequeue
{
	/** @var Hub Hub data. */
	protected Hub $hub;

	/**
	 * Check for any channel updates required
	 *
	 * @param   Hub  $hub  Hub data
	 *
	 * @throws Exception
	 * @since  1.2.2
	 * @return bool
	 */
	public function action(Hub $hub): bool
	{
		$this->hub = $hub;

		$property_id = $this->hub->getValue('property_id');
		$arrival     = $this->hub->getValue('arrival');
		$departure   = $this->hub->getValue('departure');

		$services = KrFactory::getListModel('servicexrefs')->getChannels($property_id);
		if (count($services))
		{
			if ($this->hub->getValue('isEdit'))
			{
				$old = KrMethods::getUserState('com_knowres.preedit.contract', []);
				if (isset($old['property_id']))
				{
					if ($old['property_id'] != $property_id || $old['arrival'] != $arrival
						|| $old['departure'] != $departure)
					{
						$this->updateChannels($services, $old['property_id'], $old['arrival'], $old['departure']);
						$this->updateChannels($services, $property_id, $arrival, $departure);
					}
				}
			}
			else
			{
				$this->updateChannels($services, $property_id, $arrival, $departure);
			}
		}

		return true;
	}

	/**
	 * Create any updates for service channels
	 * If availability is being released check if a services Xref exists for this provider and if so then
	 * mark the services Xref for the old contract as cancelled.
	 * There is no amend facility for service provider so
	 * need to distinguish between cancelled and new as old details have to be
	 * cancelled using the old foreign reference and new details added that
	 * will then give a new foreign reference.
	 *
	 * @param   array   $services     DB Channel services
	 * @param   int     $property_id  Property ID
	 * @param   string  $arrival      Arrival date
	 * @param   string  $departure    Departure date
	 *
	 * @throws Exception
	 * @since  1.2.2
	 */
	protected function updateChannels(array $services, int $property_id, string $arrival, string $departure): void
	{
		$id           = $this->hub->getValue('id');
		$agent_id     = $this->hub->getValue('agent_id');
		$service_id   = $this->hub->getValue('service_id');
		$availability = 0;
		if ($this->hub->getValue('isEdit') || $this->hub->getValue('cancelled'))
		{
			$availability = 1;
		}

		foreach ($services as $s)
		{
			if ($availability)
			{
				KrFactory::getListModel('servicexrefs')->updateCancelledForContract($s->service_id, $id);
			}

			if ($s->plugin === 'vrbo')
			{
				KrFactory::getAdminModel('servicequeue')::serviceQueueUpdate('updateAvailability', $property_id);
				KrFactory::getAdminModel('servicequeue')::serviceQueueUpdate('updatePropertyRates', $property_id);

				continue;
			}

			// Ignore if service matches as it has come from this channel
			if ($service_id && $service_id == $s->service_id)
			{
				continue;
			}

			// If an unsent record exists with matching data then do nothing
			if (KrFactory::getListModel('servicequeues')
			             ->getPending($id, $s->service_id, $availability, $property_id, $arrival, $departure))
			{
				continue;
			}

			// If an unsent record exists for the opposite availability with matching data set as actioned
			$queue_id = KrFactory::getListModel('servicequeues')
			                     ->getPending($id, $s->service_id, !$availability, $property_id, $arrival, $departure);
			if ($queue_id)
			{
				KrFactory::getListModel('servicequeues')->updateActioned($queue_id);
				continue;
			}

			$queue               = new stdClass();
			$queue->id           = 0;
			$queue->service_id   = $s->service_id;
			$queue->agent_id     = $agent_id;
			$queue->contract_id  = $id;
			$queue->property_id  = $property_id;
			$queue->arrival      = $arrival;
			$queue->departure    = $departure;
			$queue->availability = $availability;
			$queue->foreign_key  = $s->foreign_key;
			$queue->actioned     = 0;
			$queue->method       = 'updateAvailability';
			$queue->state        = 1;
			$queue->checked_out  = 0;
			$queue->created_by   = 0;
			$queue->created_at   = TickTock::getTS();
			KrFactory::insert('service_queue', $queue);
		}
	}
}