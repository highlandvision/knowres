<?php
/**
 * @package     Know Reservations
 * @subpackage  Admin Layout
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use Joomla\CMS\Form\Form;

extract($displayData);
/**
 * Layout variables
 *
 * @var Form  $form  Form instance.
 * @var int   $max   Sleeps max.
 * @var array $rooms Property rooms.
 */

if (is_countable($rooms) && count($rooms))
{
	$max = 0;
	foreach ($rooms as $d)
	{
		if ((int) $d->room_id && (int) $d->sleeps)
		{
			$max += $d->sleeps * $d->maxsell;
		}
	}
}

$form->setFieldAttribute('guests', 'max', $max);
echo $form->renderField('guests');
?>

<!--<div class="col">-->
<!--	--><?php //echo $form->renderField('adults'); ?>
<!--</div>-->
<!--<div class="col">-->
<!--	--><?php //echo $form->renderField('children'); ?>
<!--</div>-->

