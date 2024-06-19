<?php
/**
 * @package    Know Reservations
 * @subpackage Site module
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Module\KnowresAutosearch\Site\Dispatcher;

defined('JPATH_PLATFORM') or die;

use Carbon\Carbon;
use Exception;
use HighlandVision\KR\ExceptionHandling;
use HighlandVision\KR\Framework\KrMethods;
use Joomla\CMS\Dispatcher\AbstractModuleDispatcher;

use function defined;
use function is_dir;

use const JPATH_ROOT;

/**
 * Dispatcher class for mod_knowres_search
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
		$lang         = KrMethods::getLanguage();
		$language_tag = KrMethods::getLanguageTag();
		$base_dir = JPATH_ROOT . '/modules';
		//echo " here " . $base_dir;exit;
		$lang->load('mod_knowres_autosearch', $base_dir, $language_tag);

		return parent::getLayoutData();
	}
}