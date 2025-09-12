<?php
/**
 * @package     Know Reservations
 * @subpackage  Installation
 * @copyright   Copyright (C) 2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

/** @noinspection PhpUnused */
/** @noinspection PhpUnusedParameterInspection */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Upgrade;
use HighlandVision\KR\Utility;
use Joomla\CMS\Factory;
use Joomla\CMS\Installer\Installer;
use Joomla\CMS\Installer\InstallerAdapter;
use Joomla\CMS\Language\Text;
use Joomla\CMS\Log\Log;
use Joomla\Database\Exception\ExecutionFailureException;
use Joomla\Database\Exception\PrepareStatementFailureException;
use Joomla\Database\ParameterType;

/**
 * Installation/Uninstallation script
 *
 * @since 1.0.0
 */
class Pkg_KnowresInstallerScript
{
	/** @var false|string Current installed version */
	private string|false $old_version;

	/**
	 * Fix up database for null values etc
	 *
	 * @since   4.0.0
	 */
	public function fixupv4(): bool
	{
		$filename = JPATH_ROOT . '/administrator/components/com_knowres/queries/updates/fixupv4.sql';
		if (!file_exists($filename)) {
			return true;
		}

		$db     = Factory::getDbo();
		$buffer = file_get_contents($filename);

		$queries = Installer::splitSql($buffer);
		foreach ($queries as $query) {
			$queryString = $query;
			$queryString = str_replace(["\r", "\n"], ['', ' '], substr($queryString, 0, 80));

			try {
				$db->setQuery($query)->execute();
			} catch (ExecutionFailureException|PrepareStatementFailureException $e) {
				$errorMessage = Text::sprintf('JLIB_INSTALLER_ERROR_SQL_ERROR', $e->getMessage());
				Log::add(Text::sprintf('JLIB_INSTALLER_UPDATE_LOG_QUERY', $filename, $queryString),
					Log::INFO,
					'Update');
				Log::add($errorMessage, Log::INFO, 'Update');
				Log::add(Text::_('JLIB_INSTALLER_SQL_END_NOT_COMPLETE'), Log::INFO, 'Update');
				Log::add($errorMessage, Log::WARNING, 'jerror');
			}
		}

		return true;
	}

	/**
	 * Builds a standard select query to produce better DRY code in this script.
	 * This should produce a single unique cell which is json encoded - it will then
	 * return an associated array with this data in.
	 *
	 * @param  string  $element     The element to get from the query
	 * @param  string  $table       The table to search for the data in
	 * @param  string  $column      The column of the database to search from
	 * @param  mixed   $identifier  The integer id or the string
	 *
	 * @since  3.6
	 * @return mixed  Associated array containing data from the cell
	 */
	public function getItemArray(string $element, string $table, string $column, mixed $identifier): mixed
	{
		$db = Factory::getDbo();

		$paramType = is_numeric($identifier) ? ParameterType::INTEGER : ParameterType::STRING;

		$query = $db->getQuery(true)
			->select($db->quoteName($element))
			->from($db->quoteName($table))
			->where($db->quoteName($column) . ' = :id')
			->bind(':id', $identifier, $paramType);
		$db->setQuery($query);
		$data = $db->loadResult();

		if ($data) {
			return json_decode($data, true);
		} else {
			return false;
		}
	}

	/**
	 * Called on installation
	 *
	 * @param  InstallerAdapter  $parent  The object responsible for running this script
	 *
	 * @throws Exception
	 * @return bool  True on success
	 */
	public function install(
		InstallerAdapter $parent
	): bool
	{
		Log::add('KR has been installed', Log::INFO, 'Update');

		return true;
	}

	/**
	 * Called after any type of action
	 *
	 * @param  string            $type    Which action is happening (install|uninstall|discover_install|update)
	 * @param  InstallerAdapter  $parent  The object responsible for running this script
	 *
	 * @throws Exception
	 * @return bool  True on success
	 */
	public function postflight(string $type, InstallerAdapter $parent): bool
	{
		if ($type == 'uninstall') {
			return true;
		}

		$this->deleteFolders();

		// Delete old modules / plugins
		$this->deleteDeprecated($this->getVersionNew($parent));

		JLoader::registerNamespace('HighlandVision\\Component\\Knowres\\Administrator\\',
			JPATH_ADMINISTRATOR . '/components/com_knowres/src',
			true,
			true);
		JLoader::registerNamespace('HighlandVision\\KR\\', JPATH_LIBRARIES . '/highlandvision/kr/src', false, true);
		require_once(JPATH_ROOT . '/media/com_knowres/vendor/autoload.php');

		Upgrade\Upgrade::insertDefaults();
		Upgrade\Upgrade::importFeatures();
		Upgrade\Upgrade::insertSettings();
		Upgrade\Upgrade::removeSettings();
//		Upgrade\Upgrade::historyTables();
		Upgrade\Upgrade::paramsToAgency();
		Upgrade\Upgrade::deleteOldData();

		if (!$this->old_version) {
			Log::add('Install complete', Log::INFO, 'Update');

			return true;
		}

		// Database changes
		Upgrade\UpgradeDb::forV320();
		Upgrade\UpgradeDb::forV321();
		Upgrade\UpgradeDb::forV330();
		Upgrade\UpgradeDb::forV331();
		Upgrade\UpgradeDb::forV333();
		Upgrade\UpgradeDb::forV400();
		Upgrade\UpgradeDb::forV410();
		if (version_compare($this->old_version, '4.0.0', '<')) {
			$this->fixupv4();
		}
		Upgrade\UpgradeDb::forV510();

		if (version_compare($this->old_version, '4.1.0', '<')) {
			$this->updatePartySize();
		}

		Log::add('Deleting deprecated modules and plugins', Log::INFO, 'Update');

		$this->deleteDeprecated($this->getVersionNew($parent));

		Log::add('Removing old files', Log::INFO, 'Update');
		$this->renameFolders();
		$this->deleteFolders();
		$this->deleteFiles();

		Log::add('Upgrade complete', Log::INFO, 'Update');

		return true;
	}

	/**
	 * Called before any type of action
	 *
	 * @param  string            $type    Which action is happening (install|uninstall|discover_install|update)
	 * @param  InstallerAdapter  $parent  The object responsible for running this script
	 *
	 * @throws Exception
	 * @return bool  True on success
	 */
	public function preflight(string $type, InstallerAdapter $parent): bool
	{
		if (version_compare(JVERSION, '5.0.0', 'lt')) {
			Log::add('Joomla version must be at least v5.0');
			Factory::getApplication()->enqueueMessage('Joomla version must be at least v5.0', 'error');

			return false;
		}

		$this->old_version = $this->getVersionOld($parent);

		if ($type == 'uninstall' || !$this->old_version) {
			return true;
		}

		Log::add('Joomla Version ' . JVERSION . ' Checking for pre-installation tasks', Log::INFO, 'install');
		Log::add('Upgrading from KR Version ' . $this->old_version, Log::INFO, 'install');
		Log::add('Upgrading to KR Version ' . $this->getVersionNew($parent), Log::INFO, 'install');

		if (version_compare(JVERSION, '4.0.0', '>=') && version_compare($this->old_version, '4.0.0', 'le')) {
			$this->preFour();
			Log::add('Upgrading to v4 old v3 code deleted', Log::INFO, 'install');
		}

		return true;
	}

	/**
	 * Called on uninstallation
	 *
	 * @param  InstallerAdapter  $parent  The object responsible for running this script
	 *
	 * @throws Exception
	 * @return bool
	 */
	public function uninstall(InstallerAdapter $parent): bool
	{
		Log::add('KR has been uninstalled', Log::INFO, 'install');

		return true;
	}

	/**
	 * Called on update
	 *
	 * @param  InstallerAdapter  $parent  The object responsible for running this script
	 *
	 * @throws Exception
	 * @return  bool  True on success
	 */
	public function update(InstallerAdapter $parent): bool
	{
		Log::add('KR has been updated to version ' . $this->getVersionNew($parent), Log::INFO, 'install');

		return true;
	}

	/**
	 * Update party size, adults, children and child_ages for v4.1 and above
	 *
	 * @throws Exception
	 * @since  4.1.0
	 */
	public function updatePartySize(): void
	{
		$db    = KrFactory::getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn('c.id', 'c_id'));
		$query->select($db->qn('c.guests', 'c_guests'));
		$query->select($db->qn('a.contract_id', 'contract_id'));
		$query->select($db->qn('a.adults', 'cd_adults'));
		$query->select($db->qn('a.children', 'cd_children'));
		$query->select($db->qn('a.infants', 'cd_infants'));
		$query->select($db->qn('a.guestinfo', 'cd_guestinfo'));
		$query->from($db->qn('#__knowres_contract', 'c'));
		$query->join('LEFT',
			($db->qn('#__knowres_contract_guestdata', 'a') . 'ON' . $db->qn('a.contract_id') . '='
			 . $db->qn('c.id')));
		$query->where($db->qn('c.black_booking') . '=0');
		$db->setQuery($query);

		$rows = $db->loadObjectList();
		foreach ($rows as $r) {
			$adults     = !empty($r->cd_adults) ? $r->cd_adults : $r->c_guests;
			$children   = 0;
			$infants    = !empty($r->cd_infants) ? $r->cd_infants : 0;
			$gi_count   = !is_null($r->cd_guestinfo) ? json_decode($r->cd_guestinfo) : 0;
			$child_ages = [];
			if (!empty($r->cd_children)) {
				$children   = str_replace('Under 1', 0, $r->cd_children);
				$child_ages = explode(',', $children);

				for ($i = 1; $i <= $infants; $i++) {
					$child_ages[] = '0';
				}

				sort($child_ages, SORT_NUMERIC);
				$children = count($child_ages);
			}

			$update             = new stdClass();
			$update->id         = $r->c_id;
			$update->adults     = $adults;
			$update->children   = $children;
			$update->child_ages = Utility::encodeJson($child_ages);
			$update->guests     = $r->c_guests + $r->cd_infants;
			$update->infants    = 0;
			KrFactory::update('contract', $update);
		}
	}

	/**
	 * Remove deprecated modules / plugins
	 *
	 * @param  string  $version  Version being installed
	 *
	 * @throws Exception
	 * @since  3.2.1
	 */
	protected function deleteDeprecated(string $version): void
	{
		if ($version >= '3.2.1') {
			Log::add('Uninstalling Deprecated KR Extensions', Log::INFO, 'install');

			$this->deleteItem('plugin', 'knowresssl');
		}
		if ($version >= '4.0.0') {
			Log::add('Uninstalling Deprecated KR Extensions', Log::INFO, 'install');

			$this->deleteItem('library', 'knowres');
			$this->deleteItem('plugin', 'knowreslib', 'system');
			$this->deleteItem('plugin', 'knowreservations', 'osmap');
		}
		if ($version >= '5.0.0') {
			Log::add('Uninstalling Deprecated KR Extensions', Log::INFO, 'install');

			$this->deleteItem('plugin', 'knowresmega', 'system');
		}
	}

	/**
	 * Remove obsolete files
	 *
	 * @since 1.0.0
	 */
	protected function deleteFiles(): void
	{
		$oldies = [];
		//3.3.0
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/controllers/contracts.json.php';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/controllers/dynamicrate.php';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/controllers/dynamicrates.php';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/controllers/gantt.json.php';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/controllers/gantt.raw.php';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/controllers/interface.php';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/controllers/interfacelog.php';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/controllers/interfacelogs.php';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/controllers/interfacequeue.php';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/controllers/interfacequeues.php';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/controllers/interfaces.php';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/controllers/interfacexref.php';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/controllers/interfacexrefs.php';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/layouts/toolbar/bookingstatus.php';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/layouts/toolbar/link.php';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/models/fields/country.php';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/models/fields/extras.php';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/models/fields/filterinterface.php';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/models/fields/guestlist.php';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/models/fields/jsonyield.php';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/models/fields/listinterfaceical.php';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/models/fields/timecreated.php';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/models/fields/timeupdated.php';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/models/forms/dynamicrate.xml';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/models/forms/filter_dynamicrate.xml';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/models/forms/filter_interfacelogs.xml';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/models/forms/filter_interfacequeues.xml';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/models/forms/filter_interfaces.xml';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/models/forms/filter_interfacexrefs.xml';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/models/rules/filter_interface.xml';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/models/rules/filter_interfacexref.xml';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/models/rules/filter_interfacexrefproperty.xml';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/models/forms/dynamicrate.xml';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/models/forms/dynamicrates.xml';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/models/forms/interface.xml';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/models/forms/interface_beyond.xml';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/models/forms/interface_check.xml';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/models/forms/interface_cybersource.xml';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/models/forms/interface_exchange.xml';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/models/forms/interface_expedia.xml';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/models/forms/interface_factura.xml';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/models/forms/interface_ha.xml';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/models/forms/interface_helpscout.xml';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/models/forms/interface_homeaway.xml';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/models/forms/interface_ical.xml';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/models/forms/interface_kigo.xml';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/models/forms/interface_mailchimp.xml';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/models/forms/interface_paypal.xml';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/models/forms/interface_redsys.xml';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/models/forms/interface_ru.xml';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/models/forms/interface_stripe.xml';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/models/forms/interface_vrbo.xml';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/models/forms/interface_vreasy.xml';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/models/forms/interface_wire.xml';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/models/forms/interface_wireint.xml';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/models/forms/interface_xero.xml';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/models/forms/interfacelog.xml';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/models/forms/interfacequeue.xml';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/models/forms/interfacexref.xml';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/models/forms/service_homeaway.xml';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/models/forms/service_cybersource.xml';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/models/gantt.php';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/models/interface.php';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/models/interfacelog.php';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/models/interfacelogs.php';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/models/interfacequeue.php';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/models/interfacequeues.php';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/models/interfaces.php';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/models/interfacexref.php';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/models/interfacexrefs.php';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/tables/dynamicrate.php';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/tables/interface.php';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/tables/interfacelog.php';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/tables/interfacequeue.php';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/tables/interfacexref.php';
		$oldies[] = JPATH_ROOT . '/libraries/knowres/site/reservation.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/controllers/contract.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/controllers/contracts.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/controllers/interface.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/controllers/paymentform.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/controllers/payment.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/controllers/radashboard.pdf.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/controllers/radashboard.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/controllers/raguestdataform.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/controllers/raguestform.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/controllers/rapayment.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/controllers/reviews.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/controllers/upgrade.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/layouts/confirm/header.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/layouts/emails/content.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/models/forms/calendar.xml';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/models/forms/contract.xml';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/models/forms/contractguestdata.xml';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/models/forms/guest.xml';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/models/calendar.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/models/paymentform.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/models/raguestdataform.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/models/raguestform.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/models/rapayment.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/views/view.map.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/views/properties/tmpl/map.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/views/properties/tmpl/default_head.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/views/properties/tmpl/map.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/views/properties/tmpl/raw_solo.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/views/property/tmpl/default_availability.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/views/property/tmpl/default_availability_calendar.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/views/property/tmpl/default_calendar.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/views/property/tmpl/default_overview_slideshowtab.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/views/property/tmpl/default_slideshowtab.php';
		$oldies[] = JPATH_ROOT . '/modules/mod_knowres_search/tmpl/ip.php';
		$oldies[] = JPATH_ROOT . '/modules/mod_knowres_search/tmpl/ip-sidebar.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/views/property/tmpl/default_slideshowtab.php';
		//3.3.1
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/models/fields/filteremailtemplate.php';
		$oldies[] = JPATH_ROOT . '/libraries/knowres/src/contract/Payment.php';
		$oldies[] = JPATH_ROOT . '/libraries/knowres/src/Service/Gateway/Bankia.php';
		$oldies[] = JPATH_ROOT . '/libraries/knowres/src/Service/Gateway/Wireint.php';
		$oldies[] = JPATH_ROOT . '/media/com_knowres/images/bath.svg';
		$oldies[] = JPATH_ROOT . '/media/com_knowres/images/index.html';
		$oldies[] = JPATH_ROOT . '/media/com_knowres/images/pdf.png';
		$oldies[] = JPATH_ROOT . '/media/com_knowres/images/z-tabs-icons.png';
		$oldies[] = JPATH_ROOT . '/modules/mod_knowres_search/tmpl/bhh.php';
		$oldies[] = JPATH_ROOT . '/modules/mod_knowres_search/tmpl/bhh-sidebar.php';
		$oldies[] = JPATH_ROOT . '/modules/mod_knowres_search/tmpl/bhh-sidebar_ajax.php';
		$oldies[] = JPATH_ROOT . '/modules/mod_knowres_search/tmpl/bizflats.php';
		$oldies[] = JPATH_ROOT . '/modules/mod_knowres_search/tmpl/bizflats-sidebar.php';
		$oldies[] = JPATH_ROOT . '/modules/mod_knowres_search/tmpl/bizflats-sidebar_ajax.php';
		$oldies[] = JPATH_ROOT . '/modules/mod_knowres_search/tmpl/cv.php';
		$oldies[] = JPATH_ROOT . '/modules/mod_knowres_search/tmpl/region.php';
		$oldies[] = JPATH_ROOT . '/modules/mod_knowres_search/tmpl/region-sidebar.php';
		//3.3.3
		$oldies[] = JPATH_ROOT . '/components/com_knowres/controllers/review.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/models/fields/mobicalendar.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/models/rules/interface.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/models/rules/interfacexref.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/models/rules/interfacexrefduplicate.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/models/rules/interfacexrefproperty.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/models/dynamicrate.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/models/dynamicrates.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/views/dashboard/view.planroute.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/views/dashboard/tmpl/overview_header.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/views/dashboard/tmpl/planroute.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/views/properties/tmpl/category_item.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/views/properties/tmpl/category_items.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/views/properties/tmpl/discount_discount.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/views/properties/tmpl/discount_item.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/views/properties/tmpl/new_items.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/views/properties/tmpl/new_item_item.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/views/properties/tmpl/raw_infowindow.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/views/property/view.ajaxprice.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/views/property/tmpl/fndtabs_default.php';
		//4.0.0
		$oldies[] = JPATH_ROOT . '/administrator/manifests/libraries/knowres.xml';
		//4.0.1
		$oldies[] = JPATH_ROOT . '/modules/mod_knowres_featured/tmpl/solo.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/layouts/modules/featured/solo.php';
		//4.1.0
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/tmpl/contractguestdata/edit_contactinfo.php';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/tmpl/contractguestdata/edit_guestinfo.php';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/tmpl/contractguestdataform/edit_partyinfo.php';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/src/Field/Formpartysizefield.php';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/layouts/contract/form/guests';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/layouts/contract/show/guestdata/partysize.php';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/src/forms/partysize.xml';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/tmpl/contractguestdataform/default_partyinfo.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/src/Field/ListguestsField.php';
		//5.0.0
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/src/Field/ListpartysizeField.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/layouts/form/field/checkover.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/layouts/form/field/partysize.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/layouts/form/field/switch.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/layouts/properties/basicgrid.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/layouts/properties/category.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/layouts/properties/featured.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/layouts/properties/grid.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/layouts/properties/list.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/layouts/properties/pricedisplay.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/layouts/property/partysize.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/src/Field/ListpartysizequoteField.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/tmpl/properties/default_menubar.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/tmpl/properties/raw_filters_top.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/tmpl/properties/raw_browse.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/tmpl/properties/raw_items.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/tmpl/properties/search.xml';
		$oldies[] = JPATH_ROOT . '/libraries/highlandvision/kr/src/Search.php';
		$oldies[] = JPATH_ROOT . '/modules/mod_knowres_search/tmpl/hero.php';
		$oldies[] = JPATH_ROOT . '/modules/mod_knowres_search/tmpl/_guests.php';
		$oldies[] = JPATH_ROOT . '/modules/mod_knowres_search/tmpl/_regions.php';
		$oldies[] = JPATH_ROOT . '/modules/mod_knowres_search/tmpl/_regions.php';
		$oldies[] = JPATH_ROOT . '/modules/mod_knowres_autosearch/mod_knowres_autosearch.php';
		$oldies[] = JPATH_ROOT . '/modules/mod_knowres_carousel/mod_knowres_carousel.php';
		$oldies[] = JPATH_ROOT . '/modules/mod_knowres_destination/mod_knowres_destination.php';
		$oldies[] = JPATH_ROOT . '/modules/mod_knowres_featured/mod_knowres_featured.php';
		$oldies[] = JPATH_ROOT . '/modules/mod_knowres_imagegrid/mod_knowres_imagegrid.php';
		$oldies[] = JPATH_ROOT . '/modules/mod_knowres_mailchimp/forms/mod_knowres_mailchimp.xml';
		$oldies[] = JPATH_ROOT . '/modules/mod_knowres_mailchimp/mod_knowres_mailchimp.php';
		$oldies[] = JPATH_ROOT . '/modules/mod_knowres_properties/mod_knowres_properties.php';
		$oldies[] = JPATH_ROOT . '/modules/mod_knowres_regions/mod_knowres_regions.php';
		$oldies[] = JPATH_ROOT . '/modules/mod_knowres_search/forms/mod_knowres_search.xml';
		$oldies[] = JPATH_ROOT . '/modules/mod_knowres_searchbymap/mod_knowres_searchbymap.php';
		$oldies[] = JPATH_ROOT . '/modules/mod_knowres_slideshow/mod_knowres_slideshow.php';
		$oldies[] = JPATH_ROOT . '/modules/mod_knowres_spotlight/mod_knowres_spotlight.php';
		//5.1.0
		//Bedtypes
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/forms/bedtype.xml';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/forms/json_bedtypes.xml';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/layouts/form/field/json/bedtypes.php';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/layouts/history/bed_types.php';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/src/Controller/BedtypeController.php';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/src/Controller/BedtypesController.php';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/src/Field/JsonbedtypesField.php';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/src/Model/BedtypeModel.php';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/src/Model/BedtypesModel.php';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/src/Table/BedtypeTable.php';
		//Referrals
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/forms/filter_referrals.xml';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/forms/referral.xml';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/src/Controller/ReferralController.php';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/src/Controller/ReferralsController.php';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/src/Field/ListreferralField.php';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/src/Model/ReferralModel.php';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/src/Model/ReferralsModel.php';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/src/Table/ReferralTable.php';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/tmpl/property/edit_bedtypes.php';
		// Enquiry
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/forms/room.xml';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/layouts/contract/daily/enquiry.php';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/layouts/form/field/json/guesttypes.php';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/layouts/form/field/json/roomtypes.php';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/src/Controller/RoomController.php';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/src/Controller/RoomsController.php';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/src/Field/JsonguesttypesField.php';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/src/Field/JsonroomtypesField.php';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/src/Model/RoomModel.php';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/src/Model/RoomsModel.php';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/src/tmpl/contracts/daily_enquiry.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/forms/enquiry.xml';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/tmpl/property/default_enquiry.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/src/Controller/EnquiryController.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/src/Field/FdatepickerField.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/src/Field/JsaextrasField.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/src/Model/EnquiryModel.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/tmpl/property/default_enquiry.php';
		$oldies[] = JPATH_ROOT . '/libraries/highlandvision/kr/src/Core/Enquiry.php';
		// Rates text (moved moved to a custom template)
		$oldies[] = JPATH_ROOT . '/components/com_knowres/tmpl/property/default_rates.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/tmpl/property/default_rates_longstay.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/tmpl/property/default_rates_managed.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/tmpl/property/default_rates_nonmanaged.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/tmpl/property/default_rates_shortbreaks.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/tmpl/property/default_rates_shortstay.php';
		// Card discounts and pricing refactored
		$oldies[] = JPATH_ROOT . '/components/com_knowres/layouts/properties/discount.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/layouts/properties/discounts.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/layouts/properties/grid/card/pricing.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/layouts/properties/list/card/slideshow/pricing.php';
		// Adhoc
		$oldies[] = JPATH_ROOT . '/components/com_knowres/layouts/properties/thumb/thumb.php';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/tmpl/properties/raw_thumb.php';
		$oldies[] = JPATH_ROOT . '/modules/mod_knowres_slideshow/tmpl/image.php';
		$oldies[] = JPATH_ROOT . '/modules/mod_knowres_slideshow/tmpl/solid.php';

		$this->deleteObsolete($oldies);
	}

	/**
	 * Remove obsolete folders
	 *
	 * @since 1.0.0
	 */
	protected function deleteFolders(): void
	{
		$oldies = [];
		// V3.3.0
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/assets/css';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/assets/fonts';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/assets/js';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/assets/scss';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/assets/images/interfaces';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/layouts/pdf';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/views/dynamicrate';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/views/dynamicrates';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/views/interface';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/views/interfacelog';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/views/interfacelogs';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/views/interfacequeue';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/views/interfacequeues';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/views/interfaces';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/views/interfacexref';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/views/interfacexrefs';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/views/radashboard';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/views/raguestdataform';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/views/raguestform';
		$oldies[] = JPATH_ROOT . '/components/com_knowres/views/rapayment';
		$oldies[] = JPATH_ROOT . '/media/com_knowres/assets/vendor';
		//V3.3.1
		$oldies[] = JPATH_ROOT . '/media/com_knowres/data';
		$oldies[] = JPATH_ROOT . '/media/com_knowres/images/interfaces';
		//V4.0.0
		$oldies[] = JPATH_ROOT . '/libraries/knowres';
		$oldies[] = JPATH_ROOT . '/media/com_knowres/assets';
		//V4.2.0
		$oldies[] = JPATH_ROOT . '/components/com_knowres/layouts/modules';
		//V5.0.0
		$oldies[] = JPATH_ROOT . '/modules/mod_knowres_imagegrid/form';
		//V5.1.0
		// Bedtypes
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/src/View/Bedtype';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/src/View/Bedtypes';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/tmpl/bedtype';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/tmpl/bedtypes';
		//Referrals
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/src/View/Referral';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/src/View/Referrals';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/tmpl/referral';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/tmpl/referrals';
		//Rooms
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/src/View/Room';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/src/View/Rooms';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/tmpl/room';
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres/tmpl/rooms';
		// Adhoc
		$oldies[] = JPATH_ROOT . '/components/com_knowres/layouts/form/field/search';
		//V5.2.0

		$this->deleteObsolete($oldies);
	}

	/**
	 * Uninstall extension
	 *
	 * @param  string   $type     Extension type
	 * @param  string   $element  Element
	 * @param  ?string  $folder   Folder
	 *
	 * @throws Exception
	 * @since  3.2.1
	 */
	protected function deleteItem(string $type, string $element, ?string $folder = null): void
	{
		$db    = Factory::getDbo();
		$query = $db->getQuery(true);

		$conditions = [
			$db->qn('type') . '=' . $db->q($type),
			$db->qn('element') . '=' . $db->q($element)
		];

		if (!is_null($folder)) {
			$db->qn('folder') . '=' . $db->q($folder);
		}

		$query->delete($db->qn('#__extensions'));
		$query->where($conditions);
		$db->setQuery($query);
		$result = $db->execute();

		$text = 'The deprecated ' . $type . ' ' . $element;
		if ($result) {
			$text .= ' uninstalled successfully';
		} else {
			$text .= ' could not be uninstalled please uninstall manually';
		}

		Log::add($text, Log::INFO, 'Update');
	}

	/**
	 * Delete obsolete files and folders
	 *
	 * @throws UnexpectedValueException
	 * @since  4.0.0
	 */
	protected function deleteObsolete(array $obsolete): void
	{
		foreach ($obsolete as $dir) {
			if (file_exists($dir)) {
				if (!is_dir($dir)) {
					unlink($dir);
				} else {
					$it = new RecursiveDirectoryIterator($dir, FilesystemIterator::SKIP_DOTS);
					$it = new RecursiveIteratorIterator($it, RecursiveIteratorIterator::CHILD_FIRST);
					foreach ($it as $sub) {
						if (is_dir($sub)) {
							rmdir($sub->getPathname());
						} else {
							unlink($sub->getPathname());
						}
					}

					rmdir($dir);
				}
			}
		}
	}

	/**
	 * Get the currently installed KR version
	 *
	 * @param  InstallerAdapter  $parent  Calling function
	 *
	 * @since  4.0.0
	 * @return false|string
	 */
	protected function getVersionNew(InstallerAdapter $parent): false|string
	{
		$version = $parent->getManifest()->version;
		if (empty($version)) {
			return false;
		}

		return $version;
	}

	/**
	 * Get the currently installed KR version
	 *
	 * @param  InstallerAdapter  $parent  Calling function
	 *
	 * @since  4.0.0
	 * @return false|string
	 */
	protected function getVersionOld(InstallerAdapter $parent): false|string
	{
		try {
			$manifest = $this->getItemArray('manifest_cache', '#__extensions', 'element', 'pkg_knowres');
		} catch (Exception) {
			return false;
		}

		return !empty($manifest['version']) ? $manifest['version'] : false;
	}

	/**
	 * Delete all v3 files before v4 install
	 *
	 * @since  4.0.0
	 */
	protected function preFour(): void
	{
		$oldies   = [];
		$oldies[] = JPATH_ROOT . '/administrator/components/com_knowres';
		$oldies[] = JPATH_ROOT . '/administrator/cache/com_knowres_contracts';
		$oldies[] = JPATH_ROOT . '/administrator/cache/com_knowres_translations';
		$oldies[] = JPATH_ROOT . '/components/com_knowres';
		$oldies[] = JPATH_ROOT . '/libraries/knowres';
		$oldies[] = JPATH_ROOT . '/media/com_knowres';
		$oldies[] = JPATH_ROOT . '/modules/mod_knowres_autosearch';
		$oldies[] = JPATH_ROOT . '/modules/mod_knowres_carousel';
		$oldies[] = JPATH_ROOT . '/modules/mod_knowres_destination';
		$oldies[] = JPATH_ROOT . '/modules/mod_knowres_featured';
		$oldies[] = JPATH_ROOT . '/modules/mod_knowres_imagegrid';
		$oldies[] = JPATH_ROOT . '/modules/mod_knowres_mailchimp';
		$oldies[] = JPATH_ROOT . '/modules/mod_knowres_properties';
		$oldies[] = JPATH_ROOT . '/modules/mod_knowres_regions';
		$oldies[] = JPATH_ROOT . '/modules/mod_knowres_search';
		$oldies[] = JPATH_ROOT . '/modules/mod_knowres_searchbymap';
		$oldies[] = JPATH_ROOT . '/modules/mod_knowres_slideshow';
		$oldies[] = JPATH_ROOT . '/modules/mod_knowres_spotlight';
		$oldies[] = JPATH_ROOT . '/plugins/system/knowreslib';
		$oldies[] = JPATH_ROOT . '/plugins/system/knowresssl';
		$oldies[] = JPATH_ROOT . '/plugins/system/knowresmega';
		$oldies[] = JPATH_ROOT . '/plugins/system/knowresredirect';
		$oldies[] = JPATH_ROOT . '/plugins/osmap/knowreservations';

		$this->deleteObsolete($oldies);
	}

	/**
	 * Rename any folders
	 *
	 * @since 1.0.0
	 */
	protected function renameFolders(): void
	{
		$dir = JPATH_ROOT . '/images/map/';
		if (is_dir($dir)) {
			rename($dir, JPATH_ROOT . '/images/krmap/');
		}
	}
}