<?php
/**
 * @package         Joomla.Site
 * @subpackage      com_knowres
 * @copyright   (C) 2012 Open Source Matters, Inc. <https://www.joomla.org>
 * @license         GNU General Public License version 2 or later; see LICENSE.txt
 */

namespace HighlandVision\Component\Knowres\Site\Helper;

defined('_JEXEC') or die;

use Exception;
use Joomla\CMS\Association\AssociationExtensionHelper;
use Joomla\CMS\Factory;
use Joomla\Component\Menus\Administrator\Helper\MenusHelper;

use function defined;

/**
 * Knowres Component Association Helper
 *
 * @since  3.0
 */
abstract class AssociationHelper extends AssociationExtensionHelper
{
	/** @var array The extension name */
	protected $extension = 'com_knowres';
	/** @var array Item types */
	protected $itemTypes = [];
	/** @var  bool Associations support */
	protected $associationsSupport = false;

	/**
	 * Method to get the associations for a given item
	 *
	 * @param   integer  $id    ID of the item
	 * @param  ?string   $view  Name of the view
	 *
	 * @throws Exception
	 * @since  3.0
	 * @return array   Array of associations for the item
	 */
	public static function getAssociations(int $id = 0, ?string $view = null): array
	{
		//TODO-v4.3 Maybe language related
		$return       = [];
		$associations = [];

		$active = Factory::getApplication()->getMenu()->getActive();
		if ($active)
		{
			$associations = MenusHelper::getAssociations($active->id);
		}

		$input = Factory::getApplication()->input;
		$view  = is_null($view) ? $input->get('view') : $view;

		if ($view == 'property')
		{
			$id = empty($id) ? $input->getInt('id') : $id;
			if ($id)
			{
				foreach ($associations as $tag => $Itemid)
				{
					$return[$tag] = 'index.php?option=com_knowres&Itemid=' . $Itemid . '&view=property&id=' . $id;
				}

				return $return;
			}
		}

		if ($view == 'properties')
		{
			$region_id = $input->getInt('region_id', 0);
			$arrival   = $input->getString('arrival', '');
			$departure = $input->getString('departure', '');
			$guests    = $input->getInt('guests', 0);

			foreach ($associations as $tag => $Itemid)
			{
				$string = 'index.php?option=com_knowres&Itemid=' . $Itemid . '&view=properties&region_id=' . $region_id;
				if ($arrival)
				{
					$string .= '&arrival=' . $arrival;
				}
				if ($departure)
				{
					$string .= '&departure=' . $departure;
				}
				if ($guests)
				{
					$string .= '&guests=' . $guests;
				}

				$return[$tag] = $string;
			}

			return $return;
		}

		return [];
	}
}