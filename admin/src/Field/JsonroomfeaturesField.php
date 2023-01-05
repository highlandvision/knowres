<?php
/**
 * @package    Know Reservations
 * @subpackage Admin Models
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\Field;

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Utility;
use Joomla\CMS\Form\FormField;

/**
 * Supports a value from an external table
 *
 * @since 1.0.0
 */
class JsonroomfeaturesField extends FormField
{
	/**
	 * Get the field input data.
	 *
	 * @since  1.6
	 * @return string    The field input markup.
	 */
	public function getInput(): string
	{
		$this->layout = 'form.field.json.featuresbyroom';
		$this->type   = 'Jsonroomfeatures';
		$features     = KrFactory::getListModel('propertyfeatures')->getAll();
		if (!count($features))
		{
			return '';
		}

		$rooms = [];
		foreach ($features as $f)
		{
			$tmp = Utility::decodeJson($f->room_type, true);
			if (count($tmp) == 1 && $tmp[0] == 'property')
			{
				continue;
			}

			foreach ($tmp as $t)
			{
				if ($t != 'property')
				{
					$rooms[$t][$f->id] = [
						'id'   => $f->id,
						'name' => $f->name
					];
				}

				if ($t == 'living' || $t == 'kitchen')
				{
					$rooms['lk'][$f->id] = [
						'id'   => $f->id,
						'name' => $f->name
					];
				}
				if ($t == 'living' || $t == 'bedroom')
				{
					$rooms['lb'][$f->id] = [
						'id'   => $f->id,
						'name' => $f->name
					];
				}
				if ($t == 'living' || $t == 'bedroom' || $t == 'kitchen')
				{
					$rooms['lbk'][$f->id] = [
						'id'   => $f->id,
						'name' => $f->name
					];
				}
			}
		}

		$data                   = [];
		$data['featuresbyroom'] = $rooms;
		$data['values']         = Utility::arrayToObject($this->value);

		$renderer = $this->getRenderer($this->layout);

		return $renderer->render($data);
	}
}