<?php
/**
 * @package     Joomla.Libraries
 * @subpackage  Form
 * @copyright   2005 - 2016 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE
 */

namespace HighlandVision\Component\Knowres\Administrator\Field;

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Joomla\Extend\ListField as KrListField;
use HighlandVision\KR\Session as KrSession;
use InvalidArgumentException;
use Joomla\DI\Exception\KeyNotFoundException;
use RuntimeException;

use function array_merge;
use function defined;

/**
 * Filter for restricted access to owner so owners only see their own names
 *
 * @since  5.0
 */
class FilterownerpropertiesField extends KrListField
{
	/** @var string The form field type. */
	public $type = 'Filterownerproperties';

	/**
	 * Method to get the owners to populate filter list
	 *
	 * @throws RuntimeException
	 * @throws KeyNotFoundException
	 * @throws InvalidArgumentException
	 * @since   5.0.0
	 * @return  array  The field option objects.
	 */
	protected function getOptions(): array
	{
		$userSession = new KrSession\User();
		if ($userSession->getAccessLevel() < 30) {
			$options = [];

			return array_merge(parent::getOptions(), $options);
		}

		$db    = KrFactory::getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn('o.id', 'value'))
		      ->select($db->qn('o.name', 'text'))
		      ->from($db->qn('#__knowres_owner', 'o'))
		      ->where($db->qn('o.state') . '=1');

		$userProperties = $userSession->getUserProperties();
		if (!empty($userProperties)) {
			$query->from($db->qn('#__knowres_property', 'p'));
			$query->where($db->qn('p.id') . 'IN (' . $userProperties . ')');
		}

		$query->group($db->qn('value'))
		      ->group($db->qn('text'))
		      ->order($db->qn('text'));

		$db->setQuery($query);
		$options = $db->loadObjectList();

		return array_merge(parent::getOptions(), $options);
	}
}