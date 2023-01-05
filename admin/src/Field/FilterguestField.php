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
use RuntimeException;

use function array_merge;

/**
 * Load a list of guests
 *
 * @since  3.2
 */
class FilterguestField extends KrListField
{
	/** @var string The form field type */
	public $type = 'Filterguest';

	/**
	 * Method to get the guests to populate filter list
	 *
	 * @throws RuntimeException
	 * @since  2.5.1
	 * @return array  The field option objects.
	 */
	protected function getOptions(): array
	{
		$table = $this->getAttribute('table');
		$state = self::getState($this->form);

		$db    = KrFactory::getDatabase();
		$query = $db->getQuery(true)
		            ->select($db->qn('g.id', 'value'))
		            ->select('CONCAT(g.surname, " ", g.firstname) AS text')
		            ->from($db->qn('#__knowres_guest', 'g'));

		if ($table != 'own')
		{
			$query->join('INNER',
				$db->qn($table, 't') . ' ON ' . $db->qn('g.id') . ' = ' . $db->qn('t.guest_id'));
		}

		if ($state != '*')
		{
			$query->where($db->qn('g.state') . '=' . $db->q($state));
		}

		$query->group($db->qn('value'))
		      ->group($db->qn('surname'))
		      ->order($db->qn('surname'));

		$db->setQuery($query);
		$options = $db->loadObjectList();

		return array_merge(parent::getOptions(), $options);
	}

	//	/**
	//	 * Get value for state
	//	 *
	//	 * @since   3.3.0
	//	 * @return  int|string
	//	 */
	//	protected function getState()
	//	{
	//		$state = '';
	//		if (isset($this->form->getData()->get('filter', [])->state))
	//		{
	//			$state = $this->form->getData()->get('filter', [])->state;
	//		}
	//
	//		if ($state == '')
	//		{
	//			$state = 1;
	//		}
	//
	//		return $state;
	//	}
}