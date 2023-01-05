<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2021 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

/** @noinspection PhpUnhandledExceptionInspection */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
use Joomla\CMS\Session\Session;

/** @var HighlandVision\Component\Knowres\Administrator\View\Images\HtmlView $this */

$action = KrMethods::route(KrMethods::getRoot() . 'administrator/index.php?option=com_knowres&task=images.upload');
$params = KrMethods::getParams();
?>

<div id="dropzonedata" data-url="<?php echo $action; ?>" data-property_id="<?php echo $this->property_id; ?>"
     data-token="<?php echo Session::getFormToken(); ?>"></div>

<div id="actions" class="row">
	<div class="col-lg-7">
		<span class="btn btn-success fileinput-button">
            <i class="glyphicon glyphicon-plus"></i>
            <span>Add or Drop files...</span>
          </span>
		<button type="submit" class="btn btn-primary start">
			<i class="glyphicon glyphicon-upload"></i>
			<span>Start Upload</span>
		</button>
		<button type="reset" class="btn btn-warning cancel">
			<i class="glyphicon glyphicon-ban-circle"></i>
			<span>Delete All</span>
		</button>
	</div>
	<div class="col-lg-5">
		<div class="fileupload-process" style="display:none;">
			<div class="progress active" id="total-progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
				<div class="progress-bar progress-bar-striped progress-bar-success" role="progressbar" style="width:0;"
				     data-dz-uploadprogress></div>
			</div>
		</div>
	</div>
</div>

<div class="table table-striped">
	<div id="template" class="file-row" style="float:left;margin-right:10px;margin-bottom:10px;">
		<div>
			<span class="preview">
				<!--suppress HtmlRequiredAltAttribute -->
				<img data-dz-thumbnail /></span>
		</div>
		<div>
			<p class="size" data-dz-size></p>
			<div class="progress active" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
				<div class="progress-bar progress-bar-striped progress-bar-animated progress-bar-success"
				     style="width:0" role="progressbar" data-dz-uploadprogress>
				</div>
			</div>
		</div>
		<div>
			<button type="button" data-dz-remove class="btn btn-danger start end">
				<i class="glyphicon glyphicon-trash"></i>
				<span>Delete</span>
			</button>
		</div>
	</div>

	<div id="previews"></div>
</div>