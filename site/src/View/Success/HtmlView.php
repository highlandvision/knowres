<?php
/**
 * @package    Know Reservations
 * @subpackage Site View
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Site\View\Success;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\HtmlView as KrHtmlView;
use Joomla\CMS\Factory;

/**
 * Confirm payment page
 *
 * @since 1.0.0
 */
class HtmlView extends KrHtmlView\Site
{
	/**
	 * Display the reservation success page
	 *
	 * @param  null  $tpl  Default template.
	 *
	 * @throws Exception
	 * @since  4.0.0
	 * @return void
	 */
	public function display($tpl = null): void
	{
		$this->meta_title       = KrMethods::plain('COM_KNOWRES_TITLE_CONFIRM_SUCCESS');
		$this->meta_description = KrMethods::plain('COM_KNOWRES_PAGE_TITLE');
		$this->prepareDocument();

		parent::display($tpl);
	}

	/**
	 * Prepares the document
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	protected function prepareDocument(): void
	{
		$this->document   = Factory::getDocument();
		$this->prepareDefaultDocument($this->meta_title, $this->meta_description);
	}
}