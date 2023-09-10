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
	/** @var int $adults The number of adults. */
	protected int $adults = 2;
	/** @var int $children The number of children. */
	protected int $children = 0;
	/** @var array $child_gaes Child ages */
	protected array $child_ages = [];
	/** @var int The max number of guests. */
	protected int $max = 0;
	/** @var int The max number of free infants. */
	protected int $sleeps_infant_max = 0;
	/** @var int Free infant age limit. */
	protected int $sleeps_infant_age = 0;
	/** @var string The form field type. */
	protected $type = 'Listpartysize';

	/**
	 * Render the field with custom options if sent.
	 *
	 * @since  1.6
	 * @return string The field input markup.
	 */
	public function renderField($options = []): string
	{
		$this->adults            = $options['adults'];
		$this->children          = $options['children'];
		$this->child_ages        = $options['child_ages'];
		$this->max               = $options['max'];
		$this->sleeps_infant_max = $options['sleeps_infant_max'];
		$this->sleeps_infant_age = $options['sleeps_infant_age'];

		$this->dataAttributes = $this->setDataAttributes();

		return parent::renderField();
	}

	/**
	 * Form field options for select from form xml or build your own
	 *
	 * @throws InvalidArgumentException
	 * @since  4.0.0
	 * @return array  The field options.
	 */
	function getOptions(): array
	{
		$options = [];

		$maxguests = $this->max ?: KrMethods::getParams()->get('search_maxguests', 16);

		for ($i = 1; $i <= $maxguests; $i++) {
			$options[] = HTMLHelper::_('select.option',
			                           $i,
			                           KrMethods::sprintf('MOD_KNOWRES_SEARCH_GUESTS_LBL', $i, 0));
		}

		$key           = $this->adults + $this->children - 1;
		$options[$key] = HTMLHelper::_('select.option',
		                               $key + 1,
		                               KrMethods::sprintf('MOD_KNOWRES_SEARCH_GUESTS_LBL',
		                                                  $this->adults,
		                                                  $this->children));

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
		$attributes                = [];
		$attributes['aria-label']  = KrMethods::plain('MOD_KNOWRES_SEARCH_GUESTS_LBL_ARIA');
		$attributes['data-max']    = $this->max ?: KrMethods::getParams()->get('search_maxguests', 16);
		$attributes['data-adults'] = $this->max - $this->sleeps_infant_max;
		$attributes['data-toggle'] = 'kr-searchguest-drop';
		$attributes['onmousedown'] = "(function(e){ e.preventDefault(); })(event, this)";

		return $attributes;
	}
}