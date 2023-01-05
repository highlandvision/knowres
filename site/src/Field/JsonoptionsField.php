<?php
/**
 * @package    Know Reservations
 * @subpackage Admin Models
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */
/** @noinspection PhpUnused */

namespace HighlandVision\Component\Knowres\Site\Field;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use Joomla\CMS\Form\FormField;
use Joomla\CMS\HTML\HTMLHelper;

use function is_countable;

/**
 * Property options preparation for guest.
 *
 * @since 1.0.0
 */
class JsonoptionsField extends FormField
{
	/** @var string The form field type. */
	protected $type = 'Jsonoptions';

	/**
	 * Get the field markup.
	 *
	 * @throws Exception
	 * @since  1.6
	 * @return string
	 */
	public function getInput(): string
	{
		$this->layout = "form.field.options";
		$this->type   = "JsonOptions";

		$contract_id      = $this->form->getValue('contract_id');
		$contract         = KrFactory::getAdminModel('contract')->getItem($contract_id);
		$property_options = KrFactory::getListModel('propertyoptions')
		                             ->getPropertyOptionsForProperty($contract->property_id);
		if (empty($property_options))
		{
			return '';
		}

		$yesno   = [];
		$yesno[] = HTMLHelper::_('select.option', 0, KrMethods::plain('JNO'));
		$yesno[] = HTMLHelper::_('select.option', 1, KrMethods::plain('JYES'));

		$goptions = [];
		if (is_countable($this->value))
		{
			foreach ($this->value as $v)
			{
				$goptions[$v->id] = $v->answer;
			}
		}
		foreach ($property_options as $po)
		{
			if (!isset($goptions[$po->id]))
			{
				$goptions[$po->id] = '';
			}
		}

		$data                     = [];
		$data['property_options'] = $property_options;
		$data['goptions']         = $goptions;
		$data['yesno']            = $yesno;

		$renderer = $this->getRenderer($this->layout);

		return $renderer->render($data);
	}
}