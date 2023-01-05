<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */
/** @noinspection PhpUnhandledExceptionInspection */
defined('_JEXEC') or die;

use HighlandVision\KR\Utility;
?>

<div class="row">
	<div class="small-12 columns">
		<address>
			<strong><?php echo $this->guest->firstname . ' ' . $this->guest->surname; ?></strong>
			<br>
			<?php echo Utility::formatAddress($this->guest->address1, $this->guest->address2,
				$this->guest->postcode, $this->guest->town, $this->guest->region_name, $this->guest->country_name,
				'<br>'); ?>
		</address>
	</div>
</div>
<div class="row">
	<div class="small-12 columns" style="line-height:150%;">
		<address>
			<?php if ($this->guest->mobile) : ?>
				<i class="fas fa-lg fa-mobile-alt"></i>
				<?php echo Utility::formatPhoneNumber($this->guest->mobile, $this->guest->mobile_country_id); ?>
			<?php endif; ?>
		</address>
	</div>
</div>