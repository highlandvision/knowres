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
use HighlandVision\KR\SiteHelper;
use HighlandVision\KR\Utility;
use Joomla\CMS\Factory;
use Joomla\CMS\Object\CMSObject;

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
	/** @var CMSObject Property item. */
	protected CMSObject $property;

	/**
	 * Display the view
	 *
	 * @param   null  $tpl  Default template.
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return void
	 */
	public function display($tpl = null): void
	{
		$property_id = KrMethods::inputInt('property_id', 0, 'get');
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

		$this->state = $this->get('State');
		$this->state->set('filter.property_id', $property_id);
		$this->state->set('filter.state', 1);
		$this->state->set('filter.held', 0);
		$this->state->set('filter.approved', 1);
		$this->state->set('list.ordering', 'review_date');
		$this->state->set('list.direction', 'DESC');
		$this->state->set('list.limit', $this->list_limit);
		$this->state->set('list.start', KrMethods::inputInt('limitstart', $this->list_limit, 'get'));

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
	protected function prepareDocument()
	{
		parent::prepareDefaultDocument($this->meta_title, $this->meta_description);
		$this->setMyPathway($this->property->region_id, $this->property->region_name);
	}

	/**
	 * Set the pathway for the reviews
	 *
	 * @param   int     $region_id    ID of property / search region
	 * @param   string  $region_name  Name of property / search region
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	protected function setMyPathway(int $region_id, string $region_name)
	{
		$pathway = Factory::getApplication()->getPathway();
		$pathway->setPathway([]);

		$Itemid  = SiteHelper::getRegionItemid($region_id);
		$pathway = self::propertiesPathway($pathway, $region_id, $region_name,
			$Itemid);

		$searchSession = new KrSession\Search();
		$searchData    = $searchSession->getData();
		if (count($searchData->baseIds))
		{
			$Itemid  = SiteHelper::getItemId('com_knowres', 'properties',
				['layout' => 'search', 'region_id' => $this->property->region_id]);
			$pathway = self::searchPathway($pathway, $this->property->region_id, $Itemid);
		}

		$pathway = self::propertyPathway($pathway, $this->property->id, $this->property->property_name);

		$pathway->addItem(KrMethods::plain('COM_KNOWRES_REVIEWS'));
	}
}