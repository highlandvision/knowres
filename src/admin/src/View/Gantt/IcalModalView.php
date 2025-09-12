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
use HighlandVision\KR\Utility;
use JetBrains\PhpStorm\NoReturn;

/**
 * Contract combined show view also used for
 *
 * @since 1.0.0
 */
class IcalModalView extends KrHtmlView\Contract
{
	/** @var int ID of ical block. */
	public int $id = 0;

	/**
	 * Display the view
	 *
	 * @param   null  $tpl
	 *
	 * @throws Exception
	 * @since  3.0.0
	 * @return void
	 */
	#[NoReturn] public function display($tpl = null): void
	{
		$this->item = KrFactory::getAdminModel('icalblock')->getItem($this->id);
		if (empty($this->item->id))
		{
			Utility::goto('contracts');
		}

		$this->setLayout('icalmodal');
		parent::display($tpl);

		jexit();
	}
}