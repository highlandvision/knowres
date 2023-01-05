<?php
/**
 * @package    Know Reservations
 * @subpackage Site module
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
use Joomla\CMS\HTML\HTMLHelper;
?>

<form action="<?php echo KrMethods::route('index.php?option=com_knowres&task=service.mailchimpsubscribe'); ?>"
      class="mailchimp ajaxform" id="kr-form-mailchimp" method="post">

	<div class="row">
		<div class="signup small-10 small-offset-1 text-center medium-offset-0 medium-12 medium-text-left large-3 large-text-right columns">
			<h3>
				<b><?php echo KrMethods::plain('MOD_KNOWRES_MAILCHIMP_SIGNUP'); ?></b>
				<span>
					<?php echo KrMethods::plain('MOD_KNOWRES_MAILCHIMP_SIGNUP2'); ?>
				</span>
			</h3>
		</div>
		<div
			class="small-10 small-offset-1 text-center medium-offset-0 medium-4 medium-text-left large-3 columns">
			<?php echo $form->getInput('name'); ?>
		</div>
		<div
			class="small-10 small-offset-1 text-center medium-offset-0 medium-4 medium-text-left large-3 columns ">
			<?php echo $form->getInput('email'); ?>
		</div>
		<div
			class="small-10 small-offset-1 text-center medium-offset-0 medium-4 medium-text-left large-2 end columns">
			<button class="button expanded no-margin-bottom" type="submit">
				<?php echo KrMethods::plain('MOD_KNOWRES_MAILCHIMP_SIGNUP'); ?>
			</button>
		</div>
	</div>
	<div class="row">
		<div class="red small-10 small-offset-1 medium-9 medium-offset-3 large-8 large-offset-4 columns">
			<span id="response2"></span>
		</div>
	</div>

	<input type="hidden" name="id" value="<?php echo $params->get('id', 0); ?>">
	<?php echo HTMLHelper::_('form.token'); ?>
</form>