(self["webpackChunkkrdev"] = self["webpackChunkkrdev"] || []).push([["site"], {

	/***/ "./node_modules/is-marker-clusterer/src/markerclusterer.js":
	/*!*****************************************************************!*\
  !*** ./node_modules/is-marker-clusterer/src/markerclusterer.js ***!
  \*****************************************************************/
	/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

		function _typeof(o) {
			"@babel/helpers - typeof";
			return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
				return typeof o;
			} : function (o) {
				return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
			}, _typeof(o);
		}

		/**
		 * Npm version of markerClusterer works great with browserify
		 * Difference from the original - adds a commonjs format and replaces window with global and some unit test
		 * The original functionality it's not modified for docs and original source check
		 * https://github.com/googlemaps/js-marker-clusterer
		 */

		/**
		 * @name MarkerClusterer for Google Maps v3
		 * @version version 1.0
		 * @author Luke Mahe
		 * @fileoverview
		 * The library creates and manages per-zoom-level clusters for large amounts of
		 * markers.
		 * <br/>
		 * This is a v3 implementation of the
		 * <a href="http://gmaps-utility-library-dev.googlecode.com/svn/tags/markerclusterer/"
		 * >v2 MarkerClusterer</a>.
		 */

		/**
		 * Licensed under the Apache License, Version 2.0 (the "License");
		 * you may not use this file except in compliance with the License.
		 * You may obtain a copy of the License at
		 *
		 *     http://www.apache.org/licenses/LICENSE-2.0
		 *
		 * Unless required by applicable law or agreed to in writing, software
		 * distributed under the License is distributed on an "AS IS" BASIS,
		 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
		 * See the License for the specific language governing permissions and
		 * limitations under the License.
		 */

		/**
		 * A Marker Clusterer that clusters markers.
		 *
		 * @param {google.maps.Map} map The Google map to attach to.
		 * @param {Array.<google.maps.Marker>=} opt_markers Optional markers to add to
		 *   the cluster.
		 * @param {Object=} opt_options support the following options:
		 *     'gridSize': (number) The grid size of a cluster in pixels.
		 *     'maxZoom': (number) The maximum zoom level that a marker can be part of a
		 *                cluster.
		 *     'zoomOnClick': (boolean) Whether the default behaviour of clicking on a
		 *                    cluster is to zoom into it.
		 *     'averageCenter': (boolean) Wether the center of each cluster should be
		 *                      the average of all markers in the cluster.
		 *     'minimumClusterSize': (number) The minimum number of markers to be in a
		 *                           cluster before the markers are hidden and a count
		 *                           is shown.
		 *     'styles': (object) An object that has style properties:
		 *       'url': (string) The image url.
		 *       'height': (number) The image height.
		 *       'width': (number) The image width.
		 *       'anchor': (Array) The anchor position of the label text.
		 *       'textColor': (string) The text color.
		 *       'textSize': (number) The text size.
		 *       'fontFamily': (string) The font family.
		 *       'fontWeight': (string) The font weight.
		 *       'backgroundPosition': (string) The position of the backgound x, y.
		 * @constructor
		 * @extends google.maps.OverlayView
		 */
		function MarkerClusterer(map, opt_markers, opt_options) {
			// MarkerClusterer implements google.maps.OverlayView interface. We use the
			// extend function to extend MarkerClusterer with google.maps.OverlayView
			// because it might not always be available when the code is defined so we
			// look for it at the last possible moment. If it doesn't exist now then
			// there is no point going ahead :)
			this.extend(MarkerClusterer, google.maps.OverlayView);
			this.map_ = map;

			/**
			 * @type {Array.<google.maps.Marker>}
			 * @private
			 */
			this.markers_ = [];

			/**
			 *  @type {Array.<Cluster>}
			 */
			this.clusters_ = [];
			this.sizes = [53, 56, 66, 78, 90];

			/**
			 * @private
			 */
			this.styles_ = [];

			/**
			 * @type {boolean}
			 * @private
			 */
			this.ready_ = false;
			var options = opt_options || {};

			/**
			 * @type {number}
			 * @private
			 */
			this.gridSize_ = options['gridSize'] || 60;

			/**
			 * @private
			 */
			this.minClusterSize_ = options['minimumClusterSize'] || 2;

			/**
			 * @type {?number}
			 * @private
			 */
			this.maxZoom_ = options['maxZoom'] || null;
			this.styles_ = options['styles'] || [];

			/**
			 * @type {string}
			 * @private
			 */
			this.imagePath_ = options['imagePath'] || this.MARKER_CLUSTER_IMAGE_PATH_;

			/**
			 * @type {string}
			 * @private
			 */
			this.imageExtension_ = options['imageExtension'] || this.MARKER_CLUSTER_IMAGE_EXTENSION_;

			/**
			 * @type {boolean}
			 * @private
			 */
			this.zoomOnClick_ = true;
			if (options['zoomOnClick'] != undefined) {
				this.zoomOnClick_ = options['zoomOnClick'];
			}

			/**
			 * @type {boolean}
			 * @private
			 */
			this.averageCenter_ = false;
			if (options['averageCenter'] != undefined) {
				this.averageCenter_ = options['averageCenter'];
			}
			this.setupStyles_();
			this.setMap(map);

			/**
			 * @type {number}
			 * @private
			 */
			this.prevZoom_ = this.map_.getZoom();

			// Add the map event listeners
			var that = this;
			google.maps.event.addListener(this.map_, 'zoom_changed', function () {
				var zoom = that.map_.getZoom();
				if (that.prevZoom_ != zoom) {
					that.prevZoom_ = zoom;
					that.resetViewport();
				}
			});
			google.maps.event.addListener(this.map_, 'idle', function () {
				that.redraw();
			});

			// Finally, add the markers
			if (opt_markers && opt_markers.length) {
				this.addMarkers(opt_markers, false);
			}
		}

		/**
		 * The marker cluster image path.
		 *
		 * @type {string}
		 * @private
		 */
		MarkerClusterer.prototype.MARKER_CLUSTER_IMAGE_PATH_ = 'http://google-maps-utility-library-v3.googlecode.com/svn/trunk/markerclusterer/' + 'images/m';

		/**
		 * The marker cluster image path.
		 *
		 * @type {string}
		 * @private
		 */
		MarkerClusterer.prototype.MARKER_CLUSTER_IMAGE_EXTENSION_ = 'png';

		/**
		 * Extends a objects prototype by anothers.
		 *
		 * @param {Object} obj1 The object to be extended.
		 * @param {Object} obj2 The object to extend with.
		 * @return {Object} The new extended object.
		 * @ignore
		 */
		MarkerClusterer.prototype.extend = function (obj1, obj2) {
			return function (object) {
				for (var property in object.prototype) {
					this.prototype[property] = object.prototype[property];
				}
				return this;
			}.apply(obj1, [obj2]);
		};

		/**
		 * Implementaion of the interface method.
		 * @ignore
		 */
		MarkerClusterer.prototype.onAdd = function () {
			this.setReady_(true);
		};

		/**
		 * Implementaion of the interface method.
		 * @ignore
		 */
		MarkerClusterer.prototype.draw = function () {
		};

		/**
		 * Sets up the styles object.
		 *
		 * @private
		 */
		MarkerClusterer.prototype.setupStyles_ = function () {
			if (this.styles_.length) {
				return;
			}
			for (var i = 0, size; size = this.sizes[i]; i++) {
				this.styles_.push({
					url: this.imagePath_ + (i + 1) + '.' + this.imageExtension_,
					height: size,
					width: size
				});
			}
		};

		/**
		 *  Fit the map to the bounds of the markers in the clusterer.
		 */
		MarkerClusterer.prototype.fitMapToMarkers = function () {
			var markers = this.getMarkers();
			var bounds = new google.maps.LatLngBounds();
			for (var i = 0, marker; marker = markers[i]; i++) {
				bounds.extend(marker.getPosition());
			}
			this.map_.fitBounds(bounds);
		};

		/**
		 *  Sets the styles.
		 *
		 *  @param {Object} styles The style to set.
		 */
		MarkerClusterer.prototype.setStyles = function (styles) {
			this.styles_ = styles;
		};

		/**
		 *  Gets the styles.
		 *
		 *  @return {Object} The styles object.
		 */
		MarkerClusterer.prototype.getStyles = function () {
			return this.styles_;
		};

		/**
		 * Whether zoom on click is set.
		 *
		 * @return {boolean} True if zoomOnClick_ is set.
		 */
		MarkerClusterer.prototype.isZoomOnClick = function () {
			return this.zoomOnClick_;
		};

		/**
		 * Whether average center is set.
		 *
		 * @return {boolean} True if averageCenter_ is set.
		 */
		MarkerClusterer.prototype.isAverageCenter = function () {
			return this.averageCenter_;
		};

		/**
		 *  Returns the array of markers in the clusterer.
		 *
		 *  @return {Array.<google.maps.Marker>} The markers.
		 */
		MarkerClusterer.prototype.getMarkers = function () {
			return this.markers_;
		};

		/**
		 *  Returns the number of markers in the clusterer
		 *
		 *  @return {Number} The number of markers.
		 */
		MarkerClusterer.prototype.getTotalMarkers = function () {
			return this.markers_.length;
		};

		/**
		 *  Sets the max zoom for the clusterer.
		 *
		 *  @param {number} maxZoom The max zoom level.
		 */
		MarkerClusterer.prototype.setMaxZoom = function (maxZoom) {
			this.maxZoom_ = maxZoom;
		};

		/**
		 *  Gets the max zoom for the clusterer.
		 *
		 *  @return {number} The max zoom level.
		 */
		MarkerClusterer.prototype.getMaxZoom = function () {
			return this.maxZoom_;
		};

		/**
		 *  The function for calculating the cluster icon image.
		 *
		 *  @param {Array.<google.maps.Marker>} markers The markers in the clusterer.
		 *  @param {number} numStyles The number of styles available.
		 *  @return {Object} A object properties: 'text' (string) and 'index' (number).
		 *  @private
		 */
		MarkerClusterer.prototype.calculator_ = function (markers, numStyles) {
			var index = 0;
			var count = markers.length;
			var dv = count;
			while (dv !== 0) {
				dv = parseInt(dv / 10, 10);
				index++;
			}
			index = Math.min(index, numStyles);
			return {
				text: count,
				index: index
			};
		};

		/**
		 * Set the calculator function.
		 *
		 * @param {function(Array, number)} calculator The function to set as the
		 *     calculator. The function should return a object properties:
		 *     'text' (string) and 'index' (number).
		 *
		 */
		MarkerClusterer.prototype.setCalculator = function (calculator) {
			this.calculator_ = calculator;
		};

		/**
		 * Get the calculator function.
		 *
		 * @return {function(Array, number)} the calculator function.
		 */
		MarkerClusterer.prototype.getCalculator = function () {
			return this.calculator_;
		};

		/**
		 * Add an array of markers to the clusterer.
		 *
		 * @param {Array.<google.maps.Marker>} markers The markers to add.
		 * @param {boolean=} opt_nodraw Whether to redraw the clusters.
		 */
		MarkerClusterer.prototype.addMarkers = function (markers, opt_nodraw) {
			for (var i = 0, marker; marker = markers[i]; i++) {
				this.pushMarkerTo_(marker);
			}
			if (!opt_nodraw) {
				this.redraw();
			}
		};

		/**
		 * Pushes a marker to the clusterer.
		 *
		 * @param {google.maps.Marker} marker The marker to add.
		 * @private
		 */
		MarkerClusterer.prototype.pushMarkerTo_ = function (marker) {
			marker.isAdded = false;
			if (marker['draggable']) {
				// If the marker is draggable add a listener so we update the clusters on
				// the drag end.
				var that = this;
				google.maps.event.addListener(marker, 'dragend', function () {
					marker.isAdded = false;
					that.repaint();
				});
			}
			this.markers_.push(marker);
		};

		/**
		 * Adds a marker to the clusterer and redraws if needed.
		 *
		 * @param {google.maps.Marker} marker The marker to add.
		 * @param {boolean=} opt_nodraw Whether to redraw the clusters.
		 */
		MarkerClusterer.prototype.addMarker = function (marker, opt_nodraw) {
			this.pushMarkerTo_(marker);
			if (!opt_nodraw) {
				this.redraw();
			}
		};

		/**
		 * Removes a marker and returns true if removed, false if not
		 *
		 * @param {google.maps.Marker} marker The marker to remove
		 * @return {boolean} Whether the marker was removed or not
		 * @private
		 */
		MarkerClusterer.prototype.removeMarker_ = function (marker) {
			var index = -1;
			if (this.markers_.indexOf) {
				index = this.markers_.indexOf(marker);
			} else {
				for (var i = 0, m; m = this.markers_[i]; i++) {
					if (m == marker) {
						index = i;
						break;
					}
				}
			}
			if (index == -1) {
				// Marker is not in our list of markers.
				return false;
			}
			marker.setMap(null);
			this.markers_.splice(index, 1);
			return true;
		};

		/**
		 * Remove a marker from the cluster.
		 *
		 * @param {google.maps.Marker} marker The marker to remove.
		 * @param {boolean=} opt_nodraw Optional boolean to force no redraw.
		 * @return {boolean} True if the marker was removed.
		 */
		MarkerClusterer.prototype.removeMarker = function (marker, opt_nodraw) {
			var removed = this.removeMarker_(marker);
			if (!opt_nodraw && removed) {
				this.resetViewport();
				this.redraw();
				return true;
			} else {
				return false;
			}
		};

		/**
		 * Removes an array of markers from the cluster.
		 *
		 * @param {Array.<google.maps.Marker>} markers The markers to remove.
		 * @param {boolean=} opt_nodraw Optional boolean to force no redraw.
		 */
		MarkerClusterer.prototype.removeMarkers = function (markers, opt_nodraw) {
			var removed = false;
			for (var i = 0, marker; marker = markers[i]; i++) {
				var r = this.removeMarker_(marker);
				removed = removed || r;
			}
			if (!opt_nodraw && removed) {
				this.resetViewport();
				this.redraw();
				return true;
			}
		};

		/**
		 * Sets the clusterer's ready state.
		 *
		 * @param {boolean} ready The state.
		 * @private
		 */
		MarkerClusterer.prototype.setReady_ = function (ready) {
			if (!this.ready_) {
				this.ready_ = ready;
				this.createClusters_();
			}
		};

		/**
		 * Returns the number of clusters in the clusterer.
		 *
		 * @return {number} The number of clusters.
		 */
		MarkerClusterer.prototype.getTotalClusters = function () {
			return this.clusters_.length;
		};

		/**
		 * Returns the google map that the clusterer is associated with.
		 *
		 * @return {google.maps.Map} The map.
		 */
		MarkerClusterer.prototype.getMap = function () {
			return this.map_;
		};

		/**
		 * Sets the google map that the clusterer is associated with.
		 *
		 * @param {google.maps.Map} map The map.
		 */
		MarkerClusterer.prototype.setMap = function (map) {
			this.map_ = map;
		};

		/**
		 * Returns the size of the grid.
		 *
		 * @return {number} The grid size.
		 */
		MarkerClusterer.prototype.getGridSize = function () {
			return this.gridSize_;
		};

		/**
		 * Sets the size of the grid.
		 *
		 * @param {number} size The grid size.
		 */
		MarkerClusterer.prototype.setGridSize = function (size) {
			this.gridSize_ = size;
		};

		/**
		 * Returns the min cluster size.
		 *
		 * @return {number} The grid size.
		 */
		MarkerClusterer.prototype.getMinClusterSize = function () {
			return this.minClusterSize_;
		};

		/**
		 * Sets the min cluster size.
		 *
		 * @param {number} size The grid size.
		 */
		MarkerClusterer.prototype.setMinClusterSize = function (size) {
			this.minClusterSize_ = size;
		};

		/**
		 * Extends a bounds object by the grid size.
		 *
		 * @param {google.maps.LatLngBounds} bounds The bounds to extend.
		 * @return {google.maps.LatLngBounds} The extended bounds.
		 */
		MarkerClusterer.prototype.getExtendedBounds = function (bounds) {
			var projection = this.getProjection();

			// Turn the bounds into latlng.
			var tr = new google.maps.LatLng(bounds.getNorthEast().lat(), bounds.getNorthEast().lng());
			var bl = new google.maps.LatLng(bounds.getSouthWest().lat(), bounds.getSouthWest().lng());

			// Convert the points to pixels and the extend out by the grid size.
			var trPix = projection.fromLatLngToDivPixel(tr);
			trPix.x += this.gridSize_;
			trPix.y -= this.gridSize_;
			var blPix = projection.fromLatLngToDivPixel(bl);
			blPix.x -= this.gridSize_;
			blPix.y += this.gridSize_;

			// Convert the pixel points back to LatLng
			var ne = projection.fromDivPixelToLatLng(trPix);
			var sw = projection.fromDivPixelToLatLng(blPix);

			// Extend the bounds to contain the new bounds.
			bounds.extend(ne);
			bounds.extend(sw);
			return bounds;
		};

		/**
		 * Determins if a marker is contained in a bounds.
		 *
		 * @param {google.maps.Marker} marker The marker to check.
		 * @param {google.maps.LatLngBounds} bounds The bounds to check against.
		 * @return {boolean} True if the marker is in the bounds.
		 * @private
		 */
		MarkerClusterer.prototype.isMarkerInBounds_ = function (marker, bounds) {
			return bounds.contains(marker.getPosition());
		};

		/**
		 * Clears all clusters and markers from the clusterer.
		 */
		MarkerClusterer.prototype.clearMarkers = function () {
			this.resetViewport(true);

			// Set the markers a empty array.
			this.markers_ = [];
		};

		/**
		 * Clears all existing clusters and recreates them.
		 * @param {boolean} opt_hide To also hide the marker.
		 */
		MarkerClusterer.prototype.resetViewport = function (opt_hide) {
			// Remove all the clusters
			for (var i = 0, cluster; cluster = this.clusters_[i]; i++) {
				cluster.remove();
			}

			// Reset the markers to not be added and to be invisible.
			for (var i = 0, marker; marker = this.markers_[i]; i++) {
				marker.isAdded = false;
				if (opt_hide) {
					marker.setMap(null);
				}
			}
			this.clusters_ = [];
		};

		/**
		 *
		 */
		MarkerClusterer.prototype.repaint = function () {
			var oldClusters = this.clusters_.slice();
			this.clusters_.length = 0;
			this.resetViewport();
			this.redraw();

			// Remove the old clusters.
			// Do it in a timeout so the other clusters have been drawn first.
			window.setTimeout(function () {
				for (var i = 0, cluster; cluster = oldClusters[i]; i++) {
					cluster.remove();
				}
			}, 0);
		};

		/**
		 * Redraws the clusters.
		 */
		MarkerClusterer.prototype.redraw = function () {
			this.createClusters_();
		};

		/**
		 * Calculates the distance between two latlng locations in km.
		 * @see http://www.movable-type.co.uk/scripts/latlong.html
		 *
		 * @param {google.maps.LatLng} p1 The first lat lng point.
		 * @param {google.maps.LatLng} p2 The second lat lng point.
		 * @return {number} The distance between the two points in km.
		 * @private
		 */
		MarkerClusterer.prototype.distanceBetweenPoints_ = function (p1, p2) {
			if (!p1 || !p2) {
				return 0;
			}
			var R = 6371; // Radius of the Earth in km
			var dLat = (p2.lat() - p1.lat()) * Math.PI / 180;
			var dLon = (p2.lng() - p1.lng()) * Math.PI / 180;
			var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(p1.lat() * Math.PI / 180) * Math.cos(
				p2.lat() * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
			var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
			var d = R * c;
			return d;
		};

		/**
		 * Add a marker to a cluster, or creates a new cluster.
		 *
		 * @param {google.maps.Marker} marker The marker to add.
		 * @private
		 */
		MarkerClusterer.prototype.addToClosestCluster_ = function (marker) {
			var distance = 40000; // Some large number
			var clusterToAddTo = null;
			var pos = marker.getPosition();
			for (var i = 0, cluster; cluster = this.clusters_[i]; i++) {
				var center = cluster.getCenter();
				if (center) {
					var d = this.distanceBetweenPoints_(center, marker.getPosition());
					if (d < distance) {
						distance = d;
						clusterToAddTo = cluster;
					}
				}
			}
			if (clusterToAddTo && clusterToAddTo.isMarkerInClusterBounds(marker)) {
				clusterToAddTo.addMarker(marker);
			} else {
				var cluster = new Cluster(this);
				cluster.addMarker(marker);
				this.clusters_.push(cluster);
			}
		};

		/**
		 * Creates the clusters.
		 *
		 * @private
		 */
		MarkerClusterer.prototype.createClusters_ = function () {
			if (!this.ready_) {
				return;
			}

			// Get our current map view bounds.
			// Create a new bounds object so we don't affect the map.
			var mapBounds = new google.maps.LatLngBounds(this.map_.getBounds().getSouthWest(),
				this.map_.getBounds().getNorthEast());
			var bounds = this.getExtendedBounds(mapBounds);
			for (var i = 0, marker; marker = this.markers_[i]; i++) {
				if (!marker.isAdded && this.isMarkerInBounds_(marker, bounds)) {
					this.addToClosestCluster_(marker);
				}
			}
		};

		/**
		 * A cluster that contains markers.
		 *
		 * @param {MarkerClusterer} markerClusterer The markerclusterer that this
		 *     cluster is associated with.
		 * @constructor
		 * @ignore
		 */
		function Cluster(markerClusterer) {
			this.markerClusterer_ = markerClusterer;
			this.map_ = markerClusterer.getMap();
			this.gridSize_ = markerClusterer.getGridSize();
			this.minClusterSize_ = markerClusterer.getMinClusterSize();
			this.averageCenter_ = markerClusterer.isAverageCenter();
			this.center_ = null;
			this.markers_ = [];
			this.bounds_ = null;
			this.clusterIcon_ = new ClusterIcon(this, markerClusterer.getStyles(), markerClusterer.getGridSize());
		}

		/**
		 * Determins if a marker is already added to the cluster.
		 *
		 * @param {google.maps.Marker} marker The marker to check.
		 * @return {boolean} True if the marker is already added.
		 */
		Cluster.prototype.isMarkerAlreadyAdded = function (marker) {
			if (this.markers_.indexOf) {
				return this.markers_.indexOf(marker) != -1;
			} else {
				for (var i = 0, m; m = this.markers_[i]; i++) {
					if (m == marker) {
						return true;
					}
				}
			}
			return false;
		};

		/**
		 * Add a marker the cluster.
		 *
		 * @param {google.maps.Marker} marker The marker to add.
		 * @return {boolean} True if the marker was added.
		 */
		Cluster.prototype.addMarker = function (marker) {
			if (this.isMarkerAlreadyAdded(marker)) {
				return false;
			}
			if (!this.center_) {
				this.center_ = marker.getPosition();
				this.calculateBounds_();
			} else {
				if (this.averageCenter_) {
					var l = this.markers_.length + 1;
					var lat = (this.center_.lat() * (l - 1) + marker.getPosition().lat()) / l;
					var lng = (this.center_.lng() * (l - 1) + marker.getPosition().lng()) / l;
					this.center_ = new google.maps.LatLng(lat, lng);
					this.calculateBounds_();
				}
			}
			marker.isAdded = true;
			this.markers_.push(marker);
			var len = this.markers_.length;
			if (len < this.minClusterSize_ && marker.getMap() != this.map_) {
				// Min cluster size not reached so show the marker.
				marker.setMap(this.map_);
			}
			if (len == this.minClusterSize_) {
				// Hide the markers that were showing.
				for (var i = 0; i < len; i++) {
					this.markers_[i].setMap(null);
				}
			}
			if (len >= this.minClusterSize_) {
				marker.setMap(null);
			}
			this.updateIcon();
			return true;
		};

		/**
		 * Returns the marker clusterer that the cluster is associated with.
		 *
		 * @return {MarkerClusterer} The associated marker clusterer.
		 */
		Cluster.prototype.getMarkerClusterer = function () {
			return this.markerClusterer_;
		};

		/**
		 * Returns the bounds of the cluster.
		 *
		 * @return {google.maps.LatLngBounds} the cluster bounds.
		 */
		Cluster.prototype.getBounds = function () {
			var bounds = new google.maps.LatLngBounds(this.center_, this.center_);
			var markers = this.getMarkers();
			for (var i = 0, marker; marker = markers[i]; i++) {
				bounds.extend(marker.getPosition());
			}
			return bounds;
		};

		/**
		 * Removes the cluster
		 */
		Cluster.prototype.remove = function () {
			this.clusterIcon_.remove();
			this.markers_.length = 0;
			delete this.markers_;
		};

		/**
		 * Returns the center of the cluster.
		 *
		 * @return {number} The cluster center.
		 */
		Cluster.prototype.getSize = function () {
			return this.markers_.length;
		};

		/**
		 * Returns the center of the cluster.
		 *
		 * @return {Array.<google.maps.Marker>} The cluster center.
		 */
		Cluster.prototype.getMarkers = function () {
			return this.markers_;
		};

		/**
		 * Returns the center of the cluster.
		 *
		 * @return {google.maps.LatLng} The cluster center.
		 */
		Cluster.prototype.getCenter = function () {
			return this.center_;
		};

		/**
		 * Calculated the extended bounds of the cluster with the grid.
		 *
		 * @private
		 */
		Cluster.prototype.calculateBounds_ = function () {
			var bounds = new google.maps.LatLngBounds(this.center_, this.center_);
			this.bounds_ = this.markerClusterer_.getExtendedBounds(bounds);
		};

		/**
		 * Determines if a marker lies in the clusters bounds.
		 *
		 * @param {google.maps.Marker} marker The marker to check.
		 * @return {boolean} True if the marker lies in the bounds.
		 */
		Cluster.prototype.isMarkerInClusterBounds = function (marker) {
			return this.bounds_.contains(marker.getPosition());
		};

		/**
		 * Returns the map that the cluster is associated with.
		 *
		 * @return {google.maps.Map} The map.
		 */
		Cluster.prototype.getMap = function () {
			return this.map_;
		};

		/**
		 * Updates the cluster icon
		 */
		Cluster.prototype.updateIcon = function () {
			var zoom = this.map_.getZoom();
			var mz = this.markerClusterer_.getMaxZoom();
			if (mz && zoom > mz) {
				// The zoom is greater than our max zoom so show all the markers in cluster.
				for (var i = 0, marker; marker = this.markers_[i]; i++) {
					marker.setMap(this.map_);
				}
				return;
			}
			if (this.markers_.length < this.minClusterSize_) {
				// Min cluster size not yet reached.
				this.clusterIcon_.hide();
				return;
			}
			var numStyles = this.markerClusterer_.getStyles().length;
			var sums = this.markerClusterer_.getCalculator()(this.markers_, numStyles);
			this.clusterIcon_.setCenter(this.center_);
			this.clusterIcon_.setSums(sums);
			this.clusterIcon_.show();
		};

		/**
		 * A cluster icon
		 *
		 * @param {Cluster} cluster The cluster to be associated with.
		 * @param {Object} styles An object that has style properties:
		 *     'url': (string) The image url.
		 *     'height': (number) The image height.
		 *     'width': (number) The image width.
		 *     'anchor': (Array) The anchor position of the label text.
		 *     'textColor': (string) The text color.
		 *     'textSize': (number) The text size.
		 *      'fontFamily': (string) The font family.
		 *      'fontWeight': (string) The font weight.
		 *     'backgroundPosition: (string) The background postition x, y.
		 * @param {number=} opt_padding Optional padding to apply to the cluster icon.
		 * @constructor
		 * @extends google.maps.OverlayView
		 * @ignore
		 */
		function ClusterIcon(cluster, styles, opt_padding) {
			cluster.getMarkerClusterer().extend(ClusterIcon, google.maps.OverlayView);
			this.styles_ = styles;
			this.padding_ = opt_padding || 0;
			this.cluster_ = cluster;
			this.center_ = null;
			this.map_ = cluster.getMap();
			this.div_ = null;
			this.sums_ = null;
			this.visible_ = false;
			this.setMap(this.map_);
		}

		/**
		 * Triggers the clusterclick event and zoom's if the option is set.
		 */
		ClusterIcon.prototype.triggerClusterClick = function () {
			var markerClusterer = this.cluster_.getMarkerClusterer();

			// Trigger the clusterclick event.
			google.maps.event.trigger(markerClusterer, 'clusterclick', this.cluster_);
			if (markerClusterer.isZoomOnClick()) {
				// Zoom into the cluster.
				this.map_.fitBounds(this.cluster_.getBounds());
			}
		};

		/**
		 * Adding the cluster icon to the dom.
		 * @ignore
		 */
		ClusterIcon.prototype.onAdd = function () {
			this.div_ = document.createElement('DIV');
			if (this.visible_) {
				var pos = this.getPosFromLatLng_(this.center_);
				this.div_.style.cssText = this.createCss(pos);
				this.div_.innerHTML = this.sums_.text;
			}
			var panes = this.getPanes();
			panes.overlayMouseTarget.appendChild(this.div_);
			var that = this;
			google.maps.event.addDomListener(this.div_, 'click', function () {
				that.triggerClusterClick();
			});
		};

		/**
		 * Returns the position to place the div dending on the latlng.
		 *
		 * @param {google.maps.LatLng} latlng The position in latlng.
		 * @return {google.maps.Point} The position in pixels.
		 * @private
		 */
		ClusterIcon.prototype.getPosFromLatLng_ = function (latlng) {
			var pos = this.getProjection().fromLatLngToDivPixel(latlng);
			pos.x -= parseInt(this.width_ / 2, 10);
			pos.y -= parseInt(this.height_ / 2, 10);
			return pos;
		};

		/**
		 * Draw the icon.
		 * @ignore
		 */
		ClusterIcon.prototype.draw = function () {
			if (this.visible_) {
				var pos = this.getPosFromLatLng_(this.center_);
				this.div_.style.top = pos.y + 'px';
				this.div_.style.left = pos.x + 'px';
			}
		};

		/**
		 * Hide the icon.
		 */
		ClusterIcon.prototype.hide = function () {
			if (this.div_) {
				this.div_.style.display = 'none';
			}
			this.visible_ = false;
		};

		/**
		 * Position and show the icon.
		 */
		ClusterIcon.prototype.show = function () {
			if (this.div_) {
				var pos = this.getPosFromLatLng_(this.center_);
				this.div_.style.cssText = this.createCss(pos);
				this.div_.style.display = '';
			}
			this.visible_ = true;
		};

		/**
		 * Remove the icon from the map
		 */
		ClusterIcon.prototype.remove = function () {
			this.setMap(null);
		};

		/**
		 * Implementation of the onRemove interface.
		 * @ignore
		 */
		ClusterIcon.prototype.onRemove = function () {
			if (this.div_ && this.div_.parentNode) {
				this.hide();
				this.div_.parentNode.removeChild(this.div_);
				this.div_ = null;
			}
		};

		/**
		 * Set the sums of the icon.
		 *
		 * @param {Object} sums The sums containing:
		 *   'text': (string) The text to display in the icon.
		 *   'index': (number) The style index of the icon.
		 */
		ClusterIcon.prototype.setSums = function (sums) {
			this.sums_ = sums;
			this.text_ = sums.text;
			this.index_ = sums.index;
			if (this.div_) {
				this.div_.innerHTML = sums.text;
			}
			this.useStyle();
		};

		/**
		 * Sets the icon to the the styles.
		 */
		ClusterIcon.prototype.useStyle = function () {
			var index = Math.max(0, this.sums_.index - 1);
			index = Math.min(this.styles_.length - 1, index);
			var style = this.styles_[index];
			this.url_ = style['url'];
			this.height_ = style['height'];
			this.width_ = style['width'];
			this.textColor_ = style['textColor'];
			this.anchor_ = style['anchor'];
			this.textSize_ = style['textSize'];
			this.fontFamily_ = style['fontFamily'];
			this.fontWeight_ = style['fontWeight'];
			this.backgroundPosition_ = style['backgroundPosition'];
		};

		/**
		 * Sets the center of the icon.
		 *
		 * @param {google.maps.LatLng} center The latlng to set as the center.
		 */
		ClusterIcon.prototype.setCenter = function (center) {
			this.center_ = center;
		};

		/**
		 * Create the css text based on the position of the icon.
		 *
		 * @param {google.maps.Point} pos The position.
		 * @return {string} The css style text.
		 */
		ClusterIcon.prototype.createCss = function (pos) {
			var style = [];
			style.push('background-image:url(' + this.url_ + ');');
			var backgroundPosition = this.backgroundPosition_ ? this.backgroundPosition_ : '0 0';
			style.push('background-position:' + backgroundPosition + ';');
			if (_typeof(this.anchor_) === 'object') {
				if (typeof this.anchor_[0] === 'number' && this.anchor_[0] > 0 && this.anchor_[0] < this.height_) {
					style.push(
						'height:' + (this.height_ - this.anchor_[0]) + 'px; padding-top:' + this.anchor_[0] + 'px;');
				} else {
					style.push('height:' + this.height_ + 'px; line-height:' + this.height_ + 'px;');
				}
				if (typeof this.anchor_[1] === 'number' && this.anchor_[1] > 0 && this.anchor_[1] < this.width_) {
					style.push(
						'width:' + (this.width_ - this.anchor_[1]) + 'px; padding-left:' + this.anchor_[1] + 'px;');
				} else {
					style.push('width:' + this.width_ + 'px; text-align:center;');
				}
			} else {
				style.push(
					'height:' + this.height_ + 'px; line-height:' + this.height_ + 'px; width:' + this.width_ + 'px; text-align:center;');
			}
			var txtColor = this.textColor_ ? this.textColor_ : 'black';
			var txtSize = this.textSize_ ? this.textSize_ : 11;
			var fontFamily = this.fontFamily_ ? this.fontFamily_ : 'Arial,sans-serif';
			var fontWeight = this.fontWeight_ ? this.fontWeight_ : '400';
			style.push(
				'cursor:pointer; top:' + pos.y + 'px; left:' + pos.x + 'px; color:' + txtColor + '; position:absolute; font-size:' + txtSize + 'px; font-family:' + fontFamily + '; font-weight:' + fontWeight + ';');
			return style.join('');
		};

// Export Symbols for Closure
// If you are not going to compile with closure then you can remove the
// code below.
		__webpack_require__.g['MarkerClusterer'] = MarkerClusterer;
		MarkerClusterer.prototype['addMarker'] = MarkerClusterer.prototype.addMarker;
		MarkerClusterer.prototype['addMarkers'] = MarkerClusterer.prototype.addMarkers;
		MarkerClusterer.prototype['clearMarkers'] = MarkerClusterer.prototype.clearMarkers;
		MarkerClusterer.prototype['fitMapToMarkers'] = MarkerClusterer.prototype.fitMapToMarkers;
		MarkerClusterer.prototype['getCalculator'] = MarkerClusterer.prototype.getCalculator;
		MarkerClusterer.prototype['getGridSize'] = MarkerClusterer.prototype.getGridSize;
		MarkerClusterer.prototype['getExtendedBounds'] = MarkerClusterer.prototype.getExtendedBounds;
		MarkerClusterer.prototype['getMap'] = MarkerClusterer.prototype.getMap;
		MarkerClusterer.prototype['getMarkers'] = MarkerClusterer.prototype.getMarkers;
		MarkerClusterer.prototype['getMaxZoom'] = MarkerClusterer.prototype.getMaxZoom;
		MarkerClusterer.prototype['getStyles'] = MarkerClusterer.prototype.getStyles;
		MarkerClusterer.prototype['getTotalClusters'] = MarkerClusterer.prototype.getTotalClusters;
		MarkerClusterer.prototype['getTotalMarkers'] = MarkerClusterer.prototype.getTotalMarkers;
		MarkerClusterer.prototype['redraw'] = MarkerClusterer.prototype.redraw;
		MarkerClusterer.prototype['removeMarker'] = MarkerClusterer.prototype.removeMarker;
		MarkerClusterer.prototype['removeMarkers'] = MarkerClusterer.prototype.removeMarkers;
		MarkerClusterer.prototype['resetViewport'] = MarkerClusterer.prototype.resetViewport;
		MarkerClusterer.prototype['repaint'] = MarkerClusterer.prototype.repaint;
		MarkerClusterer.prototype['setCalculator'] = MarkerClusterer.prototype.setCalculator;
		MarkerClusterer.prototype['setGridSize'] = MarkerClusterer.prototype.setGridSize;
		MarkerClusterer.prototype['setMaxZoom'] = MarkerClusterer.prototype.setMaxZoom;
		MarkerClusterer.prototype['onAdd'] = MarkerClusterer.prototype.onAdd;
		MarkerClusterer.prototype['draw'] = MarkerClusterer.prototype.draw;
		Cluster.prototype['getCenter'] = Cluster.prototype.getCenter;
		Cluster.prototype['getSize'] = Cluster.prototype.getSize;
		Cluster.prototype['getMarkers'] = Cluster.prototype.getMarkers;
		ClusterIcon.prototype['onAdd'] = ClusterIcon.prototype.onAdd;
		ClusterIcon.prototype['draw'] = ClusterIcon.prototype.draw;
		ClusterIcon.prototype['onRemove'] = ClusterIcon.prototype.onRemove;
		module.exports = MarkerClusterer;

		/***/
	}),

	/***/ "./node_modules/jquery-bar-rating/jquery.barrating.js":
	/*!************************************************************!*\
  !*** ./node_modules/jquery-bar-rating/jquery.barrating.js ***!
  \************************************************************/
	/***/ ((module, exports, __webpack_require__) => {

		var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

		function _typeof(o) {
			"@babel/helpers - typeof";
			return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
				return typeof o;
			} : function (o) {
				return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
			}, _typeof(o);
		}

		/**
		 * jQuery Bar Rating Plugin v1.2.2
		 *
		 * http://github.com/antennaio/jquery-bar-rating
		 *
		 * Copyright (c) 2012-2016 Kazik Pietruszewski
		 *
		 * This plugin is available under the MIT license.
		 * http://www.opensource.org/licenses/mit-license.php
		 */
		(function (factory) {
			if (true) {
				// AMD
				!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */
					"./node_modules/jquery/dist/jquery.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
					__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
						(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports,
							__WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
			} else // removed by dead control flow
			{
			}
		})(function ($) {
			var BarRating = function () {
				function BarRating() {
					var self = this;

					// wrap element in a wrapper div
					var wrapElement = function wrapElement() {
						var classes = ['br-wrapper'];
						if (self.options.theme !== '') {
							classes.push('br-theme-' + self.options.theme);
						}
						self.$elem.wrap($('<div />', {
							'class': classes.join(' ')
						}));
					};

					// unwrap element
					var unwrapElement = function unwrapElement() {
						self.$elem.unwrap();
					};

					// find option by value
					var findOption = function findOption(value) {
						if ($.isNumeric(value)) {
							value = Math.floor(value);
						}
						return $('option[value="' + value + '"]', self.$elem);
					};

					// get initial option
					var getInitialOption = function getInitialOption() {
						var initialRating = self.options.initialRating;
						if (!initialRating) {
							return $('option:selected', self.$elem);
						}
						return findOption(initialRating);
					};

					// get empty option
					var getEmptyOption = function getEmptyOption() {
						var $emptyOpt = self.$elem.find('option[value="' + self.options.emptyValue + '"]');
						if (!$emptyOpt.length && self.options.allowEmpty) {
							$emptyOpt = $('<option />', {
								'value': self.options.emptyValue
							});
							return $emptyOpt.prependTo(self.$elem);
						}
						return $emptyOpt;
					};

					// get data
					var getData = function getData(key) {
						var data = self.$elem.data('barrating');
						if (typeof key !== 'undefined') {
							return data[key];
						}
						return data;
					};

					// set data
					var setData = function setData(key, value) {
						if (value !== null && _typeof(value) === 'object') {
							self.$elem.data('barrating', value);
						} else {
							self.$elem.data('barrating')[key] = value;
						}
					};

					// save data on element
					var saveDataOnElement = function saveDataOnElement() {
						var $opt = getInitialOption();
						var $emptyOpt = getEmptyOption();
						var value = $opt.val();
						var text = $opt.data('html') ? $opt.data('html') : $opt.text();

						// if the allowEmpty option is not set let's check if empty option exists in the select field
						var allowEmpty = self.options.allowEmpty !== null ? self.options.allowEmpty : !!$emptyOpt.length;
						var emptyValue = $emptyOpt.length ? $emptyOpt.val() : null;
						var emptyText = $emptyOpt.length ? $emptyOpt.text() : null;
						setData(null, {
							userOptions: self.options,
							// initial rating based on the OPTION value
							ratingValue: value,
							ratingText: text,
							// rating will be restored by calling clear method
							originalRatingValue: value,
							originalRatingText: text,
							// allow empty ratings?
							allowEmpty: allowEmpty,
							// rating value and text of the empty OPTION
							emptyRatingValue: emptyValue,
							emptyRatingText: emptyText,
							// read-only state
							readOnly: self.options.readonly,
							// did the user already select a rating?
							ratingMade: false
						});
					};

					// remove data on element
					var removeDataOnElement = function removeDataOnElement() {
						self.$elem.removeData('barrating');
					};

					// return current rating text
					var ratingText = function ratingText() {
						return getData('ratingText');
					};

					// return current rating value
					var ratingValue = function ratingValue() {
						return getData('ratingValue');
					};

					// build widget and return jQuery element
					var buildWidget = function buildWidget() {
						var $w = $('<div />', {
							'class': 'br-widget'
						});

						// create A elements that will replace OPTIONs
						self.$elem.find('option').each(function () {
							var val, text, html, $a;
							val = $(this).val();

							// create ratings - but only if val is not defined as empty
							if (val !== getData('emptyRatingValue')) {
								text = $(this).text();
								html = $(this).data('html');
								if (html) {
									text = html;
								}
								$a = $('<a />', {
									'href': '#',
									'data-rating-value': val,
									'data-rating-text': text,
									'html': self.options.showValues ? text : ''
								});
								$w.append($a);
							}
						});

						// append .br-current-rating div to the widget
						if (self.options.showSelectedRating) {
							$w.append($('<div />', {
								'text': '',
								'class': 'br-current-rating'
							}));
						}

						// additional classes for the widget
						if (self.options.reverse) {
							$w.addClass('br-reverse');
						}
						if (self.options.readonly) {
							$w.addClass('br-readonly');
						}
						return $w;
					};

					// return a jQuery function name depending on the 'reverse' setting
					var nextAllorPreviousAll = function nextAllorPreviousAll() {
						if (getData('userOptions').reverse) {
							return 'nextAll';
						} else {
							return 'prevAll';
						}
					};

					// set the value of the select field
					var setSelectFieldValue = function setSelectFieldValue(value) {
						// change selected option
						findOption(value).prop('selected', true);
						self.$elem.change();
					};

					// reset select field
					var resetSelectField = function resetSelectField() {
						$('option', self.$elem).prop('selected', function () {
							return this.defaultSelected;
						});
						self.$elem.change();
					};

					// display the currently selected rating
					var showSelectedRating = function showSelectedRating(text) {
						// text undefined?
						text = text ? text : ratingText();

						// special case when the selected rating is defined as empty
						if (text == getData('emptyRatingText')) {
							text = '';
						}

						// update .br-current-rating div
						if (self.options.showSelectedRating) {
							self.$elem.parent().find('.br-current-rating').text(text);
						}
					};

					// return rounded fraction of a value (14.4 -> 40, 0.99 -> 90)
					var fraction = function fraction(value) {
						return Math.round(Math.floor(value * 10) / 10 % 1 * 100);
					};

					// remove all classes from elements
					var resetStyle = function resetStyle() {
						// remove all classes starting with br-*
						self.$widget.find('a').removeClass(function (index, classes) {
							return (classes.match(/(^|\s)br-\S+/g) || []).join(' ');
						});
					};

					// apply style by setting classes on elements
					var applyStyle = function applyStyle() {
						var $a = self.$widget.find('a[data-rating-value="' + ratingValue() + '"]');
						var initialRating = getData('userOptions').initialRating;
						var baseValue = $.isNumeric(ratingValue()) ? ratingValue() : 0;
						var f = fraction(initialRating);
						var $all, $fractional;
						resetStyle();

						// add classes
						$a.addClass('br-selected br-current')[nextAllorPreviousAll()]().addClass('br-selected');
						if (!getData('ratingMade') && $.isNumeric(initialRating)) {
							if (initialRating <= baseValue || !f) {
								return;
							}
							$all = self.$widget.find('a');
							$fractional = $a.length ? $a[getData(
								'userOptions').reverse ? 'prev' : 'next']() : $all[getData(
								'userOptions').reverse ? 'last' : 'first']();
							$fractional.addClass('br-fractional');
							$fractional.addClass('br-fractional-' + f);
						}
					};

					// check if the element is deselectable?
					var isDeselectable = function isDeselectable($element) {
						if (!getData('allowEmpty') || !getData('userOptions').deselectable) {
							return false;
						}
						return ratingValue() == $element.attr('data-rating-value');
					};

					// handle click events
					var attachClickHandler = function attachClickHandler($elements) {
						$elements.on('click.barrating', function (event) {
							var $a = $(this),
								options = getData('userOptions'),
								value,
								text;
							event.preventDefault();
							value = $a.attr('data-rating-value');
							text = $a.attr('data-rating-text');

							// is current and deselectable?
							if (isDeselectable($a)) {
								value = getData('emptyRatingValue');
								text = getData('emptyRatingText');
							}

							// remember selected rating
							setData('ratingValue', value);
							setData('ratingText', text);
							setData('ratingMade', true);
							setSelectFieldValue(value);
							showSelectedRating(text);
							applyStyle();

							// onSelect callback
							options.onSelect.call(self, ratingValue(), ratingText(), event);
							return false;
						});
					};

					// handle mouseenter events
					var attachMouseEnterHandler = function attachMouseEnterHandler($elements) {
						$elements.on('mouseenter.barrating', function () {
							var $a = $(this);
							resetStyle();
							$a.addClass('br-active')[nextAllorPreviousAll()]().addClass('br-active');
							showSelectedRating($a.attr('data-rating-text'));
						});
					};

					// handle mouseleave events
					var attachMouseLeaveHandler = function attachMouseLeaveHandler($elements) {
						self.$widget.on('mouseleave.barrating blur.barrating', function () {
							showSelectedRating();
							applyStyle();
						});
					};

					// somewhat primitive way to remove 300ms click delay on touch devices
					// for a more advanced solution consider setting `fastClicks` option to false
					// and using a library such as fastclick (https://github.com/ftlabs/fastclick)
					var fastClicks = function fastClicks($elements) {
						$elements.on('touchstart.barrating', function (event) {
							event.preventDefault();
							event.stopPropagation();
							$(this).click();
						});
					};

					// disable clicks
					var disableClicks = function disableClicks($elements) {
						$elements.on('click.barrating', function (event) {
							event.preventDefault();
						});
					};
					var attachHandlers = function attachHandlers($elements) {
						// attach click event handler
						attachClickHandler($elements);
						if (self.options.hoverState) {
							// attach mouseenter event handler
							attachMouseEnterHandler($elements);

							// attach mouseleave event handler
							attachMouseLeaveHandler($elements);
						}
					};
					var detachHandlers = function detachHandlers($elements) {
						// remove event handlers in the ".barrating" namespace
						$elements.off('.barrating');
					};
					var setupHandlers = function setupHandlers(readonly) {
						var $elements = self.$widget.find('a');
						if (fastClicks) {
							fastClicks($elements);
						}
						if (readonly) {
							detachHandlers($elements);
							disableClicks($elements);
						} else {
							attachHandlers($elements);
						}
					};
					this.show = function () {
						// run only once
						if (getData()) return;

						// wrap element
						wrapElement();

						// save data
						saveDataOnElement();

						// build & append widget to the DOM
						self.$widget = buildWidget();
						self.$widget.insertAfter(self.$elem);
						applyStyle();
						showSelectedRating();
						setupHandlers(self.options.readonly);

						// hide the select field
						self.$elem.hide();
					};
					this.readonly = function (state) {
						if (typeof state !== 'boolean' || getData('readOnly') == state) return;
						setupHandlers(state);
						setData('readOnly', state);
						self.$widget.toggleClass('br-readonly');
					};
					this.set = function (value) {
						var options = getData('userOptions');
						if (self.$elem.find('option[value="' + value + '"]').length === 0) return;

						// set data
						setData('ratingValue', value);
						setData('ratingText', self.$elem.find('option[value="' + value + '"]').text());
						setData('ratingMade', true);
						setSelectFieldValue(ratingValue());
						showSelectedRating(ratingText());
						applyStyle();

						// onSelect callback
						if (!options.silent) {
							options.onSelect.call(this, ratingValue(), ratingText());
						}
					};
					this.clear = function () {
						var options = getData('userOptions');

						// restore original data
						setData('ratingValue', getData('originalRatingValue'));
						setData('ratingText', getData('originalRatingText'));
						setData('ratingMade', false);
						resetSelectField();
						showSelectedRating(ratingText());
						applyStyle();

						// onClear callback
						options.onClear.call(this, ratingValue(), ratingText());
					};
					this.destroy = function () {
						var value = ratingValue();
						var text = ratingText();
						var options = getData('userOptions');

						// detach handlers
						detachHandlers(self.$widget.find('a'));

						// remove widget
						self.$widget.remove();

						// remove data
						removeDataOnElement();

						// unwrap the element
						unwrapElement();

						// show the element
						self.$elem.show();

						// onDestroy callback
						options.onDestroy.call(this, value, text);
					};
				}

				BarRating.prototype.init = function (options, elem) {
					this.$elem = $(elem);
					this.options = $.extend({}, $.fn.barrating.defaults, options);
					return this.options;
				};
				return BarRating;
			}();
			$.fn.barrating = function (method, options) {
				return this.each(function () {
					var plugin = new BarRating();

					// plugin works with select fields
					if (!$(this).is('select')) {
						$.error('Sorry, this plugin only works with select fields.');
					}

					// method supplied
					if (plugin.hasOwnProperty(method)) {
						plugin.init(options, this);
						if (method === 'show') {
							return plugin.show(options);
						} else {
							// plugin exists?
							if (plugin.$elem.data('barrating')) {
								plugin.$widget = $(this).next('.br-widget');
								return plugin[method](options);
							}
						}

						// no method supplied or only options supplied
					} else if (_typeof(method) === 'object' || !method) {
						options = method;
						plugin.init(options, this);
						return plugin.show();
					} else {
						$.error('Method ' + method + ' does not exist on jQuery.barrating');
					}
				});
			};
			$.fn.barrating.defaults = {
				theme: '',
				initialRating: null,
				// initial rating
				allowEmpty: null,
				// allow empty ratings?
				emptyValue: '',
				// this is the expected value of the empty rating
				showValues: false,
				// display rating values on the bars?
				showSelectedRating: true,
				// append a div with a rating to the widget?
				deselectable: true,
				// allow to deselect ratings?
				reverse: false,
				// reverse the rating?
				readonly: false,
				// make the rating ready-only?
				fastClicks: true,
				// remove 300ms click delay on touch devices?
				hoverState: true,
				// change state on hover?
				silent: false,
				// supress callbacks when controlling ratings programatically
				onSelect: function onSelect(value, text, event) {
				},
				// callback fired when a rating is selected
				onClear: function onClear(value, text) {
				},
				// callback fired when a rating is cleared
				onDestroy: function onDestroy(value, text) {
				} // callback fired when a widget is destroyed
			};
			$.fn.barrating.BarRating = BarRating;
		});

		/***/
	}),

	/***/ "./pkg/kr/src/media/js/src/site/app.js":
	/*!*********************************************!*\
  !*** ./pkg/kr/src/media/js/src/site/app.js ***!
  \*********************************************/
	/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

		"use strict";
		/* provided dependency */
		var jQuery = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
		/**
		 * @package    Know Reservations
		 * @subpackage Site JS
		 * @copyright  2020 Highland Vision. All rights reserved.
		 * @license    See the file "LICENSE.txt" for the full license governing this code.
		 * @author     Hazel Wilson <hazel@highlandvision.com>
		 */



		var searchData = [];
		var searchDone = false;
		var calendarLoaded = false;
		var savedwidth = false;
		var large;
		var resized = false;
		var scloaded = false;
		(function ($) {
			$(function () {
				$(document).foundation();
				checkScreenWidth();
				$(window).on("resize", function () {
					checkScreenWidth();
				});
				var bars = $('.kr-rating');
				if (bars.length) {
					bars.barrating('show', {
						showValues: true,
						showSelectedRating: false
					});
				}
				var $ctrigger = $('#kr-page-geriatric-calendar-trigger');
				if ($ctrigger.length && !calendarLoaded) {
					loadCalendar($ctrigger.data('pid'), $ctrigger.data('target'));
					calendarLoaded = true;
					var sticky = $('.sticky');
					if (sticky.length) {
						sticky.foundation('_calc', true);
					}
				}
				$(document).on('submit', '.ajaxform', function (e) {
					e.preventDefault();
					var $form = $(this);
					$.ajax({
						type: 'POST',
						url: $form.attr('action'),
						data: $form.serialize(),
						dataType: 'json',
						success: function success(result) {
							if (result.success) {
								if (result.data) {
									formResponse($form.attr('id'), result.data);
								} else {
									window.location.href = '/';
								}
							} else {
								$('.kr-ajax-modal-error-message').html(result.message);
								var $modal = new Foundation.Reveal($('#KrAjaxModalError'));
								$modal.open();
							}
						},
						error: function error() {
							$('.kr-ajax-modal-error-message').html('Sorry an error has occurred, please try again');
							var $modal = new Foundation.Reveal($('#KrAjaxModalError'));
							$modal.open();
						}
					});
				}).on('show.zf.dropdown', '.noscroll', function () {
					$('body').addClass("staticpane");
					$(this).css('opacity', '1');
				}).on('hide.zf.dropdown', '.noscroll', function () {
					$('body').removeClass("staticpane");
					$(this).css('opacity', '0');
				}).on('hide.zf.dropdown', '#kr-quote-form', function () {
					$('#guests').trigger('change');
				}).on('open.zf.reveal', '.kr-ajax-modal[data-reveal]', function (e) {
					e.preventDefault();
					var modalid = "#" + $(this).attr('id');
					if (!$.trim($(modalid).html()).length) {
						var ajaxurl = $(this).data('ajaxurl');
						if (ajaxurl) {
							$.ajax({
								type: 'POST',
								url: ajaxurl,
								success: function success(content) {
									$(modalid).html(content).trigger('resizeme.zf.reveal');
									$(modalid).foundation();
								}
							});
						}
					}
				}).on('open.zf.reveal', '#kr-gateway-modal[data-reveal]', function (e) {
					if (!scloaded) {
						e.preventDefault();
						$.getScript('media/com_knowres/js/stripecheckout.min.js');
						scloaded = true;
					} else {
						void initializeStripe();
					}
				}).on('open.zf.reveal', '#kr-property-slideshow-reveal[data-reveal]', function () {
					var $pslider = $('#kr-property-slideshow');
					$pslider.slick('setPosition');
					$pslider.slick('refresh');
					$('#kr-property-thumbs').slick();
					$('#kr-property-arrows').slick();
					$pslider.slick();
				}).on('click', '.favspan', function (e) {
					e.preventDefault();
					var pid = $(this).data('property');
					var bar = $('.kr-searchbar a.is-active').data('bar');
					$.ajax({
						type: 'POST',
						url: '/index.php?option=com_knowres&task=properties.favourite',
						data: {
							'property_id': pid
						},
						dataType: 'json',
						success: function success(result) {
							if (result.success) {
								getProperties(bar);
								$('.favicon-top').foundation('hide');
							}
						}
					});
				}).on('click', '.getResponseSearch', function (e) {
					e.preventDefault();
					if ($(this).data('action') === undefined) {
						getProperties($(this).data('bar'));
					} else {
						getProperties($(this).data('bar'), $(this).data('action'), $(this).data('action-value'));
					}
				}).on('click', '.kr-filters-close', function (e) {
					e.preventDefault();
					$('.kr-filters.top').addClass('hideme');
					$(this).removeClass('active');
				}).on('click', '.kr-filters ul.filter-sort-list li.head', function (e) {
					e.preventDefault();
					$(this).parent().children('li.filter-item').toggle();
					$(this).toggleClass('active');
				}).on('click', '#showgateways', function (e) {
					e.preventDefault();
					$('#kr-gateways').toggleClass('hideme');
				}).on('click', 'a.kr-searchbar', function (e) {
					e.preventDefault();
					setActiveMenu($(this).data('bar'));
				}).on('click', '.toggleother', function (e) {
					e.preventDefault();
					$(this).data('other').toggle();
				}).on('click', '#kr-property-tabs a[href="#calendar"]', function (e) {
					e.preventDefault();
					if (!calendarLoaded) {
						var pid = $(this).data('pid');
						loadCalendar(pid, '#calendar.tabs-panel');
						calendarLoaded = true;
					}
				}).on('mouseover', '#kr-thumb img', function () {
					var property = $(this).parent().data('id');
					if (property) {
						var target = '.thumboverview' + property;
						$('#pinfo').html($(target).html());
					}
				});
				var $props = $('.kr-properties');
				if ($props.length && !searchDone) {
					getProperties($props.data('bar'));
				}
				var $tabs = $('.tabs');
				if ($('#kr-property-tabs').length && !calendarLoaded) {
					$tabs.find('a').each(function () {
						if ($(this).attr('href') === "#calendar") {
							var pid = $(this).data('pid');
							loadCalendar(pid, '#calendar.tabs-panel');
							calendarLoaded = true;
						}
					});
				}
			});
			$.event.special.touchstart = {
				setup: function setup(_, ns, handle) {
					if (ns.includes("noPreventDefault")) {
						this.addEventListener("touchstart", handle, {
							passive: false
						});
					} else {
						this.addEventListener("touchstart", handle, {
							passive: true
						});
					}
				}
			};
			$.event.special.touchmove = {
				setup: function setup(_, ns, handle) {
					if (ns.includes("noPreventDefault")) {
						this.addEventListener("touchmove", handle, {
							passive: false
						});
					} else {
						this.addEventListener("touchmove", handle, {
							passive: true
						});
					}
				}
			};

			function loadCalendar(pid, target) {
				$.ajax({
					type: 'POST',
					url: '/index.php?option=com_knowres&task=property.geriatric',
					dataType: 'html',
					data: {
						'pid': pid
					},
					success: function success(data) {
						$(target).append(data);
					}
				});
			}

			function formResponse(id, data) {
				if (data.hasOwnProperty('redirect')) {
					window.location.replace(data.redirect);
				} else {
					if (id === 'kr-form-payment') {
						if (data.hasOwnProperty('html')) {
							var $modal = $('#kr-gateway-modal');
							$modal.html(data.html).trigger('resizeme.zf.reveal');
							$modal.foundation('open');
						} else {
							window.location.href = '/';
						}
					} else {
						if (id === 'kr-form-mailchimp') {
							$('#response2').html(data);
						}
					}
				}
			}

			function getProperties(bar) {
				var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
				var action_value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
				$.ajax({
					url: '/index.php?option=com_knowres&task=properties.raw',
					type: 'POST',
					data: {
						'bar': bar,
						'action': action,
						'action_value': action_value
					},
					dataType: 'json',
					success: function success(data) {
						if (!data) {
							window.location.reload();
							return;
						}
						var vals = ['grid', 'list', 'favs', 'map'];
						if (vals.includes(data.bar)) {
							setActiveMenu(data.bar);
						}
						setSearchData(data, data.bar);
						$('.has-tip').foundation();
						$('.dropdown-pane').foundation();
						$('.kr-property .card').foundation();
						$('#kr-order-close').trigger('click');
						searchDone = true;
					}
				});
			}

			function setSearchData(response) {
				var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
				var $sidebar;
				if (response) {
					$('#kr-properties-data').empty().fadeIn('slow').html(response['items']).foundation();
					$('.kr-pager').html(response['pagination']);
					$('.kr-pager.bottom').html(response['pagination']);
					$("#kr-offcanvas-properties-filter").html(response['filters']);
					$("#kr-offcanvas-properties-sortby").html(response['sortby']);
					$('#kr-properties-filter-count').html(response['pcount']);
					$sidebar = $("#kr-sidebar-search");
					if ($sidebar.length && response['search'].length) {
						$sidebar.empty().html(response['search']);
						$('body').trigger('initajaxsearch');
					}
					if (action === 'page') {
						var sticky = $('.sticky');
						if (sticky.length) {
							sticky.foundation('_calc', true);
							window.scrollTo(0, 0);
						}
					}
				}
			}

			function setActiveMenu(bar) {
				var searchbar = $('.kr-searchbar').find('.button');
				$.each(searchbar, function (index, searchbar) {
					$(searchbar).removeClass('is-active');
				});
				$('.kr-searchbar .button.' + bar).addClass('is-active');
			}

			// Return true if width has changed
			function screenWidthHasChanged() {
				large = Foundation.MediaQuery.atLeast('large');
				if (large !== savedwidth) {
					savedwidth = large;
					return true;
				} else {
					return false;
				}
			}

			function checkScreenWidth() {
				resized = false;
				if (screenWidthHasChanged() && searchData['items'] && !resized) {
					setSearchData(searchData);
					resized = true;
				}
			}

			$.event.special.touchstart = {
				setup: function setup(_, ns, handle) {
					if (ns.includes("noPreventDefault")) {
						this.addEventListener("touchstart", handle, {
							passive: false
						});
					} else {
						this.addEventListener("touchstart", handle, {
							passive: true
						});
					}
				}
			};
			$.event.special.touchmove = {
				setup: function setup(_, ns, handle) {
					if (ns.includes("noPreventDefault")) {
						this.addEventListener("touchmove", handle, {
							passive: false
						});
					} else {
						this.addEventListener("touchmove", handle, {
							passive: true
						});
					}
				}
			};
		})(jQuery);

		/***/
	}),

	/***/ "./pkg/kr/src/media/js/src/site/confirm.js":
	/*!*************************************************!*\
  !*** ./pkg/kr/src/media/js/src/site/confirm.js ***!
  \*************************************************/
	/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

		"use strict";
		/* provided dependency */
		var jQuery = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");

		/**
		 * @package    Know Reservations
		 * @subpackage Site JS
		 * @copyright  2020 Highland Vision. All rights reserved.
		 * @license    See the file "LICENSE.txt" for the full license governing this code.
		 * @author     Hazel Wilson <hazel@highlandvision.com>
		 */



		function _typeof(o) {
			"@babel/helpers - typeof";
			return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
				return typeof o;
			} : function (o) {
				return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
			}, _typeof(o);
		}

		function _classCallCheck(a, n) {
			if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
		}

		function _defineProperties(e, r) {
			for (var t = 0; t < r.length; t++) {
				var o = r[t];
				o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(
					e, _toPropertyKey(o.key), o);
			}
		}

		function _createClass(e, r, t) {
			return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e,
				"prototype", {writable: !1}), e;
		}

		function _toPropertyKey(t) {
			var i = _toPrimitive(t, "string");
			return "symbol" == _typeof(i) ? i : i + "";
		}

		function _toPrimitive(t, r) {
			if ("object" != _typeof(t) || !t) return t;
			var e = t[Symbol.toPrimitive];
			if (void 0 !== e) {
				var i = e.call(t, r || "default");
				if ("object" != _typeof(i)) return i;
				throw new TypeError("@@toPrimitive must return a primitive value.");
			}
			return ("string" === r ? String : Number)(t);
		}

		(function ($) {
			if (!window.location.origin) {
				window.location.origin = window.location.protocol + "//" + window.location.host;
			}
			var myConfirm, $myTask;
			var Krconfirm = /*#__PURE__*/function () {
				function Krconfirm($form) {
					_classCallCheck(this, Krconfirm);
					this.form = $form;
					this.init();
				}

				return _createClass(Krconfirm, [{
					key: "init",
					value: function init() {
						this.updateQuote(this.form);
					}
				}, {
					key: "updateQuote",
					value: function updateQuote($form) {
						$myTask = $('#mytask');
						$myTask.val('confirm.compute');
						jQuery.ajax({
							type: 'POST',
							url: 'index.php?option=com_knowres&task=confirm.compute',
							data: $form.serializeArray(),
							dataType: 'json',
							success: function success(result) {
								$myTask.val('confirm.payment');
								if (result.success) {
									var data = result.data;
									if (data.hasOwnProperty('redirect')) {
										window.location.replace(data.redirect);
									}
									var div;
									$.each(result.data.response, function (key, val) {
										$('.hideinitial').show();
										div = "#" + key;
										$(div).text(val);
										$(div).html(val);
										$(div).val(val);
										$(div).show();
									});
								} else {
									$('.kr-ajax-modal-error-message').html(result.message);
									var $modal = new Foundation.Reveal($('#KrAjaxModalError'));
									$modal.open();
								}
							}
						});
					}
				}]);
			}();
			$(function () {
				var $element = $('#kr-form-confirm');
				if ($element.length) {
					myConfirm = new Krconfirm($element);
				}
				$element.on('change click', '.kr-calculate', function (e) {
					e.preventDefault();
					$element = $('#kr-form-confirm');
					myConfirm.updateQuote($element);
				});
				$(document).on('click', '#checkterms', function (e) {
					e.preventDefault();
					if (checkTerms()) {
						$('#checkterms').trigger('submit');
					}
				});
			});

			// noinspection JSUnusedLocalSymbols
			function checkTerms() {
				var result = true;
				var test = document.getElementById('agreecheck');
				var testc = document.getElementById('agreecheckc');
				var testt = document.getElementById('agreecheckt');

				// noinspection JSUnresolvedVariable
				if (test && !document.getElementById('kr-form-payment').agreecheck.checked) {
					result = false;
				}
				// noinspection JSUnresolvedVariable
				if (testc && !document.getElementById('kr-form-payment').agreecheckc.checked) {
					result = false;
				}
				// noinspection JSUnresolvedVariable
				if (testt && !document.getElementById('kr-form-payment').agreecheckt.checked) {
					result = false;
				}
				if (result) {
					return true;
				} else {
					var $modal = new Foundation.Reveal($('#errorModal'));
					$modal.open();
					return false;
				}
			}
		})(jQuery);

		/***/
	}),

	/***/ "./pkg/kr/src/media/js/src/site/dobentry.js":
	/*!**************************************************!*\
  !*** ./pkg/kr/src/media/js/src/site/dobentry.js ***!
  \**************************************************/
	/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

		"use strict";
		/* provided dependency */
		var jQuery = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");

		/**
		 * @package    Know Reservations
		 * @subpackage Site JS
		 * @copyright  2020 Highland Vision. All rights reserved.
		 * @license    See the file "LICENSE.txt" for the full license governing this code.
		 * @author     Hazel Wilson <hazel@highlandvision.com>
		 */



		function _typeof(o) {
			"@babel/helpers - typeof";
			return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
				return typeof o;
			} : function (o) {
				return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
			}, _typeof(o);
		}

		function _classCallCheck(a, n) {
			if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
		}

		function _defineProperties(e, r) {
			for (var t = 0; t < r.length; t++) {
				var o = r[t];
				o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(
					e, _toPropertyKey(o.key), o);
			}
		}

		function _createClass(e, r, t) {
			return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e,
				"prototype", {writable: !1}), e;
		}

		function _toPropertyKey(t) {
			var i = _toPrimitive(t, "string");
			return "symbol" == _typeof(i) ? i : i + "";
		}

		function _toPrimitive(t, r) {
			if ("object" != _typeof(t) || !t) return t;
			var e = t[Symbol.toPrimitive];
			if (void 0 !== e) {
				var i = e.call(t, r || "default");
				if ("object" != _typeof(i)) return i;
				throw new TypeError("@@toPrimitive must return a primitive value.");
			}
			return ("string" === r ? String : Number)(t);
		}

		if (!window.location.origin) {
			window.location.origin = window.location.protocol + "//" + window.location.host;
		}
		(function ($) {
			var myKrDobEntry;
			var today;
			var key = {
				BACKSPACE: 8
			};
			var settings = {
				custom_validation: false,
				days_in_month: [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
				document_date: false,
				errorbox_x: 1,
				errorbox_y: 5,
				field_hint_text_day: 'DD',
				field_hint_text_month: 'MM',
				field_hint_text_year: 'YYYY',
				field_order: 'DMY',
				field_width_day: 6,
				field_width_month: 6,
				field_width_year: 7,
				field_width_sep: 2,
				minmax: '',
				min_date: false,
				max_date: false,
				min_year: 1910,
				month_name: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
				on_blur: false,
				on_error: false,
				on_change: false,
				parse_date: true,
				separator: '/',
				show_errors: true,
				show_hints: true,
				E_DAY_NAN: 'Day must be a number',
				E_DAY_TOO_BIG: 'Day must be 1-31',
				E_DAY_TOO_SMALL: 'Day must be 1-31',
				E_BAD_DAY_FOR_MONTH: 'Only %d days in %m %y',
				E_MONTH_NAN: 'Month must be a number',
				E_MONTH_TOO_BIG: 'Month must be 1-12',
				E_MONTH_TOO_SMALL: 'Month cannot be 0',
				E_YEAR_NAN: 'Year must be a number',
				E_YEAR_LENGTH: 'Year must be 4 digits',
				E_YEAR_TOO_SMALL: 'Year must not be before %y',
				E_MIN_DATE: 'Date must not be in the past',
				E_MAX_DATE: 'Date must not be in the future'
			};
			var KrDobEntry = /*#__PURE__*/function () {
				function KrDobEntry($element, options) {
					_classCallCheck(this, KrDobEntry);
					today = KrDobEntry.getYmd(new Date());
					this.input_day = 0;
					this.input_month = 0;
					this.input_year = 0;
					this.$element = $element;
					if (options) {
						$.extend(settings, options);
					}
					this.init();
				}

				return _createClass(KrDobEntry, [{
					key: "addEntryFields",
					value: function addEntryFields() {
						var dobfield = this;
						dobfield.fields = [];
						$.each(settings.field_order.split(''), function (i, field) {
							switch (field) {
								case 'D':
									dobfield.buildField('day', i);
									break;
								case 'M':
									dobfield.buildField('month', i);
									break;
								case 'Y':
									dobfield.buildField('year', i);
									break;
								default:
									throw "Unexpected field order '" + field + "' expected D, M or Y";
							}
						});
					}
				}, {
					key: "afterPaste",
					value: function afterPaste(target) {
						if (this.parseDate($(target).val())) {
							this.setDate($(target).val());
						}
					}
				}, {
					key: "buildField",
					value: function buildField(name, index) {
						var krdobentry = this;
						var input = new KrDobInput({
							name: name,
							krdobentry: krdobentry,
							index: index,
							hint_text: settings.show_hints ? settings['field_hint_text_' + name] : null
						});
						this.inner.append(input.$input);
						this['input_' + name] = input;
						if (index < 2) {
							this.inner.append($('<span class="separator" />').text(settings.separator));
						}
						this.fields[index] = input;
						this[name] = input;
					}
				}, {
					key: "buildUi",
					value: function buildUi() {
						var dobfield = this;
						this.wrapper = $(this.$element.wrap('<span class="jq-dte" />').parent()[0]);
						this.inner = $('<span class="jq-dte-inner" />');
						this.addEntryFields();
						this.errorbox = $('<span class="jq-dte-errorbox" />').hide();
						this.inner.on('paste', 'input', function (e) {
							var input = this;
							setTimeout(function () {
								dobfield.afterPaste(input, e);
							}, 2);
						});
						this.wrapper.append(this.inner, this.errorbox);
						this.setFieldWidths();
						this.$element.hide();
					}
				}, {
					key: "checkDocument",
					value: function checkDocument(dob, childdob, classname) {
						var elements = document.getElementsByClassName(classname);
						for (var i = 0; i < elements.length; i++) {
							if (new Date(dob) > new Date(childdob)) {
								elements[i].style.display = 'none';
							} else {
								elements[i].style.display = 'block';
							}
						}
					}
				}, {
					key: "clear",
					value: function clear() {
						this.clearError('');
						this.setDate('');
					}
				}, {
					key: "clearError",
					value: function clearError() {
						delete this.error_text;
						this.showError();
					}
				}, {
					key: "destroy",
					value: function destroy() {
						this.$element.show();
						this.$element.css('display', '');
						this.wrapper.find('span').remove();
						this.$element.unwrap();
						this.$element.removeData('datetextentry');
						delete this.inner;
						delete this.wrapper;
						delete this.$element;
					}
				}, {
					key: "focus",
					value: function focus() {
						this.fields[0].setFocus(true);
					}
				}, {
					key: "focusFieldBefore",
					value: function focusFieldBefore(input) {
						var index = input.index;
						if (index < 1) {
							return;
						}
						this.fields[index].yieldFocus();
						this.fields[index - 1].setFocus(true);
						// let next = this.fields[index - 1];
						// let val = next.get();
						// next.setFocus(false);
					}
				}, {
					key: "focusFieldAfter",
					value: function focusFieldAfter(input) {
						var index = input.index;
						if (index > 1) {
							return;
						}
						this.fields[index].yieldFocus();
						this.fields[index + 1].setFocus(true);
					}
				}, {
					key: "focusIn",
					value: function focusIn() {
						this.wrapper.addClass('focus');
					}
				}, {
					key: "focusOut",
					value: function focusOut() {
						if (settings.on_blur) {
							setTimeout(function () {
								self.widgetFocusLost();
							}, 2);
						}
						this.wrapper.removeClass('focus');
					}
				}, {
					key: "getDate",
					value: function getDate() {
						return this.day_value && this.month_value && this.year_value ? {
							day: this.day_value,
							month: this.month_value,
							year: this.year_value
						} : null;
					}
				}, {
					key: "init",
					value: function init() {
						if (!settings.min_year) {
							settings.min_year = '1910';
						}
						this.buildUi();
						this.setDate(this.$element.attr('value'));
						this.proxyLabelClicks();
					}
				}, {
					key: "parseDate",
					value: function parseDate(text) {
						return this.parseIsoDate(text);
					}
				}, {
					key: "parseIsoDate",
					value: function parseIsoDate(text) {
						return text && text.match(/^(\d\d\d\d)-(\d\d)-(\d\d)/) ? {
							day: RegExp.$3,
							month: RegExp.$2,
							year: RegExp.$1
						} : null;
					}
				}, {
					key: "proxyLabelClicks",
					value: function proxyLabelClicks() {
						var dobfield = this;
						var id = this.$element.attr('id');
						if (!id) {
							return;
						}
						// $('label[for=' + id + ']').click(function () {
						// 	dobfield.focus();
						// });
						$('label[for=' + id + ']').onmouseup(function () {
							dobfield.focus();
						});
					}
				}, {
					key: "setDate",
					value: function setDate(new_date) {
						var dobfield = this;
						new_date = this.parseDate(new_date);
						delete this.day_value;
						delete this.month_value;
						delete this.year_value;
						this.input_day.set(new_date ? new_date.day : '');
						this.input_month.set(new_date ? new_date.month : '');
						this.input_year.set(new_date ? new_date.year : '');
						this.clearError();
						this.$element.val(new_date);
						if (new_date) {
							$.each(this.fields, function (i, input) {
								dobfield.validate(input);
							});
						}
					}
				}, {
					key: "setError",
					value: function setError(error_text) {
						this.error_text = error_text;
						this.showError();
					}
				}, {
					key: "setFieldWidths",
					value: function setFieldWidths() {
						var available = this.$element.width() - 2;
						var total = settings.field_width_year + settings.field_width_sep + settings.field_width_month + settings.field_width_sep + settings.field_width_day;
						this.input_day.setWidth(Math.floor(settings.field_width_day * available / total));
						this.input_month.setWidth(Math.floor(settings.field_width_month * available / total));
						this.input_year.setWidth(Math.floor(settings.field_width_year * available / total));
					}
				}, {
					key: "setReadonly",
					value: function setReadonly(mode) {
						if (mode === undefined) {
							mode = true;
						}
						this.input_day.setReadonly(mode);
						this.input_month.setReadonly(mode);
						this.input_year.setReadonly(mode);
						if (mode) {
							this.wrapper.addClass('readonly');
						} else {
							this.wrapper.removeClass('readonly');
						}
					}
				}, {
					key: "showError",
					value: function showError() {
						var error_text = this.widgetErrorText();
						if (this.on_error) {
							this.on_error(error_text);
						}
						if (!settings.show_errors) {
							return;
						}
						if (error_text === '') {
							this.errorbox.hide();
							this.errorbox.text('');
						} else {
							var x_offset = this.inner.outerWidth() + settings.errorbox_x + 'px';
							var y_offset = settings.errorbox_y + 'px';
							this.errorbox.css({
								display: 'block',
								position: 'absolute',
								top: y_offset,
								left: x_offset
							});
							this.errorbox.text(error_text);
							this.errorbox.show();
						}
					}
				}, {
					key: "validate",
					value: function validate(current_input) {
						this.$element.val('');
						if (current_input) {
							var type = current_input.name;
							try {
								if (type === 'day') {
									this.validateDay();
								} else {
									if (type === 'month') {
										this.validateMonth();
									} else {
										if (type === 'year') {
											this.validateYear();
										}
									}
								}
								current_input.clearError();
							} catch (e) {
								current_input.setError(e);
								return false;
							}
						}
						if (this.day_value && this.month_value) {
							this.clearError();
							try {
								this.validateDaysInMonth();
								if (this.year_value && this.year_value.length === 4) {
									this.validateCompleteDate();
									var date_str = KrDobEntry.getYmdObject(this.getDate());
									this.$element.val(date_str);
									if (this.$element.data('childdob')) {
										this.checkDocument(date_str, this.$element.data('childdob'),
											this.$element.attr('id'));
									}
								}
							} catch (e) {
								this.setError(e);
								return false;
							}
						} else {
							this.clearError();
						}
						return true;
					}
				}, {
					key: "validateCompleteDate",
					value: function validateCompleteDate() {
						var date_obj = this.getDate();
						var date_iso = KrDobEntry.getYmdObject(date_obj);
						settings.minmax = this.$element.data('validation');
						if (settings.minmax === 'max') {
							if (date_iso > today) {
								throw settings.E_MAX_DATE;
							}
						}
						if (settings.minmax === 'min') {
							if (date_iso < today) {
								throw settings.E_MIN_DATE;
							}
						}

						// let max_date = settings.max_date;
						// if (typeof max_date === 'function') {
						// 	max_date = max_date.call(this);
						// }
						// if (typeof max_date === 'string') {
						// 	max_date = this.parseDate(max_date);
						// }
						// if (max_date) {
						// 	if (date_iso > settings.max_date) {
						// 		throw(settings.E_MAX_DATE);
						// 	}
						// }

						if (this.custom_validation) {
							date_obj.date = new Date(parseInt(date_obj.year, 10), parseInt(date_obj.month, 10) - 1,
								parseInt(date_obj.day, 10));
							this.custom_validation(date_obj);
						}
					}
				}, {
					key: "validateDay",
					value: function validateDay() {
						var opt = settings;
						var input = this.input_day;
						this.day_value = undefined;
						var text = input.get();
						if (text === '' || text === '0' && input.has_focus) {
							return;
						}
						if (text.match(/\D/)) {
							throw opt.E_DAY_NAN;
						}
						var num = parseInt(text, 10);
						if (num < 1) {
							throw opt.E_DAY_TOO_SMALL;
						}
						if (num > 31) {
							throw opt.E_DAY_TOO_BIG;
						}
						text = num < 10 ? '0' + num : '' + num;
						if (!input.has_focus) {
							input.set(text);
						}
						this.day_value = text;
					}
				}, {
					key: "validateDaysInMonth",
					value: function validateDaysInMonth() {
						var day = parseInt(this.day_value, 10);
						var month = parseInt(this.month_value, 10);
						var year = parseInt(this.year_value, 10);
						if (day < 1 || month < 1) {
							return;
						}
						var max = settings.days_in_month[month - 1];
						var msg = settings.E_BAD_DAY_FOR_MONTH;
						if (month === 2 && ('' + year).length === 4) {
							max = year % 4 ? 28 : year % 100 ? 29 : year % 400 ? 28 : 29;
							msg = msg.replace(/%y/, year.toString());
						} else {
							msg = msg.replace(/ *%y/, '');
						}
						if (day > max) {
							throw msg.replace(/%d/, max.toString()).replace(/%m/, settings.month_name[month - 1]);
						}
					}
				}, {
					key: "validateMonth",
					value: function validateMonth() {
						var input = this.input_month;
						this.month_value = undefined;
						var text = input.get();
						if (text === '' || text === '0' && input.has_focus) {
							return;
						}
						if (text.match(/\D/)) {
							throw settings.E_MONTH_NAN;
						}
						var num = parseInt(text, 10);
						if (num < 1) {
							throw settings.E_MONTH_TOO_SMALL;
						}
						if (num > 12) {
							throw settings.E_MONTH_TOO_BIG;
						}
						text = num < 10 ? '0' + num : '' + num;
						if (!input.has_focus) {
							input.set(text);
						}
						this.month_value = text;
					}
				}, {
					key: "validateYear",
					value: function validateYear() {
						var input = this.input_year;
						this.year_value = undefined;
						var text = input.get();
						if (text === '' || text === '0' && input.has_focus) {
							return;
						}
						if (text.match(/\D/)) {
							throw settings.E_YEAR_NAN;
						}
						if (input.has_focus) {
							if (text.length > 4) {
								throw settings.E_YEAR_LENGTH;
							}
						} else {
							if (text.length !== 4) {
								throw settings.E_YEAR_LENGTH;
							}
						}
						if (text.length === 4) {
							var num = parseInt(text, 10);
							if (settings.min_year && num < settings.min_year) {
								throw settings.E_YEAR_TOO_SMALL.replace(/%y/, settings.min_year);
							}
						}
						this.year_value = text;
					}
				}, {
					key: "widgetErrorText",
					value: function widgetErrorText() {
						var error_text = '';
						$.each(this.fields, function (i, input) {
							if (input.error_text) {
								if (input.has_focus || error_text === '') {
									error_text = input.error_text;
								}
							}
						});
						if (error_text === '' && this.error_text) {
							error_text = this.error_text;
						}
						return error_text;
					}
				}, {
					key: "widgetFocusLost",
					value: function widgetFocusLost() {
						if (settings.on_blur && !this.wrapper.is('.focus')) {
							settings.onBlur();
						}
					}
				}], [{
					key: "getYmd",
					value: function getYmd(date) {
						var m = date.getMonth() + 1;
						var d = date.getDay();
						return date.getFullYear() + '-' + (m < 10 ? '0' : '') + m + '-' + (d < 10 ? '0' : '') + d;
					}
				}, {
					key: "getYmdObject",
					value: function getYmdObject(date) {
						return date.year + '-' + date.month + '-' + date.day;
					}
				}]);
			}();
			var KrDobInput = /*#__PURE__*/function () {
				function KrDobInput(options) {
					_classCallCheck(this, KrDobInput);
					var input = this;
					this.dobfield = options.krdobentry;
					this.name = options.name;
					this.index = options.index;
					this.hint_text = options.hint_text;
					this.has_focus = false;
					this.empty = true;
					this.$input = $('<input type="text" value="" />').addClass('jq-dte-' + this.name).attr('aria-label',
						'' + " (" + this.hint_text + ")").focus($.proxy(input, 'focus')).blur(
						$.proxy(input, 'blur')).keydown(function (e) {
						setTimeout(function () {
							input.keydown(e);
						}, 2);
					}).keyup(function (e) {
						setTimeout(function () {
							input.keyup(e);
						}, 2);
					});
				}

				return _createClass(KrDobInput, [{
					key: "blur",
					value: function blur() {
						this.has_focus = false;
						this.dobfield.focusOut();
						this.show_hint();
						this.dobfield.validate(this);
					}
				}, {
					key: "clearError",
					value: function clearError() {
						delete this.error_text;
						this.$input.removeClass('error');
					}
				}, {
					key: "focus",
					value: function focus() {
						this.key_is_down = false;
						if (this.$input.prop('readonly')) {
							return;
						}
						this.has_focus = true;
						this.dobfield.focusIn();
						if (this.$input.hasClass('hint')) {
							this.$input.val('').removeClass('hint');
						}
						this.dobfield.showError();
					}
				}, {
					key: "get",
					value: function get() {
						var val = this.$input.val();
						return val === this.hint_text ? '' : val;
					}
				}, {
					key: "isDigitKey",
					value: function isDigitKey(e) {
						var keycode = e.which;
						return keycode >= 48 && keycode <= 57 || keycode >= 96 && keycode <= 105;
					}
				}, {
					key: "keydown",
					value: function keydown() {
						// Ignore keyup events that arrive after focus moved to next field
						this.key_is_down = true;
					}
				}, {
					key: "keyup",
					value: function keyup(e) {
						if (!this.key_is_down) {
							return;
						}
						// Handle Backspace - shifting focus to previous field if required
						var keycode = e.which;
						if (keycode === key.BACKSPACE && this.empty) {
							return this.dobfield.focusFieldBefore(this);
						}
						var text = this.get();
						this.empty = text === '';

						// Trap and discard separator characters - advancing focus if required
						if (text.match(/[\/\\. -]/)) {
							text = text.replace(/[\/\\. -]/, '');
							this.set(text);
							if (!this.empty && this.index < 2) {
								this.dobfield.focusFieldAfter(this);
							}
						}

						// Advance focus if this field is both valid and full
						if (this.dobfield.validate(this)) {
							var want = this.name === 'year' ? 4 : 2;
							if (this.isDigitKey(e) && text.length === want) {
								this.dobfield.focusFieldAfter(this);
							}
						}
					}
				}, {
					key: "left",
					value: function left() {
						return this.$input.position().left;
					}
				}, {
					key: "set",
					value: function set(new_value) {
						this.$input.val(new_value).removeClass('hint');
						if (!this.has_focus) {
							this.show_hint();
						}
						this.empty = new_value === '';
						this.clearError();
						return this;
					}
				}, {
					key: "setError",
					value: function setError(text) {
						this.error_text = text;
						this.$input.addClass('error');
						this.dobfield.showError();
					}
				}, {
					key: "setFocus",
					value: function setFocus(select_all) {
						var $input = this.$input;
						$input.focus();
						if (select_all) {
							$input.select();
						} else {
							$input.val($input.val());
						}
						return this;
					}
				}, {
					key: "setWidth",
					value: function setWidth(new_width) {
						this.$input.width(new_width);
						return this;
					}
				}, {
					key: "show_hint",
					value: function show_hint() {
						if (this.get() === '' && typeof this.hint_text === 'string') {
							this.$input.val(this.hint_text).addClass('hint');
						}
						return this;
					}
				}, {
					key: "yieldFocus",
					value: function yieldFocus() {
						this.$input.blur();
					}
				}]);
			}();
			$(document).ready(function () {
				$('.dobissue').each(function () {
					myKrDobEntry = new KrDobEntry($(this), {});
				});
			});
		})(jQuery);

		/***/
	}),

	/***/ "./pkg/kr/src/media/js/src/site/guestdata.js":
	/*!***************************************************!*\
  !*** ./pkg/kr/src/media/js/src/site/guestdata.js ***!
  \***************************************************/
	/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

		"use strict";
		/* provided dependency */
		var jQuery = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
		/**
		 * @package    Know Reservations
		 * @subpackage Admin JS
		 * @copyright  2020 Highland Vision. All rights reserved.
		 * @license    See the file "LICENSE.txt" for the full license governing this code.
		 * @author     Hazel Wilson <hazel@highlandvision.com>
		 */


		(function ($) {
			$(function () {
				if (document.getElementById('howtoarrive')) {
					var howtoarrive = document.getElementById('howtoarrive');
					var arrivalmeans = howtoarrive.getAttribute('data-means');
					if (!arrivalmeans) {
						arrivalmeans = 'air';
					}
					displayArrival(arrivalmeans);
				}
				$('body').on('click', '.amitem', function (e) {
					e.preventDefault();
					displayArrival($(this).attr('id'));
				});
			});

			function displayArrival(value) {
				var x = document.getElementsByClassName('amitem');
				for (var i = 0; i < x.length; i++) {
					x[i].classList.remove('active');
				}
				document.getElementById('air-data').style.display = 'none';
				document.getElementById('train-data').style.display = 'none';
				document.getElementById('auto-data').style.display = 'none';
				document.getElementById('other-data').style.display = 'none';
				var arrivaldata = value + '-data';
				document.getElementById(arrivaldata).style.display = 'block';
				document.getElementById(value).classList.add('active');
				document.getElementById('jform_arrival_means').value = value;
			}
		})(jQuery);

		/***/
	}),

	/***/ "./pkg/kr/src/media/js/src/site/magellan.js":
	/*!**************************************************!*\
  !*** ./pkg/kr/src/media/js/src/site/magellan.js ***!
  \**************************************************/
	/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

		"use strict";
		/* provided dependency */
		var jQuery = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
		/**
		 * @package    Know Reservations
		 * @subpackage Site JS
		 * @copyright  2020 Highland Vision. All rights reserved.
		 * @license    See the file "LICENSE.txt" for the full license governing this code.
		 * @author     Hazel Wilson <hazel@highlandvision.com>
		 */



		var ovChildren,
			ovState = null,
			ovPs = 0,
			$ovBtn;
		var fcChildren,
			fcState = null,
			$fcBtn;
		var ttChildren,
			ttState = null,
			ttPs = 0,
			$ttBtn,
			ttparas;
		var currentParagraph, hrElement;
		(function ($) {
			$(function () {
				ovChildren = $('.readmore-overview').children('p, h5, ul');
				ovPs = ovChildren.length;
				if (ovPs > 3) {
					//ovChildren.slice(3).hide();
					ovChildren.slice(3).display = 'none';
					ovChildren.slice(ovPs - 1, ovPs).after(
						'<div class="text-center"><a class="button hollow' + ' readmore overview-toggle">Read more...</a></div>');
					ovState = 'hidden';
				}
				ttChildren = $('.readmore-testimonials').children('p');
				ttPs = ttChildren.length;
				if (ttPs > 10) {
					//ttChildren.slice(11).hide();
					ttChildren.slice(11).display = 'none';
					ttparas = document.querySelectorAll('.readmore-testimonials p[style*="display: none"]');
					doHRs(ttparas, 'hide');
					ttChildren.slice(ttPs - 1, ttPs).after(
						'<a class="button hollow' + ' accent readmore testimonials-toggle">Read more...</a>');
					ttState = 'hidden';
				}
				fcChildren = $('.readmore-facilities').children('.rooms');
				if (fcChildren.length) {
					fcChildren.hide().after(
						'<a class="button hollow' + ' accent readmore facilities-toggle">See all facilities...</a>');
					fcState = 'hidden';
				}
				$(document).on('click', '.readmore.overview-toggle', function (e) {
					e.preventDefault();
					$ovBtn = $(".overview-toggle");
					if (ovState === 'visible') {
						ovChildren.slice(3).hide();
						$ovBtn.attr('value', 'Read more');
						$ovBtn.text("Read more...");
						ovState = 'hidden';
					} else {
						if (ovState === 'hidden') {
							$('.readmore-overview').find(':hidden').show();
							$ovBtn.attr('value', 'Read less');
							$ovBtn.text("Read less...");
							ovState = 'visible';
						}
					}
					$('.property-menu').foundation('calcPoints');
					$('.sticky').foundation('_calc', true);
				}).on('click', '.readmore.testimonials-toggle', function (e) {
					e.preventDefault();
					$ttBtn = $(".testimonials-toggle");
					if (ttState === 'visible') {
						ttChildren.slice(11).hide();
						doHRs(ttparas, 'hide');
						$ttBtn.attr('value', 'Read more');
						$ttBtn.text("Read more...");
						ttState = 'hidden';
					} else {
						if (ttState === 'hidden') {
							$('.readmore-testimonials p').show();
							doHRs(ttparas, 'show');
							$ttBtn.attr('value', 'Read less');
							$ttBtn.text("Read less...");
							ttState = 'visible';
						}
					}
					$('.property-menu').foundation('calcPoints');
					$('.sticky').foundation('_calc', true);
				}).on('click', '.readmore.facilities-toggle', function (e) {
					e.preventDefault();
					$fcBtn = $(".facilities-toggle");
					if (fcState === 'visible') {
						$('.readmore-facilities .rooms').hide();
						$fcBtn.attr('value', 'See all facilities');
						$fcBtn.text("See all facilities...");
						fcState = 'hidden';
					} else {
						if (fcState === 'hidden') {
							$('.readmore-facilities .rooms').show();
							$fcBtn.attr('value', 'Hide all facilities');
							$fcBtn.text("Hide all facilities...");
							fcState = 'visible';
						}
					}
					$('.property-menu').foundation('calcPoints');
					$('.sticky').foundation('_calc', true);
				});
			});
		})(jQuery);

		function doHRs(paragraphs, type) {
			for (var i = 0; i < paragraphs.length; i++) {
				currentParagraph = paragraphs[i];
				hrElement = currentParagraph.nextElementSibling;
				if (hrElement && hrElement.tagName === 'HR') {
					if (type === 'hide') {
						hrElement.style.display = 'none';
					} else {
						hrElement.style.display = 'block';
					}
				}
			}
		}

		/***/
	}),

	/***/ "./pkg/kr/src/media/js/src/site/map.js":
	/*!*********************************************!*\
  !*** ./pkg/kr/src/media/js/src/site/map.js ***!
  \*********************************************/
	/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

		"use strict";
		/* provided dependency */
		var jQuery = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");

		/**
		 * @package    Know Reservations
		 * @subpackage Site JS
		 * @copyright  2020 Highland Vision. All rights reserved.
		 * @license    See the file "LICENSE.txt" for the full license governing this code.
		 * @author     Hazel Wilson <hazel@highlandvision.com>
		 */



		function _typeof(o) {
			"@babel/helpers - typeof";
			return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
				return typeof o;
			} : function (o) {
				return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
			}, _typeof(o);
		}

		function _classCallCheck(a, n) {
			if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
		}

		function _defineProperties(e, r) {
			for (var t = 0; t < r.length; t++) {
				var o = r[t];
				o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(
					e, _toPropertyKey(o.key), o);
			}
		}

		function _createClass(e, r, t) {
			return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e,
				"prototype", {writable: !1}), e;
		}

		function _toPropertyKey(t) {
			var i = _toPrimitive(t, "string");
			return "symbol" == _typeof(i) ? i : i + "";
		}

		function _toPrimitive(t, r) {
			if ("object" != _typeof(t) || !t) return t;
			var e = t[Symbol.toPrimitive];
			if (void 0 !== e) {
				var i = e.call(t, r || "default");
				if ("object" != _typeof(i)) return i;
				throw new TypeError("@@toPrimitive must return a primitive value.");
			}
			return ("string" === r ? String : Number)(t);
		}

		var lang = "en";
		(function ($) {
			var markershape = {
				type: 'poly',
				coords: [1, 1, 1, 32, 37, 32, 32, 1]
			};
			var myKrmap;
			var mapData = false;
			var map;
			var infoWindow;
			var infoWindow2;
			var bounds;
			var propertydiv;
			var propertyicon;
			var mc;
			var settings = {
				propertyMarkers: [],
				filterIds: [],
				mapMarkers: [],
				mapTypeId: '',
				mapZoom: 12,
				mapMaxZoom: 20,
				mapType: '',
				mapId: '',
				markerColor: 'red'
			};
			var Krmap = /*#__PURE__*/function () {
				function Krmap(settings) {
					_classCallCheck(this, Krmap);
					this.settings = settings;
					//Initialise map options
					this.gmOptions = {
						scrollwheel: false,
						zoom: this.settings.mapZoom,
						maxZoom: this.settings.mapMaxZoom,
						mapTypeId: this.settings.mapTypeId,
						streetViewControl: false
					};
					this.gmarkers = [];
					this.count = 0;
					this.initMap();
				}

				return _createClass(Krmap, [{
					key: "checkDuplicate",
					value:
					// Check Markers array for duplicate position and offset a little
						function checkDuplicate(current) {
							if (this.gmarkers.length > 0) {
								var dups = 0;
								for (var index = 0; index < this.gmarkers.length; index++) {
									var pos = this.gmarkers[index].getPosition();
									if (current.equals(pos)) {
										dups++;
										var a = 360.0 / dups;
										var newLat = pos.lat() + -0.00002 * Math.cos(+a * dups / 180 * Math.PI); //x
										var newLng = pos.lng() + -0.00000 * Math.sin(+a * dups / 180 * Math.PI); //Y
										current = new google.maps.LatLng(newLat, newLng);
									}
								}
							}
							return current;
						}
				}, {
					key: "clusterMap",
					value: function clusterMap() {
						var mcOptions = {
							gridSize: 50,
							ignoreHiddenMarkers: true,
							imagePath: '/media/com_knowres/images/markerclusterer/m'
						};
						map.maxDefaultZoom = this.settings.mapZoom;
						if (this.settings.mapZoom > 0) {
							google.maps.event.addListenerOnce(map, "bounds_changed", function () {
								this.setZoom(Math.min(this.getZoom(), this.maxDefaultZoom));
							});
						}
						this.setPropertyMarkers();
						this.setMapMarkers();
						for (var d = 0; d < this.gmarkers.length; d++) {
							var marker = this.gmarkers[d];
							if (marker.type === 'property') {
								if (this.settings.filterIds.includes(marker.pid)) {
									marker.setVisible(true);
								} else {
									marker.setVisible(false);
								}
							}
						}
						mc = new MarkerClusterer(map, this.gmarkers, mcOptions);
						google.maps.event.addListener(mc, "clusterclick", function () {
							$('#kr-infowindow').hide();
							infoWindow.close();
						});
						map.fitBounds(bounds);
						map.setCenter(bounds.getCenter());
					}

					// Create the Map
				}, {
					key: "createMap",
					value: function createMap() {
						map = new google.maps.Map(document.getElementById(this.settings.mapId), this.gmOptions);
						infoWindow = new google.maps.InfoWindow();
						infoWindow2 = new google.maps.InfoWindow();
						bounds = new google.maps.LatLngBounds();
					}

					// Create the marker and set up the event window
				}, {
					key: "createMapMarker",
					value: function createMapMarker(point, html, image, boxinfo, link, title) {
						var marker = new google.maps.Marker({
							shape: markershape,
							link: link,
							icon: image,
							position: point,
							title: title,
							map: map,
							zIndex: 999
						});
						google.maps.event.addListener(marker, 'mouseover', function (html) {
							return function () {
								infoWindow2.setContent(html);
								infoWindow2.open(map, marker);
							};
						}(html));
						google.maps.event.addListener(marker, 'mouseout', function () {
							return function () {
								infoWindow2.close();
							};
						}());
						google.maps.event.addListener(marker, 'closeclick', function () {
							infoWindow2.close();
						});
						this.gmarkers.push(marker);
						this.count++;
					}
				}, {
					key: "createPropertyMarker",
					value: function createPropertyMarker(point, html, boxinfo, link, title, color, id, image, pid) {
						var marker = new google.maps.Marker({
							position: point,
							link: link,
							map: map,
							icon: image,
							title: title,
							pid: pid,
							type: 'property',
							zIndex: this.count + 1000
						});
						propertydiv = document.getElementById(id);
						marker.addListener('mousedown', function (boxinfo) {
							return function () {
								infoWindow.close();
								$('#kr-infowindow').hide();
								infoWindow.setContent(html);
								infoWindow.open(map, marker);
								$.ajax({
									type: "POST",
									url: '/index.php?option=com_knowres&task=property.mapinfowindow',
									data: {
										id: parseInt(boxinfo)
									},
									success: function success(data) {
										$('#kr-infowindow').fadeIn(400).html(data).show();
										$(".kr-infowindow-slideshow").not('.slick-initialized').slick({
											nextArrow: '<i class="slick-nav next fa-solid fa-chevron-right "></i>',
											prevArrow: '<i class="slick-nav prev fa-solid fa-chevron-left "></i>',
											autoplay: true
										});
									}
								});
							};
						}(boxinfo));
						google.maps.event.addListener(marker, 'closeclick', function () {
							$('#kr-infowindow').hide();
							infoWindow.close();
						});
						this.gmarkers.push(marker);
						bounds.extend(point);
						this.count++;
					}

					//Initialise map
				}, {
					key: "initMap",
					value: function initMap() {
						this.createMap();
						if (this.settings.mapType === 'cluster') {
							this.clusterMap();
						} else {
							this.soloMap();
						}
					}

					// Reset map to initial state
				}, {
					key: "refreshMap",
					value: function refreshMap($mapmodal) {
						if (this.settings.mapType === 'solo') {
							return;
						}
						var self = this;
						jQuery.ajax({
							url: '/index.php?option=com_knowres&task=properties.refreshmap',
							type: 'POST',
							dataType: 'json',
							success: function success(result) {
								if (result.success) {
									self.settings.filterIds = result.data.filterIds;
									for (var d = 0; d < self.gmarkers.length; d++) {
										var marker = self.gmarkers[d];
										if (marker.type === 'property') {
											if (self.settings.filterIds.includes(marker.pid)) {
												marker.setVisible(true);
											} else {
												marker.setVisible(false);
											}
										}
									}
									mc.repaint();
									new Foundation.Reveal($mapmodal);
									$mapmodal.foundation('open');
									google.maps.event.trigger(map, 'resize');
									$mapmodal.foundation('open');
								} else {
									window.alert(result.message);
								}
							}
						});
					}

					// Reset map to initial state
				}, {
					key: "resetMap",
					value: function resetMap() {
						infoWindow.close();
						infoWindow2.close();
						$('#kr-infowindow').hide();
						map.fitBounds(bounds);
						map.setCenter(bounds.getCenter());
					}

					// loop to set map markers
				}, {
					key: "setMapMarkers",
					value: function setMapMarkers() {
						var point;
						var amark;
						for (var d = 0; d < this.settings.mapMarkers.length; d++) {
							amark = this.settings.mapMarkers[d];
							var markericon = {
								url: amark['icon'],
								size: new google.maps.Size(32, 37),
								// OR scaledSize: new google.maps.Size(40, 47)
								origin: new google.maps.Point(0, 0),
								anchor: new google.maps.Point(0, 18)
							};
							point = new google.maps.LatLng(amark['lat'], amark['lng']);
							point = this.checkDuplicate(point);
							this.createMapMarker(point, amark['html'], markericon, '', '', amark['title']);
						}
					}

					// loop to set property markers
				}, {
					key: "setPropertyMarkers",
					value: function setPropertyMarkers() {
						var point;
						var amark;
						for (var d = 0; d < this.settings.propertyMarkers.length; d++) {
							amark = this.settings.propertyMarkers[d];
							if (!d) {
								propertyicon = {
									url: amark['icon'],
									size: new google.maps.Size(32, 37),
									origin: new google.maps.Point(0, 0),
									anchor: new google.maps.Point(0, 20)
								};
							}
							point = new google.maps.LatLng(amark['lat'], amark['lng']);
							point = this.checkDuplicate(point);
							this.createPropertyMarker(point, amark['html'], amark['boxinfo'], amark['link'],
								amark['title'], amark['color'], amark['id'], propertyicon, amark['pid']);
						}
					}
				}, {
					key: "soloMap",
					value: function soloMap() {
						this.setPropertyMarkers();
						this.setMapMarkers();
						map.fitBounds(bounds);
						map.setCenter(bounds.getCenter());
						if (this.settings.mapMarkers.length > 0) {
							var self = this;
							var myListener = google.maps.event.addListener(map, 'idle', function () {
								var found = 0;
								var currentZoom = map.getZoom();
								while (!found) {
									found = Krmap.showVisibleMarkers(self.gmarkers);
									if (found) {
										myListener.remove();
										map.setZoom(currentZoom);
										break;
									}
									currentZoom = currentZoom - 1;
									if (currentZoom < 10) {
										break;
									}
								}
							});
						}
					}
				}], [{
					key: "closeKrInfowindow",
					value: function closeKrInfowindow() {
						$('#kr-infowindow').hide();
						infoWindow.close();
						infoWindow2.close();
					}

					// only show visible markers
				}, {
					key: "showVisibleMarkers",
					value: function showVisibleMarkers(markers) {
						var bounds = map.getBounds();
						var count = 0;
						for (var d = 0; d < markers.length; d++) {
							var marker = markers[d];
							if (marker.type === 'map') {
								if (bounds.contains(marker.getPosition()) === true) {
									marker.setVisible(true);
									count++;
								} else {
									marker.setVisible(false);
								}
							}
						}
						return count;
					}
				}]);
			}();
			$(function () {
				var $mapmodal;
				$('body').on('click', '.map-trigger', function (e) {
					e.preventDefault();
					if (mapData) {
						myKrmap.refreshMap($mapmodal);
					} else {
						kickMap($(this));
						$mapmodal = $('#kr-search-map-modal');
						if ($mapmodal.length) {
							$mapmodal.foundation('open');
						}
					}
				}).on('click', '.resetmap', function (e) {
					e.preventDefault();
					myKrmap.resetMap();
				}).on('click', '#kr-search-map-full-infowindow-close', function (e) {
					e.preventDefault();
					Krmap.closeKrInfowindow();
				}).on('click', '.closemap', function (e) {
					e.preventDefault();
					$mapmodal.foundation('close');
					$.ajax({
						type: "POST",
						url: '/index.php?option=com_knowres&task=properties.mapsession',
						success: function success() {
							$('.kr-searchbar .button.map').removeClass('is-active');
							return true;
						}
					});
				}).on('open.zf.reveal', '#kr-search-map-modal', function (e) {
					e.preventDefault();
					$('#kr-search-map-full').height($('#kr-search-map-modal').height());
					google.maps.event.trigger(map, "resize");
					$.ajax({
						type: "POST",
						url: '/index.php?option=com_knowres&task=properties.mapsession',
						data: {
							map_modal: '1'
						},
						success: function success() {
							return true;
						}
					});
				});

				// Doesn't trigger if included above ??
				if (!mapData) {
					var $soloTrigger = $('#kr-map-solo-trigger');
					$soloTrigger.one('click', function () {
						kickMap($soloTrigger);
					});
					if (window.location.href.indexOf('#map') !== -1 && $soloTrigger.length) {
						kickMap($soloTrigger);
					}
				}

				// Test for force map
				var $mtrigger = $('.map-trigger');
				if ($mtrigger.length && $mtrigger.data('forcemap')) {
					$mtrigger.trigger('click');
				}

				function kickMap($elem) {
					var type = $elem.data('type');
					var pid = 0;
					if (type === 'solo') {
						pid = $elem.data('pid');
					}
					jQuery.ajax({
						url: '/index.php?option=com_knowres&task=properties.mapdata&pid=' + pid,
						type: "POST",
						dataType: "json",
						success: function success(result) {
							if (result.success) {
								settings = {
									mapId: $elem.data('target'),
									mapType: $elem.data('type'),
									mapTypeId: $elem.data('maptypeid'),
									mapZoom: parseInt($elem.data('zoom')),
									mapMaxZoom: parseInt($elem.data('zoommax')),
									propertyMarkers: result.data.propertyMarkers,
									mapMarkers: result.data.mapMarkers,
									filterIds: result.data.filterIds
								};
								myKrmap = new Krmap(settings);
								mapData = true;
							} else {
								window.alert(result.message);
							}
						}
					});
				}
			});
		})(jQuery);

		/***/
	}),

	/***/ "./pkg/kr/src/media/js/src/site/route.js":
	/*!***********************************************!*\
  !*** ./pkg/kr/src/media/js/src/site/route.js ***!
  \***********************************************/
	/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

		"use strict";
		/* provided dependency */
		var jQuery = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");

		/**
		 * @package    Know Reservations
		 * @subpackage Site JS
		 * @copyright  2020 Highland Vision. All rights reserved.
		 * @license    See the file "LICENSE.txt" for the full license governing this code.
		 * @author     Hazel Wilson <hazel@highlandvision.com>
		 */



		function _typeof(o) {
			"@babel/helpers - typeof";
			return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
				return typeof o;
			} : function (o) {
				return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
			}, _typeof(o);
		}

		function _classCallCheck(a, n) {
			if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
		}

		function _defineProperties(e, r) {
			for (var t = 0; t < r.length; t++) {
				var o = r[t];
				o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(
					e, _toPropertyKey(o.key), o);
			}
		}

		function _createClass(e, r, t) {
			return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e,
				"prototype", {writable: !1}), e;
		}

		function _toPropertyKey(t) {
			var i = _toPrimitive(t, "string");
			return "symbol" == _typeof(i) ? i : i + "";
		}

		function _toPrimitive(t, r) {
			if ("object" != _typeof(t) || !t) return t;
			var e = t[Symbol.toPrimitive];
			if (void 0 !== e) {
				var i = e.call(t, r || "default");
				if ("object" != _typeof(i)) return i;
				throw new TypeError("@@toPrimitive must return a primitive value.");
			}
			return ("string" === r ? String : Number)(t);
		}

		(function ($) {
			var myKrroute;
			var directionsDisplay;
			var directionsVisible = false;
			var routeMap;
			var origin;
			var destination;
			var routeMarkers = [];
			var routeStopPoints = [];
			var point;
			var self;
			var settings = {
				lat: "",
				lng: "",
				name: "",
				icon: "",
				detour: "",
				mapZoom: 9,
				mapMaxZoom: 18,
				mapTypeId: "roadmap",
				mapId: "kr-map-route",
				directionsPanel: "kr-directions-panel",
				directionsService: null
			};
			var Krroute = /*#__PURE__*/function () {
				function Krroute($element, options) {
					_classCallCheck(this, Krroute);
					this.settings = settings;
					if (options) {
						$.extend(this.settings, options);
					}
					this.settings.directionsService = new google.maps.DirectionsService();
					this.init();
				}

				return _createClass(Krroute, [{
					key: "addRouteMarker",
					value: function addRouteMarker(latlng) {
						routeMarkers.push(new google.maps.Marker({
							position: latlng,
							map: routeMap,
							icon: this.settings.detour
						}));
					}
				}, {
					key: "calcRoute",
					value: function calcRoute() {
						var from_address = document.getElementById("from_address").value;
						var origin = "";
						if (from_address === "Address") from_address = "";
						if (from_address) origin = from_address + "," + "";
						var mode;
						switch (document.getElementById("mode").value) {
							case "bicycling":
								mode = google.maps.TravelMode.BICYCLING;
								break;
							case "driving":
								mode = google.maps.TravelMode.DRIVING;
								break;
							case "walking":
								mode = google.maps.TravelMode.WALKING;
								break;
						}
						if (origin) {
							var request = {
								origin: origin,
								destination: destination,
								waypoints: routeStopPoints,
								travelMode: mode,
								avoidHighways: document.getElementById('highways').checked,
								avoidTolls: document.getElementById('tolls').checked
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
				}, {
					key: "init",
					value: function init() {
						destination = new google.maps.LatLng(this.settings.lat, this.settings.lng);

						//Initialise map options
						this.myOptions = {
							scrollwheel: false,
							zoom: this.settings.mapZoom,
							maxZoom: this.settings.mapMaxZoom,
							mapTypeId: this.settings.mapTypeId,
							streetViewControl: false,
							center: destination
						};
						routeMap = new google.maps.Map(document.getElementById(this.settings.mapId), this.myOptions);
						directionsDisplay = new google.maps.DirectionsRenderer();
						directionsDisplay.setMap(routeMap);
						directionsDisplay.setPanel(document.getElementById(this.settings.directionsPanel));
						var image = new google.maps.MarkerImage(this.settings.icon);
						point = new google.maps.LatLng(this.settings.lat, this.settings.lng);
						self = this;
						google.maps.event.addListener(routeMap, 'click', function (event) {
							if (routeStopPoints.length < 9) {
								routeStopPoints.push({
									location: event.latLng,
									stopover: true
								});
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
				}, {
					key: "resetRoute",
					value: function resetRoute() {
						Krroute.clearRouteMarkers();
						Krroute.clearWaypoints();
						directionsDisplay.setMap(null);
						directionsDisplay.setPanel(null);
						directionsDisplay = new google.maps.DirectionsRenderer();
						directionsDisplay.setMap(routeMap);
						directionsDisplay.setPanel(document.getElementById(this.settings.directionsPanel));
						this.init();
					}
				}], [{
					key: "clearRouteMarkers",
					value: function clearRouteMarkers() {
						for (var i = 0; i < routeMarkers.length; i++) {
							routeMarkers[i].setMap(null);
						}
					}
				}, {
					key: "clearWaypoints",
					value: function clearWaypoints() {
						origin = null;
						routeMarkers = [];
						routeStopPoints = [];
						directionsVisible = false;
					}
				}]);
			}();
			$(document).ready(function () {
				$(".kr-directions-modal").on('click', '#kr-map-route', function () {
					var $element = $(this);
					var options = {
						lat: $element.data('lat'),
						lng: $element.data('lng'),
						name: $element.data('name'),
						icon: $element.data('icon'),
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
					var addressString = jQuery("#jform_property_street").val() + ", " + jQuery('#jform_town_id').find(
						":selected").text() + " " + jQuery("#jform_property_postcode").val() + ", " + jQuery(
						'#jform_region_id').find(":selected").text() + " " + jQuery('#jform_country_id').find(
						":selected").text();
					var url = 'index.php?option=com_knowres&task=property.geocode';
					var coord = [];
					jQuery.ajax({
						type: "POST",
						url: url,
						data: {
							address: addressString
						},
						dataType: "json",
						success: function success(jsondata) {
							jQuery.each(jsondata, function (key, val) {
								var div = "#" + key;
								jQuery(div).val(val);
								coord[key] = val;
								routeMap.refreshMap(coord['lat'], coord['lng'], false);
							});
						}
					});
				});
			});
		})(jQuery);

		/***/
	}),

	/***/ "./webpack.build.site.js":
	/*!*******************************!*\
  !*** ./webpack.build.site.js ***!
  \*******************************/
	/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

		"use strict";
		__webpack_require__.r(__webpack_exports__);
		/* harmony import */
		var npm_jquery_bar_rating_jquery_barrating__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! npm/jquery-bar-rating/jquery.barrating */
			"./node_modules/jquery-bar-rating/jquery.barrating.js");
		/* harmony import */
		var npm_jquery_bar_rating_jquery_barrating__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(
			npm_jquery_bar_rating_jquery_barrating__WEBPACK_IMPORTED_MODULE_0__);
		/* harmony import */
		var npm_is_marker_clusterer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! npm/is-marker-clusterer */
			"./node_modules/is-marker-clusterer/src/markerclusterer.js");
		/* harmony import */
		var npm_is_marker_clusterer__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(
			npm_is_marker_clusterer__WEBPACK_IMPORTED_MODULE_1__);
		/* harmony import */
		var mediajs_site_app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mediajs/site/app */
			"./pkg/kr/src/media/js/src/site/app.js");
		/* harmony import */
		var mediajs_site_app__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(
			mediajs_site_app__WEBPACK_IMPORTED_MODULE_2__);
		/* harmony import */
		var mediajs_site_confirm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! mediajs/site/confirm */
			"./pkg/kr/src/media/js/src/site/confirm.js");
		/* harmony import */
		var mediajs_site_confirm__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(
			mediajs_site_confirm__WEBPACK_IMPORTED_MODULE_3__);
		/* harmony import */
		var mediajs_site_dobentry__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! mediajs/site/dobentry */
			"./pkg/kr/src/media/js/src/site/dobentry.js");
		/* harmony import */
		var mediajs_site_dobentry__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(
			mediajs_site_dobentry__WEBPACK_IMPORTED_MODULE_4__);
		/* harmony import */
		var mediajs_site_guestdata__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! mediajs/site/guestdata */
			"./pkg/kr/src/media/js/src/site/guestdata.js");
		/* harmony import */
		var mediajs_site_guestdata__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(
			mediajs_site_guestdata__WEBPACK_IMPORTED_MODULE_5__);
		/* harmony import */
		var mediajs_site_magellan__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! mediajs/site/magellan */
			"./pkg/kr/src/media/js/src/site/magellan.js");
		/* harmony import */
		var mediajs_site_magellan__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(
			mediajs_site_magellan__WEBPACK_IMPORTED_MODULE_6__);
		/* harmony import */
		var mediajs_site_map__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! mediajs/site/map */
			"./pkg/kr/src/media/js/src/site/map.js");
		/* harmony import */
		var mediajs_site_map__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(
			mediajs_site_map__WEBPACK_IMPORTED_MODULE_7__);
		/* harmony import */
		var mediajs_site_route__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! mediajs/site/route */
			"./pkg/kr/src/media/js/src/site/route.js");
		/* harmony import */
		var mediajs_site_route__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(
			mediajs_site_route__WEBPACK_IMPORTED_MODULE_8__);
// KR APP JS Files


		/***/
	})

},
	/******/ __webpack_require__ => { // webpackRuntimeModules
		/******/
		var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
		/******/
		__webpack_require__.O(0, ["common"], () => (__webpack_exec__("./webpack.build.site.js")));
		/******/
		var __webpack_exports__ = __webpack_require__.O();
		/******/
	}
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LEVBQUU7VUFDN0I1Z0IsTUFBTSxDQUFDNkMsSUFBSSxDQUFDK2QsUUFBUSxFQUFFLFVBQVVwZixHQUFHLEVBQUVLLEdBQUcsRUFBRTtZQUN6QyxJQUFJMkwsR0FBRyxHQUFHLEdBQUcsR0FBR2hNLEdBQUc7WUFDbkJ4QixNQUFNLENBQUN3TixHQUFHLENBQUMsQ0FBQzNMLEdBQUcsQ0FBQ0EsR0FBRyxDQUFDO1lBQ3BCNmUsS0FBSyxDQUFDbGYsR0FBRyxDQUFDLEdBQUdLLEdBQUc7WUFDaEJ5YyxRQUFRLENBQUN0QixVQUFVLENBQUMwRCxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUVBLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxLQUFLLENBQUM7VUFDdkQsQ0FBQyxDQUFDO1FBQ0g7TUFDRCxDQUFDLENBQUM7SUFDSCxDQUFDLENBQUM7RUFDSCxDQUFDLENBQUM7QUFDSCxDQUFDLEVBQUMxZ0IsTUFBTSxDQUFDLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JOVDtBQUNnRDtBQUNmO0FBQ1A7QUFDSTtBQUNDO0FBQ0M7QUFDRDtBQUNMIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8va3JkZXYvLi9ub2RlX21vZHVsZXMvaXMtbWFya2VyLWNsdXN0ZXJlci9zcmMvbWFya2VyY2x1c3RlcmVyLmpzIiwid2VicGFjazovL2tyZGV2Ly4vbm9kZV9tb2R1bGVzL2pxdWVyeS1iYXItcmF0aW5nL2pxdWVyeS5iYXJyYXRpbmcuanMiLCJ3ZWJwYWNrOi8va3JkZXYvLi9wa2cva3Ivc3JjL21lZGlhL2pzL3NyYy9zaXRlL2FwcC5qcyIsIndlYnBhY2s6Ly9rcmRldi8uL3BrZy9rci9zcmMvbWVkaWEvanMvc3JjL3NpdGUvY29uZmlybS5qcyIsIndlYnBhY2s6Ly9rcmRldi8uL3BrZy9rci9zcmMvbWVkaWEvanMvc3JjL3NpdGUvZG9iZW50cnkuanMiLCJ3ZWJwYWNrOi8va3JkZXYvLi9wa2cva3Ivc3JjL21lZGlhL2pzL3NyYy9zaXRlL2d1ZXN0ZGF0YS5qcyIsIndlYnBhY2s6Ly9rcmRldi8uL3BrZy9rci9zcmMvbWVkaWEvanMvc3JjL3NpdGUvbWFnZWxsYW4uanMiLCJ3ZWJwYWNrOi8va3JkZXYvLi9wa2cva3Ivc3JjL21lZGlhL2pzL3NyYy9zaXRlL21hcC5qcyIsIndlYnBhY2s6Ly9rcmRldi8uL3BrZy9rci9zcmMvbWVkaWEvanMvc3JjL3NpdGUvcm91dGUuanMiLCJ3ZWJwYWNrOi8va3JkZXYvLi93ZWJwYWNrLmJ1aWxkLnNpdGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBOcG0gdmVyc2lvbiBvZiBtYXJrZXJDbHVzdGVyZXIgd29ya3MgZ3JlYXQgd2l0aCBicm93c2VyaWZ5XG4gKiBEaWZmZXJlbmNlIGZyb20gdGhlIG9yaWdpbmFsIC0gYWRkcyBhIGNvbW1vbmpzIGZvcm1hdCBhbmQgcmVwbGFjZXMgd2luZG93IHdpdGggZ2xvYmFsIGFuZCBzb21lIHVuaXQgdGVzdFxuICogVGhlIG9yaWdpbmFsIGZ1bmN0aW9uYWxpdHkgaXQncyBub3QgbW9kaWZpZWQgZm9yIGRvY3MgYW5kIG9yaWdpbmFsIHNvdXJjZSBjaGVja1xuICogaHR0cHM6Ly9naXRodWIuY29tL2dvb2dsZW1hcHMvanMtbWFya2VyLWNsdXN0ZXJlclxuICovXG5cbi8qKlxuICogQG5hbWUgTWFya2VyQ2x1c3RlcmVyIGZvciBHb29nbGUgTWFwcyB2M1xuICogQHZlcnNpb24gdmVyc2lvbiAxLjBcbiAqIEBhdXRob3IgTHVrZSBNYWhlXG4gKiBAZmlsZW92ZXJ2aWV3XG4gKiBUaGUgbGlicmFyeSBjcmVhdGVzIGFuZCBtYW5hZ2VzIHBlci16b29tLWxldmVsIGNsdXN0ZXJzIGZvciBsYXJnZSBhbW91bnRzIG9mXG4gKiBtYXJrZXJzLlxuICogPGJyLz5cbiAqIFRoaXMgaXMgYSB2MyBpbXBsZW1lbnRhdGlvbiBvZiB0aGVcbiAqIDxhIGhyZWY9XCJodHRwOi8vZ21hcHMtdXRpbGl0eS1saWJyYXJ5LWRldi5nb29nbGVjb2RlLmNvbS9zdm4vdGFncy9tYXJrZXJjbHVzdGVyZXIvXCJcbiAqID52MiBNYXJrZXJDbHVzdGVyZXI8L2E+LlxuICovXG5cbi8qKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cblxuLyoqXG4gKiBBIE1hcmtlciBDbHVzdGVyZXIgdGhhdCBjbHVzdGVycyBtYXJrZXJzLlxuICpcbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTWFwfSBtYXAgVGhlIEdvb2dsZSBtYXAgdG8gYXR0YWNoIHRvLlxuICogQHBhcmFtIHtBcnJheS48Z29vZ2xlLm1hcHMuTWFya2VyPj19IG9wdF9tYXJrZXJzIE9wdGlvbmFsIG1hcmtlcnMgdG8gYWRkIHRvXG4gKiAgIHRoZSBjbHVzdGVyLlxuICogQHBhcmFtIHtPYmplY3Q9fSBvcHRfb3B0aW9ucyBzdXBwb3J0IHRoZSBmb2xsb3dpbmcgb3B0aW9uczpcbiAqICAgICAnZ3JpZFNpemUnOiAobnVtYmVyKSBUaGUgZ3JpZCBzaXplIG9mIGEgY2x1c3RlciBpbiBwaXhlbHMuXG4gKiAgICAgJ21heFpvb20nOiAobnVtYmVyKSBUaGUgbWF4aW11bSB6b29tIGxldmVsIHRoYXQgYSBtYXJrZXIgY2FuIGJlIHBhcnQgb2YgYVxuICogICAgICAgICAgICAgICAgY2x1c3Rlci5cbiAqICAgICAnem9vbU9uQ2xpY2snOiAoYm9vbGVhbikgV2hldGhlciB0aGUgZGVmYXVsdCBiZWhhdmlvdXIgb2YgY2xpY2tpbmcgb24gYVxuICogICAgICAgICAgICAgICAgICAgIGNsdXN0ZXIgaXMgdG8gem9vbSBpbnRvIGl0LlxuICogICAgICdhdmVyYWdlQ2VudGVyJzogKGJvb2xlYW4pIFdldGhlciB0aGUgY2VudGVyIG9mIGVhY2ggY2x1c3RlciBzaG91bGQgYmVcbiAqICAgICAgICAgICAgICAgICAgICAgIHRoZSBhdmVyYWdlIG9mIGFsbCBtYXJrZXJzIGluIHRoZSBjbHVzdGVyLlxuICogICAgICdtaW5pbXVtQ2x1c3RlclNpemUnOiAobnVtYmVyKSBUaGUgbWluaW11bSBudW1iZXIgb2YgbWFya2VycyB0byBiZSBpbiBhXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsdXN0ZXIgYmVmb3JlIHRoZSBtYXJrZXJzIGFyZSBoaWRkZW4gYW5kIGEgY291bnRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgaXMgc2hvd24uXG4gKiAgICAgJ3N0eWxlcyc6IChvYmplY3QpIEFuIG9iamVjdCB0aGF0IGhhcyBzdHlsZSBwcm9wZXJ0aWVzOlxuICogICAgICAgJ3VybCc6IChzdHJpbmcpIFRoZSBpbWFnZSB1cmwuXG4gKiAgICAgICAnaGVpZ2h0JzogKG51bWJlcikgVGhlIGltYWdlIGhlaWdodC5cbiAqICAgICAgICd3aWR0aCc6IChudW1iZXIpIFRoZSBpbWFnZSB3aWR0aC5cbiAqICAgICAgICdhbmNob3InOiAoQXJyYXkpIFRoZSBhbmNob3IgcG9zaXRpb24gb2YgdGhlIGxhYmVsIHRleHQuXG4gKiAgICAgICAndGV4dENvbG9yJzogKHN0cmluZykgVGhlIHRleHQgY29sb3IuXG4gKiAgICAgICAndGV4dFNpemUnOiAobnVtYmVyKSBUaGUgdGV4dCBzaXplLlxuICogICAgICAgJ2ZvbnRGYW1pbHknOiAoc3RyaW5nKSBUaGUgZm9udCBmYW1pbHkuXG4gKiAgICAgICAnZm9udFdlaWdodCc6IChzdHJpbmcpIFRoZSBmb250IHdlaWdodC5cbiAqICAgICAgICdiYWNrZ3JvdW5kUG9zaXRpb24nOiAoc3RyaW5nKSBUaGUgcG9zaXRpb24gb2YgdGhlIGJhY2tnb3VuZCB4LCB5LlxuICogQGNvbnN0cnVjdG9yXG4gKiBAZXh0ZW5kcyBnb29nbGUubWFwcy5PdmVybGF5Vmlld1xuICovXG5mdW5jdGlvbiBNYXJrZXJDbHVzdGVyZXIobWFwLCBvcHRfbWFya2Vycywgb3B0X29wdGlvbnMpIHtcbiAgLy8gTWFya2VyQ2x1c3RlcmVyIGltcGxlbWVudHMgZ29vZ2xlLm1hcHMuT3ZlcmxheVZpZXcgaW50ZXJmYWNlLiBXZSB1c2UgdGhlXG4gIC8vIGV4dGVuZCBmdW5jdGlvbiB0byBleHRlbmQgTWFya2VyQ2x1c3RlcmVyIHdpdGggZ29vZ2xlLm1hcHMuT3ZlcmxheVZpZXdcbiAgLy8gYmVjYXVzZSBpdCBtaWdodCBub3QgYWx3YXlzIGJlIGF2YWlsYWJsZSB3aGVuIHRoZSBjb2RlIGlzIGRlZmluZWQgc28gd2VcbiAgLy8gbG9vayBmb3IgaXQgYXQgdGhlIGxhc3QgcG9zc2libGUgbW9tZW50LiBJZiBpdCBkb2Vzbid0IGV4aXN0IG5vdyB0aGVuXG4gIC8vIHRoZXJlIGlzIG5vIHBvaW50IGdvaW5nIGFoZWFkIDopXG4gIHRoaXMuZXh0ZW5kKE1hcmtlckNsdXN0ZXJlciwgZ29vZ2xlLm1hcHMuT3ZlcmxheVZpZXcpO1xuICB0aGlzLm1hcF8gPSBtYXA7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtBcnJheS48Z29vZ2xlLm1hcHMuTWFya2VyPn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHRoaXMubWFya2Vyc18gPSBbXTtcblxuICAvKipcbiAgICogIEB0eXBlIHtBcnJheS48Q2x1c3Rlcj59XG4gICAqL1xuICB0aGlzLmNsdXN0ZXJzXyA9IFtdO1xuXG4gIHRoaXMuc2l6ZXMgPSBbNTMsIDU2LCA2NiwgNzgsIDkwXTtcblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHRoaXMuc3R5bGVzXyA9IFtdO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHRoaXMucmVhZHlfID0gZmFsc2U7XG5cbiAgdmFyIG9wdGlvbnMgPSBvcHRfb3B0aW9ucyB8fCB7fTtcblxuICAvKipcbiAgICogQHR5cGUge251bWJlcn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHRoaXMuZ3JpZFNpemVfID0gb3B0aW9uc1snZ3JpZFNpemUnXSB8fCA2MDtcblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHRoaXMubWluQ2x1c3RlclNpemVfID0gb3B0aW9uc1snbWluaW11bUNsdXN0ZXJTaXplJ10gfHwgMjtcblxuXG4gIC8qKlxuICAgKiBAdHlwZSB7P251bWJlcn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHRoaXMubWF4Wm9vbV8gPSBvcHRpb25zWydtYXhab29tJ10gfHwgbnVsbDtcblxuICB0aGlzLnN0eWxlc18gPSBvcHRpb25zWydzdHlsZXMnXSB8fCBbXTtcblxuICAvKipcbiAgICogQHR5cGUge3N0cmluZ31cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHRoaXMuaW1hZ2VQYXRoXyA9IG9wdGlvbnNbJ2ltYWdlUGF0aCddIHx8XG4gICAgICB0aGlzLk1BUktFUl9DTFVTVEVSX0lNQUdFX1BBVEhfO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgdGhpcy5pbWFnZUV4dGVuc2lvbl8gPSBvcHRpb25zWydpbWFnZUV4dGVuc2lvbiddIHx8XG4gICAgICB0aGlzLk1BUktFUl9DTFVTVEVSX0lNQUdFX0VYVEVOU0lPTl87XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgdGhpcy56b29tT25DbGlja18gPSB0cnVlO1xuXG4gIGlmIChvcHRpb25zWyd6b29tT25DbGljayddICE9IHVuZGVmaW5lZCkge1xuICAgIHRoaXMuem9vbU9uQ2xpY2tfID0gb3B0aW9uc1snem9vbU9uQ2xpY2snXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHRoaXMuYXZlcmFnZUNlbnRlcl8gPSBmYWxzZTtcblxuICBpZiAob3B0aW9uc1snYXZlcmFnZUNlbnRlciddICE9IHVuZGVmaW5lZCkge1xuICAgIHRoaXMuYXZlcmFnZUNlbnRlcl8gPSBvcHRpb25zWydhdmVyYWdlQ2VudGVyJ107XG4gIH1cblxuICB0aGlzLnNldHVwU3R5bGVzXygpO1xuXG4gIHRoaXMuc2V0TWFwKG1hcCk7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICB0aGlzLnByZXZab29tXyA9IHRoaXMubWFwXy5nZXRab29tKCk7XG5cbiAgLy8gQWRkIHRoZSBtYXAgZXZlbnQgbGlzdGVuZXJzXG4gIHZhciB0aGF0ID0gdGhpcztcbiAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIodGhpcy5tYXBfLCAnem9vbV9jaGFuZ2VkJywgZnVuY3Rpb24oKSB7XG4gICAgdmFyIHpvb20gPSB0aGF0Lm1hcF8uZ2V0Wm9vbSgpO1xuXG4gICAgaWYgKHRoYXQucHJldlpvb21fICE9IHpvb20pIHtcbiAgICAgIHRoYXQucHJldlpvb21fID0gem9vbTtcbiAgICAgIHRoYXQucmVzZXRWaWV3cG9ydCgpO1xuICAgIH1cbiAgfSk7XG5cbiAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIodGhpcy5tYXBfLCAnaWRsZScsIGZ1bmN0aW9uKCkge1xuICAgIHRoYXQucmVkcmF3KCk7XG4gIH0pO1xuXG4gIC8vIEZpbmFsbHksIGFkZCB0aGUgbWFya2Vyc1xuICBpZiAob3B0X21hcmtlcnMgJiYgb3B0X21hcmtlcnMubGVuZ3RoKSB7XG4gICAgdGhpcy5hZGRNYXJrZXJzKG9wdF9tYXJrZXJzLCBmYWxzZSk7XG4gIH1cbn1cblxuXG4vKipcbiAqIFRoZSBtYXJrZXIgY2x1c3RlciBpbWFnZSBwYXRoLlxuICpcbiAqIEB0eXBlIHtzdHJpbmd9XG4gKiBAcHJpdmF0ZVxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLk1BUktFUl9DTFVTVEVSX0lNQUdFX1BBVEhfID1cbiAgICAnaHR0cDovL2dvb2dsZS1tYXBzLXV0aWxpdHktbGlicmFyeS12My5nb29nbGVjb2RlLmNvbS9zdm4vdHJ1bmsvbWFya2VyY2x1c3RlcmVyLycgK1xuICAgICdpbWFnZXMvbSc7XG5cblxuLyoqXG4gKiBUaGUgbWFya2VyIGNsdXN0ZXIgaW1hZ2UgcGF0aC5cbiAqXG4gKiBAdHlwZSB7c3RyaW5nfVxuICogQHByaXZhdGVcbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5NQVJLRVJfQ0xVU1RFUl9JTUFHRV9FWFRFTlNJT05fID0gJ3BuZyc7XG5cblxuLyoqXG4gKiBFeHRlbmRzIGEgb2JqZWN0cyBwcm90b3R5cGUgYnkgYW5vdGhlcnMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iajEgVGhlIG9iamVjdCB0byBiZSBleHRlbmRlZC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmoyIFRoZSBvYmplY3QgdG8gZXh0ZW5kIHdpdGguXG4gKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBuZXcgZXh0ZW5kZWQgb2JqZWN0LlxuICogQGlnbm9yZVxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmV4dGVuZCA9IGZ1bmN0aW9uKG9iajEsIG9iajIpIHtcbiAgcmV0dXJuIChmdW5jdGlvbihvYmplY3QpIHtcbiAgICBmb3IgKHZhciBwcm9wZXJ0eSBpbiBvYmplY3QucHJvdG90eXBlKSB7XG4gICAgICB0aGlzLnByb3RvdHlwZVtwcm9wZXJ0eV0gPSBvYmplY3QucHJvdG90eXBlW3Byb3BlcnR5XTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0pLmFwcGx5KG9iajEsIFtvYmoyXSk7XG59O1xuXG5cbi8qKlxuICogSW1wbGVtZW50YWlvbiBvZiB0aGUgaW50ZXJmYWNlIG1ldGhvZC5cbiAqIEBpZ25vcmVcbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5vbkFkZCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnNldFJlYWR5Xyh0cnVlKTtcbn07XG5cbi8qKlxuICogSW1wbGVtZW50YWlvbiBvZiB0aGUgaW50ZXJmYWNlIG1ldGhvZC5cbiAqIEBpZ25vcmVcbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5kcmF3ID0gZnVuY3Rpb24oKSB7fTtcblxuLyoqXG4gKiBTZXRzIHVwIHRoZSBzdHlsZXMgb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuc2V0dXBTdHlsZXNfID0gZnVuY3Rpb24oKSB7XG4gIGlmICh0aGlzLnN0eWxlc18ubGVuZ3RoKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgZm9yICh2YXIgaSA9IDAsIHNpemU7IHNpemUgPSB0aGlzLnNpemVzW2ldOyBpKyspIHtcbiAgICB0aGlzLnN0eWxlc18ucHVzaCh7XG4gICAgICB1cmw6IHRoaXMuaW1hZ2VQYXRoXyArIChpICsgMSkgKyAnLicgKyB0aGlzLmltYWdlRXh0ZW5zaW9uXyxcbiAgICAgIGhlaWdodDogc2l6ZSxcbiAgICAgIHdpZHRoOiBzaXplXG4gICAgfSk7XG4gIH1cbn07XG5cbi8qKlxuICogIEZpdCB0aGUgbWFwIHRvIHRoZSBib3VuZHMgb2YgdGhlIG1hcmtlcnMgaW4gdGhlIGNsdXN0ZXJlci5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5maXRNYXBUb01hcmtlcnMgPSBmdW5jdGlvbigpIHtcbiAgdmFyIG1hcmtlcnMgPSB0aGlzLmdldE1hcmtlcnMoKTtcbiAgdmFyIGJvdW5kcyA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmdCb3VuZHMoKTtcbiAgZm9yICh2YXIgaSA9IDAsIG1hcmtlcjsgbWFya2VyID0gbWFya2Vyc1tpXTsgaSsrKSB7XG4gICAgYm91bmRzLmV4dGVuZChtYXJrZXIuZ2V0UG9zaXRpb24oKSk7XG4gIH1cblxuICB0aGlzLm1hcF8uZml0Qm91bmRzKGJvdW5kcyk7XG59O1xuXG5cbi8qKlxuICogIFNldHMgdGhlIHN0eWxlcy5cbiAqXG4gKiAgQHBhcmFtIHtPYmplY3R9IHN0eWxlcyBUaGUgc3R5bGUgdG8gc2V0LlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnNldFN0eWxlcyA9IGZ1bmN0aW9uKHN0eWxlcykge1xuICB0aGlzLnN0eWxlc18gPSBzdHlsZXM7XG59O1xuXG5cbi8qKlxuICogIEdldHMgdGhlIHN0eWxlcy5cbiAqXG4gKiAgQHJldHVybiB7T2JqZWN0fSBUaGUgc3R5bGVzIG9iamVjdC5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRTdHlsZXMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuc3R5bGVzXztcbn07XG5cblxuLyoqXG4gKiBXaGV0aGVyIHpvb20gb24gY2xpY2sgaXMgc2V0LlxuICpcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgem9vbU9uQ2xpY2tfIGlzIHNldC5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5pc1pvb21PbkNsaWNrID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnpvb21PbkNsaWNrXztcbn07XG5cbi8qKlxuICogV2hldGhlciBhdmVyYWdlIGNlbnRlciBpcyBzZXQuXG4gKlxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiBhdmVyYWdlQ2VudGVyXyBpcyBzZXQuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuaXNBdmVyYWdlQ2VudGVyID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmF2ZXJhZ2VDZW50ZXJfO1xufTtcblxuXG4vKipcbiAqICBSZXR1cm5zIHRoZSBhcnJheSBvZiBtYXJrZXJzIGluIHRoZSBjbHVzdGVyZXIuXG4gKlxuICogIEByZXR1cm4ge0FycmF5Ljxnb29nbGUubWFwcy5NYXJrZXI+fSBUaGUgbWFya2Vycy5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRNYXJrZXJzID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLm1hcmtlcnNfO1xufTtcblxuXG4vKipcbiAqICBSZXR1cm5zIHRoZSBudW1iZXIgb2YgbWFya2VycyBpbiB0aGUgY2x1c3RlcmVyXG4gKlxuICogIEByZXR1cm4ge051bWJlcn0gVGhlIG51bWJlciBvZiBtYXJrZXJzLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldFRvdGFsTWFya2VycyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5tYXJrZXJzXy5sZW5ndGg7XG59O1xuXG5cbi8qKlxuICogIFNldHMgdGhlIG1heCB6b29tIGZvciB0aGUgY2x1c3RlcmVyLlxuICpcbiAqICBAcGFyYW0ge251bWJlcn0gbWF4Wm9vbSBUaGUgbWF4IHpvb20gbGV2ZWwuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuc2V0TWF4Wm9vbSA9IGZ1bmN0aW9uKG1heFpvb20pIHtcbiAgdGhpcy5tYXhab29tXyA9IG1heFpvb207XG59O1xuXG5cbi8qKlxuICogIEdldHMgdGhlIG1heCB6b29tIGZvciB0aGUgY2x1c3RlcmVyLlxuICpcbiAqICBAcmV0dXJuIHtudW1iZXJ9IFRoZSBtYXggem9vbSBsZXZlbC5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRNYXhab29tID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLm1heFpvb21fO1xufTtcblxuXG4vKipcbiAqICBUaGUgZnVuY3Rpb24gZm9yIGNhbGN1bGF0aW5nIHRoZSBjbHVzdGVyIGljb24gaW1hZ2UuXG4gKlxuICogIEBwYXJhbSB7QXJyYXkuPGdvb2dsZS5tYXBzLk1hcmtlcj59IG1hcmtlcnMgVGhlIG1hcmtlcnMgaW4gdGhlIGNsdXN0ZXJlci5cbiAqICBAcGFyYW0ge251bWJlcn0gbnVtU3R5bGVzIFRoZSBudW1iZXIgb2Ygc3R5bGVzIGF2YWlsYWJsZS5cbiAqICBAcmV0dXJuIHtPYmplY3R9IEEgb2JqZWN0IHByb3BlcnRpZXM6ICd0ZXh0JyAoc3RyaW5nKSBhbmQgJ2luZGV4JyAobnVtYmVyKS5cbiAqICBAcHJpdmF0ZVxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmNhbGN1bGF0b3JfID0gZnVuY3Rpb24obWFya2VycywgbnVtU3R5bGVzKSB7XG4gIHZhciBpbmRleCA9IDA7XG4gIHZhciBjb3VudCA9IG1hcmtlcnMubGVuZ3RoO1xuICB2YXIgZHYgPSBjb3VudDtcbiAgd2hpbGUgKGR2ICE9PSAwKSB7XG4gICAgZHYgPSBwYXJzZUludChkdiAvIDEwLCAxMCk7XG4gICAgaW5kZXgrKztcbiAgfVxuXG4gIGluZGV4ID0gTWF0aC5taW4oaW5kZXgsIG51bVN0eWxlcyk7XG4gIHJldHVybiB7XG4gICAgdGV4dDogY291bnQsXG4gICAgaW5kZXg6IGluZGV4XG4gIH07XG59O1xuXG5cbi8qKlxuICogU2V0IHRoZSBjYWxjdWxhdG9yIGZ1bmN0aW9uLlxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oQXJyYXksIG51bWJlcil9IGNhbGN1bGF0b3IgVGhlIGZ1bmN0aW9uIHRvIHNldCBhcyB0aGVcbiAqICAgICBjYWxjdWxhdG9yLiBUaGUgZnVuY3Rpb24gc2hvdWxkIHJldHVybiBhIG9iamVjdCBwcm9wZXJ0aWVzOlxuICogICAgICd0ZXh0JyAoc3RyaW5nKSBhbmQgJ2luZGV4JyAobnVtYmVyKS5cbiAqXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuc2V0Q2FsY3VsYXRvciA9IGZ1bmN0aW9uKGNhbGN1bGF0b3IpIHtcbiAgdGhpcy5jYWxjdWxhdG9yXyA9IGNhbGN1bGF0b3I7XG59O1xuXG5cbi8qKlxuICogR2V0IHRoZSBjYWxjdWxhdG9yIGZ1bmN0aW9uLlxuICpcbiAqIEByZXR1cm4ge2Z1bmN0aW9uKEFycmF5LCBudW1iZXIpfSB0aGUgY2FsY3VsYXRvciBmdW5jdGlvbi5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRDYWxjdWxhdG9yID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmNhbGN1bGF0b3JfO1xufTtcblxuXG4vKipcbiAqIEFkZCBhbiBhcnJheSBvZiBtYXJrZXJzIHRvIHRoZSBjbHVzdGVyZXIuXG4gKlxuICogQHBhcmFtIHtBcnJheS48Z29vZ2xlLm1hcHMuTWFya2VyPn0gbWFya2VycyBUaGUgbWFya2VycyB0byBhZGQuXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSBvcHRfbm9kcmF3IFdoZXRoZXIgdG8gcmVkcmF3IHRoZSBjbHVzdGVycy5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5hZGRNYXJrZXJzID0gZnVuY3Rpb24obWFya2Vycywgb3B0X25vZHJhdykge1xuICBmb3IgKHZhciBpID0gMCwgbWFya2VyOyBtYXJrZXIgPSBtYXJrZXJzW2ldOyBpKyspIHtcbiAgICB0aGlzLnB1c2hNYXJrZXJUb18obWFya2VyKTtcbiAgfVxuICBpZiAoIW9wdF9ub2RyYXcpIHtcbiAgICB0aGlzLnJlZHJhdygpO1xuICB9XG59O1xuXG5cbi8qKlxuICogUHVzaGVzIGEgbWFya2VyIHRvIHRoZSBjbHVzdGVyZXIuXG4gKlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5NYXJrZXJ9IG1hcmtlciBUaGUgbWFya2VyIHRvIGFkZC5cbiAqIEBwcml2YXRlXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUucHVzaE1hcmtlclRvXyA9IGZ1bmN0aW9uKG1hcmtlcikge1xuICBtYXJrZXIuaXNBZGRlZCA9IGZhbHNlO1xuICBpZiAobWFya2VyWydkcmFnZ2FibGUnXSkge1xuICAgIC8vIElmIHRoZSBtYXJrZXIgaXMgZHJhZ2dhYmxlIGFkZCBhIGxpc3RlbmVyIHNvIHdlIHVwZGF0ZSB0aGUgY2x1c3RlcnMgb25cbiAgICAvLyB0aGUgZHJhZyBlbmQuXG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKG1hcmtlciwgJ2RyYWdlbmQnLCBmdW5jdGlvbigpIHtcbiAgICAgIG1hcmtlci5pc0FkZGVkID0gZmFsc2U7XG4gICAgICB0aGF0LnJlcGFpbnQoKTtcbiAgICB9KTtcbiAgfVxuICB0aGlzLm1hcmtlcnNfLnB1c2gobWFya2VyKTtcbn07XG5cblxuLyoqXG4gKiBBZGRzIGEgbWFya2VyIHRvIHRoZSBjbHVzdGVyZXIgYW5kIHJlZHJhd3MgaWYgbmVlZGVkLlxuICpcbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTWFya2VyfSBtYXJrZXIgVGhlIG1hcmtlciB0byBhZGQuXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSBvcHRfbm9kcmF3IFdoZXRoZXIgdG8gcmVkcmF3IHRoZSBjbHVzdGVycy5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5hZGRNYXJrZXIgPSBmdW5jdGlvbihtYXJrZXIsIG9wdF9ub2RyYXcpIHtcbiAgdGhpcy5wdXNoTWFya2VyVG9fKG1hcmtlcik7XG4gIGlmICghb3B0X25vZHJhdykge1xuICAgIHRoaXMucmVkcmF3KCk7XG4gIH1cbn07XG5cblxuLyoqXG4gKiBSZW1vdmVzIGEgbWFya2VyIGFuZCByZXR1cm5zIHRydWUgaWYgcmVtb3ZlZCwgZmFsc2UgaWYgbm90XG4gKlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5NYXJrZXJ9IG1hcmtlciBUaGUgbWFya2VyIHRvIHJlbW92ZVxuICogQHJldHVybiB7Ym9vbGVhbn0gV2hldGhlciB0aGUgbWFya2VyIHdhcyByZW1vdmVkIG9yIG5vdFxuICogQHByaXZhdGVcbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5yZW1vdmVNYXJrZXJfID0gZnVuY3Rpb24obWFya2VyKSB7XG4gIHZhciBpbmRleCA9IC0xO1xuICBpZiAodGhpcy5tYXJrZXJzXy5pbmRleE9mKSB7XG4gICAgaW5kZXggPSB0aGlzLm1hcmtlcnNfLmluZGV4T2YobWFya2VyKTtcbiAgfSBlbHNlIHtcbiAgICBmb3IgKHZhciBpID0gMCwgbTsgbSA9IHRoaXMubWFya2Vyc19baV07IGkrKykge1xuICAgICAgaWYgKG0gPT0gbWFya2VyKSB7XG4gICAgICAgIGluZGV4ID0gaTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKGluZGV4ID09IC0xKSB7XG4gICAgLy8gTWFya2VyIGlzIG5vdCBpbiBvdXIgbGlzdCBvZiBtYXJrZXJzLlxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIG1hcmtlci5zZXRNYXAobnVsbCk7XG5cbiAgdGhpcy5tYXJrZXJzXy5zcGxpY2UoaW5kZXgsIDEpO1xuXG4gIHJldHVybiB0cnVlO1xufTtcblxuXG4vKipcbiAqIFJlbW92ZSBhIG1hcmtlciBmcm9tIHRoZSBjbHVzdGVyLlxuICpcbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTWFya2VyfSBtYXJrZXIgVGhlIG1hcmtlciB0byByZW1vdmUuXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSBvcHRfbm9kcmF3IE9wdGlvbmFsIGJvb2xlYW4gdG8gZm9yY2Ugbm8gcmVkcmF3LlxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgbWFya2VyIHdhcyByZW1vdmVkLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnJlbW92ZU1hcmtlciA9IGZ1bmN0aW9uKG1hcmtlciwgb3B0X25vZHJhdykge1xuICB2YXIgcmVtb3ZlZCA9IHRoaXMucmVtb3ZlTWFya2VyXyhtYXJrZXIpO1xuXG4gIGlmICghb3B0X25vZHJhdyAmJiByZW1vdmVkKSB7XG4gICAgdGhpcy5yZXNldFZpZXdwb3J0KCk7XG4gICAgdGhpcy5yZWRyYXcoKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxuXG4vKipcbiAqIFJlbW92ZXMgYW4gYXJyYXkgb2YgbWFya2VycyBmcm9tIHRoZSBjbHVzdGVyLlxuICpcbiAqIEBwYXJhbSB7QXJyYXkuPGdvb2dsZS5tYXBzLk1hcmtlcj59IG1hcmtlcnMgVGhlIG1hcmtlcnMgdG8gcmVtb3ZlLlxuICogQHBhcmFtIHtib29sZWFuPX0gb3B0X25vZHJhdyBPcHRpb25hbCBib29sZWFuIHRvIGZvcmNlIG5vIHJlZHJhdy5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5yZW1vdmVNYXJrZXJzID0gZnVuY3Rpb24obWFya2Vycywgb3B0X25vZHJhdykge1xuICB2YXIgcmVtb3ZlZCA9IGZhbHNlO1xuXG4gIGZvciAodmFyIGkgPSAwLCBtYXJrZXI7IG1hcmtlciA9IG1hcmtlcnNbaV07IGkrKykge1xuICAgIHZhciByID0gdGhpcy5yZW1vdmVNYXJrZXJfKG1hcmtlcik7XG4gICAgcmVtb3ZlZCA9IHJlbW92ZWQgfHwgcjtcbiAgfVxuXG4gIGlmICghb3B0X25vZHJhdyAmJiByZW1vdmVkKSB7XG4gICAgdGhpcy5yZXNldFZpZXdwb3J0KCk7XG4gICAgdGhpcy5yZWRyYXcoKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTtcblxuXG4vKipcbiAqIFNldHMgdGhlIGNsdXN0ZXJlcidzIHJlYWR5IHN0YXRlLlxuICpcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gcmVhZHkgVGhlIHN0YXRlLlxuICogQHByaXZhdGVcbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5zZXRSZWFkeV8gPSBmdW5jdGlvbihyZWFkeSkge1xuICBpZiAoIXRoaXMucmVhZHlfKSB7XG4gICAgdGhpcy5yZWFkeV8gPSByZWFkeTtcbiAgICB0aGlzLmNyZWF0ZUNsdXN0ZXJzXygpO1xuICB9XG59O1xuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIGNsdXN0ZXJzIGluIHRoZSBjbHVzdGVyZXIuXG4gKlxuICogQHJldHVybiB7bnVtYmVyfSBUaGUgbnVtYmVyIG9mIGNsdXN0ZXJzLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldFRvdGFsQ2x1c3RlcnMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuY2x1c3RlcnNfLmxlbmd0aDtcbn07XG5cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBnb29nbGUgbWFwIHRoYXQgdGhlIGNsdXN0ZXJlciBpcyBhc3NvY2lhdGVkIHdpdGguXG4gKlxuICogQHJldHVybiB7Z29vZ2xlLm1hcHMuTWFwfSBUaGUgbWFwLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldE1hcCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5tYXBfO1xufTtcblxuXG4vKipcbiAqIFNldHMgdGhlIGdvb2dsZSBtYXAgdGhhdCB0aGUgY2x1c3RlcmVyIGlzIGFzc29jaWF0ZWQgd2l0aC5cbiAqXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLk1hcH0gbWFwIFRoZSBtYXAuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuc2V0TWFwID0gZnVuY3Rpb24obWFwKSB7XG4gIHRoaXMubWFwXyA9IG1hcDtcbn07XG5cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBzaXplIG9mIHRoZSBncmlkLlxuICpcbiAqIEByZXR1cm4ge251bWJlcn0gVGhlIGdyaWQgc2l6ZS5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRHcmlkU2l6ZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5ncmlkU2l6ZV87XG59O1xuXG5cbi8qKlxuICogU2V0cyB0aGUgc2l6ZSBvZiB0aGUgZ3JpZC5cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gc2l6ZSBUaGUgZ3JpZCBzaXplLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnNldEdyaWRTaXplID0gZnVuY3Rpb24oc2l6ZSkge1xuICB0aGlzLmdyaWRTaXplXyA9IHNpemU7XG59O1xuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgbWluIGNsdXN0ZXIgc2l6ZS5cbiAqXG4gKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSBncmlkIHNpemUuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0TWluQ2x1c3RlclNpemUgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMubWluQ2x1c3RlclNpemVfO1xufTtcblxuLyoqXG4gKiBTZXRzIHRoZSBtaW4gY2x1c3RlciBzaXplLlxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBzaXplIFRoZSBncmlkIHNpemUuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuc2V0TWluQ2x1c3RlclNpemUgPSBmdW5jdGlvbihzaXplKSB7XG4gIHRoaXMubWluQ2x1c3RlclNpemVfID0gc2l6ZTtcbn07XG5cblxuLyoqXG4gKiBFeHRlbmRzIGEgYm91bmRzIG9iamVjdCBieSB0aGUgZ3JpZCBzaXplLlxuICpcbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTGF0TG5nQm91bmRzfSBib3VuZHMgVGhlIGJvdW5kcyB0byBleHRlbmQuXG4gKiBAcmV0dXJuIHtnb29nbGUubWFwcy5MYXRMbmdCb3VuZHN9IFRoZSBleHRlbmRlZCBib3VuZHMuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0RXh0ZW5kZWRCb3VuZHMgPSBmdW5jdGlvbihib3VuZHMpIHtcbiAgdmFyIHByb2plY3Rpb24gPSB0aGlzLmdldFByb2plY3Rpb24oKTtcblxuICAvLyBUdXJuIHRoZSBib3VuZHMgaW50byBsYXRsbmcuXG4gIHZhciB0ciA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoYm91bmRzLmdldE5vcnRoRWFzdCgpLmxhdCgpLFxuICAgICAgYm91bmRzLmdldE5vcnRoRWFzdCgpLmxuZygpKTtcbiAgdmFyIGJsID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhib3VuZHMuZ2V0U291dGhXZXN0KCkubGF0KCksXG4gICAgICBib3VuZHMuZ2V0U291dGhXZXN0KCkubG5nKCkpO1xuXG4gIC8vIENvbnZlcnQgdGhlIHBvaW50cyB0byBwaXhlbHMgYW5kIHRoZSBleHRlbmQgb3V0IGJ5IHRoZSBncmlkIHNpemUuXG4gIHZhciB0clBpeCA9IHByb2plY3Rpb24uZnJvbUxhdExuZ1RvRGl2UGl4ZWwodHIpO1xuICB0clBpeC54ICs9IHRoaXMuZ3JpZFNpemVfO1xuICB0clBpeC55IC09IHRoaXMuZ3JpZFNpemVfO1xuXG4gIHZhciBibFBpeCA9IHByb2plY3Rpb24uZnJvbUxhdExuZ1RvRGl2UGl4ZWwoYmwpO1xuICBibFBpeC54IC09IHRoaXMuZ3JpZFNpemVfO1xuICBibFBpeC55ICs9IHRoaXMuZ3JpZFNpemVfO1xuXG4gIC8vIENvbnZlcnQgdGhlIHBpeGVsIHBvaW50cyBiYWNrIHRvIExhdExuZ1xuICB2YXIgbmUgPSBwcm9qZWN0aW9uLmZyb21EaXZQaXhlbFRvTGF0TG5nKHRyUGl4KTtcbiAgdmFyIHN3ID0gcHJvamVjdGlvbi5mcm9tRGl2UGl4ZWxUb0xhdExuZyhibFBpeCk7XG5cbiAgLy8gRXh0ZW5kIHRoZSBib3VuZHMgdG8gY29udGFpbiB0aGUgbmV3IGJvdW5kcy5cbiAgYm91bmRzLmV4dGVuZChuZSk7XG4gIGJvdW5kcy5leHRlbmQoc3cpO1xuXG4gIHJldHVybiBib3VuZHM7XG59O1xuXG5cbi8qKlxuICogRGV0ZXJtaW5zIGlmIGEgbWFya2VyIGlzIGNvbnRhaW5lZCBpbiBhIGJvdW5kcy5cbiAqXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLk1hcmtlcn0gbWFya2VyIFRoZSBtYXJrZXIgdG8gY2hlY2suXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLkxhdExuZ0JvdW5kc30gYm91bmRzIFRoZSBib3VuZHMgdG8gY2hlY2sgYWdhaW5zdC5cbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdGhlIG1hcmtlciBpcyBpbiB0aGUgYm91bmRzLlxuICogQHByaXZhdGVcbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5pc01hcmtlckluQm91bmRzXyA9IGZ1bmN0aW9uKG1hcmtlciwgYm91bmRzKSB7XG4gIHJldHVybiBib3VuZHMuY29udGFpbnMobWFya2VyLmdldFBvc2l0aW9uKCkpO1xufTtcblxuXG4vKipcbiAqIENsZWFycyBhbGwgY2x1c3RlcnMgYW5kIG1hcmtlcnMgZnJvbSB0aGUgY2x1c3RlcmVyLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmNsZWFyTWFya2VycyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnJlc2V0Vmlld3BvcnQodHJ1ZSk7XG5cbiAgLy8gU2V0IHRoZSBtYXJrZXJzIGEgZW1wdHkgYXJyYXkuXG4gIHRoaXMubWFya2Vyc18gPSBbXTtcbn07XG5cblxuLyoqXG4gKiBDbGVhcnMgYWxsIGV4aXN0aW5nIGNsdXN0ZXJzIGFuZCByZWNyZWF0ZXMgdGhlbS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0X2hpZGUgVG8gYWxzbyBoaWRlIHRoZSBtYXJrZXIuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUucmVzZXRWaWV3cG9ydCA9IGZ1bmN0aW9uKG9wdF9oaWRlKSB7XG4gIC8vIFJlbW92ZSBhbGwgdGhlIGNsdXN0ZXJzXG4gIGZvciAodmFyIGkgPSAwLCBjbHVzdGVyOyBjbHVzdGVyID0gdGhpcy5jbHVzdGVyc19baV07IGkrKykge1xuICAgIGNsdXN0ZXIucmVtb3ZlKCk7XG4gIH1cblxuICAvLyBSZXNldCB0aGUgbWFya2VycyB0byBub3QgYmUgYWRkZWQgYW5kIHRvIGJlIGludmlzaWJsZS5cbiAgZm9yICh2YXIgaSA9IDAsIG1hcmtlcjsgbWFya2VyID0gdGhpcy5tYXJrZXJzX1tpXTsgaSsrKSB7XG4gICAgbWFya2VyLmlzQWRkZWQgPSBmYWxzZTtcbiAgICBpZiAob3B0X2hpZGUpIHtcbiAgICAgIG1hcmtlci5zZXRNYXAobnVsbCk7XG4gICAgfVxuICB9XG5cbiAgdGhpcy5jbHVzdGVyc18gPSBbXTtcbn07XG5cbi8qKlxuICpcbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5yZXBhaW50ID0gZnVuY3Rpb24oKSB7XG4gIHZhciBvbGRDbHVzdGVycyA9IHRoaXMuY2x1c3RlcnNfLnNsaWNlKCk7XG4gIHRoaXMuY2x1c3RlcnNfLmxlbmd0aCA9IDA7XG4gIHRoaXMucmVzZXRWaWV3cG9ydCgpO1xuICB0aGlzLnJlZHJhdygpO1xuXG4gIC8vIFJlbW92ZSB0aGUgb2xkIGNsdXN0ZXJzLlxuICAvLyBEbyBpdCBpbiBhIHRpbWVvdXQgc28gdGhlIG90aGVyIGNsdXN0ZXJzIGhhdmUgYmVlbiBkcmF3biBmaXJzdC5cbiAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGNsdXN0ZXI7IGNsdXN0ZXIgPSBvbGRDbHVzdGVyc1tpXTsgaSsrKSB7XG4gICAgICBjbHVzdGVyLnJlbW92ZSgpO1xuICAgIH1cbiAgfSwgMCk7XG59O1xuXG5cbi8qKlxuICogUmVkcmF3cyB0aGUgY2x1c3RlcnMuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUucmVkcmF3ID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuY3JlYXRlQ2x1c3RlcnNfKCk7XG59O1xuXG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgZGlzdGFuY2UgYmV0d2VlbiB0d28gbGF0bG5nIGxvY2F0aW9ucyBpbiBrbS5cbiAqIEBzZWUgaHR0cDovL3d3dy5tb3ZhYmxlLXR5cGUuY28udWsvc2NyaXB0cy9sYXRsb25nLmh0bWxcbiAqXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLkxhdExuZ30gcDEgVGhlIGZpcnN0IGxhdCBsbmcgcG9pbnQuXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLkxhdExuZ30gcDIgVGhlIHNlY29uZCBsYXQgbG5nIHBvaW50LlxuICogQHJldHVybiB7bnVtYmVyfSBUaGUgZGlzdGFuY2UgYmV0d2VlbiB0aGUgdHdvIHBvaW50cyBpbiBrbS5cbiAqIEBwcml2YXRlXG4qL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5kaXN0YW5jZUJldHdlZW5Qb2ludHNfID0gZnVuY3Rpb24ocDEsIHAyKSB7XG4gIGlmICghcDEgfHwgIXAyKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICB2YXIgUiA9IDYzNzE7IC8vIFJhZGl1cyBvZiB0aGUgRWFydGggaW4ga21cbiAgdmFyIGRMYXQgPSAocDIubGF0KCkgLSBwMS5sYXQoKSkgKiBNYXRoLlBJIC8gMTgwO1xuICB2YXIgZExvbiA9IChwMi5sbmcoKSAtIHAxLmxuZygpKSAqIE1hdGguUEkgLyAxODA7XG4gIHZhciBhID0gTWF0aC5zaW4oZExhdCAvIDIpICogTWF0aC5zaW4oZExhdCAvIDIpICtcbiAgICBNYXRoLmNvcyhwMS5sYXQoKSAqIE1hdGguUEkgLyAxODApICogTWF0aC5jb3MocDIubGF0KCkgKiBNYXRoLlBJIC8gMTgwKSAqXG4gICAgTWF0aC5zaW4oZExvbiAvIDIpICogTWF0aC5zaW4oZExvbiAvIDIpO1xuICB2YXIgYyA9IDIgKiBNYXRoLmF0YW4yKE1hdGguc3FydChhKSwgTWF0aC5zcXJ0KDEgLSBhKSk7XG4gIHZhciBkID0gUiAqIGM7XG4gIHJldHVybiBkO1xufTtcblxuXG4vKipcbiAqIEFkZCBhIG1hcmtlciB0byBhIGNsdXN0ZXIsIG9yIGNyZWF0ZXMgYSBuZXcgY2x1c3Rlci5cbiAqXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLk1hcmtlcn0gbWFya2VyIFRoZSBtYXJrZXIgdG8gYWRkLlxuICogQHByaXZhdGVcbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5hZGRUb0Nsb3Nlc3RDbHVzdGVyXyA9IGZ1bmN0aW9uKG1hcmtlcikge1xuICB2YXIgZGlzdGFuY2UgPSA0MDAwMDsgLy8gU29tZSBsYXJnZSBudW1iZXJcbiAgdmFyIGNsdXN0ZXJUb0FkZFRvID0gbnVsbDtcbiAgdmFyIHBvcyA9IG1hcmtlci5nZXRQb3NpdGlvbigpO1xuICBmb3IgKHZhciBpID0gMCwgY2x1c3RlcjsgY2x1c3RlciA9IHRoaXMuY2x1c3RlcnNfW2ldOyBpKyspIHtcbiAgICB2YXIgY2VudGVyID0gY2x1c3Rlci5nZXRDZW50ZXIoKTtcbiAgICBpZiAoY2VudGVyKSB7XG4gICAgICB2YXIgZCA9IHRoaXMuZGlzdGFuY2VCZXR3ZWVuUG9pbnRzXyhjZW50ZXIsIG1hcmtlci5nZXRQb3NpdGlvbigpKTtcbiAgICAgIGlmIChkIDwgZGlzdGFuY2UpIHtcbiAgICAgICAgZGlzdGFuY2UgPSBkO1xuICAgICAgICBjbHVzdGVyVG9BZGRUbyA9IGNsdXN0ZXI7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKGNsdXN0ZXJUb0FkZFRvICYmIGNsdXN0ZXJUb0FkZFRvLmlzTWFya2VySW5DbHVzdGVyQm91bmRzKG1hcmtlcikpIHtcbiAgICBjbHVzdGVyVG9BZGRUby5hZGRNYXJrZXIobWFya2VyKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgY2x1c3RlciA9IG5ldyBDbHVzdGVyKHRoaXMpO1xuICAgIGNsdXN0ZXIuYWRkTWFya2VyKG1hcmtlcik7XG4gICAgdGhpcy5jbHVzdGVyc18ucHVzaChjbHVzdGVyKTtcbiAgfVxufTtcblxuXG4vKipcbiAqIENyZWF0ZXMgdGhlIGNsdXN0ZXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuY3JlYXRlQ2x1c3RlcnNfID0gZnVuY3Rpb24oKSB7XG4gIGlmICghdGhpcy5yZWFkeV8pIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBHZXQgb3VyIGN1cnJlbnQgbWFwIHZpZXcgYm91bmRzLlxuICAvLyBDcmVhdGUgYSBuZXcgYm91bmRzIG9iamVjdCBzbyB3ZSBkb24ndCBhZmZlY3QgdGhlIG1hcC5cbiAgdmFyIG1hcEJvdW5kcyA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmdCb3VuZHModGhpcy5tYXBfLmdldEJvdW5kcygpLmdldFNvdXRoV2VzdCgpLFxuICAgICAgdGhpcy5tYXBfLmdldEJvdW5kcygpLmdldE5vcnRoRWFzdCgpKTtcbiAgdmFyIGJvdW5kcyA9IHRoaXMuZ2V0RXh0ZW5kZWRCb3VuZHMobWFwQm91bmRzKTtcblxuICBmb3IgKHZhciBpID0gMCwgbWFya2VyOyBtYXJrZXIgPSB0aGlzLm1hcmtlcnNfW2ldOyBpKyspIHtcbiAgICBpZiAoIW1hcmtlci5pc0FkZGVkICYmIHRoaXMuaXNNYXJrZXJJbkJvdW5kc18obWFya2VyLCBib3VuZHMpKSB7XG4gICAgICB0aGlzLmFkZFRvQ2xvc2VzdENsdXN0ZXJfKG1hcmtlcik7XG4gICAgfVxuICB9XG59O1xuXG5cbi8qKlxuICogQSBjbHVzdGVyIHRoYXQgY29udGFpbnMgbWFya2Vycy5cbiAqXG4gKiBAcGFyYW0ge01hcmtlckNsdXN0ZXJlcn0gbWFya2VyQ2x1c3RlcmVyIFRoZSBtYXJrZXJjbHVzdGVyZXIgdGhhdCB0aGlzXG4gKiAgICAgY2x1c3RlciBpcyBhc3NvY2lhdGVkIHdpdGguXG4gKiBAY29uc3RydWN0b3JcbiAqIEBpZ25vcmVcbiAqL1xuZnVuY3Rpb24gQ2x1c3RlcihtYXJrZXJDbHVzdGVyZXIpIHtcbiAgdGhpcy5tYXJrZXJDbHVzdGVyZXJfID0gbWFya2VyQ2x1c3RlcmVyO1xuICB0aGlzLm1hcF8gPSBtYXJrZXJDbHVzdGVyZXIuZ2V0TWFwKCk7XG4gIHRoaXMuZ3JpZFNpemVfID0gbWFya2VyQ2x1c3RlcmVyLmdldEdyaWRTaXplKCk7XG4gIHRoaXMubWluQ2x1c3RlclNpemVfID0gbWFya2VyQ2x1c3RlcmVyLmdldE1pbkNsdXN0ZXJTaXplKCk7XG4gIHRoaXMuYXZlcmFnZUNlbnRlcl8gPSBtYXJrZXJDbHVzdGVyZXIuaXNBdmVyYWdlQ2VudGVyKCk7XG4gIHRoaXMuY2VudGVyXyA9IG51bGw7XG4gIHRoaXMubWFya2Vyc18gPSBbXTtcbiAgdGhpcy5ib3VuZHNfID0gbnVsbDtcbiAgdGhpcy5jbHVzdGVySWNvbl8gPSBuZXcgQ2x1c3Rlckljb24odGhpcywgbWFya2VyQ2x1c3RlcmVyLmdldFN0eWxlcygpLFxuICAgICAgbWFya2VyQ2x1c3RlcmVyLmdldEdyaWRTaXplKCkpO1xufVxuXG4vKipcbiAqIERldGVybWlucyBpZiBhIG1hcmtlciBpcyBhbHJlYWR5IGFkZGVkIHRvIHRoZSBjbHVzdGVyLlxuICpcbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTWFya2VyfSBtYXJrZXIgVGhlIG1hcmtlciB0byBjaGVjay5cbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdGhlIG1hcmtlciBpcyBhbHJlYWR5IGFkZGVkLlxuICovXG5DbHVzdGVyLnByb3RvdHlwZS5pc01hcmtlckFscmVhZHlBZGRlZCA9IGZ1bmN0aW9uKG1hcmtlcikge1xuICBpZiAodGhpcy5tYXJrZXJzXy5pbmRleE9mKSB7XG4gICAgcmV0dXJuIHRoaXMubWFya2Vyc18uaW5kZXhPZihtYXJrZXIpICE9IC0xO1xuICB9IGVsc2Uge1xuICAgIGZvciAodmFyIGkgPSAwLCBtOyBtID0gdGhpcy5tYXJrZXJzX1tpXTsgaSsrKSB7XG4gICAgICBpZiAobSA9PSBtYXJrZXIpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cblxuLyoqXG4gKiBBZGQgYSBtYXJrZXIgdGhlIGNsdXN0ZXIuXG4gKlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5NYXJrZXJ9IG1hcmtlciBUaGUgbWFya2VyIHRvIGFkZC5cbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdGhlIG1hcmtlciB3YXMgYWRkZWQuXG4gKi9cbkNsdXN0ZXIucHJvdG90eXBlLmFkZE1hcmtlciA9IGZ1bmN0aW9uKG1hcmtlcikge1xuICBpZiAodGhpcy5pc01hcmtlckFscmVhZHlBZGRlZChtYXJrZXIpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKCF0aGlzLmNlbnRlcl8pIHtcbiAgICB0aGlzLmNlbnRlcl8gPSBtYXJrZXIuZ2V0UG9zaXRpb24oKTtcbiAgICB0aGlzLmNhbGN1bGF0ZUJvdW5kc18oKTtcbiAgfSBlbHNlIHtcbiAgICBpZiAodGhpcy5hdmVyYWdlQ2VudGVyXykge1xuICAgICAgdmFyIGwgPSB0aGlzLm1hcmtlcnNfLmxlbmd0aCArIDE7XG4gICAgICB2YXIgbGF0ID0gKHRoaXMuY2VudGVyXy5sYXQoKSAqIChsLTEpICsgbWFya2VyLmdldFBvc2l0aW9uKCkubGF0KCkpIC8gbDtcbiAgICAgIHZhciBsbmcgPSAodGhpcy5jZW50ZXJfLmxuZygpICogKGwtMSkgKyBtYXJrZXIuZ2V0UG9zaXRpb24oKS5sbmcoKSkgLyBsO1xuICAgICAgdGhpcy5jZW50ZXJfID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhsYXQsIGxuZyk7XG4gICAgICB0aGlzLmNhbGN1bGF0ZUJvdW5kc18oKTtcbiAgICB9XG4gIH1cblxuICBtYXJrZXIuaXNBZGRlZCA9IHRydWU7XG4gIHRoaXMubWFya2Vyc18ucHVzaChtYXJrZXIpO1xuXG4gIHZhciBsZW4gPSB0aGlzLm1hcmtlcnNfLmxlbmd0aDtcbiAgaWYgKGxlbiA8IHRoaXMubWluQ2x1c3RlclNpemVfICYmIG1hcmtlci5nZXRNYXAoKSAhPSB0aGlzLm1hcF8pIHtcbiAgICAvLyBNaW4gY2x1c3RlciBzaXplIG5vdCByZWFjaGVkIHNvIHNob3cgdGhlIG1hcmtlci5cbiAgICBtYXJrZXIuc2V0TWFwKHRoaXMubWFwXyk7XG4gIH1cblxuICBpZiAobGVuID09IHRoaXMubWluQ2x1c3RlclNpemVfKSB7XG4gICAgLy8gSGlkZSB0aGUgbWFya2VycyB0aGF0IHdlcmUgc2hvd2luZy5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICB0aGlzLm1hcmtlcnNfW2ldLnNldE1hcChudWxsKTtcbiAgICB9XG4gIH1cblxuICBpZiAobGVuID49IHRoaXMubWluQ2x1c3RlclNpemVfKSB7XG4gICAgbWFya2VyLnNldE1hcChudWxsKTtcbiAgfVxuXG4gIHRoaXMudXBkYXRlSWNvbigpO1xuICByZXR1cm4gdHJ1ZTtcbn07XG5cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBtYXJrZXIgY2x1c3RlcmVyIHRoYXQgdGhlIGNsdXN0ZXIgaXMgYXNzb2NpYXRlZCB3aXRoLlxuICpcbiAqIEByZXR1cm4ge01hcmtlckNsdXN0ZXJlcn0gVGhlIGFzc29jaWF0ZWQgbWFya2VyIGNsdXN0ZXJlci5cbiAqL1xuQ2x1c3Rlci5wcm90b3R5cGUuZ2V0TWFya2VyQ2x1c3RlcmVyID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLm1hcmtlckNsdXN0ZXJlcl87XG59O1xuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgYm91bmRzIG9mIHRoZSBjbHVzdGVyLlxuICpcbiAqIEByZXR1cm4ge2dvb2dsZS5tYXBzLkxhdExuZ0JvdW5kc30gdGhlIGNsdXN0ZXIgYm91bmRzLlxuICovXG5DbHVzdGVyLnByb3RvdHlwZS5nZXRCb3VuZHMgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGJvdW5kcyA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmdCb3VuZHModGhpcy5jZW50ZXJfLCB0aGlzLmNlbnRlcl8pO1xuICB2YXIgbWFya2VycyA9IHRoaXMuZ2V0TWFya2VycygpO1xuICBmb3IgKHZhciBpID0gMCwgbWFya2VyOyBtYXJrZXIgPSBtYXJrZXJzW2ldOyBpKyspIHtcbiAgICBib3VuZHMuZXh0ZW5kKG1hcmtlci5nZXRQb3NpdGlvbigpKTtcbiAgfVxuICByZXR1cm4gYm91bmRzO1xufTtcblxuXG4vKipcbiAqIFJlbW92ZXMgdGhlIGNsdXN0ZXJcbiAqL1xuQ2x1c3Rlci5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuY2x1c3Rlckljb25fLnJlbW92ZSgpO1xuICB0aGlzLm1hcmtlcnNfLmxlbmd0aCA9IDA7XG4gIGRlbGV0ZSB0aGlzLm1hcmtlcnNfO1xufTtcblxuXG4vKipcbiAqIFJldHVybnMgdGhlIGNlbnRlciBvZiB0aGUgY2x1c3Rlci5cbiAqXG4gKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSBjbHVzdGVyIGNlbnRlci5cbiAqL1xuQ2x1c3Rlci5wcm90b3R5cGUuZ2V0U2l6ZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5tYXJrZXJzXy5sZW5ndGg7XG59O1xuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgY2VudGVyIG9mIHRoZSBjbHVzdGVyLlxuICpcbiAqIEByZXR1cm4ge0FycmF5Ljxnb29nbGUubWFwcy5NYXJrZXI+fSBUaGUgY2x1c3RlciBjZW50ZXIuXG4gKi9cbkNsdXN0ZXIucHJvdG90eXBlLmdldE1hcmtlcnMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMubWFya2Vyc187XG59O1xuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgY2VudGVyIG9mIHRoZSBjbHVzdGVyLlxuICpcbiAqIEByZXR1cm4ge2dvb2dsZS5tYXBzLkxhdExuZ30gVGhlIGNsdXN0ZXIgY2VudGVyLlxuICovXG5DbHVzdGVyLnByb3RvdHlwZS5nZXRDZW50ZXIgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuY2VudGVyXztcbn07XG5cblxuLyoqXG4gKiBDYWxjdWxhdGVkIHRoZSBleHRlbmRlZCBib3VuZHMgb2YgdGhlIGNsdXN0ZXIgd2l0aCB0aGUgZ3JpZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5DbHVzdGVyLnByb3RvdHlwZS5jYWxjdWxhdGVCb3VuZHNfID0gZnVuY3Rpb24oKSB7XG4gIHZhciBib3VuZHMgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nQm91bmRzKHRoaXMuY2VudGVyXywgdGhpcy5jZW50ZXJfKTtcbiAgdGhpcy5ib3VuZHNfID0gdGhpcy5tYXJrZXJDbHVzdGVyZXJfLmdldEV4dGVuZGVkQm91bmRzKGJvdW5kcyk7XG59O1xuXG5cbi8qKlxuICogRGV0ZXJtaW5lcyBpZiBhIG1hcmtlciBsaWVzIGluIHRoZSBjbHVzdGVycyBib3VuZHMuXG4gKlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5NYXJrZXJ9IG1hcmtlciBUaGUgbWFya2VyIHRvIGNoZWNrLlxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgbWFya2VyIGxpZXMgaW4gdGhlIGJvdW5kcy5cbiAqL1xuQ2x1c3Rlci5wcm90b3R5cGUuaXNNYXJrZXJJbkNsdXN0ZXJCb3VuZHMgPSBmdW5jdGlvbihtYXJrZXIpIHtcbiAgcmV0dXJuIHRoaXMuYm91bmRzXy5jb250YWlucyhtYXJrZXIuZ2V0UG9zaXRpb24oKSk7XG59O1xuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgbWFwIHRoYXQgdGhlIGNsdXN0ZXIgaXMgYXNzb2NpYXRlZCB3aXRoLlxuICpcbiAqIEByZXR1cm4ge2dvb2dsZS5tYXBzLk1hcH0gVGhlIG1hcC5cbiAqL1xuQ2x1c3Rlci5wcm90b3R5cGUuZ2V0TWFwID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLm1hcF87XG59O1xuXG5cbi8qKlxuICogVXBkYXRlcyB0aGUgY2x1c3RlciBpY29uXG4gKi9cbkNsdXN0ZXIucHJvdG90eXBlLnVwZGF0ZUljb24gPSBmdW5jdGlvbigpIHtcbiAgdmFyIHpvb20gPSB0aGlzLm1hcF8uZ2V0Wm9vbSgpO1xuICB2YXIgbXogPSB0aGlzLm1hcmtlckNsdXN0ZXJlcl8uZ2V0TWF4Wm9vbSgpO1xuXG4gIGlmIChteiAmJiB6b29tID4gbXopIHtcbiAgICAvLyBUaGUgem9vbSBpcyBncmVhdGVyIHRoYW4gb3VyIG1heCB6b29tIHNvIHNob3cgYWxsIHRoZSBtYXJrZXJzIGluIGNsdXN0ZXIuXG4gICAgZm9yICh2YXIgaSA9IDAsIG1hcmtlcjsgbWFya2VyID0gdGhpcy5tYXJrZXJzX1tpXTsgaSsrKSB7XG4gICAgICBtYXJrZXIuc2V0TWFwKHRoaXMubWFwXyk7XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmICh0aGlzLm1hcmtlcnNfLmxlbmd0aCA8IHRoaXMubWluQ2x1c3RlclNpemVfKSB7XG4gICAgLy8gTWluIGNsdXN0ZXIgc2l6ZSBub3QgeWV0IHJlYWNoZWQuXG4gICAgdGhpcy5jbHVzdGVySWNvbl8uaGlkZSgpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBudW1TdHlsZXMgPSB0aGlzLm1hcmtlckNsdXN0ZXJlcl8uZ2V0U3R5bGVzKCkubGVuZ3RoO1xuICB2YXIgc3VtcyA9IHRoaXMubWFya2VyQ2x1c3RlcmVyXy5nZXRDYWxjdWxhdG9yKCkodGhpcy5tYXJrZXJzXywgbnVtU3R5bGVzKTtcbiAgdGhpcy5jbHVzdGVySWNvbl8uc2V0Q2VudGVyKHRoaXMuY2VudGVyXyk7XG4gIHRoaXMuY2x1c3Rlckljb25fLnNldFN1bXMoc3Vtcyk7XG4gIHRoaXMuY2x1c3Rlckljb25fLnNob3coKTtcbn07XG5cblxuLyoqXG4gKiBBIGNsdXN0ZXIgaWNvblxuICpcbiAqIEBwYXJhbSB7Q2x1c3Rlcn0gY2x1c3RlciBUaGUgY2x1c3RlciB0byBiZSBhc3NvY2lhdGVkIHdpdGguXG4gKiBAcGFyYW0ge09iamVjdH0gc3R5bGVzIEFuIG9iamVjdCB0aGF0IGhhcyBzdHlsZSBwcm9wZXJ0aWVzOlxuICogICAgICd1cmwnOiAoc3RyaW5nKSBUaGUgaW1hZ2UgdXJsLlxuICogICAgICdoZWlnaHQnOiAobnVtYmVyKSBUaGUgaW1hZ2UgaGVpZ2h0LlxuICogICAgICd3aWR0aCc6IChudW1iZXIpIFRoZSBpbWFnZSB3aWR0aC5cbiAqICAgICAnYW5jaG9yJzogKEFycmF5KSBUaGUgYW5jaG9yIHBvc2l0aW9uIG9mIHRoZSBsYWJlbCB0ZXh0LlxuICogICAgICd0ZXh0Q29sb3InOiAoc3RyaW5nKSBUaGUgdGV4dCBjb2xvci5cbiAqICAgICAndGV4dFNpemUnOiAobnVtYmVyKSBUaGUgdGV4dCBzaXplLlxuICogICAgICAnZm9udEZhbWlseSc6IChzdHJpbmcpIFRoZSBmb250IGZhbWlseS5cbiAqICAgICAgJ2ZvbnRXZWlnaHQnOiAoc3RyaW5nKSBUaGUgZm9udCB3ZWlnaHQuXG4gKiAgICAgJ2JhY2tncm91bmRQb3NpdGlvbjogKHN0cmluZykgVGhlIGJhY2tncm91bmQgcG9zdGl0aW9uIHgsIHkuXG4gKiBAcGFyYW0ge251bWJlcj19IG9wdF9wYWRkaW5nIE9wdGlvbmFsIHBhZGRpbmcgdG8gYXBwbHkgdG8gdGhlIGNsdXN0ZXIgaWNvbi5cbiAqIEBjb25zdHJ1Y3RvclxuICogQGV4dGVuZHMgZ29vZ2xlLm1hcHMuT3ZlcmxheVZpZXdcbiAqIEBpZ25vcmVcbiAqL1xuZnVuY3Rpb24gQ2x1c3Rlckljb24oY2x1c3Rlciwgc3R5bGVzLCBvcHRfcGFkZGluZykge1xuICBjbHVzdGVyLmdldE1hcmtlckNsdXN0ZXJlcigpLmV4dGVuZChDbHVzdGVySWNvbiwgZ29vZ2xlLm1hcHMuT3ZlcmxheVZpZXcpO1xuXG4gIHRoaXMuc3R5bGVzXyA9IHN0eWxlcztcbiAgdGhpcy5wYWRkaW5nXyA9IG9wdF9wYWRkaW5nIHx8IDA7XG4gIHRoaXMuY2x1c3Rlcl8gPSBjbHVzdGVyO1xuICB0aGlzLmNlbnRlcl8gPSBudWxsO1xuICB0aGlzLm1hcF8gPSBjbHVzdGVyLmdldE1hcCgpO1xuICB0aGlzLmRpdl8gPSBudWxsO1xuICB0aGlzLnN1bXNfID0gbnVsbDtcbiAgdGhpcy52aXNpYmxlXyA9IGZhbHNlO1xuXG4gIHRoaXMuc2V0TWFwKHRoaXMubWFwXyk7XG59XG5cblxuLyoqXG4gKiBUcmlnZ2VycyB0aGUgY2x1c3RlcmNsaWNrIGV2ZW50IGFuZCB6b29tJ3MgaWYgdGhlIG9wdGlvbiBpcyBzZXQuXG4gKi9cbkNsdXN0ZXJJY29uLnByb3RvdHlwZS50cmlnZ2VyQ2x1c3RlckNsaWNrID0gZnVuY3Rpb24oKSB7XG4gIHZhciBtYXJrZXJDbHVzdGVyZXIgPSB0aGlzLmNsdXN0ZXJfLmdldE1hcmtlckNsdXN0ZXJlcigpO1xuXG4gIC8vIFRyaWdnZXIgdGhlIGNsdXN0ZXJjbGljayBldmVudC5cbiAgZ29vZ2xlLm1hcHMuZXZlbnQudHJpZ2dlcihtYXJrZXJDbHVzdGVyZXIsICdjbHVzdGVyY2xpY2snLCB0aGlzLmNsdXN0ZXJfKTtcblxuICBpZiAobWFya2VyQ2x1c3RlcmVyLmlzWm9vbU9uQ2xpY2soKSkge1xuICAgIC8vIFpvb20gaW50byB0aGUgY2x1c3Rlci5cbiAgICB0aGlzLm1hcF8uZml0Qm91bmRzKHRoaXMuY2x1c3Rlcl8uZ2V0Qm91bmRzKCkpO1xuICB9XG59O1xuXG5cbi8qKlxuICogQWRkaW5nIHRoZSBjbHVzdGVyIGljb24gdG8gdGhlIGRvbS5cbiAqIEBpZ25vcmVcbiAqL1xuQ2x1c3Rlckljb24ucHJvdG90eXBlLm9uQWRkID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuZGl2XyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xuICBpZiAodGhpcy52aXNpYmxlXykge1xuICAgIHZhciBwb3MgPSB0aGlzLmdldFBvc0Zyb21MYXRMbmdfKHRoaXMuY2VudGVyXyk7XG4gICAgdGhpcy5kaXZfLnN0eWxlLmNzc1RleHQgPSB0aGlzLmNyZWF0ZUNzcyhwb3MpO1xuICAgIHRoaXMuZGl2Xy5pbm5lckhUTUwgPSB0aGlzLnN1bXNfLnRleHQ7XG4gIH1cblxuICB2YXIgcGFuZXMgPSB0aGlzLmdldFBhbmVzKCk7XG4gIHBhbmVzLm92ZXJsYXlNb3VzZVRhcmdldC5hcHBlbmRDaGlsZCh0aGlzLmRpdl8pO1xuXG4gIHZhciB0aGF0ID0gdGhpcztcbiAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkRG9tTGlzdGVuZXIodGhpcy5kaXZfLCAnY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICB0aGF0LnRyaWdnZXJDbHVzdGVyQ2xpY2soKTtcbiAgfSk7XG59O1xuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgcG9zaXRpb24gdG8gcGxhY2UgdGhlIGRpdiBkZW5kaW5nIG9uIHRoZSBsYXRsbmcuXG4gKlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5MYXRMbmd9IGxhdGxuZyBUaGUgcG9zaXRpb24gaW4gbGF0bG5nLlxuICogQHJldHVybiB7Z29vZ2xlLm1hcHMuUG9pbnR9IFRoZSBwb3NpdGlvbiBpbiBwaXhlbHMuXG4gKiBAcHJpdmF0ZVxuICovXG5DbHVzdGVySWNvbi5wcm90b3R5cGUuZ2V0UG9zRnJvbUxhdExuZ18gPSBmdW5jdGlvbihsYXRsbmcpIHtcbiAgdmFyIHBvcyA9IHRoaXMuZ2V0UHJvamVjdGlvbigpLmZyb21MYXRMbmdUb0RpdlBpeGVsKGxhdGxuZyk7XG4gIHBvcy54IC09IHBhcnNlSW50KHRoaXMud2lkdGhfIC8gMiwgMTApO1xuICBwb3MueSAtPSBwYXJzZUludCh0aGlzLmhlaWdodF8gLyAyLCAxMCk7XG4gIHJldHVybiBwb3M7XG59O1xuXG5cbi8qKlxuICogRHJhdyB0aGUgaWNvbi5cbiAqIEBpZ25vcmVcbiAqL1xuQ2x1c3Rlckljb24ucHJvdG90eXBlLmRyYXcgPSBmdW5jdGlvbigpIHtcbiAgaWYgKHRoaXMudmlzaWJsZV8pIHtcbiAgICB2YXIgcG9zID0gdGhpcy5nZXRQb3NGcm9tTGF0TG5nXyh0aGlzLmNlbnRlcl8pO1xuICAgIHRoaXMuZGl2Xy5zdHlsZS50b3AgPSBwb3MueSArICdweCc7XG4gICAgdGhpcy5kaXZfLnN0eWxlLmxlZnQgPSBwb3MueCArICdweCc7XG4gIH1cbn07XG5cblxuLyoqXG4gKiBIaWRlIHRoZSBpY29uLlxuICovXG5DbHVzdGVySWNvbi5wcm90b3R5cGUuaGlkZSA9IGZ1bmN0aW9uKCkge1xuICBpZiAodGhpcy5kaXZfKSB7XG4gICAgdGhpcy5kaXZfLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIH1cbiAgdGhpcy52aXNpYmxlXyA9IGZhbHNlO1xufTtcblxuXG4vKipcbiAqIFBvc2l0aW9uIGFuZCBzaG93IHRoZSBpY29uLlxuICovXG5DbHVzdGVySWNvbi5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uKCkge1xuICBpZiAodGhpcy5kaXZfKSB7XG4gICAgdmFyIHBvcyA9IHRoaXMuZ2V0UG9zRnJvbUxhdExuZ18odGhpcy5jZW50ZXJfKTtcbiAgICB0aGlzLmRpdl8uc3R5bGUuY3NzVGV4dCA9IHRoaXMuY3JlYXRlQ3NzKHBvcyk7XG4gICAgdGhpcy5kaXZfLnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgfVxuICB0aGlzLnZpc2libGVfID0gdHJ1ZTtcbn07XG5cblxuLyoqXG4gKiBSZW1vdmUgdGhlIGljb24gZnJvbSB0aGUgbWFwXG4gKi9cbkNsdXN0ZXJJY29uLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5zZXRNYXAobnVsbCk7XG59O1xuXG5cbi8qKlxuICogSW1wbGVtZW50YXRpb24gb2YgdGhlIG9uUmVtb3ZlIGludGVyZmFjZS5cbiAqIEBpZ25vcmVcbiAqL1xuQ2x1c3Rlckljb24ucHJvdG90eXBlLm9uUmVtb3ZlID0gZnVuY3Rpb24oKSB7XG4gIGlmICh0aGlzLmRpdl8gJiYgdGhpcy5kaXZfLnBhcmVudE5vZGUpIHtcbiAgICB0aGlzLmhpZGUoKTtcbiAgICB0aGlzLmRpdl8ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLmRpdl8pO1xuICAgIHRoaXMuZGl2XyA9IG51bGw7XG4gIH1cbn07XG5cblxuLyoqXG4gKiBTZXQgdGhlIHN1bXMgb2YgdGhlIGljb24uXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHN1bXMgVGhlIHN1bXMgY29udGFpbmluZzpcbiAqICAgJ3RleHQnOiAoc3RyaW5nKSBUaGUgdGV4dCB0byBkaXNwbGF5IGluIHRoZSBpY29uLlxuICogICAnaW5kZXgnOiAobnVtYmVyKSBUaGUgc3R5bGUgaW5kZXggb2YgdGhlIGljb24uXG4gKi9cbkNsdXN0ZXJJY29uLnByb3RvdHlwZS5zZXRTdW1zID0gZnVuY3Rpb24oc3Vtcykge1xuICB0aGlzLnN1bXNfID0gc3VtcztcbiAgdGhpcy50ZXh0XyA9IHN1bXMudGV4dDtcbiAgdGhpcy5pbmRleF8gPSBzdW1zLmluZGV4O1xuICBpZiAodGhpcy5kaXZfKSB7XG4gICAgdGhpcy5kaXZfLmlubmVySFRNTCA9IHN1bXMudGV4dDtcbiAgfVxuXG4gIHRoaXMudXNlU3R5bGUoKTtcbn07XG5cblxuLyoqXG4gKiBTZXRzIHRoZSBpY29uIHRvIHRoZSB0aGUgc3R5bGVzLlxuICovXG5DbHVzdGVySWNvbi5wcm90b3R5cGUudXNlU3R5bGUgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGluZGV4ID0gTWF0aC5tYXgoMCwgdGhpcy5zdW1zXy5pbmRleCAtIDEpO1xuICBpbmRleCA9IE1hdGgubWluKHRoaXMuc3R5bGVzXy5sZW5ndGggLSAxLCBpbmRleCk7XG4gIHZhciBzdHlsZSA9IHRoaXMuc3R5bGVzX1tpbmRleF07XG4gIHRoaXMudXJsXyA9IHN0eWxlWyd1cmwnXTtcbiAgdGhpcy5oZWlnaHRfID0gc3R5bGVbJ2hlaWdodCddO1xuICB0aGlzLndpZHRoXyA9IHN0eWxlWyd3aWR0aCddO1xuICB0aGlzLnRleHRDb2xvcl8gPSBzdHlsZVsndGV4dENvbG9yJ107XG4gIHRoaXMuYW5jaG9yXyA9IHN0eWxlWydhbmNob3InXTtcbiAgdGhpcy50ZXh0U2l6ZV8gPSBzdHlsZVsndGV4dFNpemUnXTtcbiAgdGhpcy5mb250RmFtaWx5XyA9IHN0eWxlWydmb250RmFtaWx5J107XG4gIHRoaXMuZm9udFdlaWdodF8gPSBzdHlsZVsnZm9udFdlaWdodCddO1xuICB0aGlzLmJhY2tncm91bmRQb3NpdGlvbl8gPSBzdHlsZVsnYmFja2dyb3VuZFBvc2l0aW9uJ107XG59O1xuXG5cbi8qKlxuICogU2V0cyB0aGUgY2VudGVyIG9mIHRoZSBpY29uLlxuICpcbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTGF0TG5nfSBjZW50ZXIgVGhlIGxhdGxuZyB0byBzZXQgYXMgdGhlIGNlbnRlci5cbiAqL1xuQ2x1c3Rlckljb24ucHJvdG90eXBlLnNldENlbnRlciA9IGZ1bmN0aW9uKGNlbnRlcikge1xuICB0aGlzLmNlbnRlcl8gPSBjZW50ZXI7XG59O1xuXG5cbi8qKlxuICogQ3JlYXRlIHRoZSBjc3MgdGV4dCBiYXNlZCBvbiB0aGUgcG9zaXRpb24gb2YgdGhlIGljb24uXG4gKlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5Qb2ludH0gcG9zIFRoZSBwb3NpdGlvbi5cbiAqIEByZXR1cm4ge3N0cmluZ30gVGhlIGNzcyBzdHlsZSB0ZXh0LlxuICovXG5DbHVzdGVySWNvbi5wcm90b3R5cGUuY3JlYXRlQ3NzID0gZnVuY3Rpb24ocG9zKSB7XG4gIHZhciBzdHlsZSA9IFtdO1xuICBzdHlsZS5wdXNoKCdiYWNrZ3JvdW5kLWltYWdlOnVybCgnICsgdGhpcy51cmxfICsgJyk7Jyk7XG4gIHZhciBiYWNrZ3JvdW5kUG9zaXRpb24gPSB0aGlzLmJhY2tncm91bmRQb3NpdGlvbl8gPyB0aGlzLmJhY2tncm91bmRQb3NpdGlvbl8gOiAnMCAwJztcbiAgc3R5bGUucHVzaCgnYmFja2dyb3VuZC1wb3NpdGlvbjonICsgYmFja2dyb3VuZFBvc2l0aW9uICsgJzsnKTtcblxuICBpZiAodHlwZW9mIHRoaXMuYW5jaG9yXyA9PT0gJ29iamVjdCcpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMuYW5jaG9yX1swXSA9PT0gJ251bWJlcicgJiYgdGhpcy5hbmNob3JfWzBdID4gMCAmJlxuICAgICAgICB0aGlzLmFuY2hvcl9bMF0gPCB0aGlzLmhlaWdodF8pIHtcbiAgICAgIHN0eWxlLnB1c2goJ2hlaWdodDonICsgKHRoaXMuaGVpZ2h0XyAtIHRoaXMuYW5jaG9yX1swXSkgK1xuICAgICAgICAgICdweDsgcGFkZGluZy10b3A6JyArIHRoaXMuYW5jaG9yX1swXSArICdweDsnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3R5bGUucHVzaCgnaGVpZ2h0OicgKyB0aGlzLmhlaWdodF8gKyAncHg7IGxpbmUtaGVpZ2h0OicgKyB0aGlzLmhlaWdodF8gK1xuICAgICAgICAgICdweDsnKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB0aGlzLmFuY2hvcl9bMV0gPT09ICdudW1iZXInICYmIHRoaXMuYW5jaG9yX1sxXSA+IDAgJiZcbiAgICAgICAgdGhpcy5hbmNob3JfWzFdIDwgdGhpcy53aWR0aF8pIHtcbiAgICAgIHN0eWxlLnB1c2goJ3dpZHRoOicgKyAodGhpcy53aWR0aF8gLSB0aGlzLmFuY2hvcl9bMV0pICtcbiAgICAgICAgICAncHg7IHBhZGRpbmctbGVmdDonICsgdGhpcy5hbmNob3JfWzFdICsgJ3B4OycpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZS5wdXNoKCd3aWR0aDonICsgdGhpcy53aWR0aF8gKyAncHg7IHRleHQtYWxpZ246Y2VudGVyOycpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBzdHlsZS5wdXNoKCdoZWlnaHQ6JyArIHRoaXMuaGVpZ2h0XyArICdweDsgbGluZS1oZWlnaHQ6JyArXG4gICAgICAgIHRoaXMuaGVpZ2h0XyArICdweDsgd2lkdGg6JyArIHRoaXMud2lkdGhfICsgJ3B4OyB0ZXh0LWFsaWduOmNlbnRlcjsnKTtcbiAgfVxuXG4gIHZhciB0eHRDb2xvciA9IHRoaXMudGV4dENvbG9yXyA/IHRoaXMudGV4dENvbG9yXyA6ICdibGFjayc7XG4gIHZhciB0eHRTaXplID0gdGhpcy50ZXh0U2l6ZV8gPyB0aGlzLnRleHRTaXplXyA6IDExO1xuICB2YXIgZm9udEZhbWlseSA9IHRoaXMuZm9udEZhbWlseV8gPyB0aGlzLmZvbnRGYW1pbHlfIDogJ0FyaWFsLHNhbnMtc2VyaWYnO1xuICB2YXIgZm9udFdlaWdodCA9IHRoaXMuZm9udFdlaWdodF8gPyB0aGlzLmZvbnRXZWlnaHRfIDogJzQwMCc7XG5cbiAgc3R5bGUucHVzaCgnY3Vyc29yOnBvaW50ZXI7IHRvcDonICsgcG9zLnkgKyAncHg7IGxlZnQ6JyArXG4gICAgICBwb3MueCArICdweDsgY29sb3I6JyArIHR4dENvbG9yICsgJzsgcG9zaXRpb246YWJzb2x1dGU7IGZvbnQtc2l6ZTonICtcbiAgICAgIHR4dFNpemUgKyAncHg7IGZvbnQtZmFtaWx5OicgKyBmb250RmFtaWx5ICsgJzsgZm9udC13ZWlnaHQ6JyArIGZvbnRXZWlnaHQgKyAnOycpO1xuICByZXR1cm4gc3R5bGUuam9pbignJyk7XG59O1xuXG5cbi8vIEV4cG9ydCBTeW1ib2xzIGZvciBDbG9zdXJlXG4vLyBJZiB5b3UgYXJlIG5vdCBnb2luZyB0byBjb21waWxlIHdpdGggY2xvc3VyZSB0aGVuIHlvdSBjYW4gcmVtb3ZlIHRoZVxuLy8gY29kZSBiZWxvdy5cbmdsb2JhbFsnTWFya2VyQ2x1c3RlcmVyJ10gPSBNYXJrZXJDbHVzdGVyZXI7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydhZGRNYXJrZXInXSA9IE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuYWRkTWFya2VyO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnYWRkTWFya2VycyddID0gTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5hZGRNYXJrZXJzO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnY2xlYXJNYXJrZXJzJ10gPVxuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuY2xlYXJNYXJrZXJzO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnZml0TWFwVG9NYXJrZXJzJ10gPVxuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZml0TWFwVG9NYXJrZXJzO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnZ2V0Q2FsY3VsYXRvciddID1cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldENhbGN1bGF0b3I7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydnZXRHcmlkU2l6ZSddID1cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldEdyaWRTaXplO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnZ2V0RXh0ZW5kZWRCb3VuZHMnXSA9XG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRFeHRlbmRlZEJvdW5kcztcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ2dldE1hcCddID0gTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRNYXA7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydnZXRNYXJrZXJzJ10gPSBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldE1hcmtlcnM7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydnZXRNYXhab29tJ10gPSBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldE1heFpvb207XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydnZXRTdHlsZXMnXSA9IE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0U3R5bGVzO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnZ2V0VG90YWxDbHVzdGVycyddID1cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldFRvdGFsQ2x1c3RlcnM7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydnZXRUb3RhbE1hcmtlcnMnXSA9XG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRUb3RhbE1hcmtlcnM7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydyZWRyYXcnXSA9IE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUucmVkcmF3O1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsncmVtb3ZlTWFya2VyJ10gPVxuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUucmVtb3ZlTWFya2VyO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsncmVtb3ZlTWFya2VycyddID1cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnJlbW92ZU1hcmtlcnM7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydyZXNldFZpZXdwb3J0J10gPVxuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUucmVzZXRWaWV3cG9ydDtcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ3JlcGFpbnQnXSA9XG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5yZXBhaW50O1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnc2V0Q2FsY3VsYXRvciddID1cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnNldENhbGN1bGF0b3I7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydzZXRHcmlkU2l6ZSddID1cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnNldEdyaWRTaXplO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnc2V0TWF4Wm9vbSddID1cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnNldE1heFpvb207XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydvbkFkZCddID0gTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5vbkFkZDtcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ2RyYXcnXSA9IE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZHJhdztcblxuQ2x1c3Rlci5wcm90b3R5cGVbJ2dldENlbnRlciddID0gQ2x1c3Rlci5wcm90b3R5cGUuZ2V0Q2VudGVyO1xuQ2x1c3Rlci5wcm90b3R5cGVbJ2dldFNpemUnXSA9IENsdXN0ZXIucHJvdG90eXBlLmdldFNpemU7XG5DbHVzdGVyLnByb3RvdHlwZVsnZ2V0TWFya2VycyddID0gQ2x1c3Rlci5wcm90b3R5cGUuZ2V0TWFya2VycztcblxuQ2x1c3Rlckljb24ucHJvdG90eXBlWydvbkFkZCddID0gQ2x1c3Rlckljb24ucHJvdG90eXBlLm9uQWRkO1xuQ2x1c3Rlckljb24ucHJvdG90eXBlWydkcmF3J10gPSBDbHVzdGVySWNvbi5wcm90b3R5cGUuZHJhdztcbkNsdXN0ZXJJY29uLnByb3RvdHlwZVsnb25SZW1vdmUnXSA9IENsdXN0ZXJJY29uLnByb3RvdHlwZS5vblJlbW92ZTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IE1hcmtlckNsdXN0ZXJlcjtcbiIsIi8qKlxuICogalF1ZXJ5IEJhciBSYXRpbmcgUGx1Z2luIHYxLjIuMlxuICpcbiAqIGh0dHA6Ly9naXRodWIuY29tL2FudGVubmFpby9qcXVlcnktYmFyLXJhdGluZ1xuICpcbiAqIENvcHlyaWdodCAoYykgMjAxMi0yMDE2IEthemlrIFBpZXRydXN6ZXdza2lcbiAqXG4gKiBUaGlzIHBsdWdpbiBpcyBhdmFpbGFibGUgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuICogaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAqL1xuKGZ1bmN0aW9uIChmYWN0b3J5KSB7XG4gICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICAvLyBBTURcbiAgICAgICAgZGVmaW5lKFsnanF1ZXJ5J10sIGZhY3RvcnkpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICAgICAgLy8gTm9kZS9Db21tb25KU1xuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZSgnanF1ZXJ5JykpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGJyb3dzZXIgZ2xvYmFsc1xuICAgICAgICBmYWN0b3J5KGpRdWVyeSk7XG4gICAgfVxufShmdW5jdGlvbiAoJCkge1xuXG4gICAgdmFyIEJhclJhdGluZyA9IChmdW5jdGlvbigpIHtcblxuICAgICAgICBmdW5jdGlvbiBCYXJSYXRpbmcoKSB7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgICAgIC8vIHdyYXAgZWxlbWVudCBpbiBhIHdyYXBwZXIgZGl2XG4gICAgICAgICAgICB2YXIgd3JhcEVsZW1lbnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgY2xhc3NlcyA9IFsnYnItd3JhcHBlciddO1xuXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYub3B0aW9ucy50aGVtZSAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKCdici10aGVtZS0nICsgc2VsZi5vcHRpb25zLnRoZW1lKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLndyYXAoJCgnPGRpdiAvPicsIHtcbiAgICAgICAgICAgICAgICAgICAgJ2NsYXNzJzogY2xhc3Nlcy5qb2luKCcgJylcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyB1bndyYXAgZWxlbWVudFxuICAgICAgICAgICAgdmFyIHVud3JhcEVsZW1lbnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLnVud3JhcCgpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gZmluZCBvcHRpb24gYnkgdmFsdWVcbiAgICAgICAgICAgIHZhciBmaW5kT3B0aW9uID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoJC5pc051bWVyaWModmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gTWF0aC5mbG9vcih2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuICQoJ29wdGlvblt2YWx1ZT1cIicgKyB2YWx1ZSAgKyAnXCJdJywgc2VsZi4kZWxlbSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBnZXQgaW5pdGlhbCBvcHRpb25cbiAgICAgICAgICAgIHZhciBnZXRJbml0aWFsT3B0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIGluaXRpYWxSYXRpbmcgPSBzZWxmLm9wdGlvbnMuaW5pdGlhbFJhdGluZztcblxuICAgICAgICAgICAgICAgIGlmICghaW5pdGlhbFJhdGluZykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJCgnb3B0aW9uOnNlbGVjdGVkJywgc2VsZi4kZWxlbSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZpbmRPcHRpb24oaW5pdGlhbFJhdGluZyk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBnZXQgZW1wdHkgb3B0aW9uXG4gICAgICAgICAgICB2YXIgZ2V0RW1wdHlPcHRpb24gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgJGVtcHR5T3B0ID0gc2VsZi4kZWxlbS5maW5kKCdvcHRpb25bdmFsdWU9XCInICsgc2VsZi5vcHRpb25zLmVtcHR5VmFsdWUgKyAnXCJdJyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoISRlbXB0eU9wdC5sZW5ndGggJiYgc2VsZi5vcHRpb25zLmFsbG93RW1wdHkpIHtcbiAgICAgICAgICAgICAgICAgICAgJGVtcHR5T3B0ID0gJCgnPG9wdGlvbiAvPicsIHsgJ3ZhbHVlJzogc2VsZi5vcHRpb25zLmVtcHR5VmFsdWUgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRlbXB0eU9wdC5wcmVwZW5kVG8oc2VsZi4kZWxlbSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuICRlbXB0eU9wdDtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIGdldCBkYXRhXG4gICAgICAgICAgICB2YXIgZ2V0RGF0YSA9IGZ1bmN0aW9uKGtleSkge1xuICAgICAgICAgICAgICAgIHZhciBkYXRhID0gc2VsZi4kZWxlbS5kYXRhKCdiYXJyYXRpbmcnKTtcblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Yga2V5ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YVtrZXldO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gc2V0IGRhdGFcbiAgICAgICAgICAgIHZhciBzZXREYXRhID0gZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0uZGF0YSgnYmFycmF0aW5nJywgdmFsdWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0uZGF0YSgnYmFycmF0aW5nJylba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIHNhdmUgZGF0YSBvbiBlbGVtZW50XG4gICAgICAgICAgICB2YXIgc2F2ZURhdGFPbkVsZW1lbnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgJG9wdCA9IGdldEluaXRpYWxPcHRpb24oKTtcbiAgICAgICAgICAgICAgICB2YXIgJGVtcHR5T3B0ID0gZ2V0RW1wdHlPcHRpb24oKTtcblxuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9ICRvcHQudmFsKCk7XG4gICAgICAgICAgICAgICAgdmFyIHRleHQgPSAkb3B0LmRhdGEoJ2h0bWwnKSA/ICRvcHQuZGF0YSgnaHRtbCcpIDogJG9wdC50ZXh0KCk7XG5cbiAgICAgICAgICAgICAgICAvLyBpZiB0aGUgYWxsb3dFbXB0eSBvcHRpb24gaXMgbm90IHNldCBsZXQncyBjaGVjayBpZiBlbXB0eSBvcHRpb24gZXhpc3RzIGluIHRoZSBzZWxlY3QgZmllbGRcbiAgICAgICAgICAgICAgICB2YXIgYWxsb3dFbXB0eSA9IChzZWxmLm9wdGlvbnMuYWxsb3dFbXB0eSAhPT0gbnVsbCkgP1xuICAgICAgICAgICAgICAgICAgICBzZWxmLm9wdGlvbnMuYWxsb3dFbXB0eSA6XG4gICAgICAgICAgICAgICAgICAgICEhJGVtcHR5T3B0Lmxlbmd0aDtcblxuICAgICAgICAgICAgICAgIHZhciBlbXB0eVZhbHVlID0gKCRlbXB0eU9wdC5sZW5ndGgpID8gJGVtcHR5T3B0LnZhbCgpIDogbnVsbDtcbiAgICAgICAgICAgICAgICB2YXIgZW1wdHlUZXh0ID0gKCRlbXB0eU9wdC5sZW5ndGgpID8gJGVtcHR5T3B0LnRleHQoKSA6IG51bGw7XG5cbiAgICAgICAgICAgICAgICBzZXREYXRhKG51bGwsIHtcbiAgICAgICAgICAgICAgICAgICAgdXNlck9wdGlvbnM6IHNlbGYub3B0aW9ucyxcblxuICAgICAgICAgICAgICAgICAgICAvLyBpbml0aWFsIHJhdGluZyBiYXNlZCBvbiB0aGUgT1BUSU9OIHZhbHVlXG4gICAgICAgICAgICAgICAgICAgIHJhdGluZ1ZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgcmF0aW5nVGV4dDogdGV4dCxcblxuICAgICAgICAgICAgICAgICAgICAvLyByYXRpbmcgd2lsbCBiZSByZXN0b3JlZCBieSBjYWxsaW5nIGNsZWFyIG1ldGhvZFxuICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbFJhdGluZ1ZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxSYXRpbmdUZXh0OiB0ZXh0LFxuXG4gICAgICAgICAgICAgICAgICAgIC8vIGFsbG93IGVtcHR5IHJhdGluZ3M/XG4gICAgICAgICAgICAgICAgICAgIGFsbG93RW1wdHk6IGFsbG93RW1wdHksXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gcmF0aW5nIHZhbHVlIGFuZCB0ZXh0IG9mIHRoZSBlbXB0eSBPUFRJT05cbiAgICAgICAgICAgICAgICAgICAgZW1wdHlSYXRpbmdWYWx1ZTogZW1wdHlWYWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgZW1wdHlSYXRpbmdUZXh0OiBlbXB0eVRleHQsXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gcmVhZC1vbmx5IHN0YXRlXG4gICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiBzZWxmLm9wdGlvbnMucmVhZG9ubHksXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gZGlkIHRoZSB1c2VyIGFscmVhZHkgc2VsZWN0IGEgcmF0aW5nP1xuICAgICAgICAgICAgICAgICAgICByYXRpbmdNYWRlOiBmYWxzZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gcmVtb3ZlIGRhdGEgb24gZWxlbWVudFxuICAgICAgICAgICAgdmFyIHJlbW92ZURhdGFPbkVsZW1lbnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLnJlbW92ZURhdGEoJ2JhcnJhdGluZycpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gcmV0dXJuIGN1cnJlbnQgcmF0aW5nIHRleHRcbiAgICAgICAgICAgIHZhciByYXRpbmdUZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGdldERhdGEoJ3JhdGluZ1RleHQnKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIHJldHVybiBjdXJyZW50IHJhdGluZyB2YWx1ZVxuICAgICAgICAgICAgdmFyIHJhdGluZ1ZhbHVlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGdldERhdGEoJ3JhdGluZ1ZhbHVlJyk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBidWlsZCB3aWRnZXQgYW5kIHJldHVybiBqUXVlcnkgZWxlbWVudFxuICAgICAgICAgICAgdmFyIGJ1aWxkV2lkZ2V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyICR3ID0gJCgnPGRpdiAvPicsIHsgJ2NsYXNzJzogJ2JyLXdpZGdldCcgfSk7XG5cbiAgICAgICAgICAgICAgICAvLyBjcmVhdGUgQSBlbGVtZW50cyB0aGF0IHdpbGwgcmVwbGFjZSBPUFRJT05zXG4gICAgICAgICAgICAgICAgc2VsZi4kZWxlbS5maW5kKCdvcHRpb24nKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdmFsLCB0ZXh0LCBodG1sLCAkYTtcblxuICAgICAgICAgICAgICAgICAgICB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNyZWF0ZSByYXRpbmdzIC0gYnV0IG9ubHkgaWYgdmFsIGlzIG5vdCBkZWZpbmVkIGFzIGVtcHR5XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWwgIT09IGdldERhdGEoJ2VtcHR5UmF0aW5nVmFsdWUnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dCA9ICQodGhpcykudGV4dCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaHRtbCA9ICQodGhpcykuZGF0YSgnaHRtbCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGh0bWwpIHsgdGV4dCA9IGh0bWw7IH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgJGEgPSAkKCc8YSAvPicsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnaHJlZic6ICcjJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZGF0YS1yYXRpbmctdmFsdWUnOiB2YWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2RhdGEtcmF0aW5nLXRleHQnOiB0ZXh0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdodG1sJzogKHNlbGYub3B0aW9ucy5zaG93VmFsdWVzKSA/IHRleHQgOiAnJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICR3LmFwcGVuZCgkYSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgLy8gYXBwZW5kIC5ici1jdXJyZW50LXJhdGluZyBkaXYgdG8gdGhlIHdpZGdldFxuICAgICAgICAgICAgICAgIGlmIChzZWxmLm9wdGlvbnMuc2hvd1NlbGVjdGVkUmF0aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICR3LmFwcGVuZCgkKCc8ZGl2IC8+JywgeyAndGV4dCc6ICcnLCAnY2xhc3MnOiAnYnItY3VycmVudC1yYXRpbmcnIH0pKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBhZGRpdGlvbmFsIGNsYXNzZXMgZm9yIHRoZSB3aWRnZXRcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5vcHRpb25zLnJldmVyc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgJHcuYWRkQ2xhc3MoJ2JyLXJldmVyc2UnKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5vcHRpb25zLnJlYWRvbmx5KSB7XG4gICAgICAgICAgICAgICAgICAgICR3LmFkZENsYXNzKCdici1yZWFkb25seScpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiAkdztcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIHJldHVybiBhIGpRdWVyeSBmdW5jdGlvbiBuYW1lIGRlcGVuZGluZyBvbiB0aGUgJ3JldmVyc2UnIHNldHRpbmdcbiAgICAgICAgICAgIHZhciBuZXh0QWxsb3JQcmV2aW91c0FsbCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmIChnZXREYXRhKCd1c2VyT3B0aW9ucycpLnJldmVyc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICduZXh0QWxsJztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3ByZXZBbGwnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIHNldCB0aGUgdmFsdWUgb2YgdGhlIHNlbGVjdCBmaWVsZFxuICAgICAgICAgICAgdmFyIHNldFNlbGVjdEZpZWxkVmFsdWUgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgIC8vIGNoYW5nZSBzZWxlY3RlZCBvcHRpb25cbiAgICAgICAgICAgICAgICBmaW5kT3B0aW9uKHZhbHVlKS5wcm9wKCdzZWxlY3RlZCcsIHRydWUpO1xuXG4gICAgICAgICAgICAgICAgc2VsZi4kZWxlbS5jaGFuZ2UoKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIHJlc2V0IHNlbGVjdCBmaWVsZFxuICAgICAgICAgICAgdmFyIHJlc2V0U2VsZWN0RmllbGQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkKCdvcHRpb24nLCBzZWxmLiRlbGVtKS5wcm9wKCdzZWxlY3RlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kZWZhdWx0U2VsZWN0ZWQ7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLmNoYW5nZSgpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gZGlzcGxheSB0aGUgY3VycmVudGx5IHNlbGVjdGVkIHJhdGluZ1xuICAgICAgICAgICAgdmFyIHNob3dTZWxlY3RlZFJhdGluZyA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgICAgICAgICAgICAgICAvLyB0ZXh0IHVuZGVmaW5lZD9cbiAgICAgICAgICAgICAgICB0ZXh0ID0gdGV4dCA/IHRleHQgOiByYXRpbmdUZXh0KCk7XG5cbiAgICAgICAgICAgICAgICAvLyBzcGVjaWFsIGNhc2Ugd2hlbiB0aGUgc2VsZWN0ZWQgcmF0aW5nIGlzIGRlZmluZWQgYXMgZW1wdHlcbiAgICAgICAgICAgICAgICBpZiAodGV4dCA9PSBnZXREYXRhKCdlbXB0eVJhdGluZ1RleHQnKSkge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0ID0gJyc7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gdXBkYXRlIC5ici1jdXJyZW50LXJhdGluZyBkaXZcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5vcHRpb25zLnNob3dTZWxlY3RlZFJhdGluZykge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLnBhcmVudCgpLmZpbmQoJy5ici1jdXJyZW50LXJhdGluZycpLnRleHQodGV4dCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gcmV0dXJuIHJvdW5kZWQgZnJhY3Rpb24gb2YgYSB2YWx1ZSAoMTQuNCAtPiA0MCwgMC45OSAtPiA5MClcbiAgICAgICAgICAgIHZhciBmcmFjdGlvbiA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGgucm91bmQoKChNYXRoLmZsb29yKHZhbHVlICogMTApIC8gMTApICUgMSkgKiAxMDApO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gcmVtb3ZlIGFsbCBjbGFzc2VzIGZyb20gZWxlbWVudHNcbiAgICAgICAgICAgIHZhciByZXNldFN0eWxlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGFsbCBjbGFzc2VzIHN0YXJ0aW5nIHdpdGggYnItKlxuICAgICAgICAgICAgICAgIHNlbGYuJHdpZGdldC5maW5kKCdhJykucmVtb3ZlQ2xhc3MoZnVuY3Rpb24oaW5kZXgsIGNsYXNzZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChjbGFzc2VzLm1hdGNoKC8oXnxcXHMpYnItXFxTKy9nKSB8fCBbXSkuam9pbignICcpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gYXBwbHkgc3R5bGUgYnkgc2V0dGluZyBjbGFzc2VzIG9uIGVsZW1lbnRzXG4gICAgICAgICAgICB2YXIgYXBwbHlTdHlsZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciAkYSA9IHNlbGYuJHdpZGdldC5maW5kKCdhW2RhdGEtcmF0aW5nLXZhbHVlPVwiJyArIHJhdGluZ1ZhbHVlKCkgKyAnXCJdJyk7XG4gICAgICAgICAgICAgICAgdmFyIGluaXRpYWxSYXRpbmcgPSBnZXREYXRhKCd1c2VyT3B0aW9ucycpLmluaXRpYWxSYXRpbmc7XG4gICAgICAgICAgICAgICAgdmFyIGJhc2VWYWx1ZSA9ICQuaXNOdW1lcmljKHJhdGluZ1ZhbHVlKCkpID8gcmF0aW5nVmFsdWUoKSA6IDA7XG4gICAgICAgICAgICAgICAgdmFyIGYgPSBmcmFjdGlvbihpbml0aWFsUmF0aW5nKTtcbiAgICAgICAgICAgICAgICB2YXIgJGFsbCwgJGZyYWN0aW9uYWw7XG5cbiAgICAgICAgICAgICAgICByZXNldFN0eWxlKCk7XG5cbiAgICAgICAgICAgICAgICAvLyBhZGQgY2xhc3Nlc1xuICAgICAgICAgICAgICAgICRhLmFkZENsYXNzKCdici1zZWxlY3RlZCBici1jdXJyZW50JylbbmV4dEFsbG9yUHJldmlvdXNBbGwoKV0oKVxuICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2JyLXNlbGVjdGVkJyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWdldERhdGEoJ3JhdGluZ01hZGUnKSAmJiAkLmlzTnVtZXJpYyhpbml0aWFsUmF0aW5nKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoKGluaXRpYWxSYXRpbmcgPD0gYmFzZVZhbHVlKSB8fCAhZikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgJGFsbCA9IHNlbGYuJHdpZGdldC5maW5kKCdhJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgJGZyYWN0aW9uYWwgPSAoJGEubGVuZ3RoKSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAkYVsoZ2V0RGF0YSgndXNlck9wdGlvbnMnKS5yZXZlcnNlKSA/ICdwcmV2JyA6ICduZXh0J10oKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAkYWxsWyhnZXREYXRhKCd1c2VyT3B0aW9ucycpLnJldmVyc2UpID8gJ2xhc3QnIDogJ2ZpcnN0J10oKTtcblxuICAgICAgICAgICAgICAgICAgICAkZnJhY3Rpb25hbC5hZGRDbGFzcygnYnItZnJhY3Rpb25hbCcpO1xuICAgICAgICAgICAgICAgICAgICAkZnJhY3Rpb25hbC5hZGRDbGFzcygnYnItZnJhY3Rpb25hbC0nICsgZik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gY2hlY2sgaWYgdGhlIGVsZW1lbnQgaXMgZGVzZWxlY3RhYmxlP1xuICAgICAgICAgICAgdmFyIGlzRGVzZWxlY3RhYmxlID0gZnVuY3Rpb24oJGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWdldERhdGEoJ2FsbG93RW1wdHknKSB8fCAhZ2V0RGF0YSgndXNlck9wdGlvbnMnKS5kZXNlbGVjdGFibGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiAocmF0aW5nVmFsdWUoKSA9PSAkZWxlbWVudC5hdHRyKCdkYXRhLXJhdGluZy12YWx1ZScpKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIGhhbmRsZSBjbGljayBldmVudHNcbiAgICAgICAgICAgIHZhciBhdHRhY2hDbGlja0hhbmRsZXIgPSBmdW5jdGlvbigkZWxlbWVudHMpIHtcbiAgICAgICAgICAgICAgICAkZWxlbWVudHMub24oJ2NsaWNrLmJhcnJhdGluZycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciAkYSA9ICQodGhpcyksXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zID0gZ2V0RGF0YSgndXNlck9wdGlvbnMnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDtcblxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gJGEuYXR0cignZGF0YS1yYXRpbmctdmFsdWUnKTtcbiAgICAgICAgICAgICAgICAgICAgdGV4dCA9ICRhLmF0dHIoJ2RhdGEtcmF0aW5nLXRleHQnKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBpcyBjdXJyZW50IGFuZCBkZXNlbGVjdGFibGU/XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0Rlc2VsZWN0YWJsZSgkYSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gZ2V0RGF0YSgnZW1wdHlSYXRpbmdWYWx1ZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dCA9IGdldERhdGEoJ2VtcHR5UmF0aW5nVGV4dCcpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gcmVtZW1iZXIgc2VsZWN0ZWQgcmF0aW5nXG4gICAgICAgICAgICAgICAgICAgIHNldERhdGEoJ3JhdGluZ1ZhbHVlJywgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBzZXREYXRhKCdyYXRpbmdUZXh0JywgdGV4dCk7XG4gICAgICAgICAgICAgICAgICAgIHNldERhdGEoJ3JhdGluZ01hZGUnLCB0cnVlKTtcblxuICAgICAgICAgICAgICAgICAgICBzZXRTZWxlY3RGaWVsZFZhbHVlKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgc2hvd1NlbGVjdGVkUmF0aW5nKHRleHQpO1xuXG4gICAgICAgICAgICAgICAgICAgIGFwcGx5U3R5bGUoKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBvblNlbGVjdCBjYWxsYmFja1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLm9uU2VsZWN0LmNhbGwoXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmF0aW5nVmFsdWUoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhdGluZ1RleHQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50XG4gICAgICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gaGFuZGxlIG1vdXNlZW50ZXIgZXZlbnRzXG4gICAgICAgICAgICB2YXIgYXR0YWNoTW91c2VFbnRlckhhbmRsZXIgPSBmdW5jdGlvbigkZWxlbWVudHMpIHtcbiAgICAgICAgICAgICAgICAkZWxlbWVudHMub24oJ21vdXNlZW50ZXIuYmFycmF0aW5nJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciAkYSA9ICQodGhpcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmVzZXRTdHlsZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICRhLmFkZENsYXNzKCdici1hY3RpdmUnKVtuZXh0QWxsb3JQcmV2aW91c0FsbCgpXSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2JyLWFjdGl2ZScpO1xuXG4gICAgICAgICAgICAgICAgICAgIHNob3dTZWxlY3RlZFJhdGluZygkYS5hdHRyKCdkYXRhLXJhdGluZy10ZXh0JykpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gaGFuZGxlIG1vdXNlbGVhdmUgZXZlbnRzXG4gICAgICAgICAgICB2YXIgYXR0YWNoTW91c2VMZWF2ZUhhbmRsZXIgPSBmdW5jdGlvbigkZWxlbWVudHMpIHtcbiAgICAgICAgICAgICAgICBzZWxmLiR3aWRnZXQub24oJ21vdXNlbGVhdmUuYmFycmF0aW5nIGJsdXIuYmFycmF0aW5nJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHNob3dTZWxlY3RlZFJhdGluZygpO1xuICAgICAgICAgICAgICAgICAgICBhcHBseVN0eWxlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBzb21ld2hhdCBwcmltaXRpdmUgd2F5IHRvIHJlbW92ZSAzMDBtcyBjbGljayBkZWxheSBvbiB0b3VjaCBkZXZpY2VzXG4gICAgICAgICAgICAvLyBmb3IgYSBtb3JlIGFkdmFuY2VkIHNvbHV0aW9uIGNvbnNpZGVyIHNldHRpbmcgYGZhc3RDbGlja3NgIG9wdGlvbiB0byBmYWxzZVxuICAgICAgICAgICAgLy8gYW5kIHVzaW5nIGEgbGlicmFyeSBzdWNoIGFzIGZhc3RjbGljayAoaHR0cHM6Ly9naXRodWIuY29tL2Z0bGFicy9mYXN0Y2xpY2spXG4gICAgICAgICAgICB2YXIgZmFzdENsaWNrcyA9IGZ1bmN0aW9uKCRlbGVtZW50cykge1xuICAgICAgICAgICAgICAgICRlbGVtZW50cy5vbigndG91Y2hzdGFydC5iYXJyYXRpbmcnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmNsaWNrKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBkaXNhYmxlIGNsaWNrc1xuICAgICAgICAgICAgdmFyIGRpc2FibGVDbGlja3MgPSBmdW5jdGlvbigkZWxlbWVudHMpIHtcbiAgICAgICAgICAgICAgICAkZWxlbWVudHMub24oJ2NsaWNrLmJhcnJhdGluZycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB2YXIgYXR0YWNoSGFuZGxlcnMgPSBmdW5jdGlvbigkZWxlbWVudHMpIHtcbiAgICAgICAgICAgICAgICAvLyBhdHRhY2ggY2xpY2sgZXZlbnQgaGFuZGxlclxuICAgICAgICAgICAgICAgIGF0dGFjaENsaWNrSGFuZGxlcigkZWxlbWVudHMpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYub3B0aW9ucy5ob3ZlclN0YXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGF0dGFjaCBtb3VzZWVudGVyIGV2ZW50IGhhbmRsZXJcbiAgICAgICAgICAgICAgICAgICAgYXR0YWNoTW91c2VFbnRlckhhbmRsZXIoJGVsZW1lbnRzKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBhdHRhY2ggbW91c2VsZWF2ZSBldmVudCBoYW5kbGVyXG4gICAgICAgICAgICAgICAgICAgIGF0dGFjaE1vdXNlTGVhdmVIYW5kbGVyKCRlbGVtZW50cyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdmFyIGRldGFjaEhhbmRsZXJzID0gZnVuY3Rpb24oJGVsZW1lbnRzKSB7XG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGV2ZW50IGhhbmRsZXJzIGluIHRoZSBcIi5iYXJyYXRpbmdcIiBuYW1lc3BhY2VcbiAgICAgICAgICAgICAgICAkZWxlbWVudHMub2ZmKCcuYmFycmF0aW5nJyk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB2YXIgc2V0dXBIYW5kbGVycyA9IGZ1bmN0aW9uKHJlYWRvbmx5KSB7XG4gICAgICAgICAgICAgICAgdmFyICRlbGVtZW50cyA9IHNlbGYuJHdpZGdldC5maW5kKCdhJyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZmFzdENsaWNrcykge1xuICAgICAgICAgICAgICAgICAgICBmYXN0Q2xpY2tzKCRlbGVtZW50cyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHJlYWRvbmx5KSB7XG4gICAgICAgICAgICAgICAgICAgIGRldGFjaEhhbmRsZXJzKCRlbGVtZW50cyk7XG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVDbGlja3MoJGVsZW1lbnRzKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhdHRhY2hIYW5kbGVycygkZWxlbWVudHMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMuc2hvdyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIC8vIHJ1biBvbmx5IG9uY2VcbiAgICAgICAgICAgICAgICBpZiAoZ2V0RGF0YSgpKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICAvLyB3cmFwIGVsZW1lbnRcbiAgICAgICAgICAgICAgICB3cmFwRWxlbWVudCgpO1xuXG4gICAgICAgICAgICAgICAgLy8gc2F2ZSBkYXRhXG4gICAgICAgICAgICAgICAgc2F2ZURhdGFPbkVsZW1lbnQoKTtcblxuICAgICAgICAgICAgICAgIC8vIGJ1aWxkICYgYXBwZW5kIHdpZGdldCB0byB0aGUgRE9NXG4gICAgICAgICAgICAgICAgc2VsZi4kd2lkZ2V0ID0gYnVpbGRXaWRnZXQoKTtcbiAgICAgICAgICAgICAgICBzZWxmLiR3aWRnZXQuaW5zZXJ0QWZ0ZXIoc2VsZi4kZWxlbSk7XG5cbiAgICAgICAgICAgICAgICBhcHBseVN0eWxlKCk7XG5cbiAgICAgICAgICAgICAgICBzaG93U2VsZWN0ZWRSYXRpbmcoKTtcblxuICAgICAgICAgICAgICAgIHNldHVwSGFuZGxlcnMoc2VsZi5vcHRpb25zLnJlYWRvbmx5KTtcblxuICAgICAgICAgICAgICAgIC8vIGhpZGUgdGhlIHNlbGVjdCBmaWVsZFxuICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0uaGlkZSgpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy5yZWFkb25seSA9IGZ1bmN0aW9uKHN0YXRlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzdGF0ZSAhPT0gJ2Jvb2xlYW4nIHx8IGdldERhdGEoJ3JlYWRPbmx5JykgPT0gc3RhdGUpIHJldHVybjtcblxuICAgICAgICAgICAgICAgIHNldHVwSGFuZGxlcnMoc3RhdGUpO1xuICAgICAgICAgICAgICAgIHNldERhdGEoJ3JlYWRPbmx5Jywgc3RhdGUpO1xuICAgICAgICAgICAgICAgIHNlbGYuJHdpZGdldC50b2dnbGVDbGFzcygnYnItcmVhZG9ubHknKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMuc2V0ID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgb3B0aW9ucyA9IGdldERhdGEoJ3VzZXJPcHRpb25zJyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoc2VsZi4kZWxlbS5maW5kKCdvcHRpb25bdmFsdWU9XCInICsgdmFsdWUgKyAnXCJdJykubGVuZ3RoID09PSAwKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICAvLyBzZXQgZGF0YVxuICAgICAgICAgICAgICAgIHNldERhdGEoJ3JhdGluZ1ZhbHVlJywgdmFsdWUpO1xuICAgICAgICAgICAgICAgIHNldERhdGEoJ3JhdGluZ1RleHQnLCBzZWxmLiRlbGVtLmZpbmQoJ29wdGlvblt2YWx1ZT1cIicgKyB2YWx1ZSArICdcIl0nKS50ZXh0KCkpO1xuICAgICAgICAgICAgICAgIHNldERhdGEoJ3JhdGluZ01hZGUnLCB0cnVlKTtcblxuICAgICAgICAgICAgICAgIHNldFNlbGVjdEZpZWxkVmFsdWUocmF0aW5nVmFsdWUoKSk7XG4gICAgICAgICAgICAgICAgc2hvd1NlbGVjdGVkUmF0aW5nKHJhdGluZ1RleHQoKSk7XG5cbiAgICAgICAgICAgICAgICBhcHBseVN0eWxlKCk7XG5cbiAgICAgICAgICAgICAgICAvLyBvblNlbGVjdCBjYWxsYmFja1xuICAgICAgICAgICAgICAgIGlmICghb3B0aW9ucy5zaWxlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5vblNlbGVjdC5jYWxsKFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhdGluZ1ZhbHVlKCksXG4gICAgICAgICAgICAgICAgICAgICAgICByYXRpbmdUZXh0KClcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLmNsZWFyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSBnZXREYXRhKCd1c2VyT3B0aW9ucycpO1xuXG4gICAgICAgICAgICAgICAgLy8gcmVzdG9yZSBvcmlnaW5hbCBkYXRhXG4gICAgICAgICAgICAgICAgc2V0RGF0YSgncmF0aW5nVmFsdWUnLCBnZXREYXRhKCdvcmlnaW5hbFJhdGluZ1ZhbHVlJykpO1xuICAgICAgICAgICAgICAgIHNldERhdGEoJ3JhdGluZ1RleHQnLCBnZXREYXRhKCdvcmlnaW5hbFJhdGluZ1RleHQnKSk7XG4gICAgICAgICAgICAgICAgc2V0RGF0YSgncmF0aW5nTWFkZScsIGZhbHNlKTtcblxuICAgICAgICAgICAgICAgIHJlc2V0U2VsZWN0RmllbGQoKTtcbiAgICAgICAgICAgICAgICBzaG93U2VsZWN0ZWRSYXRpbmcocmF0aW5nVGV4dCgpKTtcblxuICAgICAgICAgICAgICAgIGFwcGx5U3R5bGUoKTtcblxuICAgICAgICAgICAgICAgIC8vIG9uQ2xlYXIgY2FsbGJhY2tcbiAgICAgICAgICAgICAgICBvcHRpb25zLm9uQ2xlYXIuY2FsbChcbiAgICAgICAgICAgICAgICAgICAgdGhpcyxcbiAgICAgICAgICAgICAgICAgICAgcmF0aW5nVmFsdWUoKSxcbiAgICAgICAgICAgICAgICAgICAgcmF0aW5nVGV4dCgpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMuZGVzdHJveSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IHJhdGluZ1ZhbHVlKCk7XG4gICAgICAgICAgICAgICAgdmFyIHRleHQgPSByYXRpbmdUZXh0KCk7XG4gICAgICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSBnZXREYXRhKCd1c2VyT3B0aW9ucycpO1xuXG4gICAgICAgICAgICAgICAgLy8gZGV0YWNoIGhhbmRsZXJzXG4gICAgICAgICAgICAgICAgZGV0YWNoSGFuZGxlcnMoc2VsZi4kd2lkZ2V0LmZpbmQoJ2EnKSk7XG5cbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgd2lkZ2V0XG4gICAgICAgICAgICAgICAgc2VsZi4kd2lkZ2V0LnJlbW92ZSgpO1xuXG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGRhdGFcbiAgICAgICAgICAgICAgICByZW1vdmVEYXRhT25FbGVtZW50KCk7XG5cbiAgICAgICAgICAgICAgICAvLyB1bndyYXAgdGhlIGVsZW1lbnRcbiAgICAgICAgICAgICAgICB1bndyYXBFbGVtZW50KCk7XG5cbiAgICAgICAgICAgICAgICAvLyBzaG93IHRoZSBlbGVtZW50XG4gICAgICAgICAgICAgICAgc2VsZi4kZWxlbS5zaG93KCk7XG5cbiAgICAgICAgICAgICAgICAvLyBvbkRlc3Ryb3kgY2FsbGJhY2tcbiAgICAgICAgICAgICAgICBvcHRpb25zLm9uRGVzdHJveS5jYWxsKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgdGV4dFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgQmFyUmF0aW5nLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKG9wdGlvbnMsIGVsZW0pIHtcbiAgICAgICAgICAgIHRoaXMuJGVsZW0gPSAkKGVsZW0pO1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zID0gJC5leHRlbmQoe30sICQuZm4uYmFycmF0aW5nLmRlZmF1bHRzLCBvcHRpb25zKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucztcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gQmFyUmF0aW5nO1xuICAgIH0pKCk7XG5cbiAgICAkLmZuLmJhcnJhdGluZyA9IGZ1bmN0aW9uIChtZXRob2QsIG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcGx1Z2luID0gbmV3IEJhclJhdGluZygpO1xuXG4gICAgICAgICAgICAvLyBwbHVnaW4gd29ya3Mgd2l0aCBzZWxlY3QgZmllbGRzXG4gICAgICAgICAgICBpZiAoISQodGhpcykuaXMoJ3NlbGVjdCcpKSB7XG4gICAgICAgICAgICAgICAgJC5lcnJvcignU29ycnksIHRoaXMgcGx1Z2luIG9ubHkgd29ya3Mgd2l0aCBzZWxlY3QgZmllbGRzLicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBtZXRob2Qgc3VwcGxpZWRcbiAgICAgICAgICAgIGlmIChwbHVnaW4uaGFzT3duUHJvcGVydHkobWV0aG9kKSkge1xuICAgICAgICAgICAgICAgIHBsdWdpbi5pbml0KG9wdGlvbnMsIHRoaXMpO1xuICAgICAgICAgICAgICAgIGlmIChtZXRob2QgPT09ICdzaG93Jykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGx1Z2luLnNob3cob3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gcGx1Z2luIGV4aXN0cz9cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBsdWdpbi4kZWxlbS5kYXRhKCdiYXJyYXRpbmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGx1Z2luLiR3aWRnZXQgPSAkKHRoaXMpLm5leHQoJy5ici13aWRnZXQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwbHVnaW5bbWV0aG9kXShvcHRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gbm8gbWV0aG9kIHN1cHBsaWVkIG9yIG9ubHkgb3B0aW9ucyBzdXBwbGllZFxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgbWV0aG9kID09PSAnb2JqZWN0JyB8fCAhbWV0aG9kKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucyA9IG1ldGhvZDtcbiAgICAgICAgICAgICAgICBwbHVnaW4uaW5pdChvcHRpb25zLCB0aGlzKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGx1Z2luLnNob3coKTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkLmVycm9yKCdNZXRob2QgJyArIG1ldGhvZCArICcgZG9lcyBub3QgZXhpc3Qgb24galF1ZXJ5LmJhcnJhdGluZycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgJC5mbi5iYXJyYXRpbmcuZGVmYXVsdHMgPSB7XG4gICAgICAgIHRoZW1lOicnLFxuICAgICAgICBpbml0aWFsUmF0aW5nOm51bGwsIC8vIGluaXRpYWwgcmF0aW5nXG4gICAgICAgIGFsbG93RW1wdHk6bnVsbCwgLy8gYWxsb3cgZW1wdHkgcmF0aW5ncz9cbiAgICAgICAgZW1wdHlWYWx1ZTonJywgLy8gdGhpcyBpcyB0aGUgZXhwZWN0ZWQgdmFsdWUgb2YgdGhlIGVtcHR5IHJhdGluZ1xuICAgICAgICBzaG93VmFsdWVzOmZhbHNlLCAvLyBkaXNwbGF5IHJhdGluZyB2YWx1ZXMgb24gdGhlIGJhcnM/XG4gICAgICAgIHNob3dTZWxlY3RlZFJhdGluZzp0cnVlLCAvLyBhcHBlbmQgYSBkaXYgd2l0aCBhIHJhdGluZyB0byB0aGUgd2lkZ2V0P1xuICAgICAgICBkZXNlbGVjdGFibGU6dHJ1ZSwgLy8gYWxsb3cgdG8gZGVzZWxlY3QgcmF0aW5ncz9cbiAgICAgICAgcmV2ZXJzZTpmYWxzZSwgLy8gcmV2ZXJzZSB0aGUgcmF0aW5nP1xuICAgICAgICByZWFkb25seTpmYWxzZSwgLy8gbWFrZSB0aGUgcmF0aW5nIHJlYWR5LW9ubHk/XG4gICAgICAgIGZhc3RDbGlja3M6dHJ1ZSwgLy8gcmVtb3ZlIDMwMG1zIGNsaWNrIGRlbGF5IG9uIHRvdWNoIGRldmljZXM/XG4gICAgICAgIGhvdmVyU3RhdGU6dHJ1ZSwgLy8gY2hhbmdlIHN0YXRlIG9uIGhvdmVyP1xuICAgICAgICBzaWxlbnQ6ZmFsc2UsIC8vIHN1cHJlc3MgY2FsbGJhY2tzIHdoZW4gY29udHJvbGxpbmcgcmF0aW5ncyBwcm9ncmFtYXRpY2FsbHlcbiAgICAgICAgb25TZWxlY3Q6ZnVuY3Rpb24gKHZhbHVlLCB0ZXh0LCBldmVudCkge1xuICAgICAgICB9LCAvLyBjYWxsYmFjayBmaXJlZCB3aGVuIGEgcmF0aW5nIGlzIHNlbGVjdGVkXG4gICAgICAgIG9uQ2xlYXI6ZnVuY3Rpb24gKHZhbHVlLCB0ZXh0KSB7XG4gICAgICAgIH0sIC8vIGNhbGxiYWNrIGZpcmVkIHdoZW4gYSByYXRpbmcgaXMgY2xlYXJlZFxuICAgICAgICBvbkRlc3Ryb3k6ZnVuY3Rpb24gKHZhbHVlLCB0ZXh0KSB7XG4gICAgICAgIH0gLy8gY2FsbGJhY2sgZmlyZWQgd2hlbiBhIHdpZGdldCBpcyBkZXN0cm95ZWRcbiAgICB9O1xuXG4gICAgJC5mbi5iYXJyYXRpbmcuQmFyUmF0aW5nID0gQmFyUmF0aW5nO1xuXG59KSk7XG4iLCIvKipcbiAqIEBwYWNrYWdlICAgIEtub3cgUmVzZXJ2YXRpb25zXG4gKiBAc3VicGFja2FnZSBTaXRlIEpTXG4gKiBAY29weXJpZ2h0ICAyMDIwIEhpZ2hsYW5kIFZpc2lvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIEBsaWNlbnNlICAgIFNlZSB0aGUgZmlsZSBcIkxJQ0VOU0UudHh0XCIgZm9yIHRoZSBmdWxsIGxpY2Vuc2UgZ292ZXJuaW5nIHRoaXMgY29kZS5cbiAqIEBhdXRob3IgICAgIEhhemVsIFdpbHNvbiA8aGF6ZWxAaGlnaGxhbmR2aXNpb24uY29tPlxuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG5sZXQgc2VhcmNoRGF0YSA9IFtdO1xubGV0IHNlYXJjaERvbmUgPSBmYWxzZTtcbmxldCBjYWxlbmRhckxvYWRlZCA9IGZhbHNlO1xubGV0IHNhdmVkd2lkdGggPSBmYWxzZTtcbmxldCBsYXJnZTtcbmxldCByZXNpemVkID0gZmFsc2U7XG5sZXQgc2Nsb2FkZWQgPSBmYWxzZTtcblxuKGZ1bmN0aW9uICgkKSB7XG5cdCQoZnVuY3Rpb24gKCkge1xuXHRcdCQoZG9jdW1lbnQpLmZvdW5kYXRpb24oKTtcblxuXHRcdGNoZWNrU2NyZWVuV2lkdGgoKTtcblx0XHQkKHdpbmRvdykub24oXCJyZXNpemVcIiwgZnVuY3Rpb24gKCkge1xuXHRcdFx0Y2hlY2tTY3JlZW5XaWR0aCgpO1xuXHRcdH0pO1xuXG5cdFx0Y29uc3QgYmFycyA9ICQoJy5rci1yYXRpbmcnKTtcblx0XHRpZiAoYmFycy5sZW5ndGgpIHtcblx0XHRcdGJhcnMuYmFycmF0aW5nKCdzaG93Jywge1xuXHRcdFx0XHRzaG93VmFsdWVzOiB0cnVlLFxuXHRcdFx0XHRzaG93U2VsZWN0ZWRSYXRpbmc6IGZhbHNlXG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRjb25zdCAkY3RyaWdnZXIgPSAkKCcja3ItcGFnZS1nZXJpYXRyaWMtY2FsZW5kYXItdHJpZ2dlcicpO1xuXHRcdGlmICgkY3RyaWdnZXIubGVuZ3RoICYmICFjYWxlbmRhckxvYWRlZCkge1xuXHRcdFx0bG9hZENhbGVuZGFyKCRjdHJpZ2dlci5kYXRhKCdwaWQnKSwgJGN0cmlnZ2VyLmRhdGEoJ3RhcmdldCcpKTtcblx0XHRcdGNhbGVuZGFyTG9hZGVkID0gdHJ1ZTtcblx0XHRcdGNvbnN0IHN0aWNreSA9ICQoJy5zdGlja3knKTtcblx0XHRcdGlmIChzdGlja3kubGVuZ3RoKSB7XG5cdFx0XHRcdHN0aWNreS5mb3VuZGF0aW9uKCdfY2FsYycsIHRydWUpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdCQoZG9jdW1lbnQpLm9uKCdzdWJtaXQnLCAnLmFqYXhmb3JtJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGNvbnN0ICRmb3JtID0gJCh0aGlzKTtcblx0XHRcdCQuYWpheCh7XG5cdFx0XHRcdHR5cGU6ICdQT1NUJyxcblx0XHRcdFx0dXJsOiAkZm9ybS5hdHRyKCdhY3Rpb24nKSxcblx0XHRcdFx0ZGF0YTogJGZvcm0uc2VyaWFsaXplKCksXG5cdFx0XHRcdGRhdGFUeXBlOiAnanNvbicsXG5cdFx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXN1bHQpIHtcblx0XHRcdFx0XHRpZiAocmVzdWx0LnN1Y2Nlc3MpIHtcblx0XHRcdFx0XHRcdGlmIChyZXN1bHQuZGF0YSkge1xuXHRcdFx0XHRcdFx0XHRmb3JtUmVzcG9uc2UoJGZvcm0uYXR0cignaWQnKSwgcmVzdWx0LmRhdGEpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0d2luZG93LmxvY2F0aW9uLmhyZWYgPSAnLyc7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdCQoJy5rci1hamF4LW1vZGFsLWVycm9yLW1lc3NhZ2UnKS5odG1sKHJlc3VsdC5tZXNzYWdlKTtcblx0XHRcdFx0XHRcdGNvbnN0ICRtb2RhbCA9IG5ldyBGb3VuZGF0aW9uLlJldmVhbCgkKCcjS3JBamF4TW9kYWxFcnJvcicpKTtcblx0XHRcdFx0XHRcdCRtb2RhbC5vcGVuKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRlcnJvcjogZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdCQoJy5rci1hamF4LW1vZGFsLWVycm9yLW1lc3NhZ2UnKS5odG1sKCdTb3JyeSBhbiBlcnJvciBoYXMgb2NjdXJyZWQsIHBsZWFzZSB0cnkgYWdhaW4nKTtcblx0XHRcdFx0XHRjb25zdCAkbW9kYWwgPSBuZXcgRm91bmRhdGlvbi5SZXZlYWwoJCgnI0tyQWpheE1vZGFsRXJyb3InKSk7XG5cdFx0XHRcdFx0JG1vZGFsLm9wZW4oKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSkub24oJ3Nob3cuemYuZHJvcGRvd24nLCAnLm5vc2Nyb2xsJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0JCgnYm9keScpLmFkZENsYXNzKFwic3RhdGljcGFuZVwiKTtcblx0XHRcdCQodGhpcykuY3NzKCdvcGFjaXR5JywgJzEnKTtcblx0XHR9KS5vbignaGlkZS56Zi5kcm9wZG93bicsICcubm9zY3JvbGwnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHQkKCdib2R5JykucmVtb3ZlQ2xhc3MoXCJzdGF0aWNwYW5lXCIpO1xuXHRcdFx0JCh0aGlzKS5jc3MoJ29wYWNpdHknLCAnMCcpO1xuXHRcdH0pLm9uKCdoaWRlLnpmLmRyb3Bkb3duJywgJyNrci1xdW90ZS1mb3JtJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0JCgnI2d1ZXN0cycpLnRyaWdnZXIoJ2NoYW5nZScpO1xuXHRcdH0pLm9uKCdvcGVuLnpmLnJldmVhbCcsICcua3ItYWpheC1tb2RhbFtkYXRhLXJldmVhbF0nLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0Y29uc3QgbW9kYWxpZCA9IFwiI1wiICsgJCh0aGlzKS5hdHRyKCdpZCcpO1xuXHRcdFx0aWYgKCEkLnRyaW0oJChtb2RhbGlkKS5odG1sKCkpLmxlbmd0aCkge1xuXHRcdFx0XHRjb25zdCBhamF4dXJsID0gJCh0aGlzKS5kYXRhKCdhamF4dXJsJyk7XG5cdFx0XHRcdGlmIChhamF4dXJsKSB7XG5cdFx0XHRcdFx0JC5hamF4KHtcblx0XHRcdFx0XHRcdHR5cGU6ICdQT1NUJyxcblx0XHRcdFx0XHRcdHVybDogYWpheHVybCxcblx0XHRcdFx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uIChjb250ZW50KSB7XG5cdFx0XHRcdFx0XHRcdCQobW9kYWxpZCkuaHRtbChjb250ZW50KS50cmlnZ2VyKCdyZXNpemVtZS56Zi5yZXZlYWwnKTtcblx0XHRcdFx0XHRcdFx0JChtb2RhbGlkKS5mb3VuZGF0aW9uKCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KS5vbignb3Blbi56Zi5yZXZlYWwnLCAnI2tyLWdhdGV3YXktbW9kYWxbZGF0YS1yZXZlYWxdJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdGlmICghc2Nsb2FkZWQpIHtcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHQkLmdldFNjcmlwdCgnbWVkaWEvY29tX2tub3dyZXMvanMvc3RyaXBlY2hlY2tvdXQubWluLmpzJyk7XG5cdFx0XHRcdHNjbG9hZGVkID0gdHJ1ZTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHZvaWQgaW5pdGlhbGl6ZVN0cmlwZSgpO1xuXHRcdFx0fVxuXHRcdH0pLm9uKCdvcGVuLnpmLnJldmVhbCcsICcja3ItcHJvcGVydHktc2xpZGVzaG93LXJldmVhbFtkYXRhLXJldmVhbF0nLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRjb25zdCAkcHNsaWRlciA9ICQoJyNrci1wcm9wZXJ0eS1zbGlkZXNob3cnKTtcblx0XHRcdCRwc2xpZGVyLnNsaWNrKCdzZXRQb3NpdGlvbicpO1xuXHRcdFx0JHBzbGlkZXIuc2xpY2soJ3JlZnJlc2gnKTtcblx0XHRcdCQoJyNrci1wcm9wZXJ0eS10aHVtYnMnKS5zbGljaygpO1xuXHRcdFx0JCgnI2tyLXByb3BlcnR5LWFycm93cycpLnNsaWNrKCk7XG5cdFx0XHQkcHNsaWRlci5zbGljaygpO1xuXHRcdH0pLm9uKCdjbGljaycsICcuZmF2c3BhbicsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRjb25zdCBwaWQgPSAkKHRoaXMpLmRhdGEoJ3Byb3BlcnR5Jyk7XG5cdFx0XHRjb25zdCBiYXIgPSAkKCcua3Itc2VhcmNoYmFyIGEuaXMtYWN0aXZlJykuZGF0YSgnYmFyJyk7XG5cdFx0XHQkLmFqYXgoe1xuXHRcdFx0XHR0eXBlOiAnUE9TVCcsXG5cdFx0XHRcdHVybDogJy9pbmRleC5waHA/b3B0aW9uPWNvbV9rbm93cmVzJnRhc2s9cHJvcGVydGllcy5mYXZvdXJpdGUnLFxuXHRcdFx0XHRkYXRhOiB7J3Byb3BlcnR5X2lkJzogcGlkfSxcblx0XHRcdFx0ZGF0YVR5cGU6ICdqc29uJyxcblx0XHRcdFx0c3VjY2VzczogZnVuY3Rpb24gKHJlc3VsdCkge1xuXHRcdFx0XHRcdGlmIChyZXN1bHQuc3VjY2Vzcykge1xuXHRcdFx0XHRcdFx0Z2V0UHJvcGVydGllcyhiYXIpO1xuXHRcdFx0XHRcdFx0JCgnLmZhdmljb24tdG9wJykuZm91bmRhdGlvbignaGlkZScpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSkub24oJ2NsaWNrJywgJy5nZXRSZXNwb25zZVNlYXJjaCcsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRpZiAoJCh0aGlzKS5kYXRhKCdhY3Rpb24nKSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdGdldFByb3BlcnRpZXMoJCh0aGlzKS5kYXRhKCdiYXInKSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRnZXRQcm9wZXJ0aWVzKCQodGhpcykuZGF0YSgnYmFyJyksICQodGhpcykuZGF0YSgnYWN0aW9uJyksICQodGhpcykuZGF0YSgnYWN0aW9uLXZhbHVlJykpO1xuXHRcdFx0fVxuXHRcdH0pLm9uKCdjbGljaycsICcua3ItZmlsdGVycy1jbG9zZScsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHQkKCcua3ItZmlsdGVycy50b3AnKS5hZGRDbGFzcygnaGlkZW1lJyk7XG5cdFx0XHQkKHRoaXMpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblx0XHR9KS5vbignY2xpY2snLCAnLmtyLWZpbHRlcnMgdWwuZmlsdGVyLXNvcnQtbGlzdCBsaS5oZWFkJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdCQodGhpcykucGFyZW50KCkuY2hpbGRyZW4oJ2xpLmZpbHRlci1pdGVtJykudG9nZ2xlKCk7XG5cdFx0XHQkKHRoaXMpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKTtcblx0XHR9KS5vbignY2xpY2snLCAnI3Nob3dnYXRld2F5cycsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHQkKCcja3ItZ2F0ZXdheXMnKS50b2dnbGVDbGFzcygnaGlkZW1lJyk7XG5cdFx0fSkub24oJ2NsaWNrJywgJ2Eua3Itc2VhcmNoYmFyJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdHNldEFjdGl2ZU1lbnUoJCh0aGlzKS5kYXRhKCdiYXInKSk7XG5cdFx0fSkub24oJ2NsaWNrJywgJy50b2dnbGVvdGhlcicsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHQkKHRoaXMpLmRhdGEoJ290aGVyJykudG9nZ2xlKCk7XG5cdFx0fSkub24oJ2NsaWNrJywgJyNrci1wcm9wZXJ0eS10YWJzIGFbaHJlZj1cIiNjYWxlbmRhclwiXScsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRpZiAoIWNhbGVuZGFyTG9hZGVkKSB7XG5cdFx0XHRcdGNvbnN0IHBpZCA9ICQodGhpcykuZGF0YSgncGlkJyk7XG5cdFx0XHRcdGxvYWRDYWxlbmRhcihwaWQsICcjY2FsZW5kYXIudGFicy1wYW5lbCcpO1xuXHRcdFx0XHRjYWxlbmRhckxvYWRlZCA9IHRydWU7XG5cdFx0XHR9XG5cdFx0fSkub24oJ21vdXNlb3ZlcicsICcja3ItdGh1bWIgaW1nJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0bGV0IHByb3BlcnR5ID0gJCh0aGlzKS5wYXJlbnQoKS5kYXRhKCdpZCcpO1xuXHRcdFx0aWYgKHByb3BlcnR5KSB7XG5cdFx0XHRcdGxldCB0YXJnZXQgPSAnLnRodW1ib3ZlcnZpZXcnICsgcHJvcGVydHk7XG5cdFx0XHRcdCQoJyNwaW5mbycpLmh0bWwoJCh0YXJnZXQpLmh0bWwoKSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRsZXQgJHByb3BzID0gJCgnLmtyLXByb3BlcnRpZXMnKTtcblx0XHRpZiAoJHByb3BzLmxlbmd0aCAmJiAhc2VhcmNoRG9uZSkge1xuXHRcdFx0Z2V0UHJvcGVydGllcygkcHJvcHMuZGF0YSgnYmFyJykpO1xuXHRcdH1cblx0XHRsZXQgJHRhYnMgPSAkKCcudGFicycpO1xuXHRcdGlmICgkKCcja3ItcHJvcGVydHktdGFicycpLmxlbmd0aCAmJiAhY2FsZW5kYXJMb2FkZWQpIHtcblx0XHRcdCR0YWJzLmZpbmQoJ2EnKS5lYWNoKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0aWYgKCQodGhpcykuYXR0cignaHJlZicpID09PSBcIiNjYWxlbmRhclwiKSB7XG5cdFx0XHRcdFx0Y29uc3QgcGlkID0gJCh0aGlzKS5kYXRhKCdwaWQnKTtcblx0XHRcdFx0XHRsb2FkQ2FsZW5kYXIocGlkLCAnI2NhbGVuZGFyLnRhYnMtcGFuZWwnKTtcblx0XHRcdFx0XHRjYWxlbmRhckxvYWRlZCA9IHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblx0fSk7XG5cblx0JC5ldmVudC5zcGVjaWFsLnRvdWNoc3RhcnQgPSB7XG5cdFx0c2V0dXA6IGZ1bmN0aW9uIChfLCBucywgaGFuZGxlKSB7XG5cdFx0XHRpZiAobnMuaW5jbHVkZXMoXCJub1ByZXZlbnREZWZhdWx0XCIpKSB7XG5cdFx0XHRcdHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgaGFuZGxlLCB7cGFzc2l2ZTogZmFsc2V9KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgaGFuZGxlLCB7cGFzc2l2ZTogdHJ1ZX0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblx0JC5ldmVudC5zcGVjaWFsLnRvdWNobW92ZSA9IHtcblx0XHRzZXR1cDogZnVuY3Rpb24gKF8sIG5zLCBoYW5kbGUpIHtcblx0XHRcdGlmIChucy5pbmNsdWRlcyhcIm5vUHJldmVudERlZmF1bHRcIikpIHtcblx0XHRcdFx0dGhpcy5hZGRFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsIGhhbmRsZSwge3Bhc3NpdmU6IGZhbHNlfSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIiwgaGFuZGxlLCB7cGFzc2l2ZTogdHJ1ZX0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblxuXHRmdW5jdGlvbiBsb2FkQ2FsZW5kYXIocGlkLCB0YXJnZXQpIHtcblx0XHQkLmFqYXgoe1xuXHRcdFx0dHlwZTogJ1BPU1QnLFxuXHRcdFx0dXJsOiAnL2luZGV4LnBocD9vcHRpb249Y29tX2tub3dyZXMmdGFzaz1wcm9wZXJ0eS5nZXJpYXRyaWMnLFxuXHRcdFx0ZGF0YVR5cGU6ICdodG1sJyxcblx0XHRcdGRhdGE6IHtcblx0XHRcdFx0J3BpZCc6IHBpZFxuXHRcdFx0fSxcblx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG5cdFx0XHRcdCQodGFyZ2V0KS5hcHBlbmQoZGF0YSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRmdW5jdGlvbiBmb3JtUmVzcG9uc2UoaWQsIGRhdGEpIHtcblx0XHRpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eSgncmVkaXJlY3QnKSkge1xuXHRcdFx0d2luZG93LmxvY2F0aW9uLnJlcGxhY2UoZGF0YS5yZWRpcmVjdCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmIChpZCA9PT0gJ2tyLWZvcm0tcGF5bWVudCcpIHtcblx0XHRcdFx0aWYgKGRhdGEuaGFzT3duUHJvcGVydHkoJ2h0bWwnKSkge1xuXHRcdFx0XHRcdGxldCAkbW9kYWwgPSAkKCcja3ItZ2F0ZXdheS1tb2RhbCcpO1xuXHRcdFx0XHRcdCRtb2RhbC5odG1sKGRhdGEuaHRtbCkudHJpZ2dlcigncmVzaXplbWUuemYucmV2ZWFsJyk7XG5cdFx0XHRcdFx0JG1vZGFsLmZvdW5kYXRpb24oJ29wZW4nKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvJztcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKGlkID09PSAna3ItZm9ybS1tYWlsY2hpbXAnKSB7XG5cdFx0XHRcdFx0JCgnI3Jlc3BvbnNlMicpLmh0bWwoZGF0YSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiBnZXRQcm9wZXJ0aWVzKGJhciwgYWN0aW9uID0gJycsIGFjdGlvbl92YWx1ZSA9ICcnKSB7XG5cdFx0JC5hamF4KHtcblx0XHRcdHVybDogJy9pbmRleC5waHA/b3B0aW9uPWNvbV9rbm93cmVzJnRhc2s9cHJvcGVydGllcy5yYXcnLFxuXHRcdFx0dHlwZTogJ1BPU1QnLFxuXHRcdFx0ZGF0YTogeydiYXInOiBiYXIsICdhY3Rpb24nOiBhY3Rpb24sICdhY3Rpb25fdmFsdWUnOiBhY3Rpb25fdmFsdWV9LFxuXHRcdFx0ZGF0YVR5cGU6ICdqc29uJyxcblx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG5cdFx0XHRcdGlmICghZGF0YSkge1xuXHRcdFx0XHRcdHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjb25zdCB2YWxzID0gWydncmlkJywgJ2xpc3QnLCAnZmF2cycsICdtYXAnXTtcblx0XHRcdFx0aWYgKHZhbHMuaW5jbHVkZXMoZGF0YS5iYXIpKSB7XG5cdFx0XHRcdFx0c2V0QWN0aXZlTWVudShkYXRhLmJhcik7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRzZXRTZWFyY2hEYXRhKGRhdGEsIGRhdGEuYmFyKTtcblx0XHRcdFx0JCgnLmhhcy10aXAnKS5mb3VuZGF0aW9uKCk7XG5cdFx0XHRcdCQoJy5kcm9wZG93bi1wYW5lJykuZm91bmRhdGlvbigpO1xuXHRcdFx0XHQkKCcua3ItcHJvcGVydHkgLmNhcmQnKS5mb3VuZGF0aW9uKCk7XG5cdFx0XHRcdCQoJyNrci1vcmRlci1jbG9zZScpLnRyaWdnZXIoJ2NsaWNrJyk7XG5cdFx0XHRcdHNlYXJjaERvbmUgPSB0cnVlO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0ZnVuY3Rpb24gc2V0U2VhcmNoRGF0YShyZXNwb25zZSwgYWN0aW9uID0gJycpIHtcblx0XHRsZXQgJHNpZGViYXI7XG5cdFx0aWYgKHJlc3BvbnNlKSB7XG5cdFx0XHQkKCcja3ItcHJvcGVydGllcy1kYXRhJykuZW1wdHkoKS5mYWRlSW4oJ3Nsb3cnKS5odG1sKHJlc3BvbnNlWydpdGVtcyddKS5mb3VuZGF0aW9uKCk7XG5cdFx0XHQkKCcua3ItcGFnZXInKS5odG1sKHJlc3BvbnNlWydwYWdpbmF0aW9uJ10pO1xuXHRcdFx0JCgnLmtyLXBhZ2VyLmJvdHRvbScpLmh0bWwocmVzcG9uc2VbJ3BhZ2luYXRpb24nXSk7XG5cdFx0XHQkKFwiI2tyLW9mZmNhbnZhcy1wcm9wZXJ0aWVzLWZpbHRlclwiKS5odG1sKHJlc3BvbnNlWydmaWx0ZXJzJ10pO1xuXHRcdFx0JChcIiNrci1vZmZjYW52YXMtcHJvcGVydGllcy1zb3J0YnlcIikuaHRtbChyZXNwb25zZVsnc29ydGJ5J10pO1xuXHRcdFx0JCgnI2tyLXByb3BlcnRpZXMtZmlsdGVyLWNvdW50JykuaHRtbChyZXNwb25zZVsncGNvdW50J10pO1xuXHRcdFx0JHNpZGViYXIgPSAkKFwiI2tyLXNpZGViYXItc2VhcmNoXCIpO1xuXHRcdFx0aWYgKCRzaWRlYmFyLmxlbmd0aCAmJiByZXNwb25zZVsnc2VhcmNoJ10ubGVuZ3RoKSB7XG5cdFx0XHRcdCRzaWRlYmFyLmVtcHR5KCkuaHRtbChyZXNwb25zZVsnc2VhcmNoJ10pO1xuXHRcdFx0XHQkKCdib2R5JykudHJpZ2dlcignaW5pdGFqYXhzZWFyY2gnKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGFjdGlvbiA9PT0gJ3BhZ2UnKSB7XG5cdFx0XHRcdGNvbnN0IHN0aWNreSA9ICQoJy5zdGlja3knKTtcblx0XHRcdFx0aWYgKHN0aWNreS5sZW5ndGgpIHtcblx0XHRcdFx0XHRzdGlja3kuZm91bmRhdGlvbignX2NhbGMnLCB0cnVlKTtcblx0XHRcdFx0XHR3aW5kb3cuc2Nyb2xsVG8oMCwgMCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiBzZXRBY3RpdmVNZW51KGJhcikge1xuXHRcdGNvbnN0IHNlYXJjaGJhciA9ICQoJy5rci1zZWFyY2hiYXInKS5maW5kKCcuYnV0dG9uJyk7XG5cdFx0JC5lYWNoKHNlYXJjaGJhciwgZnVuY3Rpb24gKGluZGV4LCBzZWFyY2hiYXIpIHtcblx0XHRcdCQoc2VhcmNoYmFyKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG5cdFx0fSk7XG5cdFx0JCgnLmtyLXNlYXJjaGJhciAuYnV0dG9uLicgKyBiYXIpLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcblx0fVxuXG5cdC8vIFJldHVybiB0cnVlIGlmIHdpZHRoIGhhcyBjaGFuZ2VkXG5cdGZ1bmN0aW9uIHNjcmVlbldpZHRoSGFzQ2hhbmdlZCgpIHtcblx0XHRsYXJnZSA9IEZvdW5kYXRpb24uTWVkaWFRdWVyeS5hdExlYXN0KCdsYXJnZScpO1xuXHRcdGlmIChsYXJnZSAhPT0gc2F2ZWR3aWR0aCkge1xuXHRcdFx0c2F2ZWR3aWR0aCA9IGxhcmdlO1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiBjaGVja1NjcmVlbldpZHRoKCkge1xuXHRcdHJlc2l6ZWQgPSBmYWxzZTtcblx0XHRpZiAoc2NyZWVuV2lkdGhIYXNDaGFuZ2VkKCkgJiYgc2VhcmNoRGF0YVsnaXRlbXMnXSAmJiAhcmVzaXplZCkge1xuXHRcdFx0c2V0U2VhcmNoRGF0YShzZWFyY2hEYXRhKTtcblx0XHRcdHJlc2l6ZWQgPSB0cnVlO1xuXHRcdH1cblx0fVxuXG5cdCQuZXZlbnQuc3BlY2lhbC50b3VjaHN0YXJ0ID0ge1xuXHRcdHNldHVwOiBmdW5jdGlvbiAoXywgbnMsIGhhbmRsZSkge1xuXHRcdFx0aWYgKG5zLmluY2x1ZGVzKFwibm9QcmV2ZW50RGVmYXVsdFwiKSkge1xuXHRcdFx0XHR0aGlzLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIGhhbmRsZSwge3Bhc3NpdmU6IGZhbHNlfSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIGhhbmRsZSwge3Bhc3NpdmU6IHRydWV9KTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG5cdCQuZXZlbnQuc3BlY2lhbC50b3VjaG1vdmUgPSB7XG5cdFx0c2V0dXA6IGZ1bmN0aW9uIChfLCBucywgaGFuZGxlKSB7XG5cdFx0XHRpZiAobnMuaW5jbHVkZXMoXCJub1ByZXZlbnREZWZhdWx0XCIpKSB7XG5cdFx0XHRcdHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLCBoYW5kbGUsIHtwYXNzaXZlOiBmYWxzZX0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5hZGRFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsIGhhbmRsZSwge3Bhc3NpdmU6IHRydWV9KTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG59KGpRdWVyeSkpOyIsIi8qKlxuICogQHBhY2thZ2UgICAgS25vdyBSZXNlcnZhdGlvbnNcbiAqIEBzdWJwYWNrYWdlIFNpdGUgSlNcbiAqIEBjb3B5cmlnaHQgIDIwMjAgSGlnaGxhbmQgVmlzaW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogQGxpY2Vuc2UgICAgU2VlIHRoZSBmaWxlIFwiTElDRU5TRS50eHRcIiBmb3IgdGhlIGZ1bGwgbGljZW5zZSBnb3Zlcm5pbmcgdGhpcyBjb2RlLlxuICogQGF1dGhvciAgICAgSGF6ZWwgV2lsc29uIDxoYXplbEBoaWdobGFuZHZpc2lvbi5jb20+XG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoJCkge1xuXHRpZiAoIXdpbmRvdy5sb2NhdGlvbi5vcmlnaW4pIHtcblx0XHR3aW5kb3cubG9jYXRpb24ub3JpZ2luID0gd2luZG93LmxvY2F0aW9uLnByb3RvY29sICsgXCIvL1wiICsgd2luZG93LmxvY2F0aW9uLmhvc3Q7XG5cdH1cblxuXHRsZXQgbXlDb25maXJtLCAkbXlUYXNrO1xuXG5cdGNsYXNzIEtyY29uZmlybSB7XG5cdFx0Y29uc3RydWN0b3IoJGZvcm0pIHtcblx0XHRcdHRoaXMuZm9ybSA9ICRmb3JtO1xuXHRcdFx0dGhpcy5pbml0KCk7XG5cdFx0fVxuXG5cdFx0aW5pdCgpIHtcblx0XHRcdHRoaXMudXBkYXRlUXVvdGUodGhpcy5mb3JtKTtcblx0XHR9XG5cblx0XHR1cGRhdGVRdW90ZSgkZm9ybSkge1xuXHRcdFx0JG15VGFzayA9ICQoJyNteXRhc2snKTtcblx0XHRcdCRteVRhc2sudmFsKCdjb25maXJtLmNvbXB1dGUnKTtcblx0XHRcdGpRdWVyeS5hamF4KHtcblx0XHRcdFx0dHlwZTogJ1BPU1QnLFxuXHRcdFx0XHR1cmw6ICdpbmRleC5waHA/b3B0aW9uPWNvbV9rbm93cmVzJnRhc2s9Y29uZmlybS5jb21wdXRlJyxcblx0XHRcdFx0ZGF0YTogJGZvcm0uc2VyaWFsaXplQXJyYXkoKSxcblx0XHRcdFx0ZGF0YVR5cGU6ICdqc29uJyxcblx0XHRcdFx0c3VjY2VzczogZnVuY3Rpb24gKHJlc3VsdCkge1xuXHRcdFx0XHRcdCRteVRhc2sudmFsKCdjb25maXJtLnBheW1lbnQnKTtcblx0XHRcdFx0XHRpZiAocmVzdWx0LnN1Y2Nlc3MpIHtcblx0XHRcdFx0XHRcdGNvbnN0IGRhdGEgPSByZXN1bHQuZGF0YTtcblx0XHRcdFx0XHRcdGlmIChkYXRhLmhhc093blByb3BlcnR5KCdyZWRpcmVjdCcpKSB7XG5cdFx0XHRcdFx0XHRcdHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKGRhdGEucmVkaXJlY3QpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0bGV0IGRpdjtcblx0XHRcdFx0XHRcdCQuZWFjaChyZXN1bHQuZGF0YS5yZXNwb25zZSwgZnVuY3Rpb24gKGtleSwgdmFsKSB7XG5cdFx0XHRcdFx0XHRcdCQoJy5oaWRlaW5pdGlhbCcpLnNob3coKTtcblx0XHRcdFx0XHRcdFx0ZGl2ID0gXCIjXCIgKyBrZXk7XG5cdFx0XHRcdFx0XHRcdCQoZGl2KS50ZXh0KHZhbCk7XG5cdFx0XHRcdFx0XHRcdCQoZGl2KS5odG1sKHZhbCk7XG5cdFx0XHRcdFx0XHRcdCQoZGl2KS52YWwodmFsKTtcblx0XHRcdFx0XHRcdFx0JChkaXYpLnNob3coKTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHQkKCcua3ItYWpheC1tb2RhbC1lcnJvci1tZXNzYWdlJykuaHRtbChyZXN1bHQubWVzc2FnZSk7XG5cdFx0XHRcdFx0XHRjb25zdCAkbW9kYWwgPSBuZXcgRm91bmRhdGlvbi5SZXZlYWwoJCgnI0tyQWpheE1vZGFsRXJyb3InKSk7XG5cdFx0XHRcdFx0XHQkbW9kYWwub3BlbigpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cblx0JChmdW5jdGlvbiAoKSB7XG5cdFx0bGV0ICRlbGVtZW50ID0gJCgnI2tyLWZvcm0tY29uZmlybScpO1xuXHRcdGlmICgkZWxlbWVudC5sZW5ndGgpIHtcblx0XHRcdG15Q29uZmlybSA9IG5ldyBLcmNvbmZpcm0oJGVsZW1lbnQpO1xuXHRcdH1cblx0XHQkZWxlbWVudC5vbignY2hhbmdlIGNsaWNrJywgJy5rci1jYWxjdWxhdGUnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0JGVsZW1lbnQgPSAkKCcja3ItZm9ybS1jb25maXJtJyk7XG5cdFx0XHRteUNvbmZpcm0udXBkYXRlUXVvdGUoJGVsZW1lbnQpO1xuXHRcdH0pO1xuXG5cdFx0JChkb2N1bWVudCkub24oJ2NsaWNrJywgJyNjaGVja3Rlcm1zJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGlmIChjaGVja1Rlcm1zKCkpIHtcblx0XHRcdFx0JCgnI2NoZWNrdGVybXMnKS50cmlnZ2VyKCdzdWJtaXQnKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fSk7XG5cblx0Ly8gbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG5cdGZ1bmN0aW9uIGNoZWNrVGVybXMoKSB7XG5cdFx0bGV0IHJlc3VsdCA9IHRydWU7XG5cdFx0Y29uc3QgdGVzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZ3JlZWNoZWNrJyk7XG5cdFx0Y29uc3QgdGVzdGMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWdyZWVjaGVja2MnKTtcblx0XHRjb25zdCB0ZXN0dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZ3JlZWNoZWNrdCcpO1xuXG5cdFx0Ly8gbm9pbnNwZWN0aW9uIEpTVW5yZXNvbHZlZFZhcmlhYmxlXG5cdFx0aWYgKHRlc3QgJiYgIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdrci1mb3JtLXBheW1lbnQnKS5hZ3JlZWNoZWNrLmNoZWNrZWQpIHtcblx0XHRcdHJlc3VsdCA9IGZhbHNlO1xuXHRcdH1cblx0XHQvLyBub2luc3BlY3Rpb24gSlNVbnJlc29sdmVkVmFyaWFibGVcblx0XHRpZiAodGVzdGMgJiYgIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdrci1mb3JtLXBheW1lbnQnKS5hZ3JlZWNoZWNrYy5jaGVja2VkKSB7XG5cdFx0XHRyZXN1bHQgPSBmYWxzZTtcblx0XHR9XG5cdFx0Ly8gbm9pbnNwZWN0aW9uIEpTVW5yZXNvbHZlZFZhcmlhYmxlXG5cdFx0aWYgKHRlc3R0ICYmICFkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgna3ItZm9ybS1wYXltZW50JykuYWdyZWVjaGVja3QuY2hlY2tlZCkge1xuXHRcdFx0cmVzdWx0ID0gZmFsc2U7XG5cdFx0fVxuXG5cdFx0aWYgKHJlc3VsdCkge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnN0ICRtb2RhbCA9IG5ldyBGb3VuZGF0aW9uLlJldmVhbCgkKCcjZXJyb3JNb2RhbCcpKTtcblx0XHRcdCRtb2RhbC5vcGVuKCk7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHR9XG59KGpRdWVyeSkpOyIsIi8qKlxuICogQHBhY2thZ2UgICAgS25vdyBSZXNlcnZhdGlvbnNcbiAqIEBzdWJwYWNrYWdlIFNpdGUgSlNcbiAqIEBjb3B5cmlnaHQgIDIwMjAgSGlnaGxhbmQgVmlzaW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogQGxpY2Vuc2UgICAgU2VlIHRoZSBmaWxlIFwiTElDRU5TRS50eHRcIiBmb3IgdGhlIGZ1bGwgbGljZW5zZSBnb3Zlcm5pbmcgdGhpcyBjb2RlLlxuICogQGF1dGhvciAgICAgSGF6ZWwgV2lsc29uIDxoYXplbEBoaWdobGFuZHZpc2lvbi5jb20+XG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbmlmICghd2luZG93LmxvY2F0aW9uLm9yaWdpbikge1xuXHR3aW5kb3cubG9jYXRpb24ub3JpZ2luID0gd2luZG93LmxvY2F0aW9uLnByb3RvY29sICsgXCIvL1wiICsgd2luZG93LmxvY2F0aW9uLmhvc3Q7XG59XG5cbihmdW5jdGlvbiAoJCkge1xuXHRsZXQgbXlLckRvYkVudHJ5O1xuXHRsZXQgdG9kYXk7XG5cdGxldCBrZXkgPSB7QkFDS1NQQUNFOiA4fTtcblxuXHRsZXQgc2V0dGluZ3MgPSB7XG5cdFx0Y3VzdG9tX3ZhbGlkYXRpb246IGZhbHNlLFxuXHRcdGRheXNfaW5fbW9udGg6IFszMSwgMjksIDMxLCAzMCwgMzEsIDMwLCAzMSwgMzEsIDMwLCAzMSwgMzAsIDMxXSxcblx0XHRkb2N1bWVudF9kYXRlOiBmYWxzZSxcblx0XHRlcnJvcmJveF94OiAxLFxuXHRcdGVycm9yYm94X3k6IDUsXG5cdFx0ZmllbGRfaGludF90ZXh0X2RheTogJ0REJyxcblx0XHRmaWVsZF9oaW50X3RleHRfbW9udGg6ICdNTScsXG5cdFx0ZmllbGRfaGludF90ZXh0X3llYXI6ICdZWVlZJyxcblx0XHRmaWVsZF9vcmRlcjogJ0RNWScsXG5cdFx0ZmllbGRfd2lkdGhfZGF5OiA2LFxuXHRcdGZpZWxkX3dpZHRoX21vbnRoOiA2LFxuXHRcdGZpZWxkX3dpZHRoX3llYXI6IDcsXG5cdFx0ZmllbGRfd2lkdGhfc2VwOiAyLFxuXHRcdG1pbm1heDogJycsXG5cdFx0bWluX2RhdGU6IGZhbHNlLFxuXHRcdG1heF9kYXRlOiBmYWxzZSxcblx0XHRtaW5feWVhcjogMTkxMCxcblx0XHRtb250aF9uYW1lOiBbXG5cdFx0XHQnSmFudWFyeScsICdGZWJydWFyeScsICdNYXJjaCcsICdBcHJpbCcsXG5cdFx0XHQnTWF5JywgJ0p1bmUnLCAnSnVseScsICdBdWd1c3QnLCAnU2VwdGVtYmVyJyxcblx0XHRcdCdPY3RvYmVyJywgJ05vdmVtYmVyJywgJ0RlY2VtYmVyJ10sXG5cdFx0b25fYmx1cjogZmFsc2UsXG5cdFx0b25fZXJyb3I6IGZhbHNlLFxuXHRcdG9uX2NoYW5nZTogZmFsc2UsXG5cdFx0cGFyc2VfZGF0ZTogdHJ1ZSxcblx0XHRzZXBhcmF0b3I6ICcvJyxcblx0XHRzaG93X2Vycm9yczogdHJ1ZSxcblx0XHRzaG93X2hpbnRzOiB0cnVlLFxuXHRcdEVfREFZX05BTjogJ0RheSBtdXN0IGJlIGEgbnVtYmVyJyxcblx0XHRFX0RBWV9UT09fQklHOiAnRGF5IG11c3QgYmUgMS0zMScsXG5cdFx0RV9EQVlfVE9PX1NNQUxMOiAnRGF5IG11c3QgYmUgMS0zMScsXG5cdFx0RV9CQURfREFZX0ZPUl9NT05USDogJ09ubHkgJWQgZGF5cyBpbiAlbSAleScsXG5cdFx0RV9NT05USF9OQU46ICdNb250aCBtdXN0IGJlIGEgbnVtYmVyJyxcblx0XHRFX01PTlRIX1RPT19CSUc6ICdNb250aCBtdXN0IGJlIDEtMTInLFxuXHRcdEVfTU9OVEhfVE9PX1NNQUxMOiAnTW9udGggY2Fubm90IGJlIDAnLFxuXHRcdEVfWUVBUl9OQU46ICdZZWFyIG11c3QgYmUgYSBudW1iZXInLFxuXHRcdEVfWUVBUl9MRU5HVEg6ICdZZWFyIG11c3QgYmUgNCBkaWdpdHMnLFxuXHRcdEVfWUVBUl9UT09fU01BTEw6ICdZZWFyIG11c3Qgbm90IGJlIGJlZm9yZSAleScsXG5cdFx0RV9NSU5fREFURTogJ0RhdGUgbXVzdCBub3QgYmUgaW4gdGhlIHBhc3QnLFxuXHRcdEVfTUFYX0RBVEU6ICdEYXRlIG11c3Qgbm90IGJlIGluIHRoZSBmdXR1cmUnXG5cdH07XG5cblx0Y2xhc3MgS3JEb2JFbnRyeSB7XG5cdFx0Y29uc3RydWN0b3IoJGVsZW1lbnQsIG9wdGlvbnMpIHtcblx0XHRcdHRvZGF5ID0gS3JEb2JFbnRyeS5nZXRZbWQobmV3IERhdGUoKSk7XG5cblx0XHRcdHRoaXMuaW5wdXRfZGF5ID0gMDtcblx0XHRcdHRoaXMuaW5wdXRfbW9udGggPSAwO1xuXHRcdFx0dGhpcy5pbnB1dF95ZWFyID0gMDtcblx0XHRcdHRoaXMuJGVsZW1lbnQgPSAkZWxlbWVudDtcblx0XHRcdGlmIChvcHRpb25zKSB7XG5cdFx0XHRcdCQuZXh0ZW5kKHNldHRpbmdzLCBvcHRpb25zKTtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5pbml0KCk7XG5cdFx0fVxuXG5cdFx0c3RhdGljIGdldFltZChkYXRlKSB7XG5cdFx0XHRjb25zdCBtID0gZGF0ZS5nZXRNb250aCgpICsgMTtcblx0XHRcdGNvbnN0IGQgPSBkYXRlLmdldERheSgpO1xuXG5cdFx0XHRyZXR1cm4gKGRhdGUuZ2V0RnVsbFllYXIoKSArICctJyArIChtIDwgMTAgPyAnMCcgOiAnJykgKyBtICsgJy0nICsgKGQgPCAxMCA/ICcwJyA6ICcnKSArIGQpO1xuXHRcdH1cblxuXHRcdHN0YXRpYyBnZXRZbWRPYmplY3QoZGF0ZSkge1xuXHRcdFx0cmV0dXJuIChkYXRlLnllYXIgKyAnLScgKyBkYXRlLm1vbnRoICsgJy0nICsgZGF0ZS5kYXkpO1xuXHRcdH1cblxuXHRcdGFkZEVudHJ5RmllbGRzKCkge1xuXHRcdFx0bGV0IGRvYmZpZWxkID0gdGhpcztcblx0XHRcdGRvYmZpZWxkLmZpZWxkcyA9IFtdO1xuXHRcdFx0JC5lYWNoKHNldHRpbmdzLmZpZWxkX29yZGVyLnNwbGl0KCcnKSwgZnVuY3Rpb24gKGksIGZpZWxkKSB7XG5cdFx0XHRcdHN3aXRjaCAoZmllbGQpIHtcblx0XHRcdFx0XHRjYXNlICdEJzpcblx0XHRcdFx0XHRcdGRvYmZpZWxkLmJ1aWxkRmllbGQoJ2RheScsIGkpO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSAnTSc6XG5cdFx0XHRcdFx0XHRkb2JmaWVsZC5idWlsZEZpZWxkKCdtb250aCcsIGkpO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSAnWSc6XG5cdFx0XHRcdFx0XHRkb2JmaWVsZC5idWlsZEZpZWxkKCd5ZWFyJywgaSk7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRkZWZhdWx0IDpcblx0XHRcdFx0XHRcdHRocm93IFwiVW5leHBlY3RlZCBmaWVsZCBvcmRlciAnXCIgKyBmaWVsZCArIFwiJyBleHBlY3RlZCBELCBNIG9yIFlcIjtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0YWZ0ZXJQYXN0ZSh0YXJnZXQpIHtcblx0XHRcdGlmICh0aGlzLnBhcnNlRGF0ZSgkKHRhcmdldCkudmFsKCkpKSB7XG5cdFx0XHRcdHRoaXMuc2V0RGF0ZSgkKHRhcmdldCkudmFsKCkpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGJ1aWxkRmllbGQobmFtZSwgaW5kZXgpIHtcblx0XHRcdGxldCBrcmRvYmVudHJ5ID0gdGhpcztcblx0XHRcdGxldCBpbnB1dCA9IG5ldyBLckRvYklucHV0KHtcblx0XHRcdFx0bmFtZTogbmFtZSxcblx0XHRcdFx0a3Jkb2JlbnRyeToga3Jkb2JlbnRyeSxcblx0XHRcdFx0aW5kZXg6IGluZGV4LFxuXHRcdFx0XHRoaW50X3RleHQ6IHNldHRpbmdzLnNob3dfaGludHMgPyBzZXR0aW5nc1snZmllbGRfaGludF90ZXh0XycgKyBuYW1lXSA6IG51bGwsXG5cdFx0XHR9KTtcblxuXHRcdFx0dGhpcy5pbm5lci5hcHBlbmQoaW5wdXQuJGlucHV0KTtcblx0XHRcdHRoaXNbJ2lucHV0XycgKyBuYW1lXSA9IGlucHV0O1xuXG5cdFx0XHRpZiAoaW5kZXggPCAyKSB7XG5cdFx0XHRcdHRoaXMuaW5uZXIuYXBwZW5kKCQoJzxzcGFuIGNsYXNzPVwic2VwYXJhdG9yXCIgLz4nKS50ZXh0KHNldHRpbmdzLnNlcGFyYXRvcikpO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLmZpZWxkc1tpbmRleF0gPSBpbnB1dDtcblx0XHRcdHRoaXNbbmFtZV0gPSBpbnB1dDtcblx0XHR9XG5cblx0XHRidWlsZFVpKCkge1xuXHRcdFx0bGV0IGRvYmZpZWxkID0gdGhpcztcblx0XHRcdHRoaXMud3JhcHBlciA9ICQodGhpcy4kZWxlbWVudC53cmFwKCc8c3BhbiBjbGFzcz1cImpxLWR0ZVwiIC8+JykucGFyZW50KClbMF0pO1xuXHRcdFx0dGhpcy5pbm5lciA9ICQoJzxzcGFuIGNsYXNzPVwianEtZHRlLWlubmVyXCIgLz4nKTtcblx0XHRcdHRoaXMuYWRkRW50cnlGaWVsZHMoKTtcblx0XHRcdHRoaXMuZXJyb3Jib3ggPSAkKCc8c3BhbiBjbGFzcz1cImpxLWR0ZS1lcnJvcmJveFwiIC8+JykuaGlkZSgpO1xuXHRcdFx0dGhpcy5pbm5lci5vbigncGFzdGUnLCAnaW5wdXQnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRsZXQgaW5wdXQgPSB0aGlzO1xuXHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRkb2JmaWVsZC5hZnRlclBhc3RlKGlucHV0LCBlKTtcblx0XHRcdFx0fSwgMik7XG5cdFx0XHR9KTtcblx0XHRcdHRoaXMud3JhcHBlci5hcHBlbmQodGhpcy5pbm5lciwgdGhpcy5lcnJvcmJveCk7XG5cdFx0XHR0aGlzLnNldEZpZWxkV2lkdGhzKCk7XG5cdFx0XHR0aGlzLiRlbGVtZW50LmhpZGUoKTtcblx0XHR9XG5cblx0XHRjaGVja0RvY3VtZW50KGRvYiwgY2hpbGRkb2IsIGNsYXNzbmFtZSkge1xuXHRcdFx0bGV0IGVsZW1lbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShjbGFzc25hbWUpO1xuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRpZiAobmV3IERhdGUoZG9iKSA+IG5ldyBEYXRlKGNoaWxkZG9iKSkge1xuXHRcdFx0XHRcdGVsZW1lbnRzW2ldLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0ZWxlbWVudHNbaV0uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRjbGVhcigpIHtcblx0XHRcdHRoaXMuY2xlYXJFcnJvcignJyk7XG5cdFx0XHR0aGlzLnNldERhdGUoJycpO1xuXHRcdH1cblxuXHRcdGNsZWFyRXJyb3IoKSB7XG5cdFx0XHRkZWxldGUgdGhpcy5lcnJvcl90ZXh0O1xuXHRcdFx0dGhpcy5zaG93RXJyb3IoKTtcblx0XHR9XG5cblx0XHRkZXN0cm95KCkge1xuXHRcdFx0dGhpcy4kZWxlbWVudC5zaG93KCk7XG5cdFx0XHR0aGlzLiRlbGVtZW50LmNzcygnZGlzcGxheScsICcnKTtcblx0XHRcdHRoaXMud3JhcHBlci5maW5kKCdzcGFuJykucmVtb3ZlKCk7XG5cdFx0XHR0aGlzLiRlbGVtZW50LnVud3JhcCgpO1xuXHRcdFx0dGhpcy4kZWxlbWVudC5yZW1vdmVEYXRhKCdkYXRldGV4dGVudHJ5Jyk7XG5cdFx0XHRkZWxldGUgdGhpcy5pbm5lcjtcblx0XHRcdGRlbGV0ZSB0aGlzLndyYXBwZXI7XG5cdFx0XHRkZWxldGUgdGhpcy4kZWxlbWVudDtcblx0XHR9XG5cblx0XHRmb2N1cygpIHtcblx0XHRcdHRoaXMuZmllbGRzWzBdLnNldEZvY3VzKHRydWUpO1xuXHRcdH1cblxuXHRcdGZvY3VzRmllbGRCZWZvcmUoaW5wdXQpIHtcblx0XHRcdGNvbnN0IGluZGV4ID0gaW5wdXQuaW5kZXg7XG5cdFx0XHRpZiAoaW5kZXggPCAxKSB7XG5cdFx0XHRcdHJldHVyblxuXHRcdFx0fVxuXHRcdFx0dGhpcy5maWVsZHNbaW5kZXhdLnlpZWxkRm9jdXMoKTtcblx0XHRcdHRoaXMuZmllbGRzW2luZGV4IC0gMV0uc2V0Rm9jdXModHJ1ZSk7XG5cdFx0XHQvLyBsZXQgbmV4dCA9IHRoaXMuZmllbGRzW2luZGV4IC0gMV07XG5cdFx0XHQvLyBsZXQgdmFsID0gbmV4dC5nZXQoKTtcblx0XHRcdC8vIG5leHQuc2V0Rm9jdXMoZmFsc2UpO1xuXHRcdH1cblxuXHRcdGZvY3VzRmllbGRBZnRlcihpbnB1dCkge1xuXHRcdFx0Y29uc3QgaW5kZXggPSBpbnB1dC5pbmRleDtcblx0XHRcdGlmIChpbmRleCA+IDEpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5maWVsZHNbaW5kZXhdLnlpZWxkRm9jdXMoKTtcblx0XHRcdHRoaXMuZmllbGRzW2luZGV4ICsgMV0uc2V0Rm9jdXModHJ1ZSk7XG5cdFx0fVxuXG5cdFx0Zm9jdXNJbigpIHtcblx0XHRcdHRoaXMud3JhcHBlci5hZGRDbGFzcygnZm9jdXMnKTtcblx0XHR9XG5cblx0XHRmb2N1c091dCgpIHtcblx0XHRcdGlmIChzZXR0aW5ncy5vbl9ibHVyKSB7XG5cdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdHNlbGYud2lkZ2V0Rm9jdXNMb3N0KCk7XG5cdFx0XHRcdH0sIDIpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy53cmFwcGVyLnJlbW92ZUNsYXNzKCdmb2N1cycpO1xuXHRcdH1cblxuXHRcdGdldERhdGUoKSB7XG5cdFx0XHRyZXR1cm4gKHRoaXMuZGF5X3ZhbHVlICYmIHRoaXMubW9udGhfdmFsdWUgJiYgdGhpcy55ZWFyX3ZhbHVlKVxuXHRcdFx0XHQ/IHtkYXk6IHRoaXMuZGF5X3ZhbHVlLCBtb250aDogdGhpcy5tb250aF92YWx1ZSwgeWVhcjogdGhpcy55ZWFyX3ZhbHVlfVxuXHRcdFx0XHQ6IG51bGw7XG5cdFx0fVxuXG5cdFx0aW5pdCgpIHtcblx0XHRcdGlmICghc2V0dGluZ3MubWluX3llYXIpIHtcblx0XHRcdFx0c2V0dGluZ3MubWluX3llYXIgPSAnMTkxMCc7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuYnVpbGRVaSgpO1xuXHRcdFx0dGhpcy5zZXREYXRlKHRoaXMuJGVsZW1lbnQuYXR0cigndmFsdWUnKSk7XG5cdFx0XHR0aGlzLnByb3h5TGFiZWxDbGlja3MoKTtcblx0XHR9XG5cblx0XHRwYXJzZURhdGUodGV4dCkge1xuXHRcdFx0cmV0dXJuIHRoaXMucGFyc2VJc29EYXRlKHRleHQpO1xuXHRcdH1cblxuXHRcdHBhcnNlSXNvRGF0ZSh0ZXh0KSB7XG5cdFx0XHRyZXR1cm4gdGV4dCAmJiB0ZXh0Lm1hdGNoKC9eKFxcZFxcZFxcZFxcZCktKFxcZFxcZCktKFxcZFxcZCkvKSA/IHtcblx0XHRcdFx0ZGF5OiBSZWdFeHAuJDMsXG5cdFx0XHRcdG1vbnRoOiBSZWdFeHAuJDIsXG5cdFx0XHRcdHllYXI6IFJlZ0V4cC4kMVxuXHRcdFx0fSA6IG51bGw7XG5cdFx0fVxuXG5cdFx0cHJveHlMYWJlbENsaWNrcygpIHtcblx0XHRcdGxldCBkb2JmaWVsZCA9IHRoaXM7XG5cdFx0XHRsZXQgaWQgPSB0aGlzLiRlbGVtZW50LmF0dHIoJ2lkJyk7XG5cdFx0XHRpZiAoIWlkKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdC8vICQoJ2xhYmVsW2Zvcj0nICsgaWQgKyAnXScpLmNsaWNrKGZ1bmN0aW9uICgpIHtcblx0XHRcdC8vIFx0ZG9iZmllbGQuZm9jdXMoKTtcblx0XHRcdC8vIH0pO1xuXHRcdFx0JCgnbGFiZWxbZm9yPScgKyBpZCArICddJykub25tb3VzZXVwKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0ZG9iZmllbGQuZm9jdXMoKTtcblx0XHRcdH0pO1xuXG5cdFx0fVxuXG5cdFx0c2V0RGF0ZShuZXdfZGF0ZSkge1xuXHRcdFx0bGV0IGRvYmZpZWxkID0gdGhpcztcblx0XHRcdG5ld19kYXRlID0gdGhpcy5wYXJzZURhdGUobmV3X2RhdGUpO1xuXHRcdFx0ZGVsZXRlIHRoaXMuZGF5X3ZhbHVlO1xuXHRcdFx0ZGVsZXRlIHRoaXMubW9udGhfdmFsdWU7XG5cdFx0XHRkZWxldGUgdGhpcy55ZWFyX3ZhbHVlO1xuXHRcdFx0dGhpcy5pbnB1dF9kYXkuc2V0KG5ld19kYXRlID8gbmV3X2RhdGUuZGF5IDogJycpO1xuXHRcdFx0dGhpcy5pbnB1dF9tb250aC5zZXQobmV3X2RhdGUgPyBuZXdfZGF0ZS5tb250aCA6ICcnKTtcblx0XHRcdHRoaXMuaW5wdXRfeWVhci5zZXQobmV3X2RhdGUgPyBuZXdfZGF0ZS55ZWFyIDogJycpO1xuXHRcdFx0dGhpcy5jbGVhckVycm9yKCk7XG5cdFx0XHR0aGlzLiRlbGVtZW50LnZhbChuZXdfZGF0ZSk7XG5cdFx0XHRpZiAobmV3X2RhdGUpIHtcblx0XHRcdFx0JC5lYWNoKHRoaXMuZmllbGRzLCBmdW5jdGlvbiAoaSwgaW5wdXQpIHtcblx0XHRcdFx0XHRkb2JmaWVsZC52YWxpZGF0ZShpbnB1dCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHNldEVycm9yKGVycm9yX3RleHQpIHtcblx0XHRcdHRoaXMuZXJyb3JfdGV4dCA9IGVycm9yX3RleHQ7XG5cdFx0XHR0aGlzLnNob3dFcnJvcigpO1xuXHRcdH1cblxuXHRcdHNldEZpZWxkV2lkdGhzKCkge1xuXHRcdFx0bGV0IGF2YWlsYWJsZSA9IHRoaXMuJGVsZW1lbnQud2lkdGgoKSAtIDI7XG5cdFx0XHRsZXQgdG90YWwgPSBzZXR0aW5ncy5maWVsZF93aWR0aF95ZWFyICsgc2V0dGluZ3MuZmllbGRfd2lkdGhfc2VwICsgc2V0dGluZ3MuZmllbGRfd2lkdGhfbW9udGggK1xuXHRcdFx0XHRzZXR0aW5ncy5maWVsZF93aWR0aF9zZXAgKyBzZXR0aW5ncy5maWVsZF93aWR0aF9kYXk7XG5cdFx0XHR0aGlzLmlucHV0X2RheS5zZXRXaWR0aChNYXRoLmZsb29yKHNldHRpbmdzLmZpZWxkX3dpZHRoX2RheSAqIGF2YWlsYWJsZSAvIHRvdGFsKSk7XG5cdFx0XHR0aGlzLmlucHV0X21vbnRoLnNldFdpZHRoKE1hdGguZmxvb3Ioc2V0dGluZ3MuZmllbGRfd2lkdGhfbW9udGggKiBhdmFpbGFibGUgLyB0b3RhbCkpO1xuXHRcdFx0dGhpcy5pbnB1dF95ZWFyLnNldFdpZHRoKE1hdGguZmxvb3Ioc2V0dGluZ3MuZmllbGRfd2lkdGhfeWVhciAqIGF2YWlsYWJsZSAvIHRvdGFsKSk7XG5cdFx0fVxuXG5cdFx0c2V0UmVhZG9ubHkobW9kZSkge1xuXHRcdFx0aWYgKG1vZGUgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRtb2RlID0gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdHRoaXMuaW5wdXRfZGF5LnNldFJlYWRvbmx5KG1vZGUpO1xuXHRcdFx0dGhpcy5pbnB1dF9tb250aC5zZXRSZWFkb25seShtb2RlKTtcblx0XHRcdHRoaXMuaW5wdXRfeWVhci5zZXRSZWFkb25seShtb2RlKTtcblx0XHRcdGlmIChtb2RlKSB7XG5cdFx0XHRcdHRoaXMud3JhcHBlci5hZGRDbGFzcygncmVhZG9ubHknKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMud3JhcHBlci5yZW1vdmVDbGFzcygncmVhZG9ubHknKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRzaG93RXJyb3IoKSB7XG5cdFx0XHRsZXQgZXJyb3JfdGV4dCA9IHRoaXMud2lkZ2V0RXJyb3JUZXh0KCk7XG5cdFx0XHRpZiAodGhpcy5vbl9lcnJvcikge1xuXHRcdFx0XHR0aGlzLm9uX2Vycm9yKGVycm9yX3RleHQpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCFzZXR0aW5ncy5zaG93X2Vycm9ycykge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRpZiAoZXJyb3JfdGV4dCA9PT0gJycpIHtcblx0XHRcdFx0dGhpcy5lcnJvcmJveC5oaWRlKCk7XG5cdFx0XHRcdHRoaXMuZXJyb3Jib3gudGV4dCgnJyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRsZXQgeF9vZmZzZXQgPSAodGhpcy5pbm5lci5vdXRlcldpZHRoKCkgKyBzZXR0aW5ncy5lcnJvcmJveF94KSArICdweCc7XG5cdFx0XHRcdGxldCB5X29mZnNldCA9IHNldHRpbmdzLmVycm9yYm94X3kgKyAncHgnO1xuXHRcdFx0XHR0aGlzLmVycm9yYm94LmNzcyh7ZGlzcGxheTogJ2Jsb2NrJywgcG9zaXRpb246ICdhYnNvbHV0ZScsIHRvcDogeV9vZmZzZXQsIGxlZnQ6IHhfb2Zmc2V0fSk7XG5cdFx0XHRcdHRoaXMuZXJyb3Jib3gudGV4dChlcnJvcl90ZXh0KTtcblx0XHRcdFx0dGhpcy5lcnJvcmJveC5zaG93KCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dmFsaWRhdGUoY3VycmVudF9pbnB1dCkge1xuXHRcdFx0dGhpcy4kZWxlbWVudC52YWwoJycpO1xuXHRcdFx0aWYgKGN1cnJlbnRfaW5wdXQpIHtcblx0XHRcdFx0Y29uc3QgdHlwZSA9IGN1cnJlbnRfaW5wdXQubmFtZTtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRpZiAodHlwZSA9PT0gJ2RheScpIHtcblx0XHRcdFx0XHRcdHRoaXMudmFsaWRhdGVEYXkoKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0aWYgKHR5cGUgPT09ICdtb250aCcpIHtcblx0XHRcdFx0XHRcdFx0dGhpcy52YWxpZGF0ZU1vbnRoKCk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRpZiAodHlwZSA9PT0gJ3llYXInKSB7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy52YWxpZGF0ZVllYXIoKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRjdXJyZW50X2lucHV0LmNsZWFyRXJyb3IoKTtcblx0XHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRcdGN1cnJlbnRfaW5wdXQuc2V0RXJyb3IoZSk7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAodGhpcy5kYXlfdmFsdWUgJiYgdGhpcy5tb250aF92YWx1ZSkge1xuXHRcdFx0XHR0aGlzLmNsZWFyRXJyb3IoKTtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHR0aGlzLnZhbGlkYXRlRGF5c0luTW9udGgoKTtcblx0XHRcdFx0XHRpZiAodGhpcy55ZWFyX3ZhbHVlICYmIHRoaXMueWVhcl92YWx1ZS5sZW5ndGggPT09IDQpIHtcblx0XHRcdFx0XHRcdHRoaXMudmFsaWRhdGVDb21wbGV0ZURhdGUoKTtcblx0XHRcdFx0XHRcdGxldCBkYXRlX3N0ciA9IEtyRG9iRW50cnkuZ2V0WW1kT2JqZWN0KHRoaXMuZ2V0RGF0ZSgpKTtcblx0XHRcdFx0XHRcdHRoaXMuJGVsZW1lbnQudmFsKGRhdGVfc3RyKTtcblx0XHRcdFx0XHRcdGlmICh0aGlzLiRlbGVtZW50LmRhdGEoJ2NoaWxkZG9iJykpIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5jaGVja0RvY3VtZW50KGRhdGVfc3RyLCB0aGlzLiRlbGVtZW50LmRhdGEoJ2NoaWxkZG9iJyksIHRoaXMuJGVsZW1lbnQuYXR0cignaWQnKSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdFx0dGhpcy5zZXRFcnJvcihlKTtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuY2xlYXJFcnJvcigpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHR2YWxpZGF0ZUNvbXBsZXRlRGF0ZSgpIHtcblx0XHRcdGNvbnN0IGRhdGVfb2JqID0gdGhpcy5nZXREYXRlKCk7XG5cdFx0XHRjb25zdCBkYXRlX2lzbyA9IEtyRG9iRW50cnkuZ2V0WW1kT2JqZWN0KGRhdGVfb2JqKTtcblx0XHRcdHNldHRpbmdzLm1pbm1heCA9IHRoaXMuJGVsZW1lbnQuZGF0YSgndmFsaWRhdGlvbicpO1xuXG5cdFx0XHRpZiAoc2V0dGluZ3MubWlubWF4ID09PSAnbWF4Jykge1xuXHRcdFx0XHRpZiAoZGF0ZV9pc28gPiB0b2RheSkge1xuXHRcdFx0XHRcdHRocm93IChzZXR0aW5ncy5FX01BWF9EQVRFKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKHNldHRpbmdzLm1pbm1heCA9PT0gJ21pbicpIHtcblx0XHRcdFx0aWYgKGRhdGVfaXNvIDwgdG9kYXkpIHtcblx0XHRcdFx0XHR0aHJvdyAoc2V0dGluZ3MuRV9NSU5fREFURSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gbGV0IG1heF9kYXRlID0gc2V0dGluZ3MubWF4X2RhdGU7XG5cdFx0XHQvLyBpZiAodHlwZW9mIG1heF9kYXRlID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHQvLyBcdG1heF9kYXRlID0gbWF4X2RhdGUuY2FsbCh0aGlzKTtcblx0XHRcdC8vIH1cblx0XHRcdC8vIGlmICh0eXBlb2YgbWF4X2RhdGUgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHQvLyBcdG1heF9kYXRlID0gdGhpcy5wYXJzZURhdGUobWF4X2RhdGUpO1xuXHRcdFx0Ly8gfVxuXHRcdFx0Ly8gaWYgKG1heF9kYXRlKSB7XG5cdFx0XHQvLyBcdGlmIChkYXRlX2lzbyA+IHNldHRpbmdzLm1heF9kYXRlKSB7XG5cdFx0XHQvLyBcdFx0dGhyb3coc2V0dGluZ3MuRV9NQVhfREFURSk7XG5cdFx0XHQvLyBcdH1cblx0XHRcdC8vIH1cblxuXHRcdFx0aWYgKHRoaXMuY3VzdG9tX3ZhbGlkYXRpb24pIHtcblx0XHRcdFx0ZGF0ZV9vYmouZGF0ZSA9IG5ldyBEYXRlKFxuXHRcdFx0XHRcdHBhcnNlSW50KGRhdGVfb2JqLnllYXIsIDEwKSxcblx0XHRcdFx0XHRwYXJzZUludChkYXRlX29iai5tb250aCwgMTApIC0gMSxcblx0XHRcdFx0XHRwYXJzZUludChkYXRlX29iai5kYXksIDEwKVxuXHRcdFx0XHQpO1xuXHRcdFx0XHR0aGlzLmN1c3RvbV92YWxpZGF0aW9uKGRhdGVfb2JqKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR2YWxpZGF0ZURheSgpIHtcblx0XHRcdGxldCBvcHQgPSBzZXR0aW5ncztcblx0XHRcdGxldCBpbnB1dCA9IHRoaXMuaW5wdXRfZGF5O1xuXHRcdFx0dGhpcy5kYXlfdmFsdWUgPSB1bmRlZmluZWQ7XG5cdFx0XHRsZXQgdGV4dCA9IGlucHV0LmdldCgpO1xuXHRcdFx0aWYgKHRleHQgPT09ICcnIHx8ICh0ZXh0ID09PSAnMCcgJiYgaW5wdXQuaGFzX2ZvY3VzKSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRpZiAodGV4dC5tYXRjaCgvXFxELykpIHtcblx0XHRcdFx0dGhyb3cgKG9wdC5FX0RBWV9OQU4pO1xuXHRcdFx0fVxuXHRcdFx0bGV0IG51bSA9IHBhcnNlSW50KHRleHQsIDEwKTtcblx0XHRcdGlmIChudW0gPCAxKSB7XG5cdFx0XHRcdHRocm93IChvcHQuRV9EQVlfVE9PX1NNQUxMKTtcblx0XHRcdH1cblx0XHRcdGlmIChudW0gPiAzMSkge1xuXHRcdFx0XHR0aHJvdyAob3B0LkVfREFZX1RPT19CSUcpO1xuXHRcdFx0fVxuXHRcdFx0dGV4dCA9IG51bSA8IDEwID8gJzAnICsgbnVtIDogJycgKyBudW07XG5cdFx0XHRpZiAoIWlucHV0Lmhhc19mb2N1cykge1xuXHRcdFx0XHRpbnB1dC5zZXQodGV4dCk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLmRheV92YWx1ZSA9IHRleHQ7XG5cdFx0fVxuXG5cdFx0dmFsaWRhdGVEYXlzSW5Nb250aCgpIHtcblx0XHRcdGNvbnN0IGRheSA9IHBhcnNlSW50KHRoaXMuZGF5X3ZhbHVlLCAxMCk7XG5cdFx0XHRjb25zdCBtb250aCA9IHBhcnNlSW50KHRoaXMubW9udGhfdmFsdWUsIDEwKTtcblx0XHRcdGNvbnN0IHllYXIgPSBwYXJzZUludCh0aGlzLnllYXJfdmFsdWUsIDEwKTtcblx0XHRcdGlmIChkYXkgPCAxIHx8IG1vbnRoIDwgMSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRsZXQgbWF4ID0gc2V0dGluZ3MuZGF5c19pbl9tb250aFttb250aCAtIDFdO1xuXHRcdFx0bGV0IG1zZyA9IHNldHRpbmdzLkVfQkFEX0RBWV9GT1JfTU9OVEg7XG5cdFx0XHRpZiAobW9udGggPT09IDIgJiYgKCcnICsgeWVhcikubGVuZ3RoID09PSA0KSB7XG5cdFx0XHRcdG1heCA9IHllYXIgJSA0ID8gMjggOiB5ZWFyICUgMTAwID8gMjkgOiB5ZWFyICUgNDAwID8gMjggOiAyOTtcblx0XHRcdFx0bXNnID0gbXNnLnJlcGxhY2UoLyV5LywgeWVhci50b1N0cmluZygpKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdG1zZyA9IG1zZy5yZXBsYWNlKC8gKiV5LywgJycpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGRheSA+IG1heCkge1xuXHRcdFx0XHR0aHJvdyAobXNnLnJlcGxhY2UoLyVkLywgbWF4LnRvU3RyaW5nKCkpLnJlcGxhY2UoLyVtLywgc2V0dGluZ3MubW9udGhfbmFtZVttb250aCAtIDFdKSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dmFsaWRhdGVNb250aCgpIHtcblx0XHRcdGxldCBpbnB1dCA9IHRoaXMuaW5wdXRfbW9udGg7XG5cdFx0XHR0aGlzLm1vbnRoX3ZhbHVlID0gdW5kZWZpbmVkO1xuXHRcdFx0bGV0IHRleHQgPSBpbnB1dC5nZXQoKTtcblx0XHRcdGlmICh0ZXh0ID09PSAnJyB8fCAodGV4dCA9PT0gJzAnICYmIGlucHV0Lmhhc19mb2N1cykpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHRleHQubWF0Y2goL1xcRC8pKSB7XG5cdFx0XHRcdHRocm93IChzZXR0aW5ncy5FX01PTlRIX05BTik7XG5cdFx0XHR9XG5cdFx0XHRsZXQgbnVtID0gcGFyc2VJbnQodGV4dCwgMTApO1xuXHRcdFx0aWYgKG51bSA8IDEpIHtcblx0XHRcdFx0dGhyb3cgKHNldHRpbmdzLkVfTU9OVEhfVE9PX1NNQUxMKTtcblx0XHRcdH1cblx0XHRcdGlmIChudW0gPiAxMikge1xuXHRcdFx0XHR0aHJvdyAoc2V0dGluZ3MuRV9NT05USF9UT09fQklHKTtcblx0XHRcdH1cblx0XHRcdHRleHQgPSBudW0gPCAxMCA/ICcwJyArIG51bSA6ICcnICsgbnVtO1xuXHRcdFx0aWYgKCFpbnB1dC5oYXNfZm9jdXMpIHtcblx0XHRcdFx0aW5wdXQuc2V0KHRleHQpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5tb250aF92YWx1ZSA9IHRleHQ7XG5cdFx0fVxuXG5cdFx0dmFsaWRhdGVZZWFyKCkge1xuXHRcdFx0Y29uc3QgaW5wdXQgPSB0aGlzLmlucHV0X3llYXI7XG5cdFx0XHR0aGlzLnllYXJfdmFsdWUgPSB1bmRlZmluZWQ7XG5cdFx0XHRsZXQgdGV4dCA9IGlucHV0LmdldCgpO1xuXHRcdFx0aWYgKHRleHQgPT09ICcnIHx8ICh0ZXh0ID09PSAnMCcgJiYgaW5wdXQuaGFzX2ZvY3VzKSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRpZiAodGV4dC5tYXRjaCgvXFxELykpIHtcblx0XHRcdFx0dGhyb3cgKHNldHRpbmdzLkVfWUVBUl9OQU4pO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGlucHV0Lmhhc19mb2N1cykge1xuXHRcdFx0XHRpZiAodGV4dC5sZW5ndGggPiA0KSB7XG5cdFx0XHRcdFx0dGhyb3cgKHNldHRpbmdzLkVfWUVBUl9MRU5HVEgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAodGV4dC5sZW5ndGggIT09IDQpIHtcblx0XHRcdFx0XHR0aHJvdyAoc2V0dGluZ3MuRV9ZRUFSX0xFTkdUSCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmICh0ZXh0Lmxlbmd0aCA9PT0gNCkge1xuXHRcdFx0XHRjb25zdCBudW0gPSBwYXJzZUludCh0ZXh0LCAxMCk7XG5cdFx0XHRcdGlmIChzZXR0aW5ncy5taW5feWVhciAmJiBudW0gPCBzZXR0aW5ncy5taW5feWVhcikge1xuXHRcdFx0XHRcdHRocm93IChzZXR0aW5ncy5FX1lFQVJfVE9PX1NNQUxMLnJlcGxhY2UoLyV5Lywgc2V0dGluZ3MubWluX3llYXIpKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0dGhpcy55ZWFyX3ZhbHVlID0gdGV4dDtcblx0XHR9XG5cblx0XHR3aWRnZXRFcnJvclRleHQoKSB7XG5cdFx0XHRsZXQgZXJyb3JfdGV4dCA9ICcnO1xuXHRcdFx0JC5lYWNoKHRoaXMuZmllbGRzLCBmdW5jdGlvbiAoaSwgaW5wdXQpIHtcblx0XHRcdFx0aWYgKGlucHV0LmVycm9yX3RleHQpIHtcblx0XHRcdFx0XHRpZiAoaW5wdXQuaGFzX2ZvY3VzIHx8IGVycm9yX3RleHQgPT09ICcnKSB7XG5cdFx0XHRcdFx0XHRlcnJvcl90ZXh0ID0gaW5wdXQuZXJyb3JfdGV4dFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRpZiAoZXJyb3JfdGV4dCA9PT0gJycgJiYgdGhpcy5lcnJvcl90ZXh0KSB7XG5cdFx0XHRcdGVycm9yX3RleHQgPSB0aGlzLmVycm9yX3RleHQ7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZXJyb3JfdGV4dDtcblx0XHR9XG5cblx0XHR3aWRnZXRGb2N1c0xvc3QoKSB7XG5cdFx0XHRpZiAoc2V0dGluZ3Mub25fYmx1ciAmJiAhdGhpcy53cmFwcGVyLmlzKCcuZm9jdXMnKSkge1xuXHRcdFx0XHRzZXR0aW5ncy5vbkJsdXIoKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRjbGFzcyBLckRvYklucHV0IHtcblx0XHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG5cdFx0XHRjb25zdCBpbnB1dCA9IHRoaXM7XG5cdFx0XHR0aGlzLmRvYmZpZWxkID0gb3B0aW9ucy5rcmRvYmVudHJ5O1xuXHRcdFx0dGhpcy5uYW1lID0gb3B0aW9ucy5uYW1lO1xuXHRcdFx0dGhpcy5pbmRleCA9IG9wdGlvbnMuaW5kZXg7XG5cdFx0XHR0aGlzLmhpbnRfdGV4dCA9IG9wdGlvbnMuaGludF90ZXh0O1xuXHRcdFx0dGhpcy5oYXNfZm9jdXMgPSBmYWxzZTtcblx0XHRcdHRoaXMuZW1wdHkgPSB0cnVlO1xuXHRcdFx0dGhpcy4kaW5wdXQgPSAkKCc8aW5wdXQgdHlwZT1cInRleHRcIiB2YWx1ZT1cIlwiIC8+JykuYWRkQ2xhc3MoJ2pxLWR0ZS0nICsgdGhpcy5uYW1lKS5hdHRyKCdhcmlhLWxhYmVsJywgJycgKyBcIiAoXCIgKyB0aGlzLmhpbnRfdGV4dCArIFwiKVwiKS5mb2N1cygkLnByb3h5KGlucHV0LCAnZm9jdXMnKSkuYmx1cigkLnByb3h5KGlucHV0LCAnYmx1cicpKS5rZXlkb3duKGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdGlucHV0LmtleWRvd24oZSk7XG5cdFx0XHRcdH0sIDIpXG5cdFx0XHR9KS5rZXl1cChmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRpbnB1dC5rZXl1cChlKTtcblx0XHRcdFx0fSwgMilcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGJsdXIoKSB7XG5cdFx0XHR0aGlzLmhhc19mb2N1cyA9IGZhbHNlO1xuXHRcdFx0dGhpcy5kb2JmaWVsZC5mb2N1c091dCgpO1xuXHRcdFx0dGhpcy5zaG93X2hpbnQoKTtcblx0XHRcdHRoaXMuZG9iZmllbGQudmFsaWRhdGUodGhpcyk7XG5cdFx0fVxuXG5cdFx0Y2xlYXJFcnJvcigpIHtcblx0XHRcdGRlbGV0ZSB0aGlzLmVycm9yX3RleHQ7XG5cdFx0XHR0aGlzLiRpbnB1dC5yZW1vdmVDbGFzcygnZXJyb3InKTtcblx0XHR9XG5cblx0XHRmb2N1cygpIHtcblx0XHRcdHRoaXMua2V5X2lzX2Rvd24gPSBmYWxzZTtcblx0XHRcdGlmICh0aGlzLiRpbnB1dC5wcm9wKCdyZWFkb25seScpKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdHRoaXMuaGFzX2ZvY3VzID0gdHJ1ZTtcblx0XHRcdHRoaXMuZG9iZmllbGQuZm9jdXNJbigpO1xuXHRcdFx0aWYgKHRoaXMuJGlucHV0Lmhhc0NsYXNzKCdoaW50JykpIHtcblx0XHRcdFx0dGhpcy4kaW5wdXQudmFsKCcnKS5yZW1vdmVDbGFzcygnaGludCcpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5kb2JmaWVsZC5zaG93RXJyb3IoKTtcblx0XHR9XG5cblx0XHRnZXQoKSB7XG5cdFx0XHRsZXQgdmFsID0gdGhpcy4kaW5wdXQudmFsKCk7XG5cdFx0XHRyZXR1cm4gdmFsID09PSB0aGlzLmhpbnRfdGV4dCA/ICcnIDogdmFsO1xuXHRcdH1cblxuXHRcdGlzRGlnaXRLZXkoZSkge1xuXHRcdFx0bGV0IGtleWNvZGUgPSBlLndoaWNoO1xuXHRcdFx0cmV0dXJuIGtleWNvZGUgPj0gNDggJiYga2V5Y29kZSA8PSA1NyB8fCBrZXljb2RlID49IDk2ICYmIGtleWNvZGUgPD0gMTA1O1xuXHRcdH1cblxuXHRcdGtleWRvd24oKSB7XG5cdFx0XHQvLyBJZ25vcmUga2V5dXAgZXZlbnRzIHRoYXQgYXJyaXZlIGFmdGVyIGZvY3VzIG1vdmVkIHRvIG5leHQgZmllbGRcblx0XHRcdHRoaXMua2V5X2lzX2Rvd24gPSB0cnVlO1xuXHRcdH1cblxuXHRcdGtleXVwKGUpIHtcblx0XHRcdGlmICghdGhpcy5rZXlfaXNfZG93bikge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHQvLyBIYW5kbGUgQmFja3NwYWNlIC0gc2hpZnRpbmcgZm9jdXMgdG8gcHJldmlvdXMgZmllbGQgaWYgcmVxdWlyZWRcblx0XHRcdGxldCBrZXljb2RlID0gZS53aGljaDtcblx0XHRcdGlmIChrZXljb2RlID09PSBrZXkuQkFDS1NQQUNFICYmIHRoaXMuZW1wdHkpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuZG9iZmllbGQuZm9jdXNGaWVsZEJlZm9yZSh0aGlzKTtcblx0XHRcdH1cblx0XHRcdGxldCB0ZXh0ID0gdGhpcy5nZXQoKTtcblx0XHRcdHRoaXMuZW1wdHkgPSB0ZXh0ID09PSAnJztcblxuXHRcdFx0Ly8gVHJhcCBhbmQgZGlzY2FyZCBzZXBhcmF0b3IgY2hhcmFjdGVycyAtIGFkdmFuY2luZyBmb2N1cyBpZiByZXF1aXJlZFxuXHRcdFx0aWYgKHRleHQubWF0Y2goL1tcXC9cXFxcLiAtXS8pKSB7XG5cdFx0XHRcdHRleHQgPSB0ZXh0LnJlcGxhY2UoL1tcXC9cXFxcLiAtXS8sICcnKTtcblx0XHRcdFx0dGhpcy5zZXQodGV4dCk7XG5cdFx0XHRcdGlmICghdGhpcy5lbXB0eSAmJiB0aGlzLmluZGV4IDwgMikge1xuXHRcdFx0XHRcdHRoaXMuZG9iZmllbGQuZm9jdXNGaWVsZEFmdGVyKHRoaXMpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIEFkdmFuY2UgZm9jdXMgaWYgdGhpcyBmaWVsZCBpcyBib3RoIHZhbGlkIGFuZCBmdWxsXG5cdFx0XHRpZiAodGhpcy5kb2JmaWVsZC52YWxpZGF0ZSh0aGlzKSkge1xuXHRcdFx0XHRsZXQgd2FudCA9IHRoaXMubmFtZSA9PT0gJ3llYXInID8gNCA6IDI7XG5cdFx0XHRcdGlmICh0aGlzLmlzRGlnaXRLZXkoZSkgJiYgdGV4dC5sZW5ndGggPT09IHdhbnQpIHtcblx0XHRcdFx0XHR0aGlzLmRvYmZpZWxkLmZvY3VzRmllbGRBZnRlcih0aGlzKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGxlZnQoKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy4kaW5wdXQucG9zaXRpb24oKS5sZWZ0O1xuXHRcdH1cblxuXHRcdHNldChuZXdfdmFsdWUpIHtcblx0XHRcdHRoaXMuJGlucHV0LnZhbChuZXdfdmFsdWUpLnJlbW92ZUNsYXNzKCdoaW50Jyk7XG5cdFx0XHRpZiAoIXRoaXMuaGFzX2ZvY3VzKSB7XG5cdFx0XHRcdHRoaXMuc2hvd19oaW50KCk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLmVtcHR5ID0gbmV3X3ZhbHVlID09PSAnJztcblx0XHRcdHRoaXMuY2xlYXJFcnJvcigpO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fVxuXG5cdFx0c2V0RXJyb3IodGV4dCkge1xuXHRcdFx0dGhpcy5lcnJvcl90ZXh0ID0gdGV4dDtcblx0XHRcdHRoaXMuJGlucHV0LmFkZENsYXNzKCdlcnJvcicpO1xuXHRcdFx0dGhpcy5kb2JmaWVsZC5zaG93RXJyb3IoKTtcblx0XHR9XG5cblx0XHRzZXRGb2N1cyhzZWxlY3RfYWxsKSB7XG5cdFx0XHRsZXQgJGlucHV0ID0gdGhpcy4kaW5wdXQ7XG5cdFx0XHQkaW5wdXQuZm9jdXMoKTtcblx0XHRcdGlmIChzZWxlY3RfYWxsKSB7XG5cdFx0XHRcdCRpbnB1dC5zZWxlY3QoKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdCRpbnB1dC52YWwoJGlucHV0LnZhbCgpKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH1cblxuXHRcdHNldFdpZHRoKG5ld193aWR0aCkge1xuXHRcdFx0dGhpcy4kaW5wdXQud2lkdGgobmV3X3dpZHRoKTtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH1cblxuXHRcdHNob3dfaGludCgpIHtcblx0XHRcdGlmICh0aGlzLmdldCgpID09PSAnJyAmJiB0eXBlb2YgKHRoaXMuaGludF90ZXh0KSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdFx0dGhpcy4kaW5wdXQudmFsKHRoaXMuaGludF90ZXh0KS5hZGRDbGFzcygnaGludCcpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fVxuXG5cdFx0eWllbGRGb2N1cygpIHtcblx0XHRcdHRoaXMuJGlucHV0LmJsdXIoKTtcblx0XHR9XG5cdH1cblxuXHQkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG5cdFx0JCgnLmRvYmlzc3VlJykuZWFjaChmdW5jdGlvbiAoKSB7XG5cdFx0XHRteUtyRG9iRW50cnkgPSBuZXcgS3JEb2JFbnRyeSgkKHRoaXMpLCB7fSk7XG5cdFx0fSk7XG5cdH0pO1xufShqUXVlcnkpKTsiLCIvKipcbiAqIEBwYWNrYWdlICAgIEtub3cgUmVzZXJ2YXRpb25zXG4gKiBAc3VicGFja2FnZSBBZG1pbiBKU1xuICogQGNvcHlyaWdodCAgMjAyMCBIaWdobGFuZCBWaXNpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBAbGljZW5zZSAgICBTZWUgdGhlIGZpbGUgXCJMSUNFTlNFLnR4dFwiIGZvciB0aGUgZnVsbCBsaWNlbnNlIGdvdmVybmluZyB0aGlzIGNvZGUuXG4gKiBAYXV0aG9yICAgICBIYXplbCBXaWxzb24gPGhhemVsQGhpZ2hsYW5kdmlzaW9uLmNvbT5cbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgkKSB7XG5cdCQoZnVuY3Rpb24gKCkge1xuXHRcdGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaG93dG9hcnJpdmUnKSkge1xuXHRcdFx0Y29uc3QgaG93dG9hcnJpdmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaG93dG9hcnJpdmUnKTtcblx0XHRcdGxldCBhcnJpdmFsbWVhbnMgPSBob3d0b2Fycml2ZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtbWVhbnMnKTtcblx0XHRcdGlmICghYXJyaXZhbG1lYW5zKSB7XG5cdFx0XHRcdGFycml2YWxtZWFucyA9ICdhaXInO1xuXHRcdFx0fVxuXHRcdFx0ZGlzcGxheUFycml2YWwoYXJyaXZhbG1lYW5zKTtcblx0XHR9XG5cblx0XHQkKCdib2R5Jykub24oJ2NsaWNrJywgJy5hbWl0ZW0nLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0ZGlzcGxheUFycml2YWwoJCh0aGlzKS5hdHRyKCdpZCcpKTtcblx0XHR9KTtcblx0fSk7XG5cblx0ZnVuY3Rpb24gZGlzcGxheUFycml2YWwodmFsdWUpIHtcblx0XHRsZXQgeCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FtaXRlbScpO1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgeC5sZW5ndGg7IGkrKykge1xuXHRcdFx0eFtpXS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcblx0XHR9XG5cblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWlyLWRhdGEnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0cmFpbi1kYXRhJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXV0by1kYXRhJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3RoZXItZGF0YScpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cdFx0bGV0IGFycml2YWxkYXRhID0gdmFsdWUgKyAnLWRhdGEnO1xuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGFycml2YWxkYXRhKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh2YWx1ZSkuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2pmb3JtX2Fycml2YWxfbWVhbnMnKS52YWx1ZSA9IHZhbHVlO1xuXHR9XG59KShqUXVlcnkpOyIsIi8qKlxuICogQHBhY2thZ2UgICAgS25vdyBSZXNlcnZhdGlvbnNcbiAqIEBzdWJwYWNrYWdlIFNpdGUgSlNcbiAqIEBjb3B5cmlnaHQgIDIwMjAgSGlnaGxhbmQgVmlzaW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogQGxpY2Vuc2UgICAgU2VlIHRoZSBmaWxlIFwiTElDRU5TRS50eHRcIiBmb3IgdGhlIGZ1bGwgbGljZW5zZSBnb3Zlcm5pbmcgdGhpcyBjb2RlLlxuICogQGF1dGhvciAgICAgSGF6ZWwgV2lsc29uIDxoYXplbEBoaWdobGFuZHZpc2lvbi5jb20+XG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbmxldCBvdkNoaWxkcmVuLCBvdlN0YXRlID0gbnVsbCwgb3ZQcyA9IDAsICRvdkJ0bjtcbmxldCBmY0NoaWxkcmVuLCBmY1N0YXRlID0gbnVsbCwgJGZjQnRuO1xubGV0IHR0Q2hpbGRyZW4sIHR0U3RhdGUgPSBudWxsLCB0dFBzID0gMCwgJHR0QnRuLCB0dHBhcmFzO1xubGV0IGN1cnJlbnRQYXJhZ3JhcGgsIGhyRWxlbWVudDtcblxuKGZ1bmN0aW9uICgkKSB7XG5cdCQoZnVuY3Rpb24gKCkge1xuXHRcdG92Q2hpbGRyZW4gPSAkKCcucmVhZG1vcmUtb3ZlcnZpZXcnKS5jaGlsZHJlbigncCwgaDUsIHVsJyk7XG5cdFx0b3ZQcyA9IG92Q2hpbGRyZW4ubGVuZ3RoO1xuXHRcdGlmIChvdlBzID4gMykge1xuXHRcdFx0Ly9vdkNoaWxkcmVuLnNsaWNlKDMpLmhpZGUoKTtcblx0XHRcdG92Q2hpbGRyZW4uc2xpY2UoMykuZGlzcGxheSA9ICdub25lJztcblx0XHRcdG92Q2hpbGRyZW4uc2xpY2Uob3ZQcyAtIDEsIG92UHMpLmFmdGVyKCc8ZGl2IGNsYXNzPVwidGV4dC1jZW50ZXJcIj48YSBjbGFzcz1cImJ1dHRvbiBob2xsb3cnICtcblx0XHRcdFx0JyByZWFkbW9yZSBvdmVydmlldy10b2dnbGVcIj5SZWFkIG1vcmUuLi48L2E+PC9kaXY+Jyk7XG5cdFx0XHRvdlN0YXRlID0gJ2hpZGRlbic7XG5cdFx0fVxuXG5cdFx0dHRDaGlsZHJlbiA9ICQoJy5yZWFkbW9yZS10ZXN0aW1vbmlhbHMnKS5jaGlsZHJlbigncCcpO1xuXHRcdHR0UHMgPSB0dENoaWxkcmVuLmxlbmd0aDtcblx0XHRpZiAodHRQcyA+IDEwKSB7XG5cdFx0XHQvL3R0Q2hpbGRyZW4uc2xpY2UoMTEpLmhpZGUoKTtcblx0XHRcdHR0Q2hpbGRyZW4uc2xpY2UoMTEpLmRpc3BsYXkgPSAnbm9uZSc7XG5cdFx0XHR0dHBhcmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnJlYWRtb3JlLXRlc3RpbW9uaWFscyBwW3N0eWxlKj1cImRpc3BsYXk6IG5vbmVcIl0nKTtcblx0XHRcdGRvSFJzKHR0cGFyYXMsICdoaWRlJyk7XG5cdFx0XHR0dENoaWxkcmVuLnNsaWNlKHR0UHMgLSAxLCB0dFBzKS5hZnRlcignPGEgY2xhc3M9XCJidXR0b24gaG9sbG93JyArXG5cdFx0XHRcdCcgYWNjZW50IHJlYWRtb3JlIHRlc3RpbW9uaWFscy10b2dnbGVcIj5SZWFkIG1vcmUuLi48L2E+Jyk7XG5cdFx0XHR0dFN0YXRlID0gJ2hpZGRlbic7XG5cdFx0fVxuXG5cdFx0ZmNDaGlsZHJlbiA9ICQoJy5yZWFkbW9yZS1mYWNpbGl0aWVzJykuY2hpbGRyZW4oJy5yb29tcycpO1xuXHRcdGlmIChmY0NoaWxkcmVuLmxlbmd0aCkge1xuXHRcdFx0ZmNDaGlsZHJlbi5oaWRlKCkuYWZ0ZXIoJzxhIGNsYXNzPVwiYnV0dG9uIGhvbGxvdycgK1xuXHRcdFx0XHQnIGFjY2VudCByZWFkbW9yZSBmYWNpbGl0aWVzLXRvZ2dsZVwiPlNlZSBhbGwgZmFjaWxpdGllcy4uLjwvYT4nKTtcblx0XHRcdGZjU3RhdGUgPSAnaGlkZGVuJztcblx0XHR9XG5cblx0XHQkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLnJlYWRtb3JlLm92ZXJ2aWV3LXRvZ2dsZScsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHQkb3ZCdG4gPSAkKFwiLm92ZXJ2aWV3LXRvZ2dsZVwiKTtcblx0XHRcdGlmIChvdlN0YXRlID09PSAndmlzaWJsZScpIHtcblx0XHRcdFx0b3ZDaGlsZHJlbi5zbGljZSgzKS5oaWRlKCk7XG5cdFx0XHRcdCRvdkJ0bi5hdHRyKCd2YWx1ZScsICdSZWFkIG1vcmUnKTtcblx0XHRcdFx0JG92QnRuLnRleHQoXCJSZWFkIG1vcmUuLi5cIik7XG5cdFx0XHRcdG92U3RhdGUgPSAnaGlkZGVuJztcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmIChvdlN0YXRlID09PSAnaGlkZGVuJykge1xuXHRcdFx0XHRcdCQoJy5yZWFkbW9yZS1vdmVydmlldycpLmZpbmQoJzpoaWRkZW4nKS5zaG93KCk7XG5cdFx0XHRcdFx0JG92QnRuLmF0dHIoJ3ZhbHVlJywgJ1JlYWQgbGVzcycpO1xuXHRcdFx0XHRcdCRvdkJ0bi50ZXh0KFwiUmVhZCBsZXNzLi4uXCIpO1xuXHRcdFx0XHRcdG92U3RhdGUgPSAndmlzaWJsZSc7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdCQoJy5wcm9wZXJ0eS1tZW51JykuZm91bmRhdGlvbignY2FsY1BvaW50cycpO1xuXHRcdFx0JCgnLnN0aWNreScpLmZvdW5kYXRpb24oJ19jYWxjJywgdHJ1ZSk7XG5cdFx0fSkub24oJ2NsaWNrJywgJy5yZWFkbW9yZS50ZXN0aW1vbmlhbHMtdG9nZ2xlJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdCR0dEJ0biA9ICQoXCIudGVzdGltb25pYWxzLXRvZ2dsZVwiKTtcblx0XHRcdGlmICh0dFN0YXRlID09PSAndmlzaWJsZScpIHtcblx0XHRcdFx0dHRDaGlsZHJlbi5zbGljZSgxMSkuaGlkZSgpO1xuXHRcdFx0XHRkb0hScyh0dHBhcmFzLCAnaGlkZScpO1xuXHRcdFx0XHQkdHRCdG4uYXR0cigndmFsdWUnLCAnUmVhZCBtb3JlJyk7XG5cdFx0XHRcdCR0dEJ0bi50ZXh0KFwiUmVhZCBtb3JlLi4uXCIpO1xuXHRcdFx0XHR0dFN0YXRlID0gJ2hpZGRlbic7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAodHRTdGF0ZSA9PT0gJ2hpZGRlbicpIHtcblx0XHRcdFx0XHQkKCcucmVhZG1vcmUtdGVzdGltb25pYWxzIHAnKS5zaG93KCk7XG5cdFx0XHRcdFx0ZG9IUnModHRwYXJhcywgJ3Nob3cnKTtcblx0XHRcdFx0XHQkdHRCdG4uYXR0cigndmFsdWUnLCAnUmVhZCBsZXNzJyk7XG5cdFx0XHRcdFx0JHR0QnRuLnRleHQoXCJSZWFkIGxlc3MuLi5cIik7XG5cdFx0XHRcdFx0dHRTdGF0ZSA9ICd2aXNpYmxlJztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0JCgnLnByb3BlcnR5LW1lbnUnKS5mb3VuZGF0aW9uKCdjYWxjUG9pbnRzJyk7XG5cdFx0XHQkKCcuc3RpY2t5JykuZm91bmRhdGlvbignX2NhbGMnLCB0cnVlKTtcblx0XHR9KS5vbignY2xpY2snLCAnLnJlYWRtb3JlLmZhY2lsaXRpZXMtdG9nZ2xlJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdCRmY0J0biA9ICQoXCIuZmFjaWxpdGllcy10b2dnbGVcIik7XG5cdFx0XHRpZiAoZmNTdGF0ZSA9PT0gJ3Zpc2libGUnKSB7XG5cdFx0XHRcdCQoJy5yZWFkbW9yZS1mYWNpbGl0aWVzIC5yb29tcycpLmhpZGUoKTtcblx0XHRcdFx0JGZjQnRuLmF0dHIoJ3ZhbHVlJywgJ1NlZSBhbGwgZmFjaWxpdGllcycpO1xuXHRcdFx0XHQkZmNCdG4udGV4dChcIlNlZSBhbGwgZmFjaWxpdGllcy4uLlwiKTtcblx0XHRcdFx0ZmNTdGF0ZSA9ICdoaWRkZW4nO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKGZjU3RhdGUgPT09ICdoaWRkZW4nKSB7XG5cdFx0XHRcdFx0JCgnLnJlYWRtb3JlLWZhY2lsaXRpZXMgLnJvb21zJykuc2hvdygpO1xuXHRcdFx0XHRcdCRmY0J0bi5hdHRyKCd2YWx1ZScsICdIaWRlIGFsbCBmYWNpbGl0aWVzJyk7XG5cdFx0XHRcdFx0JGZjQnRuLnRleHQoXCJIaWRlIGFsbCBmYWNpbGl0aWVzLi4uXCIpO1xuXHRcdFx0XHRcdGZjU3RhdGUgPSAndmlzaWJsZSc7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdCQoJy5wcm9wZXJ0eS1tZW51JykuZm91bmRhdGlvbignY2FsY1BvaW50cycpO1xuXHRcdFx0JCgnLnN0aWNreScpLmZvdW5kYXRpb24oJ19jYWxjJywgdHJ1ZSk7XG5cdFx0fSk7XG5cdH0pO1xufShqUXVlcnkpKTtcblxuZnVuY3Rpb24gZG9IUnMocGFyYWdyYXBocywgdHlwZSkge1xuXHRmb3IgKGxldCBpID0gMDsgaSA8IHBhcmFncmFwaHMubGVuZ3RoOyBpKyspIHtcblx0XHRjdXJyZW50UGFyYWdyYXBoID0gcGFyYWdyYXBoc1tpXTtcblx0XHRockVsZW1lbnQgPSBjdXJyZW50UGFyYWdyYXBoLm5leHRFbGVtZW50U2libGluZztcblx0XHRpZiAoaHJFbGVtZW50ICYmIGhyRWxlbWVudC50YWdOYW1lID09PSAnSFInKSB7XG5cdFx0XHRpZiAodHlwZSA9PT0gJ2hpZGUnKSB7XG5cdFx0XHRcdGhyRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aHJFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufSIsIi8qKlxuICogQHBhY2thZ2UgICAgS25vdyBSZXNlcnZhdGlvbnNcbiAqIEBzdWJwYWNrYWdlIFNpdGUgSlNcbiAqIEBjb3B5cmlnaHQgIDIwMjAgSGlnaGxhbmQgVmlzaW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogQGxpY2Vuc2UgICAgU2VlIHRoZSBmaWxlIFwiTElDRU5TRS50eHRcIiBmb3IgdGhlIGZ1bGwgbGljZW5zZSBnb3Zlcm5pbmcgdGhpcyBjb2RlLlxuICogQGF1dGhvciAgICAgSGF6ZWwgV2lsc29uIDxoYXplbEBoaWdobGFuZHZpc2lvbi5jb20+XG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IGxhbmcgPSBcImVuXCI7XG5cbihmdW5jdGlvbiAoJCkge1xuXHRjb25zdCBtYXJrZXJzaGFwZSA9IHtcblx0XHR0eXBlOiAncG9seScsXG5cdFx0Y29vcmRzOiBbMSwgMSwgMSwgMzIsIDM3LCAzMiwgMzIsIDFdXG5cdH07XG5cblx0bGV0IG15S3JtYXA7XG5cdGxldCBtYXBEYXRhID0gZmFsc2U7XG5cdGxldCBtYXA7XG5cdGxldCBpbmZvV2luZG93O1xuXHRsZXQgaW5mb1dpbmRvdzI7XG5cdGxldCBib3VuZHM7XG5cdGxldCBwcm9wZXJ0eWRpdjtcblx0bGV0IHByb3BlcnR5aWNvbjtcblx0bGV0IG1jO1xuXG5cdGxldCBzZXR0aW5ncyA9IHtcblx0XHRwcm9wZXJ0eU1hcmtlcnM6IFtdLFxuXHRcdGZpbHRlcklkczogW10sXG5cdFx0bWFwTWFya2VyczogW10sXG5cdFx0bWFwVHlwZUlkOiAnJyxcblx0XHRtYXBab29tOiAxMixcblx0XHRtYXBNYXhab29tOiAyMCxcblx0XHRtYXBUeXBlOiAnJyxcblx0XHRtYXBJZDogJycsXG5cdFx0bWFya2VyQ29sb3I6ICdyZWQnLFxuXHR9O1xuXG5cdGNsYXNzIEtybWFwIHtcblx0XHRjb25zdHJ1Y3RvcihzZXR0aW5ncykge1xuXHRcdFx0dGhpcy5zZXR0aW5ncyA9IHNldHRpbmdzO1xuXHRcdFx0Ly9Jbml0aWFsaXNlIG1hcCBvcHRpb25zXG5cdFx0XHR0aGlzLmdtT3B0aW9ucyA9IHtcblx0XHRcdFx0c2Nyb2xsd2hlZWw6IGZhbHNlLFxuXHRcdFx0XHR6b29tOiB0aGlzLnNldHRpbmdzLm1hcFpvb20sXG5cdFx0XHRcdG1heFpvb206IHRoaXMuc2V0dGluZ3MubWFwTWF4Wm9vbSxcblx0XHRcdFx0bWFwVHlwZUlkOiB0aGlzLnNldHRpbmdzLm1hcFR5cGVJZCxcblx0XHRcdFx0c3RyZWV0Vmlld0NvbnRyb2w6IGZhbHNlXG5cdFx0XHR9O1xuXG5cdFx0XHR0aGlzLmdtYXJrZXJzID0gW107XG5cdFx0XHR0aGlzLmNvdW50ID0gMDtcblx0XHRcdHRoaXMuaW5pdE1hcCgpO1xuXHRcdH1cblxuXHRcdHN0YXRpYyBjbG9zZUtySW5mb3dpbmRvdygpIHtcblx0XHRcdCQoJyNrci1pbmZvd2luZG93JykuaGlkZSgpO1xuXHRcdFx0aW5mb1dpbmRvdy5jbG9zZSgpO1xuXHRcdFx0aW5mb1dpbmRvdzIuY2xvc2UoKTtcblx0XHR9XG5cblx0XHQvLyBvbmx5IHNob3cgdmlzaWJsZSBtYXJrZXJzXG5cdFx0c3RhdGljIHNob3dWaXNpYmxlTWFya2VycyhtYXJrZXJzKSB7XG5cdFx0XHRsZXQgYm91bmRzID0gbWFwLmdldEJvdW5kcygpO1xuXHRcdFx0bGV0IGNvdW50ID0gMDtcblxuXHRcdFx0Zm9yIChsZXQgZCA9IDA7IGQgPCBtYXJrZXJzLmxlbmd0aDsgZCsrKSB7XG5cdFx0XHRcdGxldCBtYXJrZXIgPSBtYXJrZXJzW2RdO1xuXHRcdFx0XHRpZiAobWFya2VyLnR5cGUgPT09ICdtYXAnKSB7XG5cdFx0XHRcdFx0aWYgKGJvdW5kcy5jb250YWlucyhtYXJrZXIuZ2V0UG9zaXRpb24oKSkgPT09IHRydWUpIHtcblx0XHRcdFx0XHRcdG1hcmtlci5zZXRWaXNpYmxlKHRydWUpO1xuXHRcdFx0XHRcdFx0Y291bnQrKztcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0bWFya2VyLnNldFZpc2libGUoZmFsc2UpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gY291bnQ7XG5cdFx0fVxuXG5cdFx0Ly8gQ2hlY2sgTWFya2VycyBhcnJheSBmb3IgZHVwbGljYXRlIHBvc2l0aW9uIGFuZCBvZmZzZXQgYSBsaXR0bGVcblx0XHRjaGVja0R1cGxpY2F0ZShjdXJyZW50KSB7XG5cdFx0XHRpZiAodGhpcy5nbWFya2Vycy5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdGxldCBkdXBzID0gMDtcblx0XHRcdFx0Zm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuZ21hcmtlcnMubGVuZ3RoOyBpbmRleCsrKSB7XG5cdFx0XHRcdFx0bGV0IHBvcyA9IHRoaXMuZ21hcmtlcnNbaW5kZXhdLmdldFBvc2l0aW9uKCk7XG5cdFx0XHRcdFx0aWYgKGN1cnJlbnQuZXF1YWxzKHBvcykpIHtcblx0XHRcdFx0XHRcdGR1cHMrKztcblx0XHRcdFx0XHRcdGxldCBhID0gMzYwLjAgLyBkdXBzO1xuXHRcdFx0XHRcdFx0bGV0IG5ld0xhdCA9IHBvcy5sYXQoKSArIC0wLjAwMDAyICogTWF0aC5jb3MoKCthICogZHVwcykgLyAxODAgKiBNYXRoLlBJKTsgIC8veFxuXHRcdFx0XHRcdFx0bGV0IG5ld0xuZyA9IHBvcy5sbmcoKSArIC0wLjAwMDAwICogTWF0aC5zaW4oKCthICogZHVwcykgLyAxODAgKiBNYXRoLlBJKTsgIC8vWVxuXHRcdFx0XHRcdFx0Y3VycmVudCA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmcobmV3TGF0LCBuZXdMbmcpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gY3VycmVudDtcblx0XHR9XG5cblx0XHRjbHVzdGVyTWFwKCkge1xuXHRcdFx0Y29uc3QgbWNPcHRpb25zID0ge1xuXHRcdFx0XHRncmlkU2l6ZTogNTAsXG5cdFx0XHRcdGlnbm9yZUhpZGRlbk1hcmtlcnM6IHRydWUsXG5cdFx0XHRcdGltYWdlUGF0aDogJy9tZWRpYS9jb21fa25vd3Jlcy9pbWFnZXMvbWFya2VyY2x1c3RlcmVyL20nXG5cdFx0XHR9O1xuXG5cdFx0XHRtYXAubWF4RGVmYXVsdFpvb20gPSB0aGlzLnNldHRpbmdzLm1hcFpvb207XG5cdFx0XHRpZiAodGhpcy5zZXR0aW5ncy5tYXBab29tID4gMCkge1xuXHRcdFx0XHRnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lck9uY2UobWFwLCBcImJvdW5kc19jaGFuZ2VkXCIsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHR0aGlzLnNldFpvb20oTWF0aC5taW4odGhpcy5nZXRab29tKCksIHRoaXMubWF4RGVmYXVsdFpvb20pKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuc2V0UHJvcGVydHlNYXJrZXJzKCk7XG5cdFx0XHR0aGlzLnNldE1hcE1hcmtlcnMoKTtcblxuXHRcdFx0Zm9yIChsZXQgZCA9IDA7IGQgPCB0aGlzLmdtYXJrZXJzLmxlbmd0aDsgZCsrKSB7XG5cdFx0XHRcdGxldCBtYXJrZXIgPSB0aGlzLmdtYXJrZXJzW2RdO1xuXHRcdFx0XHRpZiAobWFya2VyLnR5cGUgPT09ICdwcm9wZXJ0eScpIHtcblx0XHRcdFx0XHRpZiAodGhpcy5zZXR0aW5ncy5maWx0ZXJJZHMuaW5jbHVkZXMobWFya2VyLnBpZCkpIHtcblx0XHRcdFx0XHRcdG1hcmtlci5zZXRWaXNpYmxlKHRydWUpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRtYXJrZXIuc2V0VmlzaWJsZShmYWxzZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdG1jID0gbmV3IE1hcmtlckNsdXN0ZXJlcihtYXAsIHRoaXMuZ21hcmtlcnMsIG1jT3B0aW9ucyk7XG5cdFx0XHRnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYywgXCJjbHVzdGVyY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHQkKCcja3ItaW5mb3dpbmRvdycpLmhpZGUoKTtcblx0XHRcdFx0aW5mb1dpbmRvdy5jbG9zZSgpO1xuXHRcdFx0fSk7XG5cblx0XHRcdG1hcC5maXRCb3VuZHMoYm91bmRzKTtcblx0XHRcdG1hcC5zZXRDZW50ZXIoYm91bmRzLmdldENlbnRlcigpKTtcblx0XHR9XG5cblx0XHQvLyBDcmVhdGUgdGhlIE1hcFxuXHRcdGNyZWF0ZU1hcCgpIHtcblx0XHRcdG1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5zZXR0aW5ncy5tYXBJZCksIHRoaXMuZ21PcHRpb25zKTtcblx0XHRcdGluZm9XaW5kb3cgPSBuZXcgZ29vZ2xlLm1hcHMuSW5mb1dpbmRvdygpO1xuXHRcdFx0aW5mb1dpbmRvdzIgPSBuZXcgZ29vZ2xlLm1hcHMuSW5mb1dpbmRvdygpO1xuXHRcdFx0Ym91bmRzID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZ0JvdW5kcygpO1xuXHRcdH1cblxuXHRcdC8vIENyZWF0ZSB0aGUgbWFya2VyIGFuZCBzZXQgdXAgdGhlIGV2ZW50IHdpbmRvd1xuXHRcdGNyZWF0ZU1hcE1hcmtlcihwb2ludCwgaHRtbCwgaW1hZ2UsIGJveGluZm8sIGxpbmssIHRpdGxlKSB7XG5cdFx0XHRsZXQgbWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XG5cdFx0XHRcdHNoYXBlOiBtYXJrZXJzaGFwZSxcblx0XHRcdFx0bGluazogbGluayxcblx0XHRcdFx0aWNvbjogaW1hZ2UsXG5cdFx0XHRcdHBvc2l0aW9uOiBwb2ludCxcblx0XHRcdFx0dGl0bGU6IHRpdGxlLFxuXHRcdFx0XHRtYXA6IG1hcCxcblx0XHRcdFx0ekluZGV4OiA5OTlcblx0XHRcdH0pO1xuXG5cdFx0XHRnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYXJrZXIsICdtb3VzZW92ZXInLCAoZnVuY3Rpb24gKGh0bWwpIHtcblx0XHRcdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRpbmZvV2luZG93Mi5zZXRDb250ZW50KGh0bWwpO1xuXHRcdFx0XHRcdGluZm9XaW5kb3cyLm9wZW4obWFwLCBtYXJrZXIpO1xuXHRcdFx0XHR9O1xuXHRcdFx0fSkoaHRtbCkpO1xuXG5cdFx0XHRnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYXJrZXIsICdtb3VzZW91dCcsIChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0aW5mb1dpbmRvdzIuY2xvc2UoKTtcblx0XHRcdFx0fTtcblx0XHRcdH0pKCkpO1xuXG5cdFx0XHRnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYXJrZXIsICdjbG9zZWNsaWNrJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRpbmZvV2luZG93Mi5jbG9zZSgpO1xuXHRcdFx0fSk7XG5cblx0XHRcdHRoaXMuZ21hcmtlcnMucHVzaChtYXJrZXIpO1xuXG5cdFx0XHR0aGlzLmNvdW50Kys7XG5cdFx0fVxuXG5cdFx0Y3JlYXRlUHJvcGVydHlNYXJrZXIocG9pbnQsIGh0bWwsIGJveGluZm8sIGxpbmssIHRpdGxlLCBjb2xvciwgaWQsIGltYWdlLCBwaWQpIHtcblx0XHRcdGxldCBtYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcblx0XHRcdFx0cG9zaXRpb246IHBvaW50LFxuXHRcdFx0XHRsaW5rOiBsaW5rLFxuXHRcdFx0XHRtYXA6IG1hcCxcblx0XHRcdFx0aWNvbjogaW1hZ2UsXG5cdFx0XHRcdHRpdGxlOiB0aXRsZSxcblx0XHRcdFx0cGlkOiBwaWQsXG5cdFx0XHRcdHR5cGU6ICdwcm9wZXJ0eScsXG5cdFx0XHRcdHpJbmRleDogdGhpcy5jb3VudCArIDEwMDBcblx0XHRcdH0pO1xuXG5cdFx0XHRwcm9wZXJ0eWRpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcblx0XHRcdG1hcmtlci5hZGRMaXN0ZW5lcignbW91c2Vkb3duJywgKGZ1bmN0aW9uIChib3hpbmZvKSB7XG5cdFx0XHRcdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0aW5mb1dpbmRvdy5jbG9zZSgpO1xuXHRcdFx0XHRcdCQoJyNrci1pbmZvd2luZG93JykuaGlkZSgpO1xuXHRcdFx0XHRcdGluZm9XaW5kb3cuc2V0Q29udGVudChodG1sKTtcblx0XHRcdFx0XHRpbmZvV2luZG93Lm9wZW4obWFwLCBtYXJrZXIpO1xuXG5cdFx0XHRcdFx0JC5hamF4KHtcblx0XHRcdFx0XHRcdHR5cGU6IFwiUE9TVFwiLFxuXHRcdFx0XHRcdFx0dXJsOiAnL2luZGV4LnBocD9vcHRpb249Y29tX2tub3dyZXMmdGFzaz1wcm9wZXJ0eS5tYXBpbmZvd2luZG93Jyxcblx0XHRcdFx0XHRcdGRhdGE6IHtcblx0XHRcdFx0XHRcdFx0aWQ6IHBhcnNlSW50KGJveGluZm8pXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0c3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcblx0XHRcdFx0XHRcdFx0JCgnI2tyLWluZm93aW5kb3cnKS5mYWRlSW4oNDAwKS5odG1sKGRhdGEpLnNob3coKTtcblx0XHRcdFx0XHRcdFx0JChcIi5rci1pbmZvd2luZG93LXNsaWRlc2hvd1wiKS5ub3QoJy5zbGljay1pbml0aWFsaXplZCcpLnNsaWNrKHtcblx0XHRcdFx0XHRcdFx0XHRuZXh0QXJyb3c6ICc8aSBjbGFzcz1cInNsaWNrLW5hdiBuZXh0IGZhLXNvbGlkIGZhLWNoZXZyb24tcmlnaHQgXCI+PC9pPicsXG5cdFx0XHRcdFx0XHRcdFx0cHJldkFycm93OiAnPGkgY2xhc3M9XCJzbGljay1uYXYgcHJldiBmYS1zb2xpZCBmYS1jaGV2cm9uLWxlZnQgXCI+PC9pPicsXG5cdFx0XHRcdFx0XHRcdFx0YXV0b3BsYXk6IHRydWVcblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH07XG5cdFx0XHR9KShib3hpbmZvKSk7XG5cblx0XHRcdGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKG1hcmtlciwgJ2Nsb3NlY2xpY2snLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdCQoJyNrci1pbmZvd2luZG93JykuaGlkZSgpO1xuXHRcdFx0XHRpbmZvV2luZG93LmNsb3NlKCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0dGhpcy5nbWFya2Vycy5wdXNoKG1hcmtlcik7XG5cdFx0XHRib3VuZHMuZXh0ZW5kKHBvaW50KTtcblxuXHRcdFx0dGhpcy5jb3VudCsrO1xuXHRcdH1cblxuXHRcdC8vSW5pdGlhbGlzZSBtYXBcblx0XHRpbml0TWFwKCkge1xuXHRcdFx0dGhpcy5jcmVhdGVNYXAoKTtcblx0XHRcdGlmICh0aGlzLnNldHRpbmdzLm1hcFR5cGUgPT09ICdjbHVzdGVyJykge1xuXHRcdFx0XHR0aGlzLmNsdXN0ZXJNYXAoKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuc29sb01hcCgpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIFJlc2V0IG1hcCB0byBpbml0aWFsIHN0YXRlXG5cdFx0cmVmcmVzaE1hcCgkbWFwbW9kYWwpIHtcblx0XHRcdGlmICh0aGlzLnNldHRpbmdzLm1hcFR5cGUgPT09ICdzb2xvJykge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGxldCBzZWxmID0gdGhpcztcblx0XHRcdGpRdWVyeS5hamF4KHtcblx0XHRcdFx0dXJsOiAnL2luZGV4LnBocD9vcHRpb249Y29tX2tub3dyZXMmdGFzaz1wcm9wZXJ0aWVzLnJlZnJlc2htYXAnLFxuXHRcdFx0XHR0eXBlOiAnUE9TVCcsXG5cdFx0XHRcdGRhdGFUeXBlOiAnanNvbicsXG5cdFx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXN1bHQpIHtcblx0XHRcdFx0XHRpZiAocmVzdWx0LnN1Y2Nlc3MpIHtcblx0XHRcdFx0XHRcdHNlbGYuc2V0dGluZ3MuZmlsdGVySWRzID0gcmVzdWx0LmRhdGEuZmlsdGVySWRzO1xuXHRcdFx0XHRcdFx0Zm9yIChsZXQgZCA9IDA7IGQgPCBzZWxmLmdtYXJrZXJzLmxlbmd0aDsgZCsrKSB7XG5cdFx0XHRcdFx0XHRcdGxldCBtYXJrZXIgPSBzZWxmLmdtYXJrZXJzW2RdO1xuXHRcdFx0XHRcdFx0XHRpZiAobWFya2VyLnR5cGUgPT09ICdwcm9wZXJ0eScpIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoc2VsZi5zZXR0aW5ncy5maWx0ZXJJZHMuaW5jbHVkZXMobWFya2VyLnBpZCkpIHtcblx0XHRcdFx0XHRcdFx0XHRcdG1hcmtlci5zZXRWaXNpYmxlKHRydWUpO1xuXHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRtYXJrZXIuc2V0VmlzaWJsZShmYWxzZSk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdG1jLnJlcGFpbnQoKTtcblx0XHRcdFx0XHRcdG5ldyBGb3VuZGF0aW9uLlJldmVhbCgkbWFwbW9kYWwpO1xuXHRcdFx0XHRcdFx0JG1hcG1vZGFsLmZvdW5kYXRpb24oJ29wZW4nKTtcblx0XHRcdFx0XHRcdGdvb2dsZS5tYXBzLmV2ZW50LnRyaWdnZXIobWFwLCAncmVzaXplJyk7XG5cdFx0XHRcdFx0XHQkbWFwbW9kYWwuZm91bmRhdGlvbignb3BlbicpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHR3aW5kb3cuYWxlcnQocmVzdWx0Lm1lc3NhZ2UpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0Ly8gUmVzZXQgbWFwIHRvIGluaXRpYWwgc3RhdGVcblx0XHRyZXNldE1hcCgpIHtcblx0XHRcdGluZm9XaW5kb3cuY2xvc2UoKTtcblx0XHRcdGluZm9XaW5kb3cyLmNsb3NlKCk7XG5cdFx0XHQkKCcja3ItaW5mb3dpbmRvdycpLmhpZGUoKTtcblx0XHRcdG1hcC5maXRCb3VuZHMoYm91bmRzKTtcblx0XHRcdG1hcC5zZXRDZW50ZXIoYm91bmRzLmdldENlbnRlcigpKTtcblx0XHR9XG5cblx0XHQvLyBsb29wIHRvIHNldCBtYXAgbWFya2Vyc1xuXHRcdHNldE1hcE1hcmtlcnMoKSB7XG5cdFx0XHRsZXQgcG9pbnQ7XG5cdFx0XHRsZXQgYW1hcms7XG5cblx0XHRcdGZvciAobGV0IGQgPSAwOyBkIDwgdGhpcy5zZXR0aW5ncy5tYXBNYXJrZXJzLmxlbmd0aDsgZCsrKSB7XG5cdFx0XHRcdGFtYXJrID0gdGhpcy5zZXR0aW5ncy5tYXBNYXJrZXJzW2RdO1xuXHRcdFx0XHRsZXQgbWFya2VyaWNvbiA9IHtcblx0XHRcdFx0XHR1cmw6IGFtYXJrWydpY29uJ10sXG5cdFx0XHRcdFx0c2l6ZTogbmV3IGdvb2dsZS5tYXBzLlNpemUoMzIsIDM3KSxcblx0XHRcdFx0XHQvLyBPUiBzY2FsZWRTaXplOiBuZXcgZ29vZ2xlLm1hcHMuU2l6ZSg0MCwgNDcpXG5cdFx0XHRcdFx0b3JpZ2luOiBuZXcgZ29vZ2xlLm1hcHMuUG9pbnQoMCwgMCksXG5cdFx0XHRcdFx0YW5jaG9yOiBuZXcgZ29vZ2xlLm1hcHMuUG9pbnQoMCwgMTgpXG5cdFx0XHRcdH07XG5cblx0XHRcdFx0cG9pbnQgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKGFtYXJrWydsYXQnXSwgYW1hcmtbJ2xuZyddKTtcblx0XHRcdFx0cG9pbnQgPSB0aGlzLmNoZWNrRHVwbGljYXRlKHBvaW50KTtcblx0XHRcdFx0dGhpcy5jcmVhdGVNYXBNYXJrZXIocG9pbnQsIGFtYXJrWydodG1sJ10sIG1hcmtlcmljb24sICcnLCAnJywgYW1hcmtbJ3RpdGxlJ10pO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIGxvb3AgdG8gc2V0IHByb3BlcnR5IG1hcmtlcnNcblx0XHRzZXRQcm9wZXJ0eU1hcmtlcnMoKSB7XG5cdFx0XHRsZXQgcG9pbnQ7XG5cdFx0XHRsZXQgYW1hcms7XG5cblx0XHRcdGZvciAobGV0IGQgPSAwOyBkIDwgdGhpcy5zZXR0aW5ncy5wcm9wZXJ0eU1hcmtlcnMubGVuZ3RoOyBkKyspIHtcblx0XHRcdFx0YW1hcmsgPSB0aGlzLnNldHRpbmdzLnByb3BlcnR5TWFya2Vyc1tkXTtcblx0XHRcdFx0aWYgKCFkKSB7XG5cdFx0XHRcdFx0cHJvcGVydHlpY29uID0ge1xuXHRcdFx0XHRcdFx0dXJsOiBhbWFya1snaWNvbiddLFxuXHRcdFx0XHRcdFx0c2l6ZTogbmV3IGdvb2dsZS5tYXBzLlNpemUoMzIsIDM3KSxcblx0XHRcdFx0XHRcdG9yaWdpbjogbmV3IGdvb2dsZS5tYXBzLlBvaW50KDAsIDApLFxuXHRcdFx0XHRcdFx0YW5jaG9yOiBuZXcgZ29vZ2xlLm1hcHMuUG9pbnQoMCwgMjApXG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHBvaW50ID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhhbWFya1snbGF0J10sIGFtYXJrWydsbmcnXSk7XG5cdFx0XHRcdHBvaW50ID0gdGhpcy5jaGVja0R1cGxpY2F0ZShwb2ludCk7XG5cdFx0XHRcdHRoaXMuY3JlYXRlUHJvcGVydHlNYXJrZXIocG9pbnQsIGFtYXJrWydodG1sJ10sIGFtYXJrWydib3hpbmZvJ10sIGFtYXJrWydsaW5rJ10sIGFtYXJrWyd0aXRsZSddLFxuXHRcdFx0XHRcdGFtYXJrWydjb2xvciddLCBhbWFya1snaWQnXSwgcHJvcGVydHlpY29uLCBhbWFya1sncGlkJ10pO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHNvbG9NYXAoKSB7XG5cdFx0XHR0aGlzLnNldFByb3BlcnR5TWFya2VycygpO1xuXHRcdFx0dGhpcy5zZXRNYXBNYXJrZXJzKCk7XG5cblx0XHRcdG1hcC5maXRCb3VuZHMoYm91bmRzKTtcblx0XHRcdG1hcC5zZXRDZW50ZXIoYm91bmRzLmdldENlbnRlcigpKTtcblxuXHRcdFx0aWYgKHRoaXMuc2V0dGluZ3MubWFwTWFya2Vycy5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdGNvbnN0IHNlbGYgPSB0aGlzO1xuXG5cdFx0XHRcdGxldCBteUxpc3RlbmVyID0gZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIobWFwLCAnaWRsZScsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRsZXQgZm91bmQgPSAwO1xuXHRcdFx0XHRcdGxldCBjdXJyZW50Wm9vbSA9IG1hcC5nZXRab29tKCk7XG5cdFx0XHRcdFx0d2hpbGUgKCFmb3VuZCkge1xuXHRcdFx0XHRcdFx0Zm91bmQgPSBLcm1hcC5zaG93VmlzaWJsZU1hcmtlcnMoc2VsZi5nbWFya2Vycyk7XG5cdFx0XHRcdFx0XHRpZiAoZm91bmQpIHtcblx0XHRcdFx0XHRcdFx0bXlMaXN0ZW5lci5yZW1vdmUoKTtcblx0XHRcdFx0XHRcdFx0bWFwLnNldFpvb20oY3VycmVudFpvb20pO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGN1cnJlbnRab29tID0gY3VycmVudFpvb20gLSAxO1xuXHRcdFx0XHRcdFx0aWYgKGN1cnJlbnRab29tIDwgMTApIHtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQkKGZ1bmN0aW9uICgpIHtcblx0XHRsZXQgJG1hcG1vZGFsO1xuXG5cdFx0JCgnYm9keScpLm9uKCdjbGljaycsICcubWFwLXRyaWdnZXInLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0aWYgKG1hcERhdGEpIHtcblx0XHRcdFx0bXlLcm1hcC5yZWZyZXNoTWFwKCRtYXBtb2RhbCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRraWNrTWFwKCQodGhpcykpO1xuXHRcdFx0XHQkbWFwbW9kYWwgPSAkKCcja3Itc2VhcmNoLW1hcC1tb2RhbCcpO1xuXHRcdFx0XHRpZiAoJG1hcG1vZGFsLmxlbmd0aCkge1xuXHRcdFx0XHRcdCRtYXBtb2RhbC5mb3VuZGF0aW9uKCdvcGVuJyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KS5vbignY2xpY2snLCAnLnJlc2V0bWFwJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdG15S3JtYXAucmVzZXRNYXAoKTtcblx0XHR9KS5vbignY2xpY2snLCAnI2tyLXNlYXJjaC1tYXAtZnVsbC1pbmZvd2luZG93LWNsb3NlJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdEtybWFwLmNsb3NlS3JJbmZvd2luZG93KCk7XG5cdFx0fSkub24oJ2NsaWNrJywgJy5jbG9zZW1hcCcsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHQkbWFwbW9kYWwuZm91bmRhdGlvbignY2xvc2UnKTtcblx0XHRcdCQuYWpheCh7XG5cdFx0XHRcdHR5cGU6IFwiUE9TVFwiLFxuXHRcdFx0XHR1cmw6ICcvaW5kZXgucGhwP29wdGlvbj1jb21fa25vd3JlcyZ0YXNrPXByb3BlcnRpZXMubWFwc2Vzc2lvbicsXG5cdFx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHQkKCcua3Itc2VhcmNoYmFyIC5idXR0b24ubWFwJykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9KS5vbignb3Blbi56Zi5yZXZlYWwnLCAnI2tyLXNlYXJjaC1tYXAtbW9kYWwnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0JCgnI2tyLXNlYXJjaC1tYXAtZnVsbCcpLmhlaWdodCgkKCcja3Itc2VhcmNoLW1hcC1tb2RhbCcpLmhlaWdodCgpKTtcblx0XHRcdGdvb2dsZS5tYXBzLmV2ZW50LnRyaWdnZXIobWFwLCBcInJlc2l6ZVwiKTtcblx0XHRcdCQuYWpheCh7XG5cdFx0XHRcdHR5cGU6IFwiUE9TVFwiLFxuXHRcdFx0XHR1cmw6ICcvaW5kZXgucGhwP29wdGlvbj1jb21fa25vd3JlcyZ0YXNrPXByb3BlcnRpZXMubWFwc2Vzc2lvbicsXG5cdFx0XHRcdGRhdGE6IHttYXBfbW9kYWw6ICcxJ30sXG5cdFx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0XHQvLyBEb2Vzbid0IHRyaWdnZXIgaWYgaW5jbHVkZWQgYWJvdmUgPz9cblx0XHRpZiAoIW1hcERhdGEpIHtcblx0XHRcdGNvbnN0ICRzb2xvVHJpZ2dlciA9ICQoJyNrci1tYXAtc29sby10cmlnZ2VyJyk7XG5cdFx0XHQkc29sb1RyaWdnZXIub25lKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0a2lja01hcCgkc29sb1RyaWdnZXIpO1xuXHRcdFx0fSk7XG5cblx0XHRcdGlmICh3aW5kb3cubG9jYXRpb24uaHJlZi5pbmRleE9mKCcjbWFwJykgIT09IC0xICYmICRzb2xvVHJpZ2dlci5sZW5ndGgpIHtcblx0XHRcdFx0a2lja01hcCgkc29sb1RyaWdnZXIpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIFRlc3QgZm9yIGZvcmNlIG1hcFxuXHRcdGNvbnN0ICRtdHJpZ2dlciA9ICQoJy5tYXAtdHJpZ2dlcicpO1xuXHRcdGlmICgkbXRyaWdnZXIubGVuZ3RoICYmICRtdHJpZ2dlci5kYXRhKCdmb3JjZW1hcCcpKSB7XG5cdFx0XHQkbXRyaWdnZXIudHJpZ2dlcignY2xpY2snKTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBraWNrTWFwKCRlbGVtKSB7XG5cdFx0XHRjb25zdCB0eXBlID0gJGVsZW0uZGF0YSgndHlwZScpO1xuXHRcdFx0bGV0IHBpZCA9IDA7XG5cdFx0XHRpZiAodHlwZSA9PT0gJ3NvbG8nKSB7XG5cdFx0XHRcdHBpZCA9ICRlbGVtLmRhdGEoJ3BpZCcpO1xuXHRcdFx0fVxuXG5cdFx0XHRqUXVlcnkuYWpheCh7XG5cdFx0XHRcdHVybDogJy9pbmRleC5waHA/b3B0aW9uPWNvbV9rbm93cmVzJnRhc2s9cHJvcGVydGllcy5tYXBkYXRhJnBpZD0nICsgcGlkLFxuXHRcdFx0XHR0eXBlOiBcIlBPU1RcIixcblx0XHRcdFx0ZGF0YVR5cGU6IFwianNvblwiLFxuXHRcdFx0XHRzdWNjZXNzOiBmdW5jdGlvbiAocmVzdWx0KSB7XG5cdFx0XHRcdFx0aWYgKHJlc3VsdC5zdWNjZXNzKSB7XG5cdFx0XHRcdFx0XHRzZXR0aW5ncyA9IHtcblx0XHRcdFx0XHRcdFx0bWFwSWQ6ICRlbGVtLmRhdGEoJ3RhcmdldCcpLFxuXHRcdFx0XHRcdFx0XHRtYXBUeXBlOiAkZWxlbS5kYXRhKCd0eXBlJyksXG5cdFx0XHRcdFx0XHRcdG1hcFR5cGVJZDogJGVsZW0uZGF0YSgnbWFwdHlwZWlkJyksXG5cdFx0XHRcdFx0XHRcdG1hcFpvb206IHBhcnNlSW50KCRlbGVtLmRhdGEoJ3pvb20nKSksXG5cdFx0XHRcdFx0XHRcdG1hcE1heFpvb206IHBhcnNlSW50KCRlbGVtLmRhdGEoJ3pvb21tYXgnKSksXG5cdFx0XHRcdFx0XHRcdHByb3BlcnR5TWFya2VyczogcmVzdWx0LmRhdGEucHJvcGVydHlNYXJrZXJzLFxuXHRcdFx0XHRcdFx0XHRtYXBNYXJrZXJzOiByZXN1bHQuZGF0YS5tYXBNYXJrZXJzLFxuXHRcdFx0XHRcdFx0XHRmaWx0ZXJJZHM6IHJlc3VsdC5kYXRhLmZpbHRlcklkc1xuXHRcdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdFx0bXlLcm1hcCA9IG5ldyBLcm1hcChzZXR0aW5ncyk7XG5cdFx0XHRcdFx0XHRtYXBEYXRhID0gdHJ1ZTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0d2luZG93LmFsZXJ0KHJlc3VsdC5tZXNzYWdlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblx0fSk7XG59KGpRdWVyeSkpOyIsIi8qKlxuICogQHBhY2thZ2UgICAgS25vdyBSZXNlcnZhdGlvbnNcbiAqIEBzdWJwYWNrYWdlIFNpdGUgSlNcbiAqIEBjb3B5cmlnaHQgIDIwMjAgSGlnaGxhbmQgVmlzaW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogQGxpY2Vuc2UgICAgU2VlIHRoZSBmaWxlIFwiTElDRU5TRS50eHRcIiBmb3IgdGhlIGZ1bGwgbGljZW5zZSBnb3Zlcm5pbmcgdGhpcyBjb2RlLlxuICogQGF1dGhvciAgICAgSGF6ZWwgV2lsc29uIDxoYXplbEBoaWdobGFuZHZpc2lvbi5jb20+XG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoJCkge1xuXHRsZXQgbXlLcnJvdXRlO1xuXHRsZXQgZGlyZWN0aW9uc0Rpc3BsYXk7XG5cdGxldCBkaXJlY3Rpb25zVmlzaWJsZSA9IGZhbHNlO1xuXHRsZXQgcm91dGVNYXA7XG5cdGxldCBvcmlnaW47XG5cdGxldCBkZXN0aW5hdGlvbjtcblx0bGV0IHJvdXRlTWFya2VycyA9IFtdO1xuXHRsZXQgcm91dGVTdG9wUG9pbnRzID0gW107XG5cdGxldCBwb2ludDtcblx0bGV0IHNlbGY7XG5cblx0bGV0IHNldHRpbmdzID0ge1xuXHRcdGxhdDogICAgICAgICAgICAgICBcIlwiLFxuXHRcdGxuZzogICAgICAgICAgICAgICBcIlwiLFxuXHRcdG5hbWU6ICAgICAgICAgICAgICBcIlwiLFxuXHRcdGljb246ICAgICAgICAgICAgICBcIlwiLFxuXHRcdGRldG91cjogICAgICAgICAgICBcIlwiLFxuXHRcdG1hcFpvb206ICAgICAgICAgICA5LFxuXHRcdG1hcE1heFpvb206ICAgICAgICAxOCxcblx0XHRtYXBUeXBlSWQ6ICAgICAgICAgXCJyb2FkbWFwXCIsXG5cdFx0bWFwSWQ6ICAgICAgICAgICAgIFwia3ItbWFwLXJvdXRlXCIsXG5cdFx0ZGlyZWN0aW9uc1BhbmVsOiAgIFwia3ItZGlyZWN0aW9ucy1wYW5lbFwiLFxuXHRcdGRpcmVjdGlvbnNTZXJ2aWNlOiBudWxsXG5cdH07XG5cblx0Y2xhc3MgS3Jyb3V0ZSB7XG5cdFx0Y29uc3RydWN0b3IoJGVsZW1lbnQsIG9wdGlvbnMpIHtcblx0XHRcdHRoaXMuc2V0dGluZ3MgPSBzZXR0aW5ncztcblx0XHRcdGlmIChvcHRpb25zKSB7XG5cdFx0XHRcdCQuZXh0ZW5kKHRoaXMuc2V0dGluZ3MsIG9wdGlvbnMpO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLnNldHRpbmdzLmRpcmVjdGlvbnNTZXJ2aWNlID0gbmV3IGdvb2dsZS5tYXBzLkRpcmVjdGlvbnNTZXJ2aWNlKCk7XG5cdFx0XHR0aGlzLmluaXQoKTtcblx0XHR9XG5cblx0XHRzdGF0aWMgY2xlYXJSb3V0ZU1hcmtlcnMoKSB7XG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHJvdXRlTWFya2Vycy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRyb3V0ZU1hcmtlcnNbaV0uc2V0TWFwKG51bGwpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHN0YXRpYyBjbGVhcldheXBvaW50cygpIHtcblx0XHRcdG9yaWdpbiA9IG51bGw7XG5cdFx0XHRyb3V0ZU1hcmtlcnMgPSBbXTtcblx0XHRcdHJvdXRlU3RvcFBvaW50cyA9IFtdO1xuXHRcdFx0ZGlyZWN0aW9uc1Zpc2libGUgPSBmYWxzZTtcblx0XHR9XG5cblx0XHRhZGRSb3V0ZU1hcmtlcihsYXRsbmcpIHtcblx0XHRcdHJvdXRlTWFya2Vycy5wdXNoKG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xuXHRcdFx0XHRwb3NpdGlvbjogbGF0bG5nLFxuXHRcdFx0XHRtYXA6ICAgICAgcm91dGVNYXAsXG5cdFx0XHRcdGljb246ICAgICB0aGlzLnNldHRpbmdzLmRldG91clxuXHRcdFx0fSkpO1xuXHRcdH1cblxuXHRcdGNhbGNSb3V0ZSgpIHtcblx0XHRcdGxldCBmcm9tX2FkZHJlc3MgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZyb21fYWRkcmVzc1wiKS52YWx1ZTtcblx0XHRcdGxldCBvcmlnaW4gPSBcIlwiO1xuXG5cdFx0XHRpZiAoZnJvbV9hZGRyZXNzID09PSBcIkFkZHJlc3NcIikgZnJvbV9hZGRyZXNzID0gXCJcIjtcblx0XHRcdGlmIChmcm9tX2FkZHJlc3MpIG9yaWdpbiA9IGZyb21fYWRkcmVzcyArIFwiLFwiICsgXCJcIjtcblxuXHRcdFx0bGV0IG1vZGU7XG5cdFx0XHRzd2l0Y2ggKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW9kZVwiKS52YWx1ZSkge1xuXHRcdFx0XHRjYXNlIFwiYmljeWNsaW5nXCI6XG5cdFx0XHRcdFx0bW9kZSA9IGdvb2dsZS5tYXBzLlRyYXZlbE1vZGUuQklDWUNMSU5HO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwiZHJpdmluZ1wiOlxuXHRcdFx0XHRcdG1vZGUgPSBnb29nbGUubWFwcy5UcmF2ZWxNb2RlLkRSSVZJTkc7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJ3YWxraW5nXCI6XG5cdFx0XHRcdFx0bW9kZSA9IGdvb2dsZS5tYXBzLlRyYXZlbE1vZGUuV0FMS0lORztcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0aWYgKG9yaWdpbikge1xuXHRcdFx0XHRsZXQgcmVxdWVzdCA9IHtcblx0XHRcdFx0XHRvcmlnaW46ICAgICAgICBvcmlnaW4sXG5cdFx0XHRcdFx0ZGVzdGluYXRpb246ICAgZGVzdGluYXRpb24sXG5cdFx0XHRcdFx0d2F5cG9pbnRzOiAgICAgcm91dGVTdG9wUG9pbnRzLFxuXHRcdFx0XHRcdHRyYXZlbE1vZGU6ICAgIG1vZGUsXG5cdFx0XHRcdFx0YXZvaWRIaWdod2F5czogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hpZ2h3YXlzJykuY2hlY2tlZCxcblx0XHRcdFx0XHRhdm9pZFRvbGxzOiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9sbHMnKS5jaGVja2VkXG5cdFx0XHRcdH07XG5cblx0XHRcdFx0c2VsZiA9IHRoaXM7XG5cdFx0XHRcdHRoaXMuc2V0dGluZ3MuZGlyZWN0aW9uc1NlcnZpY2Uucm91dGUocmVxdWVzdCwgZnVuY3Rpb24gKHJlc3BvbnNlLCBzdGF0dXMpIHtcblx0XHRcdFx0XHRpZiAoc3RhdHVzID09PSBnb29nbGUubWFwcy5EaXJlY3Rpb25zU3RhdHVzLk9LKSB7XG5cdFx0XHRcdFx0XHRkaXJlY3Rpb25zRGlzcGxheS5zZXREaXJlY3Rpb25zKHJlc3BvbnNlKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0YWxlcnQoXCJHb29nbGUgY291bGRuYHQgY2FsY3VsYXRlIGRpcmVjdGlvbnMgZm9yIHRoaXMgcm91dGUgYW5kIHNlbGVjdGVkIG9wdGlvbnNcIik7XG5cdFx0XHRcdFx0XHRzZWxmLnJlc2V0Um91dGUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXG5cdFx0XHRLcnJvdXRlLmNsZWFyUm91dGVNYXJrZXJzKCk7XG5cdFx0XHRkaXJlY3Rpb25zVmlzaWJsZSA9IHRydWU7XG5cdFx0fVxuXG5cdFx0aW5pdCgpIHtcblx0XHRcdGRlc3RpbmF0aW9uID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyh0aGlzLnNldHRpbmdzLmxhdCwgdGhpcy5zZXR0aW5ncy5sbmcpO1xuXG5cdFx0XHQvL0luaXRpYWxpc2UgbWFwIG9wdGlvbnNcblx0XHRcdHRoaXMubXlPcHRpb25zID0ge1xuXHRcdFx0XHRzY3JvbGx3aGVlbDogICAgICAgZmFsc2UsXG5cdFx0XHRcdHpvb206ICAgICAgICAgICAgICB0aGlzLnNldHRpbmdzLm1hcFpvb20sXG5cdFx0XHRcdG1heFpvb206ICAgICAgICAgICB0aGlzLnNldHRpbmdzLm1hcE1heFpvb20sXG5cdFx0XHRcdG1hcFR5cGVJZDogICAgICAgICB0aGlzLnNldHRpbmdzLm1hcFR5cGVJZCxcblx0XHRcdFx0c3RyZWV0Vmlld0NvbnRyb2w6IGZhbHNlLFxuXHRcdFx0XHRjZW50ZXI6ICAgICAgICAgICAgZGVzdGluYXRpb25cblx0XHRcdH07XG5cblx0XHRcdHJvdXRlTWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnNldHRpbmdzLm1hcElkKSwgdGhpcy5teU9wdGlvbnMpO1xuXHRcdFx0ZGlyZWN0aW9uc0Rpc3BsYXkgPSBuZXcgZ29vZ2xlLm1hcHMuRGlyZWN0aW9uc1JlbmRlcmVyKCk7XG5cdFx0XHRkaXJlY3Rpb25zRGlzcGxheS5zZXRNYXAocm91dGVNYXApO1xuXHRcdFx0ZGlyZWN0aW9uc0Rpc3BsYXkuc2V0UGFuZWwoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5zZXR0aW5ncy5kaXJlY3Rpb25zUGFuZWwpKTtcblxuXHRcdFx0Y29uc3QgaW1hZ2UgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VySW1hZ2UodGhpcy5zZXR0aW5ncy5pY29uKTtcblx0XHRcdHBvaW50ID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyh0aGlzLnNldHRpbmdzLmxhdCwgdGhpcy5zZXR0aW5ncy5sbmcpO1xuXG5cdFx0XHRzZWxmID0gdGhpcztcblx0XHRcdGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKHJvdXRlTWFwLCAnY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRcdFx0aWYgKHJvdXRlU3RvcFBvaW50cy5sZW5ndGggPCA5KSB7XG5cdFx0XHRcdFx0cm91dGVTdG9wUG9pbnRzLnB1c2goe2xvY2F0aW9uOiBldmVudC5sYXRMbmcsIHN0b3BvdmVyOiB0cnVlfSk7XG5cdFx0XHRcdFx0cG9pbnQgPSBldmVudC5sYXRMbmc7XG5cdFx0XHRcdFx0c2VsZi5hZGRSb3V0ZU1hcmtlcihwb2ludCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0YWxlcnQoXCJNYXhpbXVtIG51bWJlciBvZiA5IHdheXBvaW50cyByZWFjaGVkXCIpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0c2VsZiA9IHRoaXM7XG5cdFx0XHRnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lck9uY2Uocm91dGVNYXAsICdpZGxlJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRnb29nbGUubWFwcy5ldmVudC50cmlnZ2VyKHJvdXRlTWFwLCAncmVzaXplJyk7XG5cdFx0XHRcdHNlbGYuY2FsY1JvdXRlKCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRyZXNldFJvdXRlKCkge1xuXHRcdFx0S3Jyb3V0ZS5jbGVhclJvdXRlTWFya2VycygpO1xuXHRcdFx0S3Jyb3V0ZS5jbGVhcldheXBvaW50cygpO1xuXHRcdFx0ZGlyZWN0aW9uc0Rpc3BsYXkuc2V0TWFwKG51bGwpO1xuXHRcdFx0ZGlyZWN0aW9uc0Rpc3BsYXkuc2V0UGFuZWwobnVsbCk7XG5cdFx0XHRkaXJlY3Rpb25zRGlzcGxheSA9IG5ldyBnb29nbGUubWFwcy5EaXJlY3Rpb25zUmVuZGVyZXIoKTtcblx0XHRcdGRpcmVjdGlvbnNEaXNwbGF5LnNldE1hcChyb3V0ZU1hcCk7XG5cdFx0XHRkaXJlY3Rpb25zRGlzcGxheS5zZXRQYW5lbChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnNldHRpbmdzLmRpcmVjdGlvbnNQYW5lbCkpO1xuXG5cdFx0XHR0aGlzLmluaXQoKTtcblx0XHR9XG5cdH1cblxuXHQkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG5cdFx0JChcIi5rci1kaXJlY3Rpb25zLW1vZGFsXCIpLm9uKCdjbGljaycsICcja3ItbWFwLXJvdXRlJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRsZXQgJGVsZW1lbnQgPSAkKHRoaXMpO1xuXHRcdFx0Y29uc3Qgb3B0aW9ucyA9IHtcblx0XHRcdFx0bGF0OiAgICAkZWxlbWVudC5kYXRhKCdsYXQnKSxcblx0XHRcdFx0bG5nOiAgICAkZWxlbWVudC5kYXRhKCdsbmcnKSxcblx0XHRcdFx0bmFtZTogICAkZWxlbWVudC5kYXRhKCduYW1lJyksXG5cdFx0XHRcdGljb246ICAgJGVsZW1lbnQuZGF0YSgnaWNvbicpLFxuXHRcdFx0XHRkZXRvdXI6ICRlbGVtZW50LmRhdGEoJ2RldG91cicpXG5cdFx0XHR9O1xuXHRcdFx0bXlLcnJvdXRlID0gbmV3IEtycm91dGUoJGVsZW1lbnQsIG9wdGlvbnMpO1xuXHRcdH0pLm9uKCdjbGljaycsICcucmVzZXRyb3V0ZScsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRteUtycm91dGUucmVzZXRSb3V0ZSgpO1xuXHRcdH0pLm9uKCdjbGljaycsICcuY2FsY3JvdXRlJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdG15S3Jyb3V0ZS5jYWxjUm91dGUoKTtcblx0XHR9KTtcblxuXHRcdGpRdWVyeShcImEjZ2VvY29kZUFkZHJlc3NcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0bGV0IGFkZHJlc3NTdHJpbmcgPVxuXHRcdFx0XHRqUXVlcnkoXCIjamZvcm1fcHJvcGVydHlfc3RyZWV0XCIpLnZhbCgpICArIFwiLCBcIiArXG5cdFx0XHRcdGpRdWVyeSgnI2pmb3JtX3Rvd25faWQnKS5maW5kKFwiOnNlbGVjdGVkXCIpLnRleHQoKSArIFwiIFwiICtcblx0XHRcdFx0alF1ZXJ5KFwiI2pmb3JtX3Byb3BlcnR5X3Bvc3Rjb2RlXCIpLnZhbCgpICsgXCIsIFwiICtcblx0XHRcdFx0alF1ZXJ5KCcjamZvcm1fcmVnaW9uX2lkJykuZmluZChcIjpzZWxlY3RlZFwiKS50ZXh0KCkgKyBcIiBcIiArXG5cdFx0XHRcdGpRdWVyeSgnI2pmb3JtX2NvdW50cnlfaWQnKS5maW5kKFwiOnNlbGVjdGVkXCIpLnRleHQoKTtcblxuXHRcdFx0bGV0IHVybCA9ICdpbmRleC5waHA/b3B0aW9uPWNvbV9rbm93cmVzJnRhc2s9cHJvcGVydHkuZ2VvY29kZSc7XG5cdFx0XHRsZXQgY29vcmQgPSBbXTtcblxuXHRcdFx0alF1ZXJ5LmFqYXgoe1xuXHRcdFx0XHR0eXBlOiAgICAgXCJQT1NUXCIsXG5cdFx0XHRcdHVybDogICAgICB1cmwsXG5cdFx0XHRcdGRhdGE6ICAgICB7YWRkcmVzczogYWRkcmVzc1N0cmluZ30sXG5cdFx0XHRcdGRhdGFUeXBlOiBcImpzb25cIixcblx0XHRcdFx0c3VjY2VzczogIGZ1bmN0aW9uIChqc29uZGF0YSkge1xuXHRcdFx0XHRcdGpRdWVyeS5lYWNoKGpzb25kYXRhLCBmdW5jdGlvbiAoa2V5LCB2YWwpIHtcblx0XHRcdFx0XHRcdGxldCBkaXYgPSBcIiNcIiArIGtleTtcblx0XHRcdFx0XHRcdGpRdWVyeShkaXYpLnZhbCh2YWwpO1xuXHRcdFx0XHRcdFx0Y29vcmRba2V5XSA9IHZhbDtcblx0XHRcdFx0XHRcdHJvdXRlTWFwLnJlZnJlc2hNYXAoY29vcmRbJ2xhdCddLCBjb29yZFsnbG5nJ10sIGZhbHNlKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH0pO1xufShqUXVlcnkpKTsiLCIvLyBLUiBBUFAgSlMgRmlsZXNcbmltcG9ydCAnbnBtL2pxdWVyeS1iYXItcmF0aW5nL2pxdWVyeS5iYXJyYXRpbmcnO1xuaW1wb3J0ICducG0vaXMtbWFya2VyLWNsdXN0ZXJlcic7XG5pbXBvcnQgJ21lZGlhanMvc2l0ZS9hcHAnO1xuaW1wb3J0ICdtZWRpYWpzL3NpdGUvY29uZmlybSc7XG5pbXBvcnQgJ21lZGlhanMvc2l0ZS9kb2JlbnRyeSc7XG5pbXBvcnQgJ21lZGlhanMvc2l0ZS9ndWVzdGRhdGEnO1xuaW1wb3J0ICdtZWRpYWpzL3NpdGUvbWFnZWxsYW4nO1xuaW1wb3J0ICdtZWRpYWpzL3NpdGUvbWFwJztcbmltcG9ydCAnbWVkaWFqcy9zaXRlL3JvdXRlJzsiXSwibmFtZXMiOlsiTWFya2VyQ2x1c3RlcmVyIiwibWFwIiwib3B0X21hcmtlcnMiLCJvcHRfb3B0aW9ucyIsImV4dGVuZCIsImdvb2dsZSIsIm1hcHMiLCJPdmVybGF5VmlldyIsIm1hcF8iLCJtYXJrZXJzXyIsImNsdXN0ZXJzXyIsInNpemVzIiwic3R5bGVzXyIsInJlYWR5XyIsIm9wdGlvbnMiLCJncmlkU2l6ZV8iLCJtaW5DbHVzdGVyU2l6ZV8iLCJtYXhab29tXyIsImltYWdlUGF0aF8iLCJNQVJLRVJfQ0xVU1RFUl9JTUFHRV9QQVRIXyIsImltYWdlRXh0ZW5zaW9uXyIsIk1BUktFUl9DTFVTVEVSX0lNQUdFX0VYVEVOU0lPTl8iLCJ6b29tT25DbGlja18iLCJ1bmRlZmluZWQiLCJhdmVyYWdlQ2VudGVyXyIsInNldHVwU3R5bGVzXyIsInNldE1hcCIsInByZXZab29tXyIsImdldFpvb20iLCJ0aGF0IiwiZXZlbnQiLCJhZGRMaXN0ZW5lciIsInpvb20iLCJyZXNldFZpZXdwb3J0IiwicmVkcmF3IiwibGVuZ3RoIiwiYWRkTWFya2VycyIsInByb3RvdHlwZSIsIm9iajEiLCJvYmoyIiwib2JqZWN0IiwicHJvcGVydHkiLCJhcHBseSIsIm9uQWRkIiwic2V0UmVhZHlfIiwiZHJhdyIsImkiLCJzaXplIiwicHVzaCIsInVybCIsImhlaWdodCIsIndpZHRoIiwiZml0TWFwVG9NYXJrZXJzIiwibWFya2VycyIsImdldE1hcmtlcnMiLCJib3VuZHMiLCJMYXRMbmdCb3VuZHMiLCJtYXJrZXIiLCJnZXRQb3NpdGlvbiIsImZpdEJvdW5kcyIsInNldFN0eWxlcyIsInN0eWxlcyIsImdldFN0eWxlcyIsImlzWm9vbU9uQ2xpY2siLCJpc0F2ZXJhZ2VDZW50ZXIiLCJnZXRUb3RhbE1hcmtlcnMiLCJzZXRNYXhab29tIiwibWF4Wm9vbSIsImdldE1heFpvb20iLCJjYWxjdWxhdG9yXyIsIm51bVN0eWxlcyIsImluZGV4IiwiY291bnQiLCJkdiIsInBhcnNlSW50IiwiTWF0aCIsIm1pbiIsInRleHQiLCJzZXRDYWxjdWxhdG9yIiwiY2FsY3VsYXRvciIsImdldENhbGN1bGF0b3IiLCJvcHRfbm9kcmF3IiwicHVzaE1hcmtlclRvXyIsImlzQWRkZWQiLCJyZXBhaW50IiwiYWRkTWFya2VyIiwicmVtb3ZlTWFya2VyXyIsImluZGV4T2YiLCJtIiwic3BsaWNlIiwicmVtb3ZlTWFya2VyIiwicmVtb3ZlZCIsInJlbW92ZU1hcmtlcnMiLCJyIiwicmVhZHkiLCJjcmVhdGVDbHVzdGVyc18iLCJnZXRUb3RhbENsdXN0ZXJzIiwiZ2V0TWFwIiwiZ2V0R3JpZFNpemUiLCJzZXRHcmlkU2l6ZSIsImdldE1pbkNsdXN0ZXJTaXplIiwic2V0TWluQ2x1c3RlclNpemUiLCJnZXRFeHRlbmRlZEJvdW5kcyIsInByb2plY3Rpb24iLCJnZXRQcm9qZWN0aW9uIiwidHIiLCJMYXRMbmciLCJnZXROb3J0aEVhc3QiLCJsYXQiLCJsbmciLCJibCIsImdldFNvdXRoV2VzdCIsInRyUGl4IiwiZnJvbUxhdExuZ1RvRGl2UGl4ZWwiLCJ4IiwieSIsImJsUGl4IiwibmUiLCJmcm9tRGl2UGl4ZWxUb0xhdExuZyIsInN3IiwiaXNNYXJrZXJJbkJvdW5kc18iLCJjb250YWlucyIsImNsZWFyTWFya2VycyIsIm9wdF9oaWRlIiwiY2x1c3RlciIsInJlbW92ZSIsIm9sZENsdXN0ZXJzIiwic2xpY2UiLCJ3aW5kb3ciLCJzZXRUaW1lb3V0IiwiZGlzdGFuY2VCZXR3ZWVuUG9pbnRzXyIsInAxIiwicDIiLCJSIiwiZExhdCIsIlBJIiwiZExvbiIsImEiLCJzaW4iLCJjb3MiLCJjIiwiYXRhbjIiLCJzcXJ0IiwiZCIsImFkZFRvQ2xvc2VzdENsdXN0ZXJfIiwiZGlzdGFuY2UiLCJjbHVzdGVyVG9BZGRUbyIsInBvcyIsImNlbnRlciIsImdldENlbnRlciIsImlzTWFya2VySW5DbHVzdGVyQm91bmRzIiwiQ2x1c3RlciIsIm1hcEJvdW5kcyIsImdldEJvdW5kcyIsIm1hcmtlckNsdXN0ZXJlciIsIm1hcmtlckNsdXN0ZXJlcl8iLCJjZW50ZXJfIiwiYm91bmRzXyIsImNsdXN0ZXJJY29uXyIsIkNsdXN0ZXJJY29uIiwiaXNNYXJrZXJBbHJlYWR5QWRkZWQiLCJjYWxjdWxhdGVCb3VuZHNfIiwibCIsImxlbiIsInVwZGF0ZUljb24iLCJnZXRNYXJrZXJDbHVzdGVyZXIiLCJnZXRTaXplIiwibXoiLCJoaWRlIiwic3VtcyIsInNldENlbnRlciIsInNldFN1bXMiLCJzaG93Iiwib3B0X3BhZGRpbmciLCJwYWRkaW5nXyIsImNsdXN0ZXJfIiwiZGl2XyIsInN1bXNfIiwidmlzaWJsZV8iLCJ0cmlnZ2VyQ2x1c3RlckNsaWNrIiwidHJpZ2dlciIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImdldFBvc0Zyb21MYXRMbmdfIiwic3R5bGUiLCJjc3NUZXh0IiwiY3JlYXRlQ3NzIiwiaW5uZXJIVE1MIiwicGFuZXMiLCJnZXRQYW5lcyIsIm92ZXJsYXlNb3VzZVRhcmdldCIsImFwcGVuZENoaWxkIiwiYWRkRG9tTGlzdGVuZXIiLCJsYXRsbmciLCJ3aWR0aF8iLCJoZWlnaHRfIiwidG9wIiwibGVmdCIsImRpc3BsYXkiLCJvblJlbW92ZSIsInBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsInRleHRfIiwiaW5kZXhfIiwidXNlU3R5bGUiLCJtYXgiLCJ1cmxfIiwidGV4dENvbG9yXyIsImFuY2hvcl8iLCJ0ZXh0U2l6ZV8iLCJmb250RmFtaWx5XyIsImZvbnRXZWlnaHRfIiwiYmFja2dyb3VuZFBvc2l0aW9uXyIsImJhY2tncm91bmRQb3NpdGlvbiIsIl90eXBlb2YiLCJ0eHRDb2xvciIsInR4dFNpemUiLCJmb250RmFtaWx5IiwiZm9udFdlaWdodCIsImpvaW4iLCJnbG9iYWwiLCJtb2R1bGUiLCJleHBvcnRzIiwiZmFjdG9yeSIsImRlZmluZSIsImFtZCIsInJlcXVpcmUiLCJqUXVlcnkiLCIkIiwiQmFyUmF0aW5nIiwic2VsZiIsIndyYXBFbGVtZW50IiwiY2xhc3NlcyIsInRoZW1lIiwiJGVsZW0iLCJ3cmFwIiwidW53cmFwRWxlbWVudCIsInVud3JhcCIsImZpbmRPcHRpb24iLCJ2YWx1ZSIsImlzTnVtZXJpYyIsImZsb29yIiwiZ2V0SW5pdGlhbE9wdGlvbiIsImluaXRpYWxSYXRpbmciLCJnZXRFbXB0eU9wdGlvbiIsIiRlbXB0eU9wdCIsImZpbmQiLCJlbXB0eVZhbHVlIiwiYWxsb3dFbXB0eSIsInByZXBlbmRUbyIsImdldERhdGEiLCJrZXkiLCJkYXRhIiwic2V0RGF0YSIsInNhdmVEYXRhT25FbGVtZW50IiwiJG9wdCIsInZhbCIsImVtcHR5VGV4dCIsInVzZXJPcHRpb25zIiwicmF0aW5nVmFsdWUiLCJyYXRpbmdUZXh0Iiwib3JpZ2luYWxSYXRpbmdWYWx1ZSIsIm9yaWdpbmFsUmF0aW5nVGV4dCIsImVtcHR5UmF0aW5nVmFsdWUiLCJlbXB0eVJhdGluZ1RleHQiLCJyZWFkT25seSIsInJlYWRvbmx5IiwicmF0aW5nTWFkZSIsInJlbW92ZURhdGFPbkVsZW1lbnQiLCJyZW1vdmVEYXRhIiwiYnVpbGRXaWRnZXQiLCIkdyIsImVhY2giLCJodG1sIiwiJGEiLCJzaG93VmFsdWVzIiwiYXBwZW5kIiwic2hvd1NlbGVjdGVkUmF0aW5nIiwicmV2ZXJzZSIsImFkZENsYXNzIiwibmV4dEFsbG9yUHJldmlvdXNBbGwiLCJzZXRTZWxlY3RGaWVsZFZhbHVlIiwicHJvcCIsImNoYW5nZSIsInJlc2V0U2VsZWN0RmllbGQiLCJkZWZhdWx0U2VsZWN0ZWQiLCJwYXJlbnQiLCJmcmFjdGlvbiIsInJvdW5kIiwicmVzZXRTdHlsZSIsIiR3aWRnZXQiLCJyZW1vdmVDbGFzcyIsIm1hdGNoIiwiYXBwbHlTdHlsZSIsImJhc2VWYWx1ZSIsImYiLCIkYWxsIiwiJGZyYWN0aW9uYWwiLCJpc0Rlc2VsZWN0YWJsZSIsIiRlbGVtZW50IiwiZGVzZWxlY3RhYmxlIiwiYXR0ciIsImF0dGFjaENsaWNrSGFuZGxlciIsIiRlbGVtZW50cyIsIm9uIiwicHJldmVudERlZmF1bHQiLCJvblNlbGVjdCIsImNhbGwiLCJhdHRhY2hNb3VzZUVudGVySGFuZGxlciIsImF0dGFjaE1vdXNlTGVhdmVIYW5kbGVyIiwiZmFzdENsaWNrcyIsInN0b3BQcm9wYWdhdGlvbiIsImNsaWNrIiwiZGlzYWJsZUNsaWNrcyIsImF0dGFjaEhhbmRsZXJzIiwiaG92ZXJTdGF0ZSIsImRldGFjaEhhbmRsZXJzIiwib2ZmIiwic2V0dXBIYW5kbGVycyIsImluc2VydEFmdGVyIiwic3RhdGUiLCJ0b2dnbGVDbGFzcyIsInNldCIsInNpbGVudCIsImNsZWFyIiwib25DbGVhciIsImRlc3Ryb3kiLCJvbkRlc3Ryb3kiLCJpbml0IiwiZWxlbSIsImZuIiwiYmFycmF0aW5nIiwiZGVmYXVsdHMiLCJtZXRob2QiLCJwbHVnaW4iLCJpcyIsImVycm9yIiwiaGFzT3duUHJvcGVydHkiLCJuZXh0Iiwic2VhcmNoRGF0YSIsInNlYXJjaERvbmUiLCJjYWxlbmRhckxvYWRlZCIsInNhdmVkd2lkdGgiLCJsYXJnZSIsInJlc2l6ZWQiLCJzY2xvYWRlZCIsImZvdW5kYXRpb24iLCJjaGVja1NjcmVlbldpZHRoIiwiYmFycyIsIiRjdHJpZ2dlciIsImxvYWRDYWxlbmRhciIsInN0aWNreSIsImUiLCIkZm9ybSIsImFqYXgiLCJ0eXBlIiwic2VyaWFsaXplIiwiZGF0YVR5cGUiLCJzdWNjZXNzIiwicmVzdWx0IiwiZm9ybVJlc3BvbnNlIiwibG9jYXRpb24iLCJocmVmIiwibWVzc2FnZSIsIiRtb2RhbCIsIkZvdW5kYXRpb24iLCJSZXZlYWwiLCJvcGVuIiwiY3NzIiwibW9kYWxpZCIsInRyaW0iLCJhamF4dXJsIiwiY29udGVudCIsImdldFNjcmlwdCIsImluaXRpYWxpemVTdHJpcGUiLCIkcHNsaWRlciIsInNsaWNrIiwicGlkIiwiYmFyIiwiZ2V0UHJvcGVydGllcyIsImNoaWxkcmVuIiwidG9nZ2xlIiwic2V0QWN0aXZlTWVudSIsInRhcmdldCIsIiRwcm9wcyIsIiR0YWJzIiwic3BlY2lhbCIsInRvdWNoc3RhcnQiLCJzZXR1cCIsIl8iLCJucyIsImhhbmRsZSIsImluY2x1ZGVzIiwiYWRkRXZlbnRMaXN0ZW5lciIsInBhc3NpdmUiLCJ0b3VjaG1vdmUiLCJpZCIsInJlcGxhY2UiLCJyZWRpcmVjdCIsImFjdGlvbiIsImFyZ3VtZW50cyIsImFjdGlvbl92YWx1ZSIsInJlbG9hZCIsInZhbHMiLCJzZXRTZWFyY2hEYXRhIiwicmVzcG9uc2UiLCIkc2lkZWJhciIsImVtcHR5IiwiZmFkZUluIiwic2Nyb2xsVG8iLCJzZWFyY2hiYXIiLCJzY3JlZW5XaWR0aEhhc0NoYW5nZWQiLCJNZWRpYVF1ZXJ5IiwiYXRMZWFzdCIsIm8iLCJTeW1ib2wiLCJpdGVyYXRvciIsImNvbnN0cnVjdG9yIiwiX2NsYXNzQ2FsbENoZWNrIiwibiIsIlR5cGVFcnJvciIsIl9kZWZpbmVQcm9wZXJ0aWVzIiwidCIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJ3cml0YWJsZSIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiX3RvUHJvcGVydHlLZXkiLCJfY3JlYXRlQ2xhc3MiLCJfdG9QcmltaXRpdmUiLCJ0b1ByaW1pdGl2ZSIsIlN0cmluZyIsIk51bWJlciIsIm9yaWdpbiIsInByb3RvY29sIiwiaG9zdCIsIm15Q29uZmlybSIsIiRteVRhc2siLCJLcmNvbmZpcm0iLCJmb3JtIiwidXBkYXRlUXVvdGUiLCJzZXJpYWxpemVBcnJheSIsImRpdiIsImNoZWNrVGVybXMiLCJ0ZXN0IiwiZ2V0RWxlbWVudEJ5SWQiLCJ0ZXN0YyIsInRlc3R0IiwiYWdyZWVjaGVjayIsImNoZWNrZWQiLCJhZ3JlZWNoZWNrYyIsImFncmVlY2hlY2t0IiwibXlLckRvYkVudHJ5IiwidG9kYXkiLCJCQUNLU1BBQ0UiLCJzZXR0aW5ncyIsImN1c3RvbV92YWxpZGF0aW9uIiwiZGF5c19pbl9tb250aCIsImRvY3VtZW50X2RhdGUiLCJlcnJvcmJveF94IiwiZXJyb3Jib3hfeSIsImZpZWxkX2hpbnRfdGV4dF9kYXkiLCJmaWVsZF9oaW50X3RleHRfbW9udGgiLCJmaWVsZF9oaW50X3RleHRfeWVhciIsImZpZWxkX29yZGVyIiwiZmllbGRfd2lkdGhfZGF5IiwiZmllbGRfd2lkdGhfbW9udGgiLCJmaWVsZF93aWR0aF95ZWFyIiwiZmllbGRfd2lkdGhfc2VwIiwibWlubWF4IiwibWluX2RhdGUiLCJtYXhfZGF0ZSIsIm1pbl95ZWFyIiwibW9udGhfbmFtZSIsIm9uX2JsdXIiLCJvbl9lcnJvciIsIm9uX2NoYW5nZSIsInBhcnNlX2RhdGUiLCJzZXBhcmF0b3IiLCJzaG93X2Vycm9ycyIsInNob3dfaGludHMiLCJFX0RBWV9OQU4iLCJFX0RBWV9UT09fQklHIiwiRV9EQVlfVE9PX1NNQUxMIiwiRV9CQURfREFZX0ZPUl9NT05USCIsIkVfTU9OVEhfTkFOIiwiRV9NT05USF9UT09fQklHIiwiRV9NT05USF9UT09fU01BTEwiLCJFX1lFQVJfTkFOIiwiRV9ZRUFSX0xFTkdUSCIsIkVfWUVBUl9UT09fU01BTEwiLCJFX01JTl9EQVRFIiwiRV9NQVhfREFURSIsIktyRG9iRW50cnkiLCJnZXRZbWQiLCJEYXRlIiwiaW5wdXRfZGF5IiwiaW5wdXRfbW9udGgiLCJpbnB1dF95ZWFyIiwiYWRkRW50cnlGaWVsZHMiLCJkb2JmaWVsZCIsImZpZWxkcyIsInNwbGl0IiwiZmllbGQiLCJidWlsZEZpZWxkIiwiYWZ0ZXJQYXN0ZSIsInBhcnNlRGF0ZSIsInNldERhdGUiLCJuYW1lIiwia3Jkb2JlbnRyeSIsImlucHV0IiwiS3JEb2JJbnB1dCIsImhpbnRfdGV4dCIsImlubmVyIiwiJGlucHV0IiwiYnVpbGRVaSIsIndyYXBwZXIiLCJlcnJvcmJveCIsInNldEZpZWxkV2lkdGhzIiwiY2hlY2tEb2N1bWVudCIsImRvYiIsImNoaWxkZG9iIiwiY2xhc3NuYW1lIiwiZWxlbWVudHMiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiY2xlYXJFcnJvciIsImVycm9yX3RleHQiLCJzaG93RXJyb3IiLCJmb2N1cyIsInNldEZvY3VzIiwiZm9jdXNGaWVsZEJlZm9yZSIsInlpZWxkRm9jdXMiLCJmb2N1c0ZpZWxkQWZ0ZXIiLCJmb2N1c0luIiwiZm9jdXNPdXQiLCJ3aWRnZXRGb2N1c0xvc3QiLCJnZXREYXRlIiwiZGF5X3ZhbHVlIiwibW9udGhfdmFsdWUiLCJ5ZWFyX3ZhbHVlIiwiZGF5IiwibW9udGgiLCJ5ZWFyIiwicHJveHlMYWJlbENsaWNrcyIsInBhcnNlSXNvRGF0ZSIsIlJlZ0V4cCIsIiQzIiwiJDIiLCIkMSIsIm9ubW91c2V1cCIsIm5ld19kYXRlIiwidmFsaWRhdGUiLCJzZXRFcnJvciIsImF2YWlsYWJsZSIsInRvdGFsIiwic2V0V2lkdGgiLCJzZXRSZWFkb25seSIsIm1vZGUiLCJ3aWRnZXRFcnJvclRleHQiLCJ4X29mZnNldCIsIm91dGVyV2lkdGgiLCJ5X29mZnNldCIsInBvc2l0aW9uIiwiY3VycmVudF9pbnB1dCIsInZhbGlkYXRlRGF5IiwidmFsaWRhdGVNb250aCIsInZhbGlkYXRlWWVhciIsInZhbGlkYXRlRGF5c0luTW9udGgiLCJ2YWxpZGF0ZUNvbXBsZXRlRGF0ZSIsImRhdGVfc3RyIiwiZ2V0WW1kT2JqZWN0IiwiZGF0ZV9vYmoiLCJkYXRlX2lzbyIsImRhdGUiLCJvcHQiLCJnZXQiLCJoYXNfZm9jdXMiLCJudW0iLCJtc2ciLCJ0b1N0cmluZyIsIm9uQmx1ciIsImdldE1vbnRoIiwiZ2V0RGF5IiwiZ2V0RnVsbFllYXIiLCJwcm94eSIsImJsdXIiLCJrZXlkb3duIiwia2V5dXAiLCJzaG93X2hpbnQiLCJrZXlfaXNfZG93biIsImhhc0NsYXNzIiwiaXNEaWdpdEtleSIsImtleWNvZGUiLCJ3aGljaCIsIndhbnQiLCJuZXdfdmFsdWUiLCJzZWxlY3RfYWxsIiwic2VsZWN0IiwibmV3X3dpZHRoIiwiaG93dG9hcnJpdmUiLCJhcnJpdmFsbWVhbnMiLCJnZXRBdHRyaWJ1dGUiLCJkaXNwbGF5QXJyaXZhbCIsImNsYXNzTGlzdCIsImFycml2YWxkYXRhIiwiYWRkIiwib3ZDaGlsZHJlbiIsIm92U3RhdGUiLCJvdlBzIiwiJG92QnRuIiwiZmNDaGlsZHJlbiIsImZjU3RhdGUiLCIkZmNCdG4iLCJ0dENoaWxkcmVuIiwidHRTdGF0ZSIsInR0UHMiLCIkdHRCdG4iLCJ0dHBhcmFzIiwiY3VycmVudFBhcmFncmFwaCIsImhyRWxlbWVudCIsImFmdGVyIiwicXVlcnlTZWxlY3RvckFsbCIsImRvSFJzIiwicGFyYWdyYXBocyIsIm5leHRFbGVtZW50U2libGluZyIsInRhZ05hbWUiLCJsYW5nIiwibWFya2Vyc2hhcGUiLCJjb29yZHMiLCJteUtybWFwIiwibWFwRGF0YSIsImluZm9XaW5kb3ciLCJpbmZvV2luZG93MiIsInByb3BlcnR5ZGl2IiwicHJvcGVydHlpY29uIiwibWMiLCJwcm9wZXJ0eU1hcmtlcnMiLCJmaWx0ZXJJZHMiLCJtYXBNYXJrZXJzIiwibWFwVHlwZUlkIiwibWFwWm9vbSIsIm1hcE1heFpvb20iLCJtYXBUeXBlIiwibWFwSWQiLCJtYXJrZXJDb2xvciIsIktybWFwIiwiZ21PcHRpb25zIiwic2Nyb2xsd2hlZWwiLCJzdHJlZXRWaWV3Q29udHJvbCIsImdtYXJrZXJzIiwiaW5pdE1hcCIsImNoZWNrRHVwbGljYXRlIiwiY3VycmVudCIsImR1cHMiLCJlcXVhbHMiLCJuZXdMYXQiLCJuZXdMbmciLCJjbHVzdGVyTWFwIiwibWNPcHRpb25zIiwiZ3JpZFNpemUiLCJpZ25vcmVIaWRkZW5NYXJrZXJzIiwiaW1hZ2VQYXRoIiwibWF4RGVmYXVsdFpvb20iLCJhZGRMaXN0ZW5lck9uY2UiLCJzZXRab29tIiwic2V0UHJvcGVydHlNYXJrZXJzIiwic2V0TWFwTWFya2VycyIsInNldFZpc2libGUiLCJjbG9zZSIsImNyZWF0ZU1hcCIsIk1hcCIsIkluZm9XaW5kb3ciLCJjcmVhdGVNYXBNYXJrZXIiLCJwb2ludCIsImltYWdlIiwiYm94aW5mbyIsImxpbmsiLCJ0aXRsZSIsIk1hcmtlciIsInNoYXBlIiwiaWNvbiIsInpJbmRleCIsInNldENvbnRlbnQiLCJjcmVhdGVQcm9wZXJ0eU1hcmtlciIsImNvbG9yIiwibm90IiwibmV4dEFycm93IiwicHJldkFycm93IiwiYXV0b3BsYXkiLCJzb2xvTWFwIiwicmVmcmVzaE1hcCIsIiRtYXBtb2RhbCIsImFsZXJ0IiwicmVzZXRNYXAiLCJhbWFyayIsIm1hcmtlcmljb24iLCJTaXplIiwiUG9pbnQiLCJhbmNob3IiLCJteUxpc3RlbmVyIiwiZm91bmQiLCJjdXJyZW50Wm9vbSIsInNob3dWaXNpYmxlTWFya2VycyIsImNsb3NlS3JJbmZvd2luZG93Iiwia2lja01hcCIsIm1hcF9tb2RhbCIsIiRzb2xvVHJpZ2dlciIsIm9uZSIsIiRtdHJpZ2dlciIsIm15S3Jyb3V0ZSIsImRpcmVjdGlvbnNEaXNwbGF5IiwiZGlyZWN0aW9uc1Zpc2libGUiLCJyb3V0ZU1hcCIsImRlc3RpbmF0aW9uIiwicm91dGVNYXJrZXJzIiwicm91dGVTdG9wUG9pbnRzIiwiZGV0b3VyIiwiZGlyZWN0aW9uc1BhbmVsIiwiZGlyZWN0aW9uc1NlcnZpY2UiLCJLcnJvdXRlIiwiRGlyZWN0aW9uc1NlcnZpY2UiLCJhZGRSb3V0ZU1hcmtlciIsImNhbGNSb3V0ZSIsImZyb21fYWRkcmVzcyIsIlRyYXZlbE1vZGUiLCJCSUNZQ0xJTkciLCJEUklWSU5HIiwiV0FMS0lORyIsInJlcXVlc3QiLCJ3YXlwb2ludHMiLCJ0cmF2ZWxNb2RlIiwiYXZvaWRIaWdod2F5cyIsImF2b2lkVG9sbHMiLCJyb3V0ZSIsInN0YXR1cyIsIkRpcmVjdGlvbnNTdGF0dXMiLCJPSyIsInNldERpcmVjdGlvbnMiLCJyZXNldFJvdXRlIiwiY2xlYXJSb3V0ZU1hcmtlcnMiLCJteU9wdGlvbnMiLCJEaXJlY3Rpb25zUmVuZGVyZXIiLCJzZXRQYW5lbCIsIk1hcmtlckltYWdlIiwibGF0TG5nIiwic3RvcG92ZXIiLCJjbGVhcldheXBvaW50cyIsImFkZHJlc3NTdHJpbmciLCJjb29yZCIsImFkZHJlc3MiLCJqc29uZGF0YSJdLCJzb3VyY2VSb290IjoiIn0=