<?php
/**
 * @package    Know Reservations
 * @subpackage Site
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Site\Field;

defined('_JEXEC') or die;

use Exception;
use Highlandvision\KR\Framework\KrMethods;
use Highlandvision\KR\Session as KnowresSession;
use Joomla\CMS\Factory;
use Joomla\CMS\Form\FormField;

/**
 * Supports a value from an external table
 *
 * @since 3.3.0
 */
class MobisearchField extends FormField
{
	/** @var string The form field type. */
	protected $type = 'Mobisearch';

	/**
	 * Method to get the field input markup.
	 *
	 * @throws Exception
	 * @since  1.6
	 * @return string    The field input markup.
	 */
	protected function getInput(): string
	{
		$html = '<div class="datepicker-wrapper">';
		if ($this->name == 'arrivaldsp')
		{
			$params        = KrMethods::getParams();
			$searchSession = new KnowresSession\Search();
			$searchData    = $searchSession->getData();
			$input         = Factory::getApplication()->input;
			$arrival       = $input->get('arrival', $searchData->arrival, 'string');
			$departure     = $input->get('departure', $searchData->departure, 'string');
			$atext         = KrMethods::plain("MOD_KNOWRES_SEARCH_CHECK_IN");
			$dtext         = KrMethods::plain("MOD_KNOWRES_SEARCH_CHECK_OUT");

			$html .= '<input type="text" name="'.$this->name.'" id="'.$this->id.'" class="'.$this->class.'" 
			placeholder="'.KrMethods::plain($this->hint).'" data-arrival="'.$arrival.'" 
			data-departure="'.$departure.'" data-days="'.$params->get('search_days').'" data-maxdays="730" 
			data-atext="'.$atext.'" data-dtext="'.$dtext.'">';
		}
		else
		{
			$html .= '<input type="text" name="'.$this->name.'" id="'.$this->id.'" class="'.$this->class.'" 
				placeholder="'.KrMethods::plain($this->hint).'">';
		}

		$html .= '<label for="'.$this->id.'">';
		$html .= '<i class="fas fa-calendar-alt" aria-label="'.KrMethods::plain($this->hint).'"></i>';
		$html .= '</label>';
		$html .= '</div>';

		return $html;
	}
}