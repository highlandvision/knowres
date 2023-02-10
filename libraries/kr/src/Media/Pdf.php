<?php
/**
 * @package     Know Reservations
 * @subpackage  Library
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR\Media;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Extend\KrTcpdf;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Media;
use Joomla\CMS\Factory;
use RuntimeException;

/**
 * Generate, download or email PDF files
 *
 * @since 2.2.0
 */
class Pdf extends Media
{
	/** @var  string $action 'download' or 'email' */
	protected string $action;
	/** @var  false|object Agency details */
	protected false|object $agency;
	/** @var  KrTcpdf $pdf PDF content */
	protected KrTcpdf $pdf;

	/**
	 * Initialize
	 *
	 * @param  string  $action  Destination output
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 */
	public function __construct(string $action = 'download')
	{
		if ($action == 'download' || $action == 'email')
		{
			$this->action = $action;
		}
		else
		{
			throw new RuntimeException('Pdf action must be download or email');
		}

		Factory::getLanguage()->load('com_knowres', JPATH_ADMINISTRATOR . '/components/com_knowres');
		Factory::getLanguage()->load('com_knowres', JPATH_SITE . '/components/com_knowres');
	}

	/**
	 * Action pdf, download, email etc
	 *
	 * @param  string  $file  PDF File name
	 *
	 * @since  1.0.0
	 * @return bool|string
	 */
	public function actionPdf(string $file): bool|string
	{
		if ($this->action == 'download')
		{
			$this->pdf->Output($file, 'D');

			return true;
		}
		else if ($this->action == 'email')
		{
			$path = self::getPdfLocation() . $file;
			$this->pdf->Output($path, 'F');

			return $path;
		}
	}

	/**
	 * Generate an HTML pdf
	 *
	 * @param  string  $title    PDF title
	 * @param  string  $subject  PDF subject
	 * @param  int     $margin   Margin size
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	protected function createPdf(string $title, string $subject, int $margin = 15)
	{
		$this->pdf = new KrTcpdf($this->agency);
		$this->pdf->SetCreator(PDF_CREATOR);
		$this->pdf->SetAuthor(KrMethods::getCfg('sitename'));
		$this->pdf->SetTitle($title);
		$this->pdf->SetSubject($subject);
		$this->pdf->setHeaderData('pdflogo.jpg', '200');
		$this->pdf->SetPrintHeader();
		$this->pdf->setPrintFooter();
		$this->pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);
		$this->pdf->SetMargins($margin, 100, $margin);
		$this->pdf->setHeaderMargin(0);
		$this->pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);
		$this->pdf->setPageUnit('px');
		$this->pdf->setLanguageArray([]);
		$this->pdf->setFontSubsetting();
		$this->pdf->SetFont('dejavusans', '', 10, '', true);
		$this->pdf->SetAutoPageBreak($this->pdf->getAutoPageBreak(), $this->pdf->getBreakMargin());
	}

	/**
	 * Set PDF content
	 *
	 * @param  string  $content  Content for output
	 *
	 * @since 1.0.0
	 */
	protected function setContent(string $content)
	{
		$this->pdf->SetFont('dejavusans', '', 9, '', true);
		$this->pdf->SetTextColorArray([49, 49, 49]);
		$this->pdf->SetLineStyle([
			'width' => 0.5,
			'cap'   => 'square',
			'join'  => 'miter',
			'dash'  => 0,
			'color' => [215, 215, 215]
		]);

		$this->pdf->AddPage();
		$this->pdf->writeHTML($content);
		$this->pdf->lastPage();
	}
}