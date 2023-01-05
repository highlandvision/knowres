<?php
/**
 * @package    Know Reservations
 * @subpackage Admin Models
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */
/** @noinspection PhpUnhandledExceptionInspection */

namespace HighlandVision\Component\Knowres\Administrator\Field;

defined('_JEXEC') or die;

use Exception;
use Joomla\CMS\Factory;
use Joomla\CMS\Form\Field\TextField;
use Joomla\CMS\WebAsset\WebAssetManager;

/** @var WebAssetManager $wa */
$wa = Factory::getApplication()->getDocument()->getWebAssetManager();
$wa->useStyle('com_knowres.admin-datepicker')
   ->useScript('com_knowres.admin-datepicker');

/**
 * Displays jQuery Ui Datepicker
 *
 * @since 1.0.0
 */
class UicalendarField extends TextField
{
	/**
	 * Get the field options.
	 *
	 * @throws Exception
	 * @since  1.6
	 * @return string The field input markup.
	 */
	protected function getInput(): string
	{
		parent::getInput();

		$this->layout = 'form.field.uicalendar';
		$this->type   = 'Uicalendar';

		return $this->getRenderer($this->layout)->render($this->getLayoutData());
	}

	/**
	 * Method to get the data to be passed to the layout for rendering.
	 *
	 * @since   4.0.0
	 * @return  array
	 */
	protected function getLayoutData(): array
	{
		$data = parent::getLayoutData();

		$this->dataAttributes  = $this->setDataAttributes();
		$data['dataAttribute'] = $this->renderDataAttributes();

		return $data;
	}

	/**
	 * Get the field data attributes.
	 *
	 * @since  4.0.0
	 * @return array    The field input markup.
	 */
	protected function setDataAttributes(): array
	{
		$attributes                    = [];
		$attributes['data-avail']      = $this->getAttribute('avail', '');
		$attributes['data-datepicker'] = $this->getAttribute('datepicker', '');

		return $attributes;
	}
}