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
      //           $('#kr-properties-filter-heading').html(response['heading']);
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
          $(this).parent().children('li.filter-item').show();
        } else {
          $(this).parent().children('li.filter-item').hide();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUMsQ0FBQ3pLLElBQUksQ0FBQyxDQUFDO01BRTNELElBQUk1QixHQUFHLEdBQUcsb0RBQW9EO01BQzlELElBQUlpcEIsS0FBSyxHQUFHLEVBQUU7TUFFZC9kLE1BQU0sQ0FBQ2dJLElBQUksQ0FBQztRQUNYQyxJQUFJLEVBQU0sTUFBTTtRQUNoQm5ULEdBQUcsRUFBT0EsR0FBRztRQUNiMk0sSUFBSSxFQUFNO1VBQUN1YyxPQUFPLEVBQUVGO1FBQWEsQ0FBQztRQUNsQzNWLFFBQVEsRUFBRSxNQUFNO1FBQ2hCQyxPQUFPLEVBQUcsU0FBQUEsQ0FBVTZWLFFBQVEsRUFBRTtVQUM3QmplLE1BQU0sQ0FBQzZDLElBQUksQ0FBQ29iLFFBQVEsRUFBRSxVQUFVemMsR0FBRyxFQUFFSyxHQUFHLEVBQUU7WUFDekMsSUFBSW9LLEdBQUcsR0FBRyxHQUFHLEdBQUd6SyxHQUFHO1lBQ25CeEIsTUFBTSxDQUFDaU0sR0FBRyxDQUFDLENBQUNwSyxHQUFHLENBQUNBLEdBQUcsQ0FBQztZQUNwQmtjLEtBQUssQ0FBQ3ZjLEdBQUcsQ0FBQyxHQUFHSyxHQUFHO1lBQ2hCcWMsTUFBTSxDQUFDN0QsVUFBVSxDQUFDMEQsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFQSxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsS0FBSyxDQUFDO1VBQ3JELENBQUMsQ0FBQztRQUNIO01BQ0QsQ0FBQyxDQUFDO0lBQ0gsQ0FBQyxDQUFDO0VBQ0gsQ0FBQyxDQUFDO0FBQ0gsQ0FBQyxFQUFDL2QsTUFBTSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN1BUO0FBQ2dEO0FBQ2Y7QUFDUDtBQUMxQjtBQUM4QjtBQUNDO0FBQ0M7QUFDTjtBQUNFO0FBQzVCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8va3IvLi9ub2RlX21vZHVsZXMvaXMtbWFya2VyLWNsdXN0ZXJlci9zcmMvbWFya2VyY2x1c3RlcmVyLmpzIiwid2VicGFjazovL2tyLy4vbm9kZV9tb2R1bGVzL2pxdWVyeS1iYXItcmF0aW5nL2pxdWVyeS5iYXJyYXRpbmcuanMiLCJ3ZWJwYWNrOi8va3IvLi9zcmMvbWVkaWEvY29tX2tub3dyZXMvanMvc3JjL3NpdGUvYXBwLmpzIiwid2VicGFjazovL2tyLy4vc3JjL21lZGlhL2NvbV9rbm93cmVzL2pzL3NyYy9zaXRlL2NvbmZpcm0uanMiLCJ3ZWJwYWNrOi8va3IvLi9zcmMvbWVkaWEvY29tX2tub3dyZXMvanMvc3JjL3NpdGUvZG9iZW50cnkuanMiLCJ3ZWJwYWNrOi8va3IvLi9zcmMvbWVkaWEvY29tX2tub3dyZXMvanMvc3JjL3NpdGUvZ3Vlc3RkYXRhLmpzIiwid2VicGFjazovL2tyLy4vc3JjL21lZGlhL2NvbV9rbm93cmVzL2pzL3NyYy9zaXRlL21hcC5qcyIsIndlYnBhY2s6Ly9rci8uL3NyYy9tZWRpYS9jb21fa25vd3Jlcy9qcy9zcmMvc2l0ZS9yb3V0ZS5qcyIsIndlYnBhY2s6Ly9rci8uL3dlYnBhY2suYnVpbGQuc2l0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIE5wbSB2ZXJzaW9uIG9mIG1hcmtlckNsdXN0ZXJlciB3b3JrcyBncmVhdCB3aXRoIGJyb3dzZXJpZnlcbiAqIERpZmZlcmVuY2UgZnJvbSB0aGUgb3JpZ2luYWwgLSBhZGRzIGEgY29tbW9uanMgZm9ybWF0IGFuZCByZXBsYWNlcyB3aW5kb3cgd2l0aCBnbG9iYWwgYW5kIHNvbWUgdW5pdCB0ZXN0XG4gKiBUaGUgb3JpZ2luYWwgZnVuY3Rpb25hbGl0eSBpdCdzIG5vdCBtb2RpZmllZCBmb3IgZG9jcyBhbmQgb3JpZ2luYWwgc291cmNlIGNoZWNrXG4gKiBodHRwczovL2dpdGh1Yi5jb20vZ29vZ2xlbWFwcy9qcy1tYXJrZXItY2x1c3RlcmVyXG4gKi9cblxuLyoqXG4gKiBAbmFtZSBNYXJrZXJDbHVzdGVyZXIgZm9yIEdvb2dsZSBNYXBzIHYzXG4gKiBAdmVyc2lvbiB2ZXJzaW9uIDEuMFxuICogQGF1dGhvciBMdWtlIE1haGVcbiAqIEBmaWxlb3ZlcnZpZXdcbiAqIFRoZSBsaWJyYXJ5IGNyZWF0ZXMgYW5kIG1hbmFnZXMgcGVyLXpvb20tbGV2ZWwgY2x1c3RlcnMgZm9yIGxhcmdlIGFtb3VudHMgb2ZcbiAqIG1hcmtlcnMuXG4gKiA8YnIvPlxuICogVGhpcyBpcyBhIHYzIGltcGxlbWVudGF0aW9uIG9mIHRoZVxuICogPGEgaHJlZj1cImh0dHA6Ly9nbWFwcy11dGlsaXR5LWxpYnJhcnktZGV2Lmdvb2dsZWNvZGUuY29tL3N2bi90YWdzL21hcmtlcmNsdXN0ZXJlci9cIlxuICogPnYyIE1hcmtlckNsdXN0ZXJlcjwvYT4uXG4gKi9cblxuLyoqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuXG4vKipcbiAqIEEgTWFya2VyIENsdXN0ZXJlciB0aGF0IGNsdXN0ZXJzIG1hcmtlcnMuXG4gKlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5NYXB9IG1hcCBUaGUgR29vZ2xlIG1hcCB0byBhdHRhY2ggdG8uXG4gKiBAcGFyYW0ge0FycmF5Ljxnb29nbGUubWFwcy5NYXJrZXI+PX0gb3B0X21hcmtlcnMgT3B0aW9uYWwgbWFya2VycyB0byBhZGQgdG9cbiAqICAgdGhlIGNsdXN0ZXIuXG4gKiBAcGFyYW0ge09iamVjdD19IG9wdF9vcHRpb25zIHN1cHBvcnQgdGhlIGZvbGxvd2luZyBvcHRpb25zOlxuICogICAgICdncmlkU2l6ZSc6IChudW1iZXIpIFRoZSBncmlkIHNpemUgb2YgYSBjbHVzdGVyIGluIHBpeGVscy5cbiAqICAgICAnbWF4Wm9vbSc6IChudW1iZXIpIFRoZSBtYXhpbXVtIHpvb20gbGV2ZWwgdGhhdCBhIG1hcmtlciBjYW4gYmUgcGFydCBvZiBhXG4gKiAgICAgICAgICAgICAgICBjbHVzdGVyLlxuICogICAgICd6b29tT25DbGljayc6IChib29sZWFuKSBXaGV0aGVyIHRoZSBkZWZhdWx0IGJlaGF2aW91ciBvZiBjbGlja2luZyBvbiBhXG4gKiAgICAgICAgICAgICAgICAgICAgY2x1c3RlciBpcyB0byB6b29tIGludG8gaXQuXG4gKiAgICAgJ2F2ZXJhZ2VDZW50ZXInOiAoYm9vbGVhbikgV2V0aGVyIHRoZSBjZW50ZXIgb2YgZWFjaCBjbHVzdGVyIHNob3VsZCBiZVxuICogICAgICAgICAgICAgICAgICAgICAgdGhlIGF2ZXJhZ2Ugb2YgYWxsIG1hcmtlcnMgaW4gdGhlIGNsdXN0ZXIuXG4gKiAgICAgJ21pbmltdW1DbHVzdGVyU2l6ZSc6IChudW1iZXIpIFRoZSBtaW5pbXVtIG51bWJlciBvZiBtYXJrZXJzIHRvIGJlIGluIGFcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgY2x1c3RlciBiZWZvcmUgdGhlIG1hcmtlcnMgYXJlIGhpZGRlbiBhbmQgYSBjb3VudFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICBpcyBzaG93bi5cbiAqICAgICAnc3R5bGVzJzogKG9iamVjdCkgQW4gb2JqZWN0IHRoYXQgaGFzIHN0eWxlIHByb3BlcnRpZXM6XG4gKiAgICAgICAndXJsJzogKHN0cmluZykgVGhlIGltYWdlIHVybC5cbiAqICAgICAgICdoZWlnaHQnOiAobnVtYmVyKSBUaGUgaW1hZ2UgaGVpZ2h0LlxuICogICAgICAgJ3dpZHRoJzogKG51bWJlcikgVGhlIGltYWdlIHdpZHRoLlxuICogICAgICAgJ2FuY2hvcic6IChBcnJheSkgVGhlIGFuY2hvciBwb3NpdGlvbiBvZiB0aGUgbGFiZWwgdGV4dC5cbiAqICAgICAgICd0ZXh0Q29sb3InOiAoc3RyaW5nKSBUaGUgdGV4dCBjb2xvci5cbiAqICAgICAgICd0ZXh0U2l6ZSc6IChudW1iZXIpIFRoZSB0ZXh0IHNpemUuXG4gKiAgICAgICAnZm9udEZhbWlseSc6IChzdHJpbmcpIFRoZSBmb250IGZhbWlseS5cbiAqICAgICAgICdmb250V2VpZ2h0JzogKHN0cmluZykgVGhlIGZvbnQgd2VpZ2h0LlxuICogICAgICAgJ2JhY2tncm91bmRQb3NpdGlvbic6IChzdHJpbmcpIFRoZSBwb3NpdGlvbiBvZiB0aGUgYmFja2dvdW5kIHgsIHkuXG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlbmRzIGdvb2dsZS5tYXBzLk92ZXJsYXlWaWV3XG4gKi9cbmZ1bmN0aW9uIE1hcmtlckNsdXN0ZXJlcihtYXAsIG9wdF9tYXJrZXJzLCBvcHRfb3B0aW9ucykge1xuICAvLyBNYXJrZXJDbHVzdGVyZXIgaW1wbGVtZW50cyBnb29nbGUubWFwcy5PdmVybGF5VmlldyBpbnRlcmZhY2UuIFdlIHVzZSB0aGVcbiAgLy8gZXh0ZW5kIGZ1bmN0aW9uIHRvIGV4dGVuZCBNYXJrZXJDbHVzdGVyZXIgd2l0aCBnb29nbGUubWFwcy5PdmVybGF5Vmlld1xuICAvLyBiZWNhdXNlIGl0IG1pZ2h0IG5vdCBhbHdheXMgYmUgYXZhaWxhYmxlIHdoZW4gdGhlIGNvZGUgaXMgZGVmaW5lZCBzbyB3ZVxuICAvLyBsb29rIGZvciBpdCBhdCB0aGUgbGFzdCBwb3NzaWJsZSBtb21lbnQuIElmIGl0IGRvZXNuJ3QgZXhpc3Qgbm93IHRoZW5cbiAgLy8gdGhlcmUgaXMgbm8gcG9pbnQgZ29pbmcgYWhlYWQgOilcbiAgdGhpcy5leHRlbmQoTWFya2VyQ2x1c3RlcmVyLCBnb29nbGUubWFwcy5PdmVybGF5Vmlldyk7XG4gIHRoaXMubWFwXyA9IG1hcDtcblxuICAvKipcbiAgICogQHR5cGUge0FycmF5Ljxnb29nbGUubWFwcy5NYXJrZXI+fVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgdGhpcy5tYXJrZXJzXyA9IFtdO1xuXG4gIC8qKlxuICAgKiAgQHR5cGUge0FycmF5LjxDbHVzdGVyPn1cbiAgICovXG4gIHRoaXMuY2x1c3RlcnNfID0gW107XG5cbiAgdGhpcy5zaXplcyA9IFs1MywgNTYsIDY2LCA3OCwgOTBdO1xuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgdGhpcy5zdHlsZXNfID0gW107XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgdGhpcy5yZWFkeV8gPSBmYWxzZTtcblxuICB2YXIgb3B0aW9ucyA9IG9wdF9vcHRpb25zIHx8IHt9O1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgdGhpcy5ncmlkU2l6ZV8gPSBvcHRpb25zWydncmlkU2l6ZSddIHx8IDYwO1xuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgdGhpcy5taW5DbHVzdGVyU2l6ZV8gPSBvcHRpb25zWydtaW5pbXVtQ2x1c3RlclNpemUnXSB8fCAyO1xuXG5cbiAgLyoqXG4gICAqIEB0eXBlIHs/bnVtYmVyfVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgdGhpcy5tYXhab29tXyA9IG9wdGlvbnNbJ21heFpvb20nXSB8fCBudWxsO1xuXG4gIHRoaXMuc3R5bGVzXyA9IG9wdGlvbnNbJ3N0eWxlcyddIHx8IFtdO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgdGhpcy5pbWFnZVBhdGhfID0gb3B0aW9uc1snaW1hZ2VQYXRoJ10gfHxcbiAgICAgIHRoaXMuTUFSS0VSX0NMVVNURVJfSU1BR0VfUEFUSF87XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICB0aGlzLmltYWdlRXh0ZW5zaW9uXyA9IG9wdGlvbnNbJ2ltYWdlRXh0ZW5zaW9uJ10gfHxcbiAgICAgIHRoaXMuTUFSS0VSX0NMVVNURVJfSU1BR0VfRVhURU5TSU9OXztcblxuICAvKipcbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICB0aGlzLnpvb21PbkNsaWNrXyA9IHRydWU7XG5cbiAgaWYgKG9wdGlvbnNbJ3pvb21PbkNsaWNrJ10gIT0gdW5kZWZpbmVkKSB7XG4gICAgdGhpcy56b29tT25DbGlja18gPSBvcHRpb25zWyd6b29tT25DbGljayddO1xuICB9XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgdGhpcy5hdmVyYWdlQ2VudGVyXyA9IGZhbHNlO1xuXG4gIGlmIChvcHRpb25zWydhdmVyYWdlQ2VudGVyJ10gIT0gdW5kZWZpbmVkKSB7XG4gICAgdGhpcy5hdmVyYWdlQ2VudGVyXyA9IG9wdGlvbnNbJ2F2ZXJhZ2VDZW50ZXInXTtcbiAgfVxuXG4gIHRoaXMuc2V0dXBTdHlsZXNfKCk7XG5cbiAgdGhpcy5zZXRNYXAobWFwKTtcblxuICAvKipcbiAgICogQHR5cGUge251bWJlcn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHRoaXMucHJldlpvb21fID0gdGhpcy5tYXBfLmdldFpvb20oKTtcblxuICAvLyBBZGQgdGhlIG1hcCBldmVudCBsaXN0ZW5lcnNcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcih0aGlzLm1hcF8sICd6b29tX2NoYW5nZWQnLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgem9vbSA9IHRoYXQubWFwXy5nZXRab29tKCk7XG5cbiAgICBpZiAodGhhdC5wcmV2Wm9vbV8gIT0gem9vbSkge1xuICAgICAgdGhhdC5wcmV2Wm9vbV8gPSB6b29tO1xuICAgICAgdGhhdC5yZXNldFZpZXdwb3J0KCk7XG4gICAgfVxuICB9KTtcblxuICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcih0aGlzLm1hcF8sICdpZGxlJywgZnVuY3Rpb24oKSB7XG4gICAgdGhhdC5yZWRyYXcoKTtcbiAgfSk7XG5cbiAgLy8gRmluYWxseSwgYWRkIHRoZSBtYXJrZXJzXG4gIGlmIChvcHRfbWFya2VycyAmJiBvcHRfbWFya2Vycy5sZW5ndGgpIHtcbiAgICB0aGlzLmFkZE1hcmtlcnMob3B0X21hcmtlcnMsIGZhbHNlKTtcbiAgfVxufVxuXG5cbi8qKlxuICogVGhlIG1hcmtlciBjbHVzdGVyIGltYWdlIHBhdGguXG4gKlxuICogQHR5cGUge3N0cmluZ31cbiAqIEBwcml2YXRlXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuTUFSS0VSX0NMVVNURVJfSU1BR0VfUEFUSF8gPVxuICAgICdodHRwOi8vZ29vZ2xlLW1hcHMtdXRpbGl0eS1saWJyYXJ5LXYzLmdvb2dsZWNvZGUuY29tL3N2bi90cnVuay9tYXJrZXJjbHVzdGVyZXIvJyArXG4gICAgJ2ltYWdlcy9tJztcblxuXG4vKipcbiAqIFRoZSBtYXJrZXIgY2x1c3RlciBpbWFnZSBwYXRoLlxuICpcbiAqIEB0eXBlIHtzdHJpbmd9XG4gKiBAcHJpdmF0ZVxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLk1BUktFUl9DTFVTVEVSX0lNQUdFX0VYVEVOU0lPTl8gPSAncG5nJztcblxuXG4vKipcbiAqIEV4dGVuZHMgYSBvYmplY3RzIHByb3RvdHlwZSBieSBhbm90aGVycy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqMSBUaGUgb2JqZWN0IHRvIGJlIGV4dGVuZGVkLlxuICogQHBhcmFtIHtPYmplY3R9IG9iajIgVGhlIG9iamVjdCB0byBleHRlbmQgd2l0aC5cbiAqIEByZXR1cm4ge09iamVjdH0gVGhlIG5ldyBleHRlbmRlZCBvYmplY3QuXG4gKiBAaWdub3JlXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZXh0ZW5kID0gZnVuY3Rpb24ob2JqMSwgb2JqMikge1xuICByZXR1cm4gKGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIGZvciAodmFyIHByb3BlcnR5IGluIG9iamVjdC5wcm90b3R5cGUpIHtcbiAgICAgIHRoaXMucHJvdG90eXBlW3Byb3BlcnR5XSA9IG9iamVjdC5wcm90b3R5cGVbcHJvcGVydHldO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfSkuYXBwbHkob2JqMSwgW29iajJdKTtcbn07XG5cblxuLyoqXG4gKiBJbXBsZW1lbnRhaW9uIG9mIHRoZSBpbnRlcmZhY2UgbWV0aG9kLlxuICogQGlnbm9yZVxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLm9uQWRkID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuc2V0UmVhZHlfKHRydWUpO1xufTtcblxuLyoqXG4gKiBJbXBsZW1lbnRhaW9uIG9mIHRoZSBpbnRlcmZhY2UgbWV0aG9kLlxuICogQGlnbm9yZVxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmRyYXcgPSBmdW5jdGlvbigpIHt9O1xuXG4vKipcbiAqIFNldHMgdXAgdGhlIHN0eWxlcyBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5zZXR1cFN0eWxlc18gPSBmdW5jdGlvbigpIHtcbiAgaWYgKHRoaXMuc3R5bGVzXy5sZW5ndGgpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBmb3IgKHZhciBpID0gMCwgc2l6ZTsgc2l6ZSA9IHRoaXMuc2l6ZXNbaV07IGkrKykge1xuICAgIHRoaXMuc3R5bGVzXy5wdXNoKHtcbiAgICAgIHVybDogdGhpcy5pbWFnZVBhdGhfICsgKGkgKyAxKSArICcuJyArIHRoaXMuaW1hZ2VFeHRlbnNpb25fLFxuICAgICAgaGVpZ2h0OiBzaXplLFxuICAgICAgd2lkdGg6IHNpemVcbiAgICB9KTtcbiAgfVxufTtcblxuLyoqXG4gKiAgRml0IHRoZSBtYXAgdG8gdGhlIGJvdW5kcyBvZiB0aGUgbWFya2VycyBpbiB0aGUgY2x1c3RlcmVyLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmZpdE1hcFRvTWFya2VycyA9IGZ1bmN0aW9uKCkge1xuICB2YXIgbWFya2VycyA9IHRoaXMuZ2V0TWFya2VycygpO1xuICB2YXIgYm91bmRzID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZ0JvdW5kcygpO1xuICBmb3IgKHZhciBpID0gMCwgbWFya2VyOyBtYXJrZXIgPSBtYXJrZXJzW2ldOyBpKyspIHtcbiAgICBib3VuZHMuZXh0ZW5kKG1hcmtlci5nZXRQb3NpdGlvbigpKTtcbiAgfVxuXG4gIHRoaXMubWFwXy5maXRCb3VuZHMoYm91bmRzKTtcbn07XG5cblxuLyoqXG4gKiAgU2V0cyB0aGUgc3R5bGVzLlxuICpcbiAqICBAcGFyYW0ge09iamVjdH0gc3R5bGVzIFRoZSBzdHlsZSB0byBzZXQuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuc2V0U3R5bGVzID0gZnVuY3Rpb24oc3R5bGVzKSB7XG4gIHRoaXMuc3R5bGVzXyA9IHN0eWxlcztcbn07XG5cblxuLyoqXG4gKiAgR2V0cyB0aGUgc3R5bGVzLlxuICpcbiAqICBAcmV0dXJuIHtPYmplY3R9IFRoZSBzdHlsZXMgb2JqZWN0LlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldFN0eWxlcyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5zdHlsZXNfO1xufTtcblxuXG4vKipcbiAqIFdoZXRoZXIgem9vbSBvbiBjbGljayBpcyBzZXQuXG4gKlxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB6b29tT25DbGlja18gaXMgc2V0LlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmlzWm9vbU9uQ2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuem9vbU9uQ2xpY2tfO1xufTtcblxuLyoqXG4gKiBXaGV0aGVyIGF2ZXJhZ2UgY2VudGVyIGlzIHNldC5cbiAqXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIGF2ZXJhZ2VDZW50ZXJfIGlzIHNldC5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5pc0F2ZXJhZ2VDZW50ZXIgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuYXZlcmFnZUNlbnRlcl87XG59O1xuXG5cbi8qKlxuICogIFJldHVybnMgdGhlIGFycmF5IG9mIG1hcmtlcnMgaW4gdGhlIGNsdXN0ZXJlci5cbiAqXG4gKiAgQHJldHVybiB7QXJyYXkuPGdvb2dsZS5tYXBzLk1hcmtlcj59IFRoZSBtYXJrZXJzLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldE1hcmtlcnMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMubWFya2Vyc187XG59O1xuXG5cbi8qKlxuICogIFJldHVybnMgdGhlIG51bWJlciBvZiBtYXJrZXJzIGluIHRoZSBjbHVzdGVyZXJcbiAqXG4gKiAgQHJldHVybiB7TnVtYmVyfSBUaGUgbnVtYmVyIG9mIG1hcmtlcnMuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0VG90YWxNYXJrZXJzID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLm1hcmtlcnNfLmxlbmd0aDtcbn07XG5cblxuLyoqXG4gKiAgU2V0cyB0aGUgbWF4IHpvb20gZm9yIHRoZSBjbHVzdGVyZXIuXG4gKlxuICogIEBwYXJhbSB7bnVtYmVyfSBtYXhab29tIFRoZSBtYXggem9vbSBsZXZlbC5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5zZXRNYXhab29tID0gZnVuY3Rpb24obWF4Wm9vbSkge1xuICB0aGlzLm1heFpvb21fID0gbWF4Wm9vbTtcbn07XG5cblxuLyoqXG4gKiAgR2V0cyB0aGUgbWF4IHpvb20gZm9yIHRoZSBjbHVzdGVyZXIuXG4gKlxuICogIEByZXR1cm4ge251bWJlcn0gVGhlIG1heCB6b29tIGxldmVsLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldE1heFpvb20gPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMubWF4Wm9vbV87XG59O1xuXG5cbi8qKlxuICogIFRoZSBmdW5jdGlvbiBmb3IgY2FsY3VsYXRpbmcgdGhlIGNsdXN0ZXIgaWNvbiBpbWFnZS5cbiAqXG4gKiAgQHBhcmFtIHtBcnJheS48Z29vZ2xlLm1hcHMuTWFya2VyPn0gbWFya2VycyBUaGUgbWFya2VycyBpbiB0aGUgY2x1c3RlcmVyLlxuICogIEBwYXJhbSB7bnVtYmVyfSBudW1TdHlsZXMgVGhlIG51bWJlciBvZiBzdHlsZXMgYXZhaWxhYmxlLlxuICogIEByZXR1cm4ge09iamVjdH0gQSBvYmplY3QgcHJvcGVydGllczogJ3RleHQnIChzdHJpbmcpIGFuZCAnaW5kZXgnIChudW1iZXIpLlxuICogIEBwcml2YXRlXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuY2FsY3VsYXRvcl8gPSBmdW5jdGlvbihtYXJrZXJzLCBudW1TdHlsZXMpIHtcbiAgdmFyIGluZGV4ID0gMDtcbiAgdmFyIGNvdW50ID0gbWFya2Vycy5sZW5ndGg7XG4gIHZhciBkdiA9IGNvdW50O1xuICB3aGlsZSAoZHYgIT09IDApIHtcbiAgICBkdiA9IHBhcnNlSW50KGR2IC8gMTAsIDEwKTtcbiAgICBpbmRleCsrO1xuICB9XG5cbiAgaW5kZXggPSBNYXRoLm1pbihpbmRleCwgbnVtU3R5bGVzKTtcbiAgcmV0dXJuIHtcbiAgICB0ZXh0OiBjb3VudCxcbiAgICBpbmRleDogaW5kZXhcbiAgfTtcbn07XG5cblxuLyoqXG4gKiBTZXQgdGhlIGNhbGN1bGF0b3IgZnVuY3Rpb24uXG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbihBcnJheSwgbnVtYmVyKX0gY2FsY3VsYXRvciBUaGUgZnVuY3Rpb24gdG8gc2V0IGFzIHRoZVxuICogICAgIGNhbGN1bGF0b3IuIFRoZSBmdW5jdGlvbiBzaG91bGQgcmV0dXJuIGEgb2JqZWN0IHByb3BlcnRpZXM6XG4gKiAgICAgJ3RleHQnIChzdHJpbmcpIGFuZCAnaW5kZXgnIChudW1iZXIpLlxuICpcbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5zZXRDYWxjdWxhdG9yID0gZnVuY3Rpb24oY2FsY3VsYXRvcikge1xuICB0aGlzLmNhbGN1bGF0b3JfID0gY2FsY3VsYXRvcjtcbn07XG5cblxuLyoqXG4gKiBHZXQgdGhlIGNhbGN1bGF0b3IgZnVuY3Rpb24uXG4gKlxuICogQHJldHVybiB7ZnVuY3Rpb24oQXJyYXksIG51bWJlcil9IHRoZSBjYWxjdWxhdG9yIGZ1bmN0aW9uLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldENhbGN1bGF0b3IgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuY2FsY3VsYXRvcl87XG59O1xuXG5cbi8qKlxuICogQWRkIGFuIGFycmF5IG9mIG1hcmtlcnMgdG8gdGhlIGNsdXN0ZXJlci5cbiAqXG4gKiBAcGFyYW0ge0FycmF5Ljxnb29nbGUubWFwcy5NYXJrZXI+fSBtYXJrZXJzIFRoZSBtYXJrZXJzIHRvIGFkZC5cbiAqIEBwYXJhbSB7Ym9vbGVhbj19IG9wdF9ub2RyYXcgV2hldGhlciB0byByZWRyYXcgdGhlIGNsdXN0ZXJzLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmFkZE1hcmtlcnMgPSBmdW5jdGlvbihtYXJrZXJzLCBvcHRfbm9kcmF3KSB7XG4gIGZvciAodmFyIGkgPSAwLCBtYXJrZXI7IG1hcmtlciA9IG1hcmtlcnNbaV07IGkrKykge1xuICAgIHRoaXMucHVzaE1hcmtlclRvXyhtYXJrZXIpO1xuICB9XG4gIGlmICghb3B0X25vZHJhdykge1xuICAgIHRoaXMucmVkcmF3KCk7XG4gIH1cbn07XG5cblxuLyoqXG4gKiBQdXNoZXMgYSBtYXJrZXIgdG8gdGhlIGNsdXN0ZXJlci5cbiAqXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLk1hcmtlcn0gbWFya2VyIFRoZSBtYXJrZXIgdG8gYWRkLlxuICogQHByaXZhdGVcbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5wdXNoTWFya2VyVG9fID0gZnVuY3Rpb24obWFya2VyKSB7XG4gIG1hcmtlci5pc0FkZGVkID0gZmFsc2U7XG4gIGlmIChtYXJrZXJbJ2RyYWdnYWJsZSddKSB7XG4gICAgLy8gSWYgdGhlIG1hcmtlciBpcyBkcmFnZ2FibGUgYWRkIGEgbGlzdGVuZXIgc28gd2UgdXBkYXRlIHRoZSBjbHVzdGVycyBvblxuICAgIC8vIHRoZSBkcmFnIGVuZC5cbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIobWFya2VyLCAnZHJhZ2VuZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgbWFya2VyLmlzQWRkZWQgPSBmYWxzZTtcbiAgICAgIHRoYXQucmVwYWludCgpO1xuICAgIH0pO1xuICB9XG4gIHRoaXMubWFya2Vyc18ucHVzaChtYXJrZXIpO1xufTtcblxuXG4vKipcbiAqIEFkZHMgYSBtYXJrZXIgdG8gdGhlIGNsdXN0ZXJlciBhbmQgcmVkcmF3cyBpZiBuZWVkZWQuXG4gKlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5NYXJrZXJ9IG1hcmtlciBUaGUgbWFya2VyIHRvIGFkZC5cbiAqIEBwYXJhbSB7Ym9vbGVhbj19IG9wdF9ub2RyYXcgV2hldGhlciB0byByZWRyYXcgdGhlIGNsdXN0ZXJzLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmFkZE1hcmtlciA9IGZ1bmN0aW9uKG1hcmtlciwgb3B0X25vZHJhdykge1xuICB0aGlzLnB1c2hNYXJrZXJUb18obWFya2VyKTtcbiAgaWYgKCFvcHRfbm9kcmF3KSB7XG4gICAgdGhpcy5yZWRyYXcoKTtcbiAgfVxufTtcblxuXG4vKipcbiAqIFJlbW92ZXMgYSBtYXJrZXIgYW5kIHJldHVybnMgdHJ1ZSBpZiByZW1vdmVkLCBmYWxzZSBpZiBub3RcbiAqXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLk1hcmtlcn0gbWFya2VyIFRoZSBtYXJrZXIgdG8gcmVtb3ZlXG4gKiBAcmV0dXJuIHtib29sZWFufSBXaGV0aGVyIHRoZSBtYXJrZXIgd2FzIHJlbW92ZWQgb3Igbm90XG4gKiBAcHJpdmF0ZVxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnJlbW92ZU1hcmtlcl8gPSBmdW5jdGlvbihtYXJrZXIpIHtcbiAgdmFyIGluZGV4ID0gLTE7XG4gIGlmICh0aGlzLm1hcmtlcnNfLmluZGV4T2YpIHtcbiAgICBpbmRleCA9IHRoaXMubWFya2Vyc18uaW5kZXhPZihtYXJrZXIpO1xuICB9IGVsc2Uge1xuICAgIGZvciAodmFyIGkgPSAwLCBtOyBtID0gdGhpcy5tYXJrZXJzX1tpXTsgaSsrKSB7XG4gICAgICBpZiAobSA9PSBtYXJrZXIpIHtcbiAgICAgICAgaW5kZXggPSBpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAoaW5kZXggPT0gLTEpIHtcbiAgICAvLyBNYXJrZXIgaXMgbm90IGluIG91ciBsaXN0IG9mIG1hcmtlcnMuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgbWFya2VyLnNldE1hcChudWxsKTtcblxuICB0aGlzLm1hcmtlcnNfLnNwbGljZShpbmRleCwgMSk7XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5cbi8qKlxuICogUmVtb3ZlIGEgbWFya2VyIGZyb20gdGhlIGNsdXN0ZXIuXG4gKlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5NYXJrZXJ9IG1hcmtlciBUaGUgbWFya2VyIHRvIHJlbW92ZS5cbiAqIEBwYXJhbSB7Ym9vbGVhbj19IG9wdF9ub2RyYXcgT3B0aW9uYWwgYm9vbGVhbiB0byBmb3JjZSBubyByZWRyYXcuXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIHRoZSBtYXJrZXIgd2FzIHJlbW92ZWQuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUucmVtb3ZlTWFya2VyID0gZnVuY3Rpb24obWFya2VyLCBvcHRfbm9kcmF3KSB7XG4gIHZhciByZW1vdmVkID0gdGhpcy5yZW1vdmVNYXJrZXJfKG1hcmtlcik7XG5cbiAgaWYgKCFvcHRfbm9kcmF3ICYmIHJlbW92ZWQpIHtcbiAgICB0aGlzLnJlc2V0Vmlld3BvcnQoKTtcbiAgICB0aGlzLnJlZHJhdygpO1xuICAgIHJldHVybiB0cnVlO1xuICB9IGVsc2Uge1xuICAgcmV0dXJuIGZhbHNlO1xuICB9XG59O1xuXG5cbi8qKlxuICogUmVtb3ZlcyBhbiBhcnJheSBvZiBtYXJrZXJzIGZyb20gdGhlIGNsdXN0ZXIuXG4gKlxuICogQHBhcmFtIHtBcnJheS48Z29vZ2xlLm1hcHMuTWFya2VyPn0gbWFya2VycyBUaGUgbWFya2VycyB0byByZW1vdmUuXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSBvcHRfbm9kcmF3IE9wdGlvbmFsIGJvb2xlYW4gdG8gZm9yY2Ugbm8gcmVkcmF3LlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnJlbW92ZU1hcmtlcnMgPSBmdW5jdGlvbihtYXJrZXJzLCBvcHRfbm9kcmF3KSB7XG4gIHZhciByZW1vdmVkID0gZmFsc2U7XG5cbiAgZm9yICh2YXIgaSA9IDAsIG1hcmtlcjsgbWFya2VyID0gbWFya2Vyc1tpXTsgaSsrKSB7XG4gICAgdmFyIHIgPSB0aGlzLnJlbW92ZU1hcmtlcl8obWFya2VyKTtcbiAgICByZW1vdmVkID0gcmVtb3ZlZCB8fCByO1xuICB9XG5cbiAgaWYgKCFvcHRfbm9kcmF3ICYmIHJlbW92ZWQpIHtcbiAgICB0aGlzLnJlc2V0Vmlld3BvcnQoKTtcbiAgICB0aGlzLnJlZHJhdygpO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59O1xuXG5cbi8qKlxuICogU2V0cyB0aGUgY2x1c3RlcmVyJ3MgcmVhZHkgc3RhdGUuXG4gKlxuICogQHBhcmFtIHtib29sZWFufSByZWFkeSBUaGUgc3RhdGUuXG4gKiBAcHJpdmF0ZVxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnNldFJlYWR5XyA9IGZ1bmN0aW9uKHJlYWR5KSB7XG4gIGlmICghdGhpcy5yZWFkeV8pIHtcbiAgICB0aGlzLnJlYWR5XyA9IHJlYWR5O1xuICAgIHRoaXMuY3JlYXRlQ2x1c3RlcnNfKCk7XG4gIH1cbn07XG5cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgY2x1c3RlcnMgaW4gdGhlIGNsdXN0ZXJlci5cbiAqXG4gKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSBudW1iZXIgb2YgY2x1c3RlcnMuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0VG90YWxDbHVzdGVycyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5jbHVzdGVyc18ubGVuZ3RoO1xufTtcblxuXG4vKipcbiAqIFJldHVybnMgdGhlIGdvb2dsZSBtYXAgdGhhdCB0aGUgY2x1c3RlcmVyIGlzIGFzc29jaWF0ZWQgd2l0aC5cbiAqXG4gKiBAcmV0dXJuIHtnb29nbGUubWFwcy5NYXB9IFRoZSBtYXAuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0TWFwID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLm1hcF87XG59O1xuXG5cbi8qKlxuICogU2V0cyB0aGUgZ29vZ2xlIG1hcCB0aGF0IHRoZSBjbHVzdGVyZXIgaXMgYXNzb2NpYXRlZCB3aXRoLlxuICpcbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTWFwfSBtYXAgVGhlIG1hcC5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5zZXRNYXAgPSBmdW5jdGlvbihtYXApIHtcbiAgdGhpcy5tYXBfID0gbWFwO1xufTtcblxuXG4vKipcbiAqIFJldHVybnMgdGhlIHNpemUgb2YgdGhlIGdyaWQuXG4gKlxuICogQHJldHVybiB7bnVtYmVyfSBUaGUgZ3JpZCBzaXplLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldEdyaWRTaXplID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmdyaWRTaXplXztcbn07XG5cblxuLyoqXG4gKiBTZXRzIHRoZSBzaXplIG9mIHRoZSBncmlkLlxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBzaXplIFRoZSBncmlkIHNpemUuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuc2V0R3JpZFNpemUgPSBmdW5jdGlvbihzaXplKSB7XG4gIHRoaXMuZ3JpZFNpemVfID0gc2l6ZTtcbn07XG5cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBtaW4gY2x1c3RlciBzaXplLlxuICpcbiAqIEByZXR1cm4ge251bWJlcn0gVGhlIGdyaWQgc2l6ZS5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRNaW5DbHVzdGVyU2l6ZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5taW5DbHVzdGVyU2l6ZV87XG59O1xuXG4vKipcbiAqIFNldHMgdGhlIG1pbiBjbHVzdGVyIHNpemUuXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IHNpemUgVGhlIGdyaWQgc2l6ZS5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5zZXRNaW5DbHVzdGVyU2l6ZSA9IGZ1bmN0aW9uKHNpemUpIHtcbiAgdGhpcy5taW5DbHVzdGVyU2l6ZV8gPSBzaXplO1xufTtcblxuXG4vKipcbiAqIEV4dGVuZHMgYSBib3VuZHMgb2JqZWN0IGJ5IHRoZSBncmlkIHNpemUuXG4gKlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5MYXRMbmdCb3VuZHN9IGJvdW5kcyBUaGUgYm91bmRzIHRvIGV4dGVuZC5cbiAqIEByZXR1cm4ge2dvb2dsZS5tYXBzLkxhdExuZ0JvdW5kc30gVGhlIGV4dGVuZGVkIGJvdW5kcy5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRFeHRlbmRlZEJvdW5kcyA9IGZ1bmN0aW9uKGJvdW5kcykge1xuICB2YXIgcHJvamVjdGlvbiA9IHRoaXMuZ2V0UHJvamVjdGlvbigpO1xuXG4gIC8vIFR1cm4gdGhlIGJvdW5kcyBpbnRvIGxhdGxuZy5cbiAgdmFyIHRyID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhib3VuZHMuZ2V0Tm9ydGhFYXN0KCkubGF0KCksXG4gICAgICBib3VuZHMuZ2V0Tm9ydGhFYXN0KCkubG5nKCkpO1xuICB2YXIgYmwgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKGJvdW5kcy5nZXRTb3V0aFdlc3QoKS5sYXQoKSxcbiAgICAgIGJvdW5kcy5nZXRTb3V0aFdlc3QoKS5sbmcoKSk7XG5cbiAgLy8gQ29udmVydCB0aGUgcG9pbnRzIHRvIHBpeGVscyBhbmQgdGhlIGV4dGVuZCBvdXQgYnkgdGhlIGdyaWQgc2l6ZS5cbiAgdmFyIHRyUGl4ID0gcHJvamVjdGlvbi5mcm9tTGF0TG5nVG9EaXZQaXhlbCh0cik7XG4gIHRyUGl4LnggKz0gdGhpcy5ncmlkU2l6ZV87XG4gIHRyUGl4LnkgLT0gdGhpcy5ncmlkU2l6ZV87XG5cbiAgdmFyIGJsUGl4ID0gcHJvamVjdGlvbi5mcm9tTGF0TG5nVG9EaXZQaXhlbChibCk7XG4gIGJsUGl4LnggLT0gdGhpcy5ncmlkU2l6ZV87XG4gIGJsUGl4LnkgKz0gdGhpcy5ncmlkU2l6ZV87XG5cbiAgLy8gQ29udmVydCB0aGUgcGl4ZWwgcG9pbnRzIGJhY2sgdG8gTGF0TG5nXG4gIHZhciBuZSA9IHByb2plY3Rpb24uZnJvbURpdlBpeGVsVG9MYXRMbmcodHJQaXgpO1xuICB2YXIgc3cgPSBwcm9qZWN0aW9uLmZyb21EaXZQaXhlbFRvTGF0TG5nKGJsUGl4KTtcblxuICAvLyBFeHRlbmQgdGhlIGJvdW5kcyB0byBjb250YWluIHRoZSBuZXcgYm91bmRzLlxuICBib3VuZHMuZXh0ZW5kKG5lKTtcbiAgYm91bmRzLmV4dGVuZChzdyk7XG5cbiAgcmV0dXJuIGJvdW5kcztcbn07XG5cblxuLyoqXG4gKiBEZXRlcm1pbnMgaWYgYSBtYXJrZXIgaXMgY29udGFpbmVkIGluIGEgYm91bmRzLlxuICpcbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTWFya2VyfSBtYXJrZXIgVGhlIG1hcmtlciB0byBjaGVjay5cbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTGF0TG5nQm91bmRzfSBib3VuZHMgVGhlIGJvdW5kcyB0byBjaGVjayBhZ2FpbnN0LlxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgbWFya2VyIGlzIGluIHRoZSBib3VuZHMuXG4gKiBAcHJpdmF0ZVxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmlzTWFya2VySW5Cb3VuZHNfID0gZnVuY3Rpb24obWFya2VyLCBib3VuZHMpIHtcbiAgcmV0dXJuIGJvdW5kcy5jb250YWlucyhtYXJrZXIuZ2V0UG9zaXRpb24oKSk7XG59O1xuXG5cbi8qKlxuICogQ2xlYXJzIGFsbCBjbHVzdGVycyBhbmQgbWFya2VycyBmcm9tIHRoZSBjbHVzdGVyZXIuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuY2xlYXJNYXJrZXJzID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMucmVzZXRWaWV3cG9ydCh0cnVlKTtcblxuICAvLyBTZXQgdGhlIG1hcmtlcnMgYSBlbXB0eSBhcnJheS5cbiAgdGhpcy5tYXJrZXJzXyA9IFtdO1xufTtcblxuXG4vKipcbiAqIENsZWFycyBhbGwgZXhpc3RpbmcgY2x1c3RlcnMgYW5kIHJlY3JlYXRlcyB0aGVtLlxuICogQHBhcmFtIHtib29sZWFufSBvcHRfaGlkZSBUbyBhbHNvIGhpZGUgdGhlIG1hcmtlci5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5yZXNldFZpZXdwb3J0ID0gZnVuY3Rpb24ob3B0X2hpZGUpIHtcbiAgLy8gUmVtb3ZlIGFsbCB0aGUgY2x1c3RlcnNcbiAgZm9yICh2YXIgaSA9IDAsIGNsdXN0ZXI7IGNsdXN0ZXIgPSB0aGlzLmNsdXN0ZXJzX1tpXTsgaSsrKSB7XG4gICAgY2x1c3Rlci5yZW1vdmUoKTtcbiAgfVxuXG4gIC8vIFJlc2V0IHRoZSBtYXJrZXJzIHRvIG5vdCBiZSBhZGRlZCBhbmQgdG8gYmUgaW52aXNpYmxlLlxuICBmb3IgKHZhciBpID0gMCwgbWFya2VyOyBtYXJrZXIgPSB0aGlzLm1hcmtlcnNfW2ldOyBpKyspIHtcbiAgICBtYXJrZXIuaXNBZGRlZCA9IGZhbHNlO1xuICAgIGlmIChvcHRfaGlkZSkge1xuICAgICAgbWFya2VyLnNldE1hcChudWxsKTtcbiAgICB9XG4gIH1cblxuICB0aGlzLmNsdXN0ZXJzXyA9IFtdO1xufTtcblxuLyoqXG4gKlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnJlcGFpbnQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIG9sZENsdXN0ZXJzID0gdGhpcy5jbHVzdGVyc18uc2xpY2UoKTtcbiAgdGhpcy5jbHVzdGVyc18ubGVuZ3RoID0gMDtcbiAgdGhpcy5yZXNldFZpZXdwb3J0KCk7XG4gIHRoaXMucmVkcmF3KCk7XG5cbiAgLy8gUmVtb3ZlIHRoZSBvbGQgY2x1c3RlcnMuXG4gIC8vIERvIGl0IGluIGEgdGltZW91dCBzbyB0aGUgb3RoZXIgY2x1c3RlcnMgaGF2ZSBiZWVuIGRyYXduIGZpcnN0LlxuICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgY2x1c3RlcjsgY2x1c3RlciA9IG9sZENsdXN0ZXJzW2ldOyBpKyspIHtcbiAgICAgIGNsdXN0ZXIucmVtb3ZlKCk7XG4gICAgfVxuICB9LCAwKTtcbn07XG5cblxuLyoqXG4gKiBSZWRyYXdzIHRoZSBjbHVzdGVycy5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5yZWRyYXcgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5jcmVhdGVDbHVzdGVyc18oKTtcbn07XG5cblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIHR3byBsYXRsbmcgbG9jYXRpb25zIGluIGttLlxuICogQHNlZSBodHRwOi8vd3d3Lm1vdmFibGUtdHlwZS5jby51ay9zY3JpcHRzL2xhdGxvbmcuaHRtbFxuICpcbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTGF0TG5nfSBwMSBUaGUgZmlyc3QgbGF0IGxuZyBwb2ludC5cbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTGF0TG5nfSBwMiBUaGUgc2Vjb25kIGxhdCBsbmcgcG9pbnQuXG4gKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSBkaXN0YW5jZSBiZXR3ZWVuIHRoZSB0d28gcG9pbnRzIGluIGttLlxuICogQHByaXZhdGVcbiovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmRpc3RhbmNlQmV0d2VlblBvaW50c18gPSBmdW5jdGlvbihwMSwgcDIpIHtcbiAgaWYgKCFwMSB8fCAhcDIpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIHZhciBSID0gNjM3MTsgLy8gUmFkaXVzIG9mIHRoZSBFYXJ0aCBpbiBrbVxuICB2YXIgZExhdCA9IChwMi5sYXQoKSAtIHAxLmxhdCgpKSAqIE1hdGguUEkgLyAxODA7XG4gIHZhciBkTG9uID0gKHAyLmxuZygpIC0gcDEubG5nKCkpICogTWF0aC5QSSAvIDE4MDtcbiAgdmFyIGEgPSBNYXRoLnNpbihkTGF0IC8gMikgKiBNYXRoLnNpbihkTGF0IC8gMikgK1xuICAgIE1hdGguY29zKHAxLmxhdCgpICogTWF0aC5QSSAvIDE4MCkgKiBNYXRoLmNvcyhwMi5sYXQoKSAqIE1hdGguUEkgLyAxODApICpcbiAgICBNYXRoLnNpbihkTG9uIC8gMikgKiBNYXRoLnNpbihkTG9uIC8gMik7XG4gIHZhciBjID0gMiAqIE1hdGguYXRhbjIoTWF0aC5zcXJ0KGEpLCBNYXRoLnNxcnQoMSAtIGEpKTtcbiAgdmFyIGQgPSBSICogYztcbiAgcmV0dXJuIGQ7XG59O1xuXG5cbi8qKlxuICogQWRkIGEgbWFya2VyIHRvIGEgY2x1c3Rlciwgb3IgY3JlYXRlcyBhIG5ldyBjbHVzdGVyLlxuICpcbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTWFya2VyfSBtYXJrZXIgVGhlIG1hcmtlciB0byBhZGQuXG4gKiBAcHJpdmF0ZVxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmFkZFRvQ2xvc2VzdENsdXN0ZXJfID0gZnVuY3Rpb24obWFya2VyKSB7XG4gIHZhciBkaXN0YW5jZSA9IDQwMDAwOyAvLyBTb21lIGxhcmdlIG51bWJlclxuICB2YXIgY2x1c3RlclRvQWRkVG8gPSBudWxsO1xuICB2YXIgcG9zID0gbWFya2VyLmdldFBvc2l0aW9uKCk7XG4gIGZvciAodmFyIGkgPSAwLCBjbHVzdGVyOyBjbHVzdGVyID0gdGhpcy5jbHVzdGVyc19baV07IGkrKykge1xuICAgIHZhciBjZW50ZXIgPSBjbHVzdGVyLmdldENlbnRlcigpO1xuICAgIGlmIChjZW50ZXIpIHtcbiAgICAgIHZhciBkID0gdGhpcy5kaXN0YW5jZUJldHdlZW5Qb2ludHNfKGNlbnRlciwgbWFya2VyLmdldFBvc2l0aW9uKCkpO1xuICAgICAgaWYgKGQgPCBkaXN0YW5jZSkge1xuICAgICAgICBkaXN0YW5jZSA9IGQ7XG4gICAgICAgIGNsdXN0ZXJUb0FkZFRvID0gY2x1c3RlcjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAoY2x1c3RlclRvQWRkVG8gJiYgY2x1c3RlclRvQWRkVG8uaXNNYXJrZXJJbkNsdXN0ZXJCb3VuZHMobWFya2VyKSkge1xuICAgIGNsdXN0ZXJUb0FkZFRvLmFkZE1hcmtlcihtYXJrZXIpO1xuICB9IGVsc2Uge1xuICAgIHZhciBjbHVzdGVyID0gbmV3IENsdXN0ZXIodGhpcyk7XG4gICAgY2x1c3Rlci5hZGRNYXJrZXIobWFya2VyKTtcbiAgICB0aGlzLmNsdXN0ZXJzXy5wdXNoKGNsdXN0ZXIpO1xuICB9XG59O1xuXG5cbi8qKlxuICogQ3JlYXRlcyB0aGUgY2x1c3RlcnMuXG4gKlxuICogQHByaXZhdGVcbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5jcmVhdGVDbHVzdGVyc18gPSBmdW5jdGlvbigpIHtcbiAgaWYgKCF0aGlzLnJlYWR5Xykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIEdldCBvdXIgY3VycmVudCBtYXAgdmlldyBib3VuZHMuXG4gIC8vIENyZWF0ZSBhIG5ldyBib3VuZHMgb2JqZWN0IHNvIHdlIGRvbid0IGFmZmVjdCB0aGUgbWFwLlxuICB2YXIgbWFwQm91bmRzID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZ0JvdW5kcyh0aGlzLm1hcF8uZ2V0Qm91bmRzKCkuZ2V0U291dGhXZXN0KCksXG4gICAgICB0aGlzLm1hcF8uZ2V0Qm91bmRzKCkuZ2V0Tm9ydGhFYXN0KCkpO1xuICB2YXIgYm91bmRzID0gdGhpcy5nZXRFeHRlbmRlZEJvdW5kcyhtYXBCb3VuZHMpO1xuXG4gIGZvciAodmFyIGkgPSAwLCBtYXJrZXI7IG1hcmtlciA9IHRoaXMubWFya2Vyc19baV07IGkrKykge1xuICAgIGlmICghbWFya2VyLmlzQWRkZWQgJiYgdGhpcy5pc01hcmtlckluQm91bmRzXyhtYXJrZXIsIGJvdW5kcykpIHtcbiAgICAgIHRoaXMuYWRkVG9DbG9zZXN0Q2x1c3Rlcl8obWFya2VyKTtcbiAgICB9XG4gIH1cbn07XG5cblxuLyoqXG4gKiBBIGNsdXN0ZXIgdGhhdCBjb250YWlucyBtYXJrZXJzLlxuICpcbiAqIEBwYXJhbSB7TWFya2VyQ2x1c3RlcmVyfSBtYXJrZXJDbHVzdGVyZXIgVGhlIG1hcmtlcmNsdXN0ZXJlciB0aGF0IHRoaXNcbiAqICAgICBjbHVzdGVyIGlzIGFzc29jaWF0ZWQgd2l0aC5cbiAqIEBjb25zdHJ1Y3RvclxuICogQGlnbm9yZVxuICovXG5mdW5jdGlvbiBDbHVzdGVyKG1hcmtlckNsdXN0ZXJlcikge1xuICB0aGlzLm1hcmtlckNsdXN0ZXJlcl8gPSBtYXJrZXJDbHVzdGVyZXI7XG4gIHRoaXMubWFwXyA9IG1hcmtlckNsdXN0ZXJlci5nZXRNYXAoKTtcbiAgdGhpcy5ncmlkU2l6ZV8gPSBtYXJrZXJDbHVzdGVyZXIuZ2V0R3JpZFNpemUoKTtcbiAgdGhpcy5taW5DbHVzdGVyU2l6ZV8gPSBtYXJrZXJDbHVzdGVyZXIuZ2V0TWluQ2x1c3RlclNpemUoKTtcbiAgdGhpcy5hdmVyYWdlQ2VudGVyXyA9IG1hcmtlckNsdXN0ZXJlci5pc0F2ZXJhZ2VDZW50ZXIoKTtcbiAgdGhpcy5jZW50ZXJfID0gbnVsbDtcbiAgdGhpcy5tYXJrZXJzXyA9IFtdO1xuICB0aGlzLmJvdW5kc18gPSBudWxsO1xuICB0aGlzLmNsdXN0ZXJJY29uXyA9IG5ldyBDbHVzdGVySWNvbih0aGlzLCBtYXJrZXJDbHVzdGVyZXIuZ2V0U3R5bGVzKCksXG4gICAgICBtYXJrZXJDbHVzdGVyZXIuZ2V0R3JpZFNpemUoKSk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5zIGlmIGEgbWFya2VyIGlzIGFscmVhZHkgYWRkZWQgdG8gdGhlIGNsdXN0ZXIuXG4gKlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5NYXJrZXJ9IG1hcmtlciBUaGUgbWFya2VyIHRvIGNoZWNrLlxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgbWFya2VyIGlzIGFscmVhZHkgYWRkZWQuXG4gKi9cbkNsdXN0ZXIucHJvdG90eXBlLmlzTWFya2VyQWxyZWFkeUFkZGVkID0gZnVuY3Rpb24obWFya2VyKSB7XG4gIGlmICh0aGlzLm1hcmtlcnNfLmluZGV4T2YpIHtcbiAgICByZXR1cm4gdGhpcy5tYXJrZXJzXy5pbmRleE9mKG1hcmtlcikgIT0gLTE7XG4gIH0gZWxzZSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIG07IG0gPSB0aGlzLm1hcmtlcnNfW2ldOyBpKyspIHtcbiAgICAgIGlmIChtID09IG1hcmtlcikge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuXG4vKipcbiAqIEFkZCBhIG1hcmtlciB0aGUgY2x1c3Rlci5cbiAqXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLk1hcmtlcn0gbWFya2VyIFRoZSBtYXJrZXIgdG8gYWRkLlxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgbWFya2VyIHdhcyBhZGRlZC5cbiAqL1xuQ2x1c3Rlci5wcm90b3R5cGUuYWRkTWFya2VyID0gZnVuY3Rpb24obWFya2VyKSB7XG4gIGlmICh0aGlzLmlzTWFya2VyQWxyZWFkeUFkZGVkKG1hcmtlcikpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAoIXRoaXMuY2VudGVyXykge1xuICAgIHRoaXMuY2VudGVyXyA9IG1hcmtlci5nZXRQb3NpdGlvbigpO1xuICAgIHRoaXMuY2FsY3VsYXRlQm91bmRzXygpO1xuICB9IGVsc2Uge1xuICAgIGlmICh0aGlzLmF2ZXJhZ2VDZW50ZXJfKSB7XG4gICAgICB2YXIgbCA9IHRoaXMubWFya2Vyc18ubGVuZ3RoICsgMTtcbiAgICAgIHZhciBsYXQgPSAodGhpcy5jZW50ZXJfLmxhdCgpICogKGwtMSkgKyBtYXJrZXIuZ2V0UG9zaXRpb24oKS5sYXQoKSkgLyBsO1xuICAgICAgdmFyIGxuZyA9ICh0aGlzLmNlbnRlcl8ubG5nKCkgKiAobC0xKSArIG1hcmtlci5nZXRQb3NpdGlvbigpLmxuZygpKSAvIGw7XG4gICAgICB0aGlzLmNlbnRlcl8gPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKGxhdCwgbG5nKTtcbiAgICAgIHRoaXMuY2FsY3VsYXRlQm91bmRzXygpO1xuICAgIH1cbiAgfVxuXG4gIG1hcmtlci5pc0FkZGVkID0gdHJ1ZTtcbiAgdGhpcy5tYXJrZXJzXy5wdXNoKG1hcmtlcik7XG5cbiAgdmFyIGxlbiA9IHRoaXMubWFya2Vyc18ubGVuZ3RoO1xuICBpZiAobGVuIDwgdGhpcy5taW5DbHVzdGVyU2l6ZV8gJiYgbWFya2VyLmdldE1hcCgpICE9IHRoaXMubWFwXykge1xuICAgIC8vIE1pbiBjbHVzdGVyIHNpemUgbm90IHJlYWNoZWQgc28gc2hvdyB0aGUgbWFya2VyLlxuICAgIG1hcmtlci5zZXRNYXAodGhpcy5tYXBfKTtcbiAgfVxuXG4gIGlmIChsZW4gPT0gdGhpcy5taW5DbHVzdGVyU2l6ZV8pIHtcbiAgICAvLyBIaWRlIHRoZSBtYXJrZXJzIHRoYXQgd2VyZSBzaG93aW5nLlxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIHRoaXMubWFya2Vyc19baV0uc2V0TWFwKG51bGwpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChsZW4gPj0gdGhpcy5taW5DbHVzdGVyU2l6ZV8pIHtcbiAgICBtYXJrZXIuc2V0TWFwKG51bGwpO1xuICB9XG5cbiAgdGhpcy51cGRhdGVJY29uKCk7XG4gIHJldHVybiB0cnVlO1xufTtcblxuXG4vKipcbiAqIFJldHVybnMgdGhlIG1hcmtlciBjbHVzdGVyZXIgdGhhdCB0aGUgY2x1c3RlciBpcyBhc3NvY2lhdGVkIHdpdGguXG4gKlxuICogQHJldHVybiB7TWFya2VyQ2x1c3RlcmVyfSBUaGUgYXNzb2NpYXRlZCBtYXJrZXIgY2x1c3RlcmVyLlxuICovXG5DbHVzdGVyLnByb3RvdHlwZS5nZXRNYXJrZXJDbHVzdGVyZXIgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMubWFya2VyQ2x1c3RlcmVyXztcbn07XG5cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBib3VuZHMgb2YgdGhlIGNsdXN0ZXIuXG4gKlxuICogQHJldHVybiB7Z29vZ2xlLm1hcHMuTGF0TG5nQm91bmRzfSB0aGUgY2x1c3RlciBib3VuZHMuXG4gKi9cbkNsdXN0ZXIucHJvdG90eXBlLmdldEJvdW5kcyA9IGZ1bmN0aW9uKCkge1xuICB2YXIgYm91bmRzID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZ0JvdW5kcyh0aGlzLmNlbnRlcl8sIHRoaXMuY2VudGVyXyk7XG4gIHZhciBtYXJrZXJzID0gdGhpcy5nZXRNYXJrZXJzKCk7XG4gIGZvciAodmFyIGkgPSAwLCBtYXJrZXI7IG1hcmtlciA9IG1hcmtlcnNbaV07IGkrKykge1xuICAgIGJvdW5kcy5leHRlbmQobWFya2VyLmdldFBvc2l0aW9uKCkpO1xuICB9XG4gIHJldHVybiBib3VuZHM7XG59O1xuXG5cbi8qKlxuICogUmVtb3ZlcyB0aGUgY2x1c3RlclxuICovXG5DbHVzdGVyLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5jbHVzdGVySWNvbl8ucmVtb3ZlKCk7XG4gIHRoaXMubWFya2Vyc18ubGVuZ3RoID0gMDtcbiAgZGVsZXRlIHRoaXMubWFya2Vyc187XG59O1xuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgY2VudGVyIG9mIHRoZSBjbHVzdGVyLlxuICpcbiAqIEByZXR1cm4ge251bWJlcn0gVGhlIGNsdXN0ZXIgY2VudGVyLlxuICovXG5DbHVzdGVyLnByb3RvdHlwZS5nZXRTaXplID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLm1hcmtlcnNfLmxlbmd0aDtcbn07XG5cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBjZW50ZXIgb2YgdGhlIGNsdXN0ZXIuXG4gKlxuICogQHJldHVybiB7QXJyYXkuPGdvb2dsZS5tYXBzLk1hcmtlcj59IFRoZSBjbHVzdGVyIGNlbnRlci5cbiAqL1xuQ2x1c3Rlci5wcm90b3R5cGUuZ2V0TWFya2VycyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5tYXJrZXJzXztcbn07XG5cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBjZW50ZXIgb2YgdGhlIGNsdXN0ZXIuXG4gKlxuICogQHJldHVybiB7Z29vZ2xlLm1hcHMuTGF0TG5nfSBUaGUgY2x1c3RlciBjZW50ZXIuXG4gKi9cbkNsdXN0ZXIucHJvdG90eXBlLmdldENlbnRlciA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5jZW50ZXJfO1xufTtcblxuXG4vKipcbiAqIENhbGN1bGF0ZWQgdGhlIGV4dGVuZGVkIGJvdW5kcyBvZiB0aGUgY2x1c3RlciB3aXRoIHRoZSBncmlkLlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbkNsdXN0ZXIucHJvdG90eXBlLmNhbGN1bGF0ZUJvdW5kc18gPSBmdW5jdGlvbigpIHtcbiAgdmFyIGJvdW5kcyA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmdCb3VuZHModGhpcy5jZW50ZXJfLCB0aGlzLmNlbnRlcl8pO1xuICB0aGlzLmJvdW5kc18gPSB0aGlzLm1hcmtlckNsdXN0ZXJlcl8uZ2V0RXh0ZW5kZWRCb3VuZHMoYm91bmRzKTtcbn07XG5cblxuLyoqXG4gKiBEZXRlcm1pbmVzIGlmIGEgbWFya2VyIGxpZXMgaW4gdGhlIGNsdXN0ZXJzIGJvdW5kcy5cbiAqXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLk1hcmtlcn0gbWFya2VyIFRoZSBtYXJrZXIgdG8gY2hlY2suXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIHRoZSBtYXJrZXIgbGllcyBpbiB0aGUgYm91bmRzLlxuICovXG5DbHVzdGVyLnByb3RvdHlwZS5pc01hcmtlckluQ2x1c3RlckJvdW5kcyA9IGZ1bmN0aW9uKG1hcmtlcikge1xuICByZXR1cm4gdGhpcy5ib3VuZHNfLmNvbnRhaW5zKG1hcmtlci5nZXRQb3NpdGlvbigpKTtcbn07XG5cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBtYXAgdGhhdCB0aGUgY2x1c3RlciBpcyBhc3NvY2lhdGVkIHdpdGguXG4gKlxuICogQHJldHVybiB7Z29vZ2xlLm1hcHMuTWFwfSBUaGUgbWFwLlxuICovXG5DbHVzdGVyLnByb3RvdHlwZS5nZXRNYXAgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMubWFwXztcbn07XG5cblxuLyoqXG4gKiBVcGRhdGVzIHRoZSBjbHVzdGVyIGljb25cbiAqL1xuQ2x1c3Rlci5wcm90b3R5cGUudXBkYXRlSWNvbiA9IGZ1bmN0aW9uKCkge1xuICB2YXIgem9vbSA9IHRoaXMubWFwXy5nZXRab29tKCk7XG4gIHZhciBteiA9IHRoaXMubWFya2VyQ2x1c3RlcmVyXy5nZXRNYXhab29tKCk7XG5cbiAgaWYgKG16ICYmIHpvb20gPiBteikge1xuICAgIC8vIFRoZSB6b29tIGlzIGdyZWF0ZXIgdGhhbiBvdXIgbWF4IHpvb20gc28gc2hvdyBhbGwgdGhlIG1hcmtlcnMgaW4gY2x1c3Rlci5cbiAgICBmb3IgKHZhciBpID0gMCwgbWFya2VyOyBtYXJrZXIgPSB0aGlzLm1hcmtlcnNfW2ldOyBpKyspIHtcbiAgICAgIG1hcmtlci5zZXRNYXAodGhpcy5tYXBfKTtcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKHRoaXMubWFya2Vyc18ubGVuZ3RoIDwgdGhpcy5taW5DbHVzdGVyU2l6ZV8pIHtcbiAgICAvLyBNaW4gY2x1c3RlciBzaXplIG5vdCB5ZXQgcmVhY2hlZC5cbiAgICB0aGlzLmNsdXN0ZXJJY29uXy5oaWRlKCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIG51bVN0eWxlcyA9IHRoaXMubWFya2VyQ2x1c3RlcmVyXy5nZXRTdHlsZXMoKS5sZW5ndGg7XG4gIHZhciBzdW1zID0gdGhpcy5tYXJrZXJDbHVzdGVyZXJfLmdldENhbGN1bGF0b3IoKSh0aGlzLm1hcmtlcnNfLCBudW1TdHlsZXMpO1xuICB0aGlzLmNsdXN0ZXJJY29uXy5zZXRDZW50ZXIodGhpcy5jZW50ZXJfKTtcbiAgdGhpcy5jbHVzdGVySWNvbl8uc2V0U3VtcyhzdW1zKTtcbiAgdGhpcy5jbHVzdGVySWNvbl8uc2hvdygpO1xufTtcblxuXG4vKipcbiAqIEEgY2x1c3RlciBpY29uXG4gKlxuICogQHBhcmFtIHtDbHVzdGVyfSBjbHVzdGVyIFRoZSBjbHVzdGVyIHRvIGJlIGFzc29jaWF0ZWQgd2l0aC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzdHlsZXMgQW4gb2JqZWN0IHRoYXQgaGFzIHN0eWxlIHByb3BlcnRpZXM6XG4gKiAgICAgJ3VybCc6IChzdHJpbmcpIFRoZSBpbWFnZSB1cmwuXG4gKiAgICAgJ2hlaWdodCc6IChudW1iZXIpIFRoZSBpbWFnZSBoZWlnaHQuXG4gKiAgICAgJ3dpZHRoJzogKG51bWJlcikgVGhlIGltYWdlIHdpZHRoLlxuICogICAgICdhbmNob3InOiAoQXJyYXkpIFRoZSBhbmNob3IgcG9zaXRpb24gb2YgdGhlIGxhYmVsIHRleHQuXG4gKiAgICAgJ3RleHRDb2xvcic6IChzdHJpbmcpIFRoZSB0ZXh0IGNvbG9yLlxuICogICAgICd0ZXh0U2l6ZSc6IChudW1iZXIpIFRoZSB0ZXh0IHNpemUuXG4gKiAgICAgICdmb250RmFtaWx5JzogKHN0cmluZykgVGhlIGZvbnQgZmFtaWx5LlxuICogICAgICAnZm9udFdlaWdodCc6IChzdHJpbmcpIFRoZSBmb250IHdlaWdodC5cbiAqICAgICAnYmFja2dyb3VuZFBvc2l0aW9uOiAoc3RyaW5nKSBUaGUgYmFja2dyb3VuZCBwb3N0aXRpb24geCwgeS5cbiAqIEBwYXJhbSB7bnVtYmVyPX0gb3B0X3BhZGRpbmcgT3B0aW9uYWwgcGFkZGluZyB0byBhcHBseSB0byB0aGUgY2x1c3RlciBpY29uLlxuICogQGNvbnN0cnVjdG9yXG4gKiBAZXh0ZW5kcyBnb29nbGUubWFwcy5PdmVybGF5Vmlld1xuICogQGlnbm9yZVxuICovXG5mdW5jdGlvbiBDbHVzdGVySWNvbihjbHVzdGVyLCBzdHlsZXMsIG9wdF9wYWRkaW5nKSB7XG4gIGNsdXN0ZXIuZ2V0TWFya2VyQ2x1c3RlcmVyKCkuZXh0ZW5kKENsdXN0ZXJJY29uLCBnb29nbGUubWFwcy5PdmVybGF5Vmlldyk7XG5cbiAgdGhpcy5zdHlsZXNfID0gc3R5bGVzO1xuICB0aGlzLnBhZGRpbmdfID0gb3B0X3BhZGRpbmcgfHwgMDtcbiAgdGhpcy5jbHVzdGVyXyA9IGNsdXN0ZXI7XG4gIHRoaXMuY2VudGVyXyA9IG51bGw7XG4gIHRoaXMubWFwXyA9IGNsdXN0ZXIuZ2V0TWFwKCk7XG4gIHRoaXMuZGl2XyA9IG51bGw7XG4gIHRoaXMuc3Vtc18gPSBudWxsO1xuICB0aGlzLnZpc2libGVfID0gZmFsc2U7XG5cbiAgdGhpcy5zZXRNYXAodGhpcy5tYXBfKTtcbn1cblxuXG4vKipcbiAqIFRyaWdnZXJzIHRoZSBjbHVzdGVyY2xpY2sgZXZlbnQgYW5kIHpvb20ncyBpZiB0aGUgb3B0aW9uIGlzIHNldC5cbiAqL1xuQ2x1c3Rlckljb24ucHJvdG90eXBlLnRyaWdnZXJDbHVzdGVyQ2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgdmFyIG1hcmtlckNsdXN0ZXJlciA9IHRoaXMuY2x1c3Rlcl8uZ2V0TWFya2VyQ2x1c3RlcmVyKCk7XG5cbiAgLy8gVHJpZ2dlciB0aGUgY2x1c3RlcmNsaWNrIGV2ZW50LlxuICBnb29nbGUubWFwcy5ldmVudC50cmlnZ2VyKG1hcmtlckNsdXN0ZXJlciwgJ2NsdXN0ZXJjbGljaycsIHRoaXMuY2x1c3Rlcl8pO1xuXG4gIGlmIChtYXJrZXJDbHVzdGVyZXIuaXNab29tT25DbGljaygpKSB7XG4gICAgLy8gWm9vbSBpbnRvIHRoZSBjbHVzdGVyLlxuICAgIHRoaXMubWFwXy5maXRCb3VuZHModGhpcy5jbHVzdGVyXy5nZXRCb3VuZHMoKSk7XG4gIH1cbn07XG5cblxuLyoqXG4gKiBBZGRpbmcgdGhlIGNsdXN0ZXIgaWNvbiB0byB0aGUgZG9tLlxuICogQGlnbm9yZVxuICovXG5DbHVzdGVySWNvbi5wcm90b3R5cGUub25BZGQgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5kaXZfID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XG4gIGlmICh0aGlzLnZpc2libGVfKSB7XG4gICAgdmFyIHBvcyA9IHRoaXMuZ2V0UG9zRnJvbUxhdExuZ18odGhpcy5jZW50ZXJfKTtcbiAgICB0aGlzLmRpdl8uc3R5bGUuY3NzVGV4dCA9IHRoaXMuY3JlYXRlQ3NzKHBvcyk7XG4gICAgdGhpcy5kaXZfLmlubmVySFRNTCA9IHRoaXMuc3Vtc18udGV4dDtcbiAgfVxuXG4gIHZhciBwYW5lcyA9IHRoaXMuZ2V0UGFuZXMoKTtcbiAgcGFuZXMub3ZlcmxheU1vdXNlVGFyZ2V0LmFwcGVuZENoaWxkKHRoaXMuZGl2Xyk7XG5cbiAgdmFyIHRoYXQgPSB0aGlzO1xuICBnb29nbGUubWFwcy5ldmVudC5hZGREb21MaXN0ZW5lcih0aGlzLmRpdl8sICdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgIHRoYXQudHJpZ2dlckNsdXN0ZXJDbGljaygpO1xuICB9KTtcbn07XG5cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBwb3NpdGlvbiB0byBwbGFjZSB0aGUgZGl2IGRlbmRpbmcgb24gdGhlIGxhdGxuZy5cbiAqXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLkxhdExuZ30gbGF0bG5nIFRoZSBwb3NpdGlvbiBpbiBsYXRsbmcuXG4gKiBAcmV0dXJuIHtnb29nbGUubWFwcy5Qb2ludH0gVGhlIHBvc2l0aW9uIGluIHBpeGVscy5cbiAqIEBwcml2YXRlXG4gKi9cbkNsdXN0ZXJJY29uLnByb3RvdHlwZS5nZXRQb3NGcm9tTGF0TG5nXyA9IGZ1bmN0aW9uKGxhdGxuZykge1xuICB2YXIgcG9zID0gdGhpcy5nZXRQcm9qZWN0aW9uKCkuZnJvbUxhdExuZ1RvRGl2UGl4ZWwobGF0bG5nKTtcbiAgcG9zLnggLT0gcGFyc2VJbnQodGhpcy53aWR0aF8gLyAyLCAxMCk7XG4gIHBvcy55IC09IHBhcnNlSW50KHRoaXMuaGVpZ2h0XyAvIDIsIDEwKTtcbiAgcmV0dXJuIHBvcztcbn07XG5cblxuLyoqXG4gKiBEcmF3IHRoZSBpY29uLlxuICogQGlnbm9yZVxuICovXG5DbHVzdGVySWNvbi5wcm90b3R5cGUuZHJhdyA9IGZ1bmN0aW9uKCkge1xuICBpZiAodGhpcy52aXNpYmxlXykge1xuICAgIHZhciBwb3MgPSB0aGlzLmdldFBvc0Zyb21MYXRMbmdfKHRoaXMuY2VudGVyXyk7XG4gICAgdGhpcy5kaXZfLnN0eWxlLnRvcCA9IHBvcy55ICsgJ3B4JztcbiAgICB0aGlzLmRpdl8uc3R5bGUubGVmdCA9IHBvcy54ICsgJ3B4JztcbiAgfVxufTtcblxuXG4vKipcbiAqIEhpZGUgdGhlIGljb24uXG4gKi9cbkNsdXN0ZXJJY29uLnByb3RvdHlwZS5oaWRlID0gZnVuY3Rpb24oKSB7XG4gIGlmICh0aGlzLmRpdl8pIHtcbiAgICB0aGlzLmRpdl8uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgfVxuICB0aGlzLnZpc2libGVfID0gZmFsc2U7XG59O1xuXG5cbi8qKlxuICogUG9zaXRpb24gYW5kIHNob3cgdGhlIGljb24uXG4gKi9cbkNsdXN0ZXJJY29uLnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24oKSB7XG4gIGlmICh0aGlzLmRpdl8pIHtcbiAgICB2YXIgcG9zID0gdGhpcy5nZXRQb3NGcm9tTGF0TG5nXyh0aGlzLmNlbnRlcl8pO1xuICAgIHRoaXMuZGl2Xy5zdHlsZS5jc3NUZXh0ID0gdGhpcy5jcmVhdGVDc3MocG9zKTtcbiAgICB0aGlzLmRpdl8uc3R5bGUuZGlzcGxheSA9ICcnO1xuICB9XG4gIHRoaXMudmlzaWJsZV8gPSB0cnVlO1xufTtcblxuXG4vKipcbiAqIFJlbW92ZSB0aGUgaWNvbiBmcm9tIHRoZSBtYXBcbiAqL1xuQ2x1c3Rlckljb24ucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnNldE1hcChudWxsKTtcbn07XG5cblxuLyoqXG4gKiBJbXBsZW1lbnRhdGlvbiBvZiB0aGUgb25SZW1vdmUgaW50ZXJmYWNlLlxuICogQGlnbm9yZVxuICovXG5DbHVzdGVySWNvbi5wcm90b3R5cGUub25SZW1vdmUgPSBmdW5jdGlvbigpIHtcbiAgaWYgKHRoaXMuZGl2XyAmJiB0aGlzLmRpdl8ucGFyZW50Tm9kZSkge1xuICAgIHRoaXMuaGlkZSgpO1xuICAgIHRoaXMuZGl2Xy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuZGl2Xyk7XG4gICAgdGhpcy5kaXZfID0gbnVsbDtcbiAgfVxufTtcblxuXG4vKipcbiAqIFNldCB0aGUgc3VtcyBvZiB0aGUgaWNvbi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gc3VtcyBUaGUgc3VtcyBjb250YWluaW5nOlxuICogICAndGV4dCc6IChzdHJpbmcpIFRoZSB0ZXh0IHRvIGRpc3BsYXkgaW4gdGhlIGljb24uXG4gKiAgICdpbmRleCc6IChudW1iZXIpIFRoZSBzdHlsZSBpbmRleCBvZiB0aGUgaWNvbi5cbiAqL1xuQ2x1c3Rlckljb24ucHJvdG90eXBlLnNldFN1bXMgPSBmdW5jdGlvbihzdW1zKSB7XG4gIHRoaXMuc3Vtc18gPSBzdW1zO1xuICB0aGlzLnRleHRfID0gc3Vtcy50ZXh0O1xuICB0aGlzLmluZGV4XyA9IHN1bXMuaW5kZXg7XG4gIGlmICh0aGlzLmRpdl8pIHtcbiAgICB0aGlzLmRpdl8uaW5uZXJIVE1MID0gc3Vtcy50ZXh0O1xuICB9XG5cbiAgdGhpcy51c2VTdHlsZSgpO1xufTtcblxuXG4vKipcbiAqIFNldHMgdGhlIGljb24gdG8gdGhlIHRoZSBzdHlsZXMuXG4gKi9cbkNsdXN0ZXJJY29uLnByb3RvdHlwZS51c2VTdHlsZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgaW5kZXggPSBNYXRoLm1heCgwLCB0aGlzLnN1bXNfLmluZGV4IC0gMSk7XG4gIGluZGV4ID0gTWF0aC5taW4odGhpcy5zdHlsZXNfLmxlbmd0aCAtIDEsIGluZGV4KTtcbiAgdmFyIHN0eWxlID0gdGhpcy5zdHlsZXNfW2luZGV4XTtcbiAgdGhpcy51cmxfID0gc3R5bGVbJ3VybCddO1xuICB0aGlzLmhlaWdodF8gPSBzdHlsZVsnaGVpZ2h0J107XG4gIHRoaXMud2lkdGhfID0gc3R5bGVbJ3dpZHRoJ107XG4gIHRoaXMudGV4dENvbG9yXyA9IHN0eWxlWyd0ZXh0Q29sb3InXTtcbiAgdGhpcy5hbmNob3JfID0gc3R5bGVbJ2FuY2hvciddO1xuICB0aGlzLnRleHRTaXplXyA9IHN0eWxlWyd0ZXh0U2l6ZSddO1xuICB0aGlzLmZvbnRGYW1pbHlfID0gc3R5bGVbJ2ZvbnRGYW1pbHknXTtcbiAgdGhpcy5mb250V2VpZ2h0XyA9IHN0eWxlWydmb250V2VpZ2h0J107XG4gIHRoaXMuYmFja2dyb3VuZFBvc2l0aW9uXyA9IHN0eWxlWydiYWNrZ3JvdW5kUG9zaXRpb24nXTtcbn07XG5cblxuLyoqXG4gKiBTZXRzIHRoZSBjZW50ZXIgb2YgdGhlIGljb24uXG4gKlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5MYXRMbmd9IGNlbnRlciBUaGUgbGF0bG5nIHRvIHNldCBhcyB0aGUgY2VudGVyLlxuICovXG5DbHVzdGVySWNvbi5wcm90b3R5cGUuc2V0Q2VudGVyID0gZnVuY3Rpb24oY2VudGVyKSB7XG4gIHRoaXMuY2VudGVyXyA9IGNlbnRlcjtcbn07XG5cblxuLyoqXG4gKiBDcmVhdGUgdGhlIGNzcyB0ZXh0IGJhc2VkIG9uIHRoZSBwb3NpdGlvbiBvZiB0aGUgaWNvbi5cbiAqXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLlBvaW50fSBwb3MgVGhlIHBvc2l0aW9uLlxuICogQHJldHVybiB7c3RyaW5nfSBUaGUgY3NzIHN0eWxlIHRleHQuXG4gKi9cbkNsdXN0ZXJJY29uLnByb3RvdHlwZS5jcmVhdGVDc3MgPSBmdW5jdGlvbihwb3MpIHtcbiAgdmFyIHN0eWxlID0gW107XG4gIHN0eWxlLnB1c2goJ2JhY2tncm91bmQtaW1hZ2U6dXJsKCcgKyB0aGlzLnVybF8gKyAnKTsnKTtcbiAgdmFyIGJhY2tncm91bmRQb3NpdGlvbiA9IHRoaXMuYmFja2dyb3VuZFBvc2l0aW9uXyA/IHRoaXMuYmFja2dyb3VuZFBvc2l0aW9uXyA6ICcwIDAnO1xuICBzdHlsZS5wdXNoKCdiYWNrZ3JvdW5kLXBvc2l0aW9uOicgKyBiYWNrZ3JvdW5kUG9zaXRpb24gKyAnOycpO1xuXG4gIGlmICh0eXBlb2YgdGhpcy5hbmNob3JfID09PSAnb2JqZWN0Jykge1xuICAgIGlmICh0eXBlb2YgdGhpcy5hbmNob3JfWzBdID09PSAnbnVtYmVyJyAmJiB0aGlzLmFuY2hvcl9bMF0gPiAwICYmXG4gICAgICAgIHRoaXMuYW5jaG9yX1swXSA8IHRoaXMuaGVpZ2h0Xykge1xuICAgICAgc3R5bGUucHVzaCgnaGVpZ2h0OicgKyAodGhpcy5oZWlnaHRfIC0gdGhpcy5hbmNob3JfWzBdKSArXG4gICAgICAgICAgJ3B4OyBwYWRkaW5nLXRvcDonICsgdGhpcy5hbmNob3JfWzBdICsgJ3B4OycpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZS5wdXNoKCdoZWlnaHQ6JyArIHRoaXMuaGVpZ2h0XyArICdweDsgbGluZS1oZWlnaHQ6JyArIHRoaXMuaGVpZ2h0XyArXG4gICAgICAgICAgJ3B4OycpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHRoaXMuYW5jaG9yX1sxXSA9PT0gJ251bWJlcicgJiYgdGhpcy5hbmNob3JfWzFdID4gMCAmJlxuICAgICAgICB0aGlzLmFuY2hvcl9bMV0gPCB0aGlzLndpZHRoXykge1xuICAgICAgc3R5bGUucHVzaCgnd2lkdGg6JyArICh0aGlzLndpZHRoXyAtIHRoaXMuYW5jaG9yX1sxXSkgK1xuICAgICAgICAgICdweDsgcGFkZGluZy1sZWZ0OicgKyB0aGlzLmFuY2hvcl9bMV0gKyAncHg7Jyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlLnB1c2goJ3dpZHRoOicgKyB0aGlzLndpZHRoXyArICdweDsgdGV4dC1hbGlnbjpjZW50ZXI7Jyk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHN0eWxlLnB1c2goJ2hlaWdodDonICsgdGhpcy5oZWlnaHRfICsgJ3B4OyBsaW5lLWhlaWdodDonICtcbiAgICAgICAgdGhpcy5oZWlnaHRfICsgJ3B4OyB3aWR0aDonICsgdGhpcy53aWR0aF8gKyAncHg7IHRleHQtYWxpZ246Y2VudGVyOycpO1xuICB9XG5cbiAgdmFyIHR4dENvbG9yID0gdGhpcy50ZXh0Q29sb3JfID8gdGhpcy50ZXh0Q29sb3JfIDogJ2JsYWNrJztcbiAgdmFyIHR4dFNpemUgPSB0aGlzLnRleHRTaXplXyA/IHRoaXMudGV4dFNpemVfIDogMTE7XG4gIHZhciBmb250RmFtaWx5ID0gdGhpcy5mb250RmFtaWx5XyA/IHRoaXMuZm9udEZhbWlseV8gOiAnQXJpYWwsc2Fucy1zZXJpZic7XG4gIHZhciBmb250V2VpZ2h0ID0gdGhpcy5mb250V2VpZ2h0XyA/IHRoaXMuZm9udFdlaWdodF8gOiAnNDAwJztcblxuICBzdHlsZS5wdXNoKCdjdXJzb3I6cG9pbnRlcjsgdG9wOicgKyBwb3MueSArICdweDsgbGVmdDonICtcbiAgICAgIHBvcy54ICsgJ3B4OyBjb2xvcjonICsgdHh0Q29sb3IgKyAnOyBwb3NpdGlvbjphYnNvbHV0ZTsgZm9udC1zaXplOicgK1xuICAgICAgdHh0U2l6ZSArICdweDsgZm9udC1mYW1pbHk6JyArIGZvbnRGYW1pbHkgKyAnOyBmb250LXdlaWdodDonICsgZm9udFdlaWdodCArICc7Jyk7XG4gIHJldHVybiBzdHlsZS5qb2luKCcnKTtcbn07XG5cblxuLy8gRXhwb3J0IFN5bWJvbHMgZm9yIENsb3N1cmVcbi8vIElmIHlvdSBhcmUgbm90IGdvaW5nIHRvIGNvbXBpbGUgd2l0aCBjbG9zdXJlIHRoZW4geW91IGNhbiByZW1vdmUgdGhlXG4vLyBjb2RlIGJlbG93LlxuZ2xvYmFsWydNYXJrZXJDbHVzdGVyZXInXSA9IE1hcmtlckNsdXN0ZXJlcjtcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ2FkZE1hcmtlciddID0gTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5hZGRNYXJrZXI7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydhZGRNYXJrZXJzJ10gPSBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmFkZE1hcmtlcnM7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydjbGVhck1hcmtlcnMnXSA9XG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5jbGVhck1hcmtlcnM7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydmaXRNYXBUb01hcmtlcnMnXSA9XG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5maXRNYXBUb01hcmtlcnM7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydnZXRDYWxjdWxhdG9yJ10gPVxuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0Q2FsY3VsYXRvcjtcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ2dldEdyaWRTaXplJ10gPVxuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0R3JpZFNpemU7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydnZXRFeHRlbmRlZEJvdW5kcyddID1cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldEV4dGVuZGVkQm91bmRzO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnZ2V0TWFwJ10gPSBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldE1hcDtcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ2dldE1hcmtlcnMnXSA9IE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0TWFya2Vycztcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ2dldE1heFpvb20nXSA9IE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0TWF4Wm9vbTtcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ2dldFN0eWxlcyddID0gTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRTdHlsZXM7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydnZXRUb3RhbENsdXN0ZXJzJ10gPVxuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0VG90YWxDbHVzdGVycztcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ2dldFRvdGFsTWFya2VycyddID1cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldFRvdGFsTWFya2Vycztcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ3JlZHJhdyddID0gTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5yZWRyYXc7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydyZW1vdmVNYXJrZXInXSA9XG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5yZW1vdmVNYXJrZXI7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydyZW1vdmVNYXJrZXJzJ10gPVxuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUucmVtb3ZlTWFya2Vycztcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ3Jlc2V0Vmlld3BvcnQnXSA9XG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5yZXNldFZpZXdwb3J0O1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsncmVwYWludCddID1cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnJlcGFpbnQ7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydzZXRDYWxjdWxhdG9yJ10gPVxuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuc2V0Q2FsY3VsYXRvcjtcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ3NldEdyaWRTaXplJ10gPVxuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuc2V0R3JpZFNpemU7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydzZXRNYXhab29tJ10gPVxuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuc2V0TWF4Wm9vbTtcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ29uQWRkJ10gPSBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLm9uQWRkO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnZHJhdyddID0gTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5kcmF3O1xuXG5DbHVzdGVyLnByb3RvdHlwZVsnZ2V0Q2VudGVyJ10gPSBDbHVzdGVyLnByb3RvdHlwZS5nZXRDZW50ZXI7XG5DbHVzdGVyLnByb3RvdHlwZVsnZ2V0U2l6ZSddID0gQ2x1c3Rlci5wcm90b3R5cGUuZ2V0U2l6ZTtcbkNsdXN0ZXIucHJvdG90eXBlWydnZXRNYXJrZXJzJ10gPSBDbHVzdGVyLnByb3RvdHlwZS5nZXRNYXJrZXJzO1xuXG5DbHVzdGVySWNvbi5wcm90b3R5cGVbJ29uQWRkJ10gPSBDbHVzdGVySWNvbi5wcm90b3R5cGUub25BZGQ7XG5DbHVzdGVySWNvbi5wcm90b3R5cGVbJ2RyYXcnXSA9IENsdXN0ZXJJY29uLnByb3RvdHlwZS5kcmF3O1xuQ2x1c3Rlckljb24ucHJvdG90eXBlWydvblJlbW92ZSddID0gQ2x1c3Rlckljb24ucHJvdG90eXBlLm9uUmVtb3ZlO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gTWFya2VyQ2x1c3RlcmVyO1xuIiwiLyoqXG4gKiBqUXVlcnkgQmFyIFJhdGluZyBQbHVnaW4gdjEuMi4yXG4gKlxuICogaHR0cDovL2dpdGh1Yi5jb20vYW50ZW5uYWlvL2pxdWVyeS1iYXItcmF0aW5nXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDEyLTIwMTYgS2F6aWsgUGlldHJ1c3pld3NraVxuICpcbiAqIFRoaXMgcGx1Z2luIGlzIGF2YWlsYWJsZSB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG4gKiBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICovXG4oZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIC8vIEFNRFxuICAgICAgICBkZWZpbmUoWydqcXVlcnknXSwgZmFjdG9yeSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgICAgICAvLyBOb2RlL0NvbW1vbkpTXG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKCdqcXVlcnknKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gYnJvd3NlciBnbG9iYWxzXG4gICAgICAgIGZhY3RvcnkoalF1ZXJ5KTtcbiAgICB9XG59KGZ1bmN0aW9uICgkKSB7XG5cbiAgICB2YXIgQmFyUmF0aW5nID0gKGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIGZ1bmN0aW9uIEJhclJhdGluZygpIHtcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICAgICAgLy8gd3JhcCBlbGVtZW50IGluIGEgd3JhcHBlciBkaXZcbiAgICAgICAgICAgIHZhciB3cmFwRWxlbWVudCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBjbGFzc2VzID0gWydici13cmFwcGVyJ107XG5cbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5vcHRpb25zLnRoZW1lICE9PSAnJykge1xuICAgICAgICAgICAgICAgICAgICBjbGFzc2VzLnB1c2goJ2JyLXRoZW1lLScgKyBzZWxmLm9wdGlvbnMudGhlbWUpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0ud3JhcCgkKCc8ZGl2IC8+Jywge1xuICAgICAgICAgICAgICAgICAgICAnY2xhc3MnOiBjbGFzc2VzLmpvaW4oJyAnKVxuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIHVud3JhcCBlbGVtZW50XG4gICAgICAgICAgICB2YXIgdW53cmFwRWxlbWVudCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0udW53cmFwKCk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBmaW5kIG9wdGlvbiBieSB2YWx1ZVxuICAgICAgICAgICAgdmFyIGZpbmRPcHRpb24gPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICgkLmlzTnVtZXJpYyh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBNYXRoLmZsb29yKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gJCgnb3B0aW9uW3ZhbHVlPVwiJyArIHZhbHVlICArICdcIl0nLCBzZWxmLiRlbGVtKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIGdldCBpbml0aWFsIG9wdGlvblxuICAgICAgICAgICAgdmFyIGdldEluaXRpYWxPcHRpb24gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgaW5pdGlhbFJhdGluZyA9IHNlbGYub3B0aW9ucy5pbml0aWFsUmF0aW5nO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFpbml0aWFsUmF0aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAkKCdvcHRpb246c2VsZWN0ZWQnLCBzZWxmLiRlbGVtKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZmluZE9wdGlvbihpbml0aWFsUmF0aW5nKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIGdldCBlbXB0eSBvcHRpb25cbiAgICAgICAgICAgIHZhciBnZXRFbXB0eU9wdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciAkZW1wdHlPcHQgPSBzZWxmLiRlbGVtLmZpbmQoJ29wdGlvblt2YWx1ZT1cIicgKyBzZWxmLm9wdGlvbnMuZW1wdHlWYWx1ZSArICdcIl0nKTtcblxuICAgICAgICAgICAgICAgIGlmICghJGVtcHR5T3B0Lmxlbmd0aCAmJiBzZWxmLm9wdGlvbnMuYWxsb3dFbXB0eSkge1xuICAgICAgICAgICAgICAgICAgICAkZW1wdHlPcHQgPSAkKCc8b3B0aW9uIC8+JywgeyAndmFsdWUnOiBzZWxmLm9wdGlvbnMuZW1wdHlWYWx1ZSB9KTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJGVtcHR5T3B0LnByZXBlbmRUbyhzZWxmLiRlbGVtKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gJGVtcHR5T3B0O1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gZ2V0IGRhdGFcbiAgICAgICAgICAgIHZhciBnZXREYXRhID0gZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSBzZWxmLiRlbGVtLmRhdGEoJ2JhcnJhdGluZycpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBrZXkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhW2tleV07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBzZXQgZGF0YVxuICAgICAgICAgICAgdmFyIHNldERhdGEgPSBmdW5jdGlvbihrZXksIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi4kZWxlbS5kYXRhKCdiYXJyYXRpbmcnLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi4kZWxlbS5kYXRhKCdiYXJyYXRpbmcnKVtrZXldID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gc2F2ZSBkYXRhIG9uIGVsZW1lbnRcbiAgICAgICAgICAgIHZhciBzYXZlRGF0YU9uRWxlbWVudCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciAkb3B0ID0gZ2V0SW5pdGlhbE9wdGlvbigpO1xuICAgICAgICAgICAgICAgIHZhciAkZW1wdHlPcHQgPSBnZXRFbXB0eU9wdGlvbigpO1xuXG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gJG9wdC52YWwoKTtcbiAgICAgICAgICAgICAgICB2YXIgdGV4dCA9ICRvcHQuZGF0YSgnaHRtbCcpID8gJG9wdC5kYXRhKCdodG1sJykgOiAkb3B0LnRleHQoKTtcblxuICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBhbGxvd0VtcHR5IG9wdGlvbiBpcyBub3Qgc2V0IGxldCdzIGNoZWNrIGlmIGVtcHR5IG9wdGlvbiBleGlzdHMgaW4gdGhlIHNlbGVjdCBmaWVsZFxuICAgICAgICAgICAgICAgIHZhciBhbGxvd0VtcHR5ID0gKHNlbGYub3B0aW9ucy5hbGxvd0VtcHR5ICE9PSBudWxsKSA/XG4gICAgICAgICAgICAgICAgICAgIHNlbGYub3B0aW9ucy5hbGxvd0VtcHR5IDpcbiAgICAgICAgICAgICAgICAgICAgISEkZW1wdHlPcHQubGVuZ3RoO1xuXG4gICAgICAgICAgICAgICAgdmFyIGVtcHR5VmFsdWUgPSAoJGVtcHR5T3B0Lmxlbmd0aCkgPyAkZW1wdHlPcHQudmFsKCkgOiBudWxsO1xuICAgICAgICAgICAgICAgIHZhciBlbXB0eVRleHQgPSAoJGVtcHR5T3B0Lmxlbmd0aCkgPyAkZW1wdHlPcHQudGV4dCgpIDogbnVsbDtcblxuICAgICAgICAgICAgICAgIHNldERhdGEobnVsbCwge1xuICAgICAgICAgICAgICAgICAgICB1c2VyT3B0aW9uczogc2VsZi5vcHRpb25zLFxuXG4gICAgICAgICAgICAgICAgICAgIC8vIGluaXRpYWwgcmF0aW5nIGJhc2VkIG9uIHRoZSBPUFRJT04gdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgcmF0aW5nVmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgICAgICAgICByYXRpbmdUZXh0OiB0ZXh0LFxuXG4gICAgICAgICAgICAgICAgICAgIC8vIHJhdGluZyB3aWxsIGJlIHJlc3RvcmVkIGJ5IGNhbGxpbmcgY2xlYXIgbWV0aG9kXG4gICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsUmF0aW5nVmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbFJhdGluZ1RleHQ6IHRleHQsXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gYWxsb3cgZW1wdHkgcmF0aW5ncz9cbiAgICAgICAgICAgICAgICAgICAgYWxsb3dFbXB0eTogYWxsb3dFbXB0eSxcblxuICAgICAgICAgICAgICAgICAgICAvLyByYXRpbmcgdmFsdWUgYW5kIHRleHQgb2YgdGhlIGVtcHR5IE9QVElPTlxuICAgICAgICAgICAgICAgICAgICBlbXB0eVJhdGluZ1ZhbHVlOiBlbXB0eVZhbHVlLFxuICAgICAgICAgICAgICAgICAgICBlbXB0eVJhdGluZ1RleHQ6IGVtcHR5VGV4dCxcblxuICAgICAgICAgICAgICAgICAgICAvLyByZWFkLW9ubHkgc3RhdGVcbiAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6IHNlbGYub3B0aW9ucy5yZWFkb25seSxcblxuICAgICAgICAgICAgICAgICAgICAvLyBkaWQgdGhlIHVzZXIgYWxyZWFkeSBzZWxlY3QgYSByYXRpbmc/XG4gICAgICAgICAgICAgICAgICAgIHJhdGluZ01hZGU6IGZhbHNlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyByZW1vdmUgZGF0YSBvbiBlbGVtZW50XG4gICAgICAgICAgICB2YXIgcmVtb3ZlRGF0YU9uRWxlbWVudCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0ucmVtb3ZlRGF0YSgnYmFycmF0aW5nJyk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyByZXR1cm4gY3VycmVudCByYXRpbmcgdGV4dFxuICAgICAgICAgICAgdmFyIHJhdGluZ1RleHQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2V0RGF0YSgncmF0aW5nVGV4dCcpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gcmV0dXJuIGN1cnJlbnQgcmF0aW5nIHZhbHVlXG4gICAgICAgICAgICB2YXIgcmF0aW5nVmFsdWUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2V0RGF0YSgncmF0aW5nVmFsdWUnKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIGJ1aWxkIHdpZGdldCBhbmQgcmV0dXJuIGpRdWVyeSBlbGVtZW50XG4gICAgICAgICAgICB2YXIgYnVpbGRXaWRnZXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgJHcgPSAkKCc8ZGl2IC8+JywgeyAnY2xhc3MnOiAnYnItd2lkZ2V0JyB9KTtcblxuICAgICAgICAgICAgICAgIC8vIGNyZWF0ZSBBIGVsZW1lbnRzIHRoYXQgd2lsbCByZXBsYWNlIE9QVElPTnNcbiAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLmZpbmQoJ29wdGlvbicpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB2YWwsIHRleHQsIGh0bWwsICRhO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhbCA9ICQodGhpcykudmFsKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gY3JlYXRlIHJhdGluZ3MgLSBidXQgb25seSBpZiB2YWwgaXMgbm90IGRlZmluZWQgYXMgZW1wdHlcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbCAhPT0gZ2V0RGF0YSgnZW1wdHlSYXRpbmdWYWx1ZScpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0ID0gJCh0aGlzKS50ZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBodG1sID0gJCh0aGlzKS5kYXRhKCdodG1sJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaHRtbCkgeyB0ZXh0ID0gaHRtbDsgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAkYSA9ICQoJzxhIC8+Jywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdocmVmJzogJyMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdkYXRhLXJhdGluZy12YWx1ZSc6IHZhbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZGF0YS1yYXRpbmctdGV4dCc6IHRleHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2h0bWwnOiAoc2VsZi5vcHRpb25zLnNob3dWYWx1ZXMpID8gdGV4dCA6ICcnXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgJHcuYXBwZW5kKCRhKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAvLyBhcHBlbmQgLmJyLWN1cnJlbnQtcmF0aW5nIGRpdiB0byB0aGUgd2lkZ2V0XG4gICAgICAgICAgICAgICAgaWYgKHNlbGYub3B0aW9ucy5zaG93U2VsZWN0ZWRSYXRpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgJHcuYXBwZW5kKCQoJzxkaXYgLz4nLCB7ICd0ZXh0JzogJycsICdjbGFzcyc6ICdici1jdXJyZW50LXJhdGluZycgfSkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGFkZGl0aW9uYWwgY2xhc3NlcyBmb3IgdGhlIHdpZGdldFxuICAgICAgICAgICAgICAgIGlmIChzZWxmLm9wdGlvbnMucmV2ZXJzZSkge1xuICAgICAgICAgICAgICAgICAgICAkdy5hZGRDbGFzcygnYnItcmV2ZXJzZScpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChzZWxmLm9wdGlvbnMucmVhZG9ubHkpIHtcbiAgICAgICAgICAgICAgICAgICAgJHcuYWRkQ2xhc3MoJ2JyLXJlYWRvbmx5Jyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuICR3O1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gcmV0dXJuIGEgalF1ZXJ5IGZ1bmN0aW9uIG5hbWUgZGVwZW5kaW5nIG9uIHRoZSAncmV2ZXJzZScgc2V0dGluZ1xuICAgICAgICAgICAgdmFyIG5leHRBbGxvclByZXZpb3VzQWxsID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaWYgKGdldERhdGEoJ3VzZXJPcHRpb25zJykucmV2ZXJzZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ25leHRBbGwnO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAncHJldkFsbCc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gc2V0IHRoZSB2YWx1ZSBvZiB0aGUgc2VsZWN0IGZpZWxkXG4gICAgICAgICAgICB2YXIgc2V0U2VsZWN0RmllbGRWYWx1ZSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgLy8gY2hhbmdlIHNlbGVjdGVkIG9wdGlvblxuICAgICAgICAgICAgICAgIGZpbmRPcHRpb24odmFsdWUpLnByb3AoJ3NlbGVjdGVkJywgdHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLmNoYW5nZSgpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gcmVzZXQgc2VsZWN0IGZpZWxkXG4gICAgICAgICAgICB2YXIgcmVzZXRTZWxlY3RGaWVsZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICQoJ29wdGlvbicsIHNlbGYuJGVsZW0pLnByb3AoJ3NlbGVjdGVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRlZmF1bHRTZWxlY3RlZDtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0uY2hhbmdlKCk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBkaXNwbGF5IHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgcmF0aW5nXG4gICAgICAgICAgICB2YXIgc2hvd1NlbGVjdGVkUmF0aW5nID0gZnVuY3Rpb24odGV4dCkge1xuICAgICAgICAgICAgICAgIC8vIHRleHQgdW5kZWZpbmVkP1xuICAgICAgICAgICAgICAgIHRleHQgPSB0ZXh0ID8gdGV4dCA6IHJhdGluZ1RleHQoKTtcblxuICAgICAgICAgICAgICAgIC8vIHNwZWNpYWwgY2FzZSB3aGVuIHRoZSBzZWxlY3RlZCByYXRpbmcgaXMgZGVmaW5lZCBhcyBlbXB0eVxuICAgICAgICAgICAgICAgIGlmICh0ZXh0ID09IGdldERhdGEoJ2VtcHR5UmF0aW5nVGV4dCcpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQgPSAnJztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyB1cGRhdGUgLmJyLWN1cnJlbnQtcmF0aW5nIGRpdlxuICAgICAgICAgICAgICAgIGlmIChzZWxmLm9wdGlvbnMuc2hvd1NlbGVjdGVkUmF0aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0ucGFyZW50KCkuZmluZCgnLmJyLWN1cnJlbnQtcmF0aW5nJykudGV4dCh0ZXh0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyByZXR1cm4gcm91bmRlZCBmcmFjdGlvbiBvZiBhIHZhbHVlICgxNC40IC0+IDQwLCAwLjk5IC0+IDkwKVxuICAgICAgICAgICAgdmFyIGZyYWN0aW9uID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gTWF0aC5yb3VuZCgoKE1hdGguZmxvb3IodmFsdWUgKiAxMCkgLyAxMCkgJSAxKSAqIDEwMCk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyByZW1vdmUgYWxsIGNsYXNzZXMgZnJvbSBlbGVtZW50c1xuICAgICAgICAgICAgdmFyIHJlc2V0U3R5bGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgYWxsIGNsYXNzZXMgc3RhcnRpbmcgd2l0aCBici0qXG4gICAgICAgICAgICAgICAgc2VsZi4kd2lkZ2V0LmZpbmQoJ2EnKS5yZW1vdmVDbGFzcyhmdW5jdGlvbihpbmRleCwgY2xhc3Nlcykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKGNsYXNzZXMubWF0Y2goLyhefFxccylici1cXFMrL2cpIHx8IFtdKS5qb2luKCcgJyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBhcHBseSBzdHlsZSBieSBzZXR0aW5nIGNsYXNzZXMgb24gZWxlbWVudHNcbiAgICAgICAgICAgIHZhciBhcHBseVN0eWxlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyICRhID0gc2VsZi4kd2lkZ2V0LmZpbmQoJ2FbZGF0YS1yYXRpbmctdmFsdWU9XCInICsgcmF0aW5nVmFsdWUoKSArICdcIl0nKTtcbiAgICAgICAgICAgICAgICB2YXIgaW5pdGlhbFJhdGluZyA9IGdldERhdGEoJ3VzZXJPcHRpb25zJykuaW5pdGlhbFJhdGluZztcbiAgICAgICAgICAgICAgICB2YXIgYmFzZVZhbHVlID0gJC5pc051bWVyaWMocmF0aW5nVmFsdWUoKSkgPyByYXRpbmdWYWx1ZSgpIDogMDtcbiAgICAgICAgICAgICAgICB2YXIgZiA9IGZyYWN0aW9uKGluaXRpYWxSYXRpbmcpO1xuICAgICAgICAgICAgICAgIHZhciAkYWxsLCAkZnJhY3Rpb25hbDtcblxuICAgICAgICAgICAgICAgIHJlc2V0U3R5bGUoKTtcblxuICAgICAgICAgICAgICAgIC8vIGFkZCBjbGFzc2VzXG4gICAgICAgICAgICAgICAgJGEuYWRkQ2xhc3MoJ2JyLXNlbGVjdGVkIGJyLWN1cnJlbnQnKVtuZXh0QWxsb3JQcmV2aW91c0FsbCgpXSgpXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnYnItc2VsZWN0ZWQnKTtcblxuICAgICAgICAgICAgICAgIGlmICghZ2V0RGF0YSgncmF0aW5nTWFkZScpICYmICQuaXNOdW1lcmljKGluaXRpYWxSYXRpbmcpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgoaW5pdGlhbFJhdGluZyA8PSBiYXNlVmFsdWUpIHx8ICFmKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAkYWxsID0gc2VsZi4kd2lkZ2V0LmZpbmQoJ2EnKTtcblxuICAgICAgICAgICAgICAgICAgICAkZnJhY3Rpb25hbCA9ICgkYS5sZW5ndGgpID9cbiAgICAgICAgICAgICAgICAgICAgICAgICRhWyhnZXREYXRhKCd1c2VyT3B0aW9ucycpLnJldmVyc2UpID8gJ3ByZXYnIDogJ25leHQnXSgpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICRhbGxbKGdldERhdGEoJ3VzZXJPcHRpb25zJykucmV2ZXJzZSkgPyAnbGFzdCcgOiAnZmlyc3QnXSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICRmcmFjdGlvbmFsLmFkZENsYXNzKCdici1mcmFjdGlvbmFsJyk7XG4gICAgICAgICAgICAgICAgICAgICRmcmFjdGlvbmFsLmFkZENsYXNzKCdici1mcmFjdGlvbmFsLScgKyBmKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBjaGVjayBpZiB0aGUgZWxlbWVudCBpcyBkZXNlbGVjdGFibGU/XG4gICAgICAgICAgICB2YXIgaXNEZXNlbGVjdGFibGUgPSBmdW5jdGlvbigkZWxlbWVudCkge1xuICAgICAgICAgICAgICAgIGlmICghZ2V0RGF0YSgnYWxsb3dFbXB0eScpIHx8ICFnZXREYXRhKCd1c2VyT3B0aW9ucycpLmRlc2VsZWN0YWJsZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIChyYXRpbmdWYWx1ZSgpID09ICRlbGVtZW50LmF0dHIoJ2RhdGEtcmF0aW5nLXZhbHVlJykpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gaGFuZGxlIGNsaWNrIGV2ZW50c1xuICAgICAgICAgICAgdmFyIGF0dGFjaENsaWNrSGFuZGxlciA9IGZ1bmN0aW9uKCRlbGVtZW50cykge1xuICAgICAgICAgICAgICAgICRlbGVtZW50cy5vbignY2xpY2suYmFycmF0aW5nJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyICRhID0gJCh0aGlzKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMgPSBnZXREYXRhKCd1c2VyT3B0aW9ucycpLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0O1xuXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSAkYS5hdHRyKCdkYXRhLXJhdGluZy12YWx1ZScpO1xuICAgICAgICAgICAgICAgICAgICB0ZXh0ID0gJGEuYXR0cignZGF0YS1yYXRpbmctdGV4dCcpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGlzIGN1cnJlbnQgYW5kIGRlc2VsZWN0YWJsZT9cbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzRGVzZWxlY3RhYmxlKCRhKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBnZXREYXRhKCdlbXB0eVJhdGluZ1ZhbHVlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0ID0gZ2V0RGF0YSgnZW1wdHlSYXRpbmdUZXh0Jyk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyByZW1lbWJlciBzZWxlY3RlZCByYXRpbmdcbiAgICAgICAgICAgICAgICAgICAgc2V0RGF0YSgncmF0aW5nVmFsdWUnLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHNldERhdGEoJ3JhdGluZ1RleHQnLCB0ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgc2V0RGF0YSgncmF0aW5nTWFkZScsIHRydWUpO1xuXG4gICAgICAgICAgICAgICAgICAgIHNldFNlbGVjdEZpZWxkVmFsdWUodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBzaG93U2VsZWN0ZWRSYXRpbmcodGV4dCk7XG5cbiAgICAgICAgICAgICAgICAgICAgYXBwbHlTdHlsZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIG9uU2VsZWN0IGNhbGxiYWNrXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMub25TZWxlY3QuY2FsbChcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYsXG4gICAgICAgICAgICAgICAgICAgICAgICByYXRpbmdWYWx1ZSgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmF0aW5nVGV4dCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRcbiAgICAgICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBoYW5kbGUgbW91c2VlbnRlciBldmVudHNcbiAgICAgICAgICAgIHZhciBhdHRhY2hNb3VzZUVudGVySGFuZGxlciA9IGZ1bmN0aW9uKCRlbGVtZW50cykge1xuICAgICAgICAgICAgICAgICRlbGVtZW50cy5vbignbW91c2VlbnRlci5iYXJyYXRpbmcnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyICRhID0gJCh0aGlzKTtcblxuICAgICAgICAgICAgICAgICAgICByZXNldFN0eWxlKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgJGEuYWRkQ2xhc3MoJ2JyLWFjdGl2ZScpW25leHRBbGxvclByZXZpb3VzQWxsKCldKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnYnItYWN0aXZlJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgc2hvd1NlbGVjdGVkUmF0aW5nKCRhLmF0dHIoJ2RhdGEtcmF0aW5nLXRleHQnKSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBoYW5kbGUgbW91c2VsZWF2ZSBldmVudHNcbiAgICAgICAgICAgIHZhciBhdHRhY2hNb3VzZUxlYXZlSGFuZGxlciA9IGZ1bmN0aW9uKCRlbGVtZW50cykge1xuICAgICAgICAgICAgICAgIHNlbGYuJHdpZGdldC5vbignbW91c2VsZWF2ZS5iYXJyYXRpbmcgYmx1ci5iYXJyYXRpbmcnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgc2hvd1NlbGVjdGVkUmF0aW5nKCk7XG4gICAgICAgICAgICAgICAgICAgIGFwcGx5U3R5bGUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIHNvbWV3aGF0IHByaW1pdGl2ZSB3YXkgdG8gcmVtb3ZlIDMwMG1zIGNsaWNrIGRlbGF5IG9uIHRvdWNoIGRldmljZXNcbiAgICAgICAgICAgIC8vIGZvciBhIG1vcmUgYWR2YW5jZWQgc29sdXRpb24gY29uc2lkZXIgc2V0dGluZyBgZmFzdENsaWNrc2Agb3B0aW9uIHRvIGZhbHNlXG4gICAgICAgICAgICAvLyBhbmQgdXNpbmcgYSBsaWJyYXJ5IHN1Y2ggYXMgZmFzdGNsaWNrIChodHRwczovL2dpdGh1Yi5jb20vZnRsYWJzL2Zhc3RjbGljaylcbiAgICAgICAgICAgIHZhciBmYXN0Q2xpY2tzID0gZnVuY3Rpb24oJGVsZW1lbnRzKSB7XG4gICAgICAgICAgICAgICAgJGVsZW1lbnRzLm9uKCd0b3VjaHN0YXJ0LmJhcnJhdGluZycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuY2xpY2soKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIGRpc2FibGUgY2xpY2tzXG4gICAgICAgICAgICB2YXIgZGlzYWJsZUNsaWNrcyA9IGZ1bmN0aW9uKCRlbGVtZW50cykge1xuICAgICAgICAgICAgICAgICRlbGVtZW50cy5vbignY2xpY2suYmFycmF0aW5nJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHZhciBhdHRhY2hIYW5kbGVycyA9IGZ1bmN0aW9uKCRlbGVtZW50cykge1xuICAgICAgICAgICAgICAgIC8vIGF0dGFjaCBjbGljayBldmVudCBoYW5kbGVyXG4gICAgICAgICAgICAgICAgYXR0YWNoQ2xpY2tIYW5kbGVyKCRlbGVtZW50cyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5vcHRpb25zLmhvdmVyU3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gYXR0YWNoIG1vdXNlZW50ZXIgZXZlbnQgaGFuZGxlclxuICAgICAgICAgICAgICAgICAgICBhdHRhY2hNb3VzZUVudGVySGFuZGxlcigkZWxlbWVudHMpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGF0dGFjaCBtb3VzZWxlYXZlIGV2ZW50IGhhbmRsZXJcbiAgICAgICAgICAgICAgICAgICAgYXR0YWNoTW91c2VMZWF2ZUhhbmRsZXIoJGVsZW1lbnRzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB2YXIgZGV0YWNoSGFuZGxlcnMgPSBmdW5jdGlvbigkZWxlbWVudHMpIHtcbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgZXZlbnQgaGFuZGxlcnMgaW4gdGhlIFwiLmJhcnJhdGluZ1wiIG5hbWVzcGFjZVxuICAgICAgICAgICAgICAgICRlbGVtZW50cy5vZmYoJy5iYXJyYXRpbmcnKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHZhciBzZXR1cEhhbmRsZXJzID0gZnVuY3Rpb24ocmVhZG9ubHkpIHtcbiAgICAgICAgICAgICAgICB2YXIgJGVsZW1lbnRzID0gc2VsZi4kd2lkZ2V0LmZpbmQoJ2EnKTtcblxuICAgICAgICAgICAgICAgIGlmIChmYXN0Q2xpY2tzKSB7XG4gICAgICAgICAgICAgICAgICAgIGZhc3RDbGlja3MoJGVsZW1lbnRzKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAocmVhZG9ubHkpIHtcbiAgICAgICAgICAgICAgICAgICAgZGV0YWNoSGFuZGxlcnMoJGVsZW1lbnRzKTtcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZUNsaWNrcygkZWxlbWVudHMpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGF0dGFjaEhhbmRsZXJzKCRlbGVtZW50cyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy5zaG93ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgLy8gcnVuIG9ubHkgb25jZVxuICAgICAgICAgICAgICAgIGlmIChnZXREYXRhKCkpIHJldHVybjtcblxuICAgICAgICAgICAgICAgIC8vIHdyYXAgZWxlbWVudFxuICAgICAgICAgICAgICAgIHdyYXBFbGVtZW50KCk7XG5cbiAgICAgICAgICAgICAgICAvLyBzYXZlIGRhdGFcbiAgICAgICAgICAgICAgICBzYXZlRGF0YU9uRWxlbWVudCgpO1xuXG4gICAgICAgICAgICAgICAgLy8gYnVpbGQgJiBhcHBlbmQgd2lkZ2V0IHRvIHRoZSBET01cbiAgICAgICAgICAgICAgICBzZWxmLiR3aWRnZXQgPSBidWlsZFdpZGdldCgpO1xuICAgICAgICAgICAgICAgIHNlbGYuJHdpZGdldC5pbnNlcnRBZnRlcihzZWxmLiRlbGVtKTtcblxuICAgICAgICAgICAgICAgIGFwcGx5U3R5bGUoKTtcblxuICAgICAgICAgICAgICAgIHNob3dTZWxlY3RlZFJhdGluZygpO1xuXG4gICAgICAgICAgICAgICAgc2V0dXBIYW5kbGVycyhzZWxmLm9wdGlvbnMucmVhZG9ubHkpO1xuXG4gICAgICAgICAgICAgICAgLy8gaGlkZSB0aGUgc2VsZWN0IGZpZWxkXG4gICAgICAgICAgICAgICAgc2VsZi4kZWxlbS5oaWRlKCk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLnJlYWRvbmx5ID0gZnVuY3Rpb24oc3RhdGUpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHN0YXRlICE9PSAnYm9vbGVhbicgfHwgZ2V0RGF0YSgncmVhZE9ubHknKSA9PSBzdGF0ZSkgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgc2V0dXBIYW5kbGVycyhzdGF0ZSk7XG4gICAgICAgICAgICAgICAgc2V0RGF0YSgncmVhZE9ubHknLCBzdGF0ZSk7XG4gICAgICAgICAgICAgICAgc2VsZi4kd2lkZ2V0LnRvZ2dsZUNsYXNzKCdici1yZWFkb25seScpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy5zZXQgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHZhciBvcHRpb25zID0gZ2V0RGF0YSgndXNlck9wdGlvbnMnKTtcblxuICAgICAgICAgICAgICAgIGlmIChzZWxmLiRlbGVtLmZpbmQoJ29wdGlvblt2YWx1ZT1cIicgKyB2YWx1ZSArICdcIl0nKS5sZW5ndGggPT09IDApIHJldHVybjtcblxuICAgICAgICAgICAgICAgIC8vIHNldCBkYXRhXG4gICAgICAgICAgICAgICAgc2V0RGF0YSgncmF0aW5nVmFsdWUnLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgc2V0RGF0YSgncmF0aW5nVGV4dCcsIHNlbGYuJGVsZW0uZmluZCgnb3B0aW9uW3ZhbHVlPVwiJyArIHZhbHVlICsgJ1wiXScpLnRleHQoKSk7XG4gICAgICAgICAgICAgICAgc2V0RGF0YSgncmF0aW5nTWFkZScsIHRydWUpO1xuXG4gICAgICAgICAgICAgICAgc2V0U2VsZWN0RmllbGRWYWx1ZShyYXRpbmdWYWx1ZSgpKTtcbiAgICAgICAgICAgICAgICBzaG93U2VsZWN0ZWRSYXRpbmcocmF0aW5nVGV4dCgpKTtcblxuICAgICAgICAgICAgICAgIGFwcGx5U3R5bGUoKTtcblxuICAgICAgICAgICAgICAgIC8vIG9uU2VsZWN0IGNhbGxiYWNrXG4gICAgICAgICAgICAgICAgaWYgKCFvcHRpb25zLnNpbGVudCkge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLm9uU2VsZWN0LmNhbGwoXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmF0aW5nVmFsdWUoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhdGluZ1RleHQoKVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMuY2xlYXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgb3B0aW9ucyA9IGdldERhdGEoJ3VzZXJPcHRpb25zJyk7XG5cbiAgICAgICAgICAgICAgICAvLyByZXN0b3JlIG9yaWdpbmFsIGRhdGFcbiAgICAgICAgICAgICAgICBzZXREYXRhKCdyYXRpbmdWYWx1ZScsIGdldERhdGEoJ29yaWdpbmFsUmF0aW5nVmFsdWUnKSk7XG4gICAgICAgICAgICAgICAgc2V0RGF0YSgncmF0aW5nVGV4dCcsIGdldERhdGEoJ29yaWdpbmFsUmF0aW5nVGV4dCcpKTtcbiAgICAgICAgICAgICAgICBzZXREYXRhKCdyYXRpbmdNYWRlJywgZmFsc2UpO1xuXG4gICAgICAgICAgICAgICAgcmVzZXRTZWxlY3RGaWVsZCgpO1xuICAgICAgICAgICAgICAgIHNob3dTZWxlY3RlZFJhdGluZyhyYXRpbmdUZXh0KCkpO1xuXG4gICAgICAgICAgICAgICAgYXBwbHlTdHlsZSgpO1xuXG4gICAgICAgICAgICAgICAgLy8gb25DbGVhciBjYWxsYmFja1xuICAgICAgICAgICAgICAgIG9wdGlvbnMub25DbGVhci5jYWxsKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLFxuICAgICAgICAgICAgICAgICAgICByYXRpbmdWYWx1ZSgpLFxuICAgICAgICAgICAgICAgICAgICByYXRpbmdUZXh0KClcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy5kZXN0cm95ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gcmF0aW5nVmFsdWUoKTtcbiAgICAgICAgICAgICAgICB2YXIgdGV4dCA9IHJhdGluZ1RleHQoKTtcbiAgICAgICAgICAgICAgICB2YXIgb3B0aW9ucyA9IGdldERhdGEoJ3VzZXJPcHRpb25zJyk7XG5cbiAgICAgICAgICAgICAgICAvLyBkZXRhY2ggaGFuZGxlcnNcbiAgICAgICAgICAgICAgICBkZXRhY2hIYW5kbGVycyhzZWxmLiR3aWRnZXQuZmluZCgnYScpKTtcblxuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSB3aWRnZXRcbiAgICAgICAgICAgICAgICBzZWxmLiR3aWRnZXQucmVtb3ZlKCk7XG5cbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgZGF0YVxuICAgICAgICAgICAgICAgIHJlbW92ZURhdGFPbkVsZW1lbnQoKTtcblxuICAgICAgICAgICAgICAgIC8vIHVud3JhcCB0aGUgZWxlbWVudFxuICAgICAgICAgICAgICAgIHVud3JhcEVsZW1lbnQoKTtcblxuICAgICAgICAgICAgICAgIC8vIHNob3cgdGhlIGVsZW1lbnRcbiAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLnNob3coKTtcblxuICAgICAgICAgICAgICAgIC8vIG9uRGVzdHJveSBjYWxsYmFja1xuICAgICAgICAgICAgICAgIG9wdGlvbnMub25EZXN0cm95LmNhbGwoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgICAgICAgICAgICB0ZXh0XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBCYXJSYXRpbmcucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAob3B0aW9ucywgZWxlbSkge1xuICAgICAgICAgICAgdGhpcy4kZWxlbSA9ICQoZWxlbSk7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgJC5mbi5iYXJyYXRpbmcuZGVmYXVsdHMsIG9wdGlvbnMpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBCYXJSYXRpbmc7XG4gICAgfSkoKTtcblxuICAgICQuZm4uYmFycmF0aW5nID0gZnVuY3Rpb24gKG1ldGhvZCwgb3B0aW9ucykge1xuICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBwbHVnaW4gPSBuZXcgQmFyUmF0aW5nKCk7XG5cbiAgICAgICAgICAgIC8vIHBsdWdpbiB3b3JrcyB3aXRoIHNlbGVjdCBmaWVsZHNcbiAgICAgICAgICAgIGlmICghJCh0aGlzKS5pcygnc2VsZWN0JykpIHtcbiAgICAgICAgICAgICAgICAkLmVycm9yKCdTb3JyeSwgdGhpcyBwbHVnaW4gb25seSB3b3JrcyB3aXRoIHNlbGVjdCBmaWVsZHMuJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIG1ldGhvZCBzdXBwbGllZFxuICAgICAgICAgICAgaWYgKHBsdWdpbi5oYXNPd25Qcm9wZXJ0eShtZXRob2QpKSB7XG4gICAgICAgICAgICAgICAgcGx1Z2luLmluaXQob3B0aW9ucywgdGhpcyk7XG4gICAgICAgICAgICAgICAgaWYgKG1ldGhvZCA9PT0gJ3Nob3cnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwbHVnaW4uc2hvdyhvcHRpb25zKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBwbHVnaW4gZXhpc3RzP1xuICAgICAgICAgICAgICAgICAgICBpZiAocGx1Z2luLiRlbGVtLmRhdGEoJ2JhcnJhdGluZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwbHVnaW4uJHdpZGdldCA9ICQodGhpcykubmV4dCgnLmJyLXdpZGdldCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBsdWdpblttZXRob2RdKG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBubyBtZXRob2Qgc3VwcGxpZWQgb3Igb25seSBvcHRpb25zIHN1cHBsaWVkXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBtZXRob2QgPT09ICdvYmplY3QnIHx8ICFtZXRob2QpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zID0gbWV0aG9kO1xuICAgICAgICAgICAgICAgIHBsdWdpbi5pbml0KG9wdGlvbnMsIHRoaXMpO1xuICAgICAgICAgICAgICAgIHJldHVybiBwbHVnaW4uc2hvdygpO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQuZXJyb3IoJ01ldGhvZCAnICsgbWV0aG9kICsgJyBkb2VzIG5vdCBleGlzdCBvbiBqUXVlcnkuYmFycmF0aW5nJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICAkLmZuLmJhcnJhdGluZy5kZWZhdWx0cyA9IHtcbiAgICAgICAgdGhlbWU6JycsXG4gICAgICAgIGluaXRpYWxSYXRpbmc6bnVsbCwgLy8gaW5pdGlhbCByYXRpbmdcbiAgICAgICAgYWxsb3dFbXB0eTpudWxsLCAvLyBhbGxvdyBlbXB0eSByYXRpbmdzP1xuICAgICAgICBlbXB0eVZhbHVlOicnLCAvLyB0aGlzIGlzIHRoZSBleHBlY3RlZCB2YWx1ZSBvZiB0aGUgZW1wdHkgcmF0aW5nXG4gICAgICAgIHNob3dWYWx1ZXM6ZmFsc2UsIC8vIGRpc3BsYXkgcmF0aW5nIHZhbHVlcyBvbiB0aGUgYmFycz9cbiAgICAgICAgc2hvd1NlbGVjdGVkUmF0aW5nOnRydWUsIC8vIGFwcGVuZCBhIGRpdiB3aXRoIGEgcmF0aW5nIHRvIHRoZSB3aWRnZXQ/XG4gICAgICAgIGRlc2VsZWN0YWJsZTp0cnVlLCAvLyBhbGxvdyB0byBkZXNlbGVjdCByYXRpbmdzP1xuICAgICAgICByZXZlcnNlOmZhbHNlLCAvLyByZXZlcnNlIHRoZSByYXRpbmc/XG4gICAgICAgIHJlYWRvbmx5OmZhbHNlLCAvLyBtYWtlIHRoZSByYXRpbmcgcmVhZHktb25seT9cbiAgICAgICAgZmFzdENsaWNrczp0cnVlLCAvLyByZW1vdmUgMzAwbXMgY2xpY2sgZGVsYXkgb24gdG91Y2ggZGV2aWNlcz9cbiAgICAgICAgaG92ZXJTdGF0ZTp0cnVlLCAvLyBjaGFuZ2Ugc3RhdGUgb24gaG92ZXI/XG4gICAgICAgIHNpbGVudDpmYWxzZSwgLy8gc3VwcmVzcyBjYWxsYmFja3Mgd2hlbiBjb250cm9sbGluZyByYXRpbmdzIHByb2dyYW1hdGljYWxseVxuICAgICAgICBvblNlbGVjdDpmdW5jdGlvbiAodmFsdWUsIHRleHQsIGV2ZW50KSB7XG4gICAgICAgIH0sIC8vIGNhbGxiYWNrIGZpcmVkIHdoZW4gYSByYXRpbmcgaXMgc2VsZWN0ZWRcbiAgICAgICAgb25DbGVhcjpmdW5jdGlvbiAodmFsdWUsIHRleHQpIHtcbiAgICAgICAgfSwgLy8gY2FsbGJhY2sgZmlyZWQgd2hlbiBhIHJhdGluZyBpcyBjbGVhcmVkXG4gICAgICAgIG9uRGVzdHJveTpmdW5jdGlvbiAodmFsdWUsIHRleHQpIHtcbiAgICAgICAgfSAvLyBjYWxsYmFjayBmaXJlZCB3aGVuIGEgd2lkZ2V0IGlzIGRlc3Ryb3llZFxuICAgIH07XG5cbiAgICAkLmZuLmJhcnJhdGluZy5CYXJSYXRpbmcgPSBCYXJSYXRpbmc7XG5cbn0pKTsiLCIvKipcbiAqIEBwYWNrYWdlICAgIEtub3cgUmVzZXJ2YXRpb25zXG4gKiBAc3VicGFja2FnZSBTaXRlIEpTXG4gKiBAY29weXJpZ2h0ICAyMDIwIEhpZ2hsYW5kIFZpc2lvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIEBsaWNlbnNlICAgIFNlZSB0aGUgZmlsZSBcIkxJQ0VOU0UudHh0XCIgZm9yIHRoZSBmdWxsIGxpY2Vuc2UgZ292ZXJuaW5nIHRoaXMgY29kZS5cbiAqIEBhdXRob3IgICAgIEhhemVsIFdpbHNvbiA8aGF6ZWxAaGlnaGxhbmR2aXNpb24uY29tPlxuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG5sZXQgbGFuZztcbmxldCBzZWFyY2hEYXRhID0gW107XG5sZXQgc2VhcmNoRG9uZSA9IGZhbHNlO1xubGV0IGNhbGVuZGFyTG9hZGVkID0gZmFsc2U7XG5sZXQgc2F2ZWR3aWR0aCA9IGZhbHNlO1xubGV0IGxhcmdlO1xubGV0IHJlc2l6ZWQgPSBmYWxzZTtcblxuKGZ1bmN0aW9uICgkKSB7XG4gICAgJChmdW5jdGlvbiAoKSB7XG4gICAgICAgIEZvdW5kYXRpb24uYWRkVG9KcXVlcnkoKTtcbiAgICAgICAgJChkb2N1bWVudCkuZm91bmRhdGlvbigpO1xuXG4gICAgICAgIGxhbmcgPSAkKCcja3ItbGFuZycpLmRhdGEoJ2tybGFuZycpO1xuXG4gICAgICAgIGNoZWNrU2NyZWVuV2lkdGgoKTtcbiAgICAgICAgJCh3aW5kb3cpLm9uKFwicmVzaXplXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNoZWNrU2NyZWVuV2lkdGgoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgYmFycyA9ICQoJy5rci1yYXRpbmcnKTtcbiAgICAgICAgaWYgKGJhcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICBiYXJzLmJhcnJhdGluZygnc2hvdycsIHtcbiAgICAgICAgICAgICAgICBzaG93VmFsdWVzOiB0cnVlLFxuICAgICAgICAgICAgICAgIHNob3dTZWxlY3RlZFJhdGluZzogZmFsc2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgJGN0cmlnZ2VyID0gJCgnI2tyLXBhZ2UtZ2VyaWF0cmljLWNhbGVuZGFyLXRyaWdnZXInKTtcbiAgICAgICAgaWYgKCRjdHJpZ2dlci5sZW5ndGggJiYgIWNhbGVuZGFyTG9hZGVkKSB7XG4gICAgICAgICAgICBsb2FkQ2FsZW5kYXIoJGN0cmlnZ2VyLmRhdGEoJ3BpZCcpLCAkY3RyaWdnZXIuZGF0YSgndGFyZ2V0JykpO1xuICAgICAgICAgICAgY2FsZW5kYXJMb2FkZWQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgJChkb2N1bWVudCkub24oJ3N1Ym1pdCcsICcuYWpheGZvcm0nLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgY29uc3QgJGZvcm0gPSAkKHRoaXMpO1xuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgdXJsOiAkZm9ybS5hdHRyKCdhY3Rpb24nKSArICcmbGFuZz0nICsgbGFuZyxcbiAgICAgICAgICAgICAgICBkYXRhOiAkZm9ybS5zZXJpYWxpemUoKSxcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtUmVzcG9uc2UoJGZvcm0uYXR0cignaWQnKSwgcmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvJztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5rci1hamF4LW1vZGFsLWVycm9yLW1lc3NhZ2UnKS5odG1sKHJlc3VsdC5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0ICRtb2RhbCA9IG5ldyBGb3VuZGF0aW9uLlJldmVhbCgkKCcjS3JBamF4TW9kYWxFcnJvcicpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRtb2RhbC5vcGVuKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICQoJy5rci1hamF4LW1vZGFsLWVycm9yLW1lc3NhZ2UnKS5odG1sKCdTb3JyeSBhbiBlcnJvciBoYXMgb2NjdXJyZWQsIHBsZWFzZSB0cnkgYWdhaW4nKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgJG1vZGFsID0gbmV3IEZvdW5kYXRpb24uUmV2ZWFsKCQoJyNLckFqYXhNb2RhbEVycm9yJykpO1xuICAgICAgICAgICAgICAgICAgICAkbW9kYWwub3BlbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KS5vbignc2hvdy56Zi5kcm9wZG93bicsICcja3Itc2VhcmNocmVnaW9uLWRyb3AnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKFwiI2tyLXNlYXJjaHJlZ2lvbi1kcm9wXCIpLmNzcygnb3BhY2l0eScsICcxJyk7XG4gICAgICAgIH0pLm9uKCdzaG93LnpmLmRyb3Bkb3duJywgJyNrci1zZWFyY2hndWVzdC1kcm9wJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJCgnI2tyLXNlYXJjaGd1ZXN0LWRyb3AnKS5jc3MoJ29wYWNpdHknLCAnMScpO1xuICAgICAgICB9KS5vbignaGlkZS56Zi5kcm9wZG93bicsICcja3Itc2VhcmNocmVnaW9uLWRyb3AsICNrci1zZWFyY2hndWVzdC1kcm9wJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJCgnYm9keScpLmNzcygnb3BhY2l0eScsICcxJyk7XG4gICAgICAgIH0pLm9uKCdoaWRlLnpmLmRyb3Bkb3duJywgJyNrci1xdW90ZS1mb3JtJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJCgnI2d1ZXN0cycpLnRyaWdnZXIoJ2NoYW5nZScpO1xuICAgICAgICB9KS5vbignb3Blbi56Zi5yZXZlYWwnLCAnLmtyLWFqYXgtbW9kYWxbZGF0YS1yZXZlYWxdJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGNvbnN0IG1vZGFsaWQgPSBcIiNcIiArICQodGhpcykuYXR0cignaWQnKTtcbiAgICAgICAgICAgIGlmICghJC50cmltKCQobW9kYWxpZCkuaHRtbCgpKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBhamF4dXJsID0gJCh0aGlzKS5kYXRhKCdhamF4dXJsJyk7XG4gICAgICAgICAgICAgICAgaWYgKGFqYXh1cmwpIHtcbiAgICAgICAgICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogYWpheHVybCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChjb250ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChtb2RhbGlkKS5odG1sKGNvbnRlbnQpLnRyaWdnZXIoJ3Jlc2l6ZW1lLnpmLnJldmVhbCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQobW9kYWxpZCkuZm91bmRhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLm9uKCdjbGljaycsICcuZmF2c3BhbicsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjb25zdCBwaWQgPSAkKHRoaXMpLmRhdGEoJ3Byb3BlcnR5Jyk7XG4gICAgICAgICAgICBjb25zdCBiYXIgPSAkKCcua3Itc2VhcmNoYmFyIGEuaXMtYWN0aXZlJykuZGF0YSgnYmFyJyk7XG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICB1cmw6ICcvaW5kZXgucGhwP29wdGlvbj1jb21fa25vd3JlcyZ0YXNrPXByb3BlcnRpZXMuZmF2b3VyaXRlJmxhbmc9JyArIGxhbmcsXG4gICAgICAgICAgICAgICAgZGF0YTogeydwcm9wZXJ0eV9pZCc6IHBpZH0sXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0UHJvcGVydGllcyhiYXIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pLm9uKCdjbGljaycsICcuZ2V0UmVzcG9uc2VTZWFyY2gnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgaWYgKCQodGhpcykuZGF0YSgnYWN0aW9uJykgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGdldFByb3BlcnRpZXMoJCh0aGlzKS5kYXRhKCdiYXInKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGdldFByb3BlcnRpZXMoJCh0aGlzKS5kYXRhKCdiYXInKSwgJCh0aGlzKS5kYXRhKCdhY3Rpb24nKSwgJCh0aGlzKS5kYXRhKCdhY3Rpb24tdmFsdWUnKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLm9uKCdjbGljaycsICcua3ItZmlsdGVycy1jbG9zZScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAkKCcua3ItZmlsdGVycy50b3AnKS5hZGRDbGFzcygnaGlkZW1lJyk7XG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgfSkub24oJ2NsaWNrJywgJy5rci1maWx0ZXJzIHVsLmZpbHRlci1zb3J0LWxpc3QgbGkuaGVhZCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmNoaWxkcmVuKCdsaS5maWx0ZXItaXRlbScpLnRvZ2dsZSgpO1xuICAgICAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgIH0pLm9uKCdjbGljaycsICcjc2hvd2dhdGV3YXlzJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICQoJyNrci1nYXRld2F5cycpLnRvZ2dsZUNsYXNzKCdoaWRlbWUnKTtcbiAgICAgICAgfSkub24oJ2NsaWNrJywgJ2Eua3Itc2VhcmNoYmFyJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHNldEFjdGl2ZU1lbnUoJCh0aGlzKS5kYXRhKCdiYXInKSk7XG4gICAgICAgIH0pLm9uKCdjbGljaycsICcudG9nZ2xlb3RoZXInLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgJCh0aGlzKS5kYXRhKCdvdGhlcicpLnRvZ2dsZSgpO1xuICAgICAgICB9KS5vbignY2xpY2snLCAnI2tyLXByb3BlcnR5LXRhYnMgYVtocmVmPVwiI2NhbGVuZGFyXCJdJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGlmICghY2FsZW5kYXJMb2FkZWQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwaWQgPSAkKHRoaXMpLmRhdGEoJ3BpZCcpO1xuICAgICAgICAgICAgICAgIGxvYWRDYWxlbmRhcihwaWQsICcjY2FsZW5kYXIudGFicy1wYW5lbCcpO1xuICAgICAgICAgICAgICAgIGNhbGVuZGFyTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkub24oJ21vdXNlb3ZlcicsICcja3ItdGh1bWIgaW1nJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbGV0IHByb3BlcnR5ID0gJCh0aGlzKS5wYXJlbnQoKS5kYXRhKCdpZCcpO1xuICAgICAgICAgICAgaWYgKHByb3BlcnR5KSB7XG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldCA9ICcudGh1bWJvdmVydmlldycgKyBwcm9wZXJ0eTtcbiAgICAgICAgICAgICAgICAkKCcjcGluZm8nKS5odG1sKCQodGFyZ2V0KS5odG1sKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgJHByb3BzID0gJCgnLmtyLXByb3BlcnRpZXMnKTtcbiAgICAgICAgaWYgKCRwcm9wcy5sZW5ndGggJiYgIXNlYXJjaERvbmUpIHtcbiAgICAgICAgICAgIGdldFByb3BlcnRpZXMoJHByb3BzLmRhdGEoJ2JhcicpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCAkdGFicyA9ICQoJy50YWJzJyk7XG4gICAgICAgIGlmICgkKCcja3ItcHJvcGVydHktdGFicycpLmxlbmd0aCAmJiAhY2FsZW5kYXJMb2FkZWQpIHtcbiAgICAgICAgICAgICR0YWJzLmZpbmQoJ2EnKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5hdHRyKCdocmVmJykgPT09IFwiI2NhbGVuZGFyXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGlkID0gJCh0aGlzKS5kYXRhKCdwaWQnKTtcbiAgICAgICAgICAgICAgICAgICAgbG9hZENhbGVuZGFyKHBpZCwgJyNjYWxlbmRhci50YWJzLXBhbmVsJyk7XG4gICAgICAgICAgICAgICAgICAgIGNhbGVuZGFyTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgJC5ldmVudC5zcGVjaWFsLnRvdWNoc3RhcnQgPSB7XG4gICAgICAgIHNldHVwOiBmdW5jdGlvbiAoXywgbnMsIGhhbmRsZSkge1xuICAgICAgICAgICAgaWYgKG5zLmluY2x1ZGVzKFwibm9QcmV2ZW50RGVmYXVsdFwiKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgaGFuZGxlLCB7cGFzc2l2ZTogZmFsc2V9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCBoYW5kbGUsIHtwYXNzaXZlOiB0cnVlfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgICQuZXZlbnQuc3BlY2lhbC50b3VjaG1vdmUgPSB7XG4gICAgICAgIHNldHVwOiBmdW5jdGlvbiAoXywgbnMsIGhhbmRsZSkge1xuICAgICAgICAgICAgaWYgKG5zLmluY2x1ZGVzKFwibm9QcmV2ZW50RGVmYXVsdFwiKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLCBoYW5kbGUsIHtwYXNzaXZlOiBmYWxzZX0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIiwgaGFuZGxlLCB7cGFzc2l2ZTogdHJ1ZX0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGxvYWRDYWxlbmRhcihwaWQsIHRhcmdldCkge1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICAgICAgdXJsOiAnL2luZGV4LnBocD9vcHRpb249Y29tX2tub3dyZXMmdGFzaz1wcm9wZXJ0eS5nZXJpYXRyaWMmbGFuZz0nICsgbGFuZyxcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnaHRtbCcsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgJ3BpZCc6IHBpZFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgJCh0YXJnZXQpLmFwcGVuZChkYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZm9ybVJlc3BvbnNlKGlkLCBkYXRhKSB7XG4gICAgICAgIGlmIChkYXRhLmhhc093blByb3BlcnR5KCdyZWRpcmVjdCcpKSB7XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZShkYXRhLnJlZGlyZWN0KTtcbiAgICAgICAgfSBlbHNlIGlmIChpZCA9PT0gJ2tyLWZvcm0tcGF5bWVudCcpIHtcbiAgICAgICAgICAgIGlmIChkYXRhLmhhc093blByb3BlcnR5KCdodG1sJykpIHtcbiAgICAgICAgICAgICAgICBsZXQgJG1vZGFsID0gJCgnI2tyLWdhdGV3YXktbW9kYWwnKTtcbiAgICAgICAgICAgICAgICAkbW9kYWwuaHRtbChkYXRhLmh0bWwpLnRyaWdnZXIoJ3Jlc2l6ZW1lLnpmLnJldmVhbCcpO1xuICAgICAgICAgICAgICAgICRtb2RhbC5mb3VuZGF0aW9uKCdvcGVuJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy8nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGlkID09PSAna3ItZm9ybS1tYWlsY2hpbXAnKSB7XG4gICAgICAgICAgICAkKCcjcmVzcG9uc2UyJykuaHRtbChkYXRhKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFByb3BlcnRpZXMoYmFyLCBhY3Rpb24gPSAnJywgYWN0aW9uX3ZhbHVlID0gJycpIHtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogJy9pbmRleC5waHA/b3B0aW9uPWNvbV9rbm93cmVzJnZpZXc9cHJvcGVydGllcyZmb3JtYXQ9cmF3Jmxhbmc9JyArIGxhbmcsXG4gICAgICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgICAgICBkYXRhOiB7J2Jhcic6IGJhciwgJ2FjdGlvbic6IGFjdGlvbiwgJ2FjdGlvbl92YWx1ZSc6IGFjdGlvbl92YWx1ZX0sXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29uc3QgdmFscyA9IFsnbGlzdCcsICdncmlkJywgJ3RodW1iJywgJ2ZhdnMnLCAnbWFwJ107XG4gICAgICAgICAgICAgICAgaWYgKHZhbHMuaW5jbHVkZXMoZGF0YS5iYXIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldEFjdGl2ZU1lbnUoZGF0YS5iYXIpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHNldFNlYXJjaERhdGEoZGF0YSwgZGF0YS5iYXIpO1xuICAgICAgICAgICAgICAgICQoJy5oYXMtdGlwJykuZm91bmRhdGlvbigpO1xuICAgICAgICAgICAgICAgICQoJy5kcm9wZG93bi1wYW5lJykuZm91bmRhdGlvbigpO1xuICAgICAgICAgICAgICAgICQoJy5rci1wcm9wZXJ0eSAuY2FyZCcpLmZvdW5kYXRpb24oKTtcbiAgICAgICAgICAgICAgICAkKCcja3Itb3JkZXItY2xvc2UnKS50cmlnZ2VyKCdjbGljaycpO1xuICAgICAgICAgICAgICAgIHNlYXJjaERvbmUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRTZWFyY2hEYXRhKHJlc3BvbnNlLCBhY3Rpb24gPSAnJykge1xuICAgICAgICBpZiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICQoJyNrci1wcm9wZXJ0aWVzLWRhdGEnKS5lbXB0eSgpLmZhZGVJbignc2xvdycpLmh0bWwocmVzcG9uc2VbJ2l0ZW1zJ10pLmZvdW5kYXRpb24oKTtcbiAvLyAgICAgICAgICAgJCgnI2tyLXByb3BlcnRpZXMtZmlsdGVyLWhlYWRpbmcnKS5odG1sKHJlc3BvbnNlWydoZWFkaW5nJ10pO1xuICAgICAgICAgICAgJCgnLmtyLXBhZ2VyJykuaHRtbChyZXNwb25zZVsncGFnaW5hdGlvbiddKTtcbiAgICAgICAgICAgIGlmIChhY3Rpb24gIT09ICd0aHVtYicpIHtcbiAgICAgICAgICAgICAgICAkKCcua3ItcGFnZXIuYm90dG9tJykuaHRtbChyZXNwb25zZVsncGFnaW5hdGlvbiddKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJCgnLmtyLXBhZ2VyLmJvdHRvbScpLmVtcHR5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkKFwiI2tyLW9mZmNhbnZhcy1wcm9wZXJ0aWVzLWZpbHRlclwiKS5odG1sKHJlc3BvbnNlWydmaWx0ZXJzJ10pO1xuICAgICAgICAgICAgJChcIiNrci1vZmZjYW52YXMtcHJvcGVydGllcy1zb3J0YnlcIikuaHRtbChyZXNwb25zZVsnc29ydGJ5J10pO1xuLy8gICAgICAgICAgICAkKFwiI2tyLW9mZmNhbnZhcy10b3Atc2VhcmNoXCIpLmh0bWwocmVzcG9uc2VbJ3NlYXJjaCddKTtcblxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlWydzZWFyY2gnXS5sZW5ndGggJiYgJCgnI2Fycml2YWxkc3AnKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAkKCdib2R5JykudHJpZ2dlcignaW5pdGFqYXhzZWFyY2gnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJCgnLnNpZGViYXIgLmtyLWZpbHRlcnMgdWwuZmlsdGVyLXNvcnQtbGlzdCBsaS5oZWFkJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XG4gICAgICAgICAgICAgICAgICAgICQodGhpcykucGFyZW50KCkuY2hpbGRyZW4oJ2xpLmZpbHRlci1pdGVtJykuc2hvdygpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICQodGhpcykucGFyZW50KCkuY2hpbGRyZW4oJ2xpLmZpbHRlci1pdGVtJykuaGlkZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAoYWN0aW9uID09PSAncGFnZScpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRBY3RpdmVNZW51KGJhcikge1xuICAgICAgICBjb25zdCBzZWFyY2hiYXIgPSAkKCcua3Itc2VhcmNoYmFyJykuZmluZCgnLmJ1dHRvbicpO1xuICAgICAgICAkLmVhY2goc2VhcmNoYmFyLCBmdW5jdGlvbiAoaW5kZXgsIHNlYXJjaGJhcikge1xuICAgICAgICAgICAgJChzZWFyY2hiYXIpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgfSk7XG4gICAgICAgICQoJy5rci1zZWFyY2hiYXIgLmJ1dHRvbi4nICsgYmFyKS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIHRydWUgaWYgd2lkdGggaGFzIGNoYW5nZWRcbiAgICBmdW5jdGlvbiBzY3JlZW5XaWR0aEhhc0NoYW5nZWQoKSB7XG4gICAgICAgIGxhcmdlID0gRm91bmRhdGlvbi5NZWRpYVF1ZXJ5LmF0TGVhc3QoJ2xhcmdlJyk7XG4gICAgICAgIGlmIChsYXJnZSAhPT0gc2F2ZWR3aWR0aCkge1xuICAgICAgICAgICAgc2F2ZWR3aWR0aCA9IGxhcmdlO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoZWNrU2NyZWVuV2lkdGgoKSB7XG4gICAgICAgIHJlc2l6ZWQgPSBmYWxzZTtcbiAgICAgICAgaWYgKHNjcmVlbldpZHRoSGFzQ2hhbmdlZCgpICYmIHNlYXJjaERhdGFbJ2l0ZW1zJ10gJiYgIXJlc2l6ZWQpIHtcbiAgICAgICAgICAgIHNldFNlYXJjaERhdGEoc2VhcmNoRGF0YSk7XG4gICAgICAgICAgICByZXNpemVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgICQuZXZlbnQuc3BlY2lhbC50b3VjaHN0YXJ0ID0ge1xuICAgICAgICBzZXR1cDogZnVuY3Rpb24gKF8sIG5zLCBoYW5kbGUpIHtcbiAgICAgICAgICAgIGlmIChucy5pbmNsdWRlcyhcIm5vUHJldmVudERlZmF1bHRcIikpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIGhhbmRsZSwge3Bhc3NpdmU6IGZhbHNlfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgaGFuZGxlLCB7cGFzc2l2ZTogdHJ1ZX0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICAkLmV2ZW50LnNwZWNpYWwudG91Y2htb3ZlID0ge1xuICAgICAgICBzZXR1cDogZnVuY3Rpb24gKF8sIG5zLCBoYW5kbGUpIHtcbiAgICAgICAgICAgIGlmIChucy5pbmNsdWRlcyhcIm5vUHJldmVudERlZmF1bHRcIikpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIiwgaGFuZGxlLCB7cGFzc2l2ZTogZmFsc2V9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsIGhhbmRsZSwge3Bhc3NpdmU6IHRydWV9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG59KGpRdWVyeSkpOyIsIi8qKlxuICogQHBhY2thZ2UgICAgS25vdyBSZXNlcnZhdGlvbnNcbiAqIEBzdWJwYWNrYWdlIFNpdGUgSlNcbiAqIEBjb3B5cmlnaHQgIDIwMjAgSGlnaGxhbmQgVmlzaW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogQGxpY2Vuc2UgICAgU2VlIHRoZSBmaWxlIFwiTElDRU5TRS50eHRcIiBmb3IgdGhlIGZ1bGwgbGljZW5zZSBnb3Zlcm5pbmcgdGhpcyBjb2RlLlxuICogQGF1dGhvciAgICAgSGF6ZWwgV2lsc29uIDxoYXplbEBoaWdobGFuZHZpc2lvbi5jb20+XG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoJCkge1xuXHRpZiAoIXdpbmRvdy5sb2NhdGlvbi5vcmlnaW4pXG5cdFx0d2luZG93LmxvY2F0aW9uLm9yaWdpbiA9IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCArIFwiLy9cIiArIHdpbmRvdy5sb2NhdGlvbi5ob3N0O1xuXG5cdGxldCBsYW5nID0gJChcIiNrci1sYW5nXCIpLmRhdGEoJ2tybGFuZycpO1xuXHRsZXQgbXlDb25maXJtLCAkbXlUYXNrO1xuXG5cdGNsYXNzIEtyY29uZmlybSB7XG5cdFx0Y29uc3RydWN0b3IoJGZvcm0pIHtcblx0XHRcdHRoaXMuZm9ybSA9ICRmb3JtO1xuXHRcdFx0dGhpcy5pbml0KCk7XG5cdFx0fVxuXG5cdFx0aW5pdCgpIHtcblx0XHRcdHRoaXMudXBkYXRlUXVvdGUodGhpcy5mb3JtKTtcblx0XHR9XG5cblx0XHR1cGRhdGVRdW90ZSgkZm9ybSkge1xuXHRcdFx0JG15VGFzayA9ICQoJyNteXRhc2snKTtcblx0XHRcdCRteVRhc2sudmFsKCdjb25maXJtLmNvbXB1dGUnKTtcblx0XHRcdGpRdWVyeS5hamF4KHtcblx0XHRcdFx0dHlwZTogICAgICdQT1NUJyxcblx0XHRcdFx0dXJsOiAgICAgICdpbmRleC5waHA/b3B0aW9uPWNvbV9rbm93cmVzJnRhc2s9Y29uZmlybS5jb21wdXRlJmxhbmc9JyArIGxhbmcsXG5cdFx0XHRcdGRhdGE6ICAgICAkZm9ybS5zZXJpYWxpemVBcnJheSgpLFxuXHRcdFx0XHRkYXRhVHlwZTogJ2pzb24nLFxuXHRcdFx0XHRzdWNjZXNzOiAgZnVuY3Rpb24gKHJlc3VsdCkge1xuXHRcdFx0XHRcdCRteVRhc2sudmFsKCdjb25maXJtLnBheW1lbnQnKTtcblx0XHRcdFx0XHRpZiAocmVzdWx0LnN1Y2Nlc3MpIHtcblx0XHRcdFx0XHRcdGNvbnN0IGRhdGEgPSByZXN1bHQuZGF0YTtcblx0XHRcdFx0XHRcdGlmIChkYXRhLmhhc093blByb3BlcnR5KCdyZWRpcmVjdCcpKSB7XG5cdFx0XHRcdFx0XHRcdHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKGRhdGEucmVkaXJlY3QpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0bGV0IGRpdjtcblx0XHRcdFx0XHRcdCQuZWFjaChyZXN1bHQuZGF0YS5yZXNwb25zZSwgZnVuY3Rpb24gKGtleSwgdmFsKSB7XG5cdFx0XHRcdFx0XHRcdCQoJy5oaWRlaW5pdGlhbCcpLnNob3coKTtcblx0XHRcdFx0XHRcdFx0ZGl2ID0gXCIjXCIgKyBrZXk7XG5cdFx0XHRcdFx0XHRcdCQoZGl2KS50ZXh0KHZhbCk7XG5cdFx0XHRcdFx0XHRcdCQoZGl2KS5odG1sKHZhbCk7XG5cdFx0XHRcdFx0XHRcdCQoZGl2KS52YWwodmFsKTtcblx0XHRcdFx0XHRcdFx0JChkaXYpLnNob3coKTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHQkKCcua3ItYWpheC1tb2RhbC1lcnJvci1tZXNzYWdlJykuaHRtbChyZXN1bHQubWVzc2FnZSk7XG5cdFx0XHRcdFx0XHRjb25zdCAkbW9kYWwgPSBuZXcgRm91bmRhdGlvbi5SZXZlYWwoJCgnI0tyQWpheE1vZGFsRXJyb3InKSk7XG5cdFx0XHRcdFx0XHQkbW9kYWwub3BlbigpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cblx0JChmdW5jdGlvbiAoKSB7XG5cdFx0bGV0ICRlbGVtZW50ID0gJCgnI2tyLWZvcm0tY29uZmlybScpO1xuXHRcdGlmICgkZWxlbWVudC5sZW5ndGgpIHtcblx0XHRcdG15Q29uZmlybSA9IG5ldyBLcmNvbmZpcm0oJGVsZW1lbnQpO1xuXHRcdH1cblx0XHQkZWxlbWVudC5vbignY2hhbmdlIGNsaWNrJywgJy5rci1jYWxjdWxhdGUnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0JGVsZW1lbnQgPSAkKCcja3ItZm9ybS1jb25maXJtJyk7XG5cdFx0XHRteUNvbmZpcm0udXBkYXRlUXVvdGUoJGVsZW1lbnQpO1xuXHRcdH0pO1xuXG5cdFx0JChkb2N1bWVudCkub24oJ2NsaWNrJywgJyNjaGVja3Rlcm1zJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGlmIChjaGVja1Rlcm1zKCkpIHtcblx0XHRcdFx0JCgnI2NoZWNrdGVybXMnKS50cmlnZ2VyKCdzdWJtaXQnKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fSk7XG5cblx0Ly8gbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG5cdGZ1bmN0aW9uIGNoZWNrVGVybXMoKSB7XG5cdFx0bGV0IHJlc3VsdCA9IHRydWU7XG5cdFx0Y29uc3QgdGVzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZ3JlZWNoZWNrJyk7XG5cdFx0Y29uc3QgdGVzdGMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWdyZWVjaGVja2MnKTtcblx0XHRjb25zdCB0ZXN0dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZ3JlZWNoZWNrdCcpO1xuXG5cdFx0Ly8gbm9pbnNwZWN0aW9uIEpTVW5yZXNvbHZlZFZhcmlhYmxlXG5cdFx0aWYgKHRlc3QgJiYgIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdrci1mb3JtLXBheW1lbnQnKS5hZ3JlZWNoZWNrLmNoZWNrZWQpIHtcblx0XHRcdHJlc3VsdCA9IGZhbHNlO1xuXHRcdH1cblx0XHQvLyBub2luc3BlY3Rpb24gSlNVbnJlc29sdmVkVmFyaWFibGVcblx0XHRpZiAodGVzdGMgJiYgIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdrci1mb3JtLXBheW1lbnQnKS5hZ3JlZWNoZWNrYy5jaGVja2VkKSB7XG5cdFx0XHRyZXN1bHQgPSBmYWxzZTtcblx0XHR9XG5cdFx0Ly8gbm9pbnNwZWN0aW9uIEpTVW5yZXNvbHZlZFZhcmlhYmxlXG5cdFx0aWYgKHRlc3R0ICYmICFkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgna3ItZm9ybS1wYXltZW50JykuYWdyZWVjaGVja3QuY2hlY2tlZCkge1xuXHRcdFx0cmVzdWx0ID0gZmFsc2U7XG5cdFx0fVxuXG5cdFx0aWYgKHJlc3VsdCkge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnN0ICRtb2RhbCA9IG5ldyBGb3VuZGF0aW9uLlJldmVhbCgkKCcjZXJyb3JNb2RhbCcpKTtcblx0XHRcdCRtb2RhbC5vcGVuKCk7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHR9XG59KGpRdWVyeSkpOyIsIi8qKlxuICogQHBhY2thZ2UgICAgS25vdyBSZXNlcnZhdGlvbnNcbiAqIEBzdWJwYWNrYWdlIFNpdGUgSlNcbiAqIEBjb3B5cmlnaHQgIDIwMjAgSGlnaGxhbmQgVmlzaW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogQGxpY2Vuc2UgICAgU2VlIHRoZSBmaWxlIFwiTElDRU5TRS50eHRcIiBmb3IgdGhlIGZ1bGwgbGljZW5zZSBnb3Zlcm5pbmcgdGhpcyBjb2RlLlxuICogQGF1dGhvciAgICAgSGF6ZWwgV2lsc29uIDxoYXplbEBoaWdobGFuZHZpc2lvbi5jb20+XG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbmlmICghd2luZG93LmxvY2F0aW9uLm9yaWdpbikge1xuXHR3aW5kb3cubG9jYXRpb24ub3JpZ2luID0gd2luZG93LmxvY2F0aW9uLnByb3RvY29sICsgXCIvL1wiICsgd2luZG93LmxvY2F0aW9uLmhvc3Q7XG59XG5cbihmdW5jdGlvbiAoJCkge1xuXHRsZXQgbXlLckRvYkVudHJ5O1xuXHRsZXQgdG9kYXk7XG5cdGxldCBrZXkgPSB7QkFDS1NQQUNFOiA4fTtcblxuXHRsZXQgc2V0dGluZ3MgPSB7XG5cdFx0Y3VzdG9tX3ZhbGlkYXRpb246ICAgICBmYWxzZSxcblx0XHRkYXlzX2luX21vbnRoOiAgICAgICAgIFszMSwgMjksIDMxLCAzMCwgMzEsIDMwLCAzMSwgMzEsIDMwLCAzMSwgMzAsIDMxXSxcblx0XHRkb2N1bWVudF9kYXRlOiAgICAgICAgIGZhbHNlLFxuXHRcdGVycm9yYm94X3g6ICAgICAgICAgICAgMSxcblx0XHRlcnJvcmJveF95OiAgICAgICAgICAgIDUsXG5cdFx0ZmllbGRfaGludF90ZXh0X2RheTogICAnREQnLFxuXHRcdGZpZWxkX2hpbnRfdGV4dF9tb250aDogJ01NJyxcblx0XHRmaWVsZF9oaW50X3RleHRfeWVhcjogICdZWVlZJyxcblx0XHRmaWVsZF9vcmRlcjogICAgICAgICAgICdETVknLFxuXHRcdGZpZWxkX3dpZHRoX2RheTogICAgICAgNixcblx0XHRmaWVsZF93aWR0aF9tb250aDogICAgIDYsXG5cdFx0ZmllbGRfd2lkdGhfeWVhcjogICAgICA3LFxuXHRcdGZpZWxkX3dpZHRoX3NlcDogICAgICAgMixcblx0XHRtaW5tYXg6ICAgICAgICAgICAgICAgICcnLFxuXHRcdG1pbl9kYXRlOiAgICAgICAgICAgICAgZmFsc2UsXG5cdFx0bWF4X2RhdGU6ICAgICAgICAgICAgICBmYWxzZSxcblx0XHRtaW5feWVhcjogICAgICAgICAgICAgIDE5MTAsXG5cdFx0bW9udGhfbmFtZTogICAgICAgICAgICBbXG5cdFx0XHQnSmFudWFyeScsICdGZWJydWFyeScsICdNYXJjaCcsICdBcHJpbCcsXG5cdFx0XHQnTWF5JywgJ0p1bmUnLCAnSnVseScsICdBdWd1c3QnLCAnU2VwdGVtYmVyJyxcblx0XHRcdCdPY3RvYmVyJywgJ05vdmVtYmVyJywgJ0RlY2VtYmVyJ10sXG5cdFx0b25fYmx1cjogICAgICAgICAgICAgICBmYWxzZSxcblx0XHRvbl9lcnJvcjogICAgICAgICAgICAgIGZhbHNlLFxuXHRcdG9uX2NoYW5nZTogICAgICAgICAgICAgZmFsc2UsXG5cdFx0cGFyc2VfZGF0ZTogICAgICAgICAgICB0cnVlLFxuXHRcdHNlcGFyYXRvcjogICAgICAgICAgICAgJy8nLFxuXHRcdHNob3dfZXJyb3JzOiAgICAgICAgICAgdHJ1ZSxcblx0XHRzaG93X2hpbnRzOiAgICAgICAgICAgIHRydWUsXG5cdFx0RV9EQVlfTkFOOiAgICAgICAgICAgICAnRGF5IG11c3QgYmUgYSBudW1iZXInLFxuXHRcdEVfREFZX1RPT19CSUc6ICAgICAgICAgJ0RheSBtdXN0IGJlIDEtMzEnLFxuXHRcdEVfREFZX1RPT19TTUFMTDogICAgICAgJ0RheSBtdXN0IGJlIDEtMzEnLFxuXHRcdEVfQkFEX0RBWV9GT1JfTU9OVEg6ICAgJ09ubHkgJWQgZGF5cyBpbiAlbSAleScsXG5cdFx0RV9NT05USF9OQU46ICAgICAgICAgICAnTW9udGggbXVzdCBiZSBhIG51bWJlcicsXG5cdFx0RV9NT05USF9UT09fQklHOiAgICAgICAnTW9udGggbXVzdCBiZSAxLTEyJyxcblx0XHRFX01PTlRIX1RPT19TTUFMTDogICAgICdNb250aCBjYW5ub3QgYmUgMCcsXG5cdFx0RV9ZRUFSX05BTjogICAgICAgICAgICAnWWVhciBtdXN0IGJlIGEgbnVtYmVyJyxcblx0XHRFX1lFQVJfTEVOR1RIOiAgICAgICAgICdZZWFyIG11c3QgYmUgNCBkaWdpdHMnLFxuXHRcdEVfWUVBUl9UT09fU01BTEw6ICAgICAgJ1llYXIgbXVzdCBub3QgYmUgYmVmb3JlICV5Jyxcblx0XHRFX01JTl9EQVRFOiAgICAgICAgICAgICdEYXRlIG11c3Qgbm90IGJlIGluIHRoZSBwYXN0Jyxcblx0XHRFX01BWF9EQVRFOiAgICAgICAgICAgICdEYXRlIG11c3Qgbm90IGJlIGluIHRoZSBmdXR1cmUnXG5cdH07XG5cblx0Y2xhc3MgS3JEb2JFbnRyeSB7XG5cdFx0Y29uc3RydWN0b3IoJGVsZW1lbnQsIG9wdGlvbnMpIHtcblx0XHRcdHRvZGF5ID0gS3JEb2JFbnRyeS5nZXRZbWQobmV3IERhdGUoKSk7XG5cblx0XHRcdHRoaXMuaW5wdXRfZGF5ID0gMDtcblx0XHRcdHRoaXMuaW5wdXRfbW9udGggPSAwO1xuXHRcdFx0dGhpcy5pbnB1dF95ZWFyID0gMDtcblx0XHRcdHRoaXMuJGVsZW1lbnQgPSAkZWxlbWVudDtcblx0XHRcdGlmIChvcHRpb25zKSB7XG5cdFx0XHRcdCQuZXh0ZW5kKHNldHRpbmdzLCBvcHRpb25zKTtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5pbml0KCk7XG5cdFx0fVxuXG5cdFx0c3RhdGljIGdldFltZChkYXRlKSB7XG5cdFx0XHRjb25zdCBtID0gZGF0ZS5nZXRNb250aCgpICsgMTtcblx0XHRcdGNvbnN0IGQgPSBkYXRlLmdldERheSgpO1xuXG5cdFx0XHRyZXR1cm4gKGRhdGUuZ2V0RnVsbFllYXIoKSArICctJyArIChtIDwgMTAgPyAnMCcgOiAnJykgKyBtICsgJy0nICsgKGQgPCAxMCA/ICcwJyA6ICcnKSArIGQpO1xuXHRcdH1cblxuXHRcdHN0YXRpYyBnZXRZbWRPYmplY3QoZGF0ZSkge1xuXHRcdFx0cmV0dXJuIChkYXRlLnllYXIgKyAnLScgKyBkYXRlLm1vbnRoICsgJy0nICsgZGF0ZS5kYXkpO1xuXHRcdH1cblxuXHRcdGFkZEVudHJ5RmllbGRzKCkge1xuXHRcdFx0bGV0IGRvYmZpZWxkID0gdGhpcztcblx0XHRcdGRvYmZpZWxkLmZpZWxkcyA9IFtdO1xuXHRcdFx0JC5lYWNoKHNldHRpbmdzLmZpZWxkX29yZGVyLnNwbGl0KCcnKSwgZnVuY3Rpb24gKGksIGZpZWxkKSB7XG5cdFx0XHRcdHN3aXRjaCAoZmllbGQpIHtcblx0XHRcdFx0XHRjYXNlICdEJzpcblx0XHRcdFx0XHRcdGRvYmZpZWxkLmJ1aWxkRmllbGQoJ2RheScsIGkpO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSAnTSc6XG5cdFx0XHRcdFx0XHRkb2JmaWVsZC5idWlsZEZpZWxkKCdtb250aCcsIGkpO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSAnWSc6XG5cdFx0XHRcdFx0XHRkb2JmaWVsZC5idWlsZEZpZWxkKCd5ZWFyJywgaSk7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRkZWZhdWx0IDpcblx0XHRcdFx0XHRcdHRocm93IFwiVW5leHBlY3RlZCBmaWVsZCBvcmRlciAnXCIgKyBmaWVsZCArIFwiJyBleHBlY3RlZCBELCBNIG9yIFlcIjtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0YWZ0ZXJQYXN0ZSh0YXJnZXQpIHtcblx0XHRcdGlmICh0aGlzLnBhcnNlRGF0ZSgkKHRhcmdldCkudmFsKCkpKSB7XG5cdFx0XHRcdHRoaXMuc2V0RGF0ZSgkKHRhcmdldCkudmFsKCkpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGJ1aWxkRmllbGQobmFtZSwgaW5kZXgpIHtcblx0XHRcdGxldCBrcmRvYmVudHJ5ID0gdGhpcztcblx0XHRcdGxldCBpbnB1dCA9IG5ldyBLckRvYklucHV0KHtcblx0XHRcdFx0bmFtZTogICAgICAgbmFtZSxcblx0XHRcdFx0a3Jkb2JlbnRyeToga3Jkb2JlbnRyeSxcblx0XHRcdFx0aW5kZXg6ICAgICAgaW5kZXgsXG5cdFx0XHRcdGhpbnRfdGV4dDogIHNldHRpbmdzLnNob3dfaGludHMgPyBzZXR0aW5nc1snZmllbGRfaGludF90ZXh0XycgKyBuYW1lXSA6IG51bGwsXG5cdFx0XHR9KTtcblxuXHRcdFx0dGhpcy5pbm5lci5hcHBlbmQoaW5wdXQuJGlucHV0KTtcblx0XHRcdHRoaXNbJ2lucHV0XycgKyBuYW1lXSA9IGlucHV0O1xuXG5cdFx0XHRpZiAoaW5kZXggPCAyKSB7XG5cdFx0XHRcdHRoaXMuaW5uZXIuYXBwZW5kKCQoJzxzcGFuIGNsYXNzPVwic2VwYXJhdG9yXCIgLz4nKS50ZXh0KHNldHRpbmdzLnNlcGFyYXRvcikpO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLmZpZWxkc1tpbmRleF0gPSBpbnB1dDtcblx0XHRcdHRoaXNbbmFtZV0gPSBpbnB1dDtcblx0XHR9XG5cblx0XHRidWlsZFVpKCkge1xuXHRcdFx0bGV0IGRvYmZpZWxkID0gdGhpcztcblx0XHRcdHRoaXMud3JhcHBlciA9ICQodGhpcy4kZWxlbWVudC53cmFwKCc8c3BhbiBjbGFzcz1cImpxLWR0ZVwiIC8+JykucGFyZW50KClbMF0pO1xuXHRcdFx0dGhpcy5pbm5lciA9ICQoJzxzcGFuIGNsYXNzPVwianEtZHRlLWlubmVyXCIgLz4nKTtcblx0XHRcdHRoaXMuYWRkRW50cnlGaWVsZHMoKTtcblx0XHRcdHRoaXMuZXJyb3Jib3ggPSAkKCc8c3BhbiBjbGFzcz1cImpxLWR0ZS1lcnJvcmJveFwiIC8+JykuaGlkZSgpO1xuXHRcdFx0dGhpcy5pbm5lci5vbigncGFzdGUnLCAnaW5wdXQnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRsZXQgaW5wdXQgPSB0aGlzO1xuXHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRkb2JmaWVsZC5hZnRlclBhc3RlKGlucHV0LCBlKTtcblx0XHRcdFx0fSwgMik7XG5cdFx0XHR9KTtcblx0XHRcdHRoaXMud3JhcHBlci5hcHBlbmQodGhpcy5pbm5lciwgdGhpcy5lcnJvcmJveCk7XG5cdFx0XHR0aGlzLnNldEZpZWxkV2lkdGhzKCk7XG5cdFx0XHR0aGlzLiRlbGVtZW50LmhpZGUoKTtcblx0XHR9XG5cblx0XHRjaGVja0RvY3VtZW50KGRvYiwgY2hpbGRkb2IsIGNsYXNzbmFtZSkge1xuXHRcdFx0bGV0IGVsZW1lbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShjbGFzc25hbWUpO1xuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRpZiAobmV3IERhdGUoZG9iKSA+IG5ldyBEYXRlKGNoaWxkZG9iKSkge1xuXHRcdFx0XHRcdGVsZW1lbnRzW2ldLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0ZWxlbWVudHNbaV0uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRjbGVhcigpIHtcblx0XHRcdHRoaXMuY2xlYXJFcnJvcignJyk7XG5cdFx0XHR0aGlzLnNldERhdGUoJycpO1xuXHRcdH1cblxuXHRcdGNsZWFyRXJyb3IoKSB7XG5cdFx0XHRkZWxldGUgdGhpcy5lcnJvcl90ZXh0O1xuXHRcdFx0dGhpcy5zaG93RXJyb3IoKTtcblx0XHR9XG5cblx0XHRkZXN0cm95KCkge1xuXHRcdFx0dGhpcy4kZWxlbWVudC5zaG93KCk7XG5cdFx0XHR0aGlzLiRlbGVtZW50LmNzcygnZGlzcGxheScsICcnKTtcblx0XHRcdHRoaXMud3JhcHBlci5maW5kKCdzcGFuJykucmVtb3ZlKCk7XG5cdFx0XHR0aGlzLiRlbGVtZW50LnVud3JhcCgpO1xuXHRcdFx0dGhpcy4kZWxlbWVudC5yZW1vdmVEYXRhKCdkYXRldGV4dGVudHJ5Jyk7XG5cdFx0XHRkZWxldGUgdGhpcy5pbm5lcjtcblx0XHRcdGRlbGV0ZSB0aGlzLndyYXBwZXI7XG5cdFx0XHRkZWxldGUgdGhpcy4kZWxlbWVudDtcblx0XHR9XG5cblx0XHRmb2N1cygpIHtcblx0XHRcdHRoaXMuZmllbGRzWzBdLnNldEZvY3VzKHRydWUpO1xuXHRcdH1cblxuXHRcdGZvY3VzRmllbGRCZWZvcmUoaW5wdXQpIHtcblx0XHRcdGNvbnN0IGluZGV4ID0gaW5wdXQuaW5kZXg7XG5cdFx0XHRpZiAoaW5kZXggPCAxKSB7XG5cdFx0XHRcdHJldHVyblxuXHRcdFx0fVxuXHRcdFx0dGhpcy5maWVsZHNbaW5kZXhdLnlpZWxkRm9jdXMoKTtcblx0XHRcdHRoaXMuZmllbGRzW2luZGV4IC0gMV0uc2V0Rm9jdXModHJ1ZSk7XG5cdFx0XHQvLyBsZXQgbmV4dCA9IHRoaXMuZmllbGRzW2luZGV4IC0gMV07XG5cdFx0XHQvLyBsZXQgdmFsID0gbmV4dC5nZXQoKTtcblx0XHRcdC8vIG5leHQuc2V0Rm9jdXMoZmFsc2UpO1xuXHRcdH1cblxuXHRcdGZvY3VzRmllbGRBZnRlcihpbnB1dCkge1xuXHRcdFx0Y29uc3QgaW5kZXggPSBpbnB1dC5pbmRleDtcblx0XHRcdGlmIChpbmRleCA+IDEpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5maWVsZHNbaW5kZXhdLnlpZWxkRm9jdXMoKTtcblx0XHRcdHRoaXMuZmllbGRzW2luZGV4ICsgMV0uc2V0Rm9jdXModHJ1ZSk7XG5cdFx0fVxuXG5cdFx0Zm9jdXNJbigpIHtcblx0XHRcdHRoaXMud3JhcHBlci5hZGRDbGFzcygnZm9jdXMnKTtcblx0XHR9XG5cblx0XHRmb2N1c091dCgpIHtcblx0XHRcdGlmIChzZXR0aW5ncy5vbl9ibHVyKSB7XG5cdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdHNlbGYud2lkZ2V0Rm9jdXNMb3N0KCk7XG5cdFx0XHRcdH0sIDIpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy53cmFwcGVyLnJlbW92ZUNsYXNzKCdmb2N1cycpO1xuXHRcdH1cblxuXHRcdGdldERhdGUoKSB7XG5cdFx0XHRyZXR1cm4gKHRoaXMuZGF5X3ZhbHVlICYmIHRoaXMubW9udGhfdmFsdWUgJiYgdGhpcy55ZWFyX3ZhbHVlKVxuXHRcdFx0ICAgICAgID8ge2RheTogdGhpcy5kYXlfdmFsdWUsIG1vbnRoOiB0aGlzLm1vbnRoX3ZhbHVlLCB5ZWFyOiB0aGlzLnllYXJfdmFsdWV9XG5cdFx0XHQgICAgICAgOiBudWxsO1xuXHRcdH1cblxuXHRcdGluaXQoKSB7XG5cdFx0XHRpZiAoIXNldHRpbmdzLm1pbl95ZWFyKVxuXHRcdFx0XHRzZXR0aW5ncy5taW5feWVhciA9ICcxOTEwJztcblxuXHRcdFx0dGhpcy5idWlsZFVpKCk7XG5cdFx0XHR0aGlzLnNldERhdGUodGhpcy4kZWxlbWVudC5hdHRyKCd2YWx1ZScpKTtcblx0XHRcdHRoaXMucHJveHlMYWJlbENsaWNrcygpO1xuXHRcdH1cblxuXHRcdHBhcnNlRGF0ZSh0ZXh0KSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5wYXJzZUlzb0RhdGUodGV4dCk7XG5cdFx0fVxuXG5cdFx0cGFyc2VJc29EYXRlKHRleHQpIHtcblx0XHRcdHJldHVybiB0ZXh0ICYmIHRleHQubWF0Y2goL14oXFxkXFxkXFxkXFxkKS0oXFxkXFxkKS0oXFxkXFxkKS8pID8ge1xuXHRcdFx0XHRkYXk6ICAgUmVnRXhwLiQzLFxuXHRcdFx0XHRtb250aDogUmVnRXhwLiQyLFxuXHRcdFx0XHR5ZWFyOiAgUmVnRXhwLiQxXG5cdFx0XHR9IDogbnVsbDtcblx0XHR9XG5cblx0XHRwcm94eUxhYmVsQ2xpY2tzKCkge1xuXHRcdFx0bGV0IGRvYmZpZWxkID0gdGhpcztcblx0XHRcdGxldCBpZCA9IHRoaXMuJGVsZW1lbnQuYXR0cignaWQnKTtcblx0XHRcdGlmICghaWQpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0JCgnbGFiZWxbZm9yPScgKyBpZCArICddJykuY2xpY2soZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRkb2JmaWVsZC5mb2N1cygpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0c2V0RGF0ZShuZXdfZGF0ZSkge1xuXHRcdFx0bGV0IGRvYmZpZWxkID0gdGhpcztcblx0XHRcdG5ld19kYXRlID0gdGhpcy5wYXJzZURhdGUobmV3X2RhdGUpO1xuXHRcdFx0ZGVsZXRlIHRoaXMuZGF5X3ZhbHVlO1xuXHRcdFx0ZGVsZXRlIHRoaXMubW9udGhfdmFsdWU7XG5cdFx0XHRkZWxldGUgdGhpcy55ZWFyX3ZhbHVlO1xuXHRcdFx0dGhpcy5pbnB1dF9kYXkuc2V0KG5ld19kYXRlID8gbmV3X2RhdGUuZGF5IDogJycpO1xuXHRcdFx0dGhpcy5pbnB1dF9tb250aC5zZXQobmV3X2RhdGUgPyBuZXdfZGF0ZS5tb250aCA6ICcnKTtcblx0XHRcdHRoaXMuaW5wdXRfeWVhci5zZXQobmV3X2RhdGUgPyBuZXdfZGF0ZS55ZWFyIDogJycpO1xuXHRcdFx0dGhpcy5jbGVhckVycm9yKCk7XG5cdFx0XHR0aGlzLiRlbGVtZW50LnZhbChuZXdfZGF0ZSk7XG5cdFx0XHRpZiAobmV3X2RhdGUpIHtcblx0XHRcdFx0JC5lYWNoKHRoaXMuZmllbGRzLCBmdW5jdGlvbiAoaSwgaW5wdXQpIHtcblx0XHRcdFx0XHRkb2JmaWVsZC52YWxpZGF0ZShpbnB1dCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHNldEVycm9yKGVycm9yX3RleHQpIHtcblx0XHRcdHRoaXMuZXJyb3JfdGV4dCA9IGVycm9yX3RleHQ7XG5cdFx0XHR0aGlzLnNob3dFcnJvcigpO1xuXHRcdH1cblxuXHRcdHNldEZpZWxkV2lkdGhzKCkge1xuXHRcdFx0bGV0IGF2YWlsYWJsZSA9IHRoaXMuJGVsZW1lbnQud2lkdGgoKSAtIDI7XG5cdFx0XHRsZXQgdG90YWwgPSBzZXR0aW5ncy5maWVsZF93aWR0aF95ZWFyICsgc2V0dGluZ3MuZmllbGRfd2lkdGhfc2VwICsgc2V0dGluZ3MuZmllbGRfd2lkdGhfbW9udGggK1xuXHRcdFx0XHRzZXR0aW5ncy5maWVsZF93aWR0aF9zZXAgKyBzZXR0aW5ncy5maWVsZF93aWR0aF9kYXk7XG5cdFx0XHR0aGlzLmlucHV0X2RheS5zZXRXaWR0aChNYXRoLmZsb29yKHNldHRpbmdzLmZpZWxkX3dpZHRoX2RheSAqIGF2YWlsYWJsZSAvIHRvdGFsKSk7XG5cdFx0XHR0aGlzLmlucHV0X21vbnRoLnNldFdpZHRoKE1hdGguZmxvb3Ioc2V0dGluZ3MuZmllbGRfd2lkdGhfbW9udGggKiBhdmFpbGFibGUgLyB0b3RhbCkpO1xuXHRcdFx0dGhpcy5pbnB1dF95ZWFyLnNldFdpZHRoKE1hdGguZmxvb3Ioc2V0dGluZ3MuZmllbGRfd2lkdGhfeWVhciAqIGF2YWlsYWJsZSAvIHRvdGFsKSk7XG5cdFx0fVxuXG5cdFx0c2V0UmVhZG9ubHkobW9kZSkge1xuXHRcdFx0aWYgKG1vZGUgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRtb2RlID0gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdHRoaXMuaW5wdXRfZGF5LnNldFJlYWRvbmx5KG1vZGUpO1xuXHRcdFx0dGhpcy5pbnB1dF9tb250aC5zZXRSZWFkb25seShtb2RlKTtcblx0XHRcdHRoaXMuaW5wdXRfeWVhci5zZXRSZWFkb25seShtb2RlKTtcblx0XHRcdGlmIChtb2RlKSB7XG5cdFx0XHRcdHRoaXMud3JhcHBlci5hZGRDbGFzcygncmVhZG9ubHknKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMud3JhcHBlci5yZW1vdmVDbGFzcygncmVhZG9ubHknKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRzaG93RXJyb3IoKSB7XG5cdFx0XHRsZXQgZXJyb3JfdGV4dCA9IHRoaXMud2lkZ2V0RXJyb3JUZXh0KCk7XG5cdFx0XHRpZiAodGhpcy5vbl9lcnJvcikge1xuXHRcdFx0XHR0aGlzLm9uX2Vycm9yKGVycm9yX3RleHQpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCFzZXR0aW5ncy5zaG93X2Vycm9ycykge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRpZiAoZXJyb3JfdGV4dCA9PT0gJycpIHtcblx0XHRcdFx0dGhpcy5lcnJvcmJveC5oaWRlKCk7XG5cdFx0XHRcdHRoaXMuZXJyb3Jib3gudGV4dCgnJyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRsZXQgeF9vZmZzZXQgPSAodGhpcy5pbm5lci5vdXRlcldpZHRoKCkgKyBzZXR0aW5ncy5lcnJvcmJveF94KSArICdweCc7XG5cdFx0XHRcdGxldCB5X29mZnNldCA9IHNldHRpbmdzLmVycm9yYm94X3kgKyAncHgnO1xuXHRcdFx0XHR0aGlzLmVycm9yYm94LmNzcyh7ZGlzcGxheTogJ2Jsb2NrJywgcG9zaXRpb246ICdhYnNvbHV0ZScsIHRvcDogeV9vZmZzZXQsIGxlZnQ6IHhfb2Zmc2V0fSk7XG5cdFx0XHRcdHRoaXMuZXJyb3Jib3gudGV4dChlcnJvcl90ZXh0KTtcblx0XHRcdFx0dGhpcy5lcnJvcmJveC5zaG93KCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dmFsaWRhdGUoY3VycmVudF9pbnB1dCkge1xuXHRcdFx0dGhpcy4kZWxlbWVudC52YWwoJycpO1xuXHRcdFx0aWYgKGN1cnJlbnRfaW5wdXQpIHtcblx0XHRcdFx0Y29uc3QgdHlwZSA9IGN1cnJlbnRfaW5wdXQubmFtZTtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRpZiAodHlwZSA9PT0gJ2RheScpIHtcblx0XHRcdFx0XHRcdHRoaXMudmFsaWRhdGVEYXkoKTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHR5cGUgPT09ICdtb250aCcpIHtcblx0XHRcdFx0XHRcdHRoaXMudmFsaWRhdGVNb250aCgpO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAodHlwZSA9PT0gJ3llYXInKSB7XG5cdFx0XHRcdFx0XHR0aGlzLnZhbGlkYXRlWWVhcigpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRjdXJyZW50X2lucHV0LmNsZWFyRXJyb3IoKTtcblx0XHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRcdGN1cnJlbnRfaW5wdXQuc2V0RXJyb3IoZSk7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAodGhpcy5kYXlfdmFsdWUgJiYgdGhpcy5tb250aF92YWx1ZSkge1xuXHRcdFx0XHR0aGlzLmNsZWFyRXJyb3IoKTtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHR0aGlzLnZhbGlkYXRlRGF5c0luTW9udGgoKTtcblx0XHRcdFx0XHRpZiAodGhpcy55ZWFyX3ZhbHVlICYmIHRoaXMueWVhcl92YWx1ZS5sZW5ndGggPT09IDQpIHtcblx0XHRcdFx0XHRcdHRoaXMudmFsaWRhdGVDb21wbGV0ZURhdGUoKTtcblx0XHRcdFx0XHRcdGxldCBkYXRlX3N0ciA9IEtyRG9iRW50cnkuZ2V0WW1kT2JqZWN0KHRoaXMuZ2V0RGF0ZSgpKTtcblx0XHRcdFx0XHRcdHRoaXMuJGVsZW1lbnQudmFsKGRhdGVfc3RyKTtcblx0XHRcdFx0XHRcdGlmICh0aGlzLiRlbGVtZW50LmRhdGEoJ2NoaWxkZG9iJykpIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5jaGVja0RvY3VtZW50KGRhdGVfc3RyLCB0aGlzLiRlbGVtZW50LmRhdGEoJ2NoaWxkZG9iJyksIHRoaXMuJGVsZW1lbnQuYXR0cignaWQnKSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdFx0dGhpcy5zZXRFcnJvcihlKTtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuY2xlYXJFcnJvcigpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHR2YWxpZGF0ZUNvbXBsZXRlRGF0ZSgpIHtcblx0XHRcdGNvbnN0IGRhdGVfb2JqID0gdGhpcy5nZXREYXRlKCk7XG5cdFx0XHRjb25zdCBkYXRlX2lzbyA9IEtyRG9iRW50cnkuZ2V0WW1kT2JqZWN0KGRhdGVfb2JqKTtcblx0XHRcdHNldHRpbmdzLm1pbm1heCA9IHRoaXMuJGVsZW1lbnQuZGF0YSgndmFsaWRhdGlvbicpO1xuXG5cdFx0XHRpZiAoc2V0dGluZ3MubWlubWF4ID09PSAnbWF4Jykge1xuXHRcdFx0XHRpZiAoZGF0ZV9pc28gPiB0b2RheSkge1xuXHRcdFx0XHRcdHRocm93KHNldHRpbmdzLkVfTUFYX0RBVEUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAoc2V0dGluZ3MubWlubWF4ID09PSAnbWluJykge1xuXHRcdFx0XHRpZiAoZGF0ZV9pc28gPCB0b2RheSkge1xuXHRcdFx0XHRcdHRocm93KHNldHRpbmdzLkVfTUlOX0RBVEUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIGxldCBtYXhfZGF0ZSA9IHNldHRpbmdzLm1heF9kYXRlO1xuXHRcdFx0Ly8gaWYgKHR5cGVvZiBtYXhfZGF0ZSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0Ly8gXHRtYXhfZGF0ZSA9IG1heF9kYXRlLmNhbGwodGhpcyk7XG5cdFx0XHQvLyB9XG5cdFx0XHQvLyBpZiAodHlwZW9mIG1heF9kYXRlID09PSAnc3RyaW5nJykge1xuXHRcdFx0Ly8gXHRtYXhfZGF0ZSA9IHRoaXMucGFyc2VEYXRlKG1heF9kYXRlKTtcblx0XHRcdC8vIH1cblx0XHRcdC8vIGlmIChtYXhfZGF0ZSkge1xuXHRcdFx0Ly8gXHRpZiAoZGF0ZV9pc28gPiBzZXR0aW5ncy5tYXhfZGF0ZSkge1xuXHRcdFx0Ly8gXHRcdHRocm93KHNldHRpbmdzLkVfTUFYX0RBVEUpO1xuXHRcdFx0Ly8gXHR9XG5cdFx0XHQvLyB9XG5cblx0XHRcdGlmICh0aGlzLmN1c3RvbV92YWxpZGF0aW9uKSB7XG5cdFx0XHRcdGRhdGVfb2JqLmRhdGUgPSBuZXcgRGF0ZShcblx0XHRcdFx0XHRwYXJzZUludChkYXRlX29iai55ZWFyLCAxMCksXG5cdFx0XHRcdFx0cGFyc2VJbnQoZGF0ZV9vYmoubW9udGgsIDEwKSAtIDEsXG5cdFx0XHRcdFx0cGFyc2VJbnQoZGF0ZV9vYmouZGF5LCAxMClcblx0XHRcdFx0KTtcblx0XHRcdFx0dGhpcy5jdXN0b21fdmFsaWRhdGlvbihkYXRlX29iaik7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dmFsaWRhdGVEYXkoKSB7XG5cdFx0XHRsZXQgb3B0ID0gc2V0dGluZ3M7XG5cdFx0XHRsZXQgaW5wdXQgPSB0aGlzLmlucHV0X2RheTtcblx0XHRcdHRoaXMuZGF5X3ZhbHVlID0gdW5kZWZpbmVkO1xuXHRcdFx0bGV0IHRleHQgPSBpbnB1dC5nZXQoKTtcblx0XHRcdGlmICh0ZXh0ID09PSAnJyB8fCAodGV4dCA9PT0gJzAnICYmIGlucHV0Lmhhc19mb2N1cykpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHRleHQubWF0Y2goL1xcRC8pKSB7XG5cdFx0XHRcdHRocm93KG9wdC5FX0RBWV9OQU4pO1xuXHRcdFx0fVxuXHRcdFx0bGV0IG51bSA9IHBhcnNlSW50KHRleHQsIDEwKTtcblx0XHRcdGlmIChudW0gPCAxKSB7XG5cdFx0XHRcdHRocm93KG9wdC5FX0RBWV9UT09fU01BTEwpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKG51bSA+IDMxKSB7XG5cdFx0XHRcdHRocm93KG9wdC5FX0RBWV9UT09fQklHKTtcblx0XHRcdH1cblx0XHRcdHRleHQgPSBudW0gPCAxMCA/ICcwJyArIG51bSA6ICcnICsgbnVtO1xuXHRcdFx0aWYgKCFpbnB1dC5oYXNfZm9jdXMpIHtcblx0XHRcdFx0aW5wdXQuc2V0KHRleHQpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5kYXlfdmFsdWUgPSB0ZXh0O1xuXHRcdH1cblxuXHRcdHZhbGlkYXRlRGF5c0luTW9udGgoKSB7XG5cdFx0XHRjb25zdCBkYXkgPSBwYXJzZUludCh0aGlzLmRheV92YWx1ZSwgMTApO1xuXHRcdFx0Y29uc3QgbW9udGggPSBwYXJzZUludCh0aGlzLm1vbnRoX3ZhbHVlLCAxMCk7XG5cdFx0XHRjb25zdCB5ZWFyID0gcGFyc2VJbnQodGhpcy55ZWFyX3ZhbHVlLCAxMCk7XG5cdFx0XHRpZiAoZGF5IDwgMSB8fCBtb250aCA8IDEpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0bGV0IG1heCA9IHNldHRpbmdzLmRheXNfaW5fbW9udGhbbW9udGggLSAxXTtcblx0XHRcdGxldCBtc2cgPSBzZXR0aW5ncy5FX0JBRF9EQVlfRk9SX01PTlRIO1xuXHRcdFx0aWYgKG1vbnRoID09PSAyICYmICgnJyArIHllYXIpLmxlbmd0aCA9PT0gNCkge1xuXHRcdFx0XHRtYXggPSB5ZWFyICUgNCA/IDI4IDogeWVhciAlIDEwMCA/IDI5IDogeWVhciAlIDQwMCA/IDI4IDogMjk7XG5cdFx0XHRcdG1zZyA9IG1zZy5yZXBsYWNlKC8leS8sIHllYXIudG9TdHJpbmcoKSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRtc2cgPSBtc2cucmVwbGFjZSgvIColeS8sICcnKTtcblx0XHRcdH1cblx0XHRcdGlmIChkYXkgPiBtYXgpIHtcblx0XHRcdFx0dGhyb3cobXNnLnJlcGxhY2UoLyVkLywgbWF4LnRvU3RyaW5nKCkpLnJlcGxhY2UoLyVtLywgc2V0dGluZ3MubW9udGhfbmFtZVttb250aCAtIDFdKSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dmFsaWRhdGVNb250aCgpIHtcblx0XHRcdGxldCBpbnB1dCA9IHRoaXMuaW5wdXRfbW9udGg7XG5cdFx0XHR0aGlzLm1vbnRoX3ZhbHVlID0gdW5kZWZpbmVkO1xuXHRcdFx0bGV0IHRleHQgPSBpbnB1dC5nZXQoKTtcblx0XHRcdGlmICh0ZXh0ID09PSAnJyB8fCAodGV4dCA9PT0gJzAnICYmIGlucHV0Lmhhc19mb2N1cykpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHRleHQubWF0Y2goL1xcRC8pKSB7XG5cdFx0XHRcdHRocm93KHNldHRpbmdzLkVfTU9OVEhfTkFOKTtcblx0XHRcdH1cblx0XHRcdGxldCBudW0gPSBwYXJzZUludCh0ZXh0LCAxMCk7XG5cdFx0XHRpZiAobnVtIDwgMSkge1xuXHRcdFx0XHR0aHJvdyhzZXR0aW5ncy5FX01PTlRIX1RPT19TTUFMTCk7XG5cdFx0XHR9XG5cdFx0XHRpZiAobnVtID4gMTIpIHtcblx0XHRcdFx0dGhyb3coc2V0dGluZ3MuRV9NT05USF9UT09fQklHKTtcblx0XHRcdH1cblx0XHRcdHRleHQgPSBudW0gPCAxMCA/ICcwJyArIG51bSA6ICcnICsgbnVtO1xuXHRcdFx0aWYgKCFpbnB1dC5oYXNfZm9jdXMpIHtcblx0XHRcdFx0aW5wdXQuc2V0KHRleHQpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5tb250aF92YWx1ZSA9IHRleHQ7XG5cdFx0fVxuXG5cdFx0dmFsaWRhdGVZZWFyKCkge1xuXHRcdFx0Y29uc3QgaW5wdXQgPSB0aGlzLmlucHV0X3llYXI7XG5cdFx0XHR0aGlzLnllYXJfdmFsdWUgPSB1bmRlZmluZWQ7XG5cdFx0XHRsZXQgdGV4dCA9IGlucHV0LmdldCgpO1xuXHRcdFx0aWYgKHRleHQgPT09ICcnIHx8ICh0ZXh0ID09PSAnMCcgJiYgaW5wdXQuaGFzX2ZvY3VzKSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRpZiAodGV4dC5tYXRjaCgvXFxELykpIHtcblx0XHRcdFx0dGhyb3coc2V0dGluZ3MuRV9ZRUFSX05BTik7XG5cdFx0XHR9XG5cdFx0XHRpZiAoaW5wdXQuaGFzX2ZvY3VzKSB7XG5cdFx0XHRcdGlmICh0ZXh0Lmxlbmd0aCA+IDQpIHtcblx0XHRcdFx0XHR0aHJvdyhzZXR0aW5ncy5FX1lFQVJfTEVOR1RIKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKHRleHQubGVuZ3RoICE9PSA0KSB7XG5cdFx0XHRcdFx0dGhyb3coc2V0dGluZ3MuRV9ZRUFSX0xFTkdUSCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmICh0ZXh0Lmxlbmd0aCA9PT0gNCkge1xuXHRcdFx0XHRjb25zdCBudW0gPSBwYXJzZUludCh0ZXh0LCAxMCk7XG5cdFx0XHRcdGlmIChzZXR0aW5ncy5taW5feWVhciAmJiBudW0gPCBzZXR0aW5ncy5taW5feWVhcikge1xuXHRcdFx0XHRcdHRocm93KHNldHRpbmdzLkVfWUVBUl9UT09fU01BTEwucmVwbGFjZSgvJXkvLCBzZXR0aW5ncy5taW5feWVhcikpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHR0aGlzLnllYXJfdmFsdWUgPSB0ZXh0O1xuXHRcdH1cblxuXHRcdHdpZGdldEVycm9yVGV4dCgpIHtcblx0XHRcdGxldCBlcnJvcl90ZXh0ID0gJyc7XG5cdFx0XHQkLmVhY2godGhpcy5maWVsZHMsIGZ1bmN0aW9uIChpLCBpbnB1dCkge1xuXHRcdFx0XHRpZiAoaW5wdXQuZXJyb3JfdGV4dCkge1xuXHRcdFx0XHRcdGlmIChpbnB1dC5oYXNfZm9jdXMgfHwgZXJyb3JfdGV4dCA9PT0gJycpIHtcblx0XHRcdFx0XHRcdGVycm9yX3RleHQgPSBpbnB1dC5lcnJvcl90ZXh0XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdGlmIChlcnJvcl90ZXh0ID09PSAnJyAmJiB0aGlzLmVycm9yX3RleHQpIHtcblx0XHRcdFx0ZXJyb3JfdGV4dCA9IHRoaXMuZXJyb3JfdGV4dDtcblx0XHRcdH1cblx0XHRcdHJldHVybiBlcnJvcl90ZXh0O1xuXHRcdH1cblxuXHRcdHdpZGdldEZvY3VzTG9zdCgpIHtcblx0XHRcdGlmIChzZXR0aW5ncy5vbl9ibHVyICYmICF0aGlzLndyYXBwZXIuaXMoJy5mb2N1cycpKSB7XG5cdFx0XHRcdHNldHRpbmdzLm9uQmx1cigpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGNsYXNzIEtyRG9iSW5wdXQge1xuXHRcdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcblx0XHRcdGNvbnN0IGlucHV0ID0gdGhpcztcblx0XHRcdHRoaXMuZG9iZmllbGQgPSBvcHRpb25zLmtyZG9iZW50cnk7XG5cdFx0XHR0aGlzLm5hbWUgPSBvcHRpb25zLm5hbWU7XG5cdFx0XHR0aGlzLmluZGV4ID0gb3B0aW9ucy5pbmRleDtcblx0XHRcdHRoaXMuaGludF90ZXh0ID0gb3B0aW9ucy5oaW50X3RleHQ7XG5cdFx0XHR0aGlzLmhhc19mb2N1cyA9IGZhbHNlO1xuXHRcdFx0dGhpcy5lbXB0eSA9IHRydWU7XG5cdFx0XHR0aGlzLiRpbnB1dCA9ICQoJzxpbnB1dCB0eXBlPVwidGV4dFwiIHZhbHVlPVwiXCIgLz4nKS5hZGRDbGFzcygnanEtZHRlLScgKyB0aGlzLm5hbWUpLmF0dHIoJ2FyaWEtbGFiZWwnLCAnJyArIFwiIChcIiArIHRoaXMuaGludF90ZXh0ICsgXCIpXCIpLmZvY3VzKCQucHJveHkoaW5wdXQsICdmb2N1cycpKS5ibHVyKCQucHJveHkoaW5wdXQsICdibHVyJykpLmtleWRvd24oZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0aW5wdXQua2V5ZG93bihlKTtcblx0XHRcdFx0fSwgMilcblx0XHRcdH0pLmtleXVwKGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdGlucHV0LmtleXVwKGUpO1xuXHRcdFx0XHR9LCAyKVxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0Ymx1cigpIHtcblx0XHRcdHRoaXMuaGFzX2ZvY3VzID0gZmFsc2U7XG5cdFx0XHR0aGlzLmRvYmZpZWxkLmZvY3VzT3V0KCk7XG5cdFx0XHR0aGlzLnNob3dfaGludCgpO1xuXHRcdFx0dGhpcy5kb2JmaWVsZC52YWxpZGF0ZSh0aGlzKTtcblx0XHR9XG5cblx0XHRjbGVhckVycm9yKCkge1xuXHRcdFx0ZGVsZXRlIHRoaXMuZXJyb3JfdGV4dDtcblx0XHRcdHRoaXMuJGlucHV0LnJlbW92ZUNsYXNzKCdlcnJvcicpO1xuXHRcdH1cblxuXHRcdGZvY3VzKCkge1xuXHRcdFx0dGhpcy5rZXlfaXNfZG93biA9IGZhbHNlO1xuXHRcdFx0aWYgKHRoaXMuJGlucHV0LnByb3AoJ3JlYWRvbmx5JykpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5oYXNfZm9jdXMgPSB0cnVlO1xuXHRcdFx0dGhpcy5kb2JmaWVsZC5mb2N1c0luKCk7XG5cdFx0XHRpZiAodGhpcy4kaW5wdXQuaGFzQ2xhc3MoJ2hpbnQnKSkge1xuXHRcdFx0XHR0aGlzLiRpbnB1dC52YWwoJycpLnJlbW92ZUNsYXNzKCdoaW50Jyk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLmRvYmZpZWxkLnNob3dFcnJvcigpO1xuXHRcdH1cblxuXHRcdGdldCgpIHtcblx0XHRcdGxldCB2YWwgPSB0aGlzLiRpbnB1dC52YWwoKTtcblx0XHRcdHJldHVybiB2YWwgPT09IHRoaXMuaGludF90ZXh0ID8gJycgOiB2YWw7XG5cdFx0fVxuXG5cdFx0aXNEaWdpdEtleShlKSB7XG5cdFx0XHRsZXQga2V5Y29kZSA9IGUud2hpY2g7XG5cdFx0XHRyZXR1cm4ga2V5Y29kZSA+PSA0OCAmJiBrZXljb2RlIDw9IDU3IHx8IGtleWNvZGUgPj0gOTYgJiYga2V5Y29kZSA8PSAxMDU7XG5cdFx0fVxuXG5cdFx0a2V5ZG93bigpIHtcblx0XHRcdC8vIElnbm9yZSBrZXl1cCBldmVudHMgdGhhdCBhcnJpdmUgYWZ0ZXIgZm9jdXMgbW92ZWQgdG8gbmV4dCBmaWVsZFxuXHRcdFx0dGhpcy5rZXlfaXNfZG93biA9IHRydWU7XG5cdFx0fVxuXG5cdFx0a2V5dXAoZSkge1xuXHRcdFx0aWYgKCF0aGlzLmtleV9pc19kb3duKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdC8vIEhhbmRsZSBCYWNrc3BhY2UgLSBzaGlmdGluZyBmb2N1cyB0byBwcmV2aW91cyBmaWVsZCBpZiByZXF1aXJlZFxuXHRcdFx0bGV0IGtleWNvZGUgPSBlLndoaWNoO1xuXHRcdFx0aWYgKGtleWNvZGUgPT09IGtleS5CQUNLU1BBQ0UgJiYgdGhpcy5lbXB0eSkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5kb2JmaWVsZC5mb2N1c0ZpZWxkQmVmb3JlKHRoaXMpO1xuXHRcdFx0fVxuXHRcdFx0bGV0IHRleHQgPSB0aGlzLmdldCgpO1xuXHRcdFx0dGhpcy5lbXB0eSA9IHRleHQgPT09ICcnO1xuXG5cdFx0XHQvLyBUcmFwIGFuZCBkaXNjYXJkIHNlcGFyYXRvciBjaGFyYWN0ZXJzIC0gYWR2YW5jaW5nIGZvY3VzIGlmIHJlcXVpcmVkXG5cdFx0XHRpZiAodGV4dC5tYXRjaCgvW1xcL1xcXFwuIC1dLykpIHtcblx0XHRcdFx0dGV4dCA9IHRleHQucmVwbGFjZSgvW1xcL1xcXFwuIC1dLywgJycpO1xuXHRcdFx0XHR0aGlzLnNldCh0ZXh0KTtcblx0XHRcdFx0aWYgKCF0aGlzLmVtcHR5ICYmIHRoaXMuaW5kZXggPCAyKSB7XG5cdFx0XHRcdFx0dGhpcy5kb2JmaWVsZC5mb2N1c0ZpZWxkQWZ0ZXIodGhpcyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gQWR2YW5jZSBmb2N1cyBpZiB0aGlzIGZpZWxkIGlzIGJvdGggdmFsaWQgYW5kIGZ1bGxcblx0XHRcdGlmICh0aGlzLmRvYmZpZWxkLnZhbGlkYXRlKHRoaXMpKSB7XG5cdFx0XHRcdGxldCB3YW50ID0gdGhpcy5uYW1lID09PSAneWVhcicgPyA0IDogMjtcblx0XHRcdFx0aWYgKHRoaXMuaXNEaWdpdEtleShlKSAmJiB0ZXh0Lmxlbmd0aCA9PT0gd2FudCkge1xuXHRcdFx0XHRcdHRoaXMuZG9iZmllbGQuZm9jdXNGaWVsZEFmdGVyKHRoaXMpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0bGVmdCgpIHtcblx0XHRcdHJldHVybiB0aGlzLiRpbnB1dC5wb3NpdGlvbigpLmxlZnQ7XG5cdFx0fVxuXG5cdFx0c2V0KG5ld192YWx1ZSkge1xuXHRcdFx0dGhpcy4kaW5wdXQudmFsKG5ld192YWx1ZSkucmVtb3ZlQ2xhc3MoJ2hpbnQnKTtcblx0XHRcdGlmICghdGhpcy5oYXNfZm9jdXMpIHtcblx0XHRcdFx0dGhpcy5zaG93X2hpbnQoKTtcblx0XHRcdH1cblx0XHRcdHRoaXMuZW1wdHkgPSBuZXdfdmFsdWUgPT09ICcnO1xuXHRcdFx0dGhpcy5jbGVhckVycm9yKCk7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9XG5cblx0XHRzZXRFcnJvcih0ZXh0KSB7XG5cdFx0XHR0aGlzLmVycm9yX3RleHQgPSB0ZXh0O1xuXHRcdFx0dGhpcy4kaW5wdXQuYWRkQ2xhc3MoJ2Vycm9yJyk7XG5cdFx0XHR0aGlzLmRvYmZpZWxkLnNob3dFcnJvcigpO1xuXHRcdH1cblxuXHRcdHNldEZvY3VzKHNlbGVjdF9hbGwpIHtcblx0XHRcdGxldCAkaW5wdXQgPSB0aGlzLiRpbnB1dDtcblx0XHRcdCRpbnB1dC5mb2N1cygpO1xuXHRcdFx0aWYgKHNlbGVjdF9hbGwpIHtcblx0XHRcdFx0JGlucHV0LnNlbGVjdCgpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0JGlucHV0LnZhbCgkaW5wdXQudmFsKCkpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fVxuXG5cdFx0c2V0V2lkdGgobmV3X3dpZHRoKSB7XG5cdFx0XHR0aGlzLiRpbnB1dC53aWR0aChuZXdfd2lkdGgpO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fVxuXG5cdFx0c2hvd19oaW50KCkge1xuXHRcdFx0aWYgKHRoaXMuZ2V0KCkgPT09ICcnICYmIHR5cGVvZiAodGhpcy5oaW50X3RleHQpID09PSAnc3RyaW5nJykge1xuXHRcdFx0XHR0aGlzLiRpbnB1dC52YWwodGhpcy5oaW50X3RleHQpLmFkZENsYXNzKCdoaW50Jyk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9XG5cblx0XHR5aWVsZEZvY3VzKCkge1xuXHRcdFx0dGhpcy4kaW5wdXQuYmx1cigpO1xuXHRcdH1cblx0fVxuXG5cdCQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcblx0XHQkKCcuZG9iaXNzdWUnKS5lYWNoKGZ1bmN0aW9uICgpIHtcblx0XHRcdG15S3JEb2JFbnRyeSA9IG5ldyBLckRvYkVudHJ5KCQodGhpcyksIHt9KTtcblx0XHR9KTtcblx0fSk7XG59KGpRdWVyeSkpOyIsIi8vIG5vaW5zcGVjdGlvbiBEdXBsaWNhdGVkQ29kZVxuXG4vKipcbiAqIEBwYWNrYWdlICAgIEtub3cgUmVzZXJ2YXRpb25zXG4gKiBAc3VicGFja2FnZSBBZG1pbiBKU1xuICogQGNvcHlyaWdodCAgMjAyMCBIaWdobGFuZCBWaXNpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBAbGljZW5zZSAgICBTZWUgdGhlIGZpbGUgXCJMSUNFTlNFLnR4dFwiIGZvciB0aGUgZnVsbCBsaWNlbnNlIGdvdmVybmluZyB0aGlzIGNvZGUuXG4gKiBAYXV0aG9yICAgICBIYXplbCBXaWxzb24gPGhhemVsQGhpZ2hsYW5kdmlzaW9uLmNvbT5cbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgkKSB7XG5cdCQoZnVuY3Rpb24gKCkge1xuXHRcdGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaG93dG9hcnJpdmUnKSkge1xuXHRcdFx0Y29uc3QgaG93dG9hcnJpdmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaG93dG9hcnJpdmUnKTtcblx0XHRcdGxldCBhcnJpdmFsbWVhbnMgPSBob3d0b2Fycml2ZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtbWVhbnMnKTtcblx0XHRcdGlmICghYXJyaXZhbG1lYW5zKSB7XG5cdFx0XHRcdGFycml2YWxtZWFucyA9ICdhaXInO1xuXHRcdFx0fVxuXHRcdFx0ZGlzcGxheUFycml2YWwoYXJyaXZhbG1lYW5zKTtcblx0XHR9XG5cblx0XHQkKCdib2R5Jykub24oJ2NsaWNrJywgJy5hbWl0ZW0nLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0ZGlzcGxheUFycml2YWwoJCh0aGlzKS5hdHRyKCdpZCcpKTtcblx0XHR9KTtcblx0fSk7XG5cblx0ZnVuY3Rpb24gZGlzcGxheUFycml2YWwodmFsdWUpIHtcblx0XHRsZXQgeCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FtaXRlbScpO1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgeC5sZW5ndGg7IGkrKykge1xuXHRcdFx0eFtpXS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcblx0XHR9XG5cblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWlyLWRhdGEnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0cmFpbi1kYXRhJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXV0by1kYXRhJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3RoZXItZGF0YScpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cdFx0bGV0IGFycml2YWxkYXRhID0gdmFsdWUgKyAnLWRhdGEnO1xuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGFycml2YWxkYXRhKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh2YWx1ZSkuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2pmb3JtX2Fycml2YWxfbWVhbnMnKS52YWx1ZSA9IHZhbHVlO1xuXHR9XG59KShqUXVlcnkpOyIsIi8qKlxuICogQHBhY2thZ2UgICAgS25vdyBSZXNlcnZhdGlvbnNcbiAqIEBzdWJwYWNrYWdlIFNpdGUgSlNcbiAqIEBjb3B5cmlnaHQgIDIwMjAgSGlnaGxhbmQgVmlzaW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogQGxpY2Vuc2UgICAgU2VlIHRoZSBmaWxlIFwiTElDRU5TRS50eHRcIiBmb3IgdGhlIGZ1bGwgbGljZW5zZSBnb3Zlcm5pbmcgdGhpcyBjb2RlLlxuICogQGF1dGhvciAgICAgSGF6ZWwgV2lsc29uIDxoYXplbEBoaWdobGFuZHZpc2lvbi5jb20+XG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IGxhbmcgPSBcImVuXCI7XG5cbihmdW5jdGlvbiAoJCkge1xuXHRjb25zdCBtYXJrZXJzaGFwZSA9IHtcblx0XHR0eXBlOiAgICdwb2x5Jyxcblx0XHRjb29yZHM6IFsxLCAxLCAxLCAzMiwgMzcsIDMyLCAzMiwgMV1cblx0fTtcblxuXHRsZXQgbXlLcm1hcDtcblx0bGV0IG1hcERhdGEgPSBmYWxzZTtcblx0bGV0IG1hcDtcblx0bGV0IG1hcFpvb207XG5cdGxldCBpbmZvV2luZG93O1xuXHRsZXQgaW5mb1dpbmRvdzI7XG5cdGxldCBib3VuZHM7XG5cdGxldCBwcm9wZXJ0eWRpdjtcblx0bGV0IHByb3BlcnR5aWNvbjtcblx0bGV0IG1jO1xuLy9cdGxldCBiaWNvbjtcbi8vXHRsZXQgaGljb247XG4vL1x0bGV0IGxhcmdlX3NsaWRlc2hvdyA9IGZhbHNlO1xuXG5cdGxldCBzZXR0aW5ncyA9IHtcblx0XHRwcm9wZXJ0eU1hcmtlcnM6IFtdLFxuXHRcdGZpbHRlcklkczogICAgICAgW10sXG5cdFx0bWFwTWFya2VyczogICAgICBbXSxcblx0XHRtYXBUeXBlSWQ6ICAgICAgICcnLFxuXHRcdG1hcFpvb206ICAgICAgICAgMCxcblx0XHRtYXBNYXhab29tOiAgICAgIDIwLFxuXHRcdG1hcFR5cGU6ICAgICAgICAgJycsXG5cdFx0bWFwSWQ6ICAgICAgICAgICAnJyxcblx0XHRtYXJrZXJDb2xvcjogICAgICdyZWQnLFxuXHR9O1xuXG5cdGNsYXNzIEtybWFwIHtcblx0XHRjb25zdHJ1Y3RvcihzZXR0aW5ncykge1xuXHRcdFx0dGhpcy5zZXR0aW5ncyA9IHNldHRpbmdzO1xuXG5cdFx0XHQvL0luaXRpYWxpc2UgbWFwIG9wdGlvbnNcblx0XHRcdHRoaXMuZ21PcHRpb25zID0ge1xuXHRcdFx0XHRzY3JvbGx3aGVlbDogICAgICAgZmFsc2UsXG5cdFx0XHRcdHpvb206ICAgICAgICAgICAgICB0aGlzLnNldHRpbmdzLm1hcFpvb20sXG5cdFx0XHRcdG1heFpvb206ICAgICAgICAgICB0aGlzLnNldHRpbmdzLm1hcE1heFpvb20sXG5cdFx0XHRcdG1hcFR5cGVJZDogICAgICAgICB0aGlzLnNldHRpbmdzLm1hcFR5cGVJZCxcblx0XHRcdFx0c3RyZWV0Vmlld0NvbnRyb2w6IGZhbHNlXG5cdFx0XHR9O1xuXG5cdFx0XHRtYXBab29tID0gdGhpcy5zZXR0aW5ncy5tYXBab29tO1xuXHRcdFx0dGhpcy5nbWFya2VycyA9IFtdO1xuXHRcdFx0dGhpcy5jb3VudCA9IDA7XG5cblx0XHRcdHRoaXMuaW5pdE1hcCgpO1xuXHRcdH1cblxuXHRcdHN0YXRpYyBjbG9zZUtySW5mb3dpbmRvdygpIHtcblx0XHRcdCQoJyNrci1pbmZvd2luZG93JykuaGlkZSgpO1xuXHRcdFx0aW5mb1dpbmRvdy5jbG9zZSgpO1xuXHRcdFx0aW5mb1dpbmRvdzIuY2xvc2UoKTtcblx0XHR9XG5cblx0XHQvLyBvbmx5IHNob3cgdmlzaWJsZSBtYXJrZXJzXG5cdFx0c3RhdGljIHNob3dWaXNpYmxlTWFya2VycyhtYXJrZXJzKSB7XG5cdFx0XHRsZXQgYm91bmRzID0gbWFwLmdldEJvdW5kcygpO1xuXHRcdFx0bGV0IGNvdW50ID0gMDtcblxuXHRcdFx0Zm9yIChsZXQgZCA9IDA7IGQgPCBtYXJrZXJzLmxlbmd0aDsgZCsrKSB7XG5cdFx0XHRcdGxldCBtYXJrZXIgPSBtYXJrZXJzW2RdO1xuXG5cdFx0XHRcdGlmIChtYXJrZXIudHlwZSA9PT0gJ21hcCcpIHtcblx0XHRcdFx0XHRpZiAoYm91bmRzLmNvbnRhaW5zKG1hcmtlci5nZXRQb3NpdGlvbigpKSA9PT0gdHJ1ZSkge1xuXHRcdFx0XHRcdFx0bWFya2VyLnNldFZpc2libGUodHJ1ZSk7XG5cdFx0XHRcdFx0XHRjb3VudCsrO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRtYXJrZXIuc2V0VmlzaWJsZShmYWxzZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBjb3VudDtcblx0XHR9XG5cblx0XHQvLyBDaGVjayBNYXJrZXJzIGFycmF5IGZvciBkdXBsaWNhdGUgcG9zaXRpb24gYW5kIG9mZnNldCBhIGxpdHRsZVxuXHRcdGNoZWNrRHVwbGljYXRlKGN1cnJlbnQpIHtcblx0XHRcdGlmICh0aGlzLmdtYXJrZXJzLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0bGV0IGR1cHMgPSAwO1xuXG5cdFx0XHRcdGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLmdtYXJrZXJzLmxlbmd0aDsgaW5kZXgrKykge1xuXHRcdFx0XHRcdGxldCBwb3MgPSB0aGlzLmdtYXJrZXJzW2luZGV4XS5nZXRQb3NpdGlvbigpO1xuXHRcdFx0XHRcdGlmIChjdXJyZW50LmVxdWFscyhwb3MpKSB7XG5cdFx0XHRcdFx0XHRkdXBzKys7XG5cdFx0XHRcdFx0XHRsZXQgYSA9IDM2MC4wIC8gZHVwcztcblx0XHRcdFx0XHRcdGxldCBuZXdMYXQgPSBwb3MubGF0KCkgKyAtLjAwMDAyICogTWF0aC5jb3MoKCthICogZHVwcykgLyAxODAgKiBNYXRoLlBJKTsgIC8veFxuXHRcdFx0XHRcdFx0bGV0IG5ld0xuZyA9IHBvcy5sbmcoKSArIC0uMDAwMDAgKiBNYXRoLnNpbigoK2EgKiBkdXBzKSAvIDE4MCAqIE1hdGguUEkpOyAgLy9ZXG5cdFx0XHRcdFx0XHRjdXJyZW50ID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhuZXdMYXQsIG5ld0xuZyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBjdXJyZW50O1xuXHRcdH1cblxuXHRcdGNoZWNrWm9vbSgpIHtcblx0XHRcdGlmIChtYXBab29tID4gMCkge1xuXHRcdFx0XHRsZXQgbXlsaXN0ZW5lciA9IG1hcC5hZGRMaXN0ZW5lcignaWRsZScsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRpZiAobWFwWm9vbSA+IDAgJiYgbWFwLmdldFpvb20oKSAhPT0gbWFwWm9vbSkge1xuXHRcdFx0XHRcdFx0bWFwLnNldFpvb20obWFwWm9vbSk7XG5cdFx0XHRcdFx0XHRteWxpc3RlbmVyLnJlbW92ZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Y2x1c3Rlck1hcCgpIHtcblx0XHRcdGNvbnN0IG1jT3B0aW9ucyA9IHtcblx0XHRcdFx0Z3JpZFNpemU6ICAgICAgICAgICAgMjAsXG5cdFx0XHRcdGlnbm9yZUhpZGRlbk1hcmtlcnM6IHRydWUsXG5cdFx0XHRcdGltYWdlUGF0aDogICAgICAgICAgICcvbWVkaWEvY29tX2tub3dyZXMvaW1hZ2VzL21hcmtlcmNsdXN0ZXJlci9tJ1xuXHRcdFx0fTtcblxuXHRcdFx0dGhpcy5zZXRQcm9wZXJ0eU1hcmtlcnMoKTtcblx0XHRcdHRoaXMuc2V0TWFwTWFya2VycygpO1xuXG5cdFx0XHRmb3IgKGxldCBkID0gMDsgZCA8IHRoaXMuZ21hcmtlcnMubGVuZ3RoOyBkKyspIHtcblx0XHRcdFx0bGV0IG1hcmtlciA9IHRoaXMuZ21hcmtlcnNbZF07XG5cdFx0XHRcdGlmIChtYXJrZXIudHlwZSA9PT0gJ3Byb3BlcnR5Jykge1xuXHRcdFx0XHRcdGlmICh0aGlzLnNldHRpbmdzLmZpbHRlcklkcy5pbmNsdWRlcyhtYXJrZXIucGlkKSkge1xuXHRcdFx0XHRcdFx0bWFya2VyLnNldFZpc2libGUodHJ1ZSk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdG1hcmtlci5zZXRWaXNpYmxlKGZhbHNlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0bWMgPSBuZXcgTWFya2VyQ2x1c3RlcmVyKG1hcCwgdGhpcy5nbWFya2VycywgbWNPcHRpb25zKTtcblx0XHRcdGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKG1jLCBcImNsdXN0ZXJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdCQoJyNrci1pbmZvd2luZG93JykuaGlkZSgpO1xuXHRcdFx0XHRpbmZvV2luZG93LmNsb3NlKCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0bWFwLmZpdEJvdW5kcyhib3VuZHMpO1xuXHRcdFx0bWFwLnNldENlbnRlcihib3VuZHMuZ2V0Q2VudGVyKCkpO1xuXHRcdH1cblxuXHRcdC8vIENyZWF0ZSB0aGUgTWFwXG5cdFx0Y3JlYXRlTWFwKCkge1xuXHRcdFx0bWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnNldHRpbmdzLm1hcElkKSwgdGhpcy5nbU9wdGlvbnMpO1xuXHRcdFx0aW5mb1dpbmRvdyA9IG5ldyBnb29nbGUubWFwcy5JbmZvV2luZG93KCk7XG5cdFx0XHRpbmZvV2luZG93MiA9IG5ldyBnb29nbGUubWFwcy5JbmZvV2luZG93KCk7XG5cdFx0XHRib3VuZHMgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nQm91bmRzKCk7XG5cdFx0fVxuXG5cdFx0Ly8gQ3JlYXRlIHRoZSBtYXJrZXIgYW5kIHNldCB1cCB0aGUgZXZlbnQgd2luZG93XG5cdFx0Y3JlYXRlTWFwTWFya2VyKHBvaW50LCBodG1sLCBpbWFnZSwgYm94aW5mbywgbGluaywgdGl0bGUpIHtcblx0XHRcdGxldCBtYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcblx0XHRcdFx0c2hhcGU6ICAgIG1hcmtlcnNoYXBlLFxuXHRcdFx0XHRsaW5rOiAgICAgbGluayxcblx0XHRcdFx0aWNvbjogICAgIGltYWdlLFxuXHRcdFx0XHRwb3NpdGlvbjogcG9pbnQsXG5cdFx0XHRcdHRpdGxlOiAgICB0aXRsZSxcblx0XHRcdFx0bWFwOiAgICAgIG1hcCxcblx0XHRcdFx0ekluZGV4OiAgIDk5OVxuXHRcdFx0fSk7XG5cblx0XHRcdGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKG1hcmtlciwgJ21vdXNlb3ZlcicsIChmdW5jdGlvbiAoaHRtbCkge1xuXHRcdFx0XHRyZXR1cm4gZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdGluZm9XaW5kb3cyLnNldENvbnRlbnQoaHRtbCk7XG5cdFx0XHRcdFx0aW5mb1dpbmRvdzIub3BlbihtYXAsIG1hcmtlcik7XG5cdFx0XHRcdH07XG5cdFx0XHR9KShodG1sKSk7XG5cblx0XHRcdGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKG1hcmtlciwgJ21vdXNlb3V0JywgKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRpbmZvV2luZG93Mi5jbG9zZSgpO1xuXHRcdFx0XHR9O1xuXHRcdFx0fSkoKSk7XG5cblx0XHRcdGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKG1hcmtlciwgJ2Nsb3NlY2xpY2snLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdGluZm9XaW5kb3cyLmNsb3NlKCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0dGhpcy5nbWFya2Vycy5wdXNoKG1hcmtlcik7XG5cblx0XHRcdHRoaXMuY291bnQrKztcblx0XHR9XG5cblx0XHRjcmVhdGVQcm9wZXJ0eU1hcmtlcihwb2ludCwgaHRtbCwgYm94aW5mbywgbGluaywgdGl0bGUsIGNvbG9yLCBpZCwgaW1hZ2UsIHBpZCkge1xuXHRcdFx0bGV0IG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xuXHRcdFx0XHRwb3NpdGlvbjogcG9pbnQsXG5cdFx0XHRcdGxpbms6ICAgICBsaW5rLFxuXHRcdFx0XHRtYXA6ICAgICAgbWFwLFxuXHRcdFx0XHRpY29uOiAgICAgaW1hZ2UsXG5cdFx0XHRcdHRpdGxlOiAgICB0aXRsZSxcblx0XHRcdFx0cGlkOiAgICAgIHBpZCxcblx0XHRcdFx0dHlwZTogICAgICdwcm9wZXJ0eScsXG5cdFx0XHRcdHpJbmRleDogICB0aGlzLmNvdW50ICsgMTAwMFxuXHRcdFx0fSk7XG5cblx0XHRcdHByb3BlcnR5ZGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuXHRcdFx0Ly8gaWYgKHByb3BlcnR5ZGl2ICE9PSBudWxsKSB7XG5cdFx0XHQvLyBcdGdvb2dsZS5tYXBzLmV2ZW50LmFkZERvbUxpc3RlbmVyKHByb3BlcnR5ZGl2LCAnbW91c2VvdmVyJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0Ly8gXHRcdG1hcmtlci5zZXRJY29uKFxuXHRcdFx0Ly8gXHRcdFx0aGljb25cblx0XHRcdC8vIFx0XHQpXG5cdFx0XHQvLyBcdFx0bWFya2VyLnNldFpJbmRleChtYXJrZXIuZ2V0WkluZGV4KCkgKyAxMDAwKTtcblx0XHRcdC8vIFx0fSk7XG5cdFx0XHQvLyBcdGdvb2dsZS5tYXBzLmV2ZW50LmFkZERvbUxpc3RlbmVyKHByb3BlcnR5ZGl2LCAnbW91c2VvdXQnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHQvLyBcdFx0bWFya2VyLnNldEljb24oXG5cdFx0XHQvLyBcdFx0XHRiaWNvblxuXHRcdFx0Ly8gXHRcdClcblx0XHRcdC8vIFx0XHRtYXJrZXIuc2V0WkluZGV4KG1hcmtlci5nZXRaSW5kZXgoKSAtIDEwMDApO1xuXHRcdFx0Ly8gXHR9KTtcblx0XHRcdC8vIH1cblxuXHRcdFx0Ly8gbWFya2VyLmFkZExpc3RlbmVyKCdtb3VzZW92ZXInLCAoZnVuY3Rpb24gKCkge1xuXHRcdFx0Ly8gXHRtYXJrZXIuc2V0SWNvbihcblx0XHRcdC8vIFx0XHRoaWNvblxuXHRcdFx0Ly8gXHQpXG5cdFx0XHQvLyBcdG1hcmtlci5zZXRaSW5kZXgobWFya2VyLmdldFpJbmRleCgpICsgMTAwMCk7XG5cdFx0XHQvLyB9KSk7XG5cdFx0XHQvL1xuXHRcdFx0Ly8gbWFya2VyLmFkZExpc3RlbmVyKCdtb3VzZW91dCcsIChmdW5jdGlvbiAoKSB7XG5cdFx0XHQvLyBcdG1hcmtlci5zZXRJY29uKFxuXHRcdFx0Ly8gXHRcdGJpY29uXG5cdFx0XHQvLyBcdClcblx0XHRcdC8vIFx0bWFya2VyLnNldFpJbmRleChtYXJrZXIuZ2V0WkluZGV4KCkgLSAxMDAwKTtcblx0XHRcdC8vIH0pKTtcblxuXHRcdFx0Ly8gZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIobWFya2VyLCAnY2xpY2snLCBmdW5jdGlvbigpIHtcblx0XHRcdC8vIFx0bWFya2VyLnNldFZpc2libGUoZmFsc2UpOyAvLyBtYXBzIEFQSSBoaWRlIGNhbGxcblx0XHRcdC8vIH0pO1xuXG5cdFx0XHRtYXJrZXIuYWRkTGlzdGVuZXIoJ21vdXNlZG93bicsIChmdW5jdGlvbiAoYm94aW5mbykge1xuXHRcdFx0XHRyZXR1cm4gZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdGluZm9XaW5kb3cuY2xvc2UoKTtcblx0XHRcdFx0XHQkKCcja3ItaW5mb3dpbmRvdycpLmhpZGUoKTtcblx0XHRcdFx0XHRpbmZvV2luZG93LnNldENvbnRlbnQoaHRtbCk7XG5cdFx0XHRcdFx0aW5mb1dpbmRvdy5vcGVuKG1hcCwgbWFya2VyKTtcblxuXHRcdFx0XHRcdCQuYWpheCh7XG5cdFx0XHRcdFx0XHR0eXBlOiAgICBcIlBPU1RcIixcblx0XHRcdFx0XHRcdHVybDogICAgICcvaW5kZXgucGhwP29wdGlvbj1jb21fa25vd3JlcyZ0YXNrPXByb3BlcnR5Lm1hcGluZm93aW5kb3cmbGFuZz0nICsgbGFuZyxcblx0XHRcdFx0XHRcdGRhdGE6ICAgIHtcblx0XHRcdFx0XHRcdFx0aWQ6IHBhcnNlSW50KGJveGluZm8pXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0c3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcblx0XHRcdFx0XHRcdFx0JCgnI2tyLWluZm93aW5kb3cnKS5mYWRlSW4oNDAwKS5odG1sKGRhdGEpLnNob3coKTtcblx0XHRcdFx0XHRcdFx0JChcIi5rci1pbmZvd2luZG93LXNsaWRlc2hvd1wiKS5ub3QoJy5zbGljay1pbml0aWFsaXplZCcpLnNsaWNrKHtcblx0XHRcdFx0XHRcdFx0XHRuZXh0QXJyb3c6ICc8aSBjbGFzcz1cInNsaWNrLW5hdiBuZXh0IGZhLXNvbGlkIGZhLWNoZXZyb24tcmlnaHQgXCI+PC9pPicsXG5cdFx0XHRcdFx0XHRcdFx0cHJldkFycm93OiAnPGkgY2xhc3M9XCJzbGljay1uYXYgcHJldiBmYS1zb2xpZCBmYS1jaGV2cm9uLWxlZnQgXCI+PC9pPicsXG5cdFx0XHRcdFx0XHRcdFx0YXV0b3BsYXk6ICB0cnVlXG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9O1xuXHRcdFx0fSkoYm94aW5mbykpO1xuXG5cdFx0XHRnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYXJrZXIsICdjbG9zZWNsaWNrJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHQkKCcja3ItaW5mb3dpbmRvdycpLmhpZGUoKTtcblx0XHRcdFx0aW5mb1dpbmRvdy5jbG9zZSgpO1xuXHRcdFx0fSk7XG5cblx0XHRcdHRoaXMuZ21hcmtlcnMucHVzaChtYXJrZXIpO1xuXHRcdFx0Ym91bmRzLmV4dGVuZChwb2ludCk7XG5cblx0XHRcdHRoaXMuY291bnQrKztcblx0XHR9XG5cblx0XHQvL0luaXRpYWxpc2UgbWFwXG5cdFx0aW5pdE1hcCgpIHtcblx0XHRcdHRoaXMuY3JlYXRlTWFwKCk7XG5cdFx0XHRpZiAodGhpcy5zZXR0aW5ncy5tYXBUeXBlID09PSAnY2x1c3RlcicpIHtcblx0XHRcdFx0dGhpcy5jbHVzdGVyTWFwKCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLnNvbG9NYXAoKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBSZXNldCBtYXAgdG8gaW5pdGlhbCBzdGF0ZVxuXHRcdHJlZnJlc2hNYXAoJG1hcG1vZGFsKSB7XG5cdFx0XHRpZiAodGhpcy5zZXR0aW5ncy5tYXBUeXBlID09PSAnc29sbycpXG5cdFx0XHRcdHJldHVybjtcblxuXHRcdFx0bGV0IHNlbGYgPSB0aGlzO1xuXHRcdFx0alF1ZXJ5LmFqYXgoe1xuXHRcdFx0XHR1cmw6ICAgICAgJy9pbmRleC5waHA/b3B0aW9uPWNvbV9rbm93cmVzJnRhc2s9cHJvcGVydGllcy5yZWZyZXNobWFwJmxhbmc9JyArIGxhbmcsXG5cdFx0XHRcdHR5cGU6ICAgICAnUE9TVCcsXG5cdFx0XHRcdGRhdGFUeXBlOiAnanNvbicsXG5cdFx0XHRcdHN1Y2Nlc3M6ICBmdW5jdGlvbiAocmVzdWx0KSB7XG5cdFx0XHRcdFx0aWYgKHJlc3VsdC5zdWNjZXNzKSB7XG5cdFx0XHRcdFx0XHRzZWxmLnNldHRpbmdzLmZpbHRlcklkcyA9IHJlc3VsdC5kYXRhLmZpbHRlcklkcztcblx0XHRcdFx0XHRcdGZvciAobGV0IGQgPSAwOyBkIDwgc2VsZi5nbWFya2Vycy5sZW5ndGg7IGQrKykge1xuXHRcdFx0XHRcdFx0XHRsZXQgbWFya2VyID0gc2VsZi5nbWFya2Vyc1tkXTtcblx0XHRcdFx0XHRcdFx0aWYgKG1hcmtlci50eXBlID09PSAncHJvcGVydHknKSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKHNlbGYuc2V0dGluZ3MuZmlsdGVySWRzLmluY2x1ZGVzKG1hcmtlci5waWQpKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRtYXJrZXIuc2V0VmlzaWJsZSh0cnVlKTtcblx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0bWFya2VyLnNldFZpc2libGUoZmFsc2UpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRtYy5yZXBhaW50KCk7XG5cdFx0XHRcdFx0XHRuZXcgRm91bmRhdGlvbi5SZXZlYWwoJG1hcG1vZGFsKTtcblx0XHRcdFx0XHRcdCRtYXBtb2RhbC5mb3VuZGF0aW9uKCdvcGVuJyk7XG5cdFx0XHRcdFx0XHRnb29nbGUubWFwcy5ldmVudC50cmlnZ2VyKG1hcCwgJ3Jlc2l6ZScpO1xuXHRcdFx0XHRcdFx0JG1hcG1vZGFsLmZvdW5kYXRpb24oJ29wZW4nKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0d2luZG93LmFsZXJ0KHJlc3VsdC5tZXNzYWdlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdC8vIFJlc2V0IG1hcCB0byBpbml0aWFsIHN0YXRlXG5cdFx0cmVzZXRNYXAoKSB7XG5cdFx0XHRpbmZvV2luZG93LmNsb3NlKCk7XG5cdFx0XHRpbmZvV2luZG93Mi5jbG9zZSgpO1xuXHRcdFx0JCgnI2tyLWluZm93aW5kb3cnKS5oaWRlKCk7XG5cdFx0XHRtYXAuZml0Qm91bmRzKGJvdW5kcyk7XG5cdFx0XHRtYXAuc2V0Q2VudGVyKGJvdW5kcy5nZXRDZW50ZXIoKSk7XG5cdFx0fVxuXG5cdFx0Ly8gbG9vcCB0byBzZXQgbWFwIG1hcmtlcnNcblx0XHRzZXRNYXBNYXJrZXJzKCkge1xuXHRcdFx0bGV0IHBvaW50O1xuXHRcdFx0bGV0IGFtYXJrO1xuXG5cdFx0XHRmb3IgKGxldCBkID0gMDsgZCA8IHRoaXMuc2V0dGluZ3MubWFwTWFya2Vycy5sZW5ndGg7IGQrKykge1xuXHRcdFx0XHRhbWFyayA9IHRoaXMuc2V0dGluZ3MubWFwTWFya2Vyc1tkXTtcblx0XHRcdFx0bGV0IG1hcmtlcmljb24gPSB7XG5cdFx0XHRcdFx0dXJsOiAgYW1hcmtbJ2ljb24nXSxcblx0XHRcdFx0XHRzaXplOiBuZXcgZ29vZ2xlLm1hcHMuU2l6ZSgzMiwgMzcpLFxuXHRcdFx0XHRcdC8vIE9SIHNjYWxlZFNpemU6IG5ldyBnb29nbGUubWFwcy5TaXplKDQwLCA0Nylcblx0XHRcdFx0XHRvcmlnaW46IG5ldyBnb29nbGUubWFwcy5Qb2ludCgwLCAwKSxcblx0XHRcdFx0XHRhbmNob3I6IG5ldyBnb29nbGUubWFwcy5Qb2ludCgwLCAxOClcblx0XHRcdFx0fTtcblxuXHRcdFx0XHRwb2ludCA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoYW1hcmtbJ2xhdCddLCBhbWFya1snbG5nJ10pO1xuXHRcdFx0XHRwb2ludCA9IHRoaXMuY2hlY2tEdXBsaWNhdGUocG9pbnQpO1xuXHRcdFx0XHR0aGlzLmNyZWF0ZU1hcE1hcmtlcihwb2ludCwgYW1hcmtbJ2h0bWwnXSwgbWFya2VyaWNvbiwgJycsICcnLCBhbWFya1sndGl0bGUnXSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gc2V0TWFya2VySWNvbnMoKSB7XG5cdFx0Ly8gXHRiaWNvbiA9IHtcblx0XHQvLyBcdFx0cGF0aDogICAgICAgICAnL21lZGlhL2NvbV9rbm93cmVzL2Fzc2V0cy9pbWFnZXMvc3ZnJyxcblx0XHQvLyBcdFx0ZmlsbENvbG9yOiAgICB0aGlzLnNldHRpbmdzLm1hcmtlckNvbG9yLFxuXHRcdC8vIFx0XHRmaWxsT3BhY2l0eTogIDAuOSxcblx0XHQvLyBcdFx0YW5jaG9yOiAgICAgICBuZXcgZ29vZ2xlLm1hcHMuUG9pbnQoOSwgMzUpLFxuXHRcdC8vIFx0XHRzdHJva2VDb2xvcjogIFwiI2VmZWZlZlwiLFxuXHRcdC8vIFx0XHRzdHJva2VXZWlnaHQ6IDAuNSxcblx0XHQvLyBcdFx0c2NhbGU6ICAgICAgICAxXG5cdFx0Ly8gXHR9O1xuXHRcdC8vIFx0aGljb24gPSB7XG5cdFx0Ly8gXHRcdHBhdGg6ICAgICAgICAgJy9tZWRpYS9jb21fa25vd3Jlcy9hc3NldHMvaW1hZ2VzL3N2ZycsXG5cdFx0Ly8gXHRcdGZpbGxDb2xvcjogICAgXCJncmVlblwiLFxuXHRcdC8vIFx0XHRmaWxsT3BhY2l0eTogIDEsXG5cdFx0Ly8gXHRcdGFuY2hvcjogICAgICAgbmV3IGdvb2dsZS5tYXBzLlBvaW50KDksIDM1KSxcblx0XHQvLyBcdFx0c3Ryb2tlQ29sb3I6ICBcIiNlZmVmZWZcIixcblx0XHQvLyBcdFx0c3Ryb2tlV2VpZ2h0OiAwLjgsXG5cdFx0Ly8gXHRcdHNjYWxlOiAgICAgICAgMS41XG5cdFx0Ly8gXHR9O1xuXHRcdC8vIH1cblxuXHRcdC8vIGxvb3AgdG8gc2V0IHByb3BlcnR5IG1hcmtlcnNcblx0XHRzZXRQcm9wZXJ0eU1hcmtlcnMoKSB7XG5cdFx0XHRsZXQgcG9pbnQ7XG5cdFx0XHRsZXQgYW1hcms7XG5cblx0XHRcdGZvciAobGV0IGQgPSAwOyBkIDwgdGhpcy5zZXR0aW5ncy5wcm9wZXJ0eU1hcmtlcnMubGVuZ3RoOyBkKyspIHtcblx0XHRcdFx0YW1hcmsgPSB0aGlzLnNldHRpbmdzLnByb3BlcnR5TWFya2Vyc1tkXTtcblxuXHRcdFx0XHRpZiAoIWQpIHtcblx0XHRcdFx0XHRwcm9wZXJ0eWljb24gPSB7XG5cdFx0XHRcdFx0XHR1cmw6ICAgIGFtYXJrWydpY29uJ10sXG5cdFx0XHRcdFx0XHRzaXplOiAgIG5ldyBnb29nbGUubWFwcy5TaXplKDMyLCAzNyksXG5cdFx0XHRcdFx0XHRvcmlnaW46IG5ldyBnb29nbGUubWFwcy5Qb2ludCgwLCAwKSxcblx0XHRcdFx0XHRcdGFuY2hvcjogbmV3IGdvb2dsZS5tYXBzLlBvaW50KDAsIDIwKVxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRwb2ludCA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoYW1hcmtbJ2xhdCddLCBhbWFya1snbG5nJ10pO1xuXHRcdFx0XHRwb2ludCA9IHRoaXMuY2hlY2tEdXBsaWNhdGUocG9pbnQpO1xuXHRcdFx0XHR0aGlzLmNyZWF0ZVByb3BlcnR5TWFya2VyKHBvaW50LCBhbWFya1snaHRtbCddLCBhbWFya1snYm94aW5mbyddLCBhbWFya1snbGluayddLCBhbWFya1sndGl0bGUnXSwgYW1hcmtbJ2NvbG9yJ10sIGFtYXJrWydpZCddLCBwcm9wZXJ0eWljb24sIGFtYXJrWydwaWQnXSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0c29sb01hcCgpIHtcblx0XHRcdHRoaXMuc2V0UHJvcGVydHlNYXJrZXJzKCk7XG5cdFx0XHR0aGlzLnNldE1hcE1hcmtlcnMoKTtcblxuXHRcdFx0bWFwLmZpdEJvdW5kcyhib3VuZHMpO1xuXHRcdFx0bWFwLnNldENlbnRlcihib3VuZHMuZ2V0Q2VudGVyKCkpO1xuLy9cdFx0XHR0aGlzLmNoZWNrWm9vbSgpO1xuXG5cdFx0XHRpZiAodGhpcy5zZXR0aW5ncy5tYXBNYXJrZXJzLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0Y29uc3Qgc2VsZiA9IHRoaXM7XG5cblx0XHRcdFx0bGV0IG15TGlzdGVuZXIgPSBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYXAsICdpZGxlJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdGxldCBmb3VuZCA9IDA7XG5cdFx0XHRcdFx0bGV0IGN1cnJlbnRab29tID0gbWFwLmdldFpvb20oKTtcblxuXHRcdFx0XHRcdHdoaWxlICghZm91bmQpIHtcblx0XHRcdFx0XHRcdGZvdW5kID0gS3JtYXAuc2hvd1Zpc2libGVNYXJrZXJzKHNlbGYuZ21hcmtlcnMpO1xuXHRcdFx0XHRcdFx0aWYgKGZvdW5kKSB7XG5cdFx0XHRcdFx0XHRcdG15TGlzdGVuZXIucmVtb3ZlKCk7XG5cdFx0XHRcdFx0XHRcdG1hcC5zZXRab29tKGN1cnJlbnRab29tKTtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRjdXJyZW50Wm9vbSA9IGN1cnJlbnRab29tIC0gMTtcblx0XHRcdFx0XHRcdGlmIChjdXJyZW50Wm9vbSA8IDEwKSB7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0JChmdW5jdGlvbiAoKSB7XG5cdFx0bGV0ICRtYXBtb2RhbDtcblxuXHRcdCQoJ2JvZHknKS5vbignY2xpY2snLCAnLm1hcC10cmlnZ2VyJywgZnVuY3Rpb24gKGUpIHtcbiBcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG4gXHRcdFx0aWYgKG1hcERhdGEpIHtcbiBcdFx0XHRcdG15S3JtYXAucmVmcmVzaE1hcCgkbWFwbW9kYWwpO1xuIFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRraWNrTWFwKCQodGhpcykpO1xuXHRcdFx0XHQkbWFwbW9kYWwgPSAkKCcja3Itc2VhcmNoLW1hcC1tb2RhbCcpO1xuXHRcdFx0XHQkbWFwbW9kYWwuZm91bmRhdGlvbignb3BlbicpO1xuIFx0XHRcdH1cblx0XHR9KS5vbignY2xpY2snLCAnLnJlc2V0bWFwJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdG15S3JtYXAucmVzZXRNYXAoKTtcblx0XHR9KS5vbignY2xpY2snLCAnI2tyLXNlYXJjaC1tYXAtZnVsbC1pbmZvd2luZG93LWNsb3NlJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdEtybWFwLmNsb3NlS3JJbmZvd2luZG93KCk7XG5cdFx0fSkub24oJ2NsaWNrJywgJy5jbG9zZW1hcCcsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHQkbWFwbW9kYWwuZm91bmRhdGlvbignY2xvc2UnKTtcblx0XHRcdCQuYWpheCh7XG5cdFx0XHRcdHR5cGU6ICAgIFwiUE9TVFwiLFxuXHRcdFx0XHR1cmw6ICAgICAnL2luZGV4LnBocD9vcHRpb249Y29tX2tub3dyZXMmdGFzaz1wcm9wZXJ0aWVzLm1hcHNlc3Npb24mbGFuZz0nICsgbGFuZyxcblx0XHRcdFx0c3VjY2VzczogZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdCQoICcua3Itc2VhcmNoYmFyIC5idXR0b24ubWFwJykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuXHRcdFx0XHRcdCQoICcua3Itc2VhcmNoYmFyIC5idXR0b24ubGlzdCcpLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSkub24oJ29wZW4uemYucmV2ZWFsJywgJyNrci1zZWFyY2gtbWFwLW1vZGFsJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdCQoJyNrci1zZWFyY2gtbWFwLWZ1bGwnKS5oZWlnaHQoJCgnI2tyLXNlYXJjaC1tYXAtbW9kYWwnKS5oZWlnaHQoKSk7XG5cdFx0XHRnb29nbGUubWFwcy5ldmVudC50cmlnZ2VyKG1hcCwgXCJyZXNpemVcIik7XG5cdFx0XHQkLmFqYXgoe1xuXHRcdFx0XHR0eXBlOiAgICBcIlBPU1RcIixcblx0XHRcdFx0dXJsOiAgICAgJy9pbmRleC5waHA/b3B0aW9uPWNvbV9rbm93cmVzJnRhc2s9cHJvcGVydGllcy5tYXBzZXNzaW9uJmxhbmc9JyArIGxhbmcsXG5cdFx0XHRcdGRhdGE6ICAgIHttYXBfbW9kYWw6ICcxJ30sXG5cdFx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0XHQvLyBEb2Vzbid0IHRyaWdnZXIgaWYgaW5jbHVkZWQgYWJvdmUgPz9cblx0XHRpZiAoIW1hcERhdGEpIHtcblx0XHRcdGNvbnN0ICRzb2xvVHJpZ2dlciA9ICQoJyNrci1tYXAtc29sby10cmlnZ2VyJyk7XG5cdFx0XHQkc29sb1RyaWdnZXIub25lKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0a2lja01hcCgkc29sb1RyaWdnZXIpO1xuXHRcdFx0fSk7XG5cblx0XHRcdGlmICh3aW5kb3cubG9jYXRpb24uaHJlZi5pbmRleE9mKCcjbWFwJykgIT09IC0xICYmICRzb2xvVHJpZ2dlci5sZW5ndGgpIHtcblx0XHRcdFx0a2lja01hcCgkc29sb1RyaWdnZXIpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIFRlc3QgZm9yIGZvcmNlIG1hcFxuXHRcdGNvbnN0ICR0cmlnZ2VyID0gJCgnLm1hcC10cmlnZ2VyJyk7XG5cdFx0aWYgKCR0cmlnZ2VyLmRhdGEoJ2ZvcmNlbWFwJykpIHtcblx0XHRcdCR0cmlnZ2VyLnRyaWdnZXIoJ2NsaWNrJyk7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24ga2lja01hcCgkZWxlbSkge1xuXHRcdFx0Y29uc3QgdHlwZSA9ICRlbGVtLmRhdGEoJ3R5cGUnKTtcblx0XHRcdGxldCBwaWQgPSAwO1xuXHRcdFx0aWYgKHR5cGUgPT09ICdzb2xvJykge1xuXHRcdFx0XHRwaWQgPSAkZWxlbS5kYXRhKCdwaWQnKTtcblx0XHRcdH1cblxuXHRcdFx0alF1ZXJ5LmFqYXgoe1xuXHRcdFx0XHR1cmw6ICAgICAgJy9pbmRleC5waHA/b3B0aW9uPWNvbV9rbm93cmVzJnRhc2s9cHJvcGVydGllcy5tYXBkYXRhJnBpZD0nICsgcGlkICsgJyZsYW5nPScgKyBsYW5nLFxuXHRcdFx0XHR0eXBlOiAgICAgXCJQT1NUXCIsXG5cdFx0XHRcdGRhdGFUeXBlOiBcImpzb25cIixcblx0XHRcdFx0c3VjY2VzczogIGZ1bmN0aW9uIChyZXN1bHQpIHtcblx0XHRcdFx0XHRpZiAocmVzdWx0LnN1Y2Nlc3MpIHtcblx0XHRcdFx0XHRcdHNldHRpbmdzID0ge1xuXHRcdFx0XHRcdFx0XHRtYXBJZDogICAgICAgICAgICRlbGVtLmRhdGEoJ3RhcmdldCcpLFxuXHRcdFx0XHRcdFx0XHRtYXBUeXBlOiAgICAgICAgICRlbGVtLmRhdGEoJ3R5cGUnKSxcblx0XHRcdFx0XHRcdFx0bWFwVHlwZUlkOiAgICAgICAkZWxlbS5kYXRhKCdtYXB0eXBlaWQnKSxcblx0XHRcdFx0XHRcdFx0bWFwWm9vbTogICAgICAgICBwYXJzZUludCgkZWxlbS5kYXRhKCd6b29tJykpLFxuXHRcdFx0XHRcdFx0XHRtYXBNYXhab29tOiAgICAgIHBhcnNlSW50KCRlbGVtLmRhdGEoJ3pvb21tYXgnKSksXG5cdFx0XHRcdFx0XHRcdHByb3BlcnR5TWFya2VyczogcmVzdWx0LmRhdGEucHJvcGVydHlNYXJrZXJzLFxuXHRcdFx0XHRcdFx0XHRtYXBNYXJrZXJzOiAgICAgIHJlc3VsdC5kYXRhLm1hcE1hcmtlcnMsXG5cdFx0XHRcdFx0XHRcdGZpbHRlcklkczogICAgICAgcmVzdWx0LmRhdGEuZmlsdGVySWRzXG5cdFx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0XHRteUtybWFwID0gbmV3IEtybWFwKHNldHRpbmdzKTtcblx0XHRcdFx0XHRcdG1hcERhdGEgPSB0cnVlO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHR3aW5kb3cuYWxlcnQocmVzdWx0Lm1lc3NhZ2UpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9KTtcbn0oalF1ZXJ5KSk7IiwiLyoqXG4gKiBAcGFja2FnZSAgICBLbm93IFJlc2VydmF0aW9uc1xuICogQHN1YnBhY2thZ2UgU2l0ZSBKU1xuICogQGNvcHlyaWdodCAgMjAyMCBIaWdobGFuZCBWaXNpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBAbGljZW5zZSAgICBTZWUgdGhlIGZpbGUgXCJMSUNFTlNFLnR4dFwiIGZvciB0aGUgZnVsbCBsaWNlbnNlIGdvdmVybmluZyB0aGlzIGNvZGUuXG4gKiBAYXV0aG9yICAgICBIYXplbCBXaWxzb24gPGhhemVsQGhpZ2hsYW5kdmlzaW9uLmNvbT5cbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgkKSB7XG5cdGxldCBteUtycm91dGU7XG5cdGxldCBkaXJlY3Rpb25zRGlzcGxheTtcblx0bGV0IGRpcmVjdGlvbnNWaXNpYmxlID0gZmFsc2U7XG5cdGxldCByb3V0ZU1hcDtcblx0bGV0IG9yaWdpbjtcblx0bGV0IGRlc3RpbmF0aW9uO1xuXHRsZXQgcm91dGVNYXJrZXJzID0gW107XG5cdGxldCByb3V0ZVN0b3BQb2ludHMgPSBbXTtcblx0bGV0IHBvaW50O1xuXHRsZXQgc2VsZjtcblxuXHRsZXQgc2V0dGluZ3MgPSB7XG5cdFx0bGF0OiAgICAgICAgICAgICAgIFwiXCIsXG5cdFx0bG5nOiAgICAgICAgICAgICAgIFwiXCIsXG5cdFx0bmFtZTogICAgICAgICAgICAgIFwiXCIsXG5cdFx0aWNvbjogICAgICAgICAgICAgIFwiXCIsXG5cdFx0ZGV0b3VyOiAgICAgICAgICAgIFwiXCIsXG5cdFx0bWFwWm9vbTogICAgICAgICAgIDksXG5cdFx0bWFwTWF4Wm9vbTogICAgICAgIDIwLFxuXHRcdG1hcFR5cGVJZDogICAgICAgICBcInJvYWRtYXBcIixcblx0XHRtYXBJZDogICAgICAgICAgICAgXCJrci1tYXAtcm91dGVcIixcblx0XHRkaXJlY3Rpb25zUGFuZWw6ICAgXCJrci1kaXJlY3Rpb25zLXBhbmVsXCIsXG5cdFx0ZGlyZWN0aW9uc1NlcnZpY2U6IG51bGxcblx0fTtcblxuXHRjbGFzcyBLcnJvdXRlIHtcblx0XHRjb25zdHJ1Y3RvcigkZWxlbWVudCwgb3B0aW9ucykge1xuXHRcdFx0dGhpcy5zZXR0aW5ncyA9IHNldHRpbmdzO1xuXHRcdFx0aWYgKG9wdGlvbnMpIHtcblx0XHRcdFx0JC5leHRlbmQodGhpcy5zZXR0aW5ncywgb3B0aW9ucyk7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuc2V0dGluZ3MuZGlyZWN0aW9uc1NlcnZpY2UgPSBuZXcgZ29vZ2xlLm1hcHMuRGlyZWN0aW9uc1NlcnZpY2UoKTtcblx0XHRcdHRoaXMuaW5pdCgpO1xuXHRcdH1cblxuXHRcdHN0YXRpYyBjbGVhclJvdXRlTWFya2VycygpIHtcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcm91dGVNYXJrZXJzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdHJvdXRlTWFya2Vyc1tpXS5zZXRNYXAobnVsbCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0c3RhdGljIGNsZWFyV2F5cG9pbnRzKCkge1xuXHRcdFx0b3JpZ2luID0gbnVsbDtcblx0XHRcdHJvdXRlTWFya2VycyA9IFtdO1xuXHRcdFx0cm91dGVTdG9wUG9pbnRzID0gW107XG5cdFx0XHRkaXJlY3Rpb25zVmlzaWJsZSA9IGZhbHNlO1xuXHRcdH1cblxuXHRcdGFkZFJvdXRlTWFya2VyKGxhdGxuZykge1xuXHRcdFx0cm91dGVNYXJrZXJzLnB1c2gobmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XG5cdFx0XHRcdHBvc2l0aW9uOiBsYXRsbmcsXG5cdFx0XHRcdG1hcDogICAgICByb3V0ZU1hcCxcblx0XHRcdFx0aWNvbjogICAgIHRoaXMuc2V0dGluZ3MuZGV0b3VyXG5cdFx0XHR9KSk7XG5cdFx0fVxuXG5cdFx0Ly9cblx0XHQvLyBhZGRQcm9wZXJ0eU1hcmtlcihwb2ludCwgaHRtbCwgaW1hZ2UsIGJveGluZm8pIHtcblx0XHQvLyBcdGxldCBtYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcblx0XHQvLyBcdFx0cG9zaXRpb246IHBvaW50LFxuXHRcdC8vIFx0XHRodG1sOiAgICAgaHRtbCxcblx0XHQvLyBcdFx0bWFwOiAgICAgIHJvdXRlTWFwLFxuXHRcdC8vIFx0XHRpY29uOiAgICAgaW1hZ2UsXG5cdFx0Ly8gXHRcdHpJbmRleDogICAxXG5cdFx0Ly8gXHR9KTtcblx0XHQvL1xuXHRcdC8vIFx0bGV0IGluZm93aW5kb3cgPSBuZXcgZ29vZ2xlLm1hcHMuSW5mb1dpbmRvdyh7XG5cdFx0Ly8gXHRcdGNvbnRlbnQ6IGJveGluZm9cblx0XHQvLyBcdH0pO1xuXHRcdC8vXG5cdFx0Ly8gXHRnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYXJrZXIsICdjbGljaycsIGZ1bmN0aW9uICgpIHtcblx0XHQvLyBcdFx0Ly8gQ2hlY2sgdG8gc2VlIGlmIHRoZXJlIGlzIGFuIGluZm8gd2luZG93IHN0b3JlZCBpbiByb3V0ZUN1cnJJbmZvV2luZG93LFxuXHRcdC8vIFx0XHQvLyBpZiB0aGVyZSBpcywgd2UgdXNlIC5jbG9zZSgpIHRvIGhpZGUgdGhlIHdpbmRvd1xuXHRcdC8vIFx0XHRpZiAocm91dGVDdXJySW5mb1dpbmRvdykge1xuXHRcdC8vIFx0XHRcdHJvdXRlQ3VyckluZm9XaW5kb3cuY2xvc2UoKTtcblx0XHQvLyBcdFx0fVxuXHRcdC8vIFx0XHQvLyBQdXQgb3VyIG5ldyBpbmZvIHdpbmRvdyBpbiB0byB0aGUgcm91dGVDdXJySW5mb1dpbmRvdyB2YXJpYWJsZVxuXHRcdC8vIFx0XHRyb3V0ZUN1cnJJbmZvV2luZG93ID0gaW5mb3dpbmRvdztcblx0XHQvLyBcdFx0Ly8gT3BlbiB0aGUgd2luZG93XG5cdFx0Ly8gXHRcdGluZm93aW5kb3cub3Blbihyb3V0ZU1hcCwgbWFya2VyKTtcblx0XHQvLyBcdH0pO1xuXHRcdC8vXG5cdFx0Ly8gXHQvL2dtYXJrZXJzLnB1c2goIG1hcmtlciApO1xuXHRcdC8vIFx0cm91dGVNYXJrZXJzLnB1c2gobWFya2VyKTtcblx0XHQvLyB9XG5cblx0XHQvLyBzdGF0aWMgdXBkYXRlTW9kZSgpIHtcblx0XHQvLyBcdGlmIChkaXJlY3Rpb25zVmlzaWJsZSkge1xuXHRcdC8vIFx0XHR0aGlzLmNhbGNSb3V0ZSgpO1xuXHRcdC8vIFx0fVxuXHRcdC8vIH1cblxuXHRcdGNhbGNSb3V0ZSgpIHtcblx0XHRcdGxldCBmcm9tX2FkZHJlc3MgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZyb21fYWRkcmVzc1wiKS52YWx1ZTtcblx0XHRcdGxldCBvcmlnaW4gPSBcIlwiO1xuXG5cdFx0XHRpZiAoZnJvbV9hZGRyZXNzID09PSBcIkFkZHJlc3NcIikgZnJvbV9hZGRyZXNzID0gXCJcIjtcblx0XHRcdGlmIChmcm9tX2FkZHJlc3MpIG9yaWdpbiA9IGZyb21fYWRkcmVzcyArIFwiLFwiICsgXCJcIjtcblxuXHRcdFx0bGV0IG1vZGU7XG5cdFx0XHRzd2l0Y2ggKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW9kZVwiKS52YWx1ZSkge1xuXHRcdFx0XHRjYXNlIFwiYmljeWNsaW5nXCI6XG5cdFx0XHRcdFx0bW9kZSA9IGdvb2dsZS5tYXBzLkRpcmVjdGlvbnNUcmF2ZWxNb2RlLkJJQ1lDTElORztcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcImRyaXZpbmdcIjpcblx0XHRcdFx0XHRtb2RlID0gZ29vZ2xlLm1hcHMuRGlyZWN0aW9uc1RyYXZlbE1vZGUuRFJJVklORztcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcIndhbGtpbmdcIjpcblx0XHRcdFx0XHRtb2RlID0gZ29vZ2xlLm1hcHMuRGlyZWN0aW9uc1RyYXZlbE1vZGUuV0FMS0lORztcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0aWYgKG9yaWdpbikge1xuXHRcdFx0XHRsZXQgcmVxdWVzdCA9IHtcblx0XHRcdFx0XHRvcmlnaW46ICAgICAgICBvcmlnaW4sXG5cdFx0XHRcdFx0ZGVzdGluYXRpb246ICAgZGVzdGluYXRpb24sXG5cdFx0XHRcdFx0d2F5cG9pbnRzOiAgICAgcm91dGVTdG9wUG9pbnRzLFxuXHRcdFx0XHRcdHRyYXZlbE1vZGU6ICAgIG1vZGUsXG5cdFx0XHRcdFx0YXZvaWRIaWdod2F5czogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hpZ2h3YXlzJykuY2hlY2tlZCxcblx0XHRcdFx0XHRhdm9pZFRvbGxzOiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9sbHMnKS5jaGVja2VkXG5cdFx0XHRcdH07XG5cblx0XHRcdFx0c2VsZiA9IHRoaXM7XG5cdFx0XHRcdHRoaXMuc2V0dGluZ3MuZGlyZWN0aW9uc1NlcnZpY2Uucm91dGUocmVxdWVzdCwgZnVuY3Rpb24gKHJlc3BvbnNlLCBzdGF0dXMpIHtcblx0XHRcdFx0XHRpZiAoc3RhdHVzID09PSBnb29nbGUubWFwcy5EaXJlY3Rpb25zU3RhdHVzLk9LKSB7XG5cdFx0XHRcdFx0XHRkaXJlY3Rpb25zRGlzcGxheS5zZXREaXJlY3Rpb25zKHJlc3BvbnNlKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0YWxlcnQoXCJHb29nbGUgY291bGRuYHQgY2FsY3VsYXRlIGRpcmVjdGlvbnMgZm9yIHRoaXMgcm91dGUgYW5kIHNlbGVjdGVkIG9wdGlvbnNcIik7XG5cdFx0XHRcdFx0XHRzZWxmLnJlc2V0Um91dGUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXG5cdFx0XHRLcnJvdXRlLmNsZWFyUm91dGVNYXJrZXJzKCk7XG5cdFx0XHRkaXJlY3Rpb25zVmlzaWJsZSA9IHRydWU7XG5cdFx0fVxuXG5cdFx0aW5pdCgpIHtcblx0XHRcdGRlc3RpbmF0aW9uID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyh0aGlzLnNldHRpbmdzLmxhdCwgdGhpcy5zZXR0aW5ncy5sbmcpO1xuXG5cdFx0XHQvL0luaXRpYWxpc2UgbWFwIG9wdGlvbnNcblx0XHRcdHRoaXMubXlPcHRpb25zID0ge1xuXHRcdFx0XHRzY3JvbGx3aGVlbDogICAgICAgZmFsc2UsXG5cdFx0XHRcdHpvb206ICAgICAgICAgICAgICB0aGlzLnNldHRpbmdzLm1hcFpvb20sXG5cdFx0XHRcdG1heFpvb206ICAgICAgICAgICB0aGlzLnNldHRpbmdzLm1hcE1heFpvb20sXG5cdFx0XHRcdG1hcFR5cGVJZDogICAgICAgICB0aGlzLnNldHRpbmdzLm1hcFR5cGVJZCxcblx0XHRcdFx0c3RyZWV0Vmlld0NvbnRyb2w6IGZhbHNlLFxuXHRcdFx0XHRjZW50ZXI6ICAgICAgICAgICAgZGVzdGluYXRpb25cblx0XHRcdH07XG5cblx0XHRcdHJvdXRlTWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnNldHRpbmdzLm1hcElkKSwgdGhpcy5teU9wdGlvbnMpO1xuXHRcdFx0ZGlyZWN0aW9uc0Rpc3BsYXkgPSBuZXcgZ29vZ2xlLm1hcHMuRGlyZWN0aW9uc1JlbmRlcmVyKCk7XG5cdFx0XHRkaXJlY3Rpb25zRGlzcGxheS5zZXRNYXAocm91dGVNYXApO1xuXHRcdFx0ZGlyZWN0aW9uc0Rpc3BsYXkuc2V0UGFuZWwoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5zZXR0aW5ncy5kaXJlY3Rpb25zUGFuZWwpKTtcblxuXHRcdFx0Y29uc3QgaW1hZ2UgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VySW1hZ2UodGhpcy5zZXR0aW5ncy5pY29uKTtcblx0XHRcdHBvaW50ID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyh0aGlzLnNldHRpbmdzLmxhdCwgdGhpcy5zZXR0aW5ncy5sbmcpO1xuXG5cdFx0XHRzZWxmID0gdGhpcztcblx0XHRcdGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKHJvdXRlTWFwLCAnY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRcdFx0aWYgKHJvdXRlU3RvcFBvaW50cy5sZW5ndGggPCA5KSB7XG5cdFx0XHRcdFx0cm91dGVTdG9wUG9pbnRzLnB1c2goe2xvY2F0aW9uOiBldmVudC5sYXRMbmcsIHN0b3BvdmVyOiB0cnVlfSk7XG5cdFx0XHRcdFx0cG9pbnQgPSBldmVudC5sYXRMbmc7XG5cdFx0XHRcdFx0c2VsZi5hZGRSb3V0ZU1hcmtlcihwb2ludCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0YWxlcnQoXCJNYXhpbXVtIG51bWJlciBvZiA5IHdheXBvaW50cyByZWFjaGVkXCIpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0c2VsZiA9IHRoaXM7XG5cdFx0XHRnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lck9uY2Uocm91dGVNYXAsICdpZGxlJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRnb29nbGUubWFwcy5ldmVudC50cmlnZ2VyKHJvdXRlTWFwLCAncmVzaXplJyk7XG5cdFx0XHRcdHNlbGYuY2FsY1JvdXRlKCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRyZXNldFJvdXRlKCkge1xuXHRcdFx0S3Jyb3V0ZS5jbGVhclJvdXRlTWFya2VycygpO1xuXHRcdFx0S3Jyb3V0ZS5jbGVhcldheXBvaW50cygpO1xuXHRcdFx0ZGlyZWN0aW9uc0Rpc3BsYXkuc2V0TWFwKG51bGwpO1xuXHRcdFx0ZGlyZWN0aW9uc0Rpc3BsYXkuc2V0UGFuZWwobnVsbCk7XG5cdFx0XHRkaXJlY3Rpb25zRGlzcGxheSA9IG5ldyBnb29nbGUubWFwcy5EaXJlY3Rpb25zUmVuZGVyZXIoKTtcblx0XHRcdGRpcmVjdGlvbnNEaXNwbGF5LnNldE1hcChyb3V0ZU1hcCk7XG5cdFx0XHRkaXJlY3Rpb25zRGlzcGxheS5zZXRQYW5lbChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnNldHRpbmdzLmRpcmVjdGlvblBhbmVsKSk7XG5cblx0XHRcdHRoaXMuaW5pdCgpO1xuXHRcdH1cblx0fVxuXG5cdCQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcblx0XHQkKFwiLmtyLWRpcmVjdGlvbnMtbW9kYWxcIikub24oJ2NsaWNrJywgJyNrci1tYXAtcm91dGUnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0bGV0ICRlbGVtZW50ID0gJCh0aGlzKTtcblx0XHRcdGNvbnN0IG9wdGlvbnMgPSB7XG5cdFx0XHRcdGxhdDogICAgJGVsZW1lbnQuZGF0YSgnbGF0JyksXG5cdFx0XHRcdGxuZzogICAgJGVsZW1lbnQuZGF0YSgnbG5nJyksXG5cdFx0XHRcdG5hbWU6ICAgJGVsZW1lbnQuZGF0YSgnbmFtZScpLFxuXHRcdFx0XHRpY29uOiAgICRlbGVtZW50LmRhdGEoJ2ljb24nKSxcblx0XHRcdFx0ZGV0b3VyOiAkZWxlbWVudC5kYXRhKCdkZXRvdXInKVxuXHRcdFx0fTtcblx0XHRcdG15S3Jyb3V0ZSA9IG5ldyBLcnJvdXRlKCRlbGVtZW50LCBvcHRpb25zKTtcblx0XHR9KS5vbignY2xpY2snLCAnLnJlc2V0cm91dGUnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0bXlLcnJvdXRlLnJlc2V0Um91dGUoKTtcblx0XHR9KS5vbignY2xpY2snLCAnLmNhbGNyb3V0ZScsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRteUtycm91dGUuY2FsY1JvdXRlKCk7XG5cdFx0fSk7XG5cblx0XHRqUXVlcnkoXCJhI2dlb2NvZGVBZGRyZXNzXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdGxldCBhZGRyZXNzU3RyaW5nID1cblx0XHRcdFx0ICAgIGpRdWVyeShcIiNqZm9ybV9wcm9wZXJ0eV9zdHJlZXRcIikudmFsKClcblx0XHRcdFx0ICAgICsgXCIsIFwiXG5cdFx0XHRcdCAgICArIGpRdWVyeSgnI2pmb3JtX3Rvd25faWQnKS5maW5kKFwiOnNlbGVjdGVkXCIpLnRleHQoKVxuXHRcdFx0XHQgICAgKyBcIiBcIlxuXHRcdFx0XHQgICAgKyBqUXVlcnkoXCIjamZvcm1fcHJvcGVydHlfcG9zdGNvZGVcIikudmFsKClcblx0XHRcdFx0ICAgICsgXCIsIFwiXG5cdFx0XHRcdCAgICArIGpRdWVyeSgnI2pmb3JtX3JlZ2lvbl9pZCcpLmZpbmQoXCI6c2VsZWN0ZWRcIikudGV4dCgpXG5cdFx0XHRcdCAgICArIFwiIFwiXG5cdFx0XHRcdCAgICArIGpRdWVyeSgnI2pmb3JtX2NvdW50cnlfaWQnKS5maW5kKFwiOnNlbGVjdGVkXCIpLnRleHQoKTtcblxuXHRcdFx0bGV0IHVybCA9ICdpbmRleC5waHA/b3B0aW9uPWNvbV9rbm93cmVzJnRhc2s9cHJvcGVydHkuZ2VvY29kZSc7XG5cdFx0XHRsZXQgY29vcmQgPSBbXTtcblxuXHRcdFx0alF1ZXJ5LmFqYXgoe1xuXHRcdFx0XHR0eXBlOiAgICAgXCJQT1NUXCIsXG5cdFx0XHRcdHVybDogICAgICB1cmwsXG5cdFx0XHRcdGRhdGE6ICAgICB7YWRkcmVzczogYWRkcmVzc1N0cmluZ30sXG5cdFx0XHRcdGRhdGFUeXBlOiBcImpzb25cIixcblx0XHRcdFx0c3VjY2VzczogIGZ1bmN0aW9uIChqc29uZGF0YSkge1xuXHRcdFx0XHRcdGpRdWVyeS5lYWNoKGpzb25kYXRhLCBmdW5jdGlvbiAoa2V5LCB2YWwpIHtcblx0XHRcdFx0XHRcdGxldCBkaXYgPSBcIiNcIiArIGtleTtcblx0XHRcdFx0XHRcdGpRdWVyeShkaXYpLnZhbCh2YWwpO1xuXHRcdFx0XHRcdFx0Y29vcmRba2V5XSA9IHZhbDtcblx0XHRcdFx0XHRcdG15R21hcC5yZWZyZXNoTWFwKGNvb3JkWydsYXQnXSwgY29vcmRbJ2xuZyddLCBmYWxzZSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9KTtcbn0oalF1ZXJ5KSk7IiwiLy8gS1IgQVBQIEpTIEZpbGVzXG5pbXBvcnQgJ25wbS9qcXVlcnktYmFyLXJhdGluZy9qcXVlcnkuYmFycmF0aW5nJztcbmltcG9ydCAnbnBtL2lzLW1hcmtlci1jbHVzdGVyZXInO1xuaW1wb3J0ICdtZWRpYWpzL3NpdGUvYXBwJztcbi8vaW1wb3J0ICdtZWRpYWpzL3NpdGUvY29tYm9nZW8nO1xuaW1wb3J0ICdtZWRpYWpzL3NpdGUvY29uZmlybSc7XG5pbXBvcnQgJ21lZGlhanMvc2l0ZS9kb2JlbnRyeSc7XG5pbXBvcnQgJ21lZGlhanMvc2l0ZS9ndWVzdGRhdGEnO1xuaW1wb3J0ICdtZWRpYWpzL3NpdGUvbWFwJztcbmltcG9ydCAnbWVkaWFqcy9zaXRlL3JvdXRlJztcbi8vIGltcG9ydCAnLi9qcy9zcmMva3JhcHAvc3RyaXBlJzsiXSwibmFtZXMiOlsiTWFya2VyQ2x1c3RlcmVyIiwibWFwIiwib3B0X21hcmtlcnMiLCJvcHRfb3B0aW9ucyIsImV4dGVuZCIsImdvb2dsZSIsIm1hcHMiLCJPdmVybGF5VmlldyIsIm1hcF8iLCJtYXJrZXJzXyIsImNsdXN0ZXJzXyIsInNpemVzIiwic3R5bGVzXyIsInJlYWR5XyIsIm9wdGlvbnMiLCJncmlkU2l6ZV8iLCJtaW5DbHVzdGVyU2l6ZV8iLCJtYXhab29tXyIsImltYWdlUGF0aF8iLCJNQVJLRVJfQ0xVU1RFUl9JTUFHRV9QQVRIXyIsImltYWdlRXh0ZW5zaW9uXyIsIk1BUktFUl9DTFVTVEVSX0lNQUdFX0VYVEVOU0lPTl8iLCJ6b29tT25DbGlja18iLCJ1bmRlZmluZWQiLCJhdmVyYWdlQ2VudGVyXyIsInNldHVwU3R5bGVzXyIsInNldE1hcCIsInByZXZab29tXyIsImdldFpvb20iLCJ0aGF0IiwiZXZlbnQiLCJhZGRMaXN0ZW5lciIsInpvb20iLCJyZXNldFZpZXdwb3J0IiwicmVkcmF3IiwibGVuZ3RoIiwiYWRkTWFya2VycyIsInByb3RvdHlwZSIsIm9iajEiLCJvYmoyIiwib2JqZWN0IiwicHJvcGVydHkiLCJhcHBseSIsIm9uQWRkIiwic2V0UmVhZHlfIiwiZHJhdyIsImkiLCJzaXplIiwicHVzaCIsInVybCIsImhlaWdodCIsIndpZHRoIiwiZml0TWFwVG9NYXJrZXJzIiwibWFya2VycyIsImdldE1hcmtlcnMiLCJib3VuZHMiLCJMYXRMbmdCb3VuZHMiLCJtYXJrZXIiLCJnZXRQb3NpdGlvbiIsImZpdEJvdW5kcyIsInNldFN0eWxlcyIsInN0eWxlcyIsImdldFN0eWxlcyIsImlzWm9vbU9uQ2xpY2siLCJpc0F2ZXJhZ2VDZW50ZXIiLCJnZXRUb3RhbE1hcmtlcnMiLCJzZXRNYXhab29tIiwibWF4Wm9vbSIsImdldE1heFpvb20iLCJjYWxjdWxhdG9yXyIsIm51bVN0eWxlcyIsImluZGV4IiwiY291bnQiLCJkdiIsInBhcnNlSW50IiwiTWF0aCIsIm1pbiIsInRleHQiLCJzZXRDYWxjdWxhdG9yIiwiY2FsY3VsYXRvciIsImdldENhbGN1bGF0b3IiLCJvcHRfbm9kcmF3IiwicHVzaE1hcmtlclRvXyIsImlzQWRkZWQiLCJyZXBhaW50IiwiYWRkTWFya2VyIiwicmVtb3ZlTWFya2VyXyIsImluZGV4T2YiLCJtIiwic3BsaWNlIiwicmVtb3ZlTWFya2VyIiwicmVtb3ZlZCIsInJlbW92ZU1hcmtlcnMiLCJyIiwicmVhZHkiLCJjcmVhdGVDbHVzdGVyc18iLCJnZXRUb3RhbENsdXN0ZXJzIiwiZ2V0TWFwIiwiZ2V0R3JpZFNpemUiLCJzZXRHcmlkU2l6ZSIsImdldE1pbkNsdXN0ZXJTaXplIiwic2V0TWluQ2x1c3RlclNpemUiLCJnZXRFeHRlbmRlZEJvdW5kcyIsInByb2plY3Rpb24iLCJnZXRQcm9qZWN0aW9uIiwidHIiLCJMYXRMbmciLCJnZXROb3J0aEVhc3QiLCJsYXQiLCJsbmciLCJibCIsImdldFNvdXRoV2VzdCIsInRyUGl4IiwiZnJvbUxhdExuZ1RvRGl2UGl4ZWwiLCJ4IiwieSIsImJsUGl4IiwibmUiLCJmcm9tRGl2UGl4ZWxUb0xhdExuZyIsInN3IiwiaXNNYXJrZXJJbkJvdW5kc18iLCJjb250YWlucyIsImNsZWFyTWFya2VycyIsIm9wdF9oaWRlIiwiY2x1c3RlciIsInJlbW92ZSIsIm9sZENsdXN0ZXJzIiwic2xpY2UiLCJ3aW5kb3ciLCJzZXRUaW1lb3V0IiwiZGlzdGFuY2VCZXR3ZWVuUG9pbnRzXyIsInAxIiwicDIiLCJSIiwiZExhdCIsIlBJIiwiZExvbiIsImEiLCJzaW4iLCJjb3MiLCJjIiwiYXRhbjIiLCJzcXJ0IiwiZCIsImFkZFRvQ2xvc2VzdENsdXN0ZXJfIiwiZGlzdGFuY2UiLCJjbHVzdGVyVG9BZGRUbyIsInBvcyIsImNlbnRlciIsImdldENlbnRlciIsImlzTWFya2VySW5DbHVzdGVyQm91bmRzIiwiQ2x1c3RlciIsIm1hcEJvdW5kcyIsImdldEJvdW5kcyIsIm1hcmtlckNsdXN0ZXJlciIsIm1hcmtlckNsdXN0ZXJlcl8iLCJjZW50ZXJfIiwiYm91bmRzXyIsImNsdXN0ZXJJY29uXyIsIkNsdXN0ZXJJY29uIiwiaXNNYXJrZXJBbHJlYWR5QWRkZWQiLCJjYWxjdWxhdGVCb3VuZHNfIiwibCIsImxlbiIsInVwZGF0ZUljb24iLCJnZXRNYXJrZXJDbHVzdGVyZXIiLCJnZXRTaXplIiwibXoiLCJoaWRlIiwic3VtcyIsInNldENlbnRlciIsInNldFN1bXMiLCJzaG93Iiwib3B0X3BhZGRpbmciLCJwYWRkaW5nXyIsImNsdXN0ZXJfIiwiZGl2XyIsInN1bXNfIiwidmlzaWJsZV8iLCJ0cmlnZ2VyQ2x1c3RlckNsaWNrIiwidHJpZ2dlciIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImdldFBvc0Zyb21MYXRMbmdfIiwic3R5bGUiLCJjc3NUZXh0IiwiY3JlYXRlQ3NzIiwiaW5uZXJIVE1MIiwicGFuZXMiLCJnZXRQYW5lcyIsIm92ZXJsYXlNb3VzZVRhcmdldCIsImFwcGVuZENoaWxkIiwiYWRkRG9tTGlzdGVuZXIiLCJsYXRsbmciLCJ3aWR0aF8iLCJoZWlnaHRfIiwidG9wIiwibGVmdCIsImRpc3BsYXkiLCJvblJlbW92ZSIsInBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsInRleHRfIiwiaW5kZXhfIiwidXNlU3R5bGUiLCJtYXgiLCJ1cmxfIiwidGV4dENvbG9yXyIsImFuY2hvcl8iLCJ0ZXh0U2l6ZV8iLCJmb250RmFtaWx5XyIsImZvbnRXZWlnaHRfIiwiYmFja2dyb3VuZFBvc2l0aW9uXyIsImJhY2tncm91bmRQb3NpdGlvbiIsIl90eXBlb2YiLCJ0eHRDb2xvciIsInR4dFNpemUiLCJmb250RmFtaWx5IiwiZm9udFdlaWdodCIsImpvaW4iLCJnbG9iYWwiLCJtb2R1bGUiLCJleHBvcnRzIiwiZmFjdG9yeSIsImRlZmluZSIsImFtZCIsInJlcXVpcmUiLCJqUXVlcnkiLCIkIiwiQmFyUmF0aW5nIiwic2VsZiIsIndyYXBFbGVtZW50IiwiY2xhc3NlcyIsInRoZW1lIiwiJGVsZW0iLCJ3cmFwIiwidW53cmFwRWxlbWVudCIsInVud3JhcCIsImZpbmRPcHRpb24iLCJ2YWx1ZSIsImlzTnVtZXJpYyIsImZsb29yIiwiZ2V0SW5pdGlhbE9wdGlvbiIsImluaXRpYWxSYXRpbmciLCJnZXRFbXB0eU9wdGlvbiIsIiRlbXB0eU9wdCIsImZpbmQiLCJlbXB0eVZhbHVlIiwiYWxsb3dFbXB0eSIsInByZXBlbmRUbyIsImdldERhdGEiLCJrZXkiLCJkYXRhIiwic2V0RGF0YSIsInNhdmVEYXRhT25FbGVtZW50IiwiJG9wdCIsInZhbCIsImVtcHR5VGV4dCIsInVzZXJPcHRpb25zIiwicmF0aW5nVmFsdWUiLCJyYXRpbmdUZXh0Iiwib3JpZ2luYWxSYXRpbmdWYWx1ZSIsIm9yaWdpbmFsUmF0aW5nVGV4dCIsImVtcHR5UmF0aW5nVmFsdWUiLCJlbXB0eVJhdGluZ1RleHQiLCJyZWFkT25seSIsInJlYWRvbmx5IiwicmF0aW5nTWFkZSIsInJlbW92ZURhdGFPbkVsZW1lbnQiLCJyZW1vdmVEYXRhIiwiYnVpbGRXaWRnZXQiLCIkdyIsImVhY2giLCJodG1sIiwiJGEiLCJzaG93VmFsdWVzIiwiYXBwZW5kIiwic2hvd1NlbGVjdGVkUmF0aW5nIiwicmV2ZXJzZSIsImFkZENsYXNzIiwibmV4dEFsbG9yUHJldmlvdXNBbGwiLCJzZXRTZWxlY3RGaWVsZFZhbHVlIiwicHJvcCIsImNoYW5nZSIsInJlc2V0U2VsZWN0RmllbGQiLCJkZWZhdWx0U2VsZWN0ZWQiLCJwYXJlbnQiLCJmcmFjdGlvbiIsInJvdW5kIiwicmVzZXRTdHlsZSIsIiR3aWRnZXQiLCJyZW1vdmVDbGFzcyIsIm1hdGNoIiwiYXBwbHlTdHlsZSIsImJhc2VWYWx1ZSIsImYiLCIkYWxsIiwiJGZyYWN0aW9uYWwiLCJpc0Rlc2VsZWN0YWJsZSIsIiRlbGVtZW50IiwiZGVzZWxlY3RhYmxlIiwiYXR0ciIsImF0dGFjaENsaWNrSGFuZGxlciIsIiRlbGVtZW50cyIsIm9uIiwicHJldmVudERlZmF1bHQiLCJvblNlbGVjdCIsImNhbGwiLCJhdHRhY2hNb3VzZUVudGVySGFuZGxlciIsImF0dGFjaE1vdXNlTGVhdmVIYW5kbGVyIiwiZmFzdENsaWNrcyIsInN0b3BQcm9wYWdhdGlvbiIsImNsaWNrIiwiZGlzYWJsZUNsaWNrcyIsImF0dGFjaEhhbmRsZXJzIiwiaG92ZXJTdGF0ZSIsImRldGFjaEhhbmRsZXJzIiwib2ZmIiwic2V0dXBIYW5kbGVycyIsImluc2VydEFmdGVyIiwic3RhdGUiLCJ0b2dnbGVDbGFzcyIsInNldCIsInNpbGVudCIsImNsZWFyIiwib25DbGVhciIsImRlc3Ryb3kiLCJvbkRlc3Ryb3kiLCJpbml0IiwiZWxlbSIsImZuIiwiYmFycmF0aW5nIiwiZGVmYXVsdHMiLCJtZXRob2QiLCJwbHVnaW4iLCJpcyIsImVycm9yIiwiaGFzT3duUHJvcGVydHkiLCJuZXh0IiwibGFuZyIsInNlYXJjaERhdGEiLCJzZWFyY2hEb25lIiwiY2FsZW5kYXJMb2FkZWQiLCJzYXZlZHdpZHRoIiwibGFyZ2UiLCJyZXNpemVkIiwiRm91bmRhdGlvbiIsImFkZFRvSnF1ZXJ5IiwiZm91bmRhdGlvbiIsImNoZWNrU2NyZWVuV2lkdGgiLCJiYXJzIiwiJGN0cmlnZ2VyIiwibG9hZENhbGVuZGFyIiwiZSIsIiRmb3JtIiwiYWpheCIsInR5cGUiLCJzZXJpYWxpemUiLCJkYXRhVHlwZSIsInN1Y2Nlc3MiLCJyZXN1bHQiLCJmb3JtUmVzcG9uc2UiLCJsb2NhdGlvbiIsImhyZWYiLCJtZXNzYWdlIiwiJG1vZGFsIiwiUmV2ZWFsIiwib3BlbiIsImNzcyIsIm1vZGFsaWQiLCJ0cmltIiwiYWpheHVybCIsImNvbnRlbnQiLCJwaWQiLCJiYXIiLCJnZXRQcm9wZXJ0aWVzIiwiY2hpbGRyZW4iLCJ0b2dnbGUiLCJzZXRBY3RpdmVNZW51IiwidGFyZ2V0IiwiJHByb3BzIiwiJHRhYnMiLCJzcGVjaWFsIiwidG91Y2hzdGFydCIsInNldHVwIiwiXyIsIm5zIiwiaGFuZGxlIiwiaW5jbHVkZXMiLCJhZGRFdmVudExpc3RlbmVyIiwicGFzc2l2ZSIsInRvdWNobW92ZSIsImlkIiwicmVwbGFjZSIsInJlZGlyZWN0IiwiYWN0aW9uIiwiYXJndW1lbnRzIiwiYWN0aW9uX3ZhbHVlIiwicmVsb2FkIiwidmFscyIsInNldFNlYXJjaERhdGEiLCJyZXNwb25zZSIsImVtcHR5IiwiZmFkZUluIiwiaGFzQ2xhc3MiLCJzY3JvbGxUbyIsInNlYXJjaGJhciIsInNjcmVlbldpZHRoSGFzQ2hhbmdlZCIsIk1lZGlhUXVlcnkiLCJhdExlYXN0Iiwib3JpZ2luIiwicHJvdG9jb2wiLCJob3N0IiwibXlDb25maXJtIiwiJG15VGFzayIsIktyY29uZmlybSIsImNvbnN0cnVjdG9yIiwiZm9ybSIsInVwZGF0ZVF1b3RlIiwic2VyaWFsaXplQXJyYXkiLCJkaXYiLCJjaGVja1Rlcm1zIiwidGVzdCIsImdldEVsZW1lbnRCeUlkIiwidGVzdGMiLCJ0ZXN0dCIsImFncmVlY2hlY2siLCJjaGVja2VkIiwiYWdyZWVjaGVja2MiLCJhZ3JlZWNoZWNrdCIsIm15S3JEb2JFbnRyeSIsInRvZGF5IiwiQkFDS1NQQUNFIiwic2V0dGluZ3MiLCJjdXN0b21fdmFsaWRhdGlvbiIsImRheXNfaW5fbW9udGgiLCJkb2N1bWVudF9kYXRlIiwiZXJyb3Jib3hfeCIsImVycm9yYm94X3kiLCJmaWVsZF9oaW50X3RleHRfZGF5IiwiZmllbGRfaGludF90ZXh0X21vbnRoIiwiZmllbGRfaGludF90ZXh0X3llYXIiLCJmaWVsZF9vcmRlciIsImZpZWxkX3dpZHRoX2RheSIsImZpZWxkX3dpZHRoX21vbnRoIiwiZmllbGRfd2lkdGhfeWVhciIsImZpZWxkX3dpZHRoX3NlcCIsIm1pbm1heCIsIm1pbl9kYXRlIiwibWF4X2RhdGUiLCJtaW5feWVhciIsIm1vbnRoX25hbWUiLCJvbl9ibHVyIiwib25fZXJyb3IiLCJvbl9jaGFuZ2UiLCJwYXJzZV9kYXRlIiwic2VwYXJhdG9yIiwic2hvd19lcnJvcnMiLCJzaG93X2hpbnRzIiwiRV9EQVlfTkFOIiwiRV9EQVlfVE9PX0JJRyIsIkVfREFZX1RPT19TTUFMTCIsIkVfQkFEX0RBWV9GT1JfTU9OVEgiLCJFX01PTlRIX05BTiIsIkVfTU9OVEhfVE9PX0JJRyIsIkVfTU9OVEhfVE9PX1NNQUxMIiwiRV9ZRUFSX05BTiIsIkVfWUVBUl9MRU5HVEgiLCJFX1lFQVJfVE9PX1NNQUxMIiwiRV9NSU5fREFURSIsIkVfTUFYX0RBVEUiLCJLckRvYkVudHJ5IiwiZ2V0WW1kIiwiRGF0ZSIsImlucHV0X2RheSIsImlucHV0X21vbnRoIiwiaW5wdXRfeWVhciIsImRhdGUiLCJnZXRNb250aCIsImdldERheSIsImdldEZ1bGxZZWFyIiwiZ2V0WW1kT2JqZWN0IiwieWVhciIsIm1vbnRoIiwiZGF5IiwiYWRkRW50cnlGaWVsZHMiLCJkb2JmaWVsZCIsImZpZWxkcyIsInNwbGl0IiwiZmllbGQiLCJidWlsZEZpZWxkIiwiYWZ0ZXJQYXN0ZSIsInBhcnNlRGF0ZSIsInNldERhdGUiLCJuYW1lIiwia3Jkb2JlbnRyeSIsImlucHV0IiwiS3JEb2JJbnB1dCIsImhpbnRfdGV4dCIsImlubmVyIiwiJGlucHV0IiwiYnVpbGRVaSIsIndyYXBwZXIiLCJlcnJvcmJveCIsInNldEZpZWxkV2lkdGhzIiwiY2hlY2tEb2N1bWVudCIsImRvYiIsImNoaWxkZG9iIiwiY2xhc3NuYW1lIiwiZWxlbWVudHMiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiY2xlYXJFcnJvciIsImVycm9yX3RleHQiLCJzaG93RXJyb3IiLCJmb2N1cyIsInNldEZvY3VzIiwiZm9jdXNGaWVsZEJlZm9yZSIsInlpZWxkRm9jdXMiLCJmb2N1c0ZpZWxkQWZ0ZXIiLCJmb2N1c0luIiwiZm9jdXNPdXQiLCJ3aWRnZXRGb2N1c0xvc3QiLCJnZXREYXRlIiwiZGF5X3ZhbHVlIiwibW9udGhfdmFsdWUiLCJ5ZWFyX3ZhbHVlIiwicHJveHlMYWJlbENsaWNrcyIsInBhcnNlSXNvRGF0ZSIsIlJlZ0V4cCIsIiQzIiwiJDIiLCIkMSIsIm5ld19kYXRlIiwidmFsaWRhdGUiLCJzZXRFcnJvciIsImF2YWlsYWJsZSIsInRvdGFsIiwic2V0V2lkdGgiLCJzZXRSZWFkb25seSIsIm1vZGUiLCJ3aWRnZXRFcnJvclRleHQiLCJ4X29mZnNldCIsIm91dGVyV2lkdGgiLCJ5X29mZnNldCIsInBvc2l0aW9uIiwiY3VycmVudF9pbnB1dCIsInZhbGlkYXRlRGF5IiwidmFsaWRhdGVNb250aCIsInZhbGlkYXRlWWVhciIsInZhbGlkYXRlRGF5c0luTW9udGgiLCJ2YWxpZGF0ZUNvbXBsZXRlRGF0ZSIsImRhdGVfc3RyIiwiZGF0ZV9vYmoiLCJkYXRlX2lzbyIsIm9wdCIsImdldCIsImhhc19mb2N1cyIsIm51bSIsIm1zZyIsInRvU3RyaW5nIiwib25CbHVyIiwicHJveHkiLCJibHVyIiwia2V5ZG93biIsImtleXVwIiwic2hvd19oaW50Iiwia2V5X2lzX2Rvd24iLCJpc0RpZ2l0S2V5Iiwia2V5Y29kZSIsIndoaWNoIiwid2FudCIsIm5ld192YWx1ZSIsInNlbGVjdF9hbGwiLCJzZWxlY3QiLCJuZXdfd2lkdGgiLCJob3d0b2Fycml2ZSIsImFycml2YWxtZWFucyIsImdldEF0dHJpYnV0ZSIsImRpc3BsYXlBcnJpdmFsIiwiY2xhc3NMaXN0IiwiYXJyaXZhbGRhdGEiLCJhZGQiLCJtYXJrZXJzaGFwZSIsImNvb3JkcyIsIm15S3JtYXAiLCJtYXBEYXRhIiwibWFwWm9vbSIsImluZm9XaW5kb3ciLCJpbmZvV2luZG93MiIsInByb3BlcnR5ZGl2IiwicHJvcGVydHlpY29uIiwibWMiLCJwcm9wZXJ0eU1hcmtlcnMiLCJmaWx0ZXJJZHMiLCJtYXBNYXJrZXJzIiwibWFwVHlwZUlkIiwibWFwTWF4Wm9vbSIsIm1hcFR5cGUiLCJtYXBJZCIsIm1hcmtlckNvbG9yIiwiS3JtYXAiLCJnbU9wdGlvbnMiLCJzY3JvbGx3aGVlbCIsInN0cmVldFZpZXdDb250cm9sIiwiZ21hcmtlcnMiLCJpbml0TWFwIiwiY2xvc2VLckluZm93aW5kb3ciLCJjbG9zZSIsInNob3dWaXNpYmxlTWFya2VycyIsInNldFZpc2libGUiLCJjaGVja0R1cGxpY2F0ZSIsImN1cnJlbnQiLCJkdXBzIiwiZXF1YWxzIiwibmV3TGF0IiwibmV3TG5nIiwiY2hlY2tab29tIiwibXlsaXN0ZW5lciIsInNldFpvb20iLCJjbHVzdGVyTWFwIiwibWNPcHRpb25zIiwiZ3JpZFNpemUiLCJpZ25vcmVIaWRkZW5NYXJrZXJzIiwiaW1hZ2VQYXRoIiwic2V0UHJvcGVydHlNYXJrZXJzIiwic2V0TWFwTWFya2VycyIsImNyZWF0ZU1hcCIsIk1hcCIsIkluZm9XaW5kb3ciLCJjcmVhdGVNYXBNYXJrZXIiLCJwb2ludCIsImltYWdlIiwiYm94aW5mbyIsImxpbmsiLCJ0aXRsZSIsIk1hcmtlciIsInNoYXBlIiwiaWNvbiIsInpJbmRleCIsInNldENvbnRlbnQiLCJjcmVhdGVQcm9wZXJ0eU1hcmtlciIsImNvbG9yIiwibm90Iiwic2xpY2siLCJuZXh0QXJyb3ciLCJwcmV2QXJyb3ciLCJhdXRvcGxheSIsInNvbG9NYXAiLCJyZWZyZXNoTWFwIiwiJG1hcG1vZGFsIiwiYWxlcnQiLCJyZXNldE1hcCIsImFtYXJrIiwibWFya2VyaWNvbiIsIlNpemUiLCJQb2ludCIsImFuY2hvciIsIm15TGlzdGVuZXIiLCJmb3VuZCIsImN1cnJlbnRab29tIiwia2lja01hcCIsIm1hcF9tb2RhbCIsIiRzb2xvVHJpZ2dlciIsIm9uZSIsIiR0cmlnZ2VyIiwibXlLcnJvdXRlIiwiZGlyZWN0aW9uc0Rpc3BsYXkiLCJkaXJlY3Rpb25zVmlzaWJsZSIsInJvdXRlTWFwIiwiZGVzdGluYXRpb24iLCJyb3V0ZU1hcmtlcnMiLCJyb3V0ZVN0b3BQb2ludHMiLCJkZXRvdXIiLCJkaXJlY3Rpb25zUGFuZWwiLCJkaXJlY3Rpb25zU2VydmljZSIsIktycm91dGUiLCJEaXJlY3Rpb25zU2VydmljZSIsImNsZWFyUm91dGVNYXJrZXJzIiwiY2xlYXJXYXlwb2ludHMiLCJhZGRSb3V0ZU1hcmtlciIsImNhbGNSb3V0ZSIsImZyb21fYWRkcmVzcyIsIkRpcmVjdGlvbnNUcmF2ZWxNb2RlIiwiQklDWUNMSU5HIiwiRFJJVklORyIsIldBTEtJTkciLCJyZXF1ZXN0Iiwid2F5cG9pbnRzIiwidHJhdmVsTW9kZSIsImF2b2lkSGlnaHdheXMiLCJhdm9pZFRvbGxzIiwicm91dGUiLCJzdGF0dXMiLCJEaXJlY3Rpb25zU3RhdHVzIiwiT0siLCJzZXREaXJlY3Rpb25zIiwicmVzZXRSb3V0ZSIsIm15T3B0aW9ucyIsIkRpcmVjdGlvbnNSZW5kZXJlciIsInNldFBhbmVsIiwiTWFya2VySW1hZ2UiLCJsYXRMbmciLCJzdG9wb3ZlciIsImFkZExpc3RlbmVyT25jZSIsImRpcmVjdGlvblBhbmVsIiwiYWRkcmVzc1N0cmluZyIsImNvb3JkIiwiYWRkcmVzcyIsImpzb25kYXRhIiwibXlHbWFwIl0sInNvdXJjZVJvb3QiOiIifQ==