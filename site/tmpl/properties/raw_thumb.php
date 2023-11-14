<?php
/**
 * @package    Know Reservations
 * @subpackage Site View
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */
/** @noinspection PhpUnhandledExceptionInspection */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Translations;

$Translations = new Translations();

$one_region =
	count($this->Response->searchData->region_id) == 1 &&
	KrMethods::getParams('default_region') == $this->Response->searchData->region_id[0];
?>

<?php echo KrMethods::render('properties.thumb.thumb', ['items'          => $this->items,
                                                        'params'         => $this->params,
                                                        'currency'       => $this->Response->searchData->currency,
                                                        'favs'           => $this->Response->searchData->favs,
                                                        'bar'            => $this->Response->searchData->bar,
                                                        'byAvailability' => $this->Response->searchData->byAvailability,
                                                        'net'            => $this->Response->searchData->rateNet,
                                                        'discount'       => $this->Response->searchData->rateDiscount,
                                                        'rating'         => $this->Response->searchData->rating,
                                                        'one_region'     => $one_region,
                                                        'key_features'   => $key_features
]);
?>