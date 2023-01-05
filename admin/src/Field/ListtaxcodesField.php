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
use HighlandVision\KR\Session as KrSession;
use InvalidArgumentException;
use Joomla\CMS\Form\Field\ListField;
use Joomla\CMS\HTML\HTMLHelper;

use function array_merge;

/**
 * Supports a value from an external table
 *
 * @since 1.0.0
 */
class ListtaxcodesField extends ListField
{
	/** @var string The form field type. */
	protected $type = 'Listtaxcodes';

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
		$taxrates    = KrFactory::getListModel('taxrates')->getAll();
		$property_id = $this->getProperty();
		if ($property_id)
		{
			if (is_countable($taxrates) && count($taxrates))
			{
				$taxrates = $this->matchTax($property_id, $taxrates);
				$taxrates = $this->getCurrent($taxrates);
			}
		}

		$options = [];
		foreach ($taxrates as $k => $v)
		{
			$options[] = HTMLHelper::_('select.option', $k, $k);
		}

		return array_merge(parent::getOptions(), $options);
	}

	/**
	 * Filter tax rates to get current rates only
	 *
	 * @param   array  $taxrates  Array of all tax rates
	 *
	 * @throws Exception
	 * @since  4.0.0
	 * @return array
	 */
	private function getCurrent(array $taxrates): array
	{
		$tmp   = [];
		$first = true;

		foreach ($taxrates as $t)
		{
			if (!$first && array_key_exists($t->code, $tmp) && $t->valid_from > $tmp[$t->code])
			{
				$tmp[$t->code] = $t->valid_from;
			}

			$tmp[$t->code] = $t->valid_from;
			$first         = false;
		}

		return $tmp;
	}

	/**
	 * Get the current property from the session
	 *
	 * @since  4.0.0
	 * @return int
	 */
	private function getProperty(): int
	{
		$userSession = new KrSession\User();
		$userData    = $userSession->getData();

		return (int) $userData->cr_property_id;
	}

	/**
	 * Filter tax rates by property location
	 *
	 * @param   int    $property_id  ID of property
	 * @param   array  $taxrates     Array of all tax rates
	 *
	 * @throws Exception
	 * @since  4.0.0
	 * @return array
	 */
	private function matchTax(int $property_id, array $taxrates): array
	{
		$property = KrFactory::getAdminModel('property')->getItem($property_id);
		$rates    = $taxrates;
		$taxrates = [];

		foreach ($rates as $t)
		{
			if ($t->town_id == $property->town_id)
			{
				$taxrates[] = $t;
				continue;
			}
			if ($t->region_id == $property->region_id)
			{
				$taxrates[] = $t;
				continue;
			}
			if ($t->country_id == $property->country_id)
			{
				$taxrates[] = $t;
			}
		}

		return $taxrates;
	}
}