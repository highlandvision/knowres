<?php
/**
 * @package    Know Reservations
 * @subpackage Plugin
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use Joomla\CMS\Factory;
use Joomla\CMS\Form\Form;
use Joomla\CMS\Plugin\CMSPlugin;

/**
 * Adds menu fields for mega menu
 *
 * @since 1.0.0
 */
class plgSystemKnowresmega extends CMSPlugin
{
	/**
	 * Load the language file on instantiation.
	 *
	 * @since  3.1
	 * @var    boolean
	 */
	protected $autoloadLanguage = true;

	/**
	 * @param $subject
	 * @param $config
	 *
	 * @since 1.0.0
	 */
	function __construct(&$subject, $config)
	{
		parent::__construct($subject, $config);

		Factory::getLanguage()->load('plg_system_knowresmega', JPATH_SITE . '/plugins/system/knowresmega');
	}

	/**
	 * Display the additional form in a tab
	 *
	 * @param $form
	 * @param $data
	 *
	 * @since 1.0.0
	 * @return void
	 */
	function onContentPrepareForm($form, $data): void
	{
		if ($form->getName() == 'com_menus.item')
		{
			$xmlFile = dirname(__FILE__) . '/params';
			Form::addFormPath($xmlFile);
			$form->loadFile('params', false);
		}
	}
}