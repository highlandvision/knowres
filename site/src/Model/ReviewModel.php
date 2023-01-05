<?php
/**
 * @package    Know Reservations
 * @subpackage Site Controllers
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Site\Model;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\Component\Knowres\Administrator\Model\ReviewModel as AdminReviewModel;
use HighlandVision\KR\Framework\KrMethods;

use function defined;

/**
 * Guest review form
 *
 * @since  1.0.0
 */
class ReviewModel extends AdminReviewModel
{
	/**
	 * Method to check in an item
	 *
	 * @param   int|null  $pks  The id of the row to check out.
	 *
	 * @since  2.5.0
	 * @return bool True on success, false on failure
	 */
	public function checkin($pks = null): bool
	{
		return true;
	}

	/**
	 * Method to check out an item for editing.
	 *
	 * @param   int|null  $pk  The id of the row to check out.
	 *
	 * @since  1.6
	 * @return bool True on success, false on failure
	 */
	public function checkout($pk = null): bool
	{
		return true;
	}

	/**
	 * Save a guest entered review.
	 *
	 * @param   array  $data  The existing form data.
	 *
	 * @throws  Exception
	 * @since   1.6
	 * @return  bool  True if successful, false otherwise.
	 */
	public function save($data): bool
	{
		if (parent::save($data))
		{
			KrMethods::message('');
			$params = KrMethods::getParams();
			KrMethods::redirect(KrMethods::route('index.php?Itemid=' . (int) $params->get('link_review_thanks'),
				false));
		}

		return true;
	}
}