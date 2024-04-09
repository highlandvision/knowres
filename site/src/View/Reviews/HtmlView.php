<?php
/**
 * @package    Know Reservations
 * @subpackage Site View
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Site\View\Reviews;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\HtmlView as KrHtmlView;
use HighlandVision\KR\Session as KrSession;
use HighlandVision\KR\Utility;

use function count;
use function defined;

/**
 * List property reviews
 *
 * @since 1.0.0
 */
class HtmlView extends KrHtmlView\Site
{
	/** @var int List limit for pagination. */
	protected int $list_limit = 0;
	/** @var false|object Property item. */
	protected false|object $property;

	/**
	 * Display the view
	 *
	 * @param  null  $tpl  Default template.
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return void
	 */
	public function display($tpl = null): void
	{
		$property_id = KrMethods::inputInt('property_id');
		if (empty($property_id))
		{
			Utility::goto('properties');
		}

		$this->property = KrFactory::getAdminModel('property')->getItem($property_id);
		if (empty($this->property->id))
		{
			Utility::goto('properties');
		}

		$this->params     = KrMethods::getParams();
		$this->list_limit = $this->params->get('list_limit', 10);

		$this->state = $this->get('state');
		$this->state->set('filter.property_id', $property_id);
		$this->state->set('filter.state', 1);
		$this->state->set('filter.held', 0);
		$this->state->set('filter.approved', 1);
		$this->state->set('list.ordering', 'review_date');
		$this->state->set('list.direction', 'DESC');
		$this->state->set('list.limit', $this->list_limit);
		$this->state->set('list.start', KrMethods::inputInt('limitstart', $this->list_limit));

		$this->items            = $this->get('items');
		$this->pagination       = $this->get('pagination');
		$this->meta_title       = KrMethods::sprintf('COM_KNOWRES_TITLE_REVIEWS', $this->property->property_name);
		$this->meta_description = KrMethods::sprintf('COM_KNOWRES_TITLE_REVIEWS_DSC', $this->property->property_name);
		$this->prepareDocument();

		parent::display($tpl);
	}

	/**
	 * Prepare the document metadata, pathway etc
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	protected function prepareDocument(): void
	{
		parent::prepareDefaultDocument($this->meta_title, $this->meta_description);
		$this->setMyPathway($this->property->region_id, $this->property->region_name);
	}

	/**
	 * Set the pathway for the reviews
	 *
	 * @param  int     $region_id    ID of property / search region
	 * @param  string  $region_name  Name of property / search region
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	protected function setMyPathway(int $region_id, string $region_name): void
	{
		$searchSession = new KrSession\Search();
		$searchData    = $searchSession->getData();

		$pathway = self::setPathwayBase();
		$pathway = self::propertiesPathway($pathway, $searchData);
		$pathway = self::propertyPathway($pathway, $searchData, $this->property);
		$pathway->addItem(KrMethods::plain('COM_KNOWRES_REVIEWS'));
	}
}