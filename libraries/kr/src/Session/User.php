<?php
/**
 * @package    Know Reservations
 * @subpackage Library
 * @copyright  Copyright (c) 2020, Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR\Session;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Session;
use JetBrains\PhpStorm\Pure;
use stdClass;

use function defined;
use function is_null;
use function property_exists;

/**
 * Knowres Session helper
 *
 * @since 3.3.0
 */
class User extends Session
{
	/**
	 * Initialise
	 *
	 * @throws Exception
	 * @since  3.3.0
	 */
	public function __construct()
	{
		parent::__construct('user');
	}

	/**
	 * Get user access level
	 *
	 * @since   3.3.0
	 * @return int
	 */
	public function getAccessLevel(): int
	{
		$data = $this->getData();

		return $data->access_level;
	}

	/**
	 * Request session data
	 *
	 * @since  3.3.0
	 * @return stdClass
	 */
	public function getData(): stdClass
	{
		$data = $this->getSession();
		if (is_null($data)) {
			$data = $this->init();
		}

		return $data;
	}

	/**
	 * Set user properties
	 *
	 * @since  3.3.0
	 * @return string
	 */
	public function getUserProperties(): string
	{
		$data = $this->getData();

		$properties = '';
		if (isset($data->access_level) && $data->access_level >= 10 && $data->access_level <= 20) {
			$properties = $data->properties;
		}

		return $properties;
	}

	/**
	 * Session reset current property fields for user
	 *
	 * @since  3.3.0
	 */
	public function resetCurrentProperty(): void
	{
		$data = $this->getSession();
		if (is_null($data)) {
			$data = $this->init();
		}
		else {
			$data->cr_property_id   = 0;
			$data->cr_property_name = '';
			$data->cr_country_id    = 0;
			$data->cr_region_id     = 0;
			$data->cr_town_id       = 0;
		}

		$this->saveSession($data);
	}

	/**
	 * Reset data and session
	 *
	 * @since  3.3.0
	 * @return stdClass
	 */
	public function resetData(): stdClass
	{
		$data = $this->init();
		$this->saveSession($data);

		return $data;
	}

	/**
	 * Set user session data after admin login
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	public function setLogin(): void
	{
		$data = $this->getData();
		if (!isset($data->access_level) || $data->access_level == 0) {
			$user = KrMethods::getUser();
			if ($user->id) {
				$item = KrFactory::getAdminModel('manager')->getManagerbyUserId($user->id);
				if ($item) {
					$data->access_level = $item->access_level;
					$data->agency_id    = $item->agency_id;
					$data->manager_id   = $item->id;

					if ($item->properties) {
						$tmp              = Utility::decodeJson($item->properties, true);
						$data->properties = implode(',', $tmp);
					}
					else {
						$data->properties = '';
					}

					// If owner access and no properties and property add is allowed then redirect to property add page
					if ($item->access_level == 10 && !count(Utility::decodeJson($item->properties, true))) {
						$params = KrMethods::getParams();
						if ($params->get('property_add', 0)) {
							KrMethods::message(KrMethods::plain('Please start entering your property details below'));
							KrMethods::redirect(KrMethods::route('index.php?option=com_knowres&view=property&layout=edit&id=0',
							                                     false));
						}
						else {
							KrMethods::message(KrMethods::plain('You are not authorised to access this system. Please contact your system administrator.'),
							                   'error');
							KrMethods::redirect(KrMethods::route('index.php', false));
						}

						return;
					}
				}
			}
			else {
				KrMethods::message(KrMethods::plain('You are not authorised to access the requested page. Please contact your system administrator.'),
				                   'error');
				KrMethods::redirect(KrMethods::route('index.php'));
			}
		}
		else {
			$data->access_level = 1;
			$data->properties   = '';
			$data->agency_id    = 0;
			$data->manager_id   = 0;
		}

		$this->setData($data);
	}

	/**
	 * Update session data from array (db item or jform)
	 *
	 * @param  array|object  $item  Update data
	 *
	 * @since  3.2.0
	 * @return stdClass
	 */
	public function updateData(array|object $item): stdClass
	{
		$data = $this->getData();
		foreach ($item as $key => $value) {
			if (property_exists($data, $key)) {
				$data->$key = $value;
			}
		}

		$this->saveSession($data);

		return $data;
	}

	/**
	 * Initialise user session
	 *
	 * @since  1.0.0
	 * @return stdClass
	 */
	#[Pure] protected function init(): stdClass
	{
		$data                   = new stdClass();
		$data->access_level     = 0;
		$data->agency_id        = 0;
		$data->currency         = '';
		$data->manager_id       = 0;
		$data->properties       = '';
		$data->cr_property_id   = 0;
		$data->cr_property_name = '';
		$data->cr_country_id    = 0;
		$data->cr_region_id     = 0;
		$data->cr_town_id       = 0;
		$data->pr_contract_id   = 0;
		$data->pr_guest_id      = 0;
		$data->pr_property_id   = 0;
		$data->db_contract_id   = 0;
		$data->db_contracts     = [];
		$data->db_guest_id      = 0;
		$data->db_guest_update  = false;
		$data->user_id          = 0;

		return $data;
	}
}