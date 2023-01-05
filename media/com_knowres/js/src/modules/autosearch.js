// noinspection NpmUsedModulesInstalled
/**
 * @package    Know Reservations
 * @subpackage Site JS
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

const livesite = window.location.origin + '/';
let Bloodhound = require('bloodhound-js');

(function ($) {
	Foundation.addToJquery();
	$(document).foundation();

	class Krautosearch {
		constructor() {
			this.settings = {
				noResults: 'Sorry no results found',
			};

			this.searchOptions();
		}

		searchOptions() {
			const d = new Date();
			const cache = d.getFullYear() + (d.getMonth() + 1) + d.getDate();
			const autosearch = new Bloodhound({
				datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
				queryTokenizer: Bloodhound.tokenizers.whitespace,
				limit:          10,
				prefetch:       {
					url:      livesite + 'index.php?option=com_knowres&task=properties.options&type=prefetch',
					cacheKey: cache
				},
				remote:         {
					url:      livesite + 'index.php?option=com_knowres&task=properties.options&type=remote&query=%QUERY',
					wildcard: '%QUERY'
				}
			});

			autosearch.initialize();
			const self = this;

			$('.kr-autosearch').typeahead({
					minLength: 2
				},
				{
					name:       'autosearch',
					source:     autosearch.ttAdapter(),
					displayKey: 'name',
					limit:      10,
					templates:  {
						suggestion: function (autosearch) {
							return '<div><a class="needsclick" href="' + autosearch.link + '"><i class="' + autosearch.icon + '"></i>&nbsp;' + autosearch.name + '<br><span>' + autosearch.region + '</span></a></div>';
						},
						selected:   function (event, key, item) {
							window.location.href = item.link;
						},
						empty:      function () {
							return ('<div class="no-suggestion">' + self.settings.noResults + '</div>');
						}
					}
				}
			).on('typeahead:selected', function (e, datum) {
				window.location.href = datum.link;
			});
		}
	}
	$(function () {
		if ($('#kr-autosearch-wrapper').length) {
			new Krautosearch();
		}
	});
})(jQuery);