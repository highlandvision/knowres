<?php
/**
 * @package    Know Reservations
 * @subpackage Admin Services
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use Joomla\CMS\Extension\Service\Provider\HelperFactory;
use Joomla\CMS\Extension\Service\Provider\Module;
use Joomla\CMS\Extension\Service\Provider\ModuleDispatcherFactory;
use Joomla\DI\Container;
use Joomla\DI\ServiceProviderInterface;

/**
 * KR service provider.
 *
 * @since  4.0.0
 */
return new class implements ServiceProviderInterface {
	/**
	 * Registers the service provider with a DI container.
	 *
	 * @param  Container  $container  The DI container.
	 *
	 * @since   4.0.0
	 * @return  void
	 */
	public function register(Container $container): void
	{
		$container->registerServiceProvider(new ModuleDispatcherFactory('\\HighlandVision\\Module\\KnowresSpotlight'));
		$container->registerServiceProvider(new HelperFactory('\\HighlandVision\\Module\\KnowresSpotlight\\Site\\Helper'));
		$container->registerServiceProvider(new Module);
	}
};