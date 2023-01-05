// package    Know Reservations
// subpackage Admin Js
// copyright  2020 Highland Vision. All rights reserved.
// license    See the file "LICENSE.txt" for the full license governing this code.
// author     Hazel Wilson <hazel@highlandvision.com>

(function ($) {
	let myGmap;
	let map;

	class Krgmap {
		constructor(element, options) {
			this.settings = {
				lat:     '',
				lng:     '',
				maxZoom: 20,
				zoom:    10
			};
			if (options) {
				$.extend(this.settings, options);
			}

			this.element = element;

			if (this.settings.lat && this.settings.lng) {
				this.initMap();
			}
		}

		initMap() {
			let point = new google.maps.LatLng(this.settings.lat, this.settings.lng, this.settings.zoom);
			let mapoptions = {
				center:    point,
				zoom:      this.settings.zoom,
				maxZoom:   this.settings.maxZoom,
				mapTypeId: "roadmap"
			};

			map = new google.maps.Map(
				document.getElementById('mapdrag'),
				mapoptions
			);

			let marker = new google.maps.Marker({
				position:  point,
				draggable: true
			});

			marker.setMap(map);
			this.updateMarkerPosition(point.lat(), point.lng());

			google.maps.event.addListener(marker, 'dragend', () => {
				let newpoint = marker.getPosition();
				this.updateMarkerPosition(newpoint.lat(), newpoint.lng());
				map.setCenter(newpoint);
			});
		}

		refreshMap(lat, lng, maxzoom) {
			if (lat) {
				this.settings.lat = lat;
			}
			if (lng) {
				this.settings.lng = lng;
			}
			if (maxzoom) {
				this.settings.maxZoom = parseInt(maxzoom);
			}

			this.initMap();
		}

		updateMarkerPosition(lat, lng) {
			$('#jform_lat').val(lat.toFixed(5));
			$('#jform_lng').val(lng.toFixed(5));
		}
	}

	$(function () {
		const $drag = $("#mapdrag");

		if ($drag.length) {
			const params = {
				lat:     $drag.data('lat'),
				lng:     $drag.data('lng'),
				zoom:    $drag.data('zoom'),
				maxZoom: $drag.data('maxzoom'),
			};

			myGmap = new Krgmap($drag, params);
		}

		$("#jform_map_max_zoom").on('change', function (e) {
			e.preventDefault();
			myGmap.refreshMap(false, false, $(this).val());
		});

		$("a#geocodeAddress").on('click', function (e) {
			e.preventDefault();

			let addressString =
				    $("#jform_property_street").val()
				    + ', '
				    + $('#jform_town_id').find(':selected').text()
				    + ' '
				    + $("#jform_property_postcode").val()
				    + ', '
				    + $('#jform_region_id').find(':selected').text()
				    + ' '
				    + $('#jform_country_id').find(':selected').text();

			let url = 'index.php?option=com_knowres&task=property.geocode';
			let coord = [];

			$.ajax({
				type:     'POST',
				url:      url,
				data:     {address: addressString},
				dataType: 'json',
				success:  function (jsondata) {
					$.each(jsondata, function (key, value) {
						let div = '#' + key;
						$(div).val(value);
						coord[key] = value;
						myGmap.refreshMap(coord['lat'], coord['lng'], false);
					});
				}
			});
		});
	});
})(jQuery);