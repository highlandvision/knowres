<?php
/**
 * @package    Know Reservations
 * @subpackage Site module
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Module\KnowresSlideshow\Site\Dispatcher;

use Carbon\Carbon;
use Exception;
use HighlandVision\KR\ExceptionHandling;
use Joomla\CMS\Dispatcher\AbstractModuleDispatcher;
use Joomla\CMS\Helper\HelperFactoryAwareInterface;
use Joomla\CMS\Helper\HelperFactoryAwareTrait;
use Joomla\CMS\Helper\ModuleHelper;

use function defined;
use function is_dir;

use const JPATH_ROOT;

// phpcs:disable PSR1.Files.SideEffects
defined('_JEXEC') or die;
// phpcs:enable PSR1.Files.SideEffects

/**
 * Dispatcher class for mod_knowres_slideshow
 *
 * @since  4.0.0
 */
class Dispatcher extends AbstractModuleDispatcher implements HelperFactoryAwareInterface
{
    use HelperFactoryAwareTrait;

    /**
     * Define tasks for before dispatch
     *
     * @throws Exception
     * @since  4.0.0
     */
    public function dispatch(): void
    {
        if (is_dir(JPATH_ROOT . '/media/com_knowres/vendor')) {
            require_once(JPATH_ROOT . '/media/com_knowres/vendor/autoload.php');
        }

        new ExceptionHandling();
        Carbon::setToStringFormat('Y-m-d');

        parent::dispatch();
    }

    /**
     * Returns the layout data.
     *
     * @return array
     * @throws Exception
     * @since  4.0.0
     */
    protected function getLayoutData(): array
    {
        $data   = parent::getLayoutData();
        $params = $data['params'];

        if ($data && !empty($params)) {
            if ($params->get('layout') == 'solid') {
                require ModuleHelper::getLayoutPath('mod_knowres_slideshow', 'solid');
            } else {
                $Helper         = $this->getHelperFactory()->getHelper('KnowresSlideshowHelper');
                $data['slides'] = $Helper->getSlides($params);
            }
        }

        return $data;
    }
}