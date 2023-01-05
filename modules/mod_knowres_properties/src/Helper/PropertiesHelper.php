<?php
/**
 * @package    Know Reservations
 * @subpackage Site module
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace Knowres\Module\Properties\Site\Helper;

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use InvalidArgumentException;
use Joomla\CMS\HTML\HTMLHelper;

use function count;

/**
 * Helper class mod_knowres_properties
 *
 * @since 1.0.0
 */
abstract class PropertiesHelper
{
	/**
	 * Creates the options for the property select
	 *
	 * @throws InvalidArgumentException
	 * @since  4.0.0
	 * @return mixed
	 */
	public static function setOptions(): mixed
	{
		$names = KrFactory::getListSiteModel('properties')->getNames();
		if (!is_countable($names) || !count($names))
		{
			return false;
		}

		$options   = [];
		$options[] = HTMLHelper::_('select.option', 0, KrMethods::plain('MOD_KNOWRES_PROPERTIES_DEFAULT'));

		foreach ($names as $r)
		{
			$options[] = HTMLHelper::_('select.option', $r->id, $r->property_name);
		}

		$attribs = ['onchange' => 'this.form.submit();',
		            'title'    => KrMethods::plain('MOD_KNOWRES_PROPERTIES_TITLE')];

		return HTMLHelper::_('select.genericlist', $options, 'id', $attribs, 'value', 'text', 0);
	}
}