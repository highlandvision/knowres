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

//$Translations = new Translations();
//
//$this->category_id = KrMethods::inputInt('category_id', 0, 'get');
//if ($this->category_id) {
//	/** @var CategoryModel $category */
//	$category = KrFactory::getAdminModel('category')->getItem($this->category_id);
//	if (!$category->id) {
//		throw new RuntimeException('Category not found for Category ID ' . $this->category_id);
//	}
//
//	$searchData              = $searchSession->resetData();
//	$searchData->browse = true;
//	$searchData->browse_type = 'category';
//	$this->header         = KrMethods::sprintf('COM_KNOWRES_BROWSE_CATEGORY', $category->name);
//	$this->category_blurb = $category->blurb;
//}
//
//if ($this->category_id && $layout === 'category') {
//	$this->items            = KrFactory::getListSiteModel('properties')->getByCategory($this->category_id);
//	$this->meta_title       = KrMethods::sprintf('COM_KNOWRES_BROWSE_CATEGORY', $category->name);
//	$this->meta_description = KrMethods::sprintf('COM_KNOWRES_BROWSE_CATEGORY_DSC', $category->name);
//	$this->setLayout('category');
//}
//
//if ($layout === 'new') {
//	$this->items            = KrFactory::getListSiteModel('properties')->getNew();
//	$this->meta_title       = KrMethods::plain('COM_KNOWRES_BROWSE_NEW_VILLAS');
//	$this->meta_description = KrMethods::plain('COM_KNOWRES_BROWSE_NEW_VILLAS_DSC');
//	$this->setLayout('new');
//}
//
//if ($layout === 'discount') {
//	$this->items            = KrFactory::getListSiteModel('properties')->getDiscount();
//	$this->currencies       = KrFactory::getListModel('propertysettings')->getOneSetting('currency');
//	$this->meta_title       = KrMethods::plain('COM_KNOWRES_BROWSE_DISCOUNTS');
//	$this->meta_description = KrMethods::plain('COM_KNOWRES_BROWSE_DISCOUNTS_DSC');
//	$this->setLayout('discount');
//}

$one_region =
	count($this->Search->data->region_id) == 1 &&
	KrMethods::getParams('default_region') == $this->Search->data->region_id[0];

$results = KrFactory::getListModel('propertyfeatures')->getAll(true);
foreach ($results as $r) {
	$key_features[$r->id] = $r->name;
}
?>

<?php echo KrMethods::render('properties.browse.list', ['items'          => $this->items,
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