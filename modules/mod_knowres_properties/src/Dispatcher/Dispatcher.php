<?php
/**
 * @package    Know Reservations
 * @subpackage Site module
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Module\KnowresProperties\Site\Dispatcher;

defined('JPATH_PLATFORM') or die;

use Carbon\Carbon;
use Exception;
use HighlandVision\KR\ExceptionHandling;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use Joomla\CMS\Dispatcher\AbstractModuleDispatcher;

use Joomla\CMS\HTML\HTMLHelper;

use function count;
use function defined;
use function is_dir;

use const JPATH_ROOT;

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
		$params = $data['params'];

		$names = KrFactory::getListSiteModel('properties')->getNames();
		if (is_countable($names) && count($names)) {
			$options   = [];
			$options[] = HTMLHelper::_('select.option', 0, KrMethods::plain('MOD_KNOWRES_PROPERTIES_DEFAULT'));

			foreach ($names as $r) {
				$options[] = HTMLHelper::_('select.option', $r->id, $r->property_name);
			}

			$attribs = ['onchange' => 'this.form.submit();',
			            'title'    => KrMethods::plain('MOD_KNOWRES_PROPERTIES_TITLE')
			];

			$data['options'] = HTMLHelper::_('select.genericlist', $options, 'id', $attribs, 'value', 'text', 0);
		}

		return $data;
	}
}