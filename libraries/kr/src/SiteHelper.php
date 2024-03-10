<?php
/**
 * @package    Know Reservations
 * @subpackage Library
 * @copyright  Copyright (c) 2020, Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\Component\Knowres\Site\Model\ContractguestdataModel;
use HighlandVision\Component\Knowres\Site\Model\GuestModel;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Session as KrSession;
use InvalidArgumentException;
use Joomla\Registry\Registry;
use RuntimeException;

use function count;
use function explode;
use function htmlentities;
use function is_array;
use function is_null;
use function jexit;
use function str_replace;
use function trim;

/**
 * Front end site adhoc functions
 *
 * @since 1.0.0
 */
class SiteHelper
{
	/**
	 * Redirect user / guest to log in or home page
	 *
	 * @throws Exception
	 * @since 2.5.0
	 */
	public static function badUser(): void
	{
		if (self::userRequired()) {
			self::redirectLogin();
		}
		else {
			self::redirectHome();
		}
	}

	/**
	 * Build the link for a dashboard view
	 *
	 * @param  object   $contract  Contract object containing minimum id, guest_id and qkey
	 * @param  ?string  $view      Target view
	 * @param  bool     $external  True for external links including root
	 *
	 * @throws Exception
	 * @since  3.3.0
	 * @return string
	 */
	public static function buildDashboardLink(object $contract, ?string $view = null, bool $external = false): string
	{
		if (is_null($view)) {
			$hash = Cryptor::setHash($contract->id, $contract->guest_id, $contract->qkey);
		}
		else {
			$hash = Cryptor::setHash($contract->id, $contract->guest_id, $contract->qkey, $view);
		}

		$key = Cryptor::encrypt($hash);
		if ($external) {
			return KrMethods::route(
				KrMethods::getRoot() . 'index.php?option=com_knowres&task=dashboard.request&key=' . $key
			);
		}
		else {
			return KrMethods::route('index.php?option=com_knowres&task=dashboard.request&key=' . $key);
		}
	}

	/**
	 * Build the link for a property
	 *
	 * @param  int          $id        ID of property
	 * @param  string|null  $append    String to append to link
	 * @param  bool         $external  True for external link
	 *
	 * @throws Exception
	 * @since  4.0.0
	 * @return string
	 */
	public static function buildPropertyLink(int $id, string $append = null, bool $external = false): string
	{
		$Itemid = self::getItemId('com_knowres', 'property', ['id' => $id]);
		$link   = 'index.php?option=com_knowres&view=property&id=' . $id . '&Itemid=' . $Itemid;
		if (!empty($append)) {
			$link .= $append;
		}

		if (!$external) {
			return KrMethods::route($link);
		}
		else {
			return KrMethods::route(KrMethods::getRoot() . $link);
		}
	}

	/**
	 * Check that admin and guest are not trying to change the same row
	 * If all OK check the row out
	 *
	 * @param  object                             $item   Database guest row.
	 * @param  GuestModel|ContractguestdataModel  $model  Database model.
	 *
	 * @throws Exception
	 * @since  3.3.0
	 */
	public static function checkLocks(object $item, GuestModel|ContractguestdataModel $model): void
	{
		if (is_int($item->checked_out) && $item->checked_out != KrMethods::getUser($item->checked_out)->id) {
			// Ouch! Record is checked out by admin
			if ($item->checked_out_time < TickTock::modifyHours('now', 1, '-')) {
				$model->checkin([$item->id]);
				KrMethods::logoutUser($item->checked_out);
			}
			else {
				KrMethods::message(KrMethods::plain('COM_KNOWRES_LOCKED'));
				self::redirectDashboard();
			}
		}

		if (!$model->checkout($item->id)) {
			KrMethods::message(KrMethods::plain('COM_KNOWRES_LOCKED'));
			self::redirectDashboard();
		}
	}

	/**
	 * Check for logged-in user
	 *
	 * @throws Exception
	 * @since  2.5.0
	 */
	public static function checkUser(): void
	{
		if (self::userRequired() && !KrMethods::getUser()->id) {
			self::redirectLogin();
		}

		$guest_id = KrFactory::getListModel('guests')->getGuestForUser(KrMethods::getUser()->id);
		if (empty($guest_id)) {
			SiteHelper::redirectLogin();
		}
	}

	/**
	 * Redirect for expired session to property or search page
	 *
	 * @param  ?int  $property_id  ID of property
	 * @param  bool  $ajax         TRUE for ajax request
	 *
	 * @throws Exception
	 * @since 1.0.0
	 */
	public static function expiredSession(?int $property_id = 0, bool $ajax = false): void
	{
		if ((int) $property_id && !$ajax) {
			$Itemid = self::getItemId('com_knowres', 'property', array('id' => $property_id));
			$link   = KrMethods::route(
				'index.php?option=com_knowres&Itemid=' . $Itemid . '&view=property&id=' . (int) $property_id,
				false
			);
			KrMethods::message(KrMethods::plain('COM_KNOWRES_EXPIRED_SESSION'), 'warning');
		}
		else {
			// retain=2 displays expired session message in properties
			$Itemid = self::getItemId('com_knowres', 'properties', array('region_id' => 0));
			$link   = KrMethods::route('index.php?option=com_knowres&Itemid=' . $Itemid . '&view=properties&retain=2',
			                           false);
		}

		if (!$ajax) {
			KrMethods::redirect(KrMethods::route($link, false));
		}
		else {
			$wrapper             = [];
			$wrapper['redirect'] = $link;
			echo KrMethods::jsonResponse($wrapper);
			jexit();
		}
	}

	/**
	 * Get the dates for the season
	 *
	 * @param  string  $season   Season name
	 * @param  array   $seasons  Array of seasons
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return string
	 */
	public static function getDates(string $season, array $seasons): string
	{
		$dates = [];
		foreach ($seasons as $s) {
			if ($s->season == $season) {
				$dates[] = TickTock::displayDate($s->valid_from) . ' - ' . TickTock::displayDate($s->valid_to);
			}
		}

		return implode(',', $dates);
	}

	/**
	 * Returns link to google map directions if required otherwise false
	 *
	 * @param  object  $params    Component parameters
	 * @param  object  $contract  Contract database object
	 *
	 * @throws RuntimeException
	 * @since  2.5.0
	 * @return string
	 */
	public static function getDirections(object $params, object $contract): string
	{
		$directions   = '';
		$Translations = new Translations();
		if ($params->get('guest_plan_routing', 0) && $contract->booking_status > 35 &&
			$contract->lat && $contract->lng) {
			//https://maps.google.com?saddr=airport%20<nearest town/region>+Location&daddr=<address>&sensor=false
			$base = 'https://maps.google.com';
			$from = '?saddr=airport%20' . $Translations->getText('region', $contract->region_id) . ' '
				. $Translations->getText('country', $contract->country_id);
			$from = str_replace(' ', '+', $from);

			if (!empty($contract->lat_actual) && (int) $contract->lat_actual != 0) {
				$to = '&daddr=' . $contract->lat_actual . ',' . $contract->lng_actual;
			}
			else {
				$to = '&daddr=' . $contract->lat . ',' . $contract->lng;
			}

			$directions = $base . htmlentities($from) . htmlentities($to);
		}

		return $directions;
	}

	/**
	 * Get pdf file for download
	 *
	 * @throws Exception
	 * @since  2.5.0
	 */
	public static function getDownloadPdf(): void
	{
		$type     = trim(KrMethods::inputString('type', ''));
		$id       = trim(KrMethods::inputString('id', ''));
		$filename = trim(KrMethods::inputString('filename', ''));

		$rootPath = Utility::getPath('root');
		$upOne    = dirname($rootPath);
		$folder   = basename($rootPath);
		$pdfPath  = $upOne . '/uploadedpdfs/' . $folder . '/';

		if ($type) {
			$file = $pdfPath . $type . '/' . $id . '/' . $filename;
		}
		else {
			$file = $pdfPath . $id . '/' . $filename;
		}

		if (file_exists($file)) {
			header('Content-Description: File Transfer');
			header('Content-Type: application/octet-stream');
			header('Content-Disposition: attachment; filename=' . basename($file));
			header('Content-Transfer-Encoding: binary');
			header('Expires: 0');
			header('Cache-Control: must-revalidate');
			header('Pragma: public');
			header('Content-Length: ' . filesize($file));

			ob_clean();
			flush();
			readfile($file);

			jexit();
		}
	}

	/**
	 * Returns any selected favourites in an array of property Ids.
	 *
	 * @throws Exception
	 * @since  3.3.0
	 * @return array
	 */
	public static function getFavourites(): array
	{
		$cookie = KrMethods::getCookie('krsaved');
		$saved  = !empty($cookie) ? explode('xx', $cookie) : [];
		if (!is_array($saved)) {
			$saved = (array) $saved;
		}

		return $saved;
	}

	/**
	 * Return array of properties requiring vouchers
	 *
	 * @param  object  $item  Contract item
	 *
	 * @throws Exception
	 * @since  2.5.0
	 * @return string
	 */
	public static function getGuestdata(object $item): string
	{
		$guestdata = '';
		if ($item->guestdata_id) {
			$dl        = KrMethods::route(
				'index.php?option=com_knowres&task=dashboard.guestdata&format=pdf&id=' . $item->id
			);
			$link      = '<a href="' . $dl . '">'
				. KrMethods::plain('COM_KNOWRES_PDF_ARRIVAL_INFORMATION_TITLE')
				. '</a>';
			$guestdata = $link;
		}

		return $guestdata;
	}

	/**
	 * Return array of properties requiring vouchers
	 *
	 * @param  object  $item  Contract item
	 *
	 * @throws Exception
	 * @since  2.5.0
	 * @return string
	 */
	public static function getInvoice(object $item): string
	{
		$invoice = '';
		if ($item->booking_status >= 39) {
			$dl      = KrMethods::route(
				'index.php?option=com_knowres&task=dashboard.invoice&format=pdf&id=' . $item->id
			);
			$link    = '<a href="' . $dl . '">' . KrMethods::plain('COM_KNOWRES_PDF_INVOICE_TITLE') . '</a>';
			$invoice = $link;
		}

		return $invoice;
	}

	/**
	 * Returns the Itemid associated with a component
	 * if a link to this component is available in the menus table
	 *
	 * @param  string  $component     Component name
	 * @param  string  $view          View name
	 * @param  array   $variables     Possible URL variables
	 * @param  array   $alternatives  Alternative variables
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return int
	 */
	public static function getItemId(string $component = 'com_knowres', string $view = '',
	                                 array  $variables = [], array  $alternatives = []): int
	{
		$base = 'index.php?option=' . $component;
		if ($view) {
			$base .= '&view=' . $view;
		}

		// 1st try base plus variables or base only if no variables
		$link = $base;
		foreach ($variables as $k => $v) {
			$link .= '&' . $k . '=' . $v;
		}

		$menuItem = KrMethods::getMenuItemByLink($link);
		if ($menuItem) {
			return $menuItem->id;
		}

		// 2nd try base with no variables
		if (is_countable($variables) && count($variables)) {
			$link     = $base;
			$menuItem = KrMethods::getMenuItemByLink($link);
			if ($menuItem) {
				return $menuItem->id;
			}
		}

		// 3rd try base plus alternatives
		if (is_countable($alternatives) && count($alternatives)) {
			$link = $base;
			foreach ($alternatives as $k => $v) {
				$link .= '&' . $k . '=' . $v;
			}

			$menuItem = KrMethods::getMenuItemByLink($link);
			if ($menuItem) {
				return $menuItem->id;
			}
		}

		return KrMethods::inputInt('Itemid');
	}

	/**
	 * Get guest pdf documents for download
	 *
	 * @param  object  $item  Item database object
	 *
	 * @throws Exception
	 * @since  2.5.0
	 * @return array
	 */
	public static function getPdfs(object $item): array
	{
		$documents = [];
		$matches   = [];

		if ($item->booking_status >= 10) {
			$matches['regions'] = $item->region_id;
			$matches['types']   = $item->type_id;

			if ($item->booking_status > 35) {
				$matches['propertys'] = $item->property_id;
				$matches['contracts'] = $item->tag;
			}

			$matches = array_unique($matches);
		}

		if (count($matches)) {
			$files = [];
			foreach ($matches as $match => $id) {
				$pdfs = Media\Pdf::listPdfs($match, $id);
				if (count($pdfs) > 0) {
					foreach ($pdfs as $pdf) {
						$path_parts = pathinfo($pdf);
						$filename   = $path_parts['filename'] . '.' . $path_parts['extension'];

						// No duplicates
						if (!in_array($path_parts['filename'], $files, true)) {
							$dl          = KrMethods::route(
								'index.php?option=com_knowres&task=dashboard.download&key=' . $item->id . '&type='
								. $match
								. '&id=' . $id . '&filename=' . $filename
							);
							$link        = '<a href="' . $dl . '">' . $filename . '</a>';
							$documents[] = $link;
							$files[]     = $path_parts['filename'];
						}
					}
				}
			}
		}

		return $documents;
	}

	/**
	 * Get Itemid for region if multi region site
	 *
	 * @param  int  $region_id  ID of region
	 *
	 * @throws Exception
	 * @since  3.3.0
	 * @return int
	 */
	public static function getRegionItemid(int $region_id): int
	{
		$regions = KrFactory::getListModel('regions')->getAllRegions(true);
		$Itemid  = 0;
		if (is_countable($regions) && count($regions) > 1) {
			$Itemid = self::getItemId(
				'com_knowres', 'properties', array('layout'    => 'search',
				                                   'region_id' => $region_id
				             )
			);
		}

		return $Itemid;
	}

	/**
	 * Get name of site template
	 *
	 * @throws RuntimeException|InvalidArgumentException
	 * @since  3.3.0
	 * @return mixed
	 */
	public static function getSiteTemplate(): mixed
	{
		$db    = KrFactory::getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn('template'))
		      ->from($db->qn('#__template_styles'))
		      ->where($db->qn('home') . '=1')
		      ->where($db->qn('client_id') . '=0')
		      ->setLimit(1);

		$db->setQuery($query);

		return $db->loadResult();
	}

	/**
	 * Return array of properties requiring vouchers
	 *
	 * @param  Registry  $params  Component parameters
	 * @param  object    $item    Contract
	 *
	 * @throws Exception
	 * @since  2.5.0
	 * @return string
	 */
	public static function getVoucher(Registry $params, object $item): string
	{
		$voucher = '';
		if ($params->get('guest_download_voucher', 0) && $item->booking_status > 35) {
			$dl      = KrMethods::route(
				'index.php?option=com_knowres&task=dashboard.voucher&format=pdf&id=' . $item->id
			);
			$link    = '<a href="' . $dl . '">'
				. KrMethods::plain('COM_KNOWRES_PDF_ACCOMMODATION_VOUCHER_TITLE')
				. '</a>';
			$voucher = $link;
		}

		return $voucher;
	}

	/**
	 * Login for registered user
	 *
	 * @throws Exception
	 * @since  2.5.0
	 */
	public static function loginUser(): void
	{
		$user_id = KrMethods::getUser()->id;
		if (self::userRequired() && !$user_id) {
			self::redirectLogin();
		}

		$guest_id = KrFactory::getListModel('guests')->getGuestForUser($user_id);
		if (!$guest_id) {
			SiteHelper::redirectLogin();
		}

		$userSession              = new KrSession\User();
		$userData                 = $userSession->getData();
		$userData->user_id        = KrMethods::getUser()->id;
		$userData->db_guest_id    = (int) $guest_id;
		$userData->db_contracts   = [];
		$userData->db_contract_id = 0;
		$userSession->setData($userData);
	}

	/**
	 * Return to correct dashboard
	 *
	 * @throws Exception
	 * @since  2.5.0
	 */
	public static function redirectDashboard(): void
	{
		$Itemid = self::getItemId('com_knowres', 'dashboard');
		KrMethods::redirect(KrMethods::route('index.php?option=com_knowres&view=dashboard&Itemid=' . $Itemid, false));
	}

	/**
	 * Redirect to home page
	 *
	 * @throws Exception
	 * @since  3.3.0
	 */
	public static function redirectHome(): void
	{
		KrMethods::redirect(KrMethods::route(KrMethods::getBase()));
	}

	/**
	 * Redirect to login page
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	public static function redirectLogin(): void
	{
		$params = KrMethods::getParams();
		KrMethods::message(KrMethods::plain('COM_KNOWRES_NOT_LOGGED_IN'));
		KrMethods::redirect(KrMethods::route('index.php?Itemid=' . $params->get('link_login'), false));
	}

	/**
	 * Redirect to property
	 *
	 * @param  int  $id  ID of property
	 *
	 * @throws Exception
	 * @since 1.0.0
	 */
	public static function redirectProperty(int $id): void
	{
		$Itemid = self::getItemId('com_knowres', 'property', ['id' => $id]);
		KrMethods::redirect(
			KrMethods::route('index.php?option=com_knowres&view=property&id=' . $id . '&Itemid=' . $Itemid,
				false
			)
		);
	}

	/**
	 * Redirect to search
	 *
	 * @param  int   $region_id  ID of region for search
	 * @param  bool  $message    Display property no longer available message
	 *
	 * @throws Exception
	 * @since 3.3.0
	 */
	public static function redirectSearch(int $region_id = 0, bool $message = true): void
	{
		$Itemid = SiteHelper::getItemId('com_knowres', 'properties', [
			'layout'    => 'search',
			'region_id' => $region_id
		]);

		$link = 'index.php?Itemid=' . $Itemid;

		if ($message) {
			KrMethods::message(KrMethods::plain('COM_KNOWRES_UNPUBLISHED_PROPERTY'));
		}

		KrMethods::redirect(KrMethods::route($link, false));
	}

	/**
	 * Return to correct dashboard action
	 *
	 * @param  string  $view  View for redirect
	 *
	 * @throws Exception
	 * @since  2.5.0
	 */
	public static function redirectView(string $view): void
	{
		$Itemid = self::getItemId('com_knowres', $view);
		KrMethods::redirect(KrMethods::route('index.php?option=com_knowres&view=' . $view . '&Itemid=' . $Itemid,
		                                     false));
	}

	/**
	 * Set number of free guests - children under free infants age
	 *
	 * @param  int    $sleeps_infant_max  #Number of free infants allowed
	 * @param  int    $sleeps_infant_age  Max age of free infant
	 * @param  array  $child_ages         Ages of chldren
	 *
	 * @since  4.0.0
	 * @return int
	 */
	public static function setFreeGuests(int $sleeps_infant_max, int $sleeps_infant_age, array $child_ages): int
	{
		if (!$sleeps_infant_max) {
			return 0;
		}

		$free = 0;
		foreach ($child_ages as $age) {
			if ($age < $sleeps_infant_age && $free < $sleeps_infant_max) {
				$free++;
			}
		}

		return $free;
	}

	/**
	 * Set guest contracts
	 *
	 * @param  int  $guest_id  ID of guest
	 *
	 * @throws Exception
	 * @since  3.3.0
	 * @return array
	 */
	public static function setGuestContracts(int $guest_id): array
	{
		$items = KrFactory::getListModel('contracts')->getDashboardContracts($guest_id);
		if (!is_countable($items) || !count($items)) {
			KrMethods::message(KrMethods::plain('COM_KNOWRES_DASHBOARD_NO_RESERVATIONS'));
			self::badUser();
		}

		$stubs = [];
		foreach ($items as $c) {
			$tmp                 = [];
			$tmp['contract_id']  = $c->id;
			$tmp['property_id']  = $c->property_id;
			$tmp['guestdata_id'] = $c->guestdata_id;
			$stubs[$c->id]       = $tmp;
		}

		return [$items,
		        $stubs
		];
	}

	/**
	 * Validate that user session matches dashboard request
	 *
	 * @throws RuntimeException|Exception
	 * @since  3.3.0
	 * @return array
	 */
	public static function validateDashboardSession(): array
	{
		$userSession  = new KrSession\User();
		$userData     = $userSession->getData();
		$guest_id     = $userData->db_guest_id;
		$db_contracts = $userData->db_contracts;

		$contract_id = KrMethods::inputInt('key');
		if (!$contract_id) {
			$contract_id = $userData->db_contract_id;
		}
		if (!$guest_id) {
			throw new RuntimeException('Session data did not verify Dashboard request');
		}
		if ($contract_id && $contract_id != 999999999 && !isset($db_contracts[$contract_id])) {
			throw new RuntimeException('Session data did not verify Dashboard request');
		}

		return [$guest_id,
		        $contract_id,
		        $db_contracts
		];
	}

	/**
	 * Check if a user is required
	 *
	 * @since 2.5.0
	 * @return int
	 */
	protected static function userRequired(): int
	{
		$params = KrMethods::getParams();

		return (int) $params->get('create_user', 0);
	}
}