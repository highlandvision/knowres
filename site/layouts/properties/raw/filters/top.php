<?php
/**
 * @package    Know Reservations
 * @subpackage Site View
 * @copyright  2018 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

extract($displayData);
/**
 * Layout variables
 *
 * @var string $action Filter field.
 * @var array  $data   Filter data [0 => Filter value, 2 => Selected, 3 => Display value].
 */
?>

<?php if ($data[2]): ?>
	<span class="badge checkover getResponseSearch" data-action="<?php echo $action; ?>"
	      data-action-value="<?php echo $data[0]; ?>">
		<?php echo $data[3]; ?>
		<span>
			<i class="close far fa-times-circle"></i>
		</span>
	</span>
<?php endif; ?>