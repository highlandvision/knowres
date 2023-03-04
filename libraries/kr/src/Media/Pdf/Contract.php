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
use RuntimeException;

/**
 * PDF generation for a contract
 *
 * @since 2.2.0
 */
class Contract extends Pdf
{
	/** @var false|object Contract item */
	public false|object $contract;

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
}