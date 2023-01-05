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
use InvalidArgumentException;
use Joomla\CMS\Form\Field\ListField;
use Joomla\CMS\HTML\HTMLHelper;

use function array_merge;

/**
 * Supports a value from an external table
 *
 * @since 1.0.0
 */
class ListguestemailField extends ListField
{
	/** @var string The form field type. */
	protected $type = 'Listguestemail';

	/**
	 * Get the field options.
	 *
	 * @throws InvalidArgumentException
	 * @since  4.0.0
	 * @return array The field options.
	 */
	protected function getOptions(): array
	{
		$options = [];
		$items   = KrFactory::getListModel('guests')->getEmails('', 999);

		foreach ($items as $i)
		{
			$options[] = HTMLHelper::_('select.option', $i->id, $i->email);
		}

		return array_merge(parent::getOptions(), $options);
	}
}