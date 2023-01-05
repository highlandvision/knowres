<?php
/**
 * @package    Know Reservations
 * @subpackage Admin Models
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file 'LICENSE.txt' for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\Field;

defined('_JEXEC') or die;

use InvalidArgumentException;
use Joomla\CMS\Form\Field\ListField;
use Joomla\CMS\HTML\HTMLHelper;

use function array_merge;

/**
 * Supports a value from an external table
 *
 * @since 1.0.0
 */
class ListgenericfeatureField extends ListField
{
	/** @var string The form field type. */
	protected $type = 'Listgenericfeature';

	/**
	 * Method to get the generic feature list select
	 *
	 * @throws InvalidArgumentException
	 * @since  2.2.0.
	 * @return array The field input markup.
	 */
	public function getOptions(): array
	{
		$values   = [];
		$values[] = "alarm clock";
		$values[] = "air conditioning";
		$values[] = "airport pick-up service";
		$values[] = "armchair";
		$values[] = "baby listening device";
		$values[] = "balcony";
		$values[] = "basketball hoop";
		$values[] = "bathrobes";
		$values[] = "bathroom grab bars";
		$values[] = "bathtub";
		$values[] = "bbq";
		$values[] = "beach chairs";
		$values[] = "beach view";
		$values[] = "bed linen included";
		$values[] = "bed linen & towels";
		$values[] = "bidet";
		$values[] = "bicycles";
		$values[] = "billiard table";
		$values[] = "blender";
		$values[] = "breakfast bar and stools";
		$values[] = "breakfast included";
		$values[] = "breakfast possible";
		$values[] = "built-in wardrobes";
		$values[] = "bunk beds";
		$values[] = "business centre";
		$values[] = "canal view";
		$values[] = "car necessary";
		$values[] = "car not necessary";
		$values[] = "car recommended";
		$values[] = "car rental free";
		$values[] = "carbon monoxide detector";
		$values[] = "ceiling fan";
		$values[] = "cell phone rentals";
		$values[] = "central heating";
		$values[] = "chair";
		$values[] = "chest of drawers";
		$values[] = "child play area";
		$values[] = "cleaning disinfection";
		$values[] = "clothes dryer";
		$values[] = "coffee maker";
		$values[] = "coffee table";
		$values[] = "combo tub shower";
		$values[] = "concierge";
		$values[] = "conference facilites";
		$values[] = "cooker";
		$values[] = 'cookware and kitchen utensils';
		$values[] = "cot extra charge";
		$values[] = "cot free";
		$values[] = "cot free on request";
		$values[] = "courtyard";
		$values[] = 'crockery and cutlery';
		$values[] = "cupboard";
		$values[] = "cupboards";
		$values[] = "desk";
		$values[] = "dining kitchen";
		$values[] = "dining table";
		$values[] = "dishwasher";
		$values[] = "doctor on call";
		$values[] = "double bed";
		$values[] = "double sofa";
		$values[] = "double sofa bed";
		$values[] = "dressing table";
		$values[] = "dvd";
		$values[] = "electric kettle";
		$values[] = "electronic door locks";
		$values[] = "elevator";
		$values[] = "en suite bathroom";
		$values[] = "en suite shower";
		$values[] = "espresso-machine";
		$values[] = "ev charging station";
		$values[] = "fan";
		$values[] = "fans on request";
		$values[] = "fenced pool";
		$values[] = "fenced yard";
		$values[] = "fire extinguisher";
		$values[] = "fireplace";
		$values[] = "firepit";
		$values[] = "first aid kit";
		$values[] = "fitness room";
		$values[] = "floor heating";
		$values[] = "free weekly cleaning";
		$values[] = "freezer";
		$values[] = "fridge";
		$values[] = "fridge freezer";
		$values[] = "garage";
		$values[] = "garden private";
		$values[] = "games room";
		$values[] = "garden shared";
		$values[] = 'gas or electric hob';
		$values[] = 'golf course view';
		$values[] = "great for families";
		$values[] = "gym for guest use";
		$values[] = "hair dryer";
		$values[] = "health club";
		$values[] = "heated towel bar";
		$values[] = "help desk";
		$values[] = "high chair";
		$values[] = "hot tub private";
		$values[] = "hot tub shared";
		$values[] = "hydro massage shower";
		$values[] = "ice maker";
		$values[] = "infants stair gate";
		$values[] = "internet access free";
		$values[] = "internet access high speed";
		$values[] = "internet cable free";
		$values[] = "internet cable paid";
		$values[] = "internet connection";
		$values[] = "internet wifi free";
		$values[] = "internet wifi paid";
		$values[] = "ipod dock";
		$values[] = "iron";
		$values[] = "ironing board";
		$values[] = "iron and board";
		$values[] = "jacuzzi";
		$values[] = "juicer";
		$values[] = "just for two";
		$values[] = 'kettle';
		$values[] = "king size bed";
		$values[] = "kitchen dining area";
		$values[] = "kitchen island";
		$values[] = "lamp";
		$values[] = "laundry private";
		$values[] = "laundry service";
		$values[] = "laundry shared";
		$values[] = "lounge";
		$values[] = "luggage storage facilities";
		$values[] = "maid service";
		$values[] = "marble floor";
		$values[] = "microwave";
		$values[] = "mirror";
		$values[] = "mountain view";
		$values[] = "mosquito net";
		$values[] = "near the beach";
		$values[] = "night table";
		$values[] = "no smoking rooms/facilities";
		$values[] = "ocean view";
		$values[] = "office";
		$values[] = "on the beach";
		$values[] = "outdoor furniture";
		$values[] = "outdoor shower";
		$values[] = "oven";
		$values[] = "pair of twin beds";
		$values[] = "parking";
		$values[] = "parking free";
		$values[] = "parking guarded";
		$values[] = "parking on street";
		$values[] = "parking private";
		$values[] = "patio";
		$values[] = "pets considred";
		$values[] = "pets not allowed";
		$values[] = "pets welcome";
		$values[] = "pool for children";
		$values[] = "pool towels";
		$values[] = "printer";
		$values[] = "queen size bed";
		$values[] = "reading lamp";
		$values[] = "safe";
		$values[] = "sauna";
		$values[] = "sea front";
		$values[] = "sea view";
		$values[] = "self check in";
		$values[] = "shower";
		$values[] = "shower walk in";
		$values[] = "single bed";
		$values[] = "single level home";
		$values[] = "small balcony";
		$values[] = "smart tv";
		$values[] = "smoke detector";
		$values[] = "smoking permitted";
		$values[] = "sofa";
		$values[] = "sofabed";
		$values[] = "sound system";
		$values[] = "spa";
		$values[] = "steam bath";
		$values[] = "steam room";
		$values[] = "stereo";
		$values[] = "sunbeds";
		$values[] = "sun umbrellas";
		$values[] = "swimming pool communal";
		$values[] = "swimming pool heated";
		$values[] = "swimming pool indoor";
		$values[] = "swimming pool infinity";
		$values[] = "swimming pool private";
		$values[] = "swimming pool salt water";
		$values[] = "table";
		$values[] = "table and chairs";
		$values[] = "table tennis";
		$values[] = "telephone";
		$values[] = "telephone free local calls";
		$values[] = "tennis court";
		$values[] = "terrace";
		$values[] = "toaster";
		$values[] = "toilet";
		$values[] = "toiletries";
		$values[] = "towels included";
		$values[] = "travel crib";
		$values[] = "tv";
		$values[] = "tv cable";
		$values[] = "tv local channels only";
		$values[] = "tv satellite";
		$values[] = "underground parking";
		$values[] = "vacuum cleaner";
		$values[] = "vanity cupboard";
		$values[] = "veranda";
		$values[] = "video game system";
		$values[] = "walk in closet";
		$values[] = "wardrobe";
		$values[] = "washbasin";
		$values[] = "washer dryer";
		$values[] = "washing machine";
		$values[] = "water slide";
		$values[] = "water sports nearby";
		$values[] = "weekly maid service";
		$values[] = "welcome pack";
		$values[] = "wheelchair access";
		$values[] = "wood burning fireplace";

		sort($values);

		$options = [];
		foreach ($values as $v)
		{
			$options[] = HTMLHelper::_('select.option', $v, $v);
		}

		return array_merge(parent::getOptions(), $options);
	}
}