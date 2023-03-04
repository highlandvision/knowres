<?php
/**
 * @package     Know Reservations
 * @subpackage  Library
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR\Extend;

defined('_JEXEC') or die;

use TCPDF;

use function count;

/**
 * Overrides for TCPDF
 *
 * @since 2.2.0
 */
class KrTcpdf extends TCPDF
{
	/** @var  mixed Agency details */
	protected mixed $agency;

	/**
	 * Wxtend TCPDF construct
	 *
	 * @param  mixed  $agency  Agency details
	 *
	 * @since  4.0.0
	 */
	public function __construct(mixed $agency)
	{
		$this->agency = $agency;

		parent::__construct('P', 'pt');
	}

	/**
	 * PDF footer
	 *
	 * @since   2.2.0
	 */
	public function Footer()
	{
		$this->SetFont('dejavusans', '', 8);
		$this->SetXY('0', '820');
		$this->SetTextColorArray(array(
			98,
			98,
			98
		));

		$text   = [];
		$text[] = $this->agency->name;
		$text[] = $this->agency->telephone;
		$this->Cell(0, 10, implode(" | ", $text), 0, false, 'C');
		$this->Cell(0, 10, 'Page ' . $this->getAliasNumPage(), 0, 0, 'R');
	}

	public function Header()
	{
		$logo = JPATH_ROOT . '/images/branding/pdflogo.jpg';
		$this->Image($logo, 30, 20, 240, 60, 'jpg', '', 'T');

		$this->SetFont('dejavusans', '', 16);
		$color = array(
			49,
			49,
			49
		);
		$this->SetTextColorArray($color);

		$title = strtoupper($this->title);
		$words = explode(' ', $title, 2);
		if (count($words) == 1 || strlen($this->title) < 20)
		{
			$this->SetXY('0', '50');
			$this->writeHTML($title, true, false, false, false, 'R');
		}
		else
		{
			$this->SetXY('0', '40');
			$this->writeHTML($words[0], true, false, false, false, 'R');
			$this->writeHTML($words[1], false, false, false, false, 'R');
		}
	}
}