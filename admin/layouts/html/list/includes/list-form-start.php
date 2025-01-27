<?php
/**
 * @package     KR
 * @subpackage  <Enter sub package>
 * @copyright   Copyright (C) 2021 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

use HighlandVision\KR\Framework\KrMethods;
use Joomla\CMS\Layout\LayoutHelper;
?>

<form action="<?php echo KrMethods::route('index.php?option=com_knowres&view=' . $this->name); ?>" id="adminForm"
      method="post" name="adminForm">
	<div class="row">
		<div class="col-md-12">
			<div id="j-main-container" class="j-main-container">
				<?php echo LayoutHelper::render('joomla.searchtools.default', ['view' => $this]); ?>
				<?php if (empty($this->items)): ?>
					<?php echo KrMethods::render('html.list.noitems'); ?>
					<?php return; ?>
				<?php endif; ?>

				<!--			</div>-->
				<!--		</div>-->
				<!--	</div>-->
				<!--</form>-->