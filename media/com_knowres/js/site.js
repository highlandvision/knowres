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
    const bars = $('.kr-rating');
    if (bars.length) {
      bars.barrating('show', {
        showValues: true,
        showSelectedRating: false
      });
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
        loadCalendar(pid);
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
          loadCalendar(pid);
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
  function loadCalendar(pid) {
    $.ajax({
      type: 'POST',
      url: '/index.php?option=com_knowres&task=property.geriatric&lang=' + lang,
      dataType: 'html',
      data: {
        'pid': pid
      },
      success: function (data) {
        $('#calendar.tabs-panel').append(data);
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
      $('#kr-properties-filter-heading').html(response['heading']);
      $('.kr-pager').html(response['pagination']);
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
                nextArrow: '<i class="slick-nav next fas fa-chevron-right "></i>',
                prevArrow: '<i class="slick-nav prev fas fa-chevron-left "></i>',
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
        type: "POST",
        dataType: "json",
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
            alert(result.message);
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
      this.checkZoom();
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
        new Foundation.Reveal($mapmodal);
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
            alert(result.message);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNnTSxHQUFHLENBQUMsQ0FBQ25LLEdBQUcsQ0FBQ0EsR0FBRyxDQUFDO1lBQ3BCaWMsS0FBSyxDQUFDdGMsR0FBRyxDQUFDLEdBQUdLLEdBQUc7WUFDaEJvYyxNQUFNLENBQUM3RCxVQUFVLENBQUMwRCxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUVBLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxLQUFLLENBQUM7VUFDckQsQ0FBQyxDQUFDO1FBQ0g7TUFDRCxDQUFDLENBQUM7SUFDSCxDQUFDLENBQUM7RUFDSCxDQUFDLENBQUM7QUFDSCxDQUFDLEVBQUM5ZCxNQUFNLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3UFQ7QUFDZ0Q7QUFDZjtBQUNQO0FBQzFCO0FBQzhCO0FBQ0M7QUFDQztBQUNOO0FBQ0U7QUFDNUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9rci8uL25vZGVfbW9kdWxlcy9pcy1tYXJrZXItY2x1c3RlcmVyL3NyYy9tYXJrZXJjbHVzdGVyZXIuanMiLCJ3ZWJwYWNrOi8va3IvLi9ub2RlX21vZHVsZXMvanF1ZXJ5LWJhci1yYXRpbmcvanF1ZXJ5LmJhcnJhdGluZy5qcyIsIndlYnBhY2s6Ly9rci8uL3NyYy9tZWRpYS9jb21fa25vd3Jlcy9qcy9zcmMvc2l0ZS9hcHAuanMiLCJ3ZWJwYWNrOi8va3IvLi9zcmMvbWVkaWEvY29tX2tub3dyZXMvanMvc3JjL3NpdGUvY29uZmlybS5qcyIsIndlYnBhY2s6Ly9rci8uL3NyYy9tZWRpYS9jb21fa25vd3Jlcy9qcy9zcmMvc2l0ZS9kb2JlbnRyeS5qcyIsIndlYnBhY2s6Ly9rci8uL3NyYy9tZWRpYS9jb21fa25vd3Jlcy9qcy9zcmMvc2l0ZS9ndWVzdGRhdGEuanMiLCJ3ZWJwYWNrOi8va3IvLi9zcmMvbWVkaWEvY29tX2tub3dyZXMvanMvc3JjL3NpdGUvbWFwLmpzIiwid2VicGFjazovL2tyLy4vc3JjL21lZGlhL2NvbV9rbm93cmVzL2pzL3NyYy9zaXRlL3JvdXRlLmpzIiwid2VicGFjazovL2tyLy4vd2VicGFjay5idWlsZC5zaXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogTnBtIHZlcnNpb24gb2YgbWFya2VyQ2x1c3RlcmVyIHdvcmtzIGdyZWF0IHdpdGggYnJvd3NlcmlmeVxuICogRGlmZmVyZW5jZSBmcm9tIHRoZSBvcmlnaW5hbCAtIGFkZHMgYSBjb21tb25qcyBmb3JtYXQgYW5kIHJlcGxhY2VzIHdpbmRvdyB3aXRoIGdsb2JhbCBhbmQgc29tZSB1bml0IHRlc3RcbiAqIFRoZSBvcmlnaW5hbCBmdW5jdGlvbmFsaXR5IGl0J3Mgbm90IG1vZGlmaWVkIGZvciBkb2NzIGFuZCBvcmlnaW5hbCBzb3VyY2UgY2hlY2tcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9nb29nbGVtYXBzL2pzLW1hcmtlci1jbHVzdGVyZXJcbiAqL1xuXG4vKipcbiAqIEBuYW1lIE1hcmtlckNsdXN0ZXJlciBmb3IgR29vZ2xlIE1hcHMgdjNcbiAqIEB2ZXJzaW9uIHZlcnNpb24gMS4wXG4gKiBAYXV0aG9yIEx1a2UgTWFoZVxuICogQGZpbGVvdmVydmlld1xuICogVGhlIGxpYnJhcnkgY3JlYXRlcyBhbmQgbWFuYWdlcyBwZXItem9vbS1sZXZlbCBjbHVzdGVycyBmb3IgbGFyZ2UgYW1vdW50cyBvZlxuICogbWFya2Vycy5cbiAqIDxici8+XG4gKiBUaGlzIGlzIGEgdjMgaW1wbGVtZW50YXRpb24gb2YgdGhlXG4gKiA8YSBocmVmPVwiaHR0cDovL2dtYXBzLXV0aWxpdHktbGlicmFyeS1kZXYuZ29vZ2xlY29kZS5jb20vc3ZuL3RhZ3MvbWFya2VyY2x1c3RlcmVyL1wiXG4gKiA+djIgTWFya2VyQ2x1c3RlcmVyPC9hPi5cbiAqL1xuXG4vKipcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5cbi8qKlxuICogQSBNYXJrZXIgQ2x1c3RlcmVyIHRoYXQgY2x1c3RlcnMgbWFya2Vycy5cbiAqXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLk1hcH0gbWFwIFRoZSBHb29nbGUgbWFwIHRvIGF0dGFjaCB0by5cbiAqIEBwYXJhbSB7QXJyYXkuPGdvb2dsZS5tYXBzLk1hcmtlcj49fSBvcHRfbWFya2VycyBPcHRpb25hbCBtYXJrZXJzIHRvIGFkZCB0b1xuICogICB0aGUgY2x1c3Rlci5cbiAqIEBwYXJhbSB7T2JqZWN0PX0gb3B0X29wdGlvbnMgc3VwcG9ydCB0aGUgZm9sbG93aW5nIG9wdGlvbnM6XG4gKiAgICAgJ2dyaWRTaXplJzogKG51bWJlcikgVGhlIGdyaWQgc2l6ZSBvZiBhIGNsdXN0ZXIgaW4gcGl4ZWxzLlxuICogICAgICdtYXhab29tJzogKG51bWJlcikgVGhlIG1heGltdW0gem9vbSBsZXZlbCB0aGF0IGEgbWFya2VyIGNhbiBiZSBwYXJ0IG9mIGFcbiAqICAgICAgICAgICAgICAgIGNsdXN0ZXIuXG4gKiAgICAgJ3pvb21PbkNsaWNrJzogKGJvb2xlYW4pIFdoZXRoZXIgdGhlIGRlZmF1bHQgYmVoYXZpb3VyIG9mIGNsaWNraW5nIG9uIGFcbiAqICAgICAgICAgICAgICAgICAgICBjbHVzdGVyIGlzIHRvIHpvb20gaW50byBpdC5cbiAqICAgICAnYXZlcmFnZUNlbnRlcic6IChib29sZWFuKSBXZXRoZXIgdGhlIGNlbnRlciBvZiBlYWNoIGNsdXN0ZXIgc2hvdWxkIGJlXG4gKiAgICAgICAgICAgICAgICAgICAgICB0aGUgYXZlcmFnZSBvZiBhbGwgbWFya2VycyBpbiB0aGUgY2x1c3Rlci5cbiAqICAgICAnbWluaW11bUNsdXN0ZXJTaXplJzogKG51bWJlcikgVGhlIG1pbmltdW0gbnVtYmVyIG9mIG1hcmtlcnMgdG8gYmUgaW4gYVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICBjbHVzdGVyIGJlZm9yZSB0aGUgbWFya2VycyBhcmUgaGlkZGVuIGFuZCBhIGNvdW50XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzIHNob3duLlxuICogICAgICdzdHlsZXMnOiAob2JqZWN0KSBBbiBvYmplY3QgdGhhdCBoYXMgc3R5bGUgcHJvcGVydGllczpcbiAqICAgICAgICd1cmwnOiAoc3RyaW5nKSBUaGUgaW1hZ2UgdXJsLlxuICogICAgICAgJ2hlaWdodCc6IChudW1iZXIpIFRoZSBpbWFnZSBoZWlnaHQuXG4gKiAgICAgICAnd2lkdGgnOiAobnVtYmVyKSBUaGUgaW1hZ2Ugd2lkdGguXG4gKiAgICAgICAnYW5jaG9yJzogKEFycmF5KSBUaGUgYW5jaG9yIHBvc2l0aW9uIG9mIHRoZSBsYWJlbCB0ZXh0LlxuICogICAgICAgJ3RleHRDb2xvcic6IChzdHJpbmcpIFRoZSB0ZXh0IGNvbG9yLlxuICogICAgICAgJ3RleHRTaXplJzogKG51bWJlcikgVGhlIHRleHQgc2l6ZS5cbiAqICAgICAgICdmb250RmFtaWx5JzogKHN0cmluZykgVGhlIGZvbnQgZmFtaWx5LlxuICogICAgICAgJ2ZvbnRXZWlnaHQnOiAoc3RyaW5nKSBUaGUgZm9udCB3ZWlnaHQuXG4gKiAgICAgICAnYmFja2dyb3VuZFBvc2l0aW9uJzogKHN0cmluZykgVGhlIHBvc2l0aW9uIG9mIHRoZSBiYWNrZ291bmQgeCwgeS5cbiAqIEBjb25zdHJ1Y3RvclxuICogQGV4dGVuZHMgZ29vZ2xlLm1hcHMuT3ZlcmxheVZpZXdcbiAqL1xuZnVuY3Rpb24gTWFya2VyQ2x1c3RlcmVyKG1hcCwgb3B0X21hcmtlcnMsIG9wdF9vcHRpb25zKSB7XG4gIC8vIE1hcmtlckNsdXN0ZXJlciBpbXBsZW1lbnRzIGdvb2dsZS5tYXBzLk92ZXJsYXlWaWV3IGludGVyZmFjZS4gV2UgdXNlIHRoZVxuICAvLyBleHRlbmQgZnVuY3Rpb24gdG8gZXh0ZW5kIE1hcmtlckNsdXN0ZXJlciB3aXRoIGdvb2dsZS5tYXBzLk92ZXJsYXlWaWV3XG4gIC8vIGJlY2F1c2UgaXQgbWlnaHQgbm90IGFsd2F5cyBiZSBhdmFpbGFibGUgd2hlbiB0aGUgY29kZSBpcyBkZWZpbmVkIHNvIHdlXG4gIC8vIGxvb2sgZm9yIGl0IGF0IHRoZSBsYXN0IHBvc3NpYmxlIG1vbWVudC4gSWYgaXQgZG9lc24ndCBleGlzdCBub3cgdGhlblxuICAvLyB0aGVyZSBpcyBubyBwb2ludCBnb2luZyBhaGVhZCA6KVxuICB0aGlzLmV4dGVuZChNYXJrZXJDbHVzdGVyZXIsIGdvb2dsZS5tYXBzLk92ZXJsYXlWaWV3KTtcbiAgdGhpcy5tYXBfID0gbWFwO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7QXJyYXkuPGdvb2dsZS5tYXBzLk1hcmtlcj59XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICB0aGlzLm1hcmtlcnNfID0gW107XG5cbiAgLyoqXG4gICAqICBAdHlwZSB7QXJyYXkuPENsdXN0ZXI+fVxuICAgKi9cbiAgdGhpcy5jbHVzdGVyc18gPSBbXTtcblxuICB0aGlzLnNpemVzID0gWzUzLCA1NiwgNjYsIDc4LCA5MF07XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICB0aGlzLnN0eWxlc18gPSBbXTtcblxuICAvKipcbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICB0aGlzLnJlYWR5XyA9IGZhbHNlO1xuXG4gIHZhciBvcHRpb25zID0gb3B0X29wdGlvbnMgfHwge307XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICB0aGlzLmdyaWRTaXplXyA9IG9wdGlvbnNbJ2dyaWRTaXplJ10gfHwgNjA7XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICB0aGlzLm1pbkNsdXN0ZXJTaXplXyA9IG9wdGlvbnNbJ21pbmltdW1DbHVzdGVyU2l6ZSddIHx8IDI7XG5cblxuICAvKipcbiAgICogQHR5cGUgez9udW1iZXJ9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICB0aGlzLm1heFpvb21fID0gb3B0aW9uc1snbWF4Wm9vbSddIHx8IG51bGw7XG5cbiAgdGhpcy5zdHlsZXNfID0gb3B0aW9uc1snc3R5bGVzJ10gfHwgW107XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICB0aGlzLmltYWdlUGF0aF8gPSBvcHRpb25zWydpbWFnZVBhdGgnXSB8fFxuICAgICAgdGhpcy5NQVJLRVJfQ0xVU1RFUl9JTUFHRV9QQVRIXztcblxuICAvKipcbiAgICogQHR5cGUge3N0cmluZ31cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHRoaXMuaW1hZ2VFeHRlbnNpb25fID0gb3B0aW9uc1snaW1hZ2VFeHRlbnNpb24nXSB8fFxuICAgICAgdGhpcy5NQVJLRVJfQ0xVU1RFUl9JTUFHRV9FWFRFTlNJT05fO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHRoaXMuem9vbU9uQ2xpY2tfID0gdHJ1ZTtcblxuICBpZiAob3B0aW9uc1snem9vbU9uQ2xpY2snXSAhPSB1bmRlZmluZWQpIHtcbiAgICB0aGlzLnpvb21PbkNsaWNrXyA9IG9wdGlvbnNbJ3pvb21PbkNsaWNrJ107XG4gIH1cblxuICAvKipcbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICB0aGlzLmF2ZXJhZ2VDZW50ZXJfID0gZmFsc2U7XG5cbiAgaWYgKG9wdGlvbnNbJ2F2ZXJhZ2VDZW50ZXInXSAhPSB1bmRlZmluZWQpIHtcbiAgICB0aGlzLmF2ZXJhZ2VDZW50ZXJfID0gb3B0aW9uc1snYXZlcmFnZUNlbnRlciddO1xuICB9XG5cbiAgdGhpcy5zZXR1cFN0eWxlc18oKTtcblxuICB0aGlzLnNldE1hcChtYXApO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgdGhpcy5wcmV2Wm9vbV8gPSB0aGlzLm1hcF8uZ2V0Wm9vbSgpO1xuXG4gIC8vIEFkZCB0aGUgbWFwIGV2ZW50IGxpc3RlbmVyc1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKHRoaXMubWFwXywgJ3pvb21fY2hhbmdlZCcsIGZ1bmN0aW9uKCkge1xuICAgIHZhciB6b29tID0gdGhhdC5tYXBfLmdldFpvb20oKTtcblxuICAgIGlmICh0aGF0LnByZXZab29tXyAhPSB6b29tKSB7XG4gICAgICB0aGF0LnByZXZab29tXyA9IHpvb207XG4gICAgICB0aGF0LnJlc2V0Vmlld3BvcnQoKTtcbiAgICB9XG4gIH0pO1xuXG4gIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKHRoaXMubWFwXywgJ2lkbGUnLCBmdW5jdGlvbigpIHtcbiAgICB0aGF0LnJlZHJhdygpO1xuICB9KTtcblxuICAvLyBGaW5hbGx5LCBhZGQgdGhlIG1hcmtlcnNcbiAgaWYgKG9wdF9tYXJrZXJzICYmIG9wdF9tYXJrZXJzLmxlbmd0aCkge1xuICAgIHRoaXMuYWRkTWFya2VycyhvcHRfbWFya2VycywgZmFsc2UpO1xuICB9XG59XG5cblxuLyoqXG4gKiBUaGUgbWFya2VyIGNsdXN0ZXIgaW1hZ2UgcGF0aC5cbiAqXG4gKiBAdHlwZSB7c3RyaW5nfVxuICogQHByaXZhdGVcbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5NQVJLRVJfQ0xVU1RFUl9JTUFHRV9QQVRIXyA9XG4gICAgJ2h0dHA6Ly9nb29nbGUtbWFwcy11dGlsaXR5LWxpYnJhcnktdjMuZ29vZ2xlY29kZS5jb20vc3ZuL3RydW5rL21hcmtlcmNsdXN0ZXJlci8nICtcbiAgICAnaW1hZ2VzL20nO1xuXG5cbi8qKlxuICogVGhlIG1hcmtlciBjbHVzdGVyIGltYWdlIHBhdGguXG4gKlxuICogQHR5cGUge3N0cmluZ31cbiAqIEBwcml2YXRlXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuTUFSS0VSX0NMVVNURVJfSU1BR0VfRVhURU5TSU9OXyA9ICdwbmcnO1xuXG5cbi8qKlxuICogRXh0ZW5kcyBhIG9iamVjdHMgcHJvdG90eXBlIGJ5IGFub3RoZXJzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmoxIFRoZSBvYmplY3QgdG8gYmUgZXh0ZW5kZWQuXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqMiBUaGUgb2JqZWN0IHRvIGV4dGVuZCB3aXRoLlxuICogQHJldHVybiB7T2JqZWN0fSBUaGUgbmV3IGV4dGVuZGVkIG9iamVjdC5cbiAqIEBpZ25vcmVcbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5leHRlbmQgPSBmdW5jdGlvbihvYmoxLCBvYmoyKSB7XG4gIHJldHVybiAoZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgZm9yICh2YXIgcHJvcGVydHkgaW4gb2JqZWN0LnByb3RvdHlwZSkge1xuICAgICAgdGhpcy5wcm90b3R5cGVbcHJvcGVydHldID0gb2JqZWN0LnByb3RvdHlwZVtwcm9wZXJ0eV07XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9KS5hcHBseShvYmoxLCBbb2JqMl0pO1xufTtcblxuXG4vKipcbiAqIEltcGxlbWVudGFpb24gb2YgdGhlIGludGVyZmFjZSBtZXRob2QuXG4gKiBAaWdub3JlXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUub25BZGQgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5zZXRSZWFkeV8odHJ1ZSk7XG59O1xuXG4vKipcbiAqIEltcGxlbWVudGFpb24gb2YgdGhlIGludGVyZmFjZSBtZXRob2QuXG4gKiBAaWdub3JlXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZHJhdyA9IGZ1bmN0aW9uKCkge307XG5cbi8qKlxuICogU2V0cyB1cCB0aGUgc3R5bGVzIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnNldHVwU3R5bGVzXyA9IGZ1bmN0aW9uKCkge1xuICBpZiAodGhpcy5zdHlsZXNfLmxlbmd0aCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwLCBzaXplOyBzaXplID0gdGhpcy5zaXplc1tpXTsgaSsrKSB7XG4gICAgdGhpcy5zdHlsZXNfLnB1c2goe1xuICAgICAgdXJsOiB0aGlzLmltYWdlUGF0aF8gKyAoaSArIDEpICsgJy4nICsgdGhpcy5pbWFnZUV4dGVuc2lvbl8sXG4gICAgICBoZWlnaHQ6IHNpemUsXG4gICAgICB3aWR0aDogc2l6ZVxuICAgIH0pO1xuICB9XG59O1xuXG4vKipcbiAqICBGaXQgdGhlIG1hcCB0byB0aGUgYm91bmRzIG9mIHRoZSBtYXJrZXJzIGluIHRoZSBjbHVzdGVyZXIuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZml0TWFwVG9NYXJrZXJzID0gZnVuY3Rpb24oKSB7XG4gIHZhciBtYXJrZXJzID0gdGhpcy5nZXRNYXJrZXJzKCk7XG4gIHZhciBib3VuZHMgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nQm91bmRzKCk7XG4gIGZvciAodmFyIGkgPSAwLCBtYXJrZXI7IG1hcmtlciA9IG1hcmtlcnNbaV07IGkrKykge1xuICAgIGJvdW5kcy5leHRlbmQobWFya2VyLmdldFBvc2l0aW9uKCkpO1xuICB9XG5cbiAgdGhpcy5tYXBfLmZpdEJvdW5kcyhib3VuZHMpO1xufTtcblxuXG4vKipcbiAqICBTZXRzIHRoZSBzdHlsZXMuXG4gKlxuICogIEBwYXJhbSB7T2JqZWN0fSBzdHlsZXMgVGhlIHN0eWxlIHRvIHNldC5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5zZXRTdHlsZXMgPSBmdW5jdGlvbihzdHlsZXMpIHtcbiAgdGhpcy5zdHlsZXNfID0gc3R5bGVzO1xufTtcblxuXG4vKipcbiAqICBHZXRzIHRoZSBzdHlsZXMuXG4gKlxuICogIEByZXR1cm4ge09iamVjdH0gVGhlIHN0eWxlcyBvYmplY3QuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0U3R5bGVzID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnN0eWxlc187XG59O1xuXG5cbi8qKlxuICogV2hldGhlciB6b29tIG9uIGNsaWNrIGlzIHNldC5cbiAqXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIHpvb21PbkNsaWNrXyBpcyBzZXQuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuaXNab29tT25DbGljayA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy56b29tT25DbGlja187XG59O1xuXG4vKipcbiAqIFdoZXRoZXIgYXZlcmFnZSBjZW50ZXIgaXMgc2V0LlxuICpcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgYXZlcmFnZUNlbnRlcl8gaXMgc2V0LlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmlzQXZlcmFnZUNlbnRlciA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5hdmVyYWdlQ2VudGVyXztcbn07XG5cblxuLyoqXG4gKiAgUmV0dXJucyB0aGUgYXJyYXkgb2YgbWFya2VycyBpbiB0aGUgY2x1c3RlcmVyLlxuICpcbiAqICBAcmV0dXJuIHtBcnJheS48Z29vZ2xlLm1hcHMuTWFya2VyPn0gVGhlIG1hcmtlcnMuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0TWFya2VycyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5tYXJrZXJzXztcbn07XG5cblxuLyoqXG4gKiAgUmV0dXJucyB0aGUgbnVtYmVyIG9mIG1hcmtlcnMgaW4gdGhlIGNsdXN0ZXJlclxuICpcbiAqICBAcmV0dXJuIHtOdW1iZXJ9IFRoZSBudW1iZXIgb2YgbWFya2Vycy5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRUb3RhbE1hcmtlcnMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMubWFya2Vyc18ubGVuZ3RoO1xufTtcblxuXG4vKipcbiAqICBTZXRzIHRoZSBtYXggem9vbSBmb3IgdGhlIGNsdXN0ZXJlci5cbiAqXG4gKiAgQHBhcmFtIHtudW1iZXJ9IG1heFpvb20gVGhlIG1heCB6b29tIGxldmVsLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnNldE1heFpvb20gPSBmdW5jdGlvbihtYXhab29tKSB7XG4gIHRoaXMubWF4Wm9vbV8gPSBtYXhab29tO1xufTtcblxuXG4vKipcbiAqICBHZXRzIHRoZSBtYXggem9vbSBmb3IgdGhlIGNsdXN0ZXJlci5cbiAqXG4gKiAgQHJldHVybiB7bnVtYmVyfSBUaGUgbWF4IHpvb20gbGV2ZWwuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0TWF4Wm9vbSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5tYXhab29tXztcbn07XG5cblxuLyoqXG4gKiAgVGhlIGZ1bmN0aW9uIGZvciBjYWxjdWxhdGluZyB0aGUgY2x1c3RlciBpY29uIGltYWdlLlxuICpcbiAqICBAcGFyYW0ge0FycmF5Ljxnb29nbGUubWFwcy5NYXJrZXI+fSBtYXJrZXJzIFRoZSBtYXJrZXJzIGluIHRoZSBjbHVzdGVyZXIuXG4gKiAgQHBhcmFtIHtudW1iZXJ9IG51bVN0eWxlcyBUaGUgbnVtYmVyIG9mIHN0eWxlcyBhdmFpbGFibGUuXG4gKiAgQHJldHVybiB7T2JqZWN0fSBBIG9iamVjdCBwcm9wZXJ0aWVzOiAndGV4dCcgKHN0cmluZykgYW5kICdpbmRleCcgKG51bWJlcikuXG4gKiAgQHByaXZhdGVcbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5jYWxjdWxhdG9yXyA9IGZ1bmN0aW9uKG1hcmtlcnMsIG51bVN0eWxlcykge1xuICB2YXIgaW5kZXggPSAwO1xuICB2YXIgY291bnQgPSBtYXJrZXJzLmxlbmd0aDtcbiAgdmFyIGR2ID0gY291bnQ7XG4gIHdoaWxlIChkdiAhPT0gMCkge1xuICAgIGR2ID0gcGFyc2VJbnQoZHYgLyAxMCwgMTApO1xuICAgIGluZGV4Kys7XG4gIH1cblxuICBpbmRleCA9IE1hdGgubWluKGluZGV4LCBudW1TdHlsZXMpO1xuICByZXR1cm4ge1xuICAgIHRleHQ6IGNvdW50LFxuICAgIGluZGV4OiBpbmRleFxuICB9O1xufTtcblxuXG4vKipcbiAqIFNldCB0aGUgY2FsY3VsYXRvciBmdW5jdGlvbi5cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKEFycmF5LCBudW1iZXIpfSBjYWxjdWxhdG9yIFRoZSBmdW5jdGlvbiB0byBzZXQgYXMgdGhlXG4gKiAgICAgY2FsY3VsYXRvci4gVGhlIGZ1bmN0aW9uIHNob3VsZCByZXR1cm4gYSBvYmplY3QgcHJvcGVydGllczpcbiAqICAgICAndGV4dCcgKHN0cmluZykgYW5kICdpbmRleCcgKG51bWJlcikuXG4gKlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnNldENhbGN1bGF0b3IgPSBmdW5jdGlvbihjYWxjdWxhdG9yKSB7XG4gIHRoaXMuY2FsY3VsYXRvcl8gPSBjYWxjdWxhdG9yO1xufTtcblxuXG4vKipcbiAqIEdldCB0aGUgY2FsY3VsYXRvciBmdW5jdGlvbi5cbiAqXG4gKiBAcmV0dXJuIHtmdW5jdGlvbihBcnJheSwgbnVtYmVyKX0gdGhlIGNhbGN1bGF0b3IgZnVuY3Rpb24uXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0Q2FsY3VsYXRvciA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5jYWxjdWxhdG9yXztcbn07XG5cblxuLyoqXG4gKiBBZGQgYW4gYXJyYXkgb2YgbWFya2VycyB0byB0aGUgY2x1c3RlcmVyLlxuICpcbiAqIEBwYXJhbSB7QXJyYXkuPGdvb2dsZS5tYXBzLk1hcmtlcj59IG1hcmtlcnMgVGhlIG1hcmtlcnMgdG8gYWRkLlxuICogQHBhcmFtIHtib29sZWFuPX0gb3B0X25vZHJhdyBXaGV0aGVyIHRvIHJlZHJhdyB0aGUgY2x1c3RlcnMuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuYWRkTWFya2VycyA9IGZ1bmN0aW9uKG1hcmtlcnMsIG9wdF9ub2RyYXcpIHtcbiAgZm9yICh2YXIgaSA9IDAsIG1hcmtlcjsgbWFya2VyID0gbWFya2Vyc1tpXTsgaSsrKSB7XG4gICAgdGhpcy5wdXNoTWFya2VyVG9fKG1hcmtlcik7XG4gIH1cbiAgaWYgKCFvcHRfbm9kcmF3KSB7XG4gICAgdGhpcy5yZWRyYXcoKTtcbiAgfVxufTtcblxuXG4vKipcbiAqIFB1c2hlcyBhIG1hcmtlciB0byB0aGUgY2x1c3RlcmVyLlxuICpcbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTWFya2VyfSBtYXJrZXIgVGhlIG1hcmtlciB0byBhZGQuXG4gKiBAcHJpdmF0ZVxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnB1c2hNYXJrZXJUb18gPSBmdW5jdGlvbihtYXJrZXIpIHtcbiAgbWFya2VyLmlzQWRkZWQgPSBmYWxzZTtcbiAgaWYgKG1hcmtlclsnZHJhZ2dhYmxlJ10pIHtcbiAgICAvLyBJZiB0aGUgbWFya2VyIGlzIGRyYWdnYWJsZSBhZGQgYSBsaXN0ZW5lciBzbyB3ZSB1cGRhdGUgdGhlIGNsdXN0ZXJzIG9uXG4gICAgLy8gdGhlIGRyYWcgZW5kLlxuICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYXJrZXIsICdkcmFnZW5kJywgZnVuY3Rpb24oKSB7XG4gICAgICBtYXJrZXIuaXNBZGRlZCA9IGZhbHNlO1xuICAgICAgdGhhdC5yZXBhaW50KCk7XG4gICAgfSk7XG4gIH1cbiAgdGhpcy5tYXJrZXJzXy5wdXNoKG1hcmtlcik7XG59O1xuXG5cbi8qKlxuICogQWRkcyBhIG1hcmtlciB0byB0aGUgY2x1c3RlcmVyIGFuZCByZWRyYXdzIGlmIG5lZWRlZC5cbiAqXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLk1hcmtlcn0gbWFya2VyIFRoZSBtYXJrZXIgdG8gYWRkLlxuICogQHBhcmFtIHtib29sZWFuPX0gb3B0X25vZHJhdyBXaGV0aGVyIHRvIHJlZHJhdyB0aGUgY2x1c3RlcnMuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuYWRkTWFya2VyID0gZnVuY3Rpb24obWFya2VyLCBvcHRfbm9kcmF3KSB7XG4gIHRoaXMucHVzaE1hcmtlclRvXyhtYXJrZXIpO1xuICBpZiAoIW9wdF9ub2RyYXcpIHtcbiAgICB0aGlzLnJlZHJhdygpO1xuICB9XG59O1xuXG5cbi8qKlxuICogUmVtb3ZlcyBhIG1hcmtlciBhbmQgcmV0dXJucyB0cnVlIGlmIHJlbW92ZWQsIGZhbHNlIGlmIG5vdFxuICpcbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTWFya2VyfSBtYXJrZXIgVGhlIG1hcmtlciB0byByZW1vdmVcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFdoZXRoZXIgdGhlIG1hcmtlciB3YXMgcmVtb3ZlZCBvciBub3RcbiAqIEBwcml2YXRlXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUucmVtb3ZlTWFya2VyXyA9IGZ1bmN0aW9uKG1hcmtlcikge1xuICB2YXIgaW5kZXggPSAtMTtcbiAgaWYgKHRoaXMubWFya2Vyc18uaW5kZXhPZikge1xuICAgIGluZGV4ID0gdGhpcy5tYXJrZXJzXy5pbmRleE9mKG1hcmtlcik7XG4gIH0gZWxzZSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIG07IG0gPSB0aGlzLm1hcmtlcnNfW2ldOyBpKyspIHtcbiAgICAgIGlmIChtID09IG1hcmtlcikge1xuICAgICAgICBpbmRleCA9IGk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmIChpbmRleCA9PSAtMSkge1xuICAgIC8vIE1hcmtlciBpcyBub3QgaW4gb3VyIGxpc3Qgb2YgbWFya2Vycy5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBtYXJrZXIuc2V0TWFwKG51bGwpO1xuXG4gIHRoaXMubWFya2Vyc18uc3BsaWNlKGluZGV4LCAxKTtcblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cblxuLyoqXG4gKiBSZW1vdmUgYSBtYXJrZXIgZnJvbSB0aGUgY2x1c3Rlci5cbiAqXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLk1hcmtlcn0gbWFya2VyIFRoZSBtYXJrZXIgdG8gcmVtb3ZlLlxuICogQHBhcmFtIHtib29sZWFuPX0gb3B0X25vZHJhdyBPcHRpb25hbCBib29sZWFuIHRvIGZvcmNlIG5vIHJlZHJhdy5cbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdGhlIG1hcmtlciB3YXMgcmVtb3ZlZC5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5yZW1vdmVNYXJrZXIgPSBmdW5jdGlvbihtYXJrZXIsIG9wdF9ub2RyYXcpIHtcbiAgdmFyIHJlbW92ZWQgPSB0aGlzLnJlbW92ZU1hcmtlcl8obWFya2VyKTtcblxuICBpZiAoIW9wdF9ub2RyYXcgJiYgcmVtb3ZlZCkge1xuICAgIHRoaXMucmVzZXRWaWV3cG9ydCgpO1xuICAgIHRoaXMucmVkcmF3KCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSB7XG4gICByZXR1cm4gZmFsc2U7XG4gIH1cbn07XG5cblxuLyoqXG4gKiBSZW1vdmVzIGFuIGFycmF5IG9mIG1hcmtlcnMgZnJvbSB0aGUgY2x1c3Rlci5cbiAqXG4gKiBAcGFyYW0ge0FycmF5Ljxnb29nbGUubWFwcy5NYXJrZXI+fSBtYXJrZXJzIFRoZSBtYXJrZXJzIHRvIHJlbW92ZS5cbiAqIEBwYXJhbSB7Ym9vbGVhbj19IG9wdF9ub2RyYXcgT3B0aW9uYWwgYm9vbGVhbiB0byBmb3JjZSBubyByZWRyYXcuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUucmVtb3ZlTWFya2VycyA9IGZ1bmN0aW9uKG1hcmtlcnMsIG9wdF9ub2RyYXcpIHtcbiAgdmFyIHJlbW92ZWQgPSBmYWxzZTtcblxuICBmb3IgKHZhciBpID0gMCwgbWFya2VyOyBtYXJrZXIgPSBtYXJrZXJzW2ldOyBpKyspIHtcbiAgICB2YXIgciA9IHRoaXMucmVtb3ZlTWFya2VyXyhtYXJrZXIpO1xuICAgIHJlbW92ZWQgPSByZW1vdmVkIHx8IHI7XG4gIH1cblxuICBpZiAoIW9wdF9ub2RyYXcgJiYgcmVtb3ZlZCkge1xuICAgIHRoaXMucmVzZXRWaWV3cG9ydCgpO1xuICAgIHRoaXMucmVkcmF3KCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG5cblxuLyoqXG4gKiBTZXRzIHRoZSBjbHVzdGVyZXIncyByZWFkeSBzdGF0ZS5cbiAqXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHJlYWR5IFRoZSBzdGF0ZS5cbiAqIEBwcml2YXRlXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuc2V0UmVhZHlfID0gZnVuY3Rpb24ocmVhZHkpIHtcbiAgaWYgKCF0aGlzLnJlYWR5Xykge1xuICAgIHRoaXMucmVhZHlfID0gcmVhZHk7XG4gICAgdGhpcy5jcmVhdGVDbHVzdGVyc18oKTtcbiAgfVxufTtcblxuXG4vKipcbiAqIFJldHVybnMgdGhlIG51bWJlciBvZiBjbHVzdGVycyBpbiB0aGUgY2x1c3RlcmVyLlxuICpcbiAqIEByZXR1cm4ge251bWJlcn0gVGhlIG51bWJlciBvZiBjbHVzdGVycy5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRUb3RhbENsdXN0ZXJzID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmNsdXN0ZXJzXy5sZW5ndGg7XG59O1xuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgZ29vZ2xlIG1hcCB0aGF0IHRoZSBjbHVzdGVyZXIgaXMgYXNzb2NpYXRlZCB3aXRoLlxuICpcbiAqIEByZXR1cm4ge2dvb2dsZS5tYXBzLk1hcH0gVGhlIG1hcC5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRNYXAgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMubWFwXztcbn07XG5cblxuLyoqXG4gKiBTZXRzIHRoZSBnb29nbGUgbWFwIHRoYXQgdGhlIGNsdXN0ZXJlciBpcyBhc3NvY2lhdGVkIHdpdGguXG4gKlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5NYXB9IG1hcCBUaGUgbWFwLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnNldE1hcCA9IGZ1bmN0aW9uKG1hcCkge1xuICB0aGlzLm1hcF8gPSBtYXA7XG59O1xuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgc2l6ZSBvZiB0aGUgZ3JpZC5cbiAqXG4gKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSBncmlkIHNpemUuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0R3JpZFNpemUgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuZ3JpZFNpemVfO1xufTtcblxuXG4vKipcbiAqIFNldHMgdGhlIHNpemUgb2YgdGhlIGdyaWQuXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IHNpemUgVGhlIGdyaWQgc2l6ZS5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5zZXRHcmlkU2l6ZSA9IGZ1bmN0aW9uKHNpemUpIHtcbiAgdGhpcy5ncmlkU2l6ZV8gPSBzaXplO1xufTtcblxuXG4vKipcbiAqIFJldHVybnMgdGhlIG1pbiBjbHVzdGVyIHNpemUuXG4gKlxuICogQHJldHVybiB7bnVtYmVyfSBUaGUgZ3JpZCBzaXplLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldE1pbkNsdXN0ZXJTaXplID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLm1pbkNsdXN0ZXJTaXplXztcbn07XG5cbi8qKlxuICogU2V0cyB0aGUgbWluIGNsdXN0ZXIgc2l6ZS5cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gc2l6ZSBUaGUgZ3JpZCBzaXplLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnNldE1pbkNsdXN0ZXJTaXplID0gZnVuY3Rpb24oc2l6ZSkge1xuICB0aGlzLm1pbkNsdXN0ZXJTaXplXyA9IHNpemU7XG59O1xuXG5cbi8qKlxuICogRXh0ZW5kcyBhIGJvdW5kcyBvYmplY3QgYnkgdGhlIGdyaWQgc2l6ZS5cbiAqXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLkxhdExuZ0JvdW5kc30gYm91bmRzIFRoZSBib3VuZHMgdG8gZXh0ZW5kLlxuICogQHJldHVybiB7Z29vZ2xlLm1hcHMuTGF0TG5nQm91bmRzfSBUaGUgZXh0ZW5kZWQgYm91bmRzLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldEV4dGVuZGVkQm91bmRzID0gZnVuY3Rpb24oYm91bmRzKSB7XG4gIHZhciBwcm9qZWN0aW9uID0gdGhpcy5nZXRQcm9qZWN0aW9uKCk7XG5cbiAgLy8gVHVybiB0aGUgYm91bmRzIGludG8gbGF0bG5nLlxuICB2YXIgdHIgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKGJvdW5kcy5nZXROb3J0aEVhc3QoKS5sYXQoKSxcbiAgICAgIGJvdW5kcy5nZXROb3J0aEVhc3QoKS5sbmcoKSk7XG4gIHZhciBibCA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoYm91bmRzLmdldFNvdXRoV2VzdCgpLmxhdCgpLFxuICAgICAgYm91bmRzLmdldFNvdXRoV2VzdCgpLmxuZygpKTtcblxuICAvLyBDb252ZXJ0IHRoZSBwb2ludHMgdG8gcGl4ZWxzIGFuZCB0aGUgZXh0ZW5kIG91dCBieSB0aGUgZ3JpZCBzaXplLlxuICB2YXIgdHJQaXggPSBwcm9qZWN0aW9uLmZyb21MYXRMbmdUb0RpdlBpeGVsKHRyKTtcbiAgdHJQaXgueCArPSB0aGlzLmdyaWRTaXplXztcbiAgdHJQaXgueSAtPSB0aGlzLmdyaWRTaXplXztcblxuICB2YXIgYmxQaXggPSBwcm9qZWN0aW9uLmZyb21MYXRMbmdUb0RpdlBpeGVsKGJsKTtcbiAgYmxQaXgueCAtPSB0aGlzLmdyaWRTaXplXztcbiAgYmxQaXgueSArPSB0aGlzLmdyaWRTaXplXztcblxuICAvLyBDb252ZXJ0IHRoZSBwaXhlbCBwb2ludHMgYmFjayB0byBMYXRMbmdcbiAgdmFyIG5lID0gcHJvamVjdGlvbi5mcm9tRGl2UGl4ZWxUb0xhdExuZyh0clBpeCk7XG4gIHZhciBzdyA9IHByb2plY3Rpb24uZnJvbURpdlBpeGVsVG9MYXRMbmcoYmxQaXgpO1xuXG4gIC8vIEV4dGVuZCB0aGUgYm91bmRzIHRvIGNvbnRhaW4gdGhlIG5ldyBib3VuZHMuXG4gIGJvdW5kcy5leHRlbmQobmUpO1xuICBib3VuZHMuZXh0ZW5kKHN3KTtcblxuICByZXR1cm4gYm91bmRzO1xufTtcblxuXG4vKipcbiAqIERldGVybWlucyBpZiBhIG1hcmtlciBpcyBjb250YWluZWQgaW4gYSBib3VuZHMuXG4gKlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5NYXJrZXJ9IG1hcmtlciBUaGUgbWFya2VyIHRvIGNoZWNrLlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5MYXRMbmdCb3VuZHN9IGJvdW5kcyBUaGUgYm91bmRzIHRvIGNoZWNrIGFnYWluc3QuXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIHRoZSBtYXJrZXIgaXMgaW4gdGhlIGJvdW5kcy5cbiAqIEBwcml2YXRlXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuaXNNYXJrZXJJbkJvdW5kc18gPSBmdW5jdGlvbihtYXJrZXIsIGJvdW5kcykge1xuICByZXR1cm4gYm91bmRzLmNvbnRhaW5zKG1hcmtlci5nZXRQb3NpdGlvbigpKTtcbn07XG5cblxuLyoqXG4gKiBDbGVhcnMgYWxsIGNsdXN0ZXJzIGFuZCBtYXJrZXJzIGZyb20gdGhlIGNsdXN0ZXJlci5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5jbGVhck1hcmtlcnMgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5yZXNldFZpZXdwb3J0KHRydWUpO1xuXG4gIC8vIFNldCB0aGUgbWFya2VycyBhIGVtcHR5IGFycmF5LlxuICB0aGlzLm1hcmtlcnNfID0gW107XG59O1xuXG5cbi8qKlxuICogQ2xlYXJzIGFsbCBleGlzdGluZyBjbHVzdGVycyBhbmQgcmVjcmVhdGVzIHRoZW0uXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdF9oaWRlIFRvIGFsc28gaGlkZSB0aGUgbWFya2VyLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnJlc2V0Vmlld3BvcnQgPSBmdW5jdGlvbihvcHRfaGlkZSkge1xuICAvLyBSZW1vdmUgYWxsIHRoZSBjbHVzdGVyc1xuICBmb3IgKHZhciBpID0gMCwgY2x1c3RlcjsgY2x1c3RlciA9IHRoaXMuY2x1c3RlcnNfW2ldOyBpKyspIHtcbiAgICBjbHVzdGVyLnJlbW92ZSgpO1xuICB9XG5cbiAgLy8gUmVzZXQgdGhlIG1hcmtlcnMgdG8gbm90IGJlIGFkZGVkIGFuZCB0byBiZSBpbnZpc2libGUuXG4gIGZvciAodmFyIGkgPSAwLCBtYXJrZXI7IG1hcmtlciA9IHRoaXMubWFya2Vyc19baV07IGkrKykge1xuICAgIG1hcmtlci5pc0FkZGVkID0gZmFsc2U7XG4gICAgaWYgKG9wdF9oaWRlKSB7XG4gICAgICBtYXJrZXIuc2V0TWFwKG51bGwpO1xuICAgIH1cbiAgfVxuXG4gIHRoaXMuY2x1c3RlcnNfID0gW107XG59O1xuXG4vKipcbiAqXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUucmVwYWludCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgb2xkQ2x1c3RlcnMgPSB0aGlzLmNsdXN0ZXJzXy5zbGljZSgpO1xuICB0aGlzLmNsdXN0ZXJzXy5sZW5ndGggPSAwO1xuICB0aGlzLnJlc2V0Vmlld3BvcnQoKTtcbiAgdGhpcy5yZWRyYXcoKTtcblxuICAvLyBSZW1vdmUgdGhlIG9sZCBjbHVzdGVycy5cbiAgLy8gRG8gaXQgaW4gYSB0aW1lb3V0IHNvIHRoZSBvdGhlciBjbHVzdGVycyBoYXZlIGJlZW4gZHJhd24gZmlyc3QuXG4gIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgIGZvciAodmFyIGkgPSAwLCBjbHVzdGVyOyBjbHVzdGVyID0gb2xkQ2x1c3RlcnNbaV07IGkrKykge1xuICAgICAgY2x1c3Rlci5yZW1vdmUoKTtcbiAgICB9XG4gIH0sIDApO1xufTtcblxuXG4vKipcbiAqIFJlZHJhd3MgdGhlIGNsdXN0ZXJzLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnJlZHJhdyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmNyZWF0ZUNsdXN0ZXJzXygpO1xufTtcblxuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGRpc3RhbmNlIGJldHdlZW4gdHdvIGxhdGxuZyBsb2NhdGlvbnMgaW4ga20uXG4gKiBAc2VlIGh0dHA6Ly93d3cubW92YWJsZS10eXBlLmNvLnVrL3NjcmlwdHMvbGF0bG9uZy5odG1sXG4gKlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5MYXRMbmd9IHAxIFRoZSBmaXJzdCBsYXQgbG5nIHBvaW50LlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5MYXRMbmd9IHAyIFRoZSBzZWNvbmQgbGF0IGxuZyBwb2ludC5cbiAqIEByZXR1cm4ge251bWJlcn0gVGhlIGRpc3RhbmNlIGJldHdlZW4gdGhlIHR3byBwb2ludHMgaW4ga20uXG4gKiBAcHJpdmF0ZVxuKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZGlzdGFuY2VCZXR3ZWVuUG9pbnRzXyA9IGZ1bmN0aW9uKHAxLCBwMikge1xuICBpZiAoIXAxIHx8ICFwMikge1xuICAgIHJldHVybiAwO1xuICB9XG5cbiAgdmFyIFIgPSA2MzcxOyAvLyBSYWRpdXMgb2YgdGhlIEVhcnRoIGluIGttXG4gIHZhciBkTGF0ID0gKHAyLmxhdCgpIC0gcDEubGF0KCkpICogTWF0aC5QSSAvIDE4MDtcbiAgdmFyIGRMb24gPSAocDIubG5nKCkgLSBwMS5sbmcoKSkgKiBNYXRoLlBJIC8gMTgwO1xuICB2YXIgYSA9IE1hdGguc2luKGRMYXQgLyAyKSAqIE1hdGguc2luKGRMYXQgLyAyKSArXG4gICAgTWF0aC5jb3MocDEubGF0KCkgKiBNYXRoLlBJIC8gMTgwKSAqIE1hdGguY29zKHAyLmxhdCgpICogTWF0aC5QSSAvIDE4MCkgKlxuICAgIE1hdGguc2luKGRMb24gLyAyKSAqIE1hdGguc2luKGRMb24gLyAyKTtcbiAgdmFyIGMgPSAyICogTWF0aC5hdGFuMihNYXRoLnNxcnQoYSksIE1hdGguc3FydCgxIC0gYSkpO1xuICB2YXIgZCA9IFIgKiBjO1xuICByZXR1cm4gZDtcbn07XG5cblxuLyoqXG4gKiBBZGQgYSBtYXJrZXIgdG8gYSBjbHVzdGVyLCBvciBjcmVhdGVzIGEgbmV3IGNsdXN0ZXIuXG4gKlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5NYXJrZXJ9IG1hcmtlciBUaGUgbWFya2VyIHRvIGFkZC5cbiAqIEBwcml2YXRlXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuYWRkVG9DbG9zZXN0Q2x1c3Rlcl8gPSBmdW5jdGlvbihtYXJrZXIpIHtcbiAgdmFyIGRpc3RhbmNlID0gNDAwMDA7IC8vIFNvbWUgbGFyZ2UgbnVtYmVyXG4gIHZhciBjbHVzdGVyVG9BZGRUbyA9IG51bGw7XG4gIHZhciBwb3MgPSBtYXJrZXIuZ2V0UG9zaXRpb24oKTtcbiAgZm9yICh2YXIgaSA9IDAsIGNsdXN0ZXI7IGNsdXN0ZXIgPSB0aGlzLmNsdXN0ZXJzX1tpXTsgaSsrKSB7XG4gICAgdmFyIGNlbnRlciA9IGNsdXN0ZXIuZ2V0Q2VudGVyKCk7XG4gICAgaWYgKGNlbnRlcikge1xuICAgICAgdmFyIGQgPSB0aGlzLmRpc3RhbmNlQmV0d2VlblBvaW50c18oY2VudGVyLCBtYXJrZXIuZ2V0UG9zaXRpb24oKSk7XG4gICAgICBpZiAoZCA8IGRpc3RhbmNlKSB7XG4gICAgICAgIGRpc3RhbmNlID0gZDtcbiAgICAgICAgY2x1c3RlclRvQWRkVG8gPSBjbHVzdGVyO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmIChjbHVzdGVyVG9BZGRUbyAmJiBjbHVzdGVyVG9BZGRUby5pc01hcmtlckluQ2x1c3RlckJvdW5kcyhtYXJrZXIpKSB7XG4gICAgY2x1c3RlclRvQWRkVG8uYWRkTWFya2VyKG1hcmtlcik7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGNsdXN0ZXIgPSBuZXcgQ2x1c3Rlcih0aGlzKTtcbiAgICBjbHVzdGVyLmFkZE1hcmtlcihtYXJrZXIpO1xuICAgIHRoaXMuY2x1c3RlcnNfLnB1c2goY2x1c3Rlcik7XG4gIH1cbn07XG5cblxuLyoqXG4gKiBDcmVhdGVzIHRoZSBjbHVzdGVycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmNyZWF0ZUNsdXN0ZXJzXyA9IGZ1bmN0aW9uKCkge1xuICBpZiAoIXRoaXMucmVhZHlfKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gR2V0IG91ciBjdXJyZW50IG1hcCB2aWV3IGJvdW5kcy5cbiAgLy8gQ3JlYXRlIGEgbmV3IGJvdW5kcyBvYmplY3Qgc28gd2UgZG9uJ3QgYWZmZWN0IHRoZSBtYXAuXG4gIHZhciBtYXBCb3VuZHMgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nQm91bmRzKHRoaXMubWFwXy5nZXRCb3VuZHMoKS5nZXRTb3V0aFdlc3QoKSxcbiAgICAgIHRoaXMubWFwXy5nZXRCb3VuZHMoKS5nZXROb3J0aEVhc3QoKSk7XG4gIHZhciBib3VuZHMgPSB0aGlzLmdldEV4dGVuZGVkQm91bmRzKG1hcEJvdW5kcyk7XG5cbiAgZm9yICh2YXIgaSA9IDAsIG1hcmtlcjsgbWFya2VyID0gdGhpcy5tYXJrZXJzX1tpXTsgaSsrKSB7XG4gICAgaWYgKCFtYXJrZXIuaXNBZGRlZCAmJiB0aGlzLmlzTWFya2VySW5Cb3VuZHNfKG1hcmtlciwgYm91bmRzKSkge1xuICAgICAgdGhpcy5hZGRUb0Nsb3Nlc3RDbHVzdGVyXyhtYXJrZXIpO1xuICAgIH1cbiAgfVxufTtcblxuXG4vKipcbiAqIEEgY2x1c3RlciB0aGF0IGNvbnRhaW5zIG1hcmtlcnMuXG4gKlxuICogQHBhcmFtIHtNYXJrZXJDbHVzdGVyZXJ9IG1hcmtlckNsdXN0ZXJlciBUaGUgbWFya2VyY2x1c3RlcmVyIHRoYXQgdGhpc1xuICogICAgIGNsdXN0ZXIgaXMgYXNzb2NpYXRlZCB3aXRoLlxuICogQGNvbnN0cnVjdG9yXG4gKiBAaWdub3JlXG4gKi9cbmZ1bmN0aW9uIENsdXN0ZXIobWFya2VyQ2x1c3RlcmVyKSB7XG4gIHRoaXMubWFya2VyQ2x1c3RlcmVyXyA9IG1hcmtlckNsdXN0ZXJlcjtcbiAgdGhpcy5tYXBfID0gbWFya2VyQ2x1c3RlcmVyLmdldE1hcCgpO1xuICB0aGlzLmdyaWRTaXplXyA9IG1hcmtlckNsdXN0ZXJlci5nZXRHcmlkU2l6ZSgpO1xuICB0aGlzLm1pbkNsdXN0ZXJTaXplXyA9IG1hcmtlckNsdXN0ZXJlci5nZXRNaW5DbHVzdGVyU2l6ZSgpO1xuICB0aGlzLmF2ZXJhZ2VDZW50ZXJfID0gbWFya2VyQ2x1c3RlcmVyLmlzQXZlcmFnZUNlbnRlcigpO1xuICB0aGlzLmNlbnRlcl8gPSBudWxsO1xuICB0aGlzLm1hcmtlcnNfID0gW107XG4gIHRoaXMuYm91bmRzXyA9IG51bGw7XG4gIHRoaXMuY2x1c3Rlckljb25fID0gbmV3IENsdXN0ZXJJY29uKHRoaXMsIG1hcmtlckNsdXN0ZXJlci5nZXRTdHlsZXMoKSxcbiAgICAgIG1hcmtlckNsdXN0ZXJlci5nZXRHcmlkU2l6ZSgpKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbnMgaWYgYSBtYXJrZXIgaXMgYWxyZWFkeSBhZGRlZCB0byB0aGUgY2x1c3Rlci5cbiAqXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLk1hcmtlcn0gbWFya2VyIFRoZSBtYXJrZXIgdG8gY2hlY2suXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIHRoZSBtYXJrZXIgaXMgYWxyZWFkeSBhZGRlZC5cbiAqL1xuQ2x1c3Rlci5wcm90b3R5cGUuaXNNYXJrZXJBbHJlYWR5QWRkZWQgPSBmdW5jdGlvbihtYXJrZXIpIHtcbiAgaWYgKHRoaXMubWFya2Vyc18uaW5kZXhPZikge1xuICAgIHJldHVybiB0aGlzLm1hcmtlcnNfLmluZGV4T2YobWFya2VyKSAhPSAtMTtcbiAgfSBlbHNlIHtcbiAgICBmb3IgKHZhciBpID0gMCwgbTsgbSA9IHRoaXMubWFya2Vyc19baV07IGkrKykge1xuICAgICAgaWYgKG0gPT0gbWFya2VyKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59O1xuXG5cbi8qKlxuICogQWRkIGEgbWFya2VyIHRoZSBjbHVzdGVyLlxuICpcbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTWFya2VyfSBtYXJrZXIgVGhlIG1hcmtlciB0byBhZGQuXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIHRoZSBtYXJrZXIgd2FzIGFkZGVkLlxuICovXG5DbHVzdGVyLnByb3RvdHlwZS5hZGRNYXJrZXIgPSBmdW5jdGlvbihtYXJrZXIpIHtcbiAgaWYgKHRoaXMuaXNNYXJrZXJBbHJlYWR5QWRkZWQobWFya2VyKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmICghdGhpcy5jZW50ZXJfKSB7XG4gICAgdGhpcy5jZW50ZXJfID0gbWFya2VyLmdldFBvc2l0aW9uKCk7XG4gICAgdGhpcy5jYWxjdWxhdGVCb3VuZHNfKCk7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHRoaXMuYXZlcmFnZUNlbnRlcl8pIHtcbiAgICAgIHZhciBsID0gdGhpcy5tYXJrZXJzXy5sZW5ndGggKyAxO1xuICAgICAgdmFyIGxhdCA9ICh0aGlzLmNlbnRlcl8ubGF0KCkgKiAobC0xKSArIG1hcmtlci5nZXRQb3NpdGlvbigpLmxhdCgpKSAvIGw7XG4gICAgICB2YXIgbG5nID0gKHRoaXMuY2VudGVyXy5sbmcoKSAqIChsLTEpICsgbWFya2VyLmdldFBvc2l0aW9uKCkubG5nKCkpIC8gbDtcbiAgICAgIHRoaXMuY2VudGVyXyA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmcobGF0LCBsbmcpO1xuICAgICAgdGhpcy5jYWxjdWxhdGVCb3VuZHNfKCk7XG4gICAgfVxuICB9XG5cbiAgbWFya2VyLmlzQWRkZWQgPSB0cnVlO1xuICB0aGlzLm1hcmtlcnNfLnB1c2gobWFya2VyKTtcblxuICB2YXIgbGVuID0gdGhpcy5tYXJrZXJzXy5sZW5ndGg7XG4gIGlmIChsZW4gPCB0aGlzLm1pbkNsdXN0ZXJTaXplXyAmJiBtYXJrZXIuZ2V0TWFwKCkgIT0gdGhpcy5tYXBfKSB7XG4gICAgLy8gTWluIGNsdXN0ZXIgc2l6ZSBub3QgcmVhY2hlZCBzbyBzaG93IHRoZSBtYXJrZXIuXG4gICAgbWFya2VyLnNldE1hcCh0aGlzLm1hcF8pO1xuICB9XG5cbiAgaWYgKGxlbiA9PSB0aGlzLm1pbkNsdXN0ZXJTaXplXykge1xuICAgIC8vIEhpZGUgdGhlIG1hcmtlcnMgdGhhdCB3ZXJlIHNob3dpbmcuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgdGhpcy5tYXJrZXJzX1tpXS5zZXRNYXAobnVsbCk7XG4gICAgfVxuICB9XG5cbiAgaWYgKGxlbiA+PSB0aGlzLm1pbkNsdXN0ZXJTaXplXykge1xuICAgIG1hcmtlci5zZXRNYXAobnVsbCk7XG4gIH1cblxuICB0aGlzLnVwZGF0ZUljb24oKTtcbiAgcmV0dXJuIHRydWU7XG59O1xuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgbWFya2VyIGNsdXN0ZXJlciB0aGF0IHRoZSBjbHVzdGVyIGlzIGFzc29jaWF0ZWQgd2l0aC5cbiAqXG4gKiBAcmV0dXJuIHtNYXJrZXJDbHVzdGVyZXJ9IFRoZSBhc3NvY2lhdGVkIG1hcmtlciBjbHVzdGVyZXIuXG4gKi9cbkNsdXN0ZXIucHJvdG90eXBlLmdldE1hcmtlckNsdXN0ZXJlciA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5tYXJrZXJDbHVzdGVyZXJfO1xufTtcblxuXG4vKipcbiAqIFJldHVybnMgdGhlIGJvdW5kcyBvZiB0aGUgY2x1c3Rlci5cbiAqXG4gKiBAcmV0dXJuIHtnb29nbGUubWFwcy5MYXRMbmdCb3VuZHN9IHRoZSBjbHVzdGVyIGJvdW5kcy5cbiAqL1xuQ2x1c3Rlci5wcm90b3R5cGUuZ2V0Qm91bmRzID0gZnVuY3Rpb24oKSB7XG4gIHZhciBib3VuZHMgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nQm91bmRzKHRoaXMuY2VudGVyXywgdGhpcy5jZW50ZXJfKTtcbiAgdmFyIG1hcmtlcnMgPSB0aGlzLmdldE1hcmtlcnMoKTtcbiAgZm9yICh2YXIgaSA9IDAsIG1hcmtlcjsgbWFya2VyID0gbWFya2Vyc1tpXTsgaSsrKSB7XG4gICAgYm91bmRzLmV4dGVuZChtYXJrZXIuZ2V0UG9zaXRpb24oKSk7XG4gIH1cbiAgcmV0dXJuIGJvdW5kcztcbn07XG5cblxuLyoqXG4gKiBSZW1vdmVzIHRoZSBjbHVzdGVyXG4gKi9cbkNsdXN0ZXIucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmNsdXN0ZXJJY29uXy5yZW1vdmUoKTtcbiAgdGhpcy5tYXJrZXJzXy5sZW5ndGggPSAwO1xuICBkZWxldGUgdGhpcy5tYXJrZXJzXztcbn07XG5cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBjZW50ZXIgb2YgdGhlIGNsdXN0ZXIuXG4gKlxuICogQHJldHVybiB7bnVtYmVyfSBUaGUgY2x1c3RlciBjZW50ZXIuXG4gKi9cbkNsdXN0ZXIucHJvdG90eXBlLmdldFNpemUgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMubWFya2Vyc18ubGVuZ3RoO1xufTtcblxuXG4vKipcbiAqIFJldHVybnMgdGhlIGNlbnRlciBvZiB0aGUgY2x1c3Rlci5cbiAqXG4gKiBAcmV0dXJuIHtBcnJheS48Z29vZ2xlLm1hcHMuTWFya2VyPn0gVGhlIGNsdXN0ZXIgY2VudGVyLlxuICovXG5DbHVzdGVyLnByb3RvdHlwZS5nZXRNYXJrZXJzID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLm1hcmtlcnNfO1xufTtcblxuXG4vKipcbiAqIFJldHVybnMgdGhlIGNlbnRlciBvZiB0aGUgY2x1c3Rlci5cbiAqXG4gKiBAcmV0dXJuIHtnb29nbGUubWFwcy5MYXRMbmd9IFRoZSBjbHVzdGVyIGNlbnRlci5cbiAqL1xuQ2x1c3Rlci5wcm90b3R5cGUuZ2V0Q2VudGVyID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmNlbnRlcl87XG59O1xuXG5cbi8qKlxuICogQ2FsY3VsYXRlZCB0aGUgZXh0ZW5kZWQgYm91bmRzIG9mIHRoZSBjbHVzdGVyIHdpdGggdGhlIGdyaWQuXG4gKlxuICogQHByaXZhdGVcbiAqL1xuQ2x1c3Rlci5wcm90b3R5cGUuY2FsY3VsYXRlQm91bmRzXyA9IGZ1bmN0aW9uKCkge1xuICB2YXIgYm91bmRzID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZ0JvdW5kcyh0aGlzLmNlbnRlcl8sIHRoaXMuY2VudGVyXyk7XG4gIHRoaXMuYm91bmRzXyA9IHRoaXMubWFya2VyQ2x1c3RlcmVyXy5nZXRFeHRlbmRlZEJvdW5kcyhib3VuZHMpO1xufTtcblxuXG4vKipcbiAqIERldGVybWluZXMgaWYgYSBtYXJrZXIgbGllcyBpbiB0aGUgY2x1c3RlcnMgYm91bmRzLlxuICpcbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTWFya2VyfSBtYXJrZXIgVGhlIG1hcmtlciB0byBjaGVjay5cbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdGhlIG1hcmtlciBsaWVzIGluIHRoZSBib3VuZHMuXG4gKi9cbkNsdXN0ZXIucHJvdG90eXBlLmlzTWFya2VySW5DbHVzdGVyQm91bmRzID0gZnVuY3Rpb24obWFya2VyKSB7XG4gIHJldHVybiB0aGlzLmJvdW5kc18uY29udGFpbnMobWFya2VyLmdldFBvc2l0aW9uKCkpO1xufTtcblxuXG4vKipcbiAqIFJldHVybnMgdGhlIG1hcCB0aGF0IHRoZSBjbHVzdGVyIGlzIGFzc29jaWF0ZWQgd2l0aC5cbiAqXG4gKiBAcmV0dXJuIHtnb29nbGUubWFwcy5NYXB9IFRoZSBtYXAuXG4gKi9cbkNsdXN0ZXIucHJvdG90eXBlLmdldE1hcCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5tYXBfO1xufTtcblxuXG4vKipcbiAqIFVwZGF0ZXMgdGhlIGNsdXN0ZXIgaWNvblxuICovXG5DbHVzdGVyLnByb3RvdHlwZS51cGRhdGVJY29uID0gZnVuY3Rpb24oKSB7XG4gIHZhciB6b29tID0gdGhpcy5tYXBfLmdldFpvb20oKTtcbiAgdmFyIG16ID0gdGhpcy5tYXJrZXJDbHVzdGVyZXJfLmdldE1heFpvb20oKTtcblxuICBpZiAobXogJiYgem9vbSA+IG16KSB7XG4gICAgLy8gVGhlIHpvb20gaXMgZ3JlYXRlciB0aGFuIG91ciBtYXggem9vbSBzbyBzaG93IGFsbCB0aGUgbWFya2VycyBpbiBjbHVzdGVyLlxuICAgIGZvciAodmFyIGkgPSAwLCBtYXJrZXI7IG1hcmtlciA9IHRoaXMubWFya2Vyc19baV07IGkrKykge1xuICAgICAgbWFya2VyLnNldE1hcCh0aGlzLm1hcF8pO1xuICAgIH1cbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAodGhpcy5tYXJrZXJzXy5sZW5ndGggPCB0aGlzLm1pbkNsdXN0ZXJTaXplXykge1xuICAgIC8vIE1pbiBjbHVzdGVyIHNpemUgbm90IHlldCByZWFjaGVkLlxuICAgIHRoaXMuY2x1c3Rlckljb25fLmhpZGUoKTtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgbnVtU3R5bGVzID0gdGhpcy5tYXJrZXJDbHVzdGVyZXJfLmdldFN0eWxlcygpLmxlbmd0aDtcbiAgdmFyIHN1bXMgPSB0aGlzLm1hcmtlckNsdXN0ZXJlcl8uZ2V0Q2FsY3VsYXRvcigpKHRoaXMubWFya2Vyc18sIG51bVN0eWxlcyk7XG4gIHRoaXMuY2x1c3Rlckljb25fLnNldENlbnRlcih0aGlzLmNlbnRlcl8pO1xuICB0aGlzLmNsdXN0ZXJJY29uXy5zZXRTdW1zKHN1bXMpO1xuICB0aGlzLmNsdXN0ZXJJY29uXy5zaG93KCk7XG59O1xuXG5cbi8qKlxuICogQSBjbHVzdGVyIGljb25cbiAqXG4gKiBAcGFyYW0ge0NsdXN0ZXJ9IGNsdXN0ZXIgVGhlIGNsdXN0ZXIgdG8gYmUgYXNzb2NpYXRlZCB3aXRoLlxuICogQHBhcmFtIHtPYmplY3R9IHN0eWxlcyBBbiBvYmplY3QgdGhhdCBoYXMgc3R5bGUgcHJvcGVydGllczpcbiAqICAgICAndXJsJzogKHN0cmluZykgVGhlIGltYWdlIHVybC5cbiAqICAgICAnaGVpZ2h0JzogKG51bWJlcikgVGhlIGltYWdlIGhlaWdodC5cbiAqICAgICAnd2lkdGgnOiAobnVtYmVyKSBUaGUgaW1hZ2Ugd2lkdGguXG4gKiAgICAgJ2FuY2hvcic6IChBcnJheSkgVGhlIGFuY2hvciBwb3NpdGlvbiBvZiB0aGUgbGFiZWwgdGV4dC5cbiAqICAgICAndGV4dENvbG9yJzogKHN0cmluZykgVGhlIHRleHQgY29sb3IuXG4gKiAgICAgJ3RleHRTaXplJzogKG51bWJlcikgVGhlIHRleHQgc2l6ZS5cbiAqICAgICAgJ2ZvbnRGYW1pbHknOiAoc3RyaW5nKSBUaGUgZm9udCBmYW1pbHkuXG4gKiAgICAgICdmb250V2VpZ2h0JzogKHN0cmluZykgVGhlIGZvbnQgd2VpZ2h0LlxuICogICAgICdiYWNrZ3JvdW5kUG9zaXRpb246IChzdHJpbmcpIFRoZSBiYWNrZ3JvdW5kIHBvc3RpdGlvbiB4LCB5LlxuICogQHBhcmFtIHtudW1iZXI9fSBvcHRfcGFkZGluZyBPcHRpb25hbCBwYWRkaW5nIHRvIGFwcGx5IHRvIHRoZSBjbHVzdGVyIGljb24uXG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlbmRzIGdvb2dsZS5tYXBzLk92ZXJsYXlWaWV3XG4gKiBAaWdub3JlXG4gKi9cbmZ1bmN0aW9uIENsdXN0ZXJJY29uKGNsdXN0ZXIsIHN0eWxlcywgb3B0X3BhZGRpbmcpIHtcbiAgY2x1c3Rlci5nZXRNYXJrZXJDbHVzdGVyZXIoKS5leHRlbmQoQ2x1c3Rlckljb24sIGdvb2dsZS5tYXBzLk92ZXJsYXlWaWV3KTtcblxuICB0aGlzLnN0eWxlc18gPSBzdHlsZXM7XG4gIHRoaXMucGFkZGluZ18gPSBvcHRfcGFkZGluZyB8fCAwO1xuICB0aGlzLmNsdXN0ZXJfID0gY2x1c3RlcjtcbiAgdGhpcy5jZW50ZXJfID0gbnVsbDtcbiAgdGhpcy5tYXBfID0gY2x1c3Rlci5nZXRNYXAoKTtcbiAgdGhpcy5kaXZfID0gbnVsbDtcbiAgdGhpcy5zdW1zXyA9IG51bGw7XG4gIHRoaXMudmlzaWJsZV8gPSBmYWxzZTtcblxuICB0aGlzLnNldE1hcCh0aGlzLm1hcF8pO1xufVxuXG5cbi8qKlxuICogVHJpZ2dlcnMgdGhlIGNsdXN0ZXJjbGljayBldmVudCBhbmQgem9vbSdzIGlmIHRoZSBvcHRpb24gaXMgc2V0LlxuICovXG5DbHVzdGVySWNvbi5wcm90b3R5cGUudHJpZ2dlckNsdXN0ZXJDbGljayA9IGZ1bmN0aW9uKCkge1xuICB2YXIgbWFya2VyQ2x1c3RlcmVyID0gdGhpcy5jbHVzdGVyXy5nZXRNYXJrZXJDbHVzdGVyZXIoKTtcblxuICAvLyBUcmlnZ2VyIHRoZSBjbHVzdGVyY2xpY2sgZXZlbnQuXG4gIGdvb2dsZS5tYXBzLmV2ZW50LnRyaWdnZXIobWFya2VyQ2x1c3RlcmVyLCAnY2x1c3RlcmNsaWNrJywgdGhpcy5jbHVzdGVyXyk7XG5cbiAgaWYgKG1hcmtlckNsdXN0ZXJlci5pc1pvb21PbkNsaWNrKCkpIHtcbiAgICAvLyBab29tIGludG8gdGhlIGNsdXN0ZXIuXG4gICAgdGhpcy5tYXBfLmZpdEJvdW5kcyh0aGlzLmNsdXN0ZXJfLmdldEJvdW5kcygpKTtcbiAgfVxufTtcblxuXG4vKipcbiAqIEFkZGluZyB0aGUgY2x1c3RlciBpY29uIHRvIHRoZSBkb20uXG4gKiBAaWdub3JlXG4gKi9cbkNsdXN0ZXJJY29uLnByb3RvdHlwZS5vbkFkZCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmRpdl8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcbiAgaWYgKHRoaXMudmlzaWJsZV8pIHtcbiAgICB2YXIgcG9zID0gdGhpcy5nZXRQb3NGcm9tTGF0TG5nXyh0aGlzLmNlbnRlcl8pO1xuICAgIHRoaXMuZGl2Xy5zdHlsZS5jc3NUZXh0ID0gdGhpcy5jcmVhdGVDc3MocG9zKTtcbiAgICB0aGlzLmRpdl8uaW5uZXJIVE1MID0gdGhpcy5zdW1zXy50ZXh0O1xuICB9XG5cbiAgdmFyIHBhbmVzID0gdGhpcy5nZXRQYW5lcygpO1xuICBwYW5lcy5vdmVybGF5TW91c2VUYXJnZXQuYXBwZW5kQ2hpbGQodGhpcy5kaXZfKTtcblxuICB2YXIgdGhhdCA9IHRoaXM7XG4gIGdvb2dsZS5tYXBzLmV2ZW50LmFkZERvbUxpc3RlbmVyKHRoaXMuZGl2XywgJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgdGhhdC50cmlnZ2VyQ2x1c3RlckNsaWNrKCk7XG4gIH0pO1xufTtcblxuXG4vKipcbiAqIFJldHVybnMgdGhlIHBvc2l0aW9uIHRvIHBsYWNlIHRoZSBkaXYgZGVuZGluZyBvbiB0aGUgbGF0bG5nLlxuICpcbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTGF0TG5nfSBsYXRsbmcgVGhlIHBvc2l0aW9uIGluIGxhdGxuZy5cbiAqIEByZXR1cm4ge2dvb2dsZS5tYXBzLlBvaW50fSBUaGUgcG9zaXRpb24gaW4gcGl4ZWxzLlxuICogQHByaXZhdGVcbiAqL1xuQ2x1c3Rlckljb24ucHJvdG90eXBlLmdldFBvc0Zyb21MYXRMbmdfID0gZnVuY3Rpb24obGF0bG5nKSB7XG4gIHZhciBwb3MgPSB0aGlzLmdldFByb2plY3Rpb24oKS5mcm9tTGF0TG5nVG9EaXZQaXhlbChsYXRsbmcpO1xuICBwb3MueCAtPSBwYXJzZUludCh0aGlzLndpZHRoXyAvIDIsIDEwKTtcbiAgcG9zLnkgLT0gcGFyc2VJbnQodGhpcy5oZWlnaHRfIC8gMiwgMTApO1xuICByZXR1cm4gcG9zO1xufTtcblxuXG4vKipcbiAqIERyYXcgdGhlIGljb24uXG4gKiBAaWdub3JlXG4gKi9cbkNsdXN0ZXJJY29uLnByb3RvdHlwZS5kcmF3ID0gZnVuY3Rpb24oKSB7XG4gIGlmICh0aGlzLnZpc2libGVfKSB7XG4gICAgdmFyIHBvcyA9IHRoaXMuZ2V0UG9zRnJvbUxhdExuZ18odGhpcy5jZW50ZXJfKTtcbiAgICB0aGlzLmRpdl8uc3R5bGUudG9wID0gcG9zLnkgKyAncHgnO1xuICAgIHRoaXMuZGl2Xy5zdHlsZS5sZWZ0ID0gcG9zLnggKyAncHgnO1xuICB9XG59O1xuXG5cbi8qKlxuICogSGlkZSB0aGUgaWNvbi5cbiAqL1xuQ2x1c3Rlckljb24ucHJvdG90eXBlLmhpZGUgPSBmdW5jdGlvbigpIHtcbiAgaWYgKHRoaXMuZGl2Xykge1xuICAgIHRoaXMuZGl2Xy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICB9XG4gIHRoaXMudmlzaWJsZV8gPSBmYWxzZTtcbn07XG5cblxuLyoqXG4gKiBQb3NpdGlvbiBhbmQgc2hvdyB0aGUgaWNvbi5cbiAqL1xuQ2x1c3Rlckljb24ucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbigpIHtcbiAgaWYgKHRoaXMuZGl2Xykge1xuICAgIHZhciBwb3MgPSB0aGlzLmdldFBvc0Zyb21MYXRMbmdfKHRoaXMuY2VudGVyXyk7XG4gICAgdGhpcy5kaXZfLnN0eWxlLmNzc1RleHQgPSB0aGlzLmNyZWF0ZUNzcyhwb3MpO1xuICAgIHRoaXMuZGl2Xy5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gIH1cbiAgdGhpcy52aXNpYmxlXyA9IHRydWU7XG59O1xuXG5cbi8qKlxuICogUmVtb3ZlIHRoZSBpY29uIGZyb20gdGhlIG1hcFxuICovXG5DbHVzdGVySWNvbi5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuc2V0TWFwKG51bGwpO1xufTtcblxuXG4vKipcbiAqIEltcGxlbWVudGF0aW9uIG9mIHRoZSBvblJlbW92ZSBpbnRlcmZhY2UuXG4gKiBAaWdub3JlXG4gKi9cbkNsdXN0ZXJJY29uLnByb3RvdHlwZS5vblJlbW92ZSA9IGZ1bmN0aW9uKCkge1xuICBpZiAodGhpcy5kaXZfICYmIHRoaXMuZGl2Xy5wYXJlbnROb2RlKSB7XG4gICAgdGhpcy5oaWRlKCk7XG4gICAgdGhpcy5kaXZfLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5kaXZfKTtcbiAgICB0aGlzLmRpdl8gPSBudWxsO1xuICB9XG59O1xuXG5cbi8qKlxuICogU2V0IHRoZSBzdW1zIG9mIHRoZSBpY29uLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdW1zIFRoZSBzdW1zIGNvbnRhaW5pbmc6XG4gKiAgICd0ZXh0JzogKHN0cmluZykgVGhlIHRleHQgdG8gZGlzcGxheSBpbiB0aGUgaWNvbi5cbiAqICAgJ2luZGV4JzogKG51bWJlcikgVGhlIHN0eWxlIGluZGV4IG9mIHRoZSBpY29uLlxuICovXG5DbHVzdGVySWNvbi5wcm90b3R5cGUuc2V0U3VtcyA9IGZ1bmN0aW9uKHN1bXMpIHtcbiAgdGhpcy5zdW1zXyA9IHN1bXM7XG4gIHRoaXMudGV4dF8gPSBzdW1zLnRleHQ7XG4gIHRoaXMuaW5kZXhfID0gc3Vtcy5pbmRleDtcbiAgaWYgKHRoaXMuZGl2Xykge1xuICAgIHRoaXMuZGl2Xy5pbm5lckhUTUwgPSBzdW1zLnRleHQ7XG4gIH1cblxuICB0aGlzLnVzZVN0eWxlKCk7XG59O1xuXG5cbi8qKlxuICogU2V0cyB0aGUgaWNvbiB0byB0aGUgdGhlIHN0eWxlcy5cbiAqL1xuQ2x1c3Rlckljb24ucHJvdG90eXBlLnVzZVN0eWxlID0gZnVuY3Rpb24oKSB7XG4gIHZhciBpbmRleCA9IE1hdGgubWF4KDAsIHRoaXMuc3Vtc18uaW5kZXggLSAxKTtcbiAgaW5kZXggPSBNYXRoLm1pbih0aGlzLnN0eWxlc18ubGVuZ3RoIC0gMSwgaW5kZXgpO1xuICB2YXIgc3R5bGUgPSB0aGlzLnN0eWxlc19baW5kZXhdO1xuICB0aGlzLnVybF8gPSBzdHlsZVsndXJsJ107XG4gIHRoaXMuaGVpZ2h0XyA9IHN0eWxlWydoZWlnaHQnXTtcbiAgdGhpcy53aWR0aF8gPSBzdHlsZVsnd2lkdGgnXTtcbiAgdGhpcy50ZXh0Q29sb3JfID0gc3R5bGVbJ3RleHRDb2xvciddO1xuICB0aGlzLmFuY2hvcl8gPSBzdHlsZVsnYW5jaG9yJ107XG4gIHRoaXMudGV4dFNpemVfID0gc3R5bGVbJ3RleHRTaXplJ107XG4gIHRoaXMuZm9udEZhbWlseV8gPSBzdHlsZVsnZm9udEZhbWlseSddO1xuICB0aGlzLmZvbnRXZWlnaHRfID0gc3R5bGVbJ2ZvbnRXZWlnaHQnXTtcbiAgdGhpcy5iYWNrZ3JvdW5kUG9zaXRpb25fID0gc3R5bGVbJ2JhY2tncm91bmRQb3NpdGlvbiddO1xufTtcblxuXG4vKipcbiAqIFNldHMgdGhlIGNlbnRlciBvZiB0aGUgaWNvbi5cbiAqXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLkxhdExuZ30gY2VudGVyIFRoZSBsYXRsbmcgdG8gc2V0IGFzIHRoZSBjZW50ZXIuXG4gKi9cbkNsdXN0ZXJJY29uLnByb3RvdHlwZS5zZXRDZW50ZXIgPSBmdW5jdGlvbihjZW50ZXIpIHtcbiAgdGhpcy5jZW50ZXJfID0gY2VudGVyO1xufTtcblxuXG4vKipcbiAqIENyZWF0ZSB0aGUgY3NzIHRleHQgYmFzZWQgb24gdGhlIHBvc2l0aW9uIG9mIHRoZSBpY29uLlxuICpcbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuUG9pbnR9IHBvcyBUaGUgcG9zaXRpb24uXG4gKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBjc3Mgc3R5bGUgdGV4dC5cbiAqL1xuQ2x1c3Rlckljb24ucHJvdG90eXBlLmNyZWF0ZUNzcyA9IGZ1bmN0aW9uKHBvcykge1xuICB2YXIgc3R5bGUgPSBbXTtcbiAgc3R5bGUucHVzaCgnYmFja2dyb3VuZC1pbWFnZTp1cmwoJyArIHRoaXMudXJsXyArICcpOycpO1xuICB2YXIgYmFja2dyb3VuZFBvc2l0aW9uID0gdGhpcy5iYWNrZ3JvdW5kUG9zaXRpb25fID8gdGhpcy5iYWNrZ3JvdW5kUG9zaXRpb25fIDogJzAgMCc7XG4gIHN0eWxlLnB1c2goJ2JhY2tncm91bmQtcG9zaXRpb246JyArIGJhY2tncm91bmRQb3NpdGlvbiArICc7Jyk7XG5cbiAgaWYgKHR5cGVvZiB0aGlzLmFuY2hvcl8gPT09ICdvYmplY3QnKSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLmFuY2hvcl9bMF0gPT09ICdudW1iZXInICYmIHRoaXMuYW5jaG9yX1swXSA+IDAgJiZcbiAgICAgICAgdGhpcy5hbmNob3JfWzBdIDwgdGhpcy5oZWlnaHRfKSB7XG4gICAgICBzdHlsZS5wdXNoKCdoZWlnaHQ6JyArICh0aGlzLmhlaWdodF8gLSB0aGlzLmFuY2hvcl9bMF0pICtcbiAgICAgICAgICAncHg7IHBhZGRpbmctdG9wOicgKyB0aGlzLmFuY2hvcl9bMF0gKyAncHg7Jyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlLnB1c2goJ2hlaWdodDonICsgdGhpcy5oZWlnaHRfICsgJ3B4OyBsaW5lLWhlaWdodDonICsgdGhpcy5oZWlnaHRfICtcbiAgICAgICAgICAncHg7Jyk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgdGhpcy5hbmNob3JfWzFdID09PSAnbnVtYmVyJyAmJiB0aGlzLmFuY2hvcl9bMV0gPiAwICYmXG4gICAgICAgIHRoaXMuYW5jaG9yX1sxXSA8IHRoaXMud2lkdGhfKSB7XG4gICAgICBzdHlsZS5wdXNoKCd3aWR0aDonICsgKHRoaXMud2lkdGhfIC0gdGhpcy5hbmNob3JfWzFdKSArXG4gICAgICAgICAgJ3B4OyBwYWRkaW5nLWxlZnQ6JyArIHRoaXMuYW5jaG9yX1sxXSArICdweDsnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3R5bGUucHVzaCgnd2lkdGg6JyArIHRoaXMud2lkdGhfICsgJ3B4OyB0ZXh0LWFsaWduOmNlbnRlcjsnKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgc3R5bGUucHVzaCgnaGVpZ2h0OicgKyB0aGlzLmhlaWdodF8gKyAncHg7IGxpbmUtaGVpZ2h0OicgK1xuICAgICAgICB0aGlzLmhlaWdodF8gKyAncHg7IHdpZHRoOicgKyB0aGlzLndpZHRoXyArICdweDsgdGV4dC1hbGlnbjpjZW50ZXI7Jyk7XG4gIH1cblxuICB2YXIgdHh0Q29sb3IgPSB0aGlzLnRleHRDb2xvcl8gPyB0aGlzLnRleHRDb2xvcl8gOiAnYmxhY2snO1xuICB2YXIgdHh0U2l6ZSA9IHRoaXMudGV4dFNpemVfID8gdGhpcy50ZXh0U2l6ZV8gOiAxMTtcbiAgdmFyIGZvbnRGYW1pbHkgPSB0aGlzLmZvbnRGYW1pbHlfID8gdGhpcy5mb250RmFtaWx5XyA6ICdBcmlhbCxzYW5zLXNlcmlmJztcbiAgdmFyIGZvbnRXZWlnaHQgPSB0aGlzLmZvbnRXZWlnaHRfID8gdGhpcy5mb250V2VpZ2h0XyA6ICc0MDAnO1xuXG4gIHN0eWxlLnB1c2goJ2N1cnNvcjpwb2ludGVyOyB0b3A6JyArIHBvcy55ICsgJ3B4OyBsZWZ0OicgK1xuICAgICAgcG9zLnggKyAncHg7IGNvbG9yOicgKyB0eHRDb2xvciArICc7IHBvc2l0aW9uOmFic29sdXRlOyBmb250LXNpemU6JyArXG4gICAgICB0eHRTaXplICsgJ3B4OyBmb250LWZhbWlseTonICsgZm9udEZhbWlseSArICc7IGZvbnQtd2VpZ2h0OicgKyBmb250V2VpZ2h0ICsgJzsnKTtcbiAgcmV0dXJuIHN0eWxlLmpvaW4oJycpO1xufTtcblxuXG4vLyBFeHBvcnQgU3ltYm9scyBmb3IgQ2xvc3VyZVxuLy8gSWYgeW91IGFyZSBub3QgZ29pbmcgdG8gY29tcGlsZSB3aXRoIGNsb3N1cmUgdGhlbiB5b3UgY2FuIHJlbW92ZSB0aGVcbi8vIGNvZGUgYmVsb3cuXG5nbG9iYWxbJ01hcmtlckNsdXN0ZXJlciddID0gTWFya2VyQ2x1c3RlcmVyO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnYWRkTWFya2VyJ10gPSBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmFkZE1hcmtlcjtcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ2FkZE1hcmtlcnMnXSA9IE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuYWRkTWFya2Vycztcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ2NsZWFyTWFya2VycyddID1cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmNsZWFyTWFya2Vycztcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ2ZpdE1hcFRvTWFya2VycyddID1cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmZpdE1hcFRvTWFya2Vycztcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ2dldENhbGN1bGF0b3InXSA9XG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRDYWxjdWxhdG9yO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnZ2V0R3JpZFNpemUnXSA9XG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRHcmlkU2l6ZTtcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ2dldEV4dGVuZGVkQm91bmRzJ10gPVxuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0RXh0ZW5kZWRCb3VuZHM7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydnZXRNYXAnXSA9IE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0TWFwO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnZ2V0TWFya2VycyddID0gTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRNYXJrZXJzO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnZ2V0TWF4Wm9vbSddID0gTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRNYXhab29tO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnZ2V0U3R5bGVzJ10gPSBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldFN0eWxlcztcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ2dldFRvdGFsQ2x1c3RlcnMnXSA9XG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRUb3RhbENsdXN0ZXJzO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnZ2V0VG90YWxNYXJrZXJzJ10gPVxuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0VG90YWxNYXJrZXJzO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsncmVkcmF3J10gPSBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnJlZHJhdztcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ3JlbW92ZU1hcmtlciddID1cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnJlbW92ZU1hcmtlcjtcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ3JlbW92ZU1hcmtlcnMnXSA9XG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5yZW1vdmVNYXJrZXJzO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsncmVzZXRWaWV3cG9ydCddID1cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnJlc2V0Vmlld3BvcnQ7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydyZXBhaW50J10gPVxuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUucmVwYWludDtcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ3NldENhbGN1bGF0b3InXSA9XG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5zZXRDYWxjdWxhdG9yO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnc2V0R3JpZFNpemUnXSA9XG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5zZXRHcmlkU2l6ZTtcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ3NldE1heFpvb20nXSA9XG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5zZXRNYXhab29tO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnb25BZGQnXSA9IE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUub25BZGQ7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydkcmF3J10gPSBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmRyYXc7XG5cbkNsdXN0ZXIucHJvdG90eXBlWydnZXRDZW50ZXInXSA9IENsdXN0ZXIucHJvdG90eXBlLmdldENlbnRlcjtcbkNsdXN0ZXIucHJvdG90eXBlWydnZXRTaXplJ10gPSBDbHVzdGVyLnByb3RvdHlwZS5nZXRTaXplO1xuQ2x1c3Rlci5wcm90b3R5cGVbJ2dldE1hcmtlcnMnXSA9IENsdXN0ZXIucHJvdG90eXBlLmdldE1hcmtlcnM7XG5cbkNsdXN0ZXJJY29uLnByb3RvdHlwZVsnb25BZGQnXSA9IENsdXN0ZXJJY29uLnByb3RvdHlwZS5vbkFkZDtcbkNsdXN0ZXJJY29uLnByb3RvdHlwZVsnZHJhdyddID0gQ2x1c3Rlckljb24ucHJvdG90eXBlLmRyYXc7XG5DbHVzdGVySWNvbi5wcm90b3R5cGVbJ29uUmVtb3ZlJ10gPSBDbHVzdGVySWNvbi5wcm90b3R5cGUub25SZW1vdmU7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBNYXJrZXJDbHVzdGVyZXI7XG4iLCIvKipcbiAqIGpRdWVyeSBCYXIgUmF0aW5nIFBsdWdpbiB2MS4yLjJcbiAqXG4gKiBodHRwOi8vZ2l0aHViLmNvbS9hbnRlbm5haW8vanF1ZXJ5LWJhci1yYXRpbmdcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTItMjAxNiBLYXppayBQaWV0cnVzemV3c2tpXG4gKlxuICogVGhpcyBwbHVnaW4gaXMgYXZhaWxhYmxlIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cbiAqIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gKi9cbihmdW5jdGlvbiAoZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgLy8gQU1EXG4gICAgICAgIGRlZmluZShbJ2pxdWVyeSddLCBmYWN0b3J5KTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgICAgIC8vIE5vZGUvQ29tbW9uSlNcbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoJ2pxdWVyeScpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBicm93c2VyIGdsb2JhbHNcbiAgICAgICAgZmFjdG9yeShqUXVlcnkpO1xuICAgIH1cbn0oZnVuY3Rpb24gKCQpIHtcblxuICAgIHZhciBCYXJSYXRpbmcgPSAoZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgZnVuY3Rpb24gQmFyUmF0aW5nKCkge1xuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgICAgICAvLyB3cmFwIGVsZW1lbnQgaW4gYSB3cmFwcGVyIGRpdlxuICAgICAgICAgICAgdmFyIHdyYXBFbGVtZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNsYXNzZXMgPSBbJ2JyLXdyYXBwZXInXTtcblxuICAgICAgICAgICAgICAgIGlmIChzZWxmLm9wdGlvbnMudGhlbWUgIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzZXMucHVzaCgnYnItdGhlbWUtJyArIHNlbGYub3B0aW9ucy50aGVtZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgc2VsZi4kZWxlbS53cmFwKCQoJzxkaXYgLz4nLCB7XG4gICAgICAgICAgICAgICAgICAgICdjbGFzcyc6IGNsYXNzZXMuam9pbignICcpXG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gdW53cmFwIGVsZW1lbnRcbiAgICAgICAgICAgIHZhciB1bndyYXBFbGVtZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgc2VsZi4kZWxlbS51bndyYXAoKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIGZpbmQgb3B0aW9uIGJ5IHZhbHVlXG4gICAgICAgICAgICB2YXIgZmluZE9wdGlvbiA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCQuaXNOdW1lcmljKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IE1hdGguZmxvb3IodmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiAkKCdvcHRpb25bdmFsdWU9XCInICsgdmFsdWUgICsgJ1wiXScsIHNlbGYuJGVsZW0pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gZ2V0IGluaXRpYWwgb3B0aW9uXG4gICAgICAgICAgICB2YXIgZ2V0SW5pdGlhbE9wdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBpbml0aWFsUmF0aW5nID0gc2VsZi5vcHRpb25zLmluaXRpYWxSYXRpbmc7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWluaXRpYWxSYXRpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQoJ29wdGlvbjpzZWxlY3RlZCcsIHNlbGYuJGVsZW0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBmaW5kT3B0aW9uKGluaXRpYWxSYXRpbmcpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gZ2V0IGVtcHR5IG9wdGlvblxuICAgICAgICAgICAgdmFyIGdldEVtcHR5T3B0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyICRlbXB0eU9wdCA9IHNlbGYuJGVsZW0uZmluZCgnb3B0aW9uW3ZhbHVlPVwiJyArIHNlbGYub3B0aW9ucy5lbXB0eVZhbHVlICsgJ1wiXScpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCEkZW1wdHlPcHQubGVuZ3RoICYmIHNlbGYub3B0aW9ucy5hbGxvd0VtcHR5KSB7XG4gICAgICAgICAgICAgICAgICAgICRlbXB0eU9wdCA9ICQoJzxvcHRpb24gLz4nLCB7ICd2YWx1ZSc6IHNlbGYub3B0aW9ucy5lbXB0eVZhbHVlIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAkZW1wdHlPcHQucHJlcGVuZFRvKHNlbGYuJGVsZW0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiAkZW1wdHlPcHQ7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBnZXQgZGF0YVxuICAgICAgICAgICAgdmFyIGdldERhdGEgPSBmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IHNlbGYuJGVsZW0uZGF0YSgnYmFycmF0aW5nJyk7XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGtleSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGFba2V5XTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIHNldCBkYXRhXG4gICAgICAgICAgICB2YXIgc2V0RGF0YSA9IGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLmRhdGEoJ2JhcnJhdGluZycsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLmRhdGEoJ2JhcnJhdGluZycpW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBzYXZlIGRhdGEgb24gZWxlbWVudFxuICAgICAgICAgICAgdmFyIHNhdmVEYXRhT25FbGVtZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyICRvcHQgPSBnZXRJbml0aWFsT3B0aW9uKCk7XG4gICAgICAgICAgICAgICAgdmFyICRlbXB0eU9wdCA9IGdldEVtcHR5T3B0aW9uKCk7XG5cbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSAkb3B0LnZhbCgpO1xuICAgICAgICAgICAgICAgIHZhciB0ZXh0ID0gJG9wdC5kYXRhKCdodG1sJykgPyAkb3B0LmRhdGEoJ2h0bWwnKSA6ICRvcHQudGV4dCgpO1xuXG4gICAgICAgICAgICAgICAgLy8gaWYgdGhlIGFsbG93RW1wdHkgb3B0aW9uIGlzIG5vdCBzZXQgbGV0J3MgY2hlY2sgaWYgZW1wdHkgb3B0aW9uIGV4aXN0cyBpbiB0aGUgc2VsZWN0IGZpZWxkXG4gICAgICAgICAgICAgICAgdmFyIGFsbG93RW1wdHkgPSAoc2VsZi5vcHRpb25zLmFsbG93RW1wdHkgIT09IG51bGwpID9cbiAgICAgICAgICAgICAgICAgICAgc2VsZi5vcHRpb25zLmFsbG93RW1wdHkgOlxuICAgICAgICAgICAgICAgICAgICAhISRlbXB0eU9wdC5sZW5ndGg7XG5cbiAgICAgICAgICAgICAgICB2YXIgZW1wdHlWYWx1ZSA9ICgkZW1wdHlPcHQubGVuZ3RoKSA/ICRlbXB0eU9wdC52YWwoKSA6IG51bGw7XG4gICAgICAgICAgICAgICAgdmFyIGVtcHR5VGV4dCA9ICgkZW1wdHlPcHQubGVuZ3RoKSA/ICRlbXB0eU9wdC50ZXh0KCkgOiBudWxsO1xuXG4gICAgICAgICAgICAgICAgc2V0RGF0YShudWxsLCB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJPcHRpb25zOiBzZWxmLm9wdGlvbnMsXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gaW5pdGlhbCByYXRpbmcgYmFzZWQgb24gdGhlIE9QVElPTiB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICByYXRpbmdWYWx1ZTogdmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIHJhdGluZ1RleHQ6IHRleHQsXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gcmF0aW5nIHdpbGwgYmUgcmVzdG9yZWQgYnkgY2FsbGluZyBjbGVhciBtZXRob2RcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxSYXRpbmdWYWx1ZTogdmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsUmF0aW5nVGV4dDogdGV4dCxcblxuICAgICAgICAgICAgICAgICAgICAvLyBhbGxvdyBlbXB0eSByYXRpbmdzP1xuICAgICAgICAgICAgICAgICAgICBhbGxvd0VtcHR5OiBhbGxvd0VtcHR5LFxuXG4gICAgICAgICAgICAgICAgICAgIC8vIHJhdGluZyB2YWx1ZSBhbmQgdGV4dCBvZiB0aGUgZW1wdHkgT1BUSU9OXG4gICAgICAgICAgICAgICAgICAgIGVtcHR5UmF0aW5nVmFsdWU6IGVtcHR5VmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIGVtcHR5UmF0aW5nVGV4dDogZW1wdHlUZXh0LFxuXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlYWQtb25seSBzdGF0ZVxuICAgICAgICAgICAgICAgICAgICByZWFkT25seTogc2VsZi5vcHRpb25zLnJlYWRvbmx5LFxuXG4gICAgICAgICAgICAgICAgICAgIC8vIGRpZCB0aGUgdXNlciBhbHJlYWR5IHNlbGVjdCBhIHJhdGluZz9cbiAgICAgICAgICAgICAgICAgICAgcmF0aW5nTWFkZTogZmFsc2VcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIHJlbW92ZSBkYXRhIG9uIGVsZW1lbnRcbiAgICAgICAgICAgIHZhciByZW1vdmVEYXRhT25FbGVtZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgc2VsZi4kZWxlbS5yZW1vdmVEYXRhKCdiYXJyYXRpbmcnKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIHJldHVybiBjdXJyZW50IHJhdGluZyB0ZXh0XG4gICAgICAgICAgICB2YXIgcmF0aW5nVGV4dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBnZXREYXRhKCdyYXRpbmdUZXh0Jyk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyByZXR1cm4gY3VycmVudCByYXRpbmcgdmFsdWVcbiAgICAgICAgICAgIHZhciByYXRpbmdWYWx1ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBnZXREYXRhKCdyYXRpbmdWYWx1ZScpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gYnVpbGQgd2lkZ2V0IGFuZCByZXR1cm4galF1ZXJ5IGVsZW1lbnRcbiAgICAgICAgICAgIHZhciBidWlsZFdpZGdldCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciAkdyA9ICQoJzxkaXYgLz4nLCB7ICdjbGFzcyc6ICdici13aWRnZXQnIH0pO1xuXG4gICAgICAgICAgICAgICAgLy8gY3JlYXRlIEEgZWxlbWVudHMgdGhhdCB3aWxsIHJlcGxhY2UgT1BUSU9Oc1xuICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0uZmluZCgnb3B0aW9uJykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbCwgdGV4dCwgaHRtbCwgJGE7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFsID0gJCh0aGlzKS52YWwoKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBjcmVhdGUgcmF0aW5ncyAtIGJ1dCBvbmx5IGlmIHZhbCBpcyBub3QgZGVmaW5lZCBhcyBlbXB0eVxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsICE9PSBnZXREYXRhKCdlbXB0eVJhdGluZ1ZhbHVlJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQgPSAkKHRoaXMpLnRleHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGh0bWwgPSAkKHRoaXMpLmRhdGEoJ2h0bWwnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChodG1sKSB7IHRleHQgPSBodG1sOyB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICRhID0gJCgnPGEgLz4nLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2hyZWYnOiAnIycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2RhdGEtcmF0aW5nLXZhbHVlJzogdmFsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdkYXRhLXJhdGluZy10ZXh0JzogdGV4dCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnaHRtbCc6IChzZWxmLm9wdGlvbnMuc2hvd1ZhbHVlcykgPyB0ZXh0IDogJydcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAkdy5hcHBlbmQoJGEpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIC8vIGFwcGVuZCAuYnItY3VycmVudC1yYXRpbmcgZGl2IHRvIHRoZSB3aWRnZXRcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5vcHRpb25zLnNob3dTZWxlY3RlZFJhdGluZykge1xuICAgICAgICAgICAgICAgICAgICAkdy5hcHBlbmQoJCgnPGRpdiAvPicsIHsgJ3RleHQnOiAnJywgJ2NsYXNzJzogJ2JyLWN1cnJlbnQtcmF0aW5nJyB9KSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gYWRkaXRpb25hbCBjbGFzc2VzIGZvciB0aGUgd2lkZ2V0XG4gICAgICAgICAgICAgICAgaWYgKHNlbGYub3B0aW9ucy5yZXZlcnNlKSB7XG4gICAgICAgICAgICAgICAgICAgICR3LmFkZENsYXNzKCdici1yZXZlcnNlJyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYub3B0aW9ucy5yZWFkb25seSkge1xuICAgICAgICAgICAgICAgICAgICAkdy5hZGRDbGFzcygnYnItcmVhZG9ubHknKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gJHc7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyByZXR1cm4gYSBqUXVlcnkgZnVuY3Rpb24gbmFtZSBkZXBlbmRpbmcgb24gdGhlICdyZXZlcnNlJyBzZXR0aW5nXG4gICAgICAgICAgICB2YXIgbmV4dEFsbG9yUHJldmlvdXNBbGwgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpZiAoZ2V0RGF0YSgndXNlck9wdGlvbnMnKS5yZXZlcnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnbmV4dEFsbCc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdwcmV2QWxsJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBzZXQgdGhlIHZhbHVlIG9mIHRoZSBzZWxlY3QgZmllbGRcbiAgICAgICAgICAgIHZhciBzZXRTZWxlY3RGaWVsZFZhbHVlID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICAvLyBjaGFuZ2Ugc2VsZWN0ZWQgb3B0aW9uXG4gICAgICAgICAgICAgICAgZmluZE9wdGlvbih2YWx1ZSkucHJvcCgnc2VsZWN0ZWQnLCB0cnVlKTtcblxuICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0uY2hhbmdlKCk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyByZXNldCBzZWxlY3QgZmllbGRcbiAgICAgICAgICAgIHZhciByZXNldFNlbGVjdEZpZWxkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJCgnb3B0aW9uJywgc2VsZi4kZWxlbSkucHJvcCgnc2VsZWN0ZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGVmYXVsdFNlbGVjdGVkO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgc2VsZi4kZWxlbS5jaGFuZ2UoKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIGRpc3BsYXkgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCByYXRpbmdcbiAgICAgICAgICAgIHZhciBzaG93U2VsZWN0ZWRSYXRpbmcgPSBmdW5jdGlvbih0ZXh0KSB7XG4gICAgICAgICAgICAgICAgLy8gdGV4dCB1bmRlZmluZWQ/XG4gICAgICAgICAgICAgICAgdGV4dCA9IHRleHQgPyB0ZXh0IDogcmF0aW5nVGV4dCgpO1xuXG4gICAgICAgICAgICAgICAgLy8gc3BlY2lhbCBjYXNlIHdoZW4gdGhlIHNlbGVjdGVkIHJhdGluZyBpcyBkZWZpbmVkIGFzIGVtcHR5XG4gICAgICAgICAgICAgICAgaWYgKHRleHQgPT0gZ2V0RGF0YSgnZW1wdHlSYXRpbmdUZXh0JykpIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dCA9ICcnO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIHVwZGF0ZSAuYnItY3VycmVudC1yYXRpbmcgZGl2XG4gICAgICAgICAgICAgICAgaWYgKHNlbGYub3B0aW9ucy5zaG93U2VsZWN0ZWRSYXRpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi4kZWxlbS5wYXJlbnQoKS5maW5kKCcuYnItY3VycmVudC1yYXRpbmcnKS50ZXh0KHRleHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIHJldHVybiByb3VuZGVkIGZyYWN0aW9uIG9mIGEgdmFsdWUgKDE0LjQgLT4gNDAsIDAuOTkgLT4gOTApXG4gICAgICAgICAgICB2YXIgZnJhY3Rpb24gPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLnJvdW5kKCgoTWF0aC5mbG9vcih2YWx1ZSAqIDEwKSAvIDEwKSAlIDEpICogMTAwKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIHJlbW92ZSBhbGwgY2xhc3NlcyBmcm9tIGVsZW1lbnRzXG4gICAgICAgICAgICB2YXIgcmVzZXRTdHlsZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBhbGwgY2xhc3NlcyBzdGFydGluZyB3aXRoIGJyLSpcbiAgICAgICAgICAgICAgICBzZWxmLiR3aWRnZXQuZmluZCgnYScpLnJlbW92ZUNsYXNzKGZ1bmN0aW9uKGluZGV4LCBjbGFzc2VzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoY2xhc3Nlcy5tYXRjaCgvKF58XFxzKWJyLVxcUysvZykgfHwgW10pLmpvaW4oJyAnKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIGFwcGx5IHN0eWxlIGJ5IHNldHRpbmcgY2xhc3NlcyBvbiBlbGVtZW50c1xuICAgICAgICAgICAgdmFyIGFwcGx5U3R5bGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgJGEgPSBzZWxmLiR3aWRnZXQuZmluZCgnYVtkYXRhLXJhdGluZy12YWx1ZT1cIicgKyByYXRpbmdWYWx1ZSgpICsgJ1wiXScpO1xuICAgICAgICAgICAgICAgIHZhciBpbml0aWFsUmF0aW5nID0gZ2V0RGF0YSgndXNlck9wdGlvbnMnKS5pbml0aWFsUmF0aW5nO1xuICAgICAgICAgICAgICAgIHZhciBiYXNlVmFsdWUgPSAkLmlzTnVtZXJpYyhyYXRpbmdWYWx1ZSgpKSA/IHJhdGluZ1ZhbHVlKCkgOiAwO1xuICAgICAgICAgICAgICAgIHZhciBmID0gZnJhY3Rpb24oaW5pdGlhbFJhdGluZyk7XG4gICAgICAgICAgICAgICAgdmFyICRhbGwsICRmcmFjdGlvbmFsO1xuXG4gICAgICAgICAgICAgICAgcmVzZXRTdHlsZSgpO1xuXG4gICAgICAgICAgICAgICAgLy8gYWRkIGNsYXNzZXNcbiAgICAgICAgICAgICAgICAkYS5hZGRDbGFzcygnYnItc2VsZWN0ZWQgYnItY3VycmVudCcpW25leHRBbGxvclByZXZpb3VzQWxsKCldKClcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdici1zZWxlY3RlZCcpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFnZXREYXRhKCdyYXRpbmdNYWRlJykgJiYgJC5pc051bWVyaWMoaW5pdGlhbFJhdGluZykpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKChpbml0aWFsUmF0aW5nIDw9IGJhc2VWYWx1ZSkgfHwgIWYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICRhbGwgPSBzZWxmLiR3aWRnZXQuZmluZCgnYScpO1xuXG4gICAgICAgICAgICAgICAgICAgICRmcmFjdGlvbmFsID0gKCRhLmxlbmd0aCkgP1xuICAgICAgICAgICAgICAgICAgICAgICAgJGFbKGdldERhdGEoJ3VzZXJPcHRpb25zJykucmV2ZXJzZSkgPyAncHJldicgOiAnbmV4dCddKCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgJGFsbFsoZ2V0RGF0YSgndXNlck9wdGlvbnMnKS5yZXZlcnNlKSA/ICdsYXN0JyA6ICdmaXJzdCddKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgJGZyYWN0aW9uYWwuYWRkQ2xhc3MoJ2JyLWZyYWN0aW9uYWwnKTtcbiAgICAgICAgICAgICAgICAgICAgJGZyYWN0aW9uYWwuYWRkQ2xhc3MoJ2JyLWZyYWN0aW9uYWwtJyArIGYpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIHRoZSBlbGVtZW50IGlzIGRlc2VsZWN0YWJsZT9cbiAgICAgICAgICAgIHZhciBpc0Rlc2VsZWN0YWJsZSA9IGZ1bmN0aW9uKCRlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgaWYgKCFnZXREYXRhKCdhbGxvd0VtcHR5JykgfHwgIWdldERhdGEoJ3VzZXJPcHRpb25zJykuZGVzZWxlY3RhYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKHJhdGluZ1ZhbHVlKCkgPT0gJGVsZW1lbnQuYXR0cignZGF0YS1yYXRpbmctdmFsdWUnKSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBoYW5kbGUgY2xpY2sgZXZlbnRzXG4gICAgICAgICAgICB2YXIgYXR0YWNoQ2xpY2tIYW5kbGVyID0gZnVuY3Rpb24oJGVsZW1lbnRzKSB7XG4gICAgICAgICAgICAgICAgJGVsZW1lbnRzLm9uKCdjbGljay5iYXJyYXRpbmcnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgJGEgPSAkKHRoaXMpLFxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucyA9IGdldERhdGEoJ3VzZXJPcHRpb25zJyksXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ7XG5cbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9ICRhLmF0dHIoJ2RhdGEtcmF0aW5nLXZhbHVlJyk7XG4gICAgICAgICAgICAgICAgICAgIHRleHQgPSAkYS5hdHRyKCdkYXRhLXJhdGluZy10ZXh0Jyk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gaXMgY3VycmVudCBhbmQgZGVzZWxlY3RhYmxlP1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNEZXNlbGVjdGFibGUoJGEpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGdldERhdGEoJ2VtcHR5UmF0aW5nVmFsdWUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQgPSBnZXREYXRhKCdlbXB0eVJhdGluZ1RleHQnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlbWVtYmVyIHNlbGVjdGVkIHJhdGluZ1xuICAgICAgICAgICAgICAgICAgICBzZXREYXRhKCdyYXRpbmdWYWx1ZScsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgc2V0RGF0YSgncmF0aW5nVGV4dCcsIHRleHQpO1xuICAgICAgICAgICAgICAgICAgICBzZXREYXRhKCdyYXRpbmdNYWRlJywgdHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgc2V0U2VsZWN0RmllbGRWYWx1ZSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHNob3dTZWxlY3RlZFJhdGluZyh0ZXh0KTtcblxuICAgICAgICAgICAgICAgICAgICBhcHBseVN0eWxlKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gb25TZWxlY3QgY2FsbGJhY2tcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5vblNlbGVjdC5jYWxsKFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZixcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhdGluZ1ZhbHVlKCksXG4gICAgICAgICAgICAgICAgICAgICAgICByYXRpbmdUZXh0KCksXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudFxuICAgICAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIGhhbmRsZSBtb3VzZWVudGVyIGV2ZW50c1xuICAgICAgICAgICAgdmFyIGF0dGFjaE1vdXNlRW50ZXJIYW5kbGVyID0gZnVuY3Rpb24oJGVsZW1lbnRzKSB7XG4gICAgICAgICAgICAgICAgJGVsZW1lbnRzLm9uKCdtb3VzZWVudGVyLmJhcnJhdGluZycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgJGEgPSAkKHRoaXMpO1xuXG4gICAgICAgICAgICAgICAgICAgIHJlc2V0U3R5bGUoKTtcblxuICAgICAgICAgICAgICAgICAgICAkYS5hZGRDbGFzcygnYnItYWN0aXZlJylbbmV4dEFsbG9yUHJldmlvdXNBbGwoKV0oKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdici1hY3RpdmUnKTtcblxuICAgICAgICAgICAgICAgICAgICBzaG93U2VsZWN0ZWRSYXRpbmcoJGEuYXR0cignZGF0YS1yYXRpbmctdGV4dCcpKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIGhhbmRsZSBtb3VzZWxlYXZlIGV2ZW50c1xuICAgICAgICAgICAgdmFyIGF0dGFjaE1vdXNlTGVhdmVIYW5kbGVyID0gZnVuY3Rpb24oJGVsZW1lbnRzKSB7XG4gICAgICAgICAgICAgICAgc2VsZi4kd2lkZ2V0Lm9uKCdtb3VzZWxlYXZlLmJhcnJhdGluZyBibHVyLmJhcnJhdGluZycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBzaG93U2VsZWN0ZWRSYXRpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgYXBwbHlTdHlsZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gc29tZXdoYXQgcHJpbWl0aXZlIHdheSB0byByZW1vdmUgMzAwbXMgY2xpY2sgZGVsYXkgb24gdG91Y2ggZGV2aWNlc1xuICAgICAgICAgICAgLy8gZm9yIGEgbW9yZSBhZHZhbmNlZCBzb2x1dGlvbiBjb25zaWRlciBzZXR0aW5nIGBmYXN0Q2xpY2tzYCBvcHRpb24gdG8gZmFsc2VcbiAgICAgICAgICAgIC8vIGFuZCB1c2luZyBhIGxpYnJhcnkgc3VjaCBhcyBmYXN0Y2xpY2sgKGh0dHBzOi8vZ2l0aHViLmNvbS9mdGxhYnMvZmFzdGNsaWNrKVxuICAgICAgICAgICAgdmFyIGZhc3RDbGlja3MgPSBmdW5jdGlvbigkZWxlbWVudHMpIHtcbiAgICAgICAgICAgICAgICAkZWxlbWVudHMub24oJ3RvdWNoc3RhcnQuYmFycmF0aW5nJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5jbGljaygpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gZGlzYWJsZSBjbGlja3NcbiAgICAgICAgICAgIHZhciBkaXNhYmxlQ2xpY2tzID0gZnVuY3Rpb24oJGVsZW1lbnRzKSB7XG4gICAgICAgICAgICAgICAgJGVsZW1lbnRzLm9uKCdjbGljay5iYXJyYXRpbmcnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdmFyIGF0dGFjaEhhbmRsZXJzID0gZnVuY3Rpb24oJGVsZW1lbnRzKSB7XG4gICAgICAgICAgICAgICAgLy8gYXR0YWNoIGNsaWNrIGV2ZW50IGhhbmRsZXJcbiAgICAgICAgICAgICAgICBhdHRhY2hDbGlja0hhbmRsZXIoJGVsZW1lbnRzKTtcblxuICAgICAgICAgICAgICAgIGlmIChzZWxmLm9wdGlvbnMuaG92ZXJTdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBhdHRhY2ggbW91c2VlbnRlciBldmVudCBoYW5kbGVyXG4gICAgICAgICAgICAgICAgICAgIGF0dGFjaE1vdXNlRW50ZXJIYW5kbGVyKCRlbGVtZW50cyk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gYXR0YWNoIG1vdXNlbGVhdmUgZXZlbnQgaGFuZGxlclxuICAgICAgICAgICAgICAgICAgICBhdHRhY2hNb3VzZUxlYXZlSGFuZGxlcigkZWxlbWVudHMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHZhciBkZXRhY2hIYW5kbGVycyA9IGZ1bmN0aW9uKCRlbGVtZW50cykge1xuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBldmVudCBoYW5kbGVycyBpbiB0aGUgXCIuYmFycmF0aW5nXCIgbmFtZXNwYWNlXG4gICAgICAgICAgICAgICAgJGVsZW1lbnRzLm9mZignLmJhcnJhdGluZycpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdmFyIHNldHVwSGFuZGxlcnMgPSBmdW5jdGlvbihyZWFkb25seSkge1xuICAgICAgICAgICAgICAgIHZhciAkZWxlbWVudHMgPSBzZWxmLiR3aWRnZXQuZmluZCgnYScpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGZhc3RDbGlja3MpIHtcbiAgICAgICAgICAgICAgICAgICAgZmFzdENsaWNrcygkZWxlbWVudHMpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChyZWFkb25seSkge1xuICAgICAgICAgICAgICAgICAgICBkZXRhY2hIYW5kbGVycygkZWxlbWVudHMpO1xuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlQ2xpY2tzKCRlbGVtZW50cyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYXR0YWNoSGFuZGxlcnMoJGVsZW1lbnRzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLnNob3cgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAvLyBydW4gb25seSBvbmNlXG4gICAgICAgICAgICAgICAgaWYgKGdldERhdGEoKSkgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgLy8gd3JhcCBlbGVtZW50XG4gICAgICAgICAgICAgICAgd3JhcEVsZW1lbnQoKTtcblxuICAgICAgICAgICAgICAgIC8vIHNhdmUgZGF0YVxuICAgICAgICAgICAgICAgIHNhdmVEYXRhT25FbGVtZW50KCk7XG5cbiAgICAgICAgICAgICAgICAvLyBidWlsZCAmIGFwcGVuZCB3aWRnZXQgdG8gdGhlIERPTVxuICAgICAgICAgICAgICAgIHNlbGYuJHdpZGdldCA9IGJ1aWxkV2lkZ2V0KCk7XG4gICAgICAgICAgICAgICAgc2VsZi4kd2lkZ2V0Lmluc2VydEFmdGVyKHNlbGYuJGVsZW0pO1xuXG4gICAgICAgICAgICAgICAgYXBwbHlTdHlsZSgpO1xuXG4gICAgICAgICAgICAgICAgc2hvd1NlbGVjdGVkUmF0aW5nKCk7XG5cbiAgICAgICAgICAgICAgICBzZXR1cEhhbmRsZXJzKHNlbGYub3B0aW9ucy5yZWFkb25seSk7XG5cbiAgICAgICAgICAgICAgICAvLyBoaWRlIHRoZSBzZWxlY3QgZmllbGRcbiAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLmhpZGUoKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMucmVhZG9ubHkgPSBmdW5jdGlvbihzdGF0ZSkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygc3RhdGUgIT09ICdib29sZWFuJyB8fCBnZXREYXRhKCdyZWFkT25seScpID09IHN0YXRlKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICBzZXR1cEhhbmRsZXJzKHN0YXRlKTtcbiAgICAgICAgICAgICAgICBzZXREYXRhKCdyZWFkT25seScsIHN0YXRlKTtcbiAgICAgICAgICAgICAgICBzZWxmLiR3aWRnZXQudG9nZ2xlQ2xhc3MoJ2JyLXJlYWRvbmx5Jyk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLnNldCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSBnZXREYXRhKCd1c2VyT3B0aW9ucycpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuJGVsZW0uZmluZCgnb3B0aW9uW3ZhbHVlPVwiJyArIHZhbHVlICsgJ1wiXScpLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgLy8gc2V0IGRhdGFcbiAgICAgICAgICAgICAgICBzZXREYXRhKCdyYXRpbmdWYWx1ZScsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICBzZXREYXRhKCdyYXRpbmdUZXh0Jywgc2VsZi4kZWxlbS5maW5kKCdvcHRpb25bdmFsdWU9XCInICsgdmFsdWUgKyAnXCJdJykudGV4dCgpKTtcbiAgICAgICAgICAgICAgICBzZXREYXRhKCdyYXRpbmdNYWRlJywgdHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICBzZXRTZWxlY3RGaWVsZFZhbHVlKHJhdGluZ1ZhbHVlKCkpO1xuICAgICAgICAgICAgICAgIHNob3dTZWxlY3RlZFJhdGluZyhyYXRpbmdUZXh0KCkpO1xuXG4gICAgICAgICAgICAgICAgYXBwbHlTdHlsZSgpO1xuXG4gICAgICAgICAgICAgICAgLy8gb25TZWxlY3QgY2FsbGJhY2tcbiAgICAgICAgICAgICAgICBpZiAoIW9wdGlvbnMuc2lsZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMub25TZWxlY3QuY2FsbChcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMsXG4gICAgICAgICAgICAgICAgICAgICAgICByYXRpbmdWYWx1ZSgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmF0aW5nVGV4dCgpXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy5jbGVhciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBvcHRpb25zID0gZ2V0RGF0YSgndXNlck9wdGlvbnMnKTtcblxuICAgICAgICAgICAgICAgIC8vIHJlc3RvcmUgb3JpZ2luYWwgZGF0YVxuICAgICAgICAgICAgICAgIHNldERhdGEoJ3JhdGluZ1ZhbHVlJywgZ2V0RGF0YSgnb3JpZ2luYWxSYXRpbmdWYWx1ZScpKTtcbiAgICAgICAgICAgICAgICBzZXREYXRhKCdyYXRpbmdUZXh0JywgZ2V0RGF0YSgnb3JpZ2luYWxSYXRpbmdUZXh0JykpO1xuICAgICAgICAgICAgICAgIHNldERhdGEoJ3JhdGluZ01hZGUnLCBmYWxzZSk7XG5cbiAgICAgICAgICAgICAgICByZXNldFNlbGVjdEZpZWxkKCk7XG4gICAgICAgICAgICAgICAgc2hvd1NlbGVjdGVkUmF0aW5nKHJhdGluZ1RleHQoKSk7XG5cbiAgICAgICAgICAgICAgICBhcHBseVN0eWxlKCk7XG5cbiAgICAgICAgICAgICAgICAvLyBvbkNsZWFyIGNhbGxiYWNrXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5vbkNsZWFyLmNhbGwoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMsXG4gICAgICAgICAgICAgICAgICAgIHJhdGluZ1ZhbHVlKCksXG4gICAgICAgICAgICAgICAgICAgIHJhdGluZ1RleHQoKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3kgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSByYXRpbmdWYWx1ZSgpO1xuICAgICAgICAgICAgICAgIHZhciB0ZXh0ID0gcmF0aW5nVGV4dCgpO1xuICAgICAgICAgICAgICAgIHZhciBvcHRpb25zID0gZ2V0RGF0YSgndXNlck9wdGlvbnMnKTtcblxuICAgICAgICAgICAgICAgIC8vIGRldGFjaCBoYW5kbGVyc1xuICAgICAgICAgICAgICAgIGRldGFjaEhhbmRsZXJzKHNlbGYuJHdpZGdldC5maW5kKCdhJykpO1xuXG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIHdpZGdldFxuICAgICAgICAgICAgICAgIHNlbGYuJHdpZGdldC5yZW1vdmUoKTtcblxuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBkYXRhXG4gICAgICAgICAgICAgICAgcmVtb3ZlRGF0YU9uRWxlbWVudCgpO1xuXG4gICAgICAgICAgICAgICAgLy8gdW53cmFwIHRoZSBlbGVtZW50XG4gICAgICAgICAgICAgICAgdW53cmFwRWxlbWVudCgpO1xuXG4gICAgICAgICAgICAgICAgLy8gc2hvdyB0aGUgZWxlbWVudFxuICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0uc2hvdygpO1xuXG4gICAgICAgICAgICAgICAgLy8gb25EZXN0cm95IGNhbGxiYWNrXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5vbkRlc3Ryb3kuY2FsbChcbiAgICAgICAgICAgICAgICAgICAgdGhpcyxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIHRleHRcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIEJhclJhdGluZy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uIChvcHRpb25zLCBlbGVtKSB7XG4gICAgICAgICAgICB0aGlzLiRlbGVtID0gJChlbGVtKTtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCAkLmZuLmJhcnJhdGluZy5kZWZhdWx0cywgb3B0aW9ucyk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnM7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIEJhclJhdGluZztcbiAgICB9KSgpO1xuXG4gICAgJC5mbi5iYXJyYXRpbmcgPSBmdW5jdGlvbiAobWV0aG9kLCBvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHBsdWdpbiA9IG5ldyBCYXJSYXRpbmcoKTtcblxuICAgICAgICAgICAgLy8gcGx1Z2luIHdvcmtzIHdpdGggc2VsZWN0IGZpZWxkc1xuICAgICAgICAgICAgaWYgKCEkKHRoaXMpLmlzKCdzZWxlY3QnKSkge1xuICAgICAgICAgICAgICAgICQuZXJyb3IoJ1NvcnJ5LCB0aGlzIHBsdWdpbiBvbmx5IHdvcmtzIHdpdGggc2VsZWN0IGZpZWxkcy4nKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gbWV0aG9kIHN1cHBsaWVkXG4gICAgICAgICAgICBpZiAocGx1Z2luLmhhc093blByb3BlcnR5KG1ldGhvZCkpIHtcbiAgICAgICAgICAgICAgICBwbHVnaW4uaW5pdChvcHRpb25zLCB0aGlzKTtcbiAgICAgICAgICAgICAgICBpZiAobWV0aG9kID09PSAnc2hvdycpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBsdWdpbi5zaG93KG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHBsdWdpbiBleGlzdHM/XG4gICAgICAgICAgICAgICAgICAgIGlmIChwbHVnaW4uJGVsZW0uZGF0YSgnYmFycmF0aW5nJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsdWdpbi4kd2lkZ2V0ID0gJCh0aGlzKS5uZXh0KCcuYnItd2lkZ2V0Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGx1Z2luW21ldGhvZF0ob3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIG5vIG1ldGhvZCBzdXBwbGllZCBvciBvbmx5IG9wdGlvbnMgc3VwcGxpZWRcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG1ldGhvZCA9PT0gJ29iamVjdCcgfHwgIW1ldGhvZCkge1xuICAgICAgICAgICAgICAgIG9wdGlvbnMgPSBtZXRob2Q7XG4gICAgICAgICAgICAgICAgcGx1Z2luLmluaXQob3B0aW9ucywgdGhpcyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBsdWdpbi5zaG93KCk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJC5lcnJvcignTWV0aG9kICcgKyBtZXRob2QgKyAnIGRvZXMgbm90IGV4aXN0IG9uIGpRdWVyeS5iYXJyYXRpbmcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgICQuZm4uYmFycmF0aW5nLmRlZmF1bHRzID0ge1xuICAgICAgICB0aGVtZTonJyxcbiAgICAgICAgaW5pdGlhbFJhdGluZzpudWxsLCAvLyBpbml0aWFsIHJhdGluZ1xuICAgICAgICBhbGxvd0VtcHR5Om51bGwsIC8vIGFsbG93IGVtcHR5IHJhdGluZ3M/XG4gICAgICAgIGVtcHR5VmFsdWU6JycsIC8vIHRoaXMgaXMgdGhlIGV4cGVjdGVkIHZhbHVlIG9mIHRoZSBlbXB0eSByYXRpbmdcbiAgICAgICAgc2hvd1ZhbHVlczpmYWxzZSwgLy8gZGlzcGxheSByYXRpbmcgdmFsdWVzIG9uIHRoZSBiYXJzP1xuICAgICAgICBzaG93U2VsZWN0ZWRSYXRpbmc6dHJ1ZSwgLy8gYXBwZW5kIGEgZGl2IHdpdGggYSByYXRpbmcgdG8gdGhlIHdpZGdldD9cbiAgICAgICAgZGVzZWxlY3RhYmxlOnRydWUsIC8vIGFsbG93IHRvIGRlc2VsZWN0IHJhdGluZ3M/XG4gICAgICAgIHJldmVyc2U6ZmFsc2UsIC8vIHJldmVyc2UgdGhlIHJhdGluZz9cbiAgICAgICAgcmVhZG9ubHk6ZmFsc2UsIC8vIG1ha2UgdGhlIHJhdGluZyByZWFkeS1vbmx5P1xuICAgICAgICBmYXN0Q2xpY2tzOnRydWUsIC8vIHJlbW92ZSAzMDBtcyBjbGljayBkZWxheSBvbiB0b3VjaCBkZXZpY2VzP1xuICAgICAgICBob3ZlclN0YXRlOnRydWUsIC8vIGNoYW5nZSBzdGF0ZSBvbiBob3Zlcj9cbiAgICAgICAgc2lsZW50OmZhbHNlLCAvLyBzdXByZXNzIGNhbGxiYWNrcyB3aGVuIGNvbnRyb2xsaW5nIHJhdGluZ3MgcHJvZ3JhbWF0aWNhbGx5XG4gICAgICAgIG9uU2VsZWN0OmZ1bmN0aW9uICh2YWx1ZSwgdGV4dCwgZXZlbnQpIHtcbiAgICAgICAgfSwgLy8gY2FsbGJhY2sgZmlyZWQgd2hlbiBhIHJhdGluZyBpcyBzZWxlY3RlZFxuICAgICAgICBvbkNsZWFyOmZ1bmN0aW9uICh2YWx1ZSwgdGV4dCkge1xuICAgICAgICB9LCAvLyBjYWxsYmFjayBmaXJlZCB3aGVuIGEgcmF0aW5nIGlzIGNsZWFyZWRcbiAgICAgICAgb25EZXN0cm95OmZ1bmN0aW9uICh2YWx1ZSwgdGV4dCkge1xuICAgICAgICB9IC8vIGNhbGxiYWNrIGZpcmVkIHdoZW4gYSB3aWRnZXQgaXMgZGVzdHJveWVkXG4gICAgfTtcblxuICAgICQuZm4uYmFycmF0aW5nLkJhclJhdGluZyA9IEJhclJhdGluZztcblxufSkpO1xuIiwiLyoqXG4gKiBAcGFja2FnZSAgICBLbm93IFJlc2VydmF0aW9uc1xuICogQHN1YnBhY2thZ2UgU2l0ZSBKU1xuICogQGNvcHlyaWdodCAgMjAyMCBIaWdobGFuZCBWaXNpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBAbGljZW5zZSAgICBTZWUgdGhlIGZpbGUgXCJMSUNFTlNFLnR4dFwiIGZvciB0aGUgZnVsbCBsaWNlbnNlIGdvdmVybmluZyB0aGlzIGNvZGUuXG4gKiBAYXV0aG9yICAgICBIYXplbCBXaWxzb24gPGhhemVsQGhpZ2hsYW5kdmlzaW9uLmNvbT5cbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxubGV0IGxhbmc7XG5sZXQgc2VhcmNoRGF0YSA9IFtdO1xubGV0IHNlYXJjaERvbmUgPSBmYWxzZTtcbmxldCBjYWxlbmRhckxvYWRlZCA9IGZhbHNlO1xubGV0IHNhdmVkd2lkdGggPSBmYWxzZTtcbmxldCBsYXJnZTtcbmxldCByZXNpemVkID0gZmFsc2U7XG5cbihmdW5jdGlvbiAoJCkge1xuICAgICQoZnVuY3Rpb24gKCkge1xuICAgICAgICBGb3VuZGF0aW9uLmFkZFRvSnF1ZXJ5KCk7XG4gICAgICAgICQoZG9jdW1lbnQpLmZvdW5kYXRpb24oKTtcbiAgICAgICAgbGFuZyA9ICQoJyNrci1sYW5nJykuZGF0YSgna3JsYW5nJyk7XG5cbiAgICAgICAgY2hlY2tTY3JlZW5XaWR0aCgpO1xuICAgICAgICAkKHdpbmRvdykub24oXCJyZXNpemVcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY2hlY2tTY3JlZW5XaWR0aCgpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGJhcnMgPSAkKCcua3ItcmF0aW5nJyk7XG4gICAgICAgIGlmIChiYXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgYmFycy5iYXJyYXRpbmcoJ3Nob3cnLCB7XG4gICAgICAgICAgICAgICAgc2hvd1ZhbHVlczogdHJ1ZSxcbiAgICAgICAgICAgICAgICBzaG93U2VsZWN0ZWRSYXRpbmc6IGZhbHNlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdzdWJtaXQnLCAnLmFqYXhmb3JtJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGNvbnN0ICRmb3JtID0gJCh0aGlzKTtcbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICAgICAgICAgIHVybDogJGZvcm0uYXR0cignYWN0aW9uJykgKyAnJmxhbmc9JyArIGxhbmcsXG4gICAgICAgICAgICAgICAgZGF0YTogJGZvcm0uc2VyaWFsaXplKCksXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5kYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybVJlc3BvbnNlKCRmb3JtLmF0dHIoJ2lkJyksIHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnLyc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcua3ItYWpheC1tb2RhbC1lcnJvci1tZXNzYWdlJykuaHRtbChyZXN1bHQubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCAkbW9kYWwgPSBuZXcgRm91bmRhdGlvbi5SZXZlYWwoJCgnI0tyQWpheE1vZGFsRXJyb3InKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkbW9kYWwub3BlbigpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAkKCcua3ItYWpheC1tb2RhbC1lcnJvci1tZXNzYWdlJykuaHRtbCgnU29ycnkgYW4gZXJyb3IgaGFzIG9jY3VycmVkLCBwbGVhc2UgdHJ5IGFnYWluJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0ICRtb2RhbCA9IG5ldyBGb3VuZGF0aW9uLlJldmVhbCgkKCcjS3JBamF4TW9kYWxFcnJvcicpKTtcbiAgICAgICAgICAgICAgICAgICAgJG1vZGFsLm9wZW4oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSkub24oJ3Nob3cuemYuZHJvcGRvd24nLCAnI2tyLXNlYXJjaHJlZ2lvbi1kcm9wJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJChcIiNrci1zZWFyY2hyZWdpb24tZHJvcFwiKS5jc3MoJ29wYWNpdHknLCAnMScpO1xuICAgICAgICB9KS5vbignc2hvdy56Zi5kcm9wZG93bicsICcja3Itc2VhcmNoZ3Vlc3QtZHJvcCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQoJyNrci1zZWFyY2hndWVzdC1kcm9wJykuY3NzKCdvcGFjaXR5JywgJzEnKTtcbiAgICAgICAgfSkub24oJ2hpZGUuemYuZHJvcGRvd24nLCAnI2tyLXNlYXJjaHJlZ2lvbi1kcm9wLCAja3Itc2VhcmNoZ3Vlc3QtZHJvcCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQoJ2JvZHknKS5jc3MoJ29wYWNpdHknLCAnMScpO1xuICAgICAgICB9KS5vbignaGlkZS56Zi5kcm9wZG93bicsICcja3ItcXVvdGUtZm9ybScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQoJyNndWVzdHMnKS50cmlnZ2VyKCdjaGFuZ2UnKTtcbiAgICAgICAgfSkub24oJ29wZW4uemYucmV2ZWFsJywgJy5rci1hamF4LW1vZGFsW2RhdGEtcmV2ZWFsXScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjb25zdCBtb2RhbGlkID0gXCIjXCIgKyAkKHRoaXMpLmF0dHIoJ2lkJyk7XG4gICAgICAgICAgICBpZiAoISQudHJpbSgkKG1vZGFsaWQpLmh0bWwoKSkubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYWpheHVybCA9ICQodGhpcykuZGF0YSgnYWpheHVybCcpO1xuICAgICAgICAgICAgICAgIGlmIChhamF4dXJsKSB7XG4gICAgICAgICAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6IGFqYXh1cmwsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoY29udGVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQobW9kYWxpZCkuaHRtbChjb250ZW50KS50cmlnZ2VyKCdyZXNpemVtZS56Zi5yZXZlYWwnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKG1vZGFsaWQpLmZvdW5kYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KS5vbignY2xpY2snLCAnLmZhdnNwYW4nLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgY29uc3QgcGlkID0gJCh0aGlzKS5kYXRhKCdwcm9wZXJ0eScpO1xuICAgICAgICAgICAgY29uc3QgYmFyID0gJCgnLmtyLXNlYXJjaGJhciBhLmlzLWFjdGl2ZScpLmRhdGEoJ2JhcicpO1xuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgdXJsOiAnL2luZGV4LnBocD9vcHRpb249Y29tX2tub3dyZXMmdGFzaz1wcm9wZXJ0aWVzLmZhdm91cml0ZSZsYW5nPScgKyBsYW5nLFxuICAgICAgICAgICAgICAgIGRhdGE6IHsncHJvcGVydHlfaWQnOiBwaWR9LFxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldFByb3BlcnRpZXMoYmFyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KS5vbignY2xpY2snLCAnLmdldFJlc3BvbnNlU2VhcmNoJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmRhdGEoJ2FjdGlvbicpID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBnZXRQcm9wZXJ0aWVzKCQodGhpcykuZGF0YSgnYmFyJykpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBnZXRQcm9wZXJ0aWVzKCQodGhpcykuZGF0YSgnYmFyJyksICQodGhpcykuZGF0YSgnYWN0aW9uJyksICAkKHRoaXMpLmRhdGEoJ2FjdGlvbi12YWx1ZScpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkub24oJ2NsaWNrJywgJy5rci1maWx0ZXJzLWNsb3NlJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICQoJy5rci1maWx0ZXJzLnRvcCcpLmFkZENsYXNzKCdoaWRlbWUnKTtcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICB9KS5vbignY2xpY2snLCAnLmtyLWZpbHRlcnMgdWwuZmlsdGVyLXNvcnQtbGlzdCBsaS5oZWFkJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICQodGhpcykucGFyZW50KCkuY2hpbGRyZW4oJ2xpLmNoZWNrYm94JykudG9nZ2xlKCk7XG4gICAgICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgfSkub24oJ2NsaWNrJywgJyNzaG93Z2F0ZXdheXMnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgJCgnI2tyLWdhdGV3YXlzJykudG9nZ2xlQ2xhc3MoJ2hpZGVtZScpO1xuICAgICAgICB9KS5vbignY2xpY2snLCAnYS5rci1zZWFyY2hiYXInLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgc2V0QWN0aXZlTWVudSgkKHRoaXMpLmRhdGEoJ2JhcicpKTtcbiAgICAgICAgfSkub24oJ2NsaWNrJywgJy50b2dnbGVvdGhlcicsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAkKHRoaXMpLmRhdGEoJ290aGVyJykudG9nZ2xlKCk7XG4gICAgICAgIH0pLm9uKCdjbGljaycsICcja3ItcHJvcGVydHktdGFicyBhW2hyZWY9XCIjY2FsZW5kYXJcIl0nLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgaWYgKCFjYWxlbmRhckxvYWRlZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBpZCA9ICQodGhpcykuZGF0YSgncGlkJyk7XG4gICAgICAgICAgICAgICAgbG9hZENhbGVuZGFyKHBpZCk7XG4gICAgICAgICAgICAgICAgY2FsZW5kYXJMb2FkZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KS5vbignbW91c2VvdmVyJywgJyNrci10aHVtYiBpbWcnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBwcm9wZXJ0eSA9ICQodGhpcykucGFyZW50KCkuZGF0YSgnaWQnKTtcbiAgICAgICAgICAgIGlmIChwcm9wZXJ0eSkge1xuICAgICAgICAgICAgICAgIGxldCB0YXJnZXQgPSAnLnRodW1ib3ZlcnZpZXcnICsgcHJvcGVydHk7XG4gICAgICAgICAgICAgICAgJCgnI3BpbmZvJykuaHRtbCgkKHRhcmdldCkuaHRtbCgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0ICRwcm9wcyA9ICQoJy5rci1wcm9wZXJ0aWVzJyk7XG4gICAgICAgIGlmICgkcHJvcHMubGVuZ3RoICYmICFzZWFyY2hEb25lKSB7XG4gICAgICAgICAgICBnZXRQcm9wZXJ0aWVzKCRwcm9wcy5kYXRhKCdiYXInKSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgJHRhYnMgPSAkKCcudGFicycpO1xuICAgICAgICBpZiAoJCgnI2tyLXByb3BlcnR5LXRhYnMnKS5sZW5ndGggJiYgIWNhbGVuZGFyTG9hZGVkKSB7XG4gICAgICAgICAgICAkdGFicy5maW5kKCdhJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykuYXR0cignaHJlZicpID09PSBcIiNjYWxlbmRhclwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBpZCA9ICQodGhpcykuZGF0YSgncGlkJyk7XG4gICAgICAgICAgICAgICAgICAgIGxvYWRDYWxlbmRhcihwaWQpO1xuICAgICAgICAgICAgICAgICAgICBjYWxlbmRhckxvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgICQuZXZlbnQuc3BlY2lhbC50b3VjaHN0YXJ0ID0ge1xuICAgICAgICBzZXR1cDogZnVuY3Rpb24gKF8sIG5zLCBoYW5kbGUpIHtcbiAgICAgICAgICAgIGlmIChucy5pbmNsdWRlcyhcIm5vUHJldmVudERlZmF1bHRcIikpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIGhhbmRsZSwge3Bhc3NpdmU6IGZhbHNlfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgaGFuZGxlLCB7cGFzc2l2ZTogdHJ1ZX0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICAkLmV2ZW50LnNwZWNpYWwudG91Y2htb3ZlID0ge1xuICAgICAgICBzZXR1cDogZnVuY3Rpb24gKF8sIG5zLCBoYW5kbGUpIHtcbiAgICAgICAgICAgIGlmIChucy5pbmNsdWRlcyhcIm5vUHJldmVudERlZmF1bHRcIikpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIiwgaGFuZGxlLCB7cGFzc2l2ZTogZmFsc2V9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsIGhhbmRsZSwge3Bhc3NpdmU6IHRydWV9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBsb2FkQ2FsZW5kYXIocGlkKSB7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgICAgICB1cmw6ICcvaW5kZXgucGhwP29wdGlvbj1jb21fa25vd3JlcyZ0YXNrPXByb3BlcnR5LmdlcmlhdHJpYyZsYW5nPScgKyBsYW5nLFxuICAgICAgICAgICAgZGF0YVR5cGU6ICdodG1sJyxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAncGlkJzogcGlkXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAkKCcjY2FsZW5kYXIudGFicy1wYW5lbCcpLmFwcGVuZChkYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZm9ybVJlc3BvbnNlKGlkLCBkYXRhKSB7XG4gICAgICAgIGlmIChkYXRhLmhhc093blByb3BlcnR5KCdyZWRpcmVjdCcpKSB7XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZShkYXRhLnJlZGlyZWN0KTtcbiAgICAgICAgfSBlbHNlIGlmIChpZCA9PT0gJ2tyLWZvcm0tcGF5bWVudCcpIHtcbiAgICAgICAgICAgIGlmIChkYXRhLmhhc093blByb3BlcnR5KCdodG1sJykpIHtcbiAgICAgICAgICAgICAgICBsZXQgJG1vZGFsID0gJCgnI2tyLWdhdGV3YXktbW9kYWwnKTtcbiAgICAgICAgICAgICAgICAkbW9kYWwuaHRtbChkYXRhLmh0bWwpLnRyaWdnZXIoJ3Jlc2l6ZW1lLnpmLnJldmVhbCcpO1xuICAgICAgICAgICAgICAgICRtb2RhbC5mb3VuZGF0aW9uKCdvcGVuJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy8nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGlkID09PSAna3ItZm9ybS1tYWlsY2hpbXAnKSB7XG4gICAgICAgICAgICAkKCcjcmVzcG9uc2UyJykuaHRtbChkYXRhKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFByb3BlcnRpZXMoYmFyLCBhY3Rpb24gPSAnJywgYWN0aW9uX3ZhbHVlID0gJycpe1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiAnL2luZGV4LnBocD9vcHRpb249Y29tX2tub3dyZXMmdmlldz1wcm9wZXJ0aWVzJmZvcm1hdD1yYXcmbGFuZz0nICsgbGFuZyxcbiAgICAgICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgICAgIGRhdGE6IHsnYmFyJzogYmFyLCAnYWN0aW9uJzogYWN0aW9uLCAnYWN0aW9uX3ZhbHVlJzogYWN0aW9uX3ZhbHVlIH0sXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29uc3QgdmFscyA9IFsnbGlzdCcsICdncmlkJywgJ3RodW1iJywgJ2ZhdnMnLCAnbWFwJ107XG4gICAgICAgICAgICAgICAgaWYgKHZhbHMuaW5jbHVkZXMoZGF0YS5iYXIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldEFjdGl2ZU1lbnUoZGF0YS5iYXIpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHNldFNlYXJjaERhdGEoZGF0YSwgZGF0YS5iYXIpO1xuICAgICAgICAgICAgICAgICQoJy5oYXMtdGlwJykuZm91bmRhdGlvbigpO1xuICAgICAgICAgICAgICAgICQoJy5kcm9wZG93bi1wYW5lJykuZm91bmRhdGlvbigpO1xuICAgICAgICAgICAgICAgICQoJy5rci1wcm9wZXJ0eSAuY2FyZCcpLmZvdW5kYXRpb24oKTtcbiAgICAgICAgICAgICAgICAkKCcja3Itb3JkZXItY2xvc2UnKS50cmlnZ2VyKCdjbGljaycpO1xuICAgICAgICAgICAgICAgIHNlYXJjaERvbmUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRTZWFyY2hEYXRhKHJlc3BvbnNlLCBhY3Rpb24gPSAnJykge1xuICAgICAgICBpZiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICQoJyNrci1wcm9wZXJ0aWVzLWRhdGEnKS5lbXB0eSgpLmZhZGVJbignc2xvdycpLmh0bWwocmVzcG9uc2VbJ2l0ZW1zJ10pLmZvdW5kYXRpb24oKTtcbiAgICAgICAgICAgICQoJyNrci1wcm9wZXJ0aWVzLWZpbHRlci1oZWFkaW5nJykuaHRtbChyZXNwb25zZVsnaGVhZGluZyddKTtcbiAgICAgICAgICAgICQoJy5rci1wYWdlcicpLmh0bWwocmVzcG9uc2VbJ3BhZ2luYXRpb24nXSk7XG4gICAgICAgICAgICAkKFwiI2tyLW9mZmNhbnZhcy1wcm9wZXJ0aWVzLWZpbHRlclwiKS5odG1sKHJlc3BvbnNlWydmaWx0ZXJzJ10pO1xuICAgICAgICAgICAgJChcIiNrci1vZmZjYW52YXMtcHJvcGVydGllcy1zb3J0YnlcIikuaHRtbChyZXNwb25zZVsnc29ydGJ5J10pO1xuLy8gICAgICAgICAgICAkKFwiI2tyLW9mZmNhbnZhcy10b3Atc2VhcmNoXCIpLmh0bWwocmVzcG9uc2VbJ3NlYXJjaCddKTtcblxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlWydzZWFyY2gnXS5sZW5ndGggJiYgJCgnI2Fycml2YWxkc3AnKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAkKCdib2R5JykudHJpZ2dlcignaW5pdGFqYXhzZWFyY2gnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJCgnLnNpZGViYXIgLmtyLWZpbHRlcnMgdWwuZmlsdGVyLXNvcnQtbGlzdCBsaS5oZWFkJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XG4gICAgICAgICAgICAgICAgICAgICQodGhpcykucGFyZW50KCkuY2hpbGRyZW4oJ2xpLmNoZWNrYm94Jykuc2hvdygpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICQodGhpcykucGFyZW50KCkuY2hpbGRyZW4oJ2xpLmNoZWNrYm94JykuaGlkZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAoYWN0aW9uID09PSAncGFnZScpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRBY3RpdmVNZW51KGJhcikge1xuICAgICAgICBjb25zdCBzZWFyY2hiYXIgPSAkKCcua3Itc2VhcmNoYmFyJykuZmluZCgnLmJ1dHRvbicpO1xuICAgICAgICAkLmVhY2goc2VhcmNoYmFyLCBmdW5jdGlvbiAoaW5kZXgsIHNlYXJjaGJhcikge1xuICAgICAgICAgICAgJChzZWFyY2hiYXIpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgfSk7XG4gICAgICAgICQoJy5rci1zZWFyY2hiYXIgLmJ1dHRvbi4nICsgYmFyKS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIHRydWUgaWYgd2lkdGggaGFzIGNoYW5nZWRcbiAgICBmdW5jdGlvbiBzY3JlZW5XaWR0aEhhc0NoYW5nZWQoKSB7XG4gICAgICAgIGxhcmdlID0gRm91bmRhdGlvbi5NZWRpYVF1ZXJ5LmF0TGVhc3QoJ2xhcmdlJyk7XG4gICAgICAgIGlmIChsYXJnZSAhPT0gc2F2ZWR3aWR0aCkge1xuICAgICAgICAgICAgc2F2ZWR3aWR0aCA9IGxhcmdlO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoZWNrU2NyZWVuV2lkdGgoKSB7XG4gICAgICAgIHJlc2l6ZWQgPSBmYWxzZTtcbiAgICAgICAgaWYgKHNjcmVlbldpZHRoSGFzQ2hhbmdlZCgpICYmIHNlYXJjaERhdGFbJ2l0ZW1zJ10gJiYgIXJlc2l6ZWQpIHtcbiAgICAgICAgICAgIHNldFNlYXJjaERhdGEoc2VhcmNoRGF0YSk7XG4gICAgICAgICAgICByZXNpemVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgICQuZXZlbnQuc3BlY2lhbC50b3VjaHN0YXJ0ID0ge1xuICAgICAgICBzZXR1cDogZnVuY3Rpb24gKF8sIG5zLCBoYW5kbGUpIHtcbiAgICAgICAgICAgIGlmIChucy5pbmNsdWRlcyhcIm5vUHJldmVudERlZmF1bHRcIikpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIGhhbmRsZSwge3Bhc3NpdmU6IGZhbHNlfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgaGFuZGxlLCB7cGFzc2l2ZTogdHJ1ZX0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICAkLmV2ZW50LnNwZWNpYWwudG91Y2htb3ZlID0ge1xuICAgICAgICBzZXR1cDogZnVuY3Rpb24gKF8sIG5zLCBoYW5kbGUpIHtcbiAgICAgICAgICAgIGlmIChucy5pbmNsdWRlcyhcIm5vUHJldmVudERlZmF1bHRcIikpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIiwgaGFuZGxlLCB7cGFzc2l2ZTogZmFsc2V9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsIGhhbmRsZSwge3Bhc3NpdmU6IHRydWV9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG59KGpRdWVyeSkpOyIsIi8qKlxuICogQHBhY2thZ2UgICAgS25vdyBSZXNlcnZhdGlvbnNcbiAqIEBzdWJwYWNrYWdlIFNpdGUgSlNcbiAqIEBjb3B5cmlnaHQgIDIwMjAgSGlnaGxhbmQgVmlzaW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogQGxpY2Vuc2UgICAgU2VlIHRoZSBmaWxlIFwiTElDRU5TRS50eHRcIiBmb3IgdGhlIGZ1bGwgbGljZW5zZSBnb3Zlcm5pbmcgdGhpcyBjb2RlLlxuICogQGF1dGhvciAgICAgSGF6ZWwgV2lsc29uIDxoYXplbEBoaWdobGFuZHZpc2lvbi5jb20+XG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoJCkge1xuXHRpZiAoIXdpbmRvdy5sb2NhdGlvbi5vcmlnaW4pXG5cdFx0d2luZG93LmxvY2F0aW9uLm9yaWdpbiA9IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCArIFwiLy9cIiArIHdpbmRvdy5sb2NhdGlvbi5ob3N0O1xuXG5cdGxldCBsYW5nID0gJChcIiNrci1sYW5nXCIpLmRhdGEoJ2tybGFuZycpO1xuXHRsZXQgbXlDb25maXJtLCAkbXlUYXNrO1xuXG5cdGNsYXNzIEtyY29uZmlybSB7XG5cdFx0Y29uc3RydWN0b3IoJGZvcm0pIHtcblx0XHRcdHRoaXMuZm9ybSA9ICRmb3JtO1xuXHRcdFx0dGhpcy5pbml0KCk7XG5cdFx0fVxuXG5cdFx0aW5pdCgpIHtcblx0XHRcdHRoaXMudXBkYXRlUXVvdGUodGhpcy5mb3JtKTtcblx0XHR9XG5cblx0XHR1cGRhdGVRdW90ZSgkZm9ybSkge1xuXHRcdFx0JG15VGFzayA9ICQoJyNteXRhc2snKTtcblx0XHRcdCRteVRhc2sudmFsKCdjb25maXJtLmNvbXB1dGUnKTtcblx0XHRcdGpRdWVyeS5hamF4KHtcblx0XHRcdFx0dHlwZTogICAgICdQT1NUJyxcblx0XHRcdFx0dXJsOiAgICAgICdpbmRleC5waHA/b3B0aW9uPWNvbV9rbm93cmVzJnRhc2s9Y29uZmlybS5jb21wdXRlJmxhbmc9JyArIGxhbmcsXG5cdFx0XHRcdGRhdGE6ICAgICAkZm9ybS5zZXJpYWxpemVBcnJheSgpLFxuXHRcdFx0XHRkYXRhVHlwZTogJ2pzb24nLFxuXHRcdFx0XHRzdWNjZXNzOiAgZnVuY3Rpb24gKHJlc3VsdCkge1xuXHRcdFx0XHRcdCRteVRhc2sudmFsKCdjb25maXJtLnBheW1lbnQnKTtcblx0XHRcdFx0XHRpZiAocmVzdWx0LnN1Y2Nlc3MpIHtcblx0XHRcdFx0XHRcdGNvbnN0IGRhdGEgPSByZXN1bHQuZGF0YTtcblx0XHRcdFx0XHRcdGlmIChkYXRhLmhhc093blByb3BlcnR5KCdyZWRpcmVjdCcpKSB7XG5cdFx0XHRcdFx0XHRcdHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKGRhdGEucmVkaXJlY3QpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0bGV0IGRpdjtcblx0XHRcdFx0XHRcdCQuZWFjaChyZXN1bHQuZGF0YS5yZXNwb25zZSwgZnVuY3Rpb24gKGtleSwgdmFsKSB7XG5cdFx0XHRcdFx0XHRcdCQoJy5oaWRlaW5pdGlhbCcpLnNob3coKTtcblx0XHRcdFx0XHRcdFx0ZGl2ID0gXCIjXCIgKyBrZXk7XG5cdFx0XHRcdFx0XHRcdCQoZGl2KS50ZXh0KHZhbCk7XG5cdFx0XHRcdFx0XHRcdCQoZGl2KS5odG1sKHZhbCk7XG5cdFx0XHRcdFx0XHRcdCQoZGl2KS52YWwodmFsKTtcblx0XHRcdFx0XHRcdFx0JChkaXYpLnNob3coKTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHQkKCcua3ItYWpheC1tb2RhbC1lcnJvci1tZXNzYWdlJykuaHRtbChyZXN1bHQubWVzc2FnZSk7XG5cdFx0XHRcdFx0XHRjb25zdCAkbW9kYWwgPSBuZXcgRm91bmRhdGlvbi5SZXZlYWwoJCgnI0tyQWpheE1vZGFsRXJyb3InKSk7XG5cdFx0XHRcdFx0XHQkbW9kYWwub3BlbigpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cblx0JChmdW5jdGlvbiAoKSB7XG5cdFx0bGV0ICRlbGVtZW50ID0gJCgnI2tyLWZvcm0tY29uZmlybScpO1xuXHRcdGlmICgkZWxlbWVudC5sZW5ndGgpIHtcblx0XHRcdG15Q29uZmlybSA9IG5ldyBLcmNvbmZpcm0oJGVsZW1lbnQpO1xuXHRcdH1cblx0XHQkZWxlbWVudC5vbignY2hhbmdlIGNsaWNrJywgJy5rci1jYWxjdWxhdGUnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0JGVsZW1lbnQgPSAkKCcja3ItZm9ybS1jb25maXJtJyk7XG5cdFx0XHRteUNvbmZpcm0udXBkYXRlUXVvdGUoJGVsZW1lbnQpO1xuXHRcdH0pO1xuXG5cdFx0JChkb2N1bWVudCkub24oJ2NsaWNrJywgJyNjaGVja3Rlcm1zJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGlmIChjaGVja1Rlcm1zKCkpIHtcblx0XHRcdFx0JCgnI2NoZWNrdGVybXMnKS50cmlnZ2VyKCdzdWJtaXQnKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fSk7XG5cblx0Ly8gbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG5cdGZ1bmN0aW9uIGNoZWNrVGVybXMoKSB7XG5cdFx0bGV0IHJlc3VsdCA9IHRydWU7XG5cdFx0Y29uc3QgdGVzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZ3JlZWNoZWNrJyk7XG5cdFx0Y29uc3QgdGVzdGMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWdyZWVjaGVja2MnKTtcblx0XHRjb25zdCB0ZXN0dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZ3JlZWNoZWNrdCcpO1xuXG5cdFx0Ly8gbm9pbnNwZWN0aW9uIEpTVW5yZXNvbHZlZFZhcmlhYmxlXG5cdFx0aWYgKHRlc3QgJiYgIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdrci1mb3JtLXBheW1lbnQnKS5hZ3JlZWNoZWNrLmNoZWNrZWQpIHtcblx0XHRcdHJlc3VsdCA9IGZhbHNlO1xuXHRcdH1cblx0XHQvLyBub2luc3BlY3Rpb24gSlNVbnJlc29sdmVkVmFyaWFibGVcblx0XHRpZiAodGVzdGMgJiYgIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdrci1mb3JtLXBheW1lbnQnKS5hZ3JlZWNoZWNrYy5jaGVja2VkKSB7XG5cdFx0XHRyZXN1bHQgPSBmYWxzZTtcblx0XHR9XG5cdFx0Ly8gbm9pbnNwZWN0aW9uIEpTVW5yZXNvbHZlZFZhcmlhYmxlXG5cdFx0aWYgKHRlc3R0ICYmICFkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgna3ItZm9ybS1wYXltZW50JykuYWdyZWVjaGVja3QuY2hlY2tlZCkge1xuXHRcdFx0cmVzdWx0ID0gZmFsc2U7XG5cdFx0fVxuXG5cdFx0aWYgKHJlc3VsdCkge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnN0ICRtb2RhbCA9IG5ldyBGb3VuZGF0aW9uLlJldmVhbCgkKCcjZXJyb3JNb2RhbCcpKTtcblx0XHRcdCRtb2RhbC5vcGVuKCk7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHR9XG59KGpRdWVyeSkpOyIsIi8qKlxuICogQHBhY2thZ2UgICAgS25vdyBSZXNlcnZhdGlvbnNcbiAqIEBzdWJwYWNrYWdlIFNpdGUgSlNcbiAqIEBjb3B5cmlnaHQgIDIwMjAgSGlnaGxhbmQgVmlzaW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogQGxpY2Vuc2UgICAgU2VlIHRoZSBmaWxlIFwiTElDRU5TRS50eHRcIiBmb3IgdGhlIGZ1bGwgbGljZW5zZSBnb3Zlcm5pbmcgdGhpcyBjb2RlLlxuICogQGF1dGhvciAgICAgSGF6ZWwgV2lsc29uIDxoYXplbEBoaWdobGFuZHZpc2lvbi5jb20+XG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbmlmICghd2luZG93LmxvY2F0aW9uLm9yaWdpbikge1xuXHR3aW5kb3cubG9jYXRpb24ub3JpZ2luID0gd2luZG93LmxvY2F0aW9uLnByb3RvY29sICsgXCIvL1wiICsgd2luZG93LmxvY2F0aW9uLmhvc3Q7XG59XG5cbihmdW5jdGlvbiAoJCkge1xuXHRsZXQgbXlLckRvYkVudHJ5O1xuXHRsZXQgdG9kYXk7XG5cdGxldCBrZXkgPSB7QkFDS1NQQUNFOiA4fTtcblxuXHRsZXQgc2V0dGluZ3MgPSB7XG5cdFx0Y3VzdG9tX3ZhbGlkYXRpb246ICAgICBmYWxzZSxcblx0XHRkYXlzX2luX21vbnRoOiAgICAgICAgIFszMSwgMjksIDMxLCAzMCwgMzEsIDMwLCAzMSwgMzEsIDMwLCAzMSwgMzAsIDMxXSxcblx0XHRkb2N1bWVudF9kYXRlOiAgICAgICAgIGZhbHNlLFxuXHRcdGVycm9yYm94X3g6ICAgICAgICAgICAgMSxcblx0XHRlcnJvcmJveF95OiAgICAgICAgICAgIDUsXG5cdFx0ZmllbGRfaGludF90ZXh0X2RheTogICAnREQnLFxuXHRcdGZpZWxkX2hpbnRfdGV4dF9tb250aDogJ01NJyxcblx0XHRmaWVsZF9oaW50X3RleHRfeWVhcjogICdZWVlZJyxcblx0XHRmaWVsZF9vcmRlcjogICAgICAgICAgICdETVknLFxuXHRcdGZpZWxkX3dpZHRoX2RheTogICAgICAgNixcblx0XHRmaWVsZF93aWR0aF9tb250aDogICAgIDYsXG5cdFx0ZmllbGRfd2lkdGhfeWVhcjogICAgICA3LFxuXHRcdGZpZWxkX3dpZHRoX3NlcDogICAgICAgMixcblx0XHRtaW5tYXg6ICAgICAgICAgICAgICAgICcnLFxuXHRcdG1pbl9kYXRlOiAgICAgICAgICAgICAgZmFsc2UsXG5cdFx0bWF4X2RhdGU6ICAgICAgICAgICAgICBmYWxzZSxcblx0XHRtaW5feWVhcjogICAgICAgICAgICAgIDE5MTAsXG5cdFx0bW9udGhfbmFtZTogICAgICAgICAgICBbXG5cdFx0XHQnSmFudWFyeScsICdGZWJydWFyeScsICdNYXJjaCcsICdBcHJpbCcsXG5cdFx0XHQnTWF5JywgJ0p1bmUnLCAnSnVseScsICdBdWd1c3QnLCAnU2VwdGVtYmVyJyxcblx0XHRcdCdPY3RvYmVyJywgJ05vdmVtYmVyJywgJ0RlY2VtYmVyJ10sXG5cdFx0b25fYmx1cjogICAgICAgICAgICAgICBmYWxzZSxcblx0XHRvbl9lcnJvcjogICAgICAgICAgICAgIGZhbHNlLFxuXHRcdG9uX2NoYW5nZTogICAgICAgICAgICAgZmFsc2UsXG5cdFx0cGFyc2VfZGF0ZTogICAgICAgICAgICB0cnVlLFxuXHRcdHNlcGFyYXRvcjogICAgICAgICAgICAgJy8nLFxuXHRcdHNob3dfZXJyb3JzOiAgICAgICAgICAgdHJ1ZSxcblx0XHRzaG93X2hpbnRzOiAgICAgICAgICAgIHRydWUsXG5cdFx0RV9EQVlfTkFOOiAgICAgICAgICAgICAnRGF5IG11c3QgYmUgYSBudW1iZXInLFxuXHRcdEVfREFZX1RPT19CSUc6ICAgICAgICAgJ0RheSBtdXN0IGJlIDEtMzEnLFxuXHRcdEVfREFZX1RPT19TTUFMTDogICAgICAgJ0RheSBtdXN0IGJlIDEtMzEnLFxuXHRcdEVfQkFEX0RBWV9GT1JfTU9OVEg6ICAgJ09ubHkgJWQgZGF5cyBpbiAlbSAleScsXG5cdFx0RV9NT05USF9OQU46ICAgICAgICAgICAnTW9udGggbXVzdCBiZSBhIG51bWJlcicsXG5cdFx0RV9NT05USF9UT09fQklHOiAgICAgICAnTW9udGggbXVzdCBiZSAxLTEyJyxcblx0XHRFX01PTlRIX1RPT19TTUFMTDogICAgICdNb250aCBjYW5ub3QgYmUgMCcsXG5cdFx0RV9ZRUFSX05BTjogICAgICAgICAgICAnWWVhciBtdXN0IGJlIGEgbnVtYmVyJyxcblx0XHRFX1lFQVJfTEVOR1RIOiAgICAgICAgICdZZWFyIG11c3QgYmUgNCBkaWdpdHMnLFxuXHRcdEVfWUVBUl9UT09fU01BTEw6ICAgICAgJ1llYXIgbXVzdCBub3QgYmUgYmVmb3JlICV5Jyxcblx0XHRFX01JTl9EQVRFOiAgICAgICAgICAgICdEYXRlIG11c3Qgbm90IGJlIGluIHRoZSBwYXN0Jyxcblx0XHRFX01BWF9EQVRFOiAgICAgICAgICAgICdEYXRlIG11c3Qgbm90IGJlIGluIHRoZSBmdXR1cmUnXG5cdH07XG5cblx0Y2xhc3MgS3JEb2JFbnRyeSB7XG5cdFx0Y29uc3RydWN0b3IoJGVsZW1lbnQsIG9wdGlvbnMpIHtcblx0XHRcdHRvZGF5ID0gS3JEb2JFbnRyeS5nZXRZbWQobmV3IERhdGUoKSk7XG5cblx0XHRcdHRoaXMuaW5wdXRfZGF5ID0gMDtcblx0XHRcdHRoaXMuaW5wdXRfbW9udGggPSAwO1xuXHRcdFx0dGhpcy5pbnB1dF95ZWFyID0gMDtcblx0XHRcdHRoaXMuJGVsZW1lbnQgPSAkZWxlbWVudDtcblx0XHRcdGlmIChvcHRpb25zKSB7XG5cdFx0XHRcdCQuZXh0ZW5kKHNldHRpbmdzLCBvcHRpb25zKTtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5pbml0KCk7XG5cdFx0fVxuXG5cdFx0c3RhdGljIGdldFltZChkYXRlKSB7XG5cdFx0XHRjb25zdCBtID0gZGF0ZS5nZXRNb250aCgpICsgMTtcblx0XHRcdGNvbnN0IGQgPSBkYXRlLmdldERheSgpO1xuXG5cdFx0XHRyZXR1cm4gKGRhdGUuZ2V0RnVsbFllYXIoKSArICctJyArIChtIDwgMTAgPyAnMCcgOiAnJykgKyBtICsgJy0nICsgKGQgPCAxMCA/ICcwJyA6ICcnKSArIGQpO1xuXHRcdH1cblxuXHRcdHN0YXRpYyBnZXRZbWRPYmplY3QoZGF0ZSkge1xuXHRcdFx0cmV0dXJuIChkYXRlLnllYXIgKyAnLScgKyBkYXRlLm1vbnRoICsgJy0nICsgZGF0ZS5kYXkpO1xuXHRcdH1cblxuXHRcdGFkZEVudHJ5RmllbGRzKCkge1xuXHRcdFx0bGV0IGRvYmZpZWxkID0gdGhpcztcblx0XHRcdGRvYmZpZWxkLmZpZWxkcyA9IFtdO1xuXHRcdFx0JC5lYWNoKHNldHRpbmdzLmZpZWxkX29yZGVyLnNwbGl0KCcnKSwgZnVuY3Rpb24gKGksIGZpZWxkKSB7XG5cdFx0XHRcdHN3aXRjaCAoZmllbGQpIHtcblx0XHRcdFx0XHRjYXNlICdEJzpcblx0XHRcdFx0XHRcdGRvYmZpZWxkLmJ1aWxkRmllbGQoJ2RheScsIGkpO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSAnTSc6XG5cdFx0XHRcdFx0XHRkb2JmaWVsZC5idWlsZEZpZWxkKCdtb250aCcsIGkpO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSAnWSc6XG5cdFx0XHRcdFx0XHRkb2JmaWVsZC5idWlsZEZpZWxkKCd5ZWFyJywgaSk7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRkZWZhdWx0IDpcblx0XHRcdFx0XHRcdHRocm93IFwiVW5leHBlY3RlZCBmaWVsZCBvcmRlciAnXCIgKyBmaWVsZCArIFwiJyBleHBlY3RlZCBELCBNIG9yIFlcIjtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0YWZ0ZXJQYXN0ZSh0YXJnZXQpIHtcblx0XHRcdGlmICh0aGlzLnBhcnNlRGF0ZSgkKHRhcmdldCkudmFsKCkpKSB7XG5cdFx0XHRcdHRoaXMuc2V0RGF0ZSgkKHRhcmdldCkudmFsKCkpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGJ1aWxkRmllbGQobmFtZSwgaW5kZXgpIHtcblx0XHRcdGxldCBrcmRvYmVudHJ5ID0gdGhpcztcblx0XHRcdGxldCBpbnB1dCA9IG5ldyBLckRvYklucHV0KHtcblx0XHRcdFx0bmFtZTogICAgICAgbmFtZSxcblx0XHRcdFx0a3Jkb2JlbnRyeToga3Jkb2JlbnRyeSxcblx0XHRcdFx0aW5kZXg6ICAgICAgaW5kZXgsXG5cdFx0XHRcdGhpbnRfdGV4dDogIHNldHRpbmdzLnNob3dfaGludHMgPyBzZXR0aW5nc1snZmllbGRfaGludF90ZXh0XycgKyBuYW1lXSA6IG51bGwsXG5cdFx0XHR9KTtcblxuXHRcdFx0dGhpcy5pbm5lci5hcHBlbmQoaW5wdXQuJGlucHV0KTtcblx0XHRcdHRoaXNbJ2lucHV0XycgKyBuYW1lXSA9IGlucHV0O1xuXG5cdFx0XHRpZiAoaW5kZXggPCAyKSB7XG5cdFx0XHRcdHRoaXMuaW5uZXIuYXBwZW5kKCQoJzxzcGFuIGNsYXNzPVwic2VwYXJhdG9yXCIgLz4nKS50ZXh0KHNldHRpbmdzLnNlcGFyYXRvcikpO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLmZpZWxkc1tpbmRleF0gPSBpbnB1dDtcblx0XHRcdHRoaXNbbmFtZV0gPSBpbnB1dDtcblx0XHR9XG5cblx0XHRidWlsZFVpKCkge1xuXHRcdFx0bGV0IGRvYmZpZWxkID0gdGhpcztcblx0XHRcdHRoaXMud3JhcHBlciA9ICQodGhpcy4kZWxlbWVudC53cmFwKCc8c3BhbiBjbGFzcz1cImpxLWR0ZVwiIC8+JykucGFyZW50KClbMF0pO1xuXHRcdFx0dGhpcy5pbm5lciA9ICQoJzxzcGFuIGNsYXNzPVwianEtZHRlLWlubmVyXCIgLz4nKTtcblx0XHRcdHRoaXMuYWRkRW50cnlGaWVsZHMoKTtcblx0XHRcdHRoaXMuZXJyb3Jib3ggPSAkKCc8c3BhbiBjbGFzcz1cImpxLWR0ZS1lcnJvcmJveFwiIC8+JykuaGlkZSgpO1xuXHRcdFx0dGhpcy5pbm5lci5vbigncGFzdGUnLCAnaW5wdXQnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRsZXQgaW5wdXQgPSB0aGlzO1xuXHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRkb2JmaWVsZC5hZnRlclBhc3RlKGlucHV0LCBlKTtcblx0XHRcdFx0fSwgMik7XG5cdFx0XHR9KTtcblx0XHRcdHRoaXMud3JhcHBlci5hcHBlbmQodGhpcy5pbm5lciwgdGhpcy5lcnJvcmJveCk7XG5cdFx0XHR0aGlzLnNldEZpZWxkV2lkdGhzKCk7XG5cdFx0XHR0aGlzLiRlbGVtZW50LmhpZGUoKTtcblx0XHR9XG5cblx0XHRjaGVja0RvY3VtZW50KGRvYiwgY2hpbGRkb2IsIGNsYXNzbmFtZSkge1xuXHRcdFx0bGV0IGVsZW1lbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShjbGFzc25hbWUpO1xuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRpZiAobmV3IERhdGUoZG9iKSA+IG5ldyBEYXRlKGNoaWxkZG9iKSkge1xuXHRcdFx0XHRcdGVsZW1lbnRzW2ldLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0ZWxlbWVudHNbaV0uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRjbGVhcigpIHtcblx0XHRcdHRoaXMuY2xlYXJFcnJvcignJyk7XG5cdFx0XHR0aGlzLnNldERhdGUoJycpO1xuXHRcdH1cblxuXHRcdGNsZWFyRXJyb3IoKSB7XG5cdFx0XHRkZWxldGUgdGhpcy5lcnJvcl90ZXh0O1xuXHRcdFx0dGhpcy5zaG93RXJyb3IoKTtcblx0XHR9XG5cblx0XHRkZXN0cm95KCkge1xuXHRcdFx0dGhpcy4kZWxlbWVudC5zaG93KCk7XG5cdFx0XHR0aGlzLiRlbGVtZW50LmNzcygnZGlzcGxheScsICcnKTtcblx0XHRcdHRoaXMud3JhcHBlci5maW5kKCdzcGFuJykucmVtb3ZlKCk7XG5cdFx0XHR0aGlzLiRlbGVtZW50LnVud3JhcCgpO1xuXHRcdFx0dGhpcy4kZWxlbWVudC5yZW1vdmVEYXRhKCdkYXRldGV4dGVudHJ5Jyk7XG5cdFx0XHRkZWxldGUgdGhpcy5pbm5lcjtcblx0XHRcdGRlbGV0ZSB0aGlzLndyYXBwZXI7XG5cdFx0XHRkZWxldGUgdGhpcy4kZWxlbWVudDtcblx0XHR9XG5cblx0XHRmb2N1cygpIHtcblx0XHRcdHRoaXMuZmllbGRzWzBdLnNldEZvY3VzKHRydWUpO1xuXHRcdH1cblxuXHRcdGZvY3VzRmllbGRCZWZvcmUoaW5wdXQpIHtcblx0XHRcdGNvbnN0IGluZGV4ID0gaW5wdXQuaW5kZXg7XG5cdFx0XHRpZiAoaW5kZXggPCAxKSB7XG5cdFx0XHRcdHJldHVyblxuXHRcdFx0fVxuXHRcdFx0dGhpcy5maWVsZHNbaW5kZXhdLnlpZWxkRm9jdXMoKTtcblx0XHRcdHRoaXMuZmllbGRzW2luZGV4IC0gMV0uc2V0Rm9jdXModHJ1ZSk7XG5cdFx0XHQvLyBsZXQgbmV4dCA9IHRoaXMuZmllbGRzW2luZGV4IC0gMV07XG5cdFx0XHQvLyBsZXQgdmFsID0gbmV4dC5nZXQoKTtcblx0XHRcdC8vIG5leHQuc2V0Rm9jdXMoZmFsc2UpO1xuXHRcdH1cblxuXHRcdGZvY3VzRmllbGRBZnRlcihpbnB1dCkge1xuXHRcdFx0Y29uc3QgaW5kZXggPSBpbnB1dC5pbmRleDtcblx0XHRcdGlmIChpbmRleCA+IDEpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5maWVsZHNbaW5kZXhdLnlpZWxkRm9jdXMoKTtcblx0XHRcdHRoaXMuZmllbGRzW2luZGV4ICsgMV0uc2V0Rm9jdXModHJ1ZSk7XG5cdFx0fVxuXG5cdFx0Zm9jdXNJbigpIHtcblx0XHRcdHRoaXMud3JhcHBlci5hZGRDbGFzcygnZm9jdXMnKTtcblx0XHR9XG5cblx0XHRmb2N1c091dCgpIHtcblx0XHRcdGlmIChzZXR0aW5ncy5vbl9ibHVyKSB7XG5cdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdHNlbGYud2lkZ2V0Rm9jdXNMb3N0KCk7XG5cdFx0XHRcdH0sIDIpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy53cmFwcGVyLnJlbW92ZUNsYXNzKCdmb2N1cycpO1xuXHRcdH1cblxuXHRcdGdldERhdGUoKSB7XG5cdFx0XHRyZXR1cm4gKHRoaXMuZGF5X3ZhbHVlICYmIHRoaXMubW9udGhfdmFsdWUgJiYgdGhpcy55ZWFyX3ZhbHVlKVxuXHRcdFx0ICAgICAgID8ge2RheTogdGhpcy5kYXlfdmFsdWUsIG1vbnRoOiB0aGlzLm1vbnRoX3ZhbHVlLCB5ZWFyOiB0aGlzLnllYXJfdmFsdWV9XG5cdFx0XHQgICAgICAgOiBudWxsO1xuXHRcdH1cblxuXHRcdGluaXQoKSB7XG5cdFx0XHRpZiAoIXNldHRpbmdzLm1pbl95ZWFyKVxuXHRcdFx0XHRzZXR0aW5ncy5taW5feWVhciA9ICcxOTEwJztcblxuXHRcdFx0dGhpcy5idWlsZFVpKCk7XG5cdFx0XHR0aGlzLnNldERhdGUodGhpcy4kZWxlbWVudC5hdHRyKCd2YWx1ZScpKTtcblx0XHRcdHRoaXMucHJveHlMYWJlbENsaWNrcygpO1xuXHRcdH1cblxuXHRcdHBhcnNlRGF0ZSh0ZXh0KSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5wYXJzZUlzb0RhdGUodGV4dCk7XG5cdFx0fVxuXG5cdFx0cGFyc2VJc29EYXRlKHRleHQpIHtcblx0XHRcdHJldHVybiB0ZXh0ICYmIHRleHQubWF0Y2goL14oXFxkXFxkXFxkXFxkKS0oXFxkXFxkKS0oXFxkXFxkKS8pID8ge1xuXHRcdFx0XHRkYXk6ICAgUmVnRXhwLiQzLFxuXHRcdFx0XHRtb250aDogUmVnRXhwLiQyLFxuXHRcdFx0XHR5ZWFyOiAgUmVnRXhwLiQxXG5cdFx0XHR9IDogbnVsbDtcblx0XHR9XG5cblx0XHRwcm94eUxhYmVsQ2xpY2tzKCkge1xuXHRcdFx0bGV0IGRvYmZpZWxkID0gdGhpcztcblx0XHRcdGxldCBpZCA9IHRoaXMuJGVsZW1lbnQuYXR0cignaWQnKTtcblx0XHRcdGlmICghaWQpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0JCgnbGFiZWxbZm9yPScgKyBpZCArICddJykuY2xpY2soZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRkb2JmaWVsZC5mb2N1cygpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0c2V0RGF0ZShuZXdfZGF0ZSkge1xuXHRcdFx0bGV0IGRvYmZpZWxkID0gdGhpcztcblx0XHRcdG5ld19kYXRlID0gdGhpcy5wYXJzZURhdGUobmV3X2RhdGUpO1xuXHRcdFx0ZGVsZXRlIHRoaXMuZGF5X3ZhbHVlO1xuXHRcdFx0ZGVsZXRlIHRoaXMubW9udGhfdmFsdWU7XG5cdFx0XHRkZWxldGUgdGhpcy55ZWFyX3ZhbHVlO1xuXHRcdFx0dGhpcy5pbnB1dF9kYXkuc2V0KG5ld19kYXRlID8gbmV3X2RhdGUuZGF5IDogJycpO1xuXHRcdFx0dGhpcy5pbnB1dF9tb250aC5zZXQobmV3X2RhdGUgPyBuZXdfZGF0ZS5tb250aCA6ICcnKTtcblx0XHRcdHRoaXMuaW5wdXRfeWVhci5zZXQobmV3X2RhdGUgPyBuZXdfZGF0ZS55ZWFyIDogJycpO1xuXHRcdFx0dGhpcy5jbGVhckVycm9yKCk7XG5cdFx0XHR0aGlzLiRlbGVtZW50LnZhbChuZXdfZGF0ZSk7XG5cdFx0XHRpZiAobmV3X2RhdGUpIHtcblx0XHRcdFx0JC5lYWNoKHRoaXMuZmllbGRzLCBmdW5jdGlvbiAoaSwgaW5wdXQpIHtcblx0XHRcdFx0XHRkb2JmaWVsZC52YWxpZGF0ZShpbnB1dCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHNldEVycm9yKGVycm9yX3RleHQpIHtcblx0XHRcdHRoaXMuZXJyb3JfdGV4dCA9IGVycm9yX3RleHQ7XG5cdFx0XHR0aGlzLnNob3dFcnJvcigpO1xuXHRcdH1cblxuXHRcdHNldEZpZWxkV2lkdGhzKCkge1xuXHRcdFx0bGV0IGF2YWlsYWJsZSA9IHRoaXMuJGVsZW1lbnQud2lkdGgoKSAtIDI7XG5cdFx0XHRsZXQgdG90YWwgPSBzZXR0aW5ncy5maWVsZF93aWR0aF95ZWFyICsgc2V0dGluZ3MuZmllbGRfd2lkdGhfc2VwICsgc2V0dGluZ3MuZmllbGRfd2lkdGhfbW9udGggK1xuXHRcdFx0XHRzZXR0aW5ncy5maWVsZF93aWR0aF9zZXAgKyBzZXR0aW5ncy5maWVsZF93aWR0aF9kYXk7XG5cdFx0XHR0aGlzLmlucHV0X2RheS5zZXRXaWR0aChNYXRoLmZsb29yKHNldHRpbmdzLmZpZWxkX3dpZHRoX2RheSAqIGF2YWlsYWJsZSAvIHRvdGFsKSk7XG5cdFx0XHR0aGlzLmlucHV0X21vbnRoLnNldFdpZHRoKE1hdGguZmxvb3Ioc2V0dGluZ3MuZmllbGRfd2lkdGhfbW9udGggKiBhdmFpbGFibGUgLyB0b3RhbCkpO1xuXHRcdFx0dGhpcy5pbnB1dF95ZWFyLnNldFdpZHRoKE1hdGguZmxvb3Ioc2V0dGluZ3MuZmllbGRfd2lkdGhfeWVhciAqIGF2YWlsYWJsZSAvIHRvdGFsKSk7XG5cdFx0fVxuXG5cdFx0c2V0UmVhZG9ubHkobW9kZSkge1xuXHRcdFx0aWYgKG1vZGUgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRtb2RlID0gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdHRoaXMuaW5wdXRfZGF5LnNldFJlYWRvbmx5KG1vZGUpO1xuXHRcdFx0dGhpcy5pbnB1dF9tb250aC5zZXRSZWFkb25seShtb2RlKTtcblx0XHRcdHRoaXMuaW5wdXRfeWVhci5zZXRSZWFkb25seShtb2RlKTtcblx0XHRcdGlmIChtb2RlKSB7XG5cdFx0XHRcdHRoaXMud3JhcHBlci5hZGRDbGFzcygncmVhZG9ubHknKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMud3JhcHBlci5yZW1vdmVDbGFzcygncmVhZG9ubHknKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRzaG93RXJyb3IoKSB7XG5cdFx0XHRsZXQgZXJyb3JfdGV4dCA9IHRoaXMud2lkZ2V0RXJyb3JUZXh0KCk7XG5cdFx0XHRpZiAodGhpcy5vbl9lcnJvcikge1xuXHRcdFx0XHR0aGlzLm9uX2Vycm9yKGVycm9yX3RleHQpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCFzZXR0aW5ncy5zaG93X2Vycm9ycykge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRpZiAoZXJyb3JfdGV4dCA9PT0gJycpIHtcblx0XHRcdFx0dGhpcy5lcnJvcmJveC5oaWRlKCk7XG5cdFx0XHRcdHRoaXMuZXJyb3Jib3gudGV4dCgnJyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRsZXQgeF9vZmZzZXQgPSAodGhpcy5pbm5lci5vdXRlcldpZHRoKCkgKyBzZXR0aW5ncy5lcnJvcmJveF94KSArICdweCc7XG5cdFx0XHRcdGxldCB5X29mZnNldCA9IHNldHRpbmdzLmVycm9yYm94X3kgKyAncHgnO1xuXHRcdFx0XHR0aGlzLmVycm9yYm94LmNzcyh7ZGlzcGxheTogJ2Jsb2NrJywgcG9zaXRpb246ICdhYnNvbHV0ZScsIHRvcDogeV9vZmZzZXQsIGxlZnQ6IHhfb2Zmc2V0fSk7XG5cdFx0XHRcdHRoaXMuZXJyb3Jib3gudGV4dChlcnJvcl90ZXh0KTtcblx0XHRcdFx0dGhpcy5lcnJvcmJveC5zaG93KCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dmFsaWRhdGUoY3VycmVudF9pbnB1dCkge1xuXHRcdFx0dGhpcy4kZWxlbWVudC52YWwoJycpO1xuXHRcdFx0aWYgKGN1cnJlbnRfaW5wdXQpIHtcblx0XHRcdFx0Y29uc3QgdHlwZSA9IGN1cnJlbnRfaW5wdXQubmFtZTtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRpZiAodHlwZSA9PT0gJ2RheScpIHtcblx0XHRcdFx0XHRcdHRoaXMudmFsaWRhdGVEYXkoKTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHR5cGUgPT09ICdtb250aCcpIHtcblx0XHRcdFx0XHRcdHRoaXMudmFsaWRhdGVNb250aCgpO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAodHlwZSA9PT0gJ3llYXInKSB7XG5cdFx0XHRcdFx0XHR0aGlzLnZhbGlkYXRlWWVhcigpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRjdXJyZW50X2lucHV0LmNsZWFyRXJyb3IoKTtcblx0XHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRcdGN1cnJlbnRfaW5wdXQuc2V0RXJyb3IoZSk7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAodGhpcy5kYXlfdmFsdWUgJiYgdGhpcy5tb250aF92YWx1ZSkge1xuXHRcdFx0XHR0aGlzLmNsZWFyRXJyb3IoKTtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHR0aGlzLnZhbGlkYXRlRGF5c0luTW9udGgoKTtcblx0XHRcdFx0XHRpZiAodGhpcy55ZWFyX3ZhbHVlICYmIHRoaXMueWVhcl92YWx1ZS5sZW5ndGggPT09IDQpIHtcblx0XHRcdFx0XHRcdHRoaXMudmFsaWRhdGVDb21wbGV0ZURhdGUoKTtcblx0XHRcdFx0XHRcdGxldCBkYXRlX3N0ciA9IEtyRG9iRW50cnkuZ2V0WW1kT2JqZWN0KHRoaXMuZ2V0RGF0ZSgpKTtcblx0XHRcdFx0XHRcdHRoaXMuJGVsZW1lbnQudmFsKGRhdGVfc3RyKTtcblx0XHRcdFx0XHRcdGlmICh0aGlzLiRlbGVtZW50LmRhdGEoJ2NoaWxkZG9iJykpIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5jaGVja0RvY3VtZW50KGRhdGVfc3RyLCB0aGlzLiRlbGVtZW50LmRhdGEoJ2NoaWxkZG9iJyksIHRoaXMuJGVsZW1lbnQuYXR0cignaWQnKSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdFx0dGhpcy5zZXRFcnJvcihlKTtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuY2xlYXJFcnJvcigpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHR2YWxpZGF0ZUNvbXBsZXRlRGF0ZSgpIHtcblx0XHRcdGNvbnN0IGRhdGVfb2JqID0gdGhpcy5nZXREYXRlKCk7XG5cdFx0XHRjb25zdCBkYXRlX2lzbyA9IEtyRG9iRW50cnkuZ2V0WW1kT2JqZWN0KGRhdGVfb2JqKTtcblx0XHRcdHNldHRpbmdzLm1pbm1heCA9IHRoaXMuJGVsZW1lbnQuZGF0YSgndmFsaWRhdGlvbicpO1xuXG5cdFx0XHRpZiAoc2V0dGluZ3MubWlubWF4ID09PSAnbWF4Jykge1xuXHRcdFx0XHRpZiAoZGF0ZV9pc28gPiB0b2RheSkge1xuXHRcdFx0XHRcdHRocm93KHNldHRpbmdzLkVfTUFYX0RBVEUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAoc2V0dGluZ3MubWlubWF4ID09PSAnbWluJykge1xuXHRcdFx0XHRpZiAoZGF0ZV9pc28gPCB0b2RheSkge1xuXHRcdFx0XHRcdHRocm93KHNldHRpbmdzLkVfTUlOX0RBVEUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIGxldCBtYXhfZGF0ZSA9IHNldHRpbmdzLm1heF9kYXRlO1xuXHRcdFx0Ly8gaWYgKHR5cGVvZiBtYXhfZGF0ZSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0Ly8gXHRtYXhfZGF0ZSA9IG1heF9kYXRlLmNhbGwodGhpcyk7XG5cdFx0XHQvLyB9XG5cdFx0XHQvLyBpZiAodHlwZW9mIG1heF9kYXRlID09PSAnc3RyaW5nJykge1xuXHRcdFx0Ly8gXHRtYXhfZGF0ZSA9IHRoaXMucGFyc2VEYXRlKG1heF9kYXRlKTtcblx0XHRcdC8vIH1cblx0XHRcdC8vIGlmIChtYXhfZGF0ZSkge1xuXHRcdFx0Ly8gXHRpZiAoZGF0ZV9pc28gPiBzZXR0aW5ncy5tYXhfZGF0ZSkge1xuXHRcdFx0Ly8gXHRcdHRocm93KHNldHRpbmdzLkVfTUFYX0RBVEUpO1xuXHRcdFx0Ly8gXHR9XG5cdFx0XHQvLyB9XG5cblx0XHRcdGlmICh0aGlzLmN1c3RvbV92YWxpZGF0aW9uKSB7XG5cdFx0XHRcdGRhdGVfb2JqLmRhdGUgPSBuZXcgRGF0ZShcblx0XHRcdFx0XHRwYXJzZUludChkYXRlX29iai55ZWFyLCAxMCksXG5cdFx0XHRcdFx0cGFyc2VJbnQoZGF0ZV9vYmoubW9udGgsIDEwKSAtIDEsXG5cdFx0XHRcdFx0cGFyc2VJbnQoZGF0ZV9vYmouZGF5LCAxMClcblx0XHRcdFx0KTtcblx0XHRcdFx0dGhpcy5jdXN0b21fdmFsaWRhdGlvbihkYXRlX29iaik7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dmFsaWRhdGVEYXkoKSB7XG5cdFx0XHRsZXQgb3B0ID0gc2V0dGluZ3M7XG5cdFx0XHRsZXQgaW5wdXQgPSB0aGlzLmlucHV0X2RheTtcblx0XHRcdHRoaXMuZGF5X3ZhbHVlID0gdW5kZWZpbmVkO1xuXHRcdFx0bGV0IHRleHQgPSBpbnB1dC5nZXQoKTtcblx0XHRcdGlmICh0ZXh0ID09PSAnJyB8fCAodGV4dCA9PT0gJzAnICYmIGlucHV0Lmhhc19mb2N1cykpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHRleHQubWF0Y2goL1xcRC8pKSB7XG5cdFx0XHRcdHRocm93KG9wdC5FX0RBWV9OQU4pO1xuXHRcdFx0fVxuXHRcdFx0bGV0IG51bSA9IHBhcnNlSW50KHRleHQsIDEwKTtcblx0XHRcdGlmIChudW0gPCAxKSB7XG5cdFx0XHRcdHRocm93KG9wdC5FX0RBWV9UT09fU01BTEwpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKG51bSA+IDMxKSB7XG5cdFx0XHRcdHRocm93KG9wdC5FX0RBWV9UT09fQklHKTtcblx0XHRcdH1cblx0XHRcdHRleHQgPSBudW0gPCAxMCA/ICcwJyArIG51bSA6ICcnICsgbnVtO1xuXHRcdFx0aWYgKCFpbnB1dC5oYXNfZm9jdXMpIHtcblx0XHRcdFx0aW5wdXQuc2V0KHRleHQpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5kYXlfdmFsdWUgPSB0ZXh0O1xuXHRcdH1cblxuXHRcdHZhbGlkYXRlRGF5c0luTW9udGgoKSB7XG5cdFx0XHRjb25zdCBkYXkgPSBwYXJzZUludCh0aGlzLmRheV92YWx1ZSwgMTApO1xuXHRcdFx0Y29uc3QgbW9udGggPSBwYXJzZUludCh0aGlzLm1vbnRoX3ZhbHVlLCAxMCk7XG5cdFx0XHRjb25zdCB5ZWFyID0gcGFyc2VJbnQodGhpcy55ZWFyX3ZhbHVlLCAxMCk7XG5cdFx0XHRpZiAoZGF5IDwgMSB8fCBtb250aCA8IDEpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0bGV0IG1heCA9IHNldHRpbmdzLmRheXNfaW5fbW9udGhbbW9udGggLSAxXTtcblx0XHRcdGxldCBtc2cgPSBzZXR0aW5ncy5FX0JBRF9EQVlfRk9SX01PTlRIO1xuXHRcdFx0aWYgKG1vbnRoID09PSAyICYmICgnJyArIHllYXIpLmxlbmd0aCA9PT0gNCkge1xuXHRcdFx0XHRtYXggPSB5ZWFyICUgNCA/IDI4IDogeWVhciAlIDEwMCA/IDI5IDogeWVhciAlIDQwMCA/IDI4IDogMjk7XG5cdFx0XHRcdG1zZyA9IG1zZy5yZXBsYWNlKC8leS8sIHllYXIudG9TdHJpbmcoKSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRtc2cgPSBtc2cucmVwbGFjZSgvIColeS8sICcnKTtcblx0XHRcdH1cblx0XHRcdGlmIChkYXkgPiBtYXgpIHtcblx0XHRcdFx0dGhyb3cobXNnLnJlcGxhY2UoLyVkLywgbWF4LnRvU3RyaW5nKCkpLnJlcGxhY2UoLyVtLywgc2V0dGluZ3MubW9udGhfbmFtZVttb250aCAtIDFdKSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dmFsaWRhdGVNb250aCgpIHtcblx0XHRcdGxldCBpbnB1dCA9IHRoaXMuaW5wdXRfbW9udGg7XG5cdFx0XHR0aGlzLm1vbnRoX3ZhbHVlID0gdW5kZWZpbmVkO1xuXHRcdFx0bGV0IHRleHQgPSBpbnB1dC5nZXQoKTtcblx0XHRcdGlmICh0ZXh0ID09PSAnJyB8fCAodGV4dCA9PT0gJzAnICYmIGlucHV0Lmhhc19mb2N1cykpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHRleHQubWF0Y2goL1xcRC8pKSB7XG5cdFx0XHRcdHRocm93KHNldHRpbmdzLkVfTU9OVEhfTkFOKTtcblx0XHRcdH1cblx0XHRcdGxldCBudW0gPSBwYXJzZUludCh0ZXh0LCAxMCk7XG5cdFx0XHRpZiAobnVtIDwgMSkge1xuXHRcdFx0XHR0aHJvdyhzZXR0aW5ncy5FX01PTlRIX1RPT19TTUFMTCk7XG5cdFx0XHR9XG5cdFx0XHRpZiAobnVtID4gMTIpIHtcblx0XHRcdFx0dGhyb3coc2V0dGluZ3MuRV9NT05USF9UT09fQklHKTtcblx0XHRcdH1cblx0XHRcdHRleHQgPSBudW0gPCAxMCA/ICcwJyArIG51bSA6ICcnICsgbnVtO1xuXHRcdFx0aWYgKCFpbnB1dC5oYXNfZm9jdXMpIHtcblx0XHRcdFx0aW5wdXQuc2V0KHRleHQpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5tb250aF92YWx1ZSA9IHRleHQ7XG5cdFx0fVxuXG5cdFx0dmFsaWRhdGVZZWFyKCkge1xuXHRcdFx0Y29uc3QgaW5wdXQgPSB0aGlzLmlucHV0X3llYXI7XG5cdFx0XHR0aGlzLnllYXJfdmFsdWUgPSB1bmRlZmluZWQ7XG5cdFx0XHRsZXQgdGV4dCA9IGlucHV0LmdldCgpO1xuXHRcdFx0aWYgKHRleHQgPT09ICcnIHx8ICh0ZXh0ID09PSAnMCcgJiYgaW5wdXQuaGFzX2ZvY3VzKSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRpZiAodGV4dC5tYXRjaCgvXFxELykpIHtcblx0XHRcdFx0dGhyb3coc2V0dGluZ3MuRV9ZRUFSX05BTik7XG5cdFx0XHR9XG5cdFx0XHRpZiAoaW5wdXQuaGFzX2ZvY3VzKSB7XG5cdFx0XHRcdGlmICh0ZXh0Lmxlbmd0aCA+IDQpIHtcblx0XHRcdFx0XHR0aHJvdyhzZXR0aW5ncy5FX1lFQVJfTEVOR1RIKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKHRleHQubGVuZ3RoICE9PSA0KSB7XG5cdFx0XHRcdFx0dGhyb3coc2V0dGluZ3MuRV9ZRUFSX0xFTkdUSCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmICh0ZXh0Lmxlbmd0aCA9PT0gNCkge1xuXHRcdFx0XHRjb25zdCBudW0gPSBwYXJzZUludCh0ZXh0LCAxMCk7XG5cdFx0XHRcdGlmIChzZXR0aW5ncy5taW5feWVhciAmJiBudW0gPCBzZXR0aW5ncy5taW5feWVhcikge1xuXHRcdFx0XHRcdHRocm93KHNldHRpbmdzLkVfWUVBUl9UT09fU01BTEwucmVwbGFjZSgvJXkvLCBzZXR0aW5ncy5taW5feWVhcikpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHR0aGlzLnllYXJfdmFsdWUgPSB0ZXh0O1xuXHRcdH1cblxuXHRcdHdpZGdldEVycm9yVGV4dCgpIHtcblx0XHRcdGxldCBlcnJvcl90ZXh0ID0gJyc7XG5cdFx0XHQkLmVhY2godGhpcy5maWVsZHMsIGZ1bmN0aW9uIChpLCBpbnB1dCkge1xuXHRcdFx0XHRpZiAoaW5wdXQuZXJyb3JfdGV4dCkge1xuXHRcdFx0XHRcdGlmIChpbnB1dC5oYXNfZm9jdXMgfHwgZXJyb3JfdGV4dCA9PT0gJycpIHtcblx0XHRcdFx0XHRcdGVycm9yX3RleHQgPSBpbnB1dC5lcnJvcl90ZXh0XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdGlmIChlcnJvcl90ZXh0ID09PSAnJyAmJiB0aGlzLmVycm9yX3RleHQpIHtcblx0XHRcdFx0ZXJyb3JfdGV4dCA9IHRoaXMuZXJyb3JfdGV4dDtcblx0XHRcdH1cblx0XHRcdHJldHVybiBlcnJvcl90ZXh0O1xuXHRcdH1cblxuXHRcdHdpZGdldEZvY3VzTG9zdCgpIHtcblx0XHRcdGlmIChzZXR0aW5ncy5vbl9ibHVyICYmICF0aGlzLndyYXBwZXIuaXMoJy5mb2N1cycpKSB7XG5cdFx0XHRcdHNldHRpbmdzLm9uQmx1cigpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGNsYXNzIEtyRG9iSW5wdXQge1xuXHRcdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcblx0XHRcdGNvbnN0IGlucHV0ID0gdGhpcztcblx0XHRcdHRoaXMuZG9iZmllbGQgPSBvcHRpb25zLmtyZG9iZW50cnk7XG5cdFx0XHR0aGlzLm5hbWUgPSBvcHRpb25zLm5hbWU7XG5cdFx0XHR0aGlzLmluZGV4ID0gb3B0aW9ucy5pbmRleDtcblx0XHRcdHRoaXMuaGludF90ZXh0ID0gb3B0aW9ucy5oaW50X3RleHQ7XG5cdFx0XHR0aGlzLmhhc19mb2N1cyA9IGZhbHNlO1xuXHRcdFx0dGhpcy5lbXB0eSA9IHRydWU7XG5cdFx0XHR0aGlzLiRpbnB1dCA9ICQoJzxpbnB1dCB0eXBlPVwidGV4dFwiIHZhbHVlPVwiXCIgLz4nKS5hZGRDbGFzcygnanEtZHRlLScgKyB0aGlzLm5hbWUpLmF0dHIoJ2FyaWEtbGFiZWwnLCAnJyArIFwiIChcIiArIHRoaXMuaGludF90ZXh0ICsgXCIpXCIpLmZvY3VzKCQucHJveHkoaW5wdXQsICdmb2N1cycpKS5ibHVyKCQucHJveHkoaW5wdXQsICdibHVyJykpLmtleWRvd24oZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0aW5wdXQua2V5ZG93bihlKTtcblx0XHRcdFx0fSwgMilcblx0XHRcdH0pLmtleXVwKGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdGlucHV0LmtleXVwKGUpO1xuXHRcdFx0XHR9LCAyKVxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0Ymx1cigpIHtcblx0XHRcdHRoaXMuaGFzX2ZvY3VzID0gZmFsc2U7XG5cdFx0XHR0aGlzLmRvYmZpZWxkLmZvY3VzT3V0KCk7XG5cdFx0XHR0aGlzLnNob3dfaGludCgpO1xuXHRcdFx0dGhpcy5kb2JmaWVsZC52YWxpZGF0ZSh0aGlzKTtcblx0XHR9XG5cblx0XHRjbGVhckVycm9yKCkge1xuXHRcdFx0ZGVsZXRlIHRoaXMuZXJyb3JfdGV4dDtcblx0XHRcdHRoaXMuJGlucHV0LnJlbW92ZUNsYXNzKCdlcnJvcicpO1xuXHRcdH1cblxuXHRcdGZvY3VzKCkge1xuXHRcdFx0dGhpcy5rZXlfaXNfZG93biA9IGZhbHNlO1xuXHRcdFx0aWYgKHRoaXMuJGlucHV0LnByb3AoJ3JlYWRvbmx5JykpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5oYXNfZm9jdXMgPSB0cnVlO1xuXHRcdFx0dGhpcy5kb2JmaWVsZC5mb2N1c0luKCk7XG5cdFx0XHRpZiAodGhpcy4kaW5wdXQuaGFzQ2xhc3MoJ2hpbnQnKSkge1xuXHRcdFx0XHR0aGlzLiRpbnB1dC52YWwoJycpLnJlbW92ZUNsYXNzKCdoaW50Jyk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLmRvYmZpZWxkLnNob3dFcnJvcigpO1xuXHRcdH1cblxuXHRcdGdldCgpIHtcblx0XHRcdGxldCB2YWwgPSB0aGlzLiRpbnB1dC52YWwoKTtcblx0XHRcdHJldHVybiB2YWwgPT09IHRoaXMuaGludF90ZXh0ID8gJycgOiB2YWw7XG5cdFx0fVxuXG5cdFx0aXNEaWdpdEtleShlKSB7XG5cdFx0XHRsZXQga2V5Y29kZSA9IGUud2hpY2g7XG5cdFx0XHRyZXR1cm4ga2V5Y29kZSA+PSA0OCAmJiBrZXljb2RlIDw9IDU3IHx8IGtleWNvZGUgPj0gOTYgJiYga2V5Y29kZSA8PSAxMDU7XG5cdFx0fVxuXG5cdFx0a2V5ZG93bigpIHtcblx0XHRcdC8vIElnbm9yZSBrZXl1cCBldmVudHMgdGhhdCBhcnJpdmUgYWZ0ZXIgZm9jdXMgbW92ZWQgdG8gbmV4dCBmaWVsZFxuXHRcdFx0dGhpcy5rZXlfaXNfZG93biA9IHRydWU7XG5cdFx0fVxuXG5cdFx0a2V5dXAoZSkge1xuXHRcdFx0aWYgKCF0aGlzLmtleV9pc19kb3duKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdC8vIEhhbmRsZSBCYWNrc3BhY2UgLSBzaGlmdGluZyBmb2N1cyB0byBwcmV2aW91cyBmaWVsZCBpZiByZXF1aXJlZFxuXHRcdFx0bGV0IGtleWNvZGUgPSBlLndoaWNoO1xuXHRcdFx0aWYgKGtleWNvZGUgPT09IGtleS5CQUNLU1BBQ0UgJiYgdGhpcy5lbXB0eSkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5kb2JmaWVsZC5mb2N1c0ZpZWxkQmVmb3JlKHRoaXMpO1xuXHRcdFx0fVxuXHRcdFx0bGV0IHRleHQgPSB0aGlzLmdldCgpO1xuXHRcdFx0dGhpcy5lbXB0eSA9IHRleHQgPT09ICcnO1xuXG5cdFx0XHQvLyBUcmFwIGFuZCBkaXNjYXJkIHNlcGFyYXRvciBjaGFyYWN0ZXJzIC0gYWR2YW5jaW5nIGZvY3VzIGlmIHJlcXVpcmVkXG5cdFx0XHRpZiAodGV4dC5tYXRjaCgvW1xcL1xcXFwuIC1dLykpIHtcblx0XHRcdFx0dGV4dCA9IHRleHQucmVwbGFjZSgvW1xcL1xcXFwuIC1dLywgJycpO1xuXHRcdFx0XHR0aGlzLnNldCh0ZXh0KTtcblx0XHRcdFx0aWYgKCF0aGlzLmVtcHR5ICYmIHRoaXMuaW5kZXggPCAyKSB7XG5cdFx0XHRcdFx0dGhpcy5kb2JmaWVsZC5mb2N1c0ZpZWxkQWZ0ZXIodGhpcyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gQWR2YW5jZSBmb2N1cyBpZiB0aGlzIGZpZWxkIGlzIGJvdGggdmFsaWQgYW5kIGZ1bGxcblx0XHRcdGlmICh0aGlzLmRvYmZpZWxkLnZhbGlkYXRlKHRoaXMpKSB7XG5cdFx0XHRcdGxldCB3YW50ID0gdGhpcy5uYW1lID09PSAneWVhcicgPyA0IDogMjtcblx0XHRcdFx0aWYgKHRoaXMuaXNEaWdpdEtleShlKSAmJiB0ZXh0Lmxlbmd0aCA9PT0gd2FudCkge1xuXHRcdFx0XHRcdHRoaXMuZG9iZmllbGQuZm9jdXNGaWVsZEFmdGVyKHRoaXMpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0bGVmdCgpIHtcblx0XHRcdHJldHVybiB0aGlzLiRpbnB1dC5wb3NpdGlvbigpLmxlZnQ7XG5cdFx0fVxuXG5cdFx0c2V0KG5ld192YWx1ZSkge1xuXHRcdFx0dGhpcy4kaW5wdXQudmFsKG5ld192YWx1ZSkucmVtb3ZlQ2xhc3MoJ2hpbnQnKTtcblx0XHRcdGlmICghdGhpcy5oYXNfZm9jdXMpIHtcblx0XHRcdFx0dGhpcy5zaG93X2hpbnQoKTtcblx0XHRcdH1cblx0XHRcdHRoaXMuZW1wdHkgPSBuZXdfdmFsdWUgPT09ICcnO1xuXHRcdFx0dGhpcy5jbGVhckVycm9yKCk7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9XG5cblx0XHRzZXRFcnJvcih0ZXh0KSB7XG5cdFx0XHR0aGlzLmVycm9yX3RleHQgPSB0ZXh0O1xuXHRcdFx0dGhpcy4kaW5wdXQuYWRkQ2xhc3MoJ2Vycm9yJyk7XG5cdFx0XHR0aGlzLmRvYmZpZWxkLnNob3dFcnJvcigpO1xuXHRcdH1cblxuXHRcdHNldEZvY3VzKHNlbGVjdF9hbGwpIHtcblx0XHRcdGxldCAkaW5wdXQgPSB0aGlzLiRpbnB1dDtcblx0XHRcdCRpbnB1dC5mb2N1cygpO1xuXHRcdFx0aWYgKHNlbGVjdF9hbGwpIHtcblx0XHRcdFx0JGlucHV0LnNlbGVjdCgpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0JGlucHV0LnZhbCgkaW5wdXQudmFsKCkpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fVxuXG5cdFx0c2V0V2lkdGgobmV3X3dpZHRoKSB7XG5cdFx0XHR0aGlzLiRpbnB1dC53aWR0aChuZXdfd2lkdGgpO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fVxuXG5cdFx0c2hvd19oaW50KCkge1xuXHRcdFx0aWYgKHRoaXMuZ2V0KCkgPT09ICcnICYmIHR5cGVvZiAodGhpcy5oaW50X3RleHQpID09PSAnc3RyaW5nJykge1xuXHRcdFx0XHR0aGlzLiRpbnB1dC52YWwodGhpcy5oaW50X3RleHQpLmFkZENsYXNzKCdoaW50Jyk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9XG5cblx0XHR5aWVsZEZvY3VzKCkge1xuXHRcdFx0dGhpcy4kaW5wdXQuYmx1cigpO1xuXHRcdH1cblx0fVxuXG5cdCQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcblx0XHQkKCcuZG9iaXNzdWUnKS5lYWNoKGZ1bmN0aW9uICgpIHtcblx0XHRcdG15S3JEb2JFbnRyeSA9IG5ldyBLckRvYkVudHJ5KCQodGhpcyksIHt9KTtcblx0XHR9KTtcblx0fSk7XG59KGpRdWVyeSkpOyIsIi8vIG5vaW5zcGVjdGlvbiBEdXBsaWNhdGVkQ29kZVxuXG4vKipcbiAqIEBwYWNrYWdlICAgIEtub3cgUmVzZXJ2YXRpb25zXG4gKiBAc3VicGFja2FnZSBBZG1pbiBKU1xuICogQGNvcHlyaWdodCAgMjAyMCBIaWdobGFuZCBWaXNpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBAbGljZW5zZSAgICBTZWUgdGhlIGZpbGUgXCJMSUNFTlNFLnR4dFwiIGZvciB0aGUgZnVsbCBsaWNlbnNlIGdvdmVybmluZyB0aGlzIGNvZGUuXG4gKiBAYXV0aG9yICAgICBIYXplbCBXaWxzb24gPGhhemVsQGhpZ2hsYW5kdmlzaW9uLmNvbT5cbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgkKSB7XG5cdCQoZnVuY3Rpb24gKCkge1xuXHRcdGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaG93dG9hcnJpdmUnKSkge1xuXHRcdFx0Y29uc3QgaG93dG9hcnJpdmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaG93dG9hcnJpdmUnKTtcblx0XHRcdGxldCBhcnJpdmFsbWVhbnMgPSBob3d0b2Fycml2ZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtbWVhbnMnKTtcblx0XHRcdGlmICghYXJyaXZhbG1lYW5zKSB7XG5cdFx0XHRcdGFycml2YWxtZWFucyA9ICdhaXInO1xuXHRcdFx0fVxuXHRcdFx0ZGlzcGxheUFycml2YWwoYXJyaXZhbG1lYW5zKTtcblx0XHR9XG5cblx0XHQkKCdib2R5Jykub24oJ2NsaWNrJywgJy5hbWl0ZW0nLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0ZGlzcGxheUFycml2YWwoJCh0aGlzKS5hdHRyKCdpZCcpKTtcblx0XHR9KTtcblx0fSk7XG5cblx0ZnVuY3Rpb24gZGlzcGxheUFycml2YWwodmFsdWUpIHtcblx0XHRsZXQgeCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FtaXRlbScpO1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgeC5sZW5ndGg7IGkrKykge1xuXHRcdFx0eFtpXS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcblx0XHR9XG5cblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWlyLWRhdGEnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0cmFpbi1kYXRhJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXV0by1kYXRhJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3RoZXItZGF0YScpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cdFx0bGV0IGFycml2YWxkYXRhID0gdmFsdWUgKyAnLWRhdGEnO1xuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGFycml2YWxkYXRhKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh2YWx1ZSkuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2pmb3JtX2Fycml2YWxfbWVhbnMnKS52YWx1ZSA9IHZhbHVlO1xuXHR9XG59KShqUXVlcnkpOyIsIi8qKlxuICogQHBhY2thZ2UgICAgS25vdyBSZXNlcnZhdGlvbnNcbiAqIEBzdWJwYWNrYWdlIFNpdGUgSlNcbiAqIEBjb3B5cmlnaHQgIDIwMjAgSGlnaGxhbmQgVmlzaW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogQGxpY2Vuc2UgICAgU2VlIHRoZSBmaWxlIFwiTElDRU5TRS50eHRcIiBmb3IgdGhlIGZ1bGwgbGljZW5zZSBnb3Zlcm5pbmcgdGhpcyBjb2RlLlxuICogQGF1dGhvciAgICAgSGF6ZWwgV2lsc29uIDxoYXplbEBoaWdobGFuZHZpc2lvbi5jb20+XG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IGxhbmcgPSBcImVuXCI7XG5cbihmdW5jdGlvbiAoJCkge1xuXHRjb25zdCBtYXJrZXJzaGFwZSA9IHtcblx0XHR0eXBlOiAgICdwb2x5Jyxcblx0XHRjb29yZHM6IFsxLCAxLCAxLCAzMiwgMzcsIDMyLCAzMiwgMV1cblx0fTtcblxuXHRsZXQgbXlLcm1hcDtcblx0bGV0IG1hcERhdGEgPSBmYWxzZTtcblx0bGV0IG1hcDtcblx0bGV0IG1hcFpvb207XG5cdGxldCBpbmZvV2luZG93O1xuXHRsZXQgaW5mb1dpbmRvdzI7XG5cdGxldCBib3VuZHM7XG5cdGxldCBwcm9wZXJ0eWRpdjtcblx0bGV0IHByb3BlcnR5aWNvbjtcblx0bGV0IG1jO1xuLy9cdGxldCBiaWNvbjtcbi8vXHRsZXQgaGljb247XG4vL1x0bGV0IGxhcmdlX3NsaWRlc2hvdyA9IGZhbHNlO1xuXG5cdGxldCBzZXR0aW5ncyA9IHtcblx0XHRwcm9wZXJ0eU1hcmtlcnM6IFtdLFxuXHRcdGZpbHRlcklkczogICAgICAgW10sXG5cdFx0bWFwTWFya2VyczogICAgICBbXSxcblx0XHRtYXBUeXBlSWQ6ICAgICAgICcnLFxuXHRcdG1hcFpvb206ICAgICAgICAgMCxcblx0XHRtYXBNYXhab29tOiAgICAgIDIwLFxuXHRcdG1hcFR5cGU6ICAgICAgICAgJycsXG5cdFx0bWFwSWQ6ICAgICAgICAgICAnJyxcblx0XHRtYXJrZXJDb2xvcjogICAgICdyZWQnLFxuXHR9O1xuXG5cdGNsYXNzIEtybWFwIHtcblx0XHRjb25zdHJ1Y3RvcihzZXR0aW5ncykge1xuXHRcdFx0dGhpcy5zZXR0aW5ncyA9IHNldHRpbmdzO1xuXG5cdFx0XHQvL0luaXRpYWxpc2UgbWFwIG9wdGlvbnNcblx0XHRcdHRoaXMuZ21PcHRpb25zID0ge1xuXHRcdFx0XHRzY3JvbGx3aGVlbDogICAgICAgZmFsc2UsXG5cdFx0XHRcdHpvb206ICAgICAgICAgICAgICB0aGlzLnNldHRpbmdzLm1hcFpvb20sXG5cdFx0XHRcdG1heFpvb206ICAgICAgICAgICB0aGlzLnNldHRpbmdzLm1hcE1heFpvb20sXG5cdFx0XHRcdG1hcFR5cGVJZDogICAgICAgICB0aGlzLnNldHRpbmdzLm1hcFR5cGVJZCxcblx0XHRcdFx0c3RyZWV0Vmlld0NvbnRyb2w6IGZhbHNlXG5cdFx0XHR9O1xuXG5cdFx0XHRtYXBab29tID0gdGhpcy5zZXR0aW5ncy5tYXBab29tO1xuXHRcdFx0dGhpcy5nbWFya2VycyA9IFtdO1xuXHRcdFx0dGhpcy5jb3VudCA9IDA7XG5cblx0XHRcdHRoaXMuaW5pdE1hcCgpO1xuXHRcdH1cblxuXHRcdHN0YXRpYyBjbG9zZUtySW5mb3dpbmRvdygpIHtcblx0XHRcdCQoJyNrci1pbmZvd2luZG93JykuaGlkZSgpO1xuXHRcdFx0aW5mb1dpbmRvdy5jbG9zZSgpO1xuXHRcdFx0aW5mb1dpbmRvdzIuY2xvc2UoKTtcblx0XHR9XG5cblx0XHQvLyBvbmx5IHNob3cgdmlzaWJsZSBtYXJrZXJzXG5cdFx0c3RhdGljIHNob3dWaXNpYmxlTWFya2VycyhtYXJrZXJzKSB7XG5cdFx0XHRsZXQgYm91bmRzID0gbWFwLmdldEJvdW5kcygpO1xuXHRcdFx0bGV0IGNvdW50ID0gMDtcblxuXHRcdFx0Zm9yIChsZXQgZCA9IDA7IGQgPCBtYXJrZXJzLmxlbmd0aDsgZCsrKSB7XG5cdFx0XHRcdGxldCBtYXJrZXIgPSBtYXJrZXJzW2RdO1xuXG5cdFx0XHRcdGlmIChtYXJrZXIudHlwZSA9PT0gJ21hcCcpIHtcblx0XHRcdFx0XHRpZiAoYm91bmRzLmNvbnRhaW5zKG1hcmtlci5nZXRQb3NpdGlvbigpKSA9PT0gdHJ1ZSkge1xuXHRcdFx0XHRcdFx0bWFya2VyLnNldFZpc2libGUodHJ1ZSk7XG5cdFx0XHRcdFx0XHRjb3VudCsrO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRtYXJrZXIuc2V0VmlzaWJsZShmYWxzZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBjb3VudDtcblx0XHR9XG5cblx0XHQvLyBDaGVjayBNYXJrZXJzIGFycmF5IGZvciBkdXBsaWNhdGUgcG9zaXRpb24gYW5kIG9mZnNldCBhIGxpdHRsZVxuXHRcdGNoZWNrRHVwbGljYXRlKGN1cnJlbnQpIHtcblx0XHRcdGlmICh0aGlzLmdtYXJrZXJzLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0bGV0IGR1cHMgPSAwO1xuXG5cdFx0XHRcdGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLmdtYXJrZXJzLmxlbmd0aDsgaW5kZXgrKykge1xuXHRcdFx0XHRcdGxldCBwb3MgPSB0aGlzLmdtYXJrZXJzW2luZGV4XS5nZXRQb3NpdGlvbigpO1xuXHRcdFx0XHRcdGlmIChjdXJyZW50LmVxdWFscyhwb3MpKSB7XG5cdFx0XHRcdFx0XHRkdXBzKys7XG5cdFx0XHRcdFx0XHRsZXQgYSA9IDM2MC4wIC8gZHVwcztcblx0XHRcdFx0XHRcdGxldCBuZXdMYXQgPSBwb3MubGF0KCkgKyAtLjAwMDAyICogTWF0aC5jb3MoKCthICogZHVwcykgLyAxODAgKiBNYXRoLlBJKTsgIC8veFxuXHRcdFx0XHRcdFx0bGV0IG5ld0xuZyA9IHBvcy5sbmcoKSArIC0uMDAwMDAgKiBNYXRoLnNpbigoK2EgKiBkdXBzKSAvIDE4MCAqIE1hdGguUEkpOyAgLy9ZXG5cdFx0XHRcdFx0XHRjdXJyZW50ID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhuZXdMYXQsIG5ld0xuZyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBjdXJyZW50O1xuXHRcdH1cblxuXHRcdGNoZWNrWm9vbSgpIHtcblx0XHRcdGlmIChtYXBab29tID4gMCkge1xuXHRcdFx0XHRsZXQgbXlsaXN0ZW5lciA9IG1hcC5hZGRMaXN0ZW5lcignaWRsZScsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRpZiAobWFwWm9vbSA+IDAgJiYgbWFwLmdldFpvb20oKSAhPT0gbWFwWm9vbSkge1xuXHRcdFx0XHRcdFx0bWFwLnNldFpvb20obWFwWm9vbSk7XG5cdFx0XHRcdFx0XHRteWxpc3RlbmVyLnJlbW92ZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Y2x1c3Rlck1hcCgpIHtcblx0XHRcdGNvbnN0IG1jT3B0aW9ucyA9IHtcblx0XHRcdFx0Z3JpZFNpemU6ICAgICAgICAgICAgMjAsXG5cdFx0XHRcdGlnbm9yZUhpZGRlbk1hcmtlcnM6IHRydWUsXG5cdFx0XHRcdGltYWdlUGF0aDogICAgICAgICAgICcvbWVkaWEvY29tX2tub3dyZXMvaW1hZ2VzL21hcmtlcmNsdXN0ZXJlci9tJ1xuXHRcdFx0fTtcblxuXHRcdFx0dGhpcy5zZXRQcm9wZXJ0eU1hcmtlcnMoKTtcblx0XHRcdHRoaXMuc2V0TWFwTWFya2VycygpO1xuXG5cdFx0XHRmb3IgKGxldCBkID0gMDsgZCA8IHRoaXMuZ21hcmtlcnMubGVuZ3RoOyBkKyspIHtcblx0XHRcdFx0bGV0IG1hcmtlciA9IHRoaXMuZ21hcmtlcnNbZF07XG5cdFx0XHRcdGlmIChtYXJrZXIudHlwZSA9PT0gJ3Byb3BlcnR5Jykge1xuXHRcdFx0XHRcdGlmICh0aGlzLnNldHRpbmdzLmZpbHRlcklkcy5pbmNsdWRlcyhtYXJrZXIucGlkKSkge1xuXHRcdFx0XHRcdFx0bWFya2VyLnNldFZpc2libGUodHJ1ZSk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdG1hcmtlci5zZXRWaXNpYmxlKGZhbHNlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0bWMgPSBuZXcgTWFya2VyQ2x1c3RlcmVyKG1hcCwgdGhpcy5nbWFya2VycywgbWNPcHRpb25zKTtcblx0XHRcdGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKG1jLCBcImNsdXN0ZXJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdCQoJyNrci1pbmZvd2luZG93JykuaGlkZSgpO1xuXHRcdFx0XHRpbmZvV2luZG93LmNsb3NlKCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0bWFwLmZpdEJvdW5kcyhib3VuZHMpO1xuXHRcdFx0bWFwLnNldENlbnRlcihib3VuZHMuZ2V0Q2VudGVyKCkpO1xuXHRcdH1cblxuXHRcdC8vIENyZWF0ZSB0aGUgTWFwXG5cdFx0Y3JlYXRlTWFwKCkge1xuXHRcdFx0bWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnNldHRpbmdzLm1hcElkKSwgdGhpcy5nbU9wdGlvbnMpO1xuXHRcdFx0aW5mb1dpbmRvdyA9IG5ldyBnb29nbGUubWFwcy5JbmZvV2luZG93KCk7XG5cdFx0XHRpbmZvV2luZG93MiA9IG5ldyBnb29nbGUubWFwcy5JbmZvV2luZG93KCk7XG5cdFx0XHRib3VuZHMgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nQm91bmRzKCk7XG5cdFx0fVxuXG5cdFx0Ly8gQ3JlYXRlIHRoZSBtYXJrZXIgYW5kIHNldCB1cCB0aGUgZXZlbnQgd2luZG93XG5cdFx0Y3JlYXRlTWFwTWFya2VyKHBvaW50LCBodG1sLCBpbWFnZSwgYm94aW5mbywgbGluaywgdGl0bGUpIHtcblx0XHRcdGxldCBtYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcblx0XHRcdFx0c2hhcGU6ICAgIG1hcmtlcnNoYXBlLFxuXHRcdFx0XHRsaW5rOiAgICAgbGluayxcblx0XHRcdFx0aWNvbjogICAgIGltYWdlLFxuXHRcdFx0XHRwb3NpdGlvbjogcG9pbnQsXG5cdFx0XHRcdHRpdGxlOiAgICB0aXRsZSxcblx0XHRcdFx0bWFwOiAgICAgIG1hcCxcblx0XHRcdFx0ekluZGV4OiAgIDk5OVxuXHRcdFx0fSk7XG5cblx0XHRcdGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKG1hcmtlciwgJ21vdXNlb3ZlcicsIChmdW5jdGlvbiAoaHRtbCkge1xuXHRcdFx0XHRyZXR1cm4gZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdGluZm9XaW5kb3cyLnNldENvbnRlbnQoaHRtbCk7XG5cdFx0XHRcdFx0aW5mb1dpbmRvdzIub3BlbihtYXAsIG1hcmtlcik7XG5cdFx0XHRcdH1cblx0XHRcdH0pKGh0bWwpKTtcblxuXHRcdFx0Z29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIobWFya2VyLCAnbW91c2VvdXQnLCAoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRyZXR1cm4gZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdGluZm9XaW5kb3cyLmNsb3NlKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pKCkpO1xuXG5cdFx0XHRnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYXJrZXIsICdjbG9zZWNsaWNrJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRpbmZvV2luZG93Mi5jbG9zZSgpO1xuXHRcdFx0fSk7XG5cblx0XHRcdHRoaXMuZ21hcmtlcnMucHVzaChtYXJrZXIpO1xuXG5cdFx0XHR0aGlzLmNvdW50Kys7XG5cdFx0fVxuXG5cdFx0Y3JlYXRlUHJvcGVydHlNYXJrZXIocG9pbnQsIGh0bWwsIGJveGluZm8sIGxpbmssIHRpdGxlLCBjb2xvciwgaWQsIGltYWdlLCBwaWQpIHtcblx0XHRcdGxldCBtYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcblx0XHRcdFx0cG9zaXRpb246IHBvaW50LFxuXHRcdFx0XHRsaW5rOiAgICAgbGluayxcblx0XHRcdFx0bWFwOiAgICAgIG1hcCxcblx0XHRcdFx0aWNvbjogICAgIGltYWdlLFxuXHRcdFx0XHR0aXRsZTogICAgdGl0bGUsXG5cdFx0XHRcdHBpZDogICAgICBwaWQsXG5cdFx0XHRcdHR5cGU6ICAgICAncHJvcGVydHknLFxuXHRcdFx0XHR6SW5kZXg6ICAgdGhpcy5jb3VudCArIDEwMDBcblx0XHRcdH0pO1xuXG5cdFx0XHRwcm9wZXJ0eWRpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcblx0XHRcdC8vIGlmIChwcm9wZXJ0eWRpdiAhPT0gbnVsbCkge1xuXHRcdFx0Ly8gXHRnb29nbGUubWFwcy5ldmVudC5hZGREb21MaXN0ZW5lcihwcm9wZXJ0eWRpdiwgJ21vdXNlb3ZlcicsIGZ1bmN0aW9uICgpIHtcblx0XHRcdC8vIFx0XHRtYXJrZXIuc2V0SWNvbihcblx0XHRcdC8vIFx0XHRcdGhpY29uXG5cdFx0XHQvLyBcdFx0KVxuXHRcdFx0Ly8gXHRcdG1hcmtlci5zZXRaSW5kZXgobWFya2VyLmdldFpJbmRleCgpICsgMTAwMCk7XG5cdFx0XHQvLyBcdH0pO1xuXHRcdFx0Ly8gXHRnb29nbGUubWFwcy5ldmVudC5hZGREb21MaXN0ZW5lcihwcm9wZXJ0eWRpdiwgJ21vdXNlb3V0JywgZnVuY3Rpb24gKCkge1xuXHRcdFx0Ly8gXHRcdG1hcmtlci5zZXRJY29uKFxuXHRcdFx0Ly8gXHRcdFx0Ymljb25cblx0XHRcdC8vIFx0XHQpXG5cdFx0XHQvLyBcdFx0bWFya2VyLnNldFpJbmRleChtYXJrZXIuZ2V0WkluZGV4KCkgLSAxMDAwKTtcblx0XHRcdC8vIFx0fSk7XG5cdFx0XHQvLyB9XG5cblx0XHRcdC8vIG1hcmtlci5hZGRMaXN0ZW5lcignbW91c2VvdmVyJywgKGZ1bmN0aW9uICgpIHtcblx0XHRcdC8vIFx0bWFya2VyLnNldEljb24oXG5cdFx0XHQvLyBcdFx0aGljb25cblx0XHRcdC8vIFx0KVxuXHRcdFx0Ly8gXHRtYXJrZXIuc2V0WkluZGV4KG1hcmtlci5nZXRaSW5kZXgoKSArIDEwMDApO1xuXHRcdFx0Ly8gfSkpO1xuXHRcdFx0Ly9cblx0XHRcdC8vIG1hcmtlci5hZGRMaXN0ZW5lcignbW91c2VvdXQnLCAoZnVuY3Rpb24gKCkge1xuXHRcdFx0Ly8gXHRtYXJrZXIuc2V0SWNvbihcblx0XHRcdC8vIFx0XHRiaWNvblxuXHRcdFx0Ly8gXHQpXG5cdFx0XHQvLyBcdG1hcmtlci5zZXRaSW5kZXgobWFya2VyLmdldFpJbmRleCgpIC0gMTAwMCk7XG5cdFx0XHQvLyB9KSk7XG5cblx0XHRcdC8vIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKG1hcmtlciwgJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cdFx0XHQvLyBcdG1hcmtlci5zZXRWaXNpYmxlKGZhbHNlKTsgLy8gbWFwcyBBUEkgaGlkZSBjYWxsXG5cdFx0XHQvLyB9KTtcblxuXHRcdFx0bWFya2VyLmFkZExpc3RlbmVyKCdtb3VzZWRvd24nLCAoZnVuY3Rpb24gKGJveGluZm8pIHtcblx0XHRcdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRpbmZvV2luZG93LmNsb3NlKCk7XG5cdFx0XHRcdFx0JCgnI2tyLWluZm93aW5kb3cnKS5oaWRlKCk7XG5cdFx0XHRcdFx0aW5mb1dpbmRvdy5zZXRDb250ZW50KGh0bWwpO1xuXHRcdFx0XHRcdGluZm9XaW5kb3cub3BlbihtYXAsIG1hcmtlcik7XG5cblx0XHRcdFx0XHQkLmFqYXgoe1xuXHRcdFx0XHRcdFx0dHlwZTogICAgXCJQT1NUXCIsXG5cdFx0XHRcdFx0XHR1cmw6ICAgICAnL2luZGV4LnBocD9vcHRpb249Y29tX2tub3dyZXMmdGFzaz1wcm9wZXJ0eS5tYXBpbmZvd2luZG93Jmxhbmc9JyArIGxhbmcsXG5cdFx0XHRcdFx0XHRkYXRhOiAgICB7XG5cdFx0XHRcdFx0XHRcdGlkOiBwYXJzZUludChib3hpbmZvKVxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG5cdFx0XHRcdFx0XHRcdCQoJyNrci1pbmZvd2luZG93JykuZmFkZUluKDQwMCkuaHRtbChkYXRhKS5zaG93KCk7XG5cdFx0XHRcdFx0XHRcdCQoXCIua3ItaW5mb3dpbmRvdy1zbGlkZXNob3dcIikubm90KCcuc2xpY2staW5pdGlhbGl6ZWQnKS5zbGljayh7XG5cdFx0XHRcdFx0XHRcdFx0bmV4dEFycm93OiAnPGkgY2xhc3M9XCJzbGljay1uYXYgbmV4dCBmYXMgZmEtY2hldnJvbi1yaWdodCBcIj48L2k+Jyxcblx0XHRcdFx0XHRcdFx0XHRwcmV2QXJyb3c6ICc8aSBjbGFzcz1cInNsaWNrLW5hdiBwcmV2IGZhcyBmYS1jaGV2cm9uLWxlZnQgXCI+PC9pPicsXG5cdFx0XHRcdFx0XHRcdFx0YXV0b3BsYXk6ICB0cnVlXG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9O1xuXHRcdFx0fSkoYm94aW5mbykpO1xuXG5cdFx0XHRnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYXJrZXIsICdjbG9zZWNsaWNrJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHQkKCcja3ItaW5mb3dpbmRvdycpLmhpZGUoKTtcblx0XHRcdFx0aW5mb1dpbmRvdy5jbG9zZSgpO1xuXHRcdFx0fSk7XG5cblx0XHRcdHRoaXMuZ21hcmtlcnMucHVzaChtYXJrZXIpO1xuXHRcdFx0Ym91bmRzLmV4dGVuZChwb2ludCk7XG5cblx0XHRcdHRoaXMuY291bnQrKztcblx0XHR9XG5cblx0XHQvL0luaXRpYWxpc2UgbWFwXG5cdFx0aW5pdE1hcCgpIHtcblx0XHRcdHRoaXMuY3JlYXRlTWFwKCk7XG5cdFx0XHRpZiAodGhpcy5zZXR0aW5ncy5tYXBUeXBlID09PSAnY2x1c3RlcicpIHtcblx0XHRcdFx0dGhpcy5jbHVzdGVyTWFwKCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLnNvbG9NYXAoKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBSZXNldCBtYXAgdG8gaW5pdGlhbCBzdGF0ZVxuXHRcdHJlZnJlc2hNYXAoJG1hcG1vZGFsKSB7XG5cdFx0XHRpZiAodGhpcy5zZXR0aW5ncy5tYXBUeXBlID09PSAnc29sbycpXG5cdFx0XHRcdHJldHVybjtcblxuXHRcdFx0bGV0IHNlbGYgPSB0aGlzO1xuXHRcdFx0alF1ZXJ5LmFqYXgoe1xuXHRcdFx0XHR1cmw6ICAgICAgJy9pbmRleC5waHA/b3B0aW9uPWNvbV9rbm93cmVzJnRhc2s9cHJvcGVydGllcy5yZWZyZXNobWFwJmxhbmc9JyArIGxhbmcsXG5cdFx0XHRcdHR5cGU6ICAgICBcIlBPU1RcIixcblx0XHRcdFx0ZGF0YVR5cGU6IFwianNvblwiLFxuXHRcdFx0XHRzdWNjZXNzOiAgZnVuY3Rpb24gKHJlc3VsdCkge1xuXHRcdFx0XHRcdGlmIChyZXN1bHQuc3VjY2Vzcykge1xuXHRcdFx0XHRcdFx0c2VsZi5zZXR0aW5ncy5maWx0ZXJJZHMgPSByZXN1bHQuZGF0YS5maWx0ZXJJZHM7XG5cdFx0XHRcdFx0XHRmb3IgKGxldCBkID0gMDsgZCA8IHNlbGYuZ21hcmtlcnMubGVuZ3RoOyBkKyspIHtcblx0XHRcdFx0XHRcdFx0bGV0IG1hcmtlciA9IHNlbGYuZ21hcmtlcnNbZF07XG5cdFx0XHRcdFx0XHRcdGlmIChtYXJrZXIudHlwZSA9PT0gJ3Byb3BlcnR5Jykge1xuXHRcdFx0XHRcdFx0XHRcdGlmIChzZWxmLnNldHRpbmdzLmZpbHRlcklkcy5pbmNsdWRlcyhtYXJrZXIucGlkKSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0bWFya2VyLnNldFZpc2libGUodHJ1ZSk7XG5cdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdG1hcmtlci5zZXRWaXNpYmxlKGZhbHNlKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0bWMucmVwYWludCgpO1xuXHRcdFx0XHRcdFx0bmV3IEZvdW5kYXRpb24uUmV2ZWFsKCRtYXBtb2RhbCk7XG5cdFx0XHRcdFx0XHQkbWFwbW9kYWwuZm91bmRhdGlvbignb3BlbicpO1xuXHRcdFx0XHRcdFx0Z29vZ2xlLm1hcHMuZXZlbnQudHJpZ2dlcihtYXAsICdyZXNpemUnKTtcblx0XHRcdFx0XHRcdCRtYXBtb2RhbC5mb3VuZGF0aW9uKCdvcGVuJyk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGFsZXJ0KHJlc3VsdC5tZXNzYWdlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdC8vIFJlc2V0IG1hcCB0byBpbml0aWFsIHN0YXRlXG5cdFx0cmVzZXRNYXAoKSB7XG5cdFx0XHRpbmZvV2luZG93LmNsb3NlKCk7XG5cdFx0XHRpbmZvV2luZG93Mi5jbG9zZSgpO1xuXHRcdFx0JCgnI2tyLWluZm93aW5kb3cnKS5oaWRlKCk7XG5cdFx0XHRtYXAuZml0Qm91bmRzKGJvdW5kcyk7XG5cblx0XHRcdHRoaXMuY2hlY2tab29tKCk7XG5cdFx0fVxuXG5cdFx0Ly8gbG9vcCB0byBzZXQgbWFwIG1hcmtlcnNcblx0XHRzZXRNYXBNYXJrZXJzKCkge1xuXHRcdFx0bGV0IHBvaW50O1xuXHRcdFx0bGV0IGFtYXJrO1xuXG5cdFx0XHRmb3IgKGxldCBkID0gMDsgZCA8IHRoaXMuc2V0dGluZ3MubWFwTWFya2Vycy5sZW5ndGg7IGQrKykge1xuXHRcdFx0XHRhbWFyayA9IHRoaXMuc2V0dGluZ3MubWFwTWFya2Vyc1tkXTtcblx0XHRcdFx0bGV0IG1hcmtlcmljb24gPSB7XG5cdFx0XHRcdFx0dXJsOiAgYW1hcmtbJ2ljb24nXSxcblx0XHRcdFx0XHRzaXplOiBuZXcgZ29vZ2xlLm1hcHMuU2l6ZSgzMiwgMzcpLFxuXHRcdFx0XHRcdC8vIE9SIHNjYWxlZFNpemU6IG5ldyBnb29nbGUubWFwcy5TaXplKDQwLCA0Nylcblx0XHRcdFx0XHRvcmlnaW46IG5ldyBnb29nbGUubWFwcy5Qb2ludCgwLCAwKSxcblx0XHRcdFx0XHRhbmNob3I6IG5ldyBnb29nbGUubWFwcy5Qb2ludCgwLCAxOClcblx0XHRcdFx0fTtcblxuXHRcdFx0XHRwb2ludCA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoYW1hcmtbJ2xhdCddLCBhbWFya1snbG5nJ10pO1xuXHRcdFx0XHRwb2ludCA9IHRoaXMuY2hlY2tEdXBsaWNhdGUocG9pbnQpO1xuXHRcdFx0XHR0aGlzLmNyZWF0ZU1hcE1hcmtlcihwb2ludCwgYW1hcmtbJ2h0bWwnXSwgbWFya2VyaWNvbiwgJycsICcnLCBhbWFya1sndGl0bGUnXSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gc2V0TWFya2VySWNvbnMoKSB7XG5cdFx0Ly8gXHRiaWNvbiA9IHtcblx0XHQvLyBcdFx0cGF0aDogICAgICAgICAnL21lZGlhL2NvbV9rbm93cmVzL2Fzc2V0cy9pbWFnZXMvc3ZnJyxcblx0XHQvLyBcdFx0ZmlsbENvbG9yOiAgICB0aGlzLnNldHRpbmdzLm1hcmtlckNvbG9yLFxuXHRcdC8vIFx0XHRmaWxsT3BhY2l0eTogIDAuOSxcblx0XHQvLyBcdFx0YW5jaG9yOiAgICAgICBuZXcgZ29vZ2xlLm1hcHMuUG9pbnQoOSwgMzUpLFxuXHRcdC8vIFx0XHRzdHJva2VDb2xvcjogIFwiI2VmZWZlZlwiLFxuXHRcdC8vIFx0XHRzdHJva2VXZWlnaHQ6IDAuNSxcblx0XHQvLyBcdFx0c2NhbGU6ICAgICAgICAxXG5cdFx0Ly8gXHR9O1xuXHRcdC8vIFx0aGljb24gPSB7XG5cdFx0Ly8gXHRcdHBhdGg6ICAgICAgICAgJy9tZWRpYS9jb21fa25vd3Jlcy9hc3NldHMvaW1hZ2VzL3N2ZycsXG5cdFx0Ly8gXHRcdGZpbGxDb2xvcjogICAgXCJncmVlblwiLFxuXHRcdC8vIFx0XHRmaWxsT3BhY2l0eTogIDEsXG5cdFx0Ly8gXHRcdGFuY2hvcjogICAgICAgbmV3IGdvb2dsZS5tYXBzLlBvaW50KDksIDM1KSxcblx0XHQvLyBcdFx0c3Ryb2tlQ29sb3I6ICBcIiNlZmVmZWZcIixcblx0XHQvLyBcdFx0c3Ryb2tlV2VpZ2h0OiAwLjgsXG5cdFx0Ly8gXHRcdHNjYWxlOiAgICAgICAgMS41XG5cdFx0Ly8gXHR9O1xuXHRcdC8vIH1cblxuXHRcdC8vIGxvb3AgdG8gc2V0IHByb3BlcnR5IG1hcmtlcnNcblx0XHRzZXRQcm9wZXJ0eU1hcmtlcnMoKSB7XG5cdFx0XHRsZXQgcG9pbnQ7XG5cdFx0XHRsZXQgYW1hcms7XG5cblx0XHRcdGZvciAobGV0IGQgPSAwOyBkIDwgdGhpcy5zZXR0aW5ncy5wcm9wZXJ0eU1hcmtlcnMubGVuZ3RoOyBkKyspIHtcblx0XHRcdFx0YW1hcmsgPSB0aGlzLnNldHRpbmdzLnByb3BlcnR5TWFya2Vyc1tkXTtcblxuXHRcdFx0XHRpZiAoIWQpIHtcblx0XHRcdFx0XHRwcm9wZXJ0eWljb24gPSB7XG5cdFx0XHRcdFx0XHR1cmw6ICAgIGFtYXJrWydpY29uJ10sXG5cdFx0XHRcdFx0XHRzaXplOiAgIG5ldyBnb29nbGUubWFwcy5TaXplKDMyLCAzNyksXG5cdFx0XHRcdFx0XHRvcmlnaW46IG5ldyBnb29nbGUubWFwcy5Qb2ludCgwLCAwKSxcblx0XHRcdFx0XHRcdGFuY2hvcjogbmV3IGdvb2dsZS5tYXBzLlBvaW50KDAsIDIwKVxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRwb2ludCA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoYW1hcmtbJ2xhdCddLCBhbWFya1snbG5nJ10pO1xuXHRcdFx0XHRwb2ludCA9IHRoaXMuY2hlY2tEdXBsaWNhdGUocG9pbnQpO1xuXHRcdFx0XHR0aGlzLmNyZWF0ZVByb3BlcnR5TWFya2VyKHBvaW50LCBhbWFya1snaHRtbCddLCBhbWFya1snYm94aW5mbyddLCBhbWFya1snbGluayddLCBhbWFya1sndGl0bGUnXSwgYW1hcmtbJ2NvbG9yJ10sIGFtYXJrWydpZCddLCBwcm9wZXJ0eWljb24sIGFtYXJrWydwaWQnXSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0c29sb01hcCgpIHtcblx0XHRcdHRoaXMuc2V0UHJvcGVydHlNYXJrZXJzKCk7XG5cdFx0XHR0aGlzLnNldE1hcE1hcmtlcnMoKTtcblxuXHRcdFx0bWFwLmZpdEJvdW5kcyhib3VuZHMpO1xuXHRcdFx0bWFwLnNldENlbnRlcihib3VuZHMuZ2V0Q2VudGVyKCkpO1xuLy9cdFx0XHR0aGlzLmNoZWNrWm9vbSgpO1xuXG5cdFx0XHRpZiAodGhpcy5zZXR0aW5ncy5tYXBNYXJrZXJzLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0Y29uc3Qgc2VsZiA9IHRoaXM7XG5cblx0XHRcdFx0bGV0IG15TGlzdGVuZXIgPSBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYXAsICdpZGxlJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdGxldCBmb3VuZCA9IDA7XG5cdFx0XHRcdFx0bGV0IGN1cnJlbnRab29tID0gbWFwLmdldFpvb20oKTtcblxuXHRcdFx0XHRcdHdoaWxlICghZm91bmQpIHtcblx0XHRcdFx0XHRcdGZvdW5kID0gS3JtYXAuc2hvd1Zpc2libGVNYXJrZXJzKHNlbGYuZ21hcmtlcnMpO1xuXHRcdFx0XHRcdFx0aWYgKGZvdW5kKSB7XG5cdFx0XHRcdFx0XHRcdG15TGlzdGVuZXIucmVtb3ZlKCk7XG5cdFx0XHRcdFx0XHRcdG1hcC5zZXRab29tKGN1cnJlbnRab29tKTtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRjdXJyZW50Wm9vbSA9IGN1cnJlbnRab29tIC0gMTtcblx0XHRcdFx0XHRcdGlmIChjdXJyZW50Wm9vbSA8IDEwKSB7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0JChmdW5jdGlvbiAoKSB7XG5cdFx0bGV0ICRtYXBtb2RhbDtcblxuXHRcdCQoJ2JvZHknKS5vbignY2xpY2snLCAnLm1hcC10cmlnZ2VyJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGlmIChtYXBEYXRhKSB7XG5cdFx0XHRcdG15S3JtYXAucmVmcmVzaE1hcCgkbWFwbW9kYWwpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0a2lja01hcCgkKHRoaXMpKTtcblx0XHRcdFx0JG1hcG1vZGFsID0gJCgnI2tyLXNlYXJjaC1tYXAtbW9kYWwnKTtcblx0XHRcdFx0bmV3IEZvdW5kYXRpb24uUmV2ZWFsKCRtYXBtb2RhbCk7XG5cdFx0XHRcdCRtYXBtb2RhbC5mb3VuZGF0aW9uKCdvcGVuJyk7XG5cdFx0XHR9XG5cdFx0fSkub24oJ2NsaWNrJywgJy5yZXNldG1hcCcsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRteUtybWFwLnJlc2V0TWFwKCk7XG5cdFx0fSkub24oJ2NsaWNrJywgJyNrci1zZWFyY2gtbWFwLWZ1bGwtaW5mb3dpbmRvdy1jbG9zZScsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRLcm1hcC5jbG9zZUtySW5mb3dpbmRvdygpO1xuXHRcdH0pLm9uKCdjbGljaycsICcuY2xvc2VtYXAnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0JG1hcG1vZGFsLmZvdW5kYXRpb24oJ2Nsb3NlJyk7XG5cdFx0XHQkLmFqYXgoe1xuXHRcdFx0XHR0eXBlOiAgICBcIlBPU1RcIixcblx0XHRcdFx0dXJsOiAgICAgJy9pbmRleC5waHA/b3B0aW9uPWNvbV9rbm93cmVzJnRhc2s9cHJvcGVydGllcy5tYXBzZXNzaW9uJmxhbmc9JyArIGxhbmcsXG5cdFx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHQkKCAnLmtyLXNlYXJjaGJhciAuYnV0dG9uLm1hcCcpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcblx0XHRcdFx0XHQkKCAnLmtyLXNlYXJjaGJhciAuYnV0dG9uLmxpc3QnKS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0pLm9uKCdvcGVuLnpmLnJldmVhbCcsICcja3Itc2VhcmNoLW1hcC1tb2RhbCcsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHQkKCcja3Itc2VhcmNoLW1hcC1mdWxsJykuaGVpZ2h0KCQoJyNrci1zZWFyY2gtbWFwLW1vZGFsJykuaGVpZ2h0KCkpO1xuXHRcdFx0Z29vZ2xlLm1hcHMuZXZlbnQudHJpZ2dlcihtYXAsIFwicmVzaXplXCIpO1xuXHRcdFx0JC5hamF4KHtcblx0XHRcdFx0dHlwZTogICAgXCJQT1NUXCIsXG5cdFx0XHRcdHVybDogICAgICcvaW5kZXgucGhwP29wdGlvbj1jb21fa25vd3JlcyZ0YXNrPXByb3BlcnRpZXMubWFwc2Vzc2lvbiZsYW5nPScgKyBsYW5nLFxuXHRcdFx0XHRkYXRhOiAgICB7bWFwX21vZGFsOiAnMSd9LFxuXHRcdFx0XHRzdWNjZXNzOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0pO1xuXG5cdFx0Ly8gRG9lc24ndCB0cmlnZ2VyIGlmIGluY2x1ZGVkIGFib3ZlID8/XG5cdFx0aWYgKCFtYXBEYXRhKSB7XG5cdFx0XHRjb25zdCAkc29sb1RyaWdnZXIgPSAkKCcja3ItbWFwLXNvbG8tdHJpZ2dlcicpO1xuXHRcdFx0JHNvbG9UcmlnZ2VyLm9uZSgnY2xpY2snLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdGtpY2tNYXAoJHNvbG9UcmlnZ2VyKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRpZiAod2luZG93LmxvY2F0aW9uLmhyZWYuaW5kZXhPZignI21hcCcpICE9PSAtMSAmJiAkc29sb1RyaWdnZXIubGVuZ3RoKSB7XG5cdFx0XHRcdGtpY2tNYXAoJHNvbG9UcmlnZ2VyKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBUZXN0IGZvciBmb3JjZSBtYXBcblx0XHRjb25zdCAkdHJpZ2dlciA9ICQoJy5tYXAtdHJpZ2dlcicpO1xuXHRcdGlmICgkdHJpZ2dlci5kYXRhKCdmb3JjZW1hcCcpKSB7XG5cdFx0XHQkdHJpZ2dlci50cmlnZ2VyKCdjbGljaycpO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGtpY2tNYXAoJGVsZW0pIHtcblx0XHRcdGNvbnN0IHR5cGUgPSAkZWxlbS5kYXRhKCd0eXBlJyk7XG5cdFx0XHRsZXQgcGlkID0gMDtcblx0XHRcdGlmICh0eXBlID09PSAnc29sbycpIHtcblx0XHRcdFx0cGlkID0gJGVsZW0uZGF0YSgncGlkJyk7XG5cdFx0XHR9XG5cblx0XHRcdGpRdWVyeS5hamF4KHtcblx0XHRcdFx0dXJsOiAgICAgICcvaW5kZXgucGhwP29wdGlvbj1jb21fa25vd3JlcyZ0YXNrPXByb3BlcnRpZXMubWFwZGF0YSZwaWQ9JyArIHBpZCArICcmbGFuZz0nICsgbGFuZyxcblx0XHRcdFx0dHlwZTogICAgIFwiUE9TVFwiLFxuXHRcdFx0XHRkYXRhVHlwZTogXCJqc29uXCIsXG5cdFx0XHRcdHN1Y2Nlc3M6ICBmdW5jdGlvbiAocmVzdWx0KSB7XG5cdFx0XHRcdFx0aWYgKHJlc3VsdC5zdWNjZXNzKSB7XG5cdFx0XHRcdFx0XHRzZXR0aW5ncyA9IHtcblx0XHRcdFx0XHRcdFx0bWFwSWQ6ICAgICAgICAgICAkZWxlbS5kYXRhKCd0YXJnZXQnKSxcblx0XHRcdFx0XHRcdFx0bWFwVHlwZTogICAgICAgICAkZWxlbS5kYXRhKCd0eXBlJyksXG5cdFx0XHRcdFx0XHRcdG1hcFR5cGVJZDogICAgICAgJGVsZW0uZGF0YSgnbWFwdHlwZWlkJyksXG5cdFx0XHRcdFx0XHRcdG1hcFpvb206ICAgICAgICAgcGFyc2VJbnQoJGVsZW0uZGF0YSgnem9vbScpKSxcblx0XHRcdFx0XHRcdFx0bWFwTWF4Wm9vbTogICAgICBwYXJzZUludCgkZWxlbS5kYXRhKCd6b29tbWF4JykpLFxuXHRcdFx0XHRcdFx0XHRwcm9wZXJ0eU1hcmtlcnM6IHJlc3VsdC5kYXRhLnByb3BlcnR5TWFya2Vycyxcblx0XHRcdFx0XHRcdFx0bWFwTWFya2VyczogICAgICByZXN1bHQuZGF0YS5tYXBNYXJrZXJzLFxuXHRcdFx0XHRcdFx0XHRmaWx0ZXJJZHM6ICAgICAgIHJlc3VsdC5kYXRhLmZpbHRlcklkc1xuXHRcdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdFx0bXlLcm1hcCA9IG5ldyBLcm1hcChzZXR0aW5ncyk7XG5cdFx0XHRcdFx0XHRtYXBEYXRhID0gdHJ1ZTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0YWxlcnQocmVzdWx0Lm1lc3NhZ2UpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9KTtcbn0oalF1ZXJ5KSk7IiwiLyoqXG4gKiBAcGFja2FnZSAgICBLbm93IFJlc2VydmF0aW9uc1xuICogQHN1YnBhY2thZ2UgU2l0ZSBKU1xuICogQGNvcHlyaWdodCAgMjAyMCBIaWdobGFuZCBWaXNpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBAbGljZW5zZSAgICBTZWUgdGhlIGZpbGUgXCJMSUNFTlNFLnR4dFwiIGZvciB0aGUgZnVsbCBsaWNlbnNlIGdvdmVybmluZyB0aGlzIGNvZGUuXG4gKiBAYXV0aG9yICAgICBIYXplbCBXaWxzb24gPGhhemVsQGhpZ2hsYW5kdmlzaW9uLmNvbT5cbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgkKSB7XG5cdGxldCBteUtycm91dGU7XG5cdGxldCBkaXJlY3Rpb25zRGlzcGxheTtcblx0bGV0IGRpcmVjdGlvbnNWaXNpYmxlID0gZmFsc2U7XG5cdGxldCByb3V0ZU1hcDtcblx0bGV0IG9yaWdpbjtcblx0bGV0IGRlc3RpbmF0aW9uO1xuXHRsZXQgcm91dGVNYXJrZXJzID0gW107XG5cdGxldCByb3V0ZVN0b3BQb2ludHMgPSBbXTtcblx0bGV0IHBvaW50O1xuXHRsZXQgc2VsZjtcblxuXHRsZXQgc2V0dGluZ3MgPSB7XG5cdFx0bGF0OiAgICAgICAgICAgICAgIFwiXCIsXG5cdFx0bG5nOiAgICAgICAgICAgICAgIFwiXCIsXG5cdFx0bmFtZTogICAgICAgICAgICAgIFwiXCIsXG5cdFx0aWNvbjogICAgICAgICAgICAgIFwiXCIsXG5cdFx0ZGV0b3VyOiAgICAgICAgICAgIFwiXCIsXG5cdFx0bWFwWm9vbTogICAgICAgICAgIDksXG5cdFx0bWFwTWF4Wm9vbTogICAgICAgIDIwLFxuXHRcdG1hcFR5cGVJZDogICAgICAgICBcInJvYWRtYXBcIixcblx0XHRtYXBJZDogICAgICAgICAgICAgXCJrci1tYXAtcm91dGVcIixcblx0XHRkaXJlY3Rpb25zUGFuZWw6ICAgXCJrci1kaXJlY3Rpb25zLXBhbmVsXCIsXG5cdFx0ZGlyZWN0aW9uc1NlcnZpY2U6IG51bGxcblx0fTtcblxuXHRjbGFzcyBLcnJvdXRlIHtcblx0XHRjb25zdHJ1Y3RvcigkZWxlbWVudCwgb3B0aW9ucykge1xuXHRcdFx0dGhpcy5zZXR0aW5ncyA9IHNldHRpbmdzO1xuXHRcdFx0aWYgKG9wdGlvbnMpIHtcblx0XHRcdFx0JC5leHRlbmQodGhpcy5zZXR0aW5ncywgb3B0aW9ucyk7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuc2V0dGluZ3MuZGlyZWN0aW9uc1NlcnZpY2UgPSBuZXcgZ29vZ2xlLm1hcHMuRGlyZWN0aW9uc1NlcnZpY2UoKTtcblx0XHRcdHRoaXMuaW5pdCgpO1xuXHRcdH1cblxuXHRcdHN0YXRpYyBjbGVhclJvdXRlTWFya2VycygpIHtcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcm91dGVNYXJrZXJzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdHJvdXRlTWFya2Vyc1tpXS5zZXRNYXAobnVsbCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0c3RhdGljIGNsZWFyV2F5cG9pbnRzKCkge1xuXHRcdFx0b3JpZ2luID0gbnVsbDtcblx0XHRcdHJvdXRlTWFya2VycyA9IFtdO1xuXHRcdFx0cm91dGVTdG9wUG9pbnRzID0gW107XG5cdFx0XHRkaXJlY3Rpb25zVmlzaWJsZSA9IGZhbHNlO1xuXHRcdH1cblxuXHRcdGFkZFJvdXRlTWFya2VyKGxhdGxuZykge1xuXHRcdFx0cm91dGVNYXJrZXJzLnB1c2gobmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XG5cdFx0XHRcdHBvc2l0aW9uOiBsYXRsbmcsXG5cdFx0XHRcdG1hcDogICAgICByb3V0ZU1hcCxcblx0XHRcdFx0aWNvbjogICAgIHRoaXMuc2V0dGluZ3MuZGV0b3VyXG5cdFx0XHR9KSk7XG5cdFx0fVxuXG5cdFx0Ly9cblx0XHQvLyBhZGRQcm9wZXJ0eU1hcmtlcihwb2ludCwgaHRtbCwgaW1hZ2UsIGJveGluZm8pIHtcblx0XHQvLyBcdGxldCBtYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcblx0XHQvLyBcdFx0cG9zaXRpb246IHBvaW50LFxuXHRcdC8vIFx0XHRodG1sOiAgICAgaHRtbCxcblx0XHQvLyBcdFx0bWFwOiAgICAgIHJvdXRlTWFwLFxuXHRcdC8vIFx0XHRpY29uOiAgICAgaW1hZ2UsXG5cdFx0Ly8gXHRcdHpJbmRleDogICAxXG5cdFx0Ly8gXHR9KTtcblx0XHQvL1xuXHRcdC8vIFx0bGV0IGluZm93aW5kb3cgPSBuZXcgZ29vZ2xlLm1hcHMuSW5mb1dpbmRvdyh7XG5cdFx0Ly8gXHRcdGNvbnRlbnQ6IGJveGluZm9cblx0XHQvLyBcdH0pO1xuXHRcdC8vXG5cdFx0Ly8gXHRnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYXJrZXIsICdjbGljaycsIGZ1bmN0aW9uICgpIHtcblx0XHQvLyBcdFx0Ly8gQ2hlY2sgdG8gc2VlIGlmIHRoZXJlIGlzIGFuIGluZm8gd2luZG93IHN0b3JlZCBpbiByb3V0ZUN1cnJJbmZvV2luZG93LFxuXHRcdC8vIFx0XHQvLyBpZiB0aGVyZSBpcywgd2UgdXNlIC5jbG9zZSgpIHRvIGhpZGUgdGhlIHdpbmRvd1xuXHRcdC8vIFx0XHRpZiAocm91dGVDdXJySW5mb1dpbmRvdykge1xuXHRcdC8vIFx0XHRcdHJvdXRlQ3VyckluZm9XaW5kb3cuY2xvc2UoKTtcblx0XHQvLyBcdFx0fVxuXHRcdC8vIFx0XHQvLyBQdXQgb3VyIG5ldyBpbmZvIHdpbmRvdyBpbiB0byB0aGUgcm91dGVDdXJySW5mb1dpbmRvdyB2YXJpYWJsZVxuXHRcdC8vIFx0XHRyb3V0ZUN1cnJJbmZvV2luZG93ID0gaW5mb3dpbmRvdztcblx0XHQvLyBcdFx0Ly8gT3BlbiB0aGUgd2luZG93XG5cdFx0Ly8gXHRcdGluZm93aW5kb3cub3Blbihyb3V0ZU1hcCwgbWFya2VyKTtcblx0XHQvLyBcdH0pO1xuXHRcdC8vXG5cdFx0Ly8gXHQvL2dtYXJrZXJzLnB1c2goIG1hcmtlciApO1xuXHRcdC8vIFx0cm91dGVNYXJrZXJzLnB1c2gobWFya2VyKTtcblx0XHQvLyB9XG5cblx0XHQvLyBzdGF0aWMgdXBkYXRlTW9kZSgpIHtcblx0XHQvLyBcdGlmIChkaXJlY3Rpb25zVmlzaWJsZSkge1xuXHRcdC8vIFx0XHR0aGlzLmNhbGNSb3V0ZSgpO1xuXHRcdC8vIFx0fVxuXHRcdC8vIH1cblxuXHRcdGNhbGNSb3V0ZSgpIHtcblx0XHRcdGxldCBmcm9tX2FkZHJlc3MgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZyb21fYWRkcmVzc1wiKS52YWx1ZTtcblx0XHRcdGxldCBvcmlnaW4gPSBcIlwiO1xuXG5cdFx0XHRpZiAoZnJvbV9hZGRyZXNzID09PSBcIkFkZHJlc3NcIikgZnJvbV9hZGRyZXNzID0gXCJcIjtcblx0XHRcdGlmIChmcm9tX2FkZHJlc3MpIG9yaWdpbiA9IGZyb21fYWRkcmVzcyArIFwiLFwiICsgXCJcIjtcblxuXHRcdFx0bGV0IG1vZGU7XG5cdFx0XHRzd2l0Y2ggKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW9kZVwiKS52YWx1ZSkge1xuXHRcdFx0XHRjYXNlIFwiYmljeWNsaW5nXCI6XG5cdFx0XHRcdFx0bW9kZSA9IGdvb2dsZS5tYXBzLkRpcmVjdGlvbnNUcmF2ZWxNb2RlLkJJQ1lDTElORztcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcImRyaXZpbmdcIjpcblx0XHRcdFx0XHRtb2RlID0gZ29vZ2xlLm1hcHMuRGlyZWN0aW9uc1RyYXZlbE1vZGUuRFJJVklORztcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcIndhbGtpbmdcIjpcblx0XHRcdFx0XHRtb2RlID0gZ29vZ2xlLm1hcHMuRGlyZWN0aW9uc1RyYXZlbE1vZGUuV0FMS0lORztcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0aWYgKG9yaWdpbikge1xuXHRcdFx0XHRsZXQgcmVxdWVzdCA9IHtcblx0XHRcdFx0XHRvcmlnaW46ICAgICAgICBvcmlnaW4sXG5cdFx0XHRcdFx0ZGVzdGluYXRpb246ICAgZGVzdGluYXRpb24sXG5cdFx0XHRcdFx0d2F5cG9pbnRzOiAgICAgcm91dGVTdG9wUG9pbnRzLFxuXHRcdFx0XHRcdHRyYXZlbE1vZGU6ICAgIG1vZGUsXG5cdFx0XHRcdFx0YXZvaWRIaWdod2F5czogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hpZ2h3YXlzJykuY2hlY2tlZCxcblx0XHRcdFx0XHRhdm9pZFRvbGxzOiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9sbHMnKS5jaGVja2VkXG5cdFx0XHRcdH07XG5cblx0XHRcdFx0c2VsZiA9IHRoaXM7XG5cdFx0XHRcdHRoaXMuc2V0dGluZ3MuZGlyZWN0aW9uc1NlcnZpY2Uucm91dGUocmVxdWVzdCwgZnVuY3Rpb24gKHJlc3BvbnNlLCBzdGF0dXMpIHtcblx0XHRcdFx0XHRpZiAoc3RhdHVzID09PSBnb29nbGUubWFwcy5EaXJlY3Rpb25zU3RhdHVzLk9LKSB7XG5cdFx0XHRcdFx0XHRkaXJlY3Rpb25zRGlzcGxheS5zZXREaXJlY3Rpb25zKHJlc3BvbnNlKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0YWxlcnQoXCJHb29nbGUgY291bGRuYHQgY2FsY3VsYXRlIGRpcmVjdGlvbnMgZm9yIHRoaXMgcm91dGUgYW5kIHNlbGVjdGVkIG9wdGlvbnNcIik7XG5cdFx0XHRcdFx0XHRzZWxmLnJlc2V0Um91dGUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXG5cdFx0XHRLcnJvdXRlLmNsZWFyUm91dGVNYXJrZXJzKCk7XG5cdFx0XHRkaXJlY3Rpb25zVmlzaWJsZSA9IHRydWU7XG5cdFx0fVxuXG5cdFx0aW5pdCgpIHtcblx0XHRcdGRlc3RpbmF0aW9uID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyh0aGlzLnNldHRpbmdzLmxhdCwgdGhpcy5zZXR0aW5ncy5sbmcpO1xuXG5cdFx0XHQvL0luaXRpYWxpc2UgbWFwIG9wdGlvbnNcblx0XHRcdHRoaXMubXlPcHRpb25zID0ge1xuXHRcdFx0XHRzY3JvbGx3aGVlbDogICAgICAgZmFsc2UsXG5cdFx0XHRcdHpvb206ICAgICAgICAgICAgICB0aGlzLnNldHRpbmdzLm1hcFpvb20sXG5cdFx0XHRcdG1heFpvb206ICAgICAgICAgICB0aGlzLnNldHRpbmdzLm1hcE1heFpvb20sXG5cdFx0XHRcdG1hcFR5cGVJZDogICAgICAgICB0aGlzLnNldHRpbmdzLm1hcFR5cGVJZCxcblx0XHRcdFx0c3RyZWV0Vmlld0NvbnRyb2w6IGZhbHNlLFxuXHRcdFx0XHRjZW50ZXI6ICAgICAgICAgICAgZGVzdGluYXRpb25cblx0XHRcdH07XG5cblx0XHRcdHJvdXRlTWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnNldHRpbmdzLm1hcElkKSwgdGhpcy5teU9wdGlvbnMpO1xuXHRcdFx0ZGlyZWN0aW9uc0Rpc3BsYXkgPSBuZXcgZ29vZ2xlLm1hcHMuRGlyZWN0aW9uc1JlbmRlcmVyKCk7XG5cdFx0XHRkaXJlY3Rpb25zRGlzcGxheS5zZXRNYXAocm91dGVNYXApO1xuXHRcdFx0ZGlyZWN0aW9uc0Rpc3BsYXkuc2V0UGFuZWwoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5zZXR0aW5ncy5kaXJlY3Rpb25zUGFuZWwpKTtcblxuXHRcdFx0Y29uc3QgaW1hZ2UgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VySW1hZ2UodGhpcy5zZXR0aW5ncy5pY29uKTtcblx0XHRcdHBvaW50ID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyh0aGlzLnNldHRpbmdzLmxhdCwgdGhpcy5zZXR0aW5ncy5sbmcpO1xuXG5cdFx0XHRzZWxmID0gdGhpcztcblx0XHRcdGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKHJvdXRlTWFwLCAnY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRcdFx0aWYgKHJvdXRlU3RvcFBvaW50cy5sZW5ndGggPCA5KSB7XG5cdFx0XHRcdFx0cm91dGVTdG9wUG9pbnRzLnB1c2goe2xvY2F0aW9uOiBldmVudC5sYXRMbmcsIHN0b3BvdmVyOiB0cnVlfSk7XG5cdFx0XHRcdFx0cG9pbnQgPSBldmVudC5sYXRMbmc7XG5cdFx0XHRcdFx0c2VsZi5hZGRSb3V0ZU1hcmtlcihwb2ludCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0YWxlcnQoXCJNYXhpbXVtIG51bWJlciBvZiA5IHdheXBvaW50cyByZWFjaGVkXCIpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0c2VsZiA9IHRoaXM7XG5cdFx0XHRnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lck9uY2Uocm91dGVNYXAsICdpZGxlJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRnb29nbGUubWFwcy5ldmVudC50cmlnZ2VyKHJvdXRlTWFwLCAncmVzaXplJyk7XG5cdFx0XHRcdHNlbGYuY2FsY1JvdXRlKCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRyZXNldFJvdXRlKCkge1xuXHRcdFx0S3Jyb3V0ZS5jbGVhclJvdXRlTWFya2VycygpO1xuXHRcdFx0S3Jyb3V0ZS5jbGVhcldheXBvaW50cygpO1xuXHRcdFx0ZGlyZWN0aW9uc0Rpc3BsYXkuc2V0TWFwKG51bGwpO1xuXHRcdFx0ZGlyZWN0aW9uc0Rpc3BsYXkuc2V0UGFuZWwobnVsbCk7XG5cdFx0XHRkaXJlY3Rpb25zRGlzcGxheSA9IG5ldyBnb29nbGUubWFwcy5EaXJlY3Rpb25zUmVuZGVyZXIoKTtcblx0XHRcdGRpcmVjdGlvbnNEaXNwbGF5LnNldE1hcChyb3V0ZU1hcCk7XG5cdFx0XHRkaXJlY3Rpb25zRGlzcGxheS5zZXRQYW5lbChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnNldHRpbmdzLmRpcmVjdGlvblBhbmVsKSk7XG5cblx0XHRcdHRoaXMuaW5pdCgpO1xuXHRcdH1cblx0fVxuXG5cdCQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcblx0XHQkKFwiLmtyLWRpcmVjdGlvbnMtbW9kYWxcIikub24oJ2NsaWNrJywgJyNrci1tYXAtcm91dGUnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0bGV0ICRlbGVtZW50ID0gJCh0aGlzKTtcblx0XHRcdGNvbnN0IG9wdGlvbnMgPSB7XG5cdFx0XHRcdGxhdDogICAgJGVsZW1lbnQuZGF0YSgnbGF0JyksXG5cdFx0XHRcdGxuZzogICAgJGVsZW1lbnQuZGF0YSgnbG5nJyksXG5cdFx0XHRcdG5hbWU6ICAgJGVsZW1lbnQuZGF0YSgnbmFtZScpLFxuXHRcdFx0XHRpY29uOiAgICRlbGVtZW50LmRhdGEoJ2ljb24nKSxcblx0XHRcdFx0ZGV0b3VyOiAkZWxlbWVudC5kYXRhKCdkZXRvdXInKVxuXHRcdFx0fTtcblx0XHRcdG15S3Jyb3V0ZSA9IG5ldyBLcnJvdXRlKCRlbGVtZW50LCBvcHRpb25zKTtcblx0XHR9KS5vbignY2xpY2snLCAnLnJlc2V0cm91dGUnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0bXlLcnJvdXRlLnJlc2V0Um91dGUoKTtcblx0XHR9KS5vbignY2xpY2snLCAnLmNhbGNyb3V0ZScsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRteUtycm91dGUuY2FsY1JvdXRlKCk7XG5cdFx0fSk7XG5cblx0XHRqUXVlcnkoXCJhI2dlb2NvZGVBZGRyZXNzXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdGxldCBhZGRyZXNzU3RyaW5nID1cblx0XHRcdFx0ICAgIGpRdWVyeShcIiNqZm9ybV9wcm9wZXJ0eV9zdHJlZXRcIikudmFsKClcblx0XHRcdFx0ICAgICsgXCIsIFwiXG5cdFx0XHRcdCAgICArIGpRdWVyeSgnI2pmb3JtX3Rvd25faWQnKS5maW5kKFwiOnNlbGVjdGVkXCIpLnRleHQoKVxuXHRcdFx0XHQgICAgKyBcIiBcIlxuXHRcdFx0XHQgICAgKyBqUXVlcnkoXCIjamZvcm1fcHJvcGVydHlfcG9zdGNvZGVcIikudmFsKClcblx0XHRcdFx0ICAgICsgXCIsIFwiXG5cdFx0XHRcdCAgICArIGpRdWVyeSgnI2pmb3JtX3JlZ2lvbl9pZCcpLmZpbmQoXCI6c2VsZWN0ZWRcIikudGV4dCgpXG5cdFx0XHRcdCAgICArIFwiIFwiXG5cdFx0XHRcdCAgICArIGpRdWVyeSgnI2pmb3JtX2NvdW50cnlfaWQnKS5maW5kKFwiOnNlbGVjdGVkXCIpLnRleHQoKTtcblxuXHRcdFx0bGV0IHVybCA9ICdpbmRleC5waHA/b3B0aW9uPWNvbV9rbm93cmVzJnRhc2s9cHJvcGVydHkuZ2VvY29kZSc7XG5cdFx0XHRsZXQgY29vcmQgPSBbXTtcblxuXHRcdFx0alF1ZXJ5LmFqYXgoe1xuXHRcdFx0XHR0eXBlOiAgICAgXCJQT1NUXCIsXG5cdFx0XHRcdHVybDogICAgICB1cmwsXG5cdFx0XHRcdGRhdGE6ICAgICB7YWRkcmVzczogYWRkcmVzc1N0cmluZ30sXG5cdFx0XHRcdGRhdGFUeXBlOiBcImpzb25cIixcblx0XHRcdFx0c3VjY2VzczogIGZ1bmN0aW9uIChqc29uZGF0YSkge1xuXHRcdFx0XHRcdGpRdWVyeS5lYWNoKGpzb25kYXRhLCBmdW5jdGlvbiAoa2V5LCB2YWwpIHtcblx0XHRcdFx0XHRcdGxldCBkaXYgPSBcIiNcIiArIGtleTtcblx0XHRcdFx0XHRcdGpRdWVyeShkaXYpLnZhbCh2YWwpO1xuXHRcdFx0XHRcdFx0Y29vcmRba2V5XSA9IHZhbDtcblx0XHRcdFx0XHRcdG15R21hcC5yZWZyZXNoTWFwKGNvb3JkWydsYXQnXSwgY29vcmRbJ2xuZyddLCBmYWxzZSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9KTtcbn0oalF1ZXJ5KSk7IiwiLy8gS1IgQVBQIEpTIEZpbGVzXG5pbXBvcnQgJ25wbS9qcXVlcnktYmFyLXJhdGluZy9qcXVlcnkuYmFycmF0aW5nJztcbmltcG9ydCAnbnBtL2lzLW1hcmtlci1jbHVzdGVyZXInO1xuaW1wb3J0ICdtZWRpYWpzL3NpdGUvYXBwJztcbi8vaW1wb3J0ICdtZWRpYWpzL3NpdGUvY29tYm9nZW8nO1xuaW1wb3J0ICdtZWRpYWpzL3NpdGUvY29uZmlybSc7XG5pbXBvcnQgJ21lZGlhanMvc2l0ZS9kb2JlbnRyeSc7XG5pbXBvcnQgJ21lZGlhanMvc2l0ZS9ndWVzdGRhdGEnO1xuaW1wb3J0ICdtZWRpYWpzL3NpdGUvbWFwJztcbmltcG9ydCAnbWVkaWFqcy9zaXRlL3JvdXRlJztcbi8vIGltcG9ydCAnLi9qcy9zcmMva3JhcHAvc3RyaXBlJzsiXSwibmFtZXMiOlsiTWFya2VyQ2x1c3RlcmVyIiwibWFwIiwib3B0X21hcmtlcnMiLCJvcHRfb3B0aW9ucyIsImV4dGVuZCIsImdvb2dsZSIsIm1hcHMiLCJPdmVybGF5VmlldyIsIm1hcF8iLCJtYXJrZXJzXyIsImNsdXN0ZXJzXyIsInNpemVzIiwic3R5bGVzXyIsInJlYWR5XyIsIm9wdGlvbnMiLCJncmlkU2l6ZV8iLCJtaW5DbHVzdGVyU2l6ZV8iLCJtYXhab29tXyIsImltYWdlUGF0aF8iLCJNQVJLRVJfQ0xVU1RFUl9JTUFHRV9QQVRIXyIsImltYWdlRXh0ZW5zaW9uXyIsIk1BUktFUl9DTFVTVEVSX0lNQUdFX0VYVEVOU0lPTl8iLCJ6b29tT25DbGlja18iLCJ1bmRlZmluZWQiLCJhdmVyYWdlQ2VudGVyXyIsInNldHVwU3R5bGVzXyIsInNldE1hcCIsInByZXZab29tXyIsImdldFpvb20iLCJ0aGF0IiwiZXZlbnQiLCJhZGRMaXN0ZW5lciIsInpvb20iLCJyZXNldFZpZXdwb3J0IiwicmVkcmF3IiwibGVuZ3RoIiwiYWRkTWFya2VycyIsInByb3RvdHlwZSIsIm9iajEiLCJvYmoyIiwib2JqZWN0IiwicHJvcGVydHkiLCJhcHBseSIsIm9uQWRkIiwic2V0UmVhZHlfIiwiZHJhdyIsImkiLCJzaXplIiwicHVzaCIsInVybCIsImhlaWdodCIsIndpZHRoIiwiZml0TWFwVG9NYXJrZXJzIiwibWFya2VycyIsImdldE1hcmtlcnMiLCJib3VuZHMiLCJMYXRMbmdCb3VuZHMiLCJtYXJrZXIiLCJnZXRQb3NpdGlvbiIsImZpdEJvdW5kcyIsInNldFN0eWxlcyIsInN0eWxlcyIsImdldFN0eWxlcyIsImlzWm9vbU9uQ2xpY2siLCJpc0F2ZXJhZ2VDZW50ZXIiLCJnZXRUb3RhbE1hcmtlcnMiLCJzZXRNYXhab29tIiwibWF4Wm9vbSIsImdldE1heFpvb20iLCJjYWxjdWxhdG9yXyIsIm51bVN0eWxlcyIsImluZGV4IiwiY291bnQiLCJkdiIsInBhcnNlSW50IiwiTWF0aCIsIm1pbiIsInRleHQiLCJzZXRDYWxjdWxhdG9yIiwiY2FsY3VsYXRvciIsImdldENhbGN1bGF0b3IiLCJvcHRfbm9kcmF3IiwicHVzaE1hcmtlclRvXyIsImlzQWRkZWQiLCJyZXBhaW50IiwiYWRkTWFya2VyIiwicmVtb3ZlTWFya2VyXyIsImluZGV4T2YiLCJtIiwic3BsaWNlIiwicmVtb3ZlTWFya2VyIiwicmVtb3ZlZCIsInJlbW92ZU1hcmtlcnMiLCJyIiwicmVhZHkiLCJjcmVhdGVDbHVzdGVyc18iLCJnZXRUb3RhbENsdXN0ZXJzIiwiZ2V0TWFwIiwiZ2V0R3JpZFNpemUiLCJzZXRHcmlkU2l6ZSIsImdldE1pbkNsdXN0ZXJTaXplIiwic2V0TWluQ2x1c3RlclNpemUiLCJnZXRFeHRlbmRlZEJvdW5kcyIsInByb2plY3Rpb24iLCJnZXRQcm9qZWN0aW9uIiwidHIiLCJMYXRMbmciLCJnZXROb3J0aEVhc3QiLCJsYXQiLCJsbmciLCJibCIsImdldFNvdXRoV2VzdCIsInRyUGl4IiwiZnJvbUxhdExuZ1RvRGl2UGl4ZWwiLCJ4IiwieSIsImJsUGl4IiwibmUiLCJmcm9tRGl2UGl4ZWxUb0xhdExuZyIsInN3IiwiaXNNYXJrZXJJbkJvdW5kc18iLCJjb250YWlucyIsImNsZWFyTWFya2VycyIsIm9wdF9oaWRlIiwiY2x1c3RlciIsInJlbW92ZSIsIm9sZENsdXN0ZXJzIiwic2xpY2UiLCJ3aW5kb3ciLCJzZXRUaW1lb3V0IiwiZGlzdGFuY2VCZXR3ZWVuUG9pbnRzXyIsInAxIiwicDIiLCJSIiwiZExhdCIsIlBJIiwiZExvbiIsImEiLCJzaW4iLCJjb3MiLCJjIiwiYXRhbjIiLCJzcXJ0IiwiZCIsImFkZFRvQ2xvc2VzdENsdXN0ZXJfIiwiZGlzdGFuY2UiLCJjbHVzdGVyVG9BZGRUbyIsInBvcyIsImNlbnRlciIsImdldENlbnRlciIsImlzTWFya2VySW5DbHVzdGVyQm91bmRzIiwiQ2x1c3RlciIsIm1hcEJvdW5kcyIsImdldEJvdW5kcyIsIm1hcmtlckNsdXN0ZXJlciIsIm1hcmtlckNsdXN0ZXJlcl8iLCJjZW50ZXJfIiwiYm91bmRzXyIsImNsdXN0ZXJJY29uXyIsIkNsdXN0ZXJJY29uIiwiaXNNYXJrZXJBbHJlYWR5QWRkZWQiLCJjYWxjdWxhdGVCb3VuZHNfIiwibCIsImxlbiIsInVwZGF0ZUljb24iLCJnZXRNYXJrZXJDbHVzdGVyZXIiLCJnZXRTaXplIiwibXoiLCJoaWRlIiwic3VtcyIsInNldENlbnRlciIsInNldFN1bXMiLCJzaG93Iiwib3B0X3BhZGRpbmciLCJwYWRkaW5nXyIsImNsdXN0ZXJfIiwiZGl2XyIsInN1bXNfIiwidmlzaWJsZV8iLCJ0cmlnZ2VyQ2x1c3RlckNsaWNrIiwidHJpZ2dlciIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImdldFBvc0Zyb21MYXRMbmdfIiwic3R5bGUiLCJjc3NUZXh0IiwiY3JlYXRlQ3NzIiwiaW5uZXJIVE1MIiwicGFuZXMiLCJnZXRQYW5lcyIsIm92ZXJsYXlNb3VzZVRhcmdldCIsImFwcGVuZENoaWxkIiwiYWRkRG9tTGlzdGVuZXIiLCJsYXRsbmciLCJ3aWR0aF8iLCJoZWlnaHRfIiwidG9wIiwibGVmdCIsImRpc3BsYXkiLCJvblJlbW92ZSIsInBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsInRleHRfIiwiaW5kZXhfIiwidXNlU3R5bGUiLCJtYXgiLCJ1cmxfIiwidGV4dENvbG9yXyIsImFuY2hvcl8iLCJ0ZXh0U2l6ZV8iLCJmb250RmFtaWx5XyIsImZvbnRXZWlnaHRfIiwiYmFja2dyb3VuZFBvc2l0aW9uXyIsImJhY2tncm91bmRQb3NpdGlvbiIsIl90eXBlb2YiLCJ0eHRDb2xvciIsInR4dFNpemUiLCJmb250RmFtaWx5IiwiZm9udFdlaWdodCIsImpvaW4iLCJnbG9iYWwiLCJtb2R1bGUiLCJleHBvcnRzIiwiZmFjdG9yeSIsImRlZmluZSIsImFtZCIsInJlcXVpcmUiLCJqUXVlcnkiLCIkIiwiQmFyUmF0aW5nIiwic2VsZiIsIndyYXBFbGVtZW50IiwiY2xhc3NlcyIsInRoZW1lIiwiJGVsZW0iLCJ3cmFwIiwidW53cmFwRWxlbWVudCIsInVud3JhcCIsImZpbmRPcHRpb24iLCJ2YWx1ZSIsImlzTnVtZXJpYyIsImZsb29yIiwiZ2V0SW5pdGlhbE9wdGlvbiIsImluaXRpYWxSYXRpbmciLCJnZXRFbXB0eU9wdGlvbiIsIiRlbXB0eU9wdCIsImZpbmQiLCJlbXB0eVZhbHVlIiwiYWxsb3dFbXB0eSIsInByZXBlbmRUbyIsImdldERhdGEiLCJrZXkiLCJkYXRhIiwic2V0RGF0YSIsInNhdmVEYXRhT25FbGVtZW50IiwiJG9wdCIsInZhbCIsImVtcHR5VGV4dCIsInVzZXJPcHRpb25zIiwicmF0aW5nVmFsdWUiLCJyYXRpbmdUZXh0Iiwib3JpZ2luYWxSYXRpbmdWYWx1ZSIsIm9yaWdpbmFsUmF0aW5nVGV4dCIsImVtcHR5UmF0aW5nVmFsdWUiLCJlbXB0eVJhdGluZ1RleHQiLCJyZWFkT25seSIsInJlYWRvbmx5IiwicmF0aW5nTWFkZSIsInJlbW92ZURhdGFPbkVsZW1lbnQiLCJyZW1vdmVEYXRhIiwiYnVpbGRXaWRnZXQiLCIkdyIsImVhY2giLCJodG1sIiwiJGEiLCJzaG93VmFsdWVzIiwiYXBwZW5kIiwic2hvd1NlbGVjdGVkUmF0aW5nIiwicmV2ZXJzZSIsImFkZENsYXNzIiwibmV4dEFsbG9yUHJldmlvdXNBbGwiLCJzZXRTZWxlY3RGaWVsZFZhbHVlIiwicHJvcCIsImNoYW5nZSIsInJlc2V0U2VsZWN0RmllbGQiLCJkZWZhdWx0U2VsZWN0ZWQiLCJwYXJlbnQiLCJmcmFjdGlvbiIsInJvdW5kIiwicmVzZXRTdHlsZSIsIiR3aWRnZXQiLCJyZW1vdmVDbGFzcyIsIm1hdGNoIiwiYXBwbHlTdHlsZSIsImJhc2VWYWx1ZSIsImYiLCIkYWxsIiwiJGZyYWN0aW9uYWwiLCJpc0Rlc2VsZWN0YWJsZSIsIiRlbGVtZW50IiwiZGVzZWxlY3RhYmxlIiwiYXR0ciIsImF0dGFjaENsaWNrSGFuZGxlciIsIiRlbGVtZW50cyIsIm9uIiwicHJldmVudERlZmF1bHQiLCJvblNlbGVjdCIsImNhbGwiLCJhdHRhY2hNb3VzZUVudGVySGFuZGxlciIsImF0dGFjaE1vdXNlTGVhdmVIYW5kbGVyIiwiZmFzdENsaWNrcyIsInN0b3BQcm9wYWdhdGlvbiIsImNsaWNrIiwiZGlzYWJsZUNsaWNrcyIsImF0dGFjaEhhbmRsZXJzIiwiaG92ZXJTdGF0ZSIsImRldGFjaEhhbmRsZXJzIiwib2ZmIiwic2V0dXBIYW5kbGVycyIsImluc2VydEFmdGVyIiwic3RhdGUiLCJ0b2dnbGVDbGFzcyIsInNldCIsInNpbGVudCIsImNsZWFyIiwib25DbGVhciIsImRlc3Ryb3kiLCJvbkRlc3Ryb3kiLCJpbml0IiwiZWxlbSIsImZuIiwiYmFycmF0aW5nIiwiZGVmYXVsdHMiLCJtZXRob2QiLCJwbHVnaW4iLCJpcyIsImVycm9yIiwiaGFzT3duUHJvcGVydHkiLCJuZXh0IiwibGFuZyIsInNlYXJjaERhdGEiLCJzZWFyY2hEb25lIiwiY2FsZW5kYXJMb2FkZWQiLCJzYXZlZHdpZHRoIiwibGFyZ2UiLCJyZXNpemVkIiwiRm91bmRhdGlvbiIsImFkZFRvSnF1ZXJ5IiwiZm91bmRhdGlvbiIsImNoZWNrU2NyZWVuV2lkdGgiLCJiYXJzIiwiZSIsIiRmb3JtIiwiYWpheCIsInR5cGUiLCJzZXJpYWxpemUiLCJkYXRhVHlwZSIsInN1Y2Nlc3MiLCJyZXN1bHQiLCJmb3JtUmVzcG9uc2UiLCJsb2NhdGlvbiIsImhyZWYiLCJtZXNzYWdlIiwiJG1vZGFsIiwiUmV2ZWFsIiwib3BlbiIsImNzcyIsIm1vZGFsaWQiLCJ0cmltIiwiYWpheHVybCIsImNvbnRlbnQiLCJwaWQiLCJiYXIiLCJnZXRQcm9wZXJ0aWVzIiwiY2hpbGRyZW4iLCJ0b2dnbGUiLCJzZXRBY3RpdmVNZW51IiwibG9hZENhbGVuZGFyIiwidGFyZ2V0IiwiJHByb3BzIiwiJHRhYnMiLCJzcGVjaWFsIiwidG91Y2hzdGFydCIsInNldHVwIiwiXyIsIm5zIiwiaGFuZGxlIiwiaW5jbHVkZXMiLCJhZGRFdmVudExpc3RlbmVyIiwicGFzc2l2ZSIsInRvdWNobW92ZSIsImlkIiwicmVwbGFjZSIsInJlZGlyZWN0IiwiYWN0aW9uIiwiYXJndW1lbnRzIiwiYWN0aW9uX3ZhbHVlIiwicmVsb2FkIiwidmFscyIsInNldFNlYXJjaERhdGEiLCJyZXNwb25zZSIsImVtcHR5IiwiZmFkZUluIiwiaGFzQ2xhc3MiLCJzY3JvbGxUbyIsInNlYXJjaGJhciIsInNjcmVlbldpZHRoSGFzQ2hhbmdlZCIsIk1lZGlhUXVlcnkiLCJhdExlYXN0Iiwib3JpZ2luIiwicHJvdG9jb2wiLCJob3N0IiwibXlDb25maXJtIiwiJG15VGFzayIsIktyY29uZmlybSIsImNvbnN0cnVjdG9yIiwiZm9ybSIsInVwZGF0ZVF1b3RlIiwic2VyaWFsaXplQXJyYXkiLCJkaXYiLCJjaGVja1Rlcm1zIiwidGVzdCIsImdldEVsZW1lbnRCeUlkIiwidGVzdGMiLCJ0ZXN0dCIsImFncmVlY2hlY2siLCJjaGVja2VkIiwiYWdyZWVjaGVja2MiLCJhZ3JlZWNoZWNrdCIsIm15S3JEb2JFbnRyeSIsInRvZGF5IiwiQkFDS1NQQUNFIiwic2V0dGluZ3MiLCJjdXN0b21fdmFsaWRhdGlvbiIsImRheXNfaW5fbW9udGgiLCJkb2N1bWVudF9kYXRlIiwiZXJyb3Jib3hfeCIsImVycm9yYm94X3kiLCJmaWVsZF9oaW50X3RleHRfZGF5IiwiZmllbGRfaGludF90ZXh0X21vbnRoIiwiZmllbGRfaGludF90ZXh0X3llYXIiLCJmaWVsZF9vcmRlciIsImZpZWxkX3dpZHRoX2RheSIsImZpZWxkX3dpZHRoX21vbnRoIiwiZmllbGRfd2lkdGhfeWVhciIsImZpZWxkX3dpZHRoX3NlcCIsIm1pbm1heCIsIm1pbl9kYXRlIiwibWF4X2RhdGUiLCJtaW5feWVhciIsIm1vbnRoX25hbWUiLCJvbl9ibHVyIiwib25fZXJyb3IiLCJvbl9jaGFuZ2UiLCJwYXJzZV9kYXRlIiwic2VwYXJhdG9yIiwic2hvd19lcnJvcnMiLCJzaG93X2hpbnRzIiwiRV9EQVlfTkFOIiwiRV9EQVlfVE9PX0JJRyIsIkVfREFZX1RPT19TTUFMTCIsIkVfQkFEX0RBWV9GT1JfTU9OVEgiLCJFX01PTlRIX05BTiIsIkVfTU9OVEhfVE9PX0JJRyIsIkVfTU9OVEhfVE9PX1NNQUxMIiwiRV9ZRUFSX05BTiIsIkVfWUVBUl9MRU5HVEgiLCJFX1lFQVJfVE9PX1NNQUxMIiwiRV9NSU5fREFURSIsIkVfTUFYX0RBVEUiLCJLckRvYkVudHJ5IiwiZ2V0WW1kIiwiRGF0ZSIsImlucHV0X2RheSIsImlucHV0X21vbnRoIiwiaW5wdXRfeWVhciIsImRhdGUiLCJnZXRNb250aCIsImdldERheSIsImdldEZ1bGxZZWFyIiwiZ2V0WW1kT2JqZWN0IiwieWVhciIsIm1vbnRoIiwiZGF5IiwiYWRkRW50cnlGaWVsZHMiLCJkb2JmaWVsZCIsImZpZWxkcyIsInNwbGl0IiwiZmllbGQiLCJidWlsZEZpZWxkIiwiYWZ0ZXJQYXN0ZSIsInBhcnNlRGF0ZSIsInNldERhdGUiLCJuYW1lIiwia3Jkb2JlbnRyeSIsImlucHV0IiwiS3JEb2JJbnB1dCIsImhpbnRfdGV4dCIsImlubmVyIiwiJGlucHV0IiwiYnVpbGRVaSIsIndyYXBwZXIiLCJlcnJvcmJveCIsInNldEZpZWxkV2lkdGhzIiwiY2hlY2tEb2N1bWVudCIsImRvYiIsImNoaWxkZG9iIiwiY2xhc3NuYW1lIiwiZWxlbWVudHMiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiY2xlYXJFcnJvciIsImVycm9yX3RleHQiLCJzaG93RXJyb3IiLCJmb2N1cyIsInNldEZvY3VzIiwiZm9jdXNGaWVsZEJlZm9yZSIsInlpZWxkRm9jdXMiLCJmb2N1c0ZpZWxkQWZ0ZXIiLCJmb2N1c0luIiwiZm9jdXNPdXQiLCJ3aWRnZXRGb2N1c0xvc3QiLCJnZXREYXRlIiwiZGF5X3ZhbHVlIiwibW9udGhfdmFsdWUiLCJ5ZWFyX3ZhbHVlIiwicHJveHlMYWJlbENsaWNrcyIsInBhcnNlSXNvRGF0ZSIsIlJlZ0V4cCIsIiQzIiwiJDIiLCIkMSIsIm5ld19kYXRlIiwidmFsaWRhdGUiLCJzZXRFcnJvciIsImF2YWlsYWJsZSIsInRvdGFsIiwic2V0V2lkdGgiLCJzZXRSZWFkb25seSIsIm1vZGUiLCJ3aWRnZXRFcnJvclRleHQiLCJ4X29mZnNldCIsIm91dGVyV2lkdGgiLCJ5X29mZnNldCIsInBvc2l0aW9uIiwiY3VycmVudF9pbnB1dCIsInZhbGlkYXRlRGF5IiwidmFsaWRhdGVNb250aCIsInZhbGlkYXRlWWVhciIsInZhbGlkYXRlRGF5c0luTW9udGgiLCJ2YWxpZGF0ZUNvbXBsZXRlRGF0ZSIsImRhdGVfc3RyIiwiZGF0ZV9vYmoiLCJkYXRlX2lzbyIsIm9wdCIsImdldCIsImhhc19mb2N1cyIsIm51bSIsIm1zZyIsInRvU3RyaW5nIiwib25CbHVyIiwicHJveHkiLCJibHVyIiwia2V5ZG93biIsImtleXVwIiwic2hvd19oaW50Iiwia2V5X2lzX2Rvd24iLCJpc0RpZ2l0S2V5Iiwia2V5Y29kZSIsIndoaWNoIiwid2FudCIsIm5ld192YWx1ZSIsInNlbGVjdF9hbGwiLCJzZWxlY3QiLCJuZXdfd2lkdGgiLCJob3d0b2Fycml2ZSIsImFycml2YWxtZWFucyIsImdldEF0dHJpYnV0ZSIsImRpc3BsYXlBcnJpdmFsIiwiY2xhc3NMaXN0IiwiYXJyaXZhbGRhdGEiLCJhZGQiLCJtYXJrZXJzaGFwZSIsImNvb3JkcyIsIm15S3JtYXAiLCJtYXBEYXRhIiwibWFwWm9vbSIsImluZm9XaW5kb3ciLCJpbmZvV2luZG93MiIsInByb3BlcnR5ZGl2IiwicHJvcGVydHlpY29uIiwibWMiLCJwcm9wZXJ0eU1hcmtlcnMiLCJmaWx0ZXJJZHMiLCJtYXBNYXJrZXJzIiwibWFwVHlwZUlkIiwibWFwTWF4Wm9vbSIsIm1hcFR5cGUiLCJtYXBJZCIsIm1hcmtlckNvbG9yIiwiS3JtYXAiLCJnbU9wdGlvbnMiLCJzY3JvbGx3aGVlbCIsInN0cmVldFZpZXdDb250cm9sIiwiZ21hcmtlcnMiLCJpbml0TWFwIiwiY2xvc2VLckluZm93aW5kb3ciLCJjbG9zZSIsInNob3dWaXNpYmxlTWFya2VycyIsInNldFZpc2libGUiLCJjaGVja0R1cGxpY2F0ZSIsImN1cnJlbnQiLCJkdXBzIiwiZXF1YWxzIiwibmV3TGF0IiwibmV3TG5nIiwiY2hlY2tab29tIiwibXlsaXN0ZW5lciIsInNldFpvb20iLCJjbHVzdGVyTWFwIiwibWNPcHRpb25zIiwiZ3JpZFNpemUiLCJpZ25vcmVIaWRkZW5NYXJrZXJzIiwiaW1hZ2VQYXRoIiwic2V0UHJvcGVydHlNYXJrZXJzIiwic2V0TWFwTWFya2VycyIsImNyZWF0ZU1hcCIsIk1hcCIsIkluZm9XaW5kb3ciLCJjcmVhdGVNYXBNYXJrZXIiLCJwb2ludCIsImltYWdlIiwiYm94aW5mbyIsImxpbmsiLCJ0aXRsZSIsIk1hcmtlciIsInNoYXBlIiwiaWNvbiIsInpJbmRleCIsInNldENvbnRlbnQiLCJjcmVhdGVQcm9wZXJ0eU1hcmtlciIsImNvbG9yIiwibm90Iiwic2xpY2siLCJuZXh0QXJyb3ciLCJwcmV2QXJyb3ciLCJhdXRvcGxheSIsInNvbG9NYXAiLCJyZWZyZXNoTWFwIiwiJG1hcG1vZGFsIiwiYWxlcnQiLCJyZXNldE1hcCIsImFtYXJrIiwibWFya2VyaWNvbiIsIlNpemUiLCJQb2ludCIsImFuY2hvciIsIm15TGlzdGVuZXIiLCJmb3VuZCIsImN1cnJlbnRab29tIiwia2lja01hcCIsIm1hcF9tb2RhbCIsIiRzb2xvVHJpZ2dlciIsIm9uZSIsIiR0cmlnZ2VyIiwibXlLcnJvdXRlIiwiZGlyZWN0aW9uc0Rpc3BsYXkiLCJkaXJlY3Rpb25zVmlzaWJsZSIsInJvdXRlTWFwIiwiZGVzdGluYXRpb24iLCJyb3V0ZU1hcmtlcnMiLCJyb3V0ZVN0b3BQb2ludHMiLCJkZXRvdXIiLCJkaXJlY3Rpb25zUGFuZWwiLCJkaXJlY3Rpb25zU2VydmljZSIsIktycm91dGUiLCJEaXJlY3Rpb25zU2VydmljZSIsImNsZWFyUm91dGVNYXJrZXJzIiwiY2xlYXJXYXlwb2ludHMiLCJhZGRSb3V0ZU1hcmtlciIsImNhbGNSb3V0ZSIsImZyb21fYWRkcmVzcyIsIkRpcmVjdGlvbnNUcmF2ZWxNb2RlIiwiQklDWUNMSU5HIiwiRFJJVklORyIsIldBTEtJTkciLCJyZXF1ZXN0Iiwid2F5cG9pbnRzIiwidHJhdmVsTW9kZSIsImF2b2lkSGlnaHdheXMiLCJhdm9pZFRvbGxzIiwicm91dGUiLCJzdGF0dXMiLCJEaXJlY3Rpb25zU3RhdHVzIiwiT0siLCJzZXREaXJlY3Rpb25zIiwicmVzZXRSb3V0ZSIsIm15T3B0aW9ucyIsIkRpcmVjdGlvbnNSZW5kZXJlciIsInNldFBhbmVsIiwiTWFya2VySW1hZ2UiLCJsYXRMbmciLCJzdG9wb3ZlciIsImFkZExpc3RlbmVyT25jZSIsImRpcmVjdGlvblBhbmVsIiwiYWRkcmVzc1N0cmluZyIsImNvb3JkIiwiYWRkcmVzcyIsImpzb25kYXRhIiwibXlHbWFwIl0sInNvdXJjZVJvb3QiOiIifQ==