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
      if ('.sticky'.length) {
        $('.sticky').foundation('_calc', true);
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
  function setSearchData(response, action = '') {
    let $sidebar;
    if (response) {
      $('#kr-properties-data').empty().fadeIn('slow').html(response['items']).foundation();
      if (action !== 'thumb') {
        $('.kr-pager').html(response['pagination']);
      }
      $('.kr-pager.bottom').html(response['pagination']);
      $("#kr-offcanvas-properties-filter").html(response['filters']);
      $("#kr-offcanvas-properties-sortby").html(response['sortby']);
      $sidebar = $("#kr-sidebar-search");
      if ($sidebar.length && response['search'].length) {
        $sidebar.empty().html(response['search']);
        $('body').trigger('initajaxsearch');
      }
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
    ovChildren = $('.readmore-overview').children('p');
    ovPs = ovChildren.length;
    if (ovPs > 5) {
      ovChildren.slice(6).hide();
      ovChildren.slice(ovPs - 1, ovPs).after('<a class="button hollow' + ' accent readmore overview-toggle">Read more...</a>');
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
        ovChildren.slice(6).hide();
        $ovBtn.attr('value', 'Read more');
        $ovBtn.text("Read more...");
        ovState = 'hidden';
      } else if (ovState === 'hidden') {
        $('.readmore-overview p').show();
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
/* harmony import */ var mediajs_site_magellan__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! mediajs/site/magellan */ "./src/media/com_knowres/js/src/site/magellan.js");
/* harmony import */ var mediajs_site_magellan__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(mediajs_site_magellan__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var mediajs_site_map__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! mediajs/site/map */ "./src/media/com_knowres/js/src/site/map.js");
/* harmony import */ var mediajs_site_map__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(mediajs_site_map__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var mediajs_site_route__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! mediajs/site/route */ "./src/media/com_knowres/js/src/site/route.js");
/* harmony import */ var mediajs_site_route__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(mediajs_site_route__WEBPACK_IMPORTED_MODULE_8__);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q1hDLElBQUksRUFBTSxNQUFNO1FBQ2hCblQsR0FBRyxFQUFPQSxHQUFHO1FBQ2IyTSxJQUFJLEVBQU07VUFBQzhkLE9BQU8sRUFBRUY7UUFBYSxDQUFDO1FBQ2xDbFgsUUFBUSxFQUFFLE1BQU07UUFDaEJDLE9BQU8sRUFBRyxTQUFBQSxDQUFVb1gsUUFBUSxFQUFFO1VBQzdCeGYsTUFBTSxDQUFDNkMsSUFBSSxDQUFDMmMsUUFBUSxFQUFFLFVBQVVoZSxHQUFHLEVBQUVLLEdBQUcsRUFBRTtZQUN6QyxJQUFJcUssR0FBRyxHQUFHLEdBQUcsR0FBRzFLLEdBQUc7WUFDbkJ4QixNQUFNLENBQUNrTSxHQUFHLENBQUMsQ0FBQ3JLLEdBQUcsQ0FBQ0EsR0FBRyxDQUFDO1lBQ3BCeWQsS0FBSyxDQUFDOWQsR0FBRyxDQUFDLEdBQUdLLEdBQUc7WUFDaEI0ZCxNQUFNLENBQUM3RCxVQUFVLENBQUMwRCxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUVBLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxLQUFLLENBQUM7VUFDckQsQ0FBQyxDQUFDO1FBQ0g7TUFDRCxDQUFDLENBQUM7SUFDSCxDQUFDLENBQUM7RUFDSCxDQUFDLENBQUM7QUFDSCxDQUFDLEVBQUN0ZixNQUFNLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdQVDtBQUNnRDtBQUNmO0FBQ1A7QUFDMUI7QUFDOEI7QUFDQztBQUNDO0FBQ0Q7QUFDTDtBQUNFO0FBQzVCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8va3IvLi9ub2RlX21vZHVsZXMvaXMtbWFya2VyLWNsdXN0ZXJlci9zcmMvbWFya2VyY2x1c3RlcmVyLmpzIiwid2VicGFjazovL2tyLy4vbm9kZV9tb2R1bGVzL2pxdWVyeS1iYXItcmF0aW5nL2pxdWVyeS5iYXJyYXRpbmcuanMiLCJ3ZWJwYWNrOi8va3IvLi9zcmMvbWVkaWEvY29tX2tub3dyZXMvanMvc3JjL3NpdGUvYXBwLmpzIiwid2VicGFjazovL2tyLy4vc3JjL21lZGlhL2NvbV9rbm93cmVzL2pzL3NyYy9zaXRlL2NvbmZpcm0uanMiLCJ3ZWJwYWNrOi8va3IvLi9zcmMvbWVkaWEvY29tX2tub3dyZXMvanMvc3JjL3NpdGUvZG9iZW50cnkuanMiLCJ3ZWJwYWNrOi8va3IvLi9zcmMvbWVkaWEvY29tX2tub3dyZXMvanMvc3JjL3NpdGUvZ3Vlc3RkYXRhLmpzIiwid2VicGFjazovL2tyLy4vc3JjL21lZGlhL2NvbV9rbm93cmVzL2pzL3NyYy9zaXRlL21hZ2VsbGFuLmpzIiwid2VicGFjazovL2tyLy4vc3JjL21lZGlhL2NvbV9rbm93cmVzL2pzL3NyYy9zaXRlL21hcC5qcyIsIndlYnBhY2s6Ly9rci8uL3NyYy9tZWRpYS9jb21fa25vd3Jlcy9qcy9zcmMvc2l0ZS9yb3V0ZS5qcyIsIndlYnBhY2s6Ly9rci8uL3dlYnBhY2suYnVpbGQuc2l0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIE5wbSB2ZXJzaW9uIG9mIG1hcmtlckNsdXN0ZXJlciB3b3JrcyBncmVhdCB3aXRoIGJyb3dzZXJpZnlcbiAqIERpZmZlcmVuY2UgZnJvbSB0aGUgb3JpZ2luYWwgLSBhZGRzIGEgY29tbW9uanMgZm9ybWF0IGFuZCByZXBsYWNlcyB3aW5kb3cgd2l0aCBnbG9iYWwgYW5kIHNvbWUgdW5pdCB0ZXN0XG4gKiBUaGUgb3JpZ2luYWwgZnVuY3Rpb25hbGl0eSBpdCdzIG5vdCBtb2RpZmllZCBmb3IgZG9jcyBhbmQgb3JpZ2luYWwgc291cmNlIGNoZWNrXG4gKiBodHRwczovL2dpdGh1Yi5jb20vZ29vZ2xlbWFwcy9qcy1tYXJrZXItY2x1c3RlcmVyXG4gKi9cblxuLyoqXG4gKiBAbmFtZSBNYXJrZXJDbHVzdGVyZXIgZm9yIEdvb2dsZSBNYXBzIHYzXG4gKiBAdmVyc2lvbiB2ZXJzaW9uIDEuMFxuICogQGF1dGhvciBMdWtlIE1haGVcbiAqIEBmaWxlb3ZlcnZpZXdcbiAqIFRoZSBsaWJyYXJ5IGNyZWF0ZXMgYW5kIG1hbmFnZXMgcGVyLXpvb20tbGV2ZWwgY2x1c3RlcnMgZm9yIGxhcmdlIGFtb3VudHMgb2ZcbiAqIG1hcmtlcnMuXG4gKiA8YnIvPlxuICogVGhpcyBpcyBhIHYzIGltcGxlbWVudGF0aW9uIG9mIHRoZVxuICogPGEgaHJlZj1cImh0dHA6Ly9nbWFwcy11dGlsaXR5LWxpYnJhcnktZGV2Lmdvb2dsZWNvZGUuY29tL3N2bi90YWdzL21hcmtlcmNsdXN0ZXJlci9cIlxuICogPnYyIE1hcmtlckNsdXN0ZXJlcjwvYT4uXG4gKi9cblxuLyoqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuXG4vKipcbiAqIEEgTWFya2VyIENsdXN0ZXJlciB0aGF0IGNsdXN0ZXJzIG1hcmtlcnMuXG4gKlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5NYXB9IG1hcCBUaGUgR29vZ2xlIG1hcCB0byBhdHRhY2ggdG8uXG4gKiBAcGFyYW0ge0FycmF5Ljxnb29nbGUubWFwcy5NYXJrZXI+PX0gb3B0X21hcmtlcnMgT3B0aW9uYWwgbWFya2VycyB0byBhZGQgdG9cbiAqICAgdGhlIGNsdXN0ZXIuXG4gKiBAcGFyYW0ge09iamVjdD19IG9wdF9vcHRpb25zIHN1cHBvcnQgdGhlIGZvbGxvd2luZyBvcHRpb25zOlxuICogICAgICdncmlkU2l6ZSc6IChudW1iZXIpIFRoZSBncmlkIHNpemUgb2YgYSBjbHVzdGVyIGluIHBpeGVscy5cbiAqICAgICAnbWF4Wm9vbSc6IChudW1iZXIpIFRoZSBtYXhpbXVtIHpvb20gbGV2ZWwgdGhhdCBhIG1hcmtlciBjYW4gYmUgcGFydCBvZiBhXG4gKiAgICAgICAgICAgICAgICBjbHVzdGVyLlxuICogICAgICd6b29tT25DbGljayc6IChib29sZWFuKSBXaGV0aGVyIHRoZSBkZWZhdWx0IGJlaGF2aW91ciBvZiBjbGlja2luZyBvbiBhXG4gKiAgICAgICAgICAgICAgICAgICAgY2x1c3RlciBpcyB0byB6b29tIGludG8gaXQuXG4gKiAgICAgJ2F2ZXJhZ2VDZW50ZXInOiAoYm9vbGVhbikgV2V0aGVyIHRoZSBjZW50ZXIgb2YgZWFjaCBjbHVzdGVyIHNob3VsZCBiZVxuICogICAgICAgICAgICAgICAgICAgICAgdGhlIGF2ZXJhZ2Ugb2YgYWxsIG1hcmtlcnMgaW4gdGhlIGNsdXN0ZXIuXG4gKiAgICAgJ21pbmltdW1DbHVzdGVyU2l6ZSc6IChudW1iZXIpIFRoZSBtaW5pbXVtIG51bWJlciBvZiBtYXJrZXJzIHRvIGJlIGluIGFcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgY2x1c3RlciBiZWZvcmUgdGhlIG1hcmtlcnMgYXJlIGhpZGRlbiBhbmQgYSBjb3VudFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICBpcyBzaG93bi5cbiAqICAgICAnc3R5bGVzJzogKG9iamVjdCkgQW4gb2JqZWN0IHRoYXQgaGFzIHN0eWxlIHByb3BlcnRpZXM6XG4gKiAgICAgICAndXJsJzogKHN0cmluZykgVGhlIGltYWdlIHVybC5cbiAqICAgICAgICdoZWlnaHQnOiAobnVtYmVyKSBUaGUgaW1hZ2UgaGVpZ2h0LlxuICogICAgICAgJ3dpZHRoJzogKG51bWJlcikgVGhlIGltYWdlIHdpZHRoLlxuICogICAgICAgJ2FuY2hvcic6IChBcnJheSkgVGhlIGFuY2hvciBwb3NpdGlvbiBvZiB0aGUgbGFiZWwgdGV4dC5cbiAqICAgICAgICd0ZXh0Q29sb3InOiAoc3RyaW5nKSBUaGUgdGV4dCBjb2xvci5cbiAqICAgICAgICd0ZXh0U2l6ZSc6IChudW1iZXIpIFRoZSB0ZXh0IHNpemUuXG4gKiAgICAgICAnZm9udEZhbWlseSc6IChzdHJpbmcpIFRoZSBmb250IGZhbWlseS5cbiAqICAgICAgICdmb250V2VpZ2h0JzogKHN0cmluZykgVGhlIGZvbnQgd2VpZ2h0LlxuICogICAgICAgJ2JhY2tncm91bmRQb3NpdGlvbic6IChzdHJpbmcpIFRoZSBwb3NpdGlvbiBvZiB0aGUgYmFja2dvdW5kIHgsIHkuXG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlbmRzIGdvb2dsZS5tYXBzLk92ZXJsYXlWaWV3XG4gKi9cbmZ1bmN0aW9uIE1hcmtlckNsdXN0ZXJlcihtYXAsIG9wdF9tYXJrZXJzLCBvcHRfb3B0aW9ucykge1xuICAvLyBNYXJrZXJDbHVzdGVyZXIgaW1wbGVtZW50cyBnb29nbGUubWFwcy5PdmVybGF5VmlldyBpbnRlcmZhY2UuIFdlIHVzZSB0aGVcbiAgLy8gZXh0ZW5kIGZ1bmN0aW9uIHRvIGV4dGVuZCBNYXJrZXJDbHVzdGVyZXIgd2l0aCBnb29nbGUubWFwcy5PdmVybGF5Vmlld1xuICAvLyBiZWNhdXNlIGl0IG1pZ2h0IG5vdCBhbHdheXMgYmUgYXZhaWxhYmxlIHdoZW4gdGhlIGNvZGUgaXMgZGVmaW5lZCBzbyB3ZVxuICAvLyBsb29rIGZvciBpdCBhdCB0aGUgbGFzdCBwb3NzaWJsZSBtb21lbnQuIElmIGl0IGRvZXNuJ3QgZXhpc3Qgbm93IHRoZW5cbiAgLy8gdGhlcmUgaXMgbm8gcG9pbnQgZ29pbmcgYWhlYWQgOilcbiAgdGhpcy5leHRlbmQoTWFya2VyQ2x1c3RlcmVyLCBnb29nbGUubWFwcy5PdmVybGF5Vmlldyk7XG4gIHRoaXMubWFwXyA9IG1hcDtcblxuICAvKipcbiAgICogQHR5cGUge0FycmF5Ljxnb29nbGUubWFwcy5NYXJrZXI+fVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgdGhpcy5tYXJrZXJzXyA9IFtdO1xuXG4gIC8qKlxuICAgKiAgQHR5cGUge0FycmF5LjxDbHVzdGVyPn1cbiAgICovXG4gIHRoaXMuY2x1c3RlcnNfID0gW107XG5cbiAgdGhpcy5zaXplcyA9IFs1MywgNTYsIDY2LCA3OCwgOTBdO1xuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgdGhpcy5zdHlsZXNfID0gW107XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgdGhpcy5yZWFkeV8gPSBmYWxzZTtcblxuICB2YXIgb3B0aW9ucyA9IG9wdF9vcHRpb25zIHx8IHt9O1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgdGhpcy5ncmlkU2l6ZV8gPSBvcHRpb25zWydncmlkU2l6ZSddIHx8IDYwO1xuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgdGhpcy5taW5DbHVzdGVyU2l6ZV8gPSBvcHRpb25zWydtaW5pbXVtQ2x1c3RlclNpemUnXSB8fCAyO1xuXG5cbiAgLyoqXG4gICAqIEB0eXBlIHs/bnVtYmVyfVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgdGhpcy5tYXhab29tXyA9IG9wdGlvbnNbJ21heFpvb20nXSB8fCBudWxsO1xuXG4gIHRoaXMuc3R5bGVzXyA9IG9wdGlvbnNbJ3N0eWxlcyddIHx8IFtdO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgdGhpcy5pbWFnZVBhdGhfID0gb3B0aW9uc1snaW1hZ2VQYXRoJ10gfHxcbiAgICAgIHRoaXMuTUFSS0VSX0NMVVNURVJfSU1BR0VfUEFUSF87XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICB0aGlzLmltYWdlRXh0ZW5zaW9uXyA9IG9wdGlvbnNbJ2ltYWdlRXh0ZW5zaW9uJ10gfHxcbiAgICAgIHRoaXMuTUFSS0VSX0NMVVNURVJfSU1BR0VfRVhURU5TSU9OXztcblxuICAvKipcbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICB0aGlzLnpvb21PbkNsaWNrXyA9IHRydWU7XG5cbiAgaWYgKG9wdGlvbnNbJ3pvb21PbkNsaWNrJ10gIT0gdW5kZWZpbmVkKSB7XG4gICAgdGhpcy56b29tT25DbGlja18gPSBvcHRpb25zWyd6b29tT25DbGljayddO1xuICB9XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgdGhpcy5hdmVyYWdlQ2VudGVyXyA9IGZhbHNlO1xuXG4gIGlmIChvcHRpb25zWydhdmVyYWdlQ2VudGVyJ10gIT0gdW5kZWZpbmVkKSB7XG4gICAgdGhpcy5hdmVyYWdlQ2VudGVyXyA9IG9wdGlvbnNbJ2F2ZXJhZ2VDZW50ZXInXTtcbiAgfVxuXG4gIHRoaXMuc2V0dXBTdHlsZXNfKCk7XG5cbiAgdGhpcy5zZXRNYXAobWFwKTtcblxuICAvKipcbiAgICogQHR5cGUge251bWJlcn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHRoaXMucHJldlpvb21fID0gdGhpcy5tYXBfLmdldFpvb20oKTtcblxuICAvLyBBZGQgdGhlIG1hcCBldmVudCBsaXN0ZW5lcnNcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcih0aGlzLm1hcF8sICd6b29tX2NoYW5nZWQnLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgem9vbSA9IHRoYXQubWFwXy5nZXRab29tKCk7XG5cbiAgICBpZiAodGhhdC5wcmV2Wm9vbV8gIT0gem9vbSkge1xuICAgICAgdGhhdC5wcmV2Wm9vbV8gPSB6b29tO1xuICAgICAgdGhhdC5yZXNldFZpZXdwb3J0KCk7XG4gICAgfVxuICB9KTtcblxuICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcih0aGlzLm1hcF8sICdpZGxlJywgZnVuY3Rpb24oKSB7XG4gICAgdGhhdC5yZWRyYXcoKTtcbiAgfSk7XG5cbiAgLy8gRmluYWxseSwgYWRkIHRoZSBtYXJrZXJzXG4gIGlmIChvcHRfbWFya2VycyAmJiBvcHRfbWFya2Vycy5sZW5ndGgpIHtcbiAgICB0aGlzLmFkZE1hcmtlcnMob3B0X21hcmtlcnMsIGZhbHNlKTtcbiAgfVxufVxuXG5cbi8qKlxuICogVGhlIG1hcmtlciBjbHVzdGVyIGltYWdlIHBhdGguXG4gKlxuICogQHR5cGUge3N0cmluZ31cbiAqIEBwcml2YXRlXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuTUFSS0VSX0NMVVNURVJfSU1BR0VfUEFUSF8gPVxuICAgICdodHRwOi8vZ29vZ2xlLW1hcHMtdXRpbGl0eS1saWJyYXJ5LXYzLmdvb2dsZWNvZGUuY29tL3N2bi90cnVuay9tYXJrZXJjbHVzdGVyZXIvJyArXG4gICAgJ2ltYWdlcy9tJztcblxuXG4vKipcbiAqIFRoZSBtYXJrZXIgY2x1c3RlciBpbWFnZSBwYXRoLlxuICpcbiAqIEB0eXBlIHtzdHJpbmd9XG4gKiBAcHJpdmF0ZVxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLk1BUktFUl9DTFVTVEVSX0lNQUdFX0VYVEVOU0lPTl8gPSAncG5nJztcblxuXG4vKipcbiAqIEV4dGVuZHMgYSBvYmplY3RzIHByb3RvdHlwZSBieSBhbm90aGVycy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqMSBUaGUgb2JqZWN0IHRvIGJlIGV4dGVuZGVkLlxuICogQHBhcmFtIHtPYmplY3R9IG9iajIgVGhlIG9iamVjdCB0byBleHRlbmQgd2l0aC5cbiAqIEByZXR1cm4ge09iamVjdH0gVGhlIG5ldyBleHRlbmRlZCBvYmplY3QuXG4gKiBAaWdub3JlXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZXh0ZW5kID0gZnVuY3Rpb24ob2JqMSwgb2JqMikge1xuICByZXR1cm4gKGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIGZvciAodmFyIHByb3BlcnR5IGluIG9iamVjdC5wcm90b3R5cGUpIHtcbiAgICAgIHRoaXMucHJvdG90eXBlW3Byb3BlcnR5XSA9IG9iamVjdC5wcm90b3R5cGVbcHJvcGVydHldO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfSkuYXBwbHkob2JqMSwgW29iajJdKTtcbn07XG5cblxuLyoqXG4gKiBJbXBsZW1lbnRhaW9uIG9mIHRoZSBpbnRlcmZhY2UgbWV0aG9kLlxuICogQGlnbm9yZVxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLm9uQWRkID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuc2V0UmVhZHlfKHRydWUpO1xufTtcblxuLyoqXG4gKiBJbXBsZW1lbnRhaW9uIG9mIHRoZSBpbnRlcmZhY2UgbWV0aG9kLlxuICogQGlnbm9yZVxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmRyYXcgPSBmdW5jdGlvbigpIHt9O1xuXG4vKipcbiAqIFNldHMgdXAgdGhlIHN0eWxlcyBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5zZXR1cFN0eWxlc18gPSBmdW5jdGlvbigpIHtcbiAgaWYgKHRoaXMuc3R5bGVzXy5sZW5ndGgpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBmb3IgKHZhciBpID0gMCwgc2l6ZTsgc2l6ZSA9IHRoaXMuc2l6ZXNbaV07IGkrKykge1xuICAgIHRoaXMuc3R5bGVzXy5wdXNoKHtcbiAgICAgIHVybDogdGhpcy5pbWFnZVBhdGhfICsgKGkgKyAxKSArICcuJyArIHRoaXMuaW1hZ2VFeHRlbnNpb25fLFxuICAgICAgaGVpZ2h0OiBzaXplLFxuICAgICAgd2lkdGg6IHNpemVcbiAgICB9KTtcbiAgfVxufTtcblxuLyoqXG4gKiAgRml0IHRoZSBtYXAgdG8gdGhlIGJvdW5kcyBvZiB0aGUgbWFya2VycyBpbiB0aGUgY2x1c3RlcmVyLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmZpdE1hcFRvTWFya2VycyA9IGZ1bmN0aW9uKCkge1xuICB2YXIgbWFya2VycyA9IHRoaXMuZ2V0TWFya2VycygpO1xuICB2YXIgYm91bmRzID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZ0JvdW5kcygpO1xuICBmb3IgKHZhciBpID0gMCwgbWFya2VyOyBtYXJrZXIgPSBtYXJrZXJzW2ldOyBpKyspIHtcbiAgICBib3VuZHMuZXh0ZW5kKG1hcmtlci5nZXRQb3NpdGlvbigpKTtcbiAgfVxuXG4gIHRoaXMubWFwXy5maXRCb3VuZHMoYm91bmRzKTtcbn07XG5cblxuLyoqXG4gKiAgU2V0cyB0aGUgc3R5bGVzLlxuICpcbiAqICBAcGFyYW0ge09iamVjdH0gc3R5bGVzIFRoZSBzdHlsZSB0byBzZXQuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuc2V0U3R5bGVzID0gZnVuY3Rpb24oc3R5bGVzKSB7XG4gIHRoaXMuc3R5bGVzXyA9IHN0eWxlcztcbn07XG5cblxuLyoqXG4gKiAgR2V0cyB0aGUgc3R5bGVzLlxuICpcbiAqICBAcmV0dXJuIHtPYmplY3R9IFRoZSBzdHlsZXMgb2JqZWN0LlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldFN0eWxlcyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5zdHlsZXNfO1xufTtcblxuXG4vKipcbiAqIFdoZXRoZXIgem9vbSBvbiBjbGljayBpcyBzZXQuXG4gKlxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB6b29tT25DbGlja18gaXMgc2V0LlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmlzWm9vbU9uQ2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuem9vbU9uQ2xpY2tfO1xufTtcblxuLyoqXG4gKiBXaGV0aGVyIGF2ZXJhZ2UgY2VudGVyIGlzIHNldC5cbiAqXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIGF2ZXJhZ2VDZW50ZXJfIGlzIHNldC5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5pc0F2ZXJhZ2VDZW50ZXIgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuYXZlcmFnZUNlbnRlcl87XG59O1xuXG5cbi8qKlxuICogIFJldHVybnMgdGhlIGFycmF5IG9mIG1hcmtlcnMgaW4gdGhlIGNsdXN0ZXJlci5cbiAqXG4gKiAgQHJldHVybiB7QXJyYXkuPGdvb2dsZS5tYXBzLk1hcmtlcj59IFRoZSBtYXJrZXJzLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldE1hcmtlcnMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMubWFya2Vyc187XG59O1xuXG5cbi8qKlxuICogIFJldHVybnMgdGhlIG51bWJlciBvZiBtYXJrZXJzIGluIHRoZSBjbHVzdGVyZXJcbiAqXG4gKiAgQHJldHVybiB7TnVtYmVyfSBUaGUgbnVtYmVyIG9mIG1hcmtlcnMuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0VG90YWxNYXJrZXJzID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLm1hcmtlcnNfLmxlbmd0aDtcbn07XG5cblxuLyoqXG4gKiAgU2V0cyB0aGUgbWF4IHpvb20gZm9yIHRoZSBjbHVzdGVyZXIuXG4gKlxuICogIEBwYXJhbSB7bnVtYmVyfSBtYXhab29tIFRoZSBtYXggem9vbSBsZXZlbC5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5zZXRNYXhab29tID0gZnVuY3Rpb24obWF4Wm9vbSkge1xuICB0aGlzLm1heFpvb21fID0gbWF4Wm9vbTtcbn07XG5cblxuLyoqXG4gKiAgR2V0cyB0aGUgbWF4IHpvb20gZm9yIHRoZSBjbHVzdGVyZXIuXG4gKlxuICogIEByZXR1cm4ge251bWJlcn0gVGhlIG1heCB6b29tIGxldmVsLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldE1heFpvb20gPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMubWF4Wm9vbV87XG59O1xuXG5cbi8qKlxuICogIFRoZSBmdW5jdGlvbiBmb3IgY2FsY3VsYXRpbmcgdGhlIGNsdXN0ZXIgaWNvbiBpbWFnZS5cbiAqXG4gKiAgQHBhcmFtIHtBcnJheS48Z29vZ2xlLm1hcHMuTWFya2VyPn0gbWFya2VycyBUaGUgbWFya2VycyBpbiB0aGUgY2x1c3RlcmVyLlxuICogIEBwYXJhbSB7bnVtYmVyfSBudW1TdHlsZXMgVGhlIG51bWJlciBvZiBzdHlsZXMgYXZhaWxhYmxlLlxuICogIEByZXR1cm4ge09iamVjdH0gQSBvYmplY3QgcHJvcGVydGllczogJ3RleHQnIChzdHJpbmcpIGFuZCAnaW5kZXgnIChudW1iZXIpLlxuICogIEBwcml2YXRlXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuY2FsY3VsYXRvcl8gPSBmdW5jdGlvbihtYXJrZXJzLCBudW1TdHlsZXMpIHtcbiAgdmFyIGluZGV4ID0gMDtcbiAgdmFyIGNvdW50ID0gbWFya2Vycy5sZW5ndGg7XG4gIHZhciBkdiA9IGNvdW50O1xuICB3aGlsZSAoZHYgIT09IDApIHtcbiAgICBkdiA9IHBhcnNlSW50KGR2IC8gMTAsIDEwKTtcbiAgICBpbmRleCsrO1xuICB9XG5cbiAgaW5kZXggPSBNYXRoLm1pbihpbmRleCwgbnVtU3R5bGVzKTtcbiAgcmV0dXJuIHtcbiAgICB0ZXh0OiBjb3VudCxcbiAgICBpbmRleDogaW5kZXhcbiAgfTtcbn07XG5cblxuLyoqXG4gKiBTZXQgdGhlIGNhbGN1bGF0b3IgZnVuY3Rpb24uXG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbihBcnJheSwgbnVtYmVyKX0gY2FsY3VsYXRvciBUaGUgZnVuY3Rpb24gdG8gc2V0IGFzIHRoZVxuICogICAgIGNhbGN1bGF0b3IuIFRoZSBmdW5jdGlvbiBzaG91bGQgcmV0dXJuIGEgb2JqZWN0IHByb3BlcnRpZXM6XG4gKiAgICAgJ3RleHQnIChzdHJpbmcpIGFuZCAnaW5kZXgnIChudW1iZXIpLlxuICpcbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5zZXRDYWxjdWxhdG9yID0gZnVuY3Rpb24oY2FsY3VsYXRvcikge1xuICB0aGlzLmNhbGN1bGF0b3JfID0gY2FsY3VsYXRvcjtcbn07XG5cblxuLyoqXG4gKiBHZXQgdGhlIGNhbGN1bGF0b3IgZnVuY3Rpb24uXG4gKlxuICogQHJldHVybiB7ZnVuY3Rpb24oQXJyYXksIG51bWJlcil9IHRoZSBjYWxjdWxhdG9yIGZ1bmN0aW9uLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldENhbGN1bGF0b3IgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuY2FsY3VsYXRvcl87XG59O1xuXG5cbi8qKlxuICogQWRkIGFuIGFycmF5IG9mIG1hcmtlcnMgdG8gdGhlIGNsdXN0ZXJlci5cbiAqXG4gKiBAcGFyYW0ge0FycmF5Ljxnb29nbGUubWFwcy5NYXJrZXI+fSBtYXJrZXJzIFRoZSBtYXJrZXJzIHRvIGFkZC5cbiAqIEBwYXJhbSB7Ym9vbGVhbj19IG9wdF9ub2RyYXcgV2hldGhlciB0byByZWRyYXcgdGhlIGNsdXN0ZXJzLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmFkZE1hcmtlcnMgPSBmdW5jdGlvbihtYXJrZXJzLCBvcHRfbm9kcmF3KSB7XG4gIGZvciAodmFyIGkgPSAwLCBtYXJrZXI7IG1hcmtlciA9IG1hcmtlcnNbaV07IGkrKykge1xuICAgIHRoaXMucHVzaE1hcmtlclRvXyhtYXJrZXIpO1xuICB9XG4gIGlmICghb3B0X25vZHJhdykge1xuICAgIHRoaXMucmVkcmF3KCk7XG4gIH1cbn07XG5cblxuLyoqXG4gKiBQdXNoZXMgYSBtYXJrZXIgdG8gdGhlIGNsdXN0ZXJlci5cbiAqXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLk1hcmtlcn0gbWFya2VyIFRoZSBtYXJrZXIgdG8gYWRkLlxuICogQHByaXZhdGVcbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5wdXNoTWFya2VyVG9fID0gZnVuY3Rpb24obWFya2VyKSB7XG4gIG1hcmtlci5pc0FkZGVkID0gZmFsc2U7XG4gIGlmIChtYXJrZXJbJ2RyYWdnYWJsZSddKSB7XG4gICAgLy8gSWYgdGhlIG1hcmtlciBpcyBkcmFnZ2FibGUgYWRkIGEgbGlzdGVuZXIgc28gd2UgdXBkYXRlIHRoZSBjbHVzdGVycyBvblxuICAgIC8vIHRoZSBkcmFnIGVuZC5cbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIobWFya2VyLCAnZHJhZ2VuZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgbWFya2VyLmlzQWRkZWQgPSBmYWxzZTtcbiAgICAgIHRoYXQucmVwYWludCgpO1xuICAgIH0pO1xuICB9XG4gIHRoaXMubWFya2Vyc18ucHVzaChtYXJrZXIpO1xufTtcblxuXG4vKipcbiAqIEFkZHMgYSBtYXJrZXIgdG8gdGhlIGNsdXN0ZXJlciBhbmQgcmVkcmF3cyBpZiBuZWVkZWQuXG4gKlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5NYXJrZXJ9IG1hcmtlciBUaGUgbWFya2VyIHRvIGFkZC5cbiAqIEBwYXJhbSB7Ym9vbGVhbj19IG9wdF9ub2RyYXcgV2hldGhlciB0byByZWRyYXcgdGhlIGNsdXN0ZXJzLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmFkZE1hcmtlciA9IGZ1bmN0aW9uKG1hcmtlciwgb3B0X25vZHJhdykge1xuICB0aGlzLnB1c2hNYXJrZXJUb18obWFya2VyKTtcbiAgaWYgKCFvcHRfbm9kcmF3KSB7XG4gICAgdGhpcy5yZWRyYXcoKTtcbiAgfVxufTtcblxuXG4vKipcbiAqIFJlbW92ZXMgYSBtYXJrZXIgYW5kIHJldHVybnMgdHJ1ZSBpZiByZW1vdmVkLCBmYWxzZSBpZiBub3RcbiAqXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLk1hcmtlcn0gbWFya2VyIFRoZSBtYXJrZXIgdG8gcmVtb3ZlXG4gKiBAcmV0dXJuIHtib29sZWFufSBXaGV0aGVyIHRoZSBtYXJrZXIgd2FzIHJlbW92ZWQgb3Igbm90XG4gKiBAcHJpdmF0ZVxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnJlbW92ZU1hcmtlcl8gPSBmdW5jdGlvbihtYXJrZXIpIHtcbiAgdmFyIGluZGV4ID0gLTE7XG4gIGlmICh0aGlzLm1hcmtlcnNfLmluZGV4T2YpIHtcbiAgICBpbmRleCA9IHRoaXMubWFya2Vyc18uaW5kZXhPZihtYXJrZXIpO1xuICB9IGVsc2Uge1xuICAgIGZvciAodmFyIGkgPSAwLCBtOyBtID0gdGhpcy5tYXJrZXJzX1tpXTsgaSsrKSB7XG4gICAgICBpZiAobSA9PSBtYXJrZXIpIHtcbiAgICAgICAgaW5kZXggPSBpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAoaW5kZXggPT0gLTEpIHtcbiAgICAvLyBNYXJrZXIgaXMgbm90IGluIG91ciBsaXN0IG9mIG1hcmtlcnMuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgbWFya2VyLnNldE1hcChudWxsKTtcblxuICB0aGlzLm1hcmtlcnNfLnNwbGljZShpbmRleCwgMSk7XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5cbi8qKlxuICogUmVtb3ZlIGEgbWFya2VyIGZyb20gdGhlIGNsdXN0ZXIuXG4gKlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5NYXJrZXJ9IG1hcmtlciBUaGUgbWFya2VyIHRvIHJlbW92ZS5cbiAqIEBwYXJhbSB7Ym9vbGVhbj19IG9wdF9ub2RyYXcgT3B0aW9uYWwgYm9vbGVhbiB0byBmb3JjZSBubyByZWRyYXcuXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIHRoZSBtYXJrZXIgd2FzIHJlbW92ZWQuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUucmVtb3ZlTWFya2VyID0gZnVuY3Rpb24obWFya2VyLCBvcHRfbm9kcmF3KSB7XG4gIHZhciByZW1vdmVkID0gdGhpcy5yZW1vdmVNYXJrZXJfKG1hcmtlcik7XG5cbiAgaWYgKCFvcHRfbm9kcmF3ICYmIHJlbW92ZWQpIHtcbiAgICB0aGlzLnJlc2V0Vmlld3BvcnQoKTtcbiAgICB0aGlzLnJlZHJhdygpO1xuICAgIHJldHVybiB0cnVlO1xuICB9IGVsc2Uge1xuICAgcmV0dXJuIGZhbHNlO1xuICB9XG59O1xuXG5cbi8qKlxuICogUmVtb3ZlcyBhbiBhcnJheSBvZiBtYXJrZXJzIGZyb20gdGhlIGNsdXN0ZXIuXG4gKlxuICogQHBhcmFtIHtBcnJheS48Z29vZ2xlLm1hcHMuTWFya2VyPn0gbWFya2VycyBUaGUgbWFya2VycyB0byByZW1vdmUuXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSBvcHRfbm9kcmF3IE9wdGlvbmFsIGJvb2xlYW4gdG8gZm9yY2Ugbm8gcmVkcmF3LlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnJlbW92ZU1hcmtlcnMgPSBmdW5jdGlvbihtYXJrZXJzLCBvcHRfbm9kcmF3KSB7XG4gIHZhciByZW1vdmVkID0gZmFsc2U7XG5cbiAgZm9yICh2YXIgaSA9IDAsIG1hcmtlcjsgbWFya2VyID0gbWFya2Vyc1tpXTsgaSsrKSB7XG4gICAgdmFyIHIgPSB0aGlzLnJlbW92ZU1hcmtlcl8obWFya2VyKTtcbiAgICByZW1vdmVkID0gcmVtb3ZlZCB8fCByO1xuICB9XG5cbiAgaWYgKCFvcHRfbm9kcmF3ICYmIHJlbW92ZWQpIHtcbiAgICB0aGlzLnJlc2V0Vmlld3BvcnQoKTtcbiAgICB0aGlzLnJlZHJhdygpO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59O1xuXG5cbi8qKlxuICogU2V0cyB0aGUgY2x1c3RlcmVyJ3MgcmVhZHkgc3RhdGUuXG4gKlxuICogQHBhcmFtIHtib29sZWFufSByZWFkeSBUaGUgc3RhdGUuXG4gKiBAcHJpdmF0ZVxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnNldFJlYWR5XyA9IGZ1bmN0aW9uKHJlYWR5KSB7XG4gIGlmICghdGhpcy5yZWFkeV8pIHtcbiAgICB0aGlzLnJlYWR5XyA9IHJlYWR5O1xuICAgIHRoaXMuY3JlYXRlQ2x1c3RlcnNfKCk7XG4gIH1cbn07XG5cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgY2x1c3RlcnMgaW4gdGhlIGNsdXN0ZXJlci5cbiAqXG4gKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSBudW1iZXIgb2YgY2x1c3RlcnMuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0VG90YWxDbHVzdGVycyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5jbHVzdGVyc18ubGVuZ3RoO1xufTtcblxuXG4vKipcbiAqIFJldHVybnMgdGhlIGdvb2dsZSBtYXAgdGhhdCB0aGUgY2x1c3RlcmVyIGlzIGFzc29jaWF0ZWQgd2l0aC5cbiAqXG4gKiBAcmV0dXJuIHtnb29nbGUubWFwcy5NYXB9IFRoZSBtYXAuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0TWFwID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLm1hcF87XG59O1xuXG5cbi8qKlxuICogU2V0cyB0aGUgZ29vZ2xlIG1hcCB0aGF0IHRoZSBjbHVzdGVyZXIgaXMgYXNzb2NpYXRlZCB3aXRoLlxuICpcbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTWFwfSBtYXAgVGhlIG1hcC5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5zZXRNYXAgPSBmdW5jdGlvbihtYXApIHtcbiAgdGhpcy5tYXBfID0gbWFwO1xufTtcblxuXG4vKipcbiAqIFJldHVybnMgdGhlIHNpemUgb2YgdGhlIGdyaWQuXG4gKlxuICogQHJldHVybiB7bnVtYmVyfSBUaGUgZ3JpZCBzaXplLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldEdyaWRTaXplID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmdyaWRTaXplXztcbn07XG5cblxuLyoqXG4gKiBTZXRzIHRoZSBzaXplIG9mIHRoZSBncmlkLlxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBzaXplIFRoZSBncmlkIHNpemUuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuc2V0R3JpZFNpemUgPSBmdW5jdGlvbihzaXplKSB7XG4gIHRoaXMuZ3JpZFNpemVfID0gc2l6ZTtcbn07XG5cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBtaW4gY2x1c3RlciBzaXplLlxuICpcbiAqIEByZXR1cm4ge251bWJlcn0gVGhlIGdyaWQgc2l6ZS5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRNaW5DbHVzdGVyU2l6ZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5taW5DbHVzdGVyU2l6ZV87XG59O1xuXG4vKipcbiAqIFNldHMgdGhlIG1pbiBjbHVzdGVyIHNpemUuXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IHNpemUgVGhlIGdyaWQgc2l6ZS5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5zZXRNaW5DbHVzdGVyU2l6ZSA9IGZ1bmN0aW9uKHNpemUpIHtcbiAgdGhpcy5taW5DbHVzdGVyU2l6ZV8gPSBzaXplO1xufTtcblxuXG4vKipcbiAqIEV4dGVuZHMgYSBib3VuZHMgb2JqZWN0IGJ5IHRoZSBncmlkIHNpemUuXG4gKlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5MYXRMbmdCb3VuZHN9IGJvdW5kcyBUaGUgYm91bmRzIHRvIGV4dGVuZC5cbiAqIEByZXR1cm4ge2dvb2dsZS5tYXBzLkxhdExuZ0JvdW5kc30gVGhlIGV4dGVuZGVkIGJvdW5kcy5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRFeHRlbmRlZEJvdW5kcyA9IGZ1bmN0aW9uKGJvdW5kcykge1xuICB2YXIgcHJvamVjdGlvbiA9IHRoaXMuZ2V0UHJvamVjdGlvbigpO1xuXG4gIC8vIFR1cm4gdGhlIGJvdW5kcyBpbnRvIGxhdGxuZy5cbiAgdmFyIHRyID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhib3VuZHMuZ2V0Tm9ydGhFYXN0KCkubGF0KCksXG4gICAgICBib3VuZHMuZ2V0Tm9ydGhFYXN0KCkubG5nKCkpO1xuICB2YXIgYmwgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKGJvdW5kcy5nZXRTb3V0aFdlc3QoKS5sYXQoKSxcbiAgICAgIGJvdW5kcy5nZXRTb3V0aFdlc3QoKS5sbmcoKSk7XG5cbiAgLy8gQ29udmVydCB0aGUgcG9pbnRzIHRvIHBpeGVscyBhbmQgdGhlIGV4dGVuZCBvdXQgYnkgdGhlIGdyaWQgc2l6ZS5cbiAgdmFyIHRyUGl4ID0gcHJvamVjdGlvbi5mcm9tTGF0TG5nVG9EaXZQaXhlbCh0cik7XG4gIHRyUGl4LnggKz0gdGhpcy5ncmlkU2l6ZV87XG4gIHRyUGl4LnkgLT0gdGhpcy5ncmlkU2l6ZV87XG5cbiAgdmFyIGJsUGl4ID0gcHJvamVjdGlvbi5mcm9tTGF0TG5nVG9EaXZQaXhlbChibCk7XG4gIGJsUGl4LnggLT0gdGhpcy5ncmlkU2l6ZV87XG4gIGJsUGl4LnkgKz0gdGhpcy5ncmlkU2l6ZV87XG5cbiAgLy8gQ29udmVydCB0aGUgcGl4ZWwgcG9pbnRzIGJhY2sgdG8gTGF0TG5nXG4gIHZhciBuZSA9IHByb2plY3Rpb24uZnJvbURpdlBpeGVsVG9MYXRMbmcodHJQaXgpO1xuICB2YXIgc3cgPSBwcm9qZWN0aW9uLmZyb21EaXZQaXhlbFRvTGF0TG5nKGJsUGl4KTtcblxuICAvLyBFeHRlbmQgdGhlIGJvdW5kcyB0byBjb250YWluIHRoZSBuZXcgYm91bmRzLlxuICBib3VuZHMuZXh0ZW5kKG5lKTtcbiAgYm91bmRzLmV4dGVuZChzdyk7XG5cbiAgcmV0dXJuIGJvdW5kcztcbn07XG5cblxuLyoqXG4gKiBEZXRlcm1pbnMgaWYgYSBtYXJrZXIgaXMgY29udGFpbmVkIGluIGEgYm91bmRzLlxuICpcbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTWFya2VyfSBtYXJrZXIgVGhlIG1hcmtlciB0byBjaGVjay5cbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTGF0TG5nQm91bmRzfSBib3VuZHMgVGhlIGJvdW5kcyB0byBjaGVjayBhZ2FpbnN0LlxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgbWFya2VyIGlzIGluIHRoZSBib3VuZHMuXG4gKiBAcHJpdmF0ZVxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmlzTWFya2VySW5Cb3VuZHNfID0gZnVuY3Rpb24obWFya2VyLCBib3VuZHMpIHtcbiAgcmV0dXJuIGJvdW5kcy5jb250YWlucyhtYXJrZXIuZ2V0UG9zaXRpb24oKSk7XG59O1xuXG5cbi8qKlxuICogQ2xlYXJzIGFsbCBjbHVzdGVycyBhbmQgbWFya2VycyBmcm9tIHRoZSBjbHVzdGVyZXIuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuY2xlYXJNYXJrZXJzID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMucmVzZXRWaWV3cG9ydCh0cnVlKTtcblxuICAvLyBTZXQgdGhlIG1hcmtlcnMgYSBlbXB0eSBhcnJheS5cbiAgdGhpcy5tYXJrZXJzXyA9IFtdO1xufTtcblxuXG4vKipcbiAqIENsZWFycyBhbGwgZXhpc3RpbmcgY2x1c3RlcnMgYW5kIHJlY3JlYXRlcyB0aGVtLlxuICogQHBhcmFtIHtib29sZWFufSBvcHRfaGlkZSBUbyBhbHNvIGhpZGUgdGhlIG1hcmtlci5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5yZXNldFZpZXdwb3J0ID0gZnVuY3Rpb24ob3B0X2hpZGUpIHtcbiAgLy8gUmVtb3ZlIGFsbCB0aGUgY2x1c3RlcnNcbiAgZm9yICh2YXIgaSA9IDAsIGNsdXN0ZXI7IGNsdXN0ZXIgPSB0aGlzLmNsdXN0ZXJzX1tpXTsgaSsrKSB7XG4gICAgY2x1c3Rlci5yZW1vdmUoKTtcbiAgfVxuXG4gIC8vIFJlc2V0IHRoZSBtYXJrZXJzIHRvIG5vdCBiZSBhZGRlZCBhbmQgdG8gYmUgaW52aXNpYmxlLlxuICBmb3IgKHZhciBpID0gMCwgbWFya2VyOyBtYXJrZXIgPSB0aGlzLm1hcmtlcnNfW2ldOyBpKyspIHtcbiAgICBtYXJrZXIuaXNBZGRlZCA9IGZhbHNlO1xuICAgIGlmIChvcHRfaGlkZSkge1xuICAgICAgbWFya2VyLnNldE1hcChudWxsKTtcbiAgICB9XG4gIH1cblxuICB0aGlzLmNsdXN0ZXJzXyA9IFtdO1xufTtcblxuLyoqXG4gKlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnJlcGFpbnQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIG9sZENsdXN0ZXJzID0gdGhpcy5jbHVzdGVyc18uc2xpY2UoKTtcbiAgdGhpcy5jbHVzdGVyc18ubGVuZ3RoID0gMDtcbiAgdGhpcy5yZXNldFZpZXdwb3J0KCk7XG4gIHRoaXMucmVkcmF3KCk7XG5cbiAgLy8gUmVtb3ZlIHRoZSBvbGQgY2x1c3RlcnMuXG4gIC8vIERvIGl0IGluIGEgdGltZW91dCBzbyB0aGUgb3RoZXIgY2x1c3RlcnMgaGF2ZSBiZWVuIGRyYXduIGZpcnN0LlxuICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgY2x1c3RlcjsgY2x1c3RlciA9IG9sZENsdXN0ZXJzW2ldOyBpKyspIHtcbiAgICAgIGNsdXN0ZXIucmVtb3ZlKCk7XG4gICAgfVxuICB9LCAwKTtcbn07XG5cblxuLyoqXG4gKiBSZWRyYXdzIHRoZSBjbHVzdGVycy5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5yZWRyYXcgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5jcmVhdGVDbHVzdGVyc18oKTtcbn07XG5cblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIHR3byBsYXRsbmcgbG9jYXRpb25zIGluIGttLlxuICogQHNlZSBodHRwOi8vd3d3Lm1vdmFibGUtdHlwZS5jby51ay9zY3JpcHRzL2xhdGxvbmcuaHRtbFxuICpcbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTGF0TG5nfSBwMSBUaGUgZmlyc3QgbGF0IGxuZyBwb2ludC5cbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTGF0TG5nfSBwMiBUaGUgc2Vjb25kIGxhdCBsbmcgcG9pbnQuXG4gKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSBkaXN0YW5jZSBiZXR3ZWVuIHRoZSB0d28gcG9pbnRzIGluIGttLlxuICogQHByaXZhdGVcbiovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmRpc3RhbmNlQmV0d2VlblBvaW50c18gPSBmdW5jdGlvbihwMSwgcDIpIHtcbiAgaWYgKCFwMSB8fCAhcDIpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIHZhciBSID0gNjM3MTsgLy8gUmFkaXVzIG9mIHRoZSBFYXJ0aCBpbiBrbVxuICB2YXIgZExhdCA9IChwMi5sYXQoKSAtIHAxLmxhdCgpKSAqIE1hdGguUEkgLyAxODA7XG4gIHZhciBkTG9uID0gKHAyLmxuZygpIC0gcDEubG5nKCkpICogTWF0aC5QSSAvIDE4MDtcbiAgdmFyIGEgPSBNYXRoLnNpbihkTGF0IC8gMikgKiBNYXRoLnNpbihkTGF0IC8gMikgK1xuICAgIE1hdGguY29zKHAxLmxhdCgpICogTWF0aC5QSSAvIDE4MCkgKiBNYXRoLmNvcyhwMi5sYXQoKSAqIE1hdGguUEkgLyAxODApICpcbiAgICBNYXRoLnNpbihkTG9uIC8gMikgKiBNYXRoLnNpbihkTG9uIC8gMik7XG4gIHZhciBjID0gMiAqIE1hdGguYXRhbjIoTWF0aC5zcXJ0KGEpLCBNYXRoLnNxcnQoMSAtIGEpKTtcbiAgdmFyIGQgPSBSICogYztcbiAgcmV0dXJuIGQ7XG59O1xuXG5cbi8qKlxuICogQWRkIGEgbWFya2VyIHRvIGEgY2x1c3Rlciwgb3IgY3JlYXRlcyBhIG5ldyBjbHVzdGVyLlxuICpcbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTWFya2VyfSBtYXJrZXIgVGhlIG1hcmtlciB0byBhZGQuXG4gKiBAcHJpdmF0ZVxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmFkZFRvQ2xvc2VzdENsdXN0ZXJfID0gZnVuY3Rpb24obWFya2VyKSB7XG4gIHZhciBkaXN0YW5jZSA9IDQwMDAwOyAvLyBTb21lIGxhcmdlIG51bWJlclxuICB2YXIgY2x1c3RlclRvQWRkVG8gPSBudWxsO1xuICB2YXIgcG9zID0gbWFya2VyLmdldFBvc2l0aW9uKCk7XG4gIGZvciAodmFyIGkgPSAwLCBjbHVzdGVyOyBjbHVzdGVyID0gdGhpcy5jbHVzdGVyc19baV07IGkrKykge1xuICAgIHZhciBjZW50ZXIgPSBjbHVzdGVyLmdldENlbnRlcigpO1xuICAgIGlmIChjZW50ZXIpIHtcbiAgICAgIHZhciBkID0gdGhpcy5kaXN0YW5jZUJldHdlZW5Qb2ludHNfKGNlbnRlciwgbWFya2VyLmdldFBvc2l0aW9uKCkpO1xuICAgICAgaWYgKGQgPCBkaXN0YW5jZSkge1xuICAgICAgICBkaXN0YW5jZSA9IGQ7XG4gICAgICAgIGNsdXN0ZXJUb0FkZFRvID0gY2x1c3RlcjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAoY2x1c3RlclRvQWRkVG8gJiYgY2x1c3RlclRvQWRkVG8uaXNNYXJrZXJJbkNsdXN0ZXJCb3VuZHMobWFya2VyKSkge1xuICAgIGNsdXN0ZXJUb0FkZFRvLmFkZE1hcmtlcihtYXJrZXIpO1xuICB9IGVsc2Uge1xuICAgIHZhciBjbHVzdGVyID0gbmV3IENsdXN0ZXIodGhpcyk7XG4gICAgY2x1c3Rlci5hZGRNYXJrZXIobWFya2VyKTtcbiAgICB0aGlzLmNsdXN0ZXJzXy5wdXNoKGNsdXN0ZXIpO1xuICB9XG59O1xuXG5cbi8qKlxuICogQ3JlYXRlcyB0aGUgY2x1c3RlcnMuXG4gKlxuICogQHByaXZhdGVcbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5jcmVhdGVDbHVzdGVyc18gPSBmdW5jdGlvbigpIHtcbiAgaWYgKCF0aGlzLnJlYWR5Xykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIEdldCBvdXIgY3VycmVudCBtYXAgdmlldyBib3VuZHMuXG4gIC8vIENyZWF0ZSBhIG5ldyBib3VuZHMgb2JqZWN0IHNvIHdlIGRvbid0IGFmZmVjdCB0aGUgbWFwLlxuICB2YXIgbWFwQm91bmRzID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZ0JvdW5kcyh0aGlzLm1hcF8uZ2V0Qm91bmRzKCkuZ2V0U291dGhXZXN0KCksXG4gICAgICB0aGlzLm1hcF8uZ2V0Qm91bmRzKCkuZ2V0Tm9ydGhFYXN0KCkpO1xuICB2YXIgYm91bmRzID0gdGhpcy5nZXRFeHRlbmRlZEJvdW5kcyhtYXBCb3VuZHMpO1xuXG4gIGZvciAodmFyIGkgPSAwLCBtYXJrZXI7IG1hcmtlciA9IHRoaXMubWFya2Vyc19baV07IGkrKykge1xuICAgIGlmICghbWFya2VyLmlzQWRkZWQgJiYgdGhpcy5pc01hcmtlckluQm91bmRzXyhtYXJrZXIsIGJvdW5kcykpIHtcbiAgICAgIHRoaXMuYWRkVG9DbG9zZXN0Q2x1c3Rlcl8obWFya2VyKTtcbiAgICB9XG4gIH1cbn07XG5cblxuLyoqXG4gKiBBIGNsdXN0ZXIgdGhhdCBjb250YWlucyBtYXJrZXJzLlxuICpcbiAqIEBwYXJhbSB7TWFya2VyQ2x1c3RlcmVyfSBtYXJrZXJDbHVzdGVyZXIgVGhlIG1hcmtlcmNsdXN0ZXJlciB0aGF0IHRoaXNcbiAqICAgICBjbHVzdGVyIGlzIGFzc29jaWF0ZWQgd2l0aC5cbiAqIEBjb25zdHJ1Y3RvclxuICogQGlnbm9yZVxuICovXG5mdW5jdGlvbiBDbHVzdGVyKG1hcmtlckNsdXN0ZXJlcikge1xuICB0aGlzLm1hcmtlckNsdXN0ZXJlcl8gPSBtYXJrZXJDbHVzdGVyZXI7XG4gIHRoaXMubWFwXyA9IG1hcmtlckNsdXN0ZXJlci5nZXRNYXAoKTtcbiAgdGhpcy5ncmlkU2l6ZV8gPSBtYXJrZXJDbHVzdGVyZXIuZ2V0R3JpZFNpemUoKTtcbiAgdGhpcy5taW5DbHVzdGVyU2l6ZV8gPSBtYXJrZXJDbHVzdGVyZXIuZ2V0TWluQ2x1c3RlclNpemUoKTtcbiAgdGhpcy5hdmVyYWdlQ2VudGVyXyA9IG1hcmtlckNsdXN0ZXJlci5pc0F2ZXJhZ2VDZW50ZXIoKTtcbiAgdGhpcy5jZW50ZXJfID0gbnVsbDtcbiAgdGhpcy5tYXJrZXJzXyA9IFtdO1xuICB0aGlzLmJvdW5kc18gPSBudWxsO1xuICB0aGlzLmNsdXN0ZXJJY29uXyA9IG5ldyBDbHVzdGVySWNvbih0aGlzLCBtYXJrZXJDbHVzdGVyZXIuZ2V0U3R5bGVzKCksXG4gICAgICBtYXJrZXJDbHVzdGVyZXIuZ2V0R3JpZFNpemUoKSk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5zIGlmIGEgbWFya2VyIGlzIGFscmVhZHkgYWRkZWQgdG8gdGhlIGNsdXN0ZXIuXG4gKlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5NYXJrZXJ9IG1hcmtlciBUaGUgbWFya2VyIHRvIGNoZWNrLlxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgbWFya2VyIGlzIGFscmVhZHkgYWRkZWQuXG4gKi9cbkNsdXN0ZXIucHJvdG90eXBlLmlzTWFya2VyQWxyZWFkeUFkZGVkID0gZnVuY3Rpb24obWFya2VyKSB7XG4gIGlmICh0aGlzLm1hcmtlcnNfLmluZGV4T2YpIHtcbiAgICByZXR1cm4gdGhpcy5tYXJrZXJzXy5pbmRleE9mKG1hcmtlcikgIT0gLTE7XG4gIH0gZWxzZSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIG07IG0gPSB0aGlzLm1hcmtlcnNfW2ldOyBpKyspIHtcbiAgICAgIGlmIChtID09IG1hcmtlcikge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuXG4vKipcbiAqIEFkZCBhIG1hcmtlciB0aGUgY2x1c3Rlci5cbiAqXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLk1hcmtlcn0gbWFya2VyIFRoZSBtYXJrZXIgdG8gYWRkLlxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgbWFya2VyIHdhcyBhZGRlZC5cbiAqL1xuQ2x1c3Rlci5wcm90b3R5cGUuYWRkTWFya2VyID0gZnVuY3Rpb24obWFya2VyKSB7XG4gIGlmICh0aGlzLmlzTWFya2VyQWxyZWFkeUFkZGVkKG1hcmtlcikpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAoIXRoaXMuY2VudGVyXykge1xuICAgIHRoaXMuY2VudGVyXyA9IG1hcmtlci5nZXRQb3NpdGlvbigpO1xuICAgIHRoaXMuY2FsY3VsYXRlQm91bmRzXygpO1xuICB9IGVsc2Uge1xuICAgIGlmICh0aGlzLmF2ZXJhZ2VDZW50ZXJfKSB7XG4gICAgICB2YXIgbCA9IHRoaXMubWFya2Vyc18ubGVuZ3RoICsgMTtcbiAgICAgIHZhciBsYXQgPSAodGhpcy5jZW50ZXJfLmxhdCgpICogKGwtMSkgKyBtYXJrZXIuZ2V0UG9zaXRpb24oKS5sYXQoKSkgLyBsO1xuICAgICAgdmFyIGxuZyA9ICh0aGlzLmNlbnRlcl8ubG5nKCkgKiAobC0xKSArIG1hcmtlci5nZXRQb3NpdGlvbigpLmxuZygpKSAvIGw7XG4gICAgICB0aGlzLmNlbnRlcl8gPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKGxhdCwgbG5nKTtcbiAgICAgIHRoaXMuY2FsY3VsYXRlQm91bmRzXygpO1xuICAgIH1cbiAgfVxuXG4gIG1hcmtlci5pc0FkZGVkID0gdHJ1ZTtcbiAgdGhpcy5tYXJrZXJzXy5wdXNoKG1hcmtlcik7XG5cbiAgdmFyIGxlbiA9IHRoaXMubWFya2Vyc18ubGVuZ3RoO1xuICBpZiAobGVuIDwgdGhpcy5taW5DbHVzdGVyU2l6ZV8gJiYgbWFya2VyLmdldE1hcCgpICE9IHRoaXMubWFwXykge1xuICAgIC8vIE1pbiBjbHVzdGVyIHNpemUgbm90IHJlYWNoZWQgc28gc2hvdyB0aGUgbWFya2VyLlxuICAgIG1hcmtlci5zZXRNYXAodGhpcy5tYXBfKTtcbiAgfVxuXG4gIGlmIChsZW4gPT0gdGhpcy5taW5DbHVzdGVyU2l6ZV8pIHtcbiAgICAvLyBIaWRlIHRoZSBtYXJrZXJzIHRoYXQgd2VyZSBzaG93aW5nLlxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIHRoaXMubWFya2Vyc19baV0uc2V0TWFwKG51bGwpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChsZW4gPj0gdGhpcy5taW5DbHVzdGVyU2l6ZV8pIHtcbiAgICBtYXJrZXIuc2V0TWFwKG51bGwpO1xuICB9XG5cbiAgdGhpcy51cGRhdGVJY29uKCk7XG4gIHJldHVybiB0cnVlO1xufTtcblxuXG4vKipcbiAqIFJldHVybnMgdGhlIG1hcmtlciBjbHVzdGVyZXIgdGhhdCB0aGUgY2x1c3RlciBpcyBhc3NvY2lhdGVkIHdpdGguXG4gKlxuICogQHJldHVybiB7TWFya2VyQ2x1c3RlcmVyfSBUaGUgYXNzb2NpYXRlZCBtYXJrZXIgY2x1c3RlcmVyLlxuICovXG5DbHVzdGVyLnByb3RvdHlwZS5nZXRNYXJrZXJDbHVzdGVyZXIgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMubWFya2VyQ2x1c3RlcmVyXztcbn07XG5cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBib3VuZHMgb2YgdGhlIGNsdXN0ZXIuXG4gKlxuICogQHJldHVybiB7Z29vZ2xlLm1hcHMuTGF0TG5nQm91bmRzfSB0aGUgY2x1c3RlciBib3VuZHMuXG4gKi9cbkNsdXN0ZXIucHJvdG90eXBlLmdldEJvdW5kcyA9IGZ1bmN0aW9uKCkge1xuICB2YXIgYm91bmRzID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZ0JvdW5kcyh0aGlzLmNlbnRlcl8sIHRoaXMuY2VudGVyXyk7XG4gIHZhciBtYXJrZXJzID0gdGhpcy5nZXRNYXJrZXJzKCk7XG4gIGZvciAodmFyIGkgPSAwLCBtYXJrZXI7IG1hcmtlciA9IG1hcmtlcnNbaV07IGkrKykge1xuICAgIGJvdW5kcy5leHRlbmQobWFya2VyLmdldFBvc2l0aW9uKCkpO1xuICB9XG4gIHJldHVybiBib3VuZHM7XG59O1xuXG5cbi8qKlxuICogUmVtb3ZlcyB0aGUgY2x1c3RlclxuICovXG5DbHVzdGVyLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5jbHVzdGVySWNvbl8ucmVtb3ZlKCk7XG4gIHRoaXMubWFya2Vyc18ubGVuZ3RoID0gMDtcbiAgZGVsZXRlIHRoaXMubWFya2Vyc187XG59O1xuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgY2VudGVyIG9mIHRoZSBjbHVzdGVyLlxuICpcbiAqIEByZXR1cm4ge251bWJlcn0gVGhlIGNsdXN0ZXIgY2VudGVyLlxuICovXG5DbHVzdGVyLnByb3RvdHlwZS5nZXRTaXplID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLm1hcmtlcnNfLmxlbmd0aDtcbn07XG5cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBjZW50ZXIgb2YgdGhlIGNsdXN0ZXIuXG4gKlxuICogQHJldHVybiB7QXJyYXkuPGdvb2dsZS5tYXBzLk1hcmtlcj59IFRoZSBjbHVzdGVyIGNlbnRlci5cbiAqL1xuQ2x1c3Rlci5wcm90b3R5cGUuZ2V0TWFya2VycyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5tYXJrZXJzXztcbn07XG5cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBjZW50ZXIgb2YgdGhlIGNsdXN0ZXIuXG4gKlxuICogQHJldHVybiB7Z29vZ2xlLm1hcHMuTGF0TG5nfSBUaGUgY2x1c3RlciBjZW50ZXIuXG4gKi9cbkNsdXN0ZXIucHJvdG90eXBlLmdldENlbnRlciA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5jZW50ZXJfO1xufTtcblxuXG4vKipcbiAqIENhbGN1bGF0ZWQgdGhlIGV4dGVuZGVkIGJvdW5kcyBvZiB0aGUgY2x1c3RlciB3aXRoIHRoZSBncmlkLlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbkNsdXN0ZXIucHJvdG90eXBlLmNhbGN1bGF0ZUJvdW5kc18gPSBmdW5jdGlvbigpIHtcbiAgdmFyIGJvdW5kcyA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmdCb3VuZHModGhpcy5jZW50ZXJfLCB0aGlzLmNlbnRlcl8pO1xuICB0aGlzLmJvdW5kc18gPSB0aGlzLm1hcmtlckNsdXN0ZXJlcl8uZ2V0RXh0ZW5kZWRCb3VuZHMoYm91bmRzKTtcbn07XG5cblxuLyoqXG4gKiBEZXRlcm1pbmVzIGlmIGEgbWFya2VyIGxpZXMgaW4gdGhlIGNsdXN0ZXJzIGJvdW5kcy5cbiAqXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLk1hcmtlcn0gbWFya2VyIFRoZSBtYXJrZXIgdG8gY2hlY2suXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIHRoZSBtYXJrZXIgbGllcyBpbiB0aGUgYm91bmRzLlxuICovXG5DbHVzdGVyLnByb3RvdHlwZS5pc01hcmtlckluQ2x1c3RlckJvdW5kcyA9IGZ1bmN0aW9uKG1hcmtlcikge1xuICByZXR1cm4gdGhpcy5ib3VuZHNfLmNvbnRhaW5zKG1hcmtlci5nZXRQb3NpdGlvbigpKTtcbn07XG5cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBtYXAgdGhhdCB0aGUgY2x1c3RlciBpcyBhc3NvY2lhdGVkIHdpdGguXG4gKlxuICogQHJldHVybiB7Z29vZ2xlLm1hcHMuTWFwfSBUaGUgbWFwLlxuICovXG5DbHVzdGVyLnByb3RvdHlwZS5nZXRNYXAgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMubWFwXztcbn07XG5cblxuLyoqXG4gKiBVcGRhdGVzIHRoZSBjbHVzdGVyIGljb25cbiAqL1xuQ2x1c3Rlci5wcm90b3R5cGUudXBkYXRlSWNvbiA9IGZ1bmN0aW9uKCkge1xuICB2YXIgem9vbSA9IHRoaXMubWFwXy5nZXRab29tKCk7XG4gIHZhciBteiA9IHRoaXMubWFya2VyQ2x1c3RlcmVyXy5nZXRNYXhab29tKCk7XG5cbiAgaWYgKG16ICYmIHpvb20gPiBteikge1xuICAgIC8vIFRoZSB6b29tIGlzIGdyZWF0ZXIgdGhhbiBvdXIgbWF4IHpvb20gc28gc2hvdyBhbGwgdGhlIG1hcmtlcnMgaW4gY2x1c3Rlci5cbiAgICBmb3IgKHZhciBpID0gMCwgbWFya2VyOyBtYXJrZXIgPSB0aGlzLm1hcmtlcnNfW2ldOyBpKyspIHtcbiAgICAgIG1hcmtlci5zZXRNYXAodGhpcy5tYXBfKTtcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKHRoaXMubWFya2Vyc18ubGVuZ3RoIDwgdGhpcy5taW5DbHVzdGVyU2l6ZV8pIHtcbiAgICAvLyBNaW4gY2x1c3RlciBzaXplIG5vdCB5ZXQgcmVhY2hlZC5cbiAgICB0aGlzLmNsdXN0ZXJJY29uXy5oaWRlKCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIG51bVN0eWxlcyA9IHRoaXMubWFya2VyQ2x1c3RlcmVyXy5nZXRTdHlsZXMoKS5sZW5ndGg7XG4gIHZhciBzdW1zID0gdGhpcy5tYXJrZXJDbHVzdGVyZXJfLmdldENhbGN1bGF0b3IoKSh0aGlzLm1hcmtlcnNfLCBudW1TdHlsZXMpO1xuICB0aGlzLmNsdXN0ZXJJY29uXy5zZXRDZW50ZXIodGhpcy5jZW50ZXJfKTtcbiAgdGhpcy5jbHVzdGVySWNvbl8uc2V0U3VtcyhzdW1zKTtcbiAgdGhpcy5jbHVzdGVySWNvbl8uc2hvdygpO1xufTtcblxuXG4vKipcbiAqIEEgY2x1c3RlciBpY29uXG4gKlxuICogQHBhcmFtIHtDbHVzdGVyfSBjbHVzdGVyIFRoZSBjbHVzdGVyIHRvIGJlIGFzc29jaWF0ZWQgd2l0aC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzdHlsZXMgQW4gb2JqZWN0IHRoYXQgaGFzIHN0eWxlIHByb3BlcnRpZXM6XG4gKiAgICAgJ3VybCc6IChzdHJpbmcpIFRoZSBpbWFnZSB1cmwuXG4gKiAgICAgJ2hlaWdodCc6IChudW1iZXIpIFRoZSBpbWFnZSBoZWlnaHQuXG4gKiAgICAgJ3dpZHRoJzogKG51bWJlcikgVGhlIGltYWdlIHdpZHRoLlxuICogICAgICdhbmNob3InOiAoQXJyYXkpIFRoZSBhbmNob3IgcG9zaXRpb24gb2YgdGhlIGxhYmVsIHRleHQuXG4gKiAgICAgJ3RleHRDb2xvcic6IChzdHJpbmcpIFRoZSB0ZXh0IGNvbG9yLlxuICogICAgICd0ZXh0U2l6ZSc6IChudW1iZXIpIFRoZSB0ZXh0IHNpemUuXG4gKiAgICAgICdmb250RmFtaWx5JzogKHN0cmluZykgVGhlIGZvbnQgZmFtaWx5LlxuICogICAgICAnZm9udFdlaWdodCc6IChzdHJpbmcpIFRoZSBmb250IHdlaWdodC5cbiAqICAgICAnYmFja2dyb3VuZFBvc2l0aW9uOiAoc3RyaW5nKSBUaGUgYmFja2dyb3VuZCBwb3N0aXRpb24geCwgeS5cbiAqIEBwYXJhbSB7bnVtYmVyPX0gb3B0X3BhZGRpbmcgT3B0aW9uYWwgcGFkZGluZyB0byBhcHBseSB0byB0aGUgY2x1c3RlciBpY29uLlxuICogQGNvbnN0cnVjdG9yXG4gKiBAZXh0ZW5kcyBnb29nbGUubWFwcy5PdmVybGF5Vmlld1xuICogQGlnbm9yZVxuICovXG5mdW5jdGlvbiBDbHVzdGVySWNvbihjbHVzdGVyLCBzdHlsZXMsIG9wdF9wYWRkaW5nKSB7XG4gIGNsdXN0ZXIuZ2V0TWFya2VyQ2x1c3RlcmVyKCkuZXh0ZW5kKENsdXN0ZXJJY29uLCBnb29nbGUubWFwcy5PdmVybGF5Vmlldyk7XG5cbiAgdGhpcy5zdHlsZXNfID0gc3R5bGVzO1xuICB0aGlzLnBhZGRpbmdfID0gb3B0X3BhZGRpbmcgfHwgMDtcbiAgdGhpcy5jbHVzdGVyXyA9IGNsdXN0ZXI7XG4gIHRoaXMuY2VudGVyXyA9IG51bGw7XG4gIHRoaXMubWFwXyA9IGNsdXN0ZXIuZ2V0TWFwKCk7XG4gIHRoaXMuZGl2XyA9IG51bGw7XG4gIHRoaXMuc3Vtc18gPSBudWxsO1xuICB0aGlzLnZpc2libGVfID0gZmFsc2U7XG5cbiAgdGhpcy5zZXRNYXAodGhpcy5tYXBfKTtcbn1cblxuXG4vKipcbiAqIFRyaWdnZXJzIHRoZSBjbHVzdGVyY2xpY2sgZXZlbnQgYW5kIHpvb20ncyBpZiB0aGUgb3B0aW9uIGlzIHNldC5cbiAqL1xuQ2x1c3Rlckljb24ucHJvdG90eXBlLnRyaWdnZXJDbHVzdGVyQ2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgdmFyIG1hcmtlckNsdXN0ZXJlciA9IHRoaXMuY2x1c3Rlcl8uZ2V0TWFya2VyQ2x1c3RlcmVyKCk7XG5cbiAgLy8gVHJpZ2dlciB0aGUgY2x1c3RlcmNsaWNrIGV2ZW50LlxuICBnb29nbGUubWFwcy5ldmVudC50cmlnZ2VyKG1hcmtlckNsdXN0ZXJlciwgJ2NsdXN0ZXJjbGljaycsIHRoaXMuY2x1c3Rlcl8pO1xuXG4gIGlmIChtYXJrZXJDbHVzdGVyZXIuaXNab29tT25DbGljaygpKSB7XG4gICAgLy8gWm9vbSBpbnRvIHRoZSBjbHVzdGVyLlxuICAgIHRoaXMubWFwXy5maXRCb3VuZHModGhpcy5jbHVzdGVyXy5nZXRCb3VuZHMoKSk7XG4gIH1cbn07XG5cblxuLyoqXG4gKiBBZGRpbmcgdGhlIGNsdXN0ZXIgaWNvbiB0byB0aGUgZG9tLlxuICogQGlnbm9yZVxuICovXG5DbHVzdGVySWNvbi5wcm90b3R5cGUub25BZGQgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5kaXZfID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XG4gIGlmICh0aGlzLnZpc2libGVfKSB7XG4gICAgdmFyIHBvcyA9IHRoaXMuZ2V0UG9zRnJvbUxhdExuZ18odGhpcy5jZW50ZXJfKTtcbiAgICB0aGlzLmRpdl8uc3R5bGUuY3NzVGV4dCA9IHRoaXMuY3JlYXRlQ3NzKHBvcyk7XG4gICAgdGhpcy5kaXZfLmlubmVySFRNTCA9IHRoaXMuc3Vtc18udGV4dDtcbiAgfVxuXG4gIHZhciBwYW5lcyA9IHRoaXMuZ2V0UGFuZXMoKTtcbiAgcGFuZXMub3ZlcmxheU1vdXNlVGFyZ2V0LmFwcGVuZENoaWxkKHRoaXMuZGl2Xyk7XG5cbiAgdmFyIHRoYXQgPSB0aGlzO1xuICBnb29nbGUubWFwcy5ldmVudC5hZGREb21MaXN0ZW5lcih0aGlzLmRpdl8sICdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgIHRoYXQudHJpZ2dlckNsdXN0ZXJDbGljaygpO1xuICB9KTtcbn07XG5cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBwb3NpdGlvbiB0byBwbGFjZSB0aGUgZGl2IGRlbmRpbmcgb24gdGhlIGxhdGxuZy5cbiAqXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLkxhdExuZ30gbGF0bG5nIFRoZSBwb3NpdGlvbiBpbiBsYXRsbmcuXG4gKiBAcmV0dXJuIHtnb29nbGUubWFwcy5Qb2ludH0gVGhlIHBvc2l0aW9uIGluIHBpeGVscy5cbiAqIEBwcml2YXRlXG4gKi9cbkNsdXN0ZXJJY29uLnByb3RvdHlwZS5nZXRQb3NGcm9tTGF0TG5nXyA9IGZ1bmN0aW9uKGxhdGxuZykge1xuICB2YXIgcG9zID0gdGhpcy5nZXRQcm9qZWN0aW9uKCkuZnJvbUxhdExuZ1RvRGl2UGl4ZWwobGF0bG5nKTtcbiAgcG9zLnggLT0gcGFyc2VJbnQodGhpcy53aWR0aF8gLyAyLCAxMCk7XG4gIHBvcy55IC09IHBhcnNlSW50KHRoaXMuaGVpZ2h0XyAvIDIsIDEwKTtcbiAgcmV0dXJuIHBvcztcbn07XG5cblxuLyoqXG4gKiBEcmF3IHRoZSBpY29uLlxuICogQGlnbm9yZVxuICovXG5DbHVzdGVySWNvbi5wcm90b3R5cGUuZHJhdyA9IGZ1bmN0aW9uKCkge1xuICBpZiAodGhpcy52aXNpYmxlXykge1xuICAgIHZhciBwb3MgPSB0aGlzLmdldFBvc0Zyb21MYXRMbmdfKHRoaXMuY2VudGVyXyk7XG4gICAgdGhpcy5kaXZfLnN0eWxlLnRvcCA9IHBvcy55ICsgJ3B4JztcbiAgICB0aGlzLmRpdl8uc3R5bGUubGVmdCA9IHBvcy54ICsgJ3B4JztcbiAgfVxufTtcblxuXG4vKipcbiAqIEhpZGUgdGhlIGljb24uXG4gKi9cbkNsdXN0ZXJJY29uLnByb3RvdHlwZS5oaWRlID0gZnVuY3Rpb24oKSB7XG4gIGlmICh0aGlzLmRpdl8pIHtcbiAgICB0aGlzLmRpdl8uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgfVxuICB0aGlzLnZpc2libGVfID0gZmFsc2U7XG59O1xuXG5cbi8qKlxuICogUG9zaXRpb24gYW5kIHNob3cgdGhlIGljb24uXG4gKi9cbkNsdXN0ZXJJY29uLnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24oKSB7XG4gIGlmICh0aGlzLmRpdl8pIHtcbiAgICB2YXIgcG9zID0gdGhpcy5nZXRQb3NGcm9tTGF0TG5nXyh0aGlzLmNlbnRlcl8pO1xuICAgIHRoaXMuZGl2Xy5zdHlsZS5jc3NUZXh0ID0gdGhpcy5jcmVhdGVDc3MocG9zKTtcbiAgICB0aGlzLmRpdl8uc3R5bGUuZGlzcGxheSA9ICcnO1xuICB9XG4gIHRoaXMudmlzaWJsZV8gPSB0cnVlO1xufTtcblxuXG4vKipcbiAqIFJlbW92ZSB0aGUgaWNvbiBmcm9tIHRoZSBtYXBcbiAqL1xuQ2x1c3Rlckljb24ucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnNldE1hcChudWxsKTtcbn07XG5cblxuLyoqXG4gKiBJbXBsZW1lbnRhdGlvbiBvZiB0aGUgb25SZW1vdmUgaW50ZXJmYWNlLlxuICogQGlnbm9yZVxuICovXG5DbHVzdGVySWNvbi5wcm90b3R5cGUub25SZW1vdmUgPSBmdW5jdGlvbigpIHtcbiAgaWYgKHRoaXMuZGl2XyAmJiB0aGlzLmRpdl8ucGFyZW50Tm9kZSkge1xuICAgIHRoaXMuaGlkZSgpO1xuICAgIHRoaXMuZGl2Xy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuZGl2Xyk7XG4gICAgdGhpcy5kaXZfID0gbnVsbDtcbiAgfVxufTtcblxuXG4vKipcbiAqIFNldCB0aGUgc3VtcyBvZiB0aGUgaWNvbi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gc3VtcyBUaGUgc3VtcyBjb250YWluaW5nOlxuICogICAndGV4dCc6IChzdHJpbmcpIFRoZSB0ZXh0IHRvIGRpc3BsYXkgaW4gdGhlIGljb24uXG4gKiAgICdpbmRleCc6IChudW1iZXIpIFRoZSBzdHlsZSBpbmRleCBvZiB0aGUgaWNvbi5cbiAqL1xuQ2x1c3Rlckljb24ucHJvdG90eXBlLnNldFN1bXMgPSBmdW5jdGlvbihzdW1zKSB7XG4gIHRoaXMuc3Vtc18gPSBzdW1zO1xuICB0aGlzLnRleHRfID0gc3Vtcy50ZXh0O1xuICB0aGlzLmluZGV4XyA9IHN1bXMuaW5kZXg7XG4gIGlmICh0aGlzLmRpdl8pIHtcbiAgICB0aGlzLmRpdl8uaW5uZXJIVE1MID0gc3Vtcy50ZXh0O1xuICB9XG5cbiAgdGhpcy51c2VTdHlsZSgpO1xufTtcblxuXG4vKipcbiAqIFNldHMgdGhlIGljb24gdG8gdGhlIHRoZSBzdHlsZXMuXG4gKi9cbkNsdXN0ZXJJY29uLnByb3RvdHlwZS51c2VTdHlsZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgaW5kZXggPSBNYXRoLm1heCgwLCB0aGlzLnN1bXNfLmluZGV4IC0gMSk7XG4gIGluZGV4ID0gTWF0aC5taW4odGhpcy5zdHlsZXNfLmxlbmd0aCAtIDEsIGluZGV4KTtcbiAgdmFyIHN0eWxlID0gdGhpcy5zdHlsZXNfW2luZGV4XTtcbiAgdGhpcy51cmxfID0gc3R5bGVbJ3VybCddO1xuICB0aGlzLmhlaWdodF8gPSBzdHlsZVsnaGVpZ2h0J107XG4gIHRoaXMud2lkdGhfID0gc3R5bGVbJ3dpZHRoJ107XG4gIHRoaXMudGV4dENvbG9yXyA9IHN0eWxlWyd0ZXh0Q29sb3InXTtcbiAgdGhpcy5hbmNob3JfID0gc3R5bGVbJ2FuY2hvciddO1xuICB0aGlzLnRleHRTaXplXyA9IHN0eWxlWyd0ZXh0U2l6ZSddO1xuICB0aGlzLmZvbnRGYW1pbHlfID0gc3R5bGVbJ2ZvbnRGYW1pbHknXTtcbiAgdGhpcy5mb250V2VpZ2h0XyA9IHN0eWxlWydmb250V2VpZ2h0J107XG4gIHRoaXMuYmFja2dyb3VuZFBvc2l0aW9uXyA9IHN0eWxlWydiYWNrZ3JvdW5kUG9zaXRpb24nXTtcbn07XG5cblxuLyoqXG4gKiBTZXRzIHRoZSBjZW50ZXIgb2YgdGhlIGljb24uXG4gKlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5MYXRMbmd9IGNlbnRlciBUaGUgbGF0bG5nIHRvIHNldCBhcyB0aGUgY2VudGVyLlxuICovXG5DbHVzdGVySWNvbi5wcm90b3R5cGUuc2V0Q2VudGVyID0gZnVuY3Rpb24oY2VudGVyKSB7XG4gIHRoaXMuY2VudGVyXyA9IGNlbnRlcjtcbn07XG5cblxuLyoqXG4gKiBDcmVhdGUgdGhlIGNzcyB0ZXh0IGJhc2VkIG9uIHRoZSBwb3NpdGlvbiBvZiB0aGUgaWNvbi5cbiAqXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLlBvaW50fSBwb3MgVGhlIHBvc2l0aW9uLlxuICogQHJldHVybiB7c3RyaW5nfSBUaGUgY3NzIHN0eWxlIHRleHQuXG4gKi9cbkNsdXN0ZXJJY29uLnByb3RvdHlwZS5jcmVhdGVDc3MgPSBmdW5jdGlvbihwb3MpIHtcbiAgdmFyIHN0eWxlID0gW107XG4gIHN0eWxlLnB1c2goJ2JhY2tncm91bmQtaW1hZ2U6dXJsKCcgKyB0aGlzLnVybF8gKyAnKTsnKTtcbiAgdmFyIGJhY2tncm91bmRQb3NpdGlvbiA9IHRoaXMuYmFja2dyb3VuZFBvc2l0aW9uXyA/IHRoaXMuYmFja2dyb3VuZFBvc2l0aW9uXyA6ICcwIDAnO1xuICBzdHlsZS5wdXNoKCdiYWNrZ3JvdW5kLXBvc2l0aW9uOicgKyBiYWNrZ3JvdW5kUG9zaXRpb24gKyAnOycpO1xuXG4gIGlmICh0eXBlb2YgdGhpcy5hbmNob3JfID09PSAnb2JqZWN0Jykge1xuICAgIGlmICh0eXBlb2YgdGhpcy5hbmNob3JfWzBdID09PSAnbnVtYmVyJyAmJiB0aGlzLmFuY2hvcl9bMF0gPiAwICYmXG4gICAgICAgIHRoaXMuYW5jaG9yX1swXSA8IHRoaXMuaGVpZ2h0Xykge1xuICAgICAgc3R5bGUucHVzaCgnaGVpZ2h0OicgKyAodGhpcy5oZWlnaHRfIC0gdGhpcy5hbmNob3JfWzBdKSArXG4gICAgICAgICAgJ3B4OyBwYWRkaW5nLXRvcDonICsgdGhpcy5hbmNob3JfWzBdICsgJ3B4OycpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZS5wdXNoKCdoZWlnaHQ6JyArIHRoaXMuaGVpZ2h0XyArICdweDsgbGluZS1oZWlnaHQ6JyArIHRoaXMuaGVpZ2h0XyArXG4gICAgICAgICAgJ3B4OycpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHRoaXMuYW5jaG9yX1sxXSA9PT0gJ251bWJlcicgJiYgdGhpcy5hbmNob3JfWzFdID4gMCAmJlxuICAgICAgICB0aGlzLmFuY2hvcl9bMV0gPCB0aGlzLndpZHRoXykge1xuICAgICAgc3R5bGUucHVzaCgnd2lkdGg6JyArICh0aGlzLndpZHRoXyAtIHRoaXMuYW5jaG9yX1sxXSkgK1xuICAgICAgICAgICdweDsgcGFkZGluZy1sZWZ0OicgKyB0aGlzLmFuY2hvcl9bMV0gKyAncHg7Jyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlLnB1c2goJ3dpZHRoOicgKyB0aGlzLndpZHRoXyArICdweDsgdGV4dC1hbGlnbjpjZW50ZXI7Jyk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHN0eWxlLnB1c2goJ2hlaWdodDonICsgdGhpcy5oZWlnaHRfICsgJ3B4OyBsaW5lLWhlaWdodDonICtcbiAgICAgICAgdGhpcy5oZWlnaHRfICsgJ3B4OyB3aWR0aDonICsgdGhpcy53aWR0aF8gKyAncHg7IHRleHQtYWxpZ246Y2VudGVyOycpO1xuICB9XG5cbiAgdmFyIHR4dENvbG9yID0gdGhpcy50ZXh0Q29sb3JfID8gdGhpcy50ZXh0Q29sb3JfIDogJ2JsYWNrJztcbiAgdmFyIHR4dFNpemUgPSB0aGlzLnRleHRTaXplXyA/IHRoaXMudGV4dFNpemVfIDogMTE7XG4gIHZhciBmb250RmFtaWx5ID0gdGhpcy5mb250RmFtaWx5XyA/IHRoaXMuZm9udEZhbWlseV8gOiAnQXJpYWwsc2Fucy1zZXJpZic7XG4gIHZhciBmb250V2VpZ2h0ID0gdGhpcy5mb250V2VpZ2h0XyA/IHRoaXMuZm9udFdlaWdodF8gOiAnNDAwJztcblxuICBzdHlsZS5wdXNoKCdjdXJzb3I6cG9pbnRlcjsgdG9wOicgKyBwb3MueSArICdweDsgbGVmdDonICtcbiAgICAgIHBvcy54ICsgJ3B4OyBjb2xvcjonICsgdHh0Q29sb3IgKyAnOyBwb3NpdGlvbjphYnNvbHV0ZTsgZm9udC1zaXplOicgK1xuICAgICAgdHh0U2l6ZSArICdweDsgZm9udC1mYW1pbHk6JyArIGZvbnRGYW1pbHkgKyAnOyBmb250LXdlaWdodDonICsgZm9udFdlaWdodCArICc7Jyk7XG4gIHJldHVybiBzdHlsZS5qb2luKCcnKTtcbn07XG5cblxuLy8gRXhwb3J0IFN5bWJvbHMgZm9yIENsb3N1cmVcbi8vIElmIHlvdSBhcmUgbm90IGdvaW5nIHRvIGNvbXBpbGUgd2l0aCBjbG9zdXJlIHRoZW4geW91IGNhbiByZW1vdmUgdGhlXG4vLyBjb2RlIGJlbG93LlxuZ2xvYmFsWydNYXJrZXJDbHVzdGVyZXInXSA9IE1hcmtlckNsdXN0ZXJlcjtcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ2FkZE1hcmtlciddID0gTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5hZGRNYXJrZXI7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydhZGRNYXJrZXJzJ10gPSBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmFkZE1hcmtlcnM7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydjbGVhck1hcmtlcnMnXSA9XG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5jbGVhck1hcmtlcnM7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydmaXRNYXBUb01hcmtlcnMnXSA9XG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5maXRNYXBUb01hcmtlcnM7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydnZXRDYWxjdWxhdG9yJ10gPVxuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0Q2FsY3VsYXRvcjtcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ2dldEdyaWRTaXplJ10gPVxuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0R3JpZFNpemU7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydnZXRFeHRlbmRlZEJvdW5kcyddID1cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldEV4dGVuZGVkQm91bmRzO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnZ2V0TWFwJ10gPSBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldE1hcDtcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ2dldE1hcmtlcnMnXSA9IE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0TWFya2Vycztcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ2dldE1heFpvb20nXSA9IE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0TWF4Wm9vbTtcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ2dldFN0eWxlcyddID0gTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRTdHlsZXM7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydnZXRUb3RhbENsdXN0ZXJzJ10gPVxuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0VG90YWxDbHVzdGVycztcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ2dldFRvdGFsTWFya2VycyddID1cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldFRvdGFsTWFya2Vycztcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ3JlZHJhdyddID0gTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5yZWRyYXc7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydyZW1vdmVNYXJrZXInXSA9XG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5yZW1vdmVNYXJrZXI7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydyZW1vdmVNYXJrZXJzJ10gPVxuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUucmVtb3ZlTWFya2Vycztcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ3Jlc2V0Vmlld3BvcnQnXSA9XG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5yZXNldFZpZXdwb3J0O1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsncmVwYWludCddID1cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnJlcGFpbnQ7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydzZXRDYWxjdWxhdG9yJ10gPVxuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuc2V0Q2FsY3VsYXRvcjtcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ3NldEdyaWRTaXplJ10gPVxuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuc2V0R3JpZFNpemU7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydzZXRNYXhab29tJ10gPVxuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuc2V0TWF4Wm9vbTtcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ29uQWRkJ10gPSBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLm9uQWRkO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnZHJhdyddID0gTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5kcmF3O1xuXG5DbHVzdGVyLnByb3RvdHlwZVsnZ2V0Q2VudGVyJ10gPSBDbHVzdGVyLnByb3RvdHlwZS5nZXRDZW50ZXI7XG5DbHVzdGVyLnByb3RvdHlwZVsnZ2V0U2l6ZSddID0gQ2x1c3Rlci5wcm90b3R5cGUuZ2V0U2l6ZTtcbkNsdXN0ZXIucHJvdG90eXBlWydnZXRNYXJrZXJzJ10gPSBDbHVzdGVyLnByb3RvdHlwZS5nZXRNYXJrZXJzO1xuXG5DbHVzdGVySWNvbi5wcm90b3R5cGVbJ29uQWRkJ10gPSBDbHVzdGVySWNvbi5wcm90b3R5cGUub25BZGQ7XG5DbHVzdGVySWNvbi5wcm90b3R5cGVbJ2RyYXcnXSA9IENsdXN0ZXJJY29uLnByb3RvdHlwZS5kcmF3O1xuQ2x1c3Rlckljb24ucHJvdG90eXBlWydvblJlbW92ZSddID0gQ2x1c3Rlckljb24ucHJvdG90eXBlLm9uUmVtb3ZlO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gTWFya2VyQ2x1c3RlcmVyO1xuIiwiLyoqXG4gKiBqUXVlcnkgQmFyIFJhdGluZyBQbHVnaW4gdjEuMi4yXG4gKlxuICogaHR0cDovL2dpdGh1Yi5jb20vYW50ZW5uYWlvL2pxdWVyeS1iYXItcmF0aW5nXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDEyLTIwMTYgS2F6aWsgUGlldHJ1c3pld3NraVxuICpcbiAqIFRoaXMgcGx1Z2luIGlzIGF2YWlsYWJsZSB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG4gKiBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICovXG4oZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIC8vIEFNRFxuICAgICAgICBkZWZpbmUoWydqcXVlcnknXSwgZmFjdG9yeSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgICAgICAvLyBOb2RlL0NvbW1vbkpTXG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKCdqcXVlcnknKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gYnJvd3NlciBnbG9iYWxzXG4gICAgICAgIGZhY3RvcnkoalF1ZXJ5KTtcbiAgICB9XG59KGZ1bmN0aW9uICgkKSB7XG5cbiAgICB2YXIgQmFyUmF0aW5nID0gKGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIGZ1bmN0aW9uIEJhclJhdGluZygpIHtcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICAgICAgLy8gd3JhcCBlbGVtZW50IGluIGEgd3JhcHBlciBkaXZcbiAgICAgICAgICAgIHZhciB3cmFwRWxlbWVudCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBjbGFzc2VzID0gWydici13cmFwcGVyJ107XG5cbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5vcHRpb25zLnRoZW1lICE9PSAnJykge1xuICAgICAgICAgICAgICAgICAgICBjbGFzc2VzLnB1c2goJ2JyLXRoZW1lLScgKyBzZWxmLm9wdGlvbnMudGhlbWUpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0ud3JhcCgkKCc8ZGl2IC8+Jywge1xuICAgICAgICAgICAgICAgICAgICAnY2xhc3MnOiBjbGFzc2VzLmpvaW4oJyAnKVxuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIHVud3JhcCBlbGVtZW50XG4gICAgICAgICAgICB2YXIgdW53cmFwRWxlbWVudCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0udW53cmFwKCk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBmaW5kIG9wdGlvbiBieSB2YWx1ZVxuICAgICAgICAgICAgdmFyIGZpbmRPcHRpb24gPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICgkLmlzTnVtZXJpYyh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBNYXRoLmZsb29yKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gJCgnb3B0aW9uW3ZhbHVlPVwiJyArIHZhbHVlICArICdcIl0nLCBzZWxmLiRlbGVtKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIGdldCBpbml0aWFsIG9wdGlvblxuICAgICAgICAgICAgdmFyIGdldEluaXRpYWxPcHRpb24gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgaW5pdGlhbFJhdGluZyA9IHNlbGYub3B0aW9ucy5pbml0aWFsUmF0aW5nO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFpbml0aWFsUmF0aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAkKCdvcHRpb246c2VsZWN0ZWQnLCBzZWxmLiRlbGVtKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZmluZE9wdGlvbihpbml0aWFsUmF0aW5nKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIGdldCBlbXB0eSBvcHRpb25cbiAgICAgICAgICAgIHZhciBnZXRFbXB0eU9wdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciAkZW1wdHlPcHQgPSBzZWxmLiRlbGVtLmZpbmQoJ29wdGlvblt2YWx1ZT1cIicgKyBzZWxmLm9wdGlvbnMuZW1wdHlWYWx1ZSArICdcIl0nKTtcblxuICAgICAgICAgICAgICAgIGlmICghJGVtcHR5T3B0Lmxlbmd0aCAmJiBzZWxmLm9wdGlvbnMuYWxsb3dFbXB0eSkge1xuICAgICAgICAgICAgICAgICAgICAkZW1wdHlPcHQgPSAkKCc8b3B0aW9uIC8+JywgeyAndmFsdWUnOiBzZWxmLm9wdGlvbnMuZW1wdHlWYWx1ZSB9KTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJGVtcHR5T3B0LnByZXBlbmRUbyhzZWxmLiRlbGVtKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gJGVtcHR5T3B0O1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gZ2V0IGRhdGFcbiAgICAgICAgICAgIHZhciBnZXREYXRhID0gZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSBzZWxmLiRlbGVtLmRhdGEoJ2JhcnJhdGluZycpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBrZXkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhW2tleV07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBzZXQgZGF0YVxuICAgICAgICAgICAgdmFyIHNldERhdGEgPSBmdW5jdGlvbihrZXksIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi4kZWxlbS5kYXRhKCdiYXJyYXRpbmcnLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi4kZWxlbS5kYXRhKCdiYXJyYXRpbmcnKVtrZXldID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gc2F2ZSBkYXRhIG9uIGVsZW1lbnRcbiAgICAgICAgICAgIHZhciBzYXZlRGF0YU9uRWxlbWVudCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciAkb3B0ID0gZ2V0SW5pdGlhbE9wdGlvbigpO1xuICAgICAgICAgICAgICAgIHZhciAkZW1wdHlPcHQgPSBnZXRFbXB0eU9wdGlvbigpO1xuXG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gJG9wdC52YWwoKTtcbiAgICAgICAgICAgICAgICB2YXIgdGV4dCA9ICRvcHQuZGF0YSgnaHRtbCcpID8gJG9wdC5kYXRhKCdodG1sJykgOiAkb3B0LnRleHQoKTtcblxuICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBhbGxvd0VtcHR5IG9wdGlvbiBpcyBub3Qgc2V0IGxldCdzIGNoZWNrIGlmIGVtcHR5IG9wdGlvbiBleGlzdHMgaW4gdGhlIHNlbGVjdCBmaWVsZFxuICAgICAgICAgICAgICAgIHZhciBhbGxvd0VtcHR5ID0gKHNlbGYub3B0aW9ucy5hbGxvd0VtcHR5ICE9PSBudWxsKSA/XG4gICAgICAgICAgICAgICAgICAgIHNlbGYub3B0aW9ucy5hbGxvd0VtcHR5IDpcbiAgICAgICAgICAgICAgICAgICAgISEkZW1wdHlPcHQubGVuZ3RoO1xuXG4gICAgICAgICAgICAgICAgdmFyIGVtcHR5VmFsdWUgPSAoJGVtcHR5T3B0Lmxlbmd0aCkgPyAkZW1wdHlPcHQudmFsKCkgOiBudWxsO1xuICAgICAgICAgICAgICAgIHZhciBlbXB0eVRleHQgPSAoJGVtcHR5T3B0Lmxlbmd0aCkgPyAkZW1wdHlPcHQudGV4dCgpIDogbnVsbDtcblxuICAgICAgICAgICAgICAgIHNldERhdGEobnVsbCwge1xuICAgICAgICAgICAgICAgICAgICB1c2VyT3B0aW9uczogc2VsZi5vcHRpb25zLFxuXG4gICAgICAgICAgICAgICAgICAgIC8vIGluaXRpYWwgcmF0aW5nIGJhc2VkIG9uIHRoZSBPUFRJT04gdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgcmF0aW5nVmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgICAgICAgICByYXRpbmdUZXh0OiB0ZXh0LFxuXG4gICAgICAgICAgICAgICAgICAgIC8vIHJhdGluZyB3aWxsIGJlIHJlc3RvcmVkIGJ5IGNhbGxpbmcgY2xlYXIgbWV0aG9kXG4gICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsUmF0aW5nVmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbFJhdGluZ1RleHQ6IHRleHQsXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gYWxsb3cgZW1wdHkgcmF0aW5ncz9cbiAgICAgICAgICAgICAgICAgICAgYWxsb3dFbXB0eTogYWxsb3dFbXB0eSxcblxuICAgICAgICAgICAgICAgICAgICAvLyByYXRpbmcgdmFsdWUgYW5kIHRleHQgb2YgdGhlIGVtcHR5IE9QVElPTlxuICAgICAgICAgICAgICAgICAgICBlbXB0eVJhdGluZ1ZhbHVlOiBlbXB0eVZhbHVlLFxuICAgICAgICAgICAgICAgICAgICBlbXB0eVJhdGluZ1RleHQ6IGVtcHR5VGV4dCxcblxuICAgICAgICAgICAgICAgICAgICAvLyByZWFkLW9ubHkgc3RhdGVcbiAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6IHNlbGYub3B0aW9ucy5yZWFkb25seSxcblxuICAgICAgICAgICAgICAgICAgICAvLyBkaWQgdGhlIHVzZXIgYWxyZWFkeSBzZWxlY3QgYSByYXRpbmc/XG4gICAgICAgICAgICAgICAgICAgIHJhdGluZ01hZGU6IGZhbHNlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyByZW1vdmUgZGF0YSBvbiBlbGVtZW50XG4gICAgICAgICAgICB2YXIgcmVtb3ZlRGF0YU9uRWxlbWVudCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0ucmVtb3ZlRGF0YSgnYmFycmF0aW5nJyk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyByZXR1cm4gY3VycmVudCByYXRpbmcgdGV4dFxuICAgICAgICAgICAgdmFyIHJhdGluZ1RleHQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2V0RGF0YSgncmF0aW5nVGV4dCcpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gcmV0dXJuIGN1cnJlbnQgcmF0aW5nIHZhbHVlXG4gICAgICAgICAgICB2YXIgcmF0aW5nVmFsdWUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2V0RGF0YSgncmF0aW5nVmFsdWUnKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIGJ1aWxkIHdpZGdldCBhbmQgcmV0dXJuIGpRdWVyeSBlbGVtZW50XG4gICAgICAgICAgICB2YXIgYnVpbGRXaWRnZXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgJHcgPSAkKCc8ZGl2IC8+JywgeyAnY2xhc3MnOiAnYnItd2lkZ2V0JyB9KTtcblxuICAgICAgICAgICAgICAgIC8vIGNyZWF0ZSBBIGVsZW1lbnRzIHRoYXQgd2lsbCByZXBsYWNlIE9QVElPTnNcbiAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLmZpbmQoJ29wdGlvbicpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB2YWwsIHRleHQsIGh0bWwsICRhO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhbCA9ICQodGhpcykudmFsKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gY3JlYXRlIHJhdGluZ3MgLSBidXQgb25seSBpZiB2YWwgaXMgbm90IGRlZmluZWQgYXMgZW1wdHlcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbCAhPT0gZ2V0RGF0YSgnZW1wdHlSYXRpbmdWYWx1ZScpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0ID0gJCh0aGlzKS50ZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBodG1sID0gJCh0aGlzKS5kYXRhKCdodG1sJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaHRtbCkgeyB0ZXh0ID0gaHRtbDsgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAkYSA9ICQoJzxhIC8+Jywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdocmVmJzogJyMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdkYXRhLXJhdGluZy12YWx1ZSc6IHZhbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZGF0YS1yYXRpbmctdGV4dCc6IHRleHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2h0bWwnOiAoc2VsZi5vcHRpb25zLnNob3dWYWx1ZXMpID8gdGV4dCA6ICcnXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgJHcuYXBwZW5kKCRhKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAvLyBhcHBlbmQgLmJyLWN1cnJlbnQtcmF0aW5nIGRpdiB0byB0aGUgd2lkZ2V0XG4gICAgICAgICAgICAgICAgaWYgKHNlbGYub3B0aW9ucy5zaG93U2VsZWN0ZWRSYXRpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgJHcuYXBwZW5kKCQoJzxkaXYgLz4nLCB7ICd0ZXh0JzogJycsICdjbGFzcyc6ICdici1jdXJyZW50LXJhdGluZycgfSkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGFkZGl0aW9uYWwgY2xhc3NlcyBmb3IgdGhlIHdpZGdldFxuICAgICAgICAgICAgICAgIGlmIChzZWxmLm9wdGlvbnMucmV2ZXJzZSkge1xuICAgICAgICAgICAgICAgICAgICAkdy5hZGRDbGFzcygnYnItcmV2ZXJzZScpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChzZWxmLm9wdGlvbnMucmVhZG9ubHkpIHtcbiAgICAgICAgICAgICAgICAgICAgJHcuYWRkQ2xhc3MoJ2JyLXJlYWRvbmx5Jyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuICR3O1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gcmV0dXJuIGEgalF1ZXJ5IGZ1bmN0aW9uIG5hbWUgZGVwZW5kaW5nIG9uIHRoZSAncmV2ZXJzZScgc2V0dGluZ1xuICAgICAgICAgICAgdmFyIG5leHRBbGxvclByZXZpb3VzQWxsID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaWYgKGdldERhdGEoJ3VzZXJPcHRpb25zJykucmV2ZXJzZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ25leHRBbGwnO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAncHJldkFsbCc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gc2V0IHRoZSB2YWx1ZSBvZiB0aGUgc2VsZWN0IGZpZWxkXG4gICAgICAgICAgICB2YXIgc2V0U2VsZWN0RmllbGRWYWx1ZSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgLy8gY2hhbmdlIHNlbGVjdGVkIG9wdGlvblxuICAgICAgICAgICAgICAgIGZpbmRPcHRpb24odmFsdWUpLnByb3AoJ3NlbGVjdGVkJywgdHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLmNoYW5nZSgpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gcmVzZXQgc2VsZWN0IGZpZWxkXG4gICAgICAgICAgICB2YXIgcmVzZXRTZWxlY3RGaWVsZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICQoJ29wdGlvbicsIHNlbGYuJGVsZW0pLnByb3AoJ3NlbGVjdGVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRlZmF1bHRTZWxlY3RlZDtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0uY2hhbmdlKCk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBkaXNwbGF5IHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgcmF0aW5nXG4gICAgICAgICAgICB2YXIgc2hvd1NlbGVjdGVkUmF0aW5nID0gZnVuY3Rpb24odGV4dCkge1xuICAgICAgICAgICAgICAgIC8vIHRleHQgdW5kZWZpbmVkP1xuICAgICAgICAgICAgICAgIHRleHQgPSB0ZXh0ID8gdGV4dCA6IHJhdGluZ1RleHQoKTtcblxuICAgICAgICAgICAgICAgIC8vIHNwZWNpYWwgY2FzZSB3aGVuIHRoZSBzZWxlY3RlZCByYXRpbmcgaXMgZGVmaW5lZCBhcyBlbXB0eVxuICAgICAgICAgICAgICAgIGlmICh0ZXh0ID09IGdldERhdGEoJ2VtcHR5UmF0aW5nVGV4dCcpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQgPSAnJztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyB1cGRhdGUgLmJyLWN1cnJlbnQtcmF0aW5nIGRpdlxuICAgICAgICAgICAgICAgIGlmIChzZWxmLm9wdGlvbnMuc2hvd1NlbGVjdGVkUmF0aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0ucGFyZW50KCkuZmluZCgnLmJyLWN1cnJlbnQtcmF0aW5nJykudGV4dCh0ZXh0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyByZXR1cm4gcm91bmRlZCBmcmFjdGlvbiBvZiBhIHZhbHVlICgxNC40IC0+IDQwLCAwLjk5IC0+IDkwKVxuICAgICAgICAgICAgdmFyIGZyYWN0aW9uID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gTWF0aC5yb3VuZCgoKE1hdGguZmxvb3IodmFsdWUgKiAxMCkgLyAxMCkgJSAxKSAqIDEwMCk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyByZW1vdmUgYWxsIGNsYXNzZXMgZnJvbSBlbGVtZW50c1xuICAgICAgICAgICAgdmFyIHJlc2V0U3R5bGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgYWxsIGNsYXNzZXMgc3RhcnRpbmcgd2l0aCBici0qXG4gICAgICAgICAgICAgICAgc2VsZi4kd2lkZ2V0LmZpbmQoJ2EnKS5yZW1vdmVDbGFzcyhmdW5jdGlvbihpbmRleCwgY2xhc3Nlcykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKGNsYXNzZXMubWF0Y2goLyhefFxccylici1cXFMrL2cpIHx8IFtdKS5qb2luKCcgJyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBhcHBseSBzdHlsZSBieSBzZXR0aW5nIGNsYXNzZXMgb24gZWxlbWVudHNcbiAgICAgICAgICAgIHZhciBhcHBseVN0eWxlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyICRhID0gc2VsZi4kd2lkZ2V0LmZpbmQoJ2FbZGF0YS1yYXRpbmctdmFsdWU9XCInICsgcmF0aW5nVmFsdWUoKSArICdcIl0nKTtcbiAgICAgICAgICAgICAgICB2YXIgaW5pdGlhbFJhdGluZyA9IGdldERhdGEoJ3VzZXJPcHRpb25zJykuaW5pdGlhbFJhdGluZztcbiAgICAgICAgICAgICAgICB2YXIgYmFzZVZhbHVlID0gJC5pc051bWVyaWMocmF0aW5nVmFsdWUoKSkgPyByYXRpbmdWYWx1ZSgpIDogMDtcbiAgICAgICAgICAgICAgICB2YXIgZiA9IGZyYWN0aW9uKGluaXRpYWxSYXRpbmcpO1xuICAgICAgICAgICAgICAgIHZhciAkYWxsLCAkZnJhY3Rpb25hbDtcblxuICAgICAgICAgICAgICAgIHJlc2V0U3R5bGUoKTtcblxuICAgICAgICAgICAgICAgIC8vIGFkZCBjbGFzc2VzXG4gICAgICAgICAgICAgICAgJGEuYWRkQ2xhc3MoJ2JyLXNlbGVjdGVkIGJyLWN1cnJlbnQnKVtuZXh0QWxsb3JQcmV2aW91c0FsbCgpXSgpXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnYnItc2VsZWN0ZWQnKTtcblxuICAgICAgICAgICAgICAgIGlmICghZ2V0RGF0YSgncmF0aW5nTWFkZScpICYmICQuaXNOdW1lcmljKGluaXRpYWxSYXRpbmcpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgoaW5pdGlhbFJhdGluZyA8PSBiYXNlVmFsdWUpIHx8ICFmKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAkYWxsID0gc2VsZi4kd2lkZ2V0LmZpbmQoJ2EnKTtcblxuICAgICAgICAgICAgICAgICAgICAkZnJhY3Rpb25hbCA9ICgkYS5sZW5ndGgpID9cbiAgICAgICAgICAgICAgICAgICAgICAgICRhWyhnZXREYXRhKCd1c2VyT3B0aW9ucycpLnJldmVyc2UpID8gJ3ByZXYnIDogJ25leHQnXSgpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICRhbGxbKGdldERhdGEoJ3VzZXJPcHRpb25zJykucmV2ZXJzZSkgPyAnbGFzdCcgOiAnZmlyc3QnXSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICRmcmFjdGlvbmFsLmFkZENsYXNzKCdici1mcmFjdGlvbmFsJyk7XG4gICAgICAgICAgICAgICAgICAgICRmcmFjdGlvbmFsLmFkZENsYXNzKCdici1mcmFjdGlvbmFsLScgKyBmKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBjaGVjayBpZiB0aGUgZWxlbWVudCBpcyBkZXNlbGVjdGFibGU/XG4gICAgICAgICAgICB2YXIgaXNEZXNlbGVjdGFibGUgPSBmdW5jdGlvbigkZWxlbWVudCkge1xuICAgICAgICAgICAgICAgIGlmICghZ2V0RGF0YSgnYWxsb3dFbXB0eScpIHx8ICFnZXREYXRhKCd1c2VyT3B0aW9ucycpLmRlc2VsZWN0YWJsZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIChyYXRpbmdWYWx1ZSgpID09ICRlbGVtZW50LmF0dHIoJ2RhdGEtcmF0aW5nLXZhbHVlJykpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gaGFuZGxlIGNsaWNrIGV2ZW50c1xuICAgICAgICAgICAgdmFyIGF0dGFjaENsaWNrSGFuZGxlciA9IGZ1bmN0aW9uKCRlbGVtZW50cykge1xuICAgICAgICAgICAgICAgICRlbGVtZW50cy5vbignY2xpY2suYmFycmF0aW5nJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyICRhID0gJCh0aGlzKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMgPSBnZXREYXRhKCd1c2VyT3B0aW9ucycpLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0O1xuXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSAkYS5hdHRyKCdkYXRhLXJhdGluZy12YWx1ZScpO1xuICAgICAgICAgICAgICAgICAgICB0ZXh0ID0gJGEuYXR0cignZGF0YS1yYXRpbmctdGV4dCcpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGlzIGN1cnJlbnQgYW5kIGRlc2VsZWN0YWJsZT9cbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzRGVzZWxlY3RhYmxlKCRhKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBnZXREYXRhKCdlbXB0eVJhdGluZ1ZhbHVlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0ID0gZ2V0RGF0YSgnZW1wdHlSYXRpbmdUZXh0Jyk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyByZW1lbWJlciBzZWxlY3RlZCByYXRpbmdcbiAgICAgICAgICAgICAgICAgICAgc2V0RGF0YSgncmF0aW5nVmFsdWUnLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHNldERhdGEoJ3JhdGluZ1RleHQnLCB0ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgc2V0RGF0YSgncmF0aW5nTWFkZScsIHRydWUpO1xuXG4gICAgICAgICAgICAgICAgICAgIHNldFNlbGVjdEZpZWxkVmFsdWUodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBzaG93U2VsZWN0ZWRSYXRpbmcodGV4dCk7XG5cbiAgICAgICAgICAgICAgICAgICAgYXBwbHlTdHlsZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIG9uU2VsZWN0IGNhbGxiYWNrXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMub25TZWxlY3QuY2FsbChcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYsXG4gICAgICAgICAgICAgICAgICAgICAgICByYXRpbmdWYWx1ZSgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmF0aW5nVGV4dCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRcbiAgICAgICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBoYW5kbGUgbW91c2VlbnRlciBldmVudHNcbiAgICAgICAgICAgIHZhciBhdHRhY2hNb3VzZUVudGVySGFuZGxlciA9IGZ1bmN0aW9uKCRlbGVtZW50cykge1xuICAgICAgICAgICAgICAgICRlbGVtZW50cy5vbignbW91c2VlbnRlci5iYXJyYXRpbmcnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyICRhID0gJCh0aGlzKTtcblxuICAgICAgICAgICAgICAgICAgICByZXNldFN0eWxlKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgJGEuYWRkQ2xhc3MoJ2JyLWFjdGl2ZScpW25leHRBbGxvclByZXZpb3VzQWxsKCldKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnYnItYWN0aXZlJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgc2hvd1NlbGVjdGVkUmF0aW5nKCRhLmF0dHIoJ2RhdGEtcmF0aW5nLXRleHQnKSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBoYW5kbGUgbW91c2VsZWF2ZSBldmVudHNcbiAgICAgICAgICAgIHZhciBhdHRhY2hNb3VzZUxlYXZlSGFuZGxlciA9IGZ1bmN0aW9uKCRlbGVtZW50cykge1xuICAgICAgICAgICAgICAgIHNlbGYuJHdpZGdldC5vbignbW91c2VsZWF2ZS5iYXJyYXRpbmcgYmx1ci5iYXJyYXRpbmcnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgc2hvd1NlbGVjdGVkUmF0aW5nKCk7XG4gICAgICAgICAgICAgICAgICAgIGFwcGx5U3R5bGUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIHNvbWV3aGF0IHByaW1pdGl2ZSB3YXkgdG8gcmVtb3ZlIDMwMG1zIGNsaWNrIGRlbGF5IG9uIHRvdWNoIGRldmljZXNcbiAgICAgICAgICAgIC8vIGZvciBhIG1vcmUgYWR2YW5jZWQgc29sdXRpb24gY29uc2lkZXIgc2V0dGluZyBgZmFzdENsaWNrc2Agb3B0aW9uIHRvIGZhbHNlXG4gICAgICAgICAgICAvLyBhbmQgdXNpbmcgYSBsaWJyYXJ5IHN1Y2ggYXMgZmFzdGNsaWNrIChodHRwczovL2dpdGh1Yi5jb20vZnRsYWJzL2Zhc3RjbGljaylcbiAgICAgICAgICAgIHZhciBmYXN0Q2xpY2tzID0gZnVuY3Rpb24oJGVsZW1lbnRzKSB7XG4gICAgICAgICAgICAgICAgJGVsZW1lbnRzLm9uKCd0b3VjaHN0YXJ0LmJhcnJhdGluZycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuY2xpY2soKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIGRpc2FibGUgY2xpY2tzXG4gICAgICAgICAgICB2YXIgZGlzYWJsZUNsaWNrcyA9IGZ1bmN0aW9uKCRlbGVtZW50cykge1xuICAgICAgICAgICAgICAgICRlbGVtZW50cy5vbignY2xpY2suYmFycmF0aW5nJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHZhciBhdHRhY2hIYW5kbGVycyA9IGZ1bmN0aW9uKCRlbGVtZW50cykge1xuICAgICAgICAgICAgICAgIC8vIGF0dGFjaCBjbGljayBldmVudCBoYW5kbGVyXG4gICAgICAgICAgICAgICAgYXR0YWNoQ2xpY2tIYW5kbGVyKCRlbGVtZW50cyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5vcHRpb25zLmhvdmVyU3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gYXR0YWNoIG1vdXNlZW50ZXIgZXZlbnQgaGFuZGxlclxuICAgICAgICAgICAgICAgICAgICBhdHRhY2hNb3VzZUVudGVySGFuZGxlcigkZWxlbWVudHMpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGF0dGFjaCBtb3VzZWxlYXZlIGV2ZW50IGhhbmRsZXJcbiAgICAgICAgICAgICAgICAgICAgYXR0YWNoTW91c2VMZWF2ZUhhbmRsZXIoJGVsZW1lbnRzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB2YXIgZGV0YWNoSGFuZGxlcnMgPSBmdW5jdGlvbigkZWxlbWVudHMpIHtcbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgZXZlbnQgaGFuZGxlcnMgaW4gdGhlIFwiLmJhcnJhdGluZ1wiIG5hbWVzcGFjZVxuICAgICAgICAgICAgICAgICRlbGVtZW50cy5vZmYoJy5iYXJyYXRpbmcnKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHZhciBzZXR1cEhhbmRsZXJzID0gZnVuY3Rpb24ocmVhZG9ubHkpIHtcbiAgICAgICAgICAgICAgICB2YXIgJGVsZW1lbnRzID0gc2VsZi4kd2lkZ2V0LmZpbmQoJ2EnKTtcblxuICAgICAgICAgICAgICAgIGlmIChmYXN0Q2xpY2tzKSB7XG4gICAgICAgICAgICAgICAgICAgIGZhc3RDbGlja3MoJGVsZW1lbnRzKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAocmVhZG9ubHkpIHtcbiAgICAgICAgICAgICAgICAgICAgZGV0YWNoSGFuZGxlcnMoJGVsZW1lbnRzKTtcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZUNsaWNrcygkZWxlbWVudHMpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGF0dGFjaEhhbmRsZXJzKCRlbGVtZW50cyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy5zaG93ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgLy8gcnVuIG9ubHkgb25jZVxuICAgICAgICAgICAgICAgIGlmIChnZXREYXRhKCkpIHJldHVybjtcblxuICAgICAgICAgICAgICAgIC8vIHdyYXAgZWxlbWVudFxuICAgICAgICAgICAgICAgIHdyYXBFbGVtZW50KCk7XG5cbiAgICAgICAgICAgICAgICAvLyBzYXZlIGRhdGFcbiAgICAgICAgICAgICAgICBzYXZlRGF0YU9uRWxlbWVudCgpO1xuXG4gICAgICAgICAgICAgICAgLy8gYnVpbGQgJiBhcHBlbmQgd2lkZ2V0IHRvIHRoZSBET01cbiAgICAgICAgICAgICAgICBzZWxmLiR3aWRnZXQgPSBidWlsZFdpZGdldCgpO1xuICAgICAgICAgICAgICAgIHNlbGYuJHdpZGdldC5pbnNlcnRBZnRlcihzZWxmLiRlbGVtKTtcblxuICAgICAgICAgICAgICAgIGFwcGx5U3R5bGUoKTtcblxuICAgICAgICAgICAgICAgIHNob3dTZWxlY3RlZFJhdGluZygpO1xuXG4gICAgICAgICAgICAgICAgc2V0dXBIYW5kbGVycyhzZWxmLm9wdGlvbnMucmVhZG9ubHkpO1xuXG4gICAgICAgICAgICAgICAgLy8gaGlkZSB0aGUgc2VsZWN0IGZpZWxkXG4gICAgICAgICAgICAgICAgc2VsZi4kZWxlbS5oaWRlKCk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLnJlYWRvbmx5ID0gZnVuY3Rpb24oc3RhdGUpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHN0YXRlICE9PSAnYm9vbGVhbicgfHwgZ2V0RGF0YSgncmVhZE9ubHknKSA9PSBzdGF0ZSkgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgc2V0dXBIYW5kbGVycyhzdGF0ZSk7XG4gICAgICAgICAgICAgICAgc2V0RGF0YSgncmVhZE9ubHknLCBzdGF0ZSk7XG4gICAgICAgICAgICAgICAgc2VsZi4kd2lkZ2V0LnRvZ2dsZUNsYXNzKCdici1yZWFkb25seScpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy5zZXQgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHZhciBvcHRpb25zID0gZ2V0RGF0YSgndXNlck9wdGlvbnMnKTtcblxuICAgICAgICAgICAgICAgIGlmIChzZWxmLiRlbGVtLmZpbmQoJ29wdGlvblt2YWx1ZT1cIicgKyB2YWx1ZSArICdcIl0nKS5sZW5ndGggPT09IDApIHJldHVybjtcblxuICAgICAgICAgICAgICAgIC8vIHNldCBkYXRhXG4gICAgICAgICAgICAgICAgc2V0RGF0YSgncmF0aW5nVmFsdWUnLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgc2V0RGF0YSgncmF0aW5nVGV4dCcsIHNlbGYuJGVsZW0uZmluZCgnb3B0aW9uW3ZhbHVlPVwiJyArIHZhbHVlICsgJ1wiXScpLnRleHQoKSk7XG4gICAgICAgICAgICAgICAgc2V0RGF0YSgncmF0aW5nTWFkZScsIHRydWUpO1xuXG4gICAgICAgICAgICAgICAgc2V0U2VsZWN0RmllbGRWYWx1ZShyYXRpbmdWYWx1ZSgpKTtcbiAgICAgICAgICAgICAgICBzaG93U2VsZWN0ZWRSYXRpbmcocmF0aW5nVGV4dCgpKTtcblxuICAgICAgICAgICAgICAgIGFwcGx5U3R5bGUoKTtcblxuICAgICAgICAgICAgICAgIC8vIG9uU2VsZWN0IGNhbGxiYWNrXG4gICAgICAgICAgICAgICAgaWYgKCFvcHRpb25zLnNpbGVudCkge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLm9uU2VsZWN0LmNhbGwoXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmF0aW5nVmFsdWUoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhdGluZ1RleHQoKVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMuY2xlYXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgb3B0aW9ucyA9IGdldERhdGEoJ3VzZXJPcHRpb25zJyk7XG5cbiAgICAgICAgICAgICAgICAvLyByZXN0b3JlIG9yaWdpbmFsIGRhdGFcbiAgICAgICAgICAgICAgICBzZXREYXRhKCdyYXRpbmdWYWx1ZScsIGdldERhdGEoJ29yaWdpbmFsUmF0aW5nVmFsdWUnKSk7XG4gICAgICAgICAgICAgICAgc2V0RGF0YSgncmF0aW5nVGV4dCcsIGdldERhdGEoJ29yaWdpbmFsUmF0aW5nVGV4dCcpKTtcbiAgICAgICAgICAgICAgICBzZXREYXRhKCdyYXRpbmdNYWRlJywgZmFsc2UpO1xuXG4gICAgICAgICAgICAgICAgcmVzZXRTZWxlY3RGaWVsZCgpO1xuICAgICAgICAgICAgICAgIHNob3dTZWxlY3RlZFJhdGluZyhyYXRpbmdUZXh0KCkpO1xuXG4gICAgICAgICAgICAgICAgYXBwbHlTdHlsZSgpO1xuXG4gICAgICAgICAgICAgICAgLy8gb25DbGVhciBjYWxsYmFja1xuICAgICAgICAgICAgICAgIG9wdGlvbnMub25DbGVhci5jYWxsKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLFxuICAgICAgICAgICAgICAgICAgICByYXRpbmdWYWx1ZSgpLFxuICAgICAgICAgICAgICAgICAgICByYXRpbmdUZXh0KClcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy5kZXN0cm95ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gcmF0aW5nVmFsdWUoKTtcbiAgICAgICAgICAgICAgICB2YXIgdGV4dCA9IHJhdGluZ1RleHQoKTtcbiAgICAgICAgICAgICAgICB2YXIgb3B0aW9ucyA9IGdldERhdGEoJ3VzZXJPcHRpb25zJyk7XG5cbiAgICAgICAgICAgICAgICAvLyBkZXRhY2ggaGFuZGxlcnNcbiAgICAgICAgICAgICAgICBkZXRhY2hIYW5kbGVycyhzZWxmLiR3aWRnZXQuZmluZCgnYScpKTtcblxuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSB3aWRnZXRcbiAgICAgICAgICAgICAgICBzZWxmLiR3aWRnZXQucmVtb3ZlKCk7XG5cbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgZGF0YVxuICAgICAgICAgICAgICAgIHJlbW92ZURhdGFPbkVsZW1lbnQoKTtcblxuICAgICAgICAgICAgICAgIC8vIHVud3JhcCB0aGUgZWxlbWVudFxuICAgICAgICAgICAgICAgIHVud3JhcEVsZW1lbnQoKTtcblxuICAgICAgICAgICAgICAgIC8vIHNob3cgdGhlIGVsZW1lbnRcbiAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLnNob3coKTtcblxuICAgICAgICAgICAgICAgIC8vIG9uRGVzdHJveSBjYWxsYmFja1xuICAgICAgICAgICAgICAgIG9wdGlvbnMub25EZXN0cm95LmNhbGwoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgICAgICAgICAgICB0ZXh0XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBCYXJSYXRpbmcucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAob3B0aW9ucywgZWxlbSkge1xuICAgICAgICAgICAgdGhpcy4kZWxlbSA9ICQoZWxlbSk7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgJC5mbi5iYXJyYXRpbmcuZGVmYXVsdHMsIG9wdGlvbnMpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBCYXJSYXRpbmc7XG4gICAgfSkoKTtcblxuICAgICQuZm4uYmFycmF0aW5nID0gZnVuY3Rpb24gKG1ldGhvZCwgb3B0aW9ucykge1xuICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBwbHVnaW4gPSBuZXcgQmFyUmF0aW5nKCk7XG5cbiAgICAgICAgICAgIC8vIHBsdWdpbiB3b3JrcyB3aXRoIHNlbGVjdCBmaWVsZHNcbiAgICAgICAgICAgIGlmICghJCh0aGlzKS5pcygnc2VsZWN0JykpIHtcbiAgICAgICAgICAgICAgICAkLmVycm9yKCdTb3JyeSwgdGhpcyBwbHVnaW4gb25seSB3b3JrcyB3aXRoIHNlbGVjdCBmaWVsZHMuJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIG1ldGhvZCBzdXBwbGllZFxuICAgICAgICAgICAgaWYgKHBsdWdpbi5oYXNPd25Qcm9wZXJ0eShtZXRob2QpKSB7XG4gICAgICAgICAgICAgICAgcGx1Z2luLmluaXQob3B0aW9ucywgdGhpcyk7XG4gICAgICAgICAgICAgICAgaWYgKG1ldGhvZCA9PT0gJ3Nob3cnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwbHVnaW4uc2hvdyhvcHRpb25zKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBwbHVnaW4gZXhpc3RzP1xuICAgICAgICAgICAgICAgICAgICBpZiAocGx1Z2luLiRlbGVtLmRhdGEoJ2JhcnJhdGluZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwbHVnaW4uJHdpZGdldCA9ICQodGhpcykubmV4dCgnLmJyLXdpZGdldCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBsdWdpblttZXRob2RdKG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBubyBtZXRob2Qgc3VwcGxpZWQgb3Igb25seSBvcHRpb25zIHN1cHBsaWVkXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBtZXRob2QgPT09ICdvYmplY3QnIHx8ICFtZXRob2QpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zID0gbWV0aG9kO1xuICAgICAgICAgICAgICAgIHBsdWdpbi5pbml0KG9wdGlvbnMsIHRoaXMpO1xuICAgICAgICAgICAgICAgIHJldHVybiBwbHVnaW4uc2hvdygpO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQuZXJyb3IoJ01ldGhvZCAnICsgbWV0aG9kICsgJyBkb2VzIG5vdCBleGlzdCBvbiBqUXVlcnkuYmFycmF0aW5nJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICAkLmZuLmJhcnJhdGluZy5kZWZhdWx0cyA9IHtcbiAgICAgICAgdGhlbWU6JycsXG4gICAgICAgIGluaXRpYWxSYXRpbmc6bnVsbCwgLy8gaW5pdGlhbCByYXRpbmdcbiAgICAgICAgYWxsb3dFbXB0eTpudWxsLCAvLyBhbGxvdyBlbXB0eSByYXRpbmdzP1xuICAgICAgICBlbXB0eVZhbHVlOicnLCAvLyB0aGlzIGlzIHRoZSBleHBlY3RlZCB2YWx1ZSBvZiB0aGUgZW1wdHkgcmF0aW5nXG4gICAgICAgIHNob3dWYWx1ZXM6ZmFsc2UsIC8vIGRpc3BsYXkgcmF0aW5nIHZhbHVlcyBvbiB0aGUgYmFycz9cbiAgICAgICAgc2hvd1NlbGVjdGVkUmF0aW5nOnRydWUsIC8vIGFwcGVuZCBhIGRpdiB3aXRoIGEgcmF0aW5nIHRvIHRoZSB3aWRnZXQ/XG4gICAgICAgIGRlc2VsZWN0YWJsZTp0cnVlLCAvLyBhbGxvdyB0byBkZXNlbGVjdCByYXRpbmdzP1xuICAgICAgICByZXZlcnNlOmZhbHNlLCAvLyByZXZlcnNlIHRoZSByYXRpbmc/XG4gICAgICAgIHJlYWRvbmx5OmZhbHNlLCAvLyBtYWtlIHRoZSByYXRpbmcgcmVhZHktb25seT9cbiAgICAgICAgZmFzdENsaWNrczp0cnVlLCAvLyByZW1vdmUgMzAwbXMgY2xpY2sgZGVsYXkgb24gdG91Y2ggZGV2aWNlcz9cbiAgICAgICAgaG92ZXJTdGF0ZTp0cnVlLCAvLyBjaGFuZ2Ugc3RhdGUgb24gaG92ZXI/XG4gICAgICAgIHNpbGVudDpmYWxzZSwgLy8gc3VwcmVzcyBjYWxsYmFja3Mgd2hlbiBjb250cm9sbGluZyByYXRpbmdzIHByb2dyYW1hdGljYWxseVxuICAgICAgICBvblNlbGVjdDpmdW5jdGlvbiAodmFsdWUsIHRleHQsIGV2ZW50KSB7XG4gICAgICAgIH0sIC8vIGNhbGxiYWNrIGZpcmVkIHdoZW4gYSByYXRpbmcgaXMgc2VsZWN0ZWRcbiAgICAgICAgb25DbGVhcjpmdW5jdGlvbiAodmFsdWUsIHRleHQpIHtcbiAgICAgICAgfSwgLy8gY2FsbGJhY2sgZmlyZWQgd2hlbiBhIHJhdGluZyBpcyBjbGVhcmVkXG4gICAgICAgIG9uRGVzdHJveTpmdW5jdGlvbiAodmFsdWUsIHRleHQpIHtcbiAgICAgICAgfSAvLyBjYWxsYmFjayBmaXJlZCB3aGVuIGEgd2lkZ2V0IGlzIGRlc3Ryb3llZFxuICAgIH07XG5cbiAgICAkLmZuLmJhcnJhdGluZy5CYXJSYXRpbmcgPSBCYXJSYXRpbmc7XG5cbn0pKTsiLCIvKipcbiAqIEBwYWNrYWdlICAgIEtub3cgUmVzZXJ2YXRpb25zXG4gKiBAc3VicGFja2FnZSBTaXRlIEpTXG4gKiBAY29weXJpZ2h0ICAyMDIwIEhpZ2hsYW5kIFZpc2lvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIEBsaWNlbnNlICAgIFNlZSB0aGUgZmlsZSBcIkxJQ0VOU0UudHh0XCIgZm9yIHRoZSBmdWxsIGxpY2Vuc2UgZ292ZXJuaW5nIHRoaXMgY29kZS5cbiAqIEBhdXRob3IgICAgIEhhemVsIFdpbHNvbiA8aGF6ZWxAaGlnaGxhbmR2aXNpb24uY29tPlxuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG5sZXQgc2VhcmNoRGF0YSA9IFtdO1xubGV0IHNlYXJjaERvbmUgPSBmYWxzZTtcbmxldCBjYWxlbmRhckxvYWRlZCA9IGZhbHNlO1xubGV0IHNhdmVkd2lkdGggPSBmYWxzZTtcbmxldCBsYXJnZTtcbmxldCByZXNpemVkID0gZmFsc2U7XG5sZXQgc2Nsb2FkZWQgPSBmYWxzZTtcblxuKGZ1bmN0aW9uICgkKSB7XG4gICAgJChmdW5jdGlvbiAoKSB7XG4gICAgICAgIEZvdW5kYXRpb24uYWRkVG9KcXVlcnkoKTtcbiAgICAgICAgJChkb2N1bWVudCkuZm91bmRhdGlvbigpO1xuXG4gICAgICAgIGNoZWNrU2NyZWVuV2lkdGgoKTtcbiAgICAgICAgJCh3aW5kb3cpLm9uKFwicmVzaXplXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNoZWNrU2NyZWVuV2lkdGgoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgYmFycyA9ICQoJy5rci1yYXRpbmcnKTtcbiAgICAgICAgaWYgKGJhcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICBiYXJzLmJhcnJhdGluZygnc2hvdycsIHtcbiAgICAgICAgICAgICAgICBzaG93VmFsdWVzOiB0cnVlLFxuICAgICAgICAgICAgICAgIHNob3dTZWxlY3RlZFJhdGluZzogZmFsc2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgJGN0cmlnZ2VyID0gJCgnI2tyLXBhZ2UtZ2VyaWF0cmljLWNhbGVuZGFyLXRyaWdnZXInKTtcbiAgICAgICAgaWYgKCRjdHJpZ2dlci5sZW5ndGggJiYgIWNhbGVuZGFyTG9hZGVkKSB7XG4gICAgICAgICAgICBsb2FkQ2FsZW5kYXIoJGN0cmlnZ2VyLmRhdGEoJ3BpZCcpLCAkY3RyaWdnZXIuZGF0YSgndGFyZ2V0JykpO1xuICAgICAgICAgICAgY2FsZW5kYXJMb2FkZWQgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKCcuc3RpY2t5Jy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAkKCcuc3RpY2t5JykuZm91bmRhdGlvbignX2NhbGMnLCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdzdWJtaXQnLCAnLmFqYXhmb3JtJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGNvbnN0ICRmb3JtID0gJCh0aGlzKTtcbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICAgICAgICAgIHVybDogJGZvcm0uYXR0cignYWN0aW9uJyksXG4gICAgICAgICAgICAgICAgZGF0YTogJGZvcm0uc2VyaWFsaXplKCksXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5kYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybVJlc3BvbnNlKCRmb3JtLmF0dHIoJ2lkJyksIHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnLyc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcua3ItYWpheC1tb2RhbC1lcnJvci1tZXNzYWdlJykuaHRtbChyZXN1bHQubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCAkbW9kYWwgPSBuZXcgRm91bmRhdGlvbi5SZXZlYWwoJCgnI0tyQWpheE1vZGFsRXJyb3InKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkbW9kYWwub3BlbigpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAkKCcua3ItYWpheC1tb2RhbC1lcnJvci1tZXNzYWdlJykuaHRtbCgnU29ycnkgYW4gZXJyb3IgaGFzIG9jY3VycmVkLCBwbGVhc2UgdHJ5IGFnYWluJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0ICRtb2RhbCA9IG5ldyBGb3VuZGF0aW9uLlJldmVhbCgkKCcjS3JBamF4TW9kYWxFcnJvcicpKTtcbiAgICAgICAgICAgICAgICAgICAgJG1vZGFsLm9wZW4oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSkub24oJ3Nob3cuemYuZHJvcGRvd24nLCAnLm5vc2Nyb2xsJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJCgnYm9keScpLmFkZENsYXNzKFwic3RhdGljcGFuZVwiKTtcbiAgICAgICAgICAgICQodGhpcykuY3NzKCdvcGFjaXR5JywgJzEnKTtcbiAgICAgICAgfSkub24oJ2hpZGUuemYuZHJvcGRvd24nLCAnLm5vc2Nyb2xsJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKFwic3RhdGljcGFuZVwiKTtcbiAgICAgICAgICAgICQodGhpcykuY3NzKCdvcGFjaXR5JywgJzAnKTtcbiAgICAgICAgfSkub24oJ2hpZGUuemYuZHJvcGRvd24nLCAnI2tyLXF1b3RlLWZvcm0nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKCcjZ3Vlc3RzJykudHJpZ2dlcignY2hhbmdlJyk7XG4gICAgICAgIH0pLm9uKCdvcGVuLnpmLnJldmVhbCcsICcua3ItYWpheC1tb2RhbFtkYXRhLXJldmVhbF0nLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgY29uc3QgbW9kYWxpZCA9IFwiI1wiICsgJCh0aGlzKS5hdHRyKCdpZCcpO1xuICAgICAgICAgICAgaWYgKCEkLnRyaW0oJChtb2RhbGlkKS5odG1sKCkpLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGFqYXh1cmwgPSAkKHRoaXMpLmRhdGEoJ2FqYXh1cmwnKTtcbiAgICAgICAgICAgICAgICBpZiAoYWpheHVybCkge1xuICAgICAgICAgICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBhamF4dXJsLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGNvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKG1vZGFsaWQpLmh0bWwoY29udGVudCkudHJpZ2dlcigncmVzaXplbWUuemYucmV2ZWFsJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChtb2RhbGlkKS5mb3VuZGF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkub24oJ29wZW4uemYucmV2ZWFsJywgJyNrci1nYXRld2F5LW1vZGFsW2RhdGEtcmV2ZWFsXScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBpZiAoIXNjbG9hZGVkKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICQuZ2V0U2NyaXB0KCdtZWRpYS9jb21fa25vd3Jlcy9qcy9zdHJpcGVjaGVja291dC5taW4uanMnKTtcbiAgICAgICAgICAgICAgICBzY2xvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGluaXRpYWxpemVTdHJpcGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkub24oJ2NsaWNrJywgJy5mYXZzcGFuJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGNvbnN0IHBpZCA9ICQodGhpcykuZGF0YSgncHJvcGVydHknKTtcbiAgICAgICAgICAgIGNvbnN0IGJhciA9ICQoJy5rci1zZWFyY2hiYXIgYS5pcy1hY3RpdmUnKS5kYXRhKCdiYXInKTtcbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICAgICAgICAgIHVybDogJy9pbmRleC5waHA/b3B0aW9uPWNvbV9rbm93cmVzJnRhc2s9cHJvcGVydGllcy5mYXZvdXJpdGUnLFxuICAgICAgICAgICAgICAgIGRhdGE6IHsncHJvcGVydHlfaWQnOiBwaWR9LFxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldFByb3BlcnRpZXMoYmFyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5mYXZpY29uLXRvcCcpLmZvdW5kYXRpb24oJ2hpZGUnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KS5vbignY2xpY2snLCAnLmdldFJlc3BvbnNlU2VhcmNoJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmRhdGEoJ2FjdGlvbicpID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBnZXRQcm9wZXJ0aWVzKCQodGhpcykuZGF0YSgnYmFyJykpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBnZXRQcm9wZXJ0aWVzKCQodGhpcykuZGF0YSgnYmFyJyksICQodGhpcykuZGF0YSgnYWN0aW9uJyksICQodGhpcykuZGF0YSgnYWN0aW9uLXZhbHVlJykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KS5vbignY2xpY2snLCAnLmtyLWZpbHRlcnMtY2xvc2UnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgJCgnLmtyLWZpbHRlcnMudG9wJykuYWRkQ2xhc3MoJ2hpZGVtZScpO1xuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgIH0pLm9uKCdjbGljaycsICcua3ItZmlsdGVycyB1bC5maWx0ZXItc29ydC1saXN0IGxpLmhlYWQnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5jaGlsZHJlbignbGkuZmlsdGVyLWl0ZW0nKS50b2dnbGUoKTtcbiAgICAgICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICB9KS5vbignY2xpY2snLCAnI3Nob3dnYXRld2F5cycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAkKCcja3ItZ2F0ZXdheXMnKS50b2dnbGVDbGFzcygnaGlkZW1lJyk7XG4gICAgICAgIH0pLm9uKCdjbGljaycsICdhLmtyLXNlYXJjaGJhcicsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBzZXRBY3RpdmVNZW51KCQodGhpcykuZGF0YSgnYmFyJykpO1xuICAgICAgICB9KS5vbignY2xpY2snLCAnLnRvZ2dsZW90aGVyJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICQodGhpcykuZGF0YSgnb3RoZXInKS50b2dnbGUoKTtcbiAgICAgICAgfSkub24oJ2NsaWNrJywgJyNrci1wcm9wZXJ0eS10YWJzIGFbaHJlZj1cIiNjYWxlbmRhclwiXScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBpZiAoIWNhbGVuZGFyTG9hZGVkKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcGlkID0gJCh0aGlzKS5kYXRhKCdwaWQnKTtcbiAgICAgICAgICAgICAgICBsb2FkQ2FsZW5kYXIocGlkLCAnI2NhbGVuZGFyLnRhYnMtcGFuZWwnKTtcbiAgICAgICAgICAgICAgICBjYWxlbmRhckxvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLm9uKCdtb3VzZW92ZXInLCAnI2tyLXRodW1iIGltZycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGxldCBwcm9wZXJ0eSA9ICQodGhpcykucGFyZW50KCkuZGF0YSgnaWQnKTtcbiAgICAgICAgICAgIGlmIChwcm9wZXJ0eSkge1xuICAgICAgICAgICAgICAgIGxldCB0YXJnZXQgPSAnLnRodW1ib3ZlcnZpZXcnICsgcHJvcGVydHk7XG4gICAgICAgICAgICAgICAgJCgnI3BpbmZvJykuaHRtbCgkKHRhcmdldCkuaHRtbCgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0ICRwcm9wcyA9ICQoJy5rci1wcm9wZXJ0aWVzJyk7XG4gICAgICAgIGlmICgkcHJvcHMubGVuZ3RoICYmICFzZWFyY2hEb25lKSB7XG4gICAgICAgICAgICBnZXRQcm9wZXJ0aWVzKCRwcm9wcy5kYXRhKCdiYXInKSk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0ICR0YWJzID0gJCgnLnRhYnMnKTtcbiAgICAgICAgaWYgKCQoJyNrci1wcm9wZXJ0eS10YWJzJykubGVuZ3RoICYmICFjYWxlbmRhckxvYWRlZCkge1xuICAgICAgICAgICAgJHRhYnMuZmluZCgnYScpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmF0dHIoJ2hyZWYnKSA9PT0gXCIjY2FsZW5kYXJcIikge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwaWQgPSAkKHRoaXMpLmRhdGEoJ3BpZCcpO1xuICAgICAgICAgICAgICAgICAgICBsb2FkQ2FsZW5kYXIocGlkLCAnI2NhbGVuZGFyLnRhYnMtcGFuZWwnKTtcbiAgICAgICAgICAgICAgICAgICAgY2FsZW5kYXJMb2FkZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAkLmV2ZW50LnNwZWNpYWwudG91Y2hzdGFydCA9IHtcbiAgICAgICAgc2V0dXA6IGZ1bmN0aW9uIChfLCBucywgaGFuZGxlKSB7XG4gICAgICAgICAgICBpZiAobnMuaW5jbHVkZXMoXCJub1ByZXZlbnREZWZhdWx0XCIpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCBoYW5kbGUsIHtwYXNzaXZlOiBmYWxzZX0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIGhhbmRsZSwge3Bhc3NpdmU6IHRydWV9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgJC5ldmVudC5zcGVjaWFsLnRvdWNobW92ZSA9IHtcbiAgICAgICAgc2V0dXA6IGZ1bmN0aW9uIChfLCBucywgaGFuZGxlKSB7XG4gICAgICAgICAgICBpZiAobnMuaW5jbHVkZXMoXCJub1ByZXZlbnREZWZhdWx0XCIpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsIGhhbmRsZSwge3Bhc3NpdmU6IGZhbHNlfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLCBoYW5kbGUsIHtwYXNzaXZlOiB0cnVlfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gbG9hZENhbGVuZGFyKHBpZCwgdGFyZ2V0KSB7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgICAgICB1cmw6ICcvaW5kZXgucGhwP29wdGlvbj1jb21fa25vd3JlcyZ0YXNrPXByb3BlcnR5LmdlcmlhdHJpYycsXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2h0bWwnLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICdwaWQnOiBwaWRcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICQodGFyZ2V0KS5hcHBlbmQoZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZvcm1SZXNwb25zZShpZCwgZGF0YSkge1xuICAgICAgICBpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eSgncmVkaXJlY3QnKSkge1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2UoZGF0YS5yZWRpcmVjdCk7XG4gICAgICAgIH0gZWxzZSBpZiAoaWQgPT09ICdrci1mb3JtLXBheW1lbnQnKSB7XG4gICAgICAgICAgICBpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eSgnaHRtbCcpKSB7XG4gICAgICAgICAgICAgICAgbGV0ICRtb2RhbCA9ICQoJyNrci1nYXRld2F5LW1vZGFsJyk7XG4gICAgICAgICAgICAgICAgJG1vZGFsLmh0bWwoZGF0YS5odG1sKS50cmlnZ2VyKCdyZXNpemVtZS56Zi5yZXZlYWwnKTtcbiAgICAgICAgICAgICAgICAkbW9kYWwuZm91bmRhdGlvbignb3BlbicpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChpZCA9PT0gJ2tyLWZvcm0tbWFpbGNoaW1wJykge1xuICAgICAgICAgICAgJCgnI3Jlc3BvbnNlMicpLmh0bWwoZGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRQcm9wZXJ0aWVzKGJhciwgYWN0aW9uID0gJycsIGFjdGlvbl92YWx1ZSA9ICcnKSB7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6ICcvaW5kZXgucGhwP29wdGlvbj1jb21fa25vd3JlcyZ0YXNrPXByb3BlcnRpZXMucmF3JyxcbiAgICAgICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgICAgIGRhdGE6IHsnYmFyJzogYmFyLCAnYWN0aW9uJzogYWN0aW9uLCAnYWN0aW9uX3ZhbHVlJzogYWN0aW9uX3ZhbHVlfSxcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCB2YWxzID0gWydsaXN0JywgJ2dyaWQnLCAndGh1bWInLCAnZmF2cycsICdtYXAnXTtcbiAgICAgICAgICAgICAgICBpZiAodmFscy5pbmNsdWRlcyhkYXRhLmJhcikpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0QWN0aXZlTWVudShkYXRhLmJhcik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgc2V0U2VhcmNoRGF0YShkYXRhLCBkYXRhLmJhcik7XG4gICAgICAgICAgICAgICAgJCgnLmhhcy10aXAnKS5mb3VuZGF0aW9uKCk7XG4gICAgICAgICAgICAgICAgJCgnLmRyb3Bkb3duLXBhbmUnKS5mb3VuZGF0aW9uKCk7XG4gICAgICAgICAgICAgICAgJCgnLmtyLXByb3BlcnR5IC5jYXJkJykuZm91bmRhdGlvbigpO1xuICAgICAgICAgICAgICAgICQoJyNrci1vcmRlci1jbG9zZScpLnRyaWdnZXIoJ2NsaWNrJyk7XG4gICAgICAgICAgICAgICAgc2VhcmNoRG9uZSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldFNlYXJjaERhdGEocmVzcG9uc2UsIGFjdGlvbiA9ICcnKSB7XG4gICAgICAgIGxldCAkc2lkZWJhcjtcbiAgICAgICAgaWYgKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAkKCcja3ItcHJvcGVydGllcy1kYXRhJykuZW1wdHkoKS5mYWRlSW4oJ3Nsb3cnKS5odG1sKHJlc3BvbnNlWydpdGVtcyddKS5mb3VuZGF0aW9uKCk7XG4gICAgICAgICAgICBpZiAoYWN0aW9uICE9PSAndGh1bWInKSB7XG4gICAgICAgICAgICAgICAgJCgnLmtyLXBhZ2VyJykuaHRtbChyZXNwb25zZVsncGFnaW5hdGlvbiddKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICQoJy5rci1wYWdlci5ib3R0b20nKS5odG1sKHJlc3BvbnNlWydwYWdpbmF0aW9uJ10pO1xuICAgICAgICAgICAgJChcIiNrci1vZmZjYW52YXMtcHJvcGVydGllcy1maWx0ZXJcIikuaHRtbChyZXNwb25zZVsnZmlsdGVycyddKTtcbiAgICAgICAgICAgICQoXCIja3Itb2ZmY2FudmFzLXByb3BlcnRpZXMtc29ydGJ5XCIpLmh0bWwocmVzcG9uc2VbJ3NvcnRieSddKTtcbiAgICAgICAgICAgICRzaWRlYmFyID0gJChcIiNrci1zaWRlYmFyLXNlYXJjaFwiKTtcbiAgICAgICAgICAgIGlmICgkc2lkZWJhci5sZW5ndGggJiYgcmVzcG9uc2VbJ3NlYXJjaCddLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICRzaWRlYmFyLmVtcHR5KCkuaHRtbChyZXNwb25zZVsnc2VhcmNoJ10pO1xuICAgICAgICAgICAgICAgICQoJ2JvZHknKS50cmlnZ2VyKCdpbml0YWpheHNlYXJjaCcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoYWN0aW9uID09PSAncGFnZScpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRBY3RpdmVNZW51KGJhcikge1xuICAgICAgICBjb25zdCBzZWFyY2hiYXIgPSAkKCcua3Itc2VhcmNoYmFyJykuZmluZCgnLmJ1dHRvbicpO1xuICAgICAgICAkLmVhY2goc2VhcmNoYmFyLCBmdW5jdGlvbiAoaW5kZXgsIHNlYXJjaGJhcikge1xuICAgICAgICAgICAgJChzZWFyY2hiYXIpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgfSk7XG4gICAgICAgICQoJy5rci1zZWFyY2hiYXIgLmJ1dHRvbi4nICsgYmFyKS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIHRydWUgaWYgd2lkdGggaGFzIGNoYW5nZWRcbiAgICBmdW5jdGlvbiBzY3JlZW5XaWR0aEhhc0NoYW5nZWQoKSB7XG4gICAgICAgIGxhcmdlID0gRm91bmRhdGlvbi5NZWRpYVF1ZXJ5LmF0TGVhc3QoJ2xhcmdlJyk7XG4gICAgICAgIGlmIChsYXJnZSAhPT0gc2F2ZWR3aWR0aCkge1xuICAgICAgICAgICAgc2F2ZWR3aWR0aCA9IGxhcmdlO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoZWNrU2NyZWVuV2lkdGgoKSB7XG4gICAgICAgIHJlc2l6ZWQgPSBmYWxzZTtcbiAgICAgICAgaWYgKHNjcmVlbldpZHRoSGFzQ2hhbmdlZCgpICYmIHNlYXJjaERhdGFbJ2l0ZW1zJ10gJiYgIXJlc2l6ZWQpIHtcbiAgICAgICAgICAgIHNldFNlYXJjaERhdGEoc2VhcmNoRGF0YSk7XG4gICAgICAgICAgICByZXNpemVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgICQuZXZlbnQuc3BlY2lhbC50b3VjaHN0YXJ0ID0ge1xuICAgICAgICBzZXR1cDogZnVuY3Rpb24gKF8sIG5zLCBoYW5kbGUpIHtcbiAgICAgICAgICAgIGlmIChucy5pbmNsdWRlcyhcIm5vUHJldmVudERlZmF1bHRcIikpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIGhhbmRsZSwge3Bhc3NpdmU6IGZhbHNlfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgaGFuZGxlLCB7cGFzc2l2ZTogdHJ1ZX0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICAkLmV2ZW50LnNwZWNpYWwudG91Y2htb3ZlID0ge1xuICAgICAgICBzZXR1cDogZnVuY3Rpb24gKF8sIG5zLCBoYW5kbGUpIHtcbiAgICAgICAgICAgIGlmIChucy5pbmNsdWRlcyhcIm5vUHJldmVudERlZmF1bHRcIikpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIiwgaGFuZGxlLCB7cGFzc2l2ZTogZmFsc2V9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsIGhhbmRsZSwge3Bhc3NpdmU6IHRydWV9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG59KGpRdWVyeSkpOyIsIi8qKlxuICogQHBhY2thZ2UgICAgS25vdyBSZXNlcnZhdGlvbnNcbiAqIEBzdWJwYWNrYWdlIFNpdGUgSlNcbiAqIEBjb3B5cmlnaHQgIDIwMjAgSGlnaGxhbmQgVmlzaW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogQGxpY2Vuc2UgICAgU2VlIHRoZSBmaWxlIFwiTElDRU5TRS50eHRcIiBmb3IgdGhlIGZ1bGwgbGljZW5zZSBnb3Zlcm5pbmcgdGhpcyBjb2RlLlxuICogQGF1dGhvciAgICAgSGF6ZWwgV2lsc29uIDxoYXplbEBoaWdobGFuZHZpc2lvbi5jb20+XG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoJCkge1xuXHRpZiAoIXdpbmRvdy5sb2NhdGlvbi5vcmlnaW4pXG5cdFx0d2luZG93LmxvY2F0aW9uLm9yaWdpbiA9IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCArIFwiLy9cIiArIHdpbmRvdy5sb2NhdGlvbi5ob3N0O1xuXG5cdGxldCBteUNvbmZpcm0sICRteVRhc2s7XG5cblx0Y2xhc3MgS3Jjb25maXJtIHtcblx0XHRjb25zdHJ1Y3RvcigkZm9ybSkge1xuXHRcdFx0dGhpcy5mb3JtID0gJGZvcm07XG5cdFx0XHR0aGlzLmluaXQoKTtcblx0XHR9XG5cblx0XHRpbml0KCkge1xuXHRcdFx0dGhpcy51cGRhdGVRdW90ZSh0aGlzLmZvcm0pO1xuXHRcdH1cblxuXHRcdHVwZGF0ZVF1b3RlKCRmb3JtKSB7XG5cdFx0XHQkbXlUYXNrID0gJCgnI215dGFzaycpO1xuXHRcdFx0JG15VGFzay52YWwoJ2NvbmZpcm0uY29tcHV0ZScpO1xuXHRcdFx0alF1ZXJ5LmFqYXgoe1xuXHRcdFx0XHR0eXBlOiAgICAgJ1BPU1QnLFxuXHRcdFx0XHR1cmw6ICAgICAgJ2luZGV4LnBocD9vcHRpb249Y29tX2tub3dyZXMmdGFzaz1jb25maXJtLmNvbXB1dGUnLFxuXHRcdFx0XHRkYXRhOiAgICAgJGZvcm0uc2VyaWFsaXplQXJyYXkoKSxcblx0XHRcdFx0ZGF0YVR5cGU6ICdqc29uJyxcblx0XHRcdFx0c3VjY2VzczogIGZ1bmN0aW9uIChyZXN1bHQpIHtcblx0XHRcdFx0XHQkbXlUYXNrLnZhbCgnY29uZmlybS5wYXltZW50Jyk7XG5cdFx0XHRcdFx0aWYgKHJlc3VsdC5zdWNjZXNzKSB7XG5cdFx0XHRcdFx0XHRjb25zdCBkYXRhID0gcmVzdWx0LmRhdGE7XG5cdFx0XHRcdFx0XHRpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eSgncmVkaXJlY3QnKSkge1xuXHRcdFx0XHRcdFx0XHR3aW5kb3cubG9jYXRpb24ucmVwbGFjZShkYXRhLnJlZGlyZWN0KTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGxldCBkaXY7XG5cdFx0XHRcdFx0XHQkLmVhY2gocmVzdWx0LmRhdGEucmVzcG9uc2UsIGZ1bmN0aW9uIChrZXksIHZhbCkge1xuXHRcdFx0XHRcdFx0XHQkKCcuaGlkZWluaXRpYWwnKS5zaG93KCk7XG5cdFx0XHRcdFx0XHRcdGRpdiA9IFwiI1wiICsga2V5O1xuXHRcdFx0XHRcdFx0XHQkKGRpdikudGV4dCh2YWwpO1xuXHRcdFx0XHRcdFx0XHQkKGRpdikuaHRtbCh2YWwpO1xuXHRcdFx0XHRcdFx0XHQkKGRpdikudmFsKHZhbCk7XG5cdFx0XHRcdFx0XHRcdCQoZGl2KS5zaG93KCk7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0JCgnLmtyLWFqYXgtbW9kYWwtZXJyb3ItbWVzc2FnZScpLmh0bWwocmVzdWx0Lm1lc3NhZ2UpO1xuXHRcdFx0XHRcdFx0Y29uc3QgJG1vZGFsID0gbmV3IEZvdW5kYXRpb24uUmV2ZWFsKCQoJyNLckFqYXhNb2RhbEVycm9yJykpO1xuXHRcdFx0XHRcdFx0JG1vZGFsLm9wZW4oKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdCQoZnVuY3Rpb24gKCkge1xuXHRcdGxldCAkZWxlbWVudCA9ICQoJyNrci1mb3JtLWNvbmZpcm0nKTtcblx0XHRpZiAoJGVsZW1lbnQubGVuZ3RoKSB7XG5cdFx0XHRteUNvbmZpcm0gPSBuZXcgS3Jjb25maXJtKCRlbGVtZW50KTtcblx0XHR9XG5cdFx0JGVsZW1lbnQub24oJ2NoYW5nZSBjbGljaycsICcua3ItY2FsY3VsYXRlJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdCRlbGVtZW50ID0gJCgnI2tyLWZvcm0tY29uZmlybScpO1xuXHRcdFx0bXlDb25maXJtLnVwZGF0ZVF1b3RlKCRlbGVtZW50KTtcblx0XHR9KTtcblxuXHRcdCQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcjY2hlY2t0ZXJtcycsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRpZiAoY2hlY2tUZXJtcygpKSB7XG5cdFx0XHRcdCQoJyNjaGVja3Rlcm1zJykudHJpZ2dlcignc3VibWl0Jyk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0pO1xuXG5cdC8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuXHRmdW5jdGlvbiBjaGVja1Rlcm1zKCkge1xuXHRcdGxldCByZXN1bHQgPSB0cnVlO1xuXHRcdGNvbnN0IHRlc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWdyZWVjaGVjaycpO1xuXHRcdGNvbnN0IHRlc3RjID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FncmVlY2hlY2tjJyk7XG5cdFx0Y29uc3QgdGVzdHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWdyZWVjaGVja3QnKTtcblxuXHRcdC8vIG5vaW5zcGVjdGlvbiBKU1VucmVzb2x2ZWRWYXJpYWJsZVxuXHRcdGlmICh0ZXN0ICYmICFkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgna3ItZm9ybS1wYXltZW50JykuYWdyZWVjaGVjay5jaGVja2VkKSB7XG5cdFx0XHRyZXN1bHQgPSBmYWxzZTtcblx0XHR9XG5cdFx0Ly8gbm9pbnNwZWN0aW9uIEpTVW5yZXNvbHZlZFZhcmlhYmxlXG5cdFx0aWYgKHRlc3RjICYmICFkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgna3ItZm9ybS1wYXltZW50JykuYWdyZWVjaGVja2MuY2hlY2tlZCkge1xuXHRcdFx0cmVzdWx0ID0gZmFsc2U7XG5cdFx0fVxuXHRcdC8vIG5vaW5zcGVjdGlvbiBKU1VucmVzb2x2ZWRWYXJpYWJsZVxuXHRcdGlmICh0ZXN0dCAmJiAhZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2tyLWZvcm0tcGF5bWVudCcpLmFncmVlY2hlY2t0LmNoZWNrZWQpIHtcblx0XHRcdHJlc3VsdCA9IGZhbHNlO1xuXHRcdH1cblxuXHRcdGlmIChyZXN1bHQpIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zdCAkbW9kYWwgPSBuZXcgRm91bmRhdGlvbi5SZXZlYWwoJCgnI2Vycm9yTW9kYWwnKSk7XG5cdFx0XHQkbW9kYWwub3BlbigpO1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0fVxufShqUXVlcnkpKTsiLCIvKipcbiAqIEBwYWNrYWdlICAgIEtub3cgUmVzZXJ2YXRpb25zXG4gKiBAc3VicGFja2FnZSBTaXRlIEpTXG4gKiBAY29weXJpZ2h0ICAyMDIwIEhpZ2hsYW5kIFZpc2lvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIEBsaWNlbnNlICAgIFNlZSB0aGUgZmlsZSBcIkxJQ0VOU0UudHh0XCIgZm9yIHRoZSBmdWxsIGxpY2Vuc2UgZ292ZXJuaW5nIHRoaXMgY29kZS5cbiAqIEBhdXRob3IgICAgIEhhemVsIFdpbHNvbiA8aGF6ZWxAaGlnaGxhbmR2aXNpb24uY29tPlxuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG5pZiAoIXdpbmRvdy5sb2NhdGlvbi5vcmlnaW4pIHtcblx0d2luZG93LmxvY2F0aW9uLm9yaWdpbiA9IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCArIFwiLy9cIiArIHdpbmRvdy5sb2NhdGlvbi5ob3N0O1xufVxuXG4oZnVuY3Rpb24gKCQpIHtcblx0bGV0IG15S3JEb2JFbnRyeTtcblx0bGV0IHRvZGF5O1xuXHRsZXQga2V5ID0ge0JBQ0tTUEFDRTogOH07XG5cblx0bGV0IHNldHRpbmdzID0ge1xuXHRcdGN1c3RvbV92YWxpZGF0aW9uOiAgICAgZmFsc2UsXG5cdFx0ZGF5c19pbl9tb250aDogICAgICAgICBbMzEsIDI5LCAzMSwgMzAsIDMxLCAzMCwgMzEsIDMxLCAzMCwgMzEsIDMwLCAzMV0sXG5cdFx0ZG9jdW1lbnRfZGF0ZTogICAgICAgICBmYWxzZSxcblx0XHRlcnJvcmJveF94OiAgICAgICAgICAgIDEsXG5cdFx0ZXJyb3Jib3hfeTogICAgICAgICAgICA1LFxuXHRcdGZpZWxkX2hpbnRfdGV4dF9kYXk6ICAgJ0REJyxcblx0XHRmaWVsZF9oaW50X3RleHRfbW9udGg6ICdNTScsXG5cdFx0ZmllbGRfaGludF90ZXh0X3llYXI6ICAnWVlZWScsXG5cdFx0ZmllbGRfb3JkZXI6ICAgICAgICAgICAnRE1ZJyxcblx0XHRmaWVsZF93aWR0aF9kYXk6ICAgICAgIDYsXG5cdFx0ZmllbGRfd2lkdGhfbW9udGg6ICAgICA2LFxuXHRcdGZpZWxkX3dpZHRoX3llYXI6ICAgICAgNyxcblx0XHRmaWVsZF93aWR0aF9zZXA6ICAgICAgIDIsXG5cdFx0bWlubWF4OiAgICAgICAgICAgICAgICAnJyxcblx0XHRtaW5fZGF0ZTogICAgICAgICAgICAgIGZhbHNlLFxuXHRcdG1heF9kYXRlOiAgICAgICAgICAgICAgZmFsc2UsXG5cdFx0bWluX3llYXI6ICAgICAgICAgICAgICAxOTEwLFxuXHRcdG1vbnRoX25hbWU6ICAgICAgICAgICAgW1xuXHRcdFx0J0phbnVhcnknLCAnRmVicnVhcnknLCAnTWFyY2gnLCAnQXByaWwnLFxuXHRcdFx0J01heScsICdKdW5lJywgJ0p1bHknLCAnQXVndXN0JywgJ1NlcHRlbWJlcicsXG5cdFx0XHQnT2N0b2JlcicsICdOb3ZlbWJlcicsICdEZWNlbWJlciddLFxuXHRcdG9uX2JsdXI6ICAgICAgICAgICAgICAgZmFsc2UsXG5cdFx0b25fZXJyb3I6ICAgICAgICAgICAgICBmYWxzZSxcblx0XHRvbl9jaGFuZ2U6ICAgICAgICAgICAgIGZhbHNlLFxuXHRcdHBhcnNlX2RhdGU6ICAgICAgICAgICAgdHJ1ZSxcblx0XHRzZXBhcmF0b3I6ICAgICAgICAgICAgICcvJyxcblx0XHRzaG93X2Vycm9yczogICAgICAgICAgIHRydWUsXG5cdFx0c2hvd19oaW50czogICAgICAgICAgICB0cnVlLFxuXHRcdEVfREFZX05BTjogICAgICAgICAgICAgJ0RheSBtdXN0IGJlIGEgbnVtYmVyJyxcblx0XHRFX0RBWV9UT09fQklHOiAgICAgICAgICdEYXkgbXVzdCBiZSAxLTMxJyxcblx0XHRFX0RBWV9UT09fU01BTEw6ICAgICAgICdEYXkgbXVzdCBiZSAxLTMxJyxcblx0XHRFX0JBRF9EQVlfRk9SX01PTlRIOiAgICdPbmx5ICVkIGRheXMgaW4gJW0gJXknLFxuXHRcdEVfTU9OVEhfTkFOOiAgICAgICAgICAgJ01vbnRoIG11c3QgYmUgYSBudW1iZXInLFxuXHRcdEVfTU9OVEhfVE9PX0JJRzogICAgICAgJ01vbnRoIG11c3QgYmUgMS0xMicsXG5cdFx0RV9NT05USF9UT09fU01BTEw6ICAgICAnTW9udGggY2Fubm90IGJlIDAnLFxuXHRcdEVfWUVBUl9OQU46ICAgICAgICAgICAgJ1llYXIgbXVzdCBiZSBhIG51bWJlcicsXG5cdFx0RV9ZRUFSX0xFTkdUSDogICAgICAgICAnWWVhciBtdXN0IGJlIDQgZGlnaXRzJyxcblx0XHRFX1lFQVJfVE9PX1NNQUxMOiAgICAgICdZZWFyIG11c3Qgbm90IGJlIGJlZm9yZSAleScsXG5cdFx0RV9NSU5fREFURTogICAgICAgICAgICAnRGF0ZSBtdXN0IG5vdCBiZSBpbiB0aGUgcGFzdCcsXG5cdFx0RV9NQVhfREFURTogICAgICAgICAgICAnRGF0ZSBtdXN0IG5vdCBiZSBpbiB0aGUgZnV0dXJlJ1xuXHR9O1xuXG5cdGNsYXNzIEtyRG9iRW50cnkge1xuXHRcdGNvbnN0cnVjdG9yKCRlbGVtZW50LCBvcHRpb25zKSB7XG5cdFx0XHR0b2RheSA9IEtyRG9iRW50cnkuZ2V0WW1kKG5ldyBEYXRlKCkpO1xuXG5cdFx0XHR0aGlzLmlucHV0X2RheSA9IDA7XG5cdFx0XHR0aGlzLmlucHV0X21vbnRoID0gMDtcblx0XHRcdHRoaXMuaW5wdXRfeWVhciA9IDA7XG5cdFx0XHR0aGlzLiRlbGVtZW50ID0gJGVsZW1lbnQ7XG5cdFx0XHRpZiAob3B0aW9ucykge1xuXHRcdFx0XHQkLmV4dGVuZChzZXR0aW5ncywgb3B0aW9ucyk7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuaW5pdCgpO1xuXHRcdH1cblxuXHRcdHN0YXRpYyBnZXRZbWQoZGF0ZSkge1xuXHRcdFx0Y29uc3QgbSA9IGRhdGUuZ2V0TW9udGgoKSArIDE7XG5cdFx0XHRjb25zdCBkID0gZGF0ZS5nZXREYXkoKTtcblxuXHRcdFx0cmV0dXJuIChkYXRlLmdldEZ1bGxZZWFyKCkgKyAnLScgKyAobSA8IDEwID8gJzAnIDogJycpICsgbSArICctJyArIChkIDwgMTAgPyAnMCcgOiAnJykgKyBkKTtcblx0XHR9XG5cblx0XHRzdGF0aWMgZ2V0WW1kT2JqZWN0KGRhdGUpIHtcblx0XHRcdHJldHVybiAoZGF0ZS55ZWFyICsgJy0nICsgZGF0ZS5tb250aCArICctJyArIGRhdGUuZGF5KTtcblx0XHR9XG5cblx0XHRhZGRFbnRyeUZpZWxkcygpIHtcblx0XHRcdGxldCBkb2JmaWVsZCA9IHRoaXM7XG5cdFx0XHRkb2JmaWVsZC5maWVsZHMgPSBbXTtcblx0XHRcdCQuZWFjaChzZXR0aW5ncy5maWVsZF9vcmRlci5zcGxpdCgnJyksIGZ1bmN0aW9uIChpLCBmaWVsZCkge1xuXHRcdFx0XHRzd2l0Y2ggKGZpZWxkKSB7XG5cdFx0XHRcdFx0Y2FzZSAnRCc6XG5cdFx0XHRcdFx0XHRkb2JmaWVsZC5idWlsZEZpZWxkKCdkYXknLCBpKTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgJ00nOlxuXHRcdFx0XHRcdFx0ZG9iZmllbGQuYnVpbGRGaWVsZCgnbW9udGgnLCBpKTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgJ1knOlxuXHRcdFx0XHRcdFx0ZG9iZmllbGQuYnVpbGRGaWVsZCgneWVhcicsIGkpO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0ZGVmYXVsdCA6XG5cdFx0XHRcdFx0XHR0aHJvdyBcIlVuZXhwZWN0ZWQgZmllbGQgb3JkZXIgJ1wiICsgZmllbGQgKyBcIicgZXhwZWN0ZWQgRCwgTSBvciBZXCI7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGFmdGVyUGFzdGUodGFyZ2V0KSB7XG5cdFx0XHRpZiAodGhpcy5wYXJzZURhdGUoJCh0YXJnZXQpLnZhbCgpKSkge1xuXHRcdFx0XHR0aGlzLnNldERhdGUoJCh0YXJnZXQpLnZhbCgpKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRidWlsZEZpZWxkKG5hbWUsIGluZGV4KSB7XG5cdFx0XHRsZXQga3Jkb2JlbnRyeSA9IHRoaXM7XG5cdFx0XHRsZXQgaW5wdXQgPSBuZXcgS3JEb2JJbnB1dCh7XG5cdFx0XHRcdG5hbWU6ICAgICAgIG5hbWUsXG5cdFx0XHRcdGtyZG9iZW50cnk6IGtyZG9iZW50cnksXG5cdFx0XHRcdGluZGV4OiAgICAgIGluZGV4LFxuXHRcdFx0XHRoaW50X3RleHQ6ICBzZXR0aW5ncy5zaG93X2hpbnRzID8gc2V0dGluZ3NbJ2ZpZWxkX2hpbnRfdGV4dF8nICsgbmFtZV0gOiBudWxsLFxuXHRcdFx0fSk7XG5cblx0XHRcdHRoaXMuaW5uZXIuYXBwZW5kKGlucHV0LiRpbnB1dCk7XG5cdFx0XHR0aGlzWydpbnB1dF8nICsgbmFtZV0gPSBpbnB1dDtcblxuXHRcdFx0aWYgKGluZGV4IDwgMikge1xuXHRcdFx0XHR0aGlzLmlubmVyLmFwcGVuZCgkKCc8c3BhbiBjbGFzcz1cInNlcGFyYXRvclwiIC8+JykudGV4dChzZXR0aW5ncy5zZXBhcmF0b3IpKTtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5maWVsZHNbaW5kZXhdID0gaW5wdXQ7XG5cdFx0XHR0aGlzW25hbWVdID0gaW5wdXQ7XG5cdFx0fVxuXG5cdFx0YnVpbGRVaSgpIHtcblx0XHRcdGxldCBkb2JmaWVsZCA9IHRoaXM7XG5cdFx0XHR0aGlzLndyYXBwZXIgPSAkKHRoaXMuJGVsZW1lbnQud3JhcCgnPHNwYW4gY2xhc3M9XCJqcS1kdGVcIiAvPicpLnBhcmVudCgpWzBdKTtcblx0XHRcdHRoaXMuaW5uZXIgPSAkKCc8c3BhbiBjbGFzcz1cImpxLWR0ZS1pbm5lclwiIC8+Jyk7XG5cdFx0XHR0aGlzLmFkZEVudHJ5RmllbGRzKCk7XG5cdFx0XHR0aGlzLmVycm9yYm94ID0gJCgnPHNwYW4gY2xhc3M9XCJqcS1kdGUtZXJyb3Jib3hcIiAvPicpLmhpZGUoKTtcblx0XHRcdHRoaXMuaW5uZXIub24oJ3Bhc3RlJywgJ2lucHV0JywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0bGV0IGlucHV0ID0gdGhpcztcblx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0ZG9iZmllbGQuYWZ0ZXJQYXN0ZShpbnB1dCwgZSk7XG5cdFx0XHRcdH0sIDIpO1xuXHRcdFx0fSk7XG5cdFx0XHR0aGlzLndyYXBwZXIuYXBwZW5kKHRoaXMuaW5uZXIsIHRoaXMuZXJyb3Jib3gpO1xuXHRcdFx0dGhpcy5zZXRGaWVsZFdpZHRocygpO1xuXHRcdFx0dGhpcy4kZWxlbWVudC5oaWRlKCk7XG5cdFx0fVxuXG5cdFx0Y2hlY2tEb2N1bWVudChkb2IsIGNoaWxkZG9iLCBjbGFzc25hbWUpIHtcblx0XHRcdGxldCBlbGVtZW50cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoY2xhc3NuYW1lKTtcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0aWYgKG5ldyBEYXRlKGRvYikgPiBuZXcgRGF0ZShjaGlsZGRvYikpIHtcblx0XHRcdFx0XHRlbGVtZW50c1tpXS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGVsZW1lbnRzW2ldLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Y2xlYXIoKSB7XG5cdFx0XHR0aGlzLmNsZWFyRXJyb3IoJycpO1xuXHRcdFx0dGhpcy5zZXREYXRlKCcnKTtcblx0XHR9XG5cblx0XHRjbGVhckVycm9yKCkge1xuXHRcdFx0ZGVsZXRlIHRoaXMuZXJyb3JfdGV4dDtcblx0XHRcdHRoaXMuc2hvd0Vycm9yKCk7XG5cdFx0fVxuXG5cdFx0ZGVzdHJveSgpIHtcblx0XHRcdHRoaXMuJGVsZW1lbnQuc2hvdygpO1xuXHRcdFx0dGhpcy4kZWxlbWVudC5jc3MoJ2Rpc3BsYXknLCAnJyk7XG5cdFx0XHR0aGlzLndyYXBwZXIuZmluZCgnc3BhbicpLnJlbW92ZSgpO1xuXHRcdFx0dGhpcy4kZWxlbWVudC51bndyYXAoKTtcblx0XHRcdHRoaXMuJGVsZW1lbnQucmVtb3ZlRGF0YSgnZGF0ZXRleHRlbnRyeScpO1xuXHRcdFx0ZGVsZXRlIHRoaXMuaW5uZXI7XG5cdFx0XHRkZWxldGUgdGhpcy53cmFwcGVyO1xuXHRcdFx0ZGVsZXRlIHRoaXMuJGVsZW1lbnQ7XG5cdFx0fVxuXG5cdFx0Zm9jdXMoKSB7XG5cdFx0XHR0aGlzLmZpZWxkc1swXS5zZXRGb2N1cyh0cnVlKTtcblx0XHR9XG5cblx0XHRmb2N1c0ZpZWxkQmVmb3JlKGlucHV0KSB7XG5cdFx0XHRjb25zdCBpbmRleCA9IGlucHV0LmluZGV4O1xuXHRcdFx0aWYgKGluZGV4IDwgMSkge1xuXHRcdFx0XHRyZXR1cm5cblx0XHRcdH1cblx0XHRcdHRoaXMuZmllbGRzW2luZGV4XS55aWVsZEZvY3VzKCk7XG5cdFx0XHR0aGlzLmZpZWxkc1tpbmRleCAtIDFdLnNldEZvY3VzKHRydWUpO1xuXHRcdFx0Ly8gbGV0IG5leHQgPSB0aGlzLmZpZWxkc1tpbmRleCAtIDFdO1xuXHRcdFx0Ly8gbGV0IHZhbCA9IG5leHQuZ2V0KCk7XG5cdFx0XHQvLyBuZXh0LnNldEZvY3VzKGZhbHNlKTtcblx0XHR9XG5cblx0XHRmb2N1c0ZpZWxkQWZ0ZXIoaW5wdXQpIHtcblx0XHRcdGNvbnN0IGluZGV4ID0gaW5wdXQuaW5kZXg7XG5cdFx0XHRpZiAoaW5kZXggPiAxKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdHRoaXMuZmllbGRzW2luZGV4XS55aWVsZEZvY3VzKCk7XG5cdFx0XHR0aGlzLmZpZWxkc1tpbmRleCArIDFdLnNldEZvY3VzKHRydWUpO1xuXHRcdH1cblxuXHRcdGZvY3VzSW4oKSB7XG5cdFx0XHR0aGlzLndyYXBwZXIuYWRkQ2xhc3MoJ2ZvY3VzJyk7XG5cdFx0fVxuXG5cdFx0Zm9jdXNPdXQoKSB7XG5cdFx0XHRpZiAoc2V0dGluZ3Mub25fYmx1cikge1xuXHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRzZWxmLndpZGdldEZvY3VzTG9zdCgpO1xuXHRcdFx0XHR9LCAyKTtcblx0XHRcdH1cblx0XHRcdHRoaXMud3JhcHBlci5yZW1vdmVDbGFzcygnZm9jdXMnKTtcblx0XHR9XG5cblx0XHRnZXREYXRlKCkge1xuXHRcdFx0cmV0dXJuICh0aGlzLmRheV92YWx1ZSAmJiB0aGlzLm1vbnRoX3ZhbHVlICYmIHRoaXMueWVhcl92YWx1ZSlcblx0XHRcdCAgICAgICA/IHtkYXk6IHRoaXMuZGF5X3ZhbHVlLCBtb250aDogdGhpcy5tb250aF92YWx1ZSwgeWVhcjogdGhpcy55ZWFyX3ZhbHVlfVxuXHRcdFx0ICAgICAgIDogbnVsbDtcblx0XHR9XG5cblx0XHRpbml0KCkge1xuXHRcdFx0aWYgKCFzZXR0aW5ncy5taW5feWVhcilcblx0XHRcdFx0c2V0dGluZ3MubWluX3llYXIgPSAnMTkxMCc7XG5cblx0XHRcdHRoaXMuYnVpbGRVaSgpO1xuXHRcdFx0dGhpcy5zZXREYXRlKHRoaXMuJGVsZW1lbnQuYXR0cigndmFsdWUnKSk7XG5cdFx0XHR0aGlzLnByb3h5TGFiZWxDbGlja3MoKTtcblx0XHR9XG5cblx0XHRwYXJzZURhdGUodGV4dCkge1xuXHRcdFx0cmV0dXJuIHRoaXMucGFyc2VJc29EYXRlKHRleHQpO1xuXHRcdH1cblxuXHRcdHBhcnNlSXNvRGF0ZSh0ZXh0KSB7XG5cdFx0XHRyZXR1cm4gdGV4dCAmJiB0ZXh0Lm1hdGNoKC9eKFxcZFxcZFxcZFxcZCktKFxcZFxcZCktKFxcZFxcZCkvKSA/IHtcblx0XHRcdFx0ZGF5OiAgIFJlZ0V4cC4kMyxcblx0XHRcdFx0bW9udGg6IFJlZ0V4cC4kMixcblx0XHRcdFx0eWVhcjogIFJlZ0V4cC4kMVxuXHRcdFx0fSA6IG51bGw7XG5cdFx0fVxuXG5cdFx0cHJveHlMYWJlbENsaWNrcygpIHtcblx0XHRcdGxldCBkb2JmaWVsZCA9IHRoaXM7XG5cdFx0XHRsZXQgaWQgPSB0aGlzLiRlbGVtZW50LmF0dHIoJ2lkJyk7XG5cdFx0XHRpZiAoIWlkKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdCQoJ2xhYmVsW2Zvcj0nICsgaWQgKyAnXScpLmNsaWNrKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0ZG9iZmllbGQuZm9jdXMoKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdHNldERhdGUobmV3X2RhdGUpIHtcblx0XHRcdGxldCBkb2JmaWVsZCA9IHRoaXM7XG5cdFx0XHRuZXdfZGF0ZSA9IHRoaXMucGFyc2VEYXRlKG5ld19kYXRlKTtcblx0XHRcdGRlbGV0ZSB0aGlzLmRheV92YWx1ZTtcblx0XHRcdGRlbGV0ZSB0aGlzLm1vbnRoX3ZhbHVlO1xuXHRcdFx0ZGVsZXRlIHRoaXMueWVhcl92YWx1ZTtcblx0XHRcdHRoaXMuaW5wdXRfZGF5LnNldChuZXdfZGF0ZSA/IG5ld19kYXRlLmRheSA6ICcnKTtcblx0XHRcdHRoaXMuaW5wdXRfbW9udGguc2V0KG5ld19kYXRlID8gbmV3X2RhdGUubW9udGggOiAnJyk7XG5cdFx0XHR0aGlzLmlucHV0X3llYXIuc2V0KG5ld19kYXRlID8gbmV3X2RhdGUueWVhciA6ICcnKTtcblx0XHRcdHRoaXMuY2xlYXJFcnJvcigpO1xuXHRcdFx0dGhpcy4kZWxlbWVudC52YWwobmV3X2RhdGUpO1xuXHRcdFx0aWYgKG5ld19kYXRlKSB7XG5cdFx0XHRcdCQuZWFjaCh0aGlzLmZpZWxkcywgZnVuY3Rpb24gKGksIGlucHV0KSB7XG5cdFx0XHRcdFx0ZG9iZmllbGQudmFsaWRhdGUoaW5wdXQpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRzZXRFcnJvcihlcnJvcl90ZXh0KSB7XG5cdFx0XHR0aGlzLmVycm9yX3RleHQgPSBlcnJvcl90ZXh0O1xuXHRcdFx0dGhpcy5zaG93RXJyb3IoKTtcblx0XHR9XG5cblx0XHRzZXRGaWVsZFdpZHRocygpIHtcblx0XHRcdGxldCBhdmFpbGFibGUgPSB0aGlzLiRlbGVtZW50LndpZHRoKCkgLSAyO1xuXHRcdFx0bGV0IHRvdGFsID0gc2V0dGluZ3MuZmllbGRfd2lkdGhfeWVhciArIHNldHRpbmdzLmZpZWxkX3dpZHRoX3NlcCArIHNldHRpbmdzLmZpZWxkX3dpZHRoX21vbnRoICtcblx0XHRcdFx0c2V0dGluZ3MuZmllbGRfd2lkdGhfc2VwICsgc2V0dGluZ3MuZmllbGRfd2lkdGhfZGF5O1xuXHRcdFx0dGhpcy5pbnB1dF9kYXkuc2V0V2lkdGgoTWF0aC5mbG9vcihzZXR0aW5ncy5maWVsZF93aWR0aF9kYXkgKiBhdmFpbGFibGUgLyB0b3RhbCkpO1xuXHRcdFx0dGhpcy5pbnB1dF9tb250aC5zZXRXaWR0aChNYXRoLmZsb29yKHNldHRpbmdzLmZpZWxkX3dpZHRoX21vbnRoICogYXZhaWxhYmxlIC8gdG90YWwpKTtcblx0XHRcdHRoaXMuaW5wdXRfeWVhci5zZXRXaWR0aChNYXRoLmZsb29yKHNldHRpbmdzLmZpZWxkX3dpZHRoX3llYXIgKiBhdmFpbGFibGUgLyB0b3RhbCkpO1xuXHRcdH1cblxuXHRcdHNldFJlYWRvbmx5KG1vZGUpIHtcblx0XHRcdGlmIChtb2RlID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0bW9kZSA9IHRydWU7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLmlucHV0X2RheS5zZXRSZWFkb25seShtb2RlKTtcblx0XHRcdHRoaXMuaW5wdXRfbW9udGguc2V0UmVhZG9ubHkobW9kZSk7XG5cdFx0XHR0aGlzLmlucHV0X3llYXIuc2V0UmVhZG9ubHkobW9kZSk7XG5cdFx0XHRpZiAobW9kZSkge1xuXHRcdFx0XHR0aGlzLndyYXBwZXIuYWRkQ2xhc3MoJ3JlYWRvbmx5Jyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLndyYXBwZXIucmVtb3ZlQ2xhc3MoJ3JlYWRvbmx5Jyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0c2hvd0Vycm9yKCkge1xuXHRcdFx0bGV0IGVycm9yX3RleHQgPSB0aGlzLndpZGdldEVycm9yVGV4dCgpO1xuXHRcdFx0aWYgKHRoaXMub25fZXJyb3IpIHtcblx0XHRcdFx0dGhpcy5vbl9lcnJvcihlcnJvcl90ZXh0KTtcblx0XHRcdH1cblx0XHRcdGlmICghc2V0dGluZ3Muc2hvd19lcnJvcnMpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGVycm9yX3RleHQgPT09ICcnKSB7XG5cdFx0XHRcdHRoaXMuZXJyb3Jib3guaGlkZSgpO1xuXHRcdFx0XHR0aGlzLmVycm9yYm94LnRleHQoJycpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bGV0IHhfb2Zmc2V0ID0gKHRoaXMuaW5uZXIub3V0ZXJXaWR0aCgpICsgc2V0dGluZ3MuZXJyb3Jib3hfeCkgKyAncHgnO1xuXHRcdFx0XHRsZXQgeV9vZmZzZXQgPSBzZXR0aW5ncy5lcnJvcmJveF95ICsgJ3B4Jztcblx0XHRcdFx0dGhpcy5lcnJvcmJveC5jc3Moe2Rpc3BsYXk6ICdibG9jaycsIHBvc2l0aW9uOiAnYWJzb2x1dGUnLCB0b3A6IHlfb2Zmc2V0LCBsZWZ0OiB4X29mZnNldH0pO1xuXHRcdFx0XHR0aGlzLmVycm9yYm94LnRleHQoZXJyb3JfdGV4dCk7XG5cdFx0XHRcdHRoaXMuZXJyb3Jib3guc2hvdygpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHZhbGlkYXRlKGN1cnJlbnRfaW5wdXQpIHtcblx0XHRcdHRoaXMuJGVsZW1lbnQudmFsKCcnKTtcblx0XHRcdGlmIChjdXJyZW50X2lucHV0KSB7XG5cdFx0XHRcdGNvbnN0IHR5cGUgPSBjdXJyZW50X2lucHV0Lm5hbWU7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0aWYgKHR5cGUgPT09ICdkYXknKSB7XG5cdFx0XHRcdFx0XHR0aGlzLnZhbGlkYXRlRGF5KCk7XG5cdFx0XHRcdFx0fSBlbHNlIGlmICh0eXBlID09PSAnbW9udGgnKSB7XG5cdFx0XHRcdFx0XHR0aGlzLnZhbGlkYXRlTW9udGgoKTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHR5cGUgPT09ICd5ZWFyJykge1xuXHRcdFx0XHRcdFx0dGhpcy52YWxpZGF0ZVllYXIoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Y3VycmVudF9pbnB1dC5jbGVhckVycm9yKCk7XG5cdFx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0XHRjdXJyZW50X2lucHV0LnNldEVycm9yKGUpO1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKHRoaXMuZGF5X3ZhbHVlICYmIHRoaXMubW9udGhfdmFsdWUpIHtcblx0XHRcdFx0dGhpcy5jbGVhckVycm9yKCk7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0dGhpcy52YWxpZGF0ZURheXNJbk1vbnRoKCk7XG5cdFx0XHRcdFx0aWYgKHRoaXMueWVhcl92YWx1ZSAmJiB0aGlzLnllYXJfdmFsdWUubGVuZ3RoID09PSA0KSB7XG5cdFx0XHRcdFx0XHR0aGlzLnZhbGlkYXRlQ29tcGxldGVEYXRlKCk7XG5cdFx0XHRcdFx0XHRsZXQgZGF0ZV9zdHIgPSBLckRvYkVudHJ5LmdldFltZE9iamVjdCh0aGlzLmdldERhdGUoKSk7XG5cdFx0XHRcdFx0XHR0aGlzLiRlbGVtZW50LnZhbChkYXRlX3N0cik7XG5cdFx0XHRcdFx0XHRpZiAodGhpcy4kZWxlbWVudC5kYXRhKCdjaGlsZGRvYicpKSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMuY2hlY2tEb2N1bWVudChkYXRlX3N0ciwgdGhpcy4kZWxlbWVudC5kYXRhKCdjaGlsZGRvYicpLCB0aGlzLiRlbGVtZW50LmF0dHIoJ2lkJykpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRcdHRoaXMuc2V0RXJyb3IoZSk7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLmNsZWFyRXJyb3IoKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0dmFsaWRhdGVDb21wbGV0ZURhdGUoKSB7XG5cdFx0XHRjb25zdCBkYXRlX29iaiA9IHRoaXMuZ2V0RGF0ZSgpO1xuXHRcdFx0Y29uc3QgZGF0ZV9pc28gPSBLckRvYkVudHJ5LmdldFltZE9iamVjdChkYXRlX29iaik7XG5cdFx0XHRzZXR0aW5ncy5taW5tYXggPSB0aGlzLiRlbGVtZW50LmRhdGEoJ3ZhbGlkYXRpb24nKTtcblxuXHRcdFx0aWYgKHNldHRpbmdzLm1pbm1heCA9PT0gJ21heCcpIHtcblx0XHRcdFx0aWYgKGRhdGVfaXNvID4gdG9kYXkpIHtcblx0XHRcdFx0XHR0aHJvdyhzZXR0aW5ncy5FX01BWF9EQVRFKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKHNldHRpbmdzLm1pbm1heCA9PT0gJ21pbicpIHtcblx0XHRcdFx0aWYgKGRhdGVfaXNvIDwgdG9kYXkpIHtcblx0XHRcdFx0XHR0aHJvdyhzZXR0aW5ncy5FX01JTl9EQVRFKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBsZXQgbWF4X2RhdGUgPSBzZXR0aW5ncy5tYXhfZGF0ZTtcblx0XHRcdC8vIGlmICh0eXBlb2YgbWF4X2RhdGUgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdC8vIFx0bWF4X2RhdGUgPSBtYXhfZGF0ZS5jYWxsKHRoaXMpO1xuXHRcdFx0Ly8gfVxuXHRcdFx0Ly8gaWYgKHR5cGVvZiBtYXhfZGF0ZSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdC8vIFx0bWF4X2RhdGUgPSB0aGlzLnBhcnNlRGF0ZShtYXhfZGF0ZSk7XG5cdFx0XHQvLyB9XG5cdFx0XHQvLyBpZiAobWF4X2RhdGUpIHtcblx0XHRcdC8vIFx0aWYgKGRhdGVfaXNvID4gc2V0dGluZ3MubWF4X2RhdGUpIHtcblx0XHRcdC8vIFx0XHR0aHJvdyhzZXR0aW5ncy5FX01BWF9EQVRFKTtcblx0XHRcdC8vIFx0fVxuXHRcdFx0Ly8gfVxuXG5cdFx0XHRpZiAodGhpcy5jdXN0b21fdmFsaWRhdGlvbikge1xuXHRcdFx0XHRkYXRlX29iai5kYXRlID0gbmV3IERhdGUoXG5cdFx0XHRcdFx0cGFyc2VJbnQoZGF0ZV9vYmoueWVhciwgMTApLFxuXHRcdFx0XHRcdHBhcnNlSW50KGRhdGVfb2JqLm1vbnRoLCAxMCkgLSAxLFxuXHRcdFx0XHRcdHBhcnNlSW50KGRhdGVfb2JqLmRheSwgMTApXG5cdFx0XHRcdCk7XG5cdFx0XHRcdHRoaXMuY3VzdG9tX3ZhbGlkYXRpb24oZGF0ZV9vYmopO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHZhbGlkYXRlRGF5KCkge1xuXHRcdFx0bGV0IG9wdCA9IHNldHRpbmdzO1xuXHRcdFx0bGV0IGlucHV0ID0gdGhpcy5pbnB1dF9kYXk7XG5cdFx0XHR0aGlzLmRheV92YWx1ZSA9IHVuZGVmaW5lZDtcblx0XHRcdGxldCB0ZXh0ID0gaW5wdXQuZ2V0KCk7XG5cdFx0XHRpZiAodGV4dCA9PT0gJycgfHwgKHRleHQgPT09ICcwJyAmJiBpbnB1dC5oYXNfZm9jdXMpKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdGlmICh0ZXh0Lm1hdGNoKC9cXEQvKSkge1xuXHRcdFx0XHR0aHJvdyhvcHQuRV9EQVlfTkFOKTtcblx0XHRcdH1cblx0XHRcdGxldCBudW0gPSBwYXJzZUludCh0ZXh0LCAxMCk7XG5cdFx0XHRpZiAobnVtIDwgMSkge1xuXHRcdFx0XHR0aHJvdyhvcHQuRV9EQVlfVE9PX1NNQUxMKTtcblx0XHRcdH1cblx0XHRcdGlmIChudW0gPiAzMSkge1xuXHRcdFx0XHR0aHJvdyhvcHQuRV9EQVlfVE9PX0JJRyk7XG5cdFx0XHR9XG5cdFx0XHR0ZXh0ID0gbnVtIDwgMTAgPyAnMCcgKyBudW0gOiAnJyArIG51bTtcblx0XHRcdGlmICghaW5wdXQuaGFzX2ZvY3VzKSB7XG5cdFx0XHRcdGlucHV0LnNldCh0ZXh0KTtcblx0XHRcdH1cblx0XHRcdHRoaXMuZGF5X3ZhbHVlID0gdGV4dDtcblx0XHR9XG5cblx0XHR2YWxpZGF0ZURheXNJbk1vbnRoKCkge1xuXHRcdFx0Y29uc3QgZGF5ID0gcGFyc2VJbnQodGhpcy5kYXlfdmFsdWUsIDEwKTtcblx0XHRcdGNvbnN0IG1vbnRoID0gcGFyc2VJbnQodGhpcy5tb250aF92YWx1ZSwgMTApO1xuXHRcdFx0Y29uc3QgeWVhciA9IHBhcnNlSW50KHRoaXMueWVhcl92YWx1ZSwgMTApO1xuXHRcdFx0aWYgKGRheSA8IDEgfHwgbW9udGggPCAxKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdGxldCBtYXggPSBzZXR0aW5ncy5kYXlzX2luX21vbnRoW21vbnRoIC0gMV07XG5cdFx0XHRsZXQgbXNnID0gc2V0dGluZ3MuRV9CQURfREFZX0ZPUl9NT05USDtcblx0XHRcdGlmIChtb250aCA9PT0gMiAmJiAoJycgKyB5ZWFyKS5sZW5ndGggPT09IDQpIHtcblx0XHRcdFx0bWF4ID0geWVhciAlIDQgPyAyOCA6IHllYXIgJSAxMDAgPyAyOSA6IHllYXIgJSA0MDAgPyAyOCA6IDI5O1xuXHRcdFx0XHRtc2cgPSBtc2cucmVwbGFjZSgvJXkvLCB5ZWFyLnRvU3RyaW5nKCkpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bXNnID0gbXNnLnJlcGxhY2UoLyAqJXkvLCAnJyk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoZGF5ID4gbWF4KSB7XG5cdFx0XHRcdHRocm93KG1zZy5yZXBsYWNlKC8lZC8sIG1heC50b1N0cmluZygpKS5yZXBsYWNlKC8lbS8sIHNldHRpbmdzLm1vbnRoX25hbWVbbW9udGggLSAxXSkpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHZhbGlkYXRlTW9udGgoKSB7XG5cdFx0XHRsZXQgaW5wdXQgPSB0aGlzLmlucHV0X21vbnRoO1xuXHRcdFx0dGhpcy5tb250aF92YWx1ZSA9IHVuZGVmaW5lZDtcblx0XHRcdGxldCB0ZXh0ID0gaW5wdXQuZ2V0KCk7XG5cdFx0XHRpZiAodGV4dCA9PT0gJycgfHwgKHRleHQgPT09ICcwJyAmJiBpbnB1dC5oYXNfZm9jdXMpKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdGlmICh0ZXh0Lm1hdGNoKC9cXEQvKSkge1xuXHRcdFx0XHR0aHJvdyhzZXR0aW5ncy5FX01PTlRIX05BTik7XG5cdFx0XHR9XG5cdFx0XHRsZXQgbnVtID0gcGFyc2VJbnQodGV4dCwgMTApO1xuXHRcdFx0aWYgKG51bSA8IDEpIHtcblx0XHRcdFx0dGhyb3coc2V0dGluZ3MuRV9NT05USF9UT09fU01BTEwpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKG51bSA+IDEyKSB7XG5cdFx0XHRcdHRocm93KHNldHRpbmdzLkVfTU9OVEhfVE9PX0JJRyk7XG5cdFx0XHR9XG5cdFx0XHR0ZXh0ID0gbnVtIDwgMTAgPyAnMCcgKyBudW0gOiAnJyArIG51bTtcblx0XHRcdGlmICghaW5wdXQuaGFzX2ZvY3VzKSB7XG5cdFx0XHRcdGlucHV0LnNldCh0ZXh0KTtcblx0XHRcdH1cblx0XHRcdHRoaXMubW9udGhfdmFsdWUgPSB0ZXh0O1xuXHRcdH1cblxuXHRcdHZhbGlkYXRlWWVhcigpIHtcblx0XHRcdGNvbnN0IGlucHV0ID0gdGhpcy5pbnB1dF95ZWFyO1xuXHRcdFx0dGhpcy55ZWFyX3ZhbHVlID0gdW5kZWZpbmVkO1xuXHRcdFx0bGV0IHRleHQgPSBpbnB1dC5nZXQoKTtcblx0XHRcdGlmICh0ZXh0ID09PSAnJyB8fCAodGV4dCA9PT0gJzAnICYmIGlucHV0Lmhhc19mb2N1cykpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHRleHQubWF0Y2goL1xcRC8pKSB7XG5cdFx0XHRcdHRocm93KHNldHRpbmdzLkVfWUVBUl9OQU4pO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGlucHV0Lmhhc19mb2N1cykge1xuXHRcdFx0XHRpZiAodGV4dC5sZW5ndGggPiA0KSB7XG5cdFx0XHRcdFx0dGhyb3coc2V0dGluZ3MuRV9ZRUFSX0xFTkdUSCk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmICh0ZXh0Lmxlbmd0aCAhPT0gNCkge1xuXHRcdFx0XHRcdHRocm93KHNldHRpbmdzLkVfWUVBUl9MRU5HVEgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAodGV4dC5sZW5ndGggPT09IDQpIHtcblx0XHRcdFx0Y29uc3QgbnVtID0gcGFyc2VJbnQodGV4dCwgMTApO1xuXHRcdFx0XHRpZiAoc2V0dGluZ3MubWluX3llYXIgJiYgbnVtIDwgc2V0dGluZ3MubWluX3llYXIpIHtcblx0XHRcdFx0XHR0aHJvdyhzZXR0aW5ncy5FX1lFQVJfVE9PX1NNQUxMLnJlcGxhY2UoLyV5Lywgc2V0dGluZ3MubWluX3llYXIpKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0dGhpcy55ZWFyX3ZhbHVlID0gdGV4dDtcblx0XHR9XG5cblx0XHR3aWRnZXRFcnJvclRleHQoKSB7XG5cdFx0XHRsZXQgZXJyb3JfdGV4dCA9ICcnO1xuXHRcdFx0JC5lYWNoKHRoaXMuZmllbGRzLCBmdW5jdGlvbiAoaSwgaW5wdXQpIHtcblx0XHRcdFx0aWYgKGlucHV0LmVycm9yX3RleHQpIHtcblx0XHRcdFx0XHRpZiAoaW5wdXQuaGFzX2ZvY3VzIHx8IGVycm9yX3RleHQgPT09ICcnKSB7XG5cdFx0XHRcdFx0XHRlcnJvcl90ZXh0ID0gaW5wdXQuZXJyb3JfdGV4dFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRpZiAoZXJyb3JfdGV4dCA9PT0gJycgJiYgdGhpcy5lcnJvcl90ZXh0KSB7XG5cdFx0XHRcdGVycm9yX3RleHQgPSB0aGlzLmVycm9yX3RleHQ7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZXJyb3JfdGV4dDtcblx0XHR9XG5cblx0XHR3aWRnZXRGb2N1c0xvc3QoKSB7XG5cdFx0XHRpZiAoc2V0dGluZ3Mub25fYmx1ciAmJiAhdGhpcy53cmFwcGVyLmlzKCcuZm9jdXMnKSkge1xuXHRcdFx0XHRzZXR0aW5ncy5vbkJsdXIoKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRjbGFzcyBLckRvYklucHV0IHtcblx0XHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG5cdFx0XHRjb25zdCBpbnB1dCA9IHRoaXM7XG5cdFx0XHR0aGlzLmRvYmZpZWxkID0gb3B0aW9ucy5rcmRvYmVudHJ5O1xuXHRcdFx0dGhpcy5uYW1lID0gb3B0aW9ucy5uYW1lO1xuXHRcdFx0dGhpcy5pbmRleCA9IG9wdGlvbnMuaW5kZXg7XG5cdFx0XHR0aGlzLmhpbnRfdGV4dCA9IG9wdGlvbnMuaGludF90ZXh0O1xuXHRcdFx0dGhpcy5oYXNfZm9jdXMgPSBmYWxzZTtcblx0XHRcdHRoaXMuZW1wdHkgPSB0cnVlO1xuXHRcdFx0dGhpcy4kaW5wdXQgPSAkKCc8aW5wdXQgdHlwZT1cInRleHRcIiB2YWx1ZT1cIlwiIC8+JykuYWRkQ2xhc3MoJ2pxLWR0ZS0nICsgdGhpcy5uYW1lKS5hdHRyKCdhcmlhLWxhYmVsJywgJycgKyBcIiAoXCIgKyB0aGlzLmhpbnRfdGV4dCArIFwiKVwiKS5mb2N1cygkLnByb3h5KGlucHV0LCAnZm9jdXMnKSkuYmx1cigkLnByb3h5KGlucHV0LCAnYmx1cicpKS5rZXlkb3duKGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdGlucHV0LmtleWRvd24oZSk7XG5cdFx0XHRcdH0sIDIpXG5cdFx0XHR9KS5rZXl1cChmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRpbnB1dC5rZXl1cChlKTtcblx0XHRcdFx0fSwgMilcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGJsdXIoKSB7XG5cdFx0XHR0aGlzLmhhc19mb2N1cyA9IGZhbHNlO1xuXHRcdFx0dGhpcy5kb2JmaWVsZC5mb2N1c091dCgpO1xuXHRcdFx0dGhpcy5zaG93X2hpbnQoKTtcblx0XHRcdHRoaXMuZG9iZmllbGQudmFsaWRhdGUodGhpcyk7XG5cdFx0fVxuXG5cdFx0Y2xlYXJFcnJvcigpIHtcblx0XHRcdGRlbGV0ZSB0aGlzLmVycm9yX3RleHQ7XG5cdFx0XHR0aGlzLiRpbnB1dC5yZW1vdmVDbGFzcygnZXJyb3InKTtcblx0XHR9XG5cblx0XHRmb2N1cygpIHtcblx0XHRcdHRoaXMua2V5X2lzX2Rvd24gPSBmYWxzZTtcblx0XHRcdGlmICh0aGlzLiRpbnB1dC5wcm9wKCdyZWFkb25seScpKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdHRoaXMuaGFzX2ZvY3VzID0gdHJ1ZTtcblx0XHRcdHRoaXMuZG9iZmllbGQuZm9jdXNJbigpO1xuXHRcdFx0aWYgKHRoaXMuJGlucHV0Lmhhc0NsYXNzKCdoaW50JykpIHtcblx0XHRcdFx0dGhpcy4kaW5wdXQudmFsKCcnKS5yZW1vdmVDbGFzcygnaGludCcpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5kb2JmaWVsZC5zaG93RXJyb3IoKTtcblx0XHR9XG5cblx0XHRnZXQoKSB7XG5cdFx0XHRsZXQgdmFsID0gdGhpcy4kaW5wdXQudmFsKCk7XG5cdFx0XHRyZXR1cm4gdmFsID09PSB0aGlzLmhpbnRfdGV4dCA/ICcnIDogdmFsO1xuXHRcdH1cblxuXHRcdGlzRGlnaXRLZXkoZSkge1xuXHRcdFx0bGV0IGtleWNvZGUgPSBlLndoaWNoO1xuXHRcdFx0cmV0dXJuIGtleWNvZGUgPj0gNDggJiYga2V5Y29kZSA8PSA1NyB8fCBrZXljb2RlID49IDk2ICYmIGtleWNvZGUgPD0gMTA1O1xuXHRcdH1cblxuXHRcdGtleWRvd24oKSB7XG5cdFx0XHQvLyBJZ25vcmUga2V5dXAgZXZlbnRzIHRoYXQgYXJyaXZlIGFmdGVyIGZvY3VzIG1vdmVkIHRvIG5leHQgZmllbGRcblx0XHRcdHRoaXMua2V5X2lzX2Rvd24gPSB0cnVlO1xuXHRcdH1cblxuXHRcdGtleXVwKGUpIHtcblx0XHRcdGlmICghdGhpcy5rZXlfaXNfZG93bikge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHQvLyBIYW5kbGUgQmFja3NwYWNlIC0gc2hpZnRpbmcgZm9jdXMgdG8gcHJldmlvdXMgZmllbGQgaWYgcmVxdWlyZWRcblx0XHRcdGxldCBrZXljb2RlID0gZS53aGljaDtcblx0XHRcdGlmIChrZXljb2RlID09PSBrZXkuQkFDS1NQQUNFICYmIHRoaXMuZW1wdHkpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuZG9iZmllbGQuZm9jdXNGaWVsZEJlZm9yZSh0aGlzKTtcblx0XHRcdH1cblx0XHRcdGxldCB0ZXh0ID0gdGhpcy5nZXQoKTtcblx0XHRcdHRoaXMuZW1wdHkgPSB0ZXh0ID09PSAnJztcblxuXHRcdFx0Ly8gVHJhcCBhbmQgZGlzY2FyZCBzZXBhcmF0b3IgY2hhcmFjdGVycyAtIGFkdmFuY2luZyBmb2N1cyBpZiByZXF1aXJlZFxuXHRcdFx0aWYgKHRleHQubWF0Y2goL1tcXC9cXFxcLiAtXS8pKSB7XG5cdFx0XHRcdHRleHQgPSB0ZXh0LnJlcGxhY2UoL1tcXC9cXFxcLiAtXS8sICcnKTtcblx0XHRcdFx0dGhpcy5zZXQodGV4dCk7XG5cdFx0XHRcdGlmICghdGhpcy5lbXB0eSAmJiB0aGlzLmluZGV4IDwgMikge1xuXHRcdFx0XHRcdHRoaXMuZG9iZmllbGQuZm9jdXNGaWVsZEFmdGVyKHRoaXMpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIEFkdmFuY2UgZm9jdXMgaWYgdGhpcyBmaWVsZCBpcyBib3RoIHZhbGlkIGFuZCBmdWxsXG5cdFx0XHRpZiAodGhpcy5kb2JmaWVsZC52YWxpZGF0ZSh0aGlzKSkge1xuXHRcdFx0XHRsZXQgd2FudCA9IHRoaXMubmFtZSA9PT0gJ3llYXInID8gNCA6IDI7XG5cdFx0XHRcdGlmICh0aGlzLmlzRGlnaXRLZXkoZSkgJiYgdGV4dC5sZW5ndGggPT09IHdhbnQpIHtcblx0XHRcdFx0XHR0aGlzLmRvYmZpZWxkLmZvY3VzRmllbGRBZnRlcih0aGlzKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGxlZnQoKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy4kaW5wdXQucG9zaXRpb24oKS5sZWZ0O1xuXHRcdH1cblxuXHRcdHNldChuZXdfdmFsdWUpIHtcblx0XHRcdHRoaXMuJGlucHV0LnZhbChuZXdfdmFsdWUpLnJlbW92ZUNsYXNzKCdoaW50Jyk7XG5cdFx0XHRpZiAoIXRoaXMuaGFzX2ZvY3VzKSB7XG5cdFx0XHRcdHRoaXMuc2hvd19oaW50KCk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLmVtcHR5ID0gbmV3X3ZhbHVlID09PSAnJztcblx0XHRcdHRoaXMuY2xlYXJFcnJvcigpO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fVxuXG5cdFx0c2V0RXJyb3IodGV4dCkge1xuXHRcdFx0dGhpcy5lcnJvcl90ZXh0ID0gdGV4dDtcblx0XHRcdHRoaXMuJGlucHV0LmFkZENsYXNzKCdlcnJvcicpO1xuXHRcdFx0dGhpcy5kb2JmaWVsZC5zaG93RXJyb3IoKTtcblx0XHR9XG5cblx0XHRzZXRGb2N1cyhzZWxlY3RfYWxsKSB7XG5cdFx0XHRsZXQgJGlucHV0ID0gdGhpcy4kaW5wdXQ7XG5cdFx0XHQkaW5wdXQuZm9jdXMoKTtcblx0XHRcdGlmIChzZWxlY3RfYWxsKSB7XG5cdFx0XHRcdCRpbnB1dC5zZWxlY3QoKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdCRpbnB1dC52YWwoJGlucHV0LnZhbCgpKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH1cblxuXHRcdHNldFdpZHRoKG5ld193aWR0aCkge1xuXHRcdFx0dGhpcy4kaW5wdXQud2lkdGgobmV3X3dpZHRoKTtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH1cblxuXHRcdHNob3dfaGludCgpIHtcblx0XHRcdGlmICh0aGlzLmdldCgpID09PSAnJyAmJiB0eXBlb2YgKHRoaXMuaGludF90ZXh0KSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdFx0dGhpcy4kaW5wdXQudmFsKHRoaXMuaGludF90ZXh0KS5hZGRDbGFzcygnaGludCcpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fVxuXG5cdFx0eWllbGRGb2N1cygpIHtcblx0XHRcdHRoaXMuJGlucHV0LmJsdXIoKTtcblx0XHR9XG5cdH1cblxuXHQkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG5cdFx0JCgnLmRvYmlzc3VlJykuZWFjaChmdW5jdGlvbiAoKSB7XG5cdFx0XHRteUtyRG9iRW50cnkgPSBuZXcgS3JEb2JFbnRyeSgkKHRoaXMpLCB7fSk7XG5cdFx0fSk7XG5cdH0pO1xufShqUXVlcnkpKTsiLCIvLyBub2luc3BlY3Rpb24gRHVwbGljYXRlZENvZGVcblxuLyoqXG4gKiBAcGFja2FnZSAgICBLbm93IFJlc2VydmF0aW9uc1xuICogQHN1YnBhY2thZ2UgQWRtaW4gSlNcbiAqIEBjb3B5cmlnaHQgIDIwMjAgSGlnaGxhbmQgVmlzaW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogQGxpY2Vuc2UgICAgU2VlIHRoZSBmaWxlIFwiTElDRU5TRS50eHRcIiBmb3IgdGhlIGZ1bGwgbGljZW5zZSBnb3Zlcm5pbmcgdGhpcyBjb2RlLlxuICogQGF1dGhvciAgICAgSGF6ZWwgV2lsc29uIDxoYXplbEBoaWdobGFuZHZpc2lvbi5jb20+XG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoJCkge1xuXHQkKGZ1bmN0aW9uICgpIHtcblx0XHRpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hvd3RvYXJyaXZlJykpIHtcblx0XHRcdGNvbnN0IGhvd3RvYXJyaXZlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hvd3RvYXJyaXZlJyk7XG5cdFx0XHRsZXQgYXJyaXZhbG1lYW5zID0gaG93dG9hcnJpdmUuZ2V0QXR0cmlidXRlKCdkYXRhLW1lYW5zJyk7XG5cdFx0XHRpZiAoIWFycml2YWxtZWFucykge1xuXHRcdFx0XHRhcnJpdmFsbWVhbnMgPSAnYWlyJztcblx0XHRcdH1cblx0XHRcdGRpc3BsYXlBcnJpdmFsKGFycml2YWxtZWFucyk7XG5cdFx0fVxuXG5cdFx0JCgnYm9keScpLm9uKCdjbGljaycsICcuYW1pdGVtJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGRpc3BsYXlBcnJpdmFsKCQodGhpcykuYXR0cignaWQnKSk7XG5cdFx0fSk7XG5cdH0pO1xuXG5cdGZ1bmN0aW9uIGRpc3BsYXlBcnJpdmFsKHZhbHVlKSB7XG5cdFx0bGV0IHggPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhbWl0ZW0nKTtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHgubGVuZ3RoOyBpKyspIHtcblx0XHRcdHhbaV0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG5cdFx0fVxuXG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Fpci1kYXRhJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndHJhaW4tZGF0YScpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2F1dG8tZGF0YScpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ290aGVyLWRhdGEnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXHRcdGxldCBhcnJpdmFsZGF0YSA9IHZhbHVlICsgJy1kYXRhJztcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZChhcnJpdmFsZGF0YSkuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodmFsdWUpLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqZm9ybV9hcnJpdmFsX21lYW5zJykudmFsdWUgPSB2YWx1ZTtcblx0fVxufSkoalF1ZXJ5KTsiLCIvKipcbiAqIEBwYWNrYWdlICAgIEtub3cgUmVzZXJ2YXRpb25zXG4gKiBAc3VicGFja2FnZSBTaXRlIEpTXG4gKiBAY29weXJpZ2h0ICAyMDIwIEhpZ2hsYW5kIFZpc2lvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIEBsaWNlbnNlICAgIFNlZSB0aGUgZmlsZSBcIkxJQ0VOU0UudHh0XCIgZm9yIHRoZSBmdWxsIGxpY2Vuc2UgZ292ZXJuaW5nIHRoaXMgY29kZS5cbiAqIEBhdXRob3IgICAgIEhhemVsIFdpbHNvbiA8aGF6ZWxAaGlnaGxhbmR2aXNpb24uY29tPlxuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG5sZXQgb3ZDaGlsZHJlbiwgb3ZTdGF0ZSA9IG51bGwsIG92UHMgPSAwLCAkb3ZCdG47XG5sZXQgZmNDaGlsZHJlbiwgZmNTdGF0ZSA9IG51bGwsICRmY0J0bjtcbmxldCB0dENoaWxkcmVuLCB0dFN0YXRlID0gbnVsbCwgdHRQcyA9IDAsICR0dEJ0biwgdHRwYXJhcztcbmxldCBjdXJyZW50UGFyYWdyYXBoLCBockVsZW1lbnQ7XG5cbihmdW5jdGlvbiAoJCkge1xuICAgICQoZnVuY3Rpb24gKCkge1xuICAgICAgICBvdkNoaWxkcmVuID0gJCgnLnJlYWRtb3JlLW92ZXJ2aWV3JykuY2hpbGRyZW4oJ3AnKTtcbiAgICAgICAgb3ZQcyA9IG92Q2hpbGRyZW4ubGVuZ3RoO1xuICAgICAgICBpZiAob3ZQcyA+IDUpIHtcbiAgICAgICAgICAgIG92Q2hpbGRyZW4uc2xpY2UoNikuaGlkZSgpO1xuICAgICAgICAgICAgb3ZDaGlsZHJlbi5zbGljZShvdlBzIC0gMSwgb3ZQcykuYWZ0ZXIoJzxhIGNsYXNzPVwiYnV0dG9uIGhvbGxvdycgK1xuICAgICAgICAgICAgICAgICcgYWNjZW50IHJlYWRtb3JlIG92ZXJ2aWV3LXRvZ2dsZVwiPlJlYWQgbW9yZS4uLjwvYT4nKTtcbiAgICAgICAgICAgIG92U3RhdGUgPSAnaGlkZGVuJztcbiAgICAgICAgfVxuXG4gICAgICAgIHR0Q2hpbGRyZW4gPSAkKCcucmVhZG1vcmUtdGVzdGltb25pYWxzJykuY2hpbGRyZW4oJ3AnKTtcbiAgICAgICAgdHRQcyA9IHR0Q2hpbGRyZW4ubGVuZ3RoO1xuICAgICAgICBpZiAodHRQcyA+IDEwKSB7XG4gICAgICAgICAgICB0dENoaWxkcmVuLnNsaWNlKDExKS5oaWRlKCk7XG4gICAgICAgICAgICB0dHBhcmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnJlYWRtb3JlLXRlc3RpbW9uaWFscyBwW3N0eWxlKj1cImRpc3BsYXk6IG5vbmVcIl0nKTtcbiAgICAgICAgICAgIGRvSFJzKHR0cGFyYXMsICdoaWRlJyk7XG4gICAgICAgICAgICB0dENoaWxkcmVuLnNsaWNlKHR0UHMgLSAxLCB0dFBzKS5hZnRlcignPGEgY2xhc3M9XCJidXR0b24gaG9sbG93JyArXG4gICAgICAgICAgICAgICAgJyBhY2NlbnQgcmVhZG1vcmUgdGVzdGltb25pYWxzLXRvZ2dsZVwiPlJlYWQgbW9yZS4uLjwvYT4nKTtcbiAgICAgICAgICAgIHR0U3RhdGUgPSAnaGlkZGVuJztcbiAgICAgICAgfVxuXG4gICAgICAgIGZjQ2hpbGRyZW4gPSAkKCcucmVhZG1vcmUtZmFjaWxpdGllcycpLmNoaWxkcmVuKCcucm9vbXMnKTtcbiAgICAgICAgaWYgKGZjQ2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICAgICAgICBmY0NoaWxkcmVuLmhpZGUoKS5hZnRlcignPGEgY2xhc3M9XCJidXR0b24gaG9sbG93JyArXG4gICAgICAgICAgICAgICAgJyBhY2NlbnQgcmVhZG1vcmUgZmFjaWxpdGllcy10b2dnbGVcIj5TZWUgYWxsIGZhY2lsaXRpZXMuLi48L2E+Jyk7XG4gICAgICAgICAgICBmY1N0YXRlID0gJ2hpZGRlbic7XG4gICAgICAgIH1cblxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLnJlYWRtb3JlLm92ZXJ2aWV3LXRvZ2dsZScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAkb3ZCdG4gPSAkKFwiLm92ZXJ2aWV3LXRvZ2dsZVwiKTtcbiAgICAgICAgICAgIGlmIChvdlN0YXRlID09PSAndmlzaWJsZScpIHtcbiAgICAgICAgICAgICAgICBvdkNoaWxkcmVuLnNsaWNlKDYpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAkb3ZCdG4uYXR0cigndmFsdWUnLCAnUmVhZCBtb3JlJyk7XG4gICAgICAgICAgICAgICAgJG92QnRuLnRleHQoXCJSZWFkIG1vcmUuLi5cIik7XG4gICAgICAgICAgICAgICAgb3ZTdGF0ZSA9ICdoaWRkZW4nO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChvdlN0YXRlID09PSAnaGlkZGVuJykge1xuICAgICAgICAgICAgICAgICQoJy5yZWFkbW9yZS1vdmVydmlldyBwJykuc2hvdygpO1xuICAgICAgICAgICAgICAgICRvdkJ0bi5hdHRyKCd2YWx1ZScsICdSZWFkIGxlc3MnKTtcbiAgICAgICAgICAgICAgICAkb3ZCdG4udGV4dChcIlJlYWQgbGVzcy4uLlwiKTtcbiAgICAgICAgICAgICAgICBvdlN0YXRlID0gJ3Zpc2libGUnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJCgnLnByb3BlcnR5LW1lbnUnKS5mb3VuZGF0aW9uKCdjYWxjUG9pbnRzJyk7XG4gICAgICAgICAgICAkKCcuc3RpY2t5JykuZm91bmRhdGlvbignX2NhbGMnLCB0cnVlKTtcbiAgICAgICAgfSkub24oJ2NsaWNrJywgJy5yZWFkbW9yZS50ZXN0aW1vbmlhbHMtdG9nZ2xlJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICR0dEJ0biA9ICQoXCIudGVzdGltb25pYWxzLXRvZ2dsZVwiKTtcbiAgICAgICAgICAgIGlmICh0dFN0YXRlID09PSAndmlzaWJsZScpIHtcbiAgICAgICAgICAgICAgICB0dENoaWxkcmVuLnNsaWNlKDExKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgZG9IUnModHRwYXJhcywgJ2hpZGUnKTtcbiAgICAgICAgICAgICAgICAkdHRCdG4uYXR0cigndmFsdWUnLCAnUmVhZCBtb3JlJyk7XG4gICAgICAgICAgICAgICAgJHR0QnRuLnRleHQoXCJSZWFkIG1vcmUuLi5cIik7XG4gICAgICAgICAgICAgICAgdHRTdGF0ZSA9ICdoaWRkZW4nO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0dFN0YXRlID09PSAnaGlkZGVuJykge1xuICAgICAgICAgICAgICAgICQoJy5yZWFkbW9yZS10ZXN0aW1vbmlhbHMgcCcpLnNob3coKTtcbiAgICAgICAgICAgICAgICBkb0hScyh0dHBhcmFzLCAnc2hvdycpO1xuICAgICAgICAgICAgICAgICR0dEJ0bi5hdHRyKCd2YWx1ZScsICdSZWFkIGxlc3MnKTtcbiAgICAgICAgICAgICAgICAkdHRCdG4udGV4dChcIlJlYWQgbGVzcy4uLlwiKTtcbiAgICAgICAgICAgICAgICB0dFN0YXRlID0gJ3Zpc2libGUnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJCgnLnByb3BlcnR5LW1lbnUnKS5mb3VuZGF0aW9uKCdjYWxjUG9pbnRzJyk7XG4gICAgICAgICAgICAkKCcuc3RpY2t5JykuZm91bmRhdGlvbignX2NhbGMnLCB0cnVlKTtcbiAgICAgICAgfSkub24oJ2NsaWNrJywgJy5yZWFkbW9yZS5mYWNpbGl0aWVzLXRvZ2dsZScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAkZmNCdG4gPSAkKFwiLmZhY2lsaXRpZXMtdG9nZ2xlXCIpO1xuICAgICAgICAgICAgaWYgKGZjU3RhdGUgPT09ICd2aXNpYmxlJykge1xuICAgICAgICAgICAgICAgICQoJy5yZWFkbW9yZS1mYWNpbGl0aWVzIC5yb29tcycpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAkZmNCdG4uYXR0cigndmFsdWUnLCAnU2VlIGFsbCBmYWNpbGl0aWVzJyk7XG4gICAgICAgICAgICAgICAgJGZjQnRuLnRleHQoXCJTZWUgYWxsIGZhY2lsaXRpZXMuLi5cIik7XG4gICAgICAgICAgICAgICAgZmNTdGF0ZSA9ICdoaWRkZW4nO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChmY1N0YXRlID09PSAnaGlkZGVuJykge1xuICAgICAgICAgICAgICAgICQoJy5yZWFkbW9yZS1mYWNpbGl0aWVzIC5yb29tcycpLnNob3coKTtcbiAgICAgICAgICAgICAgICAkZmNCdG4uYXR0cigndmFsdWUnLCAnSGlkZSBhbGwgZmFjaWxpdGllcycpO1xuICAgICAgICAgICAgICAgICRmY0J0bi50ZXh0KFwiSGlkZSBhbGwgZmFjaWxpdGllcy4uLlwiKTtcbiAgICAgICAgICAgICAgICBmY1N0YXRlID0gJ3Zpc2libGUnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJCgnLnByb3BlcnR5LW1lbnUnKS5mb3VuZGF0aW9uKCdjYWxjUG9pbnRzJyk7XG4gICAgICAgICAgICAkKCcuc3RpY2t5JykuZm91bmRhdGlvbignX2NhbGMnLCB0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KGpRdWVyeSkpO1xuXG5mdW5jdGlvbiBkb0hScyhwYXJhZ3JhcGhzLCB0eXBlKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXJhZ3JhcGhzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGN1cnJlbnRQYXJhZ3JhcGggPSBwYXJhZ3JhcGhzW2ldO1xuICAgICAgICBockVsZW1lbnQgPSBjdXJyZW50UGFyYWdyYXBoLm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgaWYgKGhyRWxlbWVudCAmJiBockVsZW1lbnQudGFnTmFtZSA9PT0gJ0hSJykge1xuICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdoaWRlJylcbiAgICAgICAgICAgICAgICBockVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBockVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIH1cbiAgICB9XG59IiwiLyoqXG4gKiBAcGFja2FnZSAgICBLbm93IFJlc2VydmF0aW9uc1xuICogQHN1YnBhY2thZ2UgU2l0ZSBKU1xuICogQGNvcHlyaWdodCAgMjAyMCBIaWdobGFuZCBWaXNpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBAbGljZW5zZSAgICBTZWUgdGhlIGZpbGUgXCJMSUNFTlNFLnR4dFwiIGZvciB0aGUgZnVsbCBsaWNlbnNlIGdvdmVybmluZyB0aGlzIGNvZGUuXG4gKiBAYXV0aG9yICAgICBIYXplbCBXaWxzb24gPGhhemVsQGhpZ2hsYW5kdmlzaW9uLmNvbT5cbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxuY29uc3QgbGFuZyA9IFwiZW5cIjtcblxuKGZ1bmN0aW9uICgkKSB7XG5cdGNvbnN0IG1hcmtlcnNoYXBlID0ge1xuXHRcdHR5cGU6ICAgJ3BvbHknLFxuXHRcdGNvb3JkczogWzEsIDEsIDEsIDMyLCAzNywgMzIsIDMyLCAxXVxuXHR9O1xuXG5cdGxldCBteUtybWFwO1xuXHRsZXQgbWFwRGF0YSA9IGZhbHNlO1xuXHRsZXQgbWFwO1xuXHRsZXQgbWFwWm9vbTtcblx0bGV0IGluZm9XaW5kb3c7XG5cdGxldCBpbmZvV2luZG93Mjtcblx0bGV0IGJvdW5kcztcblx0bGV0IHByb3BlcnR5ZGl2O1xuXHRsZXQgcHJvcGVydHlpY29uO1xuXHRsZXQgbWM7XG4vL1x0bGV0IGJpY29uO1xuLy9cdGxldCBoaWNvbjtcbi8vXHRsZXQgbGFyZ2Vfc2xpZGVzaG93ID0gZmFsc2U7XG5cblx0bGV0IHNldHRpbmdzID0ge1xuXHRcdHByb3BlcnR5TWFya2VyczogW10sXG5cdFx0ZmlsdGVySWRzOiAgICAgICBbXSxcblx0XHRtYXBNYXJrZXJzOiAgICAgIFtdLFxuXHRcdG1hcFR5cGVJZDogICAgICAgJycsXG5cdFx0bWFwWm9vbTogICAgICAgICAwLFxuXHQgICAgbWFwTWF4Wm9vbTogICAgICAyMCxcblx0XHRtYXBUeXBlOiAgICAgICAgICcnLFxuXHRcdG1hcElkOiAgICAgICAgICAgJycsXG5cdFx0bWFya2VyQ29sb3I6ICAgICAncmVkJyxcblx0fTtcblxuXHRjbGFzcyBLcm1hcCB7XG5cdFx0Y29uc3RydWN0b3Ioc2V0dGluZ3MpIHtcblx0XHRcdHRoaXMuc2V0dGluZ3MgPSBzZXR0aW5ncztcblxuXHRcdFx0Ly9Jbml0aWFsaXNlIG1hcCBvcHRpb25zXG5cdFx0XHR0aGlzLmdtT3B0aW9ucyA9IHtcblx0XHRcdFx0c2Nyb2xsd2hlZWw6ICAgICAgIGZhbHNlLFxuXHRcdFx0XHR6b29tOiAgICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5tYXBab29tLFxuXHRcdFx0XHRtYXhab29tOiAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5tYXBNYXhab29tLFxuXHRcdFx0XHRtYXBUeXBlSWQ6ICAgICAgICAgdGhpcy5zZXR0aW5ncy5tYXBUeXBlSWQsXG5cdFx0XHRcdHN0cmVldFZpZXdDb250cm9sOiBmYWxzZVxuXHRcdFx0fTtcblxuXHRcdFx0bWFwWm9vbSA9IHRoaXMuc2V0dGluZ3MubWFwWm9vbTtcblx0XHRcdHRoaXMuZ21hcmtlcnMgPSBbXTtcblx0XHRcdHRoaXMuY291bnQgPSAwO1xuXG5cdFx0XHR0aGlzLmluaXRNYXAoKTtcblx0XHR9XG5cblx0XHRzdGF0aWMgY2xvc2VLckluZm93aW5kb3coKSB7XG5cdFx0XHQkKCcja3ItaW5mb3dpbmRvdycpLmhpZGUoKTtcblx0XHRcdGluZm9XaW5kb3cuY2xvc2UoKTtcblx0XHRcdGluZm9XaW5kb3cyLmNsb3NlKCk7XG5cdFx0fVxuXG5cdFx0Ly8gb25seSBzaG93IHZpc2libGUgbWFya2Vyc1xuXHRcdHN0YXRpYyBzaG93VmlzaWJsZU1hcmtlcnMobWFya2Vycykge1xuXHRcdFx0bGV0IGJvdW5kcyA9IG1hcC5nZXRCb3VuZHMoKTtcblx0XHRcdGxldCBjb3VudCA9IDA7XG5cblx0XHRcdGZvciAobGV0IGQgPSAwOyBkIDwgbWFya2Vycy5sZW5ndGg7IGQrKykge1xuXHRcdFx0XHRsZXQgbWFya2VyID0gbWFya2Vyc1tkXTtcblxuXHRcdFx0XHRpZiAobWFya2VyLnR5cGUgPT09ICdtYXAnKSB7XG5cdFx0XHRcdFx0aWYgKGJvdW5kcy5jb250YWlucyhtYXJrZXIuZ2V0UG9zaXRpb24oKSkgPT09IHRydWUpIHtcblx0XHRcdFx0XHRcdG1hcmtlci5zZXRWaXNpYmxlKHRydWUpO1xuXHRcdFx0XHRcdFx0Y291bnQrKztcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0bWFya2VyLnNldFZpc2libGUoZmFsc2UpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gY291bnQ7XG5cdFx0fVxuXG5cdFx0Ly8gQ2hlY2sgTWFya2VycyBhcnJheSBmb3IgZHVwbGljYXRlIHBvc2l0aW9uIGFuZCBvZmZzZXQgYSBsaXR0bGVcblx0XHRjaGVja0R1cGxpY2F0ZShjdXJyZW50KSB7XG5cdFx0XHRpZiAodGhpcy5nbWFya2Vycy5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdGxldCBkdXBzID0gMDtcblxuXHRcdFx0XHRmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5nbWFya2Vycy5sZW5ndGg7IGluZGV4KyspIHtcblx0XHRcdFx0XHRsZXQgcG9zID0gdGhpcy5nbWFya2Vyc1tpbmRleF0uZ2V0UG9zaXRpb24oKTtcblx0XHRcdFx0XHRpZiAoY3VycmVudC5lcXVhbHMocG9zKSkge1xuXHRcdFx0XHRcdFx0ZHVwcysrO1xuXHRcdFx0XHRcdFx0bGV0IGEgPSAzNjAuMCAvIGR1cHM7XG5cdFx0XHRcdFx0XHRsZXQgbmV3TGF0ID0gcG9zLmxhdCgpICsgLS4wMDAwMiAqIE1hdGguY29zKCgrYSAqIGR1cHMpIC8gMTgwICogTWF0aC5QSSk7ICAvL3hcblx0XHRcdFx0XHRcdGxldCBuZXdMbmcgPSBwb3MubG5nKCkgKyAtLjAwMDAwICogTWF0aC5zaW4oKCthICogZHVwcykgLyAxODAgKiBNYXRoLlBJKTsgIC8vWVxuXHRcdFx0XHRcdFx0Y3VycmVudCA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmcobmV3TGF0LCBuZXdMbmcpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gY3VycmVudDtcblx0XHR9XG5cblx0XHRjaGVja1pvb20oKSB7XG5cdFx0XHRpZiAobWFwWm9vbSA+IDApIHtcblx0XHRcdFx0bGV0IG15bGlzdGVuZXIgPSBtYXAuYWRkTGlzdGVuZXIoJ2lkbGUnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0aWYgKG1hcFpvb20gPiAwICYmIG1hcC5nZXRab29tKCkgIT09IG1hcFpvb20pIHtcblx0XHRcdFx0XHRcdG1hcC5zZXRab29tKG1hcFpvb20pO1xuXHRcdFx0XHRcdFx0bXlsaXN0ZW5lci5yZW1vdmUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGNsdXN0ZXJNYXAoKSB7XG5cdFx0XHRjb25zdCBtY09wdGlvbnMgPSB7XG5cdFx0XHRcdGdyaWRTaXplOiAgICAgICAgICAgIDIwLFxuXHRcdFx0XHRpZ25vcmVIaWRkZW5NYXJrZXJzOiB0cnVlLFxuXHRcdFx0XHRpbWFnZVBhdGg6ICAgICAgICAgICAnL21lZGlhL2NvbV9rbm93cmVzL2ltYWdlcy9tYXJrZXJjbHVzdGVyZXIvbSdcblx0XHRcdH07XG5cblx0XHRcdHRoaXMuc2V0UHJvcGVydHlNYXJrZXJzKCk7XG5cdFx0XHR0aGlzLnNldE1hcE1hcmtlcnMoKTtcblxuXHRcdFx0Zm9yIChsZXQgZCA9IDA7IGQgPCB0aGlzLmdtYXJrZXJzLmxlbmd0aDsgZCsrKSB7XG5cdFx0XHRcdGxldCBtYXJrZXIgPSB0aGlzLmdtYXJrZXJzW2RdO1xuXHRcdFx0XHRpZiAobWFya2VyLnR5cGUgPT09ICdwcm9wZXJ0eScpIHtcblx0XHRcdFx0XHRpZiAodGhpcy5zZXR0aW5ncy5maWx0ZXJJZHMuaW5jbHVkZXMobWFya2VyLnBpZCkpIHtcblx0XHRcdFx0XHRcdG1hcmtlci5zZXRWaXNpYmxlKHRydWUpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRtYXJrZXIuc2V0VmlzaWJsZShmYWxzZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdG1jID0gbmV3IE1hcmtlckNsdXN0ZXJlcihtYXAsIHRoaXMuZ21hcmtlcnMsIG1jT3B0aW9ucyk7XG5cdFx0XHRnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYywgXCJjbHVzdGVyY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHQkKCcja3ItaW5mb3dpbmRvdycpLmhpZGUoKTtcblx0XHRcdFx0aW5mb1dpbmRvdy5jbG9zZSgpO1xuXHRcdFx0fSk7XG5cblx0XHRcdG1hcC5maXRCb3VuZHMoYm91bmRzKTtcblx0XHRcdG1hcC5zZXRDZW50ZXIoYm91bmRzLmdldENlbnRlcigpKTtcblx0XHR9XG5cblx0XHQvLyBDcmVhdGUgdGhlIE1hcFxuXHRcdGNyZWF0ZU1hcCgpIHtcblx0XHRcdG1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5zZXR0aW5ncy5tYXBJZCksIHRoaXMuZ21PcHRpb25zKTtcblx0XHRcdGluZm9XaW5kb3cgPSBuZXcgZ29vZ2xlLm1hcHMuSW5mb1dpbmRvdygpO1xuXHRcdFx0aW5mb1dpbmRvdzIgPSBuZXcgZ29vZ2xlLm1hcHMuSW5mb1dpbmRvdygpO1xuXHRcdFx0Ym91bmRzID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZ0JvdW5kcygpO1xuXHRcdH1cblxuXHRcdC8vIENyZWF0ZSB0aGUgbWFya2VyIGFuZCBzZXQgdXAgdGhlIGV2ZW50IHdpbmRvd1xuXHRcdGNyZWF0ZU1hcE1hcmtlcihwb2ludCwgaHRtbCwgaW1hZ2UsIGJveGluZm8sIGxpbmssIHRpdGxlKSB7XG5cdFx0XHRsZXQgbWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XG5cdFx0XHRcdHNoYXBlOiAgICBtYXJrZXJzaGFwZSxcblx0XHRcdFx0bGluazogICAgIGxpbmssXG5cdFx0XHRcdGljb246ICAgICBpbWFnZSxcblx0XHRcdFx0cG9zaXRpb246IHBvaW50LFxuXHRcdFx0XHR0aXRsZTogICAgdGl0bGUsXG5cdFx0XHRcdG1hcDogICAgICBtYXAsXG5cdFx0XHRcdHpJbmRleDogICA5OTlcblx0XHRcdH0pO1xuXG5cdFx0XHRnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYXJrZXIsICdtb3VzZW92ZXInLCAoZnVuY3Rpb24gKGh0bWwpIHtcblx0XHRcdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRpbmZvV2luZG93Mi5zZXRDb250ZW50KGh0bWwpO1xuXHRcdFx0XHRcdGluZm9XaW5kb3cyLm9wZW4obWFwLCBtYXJrZXIpO1xuXHRcdFx0XHR9O1xuXHRcdFx0fSkoaHRtbCkpO1xuXG5cdFx0XHRnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYXJrZXIsICdtb3VzZW91dCcsIChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0aW5mb1dpbmRvdzIuY2xvc2UoKTtcblx0XHRcdFx0fTtcblx0XHRcdH0pKCkpO1xuXG5cdFx0XHRnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYXJrZXIsICdjbG9zZWNsaWNrJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRpbmZvV2luZG93Mi5jbG9zZSgpO1xuXHRcdFx0fSk7XG5cblx0XHRcdHRoaXMuZ21hcmtlcnMucHVzaChtYXJrZXIpO1xuXG5cdFx0XHR0aGlzLmNvdW50Kys7XG5cdFx0fVxuXG5cdFx0Y3JlYXRlUHJvcGVydHlNYXJrZXIocG9pbnQsIGh0bWwsIGJveGluZm8sIGxpbmssIHRpdGxlLCBjb2xvciwgaWQsIGltYWdlLCBwaWQpIHtcblx0XHRcdGxldCBtYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcblx0XHRcdFx0cG9zaXRpb246IHBvaW50LFxuXHRcdFx0XHRsaW5rOiAgICAgbGluayxcblx0XHRcdFx0bWFwOiAgICAgIG1hcCxcblx0XHRcdFx0aWNvbjogICAgIGltYWdlLFxuXHRcdFx0XHR0aXRsZTogICAgdGl0bGUsXG5cdFx0XHRcdHBpZDogICAgICBwaWQsXG5cdFx0XHRcdHR5cGU6ICAgICAncHJvcGVydHknLFxuXHRcdFx0XHR6SW5kZXg6ICAgdGhpcy5jb3VudCArIDEwMDBcblx0XHRcdH0pO1xuXG5cdFx0XHRwcm9wZXJ0eWRpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcblx0XHRcdC8vIGlmIChwcm9wZXJ0eWRpdiAhPT0gbnVsbCkge1xuXHRcdFx0Ly8gXHRnb29nbGUubWFwcy5ldmVudC5hZGREb21MaXN0ZW5lcihwcm9wZXJ0eWRpdiwgJ21vdXNlb3ZlcicsIGZ1bmN0aW9uICgpIHtcblx0XHRcdC8vIFx0XHRtYXJrZXIuc2V0SWNvbihcblx0XHRcdC8vIFx0XHRcdGhpY29uXG5cdFx0XHQvLyBcdFx0KVxuXHRcdFx0Ly8gXHRcdG1hcmtlci5zZXRaSW5kZXgobWFya2VyLmdldFpJbmRleCgpICsgMTAwMCk7XG5cdFx0XHQvLyBcdH0pO1xuXHRcdFx0Ly8gXHRnb29nbGUubWFwcy5ldmVudC5hZGREb21MaXN0ZW5lcihwcm9wZXJ0eWRpdiwgJ21vdXNlb3V0JywgZnVuY3Rpb24gKCkge1xuXHRcdFx0Ly8gXHRcdG1hcmtlci5zZXRJY29uKFxuXHRcdFx0Ly8gXHRcdFx0Ymljb25cblx0XHRcdC8vIFx0XHQpXG5cdFx0XHQvLyBcdFx0bWFya2VyLnNldFpJbmRleChtYXJrZXIuZ2V0WkluZGV4KCkgLSAxMDAwKTtcblx0XHRcdC8vIFx0fSk7XG5cdFx0XHQvLyB9XG5cblx0XHRcdC8vIG1hcmtlci5hZGRMaXN0ZW5lcignbW91c2VvdmVyJywgKGZ1bmN0aW9uICgpIHtcblx0XHRcdC8vIFx0bWFya2VyLnNldEljb24oXG5cdFx0XHQvLyBcdFx0aGljb25cblx0XHRcdC8vIFx0KVxuXHRcdFx0Ly8gXHRtYXJrZXIuc2V0WkluZGV4KG1hcmtlci5nZXRaSW5kZXgoKSArIDEwMDApO1xuXHRcdFx0Ly8gfSkpO1xuXHRcdFx0Ly9cblx0XHRcdC8vIG1hcmtlci5hZGRMaXN0ZW5lcignbW91c2VvdXQnLCAoZnVuY3Rpb24gKCkge1xuXHRcdFx0Ly8gXHRtYXJrZXIuc2V0SWNvbihcblx0XHRcdC8vIFx0XHRiaWNvblxuXHRcdFx0Ly8gXHQpXG5cdFx0XHQvLyBcdG1hcmtlci5zZXRaSW5kZXgobWFya2VyLmdldFpJbmRleCgpIC0gMTAwMCk7XG5cdFx0XHQvLyB9KSk7XG5cblx0XHRcdC8vIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKG1hcmtlciwgJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cdFx0XHQvLyBcdG1hcmtlci5zZXRWaXNpYmxlKGZhbHNlKTsgLy8gbWFwcyBBUEkgaGlkZSBjYWxsXG5cdFx0XHQvLyB9KTtcblxuXHRcdFx0bWFya2VyLmFkZExpc3RlbmVyKCdtb3VzZWRvd24nLCAoZnVuY3Rpb24gKGJveGluZm8pIHtcblx0XHRcdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRpbmZvV2luZG93LmNsb3NlKCk7XG5cdFx0XHRcdFx0JCgnI2tyLWluZm93aW5kb3cnKS5oaWRlKCk7XG5cdFx0XHRcdFx0aW5mb1dpbmRvdy5zZXRDb250ZW50KGh0bWwpO1xuXHRcdFx0XHRcdGluZm9XaW5kb3cub3BlbihtYXAsIG1hcmtlcik7XG5cblx0XHRcdFx0XHQkLmFqYXgoe1xuXHRcdFx0XHRcdFx0dHlwZTogICAgXCJQT1NUXCIsXG5cdFx0XHRcdFx0XHR1cmw6ICAgICAnL2luZGV4LnBocD9vcHRpb249Y29tX2tub3dyZXMmdGFzaz1wcm9wZXJ0eS5tYXBpbmZvd2luZG93Jyxcblx0XHRcdFx0XHRcdGRhdGE6ICAgIHtcblx0XHRcdFx0XHRcdFx0aWQ6IHBhcnNlSW50KGJveGluZm8pXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0c3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcblx0XHRcdFx0XHRcdFx0JCgnI2tyLWluZm93aW5kb3cnKS5mYWRlSW4oNDAwKS5odG1sKGRhdGEpLnNob3coKTtcblx0XHRcdFx0XHRcdFx0JChcIi5rci1pbmZvd2luZG93LXNsaWRlc2hvd1wiKS5ub3QoJy5zbGljay1pbml0aWFsaXplZCcpLnNsaWNrKHtcblx0XHRcdFx0XHRcdFx0XHRuZXh0QXJyb3c6ICc8aSBjbGFzcz1cInNsaWNrLW5hdiBuZXh0IGZhLXNvbGlkIGZhLWNoZXZyb24tcmlnaHQgXCI+PC9pPicsXG5cdFx0XHRcdFx0XHRcdFx0cHJldkFycm93OiAnPGkgY2xhc3M9XCJzbGljay1uYXYgcHJldiBmYS1zb2xpZCBmYS1jaGV2cm9uLWxlZnQgXCI+PC9pPicsXG5cdFx0XHRcdFx0XHRcdFx0YXV0b3BsYXk6ICB0cnVlXG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9O1xuXHRcdFx0fSkoYm94aW5mbykpO1xuXG5cdFx0XHRnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYXJrZXIsICdjbG9zZWNsaWNrJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHQkKCcja3ItaW5mb3dpbmRvdycpLmhpZGUoKTtcblx0XHRcdFx0aW5mb1dpbmRvdy5jbG9zZSgpO1xuXHRcdFx0fSk7XG5cblx0XHRcdHRoaXMuZ21hcmtlcnMucHVzaChtYXJrZXIpO1xuXHRcdFx0Ym91bmRzLmV4dGVuZChwb2ludCk7XG5cblx0XHRcdHRoaXMuY291bnQrKztcblx0XHR9XG5cblx0XHQvL0luaXRpYWxpc2UgbWFwXG5cdFx0aW5pdE1hcCgpIHtcblx0XHRcdHRoaXMuY3JlYXRlTWFwKCk7XG5cdFx0XHRpZiAodGhpcy5zZXR0aW5ncy5tYXBUeXBlID09PSAnY2x1c3RlcicpIHtcblx0XHRcdFx0dGhpcy5jbHVzdGVyTWFwKCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLnNvbG9NYXAoKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBSZXNldCBtYXAgdG8gaW5pdGlhbCBzdGF0ZVxuXHRcdHJlZnJlc2hNYXAoJG1hcG1vZGFsKSB7XG5cdFx0XHRpZiAodGhpcy5zZXR0aW5ncy5tYXBUeXBlID09PSAnc29sbycpXG5cdFx0XHRcdHJldHVybjtcblxuXHRcdFx0bGV0IHNlbGYgPSB0aGlzO1xuXHRcdFx0alF1ZXJ5LmFqYXgoe1xuXHRcdFx0XHR1cmw6ICAgICAgJy9pbmRleC5waHA/b3B0aW9uPWNvbV9rbm93cmVzJnRhc2s9cHJvcGVydGllcy5yZWZyZXNobWFwJyxcblx0XHRcdFx0dHlwZTogICAgICdQT1NUJyxcblx0XHRcdFx0ZGF0YVR5cGU6ICdqc29uJyxcblx0XHRcdFx0c3VjY2VzczogIGZ1bmN0aW9uIChyZXN1bHQpIHtcblx0XHRcdFx0XHRpZiAocmVzdWx0LnN1Y2Nlc3MpIHtcblx0XHRcdFx0XHRcdHNlbGYuc2V0dGluZ3MuZmlsdGVySWRzID0gcmVzdWx0LmRhdGEuZmlsdGVySWRzO1xuXHRcdFx0XHRcdFx0Zm9yIChsZXQgZCA9IDA7IGQgPCBzZWxmLmdtYXJrZXJzLmxlbmd0aDsgZCsrKSB7XG5cdFx0XHRcdFx0XHRcdGxldCBtYXJrZXIgPSBzZWxmLmdtYXJrZXJzW2RdO1xuXHRcdFx0XHRcdFx0XHRpZiAobWFya2VyLnR5cGUgPT09ICdwcm9wZXJ0eScpIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoc2VsZi5zZXR0aW5ncy5maWx0ZXJJZHMuaW5jbHVkZXMobWFya2VyLnBpZCkpIHtcblx0XHRcdFx0XHRcdFx0XHRcdG1hcmtlci5zZXRWaXNpYmxlKHRydWUpO1xuXHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRtYXJrZXIuc2V0VmlzaWJsZShmYWxzZSk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdG1jLnJlcGFpbnQoKTtcblx0XHRcdFx0XHRcdG5ldyBGb3VuZGF0aW9uLlJldmVhbCgkbWFwbW9kYWwpO1xuXHRcdFx0XHRcdFx0JG1hcG1vZGFsLmZvdW5kYXRpb24oJ29wZW4nKTtcblx0XHRcdFx0XHRcdGdvb2dsZS5tYXBzLmV2ZW50LnRyaWdnZXIobWFwLCAncmVzaXplJyk7XG5cdFx0XHRcdFx0XHQkbWFwbW9kYWwuZm91bmRhdGlvbignb3BlbicpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHR3aW5kb3cuYWxlcnQocmVzdWx0Lm1lc3NhZ2UpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0Ly8gUmVzZXQgbWFwIHRvIGluaXRpYWwgc3RhdGVcblx0XHRyZXNldE1hcCgpIHtcblx0XHRcdGluZm9XaW5kb3cuY2xvc2UoKTtcblx0XHRcdGluZm9XaW5kb3cyLmNsb3NlKCk7XG5cdFx0XHQkKCcja3ItaW5mb3dpbmRvdycpLmhpZGUoKTtcblx0XHRcdG1hcC5maXRCb3VuZHMoYm91bmRzKTtcblx0XHRcdG1hcC5zZXRDZW50ZXIoYm91bmRzLmdldENlbnRlcigpKTtcblx0XHR9XG5cblx0XHQvLyBsb29wIHRvIHNldCBtYXAgbWFya2Vyc1xuXHRcdHNldE1hcE1hcmtlcnMoKSB7XG5cdFx0XHRsZXQgcG9pbnQ7XG5cdFx0XHRsZXQgYW1hcms7XG5cblx0XHRcdGZvciAobGV0IGQgPSAwOyBkIDwgdGhpcy5zZXR0aW5ncy5tYXBNYXJrZXJzLmxlbmd0aDsgZCsrKSB7XG5cdFx0XHRcdGFtYXJrID0gdGhpcy5zZXR0aW5ncy5tYXBNYXJrZXJzW2RdO1xuXHRcdFx0XHRsZXQgbWFya2VyaWNvbiA9IHtcblx0XHRcdFx0XHR1cmw6ICBhbWFya1snaWNvbiddLFxuXHRcdFx0XHRcdHNpemU6IG5ldyBnb29nbGUubWFwcy5TaXplKDMyLCAzNyksXG5cdFx0XHRcdFx0Ly8gT1Igc2NhbGVkU2l6ZTogbmV3IGdvb2dsZS5tYXBzLlNpemUoNDAsIDQ3KVxuXHRcdFx0XHRcdG9yaWdpbjogbmV3IGdvb2dsZS5tYXBzLlBvaW50KDAsIDApLFxuXHRcdFx0XHRcdGFuY2hvcjogbmV3IGdvb2dsZS5tYXBzLlBvaW50KDAsIDE4KVxuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdHBvaW50ID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhhbWFya1snbGF0J10sIGFtYXJrWydsbmcnXSk7XG5cdFx0XHRcdHBvaW50ID0gdGhpcy5jaGVja0R1cGxpY2F0ZShwb2ludCk7XG5cdFx0XHRcdHRoaXMuY3JlYXRlTWFwTWFya2VyKHBvaW50LCBhbWFya1snaHRtbCddLCBtYXJrZXJpY29uLCAnJywgJycsIGFtYXJrWyd0aXRsZSddKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBzZXRNYXJrZXJJY29ucygpIHtcblx0XHQvLyBcdGJpY29uID0ge1xuXHRcdC8vIFx0XHRwYXRoOiAgICAgICAgICcvbWVkaWEvY29tX2tub3dyZXMvYXNzZXRzL2ltYWdlcy9zdmcnLFxuXHRcdC8vIFx0XHRmaWxsQ29sb3I6ICAgIHRoaXMuc2V0dGluZ3MubWFya2VyQ29sb3IsXG5cdFx0Ly8gXHRcdGZpbGxPcGFjaXR5OiAgMC45LFxuXHRcdC8vIFx0XHRhbmNob3I6ICAgICAgIG5ldyBnb29nbGUubWFwcy5Qb2ludCg5LCAzNSksXG5cdFx0Ly8gXHRcdHN0cm9rZUNvbG9yOiAgXCIjZWZlZmVmXCIsXG5cdFx0Ly8gXHRcdHN0cm9rZVdlaWdodDogMC41LFxuXHRcdC8vIFx0XHRzY2FsZTogICAgICAgIDFcblx0XHQvLyBcdH07XG5cdFx0Ly8gXHRoaWNvbiA9IHtcblx0XHQvLyBcdFx0cGF0aDogICAgICAgICAnL21lZGlhL2NvbV9rbm93cmVzL2Fzc2V0cy9pbWFnZXMvc3ZnJyxcblx0XHQvLyBcdFx0ZmlsbENvbG9yOiAgICBcImdyZWVuXCIsXG5cdFx0Ly8gXHRcdGZpbGxPcGFjaXR5OiAgMSxcblx0XHQvLyBcdFx0YW5jaG9yOiAgICAgICBuZXcgZ29vZ2xlLm1hcHMuUG9pbnQoOSwgMzUpLFxuXHRcdC8vIFx0XHRzdHJva2VDb2xvcjogIFwiI2VmZWZlZlwiLFxuXHRcdC8vIFx0XHRzdHJva2VXZWlnaHQ6IDAuOCxcblx0XHQvLyBcdFx0c2NhbGU6ICAgICAgICAxLjVcblx0XHQvLyBcdH07XG5cdFx0Ly8gfVxuXG5cdFx0Ly8gbG9vcCB0byBzZXQgcHJvcGVydHkgbWFya2Vyc1xuXHRcdHNldFByb3BlcnR5TWFya2VycygpIHtcblx0XHRcdGxldCBwb2ludDtcblx0XHRcdGxldCBhbWFyaztcblxuXHRcdFx0Zm9yIChsZXQgZCA9IDA7IGQgPCB0aGlzLnNldHRpbmdzLnByb3BlcnR5TWFya2Vycy5sZW5ndGg7IGQrKykge1xuXHRcdFx0XHRhbWFyayA9IHRoaXMuc2V0dGluZ3MucHJvcGVydHlNYXJrZXJzW2RdO1xuXG5cdFx0XHRcdGlmICghZCkge1xuXHRcdFx0XHRcdHByb3BlcnR5aWNvbiA9IHtcblx0XHRcdFx0XHRcdHVybDogICAgYW1hcmtbJ2ljb24nXSxcblx0XHRcdFx0XHRcdHNpemU6ICAgbmV3IGdvb2dsZS5tYXBzLlNpemUoMzIsIDM3KSxcblx0XHRcdFx0XHRcdG9yaWdpbjogbmV3IGdvb2dsZS5tYXBzLlBvaW50KDAsIDApLFxuXHRcdFx0XHRcdFx0YW5jaG9yOiBuZXcgZ29vZ2xlLm1hcHMuUG9pbnQoMCwgMjApXG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHBvaW50ID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhhbWFya1snbGF0J10sIGFtYXJrWydsbmcnXSk7XG5cdFx0XHRcdHBvaW50ID0gdGhpcy5jaGVja0R1cGxpY2F0ZShwb2ludCk7XG5cdFx0XHRcdHRoaXMuY3JlYXRlUHJvcGVydHlNYXJrZXIocG9pbnQsIGFtYXJrWydodG1sJ10sIGFtYXJrWydib3hpbmZvJ10sIGFtYXJrWydsaW5rJ10sIGFtYXJrWyd0aXRsZSddLCBhbWFya1snY29sb3InXSwgYW1hcmtbJ2lkJ10sIHByb3BlcnR5aWNvbiwgYW1hcmtbJ3BpZCddKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRzb2xvTWFwKCkge1xuXHRcdFx0dGhpcy5zZXRQcm9wZXJ0eU1hcmtlcnMoKTtcblx0XHRcdHRoaXMuc2V0TWFwTWFya2VycygpO1xuXG5cdFx0XHRtYXAuZml0Qm91bmRzKGJvdW5kcyk7XG5cdFx0XHRtYXAuc2V0Q2VudGVyKGJvdW5kcy5nZXRDZW50ZXIoKSk7XG4vL1x0XHRcdHRoaXMuY2hlY2tab29tKCk7XG5cblx0XHRcdGlmICh0aGlzLnNldHRpbmdzLm1hcE1hcmtlcnMubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRjb25zdCBzZWxmID0gdGhpcztcblxuXHRcdFx0XHRsZXQgbXlMaXN0ZW5lciA9IGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKG1hcCwgJ2lkbGUnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0bGV0IGZvdW5kID0gMDtcblx0XHRcdFx0XHRsZXQgY3VycmVudFpvb20gPSBtYXAuZ2V0Wm9vbSgpO1xuXG5cdFx0XHRcdFx0d2hpbGUgKCFmb3VuZCkge1xuXHRcdFx0XHRcdFx0Zm91bmQgPSBLcm1hcC5zaG93VmlzaWJsZU1hcmtlcnMoc2VsZi5nbWFya2Vycyk7XG5cdFx0XHRcdFx0XHRpZiAoZm91bmQpIHtcblx0XHRcdFx0XHRcdFx0bXlMaXN0ZW5lci5yZW1vdmUoKTtcblx0XHRcdFx0XHRcdFx0bWFwLnNldFpvb20oY3VycmVudFpvb20pO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGN1cnJlbnRab29tID0gY3VycmVudFpvb20gLSAxO1xuXHRcdFx0XHRcdFx0aWYgKGN1cnJlbnRab29tIDwgMTApIHtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQkKGZ1bmN0aW9uICgpIHtcblx0XHRsZXQgJG1hcG1vZGFsO1xuXG5cdFx0JCgnYm9keScpLm9uKCdjbGljaycsICcubWFwLXRyaWdnZXInLCBmdW5jdGlvbiAoZSkge1xuIFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcbiBcdFx0XHRpZiAobWFwRGF0YSkge1xuIFx0XHRcdFx0bXlLcm1hcC5yZWZyZXNoTWFwKCRtYXBtb2RhbCk7XG4gXHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdGtpY2tNYXAoJCh0aGlzKSk7XG5cdFx0XHRcdCRtYXBtb2RhbCA9ICQoJyNrci1zZWFyY2gtbWFwLW1vZGFsJyk7XG5cdFx0XHRcdCRtYXBtb2RhbC5mb3VuZGF0aW9uKCdvcGVuJyk7XG4gXHRcdFx0fVxuXHRcdH0pLm9uKCdjbGljaycsICcucmVzZXRtYXAnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0bXlLcm1hcC5yZXNldE1hcCgpO1xuXHRcdH0pLm9uKCdjbGljaycsICcja3Itc2VhcmNoLW1hcC1mdWxsLWluZm93aW5kb3ctY2xvc2UnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0S3JtYXAuY2xvc2VLckluZm93aW5kb3coKTtcblx0XHR9KS5vbignY2xpY2snLCAnLmNsb3NlbWFwJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdCRtYXBtb2RhbC5mb3VuZGF0aW9uKCdjbG9zZScpO1xuXHRcdFx0JC5hamF4KHtcblx0XHRcdFx0dHlwZTogICAgXCJQT1NUXCIsXG5cdFx0XHRcdHVybDogICAgICcvaW5kZXgucGhwP29wdGlvbj1jb21fa25vd3JlcyZ0YXNrPXByb3BlcnRpZXMubWFwc2Vzc2lvbicsXG5cdFx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHQkKCcua3Itc2VhcmNoYmFyIC5idXR0b24ubWFwJykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9KS5vbignb3Blbi56Zi5yZXZlYWwnLCAnI2tyLXNlYXJjaC1tYXAtbW9kYWwnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0JCgnI2tyLXNlYXJjaC1tYXAtZnVsbCcpLmhlaWdodCgkKCcja3Itc2VhcmNoLW1hcC1tb2RhbCcpLmhlaWdodCgpKTtcblx0XHRcdGdvb2dsZS5tYXBzLmV2ZW50LnRyaWdnZXIobWFwLCBcInJlc2l6ZVwiKTtcblx0XHRcdCQuYWpheCh7XG5cdFx0XHRcdHR5cGU6ICAgIFwiUE9TVFwiLFxuXHRcdFx0XHR1cmw6ICAgICAnL2luZGV4LnBocD9vcHRpb249Y29tX2tub3dyZXMmdGFzaz1wcm9wZXJ0aWVzLm1hcHNlc3Npb24nLFxuXHRcdFx0XHRkYXRhOiAgICB7bWFwX21vZGFsOiAnMSd9LFxuXHRcdFx0XHRzdWNjZXNzOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0pO1xuXG5cdFx0Ly8gRG9lc24ndCB0cmlnZ2VyIGlmIGluY2x1ZGVkIGFib3ZlID8/XG5cdFx0aWYgKCFtYXBEYXRhKSB7XG5cdFx0XHRjb25zdCAkc29sb1RyaWdnZXIgPSAkKCcja3ItbWFwLXNvbG8tdHJpZ2dlcicpO1xuXHRcdFx0JHNvbG9UcmlnZ2VyLm9uZSgnY2xpY2snLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdGtpY2tNYXAoJHNvbG9UcmlnZ2VyKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRpZiAod2luZG93LmxvY2F0aW9uLmhyZWYuaW5kZXhPZignI21hcCcpICE9PSAtMSAmJiAkc29sb1RyaWdnZXIubGVuZ3RoKSB7XG5cdFx0XHRcdGtpY2tNYXAoJHNvbG9UcmlnZ2VyKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBUZXN0IGZvciBmb3JjZSBtYXBcblx0XHRjb25zdCAkdHJpZ2dlciA9ICQoJy5tYXAtdHJpZ2dlcicpO1xuXHRcdGlmICgkdHJpZ2dlci5kYXRhKCdmb3JjZW1hcCcpKSB7XG5cdFx0XHQkdHJpZ2dlci50cmlnZ2VyKCdjbGljaycpO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGtpY2tNYXAoJGVsZW0pIHtcblx0XHRcdGNvbnN0IHR5cGUgPSAkZWxlbS5kYXRhKCd0eXBlJyk7XG5cdFx0XHRsZXQgcGlkID0gMDtcblx0XHRcdGlmICh0eXBlID09PSAnc29sbycpIHtcblx0XHRcdFx0cGlkID0gJGVsZW0uZGF0YSgncGlkJyk7XG5cdFx0XHR9XG5cblx0XHRcdGpRdWVyeS5hamF4KHtcblx0XHRcdFx0dXJsOiAgICAgICcvaW5kZXgucGhwP29wdGlvbj1jb21fa25vd3JlcyZ0YXNrPXByb3BlcnRpZXMubWFwZGF0YSZwaWQ9JyArIHBpZCxcblx0XHRcdFx0dHlwZTogICAgIFwiUE9TVFwiLFxuXHRcdFx0XHRkYXRhVHlwZTogXCJqc29uXCIsXG5cdFx0XHRcdHN1Y2Nlc3M6ICBmdW5jdGlvbiAocmVzdWx0KSB7XG5cdFx0XHRcdFx0aWYgKHJlc3VsdC5zdWNjZXNzKSB7XG5cdFx0XHRcdFx0XHRzZXR0aW5ncyA9IHtcblx0XHRcdFx0XHRcdFx0bWFwSWQ6ICAgICAgICAgICAkZWxlbS5kYXRhKCd0YXJnZXQnKSxcblx0XHRcdFx0XHRcdFx0bWFwVHlwZTogICAgICAgICAkZWxlbS5kYXRhKCd0eXBlJyksXG5cdFx0XHRcdFx0XHRcdG1hcFR5cGVJZDogICAgICAgJGVsZW0uZGF0YSgnbWFwdHlwZWlkJyksXG5cdFx0XHRcdFx0XHRcdG1hcFpvb206ICAgICAgICAgcGFyc2VJbnQoJGVsZW0uZGF0YSgnem9vbScpKSxcblx0XHRcdFx0XHRcdFx0bWFwTWF4Wm9vbTogICAgICBwYXJzZUludCgkZWxlbS5kYXRhKCd6b29tbWF4JykpLFxuXHRcdFx0XHRcdFx0XHRwcm9wZXJ0eU1hcmtlcnM6IHJlc3VsdC5kYXRhLnByb3BlcnR5TWFya2Vycyxcblx0XHRcdFx0XHRcdFx0bWFwTWFya2VyczogICAgICByZXN1bHQuZGF0YS5tYXBNYXJrZXJzLFxuXHRcdFx0XHRcdFx0XHRmaWx0ZXJJZHM6ICAgICAgIHJlc3VsdC5kYXRhLmZpbHRlcklkc1xuXHRcdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdFx0bXlLcm1hcCA9IG5ldyBLcm1hcChzZXR0aW5ncyk7XG5cdFx0XHRcdFx0XHRtYXBEYXRhID0gdHJ1ZTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0d2luZG93LmFsZXJ0KHJlc3VsdC5tZXNzYWdlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblx0fSk7XG59KGpRdWVyeSkpOyIsIi8qKlxuICogQHBhY2thZ2UgICAgS25vdyBSZXNlcnZhdGlvbnNcbiAqIEBzdWJwYWNrYWdlIFNpdGUgSlNcbiAqIEBjb3B5cmlnaHQgIDIwMjAgSGlnaGxhbmQgVmlzaW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogQGxpY2Vuc2UgICAgU2VlIHRoZSBmaWxlIFwiTElDRU5TRS50eHRcIiBmb3IgdGhlIGZ1bGwgbGljZW5zZSBnb3Zlcm5pbmcgdGhpcyBjb2RlLlxuICogQGF1dGhvciAgICAgSGF6ZWwgV2lsc29uIDxoYXplbEBoaWdobGFuZHZpc2lvbi5jb20+XG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoJCkge1xuXHRsZXQgbXlLcnJvdXRlO1xuXHRsZXQgZGlyZWN0aW9uc0Rpc3BsYXk7XG5cdGxldCBkaXJlY3Rpb25zVmlzaWJsZSA9IGZhbHNlO1xuXHRsZXQgcm91dGVNYXA7XG5cdGxldCBvcmlnaW47XG5cdGxldCBkZXN0aW5hdGlvbjtcblx0bGV0IHJvdXRlTWFya2VycyA9IFtdO1xuXHRsZXQgcm91dGVTdG9wUG9pbnRzID0gW107XG5cdGxldCBwb2ludDtcblx0bGV0IHNlbGY7XG5cblx0bGV0IHNldHRpbmdzID0ge1xuXHRcdGxhdDogICAgICAgICAgICAgICBcIlwiLFxuXHRcdGxuZzogICAgICAgICAgICAgICBcIlwiLFxuXHRcdG5hbWU6ICAgICAgICAgICAgICBcIlwiLFxuXHRcdGljb246ICAgICAgICAgICAgICBcIlwiLFxuXHRcdGRldG91cjogICAgICAgICAgICBcIlwiLFxuXHRcdG1hcFpvb206ICAgICAgICAgICA5LFxuXHRcdG1hcE1heFpvb206ICAgICAgICAyMCxcblx0XHRtYXBUeXBlSWQ6ICAgICAgICAgXCJyb2FkbWFwXCIsXG5cdFx0bWFwSWQ6ICAgICAgICAgICAgIFwia3ItbWFwLXJvdXRlXCIsXG5cdFx0ZGlyZWN0aW9uc1BhbmVsOiAgIFwia3ItZGlyZWN0aW9ucy1wYW5lbFwiLFxuXHRcdGRpcmVjdGlvbnNTZXJ2aWNlOiBudWxsXG5cdH07XG5cblx0Y2xhc3MgS3Jyb3V0ZSB7XG5cdFx0Y29uc3RydWN0b3IoJGVsZW1lbnQsIG9wdGlvbnMpIHtcblx0XHRcdHRoaXMuc2V0dGluZ3MgPSBzZXR0aW5ncztcblx0XHRcdGlmIChvcHRpb25zKSB7XG5cdFx0XHRcdCQuZXh0ZW5kKHRoaXMuc2V0dGluZ3MsIG9wdGlvbnMpO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLnNldHRpbmdzLmRpcmVjdGlvbnNTZXJ2aWNlID0gbmV3IGdvb2dsZS5tYXBzLkRpcmVjdGlvbnNTZXJ2aWNlKCk7XG5cdFx0XHR0aGlzLmluaXQoKTtcblx0XHR9XG5cblx0XHRzdGF0aWMgY2xlYXJSb3V0ZU1hcmtlcnMoKSB7XG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHJvdXRlTWFya2Vycy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRyb3V0ZU1hcmtlcnNbaV0uc2V0TWFwKG51bGwpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHN0YXRpYyBjbGVhcldheXBvaW50cygpIHtcblx0XHRcdG9yaWdpbiA9IG51bGw7XG5cdFx0XHRyb3V0ZU1hcmtlcnMgPSBbXTtcblx0XHRcdHJvdXRlU3RvcFBvaW50cyA9IFtdO1xuXHRcdFx0ZGlyZWN0aW9uc1Zpc2libGUgPSBmYWxzZTtcblx0XHR9XG5cblx0XHRhZGRSb3V0ZU1hcmtlcihsYXRsbmcpIHtcblx0XHRcdHJvdXRlTWFya2Vycy5wdXNoKG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xuXHRcdFx0XHRwb3NpdGlvbjogbGF0bG5nLFxuXHRcdFx0XHRtYXA6ICAgICAgcm91dGVNYXAsXG5cdFx0XHRcdGljb246ICAgICB0aGlzLnNldHRpbmdzLmRldG91clxuXHRcdFx0fSkpO1xuXHRcdH1cblxuXHRcdC8vXG5cdFx0Ly8gYWRkUHJvcGVydHlNYXJrZXIocG9pbnQsIGh0bWwsIGltYWdlLCBib3hpbmZvKSB7XG5cdFx0Ly8gXHRsZXQgbWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XG5cdFx0Ly8gXHRcdHBvc2l0aW9uOiBwb2ludCxcblx0XHQvLyBcdFx0aHRtbDogICAgIGh0bWwsXG5cdFx0Ly8gXHRcdG1hcDogICAgICByb3V0ZU1hcCxcblx0XHQvLyBcdFx0aWNvbjogICAgIGltYWdlLFxuXHRcdC8vIFx0XHR6SW5kZXg6ICAgMVxuXHRcdC8vIFx0fSk7XG5cdFx0Ly9cblx0XHQvLyBcdGxldCBpbmZvd2luZG93ID0gbmV3IGdvb2dsZS5tYXBzLkluZm9XaW5kb3coe1xuXHRcdC8vIFx0XHRjb250ZW50OiBib3hpbmZvXG5cdFx0Ly8gXHR9KTtcblx0XHQvL1xuXHRcdC8vIFx0Z29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIobWFya2VyLCAnY2xpY2snLCBmdW5jdGlvbiAoKSB7XG5cdFx0Ly8gXHRcdC8vIENoZWNrIHRvIHNlZSBpZiB0aGVyZSBpcyBhbiBpbmZvIHdpbmRvdyBzdG9yZWQgaW4gcm91dGVDdXJySW5mb1dpbmRvdyxcblx0XHQvLyBcdFx0Ly8gaWYgdGhlcmUgaXMsIHdlIHVzZSAuY2xvc2UoKSB0byBoaWRlIHRoZSB3aW5kb3dcblx0XHQvLyBcdFx0aWYgKHJvdXRlQ3VyckluZm9XaW5kb3cpIHtcblx0XHQvLyBcdFx0XHRyb3V0ZUN1cnJJbmZvV2luZG93LmNsb3NlKCk7XG5cdFx0Ly8gXHRcdH1cblx0XHQvLyBcdFx0Ly8gUHV0IG91ciBuZXcgaW5mbyB3aW5kb3cgaW4gdG8gdGhlIHJvdXRlQ3VyckluZm9XaW5kb3cgdmFyaWFibGVcblx0XHQvLyBcdFx0cm91dGVDdXJySW5mb1dpbmRvdyA9IGluZm93aW5kb3c7XG5cdFx0Ly8gXHRcdC8vIE9wZW4gdGhlIHdpbmRvd1xuXHRcdC8vIFx0XHRpbmZvd2luZG93Lm9wZW4ocm91dGVNYXAsIG1hcmtlcik7XG5cdFx0Ly8gXHR9KTtcblx0XHQvL1xuXHRcdC8vIFx0Ly9nbWFya2Vycy5wdXNoKCBtYXJrZXIgKTtcblx0XHQvLyBcdHJvdXRlTWFya2Vycy5wdXNoKG1hcmtlcik7XG5cdFx0Ly8gfVxuXG5cdFx0Ly8gc3RhdGljIHVwZGF0ZU1vZGUoKSB7XG5cdFx0Ly8gXHRpZiAoZGlyZWN0aW9uc1Zpc2libGUpIHtcblx0XHQvLyBcdFx0dGhpcy5jYWxjUm91dGUoKTtcblx0XHQvLyBcdH1cblx0XHQvLyB9XG5cblx0XHRjYWxjUm91dGUoKSB7XG5cdFx0XHRsZXQgZnJvbV9hZGRyZXNzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmcm9tX2FkZHJlc3NcIikudmFsdWU7XG5cdFx0XHRsZXQgb3JpZ2luID0gXCJcIjtcblxuXHRcdFx0aWYgKGZyb21fYWRkcmVzcyA9PT0gXCJBZGRyZXNzXCIpIGZyb21fYWRkcmVzcyA9IFwiXCI7XG5cdFx0XHRpZiAoZnJvbV9hZGRyZXNzKSBvcmlnaW4gPSBmcm9tX2FkZHJlc3MgKyBcIixcIiArIFwiXCI7XG5cblx0XHRcdGxldCBtb2RlO1xuXHRcdFx0c3dpdGNoIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1vZGVcIikudmFsdWUpIHtcblx0XHRcdFx0Y2FzZSBcImJpY3ljbGluZ1wiOlxuXHRcdFx0XHRcdG1vZGUgPSBnb29nbGUubWFwcy5EaXJlY3Rpb25zVHJhdmVsTW9kZS5CSUNZQ0xJTkc7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJkcml2aW5nXCI6XG5cdFx0XHRcdFx0bW9kZSA9IGdvb2dsZS5tYXBzLkRpcmVjdGlvbnNUcmF2ZWxNb2RlLkRSSVZJTkc7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJ3YWxraW5nXCI6XG5cdFx0XHRcdFx0bW9kZSA9IGdvb2dsZS5tYXBzLkRpcmVjdGlvbnNUcmF2ZWxNb2RlLldBTEtJTkc7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChvcmlnaW4pIHtcblx0XHRcdFx0bGV0IHJlcXVlc3QgPSB7XG5cdFx0XHRcdFx0b3JpZ2luOiAgICAgICAgb3JpZ2luLFxuXHRcdFx0XHRcdGRlc3RpbmF0aW9uOiAgIGRlc3RpbmF0aW9uLFxuXHRcdFx0XHRcdHdheXBvaW50czogICAgIHJvdXRlU3RvcFBvaW50cyxcblx0XHRcdFx0XHR0cmF2ZWxNb2RlOiAgICBtb2RlLFxuXHRcdFx0XHRcdGF2b2lkSGlnaHdheXM6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoaWdod2F5cycpLmNoZWNrZWQsXG5cdFx0XHRcdFx0YXZvaWRUb2xsczogICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvbGxzJykuY2hlY2tlZFxuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdHNlbGYgPSB0aGlzO1xuXHRcdFx0XHR0aGlzLnNldHRpbmdzLmRpcmVjdGlvbnNTZXJ2aWNlLnJvdXRlKHJlcXVlc3QsIGZ1bmN0aW9uIChyZXNwb25zZSwgc3RhdHVzKSB7XG5cdFx0XHRcdFx0aWYgKHN0YXR1cyA9PT0gZ29vZ2xlLm1hcHMuRGlyZWN0aW9uc1N0YXR1cy5PSykge1xuXHRcdFx0XHRcdFx0ZGlyZWN0aW9uc0Rpc3BsYXkuc2V0RGlyZWN0aW9ucyhyZXNwb25zZSk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGFsZXJ0KFwiR29vZ2xlIGNvdWxkbmB0IGNhbGN1bGF0ZSBkaXJlY3Rpb25zIGZvciB0aGlzIHJvdXRlIGFuZCBzZWxlY3RlZCBvcHRpb25zXCIpO1xuXHRcdFx0XHRcdFx0c2VsZi5yZXNldFJvdXRlKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblxuXHRcdFx0S3Jyb3V0ZS5jbGVhclJvdXRlTWFya2VycygpO1xuXHRcdFx0ZGlyZWN0aW9uc1Zpc2libGUgPSB0cnVlO1xuXHRcdH1cblxuXHRcdGluaXQoKSB7XG5cdFx0XHRkZXN0aW5hdGlvbiA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmcodGhpcy5zZXR0aW5ncy5sYXQsIHRoaXMuc2V0dGluZ3MubG5nKTtcblxuXHRcdFx0Ly9Jbml0aWFsaXNlIG1hcCBvcHRpb25zXG5cdFx0XHR0aGlzLm15T3B0aW9ucyA9IHtcblx0XHRcdFx0c2Nyb2xsd2hlZWw6ICAgICAgIGZhbHNlLFxuXHRcdFx0XHR6b29tOiAgICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5tYXBab29tLFxuXHRcdFx0XHRtYXhab29tOiAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5tYXBNYXhab29tLFxuXHRcdFx0XHRtYXBUeXBlSWQ6ICAgICAgICAgdGhpcy5zZXR0aW5ncy5tYXBUeXBlSWQsXG5cdFx0XHRcdHN0cmVldFZpZXdDb250cm9sOiBmYWxzZSxcblx0XHRcdFx0Y2VudGVyOiAgICAgICAgICAgIGRlc3RpbmF0aW9uXG5cdFx0XHR9O1xuXG5cdFx0XHRyb3V0ZU1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5zZXR0aW5ncy5tYXBJZCksIHRoaXMubXlPcHRpb25zKTtcblx0XHRcdGRpcmVjdGlvbnNEaXNwbGF5ID0gbmV3IGdvb2dsZS5tYXBzLkRpcmVjdGlvbnNSZW5kZXJlcigpO1xuXHRcdFx0ZGlyZWN0aW9uc0Rpc3BsYXkuc2V0TWFwKHJvdXRlTWFwKTtcblx0XHRcdGRpcmVjdGlvbnNEaXNwbGF5LnNldFBhbmVsKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuc2V0dGluZ3MuZGlyZWN0aW9uc1BhbmVsKSk7XG5cblx0XHRcdGNvbnN0IGltYWdlID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlckltYWdlKHRoaXMuc2V0dGluZ3MuaWNvbik7XG5cdFx0XHRwb2ludCA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmcodGhpcy5zZXR0aW5ncy5sYXQsIHRoaXMuc2V0dGluZ3MubG5nKTtcblxuXHRcdFx0c2VsZiA9IHRoaXM7XG5cdFx0XHRnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihyb3V0ZU1hcCwgJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0XHRcdGlmIChyb3V0ZVN0b3BQb2ludHMubGVuZ3RoIDwgOSkge1xuXHRcdFx0XHRcdHJvdXRlU3RvcFBvaW50cy5wdXNoKHtsb2NhdGlvbjogZXZlbnQubGF0TG5nLCBzdG9wb3ZlcjogdHJ1ZX0pO1xuXHRcdFx0XHRcdHBvaW50ID0gZXZlbnQubGF0TG5nO1xuXHRcdFx0XHRcdHNlbGYuYWRkUm91dGVNYXJrZXIocG9pbnQpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGFsZXJ0KFwiTWF4aW11bSBudW1iZXIgb2YgOSB3YXlwb2ludHMgcmVhY2hlZFwiKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdHNlbGYgPSB0aGlzO1xuXHRcdFx0Z29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXJPbmNlKHJvdXRlTWFwLCAnaWRsZScsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0Z29vZ2xlLm1hcHMuZXZlbnQudHJpZ2dlcihyb3V0ZU1hcCwgJ3Jlc2l6ZScpO1xuXHRcdFx0XHRzZWxmLmNhbGNSb3V0ZSgpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0cmVzZXRSb3V0ZSgpIHtcblx0XHRcdEtycm91dGUuY2xlYXJSb3V0ZU1hcmtlcnMoKTtcblx0XHRcdEtycm91dGUuY2xlYXJXYXlwb2ludHMoKTtcblx0XHRcdGRpcmVjdGlvbnNEaXNwbGF5LnNldE1hcChudWxsKTtcblx0XHRcdGRpcmVjdGlvbnNEaXNwbGF5LnNldFBhbmVsKG51bGwpO1xuXHRcdFx0ZGlyZWN0aW9uc0Rpc3BsYXkgPSBuZXcgZ29vZ2xlLm1hcHMuRGlyZWN0aW9uc1JlbmRlcmVyKCk7XG5cdFx0XHRkaXJlY3Rpb25zRGlzcGxheS5zZXRNYXAocm91dGVNYXApO1xuXHRcdFx0ZGlyZWN0aW9uc0Rpc3BsYXkuc2V0UGFuZWwoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5zZXR0aW5ncy5kaXJlY3Rpb25QYW5lbCkpO1xuXG5cdFx0XHR0aGlzLmluaXQoKTtcblx0XHR9XG5cdH1cblxuXHQkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG5cdFx0JChcIi5rci1kaXJlY3Rpb25zLW1vZGFsXCIpLm9uKCdjbGljaycsICcja3ItbWFwLXJvdXRlJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdGxldCAkZWxlbWVudCA9ICQodGhpcyk7XG5cdFx0XHRjb25zdCBvcHRpb25zID0ge1xuXHRcdFx0XHRsYXQ6ICAgICRlbGVtZW50LmRhdGEoJ2xhdCcpLFxuXHRcdFx0XHRsbmc6ICAgICRlbGVtZW50LmRhdGEoJ2xuZycpLFxuXHRcdFx0XHRuYW1lOiAgICRlbGVtZW50LmRhdGEoJ25hbWUnKSxcblx0XHRcdFx0aWNvbjogICAkZWxlbWVudC5kYXRhKCdpY29uJyksXG5cdFx0XHRcdGRldG91cjogJGVsZW1lbnQuZGF0YSgnZGV0b3VyJylcblx0XHRcdH07XG5cdFx0XHRteUtycm91dGUgPSBuZXcgS3Jyb3V0ZSgkZWxlbWVudCwgb3B0aW9ucyk7XG5cdFx0fSkub24oJ2NsaWNrJywgJy5yZXNldHJvdXRlJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdG15S3Jyb3V0ZS5yZXNldFJvdXRlKCk7XG5cdFx0fSkub24oJ2NsaWNrJywgJy5jYWxjcm91dGUnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0bXlLcnJvdXRlLmNhbGNSb3V0ZSgpO1xuXHRcdH0pO1xuXG5cdFx0alF1ZXJ5KFwiYSNnZW9jb2RlQWRkcmVzc1wiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0XHRsZXQgYWRkcmVzc1N0cmluZyA9XG5cdFx0XHRcdCAgICBqUXVlcnkoXCIjamZvcm1fcHJvcGVydHlfc3RyZWV0XCIpLnZhbCgpXG5cdFx0XHRcdCAgICArIFwiLCBcIlxuXHRcdFx0XHQgICAgKyBqUXVlcnkoJyNqZm9ybV90b3duX2lkJykuZmluZChcIjpzZWxlY3RlZFwiKS50ZXh0KClcblx0XHRcdFx0ICAgICsgXCIgXCJcblx0XHRcdFx0ICAgICsgalF1ZXJ5KFwiI2pmb3JtX3Byb3BlcnR5X3Bvc3Rjb2RlXCIpLnZhbCgpXG5cdFx0XHRcdCAgICArIFwiLCBcIlxuXHRcdFx0XHQgICAgKyBqUXVlcnkoJyNqZm9ybV9yZWdpb25faWQnKS5maW5kKFwiOnNlbGVjdGVkXCIpLnRleHQoKVxuXHRcdFx0XHQgICAgKyBcIiBcIlxuXHRcdFx0XHQgICAgKyBqUXVlcnkoJyNqZm9ybV9jb3VudHJ5X2lkJykuZmluZChcIjpzZWxlY3RlZFwiKS50ZXh0KCk7XG5cblx0XHRcdGxldCB1cmwgPSAnaW5kZXgucGhwP29wdGlvbj1jb21fa25vd3JlcyZ0YXNrPXByb3BlcnR5Lmdlb2NvZGUnO1xuXHRcdFx0bGV0IGNvb3JkID0gW107XG5cblx0XHRcdGpRdWVyeS5hamF4KHtcblx0XHRcdFx0dHlwZTogICAgIFwiUE9TVFwiLFxuXHRcdFx0XHR1cmw6ICAgICAgdXJsLFxuXHRcdFx0XHRkYXRhOiAgICAge2FkZHJlc3M6IGFkZHJlc3NTdHJpbmd9LFxuXHRcdFx0XHRkYXRhVHlwZTogXCJqc29uXCIsXG5cdFx0XHRcdHN1Y2Nlc3M6ICBmdW5jdGlvbiAoanNvbmRhdGEpIHtcblx0XHRcdFx0XHRqUXVlcnkuZWFjaChqc29uZGF0YSwgZnVuY3Rpb24gKGtleSwgdmFsKSB7XG5cdFx0XHRcdFx0XHRsZXQgZGl2ID0gXCIjXCIgKyBrZXk7XG5cdFx0XHRcdFx0XHRqUXVlcnkoZGl2KS52YWwodmFsKTtcblx0XHRcdFx0XHRcdGNvb3JkW2tleV0gPSB2YWw7XG5cdFx0XHRcdFx0XHRteUdtYXAucmVmcmVzaE1hcChjb29yZFsnbGF0J10sIGNvb3JkWydsbmcnXSwgZmFsc2UpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fSk7XG59KGpRdWVyeSkpOyIsIi8vIEtSIEFQUCBKUyBGaWxlc1xuaW1wb3J0ICducG0vanF1ZXJ5LWJhci1yYXRpbmcvanF1ZXJ5LmJhcnJhdGluZyc7XG5pbXBvcnQgJ25wbS9pcy1tYXJrZXItY2x1c3RlcmVyJztcbmltcG9ydCAnbWVkaWFqcy9zaXRlL2FwcCc7XG4vL2ltcG9ydCAnbWVkaWFqcy9zaXRlL2NvbWJvZ2VvJztcbmltcG9ydCAnbWVkaWFqcy9zaXRlL2NvbmZpcm0nO1xuaW1wb3J0ICdtZWRpYWpzL3NpdGUvZG9iZW50cnknO1xuaW1wb3J0ICdtZWRpYWpzL3NpdGUvZ3Vlc3RkYXRhJztcbmltcG9ydCAnbWVkaWFqcy9zaXRlL21hZ2VsbGFuJztcbmltcG9ydCAnbWVkaWFqcy9zaXRlL21hcCc7XG5pbXBvcnQgJ21lZGlhanMvc2l0ZS9yb3V0ZSc7XG4vLyBpbXBvcnQgJy4vanMvc3JjL2tyYXBwL3N0cmlwZSc7Il0sIm5hbWVzIjpbIk1hcmtlckNsdXN0ZXJlciIsIm1hcCIsIm9wdF9tYXJrZXJzIiwib3B0X29wdGlvbnMiLCJleHRlbmQiLCJnb29nbGUiLCJtYXBzIiwiT3ZlcmxheVZpZXciLCJtYXBfIiwibWFya2Vyc18iLCJjbHVzdGVyc18iLCJzaXplcyIsInN0eWxlc18iLCJyZWFkeV8iLCJvcHRpb25zIiwiZ3JpZFNpemVfIiwibWluQ2x1c3RlclNpemVfIiwibWF4Wm9vbV8iLCJpbWFnZVBhdGhfIiwiTUFSS0VSX0NMVVNURVJfSU1BR0VfUEFUSF8iLCJpbWFnZUV4dGVuc2lvbl8iLCJNQVJLRVJfQ0xVU1RFUl9JTUFHRV9FWFRFTlNJT05fIiwiem9vbU9uQ2xpY2tfIiwidW5kZWZpbmVkIiwiYXZlcmFnZUNlbnRlcl8iLCJzZXR1cFN0eWxlc18iLCJzZXRNYXAiLCJwcmV2Wm9vbV8iLCJnZXRab29tIiwidGhhdCIsImV2ZW50IiwiYWRkTGlzdGVuZXIiLCJ6b29tIiwicmVzZXRWaWV3cG9ydCIsInJlZHJhdyIsImxlbmd0aCIsImFkZE1hcmtlcnMiLCJwcm90b3R5cGUiLCJvYmoxIiwib2JqMiIsIm9iamVjdCIsInByb3BlcnR5IiwiYXBwbHkiLCJvbkFkZCIsInNldFJlYWR5XyIsImRyYXciLCJpIiwic2l6ZSIsInB1c2giLCJ1cmwiLCJoZWlnaHQiLCJ3aWR0aCIsImZpdE1hcFRvTWFya2VycyIsIm1hcmtlcnMiLCJnZXRNYXJrZXJzIiwiYm91bmRzIiwiTGF0TG5nQm91bmRzIiwibWFya2VyIiwiZ2V0UG9zaXRpb24iLCJmaXRCb3VuZHMiLCJzZXRTdHlsZXMiLCJzdHlsZXMiLCJnZXRTdHlsZXMiLCJpc1pvb21PbkNsaWNrIiwiaXNBdmVyYWdlQ2VudGVyIiwiZ2V0VG90YWxNYXJrZXJzIiwic2V0TWF4Wm9vbSIsIm1heFpvb20iLCJnZXRNYXhab29tIiwiY2FsY3VsYXRvcl8iLCJudW1TdHlsZXMiLCJpbmRleCIsImNvdW50IiwiZHYiLCJwYXJzZUludCIsIk1hdGgiLCJtaW4iLCJ0ZXh0Iiwic2V0Q2FsY3VsYXRvciIsImNhbGN1bGF0b3IiLCJnZXRDYWxjdWxhdG9yIiwib3B0X25vZHJhdyIsInB1c2hNYXJrZXJUb18iLCJpc0FkZGVkIiwicmVwYWludCIsImFkZE1hcmtlciIsInJlbW92ZU1hcmtlcl8iLCJpbmRleE9mIiwibSIsInNwbGljZSIsInJlbW92ZU1hcmtlciIsInJlbW92ZWQiLCJyZW1vdmVNYXJrZXJzIiwiciIsInJlYWR5IiwiY3JlYXRlQ2x1c3RlcnNfIiwiZ2V0VG90YWxDbHVzdGVycyIsImdldE1hcCIsImdldEdyaWRTaXplIiwic2V0R3JpZFNpemUiLCJnZXRNaW5DbHVzdGVyU2l6ZSIsInNldE1pbkNsdXN0ZXJTaXplIiwiZ2V0RXh0ZW5kZWRCb3VuZHMiLCJwcm9qZWN0aW9uIiwiZ2V0UHJvamVjdGlvbiIsInRyIiwiTGF0TG5nIiwiZ2V0Tm9ydGhFYXN0IiwibGF0IiwibG5nIiwiYmwiLCJnZXRTb3V0aFdlc3QiLCJ0clBpeCIsImZyb21MYXRMbmdUb0RpdlBpeGVsIiwieCIsInkiLCJibFBpeCIsIm5lIiwiZnJvbURpdlBpeGVsVG9MYXRMbmciLCJzdyIsImlzTWFya2VySW5Cb3VuZHNfIiwiY29udGFpbnMiLCJjbGVhck1hcmtlcnMiLCJvcHRfaGlkZSIsImNsdXN0ZXIiLCJyZW1vdmUiLCJvbGRDbHVzdGVycyIsInNsaWNlIiwid2luZG93Iiwic2V0VGltZW91dCIsImRpc3RhbmNlQmV0d2VlblBvaW50c18iLCJwMSIsInAyIiwiUiIsImRMYXQiLCJQSSIsImRMb24iLCJhIiwic2luIiwiY29zIiwiYyIsImF0YW4yIiwic3FydCIsImQiLCJhZGRUb0Nsb3Nlc3RDbHVzdGVyXyIsImRpc3RhbmNlIiwiY2x1c3RlclRvQWRkVG8iLCJwb3MiLCJjZW50ZXIiLCJnZXRDZW50ZXIiLCJpc01hcmtlckluQ2x1c3RlckJvdW5kcyIsIkNsdXN0ZXIiLCJtYXBCb3VuZHMiLCJnZXRCb3VuZHMiLCJtYXJrZXJDbHVzdGVyZXIiLCJtYXJrZXJDbHVzdGVyZXJfIiwiY2VudGVyXyIsImJvdW5kc18iLCJjbHVzdGVySWNvbl8iLCJDbHVzdGVySWNvbiIsImlzTWFya2VyQWxyZWFkeUFkZGVkIiwiY2FsY3VsYXRlQm91bmRzXyIsImwiLCJsZW4iLCJ1cGRhdGVJY29uIiwiZ2V0TWFya2VyQ2x1c3RlcmVyIiwiZ2V0U2l6ZSIsIm16IiwiaGlkZSIsInN1bXMiLCJzZXRDZW50ZXIiLCJzZXRTdW1zIiwic2hvdyIsIm9wdF9wYWRkaW5nIiwicGFkZGluZ18iLCJjbHVzdGVyXyIsImRpdl8iLCJzdW1zXyIsInZpc2libGVfIiwidHJpZ2dlckNsdXN0ZXJDbGljayIsInRyaWdnZXIiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJnZXRQb3NGcm9tTGF0TG5nXyIsInN0eWxlIiwiY3NzVGV4dCIsImNyZWF0ZUNzcyIsImlubmVySFRNTCIsInBhbmVzIiwiZ2V0UGFuZXMiLCJvdmVybGF5TW91c2VUYXJnZXQiLCJhcHBlbmRDaGlsZCIsImFkZERvbUxpc3RlbmVyIiwibGF0bG5nIiwid2lkdGhfIiwiaGVpZ2h0XyIsInRvcCIsImxlZnQiLCJkaXNwbGF5Iiwib25SZW1vdmUiLCJwYXJlbnROb2RlIiwicmVtb3ZlQ2hpbGQiLCJ0ZXh0XyIsImluZGV4XyIsInVzZVN0eWxlIiwibWF4IiwidXJsXyIsInRleHRDb2xvcl8iLCJhbmNob3JfIiwidGV4dFNpemVfIiwiZm9udEZhbWlseV8iLCJmb250V2VpZ2h0XyIsImJhY2tncm91bmRQb3NpdGlvbl8iLCJiYWNrZ3JvdW5kUG9zaXRpb24iLCJfdHlwZW9mIiwidHh0Q29sb3IiLCJ0eHRTaXplIiwiZm9udEZhbWlseSIsImZvbnRXZWlnaHQiLCJqb2luIiwiZ2xvYmFsIiwibW9kdWxlIiwiZXhwb3J0cyIsImZhY3RvcnkiLCJkZWZpbmUiLCJhbWQiLCJyZXF1aXJlIiwialF1ZXJ5IiwiJCIsIkJhclJhdGluZyIsInNlbGYiLCJ3cmFwRWxlbWVudCIsImNsYXNzZXMiLCJ0aGVtZSIsIiRlbGVtIiwid3JhcCIsInVud3JhcEVsZW1lbnQiLCJ1bndyYXAiLCJmaW5kT3B0aW9uIiwidmFsdWUiLCJpc051bWVyaWMiLCJmbG9vciIsImdldEluaXRpYWxPcHRpb24iLCJpbml0aWFsUmF0aW5nIiwiZ2V0RW1wdHlPcHRpb24iLCIkZW1wdHlPcHQiLCJmaW5kIiwiZW1wdHlWYWx1ZSIsImFsbG93RW1wdHkiLCJwcmVwZW5kVG8iLCJnZXREYXRhIiwia2V5IiwiZGF0YSIsInNldERhdGEiLCJzYXZlRGF0YU9uRWxlbWVudCIsIiRvcHQiLCJ2YWwiLCJlbXB0eVRleHQiLCJ1c2VyT3B0aW9ucyIsInJhdGluZ1ZhbHVlIiwicmF0aW5nVGV4dCIsIm9yaWdpbmFsUmF0aW5nVmFsdWUiLCJvcmlnaW5hbFJhdGluZ1RleHQiLCJlbXB0eVJhdGluZ1ZhbHVlIiwiZW1wdHlSYXRpbmdUZXh0IiwicmVhZE9ubHkiLCJyZWFkb25seSIsInJhdGluZ01hZGUiLCJyZW1vdmVEYXRhT25FbGVtZW50IiwicmVtb3ZlRGF0YSIsImJ1aWxkV2lkZ2V0IiwiJHciLCJlYWNoIiwiaHRtbCIsIiRhIiwic2hvd1ZhbHVlcyIsImFwcGVuZCIsInNob3dTZWxlY3RlZFJhdGluZyIsInJldmVyc2UiLCJhZGRDbGFzcyIsIm5leHRBbGxvclByZXZpb3VzQWxsIiwic2V0U2VsZWN0RmllbGRWYWx1ZSIsInByb3AiLCJjaGFuZ2UiLCJyZXNldFNlbGVjdEZpZWxkIiwiZGVmYXVsdFNlbGVjdGVkIiwicGFyZW50IiwiZnJhY3Rpb24iLCJyb3VuZCIsInJlc2V0U3R5bGUiLCIkd2lkZ2V0IiwicmVtb3ZlQ2xhc3MiLCJtYXRjaCIsImFwcGx5U3R5bGUiLCJiYXNlVmFsdWUiLCJmIiwiJGFsbCIsIiRmcmFjdGlvbmFsIiwiaXNEZXNlbGVjdGFibGUiLCIkZWxlbWVudCIsImRlc2VsZWN0YWJsZSIsImF0dHIiLCJhdHRhY2hDbGlja0hhbmRsZXIiLCIkZWxlbWVudHMiLCJvbiIsInByZXZlbnREZWZhdWx0Iiwib25TZWxlY3QiLCJjYWxsIiwiYXR0YWNoTW91c2VFbnRlckhhbmRsZXIiLCJhdHRhY2hNb3VzZUxlYXZlSGFuZGxlciIsImZhc3RDbGlja3MiLCJzdG9wUHJvcGFnYXRpb24iLCJjbGljayIsImRpc2FibGVDbGlja3MiLCJhdHRhY2hIYW5kbGVycyIsImhvdmVyU3RhdGUiLCJkZXRhY2hIYW5kbGVycyIsIm9mZiIsInNldHVwSGFuZGxlcnMiLCJpbnNlcnRBZnRlciIsInN0YXRlIiwidG9nZ2xlQ2xhc3MiLCJzZXQiLCJzaWxlbnQiLCJjbGVhciIsIm9uQ2xlYXIiLCJkZXN0cm95Iiwib25EZXN0cm95IiwiaW5pdCIsImVsZW0iLCJmbiIsImJhcnJhdGluZyIsImRlZmF1bHRzIiwibWV0aG9kIiwicGx1Z2luIiwiaXMiLCJlcnJvciIsImhhc093blByb3BlcnR5IiwibmV4dCIsInNlYXJjaERhdGEiLCJzZWFyY2hEb25lIiwiY2FsZW5kYXJMb2FkZWQiLCJzYXZlZHdpZHRoIiwibGFyZ2UiLCJyZXNpemVkIiwic2Nsb2FkZWQiLCJGb3VuZGF0aW9uIiwiYWRkVG9KcXVlcnkiLCJmb3VuZGF0aW9uIiwiY2hlY2tTY3JlZW5XaWR0aCIsImJhcnMiLCIkY3RyaWdnZXIiLCJsb2FkQ2FsZW5kYXIiLCJlIiwiJGZvcm0iLCJhamF4IiwidHlwZSIsInNlcmlhbGl6ZSIsImRhdGFUeXBlIiwic3VjY2VzcyIsInJlc3VsdCIsImZvcm1SZXNwb25zZSIsImxvY2F0aW9uIiwiaHJlZiIsIm1lc3NhZ2UiLCIkbW9kYWwiLCJSZXZlYWwiLCJvcGVuIiwiY3NzIiwibW9kYWxpZCIsInRyaW0iLCJhamF4dXJsIiwiY29udGVudCIsImdldFNjcmlwdCIsImluaXRpYWxpemVTdHJpcGUiLCJwaWQiLCJiYXIiLCJnZXRQcm9wZXJ0aWVzIiwiY2hpbGRyZW4iLCJ0b2dnbGUiLCJzZXRBY3RpdmVNZW51IiwidGFyZ2V0IiwiJHByb3BzIiwiJHRhYnMiLCJzcGVjaWFsIiwidG91Y2hzdGFydCIsInNldHVwIiwiXyIsIm5zIiwiaGFuZGxlIiwiaW5jbHVkZXMiLCJhZGRFdmVudExpc3RlbmVyIiwicGFzc2l2ZSIsInRvdWNobW92ZSIsImlkIiwicmVwbGFjZSIsInJlZGlyZWN0IiwiYWN0aW9uIiwiYWN0aW9uX3ZhbHVlIiwicmVsb2FkIiwidmFscyIsInNldFNlYXJjaERhdGEiLCJyZXNwb25zZSIsIiRzaWRlYmFyIiwiZW1wdHkiLCJmYWRlSW4iLCJzY3JvbGxUbyIsInNlYXJjaGJhciIsInNjcmVlbldpZHRoSGFzQ2hhbmdlZCIsIk1lZGlhUXVlcnkiLCJhdExlYXN0Iiwib3JpZ2luIiwicHJvdG9jb2wiLCJob3N0IiwibXlDb25maXJtIiwiJG15VGFzayIsIktyY29uZmlybSIsImNvbnN0cnVjdG9yIiwiZm9ybSIsInVwZGF0ZVF1b3RlIiwic2VyaWFsaXplQXJyYXkiLCJkaXYiLCJjaGVja1Rlcm1zIiwidGVzdCIsImdldEVsZW1lbnRCeUlkIiwidGVzdGMiLCJ0ZXN0dCIsImFncmVlY2hlY2siLCJjaGVja2VkIiwiYWdyZWVjaGVja2MiLCJhZ3JlZWNoZWNrdCIsIm15S3JEb2JFbnRyeSIsInRvZGF5IiwiQkFDS1NQQUNFIiwic2V0dGluZ3MiLCJjdXN0b21fdmFsaWRhdGlvbiIsImRheXNfaW5fbW9udGgiLCJkb2N1bWVudF9kYXRlIiwiZXJyb3Jib3hfeCIsImVycm9yYm94X3kiLCJmaWVsZF9oaW50X3RleHRfZGF5IiwiZmllbGRfaGludF90ZXh0X21vbnRoIiwiZmllbGRfaGludF90ZXh0X3llYXIiLCJmaWVsZF9vcmRlciIsImZpZWxkX3dpZHRoX2RheSIsImZpZWxkX3dpZHRoX21vbnRoIiwiZmllbGRfd2lkdGhfeWVhciIsImZpZWxkX3dpZHRoX3NlcCIsIm1pbm1heCIsIm1pbl9kYXRlIiwibWF4X2RhdGUiLCJtaW5feWVhciIsIm1vbnRoX25hbWUiLCJvbl9ibHVyIiwib25fZXJyb3IiLCJvbl9jaGFuZ2UiLCJwYXJzZV9kYXRlIiwic2VwYXJhdG9yIiwic2hvd19lcnJvcnMiLCJzaG93X2hpbnRzIiwiRV9EQVlfTkFOIiwiRV9EQVlfVE9PX0JJRyIsIkVfREFZX1RPT19TTUFMTCIsIkVfQkFEX0RBWV9GT1JfTU9OVEgiLCJFX01PTlRIX05BTiIsIkVfTU9OVEhfVE9PX0JJRyIsIkVfTU9OVEhfVE9PX1NNQUxMIiwiRV9ZRUFSX05BTiIsIkVfWUVBUl9MRU5HVEgiLCJFX1lFQVJfVE9PX1NNQUxMIiwiRV9NSU5fREFURSIsIkVfTUFYX0RBVEUiLCJLckRvYkVudHJ5IiwiZ2V0WW1kIiwiRGF0ZSIsImlucHV0X2RheSIsImlucHV0X21vbnRoIiwiaW5wdXRfeWVhciIsImRhdGUiLCJnZXRNb250aCIsImdldERheSIsImdldEZ1bGxZZWFyIiwiZ2V0WW1kT2JqZWN0IiwieWVhciIsIm1vbnRoIiwiZGF5IiwiYWRkRW50cnlGaWVsZHMiLCJkb2JmaWVsZCIsImZpZWxkcyIsInNwbGl0IiwiZmllbGQiLCJidWlsZEZpZWxkIiwiYWZ0ZXJQYXN0ZSIsInBhcnNlRGF0ZSIsInNldERhdGUiLCJuYW1lIiwia3Jkb2JlbnRyeSIsImlucHV0IiwiS3JEb2JJbnB1dCIsImhpbnRfdGV4dCIsImlubmVyIiwiJGlucHV0IiwiYnVpbGRVaSIsIndyYXBwZXIiLCJlcnJvcmJveCIsInNldEZpZWxkV2lkdGhzIiwiY2hlY2tEb2N1bWVudCIsImRvYiIsImNoaWxkZG9iIiwiY2xhc3NuYW1lIiwiZWxlbWVudHMiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiY2xlYXJFcnJvciIsImVycm9yX3RleHQiLCJzaG93RXJyb3IiLCJmb2N1cyIsInNldEZvY3VzIiwiZm9jdXNGaWVsZEJlZm9yZSIsInlpZWxkRm9jdXMiLCJmb2N1c0ZpZWxkQWZ0ZXIiLCJmb2N1c0luIiwiZm9jdXNPdXQiLCJ3aWRnZXRGb2N1c0xvc3QiLCJnZXREYXRlIiwiZGF5X3ZhbHVlIiwibW9udGhfdmFsdWUiLCJ5ZWFyX3ZhbHVlIiwicHJveHlMYWJlbENsaWNrcyIsInBhcnNlSXNvRGF0ZSIsIlJlZ0V4cCIsIiQzIiwiJDIiLCIkMSIsIm5ld19kYXRlIiwidmFsaWRhdGUiLCJzZXRFcnJvciIsImF2YWlsYWJsZSIsInRvdGFsIiwic2V0V2lkdGgiLCJzZXRSZWFkb25seSIsIm1vZGUiLCJ3aWRnZXRFcnJvclRleHQiLCJ4X29mZnNldCIsIm91dGVyV2lkdGgiLCJ5X29mZnNldCIsInBvc2l0aW9uIiwiY3VycmVudF9pbnB1dCIsInZhbGlkYXRlRGF5IiwidmFsaWRhdGVNb250aCIsInZhbGlkYXRlWWVhciIsInZhbGlkYXRlRGF5c0luTW9udGgiLCJ2YWxpZGF0ZUNvbXBsZXRlRGF0ZSIsImRhdGVfc3RyIiwiZGF0ZV9vYmoiLCJkYXRlX2lzbyIsIm9wdCIsImdldCIsImhhc19mb2N1cyIsIm51bSIsIm1zZyIsInRvU3RyaW5nIiwib25CbHVyIiwicHJveHkiLCJibHVyIiwia2V5ZG93biIsImtleXVwIiwic2hvd19oaW50Iiwia2V5X2lzX2Rvd24iLCJoYXNDbGFzcyIsImlzRGlnaXRLZXkiLCJrZXljb2RlIiwid2hpY2giLCJ3YW50IiwibmV3X3ZhbHVlIiwic2VsZWN0X2FsbCIsInNlbGVjdCIsIm5ld193aWR0aCIsImhvd3RvYXJyaXZlIiwiYXJyaXZhbG1lYW5zIiwiZ2V0QXR0cmlidXRlIiwiZGlzcGxheUFycml2YWwiLCJjbGFzc0xpc3QiLCJhcnJpdmFsZGF0YSIsImFkZCIsIm92Q2hpbGRyZW4iLCJvdlN0YXRlIiwib3ZQcyIsIiRvdkJ0biIsImZjQ2hpbGRyZW4iLCJmY1N0YXRlIiwiJGZjQnRuIiwidHRDaGlsZHJlbiIsInR0U3RhdGUiLCJ0dFBzIiwiJHR0QnRuIiwidHRwYXJhcyIsImN1cnJlbnRQYXJhZ3JhcGgiLCJockVsZW1lbnQiLCJhZnRlciIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJkb0hScyIsInBhcmFncmFwaHMiLCJuZXh0RWxlbWVudFNpYmxpbmciLCJ0YWdOYW1lIiwibGFuZyIsIm1hcmtlcnNoYXBlIiwiY29vcmRzIiwibXlLcm1hcCIsIm1hcERhdGEiLCJtYXBab29tIiwiaW5mb1dpbmRvdyIsImluZm9XaW5kb3cyIiwicHJvcGVydHlkaXYiLCJwcm9wZXJ0eWljb24iLCJtYyIsInByb3BlcnR5TWFya2VycyIsImZpbHRlcklkcyIsIm1hcE1hcmtlcnMiLCJtYXBUeXBlSWQiLCJtYXBNYXhab29tIiwibWFwVHlwZSIsIm1hcElkIiwibWFya2VyQ29sb3IiLCJLcm1hcCIsImdtT3B0aW9ucyIsInNjcm9sbHdoZWVsIiwic3RyZWV0Vmlld0NvbnRyb2wiLCJnbWFya2VycyIsImluaXRNYXAiLCJjbG9zZUtySW5mb3dpbmRvdyIsImNsb3NlIiwic2hvd1Zpc2libGVNYXJrZXJzIiwic2V0VmlzaWJsZSIsImNoZWNrRHVwbGljYXRlIiwiY3VycmVudCIsImR1cHMiLCJlcXVhbHMiLCJuZXdMYXQiLCJuZXdMbmciLCJjaGVja1pvb20iLCJteWxpc3RlbmVyIiwic2V0Wm9vbSIsImNsdXN0ZXJNYXAiLCJtY09wdGlvbnMiLCJncmlkU2l6ZSIsImlnbm9yZUhpZGRlbk1hcmtlcnMiLCJpbWFnZVBhdGgiLCJzZXRQcm9wZXJ0eU1hcmtlcnMiLCJzZXRNYXBNYXJrZXJzIiwiY3JlYXRlTWFwIiwiTWFwIiwiSW5mb1dpbmRvdyIsImNyZWF0ZU1hcE1hcmtlciIsInBvaW50IiwiaW1hZ2UiLCJib3hpbmZvIiwibGluayIsInRpdGxlIiwiTWFya2VyIiwic2hhcGUiLCJpY29uIiwiekluZGV4Iiwic2V0Q29udGVudCIsImNyZWF0ZVByb3BlcnR5TWFya2VyIiwiY29sb3IiLCJub3QiLCJzbGljayIsIm5leHRBcnJvdyIsInByZXZBcnJvdyIsImF1dG9wbGF5Iiwic29sb01hcCIsInJlZnJlc2hNYXAiLCIkbWFwbW9kYWwiLCJhbGVydCIsInJlc2V0TWFwIiwiYW1hcmsiLCJtYXJrZXJpY29uIiwiU2l6ZSIsIlBvaW50IiwiYW5jaG9yIiwibXlMaXN0ZW5lciIsImZvdW5kIiwiY3VycmVudFpvb20iLCJraWNrTWFwIiwibWFwX21vZGFsIiwiJHNvbG9UcmlnZ2VyIiwib25lIiwiJHRyaWdnZXIiLCJteUtycm91dGUiLCJkaXJlY3Rpb25zRGlzcGxheSIsImRpcmVjdGlvbnNWaXNpYmxlIiwicm91dGVNYXAiLCJkZXN0aW5hdGlvbiIsInJvdXRlTWFya2VycyIsInJvdXRlU3RvcFBvaW50cyIsImRldG91ciIsImRpcmVjdGlvbnNQYW5lbCIsImRpcmVjdGlvbnNTZXJ2aWNlIiwiS3Jyb3V0ZSIsIkRpcmVjdGlvbnNTZXJ2aWNlIiwiY2xlYXJSb3V0ZU1hcmtlcnMiLCJjbGVhcldheXBvaW50cyIsImFkZFJvdXRlTWFya2VyIiwiY2FsY1JvdXRlIiwiZnJvbV9hZGRyZXNzIiwiRGlyZWN0aW9uc1RyYXZlbE1vZGUiLCJCSUNZQ0xJTkciLCJEUklWSU5HIiwiV0FMS0lORyIsInJlcXVlc3QiLCJ3YXlwb2ludHMiLCJ0cmF2ZWxNb2RlIiwiYXZvaWRIaWdod2F5cyIsImF2b2lkVG9sbHMiLCJyb3V0ZSIsInN0YXR1cyIsIkRpcmVjdGlvbnNTdGF0dXMiLCJPSyIsInNldERpcmVjdGlvbnMiLCJyZXNldFJvdXRlIiwibXlPcHRpb25zIiwiRGlyZWN0aW9uc1JlbmRlcmVyIiwic2V0UGFuZWwiLCJNYXJrZXJJbWFnZSIsImxhdExuZyIsInN0b3BvdmVyIiwiYWRkTGlzdGVuZXJPbmNlIiwiZGlyZWN0aW9uUGFuZWwiLCJhZGRyZXNzU3RyaW5nIiwiY29vcmQiLCJhZGRyZXNzIiwianNvbmRhdGEiLCJteUdtYXAiXSwic291cmNlUm9vdCI6IiJ9