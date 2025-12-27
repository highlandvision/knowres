<?php
/**
 * @package         Joomla.Site
 * @subpackage      Layout
 * @copyright   (C) 2013 Open Source Matters, Inc. <https://www.joomla.org>
 * @license         GNU General Public License version 2 or later; see LICENSE.txt
 */

use Joomla\CMS\Factory;
use Joomla\CMS\Form\FormHelper;

// phpcs:disable PSR1.Files.SideEffects
defined('_JEXEC') || die;
// phpcs:enable PSR1.Files.SideEffects

$data    = $displayData;
$filters = $data['view']->filterForm->getGroup('filter');

$wa = Factory::getApplication()->getDocument()->getWebAssetManager();
?>

<?php if ($filters) : ?>
    <?php foreach ($filters as $fieldName => $field) : ?>
        <?php if ($fieldName != 'filter_search' && $fieldName != 'filter_departure'
            && $fieldName != 'filter_payment_date'): ?>
            <?php $dataShowOn = ''; ?>
            <?php if ($field->showon) : ?>
                <?php $wa->useScript('showon'); ?>
                <?php $dataShowOn = " data-showon='" . json_encode(FormHelper::parseShowOnConditions($field->showon,
                        $field->formControl, $field->group,
                    ),
                    ) . "'"; ?>
            <?php endif; ?>
            <div class="js-stools-field-filter"<?php echo $dataShowOn; ?>>
                <span class="visually-hidden"><?php echo $field->label; ?></span>
                <?php echo $field->input; ?>
            </div>
        <?php endif; ?>
    <?php endforeach; ?>
<?php endif; ?>