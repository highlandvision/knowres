<?php
/**
 * @package    Know Reservations
 * @subpackage Site View
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Site\View\Property;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\HtmlView as KrHtmlView;
use JetBrains\PhpStorm\NoReturn;

/**
 * View property geriatric calendar
 *
 * @since 1.0.0
 */
class GeriatricView extends KrHtmlView\Site
{
	/** @var array Blocked dates. */
	public array $blocked = [];
	/** @var array Confirmed dates. */
	public array $confirmed = [];
	/** @var int Start month. */
	public int $month = 0;
	/** @var int Calendar months to show. */
	public int $months_to_show = 12;
	/** @var string Start date. */
	public string $start = '';
	/** @var int Start day of week. */
	public int $startday_dow = 0;
	/** @var string Day name of start day. */
	public string $startday_name = '';
	/** @var int Start year. */
	public int $year = 0;
	/** @var int Yesterday day of week. */
	public int $yesterday_dow = 0;
	/** @var string Day name of yesterday. */
	public string $yesterday_name = '';
	/** @var array Dates with weekly starts. */
	public array $weekly = [];

	/**
	 * Display the view
	 *
	 * @param   null  $tpl  Default template.
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return void
	 */
	#[NoReturn] public function display($tpl = null): void
	{
		$this->setLayout('geriatric');
		$this->params = KrMethods::getParams();

		parent::display($tpl);
		jexit();
	}
}