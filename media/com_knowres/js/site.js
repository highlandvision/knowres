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
    checkZoom() {
      if (this.settings.mapZoom > 0) {
        let mylistener = map.addListener('idle', function () {
          if (map.getZoom() !== this.settings.mapZoom) {
            map.setZoom(this.settings.mapZoom);
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
      this.checkZoom();
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
    mapMaxZoom: 16,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUMsQ0FBQztNQUUzRCxJQUFJNUIsR0FBRyxHQUFHLG9EQUFvRDtNQUM5RCxJQUFJMHFCLEtBQUssR0FBRyxFQUFFO01BRWR4ZixNQUFNLENBQUNpSSxJQUFJLENBQUM7UUFDWEMsSUFBSSxFQUFNLE1BQU07UUFDaEJwVCxHQUFHLEVBQU9BLEdBQUc7UUFDYjJNLElBQUksRUFBTTtVQUFDZ2UsT0FBTyxFQUFFRjtRQUFhLENBQUM7UUFDbENuWCxRQUFRLEVBQUUsTUFBTTtRQUNoQkMsT0FBTyxFQUFHLFNBQUFBLENBQVVxWCxRQUFRLEVBQUU7VUFDN0IxZixNQUFNLENBQUM2QyxJQUFJLENBQUM2YyxRQUFRLEVBQUUsVUFBVWxlLEdBQUcsRUFBRUssR0FBRyxFQUFFO1lBQ3pDLElBQUlzSyxHQUFHLEdBQUcsR0FBRyxHQUFHM0ssR0FBRztZQUNuQnhCLE1BQU0sQ0FBQ21NLEdBQUcsQ0FBQyxDQUFDdEssR0FBRyxDQUFDQSxHQUFHLENBQUM7WUFDcEIyZCxLQUFLLENBQUNoZSxHQUFHLENBQUMsR0FBR0ssR0FBRztZQUNoQjhkLE1BQU0sQ0FBQzVELFVBQVUsQ0FBQ3lELEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRUEsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLEtBQUssQ0FBQztVQUNyRCxDQUFDLENBQUM7UUFDSDtNQUNELENBQUMsQ0FBQztJQUNILENBQUMsQ0FBQztFQUNILENBQUMsQ0FBQztBQUNILENBQUMsRUFBQ3hmLE1BQU0sQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN1BUO0FBQ2dEO0FBQ2Y7QUFDUDtBQUNJO0FBQ0M7QUFDQztBQUNEO0FBQ0wiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9rci8uL25vZGVfbW9kdWxlcy9pcy1tYXJrZXItY2x1c3RlcmVyL3NyYy9tYXJrZXJjbHVzdGVyZXIuanMiLCJ3ZWJwYWNrOi8va3IvLi9ub2RlX21vZHVsZXMvanF1ZXJ5LWJhci1yYXRpbmcvanF1ZXJ5LmJhcnJhdGluZy5qcyIsIndlYnBhY2s6Ly9rci8uL3NyYy9tZWRpYS9jb21fa25vd3Jlcy9qcy9zcmMvc2l0ZS9hcHAuanMiLCJ3ZWJwYWNrOi8va3IvLi9zcmMvbWVkaWEvY29tX2tub3dyZXMvanMvc3JjL3NpdGUvY29uZmlybS5qcyIsIndlYnBhY2s6Ly9rci8uL3NyYy9tZWRpYS9jb21fa25vd3Jlcy9qcy9zcmMvc2l0ZS9kb2JlbnRyeS5qcyIsIndlYnBhY2s6Ly9rci8uL3NyYy9tZWRpYS9jb21fa25vd3Jlcy9qcy9zcmMvc2l0ZS9ndWVzdGRhdGEuanMiLCJ3ZWJwYWNrOi8va3IvLi9zcmMvbWVkaWEvY29tX2tub3dyZXMvanMvc3JjL3NpdGUvbWFnZWxsYW4uanMiLCJ3ZWJwYWNrOi8va3IvLi9zcmMvbWVkaWEvY29tX2tub3dyZXMvanMvc3JjL3NpdGUvbWFwLmpzIiwid2VicGFjazovL2tyLy4vc3JjL21lZGlhL2NvbV9rbm93cmVzL2pzL3NyYy9zaXRlL3JvdXRlLmpzIiwid2VicGFjazovL2tyLy4vd2VicGFjay5idWlsZC5zaXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogTnBtIHZlcnNpb24gb2YgbWFya2VyQ2x1c3RlcmVyIHdvcmtzIGdyZWF0IHdpdGggYnJvd3NlcmlmeVxuICogRGlmZmVyZW5jZSBmcm9tIHRoZSBvcmlnaW5hbCAtIGFkZHMgYSBjb21tb25qcyBmb3JtYXQgYW5kIHJlcGxhY2VzIHdpbmRvdyB3aXRoIGdsb2JhbCBhbmQgc29tZSB1bml0IHRlc3RcbiAqIFRoZSBvcmlnaW5hbCBmdW5jdGlvbmFsaXR5IGl0J3Mgbm90IG1vZGlmaWVkIGZvciBkb2NzIGFuZCBvcmlnaW5hbCBzb3VyY2UgY2hlY2tcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9nb29nbGVtYXBzL2pzLW1hcmtlci1jbHVzdGVyZXJcbiAqL1xuXG4vKipcbiAqIEBuYW1lIE1hcmtlckNsdXN0ZXJlciBmb3IgR29vZ2xlIE1hcHMgdjNcbiAqIEB2ZXJzaW9uIHZlcnNpb24gMS4wXG4gKiBAYXV0aG9yIEx1a2UgTWFoZVxuICogQGZpbGVvdmVydmlld1xuICogVGhlIGxpYnJhcnkgY3JlYXRlcyBhbmQgbWFuYWdlcyBwZXItem9vbS1sZXZlbCBjbHVzdGVycyBmb3IgbGFyZ2UgYW1vdW50cyBvZlxuICogbWFya2Vycy5cbiAqIDxici8+XG4gKiBUaGlzIGlzIGEgdjMgaW1wbGVtZW50YXRpb24gb2YgdGhlXG4gKiA8YSBocmVmPVwiaHR0cDovL2dtYXBzLXV0aWxpdHktbGlicmFyeS1kZXYuZ29vZ2xlY29kZS5jb20vc3ZuL3RhZ3MvbWFya2VyY2x1c3RlcmVyL1wiXG4gKiA+djIgTWFya2VyQ2x1c3RlcmVyPC9hPi5cbiAqL1xuXG4vKipcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5cbi8qKlxuICogQSBNYXJrZXIgQ2x1c3RlcmVyIHRoYXQgY2x1c3RlcnMgbWFya2Vycy5cbiAqXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLk1hcH0gbWFwIFRoZSBHb29nbGUgbWFwIHRvIGF0dGFjaCB0by5cbiAqIEBwYXJhbSB7QXJyYXkuPGdvb2dsZS5tYXBzLk1hcmtlcj49fSBvcHRfbWFya2VycyBPcHRpb25hbCBtYXJrZXJzIHRvIGFkZCB0b1xuICogICB0aGUgY2x1c3Rlci5cbiAqIEBwYXJhbSB7T2JqZWN0PX0gb3B0X29wdGlvbnMgc3VwcG9ydCB0aGUgZm9sbG93aW5nIG9wdGlvbnM6XG4gKiAgICAgJ2dyaWRTaXplJzogKG51bWJlcikgVGhlIGdyaWQgc2l6ZSBvZiBhIGNsdXN0ZXIgaW4gcGl4ZWxzLlxuICogICAgICdtYXhab29tJzogKG51bWJlcikgVGhlIG1heGltdW0gem9vbSBsZXZlbCB0aGF0IGEgbWFya2VyIGNhbiBiZSBwYXJ0IG9mIGFcbiAqICAgICAgICAgICAgICAgIGNsdXN0ZXIuXG4gKiAgICAgJ3pvb21PbkNsaWNrJzogKGJvb2xlYW4pIFdoZXRoZXIgdGhlIGRlZmF1bHQgYmVoYXZpb3VyIG9mIGNsaWNraW5nIG9uIGFcbiAqICAgICAgICAgICAgICAgICAgICBjbHVzdGVyIGlzIHRvIHpvb20gaW50byBpdC5cbiAqICAgICAnYXZlcmFnZUNlbnRlcic6IChib29sZWFuKSBXZXRoZXIgdGhlIGNlbnRlciBvZiBlYWNoIGNsdXN0ZXIgc2hvdWxkIGJlXG4gKiAgICAgICAgICAgICAgICAgICAgICB0aGUgYXZlcmFnZSBvZiBhbGwgbWFya2VycyBpbiB0aGUgY2x1c3Rlci5cbiAqICAgICAnbWluaW11bUNsdXN0ZXJTaXplJzogKG51bWJlcikgVGhlIG1pbmltdW0gbnVtYmVyIG9mIG1hcmtlcnMgdG8gYmUgaW4gYVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICBjbHVzdGVyIGJlZm9yZSB0aGUgbWFya2VycyBhcmUgaGlkZGVuIGFuZCBhIGNvdW50XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzIHNob3duLlxuICogICAgICdzdHlsZXMnOiAob2JqZWN0KSBBbiBvYmplY3QgdGhhdCBoYXMgc3R5bGUgcHJvcGVydGllczpcbiAqICAgICAgICd1cmwnOiAoc3RyaW5nKSBUaGUgaW1hZ2UgdXJsLlxuICogICAgICAgJ2hlaWdodCc6IChudW1iZXIpIFRoZSBpbWFnZSBoZWlnaHQuXG4gKiAgICAgICAnd2lkdGgnOiAobnVtYmVyKSBUaGUgaW1hZ2Ugd2lkdGguXG4gKiAgICAgICAnYW5jaG9yJzogKEFycmF5KSBUaGUgYW5jaG9yIHBvc2l0aW9uIG9mIHRoZSBsYWJlbCB0ZXh0LlxuICogICAgICAgJ3RleHRDb2xvcic6IChzdHJpbmcpIFRoZSB0ZXh0IGNvbG9yLlxuICogICAgICAgJ3RleHRTaXplJzogKG51bWJlcikgVGhlIHRleHQgc2l6ZS5cbiAqICAgICAgICdmb250RmFtaWx5JzogKHN0cmluZykgVGhlIGZvbnQgZmFtaWx5LlxuICogICAgICAgJ2ZvbnRXZWlnaHQnOiAoc3RyaW5nKSBUaGUgZm9udCB3ZWlnaHQuXG4gKiAgICAgICAnYmFja2dyb3VuZFBvc2l0aW9uJzogKHN0cmluZykgVGhlIHBvc2l0aW9uIG9mIHRoZSBiYWNrZ291bmQgeCwgeS5cbiAqIEBjb25zdHJ1Y3RvclxuICogQGV4dGVuZHMgZ29vZ2xlLm1hcHMuT3ZlcmxheVZpZXdcbiAqL1xuZnVuY3Rpb24gTWFya2VyQ2x1c3RlcmVyKG1hcCwgb3B0X21hcmtlcnMsIG9wdF9vcHRpb25zKSB7XG4gIC8vIE1hcmtlckNsdXN0ZXJlciBpbXBsZW1lbnRzIGdvb2dsZS5tYXBzLk92ZXJsYXlWaWV3IGludGVyZmFjZS4gV2UgdXNlIHRoZVxuICAvLyBleHRlbmQgZnVuY3Rpb24gdG8gZXh0ZW5kIE1hcmtlckNsdXN0ZXJlciB3aXRoIGdvb2dsZS5tYXBzLk92ZXJsYXlWaWV3XG4gIC8vIGJlY2F1c2UgaXQgbWlnaHQgbm90IGFsd2F5cyBiZSBhdmFpbGFibGUgd2hlbiB0aGUgY29kZSBpcyBkZWZpbmVkIHNvIHdlXG4gIC8vIGxvb2sgZm9yIGl0IGF0IHRoZSBsYXN0IHBvc3NpYmxlIG1vbWVudC4gSWYgaXQgZG9lc24ndCBleGlzdCBub3cgdGhlblxuICAvLyB0aGVyZSBpcyBubyBwb2ludCBnb2luZyBhaGVhZCA6KVxuICB0aGlzLmV4dGVuZChNYXJrZXJDbHVzdGVyZXIsIGdvb2dsZS5tYXBzLk92ZXJsYXlWaWV3KTtcbiAgdGhpcy5tYXBfID0gbWFwO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7QXJyYXkuPGdvb2dsZS5tYXBzLk1hcmtlcj59XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICB0aGlzLm1hcmtlcnNfID0gW107XG5cbiAgLyoqXG4gICAqICBAdHlwZSB7QXJyYXkuPENsdXN0ZXI+fVxuICAgKi9cbiAgdGhpcy5jbHVzdGVyc18gPSBbXTtcblxuICB0aGlzLnNpemVzID0gWzUzLCA1NiwgNjYsIDc4LCA5MF07XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICB0aGlzLnN0eWxlc18gPSBbXTtcblxuICAvKipcbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICB0aGlzLnJlYWR5XyA9IGZhbHNlO1xuXG4gIHZhciBvcHRpb25zID0gb3B0X29wdGlvbnMgfHwge307XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICB0aGlzLmdyaWRTaXplXyA9IG9wdGlvbnNbJ2dyaWRTaXplJ10gfHwgNjA7XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICB0aGlzLm1pbkNsdXN0ZXJTaXplXyA9IG9wdGlvbnNbJ21pbmltdW1DbHVzdGVyU2l6ZSddIHx8IDI7XG5cblxuICAvKipcbiAgICogQHR5cGUgez9udW1iZXJ9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICB0aGlzLm1heFpvb21fID0gb3B0aW9uc1snbWF4Wm9vbSddIHx8IG51bGw7XG5cbiAgdGhpcy5zdHlsZXNfID0gb3B0aW9uc1snc3R5bGVzJ10gfHwgW107XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICB0aGlzLmltYWdlUGF0aF8gPSBvcHRpb25zWydpbWFnZVBhdGgnXSB8fFxuICAgICAgdGhpcy5NQVJLRVJfQ0xVU1RFUl9JTUFHRV9QQVRIXztcblxuICAvKipcbiAgICogQHR5cGUge3N0cmluZ31cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHRoaXMuaW1hZ2VFeHRlbnNpb25fID0gb3B0aW9uc1snaW1hZ2VFeHRlbnNpb24nXSB8fFxuICAgICAgdGhpcy5NQVJLRVJfQ0xVU1RFUl9JTUFHRV9FWFRFTlNJT05fO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHRoaXMuem9vbU9uQ2xpY2tfID0gdHJ1ZTtcblxuICBpZiAob3B0aW9uc1snem9vbU9uQ2xpY2snXSAhPSB1bmRlZmluZWQpIHtcbiAgICB0aGlzLnpvb21PbkNsaWNrXyA9IG9wdGlvbnNbJ3pvb21PbkNsaWNrJ107XG4gIH1cblxuICAvKipcbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICB0aGlzLmF2ZXJhZ2VDZW50ZXJfID0gZmFsc2U7XG5cbiAgaWYgKG9wdGlvbnNbJ2F2ZXJhZ2VDZW50ZXInXSAhPSB1bmRlZmluZWQpIHtcbiAgICB0aGlzLmF2ZXJhZ2VDZW50ZXJfID0gb3B0aW9uc1snYXZlcmFnZUNlbnRlciddO1xuICB9XG5cbiAgdGhpcy5zZXR1cFN0eWxlc18oKTtcblxuICB0aGlzLnNldE1hcChtYXApO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgdGhpcy5wcmV2Wm9vbV8gPSB0aGlzLm1hcF8uZ2V0Wm9vbSgpO1xuXG4gIC8vIEFkZCB0aGUgbWFwIGV2ZW50IGxpc3RlbmVyc1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKHRoaXMubWFwXywgJ3pvb21fY2hhbmdlZCcsIGZ1bmN0aW9uKCkge1xuICAgIHZhciB6b29tID0gdGhhdC5tYXBfLmdldFpvb20oKTtcblxuICAgIGlmICh0aGF0LnByZXZab29tXyAhPSB6b29tKSB7XG4gICAgICB0aGF0LnByZXZab29tXyA9IHpvb207XG4gICAgICB0aGF0LnJlc2V0Vmlld3BvcnQoKTtcbiAgICB9XG4gIH0pO1xuXG4gIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKHRoaXMubWFwXywgJ2lkbGUnLCBmdW5jdGlvbigpIHtcbiAgICB0aGF0LnJlZHJhdygpO1xuICB9KTtcblxuICAvLyBGaW5hbGx5LCBhZGQgdGhlIG1hcmtlcnNcbiAgaWYgKG9wdF9tYXJrZXJzICYmIG9wdF9tYXJrZXJzLmxlbmd0aCkge1xuICAgIHRoaXMuYWRkTWFya2VycyhvcHRfbWFya2VycywgZmFsc2UpO1xuICB9XG59XG5cblxuLyoqXG4gKiBUaGUgbWFya2VyIGNsdXN0ZXIgaW1hZ2UgcGF0aC5cbiAqXG4gKiBAdHlwZSB7c3RyaW5nfVxuICogQHByaXZhdGVcbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5NQVJLRVJfQ0xVU1RFUl9JTUFHRV9QQVRIXyA9XG4gICAgJ2h0dHA6Ly9nb29nbGUtbWFwcy11dGlsaXR5LWxpYnJhcnktdjMuZ29vZ2xlY29kZS5jb20vc3ZuL3RydW5rL21hcmtlcmNsdXN0ZXJlci8nICtcbiAgICAnaW1hZ2VzL20nO1xuXG5cbi8qKlxuICogVGhlIG1hcmtlciBjbHVzdGVyIGltYWdlIHBhdGguXG4gKlxuICogQHR5cGUge3N0cmluZ31cbiAqIEBwcml2YXRlXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuTUFSS0VSX0NMVVNURVJfSU1BR0VfRVhURU5TSU9OXyA9ICdwbmcnO1xuXG5cbi8qKlxuICogRXh0ZW5kcyBhIG9iamVjdHMgcHJvdG90eXBlIGJ5IGFub3RoZXJzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmoxIFRoZSBvYmplY3QgdG8gYmUgZXh0ZW5kZWQuXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqMiBUaGUgb2JqZWN0IHRvIGV4dGVuZCB3aXRoLlxuICogQHJldHVybiB7T2JqZWN0fSBUaGUgbmV3IGV4dGVuZGVkIG9iamVjdC5cbiAqIEBpZ25vcmVcbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5leHRlbmQgPSBmdW5jdGlvbihvYmoxLCBvYmoyKSB7XG4gIHJldHVybiAoZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgZm9yICh2YXIgcHJvcGVydHkgaW4gb2JqZWN0LnByb3RvdHlwZSkge1xuICAgICAgdGhpcy5wcm90b3R5cGVbcHJvcGVydHldID0gb2JqZWN0LnByb3RvdHlwZVtwcm9wZXJ0eV07XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9KS5hcHBseShvYmoxLCBbb2JqMl0pO1xufTtcblxuXG4vKipcbiAqIEltcGxlbWVudGFpb24gb2YgdGhlIGludGVyZmFjZSBtZXRob2QuXG4gKiBAaWdub3JlXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUub25BZGQgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5zZXRSZWFkeV8odHJ1ZSk7XG59O1xuXG4vKipcbiAqIEltcGxlbWVudGFpb24gb2YgdGhlIGludGVyZmFjZSBtZXRob2QuXG4gKiBAaWdub3JlXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZHJhdyA9IGZ1bmN0aW9uKCkge307XG5cbi8qKlxuICogU2V0cyB1cCB0aGUgc3R5bGVzIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnNldHVwU3R5bGVzXyA9IGZ1bmN0aW9uKCkge1xuICBpZiAodGhpcy5zdHlsZXNfLmxlbmd0aCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwLCBzaXplOyBzaXplID0gdGhpcy5zaXplc1tpXTsgaSsrKSB7XG4gICAgdGhpcy5zdHlsZXNfLnB1c2goe1xuICAgICAgdXJsOiB0aGlzLmltYWdlUGF0aF8gKyAoaSArIDEpICsgJy4nICsgdGhpcy5pbWFnZUV4dGVuc2lvbl8sXG4gICAgICBoZWlnaHQ6IHNpemUsXG4gICAgICB3aWR0aDogc2l6ZVxuICAgIH0pO1xuICB9XG59O1xuXG4vKipcbiAqICBGaXQgdGhlIG1hcCB0byB0aGUgYm91bmRzIG9mIHRoZSBtYXJrZXJzIGluIHRoZSBjbHVzdGVyZXIuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZml0TWFwVG9NYXJrZXJzID0gZnVuY3Rpb24oKSB7XG4gIHZhciBtYXJrZXJzID0gdGhpcy5nZXRNYXJrZXJzKCk7XG4gIHZhciBib3VuZHMgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nQm91bmRzKCk7XG4gIGZvciAodmFyIGkgPSAwLCBtYXJrZXI7IG1hcmtlciA9IG1hcmtlcnNbaV07IGkrKykge1xuICAgIGJvdW5kcy5leHRlbmQobWFya2VyLmdldFBvc2l0aW9uKCkpO1xuICB9XG5cbiAgdGhpcy5tYXBfLmZpdEJvdW5kcyhib3VuZHMpO1xufTtcblxuXG4vKipcbiAqICBTZXRzIHRoZSBzdHlsZXMuXG4gKlxuICogIEBwYXJhbSB7T2JqZWN0fSBzdHlsZXMgVGhlIHN0eWxlIHRvIHNldC5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5zZXRTdHlsZXMgPSBmdW5jdGlvbihzdHlsZXMpIHtcbiAgdGhpcy5zdHlsZXNfID0gc3R5bGVzO1xufTtcblxuXG4vKipcbiAqICBHZXRzIHRoZSBzdHlsZXMuXG4gKlxuICogIEByZXR1cm4ge09iamVjdH0gVGhlIHN0eWxlcyBvYmplY3QuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0U3R5bGVzID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnN0eWxlc187XG59O1xuXG5cbi8qKlxuICogV2hldGhlciB6b29tIG9uIGNsaWNrIGlzIHNldC5cbiAqXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIHpvb21PbkNsaWNrXyBpcyBzZXQuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuaXNab29tT25DbGljayA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy56b29tT25DbGlja187XG59O1xuXG4vKipcbiAqIFdoZXRoZXIgYXZlcmFnZSBjZW50ZXIgaXMgc2V0LlxuICpcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgYXZlcmFnZUNlbnRlcl8gaXMgc2V0LlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmlzQXZlcmFnZUNlbnRlciA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5hdmVyYWdlQ2VudGVyXztcbn07XG5cblxuLyoqXG4gKiAgUmV0dXJucyB0aGUgYXJyYXkgb2YgbWFya2VycyBpbiB0aGUgY2x1c3RlcmVyLlxuICpcbiAqICBAcmV0dXJuIHtBcnJheS48Z29vZ2xlLm1hcHMuTWFya2VyPn0gVGhlIG1hcmtlcnMuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0TWFya2VycyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5tYXJrZXJzXztcbn07XG5cblxuLyoqXG4gKiAgUmV0dXJucyB0aGUgbnVtYmVyIG9mIG1hcmtlcnMgaW4gdGhlIGNsdXN0ZXJlclxuICpcbiAqICBAcmV0dXJuIHtOdW1iZXJ9IFRoZSBudW1iZXIgb2YgbWFya2Vycy5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRUb3RhbE1hcmtlcnMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMubWFya2Vyc18ubGVuZ3RoO1xufTtcblxuXG4vKipcbiAqICBTZXRzIHRoZSBtYXggem9vbSBmb3IgdGhlIGNsdXN0ZXJlci5cbiAqXG4gKiAgQHBhcmFtIHtudW1iZXJ9IG1heFpvb20gVGhlIG1heCB6b29tIGxldmVsLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnNldE1heFpvb20gPSBmdW5jdGlvbihtYXhab29tKSB7XG4gIHRoaXMubWF4Wm9vbV8gPSBtYXhab29tO1xufTtcblxuXG4vKipcbiAqICBHZXRzIHRoZSBtYXggem9vbSBmb3IgdGhlIGNsdXN0ZXJlci5cbiAqXG4gKiAgQHJldHVybiB7bnVtYmVyfSBUaGUgbWF4IHpvb20gbGV2ZWwuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0TWF4Wm9vbSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5tYXhab29tXztcbn07XG5cblxuLyoqXG4gKiAgVGhlIGZ1bmN0aW9uIGZvciBjYWxjdWxhdGluZyB0aGUgY2x1c3RlciBpY29uIGltYWdlLlxuICpcbiAqICBAcGFyYW0ge0FycmF5Ljxnb29nbGUubWFwcy5NYXJrZXI+fSBtYXJrZXJzIFRoZSBtYXJrZXJzIGluIHRoZSBjbHVzdGVyZXIuXG4gKiAgQHBhcmFtIHtudW1iZXJ9IG51bVN0eWxlcyBUaGUgbnVtYmVyIG9mIHN0eWxlcyBhdmFpbGFibGUuXG4gKiAgQHJldHVybiB7T2JqZWN0fSBBIG9iamVjdCBwcm9wZXJ0aWVzOiAndGV4dCcgKHN0cmluZykgYW5kICdpbmRleCcgKG51bWJlcikuXG4gKiAgQHByaXZhdGVcbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5jYWxjdWxhdG9yXyA9IGZ1bmN0aW9uKG1hcmtlcnMsIG51bVN0eWxlcykge1xuICB2YXIgaW5kZXggPSAwO1xuICB2YXIgY291bnQgPSBtYXJrZXJzLmxlbmd0aDtcbiAgdmFyIGR2ID0gY291bnQ7XG4gIHdoaWxlIChkdiAhPT0gMCkge1xuICAgIGR2ID0gcGFyc2VJbnQoZHYgLyAxMCwgMTApO1xuICAgIGluZGV4Kys7XG4gIH1cblxuICBpbmRleCA9IE1hdGgubWluKGluZGV4LCBudW1TdHlsZXMpO1xuICByZXR1cm4ge1xuICAgIHRleHQ6IGNvdW50LFxuICAgIGluZGV4OiBpbmRleFxuICB9O1xufTtcblxuXG4vKipcbiAqIFNldCB0aGUgY2FsY3VsYXRvciBmdW5jdGlvbi5cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKEFycmF5LCBudW1iZXIpfSBjYWxjdWxhdG9yIFRoZSBmdW5jdGlvbiB0byBzZXQgYXMgdGhlXG4gKiAgICAgY2FsY3VsYXRvci4gVGhlIGZ1bmN0aW9uIHNob3VsZCByZXR1cm4gYSBvYmplY3QgcHJvcGVydGllczpcbiAqICAgICAndGV4dCcgKHN0cmluZykgYW5kICdpbmRleCcgKG51bWJlcikuXG4gKlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnNldENhbGN1bGF0b3IgPSBmdW5jdGlvbihjYWxjdWxhdG9yKSB7XG4gIHRoaXMuY2FsY3VsYXRvcl8gPSBjYWxjdWxhdG9yO1xufTtcblxuXG4vKipcbiAqIEdldCB0aGUgY2FsY3VsYXRvciBmdW5jdGlvbi5cbiAqXG4gKiBAcmV0dXJuIHtmdW5jdGlvbihBcnJheSwgbnVtYmVyKX0gdGhlIGNhbGN1bGF0b3IgZnVuY3Rpb24uXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0Q2FsY3VsYXRvciA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5jYWxjdWxhdG9yXztcbn07XG5cblxuLyoqXG4gKiBBZGQgYW4gYXJyYXkgb2YgbWFya2VycyB0byB0aGUgY2x1c3RlcmVyLlxuICpcbiAqIEBwYXJhbSB7QXJyYXkuPGdvb2dsZS5tYXBzLk1hcmtlcj59IG1hcmtlcnMgVGhlIG1hcmtlcnMgdG8gYWRkLlxuICogQHBhcmFtIHtib29sZWFuPX0gb3B0X25vZHJhdyBXaGV0aGVyIHRvIHJlZHJhdyB0aGUgY2x1c3RlcnMuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuYWRkTWFya2VycyA9IGZ1bmN0aW9uKG1hcmtlcnMsIG9wdF9ub2RyYXcpIHtcbiAgZm9yICh2YXIgaSA9IDAsIG1hcmtlcjsgbWFya2VyID0gbWFya2Vyc1tpXTsgaSsrKSB7XG4gICAgdGhpcy5wdXNoTWFya2VyVG9fKG1hcmtlcik7XG4gIH1cbiAgaWYgKCFvcHRfbm9kcmF3KSB7XG4gICAgdGhpcy5yZWRyYXcoKTtcbiAgfVxufTtcblxuXG4vKipcbiAqIFB1c2hlcyBhIG1hcmtlciB0byB0aGUgY2x1c3RlcmVyLlxuICpcbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTWFya2VyfSBtYXJrZXIgVGhlIG1hcmtlciB0byBhZGQuXG4gKiBAcHJpdmF0ZVxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnB1c2hNYXJrZXJUb18gPSBmdW5jdGlvbihtYXJrZXIpIHtcbiAgbWFya2VyLmlzQWRkZWQgPSBmYWxzZTtcbiAgaWYgKG1hcmtlclsnZHJhZ2dhYmxlJ10pIHtcbiAgICAvLyBJZiB0aGUgbWFya2VyIGlzIGRyYWdnYWJsZSBhZGQgYSBsaXN0ZW5lciBzbyB3ZSB1cGRhdGUgdGhlIGNsdXN0ZXJzIG9uXG4gICAgLy8gdGhlIGRyYWcgZW5kLlxuICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYXJrZXIsICdkcmFnZW5kJywgZnVuY3Rpb24oKSB7XG4gICAgICBtYXJrZXIuaXNBZGRlZCA9IGZhbHNlO1xuICAgICAgdGhhdC5yZXBhaW50KCk7XG4gICAgfSk7XG4gIH1cbiAgdGhpcy5tYXJrZXJzXy5wdXNoKG1hcmtlcik7XG59O1xuXG5cbi8qKlxuICogQWRkcyBhIG1hcmtlciB0byB0aGUgY2x1c3RlcmVyIGFuZCByZWRyYXdzIGlmIG5lZWRlZC5cbiAqXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLk1hcmtlcn0gbWFya2VyIFRoZSBtYXJrZXIgdG8gYWRkLlxuICogQHBhcmFtIHtib29sZWFuPX0gb3B0X25vZHJhdyBXaGV0aGVyIHRvIHJlZHJhdyB0aGUgY2x1c3RlcnMuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuYWRkTWFya2VyID0gZnVuY3Rpb24obWFya2VyLCBvcHRfbm9kcmF3KSB7XG4gIHRoaXMucHVzaE1hcmtlclRvXyhtYXJrZXIpO1xuICBpZiAoIW9wdF9ub2RyYXcpIHtcbiAgICB0aGlzLnJlZHJhdygpO1xuICB9XG59O1xuXG5cbi8qKlxuICogUmVtb3ZlcyBhIG1hcmtlciBhbmQgcmV0dXJucyB0cnVlIGlmIHJlbW92ZWQsIGZhbHNlIGlmIG5vdFxuICpcbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTWFya2VyfSBtYXJrZXIgVGhlIG1hcmtlciB0byByZW1vdmVcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFdoZXRoZXIgdGhlIG1hcmtlciB3YXMgcmVtb3ZlZCBvciBub3RcbiAqIEBwcml2YXRlXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUucmVtb3ZlTWFya2VyXyA9IGZ1bmN0aW9uKG1hcmtlcikge1xuICB2YXIgaW5kZXggPSAtMTtcbiAgaWYgKHRoaXMubWFya2Vyc18uaW5kZXhPZikge1xuICAgIGluZGV4ID0gdGhpcy5tYXJrZXJzXy5pbmRleE9mKG1hcmtlcik7XG4gIH0gZWxzZSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIG07IG0gPSB0aGlzLm1hcmtlcnNfW2ldOyBpKyspIHtcbiAgICAgIGlmIChtID09IG1hcmtlcikge1xuICAgICAgICBpbmRleCA9IGk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmIChpbmRleCA9PSAtMSkge1xuICAgIC8vIE1hcmtlciBpcyBub3QgaW4gb3VyIGxpc3Qgb2YgbWFya2Vycy5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBtYXJrZXIuc2V0TWFwKG51bGwpO1xuXG4gIHRoaXMubWFya2Vyc18uc3BsaWNlKGluZGV4LCAxKTtcblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cblxuLyoqXG4gKiBSZW1vdmUgYSBtYXJrZXIgZnJvbSB0aGUgY2x1c3Rlci5cbiAqXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLk1hcmtlcn0gbWFya2VyIFRoZSBtYXJrZXIgdG8gcmVtb3ZlLlxuICogQHBhcmFtIHtib29sZWFuPX0gb3B0X25vZHJhdyBPcHRpb25hbCBib29sZWFuIHRvIGZvcmNlIG5vIHJlZHJhdy5cbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdGhlIG1hcmtlciB3YXMgcmVtb3ZlZC5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5yZW1vdmVNYXJrZXIgPSBmdW5jdGlvbihtYXJrZXIsIG9wdF9ub2RyYXcpIHtcbiAgdmFyIHJlbW92ZWQgPSB0aGlzLnJlbW92ZU1hcmtlcl8obWFya2VyKTtcblxuICBpZiAoIW9wdF9ub2RyYXcgJiYgcmVtb3ZlZCkge1xuICAgIHRoaXMucmVzZXRWaWV3cG9ydCgpO1xuICAgIHRoaXMucmVkcmF3KCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSB7XG4gICByZXR1cm4gZmFsc2U7XG4gIH1cbn07XG5cblxuLyoqXG4gKiBSZW1vdmVzIGFuIGFycmF5IG9mIG1hcmtlcnMgZnJvbSB0aGUgY2x1c3Rlci5cbiAqXG4gKiBAcGFyYW0ge0FycmF5Ljxnb29nbGUubWFwcy5NYXJrZXI+fSBtYXJrZXJzIFRoZSBtYXJrZXJzIHRvIHJlbW92ZS5cbiAqIEBwYXJhbSB7Ym9vbGVhbj19IG9wdF9ub2RyYXcgT3B0aW9uYWwgYm9vbGVhbiB0byBmb3JjZSBubyByZWRyYXcuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUucmVtb3ZlTWFya2VycyA9IGZ1bmN0aW9uKG1hcmtlcnMsIG9wdF9ub2RyYXcpIHtcbiAgdmFyIHJlbW92ZWQgPSBmYWxzZTtcblxuICBmb3IgKHZhciBpID0gMCwgbWFya2VyOyBtYXJrZXIgPSBtYXJrZXJzW2ldOyBpKyspIHtcbiAgICB2YXIgciA9IHRoaXMucmVtb3ZlTWFya2VyXyhtYXJrZXIpO1xuICAgIHJlbW92ZWQgPSByZW1vdmVkIHx8IHI7XG4gIH1cblxuICBpZiAoIW9wdF9ub2RyYXcgJiYgcmVtb3ZlZCkge1xuICAgIHRoaXMucmVzZXRWaWV3cG9ydCgpO1xuICAgIHRoaXMucmVkcmF3KCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG5cblxuLyoqXG4gKiBTZXRzIHRoZSBjbHVzdGVyZXIncyByZWFkeSBzdGF0ZS5cbiAqXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHJlYWR5IFRoZSBzdGF0ZS5cbiAqIEBwcml2YXRlXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuc2V0UmVhZHlfID0gZnVuY3Rpb24ocmVhZHkpIHtcbiAgaWYgKCF0aGlzLnJlYWR5Xykge1xuICAgIHRoaXMucmVhZHlfID0gcmVhZHk7XG4gICAgdGhpcy5jcmVhdGVDbHVzdGVyc18oKTtcbiAgfVxufTtcblxuXG4vKipcbiAqIFJldHVybnMgdGhlIG51bWJlciBvZiBjbHVzdGVycyBpbiB0aGUgY2x1c3RlcmVyLlxuICpcbiAqIEByZXR1cm4ge251bWJlcn0gVGhlIG51bWJlciBvZiBjbHVzdGVycy5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRUb3RhbENsdXN0ZXJzID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmNsdXN0ZXJzXy5sZW5ndGg7XG59O1xuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgZ29vZ2xlIG1hcCB0aGF0IHRoZSBjbHVzdGVyZXIgaXMgYXNzb2NpYXRlZCB3aXRoLlxuICpcbiAqIEByZXR1cm4ge2dvb2dsZS5tYXBzLk1hcH0gVGhlIG1hcC5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRNYXAgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMubWFwXztcbn07XG5cblxuLyoqXG4gKiBTZXRzIHRoZSBnb29nbGUgbWFwIHRoYXQgdGhlIGNsdXN0ZXJlciBpcyBhc3NvY2lhdGVkIHdpdGguXG4gKlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5NYXB9IG1hcCBUaGUgbWFwLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnNldE1hcCA9IGZ1bmN0aW9uKG1hcCkge1xuICB0aGlzLm1hcF8gPSBtYXA7XG59O1xuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgc2l6ZSBvZiB0aGUgZ3JpZC5cbiAqXG4gKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSBncmlkIHNpemUuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0R3JpZFNpemUgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuZ3JpZFNpemVfO1xufTtcblxuXG4vKipcbiAqIFNldHMgdGhlIHNpemUgb2YgdGhlIGdyaWQuXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IHNpemUgVGhlIGdyaWQgc2l6ZS5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5zZXRHcmlkU2l6ZSA9IGZ1bmN0aW9uKHNpemUpIHtcbiAgdGhpcy5ncmlkU2l6ZV8gPSBzaXplO1xufTtcblxuXG4vKipcbiAqIFJldHVybnMgdGhlIG1pbiBjbHVzdGVyIHNpemUuXG4gKlxuICogQHJldHVybiB7bnVtYmVyfSBUaGUgZ3JpZCBzaXplLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldE1pbkNsdXN0ZXJTaXplID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLm1pbkNsdXN0ZXJTaXplXztcbn07XG5cbi8qKlxuICogU2V0cyB0aGUgbWluIGNsdXN0ZXIgc2l6ZS5cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gc2l6ZSBUaGUgZ3JpZCBzaXplLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnNldE1pbkNsdXN0ZXJTaXplID0gZnVuY3Rpb24oc2l6ZSkge1xuICB0aGlzLm1pbkNsdXN0ZXJTaXplXyA9IHNpemU7XG59O1xuXG5cbi8qKlxuICogRXh0ZW5kcyBhIGJvdW5kcyBvYmplY3QgYnkgdGhlIGdyaWQgc2l6ZS5cbiAqXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLkxhdExuZ0JvdW5kc30gYm91bmRzIFRoZSBib3VuZHMgdG8gZXh0ZW5kLlxuICogQHJldHVybiB7Z29vZ2xlLm1hcHMuTGF0TG5nQm91bmRzfSBUaGUgZXh0ZW5kZWQgYm91bmRzLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldEV4dGVuZGVkQm91bmRzID0gZnVuY3Rpb24oYm91bmRzKSB7XG4gIHZhciBwcm9qZWN0aW9uID0gdGhpcy5nZXRQcm9qZWN0aW9uKCk7XG5cbiAgLy8gVHVybiB0aGUgYm91bmRzIGludG8gbGF0bG5nLlxuICB2YXIgdHIgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKGJvdW5kcy5nZXROb3J0aEVhc3QoKS5sYXQoKSxcbiAgICAgIGJvdW5kcy5nZXROb3J0aEVhc3QoKS5sbmcoKSk7XG4gIHZhciBibCA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoYm91bmRzLmdldFNvdXRoV2VzdCgpLmxhdCgpLFxuICAgICAgYm91bmRzLmdldFNvdXRoV2VzdCgpLmxuZygpKTtcblxuICAvLyBDb252ZXJ0IHRoZSBwb2ludHMgdG8gcGl4ZWxzIGFuZCB0aGUgZXh0ZW5kIG91dCBieSB0aGUgZ3JpZCBzaXplLlxuICB2YXIgdHJQaXggPSBwcm9qZWN0aW9uLmZyb21MYXRMbmdUb0RpdlBpeGVsKHRyKTtcbiAgdHJQaXgueCArPSB0aGlzLmdyaWRTaXplXztcbiAgdHJQaXgueSAtPSB0aGlzLmdyaWRTaXplXztcblxuICB2YXIgYmxQaXggPSBwcm9qZWN0aW9uLmZyb21MYXRMbmdUb0RpdlBpeGVsKGJsKTtcbiAgYmxQaXgueCAtPSB0aGlzLmdyaWRTaXplXztcbiAgYmxQaXgueSArPSB0aGlzLmdyaWRTaXplXztcblxuICAvLyBDb252ZXJ0IHRoZSBwaXhlbCBwb2ludHMgYmFjayB0byBMYXRMbmdcbiAgdmFyIG5lID0gcHJvamVjdGlvbi5mcm9tRGl2UGl4ZWxUb0xhdExuZyh0clBpeCk7XG4gIHZhciBzdyA9IHByb2plY3Rpb24uZnJvbURpdlBpeGVsVG9MYXRMbmcoYmxQaXgpO1xuXG4gIC8vIEV4dGVuZCB0aGUgYm91bmRzIHRvIGNvbnRhaW4gdGhlIG5ldyBib3VuZHMuXG4gIGJvdW5kcy5leHRlbmQobmUpO1xuICBib3VuZHMuZXh0ZW5kKHN3KTtcblxuICByZXR1cm4gYm91bmRzO1xufTtcblxuXG4vKipcbiAqIERldGVybWlucyBpZiBhIG1hcmtlciBpcyBjb250YWluZWQgaW4gYSBib3VuZHMuXG4gKlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5NYXJrZXJ9IG1hcmtlciBUaGUgbWFya2VyIHRvIGNoZWNrLlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5MYXRMbmdCb3VuZHN9IGJvdW5kcyBUaGUgYm91bmRzIHRvIGNoZWNrIGFnYWluc3QuXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIHRoZSBtYXJrZXIgaXMgaW4gdGhlIGJvdW5kcy5cbiAqIEBwcml2YXRlXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuaXNNYXJrZXJJbkJvdW5kc18gPSBmdW5jdGlvbihtYXJrZXIsIGJvdW5kcykge1xuICByZXR1cm4gYm91bmRzLmNvbnRhaW5zKG1hcmtlci5nZXRQb3NpdGlvbigpKTtcbn07XG5cblxuLyoqXG4gKiBDbGVhcnMgYWxsIGNsdXN0ZXJzIGFuZCBtYXJrZXJzIGZyb20gdGhlIGNsdXN0ZXJlci5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5jbGVhck1hcmtlcnMgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5yZXNldFZpZXdwb3J0KHRydWUpO1xuXG4gIC8vIFNldCB0aGUgbWFya2VycyBhIGVtcHR5IGFycmF5LlxuICB0aGlzLm1hcmtlcnNfID0gW107XG59O1xuXG5cbi8qKlxuICogQ2xlYXJzIGFsbCBleGlzdGluZyBjbHVzdGVycyBhbmQgcmVjcmVhdGVzIHRoZW0uXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdF9oaWRlIFRvIGFsc28gaGlkZSB0aGUgbWFya2VyLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnJlc2V0Vmlld3BvcnQgPSBmdW5jdGlvbihvcHRfaGlkZSkge1xuICAvLyBSZW1vdmUgYWxsIHRoZSBjbHVzdGVyc1xuICBmb3IgKHZhciBpID0gMCwgY2x1c3RlcjsgY2x1c3RlciA9IHRoaXMuY2x1c3RlcnNfW2ldOyBpKyspIHtcbiAgICBjbHVzdGVyLnJlbW92ZSgpO1xuICB9XG5cbiAgLy8gUmVzZXQgdGhlIG1hcmtlcnMgdG8gbm90IGJlIGFkZGVkIGFuZCB0byBiZSBpbnZpc2libGUuXG4gIGZvciAodmFyIGkgPSAwLCBtYXJrZXI7IG1hcmtlciA9IHRoaXMubWFya2Vyc19baV07IGkrKykge1xuICAgIG1hcmtlci5pc0FkZGVkID0gZmFsc2U7XG4gICAgaWYgKG9wdF9oaWRlKSB7XG4gICAgICBtYXJrZXIuc2V0TWFwKG51bGwpO1xuICAgIH1cbiAgfVxuXG4gIHRoaXMuY2x1c3RlcnNfID0gW107XG59O1xuXG4vKipcbiAqXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUucmVwYWludCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgb2xkQ2x1c3RlcnMgPSB0aGlzLmNsdXN0ZXJzXy5zbGljZSgpO1xuICB0aGlzLmNsdXN0ZXJzXy5sZW5ndGggPSAwO1xuICB0aGlzLnJlc2V0Vmlld3BvcnQoKTtcbiAgdGhpcy5yZWRyYXcoKTtcblxuICAvLyBSZW1vdmUgdGhlIG9sZCBjbHVzdGVycy5cbiAgLy8gRG8gaXQgaW4gYSB0aW1lb3V0IHNvIHRoZSBvdGhlciBjbHVzdGVycyBoYXZlIGJlZW4gZHJhd24gZmlyc3QuXG4gIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgIGZvciAodmFyIGkgPSAwLCBjbHVzdGVyOyBjbHVzdGVyID0gb2xkQ2x1c3RlcnNbaV07IGkrKykge1xuICAgICAgY2x1c3Rlci5yZW1vdmUoKTtcbiAgICB9XG4gIH0sIDApO1xufTtcblxuXG4vKipcbiAqIFJlZHJhd3MgdGhlIGNsdXN0ZXJzLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnJlZHJhdyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmNyZWF0ZUNsdXN0ZXJzXygpO1xufTtcblxuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGRpc3RhbmNlIGJldHdlZW4gdHdvIGxhdGxuZyBsb2NhdGlvbnMgaW4ga20uXG4gKiBAc2VlIGh0dHA6Ly93d3cubW92YWJsZS10eXBlLmNvLnVrL3NjcmlwdHMvbGF0bG9uZy5odG1sXG4gKlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5MYXRMbmd9IHAxIFRoZSBmaXJzdCBsYXQgbG5nIHBvaW50LlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5MYXRMbmd9IHAyIFRoZSBzZWNvbmQgbGF0IGxuZyBwb2ludC5cbiAqIEByZXR1cm4ge251bWJlcn0gVGhlIGRpc3RhbmNlIGJldHdlZW4gdGhlIHR3byBwb2ludHMgaW4ga20uXG4gKiBAcHJpdmF0ZVxuKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZGlzdGFuY2VCZXR3ZWVuUG9pbnRzXyA9IGZ1bmN0aW9uKHAxLCBwMikge1xuICBpZiAoIXAxIHx8ICFwMikge1xuICAgIHJldHVybiAwO1xuICB9XG5cbiAgdmFyIFIgPSA2MzcxOyAvLyBSYWRpdXMgb2YgdGhlIEVhcnRoIGluIGttXG4gIHZhciBkTGF0ID0gKHAyLmxhdCgpIC0gcDEubGF0KCkpICogTWF0aC5QSSAvIDE4MDtcbiAgdmFyIGRMb24gPSAocDIubG5nKCkgLSBwMS5sbmcoKSkgKiBNYXRoLlBJIC8gMTgwO1xuICB2YXIgYSA9IE1hdGguc2luKGRMYXQgLyAyKSAqIE1hdGguc2luKGRMYXQgLyAyKSArXG4gICAgTWF0aC5jb3MocDEubGF0KCkgKiBNYXRoLlBJIC8gMTgwKSAqIE1hdGguY29zKHAyLmxhdCgpICogTWF0aC5QSSAvIDE4MCkgKlxuICAgIE1hdGguc2luKGRMb24gLyAyKSAqIE1hdGguc2luKGRMb24gLyAyKTtcbiAgdmFyIGMgPSAyICogTWF0aC5hdGFuMihNYXRoLnNxcnQoYSksIE1hdGguc3FydCgxIC0gYSkpO1xuICB2YXIgZCA9IFIgKiBjO1xuICByZXR1cm4gZDtcbn07XG5cblxuLyoqXG4gKiBBZGQgYSBtYXJrZXIgdG8gYSBjbHVzdGVyLCBvciBjcmVhdGVzIGEgbmV3IGNsdXN0ZXIuXG4gKlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5NYXJrZXJ9IG1hcmtlciBUaGUgbWFya2VyIHRvIGFkZC5cbiAqIEBwcml2YXRlXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuYWRkVG9DbG9zZXN0Q2x1c3Rlcl8gPSBmdW5jdGlvbihtYXJrZXIpIHtcbiAgdmFyIGRpc3RhbmNlID0gNDAwMDA7IC8vIFNvbWUgbGFyZ2UgbnVtYmVyXG4gIHZhciBjbHVzdGVyVG9BZGRUbyA9IG51bGw7XG4gIHZhciBwb3MgPSBtYXJrZXIuZ2V0UG9zaXRpb24oKTtcbiAgZm9yICh2YXIgaSA9IDAsIGNsdXN0ZXI7IGNsdXN0ZXIgPSB0aGlzLmNsdXN0ZXJzX1tpXTsgaSsrKSB7XG4gICAgdmFyIGNlbnRlciA9IGNsdXN0ZXIuZ2V0Q2VudGVyKCk7XG4gICAgaWYgKGNlbnRlcikge1xuICAgICAgdmFyIGQgPSB0aGlzLmRpc3RhbmNlQmV0d2VlblBvaW50c18oY2VudGVyLCBtYXJrZXIuZ2V0UG9zaXRpb24oKSk7XG4gICAgICBpZiAoZCA8IGRpc3RhbmNlKSB7XG4gICAgICAgIGRpc3RhbmNlID0gZDtcbiAgICAgICAgY2x1c3RlclRvQWRkVG8gPSBjbHVzdGVyO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmIChjbHVzdGVyVG9BZGRUbyAmJiBjbHVzdGVyVG9BZGRUby5pc01hcmtlckluQ2x1c3RlckJvdW5kcyhtYXJrZXIpKSB7XG4gICAgY2x1c3RlclRvQWRkVG8uYWRkTWFya2VyKG1hcmtlcik7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGNsdXN0ZXIgPSBuZXcgQ2x1c3Rlcih0aGlzKTtcbiAgICBjbHVzdGVyLmFkZE1hcmtlcihtYXJrZXIpO1xuICAgIHRoaXMuY2x1c3RlcnNfLnB1c2goY2x1c3Rlcik7XG4gIH1cbn07XG5cblxuLyoqXG4gKiBDcmVhdGVzIHRoZSBjbHVzdGVycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmNyZWF0ZUNsdXN0ZXJzXyA9IGZ1bmN0aW9uKCkge1xuICBpZiAoIXRoaXMucmVhZHlfKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gR2V0IG91ciBjdXJyZW50IG1hcCB2aWV3IGJvdW5kcy5cbiAgLy8gQ3JlYXRlIGEgbmV3IGJvdW5kcyBvYmplY3Qgc28gd2UgZG9uJ3QgYWZmZWN0IHRoZSBtYXAuXG4gIHZhciBtYXBCb3VuZHMgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nQm91bmRzKHRoaXMubWFwXy5nZXRCb3VuZHMoKS5nZXRTb3V0aFdlc3QoKSxcbiAgICAgIHRoaXMubWFwXy5nZXRCb3VuZHMoKS5nZXROb3J0aEVhc3QoKSk7XG4gIHZhciBib3VuZHMgPSB0aGlzLmdldEV4dGVuZGVkQm91bmRzKG1hcEJvdW5kcyk7XG5cbiAgZm9yICh2YXIgaSA9IDAsIG1hcmtlcjsgbWFya2VyID0gdGhpcy5tYXJrZXJzX1tpXTsgaSsrKSB7XG4gICAgaWYgKCFtYXJrZXIuaXNBZGRlZCAmJiB0aGlzLmlzTWFya2VySW5Cb3VuZHNfKG1hcmtlciwgYm91bmRzKSkge1xuICAgICAgdGhpcy5hZGRUb0Nsb3Nlc3RDbHVzdGVyXyhtYXJrZXIpO1xuICAgIH1cbiAgfVxufTtcblxuXG4vKipcbiAqIEEgY2x1c3RlciB0aGF0IGNvbnRhaW5zIG1hcmtlcnMuXG4gKlxuICogQHBhcmFtIHtNYXJrZXJDbHVzdGVyZXJ9IG1hcmtlckNsdXN0ZXJlciBUaGUgbWFya2VyY2x1c3RlcmVyIHRoYXQgdGhpc1xuICogICAgIGNsdXN0ZXIgaXMgYXNzb2NpYXRlZCB3aXRoLlxuICogQGNvbnN0cnVjdG9yXG4gKiBAaWdub3JlXG4gKi9cbmZ1bmN0aW9uIENsdXN0ZXIobWFya2VyQ2x1c3RlcmVyKSB7XG4gIHRoaXMubWFya2VyQ2x1c3RlcmVyXyA9IG1hcmtlckNsdXN0ZXJlcjtcbiAgdGhpcy5tYXBfID0gbWFya2VyQ2x1c3RlcmVyLmdldE1hcCgpO1xuICB0aGlzLmdyaWRTaXplXyA9IG1hcmtlckNsdXN0ZXJlci5nZXRHcmlkU2l6ZSgpO1xuICB0aGlzLm1pbkNsdXN0ZXJTaXplXyA9IG1hcmtlckNsdXN0ZXJlci5nZXRNaW5DbHVzdGVyU2l6ZSgpO1xuICB0aGlzLmF2ZXJhZ2VDZW50ZXJfID0gbWFya2VyQ2x1c3RlcmVyLmlzQXZlcmFnZUNlbnRlcigpO1xuICB0aGlzLmNlbnRlcl8gPSBudWxsO1xuICB0aGlzLm1hcmtlcnNfID0gW107XG4gIHRoaXMuYm91bmRzXyA9IG51bGw7XG4gIHRoaXMuY2x1c3Rlckljb25fID0gbmV3IENsdXN0ZXJJY29uKHRoaXMsIG1hcmtlckNsdXN0ZXJlci5nZXRTdHlsZXMoKSxcbiAgICAgIG1hcmtlckNsdXN0ZXJlci5nZXRHcmlkU2l6ZSgpKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbnMgaWYgYSBtYXJrZXIgaXMgYWxyZWFkeSBhZGRlZCB0byB0aGUgY2x1c3Rlci5cbiAqXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLk1hcmtlcn0gbWFya2VyIFRoZSBtYXJrZXIgdG8gY2hlY2suXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIHRoZSBtYXJrZXIgaXMgYWxyZWFkeSBhZGRlZC5cbiAqL1xuQ2x1c3Rlci5wcm90b3R5cGUuaXNNYXJrZXJBbHJlYWR5QWRkZWQgPSBmdW5jdGlvbihtYXJrZXIpIHtcbiAgaWYgKHRoaXMubWFya2Vyc18uaW5kZXhPZikge1xuICAgIHJldHVybiB0aGlzLm1hcmtlcnNfLmluZGV4T2YobWFya2VyKSAhPSAtMTtcbiAgfSBlbHNlIHtcbiAgICBmb3IgKHZhciBpID0gMCwgbTsgbSA9IHRoaXMubWFya2Vyc19baV07IGkrKykge1xuICAgICAgaWYgKG0gPT0gbWFya2VyKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59O1xuXG5cbi8qKlxuICogQWRkIGEgbWFya2VyIHRoZSBjbHVzdGVyLlxuICpcbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTWFya2VyfSBtYXJrZXIgVGhlIG1hcmtlciB0byBhZGQuXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIHRoZSBtYXJrZXIgd2FzIGFkZGVkLlxuICovXG5DbHVzdGVyLnByb3RvdHlwZS5hZGRNYXJrZXIgPSBmdW5jdGlvbihtYXJrZXIpIHtcbiAgaWYgKHRoaXMuaXNNYXJrZXJBbHJlYWR5QWRkZWQobWFya2VyKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmICghdGhpcy5jZW50ZXJfKSB7XG4gICAgdGhpcy5jZW50ZXJfID0gbWFya2VyLmdldFBvc2l0aW9uKCk7XG4gICAgdGhpcy5jYWxjdWxhdGVCb3VuZHNfKCk7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHRoaXMuYXZlcmFnZUNlbnRlcl8pIHtcbiAgICAgIHZhciBsID0gdGhpcy5tYXJrZXJzXy5sZW5ndGggKyAxO1xuICAgICAgdmFyIGxhdCA9ICh0aGlzLmNlbnRlcl8ubGF0KCkgKiAobC0xKSArIG1hcmtlci5nZXRQb3NpdGlvbigpLmxhdCgpKSAvIGw7XG4gICAgICB2YXIgbG5nID0gKHRoaXMuY2VudGVyXy5sbmcoKSAqIChsLTEpICsgbWFya2VyLmdldFBvc2l0aW9uKCkubG5nKCkpIC8gbDtcbiAgICAgIHRoaXMuY2VudGVyXyA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmcobGF0LCBsbmcpO1xuICAgICAgdGhpcy5jYWxjdWxhdGVCb3VuZHNfKCk7XG4gICAgfVxuICB9XG5cbiAgbWFya2VyLmlzQWRkZWQgPSB0cnVlO1xuICB0aGlzLm1hcmtlcnNfLnB1c2gobWFya2VyKTtcblxuICB2YXIgbGVuID0gdGhpcy5tYXJrZXJzXy5sZW5ndGg7XG4gIGlmIChsZW4gPCB0aGlzLm1pbkNsdXN0ZXJTaXplXyAmJiBtYXJrZXIuZ2V0TWFwKCkgIT0gdGhpcy5tYXBfKSB7XG4gICAgLy8gTWluIGNsdXN0ZXIgc2l6ZSBub3QgcmVhY2hlZCBzbyBzaG93IHRoZSBtYXJrZXIuXG4gICAgbWFya2VyLnNldE1hcCh0aGlzLm1hcF8pO1xuICB9XG5cbiAgaWYgKGxlbiA9PSB0aGlzLm1pbkNsdXN0ZXJTaXplXykge1xuICAgIC8vIEhpZGUgdGhlIG1hcmtlcnMgdGhhdCB3ZXJlIHNob3dpbmcuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgdGhpcy5tYXJrZXJzX1tpXS5zZXRNYXAobnVsbCk7XG4gICAgfVxuICB9XG5cbiAgaWYgKGxlbiA+PSB0aGlzLm1pbkNsdXN0ZXJTaXplXykge1xuICAgIG1hcmtlci5zZXRNYXAobnVsbCk7XG4gIH1cblxuICB0aGlzLnVwZGF0ZUljb24oKTtcbiAgcmV0dXJuIHRydWU7XG59O1xuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgbWFya2VyIGNsdXN0ZXJlciB0aGF0IHRoZSBjbHVzdGVyIGlzIGFzc29jaWF0ZWQgd2l0aC5cbiAqXG4gKiBAcmV0dXJuIHtNYXJrZXJDbHVzdGVyZXJ9IFRoZSBhc3NvY2lhdGVkIG1hcmtlciBjbHVzdGVyZXIuXG4gKi9cbkNsdXN0ZXIucHJvdG90eXBlLmdldE1hcmtlckNsdXN0ZXJlciA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5tYXJrZXJDbHVzdGVyZXJfO1xufTtcblxuXG4vKipcbiAqIFJldHVybnMgdGhlIGJvdW5kcyBvZiB0aGUgY2x1c3Rlci5cbiAqXG4gKiBAcmV0dXJuIHtnb29nbGUubWFwcy5MYXRMbmdCb3VuZHN9IHRoZSBjbHVzdGVyIGJvdW5kcy5cbiAqL1xuQ2x1c3Rlci5wcm90b3R5cGUuZ2V0Qm91bmRzID0gZnVuY3Rpb24oKSB7XG4gIHZhciBib3VuZHMgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nQm91bmRzKHRoaXMuY2VudGVyXywgdGhpcy5jZW50ZXJfKTtcbiAgdmFyIG1hcmtlcnMgPSB0aGlzLmdldE1hcmtlcnMoKTtcbiAgZm9yICh2YXIgaSA9IDAsIG1hcmtlcjsgbWFya2VyID0gbWFya2Vyc1tpXTsgaSsrKSB7XG4gICAgYm91bmRzLmV4dGVuZChtYXJrZXIuZ2V0UG9zaXRpb24oKSk7XG4gIH1cbiAgcmV0dXJuIGJvdW5kcztcbn07XG5cblxuLyoqXG4gKiBSZW1vdmVzIHRoZSBjbHVzdGVyXG4gKi9cbkNsdXN0ZXIucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmNsdXN0ZXJJY29uXy5yZW1vdmUoKTtcbiAgdGhpcy5tYXJrZXJzXy5sZW5ndGggPSAwO1xuICBkZWxldGUgdGhpcy5tYXJrZXJzXztcbn07XG5cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBjZW50ZXIgb2YgdGhlIGNsdXN0ZXIuXG4gKlxuICogQHJldHVybiB7bnVtYmVyfSBUaGUgY2x1c3RlciBjZW50ZXIuXG4gKi9cbkNsdXN0ZXIucHJvdG90eXBlLmdldFNpemUgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMubWFya2Vyc18ubGVuZ3RoO1xufTtcblxuXG4vKipcbiAqIFJldHVybnMgdGhlIGNlbnRlciBvZiB0aGUgY2x1c3Rlci5cbiAqXG4gKiBAcmV0dXJuIHtBcnJheS48Z29vZ2xlLm1hcHMuTWFya2VyPn0gVGhlIGNsdXN0ZXIgY2VudGVyLlxuICovXG5DbHVzdGVyLnByb3RvdHlwZS5nZXRNYXJrZXJzID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLm1hcmtlcnNfO1xufTtcblxuXG4vKipcbiAqIFJldHVybnMgdGhlIGNlbnRlciBvZiB0aGUgY2x1c3Rlci5cbiAqXG4gKiBAcmV0dXJuIHtnb29nbGUubWFwcy5MYXRMbmd9IFRoZSBjbHVzdGVyIGNlbnRlci5cbiAqL1xuQ2x1c3Rlci5wcm90b3R5cGUuZ2V0Q2VudGVyID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmNlbnRlcl87XG59O1xuXG5cbi8qKlxuICogQ2FsY3VsYXRlZCB0aGUgZXh0ZW5kZWQgYm91bmRzIG9mIHRoZSBjbHVzdGVyIHdpdGggdGhlIGdyaWQuXG4gKlxuICogQHByaXZhdGVcbiAqL1xuQ2x1c3Rlci5wcm90b3R5cGUuY2FsY3VsYXRlQm91bmRzXyA9IGZ1bmN0aW9uKCkge1xuICB2YXIgYm91bmRzID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZ0JvdW5kcyh0aGlzLmNlbnRlcl8sIHRoaXMuY2VudGVyXyk7XG4gIHRoaXMuYm91bmRzXyA9IHRoaXMubWFya2VyQ2x1c3RlcmVyXy5nZXRFeHRlbmRlZEJvdW5kcyhib3VuZHMpO1xufTtcblxuXG4vKipcbiAqIERldGVybWluZXMgaWYgYSBtYXJrZXIgbGllcyBpbiB0aGUgY2x1c3RlcnMgYm91bmRzLlxuICpcbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTWFya2VyfSBtYXJrZXIgVGhlIG1hcmtlciB0byBjaGVjay5cbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdGhlIG1hcmtlciBsaWVzIGluIHRoZSBib3VuZHMuXG4gKi9cbkNsdXN0ZXIucHJvdG90eXBlLmlzTWFya2VySW5DbHVzdGVyQm91bmRzID0gZnVuY3Rpb24obWFya2VyKSB7XG4gIHJldHVybiB0aGlzLmJvdW5kc18uY29udGFpbnMobWFya2VyLmdldFBvc2l0aW9uKCkpO1xufTtcblxuXG4vKipcbiAqIFJldHVybnMgdGhlIG1hcCB0aGF0IHRoZSBjbHVzdGVyIGlzIGFzc29jaWF0ZWQgd2l0aC5cbiAqXG4gKiBAcmV0dXJuIHtnb29nbGUubWFwcy5NYXB9IFRoZSBtYXAuXG4gKi9cbkNsdXN0ZXIucHJvdG90eXBlLmdldE1hcCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5tYXBfO1xufTtcblxuXG4vKipcbiAqIFVwZGF0ZXMgdGhlIGNsdXN0ZXIgaWNvblxuICovXG5DbHVzdGVyLnByb3RvdHlwZS51cGRhdGVJY29uID0gZnVuY3Rpb24oKSB7XG4gIHZhciB6b29tID0gdGhpcy5tYXBfLmdldFpvb20oKTtcbiAgdmFyIG16ID0gdGhpcy5tYXJrZXJDbHVzdGVyZXJfLmdldE1heFpvb20oKTtcblxuICBpZiAobXogJiYgem9vbSA+IG16KSB7XG4gICAgLy8gVGhlIHpvb20gaXMgZ3JlYXRlciB0aGFuIG91ciBtYXggem9vbSBzbyBzaG93IGFsbCB0aGUgbWFya2VycyBpbiBjbHVzdGVyLlxuICAgIGZvciAodmFyIGkgPSAwLCBtYXJrZXI7IG1hcmtlciA9IHRoaXMubWFya2Vyc19baV07IGkrKykge1xuICAgICAgbWFya2VyLnNldE1hcCh0aGlzLm1hcF8pO1xuICAgIH1cbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAodGhpcy5tYXJrZXJzXy5sZW5ndGggPCB0aGlzLm1pbkNsdXN0ZXJTaXplXykge1xuICAgIC8vIE1pbiBjbHVzdGVyIHNpemUgbm90IHlldCByZWFjaGVkLlxuICAgIHRoaXMuY2x1c3Rlckljb25fLmhpZGUoKTtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgbnVtU3R5bGVzID0gdGhpcy5tYXJrZXJDbHVzdGVyZXJfLmdldFN0eWxlcygpLmxlbmd0aDtcbiAgdmFyIHN1bXMgPSB0aGlzLm1hcmtlckNsdXN0ZXJlcl8uZ2V0Q2FsY3VsYXRvcigpKHRoaXMubWFya2Vyc18sIG51bVN0eWxlcyk7XG4gIHRoaXMuY2x1c3Rlckljb25fLnNldENlbnRlcih0aGlzLmNlbnRlcl8pO1xuICB0aGlzLmNsdXN0ZXJJY29uXy5zZXRTdW1zKHN1bXMpO1xuICB0aGlzLmNsdXN0ZXJJY29uXy5zaG93KCk7XG59O1xuXG5cbi8qKlxuICogQSBjbHVzdGVyIGljb25cbiAqXG4gKiBAcGFyYW0ge0NsdXN0ZXJ9IGNsdXN0ZXIgVGhlIGNsdXN0ZXIgdG8gYmUgYXNzb2NpYXRlZCB3aXRoLlxuICogQHBhcmFtIHtPYmplY3R9IHN0eWxlcyBBbiBvYmplY3QgdGhhdCBoYXMgc3R5bGUgcHJvcGVydGllczpcbiAqICAgICAndXJsJzogKHN0cmluZykgVGhlIGltYWdlIHVybC5cbiAqICAgICAnaGVpZ2h0JzogKG51bWJlcikgVGhlIGltYWdlIGhlaWdodC5cbiAqICAgICAnd2lkdGgnOiAobnVtYmVyKSBUaGUgaW1hZ2Ugd2lkdGguXG4gKiAgICAgJ2FuY2hvcic6IChBcnJheSkgVGhlIGFuY2hvciBwb3NpdGlvbiBvZiB0aGUgbGFiZWwgdGV4dC5cbiAqICAgICAndGV4dENvbG9yJzogKHN0cmluZykgVGhlIHRleHQgY29sb3IuXG4gKiAgICAgJ3RleHRTaXplJzogKG51bWJlcikgVGhlIHRleHQgc2l6ZS5cbiAqICAgICAgJ2ZvbnRGYW1pbHknOiAoc3RyaW5nKSBUaGUgZm9udCBmYW1pbHkuXG4gKiAgICAgICdmb250V2VpZ2h0JzogKHN0cmluZykgVGhlIGZvbnQgd2VpZ2h0LlxuICogICAgICdiYWNrZ3JvdW5kUG9zaXRpb246IChzdHJpbmcpIFRoZSBiYWNrZ3JvdW5kIHBvc3RpdGlvbiB4LCB5LlxuICogQHBhcmFtIHtudW1iZXI9fSBvcHRfcGFkZGluZyBPcHRpb25hbCBwYWRkaW5nIHRvIGFwcGx5IHRvIHRoZSBjbHVzdGVyIGljb24uXG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlbmRzIGdvb2dsZS5tYXBzLk92ZXJsYXlWaWV3XG4gKiBAaWdub3JlXG4gKi9cbmZ1bmN0aW9uIENsdXN0ZXJJY29uKGNsdXN0ZXIsIHN0eWxlcywgb3B0X3BhZGRpbmcpIHtcbiAgY2x1c3Rlci5nZXRNYXJrZXJDbHVzdGVyZXIoKS5leHRlbmQoQ2x1c3Rlckljb24sIGdvb2dsZS5tYXBzLk92ZXJsYXlWaWV3KTtcblxuICB0aGlzLnN0eWxlc18gPSBzdHlsZXM7XG4gIHRoaXMucGFkZGluZ18gPSBvcHRfcGFkZGluZyB8fCAwO1xuICB0aGlzLmNsdXN0ZXJfID0gY2x1c3RlcjtcbiAgdGhpcy5jZW50ZXJfID0gbnVsbDtcbiAgdGhpcy5tYXBfID0gY2x1c3Rlci5nZXRNYXAoKTtcbiAgdGhpcy5kaXZfID0gbnVsbDtcbiAgdGhpcy5zdW1zXyA9IG51bGw7XG4gIHRoaXMudmlzaWJsZV8gPSBmYWxzZTtcblxuICB0aGlzLnNldE1hcCh0aGlzLm1hcF8pO1xufVxuXG5cbi8qKlxuICogVHJpZ2dlcnMgdGhlIGNsdXN0ZXJjbGljayBldmVudCBhbmQgem9vbSdzIGlmIHRoZSBvcHRpb24gaXMgc2V0LlxuICovXG5DbHVzdGVySWNvbi5wcm90b3R5cGUudHJpZ2dlckNsdXN0ZXJDbGljayA9IGZ1bmN0aW9uKCkge1xuICB2YXIgbWFya2VyQ2x1c3RlcmVyID0gdGhpcy5jbHVzdGVyXy5nZXRNYXJrZXJDbHVzdGVyZXIoKTtcblxuICAvLyBUcmlnZ2VyIHRoZSBjbHVzdGVyY2xpY2sgZXZlbnQuXG4gIGdvb2dsZS5tYXBzLmV2ZW50LnRyaWdnZXIobWFya2VyQ2x1c3RlcmVyLCAnY2x1c3RlcmNsaWNrJywgdGhpcy5jbHVzdGVyXyk7XG5cbiAgaWYgKG1hcmtlckNsdXN0ZXJlci5pc1pvb21PbkNsaWNrKCkpIHtcbiAgICAvLyBab29tIGludG8gdGhlIGNsdXN0ZXIuXG4gICAgdGhpcy5tYXBfLmZpdEJvdW5kcyh0aGlzLmNsdXN0ZXJfLmdldEJvdW5kcygpKTtcbiAgfVxufTtcblxuXG4vKipcbiAqIEFkZGluZyB0aGUgY2x1c3RlciBpY29uIHRvIHRoZSBkb20uXG4gKiBAaWdub3JlXG4gKi9cbkNsdXN0ZXJJY29uLnByb3RvdHlwZS5vbkFkZCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmRpdl8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcbiAgaWYgKHRoaXMudmlzaWJsZV8pIHtcbiAgICB2YXIgcG9zID0gdGhpcy5nZXRQb3NGcm9tTGF0TG5nXyh0aGlzLmNlbnRlcl8pO1xuICAgIHRoaXMuZGl2Xy5zdHlsZS5jc3NUZXh0ID0gdGhpcy5jcmVhdGVDc3MocG9zKTtcbiAgICB0aGlzLmRpdl8uaW5uZXJIVE1MID0gdGhpcy5zdW1zXy50ZXh0O1xuICB9XG5cbiAgdmFyIHBhbmVzID0gdGhpcy5nZXRQYW5lcygpO1xuICBwYW5lcy5vdmVybGF5TW91c2VUYXJnZXQuYXBwZW5kQ2hpbGQodGhpcy5kaXZfKTtcblxuICB2YXIgdGhhdCA9IHRoaXM7XG4gIGdvb2dsZS5tYXBzLmV2ZW50LmFkZERvbUxpc3RlbmVyKHRoaXMuZGl2XywgJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgdGhhdC50cmlnZ2VyQ2x1c3RlckNsaWNrKCk7XG4gIH0pO1xufTtcblxuXG4vKipcbiAqIFJldHVybnMgdGhlIHBvc2l0aW9uIHRvIHBsYWNlIHRoZSBkaXYgZGVuZGluZyBvbiB0aGUgbGF0bG5nLlxuICpcbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTGF0TG5nfSBsYXRsbmcgVGhlIHBvc2l0aW9uIGluIGxhdGxuZy5cbiAqIEByZXR1cm4ge2dvb2dsZS5tYXBzLlBvaW50fSBUaGUgcG9zaXRpb24gaW4gcGl4ZWxzLlxuICogQHByaXZhdGVcbiAqL1xuQ2x1c3Rlckljb24ucHJvdG90eXBlLmdldFBvc0Zyb21MYXRMbmdfID0gZnVuY3Rpb24obGF0bG5nKSB7XG4gIHZhciBwb3MgPSB0aGlzLmdldFByb2plY3Rpb24oKS5mcm9tTGF0TG5nVG9EaXZQaXhlbChsYXRsbmcpO1xuICBwb3MueCAtPSBwYXJzZUludCh0aGlzLndpZHRoXyAvIDIsIDEwKTtcbiAgcG9zLnkgLT0gcGFyc2VJbnQodGhpcy5oZWlnaHRfIC8gMiwgMTApO1xuICByZXR1cm4gcG9zO1xufTtcblxuXG4vKipcbiAqIERyYXcgdGhlIGljb24uXG4gKiBAaWdub3JlXG4gKi9cbkNsdXN0ZXJJY29uLnByb3RvdHlwZS5kcmF3ID0gZnVuY3Rpb24oKSB7XG4gIGlmICh0aGlzLnZpc2libGVfKSB7XG4gICAgdmFyIHBvcyA9IHRoaXMuZ2V0UG9zRnJvbUxhdExuZ18odGhpcy5jZW50ZXJfKTtcbiAgICB0aGlzLmRpdl8uc3R5bGUudG9wID0gcG9zLnkgKyAncHgnO1xuICAgIHRoaXMuZGl2Xy5zdHlsZS5sZWZ0ID0gcG9zLnggKyAncHgnO1xuICB9XG59O1xuXG5cbi8qKlxuICogSGlkZSB0aGUgaWNvbi5cbiAqL1xuQ2x1c3Rlckljb24ucHJvdG90eXBlLmhpZGUgPSBmdW5jdGlvbigpIHtcbiAgaWYgKHRoaXMuZGl2Xykge1xuICAgIHRoaXMuZGl2Xy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICB9XG4gIHRoaXMudmlzaWJsZV8gPSBmYWxzZTtcbn07XG5cblxuLyoqXG4gKiBQb3NpdGlvbiBhbmQgc2hvdyB0aGUgaWNvbi5cbiAqL1xuQ2x1c3Rlckljb24ucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbigpIHtcbiAgaWYgKHRoaXMuZGl2Xykge1xuICAgIHZhciBwb3MgPSB0aGlzLmdldFBvc0Zyb21MYXRMbmdfKHRoaXMuY2VudGVyXyk7XG4gICAgdGhpcy5kaXZfLnN0eWxlLmNzc1RleHQgPSB0aGlzLmNyZWF0ZUNzcyhwb3MpO1xuICAgIHRoaXMuZGl2Xy5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gIH1cbiAgdGhpcy52aXNpYmxlXyA9IHRydWU7XG59O1xuXG5cbi8qKlxuICogUmVtb3ZlIHRoZSBpY29uIGZyb20gdGhlIG1hcFxuICovXG5DbHVzdGVySWNvbi5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuc2V0TWFwKG51bGwpO1xufTtcblxuXG4vKipcbiAqIEltcGxlbWVudGF0aW9uIG9mIHRoZSBvblJlbW92ZSBpbnRlcmZhY2UuXG4gKiBAaWdub3JlXG4gKi9cbkNsdXN0ZXJJY29uLnByb3RvdHlwZS5vblJlbW92ZSA9IGZ1bmN0aW9uKCkge1xuICBpZiAodGhpcy5kaXZfICYmIHRoaXMuZGl2Xy5wYXJlbnROb2RlKSB7XG4gICAgdGhpcy5oaWRlKCk7XG4gICAgdGhpcy5kaXZfLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5kaXZfKTtcbiAgICB0aGlzLmRpdl8gPSBudWxsO1xuICB9XG59O1xuXG5cbi8qKlxuICogU2V0IHRoZSBzdW1zIG9mIHRoZSBpY29uLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdW1zIFRoZSBzdW1zIGNvbnRhaW5pbmc6XG4gKiAgICd0ZXh0JzogKHN0cmluZykgVGhlIHRleHQgdG8gZGlzcGxheSBpbiB0aGUgaWNvbi5cbiAqICAgJ2luZGV4JzogKG51bWJlcikgVGhlIHN0eWxlIGluZGV4IG9mIHRoZSBpY29uLlxuICovXG5DbHVzdGVySWNvbi5wcm90b3R5cGUuc2V0U3VtcyA9IGZ1bmN0aW9uKHN1bXMpIHtcbiAgdGhpcy5zdW1zXyA9IHN1bXM7XG4gIHRoaXMudGV4dF8gPSBzdW1zLnRleHQ7XG4gIHRoaXMuaW5kZXhfID0gc3Vtcy5pbmRleDtcbiAgaWYgKHRoaXMuZGl2Xykge1xuICAgIHRoaXMuZGl2Xy5pbm5lckhUTUwgPSBzdW1zLnRleHQ7XG4gIH1cblxuICB0aGlzLnVzZVN0eWxlKCk7XG59O1xuXG5cbi8qKlxuICogU2V0cyB0aGUgaWNvbiB0byB0aGUgdGhlIHN0eWxlcy5cbiAqL1xuQ2x1c3Rlckljb24ucHJvdG90eXBlLnVzZVN0eWxlID0gZnVuY3Rpb24oKSB7XG4gIHZhciBpbmRleCA9IE1hdGgubWF4KDAsIHRoaXMuc3Vtc18uaW5kZXggLSAxKTtcbiAgaW5kZXggPSBNYXRoLm1pbih0aGlzLnN0eWxlc18ubGVuZ3RoIC0gMSwgaW5kZXgpO1xuICB2YXIgc3R5bGUgPSB0aGlzLnN0eWxlc19baW5kZXhdO1xuICB0aGlzLnVybF8gPSBzdHlsZVsndXJsJ107XG4gIHRoaXMuaGVpZ2h0XyA9IHN0eWxlWydoZWlnaHQnXTtcbiAgdGhpcy53aWR0aF8gPSBzdHlsZVsnd2lkdGgnXTtcbiAgdGhpcy50ZXh0Q29sb3JfID0gc3R5bGVbJ3RleHRDb2xvciddO1xuICB0aGlzLmFuY2hvcl8gPSBzdHlsZVsnYW5jaG9yJ107XG4gIHRoaXMudGV4dFNpemVfID0gc3R5bGVbJ3RleHRTaXplJ107XG4gIHRoaXMuZm9udEZhbWlseV8gPSBzdHlsZVsnZm9udEZhbWlseSddO1xuICB0aGlzLmZvbnRXZWlnaHRfID0gc3R5bGVbJ2ZvbnRXZWlnaHQnXTtcbiAgdGhpcy5iYWNrZ3JvdW5kUG9zaXRpb25fID0gc3R5bGVbJ2JhY2tncm91bmRQb3NpdGlvbiddO1xufTtcblxuXG4vKipcbiAqIFNldHMgdGhlIGNlbnRlciBvZiB0aGUgaWNvbi5cbiAqXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLkxhdExuZ30gY2VudGVyIFRoZSBsYXRsbmcgdG8gc2V0IGFzIHRoZSBjZW50ZXIuXG4gKi9cbkNsdXN0ZXJJY29uLnByb3RvdHlwZS5zZXRDZW50ZXIgPSBmdW5jdGlvbihjZW50ZXIpIHtcbiAgdGhpcy5jZW50ZXJfID0gY2VudGVyO1xufTtcblxuXG4vKipcbiAqIENyZWF0ZSB0aGUgY3NzIHRleHQgYmFzZWQgb24gdGhlIHBvc2l0aW9uIG9mIHRoZSBpY29uLlxuICpcbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuUG9pbnR9IHBvcyBUaGUgcG9zaXRpb24uXG4gKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBjc3Mgc3R5bGUgdGV4dC5cbiAqL1xuQ2x1c3Rlckljb24ucHJvdG90eXBlLmNyZWF0ZUNzcyA9IGZ1bmN0aW9uKHBvcykge1xuICB2YXIgc3R5bGUgPSBbXTtcbiAgc3R5bGUucHVzaCgnYmFja2dyb3VuZC1pbWFnZTp1cmwoJyArIHRoaXMudXJsXyArICcpOycpO1xuICB2YXIgYmFja2dyb3VuZFBvc2l0aW9uID0gdGhpcy5iYWNrZ3JvdW5kUG9zaXRpb25fID8gdGhpcy5iYWNrZ3JvdW5kUG9zaXRpb25fIDogJzAgMCc7XG4gIHN0eWxlLnB1c2goJ2JhY2tncm91bmQtcG9zaXRpb246JyArIGJhY2tncm91bmRQb3NpdGlvbiArICc7Jyk7XG5cbiAgaWYgKHR5cGVvZiB0aGlzLmFuY2hvcl8gPT09ICdvYmplY3QnKSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLmFuY2hvcl9bMF0gPT09ICdudW1iZXInICYmIHRoaXMuYW5jaG9yX1swXSA+IDAgJiZcbiAgICAgICAgdGhpcy5hbmNob3JfWzBdIDwgdGhpcy5oZWlnaHRfKSB7XG4gICAgICBzdHlsZS5wdXNoKCdoZWlnaHQ6JyArICh0aGlzLmhlaWdodF8gLSB0aGlzLmFuY2hvcl9bMF0pICtcbiAgICAgICAgICAncHg7IHBhZGRpbmctdG9wOicgKyB0aGlzLmFuY2hvcl9bMF0gKyAncHg7Jyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlLnB1c2goJ2hlaWdodDonICsgdGhpcy5oZWlnaHRfICsgJ3B4OyBsaW5lLWhlaWdodDonICsgdGhpcy5oZWlnaHRfICtcbiAgICAgICAgICAncHg7Jyk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgdGhpcy5hbmNob3JfWzFdID09PSAnbnVtYmVyJyAmJiB0aGlzLmFuY2hvcl9bMV0gPiAwICYmXG4gICAgICAgIHRoaXMuYW5jaG9yX1sxXSA8IHRoaXMud2lkdGhfKSB7XG4gICAgICBzdHlsZS5wdXNoKCd3aWR0aDonICsgKHRoaXMud2lkdGhfIC0gdGhpcy5hbmNob3JfWzFdKSArXG4gICAgICAgICAgJ3B4OyBwYWRkaW5nLWxlZnQ6JyArIHRoaXMuYW5jaG9yX1sxXSArICdweDsnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3R5bGUucHVzaCgnd2lkdGg6JyArIHRoaXMud2lkdGhfICsgJ3B4OyB0ZXh0LWFsaWduOmNlbnRlcjsnKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgc3R5bGUucHVzaCgnaGVpZ2h0OicgKyB0aGlzLmhlaWdodF8gKyAncHg7IGxpbmUtaGVpZ2h0OicgK1xuICAgICAgICB0aGlzLmhlaWdodF8gKyAncHg7IHdpZHRoOicgKyB0aGlzLndpZHRoXyArICdweDsgdGV4dC1hbGlnbjpjZW50ZXI7Jyk7XG4gIH1cblxuICB2YXIgdHh0Q29sb3IgPSB0aGlzLnRleHRDb2xvcl8gPyB0aGlzLnRleHRDb2xvcl8gOiAnYmxhY2snO1xuICB2YXIgdHh0U2l6ZSA9IHRoaXMudGV4dFNpemVfID8gdGhpcy50ZXh0U2l6ZV8gOiAxMTtcbiAgdmFyIGZvbnRGYW1pbHkgPSB0aGlzLmZvbnRGYW1pbHlfID8gdGhpcy5mb250RmFtaWx5XyA6ICdBcmlhbCxzYW5zLXNlcmlmJztcbiAgdmFyIGZvbnRXZWlnaHQgPSB0aGlzLmZvbnRXZWlnaHRfID8gdGhpcy5mb250V2VpZ2h0XyA6ICc0MDAnO1xuXG4gIHN0eWxlLnB1c2goJ2N1cnNvcjpwb2ludGVyOyB0b3A6JyArIHBvcy55ICsgJ3B4OyBsZWZ0OicgK1xuICAgICAgcG9zLnggKyAncHg7IGNvbG9yOicgKyB0eHRDb2xvciArICc7IHBvc2l0aW9uOmFic29sdXRlOyBmb250LXNpemU6JyArXG4gICAgICB0eHRTaXplICsgJ3B4OyBmb250LWZhbWlseTonICsgZm9udEZhbWlseSArICc7IGZvbnQtd2VpZ2h0OicgKyBmb250V2VpZ2h0ICsgJzsnKTtcbiAgcmV0dXJuIHN0eWxlLmpvaW4oJycpO1xufTtcblxuXG4vLyBFeHBvcnQgU3ltYm9scyBmb3IgQ2xvc3VyZVxuLy8gSWYgeW91IGFyZSBub3QgZ29pbmcgdG8gY29tcGlsZSB3aXRoIGNsb3N1cmUgdGhlbiB5b3UgY2FuIHJlbW92ZSB0aGVcbi8vIGNvZGUgYmVsb3cuXG5nbG9iYWxbJ01hcmtlckNsdXN0ZXJlciddID0gTWFya2VyQ2x1c3RlcmVyO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnYWRkTWFya2VyJ10gPSBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmFkZE1hcmtlcjtcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ2FkZE1hcmtlcnMnXSA9IE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuYWRkTWFya2Vycztcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ2NsZWFyTWFya2VycyddID1cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmNsZWFyTWFya2Vycztcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ2ZpdE1hcFRvTWFya2VycyddID1cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmZpdE1hcFRvTWFya2Vycztcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ2dldENhbGN1bGF0b3InXSA9XG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRDYWxjdWxhdG9yO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnZ2V0R3JpZFNpemUnXSA9XG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRHcmlkU2l6ZTtcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ2dldEV4dGVuZGVkQm91bmRzJ10gPVxuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0RXh0ZW5kZWRCb3VuZHM7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydnZXRNYXAnXSA9IE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0TWFwO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnZ2V0TWFya2VycyddID0gTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRNYXJrZXJzO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnZ2V0TWF4Wm9vbSddID0gTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRNYXhab29tO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnZ2V0U3R5bGVzJ10gPSBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldFN0eWxlcztcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ2dldFRvdGFsQ2x1c3RlcnMnXSA9XG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRUb3RhbENsdXN0ZXJzO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnZ2V0VG90YWxNYXJrZXJzJ10gPVxuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0VG90YWxNYXJrZXJzO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsncmVkcmF3J10gPSBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnJlZHJhdztcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ3JlbW92ZU1hcmtlciddID1cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnJlbW92ZU1hcmtlcjtcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ3JlbW92ZU1hcmtlcnMnXSA9XG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5yZW1vdmVNYXJrZXJzO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsncmVzZXRWaWV3cG9ydCddID1cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnJlc2V0Vmlld3BvcnQ7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydyZXBhaW50J10gPVxuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUucmVwYWludDtcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ3NldENhbGN1bGF0b3InXSA9XG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5zZXRDYWxjdWxhdG9yO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnc2V0R3JpZFNpemUnXSA9XG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5zZXRHcmlkU2l6ZTtcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ3NldE1heFpvb20nXSA9XG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5zZXRNYXhab29tO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnb25BZGQnXSA9IE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUub25BZGQ7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydkcmF3J10gPSBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmRyYXc7XG5cbkNsdXN0ZXIucHJvdG90eXBlWydnZXRDZW50ZXInXSA9IENsdXN0ZXIucHJvdG90eXBlLmdldENlbnRlcjtcbkNsdXN0ZXIucHJvdG90eXBlWydnZXRTaXplJ10gPSBDbHVzdGVyLnByb3RvdHlwZS5nZXRTaXplO1xuQ2x1c3Rlci5wcm90b3R5cGVbJ2dldE1hcmtlcnMnXSA9IENsdXN0ZXIucHJvdG90eXBlLmdldE1hcmtlcnM7XG5cbkNsdXN0ZXJJY29uLnByb3RvdHlwZVsnb25BZGQnXSA9IENsdXN0ZXJJY29uLnByb3RvdHlwZS5vbkFkZDtcbkNsdXN0ZXJJY29uLnByb3RvdHlwZVsnZHJhdyddID0gQ2x1c3Rlckljb24ucHJvdG90eXBlLmRyYXc7XG5DbHVzdGVySWNvbi5wcm90b3R5cGVbJ29uUmVtb3ZlJ10gPSBDbHVzdGVySWNvbi5wcm90b3R5cGUub25SZW1vdmU7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBNYXJrZXJDbHVzdGVyZXI7XG4iLCIvKipcbiAqIGpRdWVyeSBCYXIgUmF0aW5nIFBsdWdpbiB2MS4yLjJcbiAqXG4gKiBodHRwOi8vZ2l0aHViLmNvbS9hbnRlbm5haW8vanF1ZXJ5LWJhci1yYXRpbmdcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTItMjAxNiBLYXppayBQaWV0cnVzemV3c2tpXG4gKlxuICogVGhpcyBwbHVnaW4gaXMgYXZhaWxhYmxlIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cbiAqIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gKi9cbihmdW5jdGlvbiAoZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgLy8gQU1EXG4gICAgICAgIGRlZmluZShbJ2pxdWVyeSddLCBmYWN0b3J5KTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgICAgIC8vIE5vZGUvQ29tbW9uSlNcbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoJ2pxdWVyeScpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBicm93c2VyIGdsb2JhbHNcbiAgICAgICAgZmFjdG9yeShqUXVlcnkpO1xuICAgIH1cbn0oZnVuY3Rpb24gKCQpIHtcblxuICAgIHZhciBCYXJSYXRpbmcgPSAoZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgZnVuY3Rpb24gQmFyUmF0aW5nKCkge1xuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgICAgICAvLyB3cmFwIGVsZW1lbnQgaW4gYSB3cmFwcGVyIGRpdlxuICAgICAgICAgICAgdmFyIHdyYXBFbGVtZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNsYXNzZXMgPSBbJ2JyLXdyYXBwZXInXTtcblxuICAgICAgICAgICAgICAgIGlmIChzZWxmLm9wdGlvbnMudGhlbWUgIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzZXMucHVzaCgnYnItdGhlbWUtJyArIHNlbGYub3B0aW9ucy50aGVtZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgc2VsZi4kZWxlbS53cmFwKCQoJzxkaXYgLz4nLCB7XG4gICAgICAgICAgICAgICAgICAgICdjbGFzcyc6IGNsYXNzZXMuam9pbignICcpXG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gdW53cmFwIGVsZW1lbnRcbiAgICAgICAgICAgIHZhciB1bndyYXBFbGVtZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgc2VsZi4kZWxlbS51bndyYXAoKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIGZpbmQgb3B0aW9uIGJ5IHZhbHVlXG4gICAgICAgICAgICB2YXIgZmluZE9wdGlvbiA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCQuaXNOdW1lcmljKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IE1hdGguZmxvb3IodmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiAkKCdvcHRpb25bdmFsdWU9XCInICsgdmFsdWUgICsgJ1wiXScsIHNlbGYuJGVsZW0pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gZ2V0IGluaXRpYWwgb3B0aW9uXG4gICAgICAgICAgICB2YXIgZ2V0SW5pdGlhbE9wdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBpbml0aWFsUmF0aW5nID0gc2VsZi5vcHRpb25zLmluaXRpYWxSYXRpbmc7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWluaXRpYWxSYXRpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQoJ29wdGlvbjpzZWxlY3RlZCcsIHNlbGYuJGVsZW0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBmaW5kT3B0aW9uKGluaXRpYWxSYXRpbmcpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gZ2V0IGVtcHR5IG9wdGlvblxuICAgICAgICAgICAgdmFyIGdldEVtcHR5T3B0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyICRlbXB0eU9wdCA9IHNlbGYuJGVsZW0uZmluZCgnb3B0aW9uW3ZhbHVlPVwiJyArIHNlbGYub3B0aW9ucy5lbXB0eVZhbHVlICsgJ1wiXScpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCEkZW1wdHlPcHQubGVuZ3RoICYmIHNlbGYub3B0aW9ucy5hbGxvd0VtcHR5KSB7XG4gICAgICAgICAgICAgICAgICAgICRlbXB0eU9wdCA9ICQoJzxvcHRpb24gLz4nLCB7ICd2YWx1ZSc6IHNlbGYub3B0aW9ucy5lbXB0eVZhbHVlIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAkZW1wdHlPcHQucHJlcGVuZFRvKHNlbGYuJGVsZW0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiAkZW1wdHlPcHQ7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBnZXQgZGF0YVxuICAgICAgICAgICAgdmFyIGdldERhdGEgPSBmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IHNlbGYuJGVsZW0uZGF0YSgnYmFycmF0aW5nJyk7XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGtleSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGFba2V5XTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIHNldCBkYXRhXG4gICAgICAgICAgICB2YXIgc2V0RGF0YSA9IGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLmRhdGEoJ2JhcnJhdGluZycsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLmRhdGEoJ2JhcnJhdGluZycpW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBzYXZlIGRhdGEgb24gZWxlbWVudFxuICAgICAgICAgICAgdmFyIHNhdmVEYXRhT25FbGVtZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyICRvcHQgPSBnZXRJbml0aWFsT3B0aW9uKCk7XG4gICAgICAgICAgICAgICAgdmFyICRlbXB0eU9wdCA9IGdldEVtcHR5T3B0aW9uKCk7XG5cbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSAkb3B0LnZhbCgpO1xuICAgICAgICAgICAgICAgIHZhciB0ZXh0ID0gJG9wdC5kYXRhKCdodG1sJykgPyAkb3B0LmRhdGEoJ2h0bWwnKSA6ICRvcHQudGV4dCgpO1xuXG4gICAgICAgICAgICAgICAgLy8gaWYgdGhlIGFsbG93RW1wdHkgb3B0aW9uIGlzIG5vdCBzZXQgbGV0J3MgY2hlY2sgaWYgZW1wdHkgb3B0aW9uIGV4aXN0cyBpbiB0aGUgc2VsZWN0IGZpZWxkXG4gICAgICAgICAgICAgICAgdmFyIGFsbG93RW1wdHkgPSAoc2VsZi5vcHRpb25zLmFsbG93RW1wdHkgIT09IG51bGwpID9cbiAgICAgICAgICAgICAgICAgICAgc2VsZi5vcHRpb25zLmFsbG93RW1wdHkgOlxuICAgICAgICAgICAgICAgICAgICAhISRlbXB0eU9wdC5sZW5ndGg7XG5cbiAgICAgICAgICAgICAgICB2YXIgZW1wdHlWYWx1ZSA9ICgkZW1wdHlPcHQubGVuZ3RoKSA/ICRlbXB0eU9wdC52YWwoKSA6IG51bGw7XG4gICAgICAgICAgICAgICAgdmFyIGVtcHR5VGV4dCA9ICgkZW1wdHlPcHQubGVuZ3RoKSA/ICRlbXB0eU9wdC50ZXh0KCkgOiBudWxsO1xuXG4gICAgICAgICAgICAgICAgc2V0RGF0YShudWxsLCB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJPcHRpb25zOiBzZWxmLm9wdGlvbnMsXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gaW5pdGlhbCByYXRpbmcgYmFzZWQgb24gdGhlIE9QVElPTiB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICByYXRpbmdWYWx1ZTogdmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIHJhdGluZ1RleHQ6IHRleHQsXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gcmF0aW5nIHdpbGwgYmUgcmVzdG9yZWQgYnkgY2FsbGluZyBjbGVhciBtZXRob2RcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxSYXRpbmdWYWx1ZTogdmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsUmF0aW5nVGV4dDogdGV4dCxcblxuICAgICAgICAgICAgICAgICAgICAvLyBhbGxvdyBlbXB0eSByYXRpbmdzP1xuICAgICAgICAgICAgICAgICAgICBhbGxvd0VtcHR5OiBhbGxvd0VtcHR5LFxuXG4gICAgICAgICAgICAgICAgICAgIC8vIHJhdGluZyB2YWx1ZSBhbmQgdGV4dCBvZiB0aGUgZW1wdHkgT1BUSU9OXG4gICAgICAgICAgICAgICAgICAgIGVtcHR5UmF0aW5nVmFsdWU6IGVtcHR5VmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIGVtcHR5UmF0aW5nVGV4dDogZW1wdHlUZXh0LFxuXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlYWQtb25seSBzdGF0ZVxuICAgICAgICAgICAgICAgICAgICByZWFkT25seTogc2VsZi5vcHRpb25zLnJlYWRvbmx5LFxuXG4gICAgICAgICAgICAgICAgICAgIC8vIGRpZCB0aGUgdXNlciBhbHJlYWR5IHNlbGVjdCBhIHJhdGluZz9cbiAgICAgICAgICAgICAgICAgICAgcmF0aW5nTWFkZTogZmFsc2VcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIHJlbW92ZSBkYXRhIG9uIGVsZW1lbnRcbiAgICAgICAgICAgIHZhciByZW1vdmVEYXRhT25FbGVtZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgc2VsZi4kZWxlbS5yZW1vdmVEYXRhKCdiYXJyYXRpbmcnKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIHJldHVybiBjdXJyZW50IHJhdGluZyB0ZXh0XG4gICAgICAgICAgICB2YXIgcmF0aW5nVGV4dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBnZXREYXRhKCdyYXRpbmdUZXh0Jyk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyByZXR1cm4gY3VycmVudCByYXRpbmcgdmFsdWVcbiAgICAgICAgICAgIHZhciByYXRpbmdWYWx1ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBnZXREYXRhKCdyYXRpbmdWYWx1ZScpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gYnVpbGQgd2lkZ2V0IGFuZCByZXR1cm4galF1ZXJ5IGVsZW1lbnRcbiAgICAgICAgICAgIHZhciBidWlsZFdpZGdldCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciAkdyA9ICQoJzxkaXYgLz4nLCB7ICdjbGFzcyc6ICdici13aWRnZXQnIH0pO1xuXG4gICAgICAgICAgICAgICAgLy8gY3JlYXRlIEEgZWxlbWVudHMgdGhhdCB3aWxsIHJlcGxhY2UgT1BUSU9Oc1xuICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0uZmluZCgnb3B0aW9uJykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbCwgdGV4dCwgaHRtbCwgJGE7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFsID0gJCh0aGlzKS52YWwoKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBjcmVhdGUgcmF0aW5ncyAtIGJ1dCBvbmx5IGlmIHZhbCBpcyBub3QgZGVmaW5lZCBhcyBlbXB0eVxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsICE9PSBnZXREYXRhKCdlbXB0eVJhdGluZ1ZhbHVlJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQgPSAkKHRoaXMpLnRleHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGh0bWwgPSAkKHRoaXMpLmRhdGEoJ2h0bWwnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChodG1sKSB7IHRleHQgPSBodG1sOyB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICRhID0gJCgnPGEgLz4nLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2hyZWYnOiAnIycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2RhdGEtcmF0aW5nLXZhbHVlJzogdmFsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdkYXRhLXJhdGluZy10ZXh0JzogdGV4dCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnaHRtbCc6IChzZWxmLm9wdGlvbnMuc2hvd1ZhbHVlcykgPyB0ZXh0IDogJydcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAkdy5hcHBlbmQoJGEpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIC8vIGFwcGVuZCAuYnItY3VycmVudC1yYXRpbmcgZGl2IHRvIHRoZSB3aWRnZXRcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5vcHRpb25zLnNob3dTZWxlY3RlZFJhdGluZykge1xuICAgICAgICAgICAgICAgICAgICAkdy5hcHBlbmQoJCgnPGRpdiAvPicsIHsgJ3RleHQnOiAnJywgJ2NsYXNzJzogJ2JyLWN1cnJlbnQtcmF0aW5nJyB9KSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gYWRkaXRpb25hbCBjbGFzc2VzIGZvciB0aGUgd2lkZ2V0XG4gICAgICAgICAgICAgICAgaWYgKHNlbGYub3B0aW9ucy5yZXZlcnNlKSB7XG4gICAgICAgICAgICAgICAgICAgICR3LmFkZENsYXNzKCdici1yZXZlcnNlJyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYub3B0aW9ucy5yZWFkb25seSkge1xuICAgICAgICAgICAgICAgICAgICAkdy5hZGRDbGFzcygnYnItcmVhZG9ubHknKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gJHc7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyByZXR1cm4gYSBqUXVlcnkgZnVuY3Rpb24gbmFtZSBkZXBlbmRpbmcgb24gdGhlICdyZXZlcnNlJyBzZXR0aW5nXG4gICAgICAgICAgICB2YXIgbmV4dEFsbG9yUHJldmlvdXNBbGwgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpZiAoZ2V0RGF0YSgndXNlck9wdGlvbnMnKS5yZXZlcnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnbmV4dEFsbCc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdwcmV2QWxsJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBzZXQgdGhlIHZhbHVlIG9mIHRoZSBzZWxlY3QgZmllbGRcbiAgICAgICAgICAgIHZhciBzZXRTZWxlY3RGaWVsZFZhbHVlID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICAvLyBjaGFuZ2Ugc2VsZWN0ZWQgb3B0aW9uXG4gICAgICAgICAgICAgICAgZmluZE9wdGlvbih2YWx1ZSkucHJvcCgnc2VsZWN0ZWQnLCB0cnVlKTtcblxuICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0uY2hhbmdlKCk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyByZXNldCBzZWxlY3QgZmllbGRcbiAgICAgICAgICAgIHZhciByZXNldFNlbGVjdEZpZWxkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJCgnb3B0aW9uJywgc2VsZi4kZWxlbSkucHJvcCgnc2VsZWN0ZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGVmYXVsdFNlbGVjdGVkO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgc2VsZi4kZWxlbS5jaGFuZ2UoKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIGRpc3BsYXkgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCByYXRpbmdcbiAgICAgICAgICAgIHZhciBzaG93U2VsZWN0ZWRSYXRpbmcgPSBmdW5jdGlvbih0ZXh0KSB7XG4gICAgICAgICAgICAgICAgLy8gdGV4dCB1bmRlZmluZWQ/XG4gICAgICAgICAgICAgICAgdGV4dCA9IHRleHQgPyB0ZXh0IDogcmF0aW5nVGV4dCgpO1xuXG4gICAgICAgICAgICAgICAgLy8gc3BlY2lhbCBjYXNlIHdoZW4gdGhlIHNlbGVjdGVkIHJhdGluZyBpcyBkZWZpbmVkIGFzIGVtcHR5XG4gICAgICAgICAgICAgICAgaWYgKHRleHQgPT0gZ2V0RGF0YSgnZW1wdHlSYXRpbmdUZXh0JykpIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dCA9ICcnO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIHVwZGF0ZSAuYnItY3VycmVudC1yYXRpbmcgZGl2XG4gICAgICAgICAgICAgICAgaWYgKHNlbGYub3B0aW9ucy5zaG93U2VsZWN0ZWRSYXRpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi4kZWxlbS5wYXJlbnQoKS5maW5kKCcuYnItY3VycmVudC1yYXRpbmcnKS50ZXh0KHRleHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIHJldHVybiByb3VuZGVkIGZyYWN0aW9uIG9mIGEgdmFsdWUgKDE0LjQgLT4gNDAsIDAuOTkgLT4gOTApXG4gICAgICAgICAgICB2YXIgZnJhY3Rpb24gPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLnJvdW5kKCgoTWF0aC5mbG9vcih2YWx1ZSAqIDEwKSAvIDEwKSAlIDEpICogMTAwKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIHJlbW92ZSBhbGwgY2xhc3NlcyBmcm9tIGVsZW1lbnRzXG4gICAgICAgICAgICB2YXIgcmVzZXRTdHlsZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBhbGwgY2xhc3NlcyBzdGFydGluZyB3aXRoIGJyLSpcbiAgICAgICAgICAgICAgICBzZWxmLiR3aWRnZXQuZmluZCgnYScpLnJlbW92ZUNsYXNzKGZ1bmN0aW9uKGluZGV4LCBjbGFzc2VzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoY2xhc3Nlcy5tYXRjaCgvKF58XFxzKWJyLVxcUysvZykgfHwgW10pLmpvaW4oJyAnKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIGFwcGx5IHN0eWxlIGJ5IHNldHRpbmcgY2xhc3NlcyBvbiBlbGVtZW50c1xuICAgICAgICAgICAgdmFyIGFwcGx5U3R5bGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgJGEgPSBzZWxmLiR3aWRnZXQuZmluZCgnYVtkYXRhLXJhdGluZy12YWx1ZT1cIicgKyByYXRpbmdWYWx1ZSgpICsgJ1wiXScpO1xuICAgICAgICAgICAgICAgIHZhciBpbml0aWFsUmF0aW5nID0gZ2V0RGF0YSgndXNlck9wdGlvbnMnKS5pbml0aWFsUmF0aW5nO1xuICAgICAgICAgICAgICAgIHZhciBiYXNlVmFsdWUgPSAkLmlzTnVtZXJpYyhyYXRpbmdWYWx1ZSgpKSA/IHJhdGluZ1ZhbHVlKCkgOiAwO1xuICAgICAgICAgICAgICAgIHZhciBmID0gZnJhY3Rpb24oaW5pdGlhbFJhdGluZyk7XG4gICAgICAgICAgICAgICAgdmFyICRhbGwsICRmcmFjdGlvbmFsO1xuXG4gICAgICAgICAgICAgICAgcmVzZXRTdHlsZSgpO1xuXG4gICAgICAgICAgICAgICAgLy8gYWRkIGNsYXNzZXNcbiAgICAgICAgICAgICAgICAkYS5hZGRDbGFzcygnYnItc2VsZWN0ZWQgYnItY3VycmVudCcpW25leHRBbGxvclByZXZpb3VzQWxsKCldKClcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdici1zZWxlY3RlZCcpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFnZXREYXRhKCdyYXRpbmdNYWRlJykgJiYgJC5pc051bWVyaWMoaW5pdGlhbFJhdGluZykpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKChpbml0aWFsUmF0aW5nIDw9IGJhc2VWYWx1ZSkgfHwgIWYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICRhbGwgPSBzZWxmLiR3aWRnZXQuZmluZCgnYScpO1xuXG4gICAgICAgICAgICAgICAgICAgICRmcmFjdGlvbmFsID0gKCRhLmxlbmd0aCkgP1xuICAgICAgICAgICAgICAgICAgICAgICAgJGFbKGdldERhdGEoJ3VzZXJPcHRpb25zJykucmV2ZXJzZSkgPyAncHJldicgOiAnbmV4dCddKCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgJGFsbFsoZ2V0RGF0YSgndXNlck9wdGlvbnMnKS5yZXZlcnNlKSA/ICdsYXN0JyA6ICdmaXJzdCddKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgJGZyYWN0aW9uYWwuYWRkQ2xhc3MoJ2JyLWZyYWN0aW9uYWwnKTtcbiAgICAgICAgICAgICAgICAgICAgJGZyYWN0aW9uYWwuYWRkQ2xhc3MoJ2JyLWZyYWN0aW9uYWwtJyArIGYpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIHRoZSBlbGVtZW50IGlzIGRlc2VsZWN0YWJsZT9cbiAgICAgICAgICAgIHZhciBpc0Rlc2VsZWN0YWJsZSA9IGZ1bmN0aW9uKCRlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgaWYgKCFnZXREYXRhKCdhbGxvd0VtcHR5JykgfHwgIWdldERhdGEoJ3VzZXJPcHRpb25zJykuZGVzZWxlY3RhYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKHJhdGluZ1ZhbHVlKCkgPT0gJGVsZW1lbnQuYXR0cignZGF0YS1yYXRpbmctdmFsdWUnKSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBoYW5kbGUgY2xpY2sgZXZlbnRzXG4gICAgICAgICAgICB2YXIgYXR0YWNoQ2xpY2tIYW5kbGVyID0gZnVuY3Rpb24oJGVsZW1lbnRzKSB7XG4gICAgICAgICAgICAgICAgJGVsZW1lbnRzLm9uKCdjbGljay5iYXJyYXRpbmcnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgJGEgPSAkKHRoaXMpLFxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucyA9IGdldERhdGEoJ3VzZXJPcHRpb25zJyksXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ7XG5cbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9ICRhLmF0dHIoJ2RhdGEtcmF0aW5nLXZhbHVlJyk7XG4gICAgICAgICAgICAgICAgICAgIHRleHQgPSAkYS5hdHRyKCdkYXRhLXJhdGluZy10ZXh0Jyk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gaXMgY3VycmVudCBhbmQgZGVzZWxlY3RhYmxlP1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNEZXNlbGVjdGFibGUoJGEpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGdldERhdGEoJ2VtcHR5UmF0aW5nVmFsdWUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQgPSBnZXREYXRhKCdlbXB0eVJhdGluZ1RleHQnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlbWVtYmVyIHNlbGVjdGVkIHJhdGluZ1xuICAgICAgICAgICAgICAgICAgICBzZXREYXRhKCdyYXRpbmdWYWx1ZScsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgc2V0RGF0YSgncmF0aW5nVGV4dCcsIHRleHQpO1xuICAgICAgICAgICAgICAgICAgICBzZXREYXRhKCdyYXRpbmdNYWRlJywgdHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgc2V0U2VsZWN0RmllbGRWYWx1ZSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHNob3dTZWxlY3RlZFJhdGluZyh0ZXh0KTtcblxuICAgICAgICAgICAgICAgICAgICBhcHBseVN0eWxlKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gb25TZWxlY3QgY2FsbGJhY2tcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5vblNlbGVjdC5jYWxsKFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZixcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhdGluZ1ZhbHVlKCksXG4gICAgICAgICAgICAgICAgICAgICAgICByYXRpbmdUZXh0KCksXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudFxuICAgICAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIGhhbmRsZSBtb3VzZWVudGVyIGV2ZW50c1xuICAgICAgICAgICAgdmFyIGF0dGFjaE1vdXNlRW50ZXJIYW5kbGVyID0gZnVuY3Rpb24oJGVsZW1lbnRzKSB7XG4gICAgICAgICAgICAgICAgJGVsZW1lbnRzLm9uKCdtb3VzZWVudGVyLmJhcnJhdGluZycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgJGEgPSAkKHRoaXMpO1xuXG4gICAgICAgICAgICAgICAgICAgIHJlc2V0U3R5bGUoKTtcblxuICAgICAgICAgICAgICAgICAgICAkYS5hZGRDbGFzcygnYnItYWN0aXZlJylbbmV4dEFsbG9yUHJldmlvdXNBbGwoKV0oKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdici1hY3RpdmUnKTtcblxuICAgICAgICAgICAgICAgICAgICBzaG93U2VsZWN0ZWRSYXRpbmcoJGEuYXR0cignZGF0YS1yYXRpbmctdGV4dCcpKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIGhhbmRsZSBtb3VzZWxlYXZlIGV2ZW50c1xuICAgICAgICAgICAgdmFyIGF0dGFjaE1vdXNlTGVhdmVIYW5kbGVyID0gZnVuY3Rpb24oJGVsZW1lbnRzKSB7XG4gICAgICAgICAgICAgICAgc2VsZi4kd2lkZ2V0Lm9uKCdtb3VzZWxlYXZlLmJhcnJhdGluZyBibHVyLmJhcnJhdGluZycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBzaG93U2VsZWN0ZWRSYXRpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgYXBwbHlTdHlsZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gc29tZXdoYXQgcHJpbWl0aXZlIHdheSB0byByZW1vdmUgMzAwbXMgY2xpY2sgZGVsYXkgb24gdG91Y2ggZGV2aWNlc1xuICAgICAgICAgICAgLy8gZm9yIGEgbW9yZSBhZHZhbmNlZCBzb2x1dGlvbiBjb25zaWRlciBzZXR0aW5nIGBmYXN0Q2xpY2tzYCBvcHRpb24gdG8gZmFsc2VcbiAgICAgICAgICAgIC8vIGFuZCB1c2luZyBhIGxpYnJhcnkgc3VjaCBhcyBmYXN0Y2xpY2sgKGh0dHBzOi8vZ2l0aHViLmNvbS9mdGxhYnMvZmFzdGNsaWNrKVxuICAgICAgICAgICAgdmFyIGZhc3RDbGlja3MgPSBmdW5jdGlvbigkZWxlbWVudHMpIHtcbiAgICAgICAgICAgICAgICAkZWxlbWVudHMub24oJ3RvdWNoc3RhcnQuYmFycmF0aW5nJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5jbGljaygpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gZGlzYWJsZSBjbGlja3NcbiAgICAgICAgICAgIHZhciBkaXNhYmxlQ2xpY2tzID0gZnVuY3Rpb24oJGVsZW1lbnRzKSB7XG4gICAgICAgICAgICAgICAgJGVsZW1lbnRzLm9uKCdjbGljay5iYXJyYXRpbmcnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdmFyIGF0dGFjaEhhbmRsZXJzID0gZnVuY3Rpb24oJGVsZW1lbnRzKSB7XG4gICAgICAgICAgICAgICAgLy8gYXR0YWNoIGNsaWNrIGV2ZW50IGhhbmRsZXJcbiAgICAgICAgICAgICAgICBhdHRhY2hDbGlja0hhbmRsZXIoJGVsZW1lbnRzKTtcblxuICAgICAgICAgICAgICAgIGlmIChzZWxmLm9wdGlvbnMuaG92ZXJTdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBhdHRhY2ggbW91c2VlbnRlciBldmVudCBoYW5kbGVyXG4gICAgICAgICAgICAgICAgICAgIGF0dGFjaE1vdXNlRW50ZXJIYW5kbGVyKCRlbGVtZW50cyk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gYXR0YWNoIG1vdXNlbGVhdmUgZXZlbnQgaGFuZGxlclxuICAgICAgICAgICAgICAgICAgICBhdHRhY2hNb3VzZUxlYXZlSGFuZGxlcigkZWxlbWVudHMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHZhciBkZXRhY2hIYW5kbGVycyA9IGZ1bmN0aW9uKCRlbGVtZW50cykge1xuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBldmVudCBoYW5kbGVycyBpbiB0aGUgXCIuYmFycmF0aW5nXCIgbmFtZXNwYWNlXG4gICAgICAgICAgICAgICAgJGVsZW1lbnRzLm9mZignLmJhcnJhdGluZycpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdmFyIHNldHVwSGFuZGxlcnMgPSBmdW5jdGlvbihyZWFkb25seSkge1xuICAgICAgICAgICAgICAgIHZhciAkZWxlbWVudHMgPSBzZWxmLiR3aWRnZXQuZmluZCgnYScpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGZhc3RDbGlja3MpIHtcbiAgICAgICAgICAgICAgICAgICAgZmFzdENsaWNrcygkZWxlbWVudHMpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChyZWFkb25seSkge1xuICAgICAgICAgICAgICAgICAgICBkZXRhY2hIYW5kbGVycygkZWxlbWVudHMpO1xuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlQ2xpY2tzKCRlbGVtZW50cyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYXR0YWNoSGFuZGxlcnMoJGVsZW1lbnRzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLnNob3cgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAvLyBydW4gb25seSBvbmNlXG4gICAgICAgICAgICAgICAgaWYgKGdldERhdGEoKSkgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgLy8gd3JhcCBlbGVtZW50XG4gICAgICAgICAgICAgICAgd3JhcEVsZW1lbnQoKTtcblxuICAgICAgICAgICAgICAgIC8vIHNhdmUgZGF0YVxuICAgICAgICAgICAgICAgIHNhdmVEYXRhT25FbGVtZW50KCk7XG5cbiAgICAgICAgICAgICAgICAvLyBidWlsZCAmIGFwcGVuZCB3aWRnZXQgdG8gdGhlIERPTVxuICAgICAgICAgICAgICAgIHNlbGYuJHdpZGdldCA9IGJ1aWxkV2lkZ2V0KCk7XG4gICAgICAgICAgICAgICAgc2VsZi4kd2lkZ2V0Lmluc2VydEFmdGVyKHNlbGYuJGVsZW0pO1xuXG4gICAgICAgICAgICAgICAgYXBwbHlTdHlsZSgpO1xuXG4gICAgICAgICAgICAgICAgc2hvd1NlbGVjdGVkUmF0aW5nKCk7XG5cbiAgICAgICAgICAgICAgICBzZXR1cEhhbmRsZXJzKHNlbGYub3B0aW9ucy5yZWFkb25seSk7XG5cbiAgICAgICAgICAgICAgICAvLyBoaWRlIHRoZSBzZWxlY3QgZmllbGRcbiAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLmhpZGUoKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMucmVhZG9ubHkgPSBmdW5jdGlvbihzdGF0ZSkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygc3RhdGUgIT09ICdib29sZWFuJyB8fCBnZXREYXRhKCdyZWFkT25seScpID09IHN0YXRlKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICBzZXR1cEhhbmRsZXJzKHN0YXRlKTtcbiAgICAgICAgICAgICAgICBzZXREYXRhKCdyZWFkT25seScsIHN0YXRlKTtcbiAgICAgICAgICAgICAgICBzZWxmLiR3aWRnZXQudG9nZ2xlQ2xhc3MoJ2JyLXJlYWRvbmx5Jyk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLnNldCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSBnZXREYXRhKCd1c2VyT3B0aW9ucycpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuJGVsZW0uZmluZCgnb3B0aW9uW3ZhbHVlPVwiJyArIHZhbHVlICsgJ1wiXScpLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgLy8gc2V0IGRhdGFcbiAgICAgICAgICAgICAgICBzZXREYXRhKCdyYXRpbmdWYWx1ZScsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICBzZXREYXRhKCdyYXRpbmdUZXh0Jywgc2VsZi4kZWxlbS5maW5kKCdvcHRpb25bdmFsdWU9XCInICsgdmFsdWUgKyAnXCJdJykudGV4dCgpKTtcbiAgICAgICAgICAgICAgICBzZXREYXRhKCdyYXRpbmdNYWRlJywgdHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICBzZXRTZWxlY3RGaWVsZFZhbHVlKHJhdGluZ1ZhbHVlKCkpO1xuICAgICAgICAgICAgICAgIHNob3dTZWxlY3RlZFJhdGluZyhyYXRpbmdUZXh0KCkpO1xuXG4gICAgICAgICAgICAgICAgYXBwbHlTdHlsZSgpO1xuXG4gICAgICAgICAgICAgICAgLy8gb25TZWxlY3QgY2FsbGJhY2tcbiAgICAgICAgICAgICAgICBpZiAoIW9wdGlvbnMuc2lsZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMub25TZWxlY3QuY2FsbChcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMsXG4gICAgICAgICAgICAgICAgICAgICAgICByYXRpbmdWYWx1ZSgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmF0aW5nVGV4dCgpXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy5jbGVhciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBvcHRpb25zID0gZ2V0RGF0YSgndXNlck9wdGlvbnMnKTtcblxuICAgICAgICAgICAgICAgIC8vIHJlc3RvcmUgb3JpZ2luYWwgZGF0YVxuICAgICAgICAgICAgICAgIHNldERhdGEoJ3JhdGluZ1ZhbHVlJywgZ2V0RGF0YSgnb3JpZ2luYWxSYXRpbmdWYWx1ZScpKTtcbiAgICAgICAgICAgICAgICBzZXREYXRhKCdyYXRpbmdUZXh0JywgZ2V0RGF0YSgnb3JpZ2luYWxSYXRpbmdUZXh0JykpO1xuICAgICAgICAgICAgICAgIHNldERhdGEoJ3JhdGluZ01hZGUnLCBmYWxzZSk7XG5cbiAgICAgICAgICAgICAgICByZXNldFNlbGVjdEZpZWxkKCk7XG4gICAgICAgICAgICAgICAgc2hvd1NlbGVjdGVkUmF0aW5nKHJhdGluZ1RleHQoKSk7XG5cbiAgICAgICAgICAgICAgICBhcHBseVN0eWxlKCk7XG5cbiAgICAgICAgICAgICAgICAvLyBvbkNsZWFyIGNhbGxiYWNrXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5vbkNsZWFyLmNhbGwoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMsXG4gICAgICAgICAgICAgICAgICAgIHJhdGluZ1ZhbHVlKCksXG4gICAgICAgICAgICAgICAgICAgIHJhdGluZ1RleHQoKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3kgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSByYXRpbmdWYWx1ZSgpO1xuICAgICAgICAgICAgICAgIHZhciB0ZXh0ID0gcmF0aW5nVGV4dCgpO1xuICAgICAgICAgICAgICAgIHZhciBvcHRpb25zID0gZ2V0RGF0YSgndXNlck9wdGlvbnMnKTtcblxuICAgICAgICAgICAgICAgIC8vIGRldGFjaCBoYW5kbGVyc1xuICAgICAgICAgICAgICAgIGRldGFjaEhhbmRsZXJzKHNlbGYuJHdpZGdldC5maW5kKCdhJykpO1xuXG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIHdpZGdldFxuICAgICAgICAgICAgICAgIHNlbGYuJHdpZGdldC5yZW1vdmUoKTtcblxuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBkYXRhXG4gICAgICAgICAgICAgICAgcmVtb3ZlRGF0YU9uRWxlbWVudCgpO1xuXG4gICAgICAgICAgICAgICAgLy8gdW53cmFwIHRoZSBlbGVtZW50XG4gICAgICAgICAgICAgICAgdW53cmFwRWxlbWVudCgpO1xuXG4gICAgICAgICAgICAgICAgLy8gc2hvdyB0aGUgZWxlbWVudFxuICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0uc2hvdygpO1xuXG4gICAgICAgICAgICAgICAgLy8gb25EZXN0cm95IGNhbGxiYWNrXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5vbkRlc3Ryb3kuY2FsbChcbiAgICAgICAgICAgICAgICAgICAgdGhpcyxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIHRleHRcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIEJhclJhdGluZy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uIChvcHRpb25zLCBlbGVtKSB7XG4gICAgICAgICAgICB0aGlzLiRlbGVtID0gJChlbGVtKTtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCAkLmZuLmJhcnJhdGluZy5kZWZhdWx0cywgb3B0aW9ucyk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnM7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIEJhclJhdGluZztcbiAgICB9KSgpO1xuXG4gICAgJC5mbi5iYXJyYXRpbmcgPSBmdW5jdGlvbiAobWV0aG9kLCBvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHBsdWdpbiA9IG5ldyBCYXJSYXRpbmcoKTtcblxuICAgICAgICAgICAgLy8gcGx1Z2luIHdvcmtzIHdpdGggc2VsZWN0IGZpZWxkc1xuICAgICAgICAgICAgaWYgKCEkKHRoaXMpLmlzKCdzZWxlY3QnKSkge1xuICAgICAgICAgICAgICAgICQuZXJyb3IoJ1NvcnJ5LCB0aGlzIHBsdWdpbiBvbmx5IHdvcmtzIHdpdGggc2VsZWN0IGZpZWxkcy4nKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gbWV0aG9kIHN1cHBsaWVkXG4gICAgICAgICAgICBpZiAocGx1Z2luLmhhc093blByb3BlcnR5KG1ldGhvZCkpIHtcbiAgICAgICAgICAgICAgICBwbHVnaW4uaW5pdChvcHRpb25zLCB0aGlzKTtcbiAgICAgICAgICAgICAgICBpZiAobWV0aG9kID09PSAnc2hvdycpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBsdWdpbi5zaG93KG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHBsdWdpbiBleGlzdHM/XG4gICAgICAgICAgICAgICAgICAgIGlmIChwbHVnaW4uJGVsZW0uZGF0YSgnYmFycmF0aW5nJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsdWdpbi4kd2lkZ2V0ID0gJCh0aGlzKS5uZXh0KCcuYnItd2lkZ2V0Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGx1Z2luW21ldGhvZF0ob3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIG5vIG1ldGhvZCBzdXBwbGllZCBvciBvbmx5IG9wdGlvbnMgc3VwcGxpZWRcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG1ldGhvZCA9PT0gJ29iamVjdCcgfHwgIW1ldGhvZCkge1xuICAgICAgICAgICAgICAgIG9wdGlvbnMgPSBtZXRob2Q7XG4gICAgICAgICAgICAgICAgcGx1Z2luLmluaXQob3B0aW9ucywgdGhpcyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBsdWdpbi5zaG93KCk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJC5lcnJvcignTWV0aG9kICcgKyBtZXRob2QgKyAnIGRvZXMgbm90IGV4aXN0IG9uIGpRdWVyeS5iYXJyYXRpbmcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgICQuZm4uYmFycmF0aW5nLmRlZmF1bHRzID0ge1xuICAgICAgICB0aGVtZTonJyxcbiAgICAgICAgaW5pdGlhbFJhdGluZzpudWxsLCAvLyBpbml0aWFsIHJhdGluZ1xuICAgICAgICBhbGxvd0VtcHR5Om51bGwsIC8vIGFsbG93IGVtcHR5IHJhdGluZ3M/XG4gICAgICAgIGVtcHR5VmFsdWU6JycsIC8vIHRoaXMgaXMgdGhlIGV4cGVjdGVkIHZhbHVlIG9mIHRoZSBlbXB0eSByYXRpbmdcbiAgICAgICAgc2hvd1ZhbHVlczpmYWxzZSwgLy8gZGlzcGxheSByYXRpbmcgdmFsdWVzIG9uIHRoZSBiYXJzP1xuICAgICAgICBzaG93U2VsZWN0ZWRSYXRpbmc6dHJ1ZSwgLy8gYXBwZW5kIGEgZGl2IHdpdGggYSByYXRpbmcgdG8gdGhlIHdpZGdldD9cbiAgICAgICAgZGVzZWxlY3RhYmxlOnRydWUsIC8vIGFsbG93IHRvIGRlc2VsZWN0IHJhdGluZ3M/XG4gICAgICAgIHJldmVyc2U6ZmFsc2UsIC8vIHJldmVyc2UgdGhlIHJhdGluZz9cbiAgICAgICAgcmVhZG9ubHk6ZmFsc2UsIC8vIG1ha2UgdGhlIHJhdGluZyByZWFkeS1vbmx5P1xuICAgICAgICBmYXN0Q2xpY2tzOnRydWUsIC8vIHJlbW92ZSAzMDBtcyBjbGljayBkZWxheSBvbiB0b3VjaCBkZXZpY2VzP1xuICAgICAgICBob3ZlclN0YXRlOnRydWUsIC8vIGNoYW5nZSBzdGF0ZSBvbiBob3Zlcj9cbiAgICAgICAgc2lsZW50OmZhbHNlLCAvLyBzdXByZXNzIGNhbGxiYWNrcyB3aGVuIGNvbnRyb2xsaW5nIHJhdGluZ3MgcHJvZ3JhbWF0aWNhbGx5XG4gICAgICAgIG9uU2VsZWN0OmZ1bmN0aW9uICh2YWx1ZSwgdGV4dCwgZXZlbnQpIHtcbiAgICAgICAgfSwgLy8gY2FsbGJhY2sgZmlyZWQgd2hlbiBhIHJhdGluZyBpcyBzZWxlY3RlZFxuICAgICAgICBvbkNsZWFyOmZ1bmN0aW9uICh2YWx1ZSwgdGV4dCkge1xuICAgICAgICB9LCAvLyBjYWxsYmFjayBmaXJlZCB3aGVuIGEgcmF0aW5nIGlzIGNsZWFyZWRcbiAgICAgICAgb25EZXN0cm95OmZ1bmN0aW9uICh2YWx1ZSwgdGV4dCkge1xuICAgICAgICB9IC8vIGNhbGxiYWNrIGZpcmVkIHdoZW4gYSB3aWRnZXQgaXMgZGVzdHJveWVkXG4gICAgfTtcblxuICAgICQuZm4uYmFycmF0aW5nLkJhclJhdGluZyA9IEJhclJhdGluZztcblxufSkpO1xuIiwiLyoqXG4gKiBAcGFja2FnZSAgICBLbm93IFJlc2VydmF0aW9uc1xuICogQHN1YnBhY2thZ2UgU2l0ZSBKU1xuICogQGNvcHlyaWdodCAgMjAyMCBIaWdobGFuZCBWaXNpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBAbGljZW5zZSAgICBTZWUgdGhlIGZpbGUgXCJMSUNFTlNFLnR4dFwiIGZvciB0aGUgZnVsbCBsaWNlbnNlIGdvdmVybmluZyB0aGlzIGNvZGUuXG4gKiBAYXV0aG9yICAgICBIYXplbCBXaWxzb24gPGhhemVsQGhpZ2hsYW5kdmlzaW9uLmNvbT5cbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxubGV0IHNlYXJjaERhdGEgPSBbXTtcbmxldCBzZWFyY2hEb25lID0gZmFsc2U7XG5sZXQgY2FsZW5kYXJMb2FkZWQgPSBmYWxzZTtcbmxldCBzYXZlZHdpZHRoID0gZmFsc2U7XG5sZXQgbGFyZ2U7XG5sZXQgcmVzaXplZCA9IGZhbHNlO1xubGV0IHNjbG9hZGVkID0gZmFsc2U7XG5cbihmdW5jdGlvbiAoJCkge1xuICAgICQoZnVuY3Rpb24gKCkge1xuICAgICAgICBGb3VuZGF0aW9uLmFkZFRvSnF1ZXJ5KCk7XG4gICAgICAgICQoZG9jdW1lbnQpLmZvdW5kYXRpb24oKTtcblxuICAgICAgICBjaGVja1NjcmVlbldpZHRoKCk7XG4gICAgICAgICQod2luZG93KS5vbihcInJlc2l6ZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjaGVja1NjcmVlbldpZHRoKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGJhcnMgPSAkKCcua3ItcmF0aW5nJyk7XG4gICAgICAgIGlmIChiYXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgYmFycy5iYXJyYXRpbmcoJ3Nob3cnLCB7XG4gICAgICAgICAgICAgICAgc2hvd1ZhbHVlczogdHJ1ZSxcbiAgICAgICAgICAgICAgICBzaG93U2VsZWN0ZWRSYXRpbmc6IGZhbHNlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0ICRjdHJpZ2dlciA9ICQoJyNrci1wYWdlLWdlcmlhdHJpYy1jYWxlbmRhci10cmlnZ2VyJyk7XG4gICAgICAgIGlmICgkY3RyaWdnZXIubGVuZ3RoICYmICFjYWxlbmRhckxvYWRlZCkge1xuICAgICAgICAgICAgbG9hZENhbGVuZGFyKCRjdHJpZ2dlci5kYXRhKCdwaWQnKSwgJGN0cmlnZ2VyLmRhdGEoJ3RhcmdldCcpKTtcbiAgICAgICAgICAgIGNhbGVuZGFyTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGNvbnN0IHN0aWNreSA9ICQoJy5zdGlja3knKTtcbiAgICAgICAgICAgIGlmIChzdGlja3kubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgJCgnLnN0aWNreScpLmZvdW5kYXRpb24oJ19jYWxjJywgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAkKGRvY3VtZW50KS5vbignc3VibWl0JywgJy5hamF4Zm9ybScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjb25zdCAkZm9ybSA9ICQodGhpcyk7XG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICB1cmw6ICRmb3JtLmF0dHIoJ2FjdGlvbicpLFxuICAgICAgICAgICAgICAgIGRhdGE6ICRmb3JtLnNlcmlhbGl6ZSgpLFxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1SZXNwb25zZSgkZm9ybS5hdHRyKCdpZCcpLCByZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy8nO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmtyLWFqYXgtbW9kYWwtZXJyb3ItbWVzc2FnZScpLmh0bWwocmVzdWx0Lm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgJG1vZGFsID0gbmV3IEZvdW5kYXRpb24uUmV2ZWFsKCQoJyNLckFqYXhNb2RhbEVycm9yJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJG1vZGFsLm9wZW4oKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgJCgnLmtyLWFqYXgtbW9kYWwtZXJyb3ItbWVzc2FnZScpLmh0bWwoJ1NvcnJ5IGFuIGVycm9yIGhhcyBvY2N1cnJlZCwgcGxlYXNlIHRyeSBhZ2FpbicpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCAkbW9kYWwgPSBuZXcgRm91bmRhdGlvbi5SZXZlYWwoJCgnI0tyQWpheE1vZGFsRXJyb3InKSk7XG4gICAgICAgICAgICAgICAgICAgICRtb2RhbC5vcGVuKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pLm9uKCdzaG93LnpmLmRyb3Bkb3duJywgJy5ub3Njcm9sbCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQoJ2JvZHknKS5hZGRDbGFzcyhcInN0YXRpY3BhbmVcIik7XG4gICAgICAgICAgICAkKHRoaXMpLmNzcygnb3BhY2l0eScsICcxJyk7XG4gICAgICAgIH0pLm9uKCdoaWRlLnpmLmRyb3Bkb3duJywgJy5ub3Njcm9sbCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcyhcInN0YXRpY3BhbmVcIik7XG4gICAgICAgICAgICAkKHRoaXMpLmNzcygnb3BhY2l0eScsICcwJyk7XG4gICAgICAgIH0pLm9uKCdoaWRlLnpmLmRyb3Bkb3duJywgJyNrci1xdW90ZS1mb3JtJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJCgnI2d1ZXN0cycpLnRyaWdnZXIoJ2NoYW5nZScpO1xuICAgICAgICB9KS5vbignb3Blbi56Zi5yZXZlYWwnLCAnLmtyLWFqYXgtbW9kYWxbZGF0YS1yZXZlYWxdJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGNvbnN0IG1vZGFsaWQgPSBcIiNcIiArICQodGhpcykuYXR0cignaWQnKTtcbiAgICAgICAgICAgIGlmICghJC50cmltKCQobW9kYWxpZCkuaHRtbCgpKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBhamF4dXJsID0gJCh0aGlzKS5kYXRhKCdhamF4dXJsJyk7XG4gICAgICAgICAgICAgICAgaWYgKGFqYXh1cmwpIHtcbiAgICAgICAgICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogYWpheHVybCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChjb250ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChtb2RhbGlkKS5odG1sKGNvbnRlbnQpLnRyaWdnZXIoJ3Jlc2l6ZW1lLnpmLnJldmVhbCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQobW9kYWxpZCkuZm91bmRhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLm9uKCdvcGVuLnpmLnJldmVhbCcsICcja3ItZ2F0ZXdheS1tb2RhbFtkYXRhLXJldmVhbF0nLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgaWYgKCFzY2xvYWRlZCkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAkLmdldFNjcmlwdCgnbWVkaWEvY29tX2tub3dyZXMvanMvc3RyaXBlY2hlY2tvdXQubWluLmpzJyk7XG4gICAgICAgICAgICAgICAgc2Nsb2FkZWQgPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpbml0aWFsaXplU3RyaXBlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLm9uKCdjbGljaycsICcuZmF2c3BhbicsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjb25zdCBwaWQgPSAkKHRoaXMpLmRhdGEoJ3Byb3BlcnR5Jyk7XG4gICAgICAgICAgICBjb25zdCBiYXIgPSAkKCcua3Itc2VhcmNoYmFyIGEuaXMtYWN0aXZlJykuZGF0YSgnYmFyJyk7XG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICB1cmw6ICcvaW5kZXgucGhwP29wdGlvbj1jb21fa25vd3JlcyZ0YXNrPXByb3BlcnRpZXMuZmF2b3VyaXRlJyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7J3Byb3BlcnR5X2lkJzogcGlkfSxcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRQcm9wZXJ0aWVzKGJhcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuZmF2aWNvbi10b3AnKS5mb3VuZGF0aW9uKCdoaWRlJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSkub24oJ2NsaWNrJywgJy5nZXRSZXNwb25zZVNlYXJjaCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5kYXRhKCdhY3Rpb24nKSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgZ2V0UHJvcGVydGllcygkKHRoaXMpLmRhdGEoJ2JhcicpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZ2V0UHJvcGVydGllcygkKHRoaXMpLmRhdGEoJ2JhcicpLCAkKHRoaXMpLmRhdGEoJ2FjdGlvbicpLCAkKHRoaXMpLmRhdGEoJ2FjdGlvbi12YWx1ZScpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkub24oJ2NsaWNrJywgJy5rci1maWx0ZXJzLWNsb3NlJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICQoJy5rci1maWx0ZXJzLnRvcCcpLmFkZENsYXNzKCdoaWRlbWUnKTtcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICB9KS5vbignY2xpY2snLCAnLmtyLWZpbHRlcnMgdWwuZmlsdGVyLXNvcnQtbGlzdCBsaS5oZWFkJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICQodGhpcykucGFyZW50KCkuY2hpbGRyZW4oJ2xpLmZpbHRlci1pdGVtJykudG9nZ2xlKCk7XG4gICAgICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgfSkub24oJ2NsaWNrJywgJyNzaG93Z2F0ZXdheXMnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgJCgnI2tyLWdhdGV3YXlzJykudG9nZ2xlQ2xhc3MoJ2hpZGVtZScpO1xuICAgICAgICB9KS5vbignY2xpY2snLCAnYS5rci1zZWFyY2hiYXInLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgc2V0QWN0aXZlTWVudSgkKHRoaXMpLmRhdGEoJ2JhcicpKTtcbiAgICAgICAgfSkub24oJ2NsaWNrJywgJy50b2dnbGVvdGhlcicsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAkKHRoaXMpLmRhdGEoJ290aGVyJykudG9nZ2xlKCk7XG4gICAgICAgIH0pLm9uKCdjbGljaycsICcja3ItcHJvcGVydHktdGFicyBhW2hyZWY9XCIjY2FsZW5kYXJcIl0nLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgaWYgKCFjYWxlbmRhckxvYWRlZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBpZCA9ICQodGhpcykuZGF0YSgncGlkJyk7XG4gICAgICAgICAgICAgICAgbG9hZENhbGVuZGFyKHBpZCwgJyNjYWxlbmRhci50YWJzLXBhbmVsJyk7XG4gICAgICAgICAgICAgICAgY2FsZW5kYXJMb2FkZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KS5vbignbW91c2VvdmVyJywgJyNrci10aHVtYiBpbWcnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBsZXQgcHJvcGVydHkgPSAkKHRoaXMpLnBhcmVudCgpLmRhdGEoJ2lkJyk7XG4gICAgICAgICAgICBpZiAocHJvcGVydHkpIHtcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0ID0gJy50aHVtYm92ZXJ2aWV3JyArIHByb3BlcnR5O1xuICAgICAgICAgICAgICAgICQoJyNwaW5mbycpLmh0bWwoJCh0YXJnZXQpLmh0bWwoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxldCAkcHJvcHMgPSAkKCcua3ItcHJvcGVydGllcycpO1xuICAgICAgICBpZiAoJHByb3BzLmxlbmd0aCAmJiAhc2VhcmNoRG9uZSkge1xuICAgICAgICAgICAgZ2V0UHJvcGVydGllcygkcHJvcHMuZGF0YSgnYmFyJykpO1xuICAgICAgICB9XG4gICAgICAgIGxldCAkdGFicyA9ICQoJy50YWJzJyk7XG4gICAgICAgIGlmICgkKCcja3ItcHJvcGVydHktdGFicycpLmxlbmd0aCAmJiAhY2FsZW5kYXJMb2FkZWQpIHtcbiAgICAgICAgICAgICR0YWJzLmZpbmQoJ2EnKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5hdHRyKCdocmVmJykgPT09IFwiI2NhbGVuZGFyXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGlkID0gJCh0aGlzKS5kYXRhKCdwaWQnKTtcbiAgICAgICAgICAgICAgICAgICAgbG9hZENhbGVuZGFyKHBpZCwgJyNjYWxlbmRhci50YWJzLXBhbmVsJyk7XG4gICAgICAgICAgICAgICAgICAgIGNhbGVuZGFyTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgJC5ldmVudC5zcGVjaWFsLnRvdWNoc3RhcnQgPSB7XG4gICAgICAgIHNldHVwOiBmdW5jdGlvbiAoXywgbnMsIGhhbmRsZSkge1xuICAgICAgICAgICAgaWYgKG5zLmluY2x1ZGVzKFwibm9QcmV2ZW50RGVmYXVsdFwiKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgaGFuZGxlLCB7cGFzc2l2ZTogZmFsc2V9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCBoYW5kbGUsIHtwYXNzaXZlOiB0cnVlfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgICQuZXZlbnQuc3BlY2lhbC50b3VjaG1vdmUgPSB7XG4gICAgICAgIHNldHVwOiBmdW5jdGlvbiAoXywgbnMsIGhhbmRsZSkge1xuICAgICAgICAgICAgaWYgKG5zLmluY2x1ZGVzKFwibm9QcmV2ZW50RGVmYXVsdFwiKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLCBoYW5kbGUsIHtwYXNzaXZlOiBmYWxzZX0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIiwgaGFuZGxlLCB7cGFzc2l2ZTogdHJ1ZX0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGxvYWRDYWxlbmRhcihwaWQsIHRhcmdldCkge1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICAgICAgdXJsOiAnL2luZGV4LnBocD9vcHRpb249Y29tX2tub3dyZXMmdGFzaz1wcm9wZXJ0eS5nZXJpYXRyaWMnLFxuICAgICAgICAgICAgZGF0YVR5cGU6ICdodG1sJyxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAncGlkJzogcGlkXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAkKHRhcmdldCkuYXBwZW5kKGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmb3JtUmVzcG9uc2UoaWQsIGRhdGEpIHtcbiAgICAgICAgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoJ3JlZGlyZWN0JykpIHtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKGRhdGEucmVkaXJlY3QpO1xuICAgICAgICB9IGVsc2UgaWYgKGlkID09PSAna3ItZm9ybS1wYXltZW50Jykge1xuICAgICAgICAgICAgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoJ2h0bWwnKSkge1xuICAgICAgICAgICAgICAgIGxldCAkbW9kYWwgPSAkKCcja3ItZ2F0ZXdheS1tb2RhbCcpO1xuICAgICAgICAgICAgICAgICRtb2RhbC5odG1sKGRhdGEuaHRtbCkudHJpZ2dlcigncmVzaXplbWUuemYucmV2ZWFsJyk7XG4gICAgICAgICAgICAgICAgJG1vZGFsLmZvdW5kYXRpb24oJ29wZW4nKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnLyc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoaWQgPT09ICdrci1mb3JtLW1haWxjaGltcCcpIHtcbiAgICAgICAgICAgICQoJyNyZXNwb25zZTInKS5odG1sKGRhdGEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0UHJvcGVydGllcyhiYXIsIGFjdGlvbiA9ICcnLCBhY3Rpb25fdmFsdWUgPSAnJykge1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiAnL2luZGV4LnBocD9vcHRpb249Y29tX2tub3dyZXMmdGFzaz1wcm9wZXJ0aWVzLnJhdycsXG4gICAgICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgICAgICBkYXRhOiB7J2Jhcic6IGJhciwgJ2FjdGlvbic6IGFjdGlvbiwgJ2FjdGlvbl92YWx1ZSc6IGFjdGlvbl92YWx1ZX0sXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29uc3QgdmFscyA9IFsnZ3JpZCcsICdsaXN0JywgJ2ZhdnMnLCAnbWFwJ107XG4gICAgICAgICAgICAgICAgaWYgKHZhbHMuaW5jbHVkZXMoZGF0YS5iYXIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldEFjdGl2ZU1lbnUoZGF0YS5iYXIpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHNldFNlYXJjaERhdGEoZGF0YSwgZGF0YS5iYXIpO1xuICAgICAgICAgICAgICAgICQoJy5oYXMtdGlwJykuZm91bmRhdGlvbigpO1xuICAgICAgICAgICAgICAgICQoJy5kcm9wZG93bi1wYW5lJykuZm91bmRhdGlvbigpO1xuICAgICAgICAgICAgICAgICQoJy5rci1wcm9wZXJ0eSAuY2FyZCcpLmZvdW5kYXRpb24oKTtcbiAgICAgICAgICAgICAgICAkKCcja3Itb3JkZXItY2xvc2UnKS50cmlnZ2VyKCdjbGljaycpO1xuICAgICAgICAgICAgICAgIHNlYXJjaERvbmUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRTZWFyY2hEYXRhKHJlc3BvbnNlLCBhY3Rpb24gPSAnJykge1xuICAgICAgICBsZXQgJHNpZGViYXI7XG4gICAgICAgIGlmIChyZXNwb25zZSkge1xuICAgICAgICAgICAgJCgnI2tyLXByb3BlcnRpZXMtZGF0YScpLmVtcHR5KCkuZmFkZUluKCdzbG93JykuaHRtbChyZXNwb25zZVsnaXRlbXMnXSkuZm91bmRhdGlvbigpO1xuICAgICAgICAgICAgJCgnLmtyLXBhZ2VyJykuaHRtbChyZXNwb25zZVsncGFnaW5hdGlvbiddKTtcbiAgICAgICAgICAgICQoJy5rci1wYWdlci5ib3R0b20nKS5odG1sKHJlc3BvbnNlWydwYWdpbmF0aW9uJ10pO1xuICAgICAgICAgICAgJChcIiNrci1vZmZjYW52YXMtcHJvcGVydGllcy1maWx0ZXJcIikuaHRtbChyZXNwb25zZVsnZmlsdGVycyddKTtcbiAgICAgICAgICAgICQoXCIja3Itb2ZmY2FudmFzLXByb3BlcnRpZXMtc29ydGJ5XCIpLmh0bWwocmVzcG9uc2VbJ3NvcnRieSddKTtcbiAgICAgICAgICAgICRzaWRlYmFyID0gJChcIiNrci1zaWRlYmFyLXNlYXJjaFwiKTtcbiAgICAgICAgICAgIGlmICgkc2lkZWJhci5sZW5ndGggJiYgcmVzcG9uc2VbJ3NlYXJjaCddLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICRzaWRlYmFyLmVtcHR5KCkuaHRtbChyZXNwb25zZVsnc2VhcmNoJ10pO1xuICAgICAgICAgICAgICAgICQoJ2JvZHknKS50cmlnZ2VyKCdpbml0YWpheHNlYXJjaCcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoYWN0aW9uID09PSAncGFnZScpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRBY3RpdmVNZW51KGJhcikge1xuICAgICAgICBjb25zdCBzZWFyY2hiYXIgPSAkKCcua3Itc2VhcmNoYmFyJykuZmluZCgnLmJ1dHRvbicpO1xuICAgICAgICAkLmVhY2goc2VhcmNoYmFyLCBmdW5jdGlvbiAoaW5kZXgsIHNlYXJjaGJhcikge1xuICAgICAgICAgICAgJChzZWFyY2hiYXIpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgfSk7XG4gICAgICAgICQoJy5rci1zZWFyY2hiYXIgLmJ1dHRvbi4nICsgYmFyKS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIHRydWUgaWYgd2lkdGggaGFzIGNoYW5nZWRcbiAgICBmdW5jdGlvbiBzY3JlZW5XaWR0aEhhc0NoYW5nZWQoKSB7XG4gICAgICAgIGxhcmdlID0gRm91bmRhdGlvbi5NZWRpYVF1ZXJ5LmF0TGVhc3QoJ2xhcmdlJyk7XG4gICAgICAgIGlmIChsYXJnZSAhPT0gc2F2ZWR3aWR0aCkge1xuICAgICAgICAgICAgc2F2ZWR3aWR0aCA9IGxhcmdlO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoZWNrU2NyZWVuV2lkdGgoKSB7XG4gICAgICAgIHJlc2l6ZWQgPSBmYWxzZTtcbiAgICAgICAgaWYgKHNjcmVlbldpZHRoSGFzQ2hhbmdlZCgpICYmIHNlYXJjaERhdGFbJ2l0ZW1zJ10gJiYgIXJlc2l6ZWQpIHtcbiAgICAgICAgICAgIHNldFNlYXJjaERhdGEoc2VhcmNoRGF0YSk7XG4gICAgICAgICAgICByZXNpemVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgICQuZXZlbnQuc3BlY2lhbC50b3VjaHN0YXJ0ID0ge1xuICAgICAgICBzZXR1cDogZnVuY3Rpb24gKF8sIG5zLCBoYW5kbGUpIHtcbiAgICAgICAgICAgIGlmIChucy5pbmNsdWRlcyhcIm5vUHJldmVudERlZmF1bHRcIikpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIGhhbmRsZSwge3Bhc3NpdmU6IGZhbHNlfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgaGFuZGxlLCB7cGFzc2l2ZTogdHJ1ZX0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICAkLmV2ZW50LnNwZWNpYWwudG91Y2htb3ZlID0ge1xuICAgICAgICBzZXR1cDogZnVuY3Rpb24gKF8sIG5zLCBoYW5kbGUpIHtcbiAgICAgICAgICAgIGlmIChucy5pbmNsdWRlcyhcIm5vUHJldmVudERlZmF1bHRcIikpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIiwgaGFuZGxlLCB7cGFzc2l2ZTogZmFsc2V9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsIGhhbmRsZSwge3Bhc3NpdmU6IHRydWV9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG59KGpRdWVyeSkpOyIsIi8qKlxuICogQHBhY2thZ2UgICAgS25vdyBSZXNlcnZhdGlvbnNcbiAqIEBzdWJwYWNrYWdlIFNpdGUgSlNcbiAqIEBjb3B5cmlnaHQgIDIwMjAgSGlnaGxhbmQgVmlzaW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogQGxpY2Vuc2UgICAgU2VlIHRoZSBmaWxlIFwiTElDRU5TRS50eHRcIiBmb3IgdGhlIGZ1bGwgbGljZW5zZSBnb3Zlcm5pbmcgdGhpcyBjb2RlLlxuICogQGF1dGhvciAgICAgSGF6ZWwgV2lsc29uIDxoYXplbEBoaWdobGFuZHZpc2lvbi5jb20+XG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoJCkge1xuXHRpZiAoIXdpbmRvdy5sb2NhdGlvbi5vcmlnaW4pXG5cdFx0d2luZG93LmxvY2F0aW9uLm9yaWdpbiA9IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCArIFwiLy9cIiArIHdpbmRvdy5sb2NhdGlvbi5ob3N0O1xuXG5cdGxldCBteUNvbmZpcm0sICRteVRhc2s7XG5cblx0Y2xhc3MgS3Jjb25maXJtIHtcblx0XHRjb25zdHJ1Y3RvcigkZm9ybSkge1xuXHRcdFx0dGhpcy5mb3JtID0gJGZvcm07XG5cdFx0XHR0aGlzLmluaXQoKTtcblx0XHR9XG5cblx0XHRpbml0KCkge1xuXHRcdFx0dGhpcy51cGRhdGVRdW90ZSh0aGlzLmZvcm0pO1xuXHRcdH1cblxuXHRcdHVwZGF0ZVF1b3RlKCRmb3JtKSB7XG5cdFx0XHQkbXlUYXNrID0gJCgnI215dGFzaycpO1xuXHRcdFx0JG15VGFzay52YWwoJ2NvbmZpcm0uY29tcHV0ZScpO1xuXHRcdFx0alF1ZXJ5LmFqYXgoe1xuXHRcdFx0XHR0eXBlOiAgICAgJ1BPU1QnLFxuXHRcdFx0XHR1cmw6ICAgICAgJ2luZGV4LnBocD9vcHRpb249Y29tX2tub3dyZXMmdGFzaz1jb25maXJtLmNvbXB1dGUnLFxuXHRcdFx0XHRkYXRhOiAgICAgJGZvcm0uc2VyaWFsaXplQXJyYXkoKSxcblx0XHRcdFx0ZGF0YVR5cGU6ICdqc29uJyxcblx0XHRcdFx0c3VjY2VzczogIGZ1bmN0aW9uIChyZXN1bHQpIHtcblx0XHRcdFx0XHQkbXlUYXNrLnZhbCgnY29uZmlybS5wYXltZW50Jyk7XG5cdFx0XHRcdFx0aWYgKHJlc3VsdC5zdWNjZXNzKSB7XG5cdFx0XHRcdFx0XHRjb25zdCBkYXRhID0gcmVzdWx0LmRhdGE7XG5cdFx0XHRcdFx0XHRpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eSgncmVkaXJlY3QnKSkge1xuXHRcdFx0XHRcdFx0XHR3aW5kb3cubG9jYXRpb24ucmVwbGFjZShkYXRhLnJlZGlyZWN0KTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGxldCBkaXY7XG5cdFx0XHRcdFx0XHQkLmVhY2gocmVzdWx0LmRhdGEucmVzcG9uc2UsIGZ1bmN0aW9uIChrZXksIHZhbCkge1xuXHRcdFx0XHRcdFx0XHQkKCcuaGlkZWluaXRpYWwnKS5zaG93KCk7XG5cdFx0XHRcdFx0XHRcdGRpdiA9IFwiI1wiICsga2V5O1xuXHRcdFx0XHRcdFx0XHQkKGRpdikudGV4dCh2YWwpO1xuXHRcdFx0XHRcdFx0XHQkKGRpdikuaHRtbCh2YWwpO1xuXHRcdFx0XHRcdFx0XHQkKGRpdikudmFsKHZhbCk7XG5cdFx0XHRcdFx0XHRcdCQoZGl2KS5zaG93KCk7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0JCgnLmtyLWFqYXgtbW9kYWwtZXJyb3ItbWVzc2FnZScpLmh0bWwocmVzdWx0Lm1lc3NhZ2UpO1xuXHRcdFx0XHRcdFx0Y29uc3QgJG1vZGFsID0gbmV3IEZvdW5kYXRpb24uUmV2ZWFsKCQoJyNLckFqYXhNb2RhbEVycm9yJykpO1xuXHRcdFx0XHRcdFx0JG1vZGFsLm9wZW4oKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdCQoZnVuY3Rpb24gKCkge1xuXHRcdGxldCAkZWxlbWVudCA9ICQoJyNrci1mb3JtLWNvbmZpcm0nKTtcblx0XHRpZiAoJGVsZW1lbnQubGVuZ3RoKSB7XG5cdFx0XHRteUNvbmZpcm0gPSBuZXcgS3Jjb25maXJtKCRlbGVtZW50KTtcblx0XHR9XG5cdFx0JGVsZW1lbnQub24oJ2NoYW5nZSBjbGljaycsICcua3ItY2FsY3VsYXRlJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdCRlbGVtZW50ID0gJCgnI2tyLWZvcm0tY29uZmlybScpO1xuXHRcdFx0bXlDb25maXJtLnVwZGF0ZVF1b3RlKCRlbGVtZW50KTtcblx0XHR9KTtcblxuXHRcdCQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcjY2hlY2t0ZXJtcycsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRpZiAoY2hlY2tUZXJtcygpKSB7XG5cdFx0XHRcdCQoJyNjaGVja3Rlcm1zJykudHJpZ2dlcignc3VibWl0Jyk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0pO1xuXG5cdC8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuXHRmdW5jdGlvbiBjaGVja1Rlcm1zKCkge1xuXHRcdGxldCByZXN1bHQgPSB0cnVlO1xuXHRcdGNvbnN0IHRlc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWdyZWVjaGVjaycpO1xuXHRcdGNvbnN0IHRlc3RjID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FncmVlY2hlY2tjJyk7XG5cdFx0Y29uc3QgdGVzdHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWdyZWVjaGVja3QnKTtcblxuXHRcdC8vIG5vaW5zcGVjdGlvbiBKU1VucmVzb2x2ZWRWYXJpYWJsZVxuXHRcdGlmICh0ZXN0ICYmICFkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgna3ItZm9ybS1wYXltZW50JykuYWdyZWVjaGVjay5jaGVja2VkKSB7XG5cdFx0XHRyZXN1bHQgPSBmYWxzZTtcblx0XHR9XG5cdFx0Ly8gbm9pbnNwZWN0aW9uIEpTVW5yZXNvbHZlZFZhcmlhYmxlXG5cdFx0aWYgKHRlc3RjICYmICFkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgna3ItZm9ybS1wYXltZW50JykuYWdyZWVjaGVja2MuY2hlY2tlZCkge1xuXHRcdFx0cmVzdWx0ID0gZmFsc2U7XG5cdFx0fVxuXHRcdC8vIG5vaW5zcGVjdGlvbiBKU1VucmVzb2x2ZWRWYXJpYWJsZVxuXHRcdGlmICh0ZXN0dCAmJiAhZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2tyLWZvcm0tcGF5bWVudCcpLmFncmVlY2hlY2t0LmNoZWNrZWQpIHtcblx0XHRcdHJlc3VsdCA9IGZhbHNlO1xuXHRcdH1cblxuXHRcdGlmIChyZXN1bHQpIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zdCAkbW9kYWwgPSBuZXcgRm91bmRhdGlvbi5SZXZlYWwoJCgnI2Vycm9yTW9kYWwnKSk7XG5cdFx0XHQkbW9kYWwub3BlbigpO1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0fVxufShqUXVlcnkpKTsiLCIvKipcbiAqIEBwYWNrYWdlICAgIEtub3cgUmVzZXJ2YXRpb25zXG4gKiBAc3VicGFja2FnZSBTaXRlIEpTXG4gKiBAY29weXJpZ2h0ICAyMDIwIEhpZ2hsYW5kIFZpc2lvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIEBsaWNlbnNlICAgIFNlZSB0aGUgZmlsZSBcIkxJQ0VOU0UudHh0XCIgZm9yIHRoZSBmdWxsIGxpY2Vuc2UgZ292ZXJuaW5nIHRoaXMgY29kZS5cbiAqIEBhdXRob3IgICAgIEhhemVsIFdpbHNvbiA8aGF6ZWxAaGlnaGxhbmR2aXNpb24uY29tPlxuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG5pZiAoIXdpbmRvdy5sb2NhdGlvbi5vcmlnaW4pIHtcblx0d2luZG93LmxvY2F0aW9uLm9yaWdpbiA9IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCArIFwiLy9cIiArIHdpbmRvdy5sb2NhdGlvbi5ob3N0O1xufVxuXG4oZnVuY3Rpb24gKCQpIHtcblx0bGV0IG15S3JEb2JFbnRyeTtcblx0bGV0IHRvZGF5O1xuXHRsZXQga2V5ID0ge0JBQ0tTUEFDRTogOH07XG5cblx0bGV0IHNldHRpbmdzID0ge1xuXHRcdGN1c3RvbV92YWxpZGF0aW9uOiAgICAgZmFsc2UsXG5cdFx0ZGF5c19pbl9tb250aDogICAgICAgICBbMzEsIDI4LCAzMSwgMzAsIDMxLCAzMCwgMzEsIDMxLCAzMCwgMzEsIDMwLCAzMV0sXG5cdFx0ZG9jdW1lbnRfZGF0ZTogICAgICAgICBmYWxzZSxcblx0XHRlcnJvcmJveF94OiAgICAgICAgICAgIDEsXG5cdFx0ZXJyb3Jib3hfeTogICAgICAgICAgICA1LFxuXHRcdGZpZWxkX2hpbnRfdGV4dF9kYXk6ICAgJ0REJyxcblx0XHRmaWVsZF9oaW50X3RleHRfbW9udGg6ICdNTScsXG5cdFx0ZmllbGRfaGludF90ZXh0X3llYXI6ICAnWVlZWScsXG5cdFx0ZmllbGRfb3JkZXI6ICAgICAgICAgICAnRE1ZJyxcblx0XHRmaWVsZF93aWR0aF9kYXk6ICAgICAgIDYsXG5cdFx0ZmllbGRfd2lkdGhfbW9udGg6ICAgICA2LFxuXHRcdGZpZWxkX3dpZHRoX3llYXI6ICAgICAgNyxcblx0XHRmaWVsZF93aWR0aF9zZXA6ICAgICAgIDIsXG5cdFx0bWlubWF4OiAgICAgICAgICAgICAgICAnJyxcblx0XHRtaW5fZGF0ZTogICAgICAgICAgICAgIGZhbHNlLFxuXHRcdG1heF9kYXRlOiAgICAgICAgICAgICAgZmFsc2UsXG5cdFx0bWluX3llYXI6ICAgICAgICAgICAgICAxOTEwLFxuXHRcdG1vbnRoX25hbWU6ICAgICAgICAgICAgW1xuXHRcdFx0J0phbnVhcnknLCAnRmVicnVhcnknLCAnTWFyY2gnLCAnQXByaWwnLFxuXHRcdFx0J01heScsICdKdW5lJywgJ0p1bHknLCAnQXVndXN0JywgJ1NlcHRlbWJlcicsXG5cdFx0XHQnT2N0b2JlcicsICdOb3ZlbWJlcicsICdEZWNlbWJlciddLFxuXHRcdG9uX2JsdXI6ICAgICAgICAgICAgICAgZmFsc2UsXG5cdFx0b25fZXJyb3I6ICAgICAgICAgICAgICBmYWxzZSxcblx0XHRvbl9jaGFuZ2U6ICAgICAgICAgICAgIGZhbHNlLFxuXHRcdHBhcnNlX2RhdGU6ICAgICAgICAgICAgdHJ1ZSxcblx0XHRzZXBhcmF0b3I6ICAgICAgICAgICAgICcvJyxcblx0XHRzaG93X2Vycm9yczogICAgICAgICAgIHRydWUsXG5cdFx0c2hvd19oaW50czogICAgICAgICAgICB0cnVlLFxuXHRcdEVfREFZX05BTjogICAgICAgICAgICAgJ0RheSBtdXN0IGJlIGEgbnVtYmVyJyxcblx0XHRFX0RBWV9UT09fQklHOiAgICAgICAgICdEYXkgbXVzdCBiZSAxLTMxJyxcblx0XHRFX0RBWV9UT09fU01BTEw6ICAgICAgICdEYXkgbXVzdCBiZSAxLTMxJyxcblx0XHRFX0JBRF9EQVlfRk9SX01PTlRIOiAgICdPbmx5ICVkIGRheXMgaW4gJW0gJXknLFxuXHRcdEVfTU9OVEhfTkFOOiAgICAgICAgICAgJ01vbnRoIG11c3QgYmUgYSBudW1iZXInLFxuXHRcdEVfTU9OVEhfVE9PX0JJRzogICAgICAgJ01vbnRoIG11c3QgYmUgMS0xMicsXG5cdFx0RV9NT05USF9UT09fU01BTEw6ICAgICAnTW9udGggY2Fubm90IGJlIDAnLFxuXHRcdEVfWUVBUl9OQU46ICAgICAgICAgICAgJ1llYXIgbXVzdCBiZSBhIG51bWJlcicsXG5cdFx0RV9ZRUFSX0xFTkdUSDogICAgICAgICAnWWVhciBtdXN0IGJlIDQgZGlnaXRzJyxcblx0XHRFX1lFQVJfVE9PX1NNQUxMOiAgICAgICdZZWFyIG11c3Qgbm90IGJlIGJlZm9yZSAleScsXG5cdFx0RV9NSU5fREFURTogICAgICAgICAgICAnRGF0ZSBtdXN0IG5vdCBiZSBpbiB0aGUgcGFzdCcsXG5cdFx0RV9NQVhfREFURTogICAgICAgICAgICAnRGF0ZSBtdXN0IG5vdCBiZSBpbiB0aGUgZnV0dXJlJ1xuXHR9O1xuXG5cdGNsYXNzIEtyRG9iRW50cnkge1xuXHRcdGNvbnN0cnVjdG9yKCRlbGVtZW50LCBvcHRpb25zKSB7XG5cdFx0XHR0b2RheSA9IEtyRG9iRW50cnkuZ2V0WW1kKG5ldyBEYXRlKCkpO1xuXG5cdFx0XHR0aGlzLmlucHV0X2RheSA9IDA7XG5cdFx0XHR0aGlzLmlucHV0X21vbnRoID0gMDtcblx0XHRcdHRoaXMuaW5wdXRfeWVhciA9IDA7XG5cdFx0XHR0aGlzLiRlbGVtZW50ID0gJGVsZW1lbnQ7XG5cdFx0XHRpZiAob3B0aW9ucykge1xuXHRcdFx0XHQkLmV4dGVuZChzZXR0aW5ncywgb3B0aW9ucyk7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuaW5pdCgpO1xuXHRcdH1cblxuXHRcdHN0YXRpYyBnZXRZbWQoZGF0ZSkge1xuXHRcdFx0Y29uc3QgbSA9IGRhdGUuZ2V0TW9udGgoKSArIDE7XG5cdFx0XHRjb25zdCBkID0gZGF0ZS5nZXREYXkoKTtcblxuXHRcdFx0cmV0dXJuIChkYXRlLmdldEZ1bGxZZWFyKCkgKyAnLScgKyAobSA8IDEwID8gJzAnIDogJycpICsgbSArICctJyArIChkIDwgMTAgPyAnMCcgOiAnJykgKyBkKTtcblx0XHR9XG5cblx0XHRzdGF0aWMgZ2V0WW1kT2JqZWN0KGRhdGUpIHtcblx0XHRcdHJldHVybiAoZGF0ZS55ZWFyICsgJy0nICsgZGF0ZS5tb250aCArICctJyArIGRhdGUuZGF5KTtcblx0XHR9XG5cblx0XHRhZGRFbnRyeUZpZWxkcygpIHtcblx0XHRcdGxldCBkb2JmaWVsZCA9IHRoaXM7XG5cdFx0XHRkb2JmaWVsZC5maWVsZHMgPSBbXTtcblx0XHRcdCQuZWFjaChzZXR0aW5ncy5maWVsZF9vcmRlci5zcGxpdCgnJyksIGZ1bmN0aW9uIChpLCBmaWVsZCkge1xuXHRcdFx0XHRzd2l0Y2ggKGZpZWxkKSB7XG5cdFx0XHRcdFx0Y2FzZSAnRCc6XG5cdFx0XHRcdFx0XHRkb2JmaWVsZC5idWlsZEZpZWxkKCdkYXknLCBpKTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgJ00nOlxuXHRcdFx0XHRcdFx0ZG9iZmllbGQuYnVpbGRGaWVsZCgnbW9udGgnLCBpKTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgJ1knOlxuXHRcdFx0XHRcdFx0ZG9iZmllbGQuYnVpbGRGaWVsZCgneWVhcicsIGkpO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0ZGVmYXVsdCA6XG5cdFx0XHRcdFx0XHR0aHJvdyBcIlVuZXhwZWN0ZWQgZmllbGQgb3JkZXIgJ1wiICsgZmllbGQgKyBcIicgZXhwZWN0ZWQgRCwgTSBvciBZXCI7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGFmdGVyUGFzdGUodGFyZ2V0KSB7XG5cdFx0XHRpZiAodGhpcy5wYXJzZURhdGUoJCh0YXJnZXQpLnZhbCgpKSkge1xuXHRcdFx0XHR0aGlzLnNldERhdGUoJCh0YXJnZXQpLnZhbCgpKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRidWlsZEZpZWxkKG5hbWUsIGluZGV4KSB7XG5cdFx0XHRsZXQga3Jkb2JlbnRyeSA9IHRoaXM7XG5cdFx0XHRsZXQgaW5wdXQgPSBuZXcgS3JEb2JJbnB1dCh7XG5cdFx0XHRcdG5hbWU6ICAgICAgIG5hbWUsXG5cdFx0XHRcdGtyZG9iZW50cnk6IGtyZG9iZW50cnksXG5cdFx0XHRcdGluZGV4OiAgICAgIGluZGV4LFxuXHRcdFx0XHRoaW50X3RleHQ6ICBzZXR0aW5ncy5zaG93X2hpbnRzID8gc2V0dGluZ3NbJ2ZpZWxkX2hpbnRfdGV4dF8nICsgbmFtZV0gOiBudWxsLFxuXHRcdFx0fSk7XG5cblx0XHRcdHRoaXMuaW5uZXIuYXBwZW5kKGlucHV0LiRpbnB1dCk7XG5cdFx0XHR0aGlzWydpbnB1dF8nICsgbmFtZV0gPSBpbnB1dDtcblxuXHRcdFx0aWYgKGluZGV4IDwgMikge1xuXHRcdFx0XHR0aGlzLmlubmVyLmFwcGVuZCgkKCc8c3BhbiBjbGFzcz1cInNlcGFyYXRvclwiIC8+JykudGV4dChzZXR0aW5ncy5zZXBhcmF0b3IpKTtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5maWVsZHNbaW5kZXhdID0gaW5wdXQ7XG5cdFx0XHR0aGlzW25hbWVdID0gaW5wdXQ7XG5cdFx0fVxuXG5cdFx0YnVpbGRVaSgpIHtcblx0XHRcdGxldCBkb2JmaWVsZCA9IHRoaXM7XG5cdFx0XHR0aGlzLndyYXBwZXIgPSAkKHRoaXMuJGVsZW1lbnQud3JhcCgnPHNwYW4gY2xhc3M9XCJqcS1kdGVcIiAvPicpLnBhcmVudCgpWzBdKTtcblx0XHRcdHRoaXMuaW5uZXIgPSAkKCc8c3BhbiBjbGFzcz1cImpxLWR0ZS1pbm5lclwiIC8+Jyk7XG5cdFx0XHR0aGlzLmFkZEVudHJ5RmllbGRzKCk7XG5cdFx0XHR0aGlzLmVycm9yYm94ID0gJCgnPHNwYW4gY2xhc3M9XCJqcS1kdGUtZXJyb3Jib3hcIiAvPicpLmhpZGUoKTtcblx0XHRcdHRoaXMuaW5uZXIub24oJ3Bhc3RlJywgJ2lucHV0JywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0bGV0IGlucHV0ID0gdGhpcztcblx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0ZG9iZmllbGQuYWZ0ZXJQYXN0ZShpbnB1dCwgZSk7XG5cdFx0XHRcdH0sIDIpO1xuXHRcdFx0fSk7XG5cdFx0XHR0aGlzLndyYXBwZXIuYXBwZW5kKHRoaXMuaW5uZXIsIHRoaXMuZXJyb3Jib3gpO1xuXHRcdFx0dGhpcy5zZXRGaWVsZFdpZHRocygpO1xuXHRcdFx0dGhpcy4kZWxlbWVudC5oaWRlKCk7XG5cdFx0fVxuXG5cdFx0Y2hlY2tEb2N1bWVudChkb2IsIGNoaWxkZG9iLCBjbGFzc25hbWUpIHtcblx0XHRcdGxldCBlbGVtZW50cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoY2xhc3NuYW1lKTtcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0aWYgKG5ldyBEYXRlKGRvYikgPiBuZXcgRGF0ZShjaGlsZGRvYikpIHtcblx0XHRcdFx0XHRlbGVtZW50c1tpXS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGVsZW1lbnRzW2ldLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Y2xlYXIoKSB7XG5cdFx0XHR0aGlzLmNsZWFyRXJyb3IoJycpO1xuXHRcdFx0dGhpcy5zZXREYXRlKCcnKTtcblx0XHR9XG5cblx0XHRjbGVhckVycm9yKCkge1xuXHRcdFx0ZGVsZXRlIHRoaXMuZXJyb3JfdGV4dDtcblx0XHRcdHRoaXMuc2hvd0Vycm9yKCk7XG5cdFx0fVxuXG5cdFx0ZGVzdHJveSgpIHtcblx0XHRcdHRoaXMuJGVsZW1lbnQuc2hvdygpO1xuXHRcdFx0dGhpcy4kZWxlbWVudC5jc3MoJ2Rpc3BsYXknLCAnJyk7XG5cdFx0XHR0aGlzLndyYXBwZXIuZmluZCgnc3BhbicpLnJlbW92ZSgpO1xuXHRcdFx0dGhpcy4kZWxlbWVudC51bndyYXAoKTtcblx0XHRcdHRoaXMuJGVsZW1lbnQucmVtb3ZlRGF0YSgnZGF0ZXRleHRlbnRyeScpO1xuXHRcdFx0ZGVsZXRlIHRoaXMuaW5uZXI7XG5cdFx0XHRkZWxldGUgdGhpcy53cmFwcGVyO1xuXHRcdFx0ZGVsZXRlIHRoaXMuJGVsZW1lbnQ7XG5cdFx0fVxuXG5cdFx0Zm9jdXMoKSB7XG5cdFx0XHR0aGlzLmZpZWxkc1swXS5zZXRGb2N1cyh0cnVlKTtcblx0XHR9XG5cblx0XHRmb2N1c0ZpZWxkQmVmb3JlKGlucHV0KSB7XG5cdFx0XHRjb25zdCBpbmRleCA9IGlucHV0LmluZGV4O1xuXHRcdFx0aWYgKGluZGV4IDwgMSkge1xuXHRcdFx0XHRyZXR1cm5cblx0XHRcdH1cblx0XHRcdHRoaXMuZmllbGRzW2luZGV4XS55aWVsZEZvY3VzKCk7XG5cdFx0XHR0aGlzLmZpZWxkc1tpbmRleCAtIDFdLnNldEZvY3VzKHRydWUpO1xuXHRcdFx0Ly8gbGV0IG5leHQgPSB0aGlzLmZpZWxkc1tpbmRleCAtIDFdO1xuXHRcdFx0Ly8gbGV0IHZhbCA9IG5leHQuZ2V0KCk7XG5cdFx0XHQvLyBuZXh0LnNldEZvY3VzKGZhbHNlKTtcblx0XHR9XG5cblx0XHRmb2N1c0ZpZWxkQWZ0ZXIoaW5wdXQpIHtcblx0XHRcdGNvbnN0IGluZGV4ID0gaW5wdXQuaW5kZXg7XG5cdFx0XHRpZiAoaW5kZXggPiAxKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdHRoaXMuZmllbGRzW2luZGV4XS55aWVsZEZvY3VzKCk7XG5cdFx0XHR0aGlzLmZpZWxkc1tpbmRleCArIDFdLnNldEZvY3VzKHRydWUpO1xuXHRcdH1cblxuXHRcdGZvY3VzSW4oKSB7XG5cdFx0XHR0aGlzLndyYXBwZXIuYWRkQ2xhc3MoJ2ZvY3VzJyk7XG5cdFx0fVxuXG5cdFx0Zm9jdXNPdXQoKSB7XG5cdFx0XHRpZiAoc2V0dGluZ3Mub25fYmx1cikge1xuXHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRzZWxmLndpZGdldEZvY3VzTG9zdCgpO1xuXHRcdFx0XHR9LCAyKTtcblx0XHRcdH1cblx0XHRcdHRoaXMud3JhcHBlci5yZW1vdmVDbGFzcygnZm9jdXMnKTtcblx0XHR9XG5cblx0XHRnZXREYXRlKCkge1xuXHRcdFx0cmV0dXJuICh0aGlzLmRheV92YWx1ZSAmJiB0aGlzLm1vbnRoX3ZhbHVlICYmIHRoaXMueWVhcl92YWx1ZSlcblx0XHRcdCAgICAgICA/IHtkYXk6IHRoaXMuZGF5X3ZhbHVlLCBtb250aDogdGhpcy5tb250aF92YWx1ZSwgeWVhcjogdGhpcy55ZWFyX3ZhbHVlfVxuXHRcdFx0ICAgICAgIDogbnVsbDtcblx0XHR9XG5cblx0XHRpbml0KCkge1xuXHRcdFx0aWYgKCFzZXR0aW5ncy5taW5feWVhcilcblx0XHRcdFx0c2V0dGluZ3MubWluX3llYXIgPSAnMTkxMCc7XG5cblx0XHRcdHRoaXMuYnVpbGRVaSgpO1xuXHRcdFx0dGhpcy5zZXREYXRlKHRoaXMuJGVsZW1lbnQuYXR0cigndmFsdWUnKSk7XG5cdFx0XHR0aGlzLnByb3h5TGFiZWxDbGlja3MoKTtcblx0XHR9XG5cblx0XHRwYXJzZURhdGUodGV4dCkge1xuXHRcdFx0cmV0dXJuIHRoaXMucGFyc2VJc29EYXRlKHRleHQpO1xuXHRcdH1cblxuXHRcdHBhcnNlSXNvRGF0ZSh0ZXh0KSB7XG5cdFx0XHRyZXR1cm4gdGV4dCAmJiB0ZXh0Lm1hdGNoKC9eKFxcZFxcZFxcZFxcZCktKFxcZFxcZCktKFxcZFxcZCkvKSA/IHtcblx0XHRcdFx0ZGF5OiAgIFJlZ0V4cC4kMyxcblx0XHRcdFx0bW9udGg6IFJlZ0V4cC4kMixcblx0XHRcdFx0eWVhcjogIFJlZ0V4cC4kMVxuXHRcdFx0fSA6IG51bGw7XG5cdFx0fVxuXG5cdFx0cHJveHlMYWJlbENsaWNrcygpIHtcblx0XHRcdGxldCBkb2JmaWVsZCA9IHRoaXM7XG5cdFx0XHRsZXQgaWQgPSB0aGlzLiRlbGVtZW50LmF0dHIoJ2lkJyk7XG5cdFx0XHRpZiAoIWlkKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdCQoJ2xhYmVsW2Zvcj0nICsgaWQgKyAnXScpLmNsaWNrKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0ZG9iZmllbGQuZm9jdXMoKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdHNldERhdGUobmV3X2RhdGUpIHtcblx0XHRcdGxldCBkb2JmaWVsZCA9IHRoaXM7XG5cdFx0XHRuZXdfZGF0ZSA9IHRoaXMucGFyc2VEYXRlKG5ld19kYXRlKTtcblx0XHRcdGRlbGV0ZSB0aGlzLmRheV92YWx1ZTtcblx0XHRcdGRlbGV0ZSB0aGlzLm1vbnRoX3ZhbHVlO1xuXHRcdFx0ZGVsZXRlIHRoaXMueWVhcl92YWx1ZTtcblx0XHRcdHRoaXMuaW5wdXRfZGF5LnNldChuZXdfZGF0ZSA/IG5ld19kYXRlLmRheSA6ICcnKTtcblx0XHRcdHRoaXMuaW5wdXRfbW9udGguc2V0KG5ld19kYXRlID8gbmV3X2RhdGUubW9udGggOiAnJyk7XG5cdFx0XHR0aGlzLmlucHV0X3llYXIuc2V0KG5ld19kYXRlID8gbmV3X2RhdGUueWVhciA6ICcnKTtcblx0XHRcdHRoaXMuY2xlYXJFcnJvcigpO1xuXHRcdFx0dGhpcy4kZWxlbWVudC52YWwobmV3X2RhdGUpO1xuXHRcdFx0aWYgKG5ld19kYXRlKSB7XG5cdFx0XHRcdCQuZWFjaCh0aGlzLmZpZWxkcywgZnVuY3Rpb24gKGksIGlucHV0KSB7XG5cdFx0XHRcdFx0ZG9iZmllbGQudmFsaWRhdGUoaW5wdXQpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRzZXRFcnJvcihlcnJvcl90ZXh0KSB7XG5cdFx0XHR0aGlzLmVycm9yX3RleHQgPSBlcnJvcl90ZXh0O1xuXHRcdFx0dGhpcy5zaG93RXJyb3IoKTtcblx0XHR9XG5cblx0XHRzZXRGaWVsZFdpZHRocygpIHtcblx0XHRcdGxldCBhdmFpbGFibGUgPSB0aGlzLiRlbGVtZW50LndpZHRoKCkgLSAyO1xuXHRcdFx0bGV0IHRvdGFsID0gc2V0dGluZ3MuZmllbGRfd2lkdGhfeWVhciArIHNldHRpbmdzLmZpZWxkX3dpZHRoX3NlcCArIHNldHRpbmdzLmZpZWxkX3dpZHRoX21vbnRoICtcblx0XHRcdFx0c2V0dGluZ3MuZmllbGRfd2lkdGhfc2VwICsgc2V0dGluZ3MuZmllbGRfd2lkdGhfZGF5O1xuXHRcdFx0dGhpcy5pbnB1dF9kYXkuc2V0V2lkdGgoTWF0aC5mbG9vcihzZXR0aW5ncy5maWVsZF93aWR0aF9kYXkgKiBhdmFpbGFibGUgLyB0b3RhbCkpO1xuXHRcdFx0dGhpcy5pbnB1dF9tb250aC5zZXRXaWR0aChNYXRoLmZsb29yKHNldHRpbmdzLmZpZWxkX3dpZHRoX21vbnRoICogYXZhaWxhYmxlIC8gdG90YWwpKTtcblx0XHRcdHRoaXMuaW5wdXRfeWVhci5zZXRXaWR0aChNYXRoLmZsb29yKHNldHRpbmdzLmZpZWxkX3dpZHRoX3llYXIgKiBhdmFpbGFibGUgLyB0b3RhbCkpO1xuXHRcdH1cblxuXHRcdHNldFJlYWRvbmx5KG1vZGUpIHtcblx0XHRcdGlmIChtb2RlID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0bW9kZSA9IHRydWU7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLmlucHV0X2RheS5zZXRSZWFkb25seShtb2RlKTtcblx0XHRcdHRoaXMuaW5wdXRfbW9udGguc2V0UmVhZG9ubHkobW9kZSk7XG5cdFx0XHR0aGlzLmlucHV0X3llYXIuc2V0UmVhZG9ubHkobW9kZSk7XG5cdFx0XHRpZiAobW9kZSkge1xuXHRcdFx0XHR0aGlzLndyYXBwZXIuYWRkQ2xhc3MoJ3JlYWRvbmx5Jyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLndyYXBwZXIucmVtb3ZlQ2xhc3MoJ3JlYWRvbmx5Jyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0c2hvd0Vycm9yKCkge1xuXHRcdFx0bGV0IGVycm9yX3RleHQgPSB0aGlzLndpZGdldEVycm9yVGV4dCgpO1xuXHRcdFx0aWYgKHRoaXMub25fZXJyb3IpIHtcblx0XHRcdFx0dGhpcy5vbl9lcnJvcihlcnJvcl90ZXh0KTtcblx0XHRcdH1cblx0XHRcdGlmICghc2V0dGluZ3Muc2hvd19lcnJvcnMpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGVycm9yX3RleHQgPT09ICcnKSB7XG5cdFx0XHRcdHRoaXMuZXJyb3Jib3guaGlkZSgpO1xuXHRcdFx0XHR0aGlzLmVycm9yYm94LnRleHQoJycpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bGV0IHhfb2Zmc2V0ID0gKHRoaXMuaW5uZXIub3V0ZXJXaWR0aCgpICsgc2V0dGluZ3MuZXJyb3Jib3hfeCkgKyAncHgnO1xuXHRcdFx0XHRsZXQgeV9vZmZzZXQgPSBzZXR0aW5ncy5lcnJvcmJveF95ICsgJ3B4Jztcblx0XHRcdFx0dGhpcy5lcnJvcmJveC5jc3Moe2Rpc3BsYXk6ICdibG9jaycsIHBvc2l0aW9uOiAnYWJzb2x1dGUnLCB0b3A6IHlfb2Zmc2V0LCBsZWZ0OiB4X29mZnNldH0pO1xuXHRcdFx0XHR0aGlzLmVycm9yYm94LnRleHQoZXJyb3JfdGV4dCk7XG5cdFx0XHRcdHRoaXMuZXJyb3Jib3guc2hvdygpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHZhbGlkYXRlKGN1cnJlbnRfaW5wdXQpIHtcblx0XHRcdHRoaXMuJGVsZW1lbnQudmFsKCcnKTtcblx0XHRcdGlmIChjdXJyZW50X2lucHV0KSB7XG5cdFx0XHRcdGNvbnN0IHR5cGUgPSBjdXJyZW50X2lucHV0Lm5hbWU7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0aWYgKHR5cGUgPT09ICdkYXknKSB7XG5cdFx0XHRcdFx0XHR0aGlzLnZhbGlkYXRlRGF5KCk7XG5cdFx0XHRcdFx0fSBlbHNlIGlmICh0eXBlID09PSAnbW9udGgnKSB7XG5cdFx0XHRcdFx0XHR0aGlzLnZhbGlkYXRlTW9udGgoKTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHR5cGUgPT09ICd5ZWFyJykge1xuXHRcdFx0XHRcdFx0dGhpcy52YWxpZGF0ZVllYXIoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Y3VycmVudF9pbnB1dC5jbGVhckVycm9yKCk7XG5cdFx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0XHRjdXJyZW50X2lucHV0LnNldEVycm9yKGUpO1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKHRoaXMuZGF5X3ZhbHVlICYmIHRoaXMubW9udGhfdmFsdWUpIHtcblx0XHRcdFx0dGhpcy5jbGVhckVycm9yKCk7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0dGhpcy52YWxpZGF0ZURheXNJbk1vbnRoKCk7XG5cdFx0XHRcdFx0aWYgKHRoaXMueWVhcl92YWx1ZSAmJiB0aGlzLnllYXJfdmFsdWUubGVuZ3RoID09PSA0KSB7XG5cdFx0XHRcdFx0XHR0aGlzLnZhbGlkYXRlQ29tcGxldGVEYXRlKCk7XG5cdFx0XHRcdFx0XHRsZXQgZGF0ZV9zdHIgPSBLckRvYkVudHJ5LmdldFltZE9iamVjdCh0aGlzLmdldERhdGUoKSk7XG5cdFx0XHRcdFx0XHR0aGlzLiRlbGVtZW50LnZhbChkYXRlX3N0cik7XG5cdFx0XHRcdFx0XHRpZiAodGhpcy4kZWxlbWVudC5kYXRhKCdjaGlsZGRvYicpKSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMuY2hlY2tEb2N1bWVudChkYXRlX3N0ciwgdGhpcy4kZWxlbWVudC5kYXRhKCdjaGlsZGRvYicpLCB0aGlzLiRlbGVtZW50LmF0dHIoJ2lkJykpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRcdHRoaXMuc2V0RXJyb3IoZSk7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLmNsZWFyRXJyb3IoKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0dmFsaWRhdGVDb21wbGV0ZURhdGUoKSB7XG5cdFx0XHRjb25zdCBkYXRlX29iaiA9IHRoaXMuZ2V0RGF0ZSgpO1xuXHRcdFx0Y29uc3QgZGF0ZV9pc28gPSBLckRvYkVudHJ5LmdldFltZE9iamVjdChkYXRlX29iaik7XG5cdFx0XHRzZXR0aW5ncy5taW5tYXggPSB0aGlzLiRlbGVtZW50LmRhdGEoJ3ZhbGlkYXRpb24nKTtcblxuXHRcdFx0aWYgKHNldHRpbmdzLm1pbm1heCA9PT0gJ21heCcpIHtcblx0XHRcdFx0aWYgKGRhdGVfaXNvID4gdG9kYXkpIHtcblx0XHRcdFx0XHR0aHJvdyhzZXR0aW5ncy5FX01BWF9EQVRFKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKHNldHRpbmdzLm1pbm1heCA9PT0gJ21pbicpIHtcblx0XHRcdFx0aWYgKGRhdGVfaXNvIDwgdG9kYXkpIHtcblx0XHRcdFx0XHR0aHJvdyhzZXR0aW5ncy5FX01JTl9EQVRFKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBsZXQgbWF4X2RhdGUgPSBzZXR0aW5ncy5tYXhfZGF0ZTtcblx0XHRcdC8vIGlmICh0eXBlb2YgbWF4X2RhdGUgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdC8vIFx0bWF4X2RhdGUgPSBtYXhfZGF0ZS5jYWxsKHRoaXMpO1xuXHRcdFx0Ly8gfVxuXHRcdFx0Ly8gaWYgKHR5cGVvZiBtYXhfZGF0ZSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdC8vIFx0bWF4X2RhdGUgPSB0aGlzLnBhcnNlRGF0ZShtYXhfZGF0ZSk7XG5cdFx0XHQvLyB9XG5cdFx0XHQvLyBpZiAobWF4X2RhdGUpIHtcblx0XHRcdC8vIFx0aWYgKGRhdGVfaXNvID4gc2V0dGluZ3MubWF4X2RhdGUpIHtcblx0XHRcdC8vIFx0XHR0aHJvdyhzZXR0aW5ncy5FX01BWF9EQVRFKTtcblx0XHRcdC8vIFx0fVxuXHRcdFx0Ly8gfVxuXG5cdFx0XHRpZiAodGhpcy5jdXN0b21fdmFsaWRhdGlvbikge1xuXHRcdFx0XHRkYXRlX29iai5kYXRlID0gbmV3IERhdGUoXG5cdFx0XHRcdFx0cGFyc2VJbnQoZGF0ZV9vYmoueWVhciwgMTApLFxuXHRcdFx0XHRcdHBhcnNlSW50KGRhdGVfb2JqLm1vbnRoLCAxMCkgLSAxLFxuXHRcdFx0XHRcdHBhcnNlSW50KGRhdGVfb2JqLmRheSwgMTApXG5cdFx0XHRcdCk7XG5cdFx0XHRcdHRoaXMuY3VzdG9tX3ZhbGlkYXRpb24oZGF0ZV9vYmopO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHZhbGlkYXRlRGF5KCkge1xuXHRcdFx0bGV0IG9wdCA9IHNldHRpbmdzO1xuXHRcdFx0bGV0IGlucHV0ID0gdGhpcy5pbnB1dF9kYXk7XG5cdFx0XHR0aGlzLmRheV92YWx1ZSA9IHVuZGVmaW5lZDtcblx0XHRcdGxldCB0ZXh0ID0gaW5wdXQuZ2V0KCk7XG5cdFx0XHRpZiAodGV4dCA9PT0gJycgfHwgKHRleHQgPT09ICcwJyAmJiBpbnB1dC5oYXNfZm9jdXMpKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdGlmICh0ZXh0Lm1hdGNoKC9cXEQvKSkge1xuXHRcdFx0XHR0aHJvdyhvcHQuRV9EQVlfTkFOKTtcblx0XHRcdH1cblx0XHRcdGxldCBudW0gPSBwYXJzZUludCh0ZXh0LCAxMCk7XG5cdFx0XHRpZiAobnVtIDwgMSkge1xuXHRcdFx0XHR0aHJvdyhvcHQuRV9EQVlfVE9PX1NNQUxMKTtcblx0XHRcdH1cblx0XHRcdGlmIChudW0gPiAzMSkge1xuXHRcdFx0XHR0aHJvdyhvcHQuRV9EQVlfVE9PX0JJRyk7XG5cdFx0XHR9XG5cdFx0XHR0ZXh0ID0gbnVtIDwgMTAgPyAnMCcgKyBudW0gOiAnJyArIG51bTtcblx0XHRcdGlmICghaW5wdXQuaGFzX2ZvY3VzKSB7XG5cdFx0XHRcdGlucHV0LnNldCh0ZXh0KTtcblx0XHRcdH1cblx0XHRcdHRoaXMuZGF5X3ZhbHVlID0gdGV4dDtcblx0XHR9XG5cblx0XHR2YWxpZGF0ZURheXNJbk1vbnRoKCkge1xuXHRcdFx0Y29uc3QgZGF5ID0gcGFyc2VJbnQodGhpcy5kYXlfdmFsdWUsIDEwKTtcblx0XHRcdGNvbnN0IG1vbnRoID0gcGFyc2VJbnQodGhpcy5tb250aF92YWx1ZSwgMTApO1xuXHRcdFx0Y29uc3QgeWVhciA9IHBhcnNlSW50KHRoaXMueWVhcl92YWx1ZSwgMTApO1xuXHRcdFx0aWYgKGRheSA8IDEgfHwgbW9udGggPCAxKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdGxldCBtYXggPSBzZXR0aW5ncy5kYXlzX2luX21vbnRoW21vbnRoIC0gMV07XG5cdFx0XHRsZXQgbXNnID0gc2V0dGluZ3MuRV9CQURfREFZX0ZPUl9NT05USDtcblx0XHRcdGlmIChtb250aCA9PT0gMiAmJiAoJycgKyB5ZWFyKS5sZW5ndGggPT09IDQpIHtcblx0XHRcdFx0bWF4ID0geWVhciAlIDQgPyAyOCA6IHllYXIgJSAxMDAgPyAyOSA6IHllYXIgJSA0MDAgPyAyOCA6IDI5O1xuXHRcdFx0XHRtc2cgPSBtc2cucmVwbGFjZSgvJXkvLCB5ZWFyLnRvU3RyaW5nKCkpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bXNnID0gbXNnLnJlcGxhY2UoLyAqJXkvLCAnJyk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoZGF5ID4gbWF4KSB7XG5cdFx0XHRcdHRocm93KG1zZy5yZXBsYWNlKC8lZC8sIG1heC50b1N0cmluZygpKS5yZXBsYWNlKC8lbS8sIHNldHRpbmdzLm1vbnRoX25hbWVbbW9udGggLSAxXSkpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHZhbGlkYXRlTW9udGgoKSB7XG5cdFx0XHRsZXQgaW5wdXQgPSB0aGlzLmlucHV0X21vbnRoO1xuXHRcdFx0dGhpcy5tb250aF92YWx1ZSA9IHVuZGVmaW5lZDtcblx0XHRcdGxldCB0ZXh0ID0gaW5wdXQuZ2V0KCk7XG5cdFx0XHRpZiAodGV4dCA9PT0gJycgfHwgKHRleHQgPT09ICcwJyAmJiBpbnB1dC5oYXNfZm9jdXMpKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdGlmICh0ZXh0Lm1hdGNoKC9cXEQvKSkge1xuXHRcdFx0XHR0aHJvdyhzZXR0aW5ncy5FX01PTlRIX05BTik7XG5cdFx0XHR9XG5cdFx0XHRsZXQgbnVtID0gcGFyc2VJbnQodGV4dCwgMTApO1xuXHRcdFx0aWYgKG51bSA8IDEpIHtcblx0XHRcdFx0dGhyb3coc2V0dGluZ3MuRV9NT05USF9UT09fU01BTEwpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKG51bSA+IDEyKSB7XG5cdFx0XHRcdHRocm93KHNldHRpbmdzLkVfTU9OVEhfVE9PX0JJRyk7XG5cdFx0XHR9XG5cdFx0XHR0ZXh0ID0gbnVtIDwgMTAgPyAnMCcgKyBudW0gOiAnJyArIG51bTtcblx0XHRcdGlmICghaW5wdXQuaGFzX2ZvY3VzKSB7XG5cdFx0XHRcdGlucHV0LnNldCh0ZXh0KTtcblx0XHRcdH1cblx0XHRcdHRoaXMubW9udGhfdmFsdWUgPSB0ZXh0O1xuXHRcdH1cblxuXHRcdHZhbGlkYXRlWWVhcigpIHtcblx0XHRcdGNvbnN0IGlucHV0ID0gdGhpcy5pbnB1dF95ZWFyO1xuXHRcdFx0dGhpcy55ZWFyX3ZhbHVlID0gdW5kZWZpbmVkO1xuXHRcdFx0bGV0IHRleHQgPSBpbnB1dC5nZXQoKTtcblx0XHRcdGlmICh0ZXh0ID09PSAnJyB8fCAodGV4dCA9PT0gJzAnICYmIGlucHV0Lmhhc19mb2N1cykpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHRleHQubWF0Y2goL1xcRC8pKSB7XG5cdFx0XHRcdHRocm93KHNldHRpbmdzLkVfWUVBUl9OQU4pO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGlucHV0Lmhhc19mb2N1cykge1xuXHRcdFx0XHRpZiAodGV4dC5sZW5ndGggPiA0KSB7XG5cdFx0XHRcdFx0dGhyb3coc2V0dGluZ3MuRV9ZRUFSX0xFTkdUSCk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmICh0ZXh0Lmxlbmd0aCAhPT0gNCkge1xuXHRcdFx0XHRcdHRocm93KHNldHRpbmdzLkVfWUVBUl9MRU5HVEgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAodGV4dC5sZW5ndGggPT09IDQpIHtcblx0XHRcdFx0Y29uc3QgbnVtID0gcGFyc2VJbnQodGV4dCwgMTApO1xuXHRcdFx0XHRpZiAoc2V0dGluZ3MubWluX3llYXIgJiYgbnVtIDwgc2V0dGluZ3MubWluX3llYXIpIHtcblx0XHRcdFx0XHR0aHJvdyhzZXR0aW5ncy5FX1lFQVJfVE9PX1NNQUxMLnJlcGxhY2UoLyV5Lywgc2V0dGluZ3MubWluX3llYXIpKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0dGhpcy55ZWFyX3ZhbHVlID0gdGV4dDtcblx0XHR9XG5cblx0XHR3aWRnZXRFcnJvclRleHQoKSB7XG5cdFx0XHRsZXQgZXJyb3JfdGV4dCA9ICcnO1xuXHRcdFx0JC5lYWNoKHRoaXMuZmllbGRzLCBmdW5jdGlvbiAoaSwgaW5wdXQpIHtcblx0XHRcdFx0aWYgKGlucHV0LmVycm9yX3RleHQpIHtcblx0XHRcdFx0XHRpZiAoaW5wdXQuaGFzX2ZvY3VzIHx8IGVycm9yX3RleHQgPT09ICcnKSB7XG5cdFx0XHRcdFx0XHRlcnJvcl90ZXh0ID0gaW5wdXQuZXJyb3JfdGV4dFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRpZiAoZXJyb3JfdGV4dCA9PT0gJycgJiYgdGhpcy5lcnJvcl90ZXh0KSB7XG5cdFx0XHRcdGVycm9yX3RleHQgPSB0aGlzLmVycm9yX3RleHQ7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZXJyb3JfdGV4dDtcblx0XHR9XG5cblx0XHR3aWRnZXRGb2N1c0xvc3QoKSB7XG5cdFx0XHRpZiAoc2V0dGluZ3Mub25fYmx1ciAmJiAhdGhpcy53cmFwcGVyLmlzKCcuZm9jdXMnKSkge1xuXHRcdFx0XHRzZXR0aW5ncy5vbkJsdXIoKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRjbGFzcyBLckRvYklucHV0IHtcblx0XHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG5cdFx0XHRjb25zdCBpbnB1dCA9IHRoaXM7XG5cdFx0XHR0aGlzLmRvYmZpZWxkID0gb3B0aW9ucy5rcmRvYmVudHJ5O1xuXHRcdFx0dGhpcy5uYW1lID0gb3B0aW9ucy5uYW1lO1xuXHRcdFx0dGhpcy5pbmRleCA9IG9wdGlvbnMuaW5kZXg7XG5cdFx0XHR0aGlzLmhpbnRfdGV4dCA9IG9wdGlvbnMuaGludF90ZXh0O1xuXHRcdFx0dGhpcy5oYXNfZm9jdXMgPSBmYWxzZTtcblx0XHRcdHRoaXMuZW1wdHkgPSB0cnVlO1xuXHRcdFx0dGhpcy4kaW5wdXQgPSAkKCc8aW5wdXQgdHlwZT1cInRleHRcIiB2YWx1ZT1cIlwiIC8+JykuYWRkQ2xhc3MoJ2pxLWR0ZS0nICsgdGhpcy5uYW1lKS5hdHRyKCdhcmlhLWxhYmVsJywgJycgKyBcIiAoXCIgKyB0aGlzLmhpbnRfdGV4dCArIFwiKVwiKS5mb2N1cygkLnByb3h5KGlucHV0LCAnZm9jdXMnKSkuYmx1cigkLnByb3h5KGlucHV0LCAnYmx1cicpKS5rZXlkb3duKGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdGlucHV0LmtleWRvd24oZSk7XG5cdFx0XHRcdH0sIDIpXG5cdFx0XHR9KS5rZXl1cChmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRpbnB1dC5rZXl1cChlKTtcblx0XHRcdFx0fSwgMilcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGJsdXIoKSB7XG5cdFx0XHR0aGlzLmhhc19mb2N1cyA9IGZhbHNlO1xuXHRcdFx0dGhpcy5kb2JmaWVsZC5mb2N1c091dCgpO1xuXHRcdFx0dGhpcy5zaG93X2hpbnQoKTtcblx0XHRcdHRoaXMuZG9iZmllbGQudmFsaWRhdGUodGhpcyk7XG5cdFx0fVxuXG5cdFx0Y2xlYXJFcnJvcigpIHtcblx0XHRcdGRlbGV0ZSB0aGlzLmVycm9yX3RleHQ7XG5cdFx0XHR0aGlzLiRpbnB1dC5yZW1vdmVDbGFzcygnZXJyb3InKTtcblx0XHR9XG5cblx0XHRmb2N1cygpIHtcblx0XHRcdHRoaXMua2V5X2lzX2Rvd24gPSBmYWxzZTtcblx0XHRcdGlmICh0aGlzLiRpbnB1dC5wcm9wKCdyZWFkb25seScpKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdHRoaXMuaGFzX2ZvY3VzID0gdHJ1ZTtcblx0XHRcdHRoaXMuZG9iZmllbGQuZm9jdXNJbigpO1xuXHRcdFx0aWYgKHRoaXMuJGlucHV0Lmhhc0NsYXNzKCdoaW50JykpIHtcblx0XHRcdFx0dGhpcy4kaW5wdXQudmFsKCcnKS5yZW1vdmVDbGFzcygnaGludCcpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5kb2JmaWVsZC5zaG93RXJyb3IoKTtcblx0XHR9XG5cblx0XHRnZXQoKSB7XG5cdFx0XHRsZXQgdmFsID0gdGhpcy4kaW5wdXQudmFsKCk7XG5cdFx0XHRyZXR1cm4gdmFsID09PSB0aGlzLmhpbnRfdGV4dCA/ICcnIDogdmFsO1xuXHRcdH1cblxuXHRcdGlzRGlnaXRLZXkoZSkge1xuXHRcdFx0bGV0IGtleWNvZGUgPSBlLndoaWNoO1xuXHRcdFx0cmV0dXJuIGtleWNvZGUgPj0gNDggJiYga2V5Y29kZSA8PSA1NyB8fCBrZXljb2RlID49IDk2ICYmIGtleWNvZGUgPD0gMTA1O1xuXHRcdH1cblxuXHRcdGtleWRvd24oKSB7XG5cdFx0XHQvLyBJZ25vcmUga2V5dXAgZXZlbnRzIHRoYXQgYXJyaXZlIGFmdGVyIGZvY3VzIG1vdmVkIHRvIG5leHQgZmllbGRcblx0XHRcdHRoaXMua2V5X2lzX2Rvd24gPSB0cnVlO1xuXHRcdH1cblxuXHRcdGtleXVwKGUpIHtcblx0XHRcdGlmICghdGhpcy5rZXlfaXNfZG93bikge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHQvLyBIYW5kbGUgQmFja3NwYWNlIC0gc2hpZnRpbmcgZm9jdXMgdG8gcHJldmlvdXMgZmllbGQgaWYgcmVxdWlyZWRcblx0XHRcdGxldCBrZXljb2RlID0gZS53aGljaDtcblx0XHRcdGlmIChrZXljb2RlID09PSBrZXkuQkFDS1NQQUNFICYmIHRoaXMuZW1wdHkpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuZG9iZmllbGQuZm9jdXNGaWVsZEJlZm9yZSh0aGlzKTtcblx0XHRcdH1cblx0XHRcdGxldCB0ZXh0ID0gdGhpcy5nZXQoKTtcblx0XHRcdHRoaXMuZW1wdHkgPSB0ZXh0ID09PSAnJztcblxuXHRcdFx0Ly8gVHJhcCBhbmQgZGlzY2FyZCBzZXBhcmF0b3IgY2hhcmFjdGVycyAtIGFkdmFuY2luZyBmb2N1cyBpZiByZXF1aXJlZFxuXHRcdFx0aWYgKHRleHQubWF0Y2goL1tcXC9cXFxcLiAtXS8pKSB7XG5cdFx0XHRcdHRleHQgPSB0ZXh0LnJlcGxhY2UoL1tcXC9cXFxcLiAtXS8sICcnKTtcblx0XHRcdFx0dGhpcy5zZXQodGV4dCk7XG5cdFx0XHRcdGlmICghdGhpcy5lbXB0eSAmJiB0aGlzLmluZGV4IDwgMikge1xuXHRcdFx0XHRcdHRoaXMuZG9iZmllbGQuZm9jdXNGaWVsZEFmdGVyKHRoaXMpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIEFkdmFuY2UgZm9jdXMgaWYgdGhpcyBmaWVsZCBpcyBib3RoIHZhbGlkIGFuZCBmdWxsXG5cdFx0XHRpZiAodGhpcy5kb2JmaWVsZC52YWxpZGF0ZSh0aGlzKSkge1xuXHRcdFx0XHRsZXQgd2FudCA9IHRoaXMubmFtZSA9PT0gJ3llYXInID8gNCA6IDI7XG5cdFx0XHRcdGlmICh0aGlzLmlzRGlnaXRLZXkoZSkgJiYgdGV4dC5sZW5ndGggPT09IHdhbnQpIHtcblx0XHRcdFx0XHR0aGlzLmRvYmZpZWxkLmZvY3VzRmllbGRBZnRlcih0aGlzKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGxlZnQoKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy4kaW5wdXQucG9zaXRpb24oKS5sZWZ0O1xuXHRcdH1cblxuXHRcdHNldChuZXdfdmFsdWUpIHtcblx0XHRcdHRoaXMuJGlucHV0LnZhbChuZXdfdmFsdWUpLnJlbW92ZUNsYXNzKCdoaW50Jyk7XG5cdFx0XHRpZiAoIXRoaXMuaGFzX2ZvY3VzKSB7XG5cdFx0XHRcdHRoaXMuc2hvd19oaW50KCk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLmVtcHR5ID0gbmV3X3ZhbHVlID09PSAnJztcblx0XHRcdHRoaXMuY2xlYXJFcnJvcigpO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fVxuXG5cdFx0c2V0RXJyb3IodGV4dCkge1xuXHRcdFx0dGhpcy5lcnJvcl90ZXh0ID0gdGV4dDtcblx0XHRcdHRoaXMuJGlucHV0LmFkZENsYXNzKCdlcnJvcicpO1xuXHRcdFx0dGhpcy5kb2JmaWVsZC5zaG93RXJyb3IoKTtcblx0XHR9XG5cblx0XHRzZXRGb2N1cyhzZWxlY3RfYWxsKSB7XG5cdFx0XHRsZXQgJGlucHV0ID0gdGhpcy4kaW5wdXQ7XG5cdFx0XHQkaW5wdXQuZm9jdXMoKTtcblx0XHRcdGlmIChzZWxlY3RfYWxsKSB7XG5cdFx0XHRcdCRpbnB1dC5zZWxlY3QoKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdCRpbnB1dC52YWwoJGlucHV0LnZhbCgpKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH1cblxuXHRcdHNldFdpZHRoKG5ld193aWR0aCkge1xuXHRcdFx0dGhpcy4kaW5wdXQud2lkdGgobmV3X3dpZHRoKTtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH1cblxuXHRcdHNob3dfaGludCgpIHtcblx0XHRcdGlmICh0aGlzLmdldCgpID09PSAnJyAmJiB0eXBlb2YgKHRoaXMuaGludF90ZXh0KSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdFx0dGhpcy4kaW5wdXQudmFsKHRoaXMuaGludF90ZXh0KS5hZGRDbGFzcygnaGludCcpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fVxuXG5cdFx0eWllbGRGb2N1cygpIHtcblx0XHRcdHRoaXMuJGlucHV0LmJsdXIoKTtcblx0XHR9XG5cdH1cblxuXHQkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG5cdFx0JCgnLmRvYmlzc3VlJykuZWFjaChmdW5jdGlvbiAoKSB7XG5cdFx0XHRteUtyRG9iRW50cnkgPSBuZXcgS3JEb2JFbnRyeSgkKHRoaXMpLCB7fSk7XG5cdFx0fSk7XG5cdH0pO1xufShqUXVlcnkpKTsiLCIvLyBub2luc3BlY3Rpb24gRHVwbGljYXRlZENvZGVcblxuLyoqXG4gKiBAcGFja2FnZSAgICBLbm93IFJlc2VydmF0aW9uc1xuICogQHN1YnBhY2thZ2UgQWRtaW4gSlNcbiAqIEBjb3B5cmlnaHQgIDIwMjAgSGlnaGxhbmQgVmlzaW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogQGxpY2Vuc2UgICAgU2VlIHRoZSBmaWxlIFwiTElDRU5TRS50eHRcIiBmb3IgdGhlIGZ1bGwgbGljZW5zZSBnb3Zlcm5pbmcgdGhpcyBjb2RlLlxuICogQGF1dGhvciAgICAgSGF6ZWwgV2lsc29uIDxoYXplbEBoaWdobGFuZHZpc2lvbi5jb20+XG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoJCkge1xuXHQkKGZ1bmN0aW9uICgpIHtcblx0XHRpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hvd3RvYXJyaXZlJykpIHtcblx0XHRcdGNvbnN0IGhvd3RvYXJyaXZlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hvd3RvYXJyaXZlJyk7XG5cdFx0XHRsZXQgYXJyaXZhbG1lYW5zID0gaG93dG9hcnJpdmUuZ2V0QXR0cmlidXRlKCdkYXRhLW1lYW5zJyk7XG5cdFx0XHRpZiAoIWFycml2YWxtZWFucykge1xuXHRcdFx0XHRhcnJpdmFsbWVhbnMgPSAnYWlyJztcblx0XHRcdH1cblx0XHRcdGRpc3BsYXlBcnJpdmFsKGFycml2YWxtZWFucyk7XG5cdFx0fVxuXG5cdFx0JCgnYm9keScpLm9uKCdjbGljaycsICcuYW1pdGVtJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGRpc3BsYXlBcnJpdmFsKCQodGhpcykuYXR0cignaWQnKSk7XG5cdFx0fSk7XG5cdH0pO1xuXG5cdGZ1bmN0aW9uIGRpc3BsYXlBcnJpdmFsKHZhbHVlKSB7XG5cdFx0bGV0IHggPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhbWl0ZW0nKTtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHgubGVuZ3RoOyBpKyspIHtcblx0XHRcdHhbaV0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG5cdFx0fVxuXG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Fpci1kYXRhJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndHJhaW4tZGF0YScpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2F1dG8tZGF0YScpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ290aGVyLWRhdGEnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXHRcdGxldCBhcnJpdmFsZGF0YSA9IHZhbHVlICsgJy1kYXRhJztcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZChhcnJpdmFsZGF0YSkuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodmFsdWUpLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqZm9ybV9hcnJpdmFsX21lYW5zJykudmFsdWUgPSB2YWx1ZTtcblx0fVxufSkoalF1ZXJ5KTsiLCIvKipcbiAqIEBwYWNrYWdlICAgIEtub3cgUmVzZXJ2YXRpb25zXG4gKiBAc3VicGFja2FnZSBTaXRlIEpTXG4gKiBAY29weXJpZ2h0ICAyMDIwIEhpZ2hsYW5kIFZpc2lvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIEBsaWNlbnNlICAgIFNlZSB0aGUgZmlsZSBcIkxJQ0VOU0UudHh0XCIgZm9yIHRoZSBmdWxsIGxpY2Vuc2UgZ292ZXJuaW5nIHRoaXMgY29kZS5cbiAqIEBhdXRob3IgICAgIEhhemVsIFdpbHNvbiA8aGF6ZWxAaGlnaGxhbmR2aXNpb24uY29tPlxuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG5sZXQgb3ZDaGlsZHJlbiwgb3ZTdGF0ZSA9IG51bGwsIG92UHMgPSAwLCAkb3ZCdG47XG5sZXQgZmNDaGlsZHJlbiwgZmNTdGF0ZSA9IG51bGwsICRmY0J0bjtcbmxldCB0dENoaWxkcmVuLCB0dFN0YXRlID0gbnVsbCwgdHRQcyA9IDAsICR0dEJ0biwgdHRwYXJhcztcbmxldCBjdXJyZW50UGFyYWdyYXBoLCBockVsZW1lbnQ7XG5cbihmdW5jdGlvbiAoJCkge1xuICAgICQoZnVuY3Rpb24gKCkge1xuICAgICAgICBvdkNoaWxkcmVuID0gJCgnLnJlYWRtb3JlLW92ZXJ2aWV3JykuY2hpbGRyZW4oJ3AnKTtcbiAgICAgICAgb3ZQcyA9IG92Q2hpbGRyZW4ubGVuZ3RoO1xuICAgICAgICBpZiAob3ZQcyA+IDUpIHtcbiAgICAgICAgICAgIG92Q2hpbGRyZW4uc2xpY2UoNikuaGlkZSgpO1xuICAgICAgICAgICAgb3ZDaGlsZHJlbi5zbGljZShvdlBzIC0gMSwgb3ZQcykuYWZ0ZXIoJzxhIGNsYXNzPVwiYnV0dG9uIGhvbGxvdycgK1xuICAgICAgICAgICAgICAgICcgYWNjZW50IHJlYWRtb3JlIG92ZXJ2aWV3LXRvZ2dsZVwiPlJlYWQgbW9yZS4uLjwvYT4nKTtcbiAgICAgICAgICAgIG92U3RhdGUgPSAnaGlkZGVuJztcbiAgICAgICAgfVxuXG4gICAgICAgIHR0Q2hpbGRyZW4gPSAkKCcucmVhZG1vcmUtdGVzdGltb25pYWxzJykuY2hpbGRyZW4oJ3AnKTtcbiAgICAgICAgdHRQcyA9IHR0Q2hpbGRyZW4ubGVuZ3RoO1xuICAgICAgICBpZiAodHRQcyA+IDEwKSB7XG4gICAgICAgICAgICB0dENoaWxkcmVuLnNsaWNlKDExKS5oaWRlKCk7XG4gICAgICAgICAgICB0dHBhcmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnJlYWRtb3JlLXRlc3RpbW9uaWFscyBwW3N0eWxlKj1cImRpc3BsYXk6IG5vbmVcIl0nKTtcbiAgICAgICAgICAgIGRvSFJzKHR0cGFyYXMsICdoaWRlJyk7XG4gICAgICAgICAgICB0dENoaWxkcmVuLnNsaWNlKHR0UHMgLSAxLCB0dFBzKS5hZnRlcignPGEgY2xhc3M9XCJidXR0b24gaG9sbG93JyArXG4gICAgICAgICAgICAgICAgJyBhY2NlbnQgcmVhZG1vcmUgdGVzdGltb25pYWxzLXRvZ2dsZVwiPlJlYWQgbW9yZS4uLjwvYT4nKTtcbiAgICAgICAgICAgIHR0U3RhdGUgPSAnaGlkZGVuJztcbiAgICAgICAgfVxuXG4gICAgICAgIGZjQ2hpbGRyZW4gPSAkKCcucmVhZG1vcmUtZmFjaWxpdGllcycpLmNoaWxkcmVuKCcucm9vbXMnKTtcbiAgICAgICAgaWYgKGZjQ2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICAgICAgICBmY0NoaWxkcmVuLmhpZGUoKS5hZnRlcignPGEgY2xhc3M9XCJidXR0b24gaG9sbG93JyArXG4gICAgICAgICAgICAgICAgJyBhY2NlbnQgcmVhZG1vcmUgZmFjaWxpdGllcy10b2dnbGVcIj5TZWUgYWxsIGZhY2lsaXRpZXMuLi48L2E+Jyk7XG4gICAgICAgICAgICBmY1N0YXRlID0gJ2hpZGRlbic7XG4gICAgICAgIH1cblxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLnJlYWRtb3JlLm92ZXJ2aWV3LXRvZ2dsZScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAkb3ZCdG4gPSAkKFwiLm92ZXJ2aWV3LXRvZ2dsZVwiKTtcbiAgICAgICAgICAgIGlmIChvdlN0YXRlID09PSAndmlzaWJsZScpIHtcbiAgICAgICAgICAgICAgICBvdkNoaWxkcmVuLnNsaWNlKDYpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAkb3ZCdG4uYXR0cigndmFsdWUnLCAnUmVhZCBtb3JlJyk7XG4gICAgICAgICAgICAgICAgJG92QnRuLnRleHQoXCJSZWFkIG1vcmUuLi5cIik7XG4gICAgICAgICAgICAgICAgb3ZTdGF0ZSA9ICdoaWRkZW4nO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChvdlN0YXRlID09PSAnaGlkZGVuJykge1xuICAgICAgICAgICAgICAgICQoJy5yZWFkbW9yZS1vdmVydmlldyBwJykuc2hvdygpO1xuICAgICAgICAgICAgICAgICRvdkJ0bi5hdHRyKCd2YWx1ZScsICdSZWFkIGxlc3MnKTtcbiAgICAgICAgICAgICAgICAkb3ZCdG4udGV4dChcIlJlYWQgbGVzcy4uLlwiKTtcbiAgICAgICAgICAgICAgICBvdlN0YXRlID0gJ3Zpc2libGUnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJCgnLnByb3BlcnR5LW1lbnUnKS5mb3VuZGF0aW9uKCdjYWxjUG9pbnRzJyk7XG4gICAgICAgICAgICAkKCcuc3RpY2t5JykuZm91bmRhdGlvbignX2NhbGMnLCB0cnVlKTtcbiAgICAgICAgfSkub24oJ2NsaWNrJywgJy5yZWFkbW9yZS50ZXN0aW1vbmlhbHMtdG9nZ2xlJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICR0dEJ0biA9ICQoXCIudGVzdGltb25pYWxzLXRvZ2dsZVwiKTtcbiAgICAgICAgICAgIGlmICh0dFN0YXRlID09PSAndmlzaWJsZScpIHtcbiAgICAgICAgICAgICAgICB0dENoaWxkcmVuLnNsaWNlKDExKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgZG9IUnModHRwYXJhcywgJ2hpZGUnKTtcbiAgICAgICAgICAgICAgICAkdHRCdG4uYXR0cigndmFsdWUnLCAnUmVhZCBtb3JlJyk7XG4gICAgICAgICAgICAgICAgJHR0QnRuLnRleHQoXCJSZWFkIG1vcmUuLi5cIik7XG4gICAgICAgICAgICAgICAgdHRTdGF0ZSA9ICdoaWRkZW4nO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0dFN0YXRlID09PSAnaGlkZGVuJykge1xuICAgICAgICAgICAgICAgICQoJy5yZWFkbW9yZS10ZXN0aW1vbmlhbHMgcCcpLnNob3coKTtcbiAgICAgICAgICAgICAgICBkb0hScyh0dHBhcmFzLCAnc2hvdycpO1xuICAgICAgICAgICAgICAgICR0dEJ0bi5hdHRyKCd2YWx1ZScsICdSZWFkIGxlc3MnKTtcbiAgICAgICAgICAgICAgICAkdHRCdG4udGV4dChcIlJlYWQgbGVzcy4uLlwiKTtcbiAgICAgICAgICAgICAgICB0dFN0YXRlID0gJ3Zpc2libGUnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJCgnLnByb3BlcnR5LW1lbnUnKS5mb3VuZGF0aW9uKCdjYWxjUG9pbnRzJyk7XG4gICAgICAgICAgICAkKCcuc3RpY2t5JykuZm91bmRhdGlvbignX2NhbGMnLCB0cnVlKTtcbiAgICAgICAgfSkub24oJ2NsaWNrJywgJy5yZWFkbW9yZS5mYWNpbGl0aWVzLXRvZ2dsZScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAkZmNCdG4gPSAkKFwiLmZhY2lsaXRpZXMtdG9nZ2xlXCIpO1xuICAgICAgICAgICAgaWYgKGZjU3RhdGUgPT09ICd2aXNpYmxlJykge1xuICAgICAgICAgICAgICAgICQoJy5yZWFkbW9yZS1mYWNpbGl0aWVzIC5yb29tcycpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAkZmNCdG4uYXR0cigndmFsdWUnLCAnU2VlIGFsbCBmYWNpbGl0aWVzJyk7XG4gICAgICAgICAgICAgICAgJGZjQnRuLnRleHQoXCJTZWUgYWxsIGZhY2lsaXRpZXMuLi5cIik7XG4gICAgICAgICAgICAgICAgZmNTdGF0ZSA9ICdoaWRkZW4nO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChmY1N0YXRlID09PSAnaGlkZGVuJykge1xuICAgICAgICAgICAgICAgICQoJy5yZWFkbW9yZS1mYWNpbGl0aWVzIC5yb29tcycpLnNob3coKTtcbiAgICAgICAgICAgICAgICAkZmNCdG4uYXR0cigndmFsdWUnLCAnSGlkZSBhbGwgZmFjaWxpdGllcycpO1xuICAgICAgICAgICAgICAgICRmY0J0bi50ZXh0KFwiSGlkZSBhbGwgZmFjaWxpdGllcy4uLlwiKTtcbiAgICAgICAgICAgICAgICBmY1N0YXRlID0gJ3Zpc2libGUnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJCgnLnByb3BlcnR5LW1lbnUnKS5mb3VuZGF0aW9uKCdjYWxjUG9pbnRzJyk7XG4gICAgICAgICAgICAkKCcuc3RpY2t5JykuZm91bmRhdGlvbignX2NhbGMnLCB0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KGpRdWVyeSkpO1xuXG5mdW5jdGlvbiBkb0hScyhwYXJhZ3JhcGhzLCB0eXBlKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXJhZ3JhcGhzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGN1cnJlbnRQYXJhZ3JhcGggPSBwYXJhZ3JhcGhzW2ldO1xuICAgICAgICBockVsZW1lbnQgPSBjdXJyZW50UGFyYWdyYXBoLm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgaWYgKGhyRWxlbWVudCAmJiBockVsZW1lbnQudGFnTmFtZSA9PT0gJ0hSJykge1xuICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdoaWRlJylcbiAgICAgICAgICAgICAgICBockVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBockVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIH1cbiAgICB9XG59IiwiLyoqXG4gKiBAcGFja2FnZSAgICBLbm93IFJlc2VydmF0aW9uc1xuICogQHN1YnBhY2thZ2UgU2l0ZSBKU1xuICogQGNvcHlyaWdodCAgMjAyMCBIaWdobGFuZCBWaXNpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBAbGljZW5zZSAgICBTZWUgdGhlIGZpbGUgXCJMSUNFTlNFLnR4dFwiIGZvciB0aGUgZnVsbCBsaWNlbnNlIGdvdmVybmluZyB0aGlzIGNvZGUuXG4gKiBAYXV0aG9yICAgICBIYXplbCBXaWxzb24gPGhhemVsQGhpZ2hsYW5kdmlzaW9uLmNvbT5cbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxuY29uc3QgbGFuZyA9IFwiZW5cIjtcblxuKGZ1bmN0aW9uICgkKSB7XG4gICAgY29uc3QgbWFya2Vyc2hhcGUgPSB7XG4gICAgICAgIHR5cGU6ICdwb2x5JyxcbiAgICAgICAgY29vcmRzOiBbMSwgMSwgMSwgMzIsIDM3LCAzMiwgMzIsIDFdXG4gICAgfTtcblxuICAgIGxldCBteUtybWFwO1xuICAgIGxldCBtYXBEYXRhID0gZmFsc2U7XG4gICAgbGV0IG1hcDtcbiAgICBsZXQgaW5mb1dpbmRvdztcbiAgICBsZXQgaW5mb1dpbmRvdzI7XG4gICAgbGV0IGJvdW5kcztcbiAgICBsZXQgcHJvcGVydHlkaXY7XG4gICAgbGV0IHByb3BlcnR5aWNvbjtcbiAgICBsZXQgbWM7XG5cbiAgICBsZXQgc2V0dGluZ3MgPSB7XG4gICAgICAgIHByb3BlcnR5TWFya2VyczogW10sXG4gICAgICAgIGZpbHRlcklkczogW10sXG4gICAgICAgIG1hcE1hcmtlcnM6IFtdLFxuICAgICAgICBtYXBUeXBlSWQ6ICcnLFxuICAgICAgICBtYXBab29tOiAxMixcbiAgICAgICAgbWFwTWF4Wm9vbTogMjAsXG4gICAgICAgIG1hcFR5cGU6ICcnLFxuICAgICAgICBtYXBJZDogJycsXG4gICAgICAgIG1hcmtlckNvbG9yOiAncmVkJyxcbiAgICB9O1xuXG4gICAgY2xhc3MgS3JtYXAge1xuICAgICAgICBjb25zdHJ1Y3RvcihzZXR0aW5ncykge1xuICAgICAgICAgICAgdGhpcy5zZXR0aW5ncyA9IHNldHRpbmdzO1xuICAgICAgICAgICAgLy9Jbml0aWFsaXNlIG1hcCBvcHRpb25zXG4gICAgICAgICAgICB0aGlzLmdtT3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICBzY3JvbGx3aGVlbDogZmFsc2UsXG4gICAgICAgICAgICAgICAgem9vbTogdGhpcy5zZXR0aW5ncy5tYXBab29tLFxuICAgICAgICAgICAgICAgIG1heFpvb206IHRoaXMuc2V0dGluZ3MubWFwTWF4Wm9vbSxcbiAgICAgICAgICAgICAgICBtYXBUeXBlSWQ6IHRoaXMuc2V0dGluZ3MubWFwVHlwZUlkLFxuICAgICAgICAgICAgICAgIHN0cmVldFZpZXdDb250cm9sOiBmYWxzZVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy5nbWFya2VycyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5jb3VudCA9IDA7XG4gICAgICAgICAgICB0aGlzLmluaXRNYXAoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRpYyBjbG9zZUtySW5mb3dpbmRvdygpIHtcbiAgICAgICAgICAgICQoJyNrci1pbmZvd2luZG93JykuaGlkZSgpO1xuICAgICAgICAgICAgaW5mb1dpbmRvdy5jbG9zZSgpO1xuICAgICAgICAgICAgaW5mb1dpbmRvdzIuY2xvc2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG9ubHkgc2hvdyB2aXNpYmxlIG1hcmtlcnNcbiAgICAgICAgc3RhdGljIHNob3dWaXNpYmxlTWFya2VycyhtYXJrZXJzKSB7XG4gICAgICAgICAgICBsZXQgYm91bmRzID0gbWFwLmdldEJvdW5kcygpO1xuICAgICAgICAgICAgbGV0IGNvdW50ID0gMDtcblxuICAgICAgICAgICAgZm9yIChsZXQgZCA9IDA7IGQgPCBtYXJrZXJzLmxlbmd0aDsgZCsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IG1hcmtlciA9IG1hcmtlcnNbZF07XG4gICAgICAgICAgICAgICAgaWYgKG1hcmtlci50eXBlID09PSAnbWFwJykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoYm91bmRzLmNvbnRhaW5zKG1hcmtlci5nZXRQb3NpdGlvbigpKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFya2VyLnNldFZpc2libGUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb3VudCsrO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFya2VyLnNldFZpc2libGUoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gY291bnQ7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDaGVjayBNYXJrZXJzIGFycmF5IGZvciBkdXBsaWNhdGUgcG9zaXRpb24gYW5kIG9mZnNldCBhIGxpdHRsZVxuICAgICAgICBjaGVja0R1cGxpY2F0ZShjdXJyZW50KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5nbWFya2Vycy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgbGV0IGR1cHMgPSAwO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLmdtYXJrZXJzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcG9zID0gdGhpcy5nbWFya2Vyc1tpbmRleF0uZ2V0UG9zaXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnQuZXF1YWxzKHBvcykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGR1cHMrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhID0gMzYwLjAgLyBkdXBzO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld0xhdCA9IHBvcy5sYXQoKSArIC0uMDAwMDIgKiBNYXRoLmNvcygoK2EgKiBkdXBzKSAvIDE4MCAqIE1hdGguUEkpOyAgLy94XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV3TG5nID0gcG9zLmxuZygpICsgLS4wMDAwMCAqIE1hdGguc2luKCgrYSAqIGR1cHMpIC8gMTgwICogTWF0aC5QSSk7ICAvL1lcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKG5ld0xhdCwgbmV3TG5nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnQ7XG4gICAgICAgIH1cblxuICAgICAgICBjaGVja1pvb20oKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5tYXBab29tID4gMCkge1xuICAgICAgICAgICAgICAgIGxldCBteWxpc3RlbmVyID0gbWFwLmFkZExpc3RlbmVyKCdpZGxlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAobWFwLmdldFpvb20oKSAhPT0gdGhpcy5zZXR0aW5ncy5tYXBab29tKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXAuc2V0Wm9vbSh0aGlzLnNldHRpbmdzLm1hcFpvb20pO1xuICAgICAgICAgICAgICAgICAgICAgICAgbXlsaXN0ZW5lci5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY2x1c3Rlck1hcCgpIHtcbiAgICAgICAgICAgIGNvbnN0IG1jT3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICBncmlkU2l6ZTogMjAsXG4gICAgICAgICAgICAgICAgaWdub3JlSGlkZGVuTWFya2VyczogdHJ1ZSxcbiAgICAgICAgICAgICAgICBpbWFnZVBhdGg6ICcvbWVkaWEvY29tX2tub3dyZXMvaW1hZ2VzL21hcmtlcmNsdXN0ZXJlci9tJ1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgbWFwLm1heERlZmF1bHRab29tID0gdGhpcy5zZXR0aW5ncy5tYXBab29tO1xuICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MubWFwWm9vbSA+IDApIHtcbiAgICAgICAgICAgICAgICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lck9uY2UobWFwLCBcImJvdW5kc19jaGFuZ2VkXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRab29tKE1hdGgubWluKHRoaXMuZ2V0Wm9vbSgpLCB0aGlzLm1heERlZmF1bHRab29tKSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc2V0UHJvcGVydHlNYXJrZXJzKCk7XG4gICAgICAgICAgICB0aGlzLnNldE1hcE1hcmtlcnMoKTtcblxuICAgICAgICAgICAgZm9yIChsZXQgZCA9IDA7IGQgPCB0aGlzLmdtYXJrZXJzLmxlbmd0aDsgZCsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IG1hcmtlciA9IHRoaXMuZ21hcmtlcnNbZF07XG4gICAgICAgICAgICAgICAgaWYgKG1hcmtlci50eXBlID09PSAncHJvcGVydHknKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmZpbHRlcklkcy5pbmNsdWRlcyhtYXJrZXIucGlkKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFya2VyLnNldFZpc2libGUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXJrZXIuc2V0VmlzaWJsZShmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG1jID0gbmV3IE1hcmtlckNsdXN0ZXJlcihtYXAsIHRoaXMuZ21hcmtlcnMsIG1jT3B0aW9ucyk7XG4gICAgICAgICAgICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYywgXCJjbHVzdGVyY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICQoJyNrci1pbmZvd2luZG93JykuaGlkZSgpO1xuICAgICAgICAgICAgICAgIGluZm9XaW5kb3cuY2xvc2UoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBtYXAuZml0Qm91bmRzKGJvdW5kcyk7XG4gICAgICAgICAgICBtYXAuc2V0Q2VudGVyKGJvdW5kcy5nZXRDZW50ZXIoKSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDcmVhdGUgdGhlIE1hcFxuICAgICAgICBjcmVhdGVNYXAoKSB7XG4gICAgICAgICAgICBtYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuc2V0dGluZ3MubWFwSWQpLCB0aGlzLmdtT3B0aW9ucyk7XG4gICAgICAgICAgICBpbmZvV2luZG93ID0gbmV3IGdvb2dsZS5tYXBzLkluZm9XaW5kb3coKTtcbiAgICAgICAgICAgIGluZm9XaW5kb3cyID0gbmV3IGdvb2dsZS5tYXBzLkluZm9XaW5kb3coKTtcbiAgICAgICAgICAgIGJvdW5kcyA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmdCb3VuZHMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENyZWF0ZSB0aGUgbWFya2VyIGFuZCBzZXQgdXAgdGhlIGV2ZW50IHdpbmRvd1xuICAgICAgICBjcmVhdGVNYXBNYXJrZXIocG9pbnQsIGh0bWwsIGltYWdlLCBib3hpbmZvLCBsaW5rLCB0aXRsZSkge1xuICAgICAgICAgICAgbGV0IG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xuICAgICAgICAgICAgICAgIHNoYXBlOiBtYXJrZXJzaGFwZSxcbiAgICAgICAgICAgICAgICBsaW5rOiBsaW5rLFxuICAgICAgICAgICAgICAgIGljb246IGltYWdlLFxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBwb2ludCxcbiAgICAgICAgICAgICAgICB0aXRsZTogdGl0bGUsXG4gICAgICAgICAgICAgICAgbWFwOiBtYXAsXG4gICAgICAgICAgICAgICB6SW5kZXg6IDk5OVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKG1hcmtlciwgJ21vdXNlb3ZlcicsIChmdW5jdGlvbiAoaHRtbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGluZm9XaW5kb3cyLnNldENvbnRlbnQoaHRtbCk7XG4gICAgICAgICAgICAgICAgICAgIGluZm9XaW5kb3cyLm9wZW4obWFwLCBtYXJrZXIpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KShodG1sKSk7XG5cbiAgICAgICAgICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKG1hcmtlciwgJ21vdXNlb3V0JywgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpbmZvV2luZG93Mi5jbG9zZSgpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KSgpKTtcblxuICAgICAgICAgICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIobWFya2VyLCAnY2xvc2VjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpbmZvV2luZG93Mi5jbG9zZSgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuZ21hcmtlcnMucHVzaChtYXJrZXIpO1xuXG4gICAgICAgICAgICB0aGlzLmNvdW50Kys7XG4gICAgICAgIH1cblxuICAgICAgICBjcmVhdGVQcm9wZXJ0eU1hcmtlcihwb2ludCwgaHRtbCwgYm94aW5mbywgbGluaywgdGl0bGUsIGNvbG9yLCBpZCwgaW1hZ2UsIHBpZCkge1xuICAgICAgICAgICAgbGV0IG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBwb2ludCxcbiAgICAgICAgICAgICAgICBsaW5rOiBsaW5rLFxuICAgICAgICAgICAgICAgIG1hcDogbWFwLFxuICAgICAgICAgICAgICAgIGljb246IGltYWdlLFxuICAgICAgICAgICAgICAgIHRpdGxlOiB0aXRsZSxcbiAgICAgICAgICAgICAgICBwaWQ6IHBpZCxcbiAgICAgICAgICAgICAgICB0eXBlOiAncHJvcGVydHknLFxuICAgICAgICAgICAgICAgIHpJbmRleDogdGhpcy5jb3VudCArIDEwMDBcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBwcm9wZXJ0eWRpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcbiAgICAgICAgICAgIG1hcmtlci5hZGRMaXN0ZW5lcignbW91c2Vkb3duJywgKGZ1bmN0aW9uIChib3hpbmZvKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5mb1dpbmRvdy5jbG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICAkKCcja3ItaW5mb3dpbmRvdycpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgaW5mb1dpbmRvdy5zZXRDb250ZW50KGh0bWwpO1xuICAgICAgICAgICAgICAgICAgICBpbmZvV2luZG93Lm9wZW4obWFwLCBtYXJrZXIpO1xuXG4gICAgICAgICAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJy9pbmRleC5waHA/b3B0aW9uPWNvbV9rbm93cmVzJnRhc2s9cHJvcGVydHkubWFwaW5mb3dpbmRvdycsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHBhcnNlSW50KGJveGluZm8pXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcja3ItaW5mb3dpbmRvdycpLmZhZGVJbig0MDApLmh0bWwoZGF0YSkuc2hvdygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIua3ItaW5mb3dpbmRvdy1zbGlkZXNob3dcIikubm90KCcuc2xpY2staW5pdGlhbGl6ZWQnKS5zbGljayh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHRBcnJvdzogJzxpIGNsYXNzPVwic2xpY2stbmF2IG5leHQgZmEtc29saWQgZmEtY2hldnJvbi1yaWdodCBcIj48L2k+JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJldkFycm93OiAnPGkgY2xhc3M9XCJzbGljay1uYXYgcHJldiBmYS1zb2xpZCBmYS1jaGV2cm9uLWxlZnQgXCI+PC9pPicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KShib3hpbmZvKSk7XG5cbiAgICAgICAgICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKG1hcmtlciwgJ2Nsb3NlY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgJCgnI2tyLWluZm93aW5kb3cnKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgaW5mb1dpbmRvdy5jbG9zZSgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuZ21hcmtlcnMucHVzaChtYXJrZXIpO1xuICAgICAgICAgICAgYm91bmRzLmV4dGVuZChwb2ludCk7XG5cbiAgICAgICAgICAgIHRoaXMuY291bnQrKztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vSW5pdGlhbGlzZSBtYXBcbiAgICAgICAgaW5pdE1hcCgpIHtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlTWFwKCk7XG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5tYXBUeXBlID09PSAnY2x1c3RlcicpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsdXN0ZXJNYXAoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zb2xvTWFwKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZXNldCBtYXAgdG8gaW5pdGlhbCBzdGF0ZVxuICAgICAgICByZWZyZXNoTWFwKCRtYXBtb2RhbCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MubWFwVHlwZSA9PT0gJ3NvbG8nKVxuICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgalF1ZXJ5LmFqYXgoe1xuICAgICAgICAgICAgICAgIHVybDogJy9pbmRleC5waHA/b3B0aW9uPWNvbV9rbm93cmVzJnRhc2s9cHJvcGVydGllcy5yZWZyZXNobWFwJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXR0aW5ncy5maWx0ZXJJZHMgPSByZXN1bHQuZGF0YS5maWx0ZXJJZHM7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBkID0gMDsgZCA8IHNlbGYuZ21hcmtlcnMubGVuZ3RoOyBkKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbWFya2VyID0gc2VsZi5nbWFya2Vyc1tkXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobWFya2VyLnR5cGUgPT09ICdwcm9wZXJ0eScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGYuc2V0dGluZ3MuZmlsdGVySWRzLmluY2x1ZGVzKG1hcmtlci5waWQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJrZXIuc2V0VmlzaWJsZSh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtlci5zZXRWaXNpYmxlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgbWMucmVwYWludCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEZvdW5kYXRpb24uUmV2ZWFsKCRtYXBtb2RhbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkbWFwbW9kYWwuZm91bmRhdGlvbignb3BlbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZ29vZ2xlLm1hcHMuZXZlbnQudHJpZ2dlcihtYXAsICdyZXNpemUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRtYXBtb2RhbC5mb3VuZGF0aW9uKCdvcGVuJyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuYWxlcnQocmVzdWx0Lm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZXNldCBtYXAgdG8gaW5pdGlhbCBzdGF0ZVxuICAgICAgICByZXNldE1hcCgpIHtcbiAgICAgICAgICAgIGluZm9XaW5kb3cuY2xvc2UoKTtcbiAgICAgICAgICAgIGluZm9XaW5kb3cyLmNsb3NlKCk7XG4gICAgICAgICAgICAkKCcja3ItaW5mb3dpbmRvdycpLmhpZGUoKTtcbiAgICAgICAgICAgIG1hcC5maXRCb3VuZHMoYm91bmRzKTtcbiAgICAgICAgICAgIG1hcC5zZXRDZW50ZXIoYm91bmRzLmdldENlbnRlcigpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGxvb3AgdG8gc2V0IG1hcCBtYXJrZXJzXG4gICAgICAgIHNldE1hcE1hcmtlcnMoKSB7XG4gICAgICAgICAgICBsZXQgcG9pbnQ7XG4gICAgICAgICAgICBsZXQgYW1hcms7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGQgPSAwOyBkIDwgdGhpcy5zZXR0aW5ncy5tYXBNYXJrZXJzLmxlbmd0aDsgZCsrKSB7XG4gICAgICAgICAgICAgICAgYW1hcmsgPSB0aGlzLnNldHRpbmdzLm1hcE1hcmtlcnNbZF07XG4gICAgICAgICAgICAgICAgbGV0IG1hcmtlcmljb24gPSB7XG4gICAgICAgICAgICAgICAgICAgIHVybDogYW1hcmtbJ2ljb24nXSxcbiAgICAgICAgICAgICAgICAgICAgc2l6ZTogbmV3IGdvb2dsZS5tYXBzLlNpemUoMzIsIDM3KSxcbiAgICAgICAgICAgICAgICAgICAgLy8gT1Igc2NhbGVkU2l6ZTogbmV3IGdvb2dsZS5tYXBzLlNpemUoNDAsIDQ3KVxuICAgICAgICAgICAgICAgICAgICBvcmlnaW46IG5ldyBnb29nbGUubWFwcy5Qb2ludCgwLCAwKSxcbiAgICAgICAgICAgICAgICAgICAgYW5jaG9yOiBuZXcgZ29vZ2xlLm1hcHMuUG9pbnQoMCwgMTgpXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHBvaW50ID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhhbWFya1snbGF0J10sIGFtYXJrWydsbmcnXSk7XG4gICAgICAgICAgICAgICAgcG9pbnQgPSB0aGlzLmNoZWNrRHVwbGljYXRlKHBvaW50KTtcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZU1hcE1hcmtlcihwb2ludCwgYW1hcmtbJ2h0bWwnXSwgbWFya2VyaWNvbiwgJycsICcnLCBhbWFya1sndGl0bGUnXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBsb29wIHRvIHNldCBwcm9wZXJ0eSBtYXJrZXJzXG4gICAgICAgIHNldFByb3BlcnR5TWFya2VycygpIHtcbiAgICAgICAgICAgIGxldCBwb2ludDtcbiAgICAgICAgICAgIGxldCBhbWFyaztcblxuICAgICAgICAgICAgZm9yIChsZXQgZCA9IDA7IGQgPCB0aGlzLnNldHRpbmdzLnByb3BlcnR5TWFya2Vycy5sZW5ndGg7IGQrKykge1xuICAgICAgICAgICAgICAgIGFtYXJrID0gdGhpcy5zZXR0aW5ncy5wcm9wZXJ0eU1hcmtlcnNbZF07XG4gICAgICAgICAgICAgICAgaWYgKCFkKSB7XG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnR5aWNvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogYW1hcmtbJ2ljb24nXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpemU6IG5ldyBnb29nbGUubWFwcy5TaXplKDMyLCAzNyksXG4gICAgICAgICAgICAgICAgICAgICAgICBvcmlnaW46IG5ldyBnb29nbGUubWFwcy5Qb2ludCgwLCAwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuY2hvcjogbmV3IGdvb2dsZS5tYXBzLlBvaW50KDAsIDIwKVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHBvaW50ID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhhbWFya1snbGF0J10sIGFtYXJrWydsbmcnXSk7XG4gICAgICAgICAgICAgICAgcG9pbnQgPSB0aGlzLmNoZWNrRHVwbGljYXRlKHBvaW50KTtcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVByb3BlcnR5TWFya2VyKHBvaW50LCBhbWFya1snaHRtbCddLCBhbWFya1snYm94aW5mbyddLCBhbWFya1snbGluayddLCBhbWFya1sndGl0bGUnXSxcbiAgICAgICAgICAgICAgICAgICAgYW1hcmtbJ2NvbG9yJ10sIGFtYXJrWydpZCddLCBwcm9wZXJ0eWljb24sIGFtYXJrWydwaWQnXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBzb2xvTWFwKCkge1xuICAgICAgICAgICAgdGhpcy5zZXRQcm9wZXJ0eU1hcmtlcnMoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0TWFwTWFya2VycygpO1xuXG4gICAgICAgICAgICBtYXAuZml0Qm91bmRzKGJvdW5kcyk7XG4gICAgICAgICAgICBtYXAuc2V0Q2VudGVyKGJvdW5kcy5nZXRDZW50ZXIoKSk7XG4gICAgICAgICAgICB0aGlzLmNoZWNrWm9vbSgpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5tYXBNYXJrZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcblxuICAgICAgICAgICAgICAgIGxldCBteUxpc3RlbmVyID0gZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIobWFwLCAnaWRsZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZvdW5kID0gMDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRab29tID0gbWFwLmdldFpvb20oKTtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKCFmb3VuZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm91bmQgPSBLcm1hcC5zaG93VmlzaWJsZU1hcmtlcnMoc2VsZi5nbWFya2Vycyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZm91bmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBteUxpc3RlbmVyLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcC5zZXRab29tKGN1cnJlbnRab29tKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRab29tID0gY3VycmVudFpvb20gLSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRab29tIDwgMTApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgJChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCAkbWFwbW9kYWw7XG5cbiAgICAgICAgJCgnYm9keScpLm9uKCdjbGljaycsICcubWFwLXRyaWdnZXInLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgaWYgKG1hcERhdGEpIHtcbiAgICAgICAgICAgICAgICBteUtybWFwLnJlZnJlc2hNYXAoJG1hcG1vZGFsKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAga2lja01hcCgkKHRoaXMpKTtcbiAgICAgICAgICAgICAgICAkbWFwbW9kYWwgPSAkKCcja3Itc2VhcmNoLW1hcC1tb2RhbCcpO1xuICAgICAgICAgICAgICAgICRtYXBtb2RhbC5mb3VuZGF0aW9uKCdvcGVuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLm9uKCdjbGljaycsICcucmVzZXRtYXAnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgbXlLcm1hcC5yZXNldE1hcCgpO1xuICAgICAgICB9KS5vbignY2xpY2snLCAnI2tyLXNlYXJjaC1tYXAtZnVsbC1pbmZvd2luZG93LWNsb3NlJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIEtybWFwLmNsb3NlS3JJbmZvd2luZG93KCk7XG4gICAgICAgIH0pLm9uKCdjbGljaycsICcuY2xvc2VtYXAnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgJG1hcG1vZGFsLmZvdW5kYXRpb24oJ2Nsb3NlJyk7XG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgICAgIHVybDogJy9pbmRleC5waHA/b3B0aW9uPWNvbV9rbm93cmVzJnRhc2s9cHJvcGVydGllcy5tYXBzZXNzaW9uJyxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICQoJy5rci1zZWFyY2hiYXIgLmJ1dHRvbi5tYXAnKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KS5vbignb3Blbi56Zi5yZXZlYWwnLCAnI2tyLXNlYXJjaC1tYXAtbW9kYWwnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgJCgnI2tyLXNlYXJjaC1tYXAtZnVsbCcpLmhlaWdodCgkKCcja3Itc2VhcmNoLW1hcC1tb2RhbCcpLmhlaWdodCgpKTtcbiAgICAgICAgICAgIGdvb2dsZS5tYXBzLmV2ZW50LnRyaWdnZXIobWFwLCBcInJlc2l6ZVwiKTtcbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICAgICAgdXJsOiAnL2luZGV4LnBocD9vcHRpb249Y29tX2tub3dyZXMmdGFzaz1wcm9wZXJ0aWVzLm1hcHNlc3Npb24nLFxuICAgICAgICAgICAgICAgIGRhdGE6IHttYXBfbW9kYWw6ICcxJ30sXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gRG9lc24ndCB0cmlnZ2VyIGlmIGluY2x1ZGVkIGFib3ZlID8/XG4gICAgICAgIGlmICghbWFwRGF0YSkge1xuICAgICAgICAgICAgY29uc3QgJHNvbG9UcmlnZ2VyID0gJCgnI2tyLW1hcC1zb2xvLXRyaWdnZXInKTtcbiAgICAgICAgICAgICRzb2xvVHJpZ2dlci5vbmUoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGtpY2tNYXAoJHNvbG9UcmlnZ2VyKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAod2luZG93LmxvY2F0aW9uLmhyZWYuaW5kZXhPZignI21hcCcpICE9PSAtMSAmJiAkc29sb1RyaWdnZXIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAga2lja01hcCgkc29sb1RyaWdnZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gVGVzdCBmb3IgZm9yY2UgbWFwXG4gICAgICAgIGNvbnN0ICRtdHJpZ2dlciA9ICQoJy5tYXAtdHJpZ2dlcicpO1xuICAgICAgICBpZiAoJG10cmlnZ2VyLmxlbmd0aCAmJiAkbXRyaWdnZXIuZGF0YSgnZm9yY2VtYXAnKSkge1xuICAgICAgICAgICAgICRtdHJpZ2dlci50cmlnZ2VyKCdjbGljaycpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24ga2lja01hcCgkZWxlbSkge1xuICAgICAgICAgICAgY29uc3QgdHlwZSA9ICRlbGVtLmRhdGEoJ3R5cGUnKTtcbiAgICAgICAgICAgIGxldCBwaWQgPSAwO1xuICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdzb2xvJykge1xuICAgICAgICAgICAgICAgIHBpZCA9ICRlbGVtLmRhdGEoJ3BpZCcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBqUXVlcnkuYWpheCh7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2luZGV4LnBocD9vcHRpb249Y29tX2tub3dyZXMmdGFzaz1wcm9wZXJ0aWVzLm1hcGRhdGEmcGlkPScgKyBwaWQsXG4gICAgICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6IFwianNvblwiLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5ncyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXBJZDogJGVsZW0uZGF0YSgndGFyZ2V0JyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwVHlwZTogJGVsZW0uZGF0YSgndHlwZScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcFR5cGVJZDogJGVsZW0uZGF0YSgnbWFwdHlwZWlkJyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwWm9vbTogcGFyc2VJbnQoJGVsZW0uZGF0YSgnem9vbScpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXBNYXhab29tOiBwYXJzZUludCgkZWxlbS5kYXRhKCd6b29tbWF4JykpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnR5TWFya2VyczogcmVzdWx0LmRhdGEucHJvcGVydHlNYXJrZXJzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcE1hcmtlcnM6IHJlc3VsdC5kYXRhLm1hcE1hcmtlcnMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVySWRzOiByZXN1bHQuZGF0YS5maWx0ZXJJZHNcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIG15S3JtYXAgPSBuZXcgS3JtYXAoc2V0dGluZ3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFwRGF0YSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuYWxlcnQocmVzdWx0Lm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn0oalF1ZXJ5KSk7IiwiLyoqXG4gKiBAcGFja2FnZSAgICBLbm93IFJlc2VydmF0aW9uc1xuICogQHN1YnBhY2thZ2UgU2l0ZSBKU1xuICogQGNvcHlyaWdodCAgMjAyMCBIaWdobGFuZCBWaXNpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBAbGljZW5zZSAgICBTZWUgdGhlIGZpbGUgXCJMSUNFTlNFLnR4dFwiIGZvciB0aGUgZnVsbCBsaWNlbnNlIGdvdmVybmluZyB0aGlzIGNvZGUuXG4gKiBAYXV0aG9yICAgICBIYXplbCBXaWxzb24gPGhhemVsQGhpZ2hsYW5kdmlzaW9uLmNvbT5cbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgkKSB7XG5cdGxldCBteUtycm91dGU7XG5cdGxldCBkaXJlY3Rpb25zRGlzcGxheTtcblx0bGV0IGRpcmVjdGlvbnNWaXNpYmxlID0gZmFsc2U7XG5cdGxldCByb3V0ZU1hcDtcblx0bGV0IG9yaWdpbjtcblx0bGV0IGRlc3RpbmF0aW9uO1xuXHRsZXQgcm91dGVNYXJrZXJzID0gW107XG5cdGxldCByb3V0ZVN0b3BQb2ludHMgPSBbXTtcblx0bGV0IHBvaW50O1xuXHRsZXQgc2VsZjtcblxuXHRsZXQgc2V0dGluZ3MgPSB7XG5cdFx0bGF0OiAgICAgICAgICAgICAgIFwiXCIsXG5cdFx0bG5nOiAgICAgICAgICAgICAgIFwiXCIsXG5cdFx0bmFtZTogICAgICAgICAgICAgIFwiXCIsXG5cdFx0aWNvbjogICAgICAgICAgICAgIFwiXCIsXG5cdFx0ZGV0b3VyOiAgICAgICAgICAgIFwiXCIsXG5cdFx0bWFwWm9vbTogICAgICAgICAgIDksXG5cdFx0bWFwTWF4Wm9vbTogICAgICAgIDE4LFxuXHRcdG1hcFR5cGVJZDogICAgICAgICBcInJvYWRtYXBcIixcblx0XHRtYXBJZDogICAgICAgICAgICAgXCJrci1tYXAtcm91dGVcIixcblx0XHRkaXJlY3Rpb25zUGFuZWw6ICAgXCJrci1kaXJlY3Rpb25zLXBhbmVsXCIsXG5cdFx0ZGlyZWN0aW9uc1NlcnZpY2U6IG51bGxcblx0fTtcblxuXHRjbGFzcyBLcnJvdXRlIHtcblx0XHRjb25zdHJ1Y3RvcigkZWxlbWVudCwgb3B0aW9ucykge1xuXHRcdFx0dGhpcy5zZXR0aW5ncyA9IHNldHRpbmdzO1xuXHRcdFx0aWYgKG9wdGlvbnMpIHtcblx0XHRcdFx0JC5leHRlbmQodGhpcy5zZXR0aW5ncywgb3B0aW9ucyk7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuc2V0dGluZ3MuZGlyZWN0aW9uc1NlcnZpY2UgPSBuZXcgZ29vZ2xlLm1hcHMuRGlyZWN0aW9uc1NlcnZpY2UoKTtcblx0XHRcdHRoaXMuaW5pdCgpO1xuXHRcdH1cblxuXHRcdHN0YXRpYyBjbGVhclJvdXRlTWFya2VycygpIHtcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcm91dGVNYXJrZXJzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdHJvdXRlTWFya2Vyc1tpXS5zZXRNYXAobnVsbCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0c3RhdGljIGNsZWFyV2F5cG9pbnRzKCkge1xuXHRcdFx0b3JpZ2luID0gbnVsbDtcblx0XHRcdHJvdXRlTWFya2VycyA9IFtdO1xuXHRcdFx0cm91dGVTdG9wUG9pbnRzID0gW107XG5cdFx0XHRkaXJlY3Rpb25zVmlzaWJsZSA9IGZhbHNlO1xuXHRcdH1cblxuXHRcdGFkZFJvdXRlTWFya2VyKGxhdGxuZykge1xuXHRcdFx0cm91dGVNYXJrZXJzLnB1c2gobmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XG5cdFx0XHRcdHBvc2l0aW9uOiBsYXRsbmcsXG5cdFx0XHRcdG1hcDogICAgICByb3V0ZU1hcCxcblx0XHRcdFx0aWNvbjogICAgIHRoaXMuc2V0dGluZ3MuZGV0b3VyXG5cdFx0XHR9KSk7XG5cdFx0fVxuXG5cdFx0Ly9cblx0XHQvLyBhZGRQcm9wZXJ0eU1hcmtlcihwb2ludCwgaHRtbCwgaW1hZ2UsIGJveGluZm8pIHtcblx0XHQvLyBcdGxldCBtYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcblx0XHQvLyBcdFx0cG9zaXRpb246IHBvaW50LFxuXHRcdC8vIFx0XHRodG1sOiAgICAgaHRtbCxcblx0XHQvLyBcdFx0bWFwOiAgICAgIHJvdXRlTWFwLFxuXHRcdC8vIFx0XHRpY29uOiAgICAgaW1hZ2UsXG5cdFx0Ly8gXHRcdHpJbmRleDogICAxXG5cdFx0Ly8gXHR9KTtcblx0XHQvL1xuXHRcdC8vIFx0bGV0IGluZm93aW5kb3cgPSBuZXcgZ29vZ2xlLm1hcHMuSW5mb1dpbmRvdyh7XG5cdFx0Ly8gXHRcdGNvbnRlbnQ6IGJveGluZm9cblx0XHQvLyBcdH0pO1xuXHRcdC8vXG5cdFx0Ly8gXHRnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYXJrZXIsICdjbGljaycsIGZ1bmN0aW9uICgpIHtcblx0XHQvLyBcdFx0Ly8gQ2hlY2sgdG8gc2VlIGlmIHRoZXJlIGlzIGFuIGluZm8gd2luZG93IHN0b3JlZCBpbiByb3V0ZUN1cnJJbmZvV2luZG93LFxuXHRcdC8vIFx0XHQvLyBpZiB0aGVyZSBpcywgd2UgdXNlIC5jbG9zZSgpIHRvIGhpZGUgdGhlIHdpbmRvd1xuXHRcdC8vIFx0XHRpZiAocm91dGVDdXJySW5mb1dpbmRvdykge1xuXHRcdC8vIFx0XHRcdHJvdXRlQ3VyckluZm9XaW5kb3cuY2xvc2UoKTtcblx0XHQvLyBcdFx0fVxuXHRcdC8vIFx0XHQvLyBQdXQgb3VyIG5ldyBpbmZvIHdpbmRvdyBpbiB0byB0aGUgcm91dGVDdXJySW5mb1dpbmRvdyB2YXJpYWJsZVxuXHRcdC8vIFx0XHRyb3V0ZUN1cnJJbmZvV2luZG93ID0gaW5mb3dpbmRvdztcblx0XHQvLyBcdFx0Ly8gT3BlbiB0aGUgd2luZG93XG5cdFx0Ly8gXHRcdGluZm93aW5kb3cub3Blbihyb3V0ZU1hcCwgbWFya2VyKTtcblx0XHQvLyBcdH0pO1xuXHRcdC8vXG5cdFx0Ly8gXHQvL2dtYXJrZXJzLnB1c2goIG1hcmtlciApO1xuXHRcdC8vIFx0cm91dGVNYXJrZXJzLnB1c2gobWFya2VyKTtcblx0XHQvLyB9XG5cblx0XHQvLyBzdGF0aWMgdXBkYXRlTW9kZSgpIHtcblx0XHQvLyBcdGlmIChkaXJlY3Rpb25zVmlzaWJsZSkge1xuXHRcdC8vIFx0XHR0aGlzLmNhbGNSb3V0ZSgpO1xuXHRcdC8vIFx0fVxuXHRcdC8vIH1cblxuXHRcdGNhbGNSb3V0ZSgpIHtcblx0XHRcdGxldCBmcm9tX2FkZHJlc3MgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZyb21fYWRkcmVzc1wiKS52YWx1ZTtcblx0XHRcdGxldCBvcmlnaW4gPSBcIlwiO1xuXG5cdFx0XHRpZiAoZnJvbV9hZGRyZXNzID09PSBcIkFkZHJlc3NcIikgZnJvbV9hZGRyZXNzID0gXCJcIjtcblx0XHRcdGlmIChmcm9tX2FkZHJlc3MpIG9yaWdpbiA9IGZyb21fYWRkcmVzcyArIFwiLFwiICsgXCJcIjtcblxuXHRcdFx0bGV0IG1vZGU7XG5cdFx0XHRzd2l0Y2ggKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW9kZVwiKS52YWx1ZSkge1xuXHRcdFx0XHRjYXNlIFwiYmljeWNsaW5nXCI6XG5cdFx0XHRcdFx0bW9kZSA9IGdvb2dsZS5tYXBzLkRpcmVjdGlvbnNUcmF2ZWxNb2RlLkJJQ1lDTElORztcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcImRyaXZpbmdcIjpcblx0XHRcdFx0XHRtb2RlID0gZ29vZ2xlLm1hcHMuRGlyZWN0aW9uc1RyYXZlbE1vZGUuRFJJVklORztcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcIndhbGtpbmdcIjpcblx0XHRcdFx0XHRtb2RlID0gZ29vZ2xlLm1hcHMuRGlyZWN0aW9uc1RyYXZlbE1vZGUuV0FMS0lORztcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0aWYgKG9yaWdpbikge1xuXHRcdFx0XHRsZXQgcmVxdWVzdCA9IHtcblx0XHRcdFx0XHRvcmlnaW46ICAgICAgICBvcmlnaW4sXG5cdFx0XHRcdFx0ZGVzdGluYXRpb246ICAgZGVzdGluYXRpb24sXG5cdFx0XHRcdFx0d2F5cG9pbnRzOiAgICAgcm91dGVTdG9wUG9pbnRzLFxuXHRcdFx0XHRcdHRyYXZlbE1vZGU6ICAgIG1vZGUsXG5cdFx0XHRcdFx0YXZvaWRIaWdod2F5czogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hpZ2h3YXlzJykuY2hlY2tlZCxcblx0XHRcdFx0XHRhdm9pZFRvbGxzOiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9sbHMnKS5jaGVja2VkXG5cdFx0XHRcdH07XG5cblx0XHRcdFx0c2VsZiA9IHRoaXM7XG5cdFx0XHRcdHRoaXMuc2V0dGluZ3MuZGlyZWN0aW9uc1NlcnZpY2Uucm91dGUocmVxdWVzdCwgZnVuY3Rpb24gKHJlc3BvbnNlLCBzdGF0dXMpIHtcblx0XHRcdFx0XHRpZiAoc3RhdHVzID09PSBnb29nbGUubWFwcy5EaXJlY3Rpb25zU3RhdHVzLk9LKSB7XG5cdFx0XHRcdFx0XHRkaXJlY3Rpb25zRGlzcGxheS5zZXREaXJlY3Rpb25zKHJlc3BvbnNlKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0YWxlcnQoXCJHb29nbGUgY291bGRuYHQgY2FsY3VsYXRlIGRpcmVjdGlvbnMgZm9yIHRoaXMgcm91dGUgYW5kIHNlbGVjdGVkIG9wdGlvbnNcIik7XG5cdFx0XHRcdFx0XHRzZWxmLnJlc2V0Um91dGUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXG5cdFx0XHRLcnJvdXRlLmNsZWFyUm91dGVNYXJrZXJzKCk7XG5cdFx0XHRkaXJlY3Rpb25zVmlzaWJsZSA9IHRydWU7XG5cdFx0fVxuXG5cdFx0aW5pdCgpIHtcblx0XHRcdGRlc3RpbmF0aW9uID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyh0aGlzLnNldHRpbmdzLmxhdCwgdGhpcy5zZXR0aW5ncy5sbmcpO1xuXG5cdFx0XHQvL0luaXRpYWxpc2UgbWFwIG9wdGlvbnNcblx0XHRcdHRoaXMubXlPcHRpb25zID0ge1xuXHRcdFx0XHRzY3JvbGx3aGVlbDogICAgICAgZmFsc2UsXG5cdFx0XHRcdHpvb206ICAgICAgICAgICAgICB0aGlzLnNldHRpbmdzLm1hcFpvb20sXG5cdFx0XHRcdG1heFpvb206ICAgICAgICAgICB0aGlzLnNldHRpbmdzLm1hcE1heFpvb20sXG5cdFx0XHRcdG1hcFR5cGVJZDogICAgICAgICB0aGlzLnNldHRpbmdzLm1hcFR5cGVJZCxcblx0XHRcdFx0c3RyZWV0Vmlld0NvbnRyb2w6IGZhbHNlLFxuXHRcdFx0XHRjZW50ZXI6ICAgICAgICAgICAgZGVzdGluYXRpb25cblx0XHRcdH07XG5cblx0XHRcdHJvdXRlTWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnNldHRpbmdzLm1hcElkKSwgdGhpcy5teU9wdGlvbnMpO1xuXHRcdFx0ZGlyZWN0aW9uc0Rpc3BsYXkgPSBuZXcgZ29vZ2xlLm1hcHMuRGlyZWN0aW9uc1JlbmRlcmVyKCk7XG5cdFx0XHRkaXJlY3Rpb25zRGlzcGxheS5zZXRNYXAocm91dGVNYXApO1xuXHRcdFx0ZGlyZWN0aW9uc0Rpc3BsYXkuc2V0UGFuZWwoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5zZXR0aW5ncy5kaXJlY3Rpb25zUGFuZWwpKTtcblxuXHRcdFx0Y29uc3QgaW1hZ2UgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VySW1hZ2UodGhpcy5zZXR0aW5ncy5pY29uKTtcblx0XHRcdHBvaW50ID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyh0aGlzLnNldHRpbmdzLmxhdCwgdGhpcy5zZXR0aW5ncy5sbmcpO1xuXG5cdFx0XHRzZWxmID0gdGhpcztcblx0XHRcdGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKHJvdXRlTWFwLCAnY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRcdFx0aWYgKHJvdXRlU3RvcFBvaW50cy5sZW5ndGggPCA5KSB7XG5cdFx0XHRcdFx0cm91dGVTdG9wUG9pbnRzLnB1c2goe2xvY2F0aW9uOiBldmVudC5sYXRMbmcsIHN0b3BvdmVyOiB0cnVlfSk7XG5cdFx0XHRcdFx0cG9pbnQgPSBldmVudC5sYXRMbmc7XG5cdFx0XHRcdFx0c2VsZi5hZGRSb3V0ZU1hcmtlcihwb2ludCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0YWxlcnQoXCJNYXhpbXVtIG51bWJlciBvZiA5IHdheXBvaW50cyByZWFjaGVkXCIpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0c2VsZiA9IHRoaXM7XG5cdFx0XHRnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lck9uY2Uocm91dGVNYXAsICdpZGxlJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRnb29nbGUubWFwcy5ldmVudC50cmlnZ2VyKHJvdXRlTWFwLCAncmVzaXplJyk7XG5cdFx0XHRcdHNlbGYuY2FsY1JvdXRlKCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRyZXNldFJvdXRlKCkge1xuXHRcdFx0S3Jyb3V0ZS5jbGVhclJvdXRlTWFya2VycygpO1xuXHRcdFx0S3Jyb3V0ZS5jbGVhcldheXBvaW50cygpO1xuXHRcdFx0ZGlyZWN0aW9uc0Rpc3BsYXkuc2V0TWFwKG51bGwpO1xuXHRcdFx0ZGlyZWN0aW9uc0Rpc3BsYXkuc2V0UGFuZWwobnVsbCk7XG5cdFx0XHRkaXJlY3Rpb25zRGlzcGxheSA9IG5ldyBnb29nbGUubWFwcy5EaXJlY3Rpb25zUmVuZGVyZXIoKTtcblx0XHRcdGRpcmVjdGlvbnNEaXNwbGF5LnNldE1hcChyb3V0ZU1hcCk7XG5cdFx0XHRkaXJlY3Rpb25zRGlzcGxheS5zZXRQYW5lbChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnNldHRpbmdzLmRpcmVjdGlvblBhbmVsKSk7XG5cblx0XHRcdHRoaXMuaW5pdCgpO1xuXHRcdH1cblx0fVxuXG5cdCQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcblx0XHQkKFwiLmtyLWRpcmVjdGlvbnMtbW9kYWxcIikub24oJ2NsaWNrJywgJyNrci1tYXAtcm91dGUnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0bGV0ICRlbGVtZW50ID0gJCh0aGlzKTtcblx0XHRcdGNvbnN0IG9wdGlvbnMgPSB7XG5cdFx0XHRcdGxhdDogICAgJGVsZW1lbnQuZGF0YSgnbGF0JyksXG5cdFx0XHRcdGxuZzogICAgJGVsZW1lbnQuZGF0YSgnbG5nJyksXG5cdFx0XHRcdG5hbWU6ICAgJGVsZW1lbnQuZGF0YSgnbmFtZScpLFxuXHRcdFx0XHRpY29uOiAgICRlbGVtZW50LmRhdGEoJ2ljb24nKSxcblx0XHRcdFx0ZGV0b3VyOiAkZWxlbWVudC5kYXRhKCdkZXRvdXInKVxuXHRcdFx0fTtcblx0XHRcdG15S3Jyb3V0ZSA9IG5ldyBLcnJvdXRlKCRlbGVtZW50LCBvcHRpb25zKTtcblx0XHR9KS5vbignY2xpY2snLCAnLnJlc2V0cm91dGUnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0bXlLcnJvdXRlLnJlc2V0Um91dGUoKTtcblx0XHR9KS5vbignY2xpY2snLCAnLmNhbGNyb3V0ZScsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRteUtycm91dGUuY2FsY1JvdXRlKCk7XG5cdFx0fSk7XG5cblx0XHRqUXVlcnkoXCJhI2dlb2NvZGVBZGRyZXNzXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdGxldCBhZGRyZXNzU3RyaW5nID1cblx0XHRcdFx0ICAgIGpRdWVyeShcIiNqZm9ybV9wcm9wZXJ0eV9zdHJlZXRcIikudmFsKClcblx0XHRcdFx0ICAgICsgXCIsIFwiXG5cdFx0XHRcdCAgICArIGpRdWVyeSgnI2pmb3JtX3Rvd25faWQnKS5maW5kKFwiOnNlbGVjdGVkXCIpLnRleHQoKVxuXHRcdFx0XHQgICAgKyBcIiBcIlxuXHRcdFx0XHQgICAgKyBqUXVlcnkoXCIjamZvcm1fcHJvcGVydHlfcG9zdGNvZGVcIikudmFsKClcblx0XHRcdFx0ICAgICsgXCIsIFwiXG5cdFx0XHRcdCAgICArIGpRdWVyeSgnI2pmb3JtX3JlZ2lvbl9pZCcpLmZpbmQoXCI6c2VsZWN0ZWRcIikudGV4dCgpXG5cdFx0XHRcdCAgICArIFwiIFwiXG5cdFx0XHRcdCAgICArIGpRdWVyeSgnI2pmb3JtX2NvdW50cnlfaWQnKS5maW5kKFwiOnNlbGVjdGVkXCIpLnRleHQoKTtcblxuXHRcdFx0bGV0IHVybCA9ICdpbmRleC5waHA/b3B0aW9uPWNvbV9rbm93cmVzJnRhc2s9cHJvcGVydHkuZ2VvY29kZSc7XG5cdFx0XHRsZXQgY29vcmQgPSBbXTtcblxuXHRcdFx0alF1ZXJ5LmFqYXgoe1xuXHRcdFx0XHR0eXBlOiAgICAgXCJQT1NUXCIsXG5cdFx0XHRcdHVybDogICAgICB1cmwsXG5cdFx0XHRcdGRhdGE6ICAgICB7YWRkcmVzczogYWRkcmVzc1N0cmluZ30sXG5cdFx0XHRcdGRhdGFUeXBlOiBcImpzb25cIixcblx0XHRcdFx0c3VjY2VzczogIGZ1bmN0aW9uIChqc29uZGF0YSkge1xuXHRcdFx0XHRcdGpRdWVyeS5lYWNoKGpzb25kYXRhLCBmdW5jdGlvbiAoa2V5LCB2YWwpIHtcblx0XHRcdFx0XHRcdGxldCBkaXYgPSBcIiNcIiArIGtleTtcblx0XHRcdFx0XHRcdGpRdWVyeShkaXYpLnZhbCh2YWwpO1xuXHRcdFx0XHRcdFx0Y29vcmRba2V5XSA9IHZhbDtcblx0XHRcdFx0XHRcdG15R21hcC5yZWZyZXNoTWFwKGNvb3JkWydsYXQnXSwgY29vcmRbJ2xuZyddLCBmYWxzZSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9KTtcbn0oalF1ZXJ5KSk7IiwiLy8gS1IgQVBQIEpTIEZpbGVzXG5pbXBvcnQgJ25wbS9qcXVlcnktYmFyLXJhdGluZy9qcXVlcnkuYmFycmF0aW5nJztcbmltcG9ydCAnbnBtL2lzLW1hcmtlci1jbHVzdGVyZXInO1xuaW1wb3J0ICdtZWRpYWpzL3NpdGUvYXBwJztcbmltcG9ydCAnbWVkaWFqcy9zaXRlL2NvbmZpcm0nO1xuaW1wb3J0ICdtZWRpYWpzL3NpdGUvZG9iZW50cnknO1xuaW1wb3J0ICdtZWRpYWpzL3NpdGUvZ3Vlc3RkYXRhJztcbmltcG9ydCAnbWVkaWFqcy9zaXRlL21hZ2VsbGFuJztcbmltcG9ydCAnbWVkaWFqcy9zaXRlL21hcCc7XG5pbXBvcnQgJ21lZGlhanMvc2l0ZS9yb3V0ZSc7Il0sIm5hbWVzIjpbIk1hcmtlckNsdXN0ZXJlciIsIm1hcCIsIm9wdF9tYXJrZXJzIiwib3B0X29wdGlvbnMiLCJleHRlbmQiLCJnb29nbGUiLCJtYXBzIiwiT3ZlcmxheVZpZXciLCJtYXBfIiwibWFya2Vyc18iLCJjbHVzdGVyc18iLCJzaXplcyIsInN0eWxlc18iLCJyZWFkeV8iLCJvcHRpb25zIiwiZ3JpZFNpemVfIiwibWluQ2x1c3RlclNpemVfIiwibWF4Wm9vbV8iLCJpbWFnZVBhdGhfIiwiTUFSS0VSX0NMVVNURVJfSU1BR0VfUEFUSF8iLCJpbWFnZUV4dGVuc2lvbl8iLCJNQVJLRVJfQ0xVU1RFUl9JTUFHRV9FWFRFTlNJT05fIiwiem9vbU9uQ2xpY2tfIiwidW5kZWZpbmVkIiwiYXZlcmFnZUNlbnRlcl8iLCJzZXR1cFN0eWxlc18iLCJzZXRNYXAiLCJwcmV2Wm9vbV8iLCJnZXRab29tIiwidGhhdCIsImV2ZW50IiwiYWRkTGlzdGVuZXIiLCJ6b29tIiwicmVzZXRWaWV3cG9ydCIsInJlZHJhdyIsImxlbmd0aCIsImFkZE1hcmtlcnMiLCJwcm90b3R5cGUiLCJvYmoxIiwib2JqMiIsIm9iamVjdCIsInByb3BlcnR5IiwiYXBwbHkiLCJvbkFkZCIsInNldFJlYWR5XyIsImRyYXciLCJpIiwic2l6ZSIsInB1c2giLCJ1cmwiLCJoZWlnaHQiLCJ3aWR0aCIsImZpdE1hcFRvTWFya2VycyIsIm1hcmtlcnMiLCJnZXRNYXJrZXJzIiwiYm91bmRzIiwiTGF0TG5nQm91bmRzIiwibWFya2VyIiwiZ2V0UG9zaXRpb24iLCJmaXRCb3VuZHMiLCJzZXRTdHlsZXMiLCJzdHlsZXMiLCJnZXRTdHlsZXMiLCJpc1pvb21PbkNsaWNrIiwiaXNBdmVyYWdlQ2VudGVyIiwiZ2V0VG90YWxNYXJrZXJzIiwic2V0TWF4Wm9vbSIsIm1heFpvb20iLCJnZXRNYXhab29tIiwiY2FsY3VsYXRvcl8iLCJudW1TdHlsZXMiLCJpbmRleCIsImNvdW50IiwiZHYiLCJwYXJzZUludCIsIk1hdGgiLCJtaW4iLCJ0ZXh0Iiwic2V0Q2FsY3VsYXRvciIsImNhbGN1bGF0b3IiLCJnZXRDYWxjdWxhdG9yIiwib3B0X25vZHJhdyIsInB1c2hNYXJrZXJUb18iLCJpc0FkZGVkIiwicmVwYWludCIsImFkZE1hcmtlciIsInJlbW92ZU1hcmtlcl8iLCJpbmRleE9mIiwibSIsInNwbGljZSIsInJlbW92ZU1hcmtlciIsInJlbW92ZWQiLCJyZW1vdmVNYXJrZXJzIiwiciIsInJlYWR5IiwiY3JlYXRlQ2x1c3RlcnNfIiwiZ2V0VG90YWxDbHVzdGVycyIsImdldE1hcCIsImdldEdyaWRTaXplIiwic2V0R3JpZFNpemUiLCJnZXRNaW5DbHVzdGVyU2l6ZSIsInNldE1pbkNsdXN0ZXJTaXplIiwiZ2V0RXh0ZW5kZWRCb3VuZHMiLCJwcm9qZWN0aW9uIiwiZ2V0UHJvamVjdGlvbiIsInRyIiwiTGF0TG5nIiwiZ2V0Tm9ydGhFYXN0IiwibGF0IiwibG5nIiwiYmwiLCJnZXRTb3V0aFdlc3QiLCJ0clBpeCIsImZyb21MYXRMbmdUb0RpdlBpeGVsIiwieCIsInkiLCJibFBpeCIsIm5lIiwiZnJvbURpdlBpeGVsVG9MYXRMbmciLCJzdyIsImlzTWFya2VySW5Cb3VuZHNfIiwiY29udGFpbnMiLCJjbGVhck1hcmtlcnMiLCJvcHRfaGlkZSIsImNsdXN0ZXIiLCJyZW1vdmUiLCJvbGRDbHVzdGVycyIsInNsaWNlIiwid2luZG93Iiwic2V0VGltZW91dCIsImRpc3RhbmNlQmV0d2VlblBvaW50c18iLCJwMSIsInAyIiwiUiIsImRMYXQiLCJQSSIsImRMb24iLCJhIiwic2luIiwiY29zIiwiYyIsImF0YW4yIiwic3FydCIsImQiLCJhZGRUb0Nsb3Nlc3RDbHVzdGVyXyIsImRpc3RhbmNlIiwiY2x1c3RlclRvQWRkVG8iLCJwb3MiLCJjZW50ZXIiLCJnZXRDZW50ZXIiLCJpc01hcmtlckluQ2x1c3RlckJvdW5kcyIsIkNsdXN0ZXIiLCJtYXBCb3VuZHMiLCJnZXRCb3VuZHMiLCJtYXJrZXJDbHVzdGVyZXIiLCJtYXJrZXJDbHVzdGVyZXJfIiwiY2VudGVyXyIsImJvdW5kc18iLCJjbHVzdGVySWNvbl8iLCJDbHVzdGVySWNvbiIsImlzTWFya2VyQWxyZWFkeUFkZGVkIiwiY2FsY3VsYXRlQm91bmRzXyIsImwiLCJsZW4iLCJ1cGRhdGVJY29uIiwiZ2V0TWFya2VyQ2x1c3RlcmVyIiwiZ2V0U2l6ZSIsIm16IiwiaGlkZSIsInN1bXMiLCJzZXRDZW50ZXIiLCJzZXRTdW1zIiwic2hvdyIsIm9wdF9wYWRkaW5nIiwicGFkZGluZ18iLCJjbHVzdGVyXyIsImRpdl8iLCJzdW1zXyIsInZpc2libGVfIiwidHJpZ2dlckNsdXN0ZXJDbGljayIsInRyaWdnZXIiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJnZXRQb3NGcm9tTGF0TG5nXyIsInN0eWxlIiwiY3NzVGV4dCIsImNyZWF0ZUNzcyIsImlubmVySFRNTCIsInBhbmVzIiwiZ2V0UGFuZXMiLCJvdmVybGF5TW91c2VUYXJnZXQiLCJhcHBlbmRDaGlsZCIsImFkZERvbUxpc3RlbmVyIiwibGF0bG5nIiwid2lkdGhfIiwiaGVpZ2h0XyIsInRvcCIsImxlZnQiLCJkaXNwbGF5Iiwib25SZW1vdmUiLCJwYXJlbnROb2RlIiwicmVtb3ZlQ2hpbGQiLCJ0ZXh0XyIsImluZGV4XyIsInVzZVN0eWxlIiwibWF4IiwidXJsXyIsInRleHRDb2xvcl8iLCJhbmNob3JfIiwidGV4dFNpemVfIiwiZm9udEZhbWlseV8iLCJmb250V2VpZ2h0XyIsImJhY2tncm91bmRQb3NpdGlvbl8iLCJiYWNrZ3JvdW5kUG9zaXRpb24iLCJfdHlwZW9mIiwidHh0Q29sb3IiLCJ0eHRTaXplIiwiZm9udEZhbWlseSIsImZvbnRXZWlnaHQiLCJqb2luIiwiZ2xvYmFsIiwibW9kdWxlIiwiZXhwb3J0cyIsImZhY3RvcnkiLCJkZWZpbmUiLCJhbWQiLCJyZXF1aXJlIiwialF1ZXJ5IiwiJCIsIkJhclJhdGluZyIsInNlbGYiLCJ3cmFwRWxlbWVudCIsImNsYXNzZXMiLCJ0aGVtZSIsIiRlbGVtIiwid3JhcCIsInVud3JhcEVsZW1lbnQiLCJ1bndyYXAiLCJmaW5kT3B0aW9uIiwidmFsdWUiLCJpc051bWVyaWMiLCJmbG9vciIsImdldEluaXRpYWxPcHRpb24iLCJpbml0aWFsUmF0aW5nIiwiZ2V0RW1wdHlPcHRpb24iLCIkZW1wdHlPcHQiLCJmaW5kIiwiZW1wdHlWYWx1ZSIsImFsbG93RW1wdHkiLCJwcmVwZW5kVG8iLCJnZXREYXRhIiwia2V5IiwiZGF0YSIsInNldERhdGEiLCJzYXZlRGF0YU9uRWxlbWVudCIsIiRvcHQiLCJ2YWwiLCJlbXB0eVRleHQiLCJ1c2VyT3B0aW9ucyIsInJhdGluZ1ZhbHVlIiwicmF0aW5nVGV4dCIsIm9yaWdpbmFsUmF0aW5nVmFsdWUiLCJvcmlnaW5hbFJhdGluZ1RleHQiLCJlbXB0eVJhdGluZ1ZhbHVlIiwiZW1wdHlSYXRpbmdUZXh0IiwicmVhZE9ubHkiLCJyZWFkb25seSIsInJhdGluZ01hZGUiLCJyZW1vdmVEYXRhT25FbGVtZW50IiwicmVtb3ZlRGF0YSIsImJ1aWxkV2lkZ2V0IiwiJHciLCJlYWNoIiwiaHRtbCIsIiRhIiwic2hvd1ZhbHVlcyIsImFwcGVuZCIsInNob3dTZWxlY3RlZFJhdGluZyIsInJldmVyc2UiLCJhZGRDbGFzcyIsIm5leHRBbGxvclByZXZpb3VzQWxsIiwic2V0U2VsZWN0RmllbGRWYWx1ZSIsInByb3AiLCJjaGFuZ2UiLCJyZXNldFNlbGVjdEZpZWxkIiwiZGVmYXVsdFNlbGVjdGVkIiwicGFyZW50IiwiZnJhY3Rpb24iLCJyb3VuZCIsInJlc2V0U3R5bGUiLCIkd2lkZ2V0IiwicmVtb3ZlQ2xhc3MiLCJtYXRjaCIsImFwcGx5U3R5bGUiLCJiYXNlVmFsdWUiLCJmIiwiJGFsbCIsIiRmcmFjdGlvbmFsIiwiaXNEZXNlbGVjdGFibGUiLCIkZWxlbWVudCIsImRlc2VsZWN0YWJsZSIsImF0dHIiLCJhdHRhY2hDbGlja0hhbmRsZXIiLCIkZWxlbWVudHMiLCJvbiIsInByZXZlbnREZWZhdWx0Iiwib25TZWxlY3QiLCJjYWxsIiwiYXR0YWNoTW91c2VFbnRlckhhbmRsZXIiLCJhdHRhY2hNb3VzZUxlYXZlSGFuZGxlciIsImZhc3RDbGlja3MiLCJzdG9wUHJvcGFnYXRpb24iLCJjbGljayIsImRpc2FibGVDbGlja3MiLCJhdHRhY2hIYW5kbGVycyIsImhvdmVyU3RhdGUiLCJkZXRhY2hIYW5kbGVycyIsIm9mZiIsInNldHVwSGFuZGxlcnMiLCJpbnNlcnRBZnRlciIsInN0YXRlIiwidG9nZ2xlQ2xhc3MiLCJzZXQiLCJzaWxlbnQiLCJjbGVhciIsIm9uQ2xlYXIiLCJkZXN0cm95Iiwib25EZXN0cm95IiwiaW5pdCIsImVsZW0iLCJmbiIsImJhcnJhdGluZyIsImRlZmF1bHRzIiwibWV0aG9kIiwicGx1Z2luIiwiaXMiLCJlcnJvciIsImhhc093blByb3BlcnR5IiwibmV4dCIsInNlYXJjaERhdGEiLCJzZWFyY2hEb25lIiwiY2FsZW5kYXJMb2FkZWQiLCJzYXZlZHdpZHRoIiwibGFyZ2UiLCJyZXNpemVkIiwic2Nsb2FkZWQiLCJGb3VuZGF0aW9uIiwiYWRkVG9KcXVlcnkiLCJmb3VuZGF0aW9uIiwiY2hlY2tTY3JlZW5XaWR0aCIsImJhcnMiLCIkY3RyaWdnZXIiLCJsb2FkQ2FsZW5kYXIiLCJzdGlja3kiLCJlIiwiJGZvcm0iLCJhamF4IiwidHlwZSIsInNlcmlhbGl6ZSIsImRhdGFUeXBlIiwic3VjY2VzcyIsInJlc3VsdCIsImZvcm1SZXNwb25zZSIsImxvY2F0aW9uIiwiaHJlZiIsIm1lc3NhZ2UiLCIkbW9kYWwiLCJSZXZlYWwiLCJvcGVuIiwiY3NzIiwibW9kYWxpZCIsInRyaW0iLCJhamF4dXJsIiwiY29udGVudCIsImdldFNjcmlwdCIsImluaXRpYWxpemVTdHJpcGUiLCJwaWQiLCJiYXIiLCJnZXRQcm9wZXJ0aWVzIiwiY2hpbGRyZW4iLCJ0b2dnbGUiLCJzZXRBY3RpdmVNZW51IiwidGFyZ2V0IiwiJHByb3BzIiwiJHRhYnMiLCJzcGVjaWFsIiwidG91Y2hzdGFydCIsInNldHVwIiwiXyIsIm5zIiwiaGFuZGxlIiwiaW5jbHVkZXMiLCJhZGRFdmVudExpc3RlbmVyIiwicGFzc2l2ZSIsInRvdWNobW92ZSIsImlkIiwicmVwbGFjZSIsInJlZGlyZWN0IiwiYWN0aW9uIiwiYWN0aW9uX3ZhbHVlIiwicmVsb2FkIiwidmFscyIsInNldFNlYXJjaERhdGEiLCJyZXNwb25zZSIsIiRzaWRlYmFyIiwiZW1wdHkiLCJmYWRlSW4iLCJzY3JvbGxUbyIsInNlYXJjaGJhciIsInNjcmVlbldpZHRoSGFzQ2hhbmdlZCIsIk1lZGlhUXVlcnkiLCJhdExlYXN0Iiwib3JpZ2luIiwicHJvdG9jb2wiLCJob3N0IiwibXlDb25maXJtIiwiJG15VGFzayIsIktyY29uZmlybSIsImNvbnN0cnVjdG9yIiwiZm9ybSIsInVwZGF0ZVF1b3RlIiwic2VyaWFsaXplQXJyYXkiLCJkaXYiLCJjaGVja1Rlcm1zIiwidGVzdCIsImdldEVsZW1lbnRCeUlkIiwidGVzdGMiLCJ0ZXN0dCIsImFncmVlY2hlY2siLCJjaGVja2VkIiwiYWdyZWVjaGVja2MiLCJhZ3JlZWNoZWNrdCIsIm15S3JEb2JFbnRyeSIsInRvZGF5IiwiQkFDS1NQQUNFIiwic2V0dGluZ3MiLCJjdXN0b21fdmFsaWRhdGlvbiIsImRheXNfaW5fbW9udGgiLCJkb2N1bWVudF9kYXRlIiwiZXJyb3Jib3hfeCIsImVycm9yYm94X3kiLCJmaWVsZF9oaW50X3RleHRfZGF5IiwiZmllbGRfaGludF90ZXh0X21vbnRoIiwiZmllbGRfaGludF90ZXh0X3llYXIiLCJmaWVsZF9vcmRlciIsImZpZWxkX3dpZHRoX2RheSIsImZpZWxkX3dpZHRoX21vbnRoIiwiZmllbGRfd2lkdGhfeWVhciIsImZpZWxkX3dpZHRoX3NlcCIsIm1pbm1heCIsIm1pbl9kYXRlIiwibWF4X2RhdGUiLCJtaW5feWVhciIsIm1vbnRoX25hbWUiLCJvbl9ibHVyIiwib25fZXJyb3IiLCJvbl9jaGFuZ2UiLCJwYXJzZV9kYXRlIiwic2VwYXJhdG9yIiwic2hvd19lcnJvcnMiLCJzaG93X2hpbnRzIiwiRV9EQVlfTkFOIiwiRV9EQVlfVE9PX0JJRyIsIkVfREFZX1RPT19TTUFMTCIsIkVfQkFEX0RBWV9GT1JfTU9OVEgiLCJFX01PTlRIX05BTiIsIkVfTU9OVEhfVE9PX0JJRyIsIkVfTU9OVEhfVE9PX1NNQUxMIiwiRV9ZRUFSX05BTiIsIkVfWUVBUl9MRU5HVEgiLCJFX1lFQVJfVE9PX1NNQUxMIiwiRV9NSU5fREFURSIsIkVfTUFYX0RBVEUiLCJLckRvYkVudHJ5IiwiZ2V0WW1kIiwiRGF0ZSIsImlucHV0X2RheSIsImlucHV0X21vbnRoIiwiaW5wdXRfeWVhciIsImRhdGUiLCJnZXRNb250aCIsImdldERheSIsImdldEZ1bGxZZWFyIiwiZ2V0WW1kT2JqZWN0IiwieWVhciIsIm1vbnRoIiwiZGF5IiwiYWRkRW50cnlGaWVsZHMiLCJkb2JmaWVsZCIsImZpZWxkcyIsInNwbGl0IiwiZmllbGQiLCJidWlsZEZpZWxkIiwiYWZ0ZXJQYXN0ZSIsInBhcnNlRGF0ZSIsInNldERhdGUiLCJuYW1lIiwia3Jkb2JlbnRyeSIsImlucHV0IiwiS3JEb2JJbnB1dCIsImhpbnRfdGV4dCIsImlubmVyIiwiJGlucHV0IiwiYnVpbGRVaSIsIndyYXBwZXIiLCJlcnJvcmJveCIsInNldEZpZWxkV2lkdGhzIiwiY2hlY2tEb2N1bWVudCIsImRvYiIsImNoaWxkZG9iIiwiY2xhc3NuYW1lIiwiZWxlbWVudHMiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiY2xlYXJFcnJvciIsImVycm9yX3RleHQiLCJzaG93RXJyb3IiLCJmb2N1cyIsInNldEZvY3VzIiwiZm9jdXNGaWVsZEJlZm9yZSIsInlpZWxkRm9jdXMiLCJmb2N1c0ZpZWxkQWZ0ZXIiLCJmb2N1c0luIiwiZm9jdXNPdXQiLCJ3aWRnZXRGb2N1c0xvc3QiLCJnZXREYXRlIiwiZGF5X3ZhbHVlIiwibW9udGhfdmFsdWUiLCJ5ZWFyX3ZhbHVlIiwicHJveHlMYWJlbENsaWNrcyIsInBhcnNlSXNvRGF0ZSIsIlJlZ0V4cCIsIiQzIiwiJDIiLCIkMSIsIm5ld19kYXRlIiwidmFsaWRhdGUiLCJzZXRFcnJvciIsImF2YWlsYWJsZSIsInRvdGFsIiwic2V0V2lkdGgiLCJzZXRSZWFkb25seSIsIm1vZGUiLCJ3aWRnZXRFcnJvclRleHQiLCJ4X29mZnNldCIsIm91dGVyV2lkdGgiLCJ5X29mZnNldCIsInBvc2l0aW9uIiwiY3VycmVudF9pbnB1dCIsInZhbGlkYXRlRGF5IiwidmFsaWRhdGVNb250aCIsInZhbGlkYXRlWWVhciIsInZhbGlkYXRlRGF5c0luTW9udGgiLCJ2YWxpZGF0ZUNvbXBsZXRlRGF0ZSIsImRhdGVfc3RyIiwiZGF0ZV9vYmoiLCJkYXRlX2lzbyIsIm9wdCIsImdldCIsImhhc19mb2N1cyIsIm51bSIsIm1zZyIsInRvU3RyaW5nIiwib25CbHVyIiwicHJveHkiLCJibHVyIiwia2V5ZG93biIsImtleXVwIiwic2hvd19oaW50Iiwia2V5X2lzX2Rvd24iLCJoYXNDbGFzcyIsImlzRGlnaXRLZXkiLCJrZXljb2RlIiwid2hpY2giLCJ3YW50IiwibmV3X3ZhbHVlIiwic2VsZWN0X2FsbCIsInNlbGVjdCIsIm5ld193aWR0aCIsImhvd3RvYXJyaXZlIiwiYXJyaXZhbG1lYW5zIiwiZ2V0QXR0cmlidXRlIiwiZGlzcGxheUFycml2YWwiLCJjbGFzc0xpc3QiLCJhcnJpdmFsZGF0YSIsImFkZCIsIm92Q2hpbGRyZW4iLCJvdlN0YXRlIiwib3ZQcyIsIiRvdkJ0biIsImZjQ2hpbGRyZW4iLCJmY1N0YXRlIiwiJGZjQnRuIiwidHRDaGlsZHJlbiIsInR0U3RhdGUiLCJ0dFBzIiwiJHR0QnRuIiwidHRwYXJhcyIsImN1cnJlbnRQYXJhZ3JhcGgiLCJockVsZW1lbnQiLCJhZnRlciIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJkb0hScyIsInBhcmFncmFwaHMiLCJuZXh0RWxlbWVudFNpYmxpbmciLCJ0YWdOYW1lIiwibGFuZyIsIm1hcmtlcnNoYXBlIiwiY29vcmRzIiwibXlLcm1hcCIsIm1hcERhdGEiLCJpbmZvV2luZG93IiwiaW5mb1dpbmRvdzIiLCJwcm9wZXJ0eWRpdiIsInByb3BlcnR5aWNvbiIsIm1jIiwicHJvcGVydHlNYXJrZXJzIiwiZmlsdGVySWRzIiwibWFwTWFya2VycyIsIm1hcFR5cGVJZCIsIm1hcFpvb20iLCJtYXBNYXhab29tIiwibWFwVHlwZSIsIm1hcElkIiwibWFya2VyQ29sb3IiLCJLcm1hcCIsImdtT3B0aW9ucyIsInNjcm9sbHdoZWVsIiwic3RyZWV0Vmlld0NvbnRyb2wiLCJnbWFya2VycyIsImluaXRNYXAiLCJjbG9zZUtySW5mb3dpbmRvdyIsImNsb3NlIiwic2hvd1Zpc2libGVNYXJrZXJzIiwic2V0VmlzaWJsZSIsImNoZWNrRHVwbGljYXRlIiwiY3VycmVudCIsImR1cHMiLCJlcXVhbHMiLCJuZXdMYXQiLCJuZXdMbmciLCJjaGVja1pvb20iLCJteWxpc3RlbmVyIiwic2V0Wm9vbSIsImNsdXN0ZXJNYXAiLCJtY09wdGlvbnMiLCJncmlkU2l6ZSIsImlnbm9yZUhpZGRlbk1hcmtlcnMiLCJpbWFnZVBhdGgiLCJtYXhEZWZhdWx0Wm9vbSIsImFkZExpc3RlbmVyT25jZSIsInNldFByb3BlcnR5TWFya2VycyIsInNldE1hcE1hcmtlcnMiLCJjcmVhdGVNYXAiLCJNYXAiLCJJbmZvV2luZG93IiwiY3JlYXRlTWFwTWFya2VyIiwicG9pbnQiLCJpbWFnZSIsImJveGluZm8iLCJsaW5rIiwidGl0bGUiLCJNYXJrZXIiLCJzaGFwZSIsImljb24iLCJ6SW5kZXgiLCJzZXRDb250ZW50IiwiY3JlYXRlUHJvcGVydHlNYXJrZXIiLCJjb2xvciIsIm5vdCIsInNsaWNrIiwibmV4dEFycm93IiwicHJldkFycm93IiwiYXV0b3BsYXkiLCJzb2xvTWFwIiwicmVmcmVzaE1hcCIsIiRtYXBtb2RhbCIsImFsZXJ0IiwicmVzZXRNYXAiLCJhbWFyayIsIm1hcmtlcmljb24iLCJTaXplIiwiUG9pbnQiLCJhbmNob3IiLCJteUxpc3RlbmVyIiwiZm91bmQiLCJjdXJyZW50Wm9vbSIsImtpY2tNYXAiLCJtYXBfbW9kYWwiLCIkc29sb1RyaWdnZXIiLCJvbmUiLCIkbXRyaWdnZXIiLCJteUtycm91dGUiLCJkaXJlY3Rpb25zRGlzcGxheSIsImRpcmVjdGlvbnNWaXNpYmxlIiwicm91dGVNYXAiLCJkZXN0aW5hdGlvbiIsInJvdXRlTWFya2VycyIsInJvdXRlU3RvcFBvaW50cyIsImRldG91ciIsImRpcmVjdGlvbnNQYW5lbCIsImRpcmVjdGlvbnNTZXJ2aWNlIiwiS3Jyb3V0ZSIsIkRpcmVjdGlvbnNTZXJ2aWNlIiwiY2xlYXJSb3V0ZU1hcmtlcnMiLCJjbGVhcldheXBvaW50cyIsImFkZFJvdXRlTWFya2VyIiwiY2FsY1JvdXRlIiwiZnJvbV9hZGRyZXNzIiwiRGlyZWN0aW9uc1RyYXZlbE1vZGUiLCJCSUNZQ0xJTkciLCJEUklWSU5HIiwiV0FMS0lORyIsInJlcXVlc3QiLCJ3YXlwb2ludHMiLCJ0cmF2ZWxNb2RlIiwiYXZvaWRIaWdod2F5cyIsImF2b2lkVG9sbHMiLCJyb3V0ZSIsInN0YXR1cyIsIkRpcmVjdGlvbnNTdGF0dXMiLCJPSyIsInNldERpcmVjdGlvbnMiLCJyZXNldFJvdXRlIiwibXlPcHRpb25zIiwiRGlyZWN0aW9uc1JlbmRlcmVyIiwic2V0UGFuZWwiLCJNYXJrZXJJbWFnZSIsImxhdExuZyIsInN0b3BvdmVyIiwiZGlyZWN0aW9uUGFuZWwiLCJhZGRyZXNzU3RyaW5nIiwiY29vcmQiLCJhZGRyZXNzIiwianNvbmRhdGEiLCJteUdtYXAiXSwic291cmNlUm9vdCI6IiJ9