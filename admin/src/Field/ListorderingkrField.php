<?php
/**
 * @package     Joomla.Platform
 * @subpackage  Form
 * @copyright   2005 - 2016 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE
 */

namespace HighlandVision\Component\Knowres\Administrator\Field;

defined('_JEXEC') or die;

use Joomla\CMS\Form\Field\ListField;
use Joomla\CMS\Language\Associations;
use Joomla\CMS\Language\Multilanguage;
use Joomla\CMS\Language\Text;

/**
 * List of ordering options for KR with separate
 * ascending / descening text
 *
 * @since  3.0.0
 */
class ListorderingkrField extends ListField
{
	/** @var string $type The form field type. */
	protected $type = 'Listorderingkr';

	/**
	 * Method to get the field options.
	 *
	 * @since   3.0.0
	 * @return  array  The field option objects.
	 */
	public function getOptions(): array
	{
		$fieldname = preg_replace('/[^a-zA-Z\d_\-]/', '_', $this->fieldname);
		$options   = [];

		foreach ($this->element->xpath('option') as $option)
		{
			$requires = explode(',', (string) $option['requires']);
			if ($requires)
			{
				if (in_array('multilanguage', $requires) && !Multilanguage::isEnabled())
				{
					continue;
				}
				if (in_array('associations', $requires) && !Associations::isEnabled())
				{
					continue;
				}
			}

			$value    = (string) $option['value'];
			$text     = trim((string) $option) ?: $value;
			$disabled = (string) $option['disabled'];
			$disabled = ($disabled == 'true' || $disabled == 'disabled' || $disabled == '1');
			$disabled = $disabled || ($this->readonly && $value != $this->value);

			$checked = (string) $option['checked'];
			$checked = ($checked == 'true' || $checked == 'checked' || $checked == '1');

			$selected = (string) $option['selected'];
			$selected = ($selected == 'true' || $selected == 'selected' || $selected == '1');

			$multiple = explode(" ", $text);
			$multi    = [];
			foreach ($multiple as $m)
			{
				$multi[] = Text::alt($m, $fieldname);
			}

			$tmp = array(
				'value'    => $value,
				//					'text'     => Text::alt($text, $fieldname),
				'text'     => ucfirst(strtolower(implode(" ", $multi))),
				'disable'  => $disabled,
				'class'    => (string) $option['class'],
				'selected' => ($checked || $selected),
				'checked'  => ($checked || $selected)
			);

			$tmp['onclick']  = (string) $option['onclick'];
			$tmp['onchange'] = (string) $option['onchange'];

			$options[] = (object) $tmp;
		}

		return $options;
	}
}