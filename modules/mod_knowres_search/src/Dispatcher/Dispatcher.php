<?php
/**
 * @package    Know Reservations
 * @subpackage Site module
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace Knowres\Module\Search\Site\Dispatcher;

defined('JPATH_PLATFORM') or die;

use Carbon\Carbon;
use Exception;
use HighlandVision\KR\ExceptionHandling;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\SiteHelper;
use Joomla\CMS\Dispatcher\AbstractModuleDispatcher;
use Knowres\Module\Search\Site\Helper\SearchHelper;

use function defined;
use function is_dir;

use const JPATH_ROOT;

/**
 * Dispatcher class for mod_knowres_search
 *
 * @since  4.0.0
 */
class Dispatcher extends AbstractModuleDispatcher
{
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
	 * @throws Exception
	 * @since  4.0.0
	 * @return array
	 */
	protected function getLayoutData(): array
	{
		$data = parent::getLayoutData();
		if ($data && !empty($data['params'])) {
			$data['initial']          = SearchHelper::getDefaultValues();
			$data['Itemid']           = SiteHelper::getItemId('com_knowres', 'properties', ['layout' => 'search']);
			$data['max_guests']       = KrMethods::getParams()->get('search_maxguests', 16);
			$data['search_text']      = $data['params']->get('search_text', '');
			$data['show_datepickers'] = $data['params']->get('show_datepickers', 0);
			$data['show_flexible']    = $data['params']->get('show_flexible', 0);
			$data['show_guests']      = $data['params']->get('show_guests', 0);
			$data['expanded_guests']  = KrMethods::getParams()->get('search_guests_expanded', 0);
			$data['region_id']        = KrMethods::getParams()->get('default_region', 0);
			if ((int) $data['params']->get('show_regions', 0)) {
				$data['regions'] = SearchHelper::getRegions();
				$data['options'] = SearchHelper::regionOptgroup($data['regions'],
				                                                $data['params']->get('show_regions_expanded'),
				                                                $data['initial']->region_id);
			}
		}

		return $data;
	}
}