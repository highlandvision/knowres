<?php
/**
 * @package    Know Reservations
 * @subpackage Site module
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Module\KnowresImagegrid\Site\Dispatcher;

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

//TODO v5.1 Add alt and description fields for images

/**
 * Dispatcher class for mod_knowres_Imagegrid
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
		$data   = parent::getLayoutData();
		if (!$data) {
			return [];
		}

		$params = $data['params'];
		if ($params->get('show_images')) {
			$params->set('layout', 'default');
		} else {
			$params->set('layout', 'list');
		}

		$grid = $params->get('imagegrid');
		foreach ($grid as $g) {
			$link = '';
			$count++;

			if (empty($g->url)) {
				if ($g->category_id <> -1) {
					$Itemid = SiteHelper::getItemId('com_knowres', 'properties',
					                                ['layout' => 'category', 'category_id' => $g->category_id],
					                                ['layout' => 'category']);
					$link   =
						KrMethods::route('index.php?option=com_knowres&view=properties&layout=category&category_id=' .
						                 $g->category_id . '&Itemid=' . $Itemid);
				} elseif ($g->link <> -1) {
					$link = KrMethods::route('index.php?Itemid=' . $g->link);
				}
			}

			if (!empty($link) || $g->url) {
				// TODO v5.1 Check for false return attrib removed in getLayoutData()
				$data['items'][] = [
					'image' => $g->image,
					'text'  => $g->text,
					'link'  => $link,
					'url'   => $g->url
				];
			}

			$count++;
		}

		return $data;
	}
}