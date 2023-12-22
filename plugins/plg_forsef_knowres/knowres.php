<?php

/**
 * @package     Know Reservations
 * @subpackage  4sef
 * @copyright   2022 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die();

use Joomla\CMS\Plugin\CMSPlugin;
use Joomla\Event\DispatcherInterface;
use Weeblr\Forsef\Factory as ForsefFactory;

/**
 * 4SEF - Loader for a 4SEF SEF URL plugin.
 */
class PlgForsefKnowres extends CMSPlugin
{
	/** @var string Location of plugin file */
	private string $pluginFileName = '/plugin/knowres.php';

	/**
	 * Constructor
	 *
	 * @param   DispatcherInterface  $subject  The object to observe
	 * @param   array                $config   An optional associative array of configuration settings.
	 *                                          Recognized key values include 'name', 'group', 'params', 'language'
	 *                                          (this list is not meant to be comprehensive).
	 *
	 * @since   4.0.0
	 */
	public function __construct(DispatcherInterface $subject, array $config = [])
	{
		parent::__construct($subject, $config);

		ForsefFactory::get()->getThe('hook')->add(
			'forsef_on_load_plugins',
			function () {
				$filename = __DIR__ . $this->pluginFileName;
				if (file_exists($filename))
				{
					include_once $filename;
				}
			}
		);
	}
}