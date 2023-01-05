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
use Joomla\CMS\Form\Field\ListField;
use Joomla\CMS\HTML\HTMLHelper;

use function array_merge;

/**
 * Supports a value from an external table
 *
 * @since 1.0.0
 */
class ListdocumenttypeField extends ListField
{
	/** @var string The form field type. */
	protected $type = 'Listdocumenttype';

	/**
	 * Get the field options.
	 *
	 * @throws InvalidArgumentException
	 * @since  1.6
	 * @return array    The field options.
	 */
	protected function getOptions(): array
	{
		$options   = [];
		$options[] = HTMLHelper::_('select.option', 0, KrMethods::plain('COM_KNOWRES_FORM_OPTION_DOCUMENT_TYPE'));
		$options[] = HTMLHelper::_('select.option', 1, KrMethods::plain('COM_KNOWRES_FORM_OPTION_DOCUMENT_TYPE1'));
		$options[] = HTMLHelper::_('select.option', 2, KrMethods::plain('COM_KNOWRES_FORM_OPTION_DOCUMENT_TYPE2'));
		$options[] = HTMLHelper::_('select.option', 3, KrMethods::plain('COM_KNOWRES_FORM_OPTION_DOCUMENT_TYPE3'));
		$options[] = HTMLHelper::_('select.option', 4, KrMethods::plain('COM_KNOWRES_FORM_OPTION_DOCUMENT_TYPE4'));
		$options[] = HTMLHelper::_('select.option', 5, KrMethods::plain('COM_KNOWRES_FORM_OPTION_DOCUMENT_TYPE5'));
		$options[] = HTMLHelper::_('select.option', 6, KrMethods::plain('COM_KNOWRES_FORM_OPTION_DOCUMENT_TYPE6'));

		return array_merge(parent::getOptions(), $options);
	}
}