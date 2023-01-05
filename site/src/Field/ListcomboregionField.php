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

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use Joomla\CMS\Form\Field\ListField;
use Joomla\CMS\HTML\HTMLHelper;

/**
 * Links country and region lists
 *
 * @since 1.0.0
 */
class ListcomboregionField extends ListField
{
	/** @var string The form field type. */
	protected $type = 'Listcomboregion';

	/**
	 * Method to get the field input markup.
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return array
	 */
	public function getOptions(): array
	{
		$options = [];

		$country_id = KrMethods::inputInt('country_id');
		if (empty($country_id))
		{
			$country_id = KrMethods::getParams()->get('default_country');
		}

		$items = KrFactory::getListModel('regions')->getAllRegions(false, null, $country_id);
		foreach ($items as $i)
		{
			$options[] = HTMLHelper::_('select.option', $i->id, $i->name);
		}

		return array_merge(parent::getOptions(), $options);
	}
}