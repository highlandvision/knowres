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

<div class="grid-x grid-margin-x">
	<div class="small-12 cell">
		<address>
			<strong><?php echo $this->guest->firstname . ' ' . $this->guest->surname; ?></strong>
			<br>
			<?php echo Utility::formatAddress($this->guest->address1, $this->guest->address2,
				$this->guest->postcode, $this->guest->town, $this->guest->region_name, $this->guest->country_name,
				'<br>'); ?>
		</address>
	</div>
</div>
<div class="grid-x grid-margin-x">
	<div class="small-12 cell" style="line-height:150%;margin-top:10px;">
		<address>
			<?php if ($this->guest->mobile) : ?>
				<i class='fa-solid fa-lg fa-mobile-alt'></i>
				<?php echo Utility::formatPhoneNumber($this->guest->mobile, $this->guest->mobile_country_id); ?>
			<?php endif; ?>
		</address>
	</div>
</div>