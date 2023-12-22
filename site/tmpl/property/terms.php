<?php /** @noinspection PhpPossiblePolymorphicInvocationInspection */
/**
 * @package    Know Reservations
 * @subpackage Site View
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */
/** @noinspection PhpUnhandledExceptionInspection */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
use Joomla\CMS\Factory;

$wa = Factory::getApplication()->getDocument()->getWebAssetManager();
$wa->useScript('com_knowres.site')
   ->useScript('keepalive');

$pdflink = KrMethods::route('index.php?option=com_knowres&task=property.termspdf&id=' . $this->item->id, false);
?>

<div><a class="button left" href=<?php echo $pdflink; ?>>Download PDF</a></div>
<h1><?php echo $this->item->hterms_conditions; ?></h1>
<p><?php echo $this->item->terms_conditions; ?></p>
<?php if ($this->article): ?>
	<p><?php echo trim($this->article->introtext); ?></p>
<?php endif; ?>

<button class="close-button" aria-label="Close alert" type="button" data-close>
	<span aria-hidden="true">&times;</span>
</button>