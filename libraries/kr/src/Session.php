<?php
/**
 * @package    Know Reservations
 * @subpackage Library
 * @copyright  Copyright (c) 2020, Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrMethods;
use Joomla\Session\SessionInterface;
use stdClass;

use function property_exists;

/**
 * Knowres Session helper
 *
 * @since 3.3.0
 */
class Session
{
	/** @var SessionInterface Session data as per Type. */
	protected SessionInterface $session;
	/**  @var string Session type */
	protected string $type = '';
	/** @var string Name space for session. */
	protected string $session_name = 'comknowres';

	/**
	 * Initialise
	 *
	 * @param  string  $type  Session type
	 *
	 * @throws Exception
	 * @since 1.0.0
	 */
	public function __construct(string $type)
	{
		$this->type    = $type;
		$this->session = KrMethods::getSession();
	}

	/**
	 * Get the stored session data
	 *
	 * @param  stdClass  $data  Data to be saved
	 *
	 * @since 1.0.0
	 */
	public function setData(stdClass $data): void
	{
		$this->saveSession($data);
	}

	/**
	 * Get the stored session data
	 *
	 * @since  1.0.0
	 * @return mixed
	 */
	protected function getSession(): mixed
	{
		return $this->session->get($this->type, null, $this->session_name);
	}

	/**
	 * Set the updated session data
	 *
	 * @param  stdClass  $data  Session data to store
	 *
	 * @since 1.0.0
	 */
	protected function saveSession(stdClass $data): void
	{
		$this->session->set($this->type, $data, $this->session_name);
	}
}