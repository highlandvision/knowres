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
use HighlandVision\KR\Translations;
use InvalidArgumentException;
use Joomla\CMS\Form\Field\ListField;
use Joomla\CMS\HTML\HTMLHelper;

use RuntimeException;

use function array_merge;

/**
 * Referral form field
 *
 * @since 1.0.0
 */
class ListreferralField extends ListField
{
	/** @var string The form field type. */
	protected $type = 'Listreferral';

	/**
	 * Get the field options.
	 *
	 * @throws RuntimeException|InvalidArgumentException
	 * @since  1.0.0
	 * @return array  The field input markup.
	 */
	public function getOptions(): array
	{
		$options = [];

		$items        = KrFactory::getListModel('referrals')->getItems();
		$Translations = new Translations();
		$data         = $Translations->getArray($items, 'referral', 'name');
		foreach ($data as $k => $v)
		{
			$options[] = HTMLHelper::_('select.option', $k, $v);
		}

		return array_merge(parent::getOptions(), $options);
	}
}