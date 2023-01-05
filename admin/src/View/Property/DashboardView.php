<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\View\Property;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\HtmlView as KrHtmlView;
use HighlandVision\KR\TickTock;
use Joomla\CMS\Factory;
use Joomla\CMS\Form\Form;
use Joomla\CMS\Toolbar\Toolbar;
use Joomla\CMS\Toolbar\ToolbarHelper;
use Joomla\Registry\Registry;

use function count;
use function defined;

/**
 * Property dashboard view
 *
 * @since 1.0.0
 */
class DashboardView extends KrHtmlView\Property
{
	/** @var bool Clone allowed */
	public bool $clone = false;
	/** @var Form Clone form */
	public Form $formclone;
	/** @var Form Switch form */
	public Form $formswitch;
	/** @var Registry KR params */
	public Registry $params;
	/** @var array Periods for stats. */
	protected array $periods = ['day', 'week', 'month', 'year'];
	/** @var array Generated stats. */
	protected array $stats = [];
	/** @var array Stats level. */
	protected array $stats_type = [];
	/** @var bool Switch allowed */
	public bool $switch = false;

	/**
	 * Display the view
	 *
	 * @param  ?string  $tpl  A template file to load. [optional]
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return void
	 */
	public function display($tpl = null): void
	{
		$this->setLayout('dashboard');
		$this->getActions();
		$this->getUserSessionData();

		$properties = explode(',', $this->properties);

		if ($this->access_level > 20 || (is_countable($properties) && count($properties)))
		{
			$this->formswitch = KrFactory::getAdhocForm('switch', 'property_switch.xml');
			$this->switch     = true;
		}
		if ($this->access_level >= 20 && ($this->canDo->get('core.edit') || $this->canDo->get('core.create')))
		{
			$this->formclone = KrFactory::getAdhocForm('clone', 'property_clone.xml');
			$this->clone     = true;
		}

		$this->checkErrors();

		$this->today     = TickTock::getDate();
		$this->params    = KrMethods::getParams();
		$this->contracts = KrFactory::getListModel('contracts')->getDataForPropertyStats($this->property_id,
			TickTock::modifyDays('now', 365, '-'));

		$this->initStats();
		$this->setStats();

		Factory::getApplication()->input->set('hidemainmenu', true);
		$title = KrMethods::plain('COM_KNOWRES_PROPERTYDASHBOARD_TITLE') . ' - ' . $this->property_name;
		ToolbarHelper::title($title, 'fas fa-home knowres');
		$Toolbar = Toolbar::getInstance();
		$this->addToolbar($Toolbar, 'dashboard');
		KrMethods::setUserState('com_knowres.gobackto',
			'task=property.dashboard&layout=dashboard&id=' . $this->property_id);

		parent::display($tpl);
	}

	/**
	 * Initialize stats array
	 *
	 * @throws Exception
	 * @since  3.0.0
	 */
	protected function initStats()
	{
		$this->stats_type    = [];
		$this->stats_type[0] = KrMethods::plain('COM_KNOWRES_MENU_PROPERTY_STATISTICS_ALL');
		$this->stats_type[1] = KrMethods::plain('COM_KNOWRES_MENU_PROPERTY_STATISTICS_AGENT');
		$this->stats_type[2] = KrMethods::plain('COM_KNOWRES_MENU_PROPERTY_STATISTICS_MANAGER');
		$this->stats_type[3] = KrMethods::plain('COM_KNOWRES_MENU_PROPERTY_STATISTICS_GUEST');

		foreach ($this->periods as $p)
		{
			foreach ($this->stats_type as $type)
			{
				$this->stats[$p][$type][0] = 0;
				$this->stats[$p][$type][1] = 0;
				$this->stats[$p][$type][2] = 0;
			}
		}
	}

	/**
	 * Read contracts and set status
	 *
	 * @throws Exception
	 * @since 3.0.0
	 */
	protected function setStats()
	{
		$year  = TickTock::modifyYears('now', 1, '-');
		$month = TickTock::modifyDays('now', 30, '-');
		$week  = TickTock::modifyDays('now', 7, '-');

		foreach ($this->contracts as $c)
		{
			if ($c->created_at >= $this->today)
			{
				$this->updateStats('day', $c);
				$this->updateStats('week', $c);
				$this->updateStats('month', $c);
				$this->updateStats('year', $c);
			}
			else if ($c->created_at >= $week)
			{
				$this->updateStats('week', $c);
				$this->updateStats('month', $c);
				$this->updateStats('year', $c);
			}
			else if ($c->created_at >= $month)
			{
				$this->updateStats('month', $c);
				$this->updateStats('year', $c);
			}
			else if ($c->created_at >= $year)
			{
				$this->updateStats('year', $c);
			}
		}
	}

	/**
	 * Update stats periods
	 *
	 * @param   string  $period  Period to update
	 * @param   object  $c       Contract Db
	 *
	 * @throws Exception
	 * @since  3.0.0
	 */
	protected function updateStats(string $period, object $c)
	{
		$days = TickTock::differenceDays($c->arrival, $c->departure);

		$this->stats[$period][$this->stats_type[0]][0] += 1;
		$this->stats[$period][$this->stats_type[0]][1] += $days;
		$this->stats[$period][$this->stats_type[0]][2] += (float) $c->room_total;

		if ($c->agent_id)
		{
			$this->stats[$period][$this->stats_type[1]][0] += 1;
			$this->stats[$period][$this->stats_type[1]][1] += $days;
			$this->stats[$period][$this->stats_type[1]][2] += (float) $c->room_total;
		}
		else if ($c->created_by > 0)
		{
			$this->stats[$period][$this->stats_type[2]][0] += 1;
			$this->stats[$period][$this->stats_type[2]][1] += $days;
			$this->stats[$period][$this->stats_type[2]][2] += (float) $c->room_total;
		}
		else
		{
			$this->stats[$period][$this->stats_type[3]][0] += 1;
			$this->stats[$period][$this->stats_type[3]][1] += $days;
			$this->stats[$period][$this->stats_type[3]][2] += (float) $c->room_total;
		}
	}
}