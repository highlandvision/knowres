<?php
/**
 * @package     Know Reservations
 * @subpackage  Library
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR\Media\Pdf;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Media\Pdf;
use Joomla\CMS\Object\CMSObject;
use RuntimeException;

use function nl2br;

/**
 * Overrides for TCPDF
 *
 * @since 2.2.0
 */
class Property extends Pdf
{
	/** @var CMSObject Property details */
	public CMSObject $property;
	/** @var  int ID of property */
	protected int $property_id;

	/**
	 * Initialize
	 *
	 * @param   string  $action       Destination output
	 * @param   int     $property_id  ID of Property
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	function __construct(string $action = 'download', int $property_id = 0)
	{
		parent::__construct($action);

		$this->property_id = $property_id;
		$this->setAgency();
	}

	/**
	 * Get the agency for the property manager
	 *
	 * @throws RuntimeException
	 * @throws Exception
	 * @since  3.2.0
	 */
	public function setAgency()
	{
		$settings = KrFactory::getListModel('propertysettings')
		                     ->getPropertysettings($this->property_id, 'default_manager');

		$this->agency = KrFactory::getListModel('agencies')->getAgencyForManager($settings['default_manager']);
		if (!isset($this->agency->id))
		{
			$this->agency = KrFactory::getAdminModel('agency')->getItem(1);
			if (!isset($this->agency->id))
			{
				throw new RuntimeException('Agency not found for default manager for property '
					. $this->property->property_name);
			}
		}
	}

	/**
	 * Get the site terms plus property specific if sent
	 *
	 * @param  ?string  $property_name   Property name
	 * @param  ?string  $property_terms  Property terms
	 *
	 * @throws Exception
	 * @since  3.3.0
	 * @return string
	 */
	protected function renderPdf(?string $property_name = null, ?string $property_terms = null): string
	{
		$params     = KrMethods::getParams();
		$article_id = (int) $params->get('id_cancellation', '0');
		if ($article_id)
		{
			$article = KrMethods::getArticle($article_id);
		}

		if (!is_null($property_name))
		{
			$heading = KrMethods::sprintf('COM_KNOWRES_PROPERTY_TERMS', KrMethods::getCfg('sitename'), $property_name);
		}
		else
		{
			$heading = KrMethods::sprintf('COM_KNOWRES_RENTAL_TERMS', KrMethods::getCfg('sitename'));
		}

		$this->createPdf(KrMethods::plain('COM_KNOWRES_PROPERTY_TERMS_TITLE'), $heading, 30);
		$content = KrMethods::render('pdf.property.terms', [
			'heading' => $heading,
			'text'    => nl2br($property_terms),
			'intro'   => isset($article->id) ? $article->introtext : ''
		]);

		$this->setContent($content);
		$file = 'property_terms_' . $this->property->property_name . '.pdf';

		return $this->actionPdf($file);
	}
}