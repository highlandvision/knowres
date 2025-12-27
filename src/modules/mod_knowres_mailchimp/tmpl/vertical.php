<?php
/**
 * @package    Know Reservations
 * @subpackage Site module
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use Joomla\CMS\Factory;
use Joomla\CMS\HTML\HTMLHelper;

// phpcs:disable PSR1.Files.SideEffects
defined('_JEXEC') or die;
// phpcs:enable PSR1.Files.SideEffects

/** @noinspection PhpUnhandledExceptionInspection */
/** @noinspection PhpPossiblePolymorphicInvocationInspection */
$wa = Factory::getApplication()->getDocument()->getWebAssetManager();
$wa->getRegistry()->addExtensionRegistryFile('com_knowres');
$wa->useScript('com_knowres.site')
   ->useScript('com_knowres.site-modules')
   ->useScript('form.validate');

$form = KrFactory::getAdhocForm('mod_knowres_mailchimp', 'mailchimp.xml', 'module', null);
?>

<form action="<?php echo KrMethods::route('index.php?option=com_knowres&task=service.mailchimpsubscribe'); ?>"
      class="mailchimp ajaxform" id="kr-form-mailchimp" method="post">
    <div class="grid-x grid-margin-x">
        <div class="small-12 cell">
            <?php echo $form->getInput('name'); ?>
        </div>
        <div class="small-12 cell">
            <?php echo $form->getInput('email'); ?>
        </div>
        <div class="small-12 cell">
            <button class="button expanded accent" type="submit">
                <?php echo KrMethods::plain('MOD_KNOWRES_MAILCHIMP_SIGNUP'); ?>
            </button>
        </div>
    </div>
    <div class="grid-x grid-margin-x">
        <div class="red small-12 cell">
            <span id="response2"></span>
        </div>

        <input type="hidden" name="id" value="<?php echo $params->get('id', 0); ?>">
        <?php echo HTMLHelper::_('form.token'); ?>
    </div>
</form>