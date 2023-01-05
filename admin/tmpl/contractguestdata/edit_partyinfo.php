<?php
/**
 * @package         Joomla.Site
 * @subpackage      Layout
 * @copyright   (C) 2016 Open Source Matters, Inc. <https://www.joomla.org>
 * @license         GNU General Public License version 2 or later; see LICENSE.txt
 */

/** @noinspection PhpUnhandledExceptionInspection */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;

//TODO-v4.1 Will be defunct when children and ages released

$wa = $this->document->getWebAssetManager();
$wa->useScript('keepalive')
   ->useScript('form.validate')
   ->useScript('com_knowres.admin-guestdata')
   ->useStyle('com_knowres.admin-guestdata');

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
		KrMethods::sprintf('COM_KNOWRES_CONTRACTGUESTDATA_CHILDREN_DSC', $this->property->sleeps_infant_age));
	$this->form->setFieldAttribute('infants', 'label',
		KrMethods::sprintf('COM_KNOWRES_CONTRACTGUESTDATA_INFANTS_LBL', $this->property->sleeps_infant_age));
	$this->form->setFieldAttribute('infants', 'description',
		KrMethods::sprintf('COM_KNOWRES_CONTRACTGUESTDATA_INFANTS_DSC', $this->property->sleeps_infant_age,
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
		$child_ages[] = '<input class="float-start child-ages form-control valid form-control-success" id="' . $id . '" 
			inputmode="numeric" name="jform[child_ages][]" type="number" value="' . $a
			. '" max="16" min="0" step="1" aria-describedby="jform_adults-desc" aria-invalid="false">';
		$count++;
	}
}
?>

<div class="main-card">
	<div class="row">
		<div class="col">
			<fieldset>
				<legend><?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATA_LEGEND_PARTYSIZE'); ?></legend>
				<?php echo KrMethods::render('form.field.partysize', ['form'          => $this->form,
				                                                      'child_ages'    => $child_ages,
				                                                      'child_min_age' => 0,
				                                                      'child_max_age' => 16,
				                                                      'total_guests'  => $total_guests
				]); ?>
			</fieldset>
		</div>
	</div>
	<fieldset>
		<?php echo $this->form->getInput('guestinfo'); ?>
	</fieldset>
</div>