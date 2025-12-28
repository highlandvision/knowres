<?php
/**
 * Joomla! Content Management System
 *
 * @copyright  Copyright (C) 2005 - 2020 Open Source Matters, Inc. All rights reserved.
 * @license    GNU General Public License version 2 or later; see LICENSE.txt
 */

namespace HighlandVision\KR\Joomla\Extend;

use Exception;
use HighlandVision\KR\Framework\KrMethods;

// phpcs:disable PSR1.Files.SideEffects
\defined('_JEXEC') or die;
// phpcs:enable PSR1.Files.SideEffects

/**
 * Knowres extension of FormController
 *
 * @since  3.3.1
 */
class FormController extends \Joomla\CMS\MVC\Controller\FormController
{
    /**
     * Back to the previous page as held in session or url
     * If all else fails then back to defined KR home page
     *
     * @return void
     * @throws Exception
     * @since  3.3.1
     */
    public function back(): void
    {
        $gobackto = KrMethods::inputString('gobackto', '');
        if ($gobackto) {
            $return = KrMethods::route('index.php?option=com_knowres&' . $gobackto, false);
        } else {
            $return = KrMethods::getUserState('com_knowres.gobackto');
            if ($return) {
                KrMethods::setUserState('com_knowres.gobackto', null);
                $return = KrMethods::route('index.php?option=com_knowres&' . $return, false);
            } else {
                $return = KrMethods::route('index.php?option=com_knowres', false);
            }
        }

        KrMethods::redirect($return);
    }
}