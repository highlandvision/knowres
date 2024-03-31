<?php
/**
 * @package    Know Reservations
 * @subpackage Site View
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Translations;

$Translations = new Translations();
$results      = KrFactory::getListModel('propertyfeatures')->getAll(true);
foreach ($results as $r) {
	$key_features[$r->id] = $r->name;
}
?>

<?php if ($this->favs_alert): ?>
	<div class="callout warning" data-closable>
		<?php echo KrMethods::plain('COM_KNOWRES_NO_FAVOURITES'); ?>
		<button class="close-button" aria-label="Dismiss alert" type="button" data-close>
			<span aria-hidden="true">&times;</span>
		</button>
	</div>
<?php endif; ?>

<?php echo KrMethods::render('properties.list.list', ['items'          => $this->items,
                                                      'params'         => $this->params,
                                                      'currency'       => $this->Response->searchData->currency,
                                                      'favs'           => $this->Response->searchData->favs,
                                                      'bar'            => $this->Response->searchData->bar,
                                                      'byAvailability' => $this->Response->searchData->byAvailability,
                                                      'net'            => $this->Response->searchData->rateNet,
                                                      'discount'       => $this->Response->searchData->rateDiscount,
                                                      'rating'         => $this->Response->searchData->rating,
                                                      'key_features'   => $key_features
]);
?>