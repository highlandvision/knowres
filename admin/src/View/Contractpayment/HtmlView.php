<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\View\Contractpayment;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\Component\Knowres\Administrator\Model\ContractpaymentModel;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\HtmlView as KrHtmlView;
use HighlandVision\KR\Utility;
use Joomla\CMS\Toolbar\ToolbarHelper;

use function strtolower;

/**
 * Contract payment edit view
 *
 * @since 1.0.0
 */
class HtmlView extends KrHtmlView
{
	/** @var false|object Contract row. */
	public false|object $contract;
	/** @var array Payment currencies. */
	public array $currencies = [];

	/**
	 * Display the view
	 *
	 * @param  null  $tpl  Default template
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return void
	 */
	public function display($tpl = null): void
	{
		$contract_id = KrMethods::getUserState('com_knowres.current.contract_id', 0);
		if (!$contract_id)
		{
			Utility::goto('contracts');
		}

		/** @var ContractpaymentModel $model */
		$model        = $this->getModel();
		$this->form   = $model->getForm();
		$this->item   = $model->getItem();
		$this->state  = $model->getState();
		$this->params = KrMethods::getParams();

		$this->checkVersions();
		$this->checkErrors();

		$this->contract = KrFactory::getAdminModel('contract')->getItem($contract_id);
		$this->setCurrencies();
		$this->form_name = KrMethods::plain('COM_KNOWRES_CONTRACTPAYMENT_TITLE');
		$this->getFormAriaLabel();
		ToolbarHelper::title($this->form_name, 'fa-solid fa-euro-sign knowres');
		$this->addFormToolbar(strtolower($this->getName()));

		parent::display($tpl);
	}

	/**
	 * Set the available payment currencies
	 *
	 * @since 1.0.0
	 */
	protected function setCurrencies()
	{
		$this->currencies[] = $this->contract->currency;

		$currencies = KrFactory::getListModel('currencies')->getPaymentCurrencies($this->contract->currency);
		$currencies = explode(',', $currencies);
		foreach ($currencies as $c)
		{
			$this->currencies[] = $c;
		}
	}
}