<?php
/**
 * @package    Know Reservations
 * @subpackage Library
 * @copyright  Copyright (c) 2020, Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR;

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
use Joomla\CMS\Cache\Cache;

use function defined;

/**
 * KR Cache helper class
 *
 * @since 1.0.0
 */
class Cacher
{
	/**  @var Cache Cache object */
	protected Cache $KrCache;
	/**  @var string Cache group */
	protected string $group;

	/**
	 * Get and store cache
	 *
	 * @param   string  $group     Cache group
	 * @param   int     $lifetime  Expiry in minuites
	 *
	 * @since 3.3.0
	 */
	public function __construct(string $group, int $lifetime = 120)
	{
		$cache_options = array(
			'cachebase'    => JPATH_ADMINISTRATOR . '/cache',
			'lifetime'     => $lifetime,
			'caching'      => true,
			'defaultgroup' => $group
		);

		$this->KrCache = KrMethods::getCache($cache_options);
		$this->group   = $group;
	}

	/**
	 * Check if cache exists
	 *
	 * @param   string  $name  Cache name
	 *
	 * @since 3.3.0
	 * @return bool|string
	 */
	public function checkCache(string $name): bool|string
	{
		return $this->KrCache->get($name, $this->group);
	}

	/**
	 * Clean cache
	 *
	 * @since 3.3.0
	 */
	public function cleanCache(): void
	{
		$this->KrCache->clean($this->group);
	}

	/**
	 * Store cache
	 *
	 * @param   mixed   $data  The data to be stored
	 * @param   string  $name  Cache name
	 *
	 * @since 3.3.0
	 */
	public function storeCache(mixed $data, string $name): void
	{
		$this->KrCache->store($data, $name, $this->group);
	}
}