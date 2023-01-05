<?php
/**
 * @package     Know Reservations
 * @subpackage  Site Controller
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Site\Controller;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Translations;
use Joomla\CMS\MVC\Controller\BaseController;
use Joomla\CMS\Response\JsonResponse;

use function array_keys;
use function array_values;
use function defined;

/**
 * Regions json controller class
 *
 * @since 1.0.0
 */
class RegionsController extends BaseController
{
	/**
	 * Return json data for remote chained
	 *
	 * @since 1.0.0
	 */
	public function chained()
	{
		try
		{
			$country_id = KrMethods::inputInt('country_id');
			if ($country_id)
			{
				$items        = KrFactory::getListModel('regions')->getAllRegions(false, null, $country_id);
				$Translations = new Translations();
				$options      = $Translations->getArray($items, 'region', 'name');

				$data = [];
				foreach ($options as $k => $v)
				{
					$data[$k] = $v;
				}
			}

			$wrapper      = [];
			$wrapper['k'] = array_keys($data);
			$wrapper['v'] = array_values($data);

			echo new JsonResponse($wrapper);
		}
		catch (Exception)
		{
			echo new JsonResponse(null, KrMethods::plain('COM_KNOWRES_ERROR_FATAL'), true);
		}

		jexit();
	}
}