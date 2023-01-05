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
use RuntimeException;

use function array_merge;

/**
 * Filter for restricted access to owner
 * so owners only see their own names
 *
 * @since  3.2
 */
class FilterownerrestrictField extends KrListField
{
	/** @var string The form field type. */
	public $type = 'Filterownerrestrict';

	/**
	 * Method to get the owners to populate filter list
	 *
	 * @throws  RuntimeException
	 * @since   2.5.1
	 * @return  array  The field option objects.
	 */
	protected function getOptions(): array
	{
		$state     = self::getState($this->form);
		$departure = null;
		if (isset($this->form->getData()->get('filter', [])->departure))
		{
			$departure = $this->form->getData()->get('filter', [])->departure;
		}

		$db    = KrFactory::getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn('o.id', 'value'))
		      ->select($db->qn('o.name', 'text'))
		      ->from($db->qn('#__knowres_contract', 'c'));

		if (!empty($departure))
		{
			$query->where($db->qn('c.departure') . '>=' . $db->q($departure));
		}

		$query->join('INNER', $db->qn('#__knowres_property', 'p') . 'ON' . $db->qn('p.id') . '=' . $db->qn('c.property_id'))
		      ->join('INNER', $db->qn('#__knowres_owner', 'o') . 'ON' . $db->qn('o.id') . '=' . $db->qn('p.owner_id'));

		$userSession     = new KrSession\User();
		$user_properties = $userSession->getUserProperties();
		if (!empty($user_properties))
		{
			$query->where($db->qn('p.id') . 'IN (' . $user_properties . ')');
		}

		if ($state != '*')
		{
			$query->where($db->qn('o.state') . '=' . $db->q($state));
		}

		$query->group($db->qn('value'))
		      ->group($db->qn('text'))
		      ->order($db->qn('text'));

		$db->setQuery($query);

		$options = $db->loadObjectList();

		return array_merge(parent::getOptions(), $options);
	}
}