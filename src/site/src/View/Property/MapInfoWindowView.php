<?php
/**
 * @package    Know Reservations
 * @subpackage Site Controllers
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Site\View\Property;

use Exception;
use HighlandVision\KR\Joomla\Extend\HtmlView as KrHtmlView;
use JetBrains\PhpStorm\NoReturn;
use Joomla\Registry\Registry;

// phpcs:disable PSR1.Files.SideEffects
defined('_JEXEC') or die;
// phpcs:enable PSR1.Files.SideEffects

/**
 * Display the map info window for a property.
 *
 * @since   1.0.0
 */
class MapinfowindowView extends KrHtmlView\Site
{
    public array $net = [];
    public array $discount = [];
    public bool $byAvailability = false;
    public string $currency = '';
    public array $images = [];
    public Registry $params;
    public string $link = '';
    public mixed $ratings;

    /**
     * Display the view
     *
     * @param   null  $tpl  Default template.
     *
     * @return void
     * @throws Exception
     * @since  1.0.0
     */
    #[NoReturn]
    public function display($tpl = null): void
    {
        $this->setLayout('mapinfowindow');

        parent::display($tpl);
        jexit();
    }
}