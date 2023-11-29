<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\View\Translation;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\Component\Knowres\Administrator\Model\TranslationModel;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\HtmlView as KrHtmlView;
use HighlandVision\KR\Translations;
use Joomla\CMS\Toolbar\ToolbarHelper;

use function defined;
use function strtolower;

/**
 * Edit a translation
 *
 * @since 1.0.0
 */
class HtmlView extends KrHtmlView
{
	/** @var string Form field class. */
	public string $class = '';
	/** @var string Form field filter. */
	public string $filter = '';
	/** @var string Form field label. */
	public string $label = '';
	/** @var string Form field type. */
	public string $type = '';

	/**
	 * Display the view
	 *
	 * @param   null  $tpl
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return void
	 */
	public function display($tpl = null): void
	{
		/** @var TranslationModel $model */
		$model       = $this->getModel();
		$this->form  = $model->getForm();
		$this->item  = $model->getItem();
		$this->state = $model->getState();

		if ($this->item->item === 'property')
		{
			$field        = KrFactory::getAdminModel('propertyfield')->getItem(substr($this->item->field, 1));
			$Translations = new Translations();
			$this->label  = $Translations->getText('propertyfield', $field->id, 'label');

			if ($field->format == 1)
			{
				$this->type   = 'text';
				$this->filter = 'string';
				$this->class  = 'input-xxlarge';
			}
			else if ($field->format == 2)
			{
				$this->type   = 'textarea';
				$this->filter = 'string';
				$this->class  = 'span8';
			}
			else if ($field->format == 3)
			{
				$this->type   = 'editor';
				$this->filter = 'safehtml';
				$this->class  = 'span6';
			}
		}

		$this->checkVersions();
		$this->checkErrors();

		$this->form_name = KrMethods::plain('COM_KNOWRES_TRANSLATION_TITLE');
		$this->getFormAriaLabel();
		ToolbarHelper::title($this->form_name, 'fa-solid fa-globe knowres');
		$this->addFormToolbar(strtolower($this->getName()));

		parent::display($tpl);
	}
}