<?php
/**
 * @package    Know Reservations
 * @subpackage Site module
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Module\KnowresRegions\Site\Dispatcher;

defined('JPATH_PLATFORM') or die;

use Carbon\Carbon;
use Exception;
use HighlandVision\KR\ExceptionHandling;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\SiteHelper;
use Joomla\CMS\Dispatcher\AbstractModuleDispatcher;

use function count;
use function defined;
use function is_dir;

use const JPATH_ROOT;

/**
 * Dispatcher class for mod_knowres_Regions
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
	 * @since  5.0.0
	 * @return array
	 */
	protected function getLayoutData(): array
	{
		$data = parent::getLayoutData();
		if (!$data) {
			return [];
		}

		$params = $data['params'];

		$regions = [];
		$results = KrFactory::getListModel('regions')->getAllRegions(true);
		if (count($results)) {
			foreach ($results as $r) {
				$regions[$r->id] = $r->name;
			}
		}

		for ($i = 1; $i <= 6; $i++) {
			if ($params->get('image' . $i) && $params->get('region' . $i) != -1) {
				$pdata           = [];
				$pdata['image']  = $params->get('image' . $i);
				$pdata['id']     = $params->get('region' . $i);
				$pdata['name']   = $regions[$params->get('region' . $i)];
				$pdata['Itemid'] =
					SiteHelper::getItemId("com_knowres", "properties", ['region_id' => $params->get('region' . $i)]);

				$data['regions'][$i] = $pdata;
			}
		}

		return $data;
	}
}