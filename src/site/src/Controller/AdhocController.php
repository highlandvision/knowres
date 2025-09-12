<?php
/**
 * @package    Know Reservations
 * @subpackage Site Controller
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file LICENSE.txt for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Site\Controller;

defined('_JEXEC') or die;

use Exception;
use FilesystemIterator;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Media;
use HighlandVision\KR\TickTock;
use HighlandVision\KR\Translations;
use HighlandVision\KR\Utility;
use InvalidArgumentException;
use Joomla\CMS\Installer\Installer;
use Joomla\CMS\Language\Text;
use Joomla\CMS\Log\Log;
use Joomla\CMS\MVC\Controller\BaseController;
use Joomla\Database\Exception\ExecutionFailureException;
use Joomla\Database\Exception\PrepareStatementFailureException;
use Joomla\DI\Exception\KeyNotFoundException;
use RecursiveDirectoryIterator;
use RecursiveIteratorIterator;
use RuntimeException;
use stdClass;
use UnexpectedValueException;

use function count;
use function explode;
use function file_exists;
use function file_get_contents;
use function is_dir;
use function is_null;
use function json_decode;
use function rmdir;
use function sort;
use function str_replace;
use function substr;
use function unlink;

use const JPATH_ROOT;
use const SORT_NUMERIC;

/**
 * Adhoc controller class for browser access
 *
 * @since        1.0.0
 * @noinspection PhpUnused
 */
class AdhocController extends BaseController
{
	/**
	 * Delete obsolete files and folders
	 *
	 * @throws UnexpectedValueException
	 * @since        4.0.0
	 * @noinspection PhpUnused
	 */
	public function deleteObsolete(): void
	{
		$dir = JPATH_ROOT . '/templates';
		if (file_exists($dir)) {
			if (!is_dir($dir)) {
				unlink($dir);
			}
			else {
				$it = new RecursiveDirectoryIterator($dir, FilesystemIterator::SKIP_DOTS);
				$it = new RecursiveIteratorIterator($it, RecursiveIteratorIterator::CHILD_FIRST);
				foreach ($it as $sub) {
					if (is_dir($sub)) {
						rmdir($sub->getPathname());
					}
					else {
						unlink($sub->getPathname());
					}
				}

				rmdir($dir);
			}
		}
	}

	/**
	 * Update party size, adults, children and child_ages for v4.1 and above
	 *
	 * @throws Exception
	 * @since  4.1.0
	 */
	public function fixupv41PartySize(): void
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
			($db->qn('#__knowres_contract_guestdata', 'a') . 'ON' . $db->qn('a.contract_id') . '=' . $db->qn('c.id')));
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
	 * Fix up database for null values etc
	 *
	 * @throws InvalidArgumentException
	 * @throws KeyNotFoundException
	 * @throws RuntimeException
	 * @since        4.0.0
	 * @noinspection PhpUnused
	 */
	public function fixupv4db(): bool
	{
		$filename = JPATH_ROOT . '/administrator/components/com_knowres/queries/updates/fixupv4.sql';
		if (!file_exists($filename)) {
			echo "no fixup file exists";
			jexit();
		}

		$db     = KrFactory::getDatabase();
		$buffer = file_get_contents($filename);

		$queries = Installer::splitSql($buffer);
		foreach ($queries as $query) {
			$queryString = $query;
			$queryString = str_replace(["\r", "\n"], ['', ' '], substr($queryString, 0, 80));

			try {
				$db->setQuery($query)->execute();
			} catch (ExecutionFailureException|PrepareStatementFailureException $e) {
				$errorMessage = Text::sprintf('JLIB_INSTALLER_ERROR_SQL_ERROR', $e->getMessage());
				Log::add(Text::sprintf('JLIB_INSTALLER_UPDATE_LOG_QUERY', $filename, $queryString), Log::INFO,
				         'Update');
				Log::add($errorMessage, Log::INFO, 'Update');
				Log::add(Text::_('JLIB_INSTALLER_SQL_END_NOT_COMPLETE'), Log::INFO, 'Update');
				Log::add($errorMessage, Log::WARNING, 'jerror');
			}
		}
	}

	/**
	 * Move foreign keys from guest / owner to service
	 * Only for factura users
	 *
	 * @throws Exception
	 * @since        3.4.0
	 * @noinspection PhpUnused
	 */
	public function fkToService(): void
	{
		$factura = KrFactory::getAdminModel('services')->getServicesByPlugin('factura');
		if (!is_countable($factura) || !count($factura)) {
			return;
		}

		foreach ($factura as $f) {
			$service_id = $f->id;
		}

		$guests = KrFactory::getListModel('guests')->getForeignKeys();
		foreach ($guests as $g) {
			try {
				$db = KrFactory::getDatabase();
				$db->transactionStart();

				$xref              = new stdClass();
				$xref->guest_id    = $g->id;
				$xref->foreign_key = $g->foreign_key;
				$xref->state       = $g->state;
				$xref->service_id  = $service_id;
				$xref->created_at  = TickTock::getTS();
				KrFactory::insert('service_xref', $xref);

				$update              = new stdClass();
				$update->id          = $g->id;
				$update->foreign_key = '';
				KrFactory::update('guest', $update);

				$db->transactionCommit();
			} catch (Exception) {
				$db->transactionRollback();
				echo "Failure for guest id $g->id - please update manually";
			}
		}

		$owners = KrFactory::getListModel('owners')->getForeignKeys();
		foreach ($owners as $o) {
			try {
				$db = KrFactory::getDatabase();
				$db->transactionStart();

				$xref              = new stdClass();
				$xref->owner_id    = $o->id;
				$xref->foreign_key = $o->foreign_key;
				$xref->state       = $o->state;
				$xref->service_id  = $service_id;
				$xref->created_at  = TickTock::getTS();
				KrFactory::insert('service_xref', $xref);

				$update              = new stdClass();
				$update->id          = $g->id;
				$update->foreign_key = '';
				KrFactory::update('owner', $update);

				$db->transactionCommit();
			} catch (Exception) {
				$db->transactionRollback();
				echo "Failure for owner id $g->id - please update manually";
			}
		}
	}

	/**
	 * Resize original property images
	 *
	 * @throws RuntimeException
	 * @throws Exception
	 * @since        3.1.0
	 * @noinspection PhpUnused
	 */
	public function resizeoriginal(): void
	{
		$params          = KrMethods::getParams();
		$maxServerWidth  = $params->get('max_upload_width', 2100);
		$maxServerHeight = $params->get('max_upload_height', 1400);

		$rows = KrFactory::getListModel('properties')->getIds(0);
		foreach ($rows as $r) {
			$path  = Media\Images::getImageAbsPath($r->id, 'original');
			$path  .= "/*.{jpg,gif,png,JPG,GIF,PNG}";
			$files = glob($path, GLOB_BRACE);

			if (count($files)) {
				foreach ($files as $f) {
					$imageinfo = getimagesize($f);
					if ($imageinfo[0] < $maxServerWidth || $imageinfo[1] < $maxServerHeight) {
						Media\Images::resizeImage($f, $f, $maxServerWidth, 0, 90);
					}
				}
			}

			break;
		}
	}

	/**
	 * Copy rates year to year
	 *
	 * @throws RuntimeException
	 * @throws Exception
	 * @since        2.4.0
	 * @noinspection PhpUnused
	 */
	public function xxcopyrates(): void
	{
		$old          = '2021-01-01';
		$new          = '2022-01-01';
		$Translations = new Translations();

		$test = KrMethods::inputInt('test', 1);

		$ids = KrFactory::getListModel('properties')->getIds();
		if (!is_countable($ids) || !count($ids)) {
			jexit('no properties found');
		}

		foreach ($ids as $id) {
			$rates = KrFactory::getListModel('properties')->getRatesToCopy($id, $old);

			if ($test) {
				var_dump($rates);
			}

			foreach ($rates as $r) {
				if ($r->valid_to >= $new) {
					echo 'Property ' . $id . ' has new rates';
					break;
				}

				if ($r->state == 1) {
					$new              = new stdClass();
					$new->id          = 0;
					$new->property_id = $r->property_id;
					$new->valid_from  = TickTock::modifyYears($r->valid_from);
					$new->valid_to    = TickTock::modifyYears($r->valid_to);
					$new->rate        = $r->rate;
					$new->min_nights  = $r->min_nights;
					$new->max_nights  = $r->max_nights;
					$new->min_guests  = $r->min_guests;
					$new->max_guests  = $r->max_guests;
					$new->ignore_pppn = $r->ignore_pppn;
					$new->start_day   = $r->start_day;
					$new->more_guests = $r->more_guests;
					$new->state       = 0;
					$new->created_at  = TickTock::getTS();
					$new->created_by  = 0;

					if ($test) {
						var_dump($new);
					}
					else {
						KrFactory::insert('rate', $new);
						if (!is_null($r->name)) {
							$Translations->updateDefault('rate', $new->id, 'name', $r->name);
						}
					}
				}
			}

			if ($test) {
				break;
			}
		}

		$Translations->cleanTranslationCache('rates');
	}
}