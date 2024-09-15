<?php
/**
 * @package    Know Reservations
 * @subpackage Site module
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Module\KnowresFeatured\Site\Dispatcher;

defined('JPATH_PLATFORM') or die;

use Carbon\Carbon;
use Exception;
use HighlandVision\KR\ExceptionHandling;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Translations;
use Joomla\CMS\Dispatcher\AbstractModuleDispatcher;
use Joomla\CMS\Helper\HelperFactoryAwareInterface;
use Joomla\CMS\Helper\HelperFactoryAwareTrait;

use function defined;
use function is_dir;
use const JPATH_ROOT;

/**
 * Dispatcher class for mod_knowres_Featured
 *
 * @since  4.0.0
 */
class Dispatcher extends AbstractModuleDispatcher implements HelperFactoryAwareInterface
{
	use HelperFactoryAwareTrait;

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
		$data   = parent::getLayoutData();
		$params = $data['params'];

		if ($data && !empty($params)) {
			$Helper               = $this->getHelperFactory()->getHelper('KnowresFeaturedHelper');
			$data['title']        = $Helper->getMyTitle($params->get('title'));
			$data['slidestoshow'] = $params->get('slidestoshow');
			$properties = [];
			for ($i = 1; $i <= 10; $i++) {
				if ($params->get('property' . $i)) {
					$properties[$i] = $params->get('property' . $i);
				}
			}

			$items        = KrFactory::getListSiteModel('properties')->getMinMaxRates($properties);
			$currencies   = KrFactory::getListModel('propertysettings')->getOneSetting('currency');
			$net_rates    = KrFactory::getListModel('propertysettings')->getOneSetting('net_rates');
			$net_markup   = KrFactory::getListModel('propertysettings')->getOneSetting('net_markup');
			$Translations = new Translations();

			foreach ($properties as $p) {
				$item = false;
				foreach ($items as $item) {
					if ($item->id == $p) {
						break;
					}
				}

				if (!$item) {
					continue;
				}

				$data['items'][$p] = $Helper->getPropertyData($p, $item, $currencies, $net_rates, $net_markup, $Translations);
			}
		}

		return $data;
	}
}