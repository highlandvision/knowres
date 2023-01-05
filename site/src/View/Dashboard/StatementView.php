<?php
/**
 * @package    Know Reservations
 * @subpackage Site View
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Site\View\Dashboard;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Joomla\Extend\HtmlView as KrHtmlView;
use HighlandVision\KR\SiteHelper;

/**
 * Guest statement view
 *
 * @since  1.0.0
 */
class StatementView extends KrHtmlView\Site
{
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
		try
		{
			list($guest_id, $contract_id) = SiteHelper::validateDashboardSession();
			$this->audience = 'guest';
			$this->item     = KrFactory::getAdminModel('contract')->getItem($contract_id);
			$this->guest    = KrFactory::getAdminModel('guest')->getItem($guest_id);
			$this->notes    = KrFactory::getListModel('contractnotes')->getForContract($this->item->id, 1);
			$this->payments = KrFactory::getListModel('contractpayments')->getForContract($this->item->id);
			$this->fees     = KrFactory::getListModel('contractfees')->getForContract($this->item->id);
			[$this->balance, $this->balance_all] = KrFactory::getAdminModel('contractpayment')::setBalances($this->item,
				$this->payments,
				$this->fees);

			$this->setLayout('statement');
			parent::display($tpl);
		}
		catch (Exception)
		{
			$this->setLayout('error');
			parent::display($tpl);
		}

		jexit();
	}
}