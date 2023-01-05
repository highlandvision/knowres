<?php
/**
 * @package    Know Reservations
 * @subpackage Admin Models
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Site\Field;

defined('_JEXEC') or die;

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
class ListpartysizeField extends ListField
{
	//TODO-v4.1 Reinstate from search form, guest field for adults children
	/** @var int $adults The number of adults. */
	protected int $adults = 2;
	/** @var int $children The number of children. */
	protected int $children = 0;
	/** @var string $type The form field type. */
	protected $type = 'Listpartysize';

	/**
	 * Get the field options.
	 *
	 * @since  1.6
	 * @return string The field input markup.
	 */
	public function getInput(): string
	{
		$this->dataAttributes = $this->setDataAttributes();

		return parent::getInput();
	}

	/**
	 * Get party size list options
	 *
	 * @throws InvalidArgumentException
	 * @since  4.0.0
	 * @return array  The field options.
	 */
	function getOptions(): array
	{
		$options   = [];
		$maxguests = KrMethods::getParams()->get('search_maxguests', 16);

		for ($i = 1; $i <= $maxguests; $i++)
		{
			$options[] = HTMLHelper::_('select.option', $i, KrMethods::sprintf('MOD_KNOWRES_SEARCH_GUESTS_LBL', $i, 0));
		}

		$key           = $this->adults + $this->children - 1;
		$options[$key] = HTMLHelper::_('select.option', $key + 1,
			KrMethods::sprintf('MOD_KNOWRES_SEARCH_GUESTS_LBL', $this->adults, $this->children));

		return array_merge(parent::getOptions(), $options);
	}

	/**
	 * Method to get a control group with label and input.
	 *
	 * @param   array  $options  Any options to be passed into the rendering of the field
	 *
	 * @since   3.2.3
	 * @return  string  A string containing the html for the control group
	 */
	public function renderField($options = []): string
	{
		if ($options['adults'])
		{
			$this->adults = $options['adults'];
		}

		if ($options['children'])
		{
			$this->children = $options['children'];
		}

		return parent::renderField();
	}

	/**
	 * Get the field data attributes.
	 *
	 * @since  4.0.0
	 * @return array    The field input markup.
	 */
	protected function setDataAttributes(): array
	{
		$attributes                = [];
		$attributes['aria-label']  = KrMethods::plain('MOD_KNOWRES_SEARCH_GUESTS_LBL_ARIA');
		$attributes['data-max']    = KrMethods::getParams()->get('search_maxguests', 16);
		$attributes['data-toggle'] = "kr-searchguest-drop";
		$attributes['onmousedown'] = "(function(e){ e.preventDefault(); })(event, this)";

		return $attributes;
	}
}