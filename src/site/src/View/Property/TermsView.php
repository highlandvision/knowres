<?php
/**
 * @package    Know Reservations
 * @subpackage Site View
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Site\View\Property;

use Exception;
use HighlandVision\KR\Joomla\Extend\HtmlView as KrHtmlView;
use JetBrains\PhpStorm\NoReturn;

// phpcs:disable PSR1.Files.SideEffects
defined('_JEXEC') or die;
// phpcs:enable PSR1.Files.SideEffects

/**
 * Display property
 *
 * @since 1.0.0
 */
class TermsView extends KrHtmlView\Site
{
    /** @var mixed Article data. */
    public mixed $article = '';

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
        parent::display($tpl);
        jexit();
    }
}