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
use HighlandVision\KR\TickTock;
use Joomla\CMS\Versioning\VersionableControllerTrait;
use RuntimeException;

/**
 * Knowres review model
 *
 * @since 1.0.0
 */
class ReviewModel extends AdminModel
{
	use VersionableControllerTrait;

	/**  @var string The type alias. */
	public $typeAlias = 'com_knowres.review';
	/** @var mixed Batch copy/move command. If set to false, the batch copy/move command is not supported. */
	protected $batch_copymove = false;
	/**  @var ?string The prefix to use with controller messages. */
	protected $text_prefix = 'COM_KNOWRES_REVIEW';

	/**
	 * Method to get a knowres record.
	 *
	 * @param  null  $pk  The id of the primary key.
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return false|object  Object on success, false on failure.
	 */
	public function getItem($pk = null): false|object
	{
		$item = parent::getItem($pk);
		if ($item)
		{
			$item->contract_tag = '';
			if (isset($item->contract_id) && $item->contract_id > 0)
			{
				$db    = $this->getDatabase();
				$query = $db->getQuery(true);
				$query->select('c.tag, g.firstname, g.surname, p.property_name')
				      ->from($db->qn('#__knowres_contract') . 'c')
				      ->from($db->qn('#__knowres_property') . 'p')
				      ->from($db->qn('#__knowres_guest') . 'g')
				      ->where($db->qn('c.property_id') . '=' . $db->qn('p.id'))
				      ->where($db->qn('c.guest_id') . '=' . $db->qn('g.id'))
				      ->where($db->qn('c.id') . '=' . (int) $item->contract_id)
				      ->setLimit(1);
				$db->setQuery($query);
				$result = $db->loadObject();

				$item->contract_tag  = $result->tag ?? $item->contract_id;
				$item->contract_name = isset($result->firstname) ? $result->firstname . ' ' . $result->surname : '';
				$item->property_name = $result->property_name ?? '';
			}
		}

		return $item;
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
		$data = KrMethods::getUserState('com_knowres.edit.review.data', []);
		if (empty($data))
		{
			$data = $this->getItem();
		}

		return $data;
	}

	/**
	 * Prepare and sanitise the table prior to saving.
	 *
	 * @param $table
	 *
	 * @throws RuntimeException
	 * @throws Exception
	 * @since  2.4.0
	 */
	protected function prepareTable($table)
	{
		if (!$table->review_date)
		{
			$table->review_date = TickTock::getDate();
		}

		$params = KrMethods::getParams();
		if ($params->get('review_ratings'))
		{
			// Set the overall review rating
			$all_ratings   = [];
			$all_ratings[] = (int) $table->rating1;
			$all_ratings[] = (int) $table->rating2;
			$all_ratings[] = (int) $table->rating3;
			$all_ratings[] = (int) $table->rating4;
			$all_ratings[] = (int) $table->rating5;
			$all_ratings[] = (int) $table->rating6;

			$entered = 0;
			$rating  = 0;
			foreach ($all_ratings as $r)
			{
				if ($r)
				{
					$entered++;
					$rating += $r;
				}
			}

			$rating = round($rating / $entered, 2);
			$rating = ceil($rating * 4);
			$rating = round($rating / 4, 2);

			$table->rating = $rating;
		}

		parent::prepareTable($table);
	}
}