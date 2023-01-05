<?php
/**
 * @package    Know Reservations
 * @subpackage Admin Services
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\Component\Knowres\Administrator\Extension\KnowresComponent;
use Joomla\CMS\Component\Router\RouterFactoryInterface;
use Joomla\CMS\Dispatcher\ComponentDispatcherFactoryInterface;
use Joomla\CMS\Extension\ComponentInterface;
use Joomla\CMS\Extension\Service\Provider\ComponentDispatcherFactory;
use Joomla\CMS\Extension\Service\Provider\MVCFactory;
use Joomla\CMS\Extension\Service\Provider\RouterFactory;
use Joomla\CMS\HTML\Registry;
use Joomla\CMS\MVC\Factory\MVCFactoryInterface;
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
	 * @param   Container  $container  The DI container.
	 *
	 * @since   4.0.0
	 * @return  void
	 */
	public function register(Container $container): void
	{
		$container->registerServiceProvider(new MVCFactory('\\HighlandVision\\Component\\Knowres'));
		$container->registerServiceProvider(new ComponentDispatcherFactory('\\HighlandVision\\Component\\Knowres'));
		$container->registerServiceProvider(new RouterFactory('\\HighlandVision\\Component\\Knowres'));

		$container->set(
			ComponentInterface::class,
			function (Container $container) {
				$component = new KnowresComponent($container->get(ComponentDispatcherFactoryInterface::class));
				$component->setRegistry($container->get(Registry::class));
				$component->setMVCFactory($container->get(MVCFactoryInterface::class));
				$component->setRouterFactory($container->get(RouterFactoryInterface::class));

				return $component;
			}
		);
	}
};