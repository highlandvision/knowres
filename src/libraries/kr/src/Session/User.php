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
use HighlandVision\KR\Utility;
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
		if (is_array($data)) {
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
		} else {
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
		// Text used for errors as language file not accessible at this stage
		$m1 = 'Please enter your property details below';
		$m2 = 'You are not authorised to access this system. Please contact your system administrator';
		$m3 = 'You are not authorised to access the requested page. Please contact your system administrator';

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
					} else {
						$data->properties = '';
					}

					if ($item->access_level == 10 && !count(Utility::decodeJson($item->properties, true))) {
						if (KrMethods::getParams()->get('property_add', 0)) {
							// Allowed to add a property so redirect to property add
							KrMethods::message(KrMethods::plain($m1));
							KrMethods::redirect(KrMethods::route('index.php?option=com_knowres&view=property&layout=edit&id=0',
								false));
						} else {
							// Not allowed to add so refer to system admin
							KrMethods::logoutUser($user->id);
							KrMethods::message(KrMethods::plain($m2), 'error');
							KrMethods::redirect(KrMethods::route('index.php', false));
						}

						return;
					}
				}
			} else {
				KrMethods::logoutUser($user->id);
				KrMethods::message(KrMethods::plain($m3), 'error');
				KrMethods::redirect(KrMethods::route('index.php'));
			}
		} else {
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
		$data->pr_payment_type  = '';
		$data->pr_property_id   = 0;
		$data->db_contract_id   = 0;
		$data->db_contracts     = [];
		$data->db_guest_id      = 0;
		$data->db_guest_update  = false;
		$data->user_id          = 0;

		return $data;
	}
}