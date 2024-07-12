<?php
/**
 * @package     KR
 * @subpackage  Admin Layouts
 * @copyright   Copyright (C) 2021 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

/** @noinspection PhpUnhandledExceptionInspection */

use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Utility;

extract($displayData);
/**
 * Layout variables
 *
 * @var false|object $contract    The contract item.
 * @var false|object $guest       The contract guest.
 * @var bool         $document_id True to display document ID.
 */
?>

<div class="row">
	<div class="col-lg-6">
		<div class="fw500"><?php echo $guest->firstname . ' ' . $guest->surname; ?></div>
		<address>
			<?php echo Utility::formatAddress($guest->address1, $guest->address2, $guest->postcode, $guest->town,
				$guest->region_name, $guest->country_name, '<br>'); ?>
		</address>

		<div class="fw500"><?php echo KrMethods::plain('COM_KNOWRES_BILLING_ADDRESS'); ?></div>
		<address>
			<?php echo Utility::formatAddress($guest->b_address1, $guest->b_address2, $guest->b_postcode,
				$guest->b_town, $guest->b_region_name, $guest->b_country_name, '<br>'); ?>
		</address>

		<?php if ($document_id && !empty($guest->document_id) && !empty($guest->document_type)): ?>
			<div class="fw500">
				<?php echo KrFactory::getAdminModel('contractguestdata')::getDocumentType($guest->document_type); ?>
			</div>
			<?php echo $guest->document_id; ?>
		<?php endif; ?>
	</div>

	<div class="col-lg-6">
		<address>
			<?php if ($guest->email) : ?>
				<i class='fa-solid fa-envelope'></i>
				<a href="mailto:<?php echo $guest->email; ?>">
					<?php echo $guest->email; ?>
				</a><br>
			<?php endif; ?>
			<?php if ($guest->email_2) : ?>
				<i class='fa-solid fa-envelope'></i>
				<a href="mailto:<?php echo $guest->email_2; ?>">
					<?php echo $guest->email_2; ?>
				</a><br>
			<?php endif; ?>
			<?php if ($guest->email_3) : ?>
				<i class='fa-solid fa-envelope'></i>
				<a href="mailto:<?php echo $guest->email_3; ?>">
					<?php echo $guest->email_3; ?>
				</a><br>
			<?php endif; ?>
			<br>
			<?php if ($guest->mobile) : ?>
				<?php $mobile = Utility::formatPhoneNumber($guest->mobile, $guest->mobile_country_id); ?>
				<i class='fa-solid fa-lg fa-mobile-alt'></i>
				<a href="tel:<?php echo $mobile; ?>">
					<?php echo $mobile; ?><br>
				</a>
			<?php endif; ?>
			<?php if (is_countable($guest->telephone)) : ?>
				<?php foreach ($guest->telephone as $t): ?>
					<?php if (!empty($t->number)): ?>
						<?php if (!$t->type): ?>
							<?php $t->type = 1; ?>
						<?php endif; ?>
						<?php echo KrMethods::plain('COM_KNOWRES_GUEST_PHONE_TYPE' . $t->type); ?>
						<?php echo Utility::formatPhoneNumber($t->number, $t->country); ?>
						<br>
					<?php endif; ?>
				<?php endforeach; ?>
			<?php endif; ?>
		</address>
		<br><br>

		<b>
			<?php echo KrMethods::sprintf('COM_KNOWRES_CONTRACT_GUEST_NUMBERS', $contract->guests); ?>
		</b><br>
		<?php if ($contract->adults == 1): ?>
			<?php echo KrMethods::sprintf('COM_KNOWRES_CONTRACT_ADULTS_1', $contract->adults); ?>
		<?php elseif ($contract->adults > 1): ?>
			<?php echo KrMethods::sprintf('COM_KNOWRES_CONTRACT_ADULTS', $contract->adults); ?>
		<?php endif; ?>
		<br>

		<?php if ($contract->children == 1): ?>
			<?php echo KrMethods::sprintf('COM_KNOWRES_CONTRACT_CHILD', $contract->child_ages[0]); ?>
		<?php elseif ($contract->children > 1): ?>
			<?php echo KrMethods::sprintf('COM_KNOWRES_CONTRACT_CHILDREN', $contract->children,
				Utility::displayAges($contract->child_ages)); ?>
		<?php endif; ?>
		<br>
	</div>
</div>