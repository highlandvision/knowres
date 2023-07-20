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
use HighlandVision\Component\Knowres\Administrator\Model\PropertyroomModel;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Joomla\Extend\FormController;
use HighlandVision\KR\Translations;
use Joomla\CMS\MVC\Model\BaseDatabaseModel;
use Joomla\String\StringHelper;

/**
 * Property room controller form class.
 *
 * @since 2.0.0
 */
class PropertyroomController extends FormController
{
	/**
	 * Method to save a record
	 * Override to update json field so that updated values get stored in input and as such user state for redisplay
	 * Can't seem to do this anywhere else as the save() reads the data from input again and no way to override
	 *
	 * @param   string  $key     The name of the primary key of the URL variable.
	 * @param   string  $urlVar  The name of the URL variable if different from the primary key (sometimes required to avoid router collisions).
	 *
	 * @throws Exception
	 * @since   2.5.0
	 */
	public function save($key = null, $urlVar = null): void
	{
		$massaged = $this->input->post->get('jform', [], 'array');

		$generic = (string) $massaged['generic'];
		$name    = $generic . "feature";
		$id      = $this->input->post->get($name, [], 'array');
		$name    = $generic . "count";
		$count   = $this->input->post->get($name, [], 'array');

		$features = [];
		for ($i = 0; $i < count($id); $i++)
		{
			if ((int) $count[$i])
			{
				$features[] = array(
					'id'      => (string) $id[$i],
					'count'   => (string) $count[$i],
					'generic' => $generic
				);
			}
		}

		$massaged['features'] = $features;
		$this->input->post->set('jform', $massaged);

		parent::save($key, $urlVar);
	}

	/**
	 * Process additional requirements after save payment
	 *
	 * @param   BaseDatabaseModel  $model      The data model object.
	 * @param   array              $validData  The validated data.
	 *
	 * @throws Exception
	 * @since  3.1
	 */
	protected function postSaveHook(BaseDatabaseModel $model, $validData = []): void
	{
		/** @var PropertyroomModel $model */
		$id          = $model->getItem()->get('id');
		$name        = (string) $validData['name'];
		$description = (string) $validData['description'];

		if ($this->input->get('task') == 'save2copy')
		{
			$name = StringHelper::increment($name);
		}

		$translation = new Translations();
		$translation->updateDefault('propertyroom', $id, 'name', $name);
		$translation->updateDefault('propertyroom', $id, 'description', $description);

		KrFactory::getAdminModel('servicequeue')::serviceQueueUpdate('updateProperty', (int) $validData['property_id'], 0, 'ru');
	}
}