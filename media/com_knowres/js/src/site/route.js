/**
 * @package    Know Reservations
 * @subpackage Site JS
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

"use strict";

(function ($) {
	let myKrroute;
	let directionsDisplay;
	let directionsVisible = false;
	let routeMap;
	let origin;
	let destination;
	let routeMarkers = [];
	let routeStopPoints = [];
	let point;
	let self;

	let settings = {
		lat:               "",
		lng:               "",
		name:              "",
		icon:              "",
		detour:            "",
		mapZoom:           9,
		mapMaxZoom:        20,
		mapTypeId:         "roadmap",
		mapId:             "kr-map-route",
		directionsPanel:   "kr-directions-panel",
		directionsService: null
	};

	class Krroute {
		constructor($element, options) {
			this.settings = settings;
			if (options) {
				$.extend(this.settings, options);
			}

			this.settings.directionsService = new google.maps.DirectionsService();
			this.init();
		}

		static clearRouteMarkers() {
			for (let i = 0; i < routeMarkers.length; i++) {
				routeMarkers[i].setMap(null);
			}
		}

		static clearWaypoints() {
			origin = null;
			routeMarkers = [];
			routeStopPoints = [];
			directionsVisible = false;
		}

		addRouteMarker(latlng) {
			routeMarkers.push(new google.maps.Marker({
				position: latlng,
				map:      routeMap,
				icon:     this.settings.detour
			}));
		}

		//
		// addPropertyMarker(point, html, image, boxinfo) {
		// 	let marker = new google.maps.Marker({
		// 		position: point,
		// 		html:     html,
		// 		map:      routeMap,
		// 		icon:     image,
		// 		zIndex:   1
		// 	});
		//
		// 	let infowindow = new google.maps.InfoWindow({
		// 		content: boxinfo
		// 	});
		//
		// 	google.maps.event.addListener(marker, 'click', function () {
		// 		// Check to see if there is an info window stored in routeCurrInfoWindow,
		// 		// if there is, we use .close() to hide the window
		// 		if (routeCurrInfoWindow) {
		// 			routeCurrInfoWindow.close();
		// 		}
		// 		// Put our new info window in to the routeCurrInfoWindow variable
		// 		routeCurrInfoWindow = infowindow;
		// 		// Open the window
		// 		infowindow.open(routeMap, marker);
		// 	});
		//
		// 	//gmarkers.push( marker );
		// 	routeMarkers.push(marker);
		// }

		// static updateMode() {
		// 	if (directionsVisible) {
		// 		this.calcRoute();
		// 	}
		// }

		calcRoute() {
			let from_address = document.getElementById("from_address").value;
			let origin = "";

			if (from_address === "Address") from_address = "";
			if (from_address) origin = from_address + "," + "";

			let mode;
			switch (document.getElementById("mode").value) {
				case "bicycling":
					mode = google.maps.DirectionsTravelMode.BICYCLING;
					break;
				case "driving":
					mode = google.maps.DirectionsTravelMode.DRIVING;
					break;
				case "walking":
					mode = google.maps.DirectionsTravelMode.WALKING;
					break;
			}

			if (origin) {
				let request = {
					origin:        origin,
					destination:   destination,
					waypoints:     routeStopPoints,
					travelMode:    mode,
					avoidHighways: document.getElementById('highways').checked,
					avoidTolls:    document.getElementById('tolls').checked
				};

				self = this;
				this.settings.directionsService.route(request, function (response, status) {
					if (status === google.maps.DirectionsStatus.OK) {
						directionsDisplay.setDirections(response);
					} else {
						alert("Google couldn`t calculate directions for this route and selected options");
						self.resetRoute();
					}
				});
			}

			Krroute.clearRouteMarkers();
			directionsVisible = true;
		}

		init() {
			destination = new google.maps.LatLng(this.settings.lat, this.settings.lng);

			//Initialise map options
			this.myOptions = {
				scrollwheel:       false,
				zoom:              this.settings.mapZoom,
				maxZoom:           this.settings.mapMaxZoom,
				mapTypeId:         this.settings.mapTypeId,
				streetViewControl: false,
				center:            destination
			};

			routeMap = new google.maps.Map(document.getElementById(this.settings.mapId), this.myOptions);
			directionsDisplay = new google.maps.DirectionsRenderer();
			directionsDisplay.setMap(routeMap);
			directionsDisplay.setPanel(document.getElementById(this.settings.directionsPanel));

			const image = new google.maps.MarkerImage(this.settings.icon);
			point = new google.maps.LatLng(this.settings.lat, this.settings.lng);

			self = this;
			google.maps.event.addListener(routeMap, 'click', function (event) {
				if (routeStopPoints.length < 9) {
					routeStopPoints.push({location: event.latLng, stopover: true});
					point = event.latLng;
					self.addRouteMarker(point);
				} else {
					alert("Maximum number of 9 waypoints reached");
				}
			});

			self = this;
			google.maps.event.addListenerOnce(routeMap, 'idle', function () {
				google.maps.event.trigger(routeMap, 'resize');
				self.calcRoute();
			});
		}

		resetRoute() {
			Krroute.clearRouteMarkers();
			Krroute.clearWaypoints();
			directionsDisplay.setMap(null);
			directionsDisplay.setPanel(null);
			directionsDisplay = new google.maps.DirectionsRenderer();
			directionsDisplay.setMap(routeMap);
			directionsDisplay.setPanel(document.getElementById(this.settings.directionPanel));

			this.init();
		}
	}

	$(document).ready(function () {
		$(".kr-directions-modal").on('click', '#kr-map-route', function (e) {
			let $element = $(this);
			const options = {
				lat:    $element.data('lat'),
				lng:    $element.data('lng'),
				name:   $element.data('name'),
				icon:   $element.data('icon'),
				detour: $element.data('detour')
			};
			myKrroute = new Krroute($element, options);
		}).on('click', '.resetroute', function (e) {
			e.preventDefault();
			myKrroute.resetRoute();
		}).on('click', '.calcroute', function (e) {
			e.preventDefault();
			myKrroute.calcRoute();
		});

		jQuery("a#geocodeAddress").on('click', function (e) {
			e.preventDefault();

			let addressString =
				    jQuery("#jform_property_street").val()
				    + ", "
				    + jQuery('#jform_town_id').find(":selected").text()
				    + " "
				    + jQuery("#jform_property_postcode").val()
				    + ", "
				    + jQuery('#jform_region_id').find(":selected").text()
				    + " "
				    + jQuery('#jform_country_id').find(":selected").text();

			let url = 'index.php?option=com_knowres&task=property.geocode';
			let coord = [];

			jQuery.ajax({
				type:     "POST",
				url:      url,
				data:     {address: addressString},
				dataType: "json",
				success:  function (jsondata) {
					jQuery.each(jsondata, function (key, val) {
						let div = "#" + key;
						jQuery(div).val(val);
						coord[key] = val;
						myGmap.refreshMap(coord['lat'], coord['lng'], false);
					});
				}
			});
		});
	});
}(jQuery));