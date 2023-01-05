<?php
/**
 * @package     Know Reservations
 * @subpackage  Site Controller
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */
/** @noinspection PhpUnhandledExceptionInspection */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;

$total_guests = $this->contract->guests;
$max_guests   = $this->contract->guests;
if ($this->params->get('guestdata_partysize_details', 0) && $this->params->get('guestdata_partysize_change', 0))
{
	$total_guests = $this->property->sleeps + $this->property->sleeps_extra;
	$max_guests   = $this->property->sleeps + $this->property->sleeps_extra + $this->property->sleeps_infant_max;
}

$adults = !$this->item->adults ? $this->contract->guests : $this->item->adults;
$this->form->setFieldAttribute('adults', 'max', $this->contract->guests);
$this->form->setValue('adults', null, $adults);

if ($this->property->sleeps_infant_age)
{
	$this->form->setFieldAttribute('child', 'description',
		KrMethods::sprintf('COM_KNOWRES_CONTRACTGUESTDATAFORM_CHILDREN_DSC', $this->property->sleeps_infant_age));
	$this->form->setFieldAttribute('infants', 'description',
		KrMethods::sprintf('COM_KNOWRES_CONTRACTGUESTDATAFORM_INFANTS_DSC', $this->property->sleeps_infant_age,
			$this->property->sleeps_infant_max));
	$this->form->setFieldAttribute('infants', 'max', $this->property->sleeps_infant_max);
}
else
{
	$this->form->setFieldAttribute('infants', 'default', 0);
	$this->form->setFieldAttribute('infants', 'hidden', true);
}

$child_ages  = [];
$child_count = 0;
if ($this->item->children)
{
	$child_ages  = explode(',', $this->item->children);
	$child_count = count($child_ages);
}

$max_children = $adults ? $this->contract->guests - $adults : min($this->contract->guests - 2, 10);
$this->form->setFieldAttribute('child', 'max', $max_children);
$this->form->setValue('child', null, $child_count);

$child_ages = [];
if ($this->item->children)
{
	$all_ages = explode(',', $this->item->children);
	$count    = 0;
	foreach ($all_ages as $a)
	{
		$id           = 'child_ages' . $count;
		$child_ages[] = '<input class="float-left child-ages form-control valid form-control-success" id="' . $id . '" 
			inputmode="numeric" name="jform[child_ages][]" type="number" value="' . $a
			. '" max="16" min="0" step="1" aria-describedby="jform_adults-desc" aria-invalid="false">';
		$count++;
	}
}
?>

<?php echo KrMethods::render('form.field.partysize', ['form'          => $this->form,
                                                      'child_ages'    => $child_ages,
                                                      'child_min_age' => 0,
                                                      'child_max_age' => 16,
                                                      'total_guests'  => $total_guests
]); ?>
