<?php
/**
 * @package     Know Reservations (KR)
 * @subpackage  Admin Models
 * @copyright   Copyright (C) 2020 Highland Vision. All rights reserved.
 * @license     See the file LICENSE.txt for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR\Joomla\Extend;

defined('_JEXEC') or die;

use Exception;
use Joomla\CMS\Form\Form;

use function defined;

/**
 * Knowres extension of SessionModel
 *
 * @since 3.7.0
 */
abstract class FormModel extends \Joomla\CMS\MVC\Model\FormModel
{
	/** @var string The prefix to use with controller messages. */
	protected string $text_prefix = 'COM_KNOWRES';

	/**
	 * Constructor.
	 *
	 * @param  array  $config  An optional associative array of configuration settings.
	 *
	 * @throws Exception
	 * @since  1.6
	 */
	public function __construct($config = [])
	{
		parent::__construct($config);
	}

	/**
	 * Abstract method for getting the form from the model.
	 *
	 * @param  array    $data      Data for the form.
	 * @param  boolean  $loadData  True if the form is to load its own data (default case), false if not.
	 *
	 * @since   1.6
	 * @return  Form|false  A Form object on success, false on failure
	 */
	abstract public function getForm($data = [], $loadData = true): Form|false;
}