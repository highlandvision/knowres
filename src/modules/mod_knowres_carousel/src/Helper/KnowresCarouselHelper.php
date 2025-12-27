<?php
/**
 * @package    Know Reservations
 * @subpackage Site module
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Module\KnowresCarousel\Site\Helper;

use HighlandVision\KR\Model\SiteModel;

use function getimagesize;
use function glob;
use function pathinfo;
use function str_replace;

use const GLOB_BRACE;

// phpcs:disable PSR1.Files.SideEffects
defined('_JEXEC') or die;
// phpcs:enable PSR1.Files.SideEffects

/**
 * Helper class for KR carousel
 *
 * @since 5.0.0
 */
class KnowresCarouselHelper
{
    /**
     * Get images for carousel
     *
     * @param   string  $folder  Folder that containes images
     *
     * @return array
     * @since  5.0.0
     */
    public static function getImages(string $folder): array
    {
        $glob    = 'images/' . $folder . '/*.{jpg,png,gif}';
        $fimages = glob($glob, GLOB_BRACE);
        foreach ($fimages as $i) {
            $size = getimagesize(JPATH_SITE . '/' . $i);
            if ($size) {
                $parts = pathinfo($i);
                $alt   = str_replace(['_', ' '], '-', $parts['filename']);
                $alt   = str_replace(['.jpg', '.png', '.gif'], '', $alt);

                $images[] = [
                    'alt'    => $alt,
                    'class'  => 'th responsive',
                    'height' => 'auto',
                    'image'  => $i,
                    'width'  => '100%',
                ];
            }
        }

        return $images;
    }
}