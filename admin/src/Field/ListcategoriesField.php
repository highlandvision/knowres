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
use HighlandVision\KR\Translations;
use InvalidArgumentException;
use Joomla\CMS\Form\Field\ListField;
use Joomla\CMS\HTML\HTMLHelper;
use Joomla\Utilities\ArrayHelper;

/**
 * The category options for menu selection
 *
 * @since 1.0.0
 */
class ListcategoriesField extends ListField
{
	/** @var string $type The form field type. */
	protected $type = 'Listcategories';

	/**
	 * Get the field options.
	 *
	 * @throws InvalidArgumentException
	 * @since  1.0.0
	 * @return array The field options.
	 */
	public function getOptions(): array
	{
		$options      = [];
		$Translations = new Translations();
		$categories   = KrFactory::getListModel('categories')->getAllCategories();

		foreach ($categories as $c)
		{
			$options[] = HTMLHelper::_('select.option', $c->id, $Translations->getText('category', $c->id));
		}

		return array_merge(parent::getOptions(), ArrayHelper::sortObjects($options, 'text'));
	}
}