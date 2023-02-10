<?php
/**
 * @package     KR
 * @subpackage  <Enter sub package>
 * @copyright   Copyright (C) 2022 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */
/** @noinspection PhpUnhandledExceptionInspection */

use HighlandVision\KR\Framework\KrMethods;

extract($displayData);
/**
 * Layout variables
 *
 * @var false|object $data Service row.
 */

$url = KrMethods::route('index.php?option=com_knowres&task=service.select&service_id=' . $data->id);
?>

<div class="col">
	<div class="card h-100 shadow-sm">
		<img alt="..." class="card-img-top"
		     src="https://www.freepnglogos.com/uploads/notebook-png/download-laptop-notebook-png-image-png-image-pngimg-2.png">
		<div class="card-body">
			<div class="clearfix mb-3">
				<span class="float-start badge rounded-pill bg-primary"> ASUS Rog </span>
				<span class="float-end price-hp">
					12354.00€
				</span>
			</div>

			<h5 class="card-title">
				Lorem, ipsum dolor sit amet consectetur adipisicing elit . Veniam quidem eaque ut eveniet aut quis
				rerum. Asperiores accusamus harum ducimus velit odit ut . Saepe, iste optio laudantium
				sed aliquam sequi.
			</h5>
			<div class="text-center my-4">
				<a href="<?php echo $url; ?>"
				   class="btn btn-warning">
					<?php echo KrMethods::sprintf('COM_KNOWRES_SERVICES_NEW_SERVICE', $data->name); ?>
				</a>
			</div>
		</div>
	</div>
</div>