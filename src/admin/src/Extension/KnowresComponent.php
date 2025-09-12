<?php
/**
 * @package         Joomla.Administrator
 * @subpackage      com_knowres
 * @copyright   (C) 2018 Open Source Matters, Inc. <https://www.joomla.org>
 * @license         GNU General Public License version 2 or later; see LICENSE.txt
 */

namespace HighlandVision\Component\Knowres\Administrator\Extension;

defined('_JEXEC') or die;

use HighlandVision\Component\Knowres\Administrator\Service\Html\Knowres;
use Joomla\CMS\Component\Router\RouterServiceInterface;
use Joomla\CMS\Component\Router\RouterServiceTrait;
use Joomla\CMS\Extension\BootableExtensionInterface;
use Joomla\CMS\Extension\MVCComponent;
use Joomla\CMS\HTML\HTMLRegistryAwareTrait;
use Joomla\Database\DatabaseInterface;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\ContainerInterface;
use Psr\Container\NotFoundExceptionInterface;
use RuntimeException;
use UnexpectedValueException;

/**
 * Component class for com_knowres
 *
 * @since  4.0.0
 */
class KnowresComponent extends MVCComponent implements BootableExtensionInterface, RouterServiceInterface
{
	use HTMLRegistryAwareTrait;
	use RouterServiceTrait;

	/**
	 * Booting the extension. This is the function to set up the environment of the extension like
	 * registering new class loaders, etc.
	 * If required, some initial set up can be done from services of the container, e.g.
	 * registering HTML services.
	 *
	 * @param  ContainerInterface  $container  The container
	 *
	 * @throws ContainerExceptionInterface
	 * @throws NotFoundExceptionInterface
	 * @throws RuntimeException
	 * @throws UnexpectedValueException
	 * @since   4.0.0
	 * @return  void
	 */
	public function boot(ContainerInterface $container): void
	{
		$Knowres = new Knowres();
		$Knowres->setDatabase($container->get(DatabaseInterface::class));

		$this->getRegistry()->register('knowres', $Knowres);
	}
}