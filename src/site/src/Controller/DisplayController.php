<?php
/**
 * @package         Joomla.Site
 * @subpackage      com_banners
 * @copyright   (C) 2006 Open Source Matters, Inc. <https://www.joomla.org>
 * @license         GNU General Public License version 2 or later; see LICENSE.txt
 */

namespace HighlandVision\Component\Knowres\Site\Controller;

use Exception;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\SiteHelper;
use Joomla\CMS\MVC\Controller\BaseController;
use function defined;

// phpcs:disable PSR1.Files.SideEffects
defined('_JEXEC') or die;
// phpcs:enable PSR1.Files.SideEffects

/**
 * Knowres Controller
 *
 * @since  4.0.0
 */
class DisplayController extends BaseController
{
	/**
	 * Method to display a view.
	 *
	 * @param   bool        $cachable   If true, the view output will be cached
	 * @param   array|bool  $urlparams  An array of safe url parameters and their variable types,
	 *                                  for valid values see {@link JFilterInput::clean()}
	 *
	 * @return DisplayController        This object to support chaining.
	 * @throws Exception
	 * @since  1.0.0
	 */
	public function display($cachable = false, $urlparams = false): DisplayController
	{
		$view   = KrMethods::inputString('view', 'properties');
		$Itemid = KrMethods::inputInt('Itemid');

		if (!$view)
		{
			$Itemid = SiteHelper::getItemId('com_knowres', 'properties');
			KrMethods::redirect(KrMethods::route('index.php?Itemid=' . $Itemid, false));
		}

		if (!$Itemid)
		{
			$Itemid = SiteHelper::getItemId('com_knowres', $view);
			KrMethods::redirect(KrMethods::route('index.php?Itemid=' . $Itemid, false));
		}

		$this->input->set('view', $view);
		parent::display(true, $urlparams);

		return $this;
	}
}
