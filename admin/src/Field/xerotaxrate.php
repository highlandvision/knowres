<?php
/**
 * @package    Know Reservations
 * @subpackage Admin Models
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */
/** @noinspection PhpUnhandledExceptionInspection */

namespace HighlandVision\Component\Knowres\Administrator\Field;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Service\Xero;
use InvalidArgumentException;
use Joomla\CMS\Form\FormHelper;
use Joomla\CMS\HTML\HTMLHelper;

FormHelper::loadFieldClass('list');

/**
 * Form field for xero accounts select
 *
 * @since    3.1.0
 */
class JFormFieldXerotaxrate extends JFormField
{

	/**
	 * The form field type.
	 *
	 * @since    3.1.0
	 * @var        string
	 */
	protected $type = 'Xerotaxrate';

	/**
	 * Get the field options.ader
	 *
	 * @throws InvalidArgumentException
	 * @throws Exception|\XeroPHP\Remote\Exception
	 * @since  3.1.0
	 * @return string    The field input markup
	 */
	public function getInput(): string
	{
		$options = [];

		$service_id = KrFactory::getListModel('services')::checkForSingleService(true, 'xero');
		$xero       = new Xero($service_id);
		$data       = $xero->getTaxRates(true);

		if (!count($data))
		{
			$options[] = HTMLHelper::_('select.option', '0', "Please add some tax rates on Xero and come back again");
		}
		else
		{
			$options[] = HTMLHelper::_('select.option', 0, KrMethods::plain('COM_KNOWRES_XERO_SELECT_TAXRATE'));

			foreach ($data as $d)
			{
				$options[] = HTMLHelper::_('select.option', $d->Name, $d->Name);
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