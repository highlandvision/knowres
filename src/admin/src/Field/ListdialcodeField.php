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

/**
 * Dialling code form field
 *
 * @since 1.0.0
 */
class ListdialcodeField extends ListField
{
	/** @var string The form field type. */
	public $type = 'Listdialcode';

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

		return parent::getInput();
	}

	/**
	 * Get the field options.
	 *
	 * @throws InvalidArgumentException
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return array The field input markup.
	 */
	public function getOptions(): array
	{
		$options = [];

		$items = KrFactory::getListModel('countries')->getAll();
		foreach ($items as $i)
		{
			$options[] = HTMLHelper::_('select.option', $i->id, $i->name . ' (+' . $i->dial_code . ')');
		}

		return array_merge(parent::getOptions(), $options);
	}
}