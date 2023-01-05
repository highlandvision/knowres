<?php
/**
 * @package         Joomla.Site
 * @subpackage      Layout
 * @copyright   (C) 2013 Open Source Matters, Inc. <https://www.joomla.org>
 * @license         GNU General Public License version 2 or later; see LICENSE.txt
 */

/** @noinspection PhpUnhandledExceptionInspection */

defined('_JEXEC') or die;

use Joomla\CMS\Component\ComponentHelper;
use Joomla\CMS\Factory;
use Joomla\CMS\Language\Text;

// $displayData is $this from the edit view
/** @var HighlandVision\KR\Joomla\Extend\HtmlView $displayData */
// Overrides the rhs layout on edit pages for created by etc
$app         = Factory::getApplication();
$form        = $displayData->getForm();
$input       = $app->input;
$component   = $input->getCmd('option', 'com_content');
$saveHistory = ComponentHelper::getParams($component)->get('save_history', 0);

$fields = $displayData->get('fields')
	?: ['state',
	    'version_note',
	    'version',
	    'id',
	    'created_at',
	    'created_by',
	    'updated_at',
	    'updated_by',
	];

$hiddenFields = $displayData->get('hidden_fields') ?: array();
if (!$saveHistory)
{
	$hiddenFields[] = 'version_note';
}

$html   = array();
$html[] = '<fieldset class="form-vertical">';
$html[] = '<legend class="visually-hidden">' . Text::_('JGLOBAL_FIELDSET_GLOBAL') . '</legend>';

foreach ($fields as $f)
{
	if ($form->getField($f))
	{
		if ($f == 'state' || !empty($form->getValue($f)))
		{
			if (in_array($f, $hiddenFields))
			{
				$form->setFieldAttribute($f, 'type', 'hidden');
			}

			$html[] = $form->renderField($f);
		}
	}
}

$html[] = '</fieldset>';

echo implode('', $html);