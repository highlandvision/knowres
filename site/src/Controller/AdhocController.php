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
use JetBrains\PhpStorm\NoReturn;
use Joomla\CMS\MVC\Controller\BaseController;
use RecursiveDirectoryIterator;
use RecursiveIteratorIterator;
use RuntimeException;
use stdClass;
use UnexpectedValueException;

use function count;
use function explode;
use function file_exists;
use function is_dir;
use function rmdir;
use function unlink;

use const JPATH_ROOT;

/**
 * Adhoc controller class for browser access
 *
 * @since  1.0.0
 */
class AdhocController extends BaseController
{
	/**
	 * Delete obsolete files and folders
	 *
	 * @throws UnexpectedValueException
	 * @since  4.0.0
	 */
	public function deleteObsolete()
	{
		$dir = JPATH_ROOT . '/templates';
		//		foreach ($obsolete as $dir)
		//		{
		if (file_exists($dir))
		{
			if (!is_dir($dir))
			{
				unlink($dir);
			}
			else
			{
				$it = new RecursiveDirectoryIterator($dir, FilesystemIterator::SKIP_DOTS);
				$it = new RecursiveIteratorIterator($it, RecursiveIteratorIterator::CHILD_FIRST);
				foreach ($it as $sub)
				{
					if (is_dir($sub))
					{
						rmdir($sub->getPathname());
					}
					else
					{
						unlink($sub->getPathname());
					}
				}

				rmdir($dir);
			}
		}
		//		}
	}

	/**
	 * Update guests numbers from contract guest data to contract (V4.0)
	 *
	 * @throws Exception
	 * @since  4.0.0
	 */
	#[NoReturn] public function gueststocontract()
	{
		$db    = KrFactory::getDatabase();
		$query = $db->getQuery(true);
		$query->select($db->qn(['a.contract_id', 'a.adults', 'a.children', 'a.infants']))
		      ->from($db->qn('#__knowres_contract_guestdata', 'a'))
		      ->select($db->qn('c.guests', 'guests'))
		      ->join('LEFT',
			      ($db->qn('#__knowres_contract', 'c') . 'ON' . $db->qn('c.id') . '=' . $db->qn('a.contract_id')))
		      ->where($db->qn('cancelled') . '=0')
		      ->where($db->qn('black_booking') . '=0')
		      ->where($db->qn('state') . '=1')
		      ->where($db->qn('arrival') . '>=' . $db->q('2020-01-01'));
		$db->setQuery($query);
		$rows = $db->loadObjectList();

		foreach ($rows as $r)
		{
			$adults   = $r->adults;
			$children = 0;
			if (!empty($r->children))
			{
				$r->children = str_replace('Under 1', 0, $r->children);
				$children    = count(explode(',', $r->children));
			}
			$child_ages = $r->children;

			$tmp = $r->infants;
			while ($tmp > 0)
			{
				$child_ages = '0,' . $child_ages;
				$children++;
				$tmp--;
			}

			if (!empty($child_ages))
			{
				$child_ages = explode(',', $child_ages);
			}
			else
			{
				$child_ages = [];
			}
			//			$children = count($child_ages) + (int) $r->infants;

			if (!$adults)
			{
				echo "Reservation " . $r->contract_id . ' no guest numbers entered yet<br>';
			}
			else if ($adults + $children != $r->guests + $r->infants)
			{
				echo "Reservation " . $r->contract_id . ' guests do not tally with adults and children<br>';
				echo $adults, $children, $r->guests, $r->infants . '<br>';
			}
			else if (count($child_ages) != $children)
			{
				echo "Reservation " . $r->contract_id . ' child ages and children count do not match<br>';
			}
			else
			{
				echo "Reservation " . $r->contract_id . ' no mismatches reported<br>';
			}
			//			$update             = new stdClass();
			//			$update->id         = $r->contract_id;
			//			$update->adults     = $r->adults;
			//			$update->children   = $children;
			//			$update->infants    = $infants;
			//			$update->child_ages = Utility::encodeJson($child_ages);
			//			KrFactory::update('contract', $update);
		}

		jexit();
	}

	/**
	 * Resize original property images
	 *
	 * @throws RuntimeException
	 * @throws Exception
	 * @since  3.1.0
	 */
	public function resizeoriginal()
	{
		$params          = KrMethods::getParams();
		$maxServerWidth  = $params->get('max_upload_width', 2100);
		$maxServerHeight = $params->get('max_upload_height', 1400);

		$rows = KrFactory::getListModel('properties')->getIds(0);
		foreach ($rows as $r)
		{
			$path  = Media\Images::getImageAbsPath($r->id, 'original');
			$path  .= "/*.{jpg,gif,png,JPG,GIF,PNG}";
			$files = glob($path, GLOB_BRACE);

			if (count($files))
			{
				foreach ($files as $f)
				{
					$imageinfo = getimagesize($f);
					if ($imageinfo[0] < $maxServerWidth || $imageinfo[1] < $maxServerHeight)
					{
						Media\Images::resizeImage($f, $f, $maxServerWidth, 0, 90);
					}

					//					$imgSize = getimagesize($sourcePath);
					//					if (empty($imgSize[0]) || empty($imgSize[1]))
					//					{
					//						$this->raiseError(
					//							'Error: the image dimensions of the file ' . $destFile . ' cannot be read, please delete and re-upload this image.',
					//							$refresh);
					//
					//						return true;
					//					}
					//
					//					return true;
				}
			}

			break;
		}
	}

	/**
	 * Move foreign keys from guest / owner to service
	 * Only for factura users
	 *
	 * @throws Exception
	 * @since  3.4.0
	 */
	public function fkToService()
	{
		$factura = KrFactory::getAdminModel('services')->getServicesByPlugin('factura');
		if (!is_countable($factura) || !count($factura))
		{
			return;
		}

		foreach ($factura as $f)
		{
			$service_id = $f->id;
		}

		$guests = KrFactory::getListModel('guests')->getForeignKeys();
		foreach ($guests as $g)
		{
			try
			{
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
			}
			catch (Exception)
			{
				$db->transactionRollback();
				echo "Failure for guest id $g->id - please update manually";
			}
		}

		$owners = KrFactory::getListModel('owners')->getForeignKeys();
		foreach ($owners as $o)
		{
			try
			{
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
			}
			catch (Exception)
			{
				$db->transactionRollback();
				echo "Failure for owner id $g->id - please update manually";
			}
		}
	}

	/**
	 * Copy rates year to year
	 *
	 * @throws RuntimeException
	 * @throws Exception
	 * @throws Exception
	 * @throws Exception
	 * @since  2.4.0
	 */
	public function xxcopyrates()
	{
		$old          = '2021-01-01';
		$new          = '2022-01-01';
		$Translations = new Translations();

		$test = KrMethods::inputInt('test', 1, 'get');

		$ids = KrFactory::getListModel('properties')->getIds();
		if (!is_countable($ids) || !count($ids))
		{
			jexit('no properties found');
		}

		foreach ($ids as $id)
		{
			$rates = KrFactory::getListModel('properties')->getRatesToCopy($id, $old);

			if ($test)
			{
				var_dump($rates);
			}

			foreach ($rates as $r)
			{
				if ($r->valid_to >= $new)
				{
					echo 'Property ' . $id . ' has new rates';
					break;
				}

				if ($r->state == 1)
				{
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

					if ($test)
					{
						var_dump($new);
					}
					else
					{
						KrFactory::insert('rate', $new);
						if (!is_null($r->name))
						{
							$Translations->updateDefault('rate', $new->id, 'name', $r->name);
						}
					}
				}
			}

			if ($test)
			{
				break;
			}
		}

		$Translations->cleanTranslationCache('rates');
	}
}