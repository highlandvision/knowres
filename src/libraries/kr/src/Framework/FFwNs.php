<?php
/**
 * @package    Know Reservations
 * @subpackage <subpackage>
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file LICENSE.txt for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR\Framework;

use const KRFRAMEWORK;

// phpcs:disable PSR1.Files.SideEffects
defined('_JEXEC') or die;
// phpcs:enable PSR1.Files.SideEffects

/**
 * Framework linking
 *
 * @since  3.3.0
 */
class FFwNs
{
    const string KRFRAMEWORKDB = '\HighlandVision\\KR\\' . KRFRAMEWORK . '\\FDatabase';
    const string KRFRAMEWORKNS = '\HighlandVision\\KR\\' . KRFRAMEWORK . '\\FMethods';

    /**
     * Get namespace for Models
     *
     * @return string
     * @since  3.3.0
     */
    public static function getDB(): string
    {
        return self::KRFRAMEWORKDB;
    }

    /**
     * Get namespace for KrMethods
     *
     * @return string
     * @since  3.3.0
     */
    public static function getNS(): string
    {
        return self::KRFRAMEWORKNS;
    }
}