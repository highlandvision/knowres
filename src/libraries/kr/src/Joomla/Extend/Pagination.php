<?php
/**
 * @package    Know Reservations
 * @subpackage Library
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */
/** @noinspection PhpMissingReturnTypeInspection */

namespace HighlandVision\KR\Joomla\Extend;

defined('_JEXEC') or die;

use Exception;
use Joomla\CMS\Application\CMSApplication;
use Joomla\CMS\Layout\LayoutHelper;
use Joomla\CMS\Pagination\Pagination as JoomlaPagination;
use Joomla\CMS\Pagination\PaginationObject;

use function defined;
use function is_file;

/**
 * Knowres pagination override
 *
 * @since 1.0.0
 */
class Pagination extends JoomlaPagination
{
	/* @var bool True for search ajax request */
	private bool $ajax;

	/**
	 * Constructor.
	 *
	 * @param  int                  $total       The total number of items.
	 * @param  int                  $limitstart  The offset of the item to start at.
	 * @param  int                  $limit       The number of items to display per page.
	 * @param  string               $prefix      The prefix used for request variables.
	 * @param  CMSApplication|null  $app         The application object
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	public function __construct($total, $limitstart, $limit, $prefix = '', ?CMSApplication $app = null)
	{
		parent::__construct($total, $limitstart, $limit, $prefix, $app);

		$displayedPages   = 4;
		$this->pagesStart = $this->pagesCurrent - ($displayedPages / 2);

		if ($this->pagesStart < 1)
		{
			$this->pagesStart = 1;
		}

		if ($this->pagesStart + $displayedPages > $this->pagesTotal)
		{
			$this->pagesStop = $this->pagesTotal;

			if ($this->pagesTotal < $displayedPages)
			{
				$this->pagesStart = 1;
			}
			else
			{
				$this->pagesStart = $this->pagesTotal - $displayedPages + 1;
			}
		}
		else
		{
			$this->pagesStop = $this->pagesStart + $displayedPages - 1;
		}
	}

	/**
	 * Create and return the pagination page list string, i.e. Previous, Next, 1 2 3 ... x.
	 *
	 * @param  bool  $ajax  True for ajax request (only properties)
	 *
	 * @throws Exception
	 * @since  1.5
	 * @return string  Pagination page list string.
	 */
	public function getPagesLinks(bool $ajax = false): string
	{
		$this->ajax = $ajax;

		// Build the page navigation list.
		$data = $this->_buildDataObject();

		$list           = [];
		$list['prefix'] = $this->prefix;

		$chromePath = JPATH_THEMES . '/' . $this->app->getTemplate() . '/html/pagination.php';

		if (is_file($chromePath))
		{
			include_once $chromePath;
		}

		// Build the select list
		if ($data->all->base !== null)
		{
			$list['all']['active'] = true;
			$list['all']['data']   = $this->_item_active($data->all);
		}
		else
		{
			$list['all']['active'] = false;
			$list['all']['data']   = $this->_item_inactive($data->all);
		}

		if ($data->start->base !== null)
		{
			$list['start']['active'] = true;
			$list['start']['data']   = $this->_item_active($data->start);
		}
		else
		{
			$list['start']['active'] = false;
			$list['start']['data']   = $this->_item_inactive($data->start);
		}

		if ($data->previous->base !== null)
		{
			$list['previous']['active'] = true;
			$list['previous']['data']   = $this->_item_active($data->previous);
		}
		else
		{
			$list['previous']['active'] = false;
			$list['previous']['data']   = $this->_item_inactive($data->previous);
		}

		// Make sure it exists
		$list['pages'] = [];

		foreach ($data->pages as $i => $page)
		{
			if ($page->base !== null)
			{
				$list['pages'][$i]['active'] = true;
				$list['pages'][$i]['data']   = $this->_item_active($page);
			}
			else
			{
				$list['pages'][$i]['active'] = false;
				$list['pages'][$i]['data']   = $this->_item_inactive($page);
			}
		}

		if ($data->next->base !== null)
		{
			$list['next']['active'] = true;
			$list['next']['data']   = $this->_item_active($data->next);
		}
		else
		{
			$list['next']['active'] = false;
			$list['next']['data']   = $this->_item_inactive($data->next);
		}

		if ($data->end->base !== null)
		{
			$list['end']['active'] = true;
			$list['end']['data']   = $this->_item_active($data->end);
		}
		else
		{
			$list['end']['active'] = false;
			$list['end']['data']   = $this->_item_inactive($data->end);
		}

		if ($this->total > $this->limit)
		{
			return $this->_list_render($list);
		}
		else
		{
			return '';
		}
	}

	/**
	 * Method to create an active pagination link to the item
	 *
	 * @param  PaginationObject  $item  The object with which to make an active link.
	 *
	 * @since   1.5
	 * @return  string  HTML link
	 */
	protected function _item_active(PaginationObject $item)
	{
		return LayoutHelper::render('joomla.pagination.link',
			['data' => $item, 'active' => true, 'ajax' => $this->ajax]);
	}
}