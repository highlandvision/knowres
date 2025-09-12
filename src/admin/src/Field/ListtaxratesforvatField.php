<?php
/**
 * @package    Know Reservations
 * @subpackage Admin Models
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\Field;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use InvalidArgumentException;
use Joomla\CMS\Form\Field\ListField;
use Joomla\CMS\HTML\HTMLHelper;

use function array_merge;

/**
 * Supports a value from an external table
 *
 * @since 1.0.0
 */
class ListtaxratesforvatField extends ListField
{
	/** @var string The form field type. */
	protected $type = 'Listtaxratesforvat';

	/**
	 * Method to instantiate the form field object.
	 *
	 * @since   1.7.0
	 */
	public function __construct()
	{
		if (KrMethods::getParams()->get('ignore_taxes', 0))
		{
			return;
		}

		parent::__construct();
	}

	/**
	 * Get the field options.
	 *
	 * @throws InvalidArgumentException
	 * @throws Exception
	 * @since  1.6
	 * @return array    The field input markup.
	 */
	public function getOptions(): array
	{
		$taxrates = KrFactory::getListModel('taxrates')->getAll();
		if (is_countable($taxrates) && count($taxrates))
		{
			$taxrates = $this->matchTax($taxrates);
		}

		$options = [];
		foreach ($taxrates as $i)
		{
			$options[] = HTMLHelper::_('select.option', $i->id, $i->name);
		}

		return array_merge(parent::getOptions(), $options);
	}

	/**
	 * Filter tax rates by basis
	 *
	 * @param   array  $taxrates  Array of all tax rates
	 *
	 * @throws Exception
	 * @since  4.0.0
	 * @return array
	 */
	private function matchTax(array $taxrates): array
	{
		$rates    = $taxrates;
		$taxrates = [];

		foreach ($rates as $t)
		{
			if ($t->basis < 1)
			{
				$taxrates[] = $t;
			}
		}

		return $taxrates;
	}
}