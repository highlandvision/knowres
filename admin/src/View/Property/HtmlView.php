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
use HighlandVision\Component\Knowres\Administrator\Model\PropertyModel;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\HtmlView as KrHtmlView;
use HighlandVision\KR\Session as KrSession;
use Joomla\CMS\Toolbar\ToolbarHelper;

use function strtolower;

/**
 * Edit a property
 *
 * @since 1.0.0
 */
class HtmlView extends KrHtmlView
{
	/** @var ?float Property latitude. */
	public ?float $lat = 0;
	/** @var ?float Property longitude. */
	public ?float $lng = 0;/**
	/** @var array Property settings. */
	public array $settings;

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
		KrMethods::setUserState('com_knowres.edit.property.data', null);

		/** @var PropertyModel $model */
		$model       = $this->getModel();
		$this->form  = $model->getForm();
		$this->item  = $model->getItem();
		$this->state = $model->getState();

		$this->getUserSessionData(false);
		$userSession        = new KrSession\User();
		$userData           = $userSession->getData();
		$this->access_level = $userData->access_level;
		$this->properties   = $userData->properties;
		if (isset($this->item->id))
		{
			$userData->cr_property_id   = (int) $this->item->id;
			$userData->cr_property_name = (string) $this->item->property_name;
			$userData->cr_country_id    = (int) $this->item->country_id;
			$userData->cr_region_id     = (int) $this->item->region_id;
			$userData->cr_town_id       = (int) $this->item->town_id;
			$userSession->setData($userData);
		}

		KrMethods::setUserState('com_knowres.gobackto', 'task=property.dashboard&id=' . $this->item->id);
		$this->params   = KrMethods::getParams();
		$this->settings = KrFactory::getListModel('propertysettings')->getPropertysettings($this->item->id);

		$this->checkVersions();
		$this->checkErrors();
		$this->setTitle();
		$Toolbar = $this->addFormToolbar(strtolower($this->getName()));

		parent::display($tpl);
	}

	/**
	 * Add the page title and toolbar
	 *
	 * @since  1.0.0
	 */
	protected function setTitle(): void
	{
		if (empty($this->item->id))
		{
			ToolbarHelper::title(KrMethods::plain('COM_KNOWRES_FORM_PROPERTY_TITLE') . ' - '
				. KrMethods::plain('COM_KNOWRES_PROPERTY_NEW'), 'fa-solid fa-home knowres');
		}
		else
		{
			ToolbarHelper::title(KrMethods::plain('COM_KNOWRES_FORM_PROPERTY_TITLE') . ' - '
				. $this->item->property_name, 'fa-solid fa-home knowres');
		}
	}
}