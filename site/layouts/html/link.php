<?php
/**
 * @package     KR
 * @subpackage  Admin Layouts
 * @copyright   Copyright (C) 2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

/** @noinspection PhpUnhandledExceptionInspection */

use HighlandVision\KR\Framework\KrMethods;

extract($displayData);
/**
 * Layout variables
 *
 * @var array|string $query    Query variables or full link.
 * @var bool         $external True for extrnal link.
 * @var string       $text     Link text.
 * @var string       $title    Link title.
 */

if (is_array($query))
{
	if ($external)
	{
		$url = KrMethods::route(KrMethods::getRoot() . 'index.php?' . http_build_query($query));
	}
	else
	{
		$url = KrMethods::route('index.php?' . http_build_query($query));
	}
}
else
{
	$url = $query;
}

$title = '' ? $text : $title;
?>

<a href="<?php echo $url; ?>" title="<?php echo $title; ?>">
	<?php echo $text; ?>
</a>