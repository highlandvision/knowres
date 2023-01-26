<?php
/**
 * @package     Know Reservations
 * @subpackage  Site Controller
 * @copyright   Copyright (c) 2020, Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR\Media\Pdf\Property;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Media\Pdf\Property;

use function is_null;

/**
 * PDF Property terms
 *
 * @since 3.3.0
 */
class Terms extends Property
{
	/**
	 * Initialize
	 *
	 * @param   string  $action       Destination output
	 * @param   int     $property_id  ID of Property
	 *
	 * @throws Exception
	 * @since  3.3.0
	 */
	public function __construct(string $action = 'download', int $property_id = 0)
	{
		parent::__construct($action, $property_id);
	}

	/**
	 * Create the pdf file and either download or return path name
	 *
	 * @throws Exception
	 * @since  3.3.0
	 * @return bool|string
	 */
	public function getPdf(): bool|string
	{
		if ($this->property_id > 0)
		{
			$property = KrFactory::getAdminModel('property')->getItem($this->property_id);

			return $this->renderPdf($property->property_name, $property->terms_conditions);
		}
		else
		{
			return $this->renderPdf();
		}
	}

	/**
	 * Get the site terms plus property specific when property is passed
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
			$heading  = KrMethods::sprintf('COM_KNOWRES_PROPERTY_TERMS', KrMethods::getCfg('sitename'), $property_name);
			$filename = 'property_terms_' . $property_name . '.pdf';
		}
		else
		{
			$heading  = KrMethods::sprintf('COM_KNOWRES_RENTAL_TERMS', KrMethods::getCfg('sitename'));
			$filename = 'property_terms.pdf';
		}

		$this->createPdf(KrMethods::plain('COM_KNOWRES_PROPERTY_TERMS_TITLE'), $heading, 30);
		$content = KrMethods::render('pdf.property.terms', [
			'heading' => $heading,
			'text'    => is_null($property_terms) ? '' : $property_terms,
			'intro'   => isset($article->id) ? $article->introtext : ''
		]);

		$this->setContent($content);

		return $this->actionPdf($filename);
	}
}