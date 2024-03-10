(self["webpackChunkkr"] = self["webpackChunkkr"] || []).push([["site"],{

/***/ "./node_modules/is-marker-clusterer/src/markerclusterer.js":
/*!*****************************************************************!*\
  !*** ./node_modules/is-marker-clusterer/src/markerclusterer.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
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
MarkerClusterer.prototype.draw = function () {};

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
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(p1.lat() * Math.PI / 180) * Math.cos(p2.lat() * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
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
  var mapBounds = new google.maps.LatLngBounds(this.map_.getBounds().getSouthWest(), this.map_.getBounds().getNorthEast());
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
      style.push('height:' + (this.height_ - this.anchor_[0]) + 'px; padding-top:' + this.anchor_[0] + 'px;');
    } else {
      style.push('height:' + this.height_ + 'px; line-height:' + this.height_ + 'px;');
    }
    if (typeof this.anchor_[1] === 'number' && this.anchor_[1] > 0 && this.anchor_[1] < this.width_) {
      style.push('width:' + (this.width_ - this.anchor_[1]) + 'px; padding-left:' + this.anchor_[1] + 'px;');
    } else {
      style.push('width:' + this.width_ + 'px; text-align:center;');
    }
  } else {
    style.push('height:' + this.height_ + 'px; line-height:' + this.height_ + 'px; width:' + this.width_ + 'px; text-align:center;');
  }
  var txtColor = this.textColor_ ? this.textColor_ : 'black';
  var txtSize = this.textSize_ ? this.textSize_ : 11;
  var fontFamily = this.fontFamily_ ? this.fontFamily_ : 'Arial,sans-serif';
  var fontWeight = this.fontWeight_ ? this.fontWeight_ : '400';
  style.push('cursor:pointer; top:' + pos.y + 'px; left:' + pos.x + 'px; color:' + txtColor + '; position:absolute; font-size:' + txtSize + 'px; font-family:' + fontFamily + '; font-weight:' + fontWeight + ';');
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

/***/ }),

/***/ "./node_modules/jquery-bar-rating/jquery.barrating.js":
/*!************************************************************!*\
  !*** ./node_modules/jquery-bar-rating/jquery.barrating.js ***!
  \************************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
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
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
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
          $fractional = $a.length ? $a[getData('userOptions').reverse ? 'prev' : 'next']() : $all[getData('userOptions').reverse ? 'last' : 'first']();
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
    onSelect: function onSelect(value, text, event) {},
    // callback fired when a rating is selected
    onClear: function onClear(value, text) {},
    // callback fired when a rating is cleared
    onDestroy: function onDestroy(value, text) {} // callback fired when a widget is destroyed
  };

  $.fn.barrating.BarRating = BarRating;
});

/***/ }),

/***/ "./src/media/com_knowres/js/src/site/app.js":
/*!**************************************************!*\
  !*** ./src/media/com_knowres/js/src/site/app.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var jQuery = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * @package    Know Reservations
 * @subpackage Site JS
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */



let lang;
let searchData = [];
let searchDone = false;
let calendarLoaded = false;
let savedwidth = false;
let large;
let resized = false;
(function ($) {
  $(function () {
    Foundation.addToJquery();
    $(document).foundation();
    lang = $('#kr-lang').data('krlang');
    checkScreenWidth();
    $(window).on("resize", function () {
      checkScreenWidth();
    });
    const $ctrigger = $('#kr-page-geriatric-calendar-trigger');
    if ($ctrigger.length && !calendarLoaded) {
      loadCalendar($ctrigger.data('pid'), $ctrigger.data('target'));
      calendarLoaded = true;
    }
    $(document).on('submit', '.ajaxform', function (e) {
      e.preventDefault();
      const $form = $(this);
      $.ajax({
        type: 'POST',
        url: $form.attr('action') + '&lang=' + lang,
        data: $form.serialize(),
        dataType: 'json',
        success: function (result) {
          if (result.success) {
            if (result.data) {
              formResponse($form.attr('id'), result.data);
            } else {
              window.location.href = '/';
            }
          } else {
            $('.kr-ajax-modal-error-message').html(result.message);
            const $modal = new Foundation.Reveal($('#KrAjaxModalError'));
            $modal.open();
          }
        },
        error: function () {
          $('.kr-ajax-modal-error-message').html('Sorry an error has occurred, please try again');
          const $modal = new Foundation.Reveal($('#KrAjaxModalError'));
          $modal.open();
        }
      });
    }).on('show.zf.dropdown', '#kr-searchregion-drop', function () {
      $("#kr-searchregion-drop").css('opacity', '1');
    }).on('show.zf.dropdown', '#kr-searchguest-drop', function () {
      $('#kr-searchguest-drop').css('opacity', '1');
    }).on('hide.zf.dropdown', '#kr-searchregion-drop, #kr-searchguest-drop', function () {
      $('body').css('opacity', '1');
    }).on('hide.zf.dropdown', '#kr-quote-form', function () {
      $('#guests').trigger('change');
    }).on('open.zf.reveal', '.kr-ajax-modal[data-reveal]', function (e) {
      e.preventDefault();
      const modalid = "#" + $(this).attr('id');
      if (!$.trim($(modalid).html()).length) {
        const ajaxurl = $(this).data('ajaxurl');
        if (ajaxurl) {
          $.ajax({
            type: 'POST',
            url: ajaxurl,
            success: function (content) {
              $(modalid).html(content).trigger('resizeme.zf.reveal');
              $(modalid).foundation();
            }
          });
        }
      }
    }).on('click', '.favspan', function (e) {
      e.preventDefault();
      const pid = $(this).data('property');
      const bar = $('.kr-searchbar a.is-active').data('bar');
      $.ajax({
        type: 'POST',
        url: '/index.php?option=com_knowres&task=properties.favourite&lang=' + lang,
        data: {
          'property_id': pid
        },
        dataType: 'json',
        success: function (result) {
          if (result.success) {
            getProperties(bar);
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
      $(this).parent().children('li.checkbox').toggle();
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
        const pid = $(this).data('pid');
        loadCalendar(pid, '#calendar.tabs-panel');
        calendarLoaded = true;
      }
    }).on('mouseover', '#kr-thumb img', function () {
      let property = $(this).parent().data('id');
      if (property) {
        let target = '.thumboverview' + property;
        $('#pinfo').html($(target).html());
      }
    });
    let $props = $('.kr-properties');
    if ($props.length && !searchDone) {
      getProperties($props.data('bar'));
    }
    let $tabs = $('.tabs');
    if ($('#kr-property-tabs').length && !calendarLoaded) {
      $tabs.find('a').each(function () {
        if ($(this).attr('href') === "#calendar") {
          const pid = $(this).data('pid');
          loadCalendar(pid, '#calendar.tabs-panel');
          calendarLoaded = true;
        }
      });
    }
  });
  $.event.special.touchstart = {
    setup: function (_, ns, handle) {
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
    setup: function (_, ns, handle) {
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
      url: '/index.php?option=com_knowres&task=property.geriatric&lang=' + lang,
      dataType: 'html',
      data: {
        'pid': pid
      },
      success: function (data) {
        $(target).append(data);
      }
    });
  }
  function formResponse(id, data) {
    if (data.hasOwnProperty('redirect')) {
      window.location.replace(data.redirect);
    } else if (id === 'kr-form-payment') {
      if (data.hasOwnProperty('html')) {
        let $modal = $('#kr-gateway-modal');
        $modal.html(data.html).trigger('resizeme.zf.reveal');
        $modal.foundation('open');
      } else {
        window.location.href = '/';
      }
    } else if (id === 'kr-form-mailchimp') {
      $('#response2').html(data);
    }
  }
  function getProperties(bar) {
    let action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    let action_value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    $.ajax({
      url: '/index.php?option=com_knowres&view=properties&format=raw&lang=' + lang,
      type: 'POST',
      data: {
        'bar': bar,
        'action': action,
        'action_value': action_value
      },
      dataType: 'json',
      success: function (data) {
        if (!data) {
          window.location.reload();
          return;
        }
        const vals = ['list', 'grid', 'thumb', 'favs', 'map'];
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
    let action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    if (response) {
      $('#kr-properties-data').empty().fadeIn('slow').html(response['items']).foundation();
 //     $('#kr-properties-filter-heading').html(response['heading']);
      $('.kr-pager').html(response['pagination']);
      if (action !== 'thumb') {
        $('.kr-pager.bottom').html(response['pagination']);
      } else {
        $('.kr-pager.bottom').empty();
      }
      $("#kr-offcanvas-properties-filter").html(response['filters']);
      $("#kr-offcanvas-properties-sortby").html(response['sortby']);
      //            $("#kr-offcanvas-top-search").html(response['search']);

      if (response['search'].length && $('#arrivaldsp').length) {
        $('body').trigger('initajaxsearch');
      }
      $('.sidebar .kr-filters ul.filter-sort-list li.head').each(function () {
        if ($(this).hasClass('active')) {
          $(this).parent().children('li.checkbox').show();
        } else {
          $(this).parent().children('li.checkbox').hide();
        }
      });
      if (action === 'page') {
        window.scrollTo(0, 0);
      }
    }
  }
  function setActiveMenu(bar) {
    const searchbar = $('.kr-searchbar').find('.button');
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
    } else return false;
  }
  function checkScreenWidth() {
    resized = false;
    if (screenWidthHasChanged() && searchData['items'] && !resized) {
      setSearchData(searchData);
      resized = true;
    }
  }
  $.event.special.touchstart = {
    setup: function (_, ns, handle) {
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
    setup: function (_, ns, handle) {
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

/***/ }),

/***/ "./src/media/com_knowres/js/src/site/confirm.js":
/*!******************************************************!*\
  !*** ./src/media/com_knowres/js/src/site/confirm.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var jQuery = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * @package    Know Reservations
 * @subpackage Site JS
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */



(function ($) {
  if (!window.location.origin) window.location.origin = window.location.protocol + "//" + window.location.host;
  let lang = $("#kr-lang").data('krlang');
  let myConfirm, $myTask;
  class Krconfirm {
    constructor($form) {
      this.form = $form;
      this.init();
    }
    init() {
      this.updateQuote(this.form);
    }
    updateQuote($form) {
      $myTask = $('#mytask');
      $myTask.val('confirm.compute');
      jQuery.ajax({
        type: 'POST',
        url: 'index.php?option=com_knowres&task=confirm.compute&lang=' + lang,
        data: $form.serializeArray(),
        dataType: 'json',
        success: function (result) {
          $myTask.val('confirm.payment');
          if (result.success) {
            const data = result.data;
            if (data.hasOwnProperty('redirect')) {
              window.location.replace(data.redirect);
            }
            let div;
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
            const $modal = new Foundation.Reveal($('#KrAjaxModalError'));
            $modal.open();
          }
        }
      });
    }
  }
  $(function () {
    let $element = $('#kr-form-confirm');
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
    let result = true;
    const test = document.getElementById('agreecheck');
    const testc = document.getElementById('agreecheckc');
    const testt = document.getElementById('agreecheckt');

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
      const $modal = new Foundation.Reveal($('#errorModal'));
      $modal.open();
      return false;
    }
  }
})(jQuery);

/***/ }),

/***/ "./src/media/com_knowres/js/src/site/dobentry.js":
/*!*******************************************************!*\
  !*** ./src/media/com_knowres/js/src/site/dobentry.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var jQuery = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * @package    Know Reservations
 * @subpackage Site JS
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */



if (!window.location.origin) {
  window.location.origin = window.location.protocol + "//" + window.location.host;
}
(function ($) {
  let myKrDobEntry;
  let today;
  let key = {
    BACKSPACE: 8
  };
  let settings = {
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
  class KrDobEntry {
    constructor($element, options) {
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
    static getYmd(date) {
      const m = date.getMonth() + 1;
      const d = date.getDay();
      return date.getFullYear() + '-' + (m < 10 ? '0' : '') + m + '-' + (d < 10 ? '0' : '') + d;
    }
    static getYmdObject(date) {
      return date.year + '-' + date.month + '-' + date.day;
    }
    addEntryFields() {
      let dobfield = this;
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
    afterPaste(target) {
      if (this.parseDate($(target).val())) {
        this.setDate($(target).val());
      }
    }
    buildField(name, index) {
      let krdobentry = this;
      let input = new KrDobInput({
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
    buildUi() {
      let dobfield = this;
      this.wrapper = $(this.$element.wrap('<span class="jq-dte" />').parent()[0]);
      this.inner = $('<span class="jq-dte-inner" />');
      this.addEntryFields();
      this.errorbox = $('<span class="jq-dte-errorbox" />').hide();
      this.inner.on('paste', 'input', function (e) {
        let input = this;
        setTimeout(function () {
          dobfield.afterPaste(input, e);
        }, 2);
      });
      this.wrapper.append(this.inner, this.errorbox);
      this.setFieldWidths();
      this.$element.hide();
    }
    checkDocument(dob, childdob, classname) {
      let elements = document.getElementsByClassName(classname);
      for (let i = 0; i < elements.length; i++) {
        if (new Date(dob) > new Date(childdob)) {
          elements[i].style.display = 'none';
        } else {
          elements[i].style.display = 'block';
        }
      }
    }
    clear() {
      this.clearError('');
      this.setDate('');
    }
    clearError() {
      delete this.error_text;
      this.showError();
    }
    destroy() {
      this.$element.show();
      this.$element.css('display', '');
      this.wrapper.find('span').remove();
      this.$element.unwrap();
      this.$element.removeData('datetextentry');
      delete this.inner;
      delete this.wrapper;
      delete this.$element;
    }
    focus() {
      this.fields[0].setFocus(true);
    }
    focusFieldBefore(input) {
      const index = input.index;
      if (index < 1) {
        return;
      }
      this.fields[index].yieldFocus();
      this.fields[index - 1].setFocus(true);
      // let next = this.fields[index - 1];
      // let val = next.get();
      // next.setFocus(false);
    }

    focusFieldAfter(input) {
      const index = input.index;
      if (index > 1) {
        return;
      }
      this.fields[index].yieldFocus();
      this.fields[index + 1].setFocus(true);
    }
    focusIn() {
      this.wrapper.addClass('focus');
    }
    focusOut() {
      if (settings.on_blur) {
        setTimeout(function () {
          self.widgetFocusLost();
        }, 2);
      }
      this.wrapper.removeClass('focus');
    }
    getDate() {
      return this.day_value && this.month_value && this.year_value ? {
        day: this.day_value,
        month: this.month_value,
        year: this.year_value
      } : null;
    }
    init() {
      if (!settings.min_year) settings.min_year = '1910';
      this.buildUi();
      this.setDate(this.$element.attr('value'));
      this.proxyLabelClicks();
    }
    parseDate(text) {
      return this.parseIsoDate(text);
    }
    parseIsoDate(text) {
      return text && text.match(/^(\d\d\d\d)-(\d\d)-(\d\d)/) ? {
        day: RegExp.$3,
        month: RegExp.$2,
        year: RegExp.$1
      } : null;
    }
    proxyLabelClicks() {
      let dobfield = this;
      let id = this.$element.attr('id');
      if (!id) {
        return;
      }
      $('label[for=' + id + ']').click(function () {
        dobfield.focus();
      });
    }
    setDate(new_date) {
      let dobfield = this;
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
    setError(error_text) {
      this.error_text = error_text;
      this.showError();
    }
    setFieldWidths() {
      let available = this.$element.width() - 2;
      let total = settings.field_width_year + settings.field_width_sep + settings.field_width_month + settings.field_width_sep + settings.field_width_day;
      this.input_day.setWidth(Math.floor(settings.field_width_day * available / total));
      this.input_month.setWidth(Math.floor(settings.field_width_month * available / total));
      this.input_year.setWidth(Math.floor(settings.field_width_year * available / total));
    }
    setReadonly(mode) {
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
    showError() {
      let error_text = this.widgetErrorText();
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
        let x_offset = this.inner.outerWidth() + settings.errorbox_x + 'px';
        let y_offset = settings.errorbox_y + 'px';
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
    validate(current_input) {
      this.$element.val('');
      if (current_input) {
        const type = current_input.name;
        try {
          if (type === 'day') {
            this.validateDay();
          } else if (type === 'month') {
            this.validateMonth();
          } else if (type === 'year') {
            this.validateYear();
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
            let date_str = KrDobEntry.getYmdObject(this.getDate());
            this.$element.val(date_str);
            if (this.$element.data('childdob')) {
              this.checkDocument(date_str, this.$element.data('childdob'), this.$element.attr('id'));
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
    validateCompleteDate() {
      const date_obj = this.getDate();
      const date_iso = KrDobEntry.getYmdObject(date_obj);
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
        date_obj.date = new Date(parseInt(date_obj.year, 10), parseInt(date_obj.month, 10) - 1, parseInt(date_obj.day, 10));
        this.custom_validation(date_obj);
      }
    }
    validateDay() {
      let opt = settings;
      let input = this.input_day;
      this.day_value = undefined;
      let text = input.get();
      if (text === '' || text === '0' && input.has_focus) {
        return;
      }
      if (text.match(/\D/)) {
        throw opt.E_DAY_NAN;
      }
      let num = parseInt(text, 10);
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
    validateDaysInMonth() {
      const day = parseInt(this.day_value, 10);
      const month = parseInt(this.month_value, 10);
      const year = parseInt(this.year_value, 10);
      if (day < 1 || month < 1) {
        return;
      }
      let max = settings.days_in_month[month - 1];
      let msg = settings.E_BAD_DAY_FOR_MONTH;
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
    validateMonth() {
      let input = this.input_month;
      this.month_value = undefined;
      let text = input.get();
      if (text === '' || text === '0' && input.has_focus) {
        return;
      }
      if (text.match(/\D/)) {
        throw settings.E_MONTH_NAN;
      }
      let num = parseInt(text, 10);
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
    validateYear() {
      const input = this.input_year;
      this.year_value = undefined;
      let text = input.get();
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
        const num = parseInt(text, 10);
        if (settings.min_year && num < settings.min_year) {
          throw settings.E_YEAR_TOO_SMALL.replace(/%y/, settings.min_year);
        }
      }
      this.year_value = text;
    }
    widgetErrorText() {
      let error_text = '';
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
    widgetFocusLost() {
      if (settings.on_blur && !this.wrapper.is('.focus')) {
        settings.onBlur();
      }
    }
  }
  class KrDobInput {
    constructor(options) {
      const input = this;
      this.dobfield = options.krdobentry;
      this.name = options.name;
      this.index = options.index;
      this.hint_text = options.hint_text;
      this.has_focus = false;
      this.empty = true;
      this.$input = $('<input type="text" value="" />').addClass('jq-dte-' + this.name).attr('aria-label', '' + " (" + this.hint_text + ")").focus($.proxy(input, 'focus')).blur($.proxy(input, 'blur')).keydown(function (e) {
        setTimeout(function () {
          input.keydown(e);
        }, 2);
      }).keyup(function (e) {
        setTimeout(function () {
          input.keyup(e);
        }, 2);
      });
    }
    blur() {
      this.has_focus = false;
      this.dobfield.focusOut();
      this.show_hint();
      this.dobfield.validate(this);
    }
    clearError() {
      delete this.error_text;
      this.$input.removeClass('error');
    }
    focus() {
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
    get() {
      let val = this.$input.val();
      return val === this.hint_text ? '' : val;
    }
    isDigitKey(e) {
      let keycode = e.which;
      return keycode >= 48 && keycode <= 57 || keycode >= 96 && keycode <= 105;
    }
    keydown() {
      // Ignore keyup events that arrive after focus moved to next field
      this.key_is_down = true;
    }
    keyup(e) {
      if (!this.key_is_down) {
        return;
      }
      // Handle Backspace - shifting focus to previous field if required
      let keycode = e.which;
      if (keycode === key.BACKSPACE && this.empty) {
        return this.dobfield.focusFieldBefore(this);
      }
      let text = this.get();
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
        let want = this.name === 'year' ? 4 : 2;
        if (this.isDigitKey(e) && text.length === want) {
          this.dobfield.focusFieldAfter(this);
        }
      }
    }
    left() {
      return this.$input.position().left;
    }
    set(new_value) {
      this.$input.val(new_value).removeClass('hint');
      if (!this.has_focus) {
        this.show_hint();
      }
      this.empty = new_value === '';
      this.clearError();
      return this;
    }
    setError(text) {
      this.error_text = text;
      this.$input.addClass('error');
      this.dobfield.showError();
    }
    setFocus(select_all) {
      let $input = this.$input;
      $input.focus();
      if (select_all) {
        $input.select();
      } else {
        $input.val($input.val());
      }
      return this;
    }
    setWidth(new_width) {
      this.$input.width(new_width);
      return this;
    }
    show_hint() {
      if (this.get() === '' && typeof this.hint_text === 'string') {
        this.$input.val(this.hint_text).addClass('hint');
      }
      return this;
    }
    yieldFocus() {
      this.$input.blur();
    }
  }
  $(document).ready(function () {
    $('.dobissue').each(function () {
      myKrDobEntry = new KrDobEntry($(this), {});
    });
  });
})(jQuery);

/***/ }),

/***/ "./src/media/com_knowres/js/src/site/guestdata.js":
/*!********************************************************!*\
  !*** ./src/media/com_knowres/js/src/site/guestdata.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var jQuery = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
// noinspection DuplicatedCode

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
      const howtoarrive = document.getElementById('howtoarrive');
      let arrivalmeans = howtoarrive.getAttribute('data-means');
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
    let x = document.getElementsByClassName('amitem');
    for (let i = 0; i < x.length; i++) {
      x[i].classList.remove('active');
    }
    document.getElementById('air-data').style.display = 'none';
    document.getElementById('train-data').style.display = 'none';
    document.getElementById('auto-data').style.display = 'none';
    document.getElementById('other-data').style.display = 'none';
    let arrivaldata = value + '-data';
    document.getElementById(arrivaldata).style.display = 'block';
    document.getElementById(value).classList.add('active');
    document.getElementById('jform_arrival_means').value = value;
  }
})(jQuery);

/***/ }),

/***/ "./src/media/com_knowres/js/src/site/map.js":
/*!**************************************************!*\
  !*** ./src/media/com_knowres/js/src/site/map.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var jQuery = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * @package    Know Reservations
 * @subpackage Site JS
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */



const lang = "en";
(function ($) {
  const markershape = {
    type: 'poly',
    coords: [1, 1, 1, 32, 37, 32, 32, 1]
  };
  let myKrmap;
  let mapData = false;
  let map;
  let mapZoom;
  let infoWindow;
  let infoWindow2;
  let bounds;
  let propertydiv;
  let propertyicon;
  let mc;
  //	let bicon;
  //	let hicon;
  //	let large_slideshow = false;

  let settings = {
    propertyMarkers: [],
    filterIds: [],
    mapMarkers: [],
    mapTypeId: '',
    mapZoom: 0,
    mapMaxZoom: 20,
    mapType: '',
    mapId: '',
    markerColor: 'red'
  };
  class Krmap {
    constructor(settings) {
      this.settings = settings;

      //Initialise map options
      this.gmOptions = {
        scrollwheel: false,
        zoom: this.settings.mapZoom,
        maxZoom: this.settings.mapMaxZoom,
        mapTypeId: this.settings.mapTypeId,
        streetViewControl: false
      };
      mapZoom = this.settings.mapZoom;
      this.gmarkers = [];
      this.count = 0;
      this.initMap();
    }
    static closeKrInfowindow() {
      $('#kr-infowindow').hide();
      infoWindow.close();
      infoWindow2.close();
    }

    // only show visible markers
    static showVisibleMarkers(markers) {
      let bounds = map.getBounds();
      let count = 0;
      for (let d = 0; d < markers.length; d++) {
        let marker = markers[d];
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

    // Check Markers array for duplicate position and offset a little
    checkDuplicate(current) {
      if (this.gmarkers.length > 0) {
        let dups = 0;
        for (let index = 0; index < this.gmarkers.length; index++) {
          let pos = this.gmarkers[index].getPosition();
          if (current.equals(pos)) {
            dups++;
            let a = 360.0 / dups;
            let newLat = pos.lat() + -.00002 * Math.cos(+a * dups / 180 * Math.PI); //x
            let newLng = pos.lng() + -.00000 * Math.sin(+a * dups / 180 * Math.PI); //Y
            current = new google.maps.LatLng(newLat, newLng);
          }
        }
      }
      return current;
    }
    checkZoom() {
      if (mapZoom > 0) {
        let mylistener = map.addListener('idle', function () {
          if (mapZoom > 0 && map.getZoom() !== mapZoom) {
            map.setZoom(mapZoom);
            mylistener.remove();
          }
        });
      }
    }
    clusterMap() {
      const mcOptions = {
        gridSize: 20,
        ignoreHiddenMarkers: true,
        imagePath: '/media/com_knowres/images/markerclusterer/m'
      };
      this.setPropertyMarkers();
      this.setMapMarkers();
      for (let d = 0; d < this.gmarkers.length; d++) {
        let marker = this.gmarkers[d];
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
    createMap() {
      map = new google.maps.Map(document.getElementById(this.settings.mapId), this.gmOptions);
      infoWindow = new google.maps.InfoWindow();
      infoWindow2 = new google.maps.InfoWindow();
      bounds = new google.maps.LatLngBounds();
    }

    // Create the marker and set up the event window
    createMapMarker(point, html, image, boxinfo, link, title) {
      let marker = new google.maps.Marker({
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
    createPropertyMarker(point, html, boxinfo, link, title, color, id, image, pid) {
      let marker = new google.maps.Marker({
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
      // if (propertydiv !== null) {
      // 	google.maps.event.addDomListener(propertydiv, 'mouseover', function () {
      // 		marker.setIcon(
      // 			hicon
      // 		)
      // 		marker.setZIndex(marker.getZIndex() + 1000);
      // 	});
      // 	google.maps.event.addDomListener(propertydiv, 'mouseout', function () {
      // 		marker.setIcon(
      // 			bicon
      // 		)
      // 		marker.setZIndex(marker.getZIndex() - 1000);
      // 	});
      // }

      // marker.addListener('mouseover', (function () {
      // 	marker.setIcon(
      // 		hicon
      // 	)
      // 	marker.setZIndex(marker.getZIndex() + 1000);
      // }));
      //
      // marker.addListener('mouseout', (function () {
      // 	marker.setIcon(
      // 		bicon
      // 	)
      // 	marker.setZIndex(marker.getZIndex() - 1000);
      // }));

      // google.maps.event.addListener(marker, 'click', function() {
      // 	marker.setVisible(false); // maps API hide call
      // });

      marker.addListener('mousedown', function (boxinfo) {
        return function () {
          infoWindow.close();
          $('#kr-infowindow').hide();
          infoWindow.setContent(html);
          infoWindow.open(map, marker);
          $.ajax({
            type: "POST",
            url: '/index.php?option=com_knowres&task=property.mapinfowindow&lang=' + lang,
            data: {
              id: parseInt(boxinfo)
            },
            success: function (data) {
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
    initMap() {
      this.createMap();
      if (this.settings.mapType === 'cluster') {
        this.clusterMap();
      } else {
        this.soloMap();
      }
    }

    // Reset map to initial state
    refreshMap($mapmodal) {
      if (this.settings.mapType === 'solo') return;
      let self = this;
      jQuery.ajax({
        url: '/index.php?option=com_knowres&task=properties.refreshmap&lang=' + lang,
        type: 'POST',
        dataType: 'json',
        success: function (result) {
          if (result.success) {
            self.settings.filterIds = result.data.filterIds;
            for (let d = 0; d < self.gmarkers.length; d++) {
              let marker = self.gmarkers[d];
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
    resetMap() {
      infoWindow.close();
      infoWindow2.close();
      $('#kr-infowindow').hide();
      map.fitBounds(bounds);
      map.setCenter(bounds.getCenter());
    }

    // loop to set map markers
    setMapMarkers() {
      let point;
      let amark;
      for (let d = 0; d < this.settings.mapMarkers.length; d++) {
        amark = this.settings.mapMarkers[d];
        let markericon = {
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

    // setMarkerIcons() {
    // 	bicon = {
    // 		path:         '/media/com_knowres/assets/images/svg',
    // 		fillColor:    this.settings.markerColor,
    // 		fillOpacity:  0.9,
    // 		anchor:       new google.maps.Point(9, 35),
    // 		strokeColor:  "#efefef",
    // 		strokeWeight: 0.5,
    // 		scale:        1
    // 	};
    // 	hicon = {
    // 		path:         '/media/com_knowres/assets/images/svg',
    // 		fillColor:    "green",
    // 		fillOpacity:  1,
    // 		anchor:       new google.maps.Point(9, 35),
    // 		strokeColor:  "#efefef",
    // 		strokeWeight: 0.8,
    // 		scale:        1.5
    // 	};
    // }

    // loop to set property markers
    setPropertyMarkers() {
      let point;
      let amark;
      for (let d = 0; d < this.settings.propertyMarkers.length; d++) {
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
        this.createPropertyMarker(point, amark['html'], amark['boxinfo'], amark['link'], amark['title'], amark['color'], amark['id'], propertyicon, amark['pid']);
      }
    }
    soloMap() {
      this.setPropertyMarkers();
      this.setMapMarkers();
      map.fitBounds(bounds);
      map.setCenter(bounds.getCenter());
      //			this.checkZoom();

      if (this.settings.mapMarkers.length > 0) {
        const self = this;
        let myListener = google.maps.event.addListener(map, 'idle', function () {
          let found = 0;
          let currentZoom = map.getZoom();
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
  }
  $(function () {
    let $mapmodal;
    $('body').on('click', '.map-trigger', function (e) {
      e.preventDefault();
      if (mapData) {
        myKrmap.refreshMap($mapmodal);
      } else {
        kickMap($(this));
        $mapmodal = $('#kr-search-map-modal');
        $mapmodal.foundation('open');
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
        url: '/index.php?option=com_knowres&task=properties.mapsession&lang=' + lang,
        success: function () {
          $('.kr-searchbar .button.map').removeClass('is-active');
          $('.kr-searchbar .button.list').addClass('is-active');
          return true;
        }
      });
    }).on('open.zf.reveal', '#kr-search-map-modal', function (e) {
      e.preventDefault();
      $('#kr-search-map-full').height($('#kr-search-map-modal').height());
      google.maps.event.trigger(map, "resize");
      $.ajax({
        type: "POST",
        url: '/index.php?option=com_knowres&task=properties.mapsession&lang=' + lang,
        data: {
          map_modal: '1'
        },
        success: function () {
          return true;
        }
      });
    });

    // Doesn't trigger if included above ??
    if (!mapData) {
      const $soloTrigger = $('#kr-map-solo-trigger');
      $soloTrigger.one('click', function () {
        kickMap($soloTrigger);
      });
      if (window.location.href.indexOf('#map') !== -1 && $soloTrigger.length) {
        kickMap($soloTrigger);
      }
    }

    // Test for force map
    const $trigger = $('.map-trigger');
    if ($trigger.data('forcemap')) {
      $trigger.trigger('click');
    }
    function kickMap($elem) {
      const type = $elem.data('type');
      let pid = 0;
      if (type === 'solo') {
        pid = $elem.data('pid');
      }
      jQuery.ajax({
        url: '/index.php?option=com_knowres&task=properties.mapdata&pid=' + pid + '&lang=' + lang,
        type: "POST",
        dataType: "json",
        success: function (result) {
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

/***/ }),

/***/ "./src/media/com_knowres/js/src/site/route.js":
/*!****************************************************!*\
  !*** ./src/media/com_knowres/js/src/site/route.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var jQuery = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * @package    Know Reservations
 * @subpackage Site JS
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */



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
    lat: "",
    lng: "",
    name: "",
    icon: "",
    detour: "",
    mapZoom: 9,
    mapMaxZoom: 20,
    mapTypeId: "roadmap",
    mapId: "kr-map-route",
    directionsPanel: "kr-directions-panel",
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
        map: routeMap,
        icon: this.settings.detour
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
    init() {
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
      const image = new google.maps.MarkerImage(this.settings.icon);
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
      let addressString = jQuery("#jform_property_street").val() + ", " + jQuery('#jform_town_id').find(":selected").text() + " " + jQuery("#jform_property_postcode").val() + ", " + jQuery('#jform_region_id').find(":selected").text() + " " + jQuery('#jform_country_id').find(":selected").text();
      let url = 'index.php?option=com_knowres&task=property.geocode';
      let coord = [];
      jQuery.ajax({
        type: "POST",
        url: url,
        data: {
          address: addressString
        },
        dataType: "json",
        success: function (jsondata) {
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
})(jQuery);

/***/ }),

/***/ "./webpack.build.site.js":
/*!*******************************!*\
  !*** ./webpack.build.site.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var npm_jquery_bar_rating_jquery_barrating__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! npm/jquery-bar-rating/jquery.barrating */ "./node_modules/jquery-bar-rating/jquery.barrating.js");
/* harmony import */ var npm_jquery_bar_rating_jquery_barrating__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(npm_jquery_bar_rating_jquery_barrating__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var npm_is_marker_clusterer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! npm/is-marker-clusterer */ "./node_modules/is-marker-clusterer/src/markerclusterer.js");
/* harmony import */ var npm_is_marker_clusterer__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(npm_is_marker_clusterer__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var mediajs_site_app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mediajs/site/app */ "./src/media/com_knowres/js/src/site/app.js");
/* harmony import */ var mediajs_site_app__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(mediajs_site_app__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var mediajs_site_confirm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! mediajs/site/confirm */ "./src/media/com_knowres/js/src/site/confirm.js");
/* harmony import */ var mediajs_site_confirm__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(mediajs_site_confirm__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var mediajs_site_dobentry__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! mediajs/site/dobentry */ "./src/media/com_knowres/js/src/site/dobentry.js");
/* harmony import */ var mediajs_site_dobentry__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(mediajs_site_dobentry__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var mediajs_site_guestdata__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! mediajs/site/guestdata */ "./src/media/com_knowres/js/src/site/guestdata.js");
/* harmony import */ var mediajs_site_guestdata__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(mediajs_site_guestdata__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var mediajs_site_map__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! mediajs/site/map */ "./src/media/com_knowres/js/src/site/map.js");
/* harmony import */ var mediajs_site_map__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(mediajs_site_map__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var mediajs_site_route__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! mediajs/site/route */ "./src/media/com_knowres/js/src/site/route.js");
/* harmony import */ var mediajs_site_route__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(mediajs_site_route__WEBPACK_IMPORTED_MODULE_7__);
// KR APP JS Files



//import 'mediajs/site/combogeo';





// import './js/src/krapp/stripe';

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["common"], () => (__webpack_exec__("./webpack.build.site.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SUFBSSxFQUFNLE1BQU07UUFDaEJsVCxHQUFHLEVBQU9BLEdBQUc7UUFDYjJNLElBQUksRUFBTTtVQUFDc2MsT0FBTyxFQUFFRjtRQUFhLENBQUM7UUFDbEMzVixRQUFRLEVBQUUsTUFBTTtRQUNoQkMsT0FBTyxFQUFHLFNBQUFBLENBQVU2VixRQUFRLEVBQUU7VUFDN0JoZSxNQUFNLENBQUM2QyxJQUFJLENBQUNtYixRQUFRLEVBQUUsVUFBVXhjLEdBQUcsRUFBRUssR0FBRyxFQUFFO1lBQ3pDLElBQUltSyxHQUFHLEdBQUcsR0FBRyxHQUFHeEssR0FBRztZQUNuQnhCLE1BQU0sQ0FBQ2dNLEdBQUcsQ0FBQyxDQUFDbkssR0FBRyxDQUFDQSxHQUFHLENBQUM7WUFDcEJpYyxLQUFLLENBQUN0YyxHQUFHLENBQUMsR0FBR0ssR0FBRztZQUNoQm9jLE1BQU0sQ0FBQzdELFVBQVUsQ0FBQzBELEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRUEsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLEtBQUssQ0FBQztVQUNyRCxDQUFDLENBQUM7UUFDSDtNQUNELENBQUMsQ0FBQztJQUNILENBQUMsQ0FBQztFQUNILENBQUMsQ0FBQztBQUNILENBQUMsRUFBQzlkLE1BQU0sQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdQVDtBQUNnRDtBQUNmO0FBQ1A7QUFDMUI7QUFDOEI7QUFDQztBQUNDO0FBQ047QUFDRTtBQUM1QiIsInNvdXJjZXMiOlsid2VicGFjazovL2tyLy4vbm9kZV9tb2R1bGVzL2lzLW1hcmtlci1jbHVzdGVyZXIvc3JjL21hcmtlcmNsdXN0ZXJlci5qcyIsIndlYnBhY2s6Ly9rci8uL25vZGVfbW9kdWxlcy9qcXVlcnktYmFyLXJhdGluZy9qcXVlcnkuYmFycmF0aW5nLmpzIiwid2VicGFjazovL2tyLy4vc3JjL21lZGlhL2NvbV9rbm93cmVzL2pzL3NyYy9zaXRlL2FwcC5qcyIsIndlYnBhY2s6Ly9rci8uL3NyYy9tZWRpYS9jb21fa25vd3Jlcy9qcy9zcmMvc2l0ZS9jb25maXJtLmpzIiwid2VicGFjazovL2tyLy4vc3JjL21lZGlhL2NvbV9rbm93cmVzL2pzL3NyYy9zaXRlL2RvYmVudHJ5LmpzIiwid2VicGFjazovL2tyLy4vc3JjL21lZGlhL2NvbV9rbm93cmVzL2pzL3NyYy9zaXRlL2d1ZXN0ZGF0YS5qcyIsIndlYnBhY2s6Ly9rci8uL3NyYy9tZWRpYS9jb21fa25vd3Jlcy9qcy9zcmMvc2l0ZS9tYXAuanMiLCJ3ZWJwYWNrOi8va3IvLi9zcmMvbWVkaWEvY29tX2tub3dyZXMvanMvc3JjL3NpdGUvcm91dGUuanMiLCJ3ZWJwYWNrOi8va3IvLi93ZWJwYWNrLmJ1aWxkLnNpdGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBOcG0gdmVyc2lvbiBvZiBtYXJrZXJDbHVzdGVyZXIgd29ya3MgZ3JlYXQgd2l0aCBicm93c2VyaWZ5XG4gKiBEaWZmZXJlbmNlIGZyb20gdGhlIG9yaWdpbmFsIC0gYWRkcyBhIGNvbW1vbmpzIGZvcm1hdCBhbmQgcmVwbGFjZXMgd2luZG93IHdpdGggZ2xvYmFsIGFuZCBzb21lIHVuaXQgdGVzdFxuICogVGhlIG9yaWdpbmFsIGZ1bmN0aW9uYWxpdHkgaXQncyBub3QgbW9kaWZpZWQgZm9yIGRvY3MgYW5kIG9yaWdpbmFsIHNvdXJjZSBjaGVja1xuICogaHR0cHM6Ly9naXRodWIuY29tL2dvb2dsZW1hcHMvanMtbWFya2VyLWNsdXN0ZXJlclxuICovXG5cbi8qKlxuICogQG5hbWUgTWFya2VyQ2x1c3RlcmVyIGZvciBHb29nbGUgTWFwcyB2M1xuICogQHZlcnNpb24gdmVyc2lvbiAxLjBcbiAqIEBhdXRob3IgTHVrZSBNYWhlXG4gKiBAZmlsZW92ZXJ2aWV3XG4gKiBUaGUgbGlicmFyeSBjcmVhdGVzIGFuZCBtYW5hZ2VzIHBlci16b29tLWxldmVsIGNsdXN0ZXJzIGZvciBsYXJnZSBhbW91bnRzIG9mXG4gKiBtYXJrZXJzLlxuICogPGJyLz5cbiAqIFRoaXMgaXMgYSB2MyBpbXBsZW1lbnRhdGlvbiBvZiB0aGVcbiAqIDxhIGhyZWY9XCJodHRwOi8vZ21hcHMtdXRpbGl0eS1saWJyYXJ5LWRldi5nb29nbGVjb2RlLmNvbS9zdm4vdGFncy9tYXJrZXJjbHVzdGVyZXIvXCJcbiAqID52MiBNYXJrZXJDbHVzdGVyZXI8L2E+LlxuICovXG5cbi8qKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cblxuLyoqXG4gKiBBIE1hcmtlciBDbHVzdGVyZXIgdGhhdCBjbHVzdGVycyBtYXJrZXJzLlxuICpcbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTWFwfSBtYXAgVGhlIEdvb2dsZSBtYXAgdG8gYXR0YWNoIHRvLlxuICogQHBhcmFtIHtBcnJheS48Z29vZ2xlLm1hcHMuTWFya2VyPj19IG9wdF9tYXJrZXJzIE9wdGlvbmFsIG1hcmtlcnMgdG8gYWRkIHRvXG4gKiAgIHRoZSBjbHVzdGVyLlxuICogQHBhcmFtIHtPYmplY3Q9fSBvcHRfb3B0aW9ucyBzdXBwb3J0IHRoZSBmb2xsb3dpbmcgb3B0aW9uczpcbiAqICAgICAnZ3JpZFNpemUnOiAobnVtYmVyKSBUaGUgZ3JpZCBzaXplIG9mIGEgY2x1c3RlciBpbiBwaXhlbHMuXG4gKiAgICAgJ21heFpvb20nOiAobnVtYmVyKSBUaGUgbWF4aW11bSB6b29tIGxldmVsIHRoYXQgYSBtYXJrZXIgY2FuIGJlIHBhcnQgb2YgYVxuICogICAgICAgICAgICAgICAgY2x1c3Rlci5cbiAqICAgICAnem9vbU9uQ2xpY2snOiAoYm9vbGVhbikgV2hldGhlciB0aGUgZGVmYXVsdCBiZWhhdmlvdXIgb2YgY2xpY2tpbmcgb24gYVxuICogICAgICAgICAgICAgICAgICAgIGNsdXN0ZXIgaXMgdG8gem9vbSBpbnRvIGl0LlxuICogICAgICdhdmVyYWdlQ2VudGVyJzogKGJvb2xlYW4pIFdldGhlciB0aGUgY2VudGVyIG9mIGVhY2ggY2x1c3RlciBzaG91bGQgYmVcbiAqICAgICAgICAgICAgICAgICAgICAgIHRoZSBhdmVyYWdlIG9mIGFsbCBtYXJrZXJzIGluIHRoZSBjbHVzdGVyLlxuICogICAgICdtaW5pbXVtQ2x1c3RlclNpemUnOiAobnVtYmVyKSBUaGUgbWluaW11bSBudW1iZXIgb2YgbWFya2VycyB0byBiZSBpbiBhXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsdXN0ZXIgYmVmb3JlIHRoZSBtYXJrZXJzIGFyZSBoaWRkZW4gYW5kIGEgY291bnRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgaXMgc2hvd24uXG4gKiAgICAgJ3N0eWxlcyc6IChvYmplY3QpIEFuIG9iamVjdCB0aGF0IGhhcyBzdHlsZSBwcm9wZXJ0aWVzOlxuICogICAgICAgJ3VybCc6IChzdHJpbmcpIFRoZSBpbWFnZSB1cmwuXG4gKiAgICAgICAnaGVpZ2h0JzogKG51bWJlcikgVGhlIGltYWdlIGhlaWdodC5cbiAqICAgICAgICd3aWR0aCc6IChudW1iZXIpIFRoZSBpbWFnZSB3aWR0aC5cbiAqICAgICAgICdhbmNob3InOiAoQXJyYXkpIFRoZSBhbmNob3IgcG9zaXRpb24gb2YgdGhlIGxhYmVsIHRleHQuXG4gKiAgICAgICAndGV4dENvbG9yJzogKHN0cmluZykgVGhlIHRleHQgY29sb3IuXG4gKiAgICAgICAndGV4dFNpemUnOiAobnVtYmVyKSBUaGUgdGV4dCBzaXplLlxuICogICAgICAgJ2ZvbnRGYW1pbHknOiAoc3RyaW5nKSBUaGUgZm9udCBmYW1pbHkuXG4gKiAgICAgICAnZm9udFdlaWdodCc6IChzdHJpbmcpIFRoZSBmb250IHdlaWdodC5cbiAqICAgICAgICdiYWNrZ3JvdW5kUG9zaXRpb24nOiAoc3RyaW5nKSBUaGUgcG9zaXRpb24gb2YgdGhlIGJhY2tnb3VuZCB4LCB5LlxuICogQGNvbnN0cnVjdG9yXG4gKiBAZXh0ZW5kcyBnb29nbGUubWFwcy5PdmVybGF5Vmlld1xuICovXG5mdW5jdGlvbiBNYXJrZXJDbHVzdGVyZXIobWFwLCBvcHRfbWFya2Vycywgb3B0X29wdGlvbnMpIHtcbiAgLy8gTWFya2VyQ2x1c3RlcmVyIGltcGxlbWVudHMgZ29vZ2xlLm1hcHMuT3ZlcmxheVZpZXcgaW50ZXJmYWNlLiBXZSB1c2UgdGhlXG4gIC8vIGV4dGVuZCBmdW5jdGlvbiB0byBleHRlbmQgTWFya2VyQ2x1c3RlcmVyIHdpdGggZ29vZ2xlLm1hcHMuT3ZlcmxheVZpZXdcbiAgLy8gYmVjYXVzZSBpdCBtaWdodCBub3QgYWx3YXlzIGJlIGF2YWlsYWJsZSB3aGVuIHRoZSBjb2RlIGlzIGRlZmluZWQgc28gd2VcbiAgLy8gbG9vayBmb3IgaXQgYXQgdGhlIGxhc3QgcG9zc2libGUgbW9tZW50LiBJZiBpdCBkb2Vzbid0IGV4aXN0IG5vdyB0aGVuXG4gIC8vIHRoZXJlIGlzIG5vIHBvaW50IGdvaW5nIGFoZWFkIDopXG4gIHRoaXMuZXh0ZW5kKE1hcmtlckNsdXN0ZXJlciwgZ29vZ2xlLm1hcHMuT3ZlcmxheVZpZXcpO1xuICB0aGlzLm1hcF8gPSBtYXA7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtBcnJheS48Z29vZ2xlLm1hcHMuTWFya2VyPn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHRoaXMubWFya2Vyc18gPSBbXTtcblxuICAvKipcbiAgICogIEB0eXBlIHtBcnJheS48Q2x1c3Rlcj59XG4gICAqL1xuICB0aGlzLmNsdXN0ZXJzXyA9IFtdO1xuXG4gIHRoaXMuc2l6ZXMgPSBbNTMsIDU2LCA2NiwgNzgsIDkwXTtcblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHRoaXMuc3R5bGVzXyA9IFtdO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHRoaXMucmVhZHlfID0gZmFsc2U7XG5cbiAgdmFyIG9wdGlvbnMgPSBvcHRfb3B0aW9ucyB8fCB7fTtcblxuICAvKipcbiAgICogQHR5cGUge251bWJlcn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHRoaXMuZ3JpZFNpemVfID0gb3B0aW9uc1snZ3JpZFNpemUnXSB8fCA2MDtcblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHRoaXMubWluQ2x1c3RlclNpemVfID0gb3B0aW9uc1snbWluaW11bUNsdXN0ZXJTaXplJ10gfHwgMjtcblxuXG4gIC8qKlxuICAgKiBAdHlwZSB7P251bWJlcn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHRoaXMubWF4Wm9vbV8gPSBvcHRpb25zWydtYXhab29tJ10gfHwgbnVsbDtcblxuICB0aGlzLnN0eWxlc18gPSBvcHRpb25zWydzdHlsZXMnXSB8fCBbXTtcblxuICAvKipcbiAgICogQHR5cGUge3N0cmluZ31cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHRoaXMuaW1hZ2VQYXRoXyA9IG9wdGlvbnNbJ2ltYWdlUGF0aCddIHx8XG4gICAgICB0aGlzLk1BUktFUl9DTFVTVEVSX0lNQUdFX1BBVEhfO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgdGhpcy5pbWFnZUV4dGVuc2lvbl8gPSBvcHRpb25zWydpbWFnZUV4dGVuc2lvbiddIHx8XG4gICAgICB0aGlzLk1BUktFUl9DTFVTVEVSX0lNQUdFX0VYVEVOU0lPTl87XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgdGhpcy56b29tT25DbGlja18gPSB0cnVlO1xuXG4gIGlmIChvcHRpb25zWyd6b29tT25DbGljayddICE9IHVuZGVmaW5lZCkge1xuICAgIHRoaXMuem9vbU9uQ2xpY2tfID0gb3B0aW9uc1snem9vbU9uQ2xpY2snXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHRoaXMuYXZlcmFnZUNlbnRlcl8gPSBmYWxzZTtcblxuICBpZiAob3B0aW9uc1snYXZlcmFnZUNlbnRlciddICE9IHVuZGVmaW5lZCkge1xuICAgIHRoaXMuYXZlcmFnZUNlbnRlcl8gPSBvcHRpb25zWydhdmVyYWdlQ2VudGVyJ107XG4gIH1cblxuICB0aGlzLnNldHVwU3R5bGVzXygpO1xuXG4gIHRoaXMuc2V0TWFwKG1hcCk7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICB0aGlzLnByZXZab29tXyA9IHRoaXMubWFwXy5nZXRab29tKCk7XG5cbiAgLy8gQWRkIHRoZSBtYXAgZXZlbnQgbGlzdGVuZXJzXG4gIHZhciB0aGF0ID0gdGhpcztcbiAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIodGhpcy5tYXBfLCAnem9vbV9jaGFuZ2VkJywgZnVuY3Rpb24oKSB7XG4gICAgdmFyIHpvb20gPSB0aGF0Lm1hcF8uZ2V0Wm9vbSgpO1xuXG4gICAgaWYgKHRoYXQucHJldlpvb21fICE9IHpvb20pIHtcbiAgICAgIHRoYXQucHJldlpvb21fID0gem9vbTtcbiAgICAgIHRoYXQucmVzZXRWaWV3cG9ydCgpO1xuICAgIH1cbiAgfSk7XG5cbiAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIodGhpcy5tYXBfLCAnaWRsZScsIGZ1bmN0aW9uKCkge1xuICAgIHRoYXQucmVkcmF3KCk7XG4gIH0pO1xuXG4gIC8vIEZpbmFsbHksIGFkZCB0aGUgbWFya2Vyc1xuICBpZiAob3B0X21hcmtlcnMgJiYgb3B0X21hcmtlcnMubGVuZ3RoKSB7XG4gICAgdGhpcy5hZGRNYXJrZXJzKG9wdF9tYXJrZXJzLCBmYWxzZSk7XG4gIH1cbn1cblxuXG4vKipcbiAqIFRoZSBtYXJrZXIgY2x1c3RlciBpbWFnZSBwYXRoLlxuICpcbiAqIEB0eXBlIHtzdHJpbmd9XG4gKiBAcHJpdmF0ZVxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLk1BUktFUl9DTFVTVEVSX0lNQUdFX1BBVEhfID1cbiAgICAnaHR0cDovL2dvb2dsZS1tYXBzLXV0aWxpdHktbGlicmFyeS12My5nb29nbGVjb2RlLmNvbS9zdm4vdHJ1bmsvbWFya2VyY2x1c3RlcmVyLycgK1xuICAgICdpbWFnZXMvbSc7XG5cblxuLyoqXG4gKiBUaGUgbWFya2VyIGNsdXN0ZXIgaW1hZ2UgcGF0aC5cbiAqXG4gKiBAdHlwZSB7c3RyaW5nfVxuICogQHByaXZhdGVcbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5NQVJLRVJfQ0xVU1RFUl9JTUFHRV9FWFRFTlNJT05fID0gJ3BuZyc7XG5cblxuLyoqXG4gKiBFeHRlbmRzIGEgb2JqZWN0cyBwcm90b3R5cGUgYnkgYW5vdGhlcnMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iajEgVGhlIG9iamVjdCB0byBiZSBleHRlbmRlZC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmoyIFRoZSBvYmplY3QgdG8gZXh0ZW5kIHdpdGguXG4gKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBuZXcgZXh0ZW5kZWQgb2JqZWN0LlxuICogQGlnbm9yZVxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmV4dGVuZCA9IGZ1bmN0aW9uKG9iajEsIG9iajIpIHtcbiAgcmV0dXJuIChmdW5jdGlvbihvYmplY3QpIHtcbiAgICBmb3IgKHZhciBwcm9wZXJ0eSBpbiBvYmplY3QucHJvdG90eXBlKSB7XG4gICAgICB0aGlzLnByb3RvdHlwZVtwcm9wZXJ0eV0gPSBvYmplY3QucHJvdG90eXBlW3Byb3BlcnR5XTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0pLmFwcGx5KG9iajEsIFtvYmoyXSk7XG59O1xuXG5cbi8qKlxuICogSW1wbGVtZW50YWlvbiBvZiB0aGUgaW50ZXJmYWNlIG1ldGhvZC5cbiAqIEBpZ25vcmVcbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5vbkFkZCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnNldFJlYWR5Xyh0cnVlKTtcbn07XG5cbi8qKlxuICogSW1wbGVtZW50YWlvbiBvZiB0aGUgaW50ZXJmYWNlIG1ldGhvZC5cbiAqIEBpZ25vcmVcbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5kcmF3ID0gZnVuY3Rpb24oKSB7fTtcblxuLyoqXG4gKiBTZXRzIHVwIHRoZSBzdHlsZXMgb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuc2V0dXBTdHlsZXNfID0gZnVuY3Rpb24oKSB7XG4gIGlmICh0aGlzLnN0eWxlc18ubGVuZ3RoKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgZm9yICh2YXIgaSA9IDAsIHNpemU7IHNpemUgPSB0aGlzLnNpemVzW2ldOyBpKyspIHtcbiAgICB0aGlzLnN0eWxlc18ucHVzaCh7XG4gICAgICB1cmw6IHRoaXMuaW1hZ2VQYXRoXyArIChpICsgMSkgKyAnLicgKyB0aGlzLmltYWdlRXh0ZW5zaW9uXyxcbiAgICAgIGhlaWdodDogc2l6ZSxcbiAgICAgIHdpZHRoOiBzaXplXG4gICAgfSk7XG4gIH1cbn07XG5cbi8qKlxuICogIEZpdCB0aGUgbWFwIHRvIHRoZSBib3VuZHMgb2YgdGhlIG1hcmtlcnMgaW4gdGhlIGNsdXN0ZXJlci5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5maXRNYXBUb01hcmtlcnMgPSBmdW5jdGlvbigpIHtcbiAgdmFyIG1hcmtlcnMgPSB0aGlzLmdldE1hcmtlcnMoKTtcbiAgdmFyIGJvdW5kcyA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmdCb3VuZHMoKTtcbiAgZm9yICh2YXIgaSA9IDAsIG1hcmtlcjsgbWFya2VyID0gbWFya2Vyc1tpXTsgaSsrKSB7XG4gICAgYm91bmRzLmV4dGVuZChtYXJrZXIuZ2V0UG9zaXRpb24oKSk7XG4gIH1cblxuICB0aGlzLm1hcF8uZml0Qm91bmRzKGJvdW5kcyk7XG59O1xuXG5cbi8qKlxuICogIFNldHMgdGhlIHN0eWxlcy5cbiAqXG4gKiAgQHBhcmFtIHtPYmplY3R9IHN0eWxlcyBUaGUgc3R5bGUgdG8gc2V0LlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnNldFN0eWxlcyA9IGZ1bmN0aW9uKHN0eWxlcykge1xuICB0aGlzLnN0eWxlc18gPSBzdHlsZXM7XG59O1xuXG5cbi8qKlxuICogIEdldHMgdGhlIHN0eWxlcy5cbiAqXG4gKiAgQHJldHVybiB7T2JqZWN0fSBUaGUgc3R5bGVzIG9iamVjdC5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRTdHlsZXMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuc3R5bGVzXztcbn07XG5cblxuLyoqXG4gKiBXaGV0aGVyIHpvb20gb24gY2xpY2sgaXMgc2V0LlxuICpcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgem9vbU9uQ2xpY2tfIGlzIHNldC5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5pc1pvb21PbkNsaWNrID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnpvb21PbkNsaWNrXztcbn07XG5cbi8qKlxuICogV2hldGhlciBhdmVyYWdlIGNlbnRlciBpcyBzZXQuXG4gKlxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiBhdmVyYWdlQ2VudGVyXyBpcyBzZXQuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuaXNBdmVyYWdlQ2VudGVyID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmF2ZXJhZ2VDZW50ZXJfO1xufTtcblxuXG4vKipcbiAqICBSZXR1cm5zIHRoZSBhcnJheSBvZiBtYXJrZXJzIGluIHRoZSBjbHVzdGVyZXIuXG4gKlxuICogIEByZXR1cm4ge0FycmF5Ljxnb29nbGUubWFwcy5NYXJrZXI+fSBUaGUgbWFya2Vycy5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRNYXJrZXJzID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLm1hcmtlcnNfO1xufTtcblxuXG4vKipcbiAqICBSZXR1cm5zIHRoZSBudW1iZXIgb2YgbWFya2VycyBpbiB0aGUgY2x1c3RlcmVyXG4gKlxuICogIEByZXR1cm4ge051bWJlcn0gVGhlIG51bWJlciBvZiBtYXJrZXJzLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldFRvdGFsTWFya2VycyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5tYXJrZXJzXy5sZW5ndGg7XG59O1xuXG5cbi8qKlxuICogIFNldHMgdGhlIG1heCB6b29tIGZvciB0aGUgY2x1c3RlcmVyLlxuICpcbiAqICBAcGFyYW0ge251bWJlcn0gbWF4Wm9vbSBUaGUgbWF4IHpvb20gbGV2ZWwuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuc2V0TWF4Wm9vbSA9IGZ1bmN0aW9uKG1heFpvb20pIHtcbiAgdGhpcy5tYXhab29tXyA9IG1heFpvb207XG59O1xuXG5cbi8qKlxuICogIEdldHMgdGhlIG1heCB6b29tIGZvciB0aGUgY2x1c3RlcmVyLlxuICpcbiAqICBAcmV0dXJuIHtudW1iZXJ9IFRoZSBtYXggem9vbSBsZXZlbC5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRNYXhab29tID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLm1heFpvb21fO1xufTtcblxuXG4vKipcbiAqICBUaGUgZnVuY3Rpb24gZm9yIGNhbGN1bGF0aW5nIHRoZSBjbHVzdGVyIGljb24gaW1hZ2UuXG4gKlxuICogIEBwYXJhbSB7QXJyYXkuPGdvb2dsZS5tYXBzLk1hcmtlcj59IG1hcmtlcnMgVGhlIG1hcmtlcnMgaW4gdGhlIGNsdXN0ZXJlci5cbiAqICBAcGFyYW0ge251bWJlcn0gbnVtU3R5bGVzIFRoZSBudW1iZXIgb2Ygc3R5bGVzIGF2YWlsYWJsZS5cbiAqICBAcmV0dXJuIHtPYmplY3R9IEEgb2JqZWN0IHByb3BlcnRpZXM6ICd0ZXh0JyAoc3RyaW5nKSBhbmQgJ2luZGV4JyAobnVtYmVyKS5cbiAqICBAcHJpdmF0ZVxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmNhbGN1bGF0b3JfID0gZnVuY3Rpb24obWFya2VycywgbnVtU3R5bGVzKSB7XG4gIHZhciBpbmRleCA9IDA7XG4gIHZhciBjb3VudCA9IG1hcmtlcnMubGVuZ3RoO1xuICB2YXIgZHYgPSBjb3VudDtcbiAgd2hpbGUgKGR2ICE9PSAwKSB7XG4gICAgZHYgPSBwYXJzZUludChkdiAvIDEwLCAxMCk7XG4gICAgaW5kZXgrKztcbiAgfVxuXG4gIGluZGV4ID0gTWF0aC5taW4oaW5kZXgsIG51bVN0eWxlcyk7XG4gIHJldHVybiB7XG4gICAgdGV4dDogY291bnQsXG4gICAgaW5kZXg6IGluZGV4XG4gIH07XG59O1xuXG5cbi8qKlxuICogU2V0IHRoZSBjYWxjdWxhdG9yIGZ1bmN0aW9uLlxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oQXJyYXksIG51bWJlcil9IGNhbGN1bGF0b3IgVGhlIGZ1bmN0aW9uIHRvIHNldCBhcyB0aGVcbiAqICAgICBjYWxjdWxhdG9yLiBUaGUgZnVuY3Rpb24gc2hvdWxkIHJldHVybiBhIG9iamVjdCBwcm9wZXJ0aWVzOlxuICogICAgICd0ZXh0JyAoc3RyaW5nKSBhbmQgJ2luZGV4JyAobnVtYmVyKS5cbiAqXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuc2V0Q2FsY3VsYXRvciA9IGZ1bmN0aW9uKGNhbGN1bGF0b3IpIHtcbiAgdGhpcy5jYWxjdWxhdG9yXyA9IGNhbGN1bGF0b3I7XG59O1xuXG5cbi8qKlxuICogR2V0IHRoZSBjYWxjdWxhdG9yIGZ1bmN0aW9uLlxuICpcbiAqIEByZXR1cm4ge2Z1bmN0aW9uKEFycmF5LCBudW1iZXIpfSB0aGUgY2FsY3VsYXRvciBmdW5jdGlvbi5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRDYWxjdWxhdG9yID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmNhbGN1bGF0b3JfO1xufTtcblxuXG4vKipcbiAqIEFkZCBhbiBhcnJheSBvZiBtYXJrZXJzIHRvIHRoZSBjbHVzdGVyZXIuXG4gKlxuICogQHBhcmFtIHtBcnJheS48Z29vZ2xlLm1hcHMuTWFya2VyPn0gbWFya2VycyBUaGUgbWFya2VycyB0byBhZGQuXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSBvcHRfbm9kcmF3IFdoZXRoZXIgdG8gcmVkcmF3IHRoZSBjbHVzdGVycy5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5hZGRNYXJrZXJzID0gZnVuY3Rpb24obWFya2Vycywgb3B0X25vZHJhdykge1xuICBmb3IgKHZhciBpID0gMCwgbWFya2VyOyBtYXJrZXIgPSBtYXJrZXJzW2ldOyBpKyspIHtcbiAgICB0aGlzLnB1c2hNYXJrZXJUb18obWFya2VyKTtcbiAgfVxuICBpZiAoIW9wdF9ub2RyYXcpIHtcbiAgICB0aGlzLnJlZHJhdygpO1xuICB9XG59O1xuXG5cbi8qKlxuICogUHVzaGVzIGEgbWFya2VyIHRvIHRoZSBjbHVzdGVyZXIuXG4gKlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5NYXJrZXJ9IG1hcmtlciBUaGUgbWFya2VyIHRvIGFkZC5cbiAqIEBwcml2YXRlXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUucHVzaE1hcmtlclRvXyA9IGZ1bmN0aW9uKG1hcmtlcikge1xuICBtYXJrZXIuaXNBZGRlZCA9IGZhbHNlO1xuICBpZiAobWFya2VyWydkcmFnZ2FibGUnXSkge1xuICAgIC8vIElmIHRoZSBtYXJrZXIgaXMgZHJhZ2dhYmxlIGFkZCBhIGxpc3RlbmVyIHNvIHdlIHVwZGF0ZSB0aGUgY2x1c3RlcnMgb25cbiAgICAvLyB0aGUgZHJhZyBlbmQuXG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKG1hcmtlciwgJ2RyYWdlbmQnLCBmdW5jdGlvbigpIHtcbiAgICAgIG1hcmtlci5pc0FkZGVkID0gZmFsc2U7XG4gICAgICB0aGF0LnJlcGFpbnQoKTtcbiAgICB9KTtcbiAgfVxuICB0aGlzLm1hcmtlcnNfLnB1c2gobWFya2VyKTtcbn07XG5cblxuLyoqXG4gKiBBZGRzIGEgbWFya2VyIHRvIHRoZSBjbHVzdGVyZXIgYW5kIHJlZHJhd3MgaWYgbmVlZGVkLlxuICpcbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTWFya2VyfSBtYXJrZXIgVGhlIG1hcmtlciB0byBhZGQuXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSBvcHRfbm9kcmF3IFdoZXRoZXIgdG8gcmVkcmF3IHRoZSBjbHVzdGVycy5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5hZGRNYXJrZXIgPSBmdW5jdGlvbihtYXJrZXIsIG9wdF9ub2RyYXcpIHtcbiAgdGhpcy5wdXNoTWFya2VyVG9fKG1hcmtlcik7XG4gIGlmICghb3B0X25vZHJhdykge1xuICAgIHRoaXMucmVkcmF3KCk7XG4gIH1cbn07XG5cblxuLyoqXG4gKiBSZW1vdmVzIGEgbWFya2VyIGFuZCByZXR1cm5zIHRydWUgaWYgcmVtb3ZlZCwgZmFsc2UgaWYgbm90XG4gKlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5NYXJrZXJ9IG1hcmtlciBUaGUgbWFya2VyIHRvIHJlbW92ZVxuICogQHJldHVybiB7Ym9vbGVhbn0gV2hldGhlciB0aGUgbWFya2VyIHdhcyByZW1vdmVkIG9yIG5vdFxuICogQHByaXZhdGVcbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5yZW1vdmVNYXJrZXJfID0gZnVuY3Rpb24obWFya2VyKSB7XG4gIHZhciBpbmRleCA9IC0xO1xuICBpZiAodGhpcy5tYXJrZXJzXy5pbmRleE9mKSB7XG4gICAgaW5kZXggPSB0aGlzLm1hcmtlcnNfLmluZGV4T2YobWFya2VyKTtcbiAgfSBlbHNlIHtcbiAgICBmb3IgKHZhciBpID0gMCwgbTsgbSA9IHRoaXMubWFya2Vyc19baV07IGkrKykge1xuICAgICAgaWYgKG0gPT0gbWFya2VyKSB7XG4gICAgICAgIGluZGV4ID0gaTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKGluZGV4ID09IC0xKSB7XG4gICAgLy8gTWFya2VyIGlzIG5vdCBpbiBvdXIgbGlzdCBvZiBtYXJrZXJzLlxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIG1hcmtlci5zZXRNYXAobnVsbCk7XG5cbiAgdGhpcy5tYXJrZXJzXy5zcGxpY2UoaW5kZXgsIDEpO1xuXG4gIHJldHVybiB0cnVlO1xufTtcblxuXG4vKipcbiAqIFJlbW92ZSBhIG1hcmtlciBmcm9tIHRoZSBjbHVzdGVyLlxuICpcbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTWFya2VyfSBtYXJrZXIgVGhlIG1hcmtlciB0byByZW1vdmUuXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSBvcHRfbm9kcmF3IE9wdGlvbmFsIGJvb2xlYW4gdG8gZm9yY2Ugbm8gcmVkcmF3LlxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgbWFya2VyIHdhcyByZW1vdmVkLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnJlbW92ZU1hcmtlciA9IGZ1bmN0aW9uKG1hcmtlciwgb3B0X25vZHJhdykge1xuICB2YXIgcmVtb3ZlZCA9IHRoaXMucmVtb3ZlTWFya2VyXyhtYXJrZXIpO1xuXG4gIGlmICghb3B0X25vZHJhdyAmJiByZW1vdmVkKSB7XG4gICAgdGhpcy5yZXNldFZpZXdwb3J0KCk7XG4gICAgdGhpcy5yZWRyYXcoKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxuXG4vKipcbiAqIFJlbW92ZXMgYW4gYXJyYXkgb2YgbWFya2VycyBmcm9tIHRoZSBjbHVzdGVyLlxuICpcbiAqIEBwYXJhbSB7QXJyYXkuPGdvb2dsZS5tYXBzLk1hcmtlcj59IG1hcmtlcnMgVGhlIG1hcmtlcnMgdG8gcmVtb3ZlLlxuICogQHBhcmFtIHtib29sZWFuPX0gb3B0X25vZHJhdyBPcHRpb25hbCBib29sZWFuIHRvIGZvcmNlIG5vIHJlZHJhdy5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5yZW1vdmVNYXJrZXJzID0gZnVuY3Rpb24obWFya2Vycywgb3B0X25vZHJhdykge1xuICB2YXIgcmVtb3ZlZCA9IGZhbHNlO1xuXG4gIGZvciAodmFyIGkgPSAwLCBtYXJrZXI7IG1hcmtlciA9IG1hcmtlcnNbaV07IGkrKykge1xuICAgIHZhciByID0gdGhpcy5yZW1vdmVNYXJrZXJfKG1hcmtlcik7XG4gICAgcmVtb3ZlZCA9IHJlbW92ZWQgfHwgcjtcbiAgfVxuXG4gIGlmICghb3B0X25vZHJhdyAmJiByZW1vdmVkKSB7XG4gICAgdGhpcy5yZXNldFZpZXdwb3J0KCk7XG4gICAgdGhpcy5yZWRyYXcoKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTtcblxuXG4vKipcbiAqIFNldHMgdGhlIGNsdXN0ZXJlcidzIHJlYWR5IHN0YXRlLlxuICpcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gcmVhZHkgVGhlIHN0YXRlLlxuICogQHByaXZhdGVcbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5zZXRSZWFkeV8gPSBmdW5jdGlvbihyZWFkeSkge1xuICBpZiAoIXRoaXMucmVhZHlfKSB7XG4gICAgdGhpcy5yZWFkeV8gPSByZWFkeTtcbiAgICB0aGlzLmNyZWF0ZUNsdXN0ZXJzXygpO1xuICB9XG59O1xuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIGNsdXN0ZXJzIGluIHRoZSBjbHVzdGVyZXIuXG4gKlxuICogQHJldHVybiB7bnVtYmVyfSBUaGUgbnVtYmVyIG9mIGNsdXN0ZXJzLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldFRvdGFsQ2x1c3RlcnMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuY2x1c3RlcnNfLmxlbmd0aDtcbn07XG5cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBnb29nbGUgbWFwIHRoYXQgdGhlIGNsdXN0ZXJlciBpcyBhc3NvY2lhdGVkIHdpdGguXG4gKlxuICogQHJldHVybiB7Z29vZ2xlLm1hcHMuTWFwfSBUaGUgbWFwLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldE1hcCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5tYXBfO1xufTtcblxuXG4vKipcbiAqIFNldHMgdGhlIGdvb2dsZSBtYXAgdGhhdCB0aGUgY2x1c3RlcmVyIGlzIGFzc29jaWF0ZWQgd2l0aC5cbiAqXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLk1hcH0gbWFwIFRoZSBtYXAuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuc2V0TWFwID0gZnVuY3Rpb24obWFwKSB7XG4gIHRoaXMubWFwXyA9IG1hcDtcbn07XG5cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBzaXplIG9mIHRoZSBncmlkLlxuICpcbiAqIEByZXR1cm4ge251bWJlcn0gVGhlIGdyaWQgc2l6ZS5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRHcmlkU2l6ZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5ncmlkU2l6ZV87XG59O1xuXG5cbi8qKlxuICogU2V0cyB0aGUgc2l6ZSBvZiB0aGUgZ3JpZC5cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gc2l6ZSBUaGUgZ3JpZCBzaXplLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnNldEdyaWRTaXplID0gZnVuY3Rpb24oc2l6ZSkge1xuICB0aGlzLmdyaWRTaXplXyA9IHNpemU7XG59O1xuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgbWluIGNsdXN0ZXIgc2l6ZS5cbiAqXG4gKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSBncmlkIHNpemUuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0TWluQ2x1c3RlclNpemUgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMubWluQ2x1c3RlclNpemVfO1xufTtcblxuLyoqXG4gKiBTZXRzIHRoZSBtaW4gY2x1c3RlciBzaXplLlxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBzaXplIFRoZSBncmlkIHNpemUuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuc2V0TWluQ2x1c3RlclNpemUgPSBmdW5jdGlvbihzaXplKSB7XG4gIHRoaXMubWluQ2x1c3RlclNpemVfID0gc2l6ZTtcbn07XG5cblxuLyoqXG4gKiBFeHRlbmRzIGEgYm91bmRzIG9iamVjdCBieSB0aGUgZ3JpZCBzaXplLlxuICpcbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTGF0TG5nQm91bmRzfSBib3VuZHMgVGhlIGJvdW5kcyB0byBleHRlbmQuXG4gKiBAcmV0dXJuIHtnb29nbGUubWFwcy5MYXRMbmdCb3VuZHN9IFRoZSBleHRlbmRlZCBib3VuZHMuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0RXh0ZW5kZWRCb3VuZHMgPSBmdW5jdGlvbihib3VuZHMpIHtcbiAgdmFyIHByb2plY3Rpb24gPSB0aGlzLmdldFByb2plY3Rpb24oKTtcblxuICAvLyBUdXJuIHRoZSBib3VuZHMgaW50byBsYXRsbmcuXG4gIHZhciB0ciA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoYm91bmRzLmdldE5vcnRoRWFzdCgpLmxhdCgpLFxuICAgICAgYm91bmRzLmdldE5vcnRoRWFzdCgpLmxuZygpKTtcbiAgdmFyIGJsID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhib3VuZHMuZ2V0U291dGhXZXN0KCkubGF0KCksXG4gICAgICBib3VuZHMuZ2V0U291dGhXZXN0KCkubG5nKCkpO1xuXG4gIC8vIENvbnZlcnQgdGhlIHBvaW50cyB0byBwaXhlbHMgYW5kIHRoZSBleHRlbmQgb3V0IGJ5IHRoZSBncmlkIHNpemUuXG4gIHZhciB0clBpeCA9IHByb2plY3Rpb24uZnJvbUxhdExuZ1RvRGl2UGl4ZWwodHIpO1xuICB0clBpeC54ICs9IHRoaXMuZ3JpZFNpemVfO1xuICB0clBpeC55IC09IHRoaXMuZ3JpZFNpemVfO1xuXG4gIHZhciBibFBpeCA9IHByb2plY3Rpb24uZnJvbUxhdExuZ1RvRGl2UGl4ZWwoYmwpO1xuICBibFBpeC54IC09IHRoaXMuZ3JpZFNpemVfO1xuICBibFBpeC55ICs9IHRoaXMuZ3JpZFNpemVfO1xuXG4gIC8vIENvbnZlcnQgdGhlIHBpeGVsIHBvaW50cyBiYWNrIHRvIExhdExuZ1xuICB2YXIgbmUgPSBwcm9qZWN0aW9uLmZyb21EaXZQaXhlbFRvTGF0TG5nKHRyUGl4KTtcbiAgdmFyIHN3ID0gcHJvamVjdGlvbi5mcm9tRGl2UGl4ZWxUb0xhdExuZyhibFBpeCk7XG5cbiAgLy8gRXh0ZW5kIHRoZSBib3VuZHMgdG8gY29udGFpbiB0aGUgbmV3IGJvdW5kcy5cbiAgYm91bmRzLmV4dGVuZChuZSk7XG4gIGJvdW5kcy5leHRlbmQoc3cpO1xuXG4gIHJldHVybiBib3VuZHM7XG59O1xuXG5cbi8qKlxuICogRGV0ZXJtaW5zIGlmIGEgbWFya2VyIGlzIGNvbnRhaW5lZCBpbiBhIGJvdW5kcy5cbiAqXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLk1hcmtlcn0gbWFya2VyIFRoZSBtYXJrZXIgdG8gY2hlY2suXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLkxhdExuZ0JvdW5kc30gYm91bmRzIFRoZSBib3VuZHMgdG8gY2hlY2sgYWdhaW5zdC5cbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdGhlIG1hcmtlciBpcyBpbiB0aGUgYm91bmRzLlxuICogQHByaXZhdGVcbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5pc01hcmtlckluQm91bmRzXyA9IGZ1bmN0aW9uKG1hcmtlciwgYm91bmRzKSB7XG4gIHJldHVybiBib3VuZHMuY29udGFpbnMobWFya2VyLmdldFBvc2l0aW9uKCkpO1xufTtcblxuXG4vKipcbiAqIENsZWFycyBhbGwgY2x1c3RlcnMgYW5kIG1hcmtlcnMgZnJvbSB0aGUgY2x1c3RlcmVyLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmNsZWFyTWFya2VycyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnJlc2V0Vmlld3BvcnQodHJ1ZSk7XG5cbiAgLy8gU2V0IHRoZSBtYXJrZXJzIGEgZW1wdHkgYXJyYXkuXG4gIHRoaXMubWFya2Vyc18gPSBbXTtcbn07XG5cblxuLyoqXG4gKiBDbGVhcnMgYWxsIGV4aXN0aW5nIGNsdXN0ZXJzIGFuZCByZWNyZWF0ZXMgdGhlbS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0X2hpZGUgVG8gYWxzbyBoaWRlIHRoZSBtYXJrZXIuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUucmVzZXRWaWV3cG9ydCA9IGZ1bmN0aW9uKG9wdF9oaWRlKSB7XG4gIC8vIFJlbW92ZSBhbGwgdGhlIGNsdXN0ZXJzXG4gIGZvciAodmFyIGkgPSAwLCBjbHVzdGVyOyBjbHVzdGVyID0gdGhpcy5jbHVzdGVyc19baV07IGkrKykge1xuICAgIGNsdXN0ZXIucmVtb3ZlKCk7XG4gIH1cblxuICAvLyBSZXNldCB0aGUgbWFya2VycyB0byBub3QgYmUgYWRkZWQgYW5kIHRvIGJlIGludmlzaWJsZS5cbiAgZm9yICh2YXIgaSA9IDAsIG1hcmtlcjsgbWFya2VyID0gdGhpcy5tYXJrZXJzX1tpXTsgaSsrKSB7XG4gICAgbWFya2VyLmlzQWRkZWQgPSBmYWxzZTtcbiAgICBpZiAob3B0X2hpZGUpIHtcbiAgICAgIG1hcmtlci5zZXRNYXAobnVsbCk7XG4gICAgfVxuICB9XG5cbiAgdGhpcy5jbHVzdGVyc18gPSBbXTtcbn07XG5cbi8qKlxuICpcbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5yZXBhaW50ID0gZnVuY3Rpb24oKSB7XG4gIHZhciBvbGRDbHVzdGVycyA9IHRoaXMuY2x1c3RlcnNfLnNsaWNlKCk7XG4gIHRoaXMuY2x1c3RlcnNfLmxlbmd0aCA9IDA7XG4gIHRoaXMucmVzZXRWaWV3cG9ydCgpO1xuICB0aGlzLnJlZHJhdygpO1xuXG4gIC8vIFJlbW92ZSB0aGUgb2xkIGNsdXN0ZXJzLlxuICAvLyBEbyBpdCBpbiBhIHRpbWVvdXQgc28gdGhlIG90aGVyIGNsdXN0ZXJzIGhhdmUgYmVlbiBkcmF3biBmaXJzdC5cbiAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGNsdXN0ZXI7IGNsdXN0ZXIgPSBvbGRDbHVzdGVyc1tpXTsgaSsrKSB7XG4gICAgICBjbHVzdGVyLnJlbW92ZSgpO1xuICAgIH1cbiAgfSwgMCk7XG59O1xuXG5cbi8qKlxuICogUmVkcmF3cyB0aGUgY2x1c3RlcnMuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUucmVkcmF3ID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuY3JlYXRlQ2x1c3RlcnNfKCk7XG59O1xuXG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgZGlzdGFuY2UgYmV0d2VlbiB0d28gbGF0bG5nIGxvY2F0aW9ucyBpbiBrbS5cbiAqIEBzZWUgaHR0cDovL3d3dy5tb3ZhYmxlLXR5cGUuY28udWsvc2NyaXB0cy9sYXRsb25nLmh0bWxcbiAqXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLkxhdExuZ30gcDEgVGhlIGZpcnN0IGxhdCBsbmcgcG9pbnQuXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLkxhdExuZ30gcDIgVGhlIHNlY29uZCBsYXQgbG5nIHBvaW50LlxuICogQHJldHVybiB7bnVtYmVyfSBUaGUgZGlzdGFuY2UgYmV0d2VlbiB0aGUgdHdvIHBvaW50cyBpbiBrbS5cbiAqIEBwcml2YXRlXG4qL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5kaXN0YW5jZUJldHdlZW5Qb2ludHNfID0gZnVuY3Rpb24ocDEsIHAyKSB7XG4gIGlmICghcDEgfHwgIXAyKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICB2YXIgUiA9IDYzNzE7IC8vIFJhZGl1cyBvZiB0aGUgRWFydGggaW4ga21cbiAgdmFyIGRMYXQgPSAocDIubGF0KCkgLSBwMS5sYXQoKSkgKiBNYXRoLlBJIC8gMTgwO1xuICB2YXIgZExvbiA9IChwMi5sbmcoKSAtIHAxLmxuZygpKSAqIE1hdGguUEkgLyAxODA7XG4gIHZhciBhID0gTWF0aC5zaW4oZExhdCAvIDIpICogTWF0aC5zaW4oZExhdCAvIDIpICtcbiAgICBNYXRoLmNvcyhwMS5sYXQoKSAqIE1hdGguUEkgLyAxODApICogTWF0aC5jb3MocDIubGF0KCkgKiBNYXRoLlBJIC8gMTgwKSAqXG4gICAgTWF0aC5zaW4oZExvbiAvIDIpICogTWF0aC5zaW4oZExvbiAvIDIpO1xuICB2YXIgYyA9IDIgKiBNYXRoLmF0YW4yKE1hdGguc3FydChhKSwgTWF0aC5zcXJ0KDEgLSBhKSk7XG4gIHZhciBkID0gUiAqIGM7XG4gIHJldHVybiBkO1xufTtcblxuXG4vKipcbiAqIEFkZCBhIG1hcmtlciB0byBhIGNsdXN0ZXIsIG9yIGNyZWF0ZXMgYSBuZXcgY2x1c3Rlci5cbiAqXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLk1hcmtlcn0gbWFya2VyIFRoZSBtYXJrZXIgdG8gYWRkLlxuICogQHByaXZhdGVcbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5hZGRUb0Nsb3Nlc3RDbHVzdGVyXyA9IGZ1bmN0aW9uKG1hcmtlcikge1xuICB2YXIgZGlzdGFuY2UgPSA0MDAwMDsgLy8gU29tZSBsYXJnZSBudW1iZXJcbiAgdmFyIGNsdXN0ZXJUb0FkZFRvID0gbnVsbDtcbiAgdmFyIHBvcyA9IG1hcmtlci5nZXRQb3NpdGlvbigpO1xuICBmb3IgKHZhciBpID0gMCwgY2x1c3RlcjsgY2x1c3RlciA9IHRoaXMuY2x1c3RlcnNfW2ldOyBpKyspIHtcbiAgICB2YXIgY2VudGVyID0gY2x1c3Rlci5nZXRDZW50ZXIoKTtcbiAgICBpZiAoY2VudGVyKSB7XG4gICAgICB2YXIgZCA9IHRoaXMuZGlzdGFuY2VCZXR3ZWVuUG9pbnRzXyhjZW50ZXIsIG1hcmtlci5nZXRQb3NpdGlvbigpKTtcbiAgICAgIGlmIChkIDwgZGlzdGFuY2UpIHtcbiAgICAgICAgZGlzdGFuY2UgPSBkO1xuICAgICAgICBjbHVzdGVyVG9BZGRUbyA9IGNsdXN0ZXI7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKGNsdXN0ZXJUb0FkZFRvICYmIGNsdXN0ZXJUb0FkZFRvLmlzTWFya2VySW5DbHVzdGVyQm91bmRzKG1hcmtlcikpIHtcbiAgICBjbHVzdGVyVG9BZGRUby5hZGRNYXJrZXIobWFya2VyKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgY2x1c3RlciA9IG5ldyBDbHVzdGVyKHRoaXMpO1xuICAgIGNsdXN0ZXIuYWRkTWFya2VyKG1hcmtlcik7XG4gICAgdGhpcy5jbHVzdGVyc18ucHVzaChjbHVzdGVyKTtcbiAgfVxufTtcblxuXG4vKipcbiAqIENyZWF0ZXMgdGhlIGNsdXN0ZXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuY3JlYXRlQ2x1c3RlcnNfID0gZnVuY3Rpb24oKSB7XG4gIGlmICghdGhpcy5yZWFkeV8pIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBHZXQgb3VyIGN1cnJlbnQgbWFwIHZpZXcgYm91bmRzLlxuICAvLyBDcmVhdGUgYSBuZXcgYm91bmRzIG9iamVjdCBzbyB3ZSBkb24ndCBhZmZlY3QgdGhlIG1hcC5cbiAgdmFyIG1hcEJvdW5kcyA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmdCb3VuZHModGhpcy5tYXBfLmdldEJvdW5kcygpLmdldFNvdXRoV2VzdCgpLFxuICAgICAgdGhpcy5tYXBfLmdldEJvdW5kcygpLmdldE5vcnRoRWFzdCgpKTtcbiAgdmFyIGJvdW5kcyA9IHRoaXMuZ2V0RXh0ZW5kZWRCb3VuZHMobWFwQm91bmRzKTtcblxuICBmb3IgKHZhciBpID0gMCwgbWFya2VyOyBtYXJrZXIgPSB0aGlzLm1hcmtlcnNfW2ldOyBpKyspIHtcbiAgICBpZiAoIW1hcmtlci5pc0FkZGVkICYmIHRoaXMuaXNNYXJrZXJJbkJvdW5kc18obWFya2VyLCBib3VuZHMpKSB7XG4gICAgICB0aGlzLmFkZFRvQ2xvc2VzdENsdXN0ZXJfKG1hcmtlcik7XG4gICAgfVxuICB9XG59O1xuXG5cbi8qKlxuICogQSBjbHVzdGVyIHRoYXQgY29udGFpbnMgbWFya2Vycy5cbiAqXG4gKiBAcGFyYW0ge01hcmtlckNsdXN0ZXJlcn0gbWFya2VyQ2x1c3RlcmVyIFRoZSBtYXJrZXJjbHVzdGVyZXIgdGhhdCB0aGlzXG4gKiAgICAgY2x1c3RlciBpcyBhc3NvY2lhdGVkIHdpdGguXG4gKiBAY29uc3RydWN0b3JcbiAqIEBpZ25vcmVcbiAqL1xuZnVuY3Rpb24gQ2x1c3RlcihtYXJrZXJDbHVzdGVyZXIpIHtcbiAgdGhpcy5tYXJrZXJDbHVzdGVyZXJfID0gbWFya2VyQ2x1c3RlcmVyO1xuICB0aGlzLm1hcF8gPSBtYXJrZXJDbHVzdGVyZXIuZ2V0TWFwKCk7XG4gIHRoaXMuZ3JpZFNpemVfID0gbWFya2VyQ2x1c3RlcmVyLmdldEdyaWRTaXplKCk7XG4gIHRoaXMubWluQ2x1c3RlclNpemVfID0gbWFya2VyQ2x1c3RlcmVyLmdldE1pbkNsdXN0ZXJTaXplKCk7XG4gIHRoaXMuYXZlcmFnZUNlbnRlcl8gPSBtYXJrZXJDbHVzdGVyZXIuaXNBdmVyYWdlQ2VudGVyKCk7XG4gIHRoaXMuY2VudGVyXyA9IG51bGw7XG4gIHRoaXMubWFya2Vyc18gPSBbXTtcbiAgdGhpcy5ib3VuZHNfID0gbnVsbDtcbiAgdGhpcy5jbHVzdGVySWNvbl8gPSBuZXcgQ2x1c3Rlckljb24odGhpcywgbWFya2VyQ2x1c3RlcmVyLmdldFN0eWxlcygpLFxuICAgICAgbWFya2VyQ2x1c3RlcmVyLmdldEdyaWRTaXplKCkpO1xufVxuXG4vKipcbiAqIERldGVybWlucyBpZiBhIG1hcmtlciBpcyBhbHJlYWR5IGFkZGVkIHRvIHRoZSBjbHVzdGVyLlxuICpcbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTWFya2VyfSBtYXJrZXIgVGhlIG1hcmtlciB0byBjaGVjay5cbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdGhlIG1hcmtlciBpcyBhbHJlYWR5IGFkZGVkLlxuICovXG5DbHVzdGVyLnByb3RvdHlwZS5pc01hcmtlckFscmVhZHlBZGRlZCA9IGZ1bmN0aW9uKG1hcmtlcikge1xuICBpZiAodGhpcy5tYXJrZXJzXy5pbmRleE9mKSB7XG4gICAgcmV0dXJuIHRoaXMubWFya2Vyc18uaW5kZXhPZihtYXJrZXIpICE9IC0xO1xuICB9IGVsc2Uge1xuICAgIGZvciAodmFyIGkgPSAwLCBtOyBtID0gdGhpcy5tYXJrZXJzX1tpXTsgaSsrKSB7XG4gICAgICBpZiAobSA9PSBtYXJrZXIpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cblxuLyoqXG4gKiBBZGQgYSBtYXJrZXIgdGhlIGNsdXN0ZXIuXG4gKlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5NYXJrZXJ9IG1hcmtlciBUaGUgbWFya2VyIHRvIGFkZC5cbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdGhlIG1hcmtlciB3YXMgYWRkZWQuXG4gKi9cbkNsdXN0ZXIucHJvdG90eXBlLmFkZE1hcmtlciA9IGZ1bmN0aW9uKG1hcmtlcikge1xuICBpZiAodGhpcy5pc01hcmtlckFscmVhZHlBZGRlZChtYXJrZXIpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKCF0aGlzLmNlbnRlcl8pIHtcbiAgICB0aGlzLmNlbnRlcl8gPSBtYXJrZXIuZ2V0UG9zaXRpb24oKTtcbiAgICB0aGlzLmNhbGN1bGF0ZUJvdW5kc18oKTtcbiAgfSBlbHNlIHtcbiAgICBpZiAodGhpcy5hdmVyYWdlQ2VudGVyXykge1xuICAgICAgdmFyIGwgPSB0aGlzLm1hcmtlcnNfLmxlbmd0aCArIDE7XG4gICAgICB2YXIgbGF0ID0gKHRoaXMuY2VudGVyXy5sYXQoKSAqIChsLTEpICsgbWFya2VyLmdldFBvc2l0aW9uKCkubGF0KCkpIC8gbDtcbiAgICAgIHZhciBsbmcgPSAodGhpcy5jZW50ZXJfLmxuZygpICogKGwtMSkgKyBtYXJrZXIuZ2V0UG9zaXRpb24oKS5sbmcoKSkgLyBsO1xuICAgICAgdGhpcy5jZW50ZXJfID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhsYXQsIGxuZyk7XG4gICAgICB0aGlzLmNhbGN1bGF0ZUJvdW5kc18oKTtcbiAgICB9XG4gIH1cblxuICBtYXJrZXIuaXNBZGRlZCA9IHRydWU7XG4gIHRoaXMubWFya2Vyc18ucHVzaChtYXJrZXIpO1xuXG4gIHZhciBsZW4gPSB0aGlzLm1hcmtlcnNfLmxlbmd0aDtcbiAgaWYgKGxlbiA8IHRoaXMubWluQ2x1c3RlclNpemVfICYmIG1hcmtlci5nZXRNYXAoKSAhPSB0aGlzLm1hcF8pIHtcbiAgICAvLyBNaW4gY2x1c3RlciBzaXplIG5vdCByZWFjaGVkIHNvIHNob3cgdGhlIG1hcmtlci5cbiAgICBtYXJrZXIuc2V0TWFwKHRoaXMubWFwXyk7XG4gIH1cblxuICBpZiAobGVuID09IHRoaXMubWluQ2x1c3RlclNpemVfKSB7XG4gICAgLy8gSGlkZSB0aGUgbWFya2VycyB0aGF0IHdlcmUgc2hvd2luZy5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICB0aGlzLm1hcmtlcnNfW2ldLnNldE1hcChudWxsKTtcbiAgICB9XG4gIH1cblxuICBpZiAobGVuID49IHRoaXMubWluQ2x1c3RlclNpemVfKSB7XG4gICAgbWFya2VyLnNldE1hcChudWxsKTtcbiAgfVxuXG4gIHRoaXMudXBkYXRlSWNvbigpO1xuICByZXR1cm4gdHJ1ZTtcbn07XG5cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBtYXJrZXIgY2x1c3RlcmVyIHRoYXQgdGhlIGNsdXN0ZXIgaXMgYXNzb2NpYXRlZCB3aXRoLlxuICpcbiAqIEByZXR1cm4ge01hcmtlckNsdXN0ZXJlcn0gVGhlIGFzc29jaWF0ZWQgbWFya2VyIGNsdXN0ZXJlci5cbiAqL1xuQ2x1c3Rlci5wcm90b3R5cGUuZ2V0TWFya2VyQ2x1c3RlcmVyID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLm1hcmtlckNsdXN0ZXJlcl87XG59O1xuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgYm91bmRzIG9mIHRoZSBjbHVzdGVyLlxuICpcbiAqIEByZXR1cm4ge2dvb2dsZS5tYXBzLkxhdExuZ0JvdW5kc30gdGhlIGNsdXN0ZXIgYm91bmRzLlxuICovXG5DbHVzdGVyLnByb3RvdHlwZS5nZXRCb3VuZHMgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGJvdW5kcyA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmdCb3VuZHModGhpcy5jZW50ZXJfLCB0aGlzLmNlbnRlcl8pO1xuICB2YXIgbWFya2VycyA9IHRoaXMuZ2V0TWFya2VycygpO1xuICBmb3IgKHZhciBpID0gMCwgbWFya2VyOyBtYXJrZXIgPSBtYXJrZXJzW2ldOyBpKyspIHtcbiAgICBib3VuZHMuZXh0ZW5kKG1hcmtlci5nZXRQb3NpdGlvbigpKTtcbiAgfVxuICByZXR1cm4gYm91bmRzO1xufTtcblxuXG4vKipcbiAqIFJlbW92ZXMgdGhlIGNsdXN0ZXJcbiAqL1xuQ2x1c3Rlci5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuY2x1c3Rlckljb25fLnJlbW92ZSgpO1xuICB0aGlzLm1hcmtlcnNfLmxlbmd0aCA9IDA7XG4gIGRlbGV0ZSB0aGlzLm1hcmtlcnNfO1xufTtcblxuXG4vKipcbiAqIFJldHVybnMgdGhlIGNlbnRlciBvZiB0aGUgY2x1c3Rlci5cbiAqXG4gKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSBjbHVzdGVyIGNlbnRlci5cbiAqL1xuQ2x1c3Rlci5wcm90b3R5cGUuZ2V0U2l6ZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5tYXJrZXJzXy5sZW5ndGg7XG59O1xuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgY2VudGVyIG9mIHRoZSBjbHVzdGVyLlxuICpcbiAqIEByZXR1cm4ge0FycmF5Ljxnb29nbGUubWFwcy5NYXJrZXI+fSBUaGUgY2x1c3RlciBjZW50ZXIuXG4gKi9cbkNsdXN0ZXIucHJvdG90eXBlLmdldE1hcmtlcnMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMubWFya2Vyc187XG59O1xuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgY2VudGVyIG9mIHRoZSBjbHVzdGVyLlxuICpcbiAqIEByZXR1cm4ge2dvb2dsZS5tYXBzLkxhdExuZ30gVGhlIGNsdXN0ZXIgY2VudGVyLlxuICovXG5DbHVzdGVyLnByb3RvdHlwZS5nZXRDZW50ZXIgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuY2VudGVyXztcbn07XG5cblxuLyoqXG4gKiBDYWxjdWxhdGVkIHRoZSBleHRlbmRlZCBib3VuZHMgb2YgdGhlIGNsdXN0ZXIgd2l0aCB0aGUgZ3JpZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5DbHVzdGVyLnByb3RvdHlwZS5jYWxjdWxhdGVCb3VuZHNfID0gZnVuY3Rpb24oKSB7XG4gIHZhciBib3VuZHMgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nQm91bmRzKHRoaXMuY2VudGVyXywgdGhpcy5jZW50ZXJfKTtcbiAgdGhpcy5ib3VuZHNfID0gdGhpcy5tYXJrZXJDbHVzdGVyZXJfLmdldEV4dGVuZGVkQm91bmRzKGJvdW5kcyk7XG59O1xuXG5cbi8qKlxuICogRGV0ZXJtaW5lcyBpZiBhIG1hcmtlciBsaWVzIGluIHRoZSBjbHVzdGVycyBib3VuZHMuXG4gKlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5NYXJrZXJ9IG1hcmtlciBUaGUgbWFya2VyIHRvIGNoZWNrLlxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgbWFya2VyIGxpZXMgaW4gdGhlIGJvdW5kcy5cbiAqL1xuQ2x1c3Rlci5wcm90b3R5cGUuaXNNYXJrZXJJbkNsdXN0ZXJCb3VuZHMgPSBmdW5jdGlvbihtYXJrZXIpIHtcbiAgcmV0dXJuIHRoaXMuYm91bmRzXy5jb250YWlucyhtYXJrZXIuZ2V0UG9zaXRpb24oKSk7XG59O1xuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgbWFwIHRoYXQgdGhlIGNsdXN0ZXIgaXMgYXNzb2NpYXRlZCB3aXRoLlxuICpcbiAqIEByZXR1cm4ge2dvb2dsZS5tYXBzLk1hcH0gVGhlIG1hcC5cbiAqL1xuQ2x1c3Rlci5wcm90b3R5cGUuZ2V0TWFwID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLm1hcF87XG59O1xuXG5cbi8qKlxuICogVXBkYXRlcyB0aGUgY2x1c3RlciBpY29uXG4gKi9cbkNsdXN0ZXIucHJvdG90eXBlLnVwZGF0ZUljb24gPSBmdW5jdGlvbigpIHtcbiAgdmFyIHpvb20gPSB0aGlzLm1hcF8uZ2V0Wm9vbSgpO1xuICB2YXIgbXogPSB0aGlzLm1hcmtlckNsdXN0ZXJlcl8uZ2V0TWF4Wm9vbSgpO1xuXG4gIGlmIChteiAmJiB6b29tID4gbXopIHtcbiAgICAvLyBUaGUgem9vbSBpcyBncmVhdGVyIHRoYW4gb3VyIG1heCB6b29tIHNvIHNob3cgYWxsIHRoZSBtYXJrZXJzIGluIGNsdXN0ZXIuXG4gICAgZm9yICh2YXIgaSA9IDAsIG1hcmtlcjsgbWFya2VyID0gdGhpcy5tYXJrZXJzX1tpXTsgaSsrKSB7XG4gICAgICBtYXJrZXIuc2V0TWFwKHRoaXMubWFwXyk7XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmICh0aGlzLm1hcmtlcnNfLmxlbmd0aCA8IHRoaXMubWluQ2x1c3RlclNpemVfKSB7XG4gICAgLy8gTWluIGNsdXN0ZXIgc2l6ZSBub3QgeWV0IHJlYWNoZWQuXG4gICAgdGhpcy5jbHVzdGVySWNvbl8uaGlkZSgpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBudW1TdHlsZXMgPSB0aGlzLm1hcmtlckNsdXN0ZXJlcl8uZ2V0U3R5bGVzKCkubGVuZ3RoO1xuICB2YXIgc3VtcyA9IHRoaXMubWFya2VyQ2x1c3RlcmVyXy5nZXRDYWxjdWxhdG9yKCkodGhpcy5tYXJrZXJzXywgbnVtU3R5bGVzKTtcbiAgdGhpcy5jbHVzdGVySWNvbl8uc2V0Q2VudGVyKHRoaXMuY2VudGVyXyk7XG4gIHRoaXMuY2x1c3Rlckljb25fLnNldFN1bXMoc3Vtcyk7XG4gIHRoaXMuY2x1c3Rlckljb25fLnNob3coKTtcbn07XG5cblxuLyoqXG4gKiBBIGNsdXN0ZXIgaWNvblxuICpcbiAqIEBwYXJhbSB7Q2x1c3Rlcn0gY2x1c3RlciBUaGUgY2x1c3RlciB0byBiZSBhc3NvY2lhdGVkIHdpdGguXG4gKiBAcGFyYW0ge09iamVjdH0gc3R5bGVzIEFuIG9iamVjdCB0aGF0IGhhcyBzdHlsZSBwcm9wZXJ0aWVzOlxuICogICAgICd1cmwnOiAoc3RyaW5nKSBUaGUgaW1hZ2UgdXJsLlxuICogICAgICdoZWlnaHQnOiAobnVtYmVyKSBUaGUgaW1hZ2UgaGVpZ2h0LlxuICogICAgICd3aWR0aCc6IChudW1iZXIpIFRoZSBpbWFnZSB3aWR0aC5cbiAqICAgICAnYW5jaG9yJzogKEFycmF5KSBUaGUgYW5jaG9yIHBvc2l0aW9uIG9mIHRoZSBsYWJlbCB0ZXh0LlxuICogICAgICd0ZXh0Q29sb3InOiAoc3RyaW5nKSBUaGUgdGV4dCBjb2xvci5cbiAqICAgICAndGV4dFNpemUnOiAobnVtYmVyKSBUaGUgdGV4dCBzaXplLlxuICogICAgICAnZm9udEZhbWlseSc6IChzdHJpbmcpIFRoZSBmb250IGZhbWlseS5cbiAqICAgICAgJ2ZvbnRXZWlnaHQnOiAoc3RyaW5nKSBUaGUgZm9udCB3ZWlnaHQuXG4gKiAgICAgJ2JhY2tncm91bmRQb3NpdGlvbjogKHN0cmluZykgVGhlIGJhY2tncm91bmQgcG9zdGl0aW9uIHgsIHkuXG4gKiBAcGFyYW0ge251bWJlcj19IG9wdF9wYWRkaW5nIE9wdGlvbmFsIHBhZGRpbmcgdG8gYXBwbHkgdG8gdGhlIGNsdXN0ZXIgaWNvbi5cbiAqIEBjb25zdHJ1Y3RvclxuICogQGV4dGVuZHMgZ29vZ2xlLm1hcHMuT3ZlcmxheVZpZXdcbiAqIEBpZ25vcmVcbiAqL1xuZnVuY3Rpb24gQ2x1c3Rlckljb24oY2x1c3Rlciwgc3R5bGVzLCBvcHRfcGFkZGluZykge1xuICBjbHVzdGVyLmdldE1hcmtlckNsdXN0ZXJlcigpLmV4dGVuZChDbHVzdGVySWNvbiwgZ29vZ2xlLm1hcHMuT3ZlcmxheVZpZXcpO1xuXG4gIHRoaXMuc3R5bGVzXyA9IHN0eWxlcztcbiAgdGhpcy5wYWRkaW5nXyA9IG9wdF9wYWRkaW5nIHx8IDA7XG4gIHRoaXMuY2x1c3Rlcl8gPSBjbHVzdGVyO1xuICB0aGlzLmNlbnRlcl8gPSBudWxsO1xuICB0aGlzLm1hcF8gPSBjbHVzdGVyLmdldE1hcCgpO1xuICB0aGlzLmRpdl8gPSBudWxsO1xuICB0aGlzLnN1bXNfID0gbnVsbDtcbiAgdGhpcy52aXNpYmxlXyA9IGZhbHNlO1xuXG4gIHRoaXMuc2V0TWFwKHRoaXMubWFwXyk7XG59XG5cblxuLyoqXG4gKiBUcmlnZ2VycyB0aGUgY2x1c3RlcmNsaWNrIGV2ZW50IGFuZCB6b29tJ3MgaWYgdGhlIG9wdGlvbiBpcyBzZXQuXG4gKi9cbkNsdXN0ZXJJY29uLnByb3RvdHlwZS50cmlnZ2VyQ2x1c3RlckNsaWNrID0gZnVuY3Rpb24oKSB7XG4gIHZhciBtYXJrZXJDbHVzdGVyZXIgPSB0aGlzLmNsdXN0ZXJfLmdldE1hcmtlckNsdXN0ZXJlcigpO1xuXG4gIC8vIFRyaWdnZXIgdGhlIGNsdXN0ZXJjbGljayBldmVudC5cbiAgZ29vZ2xlLm1hcHMuZXZlbnQudHJpZ2dlcihtYXJrZXJDbHVzdGVyZXIsICdjbHVzdGVyY2xpY2snLCB0aGlzLmNsdXN0ZXJfKTtcblxuICBpZiAobWFya2VyQ2x1c3RlcmVyLmlzWm9vbU9uQ2xpY2soKSkge1xuICAgIC8vIFpvb20gaW50byB0aGUgY2x1c3Rlci5cbiAgICB0aGlzLm1hcF8uZml0Qm91bmRzKHRoaXMuY2x1c3Rlcl8uZ2V0Qm91bmRzKCkpO1xuICB9XG59O1xuXG5cbi8qKlxuICogQWRkaW5nIHRoZSBjbHVzdGVyIGljb24gdG8gdGhlIGRvbS5cbiAqIEBpZ25vcmVcbiAqL1xuQ2x1c3Rlckljb24ucHJvdG90eXBlLm9uQWRkID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuZGl2XyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xuICBpZiAodGhpcy52aXNpYmxlXykge1xuICAgIHZhciBwb3MgPSB0aGlzLmdldFBvc0Zyb21MYXRMbmdfKHRoaXMuY2VudGVyXyk7XG4gICAgdGhpcy5kaXZfLnN0eWxlLmNzc1RleHQgPSB0aGlzLmNyZWF0ZUNzcyhwb3MpO1xuICAgIHRoaXMuZGl2Xy5pbm5lckhUTUwgPSB0aGlzLnN1bXNfLnRleHQ7XG4gIH1cblxuICB2YXIgcGFuZXMgPSB0aGlzLmdldFBhbmVzKCk7XG4gIHBhbmVzLm92ZXJsYXlNb3VzZVRhcmdldC5hcHBlbmRDaGlsZCh0aGlzLmRpdl8pO1xuXG4gIHZhciB0aGF0ID0gdGhpcztcbiAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkRG9tTGlzdGVuZXIodGhpcy5kaXZfLCAnY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICB0aGF0LnRyaWdnZXJDbHVzdGVyQ2xpY2soKTtcbiAgfSk7XG59O1xuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgcG9zaXRpb24gdG8gcGxhY2UgdGhlIGRpdiBkZW5kaW5nIG9uIHRoZSBsYXRsbmcuXG4gKlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5MYXRMbmd9IGxhdGxuZyBUaGUgcG9zaXRpb24gaW4gbGF0bG5nLlxuICogQHJldHVybiB7Z29vZ2xlLm1hcHMuUG9pbnR9IFRoZSBwb3NpdGlvbiBpbiBwaXhlbHMuXG4gKiBAcHJpdmF0ZVxuICovXG5DbHVzdGVySWNvbi5wcm90b3R5cGUuZ2V0UG9zRnJvbUxhdExuZ18gPSBmdW5jdGlvbihsYXRsbmcpIHtcbiAgdmFyIHBvcyA9IHRoaXMuZ2V0UHJvamVjdGlvbigpLmZyb21MYXRMbmdUb0RpdlBpeGVsKGxhdGxuZyk7XG4gIHBvcy54IC09IHBhcnNlSW50KHRoaXMud2lkdGhfIC8gMiwgMTApO1xuICBwb3MueSAtPSBwYXJzZUludCh0aGlzLmhlaWdodF8gLyAyLCAxMCk7XG4gIHJldHVybiBwb3M7XG59O1xuXG5cbi8qKlxuICogRHJhdyB0aGUgaWNvbi5cbiAqIEBpZ25vcmVcbiAqL1xuQ2x1c3Rlckljb24ucHJvdG90eXBlLmRyYXcgPSBmdW5jdGlvbigpIHtcbiAgaWYgKHRoaXMudmlzaWJsZV8pIHtcbiAgICB2YXIgcG9zID0gdGhpcy5nZXRQb3NGcm9tTGF0TG5nXyh0aGlzLmNlbnRlcl8pO1xuICAgIHRoaXMuZGl2Xy5zdHlsZS50b3AgPSBwb3MueSArICdweCc7XG4gICAgdGhpcy5kaXZfLnN0eWxlLmxlZnQgPSBwb3MueCArICdweCc7XG4gIH1cbn07XG5cblxuLyoqXG4gKiBIaWRlIHRoZSBpY29uLlxuICovXG5DbHVzdGVySWNvbi5wcm90b3R5cGUuaGlkZSA9IGZ1bmN0aW9uKCkge1xuICBpZiAodGhpcy5kaXZfKSB7XG4gICAgdGhpcy5kaXZfLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIH1cbiAgdGhpcy52aXNpYmxlXyA9IGZhbHNlO1xufTtcblxuXG4vKipcbiAqIFBvc2l0aW9uIGFuZCBzaG93IHRoZSBpY29uLlxuICovXG5DbHVzdGVySWNvbi5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uKCkge1xuICBpZiAodGhpcy5kaXZfKSB7XG4gICAgdmFyIHBvcyA9IHRoaXMuZ2V0UG9zRnJvbUxhdExuZ18odGhpcy5jZW50ZXJfKTtcbiAgICB0aGlzLmRpdl8uc3R5bGUuY3NzVGV4dCA9IHRoaXMuY3JlYXRlQ3NzKHBvcyk7XG4gICAgdGhpcy5kaXZfLnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgfVxuICB0aGlzLnZpc2libGVfID0gdHJ1ZTtcbn07XG5cblxuLyoqXG4gKiBSZW1vdmUgdGhlIGljb24gZnJvbSB0aGUgbWFwXG4gKi9cbkNsdXN0ZXJJY29uLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5zZXRNYXAobnVsbCk7XG59O1xuXG5cbi8qKlxuICogSW1wbGVtZW50YXRpb24gb2YgdGhlIG9uUmVtb3ZlIGludGVyZmFjZS5cbiAqIEBpZ25vcmVcbiAqL1xuQ2x1c3Rlckljb24ucHJvdG90eXBlLm9uUmVtb3ZlID0gZnVuY3Rpb24oKSB7XG4gIGlmICh0aGlzLmRpdl8gJiYgdGhpcy5kaXZfLnBhcmVudE5vZGUpIHtcbiAgICB0aGlzLmhpZGUoKTtcbiAgICB0aGlzLmRpdl8ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLmRpdl8pO1xuICAgIHRoaXMuZGl2XyA9IG51bGw7XG4gIH1cbn07XG5cblxuLyoqXG4gKiBTZXQgdGhlIHN1bXMgb2YgdGhlIGljb24uXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHN1bXMgVGhlIHN1bXMgY29udGFpbmluZzpcbiAqICAgJ3RleHQnOiAoc3RyaW5nKSBUaGUgdGV4dCB0byBkaXNwbGF5IGluIHRoZSBpY29uLlxuICogICAnaW5kZXgnOiAobnVtYmVyKSBUaGUgc3R5bGUgaW5kZXggb2YgdGhlIGljb24uXG4gKi9cbkNsdXN0ZXJJY29uLnByb3RvdHlwZS5zZXRTdW1zID0gZnVuY3Rpb24oc3Vtcykge1xuICB0aGlzLnN1bXNfID0gc3VtcztcbiAgdGhpcy50ZXh0XyA9IHN1bXMudGV4dDtcbiAgdGhpcy5pbmRleF8gPSBzdW1zLmluZGV4O1xuICBpZiAodGhpcy5kaXZfKSB7XG4gICAgdGhpcy5kaXZfLmlubmVySFRNTCA9IHN1bXMudGV4dDtcbiAgfVxuXG4gIHRoaXMudXNlU3R5bGUoKTtcbn07XG5cblxuLyoqXG4gKiBTZXRzIHRoZSBpY29uIHRvIHRoZSB0aGUgc3R5bGVzLlxuICovXG5DbHVzdGVySWNvbi5wcm90b3R5cGUudXNlU3R5bGUgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGluZGV4ID0gTWF0aC5tYXgoMCwgdGhpcy5zdW1zXy5pbmRleCAtIDEpO1xuICBpbmRleCA9IE1hdGgubWluKHRoaXMuc3R5bGVzXy5sZW5ndGggLSAxLCBpbmRleCk7XG4gIHZhciBzdHlsZSA9IHRoaXMuc3R5bGVzX1tpbmRleF07XG4gIHRoaXMudXJsXyA9IHN0eWxlWyd1cmwnXTtcbiAgdGhpcy5oZWlnaHRfID0gc3R5bGVbJ2hlaWdodCddO1xuICB0aGlzLndpZHRoXyA9IHN0eWxlWyd3aWR0aCddO1xuICB0aGlzLnRleHRDb2xvcl8gPSBzdHlsZVsndGV4dENvbG9yJ107XG4gIHRoaXMuYW5jaG9yXyA9IHN0eWxlWydhbmNob3InXTtcbiAgdGhpcy50ZXh0U2l6ZV8gPSBzdHlsZVsndGV4dFNpemUnXTtcbiAgdGhpcy5mb250RmFtaWx5XyA9IHN0eWxlWydmb250RmFtaWx5J107XG4gIHRoaXMuZm9udFdlaWdodF8gPSBzdHlsZVsnZm9udFdlaWdodCddO1xuICB0aGlzLmJhY2tncm91bmRQb3NpdGlvbl8gPSBzdHlsZVsnYmFja2dyb3VuZFBvc2l0aW9uJ107XG59O1xuXG5cbi8qKlxuICogU2V0cyB0aGUgY2VudGVyIG9mIHRoZSBpY29uLlxuICpcbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTGF0TG5nfSBjZW50ZXIgVGhlIGxhdGxuZyB0byBzZXQgYXMgdGhlIGNlbnRlci5cbiAqL1xuQ2x1c3Rlckljb24ucHJvdG90eXBlLnNldENlbnRlciA9IGZ1bmN0aW9uKGNlbnRlcikge1xuICB0aGlzLmNlbnRlcl8gPSBjZW50ZXI7XG59O1xuXG5cbi8qKlxuICogQ3JlYXRlIHRoZSBjc3MgdGV4dCBiYXNlZCBvbiB0aGUgcG9zaXRpb24gb2YgdGhlIGljb24uXG4gKlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5Qb2ludH0gcG9zIFRoZSBwb3NpdGlvbi5cbiAqIEByZXR1cm4ge3N0cmluZ30gVGhlIGNzcyBzdHlsZSB0ZXh0LlxuICovXG5DbHVzdGVySWNvbi5wcm90b3R5cGUuY3JlYXRlQ3NzID0gZnVuY3Rpb24ocG9zKSB7XG4gIHZhciBzdHlsZSA9IFtdO1xuICBzdHlsZS5wdXNoKCdiYWNrZ3JvdW5kLWltYWdlOnVybCgnICsgdGhpcy51cmxfICsgJyk7Jyk7XG4gIHZhciBiYWNrZ3JvdW5kUG9zaXRpb24gPSB0aGlzLmJhY2tncm91bmRQb3NpdGlvbl8gPyB0aGlzLmJhY2tncm91bmRQb3NpdGlvbl8gOiAnMCAwJztcbiAgc3R5bGUucHVzaCgnYmFja2dyb3VuZC1wb3NpdGlvbjonICsgYmFja2dyb3VuZFBvc2l0aW9uICsgJzsnKTtcblxuICBpZiAodHlwZW9mIHRoaXMuYW5jaG9yXyA9PT0gJ29iamVjdCcpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMuYW5jaG9yX1swXSA9PT0gJ251bWJlcicgJiYgdGhpcy5hbmNob3JfWzBdID4gMCAmJlxuICAgICAgICB0aGlzLmFuY2hvcl9bMF0gPCB0aGlzLmhlaWdodF8pIHtcbiAgICAgIHN0eWxlLnB1c2goJ2hlaWdodDonICsgKHRoaXMuaGVpZ2h0XyAtIHRoaXMuYW5jaG9yX1swXSkgK1xuICAgICAgICAgICdweDsgcGFkZGluZy10b3A6JyArIHRoaXMuYW5jaG9yX1swXSArICdweDsnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3R5bGUucHVzaCgnaGVpZ2h0OicgKyB0aGlzLmhlaWdodF8gKyAncHg7IGxpbmUtaGVpZ2h0OicgKyB0aGlzLmhlaWdodF8gK1xuICAgICAgICAgICdweDsnKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB0aGlzLmFuY2hvcl9bMV0gPT09ICdudW1iZXInICYmIHRoaXMuYW5jaG9yX1sxXSA+IDAgJiZcbiAgICAgICAgdGhpcy5hbmNob3JfWzFdIDwgdGhpcy53aWR0aF8pIHtcbiAgICAgIHN0eWxlLnB1c2goJ3dpZHRoOicgKyAodGhpcy53aWR0aF8gLSB0aGlzLmFuY2hvcl9bMV0pICtcbiAgICAgICAgICAncHg7IHBhZGRpbmctbGVmdDonICsgdGhpcy5hbmNob3JfWzFdICsgJ3B4OycpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZS5wdXNoKCd3aWR0aDonICsgdGhpcy53aWR0aF8gKyAncHg7IHRleHQtYWxpZ246Y2VudGVyOycpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBzdHlsZS5wdXNoKCdoZWlnaHQ6JyArIHRoaXMuaGVpZ2h0XyArICdweDsgbGluZS1oZWlnaHQ6JyArXG4gICAgICAgIHRoaXMuaGVpZ2h0XyArICdweDsgd2lkdGg6JyArIHRoaXMud2lkdGhfICsgJ3B4OyB0ZXh0LWFsaWduOmNlbnRlcjsnKTtcbiAgfVxuXG4gIHZhciB0eHRDb2xvciA9IHRoaXMudGV4dENvbG9yXyA/IHRoaXMudGV4dENvbG9yXyA6ICdibGFjayc7XG4gIHZhciB0eHRTaXplID0gdGhpcy50ZXh0U2l6ZV8gPyB0aGlzLnRleHRTaXplXyA6IDExO1xuICB2YXIgZm9udEZhbWlseSA9IHRoaXMuZm9udEZhbWlseV8gPyB0aGlzLmZvbnRGYW1pbHlfIDogJ0FyaWFsLHNhbnMtc2VyaWYnO1xuICB2YXIgZm9udFdlaWdodCA9IHRoaXMuZm9udFdlaWdodF8gPyB0aGlzLmZvbnRXZWlnaHRfIDogJzQwMCc7XG5cbiAgc3R5bGUucHVzaCgnY3Vyc29yOnBvaW50ZXI7IHRvcDonICsgcG9zLnkgKyAncHg7IGxlZnQ6JyArXG4gICAgICBwb3MueCArICdweDsgY29sb3I6JyArIHR4dENvbG9yICsgJzsgcG9zaXRpb246YWJzb2x1dGU7IGZvbnQtc2l6ZTonICtcbiAgICAgIHR4dFNpemUgKyAncHg7IGZvbnQtZmFtaWx5OicgKyBmb250RmFtaWx5ICsgJzsgZm9udC13ZWlnaHQ6JyArIGZvbnRXZWlnaHQgKyAnOycpO1xuICByZXR1cm4gc3R5bGUuam9pbignJyk7XG59O1xuXG5cbi8vIEV4cG9ydCBTeW1ib2xzIGZvciBDbG9zdXJlXG4vLyBJZiB5b3UgYXJlIG5vdCBnb2luZyB0byBjb21waWxlIHdpdGggY2xvc3VyZSB0aGVuIHlvdSBjYW4gcmVtb3ZlIHRoZVxuLy8gY29kZSBiZWxvdy5cbmdsb2JhbFsnTWFya2VyQ2x1c3RlcmVyJ10gPSBNYXJrZXJDbHVzdGVyZXI7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydhZGRNYXJrZXInXSA9IE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuYWRkTWFya2VyO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnYWRkTWFya2VycyddID0gTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5hZGRNYXJrZXJzO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnY2xlYXJNYXJrZXJzJ10gPVxuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuY2xlYXJNYXJrZXJzO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnZml0TWFwVG9NYXJrZXJzJ10gPVxuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZml0TWFwVG9NYXJrZXJzO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnZ2V0Q2FsY3VsYXRvciddID1cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldENhbGN1bGF0b3I7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydnZXRHcmlkU2l6ZSddID1cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldEdyaWRTaXplO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnZ2V0RXh0ZW5kZWRCb3VuZHMnXSA9XG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRFeHRlbmRlZEJvdW5kcztcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ2dldE1hcCddID0gTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRNYXA7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydnZXRNYXJrZXJzJ10gPSBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldE1hcmtlcnM7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydnZXRNYXhab29tJ10gPSBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldE1heFpvb207XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydnZXRTdHlsZXMnXSA9IE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0U3R5bGVzO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnZ2V0VG90YWxDbHVzdGVycyddID1cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldFRvdGFsQ2x1c3RlcnM7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydnZXRUb3RhbE1hcmtlcnMnXSA9XG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRUb3RhbE1hcmtlcnM7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydyZWRyYXcnXSA9IE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUucmVkcmF3O1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsncmVtb3ZlTWFya2VyJ10gPVxuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUucmVtb3ZlTWFya2VyO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsncmVtb3ZlTWFya2VycyddID1cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnJlbW92ZU1hcmtlcnM7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydyZXNldFZpZXdwb3J0J10gPVxuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUucmVzZXRWaWV3cG9ydDtcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ3JlcGFpbnQnXSA9XG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5yZXBhaW50O1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnc2V0Q2FsY3VsYXRvciddID1cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnNldENhbGN1bGF0b3I7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydzZXRHcmlkU2l6ZSddID1cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnNldEdyaWRTaXplO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnc2V0TWF4Wm9vbSddID1cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnNldE1heFpvb207XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydvbkFkZCddID0gTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5vbkFkZDtcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ2RyYXcnXSA9IE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZHJhdztcblxuQ2x1c3Rlci5wcm90b3R5cGVbJ2dldENlbnRlciddID0gQ2x1c3Rlci5wcm90b3R5cGUuZ2V0Q2VudGVyO1xuQ2x1c3Rlci5wcm90b3R5cGVbJ2dldFNpemUnXSA9IENsdXN0ZXIucHJvdG90eXBlLmdldFNpemU7XG5DbHVzdGVyLnByb3RvdHlwZVsnZ2V0TWFya2VycyddID0gQ2x1c3Rlci5wcm90b3R5cGUuZ2V0TWFya2VycztcblxuQ2x1c3Rlckljb24ucHJvdG90eXBlWydvbkFkZCddID0gQ2x1c3Rlckljb24ucHJvdG90eXBlLm9uQWRkO1xuQ2x1c3Rlckljb24ucHJvdG90eXBlWydkcmF3J10gPSBDbHVzdGVySWNvbi5wcm90b3R5cGUuZHJhdztcbkNsdXN0ZXJJY29uLnByb3RvdHlwZVsnb25SZW1vdmUnXSA9IENsdXN0ZXJJY29uLnByb3RvdHlwZS5vblJlbW92ZTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IE1hcmtlckNsdXN0ZXJlcjtcbiIsIi8qKlxuICogalF1ZXJ5IEJhciBSYXRpbmcgUGx1Z2luIHYxLjIuMlxuICpcbiAqIGh0dHA6Ly9naXRodWIuY29tL2FudGVubmFpby9qcXVlcnktYmFyLXJhdGluZ1xuICpcbiAqIENvcHlyaWdodCAoYykgMjAxMi0yMDE2IEthemlrIFBpZXRydXN6ZXdza2lcbiAqXG4gKiBUaGlzIHBsdWdpbiBpcyBhdmFpbGFibGUgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuICogaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAqL1xuKGZ1bmN0aW9uIChmYWN0b3J5KSB7XG4gICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICAvLyBBTURcbiAgICAgICAgZGVmaW5lKFsnanF1ZXJ5J10sIGZhY3RvcnkpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICAgICAgLy8gTm9kZS9Db21tb25KU1xuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZSgnanF1ZXJ5JykpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGJyb3dzZXIgZ2xvYmFsc1xuICAgICAgICBmYWN0b3J5KGpRdWVyeSk7XG4gICAgfVxufShmdW5jdGlvbiAoJCkge1xuXG4gICAgdmFyIEJhclJhdGluZyA9IChmdW5jdGlvbigpIHtcblxuICAgICAgICBmdW5jdGlvbiBCYXJSYXRpbmcoKSB7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgICAgIC8vIHdyYXAgZWxlbWVudCBpbiBhIHdyYXBwZXIgZGl2XG4gICAgICAgICAgICB2YXIgd3JhcEVsZW1lbnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgY2xhc3NlcyA9IFsnYnItd3JhcHBlciddO1xuXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYub3B0aW9ucy50aGVtZSAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKCdici10aGVtZS0nICsgc2VsZi5vcHRpb25zLnRoZW1lKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLndyYXAoJCgnPGRpdiAvPicsIHtcbiAgICAgICAgICAgICAgICAgICAgJ2NsYXNzJzogY2xhc3Nlcy5qb2luKCcgJylcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyB1bndyYXAgZWxlbWVudFxuICAgICAgICAgICAgdmFyIHVud3JhcEVsZW1lbnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLnVud3JhcCgpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gZmluZCBvcHRpb24gYnkgdmFsdWVcbiAgICAgICAgICAgIHZhciBmaW5kT3B0aW9uID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoJC5pc051bWVyaWModmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gTWF0aC5mbG9vcih2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuICQoJ29wdGlvblt2YWx1ZT1cIicgKyB2YWx1ZSAgKyAnXCJdJywgc2VsZi4kZWxlbSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBnZXQgaW5pdGlhbCBvcHRpb25cbiAgICAgICAgICAgIHZhciBnZXRJbml0aWFsT3B0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIGluaXRpYWxSYXRpbmcgPSBzZWxmLm9wdGlvbnMuaW5pdGlhbFJhdGluZztcblxuICAgICAgICAgICAgICAgIGlmICghaW5pdGlhbFJhdGluZykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJCgnb3B0aW9uOnNlbGVjdGVkJywgc2VsZi4kZWxlbSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZpbmRPcHRpb24oaW5pdGlhbFJhdGluZyk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBnZXQgZW1wdHkgb3B0aW9uXG4gICAgICAgICAgICB2YXIgZ2V0RW1wdHlPcHRpb24gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgJGVtcHR5T3B0ID0gc2VsZi4kZWxlbS5maW5kKCdvcHRpb25bdmFsdWU9XCInICsgc2VsZi5vcHRpb25zLmVtcHR5VmFsdWUgKyAnXCJdJyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoISRlbXB0eU9wdC5sZW5ndGggJiYgc2VsZi5vcHRpb25zLmFsbG93RW1wdHkpIHtcbiAgICAgICAgICAgICAgICAgICAgJGVtcHR5T3B0ID0gJCgnPG9wdGlvbiAvPicsIHsgJ3ZhbHVlJzogc2VsZi5vcHRpb25zLmVtcHR5VmFsdWUgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRlbXB0eU9wdC5wcmVwZW5kVG8oc2VsZi4kZWxlbSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuICRlbXB0eU9wdDtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIGdldCBkYXRhXG4gICAgICAgICAgICB2YXIgZ2V0RGF0YSA9IGZ1bmN0aW9uKGtleSkge1xuICAgICAgICAgICAgICAgIHZhciBkYXRhID0gc2VsZi4kZWxlbS5kYXRhKCdiYXJyYXRpbmcnKTtcblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Yga2V5ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YVtrZXldO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gc2V0IGRhdGFcbiAgICAgICAgICAgIHZhciBzZXREYXRhID0gZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0uZGF0YSgnYmFycmF0aW5nJywgdmFsdWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0uZGF0YSgnYmFycmF0aW5nJylba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIHNhdmUgZGF0YSBvbiBlbGVtZW50XG4gICAgICAgICAgICB2YXIgc2F2ZURhdGFPbkVsZW1lbnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgJG9wdCA9IGdldEluaXRpYWxPcHRpb24oKTtcbiAgICAgICAgICAgICAgICB2YXIgJGVtcHR5T3B0ID0gZ2V0RW1wdHlPcHRpb24oKTtcblxuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9ICRvcHQudmFsKCk7XG4gICAgICAgICAgICAgICAgdmFyIHRleHQgPSAkb3B0LmRhdGEoJ2h0bWwnKSA/ICRvcHQuZGF0YSgnaHRtbCcpIDogJG9wdC50ZXh0KCk7XG5cbiAgICAgICAgICAgICAgICAvLyBpZiB0aGUgYWxsb3dFbXB0eSBvcHRpb24gaXMgbm90IHNldCBsZXQncyBjaGVjayBpZiBlbXB0eSBvcHRpb24gZXhpc3RzIGluIHRoZSBzZWxlY3QgZmllbGRcbiAgICAgICAgICAgICAgICB2YXIgYWxsb3dFbXB0eSA9IChzZWxmLm9wdGlvbnMuYWxsb3dFbXB0eSAhPT0gbnVsbCkgP1xuICAgICAgICAgICAgICAgICAgICBzZWxmLm9wdGlvbnMuYWxsb3dFbXB0eSA6XG4gICAgICAgICAgICAgICAgICAgICEhJGVtcHR5T3B0Lmxlbmd0aDtcblxuICAgICAgICAgICAgICAgIHZhciBlbXB0eVZhbHVlID0gKCRlbXB0eU9wdC5sZW5ndGgpID8gJGVtcHR5T3B0LnZhbCgpIDogbnVsbDtcbiAgICAgICAgICAgICAgICB2YXIgZW1wdHlUZXh0ID0gKCRlbXB0eU9wdC5sZW5ndGgpID8gJGVtcHR5T3B0LnRleHQoKSA6IG51bGw7XG5cbiAgICAgICAgICAgICAgICBzZXREYXRhKG51bGwsIHtcbiAgICAgICAgICAgICAgICAgICAgdXNlck9wdGlvbnM6IHNlbGYub3B0aW9ucyxcblxuICAgICAgICAgICAgICAgICAgICAvLyBpbml0aWFsIHJhdGluZyBiYXNlZCBvbiB0aGUgT1BUSU9OIHZhbHVlXG4gICAgICAgICAgICAgICAgICAgIHJhdGluZ1ZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgcmF0aW5nVGV4dDogdGV4dCxcblxuICAgICAgICAgICAgICAgICAgICAvLyByYXRpbmcgd2lsbCBiZSByZXN0b3JlZCBieSBjYWxsaW5nIGNsZWFyIG1ldGhvZFxuICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbFJhdGluZ1ZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxSYXRpbmdUZXh0OiB0ZXh0LFxuXG4gICAgICAgICAgICAgICAgICAgIC8vIGFsbG93IGVtcHR5IHJhdGluZ3M/XG4gICAgICAgICAgICAgICAgICAgIGFsbG93RW1wdHk6IGFsbG93RW1wdHksXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gcmF0aW5nIHZhbHVlIGFuZCB0ZXh0IG9mIHRoZSBlbXB0eSBPUFRJT05cbiAgICAgICAgICAgICAgICAgICAgZW1wdHlSYXRpbmdWYWx1ZTogZW1wdHlWYWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgZW1wdHlSYXRpbmdUZXh0OiBlbXB0eVRleHQsXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gcmVhZC1vbmx5IHN0YXRlXG4gICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiBzZWxmLm9wdGlvbnMucmVhZG9ubHksXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gZGlkIHRoZSB1c2VyIGFscmVhZHkgc2VsZWN0IGEgcmF0aW5nP1xuICAgICAgICAgICAgICAgICAgICByYXRpbmdNYWRlOiBmYWxzZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gcmVtb3ZlIGRhdGEgb24gZWxlbWVudFxuICAgICAgICAgICAgdmFyIHJlbW92ZURhdGFPbkVsZW1lbnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLnJlbW92ZURhdGEoJ2JhcnJhdGluZycpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gcmV0dXJuIGN1cnJlbnQgcmF0aW5nIHRleHRcbiAgICAgICAgICAgIHZhciByYXRpbmdUZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGdldERhdGEoJ3JhdGluZ1RleHQnKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIHJldHVybiBjdXJyZW50IHJhdGluZyB2YWx1ZVxuICAgICAgICAgICAgdmFyIHJhdGluZ1ZhbHVlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGdldERhdGEoJ3JhdGluZ1ZhbHVlJyk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBidWlsZCB3aWRnZXQgYW5kIHJldHVybiBqUXVlcnkgZWxlbWVudFxuICAgICAgICAgICAgdmFyIGJ1aWxkV2lkZ2V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyICR3ID0gJCgnPGRpdiAvPicsIHsgJ2NsYXNzJzogJ2JyLXdpZGdldCcgfSk7XG5cbiAgICAgICAgICAgICAgICAvLyBjcmVhdGUgQSBlbGVtZW50cyB0aGF0IHdpbGwgcmVwbGFjZSBPUFRJT05zXG4gICAgICAgICAgICAgICAgc2VsZi4kZWxlbS5maW5kKCdvcHRpb24nKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdmFsLCB0ZXh0LCBodG1sLCAkYTtcblxuICAgICAgICAgICAgICAgICAgICB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNyZWF0ZSByYXRpbmdzIC0gYnV0IG9ubHkgaWYgdmFsIGlzIG5vdCBkZWZpbmVkIGFzIGVtcHR5XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWwgIT09IGdldERhdGEoJ2VtcHR5UmF0aW5nVmFsdWUnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dCA9ICQodGhpcykudGV4dCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaHRtbCA9ICQodGhpcykuZGF0YSgnaHRtbCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGh0bWwpIHsgdGV4dCA9IGh0bWw7IH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgJGEgPSAkKCc8YSAvPicsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnaHJlZic6ICcjJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZGF0YS1yYXRpbmctdmFsdWUnOiB2YWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2RhdGEtcmF0aW5nLXRleHQnOiB0ZXh0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdodG1sJzogKHNlbGYub3B0aW9ucy5zaG93VmFsdWVzKSA/IHRleHQgOiAnJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICR3LmFwcGVuZCgkYSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgLy8gYXBwZW5kIC5ici1jdXJyZW50LXJhdGluZyBkaXYgdG8gdGhlIHdpZGdldFxuICAgICAgICAgICAgICAgIGlmIChzZWxmLm9wdGlvbnMuc2hvd1NlbGVjdGVkUmF0aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICR3LmFwcGVuZCgkKCc8ZGl2IC8+JywgeyAndGV4dCc6ICcnLCAnY2xhc3MnOiAnYnItY3VycmVudC1yYXRpbmcnIH0pKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBhZGRpdGlvbmFsIGNsYXNzZXMgZm9yIHRoZSB3aWRnZXRcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5vcHRpb25zLnJldmVyc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgJHcuYWRkQ2xhc3MoJ2JyLXJldmVyc2UnKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5vcHRpb25zLnJlYWRvbmx5KSB7XG4gICAgICAgICAgICAgICAgICAgICR3LmFkZENsYXNzKCdici1yZWFkb25seScpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiAkdztcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIHJldHVybiBhIGpRdWVyeSBmdW5jdGlvbiBuYW1lIGRlcGVuZGluZyBvbiB0aGUgJ3JldmVyc2UnIHNldHRpbmdcbiAgICAgICAgICAgIHZhciBuZXh0QWxsb3JQcmV2aW91c0FsbCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmIChnZXREYXRhKCd1c2VyT3B0aW9ucycpLnJldmVyc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICduZXh0QWxsJztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3ByZXZBbGwnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIHNldCB0aGUgdmFsdWUgb2YgdGhlIHNlbGVjdCBmaWVsZFxuICAgICAgICAgICAgdmFyIHNldFNlbGVjdEZpZWxkVmFsdWUgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgIC8vIGNoYW5nZSBzZWxlY3RlZCBvcHRpb25cbiAgICAgICAgICAgICAgICBmaW5kT3B0aW9uKHZhbHVlKS5wcm9wKCdzZWxlY3RlZCcsIHRydWUpO1xuXG4gICAgICAgICAgICAgICAgc2VsZi4kZWxlbS5jaGFuZ2UoKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIHJlc2V0IHNlbGVjdCBmaWVsZFxuICAgICAgICAgICAgdmFyIHJlc2V0U2VsZWN0RmllbGQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkKCdvcHRpb24nLCBzZWxmLiRlbGVtKS5wcm9wKCdzZWxlY3RlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kZWZhdWx0U2VsZWN0ZWQ7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLmNoYW5nZSgpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gZGlzcGxheSB0aGUgY3VycmVudGx5IHNlbGVjdGVkIHJhdGluZ1xuICAgICAgICAgICAgdmFyIHNob3dTZWxlY3RlZFJhdGluZyA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgICAgICAgICAgICAgICAvLyB0ZXh0IHVuZGVmaW5lZD9cbiAgICAgICAgICAgICAgICB0ZXh0ID0gdGV4dCA/IHRleHQgOiByYXRpbmdUZXh0KCk7XG5cbiAgICAgICAgICAgICAgICAvLyBzcGVjaWFsIGNhc2Ugd2hlbiB0aGUgc2VsZWN0ZWQgcmF0aW5nIGlzIGRlZmluZWQgYXMgZW1wdHlcbiAgICAgICAgICAgICAgICBpZiAodGV4dCA9PSBnZXREYXRhKCdlbXB0eVJhdGluZ1RleHQnKSkge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0ID0gJyc7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gdXBkYXRlIC5ici1jdXJyZW50LXJhdGluZyBkaXZcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5vcHRpb25zLnNob3dTZWxlY3RlZFJhdGluZykge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLnBhcmVudCgpLmZpbmQoJy5ici1jdXJyZW50LXJhdGluZycpLnRleHQodGV4dCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gcmV0dXJuIHJvdW5kZWQgZnJhY3Rpb24gb2YgYSB2YWx1ZSAoMTQuNCAtPiA0MCwgMC45OSAtPiA5MClcbiAgICAgICAgICAgIHZhciBmcmFjdGlvbiA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGgucm91bmQoKChNYXRoLmZsb29yKHZhbHVlICogMTApIC8gMTApICUgMSkgKiAxMDApO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gcmVtb3ZlIGFsbCBjbGFzc2VzIGZyb20gZWxlbWVudHNcbiAgICAgICAgICAgIHZhciByZXNldFN0eWxlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGFsbCBjbGFzc2VzIHN0YXJ0aW5nIHdpdGggYnItKlxuICAgICAgICAgICAgICAgIHNlbGYuJHdpZGdldC5maW5kKCdhJykucmVtb3ZlQ2xhc3MoZnVuY3Rpb24oaW5kZXgsIGNsYXNzZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChjbGFzc2VzLm1hdGNoKC8oXnxcXHMpYnItXFxTKy9nKSB8fCBbXSkuam9pbignICcpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gYXBwbHkgc3R5bGUgYnkgc2V0dGluZyBjbGFzc2VzIG9uIGVsZW1lbnRzXG4gICAgICAgICAgICB2YXIgYXBwbHlTdHlsZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciAkYSA9IHNlbGYuJHdpZGdldC5maW5kKCdhW2RhdGEtcmF0aW5nLXZhbHVlPVwiJyArIHJhdGluZ1ZhbHVlKCkgKyAnXCJdJyk7XG4gICAgICAgICAgICAgICAgdmFyIGluaXRpYWxSYXRpbmcgPSBnZXREYXRhKCd1c2VyT3B0aW9ucycpLmluaXRpYWxSYXRpbmc7XG4gICAgICAgICAgICAgICAgdmFyIGJhc2VWYWx1ZSA9ICQuaXNOdW1lcmljKHJhdGluZ1ZhbHVlKCkpID8gcmF0aW5nVmFsdWUoKSA6IDA7XG4gICAgICAgICAgICAgICAgdmFyIGYgPSBmcmFjdGlvbihpbml0aWFsUmF0aW5nKTtcbiAgICAgICAgICAgICAgICB2YXIgJGFsbCwgJGZyYWN0aW9uYWw7XG5cbiAgICAgICAgICAgICAgICByZXNldFN0eWxlKCk7XG5cbiAgICAgICAgICAgICAgICAvLyBhZGQgY2xhc3Nlc1xuICAgICAgICAgICAgICAgICRhLmFkZENsYXNzKCdici1zZWxlY3RlZCBici1jdXJyZW50JylbbmV4dEFsbG9yUHJldmlvdXNBbGwoKV0oKVxuICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2JyLXNlbGVjdGVkJyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWdldERhdGEoJ3JhdGluZ01hZGUnKSAmJiAkLmlzTnVtZXJpYyhpbml0aWFsUmF0aW5nKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoKGluaXRpYWxSYXRpbmcgPD0gYmFzZVZhbHVlKSB8fCAhZikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgJGFsbCA9IHNlbGYuJHdpZGdldC5maW5kKCdhJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgJGZyYWN0aW9uYWwgPSAoJGEubGVuZ3RoKSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAkYVsoZ2V0RGF0YSgndXNlck9wdGlvbnMnKS5yZXZlcnNlKSA/ICdwcmV2JyA6ICduZXh0J10oKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAkYWxsWyhnZXREYXRhKCd1c2VyT3B0aW9ucycpLnJldmVyc2UpID8gJ2xhc3QnIDogJ2ZpcnN0J10oKTtcblxuICAgICAgICAgICAgICAgICAgICAkZnJhY3Rpb25hbC5hZGRDbGFzcygnYnItZnJhY3Rpb25hbCcpO1xuICAgICAgICAgICAgICAgICAgICAkZnJhY3Rpb25hbC5hZGRDbGFzcygnYnItZnJhY3Rpb25hbC0nICsgZik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gY2hlY2sgaWYgdGhlIGVsZW1lbnQgaXMgZGVzZWxlY3RhYmxlP1xuICAgICAgICAgICAgdmFyIGlzRGVzZWxlY3RhYmxlID0gZnVuY3Rpb24oJGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWdldERhdGEoJ2FsbG93RW1wdHknKSB8fCAhZ2V0RGF0YSgndXNlck9wdGlvbnMnKS5kZXNlbGVjdGFibGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiAocmF0aW5nVmFsdWUoKSA9PSAkZWxlbWVudC5hdHRyKCdkYXRhLXJhdGluZy12YWx1ZScpKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIGhhbmRsZSBjbGljayBldmVudHNcbiAgICAgICAgICAgIHZhciBhdHRhY2hDbGlja0hhbmRsZXIgPSBmdW5jdGlvbigkZWxlbWVudHMpIHtcbiAgICAgICAgICAgICAgICAkZWxlbWVudHMub24oJ2NsaWNrLmJhcnJhdGluZycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciAkYSA9ICQodGhpcyksXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zID0gZ2V0RGF0YSgndXNlck9wdGlvbnMnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDtcblxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gJGEuYXR0cignZGF0YS1yYXRpbmctdmFsdWUnKTtcbiAgICAgICAgICAgICAgICAgICAgdGV4dCA9ICRhLmF0dHIoJ2RhdGEtcmF0aW5nLXRleHQnKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBpcyBjdXJyZW50IGFuZCBkZXNlbGVjdGFibGU/XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0Rlc2VsZWN0YWJsZSgkYSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gZ2V0RGF0YSgnZW1wdHlSYXRpbmdWYWx1ZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dCA9IGdldERhdGEoJ2VtcHR5UmF0aW5nVGV4dCcpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gcmVtZW1iZXIgc2VsZWN0ZWQgcmF0aW5nXG4gICAgICAgICAgICAgICAgICAgIHNldERhdGEoJ3JhdGluZ1ZhbHVlJywgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBzZXREYXRhKCdyYXRpbmdUZXh0JywgdGV4dCk7XG4gICAgICAgICAgICAgICAgICAgIHNldERhdGEoJ3JhdGluZ01hZGUnLCB0cnVlKTtcblxuICAgICAgICAgICAgICAgICAgICBzZXRTZWxlY3RGaWVsZFZhbHVlKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgc2hvd1NlbGVjdGVkUmF0aW5nKHRleHQpO1xuXG4gICAgICAgICAgICAgICAgICAgIGFwcGx5U3R5bGUoKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBvblNlbGVjdCBjYWxsYmFja1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLm9uU2VsZWN0LmNhbGwoXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmF0aW5nVmFsdWUoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhdGluZ1RleHQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50XG4gICAgICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gaGFuZGxlIG1vdXNlZW50ZXIgZXZlbnRzXG4gICAgICAgICAgICB2YXIgYXR0YWNoTW91c2VFbnRlckhhbmRsZXIgPSBmdW5jdGlvbigkZWxlbWVudHMpIHtcbiAgICAgICAgICAgICAgICAkZWxlbWVudHMub24oJ21vdXNlZW50ZXIuYmFycmF0aW5nJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciAkYSA9ICQodGhpcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmVzZXRTdHlsZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICRhLmFkZENsYXNzKCdici1hY3RpdmUnKVtuZXh0QWxsb3JQcmV2aW91c0FsbCgpXSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2JyLWFjdGl2ZScpO1xuXG4gICAgICAgICAgICAgICAgICAgIHNob3dTZWxlY3RlZFJhdGluZygkYS5hdHRyKCdkYXRhLXJhdGluZy10ZXh0JykpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gaGFuZGxlIG1vdXNlbGVhdmUgZXZlbnRzXG4gICAgICAgICAgICB2YXIgYXR0YWNoTW91c2VMZWF2ZUhhbmRsZXIgPSBmdW5jdGlvbigkZWxlbWVudHMpIHtcbiAgICAgICAgICAgICAgICBzZWxmLiR3aWRnZXQub24oJ21vdXNlbGVhdmUuYmFycmF0aW5nIGJsdXIuYmFycmF0aW5nJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHNob3dTZWxlY3RlZFJhdGluZygpO1xuICAgICAgICAgICAgICAgICAgICBhcHBseVN0eWxlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBzb21ld2hhdCBwcmltaXRpdmUgd2F5IHRvIHJlbW92ZSAzMDBtcyBjbGljayBkZWxheSBvbiB0b3VjaCBkZXZpY2VzXG4gICAgICAgICAgICAvLyBmb3IgYSBtb3JlIGFkdmFuY2VkIHNvbHV0aW9uIGNvbnNpZGVyIHNldHRpbmcgYGZhc3RDbGlja3NgIG9wdGlvbiB0byBmYWxzZVxuICAgICAgICAgICAgLy8gYW5kIHVzaW5nIGEgbGlicmFyeSBzdWNoIGFzIGZhc3RjbGljayAoaHR0cHM6Ly9naXRodWIuY29tL2Z0bGFicy9mYXN0Y2xpY2spXG4gICAgICAgICAgICB2YXIgZmFzdENsaWNrcyA9IGZ1bmN0aW9uKCRlbGVtZW50cykge1xuICAgICAgICAgICAgICAgICRlbGVtZW50cy5vbigndG91Y2hzdGFydC5iYXJyYXRpbmcnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmNsaWNrKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBkaXNhYmxlIGNsaWNrc1xuICAgICAgICAgICAgdmFyIGRpc2FibGVDbGlja3MgPSBmdW5jdGlvbigkZWxlbWVudHMpIHtcbiAgICAgICAgICAgICAgICAkZWxlbWVudHMub24oJ2NsaWNrLmJhcnJhdGluZycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB2YXIgYXR0YWNoSGFuZGxlcnMgPSBmdW5jdGlvbigkZWxlbWVudHMpIHtcbiAgICAgICAgICAgICAgICAvLyBhdHRhY2ggY2xpY2sgZXZlbnQgaGFuZGxlclxuICAgICAgICAgICAgICAgIGF0dGFjaENsaWNrSGFuZGxlcigkZWxlbWVudHMpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYub3B0aW9ucy5ob3ZlclN0YXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGF0dGFjaCBtb3VzZWVudGVyIGV2ZW50IGhhbmRsZXJcbiAgICAgICAgICAgICAgICAgICAgYXR0YWNoTW91c2VFbnRlckhhbmRsZXIoJGVsZW1lbnRzKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBhdHRhY2ggbW91c2VsZWF2ZSBldmVudCBoYW5kbGVyXG4gICAgICAgICAgICAgICAgICAgIGF0dGFjaE1vdXNlTGVhdmVIYW5kbGVyKCRlbGVtZW50cyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdmFyIGRldGFjaEhhbmRsZXJzID0gZnVuY3Rpb24oJGVsZW1lbnRzKSB7XG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGV2ZW50IGhhbmRsZXJzIGluIHRoZSBcIi5iYXJyYXRpbmdcIiBuYW1lc3BhY2VcbiAgICAgICAgICAgICAgICAkZWxlbWVudHMub2ZmKCcuYmFycmF0aW5nJyk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB2YXIgc2V0dXBIYW5kbGVycyA9IGZ1bmN0aW9uKHJlYWRvbmx5KSB7XG4gICAgICAgICAgICAgICAgdmFyICRlbGVtZW50cyA9IHNlbGYuJHdpZGdldC5maW5kKCdhJyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZmFzdENsaWNrcykge1xuICAgICAgICAgICAgICAgICAgICBmYXN0Q2xpY2tzKCRlbGVtZW50cyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHJlYWRvbmx5KSB7XG4gICAgICAgICAgICAgICAgICAgIGRldGFjaEhhbmRsZXJzKCRlbGVtZW50cyk7XG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVDbGlja3MoJGVsZW1lbnRzKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhdHRhY2hIYW5kbGVycygkZWxlbWVudHMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMuc2hvdyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIC8vIHJ1biBvbmx5IG9uY2VcbiAgICAgICAgICAgICAgICBpZiAoZ2V0RGF0YSgpKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICAvLyB3cmFwIGVsZW1lbnRcbiAgICAgICAgICAgICAgICB3cmFwRWxlbWVudCgpO1xuXG4gICAgICAgICAgICAgICAgLy8gc2F2ZSBkYXRhXG4gICAgICAgICAgICAgICAgc2F2ZURhdGFPbkVsZW1lbnQoKTtcblxuICAgICAgICAgICAgICAgIC8vIGJ1aWxkICYgYXBwZW5kIHdpZGdldCB0byB0aGUgRE9NXG4gICAgICAgICAgICAgICAgc2VsZi4kd2lkZ2V0ID0gYnVpbGRXaWRnZXQoKTtcbiAgICAgICAgICAgICAgICBzZWxmLiR3aWRnZXQuaW5zZXJ0QWZ0ZXIoc2VsZi4kZWxlbSk7XG5cbiAgICAgICAgICAgICAgICBhcHBseVN0eWxlKCk7XG5cbiAgICAgICAgICAgICAgICBzaG93U2VsZWN0ZWRSYXRpbmcoKTtcblxuICAgICAgICAgICAgICAgIHNldHVwSGFuZGxlcnMoc2VsZi5vcHRpb25zLnJlYWRvbmx5KTtcblxuICAgICAgICAgICAgICAgIC8vIGhpZGUgdGhlIHNlbGVjdCBmaWVsZFxuICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0uaGlkZSgpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy5yZWFkb25seSA9IGZ1bmN0aW9uKHN0YXRlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzdGF0ZSAhPT0gJ2Jvb2xlYW4nIHx8IGdldERhdGEoJ3JlYWRPbmx5JykgPT0gc3RhdGUpIHJldHVybjtcblxuICAgICAgICAgICAgICAgIHNldHVwSGFuZGxlcnMoc3RhdGUpO1xuICAgICAgICAgICAgICAgIHNldERhdGEoJ3JlYWRPbmx5Jywgc3RhdGUpO1xuICAgICAgICAgICAgICAgIHNlbGYuJHdpZGdldC50b2dnbGVDbGFzcygnYnItcmVhZG9ubHknKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMuc2V0ID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgb3B0aW9ucyA9IGdldERhdGEoJ3VzZXJPcHRpb25zJyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoc2VsZi4kZWxlbS5maW5kKCdvcHRpb25bdmFsdWU9XCInICsgdmFsdWUgKyAnXCJdJykubGVuZ3RoID09PSAwKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICAvLyBzZXQgZGF0YVxuICAgICAgICAgICAgICAgIHNldERhdGEoJ3JhdGluZ1ZhbHVlJywgdmFsdWUpO1xuICAgICAgICAgICAgICAgIHNldERhdGEoJ3JhdGluZ1RleHQnLCBzZWxmLiRlbGVtLmZpbmQoJ29wdGlvblt2YWx1ZT1cIicgKyB2YWx1ZSArICdcIl0nKS50ZXh0KCkpO1xuICAgICAgICAgICAgICAgIHNldERhdGEoJ3JhdGluZ01hZGUnLCB0cnVlKTtcblxuICAgICAgICAgICAgICAgIHNldFNlbGVjdEZpZWxkVmFsdWUocmF0aW5nVmFsdWUoKSk7XG4gICAgICAgICAgICAgICAgc2hvd1NlbGVjdGVkUmF0aW5nKHJhdGluZ1RleHQoKSk7XG5cbiAgICAgICAgICAgICAgICBhcHBseVN0eWxlKCk7XG5cbiAgICAgICAgICAgICAgICAvLyBvblNlbGVjdCBjYWxsYmFja1xuICAgICAgICAgICAgICAgIGlmICghb3B0aW9ucy5zaWxlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5vblNlbGVjdC5jYWxsKFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhdGluZ1ZhbHVlKCksXG4gICAgICAgICAgICAgICAgICAgICAgICByYXRpbmdUZXh0KClcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLmNsZWFyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSBnZXREYXRhKCd1c2VyT3B0aW9ucycpO1xuXG4gICAgICAgICAgICAgICAgLy8gcmVzdG9yZSBvcmlnaW5hbCBkYXRhXG4gICAgICAgICAgICAgICAgc2V0RGF0YSgncmF0aW5nVmFsdWUnLCBnZXREYXRhKCdvcmlnaW5hbFJhdGluZ1ZhbHVlJykpO1xuICAgICAgICAgICAgICAgIHNldERhdGEoJ3JhdGluZ1RleHQnLCBnZXREYXRhKCdvcmlnaW5hbFJhdGluZ1RleHQnKSk7XG4gICAgICAgICAgICAgICAgc2V0RGF0YSgncmF0aW5nTWFkZScsIGZhbHNlKTtcblxuICAgICAgICAgICAgICAgIHJlc2V0U2VsZWN0RmllbGQoKTtcbiAgICAgICAgICAgICAgICBzaG93U2VsZWN0ZWRSYXRpbmcocmF0aW5nVGV4dCgpKTtcblxuICAgICAgICAgICAgICAgIGFwcGx5U3R5bGUoKTtcblxuICAgICAgICAgICAgICAgIC8vIG9uQ2xlYXIgY2FsbGJhY2tcbiAgICAgICAgICAgICAgICBvcHRpb25zLm9uQ2xlYXIuY2FsbChcbiAgICAgICAgICAgICAgICAgICAgdGhpcyxcbiAgICAgICAgICAgICAgICAgICAgcmF0aW5nVmFsdWUoKSxcbiAgICAgICAgICAgICAgICAgICAgcmF0aW5nVGV4dCgpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMuZGVzdHJveSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IHJhdGluZ1ZhbHVlKCk7XG4gICAgICAgICAgICAgICAgdmFyIHRleHQgPSByYXRpbmdUZXh0KCk7XG4gICAgICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSBnZXREYXRhKCd1c2VyT3B0aW9ucycpO1xuXG4gICAgICAgICAgICAgICAgLy8gZGV0YWNoIGhhbmRsZXJzXG4gICAgICAgICAgICAgICAgZGV0YWNoSGFuZGxlcnMoc2VsZi4kd2lkZ2V0LmZpbmQoJ2EnKSk7XG5cbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgd2lkZ2V0XG4gICAgICAgICAgICAgICAgc2VsZi4kd2lkZ2V0LnJlbW92ZSgpO1xuXG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGRhdGFcbiAgICAgICAgICAgICAgICByZW1vdmVEYXRhT25FbGVtZW50KCk7XG5cbiAgICAgICAgICAgICAgICAvLyB1bndyYXAgdGhlIGVsZW1lbnRcbiAgICAgICAgICAgICAgICB1bndyYXBFbGVtZW50KCk7XG5cbiAgICAgICAgICAgICAgICAvLyBzaG93IHRoZSBlbGVtZW50XG4gICAgICAgICAgICAgICAgc2VsZi4kZWxlbS5zaG93KCk7XG5cbiAgICAgICAgICAgICAgICAvLyBvbkRlc3Ryb3kgY2FsbGJhY2tcbiAgICAgICAgICAgICAgICBvcHRpb25zLm9uRGVzdHJveS5jYWxsKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgdGV4dFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgQmFyUmF0aW5nLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKG9wdGlvbnMsIGVsZW0pIHtcbiAgICAgICAgICAgIHRoaXMuJGVsZW0gPSAkKGVsZW0pO1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zID0gJC5leHRlbmQoe30sICQuZm4uYmFycmF0aW5nLmRlZmF1bHRzLCBvcHRpb25zKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucztcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gQmFyUmF0aW5nO1xuICAgIH0pKCk7XG5cbiAgICAkLmZuLmJhcnJhdGluZyA9IGZ1bmN0aW9uIChtZXRob2QsIG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcGx1Z2luID0gbmV3IEJhclJhdGluZygpO1xuXG4gICAgICAgICAgICAvLyBwbHVnaW4gd29ya3Mgd2l0aCBzZWxlY3QgZmllbGRzXG4gICAgICAgICAgICBpZiAoISQodGhpcykuaXMoJ3NlbGVjdCcpKSB7XG4gICAgICAgICAgICAgICAgJC5lcnJvcignU29ycnksIHRoaXMgcGx1Z2luIG9ubHkgd29ya3Mgd2l0aCBzZWxlY3QgZmllbGRzLicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBtZXRob2Qgc3VwcGxpZWRcbiAgICAgICAgICAgIGlmIChwbHVnaW4uaGFzT3duUHJvcGVydHkobWV0aG9kKSkge1xuICAgICAgICAgICAgICAgIHBsdWdpbi5pbml0KG9wdGlvbnMsIHRoaXMpO1xuICAgICAgICAgICAgICAgIGlmIChtZXRob2QgPT09ICdzaG93Jykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGx1Z2luLnNob3cob3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gcGx1Z2luIGV4aXN0cz9cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBsdWdpbi4kZWxlbS5kYXRhKCdiYXJyYXRpbmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGx1Z2luLiR3aWRnZXQgPSAkKHRoaXMpLm5leHQoJy5ici13aWRnZXQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwbHVnaW5bbWV0aG9kXShvcHRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gbm8gbWV0aG9kIHN1cHBsaWVkIG9yIG9ubHkgb3B0aW9ucyBzdXBwbGllZFxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgbWV0aG9kID09PSAnb2JqZWN0JyB8fCAhbWV0aG9kKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucyA9IG1ldGhvZDtcbiAgICAgICAgICAgICAgICBwbHVnaW4uaW5pdChvcHRpb25zLCB0aGlzKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGx1Z2luLnNob3coKTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkLmVycm9yKCdNZXRob2QgJyArIG1ldGhvZCArICcgZG9lcyBub3QgZXhpc3Qgb24galF1ZXJ5LmJhcnJhdGluZycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgJC5mbi5iYXJyYXRpbmcuZGVmYXVsdHMgPSB7XG4gICAgICAgIHRoZW1lOicnLFxuICAgICAgICBpbml0aWFsUmF0aW5nOm51bGwsIC8vIGluaXRpYWwgcmF0aW5nXG4gICAgICAgIGFsbG93RW1wdHk6bnVsbCwgLy8gYWxsb3cgZW1wdHkgcmF0aW5ncz9cbiAgICAgICAgZW1wdHlWYWx1ZTonJywgLy8gdGhpcyBpcyB0aGUgZXhwZWN0ZWQgdmFsdWUgb2YgdGhlIGVtcHR5IHJhdGluZ1xuICAgICAgICBzaG93VmFsdWVzOmZhbHNlLCAvLyBkaXNwbGF5IHJhdGluZyB2YWx1ZXMgb24gdGhlIGJhcnM/XG4gICAgICAgIHNob3dTZWxlY3RlZFJhdGluZzp0cnVlLCAvLyBhcHBlbmQgYSBkaXYgd2l0aCBhIHJhdGluZyB0byB0aGUgd2lkZ2V0P1xuICAgICAgICBkZXNlbGVjdGFibGU6dHJ1ZSwgLy8gYWxsb3cgdG8gZGVzZWxlY3QgcmF0aW5ncz9cbiAgICAgICAgcmV2ZXJzZTpmYWxzZSwgLy8gcmV2ZXJzZSB0aGUgcmF0aW5nP1xuICAgICAgICByZWFkb25seTpmYWxzZSwgLy8gbWFrZSB0aGUgcmF0aW5nIHJlYWR5LW9ubHk/XG4gICAgICAgIGZhc3RDbGlja3M6dHJ1ZSwgLy8gcmVtb3ZlIDMwMG1zIGNsaWNrIGRlbGF5IG9uIHRvdWNoIGRldmljZXM/XG4gICAgICAgIGhvdmVyU3RhdGU6dHJ1ZSwgLy8gY2hhbmdlIHN0YXRlIG9uIGhvdmVyP1xuICAgICAgICBzaWxlbnQ6ZmFsc2UsIC8vIHN1cHJlc3MgY2FsbGJhY2tzIHdoZW4gY29udHJvbGxpbmcgcmF0aW5ncyBwcm9ncmFtYXRpY2FsbHlcbiAgICAgICAgb25TZWxlY3Q6ZnVuY3Rpb24gKHZhbHVlLCB0ZXh0LCBldmVudCkge1xuICAgICAgICB9LCAvLyBjYWxsYmFjayBmaXJlZCB3aGVuIGEgcmF0aW5nIGlzIHNlbGVjdGVkXG4gICAgICAgIG9uQ2xlYXI6ZnVuY3Rpb24gKHZhbHVlLCB0ZXh0KSB7XG4gICAgICAgIH0sIC8vIGNhbGxiYWNrIGZpcmVkIHdoZW4gYSByYXRpbmcgaXMgY2xlYXJlZFxuICAgICAgICBvbkRlc3Ryb3k6ZnVuY3Rpb24gKHZhbHVlLCB0ZXh0KSB7XG4gICAgICAgIH0gLy8gY2FsbGJhY2sgZmlyZWQgd2hlbiBhIHdpZGdldCBpcyBkZXN0cm95ZWRcbiAgICB9O1xuXG4gICAgJC5mbi5iYXJyYXRpbmcuQmFyUmF0aW5nID0gQmFyUmF0aW5nO1xuXG59KSk7IiwiLyoqXG4gKiBAcGFja2FnZSAgICBLbm93IFJlc2VydmF0aW9uc1xuICogQHN1YnBhY2thZ2UgU2l0ZSBKU1xuICogQGNvcHlyaWdodCAgMjAyMCBIaWdobGFuZCBWaXNpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBAbGljZW5zZSAgICBTZWUgdGhlIGZpbGUgXCJMSUNFTlNFLnR4dFwiIGZvciB0aGUgZnVsbCBsaWNlbnNlIGdvdmVybmluZyB0aGlzIGNvZGUuXG4gKiBAYXV0aG9yICAgICBIYXplbCBXaWxzb24gPGhhemVsQGhpZ2hsYW5kdmlzaW9uLmNvbT5cbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxubGV0IGxhbmc7XG5sZXQgc2VhcmNoRGF0YSA9IFtdO1xubGV0IHNlYXJjaERvbmUgPSBmYWxzZTtcbmxldCBjYWxlbmRhckxvYWRlZCA9IGZhbHNlO1xubGV0IHNhdmVkd2lkdGggPSBmYWxzZTtcbmxldCBsYXJnZTtcbmxldCByZXNpemVkID0gZmFsc2U7XG5cbihmdW5jdGlvbiAoJCkge1xuICAgICQoZnVuY3Rpb24gKCkge1xuICAgICAgICBGb3VuZGF0aW9uLmFkZFRvSnF1ZXJ5KCk7XG4gICAgICAgICQoZG9jdW1lbnQpLmZvdW5kYXRpb24oKTtcblxuICAgICAgICBsYW5nID0gJCgnI2tyLWxhbmcnKS5kYXRhKCdrcmxhbmcnKTtcblxuICAgICAgICBjaGVja1NjcmVlbldpZHRoKCk7XG4gICAgICAgICQod2luZG93KS5vbihcInJlc2l6ZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjaGVja1NjcmVlbldpZHRoKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0ICRjdHJpZ2dlciA9ICQoJyNrci1wYWdlLWdlcmlhdHJpYy1jYWxlbmRhci10cmlnZ2VyJyk7XG4gICAgICAgIGlmICgkY3RyaWdnZXIubGVuZ3RoICYmICFjYWxlbmRhckxvYWRlZCkge1xuICAgICAgICAgICAgbG9hZENhbGVuZGFyKCRjdHJpZ2dlci5kYXRhKCdwaWQnKSwgJGN0cmlnZ2VyLmRhdGEoJ3RhcmdldCcpKTtcbiAgICAgICAgICAgIGNhbGVuZGFyTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdzdWJtaXQnLCAnLmFqYXhmb3JtJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGNvbnN0ICRmb3JtID0gJCh0aGlzKTtcbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICAgICAgICAgIHVybDogJGZvcm0uYXR0cignYWN0aW9uJykgKyAnJmxhbmc9JyArIGxhbmcsXG4gICAgICAgICAgICAgICAgZGF0YTogJGZvcm0uc2VyaWFsaXplKCksXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5kYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybVJlc3BvbnNlKCRmb3JtLmF0dHIoJ2lkJyksIHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnLyc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcua3ItYWpheC1tb2RhbC1lcnJvci1tZXNzYWdlJykuaHRtbChyZXN1bHQubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCAkbW9kYWwgPSBuZXcgRm91bmRhdGlvbi5SZXZlYWwoJCgnI0tyQWpheE1vZGFsRXJyb3InKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkbW9kYWwub3BlbigpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAkKCcua3ItYWpheC1tb2RhbC1lcnJvci1tZXNzYWdlJykuaHRtbCgnU29ycnkgYW4gZXJyb3IgaGFzIG9jY3VycmVkLCBwbGVhc2UgdHJ5IGFnYWluJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0ICRtb2RhbCA9IG5ldyBGb3VuZGF0aW9uLlJldmVhbCgkKCcjS3JBamF4TW9kYWxFcnJvcicpKTtcbiAgICAgICAgICAgICAgICAgICAgJG1vZGFsLm9wZW4oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSkub24oJ3Nob3cuemYuZHJvcGRvd24nLCAnI2tyLXNlYXJjaHJlZ2lvbi1kcm9wJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJChcIiNrci1zZWFyY2hyZWdpb24tZHJvcFwiKS5jc3MoJ29wYWNpdHknLCAnMScpO1xuICAgICAgICB9KS5vbignc2hvdy56Zi5kcm9wZG93bicsICcja3Itc2VhcmNoZ3Vlc3QtZHJvcCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQoJyNrci1zZWFyY2hndWVzdC1kcm9wJykuY3NzKCdvcGFjaXR5JywgJzEnKTtcbiAgICAgICAgfSkub24oJ2hpZGUuemYuZHJvcGRvd24nLCAnI2tyLXNlYXJjaHJlZ2lvbi1kcm9wLCAja3Itc2VhcmNoZ3Vlc3QtZHJvcCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQoJ2JvZHknKS5jc3MoJ29wYWNpdHknLCAnMScpO1xuICAgICAgICB9KS5vbignaGlkZS56Zi5kcm9wZG93bicsICcja3ItcXVvdGUtZm9ybScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQoJyNndWVzdHMnKS50cmlnZ2VyKCdjaGFuZ2UnKTtcbiAgICAgICAgfSkub24oJ29wZW4uemYucmV2ZWFsJywgJy5rci1hamF4LW1vZGFsW2RhdGEtcmV2ZWFsXScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjb25zdCBtb2RhbGlkID0gXCIjXCIgKyAkKHRoaXMpLmF0dHIoJ2lkJyk7XG4gICAgICAgICAgICBpZiAoISQudHJpbSgkKG1vZGFsaWQpLmh0bWwoKSkubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYWpheHVybCA9ICQodGhpcykuZGF0YSgnYWpheHVybCcpO1xuICAgICAgICAgICAgICAgIGlmIChhamF4dXJsKSB7XG4gICAgICAgICAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6IGFqYXh1cmwsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoY29udGVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQobW9kYWxpZCkuaHRtbChjb250ZW50KS50cmlnZ2VyKCdyZXNpemVtZS56Zi5yZXZlYWwnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKG1vZGFsaWQpLmZvdW5kYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KS5vbignY2xpY2snLCAnLmZhdnNwYW4nLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgY29uc3QgcGlkID0gJCh0aGlzKS5kYXRhKCdwcm9wZXJ0eScpO1xuICAgICAgICAgICAgY29uc3QgYmFyID0gJCgnLmtyLXNlYXJjaGJhciBhLmlzLWFjdGl2ZScpLmRhdGEoJ2JhcicpO1xuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgdXJsOiAnL2luZGV4LnBocD9vcHRpb249Y29tX2tub3dyZXMmdGFzaz1wcm9wZXJ0aWVzLmZhdm91cml0ZSZsYW5nPScgKyBsYW5nLFxuICAgICAgICAgICAgICAgIGRhdGE6IHsncHJvcGVydHlfaWQnOiBwaWR9LFxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldFByb3BlcnRpZXMoYmFyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KS5vbignY2xpY2snLCAnLmdldFJlc3BvbnNlU2VhcmNoJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmRhdGEoJ2FjdGlvbicpID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBnZXRQcm9wZXJ0aWVzKCQodGhpcykuZGF0YSgnYmFyJykpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBnZXRQcm9wZXJ0aWVzKCQodGhpcykuZGF0YSgnYmFyJyksICQodGhpcykuZGF0YSgnYWN0aW9uJyksICQodGhpcykuZGF0YSgnYWN0aW9uLXZhbHVlJykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KS5vbignY2xpY2snLCAnLmtyLWZpbHRlcnMtY2xvc2UnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgJCgnLmtyLWZpbHRlcnMudG9wJykuYWRkQ2xhc3MoJ2hpZGVtZScpO1xuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgIH0pLm9uKCdjbGljaycsICcua3ItZmlsdGVycyB1bC5maWx0ZXItc29ydC1saXN0IGxpLmhlYWQnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5jaGlsZHJlbignbGkuY2hlY2tib3gnKS50b2dnbGUoKTtcbiAgICAgICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICB9KS5vbignY2xpY2snLCAnI3Nob3dnYXRld2F5cycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAkKCcja3ItZ2F0ZXdheXMnKS50b2dnbGVDbGFzcygnaGlkZW1lJyk7XG4gICAgICAgIH0pLm9uKCdjbGljaycsICdhLmtyLXNlYXJjaGJhcicsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBzZXRBY3RpdmVNZW51KCQodGhpcykuZGF0YSgnYmFyJykpO1xuICAgICAgICB9KS5vbignY2xpY2snLCAnLnRvZ2dsZW90aGVyJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICQodGhpcykuZGF0YSgnb3RoZXInKS50b2dnbGUoKTtcbiAgICAgICAgfSkub24oJ2NsaWNrJywgJyNrci1wcm9wZXJ0eS10YWJzIGFbaHJlZj1cIiNjYWxlbmRhclwiXScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBpZiAoIWNhbGVuZGFyTG9hZGVkKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcGlkID0gJCh0aGlzKS5kYXRhKCdwaWQnKTtcbiAgICAgICAgICAgICAgICBsb2FkQ2FsZW5kYXIocGlkLCAnI2NhbGVuZGFyLnRhYnMtcGFuZWwnKTtcbiAgICAgICAgICAgICAgICBjYWxlbmRhckxvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLm9uKCdtb3VzZW92ZXInLCAnI2tyLXRodW1iIGltZycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGxldCBwcm9wZXJ0eSA9ICQodGhpcykucGFyZW50KCkuZGF0YSgnaWQnKTtcbiAgICAgICAgICAgIGlmIChwcm9wZXJ0eSkge1xuICAgICAgICAgICAgICAgIGxldCB0YXJnZXQgPSAnLnRodW1ib3ZlcnZpZXcnICsgcHJvcGVydHk7XG4gICAgICAgICAgICAgICAgJCgnI3BpbmZvJykuaHRtbCgkKHRhcmdldCkuaHRtbCgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0ICRwcm9wcyA9ICQoJy5rci1wcm9wZXJ0aWVzJyk7XG4gICAgICAgIGlmICgkcHJvcHMubGVuZ3RoICYmICFzZWFyY2hEb25lKSB7XG4gICAgICAgICAgICBnZXRQcm9wZXJ0aWVzKCRwcm9wcy5kYXRhKCdiYXInKSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgJHRhYnMgPSAkKCcudGFicycpO1xuICAgICAgICBpZiAoJCgnI2tyLXByb3BlcnR5LXRhYnMnKS5sZW5ndGggJiYgIWNhbGVuZGFyTG9hZGVkKSB7XG4gICAgICAgICAgICAkdGFicy5maW5kKCdhJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykuYXR0cignaHJlZicpID09PSBcIiNjYWxlbmRhclwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBpZCA9ICQodGhpcykuZGF0YSgncGlkJyk7XG4gICAgICAgICAgICAgICAgICAgIGxvYWRDYWxlbmRhcihwaWQsICcjY2FsZW5kYXIudGFicy1wYW5lbCcpO1xuICAgICAgICAgICAgICAgICAgICBjYWxlbmRhckxvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgICQuZXZlbnQuc3BlY2lhbC50b3VjaHN0YXJ0ID0ge1xuICAgICAgICBzZXR1cDogZnVuY3Rpb24gKF8sIG5zLCBoYW5kbGUpIHtcbiAgICAgICAgICAgIGlmIChucy5pbmNsdWRlcyhcIm5vUHJldmVudERlZmF1bHRcIikpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIGhhbmRsZSwge3Bhc3NpdmU6IGZhbHNlfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgaGFuZGxlLCB7cGFzc2l2ZTogdHJ1ZX0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICAkLmV2ZW50LnNwZWNpYWwudG91Y2htb3ZlID0ge1xuICAgICAgICBzZXR1cDogZnVuY3Rpb24gKF8sIG5zLCBoYW5kbGUpIHtcbiAgICAgICAgICAgIGlmIChucy5pbmNsdWRlcyhcIm5vUHJldmVudERlZmF1bHRcIikpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIiwgaGFuZGxlLCB7cGFzc2l2ZTogZmFsc2V9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsIGhhbmRsZSwge3Bhc3NpdmU6IHRydWV9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBsb2FkQ2FsZW5kYXIocGlkLCB0YXJnZXQpIHtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgICAgIHVybDogJy9pbmRleC5waHA/b3B0aW9uPWNvbV9rbm93cmVzJnRhc2s9cHJvcGVydHkuZ2VyaWF0cmljJmxhbmc9JyArIGxhbmcsXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2h0bWwnLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICdwaWQnOiBwaWRcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICQodGFyZ2V0KS5hcHBlbmQoZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZvcm1SZXNwb25zZShpZCwgZGF0YSkge1xuICAgICAgICBpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eSgncmVkaXJlY3QnKSkge1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2UoZGF0YS5yZWRpcmVjdCk7XG4gICAgICAgIH0gZWxzZSBpZiAoaWQgPT09ICdrci1mb3JtLXBheW1lbnQnKSB7XG4gICAgICAgICAgICBpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eSgnaHRtbCcpKSB7XG4gICAgICAgICAgICAgICAgbGV0ICRtb2RhbCA9ICQoJyNrci1nYXRld2F5LW1vZGFsJyk7XG4gICAgICAgICAgICAgICAgJG1vZGFsLmh0bWwoZGF0YS5odG1sKS50cmlnZ2VyKCdyZXNpemVtZS56Zi5yZXZlYWwnKTtcbiAgICAgICAgICAgICAgICAkbW9kYWwuZm91bmRhdGlvbignb3BlbicpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChpZCA9PT0gJ2tyLWZvcm0tbWFpbGNoaW1wJykge1xuICAgICAgICAgICAgJCgnI3Jlc3BvbnNlMicpLmh0bWwoZGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRQcm9wZXJ0aWVzKGJhciwgYWN0aW9uID0gJycsIGFjdGlvbl92YWx1ZSA9ICcnKSB7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6ICcvaW5kZXgucGhwP29wdGlvbj1jb21fa25vd3JlcyZ2aWV3PXByb3BlcnRpZXMmZm9ybWF0PXJhdyZsYW5nPScgKyBsYW5nLFxuICAgICAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICAgICAgZGF0YTogeydiYXInOiBiYXIsICdhY3Rpb24nOiBhY3Rpb24sICdhY3Rpb25fdmFsdWUnOiBhY3Rpb25fdmFsdWV9LFxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHMgPSBbJ2xpc3QnLCAnZ3JpZCcsICd0aHVtYicsICdmYXZzJywgJ21hcCddO1xuICAgICAgICAgICAgICAgIGlmICh2YWxzLmluY2x1ZGVzKGRhdGEuYmFyKSkge1xuICAgICAgICAgICAgICAgICAgICBzZXRBY3RpdmVNZW51KGRhdGEuYmFyKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBzZXRTZWFyY2hEYXRhKGRhdGEsIGRhdGEuYmFyKTtcbiAgICAgICAgICAgICAgICAkKCcuaGFzLXRpcCcpLmZvdW5kYXRpb24oKTtcbiAgICAgICAgICAgICAgICAkKCcuZHJvcGRvd24tcGFuZScpLmZvdW5kYXRpb24oKTtcbiAgICAgICAgICAgICAgICAkKCcua3ItcHJvcGVydHkgLmNhcmQnKS5mb3VuZGF0aW9uKCk7XG4gICAgICAgICAgICAgICAgJCgnI2tyLW9yZGVyLWNsb3NlJykudHJpZ2dlcignY2xpY2snKTtcbiAgICAgICAgICAgICAgICBzZWFyY2hEb25lID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0U2VhcmNoRGF0YShyZXNwb25zZSwgYWN0aW9uID0gJycpIHtcbiAgICAgICAgaWYgKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAkKCcja3ItcHJvcGVydGllcy1kYXRhJykuZW1wdHkoKS5mYWRlSW4oJ3Nsb3cnKS5odG1sKHJlc3BvbnNlWydpdGVtcyddKS5mb3VuZGF0aW9uKCk7XG4gICAgICAgICAgICAkKCcja3ItcHJvcGVydGllcy1maWx0ZXItaGVhZGluZycpLmh0bWwocmVzcG9uc2VbJ2hlYWRpbmcnXSk7XG4gICAgICAgICAgICAkKCcua3ItcGFnZXInKS5odG1sKHJlc3BvbnNlWydwYWdpbmF0aW9uJ10pO1xuICAgICAgICAgICAgaWYgKGFjdGlvbiAhPT0gJ3RodW1iJykge1xuICAgICAgICAgICAgICAgICQoJy5rci1wYWdlci5ib3R0b20nKS5odG1sKHJlc3BvbnNlWydwYWdpbmF0aW9uJ10pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKCcua3ItcGFnZXIuYm90dG9tJykuZW1wdHkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICQoXCIja3Itb2ZmY2FudmFzLXByb3BlcnRpZXMtZmlsdGVyXCIpLmh0bWwocmVzcG9uc2VbJ2ZpbHRlcnMnXSk7XG4gICAgICAgICAgICAkKFwiI2tyLW9mZmNhbnZhcy1wcm9wZXJ0aWVzLXNvcnRieVwiKS5odG1sKHJlc3BvbnNlWydzb3J0YnknXSk7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICQoXCIja3Itb2ZmY2FudmFzLXRvcC1zZWFyY2hcIikuaHRtbChyZXNwb25zZVsnc2VhcmNoJ10pO1xuXG4gICAgICAgICAgICBpZiAocmVzcG9uc2VbJ3NlYXJjaCddLmxlbmd0aCAmJiAkKCcjYXJyaXZhbGRzcCcpLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICQoJ2JvZHknKS50cmlnZ2VyKCdpbml0YWpheHNlYXJjaCcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAkKCcuc2lkZWJhciAua3ItZmlsdGVycyB1bC5maWx0ZXItc29ydC1saXN0IGxpLmhlYWQnKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5jaGlsZHJlbignbGkuY2hlY2tib3gnKS5zaG93KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5jaGlsZHJlbignbGkuY2hlY2tib3gnKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChhY3Rpb24gPT09ICdwYWdlJykge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldEFjdGl2ZU1lbnUoYmFyKSB7XG4gICAgICAgIGNvbnN0IHNlYXJjaGJhciA9ICQoJy5rci1zZWFyY2hiYXInKS5maW5kKCcuYnV0dG9uJyk7XG4gICAgICAgICQuZWFjaChzZWFyY2hiYXIsIGZ1bmN0aW9uIChpbmRleCwgc2VhcmNoYmFyKSB7XG4gICAgICAgICAgICAkKHNlYXJjaGJhcikucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICB9KTtcbiAgICAgICAgJCgnLmtyLXNlYXJjaGJhciAuYnV0dG9uLicgKyBiYXIpLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gdHJ1ZSBpZiB3aWR0aCBoYXMgY2hhbmdlZFxuICAgIGZ1bmN0aW9uIHNjcmVlbldpZHRoSGFzQ2hhbmdlZCgpIHtcbiAgICAgICAgbGFyZ2UgPSBGb3VuZGF0aW9uLk1lZGlhUXVlcnkuYXRMZWFzdCgnbGFyZ2UnKTtcbiAgICAgICAgaWYgKGxhcmdlICE9PSBzYXZlZHdpZHRoKSB7XG4gICAgICAgICAgICBzYXZlZHdpZHRoID0gbGFyZ2U7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tTY3JlZW5XaWR0aCgpIHtcbiAgICAgICAgcmVzaXplZCA9IGZhbHNlO1xuICAgICAgICBpZiAoc2NyZWVuV2lkdGhIYXNDaGFuZ2VkKCkgJiYgc2VhcmNoRGF0YVsnaXRlbXMnXSAmJiAhcmVzaXplZCkge1xuICAgICAgICAgICAgc2V0U2VhcmNoRGF0YShzZWFyY2hEYXRhKTtcbiAgICAgICAgICAgIHJlc2l6ZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgJC5ldmVudC5zcGVjaWFsLnRvdWNoc3RhcnQgPSB7XG4gICAgICAgIHNldHVwOiBmdW5jdGlvbiAoXywgbnMsIGhhbmRsZSkge1xuICAgICAgICAgICAgaWYgKG5zLmluY2x1ZGVzKFwibm9QcmV2ZW50RGVmYXVsdFwiKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgaGFuZGxlLCB7cGFzc2l2ZTogZmFsc2V9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCBoYW5kbGUsIHtwYXNzaXZlOiB0cnVlfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgICQuZXZlbnQuc3BlY2lhbC50b3VjaG1vdmUgPSB7XG4gICAgICAgIHNldHVwOiBmdW5jdGlvbiAoXywgbnMsIGhhbmRsZSkge1xuICAgICAgICAgICAgaWYgKG5zLmluY2x1ZGVzKFwibm9QcmV2ZW50RGVmYXVsdFwiKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLCBoYW5kbGUsIHtwYXNzaXZlOiBmYWxzZX0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIiwgaGFuZGxlLCB7cGFzc2l2ZTogdHJ1ZX0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbn0oalF1ZXJ5KSk7IiwiLyoqXG4gKiBAcGFja2FnZSAgICBLbm93IFJlc2VydmF0aW9uc1xuICogQHN1YnBhY2thZ2UgU2l0ZSBKU1xuICogQGNvcHlyaWdodCAgMjAyMCBIaWdobGFuZCBWaXNpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBAbGljZW5zZSAgICBTZWUgdGhlIGZpbGUgXCJMSUNFTlNFLnR4dFwiIGZvciB0aGUgZnVsbCBsaWNlbnNlIGdvdmVybmluZyB0aGlzIGNvZGUuXG4gKiBAYXV0aG9yICAgICBIYXplbCBXaWxzb24gPGhhemVsQGhpZ2hsYW5kdmlzaW9uLmNvbT5cbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgkKSB7XG5cdGlmICghd2luZG93LmxvY2F0aW9uLm9yaWdpbilcblx0XHR3aW5kb3cubG9jYXRpb24ub3JpZ2luID0gd2luZG93LmxvY2F0aW9uLnByb3RvY29sICsgXCIvL1wiICsgd2luZG93LmxvY2F0aW9uLmhvc3Q7XG5cblx0bGV0IGxhbmcgPSAkKFwiI2tyLWxhbmdcIikuZGF0YSgna3JsYW5nJyk7XG5cdGxldCBteUNvbmZpcm0sICRteVRhc2s7XG5cblx0Y2xhc3MgS3Jjb25maXJtIHtcblx0XHRjb25zdHJ1Y3RvcigkZm9ybSkge1xuXHRcdFx0dGhpcy5mb3JtID0gJGZvcm07XG5cdFx0XHR0aGlzLmluaXQoKTtcblx0XHR9XG5cblx0XHRpbml0KCkge1xuXHRcdFx0dGhpcy51cGRhdGVRdW90ZSh0aGlzLmZvcm0pO1xuXHRcdH1cblxuXHRcdHVwZGF0ZVF1b3RlKCRmb3JtKSB7XG5cdFx0XHQkbXlUYXNrID0gJCgnI215dGFzaycpO1xuXHRcdFx0JG15VGFzay52YWwoJ2NvbmZpcm0uY29tcHV0ZScpO1xuXHRcdFx0alF1ZXJ5LmFqYXgoe1xuXHRcdFx0XHR0eXBlOiAgICAgJ1BPU1QnLFxuXHRcdFx0XHR1cmw6ICAgICAgJ2luZGV4LnBocD9vcHRpb249Y29tX2tub3dyZXMmdGFzaz1jb25maXJtLmNvbXB1dGUmbGFuZz0nICsgbGFuZyxcblx0XHRcdFx0ZGF0YTogICAgICRmb3JtLnNlcmlhbGl6ZUFycmF5KCksXG5cdFx0XHRcdGRhdGFUeXBlOiAnanNvbicsXG5cdFx0XHRcdHN1Y2Nlc3M6ICBmdW5jdGlvbiAocmVzdWx0KSB7XG5cdFx0XHRcdFx0JG15VGFzay52YWwoJ2NvbmZpcm0ucGF5bWVudCcpO1xuXHRcdFx0XHRcdGlmIChyZXN1bHQuc3VjY2Vzcykge1xuXHRcdFx0XHRcdFx0Y29uc3QgZGF0YSA9IHJlc3VsdC5kYXRhO1xuXHRcdFx0XHRcdFx0aWYgKGRhdGEuaGFzT3duUHJvcGVydHkoJ3JlZGlyZWN0JykpIHtcblx0XHRcdFx0XHRcdFx0d2luZG93LmxvY2F0aW9uLnJlcGxhY2UoZGF0YS5yZWRpcmVjdCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRsZXQgZGl2O1xuXHRcdFx0XHRcdFx0JC5lYWNoKHJlc3VsdC5kYXRhLnJlc3BvbnNlLCBmdW5jdGlvbiAoa2V5LCB2YWwpIHtcblx0XHRcdFx0XHRcdFx0JCgnLmhpZGVpbml0aWFsJykuc2hvdygpO1xuXHRcdFx0XHRcdFx0XHRkaXYgPSBcIiNcIiArIGtleTtcblx0XHRcdFx0XHRcdFx0JChkaXYpLnRleHQodmFsKTtcblx0XHRcdFx0XHRcdFx0JChkaXYpLmh0bWwodmFsKTtcblx0XHRcdFx0XHRcdFx0JChkaXYpLnZhbCh2YWwpO1xuXHRcdFx0XHRcdFx0XHQkKGRpdikuc2hvdygpO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdCQoJy5rci1hamF4LW1vZGFsLWVycm9yLW1lc3NhZ2UnKS5odG1sKHJlc3VsdC5tZXNzYWdlKTtcblx0XHRcdFx0XHRcdGNvbnN0ICRtb2RhbCA9IG5ldyBGb3VuZGF0aW9uLlJldmVhbCgkKCcjS3JBamF4TW9kYWxFcnJvcicpKTtcblx0XHRcdFx0XHRcdCRtb2RhbC5vcGVuKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXHQkKGZ1bmN0aW9uICgpIHtcblx0XHRsZXQgJGVsZW1lbnQgPSAkKCcja3ItZm9ybS1jb25maXJtJyk7XG5cdFx0aWYgKCRlbGVtZW50Lmxlbmd0aCkge1xuXHRcdFx0bXlDb25maXJtID0gbmV3IEtyY29uZmlybSgkZWxlbWVudCk7XG5cdFx0fVxuXHRcdCRlbGVtZW50Lm9uKCdjaGFuZ2UgY2xpY2snLCAnLmtyLWNhbGN1bGF0ZScsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHQkZWxlbWVudCA9ICQoJyNrci1mb3JtLWNvbmZpcm0nKTtcblx0XHRcdG15Q29uZmlybS51cGRhdGVRdW90ZSgkZWxlbWVudCk7XG5cdFx0fSk7XG5cblx0XHQkKGRvY3VtZW50KS5vbignY2xpY2snLCAnI2NoZWNrdGVybXMnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0aWYgKGNoZWNrVGVybXMoKSkge1xuXHRcdFx0XHQkKCcjY2hlY2t0ZXJtcycpLnRyaWdnZXIoJ3N1Ym1pdCcpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9KTtcblxuXHQvLyBub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcblx0ZnVuY3Rpb24gY2hlY2tUZXJtcygpIHtcblx0XHRsZXQgcmVzdWx0ID0gdHJ1ZTtcblx0XHRjb25zdCB0ZXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FncmVlY2hlY2snKTtcblx0XHRjb25zdCB0ZXN0YyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZ3JlZWNoZWNrYycpO1xuXHRcdGNvbnN0IHRlc3R0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FncmVlY2hlY2t0Jyk7XG5cblx0XHQvLyBub2luc3BlY3Rpb24gSlNVbnJlc29sdmVkVmFyaWFibGVcblx0XHRpZiAodGVzdCAmJiAhZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2tyLWZvcm0tcGF5bWVudCcpLmFncmVlY2hlY2suY2hlY2tlZCkge1xuXHRcdFx0cmVzdWx0ID0gZmFsc2U7XG5cdFx0fVxuXHRcdC8vIG5vaW5zcGVjdGlvbiBKU1VucmVzb2x2ZWRWYXJpYWJsZVxuXHRcdGlmICh0ZXN0YyAmJiAhZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2tyLWZvcm0tcGF5bWVudCcpLmFncmVlY2hlY2tjLmNoZWNrZWQpIHtcblx0XHRcdHJlc3VsdCA9IGZhbHNlO1xuXHRcdH1cblx0XHQvLyBub2luc3BlY3Rpb24gSlNVbnJlc29sdmVkVmFyaWFibGVcblx0XHRpZiAodGVzdHQgJiYgIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdrci1mb3JtLXBheW1lbnQnKS5hZ3JlZWNoZWNrdC5jaGVja2VkKSB7XG5cdFx0XHRyZXN1bHQgPSBmYWxzZTtcblx0XHR9XG5cblx0XHRpZiAocmVzdWx0KSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc3QgJG1vZGFsID0gbmV3IEZvdW5kYXRpb24uUmV2ZWFsKCQoJyNlcnJvck1vZGFsJykpO1xuXHRcdFx0JG1vZGFsLm9wZW4oKTtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdH1cbn0oalF1ZXJ5KSk7IiwiLyoqXG4gKiBAcGFja2FnZSAgICBLbm93IFJlc2VydmF0aW9uc1xuICogQHN1YnBhY2thZ2UgU2l0ZSBKU1xuICogQGNvcHlyaWdodCAgMjAyMCBIaWdobGFuZCBWaXNpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBAbGljZW5zZSAgICBTZWUgdGhlIGZpbGUgXCJMSUNFTlNFLnR4dFwiIGZvciB0aGUgZnVsbCBsaWNlbnNlIGdvdmVybmluZyB0aGlzIGNvZGUuXG4gKiBAYXV0aG9yICAgICBIYXplbCBXaWxzb24gPGhhemVsQGhpZ2hsYW5kdmlzaW9uLmNvbT5cbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxuaWYgKCF3aW5kb3cubG9jYXRpb24ub3JpZ2luKSB7XG5cdHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gPSB3aW5kb3cubG9jYXRpb24ucHJvdG9jb2wgKyBcIi8vXCIgKyB3aW5kb3cubG9jYXRpb24uaG9zdDtcbn1cblxuKGZ1bmN0aW9uICgkKSB7XG5cdGxldCBteUtyRG9iRW50cnk7XG5cdGxldCB0b2RheTtcblx0bGV0IGtleSA9IHtCQUNLU1BBQ0U6IDh9O1xuXG5cdGxldCBzZXR0aW5ncyA9IHtcblx0XHRjdXN0b21fdmFsaWRhdGlvbjogICAgIGZhbHNlLFxuXHRcdGRheXNfaW5fbW9udGg6ICAgICAgICAgWzMxLCAyOSwgMzEsIDMwLCAzMSwgMzAsIDMxLCAzMSwgMzAsIDMxLCAzMCwgMzFdLFxuXHRcdGRvY3VtZW50X2RhdGU6ICAgICAgICAgZmFsc2UsXG5cdFx0ZXJyb3Jib3hfeDogICAgICAgICAgICAxLFxuXHRcdGVycm9yYm94X3k6ICAgICAgICAgICAgNSxcblx0XHRmaWVsZF9oaW50X3RleHRfZGF5OiAgICdERCcsXG5cdFx0ZmllbGRfaGludF90ZXh0X21vbnRoOiAnTU0nLFxuXHRcdGZpZWxkX2hpbnRfdGV4dF95ZWFyOiAgJ1lZWVknLFxuXHRcdGZpZWxkX29yZGVyOiAgICAgICAgICAgJ0RNWScsXG5cdFx0ZmllbGRfd2lkdGhfZGF5OiAgICAgICA2LFxuXHRcdGZpZWxkX3dpZHRoX21vbnRoOiAgICAgNixcblx0XHRmaWVsZF93aWR0aF95ZWFyOiAgICAgIDcsXG5cdFx0ZmllbGRfd2lkdGhfc2VwOiAgICAgICAyLFxuXHRcdG1pbm1heDogICAgICAgICAgICAgICAgJycsXG5cdFx0bWluX2RhdGU6ICAgICAgICAgICAgICBmYWxzZSxcblx0XHRtYXhfZGF0ZTogICAgICAgICAgICAgIGZhbHNlLFxuXHRcdG1pbl95ZWFyOiAgICAgICAgICAgICAgMTkxMCxcblx0XHRtb250aF9uYW1lOiAgICAgICAgICAgIFtcblx0XHRcdCdKYW51YXJ5JywgJ0ZlYnJ1YXJ5JywgJ01hcmNoJywgJ0FwcmlsJyxcblx0XHRcdCdNYXknLCAnSnVuZScsICdKdWx5JywgJ0F1Z3VzdCcsICdTZXB0ZW1iZXInLFxuXHRcdFx0J09jdG9iZXInLCAnTm92ZW1iZXInLCAnRGVjZW1iZXInXSxcblx0XHRvbl9ibHVyOiAgICAgICAgICAgICAgIGZhbHNlLFxuXHRcdG9uX2Vycm9yOiAgICAgICAgICAgICAgZmFsc2UsXG5cdFx0b25fY2hhbmdlOiAgICAgICAgICAgICBmYWxzZSxcblx0XHRwYXJzZV9kYXRlOiAgICAgICAgICAgIHRydWUsXG5cdFx0c2VwYXJhdG9yOiAgICAgICAgICAgICAnLycsXG5cdFx0c2hvd19lcnJvcnM6ICAgICAgICAgICB0cnVlLFxuXHRcdHNob3dfaGludHM6ICAgICAgICAgICAgdHJ1ZSxcblx0XHRFX0RBWV9OQU46ICAgICAgICAgICAgICdEYXkgbXVzdCBiZSBhIG51bWJlcicsXG5cdFx0RV9EQVlfVE9PX0JJRzogICAgICAgICAnRGF5IG11c3QgYmUgMS0zMScsXG5cdFx0RV9EQVlfVE9PX1NNQUxMOiAgICAgICAnRGF5IG11c3QgYmUgMS0zMScsXG5cdFx0RV9CQURfREFZX0ZPUl9NT05USDogICAnT25seSAlZCBkYXlzIGluICVtICV5Jyxcblx0XHRFX01PTlRIX05BTjogICAgICAgICAgICdNb250aCBtdXN0IGJlIGEgbnVtYmVyJyxcblx0XHRFX01PTlRIX1RPT19CSUc6ICAgICAgICdNb250aCBtdXN0IGJlIDEtMTInLFxuXHRcdEVfTU9OVEhfVE9PX1NNQUxMOiAgICAgJ01vbnRoIGNhbm5vdCBiZSAwJyxcblx0XHRFX1lFQVJfTkFOOiAgICAgICAgICAgICdZZWFyIG11c3QgYmUgYSBudW1iZXInLFxuXHRcdEVfWUVBUl9MRU5HVEg6ICAgICAgICAgJ1llYXIgbXVzdCBiZSA0IGRpZ2l0cycsXG5cdFx0RV9ZRUFSX1RPT19TTUFMTDogICAgICAnWWVhciBtdXN0IG5vdCBiZSBiZWZvcmUgJXknLFxuXHRcdEVfTUlOX0RBVEU6ICAgICAgICAgICAgJ0RhdGUgbXVzdCBub3QgYmUgaW4gdGhlIHBhc3QnLFxuXHRcdEVfTUFYX0RBVEU6ICAgICAgICAgICAgJ0RhdGUgbXVzdCBub3QgYmUgaW4gdGhlIGZ1dHVyZSdcblx0fTtcblxuXHRjbGFzcyBLckRvYkVudHJ5IHtcblx0XHRjb25zdHJ1Y3RvcigkZWxlbWVudCwgb3B0aW9ucykge1xuXHRcdFx0dG9kYXkgPSBLckRvYkVudHJ5LmdldFltZChuZXcgRGF0ZSgpKTtcblxuXHRcdFx0dGhpcy5pbnB1dF9kYXkgPSAwO1xuXHRcdFx0dGhpcy5pbnB1dF9tb250aCA9IDA7XG5cdFx0XHR0aGlzLmlucHV0X3llYXIgPSAwO1xuXHRcdFx0dGhpcy4kZWxlbWVudCA9ICRlbGVtZW50O1xuXHRcdFx0aWYgKG9wdGlvbnMpIHtcblx0XHRcdFx0JC5leHRlbmQoc2V0dGluZ3MsIG9wdGlvbnMpO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLmluaXQoKTtcblx0XHR9XG5cblx0XHRzdGF0aWMgZ2V0WW1kKGRhdGUpIHtcblx0XHRcdGNvbnN0IG0gPSBkYXRlLmdldE1vbnRoKCkgKyAxO1xuXHRcdFx0Y29uc3QgZCA9IGRhdGUuZ2V0RGF5KCk7XG5cblx0XHRcdHJldHVybiAoZGF0ZS5nZXRGdWxsWWVhcigpICsgJy0nICsgKG0gPCAxMCA/ICcwJyA6ICcnKSArIG0gKyAnLScgKyAoZCA8IDEwID8gJzAnIDogJycpICsgZCk7XG5cdFx0fVxuXG5cdFx0c3RhdGljIGdldFltZE9iamVjdChkYXRlKSB7XG5cdFx0XHRyZXR1cm4gKGRhdGUueWVhciArICctJyArIGRhdGUubW9udGggKyAnLScgKyBkYXRlLmRheSk7XG5cdFx0fVxuXG5cdFx0YWRkRW50cnlGaWVsZHMoKSB7XG5cdFx0XHRsZXQgZG9iZmllbGQgPSB0aGlzO1xuXHRcdFx0ZG9iZmllbGQuZmllbGRzID0gW107XG5cdFx0XHQkLmVhY2goc2V0dGluZ3MuZmllbGRfb3JkZXIuc3BsaXQoJycpLCBmdW5jdGlvbiAoaSwgZmllbGQpIHtcblx0XHRcdFx0c3dpdGNoIChmaWVsZCkge1xuXHRcdFx0XHRcdGNhc2UgJ0QnOlxuXHRcdFx0XHRcdFx0ZG9iZmllbGQuYnVpbGRGaWVsZCgnZGF5JywgaSk7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlICdNJzpcblx0XHRcdFx0XHRcdGRvYmZpZWxkLmJ1aWxkRmllbGQoJ21vbnRoJywgaSk7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlICdZJzpcblx0XHRcdFx0XHRcdGRvYmZpZWxkLmJ1aWxkRmllbGQoJ3llYXInLCBpKTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGRlZmF1bHQgOlxuXHRcdFx0XHRcdFx0dGhyb3cgXCJVbmV4cGVjdGVkIGZpZWxkIG9yZGVyICdcIiArIGZpZWxkICsgXCInIGV4cGVjdGVkIEQsIE0gb3IgWVwiO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRhZnRlclBhc3RlKHRhcmdldCkge1xuXHRcdFx0aWYgKHRoaXMucGFyc2VEYXRlKCQodGFyZ2V0KS52YWwoKSkpIHtcblx0XHRcdFx0dGhpcy5zZXREYXRlKCQodGFyZ2V0KS52YWwoKSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0YnVpbGRGaWVsZChuYW1lLCBpbmRleCkge1xuXHRcdFx0bGV0IGtyZG9iZW50cnkgPSB0aGlzO1xuXHRcdFx0bGV0IGlucHV0ID0gbmV3IEtyRG9iSW5wdXQoe1xuXHRcdFx0XHRuYW1lOiAgICAgICBuYW1lLFxuXHRcdFx0XHRrcmRvYmVudHJ5OiBrcmRvYmVudHJ5LFxuXHRcdFx0XHRpbmRleDogICAgICBpbmRleCxcblx0XHRcdFx0aGludF90ZXh0OiAgc2V0dGluZ3Muc2hvd19oaW50cyA/IHNldHRpbmdzWydmaWVsZF9oaW50X3RleHRfJyArIG5hbWVdIDogbnVsbCxcblx0XHRcdH0pO1xuXG5cdFx0XHR0aGlzLmlubmVyLmFwcGVuZChpbnB1dC4kaW5wdXQpO1xuXHRcdFx0dGhpc1snaW5wdXRfJyArIG5hbWVdID0gaW5wdXQ7XG5cblx0XHRcdGlmIChpbmRleCA8IDIpIHtcblx0XHRcdFx0dGhpcy5pbm5lci5hcHBlbmQoJCgnPHNwYW4gY2xhc3M9XCJzZXBhcmF0b3JcIiAvPicpLnRleHQoc2V0dGluZ3Muc2VwYXJhdG9yKSk7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuZmllbGRzW2luZGV4XSA9IGlucHV0O1xuXHRcdFx0dGhpc1tuYW1lXSA9IGlucHV0O1xuXHRcdH1cblxuXHRcdGJ1aWxkVWkoKSB7XG5cdFx0XHRsZXQgZG9iZmllbGQgPSB0aGlzO1xuXHRcdFx0dGhpcy53cmFwcGVyID0gJCh0aGlzLiRlbGVtZW50LndyYXAoJzxzcGFuIGNsYXNzPVwianEtZHRlXCIgLz4nKS5wYXJlbnQoKVswXSk7XG5cdFx0XHR0aGlzLmlubmVyID0gJCgnPHNwYW4gY2xhc3M9XCJqcS1kdGUtaW5uZXJcIiAvPicpO1xuXHRcdFx0dGhpcy5hZGRFbnRyeUZpZWxkcygpO1xuXHRcdFx0dGhpcy5lcnJvcmJveCA9ICQoJzxzcGFuIGNsYXNzPVwianEtZHRlLWVycm9yYm94XCIgLz4nKS5oaWRlKCk7XG5cdFx0XHR0aGlzLmlubmVyLm9uKCdwYXN0ZScsICdpbnB1dCcsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdGxldCBpbnB1dCA9IHRoaXM7XG5cdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdGRvYmZpZWxkLmFmdGVyUGFzdGUoaW5wdXQsIGUpO1xuXHRcdFx0XHR9LCAyKTtcblx0XHRcdH0pO1xuXHRcdFx0dGhpcy53cmFwcGVyLmFwcGVuZCh0aGlzLmlubmVyLCB0aGlzLmVycm9yYm94KTtcblx0XHRcdHRoaXMuc2V0RmllbGRXaWR0aHMoKTtcblx0XHRcdHRoaXMuJGVsZW1lbnQuaGlkZSgpO1xuXHRcdH1cblxuXHRcdGNoZWNrRG9jdW1lbnQoZG9iLCBjaGlsZGRvYiwgY2xhc3NuYW1lKSB7XG5cdFx0XHRsZXQgZWxlbWVudHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGNsYXNzbmFtZSk7XG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmIChuZXcgRGF0ZShkb2IpID4gbmV3IERhdGUoY2hpbGRkb2IpKSB7XG5cdFx0XHRcdFx0ZWxlbWVudHNbaV0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRlbGVtZW50c1tpXS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGNsZWFyKCkge1xuXHRcdFx0dGhpcy5jbGVhckVycm9yKCcnKTtcblx0XHRcdHRoaXMuc2V0RGF0ZSgnJyk7XG5cdFx0fVxuXG5cdFx0Y2xlYXJFcnJvcigpIHtcblx0XHRcdGRlbGV0ZSB0aGlzLmVycm9yX3RleHQ7XG5cdFx0XHR0aGlzLnNob3dFcnJvcigpO1xuXHRcdH1cblxuXHRcdGRlc3Ryb3koKSB7XG5cdFx0XHR0aGlzLiRlbGVtZW50LnNob3coKTtcblx0XHRcdHRoaXMuJGVsZW1lbnQuY3NzKCdkaXNwbGF5JywgJycpO1xuXHRcdFx0dGhpcy53cmFwcGVyLmZpbmQoJ3NwYW4nKS5yZW1vdmUoKTtcblx0XHRcdHRoaXMuJGVsZW1lbnQudW53cmFwKCk7XG5cdFx0XHR0aGlzLiRlbGVtZW50LnJlbW92ZURhdGEoJ2RhdGV0ZXh0ZW50cnknKTtcblx0XHRcdGRlbGV0ZSB0aGlzLmlubmVyO1xuXHRcdFx0ZGVsZXRlIHRoaXMud3JhcHBlcjtcblx0XHRcdGRlbGV0ZSB0aGlzLiRlbGVtZW50O1xuXHRcdH1cblxuXHRcdGZvY3VzKCkge1xuXHRcdFx0dGhpcy5maWVsZHNbMF0uc2V0Rm9jdXModHJ1ZSk7XG5cdFx0fVxuXG5cdFx0Zm9jdXNGaWVsZEJlZm9yZShpbnB1dCkge1xuXHRcdFx0Y29uc3QgaW5kZXggPSBpbnB1dC5pbmRleDtcblx0XHRcdGlmIChpbmRleCA8IDEpIHtcblx0XHRcdFx0cmV0dXJuXG5cdFx0XHR9XG5cdFx0XHR0aGlzLmZpZWxkc1tpbmRleF0ueWllbGRGb2N1cygpO1xuXHRcdFx0dGhpcy5maWVsZHNbaW5kZXggLSAxXS5zZXRGb2N1cyh0cnVlKTtcblx0XHRcdC8vIGxldCBuZXh0ID0gdGhpcy5maWVsZHNbaW5kZXggLSAxXTtcblx0XHRcdC8vIGxldCB2YWwgPSBuZXh0LmdldCgpO1xuXHRcdFx0Ly8gbmV4dC5zZXRGb2N1cyhmYWxzZSk7XG5cdFx0fVxuXG5cdFx0Zm9jdXNGaWVsZEFmdGVyKGlucHV0KSB7XG5cdFx0XHRjb25zdCBpbmRleCA9IGlucHV0LmluZGV4O1xuXHRcdFx0aWYgKGluZGV4ID4gMSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHR0aGlzLmZpZWxkc1tpbmRleF0ueWllbGRGb2N1cygpO1xuXHRcdFx0dGhpcy5maWVsZHNbaW5kZXggKyAxXS5zZXRGb2N1cyh0cnVlKTtcblx0XHR9XG5cblx0XHRmb2N1c0luKCkge1xuXHRcdFx0dGhpcy53cmFwcGVyLmFkZENsYXNzKCdmb2N1cycpO1xuXHRcdH1cblxuXHRcdGZvY3VzT3V0KCkge1xuXHRcdFx0aWYgKHNldHRpbmdzLm9uX2JsdXIpIHtcblx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0c2VsZi53aWRnZXRGb2N1c0xvc3QoKTtcblx0XHRcdFx0fSwgMik7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLndyYXBwZXIucmVtb3ZlQ2xhc3MoJ2ZvY3VzJyk7XG5cdFx0fVxuXG5cdFx0Z2V0RGF0ZSgpIHtcblx0XHRcdHJldHVybiAodGhpcy5kYXlfdmFsdWUgJiYgdGhpcy5tb250aF92YWx1ZSAmJiB0aGlzLnllYXJfdmFsdWUpXG5cdFx0XHQgICAgICAgPyB7ZGF5OiB0aGlzLmRheV92YWx1ZSwgbW9udGg6IHRoaXMubW9udGhfdmFsdWUsIHllYXI6IHRoaXMueWVhcl92YWx1ZX1cblx0XHRcdCAgICAgICA6IG51bGw7XG5cdFx0fVxuXG5cdFx0aW5pdCgpIHtcblx0XHRcdGlmICghc2V0dGluZ3MubWluX3llYXIpXG5cdFx0XHRcdHNldHRpbmdzLm1pbl95ZWFyID0gJzE5MTAnO1xuXG5cdFx0XHR0aGlzLmJ1aWxkVWkoKTtcblx0XHRcdHRoaXMuc2V0RGF0ZSh0aGlzLiRlbGVtZW50LmF0dHIoJ3ZhbHVlJykpO1xuXHRcdFx0dGhpcy5wcm94eUxhYmVsQ2xpY2tzKCk7XG5cdFx0fVxuXG5cdFx0cGFyc2VEYXRlKHRleHQpIHtcblx0XHRcdHJldHVybiB0aGlzLnBhcnNlSXNvRGF0ZSh0ZXh0KTtcblx0XHR9XG5cblx0XHRwYXJzZUlzb0RhdGUodGV4dCkge1xuXHRcdFx0cmV0dXJuIHRleHQgJiYgdGV4dC5tYXRjaCgvXihcXGRcXGRcXGRcXGQpLShcXGRcXGQpLShcXGRcXGQpLykgPyB7XG5cdFx0XHRcdGRheTogICBSZWdFeHAuJDMsXG5cdFx0XHRcdG1vbnRoOiBSZWdFeHAuJDIsXG5cdFx0XHRcdHllYXI6ICBSZWdFeHAuJDFcblx0XHRcdH0gOiBudWxsO1xuXHRcdH1cblxuXHRcdHByb3h5TGFiZWxDbGlja3MoKSB7XG5cdFx0XHRsZXQgZG9iZmllbGQgPSB0aGlzO1xuXHRcdFx0bGV0IGlkID0gdGhpcy4kZWxlbWVudC5hdHRyKCdpZCcpO1xuXHRcdFx0aWYgKCFpZCkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHQkKCdsYWJlbFtmb3I9JyArIGlkICsgJ10nKS5jbGljayhmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdGRvYmZpZWxkLmZvY3VzKCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRzZXREYXRlKG5ld19kYXRlKSB7XG5cdFx0XHRsZXQgZG9iZmllbGQgPSB0aGlzO1xuXHRcdFx0bmV3X2RhdGUgPSB0aGlzLnBhcnNlRGF0ZShuZXdfZGF0ZSk7XG5cdFx0XHRkZWxldGUgdGhpcy5kYXlfdmFsdWU7XG5cdFx0XHRkZWxldGUgdGhpcy5tb250aF92YWx1ZTtcblx0XHRcdGRlbGV0ZSB0aGlzLnllYXJfdmFsdWU7XG5cdFx0XHR0aGlzLmlucHV0X2RheS5zZXQobmV3X2RhdGUgPyBuZXdfZGF0ZS5kYXkgOiAnJyk7XG5cdFx0XHR0aGlzLmlucHV0X21vbnRoLnNldChuZXdfZGF0ZSA/IG5ld19kYXRlLm1vbnRoIDogJycpO1xuXHRcdFx0dGhpcy5pbnB1dF95ZWFyLnNldChuZXdfZGF0ZSA/IG5ld19kYXRlLnllYXIgOiAnJyk7XG5cdFx0XHR0aGlzLmNsZWFyRXJyb3IoKTtcblx0XHRcdHRoaXMuJGVsZW1lbnQudmFsKG5ld19kYXRlKTtcblx0XHRcdGlmIChuZXdfZGF0ZSkge1xuXHRcdFx0XHQkLmVhY2godGhpcy5maWVsZHMsIGZ1bmN0aW9uIChpLCBpbnB1dCkge1xuXHRcdFx0XHRcdGRvYmZpZWxkLnZhbGlkYXRlKGlucHV0KTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0c2V0RXJyb3IoZXJyb3JfdGV4dCkge1xuXHRcdFx0dGhpcy5lcnJvcl90ZXh0ID0gZXJyb3JfdGV4dDtcblx0XHRcdHRoaXMuc2hvd0Vycm9yKCk7XG5cdFx0fVxuXG5cdFx0c2V0RmllbGRXaWR0aHMoKSB7XG5cdFx0XHRsZXQgYXZhaWxhYmxlID0gdGhpcy4kZWxlbWVudC53aWR0aCgpIC0gMjtcblx0XHRcdGxldCB0b3RhbCA9IHNldHRpbmdzLmZpZWxkX3dpZHRoX3llYXIgKyBzZXR0aW5ncy5maWVsZF93aWR0aF9zZXAgKyBzZXR0aW5ncy5maWVsZF93aWR0aF9tb250aCArXG5cdFx0XHRcdHNldHRpbmdzLmZpZWxkX3dpZHRoX3NlcCArIHNldHRpbmdzLmZpZWxkX3dpZHRoX2RheTtcblx0XHRcdHRoaXMuaW5wdXRfZGF5LnNldFdpZHRoKE1hdGguZmxvb3Ioc2V0dGluZ3MuZmllbGRfd2lkdGhfZGF5ICogYXZhaWxhYmxlIC8gdG90YWwpKTtcblx0XHRcdHRoaXMuaW5wdXRfbW9udGguc2V0V2lkdGgoTWF0aC5mbG9vcihzZXR0aW5ncy5maWVsZF93aWR0aF9tb250aCAqIGF2YWlsYWJsZSAvIHRvdGFsKSk7XG5cdFx0XHR0aGlzLmlucHV0X3llYXIuc2V0V2lkdGgoTWF0aC5mbG9vcihzZXR0aW5ncy5maWVsZF93aWR0aF95ZWFyICogYXZhaWxhYmxlIC8gdG90YWwpKTtcblx0XHR9XG5cblx0XHRzZXRSZWFkb25seShtb2RlKSB7XG5cdFx0XHRpZiAobW9kZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdG1vZGUgPSB0cnVlO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5pbnB1dF9kYXkuc2V0UmVhZG9ubHkobW9kZSk7XG5cdFx0XHR0aGlzLmlucHV0X21vbnRoLnNldFJlYWRvbmx5KG1vZGUpO1xuXHRcdFx0dGhpcy5pbnB1dF95ZWFyLnNldFJlYWRvbmx5KG1vZGUpO1xuXHRcdFx0aWYgKG1vZGUpIHtcblx0XHRcdFx0dGhpcy53cmFwcGVyLmFkZENsYXNzKCdyZWFkb25seScpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy53cmFwcGVyLnJlbW92ZUNsYXNzKCdyZWFkb25seScpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHNob3dFcnJvcigpIHtcblx0XHRcdGxldCBlcnJvcl90ZXh0ID0gdGhpcy53aWRnZXRFcnJvclRleHQoKTtcblx0XHRcdGlmICh0aGlzLm9uX2Vycm9yKSB7XG5cdFx0XHRcdHRoaXMub25fZXJyb3IoZXJyb3JfdGV4dCk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIXNldHRpbmdzLnNob3dfZXJyb3JzKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdGlmIChlcnJvcl90ZXh0ID09PSAnJykge1xuXHRcdFx0XHR0aGlzLmVycm9yYm94LmhpZGUoKTtcblx0XHRcdFx0dGhpcy5lcnJvcmJveC50ZXh0KCcnKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGxldCB4X29mZnNldCA9ICh0aGlzLmlubmVyLm91dGVyV2lkdGgoKSArIHNldHRpbmdzLmVycm9yYm94X3gpICsgJ3B4Jztcblx0XHRcdFx0bGV0IHlfb2Zmc2V0ID0gc2V0dGluZ3MuZXJyb3Jib3hfeSArICdweCc7XG5cdFx0XHRcdHRoaXMuZXJyb3Jib3guY3NzKHtkaXNwbGF5OiAnYmxvY2snLCBwb3NpdGlvbjogJ2Fic29sdXRlJywgdG9wOiB5X29mZnNldCwgbGVmdDogeF9vZmZzZXR9KTtcblx0XHRcdFx0dGhpcy5lcnJvcmJveC50ZXh0KGVycm9yX3RleHQpO1xuXHRcdFx0XHR0aGlzLmVycm9yYm94LnNob3coKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR2YWxpZGF0ZShjdXJyZW50X2lucHV0KSB7XG5cdFx0XHR0aGlzLiRlbGVtZW50LnZhbCgnJyk7XG5cdFx0XHRpZiAoY3VycmVudF9pbnB1dCkge1xuXHRcdFx0XHRjb25zdCB0eXBlID0gY3VycmVudF9pbnB1dC5uYW1lO1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdGlmICh0eXBlID09PSAnZGF5Jykge1xuXHRcdFx0XHRcdFx0dGhpcy52YWxpZGF0ZURheSgpO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAodHlwZSA9PT0gJ21vbnRoJykge1xuXHRcdFx0XHRcdFx0dGhpcy52YWxpZGF0ZU1vbnRoKCk7XG5cdFx0XHRcdFx0fSBlbHNlIGlmICh0eXBlID09PSAneWVhcicpIHtcblx0XHRcdFx0XHRcdHRoaXMudmFsaWRhdGVZZWFyKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGN1cnJlbnRfaW5wdXQuY2xlYXJFcnJvcigpO1xuXHRcdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdFx0Y3VycmVudF9pbnB1dC5zZXRFcnJvcihlKTtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmICh0aGlzLmRheV92YWx1ZSAmJiB0aGlzLm1vbnRoX3ZhbHVlKSB7XG5cdFx0XHRcdHRoaXMuY2xlYXJFcnJvcigpO1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdHRoaXMudmFsaWRhdGVEYXlzSW5Nb250aCgpO1xuXHRcdFx0XHRcdGlmICh0aGlzLnllYXJfdmFsdWUgJiYgdGhpcy55ZWFyX3ZhbHVlLmxlbmd0aCA9PT0gNCkge1xuXHRcdFx0XHRcdFx0dGhpcy52YWxpZGF0ZUNvbXBsZXRlRGF0ZSgpO1xuXHRcdFx0XHRcdFx0bGV0IGRhdGVfc3RyID0gS3JEb2JFbnRyeS5nZXRZbWRPYmplY3QodGhpcy5nZXREYXRlKCkpO1xuXHRcdFx0XHRcdFx0dGhpcy4kZWxlbWVudC52YWwoZGF0ZV9zdHIpO1xuXHRcdFx0XHRcdFx0aWYgKHRoaXMuJGVsZW1lbnQuZGF0YSgnY2hpbGRkb2InKSkge1xuXHRcdFx0XHRcdFx0XHR0aGlzLmNoZWNrRG9jdW1lbnQoZGF0ZV9zdHIsIHRoaXMuJGVsZW1lbnQuZGF0YSgnY2hpbGRkb2InKSwgdGhpcy4kZWxlbWVudC5hdHRyKCdpZCcpKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0XHR0aGlzLnNldEVycm9yKGUpO1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5jbGVhckVycm9yKCk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdHZhbGlkYXRlQ29tcGxldGVEYXRlKCkge1xuXHRcdFx0Y29uc3QgZGF0ZV9vYmogPSB0aGlzLmdldERhdGUoKTtcblx0XHRcdGNvbnN0IGRhdGVfaXNvID0gS3JEb2JFbnRyeS5nZXRZbWRPYmplY3QoZGF0ZV9vYmopO1xuXHRcdFx0c2V0dGluZ3MubWlubWF4ID0gdGhpcy4kZWxlbWVudC5kYXRhKCd2YWxpZGF0aW9uJyk7XG5cblx0XHRcdGlmIChzZXR0aW5ncy5taW5tYXggPT09ICdtYXgnKSB7XG5cdFx0XHRcdGlmIChkYXRlX2lzbyA+IHRvZGF5KSB7XG5cdFx0XHRcdFx0dGhyb3coc2V0dGluZ3MuRV9NQVhfREFURSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmIChzZXR0aW5ncy5taW5tYXggPT09ICdtaW4nKSB7XG5cdFx0XHRcdGlmIChkYXRlX2lzbyA8IHRvZGF5KSB7XG5cdFx0XHRcdFx0dGhyb3coc2V0dGluZ3MuRV9NSU5fREFURSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gbGV0IG1heF9kYXRlID0gc2V0dGluZ3MubWF4X2RhdGU7XG5cdFx0XHQvLyBpZiAodHlwZW9mIG1heF9kYXRlID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHQvLyBcdG1heF9kYXRlID0gbWF4X2RhdGUuY2FsbCh0aGlzKTtcblx0XHRcdC8vIH1cblx0XHRcdC8vIGlmICh0eXBlb2YgbWF4X2RhdGUgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHQvLyBcdG1heF9kYXRlID0gdGhpcy5wYXJzZURhdGUobWF4X2RhdGUpO1xuXHRcdFx0Ly8gfVxuXHRcdFx0Ly8gaWYgKG1heF9kYXRlKSB7XG5cdFx0XHQvLyBcdGlmIChkYXRlX2lzbyA+IHNldHRpbmdzLm1heF9kYXRlKSB7XG5cdFx0XHQvLyBcdFx0dGhyb3coc2V0dGluZ3MuRV9NQVhfREFURSk7XG5cdFx0XHQvLyBcdH1cblx0XHRcdC8vIH1cblxuXHRcdFx0aWYgKHRoaXMuY3VzdG9tX3ZhbGlkYXRpb24pIHtcblx0XHRcdFx0ZGF0ZV9vYmouZGF0ZSA9IG5ldyBEYXRlKFxuXHRcdFx0XHRcdHBhcnNlSW50KGRhdGVfb2JqLnllYXIsIDEwKSxcblx0XHRcdFx0XHRwYXJzZUludChkYXRlX29iai5tb250aCwgMTApIC0gMSxcblx0XHRcdFx0XHRwYXJzZUludChkYXRlX29iai5kYXksIDEwKVxuXHRcdFx0XHQpO1xuXHRcdFx0XHR0aGlzLmN1c3RvbV92YWxpZGF0aW9uKGRhdGVfb2JqKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR2YWxpZGF0ZURheSgpIHtcblx0XHRcdGxldCBvcHQgPSBzZXR0aW5ncztcblx0XHRcdGxldCBpbnB1dCA9IHRoaXMuaW5wdXRfZGF5O1xuXHRcdFx0dGhpcy5kYXlfdmFsdWUgPSB1bmRlZmluZWQ7XG5cdFx0XHRsZXQgdGV4dCA9IGlucHV0LmdldCgpO1xuXHRcdFx0aWYgKHRleHQgPT09ICcnIHx8ICh0ZXh0ID09PSAnMCcgJiYgaW5wdXQuaGFzX2ZvY3VzKSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRpZiAodGV4dC5tYXRjaCgvXFxELykpIHtcblx0XHRcdFx0dGhyb3cob3B0LkVfREFZX05BTik7XG5cdFx0XHR9XG5cdFx0XHRsZXQgbnVtID0gcGFyc2VJbnQodGV4dCwgMTApO1xuXHRcdFx0aWYgKG51bSA8IDEpIHtcblx0XHRcdFx0dGhyb3cob3B0LkVfREFZX1RPT19TTUFMTCk7XG5cdFx0XHR9XG5cdFx0XHRpZiAobnVtID4gMzEpIHtcblx0XHRcdFx0dGhyb3cob3B0LkVfREFZX1RPT19CSUcpO1xuXHRcdFx0fVxuXHRcdFx0dGV4dCA9IG51bSA8IDEwID8gJzAnICsgbnVtIDogJycgKyBudW07XG5cdFx0XHRpZiAoIWlucHV0Lmhhc19mb2N1cykge1xuXHRcdFx0XHRpbnB1dC5zZXQodGV4dCk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLmRheV92YWx1ZSA9IHRleHQ7XG5cdFx0fVxuXG5cdFx0dmFsaWRhdGVEYXlzSW5Nb250aCgpIHtcblx0XHRcdGNvbnN0IGRheSA9IHBhcnNlSW50KHRoaXMuZGF5X3ZhbHVlLCAxMCk7XG5cdFx0XHRjb25zdCBtb250aCA9IHBhcnNlSW50KHRoaXMubW9udGhfdmFsdWUsIDEwKTtcblx0XHRcdGNvbnN0IHllYXIgPSBwYXJzZUludCh0aGlzLnllYXJfdmFsdWUsIDEwKTtcblx0XHRcdGlmIChkYXkgPCAxIHx8IG1vbnRoIDwgMSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRsZXQgbWF4ID0gc2V0dGluZ3MuZGF5c19pbl9tb250aFttb250aCAtIDFdO1xuXHRcdFx0bGV0IG1zZyA9IHNldHRpbmdzLkVfQkFEX0RBWV9GT1JfTU9OVEg7XG5cdFx0XHRpZiAobW9udGggPT09IDIgJiYgKCcnICsgeWVhcikubGVuZ3RoID09PSA0KSB7XG5cdFx0XHRcdG1heCA9IHllYXIgJSA0ID8gMjggOiB5ZWFyICUgMTAwID8gMjkgOiB5ZWFyICUgNDAwID8gMjggOiAyOTtcblx0XHRcdFx0bXNnID0gbXNnLnJlcGxhY2UoLyV5LywgeWVhci50b1N0cmluZygpKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdG1zZyA9IG1zZy5yZXBsYWNlKC8gKiV5LywgJycpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGRheSA+IG1heCkge1xuXHRcdFx0XHR0aHJvdyhtc2cucmVwbGFjZSgvJWQvLCBtYXgudG9TdHJpbmcoKSkucmVwbGFjZSgvJW0vLCBzZXR0aW5ncy5tb250aF9uYW1lW21vbnRoIC0gMV0pKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR2YWxpZGF0ZU1vbnRoKCkge1xuXHRcdFx0bGV0IGlucHV0ID0gdGhpcy5pbnB1dF9tb250aDtcblx0XHRcdHRoaXMubW9udGhfdmFsdWUgPSB1bmRlZmluZWQ7XG5cdFx0XHRsZXQgdGV4dCA9IGlucHV0LmdldCgpO1xuXHRcdFx0aWYgKHRleHQgPT09ICcnIHx8ICh0ZXh0ID09PSAnMCcgJiYgaW5wdXQuaGFzX2ZvY3VzKSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRpZiAodGV4dC5tYXRjaCgvXFxELykpIHtcblx0XHRcdFx0dGhyb3coc2V0dGluZ3MuRV9NT05USF9OQU4pO1xuXHRcdFx0fVxuXHRcdFx0bGV0IG51bSA9IHBhcnNlSW50KHRleHQsIDEwKTtcblx0XHRcdGlmIChudW0gPCAxKSB7XG5cdFx0XHRcdHRocm93KHNldHRpbmdzLkVfTU9OVEhfVE9PX1NNQUxMKTtcblx0XHRcdH1cblx0XHRcdGlmIChudW0gPiAxMikge1xuXHRcdFx0XHR0aHJvdyhzZXR0aW5ncy5FX01PTlRIX1RPT19CSUcpO1xuXHRcdFx0fVxuXHRcdFx0dGV4dCA9IG51bSA8IDEwID8gJzAnICsgbnVtIDogJycgKyBudW07XG5cdFx0XHRpZiAoIWlucHV0Lmhhc19mb2N1cykge1xuXHRcdFx0XHRpbnB1dC5zZXQodGV4dCk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLm1vbnRoX3ZhbHVlID0gdGV4dDtcblx0XHR9XG5cblx0XHR2YWxpZGF0ZVllYXIoKSB7XG5cdFx0XHRjb25zdCBpbnB1dCA9IHRoaXMuaW5wdXRfeWVhcjtcblx0XHRcdHRoaXMueWVhcl92YWx1ZSA9IHVuZGVmaW5lZDtcblx0XHRcdGxldCB0ZXh0ID0gaW5wdXQuZ2V0KCk7XG5cdFx0XHRpZiAodGV4dCA9PT0gJycgfHwgKHRleHQgPT09ICcwJyAmJiBpbnB1dC5oYXNfZm9jdXMpKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdGlmICh0ZXh0Lm1hdGNoKC9cXEQvKSkge1xuXHRcdFx0XHR0aHJvdyhzZXR0aW5ncy5FX1lFQVJfTkFOKTtcblx0XHRcdH1cblx0XHRcdGlmIChpbnB1dC5oYXNfZm9jdXMpIHtcblx0XHRcdFx0aWYgKHRleHQubGVuZ3RoID4gNCkge1xuXHRcdFx0XHRcdHRocm93KHNldHRpbmdzLkVfWUVBUl9MRU5HVEgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAodGV4dC5sZW5ndGggIT09IDQpIHtcblx0XHRcdFx0XHR0aHJvdyhzZXR0aW5ncy5FX1lFQVJfTEVOR1RIKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKHRleHQubGVuZ3RoID09PSA0KSB7XG5cdFx0XHRcdGNvbnN0IG51bSA9IHBhcnNlSW50KHRleHQsIDEwKTtcblx0XHRcdFx0aWYgKHNldHRpbmdzLm1pbl95ZWFyICYmIG51bSA8IHNldHRpbmdzLm1pbl95ZWFyKSB7XG5cdFx0XHRcdFx0dGhyb3coc2V0dGluZ3MuRV9ZRUFSX1RPT19TTUFMTC5yZXBsYWNlKC8leS8sIHNldHRpbmdzLm1pbl95ZWFyKSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHRoaXMueWVhcl92YWx1ZSA9IHRleHQ7XG5cdFx0fVxuXG5cdFx0d2lkZ2V0RXJyb3JUZXh0KCkge1xuXHRcdFx0bGV0IGVycm9yX3RleHQgPSAnJztcblx0XHRcdCQuZWFjaCh0aGlzLmZpZWxkcywgZnVuY3Rpb24gKGksIGlucHV0KSB7XG5cdFx0XHRcdGlmIChpbnB1dC5lcnJvcl90ZXh0KSB7XG5cdFx0XHRcdFx0aWYgKGlucHV0Lmhhc19mb2N1cyB8fCBlcnJvcl90ZXh0ID09PSAnJykge1xuXHRcdFx0XHRcdFx0ZXJyb3JfdGV4dCA9IGlucHV0LmVycm9yX3RleHRcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0aWYgKGVycm9yX3RleHQgPT09ICcnICYmIHRoaXMuZXJyb3JfdGV4dCkge1xuXHRcdFx0XHRlcnJvcl90ZXh0ID0gdGhpcy5lcnJvcl90ZXh0O1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGVycm9yX3RleHQ7XG5cdFx0fVxuXG5cdFx0d2lkZ2V0Rm9jdXNMb3N0KCkge1xuXHRcdFx0aWYgKHNldHRpbmdzLm9uX2JsdXIgJiYgIXRoaXMud3JhcHBlci5pcygnLmZvY3VzJykpIHtcblx0XHRcdFx0c2V0dGluZ3Mub25CbHVyKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Y2xhc3MgS3JEb2JJbnB1dCB7XG5cdFx0Y29uc3RydWN0b3Iob3B0aW9ucykge1xuXHRcdFx0Y29uc3QgaW5wdXQgPSB0aGlzO1xuXHRcdFx0dGhpcy5kb2JmaWVsZCA9IG9wdGlvbnMua3Jkb2JlbnRyeTtcblx0XHRcdHRoaXMubmFtZSA9IG9wdGlvbnMubmFtZTtcblx0XHRcdHRoaXMuaW5kZXggPSBvcHRpb25zLmluZGV4O1xuXHRcdFx0dGhpcy5oaW50X3RleHQgPSBvcHRpb25zLmhpbnRfdGV4dDtcblx0XHRcdHRoaXMuaGFzX2ZvY3VzID0gZmFsc2U7XG5cdFx0XHR0aGlzLmVtcHR5ID0gdHJ1ZTtcblx0XHRcdHRoaXMuJGlucHV0ID0gJCgnPGlucHV0IHR5cGU9XCJ0ZXh0XCIgdmFsdWU9XCJcIiAvPicpLmFkZENsYXNzKCdqcS1kdGUtJyArIHRoaXMubmFtZSkuYXR0cignYXJpYS1sYWJlbCcsICcnICsgXCIgKFwiICsgdGhpcy5oaW50X3RleHQgKyBcIilcIikuZm9jdXMoJC5wcm94eShpbnB1dCwgJ2ZvY3VzJykpLmJsdXIoJC5wcm94eShpbnB1dCwgJ2JsdXInKSkua2V5ZG93bihmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRpbnB1dC5rZXlkb3duKGUpO1xuXHRcdFx0XHR9LCAyKVxuXHRcdFx0fSkua2V5dXAoZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0aW5wdXQua2V5dXAoZSk7XG5cdFx0XHRcdH0sIDIpXG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRibHVyKCkge1xuXHRcdFx0dGhpcy5oYXNfZm9jdXMgPSBmYWxzZTtcblx0XHRcdHRoaXMuZG9iZmllbGQuZm9jdXNPdXQoKTtcblx0XHRcdHRoaXMuc2hvd19oaW50KCk7XG5cdFx0XHR0aGlzLmRvYmZpZWxkLnZhbGlkYXRlKHRoaXMpO1xuXHRcdH1cblxuXHRcdGNsZWFyRXJyb3IoKSB7XG5cdFx0XHRkZWxldGUgdGhpcy5lcnJvcl90ZXh0O1xuXHRcdFx0dGhpcy4kaW5wdXQucmVtb3ZlQ2xhc3MoJ2Vycm9yJyk7XG5cdFx0fVxuXG5cdFx0Zm9jdXMoKSB7XG5cdFx0XHR0aGlzLmtleV9pc19kb3duID0gZmFsc2U7XG5cdFx0XHRpZiAodGhpcy4kaW5wdXQucHJvcCgncmVhZG9ubHknKSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHR0aGlzLmhhc19mb2N1cyA9IHRydWU7XG5cdFx0XHR0aGlzLmRvYmZpZWxkLmZvY3VzSW4oKTtcblx0XHRcdGlmICh0aGlzLiRpbnB1dC5oYXNDbGFzcygnaGludCcpKSB7XG5cdFx0XHRcdHRoaXMuJGlucHV0LnZhbCgnJykucmVtb3ZlQ2xhc3MoJ2hpbnQnKTtcblx0XHRcdH1cblx0XHRcdHRoaXMuZG9iZmllbGQuc2hvd0Vycm9yKCk7XG5cdFx0fVxuXG5cdFx0Z2V0KCkge1xuXHRcdFx0bGV0IHZhbCA9IHRoaXMuJGlucHV0LnZhbCgpO1xuXHRcdFx0cmV0dXJuIHZhbCA9PT0gdGhpcy5oaW50X3RleHQgPyAnJyA6IHZhbDtcblx0XHR9XG5cblx0XHRpc0RpZ2l0S2V5KGUpIHtcblx0XHRcdGxldCBrZXljb2RlID0gZS53aGljaDtcblx0XHRcdHJldHVybiBrZXljb2RlID49IDQ4ICYmIGtleWNvZGUgPD0gNTcgfHwga2V5Y29kZSA+PSA5NiAmJiBrZXljb2RlIDw9IDEwNTtcblx0XHR9XG5cblx0XHRrZXlkb3duKCkge1xuXHRcdFx0Ly8gSWdub3JlIGtleXVwIGV2ZW50cyB0aGF0IGFycml2ZSBhZnRlciBmb2N1cyBtb3ZlZCB0byBuZXh0IGZpZWxkXG5cdFx0XHR0aGlzLmtleV9pc19kb3duID0gdHJ1ZTtcblx0XHR9XG5cblx0XHRrZXl1cChlKSB7XG5cdFx0XHRpZiAoIXRoaXMua2V5X2lzX2Rvd24pIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0Ly8gSGFuZGxlIEJhY2tzcGFjZSAtIHNoaWZ0aW5nIGZvY3VzIHRvIHByZXZpb3VzIGZpZWxkIGlmIHJlcXVpcmVkXG5cdFx0XHRsZXQga2V5Y29kZSA9IGUud2hpY2g7XG5cdFx0XHRpZiAoa2V5Y29kZSA9PT0ga2V5LkJBQ0tTUEFDRSAmJiB0aGlzLmVtcHR5KSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLmRvYmZpZWxkLmZvY3VzRmllbGRCZWZvcmUodGhpcyk7XG5cdFx0XHR9XG5cdFx0XHRsZXQgdGV4dCA9IHRoaXMuZ2V0KCk7XG5cdFx0XHR0aGlzLmVtcHR5ID0gdGV4dCA9PT0gJyc7XG5cblx0XHRcdC8vIFRyYXAgYW5kIGRpc2NhcmQgc2VwYXJhdG9yIGNoYXJhY3RlcnMgLSBhZHZhbmNpbmcgZm9jdXMgaWYgcmVxdWlyZWRcblx0XHRcdGlmICh0ZXh0Lm1hdGNoKC9bXFwvXFxcXC4gLV0vKSkge1xuXHRcdFx0XHR0ZXh0ID0gdGV4dC5yZXBsYWNlKC9bXFwvXFxcXC4gLV0vLCAnJyk7XG5cdFx0XHRcdHRoaXMuc2V0KHRleHQpO1xuXHRcdFx0XHRpZiAoIXRoaXMuZW1wdHkgJiYgdGhpcy5pbmRleCA8IDIpIHtcblx0XHRcdFx0XHR0aGlzLmRvYmZpZWxkLmZvY3VzRmllbGRBZnRlcih0aGlzKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBBZHZhbmNlIGZvY3VzIGlmIHRoaXMgZmllbGQgaXMgYm90aCB2YWxpZCBhbmQgZnVsbFxuXHRcdFx0aWYgKHRoaXMuZG9iZmllbGQudmFsaWRhdGUodGhpcykpIHtcblx0XHRcdFx0bGV0IHdhbnQgPSB0aGlzLm5hbWUgPT09ICd5ZWFyJyA/IDQgOiAyO1xuXHRcdFx0XHRpZiAodGhpcy5pc0RpZ2l0S2V5KGUpICYmIHRleHQubGVuZ3RoID09PSB3YW50KSB7XG5cdFx0XHRcdFx0dGhpcy5kb2JmaWVsZC5mb2N1c0ZpZWxkQWZ0ZXIodGhpcyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRsZWZ0KCkge1xuXHRcdFx0cmV0dXJuIHRoaXMuJGlucHV0LnBvc2l0aW9uKCkubGVmdDtcblx0XHR9XG5cblx0XHRzZXQobmV3X3ZhbHVlKSB7XG5cdFx0XHR0aGlzLiRpbnB1dC52YWwobmV3X3ZhbHVlKS5yZW1vdmVDbGFzcygnaGludCcpO1xuXHRcdFx0aWYgKCF0aGlzLmhhc19mb2N1cykge1xuXHRcdFx0XHR0aGlzLnNob3dfaGludCgpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5lbXB0eSA9IG5ld192YWx1ZSA9PT0gJyc7XG5cdFx0XHR0aGlzLmNsZWFyRXJyb3IoKTtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH1cblxuXHRcdHNldEVycm9yKHRleHQpIHtcblx0XHRcdHRoaXMuZXJyb3JfdGV4dCA9IHRleHQ7XG5cdFx0XHR0aGlzLiRpbnB1dC5hZGRDbGFzcygnZXJyb3InKTtcblx0XHRcdHRoaXMuZG9iZmllbGQuc2hvd0Vycm9yKCk7XG5cdFx0fVxuXG5cdFx0c2V0Rm9jdXMoc2VsZWN0X2FsbCkge1xuXHRcdFx0bGV0ICRpbnB1dCA9IHRoaXMuJGlucHV0O1xuXHRcdFx0JGlucHV0LmZvY3VzKCk7XG5cdFx0XHRpZiAoc2VsZWN0X2FsbCkge1xuXHRcdFx0XHQkaW5wdXQuc2VsZWN0KCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQkaW5wdXQudmFsKCRpbnB1dC52YWwoKSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9XG5cblx0XHRzZXRXaWR0aChuZXdfd2lkdGgpIHtcblx0XHRcdHRoaXMuJGlucHV0LndpZHRoKG5ld193aWR0aCk7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9XG5cblx0XHRzaG93X2hpbnQoKSB7XG5cdFx0XHRpZiAodGhpcy5nZXQoKSA9PT0gJycgJiYgdHlwZW9mICh0aGlzLmhpbnRfdGV4dCkgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRcdHRoaXMuJGlucHV0LnZhbCh0aGlzLmhpbnRfdGV4dCkuYWRkQ2xhc3MoJ2hpbnQnKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH1cblxuXHRcdHlpZWxkRm9jdXMoKSB7XG5cdFx0XHR0aGlzLiRpbnB1dC5ibHVyKCk7XG5cdFx0fVxuXHR9XG5cblx0JChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuXHRcdCQoJy5kb2Jpc3N1ZScpLmVhY2goZnVuY3Rpb24gKCkge1xuXHRcdFx0bXlLckRvYkVudHJ5ID0gbmV3IEtyRG9iRW50cnkoJCh0aGlzKSwge30pO1xuXHRcdH0pO1xuXHR9KTtcbn0oalF1ZXJ5KSk7IiwiLy8gbm9pbnNwZWN0aW9uIER1cGxpY2F0ZWRDb2RlXG5cbi8qKlxuICogQHBhY2thZ2UgICAgS25vdyBSZXNlcnZhdGlvbnNcbiAqIEBzdWJwYWNrYWdlIEFkbWluIEpTXG4gKiBAY29weXJpZ2h0ICAyMDIwIEhpZ2hsYW5kIFZpc2lvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIEBsaWNlbnNlICAgIFNlZSB0aGUgZmlsZSBcIkxJQ0VOU0UudHh0XCIgZm9yIHRoZSBmdWxsIGxpY2Vuc2UgZ292ZXJuaW5nIHRoaXMgY29kZS5cbiAqIEBhdXRob3IgICAgIEhhemVsIFdpbHNvbiA8aGF6ZWxAaGlnaGxhbmR2aXNpb24uY29tPlxuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24gKCQpIHtcblx0JChmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdob3d0b2Fycml2ZScpKSB7XG5cdFx0XHRjb25zdCBob3d0b2Fycml2ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdob3d0b2Fycml2ZScpO1xuXHRcdFx0bGV0IGFycml2YWxtZWFucyA9IGhvd3RvYXJyaXZlLmdldEF0dHJpYnV0ZSgnZGF0YS1tZWFucycpO1xuXHRcdFx0aWYgKCFhcnJpdmFsbWVhbnMpIHtcblx0XHRcdFx0YXJyaXZhbG1lYW5zID0gJ2Fpcic7XG5cdFx0XHR9XG5cdFx0XHRkaXNwbGF5QXJyaXZhbChhcnJpdmFsbWVhbnMpO1xuXHRcdH1cblxuXHRcdCQoJ2JvZHknKS5vbignY2xpY2snLCAnLmFtaXRlbScsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRkaXNwbGF5QXJyaXZhbCgkKHRoaXMpLmF0dHIoJ2lkJykpO1xuXHRcdH0pO1xuXHR9KTtcblxuXHRmdW5jdGlvbiBkaXNwbGF5QXJyaXZhbCh2YWx1ZSkge1xuXHRcdGxldCB4ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYW1pdGVtJyk7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB4Lmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR4W2ldLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuXHRcdH1cblxuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhaXItZGF0YScpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RyYWluLWRhdGEnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhdXRvLWRhdGEnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvdGhlci1kYXRhJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblx0XHRsZXQgYXJyaXZhbGRhdGEgPSB2YWx1ZSArICctZGF0YSc7XG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYXJyaXZhbGRhdGEpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHZhbHVlKS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnamZvcm1fYXJyaXZhbF9tZWFucycpLnZhbHVlID0gdmFsdWU7XG5cdH1cbn0pKGpRdWVyeSk7IiwiLyoqXG4gKiBAcGFja2FnZSAgICBLbm93IFJlc2VydmF0aW9uc1xuICogQHN1YnBhY2thZ2UgU2l0ZSBKU1xuICogQGNvcHlyaWdodCAgMjAyMCBIaWdobGFuZCBWaXNpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBAbGljZW5zZSAgICBTZWUgdGhlIGZpbGUgXCJMSUNFTlNFLnR4dFwiIGZvciB0aGUgZnVsbCBsaWNlbnNlIGdvdmVybmluZyB0aGlzIGNvZGUuXG4gKiBAYXV0aG9yICAgICBIYXplbCBXaWxzb24gPGhhemVsQGhpZ2hsYW5kdmlzaW9uLmNvbT5cbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxuY29uc3QgbGFuZyA9IFwiZW5cIjtcblxuKGZ1bmN0aW9uICgkKSB7XG5cdGNvbnN0IG1hcmtlcnNoYXBlID0ge1xuXHRcdHR5cGU6ICAgJ3BvbHknLFxuXHRcdGNvb3JkczogWzEsIDEsIDEsIDMyLCAzNywgMzIsIDMyLCAxXVxuXHR9O1xuXG5cdGxldCBteUtybWFwO1xuXHRsZXQgbWFwRGF0YSA9IGZhbHNlO1xuXHRsZXQgbWFwO1xuXHRsZXQgbWFwWm9vbTtcblx0bGV0IGluZm9XaW5kb3c7XG5cdGxldCBpbmZvV2luZG93Mjtcblx0bGV0IGJvdW5kcztcblx0bGV0IHByb3BlcnR5ZGl2O1xuXHRsZXQgcHJvcGVydHlpY29uO1xuXHRsZXQgbWM7XG4vL1x0bGV0IGJpY29uO1xuLy9cdGxldCBoaWNvbjtcbi8vXHRsZXQgbGFyZ2Vfc2xpZGVzaG93ID0gZmFsc2U7XG5cblx0bGV0IHNldHRpbmdzID0ge1xuXHRcdHByb3BlcnR5TWFya2VyczogW10sXG5cdFx0ZmlsdGVySWRzOiAgICAgICBbXSxcblx0XHRtYXBNYXJrZXJzOiAgICAgIFtdLFxuXHRcdG1hcFR5cGVJZDogICAgICAgJycsXG5cdFx0bWFwWm9vbTogICAgICAgICAwLFxuXHRcdG1hcE1heFpvb206ICAgICAgMjAsXG5cdFx0bWFwVHlwZTogICAgICAgICAnJyxcblx0XHRtYXBJZDogICAgICAgICAgICcnLFxuXHRcdG1hcmtlckNvbG9yOiAgICAgJ3JlZCcsXG5cdH07XG5cblx0Y2xhc3MgS3JtYXAge1xuXHRcdGNvbnN0cnVjdG9yKHNldHRpbmdzKSB7XG5cdFx0XHR0aGlzLnNldHRpbmdzID0gc2V0dGluZ3M7XG5cblx0XHRcdC8vSW5pdGlhbGlzZSBtYXAgb3B0aW9uc1xuXHRcdFx0dGhpcy5nbU9wdGlvbnMgPSB7XG5cdFx0XHRcdHNjcm9sbHdoZWVsOiAgICAgICBmYWxzZSxcblx0XHRcdFx0em9vbTogICAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MubWFwWm9vbSxcblx0XHRcdFx0bWF4Wm9vbTogICAgICAgICAgIHRoaXMuc2V0dGluZ3MubWFwTWF4Wm9vbSxcblx0XHRcdFx0bWFwVHlwZUlkOiAgICAgICAgIHRoaXMuc2V0dGluZ3MubWFwVHlwZUlkLFxuXHRcdFx0XHRzdHJlZXRWaWV3Q29udHJvbDogZmFsc2Vcblx0XHRcdH07XG5cblx0XHRcdG1hcFpvb20gPSB0aGlzLnNldHRpbmdzLm1hcFpvb207XG5cdFx0XHR0aGlzLmdtYXJrZXJzID0gW107XG5cdFx0XHR0aGlzLmNvdW50ID0gMDtcblxuXHRcdFx0dGhpcy5pbml0TWFwKCk7XG5cdFx0fVxuXG5cdFx0c3RhdGljIGNsb3NlS3JJbmZvd2luZG93KCkge1xuXHRcdFx0JCgnI2tyLWluZm93aW5kb3cnKS5oaWRlKCk7XG5cdFx0XHRpbmZvV2luZG93LmNsb3NlKCk7XG5cdFx0XHRpbmZvV2luZG93Mi5jbG9zZSgpO1xuXHRcdH1cblxuXHRcdC8vIG9ubHkgc2hvdyB2aXNpYmxlIG1hcmtlcnNcblx0XHRzdGF0aWMgc2hvd1Zpc2libGVNYXJrZXJzKG1hcmtlcnMpIHtcblx0XHRcdGxldCBib3VuZHMgPSBtYXAuZ2V0Qm91bmRzKCk7XG5cdFx0XHRsZXQgY291bnQgPSAwO1xuXG5cdFx0XHRmb3IgKGxldCBkID0gMDsgZCA8IG1hcmtlcnMubGVuZ3RoOyBkKyspIHtcblx0XHRcdFx0bGV0IG1hcmtlciA9IG1hcmtlcnNbZF07XG5cblx0XHRcdFx0aWYgKG1hcmtlci50eXBlID09PSAnbWFwJykge1xuXHRcdFx0XHRcdGlmIChib3VuZHMuY29udGFpbnMobWFya2VyLmdldFBvc2l0aW9uKCkpID09PSB0cnVlKSB7XG5cdFx0XHRcdFx0XHRtYXJrZXIuc2V0VmlzaWJsZSh0cnVlKTtcblx0XHRcdFx0XHRcdGNvdW50Kys7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdG1hcmtlci5zZXRWaXNpYmxlKGZhbHNlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGNvdW50O1xuXHRcdH1cblxuXHRcdC8vIENoZWNrIE1hcmtlcnMgYXJyYXkgZm9yIGR1cGxpY2F0ZSBwb3NpdGlvbiBhbmQgb2Zmc2V0IGEgbGl0dGxlXG5cdFx0Y2hlY2tEdXBsaWNhdGUoY3VycmVudCkge1xuXHRcdFx0aWYgKHRoaXMuZ21hcmtlcnMubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRsZXQgZHVwcyA9IDA7XG5cblx0XHRcdFx0Zm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuZ21hcmtlcnMubGVuZ3RoOyBpbmRleCsrKSB7XG5cdFx0XHRcdFx0bGV0IHBvcyA9IHRoaXMuZ21hcmtlcnNbaW5kZXhdLmdldFBvc2l0aW9uKCk7XG5cdFx0XHRcdFx0aWYgKGN1cnJlbnQuZXF1YWxzKHBvcykpIHtcblx0XHRcdFx0XHRcdGR1cHMrKztcblx0XHRcdFx0XHRcdGxldCBhID0gMzYwLjAgLyBkdXBzO1xuXHRcdFx0XHRcdFx0bGV0IG5ld0xhdCA9IHBvcy5sYXQoKSArIC0uMDAwMDIgKiBNYXRoLmNvcygoK2EgKiBkdXBzKSAvIDE4MCAqIE1hdGguUEkpOyAgLy94XG5cdFx0XHRcdFx0XHRsZXQgbmV3TG5nID0gcG9zLmxuZygpICsgLS4wMDAwMCAqIE1hdGguc2luKCgrYSAqIGR1cHMpIC8gMTgwICogTWF0aC5QSSk7ICAvL1lcblx0XHRcdFx0XHRcdGN1cnJlbnQgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKG5ld0xhdCwgbmV3TG5nKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGN1cnJlbnQ7XG5cdFx0fVxuXG5cdFx0Y2hlY2tab29tKCkge1xuXHRcdFx0aWYgKG1hcFpvb20gPiAwKSB7XG5cdFx0XHRcdGxldCBteWxpc3RlbmVyID0gbWFwLmFkZExpc3RlbmVyKCdpZGxlJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdGlmIChtYXBab29tID4gMCAmJiBtYXAuZ2V0Wm9vbSgpICE9PSBtYXBab29tKSB7XG5cdFx0XHRcdFx0XHRtYXAuc2V0Wm9vbShtYXBab29tKTtcblx0XHRcdFx0XHRcdG15bGlzdGVuZXIucmVtb3ZlKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRjbHVzdGVyTWFwKCkge1xuXHRcdFx0Y29uc3QgbWNPcHRpb25zID0ge1xuXHRcdFx0XHRncmlkU2l6ZTogICAgICAgICAgICAyMCxcblx0XHRcdFx0aWdub3JlSGlkZGVuTWFya2VyczogdHJ1ZSxcblx0XHRcdFx0aW1hZ2VQYXRoOiAgICAgICAgICAgJy9tZWRpYS9jb21fa25vd3Jlcy9pbWFnZXMvbWFya2VyY2x1c3RlcmVyL20nXG5cdFx0XHR9O1xuXG5cdFx0XHR0aGlzLnNldFByb3BlcnR5TWFya2VycygpO1xuXHRcdFx0dGhpcy5zZXRNYXBNYXJrZXJzKCk7XG5cblx0XHRcdGZvciAobGV0IGQgPSAwOyBkIDwgdGhpcy5nbWFya2Vycy5sZW5ndGg7IGQrKykge1xuXHRcdFx0XHRsZXQgbWFya2VyID0gdGhpcy5nbWFya2Vyc1tkXTtcblx0XHRcdFx0aWYgKG1hcmtlci50eXBlID09PSAncHJvcGVydHknKSB7XG5cdFx0XHRcdFx0aWYgKHRoaXMuc2V0dGluZ3MuZmlsdGVySWRzLmluY2x1ZGVzKG1hcmtlci5waWQpKSB7XG5cdFx0XHRcdFx0XHRtYXJrZXIuc2V0VmlzaWJsZSh0cnVlKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0bWFya2VyLnNldFZpc2libGUoZmFsc2UpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRtYyA9IG5ldyBNYXJrZXJDbHVzdGVyZXIobWFwLCB0aGlzLmdtYXJrZXJzLCBtY09wdGlvbnMpO1xuXHRcdFx0Z29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIobWMsIFwiY2x1c3RlcmNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0JCgnI2tyLWluZm93aW5kb3cnKS5oaWRlKCk7XG5cdFx0XHRcdGluZm9XaW5kb3cuY2xvc2UoKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRtYXAuZml0Qm91bmRzKGJvdW5kcyk7XG5cdFx0XHRtYXAuc2V0Q2VudGVyKGJvdW5kcy5nZXRDZW50ZXIoKSk7XG5cdFx0fVxuXG5cdFx0Ly8gQ3JlYXRlIHRoZSBNYXBcblx0XHRjcmVhdGVNYXAoKSB7XG5cdFx0XHRtYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuc2V0dGluZ3MubWFwSWQpLCB0aGlzLmdtT3B0aW9ucyk7XG5cdFx0XHRpbmZvV2luZG93ID0gbmV3IGdvb2dsZS5tYXBzLkluZm9XaW5kb3coKTtcblx0XHRcdGluZm9XaW5kb3cyID0gbmV3IGdvb2dsZS5tYXBzLkluZm9XaW5kb3coKTtcblx0XHRcdGJvdW5kcyA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmdCb3VuZHMoKTtcblx0XHR9XG5cblx0XHQvLyBDcmVhdGUgdGhlIG1hcmtlciBhbmQgc2V0IHVwIHRoZSBldmVudCB3aW5kb3dcblx0XHRjcmVhdGVNYXBNYXJrZXIocG9pbnQsIGh0bWwsIGltYWdlLCBib3hpbmZvLCBsaW5rLCB0aXRsZSkge1xuXHRcdFx0bGV0IG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xuXHRcdFx0XHRzaGFwZTogICAgbWFya2Vyc2hhcGUsXG5cdFx0XHRcdGxpbms6ICAgICBsaW5rLFxuXHRcdFx0XHRpY29uOiAgICAgaW1hZ2UsXG5cdFx0XHRcdHBvc2l0aW9uOiBwb2ludCxcblx0XHRcdFx0dGl0bGU6ICAgIHRpdGxlLFxuXHRcdFx0XHRtYXA6ICAgICAgbWFwLFxuXHRcdFx0XHR6SW5kZXg6ICAgOTk5XG5cdFx0XHR9KTtcblxuXHRcdFx0Z29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIobWFya2VyLCAnbW91c2VvdmVyJywgKGZ1bmN0aW9uIChodG1sKSB7XG5cdFx0XHRcdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0aW5mb1dpbmRvdzIuc2V0Q29udGVudChodG1sKTtcblx0XHRcdFx0XHRpbmZvV2luZG93Mi5vcGVuKG1hcCwgbWFya2VyKTtcblx0XHRcdFx0fTtcblx0XHRcdH0pKGh0bWwpKTtcblxuXHRcdFx0Z29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIobWFya2VyLCAnbW91c2VvdXQnLCAoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRyZXR1cm4gZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdGluZm9XaW5kb3cyLmNsb3NlKCk7XG5cdFx0XHRcdH07XG5cdFx0XHR9KSgpKTtcblxuXHRcdFx0Z29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIobWFya2VyLCAnY2xvc2VjbGljaycsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0aW5mb1dpbmRvdzIuY2xvc2UoKTtcblx0XHRcdH0pO1xuXG5cdFx0XHR0aGlzLmdtYXJrZXJzLnB1c2gobWFya2VyKTtcblxuXHRcdFx0dGhpcy5jb3VudCsrO1xuXHRcdH1cblxuXHRcdGNyZWF0ZVByb3BlcnR5TWFya2VyKHBvaW50LCBodG1sLCBib3hpbmZvLCBsaW5rLCB0aXRsZSwgY29sb3IsIGlkLCBpbWFnZSwgcGlkKSB7XG5cdFx0XHRsZXQgbWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XG5cdFx0XHRcdHBvc2l0aW9uOiBwb2ludCxcblx0XHRcdFx0bGluazogICAgIGxpbmssXG5cdFx0XHRcdG1hcDogICAgICBtYXAsXG5cdFx0XHRcdGljb246ICAgICBpbWFnZSxcblx0XHRcdFx0dGl0bGU6ICAgIHRpdGxlLFxuXHRcdFx0XHRwaWQ6ICAgICAgcGlkLFxuXHRcdFx0XHR0eXBlOiAgICAgJ3Byb3BlcnR5Jyxcblx0XHRcdFx0ekluZGV4OiAgIHRoaXMuY291bnQgKyAxMDAwXG5cdFx0XHR9KTtcblxuXHRcdFx0cHJvcGVydHlkaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG5cdFx0XHQvLyBpZiAocHJvcGVydHlkaXYgIT09IG51bGwpIHtcblx0XHRcdC8vIFx0Z29vZ2xlLm1hcHMuZXZlbnQuYWRkRG9tTGlzdGVuZXIocHJvcGVydHlkaXYsICdtb3VzZW92ZXInLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHQvLyBcdFx0bWFya2VyLnNldEljb24oXG5cdFx0XHQvLyBcdFx0XHRoaWNvblxuXHRcdFx0Ly8gXHRcdClcblx0XHRcdC8vIFx0XHRtYXJrZXIuc2V0WkluZGV4KG1hcmtlci5nZXRaSW5kZXgoKSArIDEwMDApO1xuXHRcdFx0Ly8gXHR9KTtcblx0XHRcdC8vIFx0Z29vZ2xlLm1hcHMuZXZlbnQuYWRkRG9tTGlzdGVuZXIocHJvcGVydHlkaXYsICdtb3VzZW91dCcsIGZ1bmN0aW9uICgpIHtcblx0XHRcdC8vIFx0XHRtYXJrZXIuc2V0SWNvbihcblx0XHRcdC8vIFx0XHRcdGJpY29uXG5cdFx0XHQvLyBcdFx0KVxuXHRcdFx0Ly8gXHRcdG1hcmtlci5zZXRaSW5kZXgobWFya2VyLmdldFpJbmRleCgpIC0gMTAwMCk7XG5cdFx0XHQvLyBcdH0pO1xuXHRcdFx0Ly8gfVxuXG5cdFx0XHQvLyBtYXJrZXIuYWRkTGlzdGVuZXIoJ21vdXNlb3ZlcicsIChmdW5jdGlvbiAoKSB7XG5cdFx0XHQvLyBcdG1hcmtlci5zZXRJY29uKFxuXHRcdFx0Ly8gXHRcdGhpY29uXG5cdFx0XHQvLyBcdClcblx0XHRcdC8vIFx0bWFya2VyLnNldFpJbmRleChtYXJrZXIuZ2V0WkluZGV4KCkgKyAxMDAwKTtcblx0XHRcdC8vIH0pKTtcblx0XHRcdC8vXG5cdFx0XHQvLyBtYXJrZXIuYWRkTGlzdGVuZXIoJ21vdXNlb3V0JywgKGZ1bmN0aW9uICgpIHtcblx0XHRcdC8vIFx0bWFya2VyLnNldEljb24oXG5cdFx0XHQvLyBcdFx0Ymljb25cblx0XHRcdC8vIFx0KVxuXHRcdFx0Ly8gXHRtYXJrZXIuc2V0WkluZGV4KG1hcmtlci5nZXRaSW5kZXgoKSAtIDEwMDApO1xuXHRcdFx0Ly8gfSkpO1xuXG5cdFx0XHQvLyBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYXJrZXIsICdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHRcdFx0Ly8gXHRtYXJrZXIuc2V0VmlzaWJsZShmYWxzZSk7IC8vIG1hcHMgQVBJIGhpZGUgY2FsbFxuXHRcdFx0Ly8gfSk7XG5cblx0XHRcdG1hcmtlci5hZGRMaXN0ZW5lcignbW91c2Vkb3duJywgKGZ1bmN0aW9uIChib3hpbmZvKSB7XG5cdFx0XHRcdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0aW5mb1dpbmRvdy5jbG9zZSgpO1xuXHRcdFx0XHRcdCQoJyNrci1pbmZvd2luZG93JykuaGlkZSgpO1xuXHRcdFx0XHRcdGluZm9XaW5kb3cuc2V0Q29udGVudChodG1sKTtcblx0XHRcdFx0XHRpbmZvV2luZG93Lm9wZW4obWFwLCBtYXJrZXIpO1xuXG5cdFx0XHRcdFx0JC5hamF4KHtcblx0XHRcdFx0XHRcdHR5cGU6ICAgIFwiUE9TVFwiLFxuXHRcdFx0XHRcdFx0dXJsOiAgICAgJy9pbmRleC5waHA/b3B0aW9uPWNvbV9rbm93cmVzJnRhc2s9cHJvcGVydHkubWFwaW5mb3dpbmRvdyZsYW5nPScgKyBsYW5nLFxuXHRcdFx0XHRcdFx0ZGF0YTogICAge1xuXHRcdFx0XHRcdFx0XHRpZDogcGFyc2VJbnQoYm94aW5mbylcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuXHRcdFx0XHRcdFx0XHQkKCcja3ItaW5mb3dpbmRvdycpLmZhZGVJbig0MDApLmh0bWwoZGF0YSkuc2hvdygpO1xuXHRcdFx0XHRcdFx0XHQkKFwiLmtyLWluZm93aW5kb3ctc2xpZGVzaG93XCIpLm5vdCgnLnNsaWNrLWluaXRpYWxpemVkJykuc2xpY2soe1xuXHRcdFx0XHRcdFx0XHRcdG5leHRBcnJvdzogJzxpIGNsYXNzPVwic2xpY2stbmF2IG5leHQgZmEtc29saWQgZmEtY2hldnJvbi1yaWdodCBcIj48L2k+Jyxcblx0XHRcdFx0XHRcdFx0XHRwcmV2QXJyb3c6ICc8aSBjbGFzcz1cInNsaWNrLW5hdiBwcmV2IGZhLXNvbGlkIGZhLWNoZXZyb24tbGVmdCBcIj48L2k+Jyxcblx0XHRcdFx0XHRcdFx0XHRhdXRvcGxheTogIHRydWVcblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH07XG5cdFx0XHR9KShib3hpbmZvKSk7XG5cblx0XHRcdGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKG1hcmtlciwgJ2Nsb3NlY2xpY2snLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdCQoJyNrci1pbmZvd2luZG93JykuaGlkZSgpO1xuXHRcdFx0XHRpbmZvV2luZG93LmNsb3NlKCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0dGhpcy5nbWFya2Vycy5wdXNoKG1hcmtlcik7XG5cdFx0XHRib3VuZHMuZXh0ZW5kKHBvaW50KTtcblxuXHRcdFx0dGhpcy5jb3VudCsrO1xuXHRcdH1cblxuXHRcdC8vSW5pdGlhbGlzZSBtYXBcblx0XHRpbml0TWFwKCkge1xuXHRcdFx0dGhpcy5jcmVhdGVNYXAoKTtcblx0XHRcdGlmICh0aGlzLnNldHRpbmdzLm1hcFR5cGUgPT09ICdjbHVzdGVyJykge1xuXHRcdFx0XHR0aGlzLmNsdXN0ZXJNYXAoKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuc29sb01hcCgpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIFJlc2V0IG1hcCB0byBpbml0aWFsIHN0YXRlXG5cdFx0cmVmcmVzaE1hcCgkbWFwbW9kYWwpIHtcblx0XHRcdGlmICh0aGlzLnNldHRpbmdzLm1hcFR5cGUgPT09ICdzb2xvJylcblx0XHRcdFx0cmV0dXJuO1xuXG5cdFx0XHRsZXQgc2VsZiA9IHRoaXM7XG5cdFx0XHRqUXVlcnkuYWpheCh7XG5cdFx0XHRcdHVybDogICAgICAnL2luZGV4LnBocD9vcHRpb249Y29tX2tub3dyZXMmdGFzaz1wcm9wZXJ0aWVzLnJlZnJlc2htYXAmbGFuZz0nICsgbGFuZyxcblx0XHRcdFx0dHlwZTogICAgICdQT1NUJyxcblx0XHRcdFx0ZGF0YVR5cGU6ICdqc29uJyxcblx0XHRcdFx0c3VjY2VzczogIGZ1bmN0aW9uIChyZXN1bHQpIHtcblx0XHRcdFx0XHRpZiAocmVzdWx0LnN1Y2Nlc3MpIHtcblx0XHRcdFx0XHRcdHNlbGYuc2V0dGluZ3MuZmlsdGVySWRzID0gcmVzdWx0LmRhdGEuZmlsdGVySWRzO1xuXHRcdFx0XHRcdFx0Zm9yIChsZXQgZCA9IDA7IGQgPCBzZWxmLmdtYXJrZXJzLmxlbmd0aDsgZCsrKSB7XG5cdFx0XHRcdFx0XHRcdGxldCBtYXJrZXIgPSBzZWxmLmdtYXJrZXJzW2RdO1xuXHRcdFx0XHRcdFx0XHRpZiAobWFya2VyLnR5cGUgPT09ICdwcm9wZXJ0eScpIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoc2VsZi5zZXR0aW5ncy5maWx0ZXJJZHMuaW5jbHVkZXMobWFya2VyLnBpZCkpIHtcblx0XHRcdFx0XHRcdFx0XHRcdG1hcmtlci5zZXRWaXNpYmxlKHRydWUpO1xuXHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRtYXJrZXIuc2V0VmlzaWJsZShmYWxzZSk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdG1jLnJlcGFpbnQoKTtcblx0XHRcdFx0XHRcdG5ldyBGb3VuZGF0aW9uLlJldmVhbCgkbWFwbW9kYWwpO1xuXHRcdFx0XHRcdFx0JG1hcG1vZGFsLmZvdW5kYXRpb24oJ29wZW4nKTtcblx0XHRcdFx0XHRcdGdvb2dsZS5tYXBzLmV2ZW50LnRyaWdnZXIobWFwLCAncmVzaXplJyk7XG5cdFx0XHRcdFx0XHQkbWFwbW9kYWwuZm91bmRhdGlvbignb3BlbicpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHR3aW5kb3cuYWxlcnQocmVzdWx0Lm1lc3NhZ2UpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0Ly8gUmVzZXQgbWFwIHRvIGluaXRpYWwgc3RhdGVcblx0XHRyZXNldE1hcCgpIHtcblx0XHRcdGluZm9XaW5kb3cuY2xvc2UoKTtcblx0XHRcdGluZm9XaW5kb3cyLmNsb3NlKCk7XG5cdFx0XHQkKCcja3ItaW5mb3dpbmRvdycpLmhpZGUoKTtcblx0XHRcdG1hcC5maXRCb3VuZHMoYm91bmRzKTtcblx0XHRcdG1hcC5zZXRDZW50ZXIoYm91bmRzLmdldENlbnRlcigpKTtcblx0XHR9XG5cblx0XHQvLyBsb29wIHRvIHNldCBtYXAgbWFya2Vyc1xuXHRcdHNldE1hcE1hcmtlcnMoKSB7XG5cdFx0XHRsZXQgcG9pbnQ7XG5cdFx0XHRsZXQgYW1hcms7XG5cblx0XHRcdGZvciAobGV0IGQgPSAwOyBkIDwgdGhpcy5zZXR0aW5ncy5tYXBNYXJrZXJzLmxlbmd0aDsgZCsrKSB7XG5cdFx0XHRcdGFtYXJrID0gdGhpcy5zZXR0aW5ncy5tYXBNYXJrZXJzW2RdO1xuXHRcdFx0XHRsZXQgbWFya2VyaWNvbiA9IHtcblx0XHRcdFx0XHR1cmw6ICBhbWFya1snaWNvbiddLFxuXHRcdFx0XHRcdHNpemU6IG5ldyBnb29nbGUubWFwcy5TaXplKDMyLCAzNyksXG5cdFx0XHRcdFx0Ly8gT1Igc2NhbGVkU2l6ZTogbmV3IGdvb2dsZS5tYXBzLlNpemUoNDAsIDQ3KVxuXHRcdFx0XHRcdG9yaWdpbjogbmV3IGdvb2dsZS5tYXBzLlBvaW50KDAsIDApLFxuXHRcdFx0XHRcdGFuY2hvcjogbmV3IGdvb2dsZS5tYXBzLlBvaW50KDAsIDE4KVxuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdHBvaW50ID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhhbWFya1snbGF0J10sIGFtYXJrWydsbmcnXSk7XG5cdFx0XHRcdHBvaW50ID0gdGhpcy5jaGVja0R1cGxpY2F0ZShwb2ludCk7XG5cdFx0XHRcdHRoaXMuY3JlYXRlTWFwTWFya2VyKHBvaW50LCBhbWFya1snaHRtbCddLCBtYXJrZXJpY29uLCAnJywgJycsIGFtYXJrWyd0aXRsZSddKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBzZXRNYXJrZXJJY29ucygpIHtcblx0XHQvLyBcdGJpY29uID0ge1xuXHRcdC8vIFx0XHRwYXRoOiAgICAgICAgICcvbWVkaWEvY29tX2tub3dyZXMvYXNzZXRzL2ltYWdlcy9zdmcnLFxuXHRcdC8vIFx0XHRmaWxsQ29sb3I6ICAgIHRoaXMuc2V0dGluZ3MubWFya2VyQ29sb3IsXG5cdFx0Ly8gXHRcdGZpbGxPcGFjaXR5OiAgMC45LFxuXHRcdC8vIFx0XHRhbmNob3I6ICAgICAgIG5ldyBnb29nbGUubWFwcy5Qb2ludCg5LCAzNSksXG5cdFx0Ly8gXHRcdHN0cm9rZUNvbG9yOiAgXCIjZWZlZmVmXCIsXG5cdFx0Ly8gXHRcdHN0cm9rZVdlaWdodDogMC41LFxuXHRcdC8vIFx0XHRzY2FsZTogICAgICAgIDFcblx0XHQvLyBcdH07XG5cdFx0Ly8gXHRoaWNvbiA9IHtcblx0XHQvLyBcdFx0cGF0aDogICAgICAgICAnL21lZGlhL2NvbV9rbm93cmVzL2Fzc2V0cy9pbWFnZXMvc3ZnJyxcblx0XHQvLyBcdFx0ZmlsbENvbG9yOiAgICBcImdyZWVuXCIsXG5cdFx0Ly8gXHRcdGZpbGxPcGFjaXR5OiAgMSxcblx0XHQvLyBcdFx0YW5jaG9yOiAgICAgICBuZXcgZ29vZ2xlLm1hcHMuUG9pbnQoOSwgMzUpLFxuXHRcdC8vIFx0XHRzdHJva2VDb2xvcjogIFwiI2VmZWZlZlwiLFxuXHRcdC8vIFx0XHRzdHJva2VXZWlnaHQ6IDAuOCxcblx0XHQvLyBcdFx0c2NhbGU6ICAgICAgICAxLjVcblx0XHQvLyBcdH07XG5cdFx0Ly8gfVxuXG5cdFx0Ly8gbG9vcCB0byBzZXQgcHJvcGVydHkgbWFya2Vyc1xuXHRcdHNldFByb3BlcnR5TWFya2VycygpIHtcblx0XHRcdGxldCBwb2ludDtcblx0XHRcdGxldCBhbWFyaztcblxuXHRcdFx0Zm9yIChsZXQgZCA9IDA7IGQgPCB0aGlzLnNldHRpbmdzLnByb3BlcnR5TWFya2Vycy5sZW5ndGg7IGQrKykge1xuXHRcdFx0XHRhbWFyayA9IHRoaXMuc2V0dGluZ3MucHJvcGVydHlNYXJrZXJzW2RdO1xuXG5cdFx0XHRcdGlmICghZCkge1xuXHRcdFx0XHRcdHByb3BlcnR5aWNvbiA9IHtcblx0XHRcdFx0XHRcdHVybDogICAgYW1hcmtbJ2ljb24nXSxcblx0XHRcdFx0XHRcdHNpemU6ICAgbmV3IGdvb2dsZS5tYXBzLlNpemUoMzIsIDM3KSxcblx0XHRcdFx0XHRcdG9yaWdpbjogbmV3IGdvb2dsZS5tYXBzLlBvaW50KDAsIDApLFxuXHRcdFx0XHRcdFx0YW5jaG9yOiBuZXcgZ29vZ2xlLm1hcHMuUG9pbnQoMCwgMjApXG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHBvaW50ID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhhbWFya1snbGF0J10sIGFtYXJrWydsbmcnXSk7XG5cdFx0XHRcdHBvaW50ID0gdGhpcy5jaGVja0R1cGxpY2F0ZShwb2ludCk7XG5cdFx0XHRcdHRoaXMuY3JlYXRlUHJvcGVydHlNYXJrZXIocG9pbnQsIGFtYXJrWydodG1sJ10sIGFtYXJrWydib3hpbmZvJ10sIGFtYXJrWydsaW5rJ10sIGFtYXJrWyd0aXRsZSddLCBhbWFya1snY29sb3InXSwgYW1hcmtbJ2lkJ10sIHByb3BlcnR5aWNvbiwgYW1hcmtbJ3BpZCddKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRzb2xvTWFwKCkge1xuXHRcdFx0dGhpcy5zZXRQcm9wZXJ0eU1hcmtlcnMoKTtcblx0XHRcdHRoaXMuc2V0TWFwTWFya2VycygpO1xuXG5cdFx0XHRtYXAuZml0Qm91bmRzKGJvdW5kcyk7XG5cdFx0XHRtYXAuc2V0Q2VudGVyKGJvdW5kcy5nZXRDZW50ZXIoKSk7XG4vL1x0XHRcdHRoaXMuY2hlY2tab29tKCk7XG5cblx0XHRcdGlmICh0aGlzLnNldHRpbmdzLm1hcE1hcmtlcnMubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRjb25zdCBzZWxmID0gdGhpcztcblxuXHRcdFx0XHRsZXQgbXlMaXN0ZW5lciA9IGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKG1hcCwgJ2lkbGUnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0bGV0IGZvdW5kID0gMDtcblx0XHRcdFx0XHRsZXQgY3VycmVudFpvb20gPSBtYXAuZ2V0Wm9vbSgpO1xuXG5cdFx0XHRcdFx0d2hpbGUgKCFmb3VuZCkge1xuXHRcdFx0XHRcdFx0Zm91bmQgPSBLcm1hcC5zaG93VmlzaWJsZU1hcmtlcnMoc2VsZi5nbWFya2Vycyk7XG5cdFx0XHRcdFx0XHRpZiAoZm91bmQpIHtcblx0XHRcdFx0XHRcdFx0bXlMaXN0ZW5lci5yZW1vdmUoKTtcblx0XHRcdFx0XHRcdFx0bWFwLnNldFpvb20oY3VycmVudFpvb20pO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGN1cnJlbnRab29tID0gY3VycmVudFpvb20gLSAxO1xuXHRcdFx0XHRcdFx0aWYgKGN1cnJlbnRab29tIDwgMTApIHtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQkKGZ1bmN0aW9uICgpIHtcblx0XHRsZXQgJG1hcG1vZGFsO1xuXG5cdFx0JCgnYm9keScpLm9uKCdjbGljaycsICcubWFwLXRyaWdnZXInLCBmdW5jdGlvbiAoZSkge1xuIFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcbiBcdFx0XHRpZiAobWFwRGF0YSkge1xuIFx0XHRcdFx0bXlLcm1hcC5yZWZyZXNoTWFwKCRtYXBtb2RhbCk7XG4gXHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdGtpY2tNYXAoJCh0aGlzKSk7XG5cdFx0XHRcdCRtYXBtb2RhbCA9ICQoJyNrci1zZWFyY2gtbWFwLW1vZGFsJyk7XG5cdFx0XHRcdCRtYXBtb2RhbC5mb3VuZGF0aW9uKCdvcGVuJyk7XG4gXHRcdFx0fVxuXHRcdH0pLm9uKCdjbGljaycsICcucmVzZXRtYXAnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0bXlLcm1hcC5yZXNldE1hcCgpO1xuXHRcdH0pLm9uKCdjbGljaycsICcja3Itc2VhcmNoLW1hcC1mdWxsLWluZm93aW5kb3ctY2xvc2UnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0S3JtYXAuY2xvc2VLckluZm93aW5kb3coKTtcblx0XHR9KS5vbignY2xpY2snLCAnLmNsb3NlbWFwJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdCRtYXBtb2RhbC5mb3VuZGF0aW9uKCdjbG9zZScpO1xuXHRcdFx0JC5hamF4KHtcblx0XHRcdFx0dHlwZTogICAgXCJQT1NUXCIsXG5cdFx0XHRcdHVybDogICAgICcvaW5kZXgucGhwP29wdGlvbj1jb21fa25vd3JlcyZ0YXNrPXByb3BlcnRpZXMubWFwc2Vzc2lvbiZsYW5nPScgKyBsYW5nLFxuXHRcdFx0XHRzdWNjZXNzOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0JCggJy5rci1zZWFyY2hiYXIgLmJ1dHRvbi5tYXAnKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG5cdFx0XHRcdFx0JCggJy5rci1zZWFyY2hiYXIgLmJ1dHRvbi5saXN0JykuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9KS5vbignb3Blbi56Zi5yZXZlYWwnLCAnI2tyLXNlYXJjaC1tYXAtbW9kYWwnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0JCgnI2tyLXNlYXJjaC1tYXAtZnVsbCcpLmhlaWdodCgkKCcja3Itc2VhcmNoLW1hcC1tb2RhbCcpLmhlaWdodCgpKTtcblx0XHRcdGdvb2dsZS5tYXBzLmV2ZW50LnRyaWdnZXIobWFwLCBcInJlc2l6ZVwiKTtcblx0XHRcdCQuYWpheCh7XG5cdFx0XHRcdHR5cGU6ICAgIFwiUE9TVFwiLFxuXHRcdFx0XHR1cmw6ICAgICAnL2luZGV4LnBocD9vcHRpb249Y29tX2tub3dyZXMmdGFzaz1wcm9wZXJ0aWVzLm1hcHNlc3Npb24mbGFuZz0nICsgbGFuZyxcblx0XHRcdFx0ZGF0YTogICAge21hcF9tb2RhbDogJzEnfSxcblx0XHRcdFx0c3VjY2VzczogZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9KTtcblxuXHRcdC8vIERvZXNuJ3QgdHJpZ2dlciBpZiBpbmNsdWRlZCBhYm92ZSA/P1xuXHRcdGlmICghbWFwRGF0YSkge1xuXHRcdFx0Y29uc3QgJHNvbG9UcmlnZ2VyID0gJCgnI2tyLW1hcC1zb2xvLXRyaWdnZXInKTtcblx0XHRcdCRzb2xvVHJpZ2dlci5vbmUoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRraWNrTWFwKCRzb2xvVHJpZ2dlcik7XG5cdFx0XHR9KTtcblxuXHRcdFx0aWYgKHdpbmRvdy5sb2NhdGlvbi5ocmVmLmluZGV4T2YoJyNtYXAnKSAhPT0gLTEgJiYgJHNvbG9UcmlnZ2VyLmxlbmd0aCkge1xuXHRcdFx0XHRraWNrTWFwKCRzb2xvVHJpZ2dlcik7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gVGVzdCBmb3IgZm9yY2UgbWFwXG5cdFx0Y29uc3QgJHRyaWdnZXIgPSAkKCcubWFwLXRyaWdnZXInKTtcblx0XHRpZiAoJHRyaWdnZXIuZGF0YSgnZm9yY2VtYXAnKSkge1xuXHRcdFx0JHRyaWdnZXIudHJpZ2dlcignY2xpY2snKTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBraWNrTWFwKCRlbGVtKSB7XG5cdFx0XHRjb25zdCB0eXBlID0gJGVsZW0uZGF0YSgndHlwZScpO1xuXHRcdFx0bGV0IHBpZCA9IDA7XG5cdFx0XHRpZiAodHlwZSA9PT0gJ3NvbG8nKSB7XG5cdFx0XHRcdHBpZCA9ICRlbGVtLmRhdGEoJ3BpZCcpO1xuXHRcdFx0fVxuXG5cdFx0XHRqUXVlcnkuYWpheCh7XG5cdFx0XHRcdHVybDogICAgICAnL2luZGV4LnBocD9vcHRpb249Y29tX2tub3dyZXMmdGFzaz1wcm9wZXJ0aWVzLm1hcGRhdGEmcGlkPScgKyBwaWQgKyAnJmxhbmc9JyArIGxhbmcsXG5cdFx0XHRcdHR5cGU6ICAgICBcIlBPU1RcIixcblx0XHRcdFx0ZGF0YVR5cGU6IFwianNvblwiLFxuXHRcdFx0XHRzdWNjZXNzOiAgZnVuY3Rpb24gKHJlc3VsdCkge1xuXHRcdFx0XHRcdGlmIChyZXN1bHQuc3VjY2Vzcykge1xuXHRcdFx0XHRcdFx0c2V0dGluZ3MgPSB7XG5cdFx0XHRcdFx0XHRcdG1hcElkOiAgICAgICAgICAgJGVsZW0uZGF0YSgndGFyZ2V0JyksXG5cdFx0XHRcdFx0XHRcdG1hcFR5cGU6ICAgICAgICAgJGVsZW0uZGF0YSgndHlwZScpLFxuXHRcdFx0XHRcdFx0XHRtYXBUeXBlSWQ6ICAgICAgICRlbGVtLmRhdGEoJ21hcHR5cGVpZCcpLFxuXHRcdFx0XHRcdFx0XHRtYXBab29tOiAgICAgICAgIHBhcnNlSW50KCRlbGVtLmRhdGEoJ3pvb20nKSksXG5cdFx0XHRcdFx0XHRcdG1hcE1heFpvb206ICAgICAgcGFyc2VJbnQoJGVsZW0uZGF0YSgnem9vbW1heCcpKSxcblx0XHRcdFx0XHRcdFx0cHJvcGVydHlNYXJrZXJzOiByZXN1bHQuZGF0YS5wcm9wZXJ0eU1hcmtlcnMsXG5cdFx0XHRcdFx0XHRcdG1hcE1hcmtlcnM6ICAgICAgcmVzdWx0LmRhdGEubWFwTWFya2Vycyxcblx0XHRcdFx0XHRcdFx0ZmlsdGVySWRzOiAgICAgICByZXN1bHQuZGF0YS5maWx0ZXJJZHNcblx0XHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRcdG15S3JtYXAgPSBuZXcgS3JtYXAoc2V0dGluZ3MpO1xuXHRcdFx0XHRcdFx0bWFwRGF0YSA9IHRydWU7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHdpbmRvdy5hbGVydChyZXN1bHQubWVzc2FnZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cdH0pO1xufShqUXVlcnkpKTsiLCIvKipcbiAqIEBwYWNrYWdlICAgIEtub3cgUmVzZXJ2YXRpb25zXG4gKiBAc3VicGFja2FnZSBTaXRlIEpTXG4gKiBAY29weXJpZ2h0ICAyMDIwIEhpZ2hsYW5kIFZpc2lvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIEBsaWNlbnNlICAgIFNlZSB0aGUgZmlsZSBcIkxJQ0VOU0UudHh0XCIgZm9yIHRoZSBmdWxsIGxpY2Vuc2UgZ292ZXJuaW5nIHRoaXMgY29kZS5cbiAqIEBhdXRob3IgICAgIEhhemVsIFdpbHNvbiA8aGF6ZWxAaGlnaGxhbmR2aXNpb24uY29tPlxuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24gKCQpIHtcblx0bGV0IG15S3Jyb3V0ZTtcblx0bGV0IGRpcmVjdGlvbnNEaXNwbGF5O1xuXHRsZXQgZGlyZWN0aW9uc1Zpc2libGUgPSBmYWxzZTtcblx0bGV0IHJvdXRlTWFwO1xuXHRsZXQgb3JpZ2luO1xuXHRsZXQgZGVzdGluYXRpb247XG5cdGxldCByb3V0ZU1hcmtlcnMgPSBbXTtcblx0bGV0IHJvdXRlU3RvcFBvaW50cyA9IFtdO1xuXHRsZXQgcG9pbnQ7XG5cdGxldCBzZWxmO1xuXG5cdGxldCBzZXR0aW5ncyA9IHtcblx0XHRsYXQ6ICAgICAgICAgICAgICAgXCJcIixcblx0XHRsbmc6ICAgICAgICAgICAgICAgXCJcIixcblx0XHRuYW1lOiAgICAgICAgICAgICAgXCJcIixcblx0XHRpY29uOiAgICAgICAgICAgICAgXCJcIixcblx0XHRkZXRvdXI6ICAgICAgICAgICAgXCJcIixcblx0XHRtYXBab29tOiAgICAgICAgICAgOSxcblx0XHRtYXBNYXhab29tOiAgICAgICAgMjAsXG5cdFx0bWFwVHlwZUlkOiAgICAgICAgIFwicm9hZG1hcFwiLFxuXHRcdG1hcElkOiAgICAgICAgICAgICBcImtyLW1hcC1yb3V0ZVwiLFxuXHRcdGRpcmVjdGlvbnNQYW5lbDogICBcImtyLWRpcmVjdGlvbnMtcGFuZWxcIixcblx0XHRkaXJlY3Rpb25zU2VydmljZTogbnVsbFxuXHR9O1xuXG5cdGNsYXNzIEtycm91dGUge1xuXHRcdGNvbnN0cnVjdG9yKCRlbGVtZW50LCBvcHRpb25zKSB7XG5cdFx0XHR0aGlzLnNldHRpbmdzID0gc2V0dGluZ3M7XG5cdFx0XHRpZiAob3B0aW9ucykge1xuXHRcdFx0XHQkLmV4dGVuZCh0aGlzLnNldHRpbmdzLCBvcHRpb25zKTtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5zZXR0aW5ncy5kaXJlY3Rpb25zU2VydmljZSA9IG5ldyBnb29nbGUubWFwcy5EaXJlY3Rpb25zU2VydmljZSgpO1xuXHRcdFx0dGhpcy5pbml0KCk7XG5cdFx0fVxuXG5cdFx0c3RhdGljIGNsZWFyUm91dGVNYXJrZXJzKCkge1xuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCByb3V0ZU1hcmtlcnMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0cm91dGVNYXJrZXJzW2ldLnNldE1hcChudWxsKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRzdGF0aWMgY2xlYXJXYXlwb2ludHMoKSB7XG5cdFx0XHRvcmlnaW4gPSBudWxsO1xuXHRcdFx0cm91dGVNYXJrZXJzID0gW107XG5cdFx0XHRyb3V0ZVN0b3BQb2ludHMgPSBbXTtcblx0XHRcdGRpcmVjdGlvbnNWaXNpYmxlID0gZmFsc2U7XG5cdFx0fVxuXG5cdFx0YWRkUm91dGVNYXJrZXIobGF0bG5nKSB7XG5cdFx0XHRyb3V0ZU1hcmtlcnMucHVzaChuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcblx0XHRcdFx0cG9zaXRpb246IGxhdGxuZyxcblx0XHRcdFx0bWFwOiAgICAgIHJvdXRlTWFwLFxuXHRcdFx0XHRpY29uOiAgICAgdGhpcy5zZXR0aW5ncy5kZXRvdXJcblx0XHRcdH0pKTtcblx0XHR9XG5cblx0XHQvL1xuXHRcdC8vIGFkZFByb3BlcnR5TWFya2VyKHBvaW50LCBodG1sLCBpbWFnZSwgYm94aW5mbykge1xuXHRcdC8vIFx0bGV0IG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xuXHRcdC8vIFx0XHRwb3NpdGlvbjogcG9pbnQsXG5cdFx0Ly8gXHRcdGh0bWw6ICAgICBodG1sLFxuXHRcdC8vIFx0XHRtYXA6ICAgICAgcm91dGVNYXAsXG5cdFx0Ly8gXHRcdGljb246ICAgICBpbWFnZSxcblx0XHQvLyBcdFx0ekluZGV4OiAgIDFcblx0XHQvLyBcdH0pO1xuXHRcdC8vXG5cdFx0Ly8gXHRsZXQgaW5mb3dpbmRvdyA9IG5ldyBnb29nbGUubWFwcy5JbmZvV2luZG93KHtcblx0XHQvLyBcdFx0Y29udGVudDogYm94aW5mb1xuXHRcdC8vIFx0fSk7XG5cdFx0Ly9cblx0XHQvLyBcdGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKG1hcmtlciwgJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuXHRcdC8vIFx0XHQvLyBDaGVjayB0byBzZWUgaWYgdGhlcmUgaXMgYW4gaW5mbyB3aW5kb3cgc3RvcmVkIGluIHJvdXRlQ3VyckluZm9XaW5kb3csXG5cdFx0Ly8gXHRcdC8vIGlmIHRoZXJlIGlzLCB3ZSB1c2UgLmNsb3NlKCkgdG8gaGlkZSB0aGUgd2luZG93XG5cdFx0Ly8gXHRcdGlmIChyb3V0ZUN1cnJJbmZvV2luZG93KSB7XG5cdFx0Ly8gXHRcdFx0cm91dGVDdXJySW5mb1dpbmRvdy5jbG9zZSgpO1xuXHRcdC8vIFx0XHR9XG5cdFx0Ly8gXHRcdC8vIFB1dCBvdXIgbmV3IGluZm8gd2luZG93IGluIHRvIHRoZSByb3V0ZUN1cnJJbmZvV2luZG93IHZhcmlhYmxlXG5cdFx0Ly8gXHRcdHJvdXRlQ3VyckluZm9XaW5kb3cgPSBpbmZvd2luZG93O1xuXHRcdC8vIFx0XHQvLyBPcGVuIHRoZSB3aW5kb3dcblx0XHQvLyBcdFx0aW5mb3dpbmRvdy5vcGVuKHJvdXRlTWFwLCBtYXJrZXIpO1xuXHRcdC8vIFx0fSk7XG5cdFx0Ly9cblx0XHQvLyBcdC8vZ21hcmtlcnMucHVzaCggbWFya2VyICk7XG5cdFx0Ly8gXHRyb3V0ZU1hcmtlcnMucHVzaChtYXJrZXIpO1xuXHRcdC8vIH1cblxuXHRcdC8vIHN0YXRpYyB1cGRhdGVNb2RlKCkge1xuXHRcdC8vIFx0aWYgKGRpcmVjdGlvbnNWaXNpYmxlKSB7XG5cdFx0Ly8gXHRcdHRoaXMuY2FsY1JvdXRlKCk7XG5cdFx0Ly8gXHR9XG5cdFx0Ly8gfVxuXG5cdFx0Y2FsY1JvdXRlKCkge1xuXHRcdFx0bGV0IGZyb21fYWRkcmVzcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZnJvbV9hZGRyZXNzXCIpLnZhbHVlO1xuXHRcdFx0bGV0IG9yaWdpbiA9IFwiXCI7XG5cblx0XHRcdGlmIChmcm9tX2FkZHJlc3MgPT09IFwiQWRkcmVzc1wiKSBmcm9tX2FkZHJlc3MgPSBcIlwiO1xuXHRcdFx0aWYgKGZyb21fYWRkcmVzcykgb3JpZ2luID0gZnJvbV9hZGRyZXNzICsgXCIsXCIgKyBcIlwiO1xuXG5cdFx0XHRsZXQgbW9kZTtcblx0XHRcdHN3aXRjaCAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtb2RlXCIpLnZhbHVlKSB7XG5cdFx0XHRcdGNhc2UgXCJiaWN5Y2xpbmdcIjpcblx0XHRcdFx0XHRtb2RlID0gZ29vZ2xlLm1hcHMuRGlyZWN0aW9uc1RyYXZlbE1vZGUuQklDWUNMSU5HO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwiZHJpdmluZ1wiOlxuXHRcdFx0XHRcdG1vZGUgPSBnb29nbGUubWFwcy5EaXJlY3Rpb25zVHJhdmVsTW9kZS5EUklWSU5HO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwid2Fsa2luZ1wiOlxuXHRcdFx0XHRcdG1vZGUgPSBnb29nbGUubWFwcy5EaXJlY3Rpb25zVHJhdmVsTW9kZS5XQUxLSU5HO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAob3JpZ2luKSB7XG5cdFx0XHRcdGxldCByZXF1ZXN0ID0ge1xuXHRcdFx0XHRcdG9yaWdpbjogICAgICAgIG9yaWdpbixcblx0XHRcdFx0XHRkZXN0aW5hdGlvbjogICBkZXN0aW5hdGlvbixcblx0XHRcdFx0XHR3YXlwb2ludHM6ICAgICByb3V0ZVN0b3BQb2ludHMsXG5cdFx0XHRcdFx0dHJhdmVsTW9kZTogICAgbW9kZSxcblx0XHRcdFx0XHRhdm9pZEhpZ2h3YXlzOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaGlnaHdheXMnKS5jaGVja2VkLFxuXHRcdFx0XHRcdGF2b2lkVG9sbHM6ICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b2xscycpLmNoZWNrZWRcblx0XHRcdFx0fTtcblxuXHRcdFx0XHRzZWxmID0gdGhpcztcblx0XHRcdFx0dGhpcy5zZXR0aW5ncy5kaXJlY3Rpb25zU2VydmljZS5yb3V0ZShyZXF1ZXN0LCBmdW5jdGlvbiAocmVzcG9uc2UsIHN0YXR1cykge1xuXHRcdFx0XHRcdGlmIChzdGF0dXMgPT09IGdvb2dsZS5tYXBzLkRpcmVjdGlvbnNTdGF0dXMuT0spIHtcblx0XHRcdFx0XHRcdGRpcmVjdGlvbnNEaXNwbGF5LnNldERpcmVjdGlvbnMocmVzcG9uc2UpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRhbGVydChcIkdvb2dsZSBjb3VsZG5gdCBjYWxjdWxhdGUgZGlyZWN0aW9ucyBmb3IgdGhpcyByb3V0ZSBhbmQgc2VsZWN0ZWQgb3B0aW9uc1wiKTtcblx0XHRcdFx0XHRcdHNlbGYucmVzZXRSb3V0ZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdEtycm91dGUuY2xlYXJSb3V0ZU1hcmtlcnMoKTtcblx0XHRcdGRpcmVjdGlvbnNWaXNpYmxlID0gdHJ1ZTtcblx0XHR9XG5cblx0XHRpbml0KCkge1xuXHRcdFx0ZGVzdGluYXRpb24gPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKHRoaXMuc2V0dGluZ3MubGF0LCB0aGlzLnNldHRpbmdzLmxuZyk7XG5cblx0XHRcdC8vSW5pdGlhbGlzZSBtYXAgb3B0aW9uc1xuXHRcdFx0dGhpcy5teU9wdGlvbnMgPSB7XG5cdFx0XHRcdHNjcm9sbHdoZWVsOiAgICAgICBmYWxzZSxcblx0XHRcdFx0em9vbTogICAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MubWFwWm9vbSxcblx0XHRcdFx0bWF4Wm9vbTogICAgICAgICAgIHRoaXMuc2V0dGluZ3MubWFwTWF4Wm9vbSxcblx0XHRcdFx0bWFwVHlwZUlkOiAgICAgICAgIHRoaXMuc2V0dGluZ3MubWFwVHlwZUlkLFxuXHRcdFx0XHRzdHJlZXRWaWV3Q29udHJvbDogZmFsc2UsXG5cdFx0XHRcdGNlbnRlcjogICAgICAgICAgICBkZXN0aW5hdGlvblxuXHRcdFx0fTtcblxuXHRcdFx0cm91dGVNYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuc2V0dGluZ3MubWFwSWQpLCB0aGlzLm15T3B0aW9ucyk7XG5cdFx0XHRkaXJlY3Rpb25zRGlzcGxheSA9IG5ldyBnb29nbGUubWFwcy5EaXJlY3Rpb25zUmVuZGVyZXIoKTtcblx0XHRcdGRpcmVjdGlvbnNEaXNwbGF5LnNldE1hcChyb3V0ZU1hcCk7XG5cdFx0XHRkaXJlY3Rpb25zRGlzcGxheS5zZXRQYW5lbChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnNldHRpbmdzLmRpcmVjdGlvbnNQYW5lbCkpO1xuXG5cdFx0XHRjb25zdCBpbWFnZSA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXJJbWFnZSh0aGlzLnNldHRpbmdzLmljb24pO1xuXHRcdFx0cG9pbnQgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKHRoaXMuc2V0dGluZ3MubGF0LCB0aGlzLnNldHRpbmdzLmxuZyk7XG5cblx0XHRcdHNlbGYgPSB0aGlzO1xuXHRcdFx0Z29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIocm91dGVNYXAsICdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuXHRcdFx0XHRpZiAocm91dGVTdG9wUG9pbnRzLmxlbmd0aCA8IDkpIHtcblx0XHRcdFx0XHRyb3V0ZVN0b3BQb2ludHMucHVzaCh7bG9jYXRpb246IGV2ZW50LmxhdExuZywgc3RvcG92ZXI6IHRydWV9KTtcblx0XHRcdFx0XHRwb2ludCA9IGV2ZW50LmxhdExuZztcblx0XHRcdFx0XHRzZWxmLmFkZFJvdXRlTWFya2VyKHBvaW50KTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRhbGVydChcIk1heGltdW0gbnVtYmVyIG9mIDkgd2F5cG9pbnRzIHJlYWNoZWRcIik7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHRzZWxmID0gdGhpcztcblx0XHRcdGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyT25jZShyb3V0ZU1hcCwgJ2lkbGUnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdGdvb2dsZS5tYXBzLmV2ZW50LnRyaWdnZXIocm91dGVNYXAsICdyZXNpemUnKTtcblx0XHRcdFx0c2VsZi5jYWxjUm91dGUoKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdHJlc2V0Um91dGUoKSB7XG5cdFx0XHRLcnJvdXRlLmNsZWFyUm91dGVNYXJrZXJzKCk7XG5cdFx0XHRLcnJvdXRlLmNsZWFyV2F5cG9pbnRzKCk7XG5cdFx0XHRkaXJlY3Rpb25zRGlzcGxheS5zZXRNYXAobnVsbCk7XG5cdFx0XHRkaXJlY3Rpb25zRGlzcGxheS5zZXRQYW5lbChudWxsKTtcblx0XHRcdGRpcmVjdGlvbnNEaXNwbGF5ID0gbmV3IGdvb2dsZS5tYXBzLkRpcmVjdGlvbnNSZW5kZXJlcigpO1xuXHRcdFx0ZGlyZWN0aW9uc0Rpc3BsYXkuc2V0TWFwKHJvdXRlTWFwKTtcblx0XHRcdGRpcmVjdGlvbnNEaXNwbGF5LnNldFBhbmVsKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuc2V0dGluZ3MuZGlyZWN0aW9uUGFuZWwpKTtcblxuXHRcdFx0dGhpcy5pbml0KCk7XG5cdFx0fVxuXHR9XG5cblx0JChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuXHRcdCQoXCIua3ItZGlyZWN0aW9ucy1tb2RhbFwiKS5vbignY2xpY2snLCAnI2tyLW1hcC1yb3V0ZScsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRsZXQgJGVsZW1lbnQgPSAkKHRoaXMpO1xuXHRcdFx0Y29uc3Qgb3B0aW9ucyA9IHtcblx0XHRcdFx0bGF0OiAgICAkZWxlbWVudC5kYXRhKCdsYXQnKSxcblx0XHRcdFx0bG5nOiAgICAkZWxlbWVudC5kYXRhKCdsbmcnKSxcblx0XHRcdFx0bmFtZTogICAkZWxlbWVudC5kYXRhKCduYW1lJyksXG5cdFx0XHRcdGljb246ICAgJGVsZW1lbnQuZGF0YSgnaWNvbicpLFxuXHRcdFx0XHRkZXRvdXI6ICRlbGVtZW50LmRhdGEoJ2RldG91cicpXG5cdFx0XHR9O1xuXHRcdFx0bXlLcnJvdXRlID0gbmV3IEtycm91dGUoJGVsZW1lbnQsIG9wdGlvbnMpO1xuXHRcdH0pLm9uKCdjbGljaycsICcucmVzZXRyb3V0ZScsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRteUtycm91dGUucmVzZXRSb3V0ZSgpO1xuXHRcdH0pLm9uKCdjbGljaycsICcuY2FsY3JvdXRlJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdG15S3Jyb3V0ZS5jYWxjUm91dGUoKTtcblx0XHR9KTtcblxuXHRcdGpRdWVyeShcImEjZ2VvY29kZUFkZHJlc3NcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0bGV0IGFkZHJlc3NTdHJpbmcgPVxuXHRcdFx0XHQgICAgalF1ZXJ5KFwiI2pmb3JtX3Byb3BlcnR5X3N0cmVldFwiKS52YWwoKVxuXHRcdFx0XHQgICAgKyBcIiwgXCJcblx0XHRcdFx0ICAgICsgalF1ZXJ5KCcjamZvcm1fdG93bl9pZCcpLmZpbmQoXCI6c2VsZWN0ZWRcIikudGV4dCgpXG5cdFx0XHRcdCAgICArIFwiIFwiXG5cdFx0XHRcdCAgICArIGpRdWVyeShcIiNqZm9ybV9wcm9wZXJ0eV9wb3N0Y29kZVwiKS52YWwoKVxuXHRcdFx0XHQgICAgKyBcIiwgXCJcblx0XHRcdFx0ICAgICsgalF1ZXJ5KCcjamZvcm1fcmVnaW9uX2lkJykuZmluZChcIjpzZWxlY3RlZFwiKS50ZXh0KClcblx0XHRcdFx0ICAgICsgXCIgXCJcblx0XHRcdFx0ICAgICsgalF1ZXJ5KCcjamZvcm1fY291bnRyeV9pZCcpLmZpbmQoXCI6c2VsZWN0ZWRcIikudGV4dCgpO1xuXG5cdFx0XHRsZXQgdXJsID0gJ2luZGV4LnBocD9vcHRpb249Y29tX2tub3dyZXMmdGFzaz1wcm9wZXJ0eS5nZW9jb2RlJztcblx0XHRcdGxldCBjb29yZCA9IFtdO1xuXG5cdFx0XHRqUXVlcnkuYWpheCh7XG5cdFx0XHRcdHR5cGU6ICAgICBcIlBPU1RcIixcblx0XHRcdFx0dXJsOiAgICAgIHVybCxcblx0XHRcdFx0ZGF0YTogICAgIHthZGRyZXNzOiBhZGRyZXNzU3RyaW5nfSxcblx0XHRcdFx0ZGF0YVR5cGU6IFwianNvblwiLFxuXHRcdFx0XHRzdWNjZXNzOiAgZnVuY3Rpb24gKGpzb25kYXRhKSB7XG5cdFx0XHRcdFx0alF1ZXJ5LmVhY2goanNvbmRhdGEsIGZ1bmN0aW9uIChrZXksIHZhbCkge1xuXHRcdFx0XHRcdFx0bGV0IGRpdiA9IFwiI1wiICsga2V5O1xuXHRcdFx0XHRcdFx0alF1ZXJ5KGRpdikudmFsKHZhbCk7XG5cdFx0XHRcdFx0XHRjb29yZFtrZXldID0gdmFsO1xuXHRcdFx0XHRcdFx0bXlHbWFwLnJlZnJlc2hNYXAoY29vcmRbJ2xhdCddLCBjb29yZFsnbG5nJ10sIGZhbHNlKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH0pO1xufShqUXVlcnkpKTsiLCIvLyBLUiBBUFAgSlMgRmlsZXNcbmltcG9ydCAnbnBtL2pxdWVyeS1iYXItcmF0aW5nL2pxdWVyeS5iYXJyYXRpbmcnO1xuaW1wb3J0ICducG0vaXMtbWFya2VyLWNsdXN0ZXJlcic7XG5pbXBvcnQgJ21lZGlhanMvc2l0ZS9hcHAnO1xuLy9pbXBvcnQgJ21lZGlhanMvc2l0ZS9jb21ib2dlbyc7XG5pbXBvcnQgJ21lZGlhanMvc2l0ZS9jb25maXJtJztcbmltcG9ydCAnbWVkaWFqcy9zaXRlL2RvYmVudHJ5JztcbmltcG9ydCAnbWVkaWFqcy9zaXRlL2d1ZXN0ZGF0YSc7XG5pbXBvcnQgJ21lZGlhanMvc2l0ZS9tYXAnO1xuaW1wb3J0ICdtZWRpYWpzL3NpdGUvcm91dGUnO1xuLy8gaW1wb3J0ICcuL2pzL3NyYy9rcmFwcC9zdHJpcGUnOyJdLCJuYW1lcyI6WyJNYXJrZXJDbHVzdGVyZXIiLCJtYXAiLCJvcHRfbWFya2VycyIsIm9wdF9vcHRpb25zIiwiZXh0ZW5kIiwiZ29vZ2xlIiwibWFwcyIsIk92ZXJsYXlWaWV3IiwibWFwXyIsIm1hcmtlcnNfIiwiY2x1c3RlcnNfIiwic2l6ZXMiLCJzdHlsZXNfIiwicmVhZHlfIiwib3B0aW9ucyIsImdyaWRTaXplXyIsIm1pbkNsdXN0ZXJTaXplXyIsIm1heFpvb21fIiwiaW1hZ2VQYXRoXyIsIk1BUktFUl9DTFVTVEVSX0lNQUdFX1BBVEhfIiwiaW1hZ2VFeHRlbnNpb25fIiwiTUFSS0VSX0NMVVNURVJfSU1BR0VfRVhURU5TSU9OXyIsInpvb21PbkNsaWNrXyIsInVuZGVmaW5lZCIsImF2ZXJhZ2VDZW50ZXJfIiwic2V0dXBTdHlsZXNfIiwic2V0TWFwIiwicHJldlpvb21fIiwiZ2V0Wm9vbSIsInRoYXQiLCJldmVudCIsImFkZExpc3RlbmVyIiwiem9vbSIsInJlc2V0Vmlld3BvcnQiLCJyZWRyYXciLCJsZW5ndGgiLCJhZGRNYXJrZXJzIiwicHJvdG90eXBlIiwib2JqMSIsIm9iajIiLCJvYmplY3QiLCJwcm9wZXJ0eSIsImFwcGx5Iiwib25BZGQiLCJzZXRSZWFkeV8iLCJkcmF3IiwiaSIsInNpemUiLCJwdXNoIiwidXJsIiwiaGVpZ2h0Iiwid2lkdGgiLCJmaXRNYXBUb01hcmtlcnMiLCJtYXJrZXJzIiwiZ2V0TWFya2VycyIsImJvdW5kcyIsIkxhdExuZ0JvdW5kcyIsIm1hcmtlciIsImdldFBvc2l0aW9uIiwiZml0Qm91bmRzIiwic2V0U3R5bGVzIiwic3R5bGVzIiwiZ2V0U3R5bGVzIiwiaXNab29tT25DbGljayIsImlzQXZlcmFnZUNlbnRlciIsImdldFRvdGFsTWFya2VycyIsInNldE1heFpvb20iLCJtYXhab29tIiwiZ2V0TWF4Wm9vbSIsImNhbGN1bGF0b3JfIiwibnVtU3R5bGVzIiwiaW5kZXgiLCJjb3VudCIsImR2IiwicGFyc2VJbnQiLCJNYXRoIiwibWluIiwidGV4dCIsInNldENhbGN1bGF0b3IiLCJjYWxjdWxhdG9yIiwiZ2V0Q2FsY3VsYXRvciIsIm9wdF9ub2RyYXciLCJwdXNoTWFya2VyVG9fIiwiaXNBZGRlZCIsInJlcGFpbnQiLCJhZGRNYXJrZXIiLCJyZW1vdmVNYXJrZXJfIiwiaW5kZXhPZiIsIm0iLCJzcGxpY2UiLCJyZW1vdmVNYXJrZXIiLCJyZW1vdmVkIiwicmVtb3ZlTWFya2VycyIsInIiLCJyZWFkeSIsImNyZWF0ZUNsdXN0ZXJzXyIsImdldFRvdGFsQ2x1c3RlcnMiLCJnZXRNYXAiLCJnZXRHcmlkU2l6ZSIsInNldEdyaWRTaXplIiwiZ2V0TWluQ2x1c3RlclNpemUiLCJzZXRNaW5DbHVzdGVyU2l6ZSIsImdldEV4dGVuZGVkQm91bmRzIiwicHJvamVjdGlvbiIsImdldFByb2plY3Rpb24iLCJ0ciIsIkxhdExuZyIsImdldE5vcnRoRWFzdCIsImxhdCIsImxuZyIsImJsIiwiZ2V0U291dGhXZXN0IiwidHJQaXgiLCJmcm9tTGF0TG5nVG9EaXZQaXhlbCIsIngiLCJ5IiwiYmxQaXgiLCJuZSIsImZyb21EaXZQaXhlbFRvTGF0TG5nIiwic3ciLCJpc01hcmtlckluQm91bmRzXyIsImNvbnRhaW5zIiwiY2xlYXJNYXJrZXJzIiwib3B0X2hpZGUiLCJjbHVzdGVyIiwicmVtb3ZlIiwib2xkQ2x1c3RlcnMiLCJzbGljZSIsIndpbmRvdyIsInNldFRpbWVvdXQiLCJkaXN0YW5jZUJldHdlZW5Qb2ludHNfIiwicDEiLCJwMiIsIlIiLCJkTGF0IiwiUEkiLCJkTG9uIiwiYSIsInNpbiIsImNvcyIsImMiLCJhdGFuMiIsInNxcnQiLCJkIiwiYWRkVG9DbG9zZXN0Q2x1c3Rlcl8iLCJkaXN0YW5jZSIsImNsdXN0ZXJUb0FkZFRvIiwicG9zIiwiY2VudGVyIiwiZ2V0Q2VudGVyIiwiaXNNYXJrZXJJbkNsdXN0ZXJCb3VuZHMiLCJDbHVzdGVyIiwibWFwQm91bmRzIiwiZ2V0Qm91bmRzIiwibWFya2VyQ2x1c3RlcmVyIiwibWFya2VyQ2x1c3RlcmVyXyIsImNlbnRlcl8iLCJib3VuZHNfIiwiY2x1c3Rlckljb25fIiwiQ2x1c3Rlckljb24iLCJpc01hcmtlckFscmVhZHlBZGRlZCIsImNhbGN1bGF0ZUJvdW5kc18iLCJsIiwibGVuIiwidXBkYXRlSWNvbiIsImdldE1hcmtlckNsdXN0ZXJlciIsImdldFNpemUiLCJteiIsImhpZGUiLCJzdW1zIiwic2V0Q2VudGVyIiwic2V0U3VtcyIsInNob3ciLCJvcHRfcGFkZGluZyIsInBhZGRpbmdfIiwiY2x1c3Rlcl8iLCJkaXZfIiwic3Vtc18iLCJ2aXNpYmxlXyIsInRyaWdnZXJDbHVzdGVyQ2xpY2siLCJ0cmlnZ2VyIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiZ2V0UG9zRnJvbUxhdExuZ18iLCJzdHlsZSIsImNzc1RleHQiLCJjcmVhdGVDc3MiLCJpbm5lckhUTUwiLCJwYW5lcyIsImdldFBhbmVzIiwib3ZlcmxheU1vdXNlVGFyZ2V0IiwiYXBwZW5kQ2hpbGQiLCJhZGREb21MaXN0ZW5lciIsImxhdGxuZyIsIndpZHRoXyIsImhlaWdodF8iLCJ0b3AiLCJsZWZ0IiwiZGlzcGxheSIsIm9uUmVtb3ZlIiwicGFyZW50Tm9kZSIsInJlbW92ZUNoaWxkIiwidGV4dF8iLCJpbmRleF8iLCJ1c2VTdHlsZSIsIm1heCIsInVybF8iLCJ0ZXh0Q29sb3JfIiwiYW5jaG9yXyIsInRleHRTaXplXyIsImZvbnRGYW1pbHlfIiwiZm9udFdlaWdodF8iLCJiYWNrZ3JvdW5kUG9zaXRpb25fIiwiYmFja2dyb3VuZFBvc2l0aW9uIiwiX3R5cGVvZiIsInR4dENvbG9yIiwidHh0U2l6ZSIsImZvbnRGYW1pbHkiLCJmb250V2VpZ2h0Iiwiam9pbiIsImdsb2JhbCIsIm1vZHVsZSIsImV4cG9ydHMiLCJmYWN0b3J5IiwiZGVmaW5lIiwiYW1kIiwicmVxdWlyZSIsImpRdWVyeSIsIiQiLCJCYXJSYXRpbmciLCJzZWxmIiwid3JhcEVsZW1lbnQiLCJjbGFzc2VzIiwidGhlbWUiLCIkZWxlbSIsIndyYXAiLCJ1bndyYXBFbGVtZW50IiwidW53cmFwIiwiZmluZE9wdGlvbiIsInZhbHVlIiwiaXNOdW1lcmljIiwiZmxvb3IiLCJnZXRJbml0aWFsT3B0aW9uIiwiaW5pdGlhbFJhdGluZyIsImdldEVtcHR5T3B0aW9uIiwiJGVtcHR5T3B0IiwiZmluZCIsImVtcHR5VmFsdWUiLCJhbGxvd0VtcHR5IiwicHJlcGVuZFRvIiwiZ2V0RGF0YSIsImtleSIsImRhdGEiLCJzZXREYXRhIiwic2F2ZURhdGFPbkVsZW1lbnQiLCIkb3B0IiwidmFsIiwiZW1wdHlUZXh0IiwidXNlck9wdGlvbnMiLCJyYXRpbmdWYWx1ZSIsInJhdGluZ1RleHQiLCJvcmlnaW5hbFJhdGluZ1ZhbHVlIiwib3JpZ2luYWxSYXRpbmdUZXh0IiwiZW1wdHlSYXRpbmdWYWx1ZSIsImVtcHR5UmF0aW5nVGV4dCIsInJlYWRPbmx5IiwicmVhZG9ubHkiLCJyYXRpbmdNYWRlIiwicmVtb3ZlRGF0YU9uRWxlbWVudCIsInJlbW92ZURhdGEiLCJidWlsZFdpZGdldCIsIiR3IiwiZWFjaCIsImh0bWwiLCIkYSIsInNob3dWYWx1ZXMiLCJhcHBlbmQiLCJzaG93U2VsZWN0ZWRSYXRpbmciLCJyZXZlcnNlIiwiYWRkQ2xhc3MiLCJuZXh0QWxsb3JQcmV2aW91c0FsbCIsInNldFNlbGVjdEZpZWxkVmFsdWUiLCJwcm9wIiwiY2hhbmdlIiwicmVzZXRTZWxlY3RGaWVsZCIsImRlZmF1bHRTZWxlY3RlZCIsInBhcmVudCIsImZyYWN0aW9uIiwicm91bmQiLCJyZXNldFN0eWxlIiwiJHdpZGdldCIsInJlbW92ZUNsYXNzIiwibWF0Y2giLCJhcHBseVN0eWxlIiwiYmFzZVZhbHVlIiwiZiIsIiRhbGwiLCIkZnJhY3Rpb25hbCIsImlzRGVzZWxlY3RhYmxlIiwiJGVsZW1lbnQiLCJkZXNlbGVjdGFibGUiLCJhdHRyIiwiYXR0YWNoQ2xpY2tIYW5kbGVyIiwiJGVsZW1lbnRzIiwib24iLCJwcmV2ZW50RGVmYXVsdCIsIm9uU2VsZWN0IiwiY2FsbCIsImF0dGFjaE1vdXNlRW50ZXJIYW5kbGVyIiwiYXR0YWNoTW91c2VMZWF2ZUhhbmRsZXIiLCJmYXN0Q2xpY2tzIiwic3RvcFByb3BhZ2F0aW9uIiwiY2xpY2siLCJkaXNhYmxlQ2xpY2tzIiwiYXR0YWNoSGFuZGxlcnMiLCJob3ZlclN0YXRlIiwiZGV0YWNoSGFuZGxlcnMiLCJvZmYiLCJzZXR1cEhhbmRsZXJzIiwiaW5zZXJ0QWZ0ZXIiLCJzdGF0ZSIsInRvZ2dsZUNsYXNzIiwic2V0Iiwic2lsZW50IiwiY2xlYXIiLCJvbkNsZWFyIiwiZGVzdHJveSIsIm9uRGVzdHJveSIsImluaXQiLCJlbGVtIiwiZm4iLCJiYXJyYXRpbmciLCJkZWZhdWx0cyIsIm1ldGhvZCIsInBsdWdpbiIsImlzIiwiZXJyb3IiLCJoYXNPd25Qcm9wZXJ0eSIsIm5leHQiLCJsYW5nIiwic2VhcmNoRGF0YSIsInNlYXJjaERvbmUiLCJjYWxlbmRhckxvYWRlZCIsInNhdmVkd2lkdGgiLCJsYXJnZSIsInJlc2l6ZWQiLCJGb3VuZGF0aW9uIiwiYWRkVG9KcXVlcnkiLCJmb3VuZGF0aW9uIiwiY2hlY2tTY3JlZW5XaWR0aCIsIiRjdHJpZ2dlciIsImxvYWRDYWxlbmRhciIsImUiLCIkZm9ybSIsImFqYXgiLCJ0eXBlIiwic2VyaWFsaXplIiwiZGF0YVR5cGUiLCJzdWNjZXNzIiwicmVzdWx0IiwiZm9ybVJlc3BvbnNlIiwibG9jYXRpb24iLCJocmVmIiwibWVzc2FnZSIsIiRtb2RhbCIsIlJldmVhbCIsIm9wZW4iLCJjc3MiLCJtb2RhbGlkIiwidHJpbSIsImFqYXh1cmwiLCJjb250ZW50IiwicGlkIiwiYmFyIiwiZ2V0UHJvcGVydGllcyIsImNoaWxkcmVuIiwidG9nZ2xlIiwic2V0QWN0aXZlTWVudSIsInRhcmdldCIsIiRwcm9wcyIsIiR0YWJzIiwic3BlY2lhbCIsInRvdWNoc3RhcnQiLCJzZXR1cCIsIl8iLCJucyIsImhhbmRsZSIsImluY2x1ZGVzIiwiYWRkRXZlbnRMaXN0ZW5lciIsInBhc3NpdmUiLCJ0b3VjaG1vdmUiLCJpZCIsInJlcGxhY2UiLCJyZWRpcmVjdCIsImFjdGlvbiIsImFyZ3VtZW50cyIsImFjdGlvbl92YWx1ZSIsInJlbG9hZCIsInZhbHMiLCJzZXRTZWFyY2hEYXRhIiwicmVzcG9uc2UiLCJlbXB0eSIsImZhZGVJbiIsImhhc0NsYXNzIiwic2Nyb2xsVG8iLCJzZWFyY2hiYXIiLCJzY3JlZW5XaWR0aEhhc0NoYW5nZWQiLCJNZWRpYVF1ZXJ5IiwiYXRMZWFzdCIsIm9yaWdpbiIsInByb3RvY29sIiwiaG9zdCIsIm15Q29uZmlybSIsIiRteVRhc2siLCJLcmNvbmZpcm0iLCJjb25zdHJ1Y3RvciIsImZvcm0iLCJ1cGRhdGVRdW90ZSIsInNlcmlhbGl6ZUFycmF5IiwiZGl2IiwiY2hlY2tUZXJtcyIsInRlc3QiLCJnZXRFbGVtZW50QnlJZCIsInRlc3RjIiwidGVzdHQiLCJhZ3JlZWNoZWNrIiwiY2hlY2tlZCIsImFncmVlY2hlY2tjIiwiYWdyZWVjaGVja3QiLCJteUtyRG9iRW50cnkiLCJ0b2RheSIsIkJBQ0tTUEFDRSIsInNldHRpbmdzIiwiY3VzdG9tX3ZhbGlkYXRpb24iLCJkYXlzX2luX21vbnRoIiwiZG9jdW1lbnRfZGF0ZSIsImVycm9yYm94X3giLCJlcnJvcmJveF95IiwiZmllbGRfaGludF90ZXh0X2RheSIsImZpZWxkX2hpbnRfdGV4dF9tb250aCIsImZpZWxkX2hpbnRfdGV4dF95ZWFyIiwiZmllbGRfb3JkZXIiLCJmaWVsZF93aWR0aF9kYXkiLCJmaWVsZF93aWR0aF9tb250aCIsImZpZWxkX3dpZHRoX3llYXIiLCJmaWVsZF93aWR0aF9zZXAiLCJtaW5tYXgiLCJtaW5fZGF0ZSIsIm1heF9kYXRlIiwibWluX3llYXIiLCJtb250aF9uYW1lIiwib25fYmx1ciIsIm9uX2Vycm9yIiwib25fY2hhbmdlIiwicGFyc2VfZGF0ZSIsInNlcGFyYXRvciIsInNob3dfZXJyb3JzIiwic2hvd19oaW50cyIsIkVfREFZX05BTiIsIkVfREFZX1RPT19CSUciLCJFX0RBWV9UT09fU01BTEwiLCJFX0JBRF9EQVlfRk9SX01PTlRIIiwiRV9NT05USF9OQU4iLCJFX01PTlRIX1RPT19CSUciLCJFX01PTlRIX1RPT19TTUFMTCIsIkVfWUVBUl9OQU4iLCJFX1lFQVJfTEVOR1RIIiwiRV9ZRUFSX1RPT19TTUFMTCIsIkVfTUlOX0RBVEUiLCJFX01BWF9EQVRFIiwiS3JEb2JFbnRyeSIsImdldFltZCIsIkRhdGUiLCJpbnB1dF9kYXkiLCJpbnB1dF9tb250aCIsImlucHV0X3llYXIiLCJkYXRlIiwiZ2V0TW9udGgiLCJnZXREYXkiLCJnZXRGdWxsWWVhciIsImdldFltZE9iamVjdCIsInllYXIiLCJtb250aCIsImRheSIsImFkZEVudHJ5RmllbGRzIiwiZG9iZmllbGQiLCJmaWVsZHMiLCJzcGxpdCIsImZpZWxkIiwiYnVpbGRGaWVsZCIsImFmdGVyUGFzdGUiLCJwYXJzZURhdGUiLCJzZXREYXRlIiwibmFtZSIsImtyZG9iZW50cnkiLCJpbnB1dCIsIktyRG9iSW5wdXQiLCJoaW50X3RleHQiLCJpbm5lciIsIiRpbnB1dCIsImJ1aWxkVWkiLCJ3cmFwcGVyIiwiZXJyb3Jib3giLCJzZXRGaWVsZFdpZHRocyIsImNoZWNrRG9jdW1lbnQiLCJkb2IiLCJjaGlsZGRvYiIsImNsYXNzbmFtZSIsImVsZW1lbnRzIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImNsZWFyRXJyb3IiLCJlcnJvcl90ZXh0Iiwic2hvd0Vycm9yIiwiZm9jdXMiLCJzZXRGb2N1cyIsImZvY3VzRmllbGRCZWZvcmUiLCJ5aWVsZEZvY3VzIiwiZm9jdXNGaWVsZEFmdGVyIiwiZm9jdXNJbiIsImZvY3VzT3V0Iiwid2lkZ2V0Rm9jdXNMb3N0IiwiZ2V0RGF0ZSIsImRheV92YWx1ZSIsIm1vbnRoX3ZhbHVlIiwieWVhcl92YWx1ZSIsInByb3h5TGFiZWxDbGlja3MiLCJwYXJzZUlzb0RhdGUiLCJSZWdFeHAiLCIkMyIsIiQyIiwiJDEiLCJuZXdfZGF0ZSIsInZhbGlkYXRlIiwic2V0RXJyb3IiLCJhdmFpbGFibGUiLCJ0b3RhbCIsInNldFdpZHRoIiwic2V0UmVhZG9ubHkiLCJtb2RlIiwid2lkZ2V0RXJyb3JUZXh0IiwieF9vZmZzZXQiLCJvdXRlcldpZHRoIiwieV9vZmZzZXQiLCJwb3NpdGlvbiIsImN1cnJlbnRfaW5wdXQiLCJ2YWxpZGF0ZURheSIsInZhbGlkYXRlTW9udGgiLCJ2YWxpZGF0ZVllYXIiLCJ2YWxpZGF0ZURheXNJbk1vbnRoIiwidmFsaWRhdGVDb21wbGV0ZURhdGUiLCJkYXRlX3N0ciIsImRhdGVfb2JqIiwiZGF0ZV9pc28iLCJvcHQiLCJnZXQiLCJoYXNfZm9jdXMiLCJudW0iLCJtc2ciLCJ0b1N0cmluZyIsIm9uQmx1ciIsInByb3h5IiwiYmx1ciIsImtleWRvd24iLCJrZXl1cCIsInNob3dfaGludCIsImtleV9pc19kb3duIiwiaXNEaWdpdEtleSIsImtleWNvZGUiLCJ3aGljaCIsIndhbnQiLCJuZXdfdmFsdWUiLCJzZWxlY3RfYWxsIiwic2VsZWN0IiwibmV3X3dpZHRoIiwiaG93dG9hcnJpdmUiLCJhcnJpdmFsbWVhbnMiLCJnZXRBdHRyaWJ1dGUiLCJkaXNwbGF5QXJyaXZhbCIsImNsYXNzTGlzdCIsImFycml2YWxkYXRhIiwiYWRkIiwibWFya2Vyc2hhcGUiLCJjb29yZHMiLCJteUtybWFwIiwibWFwRGF0YSIsIm1hcFpvb20iLCJpbmZvV2luZG93IiwiaW5mb1dpbmRvdzIiLCJwcm9wZXJ0eWRpdiIsInByb3BlcnR5aWNvbiIsIm1jIiwicHJvcGVydHlNYXJrZXJzIiwiZmlsdGVySWRzIiwibWFwTWFya2VycyIsIm1hcFR5cGVJZCIsIm1hcE1heFpvb20iLCJtYXBUeXBlIiwibWFwSWQiLCJtYXJrZXJDb2xvciIsIktybWFwIiwiZ21PcHRpb25zIiwic2Nyb2xsd2hlZWwiLCJzdHJlZXRWaWV3Q29udHJvbCIsImdtYXJrZXJzIiwiaW5pdE1hcCIsImNsb3NlS3JJbmZvd2luZG93IiwiY2xvc2UiLCJzaG93VmlzaWJsZU1hcmtlcnMiLCJzZXRWaXNpYmxlIiwiY2hlY2tEdXBsaWNhdGUiLCJjdXJyZW50IiwiZHVwcyIsImVxdWFscyIsIm5ld0xhdCIsIm5ld0xuZyIsImNoZWNrWm9vbSIsIm15bGlzdGVuZXIiLCJzZXRab29tIiwiY2x1c3Rlck1hcCIsIm1jT3B0aW9ucyIsImdyaWRTaXplIiwiaWdub3JlSGlkZGVuTWFya2VycyIsImltYWdlUGF0aCIsInNldFByb3BlcnR5TWFya2VycyIsInNldE1hcE1hcmtlcnMiLCJjcmVhdGVNYXAiLCJNYXAiLCJJbmZvV2luZG93IiwiY3JlYXRlTWFwTWFya2VyIiwicG9pbnQiLCJpbWFnZSIsImJveGluZm8iLCJsaW5rIiwidGl0bGUiLCJNYXJrZXIiLCJzaGFwZSIsImljb24iLCJ6SW5kZXgiLCJzZXRDb250ZW50IiwiY3JlYXRlUHJvcGVydHlNYXJrZXIiLCJjb2xvciIsIm5vdCIsInNsaWNrIiwibmV4dEFycm93IiwicHJldkFycm93IiwiYXV0b3BsYXkiLCJzb2xvTWFwIiwicmVmcmVzaE1hcCIsIiRtYXBtb2RhbCIsImFsZXJ0IiwicmVzZXRNYXAiLCJhbWFyayIsIm1hcmtlcmljb24iLCJTaXplIiwiUG9pbnQiLCJhbmNob3IiLCJteUxpc3RlbmVyIiwiZm91bmQiLCJjdXJyZW50Wm9vbSIsImtpY2tNYXAiLCJtYXBfbW9kYWwiLCIkc29sb1RyaWdnZXIiLCJvbmUiLCIkdHJpZ2dlciIsIm15S3Jyb3V0ZSIsImRpcmVjdGlvbnNEaXNwbGF5IiwiZGlyZWN0aW9uc1Zpc2libGUiLCJyb3V0ZU1hcCIsImRlc3RpbmF0aW9uIiwicm91dGVNYXJrZXJzIiwicm91dGVTdG9wUG9pbnRzIiwiZGV0b3VyIiwiZGlyZWN0aW9uc1BhbmVsIiwiZGlyZWN0aW9uc1NlcnZpY2UiLCJLcnJvdXRlIiwiRGlyZWN0aW9uc1NlcnZpY2UiLCJjbGVhclJvdXRlTWFya2VycyIsImNsZWFyV2F5cG9pbnRzIiwiYWRkUm91dGVNYXJrZXIiLCJjYWxjUm91dGUiLCJmcm9tX2FkZHJlc3MiLCJEaXJlY3Rpb25zVHJhdmVsTW9kZSIsIkJJQ1lDTElORyIsIkRSSVZJTkciLCJXQUxLSU5HIiwicmVxdWVzdCIsIndheXBvaW50cyIsInRyYXZlbE1vZGUiLCJhdm9pZEhpZ2h3YXlzIiwiYXZvaWRUb2xscyIsInJvdXRlIiwic3RhdHVzIiwiRGlyZWN0aW9uc1N0YXR1cyIsIk9LIiwic2V0RGlyZWN0aW9ucyIsInJlc2V0Um91dGUiLCJteU9wdGlvbnMiLCJEaXJlY3Rpb25zUmVuZGVyZXIiLCJzZXRQYW5lbCIsIk1hcmtlckltYWdlIiwibGF0TG5nIiwic3RvcG92ZXIiLCJhZGRMaXN0ZW5lck9uY2UiLCJkaXJlY3Rpb25QYW5lbCIsImFkZHJlc3NTdHJpbmciLCJjb29yZCIsImFkZHJlc3MiLCJqc29uZGF0YSIsIm15R21hcCJdLCJzb3VyY2VSb290IjoiIn0=