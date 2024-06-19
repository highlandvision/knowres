<?php
/**
 * @package    Know Reservations
 * @subpackage Site module
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Module\KnowresDestination\Site\Dispatcher;

defined('JPATH_PLATFORM') or die;

use Carbon\Carbon;
use Exception;
use HighlandVision\KR\ExceptionHandling;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\SiteHelper;
use HighlandVision\KR\Translations;
use Joomla\CMS\Dispatcher\AbstractModuleDispatcher;

use function defined;
use function is_dir;

use const JPATH_ROOT;

/**
 * Dispatcher class for mod_knowres_destination
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
		$data         = parent::getLayoutData();
		$params       = $data['params'];
		$Translations = new Translations();
		$destination  = $Translations->getText('region', $region_id);
		$region_id    = $params->get('region_id');

		if ($data && !empty($params)) {
			$data['region_id']   = $region_id;
			$data['destination'] = $destination;
			$data['image']       = $params->get('image');
			$data['alt']         = KrMethods::sprintf('MOD_KNOWRES_DESTINATION_VIEW_PROPERTIES', $destination);
			$data['Itemid']      = SiteHelper::getItemId('com_knowres', 'properties', ['region_id' => $region_id]);
			$data['link']        =
				KrMethods::route('index.php?option=com_knowres&view=properties&Itemid=' . $Itemid . '&region_id='
				                 . $region_id);
			$data['text']        = KrMethods::sprintf('MOD_KNOWRES_DESTINATION_VIEW_PROPERTIES', $destination);
			$data['textplus']    = KrMethods::sprintf('MOD_KNOWRES_DESTINATION_VIEW_PROPERTIES', $destination) . ' >>';
			$data['text1']       = $params->get('text1');
			$data['text2']       = $params->get('text2');
			$data['text3']       = $params->get('text3');
			$data['text4']       = $params->get('text4');
			$data['heading1']    = $params->get('heading1');
			$data['heading2']    = $params->get('heading2');
			$data['heading3']    = $params->get('heading3');
			$data['heading4']    = $params->get('heading4');

			$data['options'] = ['src'    => $image,
			                    'alt'    => $alt,
			                    'class'  => 'th responsive',
			                    'width'  => '100%',
			                    'height' => 'auto'
			];
		}

		return $data;
	}
}