<?php
/**
 * @package    Know Reservations
 * @subpackage Site module
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */
/** @noinspection PhpUnhandledExceptionInspection */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;

$height = $params->get('height') . 'px';
?>

<?php foreach ($data as $d): ?>
	<?php $options = ['src'         => $d['image'],
	                  'alt'         => $d['alt'],
	                  'description' => $d['description'],
	                  'height'       => $height,
	                  'min_height'   => $height
	]; ?>
	<?php echo KrMethods::render('joomla.html.image', $options); ?>
	<?php break; ?>
<?php endforeach; ?>