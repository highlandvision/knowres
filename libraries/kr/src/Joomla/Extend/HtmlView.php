<?php
/**
 * Joomla! Content Management System
 *
 * @copyright  Copyright (C) 2005 - 2020 Open Source Matters, Inc. All rights reserved.
 * @license    GNU General Public License version 2 or later; see LICENSE.txt
 */

namespace HighlandVision\KR\Joomla\Extend;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Session as KrSession;
use HighlandVision\KR\TickTock;
use HighlandVision\KR\Utility;
use Joomla\CMS\Component\ComponentHelper;
use Joomla\CMS\Factory;
use Joomla\CMS\Form\Form;
use Joomla\CMS\Object\CMSObject;
use Joomla\CMS\Pagination\Pagination;
use Joomla\CMS\Toolbar\Toolbar;
use Joomla\CMS\Toolbar\ToolbarHelper;
use Joomla\Registry\Registry;

use function count;
use function implode;
use function is_countable;
use function is_null;

/**
 * Base class for a Joomla View
 * Class holding methods for displaying presentation data.
 *
 * @since  2.5.5
 */
class HtmlView extends \Joomla\CMS\MVC\View\HtmlView
{
	/** @var int User access level */
	public int $access_level = 0;
	/** @var ?array The active search filters */
	public ?array $activeFilters = [];
	/** @var CMSObject Allowed actions */
	public CMSObject $canDo;
	/** @var ?Form Search tools form */
	public ?Form $filterForm;
	/** @var Form|bool Form model */
	public Form|bool $form;
	/** @var string Form aria labeL */
	public string $form_aria_label = '';
	/** @var string Form name */
	public string $form_name = '';
	/** @var mixed Item object */
	public mixed $item;
	/** @var ?array Array of items */
	public ?array $items;
	/** @var string List name */
	public string $name = '';
	/** @var bool True if ordering required. */
	protected bool $ordering = true;
	/** @var Pagination Pagination object */
	public Pagination $pagination;
	/** @var Registry KR params */
	public Registry $params;
	/** @var string User properties in csv string of IDs */
	public string $properties = '';
	/** @var int ID of property */
	public int $property_id = 0;
	/** @var bool Show state columns */
	public bool $show_state;
	/** @var mixed The model state seems to be mixed */
	public mixed $state;
	/** @var string Today's date as yy-mm-dd */
	public mixed $today;

	/**
	 * Constructor
	 *
	 * @param   array  $config  A named configuration array for object construction.
	 *                          name: the name (optional) of the view (defaults to the view class name suffix).
	 *                          charset: the character set to use for display
	 *                          escape: the name (optional) of the function to use for escaping strings
	 *                          base_path: the parent path (optional) of the view directory (defaults to the component folder)
	 *                          template_plath: the path (optional) of the layout directory (defaults to base_path + /views/ + view name
	 *                          helper_path: the path (optional) of the helper files (defaults to base_path + /helpers/)
	 *                          layout: the layout (optional) to use to display the view
	 *
	 * @throws Exception
	 * @since  4.0.0
	 */
	public function __construct($config = [])
	{
		parent::__construct($config);

		$this->today  = TickTock::getDate();
		$this->params = KrMethods::getParams();
		$this->getUserSessionData(false);
		$this->getActions();
	}

	/**
	 * Set a list of the actions that can be performed by user access level
	 *
	 * @param   string  $view  View to be accessed
	 * @param   int     $id    ID of view
	 *
	 * @since  4.0.0
	 */
	public function getActions(string $view = '', int $id = 0)
	{
		$this->canDo = ContentHelper::getActions('com_knowres', $view, $id);
	}

	/**
	 * Add the back to link if required
	 *
	 * @param   Toolbar  $Toolbar
	 *
	 * @throws Exception
	 * @since  4.0.0
	 * @return Toolbar
	 */
	public static function addBackLink(Toolbar $Toolbar): Toolbar
	{
		$gobackto = KrMethods::getUserState('com_knowres.gobackto');
		if (!empty($gobackto))
		{
			KrMethods::setUserState('com_knowres.gobackto', null);

			$link = KrMethods::route('index.php?option=com_knowres&' . $gobackto);
			$Toolbar->linkButton('back', 'JTOOLBAR_BACK')
			        ->buttonClass('btn btn-danger')
			        ->icon('fas fa-fast-backward knowres')
			        ->url($link);
		}

		return $Toolbar;
	}

	/**
	 * Check for access to edit action
	 *
	 * @param   string  $action  Action being taken
	 *
	 * @since  4.0.0
	 * @return bool
	 */
	public function checkAccess(string $action): bool
	{
		if ($this->access_level > 10 || $this->params->get($action))
		{
			return true;
		}

		return false;
	}

	/**
	 * Any errors?
	 *
	 * @throws Exception
	 * @since  4.0.0
	 */
	public function checkErrors()
	{
		$errors = $this->get('Errors');
		if (is_countable($errors) && count($errors))
		{
			throw new Exception(implode("\n", $errors));
		}
	}

	/**
	 * Any errors?
	 *
	 * @throws Exception
	 * @since  4.0.0
	 */
	public function checkVersions()
	{
		if (!KrMethods::getParams('com_knowres')->get('save_history', 0))
		{
			$this->form->setFieldAttribute('version', 'type', 'hidden');
			$this->form->setFieldAttribute('version_note', 'type', 'hidden');
		}
	}

	/**
	 * Add actions toolbar for list
	 *
	 * @param   Toolbar  $Toolbar  Toolbar instance
	 * @param   string   $name     List name
	 *
	 * @since  4.0.0
	 * @return Toolbar
	 */
	protected function addChildActionsToolbar(Toolbar $Toolbar, string $name): Toolbar
	{
		$dropdown = $Toolbar->dropdownButton('status-group')
		                    ->text('JTOOLBAR_CHANGE_STATUS')
		                    ->toggleSplit(false)
		                    ->icon('icon-ellipsis-h')
		                    ->buttonClass('btn btn-action')
		                    ->listCheck(true);

		$ChildToolbar = $dropdown->getChildToolbar();

		if ($this->canDo->get('core.edit.state'))
		{
			if (isset($this->items[0]->state))
			{
				$ChildToolbar->publish($name . '.publish')
				             ->listCheck(true);
				$ChildToolbar->unpublish($name . '.unpublish')
				             ->listCheck(true);
				$ChildToolbar->archive($name . '.archive')
				             ->listCheck(true);
				$ChildToolbar->checkin($name . '.checkin')
				             ->listCheck(true);

				if ($this->state->get('filter.state') != -2)
				{
					if ($name != 'properties')
					{
						$ChildToolbar->trash($name . '.trash')
						             ->listCheck(true);
					}
					else
					{
						$text = KrMethods::plain('COM_KNOWRES_PROPERTY_TRASH_MESSAGE');
						$ChildToolbar->trash($name . '.markastrash')
						             ->icon('fas fa-trash')
						             ->listCheck(true)
						             ->onclick("return confirm('" . $text
							             . "')?Joomla.submitform('properties.markastrash')):'';")
						             ->text('JTOOLBAR_TRASH');
					}
				}
			}
			else if (isset($this->items[0]) && $this->canDo->get('core.delete'))
			{
				$Toolbar->delete($name . '.delete')
				        ->listCheck(true)
				        ->message('JGLOBAL_CONFIRM_DELETE')
				        ->text('JTOOLBAR_DELETE');
			}
		}

		if ($this->state->get('filter.state') == -2 && $this->canDo->get('core.delete'))
		{
			if ($name != 'properties')
			{
				$Toolbar->delete($name . '.delete')
				        ->icon('fas fa-trash red')
				        ->listCheck(true)
				        ->message('JGLOBAL_CONFIRM_DELETE')
				        ->text('JTOOLBAR_EMPTY_TRASH');
			}
			else
			{
				$text = KrMethods::plain('COM_KNOWRES_PROPERTY_DELETE_MESSAGE');
				$Toolbar->delete($name . '.markfordeletion')
				        ->icon('fas fa-trash red')
				        ->listCheck(true)
				        ->message($text)
				        ->text('JTOOLBAR_EMPTY_TRASH');
			}
		}

		return $Toolbar;
	}

	/**
	 * Add any custom toolbar links
	 *
	 * @param   Toolbar  $Toolbar  Current toolbar instance
	 *
	 * @since  4.0.0
	 * @return Toolbar
	 */
	protected function addCustomToolbar(Toolbar $Toolbar): Toolbar
	{
		return $Toolbar;
	}

	/**
	 * Add the page title and default toolbar for form view.
	 *
	 * @param   string  $name  Name of the form
	 *
	 * @throws Exception
	 * @since  4.0.0
	 * @return Toolbar
	 */
	protected function addFormToolbar(string $name): Toolbar
	{
		Factory::getApplication()->input->set('hidemainmenu', true);

		$Toolbar = Toolbar::getInstance();
		$isNew   = empty($this->item->id);
		$this->getActions($name, !empty($this->item_id) ? $this->item_id : 0);

		$checkedOut = false;
		if (!empty($this->item->checked_out))
		{
			$checkedOut = !($this->item->checked_out == 0 || $this->item->checked_out == KrMethods::getUser()->id);
		}

		$toolbarButtons = [];
		if ($isNew && $this->canDo->get('core.create'))
		{
			ToolbarHelper::apply($name . '.apply');
			ToolbarHelper::saveGroup(
				[
					['save', $name . '.save'],
					['save2new', $name . '.save2new']
				],
			);

			$Toolbar->cancel($name . '.cancel', 'JTOOLBAR_CANCEL');
		}

		if (!$isNew && !$checkedOut && $this->canDo->get('core.edit'))
		{
			ToolbarHelper::apply($name . '.apply');
			$toolbarButtons[] = ['save', $name . '.save'];

			if ($this->canDo->get('core.create'))
			{
				$toolbarButtons[] = ['save2new', $name . '.save2new'];
				$toolbarButtons[] = ['save2copy', $name . '.save2copy'];
			}

			ToolbarHelper::saveGroup(
				$toolbarButtons
			);

			if (ComponentHelper::isEnabled('com_contenthistory') && $this->state->params->get('save_history', 0)
				&& $this->canDo->get('core.edit'))
			{
				$Toolbar->versions('com_knowres.' . $name, $this->item->id);
			}

			$Toolbar->cancel($name . '.cancel', 'JTOOLBAR_CANCEL');
		}

		return $Toolbar;
	}

	/**
	 * Add the default toolbar for list view.
	 *
	 * @param  ?string  $list_name  Name of list model
	 *
	 * @throws Exception
	 * @since  4.0.0
	 * @return Toolbar
	 */
	protected function addListToolbar(?string $list_name = null): Toolbar
	{
		$Toolbar = Toolbar::getInstance();

		$list_name = is_null($list_name) ? $this->form_name . 's' : $list_name;

		if ($this->canDo->get('core.create'))
		{
			$Toolbar->addNew($this->form_name . '.add');
		}

		$Toolbar = $this->addChildActionsToolbar($Toolbar, $list_name);
		$Toolbar = $this->addCustomToolbar($Toolbar);
		$Toolbar = $this->addConfigToolbar($Toolbar);
		$Toolbar = $this->addQuickLinksToolbar($Toolbar);

		if ($this->canDo->get('core.admin'))
		{
			$Toolbar->preferences('com_knowres');
		}

		return $Toolbar;
	}

	/**
	 * Add the quick links menu
	 *
	 * @param   Toolbar  $Toolbar
	 *
	 * @throws Exception
	 * @since  4.0.0
	 * @return Toolbar
	 */
	protected function addConfigToolbar(Toolbar $Toolbar): Toolbar
	{
		if ($this->access_level == 40)
		{
			$dropdown     = $Toolbar->dropdownButton('config-links-group')
			                        ->text('COM_KNOWRES_TOOLBAR_CONFIG')
			                        ->toggleSplit(false)
			                        ->icon('fas fa-cog')
			                        ->buttonClass('btn btn-action');
			$ChildToolbar = $dropdown->getChildToolbar();

			$ChildToolbar->linkButton('config-countries', 'COM_KNOWRES_COUNTRIES_TITLE')
			             ->icon('fas fa-flag knowres')
			             ->url(KrMethods::route('index.php?option=com_knowres&view=countries'));

			$ChildToolbar->linkButton('config-regions', 'COM_KNOWRES_REGIONS_TITLE')
			             ->icon('fas fa-map-signs knowres')
			             ->url(KrMethods::route('index.php?option=com_knowres&view=regions'));

			$ChildToolbar->linkButton('config-towns', 'COM_KNOWRES_TOWNS_TITLE')
			             ->icon('fas fa-city knowres')
			             ->url(KrMethods::route('index.php?option=com_knowres&view=towns'));

			$ChildToolbar->linkButton('config-mapcategories', 'COM_KNOWRES_MAPCATEGORIES_TITLE')
			             ->icon('fas fa-map-marked knowres')
			             ->url(KrMethods::route('index.php?option=com_knowres&view=mapcategories'));

			$ChildToolbar->linkButton('config-mapmarkers', 'COM_KNOWRES_MAPMARKERS_TITLE')
			             ->icon('fas fa-map-marker knowres')
			             ->url(KrMethods::route('index.php?option=com_knowres&view=mapmarkers'));

			if ($this->params->get('ignore_tax', 1))
			{
				$ChildToolbar->linkButton('config-taxes', 'COM_KNOWRES_TAXES_TITLE')
				             ->icon('fas fa-map-marked knowres')
				             ->url(KrMethods::route('index.php?option=com_knowres&view=taxes'));

				$ChildToolbar->linkButton('config-taxrates', 'COM_KNOWRES_TAXRATES_TITLE')
				             ->icon('fas fa-percent knowres')
				             ->url(KrMethods::route('index.php?option=com_knowres&view=taxrates'));
			}

			$ChildToolbar->linkButton('quick-link-translations', 'COM_KNOWRES_TRANSLATIONS_TITLE')
			             ->icon('fas fa-language knowres')
			             ->url(KrMethods::route('index.php?option=com_knowres&view=translations'));
		}

		return $Toolbar;
	}

	/**
	 * Add the quick links menu
	 *
	 * @param   Toolbar  $Toolbar
	 *
	 * @throws Exception
	 * @since  4.0.0
	 * @return Toolbar
	 */
	protected function addQuickLinksToolbar(Toolbar $Toolbar): Toolbar
	{
		$dropdown     = $Toolbar->dropdownButton('quick-links-group')
		                        ->text('COM_KNOWRES_TOOLBAR_QUICKLINKS')
		                        ->toggleSplit(false)
		                        ->icon('fas fa-link')
		                        ->buttonClass('btn btn-action');
		$ChildToolbar = $dropdown->getChildToolbar();

		$ChildToolbar->linkButton('quick-links-overview', 'COM_KNOWRES_GANTT_TITLE')
		             ->icon('fas fa-calendar-alt knowres')
		             ->url(KrMethods::route('index.php?option=com_knowres&task=gantt.display'));

		$ChildToolbar->linkButton('quick-links-admin', 'COM_KNOWRES_CONTRACTS_DAILY_TITLE')
		             ->icon('fas fa-calendar-day knowres')
		             ->url(KrMethods::route('index.php?option=com_knowres&task=contracts.daily'));

		if ($this->access_level == 40)
		{
			$ChildToolbar->linkButton('quick-links-contractpayments', 'COM_KNOWRES_CONTRACTPAYMENTS_TITLE')
			             ->icon('fas fa-coins knowres')
			             ->url(KrMethods::route('index.php?option=com_knowres&view=contractpayments'));
		}

		$ChildToolbar->linkButton('quick-links-properties', 'COM_KNOWRES_PROPERTIES_TITLE')
		             ->icon('fas fa-home knowres')
		             ->url(KrMethods::route('index.php?option=com_knowres&view=properties'));

		$ChildToolbar->linkButton('quick-links-contracts', 'COM_KNOWRES_CONTRACTS_TITLE')
		             ->icon('fas fa-calendar knowres')
		             ->url(KrMethods::route('index.php?option=com_knowres&view=contracts'));

		if ($this->access_level == 40)
		{
			$ChildToolbar->linkButton('quick-links-contracts', 'COM_KNOWRES_SERVICES_TITLE')
			             ->icon('fas fa-exchange-alt knowres')
			             ->url(KrMethods::route('index.php?option=com_knowres&view=services'));
		}

		return $Toolbar;
	}

	/**
	 * Add services dropdown.
	 *
	 * @param   Toolbar  $Toolbar  Current toolbar.
	 *
	 * @throws Exception
	 * @since  4.0.0
	 * @return Toolbar
	 */
	protected function addServicesDropdown(Toolbar $Toolbar): Toolbar
	{
		$dropdown     = $Toolbar->dropdownButton('services-group')
		                        ->text('COM_KNOWRES_TOOLBAR_SERVICE_DATA')
		                        ->toggleSplit(false)
		                        ->icon('fas fa-exchange-alt knowres')
		                        ->buttonClass('btn btn-action');
		$ChildToolbar = $dropdown->getChildToolbar();

		$ChildToolbar->linkButton('services', 'COM_KNOWRES_SERVICES_TITLE')
		             ->icon('fas fa-concierge-bell knowres')
		             ->url(KrMethods::route('index.php?option=com_knowres&view=services'));

		$ChildToolbar->linkButton('servicelogs', 'COM_KNOWRES_SERVICELOGS_TITLE')
		             ->icon('fas fa-stream knowres')
		             ->url(KrMethods::route('index.php?option=com_knowres&view=servicelogs'));

		$ChildToolbar->linkButton('servicequeues', 'COM_KNOWRES_SERVICEQUEUES_TITLE')
		             ->icon('fas fa-stopwatch knowres')
		             ->url(KrMethods::route('index.php?option=com_knowres&view=servicequeues'));

		$ChildToolbar->linkButton('servicexrefs', 'COM_KNOWRES_SERVICEXREFS_TITLE')
		             ->icon('fas fa-crosshairs knowres')
		             ->url(KrMethods::route('index.php?option=com_knowres&view=servicexrefs'));

		return $Toolbar;
	}

	/**
	 * Empty layout if no rows returned
	 *
	 * @throws Exception
	 * @since  4.0.0
	 * @return bool
	 */
	protected function checkEmpty(): bool
	{
		$this->isEmptyState = $this->get('IsEmptyState');
		if (!is_countable($this->items) || (!count($this->items) && $this->isEmptyState))
		{
			echo KrMethods::render('html.list.emptystate', ['data' => $this]);

			return true;
		}

		return false;
	}

	/**
	 * Get the form aria label.
	 *
	 * @since  4.0.0
	 */
	protected function getFormAriaLabel()
	{
		$text = empty($this->item->id) ? KrMethods::plain('COM_KNOWRES_ADD') : KrMethods::plain('COM_KNOWRES_EDIT');

		$this->form_aria_label = $text . ' ' . $this->form_name;
	}

	/**
	 * Set the user session data.
	 *
	 * @param   bool  $property_required  Set to false if property not required
	 *
	 * @throws Exception
	 * @since  4.0.0
	 */
	protected function getUserSessionData(bool $property_required = true)
	{
		$userSession = new KrSession\User();
		$userData    = $userSession->getData();

		if ($property_required && !(int) $userData->cr_property_id)
		{
			Utility::goto('properties');
		}

		$this->property_id   = (int) $userData->cr_property_id;
		$this->property_name = $userData->cr_property_name;
		$this->access_level  = $userData->access_level;
		$this->properties    = $userData->properties;
	}
}