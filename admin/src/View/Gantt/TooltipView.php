<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\View\Gantt;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Joomla\Extend\HtmlView as KrHtmlView;
use JetBrains\PhpStorm\NoReturn;

use function jexit;

/**
 * View gantt tooltip
 *
 * @since 3.3.0
 */
class TooltipView extends KrHtmlView
{
	/** @var int ID of contract. */
	public int $id = 0;

	/**
	 * Display the tooltip
	 *
	 * @param   null  $tpl
	 *
	 * @throws Exception
	 * @since  3.3.0
	 * @return void
	 */
	#[NoReturn] public function display($tpl = null): void
	{
		$this->data = KrFactory::getListModel('contracts')->getTooltipData($this->id);
		$this->setLayout('tooltip');
		$html = $this->loadTemplate($tpl);
		echo $html;

		jexit();
	}
}