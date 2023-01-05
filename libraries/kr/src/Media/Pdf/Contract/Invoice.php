<?php
/**
 * @package     Know Reservations
 * @subpackage  Library
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
 * Pdf Invoice
 *
 * @since 1.0.0
 */
class Invoice extends Contract
{
	/** @var  string Layout name */
	protected string $layout = 'pdf.contract.invoice';

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
	 * @param   bool  $dashboard  Set to true for guest dashbaord download
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return bool|string
	 */
	public function getPdf(bool $dashboard = false): bool|string
	{
		$title   = KrMethods::plain('COM_KNOWRES_PDF_INVOICE_TITLE');
		$subject = KrMethods::sprintf('COM_KNOWRES_PDF_INVOICE_SUBJECT', $this->contract->tag);
		$this->createPdf($title, $subject, 30);
		$this->setContent($this->getContent($dashboard));
		$filename = "invoice_" . $this->contract->id . '.pdf';

		return $this->actionPdf($filename);
	}

	/**
	 * Get the pdf text
	 *
	 * @param   bool  $dashboard  Set to true for guest dashboard download
	 *
	 * @throws Exception
	 * @since 1.0.0
	 * @return string
	 */
	protected function getContent(bool $dashboard = false): string
	{
		return KrMethods::render($this->layout, [
			'contract'  => $this->contract,
			'guest'     => KrFactory::getAdminModel('guest')->getItem($this->contract->guest_id),
			'property'  => KrFactory::getAdminModel('property')->getItem($this->contract->property_id),
			'agency'    => $this->agency,
			'fees'      => KrFactory::getListModel('contractfees')->getForContract($this->contract->id),
			'payments'  => KrFactory::getListModel('contractpayments')->getForContract($this->contract->id),
			'dashboard' => $dashboard
		]);
	}
}