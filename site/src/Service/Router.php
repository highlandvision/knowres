<?php
/**
 * @package         Joomla.Site
 * @subpackage      com_tags
 * @copyright   (C) 2013 Open Source Matters, Inc. <https://www.joomla.org>
 * @license         GNU General Public License version 2 or later; see LICENSE.txt
 */

namespace HighlandVision\Component\Knowres\Site\Service;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use Joomla\CMS\Component\Router\RouterBase;

use function array_pop;
use function count;
use function implode;
use function is_numeric;
use function str_replace;
use function strtolower;

/**
 * Routing class for com_knowres
 *
 * @since  4.0.0
 */
class Router extends RouterBase
{
	/**
	 * Build the route for the com_knowres component
	 *
	 * @param  array  &$query  An array of URL arguments
	 *
	 * @throws Exception
	 * @since  4.0.0
	 * @return array  The URL arguments to use to assemble the subsequent URL.
	 */
	public function build(&$query): array
	{
		$segments = [];

		if (isset($query['view'])) {
			if ($query['view'] == 'property' && !empty($query['id'])) {
				$item       = KrFactory::getAdminModel('property')->getItem($query['id']);
				$segments[] = $item->region_name;
				$segments[] = $item->town_name . '-' . $item->type_name;
				$segments[] = $item->property_name;
				unset($query['view']);
				unset($query['id']);
			}
		}
		if (isset($query['id'])) {
			$segments[] = $query['id'];
			unset($query['id']);
		}

		$total = count($segments);
		for ($i = 0; $i < $total; $i++) {
			$segments[$i] = strtolower(str_replace(' ', '-', $segments[$i]));
		}

		return $segments;
	}

	/**
	 * Parse the segments of a URL for com_knowres.
	 *
	 * @param  array  &$segments  The segments of the URL to parse.
	 *
	 * @since   4.0.0
	 * @return  array  The URL attributes to be used by the application.
	 */
	public function parse(&$segments): array
	{
		$vars = [];

		$count = count($segments);
		if ($count) {
			$count--;
			$segment = array_pop($segments);
			if (is_numeric($segment)) {
				$vars['id'] = $segment;
			}
			else {
				$count--;
				$vars['task'] = array_pop($segments) . '.' . $segment;
			}
		}

		if ($count) {
			$vars['task'] = implode('.', $segments);
		}

		return $vars;
	}
}
