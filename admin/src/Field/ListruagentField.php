<?php
/**
 * @package    Know Reservations
 * @subpackage Admin Models
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

/** @noinspection PhpUnused */

namespace HighlandVision\Component\Knowres\Administrator\Field;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\Ru\Manager;
use Joomla\CMS\Form\Field\ListField;
use Joomla\CMS\HTML\HTMLHelper;
use Joomla\Utilities\ArrayHelper;
use RuntimeException;

use function array_merge;
use function class_exists;
use function method_exists;

/**
 * Rentals United agent list
 *
 * @since 3.3.0
 */
class ListruagentField extends ListField
{
	/** @var string The form field type. */
	protected $type = 'Listruagent';

	/**
	 * Get the field options.
	 *
	 * @throws Exception
	 * @since  3.3.0
	 * @return array
	 */
	protected function getOptions(): array
	{
		$options = [];

		$service_id = $this->form->getValue('service_id');
		if (!$service_id)
		{
			return $options;
		}

		try
		{
			$service = KrFactory::getAdminModel('service')->getItem($service_id);
		}
		catch (Exception)
		{
			$options[] = HTMLHelper::_('select.option', 0,
				KrMethods::plain('COM_KNOWRES_AGENT_FOREIGN_KEY_NOT_REQUIRED'));

			return array_merge(parent::getOptions(), $options);
		}

		if ($service->plugin != 'ru')
		{
			$options[] = HTMLHelper::_('select.option', 0,
				KrMethods::plain('COM_KNOWRES_AGENT_FOREIGN_KEY_NOT_REQUIRED'));

			return array_merge(parent::getOptions(), $options);
		}

		$class = 'HighlandVision\Ru\Manager';
		if (!class_exists($class) || !method_exists($class, 'pullAgents'))
		{
			throw new RuntimeException('RU service library needs to be installed');
		}

		$Manager = new Manager();
		$data    = $Manager->pullAgents();
		if (!is_countable($data) || !count($data))
		{
			$options[] = HTMLHelper::_('select.option', '0', 'Service appears to be down, try again later');
		}
		else
		{
			$options[] = HTMLHelper::_('select.option', 0, KrMethods::plain('COM_KNOWRES_PLEASE_SELECT'));
			foreach ($data as $agent)
			{
				$options[] = HTMLHelper::_('select.option', $agent['Username'], $agent['CompanyName']);
			}

			$options = ArrayHelper::sortObjects($options, 'text');
		}

		return array_merge(parent::getOptions(), $options);
	}
}