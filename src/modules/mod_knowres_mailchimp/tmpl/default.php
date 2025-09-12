<?php
/**
 * @package    Know Reservations
 * @subpackage Site module
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use Joomla\CMS\Factory;
use Joomla\CMS\HTML\HTMLHelper;

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
	<div class="grid-container">
		<div class="grid-x grid-margin-x kr-flex-center-small">
			<div class="signup small-10 small-offset-1 medium-offset-0 medium-12 large-3 large-text-right cell">
				<h3>
					<b><?php echo KrMethods::plain('MOD_KNOWRES_MAILCHIMP_SIGNUP'); ?></b>
					<span><?php echo KrMethods::plain('MOD_KNOWRES_MAILCHIMP_SIGNUP2'); ?></span>
				</h3>
			</div>
			<div class="small-10 small-offset-1 medium-offset-0 medium-4 large-3 cell">
				<?php echo $form->getInput('name'); ?>
			</div>
			<div class="small-10 small-offset-1 medium-offset-0 medium-4 large-3 cell">
				<?php echo $form->getInput('email'); ?>
			</div>
			<div class="small-10 small-offset-1 medium-offset-0 medium-4 large-3 cell">
				<button class="button expanded" type="submit">
					<?php echo KrMethods::plain('MOD_KNOWRES_MAILCHIMP_SIGNUP'); ?>
				</button>
			</div>
		</div>
		<div class="grid-x grid-margin-x">
			<div class="red small-10 small-offset-1 medium-9 medium-offset-3 large-8 large-offset-4 cell">
				<span id="response2"></span>
			</div>

			<input type="hidden" name="id" value="<?php echo $params->get('id', 0); ?>">
			<?php echo HTMLHelper::_('form.token'); ?>
		</div>
	</div>
</form>