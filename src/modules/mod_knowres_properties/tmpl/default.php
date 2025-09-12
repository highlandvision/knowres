<?php
/**
 * @package    Know Reservations
 * @subpackage Site module
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

use HighlandVision\KR\Framework\KrMethods;

defined('_JEXEC') or die;

$action = KrMethods::route('index.php?option=com_knowres&task=property.search');
?>

<form action="<?php echo $action; ?>" method="post" id="kr-goto-property" name="goto-property">
	<?php echo $options; ?>
</form>