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

use HighlandVision\KR\Framework\KrMethods;
use InvalidArgumentException;
use JetBrains\PhpStorm\NoReturn;
use Joomla\CMS\Form\Field\ListField;
use Joomla\CMS\HTML\HTMLHelper;

use function array_merge;

/**
 * Display the party size details for adults, children and infants
 *
 * @since 1.0.0
 */
class xxListpartysizeField extends ListField
{
	/** @var int $adults The number of adults. */
	public int $adults = 2;
	/** @var int $children The number of children. */
	public int $children = 0;
	/** @var int $max The max number of guests. */
	public int $max = 0;
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
	 * Method to get a control group with label and input.
	 *
	 * @param  array  $options  Any options to be passed into the rendering of the field
	 *
	 * @since   3.2.3
	 * @return  string  A string containing the html for the control group
	 */
	#[NoReturn] public function renderField($options = []): string
	{
		if (!empty($options['adults'])) {
			$this->adults = $options['adults'];
		}

		if (!empty($options['children'])) {
			$this->children = $options['children'];
		}

		return parent::renderField();
	}

	/**
	 * Get party size list options
	 *
	 * @throws InvalidArgumentException
	 * @since  4.0.0
	 * @return array  The field options.
	 */
	protected function getOptions(): array
	{
		$options = [];

		$maxguests = $this->max ?: KrMethods::getParams()->get('search_maxguests', 16);

		for ($i = 1; $i <= $maxguests; $i++) {
			$options[] = HTMLHelper::_('select.option',
			                           $i,
			                           KrMethods::sprintf('COM_KNOWRES_CONTRACT_GUESTS_OPTIONS', $i, 0));
		}

		$key           = $this->adults + $this->children - 1;
		$options[$key] = HTMLHelper::_('select.option',
		                               $key + 1,
		                               KrMethods::sprintf('COM_KNOWRES_CONTRACT_GUESTS_OPTIONS',
		                                                  $this->adults,
		                                                  $this->children));

		return array_merge(parent::getOptions(), $options);
	}

	/**
	 * Set the field data attributes.
	 *
	 * @since  4.0.0
	 * @return array    The field input markup.
	 */
	protected function setDataAttributes(): array
	{
		$attributes                   = [];
		$attributes['aria-expanded']  = false;
		$attributes['aria-label']     = KrMethods::plain('COM_KNOWRES_CONTRACT_GUESTS_LBL_ARIA');
		$attributes['data-max']       = KrMethods::getParams()->get('search_maxguests', 16);
		$attributes['data-bs-toggle'] = 'dropdown';
		$attributes['onmousedown']    = "(function(e){ e.preventDefault(); })(event, this)";

		return $attributes;
	}
}