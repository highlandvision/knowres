<?php
/**
 * @package    Know Reservations
 * @subpackage Site module
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Module\KnowresSearchbymap\Site\Dispatcher;

defined('JPATH_PLATFORM') or die;

use Carbon\Carbon;
use Exception;
use HighlandVision\KR\ExceptionHandling;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\SiteHelper;
use Joomla\CMS\Dispatcher\AbstractModuleDispatcher;

use function defined;
use function is_dir;

use const JPATH_ROOT;

/**
 * Dispatcher class for mod_knowres_searchbymap
 *
 * @since  4.0.0
 */
class Dispatcher extends AbstractModuleDispatcher {
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
		$data   = parent::getLayoutData();
		$params = $data['params'];

		if ($data && !empty($params)) {
			$region_id = KrMethods::getParams()->get('default_region');
			$Itemid    = SiteHelper::getItemId('com_knowres', 'properties');
			$data['link'] = '/index.php?option=com_knowres&task=properties.search&map_modal=1';
		}

		return $data;
	}
}