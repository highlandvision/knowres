<?php
/**
 * @package    Know Reservations
 * @subpackage Site View
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Site\View\Review;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\Component\Knowres\Site\Model\ReviewModel;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\HtmlView as KrHtmlView;
use HighlandVision\KR\Session as KrSession;
use HighlandVision\KR\SiteHelper;
use Joomla\CMS\Object\CMSObject;

/**
 * Guest review form
 *
 * @since 1.0.0
 */
class HtmlView extends KrHtmlView\Site
{
	/** @var CMSObject|bool Contract row. */
	public CMSObject|bool $contract;

	/**
	 * Display the view
	 *
	 * @param   null  $tpl  Default template.
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return void
	 */
	public function display($tpl = null): void
	{
		$userSession = new KrSession\User();
		$userData    = $userSession->getData();
		$contract_id = $userData->db_contract_id;
		if (!$contract_id)
		{
			SiteHelper::redirectHome();
		}

		$this->contract = KrFactory::getAdminModel('contract')->getItem($contract_id);
		if (empty($this->contract->id))
		{
			SiteHelper::redirectHome();
		}

		if ($this->contract->reviewed)
		{
			KrMethods::message(KrMethods::plain('COM_KNOWRES_REVIEW_ENTERED'));
			SiteHelper::redirectHome();
		}

		$this->params = KrMethods::getParams();

		/** @var ReviewModel $model */
		$model      = $this->getModel();
		$this->item = $model->getItem();
		$this->form = $model->getForm();

		$this->meta_title       = KrMethods::plain('COM_KNOWRES_REVIEW_META');
		$this->meta_description = KrMethods::plain('COM_KNOWRES_REVIEW_META');
		$this->prepareDocument();

		parent::display($tpl);
	}

	/**
	 * Prepare the document
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	protected function prepareDocument()
	{
		$this->prepareDefaultDocument($this->meta_title, $this->meta_description);
	}
}