<?php
/**
 * @package    Know Reservations
 * @subpackage Site module
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace Knowres\Module\Search\Site\Helper;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Model\SiteModel;
use HighlandVision\KR\Session as KrSession;
use HighlandVision\KR\Utility;
use Joomla\CMS\HTML\HTMLHelper;
use RuntimeException;
use stdClass;

use function implode;

/**
 * Helper class mod_knowres_search
 *
 * @since 1.0.0
 */
class SearchHelper
{
	/**
	 * Get input / saved values and set as defaults
	 *
	 * @throws Exception
	 * @since  4.0.0
	 * @return stdClass
	 */
	public static function getDefaultValues(): stdClass
	{
		$searchSession = new KrSession\Search();
		$searchData    = $searchSession->getData();

		try {
			$input            = new stdClass;
			$input->region_id = KrMethods::inputInt('region_id', $searchData->region_id);
			$input->arrival   = KrMethods::inputString('arrival', $searchData->arrival);
			Utility::validateInputDate($input->arrival);
			$input->departure = KrMethods::inputString('departure', $searchData->departure);
			Utility::validateInputDate($input->departure);
			$input->guests     = KrMethods::inputInt('guests', $searchData->guests);
			$input->flexible   = KrMethods::inputInt('flexible', $searchData->flexible);
			$input->adults     = KrMethods::inputInt('adults', $searchData->adults);
			$input->children   = KrMethods::inputInt('children', $searchData->children);
			$input->child_ages = KrMethods::inputArray('child_ages', $searchData->child_ages);
		} catch (Exception $e) {
			$searchData = $searchSession->resetData();
			SiteModel::redirectHome();
		}

		return $input;
	}

	/**
	 * Creates the country regions array for grouped dropdown and region pane
	 *
	 * @throws RuntimeException
	 * @since  3.3.1
	 * @return array
	 */
	public static function getRegions(): array
	{
		$regions = [];

		$distinct = KrFactory::getListModel('regions')->getDistinctRegions();
		foreach ($distinct as $r) {
			$regions[$r->country_name][$r->region_id] = $r->name;
		}

		return $regions;
	}

	/**
	 * Creates the country region array for display as dropdown
	 *
	 * @param  array  $regions  Regions with properties
	 *
	 * @since  3.3.1
	 * @return array
	 */
	public static function regionOptions(array $regions): array
	{
		$t = [];
		foreach ($regions as $r) {
			$t[$r->country_name][$r->region_id] = $r->name;
		}

		return $t;
	}

	/**
	 * Creates the region option group select
	 *
	 * @param  array  $regions   Property regions
	 * @param  bool   $expand    Expand to show region pane
	 * @param  int    $selected  Selected value
	 *
	 * @since  1.0.0
	 * @return mixed
	 */
	public static function regionOptgroup(array $regions, bool $expand, int $selected): mixed
	{
		$groups = [];
		$a      = [];

		$groups[] = HTMLHelper::_('select.option', '<OPTGROUP>', KrMethods::plain('MOD_KNOWRES_SEARCH_LOCATION'));
		foreach ($regions as $k => $v) {
			$groups[] = HTMLHelper::_('select.option', '<OPTGROUP>', $k);
			foreach ($v as $id => $r) {
				$groups[] = HTMLHelper::_('select.option', $id, $r);
			}
			$groups[] = HTMLHelper::_('select.option', '</OPTGROUP>');
		}
		$groups[] = HTMLHelper::_('select.option', '</OPTGROUP>');

		$a[] = 'aria-label=' . KrMethods::plain('MOD_KNOWRES_SEARCH_LOCATION');
		if ($expand) {
			$a[] = ' onmousedown="(function(e){ e.preventDefault(); })(event, this)"';
			$a[] = ' data-toggle="kr-searchregion-drop"';
		}

		return HTMLHelper::_('select.genericlist', $groups, 'region_id', implode(' ', $a), 'value', 'text', $selected);
	}

//	/**
//	 * Creates the single guest select
//	 *
//	 * @param  int  $default  Default #guests
//	 * @param  int  $max      Max guests
//	 *
//	 * @since  1.0.0
//	 * @return mixed
//	 * @throws InvalidArgumentException
//	 */
//	public static function guestSelect(int $default = 2, int $max = 16): mixed
//	{
//		$options[] = HTMLHelper::_('select.option', 1, KrMethods::plain('MOD_KNOWRES_SEARCH_ANY'));
//
//		for ($i = 2; $i < $max; $i++) {
//			$options[] = HTMLHelper::_('select.option', $i, Text::plural('MOD_KNOWRES_SEARCH_GUEST', $i));
//		}
//
//		$options[] = HTMLHelper::_('select.option', $max,
//		                           Text::plural('MOD_KNOWRES_SEARCH_GUEST', $max . '+'));
//
//		$attribs = ['aria-label' => KrMethods::plain('MOD_KNOWRES_SEARCH_GUESTS_LABEL_ARIA')];
//
//		return HTMLHelper::_('select.genericlist', $options, 'guests', $attribs, 'value', 'text', $default);
//	}
}