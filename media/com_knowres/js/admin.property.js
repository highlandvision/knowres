/**
 * @package    Know Reservations
 * @subpackage Admin JS
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

"use strict";

if (typeof jQuery === 'undefined') jQuery.noConflict();

(function ($) {
    class Krareasearch {
        constructor() {
            this.settings = {
                noResults: 'Sorry no results found',
            };

            this.searchOptions();
        }

        searchOptions() {
            const areatypeahead = new Bloodhound({
                datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                limit: 10,
                remote: {
                    url: 'index.php?option=com_knowres&task=properties.area&format=json&query=%QUERY',
                    wildcard: '%QUERY'
                }
            });

            areatypeahead.initialize();
            //const self = this;

            $('.areatypeahead').typeahead({
                    items: 6,
                    minLength: 2
                },
                {
                    name: 'areatypeahead',
                    source: areatypeahead
                }
            )
        }
    }

    $(function () {
        if ($('.areatypeahead').length) {
            new Krareasearch();
        }
    });
})(jQuery);