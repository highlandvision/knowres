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
use HighlandVision\Component\Knowres\Administrator\Model\ReviewsModel as AdminReviewsModel;
use HighlandVision\KR\Joomla\Extend\Pagination;

use function defined;

/**
 * Guest review form
 *
 * @since  1.0.0
 */
class ReviewsModel extends AdminReviewsModel
{
	/**
	 * Returns pagination for properties list.
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return Pagination  A Pagination object for the data set.
	 */
	public function getPagination(): Pagination
	{
		$store = $this->getStoreId('getPagination');
		if (isset($this->cache[$store]))
		{
			return $this->cache[$store];
		}

		$limit = (int) $this->getState('list.limit') - (int) $this->getState('list.links');
		$page  = new Pagination($this->getTotal(), $this->getStart(), $limit);

		$this->cache[$store] = $page;

		return $this->cache[$store];
	}
}