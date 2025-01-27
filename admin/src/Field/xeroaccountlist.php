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

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Service\Xero;
use Joomla\CMS\Form\FormHelper;
use Joomla\CMS\HTML\HTMLHelper;

FormHelper::loadFieldClass('list');

/**
 * Field for xero accounts selection
 *
 * @since  3.1.0
 */
class JFormFieldXeroaccountlist extends JFormField
{

	/** @var string   The form field type * */
	protected string $type = 'Xeroaccountlist';

	/**
	 * Get the field options.ader
	 *
	 * @throws Exception|\XeroPHP\Remote\Exception
	 * @since  3.1.0
	 * @return string    The field input markup
	 */
	public function getInput(): string
	{
		$options = [];

		$this->type = $this->getAttribute('accounttype');
		$service_id = KrFactory::getListModel('services')::checkForSingleService(true, 'xero');

		$xero = new Xero($service_id);
		$data = $xero->getAccounts();
		if (!$data)
		{
			$options[] = HTMLHelper::_('select.option', "0", "Please configure accounts on Xero");
		}
		else
		{
			$options[] = HTMLHelper::_('select.option', 0, KrMethods::plain('COM_KNOWRES_XERO_SELECT_ACCOUNT'));

			foreach ($data as $d)
			{
				if ($this->type == $d->Type)
				{
					$options[] = HTMLHelper::_('select.option', $d->Code, $d->Name);
				}
			}
		}

		$input_options = [];
		if ($this->class)
		{
			$input_options[] = 'class="' . $this->class . '"';
		}

		return HTMLHelper::_('select.genericlist', $options, $this->name, implode(' ', $input_options), 'value', 'text',
			$this->value);

		return $html;
	}
}