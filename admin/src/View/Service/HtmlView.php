<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\View\Service;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\Component\Knowres\Administrator\Model\ServiceModel;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\HtmlView as KrHtmlView;
use Joomla\CMS\Form\Form;
use Joomla\CMS\Toolbar\Toolbar;
use Joomla\CMS\Toolbar\ToolbarHelper;

use function defined;
use function strtolower;

/**
 * Edit service view
 *
 * @since 1.0.0
 */
class HtmlView extends KrHtmlView
{
	/** @var Form Adhoc service form. */
	public Form $adhoc;
	/** @var array External services. */
	public array $external
		= ['beyond',
		   'factura',
		   'helpscout',
		   'ru',
		   'vintagetravel',
		   'vrbo',
		   'xero'
		];
	/** @var string Internal name of service. */
	public string $plugin = '';
	/** @var string Type of plugin. */
	public string $type = '';

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
		/** @var ServiceModel $model */
		$model       = $this->getModel();
		$this->state = $model->getState();
		$this->item  = $model->getItem();
		$this->form  = $model->getForm();

		if (!empty($this->item->plugin))
		{
			$this->plugin = $this->item->plugin;
			$this->type   = $this->item->type;
		}
		else
		{
			$this->plugin = KrMethods::inputString('plugin', null, 'get');
			$this->type   = $this->plugin == 'ical' ? 'i' : 'g';
		}

		if (in_array($this->plugin, $this->external))
		{
			$source      = $this->plugin . '.xml';
			$this->adhoc = KrFactory::getAdhocForm($this->plugin, $source, 'library', 'custom');
		}
		else
		{
			$source      = 'service_' . $this->plugin . '.xml';
			$this->adhoc = KrFactory::getAdhocForm($this->plugin, $source, 'administrator', 'custom');
		}

		$this->adhoc->bind($this->item->parameters);

		$this->checkVersions();
		$this->checkErrors();

		$form_name = KrMethods::plain('COM_KNOWRES_SERVICE_TITLE');
		$this->getFormAriaLabel();
		ToolbarHelper::title($form_name, 'fas fa-exchange-alt knowres');
		$Toolbar = $this->addFormToolbar(strtolower($this->getName()));
		if (!empty($this->adhoc->getFieldAttribute('apassword', 'type')))
		{
			$Toolbar = $this->addCustomToolbar($Toolbar);
		}

		parent::display($tpl);
	}

	/**
	 * Add the toolbar.
	 *
	 * @param  Toolbar  $Toolbar  Current toolbar
	 *
	 * @throws Exception
	 * @since  4.0.0
	 * @return Toolbar
	 */
	protected function addCustomToolbar(Toolbar $Toolbar): Toolbar
	{
		ToolbarHelper::custom('service.lnm', 'refresh', 'refresh', 'COM_KNOWRES_RU_RENEW_LNM', false);

		return $Toolbar;
	}
}