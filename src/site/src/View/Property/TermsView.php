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
use HighlandVision\KR\Joomla\Extend\HtmlView as KrHtmlView;
use JetBrains\PhpStorm\NoReturn;

/**
 * Display property
 *
 * @since 1.0.0
 */
class TermsView extends KrHtmlView\Site
{
	/** @var mixed Article data. */
	public mixed $article = '';

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
		parent::display($tpl);
		jexit();
	}
}