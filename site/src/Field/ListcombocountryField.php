<?php
/**
 * @package    Know Reservations
 * @subpackage Site
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Site\Field;

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use InvalidArgumentException;
use Joomla\CMS\Form\Field\ListField;
use Joomla\CMS\HTML\HTMLHelper;

/**
 * Links country and region lists
 *
 * @since 1.0.0
 */
class ListcombocountryField extends ListField
{
	/**
	 * Get the field input.
	 *
	 * @throws InvalidArgumentException
	 * @since  1.0.0
	 * @return string The field input markup.
	 */
	public function getInput(): string
	{
		$this->type = 'Listcombocountry';

		if (!$this->value)
		{
			$this->setValue(KrMethods::getParams()->get('default_country'));
		}

		return parent::getInput();
	}

	/**
	 * Get the list options.
	 *
	 * @throws InvalidArgumentException
	 * @since  1.0.0
	 * @return array    The field options.
	 */
	public function getOptions(): array
	{
		$options = [];

		$items = KrFactory::getListModel('countries')->getAll();
		foreach ($items as $i)
		{
			$options[] = HTMLHelper::_('select.option', $i->id, $i->name);
		}

		return array_merge(parent::getOptions(), $options);
	}
}