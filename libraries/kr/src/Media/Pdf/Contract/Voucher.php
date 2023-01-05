<?php
/**
 * @package     Know Reservations
 * @subpackage  Site Controller
 * @copyright   Copyright (c) 2020, Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR\Media\Pdf\Contract;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Media\Pdf\Contract;

/**
 * Pdf Voucher
 *
 * @since 1.0.0
 */
class Voucher extends Contract
{
	/** @var  string Layout name */
	protected string $layout = 'pdf.contract.voucher';

	/**
	 * Initialize
	 *
	 * @param   string  $action       Destination output
	 * @param   int     $contract_id  Contract id
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	public function __construct(string $action, int $contract_id)
	{
		parent::__construct($action, $contract_id);
	}

	/**
	 * Create the pdf file and either download or return path name
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return bool|string
	 */
	public function getPdf(): bool|string
	{
		$title   = KrMethods::plain('COM_KNOWRES_PDF_ACCOMMODATION_VOUCHER_TITLE');
		$subject = KrMethods::sprintf('COM_KNOWRES_PDF_ACCOMMODATION_VOUCHER_SUBJECT', $this->contract->tag);
		$this->createPdf($title, $subject, 30);
		$this->setContent($this->getContent());
		$file = 'accommodation_voucher_' . $this->contract->tag . '.pdf';

		return $this->actionPdf($file);
	}

	/**
	 * Get the pdf text
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return string
	 */
	protected function getContent(): string
	{
		return KrMethods::render($this->layout, [
			'contract'  => $this->contract,
			'property'  => KrFactory::getAdminModel('property')->getItem($this->contract->property_id),
			'agency'    => $this->agency,
			'guestdata' => KrFactory::getListModel('contractguestdata')->getItem($this->contract->guestdata_id),
			'notes'     => KrFactory::getListModel('contractnotes')->getForContract($this->contract->id, 2),
			'balance'   => KrFactory::getAdminModel('contract')::getCurrentBalance($this->contract->id)
		]);
	}
}