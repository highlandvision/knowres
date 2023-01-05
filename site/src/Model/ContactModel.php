<?php
/**
 * @package    Know Reservations
 * @subpackage Site
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Site\Model;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\AdminModel;
use Joomla\CMS\Form\Form;

/**
 * Contact model
 *
 * @since 1.0.0
 */
class ContactModel extends AdminModel
{
	/**
	 * Method to get the contact form. The base form is loaded from XML
	 *
	 * @param   array    $data      An optional array of data for the form to interogate.
	 * @param   boolean  $loadData  True if the form is to load its own data (default case), false if not.
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return Form|false    A Form object on success, false on failure
	 */
	public function getForm($data = [], $loadData = true, ?string $source = null): Form|false
	{
		$form = $this->loadForm('com_knowres.contact', 'contact', ['control' => 'jform', 'load_data' => $loadData]);
		if (empty($form))
		{
			return false;
		}

		return $form;
	}

	/**
	 * Method to get the data that should be injected in the form.
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return mixed    The data for the form
	 */
	protected function loadFormData(): mixed
	{
		return KrMethods::getUserState('com_knowres.contact.data', []);
	}
}