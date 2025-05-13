(self["webpackChunkkr"] = self["webpackChunkkr"] || []).push([["site"],{

/***/ "./node_modules/is-marker-clusterer/src/markerclusterer.js":
/*!*****************************************************************!*\
  !*** ./node_modules/is-marker-clusterer/src/markerclusterer.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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

/***/ }),

/***/ "./node_modules/jquery-bar-rating/jquery.barrating.js":
/*!************************************************************!*\
  !*** ./node_modules/jquery-bar-rating/jquery.barrating.js ***!
  \************************************************************/
/***/ ((module, exports, __webpack_require__) => {

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



let searchData = [];
let searchDone = false;
let calendarLoaded = false;
let savedwidth = false;
let large;
let resized = false;
let scloaded = false;
(function ($) {
  $(function () {
    Foundation.addToJquery();
    $(document).foundation();
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
      const sticky = $('.sticky');
      if (sticky.length) {
        sticky.foundation('_calc', true);
      }
    }
    $(document).on('submit', '.ajaxform', function (e) {
      e.preventDefault();
      const $form = $(this);
      $.ajax({
        type: 'POST',
        url: $form.attr('action'),
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
    }).on('open.zf.reveal', '#kr-gateway-modal[data-reveal]', function (e) {
      if (!scloaded) {
        e.preventDefault();
        $.getScript('media/com_knowres/js/stripecheckout.min.js');
        scloaded = true;
      } else {
        initializeStripe();
      }
    }).on('open.zf.reveal', '#kr-property-slideshow-reveal[data-reveal]', function (e) {
      $('#kr-property-slideshow').slick('setPosition');
      $('#kr-property-slideshow').slick('refresh');
      $('#kr-property-thumbs').slick();
      $('#kr-property-arrows').slick();
      $('#kr-property-slideshow').slick();
    }).on('click', '.favspan', function (e) {
      e.preventDefault();
      const pid = $(this).data('property');
      const bar = $('.kr-searchbar a.is-active').data('bar');
      $.ajax({
        type: 'POST',
        url: '/index.php?option=com_knowres&task=properties.favourite',
        data: {
          'property_id': pid
        },
        dataType: 'json',
        success: function (result) {
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
      url: '/index.php?option=com_knowres&task=property.geriatric',
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
  function getProperties(bar, action = '', action_value = '') {
    $.ajax({
      url: '/index.php?option=com_knowres&task=properties.raw',
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
        const vals = ['grid', 'list', 'favs', 'map'];
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
  function setSearchData(response, action = '') {
    let $sidebar;
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
        const sticky = $('.sticky');
        if (sticky.length) {
          sticky.foundation('_calc', true);
          window.scrollTo(0, 0);
        }
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
        url: 'index.php?option=com_knowres&task=confirm.compute',
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

/***/ "./src/media/com_knowres/js/src/site/magellan.js":
/*!*******************************************************!*\
  !*** ./src/media/com_knowres/js/src/site/magellan.js ***!
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



let ovChildren,
  ovState = null,
  ovPs = 0,
  $ovBtn;
let fcChildren,
  fcState = null,
  $fcBtn;
let ttChildren,
  ttState = null,
  ttPs = 0,
  $ttBtn,
  ttparas;
let currentParagraph, hrElement;
(function ($) {
  $(function () {
    ovChildren = $('.readmore-overview').children('p, h5, ul');
    ovPs = ovChildren.length;
    if (ovPs > 3) {
      ovChildren.slice(3).hide();
      ovChildren.slice(ovPs - 1, ovPs).after('<div class="text-center"><a class="button hollow' + ' readmore overview-toggle">Read more...</a></div>');
      ovState = 'hidden';
    }
    ttChildren = $('.readmore-testimonials').children('p');
    ttPs = ttChildren.length;
    if (ttPs > 10) {
      ttChildren.slice(11).hide();
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
      } else if (ovState === 'hidden') {
        $('.readmore-overview').find(':hidden').show();
        $ovBtn.attr('value', 'Read less');
        $ovBtn.text("Read less...");
        ovState = 'visible';
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
      } else if (ttState === 'hidden') {
        $('.readmore-testimonials p').show();
        doHRs(ttparas, 'show');
        $ttBtn.attr('value', 'Read less');
        $ttBtn.text("Read less...");
        ttState = 'visible';
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
      } else if (fcState === 'hidden') {
        $('.readmore-facilities .rooms').show();
        $fcBtn.attr('value', 'Hide all facilities');
        $fcBtn.text("Hide all facilities...");
        fcState = 'visible';
      }
      $('.property-menu').foundation('calcPoints');
      $('.sticky').foundation('_calc', true);
    });
  });
})(jQuery);
function doHRs(paragraphs, type) {
  for (let i = 0; i < paragraphs.length; i++) {
    currentParagraph = paragraphs[i];
    hrElement = currentParagraph.nextElementSibling;
    if (hrElement && hrElement.tagName === 'HR') {
      if (type === 'hide') hrElement.style.display = 'none';else hrElement.style.display = 'block';
    }
  }
}

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
  let infoWindow;
  let infoWindow2;
  let bounds;
  let propertydiv;
  let propertyicon;
  let mc;
  let settings = {
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

    clusterMap() {
      const mcOptions = {
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
        url: '/index.php?option=com_knowres&task=properties.refreshmap',
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
        success: function () {
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
    const $mtrigger = $('.map-trigger');
    if ($mtrigger.length && $mtrigger.data('forcemap')) {
      $mtrigger.trigger('click');
    }
    function kickMap($elem) {
      const type = $elem.data('type');
      let pid = 0;
      if (type === 'solo') {
        pid = $elem.data('pid');
      }
      jQuery.ajax({
        url: '/index.php?option=com_knowres&task=properties.mapdata&pid=' + pid,
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
    mapMaxZoom: 18,
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
/* harmony import */ var mediajs_site_magellan__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! mediajs/site/magellan */ "./src/media/com_knowres/js/src/site/magellan.js");
/* harmony import */ var mediajs_site_magellan__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(mediajs_site_magellan__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var mediajs_site_map__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! mediajs/site/map */ "./src/media/com_knowres/js/src/site/map.js");
/* harmony import */ var mediajs_site_map__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(mediajs_site_map__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var mediajs_site_route__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! mediajs/site/route */ "./src/media/com_knowres/js/src/site/route.js");
/* harmony import */ var mediajs_site_route__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(mediajs_site_route__WEBPACK_IMPORTED_MODULE_8__);
// KR APP JS Files










/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["common"], () => (__webpack_exec__("./webpack.build.site.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQztRQUNIO01BQ0QsQ0FBQyxDQUFDO0lBQ0gsQ0FBQyxDQUFDO0VBQ0gsQ0FBQyxDQUFDO0FBQ0gsQ0FBQyxFQUFDdGYsTUFBTSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3UFQ7QUFDZ0Q7QUFDZjtBQUNQO0FBQ0k7QUFDQztBQUNDO0FBQ0Q7QUFDTCIsInNvdXJjZXMiOlsid2VicGFjazovL2tyLy4vbm9kZV9tb2R1bGVzL2lzLW1hcmtlci1jbHVzdGVyZXIvc3JjL21hcmtlcmNsdXN0ZXJlci5qcyIsIndlYnBhY2s6Ly9rci8uL25vZGVfbW9kdWxlcy9qcXVlcnktYmFyLXJhdGluZy9qcXVlcnkuYmFycmF0aW5nLmpzIiwid2VicGFjazovL2tyLy4vc3JjL21lZGlhL2NvbV9rbm93cmVzL2pzL3NyYy9zaXRlL2FwcC5qcyIsIndlYnBhY2s6Ly9rci8uL3NyYy9tZWRpYS9jb21fa25vd3Jlcy9qcy9zcmMvc2l0ZS9jb25maXJtLmpzIiwid2VicGFjazovL2tyLy4vc3JjL21lZGlhL2NvbV9rbm93cmVzL2pzL3NyYy9zaXRlL2RvYmVudHJ5LmpzIiwid2VicGFjazovL2tyLy4vc3JjL21lZGlhL2NvbV9rbm93cmVzL2pzL3NyYy9zaXRlL2d1ZXN0ZGF0YS5qcyIsIndlYnBhY2s6Ly9rci8uL3NyYy9tZWRpYS9jb21fa25vd3Jlcy9qcy9zcmMvc2l0ZS9tYWdlbGxhbi5qcyIsIndlYnBhY2s6Ly9rci8uL3NyYy9tZWRpYS9jb21fa25vd3Jlcy9qcy9zcmMvc2l0ZS9tYXAuanMiLCJ3ZWJwYWNrOi8va3IvLi9zcmMvbWVkaWEvY29tX2tub3dyZXMvanMvc3JjL3NpdGUvcm91dGUuanMiLCJ3ZWJwYWNrOi8va3IvLi93ZWJwYWNrLmJ1aWxkLnNpdGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBOcG0gdmVyc2lvbiBvZiBtYXJrZXJDbHVzdGVyZXIgd29ya3MgZ3JlYXQgd2l0aCBicm93c2VyaWZ5XG4gKiBEaWZmZXJlbmNlIGZyb20gdGhlIG9yaWdpbmFsIC0gYWRkcyBhIGNvbW1vbmpzIGZvcm1hdCBhbmQgcmVwbGFjZXMgd2luZG93IHdpdGggZ2xvYmFsIGFuZCBzb21lIHVuaXQgdGVzdFxuICogVGhlIG9yaWdpbmFsIGZ1bmN0aW9uYWxpdHkgaXQncyBub3QgbW9kaWZpZWQgZm9yIGRvY3MgYW5kIG9yaWdpbmFsIHNvdXJjZSBjaGVja1xuICogaHR0cHM6Ly9naXRodWIuY29tL2dvb2dsZW1hcHMvanMtbWFya2VyLWNsdXN0ZXJlclxuICovXG5cbi8qKlxuICogQG5hbWUgTWFya2VyQ2x1c3RlcmVyIGZvciBHb29nbGUgTWFwcyB2M1xuICogQHZlcnNpb24gdmVyc2lvbiAxLjBcbiAqIEBhdXRob3IgTHVrZSBNYWhlXG4gKiBAZmlsZW92ZXJ2aWV3XG4gKiBUaGUgbGlicmFyeSBjcmVhdGVzIGFuZCBtYW5hZ2VzIHBlci16b29tLWxldmVsIGNsdXN0ZXJzIGZvciBsYXJnZSBhbW91bnRzIG9mXG4gKiBtYXJrZXJzLlxuICogPGJyLz5cbiAqIFRoaXMgaXMgYSB2MyBpbXBsZW1lbnRhdGlvbiBvZiB0aGVcbiAqIDxhIGhyZWY9XCJodHRwOi8vZ21hcHMtdXRpbGl0eS1saWJyYXJ5LWRldi5nb29nbGVjb2RlLmNvbS9zdm4vdGFncy9tYXJrZXJjbHVzdGVyZXIvXCJcbiAqID52MiBNYXJrZXJDbHVzdGVyZXI8L2E+LlxuICovXG5cbi8qKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cblxuLyoqXG4gKiBBIE1hcmtlciBDbHVzdGVyZXIgdGhhdCBjbHVzdGVycyBtYXJrZXJzLlxuICpcbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTWFwfSBtYXAgVGhlIEdvb2dsZSBtYXAgdG8gYXR0YWNoIHRvLlxuICogQHBhcmFtIHtBcnJheS48Z29vZ2xlLm1hcHMuTWFya2VyPj19IG9wdF9tYXJrZXJzIE9wdGlvbmFsIG1hcmtlcnMgdG8gYWRkIHRvXG4gKiAgIHRoZSBjbHVzdGVyLlxuICogQHBhcmFtIHtPYmplY3Q9fSBvcHRfb3B0aW9ucyBzdXBwb3J0IHRoZSBmb2xsb3dpbmcgb3B0aW9uczpcbiAqICAgICAnZ3JpZFNpemUnOiAobnVtYmVyKSBUaGUgZ3JpZCBzaXplIG9mIGEgY2x1c3RlciBpbiBwaXhlbHMuXG4gKiAgICAgJ21heFpvb20nOiAobnVtYmVyKSBUaGUgbWF4aW11bSB6b29tIGxldmVsIHRoYXQgYSBtYXJrZXIgY2FuIGJlIHBhcnQgb2YgYVxuICogICAgICAgICAgICAgICAgY2x1c3Rlci5cbiAqICAgICAnem9vbU9uQ2xpY2snOiAoYm9vbGVhbikgV2hldGhlciB0aGUgZGVmYXVsdCBiZWhhdmlvdXIgb2YgY2xpY2tpbmcgb24gYVxuICogICAgICAgICAgICAgICAgICAgIGNsdXN0ZXIgaXMgdG8gem9vbSBpbnRvIGl0LlxuICogICAgICdhdmVyYWdlQ2VudGVyJzogKGJvb2xlYW4pIFdldGhlciB0aGUgY2VudGVyIG9mIGVhY2ggY2x1c3RlciBzaG91bGQgYmVcbiAqICAgICAgICAgICAgICAgICAgICAgIHRoZSBhdmVyYWdlIG9mIGFsbCBtYXJrZXJzIGluIHRoZSBjbHVzdGVyLlxuICogICAgICdtaW5pbXVtQ2x1c3RlclNpemUnOiAobnVtYmVyKSBUaGUgbWluaW11bSBudW1iZXIgb2YgbWFya2VycyB0byBiZSBpbiBhXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsdXN0ZXIgYmVmb3JlIHRoZSBtYXJrZXJzIGFyZSBoaWRkZW4gYW5kIGEgY291bnRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgaXMgc2hvd24uXG4gKiAgICAgJ3N0eWxlcyc6IChvYmplY3QpIEFuIG9iamVjdCB0aGF0IGhhcyBzdHlsZSBwcm9wZXJ0aWVzOlxuICogICAgICAgJ3VybCc6IChzdHJpbmcpIFRoZSBpbWFnZSB1cmwuXG4gKiAgICAgICAnaGVpZ2h0JzogKG51bWJlcikgVGhlIGltYWdlIGhlaWdodC5cbiAqICAgICAgICd3aWR0aCc6IChudW1iZXIpIFRoZSBpbWFnZSB3aWR0aC5cbiAqICAgICAgICdhbmNob3InOiAoQXJyYXkpIFRoZSBhbmNob3IgcG9zaXRpb24gb2YgdGhlIGxhYmVsIHRleHQuXG4gKiAgICAgICAndGV4dENvbG9yJzogKHN0cmluZykgVGhlIHRleHQgY29sb3IuXG4gKiAgICAgICAndGV4dFNpemUnOiAobnVtYmVyKSBUaGUgdGV4dCBzaXplLlxuICogICAgICAgJ2ZvbnRGYW1pbHknOiAoc3RyaW5nKSBUaGUgZm9udCBmYW1pbHkuXG4gKiAgICAgICAnZm9udFdlaWdodCc6IChzdHJpbmcpIFRoZSBmb250IHdlaWdodC5cbiAqICAgICAgICdiYWNrZ3JvdW5kUG9zaXRpb24nOiAoc3RyaW5nKSBUaGUgcG9zaXRpb24gb2YgdGhlIGJhY2tnb3VuZCB4LCB5LlxuICogQGNvbnN0cnVjdG9yXG4gKiBAZXh0ZW5kcyBnb29nbGUubWFwcy5PdmVybGF5Vmlld1xuICovXG5mdW5jdGlvbiBNYXJrZXJDbHVzdGVyZXIobWFwLCBvcHRfbWFya2Vycywgb3B0X29wdGlvbnMpIHtcbiAgLy8gTWFya2VyQ2x1c3RlcmVyIGltcGxlbWVudHMgZ29vZ2xlLm1hcHMuT3ZlcmxheVZpZXcgaW50ZXJmYWNlLiBXZSB1c2UgdGhlXG4gIC8vIGV4dGVuZCBmdW5jdGlvbiB0byBleHRlbmQgTWFya2VyQ2x1c3RlcmVyIHdpdGggZ29vZ2xlLm1hcHMuT3ZlcmxheVZpZXdcbiAgLy8gYmVjYXVzZSBpdCBtaWdodCBub3QgYWx3YXlzIGJlIGF2YWlsYWJsZSB3aGVuIHRoZSBjb2RlIGlzIGRlZmluZWQgc28gd2VcbiAgLy8gbG9vayBmb3IgaXQgYXQgdGhlIGxhc3QgcG9zc2libGUgbW9tZW50LiBJZiBpdCBkb2Vzbid0IGV4aXN0IG5vdyB0aGVuXG4gIC8vIHRoZXJlIGlzIG5vIHBvaW50IGdvaW5nIGFoZWFkIDopXG4gIHRoaXMuZXh0ZW5kKE1hcmtlckNsdXN0ZXJlciwgZ29vZ2xlLm1hcHMuT3ZlcmxheVZpZXcpO1xuICB0aGlzLm1hcF8gPSBtYXA7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtBcnJheS48Z29vZ2xlLm1hcHMuTWFya2VyPn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHRoaXMubWFya2Vyc18gPSBbXTtcblxuICAvKipcbiAgICogIEB0eXBlIHtBcnJheS48Q2x1c3Rlcj59XG4gICAqL1xuICB0aGlzLmNsdXN0ZXJzXyA9IFtdO1xuXG4gIHRoaXMuc2l6ZXMgPSBbNTMsIDU2LCA2NiwgNzgsIDkwXTtcblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHRoaXMuc3R5bGVzXyA9IFtdO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHRoaXMucmVhZHlfID0gZmFsc2U7XG5cbiAgdmFyIG9wdGlvbnMgPSBvcHRfb3B0aW9ucyB8fCB7fTtcblxuICAvKipcbiAgICogQHR5cGUge251bWJlcn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHRoaXMuZ3JpZFNpemVfID0gb3B0aW9uc1snZ3JpZFNpemUnXSB8fCA2MDtcblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHRoaXMubWluQ2x1c3RlclNpemVfID0gb3B0aW9uc1snbWluaW11bUNsdXN0ZXJTaXplJ10gfHwgMjtcblxuXG4gIC8qKlxuICAgKiBAdHlwZSB7P251bWJlcn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHRoaXMubWF4Wm9vbV8gPSBvcHRpb25zWydtYXhab29tJ10gfHwgbnVsbDtcblxuICB0aGlzLnN0eWxlc18gPSBvcHRpb25zWydzdHlsZXMnXSB8fCBbXTtcblxuICAvKipcbiAgICogQHR5cGUge3N0cmluZ31cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHRoaXMuaW1hZ2VQYXRoXyA9IG9wdGlvbnNbJ2ltYWdlUGF0aCddIHx8XG4gICAgICB0aGlzLk1BUktFUl9DTFVTVEVSX0lNQUdFX1BBVEhfO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgdGhpcy5pbWFnZUV4dGVuc2lvbl8gPSBvcHRpb25zWydpbWFnZUV4dGVuc2lvbiddIHx8XG4gICAgICB0aGlzLk1BUktFUl9DTFVTVEVSX0lNQUdFX0VYVEVOU0lPTl87XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgdGhpcy56b29tT25DbGlja18gPSB0cnVlO1xuXG4gIGlmIChvcHRpb25zWyd6b29tT25DbGljayddICE9IHVuZGVmaW5lZCkge1xuICAgIHRoaXMuem9vbU9uQ2xpY2tfID0gb3B0aW9uc1snem9vbU9uQ2xpY2snXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHRoaXMuYXZlcmFnZUNlbnRlcl8gPSBmYWxzZTtcblxuICBpZiAob3B0aW9uc1snYXZlcmFnZUNlbnRlciddICE9IHVuZGVmaW5lZCkge1xuICAgIHRoaXMuYXZlcmFnZUNlbnRlcl8gPSBvcHRpb25zWydhdmVyYWdlQ2VudGVyJ107XG4gIH1cblxuICB0aGlzLnNldHVwU3R5bGVzXygpO1xuXG4gIHRoaXMuc2V0TWFwKG1hcCk7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICB0aGlzLnByZXZab29tXyA9IHRoaXMubWFwXy5nZXRab29tKCk7XG5cbiAgLy8gQWRkIHRoZSBtYXAgZXZlbnQgbGlzdGVuZXJzXG4gIHZhciB0aGF0ID0gdGhpcztcbiAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIodGhpcy5tYXBfLCAnem9vbV9jaGFuZ2VkJywgZnVuY3Rpb24oKSB7XG4gICAgdmFyIHpvb20gPSB0aGF0Lm1hcF8uZ2V0Wm9vbSgpO1xuXG4gICAgaWYgKHRoYXQucHJldlpvb21fICE9IHpvb20pIHtcbiAgICAgIHRoYXQucHJldlpvb21fID0gem9vbTtcbiAgICAgIHRoYXQucmVzZXRWaWV3cG9ydCgpO1xuICAgIH1cbiAgfSk7XG5cbiAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIodGhpcy5tYXBfLCAnaWRsZScsIGZ1bmN0aW9uKCkge1xuICAgIHRoYXQucmVkcmF3KCk7XG4gIH0pO1xuXG4gIC8vIEZpbmFsbHksIGFkZCB0aGUgbWFya2Vyc1xuICBpZiAob3B0X21hcmtlcnMgJiYgb3B0X21hcmtlcnMubGVuZ3RoKSB7XG4gICAgdGhpcy5hZGRNYXJrZXJzKG9wdF9tYXJrZXJzLCBmYWxzZSk7XG4gIH1cbn1cblxuXG4vKipcbiAqIFRoZSBtYXJrZXIgY2x1c3RlciBpbWFnZSBwYXRoLlxuICpcbiAqIEB0eXBlIHtzdHJpbmd9XG4gKiBAcHJpdmF0ZVxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLk1BUktFUl9DTFVTVEVSX0lNQUdFX1BBVEhfID1cbiAgICAnaHR0cDovL2dvb2dsZS1tYXBzLXV0aWxpdHktbGlicmFyeS12My5nb29nbGVjb2RlLmNvbS9zdm4vdHJ1bmsvbWFya2VyY2x1c3RlcmVyLycgK1xuICAgICdpbWFnZXMvbSc7XG5cblxuLyoqXG4gKiBUaGUgbWFya2VyIGNsdXN0ZXIgaW1hZ2UgcGF0aC5cbiAqXG4gKiBAdHlwZSB7c3RyaW5nfVxuICogQHByaXZhdGVcbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5NQVJLRVJfQ0xVU1RFUl9JTUFHRV9FWFRFTlNJT05fID0gJ3BuZyc7XG5cblxuLyoqXG4gKiBFeHRlbmRzIGEgb2JqZWN0cyBwcm90b3R5cGUgYnkgYW5vdGhlcnMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iajEgVGhlIG9iamVjdCB0byBiZSBleHRlbmRlZC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmoyIFRoZSBvYmplY3QgdG8gZXh0ZW5kIHdpdGguXG4gKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBuZXcgZXh0ZW5kZWQgb2JqZWN0LlxuICogQGlnbm9yZVxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmV4dGVuZCA9IGZ1bmN0aW9uKG9iajEsIG9iajIpIHtcbiAgcmV0dXJuIChmdW5jdGlvbihvYmplY3QpIHtcbiAgICBmb3IgKHZhciBwcm9wZXJ0eSBpbiBvYmplY3QucHJvdG90eXBlKSB7XG4gICAgICB0aGlzLnByb3RvdHlwZVtwcm9wZXJ0eV0gPSBvYmplY3QucHJvdG90eXBlW3Byb3BlcnR5XTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0pLmFwcGx5KG9iajEsIFtvYmoyXSk7XG59O1xuXG5cbi8qKlxuICogSW1wbGVtZW50YWlvbiBvZiB0aGUgaW50ZXJmYWNlIG1ldGhvZC5cbiAqIEBpZ25vcmVcbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5vbkFkZCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnNldFJlYWR5Xyh0cnVlKTtcbn07XG5cbi8qKlxuICogSW1wbGVtZW50YWlvbiBvZiB0aGUgaW50ZXJmYWNlIG1ldGhvZC5cbiAqIEBpZ25vcmVcbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5kcmF3ID0gZnVuY3Rpb24oKSB7fTtcblxuLyoqXG4gKiBTZXRzIHVwIHRoZSBzdHlsZXMgb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuc2V0dXBTdHlsZXNfID0gZnVuY3Rpb24oKSB7XG4gIGlmICh0aGlzLnN0eWxlc18ubGVuZ3RoKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgZm9yICh2YXIgaSA9IDAsIHNpemU7IHNpemUgPSB0aGlzLnNpemVzW2ldOyBpKyspIHtcbiAgICB0aGlzLnN0eWxlc18ucHVzaCh7XG4gICAgICB1cmw6IHRoaXMuaW1hZ2VQYXRoXyArIChpICsgMSkgKyAnLicgKyB0aGlzLmltYWdlRXh0ZW5zaW9uXyxcbiAgICAgIGhlaWdodDogc2l6ZSxcbiAgICAgIHdpZHRoOiBzaXplXG4gICAgfSk7XG4gIH1cbn07XG5cbi8qKlxuICogIEZpdCB0aGUgbWFwIHRvIHRoZSBib3VuZHMgb2YgdGhlIG1hcmtlcnMgaW4gdGhlIGNsdXN0ZXJlci5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5maXRNYXBUb01hcmtlcnMgPSBmdW5jdGlvbigpIHtcbiAgdmFyIG1hcmtlcnMgPSB0aGlzLmdldE1hcmtlcnMoKTtcbiAgdmFyIGJvdW5kcyA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmdCb3VuZHMoKTtcbiAgZm9yICh2YXIgaSA9IDAsIG1hcmtlcjsgbWFya2VyID0gbWFya2Vyc1tpXTsgaSsrKSB7XG4gICAgYm91bmRzLmV4dGVuZChtYXJrZXIuZ2V0UG9zaXRpb24oKSk7XG4gIH1cblxuICB0aGlzLm1hcF8uZml0Qm91bmRzKGJvdW5kcyk7XG59O1xuXG5cbi8qKlxuICogIFNldHMgdGhlIHN0eWxlcy5cbiAqXG4gKiAgQHBhcmFtIHtPYmplY3R9IHN0eWxlcyBUaGUgc3R5bGUgdG8gc2V0LlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnNldFN0eWxlcyA9IGZ1bmN0aW9uKHN0eWxlcykge1xuICB0aGlzLnN0eWxlc18gPSBzdHlsZXM7XG59O1xuXG5cbi8qKlxuICogIEdldHMgdGhlIHN0eWxlcy5cbiAqXG4gKiAgQHJldHVybiB7T2JqZWN0fSBUaGUgc3R5bGVzIG9iamVjdC5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRTdHlsZXMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuc3R5bGVzXztcbn07XG5cblxuLyoqXG4gKiBXaGV0aGVyIHpvb20gb24gY2xpY2sgaXMgc2V0LlxuICpcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgem9vbU9uQ2xpY2tfIGlzIHNldC5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5pc1pvb21PbkNsaWNrID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnpvb21PbkNsaWNrXztcbn07XG5cbi8qKlxuICogV2hldGhlciBhdmVyYWdlIGNlbnRlciBpcyBzZXQuXG4gKlxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiBhdmVyYWdlQ2VudGVyXyBpcyBzZXQuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuaXNBdmVyYWdlQ2VudGVyID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmF2ZXJhZ2VDZW50ZXJfO1xufTtcblxuXG4vKipcbiAqICBSZXR1cm5zIHRoZSBhcnJheSBvZiBtYXJrZXJzIGluIHRoZSBjbHVzdGVyZXIuXG4gKlxuICogIEByZXR1cm4ge0FycmF5Ljxnb29nbGUubWFwcy5NYXJrZXI+fSBUaGUgbWFya2Vycy5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRNYXJrZXJzID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLm1hcmtlcnNfO1xufTtcblxuXG4vKipcbiAqICBSZXR1cm5zIHRoZSBudW1iZXIgb2YgbWFya2VycyBpbiB0aGUgY2x1c3RlcmVyXG4gKlxuICogIEByZXR1cm4ge051bWJlcn0gVGhlIG51bWJlciBvZiBtYXJrZXJzLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldFRvdGFsTWFya2VycyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5tYXJrZXJzXy5sZW5ndGg7XG59O1xuXG5cbi8qKlxuICogIFNldHMgdGhlIG1heCB6b29tIGZvciB0aGUgY2x1c3RlcmVyLlxuICpcbiAqICBAcGFyYW0ge251bWJlcn0gbWF4Wm9vbSBUaGUgbWF4IHpvb20gbGV2ZWwuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuc2V0TWF4Wm9vbSA9IGZ1bmN0aW9uKG1heFpvb20pIHtcbiAgdGhpcy5tYXhab29tXyA9IG1heFpvb207XG59O1xuXG5cbi8qKlxuICogIEdldHMgdGhlIG1heCB6b29tIGZvciB0aGUgY2x1c3RlcmVyLlxuICpcbiAqICBAcmV0dXJuIHtudW1iZXJ9IFRoZSBtYXggem9vbSBsZXZlbC5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRNYXhab29tID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLm1heFpvb21fO1xufTtcblxuXG4vKipcbiAqICBUaGUgZnVuY3Rpb24gZm9yIGNhbGN1bGF0aW5nIHRoZSBjbHVzdGVyIGljb24gaW1hZ2UuXG4gKlxuICogIEBwYXJhbSB7QXJyYXkuPGdvb2dsZS5tYXBzLk1hcmtlcj59IG1hcmtlcnMgVGhlIG1hcmtlcnMgaW4gdGhlIGNsdXN0ZXJlci5cbiAqICBAcGFyYW0ge251bWJlcn0gbnVtU3R5bGVzIFRoZSBudW1iZXIgb2Ygc3R5bGVzIGF2YWlsYWJsZS5cbiAqICBAcmV0dXJuIHtPYmplY3R9IEEgb2JqZWN0IHByb3BlcnRpZXM6ICd0ZXh0JyAoc3RyaW5nKSBhbmQgJ2luZGV4JyAobnVtYmVyKS5cbiAqICBAcHJpdmF0ZVxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmNhbGN1bGF0b3JfID0gZnVuY3Rpb24obWFya2VycywgbnVtU3R5bGVzKSB7XG4gIHZhciBpbmRleCA9IDA7XG4gIHZhciBjb3VudCA9IG1hcmtlcnMubGVuZ3RoO1xuICB2YXIgZHYgPSBjb3VudDtcbiAgd2hpbGUgKGR2ICE9PSAwKSB7XG4gICAgZHYgPSBwYXJzZUludChkdiAvIDEwLCAxMCk7XG4gICAgaW5kZXgrKztcbiAgfVxuXG4gIGluZGV4ID0gTWF0aC5taW4oaW5kZXgsIG51bVN0eWxlcyk7XG4gIHJldHVybiB7XG4gICAgdGV4dDogY291bnQsXG4gICAgaW5kZXg6IGluZGV4XG4gIH07XG59O1xuXG5cbi8qKlxuICogU2V0IHRoZSBjYWxjdWxhdG9yIGZ1bmN0aW9uLlxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oQXJyYXksIG51bWJlcil9IGNhbGN1bGF0b3IgVGhlIGZ1bmN0aW9uIHRvIHNldCBhcyB0aGVcbiAqICAgICBjYWxjdWxhdG9yLiBUaGUgZnVuY3Rpb24gc2hvdWxkIHJldHVybiBhIG9iamVjdCBwcm9wZXJ0aWVzOlxuICogICAgICd0ZXh0JyAoc3RyaW5nKSBhbmQgJ2luZGV4JyAobnVtYmVyKS5cbiAqXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuc2V0Q2FsY3VsYXRvciA9IGZ1bmN0aW9uKGNhbGN1bGF0b3IpIHtcbiAgdGhpcy5jYWxjdWxhdG9yXyA9IGNhbGN1bGF0b3I7XG59O1xuXG5cbi8qKlxuICogR2V0IHRoZSBjYWxjdWxhdG9yIGZ1bmN0aW9uLlxuICpcbiAqIEByZXR1cm4ge2Z1bmN0aW9uKEFycmF5LCBudW1iZXIpfSB0aGUgY2FsY3VsYXRvciBmdW5jdGlvbi5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRDYWxjdWxhdG9yID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmNhbGN1bGF0b3JfO1xufTtcblxuXG4vKipcbiAqIEFkZCBhbiBhcnJheSBvZiBtYXJrZXJzIHRvIHRoZSBjbHVzdGVyZXIuXG4gKlxuICogQHBhcmFtIHtBcnJheS48Z29vZ2xlLm1hcHMuTWFya2VyPn0gbWFya2VycyBUaGUgbWFya2VycyB0byBhZGQuXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSBvcHRfbm9kcmF3IFdoZXRoZXIgdG8gcmVkcmF3IHRoZSBjbHVzdGVycy5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5hZGRNYXJrZXJzID0gZnVuY3Rpb24obWFya2Vycywgb3B0X25vZHJhdykge1xuICBmb3IgKHZhciBpID0gMCwgbWFya2VyOyBtYXJrZXIgPSBtYXJrZXJzW2ldOyBpKyspIHtcbiAgICB0aGlzLnB1c2hNYXJrZXJUb18obWFya2VyKTtcbiAgfVxuICBpZiAoIW9wdF9ub2RyYXcpIHtcbiAgICB0aGlzLnJlZHJhdygpO1xuICB9XG59O1xuXG5cbi8qKlxuICogUHVzaGVzIGEgbWFya2VyIHRvIHRoZSBjbHVzdGVyZXIuXG4gKlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5NYXJrZXJ9IG1hcmtlciBUaGUgbWFya2VyIHRvIGFkZC5cbiAqIEBwcml2YXRlXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUucHVzaE1hcmtlclRvXyA9IGZ1bmN0aW9uKG1hcmtlcikge1xuICBtYXJrZXIuaXNBZGRlZCA9IGZhbHNlO1xuICBpZiAobWFya2VyWydkcmFnZ2FibGUnXSkge1xuICAgIC8vIElmIHRoZSBtYXJrZXIgaXMgZHJhZ2dhYmxlIGFkZCBhIGxpc3RlbmVyIHNvIHdlIHVwZGF0ZSB0aGUgY2x1c3RlcnMgb25cbiAgICAvLyB0aGUgZHJhZyBlbmQuXG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKG1hcmtlciwgJ2RyYWdlbmQnLCBmdW5jdGlvbigpIHtcbiAgICAgIG1hcmtlci5pc0FkZGVkID0gZmFsc2U7XG4gICAgICB0aGF0LnJlcGFpbnQoKTtcbiAgICB9KTtcbiAgfVxuICB0aGlzLm1hcmtlcnNfLnB1c2gobWFya2VyKTtcbn07XG5cblxuLyoqXG4gKiBBZGRzIGEgbWFya2VyIHRvIHRoZSBjbHVzdGVyZXIgYW5kIHJlZHJhd3MgaWYgbmVlZGVkLlxuICpcbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTWFya2VyfSBtYXJrZXIgVGhlIG1hcmtlciB0byBhZGQuXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSBvcHRfbm9kcmF3IFdoZXRoZXIgdG8gcmVkcmF3IHRoZSBjbHVzdGVycy5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5hZGRNYXJrZXIgPSBmdW5jdGlvbihtYXJrZXIsIG9wdF9ub2RyYXcpIHtcbiAgdGhpcy5wdXNoTWFya2VyVG9fKG1hcmtlcik7XG4gIGlmICghb3B0X25vZHJhdykge1xuICAgIHRoaXMucmVkcmF3KCk7XG4gIH1cbn07XG5cblxuLyoqXG4gKiBSZW1vdmVzIGEgbWFya2VyIGFuZCByZXR1cm5zIHRydWUgaWYgcmVtb3ZlZCwgZmFsc2UgaWYgbm90XG4gKlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5NYXJrZXJ9IG1hcmtlciBUaGUgbWFya2VyIHRvIHJlbW92ZVxuICogQHJldHVybiB7Ym9vbGVhbn0gV2hldGhlciB0aGUgbWFya2VyIHdhcyByZW1vdmVkIG9yIG5vdFxuICogQHByaXZhdGVcbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5yZW1vdmVNYXJrZXJfID0gZnVuY3Rpb24obWFya2VyKSB7XG4gIHZhciBpbmRleCA9IC0xO1xuICBpZiAodGhpcy5tYXJrZXJzXy5pbmRleE9mKSB7XG4gICAgaW5kZXggPSB0aGlzLm1hcmtlcnNfLmluZGV4T2YobWFya2VyKTtcbiAgfSBlbHNlIHtcbiAgICBmb3IgKHZhciBpID0gMCwgbTsgbSA9IHRoaXMubWFya2Vyc19baV07IGkrKykge1xuICAgICAgaWYgKG0gPT0gbWFya2VyKSB7XG4gICAgICAgIGluZGV4ID0gaTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKGluZGV4ID09IC0xKSB7XG4gICAgLy8gTWFya2VyIGlzIG5vdCBpbiBvdXIgbGlzdCBvZiBtYXJrZXJzLlxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIG1hcmtlci5zZXRNYXAobnVsbCk7XG5cbiAgdGhpcy5tYXJrZXJzXy5zcGxpY2UoaW5kZXgsIDEpO1xuXG4gIHJldHVybiB0cnVlO1xufTtcblxuXG4vKipcbiAqIFJlbW92ZSBhIG1hcmtlciBmcm9tIHRoZSBjbHVzdGVyLlxuICpcbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTWFya2VyfSBtYXJrZXIgVGhlIG1hcmtlciB0byByZW1vdmUuXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSBvcHRfbm9kcmF3IE9wdGlvbmFsIGJvb2xlYW4gdG8gZm9yY2Ugbm8gcmVkcmF3LlxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgbWFya2VyIHdhcyByZW1vdmVkLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnJlbW92ZU1hcmtlciA9IGZ1bmN0aW9uKG1hcmtlciwgb3B0X25vZHJhdykge1xuICB2YXIgcmVtb3ZlZCA9IHRoaXMucmVtb3ZlTWFya2VyXyhtYXJrZXIpO1xuXG4gIGlmICghb3B0X25vZHJhdyAmJiByZW1vdmVkKSB7XG4gICAgdGhpcy5yZXNldFZpZXdwb3J0KCk7XG4gICAgdGhpcy5yZWRyYXcoKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxuXG4vKipcbiAqIFJlbW92ZXMgYW4gYXJyYXkgb2YgbWFya2VycyBmcm9tIHRoZSBjbHVzdGVyLlxuICpcbiAqIEBwYXJhbSB7QXJyYXkuPGdvb2dsZS5tYXBzLk1hcmtlcj59IG1hcmtlcnMgVGhlIG1hcmtlcnMgdG8gcmVtb3ZlLlxuICogQHBhcmFtIHtib29sZWFuPX0gb3B0X25vZHJhdyBPcHRpb25hbCBib29sZWFuIHRvIGZvcmNlIG5vIHJlZHJhdy5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5yZW1vdmVNYXJrZXJzID0gZnVuY3Rpb24obWFya2Vycywgb3B0X25vZHJhdykge1xuICB2YXIgcmVtb3ZlZCA9IGZhbHNlO1xuXG4gIGZvciAodmFyIGkgPSAwLCBtYXJrZXI7IG1hcmtlciA9IG1hcmtlcnNbaV07IGkrKykge1xuICAgIHZhciByID0gdGhpcy5yZW1vdmVNYXJrZXJfKG1hcmtlcik7XG4gICAgcmVtb3ZlZCA9IHJlbW92ZWQgfHwgcjtcbiAgfVxuXG4gIGlmICghb3B0X25vZHJhdyAmJiByZW1vdmVkKSB7XG4gICAgdGhpcy5yZXNldFZpZXdwb3J0KCk7XG4gICAgdGhpcy5yZWRyYXcoKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTtcblxuXG4vKipcbiAqIFNldHMgdGhlIGNsdXN0ZXJlcidzIHJlYWR5IHN0YXRlLlxuICpcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gcmVhZHkgVGhlIHN0YXRlLlxuICogQHByaXZhdGVcbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5zZXRSZWFkeV8gPSBmdW5jdGlvbihyZWFkeSkge1xuICBpZiAoIXRoaXMucmVhZHlfKSB7XG4gICAgdGhpcy5yZWFkeV8gPSByZWFkeTtcbiAgICB0aGlzLmNyZWF0ZUNsdXN0ZXJzXygpO1xuICB9XG59O1xuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIGNsdXN0ZXJzIGluIHRoZSBjbHVzdGVyZXIuXG4gKlxuICogQHJldHVybiB7bnVtYmVyfSBUaGUgbnVtYmVyIG9mIGNsdXN0ZXJzLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldFRvdGFsQ2x1c3RlcnMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuY2x1c3RlcnNfLmxlbmd0aDtcbn07XG5cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBnb29nbGUgbWFwIHRoYXQgdGhlIGNsdXN0ZXJlciBpcyBhc3NvY2lhdGVkIHdpdGguXG4gKlxuICogQHJldHVybiB7Z29vZ2xlLm1hcHMuTWFwfSBUaGUgbWFwLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldE1hcCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5tYXBfO1xufTtcblxuXG4vKipcbiAqIFNldHMgdGhlIGdvb2dsZSBtYXAgdGhhdCB0aGUgY2x1c3RlcmVyIGlzIGFzc29jaWF0ZWQgd2l0aC5cbiAqXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLk1hcH0gbWFwIFRoZSBtYXAuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuc2V0TWFwID0gZnVuY3Rpb24obWFwKSB7XG4gIHRoaXMubWFwXyA9IG1hcDtcbn07XG5cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBzaXplIG9mIHRoZSBncmlkLlxuICpcbiAqIEByZXR1cm4ge251bWJlcn0gVGhlIGdyaWQgc2l6ZS5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRHcmlkU2l6ZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5ncmlkU2l6ZV87XG59O1xuXG5cbi8qKlxuICogU2V0cyB0aGUgc2l6ZSBvZiB0aGUgZ3JpZC5cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gc2l6ZSBUaGUgZ3JpZCBzaXplLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnNldEdyaWRTaXplID0gZnVuY3Rpb24oc2l6ZSkge1xuICB0aGlzLmdyaWRTaXplXyA9IHNpemU7XG59O1xuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgbWluIGNsdXN0ZXIgc2l6ZS5cbiAqXG4gKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSBncmlkIHNpemUuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0TWluQ2x1c3RlclNpemUgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMubWluQ2x1c3RlclNpemVfO1xufTtcblxuLyoqXG4gKiBTZXRzIHRoZSBtaW4gY2x1c3RlciBzaXplLlxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBzaXplIFRoZSBncmlkIHNpemUuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuc2V0TWluQ2x1c3RlclNpemUgPSBmdW5jdGlvbihzaXplKSB7XG4gIHRoaXMubWluQ2x1c3RlclNpemVfID0gc2l6ZTtcbn07XG5cblxuLyoqXG4gKiBFeHRlbmRzIGEgYm91bmRzIG9iamVjdCBieSB0aGUgZ3JpZCBzaXplLlxuICpcbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTGF0TG5nQm91bmRzfSBib3VuZHMgVGhlIGJvdW5kcyB0byBleHRlbmQuXG4gKiBAcmV0dXJuIHtnb29nbGUubWFwcy5MYXRMbmdCb3VuZHN9IFRoZSBleHRlbmRlZCBib3VuZHMuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0RXh0ZW5kZWRCb3VuZHMgPSBmdW5jdGlvbihib3VuZHMpIHtcbiAgdmFyIHByb2plY3Rpb24gPSB0aGlzLmdldFByb2plY3Rpb24oKTtcblxuICAvLyBUdXJuIHRoZSBib3VuZHMgaW50byBsYXRsbmcuXG4gIHZhciB0ciA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoYm91bmRzLmdldE5vcnRoRWFzdCgpLmxhdCgpLFxuICAgICAgYm91bmRzLmdldE5vcnRoRWFzdCgpLmxuZygpKTtcbiAgdmFyIGJsID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhib3VuZHMuZ2V0U291dGhXZXN0KCkubGF0KCksXG4gICAgICBib3VuZHMuZ2V0U291dGhXZXN0KCkubG5nKCkpO1xuXG4gIC8vIENvbnZlcnQgdGhlIHBvaW50cyB0byBwaXhlbHMgYW5kIHRoZSBleHRlbmQgb3V0IGJ5IHRoZSBncmlkIHNpemUuXG4gIHZhciB0clBpeCA9IHByb2plY3Rpb24uZnJvbUxhdExuZ1RvRGl2UGl4ZWwodHIpO1xuICB0clBpeC54ICs9IHRoaXMuZ3JpZFNpemVfO1xuICB0clBpeC55IC09IHRoaXMuZ3JpZFNpemVfO1xuXG4gIHZhciBibFBpeCA9IHByb2plY3Rpb24uZnJvbUxhdExuZ1RvRGl2UGl4ZWwoYmwpO1xuICBibFBpeC54IC09IHRoaXMuZ3JpZFNpemVfO1xuICBibFBpeC55ICs9IHRoaXMuZ3JpZFNpemVfO1xuXG4gIC8vIENvbnZlcnQgdGhlIHBpeGVsIHBvaW50cyBiYWNrIHRvIExhdExuZ1xuICB2YXIgbmUgPSBwcm9qZWN0aW9uLmZyb21EaXZQaXhlbFRvTGF0TG5nKHRyUGl4KTtcbiAgdmFyIHN3ID0gcHJvamVjdGlvbi5mcm9tRGl2UGl4ZWxUb0xhdExuZyhibFBpeCk7XG5cbiAgLy8gRXh0ZW5kIHRoZSBib3VuZHMgdG8gY29udGFpbiB0aGUgbmV3IGJvdW5kcy5cbiAgYm91bmRzLmV4dGVuZChuZSk7XG4gIGJvdW5kcy5leHRlbmQoc3cpO1xuXG4gIHJldHVybiBib3VuZHM7XG59O1xuXG5cbi8qKlxuICogRGV0ZXJtaW5zIGlmIGEgbWFya2VyIGlzIGNvbnRhaW5lZCBpbiBhIGJvdW5kcy5cbiAqXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLk1hcmtlcn0gbWFya2VyIFRoZSBtYXJrZXIgdG8gY2hlY2suXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLkxhdExuZ0JvdW5kc30gYm91bmRzIFRoZSBib3VuZHMgdG8gY2hlY2sgYWdhaW5zdC5cbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdGhlIG1hcmtlciBpcyBpbiB0aGUgYm91bmRzLlxuICogQHByaXZhdGVcbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5pc01hcmtlckluQm91bmRzXyA9IGZ1bmN0aW9uKG1hcmtlciwgYm91bmRzKSB7XG4gIHJldHVybiBib3VuZHMuY29udGFpbnMobWFya2VyLmdldFBvc2l0aW9uKCkpO1xufTtcblxuXG4vKipcbiAqIENsZWFycyBhbGwgY2x1c3RlcnMgYW5kIG1hcmtlcnMgZnJvbSB0aGUgY2x1c3RlcmVyLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmNsZWFyTWFya2VycyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnJlc2V0Vmlld3BvcnQodHJ1ZSk7XG5cbiAgLy8gU2V0IHRoZSBtYXJrZXJzIGEgZW1wdHkgYXJyYXkuXG4gIHRoaXMubWFya2Vyc18gPSBbXTtcbn07XG5cblxuLyoqXG4gKiBDbGVhcnMgYWxsIGV4aXN0aW5nIGNsdXN0ZXJzIGFuZCByZWNyZWF0ZXMgdGhlbS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0X2hpZGUgVG8gYWxzbyBoaWRlIHRoZSBtYXJrZXIuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUucmVzZXRWaWV3cG9ydCA9IGZ1bmN0aW9uKG9wdF9oaWRlKSB7XG4gIC8vIFJlbW92ZSBhbGwgdGhlIGNsdXN0ZXJzXG4gIGZvciAodmFyIGkgPSAwLCBjbHVzdGVyOyBjbHVzdGVyID0gdGhpcy5jbHVzdGVyc19baV07IGkrKykge1xuICAgIGNsdXN0ZXIucmVtb3ZlKCk7XG4gIH1cblxuICAvLyBSZXNldCB0aGUgbWFya2VycyB0byBub3QgYmUgYWRkZWQgYW5kIHRvIGJlIGludmlzaWJsZS5cbiAgZm9yICh2YXIgaSA9IDAsIG1hcmtlcjsgbWFya2VyID0gdGhpcy5tYXJrZXJzX1tpXTsgaSsrKSB7XG4gICAgbWFya2VyLmlzQWRkZWQgPSBmYWxzZTtcbiAgICBpZiAob3B0X2hpZGUpIHtcbiAgICAgIG1hcmtlci5zZXRNYXAobnVsbCk7XG4gICAgfVxuICB9XG5cbiAgdGhpcy5jbHVzdGVyc18gPSBbXTtcbn07XG5cbi8qKlxuICpcbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5yZXBhaW50ID0gZnVuY3Rpb24oKSB7XG4gIHZhciBvbGRDbHVzdGVycyA9IHRoaXMuY2x1c3RlcnNfLnNsaWNlKCk7XG4gIHRoaXMuY2x1c3RlcnNfLmxlbmd0aCA9IDA7XG4gIHRoaXMucmVzZXRWaWV3cG9ydCgpO1xuICB0aGlzLnJlZHJhdygpO1xuXG4gIC8vIFJlbW92ZSB0aGUgb2xkIGNsdXN0ZXJzLlxuICAvLyBEbyBpdCBpbiBhIHRpbWVvdXQgc28gdGhlIG90aGVyIGNsdXN0ZXJzIGhhdmUgYmVlbiBkcmF3biBmaXJzdC5cbiAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGNsdXN0ZXI7IGNsdXN0ZXIgPSBvbGRDbHVzdGVyc1tpXTsgaSsrKSB7XG4gICAgICBjbHVzdGVyLnJlbW92ZSgpO1xuICAgIH1cbiAgfSwgMCk7XG59O1xuXG5cbi8qKlxuICogUmVkcmF3cyB0aGUgY2x1c3RlcnMuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUucmVkcmF3ID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuY3JlYXRlQ2x1c3RlcnNfKCk7XG59O1xuXG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgZGlzdGFuY2UgYmV0d2VlbiB0d28gbGF0bG5nIGxvY2F0aW9ucyBpbiBrbS5cbiAqIEBzZWUgaHR0cDovL3d3dy5tb3ZhYmxlLXR5cGUuY28udWsvc2NyaXB0cy9sYXRsb25nLmh0bWxcbiAqXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLkxhdExuZ30gcDEgVGhlIGZpcnN0IGxhdCBsbmcgcG9pbnQuXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLkxhdExuZ30gcDIgVGhlIHNlY29uZCBsYXQgbG5nIHBvaW50LlxuICogQHJldHVybiB7bnVtYmVyfSBUaGUgZGlzdGFuY2UgYmV0d2VlbiB0aGUgdHdvIHBvaW50cyBpbiBrbS5cbiAqIEBwcml2YXRlXG4qL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5kaXN0YW5jZUJldHdlZW5Qb2ludHNfID0gZnVuY3Rpb24ocDEsIHAyKSB7XG4gIGlmICghcDEgfHwgIXAyKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICB2YXIgUiA9IDYzNzE7IC8vIFJhZGl1cyBvZiB0aGUgRWFydGggaW4ga21cbiAgdmFyIGRMYXQgPSAocDIubGF0KCkgLSBwMS5sYXQoKSkgKiBNYXRoLlBJIC8gMTgwO1xuICB2YXIgZExvbiA9IChwMi5sbmcoKSAtIHAxLmxuZygpKSAqIE1hdGguUEkgLyAxODA7XG4gIHZhciBhID0gTWF0aC5zaW4oZExhdCAvIDIpICogTWF0aC5zaW4oZExhdCAvIDIpICtcbiAgICBNYXRoLmNvcyhwMS5sYXQoKSAqIE1hdGguUEkgLyAxODApICogTWF0aC5jb3MocDIubGF0KCkgKiBNYXRoLlBJIC8gMTgwKSAqXG4gICAgTWF0aC5zaW4oZExvbiAvIDIpICogTWF0aC5zaW4oZExvbiAvIDIpO1xuICB2YXIgYyA9IDIgKiBNYXRoLmF0YW4yKE1hdGguc3FydChhKSwgTWF0aC5zcXJ0KDEgLSBhKSk7XG4gIHZhciBkID0gUiAqIGM7XG4gIHJldHVybiBkO1xufTtcblxuXG4vKipcbiAqIEFkZCBhIG1hcmtlciB0byBhIGNsdXN0ZXIsIG9yIGNyZWF0ZXMgYSBuZXcgY2x1c3Rlci5cbiAqXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLk1hcmtlcn0gbWFya2VyIFRoZSBtYXJrZXIgdG8gYWRkLlxuICogQHByaXZhdGVcbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5hZGRUb0Nsb3Nlc3RDbHVzdGVyXyA9IGZ1bmN0aW9uKG1hcmtlcikge1xuICB2YXIgZGlzdGFuY2UgPSA0MDAwMDsgLy8gU29tZSBsYXJnZSBudW1iZXJcbiAgdmFyIGNsdXN0ZXJUb0FkZFRvID0gbnVsbDtcbiAgdmFyIHBvcyA9IG1hcmtlci5nZXRQb3NpdGlvbigpO1xuICBmb3IgKHZhciBpID0gMCwgY2x1c3RlcjsgY2x1c3RlciA9IHRoaXMuY2x1c3RlcnNfW2ldOyBpKyspIHtcbiAgICB2YXIgY2VudGVyID0gY2x1c3Rlci5nZXRDZW50ZXIoKTtcbiAgICBpZiAoY2VudGVyKSB7XG4gICAgICB2YXIgZCA9IHRoaXMuZGlzdGFuY2VCZXR3ZWVuUG9pbnRzXyhjZW50ZXIsIG1hcmtlci5nZXRQb3NpdGlvbigpKTtcbiAgICAgIGlmIChkIDwgZGlzdGFuY2UpIHtcbiAgICAgICAgZGlzdGFuY2UgPSBkO1xuICAgICAgICBjbHVzdGVyVG9BZGRUbyA9IGNsdXN0ZXI7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKGNsdXN0ZXJUb0FkZFRvICYmIGNsdXN0ZXJUb0FkZFRvLmlzTWFya2VySW5DbHVzdGVyQm91bmRzKG1hcmtlcikpIHtcbiAgICBjbHVzdGVyVG9BZGRUby5hZGRNYXJrZXIobWFya2VyKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgY2x1c3RlciA9IG5ldyBDbHVzdGVyKHRoaXMpO1xuICAgIGNsdXN0ZXIuYWRkTWFya2VyKG1hcmtlcik7XG4gICAgdGhpcy5jbHVzdGVyc18ucHVzaChjbHVzdGVyKTtcbiAgfVxufTtcblxuXG4vKipcbiAqIENyZWF0ZXMgdGhlIGNsdXN0ZXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuY3JlYXRlQ2x1c3RlcnNfID0gZnVuY3Rpb24oKSB7XG4gIGlmICghdGhpcy5yZWFkeV8pIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBHZXQgb3VyIGN1cnJlbnQgbWFwIHZpZXcgYm91bmRzLlxuICAvLyBDcmVhdGUgYSBuZXcgYm91bmRzIG9iamVjdCBzbyB3ZSBkb24ndCBhZmZlY3QgdGhlIG1hcC5cbiAgdmFyIG1hcEJvdW5kcyA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmdCb3VuZHModGhpcy5tYXBfLmdldEJvdW5kcygpLmdldFNvdXRoV2VzdCgpLFxuICAgICAgdGhpcy5tYXBfLmdldEJvdW5kcygpLmdldE5vcnRoRWFzdCgpKTtcbiAgdmFyIGJvdW5kcyA9IHRoaXMuZ2V0RXh0ZW5kZWRCb3VuZHMobWFwQm91bmRzKTtcblxuICBmb3IgKHZhciBpID0gMCwgbWFya2VyOyBtYXJrZXIgPSB0aGlzLm1hcmtlcnNfW2ldOyBpKyspIHtcbiAgICBpZiAoIW1hcmtlci5pc0FkZGVkICYmIHRoaXMuaXNNYXJrZXJJbkJvdW5kc18obWFya2VyLCBib3VuZHMpKSB7XG4gICAgICB0aGlzLmFkZFRvQ2xvc2VzdENsdXN0ZXJfKG1hcmtlcik7XG4gICAgfVxuICB9XG59O1xuXG5cbi8qKlxuICogQSBjbHVzdGVyIHRoYXQgY29udGFpbnMgbWFya2Vycy5cbiAqXG4gKiBAcGFyYW0ge01hcmtlckNsdXN0ZXJlcn0gbWFya2VyQ2x1c3RlcmVyIFRoZSBtYXJrZXJjbHVzdGVyZXIgdGhhdCB0aGlzXG4gKiAgICAgY2x1c3RlciBpcyBhc3NvY2lhdGVkIHdpdGguXG4gKiBAY29uc3RydWN0b3JcbiAqIEBpZ25vcmVcbiAqL1xuZnVuY3Rpb24gQ2x1c3RlcihtYXJrZXJDbHVzdGVyZXIpIHtcbiAgdGhpcy5tYXJrZXJDbHVzdGVyZXJfID0gbWFya2VyQ2x1c3RlcmVyO1xuICB0aGlzLm1hcF8gPSBtYXJrZXJDbHVzdGVyZXIuZ2V0TWFwKCk7XG4gIHRoaXMuZ3JpZFNpemVfID0gbWFya2VyQ2x1c3RlcmVyLmdldEdyaWRTaXplKCk7XG4gIHRoaXMubWluQ2x1c3RlclNpemVfID0gbWFya2VyQ2x1c3RlcmVyLmdldE1pbkNsdXN0ZXJTaXplKCk7XG4gIHRoaXMuYXZlcmFnZUNlbnRlcl8gPSBtYXJrZXJDbHVzdGVyZXIuaXNBdmVyYWdlQ2VudGVyKCk7XG4gIHRoaXMuY2VudGVyXyA9IG51bGw7XG4gIHRoaXMubWFya2Vyc18gPSBbXTtcbiAgdGhpcy5ib3VuZHNfID0gbnVsbDtcbiAgdGhpcy5jbHVzdGVySWNvbl8gPSBuZXcgQ2x1c3Rlckljb24odGhpcywgbWFya2VyQ2x1c3RlcmVyLmdldFN0eWxlcygpLFxuICAgICAgbWFya2VyQ2x1c3RlcmVyLmdldEdyaWRTaXplKCkpO1xufVxuXG4vKipcbiAqIERldGVybWlucyBpZiBhIG1hcmtlciBpcyBhbHJlYWR5IGFkZGVkIHRvIHRoZSBjbHVzdGVyLlxuICpcbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTWFya2VyfSBtYXJrZXIgVGhlIG1hcmtlciB0byBjaGVjay5cbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdGhlIG1hcmtlciBpcyBhbHJlYWR5IGFkZGVkLlxuICovXG5DbHVzdGVyLnByb3RvdHlwZS5pc01hcmtlckFscmVhZHlBZGRlZCA9IGZ1bmN0aW9uKG1hcmtlcikge1xuICBpZiAodGhpcy5tYXJrZXJzXy5pbmRleE9mKSB7XG4gICAgcmV0dXJuIHRoaXMubWFya2Vyc18uaW5kZXhPZihtYXJrZXIpICE9IC0xO1xuICB9IGVsc2Uge1xuICAgIGZvciAodmFyIGkgPSAwLCBtOyBtID0gdGhpcy5tYXJrZXJzX1tpXTsgaSsrKSB7XG4gICAgICBpZiAobSA9PSBtYXJrZXIpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cblxuLyoqXG4gKiBBZGQgYSBtYXJrZXIgdGhlIGNsdXN0ZXIuXG4gKlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5NYXJrZXJ9IG1hcmtlciBUaGUgbWFya2VyIHRvIGFkZC5cbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdGhlIG1hcmtlciB3YXMgYWRkZWQuXG4gKi9cbkNsdXN0ZXIucHJvdG90eXBlLmFkZE1hcmtlciA9IGZ1bmN0aW9uKG1hcmtlcikge1xuICBpZiAodGhpcy5pc01hcmtlckFscmVhZHlBZGRlZChtYXJrZXIpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKCF0aGlzLmNlbnRlcl8pIHtcbiAgICB0aGlzLmNlbnRlcl8gPSBtYXJrZXIuZ2V0UG9zaXRpb24oKTtcbiAgICB0aGlzLmNhbGN1bGF0ZUJvdW5kc18oKTtcbiAgfSBlbHNlIHtcbiAgICBpZiAodGhpcy5hdmVyYWdlQ2VudGVyXykge1xuICAgICAgdmFyIGwgPSB0aGlzLm1hcmtlcnNfLmxlbmd0aCArIDE7XG4gICAgICB2YXIgbGF0ID0gKHRoaXMuY2VudGVyXy5sYXQoKSAqIChsLTEpICsgbWFya2VyLmdldFBvc2l0aW9uKCkubGF0KCkpIC8gbDtcbiAgICAgIHZhciBsbmcgPSAodGhpcy5jZW50ZXJfLmxuZygpICogKGwtMSkgKyBtYXJrZXIuZ2V0UG9zaXRpb24oKS5sbmcoKSkgLyBsO1xuICAgICAgdGhpcy5jZW50ZXJfID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhsYXQsIGxuZyk7XG4gICAgICB0aGlzLmNhbGN1bGF0ZUJvdW5kc18oKTtcbiAgICB9XG4gIH1cblxuICBtYXJrZXIuaXNBZGRlZCA9IHRydWU7XG4gIHRoaXMubWFya2Vyc18ucHVzaChtYXJrZXIpO1xuXG4gIHZhciBsZW4gPSB0aGlzLm1hcmtlcnNfLmxlbmd0aDtcbiAgaWYgKGxlbiA8IHRoaXMubWluQ2x1c3RlclNpemVfICYmIG1hcmtlci5nZXRNYXAoKSAhPSB0aGlzLm1hcF8pIHtcbiAgICAvLyBNaW4gY2x1c3RlciBzaXplIG5vdCByZWFjaGVkIHNvIHNob3cgdGhlIG1hcmtlci5cbiAgICBtYXJrZXIuc2V0TWFwKHRoaXMubWFwXyk7XG4gIH1cblxuICBpZiAobGVuID09IHRoaXMubWluQ2x1c3RlclNpemVfKSB7XG4gICAgLy8gSGlkZSB0aGUgbWFya2VycyB0aGF0IHdlcmUgc2hvd2luZy5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICB0aGlzLm1hcmtlcnNfW2ldLnNldE1hcChudWxsKTtcbiAgICB9XG4gIH1cblxuICBpZiAobGVuID49IHRoaXMubWluQ2x1c3RlclNpemVfKSB7XG4gICAgbWFya2VyLnNldE1hcChudWxsKTtcbiAgfVxuXG4gIHRoaXMudXBkYXRlSWNvbigpO1xuICByZXR1cm4gdHJ1ZTtcbn07XG5cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBtYXJrZXIgY2x1c3RlcmVyIHRoYXQgdGhlIGNsdXN0ZXIgaXMgYXNzb2NpYXRlZCB3aXRoLlxuICpcbiAqIEByZXR1cm4ge01hcmtlckNsdXN0ZXJlcn0gVGhlIGFzc29jaWF0ZWQgbWFya2VyIGNsdXN0ZXJlci5cbiAqL1xuQ2x1c3Rlci5wcm90b3R5cGUuZ2V0TWFya2VyQ2x1c3RlcmVyID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLm1hcmtlckNsdXN0ZXJlcl87XG59O1xuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgYm91bmRzIG9mIHRoZSBjbHVzdGVyLlxuICpcbiAqIEByZXR1cm4ge2dvb2dsZS5tYXBzLkxhdExuZ0JvdW5kc30gdGhlIGNsdXN0ZXIgYm91bmRzLlxuICovXG5DbHVzdGVyLnByb3RvdHlwZS5nZXRCb3VuZHMgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGJvdW5kcyA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmdCb3VuZHModGhpcy5jZW50ZXJfLCB0aGlzLmNlbnRlcl8pO1xuICB2YXIgbWFya2VycyA9IHRoaXMuZ2V0TWFya2VycygpO1xuICBmb3IgKHZhciBpID0gMCwgbWFya2VyOyBtYXJrZXIgPSBtYXJrZXJzW2ldOyBpKyspIHtcbiAgICBib3VuZHMuZXh0ZW5kKG1hcmtlci5nZXRQb3NpdGlvbigpKTtcbiAgfVxuICByZXR1cm4gYm91bmRzO1xufTtcblxuXG4vKipcbiAqIFJlbW92ZXMgdGhlIGNsdXN0ZXJcbiAqL1xuQ2x1c3Rlci5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuY2x1c3Rlckljb25fLnJlbW92ZSgpO1xuICB0aGlzLm1hcmtlcnNfLmxlbmd0aCA9IDA7XG4gIGRlbGV0ZSB0aGlzLm1hcmtlcnNfO1xufTtcblxuXG4vKipcbiAqIFJldHVybnMgdGhlIGNlbnRlciBvZiB0aGUgY2x1c3Rlci5cbiAqXG4gKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSBjbHVzdGVyIGNlbnRlci5cbiAqL1xuQ2x1c3Rlci5wcm90b3R5cGUuZ2V0U2l6ZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5tYXJrZXJzXy5sZW5ndGg7XG59O1xuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgY2VudGVyIG9mIHRoZSBjbHVzdGVyLlxuICpcbiAqIEByZXR1cm4ge0FycmF5Ljxnb29nbGUubWFwcy5NYXJrZXI+fSBUaGUgY2x1c3RlciBjZW50ZXIuXG4gKi9cbkNsdXN0ZXIucHJvdG90eXBlLmdldE1hcmtlcnMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMubWFya2Vyc187XG59O1xuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgY2VudGVyIG9mIHRoZSBjbHVzdGVyLlxuICpcbiAqIEByZXR1cm4ge2dvb2dsZS5tYXBzLkxhdExuZ30gVGhlIGNsdXN0ZXIgY2VudGVyLlxuICovXG5DbHVzdGVyLnByb3RvdHlwZS5nZXRDZW50ZXIgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuY2VudGVyXztcbn07XG5cblxuLyoqXG4gKiBDYWxjdWxhdGVkIHRoZSBleHRlbmRlZCBib3VuZHMgb2YgdGhlIGNsdXN0ZXIgd2l0aCB0aGUgZ3JpZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5DbHVzdGVyLnByb3RvdHlwZS5jYWxjdWxhdGVCb3VuZHNfID0gZnVuY3Rpb24oKSB7XG4gIHZhciBib3VuZHMgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nQm91bmRzKHRoaXMuY2VudGVyXywgdGhpcy5jZW50ZXJfKTtcbiAgdGhpcy5ib3VuZHNfID0gdGhpcy5tYXJrZXJDbHVzdGVyZXJfLmdldEV4dGVuZGVkQm91bmRzKGJvdW5kcyk7XG59O1xuXG5cbi8qKlxuICogRGV0ZXJtaW5lcyBpZiBhIG1hcmtlciBsaWVzIGluIHRoZSBjbHVzdGVycyBib3VuZHMuXG4gKlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5NYXJrZXJ9IG1hcmtlciBUaGUgbWFya2VyIHRvIGNoZWNrLlxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgbWFya2VyIGxpZXMgaW4gdGhlIGJvdW5kcy5cbiAqL1xuQ2x1c3Rlci5wcm90b3R5cGUuaXNNYXJrZXJJbkNsdXN0ZXJCb3VuZHMgPSBmdW5jdGlvbihtYXJrZXIpIHtcbiAgcmV0dXJuIHRoaXMuYm91bmRzXy5jb250YWlucyhtYXJrZXIuZ2V0UG9zaXRpb24oKSk7XG59O1xuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgbWFwIHRoYXQgdGhlIGNsdXN0ZXIgaXMgYXNzb2NpYXRlZCB3aXRoLlxuICpcbiAqIEByZXR1cm4ge2dvb2dsZS5tYXBzLk1hcH0gVGhlIG1hcC5cbiAqL1xuQ2x1c3Rlci5wcm90b3R5cGUuZ2V0TWFwID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLm1hcF87XG59O1xuXG5cbi8qKlxuICogVXBkYXRlcyB0aGUgY2x1c3RlciBpY29uXG4gKi9cbkNsdXN0ZXIucHJvdG90eXBlLnVwZGF0ZUljb24gPSBmdW5jdGlvbigpIHtcbiAgdmFyIHpvb20gPSB0aGlzLm1hcF8uZ2V0Wm9vbSgpO1xuICB2YXIgbXogPSB0aGlzLm1hcmtlckNsdXN0ZXJlcl8uZ2V0TWF4Wm9vbSgpO1xuXG4gIGlmIChteiAmJiB6b29tID4gbXopIHtcbiAgICAvLyBUaGUgem9vbSBpcyBncmVhdGVyIHRoYW4gb3VyIG1heCB6b29tIHNvIHNob3cgYWxsIHRoZSBtYXJrZXJzIGluIGNsdXN0ZXIuXG4gICAgZm9yICh2YXIgaSA9IDAsIG1hcmtlcjsgbWFya2VyID0gdGhpcy5tYXJrZXJzX1tpXTsgaSsrKSB7XG4gICAgICBtYXJrZXIuc2V0TWFwKHRoaXMubWFwXyk7XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmICh0aGlzLm1hcmtlcnNfLmxlbmd0aCA8IHRoaXMubWluQ2x1c3RlclNpemVfKSB7XG4gICAgLy8gTWluIGNsdXN0ZXIgc2l6ZSBub3QgeWV0IHJlYWNoZWQuXG4gICAgdGhpcy5jbHVzdGVySWNvbl8uaGlkZSgpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBudW1TdHlsZXMgPSB0aGlzLm1hcmtlckNsdXN0ZXJlcl8uZ2V0U3R5bGVzKCkubGVuZ3RoO1xuICB2YXIgc3VtcyA9IHRoaXMubWFya2VyQ2x1c3RlcmVyXy5nZXRDYWxjdWxhdG9yKCkodGhpcy5tYXJrZXJzXywgbnVtU3R5bGVzKTtcbiAgdGhpcy5jbHVzdGVySWNvbl8uc2V0Q2VudGVyKHRoaXMuY2VudGVyXyk7XG4gIHRoaXMuY2x1c3Rlckljb25fLnNldFN1bXMoc3Vtcyk7XG4gIHRoaXMuY2x1c3Rlckljb25fLnNob3coKTtcbn07XG5cblxuLyoqXG4gKiBBIGNsdXN0ZXIgaWNvblxuICpcbiAqIEBwYXJhbSB7Q2x1c3Rlcn0gY2x1c3RlciBUaGUgY2x1c3RlciB0byBiZSBhc3NvY2lhdGVkIHdpdGguXG4gKiBAcGFyYW0ge09iamVjdH0gc3R5bGVzIEFuIG9iamVjdCB0aGF0IGhhcyBzdHlsZSBwcm9wZXJ0aWVzOlxuICogICAgICd1cmwnOiAoc3RyaW5nKSBUaGUgaW1hZ2UgdXJsLlxuICogICAgICdoZWlnaHQnOiAobnVtYmVyKSBUaGUgaW1hZ2UgaGVpZ2h0LlxuICogICAgICd3aWR0aCc6IChudW1iZXIpIFRoZSBpbWFnZSB3aWR0aC5cbiAqICAgICAnYW5jaG9yJzogKEFycmF5KSBUaGUgYW5jaG9yIHBvc2l0aW9uIG9mIHRoZSBsYWJlbCB0ZXh0LlxuICogICAgICd0ZXh0Q29sb3InOiAoc3RyaW5nKSBUaGUgdGV4dCBjb2xvci5cbiAqICAgICAndGV4dFNpemUnOiAobnVtYmVyKSBUaGUgdGV4dCBzaXplLlxuICogICAgICAnZm9udEZhbWlseSc6IChzdHJpbmcpIFRoZSBmb250IGZhbWlseS5cbiAqICAgICAgJ2ZvbnRXZWlnaHQnOiAoc3RyaW5nKSBUaGUgZm9udCB3ZWlnaHQuXG4gKiAgICAgJ2JhY2tncm91bmRQb3NpdGlvbjogKHN0cmluZykgVGhlIGJhY2tncm91bmQgcG9zdGl0aW9uIHgsIHkuXG4gKiBAcGFyYW0ge251bWJlcj19IG9wdF9wYWRkaW5nIE9wdGlvbmFsIHBhZGRpbmcgdG8gYXBwbHkgdG8gdGhlIGNsdXN0ZXIgaWNvbi5cbiAqIEBjb25zdHJ1Y3RvclxuICogQGV4dGVuZHMgZ29vZ2xlLm1hcHMuT3ZlcmxheVZpZXdcbiAqIEBpZ25vcmVcbiAqL1xuZnVuY3Rpb24gQ2x1c3Rlckljb24oY2x1c3Rlciwgc3R5bGVzLCBvcHRfcGFkZGluZykge1xuICBjbHVzdGVyLmdldE1hcmtlckNsdXN0ZXJlcigpLmV4dGVuZChDbHVzdGVySWNvbiwgZ29vZ2xlLm1hcHMuT3ZlcmxheVZpZXcpO1xuXG4gIHRoaXMuc3R5bGVzXyA9IHN0eWxlcztcbiAgdGhpcy5wYWRkaW5nXyA9IG9wdF9wYWRkaW5nIHx8IDA7XG4gIHRoaXMuY2x1c3Rlcl8gPSBjbHVzdGVyO1xuICB0aGlzLmNlbnRlcl8gPSBudWxsO1xuICB0aGlzLm1hcF8gPSBjbHVzdGVyLmdldE1hcCgpO1xuICB0aGlzLmRpdl8gPSBudWxsO1xuICB0aGlzLnN1bXNfID0gbnVsbDtcbiAgdGhpcy52aXNpYmxlXyA9IGZhbHNlO1xuXG4gIHRoaXMuc2V0TWFwKHRoaXMubWFwXyk7XG59XG5cblxuLyoqXG4gKiBUcmlnZ2VycyB0aGUgY2x1c3RlcmNsaWNrIGV2ZW50IGFuZCB6b29tJ3MgaWYgdGhlIG9wdGlvbiBpcyBzZXQuXG4gKi9cbkNsdXN0ZXJJY29uLnByb3RvdHlwZS50cmlnZ2VyQ2x1c3RlckNsaWNrID0gZnVuY3Rpb24oKSB7XG4gIHZhciBtYXJrZXJDbHVzdGVyZXIgPSB0aGlzLmNsdXN0ZXJfLmdldE1hcmtlckNsdXN0ZXJlcigpO1xuXG4gIC8vIFRyaWdnZXIgdGhlIGNsdXN0ZXJjbGljayBldmVudC5cbiAgZ29vZ2xlLm1hcHMuZXZlbnQudHJpZ2dlcihtYXJrZXJDbHVzdGVyZXIsICdjbHVzdGVyY2xpY2snLCB0aGlzLmNsdXN0ZXJfKTtcblxuICBpZiAobWFya2VyQ2x1c3RlcmVyLmlzWm9vbU9uQ2xpY2soKSkge1xuICAgIC8vIFpvb20gaW50byB0aGUgY2x1c3Rlci5cbiAgICB0aGlzLm1hcF8uZml0Qm91bmRzKHRoaXMuY2x1c3Rlcl8uZ2V0Qm91bmRzKCkpO1xuICB9XG59O1xuXG5cbi8qKlxuICogQWRkaW5nIHRoZSBjbHVzdGVyIGljb24gdG8gdGhlIGRvbS5cbiAqIEBpZ25vcmVcbiAqL1xuQ2x1c3Rlckljb24ucHJvdG90eXBlLm9uQWRkID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuZGl2XyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xuICBpZiAodGhpcy52aXNpYmxlXykge1xuICAgIHZhciBwb3MgPSB0aGlzLmdldFBvc0Zyb21MYXRMbmdfKHRoaXMuY2VudGVyXyk7XG4gICAgdGhpcy5kaXZfLnN0eWxlLmNzc1RleHQgPSB0aGlzLmNyZWF0ZUNzcyhwb3MpO1xuICAgIHRoaXMuZGl2Xy5pbm5lckhUTUwgPSB0aGlzLnN1bXNfLnRleHQ7XG4gIH1cblxuICB2YXIgcGFuZXMgPSB0aGlzLmdldFBhbmVzKCk7XG4gIHBhbmVzLm92ZXJsYXlNb3VzZVRhcmdldC5hcHBlbmRDaGlsZCh0aGlzLmRpdl8pO1xuXG4gIHZhciB0aGF0ID0gdGhpcztcbiAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkRG9tTGlzdGVuZXIodGhpcy5kaXZfLCAnY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICB0aGF0LnRyaWdnZXJDbHVzdGVyQ2xpY2soKTtcbiAgfSk7XG59O1xuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgcG9zaXRpb24gdG8gcGxhY2UgdGhlIGRpdiBkZW5kaW5nIG9uIHRoZSBsYXRsbmcuXG4gKlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5MYXRMbmd9IGxhdGxuZyBUaGUgcG9zaXRpb24gaW4gbGF0bG5nLlxuICogQHJldHVybiB7Z29vZ2xlLm1hcHMuUG9pbnR9IFRoZSBwb3NpdGlvbiBpbiBwaXhlbHMuXG4gKiBAcHJpdmF0ZVxuICovXG5DbHVzdGVySWNvbi5wcm90b3R5cGUuZ2V0UG9zRnJvbUxhdExuZ18gPSBmdW5jdGlvbihsYXRsbmcpIHtcbiAgdmFyIHBvcyA9IHRoaXMuZ2V0UHJvamVjdGlvbigpLmZyb21MYXRMbmdUb0RpdlBpeGVsKGxhdGxuZyk7XG4gIHBvcy54IC09IHBhcnNlSW50KHRoaXMud2lkdGhfIC8gMiwgMTApO1xuICBwb3MueSAtPSBwYXJzZUludCh0aGlzLmhlaWdodF8gLyAyLCAxMCk7XG4gIHJldHVybiBwb3M7XG59O1xuXG5cbi8qKlxuICogRHJhdyB0aGUgaWNvbi5cbiAqIEBpZ25vcmVcbiAqL1xuQ2x1c3Rlckljb24ucHJvdG90eXBlLmRyYXcgPSBmdW5jdGlvbigpIHtcbiAgaWYgKHRoaXMudmlzaWJsZV8pIHtcbiAgICB2YXIgcG9zID0gdGhpcy5nZXRQb3NGcm9tTGF0TG5nXyh0aGlzLmNlbnRlcl8pO1xuICAgIHRoaXMuZGl2Xy5zdHlsZS50b3AgPSBwb3MueSArICdweCc7XG4gICAgdGhpcy5kaXZfLnN0eWxlLmxlZnQgPSBwb3MueCArICdweCc7XG4gIH1cbn07XG5cblxuLyoqXG4gKiBIaWRlIHRoZSBpY29uLlxuICovXG5DbHVzdGVySWNvbi5wcm90b3R5cGUuaGlkZSA9IGZ1bmN0aW9uKCkge1xuICBpZiAodGhpcy5kaXZfKSB7XG4gICAgdGhpcy5kaXZfLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIH1cbiAgdGhpcy52aXNpYmxlXyA9IGZhbHNlO1xufTtcblxuXG4vKipcbiAqIFBvc2l0aW9uIGFuZCBzaG93IHRoZSBpY29uLlxuICovXG5DbHVzdGVySWNvbi5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uKCkge1xuICBpZiAodGhpcy5kaXZfKSB7XG4gICAgdmFyIHBvcyA9IHRoaXMuZ2V0UG9zRnJvbUxhdExuZ18odGhpcy5jZW50ZXJfKTtcbiAgICB0aGlzLmRpdl8uc3R5bGUuY3NzVGV4dCA9IHRoaXMuY3JlYXRlQ3NzKHBvcyk7XG4gICAgdGhpcy5kaXZfLnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgfVxuICB0aGlzLnZpc2libGVfID0gdHJ1ZTtcbn07XG5cblxuLyoqXG4gKiBSZW1vdmUgdGhlIGljb24gZnJvbSB0aGUgbWFwXG4gKi9cbkNsdXN0ZXJJY29uLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5zZXRNYXAobnVsbCk7XG59O1xuXG5cbi8qKlxuICogSW1wbGVtZW50YXRpb24gb2YgdGhlIG9uUmVtb3ZlIGludGVyZmFjZS5cbiAqIEBpZ25vcmVcbiAqL1xuQ2x1c3Rlckljb24ucHJvdG90eXBlLm9uUmVtb3ZlID0gZnVuY3Rpb24oKSB7XG4gIGlmICh0aGlzLmRpdl8gJiYgdGhpcy5kaXZfLnBhcmVudE5vZGUpIHtcbiAgICB0aGlzLmhpZGUoKTtcbiAgICB0aGlzLmRpdl8ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLmRpdl8pO1xuICAgIHRoaXMuZGl2XyA9IG51bGw7XG4gIH1cbn07XG5cblxuLyoqXG4gKiBTZXQgdGhlIHN1bXMgb2YgdGhlIGljb24uXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHN1bXMgVGhlIHN1bXMgY29udGFpbmluZzpcbiAqICAgJ3RleHQnOiAoc3RyaW5nKSBUaGUgdGV4dCB0byBkaXNwbGF5IGluIHRoZSBpY29uLlxuICogICAnaW5kZXgnOiAobnVtYmVyKSBUaGUgc3R5bGUgaW5kZXggb2YgdGhlIGljb24uXG4gKi9cbkNsdXN0ZXJJY29uLnByb3RvdHlwZS5zZXRTdW1zID0gZnVuY3Rpb24oc3Vtcykge1xuICB0aGlzLnN1bXNfID0gc3VtcztcbiAgdGhpcy50ZXh0XyA9IHN1bXMudGV4dDtcbiAgdGhpcy5pbmRleF8gPSBzdW1zLmluZGV4O1xuICBpZiAodGhpcy5kaXZfKSB7XG4gICAgdGhpcy5kaXZfLmlubmVySFRNTCA9IHN1bXMudGV4dDtcbiAgfVxuXG4gIHRoaXMudXNlU3R5bGUoKTtcbn07XG5cblxuLyoqXG4gKiBTZXRzIHRoZSBpY29uIHRvIHRoZSB0aGUgc3R5bGVzLlxuICovXG5DbHVzdGVySWNvbi5wcm90b3R5cGUudXNlU3R5bGUgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGluZGV4ID0gTWF0aC5tYXgoMCwgdGhpcy5zdW1zXy5pbmRleCAtIDEpO1xuICBpbmRleCA9IE1hdGgubWluKHRoaXMuc3R5bGVzXy5sZW5ndGggLSAxLCBpbmRleCk7XG4gIHZhciBzdHlsZSA9IHRoaXMuc3R5bGVzX1tpbmRleF07XG4gIHRoaXMudXJsXyA9IHN0eWxlWyd1cmwnXTtcbiAgdGhpcy5oZWlnaHRfID0gc3R5bGVbJ2hlaWdodCddO1xuICB0aGlzLndpZHRoXyA9IHN0eWxlWyd3aWR0aCddO1xuICB0aGlzLnRleHRDb2xvcl8gPSBzdHlsZVsndGV4dENvbG9yJ107XG4gIHRoaXMuYW5jaG9yXyA9IHN0eWxlWydhbmNob3InXTtcbiAgdGhpcy50ZXh0U2l6ZV8gPSBzdHlsZVsndGV4dFNpemUnXTtcbiAgdGhpcy5mb250RmFtaWx5XyA9IHN0eWxlWydmb250RmFtaWx5J107XG4gIHRoaXMuZm9udFdlaWdodF8gPSBzdHlsZVsnZm9udFdlaWdodCddO1xuICB0aGlzLmJhY2tncm91bmRQb3NpdGlvbl8gPSBzdHlsZVsnYmFja2dyb3VuZFBvc2l0aW9uJ107XG59O1xuXG5cbi8qKlxuICogU2V0cyB0aGUgY2VudGVyIG9mIHRoZSBpY29uLlxuICpcbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTGF0TG5nfSBjZW50ZXIgVGhlIGxhdGxuZyB0byBzZXQgYXMgdGhlIGNlbnRlci5cbiAqL1xuQ2x1c3Rlckljb24ucHJvdG90eXBlLnNldENlbnRlciA9IGZ1bmN0aW9uKGNlbnRlcikge1xuICB0aGlzLmNlbnRlcl8gPSBjZW50ZXI7XG59O1xuXG5cbi8qKlxuICogQ3JlYXRlIHRoZSBjc3MgdGV4dCBiYXNlZCBvbiB0aGUgcG9zaXRpb24gb2YgdGhlIGljb24uXG4gKlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5Qb2ludH0gcG9zIFRoZSBwb3NpdGlvbi5cbiAqIEByZXR1cm4ge3N0cmluZ30gVGhlIGNzcyBzdHlsZSB0ZXh0LlxuICovXG5DbHVzdGVySWNvbi5wcm90b3R5cGUuY3JlYXRlQ3NzID0gZnVuY3Rpb24ocG9zKSB7XG4gIHZhciBzdHlsZSA9IFtdO1xuICBzdHlsZS5wdXNoKCdiYWNrZ3JvdW5kLWltYWdlOnVybCgnICsgdGhpcy51cmxfICsgJyk7Jyk7XG4gIHZhciBiYWNrZ3JvdW5kUG9zaXRpb24gPSB0aGlzLmJhY2tncm91bmRQb3NpdGlvbl8gPyB0aGlzLmJhY2tncm91bmRQb3NpdGlvbl8gOiAnMCAwJztcbiAgc3R5bGUucHVzaCgnYmFja2dyb3VuZC1wb3NpdGlvbjonICsgYmFja2dyb3VuZFBvc2l0aW9uICsgJzsnKTtcblxuICBpZiAodHlwZW9mIHRoaXMuYW5jaG9yXyA9PT0gJ29iamVjdCcpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMuYW5jaG9yX1swXSA9PT0gJ251bWJlcicgJiYgdGhpcy5hbmNob3JfWzBdID4gMCAmJlxuICAgICAgICB0aGlzLmFuY2hvcl9bMF0gPCB0aGlzLmhlaWdodF8pIHtcbiAgICAgIHN0eWxlLnB1c2goJ2hlaWdodDonICsgKHRoaXMuaGVpZ2h0XyAtIHRoaXMuYW5jaG9yX1swXSkgK1xuICAgICAgICAgICdweDsgcGFkZGluZy10b3A6JyArIHRoaXMuYW5jaG9yX1swXSArICdweDsnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3R5bGUucHVzaCgnaGVpZ2h0OicgKyB0aGlzLmhlaWdodF8gKyAncHg7IGxpbmUtaGVpZ2h0OicgKyB0aGlzLmhlaWdodF8gK1xuICAgICAgICAgICdweDsnKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB0aGlzLmFuY2hvcl9bMV0gPT09ICdudW1iZXInICYmIHRoaXMuYW5jaG9yX1sxXSA+IDAgJiZcbiAgICAgICAgdGhpcy5hbmNob3JfWzFdIDwgdGhpcy53aWR0aF8pIHtcbiAgICAgIHN0eWxlLnB1c2goJ3dpZHRoOicgKyAodGhpcy53aWR0aF8gLSB0aGlzLmFuY2hvcl9bMV0pICtcbiAgICAgICAgICAncHg7IHBhZGRpbmctbGVmdDonICsgdGhpcy5hbmNob3JfWzFdICsgJ3B4OycpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZS5wdXNoKCd3aWR0aDonICsgdGhpcy53aWR0aF8gKyAncHg7IHRleHQtYWxpZ246Y2VudGVyOycpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBzdHlsZS5wdXNoKCdoZWlnaHQ6JyArIHRoaXMuaGVpZ2h0XyArICdweDsgbGluZS1oZWlnaHQ6JyArXG4gICAgICAgIHRoaXMuaGVpZ2h0XyArICdweDsgd2lkdGg6JyArIHRoaXMud2lkdGhfICsgJ3B4OyB0ZXh0LWFsaWduOmNlbnRlcjsnKTtcbiAgfVxuXG4gIHZhciB0eHRDb2xvciA9IHRoaXMudGV4dENvbG9yXyA/IHRoaXMudGV4dENvbG9yXyA6ICdibGFjayc7XG4gIHZhciB0eHRTaXplID0gdGhpcy50ZXh0U2l6ZV8gPyB0aGlzLnRleHRTaXplXyA6IDExO1xuICB2YXIgZm9udEZhbWlseSA9IHRoaXMuZm9udEZhbWlseV8gPyB0aGlzLmZvbnRGYW1pbHlfIDogJ0FyaWFsLHNhbnMtc2VyaWYnO1xuICB2YXIgZm9udFdlaWdodCA9IHRoaXMuZm9udFdlaWdodF8gPyB0aGlzLmZvbnRXZWlnaHRfIDogJzQwMCc7XG5cbiAgc3R5bGUucHVzaCgnY3Vyc29yOnBvaW50ZXI7IHRvcDonICsgcG9zLnkgKyAncHg7IGxlZnQ6JyArXG4gICAgICBwb3MueCArICdweDsgY29sb3I6JyArIHR4dENvbG9yICsgJzsgcG9zaXRpb246YWJzb2x1dGU7IGZvbnQtc2l6ZTonICtcbiAgICAgIHR4dFNpemUgKyAncHg7IGZvbnQtZmFtaWx5OicgKyBmb250RmFtaWx5ICsgJzsgZm9udC13ZWlnaHQ6JyArIGZvbnRXZWlnaHQgKyAnOycpO1xuICByZXR1cm4gc3R5bGUuam9pbignJyk7XG59O1xuXG5cbi8vIEV4cG9ydCBTeW1ib2xzIGZvciBDbG9zdXJlXG4vLyBJZiB5b3UgYXJlIG5vdCBnb2luZyB0byBjb21waWxlIHdpdGggY2xvc3VyZSB0aGVuIHlvdSBjYW4gcmVtb3ZlIHRoZVxuLy8gY29kZSBiZWxvdy5cbmdsb2JhbFsnTWFya2VyQ2x1c3RlcmVyJ10gPSBNYXJrZXJDbHVzdGVyZXI7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydhZGRNYXJrZXInXSA9IE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuYWRkTWFya2VyO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnYWRkTWFya2VycyddID0gTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5hZGRNYXJrZXJzO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnY2xlYXJNYXJrZXJzJ10gPVxuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuY2xlYXJNYXJrZXJzO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnZml0TWFwVG9NYXJrZXJzJ10gPVxuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZml0TWFwVG9NYXJrZXJzO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnZ2V0Q2FsY3VsYXRvciddID1cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldENhbGN1bGF0b3I7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydnZXRHcmlkU2l6ZSddID1cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldEdyaWRTaXplO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnZ2V0RXh0ZW5kZWRCb3VuZHMnXSA9XG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRFeHRlbmRlZEJvdW5kcztcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ2dldE1hcCddID0gTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRNYXA7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydnZXRNYXJrZXJzJ10gPSBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldE1hcmtlcnM7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydnZXRNYXhab29tJ10gPSBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldE1heFpvb207XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydnZXRTdHlsZXMnXSA9IE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0U3R5bGVzO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnZ2V0VG90YWxDbHVzdGVycyddID1cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldFRvdGFsQ2x1c3RlcnM7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydnZXRUb3RhbE1hcmtlcnMnXSA9XG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRUb3RhbE1hcmtlcnM7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydyZWRyYXcnXSA9IE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUucmVkcmF3O1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsncmVtb3ZlTWFya2VyJ10gPVxuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUucmVtb3ZlTWFya2VyO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsncmVtb3ZlTWFya2VycyddID1cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnJlbW92ZU1hcmtlcnM7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydyZXNldFZpZXdwb3J0J10gPVxuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUucmVzZXRWaWV3cG9ydDtcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ3JlcGFpbnQnXSA9XG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5yZXBhaW50O1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnc2V0Q2FsY3VsYXRvciddID1cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnNldENhbGN1bGF0b3I7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydzZXRHcmlkU2l6ZSddID1cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnNldEdyaWRTaXplO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnc2V0TWF4Wm9vbSddID1cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnNldE1heFpvb207XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydvbkFkZCddID0gTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5vbkFkZDtcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ2RyYXcnXSA9IE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZHJhdztcblxuQ2x1c3Rlci5wcm90b3R5cGVbJ2dldENlbnRlciddID0gQ2x1c3Rlci5wcm90b3R5cGUuZ2V0Q2VudGVyO1xuQ2x1c3Rlci5wcm90b3R5cGVbJ2dldFNpemUnXSA9IENsdXN0ZXIucHJvdG90eXBlLmdldFNpemU7XG5DbHVzdGVyLnByb3RvdHlwZVsnZ2V0TWFya2VycyddID0gQ2x1c3Rlci5wcm90b3R5cGUuZ2V0TWFya2VycztcblxuQ2x1c3Rlckljb24ucHJvdG90eXBlWydvbkFkZCddID0gQ2x1c3Rlckljb24ucHJvdG90eXBlLm9uQWRkO1xuQ2x1c3Rlckljb24ucHJvdG90eXBlWydkcmF3J10gPSBDbHVzdGVySWNvbi5wcm90b3R5cGUuZHJhdztcbkNsdXN0ZXJJY29uLnByb3RvdHlwZVsnb25SZW1vdmUnXSA9IENsdXN0ZXJJY29uLnByb3RvdHlwZS5vblJlbW92ZTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IE1hcmtlckNsdXN0ZXJlcjtcbiIsIi8qKlxuICogalF1ZXJ5IEJhciBSYXRpbmcgUGx1Z2luIHYxLjIuMlxuICpcbiAqIGh0dHA6Ly9naXRodWIuY29tL2FudGVubmFpby9qcXVlcnktYmFyLXJhdGluZ1xuICpcbiAqIENvcHlyaWdodCAoYykgMjAxMi0yMDE2IEthemlrIFBpZXRydXN6ZXdza2lcbiAqXG4gKiBUaGlzIHBsdWdpbiBpcyBhdmFpbGFibGUgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuICogaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAqL1xuKGZ1bmN0aW9uIChmYWN0b3J5KSB7XG4gICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICAvLyBBTURcbiAgICAgICAgZGVmaW5lKFsnanF1ZXJ5J10sIGZhY3RvcnkpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICAgICAgLy8gTm9kZS9Db21tb25KU1xuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZSgnanF1ZXJ5JykpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGJyb3dzZXIgZ2xvYmFsc1xuICAgICAgICBmYWN0b3J5KGpRdWVyeSk7XG4gICAgfVxufShmdW5jdGlvbiAoJCkge1xuXG4gICAgdmFyIEJhclJhdGluZyA9IChmdW5jdGlvbigpIHtcblxuICAgICAgICBmdW5jdGlvbiBCYXJSYXRpbmcoKSB7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgICAgIC8vIHdyYXAgZWxlbWVudCBpbiBhIHdyYXBwZXIgZGl2XG4gICAgICAgICAgICB2YXIgd3JhcEVsZW1lbnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgY2xhc3NlcyA9IFsnYnItd3JhcHBlciddO1xuXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYub3B0aW9ucy50aGVtZSAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKCdici10aGVtZS0nICsgc2VsZi5vcHRpb25zLnRoZW1lKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLndyYXAoJCgnPGRpdiAvPicsIHtcbiAgICAgICAgICAgICAgICAgICAgJ2NsYXNzJzogY2xhc3Nlcy5qb2luKCcgJylcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyB1bndyYXAgZWxlbWVudFxuICAgICAgICAgICAgdmFyIHVud3JhcEVsZW1lbnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLnVud3JhcCgpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gZmluZCBvcHRpb24gYnkgdmFsdWVcbiAgICAgICAgICAgIHZhciBmaW5kT3B0aW9uID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoJC5pc051bWVyaWModmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gTWF0aC5mbG9vcih2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuICQoJ29wdGlvblt2YWx1ZT1cIicgKyB2YWx1ZSAgKyAnXCJdJywgc2VsZi4kZWxlbSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBnZXQgaW5pdGlhbCBvcHRpb25cbiAgICAgICAgICAgIHZhciBnZXRJbml0aWFsT3B0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIGluaXRpYWxSYXRpbmcgPSBzZWxmLm9wdGlvbnMuaW5pdGlhbFJhdGluZztcblxuICAgICAgICAgICAgICAgIGlmICghaW5pdGlhbFJhdGluZykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJCgnb3B0aW9uOnNlbGVjdGVkJywgc2VsZi4kZWxlbSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZpbmRPcHRpb24oaW5pdGlhbFJhdGluZyk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBnZXQgZW1wdHkgb3B0aW9uXG4gICAgICAgICAgICB2YXIgZ2V0RW1wdHlPcHRpb24gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgJGVtcHR5T3B0ID0gc2VsZi4kZWxlbS5maW5kKCdvcHRpb25bdmFsdWU9XCInICsgc2VsZi5vcHRpb25zLmVtcHR5VmFsdWUgKyAnXCJdJyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoISRlbXB0eU9wdC5sZW5ndGggJiYgc2VsZi5vcHRpb25zLmFsbG93RW1wdHkpIHtcbiAgICAgICAgICAgICAgICAgICAgJGVtcHR5T3B0ID0gJCgnPG9wdGlvbiAvPicsIHsgJ3ZhbHVlJzogc2VsZi5vcHRpb25zLmVtcHR5VmFsdWUgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRlbXB0eU9wdC5wcmVwZW5kVG8oc2VsZi4kZWxlbSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuICRlbXB0eU9wdDtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIGdldCBkYXRhXG4gICAgICAgICAgICB2YXIgZ2V0RGF0YSA9IGZ1bmN0aW9uKGtleSkge1xuICAgICAgICAgICAgICAgIHZhciBkYXRhID0gc2VsZi4kZWxlbS5kYXRhKCdiYXJyYXRpbmcnKTtcblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Yga2V5ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YVtrZXldO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gc2V0IGRhdGFcbiAgICAgICAgICAgIHZhciBzZXREYXRhID0gZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0uZGF0YSgnYmFycmF0aW5nJywgdmFsdWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0uZGF0YSgnYmFycmF0aW5nJylba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIHNhdmUgZGF0YSBvbiBlbGVtZW50XG4gICAgICAgICAgICB2YXIgc2F2ZURhdGFPbkVsZW1lbnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgJG9wdCA9IGdldEluaXRpYWxPcHRpb24oKTtcbiAgICAgICAgICAgICAgICB2YXIgJGVtcHR5T3B0ID0gZ2V0RW1wdHlPcHRpb24oKTtcblxuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9ICRvcHQudmFsKCk7XG4gICAgICAgICAgICAgICAgdmFyIHRleHQgPSAkb3B0LmRhdGEoJ2h0bWwnKSA/ICRvcHQuZGF0YSgnaHRtbCcpIDogJG9wdC50ZXh0KCk7XG5cbiAgICAgICAgICAgICAgICAvLyBpZiB0aGUgYWxsb3dFbXB0eSBvcHRpb24gaXMgbm90IHNldCBsZXQncyBjaGVjayBpZiBlbXB0eSBvcHRpb24gZXhpc3RzIGluIHRoZSBzZWxlY3QgZmllbGRcbiAgICAgICAgICAgICAgICB2YXIgYWxsb3dFbXB0eSA9IChzZWxmLm9wdGlvbnMuYWxsb3dFbXB0eSAhPT0gbnVsbCkgP1xuICAgICAgICAgICAgICAgICAgICBzZWxmLm9wdGlvbnMuYWxsb3dFbXB0eSA6XG4gICAgICAgICAgICAgICAgICAgICEhJGVtcHR5T3B0Lmxlbmd0aDtcblxuICAgICAgICAgICAgICAgIHZhciBlbXB0eVZhbHVlID0gKCRlbXB0eU9wdC5sZW5ndGgpID8gJGVtcHR5T3B0LnZhbCgpIDogbnVsbDtcbiAgICAgICAgICAgICAgICB2YXIgZW1wdHlUZXh0ID0gKCRlbXB0eU9wdC5sZW5ndGgpID8gJGVtcHR5T3B0LnRleHQoKSA6IG51bGw7XG5cbiAgICAgICAgICAgICAgICBzZXREYXRhKG51bGwsIHtcbiAgICAgICAgICAgICAgICAgICAgdXNlck9wdGlvbnM6IHNlbGYub3B0aW9ucyxcblxuICAgICAgICAgICAgICAgICAgICAvLyBpbml0aWFsIHJhdGluZyBiYXNlZCBvbiB0aGUgT1BUSU9OIHZhbHVlXG4gICAgICAgICAgICAgICAgICAgIHJhdGluZ1ZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgcmF0aW5nVGV4dDogdGV4dCxcblxuICAgICAgICAgICAgICAgICAgICAvLyByYXRpbmcgd2lsbCBiZSByZXN0b3JlZCBieSBjYWxsaW5nIGNsZWFyIG1ldGhvZFxuICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbFJhdGluZ1ZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxSYXRpbmdUZXh0OiB0ZXh0LFxuXG4gICAgICAgICAgICAgICAgICAgIC8vIGFsbG93IGVtcHR5IHJhdGluZ3M/XG4gICAgICAgICAgICAgICAgICAgIGFsbG93RW1wdHk6IGFsbG93RW1wdHksXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gcmF0aW5nIHZhbHVlIGFuZCB0ZXh0IG9mIHRoZSBlbXB0eSBPUFRJT05cbiAgICAgICAgICAgICAgICAgICAgZW1wdHlSYXRpbmdWYWx1ZTogZW1wdHlWYWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgZW1wdHlSYXRpbmdUZXh0OiBlbXB0eVRleHQsXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gcmVhZC1vbmx5IHN0YXRlXG4gICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiBzZWxmLm9wdGlvbnMucmVhZG9ubHksXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gZGlkIHRoZSB1c2VyIGFscmVhZHkgc2VsZWN0IGEgcmF0aW5nP1xuICAgICAgICAgICAgICAgICAgICByYXRpbmdNYWRlOiBmYWxzZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gcmVtb3ZlIGRhdGEgb24gZWxlbWVudFxuICAgICAgICAgICAgdmFyIHJlbW92ZURhdGFPbkVsZW1lbnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLnJlbW92ZURhdGEoJ2JhcnJhdGluZycpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gcmV0dXJuIGN1cnJlbnQgcmF0aW5nIHRleHRcbiAgICAgICAgICAgIHZhciByYXRpbmdUZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGdldERhdGEoJ3JhdGluZ1RleHQnKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIHJldHVybiBjdXJyZW50IHJhdGluZyB2YWx1ZVxuICAgICAgICAgICAgdmFyIHJhdGluZ1ZhbHVlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGdldERhdGEoJ3JhdGluZ1ZhbHVlJyk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBidWlsZCB3aWRnZXQgYW5kIHJldHVybiBqUXVlcnkgZWxlbWVudFxuICAgICAgICAgICAgdmFyIGJ1aWxkV2lkZ2V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyICR3ID0gJCgnPGRpdiAvPicsIHsgJ2NsYXNzJzogJ2JyLXdpZGdldCcgfSk7XG5cbiAgICAgICAgICAgICAgICAvLyBjcmVhdGUgQSBlbGVtZW50cyB0aGF0IHdpbGwgcmVwbGFjZSBPUFRJT05zXG4gICAgICAgICAgICAgICAgc2VsZi4kZWxlbS5maW5kKCdvcHRpb24nKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdmFsLCB0ZXh0LCBodG1sLCAkYTtcblxuICAgICAgICAgICAgICAgICAgICB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNyZWF0ZSByYXRpbmdzIC0gYnV0IG9ubHkgaWYgdmFsIGlzIG5vdCBkZWZpbmVkIGFzIGVtcHR5XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWwgIT09IGdldERhdGEoJ2VtcHR5UmF0aW5nVmFsdWUnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dCA9ICQodGhpcykudGV4dCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaHRtbCA9ICQodGhpcykuZGF0YSgnaHRtbCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGh0bWwpIHsgdGV4dCA9IGh0bWw7IH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgJGEgPSAkKCc8YSAvPicsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnaHJlZic6ICcjJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZGF0YS1yYXRpbmctdmFsdWUnOiB2YWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2RhdGEtcmF0aW5nLXRleHQnOiB0ZXh0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdodG1sJzogKHNlbGYub3B0aW9ucy5zaG93VmFsdWVzKSA/IHRleHQgOiAnJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICR3LmFwcGVuZCgkYSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgLy8gYXBwZW5kIC5ici1jdXJyZW50LXJhdGluZyBkaXYgdG8gdGhlIHdpZGdldFxuICAgICAgICAgICAgICAgIGlmIChzZWxmLm9wdGlvbnMuc2hvd1NlbGVjdGVkUmF0aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICR3LmFwcGVuZCgkKCc8ZGl2IC8+JywgeyAndGV4dCc6ICcnLCAnY2xhc3MnOiAnYnItY3VycmVudC1yYXRpbmcnIH0pKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBhZGRpdGlvbmFsIGNsYXNzZXMgZm9yIHRoZSB3aWRnZXRcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5vcHRpb25zLnJldmVyc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgJHcuYWRkQ2xhc3MoJ2JyLXJldmVyc2UnKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5vcHRpb25zLnJlYWRvbmx5KSB7XG4gICAgICAgICAgICAgICAgICAgICR3LmFkZENsYXNzKCdici1yZWFkb25seScpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiAkdztcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIHJldHVybiBhIGpRdWVyeSBmdW5jdGlvbiBuYW1lIGRlcGVuZGluZyBvbiB0aGUgJ3JldmVyc2UnIHNldHRpbmdcbiAgICAgICAgICAgIHZhciBuZXh0QWxsb3JQcmV2aW91c0FsbCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmIChnZXREYXRhKCd1c2VyT3B0aW9ucycpLnJldmVyc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICduZXh0QWxsJztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3ByZXZBbGwnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIHNldCB0aGUgdmFsdWUgb2YgdGhlIHNlbGVjdCBmaWVsZFxuICAgICAgICAgICAgdmFyIHNldFNlbGVjdEZpZWxkVmFsdWUgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgIC8vIGNoYW5nZSBzZWxlY3RlZCBvcHRpb25cbiAgICAgICAgICAgICAgICBmaW5kT3B0aW9uKHZhbHVlKS5wcm9wKCdzZWxlY3RlZCcsIHRydWUpO1xuXG4gICAgICAgICAgICAgICAgc2VsZi4kZWxlbS5jaGFuZ2UoKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIHJlc2V0IHNlbGVjdCBmaWVsZFxuICAgICAgICAgICAgdmFyIHJlc2V0U2VsZWN0RmllbGQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkKCdvcHRpb24nLCBzZWxmLiRlbGVtKS5wcm9wKCdzZWxlY3RlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kZWZhdWx0U2VsZWN0ZWQ7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLmNoYW5nZSgpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gZGlzcGxheSB0aGUgY3VycmVudGx5IHNlbGVjdGVkIHJhdGluZ1xuICAgICAgICAgICAgdmFyIHNob3dTZWxlY3RlZFJhdGluZyA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgICAgICAgICAgICAgICAvLyB0ZXh0IHVuZGVmaW5lZD9cbiAgICAgICAgICAgICAgICB0ZXh0ID0gdGV4dCA/IHRleHQgOiByYXRpbmdUZXh0KCk7XG5cbiAgICAgICAgICAgICAgICAvLyBzcGVjaWFsIGNhc2Ugd2hlbiB0aGUgc2VsZWN0ZWQgcmF0aW5nIGlzIGRlZmluZWQgYXMgZW1wdHlcbiAgICAgICAgICAgICAgICBpZiAodGV4dCA9PSBnZXREYXRhKCdlbXB0eVJhdGluZ1RleHQnKSkge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0ID0gJyc7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gdXBkYXRlIC5ici1jdXJyZW50LXJhdGluZyBkaXZcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5vcHRpb25zLnNob3dTZWxlY3RlZFJhdGluZykge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLnBhcmVudCgpLmZpbmQoJy5ici1jdXJyZW50LXJhdGluZycpLnRleHQodGV4dCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gcmV0dXJuIHJvdW5kZWQgZnJhY3Rpb24gb2YgYSB2YWx1ZSAoMTQuNCAtPiA0MCwgMC45OSAtPiA5MClcbiAgICAgICAgICAgIHZhciBmcmFjdGlvbiA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGgucm91bmQoKChNYXRoLmZsb29yKHZhbHVlICogMTApIC8gMTApICUgMSkgKiAxMDApO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gcmVtb3ZlIGFsbCBjbGFzc2VzIGZyb20gZWxlbWVudHNcbiAgICAgICAgICAgIHZhciByZXNldFN0eWxlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGFsbCBjbGFzc2VzIHN0YXJ0aW5nIHdpdGggYnItKlxuICAgICAgICAgICAgICAgIHNlbGYuJHdpZGdldC5maW5kKCdhJykucmVtb3ZlQ2xhc3MoZnVuY3Rpb24oaW5kZXgsIGNsYXNzZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChjbGFzc2VzLm1hdGNoKC8oXnxcXHMpYnItXFxTKy9nKSB8fCBbXSkuam9pbignICcpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gYXBwbHkgc3R5bGUgYnkgc2V0dGluZyBjbGFzc2VzIG9uIGVsZW1lbnRzXG4gICAgICAgICAgICB2YXIgYXBwbHlTdHlsZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciAkYSA9IHNlbGYuJHdpZGdldC5maW5kKCdhW2RhdGEtcmF0aW5nLXZhbHVlPVwiJyArIHJhdGluZ1ZhbHVlKCkgKyAnXCJdJyk7XG4gICAgICAgICAgICAgICAgdmFyIGluaXRpYWxSYXRpbmcgPSBnZXREYXRhKCd1c2VyT3B0aW9ucycpLmluaXRpYWxSYXRpbmc7XG4gICAgICAgICAgICAgICAgdmFyIGJhc2VWYWx1ZSA9ICQuaXNOdW1lcmljKHJhdGluZ1ZhbHVlKCkpID8gcmF0aW5nVmFsdWUoKSA6IDA7XG4gICAgICAgICAgICAgICAgdmFyIGYgPSBmcmFjdGlvbihpbml0aWFsUmF0aW5nKTtcbiAgICAgICAgICAgICAgICB2YXIgJGFsbCwgJGZyYWN0aW9uYWw7XG5cbiAgICAgICAgICAgICAgICByZXNldFN0eWxlKCk7XG5cbiAgICAgICAgICAgICAgICAvLyBhZGQgY2xhc3Nlc1xuICAgICAgICAgICAgICAgICRhLmFkZENsYXNzKCdici1zZWxlY3RlZCBici1jdXJyZW50JylbbmV4dEFsbG9yUHJldmlvdXNBbGwoKV0oKVxuICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2JyLXNlbGVjdGVkJyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWdldERhdGEoJ3JhdGluZ01hZGUnKSAmJiAkLmlzTnVtZXJpYyhpbml0aWFsUmF0aW5nKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoKGluaXRpYWxSYXRpbmcgPD0gYmFzZVZhbHVlKSB8fCAhZikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgJGFsbCA9IHNlbGYuJHdpZGdldC5maW5kKCdhJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgJGZyYWN0aW9uYWwgPSAoJGEubGVuZ3RoKSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAkYVsoZ2V0RGF0YSgndXNlck9wdGlvbnMnKS5yZXZlcnNlKSA/ICdwcmV2JyA6ICduZXh0J10oKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAkYWxsWyhnZXREYXRhKCd1c2VyT3B0aW9ucycpLnJldmVyc2UpID8gJ2xhc3QnIDogJ2ZpcnN0J10oKTtcblxuICAgICAgICAgICAgICAgICAgICAkZnJhY3Rpb25hbC5hZGRDbGFzcygnYnItZnJhY3Rpb25hbCcpO1xuICAgICAgICAgICAgICAgICAgICAkZnJhY3Rpb25hbC5hZGRDbGFzcygnYnItZnJhY3Rpb25hbC0nICsgZik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gY2hlY2sgaWYgdGhlIGVsZW1lbnQgaXMgZGVzZWxlY3RhYmxlP1xuICAgICAgICAgICAgdmFyIGlzRGVzZWxlY3RhYmxlID0gZnVuY3Rpb24oJGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWdldERhdGEoJ2FsbG93RW1wdHknKSB8fCAhZ2V0RGF0YSgndXNlck9wdGlvbnMnKS5kZXNlbGVjdGFibGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiAocmF0aW5nVmFsdWUoKSA9PSAkZWxlbWVudC5hdHRyKCdkYXRhLXJhdGluZy12YWx1ZScpKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIGhhbmRsZSBjbGljayBldmVudHNcbiAgICAgICAgICAgIHZhciBhdHRhY2hDbGlja0hhbmRsZXIgPSBmdW5jdGlvbigkZWxlbWVudHMpIHtcbiAgICAgICAgICAgICAgICAkZWxlbWVudHMub24oJ2NsaWNrLmJhcnJhdGluZycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciAkYSA9ICQodGhpcyksXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zID0gZ2V0RGF0YSgndXNlck9wdGlvbnMnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDtcblxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gJGEuYXR0cignZGF0YS1yYXRpbmctdmFsdWUnKTtcbiAgICAgICAgICAgICAgICAgICAgdGV4dCA9ICRhLmF0dHIoJ2RhdGEtcmF0aW5nLXRleHQnKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBpcyBjdXJyZW50IGFuZCBkZXNlbGVjdGFibGU/XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0Rlc2VsZWN0YWJsZSgkYSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gZ2V0RGF0YSgnZW1wdHlSYXRpbmdWYWx1ZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dCA9IGdldERhdGEoJ2VtcHR5UmF0aW5nVGV4dCcpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gcmVtZW1iZXIgc2VsZWN0ZWQgcmF0aW5nXG4gICAgICAgICAgICAgICAgICAgIHNldERhdGEoJ3JhdGluZ1ZhbHVlJywgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBzZXREYXRhKCdyYXRpbmdUZXh0JywgdGV4dCk7XG4gICAgICAgICAgICAgICAgICAgIHNldERhdGEoJ3JhdGluZ01hZGUnLCB0cnVlKTtcblxuICAgICAgICAgICAgICAgICAgICBzZXRTZWxlY3RGaWVsZFZhbHVlKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgc2hvd1NlbGVjdGVkUmF0aW5nKHRleHQpO1xuXG4gICAgICAgICAgICAgICAgICAgIGFwcGx5U3R5bGUoKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBvblNlbGVjdCBjYWxsYmFja1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLm9uU2VsZWN0LmNhbGwoXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmF0aW5nVmFsdWUoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhdGluZ1RleHQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50XG4gICAgICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gaGFuZGxlIG1vdXNlZW50ZXIgZXZlbnRzXG4gICAgICAgICAgICB2YXIgYXR0YWNoTW91c2VFbnRlckhhbmRsZXIgPSBmdW5jdGlvbigkZWxlbWVudHMpIHtcbiAgICAgICAgICAgICAgICAkZWxlbWVudHMub24oJ21vdXNlZW50ZXIuYmFycmF0aW5nJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciAkYSA9ICQodGhpcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmVzZXRTdHlsZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICRhLmFkZENsYXNzKCdici1hY3RpdmUnKVtuZXh0QWxsb3JQcmV2aW91c0FsbCgpXSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2JyLWFjdGl2ZScpO1xuXG4gICAgICAgICAgICAgICAgICAgIHNob3dTZWxlY3RlZFJhdGluZygkYS5hdHRyKCdkYXRhLXJhdGluZy10ZXh0JykpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gaGFuZGxlIG1vdXNlbGVhdmUgZXZlbnRzXG4gICAgICAgICAgICB2YXIgYXR0YWNoTW91c2VMZWF2ZUhhbmRsZXIgPSBmdW5jdGlvbigkZWxlbWVudHMpIHtcbiAgICAgICAgICAgICAgICBzZWxmLiR3aWRnZXQub24oJ21vdXNlbGVhdmUuYmFycmF0aW5nIGJsdXIuYmFycmF0aW5nJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHNob3dTZWxlY3RlZFJhdGluZygpO1xuICAgICAgICAgICAgICAgICAgICBhcHBseVN0eWxlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBzb21ld2hhdCBwcmltaXRpdmUgd2F5IHRvIHJlbW92ZSAzMDBtcyBjbGljayBkZWxheSBvbiB0b3VjaCBkZXZpY2VzXG4gICAgICAgICAgICAvLyBmb3IgYSBtb3JlIGFkdmFuY2VkIHNvbHV0aW9uIGNvbnNpZGVyIHNldHRpbmcgYGZhc3RDbGlja3NgIG9wdGlvbiB0byBmYWxzZVxuICAgICAgICAgICAgLy8gYW5kIHVzaW5nIGEgbGlicmFyeSBzdWNoIGFzIGZhc3RjbGljayAoaHR0cHM6Ly9naXRodWIuY29tL2Z0bGFicy9mYXN0Y2xpY2spXG4gICAgICAgICAgICB2YXIgZmFzdENsaWNrcyA9IGZ1bmN0aW9uKCRlbGVtZW50cykge1xuICAgICAgICAgICAgICAgICRlbGVtZW50cy5vbigndG91Y2hzdGFydC5iYXJyYXRpbmcnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmNsaWNrKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBkaXNhYmxlIGNsaWNrc1xuICAgICAgICAgICAgdmFyIGRpc2FibGVDbGlja3MgPSBmdW5jdGlvbigkZWxlbWVudHMpIHtcbiAgICAgICAgICAgICAgICAkZWxlbWVudHMub24oJ2NsaWNrLmJhcnJhdGluZycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB2YXIgYXR0YWNoSGFuZGxlcnMgPSBmdW5jdGlvbigkZWxlbWVudHMpIHtcbiAgICAgICAgICAgICAgICAvLyBhdHRhY2ggY2xpY2sgZXZlbnQgaGFuZGxlclxuICAgICAgICAgICAgICAgIGF0dGFjaENsaWNrSGFuZGxlcigkZWxlbWVudHMpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYub3B0aW9ucy5ob3ZlclN0YXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGF0dGFjaCBtb3VzZWVudGVyIGV2ZW50IGhhbmRsZXJcbiAgICAgICAgICAgICAgICAgICAgYXR0YWNoTW91c2VFbnRlckhhbmRsZXIoJGVsZW1lbnRzKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBhdHRhY2ggbW91c2VsZWF2ZSBldmVudCBoYW5kbGVyXG4gICAgICAgICAgICAgICAgICAgIGF0dGFjaE1vdXNlTGVhdmVIYW5kbGVyKCRlbGVtZW50cyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdmFyIGRldGFjaEhhbmRsZXJzID0gZnVuY3Rpb24oJGVsZW1lbnRzKSB7XG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGV2ZW50IGhhbmRsZXJzIGluIHRoZSBcIi5iYXJyYXRpbmdcIiBuYW1lc3BhY2VcbiAgICAgICAgICAgICAgICAkZWxlbWVudHMub2ZmKCcuYmFycmF0aW5nJyk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB2YXIgc2V0dXBIYW5kbGVycyA9IGZ1bmN0aW9uKHJlYWRvbmx5KSB7XG4gICAgICAgICAgICAgICAgdmFyICRlbGVtZW50cyA9IHNlbGYuJHdpZGdldC5maW5kKCdhJyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZmFzdENsaWNrcykge1xuICAgICAgICAgICAgICAgICAgICBmYXN0Q2xpY2tzKCRlbGVtZW50cyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHJlYWRvbmx5KSB7XG4gICAgICAgICAgICAgICAgICAgIGRldGFjaEhhbmRsZXJzKCRlbGVtZW50cyk7XG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVDbGlja3MoJGVsZW1lbnRzKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhdHRhY2hIYW5kbGVycygkZWxlbWVudHMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMuc2hvdyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIC8vIHJ1biBvbmx5IG9uY2VcbiAgICAgICAgICAgICAgICBpZiAoZ2V0RGF0YSgpKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICAvLyB3cmFwIGVsZW1lbnRcbiAgICAgICAgICAgICAgICB3cmFwRWxlbWVudCgpO1xuXG4gICAgICAgICAgICAgICAgLy8gc2F2ZSBkYXRhXG4gICAgICAgICAgICAgICAgc2F2ZURhdGFPbkVsZW1lbnQoKTtcblxuICAgICAgICAgICAgICAgIC8vIGJ1aWxkICYgYXBwZW5kIHdpZGdldCB0byB0aGUgRE9NXG4gICAgICAgICAgICAgICAgc2VsZi4kd2lkZ2V0ID0gYnVpbGRXaWRnZXQoKTtcbiAgICAgICAgICAgICAgICBzZWxmLiR3aWRnZXQuaW5zZXJ0QWZ0ZXIoc2VsZi4kZWxlbSk7XG5cbiAgICAgICAgICAgICAgICBhcHBseVN0eWxlKCk7XG5cbiAgICAgICAgICAgICAgICBzaG93U2VsZWN0ZWRSYXRpbmcoKTtcblxuICAgICAgICAgICAgICAgIHNldHVwSGFuZGxlcnMoc2VsZi5vcHRpb25zLnJlYWRvbmx5KTtcblxuICAgICAgICAgICAgICAgIC8vIGhpZGUgdGhlIHNlbGVjdCBmaWVsZFxuICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0uaGlkZSgpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy5yZWFkb25seSA9IGZ1bmN0aW9uKHN0YXRlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzdGF0ZSAhPT0gJ2Jvb2xlYW4nIHx8IGdldERhdGEoJ3JlYWRPbmx5JykgPT0gc3RhdGUpIHJldHVybjtcblxuICAgICAgICAgICAgICAgIHNldHVwSGFuZGxlcnMoc3RhdGUpO1xuICAgICAgICAgICAgICAgIHNldERhdGEoJ3JlYWRPbmx5Jywgc3RhdGUpO1xuICAgICAgICAgICAgICAgIHNlbGYuJHdpZGdldC50b2dnbGVDbGFzcygnYnItcmVhZG9ubHknKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMuc2V0ID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgb3B0aW9ucyA9IGdldERhdGEoJ3VzZXJPcHRpb25zJyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoc2VsZi4kZWxlbS5maW5kKCdvcHRpb25bdmFsdWU9XCInICsgdmFsdWUgKyAnXCJdJykubGVuZ3RoID09PSAwKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICAvLyBzZXQgZGF0YVxuICAgICAgICAgICAgICAgIHNldERhdGEoJ3JhdGluZ1ZhbHVlJywgdmFsdWUpO1xuICAgICAgICAgICAgICAgIHNldERhdGEoJ3JhdGluZ1RleHQnLCBzZWxmLiRlbGVtLmZpbmQoJ29wdGlvblt2YWx1ZT1cIicgKyB2YWx1ZSArICdcIl0nKS50ZXh0KCkpO1xuICAgICAgICAgICAgICAgIHNldERhdGEoJ3JhdGluZ01hZGUnLCB0cnVlKTtcblxuICAgICAgICAgICAgICAgIHNldFNlbGVjdEZpZWxkVmFsdWUocmF0aW5nVmFsdWUoKSk7XG4gICAgICAgICAgICAgICAgc2hvd1NlbGVjdGVkUmF0aW5nKHJhdGluZ1RleHQoKSk7XG5cbiAgICAgICAgICAgICAgICBhcHBseVN0eWxlKCk7XG5cbiAgICAgICAgICAgICAgICAvLyBvblNlbGVjdCBjYWxsYmFja1xuICAgICAgICAgICAgICAgIGlmICghb3B0aW9ucy5zaWxlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5vblNlbGVjdC5jYWxsKFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhdGluZ1ZhbHVlKCksXG4gICAgICAgICAgICAgICAgICAgICAgICByYXRpbmdUZXh0KClcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLmNsZWFyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSBnZXREYXRhKCd1c2VyT3B0aW9ucycpO1xuXG4gICAgICAgICAgICAgICAgLy8gcmVzdG9yZSBvcmlnaW5hbCBkYXRhXG4gICAgICAgICAgICAgICAgc2V0RGF0YSgncmF0aW5nVmFsdWUnLCBnZXREYXRhKCdvcmlnaW5hbFJhdGluZ1ZhbHVlJykpO1xuICAgICAgICAgICAgICAgIHNldERhdGEoJ3JhdGluZ1RleHQnLCBnZXREYXRhKCdvcmlnaW5hbFJhdGluZ1RleHQnKSk7XG4gICAgICAgICAgICAgICAgc2V0RGF0YSgncmF0aW5nTWFkZScsIGZhbHNlKTtcblxuICAgICAgICAgICAgICAgIHJlc2V0U2VsZWN0RmllbGQoKTtcbiAgICAgICAgICAgICAgICBzaG93U2VsZWN0ZWRSYXRpbmcocmF0aW5nVGV4dCgpKTtcblxuICAgICAgICAgICAgICAgIGFwcGx5U3R5bGUoKTtcblxuICAgICAgICAgICAgICAgIC8vIG9uQ2xlYXIgY2FsbGJhY2tcbiAgICAgICAgICAgICAgICBvcHRpb25zLm9uQ2xlYXIuY2FsbChcbiAgICAgICAgICAgICAgICAgICAgdGhpcyxcbiAgICAgICAgICAgICAgICAgICAgcmF0aW5nVmFsdWUoKSxcbiAgICAgICAgICAgICAgICAgICAgcmF0aW5nVGV4dCgpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMuZGVzdHJveSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IHJhdGluZ1ZhbHVlKCk7XG4gICAgICAgICAgICAgICAgdmFyIHRleHQgPSByYXRpbmdUZXh0KCk7XG4gICAgICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSBnZXREYXRhKCd1c2VyT3B0aW9ucycpO1xuXG4gICAgICAgICAgICAgICAgLy8gZGV0YWNoIGhhbmRsZXJzXG4gICAgICAgICAgICAgICAgZGV0YWNoSGFuZGxlcnMoc2VsZi4kd2lkZ2V0LmZpbmQoJ2EnKSk7XG5cbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgd2lkZ2V0XG4gICAgICAgICAgICAgICAgc2VsZi4kd2lkZ2V0LnJlbW92ZSgpO1xuXG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGRhdGFcbiAgICAgICAgICAgICAgICByZW1vdmVEYXRhT25FbGVtZW50KCk7XG5cbiAgICAgICAgICAgICAgICAvLyB1bndyYXAgdGhlIGVsZW1lbnRcbiAgICAgICAgICAgICAgICB1bndyYXBFbGVtZW50KCk7XG5cbiAgICAgICAgICAgICAgICAvLyBzaG93IHRoZSBlbGVtZW50XG4gICAgICAgICAgICAgICAgc2VsZi4kZWxlbS5zaG93KCk7XG5cbiAgICAgICAgICAgICAgICAvLyBvbkRlc3Ryb3kgY2FsbGJhY2tcbiAgICAgICAgICAgICAgICBvcHRpb25zLm9uRGVzdHJveS5jYWxsKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgdGV4dFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgQmFyUmF0aW5nLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKG9wdGlvbnMsIGVsZW0pIHtcbiAgICAgICAgICAgIHRoaXMuJGVsZW0gPSAkKGVsZW0pO1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zID0gJC5leHRlbmQoe30sICQuZm4uYmFycmF0aW5nLmRlZmF1bHRzLCBvcHRpb25zKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucztcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gQmFyUmF0aW5nO1xuICAgIH0pKCk7XG5cbiAgICAkLmZuLmJhcnJhdGluZyA9IGZ1bmN0aW9uIChtZXRob2QsIG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcGx1Z2luID0gbmV3IEJhclJhdGluZygpO1xuXG4gICAgICAgICAgICAvLyBwbHVnaW4gd29ya3Mgd2l0aCBzZWxlY3QgZmllbGRzXG4gICAgICAgICAgICBpZiAoISQodGhpcykuaXMoJ3NlbGVjdCcpKSB7XG4gICAgICAgICAgICAgICAgJC5lcnJvcignU29ycnksIHRoaXMgcGx1Z2luIG9ubHkgd29ya3Mgd2l0aCBzZWxlY3QgZmllbGRzLicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBtZXRob2Qgc3VwcGxpZWRcbiAgICAgICAgICAgIGlmIChwbHVnaW4uaGFzT3duUHJvcGVydHkobWV0aG9kKSkge1xuICAgICAgICAgICAgICAgIHBsdWdpbi5pbml0KG9wdGlvbnMsIHRoaXMpO1xuICAgICAgICAgICAgICAgIGlmIChtZXRob2QgPT09ICdzaG93Jykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGx1Z2luLnNob3cob3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gcGx1Z2luIGV4aXN0cz9cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBsdWdpbi4kZWxlbS5kYXRhKCdiYXJyYXRpbmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGx1Z2luLiR3aWRnZXQgPSAkKHRoaXMpLm5leHQoJy5ici13aWRnZXQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwbHVnaW5bbWV0aG9kXShvcHRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gbm8gbWV0aG9kIHN1cHBsaWVkIG9yIG9ubHkgb3B0aW9ucyBzdXBwbGllZFxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgbWV0aG9kID09PSAnb2JqZWN0JyB8fCAhbWV0aG9kKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucyA9IG1ldGhvZDtcbiAgICAgICAgICAgICAgICBwbHVnaW4uaW5pdChvcHRpb25zLCB0aGlzKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGx1Z2luLnNob3coKTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkLmVycm9yKCdNZXRob2QgJyArIG1ldGhvZCArICcgZG9lcyBub3QgZXhpc3Qgb24galF1ZXJ5LmJhcnJhdGluZycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgJC5mbi5iYXJyYXRpbmcuZGVmYXVsdHMgPSB7XG4gICAgICAgIHRoZW1lOicnLFxuICAgICAgICBpbml0aWFsUmF0aW5nOm51bGwsIC8vIGluaXRpYWwgcmF0aW5nXG4gICAgICAgIGFsbG93RW1wdHk6bnVsbCwgLy8gYWxsb3cgZW1wdHkgcmF0aW5ncz9cbiAgICAgICAgZW1wdHlWYWx1ZTonJywgLy8gdGhpcyBpcyB0aGUgZXhwZWN0ZWQgdmFsdWUgb2YgdGhlIGVtcHR5IHJhdGluZ1xuICAgICAgICBzaG93VmFsdWVzOmZhbHNlLCAvLyBkaXNwbGF5IHJhdGluZyB2YWx1ZXMgb24gdGhlIGJhcnM/XG4gICAgICAgIHNob3dTZWxlY3RlZFJhdGluZzp0cnVlLCAvLyBhcHBlbmQgYSBkaXYgd2l0aCBhIHJhdGluZyB0byB0aGUgd2lkZ2V0P1xuICAgICAgICBkZXNlbGVjdGFibGU6dHJ1ZSwgLy8gYWxsb3cgdG8gZGVzZWxlY3QgcmF0aW5ncz9cbiAgICAgICAgcmV2ZXJzZTpmYWxzZSwgLy8gcmV2ZXJzZSB0aGUgcmF0aW5nP1xuICAgICAgICByZWFkb25seTpmYWxzZSwgLy8gbWFrZSB0aGUgcmF0aW5nIHJlYWR5LW9ubHk/XG4gICAgICAgIGZhc3RDbGlja3M6dHJ1ZSwgLy8gcmVtb3ZlIDMwMG1zIGNsaWNrIGRlbGF5IG9uIHRvdWNoIGRldmljZXM/XG4gICAgICAgIGhvdmVyU3RhdGU6dHJ1ZSwgLy8gY2hhbmdlIHN0YXRlIG9uIGhvdmVyP1xuICAgICAgICBzaWxlbnQ6ZmFsc2UsIC8vIHN1cHJlc3MgY2FsbGJhY2tzIHdoZW4gY29udHJvbGxpbmcgcmF0aW5ncyBwcm9ncmFtYXRpY2FsbHlcbiAgICAgICAgb25TZWxlY3Q6ZnVuY3Rpb24gKHZhbHVlLCB0ZXh0LCBldmVudCkge1xuICAgICAgICB9LCAvLyBjYWxsYmFjayBmaXJlZCB3aGVuIGEgcmF0aW5nIGlzIHNlbGVjdGVkXG4gICAgICAgIG9uQ2xlYXI6ZnVuY3Rpb24gKHZhbHVlLCB0ZXh0KSB7XG4gICAgICAgIH0sIC8vIGNhbGxiYWNrIGZpcmVkIHdoZW4gYSByYXRpbmcgaXMgY2xlYXJlZFxuICAgICAgICBvbkRlc3Ryb3k6ZnVuY3Rpb24gKHZhbHVlLCB0ZXh0KSB7XG4gICAgICAgIH0gLy8gY2FsbGJhY2sgZmlyZWQgd2hlbiBhIHdpZGdldCBpcyBkZXN0cm95ZWRcbiAgICB9O1xuXG4gICAgJC5mbi5iYXJyYXRpbmcuQmFyUmF0aW5nID0gQmFyUmF0aW5nO1xuXG59KSk7XG4iLCIvKipcbiAqIEBwYWNrYWdlICAgIEtub3cgUmVzZXJ2YXRpb25zXG4gKiBAc3VicGFja2FnZSBTaXRlIEpTXG4gKiBAY29weXJpZ2h0ICAyMDIwIEhpZ2hsYW5kIFZpc2lvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIEBsaWNlbnNlICAgIFNlZSB0aGUgZmlsZSBcIkxJQ0VOU0UudHh0XCIgZm9yIHRoZSBmdWxsIGxpY2Vuc2UgZ292ZXJuaW5nIHRoaXMgY29kZS5cbiAqIEBhdXRob3IgICAgIEhhemVsIFdpbHNvbiA8aGF6ZWxAaGlnaGxhbmR2aXNpb24uY29tPlxuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG5sZXQgc2VhcmNoRGF0YSA9IFtdO1xubGV0IHNlYXJjaERvbmUgPSBmYWxzZTtcbmxldCBjYWxlbmRhckxvYWRlZCA9IGZhbHNlO1xubGV0IHNhdmVkd2lkdGggPSBmYWxzZTtcbmxldCBsYXJnZTtcbmxldCByZXNpemVkID0gZmFsc2U7XG5sZXQgc2Nsb2FkZWQgPSBmYWxzZTtcblxuKGZ1bmN0aW9uICgkKSB7XG4gICAgJChmdW5jdGlvbiAoKSB7XG4gICAgICAgIEZvdW5kYXRpb24uYWRkVG9KcXVlcnkoKTtcbiAgICAgICAgJChkb2N1bWVudCkuZm91bmRhdGlvbigpO1xuXG4gICAgICAgIGNoZWNrU2NyZWVuV2lkdGgoKTtcbiAgICAgICAgJCh3aW5kb3cpLm9uKFwicmVzaXplXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNoZWNrU2NyZWVuV2lkdGgoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgYmFycyA9ICQoJy5rci1yYXRpbmcnKTtcbiAgICAgICAgaWYgKGJhcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICBiYXJzLmJhcnJhdGluZygnc2hvdycsIHtcbiAgICAgICAgICAgICAgICBzaG93VmFsdWVzOiB0cnVlLFxuICAgICAgICAgICAgICAgIHNob3dTZWxlY3RlZFJhdGluZzogZmFsc2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgJGN0cmlnZ2VyID0gJCgnI2tyLXBhZ2UtZ2VyaWF0cmljLWNhbGVuZGFyLXRyaWdnZXInKTtcbiAgICAgICAgaWYgKCRjdHJpZ2dlci5sZW5ndGggJiYgIWNhbGVuZGFyTG9hZGVkKSB7XG4gICAgICAgICAgICBsb2FkQ2FsZW5kYXIoJGN0cmlnZ2VyLmRhdGEoJ3BpZCcpLCAkY3RyaWdnZXIuZGF0YSgndGFyZ2V0JykpO1xuICAgICAgICAgICAgY2FsZW5kYXJMb2FkZWQgPSB0cnVlO1xuICAgICAgICAgICAgY29uc3Qgc3RpY2t5ID0gJCgnLnN0aWNreScpO1xuICAgICAgICAgICAgaWYgKHN0aWNreS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBzdGlja3kuZm91bmRhdGlvbignX2NhbGMnLCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdzdWJtaXQnLCAnLmFqYXhmb3JtJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGNvbnN0ICRmb3JtID0gJCh0aGlzKTtcbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICAgICAgICAgIHVybDogJGZvcm0uYXR0cignYWN0aW9uJyksXG4gICAgICAgICAgICAgICAgZGF0YTogJGZvcm0uc2VyaWFsaXplKCksXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5kYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybVJlc3BvbnNlKCRmb3JtLmF0dHIoJ2lkJyksIHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnLyc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcua3ItYWpheC1tb2RhbC1lcnJvci1tZXNzYWdlJykuaHRtbChyZXN1bHQubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCAkbW9kYWwgPSBuZXcgRm91bmRhdGlvbi5SZXZlYWwoJCgnI0tyQWpheE1vZGFsRXJyb3InKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkbW9kYWwub3BlbigpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAkKCcua3ItYWpheC1tb2RhbC1lcnJvci1tZXNzYWdlJykuaHRtbCgnU29ycnkgYW4gZXJyb3IgaGFzIG9jY3VycmVkLCBwbGVhc2UgdHJ5IGFnYWluJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0ICRtb2RhbCA9IG5ldyBGb3VuZGF0aW9uLlJldmVhbCgkKCcjS3JBamF4TW9kYWxFcnJvcicpKTtcbiAgICAgICAgICAgICAgICAgICAgJG1vZGFsLm9wZW4oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSkub24oJ3Nob3cuemYuZHJvcGRvd24nLCAnLm5vc2Nyb2xsJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJCgnYm9keScpLmFkZENsYXNzKFwic3RhdGljcGFuZVwiKTtcbiAgICAgICAgICAgICQodGhpcykuY3NzKCdvcGFjaXR5JywgJzEnKTtcbiAgICAgICAgfSkub24oJ2hpZGUuemYuZHJvcGRvd24nLCAnLm5vc2Nyb2xsJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKFwic3RhdGljcGFuZVwiKTtcbiAgICAgICAgICAgICQodGhpcykuY3NzKCdvcGFjaXR5JywgJzAnKTtcbiAgICAgICAgfSkub24oJ2hpZGUuemYuZHJvcGRvd24nLCAnI2tyLXF1b3RlLWZvcm0nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKCcjZ3Vlc3RzJykudHJpZ2dlcignY2hhbmdlJyk7XG4gICAgICAgIH0pLm9uKCdvcGVuLnpmLnJldmVhbCcsICcua3ItYWpheC1tb2RhbFtkYXRhLXJldmVhbF0nLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgY29uc3QgbW9kYWxpZCA9IFwiI1wiICsgJCh0aGlzKS5hdHRyKCdpZCcpO1xuICAgICAgICAgICAgaWYgKCEkLnRyaW0oJChtb2RhbGlkKS5odG1sKCkpLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGFqYXh1cmwgPSAkKHRoaXMpLmRhdGEoJ2FqYXh1cmwnKTtcbiAgICAgICAgICAgICAgICBpZiAoYWpheHVybCkge1xuICAgICAgICAgICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBhamF4dXJsLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGNvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKG1vZGFsaWQpLmh0bWwoY29udGVudCkudHJpZ2dlcigncmVzaXplbWUuemYucmV2ZWFsJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChtb2RhbGlkKS5mb3VuZGF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkub24oJ29wZW4uemYucmV2ZWFsJywgJyNrci1nYXRld2F5LW1vZGFsW2RhdGEtcmV2ZWFsXScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBpZiAoIXNjbG9hZGVkKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICQuZ2V0U2NyaXB0KCdtZWRpYS9jb21fa25vd3Jlcy9qcy9zdHJpcGVjaGVja291dC5taW4uanMnKTtcbiAgICAgICAgICAgICAgICBzY2xvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGluaXRpYWxpemVTdHJpcGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkub24oJ29wZW4uemYucmV2ZWFsJywgJyNrci1wcm9wZXJ0eS1zbGlkZXNob3ctcmV2ZWFsW2RhdGEtcmV2ZWFsXScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAvL2UucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIC8vICQoJyNrci1wcm9wZXJ0eS1zbGlkZXNob3cnKS5zbGljaygnc2V0UG9zaXRpb24nKTtcbiAgICAgICAgICAgIC8vICQoJyNrci1wcm9wZXJ0eS10aHVtYnMnKS5zbGljaygnc2V0UG9zaXRpb24nKTtcbiAgICAgICAgICAgIC8vICQoJyNrci1wcm9wZXJ0eS1zbGlkZXNob3cnKS5zbGljaygncmVmcmVzaCcpO1xuICAgICAgICAgICAgLy8gJCgnI2tyLXByb3BlcnR5LXRodW1icycpLnNsaWNrKCdyZWZyZXNoJyk7XG4gICAgICAgICAgICAvLyAkKCcuc2xpY2stY3VycmVudCcsICNrci1wcm9wZXJ0eS1zbGlkZXNob3ctcmV2ZWFsKS5mb2N1cygpO1xuXG4gICAgICAgICAgICAvLyAkKFwiI01vZGFsXCIpLm9uKCdzaG93bi5icy5tb2RhbCcsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkKCcja3ItcHJvcGVydHktc2xpZGVzaG93Jykuc2xpY2soJ3NldFBvc2l0aW9uJyk7XG4gICAgICAgICAgICAkKCcja3ItcHJvcGVydHktc2xpZGVzaG93Jykuc2xpY2soJ3JlZnJlc2gnKTtcbiAgICAgICAgICAgICQoJyNrci1wcm9wZXJ0eS10aHVtYnMnKS5zbGljaygpO1xuICAgICAgICAgICAgJCgnI2tyLXByb3BlcnR5LWFycm93cycpLnNsaWNrKCk7XG4gICAgICAgICAgICAkKCcja3ItcHJvcGVydHktc2xpZGVzaG93Jykuc2xpY2soKTtcbiAgICAgICAgICAgIC8vIH0pXG5cbiAgICAgICAgICAgIC8vICQoJyNCdXR0b24nKS5jbGljayhmdW5jdGlvbigpe1xuICAgICAgICAgICAgLy8gICAgICQoJyNNb2RhbCcpLm1vZGFsKCdzaG93Jyk7XG4gICAgICAgICAgICAvLyB9KTtcblxuIC8vICAgICAgICAgICAkKHdpbmRvdykudHJpZ2dlcigncmVzaXplJyk7XG4gICAgICAgIH0pLm9uKCdjbGljaycsICcuZmF2c3BhbicsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjb25zdCBwaWQgPSAkKHRoaXMpLmRhdGEoJ3Byb3BlcnR5Jyk7XG4gICAgICAgICAgICBjb25zdCBiYXIgPSAkKCcua3Itc2VhcmNoYmFyIGEuaXMtYWN0aXZlJykuZGF0YSgnYmFyJyk7XG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICB1cmw6ICcvaW5kZXgucGhwP29wdGlvbj1jb21fa25vd3JlcyZ0YXNrPXByb3BlcnRpZXMuZmF2b3VyaXRlJyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7J3Byb3BlcnR5X2lkJzogcGlkfSxcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRQcm9wZXJ0aWVzKGJhcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuZmF2aWNvbi10b3AnKS5mb3VuZGF0aW9uKCdoaWRlJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSkub24oJ2NsaWNrJywgJy5nZXRSZXNwb25zZVNlYXJjaCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5kYXRhKCdhY3Rpb24nKSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgZ2V0UHJvcGVydGllcygkKHRoaXMpLmRhdGEoJ2JhcicpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZ2V0UHJvcGVydGllcygkKHRoaXMpLmRhdGEoJ2JhcicpLCAkKHRoaXMpLmRhdGEoJ2FjdGlvbicpLCAkKHRoaXMpLmRhdGEoJ2FjdGlvbi12YWx1ZScpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkub24oJ2NsaWNrJywgJy5rci1maWx0ZXJzLWNsb3NlJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICQoJy5rci1maWx0ZXJzLnRvcCcpLmFkZENsYXNzKCdoaWRlbWUnKTtcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICB9KS5vbignY2xpY2snLCAnLmtyLWZpbHRlcnMgdWwuZmlsdGVyLXNvcnQtbGlzdCBsaS5oZWFkJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICQodGhpcykucGFyZW50KCkuY2hpbGRyZW4oJ2xpLmZpbHRlci1pdGVtJykudG9nZ2xlKCk7XG4gICAgICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgfSkub24oJ2NsaWNrJywgJyNzaG93Z2F0ZXdheXMnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgJCgnI2tyLWdhdGV3YXlzJykudG9nZ2xlQ2xhc3MoJ2hpZGVtZScpO1xuICAgICAgICB9KS5vbignY2xpY2snLCAnYS5rci1zZWFyY2hiYXInLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgc2V0QWN0aXZlTWVudSgkKHRoaXMpLmRhdGEoJ2JhcicpKTtcbiAgICAgICAgfSkub24oJ2NsaWNrJywgJy50b2dnbGVvdGhlcicsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAkKHRoaXMpLmRhdGEoJ290aGVyJykudG9nZ2xlKCk7XG4gICAgICAgIH0pLm9uKCdjbGljaycsICcja3ItcHJvcGVydHktdGFicyBhW2hyZWY9XCIjY2FsZW5kYXJcIl0nLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgaWYgKCFjYWxlbmRhckxvYWRlZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBpZCA9ICQodGhpcykuZGF0YSgncGlkJyk7XG4gICAgICAgICAgICAgICAgbG9hZENhbGVuZGFyKHBpZCwgJyNjYWxlbmRhci50YWJzLXBhbmVsJyk7XG4gICAgICAgICAgICAgICAgY2FsZW5kYXJMb2FkZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KS5vbignbW91c2VvdmVyJywgJyNrci10aHVtYiBpbWcnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBsZXQgcHJvcGVydHkgPSAkKHRoaXMpLnBhcmVudCgpLmRhdGEoJ2lkJyk7XG4gICAgICAgICAgICBpZiAocHJvcGVydHkpIHtcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0ID0gJy50aHVtYm92ZXJ2aWV3JyArIHByb3BlcnR5O1xuICAgICAgICAgICAgICAgICQoJyNwaW5mbycpLmh0bWwoJCh0YXJnZXQpLmh0bWwoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxldCAkcHJvcHMgPSAkKCcua3ItcHJvcGVydGllcycpO1xuICAgICAgICBpZiAoJHByb3BzLmxlbmd0aCAmJiAhc2VhcmNoRG9uZSkge1xuICAgICAgICAgICAgZ2V0UHJvcGVydGllcygkcHJvcHMuZGF0YSgnYmFyJykpO1xuICAgICAgICB9XG4gICAgICAgIGxldCAkdGFicyA9ICQoJy50YWJzJyk7XG4gICAgICAgIGlmICgkKCcja3ItcHJvcGVydHktdGFicycpLmxlbmd0aCAmJiAhY2FsZW5kYXJMb2FkZWQpIHtcbiAgICAgICAgICAgICR0YWJzLmZpbmQoJ2EnKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5hdHRyKCdocmVmJykgPT09IFwiI2NhbGVuZGFyXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGlkID0gJCh0aGlzKS5kYXRhKCdwaWQnKTtcbiAgICAgICAgICAgICAgICAgICAgbG9hZENhbGVuZGFyKHBpZCwgJyNjYWxlbmRhci50YWJzLXBhbmVsJyk7XG4gICAgICAgICAgICAgICAgICAgIGNhbGVuZGFyTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgJC5ldmVudC5zcGVjaWFsLnRvdWNoc3RhcnQgPSB7XG4gICAgICAgIHNldHVwOiBmdW5jdGlvbiAoXywgbnMsIGhhbmRsZSkge1xuICAgICAgICAgICAgaWYgKG5zLmluY2x1ZGVzKFwibm9QcmV2ZW50RGVmYXVsdFwiKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgaGFuZGxlLCB7cGFzc2l2ZTogZmFsc2V9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCBoYW5kbGUsIHtwYXNzaXZlOiB0cnVlfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgICQuZXZlbnQuc3BlY2lhbC50b3VjaG1vdmUgPSB7XG4gICAgICAgIHNldHVwOiBmdW5jdGlvbiAoXywgbnMsIGhhbmRsZSkge1xuICAgICAgICAgICAgaWYgKG5zLmluY2x1ZGVzKFwibm9QcmV2ZW50RGVmYXVsdFwiKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLCBoYW5kbGUsIHtwYXNzaXZlOiBmYWxzZX0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIiwgaGFuZGxlLCB7cGFzc2l2ZTogdHJ1ZX0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGxvYWRDYWxlbmRhcihwaWQsIHRhcmdldCkge1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICAgICAgdXJsOiAnL2luZGV4LnBocD9vcHRpb249Y29tX2tub3dyZXMmdGFzaz1wcm9wZXJ0eS5nZXJpYXRyaWMnLFxuICAgICAgICAgICAgZGF0YVR5cGU6ICdodG1sJyxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAncGlkJzogcGlkXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAkKHRhcmdldCkuYXBwZW5kKGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmb3JtUmVzcG9uc2UoaWQsIGRhdGEpIHtcbiAgICAgICAgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoJ3JlZGlyZWN0JykpIHtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKGRhdGEucmVkaXJlY3QpO1xuICAgICAgICB9IGVsc2UgaWYgKGlkID09PSAna3ItZm9ybS1wYXltZW50Jykge1xuICAgICAgICAgICAgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoJ2h0bWwnKSkge1xuICAgICAgICAgICAgICAgIGxldCAkbW9kYWwgPSAkKCcja3ItZ2F0ZXdheS1tb2RhbCcpO1xuICAgICAgICAgICAgICAgICRtb2RhbC5odG1sKGRhdGEuaHRtbCkudHJpZ2dlcigncmVzaXplbWUuemYucmV2ZWFsJyk7XG4gICAgICAgICAgICAgICAgJG1vZGFsLmZvdW5kYXRpb24oJ29wZW4nKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnLyc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoaWQgPT09ICdrci1mb3JtLW1haWxjaGltcCcpIHtcbiAgICAgICAgICAgICQoJyNyZXNwb25zZTInKS5odG1sKGRhdGEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0UHJvcGVydGllcyhiYXIsIGFjdGlvbiA9ICcnLCBhY3Rpb25fdmFsdWUgPSAnJykge1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiAnL2luZGV4LnBocD9vcHRpb249Y29tX2tub3dyZXMmdGFzaz1wcm9wZXJ0aWVzLnJhdycsXG4gICAgICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgICAgICBkYXRhOiB7J2Jhcic6IGJhciwgJ2FjdGlvbic6IGFjdGlvbiwgJ2FjdGlvbl92YWx1ZSc6IGFjdGlvbl92YWx1ZX0sXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29uc3QgdmFscyA9IFsnZ3JpZCcsICdsaXN0JywgJ2ZhdnMnLCAnbWFwJ107XG4gICAgICAgICAgICAgICAgaWYgKHZhbHMuaW5jbHVkZXMoZGF0YS5iYXIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldEFjdGl2ZU1lbnUoZGF0YS5iYXIpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHNldFNlYXJjaERhdGEoZGF0YSwgZGF0YS5iYXIpO1xuICAgICAgICAgICAgICAgICQoJy5oYXMtdGlwJykuZm91bmRhdGlvbigpO1xuICAgICAgICAgICAgICAgICQoJy5kcm9wZG93bi1wYW5lJykuZm91bmRhdGlvbigpO1xuICAgICAgICAgICAgICAgICQoJy5rci1wcm9wZXJ0eSAuY2FyZCcpLmZvdW5kYXRpb24oKTtcbiAgICAgICAgICAgICAgICAkKCcja3Itb3JkZXItY2xvc2UnKS50cmlnZ2VyKCdjbGljaycpO1xuICAgICAgICAgICAgICAgIHNlYXJjaERvbmUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRTZWFyY2hEYXRhKHJlc3BvbnNlLCBhY3Rpb24gPSAnJykge1xuICAgICAgICBsZXQgJHNpZGViYXI7XG4gICAgICAgIGlmIChyZXNwb25zZSkge1xuICAgICAgICAgICAgJCgnI2tyLXByb3BlcnRpZXMtZGF0YScpLmVtcHR5KCkuZmFkZUluKCdzbG93JykuaHRtbChyZXNwb25zZVsnaXRlbXMnXSkuZm91bmRhdGlvbigpO1xuICAgICAgICAgICAgJCgnLmtyLXBhZ2VyJykuaHRtbChyZXNwb25zZVsncGFnaW5hdGlvbiddKTtcbiAgICAgICAgICAgICQoJy5rci1wYWdlci5ib3R0b20nKS5odG1sKHJlc3BvbnNlWydwYWdpbmF0aW9uJ10pO1xuICAgICAgICAgICAgJChcIiNrci1vZmZjYW52YXMtcHJvcGVydGllcy1maWx0ZXJcIikuaHRtbChyZXNwb25zZVsnZmlsdGVycyddKTtcbiAgICAgICAgICAgICQoXCIja3Itb2ZmY2FudmFzLXByb3BlcnRpZXMtc29ydGJ5XCIpLmh0bWwocmVzcG9uc2VbJ3NvcnRieSddKTtcbiAgICAgICAgICAgICQoJyNrci1wcm9wZXJ0aWVzLWZpbHRlci1jb3VudCcpLmh0bWwocmVzcG9uc2VbJ3Bjb3VudCddKTtcbiAgICAgICAgICAgICRzaWRlYmFyID0gJChcIiNrci1zaWRlYmFyLXNlYXJjaFwiKTtcbiAgICAgICAgICAgIGlmICgkc2lkZWJhci5sZW5ndGggJiYgcmVzcG9uc2VbJ3NlYXJjaCddLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICRzaWRlYmFyLmVtcHR5KCkuaHRtbChyZXNwb25zZVsnc2VhcmNoJ10pO1xuICAgICAgICAgICAgICAgICQoJ2JvZHknKS50cmlnZ2VyKCdpbml0YWpheHNlYXJjaCcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoYWN0aW9uID09PSAncGFnZScpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzdGlja3kgPSAkKCcuc3RpY2t5Jyk7XG4gICAgICAgICAgICAgICAgaWYgKHN0aWNreS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RpY2t5LmZvdW5kYXRpb24oJ19jYWxjJywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRBY3RpdmVNZW51KGJhcikge1xuICAgICAgICBjb25zdCBzZWFyY2hiYXIgPSAkKCcua3Itc2VhcmNoYmFyJykuZmluZCgnLmJ1dHRvbicpO1xuICAgICAgICAkLmVhY2goc2VhcmNoYmFyLCBmdW5jdGlvbiAoaW5kZXgsIHNlYXJjaGJhcikge1xuICAgICAgICAgICAgJChzZWFyY2hiYXIpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgfSk7XG4gICAgICAgICQoJy5rci1zZWFyY2hiYXIgLmJ1dHRvbi4nICsgYmFyKS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIHRydWUgaWYgd2lkdGggaGFzIGNoYW5nZWRcbiAgICBmdW5jdGlvbiBzY3JlZW5XaWR0aEhhc0NoYW5nZWQoKSB7XG4gICAgICAgIGxhcmdlID0gRm91bmRhdGlvbi5NZWRpYVF1ZXJ5LmF0TGVhc3QoJ2xhcmdlJyk7XG4gICAgICAgIGlmIChsYXJnZSAhPT0gc2F2ZWR3aWR0aCkge1xuICAgICAgICAgICAgc2F2ZWR3aWR0aCA9IGxhcmdlO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoZWNrU2NyZWVuV2lkdGgoKSB7XG4gICAgICAgIHJlc2l6ZWQgPSBmYWxzZTtcbiAgICAgICAgaWYgKHNjcmVlbldpZHRoSGFzQ2hhbmdlZCgpICYmIHNlYXJjaERhdGFbJ2l0ZW1zJ10gJiYgIXJlc2l6ZWQpIHtcbiAgICAgICAgICAgIHNldFNlYXJjaERhdGEoc2VhcmNoRGF0YSk7XG4gICAgICAgICAgICByZXNpemVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgICQuZXZlbnQuc3BlY2lhbC50b3VjaHN0YXJ0ID0ge1xuICAgICAgICBzZXR1cDogZnVuY3Rpb24gKF8sIG5zLCBoYW5kbGUpIHtcbiAgICAgICAgICAgIGlmIChucy5pbmNsdWRlcyhcIm5vUHJldmVudERlZmF1bHRcIikpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIGhhbmRsZSwge3Bhc3NpdmU6IGZhbHNlfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgaGFuZGxlLCB7cGFzc2l2ZTogdHJ1ZX0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICAkLmV2ZW50LnNwZWNpYWwudG91Y2htb3ZlID0ge1xuICAgICAgICBzZXR1cDogZnVuY3Rpb24gKF8sIG5zLCBoYW5kbGUpIHtcbiAgICAgICAgICAgIGlmIChucy5pbmNsdWRlcyhcIm5vUHJldmVudERlZmF1bHRcIikpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIiwgaGFuZGxlLCB7cGFzc2l2ZTogZmFsc2V9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsIGhhbmRsZSwge3Bhc3NpdmU6IHRydWV9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG59KGpRdWVyeSkpOyIsIi8qKlxuICogQHBhY2thZ2UgICAgS25vdyBSZXNlcnZhdGlvbnNcbiAqIEBzdWJwYWNrYWdlIFNpdGUgSlNcbiAqIEBjb3B5cmlnaHQgIDIwMjAgSGlnaGxhbmQgVmlzaW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogQGxpY2Vuc2UgICAgU2VlIHRoZSBmaWxlIFwiTElDRU5TRS50eHRcIiBmb3IgdGhlIGZ1bGwgbGljZW5zZSBnb3Zlcm5pbmcgdGhpcyBjb2RlLlxuICogQGF1dGhvciAgICAgSGF6ZWwgV2lsc29uIDxoYXplbEBoaWdobGFuZHZpc2lvbi5jb20+XG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoJCkge1xuXHRpZiAoIXdpbmRvdy5sb2NhdGlvbi5vcmlnaW4pXG5cdFx0d2luZG93LmxvY2F0aW9uLm9yaWdpbiA9IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCArIFwiLy9cIiArIHdpbmRvdy5sb2NhdGlvbi5ob3N0O1xuXG5cdGxldCBteUNvbmZpcm0sICRteVRhc2s7XG5cblx0Y2xhc3MgS3Jjb25maXJtIHtcblx0XHRjb25zdHJ1Y3RvcigkZm9ybSkge1xuXHRcdFx0dGhpcy5mb3JtID0gJGZvcm07XG5cdFx0XHR0aGlzLmluaXQoKTtcblx0XHR9XG5cblx0XHRpbml0KCkge1xuXHRcdFx0dGhpcy51cGRhdGVRdW90ZSh0aGlzLmZvcm0pO1xuXHRcdH1cblxuXHRcdHVwZGF0ZVF1b3RlKCRmb3JtKSB7XG5cdFx0XHQkbXlUYXNrID0gJCgnI215dGFzaycpO1xuXHRcdFx0JG15VGFzay52YWwoJ2NvbmZpcm0uY29tcHV0ZScpO1xuXHRcdFx0alF1ZXJ5LmFqYXgoe1xuXHRcdFx0XHR0eXBlOiAgICAgJ1BPU1QnLFxuXHRcdFx0XHR1cmw6ICAgICAgJ2luZGV4LnBocD9vcHRpb249Y29tX2tub3dyZXMmdGFzaz1jb25maXJtLmNvbXB1dGUnLFxuXHRcdFx0XHRkYXRhOiAgICAgJGZvcm0uc2VyaWFsaXplQXJyYXkoKSxcblx0XHRcdFx0ZGF0YVR5cGU6ICdqc29uJyxcblx0XHRcdFx0c3VjY2VzczogIGZ1bmN0aW9uIChyZXN1bHQpIHtcblx0XHRcdFx0XHQkbXlUYXNrLnZhbCgnY29uZmlybS5wYXltZW50Jyk7XG5cdFx0XHRcdFx0aWYgKHJlc3VsdC5zdWNjZXNzKSB7XG5cdFx0XHRcdFx0XHRjb25zdCBkYXRhID0gcmVzdWx0LmRhdGE7XG5cdFx0XHRcdFx0XHRpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eSgncmVkaXJlY3QnKSkge1xuXHRcdFx0XHRcdFx0XHR3aW5kb3cubG9jYXRpb24ucmVwbGFjZShkYXRhLnJlZGlyZWN0KTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGxldCBkaXY7XG5cdFx0XHRcdFx0XHQkLmVhY2gocmVzdWx0LmRhdGEucmVzcG9uc2UsIGZ1bmN0aW9uIChrZXksIHZhbCkge1xuXHRcdFx0XHRcdFx0XHQkKCcuaGlkZWluaXRpYWwnKS5zaG93KCk7XG5cdFx0XHRcdFx0XHRcdGRpdiA9IFwiI1wiICsga2V5O1xuXHRcdFx0XHRcdFx0XHQkKGRpdikudGV4dCh2YWwpO1xuXHRcdFx0XHRcdFx0XHQkKGRpdikuaHRtbCh2YWwpO1xuXHRcdFx0XHRcdFx0XHQkKGRpdikudmFsKHZhbCk7XG5cdFx0XHRcdFx0XHRcdCQoZGl2KS5zaG93KCk7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0JCgnLmtyLWFqYXgtbW9kYWwtZXJyb3ItbWVzc2FnZScpLmh0bWwocmVzdWx0Lm1lc3NhZ2UpO1xuXHRcdFx0XHRcdFx0Y29uc3QgJG1vZGFsID0gbmV3IEZvdW5kYXRpb24uUmV2ZWFsKCQoJyNLckFqYXhNb2RhbEVycm9yJykpO1xuXHRcdFx0XHRcdFx0JG1vZGFsLm9wZW4oKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdCQoZnVuY3Rpb24gKCkge1xuXHRcdGxldCAkZWxlbWVudCA9ICQoJyNrci1mb3JtLWNvbmZpcm0nKTtcblx0XHRpZiAoJGVsZW1lbnQubGVuZ3RoKSB7XG5cdFx0XHRteUNvbmZpcm0gPSBuZXcgS3Jjb25maXJtKCRlbGVtZW50KTtcblx0XHR9XG5cdFx0JGVsZW1lbnQub24oJ2NoYW5nZSBjbGljaycsICcua3ItY2FsY3VsYXRlJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdCRlbGVtZW50ID0gJCgnI2tyLWZvcm0tY29uZmlybScpO1xuXHRcdFx0bXlDb25maXJtLnVwZGF0ZVF1b3RlKCRlbGVtZW50KTtcblx0XHR9KTtcblxuXHRcdCQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcjY2hlY2t0ZXJtcycsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRpZiAoY2hlY2tUZXJtcygpKSB7XG5cdFx0XHRcdCQoJyNjaGVja3Rlcm1zJykudHJpZ2dlcignc3VibWl0Jyk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0pO1xuXG5cdC8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuXHRmdW5jdGlvbiBjaGVja1Rlcm1zKCkge1xuXHRcdGxldCByZXN1bHQgPSB0cnVlO1xuXHRcdGNvbnN0IHRlc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWdyZWVjaGVjaycpO1xuXHRcdGNvbnN0IHRlc3RjID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FncmVlY2hlY2tjJyk7XG5cdFx0Y29uc3QgdGVzdHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWdyZWVjaGVja3QnKTtcblxuXHRcdC8vIG5vaW5zcGVjdGlvbiBKU1VucmVzb2x2ZWRWYXJpYWJsZVxuXHRcdGlmICh0ZXN0ICYmICFkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgna3ItZm9ybS1wYXltZW50JykuYWdyZWVjaGVjay5jaGVja2VkKSB7XG5cdFx0XHRyZXN1bHQgPSBmYWxzZTtcblx0XHR9XG5cdFx0Ly8gbm9pbnNwZWN0aW9uIEpTVW5yZXNvbHZlZFZhcmlhYmxlXG5cdFx0aWYgKHRlc3RjICYmICFkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgna3ItZm9ybS1wYXltZW50JykuYWdyZWVjaGVja2MuY2hlY2tlZCkge1xuXHRcdFx0cmVzdWx0ID0gZmFsc2U7XG5cdFx0fVxuXHRcdC8vIG5vaW5zcGVjdGlvbiBKU1VucmVzb2x2ZWRWYXJpYWJsZVxuXHRcdGlmICh0ZXN0dCAmJiAhZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2tyLWZvcm0tcGF5bWVudCcpLmFncmVlY2hlY2t0LmNoZWNrZWQpIHtcblx0XHRcdHJlc3VsdCA9IGZhbHNlO1xuXHRcdH1cblxuXHRcdGlmIChyZXN1bHQpIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zdCAkbW9kYWwgPSBuZXcgRm91bmRhdGlvbi5SZXZlYWwoJCgnI2Vycm9yTW9kYWwnKSk7XG5cdFx0XHQkbW9kYWwub3BlbigpO1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0fVxufShqUXVlcnkpKTsiLCIvKipcbiAqIEBwYWNrYWdlICAgIEtub3cgUmVzZXJ2YXRpb25zXG4gKiBAc3VicGFja2FnZSBTaXRlIEpTXG4gKiBAY29weXJpZ2h0ICAyMDIwIEhpZ2hsYW5kIFZpc2lvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIEBsaWNlbnNlICAgIFNlZSB0aGUgZmlsZSBcIkxJQ0VOU0UudHh0XCIgZm9yIHRoZSBmdWxsIGxpY2Vuc2UgZ292ZXJuaW5nIHRoaXMgY29kZS5cbiAqIEBhdXRob3IgICAgIEhhemVsIFdpbHNvbiA8aGF6ZWxAaGlnaGxhbmR2aXNpb24uY29tPlxuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG5pZiAoIXdpbmRvdy5sb2NhdGlvbi5vcmlnaW4pIHtcblx0d2luZG93LmxvY2F0aW9uLm9yaWdpbiA9IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCArIFwiLy9cIiArIHdpbmRvdy5sb2NhdGlvbi5ob3N0O1xufVxuXG4oZnVuY3Rpb24gKCQpIHtcblx0bGV0IG15S3JEb2JFbnRyeTtcblx0bGV0IHRvZGF5O1xuXHRsZXQga2V5ID0ge0JBQ0tTUEFDRTogOH07XG5cblx0bGV0IHNldHRpbmdzID0ge1xuXHRcdGN1c3RvbV92YWxpZGF0aW9uOiAgICAgZmFsc2UsXG5cdFx0ZGF5c19pbl9tb250aDogICAgICAgICBbMzEsIDI5LCAzMSwgMzAsIDMxLCAzMCwgMzEsIDMxLCAzMCwgMzEsIDMwLCAzMV0sXG5cdFx0ZG9jdW1lbnRfZGF0ZTogICAgICAgICBmYWxzZSxcblx0XHRlcnJvcmJveF94OiAgICAgICAgICAgIDEsXG5cdFx0ZXJyb3Jib3hfeTogICAgICAgICAgICA1LFxuXHRcdGZpZWxkX2hpbnRfdGV4dF9kYXk6ICAgJ0REJyxcblx0XHRmaWVsZF9oaW50X3RleHRfbW9udGg6ICdNTScsXG5cdFx0ZmllbGRfaGludF90ZXh0X3llYXI6ICAnWVlZWScsXG5cdFx0ZmllbGRfb3JkZXI6ICAgICAgICAgICAnRE1ZJyxcblx0XHRmaWVsZF93aWR0aF9kYXk6ICAgICAgIDYsXG5cdFx0ZmllbGRfd2lkdGhfbW9udGg6ICAgICA2LFxuXHRcdGZpZWxkX3dpZHRoX3llYXI6ICAgICAgNyxcblx0XHRmaWVsZF93aWR0aF9zZXA6ICAgICAgIDIsXG5cdFx0bWlubWF4OiAgICAgICAgICAgICAgICAnJyxcblx0XHRtaW5fZGF0ZTogICAgICAgICAgICAgIGZhbHNlLFxuXHRcdG1heF9kYXRlOiAgICAgICAgICAgICAgZmFsc2UsXG5cdFx0bWluX3llYXI6ICAgICAgICAgICAgICAxOTEwLFxuXHRcdG1vbnRoX25hbWU6ICAgICAgICAgICAgW1xuXHRcdFx0J0phbnVhcnknLCAnRmVicnVhcnknLCAnTWFyY2gnLCAnQXByaWwnLFxuXHRcdFx0J01heScsICdKdW5lJywgJ0p1bHknLCAnQXVndXN0JywgJ1NlcHRlbWJlcicsXG5cdFx0XHQnT2N0b2JlcicsICdOb3ZlbWJlcicsICdEZWNlbWJlciddLFxuXHRcdG9uX2JsdXI6ICAgICAgICAgICAgICAgZmFsc2UsXG5cdFx0b25fZXJyb3I6ICAgICAgICAgICAgICBmYWxzZSxcblx0XHRvbl9jaGFuZ2U6ICAgICAgICAgICAgIGZhbHNlLFxuXHRcdHBhcnNlX2RhdGU6ICAgICAgICAgICAgdHJ1ZSxcblx0XHRzZXBhcmF0b3I6ICAgICAgICAgICAgICcvJyxcblx0XHRzaG93X2Vycm9yczogICAgICAgICAgIHRydWUsXG5cdFx0c2hvd19oaW50czogICAgICAgICAgICB0cnVlLFxuXHRcdEVfREFZX05BTjogICAgICAgICAgICAgJ0RheSBtdXN0IGJlIGEgbnVtYmVyJyxcblx0XHRFX0RBWV9UT09fQklHOiAgICAgICAgICdEYXkgbXVzdCBiZSAxLTMxJyxcblx0XHRFX0RBWV9UT09fU01BTEw6ICAgICAgICdEYXkgbXVzdCBiZSAxLTMxJyxcblx0XHRFX0JBRF9EQVlfRk9SX01PTlRIOiAgICdPbmx5ICVkIGRheXMgaW4gJW0gJXknLFxuXHRcdEVfTU9OVEhfTkFOOiAgICAgICAgICAgJ01vbnRoIG11c3QgYmUgYSBudW1iZXInLFxuXHRcdEVfTU9OVEhfVE9PX0JJRzogICAgICAgJ01vbnRoIG11c3QgYmUgMS0xMicsXG5cdFx0RV9NT05USF9UT09fU01BTEw6ICAgICAnTW9udGggY2Fubm90IGJlIDAnLFxuXHRcdEVfWUVBUl9OQU46ICAgICAgICAgICAgJ1llYXIgbXVzdCBiZSBhIG51bWJlcicsXG5cdFx0RV9ZRUFSX0xFTkdUSDogICAgICAgICAnWWVhciBtdXN0IGJlIDQgZGlnaXRzJyxcblx0XHRFX1lFQVJfVE9PX1NNQUxMOiAgICAgICdZZWFyIG11c3Qgbm90IGJlIGJlZm9yZSAleScsXG5cdFx0RV9NSU5fREFURTogICAgICAgICAgICAnRGF0ZSBtdXN0IG5vdCBiZSBpbiB0aGUgcGFzdCcsXG5cdFx0RV9NQVhfREFURTogICAgICAgICAgICAnRGF0ZSBtdXN0IG5vdCBiZSBpbiB0aGUgZnV0dXJlJ1xuXHR9O1xuXG5cdGNsYXNzIEtyRG9iRW50cnkge1xuXHRcdGNvbnN0cnVjdG9yKCRlbGVtZW50LCBvcHRpb25zKSB7XG5cdFx0XHR0b2RheSA9IEtyRG9iRW50cnkuZ2V0WW1kKG5ldyBEYXRlKCkpO1xuXG5cdFx0XHR0aGlzLmlucHV0X2RheSA9IDA7XG5cdFx0XHR0aGlzLmlucHV0X21vbnRoID0gMDtcblx0XHRcdHRoaXMuaW5wdXRfeWVhciA9IDA7XG5cdFx0XHR0aGlzLiRlbGVtZW50ID0gJGVsZW1lbnQ7XG5cdFx0XHRpZiAob3B0aW9ucykge1xuXHRcdFx0XHQkLmV4dGVuZChzZXR0aW5ncywgb3B0aW9ucyk7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuaW5pdCgpO1xuXHRcdH1cblxuXHRcdHN0YXRpYyBnZXRZbWQoZGF0ZSkge1xuXHRcdFx0Y29uc3QgbSA9IGRhdGUuZ2V0TW9udGgoKSArIDE7XG5cdFx0XHRjb25zdCBkID0gZGF0ZS5nZXREYXkoKTtcblxuXHRcdFx0cmV0dXJuIChkYXRlLmdldEZ1bGxZZWFyKCkgKyAnLScgKyAobSA8IDEwID8gJzAnIDogJycpICsgbSArICctJyArIChkIDwgMTAgPyAnMCcgOiAnJykgKyBkKTtcblx0XHR9XG5cblx0XHRzdGF0aWMgZ2V0WW1kT2JqZWN0KGRhdGUpIHtcblx0XHRcdHJldHVybiAoZGF0ZS55ZWFyICsgJy0nICsgZGF0ZS5tb250aCArICctJyArIGRhdGUuZGF5KTtcblx0XHR9XG5cblx0XHRhZGRFbnRyeUZpZWxkcygpIHtcblx0XHRcdGxldCBkb2JmaWVsZCA9IHRoaXM7XG5cdFx0XHRkb2JmaWVsZC5maWVsZHMgPSBbXTtcblx0XHRcdCQuZWFjaChzZXR0aW5ncy5maWVsZF9vcmRlci5zcGxpdCgnJyksIGZ1bmN0aW9uIChpLCBmaWVsZCkge1xuXHRcdFx0XHRzd2l0Y2ggKGZpZWxkKSB7XG5cdFx0XHRcdFx0Y2FzZSAnRCc6XG5cdFx0XHRcdFx0XHRkb2JmaWVsZC5idWlsZEZpZWxkKCdkYXknLCBpKTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgJ00nOlxuXHRcdFx0XHRcdFx0ZG9iZmllbGQuYnVpbGRGaWVsZCgnbW9udGgnLCBpKTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgJ1knOlxuXHRcdFx0XHRcdFx0ZG9iZmllbGQuYnVpbGRGaWVsZCgneWVhcicsIGkpO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0ZGVmYXVsdCA6XG5cdFx0XHRcdFx0XHR0aHJvdyBcIlVuZXhwZWN0ZWQgZmllbGQgb3JkZXIgJ1wiICsgZmllbGQgKyBcIicgZXhwZWN0ZWQgRCwgTSBvciBZXCI7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGFmdGVyUGFzdGUodGFyZ2V0KSB7XG5cdFx0XHRpZiAodGhpcy5wYXJzZURhdGUoJCh0YXJnZXQpLnZhbCgpKSkge1xuXHRcdFx0XHR0aGlzLnNldERhdGUoJCh0YXJnZXQpLnZhbCgpKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRidWlsZEZpZWxkKG5hbWUsIGluZGV4KSB7XG5cdFx0XHRsZXQga3Jkb2JlbnRyeSA9IHRoaXM7XG5cdFx0XHRsZXQgaW5wdXQgPSBuZXcgS3JEb2JJbnB1dCh7XG5cdFx0XHRcdG5hbWU6ICAgICAgIG5hbWUsXG5cdFx0XHRcdGtyZG9iZW50cnk6IGtyZG9iZW50cnksXG5cdFx0XHRcdGluZGV4OiAgICAgIGluZGV4LFxuXHRcdFx0XHRoaW50X3RleHQ6ICBzZXR0aW5ncy5zaG93X2hpbnRzID8gc2V0dGluZ3NbJ2ZpZWxkX2hpbnRfdGV4dF8nICsgbmFtZV0gOiBudWxsLFxuXHRcdFx0fSk7XG5cblx0XHRcdHRoaXMuaW5uZXIuYXBwZW5kKGlucHV0LiRpbnB1dCk7XG5cdFx0XHR0aGlzWydpbnB1dF8nICsgbmFtZV0gPSBpbnB1dDtcblxuXHRcdFx0aWYgKGluZGV4IDwgMikge1xuXHRcdFx0XHR0aGlzLmlubmVyLmFwcGVuZCgkKCc8c3BhbiBjbGFzcz1cInNlcGFyYXRvclwiIC8+JykudGV4dChzZXR0aW5ncy5zZXBhcmF0b3IpKTtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5maWVsZHNbaW5kZXhdID0gaW5wdXQ7XG5cdFx0XHR0aGlzW25hbWVdID0gaW5wdXQ7XG5cdFx0fVxuXG5cdFx0YnVpbGRVaSgpIHtcblx0XHRcdGxldCBkb2JmaWVsZCA9IHRoaXM7XG5cdFx0XHR0aGlzLndyYXBwZXIgPSAkKHRoaXMuJGVsZW1lbnQud3JhcCgnPHNwYW4gY2xhc3M9XCJqcS1kdGVcIiAvPicpLnBhcmVudCgpWzBdKTtcblx0XHRcdHRoaXMuaW5uZXIgPSAkKCc8c3BhbiBjbGFzcz1cImpxLWR0ZS1pbm5lclwiIC8+Jyk7XG5cdFx0XHR0aGlzLmFkZEVudHJ5RmllbGRzKCk7XG5cdFx0XHR0aGlzLmVycm9yYm94ID0gJCgnPHNwYW4gY2xhc3M9XCJqcS1kdGUtZXJyb3Jib3hcIiAvPicpLmhpZGUoKTtcblx0XHRcdHRoaXMuaW5uZXIub24oJ3Bhc3RlJywgJ2lucHV0JywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0bGV0IGlucHV0ID0gdGhpcztcblx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0ZG9iZmllbGQuYWZ0ZXJQYXN0ZShpbnB1dCwgZSk7XG5cdFx0XHRcdH0sIDIpO1xuXHRcdFx0fSk7XG5cdFx0XHR0aGlzLndyYXBwZXIuYXBwZW5kKHRoaXMuaW5uZXIsIHRoaXMuZXJyb3Jib3gpO1xuXHRcdFx0dGhpcy5zZXRGaWVsZFdpZHRocygpO1xuXHRcdFx0dGhpcy4kZWxlbWVudC5oaWRlKCk7XG5cdFx0fVxuXG5cdFx0Y2hlY2tEb2N1bWVudChkb2IsIGNoaWxkZG9iLCBjbGFzc25hbWUpIHtcblx0XHRcdGxldCBlbGVtZW50cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoY2xhc3NuYW1lKTtcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0aWYgKG5ldyBEYXRlKGRvYikgPiBuZXcgRGF0ZShjaGlsZGRvYikpIHtcblx0XHRcdFx0XHRlbGVtZW50c1tpXS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGVsZW1lbnRzW2ldLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Y2xlYXIoKSB7XG5cdFx0XHR0aGlzLmNsZWFyRXJyb3IoJycpO1xuXHRcdFx0dGhpcy5zZXREYXRlKCcnKTtcblx0XHR9XG5cblx0XHRjbGVhckVycm9yKCkge1xuXHRcdFx0ZGVsZXRlIHRoaXMuZXJyb3JfdGV4dDtcblx0XHRcdHRoaXMuc2hvd0Vycm9yKCk7XG5cdFx0fVxuXG5cdFx0ZGVzdHJveSgpIHtcblx0XHRcdHRoaXMuJGVsZW1lbnQuc2hvdygpO1xuXHRcdFx0dGhpcy4kZWxlbWVudC5jc3MoJ2Rpc3BsYXknLCAnJyk7XG5cdFx0XHR0aGlzLndyYXBwZXIuZmluZCgnc3BhbicpLnJlbW92ZSgpO1xuXHRcdFx0dGhpcy4kZWxlbWVudC51bndyYXAoKTtcblx0XHRcdHRoaXMuJGVsZW1lbnQucmVtb3ZlRGF0YSgnZGF0ZXRleHRlbnRyeScpO1xuXHRcdFx0ZGVsZXRlIHRoaXMuaW5uZXI7XG5cdFx0XHRkZWxldGUgdGhpcy53cmFwcGVyO1xuXHRcdFx0ZGVsZXRlIHRoaXMuJGVsZW1lbnQ7XG5cdFx0fVxuXG5cdFx0Zm9jdXMoKSB7XG5cdFx0XHR0aGlzLmZpZWxkc1swXS5zZXRGb2N1cyh0cnVlKTtcblx0XHR9XG5cblx0XHRmb2N1c0ZpZWxkQmVmb3JlKGlucHV0KSB7XG5cdFx0XHRjb25zdCBpbmRleCA9IGlucHV0LmluZGV4O1xuXHRcdFx0aWYgKGluZGV4IDwgMSkge1xuXHRcdFx0XHRyZXR1cm5cblx0XHRcdH1cblx0XHRcdHRoaXMuZmllbGRzW2luZGV4XS55aWVsZEZvY3VzKCk7XG5cdFx0XHR0aGlzLmZpZWxkc1tpbmRleCAtIDFdLnNldEZvY3VzKHRydWUpO1xuXHRcdFx0Ly8gbGV0IG5leHQgPSB0aGlzLmZpZWxkc1tpbmRleCAtIDFdO1xuXHRcdFx0Ly8gbGV0IHZhbCA9IG5leHQuZ2V0KCk7XG5cdFx0XHQvLyBuZXh0LnNldEZvY3VzKGZhbHNlKTtcblx0XHR9XG5cblx0XHRmb2N1c0ZpZWxkQWZ0ZXIoaW5wdXQpIHtcblx0XHRcdGNvbnN0IGluZGV4ID0gaW5wdXQuaW5kZXg7XG5cdFx0XHRpZiAoaW5kZXggPiAxKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdHRoaXMuZmllbGRzW2luZGV4XS55aWVsZEZvY3VzKCk7XG5cdFx0XHR0aGlzLmZpZWxkc1tpbmRleCArIDFdLnNldEZvY3VzKHRydWUpO1xuXHRcdH1cblxuXHRcdGZvY3VzSW4oKSB7XG5cdFx0XHR0aGlzLndyYXBwZXIuYWRkQ2xhc3MoJ2ZvY3VzJyk7XG5cdFx0fVxuXG5cdFx0Zm9jdXNPdXQoKSB7XG5cdFx0XHRpZiAoc2V0dGluZ3Mub25fYmx1cikge1xuXHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRzZWxmLndpZGdldEZvY3VzTG9zdCgpO1xuXHRcdFx0XHR9LCAyKTtcblx0XHRcdH1cblx0XHRcdHRoaXMud3JhcHBlci5yZW1vdmVDbGFzcygnZm9jdXMnKTtcblx0XHR9XG5cblx0XHRnZXREYXRlKCkge1xuXHRcdFx0cmV0dXJuICh0aGlzLmRheV92YWx1ZSAmJiB0aGlzLm1vbnRoX3ZhbHVlICYmIHRoaXMueWVhcl92YWx1ZSlcblx0XHRcdCAgICAgICA/IHtkYXk6IHRoaXMuZGF5X3ZhbHVlLCBtb250aDogdGhpcy5tb250aF92YWx1ZSwgeWVhcjogdGhpcy55ZWFyX3ZhbHVlfVxuXHRcdFx0ICAgICAgIDogbnVsbDtcblx0XHR9XG5cblx0XHRpbml0KCkge1xuXHRcdFx0aWYgKCFzZXR0aW5ncy5taW5feWVhcilcblx0XHRcdFx0c2V0dGluZ3MubWluX3llYXIgPSAnMTkxMCc7XG5cblx0XHRcdHRoaXMuYnVpbGRVaSgpO1xuXHRcdFx0dGhpcy5zZXREYXRlKHRoaXMuJGVsZW1lbnQuYXR0cigndmFsdWUnKSk7XG5cdFx0XHR0aGlzLnByb3h5TGFiZWxDbGlja3MoKTtcblx0XHR9XG5cblx0XHRwYXJzZURhdGUodGV4dCkge1xuXHRcdFx0cmV0dXJuIHRoaXMucGFyc2VJc29EYXRlKHRleHQpO1xuXHRcdH1cblxuXHRcdHBhcnNlSXNvRGF0ZSh0ZXh0KSB7XG5cdFx0XHRyZXR1cm4gdGV4dCAmJiB0ZXh0Lm1hdGNoKC9eKFxcZFxcZFxcZFxcZCktKFxcZFxcZCktKFxcZFxcZCkvKSA/IHtcblx0XHRcdFx0ZGF5OiAgIFJlZ0V4cC4kMyxcblx0XHRcdFx0bW9udGg6IFJlZ0V4cC4kMixcblx0XHRcdFx0eWVhcjogIFJlZ0V4cC4kMVxuXHRcdFx0fSA6IG51bGw7XG5cdFx0fVxuXG5cdFx0cHJveHlMYWJlbENsaWNrcygpIHtcblx0XHRcdGxldCBkb2JmaWVsZCA9IHRoaXM7XG5cdFx0XHRsZXQgaWQgPSB0aGlzLiRlbGVtZW50LmF0dHIoJ2lkJyk7XG5cdFx0XHRpZiAoIWlkKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdCQoJ2xhYmVsW2Zvcj0nICsgaWQgKyAnXScpLmNsaWNrKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0ZG9iZmllbGQuZm9jdXMoKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdHNldERhdGUobmV3X2RhdGUpIHtcblx0XHRcdGxldCBkb2JmaWVsZCA9IHRoaXM7XG5cdFx0XHRuZXdfZGF0ZSA9IHRoaXMucGFyc2VEYXRlKG5ld19kYXRlKTtcblx0XHRcdGRlbGV0ZSB0aGlzLmRheV92YWx1ZTtcblx0XHRcdGRlbGV0ZSB0aGlzLm1vbnRoX3ZhbHVlO1xuXHRcdFx0ZGVsZXRlIHRoaXMueWVhcl92YWx1ZTtcblx0XHRcdHRoaXMuaW5wdXRfZGF5LnNldChuZXdfZGF0ZSA/IG5ld19kYXRlLmRheSA6ICcnKTtcblx0XHRcdHRoaXMuaW5wdXRfbW9udGguc2V0KG5ld19kYXRlID8gbmV3X2RhdGUubW9udGggOiAnJyk7XG5cdFx0XHR0aGlzLmlucHV0X3llYXIuc2V0KG5ld19kYXRlID8gbmV3X2RhdGUueWVhciA6ICcnKTtcblx0XHRcdHRoaXMuY2xlYXJFcnJvcigpO1xuXHRcdFx0dGhpcy4kZWxlbWVudC52YWwobmV3X2RhdGUpO1xuXHRcdFx0aWYgKG5ld19kYXRlKSB7XG5cdFx0XHRcdCQuZWFjaCh0aGlzLmZpZWxkcywgZnVuY3Rpb24gKGksIGlucHV0KSB7XG5cdFx0XHRcdFx0ZG9iZmllbGQudmFsaWRhdGUoaW5wdXQpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRzZXRFcnJvcihlcnJvcl90ZXh0KSB7XG5cdFx0XHR0aGlzLmVycm9yX3RleHQgPSBlcnJvcl90ZXh0O1xuXHRcdFx0dGhpcy5zaG93RXJyb3IoKTtcblx0XHR9XG5cblx0XHRzZXRGaWVsZFdpZHRocygpIHtcblx0XHRcdGxldCBhdmFpbGFibGUgPSB0aGlzLiRlbGVtZW50LndpZHRoKCkgLSAyO1xuXHRcdFx0bGV0IHRvdGFsID0gc2V0dGluZ3MuZmllbGRfd2lkdGhfeWVhciArIHNldHRpbmdzLmZpZWxkX3dpZHRoX3NlcCArIHNldHRpbmdzLmZpZWxkX3dpZHRoX21vbnRoICtcblx0XHRcdFx0c2V0dGluZ3MuZmllbGRfd2lkdGhfc2VwICsgc2V0dGluZ3MuZmllbGRfd2lkdGhfZGF5O1xuXHRcdFx0dGhpcy5pbnB1dF9kYXkuc2V0V2lkdGgoTWF0aC5mbG9vcihzZXR0aW5ncy5maWVsZF93aWR0aF9kYXkgKiBhdmFpbGFibGUgLyB0b3RhbCkpO1xuXHRcdFx0dGhpcy5pbnB1dF9tb250aC5zZXRXaWR0aChNYXRoLmZsb29yKHNldHRpbmdzLmZpZWxkX3dpZHRoX21vbnRoICogYXZhaWxhYmxlIC8gdG90YWwpKTtcblx0XHRcdHRoaXMuaW5wdXRfeWVhci5zZXRXaWR0aChNYXRoLmZsb29yKHNldHRpbmdzLmZpZWxkX3dpZHRoX3llYXIgKiBhdmFpbGFibGUgLyB0b3RhbCkpO1xuXHRcdH1cblxuXHRcdHNldFJlYWRvbmx5KG1vZGUpIHtcblx0XHRcdGlmIChtb2RlID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0bW9kZSA9IHRydWU7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLmlucHV0X2RheS5zZXRSZWFkb25seShtb2RlKTtcblx0XHRcdHRoaXMuaW5wdXRfbW9udGguc2V0UmVhZG9ubHkobW9kZSk7XG5cdFx0XHR0aGlzLmlucHV0X3llYXIuc2V0UmVhZG9ubHkobW9kZSk7XG5cdFx0XHRpZiAobW9kZSkge1xuXHRcdFx0XHR0aGlzLndyYXBwZXIuYWRkQ2xhc3MoJ3JlYWRvbmx5Jyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLndyYXBwZXIucmVtb3ZlQ2xhc3MoJ3JlYWRvbmx5Jyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0c2hvd0Vycm9yKCkge1xuXHRcdFx0bGV0IGVycm9yX3RleHQgPSB0aGlzLndpZGdldEVycm9yVGV4dCgpO1xuXHRcdFx0aWYgKHRoaXMub25fZXJyb3IpIHtcblx0XHRcdFx0dGhpcy5vbl9lcnJvcihlcnJvcl90ZXh0KTtcblx0XHRcdH1cblx0XHRcdGlmICghc2V0dGluZ3Muc2hvd19lcnJvcnMpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGVycm9yX3RleHQgPT09ICcnKSB7XG5cdFx0XHRcdHRoaXMuZXJyb3Jib3guaGlkZSgpO1xuXHRcdFx0XHR0aGlzLmVycm9yYm94LnRleHQoJycpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bGV0IHhfb2Zmc2V0ID0gKHRoaXMuaW5uZXIub3V0ZXJXaWR0aCgpICsgc2V0dGluZ3MuZXJyb3Jib3hfeCkgKyAncHgnO1xuXHRcdFx0XHRsZXQgeV9vZmZzZXQgPSBzZXR0aW5ncy5lcnJvcmJveF95ICsgJ3B4Jztcblx0XHRcdFx0dGhpcy5lcnJvcmJveC5jc3Moe2Rpc3BsYXk6ICdibG9jaycsIHBvc2l0aW9uOiAnYWJzb2x1dGUnLCB0b3A6IHlfb2Zmc2V0LCBsZWZ0OiB4X29mZnNldH0pO1xuXHRcdFx0XHR0aGlzLmVycm9yYm94LnRleHQoZXJyb3JfdGV4dCk7XG5cdFx0XHRcdHRoaXMuZXJyb3Jib3guc2hvdygpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHZhbGlkYXRlKGN1cnJlbnRfaW5wdXQpIHtcblx0XHRcdHRoaXMuJGVsZW1lbnQudmFsKCcnKTtcblx0XHRcdGlmIChjdXJyZW50X2lucHV0KSB7XG5cdFx0XHRcdGNvbnN0IHR5cGUgPSBjdXJyZW50X2lucHV0Lm5hbWU7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0aWYgKHR5cGUgPT09ICdkYXknKSB7XG5cdFx0XHRcdFx0XHR0aGlzLnZhbGlkYXRlRGF5KCk7XG5cdFx0XHRcdFx0fSBlbHNlIGlmICh0eXBlID09PSAnbW9udGgnKSB7XG5cdFx0XHRcdFx0XHR0aGlzLnZhbGlkYXRlTW9udGgoKTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHR5cGUgPT09ICd5ZWFyJykge1xuXHRcdFx0XHRcdFx0dGhpcy52YWxpZGF0ZVllYXIoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Y3VycmVudF9pbnB1dC5jbGVhckVycm9yKCk7XG5cdFx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0XHRjdXJyZW50X2lucHV0LnNldEVycm9yKGUpO1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKHRoaXMuZGF5X3ZhbHVlICYmIHRoaXMubW9udGhfdmFsdWUpIHtcblx0XHRcdFx0dGhpcy5jbGVhckVycm9yKCk7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0dGhpcy52YWxpZGF0ZURheXNJbk1vbnRoKCk7XG5cdFx0XHRcdFx0aWYgKHRoaXMueWVhcl92YWx1ZSAmJiB0aGlzLnllYXJfdmFsdWUubGVuZ3RoID09PSA0KSB7XG5cdFx0XHRcdFx0XHR0aGlzLnZhbGlkYXRlQ29tcGxldGVEYXRlKCk7XG5cdFx0XHRcdFx0XHRsZXQgZGF0ZV9zdHIgPSBLckRvYkVudHJ5LmdldFltZE9iamVjdCh0aGlzLmdldERhdGUoKSk7XG5cdFx0XHRcdFx0XHR0aGlzLiRlbGVtZW50LnZhbChkYXRlX3N0cik7XG5cdFx0XHRcdFx0XHRpZiAodGhpcy4kZWxlbWVudC5kYXRhKCdjaGlsZGRvYicpKSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMuY2hlY2tEb2N1bWVudChkYXRlX3N0ciwgdGhpcy4kZWxlbWVudC5kYXRhKCdjaGlsZGRvYicpLCB0aGlzLiRlbGVtZW50LmF0dHIoJ2lkJykpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRcdHRoaXMuc2V0RXJyb3IoZSk7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLmNsZWFyRXJyb3IoKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0dmFsaWRhdGVDb21wbGV0ZURhdGUoKSB7XG5cdFx0XHRjb25zdCBkYXRlX29iaiA9IHRoaXMuZ2V0RGF0ZSgpO1xuXHRcdFx0Y29uc3QgZGF0ZV9pc28gPSBLckRvYkVudHJ5LmdldFltZE9iamVjdChkYXRlX29iaik7XG5cdFx0XHRzZXR0aW5ncy5taW5tYXggPSB0aGlzLiRlbGVtZW50LmRhdGEoJ3ZhbGlkYXRpb24nKTtcblxuXHRcdFx0aWYgKHNldHRpbmdzLm1pbm1heCA9PT0gJ21heCcpIHtcblx0XHRcdFx0aWYgKGRhdGVfaXNvID4gdG9kYXkpIHtcblx0XHRcdFx0XHR0aHJvdyhzZXR0aW5ncy5FX01BWF9EQVRFKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKHNldHRpbmdzLm1pbm1heCA9PT0gJ21pbicpIHtcblx0XHRcdFx0aWYgKGRhdGVfaXNvIDwgdG9kYXkpIHtcblx0XHRcdFx0XHR0aHJvdyhzZXR0aW5ncy5FX01JTl9EQVRFKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBsZXQgbWF4X2RhdGUgPSBzZXR0aW5ncy5tYXhfZGF0ZTtcblx0XHRcdC8vIGlmICh0eXBlb2YgbWF4X2RhdGUgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdC8vIFx0bWF4X2RhdGUgPSBtYXhfZGF0ZS5jYWxsKHRoaXMpO1xuXHRcdFx0Ly8gfVxuXHRcdFx0Ly8gaWYgKHR5cGVvZiBtYXhfZGF0ZSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdC8vIFx0bWF4X2RhdGUgPSB0aGlzLnBhcnNlRGF0ZShtYXhfZGF0ZSk7XG5cdFx0XHQvLyB9XG5cdFx0XHQvLyBpZiAobWF4X2RhdGUpIHtcblx0XHRcdC8vIFx0aWYgKGRhdGVfaXNvID4gc2V0dGluZ3MubWF4X2RhdGUpIHtcblx0XHRcdC8vIFx0XHR0aHJvdyhzZXR0aW5ncy5FX01BWF9EQVRFKTtcblx0XHRcdC8vIFx0fVxuXHRcdFx0Ly8gfVxuXG5cdFx0XHRpZiAodGhpcy5jdXN0b21fdmFsaWRhdGlvbikge1xuXHRcdFx0XHRkYXRlX29iai5kYXRlID0gbmV3IERhdGUoXG5cdFx0XHRcdFx0cGFyc2VJbnQoZGF0ZV9vYmoueWVhciwgMTApLFxuXHRcdFx0XHRcdHBhcnNlSW50KGRhdGVfb2JqLm1vbnRoLCAxMCkgLSAxLFxuXHRcdFx0XHRcdHBhcnNlSW50KGRhdGVfb2JqLmRheSwgMTApXG5cdFx0XHRcdCk7XG5cdFx0XHRcdHRoaXMuY3VzdG9tX3ZhbGlkYXRpb24oZGF0ZV9vYmopO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHZhbGlkYXRlRGF5KCkge1xuXHRcdFx0bGV0IG9wdCA9IHNldHRpbmdzO1xuXHRcdFx0bGV0IGlucHV0ID0gdGhpcy5pbnB1dF9kYXk7XG5cdFx0XHR0aGlzLmRheV92YWx1ZSA9IHVuZGVmaW5lZDtcblx0XHRcdGxldCB0ZXh0ID0gaW5wdXQuZ2V0KCk7XG5cdFx0XHRpZiAodGV4dCA9PT0gJycgfHwgKHRleHQgPT09ICcwJyAmJiBpbnB1dC5oYXNfZm9jdXMpKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdGlmICh0ZXh0Lm1hdGNoKC9cXEQvKSkge1xuXHRcdFx0XHR0aHJvdyhvcHQuRV9EQVlfTkFOKTtcblx0XHRcdH1cblx0XHRcdGxldCBudW0gPSBwYXJzZUludCh0ZXh0LCAxMCk7XG5cdFx0XHRpZiAobnVtIDwgMSkge1xuXHRcdFx0XHR0aHJvdyhvcHQuRV9EQVlfVE9PX1NNQUxMKTtcblx0XHRcdH1cblx0XHRcdGlmIChudW0gPiAzMSkge1xuXHRcdFx0XHR0aHJvdyhvcHQuRV9EQVlfVE9PX0JJRyk7XG5cdFx0XHR9XG5cdFx0XHR0ZXh0ID0gbnVtIDwgMTAgPyAnMCcgKyBudW0gOiAnJyArIG51bTtcblx0XHRcdGlmICghaW5wdXQuaGFzX2ZvY3VzKSB7XG5cdFx0XHRcdGlucHV0LnNldCh0ZXh0KTtcblx0XHRcdH1cblx0XHRcdHRoaXMuZGF5X3ZhbHVlID0gdGV4dDtcblx0XHR9XG5cblx0XHR2YWxpZGF0ZURheXNJbk1vbnRoKCkge1xuXHRcdFx0Y29uc3QgZGF5ID0gcGFyc2VJbnQodGhpcy5kYXlfdmFsdWUsIDEwKTtcblx0XHRcdGNvbnN0IG1vbnRoID0gcGFyc2VJbnQodGhpcy5tb250aF92YWx1ZSwgMTApO1xuXHRcdFx0Y29uc3QgeWVhciA9IHBhcnNlSW50KHRoaXMueWVhcl92YWx1ZSwgMTApO1xuXHRcdFx0aWYgKGRheSA8IDEgfHwgbW9udGggPCAxKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdGxldCBtYXggPSBzZXR0aW5ncy5kYXlzX2luX21vbnRoW21vbnRoIC0gMV07XG5cdFx0XHRsZXQgbXNnID0gc2V0dGluZ3MuRV9CQURfREFZX0ZPUl9NT05USDtcblx0XHRcdGlmIChtb250aCA9PT0gMiAmJiAoJycgKyB5ZWFyKS5sZW5ndGggPT09IDQpIHtcblx0XHRcdFx0bWF4ID0geWVhciAlIDQgPyAyOCA6IHllYXIgJSAxMDAgPyAyOSA6IHllYXIgJSA0MDAgPyAyOCA6IDI5O1xuXHRcdFx0XHRtc2cgPSBtc2cucmVwbGFjZSgvJXkvLCB5ZWFyLnRvU3RyaW5nKCkpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bXNnID0gbXNnLnJlcGxhY2UoLyAqJXkvLCAnJyk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoZGF5ID4gbWF4KSB7XG5cdFx0XHRcdHRocm93KG1zZy5yZXBsYWNlKC8lZC8sIG1heC50b1N0cmluZygpKS5yZXBsYWNlKC8lbS8sIHNldHRpbmdzLm1vbnRoX25hbWVbbW9udGggLSAxXSkpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHZhbGlkYXRlTW9udGgoKSB7XG5cdFx0XHRsZXQgaW5wdXQgPSB0aGlzLmlucHV0X21vbnRoO1xuXHRcdFx0dGhpcy5tb250aF92YWx1ZSA9IHVuZGVmaW5lZDtcblx0XHRcdGxldCB0ZXh0ID0gaW5wdXQuZ2V0KCk7XG5cdFx0XHRpZiAodGV4dCA9PT0gJycgfHwgKHRleHQgPT09ICcwJyAmJiBpbnB1dC5oYXNfZm9jdXMpKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdGlmICh0ZXh0Lm1hdGNoKC9cXEQvKSkge1xuXHRcdFx0XHR0aHJvdyhzZXR0aW5ncy5FX01PTlRIX05BTik7XG5cdFx0XHR9XG5cdFx0XHRsZXQgbnVtID0gcGFyc2VJbnQodGV4dCwgMTApO1xuXHRcdFx0aWYgKG51bSA8IDEpIHtcblx0XHRcdFx0dGhyb3coc2V0dGluZ3MuRV9NT05USF9UT09fU01BTEwpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKG51bSA+IDEyKSB7XG5cdFx0XHRcdHRocm93KHNldHRpbmdzLkVfTU9OVEhfVE9PX0JJRyk7XG5cdFx0XHR9XG5cdFx0XHR0ZXh0ID0gbnVtIDwgMTAgPyAnMCcgKyBudW0gOiAnJyArIG51bTtcblx0XHRcdGlmICghaW5wdXQuaGFzX2ZvY3VzKSB7XG5cdFx0XHRcdGlucHV0LnNldCh0ZXh0KTtcblx0XHRcdH1cblx0XHRcdHRoaXMubW9udGhfdmFsdWUgPSB0ZXh0O1xuXHRcdH1cblxuXHRcdHZhbGlkYXRlWWVhcigpIHtcblx0XHRcdGNvbnN0IGlucHV0ID0gdGhpcy5pbnB1dF95ZWFyO1xuXHRcdFx0dGhpcy55ZWFyX3ZhbHVlID0gdW5kZWZpbmVkO1xuXHRcdFx0bGV0IHRleHQgPSBpbnB1dC5nZXQoKTtcblx0XHRcdGlmICh0ZXh0ID09PSAnJyB8fCAodGV4dCA9PT0gJzAnICYmIGlucHV0Lmhhc19mb2N1cykpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHRleHQubWF0Y2goL1xcRC8pKSB7XG5cdFx0XHRcdHRocm93KHNldHRpbmdzLkVfWUVBUl9OQU4pO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGlucHV0Lmhhc19mb2N1cykge1xuXHRcdFx0XHRpZiAodGV4dC5sZW5ndGggPiA0KSB7XG5cdFx0XHRcdFx0dGhyb3coc2V0dGluZ3MuRV9ZRUFSX0xFTkdUSCk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmICh0ZXh0Lmxlbmd0aCAhPT0gNCkge1xuXHRcdFx0XHRcdHRocm93KHNldHRpbmdzLkVfWUVBUl9MRU5HVEgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAodGV4dC5sZW5ndGggPT09IDQpIHtcblx0XHRcdFx0Y29uc3QgbnVtID0gcGFyc2VJbnQodGV4dCwgMTApO1xuXHRcdFx0XHRpZiAoc2V0dGluZ3MubWluX3llYXIgJiYgbnVtIDwgc2V0dGluZ3MubWluX3llYXIpIHtcblx0XHRcdFx0XHR0aHJvdyhzZXR0aW5ncy5FX1lFQVJfVE9PX1NNQUxMLnJlcGxhY2UoLyV5Lywgc2V0dGluZ3MubWluX3llYXIpKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0dGhpcy55ZWFyX3ZhbHVlID0gdGV4dDtcblx0XHR9XG5cblx0XHR3aWRnZXRFcnJvclRleHQoKSB7XG5cdFx0XHRsZXQgZXJyb3JfdGV4dCA9ICcnO1xuXHRcdFx0JC5lYWNoKHRoaXMuZmllbGRzLCBmdW5jdGlvbiAoaSwgaW5wdXQpIHtcblx0XHRcdFx0aWYgKGlucHV0LmVycm9yX3RleHQpIHtcblx0XHRcdFx0XHRpZiAoaW5wdXQuaGFzX2ZvY3VzIHx8IGVycm9yX3RleHQgPT09ICcnKSB7XG5cdFx0XHRcdFx0XHRlcnJvcl90ZXh0ID0gaW5wdXQuZXJyb3JfdGV4dFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRpZiAoZXJyb3JfdGV4dCA9PT0gJycgJiYgdGhpcy5lcnJvcl90ZXh0KSB7XG5cdFx0XHRcdGVycm9yX3RleHQgPSB0aGlzLmVycm9yX3RleHQ7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZXJyb3JfdGV4dDtcblx0XHR9XG5cblx0XHR3aWRnZXRGb2N1c0xvc3QoKSB7XG5cdFx0XHRpZiAoc2V0dGluZ3Mub25fYmx1ciAmJiAhdGhpcy53cmFwcGVyLmlzKCcuZm9jdXMnKSkge1xuXHRcdFx0XHRzZXR0aW5ncy5vbkJsdXIoKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRjbGFzcyBLckRvYklucHV0IHtcblx0XHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG5cdFx0XHRjb25zdCBpbnB1dCA9IHRoaXM7XG5cdFx0XHR0aGlzLmRvYmZpZWxkID0gb3B0aW9ucy5rcmRvYmVudHJ5O1xuXHRcdFx0dGhpcy5uYW1lID0gb3B0aW9ucy5uYW1lO1xuXHRcdFx0dGhpcy5pbmRleCA9IG9wdGlvbnMuaW5kZXg7XG5cdFx0XHR0aGlzLmhpbnRfdGV4dCA9IG9wdGlvbnMuaGludF90ZXh0O1xuXHRcdFx0dGhpcy5oYXNfZm9jdXMgPSBmYWxzZTtcblx0XHRcdHRoaXMuZW1wdHkgPSB0cnVlO1xuXHRcdFx0dGhpcy4kaW5wdXQgPSAkKCc8aW5wdXQgdHlwZT1cInRleHRcIiB2YWx1ZT1cIlwiIC8+JykuYWRkQ2xhc3MoJ2pxLWR0ZS0nICsgdGhpcy5uYW1lKS5hdHRyKCdhcmlhLWxhYmVsJywgJycgKyBcIiAoXCIgKyB0aGlzLmhpbnRfdGV4dCArIFwiKVwiKS5mb2N1cygkLnByb3h5KGlucHV0LCAnZm9jdXMnKSkuYmx1cigkLnByb3h5KGlucHV0LCAnYmx1cicpKS5rZXlkb3duKGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdGlucHV0LmtleWRvd24oZSk7XG5cdFx0XHRcdH0sIDIpXG5cdFx0XHR9KS5rZXl1cChmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRpbnB1dC5rZXl1cChlKTtcblx0XHRcdFx0fSwgMilcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGJsdXIoKSB7XG5cdFx0XHR0aGlzLmhhc19mb2N1cyA9IGZhbHNlO1xuXHRcdFx0dGhpcy5kb2JmaWVsZC5mb2N1c091dCgpO1xuXHRcdFx0dGhpcy5zaG93X2hpbnQoKTtcblx0XHRcdHRoaXMuZG9iZmllbGQudmFsaWRhdGUodGhpcyk7XG5cdFx0fVxuXG5cdFx0Y2xlYXJFcnJvcigpIHtcblx0XHRcdGRlbGV0ZSB0aGlzLmVycm9yX3RleHQ7XG5cdFx0XHR0aGlzLiRpbnB1dC5yZW1vdmVDbGFzcygnZXJyb3InKTtcblx0XHR9XG5cblx0XHRmb2N1cygpIHtcblx0XHRcdHRoaXMua2V5X2lzX2Rvd24gPSBmYWxzZTtcblx0XHRcdGlmICh0aGlzLiRpbnB1dC5wcm9wKCdyZWFkb25seScpKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdHRoaXMuaGFzX2ZvY3VzID0gdHJ1ZTtcblx0XHRcdHRoaXMuZG9iZmllbGQuZm9jdXNJbigpO1xuXHRcdFx0aWYgKHRoaXMuJGlucHV0Lmhhc0NsYXNzKCdoaW50JykpIHtcblx0XHRcdFx0dGhpcy4kaW5wdXQudmFsKCcnKS5yZW1vdmVDbGFzcygnaGludCcpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5kb2JmaWVsZC5zaG93RXJyb3IoKTtcblx0XHR9XG5cblx0XHRnZXQoKSB7XG5cdFx0XHRsZXQgdmFsID0gdGhpcy4kaW5wdXQudmFsKCk7XG5cdFx0XHRyZXR1cm4gdmFsID09PSB0aGlzLmhpbnRfdGV4dCA/ICcnIDogdmFsO1xuXHRcdH1cblxuXHRcdGlzRGlnaXRLZXkoZSkge1xuXHRcdFx0bGV0IGtleWNvZGUgPSBlLndoaWNoO1xuXHRcdFx0cmV0dXJuIGtleWNvZGUgPj0gNDggJiYga2V5Y29kZSA8PSA1NyB8fCBrZXljb2RlID49IDk2ICYmIGtleWNvZGUgPD0gMTA1O1xuXHRcdH1cblxuXHRcdGtleWRvd24oKSB7XG5cdFx0XHQvLyBJZ25vcmUga2V5dXAgZXZlbnRzIHRoYXQgYXJyaXZlIGFmdGVyIGZvY3VzIG1vdmVkIHRvIG5leHQgZmllbGRcblx0XHRcdHRoaXMua2V5X2lzX2Rvd24gPSB0cnVlO1xuXHRcdH1cblxuXHRcdGtleXVwKGUpIHtcblx0XHRcdGlmICghdGhpcy5rZXlfaXNfZG93bikge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHQvLyBIYW5kbGUgQmFja3NwYWNlIC0gc2hpZnRpbmcgZm9jdXMgdG8gcHJldmlvdXMgZmllbGQgaWYgcmVxdWlyZWRcblx0XHRcdGxldCBrZXljb2RlID0gZS53aGljaDtcblx0XHRcdGlmIChrZXljb2RlID09PSBrZXkuQkFDS1NQQUNFICYmIHRoaXMuZW1wdHkpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuZG9iZmllbGQuZm9jdXNGaWVsZEJlZm9yZSh0aGlzKTtcblx0XHRcdH1cblx0XHRcdGxldCB0ZXh0ID0gdGhpcy5nZXQoKTtcblx0XHRcdHRoaXMuZW1wdHkgPSB0ZXh0ID09PSAnJztcblxuXHRcdFx0Ly8gVHJhcCBhbmQgZGlzY2FyZCBzZXBhcmF0b3IgY2hhcmFjdGVycyAtIGFkdmFuY2luZyBmb2N1cyBpZiByZXF1aXJlZFxuXHRcdFx0aWYgKHRleHQubWF0Y2goL1tcXC9cXFxcLiAtXS8pKSB7XG5cdFx0XHRcdHRleHQgPSB0ZXh0LnJlcGxhY2UoL1tcXC9cXFxcLiAtXS8sICcnKTtcblx0XHRcdFx0dGhpcy5zZXQodGV4dCk7XG5cdFx0XHRcdGlmICghdGhpcy5lbXB0eSAmJiB0aGlzLmluZGV4IDwgMikge1xuXHRcdFx0XHRcdHRoaXMuZG9iZmllbGQuZm9jdXNGaWVsZEFmdGVyKHRoaXMpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIEFkdmFuY2UgZm9jdXMgaWYgdGhpcyBmaWVsZCBpcyBib3RoIHZhbGlkIGFuZCBmdWxsXG5cdFx0XHRpZiAodGhpcy5kb2JmaWVsZC52YWxpZGF0ZSh0aGlzKSkge1xuXHRcdFx0XHRsZXQgd2FudCA9IHRoaXMubmFtZSA9PT0gJ3llYXInID8gNCA6IDI7XG5cdFx0XHRcdGlmICh0aGlzLmlzRGlnaXRLZXkoZSkgJiYgdGV4dC5sZW5ndGggPT09IHdhbnQpIHtcblx0XHRcdFx0XHR0aGlzLmRvYmZpZWxkLmZvY3VzRmllbGRBZnRlcih0aGlzKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGxlZnQoKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy4kaW5wdXQucG9zaXRpb24oKS5sZWZ0O1xuXHRcdH1cblxuXHRcdHNldChuZXdfdmFsdWUpIHtcblx0XHRcdHRoaXMuJGlucHV0LnZhbChuZXdfdmFsdWUpLnJlbW92ZUNsYXNzKCdoaW50Jyk7XG5cdFx0XHRpZiAoIXRoaXMuaGFzX2ZvY3VzKSB7XG5cdFx0XHRcdHRoaXMuc2hvd19oaW50KCk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLmVtcHR5ID0gbmV3X3ZhbHVlID09PSAnJztcblx0XHRcdHRoaXMuY2xlYXJFcnJvcigpO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fVxuXG5cdFx0c2V0RXJyb3IodGV4dCkge1xuXHRcdFx0dGhpcy5lcnJvcl90ZXh0ID0gdGV4dDtcblx0XHRcdHRoaXMuJGlucHV0LmFkZENsYXNzKCdlcnJvcicpO1xuXHRcdFx0dGhpcy5kb2JmaWVsZC5zaG93RXJyb3IoKTtcblx0XHR9XG5cblx0XHRzZXRGb2N1cyhzZWxlY3RfYWxsKSB7XG5cdFx0XHRsZXQgJGlucHV0ID0gdGhpcy4kaW5wdXQ7XG5cdFx0XHQkaW5wdXQuZm9jdXMoKTtcblx0XHRcdGlmIChzZWxlY3RfYWxsKSB7XG5cdFx0XHRcdCRpbnB1dC5zZWxlY3QoKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdCRpbnB1dC52YWwoJGlucHV0LnZhbCgpKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH1cblxuXHRcdHNldFdpZHRoKG5ld193aWR0aCkge1xuXHRcdFx0dGhpcy4kaW5wdXQud2lkdGgobmV3X3dpZHRoKTtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH1cblxuXHRcdHNob3dfaGludCgpIHtcblx0XHRcdGlmICh0aGlzLmdldCgpID09PSAnJyAmJiB0eXBlb2YgKHRoaXMuaGludF90ZXh0KSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdFx0dGhpcy4kaW5wdXQudmFsKHRoaXMuaGludF90ZXh0KS5hZGRDbGFzcygnaGludCcpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fVxuXG5cdFx0eWllbGRGb2N1cygpIHtcblx0XHRcdHRoaXMuJGlucHV0LmJsdXIoKTtcblx0XHR9XG5cdH1cblxuXHQkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG5cdFx0JCgnLmRvYmlzc3VlJykuZWFjaChmdW5jdGlvbiAoKSB7XG5cdFx0XHRteUtyRG9iRW50cnkgPSBuZXcgS3JEb2JFbnRyeSgkKHRoaXMpLCB7fSk7XG5cdFx0fSk7XG5cdH0pO1xufShqUXVlcnkpKTsiLCIvLyBub2luc3BlY3Rpb24gRHVwbGljYXRlZENvZGVcblxuLyoqXG4gKiBAcGFja2FnZSAgICBLbm93IFJlc2VydmF0aW9uc1xuICogQHN1YnBhY2thZ2UgQWRtaW4gSlNcbiAqIEBjb3B5cmlnaHQgIDIwMjAgSGlnaGxhbmQgVmlzaW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogQGxpY2Vuc2UgICAgU2VlIHRoZSBmaWxlIFwiTElDRU5TRS50eHRcIiBmb3IgdGhlIGZ1bGwgbGljZW5zZSBnb3Zlcm5pbmcgdGhpcyBjb2RlLlxuICogQGF1dGhvciAgICAgSGF6ZWwgV2lsc29uIDxoYXplbEBoaWdobGFuZHZpc2lvbi5jb20+XG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoJCkge1xuXHQkKGZ1bmN0aW9uICgpIHtcblx0XHRpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hvd3RvYXJyaXZlJykpIHtcblx0XHRcdGNvbnN0IGhvd3RvYXJyaXZlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hvd3RvYXJyaXZlJyk7XG5cdFx0XHRsZXQgYXJyaXZhbG1lYW5zID0gaG93dG9hcnJpdmUuZ2V0QXR0cmlidXRlKCdkYXRhLW1lYW5zJyk7XG5cdFx0XHRpZiAoIWFycml2YWxtZWFucykge1xuXHRcdFx0XHRhcnJpdmFsbWVhbnMgPSAnYWlyJztcblx0XHRcdH1cblx0XHRcdGRpc3BsYXlBcnJpdmFsKGFycml2YWxtZWFucyk7XG5cdFx0fVxuXG5cdFx0JCgnYm9keScpLm9uKCdjbGljaycsICcuYW1pdGVtJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGRpc3BsYXlBcnJpdmFsKCQodGhpcykuYXR0cignaWQnKSk7XG5cdFx0fSk7XG5cdH0pO1xuXG5cdGZ1bmN0aW9uIGRpc3BsYXlBcnJpdmFsKHZhbHVlKSB7XG5cdFx0bGV0IHggPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhbWl0ZW0nKTtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHgubGVuZ3RoOyBpKyspIHtcblx0XHRcdHhbaV0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG5cdFx0fVxuXG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Fpci1kYXRhJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndHJhaW4tZGF0YScpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2F1dG8tZGF0YScpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ290aGVyLWRhdGEnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXHRcdGxldCBhcnJpdmFsZGF0YSA9IHZhbHVlICsgJy1kYXRhJztcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZChhcnJpdmFsZGF0YSkuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodmFsdWUpLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqZm9ybV9hcnJpdmFsX21lYW5zJykudmFsdWUgPSB2YWx1ZTtcblx0fVxufSkoalF1ZXJ5KTsiLCIvKipcbiAqIEBwYWNrYWdlICAgIEtub3cgUmVzZXJ2YXRpb25zXG4gKiBAc3VicGFja2FnZSBTaXRlIEpTXG4gKiBAY29weXJpZ2h0ICAyMDIwIEhpZ2hsYW5kIFZpc2lvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIEBsaWNlbnNlICAgIFNlZSB0aGUgZmlsZSBcIkxJQ0VOU0UudHh0XCIgZm9yIHRoZSBmdWxsIGxpY2Vuc2UgZ292ZXJuaW5nIHRoaXMgY29kZS5cbiAqIEBhdXRob3IgICAgIEhhemVsIFdpbHNvbiA8aGF6ZWxAaGlnaGxhbmR2aXNpb24uY29tPlxuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG5sZXQgb3ZDaGlsZHJlbiwgb3ZTdGF0ZSA9IG51bGwsIG92UHMgPSAwLCAkb3ZCdG47XG5sZXQgZmNDaGlsZHJlbiwgZmNTdGF0ZSA9IG51bGwsICRmY0J0bjtcbmxldCB0dENoaWxkcmVuLCB0dFN0YXRlID0gbnVsbCwgdHRQcyA9IDAsICR0dEJ0biwgdHRwYXJhcztcbmxldCBjdXJyZW50UGFyYWdyYXBoLCBockVsZW1lbnQ7XG5cbihmdW5jdGlvbiAoJCkge1xuICAgICQoZnVuY3Rpb24gKCkge1xuICAgICAgICBvdkNoaWxkcmVuID0gJCgnLnJlYWRtb3JlLW92ZXJ2aWV3JykuY2hpbGRyZW4oJ3AsIGg1LCB1bCcpO1xuICAgICAgICBvdlBzID0gb3ZDaGlsZHJlbi5sZW5ndGg7XG4gICAgICAgIGlmIChvdlBzID4gMykge1xuICAgICAgICAgICAgb3ZDaGlsZHJlbi5zbGljZSgzKS5oaWRlKCk7XG4gICAgICAgICAgICBvdkNoaWxkcmVuLnNsaWNlKG92UHMgLSAxLCBvdlBzKS5hZnRlcignPGRpdiBjbGFzcz1cInRleHQtY2VudGVyXCI+PGEgY2xhc3M9XCJidXR0b24gaG9sbG93JyArXG4gICAgICAgICAgICAgICAgJyByZWFkbW9yZSBvdmVydmlldy10b2dnbGVcIj5SZWFkIG1vcmUuLi48L2E+PC9kaXY+Jyk7XG4gICAgICAgICAgICBvdlN0YXRlID0gJ2hpZGRlbic7XG4gICAgICAgIH1cblxuICAgICAgICB0dENoaWxkcmVuID0gJCgnLnJlYWRtb3JlLXRlc3RpbW9uaWFscycpLmNoaWxkcmVuKCdwJyk7XG4gICAgICAgIHR0UHMgPSB0dENoaWxkcmVuLmxlbmd0aDtcbiAgICAgICAgaWYgKHR0UHMgPiAxMCkge1xuICAgICAgICAgICAgdHRDaGlsZHJlbi5zbGljZSgxMSkuaGlkZSgpO1xuICAgICAgICAgICAgdHRwYXJhcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5yZWFkbW9yZS10ZXN0aW1vbmlhbHMgcFtzdHlsZSo9XCJkaXNwbGF5OiBub25lXCJdJyk7XG4gICAgICAgICAgICBkb0hScyh0dHBhcmFzLCAnaGlkZScpO1xuICAgICAgICAgICAgdHRDaGlsZHJlbi5zbGljZSh0dFBzIC0gMSwgdHRQcykuYWZ0ZXIoJzxhIGNsYXNzPVwiYnV0dG9uIGhvbGxvdycgK1xuICAgICAgICAgICAgICAgICcgYWNjZW50IHJlYWRtb3JlIHRlc3RpbW9uaWFscy10b2dnbGVcIj5SZWFkIG1vcmUuLi48L2E+Jyk7XG4gICAgICAgICAgICB0dFN0YXRlID0gJ2hpZGRlbic7XG4gICAgICAgIH1cblxuICAgICAgICBmY0NoaWxkcmVuID0gJCgnLnJlYWRtb3JlLWZhY2lsaXRpZXMnKS5jaGlsZHJlbignLnJvb21zJyk7XG4gICAgICAgIGlmIChmY0NoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgICAgICAgZmNDaGlsZHJlbi5oaWRlKCkuYWZ0ZXIoJzxhIGNsYXNzPVwiYnV0dG9uIGhvbGxvdycgK1xuICAgICAgICAgICAgICAgICcgYWNjZW50IHJlYWRtb3JlIGZhY2lsaXRpZXMtdG9nZ2xlXCI+U2VlIGFsbCBmYWNpbGl0aWVzLi4uPC9hPicpO1xuICAgICAgICAgICAgZmNTdGF0ZSA9ICdoaWRkZW4nO1xuICAgICAgICB9XG5cbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5yZWFkbW9yZS5vdmVydmlldy10b2dnbGUnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgJG92QnRuID0gJChcIi5vdmVydmlldy10b2dnbGVcIik7XG4gICAgICAgICAgICBpZiAob3ZTdGF0ZSA9PT0gJ3Zpc2libGUnKSB7XG4gICAgICAgICAgICAgICAgb3ZDaGlsZHJlbi5zbGljZSgzKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgJG92QnRuLmF0dHIoJ3ZhbHVlJywgJ1JlYWQgbW9yZScpO1xuICAgICAgICAgICAgICAgICRvdkJ0bi50ZXh0KFwiUmVhZCBtb3JlLi4uXCIpO1xuICAgICAgICAgICAgICAgIG92U3RhdGUgPSAnaGlkZGVuJztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAob3ZTdGF0ZSA9PT0gJ2hpZGRlbicpIHtcbiAgICAgICAgICAgICAgICAkKCcucmVhZG1vcmUtb3ZlcnZpZXcnKS5maW5kKCc6aGlkZGVuJykuc2hvdygpO1xuICAgICAgICAgICAgICAgICRvdkJ0bi5hdHRyKCd2YWx1ZScsICdSZWFkIGxlc3MnKTtcbiAgICAgICAgICAgICAgICAkb3ZCdG4udGV4dChcIlJlYWQgbGVzcy4uLlwiKTtcbiAgICAgICAgICAgICAgICBvdlN0YXRlID0gJ3Zpc2libGUnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJCgnLnByb3BlcnR5LW1lbnUnKS5mb3VuZGF0aW9uKCdjYWxjUG9pbnRzJyk7XG4gICAgICAgICAgICAkKCcuc3RpY2t5JykuZm91bmRhdGlvbignX2NhbGMnLCB0cnVlKTtcbiAgICAgICAgfSkub24oJ2NsaWNrJywgJy5yZWFkbW9yZS50ZXN0aW1vbmlhbHMtdG9nZ2xlJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICR0dEJ0biA9ICQoXCIudGVzdGltb25pYWxzLXRvZ2dsZVwiKTtcbiAgICAgICAgICAgIGlmICh0dFN0YXRlID09PSAndmlzaWJsZScpIHtcbiAgICAgICAgICAgICAgICB0dENoaWxkcmVuLnNsaWNlKDExKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgZG9IUnModHRwYXJhcywgJ2hpZGUnKTtcbiAgICAgICAgICAgICAgICAkdHRCdG4uYXR0cigndmFsdWUnLCAnUmVhZCBtb3JlJyk7XG4gICAgICAgICAgICAgICAgJHR0QnRuLnRleHQoXCJSZWFkIG1vcmUuLi5cIik7XG4gICAgICAgICAgICAgICAgdHRTdGF0ZSA9ICdoaWRkZW4nO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0dFN0YXRlID09PSAnaGlkZGVuJykge1xuICAgICAgICAgICAgICAgICQoJy5yZWFkbW9yZS10ZXN0aW1vbmlhbHMgcCcpLnNob3coKTtcbiAgICAgICAgICAgICAgICBkb0hScyh0dHBhcmFzLCAnc2hvdycpO1xuICAgICAgICAgICAgICAgICR0dEJ0bi5hdHRyKCd2YWx1ZScsICdSZWFkIGxlc3MnKTtcbiAgICAgICAgICAgICAgICAkdHRCdG4udGV4dChcIlJlYWQgbGVzcy4uLlwiKTtcbiAgICAgICAgICAgICAgICB0dFN0YXRlID0gJ3Zpc2libGUnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJCgnLnByb3BlcnR5LW1lbnUnKS5mb3VuZGF0aW9uKCdjYWxjUG9pbnRzJyk7XG4gICAgICAgICAgICAkKCcuc3RpY2t5JykuZm91bmRhdGlvbignX2NhbGMnLCB0cnVlKTtcbiAgICAgICAgfSkub24oJ2NsaWNrJywgJy5yZWFkbW9yZS5mYWNpbGl0aWVzLXRvZ2dsZScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAkZmNCdG4gPSAkKFwiLmZhY2lsaXRpZXMtdG9nZ2xlXCIpO1xuICAgICAgICAgICAgaWYgKGZjU3RhdGUgPT09ICd2aXNpYmxlJykge1xuICAgICAgICAgICAgICAgICQoJy5yZWFkbW9yZS1mYWNpbGl0aWVzIC5yb29tcycpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAkZmNCdG4uYXR0cigndmFsdWUnLCAnU2VlIGFsbCBmYWNpbGl0aWVzJyk7XG4gICAgICAgICAgICAgICAgJGZjQnRuLnRleHQoXCJTZWUgYWxsIGZhY2lsaXRpZXMuLi5cIik7XG4gICAgICAgICAgICAgICAgZmNTdGF0ZSA9ICdoaWRkZW4nO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChmY1N0YXRlID09PSAnaGlkZGVuJykge1xuICAgICAgICAgICAgICAgICQoJy5yZWFkbW9yZS1mYWNpbGl0aWVzIC5yb29tcycpLnNob3coKTtcbiAgICAgICAgICAgICAgICAkZmNCdG4uYXR0cigndmFsdWUnLCAnSGlkZSBhbGwgZmFjaWxpdGllcycpO1xuICAgICAgICAgICAgICAgICRmY0J0bi50ZXh0KFwiSGlkZSBhbGwgZmFjaWxpdGllcy4uLlwiKTtcbiAgICAgICAgICAgICAgICBmY1N0YXRlID0gJ3Zpc2libGUnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJCgnLnByb3BlcnR5LW1lbnUnKS5mb3VuZGF0aW9uKCdjYWxjUG9pbnRzJyk7XG4gICAgICAgICAgICAkKCcuc3RpY2t5JykuZm91bmRhdGlvbignX2NhbGMnLCB0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KGpRdWVyeSkpO1xuXG5mdW5jdGlvbiBkb0hScyhwYXJhZ3JhcGhzLCB0eXBlKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXJhZ3JhcGhzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGN1cnJlbnRQYXJhZ3JhcGggPSBwYXJhZ3JhcGhzW2ldO1xuICAgICAgICBockVsZW1lbnQgPSBjdXJyZW50UGFyYWdyYXBoLm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgaWYgKGhyRWxlbWVudCAmJiBockVsZW1lbnQudGFnTmFtZSA9PT0gJ0hSJykge1xuICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdoaWRlJylcbiAgICAgICAgICAgICAgICBockVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBockVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIH1cbiAgICB9XG59IiwiLyoqXG4gKiBAcGFja2FnZSAgICBLbm93IFJlc2VydmF0aW9uc1xuICogQHN1YnBhY2thZ2UgU2l0ZSBKU1xuICogQGNvcHlyaWdodCAgMjAyMCBIaWdobGFuZCBWaXNpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBAbGljZW5zZSAgICBTZWUgdGhlIGZpbGUgXCJMSUNFTlNFLnR4dFwiIGZvciB0aGUgZnVsbCBsaWNlbnNlIGdvdmVybmluZyB0aGlzIGNvZGUuXG4gKiBAYXV0aG9yICAgICBIYXplbCBXaWxzb24gPGhhemVsQGhpZ2hsYW5kdmlzaW9uLmNvbT5cbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxuY29uc3QgbGFuZyA9IFwiZW5cIjtcblxuKGZ1bmN0aW9uICgkKSB7XG4gICAgY29uc3QgbWFya2Vyc2hhcGUgPSB7XG4gICAgICAgIHR5cGU6ICdwb2x5JyxcbiAgICAgICAgY29vcmRzOiBbMSwgMSwgMSwgMzIsIDM3LCAzMiwgMzIsIDFdXG4gICAgfTtcblxuICAgIGxldCBteUtybWFwO1xuICAgIGxldCBtYXBEYXRhID0gZmFsc2U7XG4gICAgbGV0IG1hcDtcbiAgICBsZXQgaW5mb1dpbmRvdztcbiAgICBsZXQgaW5mb1dpbmRvdzI7XG4gICAgbGV0IGJvdW5kcztcbiAgICBsZXQgcHJvcGVydHlkaXY7XG4gICAgbGV0IHByb3BlcnR5aWNvbjtcbiAgICBsZXQgbWM7XG5cbiAgICBsZXQgc2V0dGluZ3MgPSB7XG4gICAgICAgIHByb3BlcnR5TWFya2VyczogW10sXG4gICAgICAgIGZpbHRlcklkczogW10sXG4gICAgICAgIG1hcE1hcmtlcnM6IFtdLFxuICAgICAgICBtYXBUeXBlSWQ6ICcnLFxuICAgICAgICBtYXBab29tOiAxMixcbiAgICAgICAgbWFwTWF4Wm9vbTogMjAsXG4gICAgICAgIG1hcFR5cGU6ICcnLFxuICAgICAgICBtYXBJZDogJycsXG4gICAgICAgIG1hcmtlckNvbG9yOiAncmVkJyxcbiAgICB9O1xuXG4gICAgY2xhc3MgS3JtYXAge1xuICAgICAgICBjb25zdHJ1Y3RvcihzZXR0aW5ncykge1xuICAgICAgICAgICAgdGhpcy5zZXR0aW5ncyA9IHNldHRpbmdzO1xuICAgICAgICAgICAgLy9Jbml0aWFsaXNlIG1hcCBvcHRpb25zXG4gICAgICAgICAgICB0aGlzLmdtT3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICBzY3JvbGx3aGVlbDogZmFsc2UsXG4gICAgICAgICAgICAgICAgem9vbTogdGhpcy5zZXR0aW5ncy5tYXBab29tLFxuICAgICAgICAgICAgICAgIG1heFpvb206IHRoaXMuc2V0dGluZ3MubWFwTWF4Wm9vbSxcbiAgICAgICAgICAgICAgICBtYXBUeXBlSWQ6IHRoaXMuc2V0dGluZ3MubWFwVHlwZUlkLFxuICAgICAgICAgICAgICAgIHN0cmVldFZpZXdDb250cm9sOiBmYWxzZVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy5nbWFya2VycyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5jb3VudCA9IDA7XG4gICAgICAgICAgICB0aGlzLmluaXRNYXAoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRpYyBjbG9zZUtySW5mb3dpbmRvdygpIHtcbiAgICAgICAgICAgICQoJyNrci1pbmZvd2luZG93JykuaGlkZSgpO1xuICAgICAgICAgICAgaW5mb1dpbmRvdy5jbG9zZSgpO1xuICAgICAgICAgICAgaW5mb1dpbmRvdzIuY2xvc2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG9ubHkgc2hvdyB2aXNpYmxlIG1hcmtlcnNcbiAgICAgICAgc3RhdGljIHNob3dWaXNpYmxlTWFya2VycyhtYXJrZXJzKSB7XG4gICAgICAgICAgICBsZXQgYm91bmRzID0gbWFwLmdldEJvdW5kcygpO1xuICAgICAgICAgICAgbGV0IGNvdW50ID0gMDtcblxuICAgICAgICAgICAgZm9yIChsZXQgZCA9IDA7IGQgPCBtYXJrZXJzLmxlbmd0aDsgZCsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IG1hcmtlciA9IG1hcmtlcnNbZF07XG4gICAgICAgICAgICAgICAgaWYgKG1hcmtlci50eXBlID09PSAnbWFwJykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoYm91bmRzLmNvbnRhaW5zKG1hcmtlci5nZXRQb3NpdGlvbigpKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFya2VyLnNldFZpc2libGUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb3VudCsrO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFya2VyLnNldFZpc2libGUoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gY291bnQ7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDaGVjayBNYXJrZXJzIGFycmF5IGZvciBkdXBsaWNhdGUgcG9zaXRpb24gYW5kIG9mZnNldCBhIGxpdHRsZVxuICAgICAgICBjaGVja0R1cGxpY2F0ZShjdXJyZW50KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5nbWFya2Vycy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgbGV0IGR1cHMgPSAwO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLmdtYXJrZXJzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcG9zID0gdGhpcy5nbWFya2Vyc1tpbmRleF0uZ2V0UG9zaXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnQuZXF1YWxzKHBvcykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGR1cHMrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhID0gMzYwLjAgLyBkdXBzO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld0xhdCA9IHBvcy5sYXQoKSArIC0uMDAwMDIgKiBNYXRoLmNvcygoK2EgKiBkdXBzKSAvIDE4MCAqIE1hdGguUEkpOyAgLy94XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV3TG5nID0gcG9zLmxuZygpICsgLS4wMDAwMCAqIE1hdGguc2luKCgrYSAqIGR1cHMpIC8gMTgwICogTWF0aC5QSSk7ICAvL1lcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKG5ld0xhdCwgbmV3TG5nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnQ7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjaGVja1pvb20oKSB7XG4gICAgICAgIC8vICAgICBpZiAodGhpcy5zZXR0aW5ncy5tYXBab29tID4gMCkge1xuICAgICAgICAvLyAgICAgICAgIGxldCBteWxpc3RlbmVyID0gbWFwLmFkZExpc3RlbmVyKCdpZGxlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyAgICAgICAgICAgICBpZiAobWFwLmdldFpvb20oKSAhPT0gdGhpcy5zZXR0aW5ncy5tYXBab29tKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBtYXAuc2V0Wm9vbSh0aGlzLnNldHRpbmdzLm1hcFpvb20pO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgbXlsaXN0ZW5lci5yZW1vdmUoKTtcbiAgICAgICAgLy8gICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgIH0pO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9XG5cbiAgICAgICAgY2x1c3Rlck1hcCgpIHtcbiAgICAgICAgICAgIGNvbnN0IG1jT3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICBncmlkU2l6ZTogNTAsXG4gICAgICAgICAgICAgICAgaWdub3JlSGlkZGVuTWFya2VyczogdHJ1ZSxcbiAgICAgICAgICAgICAgICBpbWFnZVBhdGg6ICcvbWVkaWEvY29tX2tub3dyZXMvaW1hZ2VzL21hcmtlcmNsdXN0ZXJlci9tJ1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgbWFwLm1heERlZmF1bHRab29tID0gdGhpcy5zZXR0aW5ncy5tYXBab29tO1xuICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MubWFwWm9vbSA+IDApIHtcbiAgICAgICAgICAgICAgICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lck9uY2UobWFwLCBcImJvdW5kc19jaGFuZ2VkXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRab29tKE1hdGgubWluKHRoaXMuZ2V0Wm9vbSgpLCB0aGlzLm1heERlZmF1bHRab29tKSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc2V0UHJvcGVydHlNYXJrZXJzKCk7XG4gICAgICAgICAgICB0aGlzLnNldE1hcE1hcmtlcnMoKTtcblxuICAgICAgICAgICAgZm9yIChsZXQgZCA9IDA7IGQgPCB0aGlzLmdtYXJrZXJzLmxlbmd0aDsgZCsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IG1hcmtlciA9IHRoaXMuZ21hcmtlcnNbZF07XG4gICAgICAgICAgICAgICAgaWYgKG1hcmtlci50eXBlID09PSAncHJvcGVydHknKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmZpbHRlcklkcy5pbmNsdWRlcyhtYXJrZXIucGlkKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFya2VyLnNldFZpc2libGUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXJrZXIuc2V0VmlzaWJsZShmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG1jID0gbmV3IE1hcmtlckNsdXN0ZXJlcihtYXAsIHRoaXMuZ21hcmtlcnMsIG1jT3B0aW9ucyk7XG4gICAgICAgICAgICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYywgXCJjbHVzdGVyY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICQoJyNrci1pbmZvd2luZG93JykuaGlkZSgpO1xuICAgICAgICAgICAgICAgIGluZm9XaW5kb3cuY2xvc2UoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBtYXAuZml0Qm91bmRzKGJvdW5kcyk7XG4gICAgICAgICAgICBtYXAuc2V0Q2VudGVyKGJvdW5kcy5nZXRDZW50ZXIoKSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDcmVhdGUgdGhlIE1hcFxuICAgICAgICBjcmVhdGVNYXAoKSB7XG4gICAgICAgICAgICBtYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuc2V0dGluZ3MubWFwSWQpLCB0aGlzLmdtT3B0aW9ucyk7XG4gICAgICAgICAgICBpbmZvV2luZG93ID0gbmV3IGdvb2dsZS5tYXBzLkluZm9XaW5kb3coKTtcbiAgICAgICAgICAgIGluZm9XaW5kb3cyID0gbmV3IGdvb2dsZS5tYXBzLkluZm9XaW5kb3coKTtcbiAgICAgICAgICAgIGJvdW5kcyA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmdCb3VuZHMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENyZWF0ZSB0aGUgbWFya2VyIGFuZCBzZXQgdXAgdGhlIGV2ZW50IHdpbmRvd1xuICAgICAgICBjcmVhdGVNYXBNYXJrZXIocG9pbnQsIGh0bWwsIGltYWdlLCBib3hpbmZvLCBsaW5rLCB0aXRsZSkge1xuICAgICAgICAgICAgbGV0IG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xuICAgICAgICAgICAgICAgIHNoYXBlOiBtYXJrZXJzaGFwZSxcbiAgICAgICAgICAgICAgICBsaW5rOiBsaW5rLFxuICAgICAgICAgICAgICAgIGljb246IGltYWdlLFxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBwb2ludCxcbiAgICAgICAgICAgICAgICB0aXRsZTogdGl0bGUsXG4gICAgICAgICAgICAgICAgbWFwOiBtYXAsXG4gICAgICAgICAgICAgICB6SW5kZXg6IDk5OVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKG1hcmtlciwgJ21vdXNlb3ZlcicsIChmdW5jdGlvbiAoaHRtbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGluZm9XaW5kb3cyLnNldENvbnRlbnQoaHRtbCk7XG4gICAgICAgICAgICAgICAgICAgIGluZm9XaW5kb3cyLm9wZW4obWFwLCBtYXJrZXIpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KShodG1sKSk7XG5cbiAgICAgICAgICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKG1hcmtlciwgJ21vdXNlb3V0JywgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpbmZvV2luZG93Mi5jbG9zZSgpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KSgpKTtcblxuICAgICAgICAgICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIobWFya2VyLCAnY2xvc2VjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpbmZvV2luZG93Mi5jbG9zZSgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuZ21hcmtlcnMucHVzaChtYXJrZXIpO1xuXG4gICAgICAgICAgICB0aGlzLmNvdW50Kys7XG4gICAgICAgIH1cblxuICAgICAgICBjcmVhdGVQcm9wZXJ0eU1hcmtlcihwb2ludCwgaHRtbCwgYm94aW5mbywgbGluaywgdGl0bGUsIGNvbG9yLCBpZCwgaW1hZ2UsIHBpZCkge1xuICAgICAgICAgICAgbGV0IG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBwb2ludCxcbiAgICAgICAgICAgICAgICBsaW5rOiBsaW5rLFxuICAgICAgICAgICAgICAgIG1hcDogbWFwLFxuICAgICAgICAgICAgICAgIGljb246IGltYWdlLFxuICAgICAgICAgICAgICAgIHRpdGxlOiB0aXRsZSxcbiAgICAgICAgICAgICAgICBwaWQ6IHBpZCxcbiAgICAgICAgICAgICAgICB0eXBlOiAncHJvcGVydHknLFxuICAgICAgICAgICAgICAgIHpJbmRleDogdGhpcy5jb3VudCArIDEwMDBcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBwcm9wZXJ0eWRpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcbiAgICAgICAgICAgIG1hcmtlci5hZGRMaXN0ZW5lcignbW91c2Vkb3duJywgKGZ1bmN0aW9uIChib3hpbmZvKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5mb1dpbmRvdy5jbG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICAkKCcja3ItaW5mb3dpbmRvdycpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgaW5mb1dpbmRvdy5zZXRDb250ZW50KGh0bWwpO1xuICAgICAgICAgICAgICAgICAgICBpbmZvV2luZG93Lm9wZW4obWFwLCBtYXJrZXIpO1xuXG4gICAgICAgICAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJy9pbmRleC5waHA/b3B0aW9uPWNvbV9rbm93cmVzJnRhc2s9cHJvcGVydHkubWFwaW5mb3dpbmRvdycsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHBhcnNlSW50KGJveGluZm8pXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcja3ItaW5mb3dpbmRvdycpLmZhZGVJbig0MDApLmh0bWwoZGF0YSkuc2hvdygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIua3ItaW5mb3dpbmRvdy1zbGlkZXNob3dcIikubm90KCcuc2xpY2staW5pdGlhbGl6ZWQnKS5zbGljayh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHRBcnJvdzogJzxpIGNsYXNzPVwic2xpY2stbmF2IG5leHQgZmEtc29saWQgZmEtY2hldnJvbi1yaWdodCBcIj48L2k+JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJldkFycm93OiAnPGkgY2xhc3M9XCJzbGljay1uYXYgcHJldiBmYS1zb2xpZCBmYS1jaGV2cm9uLWxlZnQgXCI+PC9pPicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KShib3hpbmZvKSk7XG5cbiAgICAgICAgICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKG1hcmtlciwgJ2Nsb3NlY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgJCgnI2tyLWluZm93aW5kb3cnKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgaW5mb1dpbmRvdy5jbG9zZSgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuZ21hcmtlcnMucHVzaChtYXJrZXIpO1xuICAgICAgICAgICAgYm91bmRzLmV4dGVuZChwb2ludCk7XG5cbiAgICAgICAgICAgIHRoaXMuY291bnQrKztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vSW5pdGlhbGlzZSBtYXBcbiAgICAgICAgaW5pdE1hcCgpIHtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlTWFwKCk7XG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5tYXBUeXBlID09PSAnY2x1c3RlcicpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsdXN0ZXJNYXAoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zb2xvTWFwKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZXNldCBtYXAgdG8gaW5pdGlhbCBzdGF0ZVxuICAgICAgICByZWZyZXNoTWFwKCRtYXBtb2RhbCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MubWFwVHlwZSA9PT0gJ3NvbG8nKVxuICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgalF1ZXJ5LmFqYXgoe1xuICAgICAgICAgICAgICAgIHVybDogJy9pbmRleC5waHA/b3B0aW9uPWNvbV9rbm93cmVzJnRhc2s9cHJvcGVydGllcy5yZWZyZXNobWFwJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXR0aW5ncy5maWx0ZXJJZHMgPSByZXN1bHQuZGF0YS5maWx0ZXJJZHM7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBkID0gMDsgZCA8IHNlbGYuZ21hcmtlcnMubGVuZ3RoOyBkKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbWFya2VyID0gc2VsZi5nbWFya2Vyc1tkXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobWFya2VyLnR5cGUgPT09ICdwcm9wZXJ0eScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGYuc2V0dGluZ3MuZmlsdGVySWRzLmluY2x1ZGVzKG1hcmtlci5waWQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJrZXIuc2V0VmlzaWJsZSh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtlci5zZXRWaXNpYmxlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgbWMucmVwYWludCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEZvdW5kYXRpb24uUmV2ZWFsKCRtYXBtb2RhbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkbWFwbW9kYWwuZm91bmRhdGlvbignb3BlbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZ29vZ2xlLm1hcHMuZXZlbnQudHJpZ2dlcihtYXAsICdyZXNpemUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRtYXBtb2RhbC5mb3VuZGF0aW9uKCdvcGVuJyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuYWxlcnQocmVzdWx0Lm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZXNldCBtYXAgdG8gaW5pdGlhbCBzdGF0ZVxuICAgICAgICByZXNldE1hcCgpIHtcbiAgICAgICAgICAgIGluZm9XaW5kb3cuY2xvc2UoKTtcbiAgICAgICAgICAgIGluZm9XaW5kb3cyLmNsb3NlKCk7XG4gICAgICAgICAgICAkKCcja3ItaW5mb3dpbmRvdycpLmhpZGUoKTtcbiAgICAgICAgICAgIG1hcC5maXRCb3VuZHMoYm91bmRzKTtcbiAgICAgICAgICAgIG1hcC5zZXRDZW50ZXIoYm91bmRzLmdldENlbnRlcigpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGxvb3AgdG8gc2V0IG1hcCBtYXJrZXJzXG4gICAgICAgIHNldE1hcE1hcmtlcnMoKSB7XG4gICAgICAgICAgICBsZXQgcG9pbnQ7XG4gICAgICAgICAgICBsZXQgYW1hcms7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGQgPSAwOyBkIDwgdGhpcy5zZXR0aW5ncy5tYXBNYXJrZXJzLmxlbmd0aDsgZCsrKSB7XG4gICAgICAgICAgICAgICAgYW1hcmsgPSB0aGlzLnNldHRpbmdzLm1hcE1hcmtlcnNbZF07XG4gICAgICAgICAgICAgICAgbGV0IG1hcmtlcmljb24gPSB7XG4gICAgICAgICAgICAgICAgICAgIHVybDogYW1hcmtbJ2ljb24nXSxcbiAgICAgICAgICAgICAgICAgICAgc2l6ZTogbmV3IGdvb2dsZS5tYXBzLlNpemUoMzIsIDM3KSxcbiAgICAgICAgICAgICAgICAgICAgLy8gT1Igc2NhbGVkU2l6ZTogbmV3IGdvb2dsZS5tYXBzLlNpemUoNDAsIDQ3KVxuICAgICAgICAgICAgICAgICAgICBvcmlnaW46IG5ldyBnb29nbGUubWFwcy5Qb2ludCgwLCAwKSxcbiAgICAgICAgICAgICAgICAgICAgYW5jaG9yOiBuZXcgZ29vZ2xlLm1hcHMuUG9pbnQoMCwgMTgpXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHBvaW50ID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhhbWFya1snbGF0J10sIGFtYXJrWydsbmcnXSk7XG4gICAgICAgICAgICAgICAgcG9pbnQgPSB0aGlzLmNoZWNrRHVwbGljYXRlKHBvaW50KTtcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZU1hcE1hcmtlcihwb2ludCwgYW1hcmtbJ2h0bWwnXSwgbWFya2VyaWNvbiwgJycsICcnLCBhbWFya1sndGl0bGUnXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBsb29wIHRvIHNldCBwcm9wZXJ0eSBtYXJrZXJzXG4gICAgICAgIHNldFByb3BlcnR5TWFya2VycygpIHtcbiAgICAgICAgICAgIGxldCBwb2ludDtcbiAgICAgICAgICAgIGxldCBhbWFyaztcblxuICAgICAgICAgICAgZm9yIChsZXQgZCA9IDA7IGQgPCB0aGlzLnNldHRpbmdzLnByb3BlcnR5TWFya2Vycy5sZW5ndGg7IGQrKykge1xuICAgICAgICAgICAgICAgIGFtYXJrID0gdGhpcy5zZXR0aW5ncy5wcm9wZXJ0eU1hcmtlcnNbZF07XG4gICAgICAgICAgICAgICAgaWYgKCFkKSB7XG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnR5aWNvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogYW1hcmtbJ2ljb24nXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpemU6IG5ldyBnb29nbGUubWFwcy5TaXplKDMyLCAzNyksXG4gICAgICAgICAgICAgICAgICAgICAgICBvcmlnaW46IG5ldyBnb29nbGUubWFwcy5Qb2ludCgwLCAwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuY2hvcjogbmV3IGdvb2dsZS5tYXBzLlBvaW50KDAsIDIwKVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHBvaW50ID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhhbWFya1snbGF0J10sIGFtYXJrWydsbmcnXSk7XG4gICAgICAgICAgICAgICAgcG9pbnQgPSB0aGlzLmNoZWNrRHVwbGljYXRlKHBvaW50KTtcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVByb3BlcnR5TWFya2VyKHBvaW50LCBhbWFya1snaHRtbCddLCBhbWFya1snYm94aW5mbyddLCBhbWFya1snbGluayddLCBhbWFya1sndGl0bGUnXSxcbiAgICAgICAgICAgICAgICAgICAgYW1hcmtbJ2NvbG9yJ10sIGFtYXJrWydpZCddLCBwcm9wZXJ0eWljb24sIGFtYXJrWydwaWQnXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBzb2xvTWFwKCkge1xuICAgICAgICAgICAgdGhpcy5zZXRQcm9wZXJ0eU1hcmtlcnMoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0TWFwTWFya2VycygpO1xuXG4gICAgICAgICAgICBtYXAuZml0Qm91bmRzKGJvdW5kcyk7XG4gICAgICAgICAgICBtYXAuc2V0Q2VudGVyKGJvdW5kcy5nZXRDZW50ZXIoKSk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLm1hcE1hcmtlcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuXG4gICAgICAgICAgICAgICAgbGV0IG15TGlzdGVuZXIgPSBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYXAsICdpZGxlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZm91bmQgPSAwO1xuICAgICAgICAgICAgICAgICAgICBsZXQgY3VycmVudFpvb20gPSBtYXAuZ2V0Wm9vbSgpO1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoIWZvdW5kKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3VuZCA9IEtybWFwLnNob3dWaXNpYmxlTWFya2VycyhzZWxmLmdtYXJrZXJzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmb3VuZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG15TGlzdGVuZXIucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwLnNldFpvb20oY3VycmVudFpvb20pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFpvb20gPSBjdXJyZW50Wm9vbSAtIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudFpvb20gPCAxMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAkKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0ICRtYXBtb2RhbDtcblxuICAgICAgICAkKCdib2R5Jykub24oJ2NsaWNrJywgJy5tYXAtdHJpZ2dlcicsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBpZiAobWFwRGF0YSkge1xuICAgICAgICAgICAgICAgIG15S3JtYXAucmVmcmVzaE1hcCgkbWFwbW9kYWwpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBraWNrTWFwKCQodGhpcykpO1xuICAgICAgICAgICAgICAgICRtYXBtb2RhbCA9ICQoJyNrci1zZWFyY2gtbWFwLW1vZGFsJyk7XG4gICAgICAgICAgICAgICAgaWYgKCRtYXBtb2RhbC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgJG1hcG1vZGFsLmZvdW5kYXRpb24oJ29wZW4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLm9uKCdjbGljaycsICcucmVzZXRtYXAnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgbXlLcm1hcC5yZXNldE1hcCgpO1xuICAgICAgICB9KS5vbignY2xpY2snLCAnI2tyLXNlYXJjaC1tYXAtZnVsbC1pbmZvd2luZG93LWNsb3NlJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIEtybWFwLmNsb3NlS3JJbmZvd2luZG93KCk7XG4gICAgICAgIH0pLm9uKCdjbGljaycsICcuY2xvc2VtYXAnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgJG1hcG1vZGFsLmZvdW5kYXRpb24oJ2Nsb3NlJyk7XG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgICAgIHVybDogJy9pbmRleC5waHA/b3B0aW9uPWNvbV9rbm93cmVzJnRhc2s9cHJvcGVydGllcy5tYXBzZXNzaW9uJyxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICQoJy5rci1zZWFyY2hiYXIgLmJ1dHRvbi5tYXAnKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KS5vbignb3Blbi56Zi5yZXZlYWwnLCAnI2tyLXNlYXJjaC1tYXAtbW9kYWwnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgJCgnI2tyLXNlYXJjaC1tYXAtZnVsbCcpLmhlaWdodCgkKCcja3Itc2VhcmNoLW1hcC1tb2RhbCcpLmhlaWdodCgpKTtcbiAgICAgICAgICAgIGdvb2dsZS5tYXBzLmV2ZW50LnRyaWdnZXIobWFwLCBcInJlc2l6ZVwiKTtcbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICAgICAgdXJsOiAnL2luZGV4LnBocD9vcHRpb249Y29tX2tub3dyZXMmdGFzaz1wcm9wZXJ0aWVzLm1hcHNlc3Npb24nLFxuICAgICAgICAgICAgICAgIGRhdGE6IHttYXBfbW9kYWw6ICcxJ30sXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gRG9lc24ndCB0cmlnZ2VyIGlmIGluY2x1ZGVkIGFib3ZlID8/XG4gICAgICAgIGlmICghbWFwRGF0YSkge1xuICAgICAgICAgICAgY29uc3QgJHNvbG9UcmlnZ2VyID0gJCgnI2tyLW1hcC1zb2xvLXRyaWdnZXInKTtcbiAgICAgICAgICAgICRzb2xvVHJpZ2dlci5vbmUoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGtpY2tNYXAoJHNvbG9UcmlnZ2VyKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAod2luZG93LmxvY2F0aW9uLmhyZWYuaW5kZXhPZignI21hcCcpICE9PSAtMSAmJiAkc29sb1RyaWdnZXIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAga2lja01hcCgkc29sb1RyaWdnZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gVGVzdCBmb3IgZm9yY2UgbWFwXG4gICAgICAgIGNvbnN0ICRtdHJpZ2dlciA9ICQoJy5tYXAtdHJpZ2dlcicpO1xuICAgICAgICBpZiAoJG10cmlnZ2VyLmxlbmd0aCAmJiAkbXRyaWdnZXIuZGF0YSgnZm9yY2VtYXAnKSkge1xuICAgICAgICAgICAgICRtdHJpZ2dlci50cmlnZ2VyKCdjbGljaycpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24ga2lja01hcCgkZWxlbSkge1xuICAgICAgICAgICAgY29uc3QgdHlwZSA9ICRlbGVtLmRhdGEoJ3R5cGUnKTtcbiAgICAgICAgICAgIGxldCBwaWQgPSAwO1xuICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdzb2xvJykge1xuICAgICAgICAgICAgICAgIHBpZCA9ICRlbGVtLmRhdGEoJ3BpZCcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBqUXVlcnkuYWpheCh7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2luZGV4LnBocD9vcHRpb249Y29tX2tub3dyZXMmdGFzaz1wcm9wZXJ0aWVzLm1hcGRhdGEmcGlkPScgKyBwaWQsXG4gICAgICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6IFwianNvblwiLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5ncyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXBJZDogJGVsZW0uZGF0YSgndGFyZ2V0JyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwVHlwZTogJGVsZW0uZGF0YSgndHlwZScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcFR5cGVJZDogJGVsZW0uZGF0YSgnbWFwdHlwZWlkJyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwWm9vbTogcGFyc2VJbnQoJGVsZW0uZGF0YSgnem9vbScpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXBNYXhab29tOiBwYXJzZUludCgkZWxlbS5kYXRhKCd6b29tbWF4JykpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnR5TWFya2VyczogcmVzdWx0LmRhdGEucHJvcGVydHlNYXJrZXJzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcE1hcmtlcnM6IHJlc3VsdC5kYXRhLm1hcE1hcmtlcnMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVySWRzOiByZXN1bHQuZGF0YS5maWx0ZXJJZHNcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIG15S3JtYXAgPSBuZXcgS3JtYXAoc2V0dGluZ3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFwRGF0YSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuYWxlcnQocmVzdWx0Lm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn0oalF1ZXJ5KSk7IiwiLyoqXG4gKiBAcGFja2FnZSAgICBLbm93IFJlc2VydmF0aW9uc1xuICogQHN1YnBhY2thZ2UgU2l0ZSBKU1xuICogQGNvcHlyaWdodCAgMjAyMCBIaWdobGFuZCBWaXNpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBAbGljZW5zZSAgICBTZWUgdGhlIGZpbGUgXCJMSUNFTlNFLnR4dFwiIGZvciB0aGUgZnVsbCBsaWNlbnNlIGdvdmVybmluZyB0aGlzIGNvZGUuXG4gKiBAYXV0aG9yICAgICBIYXplbCBXaWxzb24gPGhhemVsQGhpZ2hsYW5kdmlzaW9uLmNvbT5cbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgkKSB7XG5cdGxldCBteUtycm91dGU7XG5cdGxldCBkaXJlY3Rpb25zRGlzcGxheTtcblx0bGV0IGRpcmVjdGlvbnNWaXNpYmxlID0gZmFsc2U7XG5cdGxldCByb3V0ZU1hcDtcblx0bGV0IG9yaWdpbjtcblx0bGV0IGRlc3RpbmF0aW9uO1xuXHRsZXQgcm91dGVNYXJrZXJzID0gW107XG5cdGxldCByb3V0ZVN0b3BQb2ludHMgPSBbXTtcblx0bGV0IHBvaW50O1xuXHRsZXQgc2VsZjtcblxuXHRsZXQgc2V0dGluZ3MgPSB7XG5cdFx0bGF0OiAgICAgICAgICAgICAgIFwiXCIsXG5cdFx0bG5nOiAgICAgICAgICAgICAgIFwiXCIsXG5cdFx0bmFtZTogICAgICAgICAgICAgIFwiXCIsXG5cdFx0aWNvbjogICAgICAgICAgICAgIFwiXCIsXG5cdFx0ZGV0b3VyOiAgICAgICAgICAgIFwiXCIsXG5cdFx0bWFwWm9vbTogICAgICAgICAgIDksXG5cdFx0bWFwTWF4Wm9vbTogICAgICAgIDE4LFxuXHRcdG1hcFR5cGVJZDogICAgICAgICBcInJvYWRtYXBcIixcblx0XHRtYXBJZDogICAgICAgICAgICAgXCJrci1tYXAtcm91dGVcIixcblx0XHRkaXJlY3Rpb25zUGFuZWw6ICAgXCJrci1kaXJlY3Rpb25zLXBhbmVsXCIsXG5cdFx0ZGlyZWN0aW9uc1NlcnZpY2U6IG51bGxcblx0fTtcblxuXHRjbGFzcyBLcnJvdXRlIHtcblx0XHRjb25zdHJ1Y3RvcigkZWxlbWVudCwgb3B0aW9ucykge1xuXHRcdFx0dGhpcy5zZXR0aW5ncyA9IHNldHRpbmdzO1xuXHRcdFx0aWYgKG9wdGlvbnMpIHtcblx0XHRcdFx0JC5leHRlbmQodGhpcy5zZXR0aW5ncywgb3B0aW9ucyk7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuc2V0dGluZ3MuZGlyZWN0aW9uc1NlcnZpY2UgPSBuZXcgZ29vZ2xlLm1hcHMuRGlyZWN0aW9uc1NlcnZpY2UoKTtcblx0XHRcdHRoaXMuaW5pdCgpO1xuXHRcdH1cblxuXHRcdHN0YXRpYyBjbGVhclJvdXRlTWFya2VycygpIHtcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcm91dGVNYXJrZXJzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdHJvdXRlTWFya2Vyc1tpXS5zZXRNYXAobnVsbCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0c3RhdGljIGNsZWFyV2F5cG9pbnRzKCkge1xuXHRcdFx0b3JpZ2luID0gbnVsbDtcblx0XHRcdHJvdXRlTWFya2VycyA9IFtdO1xuXHRcdFx0cm91dGVTdG9wUG9pbnRzID0gW107XG5cdFx0XHRkaXJlY3Rpb25zVmlzaWJsZSA9IGZhbHNlO1xuXHRcdH1cblxuXHRcdGFkZFJvdXRlTWFya2VyKGxhdGxuZykge1xuXHRcdFx0cm91dGVNYXJrZXJzLnB1c2gobmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XG5cdFx0XHRcdHBvc2l0aW9uOiBsYXRsbmcsXG5cdFx0XHRcdG1hcDogICAgICByb3V0ZU1hcCxcblx0XHRcdFx0aWNvbjogICAgIHRoaXMuc2V0dGluZ3MuZGV0b3VyXG5cdFx0XHR9KSk7XG5cdFx0fVxuXG5cdFx0Ly9cblx0XHQvLyBhZGRQcm9wZXJ0eU1hcmtlcihwb2ludCwgaHRtbCwgaW1hZ2UsIGJveGluZm8pIHtcblx0XHQvLyBcdGxldCBtYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcblx0XHQvLyBcdFx0cG9zaXRpb246IHBvaW50LFxuXHRcdC8vIFx0XHRodG1sOiAgICAgaHRtbCxcblx0XHQvLyBcdFx0bWFwOiAgICAgIHJvdXRlTWFwLFxuXHRcdC8vIFx0XHRpY29uOiAgICAgaW1hZ2UsXG5cdFx0Ly8gXHRcdHpJbmRleDogICAxXG5cdFx0Ly8gXHR9KTtcblx0XHQvL1xuXHRcdC8vIFx0bGV0IGluZm93aW5kb3cgPSBuZXcgZ29vZ2xlLm1hcHMuSW5mb1dpbmRvdyh7XG5cdFx0Ly8gXHRcdGNvbnRlbnQ6IGJveGluZm9cblx0XHQvLyBcdH0pO1xuXHRcdC8vXG5cdFx0Ly8gXHRnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYXJrZXIsICdjbGljaycsIGZ1bmN0aW9uICgpIHtcblx0XHQvLyBcdFx0Ly8gQ2hlY2sgdG8gc2VlIGlmIHRoZXJlIGlzIGFuIGluZm8gd2luZG93IHN0b3JlZCBpbiByb3V0ZUN1cnJJbmZvV2luZG93LFxuXHRcdC8vIFx0XHQvLyBpZiB0aGVyZSBpcywgd2UgdXNlIC5jbG9zZSgpIHRvIGhpZGUgdGhlIHdpbmRvd1xuXHRcdC8vIFx0XHRpZiAocm91dGVDdXJySW5mb1dpbmRvdykge1xuXHRcdC8vIFx0XHRcdHJvdXRlQ3VyckluZm9XaW5kb3cuY2xvc2UoKTtcblx0XHQvLyBcdFx0fVxuXHRcdC8vIFx0XHQvLyBQdXQgb3VyIG5ldyBpbmZvIHdpbmRvdyBpbiB0byB0aGUgcm91dGVDdXJySW5mb1dpbmRvdyB2YXJpYWJsZVxuXHRcdC8vIFx0XHRyb3V0ZUN1cnJJbmZvV2luZG93ID0gaW5mb3dpbmRvdztcblx0XHQvLyBcdFx0Ly8gT3BlbiB0aGUgd2luZG93XG5cdFx0Ly8gXHRcdGluZm93aW5kb3cub3Blbihyb3V0ZU1hcCwgbWFya2VyKTtcblx0XHQvLyBcdH0pO1xuXHRcdC8vXG5cdFx0Ly8gXHQvL2dtYXJrZXJzLnB1c2goIG1hcmtlciApO1xuXHRcdC8vIFx0cm91dGVNYXJrZXJzLnB1c2gobWFya2VyKTtcblx0XHQvLyB9XG5cblx0XHQvLyBzdGF0aWMgdXBkYXRlTW9kZSgpIHtcblx0XHQvLyBcdGlmIChkaXJlY3Rpb25zVmlzaWJsZSkge1xuXHRcdC8vIFx0XHR0aGlzLmNhbGNSb3V0ZSgpO1xuXHRcdC8vIFx0fVxuXHRcdC8vIH1cblxuXHRcdGNhbGNSb3V0ZSgpIHtcblx0XHRcdGxldCBmcm9tX2FkZHJlc3MgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZyb21fYWRkcmVzc1wiKS52YWx1ZTtcblx0XHRcdGxldCBvcmlnaW4gPSBcIlwiO1xuXG5cdFx0XHRpZiAoZnJvbV9hZGRyZXNzID09PSBcIkFkZHJlc3NcIikgZnJvbV9hZGRyZXNzID0gXCJcIjtcblx0XHRcdGlmIChmcm9tX2FkZHJlc3MpIG9yaWdpbiA9IGZyb21fYWRkcmVzcyArIFwiLFwiICsgXCJcIjtcblxuXHRcdFx0bGV0IG1vZGU7XG5cdFx0XHRzd2l0Y2ggKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW9kZVwiKS52YWx1ZSkge1xuXHRcdFx0XHRjYXNlIFwiYmljeWNsaW5nXCI6XG5cdFx0XHRcdFx0bW9kZSA9IGdvb2dsZS5tYXBzLkRpcmVjdGlvbnNUcmF2ZWxNb2RlLkJJQ1lDTElORztcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcImRyaXZpbmdcIjpcblx0XHRcdFx0XHRtb2RlID0gZ29vZ2xlLm1hcHMuRGlyZWN0aW9uc1RyYXZlbE1vZGUuRFJJVklORztcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcIndhbGtpbmdcIjpcblx0XHRcdFx0XHRtb2RlID0gZ29vZ2xlLm1hcHMuRGlyZWN0aW9uc1RyYXZlbE1vZGUuV0FMS0lORztcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0aWYgKG9yaWdpbikge1xuXHRcdFx0XHRsZXQgcmVxdWVzdCA9IHtcblx0XHRcdFx0XHRvcmlnaW46ICAgICAgICBvcmlnaW4sXG5cdFx0XHRcdFx0ZGVzdGluYXRpb246ICAgZGVzdGluYXRpb24sXG5cdFx0XHRcdFx0d2F5cG9pbnRzOiAgICAgcm91dGVTdG9wUG9pbnRzLFxuXHRcdFx0XHRcdHRyYXZlbE1vZGU6ICAgIG1vZGUsXG5cdFx0XHRcdFx0YXZvaWRIaWdod2F5czogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hpZ2h3YXlzJykuY2hlY2tlZCxcblx0XHRcdFx0XHRhdm9pZFRvbGxzOiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9sbHMnKS5jaGVja2VkXG5cdFx0XHRcdH07XG5cblx0XHRcdFx0c2VsZiA9IHRoaXM7XG5cdFx0XHRcdHRoaXMuc2V0dGluZ3MuZGlyZWN0aW9uc1NlcnZpY2Uucm91dGUocmVxdWVzdCwgZnVuY3Rpb24gKHJlc3BvbnNlLCBzdGF0dXMpIHtcblx0XHRcdFx0XHRpZiAoc3RhdHVzID09PSBnb29nbGUubWFwcy5EaXJlY3Rpb25zU3RhdHVzLk9LKSB7XG5cdFx0XHRcdFx0XHRkaXJlY3Rpb25zRGlzcGxheS5zZXREaXJlY3Rpb25zKHJlc3BvbnNlKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0YWxlcnQoXCJHb29nbGUgY291bGRuYHQgY2FsY3VsYXRlIGRpcmVjdGlvbnMgZm9yIHRoaXMgcm91dGUgYW5kIHNlbGVjdGVkIG9wdGlvbnNcIik7XG5cdFx0XHRcdFx0XHRzZWxmLnJlc2V0Um91dGUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXG5cdFx0XHRLcnJvdXRlLmNsZWFyUm91dGVNYXJrZXJzKCk7XG5cdFx0XHRkaXJlY3Rpb25zVmlzaWJsZSA9IHRydWU7XG5cdFx0fVxuXG5cdFx0aW5pdCgpIHtcblx0XHRcdGRlc3RpbmF0aW9uID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyh0aGlzLnNldHRpbmdzLmxhdCwgdGhpcy5zZXR0aW5ncy5sbmcpO1xuXG5cdFx0XHQvL0luaXRpYWxpc2UgbWFwIG9wdGlvbnNcblx0XHRcdHRoaXMubXlPcHRpb25zID0ge1xuXHRcdFx0XHRzY3JvbGx3aGVlbDogICAgICAgZmFsc2UsXG5cdFx0XHRcdHpvb206ICAgICAgICAgICAgICB0aGlzLnNldHRpbmdzLm1hcFpvb20sXG5cdFx0XHRcdG1heFpvb206ICAgICAgICAgICB0aGlzLnNldHRpbmdzLm1hcE1heFpvb20sXG5cdFx0XHRcdG1hcFR5cGVJZDogICAgICAgICB0aGlzLnNldHRpbmdzLm1hcFR5cGVJZCxcblx0XHRcdFx0c3RyZWV0Vmlld0NvbnRyb2w6IGZhbHNlLFxuXHRcdFx0XHRjZW50ZXI6ICAgICAgICAgICAgZGVzdGluYXRpb25cblx0XHRcdH07XG5cblx0XHRcdHJvdXRlTWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnNldHRpbmdzLm1hcElkKSwgdGhpcy5teU9wdGlvbnMpO1xuXHRcdFx0ZGlyZWN0aW9uc0Rpc3BsYXkgPSBuZXcgZ29vZ2xlLm1hcHMuRGlyZWN0aW9uc1JlbmRlcmVyKCk7XG5cdFx0XHRkaXJlY3Rpb25zRGlzcGxheS5zZXRNYXAocm91dGVNYXApO1xuXHRcdFx0ZGlyZWN0aW9uc0Rpc3BsYXkuc2V0UGFuZWwoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5zZXR0aW5ncy5kaXJlY3Rpb25zUGFuZWwpKTtcblxuXHRcdFx0Y29uc3QgaW1hZ2UgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VySW1hZ2UodGhpcy5zZXR0aW5ncy5pY29uKTtcblx0XHRcdHBvaW50ID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyh0aGlzLnNldHRpbmdzLmxhdCwgdGhpcy5zZXR0aW5ncy5sbmcpO1xuXG5cdFx0XHRzZWxmID0gdGhpcztcblx0XHRcdGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKHJvdXRlTWFwLCAnY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRcdFx0aWYgKHJvdXRlU3RvcFBvaW50cy5sZW5ndGggPCA5KSB7XG5cdFx0XHRcdFx0cm91dGVTdG9wUG9pbnRzLnB1c2goe2xvY2F0aW9uOiBldmVudC5sYXRMbmcsIHN0b3BvdmVyOiB0cnVlfSk7XG5cdFx0XHRcdFx0cG9pbnQgPSBldmVudC5sYXRMbmc7XG5cdFx0XHRcdFx0c2VsZi5hZGRSb3V0ZU1hcmtlcihwb2ludCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0YWxlcnQoXCJNYXhpbXVtIG51bWJlciBvZiA5IHdheXBvaW50cyByZWFjaGVkXCIpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0c2VsZiA9IHRoaXM7XG5cdFx0XHRnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lck9uY2Uocm91dGVNYXAsICdpZGxlJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRnb29nbGUubWFwcy5ldmVudC50cmlnZ2VyKHJvdXRlTWFwLCAncmVzaXplJyk7XG5cdFx0XHRcdHNlbGYuY2FsY1JvdXRlKCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRyZXNldFJvdXRlKCkge1xuXHRcdFx0S3Jyb3V0ZS5jbGVhclJvdXRlTWFya2VycygpO1xuXHRcdFx0S3Jyb3V0ZS5jbGVhcldheXBvaW50cygpO1xuXHRcdFx0ZGlyZWN0aW9uc0Rpc3BsYXkuc2V0TWFwKG51bGwpO1xuXHRcdFx0ZGlyZWN0aW9uc0Rpc3BsYXkuc2V0UGFuZWwobnVsbCk7XG5cdFx0XHRkaXJlY3Rpb25zRGlzcGxheSA9IG5ldyBnb29nbGUubWFwcy5EaXJlY3Rpb25zUmVuZGVyZXIoKTtcblx0XHRcdGRpcmVjdGlvbnNEaXNwbGF5LnNldE1hcChyb3V0ZU1hcCk7XG5cdFx0XHRkaXJlY3Rpb25zRGlzcGxheS5zZXRQYW5lbChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnNldHRpbmdzLmRpcmVjdGlvblBhbmVsKSk7XG5cblx0XHRcdHRoaXMuaW5pdCgpO1xuXHRcdH1cblx0fVxuXG5cdCQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcblx0XHQkKFwiLmtyLWRpcmVjdGlvbnMtbW9kYWxcIikub24oJ2NsaWNrJywgJyNrci1tYXAtcm91dGUnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0bGV0ICRlbGVtZW50ID0gJCh0aGlzKTtcblx0XHRcdGNvbnN0IG9wdGlvbnMgPSB7XG5cdFx0XHRcdGxhdDogICAgJGVsZW1lbnQuZGF0YSgnbGF0JyksXG5cdFx0XHRcdGxuZzogICAgJGVsZW1lbnQuZGF0YSgnbG5nJyksXG5cdFx0XHRcdG5hbWU6ICAgJGVsZW1lbnQuZGF0YSgnbmFtZScpLFxuXHRcdFx0XHRpY29uOiAgICRlbGVtZW50LmRhdGEoJ2ljb24nKSxcblx0XHRcdFx0ZGV0b3VyOiAkZWxlbWVudC5kYXRhKCdkZXRvdXInKVxuXHRcdFx0fTtcblx0XHRcdG15S3Jyb3V0ZSA9IG5ldyBLcnJvdXRlKCRlbGVtZW50LCBvcHRpb25zKTtcblx0XHR9KS5vbignY2xpY2snLCAnLnJlc2V0cm91dGUnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0bXlLcnJvdXRlLnJlc2V0Um91dGUoKTtcblx0XHR9KS5vbignY2xpY2snLCAnLmNhbGNyb3V0ZScsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRteUtycm91dGUuY2FsY1JvdXRlKCk7XG5cdFx0fSk7XG5cblx0XHRqUXVlcnkoXCJhI2dlb2NvZGVBZGRyZXNzXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdGxldCBhZGRyZXNzU3RyaW5nID1cblx0XHRcdFx0ICAgIGpRdWVyeShcIiNqZm9ybV9wcm9wZXJ0eV9zdHJlZXRcIikudmFsKClcblx0XHRcdFx0ICAgICsgXCIsIFwiXG5cdFx0XHRcdCAgICArIGpRdWVyeSgnI2pmb3JtX3Rvd25faWQnKS5maW5kKFwiOnNlbGVjdGVkXCIpLnRleHQoKVxuXHRcdFx0XHQgICAgKyBcIiBcIlxuXHRcdFx0XHQgICAgKyBqUXVlcnkoXCIjamZvcm1fcHJvcGVydHlfcG9zdGNvZGVcIikudmFsKClcblx0XHRcdFx0ICAgICsgXCIsIFwiXG5cdFx0XHRcdCAgICArIGpRdWVyeSgnI2pmb3JtX3JlZ2lvbl9pZCcpLmZpbmQoXCI6c2VsZWN0ZWRcIikudGV4dCgpXG5cdFx0XHRcdCAgICArIFwiIFwiXG5cdFx0XHRcdCAgICArIGpRdWVyeSgnI2pmb3JtX2NvdW50cnlfaWQnKS5maW5kKFwiOnNlbGVjdGVkXCIpLnRleHQoKTtcblxuXHRcdFx0bGV0IHVybCA9ICdpbmRleC5waHA/b3B0aW9uPWNvbV9rbm93cmVzJnRhc2s9cHJvcGVydHkuZ2VvY29kZSc7XG5cdFx0XHRsZXQgY29vcmQgPSBbXTtcblxuXHRcdFx0alF1ZXJ5LmFqYXgoe1xuXHRcdFx0XHR0eXBlOiAgICAgXCJQT1NUXCIsXG5cdFx0XHRcdHVybDogICAgICB1cmwsXG5cdFx0XHRcdGRhdGE6ICAgICB7YWRkcmVzczogYWRkcmVzc1N0cmluZ30sXG5cdFx0XHRcdGRhdGFUeXBlOiBcImpzb25cIixcblx0XHRcdFx0c3VjY2VzczogIGZ1bmN0aW9uIChqc29uZGF0YSkge1xuXHRcdFx0XHRcdGpRdWVyeS5lYWNoKGpzb25kYXRhLCBmdW5jdGlvbiAoa2V5LCB2YWwpIHtcblx0XHRcdFx0XHRcdGxldCBkaXYgPSBcIiNcIiArIGtleTtcblx0XHRcdFx0XHRcdGpRdWVyeShkaXYpLnZhbCh2YWwpO1xuXHRcdFx0XHRcdFx0Y29vcmRba2V5XSA9IHZhbDtcblx0XHRcdFx0XHRcdG15R21hcC5yZWZyZXNoTWFwKGNvb3JkWydsYXQnXSwgY29vcmRbJ2xuZyddLCBmYWxzZSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9KTtcbn0oalF1ZXJ5KSk7IiwiLy8gS1IgQVBQIEpTIEZpbGVzXG5pbXBvcnQgJ25wbS9qcXVlcnktYmFyLXJhdGluZy9qcXVlcnkuYmFycmF0aW5nJztcbmltcG9ydCAnbnBtL2lzLW1hcmtlci1jbHVzdGVyZXInO1xuaW1wb3J0ICdtZWRpYWpzL3NpdGUvYXBwJztcbmltcG9ydCAnbWVkaWFqcy9zaXRlL2NvbmZpcm0nO1xuaW1wb3J0ICdtZWRpYWpzL3NpdGUvZG9iZW50cnknO1xuaW1wb3J0ICdtZWRpYWpzL3NpdGUvZ3Vlc3RkYXRhJztcbmltcG9ydCAnbWVkaWFqcy9zaXRlL21hZ2VsbGFuJztcbmltcG9ydCAnbWVkaWFqcy9zaXRlL21hcCc7XG5pbXBvcnQgJ21lZGlhanMvc2l0ZS9yb3V0ZSc7Il0sIm5hbWVzIjpbIk1hcmtlckNsdXN0ZXJlciIsIm1hcCIsIm9wdF9tYXJrZXJzIiwib3B0X29wdGlvbnMiLCJleHRlbmQiLCJnb29nbGUiLCJtYXBzIiwiT3ZlcmxheVZpZXciLCJtYXBfIiwibWFya2Vyc18iLCJjbHVzdGVyc18iLCJzaXplcyIsInN0eWxlc18iLCJyZWFkeV8iLCJvcHRpb25zIiwiZ3JpZFNpemVfIiwibWluQ2x1c3RlclNpemVfIiwibWF4Wm9vbV8iLCJpbWFnZVBhdGhfIiwiTUFSS0VSX0NMVVNURVJfSU1BR0VfUEFUSF8iLCJpbWFnZUV4dGVuc2lvbl8iLCJNQVJLRVJfQ0xVU1RFUl9JTUFHRV9FWFRFTlNJT05fIiwiem9vbU9uQ2xpY2tfIiwidW5kZWZpbmVkIiwiYXZlcmFnZUNlbnRlcl8iLCJzZXR1cFN0eWxlc18iLCJzZXRNYXAiLCJwcmV2Wm9vbV8iLCJnZXRab29tIiwidGhhdCIsImV2ZW50IiwiYWRkTGlzdGVuZXIiLCJ6b29tIiwicmVzZXRWaWV3cG9ydCIsInJlZHJhdyIsImxlbmd0aCIsImFkZE1hcmtlcnMiLCJwcm90b3R5cGUiLCJvYmoxIiwib2JqMiIsIm9iamVjdCIsInByb3BlcnR5IiwiYXBwbHkiLCJvbkFkZCIsInNldFJlYWR5XyIsImRyYXciLCJpIiwic2l6ZSIsInB1c2giLCJ1cmwiLCJoZWlnaHQiLCJ3aWR0aCIsImZpdE1hcFRvTWFya2VycyIsIm1hcmtlcnMiLCJnZXRNYXJrZXJzIiwiYm91bmRzIiwiTGF0TG5nQm91bmRzIiwibWFya2VyIiwiZ2V0UG9zaXRpb24iLCJmaXRCb3VuZHMiLCJzZXRTdHlsZXMiLCJzdHlsZXMiLCJnZXRTdHlsZXMiLCJpc1pvb21PbkNsaWNrIiwiaXNBdmVyYWdlQ2VudGVyIiwiZ2V0VG90YWxNYXJrZXJzIiwic2V0TWF4Wm9vbSIsIm1heFpvb20iLCJnZXRNYXhab29tIiwiY2FsY3VsYXRvcl8iLCJudW1TdHlsZXMiLCJpbmRleCIsImNvdW50IiwiZHYiLCJwYXJzZUludCIsIk1hdGgiLCJtaW4iLCJ0ZXh0Iiwic2V0Q2FsY3VsYXRvciIsImNhbGN1bGF0b3IiLCJnZXRDYWxjdWxhdG9yIiwib3B0X25vZHJhdyIsInB1c2hNYXJrZXJUb18iLCJpc0FkZGVkIiwicmVwYWludCIsImFkZE1hcmtlciIsInJlbW92ZU1hcmtlcl8iLCJpbmRleE9mIiwibSIsInNwbGljZSIsInJlbW92ZU1hcmtlciIsInJlbW92ZWQiLCJyZW1vdmVNYXJrZXJzIiwiciIsInJlYWR5IiwiY3JlYXRlQ2x1c3RlcnNfIiwiZ2V0VG90YWxDbHVzdGVycyIsImdldE1hcCIsImdldEdyaWRTaXplIiwic2V0R3JpZFNpemUiLCJnZXRNaW5DbHVzdGVyU2l6ZSIsInNldE1pbkNsdXN0ZXJTaXplIiwiZ2V0RXh0ZW5kZWRCb3VuZHMiLCJwcm9qZWN0aW9uIiwiZ2V0UHJvamVjdGlvbiIsInRyIiwiTGF0TG5nIiwiZ2V0Tm9ydGhFYXN0IiwibGF0IiwibG5nIiwiYmwiLCJnZXRTb3V0aFdlc3QiLCJ0clBpeCIsImZyb21MYXRMbmdUb0RpdlBpeGVsIiwieCIsInkiLCJibFBpeCIsIm5lIiwiZnJvbURpdlBpeGVsVG9MYXRMbmciLCJzdyIsImlzTWFya2VySW5Cb3VuZHNfIiwiY29udGFpbnMiLCJjbGVhck1hcmtlcnMiLCJvcHRfaGlkZSIsImNsdXN0ZXIiLCJyZW1vdmUiLCJvbGRDbHVzdGVycyIsInNsaWNlIiwid2luZG93Iiwic2V0VGltZW91dCIsImRpc3RhbmNlQmV0d2VlblBvaW50c18iLCJwMSIsInAyIiwiUiIsImRMYXQiLCJQSSIsImRMb24iLCJhIiwic2luIiwiY29zIiwiYyIsImF0YW4yIiwic3FydCIsImQiLCJhZGRUb0Nsb3Nlc3RDbHVzdGVyXyIsImRpc3RhbmNlIiwiY2x1c3RlclRvQWRkVG8iLCJwb3MiLCJjZW50ZXIiLCJnZXRDZW50ZXIiLCJpc01hcmtlckluQ2x1c3RlckJvdW5kcyIsIkNsdXN0ZXIiLCJtYXBCb3VuZHMiLCJnZXRCb3VuZHMiLCJtYXJrZXJDbHVzdGVyZXIiLCJtYXJrZXJDbHVzdGVyZXJfIiwiY2VudGVyXyIsImJvdW5kc18iLCJjbHVzdGVySWNvbl8iLCJDbHVzdGVySWNvbiIsImlzTWFya2VyQWxyZWFkeUFkZGVkIiwiY2FsY3VsYXRlQm91bmRzXyIsImwiLCJsZW4iLCJ1cGRhdGVJY29uIiwiZ2V0TWFya2VyQ2x1c3RlcmVyIiwiZ2V0U2l6ZSIsIm16IiwiaGlkZSIsInN1bXMiLCJzZXRDZW50ZXIiLCJzZXRTdW1zIiwic2hvdyIsIm9wdF9wYWRkaW5nIiwicGFkZGluZ18iLCJjbHVzdGVyXyIsImRpdl8iLCJzdW1zXyIsInZpc2libGVfIiwidHJpZ2dlckNsdXN0ZXJDbGljayIsInRyaWdnZXIiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJnZXRQb3NGcm9tTGF0TG5nXyIsInN0eWxlIiwiY3NzVGV4dCIsImNyZWF0ZUNzcyIsImlubmVySFRNTCIsInBhbmVzIiwiZ2V0UGFuZXMiLCJvdmVybGF5TW91c2VUYXJnZXQiLCJhcHBlbmRDaGlsZCIsImFkZERvbUxpc3RlbmVyIiwibGF0bG5nIiwid2lkdGhfIiwiaGVpZ2h0XyIsInRvcCIsImxlZnQiLCJkaXNwbGF5Iiwib25SZW1vdmUiLCJwYXJlbnROb2RlIiwicmVtb3ZlQ2hpbGQiLCJ0ZXh0XyIsImluZGV4XyIsInVzZVN0eWxlIiwibWF4IiwidXJsXyIsInRleHRDb2xvcl8iLCJhbmNob3JfIiwidGV4dFNpemVfIiwiZm9udEZhbWlseV8iLCJmb250V2VpZ2h0XyIsImJhY2tncm91bmRQb3NpdGlvbl8iLCJiYWNrZ3JvdW5kUG9zaXRpb24iLCJfdHlwZW9mIiwidHh0Q29sb3IiLCJ0eHRTaXplIiwiZm9udEZhbWlseSIsImZvbnRXZWlnaHQiLCJqb2luIiwiZ2xvYmFsIiwibW9kdWxlIiwiZXhwb3J0cyIsImZhY3RvcnkiLCJkZWZpbmUiLCJhbWQiLCJyZXF1aXJlIiwialF1ZXJ5IiwiJCIsIkJhclJhdGluZyIsInNlbGYiLCJ3cmFwRWxlbWVudCIsImNsYXNzZXMiLCJ0aGVtZSIsIiRlbGVtIiwid3JhcCIsInVud3JhcEVsZW1lbnQiLCJ1bndyYXAiLCJmaW5kT3B0aW9uIiwidmFsdWUiLCJpc051bWVyaWMiLCJmbG9vciIsImdldEluaXRpYWxPcHRpb24iLCJpbml0aWFsUmF0aW5nIiwiZ2V0RW1wdHlPcHRpb24iLCIkZW1wdHlPcHQiLCJmaW5kIiwiZW1wdHlWYWx1ZSIsImFsbG93RW1wdHkiLCJwcmVwZW5kVG8iLCJnZXREYXRhIiwia2V5IiwiZGF0YSIsInNldERhdGEiLCJzYXZlRGF0YU9uRWxlbWVudCIsIiRvcHQiLCJ2YWwiLCJlbXB0eVRleHQiLCJ1c2VyT3B0aW9ucyIsInJhdGluZ1ZhbHVlIiwicmF0aW5nVGV4dCIsIm9yaWdpbmFsUmF0aW5nVmFsdWUiLCJvcmlnaW5hbFJhdGluZ1RleHQiLCJlbXB0eVJhdGluZ1ZhbHVlIiwiZW1wdHlSYXRpbmdUZXh0IiwicmVhZE9ubHkiLCJyZWFkb25seSIsInJhdGluZ01hZGUiLCJyZW1vdmVEYXRhT25FbGVtZW50IiwicmVtb3ZlRGF0YSIsImJ1aWxkV2lkZ2V0IiwiJHciLCJlYWNoIiwiaHRtbCIsIiRhIiwic2hvd1ZhbHVlcyIsImFwcGVuZCIsInNob3dTZWxlY3RlZFJhdGluZyIsInJldmVyc2UiLCJhZGRDbGFzcyIsIm5leHRBbGxvclByZXZpb3VzQWxsIiwic2V0U2VsZWN0RmllbGRWYWx1ZSIsInByb3AiLCJjaGFuZ2UiLCJyZXNldFNlbGVjdEZpZWxkIiwiZGVmYXVsdFNlbGVjdGVkIiwicGFyZW50IiwiZnJhY3Rpb24iLCJyb3VuZCIsInJlc2V0U3R5bGUiLCIkd2lkZ2V0IiwicmVtb3ZlQ2xhc3MiLCJtYXRjaCIsImFwcGx5U3R5bGUiLCJiYXNlVmFsdWUiLCJmIiwiJGFsbCIsIiRmcmFjdGlvbmFsIiwiaXNEZXNlbGVjdGFibGUiLCIkZWxlbWVudCIsImRlc2VsZWN0YWJsZSIsImF0dHIiLCJhdHRhY2hDbGlja0hhbmRsZXIiLCIkZWxlbWVudHMiLCJvbiIsInByZXZlbnREZWZhdWx0Iiwib25TZWxlY3QiLCJjYWxsIiwiYXR0YWNoTW91c2VFbnRlckhhbmRsZXIiLCJhdHRhY2hNb3VzZUxlYXZlSGFuZGxlciIsImZhc3RDbGlja3MiLCJzdG9wUHJvcGFnYXRpb24iLCJjbGljayIsImRpc2FibGVDbGlja3MiLCJhdHRhY2hIYW5kbGVycyIsImhvdmVyU3RhdGUiLCJkZXRhY2hIYW5kbGVycyIsIm9mZiIsInNldHVwSGFuZGxlcnMiLCJpbnNlcnRBZnRlciIsInN0YXRlIiwidG9nZ2xlQ2xhc3MiLCJzZXQiLCJzaWxlbnQiLCJjbGVhciIsIm9uQ2xlYXIiLCJkZXN0cm95Iiwib25EZXN0cm95IiwiaW5pdCIsImVsZW0iLCJmbiIsImJhcnJhdGluZyIsImRlZmF1bHRzIiwibWV0aG9kIiwicGx1Z2luIiwiaXMiLCJlcnJvciIsImhhc093blByb3BlcnR5IiwibmV4dCIsInNlYXJjaERhdGEiLCJzZWFyY2hEb25lIiwiY2FsZW5kYXJMb2FkZWQiLCJzYXZlZHdpZHRoIiwibGFyZ2UiLCJyZXNpemVkIiwic2Nsb2FkZWQiLCJGb3VuZGF0aW9uIiwiYWRkVG9KcXVlcnkiLCJmb3VuZGF0aW9uIiwiY2hlY2tTY3JlZW5XaWR0aCIsImJhcnMiLCIkY3RyaWdnZXIiLCJsb2FkQ2FsZW5kYXIiLCJzdGlja3kiLCJlIiwiJGZvcm0iLCJhamF4IiwidHlwZSIsInNlcmlhbGl6ZSIsImRhdGFUeXBlIiwic3VjY2VzcyIsInJlc3VsdCIsImZvcm1SZXNwb25zZSIsImxvY2F0aW9uIiwiaHJlZiIsIm1lc3NhZ2UiLCIkbW9kYWwiLCJSZXZlYWwiLCJvcGVuIiwiY3NzIiwibW9kYWxpZCIsInRyaW0iLCJhamF4dXJsIiwiY29udGVudCIsImdldFNjcmlwdCIsImluaXRpYWxpemVTdHJpcGUiLCJzbGljayIsInBpZCIsImJhciIsImdldFByb3BlcnRpZXMiLCJjaGlsZHJlbiIsInRvZ2dsZSIsInNldEFjdGl2ZU1lbnUiLCJ0YXJnZXQiLCIkcHJvcHMiLCIkdGFicyIsInNwZWNpYWwiLCJ0b3VjaHN0YXJ0Iiwic2V0dXAiLCJfIiwibnMiLCJoYW5kbGUiLCJpbmNsdWRlcyIsImFkZEV2ZW50TGlzdGVuZXIiLCJwYXNzaXZlIiwidG91Y2htb3ZlIiwiaWQiLCJyZXBsYWNlIiwicmVkaXJlY3QiLCJhY3Rpb24iLCJhY3Rpb25fdmFsdWUiLCJyZWxvYWQiLCJ2YWxzIiwic2V0U2VhcmNoRGF0YSIsInJlc3BvbnNlIiwiJHNpZGViYXIiLCJlbXB0eSIsImZhZGVJbiIsInNjcm9sbFRvIiwic2VhcmNoYmFyIiwic2NyZWVuV2lkdGhIYXNDaGFuZ2VkIiwiTWVkaWFRdWVyeSIsImF0TGVhc3QiLCJvcmlnaW4iLCJwcm90b2NvbCIsImhvc3QiLCJteUNvbmZpcm0iLCIkbXlUYXNrIiwiS3Jjb25maXJtIiwiY29uc3RydWN0b3IiLCJmb3JtIiwidXBkYXRlUXVvdGUiLCJzZXJpYWxpemVBcnJheSIsImRpdiIsImNoZWNrVGVybXMiLCJ0ZXN0IiwiZ2V0RWxlbWVudEJ5SWQiLCJ0ZXN0YyIsInRlc3R0IiwiYWdyZWVjaGVjayIsImNoZWNrZWQiLCJhZ3JlZWNoZWNrYyIsImFncmVlY2hlY2t0IiwibXlLckRvYkVudHJ5IiwidG9kYXkiLCJCQUNLU1BBQ0UiLCJzZXR0aW5ncyIsImN1c3RvbV92YWxpZGF0aW9uIiwiZGF5c19pbl9tb250aCIsImRvY3VtZW50X2RhdGUiLCJlcnJvcmJveF94IiwiZXJyb3Jib3hfeSIsImZpZWxkX2hpbnRfdGV4dF9kYXkiLCJmaWVsZF9oaW50X3RleHRfbW9udGgiLCJmaWVsZF9oaW50X3RleHRfeWVhciIsImZpZWxkX29yZGVyIiwiZmllbGRfd2lkdGhfZGF5IiwiZmllbGRfd2lkdGhfbW9udGgiLCJmaWVsZF93aWR0aF95ZWFyIiwiZmllbGRfd2lkdGhfc2VwIiwibWlubWF4IiwibWluX2RhdGUiLCJtYXhfZGF0ZSIsIm1pbl95ZWFyIiwibW9udGhfbmFtZSIsIm9uX2JsdXIiLCJvbl9lcnJvciIsIm9uX2NoYW5nZSIsInBhcnNlX2RhdGUiLCJzZXBhcmF0b3IiLCJzaG93X2Vycm9ycyIsInNob3dfaGludHMiLCJFX0RBWV9OQU4iLCJFX0RBWV9UT09fQklHIiwiRV9EQVlfVE9PX1NNQUxMIiwiRV9CQURfREFZX0ZPUl9NT05USCIsIkVfTU9OVEhfTkFOIiwiRV9NT05USF9UT09fQklHIiwiRV9NT05USF9UT09fU01BTEwiLCJFX1lFQVJfTkFOIiwiRV9ZRUFSX0xFTkdUSCIsIkVfWUVBUl9UT09fU01BTEwiLCJFX01JTl9EQVRFIiwiRV9NQVhfREFURSIsIktyRG9iRW50cnkiLCJnZXRZbWQiLCJEYXRlIiwiaW5wdXRfZGF5IiwiaW5wdXRfbW9udGgiLCJpbnB1dF95ZWFyIiwiZGF0ZSIsImdldE1vbnRoIiwiZ2V0RGF5IiwiZ2V0RnVsbFllYXIiLCJnZXRZbWRPYmplY3QiLCJ5ZWFyIiwibW9udGgiLCJkYXkiLCJhZGRFbnRyeUZpZWxkcyIsImRvYmZpZWxkIiwiZmllbGRzIiwic3BsaXQiLCJmaWVsZCIsImJ1aWxkRmllbGQiLCJhZnRlclBhc3RlIiwicGFyc2VEYXRlIiwic2V0RGF0ZSIsIm5hbWUiLCJrcmRvYmVudHJ5IiwiaW5wdXQiLCJLckRvYklucHV0IiwiaGludF90ZXh0IiwiaW5uZXIiLCIkaW5wdXQiLCJidWlsZFVpIiwid3JhcHBlciIsImVycm9yYm94Iiwic2V0RmllbGRXaWR0aHMiLCJjaGVja0RvY3VtZW50IiwiZG9iIiwiY2hpbGRkb2IiLCJjbGFzc25hbWUiLCJlbGVtZW50cyIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJjbGVhckVycm9yIiwiZXJyb3JfdGV4dCIsInNob3dFcnJvciIsImZvY3VzIiwic2V0Rm9jdXMiLCJmb2N1c0ZpZWxkQmVmb3JlIiwieWllbGRGb2N1cyIsImZvY3VzRmllbGRBZnRlciIsImZvY3VzSW4iLCJmb2N1c091dCIsIndpZGdldEZvY3VzTG9zdCIsImdldERhdGUiLCJkYXlfdmFsdWUiLCJtb250aF92YWx1ZSIsInllYXJfdmFsdWUiLCJwcm94eUxhYmVsQ2xpY2tzIiwicGFyc2VJc29EYXRlIiwiUmVnRXhwIiwiJDMiLCIkMiIsIiQxIiwibmV3X2RhdGUiLCJ2YWxpZGF0ZSIsInNldEVycm9yIiwiYXZhaWxhYmxlIiwidG90YWwiLCJzZXRXaWR0aCIsInNldFJlYWRvbmx5IiwibW9kZSIsIndpZGdldEVycm9yVGV4dCIsInhfb2Zmc2V0Iiwib3V0ZXJXaWR0aCIsInlfb2Zmc2V0IiwicG9zaXRpb24iLCJjdXJyZW50X2lucHV0IiwidmFsaWRhdGVEYXkiLCJ2YWxpZGF0ZU1vbnRoIiwidmFsaWRhdGVZZWFyIiwidmFsaWRhdGVEYXlzSW5Nb250aCIsInZhbGlkYXRlQ29tcGxldGVEYXRlIiwiZGF0ZV9zdHIiLCJkYXRlX29iaiIsImRhdGVfaXNvIiwib3B0IiwiZ2V0IiwiaGFzX2ZvY3VzIiwibnVtIiwibXNnIiwidG9TdHJpbmciLCJvbkJsdXIiLCJwcm94eSIsImJsdXIiLCJrZXlkb3duIiwia2V5dXAiLCJzaG93X2hpbnQiLCJrZXlfaXNfZG93biIsImhhc0NsYXNzIiwiaXNEaWdpdEtleSIsImtleWNvZGUiLCJ3aGljaCIsIndhbnQiLCJuZXdfdmFsdWUiLCJzZWxlY3RfYWxsIiwic2VsZWN0IiwibmV3X3dpZHRoIiwiaG93dG9hcnJpdmUiLCJhcnJpdmFsbWVhbnMiLCJnZXRBdHRyaWJ1dGUiLCJkaXNwbGF5QXJyaXZhbCIsImNsYXNzTGlzdCIsImFycml2YWxkYXRhIiwiYWRkIiwib3ZDaGlsZHJlbiIsIm92U3RhdGUiLCJvdlBzIiwiJG92QnRuIiwiZmNDaGlsZHJlbiIsImZjU3RhdGUiLCIkZmNCdG4iLCJ0dENoaWxkcmVuIiwidHRTdGF0ZSIsInR0UHMiLCIkdHRCdG4iLCJ0dHBhcmFzIiwiY3VycmVudFBhcmFncmFwaCIsImhyRWxlbWVudCIsImFmdGVyIiwicXVlcnlTZWxlY3RvckFsbCIsImRvSFJzIiwicGFyYWdyYXBocyIsIm5leHRFbGVtZW50U2libGluZyIsInRhZ05hbWUiLCJsYW5nIiwibWFya2Vyc2hhcGUiLCJjb29yZHMiLCJteUtybWFwIiwibWFwRGF0YSIsImluZm9XaW5kb3ciLCJpbmZvV2luZG93MiIsInByb3BlcnR5ZGl2IiwicHJvcGVydHlpY29uIiwibWMiLCJwcm9wZXJ0eU1hcmtlcnMiLCJmaWx0ZXJJZHMiLCJtYXBNYXJrZXJzIiwibWFwVHlwZUlkIiwibWFwWm9vbSIsIm1hcE1heFpvb20iLCJtYXBUeXBlIiwibWFwSWQiLCJtYXJrZXJDb2xvciIsIktybWFwIiwiZ21PcHRpb25zIiwic2Nyb2xsd2hlZWwiLCJzdHJlZXRWaWV3Q29udHJvbCIsImdtYXJrZXJzIiwiaW5pdE1hcCIsImNsb3NlS3JJbmZvd2luZG93IiwiY2xvc2UiLCJzaG93VmlzaWJsZU1hcmtlcnMiLCJzZXRWaXNpYmxlIiwiY2hlY2tEdXBsaWNhdGUiLCJjdXJyZW50IiwiZHVwcyIsImVxdWFscyIsIm5ld0xhdCIsIm5ld0xuZyIsImNsdXN0ZXJNYXAiLCJtY09wdGlvbnMiLCJncmlkU2l6ZSIsImlnbm9yZUhpZGRlbk1hcmtlcnMiLCJpbWFnZVBhdGgiLCJtYXhEZWZhdWx0Wm9vbSIsImFkZExpc3RlbmVyT25jZSIsInNldFpvb20iLCJzZXRQcm9wZXJ0eU1hcmtlcnMiLCJzZXRNYXBNYXJrZXJzIiwiY3JlYXRlTWFwIiwiTWFwIiwiSW5mb1dpbmRvdyIsImNyZWF0ZU1hcE1hcmtlciIsInBvaW50IiwiaW1hZ2UiLCJib3hpbmZvIiwibGluayIsInRpdGxlIiwiTWFya2VyIiwic2hhcGUiLCJpY29uIiwiekluZGV4Iiwic2V0Q29udGVudCIsImNyZWF0ZVByb3BlcnR5TWFya2VyIiwiY29sb3IiLCJub3QiLCJuZXh0QXJyb3ciLCJwcmV2QXJyb3ciLCJhdXRvcGxheSIsInNvbG9NYXAiLCJyZWZyZXNoTWFwIiwiJG1hcG1vZGFsIiwiYWxlcnQiLCJyZXNldE1hcCIsImFtYXJrIiwibWFya2VyaWNvbiIsIlNpemUiLCJQb2ludCIsImFuY2hvciIsIm15TGlzdGVuZXIiLCJmb3VuZCIsImN1cnJlbnRab29tIiwia2lja01hcCIsIm1hcF9tb2RhbCIsIiRzb2xvVHJpZ2dlciIsIm9uZSIsIiRtdHJpZ2dlciIsIm15S3Jyb3V0ZSIsImRpcmVjdGlvbnNEaXNwbGF5IiwiZGlyZWN0aW9uc1Zpc2libGUiLCJyb3V0ZU1hcCIsImRlc3RpbmF0aW9uIiwicm91dGVNYXJrZXJzIiwicm91dGVTdG9wUG9pbnRzIiwiZGV0b3VyIiwiZGlyZWN0aW9uc1BhbmVsIiwiZGlyZWN0aW9uc1NlcnZpY2UiLCJLcnJvdXRlIiwiRGlyZWN0aW9uc1NlcnZpY2UiLCJjbGVhclJvdXRlTWFya2VycyIsImNsZWFyV2F5cG9pbnRzIiwiYWRkUm91dGVNYXJrZXIiLCJjYWxjUm91dGUiLCJmcm9tX2FkZHJlc3MiLCJEaXJlY3Rpb25zVHJhdmVsTW9kZSIsIkJJQ1lDTElORyIsIkRSSVZJTkciLCJXQUxLSU5HIiwicmVxdWVzdCIsIndheXBvaW50cyIsInRyYXZlbE1vZGUiLCJhdm9pZEhpZ2h3YXlzIiwiYXZvaWRUb2xscyIsInJvdXRlIiwic3RhdHVzIiwiRGlyZWN0aW9uc1N0YXR1cyIsIk9LIiwic2V0RGlyZWN0aW9ucyIsInJlc2V0Um91dGUiLCJteU9wdGlvbnMiLCJEaXJlY3Rpb25zUmVuZGVyZXIiLCJzZXRQYW5lbCIsIk1hcmtlckltYWdlIiwibGF0TG5nIiwic3RvcG92ZXIiLCJkaXJlY3Rpb25QYW5lbCIsImFkZHJlc3NTdHJpbmciLCJjb29yZCIsImFkZHJlc3MiLCJqc29uZGF0YSIsIm15R21hcCJdLCJzb3VyY2VSb290IjoiIn0=