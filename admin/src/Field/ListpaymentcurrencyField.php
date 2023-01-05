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
use HighlandVision\KR\Utility;
use InvalidArgumentException;
use Joomla\CMS\Form\Field\ListField;
use Joomla\CMS\HTML\HTMLHelper;

use function array_merge;

/**
 * Supports a value from an external table
 *
 * @since 1.0.0
 */
class ListpaymentcurrencyField extends ListField
{
	/** @var string $type The form field type. */
	protected $type = 'Listpaymentcurrency';

	/**
	 * Get the field options.
	 *
	 * @throws InvalidArgumentException
	 * @since  1.6
	 * @return array  The field input markup.
	 */
	public function getOptions(): array
	{
		$options    = [];
		$currencies = [];

		$items = KrFactory::getListModel('currencies')->getAllPropertyCurrencies();
		foreach ($items as $i)
		{
			$currencies[]  = $i->iso;
			$allow_payment = Utility::decodeJson($i->allow_payment, true);
			foreach ($allow_payment as $c)
			{
				$currencies[] = $c;
			}
		}

		$items = array_unique($currencies);

		foreach ($items as $c)
		{
			$options[] = HTMLHelper::_('select.option', $c, $c);
		}

		return array_merge(parent::getOptions(), $options);
	}
}