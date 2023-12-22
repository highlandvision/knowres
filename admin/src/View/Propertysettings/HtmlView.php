<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\View\Propertysettings;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\Component\Knowres\Administrator\Model\PropertysettingsModel;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\HtmlView as KrHtmlView;
use HighlandVision\KR\Session as KrSession;
use HighlandVision\KR\Utility;
use Joomla\CMS\Factory;
use Joomla\CMS\Toolbar\Toolbar;
use Joomla\CMS\Toolbar\ToolbarHelper;

use function defined;

/**
 * List property settings
 *
 * @since 1.0.0
 */
class HtmlView extends KrHtmlView
{
	/** @var array Current setting values. */
	public array $settings = [];
	/** @var array Current setting IDs. */
	public array $settings_ids = [];
	/** @var string Task value. */
	public string $task = '';
	/** @var array Taxrate rows. */
	public array $taxrates = [];

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
		if (empty($this->task) || $this->task !== 'solo') {
			$user               = new KrSession\User();
			$this->access_level = $user->getAccessLevel();
			if ($this->access_level < 40) {
				Utility::goto('properties');
			}

			$this->property_id   = 0;
			$this->property_name = 'Global';
			$this->properties    = '';
		}
		else {
			$this->getUserSessionData();
		}

		$model       = new PropertysettingsModel();
		$this->state = $model->getState();
		$this->state->set('filter.property_id', $this->property_id);
		$this->items  = $model->getItems();
		$this->params = KrMethods::getParams();

		$this->setFormData();
		$this->storeSettings();

		$this->checkErrors();
		$title = KrMethods::plain('COM_KNOWRES_PROPERTYSETTINGS_TITLE') . ' - ' . $this->property_name;
		ToolbarHelper::title($title, 'fa-solid fa-wrench knowres');
		$this->addFormToolbar('propertysettings');

		parent::display($tpl);
	}

	/**
	 * Add the page title and default toolbar for form view.
	 *
	 * @param  string  $name  Name of the form
	 *
	 * @throws Exception
	 * @since  4.0.0
	 * @return Toolbar
	 */
	protected function addFormToolbar(string $name): Toolbar
	{
		Factory::getApplication()->input->set('hidemainmenu', true);

		$Toolbar = Toolbar::getInstance();
		$this->getActions();

		if ($this->canDo->get('core.edit')) {
			$Toolbar->apply($name . '.apply');
			$Toolbar->save($name . '.save');
			$Toolbar->cancel($name . '.cancel');
		}

		return $Toolbar;
	}

	/**
	 * Set the adhoc form data from the settings
	 *
	 * @since  4.0.0
	 */
	protected function setFormData(): void
	{
		$this->form = KrFactory::getAdhocForm('propertysettings', 'propertysettings.xml', 'administrator', null);
		$data       = [];
		foreach ($this->items as $i) {
			$data[$i->akey] = $i->value;
		}

		$this->form->bind($data);
	}

	/**
	 * Store the settings - db access sorted into default (property_id=0) first followed
	 * by property specific so property specific will overwrite default if it exists
	 *
	 * @since  4.0.0
	 */
	protected function storeSettings(): void
	{
		foreach ($this->items as $item) {
			if ($this->property_id) {
				$this->settings[$item->akey] = $item->value;

				if ($item->property_id) {
					$this->settings_ids[$item->akey] = $item->id;
				}
				else {
					$this->settings_ids[$item->akey] = 0;
				}
			}
			else {
				if (!$item->property_id) {
					$this->settings_ids[$item->akey] = $item->id;
					$this->settings[$item->akey]     = $item->value;
				}
			}
		}
	}
}