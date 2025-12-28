<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

use HighlandVision\Component\Knowres\Administrator\Model\TranslationModel;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Joomla\Extend\HtmlView as KrHtmlView;
use HighlandVision\KR\Translations;
use JetBrains\PhpStorm\NoReturn;

// phpcs:disable PSR1.Files.SideEffects
defined('_JEXEC') or die;
// phpcs:enable PSR1.Files.SideEffects

/**
 * Edit a translation
 *
 * @since   1.0.0
 */
class TranslateMeView extends KrHtmlView
{
    /**
     * Display the view
     *
     * @param   null  $tpl
     *
     * @return void
     * @throws Exception
     * @since  1.0.0
     */
    #[NoReturn]
    public function display($tpl = null): void
    {
        //TODO-v5.2 Test this when we have orphans prob Bizflats
        $this->setLayout('translateme');

        /** @var TranslationModel $model */
        $model       = $this->getModel();
        $this->form  = $model->getForm();
        $this->item  = $model->getItem();
        $this->state = $model->getState();

        if ($this->item->item == 'property') {
            $field = KrFactory::getAdminModel('propertyfield')->getItem(substr($this->item->field, 1));

            $Translations = new Translations();
            $this->label  = $Translations->getText('propertyfield', $field->id, 'label');

            if ($field->format == 1) {
                $this->type   = 'text';
                $this->filter = 'string';
                $this->class  = 'input-xxlarge';
            } elseif ($field->format == 2) {
                $this->type   = 'textarea';
                $this->filter = 'string';
                $this->class  = 'span8';
            } elseif ($field->format == 3) {
                $this->type   = 'editor';
                $this->filter = 'safehtml';
                $this->class  = 'span6';
            }
        }

        parent::display($tpl);
        jexit();
    }
}