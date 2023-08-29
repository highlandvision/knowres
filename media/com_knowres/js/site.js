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

  this.prevZoom_ = this.map_.getZoom(); // Add the map event listeners

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
  }); // Finally, add the markers

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
  var projection = this.getProjection(); // Turn the bounds into latlng.

  var tr = new google.maps.LatLng(bounds.getNorthEast().lat(), bounds.getNorthEast().lng());
  var bl = new google.maps.LatLng(bounds.getSouthWest().lat(), bounds.getSouthWest().lng()); // Convert the points to pixels and the extend out by the grid size.

  var trPix = projection.fromLatLngToDivPixel(tr);
  trPix.x += this.gridSize_;
  trPix.y -= this.gridSize_;
  var blPix = projection.fromLatLngToDivPixel(bl);
  blPix.x -= this.gridSize_;
  blPix.y += this.gridSize_; // Convert the pixel points back to LatLng

  var ne = projection.fromDivPixelToLatLng(trPix);
  var sw = projection.fromDivPixelToLatLng(blPix); // Extend the bounds to contain the new bounds.

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
  this.resetViewport(true); // Set the markers a empty array.

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
  } // Reset the markers to not be added and to be invisible.


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
  this.redraw(); // Remove the old clusters.
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
  } // Get our current map view bounds.
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
  var markerClusterer = this.cluster_.getMarkerClusterer(); // Trigger the clusterclick event.

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
}; // Export Symbols for Closure
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
      var self = this; // wrap element in a wrapper div

      var wrapElement = function wrapElement() {
        var classes = ['br-wrapper'];

        if (self.options.theme !== '') {
          classes.push('br-theme-' + self.options.theme);
        }

        self.$elem.wrap($('<div />', {
          'class': classes.join(' ')
        }));
      }; // unwrap element


      var unwrapElement = function unwrapElement() {
        self.$elem.unwrap();
      }; // find option by value


      var findOption = function findOption(value) {
        if ($.isNumeric(value)) {
          value = Math.floor(value);
        }

        return $('option[value="' + value + '"]', self.$elem);
      }; // get initial option


      var getInitialOption = function getInitialOption() {
        var initialRating = self.options.initialRating;

        if (!initialRating) {
          return $('option:selected', self.$elem);
        }

        return findOption(initialRating);
      }; // get empty option


      var getEmptyOption = function getEmptyOption() {
        var $emptyOpt = self.$elem.find('option[value="' + self.options.emptyValue + '"]');

        if (!$emptyOpt.length && self.options.allowEmpty) {
          $emptyOpt = $('<option />', {
            'value': self.options.emptyValue
          });
          return $emptyOpt.prependTo(self.$elem);
        }

        return $emptyOpt;
      }; // get data


      var getData = function getData(key) {
        var data = self.$elem.data('barrating');

        if (typeof key !== 'undefined') {
          return data[key];
        }

        return data;
      }; // set data


      var setData = function setData(key, value) {
        if (value !== null && _typeof(value) === 'object') {
          self.$elem.data('barrating', value);
        } else {
          self.$elem.data('barrating')[key] = value;
        }
      }; // save data on element


      var saveDataOnElement = function saveDataOnElement() {
        var $opt = getInitialOption();
        var $emptyOpt = getEmptyOption();
        var value = $opt.val();
        var text = $opt.data('html') ? $opt.data('html') : $opt.text(); // if the allowEmpty option is not set let's check if empty option exists in the select field

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
      }; // remove data on element


      var removeDataOnElement = function removeDataOnElement() {
        self.$elem.removeData('barrating');
      }; // return current rating text


      var ratingText = function ratingText() {
        return getData('ratingText');
      }; // return current rating value


      var ratingValue = function ratingValue() {
        return getData('ratingValue');
      }; // build widget and return jQuery element


      var buildWidget = function buildWidget() {
        var $w = $('<div />', {
          'class': 'br-widget'
        }); // create A elements that will replace OPTIONs

        self.$elem.find('option').each(function () {
          var val, text, html, $a;
          val = $(this).val(); // create ratings - but only if val is not defined as empty

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
        }); // append .br-current-rating div to the widget

        if (self.options.showSelectedRating) {
          $w.append($('<div />', {
            'text': '',
            'class': 'br-current-rating'
          }));
        } // additional classes for the widget


        if (self.options.reverse) {
          $w.addClass('br-reverse');
        }

        if (self.options.readonly) {
          $w.addClass('br-readonly');
        }

        return $w;
      }; // return a jQuery function name depending on the 'reverse' setting


      var nextAllorPreviousAll = function nextAllorPreviousAll() {
        if (getData('userOptions').reverse) {
          return 'nextAll';
        } else {
          return 'prevAll';
        }
      }; // set the value of the select field


      var setSelectFieldValue = function setSelectFieldValue(value) {
        // change selected option
        findOption(value).prop('selected', true);
        self.$elem.change();
      }; // reset select field


      var resetSelectField = function resetSelectField() {
        $('option', self.$elem).prop('selected', function () {
          return this.defaultSelected;
        });
        self.$elem.change();
      }; // display the currently selected rating


      var showSelectedRating = function showSelectedRating(text) {
        // text undefined?
        text = text ? text : ratingText(); // special case when the selected rating is defined as empty

        if (text == getData('emptyRatingText')) {
          text = '';
        } // update .br-current-rating div


        if (self.options.showSelectedRating) {
          self.$elem.parent().find('.br-current-rating').text(text);
        }
      }; // return rounded fraction of a value (14.4 -> 40, 0.99 -> 90)


      var fraction = function fraction(value) {
        return Math.round(Math.floor(value * 10) / 10 % 1 * 100);
      }; // remove all classes from elements


      var resetStyle = function resetStyle() {
        // remove all classes starting with br-*
        self.$widget.find('a').removeClass(function (index, classes) {
          return (classes.match(/(^|\s)br-\S+/g) || []).join(' ');
        });
      }; // apply style by setting classes on elements


      var applyStyle = function applyStyle() {
        var $a = self.$widget.find('a[data-rating-value="' + ratingValue() + '"]');
        var initialRating = getData('userOptions').initialRating;
        var baseValue = $.isNumeric(ratingValue()) ? ratingValue() : 0;
        var f = fraction(initialRating);
        var $all, $fractional;
        resetStyle(); // add classes

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
      }; // check if the element is deselectable?


      var isDeselectable = function isDeselectable($element) {
        if (!getData('allowEmpty') || !getData('userOptions').deselectable) {
          return false;
        }

        return ratingValue() == $element.attr('data-rating-value');
      }; // handle click events


      var attachClickHandler = function attachClickHandler($elements) {
        $elements.on('click.barrating', function (event) {
          var $a = $(this),
              options = getData('userOptions'),
              value,
              text;
          event.preventDefault();
          value = $a.attr('data-rating-value');
          text = $a.attr('data-rating-text'); // is current and deselectable?

          if (isDeselectable($a)) {
            value = getData('emptyRatingValue');
            text = getData('emptyRatingText');
          } // remember selected rating


          setData('ratingValue', value);
          setData('ratingText', text);
          setData('ratingMade', true);
          setSelectFieldValue(value);
          showSelectedRating(text);
          applyStyle(); // onSelect callback

          options.onSelect.call(self, ratingValue(), ratingText(), event);
          return false;
        });
      }; // handle mouseenter events


      var attachMouseEnterHandler = function attachMouseEnterHandler($elements) {
        $elements.on('mouseenter.barrating', function () {
          var $a = $(this);
          resetStyle();
          $a.addClass('br-active')[nextAllorPreviousAll()]().addClass('br-active');
          showSelectedRating($a.attr('data-rating-text'));
        });
      }; // handle mouseleave events


      var attachMouseLeaveHandler = function attachMouseLeaveHandler($elements) {
        self.$widget.on('mouseleave.barrating blur.barrating', function () {
          showSelectedRating();
          applyStyle();
        });
      }; // somewhat primitive way to remove 300ms click delay on touch devices
      // for a more advanced solution consider setting `fastClicks` option to false
      // and using a library such as fastclick (https://github.com/ftlabs/fastclick)


      var fastClicks = function fastClicks($elements) {
        $elements.on('touchstart.barrating', function (event) {
          event.preventDefault();
          event.stopPropagation();
          $(this).click();
        });
      }; // disable clicks


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
          attachMouseEnterHandler($elements); // attach mouseleave event handler

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
        if (getData()) return; // wrap element

        wrapElement(); // save data

        saveDataOnElement(); // build & append widget to the DOM

        self.$widget = buildWidget();
        self.$widget.insertAfter(self.$elem);
        applyStyle();
        showSelectedRating();
        setupHandlers(self.options.readonly); // hide the select field

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
        if (self.$elem.find('option[value="' + value + '"]').length === 0) return; // set data

        setData('ratingValue', value);
        setData('ratingText', self.$elem.find('option[value="' + value + '"]').text());
        setData('ratingMade', true);
        setSelectFieldValue(ratingValue());
        showSelectedRating(ratingText());
        applyStyle(); // onSelect callback

        if (!options.silent) {
          options.onSelect.call(this, ratingValue(), ratingText());
        }
      };

      this.clear = function () {
        var options = getData('userOptions'); // restore original data

        setData('ratingValue', getData('originalRatingValue'));
        setData('ratingText', getData('originalRatingText'));
        setData('ratingMade', false);
        resetSelectField();
        showSelectedRating(ratingText());
        applyStyle(); // onClear callback

        options.onClear.call(this, ratingValue(), ratingText());
      };

      this.destroy = function () {
        var value = ratingValue();
        var text = ratingText();
        var options = getData('userOptions'); // detach handlers

        detachHandlers(self.$widget.find('a')); // remove widget

        self.$widget.remove(); // remove data

        removeDataOnElement(); // unwrap the element

        unwrapElement(); // show the element

        self.$elem.show(); // onDestroy callback

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
      var plugin = new BarRating(); // plugin works with select fields

      if (!$(this).is('select')) {
        $.error('Sorry, this plugin only works with select fields.');
      } // method supplied


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
        } // no method supplied or only options supplied

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
let searchdata = [];
let searchDone = false;
let calendarLoaded = false;
let savedwidth = false;
let large;
let resized = false;
if (!window.location.origin) window.location.origin = window.location.protocol + "//" + window.location.host;
const livesite = window.location.origin + '/';

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
              window.location.href = livesite;
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
      const $this = $(this);
      const pid = $this.data('property');
      const krproperty = '#kr-property-' + pid;
      $.ajax({
        type: 'POST',
        url: 'index.php?option=com_knowres&task=properties.favourite&lang=' + lang,
        data: {
          'property_id': pid,
          'view': $this.data('view')
        },
        dataType: 'json',
        success: function (result) {
          if (result.success) {
            if (result.data.action === 'hideme') {
              const element = "#" + $this.find('.has-tip').data('toggle');
              $(element).remove();
              $(krproperty).fadeOut(1200, function () {
                $(krproperty).parent().css('display', 'none');
              });
            } else if (result.data.action !== 'none') {
              const $target = $this.find('i.fa-heart');
              $target.toggleClass('in');
              const val1 = '#' + $target.data('toggle');
              $(val1).text(result.data.action).hide();
            }
          }
        }
      });
    }).on('click', '.getResponseSearch', function (e) {
      e.preventDefault();
      getProperties($(this).data('field'), $(this).data('value'));
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
    }).on('click', '.kr-searchbar .button', function (e) {
      e.preventDefault();
      setActiveMenu($(this).data('value'));
    }).on('click', '#kr-show-sortby', function (e) {
      e.preventDefault();
      $('.kr-filters.top').addClass('hideme');
      $('.kr-sortby.top').toggleClass('hideme');
      setActiveMenu('sort');
    }).on('click', '#kr-show-filterby', function (e) {
      e.preventDefault();
      $('.kr-sortby.top').addClass('hideme');
      $('.kr-filters.top').toggleClass('hideme');
      setActiveMenu('filter');
    }).on('click', '.kr-filters-close', function (e) {
      e.preventDefault();
      $('.kr-filters.top').addClass('hideme');
      setActiveMenu('list');
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
    });

    if ($('.kr-properties').length && !searchDone) {
      getProperties('view', $(this).data('view'));
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
      url: livesite + 'index.php?option=com_knowres&task=property.geriatric&lang=' + lang,
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
        window.location.href = livesite;
      }
    } else if (id === 'kr-form-mailchimp') {
      $('#response2').html(data);
    }
  }

  function getProperties(field, value) {
    $.ajax({
      url: livesite + 'index.php?option=com_knowres&view=properties&format=raw&lang=' + lang,
      type: 'POST',
      data: {
        'field': field,
        'value': value
      },
      dataType: 'json',
      success: function (data) {
        searchdata = data;

        if (!searchdata) {
          window.location.reload();
          return;
        } // noinspection OverlyComplexBooleanExpressionJS


        if (field === 'order' || field === 'view' || field === 'favs' || field === 'map') {
          setActiveMenu(searchdata['view']);
        }

        setSearchData(searchdata, field);
        $('.has-tip').foundation();
        $('.dropdown-pane').foundation();
        $('.kr-property .card').foundation();
        $('#kr-order-close').trigger('click');
        searchDone = true;
      }
    });
  }

  function setSearchData(response) {
    let field = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    if (response) {
      $('#kr-properties-data').empty().fadeIn('slow').html(response['items']).foundation();
      $('.kr-pager').html(response['pagination']);
      $("#kr-properties-filters-off-canvas").html(response['filters']);
      $("#kr-properties-sortby-off-canvas").html(response['sortby']);
      $("#kr-properties-search-off-canvas").html(response['search']);

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

      if (field === 'page') {
        window.scrollTo(0, 0);
      }
    }
  }

  function setActiveMenu(value) {
    const bar = $('.kr-searchbar').find('.button');
    $.each(bar, function (index, bar) {
      $(bar).removeClass('is-active');
    });
    $('.kr-searchbar .button.' + value).addClass('is-active');
  } // Return true if width has changed


  function screenWidthHasChanged() {
    large = Foundation.MediaQuery.atLeast('large');

    if (large !== savedwidth) {
      savedwidth = large;
      return true;
    } else return false;
  }

  function checkScreenWidth() {
    resized = false;

    if (screenWidthHasChanged() && searchdata['items'] && !resized) {
      setSearchData(searchdata);
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
  }); // noinspection JSUnusedLocalSymbols

  function checkTerms() {
    let result = true;
    const test = document.getElementById('agreecheck');
    const testc = document.getElementById('agreecheckc');
    const testt = document.getElementById('agreecheckt'); // noinspection JSUnresolvedVariable

    if (test && !document.getElementById('kr-form-payment').agreecheck.checked) {
      result = false;
    } // noinspection JSUnresolvedVariable


    if (testc && !document.getElementById('kr-form-payment').agreecheckc.checked) {
      result = false;
    } // noinspection JSUnresolvedVariable


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
      this.fields[index - 1].setFocus(true); // let next = this.fields[index - 1];
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
      } // let max_date = settings.max_date;
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
      } // Handle Backspace - shifting focus to previous field if required


      let keycode = e.which;

      if (keycode === key.BACKSPACE && this.empty) {
        return this.dobfield.focusFieldBefore(this);
      }

      let text = this.get();
      this.empty = text === ''; // Trap and discard separator characters - advancing focus if required

      if (text.match(/[\/\\. -]/)) {
        text = text.replace(/[\/\\. -]/, '');
        this.set(text);

        if (!this.empty && this.index < 2) {
          this.dobfield.focusFieldAfter(this);
        }
      } // Advance focus if this field is both valid and full


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


if (!window.location.origin) {
  window.location.origin = window.location.protocol + "//" + window.location.host;
}

const livesite = window.location.origin + '/';
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
  let mc; //	let bicon;
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
      this.settings = settings; //Initialise map options

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
    } // only show visible markers


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
    } // Check Markers array for duplicate position and offset a little


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
          const currentZoom = map.getZoom();

          if (mapZoom > 0 && currentZoom !== mapZoom) {
            map.setZoom(mapZoom);
            mylistener.remove();
          }
        });
      }
    }

    clusterMap() {
      const mcOptions = {
        gridSize: 20,
        maxZoom: this.settings.mapMaxZoom - 1,
        imagePath: '/media/com_knowres/images/markerclusterer/m',
        ignoreHiddenMarkers: true
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
      this.checkZoom();
    } // Create the Map


    createMap() {
      map = new google.maps.Map(document.getElementById(this.settings.mapId), this.gmOptions);
      infoWindow = new google.maps.InfoWindow();
      infoWindow2 = new google.maps.InfoWindow();
      bounds = new google.maps.LatLngBounds();
    } // Create the marker and set up the event window


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
      propertydiv = document.getElementById(id); // if (propertydiv !== null) {
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
            url: livesite + 'index.php?option=com_knowres&task=property.mapinfowindow&lang=' + lang,
            data: {
              id: parseInt(boxinfo)
            },
            success: function (data) {
              $('#kr-infowindow').fadeIn(400).html(data).show();
              $('.kr-infowindow-slideshow').not('.slick-initialized').slick({
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
    } //Initialise map


    initMap() {
      this.createMap(); //			this.setMarkerIcons();

      if (this.settings.mapType === 'cluster') {
        this.clusterMap();
      } else {
        this.soloMap();
      }
    } // Reset map to initial state


    refreshMap($mapmodal) {
      if (this.settings.mapType === 'solo') return;
      let self = this;
      jQuery.ajax({
        url: livesite + 'index.php?option=com_knowres&task=properties.refreshmap&lang=' + lang,
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
    } // Reset map to initial state


    resetMap() {
      infoWindow.close();
      infoWindow2.close();
      $('#kr-infowindow').hide();
      map.fitBounds(bounds);
      this.checkZoom();
    } // loop to set map markers


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
    } // setMarkerIcons() {
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
        url: livesite + 'index.php?option=com_knowres&task=properties.mapsession&lang=' + lang,
        success: function () {
          return true;
        }
      });
    }).on('open.zf.reveal', '#kr-search-map-modal', function (e) {
      e.preventDefault();
      $('#kr-search-map-full').height($('#kr-search-map-modal').height());
      google.maps.event.trigger(map, "resize");
      $.ajax({
        type: "POST",
        url: livesite + 'index.php?option=com_knowres&task=properties.mapsession&lang=' + lang,
        data: {
          map_modal: '1'
        },
        success: function () {
          return true;
        }
      });
    }); // Doesn't trigger if included above ??

    if (!mapData) {
      const $soloTrigger = $('#kr-map-solo-trigger');
      $soloTrigger.one('click', function () {
        kickMap($soloTrigger);
      });

      if (window.location.href.indexOf('#map') !== -1 && $soloTrigger.length) {
        kickMap($soloTrigger);
      }
    } // Test for force map


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
        url: livesite + 'index.php?option=com_knowres&task=properties.mapdata&pid=' + pid + '&lang=' + lang,
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
    } //
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
      destination = new google.maps.LatLng(this.settings.lat, this.settings.lng); //Initialise map options

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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S0FBSyxDQUFDLEtBQUQsQ0FBdkIsRUFBZ0NBLEtBQUssQ0FBQyxLQUFELENBQXJDLEVBQThDLEtBQTlDO1VBQ0EsQ0FMRDtRQU1BO01BWlUsQ0FBWjtJQWNBLENBL0JEO0VBZ0NBLENBbkREO0FBb0RBLENBblBBLEVBbVBDaGUsTUFuUEQsQ0FBRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1ZBO0FBQ0E7QUFDQTtDQUVBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0NBRUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9rci8uL25vZGVfbW9kdWxlcy9pcy1tYXJrZXItY2x1c3RlcmVyL3NyYy9tYXJrZXJjbHVzdGVyZXIuanMiLCJ3ZWJwYWNrOi8va3IvLi9ub2RlX21vZHVsZXMvanF1ZXJ5LWJhci1yYXRpbmcvanF1ZXJ5LmJhcnJhdGluZy5qcyIsIndlYnBhY2s6Ly9rci8uL3NyYy9tZWRpYS9jb21fa25vd3Jlcy9qcy9zcmMvc2l0ZS9hcHAuanMiLCJ3ZWJwYWNrOi8va3IvLi9zcmMvbWVkaWEvY29tX2tub3dyZXMvanMvc3JjL3NpdGUvY29uZmlybS5qcyIsIndlYnBhY2s6Ly9rci8uL3NyYy9tZWRpYS9jb21fa25vd3Jlcy9qcy9zcmMvc2l0ZS9kb2JlbnRyeS5qcyIsIndlYnBhY2s6Ly9rci8uL3NyYy9tZWRpYS9jb21fa25vd3Jlcy9qcy9zcmMvc2l0ZS9ndWVzdGRhdGEuanMiLCJ3ZWJwYWNrOi8va3IvLi9zcmMvbWVkaWEvY29tX2tub3dyZXMvanMvc3JjL3NpdGUvbWFwLmpzIiwid2VicGFjazovL2tyLy4vc3JjL21lZGlhL2NvbV9rbm93cmVzL2pzL3NyYy9zaXRlL3JvdXRlLmpzIiwid2VicGFjazovL2tyLy4vd2VicGFjay5idWlsZC5zaXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogTnBtIHZlcnNpb24gb2YgbWFya2VyQ2x1c3RlcmVyIHdvcmtzIGdyZWF0IHdpdGggYnJvd3NlcmlmeVxuICogRGlmZmVyZW5jZSBmcm9tIHRoZSBvcmlnaW5hbCAtIGFkZHMgYSBjb21tb25qcyBmb3JtYXQgYW5kIHJlcGxhY2VzIHdpbmRvdyB3aXRoIGdsb2JhbCBhbmQgc29tZSB1bml0IHRlc3RcbiAqIFRoZSBvcmlnaW5hbCBmdW5jdGlvbmFsaXR5IGl0J3Mgbm90IG1vZGlmaWVkIGZvciBkb2NzIGFuZCBvcmlnaW5hbCBzb3VyY2UgY2hlY2tcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9nb29nbGVtYXBzL2pzLW1hcmtlci1jbHVzdGVyZXJcbiAqL1xuXG4vKipcbiAqIEBuYW1lIE1hcmtlckNsdXN0ZXJlciBmb3IgR29vZ2xlIE1hcHMgdjNcbiAqIEB2ZXJzaW9uIHZlcnNpb24gMS4wXG4gKiBAYXV0aG9yIEx1a2UgTWFoZVxuICogQGZpbGVvdmVydmlld1xuICogVGhlIGxpYnJhcnkgY3JlYXRlcyBhbmQgbWFuYWdlcyBwZXItem9vbS1sZXZlbCBjbHVzdGVycyBmb3IgbGFyZ2UgYW1vdW50cyBvZlxuICogbWFya2Vycy5cbiAqIDxici8+XG4gKiBUaGlzIGlzIGEgdjMgaW1wbGVtZW50YXRpb24gb2YgdGhlXG4gKiA8YSBocmVmPVwiaHR0cDovL2dtYXBzLXV0aWxpdHktbGlicmFyeS1kZXYuZ29vZ2xlY29kZS5jb20vc3ZuL3RhZ3MvbWFya2VyY2x1c3RlcmVyL1wiXG4gKiA+djIgTWFya2VyQ2x1c3RlcmVyPC9hPi5cbiAqL1xuXG4vKipcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5cbi8qKlxuICogQSBNYXJrZXIgQ2x1c3RlcmVyIHRoYXQgY2x1c3RlcnMgbWFya2Vycy5cbiAqXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLk1hcH0gbWFwIFRoZSBHb29nbGUgbWFwIHRvIGF0dGFjaCB0by5cbiAqIEBwYXJhbSB7QXJyYXkuPGdvb2dsZS5tYXBzLk1hcmtlcj49fSBvcHRfbWFya2VycyBPcHRpb25hbCBtYXJrZXJzIHRvIGFkZCB0b1xuICogICB0aGUgY2x1c3Rlci5cbiAqIEBwYXJhbSB7T2JqZWN0PX0gb3B0X29wdGlvbnMgc3VwcG9ydCB0aGUgZm9sbG93aW5nIG9wdGlvbnM6XG4gKiAgICAgJ2dyaWRTaXplJzogKG51bWJlcikgVGhlIGdyaWQgc2l6ZSBvZiBhIGNsdXN0ZXIgaW4gcGl4ZWxzLlxuICogICAgICdtYXhab29tJzogKG51bWJlcikgVGhlIG1heGltdW0gem9vbSBsZXZlbCB0aGF0IGEgbWFya2VyIGNhbiBiZSBwYXJ0IG9mIGFcbiAqICAgICAgICAgICAgICAgIGNsdXN0ZXIuXG4gKiAgICAgJ3pvb21PbkNsaWNrJzogKGJvb2xlYW4pIFdoZXRoZXIgdGhlIGRlZmF1bHQgYmVoYXZpb3VyIG9mIGNsaWNraW5nIG9uIGFcbiAqICAgICAgICAgICAgICAgICAgICBjbHVzdGVyIGlzIHRvIHpvb20gaW50byBpdC5cbiAqICAgICAnYXZlcmFnZUNlbnRlcic6IChib29sZWFuKSBXZXRoZXIgdGhlIGNlbnRlciBvZiBlYWNoIGNsdXN0ZXIgc2hvdWxkIGJlXG4gKiAgICAgICAgICAgICAgICAgICAgICB0aGUgYXZlcmFnZSBvZiBhbGwgbWFya2VycyBpbiB0aGUgY2x1c3Rlci5cbiAqICAgICAnbWluaW11bUNsdXN0ZXJTaXplJzogKG51bWJlcikgVGhlIG1pbmltdW0gbnVtYmVyIG9mIG1hcmtlcnMgdG8gYmUgaW4gYVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICBjbHVzdGVyIGJlZm9yZSB0aGUgbWFya2VycyBhcmUgaGlkZGVuIGFuZCBhIGNvdW50XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzIHNob3duLlxuICogICAgICdzdHlsZXMnOiAob2JqZWN0KSBBbiBvYmplY3QgdGhhdCBoYXMgc3R5bGUgcHJvcGVydGllczpcbiAqICAgICAgICd1cmwnOiAoc3RyaW5nKSBUaGUgaW1hZ2UgdXJsLlxuICogICAgICAgJ2hlaWdodCc6IChudW1iZXIpIFRoZSBpbWFnZSBoZWlnaHQuXG4gKiAgICAgICAnd2lkdGgnOiAobnVtYmVyKSBUaGUgaW1hZ2Ugd2lkdGguXG4gKiAgICAgICAnYW5jaG9yJzogKEFycmF5KSBUaGUgYW5jaG9yIHBvc2l0aW9uIG9mIHRoZSBsYWJlbCB0ZXh0LlxuICogICAgICAgJ3RleHRDb2xvcic6IChzdHJpbmcpIFRoZSB0ZXh0IGNvbG9yLlxuICogICAgICAgJ3RleHRTaXplJzogKG51bWJlcikgVGhlIHRleHQgc2l6ZS5cbiAqICAgICAgICdmb250RmFtaWx5JzogKHN0cmluZykgVGhlIGZvbnQgZmFtaWx5LlxuICogICAgICAgJ2ZvbnRXZWlnaHQnOiAoc3RyaW5nKSBUaGUgZm9udCB3ZWlnaHQuXG4gKiAgICAgICAnYmFja2dyb3VuZFBvc2l0aW9uJzogKHN0cmluZykgVGhlIHBvc2l0aW9uIG9mIHRoZSBiYWNrZ291bmQgeCwgeS5cbiAqIEBjb25zdHJ1Y3RvclxuICogQGV4dGVuZHMgZ29vZ2xlLm1hcHMuT3ZlcmxheVZpZXdcbiAqL1xuZnVuY3Rpb24gTWFya2VyQ2x1c3RlcmVyKG1hcCwgb3B0X21hcmtlcnMsIG9wdF9vcHRpb25zKSB7XG4gIC8vIE1hcmtlckNsdXN0ZXJlciBpbXBsZW1lbnRzIGdvb2dsZS5tYXBzLk92ZXJsYXlWaWV3IGludGVyZmFjZS4gV2UgdXNlIHRoZVxuICAvLyBleHRlbmQgZnVuY3Rpb24gdG8gZXh0ZW5kIE1hcmtlckNsdXN0ZXJlciB3aXRoIGdvb2dsZS5tYXBzLk92ZXJsYXlWaWV3XG4gIC8vIGJlY2F1c2UgaXQgbWlnaHQgbm90IGFsd2F5cyBiZSBhdmFpbGFibGUgd2hlbiB0aGUgY29kZSBpcyBkZWZpbmVkIHNvIHdlXG4gIC8vIGxvb2sgZm9yIGl0IGF0IHRoZSBsYXN0IHBvc3NpYmxlIG1vbWVudC4gSWYgaXQgZG9lc24ndCBleGlzdCBub3cgdGhlblxuICAvLyB0aGVyZSBpcyBubyBwb2ludCBnb2luZyBhaGVhZCA6KVxuICB0aGlzLmV4dGVuZChNYXJrZXJDbHVzdGVyZXIsIGdvb2dsZS5tYXBzLk92ZXJsYXlWaWV3KTtcbiAgdGhpcy5tYXBfID0gbWFwO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7QXJyYXkuPGdvb2dsZS5tYXBzLk1hcmtlcj59XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICB0aGlzLm1hcmtlcnNfID0gW107XG5cbiAgLyoqXG4gICAqICBAdHlwZSB7QXJyYXkuPENsdXN0ZXI+fVxuICAgKi9cbiAgdGhpcy5jbHVzdGVyc18gPSBbXTtcblxuICB0aGlzLnNpemVzID0gWzUzLCA1NiwgNjYsIDc4LCA5MF07XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICB0aGlzLnN0eWxlc18gPSBbXTtcblxuICAvKipcbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICB0aGlzLnJlYWR5XyA9IGZhbHNlO1xuXG4gIHZhciBvcHRpb25zID0gb3B0X29wdGlvbnMgfHwge307XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICB0aGlzLmdyaWRTaXplXyA9IG9wdGlvbnNbJ2dyaWRTaXplJ10gfHwgNjA7XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICB0aGlzLm1pbkNsdXN0ZXJTaXplXyA9IG9wdGlvbnNbJ21pbmltdW1DbHVzdGVyU2l6ZSddIHx8IDI7XG5cblxuICAvKipcbiAgICogQHR5cGUgez9udW1iZXJ9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICB0aGlzLm1heFpvb21fID0gb3B0aW9uc1snbWF4Wm9vbSddIHx8IG51bGw7XG5cbiAgdGhpcy5zdHlsZXNfID0gb3B0aW9uc1snc3R5bGVzJ10gfHwgW107XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICB0aGlzLmltYWdlUGF0aF8gPSBvcHRpb25zWydpbWFnZVBhdGgnXSB8fFxuICAgICAgdGhpcy5NQVJLRVJfQ0xVU1RFUl9JTUFHRV9QQVRIXztcblxuICAvKipcbiAgICogQHR5cGUge3N0cmluZ31cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHRoaXMuaW1hZ2VFeHRlbnNpb25fID0gb3B0aW9uc1snaW1hZ2VFeHRlbnNpb24nXSB8fFxuICAgICAgdGhpcy5NQVJLRVJfQ0xVU1RFUl9JTUFHRV9FWFRFTlNJT05fO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHRoaXMuem9vbU9uQ2xpY2tfID0gdHJ1ZTtcblxuICBpZiAob3B0aW9uc1snem9vbU9uQ2xpY2snXSAhPSB1bmRlZmluZWQpIHtcbiAgICB0aGlzLnpvb21PbkNsaWNrXyA9IG9wdGlvbnNbJ3pvb21PbkNsaWNrJ107XG4gIH1cblxuICAvKipcbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICB0aGlzLmF2ZXJhZ2VDZW50ZXJfID0gZmFsc2U7XG5cbiAgaWYgKG9wdGlvbnNbJ2F2ZXJhZ2VDZW50ZXInXSAhPSB1bmRlZmluZWQpIHtcbiAgICB0aGlzLmF2ZXJhZ2VDZW50ZXJfID0gb3B0aW9uc1snYXZlcmFnZUNlbnRlciddO1xuICB9XG5cbiAgdGhpcy5zZXR1cFN0eWxlc18oKTtcblxuICB0aGlzLnNldE1hcChtYXApO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgdGhpcy5wcmV2Wm9vbV8gPSB0aGlzLm1hcF8uZ2V0Wm9vbSgpO1xuXG4gIC8vIEFkZCB0aGUgbWFwIGV2ZW50IGxpc3RlbmVyc1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKHRoaXMubWFwXywgJ3pvb21fY2hhbmdlZCcsIGZ1bmN0aW9uKCkge1xuICAgIHZhciB6b29tID0gdGhhdC5tYXBfLmdldFpvb20oKTtcblxuICAgIGlmICh0aGF0LnByZXZab29tXyAhPSB6b29tKSB7XG4gICAgICB0aGF0LnByZXZab29tXyA9IHpvb207XG4gICAgICB0aGF0LnJlc2V0Vmlld3BvcnQoKTtcbiAgICB9XG4gIH0pO1xuXG4gIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKHRoaXMubWFwXywgJ2lkbGUnLCBmdW5jdGlvbigpIHtcbiAgICB0aGF0LnJlZHJhdygpO1xuICB9KTtcblxuICAvLyBGaW5hbGx5LCBhZGQgdGhlIG1hcmtlcnNcbiAgaWYgKG9wdF9tYXJrZXJzICYmIG9wdF9tYXJrZXJzLmxlbmd0aCkge1xuICAgIHRoaXMuYWRkTWFya2VycyhvcHRfbWFya2VycywgZmFsc2UpO1xuICB9XG59XG5cblxuLyoqXG4gKiBUaGUgbWFya2VyIGNsdXN0ZXIgaW1hZ2UgcGF0aC5cbiAqXG4gKiBAdHlwZSB7c3RyaW5nfVxuICogQHByaXZhdGVcbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5NQVJLRVJfQ0xVU1RFUl9JTUFHRV9QQVRIXyA9XG4gICAgJ2h0dHA6Ly9nb29nbGUtbWFwcy11dGlsaXR5LWxpYnJhcnktdjMuZ29vZ2xlY29kZS5jb20vc3ZuL3RydW5rL21hcmtlcmNsdXN0ZXJlci8nICtcbiAgICAnaW1hZ2VzL20nO1xuXG5cbi8qKlxuICogVGhlIG1hcmtlciBjbHVzdGVyIGltYWdlIHBhdGguXG4gKlxuICogQHR5cGUge3N0cmluZ31cbiAqIEBwcml2YXRlXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuTUFSS0VSX0NMVVNURVJfSU1BR0VfRVhURU5TSU9OXyA9ICdwbmcnO1xuXG5cbi8qKlxuICogRXh0ZW5kcyBhIG9iamVjdHMgcHJvdG90eXBlIGJ5IGFub3RoZXJzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmoxIFRoZSBvYmplY3QgdG8gYmUgZXh0ZW5kZWQuXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqMiBUaGUgb2JqZWN0IHRvIGV4dGVuZCB3aXRoLlxuICogQHJldHVybiB7T2JqZWN0fSBUaGUgbmV3IGV4dGVuZGVkIG9iamVjdC5cbiAqIEBpZ25vcmVcbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5leHRlbmQgPSBmdW5jdGlvbihvYmoxLCBvYmoyKSB7XG4gIHJldHVybiAoZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgZm9yICh2YXIgcHJvcGVydHkgaW4gb2JqZWN0LnByb3RvdHlwZSkge1xuICAgICAgdGhpcy5wcm90b3R5cGVbcHJvcGVydHldID0gb2JqZWN0LnByb3RvdHlwZVtwcm9wZXJ0eV07XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9KS5hcHBseShvYmoxLCBbb2JqMl0pO1xufTtcblxuXG4vKipcbiAqIEltcGxlbWVudGFpb24gb2YgdGhlIGludGVyZmFjZSBtZXRob2QuXG4gKiBAaWdub3JlXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUub25BZGQgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5zZXRSZWFkeV8odHJ1ZSk7XG59O1xuXG4vKipcbiAqIEltcGxlbWVudGFpb24gb2YgdGhlIGludGVyZmFjZSBtZXRob2QuXG4gKiBAaWdub3JlXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZHJhdyA9IGZ1bmN0aW9uKCkge307XG5cbi8qKlxuICogU2V0cyB1cCB0aGUgc3R5bGVzIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnNldHVwU3R5bGVzXyA9IGZ1bmN0aW9uKCkge1xuICBpZiAodGhpcy5zdHlsZXNfLmxlbmd0aCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwLCBzaXplOyBzaXplID0gdGhpcy5zaXplc1tpXTsgaSsrKSB7XG4gICAgdGhpcy5zdHlsZXNfLnB1c2goe1xuICAgICAgdXJsOiB0aGlzLmltYWdlUGF0aF8gKyAoaSArIDEpICsgJy4nICsgdGhpcy5pbWFnZUV4dGVuc2lvbl8sXG4gICAgICBoZWlnaHQ6IHNpemUsXG4gICAgICB3aWR0aDogc2l6ZVxuICAgIH0pO1xuICB9XG59O1xuXG4vKipcbiAqICBGaXQgdGhlIG1hcCB0byB0aGUgYm91bmRzIG9mIHRoZSBtYXJrZXJzIGluIHRoZSBjbHVzdGVyZXIuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZml0TWFwVG9NYXJrZXJzID0gZnVuY3Rpb24oKSB7XG4gIHZhciBtYXJrZXJzID0gdGhpcy5nZXRNYXJrZXJzKCk7XG4gIHZhciBib3VuZHMgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nQm91bmRzKCk7XG4gIGZvciAodmFyIGkgPSAwLCBtYXJrZXI7IG1hcmtlciA9IG1hcmtlcnNbaV07IGkrKykge1xuICAgIGJvdW5kcy5leHRlbmQobWFya2VyLmdldFBvc2l0aW9uKCkpO1xuICB9XG5cbiAgdGhpcy5tYXBfLmZpdEJvdW5kcyhib3VuZHMpO1xufTtcblxuXG4vKipcbiAqICBTZXRzIHRoZSBzdHlsZXMuXG4gKlxuICogIEBwYXJhbSB7T2JqZWN0fSBzdHlsZXMgVGhlIHN0eWxlIHRvIHNldC5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5zZXRTdHlsZXMgPSBmdW5jdGlvbihzdHlsZXMpIHtcbiAgdGhpcy5zdHlsZXNfID0gc3R5bGVzO1xufTtcblxuXG4vKipcbiAqICBHZXRzIHRoZSBzdHlsZXMuXG4gKlxuICogIEByZXR1cm4ge09iamVjdH0gVGhlIHN0eWxlcyBvYmplY3QuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0U3R5bGVzID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnN0eWxlc187XG59O1xuXG5cbi8qKlxuICogV2hldGhlciB6b29tIG9uIGNsaWNrIGlzIHNldC5cbiAqXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIHpvb21PbkNsaWNrXyBpcyBzZXQuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuaXNab29tT25DbGljayA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy56b29tT25DbGlja187XG59O1xuXG4vKipcbiAqIFdoZXRoZXIgYXZlcmFnZSBjZW50ZXIgaXMgc2V0LlxuICpcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgYXZlcmFnZUNlbnRlcl8gaXMgc2V0LlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmlzQXZlcmFnZUNlbnRlciA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5hdmVyYWdlQ2VudGVyXztcbn07XG5cblxuLyoqXG4gKiAgUmV0dXJucyB0aGUgYXJyYXkgb2YgbWFya2VycyBpbiB0aGUgY2x1c3RlcmVyLlxuICpcbiAqICBAcmV0dXJuIHtBcnJheS48Z29vZ2xlLm1hcHMuTWFya2VyPn0gVGhlIG1hcmtlcnMuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0TWFya2VycyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5tYXJrZXJzXztcbn07XG5cblxuLyoqXG4gKiAgUmV0dXJucyB0aGUgbnVtYmVyIG9mIG1hcmtlcnMgaW4gdGhlIGNsdXN0ZXJlclxuICpcbiAqICBAcmV0dXJuIHtOdW1iZXJ9IFRoZSBudW1iZXIgb2YgbWFya2Vycy5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRUb3RhbE1hcmtlcnMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMubWFya2Vyc18ubGVuZ3RoO1xufTtcblxuXG4vKipcbiAqICBTZXRzIHRoZSBtYXggem9vbSBmb3IgdGhlIGNsdXN0ZXJlci5cbiAqXG4gKiAgQHBhcmFtIHtudW1iZXJ9IG1heFpvb20gVGhlIG1heCB6b29tIGxldmVsLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnNldE1heFpvb20gPSBmdW5jdGlvbihtYXhab29tKSB7XG4gIHRoaXMubWF4Wm9vbV8gPSBtYXhab29tO1xufTtcblxuXG4vKipcbiAqICBHZXRzIHRoZSBtYXggem9vbSBmb3IgdGhlIGNsdXN0ZXJlci5cbiAqXG4gKiAgQHJldHVybiB7bnVtYmVyfSBUaGUgbWF4IHpvb20gbGV2ZWwuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0TWF4Wm9vbSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5tYXhab29tXztcbn07XG5cblxuLyoqXG4gKiAgVGhlIGZ1bmN0aW9uIGZvciBjYWxjdWxhdGluZyB0aGUgY2x1c3RlciBpY29uIGltYWdlLlxuICpcbiAqICBAcGFyYW0ge0FycmF5Ljxnb29nbGUubWFwcy5NYXJrZXI+fSBtYXJrZXJzIFRoZSBtYXJrZXJzIGluIHRoZSBjbHVzdGVyZXIuXG4gKiAgQHBhcmFtIHtudW1iZXJ9IG51bVN0eWxlcyBUaGUgbnVtYmVyIG9mIHN0eWxlcyBhdmFpbGFibGUuXG4gKiAgQHJldHVybiB7T2JqZWN0fSBBIG9iamVjdCBwcm9wZXJ0aWVzOiAndGV4dCcgKHN0cmluZykgYW5kICdpbmRleCcgKG51bWJlcikuXG4gKiAgQHByaXZhdGVcbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5jYWxjdWxhdG9yXyA9IGZ1bmN0aW9uKG1hcmtlcnMsIG51bVN0eWxlcykge1xuICB2YXIgaW5kZXggPSAwO1xuICB2YXIgY291bnQgPSBtYXJrZXJzLmxlbmd0aDtcbiAgdmFyIGR2ID0gY291bnQ7XG4gIHdoaWxlIChkdiAhPT0gMCkge1xuICAgIGR2ID0gcGFyc2VJbnQoZHYgLyAxMCwgMTApO1xuICAgIGluZGV4Kys7XG4gIH1cblxuICBpbmRleCA9IE1hdGgubWluKGluZGV4LCBudW1TdHlsZXMpO1xuICByZXR1cm4ge1xuICAgIHRleHQ6IGNvdW50LFxuICAgIGluZGV4OiBpbmRleFxuICB9O1xufTtcblxuXG4vKipcbiAqIFNldCB0aGUgY2FsY3VsYXRvciBmdW5jdGlvbi5cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKEFycmF5LCBudW1iZXIpfSBjYWxjdWxhdG9yIFRoZSBmdW5jdGlvbiB0byBzZXQgYXMgdGhlXG4gKiAgICAgY2FsY3VsYXRvci4gVGhlIGZ1bmN0aW9uIHNob3VsZCByZXR1cm4gYSBvYmplY3QgcHJvcGVydGllczpcbiAqICAgICAndGV4dCcgKHN0cmluZykgYW5kICdpbmRleCcgKG51bWJlcikuXG4gKlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnNldENhbGN1bGF0b3IgPSBmdW5jdGlvbihjYWxjdWxhdG9yKSB7XG4gIHRoaXMuY2FsY3VsYXRvcl8gPSBjYWxjdWxhdG9yO1xufTtcblxuXG4vKipcbiAqIEdldCB0aGUgY2FsY3VsYXRvciBmdW5jdGlvbi5cbiAqXG4gKiBAcmV0dXJuIHtmdW5jdGlvbihBcnJheSwgbnVtYmVyKX0gdGhlIGNhbGN1bGF0b3IgZnVuY3Rpb24uXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0Q2FsY3VsYXRvciA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5jYWxjdWxhdG9yXztcbn07XG5cblxuLyoqXG4gKiBBZGQgYW4gYXJyYXkgb2YgbWFya2VycyB0byB0aGUgY2x1c3RlcmVyLlxuICpcbiAqIEBwYXJhbSB7QXJyYXkuPGdvb2dsZS5tYXBzLk1hcmtlcj59IG1hcmtlcnMgVGhlIG1hcmtlcnMgdG8gYWRkLlxuICogQHBhcmFtIHtib29sZWFuPX0gb3B0X25vZHJhdyBXaGV0aGVyIHRvIHJlZHJhdyB0aGUgY2x1c3RlcnMuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuYWRkTWFya2VycyA9IGZ1bmN0aW9uKG1hcmtlcnMsIG9wdF9ub2RyYXcpIHtcbiAgZm9yICh2YXIgaSA9IDAsIG1hcmtlcjsgbWFya2VyID0gbWFya2Vyc1tpXTsgaSsrKSB7XG4gICAgdGhpcy5wdXNoTWFya2VyVG9fKG1hcmtlcik7XG4gIH1cbiAgaWYgKCFvcHRfbm9kcmF3KSB7XG4gICAgdGhpcy5yZWRyYXcoKTtcbiAgfVxufTtcblxuXG4vKipcbiAqIFB1c2hlcyBhIG1hcmtlciB0byB0aGUgY2x1c3RlcmVyLlxuICpcbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTWFya2VyfSBtYXJrZXIgVGhlIG1hcmtlciB0byBhZGQuXG4gKiBAcHJpdmF0ZVxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnB1c2hNYXJrZXJUb18gPSBmdW5jdGlvbihtYXJrZXIpIHtcbiAgbWFya2VyLmlzQWRkZWQgPSBmYWxzZTtcbiAgaWYgKG1hcmtlclsnZHJhZ2dhYmxlJ10pIHtcbiAgICAvLyBJZiB0aGUgbWFya2VyIGlzIGRyYWdnYWJsZSBhZGQgYSBsaXN0ZW5lciBzbyB3ZSB1cGRhdGUgdGhlIGNsdXN0ZXJzIG9uXG4gICAgLy8gdGhlIGRyYWcgZW5kLlxuICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYXJrZXIsICdkcmFnZW5kJywgZnVuY3Rpb24oKSB7XG4gICAgICBtYXJrZXIuaXNBZGRlZCA9IGZhbHNlO1xuICAgICAgdGhhdC5yZXBhaW50KCk7XG4gICAgfSk7XG4gIH1cbiAgdGhpcy5tYXJrZXJzXy5wdXNoKG1hcmtlcik7XG59O1xuXG5cbi8qKlxuICogQWRkcyBhIG1hcmtlciB0byB0aGUgY2x1c3RlcmVyIGFuZCByZWRyYXdzIGlmIG5lZWRlZC5cbiAqXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLk1hcmtlcn0gbWFya2VyIFRoZSBtYXJrZXIgdG8gYWRkLlxuICogQHBhcmFtIHtib29sZWFuPX0gb3B0X25vZHJhdyBXaGV0aGVyIHRvIHJlZHJhdyB0aGUgY2x1c3RlcnMuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuYWRkTWFya2VyID0gZnVuY3Rpb24obWFya2VyLCBvcHRfbm9kcmF3KSB7XG4gIHRoaXMucHVzaE1hcmtlclRvXyhtYXJrZXIpO1xuICBpZiAoIW9wdF9ub2RyYXcpIHtcbiAgICB0aGlzLnJlZHJhdygpO1xuICB9XG59O1xuXG5cbi8qKlxuICogUmVtb3ZlcyBhIG1hcmtlciBhbmQgcmV0dXJucyB0cnVlIGlmIHJlbW92ZWQsIGZhbHNlIGlmIG5vdFxuICpcbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTWFya2VyfSBtYXJrZXIgVGhlIG1hcmtlciB0byByZW1vdmVcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFdoZXRoZXIgdGhlIG1hcmtlciB3YXMgcmVtb3ZlZCBvciBub3RcbiAqIEBwcml2YXRlXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUucmVtb3ZlTWFya2VyXyA9IGZ1bmN0aW9uKG1hcmtlcikge1xuICB2YXIgaW5kZXggPSAtMTtcbiAgaWYgKHRoaXMubWFya2Vyc18uaW5kZXhPZikge1xuICAgIGluZGV4ID0gdGhpcy5tYXJrZXJzXy5pbmRleE9mKG1hcmtlcik7XG4gIH0gZWxzZSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIG07IG0gPSB0aGlzLm1hcmtlcnNfW2ldOyBpKyspIHtcbiAgICAgIGlmIChtID09IG1hcmtlcikge1xuICAgICAgICBpbmRleCA9IGk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmIChpbmRleCA9PSAtMSkge1xuICAgIC8vIE1hcmtlciBpcyBub3QgaW4gb3VyIGxpc3Qgb2YgbWFya2Vycy5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBtYXJrZXIuc2V0TWFwKG51bGwpO1xuXG4gIHRoaXMubWFya2Vyc18uc3BsaWNlKGluZGV4LCAxKTtcblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cblxuLyoqXG4gKiBSZW1vdmUgYSBtYXJrZXIgZnJvbSB0aGUgY2x1c3Rlci5cbiAqXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLk1hcmtlcn0gbWFya2VyIFRoZSBtYXJrZXIgdG8gcmVtb3ZlLlxuICogQHBhcmFtIHtib29sZWFuPX0gb3B0X25vZHJhdyBPcHRpb25hbCBib29sZWFuIHRvIGZvcmNlIG5vIHJlZHJhdy5cbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdGhlIG1hcmtlciB3YXMgcmVtb3ZlZC5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5yZW1vdmVNYXJrZXIgPSBmdW5jdGlvbihtYXJrZXIsIG9wdF9ub2RyYXcpIHtcbiAgdmFyIHJlbW92ZWQgPSB0aGlzLnJlbW92ZU1hcmtlcl8obWFya2VyKTtcblxuICBpZiAoIW9wdF9ub2RyYXcgJiYgcmVtb3ZlZCkge1xuICAgIHRoaXMucmVzZXRWaWV3cG9ydCgpO1xuICAgIHRoaXMucmVkcmF3KCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSB7XG4gICByZXR1cm4gZmFsc2U7XG4gIH1cbn07XG5cblxuLyoqXG4gKiBSZW1vdmVzIGFuIGFycmF5IG9mIG1hcmtlcnMgZnJvbSB0aGUgY2x1c3Rlci5cbiAqXG4gKiBAcGFyYW0ge0FycmF5Ljxnb29nbGUubWFwcy5NYXJrZXI+fSBtYXJrZXJzIFRoZSBtYXJrZXJzIHRvIHJlbW92ZS5cbiAqIEBwYXJhbSB7Ym9vbGVhbj19IG9wdF9ub2RyYXcgT3B0aW9uYWwgYm9vbGVhbiB0byBmb3JjZSBubyByZWRyYXcuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUucmVtb3ZlTWFya2VycyA9IGZ1bmN0aW9uKG1hcmtlcnMsIG9wdF9ub2RyYXcpIHtcbiAgdmFyIHJlbW92ZWQgPSBmYWxzZTtcblxuICBmb3IgKHZhciBpID0gMCwgbWFya2VyOyBtYXJrZXIgPSBtYXJrZXJzW2ldOyBpKyspIHtcbiAgICB2YXIgciA9IHRoaXMucmVtb3ZlTWFya2VyXyhtYXJrZXIpO1xuICAgIHJlbW92ZWQgPSByZW1vdmVkIHx8IHI7XG4gIH1cblxuICBpZiAoIW9wdF9ub2RyYXcgJiYgcmVtb3ZlZCkge1xuICAgIHRoaXMucmVzZXRWaWV3cG9ydCgpO1xuICAgIHRoaXMucmVkcmF3KCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG5cblxuLyoqXG4gKiBTZXRzIHRoZSBjbHVzdGVyZXIncyByZWFkeSBzdGF0ZS5cbiAqXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHJlYWR5IFRoZSBzdGF0ZS5cbiAqIEBwcml2YXRlXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuc2V0UmVhZHlfID0gZnVuY3Rpb24ocmVhZHkpIHtcbiAgaWYgKCF0aGlzLnJlYWR5Xykge1xuICAgIHRoaXMucmVhZHlfID0gcmVhZHk7XG4gICAgdGhpcy5jcmVhdGVDbHVzdGVyc18oKTtcbiAgfVxufTtcblxuXG4vKipcbiAqIFJldHVybnMgdGhlIG51bWJlciBvZiBjbHVzdGVycyBpbiB0aGUgY2x1c3RlcmVyLlxuICpcbiAqIEByZXR1cm4ge251bWJlcn0gVGhlIG51bWJlciBvZiBjbHVzdGVycy5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRUb3RhbENsdXN0ZXJzID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmNsdXN0ZXJzXy5sZW5ndGg7XG59O1xuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgZ29vZ2xlIG1hcCB0aGF0IHRoZSBjbHVzdGVyZXIgaXMgYXNzb2NpYXRlZCB3aXRoLlxuICpcbiAqIEByZXR1cm4ge2dvb2dsZS5tYXBzLk1hcH0gVGhlIG1hcC5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRNYXAgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMubWFwXztcbn07XG5cblxuLyoqXG4gKiBTZXRzIHRoZSBnb29nbGUgbWFwIHRoYXQgdGhlIGNsdXN0ZXJlciBpcyBhc3NvY2lhdGVkIHdpdGguXG4gKlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5NYXB9IG1hcCBUaGUgbWFwLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnNldE1hcCA9IGZ1bmN0aW9uKG1hcCkge1xuICB0aGlzLm1hcF8gPSBtYXA7XG59O1xuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgc2l6ZSBvZiB0aGUgZ3JpZC5cbiAqXG4gKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSBncmlkIHNpemUuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0R3JpZFNpemUgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuZ3JpZFNpemVfO1xufTtcblxuXG4vKipcbiAqIFNldHMgdGhlIHNpemUgb2YgdGhlIGdyaWQuXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IHNpemUgVGhlIGdyaWQgc2l6ZS5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5zZXRHcmlkU2l6ZSA9IGZ1bmN0aW9uKHNpemUpIHtcbiAgdGhpcy5ncmlkU2l6ZV8gPSBzaXplO1xufTtcblxuXG4vKipcbiAqIFJldHVybnMgdGhlIG1pbiBjbHVzdGVyIHNpemUuXG4gKlxuICogQHJldHVybiB7bnVtYmVyfSBUaGUgZ3JpZCBzaXplLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldE1pbkNsdXN0ZXJTaXplID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLm1pbkNsdXN0ZXJTaXplXztcbn07XG5cbi8qKlxuICogU2V0cyB0aGUgbWluIGNsdXN0ZXIgc2l6ZS5cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gc2l6ZSBUaGUgZ3JpZCBzaXplLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnNldE1pbkNsdXN0ZXJTaXplID0gZnVuY3Rpb24oc2l6ZSkge1xuICB0aGlzLm1pbkNsdXN0ZXJTaXplXyA9IHNpemU7XG59O1xuXG5cbi8qKlxuICogRXh0ZW5kcyBhIGJvdW5kcyBvYmplY3QgYnkgdGhlIGdyaWQgc2l6ZS5cbiAqXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLkxhdExuZ0JvdW5kc30gYm91bmRzIFRoZSBib3VuZHMgdG8gZXh0ZW5kLlxuICogQHJldHVybiB7Z29vZ2xlLm1hcHMuTGF0TG5nQm91bmRzfSBUaGUgZXh0ZW5kZWQgYm91bmRzLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldEV4dGVuZGVkQm91bmRzID0gZnVuY3Rpb24oYm91bmRzKSB7XG4gIHZhciBwcm9qZWN0aW9uID0gdGhpcy5nZXRQcm9qZWN0aW9uKCk7XG5cbiAgLy8gVHVybiB0aGUgYm91bmRzIGludG8gbGF0bG5nLlxuICB2YXIgdHIgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKGJvdW5kcy5nZXROb3J0aEVhc3QoKS5sYXQoKSxcbiAgICAgIGJvdW5kcy5nZXROb3J0aEVhc3QoKS5sbmcoKSk7XG4gIHZhciBibCA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoYm91bmRzLmdldFNvdXRoV2VzdCgpLmxhdCgpLFxuICAgICAgYm91bmRzLmdldFNvdXRoV2VzdCgpLmxuZygpKTtcblxuICAvLyBDb252ZXJ0IHRoZSBwb2ludHMgdG8gcGl4ZWxzIGFuZCB0aGUgZXh0ZW5kIG91dCBieSB0aGUgZ3JpZCBzaXplLlxuICB2YXIgdHJQaXggPSBwcm9qZWN0aW9uLmZyb21MYXRMbmdUb0RpdlBpeGVsKHRyKTtcbiAgdHJQaXgueCArPSB0aGlzLmdyaWRTaXplXztcbiAgdHJQaXgueSAtPSB0aGlzLmdyaWRTaXplXztcblxuICB2YXIgYmxQaXggPSBwcm9qZWN0aW9uLmZyb21MYXRMbmdUb0RpdlBpeGVsKGJsKTtcbiAgYmxQaXgueCAtPSB0aGlzLmdyaWRTaXplXztcbiAgYmxQaXgueSArPSB0aGlzLmdyaWRTaXplXztcblxuICAvLyBDb252ZXJ0IHRoZSBwaXhlbCBwb2ludHMgYmFjayB0byBMYXRMbmdcbiAgdmFyIG5lID0gcHJvamVjdGlvbi5mcm9tRGl2UGl4ZWxUb0xhdExuZyh0clBpeCk7XG4gIHZhciBzdyA9IHByb2plY3Rpb24uZnJvbURpdlBpeGVsVG9MYXRMbmcoYmxQaXgpO1xuXG4gIC8vIEV4dGVuZCB0aGUgYm91bmRzIHRvIGNvbnRhaW4gdGhlIG5ldyBib3VuZHMuXG4gIGJvdW5kcy5leHRlbmQobmUpO1xuICBib3VuZHMuZXh0ZW5kKHN3KTtcblxuICByZXR1cm4gYm91bmRzO1xufTtcblxuXG4vKipcbiAqIERldGVybWlucyBpZiBhIG1hcmtlciBpcyBjb250YWluZWQgaW4gYSBib3VuZHMuXG4gKlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5NYXJrZXJ9IG1hcmtlciBUaGUgbWFya2VyIHRvIGNoZWNrLlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5MYXRMbmdCb3VuZHN9IGJvdW5kcyBUaGUgYm91bmRzIHRvIGNoZWNrIGFnYWluc3QuXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIHRoZSBtYXJrZXIgaXMgaW4gdGhlIGJvdW5kcy5cbiAqIEBwcml2YXRlXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuaXNNYXJrZXJJbkJvdW5kc18gPSBmdW5jdGlvbihtYXJrZXIsIGJvdW5kcykge1xuICByZXR1cm4gYm91bmRzLmNvbnRhaW5zKG1hcmtlci5nZXRQb3NpdGlvbigpKTtcbn07XG5cblxuLyoqXG4gKiBDbGVhcnMgYWxsIGNsdXN0ZXJzIGFuZCBtYXJrZXJzIGZyb20gdGhlIGNsdXN0ZXJlci5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5jbGVhck1hcmtlcnMgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5yZXNldFZpZXdwb3J0KHRydWUpO1xuXG4gIC8vIFNldCB0aGUgbWFya2VycyBhIGVtcHR5IGFycmF5LlxuICB0aGlzLm1hcmtlcnNfID0gW107XG59O1xuXG5cbi8qKlxuICogQ2xlYXJzIGFsbCBleGlzdGluZyBjbHVzdGVycyBhbmQgcmVjcmVhdGVzIHRoZW0uXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdF9oaWRlIFRvIGFsc28gaGlkZSB0aGUgbWFya2VyLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnJlc2V0Vmlld3BvcnQgPSBmdW5jdGlvbihvcHRfaGlkZSkge1xuICAvLyBSZW1vdmUgYWxsIHRoZSBjbHVzdGVyc1xuICBmb3IgKHZhciBpID0gMCwgY2x1c3RlcjsgY2x1c3RlciA9IHRoaXMuY2x1c3RlcnNfW2ldOyBpKyspIHtcbiAgICBjbHVzdGVyLnJlbW92ZSgpO1xuICB9XG5cbiAgLy8gUmVzZXQgdGhlIG1hcmtlcnMgdG8gbm90IGJlIGFkZGVkIGFuZCB0byBiZSBpbnZpc2libGUuXG4gIGZvciAodmFyIGkgPSAwLCBtYXJrZXI7IG1hcmtlciA9IHRoaXMubWFya2Vyc19baV07IGkrKykge1xuICAgIG1hcmtlci5pc0FkZGVkID0gZmFsc2U7XG4gICAgaWYgKG9wdF9oaWRlKSB7XG4gICAgICBtYXJrZXIuc2V0TWFwKG51bGwpO1xuICAgIH1cbiAgfVxuXG4gIHRoaXMuY2x1c3RlcnNfID0gW107XG59O1xuXG4vKipcbiAqXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUucmVwYWludCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgb2xkQ2x1c3RlcnMgPSB0aGlzLmNsdXN0ZXJzXy5zbGljZSgpO1xuICB0aGlzLmNsdXN0ZXJzXy5sZW5ndGggPSAwO1xuICB0aGlzLnJlc2V0Vmlld3BvcnQoKTtcbiAgdGhpcy5yZWRyYXcoKTtcblxuICAvLyBSZW1vdmUgdGhlIG9sZCBjbHVzdGVycy5cbiAgLy8gRG8gaXQgaW4gYSB0aW1lb3V0IHNvIHRoZSBvdGhlciBjbHVzdGVycyBoYXZlIGJlZW4gZHJhd24gZmlyc3QuXG4gIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgIGZvciAodmFyIGkgPSAwLCBjbHVzdGVyOyBjbHVzdGVyID0gb2xkQ2x1c3RlcnNbaV07IGkrKykge1xuICAgICAgY2x1c3Rlci5yZW1vdmUoKTtcbiAgICB9XG4gIH0sIDApO1xufTtcblxuXG4vKipcbiAqIFJlZHJhd3MgdGhlIGNsdXN0ZXJzLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnJlZHJhdyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmNyZWF0ZUNsdXN0ZXJzXygpO1xufTtcblxuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGRpc3RhbmNlIGJldHdlZW4gdHdvIGxhdGxuZyBsb2NhdGlvbnMgaW4ga20uXG4gKiBAc2VlIGh0dHA6Ly93d3cubW92YWJsZS10eXBlLmNvLnVrL3NjcmlwdHMvbGF0bG9uZy5odG1sXG4gKlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5MYXRMbmd9IHAxIFRoZSBmaXJzdCBsYXQgbG5nIHBvaW50LlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5MYXRMbmd9IHAyIFRoZSBzZWNvbmQgbGF0IGxuZyBwb2ludC5cbiAqIEByZXR1cm4ge251bWJlcn0gVGhlIGRpc3RhbmNlIGJldHdlZW4gdGhlIHR3byBwb2ludHMgaW4ga20uXG4gKiBAcHJpdmF0ZVxuKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZGlzdGFuY2VCZXR3ZWVuUG9pbnRzXyA9IGZ1bmN0aW9uKHAxLCBwMikge1xuICBpZiAoIXAxIHx8ICFwMikge1xuICAgIHJldHVybiAwO1xuICB9XG5cbiAgdmFyIFIgPSA2MzcxOyAvLyBSYWRpdXMgb2YgdGhlIEVhcnRoIGluIGttXG4gIHZhciBkTGF0ID0gKHAyLmxhdCgpIC0gcDEubGF0KCkpICogTWF0aC5QSSAvIDE4MDtcbiAgdmFyIGRMb24gPSAocDIubG5nKCkgLSBwMS5sbmcoKSkgKiBNYXRoLlBJIC8gMTgwO1xuICB2YXIgYSA9IE1hdGguc2luKGRMYXQgLyAyKSAqIE1hdGguc2luKGRMYXQgLyAyKSArXG4gICAgTWF0aC5jb3MocDEubGF0KCkgKiBNYXRoLlBJIC8gMTgwKSAqIE1hdGguY29zKHAyLmxhdCgpICogTWF0aC5QSSAvIDE4MCkgKlxuICAgIE1hdGguc2luKGRMb24gLyAyKSAqIE1hdGguc2luKGRMb24gLyAyKTtcbiAgdmFyIGMgPSAyICogTWF0aC5hdGFuMihNYXRoLnNxcnQoYSksIE1hdGguc3FydCgxIC0gYSkpO1xuICB2YXIgZCA9IFIgKiBjO1xuICByZXR1cm4gZDtcbn07XG5cblxuLyoqXG4gKiBBZGQgYSBtYXJrZXIgdG8gYSBjbHVzdGVyLCBvciBjcmVhdGVzIGEgbmV3IGNsdXN0ZXIuXG4gKlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5NYXJrZXJ9IG1hcmtlciBUaGUgbWFya2VyIHRvIGFkZC5cbiAqIEBwcml2YXRlXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuYWRkVG9DbG9zZXN0Q2x1c3Rlcl8gPSBmdW5jdGlvbihtYXJrZXIpIHtcbiAgdmFyIGRpc3RhbmNlID0gNDAwMDA7IC8vIFNvbWUgbGFyZ2UgbnVtYmVyXG4gIHZhciBjbHVzdGVyVG9BZGRUbyA9IG51bGw7XG4gIHZhciBwb3MgPSBtYXJrZXIuZ2V0UG9zaXRpb24oKTtcbiAgZm9yICh2YXIgaSA9IDAsIGNsdXN0ZXI7IGNsdXN0ZXIgPSB0aGlzLmNsdXN0ZXJzX1tpXTsgaSsrKSB7XG4gICAgdmFyIGNlbnRlciA9IGNsdXN0ZXIuZ2V0Q2VudGVyKCk7XG4gICAgaWYgKGNlbnRlcikge1xuICAgICAgdmFyIGQgPSB0aGlzLmRpc3RhbmNlQmV0d2VlblBvaW50c18oY2VudGVyLCBtYXJrZXIuZ2V0UG9zaXRpb24oKSk7XG4gICAgICBpZiAoZCA8IGRpc3RhbmNlKSB7XG4gICAgICAgIGRpc3RhbmNlID0gZDtcbiAgICAgICAgY2x1c3RlclRvQWRkVG8gPSBjbHVzdGVyO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmIChjbHVzdGVyVG9BZGRUbyAmJiBjbHVzdGVyVG9BZGRUby5pc01hcmtlckluQ2x1c3RlckJvdW5kcyhtYXJrZXIpKSB7XG4gICAgY2x1c3RlclRvQWRkVG8uYWRkTWFya2VyKG1hcmtlcik7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGNsdXN0ZXIgPSBuZXcgQ2x1c3Rlcih0aGlzKTtcbiAgICBjbHVzdGVyLmFkZE1hcmtlcihtYXJrZXIpO1xuICAgIHRoaXMuY2x1c3RlcnNfLnB1c2goY2x1c3Rlcik7XG4gIH1cbn07XG5cblxuLyoqXG4gKiBDcmVhdGVzIHRoZSBjbHVzdGVycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmNyZWF0ZUNsdXN0ZXJzXyA9IGZ1bmN0aW9uKCkge1xuICBpZiAoIXRoaXMucmVhZHlfKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gR2V0IG91ciBjdXJyZW50IG1hcCB2aWV3IGJvdW5kcy5cbiAgLy8gQ3JlYXRlIGEgbmV3IGJvdW5kcyBvYmplY3Qgc28gd2UgZG9uJ3QgYWZmZWN0IHRoZSBtYXAuXG4gIHZhciBtYXBCb3VuZHMgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nQm91bmRzKHRoaXMubWFwXy5nZXRCb3VuZHMoKS5nZXRTb3V0aFdlc3QoKSxcbiAgICAgIHRoaXMubWFwXy5nZXRCb3VuZHMoKS5nZXROb3J0aEVhc3QoKSk7XG4gIHZhciBib3VuZHMgPSB0aGlzLmdldEV4dGVuZGVkQm91bmRzKG1hcEJvdW5kcyk7XG5cbiAgZm9yICh2YXIgaSA9IDAsIG1hcmtlcjsgbWFya2VyID0gdGhpcy5tYXJrZXJzX1tpXTsgaSsrKSB7XG4gICAgaWYgKCFtYXJrZXIuaXNBZGRlZCAmJiB0aGlzLmlzTWFya2VySW5Cb3VuZHNfKG1hcmtlciwgYm91bmRzKSkge1xuICAgICAgdGhpcy5hZGRUb0Nsb3Nlc3RDbHVzdGVyXyhtYXJrZXIpO1xuICAgIH1cbiAgfVxufTtcblxuXG4vKipcbiAqIEEgY2x1c3RlciB0aGF0IGNvbnRhaW5zIG1hcmtlcnMuXG4gKlxuICogQHBhcmFtIHtNYXJrZXJDbHVzdGVyZXJ9IG1hcmtlckNsdXN0ZXJlciBUaGUgbWFya2VyY2x1c3RlcmVyIHRoYXQgdGhpc1xuICogICAgIGNsdXN0ZXIgaXMgYXNzb2NpYXRlZCB3aXRoLlxuICogQGNvbnN0cnVjdG9yXG4gKiBAaWdub3JlXG4gKi9cbmZ1bmN0aW9uIENsdXN0ZXIobWFya2VyQ2x1c3RlcmVyKSB7XG4gIHRoaXMubWFya2VyQ2x1c3RlcmVyXyA9IG1hcmtlckNsdXN0ZXJlcjtcbiAgdGhpcy5tYXBfID0gbWFya2VyQ2x1c3RlcmVyLmdldE1hcCgpO1xuICB0aGlzLmdyaWRTaXplXyA9IG1hcmtlckNsdXN0ZXJlci5nZXRHcmlkU2l6ZSgpO1xuICB0aGlzLm1pbkNsdXN0ZXJTaXplXyA9IG1hcmtlckNsdXN0ZXJlci5nZXRNaW5DbHVzdGVyU2l6ZSgpO1xuICB0aGlzLmF2ZXJhZ2VDZW50ZXJfID0gbWFya2VyQ2x1c3RlcmVyLmlzQXZlcmFnZUNlbnRlcigpO1xuICB0aGlzLmNlbnRlcl8gPSBudWxsO1xuICB0aGlzLm1hcmtlcnNfID0gW107XG4gIHRoaXMuYm91bmRzXyA9IG51bGw7XG4gIHRoaXMuY2x1c3Rlckljb25fID0gbmV3IENsdXN0ZXJJY29uKHRoaXMsIG1hcmtlckNsdXN0ZXJlci5nZXRTdHlsZXMoKSxcbiAgICAgIG1hcmtlckNsdXN0ZXJlci5nZXRHcmlkU2l6ZSgpKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbnMgaWYgYSBtYXJrZXIgaXMgYWxyZWFkeSBhZGRlZCB0byB0aGUgY2x1c3Rlci5cbiAqXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLk1hcmtlcn0gbWFya2VyIFRoZSBtYXJrZXIgdG8gY2hlY2suXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIHRoZSBtYXJrZXIgaXMgYWxyZWFkeSBhZGRlZC5cbiAqL1xuQ2x1c3Rlci5wcm90b3R5cGUuaXNNYXJrZXJBbHJlYWR5QWRkZWQgPSBmdW5jdGlvbihtYXJrZXIpIHtcbiAgaWYgKHRoaXMubWFya2Vyc18uaW5kZXhPZikge1xuICAgIHJldHVybiB0aGlzLm1hcmtlcnNfLmluZGV4T2YobWFya2VyKSAhPSAtMTtcbiAgfSBlbHNlIHtcbiAgICBmb3IgKHZhciBpID0gMCwgbTsgbSA9IHRoaXMubWFya2Vyc19baV07IGkrKykge1xuICAgICAgaWYgKG0gPT0gbWFya2VyKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59O1xuXG5cbi8qKlxuICogQWRkIGEgbWFya2VyIHRoZSBjbHVzdGVyLlxuICpcbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTWFya2VyfSBtYXJrZXIgVGhlIG1hcmtlciB0byBhZGQuXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIHRoZSBtYXJrZXIgd2FzIGFkZGVkLlxuICovXG5DbHVzdGVyLnByb3RvdHlwZS5hZGRNYXJrZXIgPSBmdW5jdGlvbihtYXJrZXIpIHtcbiAgaWYgKHRoaXMuaXNNYXJrZXJBbHJlYWR5QWRkZWQobWFya2VyKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmICghdGhpcy5jZW50ZXJfKSB7XG4gICAgdGhpcy5jZW50ZXJfID0gbWFya2VyLmdldFBvc2l0aW9uKCk7XG4gICAgdGhpcy5jYWxjdWxhdGVCb3VuZHNfKCk7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHRoaXMuYXZlcmFnZUNlbnRlcl8pIHtcbiAgICAgIHZhciBsID0gdGhpcy5tYXJrZXJzXy5sZW5ndGggKyAxO1xuICAgICAgdmFyIGxhdCA9ICh0aGlzLmNlbnRlcl8ubGF0KCkgKiAobC0xKSArIG1hcmtlci5nZXRQb3NpdGlvbigpLmxhdCgpKSAvIGw7XG4gICAgICB2YXIgbG5nID0gKHRoaXMuY2VudGVyXy5sbmcoKSAqIChsLTEpICsgbWFya2VyLmdldFBvc2l0aW9uKCkubG5nKCkpIC8gbDtcbiAgICAgIHRoaXMuY2VudGVyXyA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmcobGF0LCBsbmcpO1xuICAgICAgdGhpcy5jYWxjdWxhdGVCb3VuZHNfKCk7XG4gICAgfVxuICB9XG5cbiAgbWFya2VyLmlzQWRkZWQgPSB0cnVlO1xuICB0aGlzLm1hcmtlcnNfLnB1c2gobWFya2VyKTtcblxuICB2YXIgbGVuID0gdGhpcy5tYXJrZXJzXy5sZW5ndGg7XG4gIGlmIChsZW4gPCB0aGlzLm1pbkNsdXN0ZXJTaXplXyAmJiBtYXJrZXIuZ2V0TWFwKCkgIT0gdGhpcy5tYXBfKSB7XG4gICAgLy8gTWluIGNsdXN0ZXIgc2l6ZSBub3QgcmVhY2hlZCBzbyBzaG93IHRoZSBtYXJrZXIuXG4gICAgbWFya2VyLnNldE1hcCh0aGlzLm1hcF8pO1xuICB9XG5cbiAgaWYgKGxlbiA9PSB0aGlzLm1pbkNsdXN0ZXJTaXplXykge1xuICAgIC8vIEhpZGUgdGhlIG1hcmtlcnMgdGhhdCB3ZXJlIHNob3dpbmcuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgdGhpcy5tYXJrZXJzX1tpXS5zZXRNYXAobnVsbCk7XG4gICAgfVxuICB9XG5cbiAgaWYgKGxlbiA+PSB0aGlzLm1pbkNsdXN0ZXJTaXplXykge1xuICAgIG1hcmtlci5zZXRNYXAobnVsbCk7XG4gIH1cblxuICB0aGlzLnVwZGF0ZUljb24oKTtcbiAgcmV0dXJuIHRydWU7XG59O1xuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgbWFya2VyIGNsdXN0ZXJlciB0aGF0IHRoZSBjbHVzdGVyIGlzIGFzc29jaWF0ZWQgd2l0aC5cbiAqXG4gKiBAcmV0dXJuIHtNYXJrZXJDbHVzdGVyZXJ9IFRoZSBhc3NvY2lhdGVkIG1hcmtlciBjbHVzdGVyZXIuXG4gKi9cbkNsdXN0ZXIucHJvdG90eXBlLmdldE1hcmtlckNsdXN0ZXJlciA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5tYXJrZXJDbHVzdGVyZXJfO1xufTtcblxuXG4vKipcbiAqIFJldHVybnMgdGhlIGJvdW5kcyBvZiB0aGUgY2x1c3Rlci5cbiAqXG4gKiBAcmV0dXJuIHtnb29nbGUubWFwcy5MYXRMbmdCb3VuZHN9IHRoZSBjbHVzdGVyIGJvdW5kcy5cbiAqL1xuQ2x1c3Rlci5wcm90b3R5cGUuZ2V0Qm91bmRzID0gZnVuY3Rpb24oKSB7XG4gIHZhciBib3VuZHMgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nQm91bmRzKHRoaXMuY2VudGVyXywgdGhpcy5jZW50ZXJfKTtcbiAgdmFyIG1hcmtlcnMgPSB0aGlzLmdldE1hcmtlcnMoKTtcbiAgZm9yICh2YXIgaSA9IDAsIG1hcmtlcjsgbWFya2VyID0gbWFya2Vyc1tpXTsgaSsrKSB7XG4gICAgYm91bmRzLmV4dGVuZChtYXJrZXIuZ2V0UG9zaXRpb24oKSk7XG4gIH1cbiAgcmV0dXJuIGJvdW5kcztcbn07XG5cblxuLyoqXG4gKiBSZW1vdmVzIHRoZSBjbHVzdGVyXG4gKi9cbkNsdXN0ZXIucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmNsdXN0ZXJJY29uXy5yZW1vdmUoKTtcbiAgdGhpcy5tYXJrZXJzXy5sZW5ndGggPSAwO1xuICBkZWxldGUgdGhpcy5tYXJrZXJzXztcbn07XG5cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBjZW50ZXIgb2YgdGhlIGNsdXN0ZXIuXG4gKlxuICogQHJldHVybiB7bnVtYmVyfSBUaGUgY2x1c3RlciBjZW50ZXIuXG4gKi9cbkNsdXN0ZXIucHJvdG90eXBlLmdldFNpemUgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMubWFya2Vyc18ubGVuZ3RoO1xufTtcblxuXG4vKipcbiAqIFJldHVybnMgdGhlIGNlbnRlciBvZiB0aGUgY2x1c3Rlci5cbiAqXG4gKiBAcmV0dXJuIHtBcnJheS48Z29vZ2xlLm1hcHMuTWFya2VyPn0gVGhlIGNsdXN0ZXIgY2VudGVyLlxuICovXG5DbHVzdGVyLnByb3RvdHlwZS5nZXRNYXJrZXJzID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLm1hcmtlcnNfO1xufTtcblxuXG4vKipcbiAqIFJldHVybnMgdGhlIGNlbnRlciBvZiB0aGUgY2x1c3Rlci5cbiAqXG4gKiBAcmV0dXJuIHtnb29nbGUubWFwcy5MYXRMbmd9IFRoZSBjbHVzdGVyIGNlbnRlci5cbiAqL1xuQ2x1c3Rlci5wcm90b3R5cGUuZ2V0Q2VudGVyID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmNlbnRlcl87XG59O1xuXG5cbi8qKlxuICogQ2FsY3VsYXRlZCB0aGUgZXh0ZW5kZWQgYm91bmRzIG9mIHRoZSBjbHVzdGVyIHdpdGggdGhlIGdyaWQuXG4gKlxuICogQHByaXZhdGVcbiAqL1xuQ2x1c3Rlci5wcm90b3R5cGUuY2FsY3VsYXRlQm91bmRzXyA9IGZ1bmN0aW9uKCkge1xuICB2YXIgYm91bmRzID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZ0JvdW5kcyh0aGlzLmNlbnRlcl8sIHRoaXMuY2VudGVyXyk7XG4gIHRoaXMuYm91bmRzXyA9IHRoaXMubWFya2VyQ2x1c3RlcmVyXy5nZXRFeHRlbmRlZEJvdW5kcyhib3VuZHMpO1xufTtcblxuXG4vKipcbiAqIERldGVybWluZXMgaWYgYSBtYXJrZXIgbGllcyBpbiB0aGUgY2x1c3RlcnMgYm91bmRzLlxuICpcbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTWFya2VyfSBtYXJrZXIgVGhlIG1hcmtlciB0byBjaGVjay5cbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdGhlIG1hcmtlciBsaWVzIGluIHRoZSBib3VuZHMuXG4gKi9cbkNsdXN0ZXIucHJvdG90eXBlLmlzTWFya2VySW5DbHVzdGVyQm91bmRzID0gZnVuY3Rpb24obWFya2VyKSB7XG4gIHJldHVybiB0aGlzLmJvdW5kc18uY29udGFpbnMobWFya2VyLmdldFBvc2l0aW9uKCkpO1xufTtcblxuXG4vKipcbiAqIFJldHVybnMgdGhlIG1hcCB0aGF0IHRoZSBjbHVzdGVyIGlzIGFzc29jaWF0ZWQgd2l0aC5cbiAqXG4gKiBAcmV0dXJuIHtnb29nbGUubWFwcy5NYXB9IFRoZSBtYXAuXG4gKi9cbkNsdXN0ZXIucHJvdG90eXBlLmdldE1hcCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5tYXBfO1xufTtcblxuXG4vKipcbiAqIFVwZGF0ZXMgdGhlIGNsdXN0ZXIgaWNvblxuICovXG5DbHVzdGVyLnByb3RvdHlwZS51cGRhdGVJY29uID0gZnVuY3Rpb24oKSB7XG4gIHZhciB6b29tID0gdGhpcy5tYXBfLmdldFpvb20oKTtcbiAgdmFyIG16ID0gdGhpcy5tYXJrZXJDbHVzdGVyZXJfLmdldE1heFpvb20oKTtcblxuICBpZiAobXogJiYgem9vbSA+IG16KSB7XG4gICAgLy8gVGhlIHpvb20gaXMgZ3JlYXRlciB0aGFuIG91ciBtYXggem9vbSBzbyBzaG93IGFsbCB0aGUgbWFya2VycyBpbiBjbHVzdGVyLlxuICAgIGZvciAodmFyIGkgPSAwLCBtYXJrZXI7IG1hcmtlciA9IHRoaXMubWFya2Vyc19baV07IGkrKykge1xuICAgICAgbWFya2VyLnNldE1hcCh0aGlzLm1hcF8pO1xuICAgIH1cbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAodGhpcy5tYXJrZXJzXy5sZW5ndGggPCB0aGlzLm1pbkNsdXN0ZXJTaXplXykge1xuICAgIC8vIE1pbiBjbHVzdGVyIHNpemUgbm90IHlldCByZWFjaGVkLlxuICAgIHRoaXMuY2x1c3Rlckljb25fLmhpZGUoKTtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgbnVtU3R5bGVzID0gdGhpcy5tYXJrZXJDbHVzdGVyZXJfLmdldFN0eWxlcygpLmxlbmd0aDtcbiAgdmFyIHN1bXMgPSB0aGlzLm1hcmtlckNsdXN0ZXJlcl8uZ2V0Q2FsY3VsYXRvcigpKHRoaXMubWFya2Vyc18sIG51bVN0eWxlcyk7XG4gIHRoaXMuY2x1c3Rlckljb25fLnNldENlbnRlcih0aGlzLmNlbnRlcl8pO1xuICB0aGlzLmNsdXN0ZXJJY29uXy5zZXRTdW1zKHN1bXMpO1xuICB0aGlzLmNsdXN0ZXJJY29uXy5zaG93KCk7XG59O1xuXG5cbi8qKlxuICogQSBjbHVzdGVyIGljb25cbiAqXG4gKiBAcGFyYW0ge0NsdXN0ZXJ9IGNsdXN0ZXIgVGhlIGNsdXN0ZXIgdG8gYmUgYXNzb2NpYXRlZCB3aXRoLlxuICogQHBhcmFtIHtPYmplY3R9IHN0eWxlcyBBbiBvYmplY3QgdGhhdCBoYXMgc3R5bGUgcHJvcGVydGllczpcbiAqICAgICAndXJsJzogKHN0cmluZykgVGhlIGltYWdlIHVybC5cbiAqICAgICAnaGVpZ2h0JzogKG51bWJlcikgVGhlIGltYWdlIGhlaWdodC5cbiAqICAgICAnd2lkdGgnOiAobnVtYmVyKSBUaGUgaW1hZ2Ugd2lkdGguXG4gKiAgICAgJ2FuY2hvcic6IChBcnJheSkgVGhlIGFuY2hvciBwb3NpdGlvbiBvZiB0aGUgbGFiZWwgdGV4dC5cbiAqICAgICAndGV4dENvbG9yJzogKHN0cmluZykgVGhlIHRleHQgY29sb3IuXG4gKiAgICAgJ3RleHRTaXplJzogKG51bWJlcikgVGhlIHRleHQgc2l6ZS5cbiAqICAgICAgJ2ZvbnRGYW1pbHknOiAoc3RyaW5nKSBUaGUgZm9udCBmYW1pbHkuXG4gKiAgICAgICdmb250V2VpZ2h0JzogKHN0cmluZykgVGhlIGZvbnQgd2VpZ2h0LlxuICogICAgICdiYWNrZ3JvdW5kUG9zaXRpb246IChzdHJpbmcpIFRoZSBiYWNrZ3JvdW5kIHBvc3RpdGlvbiB4LCB5LlxuICogQHBhcmFtIHtudW1iZXI9fSBvcHRfcGFkZGluZyBPcHRpb25hbCBwYWRkaW5nIHRvIGFwcGx5IHRvIHRoZSBjbHVzdGVyIGljb24uXG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlbmRzIGdvb2dsZS5tYXBzLk92ZXJsYXlWaWV3XG4gKiBAaWdub3JlXG4gKi9cbmZ1bmN0aW9uIENsdXN0ZXJJY29uKGNsdXN0ZXIsIHN0eWxlcywgb3B0X3BhZGRpbmcpIHtcbiAgY2x1c3Rlci5nZXRNYXJrZXJDbHVzdGVyZXIoKS5leHRlbmQoQ2x1c3Rlckljb24sIGdvb2dsZS5tYXBzLk92ZXJsYXlWaWV3KTtcblxuICB0aGlzLnN0eWxlc18gPSBzdHlsZXM7XG4gIHRoaXMucGFkZGluZ18gPSBvcHRfcGFkZGluZyB8fCAwO1xuICB0aGlzLmNsdXN0ZXJfID0gY2x1c3RlcjtcbiAgdGhpcy5jZW50ZXJfID0gbnVsbDtcbiAgdGhpcy5tYXBfID0gY2x1c3Rlci5nZXRNYXAoKTtcbiAgdGhpcy5kaXZfID0gbnVsbDtcbiAgdGhpcy5zdW1zXyA9IG51bGw7XG4gIHRoaXMudmlzaWJsZV8gPSBmYWxzZTtcblxuICB0aGlzLnNldE1hcCh0aGlzLm1hcF8pO1xufVxuXG5cbi8qKlxuICogVHJpZ2dlcnMgdGhlIGNsdXN0ZXJjbGljayBldmVudCBhbmQgem9vbSdzIGlmIHRoZSBvcHRpb24gaXMgc2V0LlxuICovXG5DbHVzdGVySWNvbi5wcm90b3R5cGUudHJpZ2dlckNsdXN0ZXJDbGljayA9IGZ1bmN0aW9uKCkge1xuICB2YXIgbWFya2VyQ2x1c3RlcmVyID0gdGhpcy5jbHVzdGVyXy5nZXRNYXJrZXJDbHVzdGVyZXIoKTtcblxuICAvLyBUcmlnZ2VyIHRoZSBjbHVzdGVyY2xpY2sgZXZlbnQuXG4gIGdvb2dsZS5tYXBzLmV2ZW50LnRyaWdnZXIobWFya2VyQ2x1c3RlcmVyLCAnY2x1c3RlcmNsaWNrJywgdGhpcy5jbHVzdGVyXyk7XG5cbiAgaWYgKG1hcmtlckNsdXN0ZXJlci5pc1pvb21PbkNsaWNrKCkpIHtcbiAgICAvLyBab29tIGludG8gdGhlIGNsdXN0ZXIuXG4gICAgdGhpcy5tYXBfLmZpdEJvdW5kcyh0aGlzLmNsdXN0ZXJfLmdldEJvdW5kcygpKTtcbiAgfVxufTtcblxuXG4vKipcbiAqIEFkZGluZyB0aGUgY2x1c3RlciBpY29uIHRvIHRoZSBkb20uXG4gKiBAaWdub3JlXG4gKi9cbkNsdXN0ZXJJY29uLnByb3RvdHlwZS5vbkFkZCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmRpdl8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcbiAgaWYgKHRoaXMudmlzaWJsZV8pIHtcbiAgICB2YXIgcG9zID0gdGhpcy5nZXRQb3NGcm9tTGF0TG5nXyh0aGlzLmNlbnRlcl8pO1xuICAgIHRoaXMuZGl2Xy5zdHlsZS5jc3NUZXh0ID0gdGhpcy5jcmVhdGVDc3MocG9zKTtcbiAgICB0aGlzLmRpdl8uaW5uZXJIVE1MID0gdGhpcy5zdW1zXy50ZXh0O1xuICB9XG5cbiAgdmFyIHBhbmVzID0gdGhpcy5nZXRQYW5lcygpO1xuICBwYW5lcy5vdmVybGF5TW91c2VUYXJnZXQuYXBwZW5kQ2hpbGQodGhpcy5kaXZfKTtcblxuICB2YXIgdGhhdCA9IHRoaXM7XG4gIGdvb2dsZS5tYXBzLmV2ZW50LmFkZERvbUxpc3RlbmVyKHRoaXMuZGl2XywgJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgdGhhdC50cmlnZ2VyQ2x1c3RlckNsaWNrKCk7XG4gIH0pO1xufTtcblxuXG4vKipcbiAqIFJldHVybnMgdGhlIHBvc2l0aW9uIHRvIHBsYWNlIHRoZSBkaXYgZGVuZGluZyBvbiB0aGUgbGF0bG5nLlxuICpcbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTGF0TG5nfSBsYXRsbmcgVGhlIHBvc2l0aW9uIGluIGxhdGxuZy5cbiAqIEByZXR1cm4ge2dvb2dsZS5tYXBzLlBvaW50fSBUaGUgcG9zaXRpb24gaW4gcGl4ZWxzLlxuICogQHByaXZhdGVcbiAqL1xuQ2x1c3Rlckljb24ucHJvdG90eXBlLmdldFBvc0Zyb21MYXRMbmdfID0gZnVuY3Rpb24obGF0bG5nKSB7XG4gIHZhciBwb3MgPSB0aGlzLmdldFByb2plY3Rpb24oKS5mcm9tTGF0TG5nVG9EaXZQaXhlbChsYXRsbmcpO1xuICBwb3MueCAtPSBwYXJzZUludCh0aGlzLndpZHRoXyAvIDIsIDEwKTtcbiAgcG9zLnkgLT0gcGFyc2VJbnQodGhpcy5oZWlnaHRfIC8gMiwgMTApO1xuICByZXR1cm4gcG9zO1xufTtcblxuXG4vKipcbiAqIERyYXcgdGhlIGljb24uXG4gKiBAaWdub3JlXG4gKi9cbkNsdXN0ZXJJY29uLnByb3RvdHlwZS5kcmF3ID0gZnVuY3Rpb24oKSB7XG4gIGlmICh0aGlzLnZpc2libGVfKSB7XG4gICAgdmFyIHBvcyA9IHRoaXMuZ2V0UG9zRnJvbUxhdExuZ18odGhpcy5jZW50ZXJfKTtcbiAgICB0aGlzLmRpdl8uc3R5bGUudG9wID0gcG9zLnkgKyAncHgnO1xuICAgIHRoaXMuZGl2Xy5zdHlsZS5sZWZ0ID0gcG9zLnggKyAncHgnO1xuICB9XG59O1xuXG5cbi8qKlxuICogSGlkZSB0aGUgaWNvbi5cbiAqL1xuQ2x1c3Rlckljb24ucHJvdG90eXBlLmhpZGUgPSBmdW5jdGlvbigpIHtcbiAgaWYgKHRoaXMuZGl2Xykge1xuICAgIHRoaXMuZGl2Xy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICB9XG4gIHRoaXMudmlzaWJsZV8gPSBmYWxzZTtcbn07XG5cblxuLyoqXG4gKiBQb3NpdGlvbiBhbmQgc2hvdyB0aGUgaWNvbi5cbiAqL1xuQ2x1c3Rlckljb24ucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbigpIHtcbiAgaWYgKHRoaXMuZGl2Xykge1xuICAgIHZhciBwb3MgPSB0aGlzLmdldFBvc0Zyb21MYXRMbmdfKHRoaXMuY2VudGVyXyk7XG4gICAgdGhpcy5kaXZfLnN0eWxlLmNzc1RleHQgPSB0aGlzLmNyZWF0ZUNzcyhwb3MpO1xuICAgIHRoaXMuZGl2Xy5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gIH1cbiAgdGhpcy52aXNpYmxlXyA9IHRydWU7XG59O1xuXG5cbi8qKlxuICogUmVtb3ZlIHRoZSBpY29uIGZyb20gdGhlIG1hcFxuICovXG5DbHVzdGVySWNvbi5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuc2V0TWFwKG51bGwpO1xufTtcblxuXG4vKipcbiAqIEltcGxlbWVudGF0aW9uIG9mIHRoZSBvblJlbW92ZSBpbnRlcmZhY2UuXG4gKiBAaWdub3JlXG4gKi9cbkNsdXN0ZXJJY29uLnByb3RvdHlwZS5vblJlbW92ZSA9IGZ1bmN0aW9uKCkge1xuICBpZiAodGhpcy5kaXZfICYmIHRoaXMuZGl2Xy5wYXJlbnROb2RlKSB7XG4gICAgdGhpcy5oaWRlKCk7XG4gICAgdGhpcy5kaXZfLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5kaXZfKTtcbiAgICB0aGlzLmRpdl8gPSBudWxsO1xuICB9XG59O1xuXG5cbi8qKlxuICogU2V0IHRoZSBzdW1zIG9mIHRoZSBpY29uLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdW1zIFRoZSBzdW1zIGNvbnRhaW5pbmc6XG4gKiAgICd0ZXh0JzogKHN0cmluZykgVGhlIHRleHQgdG8gZGlzcGxheSBpbiB0aGUgaWNvbi5cbiAqICAgJ2luZGV4JzogKG51bWJlcikgVGhlIHN0eWxlIGluZGV4IG9mIHRoZSBpY29uLlxuICovXG5DbHVzdGVySWNvbi5wcm90b3R5cGUuc2V0U3VtcyA9IGZ1bmN0aW9uKHN1bXMpIHtcbiAgdGhpcy5zdW1zXyA9IHN1bXM7XG4gIHRoaXMudGV4dF8gPSBzdW1zLnRleHQ7XG4gIHRoaXMuaW5kZXhfID0gc3Vtcy5pbmRleDtcbiAgaWYgKHRoaXMuZGl2Xykge1xuICAgIHRoaXMuZGl2Xy5pbm5lckhUTUwgPSBzdW1zLnRleHQ7XG4gIH1cblxuICB0aGlzLnVzZVN0eWxlKCk7XG59O1xuXG5cbi8qKlxuICogU2V0cyB0aGUgaWNvbiB0byB0aGUgdGhlIHN0eWxlcy5cbiAqL1xuQ2x1c3Rlckljb24ucHJvdG90eXBlLnVzZVN0eWxlID0gZnVuY3Rpb24oKSB7XG4gIHZhciBpbmRleCA9IE1hdGgubWF4KDAsIHRoaXMuc3Vtc18uaW5kZXggLSAxKTtcbiAgaW5kZXggPSBNYXRoLm1pbih0aGlzLnN0eWxlc18ubGVuZ3RoIC0gMSwgaW5kZXgpO1xuICB2YXIgc3R5bGUgPSB0aGlzLnN0eWxlc19baW5kZXhdO1xuICB0aGlzLnVybF8gPSBzdHlsZVsndXJsJ107XG4gIHRoaXMuaGVpZ2h0XyA9IHN0eWxlWydoZWlnaHQnXTtcbiAgdGhpcy53aWR0aF8gPSBzdHlsZVsnd2lkdGgnXTtcbiAgdGhpcy50ZXh0Q29sb3JfID0gc3R5bGVbJ3RleHRDb2xvciddO1xuICB0aGlzLmFuY2hvcl8gPSBzdHlsZVsnYW5jaG9yJ107XG4gIHRoaXMudGV4dFNpemVfID0gc3R5bGVbJ3RleHRTaXplJ107XG4gIHRoaXMuZm9udEZhbWlseV8gPSBzdHlsZVsnZm9udEZhbWlseSddO1xuICB0aGlzLmZvbnRXZWlnaHRfID0gc3R5bGVbJ2ZvbnRXZWlnaHQnXTtcbiAgdGhpcy5iYWNrZ3JvdW5kUG9zaXRpb25fID0gc3R5bGVbJ2JhY2tncm91bmRQb3NpdGlvbiddO1xufTtcblxuXG4vKipcbiAqIFNldHMgdGhlIGNlbnRlciBvZiB0aGUgaWNvbi5cbiAqXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLkxhdExuZ30gY2VudGVyIFRoZSBsYXRsbmcgdG8gc2V0IGFzIHRoZSBjZW50ZXIuXG4gKi9cbkNsdXN0ZXJJY29uLnByb3RvdHlwZS5zZXRDZW50ZXIgPSBmdW5jdGlvbihjZW50ZXIpIHtcbiAgdGhpcy5jZW50ZXJfID0gY2VudGVyO1xufTtcblxuXG4vKipcbiAqIENyZWF0ZSB0aGUgY3NzIHRleHQgYmFzZWQgb24gdGhlIHBvc2l0aW9uIG9mIHRoZSBpY29uLlxuICpcbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuUG9pbnR9IHBvcyBUaGUgcG9zaXRpb24uXG4gKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBjc3Mgc3R5bGUgdGV4dC5cbiAqL1xuQ2x1c3Rlckljb24ucHJvdG90eXBlLmNyZWF0ZUNzcyA9IGZ1bmN0aW9uKHBvcykge1xuICB2YXIgc3R5bGUgPSBbXTtcbiAgc3R5bGUucHVzaCgnYmFja2dyb3VuZC1pbWFnZTp1cmwoJyArIHRoaXMudXJsXyArICcpOycpO1xuICB2YXIgYmFja2dyb3VuZFBvc2l0aW9uID0gdGhpcy5iYWNrZ3JvdW5kUG9zaXRpb25fID8gdGhpcy5iYWNrZ3JvdW5kUG9zaXRpb25fIDogJzAgMCc7XG4gIHN0eWxlLnB1c2goJ2JhY2tncm91bmQtcG9zaXRpb246JyArIGJhY2tncm91bmRQb3NpdGlvbiArICc7Jyk7XG5cbiAgaWYgKHR5cGVvZiB0aGlzLmFuY2hvcl8gPT09ICdvYmplY3QnKSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLmFuY2hvcl9bMF0gPT09ICdudW1iZXInICYmIHRoaXMuYW5jaG9yX1swXSA+IDAgJiZcbiAgICAgICAgdGhpcy5hbmNob3JfWzBdIDwgdGhpcy5oZWlnaHRfKSB7XG4gICAgICBzdHlsZS5wdXNoKCdoZWlnaHQ6JyArICh0aGlzLmhlaWdodF8gLSB0aGlzLmFuY2hvcl9bMF0pICtcbiAgICAgICAgICAncHg7IHBhZGRpbmctdG9wOicgKyB0aGlzLmFuY2hvcl9bMF0gKyAncHg7Jyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlLnB1c2goJ2hlaWdodDonICsgdGhpcy5oZWlnaHRfICsgJ3B4OyBsaW5lLWhlaWdodDonICsgdGhpcy5oZWlnaHRfICtcbiAgICAgICAgICAncHg7Jyk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgdGhpcy5hbmNob3JfWzFdID09PSAnbnVtYmVyJyAmJiB0aGlzLmFuY2hvcl9bMV0gPiAwICYmXG4gICAgICAgIHRoaXMuYW5jaG9yX1sxXSA8IHRoaXMud2lkdGhfKSB7XG4gICAgICBzdHlsZS5wdXNoKCd3aWR0aDonICsgKHRoaXMud2lkdGhfIC0gdGhpcy5hbmNob3JfWzFdKSArXG4gICAgICAgICAgJ3B4OyBwYWRkaW5nLWxlZnQ6JyArIHRoaXMuYW5jaG9yX1sxXSArICdweDsnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3R5bGUucHVzaCgnd2lkdGg6JyArIHRoaXMud2lkdGhfICsgJ3B4OyB0ZXh0LWFsaWduOmNlbnRlcjsnKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgc3R5bGUucHVzaCgnaGVpZ2h0OicgKyB0aGlzLmhlaWdodF8gKyAncHg7IGxpbmUtaGVpZ2h0OicgK1xuICAgICAgICB0aGlzLmhlaWdodF8gKyAncHg7IHdpZHRoOicgKyB0aGlzLndpZHRoXyArICdweDsgdGV4dC1hbGlnbjpjZW50ZXI7Jyk7XG4gIH1cblxuICB2YXIgdHh0Q29sb3IgPSB0aGlzLnRleHRDb2xvcl8gPyB0aGlzLnRleHRDb2xvcl8gOiAnYmxhY2snO1xuICB2YXIgdHh0U2l6ZSA9IHRoaXMudGV4dFNpemVfID8gdGhpcy50ZXh0U2l6ZV8gOiAxMTtcbiAgdmFyIGZvbnRGYW1pbHkgPSB0aGlzLmZvbnRGYW1pbHlfID8gdGhpcy5mb250RmFtaWx5XyA6ICdBcmlhbCxzYW5zLXNlcmlmJztcbiAgdmFyIGZvbnRXZWlnaHQgPSB0aGlzLmZvbnRXZWlnaHRfID8gdGhpcy5mb250V2VpZ2h0XyA6ICc0MDAnO1xuXG4gIHN0eWxlLnB1c2goJ2N1cnNvcjpwb2ludGVyOyB0b3A6JyArIHBvcy55ICsgJ3B4OyBsZWZ0OicgK1xuICAgICAgcG9zLnggKyAncHg7IGNvbG9yOicgKyB0eHRDb2xvciArICc7IHBvc2l0aW9uOmFic29sdXRlOyBmb250LXNpemU6JyArXG4gICAgICB0eHRTaXplICsgJ3B4OyBmb250LWZhbWlseTonICsgZm9udEZhbWlseSArICc7IGZvbnQtd2VpZ2h0OicgKyBmb250V2VpZ2h0ICsgJzsnKTtcbiAgcmV0dXJuIHN0eWxlLmpvaW4oJycpO1xufTtcblxuXG4vLyBFeHBvcnQgU3ltYm9scyBmb3IgQ2xvc3VyZVxuLy8gSWYgeW91IGFyZSBub3QgZ29pbmcgdG8gY29tcGlsZSB3aXRoIGNsb3N1cmUgdGhlbiB5b3UgY2FuIHJlbW92ZSB0aGVcbi8vIGNvZGUgYmVsb3cuXG5nbG9iYWxbJ01hcmtlckNsdXN0ZXJlciddID0gTWFya2VyQ2x1c3RlcmVyO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnYWRkTWFya2VyJ10gPSBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmFkZE1hcmtlcjtcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ2FkZE1hcmtlcnMnXSA9IE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuYWRkTWFya2Vycztcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ2NsZWFyTWFya2VycyddID1cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmNsZWFyTWFya2Vycztcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ2ZpdE1hcFRvTWFya2VycyddID1cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmZpdE1hcFRvTWFya2Vycztcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ2dldENhbGN1bGF0b3InXSA9XG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRDYWxjdWxhdG9yO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnZ2V0R3JpZFNpemUnXSA9XG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRHcmlkU2l6ZTtcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ2dldEV4dGVuZGVkQm91bmRzJ10gPVxuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0RXh0ZW5kZWRCb3VuZHM7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydnZXRNYXAnXSA9IE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0TWFwO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnZ2V0TWFya2VycyddID0gTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRNYXJrZXJzO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnZ2V0TWF4Wm9vbSddID0gTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRNYXhab29tO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnZ2V0U3R5bGVzJ10gPSBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldFN0eWxlcztcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ2dldFRvdGFsQ2x1c3RlcnMnXSA9XG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRUb3RhbENsdXN0ZXJzO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnZ2V0VG90YWxNYXJrZXJzJ10gPVxuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0VG90YWxNYXJrZXJzO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsncmVkcmF3J10gPSBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnJlZHJhdztcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ3JlbW92ZU1hcmtlciddID1cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnJlbW92ZU1hcmtlcjtcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ3JlbW92ZU1hcmtlcnMnXSA9XG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5yZW1vdmVNYXJrZXJzO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsncmVzZXRWaWV3cG9ydCddID1cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnJlc2V0Vmlld3BvcnQ7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydyZXBhaW50J10gPVxuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUucmVwYWludDtcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ3NldENhbGN1bGF0b3InXSA9XG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5zZXRDYWxjdWxhdG9yO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnc2V0R3JpZFNpemUnXSA9XG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5zZXRHcmlkU2l6ZTtcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ3NldE1heFpvb20nXSA9XG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5zZXRNYXhab29tO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnb25BZGQnXSA9IE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUub25BZGQ7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydkcmF3J10gPSBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmRyYXc7XG5cbkNsdXN0ZXIucHJvdG90eXBlWydnZXRDZW50ZXInXSA9IENsdXN0ZXIucHJvdG90eXBlLmdldENlbnRlcjtcbkNsdXN0ZXIucHJvdG90eXBlWydnZXRTaXplJ10gPSBDbHVzdGVyLnByb3RvdHlwZS5nZXRTaXplO1xuQ2x1c3Rlci5wcm90b3R5cGVbJ2dldE1hcmtlcnMnXSA9IENsdXN0ZXIucHJvdG90eXBlLmdldE1hcmtlcnM7XG5cbkNsdXN0ZXJJY29uLnByb3RvdHlwZVsnb25BZGQnXSA9IENsdXN0ZXJJY29uLnByb3RvdHlwZS5vbkFkZDtcbkNsdXN0ZXJJY29uLnByb3RvdHlwZVsnZHJhdyddID0gQ2x1c3Rlckljb24ucHJvdG90eXBlLmRyYXc7XG5DbHVzdGVySWNvbi5wcm90b3R5cGVbJ29uUmVtb3ZlJ10gPSBDbHVzdGVySWNvbi5wcm90b3R5cGUub25SZW1vdmU7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBNYXJrZXJDbHVzdGVyZXI7XG4iLCIvKipcbiAqIGpRdWVyeSBCYXIgUmF0aW5nIFBsdWdpbiB2MS4yLjJcbiAqXG4gKiBodHRwOi8vZ2l0aHViLmNvbS9hbnRlbm5haW8vanF1ZXJ5LWJhci1yYXRpbmdcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTItMjAxNiBLYXppayBQaWV0cnVzemV3c2tpXG4gKlxuICogVGhpcyBwbHVnaW4gaXMgYXZhaWxhYmxlIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cbiAqIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gKi9cbihmdW5jdGlvbiAoZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgLy8gQU1EXG4gICAgICAgIGRlZmluZShbJ2pxdWVyeSddLCBmYWN0b3J5KTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgICAgIC8vIE5vZGUvQ29tbW9uSlNcbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoJ2pxdWVyeScpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBicm93c2VyIGdsb2JhbHNcbiAgICAgICAgZmFjdG9yeShqUXVlcnkpO1xuICAgIH1cbn0oZnVuY3Rpb24gKCQpIHtcblxuICAgIHZhciBCYXJSYXRpbmcgPSAoZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgZnVuY3Rpb24gQmFyUmF0aW5nKCkge1xuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgICAgICAvLyB3cmFwIGVsZW1lbnQgaW4gYSB3cmFwcGVyIGRpdlxuICAgICAgICAgICAgdmFyIHdyYXBFbGVtZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNsYXNzZXMgPSBbJ2JyLXdyYXBwZXInXTtcblxuICAgICAgICAgICAgICAgIGlmIChzZWxmLm9wdGlvbnMudGhlbWUgIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzZXMucHVzaCgnYnItdGhlbWUtJyArIHNlbGYub3B0aW9ucy50aGVtZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgc2VsZi4kZWxlbS53cmFwKCQoJzxkaXYgLz4nLCB7XG4gICAgICAgICAgICAgICAgICAgICdjbGFzcyc6IGNsYXNzZXMuam9pbignICcpXG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gdW53cmFwIGVsZW1lbnRcbiAgICAgICAgICAgIHZhciB1bndyYXBFbGVtZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgc2VsZi4kZWxlbS51bndyYXAoKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIGZpbmQgb3B0aW9uIGJ5IHZhbHVlXG4gICAgICAgICAgICB2YXIgZmluZE9wdGlvbiA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCQuaXNOdW1lcmljKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IE1hdGguZmxvb3IodmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiAkKCdvcHRpb25bdmFsdWU9XCInICsgdmFsdWUgICsgJ1wiXScsIHNlbGYuJGVsZW0pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gZ2V0IGluaXRpYWwgb3B0aW9uXG4gICAgICAgICAgICB2YXIgZ2V0SW5pdGlhbE9wdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBpbml0aWFsUmF0aW5nID0gc2VsZi5vcHRpb25zLmluaXRpYWxSYXRpbmc7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWluaXRpYWxSYXRpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQoJ29wdGlvbjpzZWxlY3RlZCcsIHNlbGYuJGVsZW0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBmaW5kT3B0aW9uKGluaXRpYWxSYXRpbmcpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gZ2V0IGVtcHR5IG9wdGlvblxuICAgICAgICAgICAgdmFyIGdldEVtcHR5T3B0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyICRlbXB0eU9wdCA9IHNlbGYuJGVsZW0uZmluZCgnb3B0aW9uW3ZhbHVlPVwiJyArIHNlbGYub3B0aW9ucy5lbXB0eVZhbHVlICsgJ1wiXScpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCEkZW1wdHlPcHQubGVuZ3RoICYmIHNlbGYub3B0aW9ucy5hbGxvd0VtcHR5KSB7XG4gICAgICAgICAgICAgICAgICAgICRlbXB0eU9wdCA9ICQoJzxvcHRpb24gLz4nLCB7ICd2YWx1ZSc6IHNlbGYub3B0aW9ucy5lbXB0eVZhbHVlIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAkZW1wdHlPcHQucHJlcGVuZFRvKHNlbGYuJGVsZW0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiAkZW1wdHlPcHQ7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBnZXQgZGF0YVxuICAgICAgICAgICAgdmFyIGdldERhdGEgPSBmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IHNlbGYuJGVsZW0uZGF0YSgnYmFycmF0aW5nJyk7XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGtleSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGFba2V5XTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIHNldCBkYXRhXG4gICAgICAgICAgICB2YXIgc2V0RGF0YSA9IGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLmRhdGEoJ2JhcnJhdGluZycsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLmRhdGEoJ2JhcnJhdGluZycpW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBzYXZlIGRhdGEgb24gZWxlbWVudFxuICAgICAgICAgICAgdmFyIHNhdmVEYXRhT25FbGVtZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyICRvcHQgPSBnZXRJbml0aWFsT3B0aW9uKCk7XG4gICAgICAgICAgICAgICAgdmFyICRlbXB0eU9wdCA9IGdldEVtcHR5T3B0aW9uKCk7XG5cbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSAkb3B0LnZhbCgpO1xuICAgICAgICAgICAgICAgIHZhciB0ZXh0ID0gJG9wdC5kYXRhKCdodG1sJykgPyAkb3B0LmRhdGEoJ2h0bWwnKSA6ICRvcHQudGV4dCgpO1xuXG4gICAgICAgICAgICAgICAgLy8gaWYgdGhlIGFsbG93RW1wdHkgb3B0aW9uIGlzIG5vdCBzZXQgbGV0J3MgY2hlY2sgaWYgZW1wdHkgb3B0aW9uIGV4aXN0cyBpbiB0aGUgc2VsZWN0IGZpZWxkXG4gICAgICAgICAgICAgICAgdmFyIGFsbG93RW1wdHkgPSAoc2VsZi5vcHRpb25zLmFsbG93RW1wdHkgIT09IG51bGwpID9cbiAgICAgICAgICAgICAgICAgICAgc2VsZi5vcHRpb25zLmFsbG93RW1wdHkgOlxuICAgICAgICAgICAgICAgICAgICAhISRlbXB0eU9wdC5sZW5ndGg7XG5cbiAgICAgICAgICAgICAgICB2YXIgZW1wdHlWYWx1ZSA9ICgkZW1wdHlPcHQubGVuZ3RoKSA/ICRlbXB0eU9wdC52YWwoKSA6IG51bGw7XG4gICAgICAgICAgICAgICAgdmFyIGVtcHR5VGV4dCA9ICgkZW1wdHlPcHQubGVuZ3RoKSA/ICRlbXB0eU9wdC50ZXh0KCkgOiBudWxsO1xuXG4gICAgICAgICAgICAgICAgc2V0RGF0YShudWxsLCB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJPcHRpb25zOiBzZWxmLm9wdGlvbnMsXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gaW5pdGlhbCByYXRpbmcgYmFzZWQgb24gdGhlIE9QVElPTiB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICByYXRpbmdWYWx1ZTogdmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIHJhdGluZ1RleHQ6IHRleHQsXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gcmF0aW5nIHdpbGwgYmUgcmVzdG9yZWQgYnkgY2FsbGluZyBjbGVhciBtZXRob2RcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxSYXRpbmdWYWx1ZTogdmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsUmF0aW5nVGV4dDogdGV4dCxcblxuICAgICAgICAgICAgICAgICAgICAvLyBhbGxvdyBlbXB0eSByYXRpbmdzP1xuICAgICAgICAgICAgICAgICAgICBhbGxvd0VtcHR5OiBhbGxvd0VtcHR5LFxuXG4gICAgICAgICAgICAgICAgICAgIC8vIHJhdGluZyB2YWx1ZSBhbmQgdGV4dCBvZiB0aGUgZW1wdHkgT1BUSU9OXG4gICAgICAgICAgICAgICAgICAgIGVtcHR5UmF0aW5nVmFsdWU6IGVtcHR5VmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIGVtcHR5UmF0aW5nVGV4dDogZW1wdHlUZXh0LFxuXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlYWQtb25seSBzdGF0ZVxuICAgICAgICAgICAgICAgICAgICByZWFkT25seTogc2VsZi5vcHRpb25zLnJlYWRvbmx5LFxuXG4gICAgICAgICAgICAgICAgICAgIC8vIGRpZCB0aGUgdXNlciBhbHJlYWR5IHNlbGVjdCBhIHJhdGluZz9cbiAgICAgICAgICAgICAgICAgICAgcmF0aW5nTWFkZTogZmFsc2VcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIHJlbW92ZSBkYXRhIG9uIGVsZW1lbnRcbiAgICAgICAgICAgIHZhciByZW1vdmVEYXRhT25FbGVtZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgc2VsZi4kZWxlbS5yZW1vdmVEYXRhKCdiYXJyYXRpbmcnKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIHJldHVybiBjdXJyZW50IHJhdGluZyB0ZXh0XG4gICAgICAgICAgICB2YXIgcmF0aW5nVGV4dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBnZXREYXRhKCdyYXRpbmdUZXh0Jyk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyByZXR1cm4gY3VycmVudCByYXRpbmcgdmFsdWVcbiAgICAgICAgICAgIHZhciByYXRpbmdWYWx1ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBnZXREYXRhKCdyYXRpbmdWYWx1ZScpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gYnVpbGQgd2lkZ2V0IGFuZCByZXR1cm4galF1ZXJ5IGVsZW1lbnRcbiAgICAgICAgICAgIHZhciBidWlsZFdpZGdldCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciAkdyA9ICQoJzxkaXYgLz4nLCB7ICdjbGFzcyc6ICdici13aWRnZXQnIH0pO1xuXG4gICAgICAgICAgICAgICAgLy8gY3JlYXRlIEEgZWxlbWVudHMgdGhhdCB3aWxsIHJlcGxhY2UgT1BUSU9Oc1xuICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0uZmluZCgnb3B0aW9uJykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbCwgdGV4dCwgaHRtbCwgJGE7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFsID0gJCh0aGlzKS52YWwoKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBjcmVhdGUgcmF0aW5ncyAtIGJ1dCBvbmx5IGlmIHZhbCBpcyBub3QgZGVmaW5lZCBhcyBlbXB0eVxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsICE9PSBnZXREYXRhKCdlbXB0eVJhdGluZ1ZhbHVlJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQgPSAkKHRoaXMpLnRleHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGh0bWwgPSAkKHRoaXMpLmRhdGEoJ2h0bWwnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChodG1sKSB7IHRleHQgPSBodG1sOyB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICRhID0gJCgnPGEgLz4nLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2hyZWYnOiAnIycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2RhdGEtcmF0aW5nLXZhbHVlJzogdmFsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdkYXRhLXJhdGluZy10ZXh0JzogdGV4dCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnaHRtbCc6IChzZWxmLm9wdGlvbnMuc2hvd1ZhbHVlcykgPyB0ZXh0IDogJydcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAkdy5hcHBlbmQoJGEpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIC8vIGFwcGVuZCAuYnItY3VycmVudC1yYXRpbmcgZGl2IHRvIHRoZSB3aWRnZXRcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5vcHRpb25zLnNob3dTZWxlY3RlZFJhdGluZykge1xuICAgICAgICAgICAgICAgICAgICAkdy5hcHBlbmQoJCgnPGRpdiAvPicsIHsgJ3RleHQnOiAnJywgJ2NsYXNzJzogJ2JyLWN1cnJlbnQtcmF0aW5nJyB9KSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gYWRkaXRpb25hbCBjbGFzc2VzIGZvciB0aGUgd2lkZ2V0XG4gICAgICAgICAgICAgICAgaWYgKHNlbGYub3B0aW9ucy5yZXZlcnNlKSB7XG4gICAgICAgICAgICAgICAgICAgICR3LmFkZENsYXNzKCdici1yZXZlcnNlJyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYub3B0aW9ucy5yZWFkb25seSkge1xuICAgICAgICAgICAgICAgICAgICAkdy5hZGRDbGFzcygnYnItcmVhZG9ubHknKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gJHc7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyByZXR1cm4gYSBqUXVlcnkgZnVuY3Rpb24gbmFtZSBkZXBlbmRpbmcgb24gdGhlICdyZXZlcnNlJyBzZXR0aW5nXG4gICAgICAgICAgICB2YXIgbmV4dEFsbG9yUHJldmlvdXNBbGwgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpZiAoZ2V0RGF0YSgndXNlck9wdGlvbnMnKS5yZXZlcnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnbmV4dEFsbCc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdwcmV2QWxsJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBzZXQgdGhlIHZhbHVlIG9mIHRoZSBzZWxlY3QgZmllbGRcbiAgICAgICAgICAgIHZhciBzZXRTZWxlY3RGaWVsZFZhbHVlID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICAvLyBjaGFuZ2Ugc2VsZWN0ZWQgb3B0aW9uXG4gICAgICAgICAgICAgICAgZmluZE9wdGlvbih2YWx1ZSkucHJvcCgnc2VsZWN0ZWQnLCB0cnVlKTtcblxuICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0uY2hhbmdlKCk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyByZXNldCBzZWxlY3QgZmllbGRcbiAgICAgICAgICAgIHZhciByZXNldFNlbGVjdEZpZWxkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJCgnb3B0aW9uJywgc2VsZi4kZWxlbSkucHJvcCgnc2VsZWN0ZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGVmYXVsdFNlbGVjdGVkO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgc2VsZi4kZWxlbS5jaGFuZ2UoKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIGRpc3BsYXkgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCByYXRpbmdcbiAgICAgICAgICAgIHZhciBzaG93U2VsZWN0ZWRSYXRpbmcgPSBmdW5jdGlvbih0ZXh0KSB7XG4gICAgICAgICAgICAgICAgLy8gdGV4dCB1bmRlZmluZWQ/XG4gICAgICAgICAgICAgICAgdGV4dCA9IHRleHQgPyB0ZXh0IDogcmF0aW5nVGV4dCgpO1xuXG4gICAgICAgICAgICAgICAgLy8gc3BlY2lhbCBjYXNlIHdoZW4gdGhlIHNlbGVjdGVkIHJhdGluZyBpcyBkZWZpbmVkIGFzIGVtcHR5XG4gICAgICAgICAgICAgICAgaWYgKHRleHQgPT0gZ2V0RGF0YSgnZW1wdHlSYXRpbmdUZXh0JykpIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dCA9ICcnO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIHVwZGF0ZSAuYnItY3VycmVudC1yYXRpbmcgZGl2XG4gICAgICAgICAgICAgICAgaWYgKHNlbGYub3B0aW9ucy5zaG93U2VsZWN0ZWRSYXRpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi4kZWxlbS5wYXJlbnQoKS5maW5kKCcuYnItY3VycmVudC1yYXRpbmcnKS50ZXh0KHRleHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIHJldHVybiByb3VuZGVkIGZyYWN0aW9uIG9mIGEgdmFsdWUgKDE0LjQgLT4gNDAsIDAuOTkgLT4gOTApXG4gICAgICAgICAgICB2YXIgZnJhY3Rpb24gPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLnJvdW5kKCgoTWF0aC5mbG9vcih2YWx1ZSAqIDEwKSAvIDEwKSAlIDEpICogMTAwKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIHJlbW92ZSBhbGwgY2xhc3NlcyBmcm9tIGVsZW1lbnRzXG4gICAgICAgICAgICB2YXIgcmVzZXRTdHlsZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBhbGwgY2xhc3NlcyBzdGFydGluZyB3aXRoIGJyLSpcbiAgICAgICAgICAgICAgICBzZWxmLiR3aWRnZXQuZmluZCgnYScpLnJlbW92ZUNsYXNzKGZ1bmN0aW9uKGluZGV4LCBjbGFzc2VzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoY2xhc3Nlcy5tYXRjaCgvKF58XFxzKWJyLVxcUysvZykgfHwgW10pLmpvaW4oJyAnKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIGFwcGx5IHN0eWxlIGJ5IHNldHRpbmcgY2xhc3NlcyBvbiBlbGVtZW50c1xuICAgICAgICAgICAgdmFyIGFwcGx5U3R5bGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgJGEgPSBzZWxmLiR3aWRnZXQuZmluZCgnYVtkYXRhLXJhdGluZy12YWx1ZT1cIicgKyByYXRpbmdWYWx1ZSgpICsgJ1wiXScpO1xuICAgICAgICAgICAgICAgIHZhciBpbml0aWFsUmF0aW5nID0gZ2V0RGF0YSgndXNlck9wdGlvbnMnKS5pbml0aWFsUmF0aW5nO1xuICAgICAgICAgICAgICAgIHZhciBiYXNlVmFsdWUgPSAkLmlzTnVtZXJpYyhyYXRpbmdWYWx1ZSgpKSA/IHJhdGluZ1ZhbHVlKCkgOiAwO1xuICAgICAgICAgICAgICAgIHZhciBmID0gZnJhY3Rpb24oaW5pdGlhbFJhdGluZyk7XG4gICAgICAgICAgICAgICAgdmFyICRhbGwsICRmcmFjdGlvbmFsO1xuXG4gICAgICAgICAgICAgICAgcmVzZXRTdHlsZSgpO1xuXG4gICAgICAgICAgICAgICAgLy8gYWRkIGNsYXNzZXNcbiAgICAgICAgICAgICAgICAkYS5hZGRDbGFzcygnYnItc2VsZWN0ZWQgYnItY3VycmVudCcpW25leHRBbGxvclByZXZpb3VzQWxsKCldKClcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdici1zZWxlY3RlZCcpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFnZXREYXRhKCdyYXRpbmdNYWRlJykgJiYgJC5pc051bWVyaWMoaW5pdGlhbFJhdGluZykpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKChpbml0aWFsUmF0aW5nIDw9IGJhc2VWYWx1ZSkgfHwgIWYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICRhbGwgPSBzZWxmLiR3aWRnZXQuZmluZCgnYScpO1xuXG4gICAgICAgICAgICAgICAgICAgICRmcmFjdGlvbmFsID0gKCRhLmxlbmd0aCkgP1xuICAgICAgICAgICAgICAgICAgICAgICAgJGFbKGdldERhdGEoJ3VzZXJPcHRpb25zJykucmV2ZXJzZSkgPyAncHJldicgOiAnbmV4dCddKCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgJGFsbFsoZ2V0RGF0YSgndXNlck9wdGlvbnMnKS5yZXZlcnNlKSA/ICdsYXN0JyA6ICdmaXJzdCddKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgJGZyYWN0aW9uYWwuYWRkQ2xhc3MoJ2JyLWZyYWN0aW9uYWwnKTtcbiAgICAgICAgICAgICAgICAgICAgJGZyYWN0aW9uYWwuYWRkQ2xhc3MoJ2JyLWZyYWN0aW9uYWwtJyArIGYpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIHRoZSBlbGVtZW50IGlzIGRlc2VsZWN0YWJsZT9cbiAgICAgICAgICAgIHZhciBpc0Rlc2VsZWN0YWJsZSA9IGZ1bmN0aW9uKCRlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgaWYgKCFnZXREYXRhKCdhbGxvd0VtcHR5JykgfHwgIWdldERhdGEoJ3VzZXJPcHRpb25zJykuZGVzZWxlY3RhYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKHJhdGluZ1ZhbHVlKCkgPT0gJGVsZW1lbnQuYXR0cignZGF0YS1yYXRpbmctdmFsdWUnKSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBoYW5kbGUgY2xpY2sgZXZlbnRzXG4gICAgICAgICAgICB2YXIgYXR0YWNoQ2xpY2tIYW5kbGVyID0gZnVuY3Rpb24oJGVsZW1lbnRzKSB7XG4gICAgICAgICAgICAgICAgJGVsZW1lbnRzLm9uKCdjbGljay5iYXJyYXRpbmcnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgJGEgPSAkKHRoaXMpLFxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucyA9IGdldERhdGEoJ3VzZXJPcHRpb25zJyksXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ7XG5cbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9ICRhLmF0dHIoJ2RhdGEtcmF0aW5nLXZhbHVlJyk7XG4gICAgICAgICAgICAgICAgICAgIHRleHQgPSAkYS5hdHRyKCdkYXRhLXJhdGluZy10ZXh0Jyk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gaXMgY3VycmVudCBhbmQgZGVzZWxlY3RhYmxlP1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNEZXNlbGVjdGFibGUoJGEpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGdldERhdGEoJ2VtcHR5UmF0aW5nVmFsdWUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQgPSBnZXREYXRhKCdlbXB0eVJhdGluZ1RleHQnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlbWVtYmVyIHNlbGVjdGVkIHJhdGluZ1xuICAgICAgICAgICAgICAgICAgICBzZXREYXRhKCdyYXRpbmdWYWx1ZScsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgc2V0RGF0YSgncmF0aW5nVGV4dCcsIHRleHQpO1xuICAgICAgICAgICAgICAgICAgICBzZXREYXRhKCdyYXRpbmdNYWRlJywgdHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgc2V0U2VsZWN0RmllbGRWYWx1ZSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHNob3dTZWxlY3RlZFJhdGluZyh0ZXh0KTtcblxuICAgICAgICAgICAgICAgICAgICBhcHBseVN0eWxlKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gb25TZWxlY3QgY2FsbGJhY2tcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5vblNlbGVjdC5jYWxsKFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZixcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhdGluZ1ZhbHVlKCksXG4gICAgICAgICAgICAgICAgICAgICAgICByYXRpbmdUZXh0KCksXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudFxuICAgICAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIGhhbmRsZSBtb3VzZWVudGVyIGV2ZW50c1xuICAgICAgICAgICAgdmFyIGF0dGFjaE1vdXNlRW50ZXJIYW5kbGVyID0gZnVuY3Rpb24oJGVsZW1lbnRzKSB7XG4gICAgICAgICAgICAgICAgJGVsZW1lbnRzLm9uKCdtb3VzZWVudGVyLmJhcnJhdGluZycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgJGEgPSAkKHRoaXMpO1xuXG4gICAgICAgICAgICAgICAgICAgIHJlc2V0U3R5bGUoKTtcblxuICAgICAgICAgICAgICAgICAgICAkYS5hZGRDbGFzcygnYnItYWN0aXZlJylbbmV4dEFsbG9yUHJldmlvdXNBbGwoKV0oKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdici1hY3RpdmUnKTtcblxuICAgICAgICAgICAgICAgICAgICBzaG93U2VsZWN0ZWRSYXRpbmcoJGEuYXR0cignZGF0YS1yYXRpbmctdGV4dCcpKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIGhhbmRsZSBtb3VzZWxlYXZlIGV2ZW50c1xuICAgICAgICAgICAgdmFyIGF0dGFjaE1vdXNlTGVhdmVIYW5kbGVyID0gZnVuY3Rpb24oJGVsZW1lbnRzKSB7XG4gICAgICAgICAgICAgICAgc2VsZi4kd2lkZ2V0Lm9uKCdtb3VzZWxlYXZlLmJhcnJhdGluZyBibHVyLmJhcnJhdGluZycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBzaG93U2VsZWN0ZWRSYXRpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgYXBwbHlTdHlsZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gc29tZXdoYXQgcHJpbWl0aXZlIHdheSB0byByZW1vdmUgMzAwbXMgY2xpY2sgZGVsYXkgb24gdG91Y2ggZGV2aWNlc1xuICAgICAgICAgICAgLy8gZm9yIGEgbW9yZSBhZHZhbmNlZCBzb2x1dGlvbiBjb25zaWRlciBzZXR0aW5nIGBmYXN0Q2xpY2tzYCBvcHRpb24gdG8gZmFsc2VcbiAgICAgICAgICAgIC8vIGFuZCB1c2luZyBhIGxpYnJhcnkgc3VjaCBhcyBmYXN0Y2xpY2sgKGh0dHBzOi8vZ2l0aHViLmNvbS9mdGxhYnMvZmFzdGNsaWNrKVxuICAgICAgICAgICAgdmFyIGZhc3RDbGlja3MgPSBmdW5jdGlvbigkZWxlbWVudHMpIHtcbiAgICAgICAgICAgICAgICAkZWxlbWVudHMub24oJ3RvdWNoc3RhcnQuYmFycmF0aW5nJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5jbGljaygpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gZGlzYWJsZSBjbGlja3NcbiAgICAgICAgICAgIHZhciBkaXNhYmxlQ2xpY2tzID0gZnVuY3Rpb24oJGVsZW1lbnRzKSB7XG4gICAgICAgICAgICAgICAgJGVsZW1lbnRzLm9uKCdjbGljay5iYXJyYXRpbmcnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdmFyIGF0dGFjaEhhbmRsZXJzID0gZnVuY3Rpb24oJGVsZW1lbnRzKSB7XG4gICAgICAgICAgICAgICAgLy8gYXR0YWNoIGNsaWNrIGV2ZW50IGhhbmRsZXJcbiAgICAgICAgICAgICAgICBhdHRhY2hDbGlja0hhbmRsZXIoJGVsZW1lbnRzKTtcblxuICAgICAgICAgICAgICAgIGlmIChzZWxmLm9wdGlvbnMuaG92ZXJTdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBhdHRhY2ggbW91c2VlbnRlciBldmVudCBoYW5kbGVyXG4gICAgICAgICAgICAgICAgICAgIGF0dGFjaE1vdXNlRW50ZXJIYW5kbGVyKCRlbGVtZW50cyk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gYXR0YWNoIG1vdXNlbGVhdmUgZXZlbnQgaGFuZGxlclxuICAgICAgICAgICAgICAgICAgICBhdHRhY2hNb3VzZUxlYXZlSGFuZGxlcigkZWxlbWVudHMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHZhciBkZXRhY2hIYW5kbGVycyA9IGZ1bmN0aW9uKCRlbGVtZW50cykge1xuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBldmVudCBoYW5kbGVycyBpbiB0aGUgXCIuYmFycmF0aW5nXCIgbmFtZXNwYWNlXG4gICAgICAgICAgICAgICAgJGVsZW1lbnRzLm9mZignLmJhcnJhdGluZycpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdmFyIHNldHVwSGFuZGxlcnMgPSBmdW5jdGlvbihyZWFkb25seSkge1xuICAgICAgICAgICAgICAgIHZhciAkZWxlbWVudHMgPSBzZWxmLiR3aWRnZXQuZmluZCgnYScpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGZhc3RDbGlja3MpIHtcbiAgICAgICAgICAgICAgICAgICAgZmFzdENsaWNrcygkZWxlbWVudHMpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChyZWFkb25seSkge1xuICAgICAgICAgICAgICAgICAgICBkZXRhY2hIYW5kbGVycygkZWxlbWVudHMpO1xuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlQ2xpY2tzKCRlbGVtZW50cyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYXR0YWNoSGFuZGxlcnMoJGVsZW1lbnRzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLnNob3cgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAvLyBydW4gb25seSBvbmNlXG4gICAgICAgICAgICAgICAgaWYgKGdldERhdGEoKSkgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgLy8gd3JhcCBlbGVtZW50XG4gICAgICAgICAgICAgICAgd3JhcEVsZW1lbnQoKTtcblxuICAgICAgICAgICAgICAgIC8vIHNhdmUgZGF0YVxuICAgICAgICAgICAgICAgIHNhdmVEYXRhT25FbGVtZW50KCk7XG5cbiAgICAgICAgICAgICAgICAvLyBidWlsZCAmIGFwcGVuZCB3aWRnZXQgdG8gdGhlIERPTVxuICAgICAgICAgICAgICAgIHNlbGYuJHdpZGdldCA9IGJ1aWxkV2lkZ2V0KCk7XG4gICAgICAgICAgICAgICAgc2VsZi4kd2lkZ2V0Lmluc2VydEFmdGVyKHNlbGYuJGVsZW0pO1xuXG4gICAgICAgICAgICAgICAgYXBwbHlTdHlsZSgpO1xuXG4gICAgICAgICAgICAgICAgc2hvd1NlbGVjdGVkUmF0aW5nKCk7XG5cbiAgICAgICAgICAgICAgICBzZXR1cEhhbmRsZXJzKHNlbGYub3B0aW9ucy5yZWFkb25seSk7XG5cbiAgICAgICAgICAgICAgICAvLyBoaWRlIHRoZSBzZWxlY3QgZmllbGRcbiAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLmhpZGUoKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMucmVhZG9ubHkgPSBmdW5jdGlvbihzdGF0ZSkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygc3RhdGUgIT09ICdib29sZWFuJyB8fCBnZXREYXRhKCdyZWFkT25seScpID09IHN0YXRlKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICBzZXR1cEhhbmRsZXJzKHN0YXRlKTtcbiAgICAgICAgICAgICAgICBzZXREYXRhKCdyZWFkT25seScsIHN0YXRlKTtcbiAgICAgICAgICAgICAgICBzZWxmLiR3aWRnZXQudG9nZ2xlQ2xhc3MoJ2JyLXJlYWRvbmx5Jyk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLnNldCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSBnZXREYXRhKCd1c2VyT3B0aW9ucycpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuJGVsZW0uZmluZCgnb3B0aW9uW3ZhbHVlPVwiJyArIHZhbHVlICsgJ1wiXScpLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgLy8gc2V0IGRhdGFcbiAgICAgICAgICAgICAgICBzZXREYXRhKCdyYXRpbmdWYWx1ZScsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICBzZXREYXRhKCdyYXRpbmdUZXh0Jywgc2VsZi4kZWxlbS5maW5kKCdvcHRpb25bdmFsdWU9XCInICsgdmFsdWUgKyAnXCJdJykudGV4dCgpKTtcbiAgICAgICAgICAgICAgICBzZXREYXRhKCdyYXRpbmdNYWRlJywgdHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICBzZXRTZWxlY3RGaWVsZFZhbHVlKHJhdGluZ1ZhbHVlKCkpO1xuICAgICAgICAgICAgICAgIHNob3dTZWxlY3RlZFJhdGluZyhyYXRpbmdUZXh0KCkpO1xuXG4gICAgICAgICAgICAgICAgYXBwbHlTdHlsZSgpO1xuXG4gICAgICAgICAgICAgICAgLy8gb25TZWxlY3QgY2FsbGJhY2tcbiAgICAgICAgICAgICAgICBpZiAoIW9wdGlvbnMuc2lsZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMub25TZWxlY3QuY2FsbChcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMsXG4gICAgICAgICAgICAgICAgICAgICAgICByYXRpbmdWYWx1ZSgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmF0aW5nVGV4dCgpXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy5jbGVhciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBvcHRpb25zID0gZ2V0RGF0YSgndXNlck9wdGlvbnMnKTtcblxuICAgICAgICAgICAgICAgIC8vIHJlc3RvcmUgb3JpZ2luYWwgZGF0YVxuICAgICAgICAgICAgICAgIHNldERhdGEoJ3JhdGluZ1ZhbHVlJywgZ2V0RGF0YSgnb3JpZ2luYWxSYXRpbmdWYWx1ZScpKTtcbiAgICAgICAgICAgICAgICBzZXREYXRhKCdyYXRpbmdUZXh0JywgZ2V0RGF0YSgnb3JpZ2luYWxSYXRpbmdUZXh0JykpO1xuICAgICAgICAgICAgICAgIHNldERhdGEoJ3JhdGluZ01hZGUnLCBmYWxzZSk7XG5cbiAgICAgICAgICAgICAgICByZXNldFNlbGVjdEZpZWxkKCk7XG4gICAgICAgICAgICAgICAgc2hvd1NlbGVjdGVkUmF0aW5nKHJhdGluZ1RleHQoKSk7XG5cbiAgICAgICAgICAgICAgICBhcHBseVN0eWxlKCk7XG5cbiAgICAgICAgICAgICAgICAvLyBvbkNsZWFyIGNhbGxiYWNrXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5vbkNsZWFyLmNhbGwoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMsXG4gICAgICAgICAgICAgICAgICAgIHJhdGluZ1ZhbHVlKCksXG4gICAgICAgICAgICAgICAgICAgIHJhdGluZ1RleHQoKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3kgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSByYXRpbmdWYWx1ZSgpO1xuICAgICAgICAgICAgICAgIHZhciB0ZXh0ID0gcmF0aW5nVGV4dCgpO1xuICAgICAgICAgICAgICAgIHZhciBvcHRpb25zID0gZ2V0RGF0YSgndXNlck9wdGlvbnMnKTtcblxuICAgICAgICAgICAgICAgIC8vIGRldGFjaCBoYW5kbGVyc1xuICAgICAgICAgICAgICAgIGRldGFjaEhhbmRsZXJzKHNlbGYuJHdpZGdldC5maW5kKCdhJykpO1xuXG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIHdpZGdldFxuICAgICAgICAgICAgICAgIHNlbGYuJHdpZGdldC5yZW1vdmUoKTtcblxuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBkYXRhXG4gICAgICAgICAgICAgICAgcmVtb3ZlRGF0YU9uRWxlbWVudCgpO1xuXG4gICAgICAgICAgICAgICAgLy8gdW53cmFwIHRoZSBlbGVtZW50XG4gICAgICAgICAgICAgICAgdW53cmFwRWxlbWVudCgpO1xuXG4gICAgICAgICAgICAgICAgLy8gc2hvdyB0aGUgZWxlbWVudFxuICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0uc2hvdygpO1xuXG4gICAgICAgICAgICAgICAgLy8gb25EZXN0cm95IGNhbGxiYWNrXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5vbkRlc3Ryb3kuY2FsbChcbiAgICAgICAgICAgICAgICAgICAgdGhpcyxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIHRleHRcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIEJhclJhdGluZy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uIChvcHRpb25zLCBlbGVtKSB7XG4gICAgICAgICAgICB0aGlzLiRlbGVtID0gJChlbGVtKTtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCAkLmZuLmJhcnJhdGluZy5kZWZhdWx0cywgb3B0aW9ucyk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnM7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIEJhclJhdGluZztcbiAgICB9KSgpO1xuXG4gICAgJC5mbi5iYXJyYXRpbmcgPSBmdW5jdGlvbiAobWV0aG9kLCBvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHBsdWdpbiA9IG5ldyBCYXJSYXRpbmcoKTtcblxuICAgICAgICAgICAgLy8gcGx1Z2luIHdvcmtzIHdpdGggc2VsZWN0IGZpZWxkc1xuICAgICAgICAgICAgaWYgKCEkKHRoaXMpLmlzKCdzZWxlY3QnKSkge1xuICAgICAgICAgICAgICAgICQuZXJyb3IoJ1NvcnJ5LCB0aGlzIHBsdWdpbiBvbmx5IHdvcmtzIHdpdGggc2VsZWN0IGZpZWxkcy4nKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gbWV0aG9kIHN1cHBsaWVkXG4gICAgICAgICAgICBpZiAocGx1Z2luLmhhc093blByb3BlcnR5KG1ldGhvZCkpIHtcbiAgICAgICAgICAgICAgICBwbHVnaW4uaW5pdChvcHRpb25zLCB0aGlzKTtcbiAgICAgICAgICAgICAgICBpZiAobWV0aG9kID09PSAnc2hvdycpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBsdWdpbi5zaG93KG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHBsdWdpbiBleGlzdHM/XG4gICAgICAgICAgICAgICAgICAgIGlmIChwbHVnaW4uJGVsZW0uZGF0YSgnYmFycmF0aW5nJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsdWdpbi4kd2lkZ2V0ID0gJCh0aGlzKS5uZXh0KCcuYnItd2lkZ2V0Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGx1Z2luW21ldGhvZF0ob3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIG5vIG1ldGhvZCBzdXBwbGllZCBvciBvbmx5IG9wdGlvbnMgc3VwcGxpZWRcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG1ldGhvZCA9PT0gJ29iamVjdCcgfHwgIW1ldGhvZCkge1xuICAgICAgICAgICAgICAgIG9wdGlvbnMgPSBtZXRob2Q7XG4gICAgICAgICAgICAgICAgcGx1Z2luLmluaXQob3B0aW9ucywgdGhpcyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBsdWdpbi5zaG93KCk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJC5lcnJvcignTWV0aG9kICcgKyBtZXRob2QgKyAnIGRvZXMgbm90IGV4aXN0IG9uIGpRdWVyeS5iYXJyYXRpbmcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgICQuZm4uYmFycmF0aW5nLmRlZmF1bHRzID0ge1xuICAgICAgICB0aGVtZTonJyxcbiAgICAgICAgaW5pdGlhbFJhdGluZzpudWxsLCAvLyBpbml0aWFsIHJhdGluZ1xuICAgICAgICBhbGxvd0VtcHR5Om51bGwsIC8vIGFsbG93IGVtcHR5IHJhdGluZ3M/XG4gICAgICAgIGVtcHR5VmFsdWU6JycsIC8vIHRoaXMgaXMgdGhlIGV4cGVjdGVkIHZhbHVlIG9mIHRoZSBlbXB0eSByYXRpbmdcbiAgICAgICAgc2hvd1ZhbHVlczpmYWxzZSwgLy8gZGlzcGxheSByYXRpbmcgdmFsdWVzIG9uIHRoZSBiYXJzP1xuICAgICAgICBzaG93U2VsZWN0ZWRSYXRpbmc6dHJ1ZSwgLy8gYXBwZW5kIGEgZGl2IHdpdGggYSByYXRpbmcgdG8gdGhlIHdpZGdldD9cbiAgICAgICAgZGVzZWxlY3RhYmxlOnRydWUsIC8vIGFsbG93IHRvIGRlc2VsZWN0IHJhdGluZ3M/XG4gICAgICAgIHJldmVyc2U6ZmFsc2UsIC8vIHJldmVyc2UgdGhlIHJhdGluZz9cbiAgICAgICAgcmVhZG9ubHk6ZmFsc2UsIC8vIG1ha2UgdGhlIHJhdGluZyByZWFkeS1vbmx5P1xuICAgICAgICBmYXN0Q2xpY2tzOnRydWUsIC8vIHJlbW92ZSAzMDBtcyBjbGljayBkZWxheSBvbiB0b3VjaCBkZXZpY2VzP1xuICAgICAgICBob3ZlclN0YXRlOnRydWUsIC8vIGNoYW5nZSBzdGF0ZSBvbiBob3Zlcj9cbiAgICAgICAgc2lsZW50OmZhbHNlLCAvLyBzdXByZXNzIGNhbGxiYWNrcyB3aGVuIGNvbnRyb2xsaW5nIHJhdGluZ3MgcHJvZ3JhbWF0aWNhbGx5XG4gICAgICAgIG9uU2VsZWN0OmZ1bmN0aW9uICh2YWx1ZSwgdGV4dCwgZXZlbnQpIHtcbiAgICAgICAgfSwgLy8gY2FsbGJhY2sgZmlyZWQgd2hlbiBhIHJhdGluZyBpcyBzZWxlY3RlZFxuICAgICAgICBvbkNsZWFyOmZ1bmN0aW9uICh2YWx1ZSwgdGV4dCkge1xuICAgICAgICB9LCAvLyBjYWxsYmFjayBmaXJlZCB3aGVuIGEgcmF0aW5nIGlzIGNsZWFyZWRcbiAgICAgICAgb25EZXN0cm95OmZ1bmN0aW9uICh2YWx1ZSwgdGV4dCkge1xuICAgICAgICB9IC8vIGNhbGxiYWNrIGZpcmVkIHdoZW4gYSB3aWRnZXQgaXMgZGVzdHJveWVkXG4gICAgfTtcblxuICAgICQuZm4uYmFycmF0aW5nLkJhclJhdGluZyA9IEJhclJhdGluZztcblxufSkpO1xuIiwiLyoqXG4gKiBAcGFja2FnZSAgICBLbm93IFJlc2VydmF0aW9uc1xuICogQHN1YnBhY2thZ2UgU2l0ZSBKU1xuICogQGNvcHlyaWdodCAgMjAyMCBIaWdobGFuZCBWaXNpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBAbGljZW5zZSAgICBTZWUgdGhlIGZpbGUgXCJMSUNFTlNFLnR4dFwiIGZvciB0aGUgZnVsbCBsaWNlbnNlIGdvdmVybmluZyB0aGlzIGNvZGUuXG4gKiBAYXV0aG9yICAgICBIYXplbCBXaWxzb24gPGhhemVsQGhpZ2hsYW5kdmlzaW9uLmNvbT5cbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxubGV0IGxhbmc7XG5sZXQgc2VhcmNoZGF0YSA9IFtdO1xubGV0IHNlYXJjaERvbmUgPSBmYWxzZTtcbmxldCBjYWxlbmRhckxvYWRlZCA9IGZhbHNlO1xubGV0IHNhdmVkd2lkdGggPSBmYWxzZTtcbmxldCBsYXJnZTtcbmxldCByZXNpemVkID0gZmFsc2U7XG5cbmlmICghd2luZG93LmxvY2F0aW9uLm9yaWdpbilcbiAgICB3aW5kb3cubG9jYXRpb24ub3JpZ2luID0gd2luZG93LmxvY2F0aW9uLnByb3RvY29sICsgXCIvL1wiICsgd2luZG93LmxvY2F0aW9uLmhvc3Q7XG5jb25zdCBsaXZlc2l0ZSA9IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gKyAnLyc7XG5cbihmdW5jdGlvbiAoJCkge1xuICAgICQoZnVuY3Rpb24gKCkge1xuICAgICAgICBGb3VuZGF0aW9uLmFkZFRvSnF1ZXJ5KCk7XG4gICAgICAgICQoZG9jdW1lbnQpLmZvdW5kYXRpb24oKTtcbiAgICAgICAgbGFuZyA9ICQoJyNrci1sYW5nJykuZGF0YSgna3JsYW5nJyk7XG5cbiAgICAgICAgY2hlY2tTY3JlZW5XaWR0aCgpO1xuICAgICAgICAkKHdpbmRvdykub24oXCJyZXNpemVcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY2hlY2tTY3JlZW5XaWR0aCgpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGJhcnMgPSAkKCcua3ItcmF0aW5nJyk7XG4gICAgICAgIGlmIChiYXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgYmFycy5iYXJyYXRpbmcoJ3Nob3cnLCB7XG4gICAgICAgICAgICAgICAgc2hvd1ZhbHVlczogdHJ1ZSxcbiAgICAgICAgICAgICAgICBzaG93U2VsZWN0ZWRSYXRpbmc6IGZhbHNlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdzdWJtaXQnLCAnLmFqYXhmb3JtJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGNvbnN0ICRmb3JtID0gJCh0aGlzKTtcbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICAgICAgICAgIHVybDogJGZvcm0uYXR0cignYWN0aW9uJykgKyAnJmxhbmc9JyArIGxhbmcsXG4gICAgICAgICAgICAgICAgZGF0YTogJGZvcm0uc2VyaWFsaXplKCksXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5kYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybVJlc3BvbnNlKCRmb3JtLmF0dHIoJ2lkJyksIHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBsaXZlc2l0ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5rci1hamF4LW1vZGFsLWVycm9yLW1lc3NhZ2UnKS5odG1sKHJlc3VsdC5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0ICRtb2RhbCA9IG5ldyBGb3VuZGF0aW9uLlJldmVhbCgkKCcjS3JBamF4TW9kYWxFcnJvcicpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRtb2RhbC5vcGVuKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICQoJy5rci1hamF4LW1vZGFsLWVycm9yLW1lc3NhZ2UnKS5odG1sKCdTb3JyeSBhbiBlcnJvciBoYXMgb2NjdXJyZWQsIHBsZWFzZSB0cnkgYWdhaW4nKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgJG1vZGFsID0gbmV3IEZvdW5kYXRpb24uUmV2ZWFsKCQoJyNLckFqYXhNb2RhbEVycm9yJykpO1xuICAgICAgICAgICAgICAgICAgICAkbW9kYWwub3BlbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KS5vbignc2hvdy56Zi5kcm9wZG93bicsICcja3Itc2VhcmNocmVnaW9uLWRyb3AnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKFwiI2tyLXNlYXJjaHJlZ2lvbi1kcm9wXCIpLmNzcygnb3BhY2l0eScsICcxJyk7XG4gICAgICAgIH0pLm9uKCdzaG93LnpmLmRyb3Bkb3duJywgJyNrci1zZWFyY2hndWVzdC1kcm9wJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJCgnI2tyLXNlYXJjaGd1ZXN0LWRyb3AnKS5jc3MoJ29wYWNpdHknLCAnMScpO1xuICAgICAgICB9KS5vbignaGlkZS56Zi5kcm9wZG93bicsICcja3Itc2VhcmNocmVnaW9uLWRyb3AsICNrci1zZWFyY2hndWVzdC1kcm9wJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJCgnYm9keScpLmNzcygnb3BhY2l0eScsICcxJyk7XG4gICAgICAgIH0pLm9uKCdoaWRlLnpmLmRyb3Bkb3duJywgJyNrci1xdW90ZS1mb3JtJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJCgnI2d1ZXN0cycpLnRyaWdnZXIoJ2NoYW5nZScpO1xuICAgICAgICB9KS5vbignb3Blbi56Zi5yZXZlYWwnLCAnLmtyLWFqYXgtbW9kYWxbZGF0YS1yZXZlYWxdJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGNvbnN0IG1vZGFsaWQgPSBcIiNcIiArICQodGhpcykuYXR0cignaWQnKTtcbiAgICAgICAgICAgIGlmICghJC50cmltKCQobW9kYWxpZCkuaHRtbCgpKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBhamF4dXJsID0gJCh0aGlzKS5kYXRhKCdhamF4dXJsJyk7XG4gICAgICAgICAgICAgICAgaWYgKGFqYXh1cmwpIHtcbiAgICAgICAgICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogYWpheHVybCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChjb250ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChtb2RhbGlkKS5odG1sKGNvbnRlbnQpLnRyaWdnZXIoJ3Jlc2l6ZW1lLnpmLnJldmVhbCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQobW9kYWxpZCkuZm91bmRhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLm9uKCdjbGljaycsICcuZmF2c3BhbicsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjb25zdCAkdGhpcyA9ICQodGhpcyk7XG4gICAgICAgICAgICBjb25zdCBwaWQgPSAkdGhpcy5kYXRhKCdwcm9wZXJ0eScpO1xuICAgICAgICAgICAgY29uc3Qga3Jwcm9wZXJ0eSA9ICcja3ItcHJvcGVydHktJyArIHBpZDtcblxuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgdXJsOiAnaW5kZXgucGhwP29wdGlvbj1jb21fa25vd3JlcyZ0YXNrPXByb3BlcnRpZXMuZmF2b3VyaXRlJmxhbmc9JyArIGxhbmcsXG4gICAgICAgICAgICAgICAgZGF0YTogeydwcm9wZXJ0eV9pZCc6IHBpZCwgJ3ZpZXcnOiAkdGhpcy5kYXRhKCd2aWV3Jyl9LFxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuZGF0YS5hY3Rpb24gPT09ICdoaWRlbWUnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IFwiI1wiICsgJHRoaXMuZmluZCgnLmhhcy10aXAnKS5kYXRhKCd0b2dnbGUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKGVsZW1lbnQpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoa3Jwcm9wZXJ0eSkuZmFkZU91dCgxMjAwLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChrcnByb3BlcnR5KS5wYXJlbnQoKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlc3VsdC5kYXRhLmFjdGlvbiAhPT0gJ25vbmUnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgJHRhcmdldCA9ICR0aGlzLmZpbmQoJ2kuZmEtaGVhcnQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkdGFyZ2V0LnRvZ2dsZUNsYXNzKCdpbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbDEgPSAnIycgKyAkdGFyZ2V0LmRhdGEoJ3RvZ2dsZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodmFsMSkudGV4dChyZXN1bHQuZGF0YS5hY3Rpb24pLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KS5vbignY2xpY2snLCAnLmdldFJlc3BvbnNlU2VhcmNoJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGdldFByb3BlcnRpZXMoJCh0aGlzKS5kYXRhKCdmaWVsZCcpLCAkKHRoaXMpLmRhdGEoJ3ZhbHVlJykpO1xuICAgICAgICB9KS5vbignY2xpY2snLCAnLmtyLWZpbHRlcnMtY2xvc2UnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgJCgnLmtyLWZpbHRlcnMudG9wJykuYWRkQ2xhc3MoJ2hpZGVtZScpO1xuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgIH0pLm9uKCdjbGljaycsICcua3ItZmlsdGVycyB1bC5maWx0ZXItc29ydC1saXN0IGxpLmhlYWQnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5jaGlsZHJlbignbGkuY2hlY2tib3gnKS50b2dnbGUoKTtcbiAgICAgICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICB9KS5vbignY2xpY2snLCAnI3Nob3dnYXRld2F5cycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAkKCcja3ItZ2F0ZXdheXMnKS50b2dnbGVDbGFzcygnaGlkZW1lJyk7XG4gICAgICAgIH0pLm9uKCdjbGljaycsICcua3Itc2VhcmNoYmFyIC5idXR0b24nLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgc2V0QWN0aXZlTWVudSgkKHRoaXMpLmRhdGEoJ3ZhbHVlJykpO1xuICAgICAgICB9KS5vbignY2xpY2snLCAnI2tyLXNob3ctc29ydGJ5JywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICQoJy5rci1maWx0ZXJzLnRvcCcpLmFkZENsYXNzKCdoaWRlbWUnKTtcbiAgICAgICAgICAgICQoJy5rci1zb3J0YnkudG9wJykudG9nZ2xlQ2xhc3MoJ2hpZGVtZScpO1xuICAgICAgICAgICAgc2V0QWN0aXZlTWVudSgnc29ydCcpO1xuICAgICAgICB9KS5vbignY2xpY2snLCAnI2tyLXNob3ctZmlsdGVyYnknLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgJCgnLmtyLXNvcnRieS50b3AnKS5hZGRDbGFzcygnaGlkZW1lJyk7XG4gICAgICAgICAgICAkKCcua3ItZmlsdGVycy50b3AnKS50b2dnbGVDbGFzcygnaGlkZW1lJyk7XG4gICAgICAgICAgICBzZXRBY3RpdmVNZW51KCdmaWx0ZXInKTtcbiAgICAgICAgfSkub24oJ2NsaWNrJywgJy5rci1maWx0ZXJzLWNsb3NlJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICQoJy5rci1maWx0ZXJzLnRvcCcpLmFkZENsYXNzKCdoaWRlbWUnKTtcbiAgICAgICAgICAgIHNldEFjdGl2ZU1lbnUoJ2xpc3QnKTtcbiAgICAgICAgfSkub24oJ2NsaWNrJywgJy50b2dnbGVvdGhlcicsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAkKHRoaXMpLmRhdGEoJ290aGVyJykudG9nZ2xlKCk7XG4gICAgICAgIH0pLm9uKCdjbGljaycsICcja3ItcHJvcGVydHktdGFicyBhW2hyZWY9XCIjY2FsZW5kYXJcIl0nLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgaWYgKCFjYWxlbmRhckxvYWRlZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBpZCA9ICQodGhpcykuZGF0YSgncGlkJyk7XG4gICAgICAgICAgICAgICAgbG9hZENhbGVuZGFyKHBpZCk7XG4gICAgICAgICAgICAgICAgY2FsZW5kYXJMb2FkZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoJCgnLmtyLXByb3BlcnRpZXMnKS5sZW5ndGggJiYgIXNlYXJjaERvbmUpIHtcbiAgICAgICAgICAgIGdldFByb3BlcnRpZXMoJ3ZpZXcnLCAkKHRoaXMpLmRhdGEoJ3ZpZXcnKSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgJHRhYnMgPSAkKCcudGFicycpO1xuICAgICAgICBpZiAoJCgnI2tyLXByb3BlcnR5LXRhYnMnKS5sZW5ndGggJiYgIWNhbGVuZGFyTG9hZGVkKSB7XG4gICAgICAgICAgICAkdGFicy5maW5kKCdhJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykuYXR0cignaHJlZicpID09PSBcIiNjYWxlbmRhclwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBpZCA9ICQodGhpcykuZGF0YSgncGlkJyk7XG4gICAgICAgICAgICAgICAgICAgIGxvYWRDYWxlbmRhcihwaWQpO1xuICAgICAgICAgICAgICAgICAgICBjYWxlbmRhckxvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgICQuZXZlbnQuc3BlY2lhbC50b3VjaHN0YXJ0ID0ge1xuICAgICAgICBzZXR1cDogZnVuY3Rpb24gKF8sIG5zLCBoYW5kbGUpIHtcbiAgICAgICAgICAgIGlmIChucy5pbmNsdWRlcyhcIm5vUHJldmVudERlZmF1bHRcIikpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIGhhbmRsZSwge3Bhc3NpdmU6IGZhbHNlfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgaGFuZGxlLCB7cGFzc2l2ZTogdHJ1ZX0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICAkLmV2ZW50LnNwZWNpYWwudG91Y2htb3ZlID0ge1xuICAgICAgICBzZXR1cDogZnVuY3Rpb24gKF8sIG5zLCBoYW5kbGUpIHtcbiAgICAgICAgICAgIGlmIChucy5pbmNsdWRlcyhcIm5vUHJldmVudERlZmF1bHRcIikpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIiwgaGFuZGxlLCB7cGFzc2l2ZTogZmFsc2V9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsIGhhbmRsZSwge3Bhc3NpdmU6IHRydWV9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBsb2FkQ2FsZW5kYXIocGlkKSB7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgICAgICB1cmw6IGxpdmVzaXRlICsgJ2luZGV4LnBocD9vcHRpb249Y29tX2tub3dyZXMmdGFzaz1wcm9wZXJ0eS5nZXJpYXRyaWMmbGFuZz0nICsgbGFuZyxcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnaHRtbCcsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgJ3BpZCc6IHBpZFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgJCgnI2NhbGVuZGFyLnRhYnMtcGFuZWwnKS5hcHBlbmQoZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZvcm1SZXNwb25zZShpZCwgZGF0YSkge1xuICAgICAgICBpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eSgncmVkaXJlY3QnKSkge1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2UoZGF0YS5yZWRpcmVjdCk7XG4gICAgICAgIH0gZWxzZSBpZiAoaWQgPT09ICdrci1mb3JtLXBheW1lbnQnKSB7XG4gICAgICAgICAgICBpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eSgnaHRtbCcpKSB7XG4gICAgICAgICAgICAgICAgbGV0ICRtb2RhbCA9ICQoJyNrci1nYXRld2F5LW1vZGFsJyk7XG4gICAgICAgICAgICAgICAgJG1vZGFsLmh0bWwoZGF0YS5odG1sKS50cmlnZ2VyKCdyZXNpemVtZS56Zi5yZXZlYWwnKTtcbiAgICAgICAgICAgICAgICAkbW9kYWwuZm91bmRhdGlvbignb3BlbicpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGxpdmVzaXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGlkID09PSAna3ItZm9ybS1tYWlsY2hpbXAnKSB7XG4gICAgICAgICAgICAkKCcjcmVzcG9uc2UyJykuaHRtbChkYXRhKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFByb3BlcnRpZXMoZmllbGQsIHZhbHVlKSB7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGxpdmVzaXRlICsgJ2luZGV4LnBocD9vcHRpb249Y29tX2tub3dyZXMmdmlldz1wcm9wZXJ0aWVzJmZvcm1hdD1yYXcmbGFuZz0nICsgbGFuZyxcbiAgICAgICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgICAgIGRhdGE6IHsnZmllbGQnOiBmaWVsZCwgJ3ZhbHVlJzogdmFsdWV9LFxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgc2VhcmNoZGF0YSA9IGRhdGE7XG4gICAgICAgICAgICAgICAgaWYgKCFzZWFyY2hkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIG5vaW5zcGVjdGlvbiBPdmVybHlDb21wbGV4Qm9vbGVhbkV4cHJlc3Npb25KU1xuICAgICAgICAgICAgICAgIGlmIChmaWVsZCA9PT0gJ29yZGVyJyB8fCBmaWVsZCA9PT0gJ3ZpZXcnIHx8IGZpZWxkID09PSAnZmF2cycgfHwgZmllbGQgPT09ICdtYXAnKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldEFjdGl2ZU1lbnUoc2VhcmNoZGF0YVsndmlldyddKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBzZXRTZWFyY2hEYXRhKHNlYXJjaGRhdGEsIGZpZWxkKTtcbiAgICAgICAgICAgICAgICAkKCcuaGFzLXRpcCcpLmZvdW5kYXRpb24oKTtcbiAgICAgICAgICAgICAgICAkKCcuZHJvcGRvd24tcGFuZScpLmZvdW5kYXRpb24oKTtcbiAgICAgICAgICAgICAgICAkKCcua3ItcHJvcGVydHkgLmNhcmQnKS5mb3VuZGF0aW9uKCk7XG4gICAgICAgICAgICAgICAgJCgnI2tyLW9yZGVyLWNsb3NlJykudHJpZ2dlcignY2xpY2snKTtcbiAgICAgICAgICAgICAgICBzZWFyY2hEb25lID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0U2VhcmNoRGF0YShyZXNwb25zZSwgZmllbGQgPSAnJykge1xuICAgICAgICBpZiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICQoJyNrci1wcm9wZXJ0aWVzLWRhdGEnKS5lbXB0eSgpLmZhZGVJbignc2xvdycpLmh0bWwocmVzcG9uc2VbJ2l0ZW1zJ10pLmZvdW5kYXRpb24oKTtcbiAgICAgICAgICAgICQoJy5rci1wYWdlcicpLmh0bWwocmVzcG9uc2VbJ3BhZ2luYXRpb24nXSk7XG4gICAgICAgICAgICAkKFwiI2tyLXByb3BlcnRpZXMtZmlsdGVycy1vZmYtY2FudmFzXCIpLmh0bWwocmVzcG9uc2VbJ2ZpbHRlcnMnXSk7XG4gICAgICAgICAgICAkKFwiI2tyLXByb3BlcnRpZXMtc29ydGJ5LW9mZi1jYW52YXNcIikuaHRtbChyZXNwb25zZVsnc29ydGJ5J10pO1xuICAgICAgICAgICAgJChcIiNrci1wcm9wZXJ0aWVzLXNlYXJjaC1vZmYtY2FudmFzXCIpLmh0bWwocmVzcG9uc2VbJ3NlYXJjaCddKTtcblxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlWydzZWFyY2gnXS5sZW5ndGggJiYgJCgnI2Fycml2YWxkc3AnKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAkKCdib2R5JykudHJpZ2dlcignaW5pdGFqYXhzZWFyY2gnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJCgnLnNpZGViYXIgLmtyLWZpbHRlcnMgdWwuZmlsdGVyLXNvcnQtbGlzdCBsaS5oZWFkJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XG4gICAgICAgICAgICAgICAgICAgICQodGhpcykucGFyZW50KCkuY2hpbGRyZW4oJ2xpLmNoZWNrYm94Jykuc2hvdygpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICQodGhpcykucGFyZW50KCkuY2hpbGRyZW4oJ2xpLmNoZWNrYm94JykuaGlkZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAoZmllbGQgPT09ICdwYWdlJykge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldEFjdGl2ZU1lbnUodmFsdWUpIHtcbiAgICAgICAgY29uc3QgYmFyID0gJCgnLmtyLXNlYXJjaGJhcicpLmZpbmQoJy5idXR0b24nKTtcbiAgICAgICAgJC5lYWNoKGJhciwgZnVuY3Rpb24gKGluZGV4LCBiYXIpIHtcbiAgICAgICAgICAgICQoYmFyKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgIH0pO1xuICAgICAgICAkKCAnLmtyLXNlYXJjaGJhciAuYnV0dG9uLicgKyB2YWx1ZSkuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgIH1cblxuICAgIC8vIFJldHVybiB0cnVlIGlmIHdpZHRoIGhhcyBjaGFuZ2VkXG4gICAgZnVuY3Rpb24gc2NyZWVuV2lkdGhIYXNDaGFuZ2VkKCkge1xuICAgICAgICBsYXJnZSA9IEZvdW5kYXRpb24uTWVkaWFRdWVyeS5hdExlYXN0KCdsYXJnZScpO1xuICAgICAgICBpZiAobGFyZ2UgIT09IHNhdmVkd2lkdGgpIHtcbiAgICAgICAgICAgIHNhdmVkd2lkdGggPSBsYXJnZTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2VcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVja1NjcmVlbldpZHRoKCkge1xuICAgICAgICByZXNpemVkID0gZmFsc2U7XG4gICAgICAgIGlmIChzY3JlZW5XaWR0aEhhc0NoYW5nZWQoKSAmJiBzZWFyY2hkYXRhWydpdGVtcyddICYmICFyZXNpemVkKSB7XG4gICAgICAgICAgICBzZXRTZWFyY2hEYXRhKHNlYXJjaGRhdGEpO1xuICAgICAgICAgICAgcmVzaXplZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAkLmV2ZW50LnNwZWNpYWwudG91Y2hzdGFydCA9IHtcbiAgICAgICAgc2V0dXA6IGZ1bmN0aW9uIChfLCBucywgaGFuZGxlKSB7XG4gICAgICAgICAgICBpZiAobnMuaW5jbHVkZXMoXCJub1ByZXZlbnREZWZhdWx0XCIpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCBoYW5kbGUsIHtwYXNzaXZlOiBmYWxzZX0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIGhhbmRsZSwge3Bhc3NpdmU6IHRydWV9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgJC5ldmVudC5zcGVjaWFsLnRvdWNobW92ZSA9IHtcbiAgICAgICAgc2V0dXA6IGZ1bmN0aW9uIChfLCBucywgaGFuZGxlKSB7XG4gICAgICAgICAgICBpZiAobnMuaW5jbHVkZXMoXCJub1ByZXZlbnREZWZhdWx0XCIpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsIGhhbmRsZSwge3Bhc3NpdmU6IGZhbHNlfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLCBoYW5kbGUsIHtwYXNzaXZlOiB0cnVlfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xufShqUXVlcnkpKTsiLCIvKipcbiAqIEBwYWNrYWdlICAgIEtub3cgUmVzZXJ2YXRpb25zXG4gKiBAc3VicGFja2FnZSBTaXRlIEpTXG4gKiBAY29weXJpZ2h0ICAyMDIwIEhpZ2hsYW5kIFZpc2lvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIEBsaWNlbnNlICAgIFNlZSB0aGUgZmlsZSBcIkxJQ0VOU0UudHh0XCIgZm9yIHRoZSBmdWxsIGxpY2Vuc2UgZ292ZXJuaW5nIHRoaXMgY29kZS5cbiAqIEBhdXRob3IgICAgIEhhemVsIFdpbHNvbiA8aGF6ZWxAaGlnaGxhbmR2aXNpb24uY29tPlxuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24gKCQpIHtcblx0aWYgKCF3aW5kb3cubG9jYXRpb24ub3JpZ2luKVxuXHRcdHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gPSB3aW5kb3cubG9jYXRpb24ucHJvdG9jb2wgKyBcIi8vXCIgKyB3aW5kb3cubG9jYXRpb24uaG9zdDtcblxuXHRsZXQgbGFuZyA9ICQoXCIja3ItbGFuZ1wiKS5kYXRhKCdrcmxhbmcnKTtcblx0bGV0IG15Q29uZmlybSwgJG15VGFzaztcblxuXHRjbGFzcyBLcmNvbmZpcm0ge1xuXHRcdGNvbnN0cnVjdG9yKCRmb3JtKSB7XG5cdFx0XHR0aGlzLmZvcm0gPSAkZm9ybTtcblx0XHRcdHRoaXMuaW5pdCgpO1xuXHRcdH1cblxuXHRcdGluaXQoKSB7XG5cdFx0XHR0aGlzLnVwZGF0ZVF1b3RlKHRoaXMuZm9ybSk7XG5cdFx0fVxuXG5cdFx0dXBkYXRlUXVvdGUoJGZvcm0pIHtcblx0XHRcdCRteVRhc2sgPSAkKCcjbXl0YXNrJyk7XG5cdFx0XHQkbXlUYXNrLnZhbCgnY29uZmlybS5jb21wdXRlJyk7XG5cdFx0XHRqUXVlcnkuYWpheCh7XG5cdFx0XHRcdHR5cGU6ICAgICAnUE9TVCcsXG5cdFx0XHRcdHVybDogICAgICAnaW5kZXgucGhwP29wdGlvbj1jb21fa25vd3JlcyZ0YXNrPWNvbmZpcm0uY29tcHV0ZSZsYW5nPScgKyBsYW5nLFxuXHRcdFx0XHRkYXRhOiAgICAgJGZvcm0uc2VyaWFsaXplQXJyYXkoKSxcblx0XHRcdFx0ZGF0YVR5cGU6ICdqc29uJyxcblx0XHRcdFx0c3VjY2VzczogIGZ1bmN0aW9uIChyZXN1bHQpIHtcblx0XHRcdFx0XHQkbXlUYXNrLnZhbCgnY29uZmlybS5wYXltZW50Jyk7XG5cdFx0XHRcdFx0aWYgKHJlc3VsdC5zdWNjZXNzKSB7XG5cdFx0XHRcdFx0XHRjb25zdCBkYXRhID0gcmVzdWx0LmRhdGE7XG5cdFx0XHRcdFx0XHRpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eSgncmVkaXJlY3QnKSkge1xuXHRcdFx0XHRcdFx0XHR3aW5kb3cubG9jYXRpb24ucmVwbGFjZShkYXRhLnJlZGlyZWN0KTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGxldCBkaXY7XG5cdFx0XHRcdFx0XHQkLmVhY2gocmVzdWx0LmRhdGEucmVzcG9uc2UsIGZ1bmN0aW9uIChrZXksIHZhbCkge1xuXHRcdFx0XHRcdFx0XHQkKCcuaGlkZWluaXRpYWwnKS5zaG93KCk7XG5cdFx0XHRcdFx0XHRcdGRpdiA9IFwiI1wiICsga2V5O1xuXHRcdFx0XHRcdFx0XHQkKGRpdikudGV4dCh2YWwpO1xuXHRcdFx0XHRcdFx0XHQkKGRpdikuaHRtbCh2YWwpO1xuXHRcdFx0XHRcdFx0XHQkKGRpdikudmFsKHZhbCk7XG5cdFx0XHRcdFx0XHRcdCQoZGl2KS5zaG93KCk7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0JCgnLmtyLWFqYXgtbW9kYWwtZXJyb3ItbWVzc2FnZScpLmh0bWwocmVzdWx0Lm1lc3NhZ2UpO1xuXHRcdFx0XHRcdFx0Y29uc3QgJG1vZGFsID0gbmV3IEZvdW5kYXRpb24uUmV2ZWFsKCQoJyNLckFqYXhNb2RhbEVycm9yJykpO1xuXHRcdFx0XHRcdFx0JG1vZGFsLm9wZW4oKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdCQoZnVuY3Rpb24gKCkge1xuXHRcdGxldCAkZWxlbWVudCA9ICQoJyNrci1mb3JtLWNvbmZpcm0nKTtcblx0XHRpZiAoJGVsZW1lbnQubGVuZ3RoKSB7XG5cdFx0XHRteUNvbmZpcm0gPSBuZXcgS3Jjb25maXJtKCRlbGVtZW50KTtcblx0XHR9XG5cdFx0JGVsZW1lbnQub24oJ2NoYW5nZSBjbGljaycsICcua3ItY2FsY3VsYXRlJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdCRlbGVtZW50ID0gJCgnI2tyLWZvcm0tY29uZmlybScpO1xuXHRcdFx0bXlDb25maXJtLnVwZGF0ZVF1b3RlKCRlbGVtZW50KTtcblx0XHR9KTtcblxuXHRcdCQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcjY2hlY2t0ZXJtcycsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRpZiAoY2hlY2tUZXJtcygpKSB7XG5cdFx0XHRcdCQoJyNjaGVja3Rlcm1zJykudHJpZ2dlcignc3VibWl0Jyk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0pO1xuXG5cdC8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuXHRmdW5jdGlvbiBjaGVja1Rlcm1zKCkge1xuXHRcdGxldCByZXN1bHQgPSB0cnVlO1xuXHRcdGNvbnN0IHRlc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWdyZWVjaGVjaycpO1xuXHRcdGNvbnN0IHRlc3RjID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FncmVlY2hlY2tjJyk7XG5cdFx0Y29uc3QgdGVzdHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWdyZWVjaGVja3QnKTtcblxuXHRcdC8vIG5vaW5zcGVjdGlvbiBKU1VucmVzb2x2ZWRWYXJpYWJsZVxuXHRcdGlmICh0ZXN0ICYmICFkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgna3ItZm9ybS1wYXltZW50JykuYWdyZWVjaGVjay5jaGVja2VkKSB7XG5cdFx0XHRyZXN1bHQgPSBmYWxzZTtcblx0XHR9XG5cdFx0Ly8gbm9pbnNwZWN0aW9uIEpTVW5yZXNvbHZlZFZhcmlhYmxlXG5cdFx0aWYgKHRlc3RjICYmICFkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgna3ItZm9ybS1wYXltZW50JykuYWdyZWVjaGVja2MuY2hlY2tlZCkge1xuXHRcdFx0cmVzdWx0ID0gZmFsc2U7XG5cdFx0fVxuXHRcdC8vIG5vaW5zcGVjdGlvbiBKU1VucmVzb2x2ZWRWYXJpYWJsZVxuXHRcdGlmICh0ZXN0dCAmJiAhZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2tyLWZvcm0tcGF5bWVudCcpLmFncmVlY2hlY2t0LmNoZWNrZWQpIHtcblx0XHRcdHJlc3VsdCA9IGZhbHNlO1xuXHRcdH1cblxuXHRcdGlmIChyZXN1bHQpIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zdCAkbW9kYWwgPSBuZXcgRm91bmRhdGlvbi5SZXZlYWwoJCgnI2Vycm9yTW9kYWwnKSk7XG5cdFx0XHQkbW9kYWwub3BlbigpO1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0fVxufShqUXVlcnkpKTsiLCIvKipcbiAqIEBwYWNrYWdlICAgIEtub3cgUmVzZXJ2YXRpb25zXG4gKiBAc3VicGFja2FnZSBTaXRlIEpTXG4gKiBAY29weXJpZ2h0ICAyMDIwIEhpZ2hsYW5kIFZpc2lvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIEBsaWNlbnNlICAgIFNlZSB0aGUgZmlsZSBcIkxJQ0VOU0UudHh0XCIgZm9yIHRoZSBmdWxsIGxpY2Vuc2UgZ292ZXJuaW5nIHRoaXMgY29kZS5cbiAqIEBhdXRob3IgICAgIEhhemVsIFdpbHNvbiA8aGF6ZWxAaGlnaGxhbmR2aXNpb24uY29tPlxuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG5pZiAoIXdpbmRvdy5sb2NhdGlvbi5vcmlnaW4pIHtcblx0d2luZG93LmxvY2F0aW9uLm9yaWdpbiA9IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCArIFwiLy9cIiArIHdpbmRvdy5sb2NhdGlvbi5ob3N0O1xufVxuXG4oZnVuY3Rpb24gKCQpIHtcblx0bGV0IG15S3JEb2JFbnRyeTtcblx0bGV0IHRvZGF5O1xuXHRsZXQga2V5ID0ge0JBQ0tTUEFDRTogOH07XG5cblx0bGV0IHNldHRpbmdzID0ge1xuXHRcdGN1c3RvbV92YWxpZGF0aW9uOiAgICAgZmFsc2UsXG5cdFx0ZGF5c19pbl9tb250aDogICAgICAgICBbMzEsIDI5LCAzMSwgMzAsIDMxLCAzMCwgMzEsIDMxLCAzMCwgMzEsIDMwLCAzMV0sXG5cdFx0ZG9jdW1lbnRfZGF0ZTogICAgICAgICBmYWxzZSxcblx0XHRlcnJvcmJveF94OiAgICAgICAgICAgIDEsXG5cdFx0ZXJyb3Jib3hfeTogICAgICAgICAgICA1LFxuXHRcdGZpZWxkX2hpbnRfdGV4dF9kYXk6ICAgJ0REJyxcblx0XHRmaWVsZF9oaW50X3RleHRfbW9udGg6ICdNTScsXG5cdFx0ZmllbGRfaGludF90ZXh0X3llYXI6ICAnWVlZWScsXG5cdFx0ZmllbGRfb3JkZXI6ICAgICAgICAgICAnRE1ZJyxcblx0XHRmaWVsZF93aWR0aF9kYXk6ICAgICAgIDYsXG5cdFx0ZmllbGRfd2lkdGhfbW9udGg6ICAgICA2LFxuXHRcdGZpZWxkX3dpZHRoX3llYXI6ICAgICAgNyxcblx0XHRmaWVsZF93aWR0aF9zZXA6ICAgICAgIDIsXG5cdFx0bWlubWF4OiAgICAgICAgICAgICAgICAnJyxcblx0XHRtaW5fZGF0ZTogICAgICAgICAgICAgIGZhbHNlLFxuXHRcdG1heF9kYXRlOiAgICAgICAgICAgICAgZmFsc2UsXG5cdFx0bWluX3llYXI6ICAgICAgICAgICAgICAxOTEwLFxuXHRcdG1vbnRoX25hbWU6ICAgICAgICAgICAgW1xuXHRcdFx0J0phbnVhcnknLCAnRmVicnVhcnknLCAnTWFyY2gnLCAnQXByaWwnLFxuXHRcdFx0J01heScsICdKdW5lJywgJ0p1bHknLCAnQXVndXN0JywgJ1NlcHRlbWJlcicsXG5cdFx0XHQnT2N0b2JlcicsICdOb3ZlbWJlcicsICdEZWNlbWJlciddLFxuXHRcdG9uX2JsdXI6ICAgICAgICAgICAgICAgZmFsc2UsXG5cdFx0b25fZXJyb3I6ICAgICAgICAgICAgICBmYWxzZSxcblx0XHRvbl9jaGFuZ2U6ICAgICAgICAgICAgIGZhbHNlLFxuXHRcdHBhcnNlX2RhdGU6ICAgICAgICAgICAgdHJ1ZSxcblx0XHRzZXBhcmF0b3I6ICAgICAgICAgICAgICcvJyxcblx0XHRzaG93X2Vycm9yczogICAgICAgICAgIHRydWUsXG5cdFx0c2hvd19oaW50czogICAgICAgICAgICB0cnVlLFxuXHRcdEVfREFZX05BTjogICAgICAgICAgICAgJ0RheSBtdXN0IGJlIGEgbnVtYmVyJyxcblx0XHRFX0RBWV9UT09fQklHOiAgICAgICAgICdEYXkgbXVzdCBiZSAxLTMxJyxcblx0XHRFX0RBWV9UT09fU01BTEw6ICAgICAgICdEYXkgbXVzdCBiZSAxLTMxJyxcblx0XHRFX0JBRF9EQVlfRk9SX01PTlRIOiAgICdPbmx5ICVkIGRheXMgaW4gJW0gJXknLFxuXHRcdEVfTU9OVEhfTkFOOiAgICAgICAgICAgJ01vbnRoIG11c3QgYmUgYSBudW1iZXInLFxuXHRcdEVfTU9OVEhfVE9PX0JJRzogICAgICAgJ01vbnRoIG11c3QgYmUgMS0xMicsXG5cdFx0RV9NT05USF9UT09fU01BTEw6ICAgICAnTW9udGggY2Fubm90IGJlIDAnLFxuXHRcdEVfWUVBUl9OQU46ICAgICAgICAgICAgJ1llYXIgbXVzdCBiZSBhIG51bWJlcicsXG5cdFx0RV9ZRUFSX0xFTkdUSDogICAgICAgICAnWWVhciBtdXN0IGJlIDQgZGlnaXRzJyxcblx0XHRFX1lFQVJfVE9PX1NNQUxMOiAgICAgICdZZWFyIG11c3Qgbm90IGJlIGJlZm9yZSAleScsXG5cdFx0RV9NSU5fREFURTogICAgICAgICAgICAnRGF0ZSBtdXN0IG5vdCBiZSBpbiB0aGUgcGFzdCcsXG5cdFx0RV9NQVhfREFURTogICAgICAgICAgICAnRGF0ZSBtdXN0IG5vdCBiZSBpbiB0aGUgZnV0dXJlJ1xuXHR9O1xuXG5cdGNsYXNzIEtyRG9iRW50cnkge1xuXHRcdGNvbnN0cnVjdG9yKCRlbGVtZW50LCBvcHRpb25zKSB7XG5cdFx0XHR0b2RheSA9IEtyRG9iRW50cnkuZ2V0WW1kKG5ldyBEYXRlKCkpO1xuXG5cdFx0XHR0aGlzLmlucHV0X2RheSA9IDA7XG5cdFx0XHR0aGlzLmlucHV0X21vbnRoID0gMDtcblx0XHRcdHRoaXMuaW5wdXRfeWVhciA9IDA7XG5cdFx0XHR0aGlzLiRlbGVtZW50ID0gJGVsZW1lbnQ7XG5cdFx0XHRpZiAob3B0aW9ucykge1xuXHRcdFx0XHQkLmV4dGVuZChzZXR0aW5ncywgb3B0aW9ucyk7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuaW5pdCgpO1xuXHRcdH1cblxuXHRcdHN0YXRpYyBnZXRZbWQoZGF0ZSkge1xuXHRcdFx0Y29uc3QgbSA9IGRhdGUuZ2V0TW9udGgoKSArIDE7XG5cdFx0XHRjb25zdCBkID0gZGF0ZS5nZXREYXkoKTtcblxuXHRcdFx0cmV0dXJuIChkYXRlLmdldEZ1bGxZZWFyKCkgKyAnLScgKyAobSA8IDEwID8gJzAnIDogJycpICsgbSArICctJyArIChkIDwgMTAgPyAnMCcgOiAnJykgKyBkKTtcblx0XHR9XG5cblx0XHRzdGF0aWMgZ2V0WW1kT2JqZWN0KGRhdGUpIHtcblx0XHRcdHJldHVybiAoZGF0ZS55ZWFyICsgJy0nICsgZGF0ZS5tb250aCArICctJyArIGRhdGUuZGF5KTtcblx0XHR9XG5cblx0XHRhZGRFbnRyeUZpZWxkcygpIHtcblx0XHRcdGxldCBkb2JmaWVsZCA9IHRoaXM7XG5cdFx0XHRkb2JmaWVsZC5maWVsZHMgPSBbXTtcblx0XHRcdCQuZWFjaChzZXR0aW5ncy5maWVsZF9vcmRlci5zcGxpdCgnJyksIGZ1bmN0aW9uIChpLCBmaWVsZCkge1xuXHRcdFx0XHRzd2l0Y2ggKGZpZWxkKSB7XG5cdFx0XHRcdFx0Y2FzZSAnRCc6XG5cdFx0XHRcdFx0XHRkb2JmaWVsZC5idWlsZEZpZWxkKCdkYXknLCBpKTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgJ00nOlxuXHRcdFx0XHRcdFx0ZG9iZmllbGQuYnVpbGRGaWVsZCgnbW9udGgnLCBpKTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgJ1knOlxuXHRcdFx0XHRcdFx0ZG9iZmllbGQuYnVpbGRGaWVsZCgneWVhcicsIGkpO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0ZGVmYXVsdCA6XG5cdFx0XHRcdFx0XHR0aHJvdyBcIlVuZXhwZWN0ZWQgZmllbGQgb3JkZXIgJ1wiICsgZmllbGQgKyBcIicgZXhwZWN0ZWQgRCwgTSBvciBZXCI7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGFmdGVyUGFzdGUodGFyZ2V0KSB7XG5cdFx0XHRpZiAodGhpcy5wYXJzZURhdGUoJCh0YXJnZXQpLnZhbCgpKSkge1xuXHRcdFx0XHR0aGlzLnNldERhdGUoJCh0YXJnZXQpLnZhbCgpKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRidWlsZEZpZWxkKG5hbWUsIGluZGV4KSB7XG5cdFx0XHRsZXQga3Jkb2JlbnRyeSA9IHRoaXM7XG5cdFx0XHRsZXQgaW5wdXQgPSBuZXcgS3JEb2JJbnB1dCh7XG5cdFx0XHRcdG5hbWU6ICAgICAgIG5hbWUsXG5cdFx0XHRcdGtyZG9iZW50cnk6IGtyZG9iZW50cnksXG5cdFx0XHRcdGluZGV4OiAgICAgIGluZGV4LFxuXHRcdFx0XHRoaW50X3RleHQ6ICBzZXR0aW5ncy5zaG93X2hpbnRzID8gc2V0dGluZ3NbJ2ZpZWxkX2hpbnRfdGV4dF8nICsgbmFtZV0gOiBudWxsLFxuXHRcdFx0fSk7XG5cblx0XHRcdHRoaXMuaW5uZXIuYXBwZW5kKGlucHV0LiRpbnB1dCk7XG5cdFx0XHR0aGlzWydpbnB1dF8nICsgbmFtZV0gPSBpbnB1dDtcblxuXHRcdFx0aWYgKGluZGV4IDwgMikge1xuXHRcdFx0XHR0aGlzLmlubmVyLmFwcGVuZCgkKCc8c3BhbiBjbGFzcz1cInNlcGFyYXRvclwiIC8+JykudGV4dChzZXR0aW5ncy5zZXBhcmF0b3IpKTtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5maWVsZHNbaW5kZXhdID0gaW5wdXQ7XG5cdFx0XHR0aGlzW25hbWVdID0gaW5wdXQ7XG5cdFx0fVxuXG5cdFx0YnVpbGRVaSgpIHtcblx0XHRcdGxldCBkb2JmaWVsZCA9IHRoaXM7XG5cdFx0XHR0aGlzLndyYXBwZXIgPSAkKHRoaXMuJGVsZW1lbnQud3JhcCgnPHNwYW4gY2xhc3M9XCJqcS1kdGVcIiAvPicpLnBhcmVudCgpWzBdKTtcblx0XHRcdHRoaXMuaW5uZXIgPSAkKCc8c3BhbiBjbGFzcz1cImpxLWR0ZS1pbm5lclwiIC8+Jyk7XG5cdFx0XHR0aGlzLmFkZEVudHJ5RmllbGRzKCk7XG5cdFx0XHR0aGlzLmVycm9yYm94ID0gJCgnPHNwYW4gY2xhc3M9XCJqcS1kdGUtZXJyb3Jib3hcIiAvPicpLmhpZGUoKTtcblx0XHRcdHRoaXMuaW5uZXIub24oJ3Bhc3RlJywgJ2lucHV0JywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0bGV0IGlucHV0ID0gdGhpcztcblx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0ZG9iZmllbGQuYWZ0ZXJQYXN0ZShpbnB1dCwgZSk7XG5cdFx0XHRcdH0sIDIpO1xuXHRcdFx0fSk7XG5cdFx0XHR0aGlzLndyYXBwZXIuYXBwZW5kKHRoaXMuaW5uZXIsIHRoaXMuZXJyb3Jib3gpO1xuXHRcdFx0dGhpcy5zZXRGaWVsZFdpZHRocygpO1xuXHRcdFx0dGhpcy4kZWxlbWVudC5oaWRlKCk7XG5cdFx0fVxuXG5cdFx0Y2hlY2tEb2N1bWVudChkb2IsIGNoaWxkZG9iLCBjbGFzc25hbWUpIHtcblx0XHRcdGxldCBlbGVtZW50cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoY2xhc3NuYW1lKTtcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0aWYgKG5ldyBEYXRlKGRvYikgPiBuZXcgRGF0ZShjaGlsZGRvYikpIHtcblx0XHRcdFx0XHRlbGVtZW50c1tpXS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGVsZW1lbnRzW2ldLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Y2xlYXIoKSB7XG5cdFx0XHR0aGlzLmNsZWFyRXJyb3IoJycpO1xuXHRcdFx0dGhpcy5zZXREYXRlKCcnKTtcblx0XHR9XG5cblx0XHRjbGVhckVycm9yKCkge1xuXHRcdFx0ZGVsZXRlIHRoaXMuZXJyb3JfdGV4dDtcblx0XHRcdHRoaXMuc2hvd0Vycm9yKCk7XG5cdFx0fVxuXG5cdFx0ZGVzdHJveSgpIHtcblx0XHRcdHRoaXMuJGVsZW1lbnQuc2hvdygpO1xuXHRcdFx0dGhpcy4kZWxlbWVudC5jc3MoJ2Rpc3BsYXknLCAnJyk7XG5cdFx0XHR0aGlzLndyYXBwZXIuZmluZCgnc3BhbicpLnJlbW92ZSgpO1xuXHRcdFx0dGhpcy4kZWxlbWVudC51bndyYXAoKTtcblx0XHRcdHRoaXMuJGVsZW1lbnQucmVtb3ZlRGF0YSgnZGF0ZXRleHRlbnRyeScpO1xuXHRcdFx0ZGVsZXRlIHRoaXMuaW5uZXI7XG5cdFx0XHRkZWxldGUgdGhpcy53cmFwcGVyO1xuXHRcdFx0ZGVsZXRlIHRoaXMuJGVsZW1lbnQ7XG5cdFx0fVxuXG5cdFx0Zm9jdXMoKSB7XG5cdFx0XHR0aGlzLmZpZWxkc1swXS5zZXRGb2N1cyh0cnVlKTtcblx0XHR9XG5cblx0XHRmb2N1c0ZpZWxkQmVmb3JlKGlucHV0KSB7XG5cdFx0XHRjb25zdCBpbmRleCA9IGlucHV0LmluZGV4O1xuXHRcdFx0aWYgKGluZGV4IDwgMSkge1xuXHRcdFx0XHRyZXR1cm5cblx0XHRcdH1cblx0XHRcdHRoaXMuZmllbGRzW2luZGV4XS55aWVsZEZvY3VzKCk7XG5cdFx0XHR0aGlzLmZpZWxkc1tpbmRleCAtIDFdLnNldEZvY3VzKHRydWUpO1xuXHRcdFx0Ly8gbGV0IG5leHQgPSB0aGlzLmZpZWxkc1tpbmRleCAtIDFdO1xuXHRcdFx0Ly8gbGV0IHZhbCA9IG5leHQuZ2V0KCk7XG5cdFx0XHQvLyBuZXh0LnNldEZvY3VzKGZhbHNlKTtcblx0XHR9XG5cblx0XHRmb2N1c0ZpZWxkQWZ0ZXIoaW5wdXQpIHtcblx0XHRcdGNvbnN0IGluZGV4ID0gaW5wdXQuaW5kZXg7XG5cdFx0XHRpZiAoaW5kZXggPiAxKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdHRoaXMuZmllbGRzW2luZGV4XS55aWVsZEZvY3VzKCk7XG5cdFx0XHR0aGlzLmZpZWxkc1tpbmRleCArIDFdLnNldEZvY3VzKHRydWUpO1xuXHRcdH1cblxuXHRcdGZvY3VzSW4oKSB7XG5cdFx0XHR0aGlzLndyYXBwZXIuYWRkQ2xhc3MoJ2ZvY3VzJyk7XG5cdFx0fVxuXG5cdFx0Zm9jdXNPdXQoKSB7XG5cdFx0XHRpZiAoc2V0dGluZ3Mub25fYmx1cikge1xuXHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRzZWxmLndpZGdldEZvY3VzTG9zdCgpO1xuXHRcdFx0XHR9LCAyKTtcblx0XHRcdH1cblx0XHRcdHRoaXMud3JhcHBlci5yZW1vdmVDbGFzcygnZm9jdXMnKTtcblx0XHR9XG5cblx0XHRnZXREYXRlKCkge1xuXHRcdFx0cmV0dXJuICh0aGlzLmRheV92YWx1ZSAmJiB0aGlzLm1vbnRoX3ZhbHVlICYmIHRoaXMueWVhcl92YWx1ZSlcblx0XHRcdCAgICAgICA/IHtkYXk6IHRoaXMuZGF5X3ZhbHVlLCBtb250aDogdGhpcy5tb250aF92YWx1ZSwgeWVhcjogdGhpcy55ZWFyX3ZhbHVlfVxuXHRcdFx0ICAgICAgIDogbnVsbDtcblx0XHR9XG5cblx0XHRpbml0KCkge1xuXHRcdFx0aWYgKCFzZXR0aW5ncy5taW5feWVhcilcblx0XHRcdFx0c2V0dGluZ3MubWluX3llYXIgPSAnMTkxMCc7XG5cblx0XHRcdHRoaXMuYnVpbGRVaSgpO1xuXHRcdFx0dGhpcy5zZXREYXRlKHRoaXMuJGVsZW1lbnQuYXR0cigndmFsdWUnKSk7XG5cdFx0XHR0aGlzLnByb3h5TGFiZWxDbGlja3MoKTtcblx0XHR9XG5cblx0XHRwYXJzZURhdGUodGV4dCkge1xuXHRcdFx0cmV0dXJuIHRoaXMucGFyc2VJc29EYXRlKHRleHQpO1xuXHRcdH1cblxuXHRcdHBhcnNlSXNvRGF0ZSh0ZXh0KSB7XG5cdFx0XHRyZXR1cm4gdGV4dCAmJiB0ZXh0Lm1hdGNoKC9eKFxcZFxcZFxcZFxcZCktKFxcZFxcZCktKFxcZFxcZCkvKSA/IHtcblx0XHRcdFx0ZGF5OiAgIFJlZ0V4cC4kMyxcblx0XHRcdFx0bW9udGg6IFJlZ0V4cC4kMixcblx0XHRcdFx0eWVhcjogIFJlZ0V4cC4kMVxuXHRcdFx0fSA6IG51bGw7XG5cdFx0fVxuXG5cdFx0cHJveHlMYWJlbENsaWNrcygpIHtcblx0XHRcdGxldCBkb2JmaWVsZCA9IHRoaXM7XG5cdFx0XHRsZXQgaWQgPSB0aGlzLiRlbGVtZW50LmF0dHIoJ2lkJyk7XG5cdFx0XHRpZiAoIWlkKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdCQoJ2xhYmVsW2Zvcj0nICsgaWQgKyAnXScpLmNsaWNrKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0ZG9iZmllbGQuZm9jdXMoKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdHNldERhdGUobmV3X2RhdGUpIHtcblx0XHRcdGxldCBkb2JmaWVsZCA9IHRoaXM7XG5cdFx0XHRuZXdfZGF0ZSA9IHRoaXMucGFyc2VEYXRlKG5ld19kYXRlKTtcblx0XHRcdGRlbGV0ZSB0aGlzLmRheV92YWx1ZTtcblx0XHRcdGRlbGV0ZSB0aGlzLm1vbnRoX3ZhbHVlO1xuXHRcdFx0ZGVsZXRlIHRoaXMueWVhcl92YWx1ZTtcblx0XHRcdHRoaXMuaW5wdXRfZGF5LnNldChuZXdfZGF0ZSA/IG5ld19kYXRlLmRheSA6ICcnKTtcblx0XHRcdHRoaXMuaW5wdXRfbW9udGguc2V0KG5ld19kYXRlID8gbmV3X2RhdGUubW9udGggOiAnJyk7XG5cdFx0XHR0aGlzLmlucHV0X3llYXIuc2V0KG5ld19kYXRlID8gbmV3X2RhdGUueWVhciA6ICcnKTtcblx0XHRcdHRoaXMuY2xlYXJFcnJvcigpO1xuXHRcdFx0dGhpcy4kZWxlbWVudC52YWwobmV3X2RhdGUpO1xuXHRcdFx0aWYgKG5ld19kYXRlKSB7XG5cdFx0XHRcdCQuZWFjaCh0aGlzLmZpZWxkcywgZnVuY3Rpb24gKGksIGlucHV0KSB7XG5cdFx0XHRcdFx0ZG9iZmllbGQudmFsaWRhdGUoaW5wdXQpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRzZXRFcnJvcihlcnJvcl90ZXh0KSB7XG5cdFx0XHR0aGlzLmVycm9yX3RleHQgPSBlcnJvcl90ZXh0O1xuXHRcdFx0dGhpcy5zaG93RXJyb3IoKTtcblx0XHR9XG5cblx0XHRzZXRGaWVsZFdpZHRocygpIHtcblx0XHRcdGxldCBhdmFpbGFibGUgPSB0aGlzLiRlbGVtZW50LndpZHRoKCkgLSAyO1xuXHRcdFx0bGV0IHRvdGFsID0gc2V0dGluZ3MuZmllbGRfd2lkdGhfeWVhciArIHNldHRpbmdzLmZpZWxkX3dpZHRoX3NlcCArIHNldHRpbmdzLmZpZWxkX3dpZHRoX21vbnRoICtcblx0XHRcdFx0c2V0dGluZ3MuZmllbGRfd2lkdGhfc2VwICsgc2V0dGluZ3MuZmllbGRfd2lkdGhfZGF5O1xuXHRcdFx0dGhpcy5pbnB1dF9kYXkuc2V0V2lkdGgoTWF0aC5mbG9vcihzZXR0aW5ncy5maWVsZF93aWR0aF9kYXkgKiBhdmFpbGFibGUgLyB0b3RhbCkpO1xuXHRcdFx0dGhpcy5pbnB1dF9tb250aC5zZXRXaWR0aChNYXRoLmZsb29yKHNldHRpbmdzLmZpZWxkX3dpZHRoX21vbnRoICogYXZhaWxhYmxlIC8gdG90YWwpKTtcblx0XHRcdHRoaXMuaW5wdXRfeWVhci5zZXRXaWR0aChNYXRoLmZsb29yKHNldHRpbmdzLmZpZWxkX3dpZHRoX3llYXIgKiBhdmFpbGFibGUgLyB0b3RhbCkpO1xuXHRcdH1cblxuXHRcdHNldFJlYWRvbmx5KG1vZGUpIHtcblx0XHRcdGlmIChtb2RlID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0bW9kZSA9IHRydWU7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLmlucHV0X2RheS5zZXRSZWFkb25seShtb2RlKTtcblx0XHRcdHRoaXMuaW5wdXRfbW9udGguc2V0UmVhZG9ubHkobW9kZSk7XG5cdFx0XHR0aGlzLmlucHV0X3llYXIuc2V0UmVhZG9ubHkobW9kZSk7XG5cdFx0XHRpZiAobW9kZSkge1xuXHRcdFx0XHR0aGlzLndyYXBwZXIuYWRkQ2xhc3MoJ3JlYWRvbmx5Jyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLndyYXBwZXIucmVtb3ZlQ2xhc3MoJ3JlYWRvbmx5Jyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0c2hvd0Vycm9yKCkge1xuXHRcdFx0bGV0IGVycm9yX3RleHQgPSB0aGlzLndpZGdldEVycm9yVGV4dCgpO1xuXHRcdFx0aWYgKHRoaXMub25fZXJyb3IpIHtcblx0XHRcdFx0dGhpcy5vbl9lcnJvcihlcnJvcl90ZXh0KTtcblx0XHRcdH1cblx0XHRcdGlmICghc2V0dGluZ3Muc2hvd19lcnJvcnMpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGVycm9yX3RleHQgPT09ICcnKSB7XG5cdFx0XHRcdHRoaXMuZXJyb3Jib3guaGlkZSgpO1xuXHRcdFx0XHR0aGlzLmVycm9yYm94LnRleHQoJycpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bGV0IHhfb2Zmc2V0ID0gKHRoaXMuaW5uZXIub3V0ZXJXaWR0aCgpICsgc2V0dGluZ3MuZXJyb3Jib3hfeCkgKyAncHgnO1xuXHRcdFx0XHRsZXQgeV9vZmZzZXQgPSBzZXR0aW5ncy5lcnJvcmJveF95ICsgJ3B4Jztcblx0XHRcdFx0dGhpcy5lcnJvcmJveC5jc3Moe2Rpc3BsYXk6ICdibG9jaycsIHBvc2l0aW9uOiAnYWJzb2x1dGUnLCB0b3A6IHlfb2Zmc2V0LCBsZWZ0OiB4X29mZnNldH0pO1xuXHRcdFx0XHR0aGlzLmVycm9yYm94LnRleHQoZXJyb3JfdGV4dCk7XG5cdFx0XHRcdHRoaXMuZXJyb3Jib3guc2hvdygpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHZhbGlkYXRlKGN1cnJlbnRfaW5wdXQpIHtcblx0XHRcdHRoaXMuJGVsZW1lbnQudmFsKCcnKTtcblx0XHRcdGlmIChjdXJyZW50X2lucHV0KSB7XG5cdFx0XHRcdGNvbnN0IHR5cGUgPSBjdXJyZW50X2lucHV0Lm5hbWU7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0aWYgKHR5cGUgPT09ICdkYXknKSB7XG5cdFx0XHRcdFx0XHR0aGlzLnZhbGlkYXRlRGF5KCk7XG5cdFx0XHRcdFx0fSBlbHNlIGlmICh0eXBlID09PSAnbW9udGgnKSB7XG5cdFx0XHRcdFx0XHR0aGlzLnZhbGlkYXRlTW9udGgoKTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHR5cGUgPT09ICd5ZWFyJykge1xuXHRcdFx0XHRcdFx0dGhpcy52YWxpZGF0ZVllYXIoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Y3VycmVudF9pbnB1dC5jbGVhckVycm9yKCk7XG5cdFx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0XHRjdXJyZW50X2lucHV0LnNldEVycm9yKGUpO1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKHRoaXMuZGF5X3ZhbHVlICYmIHRoaXMubW9udGhfdmFsdWUpIHtcblx0XHRcdFx0dGhpcy5jbGVhckVycm9yKCk7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0dGhpcy52YWxpZGF0ZURheXNJbk1vbnRoKCk7XG5cdFx0XHRcdFx0aWYgKHRoaXMueWVhcl92YWx1ZSAmJiB0aGlzLnllYXJfdmFsdWUubGVuZ3RoID09PSA0KSB7XG5cdFx0XHRcdFx0XHR0aGlzLnZhbGlkYXRlQ29tcGxldGVEYXRlKCk7XG5cdFx0XHRcdFx0XHRsZXQgZGF0ZV9zdHIgPSBLckRvYkVudHJ5LmdldFltZE9iamVjdCh0aGlzLmdldERhdGUoKSk7XG5cdFx0XHRcdFx0XHR0aGlzLiRlbGVtZW50LnZhbChkYXRlX3N0cik7XG5cdFx0XHRcdFx0XHRpZiAodGhpcy4kZWxlbWVudC5kYXRhKCdjaGlsZGRvYicpKSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMuY2hlY2tEb2N1bWVudChkYXRlX3N0ciwgdGhpcy4kZWxlbWVudC5kYXRhKCdjaGlsZGRvYicpLCB0aGlzLiRlbGVtZW50LmF0dHIoJ2lkJykpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRcdHRoaXMuc2V0RXJyb3IoZSk7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLmNsZWFyRXJyb3IoKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0dmFsaWRhdGVDb21wbGV0ZURhdGUoKSB7XG5cdFx0XHRjb25zdCBkYXRlX29iaiA9IHRoaXMuZ2V0RGF0ZSgpO1xuXHRcdFx0Y29uc3QgZGF0ZV9pc28gPSBLckRvYkVudHJ5LmdldFltZE9iamVjdChkYXRlX29iaik7XG5cdFx0XHRzZXR0aW5ncy5taW5tYXggPSB0aGlzLiRlbGVtZW50LmRhdGEoJ3ZhbGlkYXRpb24nKTtcblxuXHRcdFx0aWYgKHNldHRpbmdzLm1pbm1heCA9PT0gJ21heCcpIHtcblx0XHRcdFx0aWYgKGRhdGVfaXNvID4gdG9kYXkpIHtcblx0XHRcdFx0XHR0aHJvdyhzZXR0aW5ncy5FX01BWF9EQVRFKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKHNldHRpbmdzLm1pbm1heCA9PT0gJ21pbicpIHtcblx0XHRcdFx0aWYgKGRhdGVfaXNvIDwgdG9kYXkpIHtcblx0XHRcdFx0XHR0aHJvdyhzZXR0aW5ncy5FX01JTl9EQVRFKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBsZXQgbWF4X2RhdGUgPSBzZXR0aW5ncy5tYXhfZGF0ZTtcblx0XHRcdC8vIGlmICh0eXBlb2YgbWF4X2RhdGUgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdC8vIFx0bWF4X2RhdGUgPSBtYXhfZGF0ZS5jYWxsKHRoaXMpO1xuXHRcdFx0Ly8gfVxuXHRcdFx0Ly8gaWYgKHR5cGVvZiBtYXhfZGF0ZSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdC8vIFx0bWF4X2RhdGUgPSB0aGlzLnBhcnNlRGF0ZShtYXhfZGF0ZSk7XG5cdFx0XHQvLyB9XG5cdFx0XHQvLyBpZiAobWF4X2RhdGUpIHtcblx0XHRcdC8vIFx0aWYgKGRhdGVfaXNvID4gc2V0dGluZ3MubWF4X2RhdGUpIHtcblx0XHRcdC8vIFx0XHR0aHJvdyhzZXR0aW5ncy5FX01BWF9EQVRFKTtcblx0XHRcdC8vIFx0fVxuXHRcdFx0Ly8gfVxuXG5cdFx0XHRpZiAodGhpcy5jdXN0b21fdmFsaWRhdGlvbikge1xuXHRcdFx0XHRkYXRlX29iai5kYXRlID0gbmV3IERhdGUoXG5cdFx0XHRcdFx0cGFyc2VJbnQoZGF0ZV9vYmoueWVhciwgMTApLFxuXHRcdFx0XHRcdHBhcnNlSW50KGRhdGVfb2JqLm1vbnRoLCAxMCkgLSAxLFxuXHRcdFx0XHRcdHBhcnNlSW50KGRhdGVfb2JqLmRheSwgMTApXG5cdFx0XHRcdCk7XG5cdFx0XHRcdHRoaXMuY3VzdG9tX3ZhbGlkYXRpb24oZGF0ZV9vYmopO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHZhbGlkYXRlRGF5KCkge1xuXHRcdFx0bGV0IG9wdCA9IHNldHRpbmdzO1xuXHRcdFx0bGV0IGlucHV0ID0gdGhpcy5pbnB1dF9kYXk7XG5cdFx0XHR0aGlzLmRheV92YWx1ZSA9IHVuZGVmaW5lZDtcblx0XHRcdGxldCB0ZXh0ID0gaW5wdXQuZ2V0KCk7XG5cdFx0XHRpZiAodGV4dCA9PT0gJycgfHwgKHRleHQgPT09ICcwJyAmJiBpbnB1dC5oYXNfZm9jdXMpKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdGlmICh0ZXh0Lm1hdGNoKC9cXEQvKSkge1xuXHRcdFx0XHR0aHJvdyhvcHQuRV9EQVlfTkFOKTtcblx0XHRcdH1cblx0XHRcdGxldCBudW0gPSBwYXJzZUludCh0ZXh0LCAxMCk7XG5cdFx0XHRpZiAobnVtIDwgMSkge1xuXHRcdFx0XHR0aHJvdyhvcHQuRV9EQVlfVE9PX1NNQUxMKTtcblx0XHRcdH1cblx0XHRcdGlmIChudW0gPiAzMSkge1xuXHRcdFx0XHR0aHJvdyhvcHQuRV9EQVlfVE9PX0JJRyk7XG5cdFx0XHR9XG5cdFx0XHR0ZXh0ID0gbnVtIDwgMTAgPyAnMCcgKyBudW0gOiAnJyArIG51bTtcblx0XHRcdGlmICghaW5wdXQuaGFzX2ZvY3VzKSB7XG5cdFx0XHRcdGlucHV0LnNldCh0ZXh0KTtcblx0XHRcdH1cblx0XHRcdHRoaXMuZGF5X3ZhbHVlID0gdGV4dDtcblx0XHR9XG5cblx0XHR2YWxpZGF0ZURheXNJbk1vbnRoKCkge1xuXHRcdFx0Y29uc3QgZGF5ID0gcGFyc2VJbnQodGhpcy5kYXlfdmFsdWUsIDEwKTtcblx0XHRcdGNvbnN0IG1vbnRoID0gcGFyc2VJbnQodGhpcy5tb250aF92YWx1ZSwgMTApO1xuXHRcdFx0Y29uc3QgeWVhciA9IHBhcnNlSW50KHRoaXMueWVhcl92YWx1ZSwgMTApO1xuXHRcdFx0aWYgKGRheSA8IDEgfHwgbW9udGggPCAxKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdGxldCBtYXggPSBzZXR0aW5ncy5kYXlzX2luX21vbnRoW21vbnRoIC0gMV07XG5cdFx0XHRsZXQgbXNnID0gc2V0dGluZ3MuRV9CQURfREFZX0ZPUl9NT05USDtcblx0XHRcdGlmIChtb250aCA9PT0gMiAmJiAoJycgKyB5ZWFyKS5sZW5ndGggPT09IDQpIHtcblx0XHRcdFx0bWF4ID0geWVhciAlIDQgPyAyOCA6IHllYXIgJSAxMDAgPyAyOSA6IHllYXIgJSA0MDAgPyAyOCA6IDI5O1xuXHRcdFx0XHRtc2cgPSBtc2cucmVwbGFjZSgvJXkvLCB5ZWFyLnRvU3RyaW5nKCkpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bXNnID0gbXNnLnJlcGxhY2UoLyAqJXkvLCAnJyk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoZGF5ID4gbWF4KSB7XG5cdFx0XHRcdHRocm93KG1zZy5yZXBsYWNlKC8lZC8sIG1heC50b1N0cmluZygpKS5yZXBsYWNlKC8lbS8sIHNldHRpbmdzLm1vbnRoX25hbWVbbW9udGggLSAxXSkpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHZhbGlkYXRlTW9udGgoKSB7XG5cdFx0XHRsZXQgaW5wdXQgPSB0aGlzLmlucHV0X21vbnRoO1xuXHRcdFx0dGhpcy5tb250aF92YWx1ZSA9IHVuZGVmaW5lZDtcblx0XHRcdGxldCB0ZXh0ID0gaW5wdXQuZ2V0KCk7XG5cdFx0XHRpZiAodGV4dCA9PT0gJycgfHwgKHRleHQgPT09ICcwJyAmJiBpbnB1dC5oYXNfZm9jdXMpKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdGlmICh0ZXh0Lm1hdGNoKC9cXEQvKSkge1xuXHRcdFx0XHR0aHJvdyhzZXR0aW5ncy5FX01PTlRIX05BTik7XG5cdFx0XHR9XG5cdFx0XHRsZXQgbnVtID0gcGFyc2VJbnQodGV4dCwgMTApO1xuXHRcdFx0aWYgKG51bSA8IDEpIHtcblx0XHRcdFx0dGhyb3coc2V0dGluZ3MuRV9NT05USF9UT09fU01BTEwpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKG51bSA+IDEyKSB7XG5cdFx0XHRcdHRocm93KHNldHRpbmdzLkVfTU9OVEhfVE9PX0JJRyk7XG5cdFx0XHR9XG5cdFx0XHR0ZXh0ID0gbnVtIDwgMTAgPyAnMCcgKyBudW0gOiAnJyArIG51bTtcblx0XHRcdGlmICghaW5wdXQuaGFzX2ZvY3VzKSB7XG5cdFx0XHRcdGlucHV0LnNldCh0ZXh0KTtcblx0XHRcdH1cblx0XHRcdHRoaXMubW9udGhfdmFsdWUgPSB0ZXh0O1xuXHRcdH1cblxuXHRcdHZhbGlkYXRlWWVhcigpIHtcblx0XHRcdGNvbnN0IGlucHV0ID0gdGhpcy5pbnB1dF95ZWFyO1xuXHRcdFx0dGhpcy55ZWFyX3ZhbHVlID0gdW5kZWZpbmVkO1xuXHRcdFx0bGV0IHRleHQgPSBpbnB1dC5nZXQoKTtcblx0XHRcdGlmICh0ZXh0ID09PSAnJyB8fCAodGV4dCA9PT0gJzAnICYmIGlucHV0Lmhhc19mb2N1cykpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHRleHQubWF0Y2goL1xcRC8pKSB7XG5cdFx0XHRcdHRocm93KHNldHRpbmdzLkVfWUVBUl9OQU4pO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGlucHV0Lmhhc19mb2N1cykge1xuXHRcdFx0XHRpZiAodGV4dC5sZW5ndGggPiA0KSB7XG5cdFx0XHRcdFx0dGhyb3coc2V0dGluZ3MuRV9ZRUFSX0xFTkdUSCk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmICh0ZXh0Lmxlbmd0aCAhPT0gNCkge1xuXHRcdFx0XHRcdHRocm93KHNldHRpbmdzLkVfWUVBUl9MRU5HVEgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAodGV4dC5sZW5ndGggPT09IDQpIHtcblx0XHRcdFx0Y29uc3QgbnVtID0gcGFyc2VJbnQodGV4dCwgMTApO1xuXHRcdFx0XHRpZiAoc2V0dGluZ3MubWluX3llYXIgJiYgbnVtIDwgc2V0dGluZ3MubWluX3llYXIpIHtcblx0XHRcdFx0XHR0aHJvdyhzZXR0aW5ncy5FX1lFQVJfVE9PX1NNQUxMLnJlcGxhY2UoLyV5Lywgc2V0dGluZ3MubWluX3llYXIpKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0dGhpcy55ZWFyX3ZhbHVlID0gdGV4dDtcblx0XHR9XG5cblx0XHR3aWRnZXRFcnJvclRleHQoKSB7XG5cdFx0XHRsZXQgZXJyb3JfdGV4dCA9ICcnO1xuXHRcdFx0JC5lYWNoKHRoaXMuZmllbGRzLCBmdW5jdGlvbiAoaSwgaW5wdXQpIHtcblx0XHRcdFx0aWYgKGlucHV0LmVycm9yX3RleHQpIHtcblx0XHRcdFx0XHRpZiAoaW5wdXQuaGFzX2ZvY3VzIHx8IGVycm9yX3RleHQgPT09ICcnKSB7XG5cdFx0XHRcdFx0XHRlcnJvcl90ZXh0ID0gaW5wdXQuZXJyb3JfdGV4dFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRpZiAoZXJyb3JfdGV4dCA9PT0gJycgJiYgdGhpcy5lcnJvcl90ZXh0KSB7XG5cdFx0XHRcdGVycm9yX3RleHQgPSB0aGlzLmVycm9yX3RleHQ7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZXJyb3JfdGV4dDtcblx0XHR9XG5cblx0XHR3aWRnZXRGb2N1c0xvc3QoKSB7XG5cdFx0XHRpZiAoc2V0dGluZ3Mub25fYmx1ciAmJiAhdGhpcy53cmFwcGVyLmlzKCcuZm9jdXMnKSkge1xuXHRcdFx0XHRzZXR0aW5ncy5vbkJsdXIoKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRjbGFzcyBLckRvYklucHV0IHtcblx0XHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG5cdFx0XHRjb25zdCBpbnB1dCA9IHRoaXM7XG5cdFx0XHR0aGlzLmRvYmZpZWxkID0gb3B0aW9ucy5rcmRvYmVudHJ5O1xuXHRcdFx0dGhpcy5uYW1lID0gb3B0aW9ucy5uYW1lO1xuXHRcdFx0dGhpcy5pbmRleCA9IG9wdGlvbnMuaW5kZXg7XG5cdFx0XHR0aGlzLmhpbnRfdGV4dCA9IG9wdGlvbnMuaGludF90ZXh0O1xuXHRcdFx0dGhpcy5oYXNfZm9jdXMgPSBmYWxzZTtcblx0XHRcdHRoaXMuZW1wdHkgPSB0cnVlO1xuXHRcdFx0dGhpcy4kaW5wdXQgPSAkKCc8aW5wdXQgdHlwZT1cInRleHRcIiB2YWx1ZT1cIlwiIC8+JykuYWRkQ2xhc3MoJ2pxLWR0ZS0nICsgdGhpcy5uYW1lKS5hdHRyKCdhcmlhLWxhYmVsJywgJycgKyBcIiAoXCIgKyB0aGlzLmhpbnRfdGV4dCArIFwiKVwiKS5mb2N1cygkLnByb3h5KGlucHV0LCAnZm9jdXMnKSkuYmx1cigkLnByb3h5KGlucHV0LCAnYmx1cicpKS5rZXlkb3duKGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdGlucHV0LmtleWRvd24oZSk7XG5cdFx0XHRcdH0sIDIpXG5cdFx0XHR9KS5rZXl1cChmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRpbnB1dC5rZXl1cChlKTtcblx0XHRcdFx0fSwgMilcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGJsdXIoKSB7XG5cdFx0XHR0aGlzLmhhc19mb2N1cyA9IGZhbHNlO1xuXHRcdFx0dGhpcy5kb2JmaWVsZC5mb2N1c091dCgpO1xuXHRcdFx0dGhpcy5zaG93X2hpbnQoKTtcblx0XHRcdHRoaXMuZG9iZmllbGQudmFsaWRhdGUodGhpcyk7XG5cdFx0fVxuXG5cdFx0Y2xlYXJFcnJvcigpIHtcblx0XHRcdGRlbGV0ZSB0aGlzLmVycm9yX3RleHQ7XG5cdFx0XHR0aGlzLiRpbnB1dC5yZW1vdmVDbGFzcygnZXJyb3InKTtcblx0XHR9XG5cblx0XHRmb2N1cygpIHtcblx0XHRcdHRoaXMua2V5X2lzX2Rvd24gPSBmYWxzZTtcblx0XHRcdGlmICh0aGlzLiRpbnB1dC5wcm9wKCdyZWFkb25seScpKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdHRoaXMuaGFzX2ZvY3VzID0gdHJ1ZTtcblx0XHRcdHRoaXMuZG9iZmllbGQuZm9jdXNJbigpO1xuXHRcdFx0aWYgKHRoaXMuJGlucHV0Lmhhc0NsYXNzKCdoaW50JykpIHtcblx0XHRcdFx0dGhpcy4kaW5wdXQudmFsKCcnKS5yZW1vdmVDbGFzcygnaGludCcpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5kb2JmaWVsZC5zaG93RXJyb3IoKTtcblx0XHR9XG5cblx0XHRnZXQoKSB7XG5cdFx0XHRsZXQgdmFsID0gdGhpcy4kaW5wdXQudmFsKCk7XG5cdFx0XHRyZXR1cm4gdmFsID09PSB0aGlzLmhpbnRfdGV4dCA/ICcnIDogdmFsO1xuXHRcdH1cblxuXHRcdGlzRGlnaXRLZXkoZSkge1xuXHRcdFx0bGV0IGtleWNvZGUgPSBlLndoaWNoO1xuXHRcdFx0cmV0dXJuIGtleWNvZGUgPj0gNDggJiYga2V5Y29kZSA8PSA1NyB8fCBrZXljb2RlID49IDk2ICYmIGtleWNvZGUgPD0gMTA1O1xuXHRcdH1cblxuXHRcdGtleWRvd24oKSB7XG5cdFx0XHQvLyBJZ25vcmUga2V5dXAgZXZlbnRzIHRoYXQgYXJyaXZlIGFmdGVyIGZvY3VzIG1vdmVkIHRvIG5leHQgZmllbGRcblx0XHRcdHRoaXMua2V5X2lzX2Rvd24gPSB0cnVlO1xuXHRcdH1cblxuXHRcdGtleXVwKGUpIHtcblx0XHRcdGlmICghdGhpcy5rZXlfaXNfZG93bikge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHQvLyBIYW5kbGUgQmFja3NwYWNlIC0gc2hpZnRpbmcgZm9jdXMgdG8gcHJldmlvdXMgZmllbGQgaWYgcmVxdWlyZWRcblx0XHRcdGxldCBrZXljb2RlID0gZS53aGljaDtcblx0XHRcdGlmIChrZXljb2RlID09PSBrZXkuQkFDS1NQQUNFICYmIHRoaXMuZW1wdHkpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuZG9iZmllbGQuZm9jdXNGaWVsZEJlZm9yZSh0aGlzKTtcblx0XHRcdH1cblx0XHRcdGxldCB0ZXh0ID0gdGhpcy5nZXQoKTtcblx0XHRcdHRoaXMuZW1wdHkgPSB0ZXh0ID09PSAnJztcblxuXHRcdFx0Ly8gVHJhcCBhbmQgZGlzY2FyZCBzZXBhcmF0b3IgY2hhcmFjdGVycyAtIGFkdmFuY2luZyBmb2N1cyBpZiByZXF1aXJlZFxuXHRcdFx0aWYgKHRleHQubWF0Y2goL1tcXC9cXFxcLiAtXS8pKSB7XG5cdFx0XHRcdHRleHQgPSB0ZXh0LnJlcGxhY2UoL1tcXC9cXFxcLiAtXS8sICcnKTtcblx0XHRcdFx0dGhpcy5zZXQodGV4dCk7XG5cdFx0XHRcdGlmICghdGhpcy5lbXB0eSAmJiB0aGlzLmluZGV4IDwgMikge1xuXHRcdFx0XHRcdHRoaXMuZG9iZmllbGQuZm9jdXNGaWVsZEFmdGVyKHRoaXMpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIEFkdmFuY2UgZm9jdXMgaWYgdGhpcyBmaWVsZCBpcyBib3RoIHZhbGlkIGFuZCBmdWxsXG5cdFx0XHRpZiAodGhpcy5kb2JmaWVsZC52YWxpZGF0ZSh0aGlzKSkge1xuXHRcdFx0XHRsZXQgd2FudCA9IHRoaXMubmFtZSA9PT0gJ3llYXInID8gNCA6IDI7XG5cdFx0XHRcdGlmICh0aGlzLmlzRGlnaXRLZXkoZSkgJiYgdGV4dC5sZW5ndGggPT09IHdhbnQpIHtcblx0XHRcdFx0XHR0aGlzLmRvYmZpZWxkLmZvY3VzRmllbGRBZnRlcih0aGlzKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGxlZnQoKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy4kaW5wdXQucG9zaXRpb24oKS5sZWZ0O1xuXHRcdH1cblxuXHRcdHNldChuZXdfdmFsdWUpIHtcblx0XHRcdHRoaXMuJGlucHV0LnZhbChuZXdfdmFsdWUpLnJlbW92ZUNsYXNzKCdoaW50Jyk7XG5cdFx0XHRpZiAoIXRoaXMuaGFzX2ZvY3VzKSB7XG5cdFx0XHRcdHRoaXMuc2hvd19oaW50KCk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLmVtcHR5ID0gbmV3X3ZhbHVlID09PSAnJztcblx0XHRcdHRoaXMuY2xlYXJFcnJvcigpO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fVxuXG5cdFx0c2V0RXJyb3IodGV4dCkge1xuXHRcdFx0dGhpcy5lcnJvcl90ZXh0ID0gdGV4dDtcblx0XHRcdHRoaXMuJGlucHV0LmFkZENsYXNzKCdlcnJvcicpO1xuXHRcdFx0dGhpcy5kb2JmaWVsZC5zaG93RXJyb3IoKTtcblx0XHR9XG5cblx0XHRzZXRGb2N1cyhzZWxlY3RfYWxsKSB7XG5cdFx0XHRsZXQgJGlucHV0ID0gdGhpcy4kaW5wdXQ7XG5cdFx0XHQkaW5wdXQuZm9jdXMoKTtcblx0XHRcdGlmIChzZWxlY3RfYWxsKSB7XG5cdFx0XHRcdCRpbnB1dC5zZWxlY3QoKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdCRpbnB1dC52YWwoJGlucHV0LnZhbCgpKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH1cblxuXHRcdHNldFdpZHRoKG5ld193aWR0aCkge1xuXHRcdFx0dGhpcy4kaW5wdXQud2lkdGgobmV3X3dpZHRoKTtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH1cblxuXHRcdHNob3dfaGludCgpIHtcblx0XHRcdGlmICh0aGlzLmdldCgpID09PSAnJyAmJiB0eXBlb2YgKHRoaXMuaGludF90ZXh0KSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdFx0dGhpcy4kaW5wdXQudmFsKHRoaXMuaGludF90ZXh0KS5hZGRDbGFzcygnaGludCcpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fVxuXG5cdFx0eWllbGRGb2N1cygpIHtcblx0XHRcdHRoaXMuJGlucHV0LmJsdXIoKTtcblx0XHR9XG5cdH1cblxuXHQkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG5cdFx0JCgnLmRvYmlzc3VlJykuZWFjaChmdW5jdGlvbiAoKSB7XG5cdFx0XHRteUtyRG9iRW50cnkgPSBuZXcgS3JEb2JFbnRyeSgkKHRoaXMpLCB7fSk7XG5cdFx0fSk7XG5cdH0pO1xufShqUXVlcnkpKTsiLCIvLyBub2luc3BlY3Rpb24gRHVwbGljYXRlZENvZGVcblxuLyoqXG4gKiBAcGFja2FnZSAgICBLbm93IFJlc2VydmF0aW9uc1xuICogQHN1YnBhY2thZ2UgQWRtaW4gSlNcbiAqIEBjb3B5cmlnaHQgIDIwMjAgSGlnaGxhbmQgVmlzaW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogQGxpY2Vuc2UgICAgU2VlIHRoZSBmaWxlIFwiTElDRU5TRS50eHRcIiBmb3IgdGhlIGZ1bGwgbGljZW5zZSBnb3Zlcm5pbmcgdGhpcyBjb2RlLlxuICogQGF1dGhvciAgICAgSGF6ZWwgV2lsc29uIDxoYXplbEBoaWdobGFuZHZpc2lvbi5jb20+XG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoJCkge1xuXHQkKGZ1bmN0aW9uICgpIHtcblx0XHRpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hvd3RvYXJyaXZlJykpIHtcblx0XHRcdGNvbnN0IGhvd3RvYXJyaXZlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hvd3RvYXJyaXZlJyk7XG5cdFx0XHRsZXQgYXJyaXZhbG1lYW5zID0gaG93dG9hcnJpdmUuZ2V0QXR0cmlidXRlKCdkYXRhLW1lYW5zJyk7XG5cdFx0XHRpZiAoIWFycml2YWxtZWFucykge1xuXHRcdFx0XHRhcnJpdmFsbWVhbnMgPSAnYWlyJztcblx0XHRcdH1cblx0XHRcdGRpc3BsYXlBcnJpdmFsKGFycml2YWxtZWFucyk7XG5cdFx0fVxuXG5cdFx0JCgnYm9keScpLm9uKCdjbGljaycsICcuYW1pdGVtJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGRpc3BsYXlBcnJpdmFsKCQodGhpcykuYXR0cignaWQnKSk7XG5cdFx0fSk7XG5cdH0pO1xuXG5cdGZ1bmN0aW9uIGRpc3BsYXlBcnJpdmFsKHZhbHVlKSB7XG5cdFx0bGV0IHggPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhbWl0ZW0nKTtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHgubGVuZ3RoOyBpKyspIHtcblx0XHRcdHhbaV0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG5cdFx0fVxuXG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Fpci1kYXRhJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndHJhaW4tZGF0YScpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2F1dG8tZGF0YScpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ290aGVyLWRhdGEnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXHRcdGxldCBhcnJpdmFsZGF0YSA9IHZhbHVlICsgJy1kYXRhJztcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZChhcnJpdmFsZGF0YSkuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodmFsdWUpLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqZm9ybV9hcnJpdmFsX21lYW5zJykudmFsdWUgPSB2YWx1ZTtcblx0fVxufSkoalF1ZXJ5KTsiLCIvKipcbiAqIEBwYWNrYWdlICAgIEtub3cgUmVzZXJ2YXRpb25zXG4gKiBAc3VicGFja2FnZSBTaXRlIEpTXG4gKiBAY29weXJpZ2h0ICAyMDIwIEhpZ2hsYW5kIFZpc2lvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIEBsaWNlbnNlICAgIFNlZSB0aGUgZmlsZSBcIkxJQ0VOU0UudHh0XCIgZm9yIHRoZSBmdWxsIGxpY2Vuc2UgZ292ZXJuaW5nIHRoaXMgY29kZS5cbiAqIEBhdXRob3IgICAgIEhhemVsIFdpbHNvbiA8aGF6ZWxAaGlnaGxhbmR2aXNpb24uY29tPlxuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG5pZiAoIXdpbmRvdy5sb2NhdGlvbi5vcmlnaW4pIHtcblx0d2luZG93LmxvY2F0aW9uLm9yaWdpbiA9IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCArIFwiLy9cIiArIHdpbmRvdy5sb2NhdGlvbi5ob3N0O1xufVxuY29uc3QgbGl2ZXNpdGUgPSB3aW5kb3cubG9jYXRpb24ub3JpZ2luICsgJy8nO1xuY29uc3QgbGFuZyA9IFwiZW5cIjtcblxuKGZ1bmN0aW9uICgkKSB7XG5cdGNvbnN0IG1hcmtlcnNoYXBlID0ge1xuXHRcdHR5cGU6ICAgJ3BvbHknLFxuXHRcdGNvb3JkczogWzEsIDEsIDEsIDMyLCAzNywgMzIsIDMyLCAxXVxuXHR9O1xuXG5cdGxldCBteUtybWFwO1xuXHRsZXQgbWFwRGF0YSA9IGZhbHNlO1xuXHRsZXQgbWFwO1xuXHRsZXQgbWFwWm9vbTtcblx0bGV0IGluZm9XaW5kb3c7XG5cdGxldCBpbmZvV2luZG93Mjtcblx0bGV0IGJvdW5kcztcblx0bGV0IHByb3BlcnR5ZGl2O1xuXHRsZXQgcHJvcGVydHlpY29uO1xuXHRsZXQgbWM7XG4vL1x0bGV0IGJpY29uO1xuLy9cdGxldCBoaWNvbjtcbi8vXHRsZXQgbGFyZ2Vfc2xpZGVzaG93ID0gZmFsc2U7XG5cblx0bGV0IHNldHRpbmdzID0ge1xuXHRcdHByb3BlcnR5TWFya2VyczogW10sXG5cdFx0ZmlsdGVySWRzOiAgICAgICBbXSxcblx0XHRtYXBNYXJrZXJzOiAgICAgIFtdLFxuXHRcdG1hcFR5cGVJZDogICAgICAgJycsXG5cdFx0bWFwWm9vbTogICAgICAgICAwLFxuXHRcdG1hcE1heFpvb206ICAgICAgMjAsXG5cdFx0bWFwVHlwZTogICAgICAgICAnJyxcblx0XHRtYXBJZDogICAgICAgICAgICcnLFxuXHRcdG1hcmtlckNvbG9yOiAgICAgJ3JlZCcsXG5cdH07XG5cblx0Y2xhc3MgS3JtYXAge1xuXHRcdGNvbnN0cnVjdG9yKHNldHRpbmdzKSB7XG5cdFx0XHR0aGlzLnNldHRpbmdzID0gc2V0dGluZ3M7XG5cblx0XHRcdC8vSW5pdGlhbGlzZSBtYXAgb3B0aW9uc1xuXHRcdFx0dGhpcy5nbU9wdGlvbnMgPSB7XG5cdFx0XHRcdHNjcm9sbHdoZWVsOiAgICAgICBmYWxzZSxcblx0XHRcdFx0em9vbTogICAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MubWFwWm9vbSxcblx0XHRcdFx0bWF4Wm9vbTogICAgICAgICAgIHRoaXMuc2V0dGluZ3MubWFwTWF4Wm9vbSxcblx0XHRcdFx0bWFwVHlwZUlkOiAgICAgICAgIHRoaXMuc2V0dGluZ3MubWFwVHlwZUlkLFxuXHRcdFx0XHRzdHJlZXRWaWV3Q29udHJvbDogZmFsc2Vcblx0XHRcdH07XG5cblx0XHRcdG1hcFpvb20gPSB0aGlzLnNldHRpbmdzLm1hcFpvb207XG5cdFx0XHR0aGlzLmdtYXJrZXJzID0gW107XG5cdFx0XHR0aGlzLmNvdW50ID0gMDtcblxuXHRcdFx0dGhpcy5pbml0TWFwKCk7XG5cdFx0fVxuXG5cdFx0c3RhdGljIGNsb3NlS3JJbmZvd2luZG93KCkge1xuXHRcdFx0JCgnI2tyLWluZm93aW5kb3cnKS5oaWRlKCk7XG5cdFx0XHRpbmZvV2luZG93LmNsb3NlKCk7XG5cdFx0XHRpbmZvV2luZG93Mi5jbG9zZSgpO1xuXHRcdH1cblxuXHRcdC8vIG9ubHkgc2hvdyB2aXNpYmxlIG1hcmtlcnNcblx0XHRzdGF0aWMgc2hvd1Zpc2libGVNYXJrZXJzKG1hcmtlcnMpIHtcblx0XHRcdGxldCBib3VuZHMgPSBtYXAuZ2V0Qm91bmRzKCk7XG5cdFx0XHRsZXQgY291bnQgPSAwO1xuXG5cdFx0XHRmb3IgKGxldCBkID0gMDsgZCA8IG1hcmtlcnMubGVuZ3RoOyBkKyspIHtcblx0XHRcdFx0bGV0IG1hcmtlciA9IG1hcmtlcnNbZF07XG5cblx0XHRcdFx0aWYgKG1hcmtlci50eXBlID09PSAnbWFwJykge1xuXHRcdFx0XHRcdGlmIChib3VuZHMuY29udGFpbnMobWFya2VyLmdldFBvc2l0aW9uKCkpID09PSB0cnVlKSB7XG5cdFx0XHRcdFx0XHRtYXJrZXIuc2V0VmlzaWJsZSh0cnVlKTtcblx0XHRcdFx0XHRcdGNvdW50Kys7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdG1hcmtlci5zZXRWaXNpYmxlKGZhbHNlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGNvdW50O1xuXHRcdH1cblxuXHRcdC8vIENoZWNrIE1hcmtlcnMgYXJyYXkgZm9yIGR1cGxpY2F0ZSBwb3NpdGlvbiBhbmQgb2Zmc2V0IGEgbGl0dGxlXG5cdFx0Y2hlY2tEdXBsaWNhdGUoY3VycmVudCkge1xuXHRcdFx0aWYgKHRoaXMuZ21hcmtlcnMubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRsZXQgZHVwcyA9IDA7XG5cblx0XHRcdFx0Zm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuZ21hcmtlcnMubGVuZ3RoOyBpbmRleCsrKSB7XG5cdFx0XHRcdFx0bGV0IHBvcyA9IHRoaXMuZ21hcmtlcnNbaW5kZXhdLmdldFBvc2l0aW9uKCk7XG5cdFx0XHRcdFx0aWYgKGN1cnJlbnQuZXF1YWxzKHBvcykpIHtcblx0XHRcdFx0XHRcdGR1cHMrKztcblx0XHRcdFx0XHRcdGxldCBhID0gMzYwLjAgLyBkdXBzO1xuXHRcdFx0XHRcdFx0bGV0IG5ld0xhdCA9IHBvcy5sYXQoKSArIC0uMDAwMDIgKiBNYXRoLmNvcygoK2EgKiBkdXBzKSAvIDE4MCAqIE1hdGguUEkpOyAgLy94XG5cdFx0XHRcdFx0XHRsZXQgbmV3TG5nID0gcG9zLmxuZygpICsgLS4wMDAwMCAqIE1hdGguc2luKCgrYSAqIGR1cHMpIC8gMTgwICogTWF0aC5QSSk7ICAvL1lcblx0XHRcdFx0XHRcdGN1cnJlbnQgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKG5ld0xhdCwgbmV3TG5nKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGN1cnJlbnQ7XG5cdFx0fVxuXG5cdFx0Y2hlY2tab29tKCkge1xuXHRcdFx0aWYgKG1hcFpvb20gPiAwKSB7XG5cdFx0XHRcdGxldCBteWxpc3RlbmVyID0gbWFwLmFkZExpc3RlbmVyKCdpZGxlJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdGNvbnN0IGN1cnJlbnRab29tID0gbWFwLmdldFpvb20oKTtcblx0XHRcdFx0XHRpZiAobWFwWm9vbSA+IDAgJiYgY3VycmVudFpvb20gIT09IG1hcFpvb20pIHtcblx0XHRcdFx0XHRcdG1hcC5zZXRab29tKG1hcFpvb20pO1xuXHRcdFx0XHRcdFx0bXlsaXN0ZW5lci5yZW1vdmUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGNsdXN0ZXJNYXAoKSB7XG5cdFx0XHRjb25zdCBtY09wdGlvbnMgPSB7XG5cdFx0XHRcdGdyaWRTaXplOiAgICAgICAgICAgIDIwLFxuXHRcdFx0XHRtYXhab29tOiAgICAgICAgICAgICB0aGlzLnNldHRpbmdzLm1hcE1heFpvb20gLSAxLFxuXHRcdFx0XHRpbWFnZVBhdGg6ICAgICAgICAgICAnL21lZGlhL2NvbV9rbm93cmVzL2ltYWdlcy9tYXJrZXJjbHVzdGVyZXIvbScsXG5cdFx0XHRcdGlnbm9yZUhpZGRlbk1hcmtlcnM6IHRydWVcblx0XHRcdH07XG5cblx0XHRcdHRoaXMuc2V0UHJvcGVydHlNYXJrZXJzKCk7XG5cdFx0XHR0aGlzLnNldE1hcE1hcmtlcnMoKTtcblxuXHRcdFx0Zm9yIChsZXQgZCA9IDA7IGQgPCB0aGlzLmdtYXJrZXJzLmxlbmd0aDsgZCsrKSB7XG5cdFx0XHRcdGxldCBtYXJrZXIgPSB0aGlzLmdtYXJrZXJzW2RdO1xuXHRcdFx0XHRpZiAobWFya2VyLnR5cGUgPT09ICdwcm9wZXJ0eScpIHtcblx0XHRcdFx0XHRpZiAodGhpcy5zZXR0aW5ncy5maWx0ZXJJZHMuaW5jbHVkZXMobWFya2VyLnBpZCkpIHtcblx0XHRcdFx0XHRcdG1hcmtlci5zZXRWaXNpYmxlKHRydWUpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRtYXJrZXIuc2V0VmlzaWJsZShmYWxzZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdG1jID0gbmV3IE1hcmtlckNsdXN0ZXJlcihtYXAsIHRoaXMuZ21hcmtlcnMsIG1jT3B0aW9ucyk7XG5cdFx0XHRnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYywgXCJjbHVzdGVyY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHQkKCcja3ItaW5mb3dpbmRvdycpLmhpZGUoKTtcblx0XHRcdFx0aW5mb1dpbmRvdy5jbG9zZSgpO1xuXHRcdFx0fSk7XG5cblx0XHRcdG1hcC5maXRCb3VuZHMoYm91bmRzKTtcblxuXHRcdFx0dGhpcy5jaGVja1pvb20oKTtcblx0XHR9XG5cblx0XHQvLyBDcmVhdGUgdGhlIE1hcFxuXHRcdGNyZWF0ZU1hcCgpIHtcblx0XHRcdG1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5zZXR0aW5ncy5tYXBJZCksIHRoaXMuZ21PcHRpb25zKTtcblx0XHRcdGluZm9XaW5kb3cgPSBuZXcgZ29vZ2xlLm1hcHMuSW5mb1dpbmRvdygpO1xuXHRcdFx0aW5mb1dpbmRvdzIgPSBuZXcgZ29vZ2xlLm1hcHMuSW5mb1dpbmRvdygpO1xuXHRcdFx0Ym91bmRzID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZ0JvdW5kcygpO1xuXHRcdH1cblxuXHRcdC8vIENyZWF0ZSB0aGUgbWFya2VyIGFuZCBzZXQgdXAgdGhlIGV2ZW50IHdpbmRvd1xuXHRcdGNyZWF0ZU1hcE1hcmtlcihwb2ludCwgaHRtbCwgaW1hZ2UsIGJveGluZm8sIGxpbmssIHRpdGxlKSB7XG5cdFx0XHRsZXQgbWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XG5cdFx0XHRcdHNoYXBlOiAgICBtYXJrZXJzaGFwZSxcblx0XHRcdFx0bGluazogICAgIGxpbmssXG5cdFx0XHRcdGljb246ICAgICBpbWFnZSxcblx0XHRcdFx0cG9zaXRpb246IHBvaW50LFxuXHRcdFx0XHR0aXRsZTogICAgdGl0bGUsXG5cdFx0XHRcdG1hcDogICAgICBtYXAsXG5cdFx0XHRcdHpJbmRleDogICA5OTlcblx0XHRcdH0pO1xuXG5cdFx0XHRnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYXJrZXIsICdtb3VzZW92ZXInLCAoZnVuY3Rpb24gKGh0bWwpIHtcblx0XHRcdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRpbmZvV2luZG93Mi5zZXRDb250ZW50KGh0bWwpO1xuXHRcdFx0XHRcdGluZm9XaW5kb3cyLm9wZW4obWFwLCBtYXJrZXIpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KShodG1sKSk7XG5cblx0XHRcdGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKG1hcmtlciwgJ21vdXNlb3V0JywgKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRpbmZvV2luZG93Mi5jbG9zZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KSgpKTtcblxuXHRcdFx0Z29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIobWFya2VyLCAnY2xvc2VjbGljaycsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0aW5mb1dpbmRvdzIuY2xvc2UoKTtcblx0XHRcdH0pO1xuXG5cdFx0XHR0aGlzLmdtYXJrZXJzLnB1c2gobWFya2VyKTtcblxuXHRcdFx0dGhpcy5jb3VudCsrO1xuXHRcdH1cblxuXHRcdGNyZWF0ZVByb3BlcnR5TWFya2VyKHBvaW50LCBodG1sLCBib3hpbmZvLCBsaW5rLCB0aXRsZSwgY29sb3IsIGlkLCBpbWFnZSwgcGlkKSB7XG5cdFx0XHRsZXQgbWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XG5cdFx0XHRcdHBvc2l0aW9uOiBwb2ludCxcblx0XHRcdFx0bGluazogICAgIGxpbmssXG5cdFx0XHRcdG1hcDogICAgICBtYXAsXG5cdFx0XHRcdGljb246ICAgICBpbWFnZSxcblx0XHRcdFx0dGl0bGU6ICAgIHRpdGxlLFxuXHRcdFx0XHRwaWQ6ICAgICAgcGlkLFxuXHRcdFx0XHR0eXBlOiAgICAgJ3Byb3BlcnR5Jyxcblx0XHRcdFx0ekluZGV4OiAgIHRoaXMuY291bnQgKyAxMDAwXG5cdFx0XHR9KTtcblxuXHRcdFx0cHJvcGVydHlkaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG5cdFx0XHQvLyBpZiAocHJvcGVydHlkaXYgIT09IG51bGwpIHtcblx0XHRcdC8vIFx0Z29vZ2xlLm1hcHMuZXZlbnQuYWRkRG9tTGlzdGVuZXIocHJvcGVydHlkaXYsICdtb3VzZW92ZXInLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHQvLyBcdFx0bWFya2VyLnNldEljb24oXG5cdFx0XHQvLyBcdFx0XHRoaWNvblxuXHRcdFx0Ly8gXHRcdClcblx0XHRcdC8vIFx0XHRtYXJrZXIuc2V0WkluZGV4KG1hcmtlci5nZXRaSW5kZXgoKSArIDEwMDApO1xuXHRcdFx0Ly8gXHR9KTtcblx0XHRcdC8vIFx0Z29vZ2xlLm1hcHMuZXZlbnQuYWRkRG9tTGlzdGVuZXIocHJvcGVydHlkaXYsICdtb3VzZW91dCcsIGZ1bmN0aW9uICgpIHtcblx0XHRcdC8vIFx0XHRtYXJrZXIuc2V0SWNvbihcblx0XHRcdC8vIFx0XHRcdGJpY29uXG5cdFx0XHQvLyBcdFx0KVxuXHRcdFx0Ly8gXHRcdG1hcmtlci5zZXRaSW5kZXgobWFya2VyLmdldFpJbmRleCgpIC0gMTAwMCk7XG5cdFx0XHQvLyBcdH0pO1xuXHRcdFx0Ly8gfVxuXG5cdFx0XHQvLyBtYXJrZXIuYWRkTGlzdGVuZXIoJ21vdXNlb3ZlcicsIChmdW5jdGlvbiAoKSB7XG5cdFx0XHQvLyBcdG1hcmtlci5zZXRJY29uKFxuXHRcdFx0Ly8gXHRcdGhpY29uXG5cdFx0XHQvLyBcdClcblx0XHRcdC8vIFx0bWFya2VyLnNldFpJbmRleChtYXJrZXIuZ2V0WkluZGV4KCkgKyAxMDAwKTtcblx0XHRcdC8vIH0pKTtcblx0XHRcdC8vXG5cdFx0XHQvLyBtYXJrZXIuYWRkTGlzdGVuZXIoJ21vdXNlb3V0JywgKGZ1bmN0aW9uICgpIHtcblx0XHRcdC8vIFx0bWFya2VyLnNldEljb24oXG5cdFx0XHQvLyBcdFx0Ymljb25cblx0XHRcdC8vIFx0KVxuXHRcdFx0Ly8gXHRtYXJrZXIuc2V0WkluZGV4KG1hcmtlci5nZXRaSW5kZXgoKSAtIDEwMDApO1xuXHRcdFx0Ly8gfSkpO1xuXG5cdFx0XHQvLyBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYXJrZXIsICdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHRcdFx0Ly8gXHRtYXJrZXIuc2V0VmlzaWJsZShmYWxzZSk7IC8vIG1hcHMgQVBJIGhpZGUgY2FsbFxuXHRcdFx0Ly8gfSk7XG5cblx0XHRcdG1hcmtlci5hZGRMaXN0ZW5lcignbW91c2Vkb3duJywgKGZ1bmN0aW9uIChib3hpbmZvKSB7XG5cdFx0XHRcdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0aW5mb1dpbmRvdy5jbG9zZSgpO1xuXHRcdFx0XHRcdCQoJyNrci1pbmZvd2luZG93JykuaGlkZSgpO1xuXHRcdFx0XHRcdGluZm9XaW5kb3cuc2V0Q29udGVudChodG1sKTtcblx0XHRcdFx0XHRpbmZvV2luZG93Lm9wZW4obWFwLCBtYXJrZXIpO1xuXG5cdFx0XHRcdFx0JC5hamF4KHtcblx0XHRcdFx0XHRcdHR5cGU6ICAgIFwiUE9TVFwiLFxuXHRcdFx0XHRcdFx0dXJsOiAgICAgbGl2ZXNpdGUgKyAnaW5kZXgucGhwP29wdGlvbj1jb21fa25vd3JlcyZ0YXNrPXByb3BlcnR5Lm1hcGluZm93aW5kb3cmbGFuZz0nICsgbGFuZyxcblx0XHRcdFx0XHRcdGRhdGE6ICAgIHtcblx0XHRcdFx0XHRcdFx0aWQ6IHBhcnNlSW50KGJveGluZm8pXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0c3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcblx0XHRcdFx0XHRcdFx0JCgnI2tyLWluZm93aW5kb3cnKS5mYWRlSW4oNDAwKS5odG1sKGRhdGEpLnNob3coKTtcblx0XHRcdFx0XHRcdFx0JCgnLmtyLWluZm93aW5kb3ctc2xpZGVzaG93Jykubm90KCcuc2xpY2staW5pdGlhbGl6ZWQnKS5zbGljayh7XG5cdFx0XHRcdFx0XHRcdFx0bmV4dEFycm93OiAnPGkgY2xhc3M9XCJzbGljay1uYXYgbmV4dCBmYXMgZmEtY2hldnJvbi1yaWdodCBcIj48L2k+Jyxcblx0XHRcdFx0XHRcdFx0XHRwcmV2QXJyb3c6ICc8aSBjbGFzcz1cInNsaWNrLW5hdiBwcmV2IGZhcyBmYS1jaGV2cm9uLWxlZnQgXCI+PC9pPicsXG5cdFx0XHRcdFx0XHRcdFx0YXV0b3BsYXk6ICB0cnVlXG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9O1xuXHRcdFx0fSkoYm94aW5mbykpO1xuXG5cdFx0XHRnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYXJrZXIsICdjbG9zZWNsaWNrJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHQkKCcja3ItaW5mb3dpbmRvdycpLmhpZGUoKTtcblx0XHRcdFx0aW5mb1dpbmRvdy5jbG9zZSgpO1xuXHRcdFx0fSk7XG5cblx0XHRcdHRoaXMuZ21hcmtlcnMucHVzaChtYXJrZXIpO1xuXHRcdFx0Ym91bmRzLmV4dGVuZChwb2ludCk7XG5cblx0XHRcdHRoaXMuY291bnQrKztcblx0XHR9XG5cblx0XHQvL0luaXRpYWxpc2UgbWFwXG5cdFx0aW5pdE1hcCgpIHtcblx0XHRcdHRoaXMuY3JlYXRlTWFwKCk7XG4vL1x0XHRcdHRoaXMuc2V0TWFya2VySWNvbnMoKTtcblxuXHRcdFx0aWYgKHRoaXMuc2V0dGluZ3MubWFwVHlwZSA9PT0gJ2NsdXN0ZXInKSB7XG5cdFx0XHRcdHRoaXMuY2x1c3Rlck1hcCgpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5zb2xvTWFwKCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gUmVzZXQgbWFwIHRvIGluaXRpYWwgc3RhdGVcblx0XHRyZWZyZXNoTWFwKCRtYXBtb2RhbCkge1xuXHRcdFx0aWYgKHRoaXMuc2V0dGluZ3MubWFwVHlwZSA9PT0gJ3NvbG8nKVxuXHRcdFx0XHRyZXR1cm47XG5cblx0XHRcdGxldCBzZWxmID0gdGhpcztcblx0XHRcdGpRdWVyeS5hamF4KHtcblx0XHRcdFx0dXJsOiAgICAgIGxpdmVzaXRlICsgJ2luZGV4LnBocD9vcHRpb249Y29tX2tub3dyZXMmdGFzaz1wcm9wZXJ0aWVzLnJlZnJlc2htYXAmbGFuZz0nICsgbGFuZyxcblx0XHRcdFx0dHlwZTogICAgIFwiUE9TVFwiLFxuXHRcdFx0XHRkYXRhVHlwZTogXCJqc29uXCIsXG5cdFx0XHRcdHN1Y2Nlc3M6ICBmdW5jdGlvbiAocmVzdWx0KSB7XG5cdFx0XHRcdFx0aWYgKHJlc3VsdC5zdWNjZXNzKSB7XG5cdFx0XHRcdFx0XHRzZWxmLnNldHRpbmdzLmZpbHRlcklkcyA9IHJlc3VsdC5kYXRhLmZpbHRlcklkcztcblx0XHRcdFx0XHRcdGZvciAobGV0IGQgPSAwOyBkIDwgc2VsZi5nbWFya2Vycy5sZW5ndGg7IGQrKykge1xuXHRcdFx0XHRcdFx0XHRsZXQgbWFya2VyID0gc2VsZi5nbWFya2Vyc1tkXTtcblx0XHRcdFx0XHRcdFx0aWYgKG1hcmtlci50eXBlID09PSAncHJvcGVydHknKSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKHNlbGYuc2V0dGluZ3MuZmlsdGVySWRzLmluY2x1ZGVzKG1hcmtlci5waWQpKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRtYXJrZXIuc2V0VmlzaWJsZSh0cnVlKTtcblx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0bWFya2VyLnNldFZpc2libGUoZmFsc2UpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRtYy5yZXBhaW50KCk7XG5cdFx0XHRcdFx0XHRuZXcgRm91bmRhdGlvbi5SZXZlYWwoJG1hcG1vZGFsKTtcblx0XHRcdFx0XHRcdCRtYXBtb2RhbC5mb3VuZGF0aW9uKCdvcGVuJyk7XG5cdFx0XHRcdFx0XHRnb29nbGUubWFwcy5ldmVudC50cmlnZ2VyKG1hcCwgJ3Jlc2l6ZScpO1xuXHRcdFx0XHRcdFx0JG1hcG1vZGFsLmZvdW5kYXRpb24oJ29wZW4nKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0YWxlcnQocmVzdWx0Lm1lc3NhZ2UpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0Ly8gUmVzZXQgbWFwIHRvIGluaXRpYWwgc3RhdGVcblx0XHRyZXNldE1hcCgpIHtcblx0XHRcdGluZm9XaW5kb3cuY2xvc2UoKTtcblx0XHRcdGluZm9XaW5kb3cyLmNsb3NlKCk7XG5cdFx0XHQkKCcja3ItaW5mb3dpbmRvdycpLmhpZGUoKTtcblx0XHRcdG1hcC5maXRCb3VuZHMoYm91bmRzKTtcblxuXHRcdFx0dGhpcy5jaGVja1pvb20oKTtcblx0XHR9XG5cblx0XHQvLyBsb29wIHRvIHNldCBtYXAgbWFya2Vyc1xuXHRcdHNldE1hcE1hcmtlcnMoKSB7XG5cdFx0XHRsZXQgcG9pbnQ7XG5cdFx0XHRsZXQgYW1hcms7XG5cblx0XHRcdGZvciAobGV0IGQgPSAwOyBkIDwgdGhpcy5zZXR0aW5ncy5tYXBNYXJrZXJzLmxlbmd0aDsgZCsrKSB7XG5cdFx0XHRcdGFtYXJrID0gdGhpcy5zZXR0aW5ncy5tYXBNYXJrZXJzW2RdO1xuXG5cdFx0XHRcdGxldCBtYXJrZXJpY29uID0ge1xuXHRcdFx0XHRcdHVybDogIGFtYXJrWydpY29uJ10sXG5cdFx0XHRcdFx0c2l6ZTogbmV3IGdvb2dsZS5tYXBzLlNpemUoMzIsIDM3KSxcblx0XHRcdFx0XHQvLyBPUiBzY2FsZWRTaXplOiBuZXcgZ29vZ2xlLm1hcHMuU2l6ZSg0MCwgNDcpXG5cdFx0XHRcdFx0b3JpZ2luOiBuZXcgZ29vZ2xlLm1hcHMuUG9pbnQoMCwgMCksXG5cdFx0XHRcdFx0YW5jaG9yOiBuZXcgZ29vZ2xlLm1hcHMuUG9pbnQoMCwgMTgpXG5cdFx0XHRcdH07XG5cblx0XHRcdFx0cG9pbnQgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKGFtYXJrWydsYXQnXSwgYW1hcmtbJ2xuZyddKTtcblx0XHRcdFx0cG9pbnQgPSB0aGlzLmNoZWNrRHVwbGljYXRlKHBvaW50KTtcblx0XHRcdFx0dGhpcy5jcmVhdGVNYXBNYXJrZXIocG9pbnQsIGFtYXJrWydodG1sJ10sIG1hcmtlcmljb24sICcnLCAnJywgYW1hcmtbJ3RpdGxlJ10pO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIHNldE1hcmtlckljb25zKCkge1xuXHRcdC8vIFx0Ymljb24gPSB7XG5cdFx0Ly8gXHRcdHBhdGg6ICAgICAgICAgJy9tZWRpYS9jb21fa25vd3Jlcy9hc3NldHMvaW1hZ2VzL3N2ZycsXG5cdFx0Ly8gXHRcdGZpbGxDb2xvcjogICAgdGhpcy5zZXR0aW5ncy5tYXJrZXJDb2xvcixcblx0XHQvLyBcdFx0ZmlsbE9wYWNpdHk6ICAwLjksXG5cdFx0Ly8gXHRcdGFuY2hvcjogICAgICAgbmV3IGdvb2dsZS5tYXBzLlBvaW50KDksIDM1KSxcblx0XHQvLyBcdFx0c3Ryb2tlQ29sb3I6ICBcIiNlZmVmZWZcIixcblx0XHQvLyBcdFx0c3Ryb2tlV2VpZ2h0OiAwLjUsXG5cdFx0Ly8gXHRcdHNjYWxlOiAgICAgICAgMVxuXHRcdC8vIFx0fTtcblx0XHQvLyBcdGhpY29uID0ge1xuXHRcdC8vIFx0XHRwYXRoOiAgICAgICAgICcvbWVkaWEvY29tX2tub3dyZXMvYXNzZXRzL2ltYWdlcy9zdmcnLFxuXHRcdC8vIFx0XHRmaWxsQ29sb3I6ICAgIFwiZ3JlZW5cIixcblx0XHQvLyBcdFx0ZmlsbE9wYWNpdHk6ICAxLFxuXHRcdC8vIFx0XHRhbmNob3I6ICAgICAgIG5ldyBnb29nbGUubWFwcy5Qb2ludCg5LCAzNSksXG5cdFx0Ly8gXHRcdHN0cm9rZUNvbG9yOiAgXCIjZWZlZmVmXCIsXG5cdFx0Ly8gXHRcdHN0cm9rZVdlaWdodDogMC44LFxuXHRcdC8vIFx0XHRzY2FsZTogICAgICAgIDEuNVxuXHRcdC8vIFx0fTtcblx0XHQvLyB9XG5cblx0XHQvLyBsb29wIHRvIHNldCBwcm9wZXJ0eSBtYXJrZXJzXG5cdFx0c2V0UHJvcGVydHlNYXJrZXJzKCkge1xuXHRcdFx0bGV0IHBvaW50O1xuXHRcdFx0bGV0IGFtYXJrO1xuXG5cdFx0XHRmb3IgKGxldCBkID0gMDsgZCA8IHRoaXMuc2V0dGluZ3MucHJvcGVydHlNYXJrZXJzLmxlbmd0aDsgZCsrKSB7XG5cdFx0XHRcdGFtYXJrID0gdGhpcy5zZXR0aW5ncy5wcm9wZXJ0eU1hcmtlcnNbZF07XG5cblx0XHRcdFx0aWYgKCFkKSB7XG5cdFx0XHRcdFx0cHJvcGVydHlpY29uID0ge1xuXHRcdFx0XHRcdFx0dXJsOiAgICBhbWFya1snaWNvbiddLFxuXHRcdFx0XHRcdFx0c2l6ZTogICBuZXcgZ29vZ2xlLm1hcHMuU2l6ZSgzMiwgMzcpLFxuXHRcdFx0XHRcdFx0b3JpZ2luOiBuZXcgZ29vZ2xlLm1hcHMuUG9pbnQoMCwgMCksXG5cdFx0XHRcdFx0XHRhbmNob3I6IG5ldyBnb29nbGUubWFwcy5Qb2ludCgwLCAyMClcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cG9pbnQgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKGFtYXJrWydsYXQnXSwgYW1hcmtbJ2xuZyddKTtcblx0XHRcdFx0cG9pbnQgPSB0aGlzLmNoZWNrRHVwbGljYXRlKHBvaW50KTtcblx0XHRcdFx0dGhpcy5jcmVhdGVQcm9wZXJ0eU1hcmtlcihwb2ludCwgYW1hcmtbJ2h0bWwnXSwgYW1hcmtbJ2JveGluZm8nXSwgYW1hcmtbJ2xpbmsnXSwgYW1hcmtbJ3RpdGxlJ10sIGFtYXJrWydjb2xvciddLCBhbWFya1snaWQnXSwgcHJvcGVydHlpY29uLCBhbWFya1sncGlkJ10pO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHNvbG9NYXAoKSB7XG5cdFx0XHR0aGlzLnNldFByb3BlcnR5TWFya2VycygpO1xuXHRcdFx0dGhpcy5zZXRNYXBNYXJrZXJzKCk7XG5cblx0XHRcdG1hcC5maXRCb3VuZHMoYm91bmRzKTtcblx0XHRcdHRoaXMuY2hlY2tab29tKCk7XG5cblx0XHRcdGlmICh0aGlzLnNldHRpbmdzLm1hcE1hcmtlcnMubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRjb25zdCBzZWxmID0gdGhpcztcblxuXHRcdFx0XHRsZXQgbXlMaXN0ZW5lciA9IGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKG1hcCwgJ2lkbGUnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0bGV0IGZvdW5kID0gMDtcblx0XHRcdFx0XHRsZXQgY3VycmVudFpvb20gPSBtYXAuZ2V0Wm9vbSgpO1xuXG5cdFx0XHRcdFx0d2hpbGUgKCFmb3VuZCkge1xuXHRcdFx0XHRcdFx0Zm91bmQgPSBLcm1hcC5zaG93VmlzaWJsZU1hcmtlcnMoc2VsZi5nbWFya2Vycyk7XG5cblx0XHRcdFx0XHRcdGlmIChmb3VuZCkge1xuXHRcdFx0XHRcdFx0XHRteUxpc3RlbmVyLnJlbW92ZSgpO1xuXHRcdFx0XHRcdFx0XHRtYXAuc2V0Wm9vbShjdXJyZW50Wm9vbSk7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRjdXJyZW50Wm9vbSA9IGN1cnJlbnRab29tIC0gMTtcblx0XHRcdFx0XHRcdGlmIChjdXJyZW50Wm9vbSA8IDEwKSB7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0JChmdW5jdGlvbiAoKSB7XG5cdFx0bGV0ICRtYXBtb2RhbDtcblxuXHRcdCQoJ2JvZHknKS5vbignY2xpY2snLCAnLm1hcC10cmlnZ2VyJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGlmIChtYXBEYXRhKSB7XG5cdFx0XHRcdG15S3JtYXAucmVmcmVzaE1hcCgkbWFwbW9kYWwpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0a2lja01hcCgkKHRoaXMpKTtcblx0XHRcdFx0JG1hcG1vZGFsID0gJCgnI2tyLXNlYXJjaC1tYXAtbW9kYWwnKTtcblx0XHRcdFx0bmV3IEZvdW5kYXRpb24uUmV2ZWFsKCRtYXBtb2RhbCk7XG5cdFx0XHRcdCRtYXBtb2RhbC5mb3VuZGF0aW9uKCdvcGVuJyk7XG5cdFx0XHR9XG5cdFx0fSkub24oJ2NsaWNrJywgJy5yZXNldG1hcCcsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRteUtybWFwLnJlc2V0TWFwKCk7XG5cdFx0fSkub24oJ2NsaWNrJywgJyNrci1zZWFyY2gtbWFwLWZ1bGwtaW5mb3dpbmRvdy1jbG9zZScsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRLcm1hcC5jbG9zZUtySW5mb3dpbmRvdygpO1xuXHRcdH0pLm9uKCdjbGljaycsICcuY2xvc2VtYXAnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0JG1hcG1vZGFsLmZvdW5kYXRpb24oJ2Nsb3NlJyk7XG5cdFx0XHQkLmFqYXgoe1xuXHRcdFx0XHR0eXBlOiAgICBcIlBPU1RcIixcblx0XHRcdFx0dXJsOiAgICAgbGl2ZXNpdGUgKyAnaW5kZXgucGhwP29wdGlvbj1jb21fa25vd3JlcyZ0YXNrPXByb3BlcnRpZXMubWFwc2Vzc2lvbiZsYW5nPScgKyBsYW5nLFxuXHRcdFx0XHRzdWNjZXNzOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0pLm9uKCdvcGVuLnpmLnJldmVhbCcsICcja3Itc2VhcmNoLW1hcC1tb2RhbCcsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHQkKCcja3Itc2VhcmNoLW1hcC1mdWxsJykuaGVpZ2h0KCQoJyNrci1zZWFyY2gtbWFwLW1vZGFsJykuaGVpZ2h0KCkpO1xuXHRcdFx0Z29vZ2xlLm1hcHMuZXZlbnQudHJpZ2dlcihtYXAsIFwicmVzaXplXCIpO1xuXHRcdFx0JC5hamF4KHtcblx0XHRcdFx0dHlwZTogICAgXCJQT1NUXCIsXG5cdFx0XHRcdHVybDogICAgIGxpdmVzaXRlICsgJ2luZGV4LnBocD9vcHRpb249Y29tX2tub3dyZXMmdGFzaz1wcm9wZXJ0aWVzLm1hcHNlc3Npb24mbGFuZz0nICsgbGFuZyxcblx0XHRcdFx0ZGF0YTogICAge21hcF9tb2RhbDogJzEnfSxcblx0XHRcdFx0c3VjY2VzczogZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9KTtcblxuXHRcdC8vIERvZXNuJ3QgdHJpZ2dlciBpZiBpbmNsdWRlZCBhYm92ZSA/P1xuXHRcdGlmICghbWFwRGF0YSkge1xuXHRcdFx0Y29uc3QgJHNvbG9UcmlnZ2VyID0gJCgnI2tyLW1hcC1zb2xvLXRyaWdnZXInKTtcblx0XHRcdCRzb2xvVHJpZ2dlci5vbmUoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRraWNrTWFwKCRzb2xvVHJpZ2dlcik7XG5cdFx0XHR9KTtcblxuXHRcdFx0aWYgKHdpbmRvdy5sb2NhdGlvbi5ocmVmLmluZGV4T2YoJyNtYXAnKSAhPT0gLTEgJiYgJHNvbG9UcmlnZ2VyLmxlbmd0aCkge1xuXHRcdFx0XHRraWNrTWFwKCRzb2xvVHJpZ2dlcik7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gVGVzdCBmb3IgZm9yY2UgbWFwXG5cdFx0Y29uc3QgJHRyaWdnZXIgPSAkKCcubWFwLXRyaWdnZXInKTtcblx0XHRpZiAoJHRyaWdnZXIuZGF0YSgnZm9yY2VtYXAnKSkge1xuXHRcdFx0JHRyaWdnZXIudHJpZ2dlcignY2xpY2snKTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBraWNrTWFwKCRlbGVtKSB7XG5cdFx0XHRjb25zdCB0eXBlID0gJGVsZW0uZGF0YSgndHlwZScpO1xuXHRcdFx0bGV0IHBpZCA9IDA7XG5cdFx0XHRpZiAodHlwZSA9PT0gJ3NvbG8nKSB7XG5cdFx0XHRcdHBpZCA9ICRlbGVtLmRhdGEoJ3BpZCcpO1xuXHRcdFx0fVxuXG5cdFx0XHRqUXVlcnkuYWpheCh7XG5cdFx0XHRcdHVybDogICAgICBsaXZlc2l0ZSArICdpbmRleC5waHA/b3B0aW9uPWNvbV9rbm93cmVzJnRhc2s9cHJvcGVydGllcy5tYXBkYXRhJnBpZD0nICsgcGlkICsgJyZsYW5nPScgKyBsYW5nLFxuXHRcdFx0XHR0eXBlOiAgICAgXCJQT1NUXCIsXG5cdFx0XHRcdGRhdGFUeXBlOiBcImpzb25cIixcblx0XHRcdFx0c3VjY2VzczogIGZ1bmN0aW9uIChyZXN1bHQpIHtcblx0XHRcdFx0XHRpZiAocmVzdWx0LnN1Y2Nlc3MpIHtcblx0XHRcdFx0XHRcdHNldHRpbmdzID0ge1xuXHRcdFx0XHRcdFx0XHRtYXBJZDogICAgICAgICAgICRlbGVtLmRhdGEoJ3RhcmdldCcpLFxuXHRcdFx0XHRcdFx0XHRtYXBUeXBlOiAgICAgICAgICRlbGVtLmRhdGEoJ3R5cGUnKSxcblx0XHRcdFx0XHRcdFx0bWFwVHlwZUlkOiAgICAgICAkZWxlbS5kYXRhKCdtYXB0eXBlaWQnKSxcblx0XHRcdFx0XHRcdFx0bWFwWm9vbTogICAgICAgICBwYXJzZUludCgkZWxlbS5kYXRhKCd6b29tJykpLFxuXHRcdFx0XHRcdFx0XHRtYXBNYXhab29tOiAgICAgIHBhcnNlSW50KCRlbGVtLmRhdGEoJ3pvb21tYXgnKSksXG5cdFx0XHRcdFx0XHRcdHByb3BlcnR5TWFya2VyczogcmVzdWx0LmRhdGEucHJvcGVydHlNYXJrZXJzLFxuXHRcdFx0XHRcdFx0XHRtYXBNYXJrZXJzOiAgICAgIHJlc3VsdC5kYXRhLm1hcE1hcmtlcnMsXG5cdFx0XHRcdFx0XHRcdGZpbHRlcklkczogICAgICAgcmVzdWx0LmRhdGEuZmlsdGVySWRzXG5cdFx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0XHRteUtybWFwID0gbmV3IEtybWFwKHNldHRpbmdzKTtcblx0XHRcdFx0XHRcdG1hcERhdGEgPSB0cnVlO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRhbGVydChyZXN1bHQubWVzc2FnZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cdH0pO1xufShqUXVlcnkpKTsiLCIvKipcbiAqIEBwYWNrYWdlICAgIEtub3cgUmVzZXJ2YXRpb25zXG4gKiBAc3VicGFja2FnZSBTaXRlIEpTXG4gKiBAY29weXJpZ2h0ICAyMDIwIEhpZ2hsYW5kIFZpc2lvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIEBsaWNlbnNlICAgIFNlZSB0aGUgZmlsZSBcIkxJQ0VOU0UudHh0XCIgZm9yIHRoZSBmdWxsIGxpY2Vuc2UgZ292ZXJuaW5nIHRoaXMgY29kZS5cbiAqIEBhdXRob3IgICAgIEhhemVsIFdpbHNvbiA8aGF6ZWxAaGlnaGxhbmR2aXNpb24uY29tPlxuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24gKCQpIHtcblx0bGV0IG15S3Jyb3V0ZTtcblx0bGV0IGRpcmVjdGlvbnNEaXNwbGF5O1xuXHRsZXQgZGlyZWN0aW9uc1Zpc2libGUgPSBmYWxzZTtcblx0bGV0IHJvdXRlTWFwO1xuXHRsZXQgb3JpZ2luO1xuXHRsZXQgZGVzdGluYXRpb247XG5cdGxldCByb3V0ZU1hcmtlcnMgPSBbXTtcblx0bGV0IHJvdXRlU3RvcFBvaW50cyA9IFtdO1xuXHRsZXQgcG9pbnQ7XG5cdGxldCBzZWxmO1xuXG5cdGxldCBzZXR0aW5ncyA9IHtcblx0XHRsYXQ6ICAgICAgICAgICAgICAgXCJcIixcblx0XHRsbmc6ICAgICAgICAgICAgICAgXCJcIixcblx0XHRuYW1lOiAgICAgICAgICAgICAgXCJcIixcblx0XHRpY29uOiAgICAgICAgICAgICAgXCJcIixcblx0XHRkZXRvdXI6ICAgICAgICAgICAgXCJcIixcblx0XHRtYXBab29tOiAgICAgICAgICAgOSxcblx0XHRtYXBNYXhab29tOiAgICAgICAgMjAsXG5cdFx0bWFwVHlwZUlkOiAgICAgICAgIFwicm9hZG1hcFwiLFxuXHRcdG1hcElkOiAgICAgICAgICAgICBcImtyLW1hcC1yb3V0ZVwiLFxuXHRcdGRpcmVjdGlvbnNQYW5lbDogICBcImtyLWRpcmVjdGlvbnMtcGFuZWxcIixcblx0XHRkaXJlY3Rpb25zU2VydmljZTogbnVsbFxuXHR9O1xuXG5cdGNsYXNzIEtycm91dGUge1xuXHRcdGNvbnN0cnVjdG9yKCRlbGVtZW50LCBvcHRpb25zKSB7XG5cdFx0XHR0aGlzLnNldHRpbmdzID0gc2V0dGluZ3M7XG5cdFx0XHRpZiAob3B0aW9ucykge1xuXHRcdFx0XHQkLmV4dGVuZCh0aGlzLnNldHRpbmdzLCBvcHRpb25zKTtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5zZXR0aW5ncy5kaXJlY3Rpb25zU2VydmljZSA9IG5ldyBnb29nbGUubWFwcy5EaXJlY3Rpb25zU2VydmljZSgpO1xuXHRcdFx0dGhpcy5pbml0KCk7XG5cdFx0fVxuXG5cdFx0c3RhdGljIGNsZWFyUm91dGVNYXJrZXJzKCkge1xuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCByb3V0ZU1hcmtlcnMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0cm91dGVNYXJrZXJzW2ldLnNldE1hcChudWxsKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRzdGF0aWMgY2xlYXJXYXlwb2ludHMoKSB7XG5cdFx0XHRvcmlnaW4gPSBudWxsO1xuXHRcdFx0cm91dGVNYXJrZXJzID0gW107XG5cdFx0XHRyb3V0ZVN0b3BQb2ludHMgPSBbXTtcblx0XHRcdGRpcmVjdGlvbnNWaXNpYmxlID0gZmFsc2U7XG5cdFx0fVxuXG5cdFx0YWRkUm91dGVNYXJrZXIobGF0bG5nKSB7XG5cdFx0XHRyb3V0ZU1hcmtlcnMucHVzaChuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcblx0XHRcdFx0cG9zaXRpb246IGxhdGxuZyxcblx0XHRcdFx0bWFwOiAgICAgIHJvdXRlTWFwLFxuXHRcdFx0XHRpY29uOiAgICAgdGhpcy5zZXR0aW5ncy5kZXRvdXJcblx0XHRcdH0pKTtcblx0XHR9XG5cblx0XHQvL1xuXHRcdC8vIGFkZFByb3BlcnR5TWFya2VyKHBvaW50LCBodG1sLCBpbWFnZSwgYm94aW5mbykge1xuXHRcdC8vIFx0bGV0IG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xuXHRcdC8vIFx0XHRwb3NpdGlvbjogcG9pbnQsXG5cdFx0Ly8gXHRcdGh0bWw6ICAgICBodG1sLFxuXHRcdC8vIFx0XHRtYXA6ICAgICAgcm91dGVNYXAsXG5cdFx0Ly8gXHRcdGljb246ICAgICBpbWFnZSxcblx0XHQvLyBcdFx0ekluZGV4OiAgIDFcblx0XHQvLyBcdH0pO1xuXHRcdC8vXG5cdFx0Ly8gXHRsZXQgaW5mb3dpbmRvdyA9IG5ldyBnb29nbGUubWFwcy5JbmZvV2luZG93KHtcblx0XHQvLyBcdFx0Y29udGVudDogYm94aW5mb1xuXHRcdC8vIFx0fSk7XG5cdFx0Ly9cblx0XHQvLyBcdGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKG1hcmtlciwgJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuXHRcdC8vIFx0XHQvLyBDaGVjayB0byBzZWUgaWYgdGhlcmUgaXMgYW4gaW5mbyB3aW5kb3cgc3RvcmVkIGluIHJvdXRlQ3VyckluZm9XaW5kb3csXG5cdFx0Ly8gXHRcdC8vIGlmIHRoZXJlIGlzLCB3ZSB1c2UgLmNsb3NlKCkgdG8gaGlkZSB0aGUgd2luZG93XG5cdFx0Ly8gXHRcdGlmIChyb3V0ZUN1cnJJbmZvV2luZG93KSB7XG5cdFx0Ly8gXHRcdFx0cm91dGVDdXJySW5mb1dpbmRvdy5jbG9zZSgpO1xuXHRcdC8vIFx0XHR9XG5cdFx0Ly8gXHRcdC8vIFB1dCBvdXIgbmV3IGluZm8gd2luZG93IGluIHRvIHRoZSByb3V0ZUN1cnJJbmZvV2luZG93IHZhcmlhYmxlXG5cdFx0Ly8gXHRcdHJvdXRlQ3VyckluZm9XaW5kb3cgPSBpbmZvd2luZG93O1xuXHRcdC8vIFx0XHQvLyBPcGVuIHRoZSB3aW5kb3dcblx0XHQvLyBcdFx0aW5mb3dpbmRvdy5vcGVuKHJvdXRlTWFwLCBtYXJrZXIpO1xuXHRcdC8vIFx0fSk7XG5cdFx0Ly9cblx0XHQvLyBcdC8vZ21hcmtlcnMucHVzaCggbWFya2VyICk7XG5cdFx0Ly8gXHRyb3V0ZU1hcmtlcnMucHVzaChtYXJrZXIpO1xuXHRcdC8vIH1cblxuXHRcdC8vIHN0YXRpYyB1cGRhdGVNb2RlKCkge1xuXHRcdC8vIFx0aWYgKGRpcmVjdGlvbnNWaXNpYmxlKSB7XG5cdFx0Ly8gXHRcdHRoaXMuY2FsY1JvdXRlKCk7XG5cdFx0Ly8gXHR9XG5cdFx0Ly8gfVxuXG5cdFx0Y2FsY1JvdXRlKCkge1xuXHRcdFx0bGV0IGZyb21fYWRkcmVzcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZnJvbV9hZGRyZXNzXCIpLnZhbHVlO1xuXHRcdFx0bGV0IG9yaWdpbiA9IFwiXCI7XG5cblx0XHRcdGlmIChmcm9tX2FkZHJlc3MgPT09IFwiQWRkcmVzc1wiKSBmcm9tX2FkZHJlc3MgPSBcIlwiO1xuXHRcdFx0aWYgKGZyb21fYWRkcmVzcykgb3JpZ2luID0gZnJvbV9hZGRyZXNzICsgXCIsXCIgKyBcIlwiO1xuXG5cdFx0XHRsZXQgbW9kZTtcblx0XHRcdHN3aXRjaCAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtb2RlXCIpLnZhbHVlKSB7XG5cdFx0XHRcdGNhc2UgXCJiaWN5Y2xpbmdcIjpcblx0XHRcdFx0XHRtb2RlID0gZ29vZ2xlLm1hcHMuRGlyZWN0aW9uc1RyYXZlbE1vZGUuQklDWUNMSU5HO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwiZHJpdmluZ1wiOlxuXHRcdFx0XHRcdG1vZGUgPSBnb29nbGUubWFwcy5EaXJlY3Rpb25zVHJhdmVsTW9kZS5EUklWSU5HO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwid2Fsa2luZ1wiOlxuXHRcdFx0XHRcdG1vZGUgPSBnb29nbGUubWFwcy5EaXJlY3Rpb25zVHJhdmVsTW9kZS5XQUxLSU5HO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAob3JpZ2luKSB7XG5cdFx0XHRcdGxldCByZXF1ZXN0ID0ge1xuXHRcdFx0XHRcdG9yaWdpbjogICAgICAgIG9yaWdpbixcblx0XHRcdFx0XHRkZXN0aW5hdGlvbjogICBkZXN0aW5hdGlvbixcblx0XHRcdFx0XHR3YXlwb2ludHM6ICAgICByb3V0ZVN0b3BQb2ludHMsXG5cdFx0XHRcdFx0dHJhdmVsTW9kZTogICAgbW9kZSxcblx0XHRcdFx0XHRhdm9pZEhpZ2h3YXlzOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaGlnaHdheXMnKS5jaGVja2VkLFxuXHRcdFx0XHRcdGF2b2lkVG9sbHM6ICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b2xscycpLmNoZWNrZWRcblx0XHRcdFx0fTtcblxuXHRcdFx0XHRzZWxmID0gdGhpcztcblx0XHRcdFx0dGhpcy5zZXR0aW5ncy5kaXJlY3Rpb25zU2VydmljZS5yb3V0ZShyZXF1ZXN0LCBmdW5jdGlvbiAocmVzcG9uc2UsIHN0YXR1cykge1xuXHRcdFx0XHRcdGlmIChzdGF0dXMgPT09IGdvb2dsZS5tYXBzLkRpcmVjdGlvbnNTdGF0dXMuT0spIHtcblx0XHRcdFx0XHRcdGRpcmVjdGlvbnNEaXNwbGF5LnNldERpcmVjdGlvbnMocmVzcG9uc2UpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRhbGVydChcIkdvb2dsZSBjb3VsZG5gdCBjYWxjdWxhdGUgZGlyZWN0aW9ucyBmb3IgdGhpcyByb3V0ZSBhbmQgc2VsZWN0ZWQgb3B0aW9uc1wiKTtcblx0XHRcdFx0XHRcdHNlbGYucmVzZXRSb3V0ZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdEtycm91dGUuY2xlYXJSb3V0ZU1hcmtlcnMoKTtcblx0XHRcdGRpcmVjdGlvbnNWaXNpYmxlID0gdHJ1ZTtcblx0XHR9XG5cblx0XHRpbml0KCkge1xuXHRcdFx0ZGVzdGluYXRpb24gPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKHRoaXMuc2V0dGluZ3MubGF0LCB0aGlzLnNldHRpbmdzLmxuZyk7XG5cblx0XHRcdC8vSW5pdGlhbGlzZSBtYXAgb3B0aW9uc1xuXHRcdFx0dGhpcy5teU9wdGlvbnMgPSB7XG5cdFx0XHRcdHNjcm9sbHdoZWVsOiAgICAgICBmYWxzZSxcblx0XHRcdFx0em9vbTogICAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MubWFwWm9vbSxcblx0XHRcdFx0bWF4Wm9vbTogICAgICAgICAgIHRoaXMuc2V0dGluZ3MubWFwTWF4Wm9vbSxcblx0XHRcdFx0bWFwVHlwZUlkOiAgICAgICAgIHRoaXMuc2V0dGluZ3MubWFwVHlwZUlkLFxuXHRcdFx0XHRzdHJlZXRWaWV3Q29udHJvbDogZmFsc2UsXG5cdFx0XHRcdGNlbnRlcjogICAgICAgICAgICBkZXN0aW5hdGlvblxuXHRcdFx0fTtcblxuXHRcdFx0cm91dGVNYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuc2V0dGluZ3MubWFwSWQpLCB0aGlzLm15T3B0aW9ucyk7XG5cdFx0XHRkaXJlY3Rpb25zRGlzcGxheSA9IG5ldyBnb29nbGUubWFwcy5EaXJlY3Rpb25zUmVuZGVyZXIoKTtcblx0XHRcdGRpcmVjdGlvbnNEaXNwbGF5LnNldE1hcChyb3V0ZU1hcCk7XG5cdFx0XHRkaXJlY3Rpb25zRGlzcGxheS5zZXRQYW5lbChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnNldHRpbmdzLmRpcmVjdGlvbnNQYW5lbCkpO1xuXG5cdFx0XHRjb25zdCBpbWFnZSA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXJJbWFnZSh0aGlzLnNldHRpbmdzLmljb24pO1xuXHRcdFx0cG9pbnQgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKHRoaXMuc2V0dGluZ3MubGF0LCB0aGlzLnNldHRpbmdzLmxuZyk7XG5cblx0XHRcdHNlbGYgPSB0aGlzO1xuXHRcdFx0Z29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIocm91dGVNYXAsICdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuXHRcdFx0XHRpZiAocm91dGVTdG9wUG9pbnRzLmxlbmd0aCA8IDkpIHtcblx0XHRcdFx0XHRyb3V0ZVN0b3BQb2ludHMucHVzaCh7bG9jYXRpb246IGV2ZW50LmxhdExuZywgc3RvcG92ZXI6IHRydWV9KTtcblx0XHRcdFx0XHRwb2ludCA9IGV2ZW50LmxhdExuZztcblx0XHRcdFx0XHRzZWxmLmFkZFJvdXRlTWFya2VyKHBvaW50KTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRhbGVydChcIk1heGltdW0gbnVtYmVyIG9mIDkgd2F5cG9pbnRzIHJlYWNoZWRcIik7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHRzZWxmID0gdGhpcztcblx0XHRcdGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyT25jZShyb3V0ZU1hcCwgJ2lkbGUnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdGdvb2dsZS5tYXBzLmV2ZW50LnRyaWdnZXIocm91dGVNYXAsICdyZXNpemUnKTtcblx0XHRcdFx0c2VsZi5jYWxjUm91dGUoKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdHJlc2V0Um91dGUoKSB7XG5cdFx0XHRLcnJvdXRlLmNsZWFyUm91dGVNYXJrZXJzKCk7XG5cdFx0XHRLcnJvdXRlLmNsZWFyV2F5cG9pbnRzKCk7XG5cdFx0XHRkaXJlY3Rpb25zRGlzcGxheS5zZXRNYXAobnVsbCk7XG5cdFx0XHRkaXJlY3Rpb25zRGlzcGxheS5zZXRQYW5lbChudWxsKTtcblx0XHRcdGRpcmVjdGlvbnNEaXNwbGF5ID0gbmV3IGdvb2dsZS5tYXBzLkRpcmVjdGlvbnNSZW5kZXJlcigpO1xuXHRcdFx0ZGlyZWN0aW9uc0Rpc3BsYXkuc2V0TWFwKHJvdXRlTWFwKTtcblx0XHRcdGRpcmVjdGlvbnNEaXNwbGF5LnNldFBhbmVsKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuc2V0dGluZ3MuZGlyZWN0aW9uUGFuZWwpKTtcblxuXHRcdFx0dGhpcy5pbml0KCk7XG5cdFx0fVxuXHR9XG5cblx0JChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuXHRcdCQoXCIua3ItZGlyZWN0aW9ucy1tb2RhbFwiKS5vbignY2xpY2snLCAnI2tyLW1hcC1yb3V0ZScsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRsZXQgJGVsZW1lbnQgPSAkKHRoaXMpO1xuXHRcdFx0Y29uc3Qgb3B0aW9ucyA9IHtcblx0XHRcdFx0bGF0OiAgICAkZWxlbWVudC5kYXRhKCdsYXQnKSxcblx0XHRcdFx0bG5nOiAgICAkZWxlbWVudC5kYXRhKCdsbmcnKSxcblx0XHRcdFx0bmFtZTogICAkZWxlbWVudC5kYXRhKCduYW1lJyksXG5cdFx0XHRcdGljb246ICAgJGVsZW1lbnQuZGF0YSgnaWNvbicpLFxuXHRcdFx0XHRkZXRvdXI6ICRlbGVtZW50LmRhdGEoJ2RldG91cicpXG5cdFx0XHR9O1xuXHRcdFx0bXlLcnJvdXRlID0gbmV3IEtycm91dGUoJGVsZW1lbnQsIG9wdGlvbnMpO1xuXHRcdH0pLm9uKCdjbGljaycsICcucmVzZXRyb3V0ZScsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRteUtycm91dGUucmVzZXRSb3V0ZSgpO1xuXHRcdH0pLm9uKCdjbGljaycsICcuY2FsY3JvdXRlJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdG15S3Jyb3V0ZS5jYWxjUm91dGUoKTtcblx0XHR9KTtcblxuXHRcdGpRdWVyeShcImEjZ2VvY29kZUFkZHJlc3NcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0bGV0IGFkZHJlc3NTdHJpbmcgPVxuXHRcdFx0XHQgICAgalF1ZXJ5KFwiI2pmb3JtX3Byb3BlcnR5X3N0cmVldFwiKS52YWwoKVxuXHRcdFx0XHQgICAgKyBcIiwgXCJcblx0XHRcdFx0ICAgICsgalF1ZXJ5KCcjamZvcm1fdG93bl9pZCcpLmZpbmQoXCI6c2VsZWN0ZWRcIikudGV4dCgpXG5cdFx0XHRcdCAgICArIFwiIFwiXG5cdFx0XHRcdCAgICArIGpRdWVyeShcIiNqZm9ybV9wcm9wZXJ0eV9wb3N0Y29kZVwiKS52YWwoKVxuXHRcdFx0XHQgICAgKyBcIiwgXCJcblx0XHRcdFx0ICAgICsgalF1ZXJ5KCcjamZvcm1fcmVnaW9uX2lkJykuZmluZChcIjpzZWxlY3RlZFwiKS50ZXh0KClcblx0XHRcdFx0ICAgICsgXCIgXCJcblx0XHRcdFx0ICAgICsgalF1ZXJ5KCcjamZvcm1fY291bnRyeV9pZCcpLmZpbmQoXCI6c2VsZWN0ZWRcIikudGV4dCgpO1xuXG5cdFx0XHRsZXQgdXJsID0gJ2luZGV4LnBocD9vcHRpb249Y29tX2tub3dyZXMmdGFzaz1wcm9wZXJ0eS5nZW9jb2RlJztcblx0XHRcdGxldCBjb29yZCA9IFtdO1xuXG5cdFx0XHRqUXVlcnkuYWpheCh7XG5cdFx0XHRcdHR5cGU6ICAgICBcIlBPU1RcIixcblx0XHRcdFx0dXJsOiAgICAgIHVybCxcblx0XHRcdFx0ZGF0YTogICAgIHthZGRyZXNzOiBhZGRyZXNzU3RyaW5nfSxcblx0XHRcdFx0ZGF0YVR5cGU6IFwianNvblwiLFxuXHRcdFx0XHRzdWNjZXNzOiAgZnVuY3Rpb24gKGpzb25kYXRhKSB7XG5cdFx0XHRcdFx0alF1ZXJ5LmVhY2goanNvbmRhdGEsIGZ1bmN0aW9uIChrZXksIHZhbCkge1xuXHRcdFx0XHRcdFx0bGV0IGRpdiA9IFwiI1wiICsga2V5O1xuXHRcdFx0XHRcdFx0alF1ZXJ5KGRpdikudmFsKHZhbCk7XG5cdFx0XHRcdFx0XHRjb29yZFtrZXldID0gdmFsO1xuXHRcdFx0XHRcdFx0bXlHbWFwLnJlZnJlc2hNYXAoY29vcmRbJ2xhdCddLCBjb29yZFsnbG5nJ10sIGZhbHNlKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH0pO1xufShqUXVlcnkpKTsiLCIvLyBLUiBBUFAgSlMgRmlsZXNcbmltcG9ydCAnbnBtL2pxdWVyeS1iYXItcmF0aW5nL2pxdWVyeS5iYXJyYXRpbmcnO1xuaW1wb3J0ICducG0vaXMtbWFya2VyLWNsdXN0ZXJlcic7XG5pbXBvcnQgJ21lZGlhanMvc2l0ZS9hcHAnO1xuLy9pbXBvcnQgJ21lZGlhanMvc2l0ZS9jb21ib2dlbyc7XG5pbXBvcnQgJ21lZGlhanMvc2l0ZS9jb25maXJtJztcbmltcG9ydCAnbWVkaWFqcy9zaXRlL2RvYmVudHJ5JztcbmltcG9ydCAnbWVkaWFqcy9zaXRlL2d1ZXN0ZGF0YSc7XG5pbXBvcnQgJ21lZGlhanMvc2l0ZS9tYXAnO1xuaW1wb3J0ICdtZWRpYWpzL3NpdGUvcm91dGUnO1xuLy8gaW1wb3J0ICcuL2pzL3NyYy9rcmFwcC9zdHJpcGUnOyJdLCJuYW1lcyI6WyJNYXJrZXJDbHVzdGVyZXIiLCJtYXAiLCJvcHRfbWFya2VycyIsIm9wdF9vcHRpb25zIiwiZXh0ZW5kIiwiZ29vZ2xlIiwibWFwcyIsIk92ZXJsYXlWaWV3IiwibWFwXyIsIm1hcmtlcnNfIiwiY2x1c3RlcnNfIiwic2l6ZXMiLCJzdHlsZXNfIiwicmVhZHlfIiwib3B0aW9ucyIsImdyaWRTaXplXyIsIm1pbkNsdXN0ZXJTaXplXyIsIm1heFpvb21fIiwiaW1hZ2VQYXRoXyIsIk1BUktFUl9DTFVTVEVSX0lNQUdFX1BBVEhfIiwiaW1hZ2VFeHRlbnNpb25fIiwiTUFSS0VSX0NMVVNURVJfSU1BR0VfRVhURU5TSU9OXyIsInpvb21PbkNsaWNrXyIsInVuZGVmaW5lZCIsImF2ZXJhZ2VDZW50ZXJfIiwic2V0dXBTdHlsZXNfIiwic2V0TWFwIiwicHJldlpvb21fIiwiZ2V0Wm9vbSIsInRoYXQiLCJldmVudCIsImFkZExpc3RlbmVyIiwiem9vbSIsInJlc2V0Vmlld3BvcnQiLCJyZWRyYXciLCJsZW5ndGgiLCJhZGRNYXJrZXJzIiwicHJvdG90eXBlIiwib2JqMSIsIm9iajIiLCJvYmplY3QiLCJwcm9wZXJ0eSIsImFwcGx5Iiwib25BZGQiLCJzZXRSZWFkeV8iLCJkcmF3IiwiaSIsInNpemUiLCJwdXNoIiwidXJsIiwiaGVpZ2h0Iiwid2lkdGgiLCJmaXRNYXBUb01hcmtlcnMiLCJtYXJrZXJzIiwiZ2V0TWFya2VycyIsImJvdW5kcyIsIkxhdExuZ0JvdW5kcyIsIm1hcmtlciIsImdldFBvc2l0aW9uIiwiZml0Qm91bmRzIiwic2V0U3R5bGVzIiwic3R5bGVzIiwiZ2V0U3R5bGVzIiwiaXNab29tT25DbGljayIsImlzQXZlcmFnZUNlbnRlciIsImdldFRvdGFsTWFya2VycyIsInNldE1heFpvb20iLCJtYXhab29tIiwiZ2V0TWF4Wm9vbSIsImNhbGN1bGF0b3JfIiwibnVtU3R5bGVzIiwiaW5kZXgiLCJjb3VudCIsImR2IiwicGFyc2VJbnQiLCJNYXRoIiwibWluIiwidGV4dCIsInNldENhbGN1bGF0b3IiLCJjYWxjdWxhdG9yIiwiZ2V0Q2FsY3VsYXRvciIsIm9wdF9ub2RyYXciLCJwdXNoTWFya2VyVG9fIiwiaXNBZGRlZCIsInJlcGFpbnQiLCJhZGRNYXJrZXIiLCJyZW1vdmVNYXJrZXJfIiwiaW5kZXhPZiIsIm0iLCJzcGxpY2UiLCJyZW1vdmVNYXJrZXIiLCJyZW1vdmVkIiwicmVtb3ZlTWFya2VycyIsInIiLCJyZWFkeSIsImNyZWF0ZUNsdXN0ZXJzXyIsImdldFRvdGFsQ2x1c3RlcnMiLCJnZXRNYXAiLCJnZXRHcmlkU2l6ZSIsInNldEdyaWRTaXplIiwiZ2V0TWluQ2x1c3RlclNpemUiLCJzZXRNaW5DbHVzdGVyU2l6ZSIsImdldEV4dGVuZGVkQm91bmRzIiwicHJvamVjdGlvbiIsImdldFByb2plY3Rpb24iLCJ0ciIsIkxhdExuZyIsImdldE5vcnRoRWFzdCIsImxhdCIsImxuZyIsImJsIiwiZ2V0U291dGhXZXN0IiwidHJQaXgiLCJmcm9tTGF0TG5nVG9EaXZQaXhlbCIsIngiLCJ5IiwiYmxQaXgiLCJuZSIsImZyb21EaXZQaXhlbFRvTGF0TG5nIiwic3ciLCJpc01hcmtlckluQm91bmRzXyIsImNvbnRhaW5zIiwiY2xlYXJNYXJrZXJzIiwib3B0X2hpZGUiLCJjbHVzdGVyIiwicmVtb3ZlIiwib2xkQ2x1c3RlcnMiLCJzbGljZSIsIndpbmRvdyIsInNldFRpbWVvdXQiLCJkaXN0YW5jZUJldHdlZW5Qb2ludHNfIiwicDEiLCJwMiIsIlIiLCJkTGF0IiwiUEkiLCJkTG9uIiwiYSIsInNpbiIsImNvcyIsImMiLCJhdGFuMiIsInNxcnQiLCJkIiwiYWRkVG9DbG9zZXN0Q2x1c3Rlcl8iLCJkaXN0YW5jZSIsImNsdXN0ZXJUb0FkZFRvIiwicG9zIiwiY2VudGVyIiwiZ2V0Q2VudGVyIiwiaXNNYXJrZXJJbkNsdXN0ZXJCb3VuZHMiLCJDbHVzdGVyIiwibWFwQm91bmRzIiwiZ2V0Qm91bmRzIiwibWFya2VyQ2x1c3RlcmVyIiwibWFya2VyQ2x1c3RlcmVyXyIsImNlbnRlcl8iLCJib3VuZHNfIiwiY2x1c3Rlckljb25fIiwiQ2x1c3Rlckljb24iLCJpc01hcmtlckFscmVhZHlBZGRlZCIsImNhbGN1bGF0ZUJvdW5kc18iLCJsIiwibGVuIiwidXBkYXRlSWNvbiIsImdldE1hcmtlckNsdXN0ZXJlciIsImdldFNpemUiLCJteiIsImhpZGUiLCJzdW1zIiwic2V0Q2VudGVyIiwic2V0U3VtcyIsInNob3ciLCJvcHRfcGFkZGluZyIsInBhZGRpbmdfIiwiY2x1c3Rlcl8iLCJkaXZfIiwic3Vtc18iLCJ2aXNpYmxlXyIsInRyaWdnZXJDbHVzdGVyQ2xpY2siLCJ0cmlnZ2VyIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiZ2V0UG9zRnJvbUxhdExuZ18iLCJzdHlsZSIsImNzc1RleHQiLCJjcmVhdGVDc3MiLCJpbm5lckhUTUwiLCJwYW5lcyIsImdldFBhbmVzIiwib3ZlcmxheU1vdXNlVGFyZ2V0IiwiYXBwZW5kQ2hpbGQiLCJhZGREb21MaXN0ZW5lciIsImxhdGxuZyIsIndpZHRoXyIsImhlaWdodF8iLCJ0b3AiLCJsZWZ0IiwiZGlzcGxheSIsIm9uUmVtb3ZlIiwicGFyZW50Tm9kZSIsInJlbW92ZUNoaWxkIiwidGV4dF8iLCJpbmRleF8iLCJ1c2VTdHlsZSIsIm1heCIsInVybF8iLCJ0ZXh0Q29sb3JfIiwiYW5jaG9yXyIsInRleHRTaXplXyIsImZvbnRGYW1pbHlfIiwiZm9udFdlaWdodF8iLCJiYWNrZ3JvdW5kUG9zaXRpb25fIiwiYmFja2dyb3VuZFBvc2l0aW9uIiwidHh0Q29sb3IiLCJ0eHRTaXplIiwiZm9udEZhbWlseSIsImZvbnRXZWlnaHQiLCJqb2luIiwiZ2xvYmFsIiwibW9kdWxlIiwiZXhwb3J0cyIsImZhY3RvcnkiLCJkZWZpbmUiLCJhbWQiLCJyZXF1aXJlIiwialF1ZXJ5IiwiJCIsIkJhclJhdGluZyIsInNlbGYiLCJ3cmFwRWxlbWVudCIsImNsYXNzZXMiLCJ0aGVtZSIsIiRlbGVtIiwid3JhcCIsInVud3JhcEVsZW1lbnQiLCJ1bndyYXAiLCJmaW5kT3B0aW9uIiwidmFsdWUiLCJpc051bWVyaWMiLCJmbG9vciIsImdldEluaXRpYWxPcHRpb24iLCJpbml0aWFsUmF0aW5nIiwiZ2V0RW1wdHlPcHRpb24iLCIkZW1wdHlPcHQiLCJmaW5kIiwiZW1wdHlWYWx1ZSIsImFsbG93RW1wdHkiLCJwcmVwZW5kVG8iLCJnZXREYXRhIiwia2V5IiwiZGF0YSIsInNldERhdGEiLCJzYXZlRGF0YU9uRWxlbWVudCIsIiRvcHQiLCJ2YWwiLCJlbXB0eVRleHQiLCJ1c2VyT3B0aW9ucyIsInJhdGluZ1ZhbHVlIiwicmF0aW5nVGV4dCIsIm9yaWdpbmFsUmF0aW5nVmFsdWUiLCJvcmlnaW5hbFJhdGluZ1RleHQiLCJlbXB0eVJhdGluZ1ZhbHVlIiwiZW1wdHlSYXRpbmdUZXh0IiwicmVhZE9ubHkiLCJyZWFkb25seSIsInJhdGluZ01hZGUiLCJyZW1vdmVEYXRhT25FbGVtZW50IiwicmVtb3ZlRGF0YSIsImJ1aWxkV2lkZ2V0IiwiJHciLCJlYWNoIiwiaHRtbCIsIiRhIiwic2hvd1ZhbHVlcyIsImFwcGVuZCIsInNob3dTZWxlY3RlZFJhdGluZyIsInJldmVyc2UiLCJhZGRDbGFzcyIsIm5leHRBbGxvclByZXZpb3VzQWxsIiwic2V0U2VsZWN0RmllbGRWYWx1ZSIsInByb3AiLCJjaGFuZ2UiLCJyZXNldFNlbGVjdEZpZWxkIiwiZGVmYXVsdFNlbGVjdGVkIiwicGFyZW50IiwiZnJhY3Rpb24iLCJyb3VuZCIsInJlc2V0U3R5bGUiLCIkd2lkZ2V0IiwicmVtb3ZlQ2xhc3MiLCJtYXRjaCIsImFwcGx5U3R5bGUiLCJiYXNlVmFsdWUiLCJmIiwiJGFsbCIsIiRmcmFjdGlvbmFsIiwiaXNEZXNlbGVjdGFibGUiLCIkZWxlbWVudCIsImRlc2VsZWN0YWJsZSIsImF0dHIiLCJhdHRhY2hDbGlja0hhbmRsZXIiLCIkZWxlbWVudHMiLCJvbiIsInByZXZlbnREZWZhdWx0Iiwib25TZWxlY3QiLCJjYWxsIiwiYXR0YWNoTW91c2VFbnRlckhhbmRsZXIiLCJhdHRhY2hNb3VzZUxlYXZlSGFuZGxlciIsImZhc3RDbGlja3MiLCJzdG9wUHJvcGFnYXRpb24iLCJjbGljayIsImRpc2FibGVDbGlja3MiLCJhdHRhY2hIYW5kbGVycyIsImhvdmVyU3RhdGUiLCJkZXRhY2hIYW5kbGVycyIsIm9mZiIsInNldHVwSGFuZGxlcnMiLCJpbnNlcnRBZnRlciIsInN0YXRlIiwidG9nZ2xlQ2xhc3MiLCJzZXQiLCJzaWxlbnQiLCJjbGVhciIsIm9uQ2xlYXIiLCJkZXN0cm95Iiwib25EZXN0cm95IiwiaW5pdCIsImVsZW0iLCJmbiIsImJhcnJhdGluZyIsImRlZmF1bHRzIiwibWV0aG9kIiwicGx1Z2luIiwiaXMiLCJlcnJvciIsImhhc093blByb3BlcnR5IiwibmV4dCIsImxhbmciLCJzZWFyY2hkYXRhIiwic2VhcmNoRG9uZSIsImNhbGVuZGFyTG9hZGVkIiwic2F2ZWR3aWR0aCIsImxhcmdlIiwicmVzaXplZCIsImxvY2F0aW9uIiwib3JpZ2luIiwicHJvdG9jb2wiLCJob3N0IiwibGl2ZXNpdGUiLCJGb3VuZGF0aW9uIiwiYWRkVG9KcXVlcnkiLCJmb3VuZGF0aW9uIiwiY2hlY2tTY3JlZW5XaWR0aCIsImJhcnMiLCJlIiwiJGZvcm0iLCJhamF4IiwidHlwZSIsInNlcmlhbGl6ZSIsImRhdGFUeXBlIiwic3VjY2VzcyIsInJlc3VsdCIsImZvcm1SZXNwb25zZSIsImhyZWYiLCJtZXNzYWdlIiwiJG1vZGFsIiwiUmV2ZWFsIiwib3BlbiIsImNzcyIsIm1vZGFsaWQiLCJ0cmltIiwiYWpheHVybCIsImNvbnRlbnQiLCIkdGhpcyIsInBpZCIsImtycHJvcGVydHkiLCJhY3Rpb24iLCJlbGVtZW50IiwiZmFkZU91dCIsIiR0YXJnZXQiLCJ2YWwxIiwiZ2V0UHJvcGVydGllcyIsImNoaWxkcmVuIiwidG9nZ2xlIiwic2V0QWN0aXZlTWVudSIsImxvYWRDYWxlbmRhciIsIiR0YWJzIiwic3BlY2lhbCIsInRvdWNoc3RhcnQiLCJzZXR1cCIsIl8iLCJucyIsImhhbmRsZSIsImluY2x1ZGVzIiwiYWRkRXZlbnRMaXN0ZW5lciIsInBhc3NpdmUiLCJ0b3VjaG1vdmUiLCJpZCIsInJlcGxhY2UiLCJyZWRpcmVjdCIsImZpZWxkIiwicmVsb2FkIiwic2V0U2VhcmNoRGF0YSIsInJlc3BvbnNlIiwiZW1wdHkiLCJmYWRlSW4iLCJoYXNDbGFzcyIsInNjcm9sbFRvIiwiYmFyIiwic2NyZWVuV2lkdGhIYXNDaGFuZ2VkIiwiTWVkaWFRdWVyeSIsImF0TGVhc3QiLCJteUNvbmZpcm0iLCIkbXlUYXNrIiwiS3Jjb25maXJtIiwiY29uc3RydWN0b3IiLCJmb3JtIiwidXBkYXRlUXVvdGUiLCJzZXJpYWxpemVBcnJheSIsImRpdiIsImNoZWNrVGVybXMiLCJ0ZXN0IiwiZ2V0RWxlbWVudEJ5SWQiLCJ0ZXN0YyIsInRlc3R0IiwiYWdyZWVjaGVjayIsImNoZWNrZWQiLCJhZ3JlZWNoZWNrYyIsImFncmVlY2hlY2t0IiwibXlLckRvYkVudHJ5IiwidG9kYXkiLCJCQUNLU1BBQ0UiLCJzZXR0aW5ncyIsImN1c3RvbV92YWxpZGF0aW9uIiwiZGF5c19pbl9tb250aCIsImRvY3VtZW50X2RhdGUiLCJlcnJvcmJveF94IiwiZXJyb3Jib3hfeSIsImZpZWxkX2hpbnRfdGV4dF9kYXkiLCJmaWVsZF9oaW50X3RleHRfbW9udGgiLCJmaWVsZF9oaW50X3RleHRfeWVhciIsImZpZWxkX29yZGVyIiwiZmllbGRfd2lkdGhfZGF5IiwiZmllbGRfd2lkdGhfbW9udGgiLCJmaWVsZF93aWR0aF95ZWFyIiwiZmllbGRfd2lkdGhfc2VwIiwibWlubWF4IiwibWluX2RhdGUiLCJtYXhfZGF0ZSIsIm1pbl95ZWFyIiwibW9udGhfbmFtZSIsIm9uX2JsdXIiLCJvbl9lcnJvciIsIm9uX2NoYW5nZSIsInBhcnNlX2RhdGUiLCJzZXBhcmF0b3IiLCJzaG93X2Vycm9ycyIsInNob3dfaGludHMiLCJFX0RBWV9OQU4iLCJFX0RBWV9UT09fQklHIiwiRV9EQVlfVE9PX1NNQUxMIiwiRV9CQURfREFZX0ZPUl9NT05USCIsIkVfTU9OVEhfTkFOIiwiRV9NT05USF9UT09fQklHIiwiRV9NT05USF9UT09fU01BTEwiLCJFX1lFQVJfTkFOIiwiRV9ZRUFSX0xFTkdUSCIsIkVfWUVBUl9UT09fU01BTEwiLCJFX01JTl9EQVRFIiwiRV9NQVhfREFURSIsIktyRG9iRW50cnkiLCJnZXRZbWQiLCJEYXRlIiwiaW5wdXRfZGF5IiwiaW5wdXRfbW9udGgiLCJpbnB1dF95ZWFyIiwiZGF0ZSIsImdldE1vbnRoIiwiZ2V0RGF5IiwiZ2V0RnVsbFllYXIiLCJnZXRZbWRPYmplY3QiLCJ5ZWFyIiwibW9udGgiLCJkYXkiLCJhZGRFbnRyeUZpZWxkcyIsImRvYmZpZWxkIiwiZmllbGRzIiwic3BsaXQiLCJidWlsZEZpZWxkIiwiYWZ0ZXJQYXN0ZSIsInRhcmdldCIsInBhcnNlRGF0ZSIsInNldERhdGUiLCJuYW1lIiwia3Jkb2JlbnRyeSIsImlucHV0IiwiS3JEb2JJbnB1dCIsImhpbnRfdGV4dCIsImlubmVyIiwiJGlucHV0IiwiYnVpbGRVaSIsIndyYXBwZXIiLCJlcnJvcmJveCIsInNldEZpZWxkV2lkdGhzIiwiY2hlY2tEb2N1bWVudCIsImRvYiIsImNoaWxkZG9iIiwiY2xhc3NuYW1lIiwiZWxlbWVudHMiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiY2xlYXJFcnJvciIsImVycm9yX3RleHQiLCJzaG93RXJyb3IiLCJmb2N1cyIsInNldEZvY3VzIiwiZm9jdXNGaWVsZEJlZm9yZSIsInlpZWxkRm9jdXMiLCJmb2N1c0ZpZWxkQWZ0ZXIiLCJmb2N1c0luIiwiZm9jdXNPdXQiLCJ3aWRnZXRGb2N1c0xvc3QiLCJnZXREYXRlIiwiZGF5X3ZhbHVlIiwibW9udGhfdmFsdWUiLCJ5ZWFyX3ZhbHVlIiwicHJveHlMYWJlbENsaWNrcyIsInBhcnNlSXNvRGF0ZSIsIlJlZ0V4cCIsIiQzIiwiJDIiLCIkMSIsIm5ld19kYXRlIiwidmFsaWRhdGUiLCJzZXRFcnJvciIsImF2YWlsYWJsZSIsInRvdGFsIiwic2V0V2lkdGgiLCJzZXRSZWFkb25seSIsIm1vZGUiLCJ3aWRnZXRFcnJvclRleHQiLCJ4X29mZnNldCIsIm91dGVyV2lkdGgiLCJ5X29mZnNldCIsInBvc2l0aW9uIiwiY3VycmVudF9pbnB1dCIsInZhbGlkYXRlRGF5IiwidmFsaWRhdGVNb250aCIsInZhbGlkYXRlWWVhciIsInZhbGlkYXRlRGF5c0luTW9udGgiLCJ2YWxpZGF0ZUNvbXBsZXRlRGF0ZSIsImRhdGVfc3RyIiwiZGF0ZV9vYmoiLCJkYXRlX2lzbyIsIm9wdCIsImdldCIsImhhc19mb2N1cyIsIm51bSIsIm1zZyIsInRvU3RyaW5nIiwib25CbHVyIiwicHJveHkiLCJibHVyIiwia2V5ZG93biIsImtleXVwIiwic2hvd19oaW50Iiwia2V5X2lzX2Rvd24iLCJpc0RpZ2l0S2V5Iiwia2V5Y29kZSIsIndoaWNoIiwid2FudCIsIm5ld192YWx1ZSIsInNlbGVjdF9hbGwiLCJzZWxlY3QiLCJuZXdfd2lkdGgiLCJob3d0b2Fycml2ZSIsImFycml2YWxtZWFucyIsImdldEF0dHJpYnV0ZSIsImRpc3BsYXlBcnJpdmFsIiwiY2xhc3NMaXN0IiwiYXJyaXZhbGRhdGEiLCJhZGQiLCJtYXJrZXJzaGFwZSIsImNvb3JkcyIsIm15S3JtYXAiLCJtYXBEYXRhIiwibWFwWm9vbSIsImluZm9XaW5kb3ciLCJpbmZvV2luZG93MiIsInByb3BlcnR5ZGl2IiwicHJvcGVydHlpY29uIiwibWMiLCJwcm9wZXJ0eU1hcmtlcnMiLCJmaWx0ZXJJZHMiLCJtYXBNYXJrZXJzIiwibWFwVHlwZUlkIiwibWFwTWF4Wm9vbSIsIm1hcFR5cGUiLCJtYXBJZCIsIm1hcmtlckNvbG9yIiwiS3JtYXAiLCJnbU9wdGlvbnMiLCJzY3JvbGx3aGVlbCIsInN0cmVldFZpZXdDb250cm9sIiwiZ21hcmtlcnMiLCJpbml0TWFwIiwiY2xvc2VLckluZm93aW5kb3ciLCJjbG9zZSIsInNob3dWaXNpYmxlTWFya2VycyIsInNldFZpc2libGUiLCJjaGVja0R1cGxpY2F0ZSIsImN1cnJlbnQiLCJkdXBzIiwiZXF1YWxzIiwibmV3TGF0IiwibmV3TG5nIiwiY2hlY2tab29tIiwibXlsaXN0ZW5lciIsImN1cnJlbnRab29tIiwic2V0Wm9vbSIsImNsdXN0ZXJNYXAiLCJtY09wdGlvbnMiLCJncmlkU2l6ZSIsImltYWdlUGF0aCIsImlnbm9yZUhpZGRlbk1hcmtlcnMiLCJzZXRQcm9wZXJ0eU1hcmtlcnMiLCJzZXRNYXBNYXJrZXJzIiwiY3JlYXRlTWFwIiwiTWFwIiwiSW5mb1dpbmRvdyIsImNyZWF0ZU1hcE1hcmtlciIsInBvaW50IiwiaW1hZ2UiLCJib3hpbmZvIiwibGluayIsInRpdGxlIiwiTWFya2VyIiwic2hhcGUiLCJpY29uIiwiekluZGV4Iiwic2V0Q29udGVudCIsImNyZWF0ZVByb3BlcnR5TWFya2VyIiwiY29sb3IiLCJub3QiLCJzbGljayIsIm5leHRBcnJvdyIsInByZXZBcnJvdyIsImF1dG9wbGF5Iiwic29sb01hcCIsInJlZnJlc2hNYXAiLCIkbWFwbW9kYWwiLCJhbGVydCIsInJlc2V0TWFwIiwiYW1hcmsiLCJtYXJrZXJpY29uIiwiU2l6ZSIsIlBvaW50IiwiYW5jaG9yIiwibXlMaXN0ZW5lciIsImZvdW5kIiwia2lja01hcCIsIm1hcF9tb2RhbCIsIiRzb2xvVHJpZ2dlciIsIm9uZSIsIiR0cmlnZ2VyIiwibXlLcnJvdXRlIiwiZGlyZWN0aW9uc0Rpc3BsYXkiLCJkaXJlY3Rpb25zVmlzaWJsZSIsInJvdXRlTWFwIiwiZGVzdGluYXRpb24iLCJyb3V0ZU1hcmtlcnMiLCJyb3V0ZVN0b3BQb2ludHMiLCJkZXRvdXIiLCJkaXJlY3Rpb25zUGFuZWwiLCJkaXJlY3Rpb25zU2VydmljZSIsIktycm91dGUiLCJEaXJlY3Rpb25zU2VydmljZSIsImNsZWFyUm91dGVNYXJrZXJzIiwiY2xlYXJXYXlwb2ludHMiLCJhZGRSb3V0ZU1hcmtlciIsImNhbGNSb3V0ZSIsImZyb21fYWRkcmVzcyIsIkRpcmVjdGlvbnNUcmF2ZWxNb2RlIiwiQklDWUNMSU5HIiwiRFJJVklORyIsIldBTEtJTkciLCJyZXF1ZXN0Iiwid2F5cG9pbnRzIiwidHJhdmVsTW9kZSIsImF2b2lkSGlnaHdheXMiLCJhdm9pZFRvbGxzIiwicm91dGUiLCJzdGF0dXMiLCJEaXJlY3Rpb25zU3RhdHVzIiwiT0siLCJzZXREaXJlY3Rpb25zIiwicmVzZXRSb3V0ZSIsIm15T3B0aW9ucyIsIkRpcmVjdGlvbnNSZW5kZXJlciIsInNldFBhbmVsIiwiTWFya2VySW1hZ2UiLCJsYXRMbmciLCJzdG9wb3ZlciIsImFkZExpc3RlbmVyT25jZSIsImRpcmVjdGlvblBhbmVsIiwiYWRkcmVzc1N0cmluZyIsImNvb3JkIiwiYWRkcmVzcyIsImpzb25kYXRhIiwibXlHbWFwIl0sInNvdXJjZVJvb3QiOiIifQ==