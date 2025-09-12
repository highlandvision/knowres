<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\View\Properties;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\Component\Knowres\Administrator\Model\PropertiesModel;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\HtmlView as KrHtmlView;
use HighlandVision\KR\Session as KrSession;
use Joomla\CMS\Toolbar\ToolbarHelper;

use function defined;
use function in_array;

/**
 * List properties
 *
 * @since  1.0.0
 */
class HtmlView extends KrHtmlView\Property
{
	/** @var bool Agents exist. */
	public bool $agent = false;
	/** @var bool Allow black booking. */
	public bool $allow_block = true;
	/** @var bool Allow booking. */
	public bool $allow_book = true;

	/**
	 * Display the view
	 *
	 * @param  ?string  $tpl  A template file to load. [optional]
	 *
	 * @throws  Exception
	 * @since   1.0.0
	 * @return  void
	 */
	public function display($tpl = null): void
	{
		/** @var PropertiesModel $model * */
		$model               = $this->getModel();
		$this->state         = $model->getState();
		$this->items         = $model->getItems();
		$this->pagination    = $model->getPagination();
		$this->filterForm    = $model->getFilterForm();
		$this->activeFilters = $model->getActiveFilters();
		$this->ordering      = in_array('ordering', $model->getFilterFields());
		$this->form_name     = 'property';

		if (!$this->checkEmpty())
		{
			$this->checkErrors();

			$userSession        = new KrSession\User();
			$this->access_level = $userSession->getAccessLevel();
			$userSession->resetCurrentProperty();
			$this->params = KrMethods::getParams();

			$agents = KrFactory::getListModel('agents')->getAgents();
			if (is_countable($agents) && count($agents))
			{
				$this->agent = true;
			}

			if ($this->access_level == 10)
			{
				$this->allow_block = (bool) $this->params->get('block_add');
				$this->allow_book  = (bool) $this->params->get('contract_add');
			}

			ToolbarHelper::title(KrMethods::plain('COM_KNOWRES_PROPERTIES_TITLE'), 'tasks knowres');
			$this->addListToolbar($this->get('name'));

			parent::display($tpl);
		}
	}
}