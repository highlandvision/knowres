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

use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Translations;

$Translations = new Translations();

$one_region =
	count($this->Search->data->region_id) == 1 &&
	KrMethods::getParams('default_region') == $this->Search->data->region_id[0];

$results = KrFactory::getListModel('propertyfeatures')->getAll(true);
foreach ($results as $r) {
	$key_features[$r->id] = $r->name;
}
?>

<?php echo KrMethods::render('properties.list.list', ['items'          => $this->items,
                                                      'params'         => $this->params,
                                                      'currency'       => $this->Search->data->currency,
                                                      'favicon'        => true,
                                                      'saved'          => $this->saved,
                                                      'view'           => $this->Search->data->view,
                                                      'byAvailability' => $this->Search->data->byAvailability,
                                                      'net'            => $this->Search->data->rateNet,
                                                      'discount'       => $this->Search->data->rateDiscount,
                                                      'rating'         => $this->Search->data->rating,
                                                      'one_region'     => $one_region,
                                                      'key_features'   => $key_features
]);
?>