<?php
/**
 * @package    Know Reservations
 * @subpackage Site Field
 * @copyright  2022 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Site\Field;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\ListField;
use InvalidArgumentException;
use Joomla\CMS\HTML\HTMLHelper;

/**
 * Get mailchimp services list.
 *
 * @since 1.0.0
 */
class ListselectserviceField extends ListField
{
	/** @var string The form field type. */
	protected $type = 'Listselectservice';

	/**
	 * Get the field options
	 *
	 * @throws InvalidArgumentException
	 * @throws Exception
	 * @since  4.0.0
	 * @return array|void
	 */
	public function getOptions()
	{
		$services = KrFactory::getListModel('services')->getServicesByPlugin('mailchimp');
		if (!is_countable($services) || !count($services))
		{
			KrMethods::message(KrMethods::plain('Please set up mailchimp service before adding a subscription form'),
				'error');

			return;
		}

		foreach ($services as $mc)
		{
			$options[] = HTMLHelper::_('select.option', $mc->id, $mc->name);
		}

		return array_merge(parent::getOptions(), $options);
	}
}