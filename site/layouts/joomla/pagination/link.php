<?php
/**
 * @package         Joomla.Site
 * @subpackage      Layout
 * @copyright   (C) 2014 Open Source Matters, Inc. <https://www.joomla.org>
 * @license         GNU General Public License version 2 or later; see LICENSE.txt
 */
/** @noinspection PhpUnhandledExceptionInspection */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Session as KrSession;
use HighlandVision\KR\SiteHelper;
use Joomla\CMS\Factory;
use Joomla\CMS\Language\Text;

$item    = $displayData['data'];
$display = $item->text;
$ajax    = !empty($displayData['ajax']) ? $displayData['ajax'] : false;
$title   = null;
$app     = Factory::getApplication();

$searchSession = new KrSession\Search();
$searchData    = $searchSession->getData();

switch ((string) $item->text)
{
	//    // Check for "Start" item
	//    case Text::_('JLIB_HTML_START'):
	//        $icon = $app->getLanguage()->isRtl() ? 'icon-angle-double-right' : 'icon-angle-double-left';
	//	    $icon = null;
	//        $aria = Text::sprintf('JLIB_HTML_GOTO_POSITION', strtolower($item->text));
	//        break;

	// Check for "Prev" item
	case Text::_('JPREV'):
		$item->text = Text::_('JPREVIOUS');
		$icon       = $app->getLanguage()->isRtl() ? 'fa-solid fa-chevron-right' : 'fa-solid fa-chevron-left';
		$aria       = Text::sprintf('JLIB_HTML_GOTO_POSITION', strtolower($item->text));
		$title      = Text::_('JPREVIOUS');
		break;

	// Check for "Next" item
	case Text::_('JNEXT'):
		$item->text = Text::_('JNEXT');
		$icon       = $app->getLanguage()->isRtl() ? 'fa-solid fa-chevron-left' : 'fa-solid fa-chevron-right';
		$aria       = Text::sprintf('JLIB_HTML_GOTO_POSITION', strtolower($item->text));
		$title      = Text::_('JNEXT');
		break;
	//
	//    // Check for "End" item
	//    case Text::_('JLIB_HTML_END'):
	//       $icon = $app->getLanguage()->isRtl() ? 'icon-angle-double-left' : 'icon-angle-double-right';
	//	    $icon = null;
	//        $aria = Text::sprintf('JLIB_HTML_GOTO_POSITION', strtolower($item->text));
	//        break;

	default:
		$icon = null;
		$aria = Text::sprintf('JLIB_HTML_GOTO_PAGE', strtolower($item->text));
		break;
}

if ($icon !== null)
{
	$display = '<span class="' . $icon . '" aria-hidden="true"></span>';
}

if ($displayData['active'])
{
	$limit = $item->base > 0 ? 'limitstart.value=' . $item->base : 'limitstart.value=0';

	if ($app->isClient('administrator'))
	{
		$link = 'href="#" onclick="document.adminForm.' . $item->prefix . $limit
			. '; Joomla.submitform();return false;"';
	}
	else if ($app->isClient('site'))
	{
		$region_id = $searchData->region_id;
		// TODO v4.3 check why en-gb is hardcoded
		$Itemid    = SiteHelper::getItemId('com_knowres', 'properties', ['region_id' => $region_id]);
		$link      = 'index.php?option=com_knowres&view=properties&lang=en-gb&Itemid=' . $Itemid . '&limitstart='
			. $item->base;
		if ($region_id > 0)
		{
			$link .= '&region_id=' . $region_id;
		}
		$link = KrMethods::route($link);
	}
}
else
{
	$class = (property_exists($item, 'active') && $item->active) ? 'active' : 'disabled';
	$class = $ajax ? ($class . ' getResponseSearch') : $class;
}
?>

<?php if ($displayData['active']) : ?>
	<?php $class = 'page-link'; ?>
	<?php if ($ajax) : ?>
		<?php $class = $class . ' getResponseSearch'; ?>
		<?php $data = 'data-action="page" data-action-value="' . $item->base . '"' ?>
	<?php endif; ?>
	<?php $td = ''; ?>
	<?php if ($title) : ?>
		<?php $td = 'title=' . $title; ?>
	<?php endif; ?>

	<li class="page-item">
		<a aria-label="<?php echo $aria; ?>" <?php echo $data; ?> href="<?php echo $link; ?>"
		   class="<?php echo $class; ?>"
			<?php echo $td; ?>>
			<?php echo $display; ?>
		</a>
	</li>
<?php elseif (isset($item->active) && $item->active) : ?>
	<?php $aria = Text::sprintf('JLIB_HTML_PAGE_CURRENT', strtolower($item->text)); ?>
	<li class="<?php echo $class; ?> page-item">
		<a aria-current="true" aria-label="<?php echo $aria; ?>" href="#" class="page-link"><?php echo $display; ?></a>
	</li>
<?php else : ?>
	<li class="<?php echo $class; ?> page-item">
		<span class="page-link" aria-hidden="true"><?php echo $display; ?></span>
	</li>
<?php endif; ?>