<?php
/**
 * @package     Know Reservations
 * @subpackage  Library
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR\Media\Pdf;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Media\Pdf;
use Joomla\CMS\Object\CMSObject;
use RuntimeException;

/**
 * PDF generation for a contract
 *
 * @since 2.2.0
 */
class Contract extends Pdf
{
	/** @var  CMSObject Contract details */
	public CMSObject $contract;

	/**
	 * Initialize
	 *
	 * @param  string  $action       Destination output
	 * @param  int     $contract_id  ID of Contract
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	public function __construct(string $action, int $contract_id)
	{
		parent::__construct($action);

		$this->contract = KrFactory::getAdminModel('contract')->getItem($contract_id);
		if (empty($this->contract))
		{
			throw new RuntimeException('Contract not found');
		}

		$this->setAgency();
	}

	/**
	 * Set the agency details for the pdf footer
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	protected function setAgency()
	{
		if (!empty($this->contract->agency_id))
		{
			$this->agency = KrFactory::getAdminModel('agency')->getItem($this->contract->agency_id);
		}
	}

	/**
	 * Set Agent
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	protected function setAgent()
	{
		if ($this->contract->agent_id)
		{
			$this->agent = KrFactory::getAdminModel('agent')->getItem($this->contract->agent_id);
			if (!$this->agent->id)
			{
				throw new RuntimeException('Agent not found for ID ' . $this->contract->agent_id);
			}
		}
	}
}