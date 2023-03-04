<?php
/**
 * @package     Know Reservations
 * @subpackage  Library
 * @copyright   Copyright (c) 2020, Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR\Service;

use SimpleXMLElement;

/**
 * http://coffeerings.posterous.com/php-simplexml-and-cdata
 */
class SimpleXMLExtended extends SimpleXMLElement
{
	/**
	 * @param $cdata_text
	 *
	 * @since 3.1.0
	 */
	public function addCData($cdata_text)
	{
		$node = dom_import_simplexml($this);
		$no   = $node->ownerDocument;
		$node->appendChild($no->createCDATASection($cdata_text));
	}

	/**
	 * Create a child with CDATA value
	 *
	 * @param  string  $name        The name of the child element to add.
	 * @param  string  $cdata_text  The CDATA value of the child element.
	 *
	 * @since 3.3.0
	 */
	public function addChildCData(string $name, string $cdata_text)
	{
		$child = $this->addChild($name);
		$child->addCData($cdata_text);
	}
}