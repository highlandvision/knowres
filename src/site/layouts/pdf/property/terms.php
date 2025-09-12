<?php
/**
 * @package    Know Reservations
 * @subpackage Site View
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

extract($displayData);
/**
 * Layout variables
 *
 * @var string $heading Terms heading.
 * @var string $text    Terms text.
 * @var string $intro   Terns intro.
 */
?>

<h1><?php echo $heading; ?></h1>
<div><?php echo $text; ?></div>
<div><?php echo $intro; ?></div>