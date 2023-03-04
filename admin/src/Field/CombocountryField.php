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

use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use InvalidArgumentException;
use Joomla\CMS\Form\Field\ListField;
use Joomla\CMS\HTML\HTMLHelper;

use RuntimeException;

use function array_merge;

/**
 * Field for countrytown combo.
 *
 * @since 1.0.0
 */
class CombocountryField extends ListField
{
	/** @var string The form field type. */
	protected $type = 'Combocountry';

	/**
	 * Get the field options.
	 *
	 * @since  1.6
	 * @return string The field input markup.
	 */
	public function getInput(): string
	{
		if (!$this->value)
		{
			$this->setValue(KrMethods::getParams()->get('default_country'));
		}

		$this->dataAttributes = $this->setDataAttributes();

		return parent::getInput();
	}

	/**
	 * Get the field options.
	 *
	 * @throws RuntimeException|InvalidArgumentException
	 * @since  4.0.0
	 * @return array    The field input markup.
	 */
	protected function getOptions(): array
	{
		$options = [];
		$items   = KrFactory::getListModel('countries')->getAll($this->getAttribute('allowproperty', 0));
		foreach ($items as $i)
		{
			$options[] = HTMLHelper::_('select.option', $i->id, $i->name);
		}

		return array_merge(parent::getOptions(), $options);
	}

	/**
	 * Get the field data attributes.
	 *
	 * @since  4.0.0
	 * @return array    The field input markup.
	 */
	protected function setDataAttributes(): array
	{
		$attributes                       = [];
		$attributes['data-defaultregion'] = $this->form->getValue('region_id');
		$attributes['data-defaulttown']   = $this->form->getValue('town_id');
		if ($this->getAttribute('target'))
		{
			$attributes['data-target'] = $this->getAttribute('target');
		}
		if ($this->getAttribute('ajaxname'))
		{
			$attributes['data-ajaxname'] = $this->getAttribute('ajaxname');
		}

		return $attributes;
	}
}