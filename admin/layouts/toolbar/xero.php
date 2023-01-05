<?php
/**
 * @package    Know Reservations
 * @subpackage Admin Layout
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

extract($displayData);
/** Layout variables
 *
 * @var string $title Button title.
 */
?>

<joomla-toolbar-button>
	<button class="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#xeroModal">
		<span class="fas fa-eye knowres" aria-hidden="true"></span>
		<?php echo $title; ?>
	</button>
</joomla-toolbar-button>