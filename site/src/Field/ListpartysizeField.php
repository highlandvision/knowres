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
use Joomla\CMS\Language\Text;

use function array_merge;

/**
 * Displays either the expanded guest numbers with adults, children and ages
 * or the simple select option for total guests
 *
 * @since 1.0.0
 */
class ListpartysizeField extends ListField
{
	/** @var int $adults The number of adults. */
	protected int $adults = 2;
	/** @var array $child_gaes Child ages */
	protected array $child_ages = [];
	/** @var int $children The number of children. */
	protected int $children = 0;
	/** @var int Expanded guest option. */
	protected int $expanded = 0;
	/** @var int Free infant age limit. */
	protected int $infant_age = 0;
	/** @var int The max number of free infants. */
	protected int $infant_max = 0;
	/** @var int The max number of guests. */
	protected int $max = 0;
	/** @var string The form field type. */
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
	 * Render the field with custom options if sent.
	 *
	 * @since  1.6
	 * @return string The field input markup.
	 */
	public function renderField($options = []): string
	{
		$this->expanded   = KrMethods::getParams()->get('search_guests_expanded', 0);

		$this->adults     = $options['adults'];
		$this->child_ages = $options['child_ages'];
		$this->children   = $options['children'];
		$this->infant_age = !empty($options['infant_age']);
		$this->infant_max = !empty($options['infant_max']);
		$this->max        = !empty($options['max']) ;

//		$this->dataAttributes = $this->setDataAttributes();

		return parent::renderField();
	}

	/**
	 * Form field options for select from or build your own
	 *
	 * @throws InvalidArgumentException
	 * @since  4.0.0
	 * @return array  The field options.
	 */
	protected function getOptions(): array
	{
		$options = [];

		if ($this->expanded) {
			$maxguests  = $this->max ?: KrMethods::getParams()->get('search_maxguests', 0);
			$adult_age  = KrMethods::getParams()->get('search_adult_age', 18);
			$infant_age = $this->infant_age ?: KrMethods::getParams()->get('infant_age', 2);
			$infant_max = $this->infant_max ?: KrMethods::getParams()->get('infant_max', 1);

			for ($i = 1; $i <= $maxguests; $i++) {
				$options[] = HTMLHelper::_('select.option',
				                           $i,
				                           KrMethods::sprintf('MOD_KNOWRES_SEARCH_GUESTS_LBL', $i, 0));
			}

			$key           = $this->adults + $this->children - 1;
			$options[$key] = HTMLHelper::_('select.option',
			                               $key + 1,
			                               $this->children == 1 ?
				                               KrMethods::sprintf('MOD_KNOWRES_SEARCH_GUESTS_LBL_1',
				                                                  $this->adults,
				                                                  $this->children) :
				                               KrMethods::sprintf('MOD_KNOWRES_SEARCH_GUESTS_LBL',
				                                                  $this->adults,
				                                                  $this->children));
		} else {
			$options[] = HTMLHelper::_('select.option', 1, KrMethods::plain('MOD_KNOWRES_SEARCH_ANY'));
			for ($i = 2; $i < $this->max; $i++) {
				$options[] = HTMLHelper::_('select.option', $i, Text::plural('MOD_KNOWRES_SEARCH_GUEST', $i));
			}

			$options[] = HTMLHelper::_('select.option',
			                           $this->max,
			                           Text::plural('MOD_KNOWRES_SEARCH_GUEST', $this->max . '+'));
		}

		return array_merge(parent::getOptions(), $options);
	}

	/**
	 * Field data attributes.
	 *
	 * @since  4.0.0
	 * @return array    The field input markup.
	 */
	protected function setDataAttributes(): array
	{
		$attributes               = [];
		$attributes['aria-label'] = KrMethods::plain('MOD_KNOWRES_SEARCH_GUESTS_LBL_ARIA');
		$attributes['data-max']   = $this->max ?: KrMethods::getParams()->get('search_maxguests', 16);

		if ($this->expanded) {
			$attributes['data-adults'] = $this->max - $this->infant_max;
			$attributes['onmousedown'] = "(function(e){ e.preventDefault(); })(event, this);";
			$attributes['data-toggle'] = 'kr-searchguest-drop';
		}

		return $attributes;
	}
}