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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDZ0Q7QUFDZjtBQUNQO0FBQ0k7QUFDQztBQUNDO0FBQ0Q7QUFDTCIsInNvdXJjZXMiOlsid2VicGFjazovL2tyLy4vbm9kZV9tb2R1bGVzL2lzLW1hcmtlci1jbHVzdGVyZXIvc3JjL21hcmtlcmNsdXN0ZXJlci5qcyIsIndlYnBhY2s6Ly9rci8uL25vZGVfbW9kdWxlcy9qcXVlcnktYmFyLXJhdGluZy9qcXVlcnkuYmFycmF0aW5nLmpzIiwid2VicGFjazovL2tyLy4vc3JjL21lZGlhL2NvbV9rbm93cmVzL2pzL3NyYy9zaXRlL2FwcC5qcyIsIndlYnBhY2s6Ly9rci8uL3NyYy9tZWRpYS9jb21fa25vd3Jlcy9qcy9zcmMvc2l0ZS9jb25maXJtLmpzIiwid2VicGFjazovL2tyLy4vc3JjL21lZGlhL2NvbV9rbm93cmVzL2pzL3NyYy9zaXRlL2RvYmVudHJ5LmpzIiwid2VicGFjazovL2tyLy4vc3JjL21lZGlhL2NvbV9rbm93cmVzL2pzL3NyYy9zaXRlL2d1ZXN0ZGF0YS5qcyIsIndlYnBhY2s6Ly9rci8uL3NyYy9tZWRpYS9jb21fa25vd3Jlcy9qcy9zcmMvc2l0ZS9tYWdlbGxhbi5qcyIsIndlYnBhY2s6Ly9rci8uL3NyYy9tZWRpYS9jb21fa25vd3Jlcy9qcy9zcmMvc2l0ZS9tYXAuanMiLCJ3ZWJwYWNrOi8va3IvLi9zcmMvbWVkaWEvY29tX2tub3dyZXMvanMvc3JjL3NpdGUvcm91dGUuanMiLCJ3ZWJwYWNrOi8va3IvLi93ZWJwYWNrLmJ1aWxkLnNpdGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBOcG0gdmVyc2lvbiBvZiBtYXJrZXJDbHVzdGVyZXIgd29ya3MgZ3JlYXQgd2l0aCBicm93c2VyaWZ5XG4gKiBEaWZmZXJlbmNlIGZyb20gdGhlIG9yaWdpbmFsIC0gYWRkcyBhIGNvbW1vbmpzIGZvcm1hdCBhbmQgcmVwbGFjZXMgd2luZG93IHdpdGggZ2xvYmFsIGFuZCBzb21lIHVuaXQgdGVzdFxuICogVGhlIG9yaWdpbmFsIGZ1bmN0aW9uYWxpdHkgaXQncyBub3QgbW9kaWZpZWQgZm9yIGRvY3MgYW5kIG9yaWdpbmFsIHNvdXJjZSBjaGVja1xuICogaHR0cHM6Ly9naXRodWIuY29tL2dvb2dsZW1hcHMvanMtbWFya2VyLWNsdXN0ZXJlclxuICovXG5cbi8qKlxuICogQG5hbWUgTWFya2VyQ2x1c3RlcmVyIGZvciBHb29nbGUgTWFwcyB2M1xuICogQHZlcnNpb24gdmVyc2lvbiAxLjBcbiAqIEBhdXRob3IgTHVrZSBNYWhlXG4gKiBAZmlsZW92ZXJ2aWV3XG4gKiBUaGUgbGlicmFyeSBjcmVhdGVzIGFuZCBtYW5hZ2VzIHBlci16b29tLWxldmVsIGNsdXN0ZXJzIGZvciBsYXJnZSBhbW91bnRzIG9mXG4gKiBtYXJrZXJzLlxuICogPGJyLz5cbiAqIFRoaXMgaXMgYSB2MyBpbXBsZW1lbnRhdGlvbiBvZiB0aGVcbiAqIDxhIGhyZWY9XCJodHRwOi8vZ21hcHMtdXRpbGl0eS1saWJyYXJ5LWRldi5nb29nbGVjb2RlLmNvbS9zdm4vdGFncy9tYXJrZXJjbHVzdGVyZXIvXCJcbiAqID52MiBNYXJrZXJDbHVzdGVyZXI8L2E+LlxuICovXG5cbi8qKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cblxuLyoqXG4gKiBBIE1hcmtlciBDbHVzdGVyZXIgdGhhdCBjbHVzdGVycyBtYXJrZXJzLlxuICpcbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTWFwfSBtYXAgVGhlIEdvb2dsZSBtYXAgdG8gYXR0YWNoIHRvLlxuICogQHBhcmFtIHtBcnJheS48Z29vZ2xlLm1hcHMuTWFya2VyPj19IG9wdF9tYXJrZXJzIE9wdGlvbmFsIG1hcmtlcnMgdG8gYWRkIHRvXG4gKiAgIHRoZSBjbHVzdGVyLlxuICogQHBhcmFtIHtPYmplY3Q9fSBvcHRfb3B0aW9ucyBzdXBwb3J0IHRoZSBmb2xsb3dpbmcgb3B0aW9uczpcbiAqICAgICAnZ3JpZFNpemUnOiAobnVtYmVyKSBUaGUgZ3JpZCBzaXplIG9mIGEgY2x1c3RlciBpbiBwaXhlbHMuXG4gKiAgICAgJ21heFpvb20nOiAobnVtYmVyKSBUaGUgbWF4aW11bSB6b29tIGxldmVsIHRoYXQgYSBtYXJrZXIgY2FuIGJlIHBhcnQgb2YgYVxuICogICAgICAgICAgICAgICAgY2x1c3Rlci5cbiAqICAgICAnem9vbU9uQ2xpY2snOiAoYm9vbGVhbikgV2hldGhlciB0aGUgZGVmYXVsdCBiZWhhdmlvdXIgb2YgY2xpY2tpbmcgb24gYVxuICogICAgICAgICAgICAgICAgICAgIGNsdXN0ZXIgaXMgdG8gem9vbSBpbnRvIGl0LlxuICogICAgICdhdmVyYWdlQ2VudGVyJzogKGJvb2xlYW4pIFdldGhlciB0aGUgY2VudGVyIG9mIGVhY2ggY2x1c3RlciBzaG91bGQgYmVcbiAqICAgICAgICAgICAgICAgICAgICAgIHRoZSBhdmVyYWdlIG9mIGFsbCBtYXJrZXJzIGluIHRoZSBjbHVzdGVyLlxuICogICAgICdtaW5pbXVtQ2x1c3RlclNpemUnOiAobnVtYmVyKSBUaGUgbWluaW11bSBudW1iZXIgb2YgbWFya2VycyB0byBiZSBpbiBhXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsdXN0ZXIgYmVmb3JlIHRoZSBtYXJrZXJzIGFyZSBoaWRkZW4gYW5kIGEgY291bnRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgaXMgc2hvd24uXG4gKiAgICAgJ3N0eWxlcyc6IChvYmplY3QpIEFuIG9iamVjdCB0aGF0IGhhcyBzdHlsZSBwcm9wZXJ0aWVzOlxuICogICAgICAgJ3VybCc6IChzdHJpbmcpIFRoZSBpbWFnZSB1cmwuXG4gKiAgICAgICAnaGVpZ2h0JzogKG51bWJlcikgVGhlIGltYWdlIGhlaWdodC5cbiAqICAgICAgICd3aWR0aCc6IChudW1iZXIpIFRoZSBpbWFnZSB3aWR0aC5cbiAqICAgICAgICdhbmNob3InOiAoQXJyYXkpIFRoZSBhbmNob3IgcG9zaXRpb24gb2YgdGhlIGxhYmVsIHRleHQuXG4gKiAgICAgICAndGV4dENvbG9yJzogKHN0cmluZykgVGhlIHRleHQgY29sb3IuXG4gKiAgICAgICAndGV4dFNpemUnOiAobnVtYmVyKSBUaGUgdGV4dCBzaXplLlxuICogICAgICAgJ2ZvbnRGYW1pbHknOiAoc3RyaW5nKSBUaGUgZm9udCBmYW1pbHkuXG4gKiAgICAgICAnZm9udFdlaWdodCc6IChzdHJpbmcpIFRoZSBmb250IHdlaWdodC5cbiAqICAgICAgICdiYWNrZ3JvdW5kUG9zaXRpb24nOiAoc3RyaW5nKSBUaGUgcG9zaXRpb24gb2YgdGhlIGJhY2tnb3VuZCB4LCB5LlxuICogQGNvbnN0cnVjdG9yXG4gKiBAZXh0ZW5kcyBnb29nbGUubWFwcy5PdmVybGF5Vmlld1xuICovXG5mdW5jdGlvbiBNYXJrZXJDbHVzdGVyZXIobWFwLCBvcHRfbWFya2Vycywgb3B0X29wdGlvbnMpIHtcbiAgLy8gTWFya2VyQ2x1c3RlcmVyIGltcGxlbWVudHMgZ29vZ2xlLm1hcHMuT3ZlcmxheVZpZXcgaW50ZXJmYWNlLiBXZSB1c2UgdGhlXG4gIC8vIGV4dGVuZCBmdW5jdGlvbiB0byBleHRlbmQgTWFya2VyQ2x1c3RlcmVyIHdpdGggZ29vZ2xlLm1hcHMuT3ZlcmxheVZpZXdcbiAgLy8gYmVjYXVzZSBpdCBtaWdodCBub3QgYWx3YXlzIGJlIGF2YWlsYWJsZSB3aGVuIHRoZSBjb2RlIGlzIGRlZmluZWQgc28gd2VcbiAgLy8gbG9vayBmb3IgaXQgYXQgdGhlIGxhc3QgcG9zc2libGUgbW9tZW50LiBJZiBpdCBkb2Vzbid0IGV4aXN0IG5vdyB0aGVuXG4gIC8vIHRoZXJlIGlzIG5vIHBvaW50IGdvaW5nIGFoZWFkIDopXG4gIHRoaXMuZXh0ZW5kKE1hcmtlckNsdXN0ZXJlciwgZ29vZ2xlLm1hcHMuT3ZlcmxheVZpZXcpO1xuICB0aGlzLm1hcF8gPSBtYXA7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtBcnJheS48Z29vZ2xlLm1hcHMuTWFya2VyPn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHRoaXMubWFya2Vyc18gPSBbXTtcblxuICAvKipcbiAgICogIEB0eXBlIHtBcnJheS48Q2x1c3Rlcj59XG4gICAqL1xuICB0aGlzLmNsdXN0ZXJzXyA9IFtdO1xuXG4gIHRoaXMuc2l6ZXMgPSBbNTMsIDU2LCA2NiwgNzgsIDkwXTtcblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHRoaXMuc3R5bGVzXyA9IFtdO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHRoaXMucmVhZHlfID0gZmFsc2U7XG5cbiAgdmFyIG9wdGlvbnMgPSBvcHRfb3B0aW9ucyB8fCB7fTtcblxuICAvKipcbiAgICogQHR5cGUge251bWJlcn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHRoaXMuZ3JpZFNpemVfID0gb3B0aW9uc1snZ3JpZFNpemUnXSB8fCA2MDtcblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHRoaXMubWluQ2x1c3RlclNpemVfID0gb3B0aW9uc1snbWluaW11bUNsdXN0ZXJTaXplJ10gfHwgMjtcblxuXG4gIC8qKlxuICAgKiBAdHlwZSB7P251bWJlcn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHRoaXMubWF4Wm9vbV8gPSBvcHRpb25zWydtYXhab29tJ10gfHwgbnVsbDtcblxuICB0aGlzLnN0eWxlc18gPSBvcHRpb25zWydzdHlsZXMnXSB8fCBbXTtcblxuICAvKipcbiAgICogQHR5cGUge3N0cmluZ31cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHRoaXMuaW1hZ2VQYXRoXyA9IG9wdGlvbnNbJ2ltYWdlUGF0aCddIHx8XG4gICAgICB0aGlzLk1BUktFUl9DTFVTVEVSX0lNQUdFX1BBVEhfO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgdGhpcy5pbWFnZUV4dGVuc2lvbl8gPSBvcHRpb25zWydpbWFnZUV4dGVuc2lvbiddIHx8XG4gICAgICB0aGlzLk1BUktFUl9DTFVTVEVSX0lNQUdFX0VYVEVOU0lPTl87XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgdGhpcy56b29tT25DbGlja18gPSB0cnVlO1xuXG4gIGlmIChvcHRpb25zWyd6b29tT25DbGljayddICE9IHVuZGVmaW5lZCkge1xuICAgIHRoaXMuem9vbU9uQ2xpY2tfID0gb3B0aW9uc1snem9vbU9uQ2xpY2snXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHRoaXMuYXZlcmFnZUNlbnRlcl8gPSBmYWxzZTtcblxuICBpZiAob3B0aW9uc1snYXZlcmFnZUNlbnRlciddICE9IHVuZGVmaW5lZCkge1xuICAgIHRoaXMuYXZlcmFnZUNlbnRlcl8gPSBvcHRpb25zWydhdmVyYWdlQ2VudGVyJ107XG4gIH1cblxuICB0aGlzLnNldHVwU3R5bGVzXygpO1xuXG4gIHRoaXMuc2V0TWFwKG1hcCk7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICB0aGlzLnByZXZab29tXyA9IHRoaXMubWFwXy5nZXRab29tKCk7XG5cbiAgLy8gQWRkIHRoZSBtYXAgZXZlbnQgbGlzdGVuZXJzXG4gIHZhciB0aGF0ID0gdGhpcztcbiAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIodGhpcy5tYXBfLCAnem9vbV9jaGFuZ2VkJywgZnVuY3Rpb24oKSB7XG4gICAgdmFyIHpvb20gPSB0aGF0Lm1hcF8uZ2V0Wm9vbSgpO1xuXG4gICAgaWYgKHRoYXQucHJldlpvb21fICE9IHpvb20pIHtcbiAgICAgIHRoYXQucHJldlpvb21fID0gem9vbTtcbiAgICAgIHRoYXQucmVzZXRWaWV3cG9ydCgpO1xuICAgIH1cbiAgfSk7XG5cbiAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIodGhpcy5tYXBfLCAnaWRsZScsIGZ1bmN0aW9uKCkge1xuICAgIHRoYXQucmVkcmF3KCk7XG4gIH0pO1xuXG4gIC8vIEZpbmFsbHksIGFkZCB0aGUgbWFya2Vyc1xuICBpZiAob3B0X21hcmtlcnMgJiYgb3B0X21hcmtlcnMubGVuZ3RoKSB7XG4gICAgdGhpcy5hZGRNYXJrZXJzKG9wdF9tYXJrZXJzLCBmYWxzZSk7XG4gIH1cbn1cblxuXG4vKipcbiAqIFRoZSBtYXJrZXIgY2x1c3RlciBpbWFnZSBwYXRoLlxuICpcbiAqIEB0eXBlIHtzdHJpbmd9XG4gKiBAcHJpdmF0ZVxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLk1BUktFUl9DTFVTVEVSX0lNQUdFX1BBVEhfID1cbiAgICAnaHR0cDovL2dvb2dsZS1tYXBzLXV0aWxpdHktbGlicmFyeS12My5nb29nbGVjb2RlLmNvbS9zdm4vdHJ1bmsvbWFya2VyY2x1c3RlcmVyLycgK1xuICAgICdpbWFnZXMvbSc7XG5cblxuLyoqXG4gKiBUaGUgbWFya2VyIGNsdXN0ZXIgaW1hZ2UgcGF0aC5cbiAqXG4gKiBAdHlwZSB7c3RyaW5nfVxuICogQHByaXZhdGVcbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5NQVJLRVJfQ0xVU1RFUl9JTUFHRV9FWFRFTlNJT05fID0gJ3BuZyc7XG5cblxuLyoqXG4gKiBFeHRlbmRzIGEgb2JqZWN0cyBwcm90b3R5cGUgYnkgYW5vdGhlcnMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iajEgVGhlIG9iamVjdCB0byBiZSBleHRlbmRlZC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmoyIFRoZSBvYmplY3QgdG8gZXh0ZW5kIHdpdGguXG4gKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBuZXcgZXh0ZW5kZWQgb2JqZWN0LlxuICogQGlnbm9yZVxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmV4dGVuZCA9IGZ1bmN0aW9uKG9iajEsIG9iajIpIHtcbiAgcmV0dXJuIChmdW5jdGlvbihvYmplY3QpIHtcbiAgICBmb3IgKHZhciBwcm9wZXJ0eSBpbiBvYmplY3QucHJvdG90eXBlKSB7XG4gICAgICB0aGlzLnByb3RvdHlwZVtwcm9wZXJ0eV0gPSBvYmplY3QucHJvdG90eXBlW3Byb3BlcnR5XTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0pLmFwcGx5KG9iajEsIFtvYmoyXSk7XG59O1xuXG5cbi8qKlxuICogSW1wbGVtZW50YWlvbiBvZiB0aGUgaW50ZXJmYWNlIG1ldGhvZC5cbiAqIEBpZ25vcmVcbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5vbkFkZCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnNldFJlYWR5Xyh0cnVlKTtcbn07XG5cbi8qKlxuICogSW1wbGVtZW50YWlvbiBvZiB0aGUgaW50ZXJmYWNlIG1ldGhvZC5cbiAqIEBpZ25vcmVcbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5kcmF3ID0gZnVuY3Rpb24oKSB7fTtcblxuLyoqXG4gKiBTZXRzIHVwIHRoZSBzdHlsZXMgb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuc2V0dXBTdHlsZXNfID0gZnVuY3Rpb24oKSB7XG4gIGlmICh0aGlzLnN0eWxlc18ubGVuZ3RoKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgZm9yICh2YXIgaSA9IDAsIHNpemU7IHNpemUgPSB0aGlzLnNpemVzW2ldOyBpKyspIHtcbiAgICB0aGlzLnN0eWxlc18ucHVzaCh7XG4gICAgICB1cmw6IHRoaXMuaW1hZ2VQYXRoXyArIChpICsgMSkgKyAnLicgKyB0aGlzLmltYWdlRXh0ZW5zaW9uXyxcbiAgICAgIGhlaWdodDogc2l6ZSxcbiAgICAgIHdpZHRoOiBzaXplXG4gICAgfSk7XG4gIH1cbn07XG5cbi8qKlxuICogIEZpdCB0aGUgbWFwIHRvIHRoZSBib3VuZHMgb2YgdGhlIG1hcmtlcnMgaW4gdGhlIGNsdXN0ZXJlci5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5maXRNYXBUb01hcmtlcnMgPSBmdW5jdGlvbigpIHtcbiAgdmFyIG1hcmtlcnMgPSB0aGlzLmdldE1hcmtlcnMoKTtcbiAgdmFyIGJvdW5kcyA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmdCb3VuZHMoKTtcbiAgZm9yICh2YXIgaSA9IDAsIG1hcmtlcjsgbWFya2VyID0gbWFya2Vyc1tpXTsgaSsrKSB7XG4gICAgYm91bmRzLmV4dGVuZChtYXJrZXIuZ2V0UG9zaXRpb24oKSk7XG4gIH1cblxuICB0aGlzLm1hcF8uZml0Qm91bmRzKGJvdW5kcyk7XG59O1xuXG5cbi8qKlxuICogIFNldHMgdGhlIHN0eWxlcy5cbiAqXG4gKiAgQHBhcmFtIHtPYmplY3R9IHN0eWxlcyBUaGUgc3R5bGUgdG8gc2V0LlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnNldFN0eWxlcyA9IGZ1bmN0aW9uKHN0eWxlcykge1xuICB0aGlzLnN0eWxlc18gPSBzdHlsZXM7XG59O1xuXG5cbi8qKlxuICogIEdldHMgdGhlIHN0eWxlcy5cbiAqXG4gKiAgQHJldHVybiB7T2JqZWN0fSBUaGUgc3R5bGVzIG9iamVjdC5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRTdHlsZXMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuc3R5bGVzXztcbn07XG5cblxuLyoqXG4gKiBXaGV0aGVyIHpvb20gb24gY2xpY2sgaXMgc2V0LlxuICpcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgem9vbU9uQ2xpY2tfIGlzIHNldC5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5pc1pvb21PbkNsaWNrID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnpvb21PbkNsaWNrXztcbn07XG5cbi8qKlxuICogV2hldGhlciBhdmVyYWdlIGNlbnRlciBpcyBzZXQuXG4gKlxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiBhdmVyYWdlQ2VudGVyXyBpcyBzZXQuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuaXNBdmVyYWdlQ2VudGVyID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmF2ZXJhZ2VDZW50ZXJfO1xufTtcblxuXG4vKipcbiAqICBSZXR1cm5zIHRoZSBhcnJheSBvZiBtYXJrZXJzIGluIHRoZSBjbHVzdGVyZXIuXG4gKlxuICogIEByZXR1cm4ge0FycmF5Ljxnb29nbGUubWFwcy5NYXJrZXI+fSBUaGUgbWFya2Vycy5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRNYXJrZXJzID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLm1hcmtlcnNfO1xufTtcblxuXG4vKipcbiAqICBSZXR1cm5zIHRoZSBudW1iZXIgb2YgbWFya2VycyBpbiB0aGUgY2x1c3RlcmVyXG4gKlxuICogIEByZXR1cm4ge051bWJlcn0gVGhlIG51bWJlciBvZiBtYXJrZXJzLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldFRvdGFsTWFya2VycyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5tYXJrZXJzXy5sZW5ndGg7XG59O1xuXG5cbi8qKlxuICogIFNldHMgdGhlIG1heCB6b29tIGZvciB0aGUgY2x1c3RlcmVyLlxuICpcbiAqICBAcGFyYW0ge251bWJlcn0gbWF4Wm9vbSBUaGUgbWF4IHpvb20gbGV2ZWwuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuc2V0TWF4Wm9vbSA9IGZ1bmN0aW9uKG1heFpvb20pIHtcbiAgdGhpcy5tYXhab29tXyA9IG1heFpvb207XG59O1xuXG5cbi8qKlxuICogIEdldHMgdGhlIG1heCB6b29tIGZvciB0aGUgY2x1c3RlcmVyLlxuICpcbiAqICBAcmV0dXJuIHtudW1iZXJ9IFRoZSBtYXggem9vbSBsZXZlbC5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRNYXhab29tID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLm1heFpvb21fO1xufTtcblxuXG4vKipcbiAqICBUaGUgZnVuY3Rpb24gZm9yIGNhbGN1bGF0aW5nIHRoZSBjbHVzdGVyIGljb24gaW1hZ2UuXG4gKlxuICogIEBwYXJhbSB7QXJyYXkuPGdvb2dsZS5tYXBzLk1hcmtlcj59IG1hcmtlcnMgVGhlIG1hcmtlcnMgaW4gdGhlIGNsdXN0ZXJlci5cbiAqICBAcGFyYW0ge251bWJlcn0gbnVtU3R5bGVzIFRoZSBudW1iZXIgb2Ygc3R5bGVzIGF2YWlsYWJsZS5cbiAqICBAcmV0dXJuIHtPYmplY3R9IEEgb2JqZWN0IHByb3BlcnRpZXM6ICd0ZXh0JyAoc3RyaW5nKSBhbmQgJ2luZGV4JyAobnVtYmVyKS5cbiAqICBAcHJpdmF0ZVxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmNhbGN1bGF0b3JfID0gZnVuY3Rpb24obWFya2VycywgbnVtU3R5bGVzKSB7XG4gIHZhciBpbmRleCA9IDA7XG4gIHZhciBjb3VudCA9IG1hcmtlcnMubGVuZ3RoO1xuICB2YXIgZHYgPSBjb3VudDtcbiAgd2hpbGUgKGR2ICE9PSAwKSB7XG4gICAgZHYgPSBwYXJzZUludChkdiAvIDEwLCAxMCk7XG4gICAgaW5kZXgrKztcbiAgfVxuXG4gIGluZGV4ID0gTWF0aC5taW4oaW5kZXgsIG51bVN0eWxlcyk7XG4gIHJldHVybiB7XG4gICAgdGV4dDogY291bnQsXG4gICAgaW5kZXg6IGluZGV4XG4gIH07XG59O1xuXG5cbi8qKlxuICogU2V0IHRoZSBjYWxjdWxhdG9yIGZ1bmN0aW9uLlxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oQXJyYXksIG51bWJlcil9IGNhbGN1bGF0b3IgVGhlIGZ1bmN0aW9uIHRvIHNldCBhcyB0aGVcbiAqICAgICBjYWxjdWxhdG9yLiBUaGUgZnVuY3Rpb24gc2hvdWxkIHJldHVybiBhIG9iamVjdCBwcm9wZXJ0aWVzOlxuICogICAgICd0ZXh0JyAoc3RyaW5nKSBhbmQgJ2luZGV4JyAobnVtYmVyKS5cbiAqXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuc2V0Q2FsY3VsYXRvciA9IGZ1bmN0aW9uKGNhbGN1bGF0b3IpIHtcbiAgdGhpcy5jYWxjdWxhdG9yXyA9IGNhbGN1bGF0b3I7XG59O1xuXG5cbi8qKlxuICogR2V0IHRoZSBjYWxjdWxhdG9yIGZ1bmN0aW9uLlxuICpcbiAqIEByZXR1cm4ge2Z1bmN0aW9uKEFycmF5LCBudW1iZXIpfSB0aGUgY2FsY3VsYXRvciBmdW5jdGlvbi5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRDYWxjdWxhdG9yID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmNhbGN1bGF0b3JfO1xufTtcblxuXG4vKipcbiAqIEFkZCBhbiBhcnJheSBvZiBtYXJrZXJzIHRvIHRoZSBjbHVzdGVyZXIuXG4gKlxuICogQHBhcmFtIHtBcnJheS48Z29vZ2xlLm1hcHMuTWFya2VyPn0gbWFya2VycyBUaGUgbWFya2VycyB0byBhZGQuXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSBvcHRfbm9kcmF3IFdoZXRoZXIgdG8gcmVkcmF3IHRoZSBjbHVzdGVycy5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5hZGRNYXJrZXJzID0gZnVuY3Rpb24obWFya2Vycywgb3B0X25vZHJhdykge1xuICBmb3IgKHZhciBpID0gMCwgbWFya2VyOyBtYXJrZXIgPSBtYXJrZXJzW2ldOyBpKyspIHtcbiAgICB0aGlzLnB1c2hNYXJrZXJUb18obWFya2VyKTtcbiAgfVxuICBpZiAoIW9wdF9ub2RyYXcpIHtcbiAgICB0aGlzLnJlZHJhdygpO1xuICB9XG59O1xuXG5cbi8qKlxuICogUHVzaGVzIGEgbWFya2VyIHRvIHRoZSBjbHVzdGVyZXIuXG4gKlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5NYXJrZXJ9IG1hcmtlciBUaGUgbWFya2VyIHRvIGFkZC5cbiAqIEBwcml2YXRlXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUucHVzaE1hcmtlclRvXyA9IGZ1bmN0aW9uKG1hcmtlcikge1xuICBtYXJrZXIuaXNBZGRlZCA9IGZhbHNlO1xuICBpZiAobWFya2VyWydkcmFnZ2FibGUnXSkge1xuICAgIC8vIElmIHRoZSBtYXJrZXIgaXMgZHJhZ2dhYmxlIGFkZCBhIGxpc3RlbmVyIHNvIHdlIHVwZGF0ZSB0aGUgY2x1c3RlcnMgb25cbiAgICAvLyB0aGUgZHJhZyBlbmQuXG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKG1hcmtlciwgJ2RyYWdlbmQnLCBmdW5jdGlvbigpIHtcbiAgICAgIG1hcmtlci5pc0FkZGVkID0gZmFsc2U7XG4gICAgICB0aGF0LnJlcGFpbnQoKTtcbiAgICB9KTtcbiAgfVxuICB0aGlzLm1hcmtlcnNfLnB1c2gobWFya2VyKTtcbn07XG5cblxuLyoqXG4gKiBBZGRzIGEgbWFya2VyIHRvIHRoZSBjbHVzdGVyZXIgYW5kIHJlZHJhd3MgaWYgbmVlZGVkLlxuICpcbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTWFya2VyfSBtYXJrZXIgVGhlIG1hcmtlciB0byBhZGQuXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSBvcHRfbm9kcmF3IFdoZXRoZXIgdG8gcmVkcmF3IHRoZSBjbHVzdGVycy5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5hZGRNYXJrZXIgPSBmdW5jdGlvbihtYXJrZXIsIG9wdF9ub2RyYXcpIHtcbiAgdGhpcy5wdXNoTWFya2VyVG9fKG1hcmtlcik7XG4gIGlmICghb3B0X25vZHJhdykge1xuICAgIHRoaXMucmVkcmF3KCk7XG4gIH1cbn07XG5cblxuLyoqXG4gKiBSZW1vdmVzIGEgbWFya2VyIGFuZCByZXR1cm5zIHRydWUgaWYgcmVtb3ZlZCwgZmFsc2UgaWYgbm90XG4gKlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5NYXJrZXJ9IG1hcmtlciBUaGUgbWFya2VyIHRvIHJlbW92ZVxuICogQHJldHVybiB7Ym9vbGVhbn0gV2hldGhlciB0aGUgbWFya2VyIHdhcyByZW1vdmVkIG9yIG5vdFxuICogQHByaXZhdGVcbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5yZW1vdmVNYXJrZXJfID0gZnVuY3Rpb24obWFya2VyKSB7XG4gIHZhciBpbmRleCA9IC0xO1xuICBpZiAodGhpcy5tYXJrZXJzXy5pbmRleE9mKSB7XG4gICAgaW5kZXggPSB0aGlzLm1hcmtlcnNfLmluZGV4T2YobWFya2VyKTtcbiAgfSBlbHNlIHtcbiAgICBmb3IgKHZhciBpID0gMCwgbTsgbSA9IHRoaXMubWFya2Vyc19baV07IGkrKykge1xuICAgICAgaWYgKG0gPT0gbWFya2VyKSB7XG4gICAgICAgIGluZGV4ID0gaTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKGluZGV4ID09IC0xKSB7XG4gICAgLy8gTWFya2VyIGlzIG5vdCBpbiBvdXIgbGlzdCBvZiBtYXJrZXJzLlxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIG1hcmtlci5zZXRNYXAobnVsbCk7XG5cbiAgdGhpcy5tYXJrZXJzXy5zcGxpY2UoaW5kZXgsIDEpO1xuXG4gIHJldHVybiB0cnVlO1xufTtcblxuXG4vKipcbiAqIFJlbW92ZSBhIG1hcmtlciBmcm9tIHRoZSBjbHVzdGVyLlxuICpcbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTWFya2VyfSBtYXJrZXIgVGhlIG1hcmtlciB0byByZW1vdmUuXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSBvcHRfbm9kcmF3IE9wdGlvbmFsIGJvb2xlYW4gdG8gZm9yY2Ugbm8gcmVkcmF3LlxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgbWFya2VyIHdhcyByZW1vdmVkLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnJlbW92ZU1hcmtlciA9IGZ1bmN0aW9uKG1hcmtlciwgb3B0X25vZHJhdykge1xuICB2YXIgcmVtb3ZlZCA9IHRoaXMucmVtb3ZlTWFya2VyXyhtYXJrZXIpO1xuXG4gIGlmICghb3B0X25vZHJhdyAmJiByZW1vdmVkKSB7XG4gICAgdGhpcy5yZXNldFZpZXdwb3J0KCk7XG4gICAgdGhpcy5yZWRyYXcoKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxuXG4vKipcbiAqIFJlbW92ZXMgYW4gYXJyYXkgb2YgbWFya2VycyBmcm9tIHRoZSBjbHVzdGVyLlxuICpcbiAqIEBwYXJhbSB7QXJyYXkuPGdvb2dsZS5tYXBzLk1hcmtlcj59IG1hcmtlcnMgVGhlIG1hcmtlcnMgdG8gcmVtb3ZlLlxuICogQHBhcmFtIHtib29sZWFuPX0gb3B0X25vZHJhdyBPcHRpb25hbCBib29sZWFuIHRvIGZvcmNlIG5vIHJlZHJhdy5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5yZW1vdmVNYXJrZXJzID0gZnVuY3Rpb24obWFya2Vycywgb3B0X25vZHJhdykge1xuICB2YXIgcmVtb3ZlZCA9IGZhbHNlO1xuXG4gIGZvciAodmFyIGkgPSAwLCBtYXJrZXI7IG1hcmtlciA9IG1hcmtlcnNbaV07IGkrKykge1xuICAgIHZhciByID0gdGhpcy5yZW1vdmVNYXJrZXJfKG1hcmtlcik7XG4gICAgcmVtb3ZlZCA9IHJlbW92ZWQgfHwgcjtcbiAgfVxuXG4gIGlmICghb3B0X25vZHJhdyAmJiByZW1vdmVkKSB7XG4gICAgdGhpcy5yZXNldFZpZXdwb3J0KCk7XG4gICAgdGhpcy5yZWRyYXcoKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTtcblxuXG4vKipcbiAqIFNldHMgdGhlIGNsdXN0ZXJlcidzIHJlYWR5IHN0YXRlLlxuICpcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gcmVhZHkgVGhlIHN0YXRlLlxuICogQHByaXZhdGVcbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5zZXRSZWFkeV8gPSBmdW5jdGlvbihyZWFkeSkge1xuICBpZiAoIXRoaXMucmVhZHlfKSB7XG4gICAgdGhpcy5yZWFkeV8gPSByZWFkeTtcbiAgICB0aGlzLmNyZWF0ZUNsdXN0ZXJzXygpO1xuICB9XG59O1xuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIGNsdXN0ZXJzIGluIHRoZSBjbHVzdGVyZXIuXG4gKlxuICogQHJldHVybiB7bnVtYmVyfSBUaGUgbnVtYmVyIG9mIGNsdXN0ZXJzLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldFRvdGFsQ2x1c3RlcnMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuY2x1c3RlcnNfLmxlbmd0aDtcbn07XG5cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBnb29nbGUgbWFwIHRoYXQgdGhlIGNsdXN0ZXJlciBpcyBhc3NvY2lhdGVkIHdpdGguXG4gKlxuICogQHJldHVybiB7Z29vZ2xlLm1hcHMuTWFwfSBUaGUgbWFwLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldE1hcCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5tYXBfO1xufTtcblxuXG4vKipcbiAqIFNldHMgdGhlIGdvb2dsZSBtYXAgdGhhdCB0aGUgY2x1c3RlcmVyIGlzIGFzc29jaWF0ZWQgd2l0aC5cbiAqXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLk1hcH0gbWFwIFRoZSBtYXAuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuc2V0TWFwID0gZnVuY3Rpb24obWFwKSB7XG4gIHRoaXMubWFwXyA9IG1hcDtcbn07XG5cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBzaXplIG9mIHRoZSBncmlkLlxuICpcbiAqIEByZXR1cm4ge251bWJlcn0gVGhlIGdyaWQgc2l6ZS5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRHcmlkU2l6ZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5ncmlkU2l6ZV87XG59O1xuXG5cbi8qKlxuICogU2V0cyB0aGUgc2l6ZSBvZiB0aGUgZ3JpZC5cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gc2l6ZSBUaGUgZ3JpZCBzaXplLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnNldEdyaWRTaXplID0gZnVuY3Rpb24oc2l6ZSkge1xuICB0aGlzLmdyaWRTaXplXyA9IHNpemU7XG59O1xuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgbWluIGNsdXN0ZXIgc2l6ZS5cbiAqXG4gKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSBncmlkIHNpemUuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0TWluQ2x1c3RlclNpemUgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMubWluQ2x1c3RlclNpemVfO1xufTtcblxuLyoqXG4gKiBTZXRzIHRoZSBtaW4gY2x1c3RlciBzaXplLlxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBzaXplIFRoZSBncmlkIHNpemUuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuc2V0TWluQ2x1c3RlclNpemUgPSBmdW5jdGlvbihzaXplKSB7XG4gIHRoaXMubWluQ2x1c3RlclNpemVfID0gc2l6ZTtcbn07XG5cblxuLyoqXG4gKiBFeHRlbmRzIGEgYm91bmRzIG9iamVjdCBieSB0aGUgZ3JpZCBzaXplLlxuICpcbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTGF0TG5nQm91bmRzfSBib3VuZHMgVGhlIGJvdW5kcyB0byBleHRlbmQuXG4gKiBAcmV0dXJuIHtnb29nbGUubWFwcy5MYXRMbmdCb3VuZHN9IFRoZSBleHRlbmRlZCBib3VuZHMuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0RXh0ZW5kZWRCb3VuZHMgPSBmdW5jdGlvbihib3VuZHMpIHtcbiAgdmFyIHByb2plY3Rpb24gPSB0aGlzLmdldFByb2plY3Rpb24oKTtcblxuICAvLyBUdXJuIHRoZSBib3VuZHMgaW50byBsYXRsbmcuXG4gIHZhciB0ciA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoYm91bmRzLmdldE5vcnRoRWFzdCgpLmxhdCgpLFxuICAgICAgYm91bmRzLmdldE5vcnRoRWFzdCgpLmxuZygpKTtcbiAgdmFyIGJsID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhib3VuZHMuZ2V0U291dGhXZXN0KCkubGF0KCksXG4gICAgICBib3VuZHMuZ2V0U291dGhXZXN0KCkubG5nKCkpO1xuXG4gIC8vIENvbnZlcnQgdGhlIHBvaW50cyB0byBwaXhlbHMgYW5kIHRoZSBleHRlbmQgb3V0IGJ5IHRoZSBncmlkIHNpemUuXG4gIHZhciB0clBpeCA9IHByb2plY3Rpb24uZnJvbUxhdExuZ1RvRGl2UGl4ZWwodHIpO1xuICB0clBpeC54ICs9IHRoaXMuZ3JpZFNpemVfO1xuICB0clBpeC55IC09IHRoaXMuZ3JpZFNpemVfO1xuXG4gIHZhciBibFBpeCA9IHByb2plY3Rpb24uZnJvbUxhdExuZ1RvRGl2UGl4ZWwoYmwpO1xuICBibFBpeC54IC09IHRoaXMuZ3JpZFNpemVfO1xuICBibFBpeC55ICs9IHRoaXMuZ3JpZFNpemVfO1xuXG4gIC8vIENvbnZlcnQgdGhlIHBpeGVsIHBvaW50cyBiYWNrIHRvIExhdExuZ1xuICB2YXIgbmUgPSBwcm9qZWN0aW9uLmZyb21EaXZQaXhlbFRvTGF0TG5nKHRyUGl4KTtcbiAgdmFyIHN3ID0gcHJvamVjdGlvbi5mcm9tRGl2UGl4ZWxUb0xhdExuZyhibFBpeCk7XG5cbiAgLy8gRXh0ZW5kIHRoZSBib3VuZHMgdG8gY29udGFpbiB0aGUgbmV3IGJvdW5kcy5cbiAgYm91bmRzLmV4dGVuZChuZSk7XG4gIGJvdW5kcy5leHRlbmQoc3cpO1xuXG4gIHJldHVybiBib3VuZHM7XG59O1xuXG5cbi8qKlxuICogRGV0ZXJtaW5zIGlmIGEgbWFya2VyIGlzIGNvbnRhaW5lZCBpbiBhIGJvdW5kcy5cbiAqXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLk1hcmtlcn0gbWFya2VyIFRoZSBtYXJrZXIgdG8gY2hlY2suXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLkxhdExuZ0JvdW5kc30gYm91bmRzIFRoZSBib3VuZHMgdG8gY2hlY2sgYWdhaW5zdC5cbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdGhlIG1hcmtlciBpcyBpbiB0aGUgYm91bmRzLlxuICogQHByaXZhdGVcbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5pc01hcmtlckluQm91bmRzXyA9IGZ1bmN0aW9uKG1hcmtlciwgYm91bmRzKSB7XG4gIHJldHVybiBib3VuZHMuY29udGFpbnMobWFya2VyLmdldFBvc2l0aW9uKCkpO1xufTtcblxuXG4vKipcbiAqIENsZWFycyBhbGwgY2x1c3RlcnMgYW5kIG1hcmtlcnMgZnJvbSB0aGUgY2x1c3RlcmVyLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmNsZWFyTWFya2VycyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnJlc2V0Vmlld3BvcnQodHJ1ZSk7XG5cbiAgLy8gU2V0IHRoZSBtYXJrZXJzIGEgZW1wdHkgYXJyYXkuXG4gIHRoaXMubWFya2Vyc18gPSBbXTtcbn07XG5cblxuLyoqXG4gKiBDbGVhcnMgYWxsIGV4aXN0aW5nIGNsdXN0ZXJzIGFuZCByZWNyZWF0ZXMgdGhlbS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0X2hpZGUgVG8gYWxzbyBoaWRlIHRoZSBtYXJrZXIuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUucmVzZXRWaWV3cG9ydCA9IGZ1bmN0aW9uKG9wdF9oaWRlKSB7XG4gIC8vIFJlbW92ZSBhbGwgdGhlIGNsdXN0ZXJzXG4gIGZvciAodmFyIGkgPSAwLCBjbHVzdGVyOyBjbHVzdGVyID0gdGhpcy5jbHVzdGVyc19baV07IGkrKykge1xuICAgIGNsdXN0ZXIucmVtb3ZlKCk7XG4gIH1cblxuICAvLyBSZXNldCB0aGUgbWFya2VycyB0byBub3QgYmUgYWRkZWQgYW5kIHRvIGJlIGludmlzaWJsZS5cbiAgZm9yICh2YXIgaSA9IDAsIG1hcmtlcjsgbWFya2VyID0gdGhpcy5tYXJrZXJzX1tpXTsgaSsrKSB7XG4gICAgbWFya2VyLmlzQWRkZWQgPSBmYWxzZTtcbiAgICBpZiAob3B0X2hpZGUpIHtcbiAgICAgIG1hcmtlci5zZXRNYXAobnVsbCk7XG4gICAgfVxuICB9XG5cbiAgdGhpcy5jbHVzdGVyc18gPSBbXTtcbn07XG5cbi8qKlxuICpcbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5yZXBhaW50ID0gZnVuY3Rpb24oKSB7XG4gIHZhciBvbGRDbHVzdGVycyA9IHRoaXMuY2x1c3RlcnNfLnNsaWNlKCk7XG4gIHRoaXMuY2x1c3RlcnNfLmxlbmd0aCA9IDA7XG4gIHRoaXMucmVzZXRWaWV3cG9ydCgpO1xuICB0aGlzLnJlZHJhdygpO1xuXG4gIC8vIFJlbW92ZSB0aGUgb2xkIGNsdXN0ZXJzLlxuICAvLyBEbyBpdCBpbiBhIHRpbWVvdXQgc28gdGhlIG90aGVyIGNsdXN0ZXJzIGhhdmUgYmVlbiBkcmF3biBmaXJzdC5cbiAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGNsdXN0ZXI7IGNsdXN0ZXIgPSBvbGRDbHVzdGVyc1tpXTsgaSsrKSB7XG4gICAgICBjbHVzdGVyLnJlbW92ZSgpO1xuICAgIH1cbiAgfSwgMCk7XG59O1xuXG5cbi8qKlxuICogUmVkcmF3cyB0aGUgY2x1c3RlcnMuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUucmVkcmF3ID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuY3JlYXRlQ2x1c3RlcnNfKCk7XG59O1xuXG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgZGlzdGFuY2UgYmV0d2VlbiB0d28gbGF0bG5nIGxvY2F0aW9ucyBpbiBrbS5cbiAqIEBzZWUgaHR0cDovL3d3dy5tb3ZhYmxlLXR5cGUuY28udWsvc2NyaXB0cy9sYXRsb25nLmh0bWxcbiAqXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLkxhdExuZ30gcDEgVGhlIGZpcnN0IGxhdCBsbmcgcG9pbnQuXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLkxhdExuZ30gcDIgVGhlIHNlY29uZCBsYXQgbG5nIHBvaW50LlxuICogQHJldHVybiB7bnVtYmVyfSBUaGUgZGlzdGFuY2UgYmV0d2VlbiB0aGUgdHdvIHBvaW50cyBpbiBrbS5cbiAqIEBwcml2YXRlXG4qL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5kaXN0YW5jZUJldHdlZW5Qb2ludHNfID0gZnVuY3Rpb24ocDEsIHAyKSB7XG4gIGlmICghcDEgfHwgIXAyKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICB2YXIgUiA9IDYzNzE7IC8vIFJhZGl1cyBvZiB0aGUgRWFydGggaW4ga21cbiAgdmFyIGRMYXQgPSAocDIubGF0KCkgLSBwMS5sYXQoKSkgKiBNYXRoLlBJIC8gMTgwO1xuICB2YXIgZExvbiA9IChwMi5sbmcoKSAtIHAxLmxuZygpKSAqIE1hdGguUEkgLyAxODA7XG4gIHZhciBhID0gTWF0aC5zaW4oZExhdCAvIDIpICogTWF0aC5zaW4oZExhdCAvIDIpICtcbiAgICBNYXRoLmNvcyhwMS5sYXQoKSAqIE1hdGguUEkgLyAxODApICogTWF0aC5jb3MocDIubGF0KCkgKiBNYXRoLlBJIC8gMTgwKSAqXG4gICAgTWF0aC5zaW4oZExvbiAvIDIpICogTWF0aC5zaW4oZExvbiAvIDIpO1xuICB2YXIgYyA9IDIgKiBNYXRoLmF0YW4yKE1hdGguc3FydChhKSwgTWF0aC5zcXJ0KDEgLSBhKSk7XG4gIHZhciBkID0gUiAqIGM7XG4gIHJldHVybiBkO1xufTtcblxuXG4vKipcbiAqIEFkZCBhIG1hcmtlciB0byBhIGNsdXN0ZXIsIG9yIGNyZWF0ZXMgYSBuZXcgY2x1c3Rlci5cbiAqXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLk1hcmtlcn0gbWFya2VyIFRoZSBtYXJrZXIgdG8gYWRkLlxuICogQHByaXZhdGVcbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5hZGRUb0Nsb3Nlc3RDbHVzdGVyXyA9IGZ1bmN0aW9uKG1hcmtlcikge1xuICB2YXIgZGlzdGFuY2UgPSA0MDAwMDsgLy8gU29tZSBsYXJnZSBudW1iZXJcbiAgdmFyIGNsdXN0ZXJUb0FkZFRvID0gbnVsbDtcbiAgdmFyIHBvcyA9IG1hcmtlci5nZXRQb3NpdGlvbigpO1xuICBmb3IgKHZhciBpID0gMCwgY2x1c3RlcjsgY2x1c3RlciA9IHRoaXMuY2x1c3RlcnNfW2ldOyBpKyspIHtcbiAgICB2YXIgY2VudGVyID0gY2x1c3Rlci5nZXRDZW50ZXIoKTtcbiAgICBpZiAoY2VudGVyKSB7XG4gICAgICB2YXIgZCA9IHRoaXMuZGlzdGFuY2VCZXR3ZWVuUG9pbnRzXyhjZW50ZXIsIG1hcmtlci5nZXRQb3NpdGlvbigpKTtcbiAgICAgIGlmIChkIDwgZGlzdGFuY2UpIHtcbiAgICAgICAgZGlzdGFuY2UgPSBkO1xuICAgICAgICBjbHVzdGVyVG9BZGRUbyA9IGNsdXN0ZXI7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKGNsdXN0ZXJUb0FkZFRvICYmIGNsdXN0ZXJUb0FkZFRvLmlzTWFya2VySW5DbHVzdGVyQm91bmRzKG1hcmtlcikpIHtcbiAgICBjbHVzdGVyVG9BZGRUby5hZGRNYXJrZXIobWFya2VyKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgY2x1c3RlciA9IG5ldyBDbHVzdGVyKHRoaXMpO1xuICAgIGNsdXN0ZXIuYWRkTWFya2VyKG1hcmtlcik7XG4gICAgdGhpcy5jbHVzdGVyc18ucHVzaChjbHVzdGVyKTtcbiAgfVxufTtcblxuXG4vKipcbiAqIENyZWF0ZXMgdGhlIGNsdXN0ZXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuY3JlYXRlQ2x1c3RlcnNfID0gZnVuY3Rpb24oKSB7XG4gIGlmICghdGhpcy5yZWFkeV8pIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBHZXQgb3VyIGN1cnJlbnQgbWFwIHZpZXcgYm91bmRzLlxuICAvLyBDcmVhdGUgYSBuZXcgYm91bmRzIG9iamVjdCBzbyB3ZSBkb24ndCBhZmZlY3QgdGhlIG1hcC5cbiAgdmFyIG1hcEJvdW5kcyA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmdCb3VuZHModGhpcy5tYXBfLmdldEJvdW5kcygpLmdldFNvdXRoV2VzdCgpLFxuICAgICAgdGhpcy5tYXBfLmdldEJvdW5kcygpLmdldE5vcnRoRWFzdCgpKTtcbiAgdmFyIGJvdW5kcyA9IHRoaXMuZ2V0RXh0ZW5kZWRCb3VuZHMobWFwQm91bmRzKTtcblxuICBmb3IgKHZhciBpID0gMCwgbWFya2VyOyBtYXJrZXIgPSB0aGlzLm1hcmtlcnNfW2ldOyBpKyspIHtcbiAgICBpZiAoIW1hcmtlci5pc0FkZGVkICYmIHRoaXMuaXNNYXJrZXJJbkJvdW5kc18obWFya2VyLCBib3VuZHMpKSB7XG4gICAgICB0aGlzLmFkZFRvQ2xvc2VzdENsdXN0ZXJfKG1hcmtlcik7XG4gICAgfVxuICB9XG59O1xuXG5cbi8qKlxuICogQSBjbHVzdGVyIHRoYXQgY29udGFpbnMgbWFya2Vycy5cbiAqXG4gKiBAcGFyYW0ge01hcmtlckNsdXN0ZXJlcn0gbWFya2VyQ2x1c3RlcmVyIFRoZSBtYXJrZXJjbHVzdGVyZXIgdGhhdCB0aGlzXG4gKiAgICAgY2x1c3RlciBpcyBhc3NvY2lhdGVkIHdpdGguXG4gKiBAY29uc3RydWN0b3JcbiAqIEBpZ25vcmVcbiAqL1xuZnVuY3Rpb24gQ2x1c3RlcihtYXJrZXJDbHVzdGVyZXIpIHtcbiAgdGhpcy5tYXJrZXJDbHVzdGVyZXJfID0gbWFya2VyQ2x1c3RlcmVyO1xuICB0aGlzLm1hcF8gPSBtYXJrZXJDbHVzdGVyZXIuZ2V0TWFwKCk7XG4gIHRoaXMuZ3JpZFNpemVfID0gbWFya2VyQ2x1c3RlcmVyLmdldEdyaWRTaXplKCk7XG4gIHRoaXMubWluQ2x1c3RlclNpemVfID0gbWFya2VyQ2x1c3RlcmVyLmdldE1pbkNsdXN0ZXJTaXplKCk7XG4gIHRoaXMuYXZlcmFnZUNlbnRlcl8gPSBtYXJrZXJDbHVzdGVyZXIuaXNBdmVyYWdlQ2VudGVyKCk7XG4gIHRoaXMuY2VudGVyXyA9IG51bGw7XG4gIHRoaXMubWFya2Vyc18gPSBbXTtcbiAgdGhpcy5ib3VuZHNfID0gbnVsbDtcbiAgdGhpcy5jbHVzdGVySWNvbl8gPSBuZXcgQ2x1c3Rlckljb24odGhpcywgbWFya2VyQ2x1c3RlcmVyLmdldFN0eWxlcygpLFxuICAgICAgbWFya2VyQ2x1c3RlcmVyLmdldEdyaWRTaXplKCkpO1xufVxuXG4vKipcbiAqIERldGVybWlucyBpZiBhIG1hcmtlciBpcyBhbHJlYWR5IGFkZGVkIHRvIHRoZSBjbHVzdGVyLlxuICpcbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTWFya2VyfSBtYXJrZXIgVGhlIG1hcmtlciB0byBjaGVjay5cbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdGhlIG1hcmtlciBpcyBhbHJlYWR5IGFkZGVkLlxuICovXG5DbHVzdGVyLnByb3RvdHlwZS5pc01hcmtlckFscmVhZHlBZGRlZCA9IGZ1bmN0aW9uKG1hcmtlcikge1xuICBpZiAodGhpcy5tYXJrZXJzXy5pbmRleE9mKSB7XG4gICAgcmV0dXJuIHRoaXMubWFya2Vyc18uaW5kZXhPZihtYXJrZXIpICE9IC0xO1xuICB9IGVsc2Uge1xuICAgIGZvciAodmFyIGkgPSAwLCBtOyBtID0gdGhpcy5tYXJrZXJzX1tpXTsgaSsrKSB7XG4gICAgICBpZiAobSA9PSBtYXJrZXIpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cblxuLyoqXG4gKiBBZGQgYSBtYXJrZXIgdGhlIGNsdXN0ZXIuXG4gKlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5NYXJrZXJ9IG1hcmtlciBUaGUgbWFya2VyIHRvIGFkZC5cbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdGhlIG1hcmtlciB3YXMgYWRkZWQuXG4gKi9cbkNsdXN0ZXIucHJvdG90eXBlLmFkZE1hcmtlciA9IGZ1bmN0aW9uKG1hcmtlcikge1xuICBpZiAodGhpcy5pc01hcmtlckFscmVhZHlBZGRlZChtYXJrZXIpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKCF0aGlzLmNlbnRlcl8pIHtcbiAgICB0aGlzLmNlbnRlcl8gPSBtYXJrZXIuZ2V0UG9zaXRpb24oKTtcbiAgICB0aGlzLmNhbGN1bGF0ZUJvdW5kc18oKTtcbiAgfSBlbHNlIHtcbiAgICBpZiAodGhpcy5hdmVyYWdlQ2VudGVyXykge1xuICAgICAgdmFyIGwgPSB0aGlzLm1hcmtlcnNfLmxlbmd0aCArIDE7XG4gICAgICB2YXIgbGF0ID0gKHRoaXMuY2VudGVyXy5sYXQoKSAqIChsLTEpICsgbWFya2VyLmdldFBvc2l0aW9uKCkubGF0KCkpIC8gbDtcbiAgICAgIHZhciBsbmcgPSAodGhpcy5jZW50ZXJfLmxuZygpICogKGwtMSkgKyBtYXJrZXIuZ2V0UG9zaXRpb24oKS5sbmcoKSkgLyBsO1xuICAgICAgdGhpcy5jZW50ZXJfID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhsYXQsIGxuZyk7XG4gICAgICB0aGlzLmNhbGN1bGF0ZUJvdW5kc18oKTtcbiAgICB9XG4gIH1cblxuICBtYXJrZXIuaXNBZGRlZCA9IHRydWU7XG4gIHRoaXMubWFya2Vyc18ucHVzaChtYXJrZXIpO1xuXG4gIHZhciBsZW4gPSB0aGlzLm1hcmtlcnNfLmxlbmd0aDtcbiAgaWYgKGxlbiA8IHRoaXMubWluQ2x1c3RlclNpemVfICYmIG1hcmtlci5nZXRNYXAoKSAhPSB0aGlzLm1hcF8pIHtcbiAgICAvLyBNaW4gY2x1c3RlciBzaXplIG5vdCByZWFjaGVkIHNvIHNob3cgdGhlIG1hcmtlci5cbiAgICBtYXJrZXIuc2V0TWFwKHRoaXMubWFwXyk7XG4gIH1cblxuICBpZiAobGVuID09IHRoaXMubWluQ2x1c3RlclNpemVfKSB7XG4gICAgLy8gSGlkZSB0aGUgbWFya2VycyB0aGF0IHdlcmUgc2hvd2luZy5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICB0aGlzLm1hcmtlcnNfW2ldLnNldE1hcChudWxsKTtcbiAgICB9XG4gIH1cblxuICBpZiAobGVuID49IHRoaXMubWluQ2x1c3RlclNpemVfKSB7XG4gICAgbWFya2VyLnNldE1hcChudWxsKTtcbiAgfVxuXG4gIHRoaXMudXBkYXRlSWNvbigpO1xuICByZXR1cm4gdHJ1ZTtcbn07XG5cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBtYXJrZXIgY2x1c3RlcmVyIHRoYXQgdGhlIGNsdXN0ZXIgaXMgYXNzb2NpYXRlZCB3aXRoLlxuICpcbiAqIEByZXR1cm4ge01hcmtlckNsdXN0ZXJlcn0gVGhlIGFzc29jaWF0ZWQgbWFya2VyIGNsdXN0ZXJlci5cbiAqL1xuQ2x1c3Rlci5wcm90b3R5cGUuZ2V0TWFya2VyQ2x1c3RlcmVyID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLm1hcmtlckNsdXN0ZXJlcl87XG59O1xuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgYm91bmRzIG9mIHRoZSBjbHVzdGVyLlxuICpcbiAqIEByZXR1cm4ge2dvb2dsZS5tYXBzLkxhdExuZ0JvdW5kc30gdGhlIGNsdXN0ZXIgYm91bmRzLlxuICovXG5DbHVzdGVyLnByb3RvdHlwZS5nZXRCb3VuZHMgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGJvdW5kcyA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmdCb3VuZHModGhpcy5jZW50ZXJfLCB0aGlzLmNlbnRlcl8pO1xuICB2YXIgbWFya2VycyA9IHRoaXMuZ2V0TWFya2VycygpO1xuICBmb3IgKHZhciBpID0gMCwgbWFya2VyOyBtYXJrZXIgPSBtYXJrZXJzW2ldOyBpKyspIHtcbiAgICBib3VuZHMuZXh0ZW5kKG1hcmtlci5nZXRQb3NpdGlvbigpKTtcbiAgfVxuICByZXR1cm4gYm91bmRzO1xufTtcblxuXG4vKipcbiAqIFJlbW92ZXMgdGhlIGNsdXN0ZXJcbiAqL1xuQ2x1c3Rlci5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuY2x1c3Rlckljb25fLnJlbW92ZSgpO1xuICB0aGlzLm1hcmtlcnNfLmxlbmd0aCA9IDA7XG4gIGRlbGV0ZSB0aGlzLm1hcmtlcnNfO1xufTtcblxuXG4vKipcbiAqIFJldHVybnMgdGhlIGNlbnRlciBvZiB0aGUgY2x1c3Rlci5cbiAqXG4gKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSBjbHVzdGVyIGNlbnRlci5cbiAqL1xuQ2x1c3Rlci5wcm90b3R5cGUuZ2V0U2l6ZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5tYXJrZXJzXy5sZW5ndGg7XG59O1xuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgY2VudGVyIG9mIHRoZSBjbHVzdGVyLlxuICpcbiAqIEByZXR1cm4ge0FycmF5Ljxnb29nbGUubWFwcy5NYXJrZXI+fSBUaGUgY2x1c3RlciBjZW50ZXIuXG4gKi9cbkNsdXN0ZXIucHJvdG90eXBlLmdldE1hcmtlcnMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMubWFya2Vyc187XG59O1xuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgY2VudGVyIG9mIHRoZSBjbHVzdGVyLlxuICpcbiAqIEByZXR1cm4ge2dvb2dsZS5tYXBzLkxhdExuZ30gVGhlIGNsdXN0ZXIgY2VudGVyLlxuICovXG5DbHVzdGVyLnByb3RvdHlwZS5nZXRDZW50ZXIgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuY2VudGVyXztcbn07XG5cblxuLyoqXG4gKiBDYWxjdWxhdGVkIHRoZSBleHRlbmRlZCBib3VuZHMgb2YgdGhlIGNsdXN0ZXIgd2l0aCB0aGUgZ3JpZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5DbHVzdGVyLnByb3RvdHlwZS5jYWxjdWxhdGVCb3VuZHNfID0gZnVuY3Rpb24oKSB7XG4gIHZhciBib3VuZHMgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nQm91bmRzKHRoaXMuY2VudGVyXywgdGhpcy5jZW50ZXJfKTtcbiAgdGhpcy5ib3VuZHNfID0gdGhpcy5tYXJrZXJDbHVzdGVyZXJfLmdldEV4dGVuZGVkQm91bmRzKGJvdW5kcyk7XG59O1xuXG5cbi8qKlxuICogRGV0ZXJtaW5lcyBpZiBhIG1hcmtlciBsaWVzIGluIHRoZSBjbHVzdGVycyBib3VuZHMuXG4gKlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5NYXJrZXJ9IG1hcmtlciBUaGUgbWFya2VyIHRvIGNoZWNrLlxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgbWFya2VyIGxpZXMgaW4gdGhlIGJvdW5kcy5cbiAqL1xuQ2x1c3Rlci5wcm90b3R5cGUuaXNNYXJrZXJJbkNsdXN0ZXJCb3VuZHMgPSBmdW5jdGlvbihtYXJrZXIpIHtcbiAgcmV0dXJuIHRoaXMuYm91bmRzXy5jb250YWlucyhtYXJrZXIuZ2V0UG9zaXRpb24oKSk7XG59O1xuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgbWFwIHRoYXQgdGhlIGNsdXN0ZXIgaXMgYXNzb2NpYXRlZCB3aXRoLlxuICpcbiAqIEByZXR1cm4ge2dvb2dsZS5tYXBzLk1hcH0gVGhlIG1hcC5cbiAqL1xuQ2x1c3Rlci5wcm90b3R5cGUuZ2V0TWFwID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLm1hcF87XG59O1xuXG5cbi8qKlxuICogVXBkYXRlcyB0aGUgY2x1c3RlciBpY29uXG4gKi9cbkNsdXN0ZXIucHJvdG90eXBlLnVwZGF0ZUljb24gPSBmdW5jdGlvbigpIHtcbiAgdmFyIHpvb20gPSB0aGlzLm1hcF8uZ2V0Wm9vbSgpO1xuICB2YXIgbXogPSB0aGlzLm1hcmtlckNsdXN0ZXJlcl8uZ2V0TWF4Wm9vbSgpO1xuXG4gIGlmIChteiAmJiB6b29tID4gbXopIHtcbiAgICAvLyBUaGUgem9vbSBpcyBncmVhdGVyIHRoYW4gb3VyIG1heCB6b29tIHNvIHNob3cgYWxsIHRoZSBtYXJrZXJzIGluIGNsdXN0ZXIuXG4gICAgZm9yICh2YXIgaSA9IDAsIG1hcmtlcjsgbWFya2VyID0gdGhpcy5tYXJrZXJzX1tpXTsgaSsrKSB7XG4gICAgICBtYXJrZXIuc2V0TWFwKHRoaXMubWFwXyk7XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmICh0aGlzLm1hcmtlcnNfLmxlbmd0aCA8IHRoaXMubWluQ2x1c3RlclNpemVfKSB7XG4gICAgLy8gTWluIGNsdXN0ZXIgc2l6ZSBub3QgeWV0IHJlYWNoZWQuXG4gICAgdGhpcy5jbHVzdGVySWNvbl8uaGlkZSgpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBudW1TdHlsZXMgPSB0aGlzLm1hcmtlckNsdXN0ZXJlcl8uZ2V0U3R5bGVzKCkubGVuZ3RoO1xuICB2YXIgc3VtcyA9IHRoaXMubWFya2VyQ2x1c3RlcmVyXy5nZXRDYWxjdWxhdG9yKCkodGhpcy5tYXJrZXJzXywgbnVtU3R5bGVzKTtcbiAgdGhpcy5jbHVzdGVySWNvbl8uc2V0Q2VudGVyKHRoaXMuY2VudGVyXyk7XG4gIHRoaXMuY2x1c3Rlckljb25fLnNldFN1bXMoc3Vtcyk7XG4gIHRoaXMuY2x1c3Rlckljb25fLnNob3coKTtcbn07XG5cblxuLyoqXG4gKiBBIGNsdXN0ZXIgaWNvblxuICpcbiAqIEBwYXJhbSB7Q2x1c3Rlcn0gY2x1c3RlciBUaGUgY2x1c3RlciB0byBiZSBhc3NvY2lhdGVkIHdpdGguXG4gKiBAcGFyYW0ge09iamVjdH0gc3R5bGVzIEFuIG9iamVjdCB0aGF0IGhhcyBzdHlsZSBwcm9wZXJ0aWVzOlxuICogICAgICd1cmwnOiAoc3RyaW5nKSBUaGUgaW1hZ2UgdXJsLlxuICogICAgICdoZWlnaHQnOiAobnVtYmVyKSBUaGUgaW1hZ2UgaGVpZ2h0LlxuICogICAgICd3aWR0aCc6IChudW1iZXIpIFRoZSBpbWFnZSB3aWR0aC5cbiAqICAgICAnYW5jaG9yJzogKEFycmF5KSBUaGUgYW5jaG9yIHBvc2l0aW9uIG9mIHRoZSBsYWJlbCB0ZXh0LlxuICogICAgICd0ZXh0Q29sb3InOiAoc3RyaW5nKSBUaGUgdGV4dCBjb2xvci5cbiAqICAgICAndGV4dFNpemUnOiAobnVtYmVyKSBUaGUgdGV4dCBzaXplLlxuICogICAgICAnZm9udEZhbWlseSc6IChzdHJpbmcpIFRoZSBmb250IGZhbWlseS5cbiAqICAgICAgJ2ZvbnRXZWlnaHQnOiAoc3RyaW5nKSBUaGUgZm9udCB3ZWlnaHQuXG4gKiAgICAgJ2JhY2tncm91bmRQb3NpdGlvbjogKHN0cmluZykgVGhlIGJhY2tncm91bmQgcG9zdGl0aW9uIHgsIHkuXG4gKiBAcGFyYW0ge251bWJlcj19IG9wdF9wYWRkaW5nIE9wdGlvbmFsIHBhZGRpbmcgdG8gYXBwbHkgdG8gdGhlIGNsdXN0ZXIgaWNvbi5cbiAqIEBjb25zdHJ1Y3RvclxuICogQGV4dGVuZHMgZ29vZ2xlLm1hcHMuT3ZlcmxheVZpZXdcbiAqIEBpZ25vcmVcbiAqL1xuZnVuY3Rpb24gQ2x1c3Rlckljb24oY2x1c3Rlciwgc3R5bGVzLCBvcHRfcGFkZGluZykge1xuICBjbHVzdGVyLmdldE1hcmtlckNsdXN0ZXJlcigpLmV4dGVuZChDbHVzdGVySWNvbiwgZ29vZ2xlLm1hcHMuT3ZlcmxheVZpZXcpO1xuXG4gIHRoaXMuc3R5bGVzXyA9IHN0eWxlcztcbiAgdGhpcy5wYWRkaW5nXyA9IG9wdF9wYWRkaW5nIHx8IDA7XG4gIHRoaXMuY2x1c3Rlcl8gPSBjbHVzdGVyO1xuICB0aGlzLmNlbnRlcl8gPSBudWxsO1xuICB0aGlzLm1hcF8gPSBjbHVzdGVyLmdldE1hcCgpO1xuICB0aGlzLmRpdl8gPSBudWxsO1xuICB0aGlzLnN1bXNfID0gbnVsbDtcbiAgdGhpcy52aXNpYmxlXyA9IGZhbHNlO1xuXG4gIHRoaXMuc2V0TWFwKHRoaXMubWFwXyk7XG59XG5cblxuLyoqXG4gKiBUcmlnZ2VycyB0aGUgY2x1c3RlcmNsaWNrIGV2ZW50IGFuZCB6b29tJ3MgaWYgdGhlIG9wdGlvbiBpcyBzZXQuXG4gKi9cbkNsdXN0ZXJJY29uLnByb3RvdHlwZS50cmlnZ2VyQ2x1c3RlckNsaWNrID0gZnVuY3Rpb24oKSB7XG4gIHZhciBtYXJrZXJDbHVzdGVyZXIgPSB0aGlzLmNsdXN0ZXJfLmdldE1hcmtlckNsdXN0ZXJlcigpO1xuXG4gIC8vIFRyaWdnZXIgdGhlIGNsdXN0ZXJjbGljayBldmVudC5cbiAgZ29vZ2xlLm1hcHMuZXZlbnQudHJpZ2dlcihtYXJrZXJDbHVzdGVyZXIsICdjbHVzdGVyY2xpY2snLCB0aGlzLmNsdXN0ZXJfKTtcblxuICBpZiAobWFya2VyQ2x1c3RlcmVyLmlzWm9vbU9uQ2xpY2soKSkge1xuICAgIC8vIFpvb20gaW50byB0aGUgY2x1c3Rlci5cbiAgICB0aGlzLm1hcF8uZml0Qm91bmRzKHRoaXMuY2x1c3Rlcl8uZ2V0Qm91bmRzKCkpO1xuICB9XG59O1xuXG5cbi8qKlxuICogQWRkaW5nIHRoZSBjbHVzdGVyIGljb24gdG8gdGhlIGRvbS5cbiAqIEBpZ25vcmVcbiAqL1xuQ2x1c3Rlckljb24ucHJvdG90eXBlLm9uQWRkID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuZGl2XyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xuICBpZiAodGhpcy52aXNpYmxlXykge1xuICAgIHZhciBwb3MgPSB0aGlzLmdldFBvc0Zyb21MYXRMbmdfKHRoaXMuY2VudGVyXyk7XG4gICAgdGhpcy5kaXZfLnN0eWxlLmNzc1RleHQgPSB0aGlzLmNyZWF0ZUNzcyhwb3MpO1xuICAgIHRoaXMuZGl2Xy5pbm5lckhUTUwgPSB0aGlzLnN1bXNfLnRleHQ7XG4gIH1cblxuICB2YXIgcGFuZXMgPSB0aGlzLmdldFBhbmVzKCk7XG4gIHBhbmVzLm92ZXJsYXlNb3VzZVRhcmdldC5hcHBlbmRDaGlsZCh0aGlzLmRpdl8pO1xuXG4gIHZhciB0aGF0ID0gdGhpcztcbiAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkRG9tTGlzdGVuZXIodGhpcy5kaXZfLCAnY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICB0aGF0LnRyaWdnZXJDbHVzdGVyQ2xpY2soKTtcbiAgfSk7XG59O1xuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgcG9zaXRpb24gdG8gcGxhY2UgdGhlIGRpdiBkZW5kaW5nIG9uIHRoZSBsYXRsbmcuXG4gKlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5MYXRMbmd9IGxhdGxuZyBUaGUgcG9zaXRpb24gaW4gbGF0bG5nLlxuICogQHJldHVybiB7Z29vZ2xlLm1hcHMuUG9pbnR9IFRoZSBwb3NpdGlvbiBpbiBwaXhlbHMuXG4gKiBAcHJpdmF0ZVxuICovXG5DbHVzdGVySWNvbi5wcm90b3R5cGUuZ2V0UG9zRnJvbUxhdExuZ18gPSBmdW5jdGlvbihsYXRsbmcpIHtcbiAgdmFyIHBvcyA9IHRoaXMuZ2V0UHJvamVjdGlvbigpLmZyb21MYXRMbmdUb0RpdlBpeGVsKGxhdGxuZyk7XG4gIHBvcy54IC09IHBhcnNlSW50KHRoaXMud2lkdGhfIC8gMiwgMTApO1xuICBwb3MueSAtPSBwYXJzZUludCh0aGlzLmhlaWdodF8gLyAyLCAxMCk7XG4gIHJldHVybiBwb3M7XG59O1xuXG5cbi8qKlxuICogRHJhdyB0aGUgaWNvbi5cbiAqIEBpZ25vcmVcbiAqL1xuQ2x1c3Rlckljb24ucHJvdG90eXBlLmRyYXcgPSBmdW5jdGlvbigpIHtcbiAgaWYgKHRoaXMudmlzaWJsZV8pIHtcbiAgICB2YXIgcG9zID0gdGhpcy5nZXRQb3NGcm9tTGF0TG5nXyh0aGlzLmNlbnRlcl8pO1xuICAgIHRoaXMuZGl2Xy5zdHlsZS50b3AgPSBwb3MueSArICdweCc7XG4gICAgdGhpcy5kaXZfLnN0eWxlLmxlZnQgPSBwb3MueCArICdweCc7XG4gIH1cbn07XG5cblxuLyoqXG4gKiBIaWRlIHRoZSBpY29uLlxuICovXG5DbHVzdGVySWNvbi5wcm90b3R5cGUuaGlkZSA9IGZ1bmN0aW9uKCkge1xuICBpZiAodGhpcy5kaXZfKSB7XG4gICAgdGhpcy5kaXZfLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIH1cbiAgdGhpcy52aXNpYmxlXyA9IGZhbHNlO1xufTtcblxuXG4vKipcbiAqIFBvc2l0aW9uIGFuZCBzaG93IHRoZSBpY29uLlxuICovXG5DbHVzdGVySWNvbi5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uKCkge1xuICBpZiAodGhpcy5kaXZfKSB7XG4gICAgdmFyIHBvcyA9IHRoaXMuZ2V0UG9zRnJvbUxhdExuZ18odGhpcy5jZW50ZXJfKTtcbiAgICB0aGlzLmRpdl8uc3R5bGUuY3NzVGV4dCA9IHRoaXMuY3JlYXRlQ3NzKHBvcyk7XG4gICAgdGhpcy5kaXZfLnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgfVxuICB0aGlzLnZpc2libGVfID0gdHJ1ZTtcbn07XG5cblxuLyoqXG4gKiBSZW1vdmUgdGhlIGljb24gZnJvbSB0aGUgbWFwXG4gKi9cbkNsdXN0ZXJJY29uLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5zZXRNYXAobnVsbCk7XG59O1xuXG5cbi8qKlxuICogSW1wbGVtZW50YXRpb24gb2YgdGhlIG9uUmVtb3ZlIGludGVyZmFjZS5cbiAqIEBpZ25vcmVcbiAqL1xuQ2x1c3Rlckljb24ucHJvdG90eXBlLm9uUmVtb3ZlID0gZnVuY3Rpb24oKSB7XG4gIGlmICh0aGlzLmRpdl8gJiYgdGhpcy5kaXZfLnBhcmVudE5vZGUpIHtcbiAgICB0aGlzLmhpZGUoKTtcbiAgICB0aGlzLmRpdl8ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLmRpdl8pO1xuICAgIHRoaXMuZGl2XyA9IG51bGw7XG4gIH1cbn07XG5cblxuLyoqXG4gKiBTZXQgdGhlIHN1bXMgb2YgdGhlIGljb24uXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHN1bXMgVGhlIHN1bXMgY29udGFpbmluZzpcbiAqICAgJ3RleHQnOiAoc3RyaW5nKSBUaGUgdGV4dCB0byBkaXNwbGF5IGluIHRoZSBpY29uLlxuICogICAnaW5kZXgnOiAobnVtYmVyKSBUaGUgc3R5bGUgaW5kZXggb2YgdGhlIGljb24uXG4gKi9cbkNsdXN0ZXJJY29uLnByb3RvdHlwZS5zZXRTdW1zID0gZnVuY3Rpb24oc3Vtcykge1xuICB0aGlzLnN1bXNfID0gc3VtcztcbiAgdGhpcy50ZXh0XyA9IHN1bXMudGV4dDtcbiAgdGhpcy5pbmRleF8gPSBzdW1zLmluZGV4O1xuICBpZiAodGhpcy5kaXZfKSB7XG4gICAgdGhpcy5kaXZfLmlubmVySFRNTCA9IHN1bXMudGV4dDtcbiAgfVxuXG4gIHRoaXMudXNlU3R5bGUoKTtcbn07XG5cblxuLyoqXG4gKiBTZXRzIHRoZSBpY29uIHRvIHRoZSB0aGUgc3R5bGVzLlxuICovXG5DbHVzdGVySWNvbi5wcm90b3R5cGUudXNlU3R5bGUgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGluZGV4ID0gTWF0aC5tYXgoMCwgdGhpcy5zdW1zXy5pbmRleCAtIDEpO1xuICBpbmRleCA9IE1hdGgubWluKHRoaXMuc3R5bGVzXy5sZW5ndGggLSAxLCBpbmRleCk7XG4gIHZhciBzdHlsZSA9IHRoaXMuc3R5bGVzX1tpbmRleF07XG4gIHRoaXMudXJsXyA9IHN0eWxlWyd1cmwnXTtcbiAgdGhpcy5oZWlnaHRfID0gc3R5bGVbJ2hlaWdodCddO1xuICB0aGlzLndpZHRoXyA9IHN0eWxlWyd3aWR0aCddO1xuICB0aGlzLnRleHRDb2xvcl8gPSBzdHlsZVsndGV4dENvbG9yJ107XG4gIHRoaXMuYW5jaG9yXyA9IHN0eWxlWydhbmNob3InXTtcbiAgdGhpcy50ZXh0U2l6ZV8gPSBzdHlsZVsndGV4dFNpemUnXTtcbiAgdGhpcy5mb250RmFtaWx5XyA9IHN0eWxlWydmb250RmFtaWx5J107XG4gIHRoaXMuZm9udFdlaWdodF8gPSBzdHlsZVsnZm9udFdlaWdodCddO1xuICB0aGlzLmJhY2tncm91bmRQb3NpdGlvbl8gPSBzdHlsZVsnYmFja2dyb3VuZFBvc2l0aW9uJ107XG59O1xuXG5cbi8qKlxuICogU2V0cyB0aGUgY2VudGVyIG9mIHRoZSBpY29uLlxuICpcbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTGF0TG5nfSBjZW50ZXIgVGhlIGxhdGxuZyB0byBzZXQgYXMgdGhlIGNlbnRlci5cbiAqL1xuQ2x1c3Rlckljb24ucHJvdG90eXBlLnNldENlbnRlciA9IGZ1bmN0aW9uKGNlbnRlcikge1xuICB0aGlzLmNlbnRlcl8gPSBjZW50ZXI7XG59O1xuXG5cbi8qKlxuICogQ3JlYXRlIHRoZSBjc3MgdGV4dCBiYXNlZCBvbiB0aGUgcG9zaXRpb24gb2YgdGhlIGljb24uXG4gKlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5Qb2ludH0gcG9zIFRoZSBwb3NpdGlvbi5cbiAqIEByZXR1cm4ge3N0cmluZ30gVGhlIGNzcyBzdHlsZSB0ZXh0LlxuICovXG5DbHVzdGVySWNvbi5wcm90b3R5cGUuY3JlYXRlQ3NzID0gZnVuY3Rpb24ocG9zKSB7XG4gIHZhciBzdHlsZSA9IFtdO1xuICBzdHlsZS5wdXNoKCdiYWNrZ3JvdW5kLWltYWdlOnVybCgnICsgdGhpcy51cmxfICsgJyk7Jyk7XG4gIHZhciBiYWNrZ3JvdW5kUG9zaXRpb24gPSB0aGlzLmJhY2tncm91bmRQb3NpdGlvbl8gPyB0aGlzLmJhY2tncm91bmRQb3NpdGlvbl8gOiAnMCAwJztcbiAgc3R5bGUucHVzaCgnYmFja2dyb3VuZC1wb3NpdGlvbjonICsgYmFja2dyb3VuZFBvc2l0aW9uICsgJzsnKTtcblxuICBpZiAodHlwZW9mIHRoaXMuYW5jaG9yXyA9PT0gJ29iamVjdCcpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMuYW5jaG9yX1swXSA9PT0gJ251bWJlcicgJiYgdGhpcy5hbmNob3JfWzBdID4gMCAmJlxuICAgICAgICB0aGlzLmFuY2hvcl9bMF0gPCB0aGlzLmhlaWdodF8pIHtcbiAgICAgIHN0eWxlLnB1c2goJ2hlaWdodDonICsgKHRoaXMuaGVpZ2h0XyAtIHRoaXMuYW5jaG9yX1swXSkgK1xuICAgICAgICAgICdweDsgcGFkZGluZy10b3A6JyArIHRoaXMuYW5jaG9yX1swXSArICdweDsnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3R5bGUucHVzaCgnaGVpZ2h0OicgKyB0aGlzLmhlaWdodF8gKyAncHg7IGxpbmUtaGVpZ2h0OicgKyB0aGlzLmhlaWdodF8gK1xuICAgICAgICAgICdweDsnKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB0aGlzLmFuY2hvcl9bMV0gPT09ICdudW1iZXInICYmIHRoaXMuYW5jaG9yX1sxXSA+IDAgJiZcbiAgICAgICAgdGhpcy5hbmNob3JfWzFdIDwgdGhpcy53aWR0aF8pIHtcbiAgICAgIHN0eWxlLnB1c2goJ3dpZHRoOicgKyAodGhpcy53aWR0aF8gLSB0aGlzLmFuY2hvcl9bMV0pICtcbiAgICAgICAgICAncHg7IHBhZGRpbmctbGVmdDonICsgdGhpcy5hbmNob3JfWzFdICsgJ3B4OycpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZS5wdXNoKCd3aWR0aDonICsgdGhpcy53aWR0aF8gKyAncHg7IHRleHQtYWxpZ246Y2VudGVyOycpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBzdHlsZS5wdXNoKCdoZWlnaHQ6JyArIHRoaXMuaGVpZ2h0XyArICdweDsgbGluZS1oZWlnaHQ6JyArXG4gICAgICAgIHRoaXMuaGVpZ2h0XyArICdweDsgd2lkdGg6JyArIHRoaXMud2lkdGhfICsgJ3B4OyB0ZXh0LWFsaWduOmNlbnRlcjsnKTtcbiAgfVxuXG4gIHZhciB0eHRDb2xvciA9IHRoaXMudGV4dENvbG9yXyA/IHRoaXMudGV4dENvbG9yXyA6ICdibGFjayc7XG4gIHZhciB0eHRTaXplID0gdGhpcy50ZXh0U2l6ZV8gPyB0aGlzLnRleHRTaXplXyA6IDExO1xuICB2YXIgZm9udEZhbWlseSA9IHRoaXMuZm9udEZhbWlseV8gPyB0aGlzLmZvbnRGYW1pbHlfIDogJ0FyaWFsLHNhbnMtc2VyaWYnO1xuICB2YXIgZm9udFdlaWdodCA9IHRoaXMuZm9udFdlaWdodF8gPyB0aGlzLmZvbnRXZWlnaHRfIDogJzQwMCc7XG5cbiAgc3R5bGUucHVzaCgnY3Vyc29yOnBvaW50ZXI7IHRvcDonICsgcG9zLnkgKyAncHg7IGxlZnQ6JyArXG4gICAgICBwb3MueCArICdweDsgY29sb3I6JyArIHR4dENvbG9yICsgJzsgcG9zaXRpb246YWJzb2x1dGU7IGZvbnQtc2l6ZTonICtcbiAgICAgIHR4dFNpemUgKyAncHg7IGZvbnQtZmFtaWx5OicgKyBmb250RmFtaWx5ICsgJzsgZm9udC13ZWlnaHQ6JyArIGZvbnRXZWlnaHQgKyAnOycpO1xuICByZXR1cm4gc3R5bGUuam9pbignJyk7XG59O1xuXG5cbi8vIEV4cG9ydCBTeW1ib2xzIGZvciBDbG9zdXJlXG4vLyBJZiB5b3UgYXJlIG5vdCBnb2luZyB0byBjb21waWxlIHdpdGggY2xvc3VyZSB0aGVuIHlvdSBjYW4gcmVtb3ZlIHRoZVxuLy8gY29kZSBiZWxvdy5cbmdsb2JhbFsnTWFya2VyQ2x1c3RlcmVyJ10gPSBNYXJrZXJDbHVzdGVyZXI7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydhZGRNYXJrZXInXSA9IE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuYWRkTWFya2VyO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnYWRkTWFya2VycyddID0gTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5hZGRNYXJrZXJzO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnY2xlYXJNYXJrZXJzJ10gPVxuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuY2xlYXJNYXJrZXJzO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnZml0TWFwVG9NYXJrZXJzJ10gPVxuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZml0TWFwVG9NYXJrZXJzO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnZ2V0Q2FsY3VsYXRvciddID1cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldENhbGN1bGF0b3I7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydnZXRHcmlkU2l6ZSddID1cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldEdyaWRTaXplO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnZ2V0RXh0ZW5kZWRCb3VuZHMnXSA9XG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRFeHRlbmRlZEJvdW5kcztcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ2dldE1hcCddID0gTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRNYXA7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydnZXRNYXJrZXJzJ10gPSBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldE1hcmtlcnM7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydnZXRNYXhab29tJ10gPSBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldE1heFpvb207XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydnZXRTdHlsZXMnXSA9IE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0U3R5bGVzO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnZ2V0VG90YWxDbHVzdGVycyddID1cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldFRvdGFsQ2x1c3RlcnM7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydnZXRUb3RhbE1hcmtlcnMnXSA9XG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRUb3RhbE1hcmtlcnM7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydyZWRyYXcnXSA9IE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUucmVkcmF3O1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsncmVtb3ZlTWFya2VyJ10gPVxuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUucmVtb3ZlTWFya2VyO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsncmVtb3ZlTWFya2VycyddID1cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnJlbW92ZU1hcmtlcnM7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydyZXNldFZpZXdwb3J0J10gPVxuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUucmVzZXRWaWV3cG9ydDtcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ3JlcGFpbnQnXSA9XG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5yZXBhaW50O1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnc2V0Q2FsY3VsYXRvciddID1cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnNldENhbGN1bGF0b3I7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydzZXRHcmlkU2l6ZSddID1cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnNldEdyaWRTaXplO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnc2V0TWF4Wm9vbSddID1cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnNldE1heFpvb207XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydvbkFkZCddID0gTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5vbkFkZDtcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ2RyYXcnXSA9IE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZHJhdztcblxuQ2x1c3Rlci5wcm90b3R5cGVbJ2dldENlbnRlciddID0gQ2x1c3Rlci5wcm90b3R5cGUuZ2V0Q2VudGVyO1xuQ2x1c3Rlci5wcm90b3R5cGVbJ2dldFNpemUnXSA9IENsdXN0ZXIucHJvdG90eXBlLmdldFNpemU7XG5DbHVzdGVyLnByb3RvdHlwZVsnZ2V0TWFya2VycyddID0gQ2x1c3Rlci5wcm90b3R5cGUuZ2V0TWFya2VycztcblxuQ2x1c3Rlckljb24ucHJvdG90eXBlWydvbkFkZCddID0gQ2x1c3Rlckljb24ucHJvdG90eXBlLm9uQWRkO1xuQ2x1c3Rlckljb24ucHJvdG90eXBlWydkcmF3J10gPSBDbHVzdGVySWNvbi5wcm90b3R5cGUuZHJhdztcbkNsdXN0ZXJJY29uLnByb3RvdHlwZVsnb25SZW1vdmUnXSA9IENsdXN0ZXJJY29uLnByb3RvdHlwZS5vblJlbW92ZTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IE1hcmtlckNsdXN0ZXJlcjtcbiIsIi8qKlxuICogalF1ZXJ5IEJhciBSYXRpbmcgUGx1Z2luIHYxLjIuMlxuICpcbiAqIGh0dHA6Ly9naXRodWIuY29tL2FudGVubmFpby9qcXVlcnktYmFyLXJhdGluZ1xuICpcbiAqIENvcHlyaWdodCAoYykgMjAxMi0yMDE2IEthemlrIFBpZXRydXN6ZXdza2lcbiAqXG4gKiBUaGlzIHBsdWdpbiBpcyBhdmFpbGFibGUgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuICogaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAqL1xuKGZ1bmN0aW9uIChmYWN0b3J5KSB7XG4gICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICAvLyBBTURcbiAgICAgICAgZGVmaW5lKFsnanF1ZXJ5J10sIGZhY3RvcnkpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICAgICAgLy8gTm9kZS9Db21tb25KU1xuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZSgnanF1ZXJ5JykpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGJyb3dzZXIgZ2xvYmFsc1xuICAgICAgICBmYWN0b3J5KGpRdWVyeSk7XG4gICAgfVxufShmdW5jdGlvbiAoJCkge1xuXG4gICAgdmFyIEJhclJhdGluZyA9IChmdW5jdGlvbigpIHtcblxuICAgICAgICBmdW5jdGlvbiBCYXJSYXRpbmcoKSB7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgICAgIC8vIHdyYXAgZWxlbWVudCBpbiBhIHdyYXBwZXIgZGl2XG4gICAgICAgICAgICB2YXIgd3JhcEVsZW1lbnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgY2xhc3NlcyA9IFsnYnItd3JhcHBlciddO1xuXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYub3B0aW9ucy50aGVtZSAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKCdici10aGVtZS0nICsgc2VsZi5vcHRpb25zLnRoZW1lKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLndyYXAoJCgnPGRpdiAvPicsIHtcbiAgICAgICAgICAgICAgICAgICAgJ2NsYXNzJzogY2xhc3Nlcy5qb2luKCcgJylcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyB1bndyYXAgZWxlbWVudFxuICAgICAgICAgICAgdmFyIHVud3JhcEVsZW1lbnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLnVud3JhcCgpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gZmluZCBvcHRpb24gYnkgdmFsdWVcbiAgICAgICAgICAgIHZhciBmaW5kT3B0aW9uID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoJC5pc051bWVyaWModmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gTWF0aC5mbG9vcih2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuICQoJ29wdGlvblt2YWx1ZT1cIicgKyB2YWx1ZSAgKyAnXCJdJywgc2VsZi4kZWxlbSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBnZXQgaW5pdGlhbCBvcHRpb25cbiAgICAgICAgICAgIHZhciBnZXRJbml0aWFsT3B0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIGluaXRpYWxSYXRpbmcgPSBzZWxmLm9wdGlvbnMuaW5pdGlhbFJhdGluZztcblxuICAgICAgICAgICAgICAgIGlmICghaW5pdGlhbFJhdGluZykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJCgnb3B0aW9uOnNlbGVjdGVkJywgc2VsZi4kZWxlbSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZpbmRPcHRpb24oaW5pdGlhbFJhdGluZyk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBnZXQgZW1wdHkgb3B0aW9uXG4gICAgICAgICAgICB2YXIgZ2V0RW1wdHlPcHRpb24gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgJGVtcHR5T3B0ID0gc2VsZi4kZWxlbS5maW5kKCdvcHRpb25bdmFsdWU9XCInICsgc2VsZi5vcHRpb25zLmVtcHR5VmFsdWUgKyAnXCJdJyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoISRlbXB0eU9wdC5sZW5ndGggJiYgc2VsZi5vcHRpb25zLmFsbG93RW1wdHkpIHtcbiAgICAgICAgICAgICAgICAgICAgJGVtcHR5T3B0ID0gJCgnPG9wdGlvbiAvPicsIHsgJ3ZhbHVlJzogc2VsZi5vcHRpb25zLmVtcHR5VmFsdWUgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRlbXB0eU9wdC5wcmVwZW5kVG8oc2VsZi4kZWxlbSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuICRlbXB0eU9wdDtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIGdldCBkYXRhXG4gICAgICAgICAgICB2YXIgZ2V0RGF0YSA9IGZ1bmN0aW9uKGtleSkge1xuICAgICAgICAgICAgICAgIHZhciBkYXRhID0gc2VsZi4kZWxlbS5kYXRhKCdiYXJyYXRpbmcnKTtcblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Yga2V5ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YVtrZXldO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gc2V0IGRhdGFcbiAgICAgICAgICAgIHZhciBzZXREYXRhID0gZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0uZGF0YSgnYmFycmF0aW5nJywgdmFsdWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0uZGF0YSgnYmFycmF0aW5nJylba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIHNhdmUgZGF0YSBvbiBlbGVtZW50XG4gICAgICAgICAgICB2YXIgc2F2ZURhdGFPbkVsZW1lbnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgJG9wdCA9IGdldEluaXRpYWxPcHRpb24oKTtcbiAgICAgICAgICAgICAgICB2YXIgJGVtcHR5T3B0ID0gZ2V0RW1wdHlPcHRpb24oKTtcblxuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9ICRvcHQudmFsKCk7XG4gICAgICAgICAgICAgICAgdmFyIHRleHQgPSAkb3B0LmRhdGEoJ2h0bWwnKSA/ICRvcHQuZGF0YSgnaHRtbCcpIDogJG9wdC50ZXh0KCk7XG5cbiAgICAgICAgICAgICAgICAvLyBpZiB0aGUgYWxsb3dFbXB0eSBvcHRpb24gaXMgbm90IHNldCBsZXQncyBjaGVjayBpZiBlbXB0eSBvcHRpb24gZXhpc3RzIGluIHRoZSBzZWxlY3QgZmllbGRcbiAgICAgICAgICAgICAgICB2YXIgYWxsb3dFbXB0eSA9IChzZWxmLm9wdGlvbnMuYWxsb3dFbXB0eSAhPT0gbnVsbCkgP1xuICAgICAgICAgICAgICAgICAgICBzZWxmLm9wdGlvbnMuYWxsb3dFbXB0eSA6XG4gICAgICAgICAgICAgICAgICAgICEhJGVtcHR5T3B0Lmxlbmd0aDtcblxuICAgICAgICAgICAgICAgIHZhciBlbXB0eVZhbHVlID0gKCRlbXB0eU9wdC5sZW5ndGgpID8gJGVtcHR5T3B0LnZhbCgpIDogbnVsbDtcbiAgICAgICAgICAgICAgICB2YXIgZW1wdHlUZXh0ID0gKCRlbXB0eU9wdC5sZW5ndGgpID8gJGVtcHR5T3B0LnRleHQoKSA6IG51bGw7XG5cbiAgICAgICAgICAgICAgICBzZXREYXRhKG51bGwsIHtcbiAgICAgICAgICAgICAgICAgICAgdXNlck9wdGlvbnM6IHNlbGYub3B0aW9ucyxcblxuICAgICAgICAgICAgICAgICAgICAvLyBpbml0aWFsIHJhdGluZyBiYXNlZCBvbiB0aGUgT1BUSU9OIHZhbHVlXG4gICAgICAgICAgICAgICAgICAgIHJhdGluZ1ZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgcmF0aW5nVGV4dDogdGV4dCxcblxuICAgICAgICAgICAgICAgICAgICAvLyByYXRpbmcgd2lsbCBiZSByZXN0b3JlZCBieSBjYWxsaW5nIGNsZWFyIG1ldGhvZFxuICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbFJhdGluZ1ZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxSYXRpbmdUZXh0OiB0ZXh0LFxuXG4gICAgICAgICAgICAgICAgICAgIC8vIGFsbG93IGVtcHR5IHJhdGluZ3M/XG4gICAgICAgICAgICAgICAgICAgIGFsbG93RW1wdHk6IGFsbG93RW1wdHksXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gcmF0aW5nIHZhbHVlIGFuZCB0ZXh0IG9mIHRoZSBlbXB0eSBPUFRJT05cbiAgICAgICAgICAgICAgICAgICAgZW1wdHlSYXRpbmdWYWx1ZTogZW1wdHlWYWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgZW1wdHlSYXRpbmdUZXh0OiBlbXB0eVRleHQsXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gcmVhZC1vbmx5IHN0YXRlXG4gICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiBzZWxmLm9wdGlvbnMucmVhZG9ubHksXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gZGlkIHRoZSB1c2VyIGFscmVhZHkgc2VsZWN0IGEgcmF0aW5nP1xuICAgICAgICAgICAgICAgICAgICByYXRpbmdNYWRlOiBmYWxzZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gcmVtb3ZlIGRhdGEgb24gZWxlbWVudFxuICAgICAgICAgICAgdmFyIHJlbW92ZURhdGFPbkVsZW1lbnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLnJlbW92ZURhdGEoJ2JhcnJhdGluZycpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gcmV0dXJuIGN1cnJlbnQgcmF0aW5nIHRleHRcbiAgICAgICAgICAgIHZhciByYXRpbmdUZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGdldERhdGEoJ3JhdGluZ1RleHQnKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIHJldHVybiBjdXJyZW50IHJhdGluZyB2YWx1ZVxuICAgICAgICAgICAgdmFyIHJhdGluZ1ZhbHVlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGdldERhdGEoJ3JhdGluZ1ZhbHVlJyk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBidWlsZCB3aWRnZXQgYW5kIHJldHVybiBqUXVlcnkgZWxlbWVudFxuICAgICAgICAgICAgdmFyIGJ1aWxkV2lkZ2V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyICR3ID0gJCgnPGRpdiAvPicsIHsgJ2NsYXNzJzogJ2JyLXdpZGdldCcgfSk7XG5cbiAgICAgICAgICAgICAgICAvLyBjcmVhdGUgQSBlbGVtZW50cyB0aGF0IHdpbGwgcmVwbGFjZSBPUFRJT05zXG4gICAgICAgICAgICAgICAgc2VsZi4kZWxlbS5maW5kKCdvcHRpb24nKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdmFsLCB0ZXh0LCBodG1sLCAkYTtcblxuICAgICAgICAgICAgICAgICAgICB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNyZWF0ZSByYXRpbmdzIC0gYnV0IG9ubHkgaWYgdmFsIGlzIG5vdCBkZWZpbmVkIGFzIGVtcHR5XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWwgIT09IGdldERhdGEoJ2VtcHR5UmF0aW5nVmFsdWUnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dCA9ICQodGhpcykudGV4dCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaHRtbCA9ICQodGhpcykuZGF0YSgnaHRtbCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGh0bWwpIHsgdGV4dCA9IGh0bWw7IH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgJGEgPSAkKCc8YSAvPicsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnaHJlZic6ICcjJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZGF0YS1yYXRpbmctdmFsdWUnOiB2YWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2RhdGEtcmF0aW5nLXRleHQnOiB0ZXh0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdodG1sJzogKHNlbGYub3B0aW9ucy5zaG93VmFsdWVzKSA/IHRleHQgOiAnJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICR3LmFwcGVuZCgkYSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgLy8gYXBwZW5kIC5ici1jdXJyZW50LXJhdGluZyBkaXYgdG8gdGhlIHdpZGdldFxuICAgICAgICAgICAgICAgIGlmIChzZWxmLm9wdGlvbnMuc2hvd1NlbGVjdGVkUmF0aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICR3LmFwcGVuZCgkKCc8ZGl2IC8+JywgeyAndGV4dCc6ICcnLCAnY2xhc3MnOiAnYnItY3VycmVudC1yYXRpbmcnIH0pKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBhZGRpdGlvbmFsIGNsYXNzZXMgZm9yIHRoZSB3aWRnZXRcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5vcHRpb25zLnJldmVyc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgJHcuYWRkQ2xhc3MoJ2JyLXJldmVyc2UnKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5vcHRpb25zLnJlYWRvbmx5KSB7XG4gICAgICAgICAgICAgICAgICAgICR3LmFkZENsYXNzKCdici1yZWFkb25seScpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiAkdztcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIHJldHVybiBhIGpRdWVyeSBmdW5jdGlvbiBuYW1lIGRlcGVuZGluZyBvbiB0aGUgJ3JldmVyc2UnIHNldHRpbmdcbiAgICAgICAgICAgIHZhciBuZXh0QWxsb3JQcmV2aW91c0FsbCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmIChnZXREYXRhKCd1c2VyT3B0aW9ucycpLnJldmVyc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICduZXh0QWxsJztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3ByZXZBbGwnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIHNldCB0aGUgdmFsdWUgb2YgdGhlIHNlbGVjdCBmaWVsZFxuICAgICAgICAgICAgdmFyIHNldFNlbGVjdEZpZWxkVmFsdWUgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgIC8vIGNoYW5nZSBzZWxlY3RlZCBvcHRpb25cbiAgICAgICAgICAgICAgICBmaW5kT3B0aW9uKHZhbHVlKS5wcm9wKCdzZWxlY3RlZCcsIHRydWUpO1xuXG4gICAgICAgICAgICAgICAgc2VsZi4kZWxlbS5jaGFuZ2UoKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIHJlc2V0IHNlbGVjdCBmaWVsZFxuICAgICAgICAgICAgdmFyIHJlc2V0U2VsZWN0RmllbGQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkKCdvcHRpb24nLCBzZWxmLiRlbGVtKS5wcm9wKCdzZWxlY3RlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kZWZhdWx0U2VsZWN0ZWQ7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLmNoYW5nZSgpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gZGlzcGxheSB0aGUgY3VycmVudGx5IHNlbGVjdGVkIHJhdGluZ1xuICAgICAgICAgICAgdmFyIHNob3dTZWxlY3RlZFJhdGluZyA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgICAgICAgICAgICAgICAvLyB0ZXh0IHVuZGVmaW5lZD9cbiAgICAgICAgICAgICAgICB0ZXh0ID0gdGV4dCA/IHRleHQgOiByYXRpbmdUZXh0KCk7XG5cbiAgICAgICAgICAgICAgICAvLyBzcGVjaWFsIGNhc2Ugd2hlbiB0aGUgc2VsZWN0ZWQgcmF0aW5nIGlzIGRlZmluZWQgYXMgZW1wdHlcbiAgICAgICAgICAgICAgICBpZiAodGV4dCA9PSBnZXREYXRhKCdlbXB0eVJhdGluZ1RleHQnKSkge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0ID0gJyc7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gdXBkYXRlIC5ici1jdXJyZW50LXJhdGluZyBkaXZcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5vcHRpb25zLnNob3dTZWxlY3RlZFJhdGluZykge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLnBhcmVudCgpLmZpbmQoJy5ici1jdXJyZW50LXJhdGluZycpLnRleHQodGV4dCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gcmV0dXJuIHJvdW5kZWQgZnJhY3Rpb24gb2YgYSB2YWx1ZSAoMTQuNCAtPiA0MCwgMC45OSAtPiA5MClcbiAgICAgICAgICAgIHZhciBmcmFjdGlvbiA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGgucm91bmQoKChNYXRoLmZsb29yKHZhbHVlICogMTApIC8gMTApICUgMSkgKiAxMDApO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gcmVtb3ZlIGFsbCBjbGFzc2VzIGZyb20gZWxlbWVudHNcbiAgICAgICAgICAgIHZhciByZXNldFN0eWxlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGFsbCBjbGFzc2VzIHN0YXJ0aW5nIHdpdGggYnItKlxuICAgICAgICAgICAgICAgIHNlbGYuJHdpZGdldC5maW5kKCdhJykucmVtb3ZlQ2xhc3MoZnVuY3Rpb24oaW5kZXgsIGNsYXNzZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChjbGFzc2VzLm1hdGNoKC8oXnxcXHMpYnItXFxTKy9nKSB8fCBbXSkuam9pbignICcpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gYXBwbHkgc3R5bGUgYnkgc2V0dGluZyBjbGFzc2VzIG9uIGVsZW1lbnRzXG4gICAgICAgICAgICB2YXIgYXBwbHlTdHlsZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciAkYSA9IHNlbGYuJHdpZGdldC5maW5kKCdhW2RhdGEtcmF0aW5nLXZhbHVlPVwiJyArIHJhdGluZ1ZhbHVlKCkgKyAnXCJdJyk7XG4gICAgICAgICAgICAgICAgdmFyIGluaXRpYWxSYXRpbmcgPSBnZXREYXRhKCd1c2VyT3B0aW9ucycpLmluaXRpYWxSYXRpbmc7XG4gICAgICAgICAgICAgICAgdmFyIGJhc2VWYWx1ZSA9ICQuaXNOdW1lcmljKHJhdGluZ1ZhbHVlKCkpID8gcmF0aW5nVmFsdWUoKSA6IDA7XG4gICAgICAgICAgICAgICAgdmFyIGYgPSBmcmFjdGlvbihpbml0aWFsUmF0aW5nKTtcbiAgICAgICAgICAgICAgICB2YXIgJGFsbCwgJGZyYWN0aW9uYWw7XG5cbiAgICAgICAgICAgICAgICByZXNldFN0eWxlKCk7XG5cbiAgICAgICAgICAgICAgICAvLyBhZGQgY2xhc3Nlc1xuICAgICAgICAgICAgICAgICRhLmFkZENsYXNzKCdici1zZWxlY3RlZCBici1jdXJyZW50JylbbmV4dEFsbG9yUHJldmlvdXNBbGwoKV0oKVxuICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2JyLXNlbGVjdGVkJyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWdldERhdGEoJ3JhdGluZ01hZGUnKSAmJiAkLmlzTnVtZXJpYyhpbml0aWFsUmF0aW5nKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoKGluaXRpYWxSYXRpbmcgPD0gYmFzZVZhbHVlKSB8fCAhZikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgJGFsbCA9IHNlbGYuJHdpZGdldC5maW5kKCdhJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgJGZyYWN0aW9uYWwgPSAoJGEubGVuZ3RoKSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAkYVsoZ2V0RGF0YSgndXNlck9wdGlvbnMnKS5yZXZlcnNlKSA/ICdwcmV2JyA6ICduZXh0J10oKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAkYWxsWyhnZXREYXRhKCd1c2VyT3B0aW9ucycpLnJldmVyc2UpID8gJ2xhc3QnIDogJ2ZpcnN0J10oKTtcblxuICAgICAgICAgICAgICAgICAgICAkZnJhY3Rpb25hbC5hZGRDbGFzcygnYnItZnJhY3Rpb25hbCcpO1xuICAgICAgICAgICAgICAgICAgICAkZnJhY3Rpb25hbC5hZGRDbGFzcygnYnItZnJhY3Rpb25hbC0nICsgZik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gY2hlY2sgaWYgdGhlIGVsZW1lbnQgaXMgZGVzZWxlY3RhYmxlP1xuICAgICAgICAgICAgdmFyIGlzRGVzZWxlY3RhYmxlID0gZnVuY3Rpb24oJGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWdldERhdGEoJ2FsbG93RW1wdHknKSB8fCAhZ2V0RGF0YSgndXNlck9wdGlvbnMnKS5kZXNlbGVjdGFibGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiAocmF0aW5nVmFsdWUoKSA9PSAkZWxlbWVudC5hdHRyKCdkYXRhLXJhdGluZy12YWx1ZScpKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIGhhbmRsZSBjbGljayBldmVudHNcbiAgICAgICAgICAgIHZhciBhdHRhY2hDbGlja0hhbmRsZXIgPSBmdW5jdGlvbigkZWxlbWVudHMpIHtcbiAgICAgICAgICAgICAgICAkZWxlbWVudHMub24oJ2NsaWNrLmJhcnJhdGluZycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciAkYSA9ICQodGhpcyksXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zID0gZ2V0RGF0YSgndXNlck9wdGlvbnMnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDtcblxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gJGEuYXR0cignZGF0YS1yYXRpbmctdmFsdWUnKTtcbiAgICAgICAgICAgICAgICAgICAgdGV4dCA9ICRhLmF0dHIoJ2RhdGEtcmF0aW5nLXRleHQnKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBpcyBjdXJyZW50IGFuZCBkZXNlbGVjdGFibGU/XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0Rlc2VsZWN0YWJsZSgkYSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gZ2V0RGF0YSgnZW1wdHlSYXRpbmdWYWx1ZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dCA9IGdldERhdGEoJ2VtcHR5UmF0aW5nVGV4dCcpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gcmVtZW1iZXIgc2VsZWN0ZWQgcmF0aW5nXG4gICAgICAgICAgICAgICAgICAgIHNldERhdGEoJ3JhdGluZ1ZhbHVlJywgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBzZXREYXRhKCdyYXRpbmdUZXh0JywgdGV4dCk7XG4gICAgICAgICAgICAgICAgICAgIHNldERhdGEoJ3JhdGluZ01hZGUnLCB0cnVlKTtcblxuICAgICAgICAgICAgICAgICAgICBzZXRTZWxlY3RGaWVsZFZhbHVlKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgc2hvd1NlbGVjdGVkUmF0aW5nKHRleHQpO1xuXG4gICAgICAgICAgICAgICAgICAgIGFwcGx5U3R5bGUoKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBvblNlbGVjdCBjYWxsYmFja1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLm9uU2VsZWN0LmNhbGwoXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmF0aW5nVmFsdWUoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhdGluZ1RleHQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50XG4gICAgICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gaGFuZGxlIG1vdXNlZW50ZXIgZXZlbnRzXG4gICAgICAgICAgICB2YXIgYXR0YWNoTW91c2VFbnRlckhhbmRsZXIgPSBmdW5jdGlvbigkZWxlbWVudHMpIHtcbiAgICAgICAgICAgICAgICAkZWxlbWVudHMub24oJ21vdXNlZW50ZXIuYmFycmF0aW5nJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciAkYSA9ICQodGhpcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmVzZXRTdHlsZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICRhLmFkZENsYXNzKCdici1hY3RpdmUnKVtuZXh0QWxsb3JQcmV2aW91c0FsbCgpXSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2JyLWFjdGl2ZScpO1xuXG4gICAgICAgICAgICAgICAgICAgIHNob3dTZWxlY3RlZFJhdGluZygkYS5hdHRyKCdkYXRhLXJhdGluZy10ZXh0JykpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gaGFuZGxlIG1vdXNlbGVhdmUgZXZlbnRzXG4gICAgICAgICAgICB2YXIgYXR0YWNoTW91c2VMZWF2ZUhhbmRsZXIgPSBmdW5jdGlvbigkZWxlbWVudHMpIHtcbiAgICAgICAgICAgICAgICBzZWxmLiR3aWRnZXQub24oJ21vdXNlbGVhdmUuYmFycmF0aW5nIGJsdXIuYmFycmF0aW5nJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHNob3dTZWxlY3RlZFJhdGluZygpO1xuICAgICAgICAgICAgICAgICAgICBhcHBseVN0eWxlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBzb21ld2hhdCBwcmltaXRpdmUgd2F5IHRvIHJlbW92ZSAzMDBtcyBjbGljayBkZWxheSBvbiB0b3VjaCBkZXZpY2VzXG4gICAgICAgICAgICAvLyBmb3IgYSBtb3JlIGFkdmFuY2VkIHNvbHV0aW9uIGNvbnNpZGVyIHNldHRpbmcgYGZhc3RDbGlja3NgIG9wdGlvbiB0byBmYWxzZVxuICAgICAgICAgICAgLy8gYW5kIHVzaW5nIGEgbGlicmFyeSBzdWNoIGFzIGZhc3RjbGljayAoaHR0cHM6Ly9naXRodWIuY29tL2Z0bGFicy9mYXN0Y2xpY2spXG4gICAgICAgICAgICB2YXIgZmFzdENsaWNrcyA9IGZ1bmN0aW9uKCRlbGVtZW50cykge1xuICAgICAgICAgICAgICAgICRlbGVtZW50cy5vbigndG91Y2hzdGFydC5iYXJyYXRpbmcnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmNsaWNrKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBkaXNhYmxlIGNsaWNrc1xuICAgICAgICAgICAgdmFyIGRpc2FibGVDbGlja3MgPSBmdW5jdGlvbigkZWxlbWVudHMpIHtcbiAgICAgICAgICAgICAgICAkZWxlbWVudHMub24oJ2NsaWNrLmJhcnJhdGluZycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB2YXIgYXR0YWNoSGFuZGxlcnMgPSBmdW5jdGlvbigkZWxlbWVudHMpIHtcbiAgICAgICAgICAgICAgICAvLyBhdHRhY2ggY2xpY2sgZXZlbnQgaGFuZGxlclxuICAgICAgICAgICAgICAgIGF0dGFjaENsaWNrSGFuZGxlcigkZWxlbWVudHMpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYub3B0aW9ucy5ob3ZlclN0YXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGF0dGFjaCBtb3VzZWVudGVyIGV2ZW50IGhhbmRsZXJcbiAgICAgICAgICAgICAgICAgICAgYXR0YWNoTW91c2VFbnRlckhhbmRsZXIoJGVsZW1lbnRzKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBhdHRhY2ggbW91c2VsZWF2ZSBldmVudCBoYW5kbGVyXG4gICAgICAgICAgICAgICAgICAgIGF0dGFjaE1vdXNlTGVhdmVIYW5kbGVyKCRlbGVtZW50cyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdmFyIGRldGFjaEhhbmRsZXJzID0gZnVuY3Rpb24oJGVsZW1lbnRzKSB7XG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGV2ZW50IGhhbmRsZXJzIGluIHRoZSBcIi5iYXJyYXRpbmdcIiBuYW1lc3BhY2VcbiAgICAgICAgICAgICAgICAkZWxlbWVudHMub2ZmKCcuYmFycmF0aW5nJyk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB2YXIgc2V0dXBIYW5kbGVycyA9IGZ1bmN0aW9uKHJlYWRvbmx5KSB7XG4gICAgICAgICAgICAgICAgdmFyICRlbGVtZW50cyA9IHNlbGYuJHdpZGdldC5maW5kKCdhJyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZmFzdENsaWNrcykge1xuICAgICAgICAgICAgICAgICAgICBmYXN0Q2xpY2tzKCRlbGVtZW50cyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHJlYWRvbmx5KSB7XG4gICAgICAgICAgICAgICAgICAgIGRldGFjaEhhbmRsZXJzKCRlbGVtZW50cyk7XG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVDbGlja3MoJGVsZW1lbnRzKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhdHRhY2hIYW5kbGVycygkZWxlbWVudHMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMuc2hvdyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIC8vIHJ1biBvbmx5IG9uY2VcbiAgICAgICAgICAgICAgICBpZiAoZ2V0RGF0YSgpKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICAvLyB3cmFwIGVsZW1lbnRcbiAgICAgICAgICAgICAgICB3cmFwRWxlbWVudCgpO1xuXG4gICAgICAgICAgICAgICAgLy8gc2F2ZSBkYXRhXG4gICAgICAgICAgICAgICAgc2F2ZURhdGFPbkVsZW1lbnQoKTtcblxuICAgICAgICAgICAgICAgIC8vIGJ1aWxkICYgYXBwZW5kIHdpZGdldCB0byB0aGUgRE9NXG4gICAgICAgICAgICAgICAgc2VsZi4kd2lkZ2V0ID0gYnVpbGRXaWRnZXQoKTtcbiAgICAgICAgICAgICAgICBzZWxmLiR3aWRnZXQuaW5zZXJ0QWZ0ZXIoc2VsZi4kZWxlbSk7XG5cbiAgICAgICAgICAgICAgICBhcHBseVN0eWxlKCk7XG5cbiAgICAgICAgICAgICAgICBzaG93U2VsZWN0ZWRSYXRpbmcoKTtcblxuICAgICAgICAgICAgICAgIHNldHVwSGFuZGxlcnMoc2VsZi5vcHRpb25zLnJlYWRvbmx5KTtcblxuICAgICAgICAgICAgICAgIC8vIGhpZGUgdGhlIHNlbGVjdCBmaWVsZFxuICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0uaGlkZSgpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy5yZWFkb25seSA9IGZ1bmN0aW9uKHN0YXRlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzdGF0ZSAhPT0gJ2Jvb2xlYW4nIHx8IGdldERhdGEoJ3JlYWRPbmx5JykgPT0gc3RhdGUpIHJldHVybjtcblxuICAgICAgICAgICAgICAgIHNldHVwSGFuZGxlcnMoc3RhdGUpO1xuICAgICAgICAgICAgICAgIHNldERhdGEoJ3JlYWRPbmx5Jywgc3RhdGUpO1xuICAgICAgICAgICAgICAgIHNlbGYuJHdpZGdldC50b2dnbGVDbGFzcygnYnItcmVhZG9ubHknKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMuc2V0ID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgb3B0aW9ucyA9IGdldERhdGEoJ3VzZXJPcHRpb25zJyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoc2VsZi4kZWxlbS5maW5kKCdvcHRpb25bdmFsdWU9XCInICsgdmFsdWUgKyAnXCJdJykubGVuZ3RoID09PSAwKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICAvLyBzZXQgZGF0YVxuICAgICAgICAgICAgICAgIHNldERhdGEoJ3JhdGluZ1ZhbHVlJywgdmFsdWUpO1xuICAgICAgICAgICAgICAgIHNldERhdGEoJ3JhdGluZ1RleHQnLCBzZWxmLiRlbGVtLmZpbmQoJ29wdGlvblt2YWx1ZT1cIicgKyB2YWx1ZSArICdcIl0nKS50ZXh0KCkpO1xuICAgICAgICAgICAgICAgIHNldERhdGEoJ3JhdGluZ01hZGUnLCB0cnVlKTtcblxuICAgICAgICAgICAgICAgIHNldFNlbGVjdEZpZWxkVmFsdWUocmF0aW5nVmFsdWUoKSk7XG4gICAgICAgICAgICAgICAgc2hvd1NlbGVjdGVkUmF0aW5nKHJhdGluZ1RleHQoKSk7XG5cbiAgICAgICAgICAgICAgICBhcHBseVN0eWxlKCk7XG5cbiAgICAgICAgICAgICAgICAvLyBvblNlbGVjdCBjYWxsYmFja1xuICAgICAgICAgICAgICAgIGlmICghb3B0aW9ucy5zaWxlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5vblNlbGVjdC5jYWxsKFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhdGluZ1ZhbHVlKCksXG4gICAgICAgICAgICAgICAgICAgICAgICByYXRpbmdUZXh0KClcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLmNsZWFyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSBnZXREYXRhKCd1c2VyT3B0aW9ucycpO1xuXG4gICAgICAgICAgICAgICAgLy8gcmVzdG9yZSBvcmlnaW5hbCBkYXRhXG4gICAgICAgICAgICAgICAgc2V0RGF0YSgncmF0aW5nVmFsdWUnLCBnZXREYXRhKCdvcmlnaW5hbFJhdGluZ1ZhbHVlJykpO1xuICAgICAgICAgICAgICAgIHNldERhdGEoJ3JhdGluZ1RleHQnLCBnZXREYXRhKCdvcmlnaW5hbFJhdGluZ1RleHQnKSk7XG4gICAgICAgICAgICAgICAgc2V0RGF0YSgncmF0aW5nTWFkZScsIGZhbHNlKTtcblxuICAgICAgICAgICAgICAgIHJlc2V0U2VsZWN0RmllbGQoKTtcbiAgICAgICAgICAgICAgICBzaG93U2VsZWN0ZWRSYXRpbmcocmF0aW5nVGV4dCgpKTtcblxuICAgICAgICAgICAgICAgIGFwcGx5U3R5bGUoKTtcblxuICAgICAgICAgICAgICAgIC8vIG9uQ2xlYXIgY2FsbGJhY2tcbiAgICAgICAgICAgICAgICBvcHRpb25zLm9uQ2xlYXIuY2FsbChcbiAgICAgICAgICAgICAgICAgICAgdGhpcyxcbiAgICAgICAgICAgICAgICAgICAgcmF0aW5nVmFsdWUoKSxcbiAgICAgICAgICAgICAgICAgICAgcmF0aW5nVGV4dCgpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMuZGVzdHJveSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IHJhdGluZ1ZhbHVlKCk7XG4gICAgICAgICAgICAgICAgdmFyIHRleHQgPSByYXRpbmdUZXh0KCk7XG4gICAgICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSBnZXREYXRhKCd1c2VyT3B0aW9ucycpO1xuXG4gICAgICAgICAgICAgICAgLy8gZGV0YWNoIGhhbmRsZXJzXG4gICAgICAgICAgICAgICAgZGV0YWNoSGFuZGxlcnMoc2VsZi4kd2lkZ2V0LmZpbmQoJ2EnKSk7XG5cbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgd2lkZ2V0XG4gICAgICAgICAgICAgICAgc2VsZi4kd2lkZ2V0LnJlbW92ZSgpO1xuXG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGRhdGFcbiAgICAgICAgICAgICAgICByZW1vdmVEYXRhT25FbGVtZW50KCk7XG5cbiAgICAgICAgICAgICAgICAvLyB1bndyYXAgdGhlIGVsZW1lbnRcbiAgICAgICAgICAgICAgICB1bndyYXBFbGVtZW50KCk7XG5cbiAgICAgICAgICAgICAgICAvLyBzaG93IHRoZSBlbGVtZW50XG4gICAgICAgICAgICAgICAgc2VsZi4kZWxlbS5zaG93KCk7XG5cbiAgICAgICAgICAgICAgICAvLyBvbkRlc3Ryb3kgY2FsbGJhY2tcbiAgICAgICAgICAgICAgICBvcHRpb25zLm9uRGVzdHJveS5jYWxsKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgdGV4dFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgQmFyUmF0aW5nLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKG9wdGlvbnMsIGVsZW0pIHtcbiAgICAgICAgICAgIHRoaXMuJGVsZW0gPSAkKGVsZW0pO1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zID0gJC5leHRlbmQoe30sICQuZm4uYmFycmF0aW5nLmRlZmF1bHRzLCBvcHRpb25zKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucztcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gQmFyUmF0aW5nO1xuICAgIH0pKCk7XG5cbiAgICAkLmZuLmJhcnJhdGluZyA9IGZ1bmN0aW9uIChtZXRob2QsIG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcGx1Z2luID0gbmV3IEJhclJhdGluZygpO1xuXG4gICAgICAgICAgICAvLyBwbHVnaW4gd29ya3Mgd2l0aCBzZWxlY3QgZmllbGRzXG4gICAgICAgICAgICBpZiAoISQodGhpcykuaXMoJ3NlbGVjdCcpKSB7XG4gICAgICAgICAgICAgICAgJC5lcnJvcignU29ycnksIHRoaXMgcGx1Z2luIG9ubHkgd29ya3Mgd2l0aCBzZWxlY3QgZmllbGRzLicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBtZXRob2Qgc3VwcGxpZWRcbiAgICAgICAgICAgIGlmIChwbHVnaW4uaGFzT3duUHJvcGVydHkobWV0aG9kKSkge1xuICAgICAgICAgICAgICAgIHBsdWdpbi5pbml0KG9wdGlvbnMsIHRoaXMpO1xuICAgICAgICAgICAgICAgIGlmIChtZXRob2QgPT09ICdzaG93Jykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGx1Z2luLnNob3cob3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gcGx1Z2luIGV4aXN0cz9cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBsdWdpbi4kZWxlbS5kYXRhKCdiYXJyYXRpbmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGx1Z2luLiR3aWRnZXQgPSAkKHRoaXMpLm5leHQoJy5ici13aWRnZXQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwbHVnaW5bbWV0aG9kXShvcHRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gbm8gbWV0aG9kIHN1cHBsaWVkIG9yIG9ubHkgb3B0aW9ucyBzdXBwbGllZFxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgbWV0aG9kID09PSAnb2JqZWN0JyB8fCAhbWV0aG9kKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucyA9IG1ldGhvZDtcbiAgICAgICAgICAgICAgICBwbHVnaW4uaW5pdChvcHRpb25zLCB0aGlzKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGx1Z2luLnNob3coKTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkLmVycm9yKCdNZXRob2QgJyArIG1ldGhvZCArICcgZG9lcyBub3QgZXhpc3Qgb24galF1ZXJ5LmJhcnJhdGluZycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgJC5mbi5iYXJyYXRpbmcuZGVmYXVsdHMgPSB7XG4gICAgICAgIHRoZW1lOicnLFxuICAgICAgICBpbml0aWFsUmF0aW5nOm51bGwsIC8vIGluaXRpYWwgcmF0aW5nXG4gICAgICAgIGFsbG93RW1wdHk6bnVsbCwgLy8gYWxsb3cgZW1wdHkgcmF0aW5ncz9cbiAgICAgICAgZW1wdHlWYWx1ZTonJywgLy8gdGhpcyBpcyB0aGUgZXhwZWN0ZWQgdmFsdWUgb2YgdGhlIGVtcHR5IHJhdGluZ1xuICAgICAgICBzaG93VmFsdWVzOmZhbHNlLCAvLyBkaXNwbGF5IHJhdGluZyB2YWx1ZXMgb24gdGhlIGJhcnM/XG4gICAgICAgIHNob3dTZWxlY3RlZFJhdGluZzp0cnVlLCAvLyBhcHBlbmQgYSBkaXYgd2l0aCBhIHJhdGluZyB0byB0aGUgd2lkZ2V0P1xuICAgICAgICBkZXNlbGVjdGFibGU6dHJ1ZSwgLy8gYWxsb3cgdG8gZGVzZWxlY3QgcmF0aW5ncz9cbiAgICAgICAgcmV2ZXJzZTpmYWxzZSwgLy8gcmV2ZXJzZSB0aGUgcmF0aW5nP1xuICAgICAgICByZWFkb25seTpmYWxzZSwgLy8gbWFrZSB0aGUgcmF0aW5nIHJlYWR5LW9ubHk/XG4gICAgICAgIGZhc3RDbGlja3M6dHJ1ZSwgLy8gcmVtb3ZlIDMwMG1zIGNsaWNrIGRlbGF5IG9uIHRvdWNoIGRldmljZXM/XG4gICAgICAgIGhvdmVyU3RhdGU6dHJ1ZSwgLy8gY2hhbmdlIHN0YXRlIG9uIGhvdmVyP1xuICAgICAgICBzaWxlbnQ6ZmFsc2UsIC8vIHN1cHJlc3MgY2FsbGJhY2tzIHdoZW4gY29udHJvbGxpbmcgcmF0aW5ncyBwcm9ncmFtYXRpY2FsbHlcbiAgICAgICAgb25TZWxlY3Q6ZnVuY3Rpb24gKHZhbHVlLCB0ZXh0LCBldmVudCkge1xuICAgICAgICB9LCAvLyBjYWxsYmFjayBmaXJlZCB3aGVuIGEgcmF0aW5nIGlzIHNlbGVjdGVkXG4gICAgICAgIG9uQ2xlYXI6ZnVuY3Rpb24gKHZhbHVlLCB0ZXh0KSB7XG4gICAgICAgIH0sIC8vIGNhbGxiYWNrIGZpcmVkIHdoZW4gYSByYXRpbmcgaXMgY2xlYXJlZFxuICAgICAgICBvbkRlc3Ryb3k6ZnVuY3Rpb24gKHZhbHVlLCB0ZXh0KSB7XG4gICAgICAgIH0gLy8gY2FsbGJhY2sgZmlyZWQgd2hlbiBhIHdpZGdldCBpcyBkZXN0cm95ZWRcbiAgICB9O1xuXG4gICAgJC5mbi5iYXJyYXRpbmcuQmFyUmF0aW5nID0gQmFyUmF0aW5nO1xuXG59KSk7XG4iLCIvKipcbiAqIEBwYWNrYWdlICAgIEtub3cgUmVzZXJ2YXRpb25zXG4gKiBAc3VicGFja2FnZSBTaXRlIEpTXG4gKiBAY29weXJpZ2h0ICAyMDIwIEhpZ2hsYW5kIFZpc2lvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIEBsaWNlbnNlICAgIFNlZSB0aGUgZmlsZSBcIkxJQ0VOU0UudHh0XCIgZm9yIHRoZSBmdWxsIGxpY2Vuc2UgZ292ZXJuaW5nIHRoaXMgY29kZS5cbiAqIEBhdXRob3IgICAgIEhhemVsIFdpbHNvbiA8aGF6ZWxAaGlnaGxhbmR2aXNpb24uY29tPlxuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG5sZXQgc2VhcmNoRGF0YSA9IFtdO1xubGV0IHNlYXJjaERvbmUgPSBmYWxzZTtcbmxldCBjYWxlbmRhckxvYWRlZCA9IGZhbHNlO1xubGV0IHNhdmVkd2lkdGggPSBmYWxzZTtcbmxldCBsYXJnZTtcbmxldCByZXNpemVkID0gZmFsc2U7XG5sZXQgc2Nsb2FkZWQgPSBmYWxzZTtcblxuKGZ1bmN0aW9uICgkKSB7XG4gICAgJChmdW5jdGlvbiAoKSB7XG4gICAgICAgIEZvdW5kYXRpb24uYWRkVG9KcXVlcnkoKTtcbiAgICAgICAgJChkb2N1bWVudCkuZm91bmRhdGlvbigpO1xuXG4gICAgICAgIGNoZWNrU2NyZWVuV2lkdGgoKTtcbiAgICAgICAgJCh3aW5kb3cpLm9uKFwicmVzaXplXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNoZWNrU2NyZWVuV2lkdGgoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgYmFycyA9ICQoJy5rci1yYXRpbmcnKTtcbiAgICAgICAgaWYgKGJhcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICBiYXJzLmJhcnJhdGluZygnc2hvdycsIHtcbiAgICAgICAgICAgICAgICBzaG93VmFsdWVzOiB0cnVlLFxuICAgICAgICAgICAgICAgIHNob3dTZWxlY3RlZFJhdGluZzogZmFsc2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgJGN0cmlnZ2VyID0gJCgnI2tyLXBhZ2UtZ2VyaWF0cmljLWNhbGVuZGFyLXRyaWdnZXInKTtcbiAgICAgICAgaWYgKCRjdHJpZ2dlci5sZW5ndGggJiYgIWNhbGVuZGFyTG9hZGVkKSB7XG4gICAgICAgICAgICBsb2FkQ2FsZW5kYXIoJGN0cmlnZ2VyLmRhdGEoJ3BpZCcpLCAkY3RyaWdnZXIuZGF0YSgndGFyZ2V0JykpO1xuICAgICAgICAgICAgY2FsZW5kYXJMb2FkZWQgPSB0cnVlO1xuICAgICAgICAgICAgY29uc3Qgc3RpY2t5ID0gJCgnLnN0aWNreScpO1xuICAgICAgICAgICAgaWYgKHN0aWNreS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBzdGlja3kuZm91bmRhdGlvbignX2NhbGMnLCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdzdWJtaXQnLCAnLmFqYXhmb3JtJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGNvbnN0ICRmb3JtID0gJCh0aGlzKTtcbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICAgICAgICAgIHVybDogJGZvcm0uYXR0cignYWN0aW9uJyksXG4gICAgICAgICAgICAgICAgZGF0YTogJGZvcm0uc2VyaWFsaXplKCksXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5kYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybVJlc3BvbnNlKCRmb3JtLmF0dHIoJ2lkJyksIHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnLyc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcua3ItYWpheC1tb2RhbC1lcnJvci1tZXNzYWdlJykuaHRtbChyZXN1bHQubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCAkbW9kYWwgPSBuZXcgRm91bmRhdGlvbi5SZXZlYWwoJCgnI0tyQWpheE1vZGFsRXJyb3InKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkbW9kYWwub3BlbigpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAkKCcua3ItYWpheC1tb2RhbC1lcnJvci1tZXNzYWdlJykuaHRtbCgnU29ycnkgYW4gZXJyb3IgaGFzIG9jY3VycmVkLCBwbGVhc2UgdHJ5IGFnYWluJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0ICRtb2RhbCA9IG5ldyBGb3VuZGF0aW9uLlJldmVhbCgkKCcjS3JBamF4TW9kYWxFcnJvcicpKTtcbiAgICAgICAgICAgICAgICAgICAgJG1vZGFsLm9wZW4oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSkub24oJ3Nob3cuemYuZHJvcGRvd24nLCAnLm5vc2Nyb2xsJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJCgnYm9keScpLmFkZENsYXNzKFwic3RhdGljcGFuZVwiKTtcbiAgICAgICAgICAgICQodGhpcykuY3NzKCdvcGFjaXR5JywgJzEnKTtcbiAgICAgICAgfSkub24oJ2hpZGUuemYuZHJvcGRvd24nLCAnLm5vc2Nyb2xsJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKFwic3RhdGljcGFuZVwiKTtcbiAgICAgICAgICAgICQodGhpcykuY3NzKCdvcGFjaXR5JywgJzAnKTtcbiAgICAgICAgfSkub24oJ2hpZGUuemYuZHJvcGRvd24nLCAnI2tyLXF1b3RlLWZvcm0nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKCcjZ3Vlc3RzJykudHJpZ2dlcignY2hhbmdlJyk7XG4gICAgICAgIH0pLm9uKCdvcGVuLnpmLnJldmVhbCcsICcua3ItYWpheC1tb2RhbFtkYXRhLXJldmVhbF0nLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgY29uc3QgbW9kYWxpZCA9IFwiI1wiICsgJCh0aGlzKS5hdHRyKCdpZCcpO1xuICAgICAgICAgICAgaWYgKCEkLnRyaW0oJChtb2RhbGlkKS5odG1sKCkpLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGFqYXh1cmwgPSAkKHRoaXMpLmRhdGEoJ2FqYXh1cmwnKTtcbiAgICAgICAgICAgICAgICBpZiAoYWpheHVybCkge1xuICAgICAgICAgICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBhamF4dXJsLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGNvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKG1vZGFsaWQpLmh0bWwoY29udGVudCkudHJpZ2dlcigncmVzaXplbWUuemYucmV2ZWFsJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChtb2RhbGlkKS5mb3VuZGF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkub24oJ29wZW4uemYucmV2ZWFsJywgJyNrci1nYXRld2F5LW1vZGFsW2RhdGEtcmV2ZWFsXScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBpZiAoIXNjbG9hZGVkKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICQuZ2V0U2NyaXB0KCdtZWRpYS9jb21fa25vd3Jlcy9qcy9zdHJpcGVjaGVja291dC5taW4uanMnKTtcbiAgICAgICAgICAgICAgICBzY2xvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGluaXRpYWxpemVTdHJpcGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkub24oJ2NsaWNrJywgJy5mYXZzcGFuJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGNvbnN0IHBpZCA9ICQodGhpcykuZGF0YSgncHJvcGVydHknKTtcbiAgICAgICAgICAgIGNvbnN0IGJhciA9ICQoJy5rci1zZWFyY2hiYXIgYS5pcy1hY3RpdmUnKS5kYXRhKCdiYXInKTtcbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICAgICAgICAgIHVybDogJy9pbmRleC5waHA/b3B0aW9uPWNvbV9rbm93cmVzJnRhc2s9cHJvcGVydGllcy5mYXZvdXJpdGUnLFxuICAgICAgICAgICAgICAgIGRhdGE6IHsncHJvcGVydHlfaWQnOiBwaWR9LFxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldFByb3BlcnRpZXMoYmFyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5mYXZpY29uLXRvcCcpLmZvdW5kYXRpb24oJ2hpZGUnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KS5vbignY2xpY2snLCAnLmdldFJlc3BvbnNlU2VhcmNoJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmRhdGEoJ2FjdGlvbicpID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBnZXRQcm9wZXJ0aWVzKCQodGhpcykuZGF0YSgnYmFyJykpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBnZXRQcm9wZXJ0aWVzKCQodGhpcykuZGF0YSgnYmFyJyksICQodGhpcykuZGF0YSgnYWN0aW9uJyksICQodGhpcykuZGF0YSgnYWN0aW9uLXZhbHVlJykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KS5vbignY2xpY2snLCAnLmtyLWZpbHRlcnMtY2xvc2UnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgJCgnLmtyLWZpbHRlcnMudG9wJykuYWRkQ2xhc3MoJ2hpZGVtZScpO1xuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgIH0pLm9uKCdjbGljaycsICcua3ItZmlsdGVycyB1bC5maWx0ZXItc29ydC1saXN0IGxpLmhlYWQnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5jaGlsZHJlbignbGkuZmlsdGVyLWl0ZW0nKS50b2dnbGUoKTtcbiAgICAgICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICB9KS5vbignY2xpY2snLCAnI3Nob3dnYXRld2F5cycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAkKCcja3ItZ2F0ZXdheXMnKS50b2dnbGVDbGFzcygnaGlkZW1lJyk7XG4gICAgICAgIH0pLm9uKCdjbGljaycsICdhLmtyLXNlYXJjaGJhcicsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBzZXRBY3RpdmVNZW51KCQodGhpcykuZGF0YSgnYmFyJykpO1xuICAgICAgICB9KS5vbignY2xpY2snLCAnLnRvZ2dsZW90aGVyJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICQodGhpcykuZGF0YSgnb3RoZXInKS50b2dnbGUoKTtcbiAgICAgICAgfSkub24oJ2NsaWNrJywgJyNrci1wcm9wZXJ0eS10YWJzIGFbaHJlZj1cIiNjYWxlbmRhclwiXScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBpZiAoIWNhbGVuZGFyTG9hZGVkKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcGlkID0gJCh0aGlzKS5kYXRhKCdwaWQnKTtcbiAgICAgICAgICAgICAgICBsb2FkQ2FsZW5kYXIocGlkLCAnI2NhbGVuZGFyLnRhYnMtcGFuZWwnKTtcbiAgICAgICAgICAgICAgICBjYWxlbmRhckxvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLm9uKCdtb3VzZW92ZXInLCAnI2tyLXRodW1iIGltZycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGxldCBwcm9wZXJ0eSA9ICQodGhpcykucGFyZW50KCkuZGF0YSgnaWQnKTtcbiAgICAgICAgICAgIGlmIChwcm9wZXJ0eSkge1xuICAgICAgICAgICAgICAgIGxldCB0YXJnZXQgPSAnLnRodW1ib3ZlcnZpZXcnICsgcHJvcGVydHk7XG4gICAgICAgICAgICAgICAgJCgnI3BpbmZvJykuaHRtbCgkKHRhcmdldCkuaHRtbCgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0ICRwcm9wcyA9ICQoJy5rci1wcm9wZXJ0aWVzJyk7XG4gICAgICAgIGlmICgkcHJvcHMubGVuZ3RoICYmICFzZWFyY2hEb25lKSB7XG4gICAgICAgICAgICBnZXRQcm9wZXJ0aWVzKCRwcm9wcy5kYXRhKCdiYXInKSk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0ICR0YWJzID0gJCgnLnRhYnMnKTtcbiAgICAgICAgaWYgKCQoJyNrci1wcm9wZXJ0eS10YWJzJykubGVuZ3RoICYmICFjYWxlbmRhckxvYWRlZCkge1xuICAgICAgICAgICAgJHRhYnMuZmluZCgnYScpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmF0dHIoJ2hyZWYnKSA9PT0gXCIjY2FsZW5kYXJcIikge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwaWQgPSAkKHRoaXMpLmRhdGEoJ3BpZCcpO1xuICAgICAgICAgICAgICAgICAgICBsb2FkQ2FsZW5kYXIocGlkLCAnI2NhbGVuZGFyLnRhYnMtcGFuZWwnKTtcbiAgICAgICAgICAgICAgICAgICAgY2FsZW5kYXJMb2FkZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAkLmV2ZW50LnNwZWNpYWwudG91Y2hzdGFydCA9IHtcbiAgICAgICAgc2V0dXA6IGZ1bmN0aW9uIChfLCBucywgaGFuZGxlKSB7XG4gICAgICAgICAgICBpZiAobnMuaW5jbHVkZXMoXCJub1ByZXZlbnREZWZhdWx0XCIpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCBoYW5kbGUsIHtwYXNzaXZlOiBmYWxzZX0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIGhhbmRsZSwge3Bhc3NpdmU6IHRydWV9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgJC5ldmVudC5zcGVjaWFsLnRvdWNobW92ZSA9IHtcbiAgICAgICAgc2V0dXA6IGZ1bmN0aW9uIChfLCBucywgaGFuZGxlKSB7XG4gICAgICAgICAgICBpZiAobnMuaW5jbHVkZXMoXCJub1ByZXZlbnREZWZhdWx0XCIpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsIGhhbmRsZSwge3Bhc3NpdmU6IGZhbHNlfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLCBoYW5kbGUsIHtwYXNzaXZlOiB0cnVlfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gbG9hZENhbGVuZGFyKHBpZCwgdGFyZ2V0KSB7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgICAgICB1cmw6ICcvaW5kZXgucGhwP29wdGlvbj1jb21fa25vd3JlcyZ0YXNrPXByb3BlcnR5LmdlcmlhdHJpYycsXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2h0bWwnLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICdwaWQnOiBwaWRcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICQodGFyZ2V0KS5hcHBlbmQoZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZvcm1SZXNwb25zZShpZCwgZGF0YSkge1xuICAgICAgICBpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eSgncmVkaXJlY3QnKSkge1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2UoZGF0YS5yZWRpcmVjdCk7XG4gICAgICAgIH0gZWxzZSBpZiAoaWQgPT09ICdrci1mb3JtLXBheW1lbnQnKSB7XG4gICAgICAgICAgICBpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eSgnaHRtbCcpKSB7XG4gICAgICAgICAgICAgICAgbGV0ICRtb2RhbCA9ICQoJyNrci1nYXRld2F5LW1vZGFsJyk7XG4gICAgICAgICAgICAgICAgJG1vZGFsLmh0bWwoZGF0YS5odG1sKS50cmlnZ2VyKCdyZXNpemVtZS56Zi5yZXZlYWwnKTtcbiAgICAgICAgICAgICAgICAkbW9kYWwuZm91bmRhdGlvbignb3BlbicpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChpZCA9PT0gJ2tyLWZvcm0tbWFpbGNoaW1wJykge1xuICAgICAgICAgICAgJCgnI3Jlc3BvbnNlMicpLmh0bWwoZGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRQcm9wZXJ0aWVzKGJhciwgYWN0aW9uID0gJycsIGFjdGlvbl92YWx1ZSA9ICcnKSB7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6ICcvaW5kZXgucGhwP29wdGlvbj1jb21fa25vd3JlcyZ0YXNrPXByb3BlcnRpZXMucmF3JyxcbiAgICAgICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgICAgIGRhdGE6IHsnYmFyJzogYmFyLCAnYWN0aW9uJzogYWN0aW9uLCAnYWN0aW9uX3ZhbHVlJzogYWN0aW9uX3ZhbHVlfSxcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCB2YWxzID0gWydncmlkJywgJ2xpc3QnLCAnZmF2cycsICdtYXAnXTtcbiAgICAgICAgICAgICAgICBpZiAodmFscy5pbmNsdWRlcyhkYXRhLmJhcikpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0QWN0aXZlTWVudShkYXRhLmJhcik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgc2V0U2VhcmNoRGF0YShkYXRhLCBkYXRhLmJhcik7XG4gICAgICAgICAgICAgICAgJCgnLmhhcy10aXAnKS5mb3VuZGF0aW9uKCk7XG4gICAgICAgICAgICAgICAgJCgnLmRyb3Bkb3duLXBhbmUnKS5mb3VuZGF0aW9uKCk7XG4gICAgICAgICAgICAgICAgJCgnLmtyLXByb3BlcnR5IC5jYXJkJykuZm91bmRhdGlvbigpO1xuICAgICAgICAgICAgICAgICQoJyNrci1vcmRlci1jbG9zZScpLnRyaWdnZXIoJ2NsaWNrJyk7XG4gICAgICAgICAgICAgICAgc2VhcmNoRG9uZSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldFNlYXJjaERhdGEocmVzcG9uc2UsIGFjdGlvbiA9ICcnKSB7XG4gICAgICAgIGxldCAkc2lkZWJhcjtcbiAgICAgICAgaWYgKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAkKCcja3ItcHJvcGVydGllcy1kYXRhJykuZW1wdHkoKS5mYWRlSW4oJ3Nsb3cnKS5odG1sKHJlc3BvbnNlWydpdGVtcyddKS5mb3VuZGF0aW9uKCk7XG4gICAgICAgICAgICAkKCcua3ItcGFnZXInKS5odG1sKHJlc3BvbnNlWydwYWdpbmF0aW9uJ10pO1xuICAgICAgICAgICAgJCgnLmtyLXBhZ2VyLmJvdHRvbScpLmh0bWwocmVzcG9uc2VbJ3BhZ2luYXRpb24nXSk7XG4gICAgICAgICAgICAkKFwiI2tyLW9mZmNhbnZhcy1wcm9wZXJ0aWVzLWZpbHRlclwiKS5odG1sKHJlc3BvbnNlWydmaWx0ZXJzJ10pO1xuICAgICAgICAgICAgJChcIiNrci1vZmZjYW52YXMtcHJvcGVydGllcy1zb3J0YnlcIikuaHRtbChyZXNwb25zZVsnc29ydGJ5J10pO1xuICAgICAgICAgICAgJCgnI2tyLXByb3BlcnRpZXMtZmlsdGVyLWNvdW50JykuaHRtbChyZXNwb25zZVsncGNvdW50J10pO1xuICAgICAgICAgICAgJHNpZGViYXIgPSAkKFwiI2tyLXNpZGViYXItc2VhcmNoXCIpO1xuICAgICAgICAgICAgaWYgKCRzaWRlYmFyLmxlbmd0aCAmJiByZXNwb25zZVsnc2VhcmNoJ10ubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgJHNpZGViYXIuZW1wdHkoKS5odG1sKHJlc3BvbnNlWydzZWFyY2gnXSk7XG4gICAgICAgICAgICAgICAgJCgnYm9keScpLnRyaWdnZXIoJ2luaXRhamF4c2VhcmNoJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChhY3Rpb24gPT09ICdwYWdlJykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHN0aWNreSA9ICQoJy5zdGlja3knKTtcbiAgICAgICAgICAgICAgICBpZiAoc3RpY2t5Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBzdGlja3kuZm91bmRhdGlvbignX2NhbGMnLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldEFjdGl2ZU1lbnUoYmFyKSB7XG4gICAgICAgIGNvbnN0IHNlYXJjaGJhciA9ICQoJy5rci1zZWFyY2hiYXInKS5maW5kKCcuYnV0dG9uJyk7XG4gICAgICAgICQuZWFjaChzZWFyY2hiYXIsIGZ1bmN0aW9uIChpbmRleCwgc2VhcmNoYmFyKSB7XG4gICAgICAgICAgICAkKHNlYXJjaGJhcikucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICB9KTtcbiAgICAgICAgJCgnLmtyLXNlYXJjaGJhciAuYnV0dG9uLicgKyBiYXIpLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gdHJ1ZSBpZiB3aWR0aCBoYXMgY2hhbmdlZFxuICAgIGZ1bmN0aW9uIHNjcmVlbldpZHRoSGFzQ2hhbmdlZCgpIHtcbiAgICAgICAgbGFyZ2UgPSBGb3VuZGF0aW9uLk1lZGlhUXVlcnkuYXRMZWFzdCgnbGFyZ2UnKTtcbiAgICAgICAgaWYgKGxhcmdlICE9PSBzYXZlZHdpZHRoKSB7XG4gICAgICAgICAgICBzYXZlZHdpZHRoID0gbGFyZ2U7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tTY3JlZW5XaWR0aCgpIHtcbiAgICAgICAgcmVzaXplZCA9IGZhbHNlO1xuICAgICAgICBpZiAoc2NyZWVuV2lkdGhIYXNDaGFuZ2VkKCkgJiYgc2VhcmNoRGF0YVsnaXRlbXMnXSAmJiAhcmVzaXplZCkge1xuICAgICAgICAgICAgc2V0U2VhcmNoRGF0YShzZWFyY2hEYXRhKTtcbiAgICAgICAgICAgIHJlc2l6ZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgJC5ldmVudC5zcGVjaWFsLnRvdWNoc3RhcnQgPSB7XG4gICAgICAgIHNldHVwOiBmdW5jdGlvbiAoXywgbnMsIGhhbmRsZSkge1xuICAgICAgICAgICAgaWYgKG5zLmluY2x1ZGVzKFwibm9QcmV2ZW50RGVmYXVsdFwiKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgaGFuZGxlLCB7cGFzc2l2ZTogZmFsc2V9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCBoYW5kbGUsIHtwYXNzaXZlOiB0cnVlfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgICQuZXZlbnQuc3BlY2lhbC50b3VjaG1vdmUgPSB7XG4gICAgICAgIHNldHVwOiBmdW5jdGlvbiAoXywgbnMsIGhhbmRsZSkge1xuICAgICAgICAgICAgaWYgKG5zLmluY2x1ZGVzKFwibm9QcmV2ZW50RGVmYXVsdFwiKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLCBoYW5kbGUsIHtwYXNzaXZlOiBmYWxzZX0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIiwgaGFuZGxlLCB7cGFzc2l2ZTogdHJ1ZX0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbn0oalF1ZXJ5KSk7IiwiLyoqXG4gKiBAcGFja2FnZSAgICBLbm93IFJlc2VydmF0aW9uc1xuICogQHN1YnBhY2thZ2UgU2l0ZSBKU1xuICogQGNvcHlyaWdodCAgMjAyMCBIaWdobGFuZCBWaXNpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBAbGljZW5zZSAgICBTZWUgdGhlIGZpbGUgXCJMSUNFTlNFLnR4dFwiIGZvciB0aGUgZnVsbCBsaWNlbnNlIGdvdmVybmluZyB0aGlzIGNvZGUuXG4gKiBAYXV0aG9yICAgICBIYXplbCBXaWxzb24gPGhhemVsQGhpZ2hsYW5kdmlzaW9uLmNvbT5cbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgkKSB7XG5cdGlmICghd2luZG93LmxvY2F0aW9uLm9yaWdpbilcblx0XHR3aW5kb3cubG9jYXRpb24ub3JpZ2luID0gd2luZG93LmxvY2F0aW9uLnByb3RvY29sICsgXCIvL1wiICsgd2luZG93LmxvY2F0aW9uLmhvc3Q7XG5cblx0bGV0IG15Q29uZmlybSwgJG15VGFzaztcblxuXHRjbGFzcyBLcmNvbmZpcm0ge1xuXHRcdGNvbnN0cnVjdG9yKCRmb3JtKSB7XG5cdFx0XHR0aGlzLmZvcm0gPSAkZm9ybTtcblx0XHRcdHRoaXMuaW5pdCgpO1xuXHRcdH1cblxuXHRcdGluaXQoKSB7XG5cdFx0XHR0aGlzLnVwZGF0ZVF1b3RlKHRoaXMuZm9ybSk7XG5cdFx0fVxuXG5cdFx0dXBkYXRlUXVvdGUoJGZvcm0pIHtcblx0XHRcdCRteVRhc2sgPSAkKCcjbXl0YXNrJyk7XG5cdFx0XHQkbXlUYXNrLnZhbCgnY29uZmlybS5jb21wdXRlJyk7XG5cdFx0XHRqUXVlcnkuYWpheCh7XG5cdFx0XHRcdHR5cGU6ICAgICAnUE9TVCcsXG5cdFx0XHRcdHVybDogICAgICAnaW5kZXgucGhwP29wdGlvbj1jb21fa25vd3JlcyZ0YXNrPWNvbmZpcm0uY29tcHV0ZScsXG5cdFx0XHRcdGRhdGE6ICAgICAkZm9ybS5zZXJpYWxpemVBcnJheSgpLFxuXHRcdFx0XHRkYXRhVHlwZTogJ2pzb24nLFxuXHRcdFx0XHRzdWNjZXNzOiAgZnVuY3Rpb24gKHJlc3VsdCkge1xuXHRcdFx0XHRcdCRteVRhc2sudmFsKCdjb25maXJtLnBheW1lbnQnKTtcblx0XHRcdFx0XHRpZiAocmVzdWx0LnN1Y2Nlc3MpIHtcblx0XHRcdFx0XHRcdGNvbnN0IGRhdGEgPSByZXN1bHQuZGF0YTtcblx0XHRcdFx0XHRcdGlmIChkYXRhLmhhc093blByb3BlcnR5KCdyZWRpcmVjdCcpKSB7XG5cdFx0XHRcdFx0XHRcdHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKGRhdGEucmVkaXJlY3QpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0bGV0IGRpdjtcblx0XHRcdFx0XHRcdCQuZWFjaChyZXN1bHQuZGF0YS5yZXNwb25zZSwgZnVuY3Rpb24gKGtleSwgdmFsKSB7XG5cdFx0XHRcdFx0XHRcdCQoJy5oaWRlaW5pdGlhbCcpLnNob3coKTtcblx0XHRcdFx0XHRcdFx0ZGl2ID0gXCIjXCIgKyBrZXk7XG5cdFx0XHRcdFx0XHRcdCQoZGl2KS50ZXh0KHZhbCk7XG5cdFx0XHRcdFx0XHRcdCQoZGl2KS5odG1sKHZhbCk7XG5cdFx0XHRcdFx0XHRcdCQoZGl2KS52YWwodmFsKTtcblx0XHRcdFx0XHRcdFx0JChkaXYpLnNob3coKTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHQkKCcua3ItYWpheC1tb2RhbC1lcnJvci1tZXNzYWdlJykuaHRtbChyZXN1bHQubWVzc2FnZSk7XG5cdFx0XHRcdFx0XHRjb25zdCAkbW9kYWwgPSBuZXcgRm91bmRhdGlvbi5SZXZlYWwoJCgnI0tyQWpheE1vZGFsRXJyb3InKSk7XG5cdFx0XHRcdFx0XHQkbW9kYWwub3BlbigpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cblx0JChmdW5jdGlvbiAoKSB7XG5cdFx0bGV0ICRlbGVtZW50ID0gJCgnI2tyLWZvcm0tY29uZmlybScpO1xuXHRcdGlmICgkZWxlbWVudC5sZW5ndGgpIHtcblx0XHRcdG15Q29uZmlybSA9IG5ldyBLcmNvbmZpcm0oJGVsZW1lbnQpO1xuXHRcdH1cblx0XHQkZWxlbWVudC5vbignY2hhbmdlIGNsaWNrJywgJy5rci1jYWxjdWxhdGUnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0JGVsZW1lbnQgPSAkKCcja3ItZm9ybS1jb25maXJtJyk7XG5cdFx0XHRteUNvbmZpcm0udXBkYXRlUXVvdGUoJGVsZW1lbnQpO1xuXHRcdH0pO1xuXG5cdFx0JChkb2N1bWVudCkub24oJ2NsaWNrJywgJyNjaGVja3Rlcm1zJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGlmIChjaGVja1Rlcm1zKCkpIHtcblx0XHRcdFx0JCgnI2NoZWNrdGVybXMnKS50cmlnZ2VyKCdzdWJtaXQnKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fSk7XG5cblx0Ly8gbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG5cdGZ1bmN0aW9uIGNoZWNrVGVybXMoKSB7XG5cdFx0bGV0IHJlc3VsdCA9IHRydWU7XG5cdFx0Y29uc3QgdGVzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZ3JlZWNoZWNrJyk7XG5cdFx0Y29uc3QgdGVzdGMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWdyZWVjaGVja2MnKTtcblx0XHRjb25zdCB0ZXN0dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZ3JlZWNoZWNrdCcpO1xuXG5cdFx0Ly8gbm9pbnNwZWN0aW9uIEpTVW5yZXNvbHZlZFZhcmlhYmxlXG5cdFx0aWYgKHRlc3QgJiYgIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdrci1mb3JtLXBheW1lbnQnKS5hZ3JlZWNoZWNrLmNoZWNrZWQpIHtcblx0XHRcdHJlc3VsdCA9IGZhbHNlO1xuXHRcdH1cblx0XHQvLyBub2luc3BlY3Rpb24gSlNVbnJlc29sdmVkVmFyaWFibGVcblx0XHRpZiAodGVzdGMgJiYgIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdrci1mb3JtLXBheW1lbnQnKS5hZ3JlZWNoZWNrYy5jaGVja2VkKSB7XG5cdFx0XHRyZXN1bHQgPSBmYWxzZTtcblx0XHR9XG5cdFx0Ly8gbm9pbnNwZWN0aW9uIEpTVW5yZXNvbHZlZFZhcmlhYmxlXG5cdFx0aWYgKHRlc3R0ICYmICFkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgna3ItZm9ybS1wYXltZW50JykuYWdyZWVjaGVja3QuY2hlY2tlZCkge1xuXHRcdFx0cmVzdWx0ID0gZmFsc2U7XG5cdFx0fVxuXG5cdFx0aWYgKHJlc3VsdCkge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnN0ICRtb2RhbCA9IG5ldyBGb3VuZGF0aW9uLlJldmVhbCgkKCcjZXJyb3JNb2RhbCcpKTtcblx0XHRcdCRtb2RhbC5vcGVuKCk7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHR9XG59KGpRdWVyeSkpOyIsIi8qKlxuICogQHBhY2thZ2UgICAgS25vdyBSZXNlcnZhdGlvbnNcbiAqIEBzdWJwYWNrYWdlIFNpdGUgSlNcbiAqIEBjb3B5cmlnaHQgIDIwMjAgSGlnaGxhbmQgVmlzaW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogQGxpY2Vuc2UgICAgU2VlIHRoZSBmaWxlIFwiTElDRU5TRS50eHRcIiBmb3IgdGhlIGZ1bGwgbGljZW5zZSBnb3Zlcm5pbmcgdGhpcyBjb2RlLlxuICogQGF1dGhvciAgICAgSGF6ZWwgV2lsc29uIDxoYXplbEBoaWdobGFuZHZpc2lvbi5jb20+XG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbmlmICghd2luZG93LmxvY2F0aW9uLm9yaWdpbikge1xuXHR3aW5kb3cubG9jYXRpb24ub3JpZ2luID0gd2luZG93LmxvY2F0aW9uLnByb3RvY29sICsgXCIvL1wiICsgd2luZG93LmxvY2F0aW9uLmhvc3Q7XG59XG5cbihmdW5jdGlvbiAoJCkge1xuXHRsZXQgbXlLckRvYkVudHJ5O1xuXHRsZXQgdG9kYXk7XG5cdGxldCBrZXkgPSB7QkFDS1NQQUNFOiA4fTtcblxuXHRsZXQgc2V0dGluZ3MgPSB7XG5cdFx0Y3VzdG9tX3ZhbGlkYXRpb246ICAgICBmYWxzZSxcblx0XHRkYXlzX2luX21vbnRoOiAgICAgICAgIFszMSwgMjksIDMxLCAzMCwgMzEsIDMwLCAzMSwgMzEsIDMwLCAzMSwgMzAsIDMxXSxcblx0XHRkb2N1bWVudF9kYXRlOiAgICAgICAgIGZhbHNlLFxuXHRcdGVycm9yYm94X3g6ICAgICAgICAgICAgMSxcblx0XHRlcnJvcmJveF95OiAgICAgICAgICAgIDUsXG5cdFx0ZmllbGRfaGludF90ZXh0X2RheTogICAnREQnLFxuXHRcdGZpZWxkX2hpbnRfdGV4dF9tb250aDogJ01NJyxcblx0XHRmaWVsZF9oaW50X3RleHRfeWVhcjogICdZWVlZJyxcblx0XHRmaWVsZF9vcmRlcjogICAgICAgICAgICdETVknLFxuXHRcdGZpZWxkX3dpZHRoX2RheTogICAgICAgNixcblx0XHRmaWVsZF93aWR0aF9tb250aDogICAgIDYsXG5cdFx0ZmllbGRfd2lkdGhfeWVhcjogICAgICA3LFxuXHRcdGZpZWxkX3dpZHRoX3NlcDogICAgICAgMixcblx0XHRtaW5tYXg6ICAgICAgICAgICAgICAgICcnLFxuXHRcdG1pbl9kYXRlOiAgICAgICAgICAgICAgZmFsc2UsXG5cdFx0bWF4X2RhdGU6ICAgICAgICAgICAgICBmYWxzZSxcblx0XHRtaW5feWVhcjogICAgICAgICAgICAgIDE5MTAsXG5cdFx0bW9udGhfbmFtZTogICAgICAgICAgICBbXG5cdFx0XHQnSmFudWFyeScsICdGZWJydWFyeScsICdNYXJjaCcsICdBcHJpbCcsXG5cdFx0XHQnTWF5JywgJ0p1bmUnLCAnSnVseScsICdBdWd1c3QnLCAnU2VwdGVtYmVyJyxcblx0XHRcdCdPY3RvYmVyJywgJ05vdmVtYmVyJywgJ0RlY2VtYmVyJ10sXG5cdFx0b25fYmx1cjogICAgICAgICAgICAgICBmYWxzZSxcblx0XHRvbl9lcnJvcjogICAgICAgICAgICAgIGZhbHNlLFxuXHRcdG9uX2NoYW5nZTogICAgICAgICAgICAgZmFsc2UsXG5cdFx0cGFyc2VfZGF0ZTogICAgICAgICAgICB0cnVlLFxuXHRcdHNlcGFyYXRvcjogICAgICAgICAgICAgJy8nLFxuXHRcdHNob3dfZXJyb3JzOiAgICAgICAgICAgdHJ1ZSxcblx0XHRzaG93X2hpbnRzOiAgICAgICAgICAgIHRydWUsXG5cdFx0RV9EQVlfTkFOOiAgICAgICAgICAgICAnRGF5IG11c3QgYmUgYSBudW1iZXInLFxuXHRcdEVfREFZX1RPT19CSUc6ICAgICAgICAgJ0RheSBtdXN0IGJlIDEtMzEnLFxuXHRcdEVfREFZX1RPT19TTUFMTDogICAgICAgJ0RheSBtdXN0IGJlIDEtMzEnLFxuXHRcdEVfQkFEX0RBWV9GT1JfTU9OVEg6ICAgJ09ubHkgJWQgZGF5cyBpbiAlbSAleScsXG5cdFx0RV9NT05USF9OQU46ICAgICAgICAgICAnTW9udGggbXVzdCBiZSBhIG51bWJlcicsXG5cdFx0RV9NT05USF9UT09fQklHOiAgICAgICAnTW9udGggbXVzdCBiZSAxLTEyJyxcblx0XHRFX01PTlRIX1RPT19TTUFMTDogICAgICdNb250aCBjYW5ub3QgYmUgMCcsXG5cdFx0RV9ZRUFSX05BTjogICAgICAgICAgICAnWWVhciBtdXN0IGJlIGEgbnVtYmVyJyxcblx0XHRFX1lFQVJfTEVOR1RIOiAgICAgICAgICdZZWFyIG11c3QgYmUgNCBkaWdpdHMnLFxuXHRcdEVfWUVBUl9UT09fU01BTEw6ICAgICAgJ1llYXIgbXVzdCBub3QgYmUgYmVmb3JlICV5Jyxcblx0XHRFX01JTl9EQVRFOiAgICAgICAgICAgICdEYXRlIG11c3Qgbm90IGJlIGluIHRoZSBwYXN0Jyxcblx0XHRFX01BWF9EQVRFOiAgICAgICAgICAgICdEYXRlIG11c3Qgbm90IGJlIGluIHRoZSBmdXR1cmUnXG5cdH07XG5cblx0Y2xhc3MgS3JEb2JFbnRyeSB7XG5cdFx0Y29uc3RydWN0b3IoJGVsZW1lbnQsIG9wdGlvbnMpIHtcblx0XHRcdHRvZGF5ID0gS3JEb2JFbnRyeS5nZXRZbWQobmV3IERhdGUoKSk7XG5cblx0XHRcdHRoaXMuaW5wdXRfZGF5ID0gMDtcblx0XHRcdHRoaXMuaW5wdXRfbW9udGggPSAwO1xuXHRcdFx0dGhpcy5pbnB1dF95ZWFyID0gMDtcblx0XHRcdHRoaXMuJGVsZW1lbnQgPSAkZWxlbWVudDtcblx0XHRcdGlmIChvcHRpb25zKSB7XG5cdFx0XHRcdCQuZXh0ZW5kKHNldHRpbmdzLCBvcHRpb25zKTtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5pbml0KCk7XG5cdFx0fVxuXG5cdFx0c3RhdGljIGdldFltZChkYXRlKSB7XG5cdFx0XHRjb25zdCBtID0gZGF0ZS5nZXRNb250aCgpICsgMTtcblx0XHRcdGNvbnN0IGQgPSBkYXRlLmdldERheSgpO1xuXG5cdFx0XHRyZXR1cm4gKGRhdGUuZ2V0RnVsbFllYXIoKSArICctJyArIChtIDwgMTAgPyAnMCcgOiAnJykgKyBtICsgJy0nICsgKGQgPCAxMCA/ICcwJyA6ICcnKSArIGQpO1xuXHRcdH1cblxuXHRcdHN0YXRpYyBnZXRZbWRPYmplY3QoZGF0ZSkge1xuXHRcdFx0cmV0dXJuIChkYXRlLnllYXIgKyAnLScgKyBkYXRlLm1vbnRoICsgJy0nICsgZGF0ZS5kYXkpO1xuXHRcdH1cblxuXHRcdGFkZEVudHJ5RmllbGRzKCkge1xuXHRcdFx0bGV0IGRvYmZpZWxkID0gdGhpcztcblx0XHRcdGRvYmZpZWxkLmZpZWxkcyA9IFtdO1xuXHRcdFx0JC5lYWNoKHNldHRpbmdzLmZpZWxkX29yZGVyLnNwbGl0KCcnKSwgZnVuY3Rpb24gKGksIGZpZWxkKSB7XG5cdFx0XHRcdHN3aXRjaCAoZmllbGQpIHtcblx0XHRcdFx0XHRjYXNlICdEJzpcblx0XHRcdFx0XHRcdGRvYmZpZWxkLmJ1aWxkRmllbGQoJ2RheScsIGkpO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSAnTSc6XG5cdFx0XHRcdFx0XHRkb2JmaWVsZC5idWlsZEZpZWxkKCdtb250aCcsIGkpO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSAnWSc6XG5cdFx0XHRcdFx0XHRkb2JmaWVsZC5idWlsZEZpZWxkKCd5ZWFyJywgaSk7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRkZWZhdWx0IDpcblx0XHRcdFx0XHRcdHRocm93IFwiVW5leHBlY3RlZCBmaWVsZCBvcmRlciAnXCIgKyBmaWVsZCArIFwiJyBleHBlY3RlZCBELCBNIG9yIFlcIjtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0YWZ0ZXJQYXN0ZSh0YXJnZXQpIHtcblx0XHRcdGlmICh0aGlzLnBhcnNlRGF0ZSgkKHRhcmdldCkudmFsKCkpKSB7XG5cdFx0XHRcdHRoaXMuc2V0RGF0ZSgkKHRhcmdldCkudmFsKCkpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGJ1aWxkRmllbGQobmFtZSwgaW5kZXgpIHtcblx0XHRcdGxldCBrcmRvYmVudHJ5ID0gdGhpcztcblx0XHRcdGxldCBpbnB1dCA9IG5ldyBLckRvYklucHV0KHtcblx0XHRcdFx0bmFtZTogICAgICAgbmFtZSxcblx0XHRcdFx0a3Jkb2JlbnRyeToga3Jkb2JlbnRyeSxcblx0XHRcdFx0aW5kZXg6ICAgICAgaW5kZXgsXG5cdFx0XHRcdGhpbnRfdGV4dDogIHNldHRpbmdzLnNob3dfaGludHMgPyBzZXR0aW5nc1snZmllbGRfaGludF90ZXh0XycgKyBuYW1lXSA6IG51bGwsXG5cdFx0XHR9KTtcblxuXHRcdFx0dGhpcy5pbm5lci5hcHBlbmQoaW5wdXQuJGlucHV0KTtcblx0XHRcdHRoaXNbJ2lucHV0XycgKyBuYW1lXSA9IGlucHV0O1xuXG5cdFx0XHRpZiAoaW5kZXggPCAyKSB7XG5cdFx0XHRcdHRoaXMuaW5uZXIuYXBwZW5kKCQoJzxzcGFuIGNsYXNzPVwic2VwYXJhdG9yXCIgLz4nKS50ZXh0KHNldHRpbmdzLnNlcGFyYXRvcikpO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLmZpZWxkc1tpbmRleF0gPSBpbnB1dDtcblx0XHRcdHRoaXNbbmFtZV0gPSBpbnB1dDtcblx0XHR9XG5cblx0XHRidWlsZFVpKCkge1xuXHRcdFx0bGV0IGRvYmZpZWxkID0gdGhpcztcblx0XHRcdHRoaXMud3JhcHBlciA9ICQodGhpcy4kZWxlbWVudC53cmFwKCc8c3BhbiBjbGFzcz1cImpxLWR0ZVwiIC8+JykucGFyZW50KClbMF0pO1xuXHRcdFx0dGhpcy5pbm5lciA9ICQoJzxzcGFuIGNsYXNzPVwianEtZHRlLWlubmVyXCIgLz4nKTtcblx0XHRcdHRoaXMuYWRkRW50cnlGaWVsZHMoKTtcblx0XHRcdHRoaXMuZXJyb3Jib3ggPSAkKCc8c3BhbiBjbGFzcz1cImpxLWR0ZS1lcnJvcmJveFwiIC8+JykuaGlkZSgpO1xuXHRcdFx0dGhpcy5pbm5lci5vbigncGFzdGUnLCAnaW5wdXQnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRsZXQgaW5wdXQgPSB0aGlzO1xuXHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRkb2JmaWVsZC5hZnRlclBhc3RlKGlucHV0LCBlKTtcblx0XHRcdFx0fSwgMik7XG5cdFx0XHR9KTtcblx0XHRcdHRoaXMud3JhcHBlci5hcHBlbmQodGhpcy5pbm5lciwgdGhpcy5lcnJvcmJveCk7XG5cdFx0XHR0aGlzLnNldEZpZWxkV2lkdGhzKCk7XG5cdFx0XHR0aGlzLiRlbGVtZW50LmhpZGUoKTtcblx0XHR9XG5cblx0XHRjaGVja0RvY3VtZW50KGRvYiwgY2hpbGRkb2IsIGNsYXNzbmFtZSkge1xuXHRcdFx0bGV0IGVsZW1lbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShjbGFzc25hbWUpO1xuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRpZiAobmV3IERhdGUoZG9iKSA+IG5ldyBEYXRlKGNoaWxkZG9iKSkge1xuXHRcdFx0XHRcdGVsZW1lbnRzW2ldLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0ZWxlbWVudHNbaV0uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRjbGVhcigpIHtcblx0XHRcdHRoaXMuY2xlYXJFcnJvcignJyk7XG5cdFx0XHR0aGlzLnNldERhdGUoJycpO1xuXHRcdH1cblxuXHRcdGNsZWFyRXJyb3IoKSB7XG5cdFx0XHRkZWxldGUgdGhpcy5lcnJvcl90ZXh0O1xuXHRcdFx0dGhpcy5zaG93RXJyb3IoKTtcblx0XHR9XG5cblx0XHRkZXN0cm95KCkge1xuXHRcdFx0dGhpcy4kZWxlbWVudC5zaG93KCk7XG5cdFx0XHR0aGlzLiRlbGVtZW50LmNzcygnZGlzcGxheScsICcnKTtcblx0XHRcdHRoaXMud3JhcHBlci5maW5kKCdzcGFuJykucmVtb3ZlKCk7XG5cdFx0XHR0aGlzLiRlbGVtZW50LnVud3JhcCgpO1xuXHRcdFx0dGhpcy4kZWxlbWVudC5yZW1vdmVEYXRhKCdkYXRldGV4dGVudHJ5Jyk7XG5cdFx0XHRkZWxldGUgdGhpcy5pbm5lcjtcblx0XHRcdGRlbGV0ZSB0aGlzLndyYXBwZXI7XG5cdFx0XHRkZWxldGUgdGhpcy4kZWxlbWVudDtcblx0XHR9XG5cblx0XHRmb2N1cygpIHtcblx0XHRcdHRoaXMuZmllbGRzWzBdLnNldEZvY3VzKHRydWUpO1xuXHRcdH1cblxuXHRcdGZvY3VzRmllbGRCZWZvcmUoaW5wdXQpIHtcblx0XHRcdGNvbnN0IGluZGV4ID0gaW5wdXQuaW5kZXg7XG5cdFx0XHRpZiAoaW5kZXggPCAxKSB7XG5cdFx0XHRcdHJldHVyblxuXHRcdFx0fVxuXHRcdFx0dGhpcy5maWVsZHNbaW5kZXhdLnlpZWxkRm9jdXMoKTtcblx0XHRcdHRoaXMuZmllbGRzW2luZGV4IC0gMV0uc2V0Rm9jdXModHJ1ZSk7XG5cdFx0XHQvLyBsZXQgbmV4dCA9IHRoaXMuZmllbGRzW2luZGV4IC0gMV07XG5cdFx0XHQvLyBsZXQgdmFsID0gbmV4dC5nZXQoKTtcblx0XHRcdC8vIG5leHQuc2V0Rm9jdXMoZmFsc2UpO1xuXHRcdH1cblxuXHRcdGZvY3VzRmllbGRBZnRlcihpbnB1dCkge1xuXHRcdFx0Y29uc3QgaW5kZXggPSBpbnB1dC5pbmRleDtcblx0XHRcdGlmIChpbmRleCA+IDEpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5maWVsZHNbaW5kZXhdLnlpZWxkRm9jdXMoKTtcblx0XHRcdHRoaXMuZmllbGRzW2luZGV4ICsgMV0uc2V0Rm9jdXModHJ1ZSk7XG5cdFx0fVxuXG5cdFx0Zm9jdXNJbigpIHtcblx0XHRcdHRoaXMud3JhcHBlci5hZGRDbGFzcygnZm9jdXMnKTtcblx0XHR9XG5cblx0XHRmb2N1c091dCgpIHtcblx0XHRcdGlmIChzZXR0aW5ncy5vbl9ibHVyKSB7XG5cdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdHNlbGYud2lkZ2V0Rm9jdXNMb3N0KCk7XG5cdFx0XHRcdH0sIDIpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy53cmFwcGVyLnJlbW92ZUNsYXNzKCdmb2N1cycpO1xuXHRcdH1cblxuXHRcdGdldERhdGUoKSB7XG5cdFx0XHRyZXR1cm4gKHRoaXMuZGF5X3ZhbHVlICYmIHRoaXMubW9udGhfdmFsdWUgJiYgdGhpcy55ZWFyX3ZhbHVlKVxuXHRcdFx0ICAgICAgID8ge2RheTogdGhpcy5kYXlfdmFsdWUsIG1vbnRoOiB0aGlzLm1vbnRoX3ZhbHVlLCB5ZWFyOiB0aGlzLnllYXJfdmFsdWV9XG5cdFx0XHQgICAgICAgOiBudWxsO1xuXHRcdH1cblxuXHRcdGluaXQoKSB7XG5cdFx0XHRpZiAoIXNldHRpbmdzLm1pbl95ZWFyKVxuXHRcdFx0XHRzZXR0aW5ncy5taW5feWVhciA9ICcxOTEwJztcblxuXHRcdFx0dGhpcy5idWlsZFVpKCk7XG5cdFx0XHR0aGlzLnNldERhdGUodGhpcy4kZWxlbWVudC5hdHRyKCd2YWx1ZScpKTtcblx0XHRcdHRoaXMucHJveHlMYWJlbENsaWNrcygpO1xuXHRcdH1cblxuXHRcdHBhcnNlRGF0ZSh0ZXh0KSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5wYXJzZUlzb0RhdGUodGV4dCk7XG5cdFx0fVxuXG5cdFx0cGFyc2VJc29EYXRlKHRleHQpIHtcblx0XHRcdHJldHVybiB0ZXh0ICYmIHRleHQubWF0Y2goL14oXFxkXFxkXFxkXFxkKS0oXFxkXFxkKS0oXFxkXFxkKS8pID8ge1xuXHRcdFx0XHRkYXk6ICAgUmVnRXhwLiQzLFxuXHRcdFx0XHRtb250aDogUmVnRXhwLiQyLFxuXHRcdFx0XHR5ZWFyOiAgUmVnRXhwLiQxXG5cdFx0XHR9IDogbnVsbDtcblx0XHR9XG5cblx0XHRwcm94eUxhYmVsQ2xpY2tzKCkge1xuXHRcdFx0bGV0IGRvYmZpZWxkID0gdGhpcztcblx0XHRcdGxldCBpZCA9IHRoaXMuJGVsZW1lbnQuYXR0cignaWQnKTtcblx0XHRcdGlmICghaWQpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0JCgnbGFiZWxbZm9yPScgKyBpZCArICddJykuY2xpY2soZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRkb2JmaWVsZC5mb2N1cygpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0c2V0RGF0ZShuZXdfZGF0ZSkge1xuXHRcdFx0bGV0IGRvYmZpZWxkID0gdGhpcztcblx0XHRcdG5ld19kYXRlID0gdGhpcy5wYXJzZURhdGUobmV3X2RhdGUpO1xuXHRcdFx0ZGVsZXRlIHRoaXMuZGF5X3ZhbHVlO1xuXHRcdFx0ZGVsZXRlIHRoaXMubW9udGhfdmFsdWU7XG5cdFx0XHRkZWxldGUgdGhpcy55ZWFyX3ZhbHVlO1xuXHRcdFx0dGhpcy5pbnB1dF9kYXkuc2V0KG5ld19kYXRlID8gbmV3X2RhdGUuZGF5IDogJycpO1xuXHRcdFx0dGhpcy5pbnB1dF9tb250aC5zZXQobmV3X2RhdGUgPyBuZXdfZGF0ZS5tb250aCA6ICcnKTtcblx0XHRcdHRoaXMuaW5wdXRfeWVhci5zZXQobmV3X2RhdGUgPyBuZXdfZGF0ZS55ZWFyIDogJycpO1xuXHRcdFx0dGhpcy5jbGVhckVycm9yKCk7XG5cdFx0XHR0aGlzLiRlbGVtZW50LnZhbChuZXdfZGF0ZSk7XG5cdFx0XHRpZiAobmV3X2RhdGUpIHtcblx0XHRcdFx0JC5lYWNoKHRoaXMuZmllbGRzLCBmdW5jdGlvbiAoaSwgaW5wdXQpIHtcblx0XHRcdFx0XHRkb2JmaWVsZC52YWxpZGF0ZShpbnB1dCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHNldEVycm9yKGVycm9yX3RleHQpIHtcblx0XHRcdHRoaXMuZXJyb3JfdGV4dCA9IGVycm9yX3RleHQ7XG5cdFx0XHR0aGlzLnNob3dFcnJvcigpO1xuXHRcdH1cblxuXHRcdHNldEZpZWxkV2lkdGhzKCkge1xuXHRcdFx0bGV0IGF2YWlsYWJsZSA9IHRoaXMuJGVsZW1lbnQud2lkdGgoKSAtIDI7XG5cdFx0XHRsZXQgdG90YWwgPSBzZXR0aW5ncy5maWVsZF93aWR0aF95ZWFyICsgc2V0dGluZ3MuZmllbGRfd2lkdGhfc2VwICsgc2V0dGluZ3MuZmllbGRfd2lkdGhfbW9udGggK1xuXHRcdFx0XHRzZXR0aW5ncy5maWVsZF93aWR0aF9zZXAgKyBzZXR0aW5ncy5maWVsZF93aWR0aF9kYXk7XG5cdFx0XHR0aGlzLmlucHV0X2RheS5zZXRXaWR0aChNYXRoLmZsb29yKHNldHRpbmdzLmZpZWxkX3dpZHRoX2RheSAqIGF2YWlsYWJsZSAvIHRvdGFsKSk7XG5cdFx0XHR0aGlzLmlucHV0X21vbnRoLnNldFdpZHRoKE1hdGguZmxvb3Ioc2V0dGluZ3MuZmllbGRfd2lkdGhfbW9udGggKiBhdmFpbGFibGUgLyB0b3RhbCkpO1xuXHRcdFx0dGhpcy5pbnB1dF95ZWFyLnNldFdpZHRoKE1hdGguZmxvb3Ioc2V0dGluZ3MuZmllbGRfd2lkdGhfeWVhciAqIGF2YWlsYWJsZSAvIHRvdGFsKSk7XG5cdFx0fVxuXG5cdFx0c2V0UmVhZG9ubHkobW9kZSkge1xuXHRcdFx0aWYgKG1vZGUgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRtb2RlID0gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdHRoaXMuaW5wdXRfZGF5LnNldFJlYWRvbmx5KG1vZGUpO1xuXHRcdFx0dGhpcy5pbnB1dF9tb250aC5zZXRSZWFkb25seShtb2RlKTtcblx0XHRcdHRoaXMuaW5wdXRfeWVhci5zZXRSZWFkb25seShtb2RlKTtcblx0XHRcdGlmIChtb2RlKSB7XG5cdFx0XHRcdHRoaXMud3JhcHBlci5hZGRDbGFzcygncmVhZG9ubHknKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMud3JhcHBlci5yZW1vdmVDbGFzcygncmVhZG9ubHknKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRzaG93RXJyb3IoKSB7XG5cdFx0XHRsZXQgZXJyb3JfdGV4dCA9IHRoaXMud2lkZ2V0RXJyb3JUZXh0KCk7XG5cdFx0XHRpZiAodGhpcy5vbl9lcnJvcikge1xuXHRcdFx0XHR0aGlzLm9uX2Vycm9yKGVycm9yX3RleHQpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCFzZXR0aW5ncy5zaG93X2Vycm9ycykge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRpZiAoZXJyb3JfdGV4dCA9PT0gJycpIHtcblx0XHRcdFx0dGhpcy5lcnJvcmJveC5oaWRlKCk7XG5cdFx0XHRcdHRoaXMuZXJyb3Jib3gudGV4dCgnJyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRsZXQgeF9vZmZzZXQgPSAodGhpcy5pbm5lci5vdXRlcldpZHRoKCkgKyBzZXR0aW5ncy5lcnJvcmJveF94KSArICdweCc7XG5cdFx0XHRcdGxldCB5X29mZnNldCA9IHNldHRpbmdzLmVycm9yYm94X3kgKyAncHgnO1xuXHRcdFx0XHR0aGlzLmVycm9yYm94LmNzcyh7ZGlzcGxheTogJ2Jsb2NrJywgcG9zaXRpb246ICdhYnNvbHV0ZScsIHRvcDogeV9vZmZzZXQsIGxlZnQ6IHhfb2Zmc2V0fSk7XG5cdFx0XHRcdHRoaXMuZXJyb3Jib3gudGV4dChlcnJvcl90ZXh0KTtcblx0XHRcdFx0dGhpcy5lcnJvcmJveC5zaG93KCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dmFsaWRhdGUoY3VycmVudF9pbnB1dCkge1xuXHRcdFx0dGhpcy4kZWxlbWVudC52YWwoJycpO1xuXHRcdFx0aWYgKGN1cnJlbnRfaW5wdXQpIHtcblx0XHRcdFx0Y29uc3QgdHlwZSA9IGN1cnJlbnRfaW5wdXQubmFtZTtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRpZiAodHlwZSA9PT0gJ2RheScpIHtcblx0XHRcdFx0XHRcdHRoaXMudmFsaWRhdGVEYXkoKTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHR5cGUgPT09ICdtb250aCcpIHtcblx0XHRcdFx0XHRcdHRoaXMudmFsaWRhdGVNb250aCgpO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAodHlwZSA9PT0gJ3llYXInKSB7XG5cdFx0XHRcdFx0XHR0aGlzLnZhbGlkYXRlWWVhcigpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRjdXJyZW50X2lucHV0LmNsZWFyRXJyb3IoKTtcblx0XHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRcdGN1cnJlbnRfaW5wdXQuc2V0RXJyb3IoZSk7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAodGhpcy5kYXlfdmFsdWUgJiYgdGhpcy5tb250aF92YWx1ZSkge1xuXHRcdFx0XHR0aGlzLmNsZWFyRXJyb3IoKTtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHR0aGlzLnZhbGlkYXRlRGF5c0luTW9udGgoKTtcblx0XHRcdFx0XHRpZiAodGhpcy55ZWFyX3ZhbHVlICYmIHRoaXMueWVhcl92YWx1ZS5sZW5ndGggPT09IDQpIHtcblx0XHRcdFx0XHRcdHRoaXMudmFsaWRhdGVDb21wbGV0ZURhdGUoKTtcblx0XHRcdFx0XHRcdGxldCBkYXRlX3N0ciA9IEtyRG9iRW50cnkuZ2V0WW1kT2JqZWN0KHRoaXMuZ2V0RGF0ZSgpKTtcblx0XHRcdFx0XHRcdHRoaXMuJGVsZW1lbnQudmFsKGRhdGVfc3RyKTtcblx0XHRcdFx0XHRcdGlmICh0aGlzLiRlbGVtZW50LmRhdGEoJ2NoaWxkZG9iJykpIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5jaGVja0RvY3VtZW50KGRhdGVfc3RyLCB0aGlzLiRlbGVtZW50LmRhdGEoJ2NoaWxkZG9iJyksIHRoaXMuJGVsZW1lbnQuYXR0cignaWQnKSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdFx0dGhpcy5zZXRFcnJvcihlKTtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuY2xlYXJFcnJvcigpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHR2YWxpZGF0ZUNvbXBsZXRlRGF0ZSgpIHtcblx0XHRcdGNvbnN0IGRhdGVfb2JqID0gdGhpcy5nZXREYXRlKCk7XG5cdFx0XHRjb25zdCBkYXRlX2lzbyA9IEtyRG9iRW50cnkuZ2V0WW1kT2JqZWN0KGRhdGVfb2JqKTtcblx0XHRcdHNldHRpbmdzLm1pbm1heCA9IHRoaXMuJGVsZW1lbnQuZGF0YSgndmFsaWRhdGlvbicpO1xuXG5cdFx0XHRpZiAoc2V0dGluZ3MubWlubWF4ID09PSAnbWF4Jykge1xuXHRcdFx0XHRpZiAoZGF0ZV9pc28gPiB0b2RheSkge1xuXHRcdFx0XHRcdHRocm93KHNldHRpbmdzLkVfTUFYX0RBVEUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAoc2V0dGluZ3MubWlubWF4ID09PSAnbWluJykge1xuXHRcdFx0XHRpZiAoZGF0ZV9pc28gPCB0b2RheSkge1xuXHRcdFx0XHRcdHRocm93KHNldHRpbmdzLkVfTUlOX0RBVEUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIGxldCBtYXhfZGF0ZSA9IHNldHRpbmdzLm1heF9kYXRlO1xuXHRcdFx0Ly8gaWYgKHR5cGVvZiBtYXhfZGF0ZSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0Ly8gXHRtYXhfZGF0ZSA9IG1heF9kYXRlLmNhbGwodGhpcyk7XG5cdFx0XHQvLyB9XG5cdFx0XHQvLyBpZiAodHlwZW9mIG1heF9kYXRlID09PSAnc3RyaW5nJykge1xuXHRcdFx0Ly8gXHRtYXhfZGF0ZSA9IHRoaXMucGFyc2VEYXRlKG1heF9kYXRlKTtcblx0XHRcdC8vIH1cblx0XHRcdC8vIGlmIChtYXhfZGF0ZSkge1xuXHRcdFx0Ly8gXHRpZiAoZGF0ZV9pc28gPiBzZXR0aW5ncy5tYXhfZGF0ZSkge1xuXHRcdFx0Ly8gXHRcdHRocm93KHNldHRpbmdzLkVfTUFYX0RBVEUpO1xuXHRcdFx0Ly8gXHR9XG5cdFx0XHQvLyB9XG5cblx0XHRcdGlmICh0aGlzLmN1c3RvbV92YWxpZGF0aW9uKSB7XG5cdFx0XHRcdGRhdGVfb2JqLmRhdGUgPSBuZXcgRGF0ZShcblx0XHRcdFx0XHRwYXJzZUludChkYXRlX29iai55ZWFyLCAxMCksXG5cdFx0XHRcdFx0cGFyc2VJbnQoZGF0ZV9vYmoubW9udGgsIDEwKSAtIDEsXG5cdFx0XHRcdFx0cGFyc2VJbnQoZGF0ZV9vYmouZGF5LCAxMClcblx0XHRcdFx0KTtcblx0XHRcdFx0dGhpcy5jdXN0b21fdmFsaWRhdGlvbihkYXRlX29iaik7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dmFsaWRhdGVEYXkoKSB7XG5cdFx0XHRsZXQgb3B0ID0gc2V0dGluZ3M7XG5cdFx0XHRsZXQgaW5wdXQgPSB0aGlzLmlucHV0X2RheTtcblx0XHRcdHRoaXMuZGF5X3ZhbHVlID0gdW5kZWZpbmVkO1xuXHRcdFx0bGV0IHRleHQgPSBpbnB1dC5nZXQoKTtcblx0XHRcdGlmICh0ZXh0ID09PSAnJyB8fCAodGV4dCA9PT0gJzAnICYmIGlucHV0Lmhhc19mb2N1cykpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHRleHQubWF0Y2goL1xcRC8pKSB7XG5cdFx0XHRcdHRocm93KG9wdC5FX0RBWV9OQU4pO1xuXHRcdFx0fVxuXHRcdFx0bGV0IG51bSA9IHBhcnNlSW50KHRleHQsIDEwKTtcblx0XHRcdGlmIChudW0gPCAxKSB7XG5cdFx0XHRcdHRocm93KG9wdC5FX0RBWV9UT09fU01BTEwpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKG51bSA+IDMxKSB7XG5cdFx0XHRcdHRocm93KG9wdC5FX0RBWV9UT09fQklHKTtcblx0XHRcdH1cblx0XHRcdHRleHQgPSBudW0gPCAxMCA/ICcwJyArIG51bSA6ICcnICsgbnVtO1xuXHRcdFx0aWYgKCFpbnB1dC5oYXNfZm9jdXMpIHtcblx0XHRcdFx0aW5wdXQuc2V0KHRleHQpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5kYXlfdmFsdWUgPSB0ZXh0O1xuXHRcdH1cblxuXHRcdHZhbGlkYXRlRGF5c0luTW9udGgoKSB7XG5cdFx0XHRjb25zdCBkYXkgPSBwYXJzZUludCh0aGlzLmRheV92YWx1ZSwgMTApO1xuXHRcdFx0Y29uc3QgbW9udGggPSBwYXJzZUludCh0aGlzLm1vbnRoX3ZhbHVlLCAxMCk7XG5cdFx0XHRjb25zdCB5ZWFyID0gcGFyc2VJbnQodGhpcy55ZWFyX3ZhbHVlLCAxMCk7XG5cdFx0XHRpZiAoZGF5IDwgMSB8fCBtb250aCA8IDEpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0bGV0IG1heCA9IHNldHRpbmdzLmRheXNfaW5fbW9udGhbbW9udGggLSAxXTtcblx0XHRcdGxldCBtc2cgPSBzZXR0aW5ncy5FX0JBRF9EQVlfRk9SX01PTlRIO1xuXHRcdFx0aWYgKG1vbnRoID09PSAyICYmICgnJyArIHllYXIpLmxlbmd0aCA9PT0gNCkge1xuXHRcdFx0XHRtYXggPSB5ZWFyICUgNCA/IDI4IDogeWVhciAlIDEwMCA/IDI5IDogeWVhciAlIDQwMCA/IDI4IDogMjk7XG5cdFx0XHRcdG1zZyA9IG1zZy5yZXBsYWNlKC8leS8sIHllYXIudG9TdHJpbmcoKSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRtc2cgPSBtc2cucmVwbGFjZSgvIColeS8sICcnKTtcblx0XHRcdH1cblx0XHRcdGlmIChkYXkgPiBtYXgpIHtcblx0XHRcdFx0dGhyb3cobXNnLnJlcGxhY2UoLyVkLywgbWF4LnRvU3RyaW5nKCkpLnJlcGxhY2UoLyVtLywgc2V0dGluZ3MubW9udGhfbmFtZVttb250aCAtIDFdKSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dmFsaWRhdGVNb250aCgpIHtcblx0XHRcdGxldCBpbnB1dCA9IHRoaXMuaW5wdXRfbW9udGg7XG5cdFx0XHR0aGlzLm1vbnRoX3ZhbHVlID0gdW5kZWZpbmVkO1xuXHRcdFx0bGV0IHRleHQgPSBpbnB1dC5nZXQoKTtcblx0XHRcdGlmICh0ZXh0ID09PSAnJyB8fCAodGV4dCA9PT0gJzAnICYmIGlucHV0Lmhhc19mb2N1cykpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHRleHQubWF0Y2goL1xcRC8pKSB7XG5cdFx0XHRcdHRocm93KHNldHRpbmdzLkVfTU9OVEhfTkFOKTtcblx0XHRcdH1cblx0XHRcdGxldCBudW0gPSBwYXJzZUludCh0ZXh0LCAxMCk7XG5cdFx0XHRpZiAobnVtIDwgMSkge1xuXHRcdFx0XHR0aHJvdyhzZXR0aW5ncy5FX01PTlRIX1RPT19TTUFMTCk7XG5cdFx0XHR9XG5cdFx0XHRpZiAobnVtID4gMTIpIHtcblx0XHRcdFx0dGhyb3coc2V0dGluZ3MuRV9NT05USF9UT09fQklHKTtcblx0XHRcdH1cblx0XHRcdHRleHQgPSBudW0gPCAxMCA/ICcwJyArIG51bSA6ICcnICsgbnVtO1xuXHRcdFx0aWYgKCFpbnB1dC5oYXNfZm9jdXMpIHtcblx0XHRcdFx0aW5wdXQuc2V0KHRleHQpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5tb250aF92YWx1ZSA9IHRleHQ7XG5cdFx0fVxuXG5cdFx0dmFsaWRhdGVZZWFyKCkge1xuXHRcdFx0Y29uc3QgaW5wdXQgPSB0aGlzLmlucHV0X3llYXI7XG5cdFx0XHR0aGlzLnllYXJfdmFsdWUgPSB1bmRlZmluZWQ7XG5cdFx0XHRsZXQgdGV4dCA9IGlucHV0LmdldCgpO1xuXHRcdFx0aWYgKHRleHQgPT09ICcnIHx8ICh0ZXh0ID09PSAnMCcgJiYgaW5wdXQuaGFzX2ZvY3VzKSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRpZiAodGV4dC5tYXRjaCgvXFxELykpIHtcblx0XHRcdFx0dGhyb3coc2V0dGluZ3MuRV9ZRUFSX05BTik7XG5cdFx0XHR9XG5cdFx0XHRpZiAoaW5wdXQuaGFzX2ZvY3VzKSB7XG5cdFx0XHRcdGlmICh0ZXh0Lmxlbmd0aCA+IDQpIHtcblx0XHRcdFx0XHR0aHJvdyhzZXR0aW5ncy5FX1lFQVJfTEVOR1RIKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKHRleHQubGVuZ3RoICE9PSA0KSB7XG5cdFx0XHRcdFx0dGhyb3coc2V0dGluZ3MuRV9ZRUFSX0xFTkdUSCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmICh0ZXh0Lmxlbmd0aCA9PT0gNCkge1xuXHRcdFx0XHRjb25zdCBudW0gPSBwYXJzZUludCh0ZXh0LCAxMCk7XG5cdFx0XHRcdGlmIChzZXR0aW5ncy5taW5feWVhciAmJiBudW0gPCBzZXR0aW5ncy5taW5feWVhcikge1xuXHRcdFx0XHRcdHRocm93KHNldHRpbmdzLkVfWUVBUl9UT09fU01BTEwucmVwbGFjZSgvJXkvLCBzZXR0aW5ncy5taW5feWVhcikpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHR0aGlzLnllYXJfdmFsdWUgPSB0ZXh0O1xuXHRcdH1cblxuXHRcdHdpZGdldEVycm9yVGV4dCgpIHtcblx0XHRcdGxldCBlcnJvcl90ZXh0ID0gJyc7XG5cdFx0XHQkLmVhY2godGhpcy5maWVsZHMsIGZ1bmN0aW9uIChpLCBpbnB1dCkge1xuXHRcdFx0XHRpZiAoaW5wdXQuZXJyb3JfdGV4dCkge1xuXHRcdFx0XHRcdGlmIChpbnB1dC5oYXNfZm9jdXMgfHwgZXJyb3JfdGV4dCA9PT0gJycpIHtcblx0XHRcdFx0XHRcdGVycm9yX3RleHQgPSBpbnB1dC5lcnJvcl90ZXh0XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdGlmIChlcnJvcl90ZXh0ID09PSAnJyAmJiB0aGlzLmVycm9yX3RleHQpIHtcblx0XHRcdFx0ZXJyb3JfdGV4dCA9IHRoaXMuZXJyb3JfdGV4dDtcblx0XHRcdH1cblx0XHRcdHJldHVybiBlcnJvcl90ZXh0O1xuXHRcdH1cblxuXHRcdHdpZGdldEZvY3VzTG9zdCgpIHtcblx0XHRcdGlmIChzZXR0aW5ncy5vbl9ibHVyICYmICF0aGlzLndyYXBwZXIuaXMoJy5mb2N1cycpKSB7XG5cdFx0XHRcdHNldHRpbmdzLm9uQmx1cigpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGNsYXNzIEtyRG9iSW5wdXQge1xuXHRcdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcblx0XHRcdGNvbnN0IGlucHV0ID0gdGhpcztcblx0XHRcdHRoaXMuZG9iZmllbGQgPSBvcHRpb25zLmtyZG9iZW50cnk7XG5cdFx0XHR0aGlzLm5hbWUgPSBvcHRpb25zLm5hbWU7XG5cdFx0XHR0aGlzLmluZGV4ID0gb3B0aW9ucy5pbmRleDtcblx0XHRcdHRoaXMuaGludF90ZXh0ID0gb3B0aW9ucy5oaW50X3RleHQ7XG5cdFx0XHR0aGlzLmhhc19mb2N1cyA9IGZhbHNlO1xuXHRcdFx0dGhpcy5lbXB0eSA9IHRydWU7XG5cdFx0XHR0aGlzLiRpbnB1dCA9ICQoJzxpbnB1dCB0eXBlPVwidGV4dFwiIHZhbHVlPVwiXCIgLz4nKS5hZGRDbGFzcygnanEtZHRlLScgKyB0aGlzLm5hbWUpLmF0dHIoJ2FyaWEtbGFiZWwnLCAnJyArIFwiIChcIiArIHRoaXMuaGludF90ZXh0ICsgXCIpXCIpLmZvY3VzKCQucHJveHkoaW5wdXQsICdmb2N1cycpKS5ibHVyKCQucHJveHkoaW5wdXQsICdibHVyJykpLmtleWRvd24oZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0aW5wdXQua2V5ZG93bihlKTtcblx0XHRcdFx0fSwgMilcblx0XHRcdH0pLmtleXVwKGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdGlucHV0LmtleXVwKGUpO1xuXHRcdFx0XHR9LCAyKVxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0Ymx1cigpIHtcblx0XHRcdHRoaXMuaGFzX2ZvY3VzID0gZmFsc2U7XG5cdFx0XHR0aGlzLmRvYmZpZWxkLmZvY3VzT3V0KCk7XG5cdFx0XHR0aGlzLnNob3dfaGludCgpO1xuXHRcdFx0dGhpcy5kb2JmaWVsZC52YWxpZGF0ZSh0aGlzKTtcblx0XHR9XG5cblx0XHRjbGVhckVycm9yKCkge1xuXHRcdFx0ZGVsZXRlIHRoaXMuZXJyb3JfdGV4dDtcblx0XHRcdHRoaXMuJGlucHV0LnJlbW92ZUNsYXNzKCdlcnJvcicpO1xuXHRcdH1cblxuXHRcdGZvY3VzKCkge1xuXHRcdFx0dGhpcy5rZXlfaXNfZG93biA9IGZhbHNlO1xuXHRcdFx0aWYgKHRoaXMuJGlucHV0LnByb3AoJ3JlYWRvbmx5JykpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5oYXNfZm9jdXMgPSB0cnVlO1xuXHRcdFx0dGhpcy5kb2JmaWVsZC5mb2N1c0luKCk7XG5cdFx0XHRpZiAodGhpcy4kaW5wdXQuaGFzQ2xhc3MoJ2hpbnQnKSkge1xuXHRcdFx0XHR0aGlzLiRpbnB1dC52YWwoJycpLnJlbW92ZUNsYXNzKCdoaW50Jyk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLmRvYmZpZWxkLnNob3dFcnJvcigpO1xuXHRcdH1cblxuXHRcdGdldCgpIHtcblx0XHRcdGxldCB2YWwgPSB0aGlzLiRpbnB1dC52YWwoKTtcblx0XHRcdHJldHVybiB2YWwgPT09IHRoaXMuaGludF90ZXh0ID8gJycgOiB2YWw7XG5cdFx0fVxuXG5cdFx0aXNEaWdpdEtleShlKSB7XG5cdFx0XHRsZXQga2V5Y29kZSA9IGUud2hpY2g7XG5cdFx0XHRyZXR1cm4ga2V5Y29kZSA+PSA0OCAmJiBrZXljb2RlIDw9IDU3IHx8IGtleWNvZGUgPj0gOTYgJiYga2V5Y29kZSA8PSAxMDU7XG5cdFx0fVxuXG5cdFx0a2V5ZG93bigpIHtcblx0XHRcdC8vIElnbm9yZSBrZXl1cCBldmVudHMgdGhhdCBhcnJpdmUgYWZ0ZXIgZm9jdXMgbW92ZWQgdG8gbmV4dCBmaWVsZFxuXHRcdFx0dGhpcy5rZXlfaXNfZG93biA9IHRydWU7XG5cdFx0fVxuXG5cdFx0a2V5dXAoZSkge1xuXHRcdFx0aWYgKCF0aGlzLmtleV9pc19kb3duKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdC8vIEhhbmRsZSBCYWNrc3BhY2UgLSBzaGlmdGluZyBmb2N1cyB0byBwcmV2aW91cyBmaWVsZCBpZiByZXF1aXJlZFxuXHRcdFx0bGV0IGtleWNvZGUgPSBlLndoaWNoO1xuXHRcdFx0aWYgKGtleWNvZGUgPT09IGtleS5CQUNLU1BBQ0UgJiYgdGhpcy5lbXB0eSkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5kb2JmaWVsZC5mb2N1c0ZpZWxkQmVmb3JlKHRoaXMpO1xuXHRcdFx0fVxuXHRcdFx0bGV0IHRleHQgPSB0aGlzLmdldCgpO1xuXHRcdFx0dGhpcy5lbXB0eSA9IHRleHQgPT09ICcnO1xuXG5cdFx0XHQvLyBUcmFwIGFuZCBkaXNjYXJkIHNlcGFyYXRvciBjaGFyYWN0ZXJzIC0gYWR2YW5jaW5nIGZvY3VzIGlmIHJlcXVpcmVkXG5cdFx0XHRpZiAodGV4dC5tYXRjaCgvW1xcL1xcXFwuIC1dLykpIHtcblx0XHRcdFx0dGV4dCA9IHRleHQucmVwbGFjZSgvW1xcL1xcXFwuIC1dLywgJycpO1xuXHRcdFx0XHR0aGlzLnNldCh0ZXh0KTtcblx0XHRcdFx0aWYgKCF0aGlzLmVtcHR5ICYmIHRoaXMuaW5kZXggPCAyKSB7XG5cdFx0XHRcdFx0dGhpcy5kb2JmaWVsZC5mb2N1c0ZpZWxkQWZ0ZXIodGhpcyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gQWR2YW5jZSBmb2N1cyBpZiB0aGlzIGZpZWxkIGlzIGJvdGggdmFsaWQgYW5kIGZ1bGxcblx0XHRcdGlmICh0aGlzLmRvYmZpZWxkLnZhbGlkYXRlKHRoaXMpKSB7XG5cdFx0XHRcdGxldCB3YW50ID0gdGhpcy5uYW1lID09PSAneWVhcicgPyA0IDogMjtcblx0XHRcdFx0aWYgKHRoaXMuaXNEaWdpdEtleShlKSAmJiB0ZXh0Lmxlbmd0aCA9PT0gd2FudCkge1xuXHRcdFx0XHRcdHRoaXMuZG9iZmllbGQuZm9jdXNGaWVsZEFmdGVyKHRoaXMpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0bGVmdCgpIHtcblx0XHRcdHJldHVybiB0aGlzLiRpbnB1dC5wb3NpdGlvbigpLmxlZnQ7XG5cdFx0fVxuXG5cdFx0c2V0KG5ld192YWx1ZSkge1xuXHRcdFx0dGhpcy4kaW5wdXQudmFsKG5ld192YWx1ZSkucmVtb3ZlQ2xhc3MoJ2hpbnQnKTtcblx0XHRcdGlmICghdGhpcy5oYXNfZm9jdXMpIHtcblx0XHRcdFx0dGhpcy5zaG93X2hpbnQoKTtcblx0XHRcdH1cblx0XHRcdHRoaXMuZW1wdHkgPSBuZXdfdmFsdWUgPT09ICcnO1xuXHRcdFx0dGhpcy5jbGVhckVycm9yKCk7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9XG5cblx0XHRzZXRFcnJvcih0ZXh0KSB7XG5cdFx0XHR0aGlzLmVycm9yX3RleHQgPSB0ZXh0O1xuXHRcdFx0dGhpcy4kaW5wdXQuYWRkQ2xhc3MoJ2Vycm9yJyk7XG5cdFx0XHR0aGlzLmRvYmZpZWxkLnNob3dFcnJvcigpO1xuXHRcdH1cblxuXHRcdHNldEZvY3VzKHNlbGVjdF9hbGwpIHtcblx0XHRcdGxldCAkaW5wdXQgPSB0aGlzLiRpbnB1dDtcblx0XHRcdCRpbnB1dC5mb2N1cygpO1xuXHRcdFx0aWYgKHNlbGVjdF9hbGwpIHtcblx0XHRcdFx0JGlucHV0LnNlbGVjdCgpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0JGlucHV0LnZhbCgkaW5wdXQudmFsKCkpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fVxuXG5cdFx0c2V0V2lkdGgobmV3X3dpZHRoKSB7XG5cdFx0XHR0aGlzLiRpbnB1dC53aWR0aChuZXdfd2lkdGgpO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fVxuXG5cdFx0c2hvd19oaW50KCkge1xuXHRcdFx0aWYgKHRoaXMuZ2V0KCkgPT09ICcnICYmIHR5cGVvZiAodGhpcy5oaW50X3RleHQpID09PSAnc3RyaW5nJykge1xuXHRcdFx0XHR0aGlzLiRpbnB1dC52YWwodGhpcy5oaW50X3RleHQpLmFkZENsYXNzKCdoaW50Jyk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9XG5cblx0XHR5aWVsZEZvY3VzKCkge1xuXHRcdFx0dGhpcy4kaW5wdXQuYmx1cigpO1xuXHRcdH1cblx0fVxuXG5cdCQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcblx0XHQkKCcuZG9iaXNzdWUnKS5lYWNoKGZ1bmN0aW9uICgpIHtcblx0XHRcdG15S3JEb2JFbnRyeSA9IG5ldyBLckRvYkVudHJ5KCQodGhpcyksIHt9KTtcblx0XHR9KTtcblx0fSk7XG59KGpRdWVyeSkpOyIsIi8vIG5vaW5zcGVjdGlvbiBEdXBsaWNhdGVkQ29kZVxuXG4vKipcbiAqIEBwYWNrYWdlICAgIEtub3cgUmVzZXJ2YXRpb25zXG4gKiBAc3VicGFja2FnZSBBZG1pbiBKU1xuICogQGNvcHlyaWdodCAgMjAyMCBIaWdobGFuZCBWaXNpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBAbGljZW5zZSAgICBTZWUgdGhlIGZpbGUgXCJMSUNFTlNFLnR4dFwiIGZvciB0aGUgZnVsbCBsaWNlbnNlIGdvdmVybmluZyB0aGlzIGNvZGUuXG4gKiBAYXV0aG9yICAgICBIYXplbCBXaWxzb24gPGhhemVsQGhpZ2hsYW5kdmlzaW9uLmNvbT5cbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgkKSB7XG5cdCQoZnVuY3Rpb24gKCkge1xuXHRcdGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaG93dG9hcnJpdmUnKSkge1xuXHRcdFx0Y29uc3QgaG93dG9hcnJpdmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaG93dG9hcnJpdmUnKTtcblx0XHRcdGxldCBhcnJpdmFsbWVhbnMgPSBob3d0b2Fycml2ZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtbWVhbnMnKTtcblx0XHRcdGlmICghYXJyaXZhbG1lYW5zKSB7XG5cdFx0XHRcdGFycml2YWxtZWFucyA9ICdhaXInO1xuXHRcdFx0fVxuXHRcdFx0ZGlzcGxheUFycml2YWwoYXJyaXZhbG1lYW5zKTtcblx0XHR9XG5cblx0XHQkKCdib2R5Jykub24oJ2NsaWNrJywgJy5hbWl0ZW0nLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0ZGlzcGxheUFycml2YWwoJCh0aGlzKS5hdHRyKCdpZCcpKTtcblx0XHR9KTtcblx0fSk7XG5cblx0ZnVuY3Rpb24gZGlzcGxheUFycml2YWwodmFsdWUpIHtcblx0XHRsZXQgeCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FtaXRlbScpO1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgeC5sZW5ndGg7IGkrKykge1xuXHRcdFx0eFtpXS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcblx0XHR9XG5cblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWlyLWRhdGEnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0cmFpbi1kYXRhJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXV0by1kYXRhJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3RoZXItZGF0YScpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cdFx0bGV0IGFycml2YWxkYXRhID0gdmFsdWUgKyAnLWRhdGEnO1xuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGFycml2YWxkYXRhKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh2YWx1ZSkuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2pmb3JtX2Fycml2YWxfbWVhbnMnKS52YWx1ZSA9IHZhbHVlO1xuXHR9XG59KShqUXVlcnkpOyIsIi8qKlxuICogQHBhY2thZ2UgICAgS25vdyBSZXNlcnZhdGlvbnNcbiAqIEBzdWJwYWNrYWdlIFNpdGUgSlNcbiAqIEBjb3B5cmlnaHQgIDIwMjAgSGlnaGxhbmQgVmlzaW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogQGxpY2Vuc2UgICAgU2VlIHRoZSBmaWxlIFwiTElDRU5TRS50eHRcIiBmb3IgdGhlIGZ1bGwgbGljZW5zZSBnb3Zlcm5pbmcgdGhpcyBjb2RlLlxuICogQGF1dGhvciAgICAgSGF6ZWwgV2lsc29uIDxoYXplbEBoaWdobGFuZHZpc2lvbi5jb20+XG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbmxldCBvdkNoaWxkcmVuLCBvdlN0YXRlID0gbnVsbCwgb3ZQcyA9IDAsICRvdkJ0bjtcbmxldCBmY0NoaWxkcmVuLCBmY1N0YXRlID0gbnVsbCwgJGZjQnRuO1xubGV0IHR0Q2hpbGRyZW4sIHR0U3RhdGUgPSBudWxsLCB0dFBzID0gMCwgJHR0QnRuLCB0dHBhcmFzO1xubGV0IGN1cnJlbnRQYXJhZ3JhcGgsIGhyRWxlbWVudDtcblxuKGZ1bmN0aW9uICgkKSB7XG4gICAgJChmdW5jdGlvbiAoKSB7XG4gICAgICAgIG92Q2hpbGRyZW4gPSAkKCcucmVhZG1vcmUtb3ZlcnZpZXcnKS5jaGlsZHJlbigncCwgaDUsIHVsJyk7XG4gICAgICAgIG92UHMgPSBvdkNoaWxkcmVuLmxlbmd0aDtcbiAgICAgICAgaWYgKG92UHMgPiAzKSB7XG4gICAgICAgICAgICBvdkNoaWxkcmVuLnNsaWNlKDMpLmhpZGUoKTtcbiAgICAgICAgICAgIG92Q2hpbGRyZW4uc2xpY2Uob3ZQcyAtIDEsIG92UHMpLmFmdGVyKCc8ZGl2IGNsYXNzPVwidGV4dC1jZW50ZXJcIj48YSBjbGFzcz1cImJ1dHRvbiBob2xsb3cnICtcbiAgICAgICAgICAgICAgICAnIHJlYWRtb3JlIG92ZXJ2aWV3LXRvZ2dsZVwiPlJlYWQgbW9yZS4uLjwvYT48L2Rpdj4nKTtcbiAgICAgICAgICAgIG92U3RhdGUgPSAnaGlkZGVuJztcbiAgICAgICAgfVxuXG4gICAgICAgIHR0Q2hpbGRyZW4gPSAkKCcucmVhZG1vcmUtdGVzdGltb25pYWxzJykuY2hpbGRyZW4oJ3AnKTtcbiAgICAgICAgdHRQcyA9IHR0Q2hpbGRyZW4ubGVuZ3RoO1xuICAgICAgICBpZiAodHRQcyA+IDEwKSB7XG4gICAgICAgICAgICB0dENoaWxkcmVuLnNsaWNlKDExKS5oaWRlKCk7XG4gICAgICAgICAgICB0dHBhcmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnJlYWRtb3JlLXRlc3RpbW9uaWFscyBwW3N0eWxlKj1cImRpc3BsYXk6IG5vbmVcIl0nKTtcbiAgICAgICAgICAgIGRvSFJzKHR0cGFyYXMsICdoaWRlJyk7XG4gICAgICAgICAgICB0dENoaWxkcmVuLnNsaWNlKHR0UHMgLSAxLCB0dFBzKS5hZnRlcignPGEgY2xhc3M9XCJidXR0b24gaG9sbG93JyArXG4gICAgICAgICAgICAgICAgJyBhY2NlbnQgcmVhZG1vcmUgdGVzdGltb25pYWxzLXRvZ2dsZVwiPlJlYWQgbW9yZS4uLjwvYT4nKTtcbiAgICAgICAgICAgIHR0U3RhdGUgPSAnaGlkZGVuJztcbiAgICAgICAgfVxuXG4gICAgICAgIGZjQ2hpbGRyZW4gPSAkKCcucmVhZG1vcmUtZmFjaWxpdGllcycpLmNoaWxkcmVuKCcucm9vbXMnKTtcbiAgICAgICAgaWYgKGZjQ2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICAgICAgICBmY0NoaWxkcmVuLmhpZGUoKS5hZnRlcignPGEgY2xhc3M9XCJidXR0b24gaG9sbG93JyArXG4gICAgICAgICAgICAgICAgJyBhY2NlbnQgcmVhZG1vcmUgZmFjaWxpdGllcy10b2dnbGVcIj5TZWUgYWxsIGZhY2lsaXRpZXMuLi48L2E+Jyk7XG4gICAgICAgICAgICBmY1N0YXRlID0gJ2hpZGRlbic7XG4gICAgICAgIH1cblxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLnJlYWRtb3JlLm92ZXJ2aWV3LXRvZ2dsZScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAkb3ZCdG4gPSAkKFwiLm92ZXJ2aWV3LXRvZ2dsZVwiKTtcbiAgICAgICAgICAgIGlmIChvdlN0YXRlID09PSAndmlzaWJsZScpIHtcbiAgICAgICAgICAgICAgICBvdkNoaWxkcmVuLnNsaWNlKDMpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAkb3ZCdG4uYXR0cigndmFsdWUnLCAnUmVhZCBtb3JlJyk7XG4gICAgICAgICAgICAgICAgJG92QnRuLnRleHQoXCJSZWFkIG1vcmUuLi5cIik7XG4gICAgICAgICAgICAgICAgb3ZTdGF0ZSA9ICdoaWRkZW4nO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChvdlN0YXRlID09PSAnaGlkZGVuJykge1xuICAgICAgICAgICAgICAgICQoJy5yZWFkbW9yZS1vdmVydmlldycpLmZpbmQoJzpoaWRkZW4nKS5zaG93KCk7XG4gICAgICAgICAgICAgICAgJG92QnRuLmF0dHIoJ3ZhbHVlJywgJ1JlYWQgbGVzcycpO1xuICAgICAgICAgICAgICAgICRvdkJ0bi50ZXh0KFwiUmVhZCBsZXNzLi4uXCIpO1xuICAgICAgICAgICAgICAgIG92U3RhdGUgPSAndmlzaWJsZSc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkKCcucHJvcGVydHktbWVudScpLmZvdW5kYXRpb24oJ2NhbGNQb2ludHMnKTtcbiAgICAgICAgICAgICQoJy5zdGlja3knKS5mb3VuZGF0aW9uKCdfY2FsYycsIHRydWUpO1xuICAgICAgICB9KS5vbignY2xpY2snLCAnLnJlYWRtb3JlLnRlc3RpbW9uaWFscy10b2dnbGUnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgJHR0QnRuID0gJChcIi50ZXN0aW1vbmlhbHMtdG9nZ2xlXCIpO1xuICAgICAgICAgICAgaWYgKHR0U3RhdGUgPT09ICd2aXNpYmxlJykge1xuICAgICAgICAgICAgICAgIHR0Q2hpbGRyZW4uc2xpY2UoMTEpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICBkb0hScyh0dHBhcmFzLCAnaGlkZScpO1xuICAgICAgICAgICAgICAgICR0dEJ0bi5hdHRyKCd2YWx1ZScsICdSZWFkIG1vcmUnKTtcbiAgICAgICAgICAgICAgICAkdHRCdG4udGV4dChcIlJlYWQgbW9yZS4uLlwiKTtcbiAgICAgICAgICAgICAgICB0dFN0YXRlID0gJ2hpZGRlbic7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR0U3RhdGUgPT09ICdoaWRkZW4nKSB7XG4gICAgICAgICAgICAgICAgJCgnLnJlYWRtb3JlLXRlc3RpbW9uaWFscyBwJykuc2hvdygpO1xuICAgICAgICAgICAgICAgIGRvSFJzKHR0cGFyYXMsICdzaG93Jyk7XG4gICAgICAgICAgICAgICAgJHR0QnRuLmF0dHIoJ3ZhbHVlJywgJ1JlYWQgbGVzcycpO1xuICAgICAgICAgICAgICAgICR0dEJ0bi50ZXh0KFwiUmVhZCBsZXNzLi4uXCIpO1xuICAgICAgICAgICAgICAgIHR0U3RhdGUgPSAndmlzaWJsZSc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkKCcucHJvcGVydHktbWVudScpLmZvdW5kYXRpb24oJ2NhbGNQb2ludHMnKTtcbiAgICAgICAgICAgICQoJy5zdGlja3knKS5mb3VuZGF0aW9uKCdfY2FsYycsIHRydWUpO1xuICAgICAgICB9KS5vbignY2xpY2snLCAnLnJlYWRtb3JlLmZhY2lsaXRpZXMtdG9nZ2xlJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICRmY0J0biA9ICQoXCIuZmFjaWxpdGllcy10b2dnbGVcIik7XG4gICAgICAgICAgICBpZiAoZmNTdGF0ZSA9PT0gJ3Zpc2libGUnKSB7XG4gICAgICAgICAgICAgICAgJCgnLnJlYWRtb3JlLWZhY2lsaXRpZXMgLnJvb21zJykuaGlkZSgpO1xuICAgICAgICAgICAgICAgICRmY0J0bi5hdHRyKCd2YWx1ZScsICdTZWUgYWxsIGZhY2lsaXRpZXMnKTtcbiAgICAgICAgICAgICAgICAkZmNCdG4udGV4dChcIlNlZSBhbGwgZmFjaWxpdGllcy4uLlwiKTtcbiAgICAgICAgICAgICAgICBmY1N0YXRlID0gJ2hpZGRlbic7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGZjU3RhdGUgPT09ICdoaWRkZW4nKSB7XG4gICAgICAgICAgICAgICAgJCgnLnJlYWRtb3JlLWZhY2lsaXRpZXMgLnJvb21zJykuc2hvdygpO1xuICAgICAgICAgICAgICAgICRmY0J0bi5hdHRyKCd2YWx1ZScsICdIaWRlIGFsbCBmYWNpbGl0aWVzJyk7XG4gICAgICAgICAgICAgICAgJGZjQnRuLnRleHQoXCJIaWRlIGFsbCBmYWNpbGl0aWVzLi4uXCIpO1xuICAgICAgICAgICAgICAgIGZjU3RhdGUgPSAndmlzaWJsZSc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkKCcucHJvcGVydHktbWVudScpLmZvdW5kYXRpb24oJ2NhbGNQb2ludHMnKTtcbiAgICAgICAgICAgICQoJy5zdGlja3knKS5mb3VuZGF0aW9uKCdfY2FsYycsIHRydWUpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0oalF1ZXJ5KSk7XG5cbmZ1bmN0aW9uIGRvSFJzKHBhcmFncmFwaHMsIHR5cGUpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhcmFncmFwaHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY3VycmVudFBhcmFncmFwaCA9IHBhcmFncmFwaHNbaV07XG4gICAgICAgIGhyRWxlbWVudCA9IGN1cnJlbnRQYXJhZ3JhcGgubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICBpZiAoaHJFbGVtZW50ICYmIGhyRWxlbWVudC50YWdOYW1lID09PSAnSFInKSB7XG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gJ2hpZGUnKVxuICAgICAgICAgICAgICAgIGhyRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGhyRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgfVxuICAgIH1cbn0iLCIvKipcbiAqIEBwYWNrYWdlICAgIEtub3cgUmVzZXJ2YXRpb25zXG4gKiBAc3VicGFja2FnZSBTaXRlIEpTXG4gKiBAY29weXJpZ2h0ICAyMDIwIEhpZ2hsYW5kIFZpc2lvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIEBsaWNlbnNlICAgIFNlZSB0aGUgZmlsZSBcIkxJQ0VOU0UudHh0XCIgZm9yIHRoZSBmdWxsIGxpY2Vuc2UgZ292ZXJuaW5nIHRoaXMgY29kZS5cbiAqIEBhdXRob3IgICAgIEhhemVsIFdpbHNvbiA8aGF6ZWxAaGlnaGxhbmR2aXNpb24uY29tPlxuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG5jb25zdCBsYW5nID0gXCJlblwiO1xuXG4oZnVuY3Rpb24gKCQpIHtcbiAgICBjb25zdCBtYXJrZXJzaGFwZSA9IHtcbiAgICAgICAgdHlwZTogJ3BvbHknLFxuICAgICAgICBjb29yZHM6IFsxLCAxLCAxLCAzMiwgMzcsIDMyLCAzMiwgMV1cbiAgICB9O1xuXG4gICAgbGV0IG15S3JtYXA7XG4gICAgbGV0IG1hcERhdGEgPSBmYWxzZTtcbiAgICBsZXQgbWFwO1xuICAgIGxldCBpbmZvV2luZG93O1xuICAgIGxldCBpbmZvV2luZG93MjtcbiAgICBsZXQgYm91bmRzO1xuICAgIGxldCBwcm9wZXJ0eWRpdjtcbiAgICBsZXQgcHJvcGVydHlpY29uO1xuICAgIGxldCBtYztcblxuICAgIGxldCBzZXR0aW5ncyA9IHtcbiAgICAgICAgcHJvcGVydHlNYXJrZXJzOiBbXSxcbiAgICAgICAgZmlsdGVySWRzOiBbXSxcbiAgICAgICAgbWFwTWFya2VyczogW10sXG4gICAgICAgIG1hcFR5cGVJZDogJycsXG4gICAgICAgIG1hcFpvb206IDEyLFxuICAgICAgICBtYXBNYXhab29tOiAyMCxcbiAgICAgICAgbWFwVHlwZTogJycsXG4gICAgICAgIG1hcElkOiAnJyxcbiAgICAgICAgbWFya2VyQ29sb3I6ICdyZWQnLFxuICAgIH07XG5cbiAgICBjbGFzcyBLcm1hcCB7XG4gICAgICAgIGNvbnN0cnVjdG9yKHNldHRpbmdzKSB7XG4gICAgICAgICAgICB0aGlzLnNldHRpbmdzID0gc2V0dGluZ3M7XG4gICAgICAgICAgICAvL0luaXRpYWxpc2UgbWFwIG9wdGlvbnNcbiAgICAgICAgICAgIHRoaXMuZ21PcHRpb25zID0ge1xuICAgICAgICAgICAgICAgIHNjcm9sbHdoZWVsOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB6b29tOiB0aGlzLnNldHRpbmdzLm1hcFpvb20sXG4gICAgICAgICAgICAgICAgbWF4Wm9vbTogdGhpcy5zZXR0aW5ncy5tYXBNYXhab29tLFxuICAgICAgICAgICAgICAgIG1hcFR5cGVJZDogdGhpcy5zZXR0aW5ncy5tYXBUeXBlSWQsXG4gICAgICAgICAgICAgICAgc3RyZWV0Vmlld0NvbnRyb2w6IGZhbHNlXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLmdtYXJrZXJzID0gW107XG4gICAgICAgICAgICB0aGlzLmNvdW50ID0gMDtcbiAgICAgICAgICAgIHRoaXMuaW5pdE1hcCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGljIGNsb3NlS3JJbmZvd2luZG93KCkge1xuICAgICAgICAgICAgJCgnI2tyLWluZm93aW5kb3cnKS5oaWRlKCk7XG4gICAgICAgICAgICBpbmZvV2luZG93LmNsb3NlKCk7XG4gICAgICAgICAgICBpbmZvV2luZG93Mi5jbG9zZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gb25seSBzaG93IHZpc2libGUgbWFya2Vyc1xuICAgICAgICBzdGF0aWMgc2hvd1Zpc2libGVNYXJrZXJzKG1hcmtlcnMpIHtcbiAgICAgICAgICAgIGxldCBib3VuZHMgPSBtYXAuZ2V0Qm91bmRzKCk7XG4gICAgICAgICAgICBsZXQgY291bnQgPSAwO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBkID0gMDsgZCA8IG1hcmtlcnMubGVuZ3RoOyBkKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgbWFya2VyID0gbWFya2Vyc1tkXTtcbiAgICAgICAgICAgICAgICBpZiAobWFya2VyLnR5cGUgPT09ICdtYXAnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChib3VuZHMuY29udGFpbnMobWFya2VyLmdldFBvc2l0aW9uKCkpID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXJrZXIuc2V0VmlzaWJsZSh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXJrZXIuc2V0VmlzaWJsZShmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBjb3VudDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENoZWNrIE1hcmtlcnMgYXJyYXkgZm9yIGR1cGxpY2F0ZSBwb3NpdGlvbiBhbmQgb2Zmc2V0IGEgbGl0dGxlXG4gICAgICAgIGNoZWNrRHVwbGljYXRlKGN1cnJlbnQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmdtYXJrZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBsZXQgZHVwcyA9IDA7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuZ21hcmtlcnMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwb3MgPSB0aGlzLmdtYXJrZXJzW2luZGV4XS5nZXRQb3NpdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudC5lcXVhbHMocG9zKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZHVwcysrO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGEgPSAzNjAuMCAvIGR1cHM7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV3TGF0ID0gcG9zLmxhdCgpICsgLS4wMDAwMiAqIE1hdGguY29zKCgrYSAqIGR1cHMpIC8gMTgwICogTWF0aC5QSSk7ICAvL3hcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuZXdMbmcgPSBwb3MubG5nKCkgKyAtLjAwMDAwICogTWF0aC5zaW4oKCthICogZHVwcykgLyAxODAgKiBNYXRoLlBJKTsgIC8vWVxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudCA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmcobmV3TGF0LCBuZXdMbmcpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gY3VycmVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNoZWNrWm9vbSgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLm1hcFpvb20gPiAwKSB7XG4gICAgICAgICAgICAgICAgbGV0IG15bGlzdGVuZXIgPSBtYXAuYWRkTGlzdGVuZXIoJ2lkbGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXAuZ2V0Wm9vbSgpICE9PSB0aGlzLnNldHRpbmdzLm1hcFpvb20pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcC5zZXRab29tKHRoaXMuc2V0dGluZ3MubWFwWm9vbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBteWxpc3RlbmVyLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjbHVzdGVyTWFwKCkge1xuICAgICAgICAgICAgY29uc3QgbWNPcHRpb25zID0ge1xuICAgICAgICAgICAgICAgIGdyaWRTaXplOiA1MCxcbiAgICAgICAgICAgICAgICBpZ25vcmVIaWRkZW5NYXJrZXJzOiB0cnVlLFxuICAgICAgICAgICAgICAgIGltYWdlUGF0aDogJy9tZWRpYS9jb21fa25vd3Jlcy9pbWFnZXMvbWFya2VyY2x1c3RlcmVyL20nXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBtYXAubWF4RGVmYXVsdFpvb20gPSB0aGlzLnNldHRpbmdzLm1hcFpvb207XG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5tYXBab29tID4gMCkge1xuICAgICAgICAgICAgICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyT25jZShtYXAsIFwiYm91bmRzX2NoYW5nZWRcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFpvb20oTWF0aC5taW4odGhpcy5nZXRab29tKCksIHRoaXMubWF4RGVmYXVsdFpvb20pKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zZXRQcm9wZXJ0eU1hcmtlcnMoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0TWFwTWFya2VycygpO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBkID0gMDsgZCA8IHRoaXMuZ21hcmtlcnMubGVuZ3RoOyBkKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgbWFya2VyID0gdGhpcy5nbWFya2Vyc1tkXTtcbiAgICAgICAgICAgICAgICBpZiAobWFya2VyLnR5cGUgPT09ICdwcm9wZXJ0eScpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuZmlsdGVySWRzLmluY2x1ZGVzKG1hcmtlci5waWQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXJrZXIuc2V0VmlzaWJsZSh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtlci5zZXRWaXNpYmxlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbWMgPSBuZXcgTWFya2VyQ2x1c3RlcmVyKG1hcCwgdGhpcy5nbWFya2VycywgbWNPcHRpb25zKTtcbiAgICAgICAgICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKG1jLCBcImNsdXN0ZXJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgJCgnI2tyLWluZm93aW5kb3cnKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgaW5mb1dpbmRvdy5jbG9zZSgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIG1hcC5maXRCb3VuZHMoYm91bmRzKTtcbiAgICAgICAgICAgIG1hcC5zZXRDZW50ZXIoYm91bmRzLmdldENlbnRlcigpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENyZWF0ZSB0aGUgTWFwXG4gICAgICAgIGNyZWF0ZU1hcCgpIHtcbiAgICAgICAgICAgIG1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5zZXR0aW5ncy5tYXBJZCksIHRoaXMuZ21PcHRpb25zKTtcbiAgICAgICAgICAgIGluZm9XaW5kb3cgPSBuZXcgZ29vZ2xlLm1hcHMuSW5mb1dpbmRvdygpO1xuICAgICAgICAgICAgaW5mb1dpbmRvdzIgPSBuZXcgZ29vZ2xlLm1hcHMuSW5mb1dpbmRvdygpO1xuICAgICAgICAgICAgYm91bmRzID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZ0JvdW5kcygpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ3JlYXRlIHRoZSBtYXJrZXIgYW5kIHNldCB1cCB0aGUgZXZlbnQgd2luZG93XG4gICAgICAgIGNyZWF0ZU1hcE1hcmtlcihwb2ludCwgaHRtbCwgaW1hZ2UsIGJveGluZm8sIGxpbmssIHRpdGxlKSB7XG4gICAgICAgICAgICBsZXQgbWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XG4gICAgICAgICAgICAgICAgc2hhcGU6IG1hcmtlcnNoYXBlLFxuICAgICAgICAgICAgICAgIGxpbms6IGxpbmssXG4gICAgICAgICAgICAgICAgaWNvbjogaW1hZ2UsXG4gICAgICAgICAgICAgICAgcG9zaXRpb246IHBvaW50LFxuICAgICAgICAgICAgICAgIHRpdGxlOiB0aXRsZSxcbiAgICAgICAgICAgICAgICBtYXA6IG1hcCxcbiAgICAgICAgICAgICAgIHpJbmRleDogOTk5XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIobWFya2VyLCAnbW91c2VvdmVyJywgKGZ1bmN0aW9uIChodG1sKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5mb1dpbmRvdzIuc2V0Q29udGVudChodG1sKTtcbiAgICAgICAgICAgICAgICAgICAgaW5mb1dpbmRvdzIub3BlbihtYXAsIG1hcmtlcik7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pKGh0bWwpKTtcblxuICAgICAgICAgICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIobWFya2VyLCAnbW91c2VvdXQnLCAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGluZm9XaW5kb3cyLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pKCkpO1xuXG4gICAgICAgICAgICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYXJrZXIsICdjbG9zZWNsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGluZm9XaW5kb3cyLmNsb3NlKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5nbWFya2Vycy5wdXNoKG1hcmtlcik7XG5cbiAgICAgICAgICAgIHRoaXMuY291bnQrKztcbiAgICAgICAgfVxuXG4gICAgICAgIGNyZWF0ZVByb3BlcnR5TWFya2VyKHBvaW50LCBodG1sLCBib3hpbmZvLCBsaW5rLCB0aXRsZSwgY29sb3IsIGlkLCBpbWFnZSwgcGlkKSB7XG4gICAgICAgICAgICBsZXQgbWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XG4gICAgICAgICAgICAgICAgcG9zaXRpb246IHBvaW50LFxuICAgICAgICAgICAgICAgIGxpbms6IGxpbmssXG4gICAgICAgICAgICAgICAgbWFwOiBtYXAsXG4gICAgICAgICAgICAgICAgaWNvbjogaW1hZ2UsXG4gICAgICAgICAgICAgICAgdGl0bGU6IHRpdGxlLFxuICAgICAgICAgICAgICAgIHBpZDogcGlkLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdwcm9wZXJ0eScsXG4gICAgICAgICAgICAgICAgekluZGV4OiB0aGlzLmNvdW50ICsgMTAwMFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHByb3BlcnR5ZGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICAgICAgICAgICAgbWFya2VyLmFkZExpc3RlbmVyKCdtb3VzZWRvd24nLCAoZnVuY3Rpb24gKGJveGluZm8pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpbmZvV2luZG93LmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgICQoJyNrci1pbmZvd2luZG93JykuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICBpbmZvV2luZG93LnNldENvbnRlbnQoaHRtbCk7XG4gICAgICAgICAgICAgICAgICAgIGluZm9XaW5kb3cub3BlbihtYXAsIG1hcmtlcik7XG5cbiAgICAgICAgICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAnL2luZGV4LnBocD9vcHRpb249Y29tX2tub3dyZXMmdGFzaz1wcm9wZXJ0eS5tYXBpbmZvd2luZG93JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogcGFyc2VJbnQoYm94aW5mbylcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJyNrci1pbmZvd2luZG93JykuZmFkZUluKDQwMCkuaHRtbChkYXRhKS5zaG93KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5rci1pbmZvd2luZG93LXNsaWRlc2hvd1wiKS5ub3QoJy5zbGljay1pbml0aWFsaXplZCcpLnNsaWNrKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dEFycm93OiAnPGkgY2xhc3M9XCJzbGljay1uYXYgbmV4dCBmYS1zb2xpZCBmYS1jaGV2cm9uLXJpZ2h0IFwiPjwvaT4nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmV2QXJyb3c6ICc8aSBjbGFzcz1cInNsaWNrLW5hdiBwcmV2IGZhLXNvbGlkIGZhLWNoZXZyb24tbGVmdCBcIj48L2k+JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXk6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pKGJveGluZm8pKTtcblxuICAgICAgICAgICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIobWFya2VyLCAnY2xvc2VjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAkKCcja3ItaW5mb3dpbmRvdycpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICBpbmZvV2luZG93LmNsb3NlKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5nbWFya2Vycy5wdXNoKG1hcmtlcik7XG4gICAgICAgICAgICBib3VuZHMuZXh0ZW5kKHBvaW50KTtcblxuICAgICAgICAgICAgdGhpcy5jb3VudCsrO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9Jbml0aWFsaXNlIG1hcFxuICAgICAgICBpbml0TWFwKCkge1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVNYXAoKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLm1hcFR5cGUgPT09ICdjbHVzdGVyJykge1xuICAgICAgICAgICAgICAgIHRoaXMuY2x1c3Rlck1hcCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNvbG9NYXAoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJlc2V0IG1hcCB0byBpbml0aWFsIHN0YXRlXG4gICAgICAgIHJlZnJlc2hNYXAoJG1hcG1vZGFsKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5tYXBUeXBlID09PSAnc29sbycpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICBqUXVlcnkuYWpheCh7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2luZGV4LnBocD9vcHRpb249Y29tX2tub3dyZXMmdGFzaz1wcm9wZXJ0aWVzLnJlZnJlc2htYXAnLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNldHRpbmdzLmZpbHRlcklkcyA9IHJlc3VsdC5kYXRhLmZpbHRlcklkcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGQgPSAwOyBkIDwgc2VsZi5nbWFya2Vycy5sZW5ndGg7IGQrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtYXJrZXIgPSBzZWxmLmdtYXJrZXJzW2RdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtYXJrZXIudHlwZSA9PT0gJ3Byb3BlcnR5Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5zZXR0aW5ncy5maWx0ZXJJZHMuaW5jbHVkZXMobWFya2VyLnBpZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtlci5zZXRWaXNpYmxlKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFya2VyLnNldFZpc2libGUoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBtYy5yZXBhaW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgRm91bmRhdGlvbi5SZXZlYWwoJG1hcG1vZGFsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRtYXBtb2RhbC5mb3VuZGF0aW9uKCdvcGVuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBnb29nbGUubWFwcy5ldmVudC50cmlnZ2VyKG1hcCwgJ3Jlc2l6ZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJG1hcG1vZGFsLmZvdW5kYXRpb24oJ29wZW4nKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5hbGVydChyZXN1bHQubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJlc2V0IG1hcCB0byBpbml0aWFsIHN0YXRlXG4gICAgICAgIHJlc2V0TWFwKCkge1xuICAgICAgICAgICAgaW5mb1dpbmRvdy5jbG9zZSgpO1xuICAgICAgICAgICAgaW5mb1dpbmRvdzIuY2xvc2UoKTtcbiAgICAgICAgICAgICQoJyNrci1pbmZvd2luZG93JykuaGlkZSgpO1xuICAgICAgICAgICAgbWFwLmZpdEJvdW5kcyhib3VuZHMpO1xuICAgICAgICAgICAgbWFwLnNldENlbnRlcihib3VuZHMuZ2V0Q2VudGVyKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbG9vcCB0byBzZXQgbWFwIG1hcmtlcnNcbiAgICAgICAgc2V0TWFwTWFya2VycygpIHtcbiAgICAgICAgICAgIGxldCBwb2ludDtcbiAgICAgICAgICAgIGxldCBhbWFyaztcblxuICAgICAgICAgICAgZm9yIChsZXQgZCA9IDA7IGQgPCB0aGlzLnNldHRpbmdzLm1hcE1hcmtlcnMubGVuZ3RoOyBkKyspIHtcbiAgICAgICAgICAgICAgICBhbWFyayA9IHRoaXMuc2V0dGluZ3MubWFwTWFya2Vyc1tkXTtcbiAgICAgICAgICAgICAgICBsZXQgbWFya2VyaWNvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBhbWFya1snaWNvbiddLFxuICAgICAgICAgICAgICAgICAgICBzaXplOiBuZXcgZ29vZ2xlLm1hcHMuU2l6ZSgzMiwgMzcpLFxuICAgICAgICAgICAgICAgICAgICAvLyBPUiBzY2FsZWRTaXplOiBuZXcgZ29vZ2xlLm1hcHMuU2l6ZSg0MCwgNDcpXG4gICAgICAgICAgICAgICAgICAgIG9yaWdpbjogbmV3IGdvb2dsZS5tYXBzLlBvaW50KDAsIDApLFxuICAgICAgICAgICAgICAgICAgICBhbmNob3I6IG5ldyBnb29nbGUubWFwcy5Qb2ludCgwLCAxOClcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgcG9pbnQgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKGFtYXJrWydsYXQnXSwgYW1hcmtbJ2xuZyddKTtcbiAgICAgICAgICAgICAgICBwb2ludCA9IHRoaXMuY2hlY2tEdXBsaWNhdGUocG9pbnQpO1xuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlTWFwTWFya2VyKHBvaW50LCBhbWFya1snaHRtbCddLCBtYXJrZXJpY29uLCAnJywgJycsIGFtYXJrWyd0aXRsZSddKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGxvb3AgdG8gc2V0IHByb3BlcnR5IG1hcmtlcnNcbiAgICAgICAgc2V0UHJvcGVydHlNYXJrZXJzKCkge1xuICAgICAgICAgICAgbGV0IHBvaW50O1xuICAgICAgICAgICAgbGV0IGFtYXJrO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBkID0gMDsgZCA8IHRoaXMuc2V0dGluZ3MucHJvcGVydHlNYXJrZXJzLmxlbmd0aDsgZCsrKSB7XG4gICAgICAgICAgICAgICAgYW1hcmsgPSB0aGlzLnNldHRpbmdzLnByb3BlcnR5TWFya2Vyc1tkXTtcbiAgICAgICAgICAgICAgICBpZiAoIWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydHlpY29uID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBhbWFya1snaWNvbiddLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZTogbmV3IGdvb2dsZS5tYXBzLlNpemUoMzIsIDM3KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9yaWdpbjogbmV3IGdvb2dsZS5tYXBzLlBvaW50KDAsIDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgYW5jaG9yOiBuZXcgZ29vZ2xlLm1hcHMuUG9pbnQoMCwgMjApXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcG9pbnQgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKGFtYXJrWydsYXQnXSwgYW1hcmtbJ2xuZyddKTtcbiAgICAgICAgICAgICAgICBwb2ludCA9IHRoaXMuY2hlY2tEdXBsaWNhdGUocG9pbnQpO1xuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlUHJvcGVydHlNYXJrZXIocG9pbnQsIGFtYXJrWydodG1sJ10sIGFtYXJrWydib3hpbmZvJ10sIGFtYXJrWydsaW5rJ10sIGFtYXJrWyd0aXRsZSddLFxuICAgICAgICAgICAgICAgICAgICBhbWFya1snY29sb3InXSwgYW1hcmtbJ2lkJ10sIHByb3BlcnR5aWNvbiwgYW1hcmtbJ3BpZCddKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHNvbG9NYXAoKSB7XG4gICAgICAgICAgICB0aGlzLnNldFByb3BlcnR5TWFya2VycygpO1xuICAgICAgICAgICAgdGhpcy5zZXRNYXBNYXJrZXJzKCk7XG5cbiAgICAgICAgICAgIG1hcC5maXRCb3VuZHMoYm91bmRzKTtcbiAgICAgICAgICAgIG1hcC5zZXRDZW50ZXIoYm91bmRzLmdldENlbnRlcigpKTtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tab29tKCk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLm1hcE1hcmtlcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuXG4gICAgICAgICAgICAgICAgbGV0IG15TGlzdGVuZXIgPSBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYXAsICdpZGxlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZm91bmQgPSAwO1xuICAgICAgICAgICAgICAgICAgICBsZXQgY3VycmVudFpvb20gPSBtYXAuZ2V0Wm9vbSgpO1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoIWZvdW5kKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3VuZCA9IEtybWFwLnNob3dWaXNpYmxlTWFya2VycyhzZWxmLmdtYXJrZXJzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmb3VuZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG15TGlzdGVuZXIucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwLnNldFpvb20oY3VycmVudFpvb20pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFpvb20gPSBjdXJyZW50Wm9vbSAtIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudFpvb20gPCAxMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAkKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0ICRtYXBtb2RhbDtcblxuICAgICAgICAkKCdib2R5Jykub24oJ2NsaWNrJywgJy5tYXAtdHJpZ2dlcicsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBpZiAobWFwRGF0YSkge1xuICAgICAgICAgICAgICAgIG15S3JtYXAucmVmcmVzaE1hcCgkbWFwbW9kYWwpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBraWNrTWFwKCQodGhpcykpO1xuICAgICAgICAgICAgICAgICRtYXBtb2RhbCA9ICQoJyNrci1zZWFyY2gtbWFwLW1vZGFsJyk7XG4gICAgICAgICAgICAgICAgJG1hcG1vZGFsLmZvdW5kYXRpb24oJ29wZW4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkub24oJ2NsaWNrJywgJy5yZXNldG1hcCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBteUtybWFwLnJlc2V0TWFwKCk7XG4gICAgICAgIH0pLm9uKCdjbGljaycsICcja3Itc2VhcmNoLW1hcC1mdWxsLWluZm93aW5kb3ctY2xvc2UnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgS3JtYXAuY2xvc2VLckluZm93aW5kb3coKTtcbiAgICAgICAgfSkub24oJ2NsaWNrJywgJy5jbG9zZW1hcCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAkbWFwbW9kYWwuZm91bmRhdGlvbignY2xvc2UnKTtcbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICAgICAgdXJsOiAnL2luZGV4LnBocD9vcHRpb249Y29tX2tub3dyZXMmdGFzaz1wcm9wZXJ0aWVzLm1hcHNlc3Npb24nLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgJCgnLmtyLXNlYXJjaGJhciAuYnV0dG9uLm1hcCcpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pLm9uKCdvcGVuLnpmLnJldmVhbCcsICcja3Itc2VhcmNoLW1hcC1tb2RhbCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAkKCcja3Itc2VhcmNoLW1hcC1mdWxsJykuaGVpZ2h0KCQoJyNrci1zZWFyY2gtbWFwLW1vZGFsJykuaGVpZ2h0KCkpO1xuICAgICAgICAgICAgZ29vZ2xlLm1hcHMuZXZlbnQudHJpZ2dlcihtYXAsIFwicmVzaXplXCIpO1xuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgICAgICB1cmw6ICcvaW5kZXgucGhwP29wdGlvbj1jb21fa25vd3JlcyZ0YXNrPXByb3BlcnRpZXMubWFwc2Vzc2lvbicsXG4gICAgICAgICAgICAgICAgZGF0YToge21hcF9tb2RhbDogJzEnfSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBEb2Vzbid0IHRyaWdnZXIgaWYgaW5jbHVkZWQgYWJvdmUgPz9cbiAgICAgICAgaWYgKCFtYXBEYXRhKSB7XG4gICAgICAgICAgICBjb25zdCAkc29sb1RyaWdnZXIgPSAkKCcja3ItbWFwLXNvbG8tdHJpZ2dlcicpO1xuICAgICAgICAgICAgJHNvbG9UcmlnZ2VyLm9uZSgnY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAga2lja01hcCgkc29sb1RyaWdnZXIpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmICh3aW5kb3cubG9jYXRpb24uaHJlZi5pbmRleE9mKCcjbWFwJykgIT09IC0xICYmICRzb2xvVHJpZ2dlci5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBraWNrTWFwKCRzb2xvVHJpZ2dlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUZXN0IGZvciBmb3JjZSBtYXBcbiAgICAgICAgY29uc3QgJG10cmlnZ2VyID0gJCgnLm1hcC10cmlnZ2VyJyk7XG4gICAgICAgIGlmICgkbXRyaWdnZXIubGVuZ3RoICYmICRtdHJpZ2dlci5kYXRhKCdmb3JjZW1hcCcpKSB7XG4gICAgICAgICAgICAgJG10cmlnZ2VyLnRyaWdnZXIoJ2NsaWNrJyk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBraWNrTWFwKCRlbGVtKSB7XG4gICAgICAgICAgICBjb25zdCB0eXBlID0gJGVsZW0uZGF0YSgndHlwZScpO1xuICAgICAgICAgICAgbGV0IHBpZCA9IDA7XG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gJ3NvbG8nKSB7XG4gICAgICAgICAgICAgICAgcGlkID0gJGVsZW0uZGF0YSgncGlkJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGpRdWVyeS5hamF4KHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvaW5kZXgucGhwP29wdGlvbj1jb21fa25vd3JlcyZ0YXNrPXByb3BlcnRpZXMubWFwZGF0YSZwaWQ9JyArIHBpZCxcbiAgICAgICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogXCJqc29uXCIsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmdzID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcElkOiAkZWxlbS5kYXRhKCd0YXJnZXQnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXBUeXBlOiAkZWxlbS5kYXRhKCd0eXBlJyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwVHlwZUlkOiAkZWxlbS5kYXRhKCdtYXB0eXBlaWQnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXBab29tOiBwYXJzZUludCgkZWxlbS5kYXRhKCd6b29tJykpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcE1heFpvb206IHBhcnNlSW50KCRlbGVtLmRhdGEoJ3pvb21tYXgnKSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcGVydHlNYXJrZXJzOiByZXN1bHQuZGF0YS5wcm9wZXJ0eU1hcmtlcnMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwTWFya2VyczogcmVzdWx0LmRhdGEubWFwTWFya2VycyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJJZHM6IHJlc3VsdC5kYXRhLmZpbHRlcklkc1xuICAgICAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgbXlLcm1hcCA9IG5ldyBLcm1hcChzZXR0aW5ncyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXBEYXRhID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5hbGVydChyZXN1bHQubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xufShqUXVlcnkpKTsiLCIvKipcbiAqIEBwYWNrYWdlICAgIEtub3cgUmVzZXJ2YXRpb25zXG4gKiBAc3VicGFja2FnZSBTaXRlIEpTXG4gKiBAY29weXJpZ2h0ICAyMDIwIEhpZ2hsYW5kIFZpc2lvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIEBsaWNlbnNlICAgIFNlZSB0aGUgZmlsZSBcIkxJQ0VOU0UudHh0XCIgZm9yIHRoZSBmdWxsIGxpY2Vuc2UgZ292ZXJuaW5nIHRoaXMgY29kZS5cbiAqIEBhdXRob3IgICAgIEhhemVsIFdpbHNvbiA8aGF6ZWxAaGlnaGxhbmR2aXNpb24uY29tPlxuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24gKCQpIHtcblx0bGV0IG15S3Jyb3V0ZTtcblx0bGV0IGRpcmVjdGlvbnNEaXNwbGF5O1xuXHRsZXQgZGlyZWN0aW9uc1Zpc2libGUgPSBmYWxzZTtcblx0bGV0IHJvdXRlTWFwO1xuXHRsZXQgb3JpZ2luO1xuXHRsZXQgZGVzdGluYXRpb247XG5cdGxldCByb3V0ZU1hcmtlcnMgPSBbXTtcblx0bGV0IHJvdXRlU3RvcFBvaW50cyA9IFtdO1xuXHRsZXQgcG9pbnQ7XG5cdGxldCBzZWxmO1xuXG5cdGxldCBzZXR0aW5ncyA9IHtcblx0XHRsYXQ6ICAgICAgICAgICAgICAgXCJcIixcblx0XHRsbmc6ICAgICAgICAgICAgICAgXCJcIixcblx0XHRuYW1lOiAgICAgICAgICAgICAgXCJcIixcblx0XHRpY29uOiAgICAgICAgICAgICAgXCJcIixcblx0XHRkZXRvdXI6ICAgICAgICAgICAgXCJcIixcblx0XHRtYXBab29tOiAgICAgICAgICAgOSxcblx0XHRtYXBNYXhab29tOiAgICAgICAgMTgsXG5cdFx0bWFwVHlwZUlkOiAgICAgICAgIFwicm9hZG1hcFwiLFxuXHRcdG1hcElkOiAgICAgICAgICAgICBcImtyLW1hcC1yb3V0ZVwiLFxuXHRcdGRpcmVjdGlvbnNQYW5lbDogICBcImtyLWRpcmVjdGlvbnMtcGFuZWxcIixcblx0XHRkaXJlY3Rpb25zU2VydmljZTogbnVsbFxuXHR9O1xuXG5cdGNsYXNzIEtycm91dGUge1xuXHRcdGNvbnN0cnVjdG9yKCRlbGVtZW50LCBvcHRpb25zKSB7XG5cdFx0XHR0aGlzLnNldHRpbmdzID0gc2V0dGluZ3M7XG5cdFx0XHRpZiAob3B0aW9ucykge1xuXHRcdFx0XHQkLmV4dGVuZCh0aGlzLnNldHRpbmdzLCBvcHRpb25zKTtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5zZXR0aW5ncy5kaXJlY3Rpb25zU2VydmljZSA9IG5ldyBnb29nbGUubWFwcy5EaXJlY3Rpb25zU2VydmljZSgpO1xuXHRcdFx0dGhpcy5pbml0KCk7XG5cdFx0fVxuXG5cdFx0c3RhdGljIGNsZWFyUm91dGVNYXJrZXJzKCkge1xuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCByb3V0ZU1hcmtlcnMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0cm91dGVNYXJrZXJzW2ldLnNldE1hcChudWxsKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRzdGF0aWMgY2xlYXJXYXlwb2ludHMoKSB7XG5cdFx0XHRvcmlnaW4gPSBudWxsO1xuXHRcdFx0cm91dGVNYXJrZXJzID0gW107XG5cdFx0XHRyb3V0ZVN0b3BQb2ludHMgPSBbXTtcblx0XHRcdGRpcmVjdGlvbnNWaXNpYmxlID0gZmFsc2U7XG5cdFx0fVxuXG5cdFx0YWRkUm91dGVNYXJrZXIobGF0bG5nKSB7XG5cdFx0XHRyb3V0ZU1hcmtlcnMucHVzaChuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcblx0XHRcdFx0cG9zaXRpb246IGxhdGxuZyxcblx0XHRcdFx0bWFwOiAgICAgIHJvdXRlTWFwLFxuXHRcdFx0XHRpY29uOiAgICAgdGhpcy5zZXR0aW5ncy5kZXRvdXJcblx0XHRcdH0pKTtcblx0XHR9XG5cblx0XHQvL1xuXHRcdC8vIGFkZFByb3BlcnR5TWFya2VyKHBvaW50LCBodG1sLCBpbWFnZSwgYm94aW5mbykge1xuXHRcdC8vIFx0bGV0IG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xuXHRcdC8vIFx0XHRwb3NpdGlvbjogcG9pbnQsXG5cdFx0Ly8gXHRcdGh0bWw6ICAgICBodG1sLFxuXHRcdC8vIFx0XHRtYXA6ICAgICAgcm91dGVNYXAsXG5cdFx0Ly8gXHRcdGljb246ICAgICBpbWFnZSxcblx0XHQvLyBcdFx0ekluZGV4OiAgIDFcblx0XHQvLyBcdH0pO1xuXHRcdC8vXG5cdFx0Ly8gXHRsZXQgaW5mb3dpbmRvdyA9IG5ldyBnb29nbGUubWFwcy5JbmZvV2luZG93KHtcblx0XHQvLyBcdFx0Y29udGVudDogYm94aW5mb1xuXHRcdC8vIFx0fSk7XG5cdFx0Ly9cblx0XHQvLyBcdGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKG1hcmtlciwgJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuXHRcdC8vIFx0XHQvLyBDaGVjayB0byBzZWUgaWYgdGhlcmUgaXMgYW4gaW5mbyB3aW5kb3cgc3RvcmVkIGluIHJvdXRlQ3VyckluZm9XaW5kb3csXG5cdFx0Ly8gXHRcdC8vIGlmIHRoZXJlIGlzLCB3ZSB1c2UgLmNsb3NlKCkgdG8gaGlkZSB0aGUgd2luZG93XG5cdFx0Ly8gXHRcdGlmIChyb3V0ZUN1cnJJbmZvV2luZG93KSB7XG5cdFx0Ly8gXHRcdFx0cm91dGVDdXJySW5mb1dpbmRvdy5jbG9zZSgpO1xuXHRcdC8vIFx0XHR9XG5cdFx0Ly8gXHRcdC8vIFB1dCBvdXIgbmV3IGluZm8gd2luZG93IGluIHRvIHRoZSByb3V0ZUN1cnJJbmZvV2luZG93IHZhcmlhYmxlXG5cdFx0Ly8gXHRcdHJvdXRlQ3VyckluZm9XaW5kb3cgPSBpbmZvd2luZG93O1xuXHRcdC8vIFx0XHQvLyBPcGVuIHRoZSB3aW5kb3dcblx0XHQvLyBcdFx0aW5mb3dpbmRvdy5vcGVuKHJvdXRlTWFwLCBtYXJrZXIpO1xuXHRcdC8vIFx0fSk7XG5cdFx0Ly9cblx0XHQvLyBcdC8vZ21hcmtlcnMucHVzaCggbWFya2VyICk7XG5cdFx0Ly8gXHRyb3V0ZU1hcmtlcnMucHVzaChtYXJrZXIpO1xuXHRcdC8vIH1cblxuXHRcdC8vIHN0YXRpYyB1cGRhdGVNb2RlKCkge1xuXHRcdC8vIFx0aWYgKGRpcmVjdGlvbnNWaXNpYmxlKSB7XG5cdFx0Ly8gXHRcdHRoaXMuY2FsY1JvdXRlKCk7XG5cdFx0Ly8gXHR9XG5cdFx0Ly8gfVxuXG5cdFx0Y2FsY1JvdXRlKCkge1xuXHRcdFx0bGV0IGZyb21fYWRkcmVzcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZnJvbV9hZGRyZXNzXCIpLnZhbHVlO1xuXHRcdFx0bGV0IG9yaWdpbiA9IFwiXCI7XG5cblx0XHRcdGlmIChmcm9tX2FkZHJlc3MgPT09IFwiQWRkcmVzc1wiKSBmcm9tX2FkZHJlc3MgPSBcIlwiO1xuXHRcdFx0aWYgKGZyb21fYWRkcmVzcykgb3JpZ2luID0gZnJvbV9hZGRyZXNzICsgXCIsXCIgKyBcIlwiO1xuXG5cdFx0XHRsZXQgbW9kZTtcblx0XHRcdHN3aXRjaCAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtb2RlXCIpLnZhbHVlKSB7XG5cdFx0XHRcdGNhc2UgXCJiaWN5Y2xpbmdcIjpcblx0XHRcdFx0XHRtb2RlID0gZ29vZ2xlLm1hcHMuRGlyZWN0aW9uc1RyYXZlbE1vZGUuQklDWUNMSU5HO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwiZHJpdmluZ1wiOlxuXHRcdFx0XHRcdG1vZGUgPSBnb29nbGUubWFwcy5EaXJlY3Rpb25zVHJhdmVsTW9kZS5EUklWSU5HO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwid2Fsa2luZ1wiOlxuXHRcdFx0XHRcdG1vZGUgPSBnb29nbGUubWFwcy5EaXJlY3Rpb25zVHJhdmVsTW9kZS5XQUxLSU5HO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAob3JpZ2luKSB7XG5cdFx0XHRcdGxldCByZXF1ZXN0ID0ge1xuXHRcdFx0XHRcdG9yaWdpbjogICAgICAgIG9yaWdpbixcblx0XHRcdFx0XHRkZXN0aW5hdGlvbjogICBkZXN0aW5hdGlvbixcblx0XHRcdFx0XHR3YXlwb2ludHM6ICAgICByb3V0ZVN0b3BQb2ludHMsXG5cdFx0XHRcdFx0dHJhdmVsTW9kZTogICAgbW9kZSxcblx0XHRcdFx0XHRhdm9pZEhpZ2h3YXlzOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaGlnaHdheXMnKS5jaGVja2VkLFxuXHRcdFx0XHRcdGF2b2lkVG9sbHM6ICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b2xscycpLmNoZWNrZWRcblx0XHRcdFx0fTtcblxuXHRcdFx0XHRzZWxmID0gdGhpcztcblx0XHRcdFx0dGhpcy5zZXR0aW5ncy5kaXJlY3Rpb25zU2VydmljZS5yb3V0ZShyZXF1ZXN0LCBmdW5jdGlvbiAocmVzcG9uc2UsIHN0YXR1cykge1xuXHRcdFx0XHRcdGlmIChzdGF0dXMgPT09IGdvb2dsZS5tYXBzLkRpcmVjdGlvbnNTdGF0dXMuT0spIHtcblx0XHRcdFx0XHRcdGRpcmVjdGlvbnNEaXNwbGF5LnNldERpcmVjdGlvbnMocmVzcG9uc2UpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRhbGVydChcIkdvb2dsZSBjb3VsZG5gdCBjYWxjdWxhdGUgZGlyZWN0aW9ucyBmb3IgdGhpcyByb3V0ZSBhbmQgc2VsZWN0ZWQgb3B0aW9uc1wiKTtcblx0XHRcdFx0XHRcdHNlbGYucmVzZXRSb3V0ZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdEtycm91dGUuY2xlYXJSb3V0ZU1hcmtlcnMoKTtcblx0XHRcdGRpcmVjdGlvbnNWaXNpYmxlID0gdHJ1ZTtcblx0XHR9XG5cblx0XHRpbml0KCkge1xuXHRcdFx0ZGVzdGluYXRpb24gPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKHRoaXMuc2V0dGluZ3MubGF0LCB0aGlzLnNldHRpbmdzLmxuZyk7XG5cblx0XHRcdC8vSW5pdGlhbGlzZSBtYXAgb3B0aW9uc1xuXHRcdFx0dGhpcy5teU9wdGlvbnMgPSB7XG5cdFx0XHRcdHNjcm9sbHdoZWVsOiAgICAgICBmYWxzZSxcblx0XHRcdFx0em9vbTogICAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MubWFwWm9vbSxcblx0XHRcdFx0bWF4Wm9vbTogICAgICAgICAgIHRoaXMuc2V0dGluZ3MubWFwTWF4Wm9vbSxcblx0XHRcdFx0bWFwVHlwZUlkOiAgICAgICAgIHRoaXMuc2V0dGluZ3MubWFwVHlwZUlkLFxuXHRcdFx0XHRzdHJlZXRWaWV3Q29udHJvbDogZmFsc2UsXG5cdFx0XHRcdGNlbnRlcjogICAgICAgICAgICBkZXN0aW5hdGlvblxuXHRcdFx0fTtcblxuXHRcdFx0cm91dGVNYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuc2V0dGluZ3MubWFwSWQpLCB0aGlzLm15T3B0aW9ucyk7XG5cdFx0XHRkaXJlY3Rpb25zRGlzcGxheSA9IG5ldyBnb29nbGUubWFwcy5EaXJlY3Rpb25zUmVuZGVyZXIoKTtcblx0XHRcdGRpcmVjdGlvbnNEaXNwbGF5LnNldE1hcChyb3V0ZU1hcCk7XG5cdFx0XHRkaXJlY3Rpb25zRGlzcGxheS5zZXRQYW5lbChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnNldHRpbmdzLmRpcmVjdGlvbnNQYW5lbCkpO1xuXG5cdFx0XHRjb25zdCBpbWFnZSA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXJJbWFnZSh0aGlzLnNldHRpbmdzLmljb24pO1xuXHRcdFx0cG9pbnQgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKHRoaXMuc2V0dGluZ3MubGF0LCB0aGlzLnNldHRpbmdzLmxuZyk7XG5cblx0XHRcdHNlbGYgPSB0aGlzO1xuXHRcdFx0Z29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIocm91dGVNYXAsICdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuXHRcdFx0XHRpZiAocm91dGVTdG9wUG9pbnRzLmxlbmd0aCA8IDkpIHtcblx0XHRcdFx0XHRyb3V0ZVN0b3BQb2ludHMucHVzaCh7bG9jYXRpb246IGV2ZW50LmxhdExuZywgc3RvcG92ZXI6IHRydWV9KTtcblx0XHRcdFx0XHRwb2ludCA9IGV2ZW50LmxhdExuZztcblx0XHRcdFx0XHRzZWxmLmFkZFJvdXRlTWFya2VyKHBvaW50KTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRhbGVydChcIk1heGltdW0gbnVtYmVyIG9mIDkgd2F5cG9pbnRzIHJlYWNoZWRcIik7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHRzZWxmID0gdGhpcztcblx0XHRcdGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyT25jZShyb3V0ZU1hcCwgJ2lkbGUnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdGdvb2dsZS5tYXBzLmV2ZW50LnRyaWdnZXIocm91dGVNYXAsICdyZXNpemUnKTtcblx0XHRcdFx0c2VsZi5jYWxjUm91dGUoKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdHJlc2V0Um91dGUoKSB7XG5cdFx0XHRLcnJvdXRlLmNsZWFyUm91dGVNYXJrZXJzKCk7XG5cdFx0XHRLcnJvdXRlLmNsZWFyV2F5cG9pbnRzKCk7XG5cdFx0XHRkaXJlY3Rpb25zRGlzcGxheS5zZXRNYXAobnVsbCk7XG5cdFx0XHRkaXJlY3Rpb25zRGlzcGxheS5zZXRQYW5lbChudWxsKTtcblx0XHRcdGRpcmVjdGlvbnNEaXNwbGF5ID0gbmV3IGdvb2dsZS5tYXBzLkRpcmVjdGlvbnNSZW5kZXJlcigpO1xuXHRcdFx0ZGlyZWN0aW9uc0Rpc3BsYXkuc2V0TWFwKHJvdXRlTWFwKTtcblx0XHRcdGRpcmVjdGlvbnNEaXNwbGF5LnNldFBhbmVsKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuc2V0dGluZ3MuZGlyZWN0aW9uUGFuZWwpKTtcblxuXHRcdFx0dGhpcy5pbml0KCk7XG5cdFx0fVxuXHR9XG5cblx0JChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuXHRcdCQoXCIua3ItZGlyZWN0aW9ucy1tb2RhbFwiKS5vbignY2xpY2snLCAnI2tyLW1hcC1yb3V0ZScsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRsZXQgJGVsZW1lbnQgPSAkKHRoaXMpO1xuXHRcdFx0Y29uc3Qgb3B0aW9ucyA9IHtcblx0XHRcdFx0bGF0OiAgICAkZWxlbWVudC5kYXRhKCdsYXQnKSxcblx0XHRcdFx0bG5nOiAgICAkZWxlbWVudC5kYXRhKCdsbmcnKSxcblx0XHRcdFx0bmFtZTogICAkZWxlbWVudC5kYXRhKCduYW1lJyksXG5cdFx0XHRcdGljb246ICAgJGVsZW1lbnQuZGF0YSgnaWNvbicpLFxuXHRcdFx0XHRkZXRvdXI6ICRlbGVtZW50LmRhdGEoJ2RldG91cicpXG5cdFx0XHR9O1xuXHRcdFx0bXlLcnJvdXRlID0gbmV3IEtycm91dGUoJGVsZW1lbnQsIG9wdGlvbnMpO1xuXHRcdH0pLm9uKCdjbGljaycsICcucmVzZXRyb3V0ZScsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRteUtycm91dGUucmVzZXRSb3V0ZSgpO1xuXHRcdH0pLm9uKCdjbGljaycsICcuY2FsY3JvdXRlJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdG15S3Jyb3V0ZS5jYWxjUm91dGUoKTtcblx0XHR9KTtcblxuXHRcdGpRdWVyeShcImEjZ2VvY29kZUFkZHJlc3NcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0bGV0IGFkZHJlc3NTdHJpbmcgPVxuXHRcdFx0XHQgICAgalF1ZXJ5KFwiI2pmb3JtX3Byb3BlcnR5X3N0cmVldFwiKS52YWwoKVxuXHRcdFx0XHQgICAgKyBcIiwgXCJcblx0XHRcdFx0ICAgICsgalF1ZXJ5KCcjamZvcm1fdG93bl9pZCcpLmZpbmQoXCI6c2VsZWN0ZWRcIikudGV4dCgpXG5cdFx0XHRcdCAgICArIFwiIFwiXG5cdFx0XHRcdCAgICArIGpRdWVyeShcIiNqZm9ybV9wcm9wZXJ0eV9wb3N0Y29kZVwiKS52YWwoKVxuXHRcdFx0XHQgICAgKyBcIiwgXCJcblx0XHRcdFx0ICAgICsgalF1ZXJ5KCcjamZvcm1fcmVnaW9uX2lkJykuZmluZChcIjpzZWxlY3RlZFwiKS50ZXh0KClcblx0XHRcdFx0ICAgICsgXCIgXCJcblx0XHRcdFx0ICAgICsgalF1ZXJ5KCcjamZvcm1fY291bnRyeV9pZCcpLmZpbmQoXCI6c2VsZWN0ZWRcIikudGV4dCgpO1xuXG5cdFx0XHRsZXQgdXJsID0gJ2luZGV4LnBocD9vcHRpb249Y29tX2tub3dyZXMmdGFzaz1wcm9wZXJ0eS5nZW9jb2RlJztcblx0XHRcdGxldCBjb29yZCA9IFtdO1xuXG5cdFx0XHRqUXVlcnkuYWpheCh7XG5cdFx0XHRcdHR5cGU6ICAgICBcIlBPU1RcIixcblx0XHRcdFx0dXJsOiAgICAgIHVybCxcblx0XHRcdFx0ZGF0YTogICAgIHthZGRyZXNzOiBhZGRyZXNzU3RyaW5nfSxcblx0XHRcdFx0ZGF0YVR5cGU6IFwianNvblwiLFxuXHRcdFx0XHRzdWNjZXNzOiAgZnVuY3Rpb24gKGpzb25kYXRhKSB7XG5cdFx0XHRcdFx0alF1ZXJ5LmVhY2goanNvbmRhdGEsIGZ1bmN0aW9uIChrZXksIHZhbCkge1xuXHRcdFx0XHRcdFx0bGV0IGRpdiA9IFwiI1wiICsga2V5O1xuXHRcdFx0XHRcdFx0alF1ZXJ5KGRpdikudmFsKHZhbCk7XG5cdFx0XHRcdFx0XHRjb29yZFtrZXldID0gdmFsO1xuXHRcdFx0XHRcdFx0bXlHbWFwLnJlZnJlc2hNYXAoY29vcmRbJ2xhdCddLCBjb29yZFsnbG5nJ10sIGZhbHNlKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH0pO1xufShqUXVlcnkpKTsiLCIvLyBLUiBBUFAgSlMgRmlsZXNcbmltcG9ydCAnbnBtL2pxdWVyeS1iYXItcmF0aW5nL2pxdWVyeS5iYXJyYXRpbmcnO1xuaW1wb3J0ICducG0vaXMtbWFya2VyLWNsdXN0ZXJlcic7XG5pbXBvcnQgJ21lZGlhanMvc2l0ZS9hcHAnO1xuaW1wb3J0ICdtZWRpYWpzL3NpdGUvY29uZmlybSc7XG5pbXBvcnQgJ21lZGlhanMvc2l0ZS9kb2JlbnRyeSc7XG5pbXBvcnQgJ21lZGlhanMvc2l0ZS9ndWVzdGRhdGEnO1xuaW1wb3J0ICdtZWRpYWpzL3NpdGUvbWFnZWxsYW4nO1xuaW1wb3J0ICdtZWRpYWpzL3NpdGUvbWFwJztcbmltcG9ydCAnbWVkaWFqcy9zaXRlL3JvdXRlJzsiXSwibmFtZXMiOlsiTWFya2VyQ2x1c3RlcmVyIiwibWFwIiwib3B0X21hcmtlcnMiLCJvcHRfb3B0aW9ucyIsImV4dGVuZCIsImdvb2dsZSIsIm1hcHMiLCJPdmVybGF5VmlldyIsIm1hcF8iLCJtYXJrZXJzXyIsImNsdXN0ZXJzXyIsInNpemVzIiwic3R5bGVzXyIsInJlYWR5XyIsIm9wdGlvbnMiLCJncmlkU2l6ZV8iLCJtaW5DbHVzdGVyU2l6ZV8iLCJtYXhab29tXyIsImltYWdlUGF0aF8iLCJNQVJLRVJfQ0xVU1RFUl9JTUFHRV9QQVRIXyIsImltYWdlRXh0ZW5zaW9uXyIsIk1BUktFUl9DTFVTVEVSX0lNQUdFX0VYVEVOU0lPTl8iLCJ6b29tT25DbGlja18iLCJ1bmRlZmluZWQiLCJhdmVyYWdlQ2VudGVyXyIsInNldHVwU3R5bGVzXyIsInNldE1hcCIsInByZXZab29tXyIsImdldFpvb20iLCJ0aGF0IiwiZXZlbnQiLCJhZGRMaXN0ZW5lciIsInpvb20iLCJyZXNldFZpZXdwb3J0IiwicmVkcmF3IiwibGVuZ3RoIiwiYWRkTWFya2VycyIsInByb3RvdHlwZSIsIm9iajEiLCJvYmoyIiwib2JqZWN0IiwicHJvcGVydHkiLCJhcHBseSIsIm9uQWRkIiwic2V0UmVhZHlfIiwiZHJhdyIsImkiLCJzaXplIiwicHVzaCIsInVybCIsImhlaWdodCIsIndpZHRoIiwiZml0TWFwVG9NYXJrZXJzIiwibWFya2VycyIsImdldE1hcmtlcnMiLCJib3VuZHMiLCJMYXRMbmdCb3VuZHMiLCJtYXJrZXIiLCJnZXRQb3NpdGlvbiIsImZpdEJvdW5kcyIsInNldFN0eWxlcyIsInN0eWxlcyIsImdldFN0eWxlcyIsImlzWm9vbU9uQ2xpY2siLCJpc0F2ZXJhZ2VDZW50ZXIiLCJnZXRUb3RhbE1hcmtlcnMiLCJzZXRNYXhab29tIiwibWF4Wm9vbSIsImdldE1heFpvb20iLCJjYWxjdWxhdG9yXyIsIm51bVN0eWxlcyIsImluZGV4IiwiY291bnQiLCJkdiIsInBhcnNlSW50IiwiTWF0aCIsIm1pbiIsInRleHQiLCJzZXRDYWxjdWxhdG9yIiwiY2FsY3VsYXRvciIsImdldENhbGN1bGF0b3IiLCJvcHRfbm9kcmF3IiwicHVzaE1hcmtlclRvXyIsImlzQWRkZWQiLCJyZXBhaW50IiwiYWRkTWFya2VyIiwicmVtb3ZlTWFya2VyXyIsImluZGV4T2YiLCJtIiwic3BsaWNlIiwicmVtb3ZlTWFya2VyIiwicmVtb3ZlZCIsInJlbW92ZU1hcmtlcnMiLCJyIiwicmVhZHkiLCJjcmVhdGVDbHVzdGVyc18iLCJnZXRUb3RhbENsdXN0ZXJzIiwiZ2V0TWFwIiwiZ2V0R3JpZFNpemUiLCJzZXRHcmlkU2l6ZSIsImdldE1pbkNsdXN0ZXJTaXplIiwic2V0TWluQ2x1c3RlclNpemUiLCJnZXRFeHRlbmRlZEJvdW5kcyIsInByb2plY3Rpb24iLCJnZXRQcm9qZWN0aW9uIiwidHIiLCJMYXRMbmciLCJnZXROb3J0aEVhc3QiLCJsYXQiLCJsbmciLCJibCIsImdldFNvdXRoV2VzdCIsInRyUGl4IiwiZnJvbUxhdExuZ1RvRGl2UGl4ZWwiLCJ4IiwieSIsImJsUGl4IiwibmUiLCJmcm9tRGl2UGl4ZWxUb0xhdExuZyIsInN3IiwiaXNNYXJrZXJJbkJvdW5kc18iLCJjb250YWlucyIsImNsZWFyTWFya2VycyIsIm9wdF9oaWRlIiwiY2x1c3RlciIsInJlbW92ZSIsIm9sZENsdXN0ZXJzIiwic2xpY2UiLCJ3aW5kb3ciLCJzZXRUaW1lb3V0IiwiZGlzdGFuY2VCZXR3ZWVuUG9pbnRzXyIsInAxIiwicDIiLCJSIiwiZExhdCIsIlBJIiwiZExvbiIsImEiLCJzaW4iLCJjb3MiLCJjIiwiYXRhbjIiLCJzcXJ0IiwiZCIsImFkZFRvQ2xvc2VzdENsdXN0ZXJfIiwiZGlzdGFuY2UiLCJjbHVzdGVyVG9BZGRUbyIsInBvcyIsImNlbnRlciIsImdldENlbnRlciIsImlzTWFya2VySW5DbHVzdGVyQm91bmRzIiwiQ2x1c3RlciIsIm1hcEJvdW5kcyIsImdldEJvdW5kcyIsIm1hcmtlckNsdXN0ZXJlciIsIm1hcmtlckNsdXN0ZXJlcl8iLCJjZW50ZXJfIiwiYm91bmRzXyIsImNsdXN0ZXJJY29uXyIsIkNsdXN0ZXJJY29uIiwiaXNNYXJrZXJBbHJlYWR5QWRkZWQiLCJjYWxjdWxhdGVCb3VuZHNfIiwibCIsImxlbiIsInVwZGF0ZUljb24iLCJnZXRNYXJrZXJDbHVzdGVyZXIiLCJnZXRTaXplIiwibXoiLCJoaWRlIiwic3VtcyIsInNldENlbnRlciIsInNldFN1bXMiLCJzaG93Iiwib3B0X3BhZGRpbmciLCJwYWRkaW5nXyIsImNsdXN0ZXJfIiwiZGl2XyIsInN1bXNfIiwidmlzaWJsZV8iLCJ0cmlnZ2VyQ2x1c3RlckNsaWNrIiwidHJpZ2dlciIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImdldFBvc0Zyb21MYXRMbmdfIiwic3R5bGUiLCJjc3NUZXh0IiwiY3JlYXRlQ3NzIiwiaW5uZXJIVE1MIiwicGFuZXMiLCJnZXRQYW5lcyIsIm92ZXJsYXlNb3VzZVRhcmdldCIsImFwcGVuZENoaWxkIiwiYWRkRG9tTGlzdGVuZXIiLCJsYXRsbmciLCJ3aWR0aF8iLCJoZWlnaHRfIiwidG9wIiwibGVmdCIsImRpc3BsYXkiLCJvblJlbW92ZSIsInBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsInRleHRfIiwiaW5kZXhfIiwidXNlU3R5bGUiLCJtYXgiLCJ1cmxfIiwidGV4dENvbG9yXyIsImFuY2hvcl8iLCJ0ZXh0U2l6ZV8iLCJmb250RmFtaWx5XyIsImZvbnRXZWlnaHRfIiwiYmFja2dyb3VuZFBvc2l0aW9uXyIsImJhY2tncm91bmRQb3NpdGlvbiIsIl90eXBlb2YiLCJ0eHRDb2xvciIsInR4dFNpemUiLCJmb250RmFtaWx5IiwiZm9udFdlaWdodCIsImpvaW4iLCJnbG9iYWwiLCJtb2R1bGUiLCJleHBvcnRzIiwiZmFjdG9yeSIsImRlZmluZSIsImFtZCIsInJlcXVpcmUiLCJqUXVlcnkiLCIkIiwiQmFyUmF0aW5nIiwic2VsZiIsIndyYXBFbGVtZW50IiwiY2xhc3NlcyIsInRoZW1lIiwiJGVsZW0iLCJ3cmFwIiwidW53cmFwRWxlbWVudCIsInVud3JhcCIsImZpbmRPcHRpb24iLCJ2YWx1ZSIsImlzTnVtZXJpYyIsImZsb29yIiwiZ2V0SW5pdGlhbE9wdGlvbiIsImluaXRpYWxSYXRpbmciLCJnZXRFbXB0eU9wdGlvbiIsIiRlbXB0eU9wdCIsImZpbmQiLCJlbXB0eVZhbHVlIiwiYWxsb3dFbXB0eSIsInByZXBlbmRUbyIsImdldERhdGEiLCJrZXkiLCJkYXRhIiwic2V0RGF0YSIsInNhdmVEYXRhT25FbGVtZW50IiwiJG9wdCIsInZhbCIsImVtcHR5VGV4dCIsInVzZXJPcHRpb25zIiwicmF0aW5nVmFsdWUiLCJyYXRpbmdUZXh0Iiwib3JpZ2luYWxSYXRpbmdWYWx1ZSIsIm9yaWdpbmFsUmF0aW5nVGV4dCIsImVtcHR5UmF0aW5nVmFsdWUiLCJlbXB0eVJhdGluZ1RleHQiLCJyZWFkT25seSIsInJlYWRvbmx5IiwicmF0aW5nTWFkZSIsInJlbW92ZURhdGFPbkVsZW1lbnQiLCJyZW1vdmVEYXRhIiwiYnVpbGRXaWRnZXQiLCIkdyIsImVhY2giLCJodG1sIiwiJGEiLCJzaG93VmFsdWVzIiwiYXBwZW5kIiwic2hvd1NlbGVjdGVkUmF0aW5nIiwicmV2ZXJzZSIsImFkZENsYXNzIiwibmV4dEFsbG9yUHJldmlvdXNBbGwiLCJzZXRTZWxlY3RGaWVsZFZhbHVlIiwicHJvcCIsImNoYW5nZSIsInJlc2V0U2VsZWN0RmllbGQiLCJkZWZhdWx0U2VsZWN0ZWQiLCJwYXJlbnQiLCJmcmFjdGlvbiIsInJvdW5kIiwicmVzZXRTdHlsZSIsIiR3aWRnZXQiLCJyZW1vdmVDbGFzcyIsIm1hdGNoIiwiYXBwbHlTdHlsZSIsImJhc2VWYWx1ZSIsImYiLCIkYWxsIiwiJGZyYWN0aW9uYWwiLCJpc0Rlc2VsZWN0YWJsZSIsIiRlbGVtZW50IiwiZGVzZWxlY3RhYmxlIiwiYXR0ciIsImF0dGFjaENsaWNrSGFuZGxlciIsIiRlbGVtZW50cyIsIm9uIiwicHJldmVudERlZmF1bHQiLCJvblNlbGVjdCIsImNhbGwiLCJhdHRhY2hNb3VzZUVudGVySGFuZGxlciIsImF0dGFjaE1vdXNlTGVhdmVIYW5kbGVyIiwiZmFzdENsaWNrcyIsInN0b3BQcm9wYWdhdGlvbiIsImNsaWNrIiwiZGlzYWJsZUNsaWNrcyIsImF0dGFjaEhhbmRsZXJzIiwiaG92ZXJTdGF0ZSIsImRldGFjaEhhbmRsZXJzIiwib2ZmIiwic2V0dXBIYW5kbGVycyIsImluc2VydEFmdGVyIiwic3RhdGUiLCJ0b2dnbGVDbGFzcyIsInNldCIsInNpbGVudCIsImNsZWFyIiwib25DbGVhciIsImRlc3Ryb3kiLCJvbkRlc3Ryb3kiLCJpbml0IiwiZWxlbSIsImZuIiwiYmFycmF0aW5nIiwiZGVmYXVsdHMiLCJtZXRob2QiLCJwbHVnaW4iLCJpcyIsImVycm9yIiwiaGFzT3duUHJvcGVydHkiLCJuZXh0Iiwic2VhcmNoRGF0YSIsInNlYXJjaERvbmUiLCJjYWxlbmRhckxvYWRlZCIsInNhdmVkd2lkdGgiLCJsYXJnZSIsInJlc2l6ZWQiLCJzY2xvYWRlZCIsIkZvdW5kYXRpb24iLCJhZGRUb0pxdWVyeSIsImZvdW5kYXRpb24iLCJjaGVja1NjcmVlbldpZHRoIiwiYmFycyIsIiRjdHJpZ2dlciIsImxvYWRDYWxlbmRhciIsInN0aWNreSIsImUiLCIkZm9ybSIsImFqYXgiLCJ0eXBlIiwic2VyaWFsaXplIiwiZGF0YVR5cGUiLCJzdWNjZXNzIiwicmVzdWx0IiwiZm9ybVJlc3BvbnNlIiwibG9jYXRpb24iLCJocmVmIiwibWVzc2FnZSIsIiRtb2RhbCIsIlJldmVhbCIsIm9wZW4iLCJjc3MiLCJtb2RhbGlkIiwidHJpbSIsImFqYXh1cmwiLCJjb250ZW50IiwiZ2V0U2NyaXB0IiwiaW5pdGlhbGl6ZVN0cmlwZSIsInBpZCIsImJhciIsImdldFByb3BlcnRpZXMiLCJjaGlsZHJlbiIsInRvZ2dsZSIsInNldEFjdGl2ZU1lbnUiLCJ0YXJnZXQiLCIkcHJvcHMiLCIkdGFicyIsInNwZWNpYWwiLCJ0b3VjaHN0YXJ0Iiwic2V0dXAiLCJfIiwibnMiLCJoYW5kbGUiLCJpbmNsdWRlcyIsImFkZEV2ZW50TGlzdGVuZXIiLCJwYXNzaXZlIiwidG91Y2htb3ZlIiwiaWQiLCJyZXBsYWNlIiwicmVkaXJlY3QiLCJhY3Rpb24iLCJhY3Rpb25fdmFsdWUiLCJyZWxvYWQiLCJ2YWxzIiwic2V0U2VhcmNoRGF0YSIsInJlc3BvbnNlIiwiJHNpZGViYXIiLCJlbXB0eSIsImZhZGVJbiIsInNjcm9sbFRvIiwic2VhcmNoYmFyIiwic2NyZWVuV2lkdGhIYXNDaGFuZ2VkIiwiTWVkaWFRdWVyeSIsImF0TGVhc3QiLCJvcmlnaW4iLCJwcm90b2NvbCIsImhvc3QiLCJteUNvbmZpcm0iLCIkbXlUYXNrIiwiS3Jjb25maXJtIiwiY29uc3RydWN0b3IiLCJmb3JtIiwidXBkYXRlUXVvdGUiLCJzZXJpYWxpemVBcnJheSIsImRpdiIsImNoZWNrVGVybXMiLCJ0ZXN0IiwiZ2V0RWxlbWVudEJ5SWQiLCJ0ZXN0YyIsInRlc3R0IiwiYWdyZWVjaGVjayIsImNoZWNrZWQiLCJhZ3JlZWNoZWNrYyIsImFncmVlY2hlY2t0IiwibXlLckRvYkVudHJ5IiwidG9kYXkiLCJCQUNLU1BBQ0UiLCJzZXR0aW5ncyIsImN1c3RvbV92YWxpZGF0aW9uIiwiZGF5c19pbl9tb250aCIsImRvY3VtZW50X2RhdGUiLCJlcnJvcmJveF94IiwiZXJyb3Jib3hfeSIsImZpZWxkX2hpbnRfdGV4dF9kYXkiLCJmaWVsZF9oaW50X3RleHRfbW9udGgiLCJmaWVsZF9oaW50X3RleHRfeWVhciIsImZpZWxkX29yZGVyIiwiZmllbGRfd2lkdGhfZGF5IiwiZmllbGRfd2lkdGhfbW9udGgiLCJmaWVsZF93aWR0aF95ZWFyIiwiZmllbGRfd2lkdGhfc2VwIiwibWlubWF4IiwibWluX2RhdGUiLCJtYXhfZGF0ZSIsIm1pbl95ZWFyIiwibW9udGhfbmFtZSIsIm9uX2JsdXIiLCJvbl9lcnJvciIsIm9uX2NoYW5nZSIsInBhcnNlX2RhdGUiLCJzZXBhcmF0b3IiLCJzaG93X2Vycm9ycyIsInNob3dfaGludHMiLCJFX0RBWV9OQU4iLCJFX0RBWV9UT09fQklHIiwiRV9EQVlfVE9PX1NNQUxMIiwiRV9CQURfREFZX0ZPUl9NT05USCIsIkVfTU9OVEhfTkFOIiwiRV9NT05USF9UT09fQklHIiwiRV9NT05USF9UT09fU01BTEwiLCJFX1lFQVJfTkFOIiwiRV9ZRUFSX0xFTkdUSCIsIkVfWUVBUl9UT09fU01BTEwiLCJFX01JTl9EQVRFIiwiRV9NQVhfREFURSIsIktyRG9iRW50cnkiLCJnZXRZbWQiLCJEYXRlIiwiaW5wdXRfZGF5IiwiaW5wdXRfbW9udGgiLCJpbnB1dF95ZWFyIiwiZGF0ZSIsImdldE1vbnRoIiwiZ2V0RGF5IiwiZ2V0RnVsbFllYXIiLCJnZXRZbWRPYmplY3QiLCJ5ZWFyIiwibW9udGgiLCJkYXkiLCJhZGRFbnRyeUZpZWxkcyIsImRvYmZpZWxkIiwiZmllbGRzIiwic3BsaXQiLCJmaWVsZCIsImJ1aWxkRmllbGQiLCJhZnRlclBhc3RlIiwicGFyc2VEYXRlIiwic2V0RGF0ZSIsIm5hbWUiLCJrcmRvYmVudHJ5IiwiaW5wdXQiLCJLckRvYklucHV0IiwiaGludF90ZXh0IiwiaW5uZXIiLCIkaW5wdXQiLCJidWlsZFVpIiwid3JhcHBlciIsImVycm9yYm94Iiwic2V0RmllbGRXaWR0aHMiLCJjaGVja0RvY3VtZW50IiwiZG9iIiwiY2hpbGRkb2IiLCJjbGFzc25hbWUiLCJlbGVtZW50cyIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJjbGVhckVycm9yIiwiZXJyb3JfdGV4dCIsInNob3dFcnJvciIsImZvY3VzIiwic2V0Rm9jdXMiLCJmb2N1c0ZpZWxkQmVmb3JlIiwieWllbGRGb2N1cyIsImZvY3VzRmllbGRBZnRlciIsImZvY3VzSW4iLCJmb2N1c091dCIsIndpZGdldEZvY3VzTG9zdCIsImdldERhdGUiLCJkYXlfdmFsdWUiLCJtb250aF92YWx1ZSIsInllYXJfdmFsdWUiLCJwcm94eUxhYmVsQ2xpY2tzIiwicGFyc2VJc29EYXRlIiwiUmVnRXhwIiwiJDMiLCIkMiIsIiQxIiwibmV3X2RhdGUiLCJ2YWxpZGF0ZSIsInNldEVycm9yIiwiYXZhaWxhYmxlIiwidG90YWwiLCJzZXRXaWR0aCIsInNldFJlYWRvbmx5IiwibW9kZSIsIndpZGdldEVycm9yVGV4dCIsInhfb2Zmc2V0Iiwib3V0ZXJXaWR0aCIsInlfb2Zmc2V0IiwicG9zaXRpb24iLCJjdXJyZW50X2lucHV0IiwidmFsaWRhdGVEYXkiLCJ2YWxpZGF0ZU1vbnRoIiwidmFsaWRhdGVZZWFyIiwidmFsaWRhdGVEYXlzSW5Nb250aCIsInZhbGlkYXRlQ29tcGxldGVEYXRlIiwiZGF0ZV9zdHIiLCJkYXRlX29iaiIsImRhdGVfaXNvIiwib3B0IiwiZ2V0IiwiaGFzX2ZvY3VzIiwibnVtIiwibXNnIiwidG9TdHJpbmciLCJvbkJsdXIiLCJwcm94eSIsImJsdXIiLCJrZXlkb3duIiwia2V5dXAiLCJzaG93X2hpbnQiLCJrZXlfaXNfZG93biIsImhhc0NsYXNzIiwiaXNEaWdpdEtleSIsImtleWNvZGUiLCJ3aGljaCIsIndhbnQiLCJuZXdfdmFsdWUiLCJzZWxlY3RfYWxsIiwic2VsZWN0IiwibmV3X3dpZHRoIiwiaG93dG9hcnJpdmUiLCJhcnJpdmFsbWVhbnMiLCJnZXRBdHRyaWJ1dGUiLCJkaXNwbGF5QXJyaXZhbCIsImNsYXNzTGlzdCIsImFycml2YWxkYXRhIiwiYWRkIiwib3ZDaGlsZHJlbiIsIm92U3RhdGUiLCJvdlBzIiwiJG92QnRuIiwiZmNDaGlsZHJlbiIsImZjU3RhdGUiLCIkZmNCdG4iLCJ0dENoaWxkcmVuIiwidHRTdGF0ZSIsInR0UHMiLCIkdHRCdG4iLCJ0dHBhcmFzIiwiY3VycmVudFBhcmFncmFwaCIsImhyRWxlbWVudCIsImFmdGVyIiwicXVlcnlTZWxlY3RvckFsbCIsImRvSFJzIiwicGFyYWdyYXBocyIsIm5leHRFbGVtZW50U2libGluZyIsInRhZ05hbWUiLCJsYW5nIiwibWFya2Vyc2hhcGUiLCJjb29yZHMiLCJteUtybWFwIiwibWFwRGF0YSIsImluZm9XaW5kb3ciLCJpbmZvV2luZG93MiIsInByb3BlcnR5ZGl2IiwicHJvcGVydHlpY29uIiwibWMiLCJwcm9wZXJ0eU1hcmtlcnMiLCJmaWx0ZXJJZHMiLCJtYXBNYXJrZXJzIiwibWFwVHlwZUlkIiwibWFwWm9vbSIsIm1hcE1heFpvb20iLCJtYXBUeXBlIiwibWFwSWQiLCJtYXJrZXJDb2xvciIsIktybWFwIiwiZ21PcHRpb25zIiwic2Nyb2xsd2hlZWwiLCJzdHJlZXRWaWV3Q29udHJvbCIsImdtYXJrZXJzIiwiaW5pdE1hcCIsImNsb3NlS3JJbmZvd2luZG93IiwiY2xvc2UiLCJzaG93VmlzaWJsZU1hcmtlcnMiLCJzZXRWaXNpYmxlIiwiY2hlY2tEdXBsaWNhdGUiLCJjdXJyZW50IiwiZHVwcyIsImVxdWFscyIsIm5ld0xhdCIsIm5ld0xuZyIsImNoZWNrWm9vbSIsIm15bGlzdGVuZXIiLCJzZXRab29tIiwiY2x1c3Rlck1hcCIsIm1jT3B0aW9ucyIsImdyaWRTaXplIiwiaWdub3JlSGlkZGVuTWFya2VycyIsImltYWdlUGF0aCIsIm1heERlZmF1bHRab29tIiwiYWRkTGlzdGVuZXJPbmNlIiwic2V0UHJvcGVydHlNYXJrZXJzIiwic2V0TWFwTWFya2VycyIsImNyZWF0ZU1hcCIsIk1hcCIsIkluZm9XaW5kb3ciLCJjcmVhdGVNYXBNYXJrZXIiLCJwb2ludCIsImltYWdlIiwiYm94aW5mbyIsImxpbmsiLCJ0aXRsZSIsIk1hcmtlciIsInNoYXBlIiwiaWNvbiIsInpJbmRleCIsInNldENvbnRlbnQiLCJjcmVhdGVQcm9wZXJ0eU1hcmtlciIsImNvbG9yIiwibm90Iiwic2xpY2siLCJuZXh0QXJyb3ciLCJwcmV2QXJyb3ciLCJhdXRvcGxheSIsInNvbG9NYXAiLCJyZWZyZXNoTWFwIiwiJG1hcG1vZGFsIiwiYWxlcnQiLCJyZXNldE1hcCIsImFtYXJrIiwibWFya2VyaWNvbiIsIlNpemUiLCJQb2ludCIsImFuY2hvciIsIm15TGlzdGVuZXIiLCJmb3VuZCIsImN1cnJlbnRab29tIiwia2lja01hcCIsIm1hcF9tb2RhbCIsIiRzb2xvVHJpZ2dlciIsIm9uZSIsIiRtdHJpZ2dlciIsIm15S3Jyb3V0ZSIsImRpcmVjdGlvbnNEaXNwbGF5IiwiZGlyZWN0aW9uc1Zpc2libGUiLCJyb3V0ZU1hcCIsImRlc3RpbmF0aW9uIiwicm91dGVNYXJrZXJzIiwicm91dGVTdG9wUG9pbnRzIiwiZGV0b3VyIiwiZGlyZWN0aW9uc1BhbmVsIiwiZGlyZWN0aW9uc1NlcnZpY2UiLCJLcnJvdXRlIiwiRGlyZWN0aW9uc1NlcnZpY2UiLCJjbGVhclJvdXRlTWFya2VycyIsImNsZWFyV2F5cG9pbnRzIiwiYWRkUm91dGVNYXJrZXIiLCJjYWxjUm91dGUiLCJmcm9tX2FkZHJlc3MiLCJEaXJlY3Rpb25zVHJhdmVsTW9kZSIsIkJJQ1lDTElORyIsIkRSSVZJTkciLCJXQUxLSU5HIiwicmVxdWVzdCIsIndheXBvaW50cyIsInRyYXZlbE1vZGUiLCJhdm9pZEhpZ2h3YXlzIiwiYXZvaWRUb2xscyIsInJvdXRlIiwic3RhdHVzIiwiRGlyZWN0aW9uc1N0YXR1cyIsIk9LIiwic2V0RGlyZWN0aW9ucyIsInJlc2V0Um91dGUiLCJteU9wdGlvbnMiLCJEaXJlY3Rpb25zUmVuZGVyZXIiLCJzZXRQYW5lbCIsIk1hcmtlckltYWdlIiwibGF0TG5nIiwic3RvcG92ZXIiLCJkaXJlY3Rpb25QYW5lbCIsImFkZHJlc3NTdHJpbmciLCJjb29yZCIsImFkZHJlc3MiLCJqc29uZGF0YSIsIm15R21hcCJdLCJzb3VyY2VSb290IjoiIn0=