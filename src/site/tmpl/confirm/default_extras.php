<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;

// phpcs:disable PSR1.Files.SideEffects
defined('_JEXEC') or die;
// phpcs:enable PSR1.Files.SideEffects

$extras = KrFactory::getListModel('extras')->getByProperty($this->property->id);
if (!count($extras)) {
    return;
}

echo KrMethods::render('confirm.extras', [
    'extras'      => $extras,
    'data'        => [],
    'property_id' => $this->property->id,
    'currency'    => $this->contractData->currency,
]);