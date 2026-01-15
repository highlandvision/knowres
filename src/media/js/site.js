(self["webpackChunkkrdev"] = self["webpackChunkkrdev"] || []).push([["site"],{

/***/ "./node_modules/is-marker-clusterer/src/markerclusterer.js"
/*!*****************************************************************!*\
  !*** ./node_modules/is-marker-clusterer/src/markerclusterer.js ***!
  \*****************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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

/***/ },

/***/ "./node_modules/jquery-bar-rating/jquery.barrating.js"
/*!************************************************************!*\
  !*** ./node_modules/jquery-bar-rating/jquery.barrating.js ***!
  \************************************************************/
(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
  } else // removed by dead control flow
{}
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

/***/ },

/***/ "./pkg/kr/src/media/js/src/site/app.js"
/*!*********************************************!*\
  !*** ./pkg/kr/src/media/js/src/site/app.js ***!
  \*********************************************/
(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/* provided dependency */ var jQuery = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
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

/***/ },

/***/ "./pkg/kr/src/media/js/src/site/confirm.js"
/*!*************************************************!*\
  !*** ./pkg/kr/src/media/js/src/site/confirm.js ***!
  \*************************************************/
(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/* provided dependency */ var jQuery = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * @package    Know Reservations
 * @subpackage Site JS
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */



function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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

/***/ },

/***/ "./pkg/kr/src/media/js/src/site/dobentry.js"
/*!**************************************************!*\
  !*** ./pkg/kr/src/media/js/src/site/dobentry.js ***!
  \**************************************************/
(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/* provided dependency */ var jQuery = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * @package    Know Reservations
 * @subpackage Site JS
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */



function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
          date_obj.date = new Date(parseInt(date_obj.year, 10), parseInt(date_obj.month, 10) - 1, parseInt(date_obj.day, 10));
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

/***/ },

/***/ "./pkg/kr/src/media/js/src/site/guestdata.js"
/*!***************************************************!*\
  !*** ./pkg/kr/src/media/js/src/site/guestdata.js ***!
  \***************************************************/
(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/* provided dependency */ var jQuery = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
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

/***/ },

/***/ "./pkg/kr/src/media/js/src/site/magellan.js"
/*!**************************************************!*\
  !*** ./pkg/kr/src/media/js/src/site/magellan.js ***!
  \**************************************************/
(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/* provided dependency */ var jQuery = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
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
      ovChildren.slice(3).display = 'none';
      ovChildren.slice(ovPs - 1, ovPs).after('<div class="text-center"><a class="button hollow' + ' readmore overview-toggle">Read more...</a></div>');
      ovState = 'hidden';
    }
    ttChildren = $('.readmore-testimonials').children('p');
    ttPs = ttChildren.length;
    if (ttPs > 10) {
      ttChildren.slice(11).display = 'none';
      ttparas = document.querySelectorAll('.readmore-testimonials p[style*="display: none"]');
      doHRs(ttparas, 'hide');
      ttChildren.slice(ttPs - 1, ttPs).after('<a class="button hollow' + ' accent readmore testimonials-toggle">Read more...</a>');
      ttState = 'hidden';
    }
    fcChildren = $('.readmore-facilities').children('.rooms');
    if (fcChildren.length) {
      fcChildren.hide().after('<a class="button hollow' + ' accent readmore facilities-toggle">See all facilities...</a>');
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

/***/ },

/***/ "./pkg/kr/src/media/js/src/site/map.js"
/*!*********************************************!*\
  !*** ./pkg/kr/src/media/js/src/site/map.js ***!
  \*********************************************/
(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/* provided dependency */ var jQuery = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * @package    Know Reservations
 * @subpackage Site JS
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */



function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
              var newLat = pos.lat() + -.00002 * Math.cos(+a * dups / 180 * Math.PI); //x
              var newLng = pos.lng() + -.00000 * Math.sin(+a * dups / 180 * Math.PI); //Y
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
        if (this.settings.mapType === 'solo') return;
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
          this.createPropertyMarker(point, amark['html'], amark['boxinfo'], amark['link'], amark['title'], amark['color'], amark['id'], propertyicon, amark['pid']);
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

/***/ },

/***/ "./pkg/kr/src/media/js/src/site/route.js"
/*!***********************************************!*\
  !*** ./pkg/kr/src/media/js/src/site/route.js ***!
  \***********************************************/
(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/* provided dependency */ var jQuery = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * @package    Know Reservations
 * @subpackage Site JS
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */



function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
      var addressString = jQuery("#jform_property_street").val() + ", " + jQuery('#jform_town_id').find(":selected").text() + " " + jQuery("#jform_property_postcode").val() + ", " + jQuery('#jform_region_id').find(":selected").text() + " " + jQuery('#jform_country_id').find(":selected").text();
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

/***/ },

/***/ "./webpack.build.site.js"
/*!*******************************!*\
  !*** ./webpack.build.site.js ***!
  \*******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var npm_jquery_bar_rating_jquery_barrating__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! npm/jquery-bar-rating/jquery.barrating */ "./node_modules/jquery-bar-rating/jquery.barrating.js");
/* harmony import */ var npm_jquery_bar_rating_jquery_barrating__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(npm_jquery_bar_rating_jquery_barrating__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var npm_is_marker_clusterer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! npm/is-marker-clusterer */ "./node_modules/is-marker-clusterer/src/markerclusterer.js");
/* harmony import */ var npm_is_marker_clusterer__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(npm_is_marker_clusterer__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var mediajs_site_app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mediajs/site/app */ "./pkg/kr/src/media/js/src/site/app.js");
/* harmony import */ var mediajs_site_app__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(mediajs_site_app__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var mediajs_site_confirm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! mediajs/site/confirm */ "./pkg/kr/src/media/js/src/site/confirm.js");
/* harmony import */ var mediajs_site_confirm__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(mediajs_site_confirm__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var mediajs_site_dobentry__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! mediajs/site/dobentry */ "./pkg/kr/src/media/js/src/site/dobentry.js");
/* harmony import */ var mediajs_site_dobentry__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(mediajs_site_dobentry__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var mediajs_site_guestdata__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! mediajs/site/guestdata */ "./pkg/kr/src/media/js/src/site/guestdata.js");
/* harmony import */ var mediajs_site_guestdata__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(mediajs_site_guestdata__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var mediajs_site_magellan__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! mediajs/site/magellan */ "./pkg/kr/src/media/js/src/site/magellan.js");
/* harmony import */ var mediajs_site_magellan__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(mediajs_site_magellan__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var mediajs_site_map__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! mediajs/site/map */ "./pkg/kr/src/media/js/src/site/map.js");
/* harmony import */ var mediajs_site_map__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(mediajs_site_map__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var mediajs_site_route__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! mediajs/site/route */ "./pkg/kr/src/media/js/src/site/route.js");
/* harmony import */ var mediajs_site_route__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(mediajs_site_route__WEBPACK_IMPORTED_MODULE_8__);
// KR APP JS Files


//import 'npm/@googlemaps/markerclusterer';








/***/ }

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["common"], () => (__webpack_exec__("./webpack.build.site.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDK2QsUUFBUSxFQUFFLFVBQVVwZixHQUFHLEVBQUVLLEdBQUcsRUFBRTtZQUN6QyxJQUFJMkwsR0FBRyxHQUFHLEdBQUcsR0FBR2hNLEdBQUc7WUFDbkJ4QixNQUFNLENBQUN3TixHQUFHLENBQUMsQ0FBQzNMLEdBQUcsQ0FBQ0EsR0FBRyxDQUFDO1lBQ3BCNmUsS0FBSyxDQUFDbGYsR0FBRyxDQUFDLEdBQUdLLEdBQUc7WUFDaEJ5YyxRQUFRLENBQUN0QixVQUFVLENBQUMwRCxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUVBLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxLQUFLLENBQUM7VUFDdkQsQ0FBQyxDQUFDO1FBQ0g7TUFDRCxDQUFDLENBQUM7SUFDSCxDQUFDLENBQUM7RUFDSCxDQUFDLENBQUM7QUFDSCxDQUFDLEVBQUMxZ0IsTUFBTSxDQUFDLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JOVDtBQUNnRDtBQUNmO0FBQ2pDO0FBQzBCO0FBQ0k7QUFDQztBQUNDO0FBQ0Q7QUFDTCIsInNvdXJjZXMiOlsid2VicGFjazovL2tyZGV2Ly4vbm9kZV9tb2R1bGVzL2lzLW1hcmtlci1jbHVzdGVyZXIvc3JjL21hcmtlcmNsdXN0ZXJlci5qcyIsIndlYnBhY2s6Ly9rcmRldi8uL25vZGVfbW9kdWxlcy9qcXVlcnktYmFyLXJhdGluZy9qcXVlcnkuYmFycmF0aW5nLmpzIiwid2VicGFjazovL2tyZGV2Ly4vcGtnL2tyL3NyYy9tZWRpYS9qcy9zcmMvc2l0ZS9hcHAuanMiLCJ3ZWJwYWNrOi8va3JkZXYvLi9wa2cva3Ivc3JjL21lZGlhL2pzL3NyYy9zaXRlL2NvbmZpcm0uanMiLCJ3ZWJwYWNrOi8va3JkZXYvLi9wa2cva3Ivc3JjL21lZGlhL2pzL3NyYy9zaXRlL2RvYmVudHJ5LmpzIiwid2VicGFjazovL2tyZGV2Ly4vcGtnL2tyL3NyYy9tZWRpYS9qcy9zcmMvc2l0ZS9ndWVzdGRhdGEuanMiLCJ3ZWJwYWNrOi8va3JkZXYvLi9wa2cva3Ivc3JjL21lZGlhL2pzL3NyYy9zaXRlL21hZ2VsbGFuLmpzIiwid2VicGFjazovL2tyZGV2Ly4vcGtnL2tyL3NyYy9tZWRpYS9qcy9zcmMvc2l0ZS9tYXAuanMiLCJ3ZWJwYWNrOi8va3JkZXYvLi9wa2cva3Ivc3JjL21lZGlhL2pzL3NyYy9zaXRlL3JvdXRlLmpzIiwid2VicGFjazovL2tyZGV2Ly4vd2VicGFjay5idWlsZC5zaXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogTnBtIHZlcnNpb24gb2YgbWFya2VyQ2x1c3RlcmVyIHdvcmtzIGdyZWF0IHdpdGggYnJvd3NlcmlmeVxuICogRGlmZmVyZW5jZSBmcm9tIHRoZSBvcmlnaW5hbCAtIGFkZHMgYSBjb21tb25qcyBmb3JtYXQgYW5kIHJlcGxhY2VzIHdpbmRvdyB3aXRoIGdsb2JhbCBhbmQgc29tZSB1bml0IHRlc3RcbiAqIFRoZSBvcmlnaW5hbCBmdW5jdGlvbmFsaXR5IGl0J3Mgbm90IG1vZGlmaWVkIGZvciBkb2NzIGFuZCBvcmlnaW5hbCBzb3VyY2UgY2hlY2tcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9nb29nbGVtYXBzL2pzLW1hcmtlci1jbHVzdGVyZXJcbiAqL1xuXG4vKipcbiAqIEBuYW1lIE1hcmtlckNsdXN0ZXJlciBmb3IgR29vZ2xlIE1hcHMgdjNcbiAqIEB2ZXJzaW9uIHZlcnNpb24gMS4wXG4gKiBAYXV0aG9yIEx1a2UgTWFoZVxuICogQGZpbGVvdmVydmlld1xuICogVGhlIGxpYnJhcnkgY3JlYXRlcyBhbmQgbWFuYWdlcyBwZXItem9vbS1sZXZlbCBjbHVzdGVycyBmb3IgbGFyZ2UgYW1vdW50cyBvZlxuICogbWFya2Vycy5cbiAqIDxici8+XG4gKiBUaGlzIGlzIGEgdjMgaW1wbGVtZW50YXRpb24gb2YgdGhlXG4gKiA8YSBocmVmPVwiaHR0cDovL2dtYXBzLXV0aWxpdHktbGlicmFyeS1kZXYuZ29vZ2xlY29kZS5jb20vc3ZuL3RhZ3MvbWFya2VyY2x1c3RlcmVyL1wiXG4gKiA+djIgTWFya2VyQ2x1c3RlcmVyPC9hPi5cbiAqL1xuXG4vKipcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5cbi8qKlxuICogQSBNYXJrZXIgQ2x1c3RlcmVyIHRoYXQgY2x1c3RlcnMgbWFya2Vycy5cbiAqXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLk1hcH0gbWFwIFRoZSBHb29nbGUgbWFwIHRvIGF0dGFjaCB0by5cbiAqIEBwYXJhbSB7QXJyYXkuPGdvb2dsZS5tYXBzLk1hcmtlcj49fSBvcHRfbWFya2VycyBPcHRpb25hbCBtYXJrZXJzIHRvIGFkZCB0b1xuICogICB0aGUgY2x1c3Rlci5cbiAqIEBwYXJhbSB7T2JqZWN0PX0gb3B0X29wdGlvbnMgc3VwcG9ydCB0aGUgZm9sbG93aW5nIG9wdGlvbnM6XG4gKiAgICAgJ2dyaWRTaXplJzogKG51bWJlcikgVGhlIGdyaWQgc2l6ZSBvZiBhIGNsdXN0ZXIgaW4gcGl4ZWxzLlxuICogICAgICdtYXhab29tJzogKG51bWJlcikgVGhlIG1heGltdW0gem9vbSBsZXZlbCB0aGF0IGEgbWFya2VyIGNhbiBiZSBwYXJ0IG9mIGFcbiAqICAgICAgICAgICAgICAgIGNsdXN0ZXIuXG4gKiAgICAgJ3pvb21PbkNsaWNrJzogKGJvb2xlYW4pIFdoZXRoZXIgdGhlIGRlZmF1bHQgYmVoYXZpb3VyIG9mIGNsaWNraW5nIG9uIGFcbiAqICAgICAgICAgICAgICAgICAgICBjbHVzdGVyIGlzIHRvIHpvb20gaW50byBpdC5cbiAqICAgICAnYXZlcmFnZUNlbnRlcic6IChib29sZWFuKSBXZXRoZXIgdGhlIGNlbnRlciBvZiBlYWNoIGNsdXN0ZXIgc2hvdWxkIGJlXG4gKiAgICAgICAgICAgICAgICAgICAgICB0aGUgYXZlcmFnZSBvZiBhbGwgbWFya2VycyBpbiB0aGUgY2x1c3Rlci5cbiAqICAgICAnbWluaW11bUNsdXN0ZXJTaXplJzogKG51bWJlcikgVGhlIG1pbmltdW0gbnVtYmVyIG9mIG1hcmtlcnMgdG8gYmUgaW4gYVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICBjbHVzdGVyIGJlZm9yZSB0aGUgbWFya2VycyBhcmUgaGlkZGVuIGFuZCBhIGNvdW50XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzIHNob3duLlxuICogICAgICdzdHlsZXMnOiAob2JqZWN0KSBBbiBvYmplY3QgdGhhdCBoYXMgc3R5bGUgcHJvcGVydGllczpcbiAqICAgICAgICd1cmwnOiAoc3RyaW5nKSBUaGUgaW1hZ2UgdXJsLlxuICogICAgICAgJ2hlaWdodCc6IChudW1iZXIpIFRoZSBpbWFnZSBoZWlnaHQuXG4gKiAgICAgICAnd2lkdGgnOiAobnVtYmVyKSBUaGUgaW1hZ2Ugd2lkdGguXG4gKiAgICAgICAnYW5jaG9yJzogKEFycmF5KSBUaGUgYW5jaG9yIHBvc2l0aW9uIG9mIHRoZSBsYWJlbCB0ZXh0LlxuICogICAgICAgJ3RleHRDb2xvcic6IChzdHJpbmcpIFRoZSB0ZXh0IGNvbG9yLlxuICogICAgICAgJ3RleHRTaXplJzogKG51bWJlcikgVGhlIHRleHQgc2l6ZS5cbiAqICAgICAgICdmb250RmFtaWx5JzogKHN0cmluZykgVGhlIGZvbnQgZmFtaWx5LlxuICogICAgICAgJ2ZvbnRXZWlnaHQnOiAoc3RyaW5nKSBUaGUgZm9udCB3ZWlnaHQuXG4gKiAgICAgICAnYmFja2dyb3VuZFBvc2l0aW9uJzogKHN0cmluZykgVGhlIHBvc2l0aW9uIG9mIHRoZSBiYWNrZ291bmQgeCwgeS5cbiAqIEBjb25zdHJ1Y3RvclxuICogQGV4dGVuZHMgZ29vZ2xlLm1hcHMuT3ZlcmxheVZpZXdcbiAqL1xuZnVuY3Rpb24gTWFya2VyQ2x1c3RlcmVyKG1hcCwgb3B0X21hcmtlcnMsIG9wdF9vcHRpb25zKSB7XG4gIC8vIE1hcmtlckNsdXN0ZXJlciBpbXBsZW1lbnRzIGdvb2dsZS5tYXBzLk92ZXJsYXlWaWV3IGludGVyZmFjZS4gV2UgdXNlIHRoZVxuICAvLyBleHRlbmQgZnVuY3Rpb24gdG8gZXh0ZW5kIE1hcmtlckNsdXN0ZXJlciB3aXRoIGdvb2dsZS5tYXBzLk92ZXJsYXlWaWV3XG4gIC8vIGJlY2F1c2UgaXQgbWlnaHQgbm90IGFsd2F5cyBiZSBhdmFpbGFibGUgd2hlbiB0aGUgY29kZSBpcyBkZWZpbmVkIHNvIHdlXG4gIC8vIGxvb2sgZm9yIGl0IGF0IHRoZSBsYXN0IHBvc3NpYmxlIG1vbWVudC4gSWYgaXQgZG9lc24ndCBleGlzdCBub3cgdGhlblxuICAvLyB0aGVyZSBpcyBubyBwb2ludCBnb2luZyBhaGVhZCA6KVxuICB0aGlzLmV4dGVuZChNYXJrZXJDbHVzdGVyZXIsIGdvb2dsZS5tYXBzLk92ZXJsYXlWaWV3KTtcbiAgdGhpcy5tYXBfID0gbWFwO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7QXJyYXkuPGdvb2dsZS5tYXBzLk1hcmtlcj59XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICB0aGlzLm1hcmtlcnNfID0gW107XG5cbiAgLyoqXG4gICAqICBAdHlwZSB7QXJyYXkuPENsdXN0ZXI+fVxuICAgKi9cbiAgdGhpcy5jbHVzdGVyc18gPSBbXTtcblxuICB0aGlzLnNpemVzID0gWzUzLCA1NiwgNjYsIDc4LCA5MF07XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICB0aGlzLnN0eWxlc18gPSBbXTtcblxuICAvKipcbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICB0aGlzLnJlYWR5XyA9IGZhbHNlO1xuXG4gIHZhciBvcHRpb25zID0gb3B0X29wdGlvbnMgfHwge307XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICB0aGlzLmdyaWRTaXplXyA9IG9wdGlvbnNbJ2dyaWRTaXplJ10gfHwgNjA7XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICB0aGlzLm1pbkNsdXN0ZXJTaXplXyA9IG9wdGlvbnNbJ21pbmltdW1DbHVzdGVyU2l6ZSddIHx8IDI7XG5cblxuICAvKipcbiAgICogQHR5cGUgez9udW1iZXJ9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICB0aGlzLm1heFpvb21fID0gb3B0aW9uc1snbWF4Wm9vbSddIHx8IG51bGw7XG5cbiAgdGhpcy5zdHlsZXNfID0gb3B0aW9uc1snc3R5bGVzJ10gfHwgW107XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICB0aGlzLmltYWdlUGF0aF8gPSBvcHRpb25zWydpbWFnZVBhdGgnXSB8fFxuICAgICAgdGhpcy5NQVJLRVJfQ0xVU1RFUl9JTUFHRV9QQVRIXztcblxuICAvKipcbiAgICogQHR5cGUge3N0cmluZ31cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHRoaXMuaW1hZ2VFeHRlbnNpb25fID0gb3B0aW9uc1snaW1hZ2VFeHRlbnNpb24nXSB8fFxuICAgICAgdGhpcy5NQVJLRVJfQ0xVU1RFUl9JTUFHRV9FWFRFTlNJT05fO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHRoaXMuem9vbU9uQ2xpY2tfID0gdHJ1ZTtcblxuICBpZiAob3B0aW9uc1snem9vbU9uQ2xpY2snXSAhPSB1bmRlZmluZWQpIHtcbiAgICB0aGlzLnpvb21PbkNsaWNrXyA9IG9wdGlvbnNbJ3pvb21PbkNsaWNrJ107XG4gIH1cblxuICAvKipcbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICB0aGlzLmF2ZXJhZ2VDZW50ZXJfID0gZmFsc2U7XG5cbiAgaWYgKG9wdGlvbnNbJ2F2ZXJhZ2VDZW50ZXInXSAhPSB1bmRlZmluZWQpIHtcbiAgICB0aGlzLmF2ZXJhZ2VDZW50ZXJfID0gb3B0aW9uc1snYXZlcmFnZUNlbnRlciddO1xuICB9XG5cbiAgdGhpcy5zZXR1cFN0eWxlc18oKTtcblxuICB0aGlzLnNldE1hcChtYXApO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgdGhpcy5wcmV2Wm9vbV8gPSB0aGlzLm1hcF8uZ2V0Wm9vbSgpO1xuXG4gIC8vIEFkZCB0aGUgbWFwIGV2ZW50IGxpc3RlbmVyc1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKHRoaXMubWFwXywgJ3pvb21fY2hhbmdlZCcsIGZ1bmN0aW9uKCkge1xuICAgIHZhciB6b29tID0gdGhhdC5tYXBfLmdldFpvb20oKTtcblxuICAgIGlmICh0aGF0LnByZXZab29tXyAhPSB6b29tKSB7XG4gICAgICB0aGF0LnByZXZab29tXyA9IHpvb207XG4gICAgICB0aGF0LnJlc2V0Vmlld3BvcnQoKTtcbiAgICB9XG4gIH0pO1xuXG4gIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKHRoaXMubWFwXywgJ2lkbGUnLCBmdW5jdGlvbigpIHtcbiAgICB0aGF0LnJlZHJhdygpO1xuICB9KTtcblxuICAvLyBGaW5hbGx5LCBhZGQgdGhlIG1hcmtlcnNcbiAgaWYgKG9wdF9tYXJrZXJzICYmIG9wdF9tYXJrZXJzLmxlbmd0aCkge1xuICAgIHRoaXMuYWRkTWFya2VycyhvcHRfbWFya2VycywgZmFsc2UpO1xuICB9XG59XG5cblxuLyoqXG4gKiBUaGUgbWFya2VyIGNsdXN0ZXIgaW1hZ2UgcGF0aC5cbiAqXG4gKiBAdHlwZSB7c3RyaW5nfVxuICogQHByaXZhdGVcbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5NQVJLRVJfQ0xVU1RFUl9JTUFHRV9QQVRIXyA9XG4gICAgJ2h0dHA6Ly9nb29nbGUtbWFwcy11dGlsaXR5LWxpYnJhcnktdjMuZ29vZ2xlY29kZS5jb20vc3ZuL3RydW5rL21hcmtlcmNsdXN0ZXJlci8nICtcbiAgICAnaW1hZ2VzL20nO1xuXG5cbi8qKlxuICogVGhlIG1hcmtlciBjbHVzdGVyIGltYWdlIHBhdGguXG4gKlxuICogQHR5cGUge3N0cmluZ31cbiAqIEBwcml2YXRlXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuTUFSS0VSX0NMVVNURVJfSU1BR0VfRVhURU5TSU9OXyA9ICdwbmcnO1xuXG5cbi8qKlxuICogRXh0ZW5kcyBhIG9iamVjdHMgcHJvdG90eXBlIGJ5IGFub3RoZXJzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmoxIFRoZSBvYmplY3QgdG8gYmUgZXh0ZW5kZWQuXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqMiBUaGUgb2JqZWN0IHRvIGV4dGVuZCB3aXRoLlxuICogQHJldHVybiB7T2JqZWN0fSBUaGUgbmV3IGV4dGVuZGVkIG9iamVjdC5cbiAqIEBpZ25vcmVcbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5leHRlbmQgPSBmdW5jdGlvbihvYmoxLCBvYmoyKSB7XG4gIHJldHVybiAoZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgZm9yICh2YXIgcHJvcGVydHkgaW4gb2JqZWN0LnByb3RvdHlwZSkge1xuICAgICAgdGhpcy5wcm90b3R5cGVbcHJvcGVydHldID0gb2JqZWN0LnByb3RvdHlwZVtwcm9wZXJ0eV07XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9KS5hcHBseShvYmoxLCBbb2JqMl0pO1xufTtcblxuXG4vKipcbiAqIEltcGxlbWVudGFpb24gb2YgdGhlIGludGVyZmFjZSBtZXRob2QuXG4gKiBAaWdub3JlXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUub25BZGQgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5zZXRSZWFkeV8odHJ1ZSk7XG59O1xuXG4vKipcbiAqIEltcGxlbWVudGFpb24gb2YgdGhlIGludGVyZmFjZSBtZXRob2QuXG4gKiBAaWdub3JlXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZHJhdyA9IGZ1bmN0aW9uKCkge307XG5cbi8qKlxuICogU2V0cyB1cCB0aGUgc3R5bGVzIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnNldHVwU3R5bGVzXyA9IGZ1bmN0aW9uKCkge1xuICBpZiAodGhpcy5zdHlsZXNfLmxlbmd0aCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwLCBzaXplOyBzaXplID0gdGhpcy5zaXplc1tpXTsgaSsrKSB7XG4gICAgdGhpcy5zdHlsZXNfLnB1c2goe1xuICAgICAgdXJsOiB0aGlzLmltYWdlUGF0aF8gKyAoaSArIDEpICsgJy4nICsgdGhpcy5pbWFnZUV4dGVuc2lvbl8sXG4gICAgICBoZWlnaHQ6IHNpemUsXG4gICAgICB3aWR0aDogc2l6ZVxuICAgIH0pO1xuICB9XG59O1xuXG4vKipcbiAqICBGaXQgdGhlIG1hcCB0byB0aGUgYm91bmRzIG9mIHRoZSBtYXJrZXJzIGluIHRoZSBjbHVzdGVyZXIuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZml0TWFwVG9NYXJrZXJzID0gZnVuY3Rpb24oKSB7XG4gIHZhciBtYXJrZXJzID0gdGhpcy5nZXRNYXJrZXJzKCk7XG4gIHZhciBib3VuZHMgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nQm91bmRzKCk7XG4gIGZvciAodmFyIGkgPSAwLCBtYXJrZXI7IG1hcmtlciA9IG1hcmtlcnNbaV07IGkrKykge1xuICAgIGJvdW5kcy5leHRlbmQobWFya2VyLmdldFBvc2l0aW9uKCkpO1xuICB9XG5cbiAgdGhpcy5tYXBfLmZpdEJvdW5kcyhib3VuZHMpO1xufTtcblxuXG4vKipcbiAqICBTZXRzIHRoZSBzdHlsZXMuXG4gKlxuICogIEBwYXJhbSB7T2JqZWN0fSBzdHlsZXMgVGhlIHN0eWxlIHRvIHNldC5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5zZXRTdHlsZXMgPSBmdW5jdGlvbihzdHlsZXMpIHtcbiAgdGhpcy5zdHlsZXNfID0gc3R5bGVzO1xufTtcblxuXG4vKipcbiAqICBHZXRzIHRoZSBzdHlsZXMuXG4gKlxuICogIEByZXR1cm4ge09iamVjdH0gVGhlIHN0eWxlcyBvYmplY3QuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0U3R5bGVzID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnN0eWxlc187XG59O1xuXG5cbi8qKlxuICogV2hldGhlciB6b29tIG9uIGNsaWNrIGlzIHNldC5cbiAqXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIHpvb21PbkNsaWNrXyBpcyBzZXQuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuaXNab29tT25DbGljayA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy56b29tT25DbGlja187XG59O1xuXG4vKipcbiAqIFdoZXRoZXIgYXZlcmFnZSBjZW50ZXIgaXMgc2V0LlxuICpcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgYXZlcmFnZUNlbnRlcl8gaXMgc2V0LlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmlzQXZlcmFnZUNlbnRlciA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5hdmVyYWdlQ2VudGVyXztcbn07XG5cblxuLyoqXG4gKiAgUmV0dXJucyB0aGUgYXJyYXkgb2YgbWFya2VycyBpbiB0aGUgY2x1c3RlcmVyLlxuICpcbiAqICBAcmV0dXJuIHtBcnJheS48Z29vZ2xlLm1hcHMuTWFya2VyPn0gVGhlIG1hcmtlcnMuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0TWFya2VycyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5tYXJrZXJzXztcbn07XG5cblxuLyoqXG4gKiAgUmV0dXJucyB0aGUgbnVtYmVyIG9mIG1hcmtlcnMgaW4gdGhlIGNsdXN0ZXJlclxuICpcbiAqICBAcmV0dXJuIHtOdW1iZXJ9IFRoZSBudW1iZXIgb2YgbWFya2Vycy5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRUb3RhbE1hcmtlcnMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMubWFya2Vyc18ubGVuZ3RoO1xufTtcblxuXG4vKipcbiAqICBTZXRzIHRoZSBtYXggem9vbSBmb3IgdGhlIGNsdXN0ZXJlci5cbiAqXG4gKiAgQHBhcmFtIHtudW1iZXJ9IG1heFpvb20gVGhlIG1heCB6b29tIGxldmVsLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnNldE1heFpvb20gPSBmdW5jdGlvbihtYXhab29tKSB7XG4gIHRoaXMubWF4Wm9vbV8gPSBtYXhab29tO1xufTtcblxuXG4vKipcbiAqICBHZXRzIHRoZSBtYXggem9vbSBmb3IgdGhlIGNsdXN0ZXJlci5cbiAqXG4gKiAgQHJldHVybiB7bnVtYmVyfSBUaGUgbWF4IHpvb20gbGV2ZWwuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0TWF4Wm9vbSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5tYXhab29tXztcbn07XG5cblxuLyoqXG4gKiAgVGhlIGZ1bmN0aW9uIGZvciBjYWxjdWxhdGluZyB0aGUgY2x1c3RlciBpY29uIGltYWdlLlxuICpcbiAqICBAcGFyYW0ge0FycmF5Ljxnb29nbGUubWFwcy5NYXJrZXI+fSBtYXJrZXJzIFRoZSBtYXJrZXJzIGluIHRoZSBjbHVzdGVyZXIuXG4gKiAgQHBhcmFtIHtudW1iZXJ9IG51bVN0eWxlcyBUaGUgbnVtYmVyIG9mIHN0eWxlcyBhdmFpbGFibGUuXG4gKiAgQHJldHVybiB7T2JqZWN0fSBBIG9iamVjdCBwcm9wZXJ0aWVzOiAndGV4dCcgKHN0cmluZykgYW5kICdpbmRleCcgKG51bWJlcikuXG4gKiAgQHByaXZhdGVcbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5jYWxjdWxhdG9yXyA9IGZ1bmN0aW9uKG1hcmtlcnMsIG51bVN0eWxlcykge1xuICB2YXIgaW5kZXggPSAwO1xuICB2YXIgY291bnQgPSBtYXJrZXJzLmxlbmd0aDtcbiAgdmFyIGR2ID0gY291bnQ7XG4gIHdoaWxlIChkdiAhPT0gMCkge1xuICAgIGR2ID0gcGFyc2VJbnQoZHYgLyAxMCwgMTApO1xuICAgIGluZGV4Kys7XG4gIH1cblxuICBpbmRleCA9IE1hdGgubWluKGluZGV4LCBudW1TdHlsZXMpO1xuICByZXR1cm4ge1xuICAgIHRleHQ6IGNvdW50LFxuICAgIGluZGV4OiBpbmRleFxuICB9O1xufTtcblxuXG4vKipcbiAqIFNldCB0aGUgY2FsY3VsYXRvciBmdW5jdGlvbi5cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKEFycmF5LCBudW1iZXIpfSBjYWxjdWxhdG9yIFRoZSBmdW5jdGlvbiB0byBzZXQgYXMgdGhlXG4gKiAgICAgY2FsY3VsYXRvci4gVGhlIGZ1bmN0aW9uIHNob3VsZCByZXR1cm4gYSBvYmplY3QgcHJvcGVydGllczpcbiAqICAgICAndGV4dCcgKHN0cmluZykgYW5kICdpbmRleCcgKG51bWJlcikuXG4gKlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnNldENhbGN1bGF0b3IgPSBmdW5jdGlvbihjYWxjdWxhdG9yKSB7XG4gIHRoaXMuY2FsY3VsYXRvcl8gPSBjYWxjdWxhdG9yO1xufTtcblxuXG4vKipcbiAqIEdldCB0aGUgY2FsY3VsYXRvciBmdW5jdGlvbi5cbiAqXG4gKiBAcmV0dXJuIHtmdW5jdGlvbihBcnJheSwgbnVtYmVyKX0gdGhlIGNhbGN1bGF0b3IgZnVuY3Rpb24uXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0Q2FsY3VsYXRvciA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5jYWxjdWxhdG9yXztcbn07XG5cblxuLyoqXG4gKiBBZGQgYW4gYXJyYXkgb2YgbWFya2VycyB0byB0aGUgY2x1c3RlcmVyLlxuICpcbiAqIEBwYXJhbSB7QXJyYXkuPGdvb2dsZS5tYXBzLk1hcmtlcj59IG1hcmtlcnMgVGhlIG1hcmtlcnMgdG8gYWRkLlxuICogQHBhcmFtIHtib29sZWFuPX0gb3B0X25vZHJhdyBXaGV0aGVyIHRvIHJlZHJhdyB0aGUgY2x1c3RlcnMuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuYWRkTWFya2VycyA9IGZ1bmN0aW9uKG1hcmtlcnMsIG9wdF9ub2RyYXcpIHtcbiAgZm9yICh2YXIgaSA9IDAsIG1hcmtlcjsgbWFya2VyID0gbWFya2Vyc1tpXTsgaSsrKSB7XG4gICAgdGhpcy5wdXNoTWFya2VyVG9fKG1hcmtlcik7XG4gIH1cbiAgaWYgKCFvcHRfbm9kcmF3KSB7XG4gICAgdGhpcy5yZWRyYXcoKTtcbiAgfVxufTtcblxuXG4vKipcbiAqIFB1c2hlcyBhIG1hcmtlciB0byB0aGUgY2x1c3RlcmVyLlxuICpcbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTWFya2VyfSBtYXJrZXIgVGhlIG1hcmtlciB0byBhZGQuXG4gKiBAcHJpdmF0ZVxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnB1c2hNYXJrZXJUb18gPSBmdW5jdGlvbihtYXJrZXIpIHtcbiAgbWFya2VyLmlzQWRkZWQgPSBmYWxzZTtcbiAgaWYgKG1hcmtlclsnZHJhZ2dhYmxlJ10pIHtcbiAgICAvLyBJZiB0aGUgbWFya2VyIGlzIGRyYWdnYWJsZSBhZGQgYSBsaXN0ZW5lciBzbyB3ZSB1cGRhdGUgdGhlIGNsdXN0ZXJzIG9uXG4gICAgLy8gdGhlIGRyYWcgZW5kLlxuICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYXJrZXIsICdkcmFnZW5kJywgZnVuY3Rpb24oKSB7XG4gICAgICBtYXJrZXIuaXNBZGRlZCA9IGZhbHNlO1xuICAgICAgdGhhdC5yZXBhaW50KCk7XG4gICAgfSk7XG4gIH1cbiAgdGhpcy5tYXJrZXJzXy5wdXNoKG1hcmtlcik7XG59O1xuXG5cbi8qKlxuICogQWRkcyBhIG1hcmtlciB0byB0aGUgY2x1c3RlcmVyIGFuZCByZWRyYXdzIGlmIG5lZWRlZC5cbiAqXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLk1hcmtlcn0gbWFya2VyIFRoZSBtYXJrZXIgdG8gYWRkLlxuICogQHBhcmFtIHtib29sZWFuPX0gb3B0X25vZHJhdyBXaGV0aGVyIHRvIHJlZHJhdyB0aGUgY2x1c3RlcnMuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuYWRkTWFya2VyID0gZnVuY3Rpb24obWFya2VyLCBvcHRfbm9kcmF3KSB7XG4gIHRoaXMucHVzaE1hcmtlclRvXyhtYXJrZXIpO1xuICBpZiAoIW9wdF9ub2RyYXcpIHtcbiAgICB0aGlzLnJlZHJhdygpO1xuICB9XG59O1xuXG5cbi8qKlxuICogUmVtb3ZlcyBhIG1hcmtlciBhbmQgcmV0dXJucyB0cnVlIGlmIHJlbW92ZWQsIGZhbHNlIGlmIG5vdFxuICpcbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTWFya2VyfSBtYXJrZXIgVGhlIG1hcmtlciB0byByZW1vdmVcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFdoZXRoZXIgdGhlIG1hcmtlciB3YXMgcmVtb3ZlZCBvciBub3RcbiAqIEBwcml2YXRlXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUucmVtb3ZlTWFya2VyXyA9IGZ1bmN0aW9uKG1hcmtlcikge1xuICB2YXIgaW5kZXggPSAtMTtcbiAgaWYgKHRoaXMubWFya2Vyc18uaW5kZXhPZikge1xuICAgIGluZGV4ID0gdGhpcy5tYXJrZXJzXy5pbmRleE9mKG1hcmtlcik7XG4gIH0gZWxzZSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIG07IG0gPSB0aGlzLm1hcmtlcnNfW2ldOyBpKyspIHtcbiAgICAgIGlmIChtID09IG1hcmtlcikge1xuICAgICAgICBpbmRleCA9IGk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmIChpbmRleCA9PSAtMSkge1xuICAgIC8vIE1hcmtlciBpcyBub3QgaW4gb3VyIGxpc3Qgb2YgbWFya2Vycy5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBtYXJrZXIuc2V0TWFwKG51bGwpO1xuXG4gIHRoaXMubWFya2Vyc18uc3BsaWNlKGluZGV4LCAxKTtcblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cblxuLyoqXG4gKiBSZW1vdmUgYSBtYXJrZXIgZnJvbSB0aGUgY2x1c3Rlci5cbiAqXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLk1hcmtlcn0gbWFya2VyIFRoZSBtYXJrZXIgdG8gcmVtb3ZlLlxuICogQHBhcmFtIHtib29sZWFuPX0gb3B0X25vZHJhdyBPcHRpb25hbCBib29sZWFuIHRvIGZvcmNlIG5vIHJlZHJhdy5cbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdGhlIG1hcmtlciB3YXMgcmVtb3ZlZC5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5yZW1vdmVNYXJrZXIgPSBmdW5jdGlvbihtYXJrZXIsIG9wdF9ub2RyYXcpIHtcbiAgdmFyIHJlbW92ZWQgPSB0aGlzLnJlbW92ZU1hcmtlcl8obWFya2VyKTtcblxuICBpZiAoIW9wdF9ub2RyYXcgJiYgcmVtb3ZlZCkge1xuICAgIHRoaXMucmVzZXRWaWV3cG9ydCgpO1xuICAgIHRoaXMucmVkcmF3KCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSB7XG4gICByZXR1cm4gZmFsc2U7XG4gIH1cbn07XG5cblxuLyoqXG4gKiBSZW1vdmVzIGFuIGFycmF5IG9mIG1hcmtlcnMgZnJvbSB0aGUgY2x1c3Rlci5cbiAqXG4gKiBAcGFyYW0ge0FycmF5Ljxnb29nbGUubWFwcy5NYXJrZXI+fSBtYXJrZXJzIFRoZSBtYXJrZXJzIHRvIHJlbW92ZS5cbiAqIEBwYXJhbSB7Ym9vbGVhbj19IG9wdF9ub2RyYXcgT3B0aW9uYWwgYm9vbGVhbiB0byBmb3JjZSBubyByZWRyYXcuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUucmVtb3ZlTWFya2VycyA9IGZ1bmN0aW9uKG1hcmtlcnMsIG9wdF9ub2RyYXcpIHtcbiAgdmFyIHJlbW92ZWQgPSBmYWxzZTtcblxuICBmb3IgKHZhciBpID0gMCwgbWFya2VyOyBtYXJrZXIgPSBtYXJrZXJzW2ldOyBpKyspIHtcbiAgICB2YXIgciA9IHRoaXMucmVtb3ZlTWFya2VyXyhtYXJrZXIpO1xuICAgIHJlbW92ZWQgPSByZW1vdmVkIHx8IHI7XG4gIH1cblxuICBpZiAoIW9wdF9ub2RyYXcgJiYgcmVtb3ZlZCkge1xuICAgIHRoaXMucmVzZXRWaWV3cG9ydCgpO1xuICAgIHRoaXMucmVkcmF3KCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG5cblxuLyoqXG4gKiBTZXRzIHRoZSBjbHVzdGVyZXIncyByZWFkeSBzdGF0ZS5cbiAqXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHJlYWR5IFRoZSBzdGF0ZS5cbiAqIEBwcml2YXRlXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuc2V0UmVhZHlfID0gZnVuY3Rpb24ocmVhZHkpIHtcbiAgaWYgKCF0aGlzLnJlYWR5Xykge1xuICAgIHRoaXMucmVhZHlfID0gcmVhZHk7XG4gICAgdGhpcy5jcmVhdGVDbHVzdGVyc18oKTtcbiAgfVxufTtcblxuXG4vKipcbiAqIFJldHVybnMgdGhlIG51bWJlciBvZiBjbHVzdGVycyBpbiB0aGUgY2x1c3RlcmVyLlxuICpcbiAqIEByZXR1cm4ge251bWJlcn0gVGhlIG51bWJlciBvZiBjbHVzdGVycy5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRUb3RhbENsdXN0ZXJzID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmNsdXN0ZXJzXy5sZW5ndGg7XG59O1xuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgZ29vZ2xlIG1hcCB0aGF0IHRoZSBjbHVzdGVyZXIgaXMgYXNzb2NpYXRlZCB3aXRoLlxuICpcbiAqIEByZXR1cm4ge2dvb2dsZS5tYXBzLk1hcH0gVGhlIG1hcC5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRNYXAgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMubWFwXztcbn07XG5cblxuLyoqXG4gKiBTZXRzIHRoZSBnb29nbGUgbWFwIHRoYXQgdGhlIGNsdXN0ZXJlciBpcyBhc3NvY2lhdGVkIHdpdGguXG4gKlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5NYXB9IG1hcCBUaGUgbWFwLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnNldE1hcCA9IGZ1bmN0aW9uKG1hcCkge1xuICB0aGlzLm1hcF8gPSBtYXA7XG59O1xuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgc2l6ZSBvZiB0aGUgZ3JpZC5cbiAqXG4gKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSBncmlkIHNpemUuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0R3JpZFNpemUgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuZ3JpZFNpemVfO1xufTtcblxuXG4vKipcbiAqIFNldHMgdGhlIHNpemUgb2YgdGhlIGdyaWQuXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IHNpemUgVGhlIGdyaWQgc2l6ZS5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5zZXRHcmlkU2l6ZSA9IGZ1bmN0aW9uKHNpemUpIHtcbiAgdGhpcy5ncmlkU2l6ZV8gPSBzaXplO1xufTtcblxuXG4vKipcbiAqIFJldHVybnMgdGhlIG1pbiBjbHVzdGVyIHNpemUuXG4gKlxuICogQHJldHVybiB7bnVtYmVyfSBUaGUgZ3JpZCBzaXplLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldE1pbkNsdXN0ZXJTaXplID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLm1pbkNsdXN0ZXJTaXplXztcbn07XG5cbi8qKlxuICogU2V0cyB0aGUgbWluIGNsdXN0ZXIgc2l6ZS5cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gc2l6ZSBUaGUgZ3JpZCBzaXplLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnNldE1pbkNsdXN0ZXJTaXplID0gZnVuY3Rpb24oc2l6ZSkge1xuICB0aGlzLm1pbkNsdXN0ZXJTaXplXyA9IHNpemU7XG59O1xuXG5cbi8qKlxuICogRXh0ZW5kcyBhIGJvdW5kcyBvYmplY3QgYnkgdGhlIGdyaWQgc2l6ZS5cbiAqXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLkxhdExuZ0JvdW5kc30gYm91bmRzIFRoZSBib3VuZHMgdG8gZXh0ZW5kLlxuICogQHJldHVybiB7Z29vZ2xlLm1hcHMuTGF0TG5nQm91bmRzfSBUaGUgZXh0ZW5kZWQgYm91bmRzLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldEV4dGVuZGVkQm91bmRzID0gZnVuY3Rpb24oYm91bmRzKSB7XG4gIHZhciBwcm9qZWN0aW9uID0gdGhpcy5nZXRQcm9qZWN0aW9uKCk7XG5cbiAgLy8gVHVybiB0aGUgYm91bmRzIGludG8gbGF0bG5nLlxuICB2YXIgdHIgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKGJvdW5kcy5nZXROb3J0aEVhc3QoKS5sYXQoKSxcbiAgICAgIGJvdW5kcy5nZXROb3J0aEVhc3QoKS5sbmcoKSk7XG4gIHZhciBibCA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoYm91bmRzLmdldFNvdXRoV2VzdCgpLmxhdCgpLFxuICAgICAgYm91bmRzLmdldFNvdXRoV2VzdCgpLmxuZygpKTtcblxuICAvLyBDb252ZXJ0IHRoZSBwb2ludHMgdG8gcGl4ZWxzIGFuZCB0aGUgZXh0ZW5kIG91dCBieSB0aGUgZ3JpZCBzaXplLlxuICB2YXIgdHJQaXggPSBwcm9qZWN0aW9uLmZyb21MYXRMbmdUb0RpdlBpeGVsKHRyKTtcbiAgdHJQaXgueCArPSB0aGlzLmdyaWRTaXplXztcbiAgdHJQaXgueSAtPSB0aGlzLmdyaWRTaXplXztcblxuICB2YXIgYmxQaXggPSBwcm9qZWN0aW9uLmZyb21MYXRMbmdUb0RpdlBpeGVsKGJsKTtcbiAgYmxQaXgueCAtPSB0aGlzLmdyaWRTaXplXztcbiAgYmxQaXgueSArPSB0aGlzLmdyaWRTaXplXztcblxuICAvLyBDb252ZXJ0IHRoZSBwaXhlbCBwb2ludHMgYmFjayB0byBMYXRMbmdcbiAgdmFyIG5lID0gcHJvamVjdGlvbi5mcm9tRGl2UGl4ZWxUb0xhdExuZyh0clBpeCk7XG4gIHZhciBzdyA9IHByb2plY3Rpb24uZnJvbURpdlBpeGVsVG9MYXRMbmcoYmxQaXgpO1xuXG4gIC8vIEV4dGVuZCB0aGUgYm91bmRzIHRvIGNvbnRhaW4gdGhlIG5ldyBib3VuZHMuXG4gIGJvdW5kcy5leHRlbmQobmUpO1xuICBib3VuZHMuZXh0ZW5kKHN3KTtcblxuICByZXR1cm4gYm91bmRzO1xufTtcblxuXG4vKipcbiAqIERldGVybWlucyBpZiBhIG1hcmtlciBpcyBjb250YWluZWQgaW4gYSBib3VuZHMuXG4gKlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5NYXJrZXJ9IG1hcmtlciBUaGUgbWFya2VyIHRvIGNoZWNrLlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5MYXRMbmdCb3VuZHN9IGJvdW5kcyBUaGUgYm91bmRzIHRvIGNoZWNrIGFnYWluc3QuXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIHRoZSBtYXJrZXIgaXMgaW4gdGhlIGJvdW5kcy5cbiAqIEBwcml2YXRlXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuaXNNYXJrZXJJbkJvdW5kc18gPSBmdW5jdGlvbihtYXJrZXIsIGJvdW5kcykge1xuICByZXR1cm4gYm91bmRzLmNvbnRhaW5zKG1hcmtlci5nZXRQb3NpdGlvbigpKTtcbn07XG5cblxuLyoqXG4gKiBDbGVhcnMgYWxsIGNsdXN0ZXJzIGFuZCBtYXJrZXJzIGZyb20gdGhlIGNsdXN0ZXJlci5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5jbGVhck1hcmtlcnMgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5yZXNldFZpZXdwb3J0KHRydWUpO1xuXG4gIC8vIFNldCB0aGUgbWFya2VycyBhIGVtcHR5IGFycmF5LlxuICB0aGlzLm1hcmtlcnNfID0gW107XG59O1xuXG5cbi8qKlxuICogQ2xlYXJzIGFsbCBleGlzdGluZyBjbHVzdGVycyBhbmQgcmVjcmVhdGVzIHRoZW0uXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdF9oaWRlIFRvIGFsc28gaGlkZSB0aGUgbWFya2VyLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnJlc2V0Vmlld3BvcnQgPSBmdW5jdGlvbihvcHRfaGlkZSkge1xuICAvLyBSZW1vdmUgYWxsIHRoZSBjbHVzdGVyc1xuICBmb3IgKHZhciBpID0gMCwgY2x1c3RlcjsgY2x1c3RlciA9IHRoaXMuY2x1c3RlcnNfW2ldOyBpKyspIHtcbiAgICBjbHVzdGVyLnJlbW92ZSgpO1xuICB9XG5cbiAgLy8gUmVzZXQgdGhlIG1hcmtlcnMgdG8gbm90IGJlIGFkZGVkIGFuZCB0byBiZSBpbnZpc2libGUuXG4gIGZvciAodmFyIGkgPSAwLCBtYXJrZXI7IG1hcmtlciA9IHRoaXMubWFya2Vyc19baV07IGkrKykge1xuICAgIG1hcmtlci5pc0FkZGVkID0gZmFsc2U7XG4gICAgaWYgKG9wdF9oaWRlKSB7XG4gICAgICBtYXJrZXIuc2V0TWFwKG51bGwpO1xuICAgIH1cbiAgfVxuXG4gIHRoaXMuY2x1c3RlcnNfID0gW107XG59O1xuXG4vKipcbiAqXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUucmVwYWludCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgb2xkQ2x1c3RlcnMgPSB0aGlzLmNsdXN0ZXJzXy5zbGljZSgpO1xuICB0aGlzLmNsdXN0ZXJzXy5sZW5ndGggPSAwO1xuICB0aGlzLnJlc2V0Vmlld3BvcnQoKTtcbiAgdGhpcy5yZWRyYXcoKTtcblxuICAvLyBSZW1vdmUgdGhlIG9sZCBjbHVzdGVycy5cbiAgLy8gRG8gaXQgaW4gYSB0aW1lb3V0IHNvIHRoZSBvdGhlciBjbHVzdGVycyBoYXZlIGJlZW4gZHJhd24gZmlyc3QuXG4gIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgIGZvciAodmFyIGkgPSAwLCBjbHVzdGVyOyBjbHVzdGVyID0gb2xkQ2x1c3RlcnNbaV07IGkrKykge1xuICAgICAgY2x1c3Rlci5yZW1vdmUoKTtcbiAgICB9XG4gIH0sIDApO1xufTtcblxuXG4vKipcbiAqIFJlZHJhd3MgdGhlIGNsdXN0ZXJzLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnJlZHJhdyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmNyZWF0ZUNsdXN0ZXJzXygpO1xufTtcblxuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGRpc3RhbmNlIGJldHdlZW4gdHdvIGxhdGxuZyBsb2NhdGlvbnMgaW4ga20uXG4gKiBAc2VlIGh0dHA6Ly93d3cubW92YWJsZS10eXBlLmNvLnVrL3NjcmlwdHMvbGF0bG9uZy5odG1sXG4gKlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5MYXRMbmd9IHAxIFRoZSBmaXJzdCBsYXQgbG5nIHBvaW50LlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5MYXRMbmd9IHAyIFRoZSBzZWNvbmQgbGF0IGxuZyBwb2ludC5cbiAqIEByZXR1cm4ge251bWJlcn0gVGhlIGRpc3RhbmNlIGJldHdlZW4gdGhlIHR3byBwb2ludHMgaW4ga20uXG4gKiBAcHJpdmF0ZVxuKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZGlzdGFuY2VCZXR3ZWVuUG9pbnRzXyA9IGZ1bmN0aW9uKHAxLCBwMikge1xuICBpZiAoIXAxIHx8ICFwMikge1xuICAgIHJldHVybiAwO1xuICB9XG5cbiAgdmFyIFIgPSA2MzcxOyAvLyBSYWRpdXMgb2YgdGhlIEVhcnRoIGluIGttXG4gIHZhciBkTGF0ID0gKHAyLmxhdCgpIC0gcDEubGF0KCkpICogTWF0aC5QSSAvIDE4MDtcbiAgdmFyIGRMb24gPSAocDIubG5nKCkgLSBwMS5sbmcoKSkgKiBNYXRoLlBJIC8gMTgwO1xuICB2YXIgYSA9IE1hdGguc2luKGRMYXQgLyAyKSAqIE1hdGguc2luKGRMYXQgLyAyKSArXG4gICAgTWF0aC5jb3MocDEubGF0KCkgKiBNYXRoLlBJIC8gMTgwKSAqIE1hdGguY29zKHAyLmxhdCgpICogTWF0aC5QSSAvIDE4MCkgKlxuICAgIE1hdGguc2luKGRMb24gLyAyKSAqIE1hdGguc2luKGRMb24gLyAyKTtcbiAgdmFyIGMgPSAyICogTWF0aC5hdGFuMihNYXRoLnNxcnQoYSksIE1hdGguc3FydCgxIC0gYSkpO1xuICB2YXIgZCA9IFIgKiBjO1xuICByZXR1cm4gZDtcbn07XG5cblxuLyoqXG4gKiBBZGQgYSBtYXJrZXIgdG8gYSBjbHVzdGVyLCBvciBjcmVhdGVzIGEgbmV3IGNsdXN0ZXIuXG4gKlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5NYXJrZXJ9IG1hcmtlciBUaGUgbWFya2VyIHRvIGFkZC5cbiAqIEBwcml2YXRlXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuYWRkVG9DbG9zZXN0Q2x1c3Rlcl8gPSBmdW5jdGlvbihtYXJrZXIpIHtcbiAgdmFyIGRpc3RhbmNlID0gNDAwMDA7IC8vIFNvbWUgbGFyZ2UgbnVtYmVyXG4gIHZhciBjbHVzdGVyVG9BZGRUbyA9IG51bGw7XG4gIHZhciBwb3MgPSBtYXJrZXIuZ2V0UG9zaXRpb24oKTtcbiAgZm9yICh2YXIgaSA9IDAsIGNsdXN0ZXI7IGNsdXN0ZXIgPSB0aGlzLmNsdXN0ZXJzX1tpXTsgaSsrKSB7XG4gICAgdmFyIGNlbnRlciA9IGNsdXN0ZXIuZ2V0Q2VudGVyKCk7XG4gICAgaWYgKGNlbnRlcikge1xuICAgICAgdmFyIGQgPSB0aGlzLmRpc3RhbmNlQmV0d2VlblBvaW50c18oY2VudGVyLCBtYXJrZXIuZ2V0UG9zaXRpb24oKSk7XG4gICAgICBpZiAoZCA8IGRpc3RhbmNlKSB7XG4gICAgICAgIGRpc3RhbmNlID0gZDtcbiAgICAgICAgY2x1c3RlclRvQWRkVG8gPSBjbHVzdGVyO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmIChjbHVzdGVyVG9BZGRUbyAmJiBjbHVzdGVyVG9BZGRUby5pc01hcmtlckluQ2x1c3RlckJvdW5kcyhtYXJrZXIpKSB7XG4gICAgY2x1c3RlclRvQWRkVG8uYWRkTWFya2VyKG1hcmtlcik7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGNsdXN0ZXIgPSBuZXcgQ2x1c3Rlcih0aGlzKTtcbiAgICBjbHVzdGVyLmFkZE1hcmtlcihtYXJrZXIpO1xuICAgIHRoaXMuY2x1c3RlcnNfLnB1c2goY2x1c3Rlcik7XG4gIH1cbn07XG5cblxuLyoqXG4gKiBDcmVhdGVzIHRoZSBjbHVzdGVycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmNyZWF0ZUNsdXN0ZXJzXyA9IGZ1bmN0aW9uKCkge1xuICBpZiAoIXRoaXMucmVhZHlfKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gR2V0IG91ciBjdXJyZW50IG1hcCB2aWV3IGJvdW5kcy5cbiAgLy8gQ3JlYXRlIGEgbmV3IGJvdW5kcyBvYmplY3Qgc28gd2UgZG9uJ3QgYWZmZWN0IHRoZSBtYXAuXG4gIHZhciBtYXBCb3VuZHMgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nQm91bmRzKHRoaXMubWFwXy5nZXRCb3VuZHMoKS5nZXRTb3V0aFdlc3QoKSxcbiAgICAgIHRoaXMubWFwXy5nZXRCb3VuZHMoKS5nZXROb3J0aEVhc3QoKSk7XG4gIHZhciBib3VuZHMgPSB0aGlzLmdldEV4dGVuZGVkQm91bmRzKG1hcEJvdW5kcyk7XG5cbiAgZm9yICh2YXIgaSA9IDAsIG1hcmtlcjsgbWFya2VyID0gdGhpcy5tYXJrZXJzX1tpXTsgaSsrKSB7XG4gICAgaWYgKCFtYXJrZXIuaXNBZGRlZCAmJiB0aGlzLmlzTWFya2VySW5Cb3VuZHNfKG1hcmtlciwgYm91bmRzKSkge1xuICAgICAgdGhpcy5hZGRUb0Nsb3Nlc3RDbHVzdGVyXyhtYXJrZXIpO1xuICAgIH1cbiAgfVxufTtcblxuXG4vKipcbiAqIEEgY2x1c3RlciB0aGF0IGNvbnRhaW5zIG1hcmtlcnMuXG4gKlxuICogQHBhcmFtIHtNYXJrZXJDbHVzdGVyZXJ9IG1hcmtlckNsdXN0ZXJlciBUaGUgbWFya2VyY2x1c3RlcmVyIHRoYXQgdGhpc1xuICogICAgIGNsdXN0ZXIgaXMgYXNzb2NpYXRlZCB3aXRoLlxuICogQGNvbnN0cnVjdG9yXG4gKiBAaWdub3JlXG4gKi9cbmZ1bmN0aW9uIENsdXN0ZXIobWFya2VyQ2x1c3RlcmVyKSB7XG4gIHRoaXMubWFya2VyQ2x1c3RlcmVyXyA9IG1hcmtlckNsdXN0ZXJlcjtcbiAgdGhpcy5tYXBfID0gbWFya2VyQ2x1c3RlcmVyLmdldE1hcCgpO1xuICB0aGlzLmdyaWRTaXplXyA9IG1hcmtlckNsdXN0ZXJlci5nZXRHcmlkU2l6ZSgpO1xuICB0aGlzLm1pbkNsdXN0ZXJTaXplXyA9IG1hcmtlckNsdXN0ZXJlci5nZXRNaW5DbHVzdGVyU2l6ZSgpO1xuICB0aGlzLmF2ZXJhZ2VDZW50ZXJfID0gbWFya2VyQ2x1c3RlcmVyLmlzQXZlcmFnZUNlbnRlcigpO1xuICB0aGlzLmNlbnRlcl8gPSBudWxsO1xuICB0aGlzLm1hcmtlcnNfID0gW107XG4gIHRoaXMuYm91bmRzXyA9IG51bGw7XG4gIHRoaXMuY2x1c3Rlckljb25fID0gbmV3IENsdXN0ZXJJY29uKHRoaXMsIG1hcmtlckNsdXN0ZXJlci5nZXRTdHlsZXMoKSxcbiAgICAgIG1hcmtlckNsdXN0ZXJlci5nZXRHcmlkU2l6ZSgpKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbnMgaWYgYSBtYXJrZXIgaXMgYWxyZWFkeSBhZGRlZCB0byB0aGUgY2x1c3Rlci5cbiAqXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLk1hcmtlcn0gbWFya2VyIFRoZSBtYXJrZXIgdG8gY2hlY2suXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIHRoZSBtYXJrZXIgaXMgYWxyZWFkeSBhZGRlZC5cbiAqL1xuQ2x1c3Rlci5wcm90b3R5cGUuaXNNYXJrZXJBbHJlYWR5QWRkZWQgPSBmdW5jdGlvbihtYXJrZXIpIHtcbiAgaWYgKHRoaXMubWFya2Vyc18uaW5kZXhPZikge1xuICAgIHJldHVybiB0aGlzLm1hcmtlcnNfLmluZGV4T2YobWFya2VyKSAhPSAtMTtcbiAgfSBlbHNlIHtcbiAgICBmb3IgKHZhciBpID0gMCwgbTsgbSA9IHRoaXMubWFya2Vyc19baV07IGkrKykge1xuICAgICAgaWYgKG0gPT0gbWFya2VyKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59O1xuXG5cbi8qKlxuICogQWRkIGEgbWFya2VyIHRoZSBjbHVzdGVyLlxuICpcbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTWFya2VyfSBtYXJrZXIgVGhlIG1hcmtlciB0byBhZGQuXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIHRoZSBtYXJrZXIgd2FzIGFkZGVkLlxuICovXG5DbHVzdGVyLnByb3RvdHlwZS5hZGRNYXJrZXIgPSBmdW5jdGlvbihtYXJrZXIpIHtcbiAgaWYgKHRoaXMuaXNNYXJrZXJBbHJlYWR5QWRkZWQobWFya2VyKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmICghdGhpcy5jZW50ZXJfKSB7XG4gICAgdGhpcy5jZW50ZXJfID0gbWFya2VyLmdldFBvc2l0aW9uKCk7XG4gICAgdGhpcy5jYWxjdWxhdGVCb3VuZHNfKCk7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHRoaXMuYXZlcmFnZUNlbnRlcl8pIHtcbiAgICAgIHZhciBsID0gdGhpcy5tYXJrZXJzXy5sZW5ndGggKyAxO1xuICAgICAgdmFyIGxhdCA9ICh0aGlzLmNlbnRlcl8ubGF0KCkgKiAobC0xKSArIG1hcmtlci5nZXRQb3NpdGlvbigpLmxhdCgpKSAvIGw7XG4gICAgICB2YXIgbG5nID0gKHRoaXMuY2VudGVyXy5sbmcoKSAqIChsLTEpICsgbWFya2VyLmdldFBvc2l0aW9uKCkubG5nKCkpIC8gbDtcbiAgICAgIHRoaXMuY2VudGVyXyA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmcobGF0LCBsbmcpO1xuICAgICAgdGhpcy5jYWxjdWxhdGVCb3VuZHNfKCk7XG4gICAgfVxuICB9XG5cbiAgbWFya2VyLmlzQWRkZWQgPSB0cnVlO1xuICB0aGlzLm1hcmtlcnNfLnB1c2gobWFya2VyKTtcblxuICB2YXIgbGVuID0gdGhpcy5tYXJrZXJzXy5sZW5ndGg7XG4gIGlmIChsZW4gPCB0aGlzLm1pbkNsdXN0ZXJTaXplXyAmJiBtYXJrZXIuZ2V0TWFwKCkgIT0gdGhpcy5tYXBfKSB7XG4gICAgLy8gTWluIGNsdXN0ZXIgc2l6ZSBub3QgcmVhY2hlZCBzbyBzaG93IHRoZSBtYXJrZXIuXG4gICAgbWFya2VyLnNldE1hcCh0aGlzLm1hcF8pO1xuICB9XG5cbiAgaWYgKGxlbiA9PSB0aGlzLm1pbkNsdXN0ZXJTaXplXykge1xuICAgIC8vIEhpZGUgdGhlIG1hcmtlcnMgdGhhdCB3ZXJlIHNob3dpbmcuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgdGhpcy5tYXJrZXJzX1tpXS5zZXRNYXAobnVsbCk7XG4gICAgfVxuICB9XG5cbiAgaWYgKGxlbiA+PSB0aGlzLm1pbkNsdXN0ZXJTaXplXykge1xuICAgIG1hcmtlci5zZXRNYXAobnVsbCk7XG4gIH1cblxuICB0aGlzLnVwZGF0ZUljb24oKTtcbiAgcmV0dXJuIHRydWU7XG59O1xuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgbWFya2VyIGNsdXN0ZXJlciB0aGF0IHRoZSBjbHVzdGVyIGlzIGFzc29jaWF0ZWQgd2l0aC5cbiAqXG4gKiBAcmV0dXJuIHtNYXJrZXJDbHVzdGVyZXJ9IFRoZSBhc3NvY2lhdGVkIG1hcmtlciBjbHVzdGVyZXIuXG4gKi9cbkNsdXN0ZXIucHJvdG90eXBlLmdldE1hcmtlckNsdXN0ZXJlciA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5tYXJrZXJDbHVzdGVyZXJfO1xufTtcblxuXG4vKipcbiAqIFJldHVybnMgdGhlIGJvdW5kcyBvZiB0aGUgY2x1c3Rlci5cbiAqXG4gKiBAcmV0dXJuIHtnb29nbGUubWFwcy5MYXRMbmdCb3VuZHN9IHRoZSBjbHVzdGVyIGJvdW5kcy5cbiAqL1xuQ2x1c3Rlci5wcm90b3R5cGUuZ2V0Qm91bmRzID0gZnVuY3Rpb24oKSB7XG4gIHZhciBib3VuZHMgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nQm91bmRzKHRoaXMuY2VudGVyXywgdGhpcy5jZW50ZXJfKTtcbiAgdmFyIG1hcmtlcnMgPSB0aGlzLmdldE1hcmtlcnMoKTtcbiAgZm9yICh2YXIgaSA9IDAsIG1hcmtlcjsgbWFya2VyID0gbWFya2Vyc1tpXTsgaSsrKSB7XG4gICAgYm91bmRzLmV4dGVuZChtYXJrZXIuZ2V0UG9zaXRpb24oKSk7XG4gIH1cbiAgcmV0dXJuIGJvdW5kcztcbn07XG5cblxuLyoqXG4gKiBSZW1vdmVzIHRoZSBjbHVzdGVyXG4gKi9cbkNsdXN0ZXIucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmNsdXN0ZXJJY29uXy5yZW1vdmUoKTtcbiAgdGhpcy5tYXJrZXJzXy5sZW5ndGggPSAwO1xuICBkZWxldGUgdGhpcy5tYXJrZXJzXztcbn07XG5cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBjZW50ZXIgb2YgdGhlIGNsdXN0ZXIuXG4gKlxuICogQHJldHVybiB7bnVtYmVyfSBUaGUgY2x1c3RlciBjZW50ZXIuXG4gKi9cbkNsdXN0ZXIucHJvdG90eXBlLmdldFNpemUgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMubWFya2Vyc18ubGVuZ3RoO1xufTtcblxuXG4vKipcbiAqIFJldHVybnMgdGhlIGNlbnRlciBvZiB0aGUgY2x1c3Rlci5cbiAqXG4gKiBAcmV0dXJuIHtBcnJheS48Z29vZ2xlLm1hcHMuTWFya2VyPn0gVGhlIGNsdXN0ZXIgY2VudGVyLlxuICovXG5DbHVzdGVyLnByb3RvdHlwZS5nZXRNYXJrZXJzID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLm1hcmtlcnNfO1xufTtcblxuXG4vKipcbiAqIFJldHVybnMgdGhlIGNlbnRlciBvZiB0aGUgY2x1c3Rlci5cbiAqXG4gKiBAcmV0dXJuIHtnb29nbGUubWFwcy5MYXRMbmd9IFRoZSBjbHVzdGVyIGNlbnRlci5cbiAqL1xuQ2x1c3Rlci5wcm90b3R5cGUuZ2V0Q2VudGVyID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmNlbnRlcl87XG59O1xuXG5cbi8qKlxuICogQ2FsY3VsYXRlZCB0aGUgZXh0ZW5kZWQgYm91bmRzIG9mIHRoZSBjbHVzdGVyIHdpdGggdGhlIGdyaWQuXG4gKlxuICogQHByaXZhdGVcbiAqL1xuQ2x1c3Rlci5wcm90b3R5cGUuY2FsY3VsYXRlQm91bmRzXyA9IGZ1bmN0aW9uKCkge1xuICB2YXIgYm91bmRzID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZ0JvdW5kcyh0aGlzLmNlbnRlcl8sIHRoaXMuY2VudGVyXyk7XG4gIHRoaXMuYm91bmRzXyA9IHRoaXMubWFya2VyQ2x1c3RlcmVyXy5nZXRFeHRlbmRlZEJvdW5kcyhib3VuZHMpO1xufTtcblxuXG4vKipcbiAqIERldGVybWluZXMgaWYgYSBtYXJrZXIgbGllcyBpbiB0aGUgY2x1c3RlcnMgYm91bmRzLlxuICpcbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTWFya2VyfSBtYXJrZXIgVGhlIG1hcmtlciB0byBjaGVjay5cbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdGhlIG1hcmtlciBsaWVzIGluIHRoZSBib3VuZHMuXG4gKi9cbkNsdXN0ZXIucHJvdG90eXBlLmlzTWFya2VySW5DbHVzdGVyQm91bmRzID0gZnVuY3Rpb24obWFya2VyKSB7XG4gIHJldHVybiB0aGlzLmJvdW5kc18uY29udGFpbnMobWFya2VyLmdldFBvc2l0aW9uKCkpO1xufTtcblxuXG4vKipcbiAqIFJldHVybnMgdGhlIG1hcCB0aGF0IHRoZSBjbHVzdGVyIGlzIGFzc29jaWF0ZWQgd2l0aC5cbiAqXG4gKiBAcmV0dXJuIHtnb29nbGUubWFwcy5NYXB9IFRoZSBtYXAuXG4gKi9cbkNsdXN0ZXIucHJvdG90eXBlLmdldE1hcCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5tYXBfO1xufTtcblxuXG4vKipcbiAqIFVwZGF0ZXMgdGhlIGNsdXN0ZXIgaWNvblxuICovXG5DbHVzdGVyLnByb3RvdHlwZS51cGRhdGVJY29uID0gZnVuY3Rpb24oKSB7XG4gIHZhciB6b29tID0gdGhpcy5tYXBfLmdldFpvb20oKTtcbiAgdmFyIG16ID0gdGhpcy5tYXJrZXJDbHVzdGVyZXJfLmdldE1heFpvb20oKTtcblxuICBpZiAobXogJiYgem9vbSA+IG16KSB7XG4gICAgLy8gVGhlIHpvb20gaXMgZ3JlYXRlciB0aGFuIG91ciBtYXggem9vbSBzbyBzaG93IGFsbCB0aGUgbWFya2VycyBpbiBjbHVzdGVyLlxuICAgIGZvciAodmFyIGkgPSAwLCBtYXJrZXI7IG1hcmtlciA9IHRoaXMubWFya2Vyc19baV07IGkrKykge1xuICAgICAgbWFya2VyLnNldE1hcCh0aGlzLm1hcF8pO1xuICAgIH1cbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAodGhpcy5tYXJrZXJzXy5sZW5ndGggPCB0aGlzLm1pbkNsdXN0ZXJTaXplXykge1xuICAgIC8vIE1pbiBjbHVzdGVyIHNpemUgbm90IHlldCByZWFjaGVkLlxuICAgIHRoaXMuY2x1c3Rlckljb25fLmhpZGUoKTtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgbnVtU3R5bGVzID0gdGhpcy5tYXJrZXJDbHVzdGVyZXJfLmdldFN0eWxlcygpLmxlbmd0aDtcbiAgdmFyIHN1bXMgPSB0aGlzLm1hcmtlckNsdXN0ZXJlcl8uZ2V0Q2FsY3VsYXRvcigpKHRoaXMubWFya2Vyc18sIG51bVN0eWxlcyk7XG4gIHRoaXMuY2x1c3Rlckljb25fLnNldENlbnRlcih0aGlzLmNlbnRlcl8pO1xuICB0aGlzLmNsdXN0ZXJJY29uXy5zZXRTdW1zKHN1bXMpO1xuICB0aGlzLmNsdXN0ZXJJY29uXy5zaG93KCk7XG59O1xuXG5cbi8qKlxuICogQSBjbHVzdGVyIGljb25cbiAqXG4gKiBAcGFyYW0ge0NsdXN0ZXJ9IGNsdXN0ZXIgVGhlIGNsdXN0ZXIgdG8gYmUgYXNzb2NpYXRlZCB3aXRoLlxuICogQHBhcmFtIHtPYmplY3R9IHN0eWxlcyBBbiBvYmplY3QgdGhhdCBoYXMgc3R5bGUgcHJvcGVydGllczpcbiAqICAgICAndXJsJzogKHN0cmluZykgVGhlIGltYWdlIHVybC5cbiAqICAgICAnaGVpZ2h0JzogKG51bWJlcikgVGhlIGltYWdlIGhlaWdodC5cbiAqICAgICAnd2lkdGgnOiAobnVtYmVyKSBUaGUgaW1hZ2Ugd2lkdGguXG4gKiAgICAgJ2FuY2hvcic6IChBcnJheSkgVGhlIGFuY2hvciBwb3NpdGlvbiBvZiB0aGUgbGFiZWwgdGV4dC5cbiAqICAgICAndGV4dENvbG9yJzogKHN0cmluZykgVGhlIHRleHQgY29sb3IuXG4gKiAgICAgJ3RleHRTaXplJzogKG51bWJlcikgVGhlIHRleHQgc2l6ZS5cbiAqICAgICAgJ2ZvbnRGYW1pbHknOiAoc3RyaW5nKSBUaGUgZm9udCBmYW1pbHkuXG4gKiAgICAgICdmb250V2VpZ2h0JzogKHN0cmluZykgVGhlIGZvbnQgd2VpZ2h0LlxuICogICAgICdiYWNrZ3JvdW5kUG9zaXRpb246IChzdHJpbmcpIFRoZSBiYWNrZ3JvdW5kIHBvc3RpdGlvbiB4LCB5LlxuICogQHBhcmFtIHtudW1iZXI9fSBvcHRfcGFkZGluZyBPcHRpb25hbCBwYWRkaW5nIHRvIGFwcGx5IHRvIHRoZSBjbHVzdGVyIGljb24uXG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlbmRzIGdvb2dsZS5tYXBzLk92ZXJsYXlWaWV3XG4gKiBAaWdub3JlXG4gKi9cbmZ1bmN0aW9uIENsdXN0ZXJJY29uKGNsdXN0ZXIsIHN0eWxlcywgb3B0X3BhZGRpbmcpIHtcbiAgY2x1c3Rlci5nZXRNYXJrZXJDbHVzdGVyZXIoKS5leHRlbmQoQ2x1c3Rlckljb24sIGdvb2dsZS5tYXBzLk92ZXJsYXlWaWV3KTtcblxuICB0aGlzLnN0eWxlc18gPSBzdHlsZXM7XG4gIHRoaXMucGFkZGluZ18gPSBvcHRfcGFkZGluZyB8fCAwO1xuICB0aGlzLmNsdXN0ZXJfID0gY2x1c3RlcjtcbiAgdGhpcy5jZW50ZXJfID0gbnVsbDtcbiAgdGhpcy5tYXBfID0gY2x1c3Rlci5nZXRNYXAoKTtcbiAgdGhpcy5kaXZfID0gbnVsbDtcbiAgdGhpcy5zdW1zXyA9IG51bGw7XG4gIHRoaXMudmlzaWJsZV8gPSBmYWxzZTtcblxuICB0aGlzLnNldE1hcCh0aGlzLm1hcF8pO1xufVxuXG5cbi8qKlxuICogVHJpZ2dlcnMgdGhlIGNsdXN0ZXJjbGljayBldmVudCBhbmQgem9vbSdzIGlmIHRoZSBvcHRpb24gaXMgc2V0LlxuICovXG5DbHVzdGVySWNvbi5wcm90b3R5cGUudHJpZ2dlckNsdXN0ZXJDbGljayA9IGZ1bmN0aW9uKCkge1xuICB2YXIgbWFya2VyQ2x1c3RlcmVyID0gdGhpcy5jbHVzdGVyXy5nZXRNYXJrZXJDbHVzdGVyZXIoKTtcblxuICAvLyBUcmlnZ2VyIHRoZSBjbHVzdGVyY2xpY2sgZXZlbnQuXG4gIGdvb2dsZS5tYXBzLmV2ZW50LnRyaWdnZXIobWFya2VyQ2x1c3RlcmVyLCAnY2x1c3RlcmNsaWNrJywgdGhpcy5jbHVzdGVyXyk7XG5cbiAgaWYgKG1hcmtlckNsdXN0ZXJlci5pc1pvb21PbkNsaWNrKCkpIHtcbiAgICAvLyBab29tIGludG8gdGhlIGNsdXN0ZXIuXG4gICAgdGhpcy5tYXBfLmZpdEJvdW5kcyh0aGlzLmNsdXN0ZXJfLmdldEJvdW5kcygpKTtcbiAgfVxufTtcblxuXG4vKipcbiAqIEFkZGluZyB0aGUgY2x1c3RlciBpY29uIHRvIHRoZSBkb20uXG4gKiBAaWdub3JlXG4gKi9cbkNsdXN0ZXJJY29uLnByb3RvdHlwZS5vbkFkZCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmRpdl8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcbiAgaWYgKHRoaXMudmlzaWJsZV8pIHtcbiAgICB2YXIgcG9zID0gdGhpcy5nZXRQb3NGcm9tTGF0TG5nXyh0aGlzLmNlbnRlcl8pO1xuICAgIHRoaXMuZGl2Xy5zdHlsZS5jc3NUZXh0ID0gdGhpcy5jcmVhdGVDc3MocG9zKTtcbiAgICB0aGlzLmRpdl8uaW5uZXJIVE1MID0gdGhpcy5zdW1zXy50ZXh0O1xuICB9XG5cbiAgdmFyIHBhbmVzID0gdGhpcy5nZXRQYW5lcygpO1xuICBwYW5lcy5vdmVybGF5TW91c2VUYXJnZXQuYXBwZW5kQ2hpbGQodGhpcy5kaXZfKTtcblxuICB2YXIgdGhhdCA9IHRoaXM7XG4gIGdvb2dsZS5tYXBzLmV2ZW50LmFkZERvbUxpc3RlbmVyKHRoaXMuZGl2XywgJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgdGhhdC50cmlnZ2VyQ2x1c3RlckNsaWNrKCk7XG4gIH0pO1xufTtcblxuXG4vKipcbiAqIFJldHVybnMgdGhlIHBvc2l0aW9uIHRvIHBsYWNlIHRoZSBkaXYgZGVuZGluZyBvbiB0aGUgbGF0bG5nLlxuICpcbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTGF0TG5nfSBsYXRsbmcgVGhlIHBvc2l0aW9uIGluIGxhdGxuZy5cbiAqIEByZXR1cm4ge2dvb2dsZS5tYXBzLlBvaW50fSBUaGUgcG9zaXRpb24gaW4gcGl4ZWxzLlxuICogQHByaXZhdGVcbiAqL1xuQ2x1c3Rlckljb24ucHJvdG90eXBlLmdldFBvc0Zyb21MYXRMbmdfID0gZnVuY3Rpb24obGF0bG5nKSB7XG4gIHZhciBwb3MgPSB0aGlzLmdldFByb2plY3Rpb24oKS5mcm9tTGF0TG5nVG9EaXZQaXhlbChsYXRsbmcpO1xuICBwb3MueCAtPSBwYXJzZUludCh0aGlzLndpZHRoXyAvIDIsIDEwKTtcbiAgcG9zLnkgLT0gcGFyc2VJbnQodGhpcy5oZWlnaHRfIC8gMiwgMTApO1xuICByZXR1cm4gcG9zO1xufTtcblxuXG4vKipcbiAqIERyYXcgdGhlIGljb24uXG4gKiBAaWdub3JlXG4gKi9cbkNsdXN0ZXJJY29uLnByb3RvdHlwZS5kcmF3ID0gZnVuY3Rpb24oKSB7XG4gIGlmICh0aGlzLnZpc2libGVfKSB7XG4gICAgdmFyIHBvcyA9IHRoaXMuZ2V0UG9zRnJvbUxhdExuZ18odGhpcy5jZW50ZXJfKTtcbiAgICB0aGlzLmRpdl8uc3R5bGUudG9wID0gcG9zLnkgKyAncHgnO1xuICAgIHRoaXMuZGl2Xy5zdHlsZS5sZWZ0ID0gcG9zLnggKyAncHgnO1xuICB9XG59O1xuXG5cbi8qKlxuICogSGlkZSB0aGUgaWNvbi5cbiAqL1xuQ2x1c3Rlckljb24ucHJvdG90eXBlLmhpZGUgPSBmdW5jdGlvbigpIHtcbiAgaWYgKHRoaXMuZGl2Xykge1xuICAgIHRoaXMuZGl2Xy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICB9XG4gIHRoaXMudmlzaWJsZV8gPSBmYWxzZTtcbn07XG5cblxuLyoqXG4gKiBQb3NpdGlvbiBhbmQgc2hvdyB0aGUgaWNvbi5cbiAqL1xuQ2x1c3Rlckljb24ucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbigpIHtcbiAgaWYgKHRoaXMuZGl2Xykge1xuICAgIHZhciBwb3MgPSB0aGlzLmdldFBvc0Zyb21MYXRMbmdfKHRoaXMuY2VudGVyXyk7XG4gICAgdGhpcy5kaXZfLnN0eWxlLmNzc1RleHQgPSB0aGlzLmNyZWF0ZUNzcyhwb3MpO1xuICAgIHRoaXMuZGl2Xy5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gIH1cbiAgdGhpcy52aXNpYmxlXyA9IHRydWU7XG59O1xuXG5cbi8qKlxuICogUmVtb3ZlIHRoZSBpY29uIGZyb20gdGhlIG1hcFxuICovXG5DbHVzdGVySWNvbi5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuc2V0TWFwKG51bGwpO1xufTtcblxuXG4vKipcbiAqIEltcGxlbWVudGF0aW9uIG9mIHRoZSBvblJlbW92ZSBpbnRlcmZhY2UuXG4gKiBAaWdub3JlXG4gKi9cbkNsdXN0ZXJJY29uLnByb3RvdHlwZS5vblJlbW92ZSA9IGZ1bmN0aW9uKCkge1xuICBpZiAodGhpcy5kaXZfICYmIHRoaXMuZGl2Xy5wYXJlbnROb2RlKSB7XG4gICAgdGhpcy5oaWRlKCk7XG4gICAgdGhpcy5kaXZfLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5kaXZfKTtcbiAgICB0aGlzLmRpdl8gPSBudWxsO1xuICB9XG59O1xuXG5cbi8qKlxuICogU2V0IHRoZSBzdW1zIG9mIHRoZSBpY29uLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdW1zIFRoZSBzdW1zIGNvbnRhaW5pbmc6XG4gKiAgICd0ZXh0JzogKHN0cmluZykgVGhlIHRleHQgdG8gZGlzcGxheSBpbiB0aGUgaWNvbi5cbiAqICAgJ2luZGV4JzogKG51bWJlcikgVGhlIHN0eWxlIGluZGV4IG9mIHRoZSBpY29uLlxuICovXG5DbHVzdGVySWNvbi5wcm90b3R5cGUuc2V0U3VtcyA9IGZ1bmN0aW9uKHN1bXMpIHtcbiAgdGhpcy5zdW1zXyA9IHN1bXM7XG4gIHRoaXMudGV4dF8gPSBzdW1zLnRleHQ7XG4gIHRoaXMuaW5kZXhfID0gc3Vtcy5pbmRleDtcbiAgaWYgKHRoaXMuZGl2Xykge1xuICAgIHRoaXMuZGl2Xy5pbm5lckhUTUwgPSBzdW1zLnRleHQ7XG4gIH1cblxuICB0aGlzLnVzZVN0eWxlKCk7XG59O1xuXG5cbi8qKlxuICogU2V0cyB0aGUgaWNvbiB0byB0aGUgdGhlIHN0eWxlcy5cbiAqL1xuQ2x1c3Rlckljb24ucHJvdG90eXBlLnVzZVN0eWxlID0gZnVuY3Rpb24oKSB7XG4gIHZhciBpbmRleCA9IE1hdGgubWF4KDAsIHRoaXMuc3Vtc18uaW5kZXggLSAxKTtcbiAgaW5kZXggPSBNYXRoLm1pbih0aGlzLnN0eWxlc18ubGVuZ3RoIC0gMSwgaW5kZXgpO1xuICB2YXIgc3R5bGUgPSB0aGlzLnN0eWxlc19baW5kZXhdO1xuICB0aGlzLnVybF8gPSBzdHlsZVsndXJsJ107XG4gIHRoaXMuaGVpZ2h0XyA9IHN0eWxlWydoZWlnaHQnXTtcbiAgdGhpcy53aWR0aF8gPSBzdHlsZVsnd2lkdGgnXTtcbiAgdGhpcy50ZXh0Q29sb3JfID0gc3R5bGVbJ3RleHRDb2xvciddO1xuICB0aGlzLmFuY2hvcl8gPSBzdHlsZVsnYW5jaG9yJ107XG4gIHRoaXMudGV4dFNpemVfID0gc3R5bGVbJ3RleHRTaXplJ107XG4gIHRoaXMuZm9udEZhbWlseV8gPSBzdHlsZVsnZm9udEZhbWlseSddO1xuICB0aGlzLmZvbnRXZWlnaHRfID0gc3R5bGVbJ2ZvbnRXZWlnaHQnXTtcbiAgdGhpcy5iYWNrZ3JvdW5kUG9zaXRpb25fID0gc3R5bGVbJ2JhY2tncm91bmRQb3NpdGlvbiddO1xufTtcblxuXG4vKipcbiAqIFNldHMgdGhlIGNlbnRlciBvZiB0aGUgaWNvbi5cbiAqXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLkxhdExuZ30gY2VudGVyIFRoZSBsYXRsbmcgdG8gc2V0IGFzIHRoZSBjZW50ZXIuXG4gKi9cbkNsdXN0ZXJJY29uLnByb3RvdHlwZS5zZXRDZW50ZXIgPSBmdW5jdGlvbihjZW50ZXIpIHtcbiAgdGhpcy5jZW50ZXJfID0gY2VudGVyO1xufTtcblxuXG4vKipcbiAqIENyZWF0ZSB0aGUgY3NzIHRleHQgYmFzZWQgb24gdGhlIHBvc2l0aW9uIG9mIHRoZSBpY29uLlxuICpcbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuUG9pbnR9IHBvcyBUaGUgcG9zaXRpb24uXG4gKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBjc3Mgc3R5bGUgdGV4dC5cbiAqL1xuQ2x1c3Rlckljb24ucHJvdG90eXBlLmNyZWF0ZUNzcyA9IGZ1bmN0aW9uKHBvcykge1xuICB2YXIgc3R5bGUgPSBbXTtcbiAgc3R5bGUucHVzaCgnYmFja2dyb3VuZC1pbWFnZTp1cmwoJyArIHRoaXMudXJsXyArICcpOycpO1xuICB2YXIgYmFja2dyb3VuZFBvc2l0aW9uID0gdGhpcy5iYWNrZ3JvdW5kUG9zaXRpb25fID8gdGhpcy5iYWNrZ3JvdW5kUG9zaXRpb25fIDogJzAgMCc7XG4gIHN0eWxlLnB1c2goJ2JhY2tncm91bmQtcG9zaXRpb246JyArIGJhY2tncm91bmRQb3NpdGlvbiArICc7Jyk7XG5cbiAgaWYgKHR5cGVvZiB0aGlzLmFuY2hvcl8gPT09ICdvYmplY3QnKSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLmFuY2hvcl9bMF0gPT09ICdudW1iZXInICYmIHRoaXMuYW5jaG9yX1swXSA+IDAgJiZcbiAgICAgICAgdGhpcy5hbmNob3JfWzBdIDwgdGhpcy5oZWlnaHRfKSB7XG4gICAgICBzdHlsZS5wdXNoKCdoZWlnaHQ6JyArICh0aGlzLmhlaWdodF8gLSB0aGlzLmFuY2hvcl9bMF0pICtcbiAgICAgICAgICAncHg7IHBhZGRpbmctdG9wOicgKyB0aGlzLmFuY2hvcl9bMF0gKyAncHg7Jyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlLnB1c2goJ2hlaWdodDonICsgdGhpcy5oZWlnaHRfICsgJ3B4OyBsaW5lLWhlaWdodDonICsgdGhpcy5oZWlnaHRfICtcbiAgICAgICAgICAncHg7Jyk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgdGhpcy5hbmNob3JfWzFdID09PSAnbnVtYmVyJyAmJiB0aGlzLmFuY2hvcl9bMV0gPiAwICYmXG4gICAgICAgIHRoaXMuYW5jaG9yX1sxXSA8IHRoaXMud2lkdGhfKSB7XG4gICAgICBzdHlsZS5wdXNoKCd3aWR0aDonICsgKHRoaXMud2lkdGhfIC0gdGhpcy5hbmNob3JfWzFdKSArXG4gICAgICAgICAgJ3B4OyBwYWRkaW5nLWxlZnQ6JyArIHRoaXMuYW5jaG9yX1sxXSArICdweDsnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3R5bGUucHVzaCgnd2lkdGg6JyArIHRoaXMud2lkdGhfICsgJ3B4OyB0ZXh0LWFsaWduOmNlbnRlcjsnKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgc3R5bGUucHVzaCgnaGVpZ2h0OicgKyB0aGlzLmhlaWdodF8gKyAncHg7IGxpbmUtaGVpZ2h0OicgK1xuICAgICAgICB0aGlzLmhlaWdodF8gKyAncHg7IHdpZHRoOicgKyB0aGlzLndpZHRoXyArICdweDsgdGV4dC1hbGlnbjpjZW50ZXI7Jyk7XG4gIH1cblxuICB2YXIgdHh0Q29sb3IgPSB0aGlzLnRleHRDb2xvcl8gPyB0aGlzLnRleHRDb2xvcl8gOiAnYmxhY2snO1xuICB2YXIgdHh0U2l6ZSA9IHRoaXMudGV4dFNpemVfID8gdGhpcy50ZXh0U2l6ZV8gOiAxMTtcbiAgdmFyIGZvbnRGYW1pbHkgPSB0aGlzLmZvbnRGYW1pbHlfID8gdGhpcy5mb250RmFtaWx5XyA6ICdBcmlhbCxzYW5zLXNlcmlmJztcbiAgdmFyIGZvbnRXZWlnaHQgPSB0aGlzLmZvbnRXZWlnaHRfID8gdGhpcy5mb250V2VpZ2h0XyA6ICc0MDAnO1xuXG4gIHN0eWxlLnB1c2goJ2N1cnNvcjpwb2ludGVyOyB0b3A6JyArIHBvcy55ICsgJ3B4OyBsZWZ0OicgK1xuICAgICAgcG9zLnggKyAncHg7IGNvbG9yOicgKyB0eHRDb2xvciArICc7IHBvc2l0aW9uOmFic29sdXRlOyBmb250LXNpemU6JyArXG4gICAgICB0eHRTaXplICsgJ3B4OyBmb250LWZhbWlseTonICsgZm9udEZhbWlseSArICc7IGZvbnQtd2VpZ2h0OicgKyBmb250V2VpZ2h0ICsgJzsnKTtcbiAgcmV0dXJuIHN0eWxlLmpvaW4oJycpO1xufTtcblxuXG4vLyBFeHBvcnQgU3ltYm9scyBmb3IgQ2xvc3VyZVxuLy8gSWYgeW91IGFyZSBub3QgZ29pbmcgdG8gY29tcGlsZSB3aXRoIGNsb3N1cmUgdGhlbiB5b3UgY2FuIHJlbW92ZSB0aGVcbi8vIGNvZGUgYmVsb3cuXG5nbG9iYWxbJ01hcmtlckNsdXN0ZXJlciddID0gTWFya2VyQ2x1c3RlcmVyO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnYWRkTWFya2VyJ10gPSBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmFkZE1hcmtlcjtcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ2FkZE1hcmtlcnMnXSA9IE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuYWRkTWFya2Vycztcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ2NsZWFyTWFya2VycyddID1cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmNsZWFyTWFya2Vycztcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ2ZpdE1hcFRvTWFya2VycyddID1cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmZpdE1hcFRvTWFya2Vycztcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ2dldENhbGN1bGF0b3InXSA9XG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRDYWxjdWxhdG9yO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnZ2V0R3JpZFNpemUnXSA9XG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRHcmlkU2l6ZTtcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ2dldEV4dGVuZGVkQm91bmRzJ10gPVxuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0RXh0ZW5kZWRCb3VuZHM7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydnZXRNYXAnXSA9IE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0TWFwO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnZ2V0TWFya2VycyddID0gTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRNYXJrZXJzO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnZ2V0TWF4Wm9vbSddID0gTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRNYXhab29tO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnZ2V0U3R5bGVzJ10gPSBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldFN0eWxlcztcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ2dldFRvdGFsQ2x1c3RlcnMnXSA9XG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRUb3RhbENsdXN0ZXJzO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnZ2V0VG90YWxNYXJrZXJzJ10gPVxuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0VG90YWxNYXJrZXJzO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsncmVkcmF3J10gPSBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnJlZHJhdztcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ3JlbW92ZU1hcmtlciddID1cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnJlbW92ZU1hcmtlcjtcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ3JlbW92ZU1hcmtlcnMnXSA9XG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5yZW1vdmVNYXJrZXJzO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsncmVzZXRWaWV3cG9ydCddID1cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnJlc2V0Vmlld3BvcnQ7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydyZXBhaW50J10gPVxuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUucmVwYWludDtcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ3NldENhbGN1bGF0b3InXSA9XG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5zZXRDYWxjdWxhdG9yO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnc2V0R3JpZFNpemUnXSA9XG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5zZXRHcmlkU2l6ZTtcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ3NldE1heFpvb20nXSA9XG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5zZXRNYXhab29tO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnb25BZGQnXSA9IE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUub25BZGQ7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydkcmF3J10gPSBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmRyYXc7XG5cbkNsdXN0ZXIucHJvdG90eXBlWydnZXRDZW50ZXInXSA9IENsdXN0ZXIucHJvdG90eXBlLmdldENlbnRlcjtcbkNsdXN0ZXIucHJvdG90eXBlWydnZXRTaXplJ10gPSBDbHVzdGVyLnByb3RvdHlwZS5nZXRTaXplO1xuQ2x1c3Rlci5wcm90b3R5cGVbJ2dldE1hcmtlcnMnXSA9IENsdXN0ZXIucHJvdG90eXBlLmdldE1hcmtlcnM7XG5cbkNsdXN0ZXJJY29uLnByb3RvdHlwZVsnb25BZGQnXSA9IENsdXN0ZXJJY29uLnByb3RvdHlwZS5vbkFkZDtcbkNsdXN0ZXJJY29uLnByb3RvdHlwZVsnZHJhdyddID0gQ2x1c3Rlckljb24ucHJvdG90eXBlLmRyYXc7XG5DbHVzdGVySWNvbi5wcm90b3R5cGVbJ29uUmVtb3ZlJ10gPSBDbHVzdGVySWNvbi5wcm90b3R5cGUub25SZW1vdmU7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBNYXJrZXJDbHVzdGVyZXI7XG4iLCIvKipcbiAqIGpRdWVyeSBCYXIgUmF0aW5nIFBsdWdpbiB2MS4yLjJcbiAqXG4gKiBodHRwOi8vZ2l0aHViLmNvbS9hbnRlbm5haW8vanF1ZXJ5LWJhci1yYXRpbmdcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTItMjAxNiBLYXppayBQaWV0cnVzemV3c2tpXG4gKlxuICogVGhpcyBwbHVnaW4gaXMgYXZhaWxhYmxlIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cbiAqIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gKi9cbihmdW5jdGlvbiAoZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgLy8gQU1EXG4gICAgICAgIGRlZmluZShbJ2pxdWVyeSddLCBmYWN0b3J5KTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgICAgIC8vIE5vZGUvQ29tbW9uSlNcbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoJ2pxdWVyeScpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBicm93c2VyIGdsb2JhbHNcbiAgICAgICAgZmFjdG9yeShqUXVlcnkpO1xuICAgIH1cbn0oZnVuY3Rpb24gKCQpIHtcblxuICAgIHZhciBCYXJSYXRpbmcgPSAoZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgZnVuY3Rpb24gQmFyUmF0aW5nKCkge1xuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgICAgICAvLyB3cmFwIGVsZW1lbnQgaW4gYSB3cmFwcGVyIGRpdlxuICAgICAgICAgICAgdmFyIHdyYXBFbGVtZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNsYXNzZXMgPSBbJ2JyLXdyYXBwZXInXTtcblxuICAgICAgICAgICAgICAgIGlmIChzZWxmLm9wdGlvbnMudGhlbWUgIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzZXMucHVzaCgnYnItdGhlbWUtJyArIHNlbGYub3B0aW9ucy50aGVtZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgc2VsZi4kZWxlbS53cmFwKCQoJzxkaXYgLz4nLCB7XG4gICAgICAgICAgICAgICAgICAgICdjbGFzcyc6IGNsYXNzZXMuam9pbignICcpXG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gdW53cmFwIGVsZW1lbnRcbiAgICAgICAgICAgIHZhciB1bndyYXBFbGVtZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgc2VsZi4kZWxlbS51bndyYXAoKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIGZpbmQgb3B0aW9uIGJ5IHZhbHVlXG4gICAgICAgICAgICB2YXIgZmluZE9wdGlvbiA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCQuaXNOdW1lcmljKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IE1hdGguZmxvb3IodmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiAkKCdvcHRpb25bdmFsdWU9XCInICsgdmFsdWUgICsgJ1wiXScsIHNlbGYuJGVsZW0pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gZ2V0IGluaXRpYWwgb3B0aW9uXG4gICAgICAgICAgICB2YXIgZ2V0SW5pdGlhbE9wdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBpbml0aWFsUmF0aW5nID0gc2VsZi5vcHRpb25zLmluaXRpYWxSYXRpbmc7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWluaXRpYWxSYXRpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQoJ29wdGlvbjpzZWxlY3RlZCcsIHNlbGYuJGVsZW0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBmaW5kT3B0aW9uKGluaXRpYWxSYXRpbmcpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gZ2V0IGVtcHR5IG9wdGlvblxuICAgICAgICAgICAgdmFyIGdldEVtcHR5T3B0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyICRlbXB0eU9wdCA9IHNlbGYuJGVsZW0uZmluZCgnb3B0aW9uW3ZhbHVlPVwiJyArIHNlbGYub3B0aW9ucy5lbXB0eVZhbHVlICsgJ1wiXScpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCEkZW1wdHlPcHQubGVuZ3RoICYmIHNlbGYub3B0aW9ucy5hbGxvd0VtcHR5KSB7XG4gICAgICAgICAgICAgICAgICAgICRlbXB0eU9wdCA9ICQoJzxvcHRpb24gLz4nLCB7ICd2YWx1ZSc6IHNlbGYub3B0aW9ucy5lbXB0eVZhbHVlIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAkZW1wdHlPcHQucHJlcGVuZFRvKHNlbGYuJGVsZW0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiAkZW1wdHlPcHQ7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBnZXQgZGF0YVxuICAgICAgICAgICAgdmFyIGdldERhdGEgPSBmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IHNlbGYuJGVsZW0uZGF0YSgnYmFycmF0aW5nJyk7XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGtleSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGFba2V5XTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIHNldCBkYXRhXG4gICAgICAgICAgICB2YXIgc2V0RGF0YSA9IGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLmRhdGEoJ2JhcnJhdGluZycsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLmRhdGEoJ2JhcnJhdGluZycpW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBzYXZlIGRhdGEgb24gZWxlbWVudFxuICAgICAgICAgICAgdmFyIHNhdmVEYXRhT25FbGVtZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyICRvcHQgPSBnZXRJbml0aWFsT3B0aW9uKCk7XG4gICAgICAgICAgICAgICAgdmFyICRlbXB0eU9wdCA9IGdldEVtcHR5T3B0aW9uKCk7XG5cbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSAkb3B0LnZhbCgpO1xuICAgICAgICAgICAgICAgIHZhciB0ZXh0ID0gJG9wdC5kYXRhKCdodG1sJykgPyAkb3B0LmRhdGEoJ2h0bWwnKSA6ICRvcHQudGV4dCgpO1xuXG4gICAgICAgICAgICAgICAgLy8gaWYgdGhlIGFsbG93RW1wdHkgb3B0aW9uIGlzIG5vdCBzZXQgbGV0J3MgY2hlY2sgaWYgZW1wdHkgb3B0aW9uIGV4aXN0cyBpbiB0aGUgc2VsZWN0IGZpZWxkXG4gICAgICAgICAgICAgICAgdmFyIGFsbG93RW1wdHkgPSAoc2VsZi5vcHRpb25zLmFsbG93RW1wdHkgIT09IG51bGwpID9cbiAgICAgICAgICAgICAgICAgICAgc2VsZi5vcHRpb25zLmFsbG93RW1wdHkgOlxuICAgICAgICAgICAgICAgICAgICAhISRlbXB0eU9wdC5sZW5ndGg7XG5cbiAgICAgICAgICAgICAgICB2YXIgZW1wdHlWYWx1ZSA9ICgkZW1wdHlPcHQubGVuZ3RoKSA/ICRlbXB0eU9wdC52YWwoKSA6IG51bGw7XG4gICAgICAgICAgICAgICAgdmFyIGVtcHR5VGV4dCA9ICgkZW1wdHlPcHQubGVuZ3RoKSA/ICRlbXB0eU9wdC50ZXh0KCkgOiBudWxsO1xuXG4gICAgICAgICAgICAgICAgc2V0RGF0YShudWxsLCB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJPcHRpb25zOiBzZWxmLm9wdGlvbnMsXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gaW5pdGlhbCByYXRpbmcgYmFzZWQgb24gdGhlIE9QVElPTiB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICByYXRpbmdWYWx1ZTogdmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIHJhdGluZ1RleHQ6IHRleHQsXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gcmF0aW5nIHdpbGwgYmUgcmVzdG9yZWQgYnkgY2FsbGluZyBjbGVhciBtZXRob2RcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxSYXRpbmdWYWx1ZTogdmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsUmF0aW5nVGV4dDogdGV4dCxcblxuICAgICAgICAgICAgICAgICAgICAvLyBhbGxvdyBlbXB0eSByYXRpbmdzP1xuICAgICAgICAgICAgICAgICAgICBhbGxvd0VtcHR5OiBhbGxvd0VtcHR5LFxuXG4gICAgICAgICAgICAgICAgICAgIC8vIHJhdGluZyB2YWx1ZSBhbmQgdGV4dCBvZiB0aGUgZW1wdHkgT1BUSU9OXG4gICAgICAgICAgICAgICAgICAgIGVtcHR5UmF0aW5nVmFsdWU6IGVtcHR5VmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIGVtcHR5UmF0aW5nVGV4dDogZW1wdHlUZXh0LFxuXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlYWQtb25seSBzdGF0ZVxuICAgICAgICAgICAgICAgICAgICByZWFkT25seTogc2VsZi5vcHRpb25zLnJlYWRvbmx5LFxuXG4gICAgICAgICAgICAgICAgICAgIC8vIGRpZCB0aGUgdXNlciBhbHJlYWR5IHNlbGVjdCBhIHJhdGluZz9cbiAgICAgICAgICAgICAgICAgICAgcmF0aW5nTWFkZTogZmFsc2VcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIHJlbW92ZSBkYXRhIG9uIGVsZW1lbnRcbiAgICAgICAgICAgIHZhciByZW1vdmVEYXRhT25FbGVtZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgc2VsZi4kZWxlbS5yZW1vdmVEYXRhKCdiYXJyYXRpbmcnKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIHJldHVybiBjdXJyZW50IHJhdGluZyB0ZXh0XG4gICAgICAgICAgICB2YXIgcmF0aW5nVGV4dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBnZXREYXRhKCdyYXRpbmdUZXh0Jyk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyByZXR1cm4gY3VycmVudCByYXRpbmcgdmFsdWVcbiAgICAgICAgICAgIHZhciByYXRpbmdWYWx1ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBnZXREYXRhKCdyYXRpbmdWYWx1ZScpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gYnVpbGQgd2lkZ2V0IGFuZCByZXR1cm4galF1ZXJ5IGVsZW1lbnRcbiAgICAgICAgICAgIHZhciBidWlsZFdpZGdldCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciAkdyA9ICQoJzxkaXYgLz4nLCB7ICdjbGFzcyc6ICdici13aWRnZXQnIH0pO1xuXG4gICAgICAgICAgICAgICAgLy8gY3JlYXRlIEEgZWxlbWVudHMgdGhhdCB3aWxsIHJlcGxhY2UgT1BUSU9Oc1xuICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0uZmluZCgnb3B0aW9uJykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbCwgdGV4dCwgaHRtbCwgJGE7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFsID0gJCh0aGlzKS52YWwoKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBjcmVhdGUgcmF0aW5ncyAtIGJ1dCBvbmx5IGlmIHZhbCBpcyBub3QgZGVmaW5lZCBhcyBlbXB0eVxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsICE9PSBnZXREYXRhKCdlbXB0eVJhdGluZ1ZhbHVlJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQgPSAkKHRoaXMpLnRleHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGh0bWwgPSAkKHRoaXMpLmRhdGEoJ2h0bWwnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChodG1sKSB7IHRleHQgPSBodG1sOyB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICRhID0gJCgnPGEgLz4nLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2hyZWYnOiAnIycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2RhdGEtcmF0aW5nLXZhbHVlJzogdmFsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdkYXRhLXJhdGluZy10ZXh0JzogdGV4dCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnaHRtbCc6IChzZWxmLm9wdGlvbnMuc2hvd1ZhbHVlcykgPyB0ZXh0IDogJydcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAkdy5hcHBlbmQoJGEpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIC8vIGFwcGVuZCAuYnItY3VycmVudC1yYXRpbmcgZGl2IHRvIHRoZSB3aWRnZXRcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5vcHRpb25zLnNob3dTZWxlY3RlZFJhdGluZykge1xuICAgICAgICAgICAgICAgICAgICAkdy5hcHBlbmQoJCgnPGRpdiAvPicsIHsgJ3RleHQnOiAnJywgJ2NsYXNzJzogJ2JyLWN1cnJlbnQtcmF0aW5nJyB9KSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gYWRkaXRpb25hbCBjbGFzc2VzIGZvciB0aGUgd2lkZ2V0XG4gICAgICAgICAgICAgICAgaWYgKHNlbGYub3B0aW9ucy5yZXZlcnNlKSB7XG4gICAgICAgICAgICAgICAgICAgICR3LmFkZENsYXNzKCdici1yZXZlcnNlJyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYub3B0aW9ucy5yZWFkb25seSkge1xuICAgICAgICAgICAgICAgICAgICAkdy5hZGRDbGFzcygnYnItcmVhZG9ubHknKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gJHc7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyByZXR1cm4gYSBqUXVlcnkgZnVuY3Rpb24gbmFtZSBkZXBlbmRpbmcgb24gdGhlICdyZXZlcnNlJyBzZXR0aW5nXG4gICAgICAgICAgICB2YXIgbmV4dEFsbG9yUHJldmlvdXNBbGwgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpZiAoZ2V0RGF0YSgndXNlck9wdGlvbnMnKS5yZXZlcnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnbmV4dEFsbCc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdwcmV2QWxsJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBzZXQgdGhlIHZhbHVlIG9mIHRoZSBzZWxlY3QgZmllbGRcbiAgICAgICAgICAgIHZhciBzZXRTZWxlY3RGaWVsZFZhbHVlID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICAvLyBjaGFuZ2Ugc2VsZWN0ZWQgb3B0aW9uXG4gICAgICAgICAgICAgICAgZmluZE9wdGlvbih2YWx1ZSkucHJvcCgnc2VsZWN0ZWQnLCB0cnVlKTtcblxuICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0uY2hhbmdlKCk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyByZXNldCBzZWxlY3QgZmllbGRcbiAgICAgICAgICAgIHZhciByZXNldFNlbGVjdEZpZWxkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJCgnb3B0aW9uJywgc2VsZi4kZWxlbSkucHJvcCgnc2VsZWN0ZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGVmYXVsdFNlbGVjdGVkO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgc2VsZi4kZWxlbS5jaGFuZ2UoKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIGRpc3BsYXkgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCByYXRpbmdcbiAgICAgICAgICAgIHZhciBzaG93U2VsZWN0ZWRSYXRpbmcgPSBmdW5jdGlvbih0ZXh0KSB7XG4gICAgICAgICAgICAgICAgLy8gdGV4dCB1bmRlZmluZWQ/XG4gICAgICAgICAgICAgICAgdGV4dCA9IHRleHQgPyB0ZXh0IDogcmF0aW5nVGV4dCgpO1xuXG4gICAgICAgICAgICAgICAgLy8gc3BlY2lhbCBjYXNlIHdoZW4gdGhlIHNlbGVjdGVkIHJhdGluZyBpcyBkZWZpbmVkIGFzIGVtcHR5XG4gICAgICAgICAgICAgICAgaWYgKHRleHQgPT0gZ2V0RGF0YSgnZW1wdHlSYXRpbmdUZXh0JykpIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dCA9ICcnO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIHVwZGF0ZSAuYnItY3VycmVudC1yYXRpbmcgZGl2XG4gICAgICAgICAgICAgICAgaWYgKHNlbGYub3B0aW9ucy5zaG93U2VsZWN0ZWRSYXRpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi4kZWxlbS5wYXJlbnQoKS5maW5kKCcuYnItY3VycmVudC1yYXRpbmcnKS50ZXh0KHRleHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIHJldHVybiByb3VuZGVkIGZyYWN0aW9uIG9mIGEgdmFsdWUgKDE0LjQgLT4gNDAsIDAuOTkgLT4gOTApXG4gICAgICAgICAgICB2YXIgZnJhY3Rpb24gPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLnJvdW5kKCgoTWF0aC5mbG9vcih2YWx1ZSAqIDEwKSAvIDEwKSAlIDEpICogMTAwKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIHJlbW92ZSBhbGwgY2xhc3NlcyBmcm9tIGVsZW1lbnRzXG4gICAgICAgICAgICB2YXIgcmVzZXRTdHlsZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBhbGwgY2xhc3NlcyBzdGFydGluZyB3aXRoIGJyLSpcbiAgICAgICAgICAgICAgICBzZWxmLiR3aWRnZXQuZmluZCgnYScpLnJlbW92ZUNsYXNzKGZ1bmN0aW9uKGluZGV4LCBjbGFzc2VzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoY2xhc3Nlcy5tYXRjaCgvKF58XFxzKWJyLVxcUysvZykgfHwgW10pLmpvaW4oJyAnKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIGFwcGx5IHN0eWxlIGJ5IHNldHRpbmcgY2xhc3NlcyBvbiBlbGVtZW50c1xuICAgICAgICAgICAgdmFyIGFwcGx5U3R5bGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgJGEgPSBzZWxmLiR3aWRnZXQuZmluZCgnYVtkYXRhLXJhdGluZy12YWx1ZT1cIicgKyByYXRpbmdWYWx1ZSgpICsgJ1wiXScpO1xuICAgICAgICAgICAgICAgIHZhciBpbml0aWFsUmF0aW5nID0gZ2V0RGF0YSgndXNlck9wdGlvbnMnKS5pbml0aWFsUmF0aW5nO1xuICAgICAgICAgICAgICAgIHZhciBiYXNlVmFsdWUgPSAkLmlzTnVtZXJpYyhyYXRpbmdWYWx1ZSgpKSA/IHJhdGluZ1ZhbHVlKCkgOiAwO1xuICAgICAgICAgICAgICAgIHZhciBmID0gZnJhY3Rpb24oaW5pdGlhbFJhdGluZyk7XG4gICAgICAgICAgICAgICAgdmFyICRhbGwsICRmcmFjdGlvbmFsO1xuXG4gICAgICAgICAgICAgICAgcmVzZXRTdHlsZSgpO1xuXG4gICAgICAgICAgICAgICAgLy8gYWRkIGNsYXNzZXNcbiAgICAgICAgICAgICAgICAkYS5hZGRDbGFzcygnYnItc2VsZWN0ZWQgYnItY3VycmVudCcpW25leHRBbGxvclByZXZpb3VzQWxsKCldKClcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdici1zZWxlY3RlZCcpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFnZXREYXRhKCdyYXRpbmdNYWRlJykgJiYgJC5pc051bWVyaWMoaW5pdGlhbFJhdGluZykpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKChpbml0aWFsUmF0aW5nIDw9IGJhc2VWYWx1ZSkgfHwgIWYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICRhbGwgPSBzZWxmLiR3aWRnZXQuZmluZCgnYScpO1xuXG4gICAgICAgICAgICAgICAgICAgICRmcmFjdGlvbmFsID0gKCRhLmxlbmd0aCkgP1xuICAgICAgICAgICAgICAgICAgICAgICAgJGFbKGdldERhdGEoJ3VzZXJPcHRpb25zJykucmV2ZXJzZSkgPyAncHJldicgOiAnbmV4dCddKCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgJGFsbFsoZ2V0RGF0YSgndXNlck9wdGlvbnMnKS5yZXZlcnNlKSA/ICdsYXN0JyA6ICdmaXJzdCddKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgJGZyYWN0aW9uYWwuYWRkQ2xhc3MoJ2JyLWZyYWN0aW9uYWwnKTtcbiAgICAgICAgICAgICAgICAgICAgJGZyYWN0aW9uYWwuYWRkQ2xhc3MoJ2JyLWZyYWN0aW9uYWwtJyArIGYpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIHRoZSBlbGVtZW50IGlzIGRlc2VsZWN0YWJsZT9cbiAgICAgICAgICAgIHZhciBpc0Rlc2VsZWN0YWJsZSA9IGZ1bmN0aW9uKCRlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgaWYgKCFnZXREYXRhKCdhbGxvd0VtcHR5JykgfHwgIWdldERhdGEoJ3VzZXJPcHRpb25zJykuZGVzZWxlY3RhYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKHJhdGluZ1ZhbHVlKCkgPT0gJGVsZW1lbnQuYXR0cignZGF0YS1yYXRpbmctdmFsdWUnKSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBoYW5kbGUgY2xpY2sgZXZlbnRzXG4gICAgICAgICAgICB2YXIgYXR0YWNoQ2xpY2tIYW5kbGVyID0gZnVuY3Rpb24oJGVsZW1lbnRzKSB7XG4gICAgICAgICAgICAgICAgJGVsZW1lbnRzLm9uKCdjbGljay5iYXJyYXRpbmcnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgJGEgPSAkKHRoaXMpLFxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucyA9IGdldERhdGEoJ3VzZXJPcHRpb25zJyksXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ7XG5cbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9ICRhLmF0dHIoJ2RhdGEtcmF0aW5nLXZhbHVlJyk7XG4gICAgICAgICAgICAgICAgICAgIHRleHQgPSAkYS5hdHRyKCdkYXRhLXJhdGluZy10ZXh0Jyk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gaXMgY3VycmVudCBhbmQgZGVzZWxlY3RhYmxlP1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNEZXNlbGVjdGFibGUoJGEpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGdldERhdGEoJ2VtcHR5UmF0aW5nVmFsdWUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQgPSBnZXREYXRhKCdlbXB0eVJhdGluZ1RleHQnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlbWVtYmVyIHNlbGVjdGVkIHJhdGluZ1xuICAgICAgICAgICAgICAgICAgICBzZXREYXRhKCdyYXRpbmdWYWx1ZScsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgc2V0RGF0YSgncmF0aW5nVGV4dCcsIHRleHQpO1xuICAgICAgICAgICAgICAgICAgICBzZXREYXRhKCdyYXRpbmdNYWRlJywgdHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgc2V0U2VsZWN0RmllbGRWYWx1ZSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHNob3dTZWxlY3RlZFJhdGluZyh0ZXh0KTtcblxuICAgICAgICAgICAgICAgICAgICBhcHBseVN0eWxlKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gb25TZWxlY3QgY2FsbGJhY2tcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5vblNlbGVjdC5jYWxsKFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZixcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhdGluZ1ZhbHVlKCksXG4gICAgICAgICAgICAgICAgICAgICAgICByYXRpbmdUZXh0KCksXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudFxuICAgICAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIGhhbmRsZSBtb3VzZWVudGVyIGV2ZW50c1xuICAgICAgICAgICAgdmFyIGF0dGFjaE1vdXNlRW50ZXJIYW5kbGVyID0gZnVuY3Rpb24oJGVsZW1lbnRzKSB7XG4gICAgICAgICAgICAgICAgJGVsZW1lbnRzLm9uKCdtb3VzZWVudGVyLmJhcnJhdGluZycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgJGEgPSAkKHRoaXMpO1xuXG4gICAgICAgICAgICAgICAgICAgIHJlc2V0U3R5bGUoKTtcblxuICAgICAgICAgICAgICAgICAgICAkYS5hZGRDbGFzcygnYnItYWN0aXZlJylbbmV4dEFsbG9yUHJldmlvdXNBbGwoKV0oKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdici1hY3RpdmUnKTtcblxuICAgICAgICAgICAgICAgICAgICBzaG93U2VsZWN0ZWRSYXRpbmcoJGEuYXR0cignZGF0YS1yYXRpbmctdGV4dCcpKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIGhhbmRsZSBtb3VzZWxlYXZlIGV2ZW50c1xuICAgICAgICAgICAgdmFyIGF0dGFjaE1vdXNlTGVhdmVIYW5kbGVyID0gZnVuY3Rpb24oJGVsZW1lbnRzKSB7XG4gICAgICAgICAgICAgICAgc2VsZi4kd2lkZ2V0Lm9uKCdtb3VzZWxlYXZlLmJhcnJhdGluZyBibHVyLmJhcnJhdGluZycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBzaG93U2VsZWN0ZWRSYXRpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgYXBwbHlTdHlsZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gc29tZXdoYXQgcHJpbWl0aXZlIHdheSB0byByZW1vdmUgMzAwbXMgY2xpY2sgZGVsYXkgb24gdG91Y2ggZGV2aWNlc1xuICAgICAgICAgICAgLy8gZm9yIGEgbW9yZSBhZHZhbmNlZCBzb2x1dGlvbiBjb25zaWRlciBzZXR0aW5nIGBmYXN0Q2xpY2tzYCBvcHRpb24gdG8gZmFsc2VcbiAgICAgICAgICAgIC8vIGFuZCB1c2luZyBhIGxpYnJhcnkgc3VjaCBhcyBmYXN0Y2xpY2sgKGh0dHBzOi8vZ2l0aHViLmNvbS9mdGxhYnMvZmFzdGNsaWNrKVxuICAgICAgICAgICAgdmFyIGZhc3RDbGlja3MgPSBmdW5jdGlvbigkZWxlbWVudHMpIHtcbiAgICAgICAgICAgICAgICAkZWxlbWVudHMub24oJ3RvdWNoc3RhcnQuYmFycmF0aW5nJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5jbGljaygpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gZGlzYWJsZSBjbGlja3NcbiAgICAgICAgICAgIHZhciBkaXNhYmxlQ2xpY2tzID0gZnVuY3Rpb24oJGVsZW1lbnRzKSB7XG4gICAgICAgICAgICAgICAgJGVsZW1lbnRzLm9uKCdjbGljay5iYXJyYXRpbmcnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdmFyIGF0dGFjaEhhbmRsZXJzID0gZnVuY3Rpb24oJGVsZW1lbnRzKSB7XG4gICAgICAgICAgICAgICAgLy8gYXR0YWNoIGNsaWNrIGV2ZW50IGhhbmRsZXJcbiAgICAgICAgICAgICAgICBhdHRhY2hDbGlja0hhbmRsZXIoJGVsZW1lbnRzKTtcblxuICAgICAgICAgICAgICAgIGlmIChzZWxmLm9wdGlvbnMuaG92ZXJTdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBhdHRhY2ggbW91c2VlbnRlciBldmVudCBoYW5kbGVyXG4gICAgICAgICAgICAgICAgICAgIGF0dGFjaE1vdXNlRW50ZXJIYW5kbGVyKCRlbGVtZW50cyk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gYXR0YWNoIG1vdXNlbGVhdmUgZXZlbnQgaGFuZGxlclxuICAgICAgICAgICAgICAgICAgICBhdHRhY2hNb3VzZUxlYXZlSGFuZGxlcigkZWxlbWVudHMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHZhciBkZXRhY2hIYW5kbGVycyA9IGZ1bmN0aW9uKCRlbGVtZW50cykge1xuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBldmVudCBoYW5kbGVycyBpbiB0aGUgXCIuYmFycmF0aW5nXCIgbmFtZXNwYWNlXG4gICAgICAgICAgICAgICAgJGVsZW1lbnRzLm9mZignLmJhcnJhdGluZycpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdmFyIHNldHVwSGFuZGxlcnMgPSBmdW5jdGlvbihyZWFkb25seSkge1xuICAgICAgICAgICAgICAgIHZhciAkZWxlbWVudHMgPSBzZWxmLiR3aWRnZXQuZmluZCgnYScpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGZhc3RDbGlja3MpIHtcbiAgICAgICAgICAgICAgICAgICAgZmFzdENsaWNrcygkZWxlbWVudHMpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChyZWFkb25seSkge1xuICAgICAgICAgICAgICAgICAgICBkZXRhY2hIYW5kbGVycygkZWxlbWVudHMpO1xuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlQ2xpY2tzKCRlbGVtZW50cyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYXR0YWNoSGFuZGxlcnMoJGVsZW1lbnRzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLnNob3cgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAvLyBydW4gb25seSBvbmNlXG4gICAgICAgICAgICAgICAgaWYgKGdldERhdGEoKSkgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgLy8gd3JhcCBlbGVtZW50XG4gICAgICAgICAgICAgICAgd3JhcEVsZW1lbnQoKTtcblxuICAgICAgICAgICAgICAgIC8vIHNhdmUgZGF0YVxuICAgICAgICAgICAgICAgIHNhdmVEYXRhT25FbGVtZW50KCk7XG5cbiAgICAgICAgICAgICAgICAvLyBidWlsZCAmIGFwcGVuZCB3aWRnZXQgdG8gdGhlIERPTVxuICAgICAgICAgICAgICAgIHNlbGYuJHdpZGdldCA9IGJ1aWxkV2lkZ2V0KCk7XG4gICAgICAgICAgICAgICAgc2VsZi4kd2lkZ2V0Lmluc2VydEFmdGVyKHNlbGYuJGVsZW0pO1xuXG4gICAgICAgICAgICAgICAgYXBwbHlTdHlsZSgpO1xuXG4gICAgICAgICAgICAgICAgc2hvd1NlbGVjdGVkUmF0aW5nKCk7XG5cbiAgICAgICAgICAgICAgICBzZXR1cEhhbmRsZXJzKHNlbGYub3B0aW9ucy5yZWFkb25seSk7XG5cbiAgICAgICAgICAgICAgICAvLyBoaWRlIHRoZSBzZWxlY3QgZmllbGRcbiAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLmhpZGUoKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMucmVhZG9ubHkgPSBmdW5jdGlvbihzdGF0ZSkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygc3RhdGUgIT09ICdib29sZWFuJyB8fCBnZXREYXRhKCdyZWFkT25seScpID09IHN0YXRlKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICBzZXR1cEhhbmRsZXJzKHN0YXRlKTtcbiAgICAgICAgICAgICAgICBzZXREYXRhKCdyZWFkT25seScsIHN0YXRlKTtcbiAgICAgICAgICAgICAgICBzZWxmLiR3aWRnZXQudG9nZ2xlQ2xhc3MoJ2JyLXJlYWRvbmx5Jyk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLnNldCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSBnZXREYXRhKCd1c2VyT3B0aW9ucycpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuJGVsZW0uZmluZCgnb3B0aW9uW3ZhbHVlPVwiJyArIHZhbHVlICsgJ1wiXScpLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgLy8gc2V0IGRhdGFcbiAgICAgICAgICAgICAgICBzZXREYXRhKCdyYXRpbmdWYWx1ZScsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICBzZXREYXRhKCdyYXRpbmdUZXh0Jywgc2VsZi4kZWxlbS5maW5kKCdvcHRpb25bdmFsdWU9XCInICsgdmFsdWUgKyAnXCJdJykudGV4dCgpKTtcbiAgICAgICAgICAgICAgICBzZXREYXRhKCdyYXRpbmdNYWRlJywgdHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICBzZXRTZWxlY3RGaWVsZFZhbHVlKHJhdGluZ1ZhbHVlKCkpO1xuICAgICAgICAgICAgICAgIHNob3dTZWxlY3RlZFJhdGluZyhyYXRpbmdUZXh0KCkpO1xuXG4gICAgICAgICAgICAgICAgYXBwbHlTdHlsZSgpO1xuXG4gICAgICAgICAgICAgICAgLy8gb25TZWxlY3QgY2FsbGJhY2tcbiAgICAgICAgICAgICAgICBpZiAoIW9wdGlvbnMuc2lsZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMub25TZWxlY3QuY2FsbChcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMsXG4gICAgICAgICAgICAgICAgICAgICAgICByYXRpbmdWYWx1ZSgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmF0aW5nVGV4dCgpXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy5jbGVhciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBvcHRpb25zID0gZ2V0RGF0YSgndXNlck9wdGlvbnMnKTtcblxuICAgICAgICAgICAgICAgIC8vIHJlc3RvcmUgb3JpZ2luYWwgZGF0YVxuICAgICAgICAgICAgICAgIHNldERhdGEoJ3JhdGluZ1ZhbHVlJywgZ2V0RGF0YSgnb3JpZ2luYWxSYXRpbmdWYWx1ZScpKTtcbiAgICAgICAgICAgICAgICBzZXREYXRhKCdyYXRpbmdUZXh0JywgZ2V0RGF0YSgnb3JpZ2luYWxSYXRpbmdUZXh0JykpO1xuICAgICAgICAgICAgICAgIHNldERhdGEoJ3JhdGluZ01hZGUnLCBmYWxzZSk7XG5cbiAgICAgICAgICAgICAgICByZXNldFNlbGVjdEZpZWxkKCk7XG4gICAgICAgICAgICAgICAgc2hvd1NlbGVjdGVkUmF0aW5nKHJhdGluZ1RleHQoKSk7XG5cbiAgICAgICAgICAgICAgICBhcHBseVN0eWxlKCk7XG5cbiAgICAgICAgICAgICAgICAvLyBvbkNsZWFyIGNhbGxiYWNrXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5vbkNsZWFyLmNhbGwoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMsXG4gICAgICAgICAgICAgICAgICAgIHJhdGluZ1ZhbHVlKCksXG4gICAgICAgICAgICAgICAgICAgIHJhdGluZ1RleHQoKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3kgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSByYXRpbmdWYWx1ZSgpO1xuICAgICAgICAgICAgICAgIHZhciB0ZXh0ID0gcmF0aW5nVGV4dCgpO1xuICAgICAgICAgICAgICAgIHZhciBvcHRpb25zID0gZ2V0RGF0YSgndXNlck9wdGlvbnMnKTtcblxuICAgICAgICAgICAgICAgIC8vIGRldGFjaCBoYW5kbGVyc1xuICAgICAgICAgICAgICAgIGRldGFjaEhhbmRsZXJzKHNlbGYuJHdpZGdldC5maW5kKCdhJykpO1xuXG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIHdpZGdldFxuICAgICAgICAgICAgICAgIHNlbGYuJHdpZGdldC5yZW1vdmUoKTtcblxuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBkYXRhXG4gICAgICAgICAgICAgICAgcmVtb3ZlRGF0YU9uRWxlbWVudCgpO1xuXG4gICAgICAgICAgICAgICAgLy8gdW53cmFwIHRoZSBlbGVtZW50XG4gICAgICAgICAgICAgICAgdW53cmFwRWxlbWVudCgpO1xuXG4gICAgICAgICAgICAgICAgLy8gc2hvdyB0aGUgZWxlbWVudFxuICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0uc2hvdygpO1xuXG4gICAgICAgICAgICAgICAgLy8gb25EZXN0cm95IGNhbGxiYWNrXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5vbkRlc3Ryb3kuY2FsbChcbiAgICAgICAgICAgICAgICAgICAgdGhpcyxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIHRleHRcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIEJhclJhdGluZy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uIChvcHRpb25zLCBlbGVtKSB7XG4gICAgICAgICAgICB0aGlzLiRlbGVtID0gJChlbGVtKTtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCAkLmZuLmJhcnJhdGluZy5kZWZhdWx0cywgb3B0aW9ucyk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnM7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIEJhclJhdGluZztcbiAgICB9KSgpO1xuXG4gICAgJC5mbi5iYXJyYXRpbmcgPSBmdW5jdGlvbiAobWV0aG9kLCBvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHBsdWdpbiA9IG5ldyBCYXJSYXRpbmcoKTtcblxuICAgICAgICAgICAgLy8gcGx1Z2luIHdvcmtzIHdpdGggc2VsZWN0IGZpZWxkc1xuICAgICAgICAgICAgaWYgKCEkKHRoaXMpLmlzKCdzZWxlY3QnKSkge1xuICAgICAgICAgICAgICAgICQuZXJyb3IoJ1NvcnJ5LCB0aGlzIHBsdWdpbiBvbmx5IHdvcmtzIHdpdGggc2VsZWN0IGZpZWxkcy4nKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gbWV0aG9kIHN1cHBsaWVkXG4gICAgICAgICAgICBpZiAocGx1Z2luLmhhc093blByb3BlcnR5KG1ldGhvZCkpIHtcbiAgICAgICAgICAgICAgICBwbHVnaW4uaW5pdChvcHRpb25zLCB0aGlzKTtcbiAgICAgICAgICAgICAgICBpZiAobWV0aG9kID09PSAnc2hvdycpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBsdWdpbi5zaG93KG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHBsdWdpbiBleGlzdHM/XG4gICAgICAgICAgICAgICAgICAgIGlmIChwbHVnaW4uJGVsZW0uZGF0YSgnYmFycmF0aW5nJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsdWdpbi4kd2lkZ2V0ID0gJCh0aGlzKS5uZXh0KCcuYnItd2lkZ2V0Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGx1Z2luW21ldGhvZF0ob3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIG5vIG1ldGhvZCBzdXBwbGllZCBvciBvbmx5IG9wdGlvbnMgc3VwcGxpZWRcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG1ldGhvZCA9PT0gJ29iamVjdCcgfHwgIW1ldGhvZCkge1xuICAgICAgICAgICAgICAgIG9wdGlvbnMgPSBtZXRob2Q7XG4gICAgICAgICAgICAgICAgcGx1Z2luLmluaXQob3B0aW9ucywgdGhpcyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBsdWdpbi5zaG93KCk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJC5lcnJvcignTWV0aG9kICcgKyBtZXRob2QgKyAnIGRvZXMgbm90IGV4aXN0IG9uIGpRdWVyeS5iYXJyYXRpbmcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgICQuZm4uYmFycmF0aW5nLmRlZmF1bHRzID0ge1xuICAgICAgICB0aGVtZTonJyxcbiAgICAgICAgaW5pdGlhbFJhdGluZzpudWxsLCAvLyBpbml0aWFsIHJhdGluZ1xuICAgICAgICBhbGxvd0VtcHR5Om51bGwsIC8vIGFsbG93IGVtcHR5IHJhdGluZ3M/XG4gICAgICAgIGVtcHR5VmFsdWU6JycsIC8vIHRoaXMgaXMgdGhlIGV4cGVjdGVkIHZhbHVlIG9mIHRoZSBlbXB0eSByYXRpbmdcbiAgICAgICAgc2hvd1ZhbHVlczpmYWxzZSwgLy8gZGlzcGxheSByYXRpbmcgdmFsdWVzIG9uIHRoZSBiYXJzP1xuICAgICAgICBzaG93U2VsZWN0ZWRSYXRpbmc6dHJ1ZSwgLy8gYXBwZW5kIGEgZGl2IHdpdGggYSByYXRpbmcgdG8gdGhlIHdpZGdldD9cbiAgICAgICAgZGVzZWxlY3RhYmxlOnRydWUsIC8vIGFsbG93IHRvIGRlc2VsZWN0IHJhdGluZ3M/XG4gICAgICAgIHJldmVyc2U6ZmFsc2UsIC8vIHJldmVyc2UgdGhlIHJhdGluZz9cbiAgICAgICAgcmVhZG9ubHk6ZmFsc2UsIC8vIG1ha2UgdGhlIHJhdGluZyByZWFkeS1vbmx5P1xuICAgICAgICBmYXN0Q2xpY2tzOnRydWUsIC8vIHJlbW92ZSAzMDBtcyBjbGljayBkZWxheSBvbiB0b3VjaCBkZXZpY2VzP1xuICAgICAgICBob3ZlclN0YXRlOnRydWUsIC8vIGNoYW5nZSBzdGF0ZSBvbiBob3Zlcj9cbiAgICAgICAgc2lsZW50OmZhbHNlLCAvLyBzdXByZXNzIGNhbGxiYWNrcyB3aGVuIGNvbnRyb2xsaW5nIHJhdGluZ3MgcHJvZ3JhbWF0aWNhbGx5XG4gICAgICAgIG9uU2VsZWN0OmZ1bmN0aW9uICh2YWx1ZSwgdGV4dCwgZXZlbnQpIHtcbiAgICAgICAgfSwgLy8gY2FsbGJhY2sgZmlyZWQgd2hlbiBhIHJhdGluZyBpcyBzZWxlY3RlZFxuICAgICAgICBvbkNsZWFyOmZ1bmN0aW9uICh2YWx1ZSwgdGV4dCkge1xuICAgICAgICB9LCAvLyBjYWxsYmFjayBmaXJlZCB3aGVuIGEgcmF0aW5nIGlzIGNsZWFyZWRcbiAgICAgICAgb25EZXN0cm95OmZ1bmN0aW9uICh2YWx1ZSwgdGV4dCkge1xuICAgICAgICB9IC8vIGNhbGxiYWNrIGZpcmVkIHdoZW4gYSB3aWRnZXQgaXMgZGVzdHJveWVkXG4gICAgfTtcblxuICAgICQuZm4uYmFycmF0aW5nLkJhclJhdGluZyA9IEJhclJhdGluZztcblxufSkpO1xuIiwiLyoqXG4gKiBAcGFja2FnZSAgICBLbm93IFJlc2VydmF0aW9uc1xuICogQHN1YnBhY2thZ2UgU2l0ZSBKU1xuICogQGNvcHlyaWdodCAgMjAyMCBIaWdobGFuZCBWaXNpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBAbGljZW5zZSAgICBTZWUgdGhlIGZpbGUgXCJMSUNFTlNFLnR4dFwiIGZvciB0aGUgZnVsbCBsaWNlbnNlIGdvdmVybmluZyB0aGlzIGNvZGUuXG4gKiBAYXV0aG9yICAgICBIYXplbCBXaWxzb24gPGhhemVsQGhpZ2hsYW5kdmlzaW9uLmNvbT5cbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxubGV0IHNlYXJjaERhdGEgPSBbXTtcbmxldCBzZWFyY2hEb25lID0gZmFsc2U7XG5sZXQgY2FsZW5kYXJMb2FkZWQgPSBmYWxzZTtcbmxldCBzYXZlZHdpZHRoID0gZmFsc2U7XG5sZXQgbGFyZ2U7XG5sZXQgcmVzaXplZCA9IGZhbHNlO1xubGV0IHNjbG9hZGVkID0gZmFsc2U7XG5cbihmdW5jdGlvbiAoJCkge1xuXHQkKGZ1bmN0aW9uICgpIHtcblx0XHQkKGRvY3VtZW50KS5mb3VuZGF0aW9uKCk7XG5cblx0XHRjaGVja1NjcmVlbldpZHRoKCk7XG5cdFx0JCh3aW5kb3cpLm9uKFwicmVzaXplXCIsIGZ1bmN0aW9uICgpIHtcblx0XHRcdGNoZWNrU2NyZWVuV2lkdGgoKTtcblx0XHR9KTtcblxuXHRcdGNvbnN0IGJhcnMgPSAkKCcua3ItcmF0aW5nJyk7XG5cdFx0aWYgKGJhcnMubGVuZ3RoKSB7XG5cdFx0XHRiYXJzLmJhcnJhdGluZygnc2hvdycsIHtcblx0XHRcdFx0c2hvd1ZhbHVlczogdHJ1ZSxcblx0XHRcdFx0c2hvd1NlbGVjdGVkUmF0aW5nOiBmYWxzZVxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgJGN0cmlnZ2VyID0gJCgnI2tyLXBhZ2UtZ2VyaWF0cmljLWNhbGVuZGFyLXRyaWdnZXInKTtcblx0XHRpZiAoJGN0cmlnZ2VyLmxlbmd0aCAmJiAhY2FsZW5kYXJMb2FkZWQpIHtcblx0XHRcdGxvYWRDYWxlbmRhcigkY3RyaWdnZXIuZGF0YSgncGlkJyksICRjdHJpZ2dlci5kYXRhKCd0YXJnZXQnKSk7XG5cdFx0XHRjYWxlbmRhckxvYWRlZCA9IHRydWU7XG5cdFx0XHRjb25zdCBzdGlja3kgPSAkKCcuc3RpY2t5Jyk7XG5cdFx0XHRpZiAoc3RpY2t5Lmxlbmd0aCkge1xuXHRcdFx0XHRzdGlja3kuZm91bmRhdGlvbignX2NhbGMnLCB0cnVlKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQkKGRvY3VtZW50KS5vbignc3VibWl0JywgJy5hamF4Zm9ybScsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRjb25zdCAkZm9ybSA9ICQodGhpcyk7XG5cdFx0XHQkLmFqYXgoe1xuXHRcdFx0XHR0eXBlOiAnUE9TVCcsXG5cdFx0XHRcdHVybDogJGZvcm0uYXR0cignYWN0aW9uJyksXG5cdFx0XHRcdGRhdGE6ICRmb3JtLnNlcmlhbGl6ZSgpLFxuXHRcdFx0XHRkYXRhVHlwZTogJ2pzb24nLFxuXHRcdFx0XHRzdWNjZXNzOiBmdW5jdGlvbiAocmVzdWx0KSB7XG5cdFx0XHRcdFx0aWYgKHJlc3VsdC5zdWNjZXNzKSB7XG5cdFx0XHRcdFx0XHRpZiAocmVzdWx0LmRhdGEpIHtcblx0XHRcdFx0XHRcdFx0Zm9ybVJlc3BvbnNlKCRmb3JtLmF0dHIoJ2lkJyksIHJlc3VsdC5kYXRhKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy8nO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHQkKCcua3ItYWpheC1tb2RhbC1lcnJvci1tZXNzYWdlJykuaHRtbChyZXN1bHQubWVzc2FnZSk7XG5cdFx0XHRcdFx0XHRjb25zdCAkbW9kYWwgPSBuZXcgRm91bmRhdGlvbi5SZXZlYWwoJCgnI0tyQWpheE1vZGFsRXJyb3InKSk7XG5cdFx0XHRcdFx0XHQkbW9kYWwub3BlbigpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0ZXJyb3I6IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHQkKCcua3ItYWpheC1tb2RhbC1lcnJvci1tZXNzYWdlJykuaHRtbCgnU29ycnkgYW4gZXJyb3IgaGFzIG9jY3VycmVkLCBwbGVhc2UgdHJ5IGFnYWluJyk7XG5cdFx0XHRcdFx0Y29uc3QgJG1vZGFsID0gbmV3IEZvdW5kYXRpb24uUmV2ZWFsKCQoJyNLckFqYXhNb2RhbEVycm9yJykpO1xuXHRcdFx0XHRcdCRtb2RhbC5vcGVuKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0pLm9uKCdzaG93LnpmLmRyb3Bkb3duJywgJy5ub3Njcm9sbCcsIGZ1bmN0aW9uICgpIHtcblx0XHRcdCQoJ2JvZHknKS5hZGRDbGFzcyhcInN0YXRpY3BhbmVcIik7XG5cdFx0XHQkKHRoaXMpLmNzcygnb3BhY2l0eScsICcxJyk7XG5cdFx0fSkub24oJ2hpZGUuemYuZHJvcGRvd24nLCAnLm5vc2Nyb2xsJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0JCgnYm9keScpLnJlbW92ZUNsYXNzKFwic3RhdGljcGFuZVwiKTtcblx0XHRcdCQodGhpcykuY3NzKCdvcGFjaXR5JywgJzAnKTtcblx0XHR9KS5vbignaGlkZS56Zi5kcm9wZG93bicsICcja3ItcXVvdGUtZm9ybScsIGZ1bmN0aW9uICgpIHtcblx0XHRcdCQoJyNndWVzdHMnKS50cmlnZ2VyKCdjaGFuZ2UnKTtcblx0XHR9KS5vbignb3Blbi56Zi5yZXZlYWwnLCAnLmtyLWFqYXgtbW9kYWxbZGF0YS1yZXZlYWxdJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGNvbnN0IG1vZGFsaWQgPSBcIiNcIiArICQodGhpcykuYXR0cignaWQnKTtcblx0XHRcdGlmICghJC50cmltKCQobW9kYWxpZCkuaHRtbCgpKS5sZW5ndGgpIHtcblx0XHRcdFx0Y29uc3QgYWpheHVybCA9ICQodGhpcykuZGF0YSgnYWpheHVybCcpO1xuXHRcdFx0XHRpZiAoYWpheHVybCkge1xuXHRcdFx0XHRcdCQuYWpheCh7XG5cdFx0XHRcdFx0XHR0eXBlOiAnUE9TVCcsXG5cdFx0XHRcdFx0XHR1cmw6IGFqYXh1cmwsXG5cdFx0XHRcdFx0XHRzdWNjZXNzOiBmdW5jdGlvbiAoY29udGVudCkge1xuXHRcdFx0XHRcdFx0XHQkKG1vZGFsaWQpLmh0bWwoY29udGVudCkudHJpZ2dlcigncmVzaXplbWUuemYucmV2ZWFsJyk7XG5cdFx0XHRcdFx0XHRcdCQobW9kYWxpZCkuZm91bmRhdGlvbigpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSkub24oJ29wZW4uemYucmV2ZWFsJywgJyNrci1nYXRld2F5LW1vZGFsW2RhdGEtcmV2ZWFsXScsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRpZiAoIXNjbG9hZGVkKSB7XG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0JC5nZXRTY3JpcHQoJ21lZGlhL2NvbV9rbm93cmVzL2pzL3N0cmlwZWNoZWNrb3V0Lm1pbi5qcycpO1xuXHRcdFx0XHRzY2xvYWRlZCA9IHRydWU7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR2b2lkIGluaXRpYWxpemVTdHJpcGUoKTtcblx0XHRcdH1cblx0XHR9KS5vbignb3Blbi56Zi5yZXZlYWwnLCAnI2tyLXByb3BlcnR5LXNsaWRlc2hvdy1yZXZlYWxbZGF0YS1yZXZlYWxdJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0Y29uc3QgJHBzbGlkZXIgPSAkKCcja3ItcHJvcGVydHktc2xpZGVzaG93Jyk7XG5cdFx0XHQkcHNsaWRlci5zbGljaygnc2V0UG9zaXRpb24nKTtcblx0XHRcdCRwc2xpZGVyLnNsaWNrKCdyZWZyZXNoJyk7XG5cdFx0XHQkKCcja3ItcHJvcGVydHktdGh1bWJzJykuc2xpY2soKTtcblx0XHRcdCQoJyNrci1wcm9wZXJ0eS1hcnJvd3MnKS5zbGljaygpO1xuXHRcdFx0JHBzbGlkZXIuc2xpY2soKTtcblx0XHR9KS5vbignY2xpY2snLCAnLmZhdnNwYW4nLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0Y29uc3QgcGlkID0gJCh0aGlzKS5kYXRhKCdwcm9wZXJ0eScpO1xuXHRcdFx0Y29uc3QgYmFyID0gJCgnLmtyLXNlYXJjaGJhciBhLmlzLWFjdGl2ZScpLmRhdGEoJ2JhcicpO1xuXHRcdFx0JC5hamF4KHtcblx0XHRcdFx0dHlwZTogJ1BPU1QnLFxuXHRcdFx0XHR1cmw6ICcvaW5kZXgucGhwP29wdGlvbj1jb21fa25vd3JlcyZ0YXNrPXByb3BlcnRpZXMuZmF2b3VyaXRlJyxcblx0XHRcdFx0ZGF0YTogeydwcm9wZXJ0eV9pZCc6IHBpZH0sXG5cdFx0XHRcdGRhdGFUeXBlOiAnanNvbicsXG5cdFx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXN1bHQpIHtcblx0XHRcdFx0XHRpZiAocmVzdWx0LnN1Y2Nlc3MpIHtcblx0XHRcdFx0XHRcdGdldFByb3BlcnRpZXMoYmFyKTtcblx0XHRcdFx0XHRcdCQoJy5mYXZpY29uLXRvcCcpLmZvdW5kYXRpb24oJ2hpZGUnKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0pLm9uKCdjbGljaycsICcuZ2V0UmVzcG9uc2VTZWFyY2gnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0aWYgKCQodGhpcykuZGF0YSgnYWN0aW9uJykgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRnZXRQcm9wZXJ0aWVzKCQodGhpcykuZGF0YSgnYmFyJykpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Z2V0UHJvcGVydGllcygkKHRoaXMpLmRhdGEoJ2JhcicpLCAkKHRoaXMpLmRhdGEoJ2FjdGlvbicpLCAkKHRoaXMpLmRhdGEoJ2FjdGlvbi12YWx1ZScpKTtcblx0XHRcdH1cblx0XHR9KS5vbignY2xpY2snLCAnLmtyLWZpbHRlcnMtY2xvc2UnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0JCgnLmtyLWZpbHRlcnMudG9wJykuYWRkQ2xhc3MoJ2hpZGVtZScpO1xuXHRcdFx0JCh0aGlzKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cdFx0fSkub24oJ2NsaWNrJywgJy5rci1maWx0ZXJzIHVsLmZpbHRlci1zb3J0LWxpc3QgbGkuaGVhZCcsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHQkKHRoaXMpLnBhcmVudCgpLmNoaWxkcmVuKCdsaS5maWx0ZXItaXRlbScpLnRvZ2dsZSgpO1xuXHRcdFx0JCh0aGlzKS50b2dnbGVDbGFzcygnYWN0aXZlJyk7XG5cdFx0fSkub24oJ2NsaWNrJywgJyNzaG93Z2F0ZXdheXMnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0JCgnI2tyLWdhdGV3YXlzJykudG9nZ2xlQ2xhc3MoJ2hpZGVtZScpO1xuXHRcdH0pLm9uKCdjbGljaycsICdhLmtyLXNlYXJjaGJhcicsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRzZXRBY3RpdmVNZW51KCQodGhpcykuZGF0YSgnYmFyJykpO1xuXHRcdH0pLm9uKCdjbGljaycsICcudG9nZ2xlb3RoZXInLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0JCh0aGlzKS5kYXRhKCdvdGhlcicpLnRvZ2dsZSgpO1xuXHRcdH0pLm9uKCdjbGljaycsICcja3ItcHJvcGVydHktdGFicyBhW2hyZWY9XCIjY2FsZW5kYXJcIl0nLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0aWYgKCFjYWxlbmRhckxvYWRlZCkge1xuXHRcdFx0XHRjb25zdCBwaWQgPSAkKHRoaXMpLmRhdGEoJ3BpZCcpO1xuXHRcdFx0XHRsb2FkQ2FsZW5kYXIocGlkLCAnI2NhbGVuZGFyLnRhYnMtcGFuZWwnKTtcblx0XHRcdFx0Y2FsZW5kYXJMb2FkZWQgPSB0cnVlO1xuXHRcdFx0fVxuXHRcdH0pLm9uKCdtb3VzZW92ZXInLCAnI2tyLXRodW1iIGltZycsIGZ1bmN0aW9uICgpIHtcblx0XHRcdGxldCBwcm9wZXJ0eSA9ICQodGhpcykucGFyZW50KCkuZGF0YSgnaWQnKTtcblx0XHRcdGlmIChwcm9wZXJ0eSkge1xuXHRcdFx0XHRsZXQgdGFyZ2V0ID0gJy50aHVtYm92ZXJ2aWV3JyArIHByb3BlcnR5O1xuXHRcdFx0XHQkKCcjcGluZm8nKS5odG1sKCQodGFyZ2V0KS5odG1sKCkpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0bGV0ICRwcm9wcyA9ICQoJy5rci1wcm9wZXJ0aWVzJyk7XG5cdFx0aWYgKCRwcm9wcy5sZW5ndGggJiYgIXNlYXJjaERvbmUpIHtcblx0XHRcdGdldFByb3BlcnRpZXMoJHByb3BzLmRhdGEoJ2JhcicpKTtcblx0XHR9XG5cdFx0bGV0ICR0YWJzID0gJCgnLnRhYnMnKTtcblx0XHRpZiAoJCgnI2tyLXByb3BlcnR5LXRhYnMnKS5sZW5ndGggJiYgIWNhbGVuZGFyTG9hZGVkKSB7XG5cdFx0XHQkdGFicy5maW5kKCdhJykuZWFjaChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdGlmICgkKHRoaXMpLmF0dHIoJ2hyZWYnKSA9PT0gXCIjY2FsZW5kYXJcIikge1xuXHRcdFx0XHRcdGNvbnN0IHBpZCA9ICQodGhpcykuZGF0YSgncGlkJyk7XG5cdFx0XHRcdFx0bG9hZENhbGVuZGFyKHBpZCwgJyNjYWxlbmRhci50YWJzLXBhbmVsJyk7XG5cdFx0XHRcdFx0Y2FsZW5kYXJMb2FkZWQgPSB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cdH0pO1xuXG5cdCQuZXZlbnQuc3BlY2lhbC50b3VjaHN0YXJ0ID0ge1xuXHRcdHNldHVwOiBmdW5jdGlvbiAoXywgbnMsIGhhbmRsZSkge1xuXHRcdFx0aWYgKG5zLmluY2x1ZGVzKFwibm9QcmV2ZW50RGVmYXVsdFwiKSkge1xuXHRcdFx0XHR0aGlzLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIGhhbmRsZSwge3Bhc3NpdmU6IGZhbHNlfSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIGhhbmRsZSwge3Bhc3NpdmU6IHRydWV9KTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG5cdCQuZXZlbnQuc3BlY2lhbC50b3VjaG1vdmUgPSB7XG5cdFx0c2V0dXA6IGZ1bmN0aW9uIChfLCBucywgaGFuZGxlKSB7XG5cdFx0XHRpZiAobnMuaW5jbHVkZXMoXCJub1ByZXZlbnREZWZhdWx0XCIpKSB7XG5cdFx0XHRcdHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLCBoYW5kbGUsIHtwYXNzaXZlOiBmYWxzZX0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5hZGRFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsIGhhbmRsZSwge3Bhc3NpdmU6IHRydWV9KTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG5cblx0ZnVuY3Rpb24gbG9hZENhbGVuZGFyKHBpZCwgdGFyZ2V0KSB7XG5cdFx0JC5hamF4KHtcblx0XHRcdHR5cGU6ICdQT1NUJyxcblx0XHRcdHVybDogJy9pbmRleC5waHA/b3B0aW9uPWNvbV9rbm93cmVzJnRhc2s9cHJvcGVydHkuZ2VyaWF0cmljJyxcblx0XHRcdGRhdGFUeXBlOiAnaHRtbCcsXG5cdFx0XHRkYXRhOiB7XG5cdFx0XHRcdCdwaWQnOiBwaWRcblx0XHRcdH0sXG5cdFx0XHRzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuXHRcdFx0XHQkKHRhcmdldCkuYXBwZW5kKGRhdGEpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0ZnVuY3Rpb24gZm9ybVJlc3BvbnNlKGlkLCBkYXRhKSB7XG5cdFx0aWYgKGRhdGEuaGFzT3duUHJvcGVydHkoJ3JlZGlyZWN0JykpIHtcblx0XHRcdHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKGRhdGEucmVkaXJlY3QpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAoaWQgPT09ICdrci1mb3JtLXBheW1lbnQnKSB7XG5cdFx0XHRcdGlmIChkYXRhLmhhc093blByb3BlcnR5KCdodG1sJykpIHtcblx0XHRcdFx0XHRsZXQgJG1vZGFsID0gJCgnI2tyLWdhdGV3YXktbW9kYWwnKTtcblx0XHRcdFx0XHQkbW9kYWwuaHRtbChkYXRhLmh0bWwpLnRyaWdnZXIoJ3Jlc2l6ZW1lLnpmLnJldmVhbCcpO1xuXHRcdFx0XHRcdCRtb2RhbC5mb3VuZGF0aW9uKCdvcGVuJyk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0d2luZG93LmxvY2F0aW9uLmhyZWYgPSAnLyc7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmIChpZCA9PT0gJ2tyLWZvcm0tbWFpbGNoaW1wJykge1xuXHRcdFx0XHRcdCQoJyNyZXNwb25zZTInKS5odG1sKGRhdGEpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gZ2V0UHJvcGVydGllcyhiYXIsIGFjdGlvbiA9ICcnLCBhY3Rpb25fdmFsdWUgPSAnJykge1xuXHRcdCQuYWpheCh7XG5cdFx0XHR1cmw6ICcvaW5kZXgucGhwP29wdGlvbj1jb21fa25vd3JlcyZ0YXNrPXByb3BlcnRpZXMucmF3Jyxcblx0XHRcdHR5cGU6ICdQT1NUJyxcblx0XHRcdGRhdGE6IHsnYmFyJzogYmFyLCAnYWN0aW9uJzogYWN0aW9uLCAnYWN0aW9uX3ZhbHVlJzogYWN0aW9uX3ZhbHVlfSxcblx0XHRcdGRhdGFUeXBlOiAnanNvbicsXG5cdFx0XHRzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuXHRcdFx0XHRpZiAoIWRhdGEpIHtcblx0XHRcdFx0XHR3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Y29uc3QgdmFscyA9IFsnZ3JpZCcsICdsaXN0JywgJ2ZhdnMnLCAnbWFwJ107XG5cdFx0XHRcdGlmICh2YWxzLmluY2x1ZGVzKGRhdGEuYmFyKSkge1xuXHRcdFx0XHRcdHNldEFjdGl2ZU1lbnUoZGF0YS5iYXIpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0c2V0U2VhcmNoRGF0YShkYXRhLCBkYXRhLmJhcik7XG5cdFx0XHRcdCQoJy5oYXMtdGlwJykuZm91bmRhdGlvbigpO1xuXHRcdFx0XHQkKCcuZHJvcGRvd24tcGFuZScpLmZvdW5kYXRpb24oKTtcblx0XHRcdFx0JCgnLmtyLXByb3BlcnR5IC5jYXJkJykuZm91bmRhdGlvbigpO1xuXHRcdFx0XHQkKCcja3Itb3JkZXItY2xvc2UnKS50cmlnZ2VyKCdjbGljaycpO1xuXHRcdFx0XHRzZWFyY2hEb25lID0gdHJ1ZTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdGZ1bmN0aW9uIHNldFNlYXJjaERhdGEocmVzcG9uc2UsIGFjdGlvbiA9ICcnKSB7XG5cdFx0bGV0ICRzaWRlYmFyO1xuXHRcdGlmIChyZXNwb25zZSkge1xuXHRcdFx0JCgnI2tyLXByb3BlcnRpZXMtZGF0YScpLmVtcHR5KCkuZmFkZUluKCdzbG93JykuaHRtbChyZXNwb25zZVsnaXRlbXMnXSkuZm91bmRhdGlvbigpO1xuXHRcdFx0JCgnLmtyLXBhZ2VyJykuaHRtbChyZXNwb25zZVsncGFnaW5hdGlvbiddKTtcblx0XHRcdCQoJy5rci1wYWdlci5ib3R0b20nKS5odG1sKHJlc3BvbnNlWydwYWdpbmF0aW9uJ10pO1xuXHRcdFx0JChcIiNrci1vZmZjYW52YXMtcHJvcGVydGllcy1maWx0ZXJcIikuaHRtbChyZXNwb25zZVsnZmlsdGVycyddKTtcblx0XHRcdCQoXCIja3Itb2ZmY2FudmFzLXByb3BlcnRpZXMtc29ydGJ5XCIpLmh0bWwocmVzcG9uc2VbJ3NvcnRieSddKTtcblx0XHRcdCQoJyNrci1wcm9wZXJ0aWVzLWZpbHRlci1jb3VudCcpLmh0bWwocmVzcG9uc2VbJ3Bjb3VudCddKTtcblx0XHRcdCRzaWRlYmFyID0gJChcIiNrci1zaWRlYmFyLXNlYXJjaFwiKTtcblx0XHRcdGlmICgkc2lkZWJhci5sZW5ndGggJiYgcmVzcG9uc2VbJ3NlYXJjaCddLmxlbmd0aCkge1xuXHRcdFx0XHQkc2lkZWJhci5lbXB0eSgpLmh0bWwocmVzcG9uc2VbJ3NlYXJjaCddKTtcblx0XHRcdFx0JCgnYm9keScpLnRyaWdnZXIoJ2luaXRhamF4c2VhcmNoJyk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChhY3Rpb24gPT09ICdwYWdlJykge1xuXHRcdFx0XHRjb25zdCBzdGlja3kgPSAkKCcuc3RpY2t5Jyk7XG5cdFx0XHRcdGlmIChzdGlja3kubGVuZ3RoKSB7XG5cdFx0XHRcdFx0c3RpY2t5LmZvdW5kYXRpb24oJ19jYWxjJywgdHJ1ZSk7XG5cdFx0XHRcdFx0d2luZG93LnNjcm9sbFRvKDAsIDApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gc2V0QWN0aXZlTWVudShiYXIpIHtcblx0XHRjb25zdCBzZWFyY2hiYXIgPSAkKCcua3Itc2VhcmNoYmFyJykuZmluZCgnLmJ1dHRvbicpO1xuXHRcdCQuZWFjaChzZWFyY2hiYXIsIGZ1bmN0aW9uIChpbmRleCwgc2VhcmNoYmFyKSB7XG5cdFx0XHQkKHNlYXJjaGJhcikucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuXHRcdH0pO1xuXHRcdCQoJy5rci1zZWFyY2hiYXIgLmJ1dHRvbi4nICsgYmFyKS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XG5cdH1cblxuXHQvLyBSZXR1cm4gdHJ1ZSBpZiB3aWR0aCBoYXMgY2hhbmdlZFxuXHRmdW5jdGlvbiBzY3JlZW5XaWR0aEhhc0NoYW5nZWQoKSB7XG5cdFx0bGFyZ2UgPSBGb3VuZGF0aW9uLk1lZGlhUXVlcnkuYXRMZWFzdCgnbGFyZ2UnKTtcblx0XHRpZiAobGFyZ2UgIT09IHNhdmVkd2lkdGgpIHtcblx0XHRcdHNhdmVkd2lkdGggPSBsYXJnZTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gY2hlY2tTY3JlZW5XaWR0aCgpIHtcblx0XHRyZXNpemVkID0gZmFsc2U7XG5cdFx0aWYgKHNjcmVlbldpZHRoSGFzQ2hhbmdlZCgpICYmIHNlYXJjaERhdGFbJ2l0ZW1zJ10gJiYgIXJlc2l6ZWQpIHtcblx0XHRcdHNldFNlYXJjaERhdGEoc2VhcmNoRGF0YSk7XG5cdFx0XHRyZXNpemVkID0gdHJ1ZTtcblx0XHR9XG5cdH1cblxuXHQkLmV2ZW50LnNwZWNpYWwudG91Y2hzdGFydCA9IHtcblx0XHRzZXR1cDogZnVuY3Rpb24gKF8sIG5zLCBoYW5kbGUpIHtcblx0XHRcdGlmIChucy5pbmNsdWRlcyhcIm5vUHJldmVudERlZmF1bHRcIikpIHtcblx0XHRcdFx0dGhpcy5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCBoYW5kbGUsIHtwYXNzaXZlOiBmYWxzZX0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCBoYW5kbGUsIHtwYXNzaXZlOiB0cnVlfSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xuXHQkLmV2ZW50LnNwZWNpYWwudG91Y2htb3ZlID0ge1xuXHRcdHNldHVwOiBmdW5jdGlvbiAoXywgbnMsIGhhbmRsZSkge1xuXHRcdFx0aWYgKG5zLmluY2x1ZGVzKFwibm9QcmV2ZW50RGVmYXVsdFwiKSkge1xuXHRcdFx0XHR0aGlzLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIiwgaGFuZGxlLCB7cGFzc2l2ZTogZmFsc2V9KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLCBoYW5kbGUsIHtwYXNzaXZlOiB0cnVlfSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xufShqUXVlcnkpKTsiLCIvKipcbiAqIEBwYWNrYWdlICAgIEtub3cgUmVzZXJ2YXRpb25zXG4gKiBAc3VicGFja2FnZSBTaXRlIEpTXG4gKiBAY29weXJpZ2h0ICAyMDIwIEhpZ2hsYW5kIFZpc2lvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIEBsaWNlbnNlICAgIFNlZSB0aGUgZmlsZSBcIkxJQ0VOU0UudHh0XCIgZm9yIHRoZSBmdWxsIGxpY2Vuc2UgZ292ZXJuaW5nIHRoaXMgY29kZS5cbiAqIEBhdXRob3IgICAgIEhhemVsIFdpbHNvbiA8aGF6ZWxAaGlnaGxhbmR2aXNpb24uY29tPlxuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24gKCQpIHtcblx0aWYgKCF3aW5kb3cubG9jYXRpb24ub3JpZ2luKSB7XG5cdFx0d2luZG93LmxvY2F0aW9uLm9yaWdpbiA9IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCArIFwiLy9cIiArIHdpbmRvdy5sb2NhdGlvbi5ob3N0O1xuXHR9XG5cblx0bGV0IG15Q29uZmlybSwgJG15VGFzaztcblxuXHRjbGFzcyBLcmNvbmZpcm0ge1xuXHRcdGNvbnN0cnVjdG9yKCRmb3JtKSB7XG5cdFx0XHR0aGlzLmZvcm0gPSAkZm9ybTtcblx0XHRcdHRoaXMuaW5pdCgpO1xuXHRcdH1cblxuXHRcdGluaXQoKSB7XG5cdFx0XHR0aGlzLnVwZGF0ZVF1b3RlKHRoaXMuZm9ybSk7XG5cdFx0fVxuXG5cdFx0dXBkYXRlUXVvdGUoJGZvcm0pIHtcblx0XHRcdCRteVRhc2sgPSAkKCcjbXl0YXNrJyk7XG5cdFx0XHQkbXlUYXNrLnZhbCgnY29uZmlybS5jb21wdXRlJyk7XG5cdFx0XHRqUXVlcnkuYWpheCh7XG5cdFx0XHRcdHR5cGU6ICdQT1NUJyxcblx0XHRcdFx0dXJsOiAnaW5kZXgucGhwP29wdGlvbj1jb21fa25vd3JlcyZ0YXNrPWNvbmZpcm0uY29tcHV0ZScsXG5cdFx0XHRcdGRhdGE6ICRmb3JtLnNlcmlhbGl6ZUFycmF5KCksXG5cdFx0XHRcdGRhdGFUeXBlOiAnanNvbicsXG5cdFx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXN1bHQpIHtcblx0XHRcdFx0XHQkbXlUYXNrLnZhbCgnY29uZmlybS5wYXltZW50Jyk7XG5cdFx0XHRcdFx0aWYgKHJlc3VsdC5zdWNjZXNzKSB7XG5cdFx0XHRcdFx0XHRjb25zdCBkYXRhID0gcmVzdWx0LmRhdGE7XG5cdFx0XHRcdFx0XHRpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eSgncmVkaXJlY3QnKSkge1xuXHRcdFx0XHRcdFx0XHR3aW5kb3cubG9jYXRpb24ucmVwbGFjZShkYXRhLnJlZGlyZWN0KTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGxldCBkaXY7XG5cdFx0XHRcdFx0XHQkLmVhY2gocmVzdWx0LmRhdGEucmVzcG9uc2UsIGZ1bmN0aW9uIChrZXksIHZhbCkge1xuXHRcdFx0XHRcdFx0XHQkKCcuaGlkZWluaXRpYWwnKS5zaG93KCk7XG5cdFx0XHRcdFx0XHRcdGRpdiA9IFwiI1wiICsga2V5O1xuXHRcdFx0XHRcdFx0XHQkKGRpdikudGV4dCh2YWwpO1xuXHRcdFx0XHRcdFx0XHQkKGRpdikuaHRtbCh2YWwpO1xuXHRcdFx0XHRcdFx0XHQkKGRpdikudmFsKHZhbCk7XG5cdFx0XHRcdFx0XHRcdCQoZGl2KS5zaG93KCk7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0JCgnLmtyLWFqYXgtbW9kYWwtZXJyb3ItbWVzc2FnZScpLmh0bWwocmVzdWx0Lm1lc3NhZ2UpO1xuXHRcdFx0XHRcdFx0Y29uc3QgJG1vZGFsID0gbmV3IEZvdW5kYXRpb24uUmV2ZWFsKCQoJyNLckFqYXhNb2RhbEVycm9yJykpO1xuXHRcdFx0XHRcdFx0JG1vZGFsLm9wZW4oKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdCQoZnVuY3Rpb24gKCkge1xuXHRcdGxldCAkZWxlbWVudCA9ICQoJyNrci1mb3JtLWNvbmZpcm0nKTtcblx0XHRpZiAoJGVsZW1lbnQubGVuZ3RoKSB7XG5cdFx0XHRteUNvbmZpcm0gPSBuZXcgS3Jjb25maXJtKCRlbGVtZW50KTtcblx0XHR9XG5cdFx0JGVsZW1lbnQub24oJ2NoYW5nZSBjbGljaycsICcua3ItY2FsY3VsYXRlJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdCRlbGVtZW50ID0gJCgnI2tyLWZvcm0tY29uZmlybScpO1xuXHRcdFx0bXlDb25maXJtLnVwZGF0ZVF1b3RlKCRlbGVtZW50KTtcblx0XHR9KTtcblxuXHRcdCQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcjY2hlY2t0ZXJtcycsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRpZiAoY2hlY2tUZXJtcygpKSB7XG5cdFx0XHRcdCQoJyNjaGVja3Rlcm1zJykudHJpZ2dlcignc3VibWl0Jyk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0pO1xuXG5cdC8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuXHRmdW5jdGlvbiBjaGVja1Rlcm1zKCkge1xuXHRcdGxldCByZXN1bHQgPSB0cnVlO1xuXHRcdGNvbnN0IHRlc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWdyZWVjaGVjaycpO1xuXHRcdGNvbnN0IHRlc3RjID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FncmVlY2hlY2tjJyk7XG5cdFx0Y29uc3QgdGVzdHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWdyZWVjaGVja3QnKTtcblxuXHRcdC8vIG5vaW5zcGVjdGlvbiBKU1VucmVzb2x2ZWRWYXJpYWJsZVxuXHRcdGlmICh0ZXN0ICYmICFkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgna3ItZm9ybS1wYXltZW50JykuYWdyZWVjaGVjay5jaGVja2VkKSB7XG5cdFx0XHRyZXN1bHQgPSBmYWxzZTtcblx0XHR9XG5cdFx0Ly8gbm9pbnNwZWN0aW9uIEpTVW5yZXNvbHZlZFZhcmlhYmxlXG5cdFx0aWYgKHRlc3RjICYmICFkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgna3ItZm9ybS1wYXltZW50JykuYWdyZWVjaGVja2MuY2hlY2tlZCkge1xuXHRcdFx0cmVzdWx0ID0gZmFsc2U7XG5cdFx0fVxuXHRcdC8vIG5vaW5zcGVjdGlvbiBKU1VucmVzb2x2ZWRWYXJpYWJsZVxuXHRcdGlmICh0ZXN0dCAmJiAhZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2tyLWZvcm0tcGF5bWVudCcpLmFncmVlY2hlY2t0LmNoZWNrZWQpIHtcblx0XHRcdHJlc3VsdCA9IGZhbHNlO1xuXHRcdH1cblxuXHRcdGlmIChyZXN1bHQpIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zdCAkbW9kYWwgPSBuZXcgRm91bmRhdGlvbi5SZXZlYWwoJCgnI2Vycm9yTW9kYWwnKSk7XG5cdFx0XHQkbW9kYWwub3BlbigpO1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0fVxufShqUXVlcnkpKTsiLCIvKipcbiAqIEBwYWNrYWdlICAgIEtub3cgUmVzZXJ2YXRpb25zXG4gKiBAc3VicGFja2FnZSBTaXRlIEpTXG4gKiBAY29weXJpZ2h0ICAyMDIwIEhpZ2hsYW5kIFZpc2lvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIEBsaWNlbnNlICAgIFNlZSB0aGUgZmlsZSBcIkxJQ0VOU0UudHh0XCIgZm9yIHRoZSBmdWxsIGxpY2Vuc2UgZ292ZXJuaW5nIHRoaXMgY29kZS5cbiAqIEBhdXRob3IgICAgIEhhemVsIFdpbHNvbiA8aGF6ZWxAaGlnaGxhbmR2aXNpb24uY29tPlxuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG5pZiAoIXdpbmRvdy5sb2NhdGlvbi5vcmlnaW4pIHtcblx0d2luZG93LmxvY2F0aW9uLm9yaWdpbiA9IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCArIFwiLy9cIiArIHdpbmRvdy5sb2NhdGlvbi5ob3N0O1xufVxuXG4oZnVuY3Rpb24gKCQpIHtcblx0bGV0IG15S3JEb2JFbnRyeTtcblx0bGV0IHRvZGF5O1xuXHRsZXQga2V5ID0ge0JBQ0tTUEFDRTogOH07XG5cblx0bGV0IHNldHRpbmdzID0ge1xuXHRcdGN1c3RvbV92YWxpZGF0aW9uOiBmYWxzZSxcblx0XHRkYXlzX2luX21vbnRoOiBbMzEsIDI5LCAzMSwgMzAsIDMxLCAzMCwgMzEsIDMxLCAzMCwgMzEsIDMwLCAzMV0sXG5cdFx0ZG9jdW1lbnRfZGF0ZTogZmFsc2UsXG5cdFx0ZXJyb3Jib3hfeDogMSxcblx0XHRlcnJvcmJveF95OiA1LFxuXHRcdGZpZWxkX2hpbnRfdGV4dF9kYXk6ICdERCcsXG5cdFx0ZmllbGRfaGludF90ZXh0X21vbnRoOiAnTU0nLFxuXHRcdGZpZWxkX2hpbnRfdGV4dF95ZWFyOiAnWVlZWScsXG5cdFx0ZmllbGRfb3JkZXI6ICdETVknLFxuXHRcdGZpZWxkX3dpZHRoX2RheTogNixcblx0XHRmaWVsZF93aWR0aF9tb250aDogNixcblx0XHRmaWVsZF93aWR0aF95ZWFyOiA3LFxuXHRcdGZpZWxkX3dpZHRoX3NlcDogMixcblx0XHRtaW5tYXg6ICcnLFxuXHRcdG1pbl9kYXRlOiBmYWxzZSxcblx0XHRtYXhfZGF0ZTogZmFsc2UsXG5cdFx0bWluX3llYXI6IDE5MTAsXG5cdFx0bW9udGhfbmFtZTogW1xuXHRcdFx0J0phbnVhcnknLCAnRmVicnVhcnknLCAnTWFyY2gnLCAnQXByaWwnLFxuXHRcdFx0J01heScsICdKdW5lJywgJ0p1bHknLCAnQXVndXN0JywgJ1NlcHRlbWJlcicsXG5cdFx0XHQnT2N0b2JlcicsICdOb3ZlbWJlcicsICdEZWNlbWJlciddLFxuXHRcdG9uX2JsdXI6IGZhbHNlLFxuXHRcdG9uX2Vycm9yOiBmYWxzZSxcblx0XHRvbl9jaGFuZ2U6IGZhbHNlLFxuXHRcdHBhcnNlX2RhdGU6IHRydWUsXG5cdFx0c2VwYXJhdG9yOiAnLycsXG5cdFx0c2hvd19lcnJvcnM6IHRydWUsXG5cdFx0c2hvd19oaW50czogdHJ1ZSxcblx0XHRFX0RBWV9OQU46ICdEYXkgbXVzdCBiZSBhIG51bWJlcicsXG5cdFx0RV9EQVlfVE9PX0JJRzogJ0RheSBtdXN0IGJlIDEtMzEnLFxuXHRcdEVfREFZX1RPT19TTUFMTDogJ0RheSBtdXN0IGJlIDEtMzEnLFxuXHRcdEVfQkFEX0RBWV9GT1JfTU9OVEg6ICdPbmx5ICVkIGRheXMgaW4gJW0gJXknLFxuXHRcdEVfTU9OVEhfTkFOOiAnTW9udGggbXVzdCBiZSBhIG51bWJlcicsXG5cdFx0RV9NT05USF9UT09fQklHOiAnTW9udGggbXVzdCBiZSAxLTEyJyxcblx0XHRFX01PTlRIX1RPT19TTUFMTDogJ01vbnRoIGNhbm5vdCBiZSAwJyxcblx0XHRFX1lFQVJfTkFOOiAnWWVhciBtdXN0IGJlIGEgbnVtYmVyJyxcblx0XHRFX1lFQVJfTEVOR1RIOiAnWWVhciBtdXN0IGJlIDQgZGlnaXRzJyxcblx0XHRFX1lFQVJfVE9PX1NNQUxMOiAnWWVhciBtdXN0IG5vdCBiZSBiZWZvcmUgJXknLFxuXHRcdEVfTUlOX0RBVEU6ICdEYXRlIG11c3Qgbm90IGJlIGluIHRoZSBwYXN0Jyxcblx0XHRFX01BWF9EQVRFOiAnRGF0ZSBtdXN0IG5vdCBiZSBpbiB0aGUgZnV0dXJlJ1xuXHR9O1xuXG5cdGNsYXNzIEtyRG9iRW50cnkge1xuXHRcdGNvbnN0cnVjdG9yKCRlbGVtZW50LCBvcHRpb25zKSB7XG5cdFx0XHR0b2RheSA9IEtyRG9iRW50cnkuZ2V0WW1kKG5ldyBEYXRlKCkpO1xuXG5cdFx0XHR0aGlzLmlucHV0X2RheSA9IDA7XG5cdFx0XHR0aGlzLmlucHV0X21vbnRoID0gMDtcblx0XHRcdHRoaXMuaW5wdXRfeWVhciA9IDA7XG5cdFx0XHR0aGlzLiRlbGVtZW50ID0gJGVsZW1lbnQ7XG5cdFx0XHRpZiAob3B0aW9ucykge1xuXHRcdFx0XHQkLmV4dGVuZChzZXR0aW5ncywgb3B0aW9ucyk7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuaW5pdCgpO1xuXHRcdH1cblxuXHRcdHN0YXRpYyBnZXRZbWQoZGF0ZSkge1xuXHRcdFx0Y29uc3QgbSA9IGRhdGUuZ2V0TW9udGgoKSArIDE7XG5cdFx0XHRjb25zdCBkID0gZGF0ZS5nZXREYXkoKTtcblxuXHRcdFx0cmV0dXJuIChkYXRlLmdldEZ1bGxZZWFyKCkgKyAnLScgKyAobSA8IDEwID8gJzAnIDogJycpICsgbSArICctJyArIChkIDwgMTAgPyAnMCcgOiAnJykgKyBkKTtcblx0XHR9XG5cblx0XHRzdGF0aWMgZ2V0WW1kT2JqZWN0KGRhdGUpIHtcblx0XHRcdHJldHVybiAoZGF0ZS55ZWFyICsgJy0nICsgZGF0ZS5tb250aCArICctJyArIGRhdGUuZGF5KTtcblx0XHR9XG5cblx0XHRhZGRFbnRyeUZpZWxkcygpIHtcblx0XHRcdGxldCBkb2JmaWVsZCA9IHRoaXM7XG5cdFx0XHRkb2JmaWVsZC5maWVsZHMgPSBbXTtcblx0XHRcdCQuZWFjaChzZXR0aW5ncy5maWVsZF9vcmRlci5zcGxpdCgnJyksIGZ1bmN0aW9uIChpLCBmaWVsZCkge1xuXHRcdFx0XHRzd2l0Y2ggKGZpZWxkKSB7XG5cdFx0XHRcdFx0Y2FzZSAnRCc6XG5cdFx0XHRcdFx0XHRkb2JmaWVsZC5idWlsZEZpZWxkKCdkYXknLCBpKTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgJ00nOlxuXHRcdFx0XHRcdFx0ZG9iZmllbGQuYnVpbGRGaWVsZCgnbW9udGgnLCBpKTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgJ1knOlxuXHRcdFx0XHRcdFx0ZG9iZmllbGQuYnVpbGRGaWVsZCgneWVhcicsIGkpO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0ZGVmYXVsdCA6XG5cdFx0XHRcdFx0XHR0aHJvdyBcIlVuZXhwZWN0ZWQgZmllbGQgb3JkZXIgJ1wiICsgZmllbGQgKyBcIicgZXhwZWN0ZWQgRCwgTSBvciBZXCI7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGFmdGVyUGFzdGUodGFyZ2V0KSB7XG5cdFx0XHRpZiAodGhpcy5wYXJzZURhdGUoJCh0YXJnZXQpLnZhbCgpKSkge1xuXHRcdFx0XHR0aGlzLnNldERhdGUoJCh0YXJnZXQpLnZhbCgpKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRidWlsZEZpZWxkKG5hbWUsIGluZGV4KSB7XG5cdFx0XHRsZXQga3Jkb2JlbnRyeSA9IHRoaXM7XG5cdFx0XHRsZXQgaW5wdXQgPSBuZXcgS3JEb2JJbnB1dCh7XG5cdFx0XHRcdG5hbWU6IG5hbWUsXG5cdFx0XHRcdGtyZG9iZW50cnk6IGtyZG9iZW50cnksXG5cdFx0XHRcdGluZGV4OiBpbmRleCxcblx0XHRcdFx0aGludF90ZXh0OiBzZXR0aW5ncy5zaG93X2hpbnRzID8gc2V0dGluZ3NbJ2ZpZWxkX2hpbnRfdGV4dF8nICsgbmFtZV0gOiBudWxsLFxuXHRcdFx0fSk7XG5cblx0XHRcdHRoaXMuaW5uZXIuYXBwZW5kKGlucHV0LiRpbnB1dCk7XG5cdFx0XHR0aGlzWydpbnB1dF8nICsgbmFtZV0gPSBpbnB1dDtcblxuXHRcdFx0aWYgKGluZGV4IDwgMikge1xuXHRcdFx0XHR0aGlzLmlubmVyLmFwcGVuZCgkKCc8c3BhbiBjbGFzcz1cInNlcGFyYXRvclwiIC8+JykudGV4dChzZXR0aW5ncy5zZXBhcmF0b3IpKTtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5maWVsZHNbaW5kZXhdID0gaW5wdXQ7XG5cdFx0XHR0aGlzW25hbWVdID0gaW5wdXQ7XG5cdFx0fVxuXG5cdFx0YnVpbGRVaSgpIHtcblx0XHRcdGxldCBkb2JmaWVsZCA9IHRoaXM7XG5cdFx0XHR0aGlzLndyYXBwZXIgPSAkKHRoaXMuJGVsZW1lbnQud3JhcCgnPHNwYW4gY2xhc3M9XCJqcS1kdGVcIiAvPicpLnBhcmVudCgpWzBdKTtcblx0XHRcdHRoaXMuaW5uZXIgPSAkKCc8c3BhbiBjbGFzcz1cImpxLWR0ZS1pbm5lclwiIC8+Jyk7XG5cdFx0XHR0aGlzLmFkZEVudHJ5RmllbGRzKCk7XG5cdFx0XHR0aGlzLmVycm9yYm94ID0gJCgnPHNwYW4gY2xhc3M9XCJqcS1kdGUtZXJyb3Jib3hcIiAvPicpLmhpZGUoKTtcblx0XHRcdHRoaXMuaW5uZXIub24oJ3Bhc3RlJywgJ2lucHV0JywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0bGV0IGlucHV0ID0gdGhpcztcblx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0ZG9iZmllbGQuYWZ0ZXJQYXN0ZShpbnB1dCwgZSk7XG5cdFx0XHRcdH0sIDIpO1xuXHRcdFx0fSk7XG5cdFx0XHR0aGlzLndyYXBwZXIuYXBwZW5kKHRoaXMuaW5uZXIsIHRoaXMuZXJyb3Jib3gpO1xuXHRcdFx0dGhpcy5zZXRGaWVsZFdpZHRocygpO1xuXHRcdFx0dGhpcy4kZWxlbWVudC5oaWRlKCk7XG5cdFx0fVxuXG5cdFx0Y2hlY2tEb2N1bWVudChkb2IsIGNoaWxkZG9iLCBjbGFzc25hbWUpIHtcblx0XHRcdGxldCBlbGVtZW50cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoY2xhc3NuYW1lKTtcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0aWYgKG5ldyBEYXRlKGRvYikgPiBuZXcgRGF0ZShjaGlsZGRvYikpIHtcblx0XHRcdFx0XHRlbGVtZW50c1tpXS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGVsZW1lbnRzW2ldLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Y2xlYXIoKSB7XG5cdFx0XHR0aGlzLmNsZWFyRXJyb3IoJycpO1xuXHRcdFx0dGhpcy5zZXREYXRlKCcnKTtcblx0XHR9XG5cblx0XHRjbGVhckVycm9yKCkge1xuXHRcdFx0ZGVsZXRlIHRoaXMuZXJyb3JfdGV4dDtcblx0XHRcdHRoaXMuc2hvd0Vycm9yKCk7XG5cdFx0fVxuXG5cdFx0ZGVzdHJveSgpIHtcblx0XHRcdHRoaXMuJGVsZW1lbnQuc2hvdygpO1xuXHRcdFx0dGhpcy4kZWxlbWVudC5jc3MoJ2Rpc3BsYXknLCAnJyk7XG5cdFx0XHR0aGlzLndyYXBwZXIuZmluZCgnc3BhbicpLnJlbW92ZSgpO1xuXHRcdFx0dGhpcy4kZWxlbWVudC51bndyYXAoKTtcblx0XHRcdHRoaXMuJGVsZW1lbnQucmVtb3ZlRGF0YSgnZGF0ZXRleHRlbnRyeScpO1xuXHRcdFx0ZGVsZXRlIHRoaXMuaW5uZXI7XG5cdFx0XHRkZWxldGUgdGhpcy53cmFwcGVyO1xuXHRcdFx0ZGVsZXRlIHRoaXMuJGVsZW1lbnQ7XG5cdFx0fVxuXG5cdFx0Zm9jdXMoKSB7XG5cdFx0XHR0aGlzLmZpZWxkc1swXS5zZXRGb2N1cyh0cnVlKTtcblx0XHR9XG5cblx0XHRmb2N1c0ZpZWxkQmVmb3JlKGlucHV0KSB7XG5cdFx0XHRjb25zdCBpbmRleCA9IGlucHV0LmluZGV4O1xuXHRcdFx0aWYgKGluZGV4IDwgMSkge1xuXHRcdFx0XHRyZXR1cm5cblx0XHRcdH1cblx0XHRcdHRoaXMuZmllbGRzW2luZGV4XS55aWVsZEZvY3VzKCk7XG5cdFx0XHR0aGlzLmZpZWxkc1tpbmRleCAtIDFdLnNldEZvY3VzKHRydWUpO1xuXHRcdFx0Ly8gbGV0IG5leHQgPSB0aGlzLmZpZWxkc1tpbmRleCAtIDFdO1xuXHRcdFx0Ly8gbGV0IHZhbCA9IG5leHQuZ2V0KCk7XG5cdFx0XHQvLyBuZXh0LnNldEZvY3VzKGZhbHNlKTtcblx0XHR9XG5cblx0XHRmb2N1c0ZpZWxkQWZ0ZXIoaW5wdXQpIHtcblx0XHRcdGNvbnN0IGluZGV4ID0gaW5wdXQuaW5kZXg7XG5cdFx0XHRpZiAoaW5kZXggPiAxKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdHRoaXMuZmllbGRzW2luZGV4XS55aWVsZEZvY3VzKCk7XG5cdFx0XHR0aGlzLmZpZWxkc1tpbmRleCArIDFdLnNldEZvY3VzKHRydWUpO1xuXHRcdH1cblxuXHRcdGZvY3VzSW4oKSB7XG5cdFx0XHR0aGlzLndyYXBwZXIuYWRkQ2xhc3MoJ2ZvY3VzJyk7XG5cdFx0fVxuXG5cdFx0Zm9jdXNPdXQoKSB7XG5cdFx0XHRpZiAoc2V0dGluZ3Mub25fYmx1cikge1xuXHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRzZWxmLndpZGdldEZvY3VzTG9zdCgpO1xuXHRcdFx0XHR9LCAyKTtcblx0XHRcdH1cblx0XHRcdHRoaXMud3JhcHBlci5yZW1vdmVDbGFzcygnZm9jdXMnKTtcblx0XHR9XG5cblx0XHRnZXREYXRlKCkge1xuXHRcdFx0cmV0dXJuICh0aGlzLmRheV92YWx1ZSAmJiB0aGlzLm1vbnRoX3ZhbHVlICYmIHRoaXMueWVhcl92YWx1ZSlcblx0XHRcdFx0PyB7ZGF5OiB0aGlzLmRheV92YWx1ZSwgbW9udGg6IHRoaXMubW9udGhfdmFsdWUsIHllYXI6IHRoaXMueWVhcl92YWx1ZX1cblx0XHRcdFx0OiBudWxsO1xuXHRcdH1cblxuXHRcdGluaXQoKSB7XG5cdFx0XHRpZiAoIXNldHRpbmdzLm1pbl95ZWFyKSB7XG5cdFx0XHRcdHNldHRpbmdzLm1pbl95ZWFyID0gJzE5MTAnO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLmJ1aWxkVWkoKTtcblx0XHRcdHRoaXMuc2V0RGF0ZSh0aGlzLiRlbGVtZW50LmF0dHIoJ3ZhbHVlJykpO1xuXHRcdFx0dGhpcy5wcm94eUxhYmVsQ2xpY2tzKCk7XG5cdFx0fVxuXG5cdFx0cGFyc2VEYXRlKHRleHQpIHtcblx0XHRcdHJldHVybiB0aGlzLnBhcnNlSXNvRGF0ZSh0ZXh0KTtcblx0XHR9XG5cblx0XHRwYXJzZUlzb0RhdGUodGV4dCkge1xuXHRcdFx0cmV0dXJuIHRleHQgJiYgdGV4dC5tYXRjaCgvXihcXGRcXGRcXGRcXGQpLShcXGRcXGQpLShcXGRcXGQpLykgPyB7XG5cdFx0XHRcdGRheTogUmVnRXhwLiQzLFxuXHRcdFx0XHRtb250aDogUmVnRXhwLiQyLFxuXHRcdFx0XHR5ZWFyOiBSZWdFeHAuJDFcblx0XHRcdH0gOiBudWxsO1xuXHRcdH1cblxuXHRcdHByb3h5TGFiZWxDbGlja3MoKSB7XG5cdFx0XHRsZXQgZG9iZmllbGQgPSB0aGlzO1xuXHRcdFx0bGV0IGlkID0gdGhpcy4kZWxlbWVudC5hdHRyKCdpZCcpO1xuXHRcdFx0aWYgKCFpZCkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHQkKCdsYWJlbFtmb3I9JyArIGlkICsgJ10nKS5vbm1vdXNldXAoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRkb2JmaWVsZC5mb2N1cygpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0c2V0RGF0ZShuZXdfZGF0ZSkge1xuXHRcdFx0bGV0IGRvYmZpZWxkID0gdGhpcztcblx0XHRcdG5ld19kYXRlID0gdGhpcy5wYXJzZURhdGUobmV3X2RhdGUpO1xuXHRcdFx0ZGVsZXRlIHRoaXMuZGF5X3ZhbHVlO1xuXHRcdFx0ZGVsZXRlIHRoaXMubW9udGhfdmFsdWU7XG5cdFx0XHRkZWxldGUgdGhpcy55ZWFyX3ZhbHVlO1xuXHRcdFx0dGhpcy5pbnB1dF9kYXkuc2V0KG5ld19kYXRlID8gbmV3X2RhdGUuZGF5IDogJycpO1xuXHRcdFx0dGhpcy5pbnB1dF9tb250aC5zZXQobmV3X2RhdGUgPyBuZXdfZGF0ZS5tb250aCA6ICcnKTtcblx0XHRcdHRoaXMuaW5wdXRfeWVhci5zZXQobmV3X2RhdGUgPyBuZXdfZGF0ZS55ZWFyIDogJycpO1xuXHRcdFx0dGhpcy5jbGVhckVycm9yKCk7XG5cdFx0XHR0aGlzLiRlbGVtZW50LnZhbChuZXdfZGF0ZSk7XG5cdFx0XHRpZiAobmV3X2RhdGUpIHtcblx0XHRcdFx0JC5lYWNoKHRoaXMuZmllbGRzLCBmdW5jdGlvbiAoaSwgaW5wdXQpIHtcblx0XHRcdFx0XHRkb2JmaWVsZC52YWxpZGF0ZShpbnB1dCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHNldEVycm9yKGVycm9yX3RleHQpIHtcblx0XHRcdHRoaXMuZXJyb3JfdGV4dCA9IGVycm9yX3RleHQ7XG5cdFx0XHR0aGlzLnNob3dFcnJvcigpO1xuXHRcdH1cblxuXHRcdHNldEZpZWxkV2lkdGhzKCkge1xuXHRcdFx0bGV0IGF2YWlsYWJsZSA9IHRoaXMuJGVsZW1lbnQud2lkdGgoKSAtIDI7XG5cdFx0XHRsZXQgdG90YWwgPSBzZXR0aW5ncy5maWVsZF93aWR0aF95ZWFyICsgc2V0dGluZ3MuZmllbGRfd2lkdGhfc2VwICsgc2V0dGluZ3MuZmllbGRfd2lkdGhfbW9udGggK1xuXHRcdFx0XHRzZXR0aW5ncy5maWVsZF93aWR0aF9zZXAgKyBzZXR0aW5ncy5maWVsZF93aWR0aF9kYXk7XG5cdFx0XHR0aGlzLmlucHV0X2RheS5zZXRXaWR0aChNYXRoLmZsb29yKHNldHRpbmdzLmZpZWxkX3dpZHRoX2RheSAqIGF2YWlsYWJsZSAvIHRvdGFsKSk7XG5cdFx0XHR0aGlzLmlucHV0X21vbnRoLnNldFdpZHRoKE1hdGguZmxvb3Ioc2V0dGluZ3MuZmllbGRfd2lkdGhfbW9udGggKiBhdmFpbGFibGUgLyB0b3RhbCkpO1xuXHRcdFx0dGhpcy5pbnB1dF95ZWFyLnNldFdpZHRoKE1hdGguZmxvb3Ioc2V0dGluZ3MuZmllbGRfd2lkdGhfeWVhciAqIGF2YWlsYWJsZSAvIHRvdGFsKSk7XG5cdFx0fVxuXG5cdFx0c2V0UmVhZG9ubHkobW9kZSkge1xuXHRcdFx0aWYgKG1vZGUgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRtb2RlID0gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdHRoaXMuaW5wdXRfZGF5LnNldFJlYWRvbmx5KG1vZGUpO1xuXHRcdFx0dGhpcy5pbnB1dF9tb250aC5zZXRSZWFkb25seShtb2RlKTtcblx0XHRcdHRoaXMuaW5wdXRfeWVhci5zZXRSZWFkb25seShtb2RlKTtcblx0XHRcdGlmIChtb2RlKSB7XG5cdFx0XHRcdHRoaXMud3JhcHBlci5hZGRDbGFzcygncmVhZG9ubHknKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMud3JhcHBlci5yZW1vdmVDbGFzcygncmVhZG9ubHknKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRzaG93RXJyb3IoKSB7XG5cdFx0XHRsZXQgZXJyb3JfdGV4dCA9IHRoaXMud2lkZ2V0RXJyb3JUZXh0KCk7XG5cdFx0XHRpZiAodGhpcy5vbl9lcnJvcikge1xuXHRcdFx0XHR0aGlzLm9uX2Vycm9yKGVycm9yX3RleHQpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCFzZXR0aW5ncy5zaG93X2Vycm9ycykge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRpZiAoZXJyb3JfdGV4dCA9PT0gJycpIHtcblx0XHRcdFx0dGhpcy5lcnJvcmJveC5oaWRlKCk7XG5cdFx0XHRcdHRoaXMuZXJyb3Jib3gudGV4dCgnJyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRsZXQgeF9vZmZzZXQgPSAodGhpcy5pbm5lci5vdXRlcldpZHRoKCkgKyBzZXR0aW5ncy5lcnJvcmJveF94KSArICdweCc7XG5cdFx0XHRcdGxldCB5X29mZnNldCA9IHNldHRpbmdzLmVycm9yYm94X3kgKyAncHgnO1xuXHRcdFx0XHR0aGlzLmVycm9yYm94LmNzcyh7ZGlzcGxheTogJ2Jsb2NrJywgcG9zaXRpb246ICdhYnNvbHV0ZScsIHRvcDogeV9vZmZzZXQsIGxlZnQ6IHhfb2Zmc2V0fSk7XG5cdFx0XHRcdHRoaXMuZXJyb3Jib3gudGV4dChlcnJvcl90ZXh0KTtcblx0XHRcdFx0dGhpcy5lcnJvcmJveC5zaG93KCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dmFsaWRhdGUoY3VycmVudF9pbnB1dCkge1xuXHRcdFx0dGhpcy4kZWxlbWVudC52YWwoJycpO1xuXHRcdFx0aWYgKGN1cnJlbnRfaW5wdXQpIHtcblx0XHRcdFx0Y29uc3QgdHlwZSA9IGN1cnJlbnRfaW5wdXQubmFtZTtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRpZiAodHlwZSA9PT0gJ2RheScpIHtcblx0XHRcdFx0XHRcdHRoaXMudmFsaWRhdGVEYXkoKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0aWYgKHR5cGUgPT09ICdtb250aCcpIHtcblx0XHRcdFx0XHRcdFx0dGhpcy52YWxpZGF0ZU1vbnRoKCk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRpZiAodHlwZSA9PT0gJ3llYXInKSB7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy52YWxpZGF0ZVllYXIoKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRjdXJyZW50X2lucHV0LmNsZWFyRXJyb3IoKTtcblx0XHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRcdGN1cnJlbnRfaW5wdXQuc2V0RXJyb3IoZSk7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAodGhpcy5kYXlfdmFsdWUgJiYgdGhpcy5tb250aF92YWx1ZSkge1xuXHRcdFx0XHR0aGlzLmNsZWFyRXJyb3IoKTtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHR0aGlzLnZhbGlkYXRlRGF5c0luTW9udGgoKTtcblx0XHRcdFx0XHRpZiAodGhpcy55ZWFyX3ZhbHVlICYmIHRoaXMueWVhcl92YWx1ZS5sZW5ndGggPT09IDQpIHtcblx0XHRcdFx0XHRcdHRoaXMudmFsaWRhdGVDb21wbGV0ZURhdGUoKTtcblx0XHRcdFx0XHRcdGxldCBkYXRlX3N0ciA9IEtyRG9iRW50cnkuZ2V0WW1kT2JqZWN0KHRoaXMuZ2V0RGF0ZSgpKTtcblx0XHRcdFx0XHRcdHRoaXMuJGVsZW1lbnQudmFsKGRhdGVfc3RyKTtcblx0XHRcdFx0XHRcdGlmICh0aGlzLiRlbGVtZW50LmRhdGEoJ2NoaWxkZG9iJykpIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5jaGVja0RvY3VtZW50KGRhdGVfc3RyLCB0aGlzLiRlbGVtZW50LmRhdGEoJ2NoaWxkZG9iJyksIHRoaXMuJGVsZW1lbnQuYXR0cignaWQnKSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdFx0dGhpcy5zZXRFcnJvcihlKTtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuY2xlYXJFcnJvcigpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHR2YWxpZGF0ZUNvbXBsZXRlRGF0ZSgpIHtcblx0XHRcdGNvbnN0IGRhdGVfb2JqID0gdGhpcy5nZXREYXRlKCk7XG5cdFx0XHRjb25zdCBkYXRlX2lzbyA9IEtyRG9iRW50cnkuZ2V0WW1kT2JqZWN0KGRhdGVfb2JqKTtcblx0XHRcdHNldHRpbmdzLm1pbm1heCA9IHRoaXMuJGVsZW1lbnQuZGF0YSgndmFsaWRhdGlvbicpO1xuXG5cdFx0XHRpZiAoc2V0dGluZ3MubWlubWF4ID09PSAnbWF4Jykge1xuXHRcdFx0XHRpZiAoZGF0ZV9pc28gPiB0b2RheSkge1xuXHRcdFx0XHRcdHRocm93IChzZXR0aW5ncy5FX01BWF9EQVRFKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKHNldHRpbmdzLm1pbm1heCA9PT0gJ21pbicpIHtcblx0XHRcdFx0aWYgKGRhdGVfaXNvIDwgdG9kYXkpIHtcblx0XHRcdFx0XHR0aHJvdyAoc2V0dGluZ3MuRV9NSU5fREFURSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gbGV0IG1heF9kYXRlID0gc2V0dGluZ3MubWF4X2RhdGU7XG5cdFx0XHQvLyBpZiAodHlwZW9mIG1heF9kYXRlID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHQvLyBcdG1heF9kYXRlID0gbWF4X2RhdGUuY2FsbCh0aGlzKTtcblx0XHRcdC8vIH1cblx0XHRcdC8vIGlmICh0eXBlb2YgbWF4X2RhdGUgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHQvLyBcdG1heF9kYXRlID0gdGhpcy5wYXJzZURhdGUobWF4X2RhdGUpO1xuXHRcdFx0Ly8gfVxuXHRcdFx0Ly8gaWYgKG1heF9kYXRlKSB7XG5cdFx0XHQvLyBcdGlmIChkYXRlX2lzbyA+IHNldHRpbmdzLm1heF9kYXRlKSB7XG5cdFx0XHQvLyBcdFx0dGhyb3coc2V0dGluZ3MuRV9NQVhfREFURSk7XG5cdFx0XHQvLyBcdH1cblx0XHRcdC8vIH1cblxuXHRcdFx0aWYgKHRoaXMuY3VzdG9tX3ZhbGlkYXRpb24pIHtcblx0XHRcdFx0ZGF0ZV9vYmouZGF0ZSA9IG5ldyBEYXRlKFxuXHRcdFx0XHRcdHBhcnNlSW50KGRhdGVfb2JqLnllYXIsIDEwKSxcblx0XHRcdFx0XHRwYXJzZUludChkYXRlX29iai5tb250aCwgMTApIC0gMSxcblx0XHRcdFx0XHRwYXJzZUludChkYXRlX29iai5kYXksIDEwKVxuXHRcdFx0XHQpO1xuXHRcdFx0XHR0aGlzLmN1c3RvbV92YWxpZGF0aW9uKGRhdGVfb2JqKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR2YWxpZGF0ZURheSgpIHtcblx0XHRcdGxldCBvcHQgPSBzZXR0aW5ncztcblx0XHRcdGxldCBpbnB1dCA9IHRoaXMuaW5wdXRfZGF5O1xuXHRcdFx0dGhpcy5kYXlfdmFsdWUgPSB1bmRlZmluZWQ7XG5cdFx0XHRsZXQgdGV4dCA9IGlucHV0LmdldCgpO1xuXHRcdFx0aWYgKHRleHQgPT09ICcnIHx8ICh0ZXh0ID09PSAnMCcgJiYgaW5wdXQuaGFzX2ZvY3VzKSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRpZiAodGV4dC5tYXRjaCgvXFxELykpIHtcblx0XHRcdFx0dGhyb3cgKG9wdC5FX0RBWV9OQU4pO1xuXHRcdFx0fVxuXHRcdFx0bGV0IG51bSA9IHBhcnNlSW50KHRleHQsIDEwKTtcblx0XHRcdGlmIChudW0gPCAxKSB7XG5cdFx0XHRcdHRocm93IChvcHQuRV9EQVlfVE9PX1NNQUxMKTtcblx0XHRcdH1cblx0XHRcdGlmIChudW0gPiAzMSkge1xuXHRcdFx0XHR0aHJvdyAob3B0LkVfREFZX1RPT19CSUcpO1xuXHRcdFx0fVxuXHRcdFx0dGV4dCA9IG51bSA8IDEwID8gJzAnICsgbnVtIDogJycgKyBudW07XG5cdFx0XHRpZiAoIWlucHV0Lmhhc19mb2N1cykge1xuXHRcdFx0XHRpbnB1dC5zZXQodGV4dCk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLmRheV92YWx1ZSA9IHRleHQ7XG5cdFx0fVxuXG5cdFx0dmFsaWRhdGVEYXlzSW5Nb250aCgpIHtcblx0XHRcdGNvbnN0IGRheSA9IHBhcnNlSW50KHRoaXMuZGF5X3ZhbHVlLCAxMCk7XG5cdFx0XHRjb25zdCBtb250aCA9IHBhcnNlSW50KHRoaXMubW9udGhfdmFsdWUsIDEwKTtcblx0XHRcdGNvbnN0IHllYXIgPSBwYXJzZUludCh0aGlzLnllYXJfdmFsdWUsIDEwKTtcblx0XHRcdGlmIChkYXkgPCAxIHx8IG1vbnRoIDwgMSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRsZXQgbWF4ID0gc2V0dGluZ3MuZGF5c19pbl9tb250aFttb250aCAtIDFdO1xuXHRcdFx0bGV0IG1zZyA9IHNldHRpbmdzLkVfQkFEX0RBWV9GT1JfTU9OVEg7XG5cdFx0XHRpZiAobW9udGggPT09IDIgJiYgKCcnICsgeWVhcikubGVuZ3RoID09PSA0KSB7XG5cdFx0XHRcdG1heCA9IHllYXIgJSA0ID8gMjggOiB5ZWFyICUgMTAwID8gMjkgOiB5ZWFyICUgNDAwID8gMjggOiAyOTtcblx0XHRcdFx0bXNnID0gbXNnLnJlcGxhY2UoLyV5LywgeWVhci50b1N0cmluZygpKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdG1zZyA9IG1zZy5yZXBsYWNlKC8gKiV5LywgJycpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGRheSA+IG1heCkge1xuXHRcdFx0XHR0aHJvdyAobXNnLnJlcGxhY2UoLyVkLywgbWF4LnRvU3RyaW5nKCkpLnJlcGxhY2UoLyVtLywgc2V0dGluZ3MubW9udGhfbmFtZVttb250aCAtIDFdKSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dmFsaWRhdGVNb250aCgpIHtcblx0XHRcdGxldCBpbnB1dCA9IHRoaXMuaW5wdXRfbW9udGg7XG5cdFx0XHR0aGlzLm1vbnRoX3ZhbHVlID0gdW5kZWZpbmVkO1xuXHRcdFx0bGV0IHRleHQgPSBpbnB1dC5nZXQoKTtcblx0XHRcdGlmICh0ZXh0ID09PSAnJyB8fCAodGV4dCA9PT0gJzAnICYmIGlucHV0Lmhhc19mb2N1cykpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHRleHQubWF0Y2goL1xcRC8pKSB7XG5cdFx0XHRcdHRocm93IChzZXR0aW5ncy5FX01PTlRIX05BTik7XG5cdFx0XHR9XG5cdFx0XHRsZXQgbnVtID0gcGFyc2VJbnQodGV4dCwgMTApO1xuXHRcdFx0aWYgKG51bSA8IDEpIHtcblx0XHRcdFx0dGhyb3cgKHNldHRpbmdzLkVfTU9OVEhfVE9PX1NNQUxMKTtcblx0XHRcdH1cblx0XHRcdGlmIChudW0gPiAxMikge1xuXHRcdFx0XHR0aHJvdyAoc2V0dGluZ3MuRV9NT05USF9UT09fQklHKTtcblx0XHRcdH1cblx0XHRcdHRleHQgPSBudW0gPCAxMCA/ICcwJyArIG51bSA6ICcnICsgbnVtO1xuXHRcdFx0aWYgKCFpbnB1dC5oYXNfZm9jdXMpIHtcblx0XHRcdFx0aW5wdXQuc2V0KHRleHQpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5tb250aF92YWx1ZSA9IHRleHQ7XG5cdFx0fVxuXG5cdFx0dmFsaWRhdGVZZWFyKCkge1xuXHRcdFx0Y29uc3QgaW5wdXQgPSB0aGlzLmlucHV0X3llYXI7XG5cdFx0XHR0aGlzLnllYXJfdmFsdWUgPSB1bmRlZmluZWQ7XG5cdFx0XHRsZXQgdGV4dCA9IGlucHV0LmdldCgpO1xuXHRcdFx0aWYgKHRleHQgPT09ICcnIHx8ICh0ZXh0ID09PSAnMCcgJiYgaW5wdXQuaGFzX2ZvY3VzKSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRpZiAodGV4dC5tYXRjaCgvXFxELykpIHtcblx0XHRcdFx0dGhyb3cgKHNldHRpbmdzLkVfWUVBUl9OQU4pO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGlucHV0Lmhhc19mb2N1cykge1xuXHRcdFx0XHRpZiAodGV4dC5sZW5ndGggPiA0KSB7XG5cdFx0XHRcdFx0dGhyb3cgKHNldHRpbmdzLkVfWUVBUl9MRU5HVEgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAodGV4dC5sZW5ndGggIT09IDQpIHtcblx0XHRcdFx0XHR0aHJvdyAoc2V0dGluZ3MuRV9ZRUFSX0xFTkdUSCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmICh0ZXh0Lmxlbmd0aCA9PT0gNCkge1xuXHRcdFx0XHRjb25zdCBudW0gPSBwYXJzZUludCh0ZXh0LCAxMCk7XG5cdFx0XHRcdGlmIChzZXR0aW5ncy5taW5feWVhciAmJiBudW0gPCBzZXR0aW5ncy5taW5feWVhcikge1xuXHRcdFx0XHRcdHRocm93IChzZXR0aW5ncy5FX1lFQVJfVE9PX1NNQUxMLnJlcGxhY2UoLyV5Lywgc2V0dGluZ3MubWluX3llYXIpKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0dGhpcy55ZWFyX3ZhbHVlID0gdGV4dDtcblx0XHR9XG5cblx0XHR3aWRnZXRFcnJvclRleHQoKSB7XG5cdFx0XHRsZXQgZXJyb3JfdGV4dCA9ICcnO1xuXHRcdFx0JC5lYWNoKHRoaXMuZmllbGRzLCBmdW5jdGlvbiAoaSwgaW5wdXQpIHtcblx0XHRcdFx0aWYgKGlucHV0LmVycm9yX3RleHQpIHtcblx0XHRcdFx0XHRpZiAoaW5wdXQuaGFzX2ZvY3VzIHx8IGVycm9yX3RleHQgPT09ICcnKSB7XG5cdFx0XHRcdFx0XHRlcnJvcl90ZXh0ID0gaW5wdXQuZXJyb3JfdGV4dFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRpZiAoZXJyb3JfdGV4dCA9PT0gJycgJiYgdGhpcy5lcnJvcl90ZXh0KSB7XG5cdFx0XHRcdGVycm9yX3RleHQgPSB0aGlzLmVycm9yX3RleHQ7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZXJyb3JfdGV4dDtcblx0XHR9XG5cblx0XHR3aWRnZXRGb2N1c0xvc3QoKSB7XG5cdFx0XHRpZiAoc2V0dGluZ3Mub25fYmx1ciAmJiAhdGhpcy53cmFwcGVyLmlzKCcuZm9jdXMnKSkge1xuXHRcdFx0XHRzZXR0aW5ncy5vbkJsdXIoKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRjbGFzcyBLckRvYklucHV0IHtcblx0XHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG5cdFx0XHRjb25zdCBpbnB1dCA9IHRoaXM7XG5cdFx0XHR0aGlzLmRvYmZpZWxkID0gb3B0aW9ucy5rcmRvYmVudHJ5O1xuXHRcdFx0dGhpcy5uYW1lID0gb3B0aW9ucy5uYW1lO1xuXHRcdFx0dGhpcy5pbmRleCA9IG9wdGlvbnMuaW5kZXg7XG5cdFx0XHR0aGlzLmhpbnRfdGV4dCA9IG9wdGlvbnMuaGludF90ZXh0O1xuXHRcdFx0dGhpcy5oYXNfZm9jdXMgPSBmYWxzZTtcblx0XHRcdHRoaXMuZW1wdHkgPSB0cnVlO1xuXHRcdFx0dGhpcy4kaW5wdXQgPSAkKCc8aW5wdXQgdHlwZT1cInRleHRcIiB2YWx1ZT1cIlwiIC8+JykuYWRkQ2xhc3MoJ2pxLWR0ZS0nICsgdGhpcy5uYW1lKS5hdHRyKCdhcmlhLWxhYmVsJywgJycgKyBcIiAoXCIgKyB0aGlzLmhpbnRfdGV4dCArIFwiKVwiKS5mb2N1cygkLnByb3h5KGlucHV0LCAnZm9jdXMnKSkuYmx1cigkLnByb3h5KGlucHV0LCAnYmx1cicpKS5rZXlkb3duKGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdGlucHV0LmtleWRvd24oZSk7XG5cdFx0XHRcdH0sIDIpXG5cdFx0XHR9KS5rZXl1cChmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRpbnB1dC5rZXl1cChlKTtcblx0XHRcdFx0fSwgMilcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGJsdXIoKSB7XG5cdFx0XHR0aGlzLmhhc19mb2N1cyA9IGZhbHNlO1xuXHRcdFx0dGhpcy5kb2JmaWVsZC5mb2N1c091dCgpO1xuXHRcdFx0dGhpcy5zaG93X2hpbnQoKTtcblx0XHRcdHRoaXMuZG9iZmllbGQudmFsaWRhdGUodGhpcyk7XG5cdFx0fVxuXG5cdFx0Y2xlYXJFcnJvcigpIHtcblx0XHRcdGRlbGV0ZSB0aGlzLmVycm9yX3RleHQ7XG5cdFx0XHR0aGlzLiRpbnB1dC5yZW1vdmVDbGFzcygnZXJyb3InKTtcblx0XHR9XG5cblx0XHRmb2N1cygpIHtcblx0XHRcdHRoaXMua2V5X2lzX2Rvd24gPSBmYWxzZTtcblx0XHRcdGlmICh0aGlzLiRpbnB1dC5wcm9wKCdyZWFkb25seScpKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdHRoaXMuaGFzX2ZvY3VzID0gdHJ1ZTtcblx0XHRcdHRoaXMuZG9iZmllbGQuZm9jdXNJbigpO1xuXHRcdFx0aWYgKHRoaXMuJGlucHV0Lmhhc0NsYXNzKCdoaW50JykpIHtcblx0XHRcdFx0dGhpcy4kaW5wdXQudmFsKCcnKS5yZW1vdmVDbGFzcygnaGludCcpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5kb2JmaWVsZC5zaG93RXJyb3IoKTtcblx0XHR9XG5cblx0XHRnZXQoKSB7XG5cdFx0XHRsZXQgdmFsID0gdGhpcy4kaW5wdXQudmFsKCk7XG5cdFx0XHRyZXR1cm4gdmFsID09PSB0aGlzLmhpbnRfdGV4dCA/ICcnIDogdmFsO1xuXHRcdH1cblxuXHRcdGlzRGlnaXRLZXkoZSkge1xuXHRcdFx0bGV0IGtleWNvZGUgPSBlLndoaWNoO1xuXHRcdFx0cmV0dXJuIGtleWNvZGUgPj0gNDggJiYga2V5Y29kZSA8PSA1NyB8fCBrZXljb2RlID49IDk2ICYmIGtleWNvZGUgPD0gMTA1O1xuXHRcdH1cblxuXHRcdGtleWRvd24oKSB7XG5cdFx0XHQvLyBJZ25vcmUga2V5dXAgZXZlbnRzIHRoYXQgYXJyaXZlIGFmdGVyIGZvY3VzIG1vdmVkIHRvIG5leHQgZmllbGRcblx0XHRcdHRoaXMua2V5X2lzX2Rvd24gPSB0cnVlO1xuXHRcdH1cblxuXHRcdGtleXVwKGUpIHtcblx0XHRcdGlmICghdGhpcy5rZXlfaXNfZG93bikge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHQvLyBIYW5kbGUgQmFja3NwYWNlIC0gc2hpZnRpbmcgZm9jdXMgdG8gcHJldmlvdXMgZmllbGQgaWYgcmVxdWlyZWRcblx0XHRcdGxldCBrZXljb2RlID0gZS53aGljaDtcblx0XHRcdGlmIChrZXljb2RlID09PSBrZXkuQkFDS1NQQUNFICYmIHRoaXMuZW1wdHkpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuZG9iZmllbGQuZm9jdXNGaWVsZEJlZm9yZSh0aGlzKTtcblx0XHRcdH1cblx0XHRcdGxldCB0ZXh0ID0gdGhpcy5nZXQoKTtcblx0XHRcdHRoaXMuZW1wdHkgPSB0ZXh0ID09PSAnJztcblxuXHRcdFx0Ly8gVHJhcCBhbmQgZGlzY2FyZCBzZXBhcmF0b3IgY2hhcmFjdGVycyAtIGFkdmFuY2luZyBmb2N1cyBpZiByZXF1aXJlZFxuXHRcdFx0aWYgKHRleHQubWF0Y2goL1tcXC9cXFxcLiAtXS8pKSB7XG5cdFx0XHRcdHRleHQgPSB0ZXh0LnJlcGxhY2UoL1tcXC9cXFxcLiAtXS8sICcnKTtcblx0XHRcdFx0dGhpcy5zZXQodGV4dCk7XG5cdFx0XHRcdGlmICghdGhpcy5lbXB0eSAmJiB0aGlzLmluZGV4IDwgMikge1xuXHRcdFx0XHRcdHRoaXMuZG9iZmllbGQuZm9jdXNGaWVsZEFmdGVyKHRoaXMpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIEFkdmFuY2UgZm9jdXMgaWYgdGhpcyBmaWVsZCBpcyBib3RoIHZhbGlkIGFuZCBmdWxsXG5cdFx0XHRpZiAodGhpcy5kb2JmaWVsZC52YWxpZGF0ZSh0aGlzKSkge1xuXHRcdFx0XHRsZXQgd2FudCA9IHRoaXMubmFtZSA9PT0gJ3llYXInID8gNCA6IDI7XG5cdFx0XHRcdGlmICh0aGlzLmlzRGlnaXRLZXkoZSkgJiYgdGV4dC5sZW5ndGggPT09IHdhbnQpIHtcblx0XHRcdFx0XHR0aGlzLmRvYmZpZWxkLmZvY3VzRmllbGRBZnRlcih0aGlzKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGxlZnQoKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy4kaW5wdXQucG9zaXRpb24oKS5sZWZ0O1xuXHRcdH1cblxuXHRcdHNldChuZXdfdmFsdWUpIHtcblx0XHRcdHRoaXMuJGlucHV0LnZhbChuZXdfdmFsdWUpLnJlbW92ZUNsYXNzKCdoaW50Jyk7XG5cdFx0XHRpZiAoIXRoaXMuaGFzX2ZvY3VzKSB7XG5cdFx0XHRcdHRoaXMuc2hvd19oaW50KCk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLmVtcHR5ID0gbmV3X3ZhbHVlID09PSAnJztcblx0XHRcdHRoaXMuY2xlYXJFcnJvcigpO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fVxuXG5cdFx0c2V0RXJyb3IodGV4dCkge1xuXHRcdFx0dGhpcy5lcnJvcl90ZXh0ID0gdGV4dDtcblx0XHRcdHRoaXMuJGlucHV0LmFkZENsYXNzKCdlcnJvcicpO1xuXHRcdFx0dGhpcy5kb2JmaWVsZC5zaG93RXJyb3IoKTtcblx0XHR9XG5cblx0XHRzZXRGb2N1cyhzZWxlY3RfYWxsKSB7XG5cdFx0XHRsZXQgJGlucHV0ID0gdGhpcy4kaW5wdXQ7XG5cdFx0XHQkaW5wdXQuZm9jdXMoKTtcblx0XHRcdGlmIChzZWxlY3RfYWxsKSB7XG5cdFx0XHRcdCRpbnB1dC5zZWxlY3QoKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdCRpbnB1dC52YWwoJGlucHV0LnZhbCgpKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH1cblxuXHRcdHNldFdpZHRoKG5ld193aWR0aCkge1xuXHRcdFx0dGhpcy4kaW5wdXQud2lkdGgobmV3X3dpZHRoKTtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH1cblxuXHRcdHNob3dfaGludCgpIHtcblx0XHRcdGlmICh0aGlzLmdldCgpID09PSAnJyAmJiB0eXBlb2YgKHRoaXMuaGludF90ZXh0KSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdFx0dGhpcy4kaW5wdXQudmFsKHRoaXMuaGludF90ZXh0KS5hZGRDbGFzcygnaGludCcpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fVxuXG5cdFx0eWllbGRGb2N1cygpIHtcblx0XHRcdHRoaXMuJGlucHV0LmJsdXIoKTtcblx0XHR9XG5cdH1cblxuXHQkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG5cdFx0JCgnLmRvYmlzc3VlJykuZWFjaChmdW5jdGlvbiAoKSB7XG5cdFx0XHRteUtyRG9iRW50cnkgPSBuZXcgS3JEb2JFbnRyeSgkKHRoaXMpLCB7fSk7XG5cdFx0fSk7XG5cdH0pO1xufShqUXVlcnkpKTsiLCIvKipcbiAqIEBwYWNrYWdlICAgIEtub3cgUmVzZXJ2YXRpb25zXG4gKiBAc3VicGFja2FnZSBBZG1pbiBKU1xuICogQGNvcHlyaWdodCAgMjAyMCBIaWdobGFuZCBWaXNpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBAbGljZW5zZSAgICBTZWUgdGhlIGZpbGUgXCJMSUNFTlNFLnR4dFwiIGZvciB0aGUgZnVsbCBsaWNlbnNlIGdvdmVybmluZyB0aGlzIGNvZGUuXG4gKiBAYXV0aG9yICAgICBIYXplbCBXaWxzb24gPGhhemVsQGhpZ2hsYW5kdmlzaW9uLmNvbT5cbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgkKSB7XG5cdCQoZnVuY3Rpb24gKCkge1xuXHRcdGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaG93dG9hcnJpdmUnKSkge1xuXHRcdFx0Y29uc3QgaG93dG9hcnJpdmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaG93dG9hcnJpdmUnKTtcblx0XHRcdGxldCBhcnJpdmFsbWVhbnMgPSBob3d0b2Fycml2ZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtbWVhbnMnKTtcblx0XHRcdGlmICghYXJyaXZhbG1lYW5zKSB7XG5cdFx0XHRcdGFycml2YWxtZWFucyA9ICdhaXInO1xuXHRcdFx0fVxuXHRcdFx0ZGlzcGxheUFycml2YWwoYXJyaXZhbG1lYW5zKTtcblx0XHR9XG5cblx0XHQkKCdib2R5Jykub24oJ2NsaWNrJywgJy5hbWl0ZW0nLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0ZGlzcGxheUFycml2YWwoJCh0aGlzKS5hdHRyKCdpZCcpKTtcblx0XHR9KTtcblx0fSk7XG5cblx0ZnVuY3Rpb24gZGlzcGxheUFycml2YWwodmFsdWUpIHtcblx0XHRsZXQgeCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FtaXRlbScpO1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgeC5sZW5ndGg7IGkrKykge1xuXHRcdFx0eFtpXS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcblx0XHR9XG5cblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWlyLWRhdGEnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0cmFpbi1kYXRhJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXV0by1kYXRhJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3RoZXItZGF0YScpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cdFx0bGV0IGFycml2YWxkYXRhID0gdmFsdWUgKyAnLWRhdGEnO1xuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGFycml2YWxkYXRhKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh2YWx1ZSkuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2pmb3JtX2Fycml2YWxfbWVhbnMnKS52YWx1ZSA9IHZhbHVlO1xuXHR9XG59KShqUXVlcnkpOyIsIi8qKlxuICogQHBhY2thZ2UgICAgS25vdyBSZXNlcnZhdGlvbnNcbiAqIEBzdWJwYWNrYWdlIFNpdGUgSlNcbiAqIEBjb3B5cmlnaHQgIDIwMjAgSGlnaGxhbmQgVmlzaW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogQGxpY2Vuc2UgICAgU2VlIHRoZSBmaWxlIFwiTElDRU5TRS50eHRcIiBmb3IgdGhlIGZ1bGwgbGljZW5zZSBnb3Zlcm5pbmcgdGhpcyBjb2RlLlxuICogQGF1dGhvciAgICAgSGF6ZWwgV2lsc29uIDxoYXplbEBoaWdobGFuZHZpc2lvbi5jb20+XG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbmxldCBvdkNoaWxkcmVuLCBvdlN0YXRlID0gbnVsbCwgb3ZQcyA9IDAsICRvdkJ0bjtcbmxldCBmY0NoaWxkcmVuLCBmY1N0YXRlID0gbnVsbCwgJGZjQnRuO1xubGV0IHR0Q2hpbGRyZW4sIHR0U3RhdGUgPSBudWxsLCB0dFBzID0gMCwgJHR0QnRuLCB0dHBhcmFzO1xubGV0IGN1cnJlbnRQYXJhZ3JhcGgsIGhyRWxlbWVudDtcblxuKGZ1bmN0aW9uICgkKSB7XG5cdCQoZnVuY3Rpb24gKCkge1xuXHRcdG92Q2hpbGRyZW4gPSAkKCcucmVhZG1vcmUtb3ZlcnZpZXcnKS5jaGlsZHJlbigncCwgaDUsIHVsJyk7XG5cdFx0b3ZQcyA9IG92Q2hpbGRyZW4ubGVuZ3RoO1xuXHRcdGlmIChvdlBzID4gMykge1xuXHRcdFx0b3ZDaGlsZHJlbi5zbGljZSgzKS5kaXNwbGF5ID0gJ25vbmUnO1xuXHRcdFx0b3ZDaGlsZHJlbi5zbGljZShvdlBzIC0gMSwgb3ZQcykuYWZ0ZXIoJzxkaXYgY2xhc3M9XCJ0ZXh0LWNlbnRlclwiPjxhIGNsYXNzPVwiYnV0dG9uIGhvbGxvdycgK1xuXHRcdFx0XHQnIHJlYWRtb3JlIG92ZXJ2aWV3LXRvZ2dsZVwiPlJlYWQgbW9yZS4uLjwvYT48L2Rpdj4nKTtcblx0XHRcdG92U3RhdGUgPSAnaGlkZGVuJztcblx0XHR9XG5cblx0XHR0dENoaWxkcmVuID0gJCgnLnJlYWRtb3JlLXRlc3RpbW9uaWFscycpLmNoaWxkcmVuKCdwJyk7XG5cdFx0dHRQcyA9IHR0Q2hpbGRyZW4ubGVuZ3RoO1xuXHRcdGlmICh0dFBzID4gMTApIHtcblx0XHRcdHR0Q2hpbGRyZW4uc2xpY2UoMTEpLmRpc3BsYXkgPSAnbm9uZSc7XG5cdFx0XHR0dHBhcmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnJlYWRtb3JlLXRlc3RpbW9uaWFscyBwW3N0eWxlKj1cImRpc3BsYXk6IG5vbmVcIl0nKTtcblx0XHRcdGRvSFJzKHR0cGFyYXMsICdoaWRlJyk7XG5cdFx0XHR0dENoaWxkcmVuLnNsaWNlKHR0UHMgLSAxLCB0dFBzKS5hZnRlcignPGEgY2xhc3M9XCJidXR0b24gaG9sbG93JyArXG5cdFx0XHRcdCcgYWNjZW50IHJlYWRtb3JlIHRlc3RpbW9uaWFscy10b2dnbGVcIj5SZWFkIG1vcmUuLi48L2E+Jyk7XG5cdFx0XHR0dFN0YXRlID0gJ2hpZGRlbic7XG5cdFx0fVxuXG5cdFx0ZmNDaGlsZHJlbiA9ICQoJy5yZWFkbW9yZS1mYWNpbGl0aWVzJykuY2hpbGRyZW4oJy5yb29tcycpO1xuXHRcdGlmIChmY0NoaWxkcmVuLmxlbmd0aCkge1xuXHRcdFx0ZmNDaGlsZHJlbi5oaWRlKCkuYWZ0ZXIoJzxhIGNsYXNzPVwiYnV0dG9uIGhvbGxvdycgK1xuXHRcdFx0XHQnIGFjY2VudCByZWFkbW9yZSBmYWNpbGl0aWVzLXRvZ2dsZVwiPlNlZSBhbGwgZmFjaWxpdGllcy4uLjwvYT4nKTtcblx0XHRcdGZjU3RhdGUgPSAnaGlkZGVuJztcblx0XHR9XG5cblx0XHQkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLnJlYWRtb3JlLm92ZXJ2aWV3LXRvZ2dsZScsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHQkb3ZCdG4gPSAkKFwiLm92ZXJ2aWV3LXRvZ2dsZVwiKTtcblx0XHRcdGlmIChvdlN0YXRlID09PSAndmlzaWJsZScpIHtcblx0XHRcdFx0b3ZDaGlsZHJlbi5zbGljZSgzKS5oaWRlKCk7XG5cdFx0XHRcdCRvdkJ0bi5hdHRyKCd2YWx1ZScsICdSZWFkIG1vcmUnKTtcblx0XHRcdFx0JG92QnRuLnRleHQoXCJSZWFkIG1vcmUuLi5cIik7XG5cdFx0XHRcdG92U3RhdGUgPSAnaGlkZGVuJztcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmIChvdlN0YXRlID09PSAnaGlkZGVuJykge1xuXHRcdFx0XHRcdCQoJy5yZWFkbW9yZS1vdmVydmlldycpLmZpbmQoJzpoaWRkZW4nKS5zaG93KCk7XG5cdFx0XHRcdFx0JG92QnRuLmF0dHIoJ3ZhbHVlJywgJ1JlYWQgbGVzcycpO1xuXHRcdFx0XHRcdCRvdkJ0bi50ZXh0KFwiUmVhZCBsZXNzLi4uXCIpO1xuXHRcdFx0XHRcdG92U3RhdGUgPSAndmlzaWJsZSc7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdCQoJy5wcm9wZXJ0eS1tZW51JykuZm91bmRhdGlvbignY2FsY1BvaW50cycpO1xuXHRcdFx0JCgnLnN0aWNreScpLmZvdW5kYXRpb24oJ19jYWxjJywgdHJ1ZSk7XG5cdFx0fSkub24oJ2NsaWNrJywgJy5yZWFkbW9yZS50ZXN0aW1vbmlhbHMtdG9nZ2xlJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdCR0dEJ0biA9ICQoXCIudGVzdGltb25pYWxzLXRvZ2dsZVwiKTtcblx0XHRcdGlmICh0dFN0YXRlID09PSAndmlzaWJsZScpIHtcblx0XHRcdFx0dHRDaGlsZHJlbi5zbGljZSgxMSkuaGlkZSgpO1xuXHRcdFx0XHRkb0hScyh0dHBhcmFzLCAnaGlkZScpO1xuXHRcdFx0XHQkdHRCdG4uYXR0cigndmFsdWUnLCAnUmVhZCBtb3JlJyk7XG5cdFx0XHRcdCR0dEJ0bi50ZXh0KFwiUmVhZCBtb3JlLi4uXCIpO1xuXHRcdFx0XHR0dFN0YXRlID0gJ2hpZGRlbic7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAodHRTdGF0ZSA9PT0gJ2hpZGRlbicpIHtcblx0XHRcdFx0XHQkKCcucmVhZG1vcmUtdGVzdGltb25pYWxzIHAnKS5zaG93KCk7XG5cdFx0XHRcdFx0ZG9IUnModHRwYXJhcywgJ3Nob3cnKTtcblx0XHRcdFx0XHQkdHRCdG4uYXR0cigndmFsdWUnLCAnUmVhZCBsZXNzJyk7XG5cdFx0XHRcdFx0JHR0QnRuLnRleHQoXCJSZWFkIGxlc3MuLi5cIik7XG5cdFx0XHRcdFx0dHRTdGF0ZSA9ICd2aXNpYmxlJztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0JCgnLnByb3BlcnR5LW1lbnUnKS5mb3VuZGF0aW9uKCdjYWxjUG9pbnRzJyk7XG5cdFx0XHQkKCcuc3RpY2t5JykuZm91bmRhdGlvbignX2NhbGMnLCB0cnVlKTtcblx0XHR9KS5vbignY2xpY2snLCAnLnJlYWRtb3JlLmZhY2lsaXRpZXMtdG9nZ2xlJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdCRmY0J0biA9ICQoXCIuZmFjaWxpdGllcy10b2dnbGVcIik7XG5cdFx0XHRpZiAoZmNTdGF0ZSA9PT0gJ3Zpc2libGUnKSB7XG5cdFx0XHRcdCQoJy5yZWFkbW9yZS1mYWNpbGl0aWVzIC5yb29tcycpLmhpZGUoKTtcblx0XHRcdFx0JGZjQnRuLmF0dHIoJ3ZhbHVlJywgJ1NlZSBhbGwgZmFjaWxpdGllcycpO1xuXHRcdFx0XHQkZmNCdG4udGV4dChcIlNlZSBhbGwgZmFjaWxpdGllcy4uLlwiKTtcblx0XHRcdFx0ZmNTdGF0ZSA9ICdoaWRkZW4nO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKGZjU3RhdGUgPT09ICdoaWRkZW4nKSB7XG5cdFx0XHRcdFx0JCgnLnJlYWRtb3JlLWZhY2lsaXRpZXMgLnJvb21zJykuc2hvdygpO1xuXHRcdFx0XHRcdCRmY0J0bi5hdHRyKCd2YWx1ZScsICdIaWRlIGFsbCBmYWNpbGl0aWVzJyk7XG5cdFx0XHRcdFx0JGZjQnRuLnRleHQoXCJIaWRlIGFsbCBmYWNpbGl0aWVzLi4uXCIpO1xuXHRcdFx0XHRcdGZjU3RhdGUgPSAndmlzaWJsZSc7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdCQoJy5wcm9wZXJ0eS1tZW51JykuZm91bmRhdGlvbignY2FsY1BvaW50cycpO1xuXHRcdFx0JCgnLnN0aWNreScpLmZvdW5kYXRpb24oJ19jYWxjJywgdHJ1ZSk7XG5cdFx0fSk7XG5cdH0pO1xufShqUXVlcnkpKTtcblxuZnVuY3Rpb24gZG9IUnMocGFyYWdyYXBocywgdHlwZSkge1xuXHRmb3IgKGxldCBpID0gMDsgaSA8IHBhcmFncmFwaHMubGVuZ3RoOyBpKyspIHtcblx0XHRjdXJyZW50UGFyYWdyYXBoID0gcGFyYWdyYXBoc1tpXTtcblx0XHRockVsZW1lbnQgPSBjdXJyZW50UGFyYWdyYXBoLm5leHRFbGVtZW50U2libGluZztcblx0XHRpZiAoaHJFbGVtZW50ICYmIGhyRWxlbWVudC50YWdOYW1lID09PSAnSFInKSB7XG5cdFx0XHRpZiAodHlwZSA9PT0gJ2hpZGUnKSB7XG5cdFx0XHRcdGhyRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aHJFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufSIsIi8qKlxuICogQHBhY2thZ2UgICAgS25vdyBSZXNlcnZhdGlvbnNcbiAqIEBzdWJwYWNrYWdlIFNpdGUgSlNcbiAqIEBjb3B5cmlnaHQgIDIwMjAgSGlnaGxhbmQgVmlzaW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogQGxpY2Vuc2UgICAgU2VlIHRoZSBmaWxlIFwiTElDRU5TRS50eHRcIiBmb3IgdGhlIGZ1bGwgbGljZW5zZSBnb3Zlcm5pbmcgdGhpcyBjb2RlLlxuICogQGF1dGhvciAgICAgSGF6ZWwgV2lsc29uIDxoYXplbEBoaWdobGFuZHZpc2lvbi5jb20+XG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IGxhbmcgPSBcImVuXCI7XG5cbihmdW5jdGlvbiAoJCkge1xuICAgIGNvbnN0IG1hcmtlcnNoYXBlID0ge1xuICAgICAgICB0eXBlOiAncG9seScsXG4gICAgICAgIGNvb3JkczogWzEsIDEsIDEsIDMyLCAzNywgMzIsIDMyLCAxXVxuICAgIH07XG5cbiAgICBsZXQgbXlLcm1hcDtcbiAgICBsZXQgbWFwRGF0YSA9IGZhbHNlO1xuICAgIGxldCBtYXA7XG4gICAgbGV0IGluZm9XaW5kb3c7XG4gICAgbGV0IGluZm9XaW5kb3cyO1xuICAgIGxldCBib3VuZHM7XG4gICAgbGV0IHByb3BlcnR5ZGl2O1xuICAgIGxldCBwcm9wZXJ0eWljb247XG4gICAgbGV0IG1jO1xuXG4gICAgbGV0IHNldHRpbmdzID0ge1xuICAgICAgICBwcm9wZXJ0eU1hcmtlcnM6IFtdLFxuICAgICAgICBmaWx0ZXJJZHM6IFtdLFxuICAgICAgICBtYXBNYXJrZXJzOiBbXSxcbiAgICAgICAgbWFwVHlwZUlkOiAnJyxcbiAgICAgICAgbWFwWm9vbTogMTIsXG4gICAgICAgIG1hcE1heFpvb206IDIwLFxuICAgICAgICBtYXBUeXBlOiAnJyxcbiAgICAgICAgbWFwSWQ6ICcnLFxuICAgICAgICBtYXJrZXJDb2xvcjogJ3JlZCcsXG4gICAgfTtcblxuICAgIGNsYXNzIEtybWFwIHtcbiAgICAgICAgY29uc3RydWN0b3Ioc2V0dGluZ3MpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MgPSBzZXR0aW5ncztcbiAgICAgICAgICAgIC8vSW5pdGlhbGlzZSBtYXAgb3B0aW9uc1xuICAgICAgICAgICAgdGhpcy5nbU9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgc2Nyb2xsd2hlZWw6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHpvb206IHRoaXMuc2V0dGluZ3MubWFwWm9vbSxcbiAgICAgICAgICAgICAgICBtYXhab29tOiB0aGlzLnNldHRpbmdzLm1hcE1heFpvb20sXG4gICAgICAgICAgICAgICAgbWFwVHlwZUlkOiB0aGlzLnNldHRpbmdzLm1hcFR5cGVJZCxcbiAgICAgICAgICAgICAgICBzdHJlZXRWaWV3Q29udHJvbDogZmFsc2UsXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLmdtYXJrZXJzID0gW107XG4gICAgICAgICAgICB0aGlzLmNvdW50ID0gMDtcbiAgICAgICAgICAgIHRoaXMuaW5pdE1hcCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGljIGNsb3NlS3JJbmZvd2luZG93KCkge1xuICAgICAgICAgICAgJCgnI2tyLWluZm93aW5kb3cnKS5oaWRlKCk7XG4gICAgICAgICAgICBpbmZvV2luZG93LmNsb3NlKCk7XG4gICAgICAgICAgICBpbmZvV2luZG93Mi5jbG9zZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gb25seSBzaG93IHZpc2libGUgbWFya2Vyc1xuICAgICAgICBzdGF0aWMgc2hvd1Zpc2libGVNYXJrZXJzKG1hcmtlcnMpIHtcbiAgICAgICAgICAgIGxldCBib3VuZHMgPSBtYXAuZ2V0Qm91bmRzKCk7XG4gICAgICAgICAgICBsZXQgY291bnQgPSAwO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBkID0gMDsgZCA8IG1hcmtlcnMubGVuZ3RoOyBkKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgbWFya2VyID0gbWFya2Vyc1tkXTtcbiAgICAgICAgICAgICAgICBpZiAobWFya2VyLnR5cGUgPT09ICdtYXAnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChib3VuZHMuY29udGFpbnMobWFya2VyLmdldFBvc2l0aW9uKCkpID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXJrZXIuc2V0VmlzaWJsZSh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXJrZXIuc2V0VmlzaWJsZShmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBjb3VudDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENoZWNrIE1hcmtlcnMgYXJyYXkgZm9yIGR1cGxpY2F0ZSBwb3NpdGlvbiBhbmQgb2Zmc2V0IGEgbGl0dGxlXG4gICAgICAgIGNoZWNrRHVwbGljYXRlKGN1cnJlbnQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmdtYXJrZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBsZXQgZHVwcyA9IDA7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5nbWFya2Vycy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBvcyA9IHRoaXMuZ21hcmtlcnNbaW5kZXhdLmdldFBvc2l0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50LmVxdWFscyhwb3MpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkdXBzKys7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYSA9IDM2MC4wIC8gZHVwcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuZXdMYXQgPSBwb3MubGF0KCkgKyAtLjAwMDAyICogTWF0aC5jb3MoKCthICogZHVwcykgLyAxODAgKiBNYXRoLlBJKTsgIC8veFxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld0xuZyA9IHBvcy5sbmcoKSArIC0uMDAwMDAgKiBNYXRoLnNpbigoK2EgKiBkdXBzKSAvIDE4MCAqIE1hdGguUEkpOyAgLy9ZXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50ID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhuZXdMYXQsIG5ld0xuZyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgY2x1c3Rlck1hcCgpIHtcbiAgICAgICAgICAgIGNvbnN0IG1jT3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICBncmlkU2l6ZTogNTAsXG4gICAgICAgICAgICAgICAgaWdub3JlSGlkZGVuTWFya2VyczogdHJ1ZSxcbiAgICAgICAgICAgICAgICBpbWFnZVBhdGg6ICcvbWVkaWEvY29tX2tub3dyZXMvaW1hZ2VzL21hcmtlcmNsdXN0ZXJlci9tJ1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgbWFwLm1heERlZmF1bHRab29tID0gdGhpcy5zZXR0aW5ncy5tYXBab29tO1xuICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MubWFwWm9vbSA+IDApIHtcbiAgICAgICAgICAgICAgICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lck9uY2UobWFwLCBcImJvdW5kc19jaGFuZ2VkXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRab29tKE1hdGgubWluKHRoaXMuZ2V0Wm9vbSgpLCB0aGlzLm1heERlZmF1bHRab29tKSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc2V0UHJvcGVydHlNYXJrZXJzKCk7XG4gICAgICAgICAgICB0aGlzLnNldE1hcE1hcmtlcnMoKTtcblxuICAgICAgICAgICAgZm9yIChsZXQgZCA9IDA7IGQgPCB0aGlzLmdtYXJrZXJzLmxlbmd0aDsgZCsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IG1hcmtlciA9IHRoaXMuZ21hcmtlcnNbZF07XG4gICAgICAgICAgICAgICAgaWYgKG1hcmtlci50eXBlID09PSAncHJvcGVydHknKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmZpbHRlcklkcy5pbmNsdWRlcyhtYXJrZXIucGlkKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFya2VyLnNldFZpc2libGUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXJrZXIuc2V0VmlzaWJsZShmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG1jID0gbmV3IE1hcmtlckNsdXN0ZXJlcihtYXAsIHRoaXMuZ21hcmtlcnMsIG1jT3B0aW9ucyk7XG4gICAgICAgICAgICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYywgXCJjbHVzdGVyY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICQoJyNrci1pbmZvd2luZG93JykuaGlkZSgpO1xuICAgICAgICAgICAgICAgIGluZm9XaW5kb3cuY2xvc2UoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBtYXAuZml0Qm91bmRzKGJvdW5kcyk7XG4gICAgICAgICAgICBtYXAuc2V0Q2VudGVyKGJvdW5kcy5nZXRDZW50ZXIoKSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDcmVhdGUgdGhlIE1hcFxuICAgICAgICBjcmVhdGVNYXAoKSB7XG4gICAgICAgICAgICBtYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuc2V0dGluZ3MubWFwSWQpLCB0aGlzLmdtT3B0aW9ucyk7XG4gICAgICAgICAgICBpbmZvV2luZG93ID0gbmV3IGdvb2dsZS5tYXBzLkluZm9XaW5kb3coKTtcbiAgICAgICAgICAgIGluZm9XaW5kb3cyID0gbmV3IGdvb2dsZS5tYXBzLkluZm9XaW5kb3coKTtcbiAgICAgICAgICAgIGJvdW5kcyA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmdCb3VuZHMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENyZWF0ZSB0aGUgbWFya2VyIGFuZCBzZXQgdXAgdGhlIGV2ZW50IHdpbmRvd1xuICAgICAgICBjcmVhdGVNYXBNYXJrZXIocG9pbnQsIGh0bWwsIGltYWdlLCBib3hpbmZvLCBsaW5rLCB0aXRsZSkge1xuICAgICAgICAgICAgbGV0IG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xuICAgICAgICAgICAgICAgIHNoYXBlOiBtYXJrZXJzaGFwZSxcbiAgICAgICAgICAgICAgICBsaW5rOiBsaW5rLFxuICAgICAgICAgICAgICAgIGljb246IGltYWdlLFxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBwb2ludCxcbiAgICAgICAgICAgICAgICB0aXRsZTogdGl0bGUsXG4gICAgICAgICAgICAgICAgbWFwOiBtYXAsXG4gICAgICAgICAgICAgICAgekluZGV4OiA5OTksXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIobWFya2VyLCAnbW91c2VvdmVyJywgKGZ1bmN0aW9uIChodG1sKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5mb1dpbmRvdzIuc2V0Q29udGVudChodG1sKTtcbiAgICAgICAgICAgICAgICAgICAgaW5mb1dpbmRvdzIub3BlbihtYXAsIG1hcmtlcik7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pKGh0bWwpKTtcblxuICAgICAgICAgICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIobWFya2VyLCAnbW91c2VvdXQnLCAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGluZm9XaW5kb3cyLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pKCkpO1xuXG4gICAgICAgICAgICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYXJrZXIsICdjbG9zZWNsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGluZm9XaW5kb3cyLmNsb3NlKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5nbWFya2Vycy5wdXNoKG1hcmtlcik7XG4gICAgICAgICAgICB0aGlzLmNvdW50Kys7XG4gICAgICAgIH1cblxuICAgICAgICBjcmVhdGVQcm9wZXJ0eU1hcmtlcihwb2ludCwgaHRtbCwgYm94aW5mbywgbGluaywgdGl0bGUsIGNvbG9yLCBpZCwgaW1hZ2UsIHBpZCkge1xuICAgICAgICAgICAgbGV0IG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBwb2ludCxcbiAgICAgICAgICAgICAgICBsaW5rOiBsaW5rLFxuICAgICAgICAgICAgICAgIG1hcDogbWFwLFxuICAgICAgICAgICAgICAgIGljb246IGltYWdlLFxuICAgICAgICAgICAgICAgIHRpdGxlOiB0aXRsZSxcbiAgICAgICAgICAgICAgICBwaWQ6IHBpZCxcbiAgICAgICAgICAgICAgICB0eXBlOiAncHJvcGVydHknLFxuICAgICAgICAgICAgICAgIHpJbmRleDogdGhpcy5jb3VudCArIDEwMDBcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBwcm9wZXJ0eWRpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcbiAgICAgICAgICAgIG1hcmtlci5hZGRMaXN0ZW5lcignbW91c2Vkb3duJywgKGZ1bmN0aW9uIChib3hpbmZvKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5mb1dpbmRvdy5jbG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICAkKCcja3ItaW5mb3dpbmRvdycpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgaW5mb1dpbmRvdy5zZXRDb250ZW50KGh0bWwpO1xuICAgICAgICAgICAgICAgICAgICBpbmZvV2luZG93Lm9wZW4obWFwLCBtYXJrZXIpO1xuXG4gICAgICAgICAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJy9pbmRleC5waHA/b3B0aW9uPWNvbV9rbm93cmVzJnRhc2s9cHJvcGVydHkubWFwaW5mb3dpbmRvdycsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHBhcnNlSW50KGJveGluZm8pXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcja3ItaW5mb3dpbmRvdycpLmZhZGVJbig0MDApLmh0bWwoZGF0YSkuc2hvdygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIua3ItaW5mb3dpbmRvdy1zbGlkZXNob3dcIikubm90KCcuc2xpY2staW5pdGlhbGl6ZWQnKS5zbGljayh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHRBcnJvdzogJzxpIGNsYXNzPVwic2xpY2stbmF2IG5leHQgZmEtc29saWQgZmEtY2hldnJvbi1yaWdodCBcIj48L2k+JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJldkFycm93OiAnPGkgY2xhc3M9XCJzbGljay1uYXYgcHJldiBmYS1zb2xpZCBmYS1jaGV2cm9uLWxlZnQgXCI+PC9pPicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KShib3hpbmZvKSk7XG5cbiAgICAgICAgICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKG1hcmtlciwgJ2Nsb3NlY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgJCgnI2tyLWluZm93aW5kb3cnKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgaW5mb1dpbmRvdy5jbG9zZSgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuZ21hcmtlcnMucHVzaChtYXJrZXIpO1xuICAgICAgICAgICAgYm91bmRzLmV4dGVuZChwb2ludCk7XG5cbiAgICAgICAgICAgIHRoaXMuY291bnQrKztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vSW5pdGlhbGlzZSBtYXBcbiAgICAgICAgaW5pdE1hcCgpIHtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlTWFwKCk7XG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5tYXBUeXBlID09PSAnY2x1c3RlcicpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsdXN0ZXJNYXAoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zb2xvTWFwKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZXNldCBtYXAgdG8gaW5pdGlhbCBzdGF0ZVxuICAgICAgICByZWZyZXNoTWFwKCRtYXBtb2RhbCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MubWFwVHlwZSA9PT0gJ3NvbG8nKVxuICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgalF1ZXJ5LmFqYXgoe1xuICAgICAgICAgICAgICAgIHVybDogJy9pbmRleC5waHA/b3B0aW9uPWNvbV9rbm93cmVzJnRhc2s9cHJvcGVydGllcy5yZWZyZXNobWFwJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXR0aW5ncy5maWx0ZXJJZHMgPSByZXN1bHQuZGF0YS5maWx0ZXJJZHM7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBkID0gMDsgZCA8IHNlbGYuZ21hcmtlcnMubGVuZ3RoOyBkKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbWFya2VyID0gc2VsZi5nbWFya2Vyc1tkXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobWFya2VyLnR5cGUgPT09ICdwcm9wZXJ0eScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGYuc2V0dGluZ3MuZmlsdGVySWRzLmluY2x1ZGVzKG1hcmtlci5waWQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJrZXIuc2V0VmlzaWJsZSh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtlci5zZXRWaXNpYmxlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgbWMucmVwYWludCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEZvdW5kYXRpb24uUmV2ZWFsKCRtYXBtb2RhbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkbWFwbW9kYWwuZm91bmRhdGlvbignb3BlbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZ29vZ2xlLm1hcHMuZXZlbnQudHJpZ2dlcihtYXAsICdyZXNpemUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRtYXBtb2RhbC5mb3VuZGF0aW9uKCdvcGVuJyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuYWxlcnQocmVzdWx0Lm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZXNldCBtYXAgdG8gaW5pdGlhbCBzdGF0ZVxuICAgICAgICByZXNldE1hcCgpIHtcbiAgICAgICAgICAgIGluZm9XaW5kb3cuY2xvc2UoKTtcbiAgICAgICAgICAgIGluZm9XaW5kb3cyLmNsb3NlKCk7XG4gICAgICAgICAgICAkKCcja3ItaW5mb3dpbmRvdycpLmhpZGUoKTtcbiAgICAgICAgICAgIG1hcC5maXRCb3VuZHMoYm91bmRzKTtcbiAgICAgICAgICAgIG1hcC5zZXRDZW50ZXIoYm91bmRzLmdldENlbnRlcigpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGxvb3AgdG8gc2V0IG1hcCBtYXJrZXJzXG4gICAgICAgIHNldE1hcE1hcmtlcnMoKSB7XG4gICAgICAgICAgICBsZXQgcG9pbnQ7XG4gICAgICAgICAgICBsZXQgYW1hcms7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGQgPSAwOyBkIDwgdGhpcy5zZXR0aW5ncy5tYXBNYXJrZXJzLmxlbmd0aDsgZCsrKSB7XG4gICAgICAgICAgICAgICAgYW1hcmsgPSB0aGlzLnNldHRpbmdzLm1hcE1hcmtlcnNbZF07XG4gICAgICAgICAgICAgICAgbGV0IG1hcmtlcmljb24gPSB7XG4gICAgICAgICAgICAgICAgICAgIHVybDogYW1hcmtbJ2ljb24nXSxcbiAgICAgICAgICAgICAgICAgICAgc2l6ZTogbmV3IGdvb2dsZS5tYXBzLlNpemUoMzIsIDM3KSwgLy8gT1Igc2NhbGVkU2l6ZTogbmV3IGdvb2dsZS5tYXBzLlNpemUoNDAsIDQ3KVxuICAgICAgICAgICAgICAgICAgICBvcmlnaW46IG5ldyBnb29nbGUubWFwcy5Qb2ludCgwLCAwKSxcbiAgICAgICAgICAgICAgICAgICAgYW5jaG9yOiBuZXcgZ29vZ2xlLm1hcHMuUG9pbnQoMCwgMTgpXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHBvaW50ID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhhbWFya1snbGF0J10sIGFtYXJrWydsbmcnXSk7XG4gICAgICAgICAgICAgICAgcG9pbnQgPSB0aGlzLmNoZWNrRHVwbGljYXRlKHBvaW50KTtcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZU1hcE1hcmtlcihwb2ludCwgYW1hcmtbJ2h0bWwnXSwgbWFya2VyaWNvbiwgJycsICcnLCBhbWFya1sndGl0bGUnXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBsb29wIHRvIHNldCBwcm9wZXJ0eSBtYXJrZXJzXG4gICAgICAgIHNldFByb3BlcnR5TWFya2VycygpIHtcbiAgICAgICAgICAgIGxldCBwb2ludDtcbiAgICAgICAgICAgIGxldCBhbWFyaztcblxuICAgICAgICAgICAgZm9yIChsZXQgZCA9IDA7IGQgPCB0aGlzLnNldHRpbmdzLnByb3BlcnR5TWFya2Vycy5sZW5ndGg7IGQrKykge1xuICAgICAgICAgICAgICAgIGFtYXJrID0gdGhpcy5zZXR0aW5ncy5wcm9wZXJ0eU1hcmtlcnNbZF07XG5cbiAgICAgICAgICAgICAgICBpZiAoIWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydHlpY29uID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBhbWFya1snaWNvbiddLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZTogbmV3IGdvb2dsZS5tYXBzLlNpemUoMzIsIDM3KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9yaWdpbjogbmV3IGdvb2dsZS5tYXBzLlBvaW50KDAsIDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgYW5jaG9yOiBuZXcgZ29vZ2xlLm1hcHMuUG9pbnQoMCwgMjApXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcG9pbnQgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKGFtYXJrWydsYXQnXSwgYW1hcmtbJ2xuZyddKTtcbiAgICAgICAgICAgICAgICBwb2ludCA9IHRoaXMuY2hlY2tEdXBsaWNhdGUocG9pbnQpO1xuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlUHJvcGVydHlNYXJrZXIocG9pbnQsIGFtYXJrWydodG1sJ10sIGFtYXJrWydib3hpbmZvJ10sIGFtYXJrWydsaW5rJ10sIGFtYXJrWyd0aXRsZSddLFxuICAgICAgICAgICAgICAgICAgICBhbWFya1snY29sb3InXSwgYW1hcmtbJ2lkJ10sIHByb3BlcnR5aWNvbiwgYW1hcmtbJ3BpZCddKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHNvbG9NYXAoKSB7XG4gICAgICAgICAgICB0aGlzLnNldFByb3BlcnR5TWFya2VycygpO1xuICAgICAgICAgICAgdGhpcy5zZXRNYXBNYXJrZXJzKCk7XG5cbiAgICAgICAgICAgIG1hcC5maXRCb3VuZHMoYm91bmRzKTtcbiAgICAgICAgICAgIG1hcC5zZXRDZW50ZXIoYm91bmRzLmdldENlbnRlcigpKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MubWFwTWFya2Vycy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgICAgICAgICBsZXQgbXlMaXN0ZW5lciA9IGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKG1hcCwgJ2lkbGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBmb3VuZCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjdXJyZW50Wm9vbSA9IG1hcC5nZXRab29tKCk7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlICghZm91bmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvdW5kID0gS3JtYXAuc2hvd1Zpc2libGVNYXJrZXJzKHNlbGYuZ21hcmtlcnMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZvdW5kKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbXlMaXN0ZW5lci5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXAuc2V0Wm9vbShjdXJyZW50Wm9vbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50Wm9vbSA9IGN1cnJlbnRab29tIC0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50Wm9vbSA8IDEwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgICQoZnVuY3Rpb24gKCkge1xuICAgICAgICBsZXQgJG1hcG1vZGFsO1xuXG4gICAgICAgICQoJ2JvZHknKS5vbignY2xpY2snLCAnLm1hcC10cmlnZ2VyJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGlmIChtYXBEYXRhKSB7XG4gICAgICAgICAgICAgICAgbXlLcm1hcC5yZWZyZXNoTWFwKCRtYXBtb2RhbCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGtpY2tNYXAoJCh0aGlzKSk7XG4gICAgICAgICAgICAgICAgJG1hcG1vZGFsID0gJCgnI2tyLXNlYXJjaC1tYXAtbW9kYWwnKTtcbiAgICAgICAgICAgICAgICBpZiAoJG1hcG1vZGFsLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAkbWFwbW9kYWwuZm91bmRhdGlvbignb3BlbicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkub24oJ2NsaWNrJywgJy5yZXNldG1hcCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBteUtybWFwLnJlc2V0TWFwKCk7XG4gICAgICAgIH0pLm9uKCdjbGljaycsICcja3Itc2VhcmNoLW1hcC1mdWxsLWluZm93aW5kb3ctY2xvc2UnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgS3JtYXAuY2xvc2VLckluZm93aW5kb3coKTtcbiAgICAgICAgfSkub24oJ2NsaWNrJywgJy5jbG9zZW1hcCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAkbWFwbW9kYWwuZm91bmRhdGlvbignY2xvc2UnKTtcbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICAgICAgdXJsOiAnL2luZGV4LnBocD9vcHRpb249Y29tX2tub3dyZXMmdGFzaz1wcm9wZXJ0aWVzLm1hcHNlc3Npb24nLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgJCgnLmtyLXNlYXJjaGJhciAuYnV0dG9uLm1hcCcpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pLm9uKCdvcGVuLnpmLnJldmVhbCcsICcja3Itc2VhcmNoLW1hcC1tb2RhbCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAkKCcja3Itc2VhcmNoLW1hcC1mdWxsJykuaGVpZ2h0KCQoJyNrci1zZWFyY2gtbWFwLW1vZGFsJykuaGVpZ2h0KCkpO1xuICAgICAgICAgICAgZ29vZ2xlLm1hcHMuZXZlbnQudHJpZ2dlcihtYXAsIFwicmVzaXplXCIpO1xuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgICAgICB1cmw6ICcvaW5kZXgucGhwP29wdGlvbj1jb21fa25vd3JlcyZ0YXNrPXByb3BlcnRpZXMubWFwc2Vzc2lvbicsXG4gICAgICAgICAgICAgICAgZGF0YToge21hcF9tb2RhbDogJzEnfSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBEb2Vzbid0IHRyaWdnZXIgaWYgaW5jbHVkZWQgYWJvdmUgPz9cbiAgICAgICAgaWYgKCFtYXBEYXRhKSB7XG4gICAgICAgICAgICBjb25zdCAkc29sb1RyaWdnZXIgPSAkKCcja3ItbWFwLXNvbG8tdHJpZ2dlcicpO1xuICAgICAgICAgICAgJHNvbG9UcmlnZ2VyLm9uZSgnY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAga2lja01hcCgkc29sb1RyaWdnZXIpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmICh3aW5kb3cubG9jYXRpb24uaHJlZi5pbmRleE9mKCcjbWFwJykgIT09IC0xICYmICRzb2xvVHJpZ2dlci5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBraWNrTWFwKCRzb2xvVHJpZ2dlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUZXN0IGZvciBmb3JjZSBtYXBcbiAgICAgICAgY29uc3QgJG10cmlnZ2VyID0gJCgnLm1hcC10cmlnZ2VyJyk7XG4gICAgICAgIGlmICgkbXRyaWdnZXIubGVuZ3RoICYmICRtdHJpZ2dlci5kYXRhKCdmb3JjZW1hcCcpKSB7XG4gICAgICAgICAgICAkbXRyaWdnZXIudHJpZ2dlcignY2xpY2snKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGtpY2tNYXAoJGVsZW0pIHtcbiAgICAgICAgICAgIGNvbnN0IHR5cGUgPSAkZWxlbS5kYXRhKCd0eXBlJyk7XG4gICAgICAgICAgICBsZXQgcGlkID0gMDtcbiAgICAgICAgICAgIGlmICh0eXBlID09PSAnc29sbycpIHtcbiAgICAgICAgICAgICAgICBwaWQgPSAkZWxlbS5kYXRhKCdwaWQnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgalF1ZXJ5LmFqYXgoe1xuICAgICAgICAgICAgICAgIHVybDogJy9pbmRleC5waHA/b3B0aW9uPWNvbV9rbm93cmVzJnRhc2s9cHJvcGVydGllcy5tYXBkYXRhJnBpZD0nICsgcGlkLFxuICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiBcImpzb25cIixcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3MgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwSWQ6ICRlbGVtLmRhdGEoJ3RhcmdldCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcFR5cGU6ICRlbGVtLmRhdGEoJ3R5cGUnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXBUeXBlSWQ6ICRlbGVtLmRhdGEoJ21hcHR5cGVpZCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcFpvb206IHBhcnNlSW50KCRlbGVtLmRhdGEoJ3pvb20nKSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwTWF4Wm9vbTogcGFyc2VJbnQoJGVsZW0uZGF0YSgnem9vbW1heCcpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eU1hcmtlcnM6IHJlc3VsdC5kYXRhLnByb3BlcnR5TWFya2VycyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXBNYXJrZXJzOiByZXN1bHQuZGF0YS5tYXBNYXJrZXJzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcklkczogcmVzdWx0LmRhdGEuZmlsdGVySWRzXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBteUtybWFwID0gbmV3IEtybWFwKHNldHRpbmdzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcERhdGEgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmFsZXJ0KHJlc3VsdC5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG59KGpRdWVyeSkpOyIsIi8qKlxuICogQHBhY2thZ2UgICAgS25vdyBSZXNlcnZhdGlvbnNcbiAqIEBzdWJwYWNrYWdlIFNpdGUgSlNcbiAqIEBjb3B5cmlnaHQgIDIwMjAgSGlnaGxhbmQgVmlzaW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogQGxpY2Vuc2UgICAgU2VlIHRoZSBmaWxlIFwiTElDRU5TRS50eHRcIiBmb3IgdGhlIGZ1bGwgbGljZW5zZSBnb3Zlcm5pbmcgdGhpcyBjb2RlLlxuICogQGF1dGhvciAgICAgSGF6ZWwgV2lsc29uIDxoYXplbEBoaWdobGFuZHZpc2lvbi5jb20+XG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoJCkge1xuXHRsZXQgbXlLcnJvdXRlO1xuXHRsZXQgZGlyZWN0aW9uc0Rpc3BsYXk7XG5cdGxldCBkaXJlY3Rpb25zVmlzaWJsZSA9IGZhbHNlO1xuXHRsZXQgcm91dGVNYXA7XG5cdGxldCBvcmlnaW47XG5cdGxldCBkZXN0aW5hdGlvbjtcblx0bGV0IHJvdXRlTWFya2VycyA9IFtdO1xuXHRsZXQgcm91dGVTdG9wUG9pbnRzID0gW107XG5cdGxldCBwb2ludDtcblx0bGV0IHNlbGY7XG5cblx0bGV0IHNldHRpbmdzID0ge1xuXHRcdGxhdDogICAgICAgICAgICAgICBcIlwiLFxuXHRcdGxuZzogICAgICAgICAgICAgICBcIlwiLFxuXHRcdG5hbWU6ICAgICAgICAgICAgICBcIlwiLFxuXHRcdGljb246ICAgICAgICAgICAgICBcIlwiLFxuXHRcdGRldG91cjogICAgICAgICAgICBcIlwiLFxuXHRcdG1hcFpvb206ICAgICAgICAgICA5LFxuXHRcdG1hcE1heFpvb206ICAgICAgICAxOCxcblx0XHRtYXBUeXBlSWQ6ICAgICAgICAgXCJyb2FkbWFwXCIsXG5cdFx0bWFwSWQ6ICAgICAgICAgICAgIFwia3ItbWFwLXJvdXRlXCIsXG5cdFx0ZGlyZWN0aW9uc1BhbmVsOiAgIFwia3ItZGlyZWN0aW9ucy1wYW5lbFwiLFxuXHRcdGRpcmVjdGlvbnNTZXJ2aWNlOiBudWxsXG5cdH07XG5cblx0Y2xhc3MgS3Jyb3V0ZSB7XG5cdFx0Y29uc3RydWN0b3IoJGVsZW1lbnQsIG9wdGlvbnMpIHtcblx0XHRcdHRoaXMuc2V0dGluZ3MgPSBzZXR0aW5ncztcblx0XHRcdGlmIChvcHRpb25zKSB7XG5cdFx0XHRcdCQuZXh0ZW5kKHRoaXMuc2V0dGluZ3MsIG9wdGlvbnMpO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLnNldHRpbmdzLmRpcmVjdGlvbnNTZXJ2aWNlID0gbmV3IGdvb2dsZS5tYXBzLkRpcmVjdGlvbnNTZXJ2aWNlKCk7XG5cdFx0XHR0aGlzLmluaXQoKTtcblx0XHR9XG5cblx0XHRzdGF0aWMgY2xlYXJSb3V0ZU1hcmtlcnMoKSB7XG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHJvdXRlTWFya2Vycy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRyb3V0ZU1hcmtlcnNbaV0uc2V0TWFwKG51bGwpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHN0YXRpYyBjbGVhcldheXBvaW50cygpIHtcblx0XHRcdG9yaWdpbiA9IG51bGw7XG5cdFx0XHRyb3V0ZU1hcmtlcnMgPSBbXTtcblx0XHRcdHJvdXRlU3RvcFBvaW50cyA9IFtdO1xuXHRcdFx0ZGlyZWN0aW9uc1Zpc2libGUgPSBmYWxzZTtcblx0XHR9XG5cblx0XHRhZGRSb3V0ZU1hcmtlcihsYXRsbmcpIHtcblx0XHRcdHJvdXRlTWFya2Vycy5wdXNoKG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xuXHRcdFx0XHRwb3NpdGlvbjogbGF0bG5nLFxuXHRcdFx0XHRtYXA6ICAgICAgcm91dGVNYXAsXG5cdFx0XHRcdGljb246ICAgICB0aGlzLnNldHRpbmdzLmRldG91clxuXHRcdFx0fSkpO1xuXHRcdH1cblxuXHRcdGNhbGNSb3V0ZSgpIHtcblx0XHRcdGxldCBmcm9tX2FkZHJlc3MgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZyb21fYWRkcmVzc1wiKS52YWx1ZTtcblx0XHRcdGxldCBvcmlnaW4gPSBcIlwiO1xuXG5cdFx0XHRpZiAoZnJvbV9hZGRyZXNzID09PSBcIkFkZHJlc3NcIikgZnJvbV9hZGRyZXNzID0gXCJcIjtcblx0XHRcdGlmIChmcm9tX2FkZHJlc3MpIG9yaWdpbiA9IGZyb21fYWRkcmVzcyArIFwiLFwiICsgXCJcIjtcblxuXHRcdFx0bGV0IG1vZGU7XG5cdFx0XHRzd2l0Y2ggKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW9kZVwiKS52YWx1ZSkge1xuXHRcdFx0XHRjYXNlIFwiYmljeWNsaW5nXCI6XG5cdFx0XHRcdFx0bW9kZSA9IGdvb2dsZS5tYXBzLlRyYXZlbE1vZGUuQklDWUNMSU5HO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwiZHJpdmluZ1wiOlxuXHRcdFx0XHRcdG1vZGUgPSBnb29nbGUubWFwcy5UcmF2ZWxNb2RlLkRSSVZJTkc7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJ3YWxraW5nXCI6XG5cdFx0XHRcdFx0bW9kZSA9IGdvb2dsZS5tYXBzLlRyYXZlbE1vZGUuV0FMS0lORztcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0aWYgKG9yaWdpbikge1xuXHRcdFx0XHRsZXQgcmVxdWVzdCA9IHtcblx0XHRcdFx0XHRvcmlnaW46ICAgICAgICBvcmlnaW4sXG5cdFx0XHRcdFx0ZGVzdGluYXRpb246ICAgZGVzdGluYXRpb24sXG5cdFx0XHRcdFx0d2F5cG9pbnRzOiAgICAgcm91dGVTdG9wUG9pbnRzLFxuXHRcdFx0XHRcdHRyYXZlbE1vZGU6ICAgIG1vZGUsXG5cdFx0XHRcdFx0YXZvaWRIaWdod2F5czogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hpZ2h3YXlzJykuY2hlY2tlZCxcblx0XHRcdFx0XHRhdm9pZFRvbGxzOiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9sbHMnKS5jaGVja2VkXG5cdFx0XHRcdH07XG5cblx0XHRcdFx0c2VsZiA9IHRoaXM7XG5cdFx0XHRcdHRoaXMuc2V0dGluZ3MuZGlyZWN0aW9uc1NlcnZpY2Uucm91dGUocmVxdWVzdCwgZnVuY3Rpb24gKHJlc3BvbnNlLCBzdGF0dXMpIHtcblx0XHRcdFx0XHRpZiAoc3RhdHVzID09PSBnb29nbGUubWFwcy5EaXJlY3Rpb25zU3RhdHVzLk9LKSB7XG5cdFx0XHRcdFx0XHRkaXJlY3Rpb25zRGlzcGxheS5zZXREaXJlY3Rpb25zKHJlc3BvbnNlKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0YWxlcnQoXCJHb29nbGUgY291bGRuYHQgY2FsY3VsYXRlIGRpcmVjdGlvbnMgZm9yIHRoaXMgcm91dGUgYW5kIHNlbGVjdGVkIG9wdGlvbnNcIik7XG5cdFx0XHRcdFx0XHRzZWxmLnJlc2V0Um91dGUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXG5cdFx0XHRLcnJvdXRlLmNsZWFyUm91dGVNYXJrZXJzKCk7XG5cdFx0XHRkaXJlY3Rpb25zVmlzaWJsZSA9IHRydWU7XG5cdFx0fVxuXG5cdFx0aW5pdCgpIHtcblx0XHRcdGRlc3RpbmF0aW9uID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyh0aGlzLnNldHRpbmdzLmxhdCwgdGhpcy5zZXR0aW5ncy5sbmcpO1xuXG5cdFx0XHQvL0luaXRpYWxpc2UgbWFwIG9wdGlvbnNcblx0XHRcdHRoaXMubXlPcHRpb25zID0ge1xuXHRcdFx0XHRzY3JvbGx3aGVlbDogICAgICAgZmFsc2UsXG5cdFx0XHRcdHpvb206ICAgICAgICAgICAgICB0aGlzLnNldHRpbmdzLm1hcFpvb20sXG5cdFx0XHRcdG1heFpvb206ICAgICAgICAgICB0aGlzLnNldHRpbmdzLm1hcE1heFpvb20sXG5cdFx0XHRcdG1hcFR5cGVJZDogICAgICAgICB0aGlzLnNldHRpbmdzLm1hcFR5cGVJZCxcblx0XHRcdFx0c3RyZWV0Vmlld0NvbnRyb2w6IGZhbHNlLFxuXHRcdFx0XHRjZW50ZXI6ICAgICAgICAgICAgZGVzdGluYXRpb25cblx0XHRcdH07XG5cblx0XHRcdHJvdXRlTWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnNldHRpbmdzLm1hcElkKSwgdGhpcy5teU9wdGlvbnMpO1xuXHRcdFx0ZGlyZWN0aW9uc0Rpc3BsYXkgPSBuZXcgZ29vZ2xlLm1hcHMuRGlyZWN0aW9uc1JlbmRlcmVyKCk7XG5cdFx0XHRkaXJlY3Rpb25zRGlzcGxheS5zZXRNYXAocm91dGVNYXApO1xuXHRcdFx0ZGlyZWN0aW9uc0Rpc3BsYXkuc2V0UGFuZWwoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5zZXR0aW5ncy5kaXJlY3Rpb25zUGFuZWwpKTtcblxuXHRcdFx0Y29uc3QgaW1hZ2UgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VySW1hZ2UodGhpcy5zZXR0aW5ncy5pY29uKTtcblx0XHRcdHBvaW50ID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyh0aGlzLnNldHRpbmdzLmxhdCwgdGhpcy5zZXR0aW5ncy5sbmcpO1xuXG5cdFx0XHRzZWxmID0gdGhpcztcblx0XHRcdGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKHJvdXRlTWFwLCAnY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRcdFx0aWYgKHJvdXRlU3RvcFBvaW50cy5sZW5ndGggPCA5KSB7XG5cdFx0XHRcdFx0cm91dGVTdG9wUG9pbnRzLnB1c2goe2xvY2F0aW9uOiBldmVudC5sYXRMbmcsIHN0b3BvdmVyOiB0cnVlfSk7XG5cdFx0XHRcdFx0cG9pbnQgPSBldmVudC5sYXRMbmc7XG5cdFx0XHRcdFx0c2VsZi5hZGRSb3V0ZU1hcmtlcihwb2ludCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0YWxlcnQoXCJNYXhpbXVtIG51bWJlciBvZiA5IHdheXBvaW50cyByZWFjaGVkXCIpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0c2VsZiA9IHRoaXM7XG5cdFx0XHRnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lck9uY2Uocm91dGVNYXAsICdpZGxlJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRnb29nbGUubWFwcy5ldmVudC50cmlnZ2VyKHJvdXRlTWFwLCAncmVzaXplJyk7XG5cdFx0XHRcdHNlbGYuY2FsY1JvdXRlKCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRyZXNldFJvdXRlKCkge1xuXHRcdFx0S3Jyb3V0ZS5jbGVhclJvdXRlTWFya2VycygpO1xuXHRcdFx0S3Jyb3V0ZS5jbGVhcldheXBvaW50cygpO1xuXHRcdFx0ZGlyZWN0aW9uc0Rpc3BsYXkuc2V0TWFwKG51bGwpO1xuXHRcdFx0ZGlyZWN0aW9uc0Rpc3BsYXkuc2V0UGFuZWwobnVsbCk7XG5cdFx0XHRkaXJlY3Rpb25zRGlzcGxheSA9IG5ldyBnb29nbGUubWFwcy5EaXJlY3Rpb25zUmVuZGVyZXIoKTtcblx0XHRcdGRpcmVjdGlvbnNEaXNwbGF5LnNldE1hcChyb3V0ZU1hcCk7XG5cdFx0XHRkaXJlY3Rpb25zRGlzcGxheS5zZXRQYW5lbChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnNldHRpbmdzLmRpcmVjdGlvbnNQYW5lbCkpO1xuXG5cdFx0XHR0aGlzLmluaXQoKTtcblx0XHR9XG5cdH1cblxuXHQkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG5cdFx0JChcIi5rci1kaXJlY3Rpb25zLW1vZGFsXCIpLm9uKCdjbGljaycsICcja3ItbWFwLXJvdXRlJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0bGV0ICRlbGVtZW50ID0gJCh0aGlzKTtcblx0XHRcdGNvbnN0IG9wdGlvbnMgPSB7XG5cdFx0XHRcdGxhdDogICAgJGVsZW1lbnQuZGF0YSgnbGF0JyksXG5cdFx0XHRcdGxuZzogICAgJGVsZW1lbnQuZGF0YSgnbG5nJyksXG5cdFx0XHRcdG5hbWU6ICAgJGVsZW1lbnQuZGF0YSgnbmFtZScpLFxuXHRcdFx0XHRpY29uOiAgICRlbGVtZW50LmRhdGEoJ2ljb24nKSxcblx0XHRcdFx0ZGV0b3VyOiAkZWxlbWVudC5kYXRhKCdkZXRvdXInKVxuXHRcdFx0fTtcblx0XHRcdG15S3Jyb3V0ZSA9IG5ldyBLcnJvdXRlKCRlbGVtZW50LCBvcHRpb25zKTtcblx0XHR9KS5vbignY2xpY2snLCAnLnJlc2V0cm91dGUnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0bXlLcnJvdXRlLnJlc2V0Um91dGUoKTtcblx0XHR9KS5vbignY2xpY2snLCAnLmNhbGNyb3V0ZScsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRteUtycm91dGUuY2FsY1JvdXRlKCk7XG5cdFx0fSk7XG5cblx0XHRqUXVlcnkoXCJhI2dlb2NvZGVBZGRyZXNzXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdGxldCBhZGRyZXNzU3RyaW5nID1cblx0XHRcdFx0alF1ZXJ5KFwiI2pmb3JtX3Byb3BlcnR5X3N0cmVldFwiKS52YWwoKSArIFwiLCBcIiArXG5cdFx0XHRcdGpRdWVyeSgnI2pmb3JtX3Rvd25faWQnKS5maW5kKFwiOnNlbGVjdGVkXCIpLnRleHQoKSArIFwiIFwiICtcblx0XHRcdFx0alF1ZXJ5KFwiI2pmb3JtX3Byb3BlcnR5X3Bvc3Rjb2RlXCIpLnZhbCgpICsgXCIsIFwiICtcblx0XHRcdFx0alF1ZXJ5KCcjamZvcm1fcmVnaW9uX2lkJykuZmluZChcIjpzZWxlY3RlZFwiKS50ZXh0KCkgKyBcIiBcIiArXG5cdFx0XHRcdGpRdWVyeSgnI2pmb3JtX2NvdW50cnlfaWQnKS5maW5kKFwiOnNlbGVjdGVkXCIpLnRleHQoKTtcblxuXHRcdFx0bGV0IHVybCA9ICdpbmRleC5waHA/b3B0aW9uPWNvbV9rbm93cmVzJnRhc2s9cHJvcGVydHkuZ2VvY29kZSc7XG5cdFx0XHRsZXQgY29vcmQgPSBbXTtcblxuXHRcdFx0alF1ZXJ5LmFqYXgoe1xuXHRcdFx0XHR0eXBlOiAgICAgXCJQT1NUXCIsXG5cdFx0XHRcdHVybDogICAgICB1cmwsXG5cdFx0XHRcdGRhdGE6ICAgICB7YWRkcmVzczogYWRkcmVzc1N0cmluZ30sXG5cdFx0XHRcdGRhdGFUeXBlOiBcImpzb25cIixcblx0XHRcdFx0c3VjY2VzczogIGZ1bmN0aW9uIChqc29uZGF0YSkge1xuXHRcdFx0XHRcdGpRdWVyeS5lYWNoKGpzb25kYXRhLCBmdW5jdGlvbiAoa2V5LCB2YWwpIHtcblx0XHRcdFx0XHRcdGxldCBkaXYgPSBcIiNcIiArIGtleTtcblx0XHRcdFx0XHRcdGpRdWVyeShkaXYpLnZhbCh2YWwpO1xuXHRcdFx0XHRcdFx0Y29vcmRba2V5XSA9IHZhbDtcblx0XHRcdFx0XHRcdHJvdXRlTWFwLnJlZnJlc2hNYXAoY29vcmRbJ2xhdCddLCBjb29yZFsnbG5nJ10sIGZhbHNlKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH0pO1xufShqUXVlcnkpKTsiLCIvLyBLUiBBUFAgSlMgRmlsZXNcbmltcG9ydCAnbnBtL2pxdWVyeS1iYXItcmF0aW5nL2pxdWVyeS5iYXJyYXRpbmcnO1xuaW1wb3J0ICducG0vaXMtbWFya2VyLWNsdXN0ZXJlcic7XG4vL2ltcG9ydCAnbnBtL0Bnb29nbGVtYXBzL21hcmtlcmNsdXN0ZXJlcic7XG5pbXBvcnQgJ21lZGlhanMvc2l0ZS9hcHAnO1xuaW1wb3J0ICdtZWRpYWpzL3NpdGUvY29uZmlybSc7XG5pbXBvcnQgJ21lZGlhanMvc2l0ZS9kb2JlbnRyeSc7XG5pbXBvcnQgJ21lZGlhanMvc2l0ZS9ndWVzdGRhdGEnO1xuaW1wb3J0ICdtZWRpYWpzL3NpdGUvbWFnZWxsYW4nO1xuaW1wb3J0ICdtZWRpYWpzL3NpdGUvbWFwJztcbmltcG9ydCAnbWVkaWFqcy9zaXRlL3JvdXRlJzsiXSwibmFtZXMiOlsiTWFya2VyQ2x1c3RlcmVyIiwibWFwIiwib3B0X21hcmtlcnMiLCJvcHRfb3B0aW9ucyIsImV4dGVuZCIsImdvb2dsZSIsIm1hcHMiLCJPdmVybGF5VmlldyIsIm1hcF8iLCJtYXJrZXJzXyIsImNsdXN0ZXJzXyIsInNpemVzIiwic3R5bGVzXyIsInJlYWR5XyIsIm9wdGlvbnMiLCJncmlkU2l6ZV8iLCJtaW5DbHVzdGVyU2l6ZV8iLCJtYXhab29tXyIsImltYWdlUGF0aF8iLCJNQVJLRVJfQ0xVU1RFUl9JTUFHRV9QQVRIXyIsImltYWdlRXh0ZW5zaW9uXyIsIk1BUktFUl9DTFVTVEVSX0lNQUdFX0VYVEVOU0lPTl8iLCJ6b29tT25DbGlja18iLCJ1bmRlZmluZWQiLCJhdmVyYWdlQ2VudGVyXyIsInNldHVwU3R5bGVzXyIsInNldE1hcCIsInByZXZab29tXyIsImdldFpvb20iLCJ0aGF0IiwiZXZlbnQiLCJhZGRMaXN0ZW5lciIsInpvb20iLCJyZXNldFZpZXdwb3J0IiwicmVkcmF3IiwibGVuZ3RoIiwiYWRkTWFya2VycyIsInByb3RvdHlwZSIsIm9iajEiLCJvYmoyIiwib2JqZWN0IiwicHJvcGVydHkiLCJhcHBseSIsIm9uQWRkIiwic2V0UmVhZHlfIiwiZHJhdyIsImkiLCJzaXplIiwicHVzaCIsInVybCIsImhlaWdodCIsIndpZHRoIiwiZml0TWFwVG9NYXJrZXJzIiwibWFya2VycyIsImdldE1hcmtlcnMiLCJib3VuZHMiLCJMYXRMbmdCb3VuZHMiLCJtYXJrZXIiLCJnZXRQb3NpdGlvbiIsImZpdEJvdW5kcyIsInNldFN0eWxlcyIsInN0eWxlcyIsImdldFN0eWxlcyIsImlzWm9vbU9uQ2xpY2siLCJpc0F2ZXJhZ2VDZW50ZXIiLCJnZXRUb3RhbE1hcmtlcnMiLCJzZXRNYXhab29tIiwibWF4Wm9vbSIsImdldE1heFpvb20iLCJjYWxjdWxhdG9yXyIsIm51bVN0eWxlcyIsImluZGV4IiwiY291bnQiLCJkdiIsInBhcnNlSW50IiwiTWF0aCIsIm1pbiIsInRleHQiLCJzZXRDYWxjdWxhdG9yIiwiY2FsY3VsYXRvciIsImdldENhbGN1bGF0b3IiLCJvcHRfbm9kcmF3IiwicHVzaE1hcmtlclRvXyIsImlzQWRkZWQiLCJyZXBhaW50IiwiYWRkTWFya2VyIiwicmVtb3ZlTWFya2VyXyIsImluZGV4T2YiLCJtIiwic3BsaWNlIiwicmVtb3ZlTWFya2VyIiwicmVtb3ZlZCIsInJlbW92ZU1hcmtlcnMiLCJyIiwicmVhZHkiLCJjcmVhdGVDbHVzdGVyc18iLCJnZXRUb3RhbENsdXN0ZXJzIiwiZ2V0TWFwIiwiZ2V0R3JpZFNpemUiLCJzZXRHcmlkU2l6ZSIsImdldE1pbkNsdXN0ZXJTaXplIiwic2V0TWluQ2x1c3RlclNpemUiLCJnZXRFeHRlbmRlZEJvdW5kcyIsInByb2plY3Rpb24iLCJnZXRQcm9qZWN0aW9uIiwidHIiLCJMYXRMbmciLCJnZXROb3J0aEVhc3QiLCJsYXQiLCJsbmciLCJibCIsImdldFNvdXRoV2VzdCIsInRyUGl4IiwiZnJvbUxhdExuZ1RvRGl2UGl4ZWwiLCJ4IiwieSIsImJsUGl4IiwibmUiLCJmcm9tRGl2UGl4ZWxUb0xhdExuZyIsInN3IiwiaXNNYXJrZXJJbkJvdW5kc18iLCJjb250YWlucyIsImNsZWFyTWFya2VycyIsIm9wdF9oaWRlIiwiY2x1c3RlciIsInJlbW92ZSIsIm9sZENsdXN0ZXJzIiwic2xpY2UiLCJ3aW5kb3ciLCJzZXRUaW1lb3V0IiwiZGlzdGFuY2VCZXR3ZWVuUG9pbnRzXyIsInAxIiwicDIiLCJSIiwiZExhdCIsIlBJIiwiZExvbiIsImEiLCJzaW4iLCJjb3MiLCJjIiwiYXRhbjIiLCJzcXJ0IiwiZCIsImFkZFRvQ2xvc2VzdENsdXN0ZXJfIiwiZGlzdGFuY2UiLCJjbHVzdGVyVG9BZGRUbyIsInBvcyIsImNlbnRlciIsImdldENlbnRlciIsImlzTWFya2VySW5DbHVzdGVyQm91bmRzIiwiQ2x1c3RlciIsIm1hcEJvdW5kcyIsImdldEJvdW5kcyIsIm1hcmtlckNsdXN0ZXJlciIsIm1hcmtlckNsdXN0ZXJlcl8iLCJjZW50ZXJfIiwiYm91bmRzXyIsImNsdXN0ZXJJY29uXyIsIkNsdXN0ZXJJY29uIiwiaXNNYXJrZXJBbHJlYWR5QWRkZWQiLCJjYWxjdWxhdGVCb3VuZHNfIiwibCIsImxlbiIsInVwZGF0ZUljb24iLCJnZXRNYXJrZXJDbHVzdGVyZXIiLCJnZXRTaXplIiwibXoiLCJoaWRlIiwic3VtcyIsInNldENlbnRlciIsInNldFN1bXMiLCJzaG93Iiwib3B0X3BhZGRpbmciLCJwYWRkaW5nXyIsImNsdXN0ZXJfIiwiZGl2XyIsInN1bXNfIiwidmlzaWJsZV8iLCJ0cmlnZ2VyQ2x1c3RlckNsaWNrIiwidHJpZ2dlciIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImdldFBvc0Zyb21MYXRMbmdfIiwic3R5bGUiLCJjc3NUZXh0IiwiY3JlYXRlQ3NzIiwiaW5uZXJIVE1MIiwicGFuZXMiLCJnZXRQYW5lcyIsIm92ZXJsYXlNb3VzZVRhcmdldCIsImFwcGVuZENoaWxkIiwiYWRkRG9tTGlzdGVuZXIiLCJsYXRsbmciLCJ3aWR0aF8iLCJoZWlnaHRfIiwidG9wIiwibGVmdCIsImRpc3BsYXkiLCJvblJlbW92ZSIsInBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsInRleHRfIiwiaW5kZXhfIiwidXNlU3R5bGUiLCJtYXgiLCJ1cmxfIiwidGV4dENvbG9yXyIsImFuY2hvcl8iLCJ0ZXh0U2l6ZV8iLCJmb250RmFtaWx5XyIsImZvbnRXZWlnaHRfIiwiYmFja2dyb3VuZFBvc2l0aW9uXyIsImJhY2tncm91bmRQb3NpdGlvbiIsIl90eXBlb2YiLCJ0eHRDb2xvciIsInR4dFNpemUiLCJmb250RmFtaWx5IiwiZm9udFdlaWdodCIsImpvaW4iLCJnbG9iYWwiLCJtb2R1bGUiLCJleHBvcnRzIiwiZmFjdG9yeSIsImRlZmluZSIsImFtZCIsInJlcXVpcmUiLCJqUXVlcnkiLCIkIiwiQmFyUmF0aW5nIiwic2VsZiIsIndyYXBFbGVtZW50IiwiY2xhc3NlcyIsInRoZW1lIiwiJGVsZW0iLCJ3cmFwIiwidW53cmFwRWxlbWVudCIsInVud3JhcCIsImZpbmRPcHRpb24iLCJ2YWx1ZSIsImlzTnVtZXJpYyIsImZsb29yIiwiZ2V0SW5pdGlhbE9wdGlvbiIsImluaXRpYWxSYXRpbmciLCJnZXRFbXB0eU9wdGlvbiIsIiRlbXB0eU9wdCIsImZpbmQiLCJlbXB0eVZhbHVlIiwiYWxsb3dFbXB0eSIsInByZXBlbmRUbyIsImdldERhdGEiLCJrZXkiLCJkYXRhIiwic2V0RGF0YSIsInNhdmVEYXRhT25FbGVtZW50IiwiJG9wdCIsInZhbCIsImVtcHR5VGV4dCIsInVzZXJPcHRpb25zIiwicmF0aW5nVmFsdWUiLCJyYXRpbmdUZXh0Iiwib3JpZ2luYWxSYXRpbmdWYWx1ZSIsIm9yaWdpbmFsUmF0aW5nVGV4dCIsImVtcHR5UmF0aW5nVmFsdWUiLCJlbXB0eVJhdGluZ1RleHQiLCJyZWFkT25seSIsInJlYWRvbmx5IiwicmF0aW5nTWFkZSIsInJlbW92ZURhdGFPbkVsZW1lbnQiLCJyZW1vdmVEYXRhIiwiYnVpbGRXaWRnZXQiLCIkdyIsImVhY2giLCJodG1sIiwiJGEiLCJzaG93VmFsdWVzIiwiYXBwZW5kIiwic2hvd1NlbGVjdGVkUmF0aW5nIiwicmV2ZXJzZSIsImFkZENsYXNzIiwibmV4dEFsbG9yUHJldmlvdXNBbGwiLCJzZXRTZWxlY3RGaWVsZFZhbHVlIiwicHJvcCIsImNoYW5nZSIsInJlc2V0U2VsZWN0RmllbGQiLCJkZWZhdWx0U2VsZWN0ZWQiLCJwYXJlbnQiLCJmcmFjdGlvbiIsInJvdW5kIiwicmVzZXRTdHlsZSIsIiR3aWRnZXQiLCJyZW1vdmVDbGFzcyIsIm1hdGNoIiwiYXBwbHlTdHlsZSIsImJhc2VWYWx1ZSIsImYiLCIkYWxsIiwiJGZyYWN0aW9uYWwiLCJpc0Rlc2VsZWN0YWJsZSIsIiRlbGVtZW50IiwiZGVzZWxlY3RhYmxlIiwiYXR0ciIsImF0dGFjaENsaWNrSGFuZGxlciIsIiRlbGVtZW50cyIsIm9uIiwicHJldmVudERlZmF1bHQiLCJvblNlbGVjdCIsImNhbGwiLCJhdHRhY2hNb3VzZUVudGVySGFuZGxlciIsImF0dGFjaE1vdXNlTGVhdmVIYW5kbGVyIiwiZmFzdENsaWNrcyIsInN0b3BQcm9wYWdhdGlvbiIsImNsaWNrIiwiZGlzYWJsZUNsaWNrcyIsImF0dGFjaEhhbmRsZXJzIiwiaG92ZXJTdGF0ZSIsImRldGFjaEhhbmRsZXJzIiwib2ZmIiwic2V0dXBIYW5kbGVycyIsImluc2VydEFmdGVyIiwic3RhdGUiLCJ0b2dnbGVDbGFzcyIsInNldCIsInNpbGVudCIsImNsZWFyIiwib25DbGVhciIsImRlc3Ryb3kiLCJvbkRlc3Ryb3kiLCJpbml0IiwiZWxlbSIsImZuIiwiYmFycmF0aW5nIiwiZGVmYXVsdHMiLCJtZXRob2QiLCJwbHVnaW4iLCJpcyIsImVycm9yIiwiaGFzT3duUHJvcGVydHkiLCJuZXh0Iiwic2VhcmNoRGF0YSIsInNlYXJjaERvbmUiLCJjYWxlbmRhckxvYWRlZCIsInNhdmVkd2lkdGgiLCJsYXJnZSIsInJlc2l6ZWQiLCJzY2xvYWRlZCIsImZvdW5kYXRpb24iLCJjaGVja1NjcmVlbldpZHRoIiwiYmFycyIsIiRjdHJpZ2dlciIsImxvYWRDYWxlbmRhciIsInN0aWNreSIsImUiLCIkZm9ybSIsImFqYXgiLCJ0eXBlIiwic2VyaWFsaXplIiwiZGF0YVR5cGUiLCJzdWNjZXNzIiwicmVzdWx0IiwiZm9ybVJlc3BvbnNlIiwibG9jYXRpb24iLCJocmVmIiwibWVzc2FnZSIsIiRtb2RhbCIsIkZvdW5kYXRpb24iLCJSZXZlYWwiLCJvcGVuIiwiY3NzIiwibW9kYWxpZCIsInRyaW0iLCJhamF4dXJsIiwiY29udGVudCIsImdldFNjcmlwdCIsImluaXRpYWxpemVTdHJpcGUiLCIkcHNsaWRlciIsInNsaWNrIiwicGlkIiwiYmFyIiwiZ2V0UHJvcGVydGllcyIsImNoaWxkcmVuIiwidG9nZ2xlIiwic2V0QWN0aXZlTWVudSIsInRhcmdldCIsIiRwcm9wcyIsIiR0YWJzIiwic3BlY2lhbCIsInRvdWNoc3RhcnQiLCJzZXR1cCIsIl8iLCJucyIsImhhbmRsZSIsImluY2x1ZGVzIiwiYWRkRXZlbnRMaXN0ZW5lciIsInBhc3NpdmUiLCJ0b3VjaG1vdmUiLCJpZCIsInJlcGxhY2UiLCJyZWRpcmVjdCIsImFjdGlvbiIsImFyZ3VtZW50cyIsImFjdGlvbl92YWx1ZSIsInJlbG9hZCIsInZhbHMiLCJzZXRTZWFyY2hEYXRhIiwicmVzcG9uc2UiLCIkc2lkZWJhciIsImVtcHR5IiwiZmFkZUluIiwic2Nyb2xsVG8iLCJzZWFyY2hiYXIiLCJzY3JlZW5XaWR0aEhhc0NoYW5nZWQiLCJNZWRpYVF1ZXJ5IiwiYXRMZWFzdCIsIm8iLCJTeW1ib2wiLCJpdGVyYXRvciIsImNvbnN0cnVjdG9yIiwiX2NsYXNzQ2FsbENoZWNrIiwibiIsIlR5cGVFcnJvciIsIl9kZWZpbmVQcm9wZXJ0aWVzIiwidCIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJ3cml0YWJsZSIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiX3RvUHJvcGVydHlLZXkiLCJfY3JlYXRlQ2xhc3MiLCJfdG9QcmltaXRpdmUiLCJ0b1ByaW1pdGl2ZSIsIlN0cmluZyIsIk51bWJlciIsIm9yaWdpbiIsInByb3RvY29sIiwiaG9zdCIsIm15Q29uZmlybSIsIiRteVRhc2siLCJLcmNvbmZpcm0iLCJmb3JtIiwidXBkYXRlUXVvdGUiLCJzZXJpYWxpemVBcnJheSIsImRpdiIsImNoZWNrVGVybXMiLCJ0ZXN0IiwiZ2V0RWxlbWVudEJ5SWQiLCJ0ZXN0YyIsInRlc3R0IiwiYWdyZWVjaGVjayIsImNoZWNrZWQiLCJhZ3JlZWNoZWNrYyIsImFncmVlY2hlY2t0IiwibXlLckRvYkVudHJ5IiwidG9kYXkiLCJCQUNLU1BBQ0UiLCJzZXR0aW5ncyIsImN1c3RvbV92YWxpZGF0aW9uIiwiZGF5c19pbl9tb250aCIsImRvY3VtZW50X2RhdGUiLCJlcnJvcmJveF94IiwiZXJyb3Jib3hfeSIsImZpZWxkX2hpbnRfdGV4dF9kYXkiLCJmaWVsZF9oaW50X3RleHRfbW9udGgiLCJmaWVsZF9oaW50X3RleHRfeWVhciIsImZpZWxkX29yZGVyIiwiZmllbGRfd2lkdGhfZGF5IiwiZmllbGRfd2lkdGhfbW9udGgiLCJmaWVsZF93aWR0aF95ZWFyIiwiZmllbGRfd2lkdGhfc2VwIiwibWlubWF4IiwibWluX2RhdGUiLCJtYXhfZGF0ZSIsIm1pbl95ZWFyIiwibW9udGhfbmFtZSIsIm9uX2JsdXIiLCJvbl9lcnJvciIsIm9uX2NoYW5nZSIsInBhcnNlX2RhdGUiLCJzZXBhcmF0b3IiLCJzaG93X2Vycm9ycyIsInNob3dfaGludHMiLCJFX0RBWV9OQU4iLCJFX0RBWV9UT09fQklHIiwiRV9EQVlfVE9PX1NNQUxMIiwiRV9CQURfREFZX0ZPUl9NT05USCIsIkVfTU9OVEhfTkFOIiwiRV9NT05USF9UT09fQklHIiwiRV9NT05USF9UT09fU01BTEwiLCJFX1lFQVJfTkFOIiwiRV9ZRUFSX0xFTkdUSCIsIkVfWUVBUl9UT09fU01BTEwiLCJFX01JTl9EQVRFIiwiRV9NQVhfREFURSIsIktyRG9iRW50cnkiLCJnZXRZbWQiLCJEYXRlIiwiaW5wdXRfZGF5IiwiaW5wdXRfbW9udGgiLCJpbnB1dF95ZWFyIiwiYWRkRW50cnlGaWVsZHMiLCJkb2JmaWVsZCIsImZpZWxkcyIsInNwbGl0IiwiZmllbGQiLCJidWlsZEZpZWxkIiwiYWZ0ZXJQYXN0ZSIsInBhcnNlRGF0ZSIsInNldERhdGUiLCJuYW1lIiwia3Jkb2JlbnRyeSIsImlucHV0IiwiS3JEb2JJbnB1dCIsImhpbnRfdGV4dCIsImlubmVyIiwiJGlucHV0IiwiYnVpbGRVaSIsIndyYXBwZXIiLCJlcnJvcmJveCIsInNldEZpZWxkV2lkdGhzIiwiY2hlY2tEb2N1bWVudCIsImRvYiIsImNoaWxkZG9iIiwiY2xhc3NuYW1lIiwiZWxlbWVudHMiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiY2xlYXJFcnJvciIsImVycm9yX3RleHQiLCJzaG93RXJyb3IiLCJmb2N1cyIsInNldEZvY3VzIiwiZm9jdXNGaWVsZEJlZm9yZSIsInlpZWxkRm9jdXMiLCJmb2N1c0ZpZWxkQWZ0ZXIiLCJmb2N1c0luIiwiZm9jdXNPdXQiLCJ3aWRnZXRGb2N1c0xvc3QiLCJnZXREYXRlIiwiZGF5X3ZhbHVlIiwibW9udGhfdmFsdWUiLCJ5ZWFyX3ZhbHVlIiwiZGF5IiwibW9udGgiLCJ5ZWFyIiwicHJveHlMYWJlbENsaWNrcyIsInBhcnNlSXNvRGF0ZSIsIlJlZ0V4cCIsIiQzIiwiJDIiLCIkMSIsIm9ubW91c2V1cCIsIm5ld19kYXRlIiwidmFsaWRhdGUiLCJzZXRFcnJvciIsImF2YWlsYWJsZSIsInRvdGFsIiwic2V0V2lkdGgiLCJzZXRSZWFkb25seSIsIm1vZGUiLCJ3aWRnZXRFcnJvclRleHQiLCJ4X29mZnNldCIsIm91dGVyV2lkdGgiLCJ5X29mZnNldCIsInBvc2l0aW9uIiwiY3VycmVudF9pbnB1dCIsInZhbGlkYXRlRGF5IiwidmFsaWRhdGVNb250aCIsInZhbGlkYXRlWWVhciIsInZhbGlkYXRlRGF5c0luTW9udGgiLCJ2YWxpZGF0ZUNvbXBsZXRlRGF0ZSIsImRhdGVfc3RyIiwiZ2V0WW1kT2JqZWN0IiwiZGF0ZV9vYmoiLCJkYXRlX2lzbyIsImRhdGUiLCJvcHQiLCJnZXQiLCJoYXNfZm9jdXMiLCJudW0iLCJtc2ciLCJ0b1N0cmluZyIsIm9uQmx1ciIsImdldE1vbnRoIiwiZ2V0RGF5IiwiZ2V0RnVsbFllYXIiLCJwcm94eSIsImJsdXIiLCJrZXlkb3duIiwia2V5dXAiLCJzaG93X2hpbnQiLCJrZXlfaXNfZG93biIsImhhc0NsYXNzIiwiaXNEaWdpdEtleSIsImtleWNvZGUiLCJ3aGljaCIsIndhbnQiLCJuZXdfdmFsdWUiLCJzZWxlY3RfYWxsIiwic2VsZWN0IiwibmV3X3dpZHRoIiwiaG93dG9hcnJpdmUiLCJhcnJpdmFsbWVhbnMiLCJnZXRBdHRyaWJ1dGUiLCJkaXNwbGF5QXJyaXZhbCIsImNsYXNzTGlzdCIsImFycml2YWxkYXRhIiwiYWRkIiwib3ZDaGlsZHJlbiIsIm92U3RhdGUiLCJvdlBzIiwiJG92QnRuIiwiZmNDaGlsZHJlbiIsImZjU3RhdGUiLCIkZmNCdG4iLCJ0dENoaWxkcmVuIiwidHRTdGF0ZSIsInR0UHMiLCIkdHRCdG4iLCJ0dHBhcmFzIiwiY3VycmVudFBhcmFncmFwaCIsImhyRWxlbWVudCIsImFmdGVyIiwicXVlcnlTZWxlY3RvckFsbCIsImRvSFJzIiwicGFyYWdyYXBocyIsIm5leHRFbGVtZW50U2libGluZyIsInRhZ05hbWUiLCJsYW5nIiwibWFya2Vyc2hhcGUiLCJjb29yZHMiLCJteUtybWFwIiwibWFwRGF0YSIsImluZm9XaW5kb3ciLCJpbmZvV2luZG93MiIsInByb3BlcnR5ZGl2IiwicHJvcGVydHlpY29uIiwibWMiLCJwcm9wZXJ0eU1hcmtlcnMiLCJmaWx0ZXJJZHMiLCJtYXBNYXJrZXJzIiwibWFwVHlwZUlkIiwibWFwWm9vbSIsIm1hcE1heFpvb20iLCJtYXBUeXBlIiwibWFwSWQiLCJtYXJrZXJDb2xvciIsIktybWFwIiwiZ21PcHRpb25zIiwic2Nyb2xsd2hlZWwiLCJzdHJlZXRWaWV3Q29udHJvbCIsImdtYXJrZXJzIiwiaW5pdE1hcCIsImNoZWNrRHVwbGljYXRlIiwiY3VycmVudCIsImR1cHMiLCJlcXVhbHMiLCJuZXdMYXQiLCJuZXdMbmciLCJjbHVzdGVyTWFwIiwibWNPcHRpb25zIiwiZ3JpZFNpemUiLCJpZ25vcmVIaWRkZW5NYXJrZXJzIiwiaW1hZ2VQYXRoIiwibWF4RGVmYXVsdFpvb20iLCJhZGRMaXN0ZW5lck9uY2UiLCJzZXRab29tIiwic2V0UHJvcGVydHlNYXJrZXJzIiwic2V0TWFwTWFya2VycyIsInNldFZpc2libGUiLCJjbG9zZSIsImNyZWF0ZU1hcCIsIk1hcCIsIkluZm9XaW5kb3ciLCJjcmVhdGVNYXBNYXJrZXIiLCJwb2ludCIsImltYWdlIiwiYm94aW5mbyIsImxpbmsiLCJ0aXRsZSIsIk1hcmtlciIsInNoYXBlIiwiaWNvbiIsInpJbmRleCIsInNldENvbnRlbnQiLCJjcmVhdGVQcm9wZXJ0eU1hcmtlciIsImNvbG9yIiwibm90IiwibmV4dEFycm93IiwicHJldkFycm93IiwiYXV0b3BsYXkiLCJzb2xvTWFwIiwicmVmcmVzaE1hcCIsIiRtYXBtb2RhbCIsImFsZXJ0IiwicmVzZXRNYXAiLCJhbWFyayIsIm1hcmtlcmljb24iLCJTaXplIiwiUG9pbnQiLCJhbmNob3IiLCJteUxpc3RlbmVyIiwiZm91bmQiLCJjdXJyZW50Wm9vbSIsInNob3dWaXNpYmxlTWFya2VycyIsImNsb3NlS3JJbmZvd2luZG93Iiwia2lja01hcCIsIm1hcF9tb2RhbCIsIiRzb2xvVHJpZ2dlciIsIm9uZSIsIiRtdHJpZ2dlciIsIm15S3Jyb3V0ZSIsImRpcmVjdGlvbnNEaXNwbGF5IiwiZGlyZWN0aW9uc1Zpc2libGUiLCJyb3V0ZU1hcCIsImRlc3RpbmF0aW9uIiwicm91dGVNYXJrZXJzIiwicm91dGVTdG9wUG9pbnRzIiwiZGV0b3VyIiwiZGlyZWN0aW9uc1BhbmVsIiwiZGlyZWN0aW9uc1NlcnZpY2UiLCJLcnJvdXRlIiwiRGlyZWN0aW9uc1NlcnZpY2UiLCJhZGRSb3V0ZU1hcmtlciIsImNhbGNSb3V0ZSIsImZyb21fYWRkcmVzcyIsIlRyYXZlbE1vZGUiLCJCSUNZQ0xJTkciLCJEUklWSU5HIiwiV0FMS0lORyIsInJlcXVlc3QiLCJ3YXlwb2ludHMiLCJ0cmF2ZWxNb2RlIiwiYXZvaWRIaWdod2F5cyIsImF2b2lkVG9sbHMiLCJyb3V0ZSIsInN0YXR1cyIsIkRpcmVjdGlvbnNTdGF0dXMiLCJPSyIsInNldERpcmVjdGlvbnMiLCJyZXNldFJvdXRlIiwiY2xlYXJSb3V0ZU1hcmtlcnMiLCJteU9wdGlvbnMiLCJEaXJlY3Rpb25zUmVuZGVyZXIiLCJzZXRQYW5lbCIsIk1hcmtlckltYWdlIiwibGF0TG5nIiwic3RvcG92ZXIiLCJjbGVhcldheXBvaW50cyIsImFkZHJlc3NTdHJpbmciLCJjb29yZCIsImFkZHJlc3MiLCJqc29uZGF0YSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9