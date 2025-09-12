<?php
/**
 * @package    Know Reservations
 * @subpackage Site View
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Site\View\Property;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Hub;
use HighlandVision\KR\Joomla\Extend\HtmlView as KrHtmlView;
use JetBrains\PhpStorm\NoReturn;

/**
 * View property
 *
 * @since 1.0.0
 */
class QuoteView extends KrHtmlView\Site
{
	/** @var string Error message */
	public string $error = '';
	/** @var Hub Price info data from Hub. */
	public Hub $quote;

	/**
	 * Display the view
	 *
	 * @param   null  $tpl  Default template.
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return void
	 */
	#[NoReturn] public function display($tpl = null): void
	{
		$this->setLayout('quote');

		parent::display($tpl);
		jexit();
	}
}