<?php
/**
 * @package    Know Reservations
 * @subpackage Site Controllers
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Site\Controller;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\FormController;
use Joomla\CMS\MVC\Model\BaseDatabaseModel;
use Joomla\DI\Exception\KeyNotFoundException;
use RuntimeException;
use stdClass;

// phpcs:disable PSR1.Files.SideEffects
defined('_JEXEC') or die;
// phpcs:enable PSR1.Files.SideEffects

/**
 * Review form controller class
 *
 * @since 1.0.0
 */
class ReviewController extends FormController
{
	/**
	 * Method to save a record.
	 *
	 * @param   string  $key     The name of the primary key of the URL variable.
	 * @param   string  $urlVar  The name of the URL variable if different from the primary key. Sometimes required
	 *                           to avoid router collisions.
	 *
	 * @throws  Exception
	 * @since   4.0.0
	 */
	public function save($key = null, $urlVar = null): bool
	{
		$this->checkToken();

		if (parent::save($key, $urlVar))
		{
			KrMethods::message('');
			$params = KrMethods::getParams();
			KrMethods::redirect(KrMethods::route('index.php?Itemid=' . (int) $params->get('link_review_thanks'),
				false
			)
			);

			return true;
		}

		return false;
	}

	/**
	 * Method to check if you can save a new or existing record.
	 * Override - All edit checks have been done so just return true
	 *
	 * @param   array   $data  An array of input data.
	 * @param   string  $key   The name of the key for the primary key.
	 *
	 * @return  bool
	 * @since   1.0.0
	 */
	protected function allowSave($data, $key = 'id'): bool
	{
		return true;
	}

	/**
	 * Process additional requirements after save review
	 *
	 * @param   BaseDatabaseModel  $model      The data model object.
	 * @param   array              $validData  The validated data.
	 *
	 * @return  void
	 * @throws RuntimeException
	 * @throws KeyNotFoundException
	 * @since   1.0.0
	 */
	protected function postSaveHook(BaseDatabaseModel $model, $validData = []): void
	{
		if (isset($validData['contract_id']) && $validData['contract_id'])
		{
			$data           = new stdClass();
			$data->id       = $validData['contract_id'];
			$data->reviewed = 1;
			KrFactory::update('contract', $data);
		}
	}
}