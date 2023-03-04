<?php
/**
 * @package         Joomla.Administrator
 * @subpackage      mod_user
 * @copyright   (C) 2019 Open Source Matters, Inc. <https://www.joomla.org>
 * @license         GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;

$title = 'KR';
$icon  = 'fas fa-link';
?>

<div class="header-item-content dropdown header-profile">
	<button class="btn-secondary dropdown-toggle kr d-flex align-items-center ps-0 py-0" data-bs-toggle="dropdown"
	        type="button" title="<?php echo KrMethods::plain($title); ?>">
		<span class="header-item-icon">
			<span class="<?php echo $icon; ?>" aria-hidden="true"></span>
		</span>
		<span class="header-item-text">
			<?php echo KrMethods::plain($title); ?>
		</span>
		<span class="icon-angle-down" aria-hidden="true"></span>
	</button>

	<div class="dropdown-menu dropdown-menu-end">
		<?php foreach ($menu as $m): ?>
			<a class="dropdown-item" href="<?php echo KrMethods::route('index.php?option=com_knowres&' . $m[1]); ?>">
				<i class="<?php echo $m[3]; ?>"></i>&nbsp;<?php echo KrMethods::plain($m[0]); ?>
			</a>
		<?php endforeach; ?>
	</div>
</div>
