<?php
/**
 * @package    Know Reservations
 * @subpackage Admin Controllers
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\Controller;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\Component\Knowres\Administrator\Model\CurrencyModel;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\FormController;
use HighlandVision\KR\Service\Exchange;
use HighlandVision\KR\Translations;
use Joomla\CMS\MVC\Model\BaseDatabaseModel;

/**
 * Currency controller form class.
 *
 * @since 1.0.0
 */
class CurrencyController extends FormController
{
	/**
	 * Method to save a record
	 * Override to update json field so that updated values get stored in input and as such user state for redisplay
	 * Can't seem to do this anywhere else as the save() reads the data from input again and no way to override
	 *
	 * @param   string  $key     The name of the primary key of the URL variable.
	 * @param   string  $urlVar  The name of the URL variable if different from the primary key (sometimes required to avoid router collisions).
	 *
	 * @since  2.5.0
	 */
	public function save($key = null, $urlVar = null): void
	{
		$massaged = $this->input->post->get('jform', [], 'array');
		if (!isset($massaged['allow_payment']))
		{
			$massaged['allow_payment'] = '';
		}

		$this->input->post->set('jform', $massaged);

		parent::save($key, $urlVar);
	}

	/**
	 * Add new exchange rate pair if required
	 *
	 * @param   BaseDatabaseModel  $model      The data model object.
	 * @param   array              $validData  The validated data.
	 *
	 * @throws Exception
	 * @since  3.1
	 * @return void
	 */
	protected function postSaveHook(BaseDatabaseModel $model, $validData = []): void
	{
		/* @var CurrencyModel $model */
		$id           = $model->getItem()->get('id');
		$name         = (string) $validData['name'];
		$Translations = new Translations();
		$Translations->updateDefault('currency', $id, 'name', $name);

		if (isset($validData['allow_payment']) && is_countable($validData['allow_payment']))
		{
			$from = $validData['iso'];
			foreach ($validData['allow_payment'] as $to)
			{
				try
				{
					$Exchange = new Exchange($from, $to);
					$Exchange->update();
				}
				catch (Exception $e)
				{
					KrMethods::message($e->getMessage(), 'error');
					KrMethods::message(KrMethods::sprintf('COM_KNOWRES_CURRENCY_EXCHANGERATE_FAIL', $from, $to),
						'error');
				}
			}
		}
	}
}