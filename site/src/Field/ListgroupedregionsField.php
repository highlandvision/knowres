<?php
/**
 * @package    Know Reservations
 * @subpackage Site
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Site\Field;

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrFactory;
use Joomla\CMS\Form\Field\GroupedlistField;
use Joomla\CMS\HTML\HTMLHelper;
use UnexpectedValueException;

use function array_merge;

/**
 * Regions grouped by country.
 *
 * @since 4.0.0
 */
class ListgroupedregionsField extends GroupedlistField
{
	/** @var array Regions by country / region_id / name. */
	protected array $regions = [];
	/** @var string The form field type. */
	protected $type = 'Listgroupedregions';

	/**
	 * Method to get a control group with label and input.
	 *
	 * @param   array  $options  Any options to be passed into the rendering of the field
	 *
	 * @since   3.2.3
	 * @return  string  A string containing the html for the control group
	 */
	public function renderField($options = [])
	{
		if ($options['regions'])
		{
			$this->regions = $options['regions'];
		}

		if ($options['expanded'])
		{
			$this->dataAttributes = $this->setDataAttributes();
		}

		return parent::renderField();
	}

	/**
	 * Method to get the field input markup.
	 *
	 * @throws UnexpectedValueException
	 * @since  4.0.0
	 * @return array  The field option objects as a nested array in groups.
	 */
	protected function getGroups()
	{
		$country = '';
		foreach ($this->regions as $country_name => $regions)
		{
			if (empty($country) || $country != $country_name)
			{
				$groups[$country_name] = [];
			}

			foreach ($regions as $region_id => $name)
			{
				$groups[$country_name][] = HTMLHelper::_(
					'select.option',
					$region_id,
					$name,
					'value',
					'text'
				);
			}
		}

		return array_merge(parent::getGroups(), $groups);
	}

	/**
	 * Set the field attributes.
	 *
	 * @since  4.0.0
	 * @return array    Of attributes.
	 */
	protected function setDataAttributes(): array
	{
		$attributes                = [];
		$attributes['onmousedown'] = "(function(e){ e.preventDefault(); })(event, this)";
		$attributes['data-toggle'] = "kr-searchregion-drop";

		return $attributes;
	}
}