<?php
/**
 * @package    Know Reservations
 * @subpackage Admin Models
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\Model;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\AdminModel;
use InvalidArgumentException;
use Joomla\DI\Exception\KeyNotFoundException;
use RuntimeException;

use function count;
use function implode;
use function is_countable;

/**
 * Service log model.
 *
 * @since 1.0.0
 */
class ServicelogModel extends AdminModel
{
	/**  @var string The type alias. */
	public $typeAlias = 'com_knowres.servicelog';
	/** @var mixed Batch copy/move command. If set to false, the batch copy/move command is not supported. */
	protected $batch_copymove = false;
	/**  @var ?string The prefix to use with controller messages. */
	protected $text_prefix = 'COM_KNOWRES_SERVICELOG';

	/**
	 * Delete old service logs
	 *
	 * @param  string  $date     Delete before this date
	 * @param  int     $success  Success status to delete
	 *
	 * @throws RuntimeException
	 * @throws KeyNotFoundException|InvalidArgumentException
	 * @since  3.3.0
	 */
	public static function deleteOldLogs(string $date, int $success = 1)
	{
		$db    = KrFactory::getDatabase();
		$query = $db->getQuery(true);

		$conditions = [
			$db->qn('success') . '=' . $success,
			$db->qn('created_at') . '<' . $db->q($date)
		];

		$query->delete($db->qn('#__knowres_service_log'))
		      ->where($conditions);

		$db->setQuery($query);
		$db->execute();
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
		$data = KrMethods::getUserState('com_knowres.edit.season.data', []);
		if (empty($data))
		{
			$data = $this->getItem();
		}

		return $data;
	}

	/**
	 * Resend queue records for selected logs
	 *
	 * @param  array  $pks  IDs to be resent
	 *
	 * @throws RuntimeException
	 * @since  1.2.0
	 */
	public function resend(array $pks)
	{
		if (!is_countable($pks) || !count($pks))
		{
			return;
		}

		$db = KrFactory::getDatabase();

		$fields     = [$db->qn('q.actioned') . '=0'];
		$conditions = [$db->qn('l.id') . '=' . implode(' OR ' . $db->qn('l.id') . '=', $pks),
		               $db->qn('q.actioned') . '=1',
		               $db->qn('l.queue_id') . '>0'];

		$query = $db->getQuery(true);
		$query->join('INNER',
			$db->qn('#__knowres_service_log', 'l') . ' ON (' . $db->qn('q.id') . '=' . $db->qn('l.queue_id') . ')');

		$query->update($db->qn('#__knowres_service_queue', 'q'))
		      ->set($fields)
		      ->where($conditions);

		$db->setQuery($query);
		$db->execute();
	}
}