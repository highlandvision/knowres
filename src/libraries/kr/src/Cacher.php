<?php
/**
 * @package        KK
 * @subpackage     Library
 * @author         Hazel Wilson <hazel@highlandvision.com>
 * @copyright  (C) 2020 Highland Vision. All rights reserved.
 * @license        See the file "LICENSE.txt" for the full license governing this code.
 */

namespace HighlandVision\KR;

use HighlandVision\KR\Framework\KrMethods;
use Joomla\CMS\Cache\Cache;

use function defined;

// phpcs:disable PSR1.Files.SideEffects
defined('_JEXEC') or die;
// phpcs:enable PSR1.Files.SideEffects

/**
 * KR Cache helper class
 *
 * @since 1.0.0
 */
class Cacher
{
    /**  @var Cache Cache object */
    protected Cache $krCache;
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
        $cacheOptions = [
            'cachebase'    => JPATH_ADMINISTRATOR . '/cache',
            'lifetime'     => $lifetime,
            'caching'      => true,
            'defaultgroup' => $group,
        ];

        $this->krCache = KrMethods::getCache($cacheOptions);
        $this->group   = $group;
    }

    /**
     * Check if cache exists
     *
     * @param   string  $name  Cache name
     *
     * @return bool|string
     * @since 3.3.0
     */
    public function checkCache(string $name): bool|string
    {
        return $this->krCache->get($name, $this->group);
    }

    /**
     * Clean cache
     *
     * @return void
     * @since 3.3.0
     */
    public function cleanCache(): void
    {
        $this->krCache->clean($this->group);
    }

    /**
     * Store cache
     *
     * @param   mixed   $data  The data to be stored
     * @param   string  $name  Cache name
     *
     * @return void
     * @since 3.3.0
     */
    public function storeCache(mixed $data, string $name): void
    {
        $this->krCache->store($data, $name, $this->group);
    }
}
