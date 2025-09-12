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
use HighlandVision\Component\Knowres\Administrator\Model\ContractModel;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Utility;
use InvalidArgumentException;
use Joomla\CMS\Form\Field\ListField;
use Joomla\CMS\HTML\HTMLHelper;

/**
 * Payment currency form field
 *
 * @since 3.1.0
 */
class ListcurrencypaymentField extends ListField
{
	/** @var string The form field type. */
	protected $type = 'Listcurrencypayment';

	/**
	 * Get the field options.
	 *
	 * @throws InvalidArgumentException
	 * @throws Exception
	 * @since  1.0.0
	 * @return array
	 */
	public function getOptions(): array
	{
		$options = [];

		$formData  = $this->form->getData();
		$id        = $formData->get('id', 0);
		$confirmed = $formData->get('confirmed', 0);

		if ($id && !$confirmed)
		{
			$options[] = HTMLHelper::_('select.option', $this->value, $this->value);
		}
		else
		{
			$contract_id = KrMethods::getUserState('com_knowres.current.contract_id', 0);
			/** @var ContractModel $contract */
			$contract = KrFactory::getAdminModel('contract')->getItem($contract_id);
			if ($contract->id)
			{
				$this->value = $contract->currency;
				$options[]   = HTMLHelper::_('select.option', $this->value, $this->value);
			}

			$currencies = KrFactory::getListModel('currencies')->getPaymentCurrencies($this->value);
			$currencies = Utility::decodeJson($currencies, true);
			foreach ($currencies as $c)
			{
				$options[] = HTMLHelper::_('select.option', $c, $c);
			}
		}

		return array_merge(parent::getOptions(), $options);
	}
}