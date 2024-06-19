<?php
/**
 * @package    Know Reservations
 * @subpackage Site module
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

$bgcolor = $params->get('bgcolor');
$height  = $params->get('height') . 'px';
?>

<div style="background:<?php echo $bgcolor; ?>;height:<?php echo $height; ?>">
</div>