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
use RuntimeException;

/**
 * The area options for menu selection.
 *
 * @since 1.0.0
 */
class ListareasField extends ListField
{
	/** @var string $type The form field type. */
	protected $type = 'Listareas';

	/**
	 * Get the field options.
	 *
	 * @throws InvalidArgumentException
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return array  The field options.
	 */
	public function getOptions(): array
	{
		$options = [];
		$items   = KrFactory::getListModel('properties')->getArea();
		foreach ($items as $i)
		{
			$options[] = HTMLHelper::_('select.option', urlencode($i), $i);
		}

		return array_merge(parent::getOptions(), $options);
	}
}