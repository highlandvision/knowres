<?php
/**
 * @package    Know Reservations
 * @subpackage Admin Models
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

/** @noinspection MissingSinceTagDocInspection */

namespace HighlandVision\Component\Knowres\Administrator\Model;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\AdminModel;
use HighlandVision\KR\Session as KrSession;
use HighlandVision\KR\Utility;
use Joomla\CMS\Factory;
use Joomla\CMS\Versioning\VersionableControllerTrait;

/**
 * Coupon model
 *
 * @since 1.0.0
 */
class CouponModel extends AdminModel
{
	use VersionableControllerTrait;

	/**  @var string The type alias. */
	public $typeAlias = 'com_knowres.coupon';
	/** @var mixed Batch copy/move command. If set to false, the batch copy/move command is not supported. */
	protected $batch_copymove = false;
	/**  @var ?string The prefix to use with controller messages. */
	protected $text_prefix = 'COM_KNOWRES_COUPON';

	/**
	 * Method to save the form data
	 * Override for coupon_code increment field
	 *
	 * @param   array  $data  The form data.
	 *
	 * @throws Exception
	 * @since  3.2
	 * @return bool  True on success.
	 */
	public function save($data): bool
	{
		if (Factory::getApplication()->input->get('task') == 'save2copy')
		{
			$data['coupon_code'] = Utility::generateNewName($data['coupon_code']);
		}

		return parent::save($data);
	}

	/**
	 * Method to test whether a record can be deleted.
	 *
	 * @param   object  $record  A record object.
	 *
	 * @since  3.0.0
	 * @return bool  True if allowed to delete the record, defaults to the permission for the component.
	 */
	protected function canDelete($record): bool
	{
		$userSession = new KrSession\User();

		return $userSession->getAccessLevel() == 40 || Factory::getUser()->authorise('core.delete', $this->option);
	}

	/**
	 * Method to get the data that should be injected in the form.
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return mixed The data for the form.
	 */
	protected function loadFormData(): mixed
	{
		$data = KrMethods::getUserState('com_knowres.edit.coupon.data', []);
		if (empty($data))
		{
			$data = $this->getItem();
		}

		return $data;
	}
}