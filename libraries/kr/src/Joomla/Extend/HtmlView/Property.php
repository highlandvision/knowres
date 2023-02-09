<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR\Joomla\Extend\HtmlView;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\HtmlView as KrHtmlView;
use Joomla\CMS\Toolbar\Toolbar;
use Joomla\CMS\Toolbar\ToolbarHelper;

use function defined;
use function in_array;
use function is_null;

/**
 * Property toolbars
 *
 * @since 4.0.0
 */
class Property extends KrHtmlView
{
	/** @var array Property related views */
	public array $related
		= ['coupons', 'discounts', 'extras', 'images', 'media', 'propertyicals', 'propertyrooms', 'propertyoptions',
		   'ratemarkups', 'rates', 'reviews'];

	/**
	 * Constructor
	 *
	 * @throws Exception
	 * @since  4.0.0
	 */
	public function __construct()
	{
		parent::__construct();
	}

	/**
	 * Add booking actions toolbar button.
	 *
	 * @param  Toolbar  $Toolbar  Toolbar instance
	 *
	 * @throws Exception
	 * @since  4.0.0
	 * @return Toolbar
	 */
	public function addChildBooking(Toolbar $Toolbar): Toolbar
	{
		if (!$this->allow_book && !$this->allow_block)
		{
			return $Toolbar;
		}

		$dropdown = $Toolbar->dropdownButton('property-booking-group')
		                    ->text('COM_KNOWRES_CONTRACT_TITLE')
		                    ->toggleSplit(false)
		                    ->icon('fas fa-calendar')
		                    ->buttonClass('btn btn-action');

		$ChildToolbar = $dropdown->getChildToolbar();

		if ($this->allow_block || $this->allow_book)
		{
			if ($this->allow_block)
			{
				$link = KrMethods::route('index.php?option=com_knowres&view=contract&task=edit&layout=block');
				$ChildToolbar->linkButton('block', 'COM_KNOWRES_CONTRACT_BLOCK_TITLE_LONG')
				             ->icon('fas fa-lock')
				             ->url($link);
			}
			if ($this->allow_book)
			{
				$link = KrMethods::route('index.php?option=com_knowres&view=contract&task=edit&layout=manager');
				$ChildToolbar->linkButton('block', 'COM_KNOWRES_CONTRACT_MANAGER_TITLE_LONG')
				             ->icon('fas fa-suitcase')
				             ->url($link);

				$link = KrMethods::route('index.php?option=com_knowres&view=contract&task=agent&layout=manager');
				$ChildToolbar->linkButton('block', 'COM_KNOWRES_CONTRACT_AGENT_TITLE_LONG')
				             ->icon('fas fa-headphones')
				             ->url($link);
			}
		}

		return $Toolbar;
	}

	/**
	 * Add dashboard link.
	 *
	 * @param  Toolbar  $Toolbar  Current toolbar.
	 *
	 * @throws Exception
	 * @since  4.0.0
	 * @return Toolbar
	 */
	public function addDashboardLink(Toolbar $Toolbar): Toolbar
	{
		$link = KrMethods::route('index.php?option=com_knowres&task=property.dashboard&id=' . $this->property_id);
		$Toolbar->linkButton('dashboard', 'COM_KNOWRES_DASHBOARD')
		        ->icon('fas fa-tachometer-alt knowres')
		        ->url($link);

		return $Toolbar;
	}

	/**
	 * Add properties link.
	 *
	 * @param  Toolbar  $Toolbar  Current toolbar.
	 *
	 * @throws Exception
	 * @since  4.0.0
	 * @return Toolbar
	 */
	public function addPropertiesLink(Toolbar $Toolbar): Toolbar
	{
		$link = KrMethods::route('index.php?option=com_knowres&view=properties');
		$Toolbar->linkButton('properties', 'COM_KNOWRES_PROPERTIES_TITLE')
		        ->icon('fas fa-home knowres')
		        ->url($link);

		return $Toolbar;
	}

	/**
	 * Add related property data.
	 *
	 * @param  Toolbar  $Toolbar  Current toolbar.
	 * @param  string   $name     Name of view.
	 *
	 * @throws Exception
	 * @since  4.0.0
	 * @return Toolbar
	 */
	public function addRelated(Toolbar $Toolbar, string $name): Toolbar
	{
		$dropdown = $Toolbar->dropdownButton('property-edit-group')
		                    ->text('COM_KNOWRES_TOOLBAR_PROPERTY_DATA')
		                    ->toggleSplit(false)
		                    ->icon('fas fa-network-wired')
		                    ->buttonClass('btn btn-action');
		if ($name == 'properties')
		{
			$dropdown->listCheck(true);
		}

		$ChildToolbar = $dropdown->getChildToolbar();

		if ($name !== 'propertyoptions' && $this->access_level > 10)
		{
			$link = KrMethods::route('index.php?option=com_knowres&view=propertyoptions');
			$ChildToolbar->linkButton('propertyoptions', 'COM_KNOWRES_PROPERTYOPTIONS_TITLE')
			             ->icon('fas fa-question knowres')
			             ->url($link);
		}

		if ($name !== 'coupons' && $this->access_level > 10)
		{
			$link = KrMethods::route('index.php?option=com_knowres&view=coupons');
			$ChildToolbar->linkButton('coupons', 'COM_KNOWRES_COUPONS_TITLE')
			             ->icon('fas fa-money-bill knowres')
			             ->url($link);
		}

		if ($name !== 'discounts' && $this->checkAccess('discount_manage'))
		{
			$link = KrMethods::route('index.php?option=com_knowres&view=discounts');
			$ChildToolbar->linkButton('discounts', 'COM_KNOWRES_DISCOUNTS_TITLE')
			             ->icon('fas fa-percent knowres')
			             ->url($link);
		}

		if ($name !== 'extras' && $this->checkAccess('extra_manage'))
		{
			$link = KrMethods::route('index.php?option=com_knowres&view=extras');
			$ChildToolbar->linkButton('extras', 'COM_KNOWRES_EXTRAS_TITLE')
			             ->icon('fas fa-plus knowres')
			             ->url($link);
		}

		if ($name !== 'propertyicals' && $this->access_level > 10)
		{
			$link = KrMethods::route('index.php?option=com_knowres&view=propertyicals');
			$ChildToolbar->linkButton('icals', 'COM_KNOWRES_PROPERTYICALS_TITLE')
			             ->icon('fas fa-calendar knowres')
			             ->url($link);
		}

		if ($name !== 'media' && $this->access_level > 10)
		{
			$link = KrMethods::route('index.php?option=com_knowres&view=media&id=' . $this->property_id);
			$ChildToolbar->linkButton('media', 'COM_KNOWRES_TITLE_PROPERTY_MEDIA')
			             ->icon('fas fa-image knowres')
			             ->url($link);
		}

		if ($name !== 'ratemarkups' && $this->access_level > 10)
		{
			$link = KrMethods::route('index.php?option=com_knowres&view=ratemarkups');
			$ChildToolbar->linkButton('ratemarkups', 'COM_KNOWRES_RATEMARKUPS_TITLE')
			             ->icon('fas fa-chart-line knowres')
			             ->url($link);
		}

		if ($name !== 'property' && $this->checkAccess('property_edit'))
		{
			$link = KrMethods::route('index.php?option=com_knowres&task=property.edit&id=' . $this->property_id);
			$ChildToolbar->linkButton('icals', 'COM_KNOWRES_PROPERTY')
			             ->icon('fas fa-calendar knowres')
			             ->url($link);
		}

		if ($name !== 'propertysettings' && $this->access_level > 10)
		{
			$link = KrMethods::route('index.php?option=com_knowres&task=propertysettings.solo');
			$ChildToolbar->linkButton('media', 'COM_KNOWRES_PROPERTYSETTINGS_TITLE')
			             ->icon('fas fa-home knowres')
			             ->url($link);
		}

		if ($name !== 'rates' && $this->checkAccess('rate_manage'))
		{
			$link = KrMethods::route('index.php?option=com_knowres&view=rates');
			$ChildToolbar->linkButton('rates', 'COM_KNOWRES_RATES_TITLE')
			             ->icon('fas fa-euro-sign knowres')
			             ->url($link);
		}

		if ($name !== 'reviews' && $this->access_level == 40)
		{
			$link = KrMethods::route('index.php?option=com_knowres&view=reviews');
			$ChildToolbar->linkButton('reviews', 'COM_KNOWRES_REVIEWS_TITLE')
			             ->icon('fas fa-comment knowres')
			             ->url($link);
		}

		if ($name !== 'propertyrooms' && $this->access_level > 10)
		{
			$link = KrMethods::route('index.php?option=com_knowres&view=propertyrooms');
			$ChildToolbar->linkButton('propertyrooms', 'COM_KNOWRES_PROPERTYROOMS_TITLE')
			             ->icon('fas fa-bed knowres')
			             ->url($link);
		}

		if ($name !== 'images' && $this->checkAccess('property_add'))
		{
			$link = KrMethods::route('index.php?option=com_knowres&view=images');
			$ChildToolbar->linkButton('images', 'COM_KNOWRES_IMAGES_TITLE')
			             ->icon('fas fa-images knowres')
			             ->url($link);
		}

		return $Toolbar;
	}

	/**
	 * Add the custom toolbar for the property.
	 *
	 * @param  Toolbar  $Toolbar  Current toolbar
	 * @param  string   $name     Name of view
	 *
	 * @throws Exception
	 * @since  2.0.0
	 */
	public function addToolbar(Toolbar $Toolbar, string $name): Toolbar
	{
		if ((!in_array($name, $this->related) || $name == 'media') && $name != 'calendar'
			&& $this->checkAccess('property_edit'))
		{
			$link = KrMethods::route('index.php?option=com_knowres&task=property.edit&id=' . $this->property_id);
			$Toolbar->linkButton('property', 'COM_KNOWRES_EDIT_PROPERTY')
			        ->icon('fas fa-edit knowres')
			        ->url($link);
		}

		if (!empty($this->switch))
		{
			$title = KrMethods::plain('COM_KNOWRES_PROPERTY_SWITCH_TITLE');
			$html  = KrMethods::render('toolbar.property.switch', ['title' => $title]);
			$Toolbar->customButton('propertyswitch')
			        ->html($html);
		}
		if (!empty($this->clone))
		{
			$title = KrMethods::plain('COM_KNOWRES_PROPERTY_CLONE_TOOLBAR_FROM');
			$html  = KrMethods::render('toolbar.property.clone', ['title' => $title]);
			$Toolbar->customButton('propertyclone')
			        ->html($html);
		}

		$Toolbar = $this->addRelated($Toolbar, $name);

		if (!in_array($name, $this->related))
		{
			$Toolbar = $this->addChildBooking($Toolbar);
		}

		if (!in_array($name, $this->related) && $name !== 'calendar')
		{
			$link = KrMethods::route('index.php?option=com_knowres&task=property.calendar&property_id='
				. $this->property_id);
			$Toolbar->linkButton('calendar', 'COM_KNOWRES_TITLE_PROPERTY_CALENDAR')
			        ->icon('fas fa-calendar knowres')
			        ->url($link);
		}
		if ($name !== 'dashboard')
		{
			$link = KrMethods::route('index.php?option=com_knowres&task=property.dashboard&id=' . $this->property_id);
			$Toolbar->linkButton('dashboard', 'COM_KNOWRES_PROPERTYDASHBOARD_TITLE')
			        ->icon('fas fa-tachometer-alt knowres')
			        ->url($link);
		}
		if (!empty($this->preview_link))
		{
			$Toolbar->linkButton('link', 'COM_KNOWRES_TOOLBAR_PREVIEW')
			        ->target('_blank')
			        ->url($this->preview_link);
		}

		$Toolbar = $this->addConfigToolbar($Toolbar);
		$Toolbar = $this->addQuickLinksToolbar($Toolbar);
		$Toolbar = $this->addBackLink($Toolbar);

		$link = KrMethods::route('index.php?option=com_knowres&view=properties');
		$Toolbar->linkButton('close', 'JTOOLBAR_CLOSE')
		        ->buttonClass('btn btn-danger')
		        ->icon('fas fa-times knowres')
		        ->url($link);

		if ($this->canDo->get('core.admin'))
		{
			ToolbarHelper::preferences('com_knowres');
		}

		return $Toolbar;
	}

	/**
	 * Add the default toolbar for list view.
	 *
	 * @param  ?string  $list_name  Name of list model
	 * @param  bool     $multiple   True for multiple forms
	 *
	 * @throws Exception
	 * @since  4.0.0
	 * @return Toolbar
	 */
	protected function addListToolbar(?string $list_name = null, bool $multiple = false): Toolbar
	{
		$Toolbar = Toolbar::getInstance();

		$list_name = is_null($list_name) ? $this->form_name . 's' : $list_name;

		if ($this->checkAccess('property_add'))
		{
			$task = $this->form_name . '.add';
			if (!$multiple)
			{
				$Toolbar->addNew($task);
			}
			else
			{
				$Toolbar->standardButton('new')
				        ->icon('fas fa-plus knowres')
				        ->onclick((array) "Joomla.submitform('$task', document.getElementById('adminForm'));")
				        ->text('JTOOLBAR_NEW');
			}
		}

		if ($this->checkAccess('property_edit'))
		{
			$Toolbar = $this->addChildActionsToolbar($Toolbar, $list_name);
		}

		if ($list_name != 'properties')
		{
			$Toolbar = $this->addRelated($Toolbar, $list_name);
			$Toolbar = $this->addDashboardLink($Toolbar);
			$Toolbar = $this->addPropertiesLink($Toolbar);
		}
		else if ($this->access_level == 40)
		{
			$Toolbar = $this->addPropertiesDropdown($Toolbar);
		}

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
	 * Add properties dropdown (global property data).
	 *
	 * @param  Toolbar  $Toolbar    Current toolbar.
	 * @param  ?string  $list_name  Current view
	 *
	 * @throws Exception
	 * @since  4.0.0
	 * @return Toolbar
	 */
	protected function addPropertiesDropdown(Toolbar $Toolbar, ?string $list_name = null): Toolbar
	{
		$dropdown     = $Toolbar->dropdownButton('settings-property-group')
		                        ->text('COM_KNOWRES_TOOLBAR_PROPERTIES_DATA')
		                        ->toggleSplit(false)
		                        ->icon('fas fa-home knowres')
		                        ->buttonClass('btn btn-action');
		$ChildToolbar = $dropdown->getChildToolbar();

		if ($list_name != 'propertyfeatures')
		{
			$ChildToolbar->linkButton('propertyfeatures', 'COM_KNOWRES_PROPERTYFEATURES_TITLE')
			             ->icon('fas fa-laptop-house knowres')
			             ->url(KrMethods::route('index.php?option=com_knowres&view=propertyfeatures'));
		}

		if ($list_name != 'bedtypes')
		{
			$ChildToolbar->linkButton('bedtypes', 'COM_KNOWRES_BEDTYPES_TITLE')
			             ->icon('fas fa-bed knowres')
			             ->url(KrMethods::route('index.php?option=com_knowres&view=bedtypes'));
		}

		if ($list_name != 'categories')
		{
			$ChildToolbar->linkButton('categories', 'COM_KNOWRES_CATEGORIES_TITLE')
			             ->icon('fas fa-project-diagram knowres')
			             ->url(KrMethods::route('index.php?option=com_knowres&view=categories'));
		}

		if ($list_name != 'clusters')
		{
			$ChildToolbar->linkButton('clusters', 'COM_KNOWRES_CLUSTERS_TITLE')
			             ->icon('fas fa-object-group knowres')
			             ->url(KrMethods::route('index.php?option=com_knowres&view=clusters'));
		}

		if ($list_name != 'propertyfields')
		{
			$ChildToolbar->linkButton('propertyfields', 'COM_KNOWRES_PROPERTYFIELDS_TITLE')
			             ->icon('fas fa-ellipsis-h knowres')
			             ->url(KrMethods::route('index.php?option=com_knowres&view=propertyfields'));
		}

		if ($list_name != 'managers')
		{
			$ChildToolbar->linkButton('managers', 'COM_KNOWRES_MANAGERS_TITLE')
			             ->icon('fas fa-users knowres')
			             ->url(KrMethods::route('index.php?option=com_knowres&view=managers'));
		}

		if ($list_name != 'propertysettings')
		{
			$ChildToolbar->linkButton('propertysettings', 'COM_KNOWRES_PROPERTYSETTINGS_DEFAULT_TITLE')
			             ->icon('fas fa-wrench knowres')
			             ->url(KrMethods::route('index.php?option=com_knowres&view=propertysettings'));
		}

		if ($list_name != 'owners')
		{
			$ChildToolbar->linkButton('owners', 'COM_KNOWRES_OWNERS_TITLE')
			             ->icon('fas fa-house-user knowres')
			             ->url(KrMethods::route('index.php?option=com_knowres&view=owners'));
		}

		if ($list_name != 'seasons')
		{
			$ChildToolbar->linkButton('seasons', 'COM_KNOWRES_SEASONS_TITLE')
			             ->icon('fas fa-cloud-sun-rain knowres')
			             ->url(KrMethods::route('index.php?option=com_knowres&view=seasons'));
		}

		if ($list_name != 'rooms' && $this->params->get('property_rooms', 0))
		{
			$ChildToolbar->linkButton('rooms', 'COM_KNOWRES_ROOMS_TITLE')
			             ->icon('fas fa-person-booth knowres')
			             ->url(KrMethods::route('index.php?option=com_knowres&view=rooms'));
		}

		if ($list_name != 'types')
		{
			$ChildToolbar->linkButton('types', 'COM_KNOWRES_TYPES_TITLE')
			             ->icon('fas fa-keyboard knowres')
			             ->url(KrMethods::route('index.php?option=com_knowres&view=types'));
		}

		return $Toolbar;
	}
}