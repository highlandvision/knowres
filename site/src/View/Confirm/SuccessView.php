<?php
/**
 * @package    Know Reservations
 * @subpackage Site View
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Site\View\Confirm;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\HtmlView as KrHtmlView;
use Joomla\CMS\Factory;
use Joomla\CMS\Uri\Uri;

/**
 * Confirm payment page
 *
 * @since 1.0.0
 */
class SuccessView extends KrHtmlView\Site
{
	/** @var bool True for request booking */
	public bool $request;

	/**
	 * Display the form
	 *
	 * @param   null  $tpl  Default template.
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return void
	 */
	public function display($tpl = null): void
	{
		$this->setLayout('success');
		$this->params = KrMethods::getParams();

		if (!$this->contract_id)
		{
			KrMethods::message(KrMethods::plain('COM_KNOWRES_ERROR_FATAL_CONFIRM'));
			KrMethods::redirect(KrMethods::route(Uri::base()));
		}

		$this->request  = $this->get('request', 'confirm');
		$this->contract = KrFactory::getAdminModel('contract')->getItem($this->contract_id);
		if (empty($this->contract->id))
		{
			KrMethods::message(KrMethods::plain('COM_KNOWRES_ERROR_FATAL_CONFIRM'));
			KrMethods::redirect(KrMethods::route(KrMethods::getRoot()));
		}

		$this->modules          = KrMethods::loadInternal('{loadposition carhireform}');
		$this->modules          .= KrMethods::loadInternal('{loadposition propertyview}');
		$this->meta_title       = KrMethods::plain('COM_KNOWRES_TITLE_SUCCESS');
		$this->meta_description = KrMethods::plain('COM_KNOWRES_PAGE_TITLE');

		$this->prepareDocument();

		parent::display($tpl);
	}

	/**
	 * Prepares the document
	 *
	 * @throws Exception
	 * @since 1.0.0
	 */
	protected function prepareDocument()
	{
		$this->prepareDefaultDocument($this->meta_title, $this->meta_description);
		$this->setMyPathway();
	}

	/**
	 * Set the pathway for the payment
	 *
	 * @throws Exception
	 * @since  3.3.0
	 */
	protected function setMyPathway()
	{
		$pathway = Factory::getApplication()->getPathway();
		$pathway->setPathway([]);
		$pathway->addItem(KrMethods::plain('COM_KNOWRES_SUCCESS_CONFIRMED'));
	}
}