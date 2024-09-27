<?php
/**
 * @package     Know Reservations
 * @subpackage  Site Controller
 * @copyright   2021 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */
/** @noinspection PhpPossiblePolymorphicInvocationInspection */
/** @noinspection PhpUnhandledExceptionInspection */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Media;
use Joomla\CMS\Factory;

$this->client_id    = '';
$this->currency     = '';
$this->paypal_found = false;
$this->image        = Media\Images::getPropertyImageName($this->property->id);
$this->checked      = 'checked';

$wa = Factory::getApplication()->getDocument()->getWebAssetManager();
$wa->useScript('com_knowres.site')
   ->useScript('form.validate')
   ->useScript('keepalive');
?>

<div class="grid-x grid-margin-x">
	<div class="small-12 cell">
		<?php if ($this->contractData->booking_type == 2) : ?>
			<h1>
				<?php echo KrMethods::plain('COM_KNOWRES_MAKE_A_PAYMENT'); ?>
			</h1>
			<?php $this->when = KrMethods::plain('COM_KNOWRES_CONFIRM_BOOK_WHEN'); ?>
		<?php else: ?>
			<h1>
				<?php echo KrMethods::plain('COM_KNOWRES_CONFIRM_REQUEST_PAY_TITLE'); ?>
			</h1>
			<?php $this->when = KrMethods::plain('COM_KNOWRES_CONFIRM_REQUEST_WHEN'); ?>
		<?php endif; ?>
	</div>
</div>

<div class="grid-x grid-margin-x" id="kr-payment">
	<div class="small-12 medium-7 large-8 cell">
		<?php echo $this->loadTemplate('form'); ?>
	</div>
	<div class="small-12 medium-5 large-4 cell">
		<?php echo $this->loadTemplate('sidebar'); ?>
	</div>
</div>

<?php echo $this->loadTemplate('modals'); ?>

<?php if ($this->paypal_found): ?>
	<script src="https://www.paypal.com/sdk/js?client-id=<?php echo $this->client_id; ?>&currency=<?php echo $this->currency; ?>"
		data-order-id="<?php echo $this->contractData->tag; ?>"></script>
<?php endif; ?>