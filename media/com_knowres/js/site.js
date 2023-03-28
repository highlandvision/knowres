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
      $.ajax({
        type: 'POST',
        url: livesite + 'index.php?option=com_knowres&task=properties.favourite&lang=' + lang,
        data: {
          'property_id': $this.data('property'),
          'view': $this.data('view')
        },
        dataType: 'json',
        success: function (result) {
          if (result.success) {
            if (result.data.action === 'hideme') {
              const element = "#" + $this.find('.has-tip').data('toggle');
              $(element).remove();
              $this.parents('.kr-properties .kr-property .favs:first').hide('slow');
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
    }).on('click', '.sidebar .kr-filters ul.filter-sort-list li.head', function (e) {
      e.preventDefault();
      $(this).parent().children('li.checkbox').toggle();
      $(this).toggleClass('active');
    }).on('click', '#showgateways', function (e) {
      e.preventDefault();
      $('#kr-gateways').toggleClass('hideme');
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

        if (!large && field === 'order') {
          $('#sortby').trigger('click');
        }

        searchDone = true;
      }
    });
  }

  function setSearchData(response) {
    let field = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    if (response) {
      $('#kr-properties-data').empty().fadeIn('slow').html(response['items']).foundation();
      $('.kr-pager').html(response['pagination']);

      if (large === true) {
        $("#kr-properties-search-off-canvas").html('');
        $("#kr-properties-filters-off-canvas").html('');
        $("#kr-properties-sortby-off-canvas").html('');
        $("#kr-sidebar-search").empty().html(response['search']);
        $('#kr-properties-filters').empty().html(response['filters']);
        $('#kr-properties-sortby').empty().html(response['sortby']).addClass('hideme');
      } else {
        $('#kr-properties-filters').html('');
        $('#kr-properties-sortby').html('');
        $("#kr-sidebar-search").html('');
        $("#kr-properties-filters-off-canvas").html(response['filters']);
        $("#kr-properties-sortby-off-canvas").html(response['sortby']);
        $("#kr-properties-search-off-canvas").html(response['search']);
      }

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

  function setActiveMenu(item) {
    const bar = $('.kr-searchbar').find('li');
    $.each(bar, function (index, bar) {
      $(bar).removeClass('is-active');
    });
    const element = '.kr-searchbar li.' + item;
    $(element).addClass('is-active');
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
    E_MIN_DATE: 'Date must be after %DATE',
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
      if (!settings.max_date) settings.max_date = today;
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
      let max_date = settings.max_date;

      if (typeof max_date === 'function') {
        max_date = max_date.call(this);
      }

      if (typeof max_date === 'string') {
        max_date = this.parseDate(max_date);
      }

      if (max_date) {
        if (date_iso > settings.max_date) {
          throw settings.E_MAX_DATE;
        }
      }

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
    const totalGuests = $('#jsdata').data('totalguests');
    $('#jform_adults').on('change', function () {
      changePartySize(1, totalGuests);
    });
    $('#jform_child').on('change', function () {
      changePartySize(2, totalGuests);
    });

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

  function changePartySize(type, guests) {
    let numAdults = $('#jform_adults').val();
    let $inputChild = $('#jform_child');
    let numChildren = $inputChild.val();
    let maxChildren = guests - numAdults;
    let $holder = $('#holder');
    let i;

    if (type === 1) {
      $inputChild.attr('max', maxChildren);

      if (numChildren > maxChildren) {
        $inputChild.val(maxChildren);
        if (!maxChildren) $holder.hide();else {
          for (i = 0; i < numChildren - maxChildren; i++) {
            $holder.children().last().remove();
          }
        }
      }
    } else if (type === 2) {
      let difference;
      let existing = $holder.children('input').length;

      if (numChildren > existing) {
        difference = numChildren - existing;

        for (i = 1; i <= difference; i++) {
          $holder.append(createNewAgeField(existing + i));
        }
      } else {
        difference = existing - numChildren;

        for (i = 0; i < difference; i++) {
          $holder.children('input').last().remove();
        }
      }

      let now = $holder.children('input').length;

      if (now) {
        $holder.show();
      } else if (!now) {
        $holder.hide();
      }
    }
  }

  function createNewAgeField(count) {
    const $jsdata = $('#jsdata');
    const childMinAge = $jsdata.data('childminage');
    const childMaxAge = $jsdata.data('childmaxage');
    let newage = document.createElement('input');
    newage.setAttribute("type", "number");
    newage.setAttribute("min", childMinAge);
    newage.setAttribute("max", childMaxAge);
    newage.setAttribute("value", '2');
    newage.setAttribute("step", '1');
    newage.setAttribute('name', 'jform[child_ages][]');
    newage.setAttribute('id', 'jform_child_ages_' + count);
    newage.setAttribute('class', 'float-left child-ages input-tiny form-control valid form-control-success');
    return newage;
  }

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
      $('#kr-infowindow').hide(); //			"#kr-infowindow".style.display = 'none';

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFnQyxXQUFoQyxFQUE2Q3hLLElBQTdDLEVBTkYsR0FPRSxHQVBGLEdBUUVxSixNQUFNLENBQUMsbUJBQUQsQ0FBTixDQUE0Qm1CLElBQTVCLENBQWlDLFdBQWpDLEVBQThDeEssSUFBOUMsRUFUUDtNQVdBLElBQUk1QixHQUFHLEdBQUcsb0RBQVY7TUFDQSxJQUFJaXFCLEtBQUssR0FBRyxFQUFaO01BRUFoZixNQUFNLENBQUNtSSxJQUFQLENBQVk7UUFDWEMsSUFBSSxFQUFNLE1BREM7UUFFWHJULEdBQUcsRUFBT0EsR0FGQztRQUdYME0sSUFBSSxFQUFNO1VBQUN3ZCxPQUFPLEVBQUVGO1FBQVYsQ0FIQztRQUlYelcsUUFBUSxFQUFFLE1BSkM7UUFLWEMsT0FBTyxFQUFHLFVBQVUyVyxRQUFWLEVBQW9CO1VBQzdCbGYsTUFBTSxDQUFDNkMsSUFBUCxDQUFZcWMsUUFBWixFQUFzQixVQUFVMWQsR0FBVixFQUFlSyxHQUFmLEVBQW9CO1lBQ3pDLElBQUlvSyxHQUFHLEdBQUcsTUFBTXpLLEdBQWhCO1lBQ0F4QixNQUFNLENBQUNpTSxHQUFELENBQU4sQ0FBWXBLLEdBQVosQ0FBZ0JBLEdBQWhCO1lBQ0FtZCxLQUFLLENBQUN4ZCxHQUFELENBQUwsR0FBYUssR0FBYjtZQUNBc2QsTUFBTSxDQUFDNUQsVUFBUCxDQUFrQnlELEtBQUssQ0FBQyxLQUFELENBQXZCLEVBQWdDQSxLQUFLLENBQUMsS0FBRCxDQUFyQyxFQUE4QyxLQUE5QztVQUNBLENBTEQ7UUFNQTtNQVpVLENBQVo7SUFjQSxDQS9CRDtFQWdDQSxDQW5ERDtBQW9EQSxDQW5QQSxFQW1QQ2hmLE1BblBELENBQUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNWQTtBQUNBO0FBQ0E7Q0FFQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtDQUVBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8va3IvLi9ub2RlX21vZHVsZXMvaXMtbWFya2VyLWNsdXN0ZXJlci9zcmMvbWFya2VyY2x1c3RlcmVyLmpzIiwid2VicGFjazovL2tyLy4vbm9kZV9tb2R1bGVzL2pxdWVyeS1iYXItcmF0aW5nL2pxdWVyeS5iYXJyYXRpbmcuanMiLCJ3ZWJwYWNrOi8va3IvLi9zcmMvbWVkaWEvY29tX2tub3dyZXMvanMvc3JjL3NpdGUvYXBwLmpzIiwid2VicGFjazovL2tyLy4vc3JjL21lZGlhL2NvbV9rbm93cmVzL2pzL3NyYy9zaXRlL2NvbmZpcm0uanMiLCJ3ZWJwYWNrOi8va3IvLi9zcmMvbWVkaWEvY29tX2tub3dyZXMvanMvc3JjL3NpdGUvZG9iZW50cnkuanMiLCJ3ZWJwYWNrOi8va3IvLi9zcmMvbWVkaWEvY29tX2tub3dyZXMvanMvc3JjL3NpdGUvZ3Vlc3RkYXRhLmpzIiwid2VicGFjazovL2tyLy4vc3JjL21lZGlhL2NvbV9rbm93cmVzL2pzL3NyYy9zaXRlL21hcC5qcyIsIndlYnBhY2s6Ly9rci8uL3NyYy9tZWRpYS9jb21fa25vd3Jlcy9qcy9zcmMvc2l0ZS9yb3V0ZS5qcyIsIndlYnBhY2s6Ly9rci8uL3dlYnBhY2suYnVpbGQuc2l0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIE5wbSB2ZXJzaW9uIG9mIG1hcmtlckNsdXN0ZXJlciB3b3JrcyBncmVhdCB3aXRoIGJyb3dzZXJpZnlcbiAqIERpZmZlcmVuY2UgZnJvbSB0aGUgb3JpZ2luYWwgLSBhZGRzIGEgY29tbW9uanMgZm9ybWF0IGFuZCByZXBsYWNlcyB3aW5kb3cgd2l0aCBnbG9iYWwgYW5kIHNvbWUgdW5pdCB0ZXN0XG4gKiBUaGUgb3JpZ2luYWwgZnVuY3Rpb25hbGl0eSBpdCdzIG5vdCBtb2RpZmllZCBmb3IgZG9jcyBhbmQgb3JpZ2luYWwgc291cmNlIGNoZWNrXG4gKiBodHRwczovL2dpdGh1Yi5jb20vZ29vZ2xlbWFwcy9qcy1tYXJrZXItY2x1c3RlcmVyXG4gKi9cblxuLyoqXG4gKiBAbmFtZSBNYXJrZXJDbHVzdGVyZXIgZm9yIEdvb2dsZSBNYXBzIHYzXG4gKiBAdmVyc2lvbiB2ZXJzaW9uIDEuMFxuICogQGF1dGhvciBMdWtlIE1haGVcbiAqIEBmaWxlb3ZlcnZpZXdcbiAqIFRoZSBsaWJyYXJ5IGNyZWF0ZXMgYW5kIG1hbmFnZXMgcGVyLXpvb20tbGV2ZWwgY2x1c3RlcnMgZm9yIGxhcmdlIGFtb3VudHMgb2ZcbiAqIG1hcmtlcnMuXG4gKiA8YnIvPlxuICogVGhpcyBpcyBhIHYzIGltcGxlbWVudGF0aW9uIG9mIHRoZVxuICogPGEgaHJlZj1cImh0dHA6Ly9nbWFwcy11dGlsaXR5LWxpYnJhcnktZGV2Lmdvb2dsZWNvZGUuY29tL3N2bi90YWdzL21hcmtlcmNsdXN0ZXJlci9cIlxuICogPnYyIE1hcmtlckNsdXN0ZXJlcjwvYT4uXG4gKi9cblxuLyoqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuXG4vKipcbiAqIEEgTWFya2VyIENsdXN0ZXJlciB0aGF0IGNsdXN0ZXJzIG1hcmtlcnMuXG4gKlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5NYXB9IG1hcCBUaGUgR29vZ2xlIG1hcCB0byBhdHRhY2ggdG8uXG4gKiBAcGFyYW0ge0FycmF5Ljxnb29nbGUubWFwcy5NYXJrZXI+PX0gb3B0X21hcmtlcnMgT3B0aW9uYWwgbWFya2VycyB0byBhZGQgdG9cbiAqICAgdGhlIGNsdXN0ZXIuXG4gKiBAcGFyYW0ge09iamVjdD19IG9wdF9vcHRpb25zIHN1cHBvcnQgdGhlIGZvbGxvd2luZyBvcHRpb25zOlxuICogICAgICdncmlkU2l6ZSc6IChudW1iZXIpIFRoZSBncmlkIHNpemUgb2YgYSBjbHVzdGVyIGluIHBpeGVscy5cbiAqICAgICAnbWF4Wm9vbSc6IChudW1iZXIpIFRoZSBtYXhpbXVtIHpvb20gbGV2ZWwgdGhhdCBhIG1hcmtlciBjYW4gYmUgcGFydCBvZiBhXG4gKiAgICAgICAgICAgICAgICBjbHVzdGVyLlxuICogICAgICd6b29tT25DbGljayc6IChib29sZWFuKSBXaGV0aGVyIHRoZSBkZWZhdWx0IGJlaGF2aW91ciBvZiBjbGlja2luZyBvbiBhXG4gKiAgICAgICAgICAgICAgICAgICAgY2x1c3RlciBpcyB0byB6b29tIGludG8gaXQuXG4gKiAgICAgJ2F2ZXJhZ2VDZW50ZXInOiAoYm9vbGVhbikgV2V0aGVyIHRoZSBjZW50ZXIgb2YgZWFjaCBjbHVzdGVyIHNob3VsZCBiZVxuICogICAgICAgICAgICAgICAgICAgICAgdGhlIGF2ZXJhZ2Ugb2YgYWxsIG1hcmtlcnMgaW4gdGhlIGNsdXN0ZXIuXG4gKiAgICAgJ21pbmltdW1DbHVzdGVyU2l6ZSc6IChudW1iZXIpIFRoZSBtaW5pbXVtIG51bWJlciBvZiBtYXJrZXJzIHRvIGJlIGluIGFcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgY2x1c3RlciBiZWZvcmUgdGhlIG1hcmtlcnMgYXJlIGhpZGRlbiBhbmQgYSBjb3VudFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICBpcyBzaG93bi5cbiAqICAgICAnc3R5bGVzJzogKG9iamVjdCkgQW4gb2JqZWN0IHRoYXQgaGFzIHN0eWxlIHByb3BlcnRpZXM6XG4gKiAgICAgICAndXJsJzogKHN0cmluZykgVGhlIGltYWdlIHVybC5cbiAqICAgICAgICdoZWlnaHQnOiAobnVtYmVyKSBUaGUgaW1hZ2UgaGVpZ2h0LlxuICogICAgICAgJ3dpZHRoJzogKG51bWJlcikgVGhlIGltYWdlIHdpZHRoLlxuICogICAgICAgJ2FuY2hvcic6IChBcnJheSkgVGhlIGFuY2hvciBwb3NpdGlvbiBvZiB0aGUgbGFiZWwgdGV4dC5cbiAqICAgICAgICd0ZXh0Q29sb3InOiAoc3RyaW5nKSBUaGUgdGV4dCBjb2xvci5cbiAqICAgICAgICd0ZXh0U2l6ZSc6IChudW1iZXIpIFRoZSB0ZXh0IHNpemUuXG4gKiAgICAgICAnZm9udEZhbWlseSc6IChzdHJpbmcpIFRoZSBmb250IGZhbWlseS5cbiAqICAgICAgICdmb250V2VpZ2h0JzogKHN0cmluZykgVGhlIGZvbnQgd2VpZ2h0LlxuICogICAgICAgJ2JhY2tncm91bmRQb3NpdGlvbic6IChzdHJpbmcpIFRoZSBwb3NpdGlvbiBvZiB0aGUgYmFja2dvdW5kIHgsIHkuXG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlbmRzIGdvb2dsZS5tYXBzLk92ZXJsYXlWaWV3XG4gKi9cbmZ1bmN0aW9uIE1hcmtlckNsdXN0ZXJlcihtYXAsIG9wdF9tYXJrZXJzLCBvcHRfb3B0aW9ucykge1xuICAvLyBNYXJrZXJDbHVzdGVyZXIgaW1wbGVtZW50cyBnb29nbGUubWFwcy5PdmVybGF5VmlldyBpbnRlcmZhY2UuIFdlIHVzZSB0aGVcbiAgLy8gZXh0ZW5kIGZ1bmN0aW9uIHRvIGV4dGVuZCBNYXJrZXJDbHVzdGVyZXIgd2l0aCBnb29nbGUubWFwcy5PdmVybGF5Vmlld1xuICAvLyBiZWNhdXNlIGl0IG1pZ2h0IG5vdCBhbHdheXMgYmUgYXZhaWxhYmxlIHdoZW4gdGhlIGNvZGUgaXMgZGVmaW5lZCBzbyB3ZVxuICAvLyBsb29rIGZvciBpdCBhdCB0aGUgbGFzdCBwb3NzaWJsZSBtb21lbnQuIElmIGl0IGRvZXNuJ3QgZXhpc3Qgbm93IHRoZW5cbiAgLy8gdGhlcmUgaXMgbm8gcG9pbnQgZ29pbmcgYWhlYWQgOilcbiAgdGhpcy5leHRlbmQoTWFya2VyQ2x1c3RlcmVyLCBnb29nbGUubWFwcy5PdmVybGF5Vmlldyk7XG4gIHRoaXMubWFwXyA9IG1hcDtcblxuICAvKipcbiAgICogQHR5cGUge0FycmF5Ljxnb29nbGUubWFwcy5NYXJrZXI+fVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgdGhpcy5tYXJrZXJzXyA9IFtdO1xuXG4gIC8qKlxuICAgKiAgQHR5cGUge0FycmF5LjxDbHVzdGVyPn1cbiAgICovXG4gIHRoaXMuY2x1c3RlcnNfID0gW107XG5cbiAgdGhpcy5zaXplcyA9IFs1MywgNTYsIDY2LCA3OCwgOTBdO1xuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgdGhpcy5zdHlsZXNfID0gW107XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgdGhpcy5yZWFkeV8gPSBmYWxzZTtcblxuICB2YXIgb3B0aW9ucyA9IG9wdF9vcHRpb25zIHx8IHt9O1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgdGhpcy5ncmlkU2l6ZV8gPSBvcHRpb25zWydncmlkU2l6ZSddIHx8IDYwO1xuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgdGhpcy5taW5DbHVzdGVyU2l6ZV8gPSBvcHRpb25zWydtaW5pbXVtQ2x1c3RlclNpemUnXSB8fCAyO1xuXG5cbiAgLyoqXG4gICAqIEB0eXBlIHs/bnVtYmVyfVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgdGhpcy5tYXhab29tXyA9IG9wdGlvbnNbJ21heFpvb20nXSB8fCBudWxsO1xuXG4gIHRoaXMuc3R5bGVzXyA9IG9wdGlvbnNbJ3N0eWxlcyddIHx8IFtdO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgdGhpcy5pbWFnZVBhdGhfID0gb3B0aW9uc1snaW1hZ2VQYXRoJ10gfHxcbiAgICAgIHRoaXMuTUFSS0VSX0NMVVNURVJfSU1BR0VfUEFUSF87XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICB0aGlzLmltYWdlRXh0ZW5zaW9uXyA9IG9wdGlvbnNbJ2ltYWdlRXh0ZW5zaW9uJ10gfHxcbiAgICAgIHRoaXMuTUFSS0VSX0NMVVNURVJfSU1BR0VfRVhURU5TSU9OXztcblxuICAvKipcbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICB0aGlzLnpvb21PbkNsaWNrXyA9IHRydWU7XG5cbiAgaWYgKG9wdGlvbnNbJ3pvb21PbkNsaWNrJ10gIT0gdW5kZWZpbmVkKSB7XG4gICAgdGhpcy56b29tT25DbGlja18gPSBvcHRpb25zWyd6b29tT25DbGljayddO1xuICB9XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgdGhpcy5hdmVyYWdlQ2VudGVyXyA9IGZhbHNlO1xuXG4gIGlmIChvcHRpb25zWydhdmVyYWdlQ2VudGVyJ10gIT0gdW5kZWZpbmVkKSB7XG4gICAgdGhpcy5hdmVyYWdlQ2VudGVyXyA9IG9wdGlvbnNbJ2F2ZXJhZ2VDZW50ZXInXTtcbiAgfVxuXG4gIHRoaXMuc2V0dXBTdHlsZXNfKCk7XG5cbiAgdGhpcy5zZXRNYXAobWFwKTtcblxuICAvKipcbiAgICogQHR5cGUge251bWJlcn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHRoaXMucHJldlpvb21fID0gdGhpcy5tYXBfLmdldFpvb20oKTtcblxuICAvLyBBZGQgdGhlIG1hcCBldmVudCBsaXN0ZW5lcnNcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcih0aGlzLm1hcF8sICd6b29tX2NoYW5nZWQnLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgem9vbSA9IHRoYXQubWFwXy5nZXRab29tKCk7XG5cbiAgICBpZiAodGhhdC5wcmV2Wm9vbV8gIT0gem9vbSkge1xuICAgICAgdGhhdC5wcmV2Wm9vbV8gPSB6b29tO1xuICAgICAgdGhhdC5yZXNldFZpZXdwb3J0KCk7XG4gICAgfVxuICB9KTtcblxuICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcih0aGlzLm1hcF8sICdpZGxlJywgZnVuY3Rpb24oKSB7XG4gICAgdGhhdC5yZWRyYXcoKTtcbiAgfSk7XG5cbiAgLy8gRmluYWxseSwgYWRkIHRoZSBtYXJrZXJzXG4gIGlmIChvcHRfbWFya2VycyAmJiBvcHRfbWFya2Vycy5sZW5ndGgpIHtcbiAgICB0aGlzLmFkZE1hcmtlcnMob3B0X21hcmtlcnMsIGZhbHNlKTtcbiAgfVxufVxuXG5cbi8qKlxuICogVGhlIG1hcmtlciBjbHVzdGVyIGltYWdlIHBhdGguXG4gKlxuICogQHR5cGUge3N0cmluZ31cbiAqIEBwcml2YXRlXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuTUFSS0VSX0NMVVNURVJfSU1BR0VfUEFUSF8gPVxuICAgICdodHRwOi8vZ29vZ2xlLW1hcHMtdXRpbGl0eS1saWJyYXJ5LXYzLmdvb2dsZWNvZGUuY29tL3N2bi90cnVuay9tYXJrZXJjbHVzdGVyZXIvJyArXG4gICAgJ2ltYWdlcy9tJztcblxuXG4vKipcbiAqIFRoZSBtYXJrZXIgY2x1c3RlciBpbWFnZSBwYXRoLlxuICpcbiAqIEB0eXBlIHtzdHJpbmd9XG4gKiBAcHJpdmF0ZVxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLk1BUktFUl9DTFVTVEVSX0lNQUdFX0VYVEVOU0lPTl8gPSAncG5nJztcblxuXG4vKipcbiAqIEV4dGVuZHMgYSBvYmplY3RzIHByb3RvdHlwZSBieSBhbm90aGVycy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqMSBUaGUgb2JqZWN0IHRvIGJlIGV4dGVuZGVkLlxuICogQHBhcmFtIHtPYmplY3R9IG9iajIgVGhlIG9iamVjdCB0byBleHRlbmQgd2l0aC5cbiAqIEByZXR1cm4ge09iamVjdH0gVGhlIG5ldyBleHRlbmRlZCBvYmplY3QuXG4gKiBAaWdub3JlXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZXh0ZW5kID0gZnVuY3Rpb24ob2JqMSwgb2JqMikge1xuICByZXR1cm4gKGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIGZvciAodmFyIHByb3BlcnR5IGluIG9iamVjdC5wcm90b3R5cGUpIHtcbiAgICAgIHRoaXMucHJvdG90eXBlW3Byb3BlcnR5XSA9IG9iamVjdC5wcm90b3R5cGVbcHJvcGVydHldO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfSkuYXBwbHkob2JqMSwgW29iajJdKTtcbn07XG5cblxuLyoqXG4gKiBJbXBsZW1lbnRhaW9uIG9mIHRoZSBpbnRlcmZhY2UgbWV0aG9kLlxuICogQGlnbm9yZVxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLm9uQWRkID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuc2V0UmVhZHlfKHRydWUpO1xufTtcblxuLyoqXG4gKiBJbXBsZW1lbnRhaW9uIG9mIHRoZSBpbnRlcmZhY2UgbWV0aG9kLlxuICogQGlnbm9yZVxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmRyYXcgPSBmdW5jdGlvbigpIHt9O1xuXG4vKipcbiAqIFNldHMgdXAgdGhlIHN0eWxlcyBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5zZXR1cFN0eWxlc18gPSBmdW5jdGlvbigpIHtcbiAgaWYgKHRoaXMuc3R5bGVzXy5sZW5ndGgpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBmb3IgKHZhciBpID0gMCwgc2l6ZTsgc2l6ZSA9IHRoaXMuc2l6ZXNbaV07IGkrKykge1xuICAgIHRoaXMuc3R5bGVzXy5wdXNoKHtcbiAgICAgIHVybDogdGhpcy5pbWFnZVBhdGhfICsgKGkgKyAxKSArICcuJyArIHRoaXMuaW1hZ2VFeHRlbnNpb25fLFxuICAgICAgaGVpZ2h0OiBzaXplLFxuICAgICAgd2lkdGg6IHNpemVcbiAgICB9KTtcbiAgfVxufTtcblxuLyoqXG4gKiAgRml0IHRoZSBtYXAgdG8gdGhlIGJvdW5kcyBvZiB0aGUgbWFya2VycyBpbiB0aGUgY2x1c3RlcmVyLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmZpdE1hcFRvTWFya2VycyA9IGZ1bmN0aW9uKCkge1xuICB2YXIgbWFya2VycyA9IHRoaXMuZ2V0TWFya2VycygpO1xuICB2YXIgYm91bmRzID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZ0JvdW5kcygpO1xuICBmb3IgKHZhciBpID0gMCwgbWFya2VyOyBtYXJrZXIgPSBtYXJrZXJzW2ldOyBpKyspIHtcbiAgICBib3VuZHMuZXh0ZW5kKG1hcmtlci5nZXRQb3NpdGlvbigpKTtcbiAgfVxuXG4gIHRoaXMubWFwXy5maXRCb3VuZHMoYm91bmRzKTtcbn07XG5cblxuLyoqXG4gKiAgU2V0cyB0aGUgc3R5bGVzLlxuICpcbiAqICBAcGFyYW0ge09iamVjdH0gc3R5bGVzIFRoZSBzdHlsZSB0byBzZXQuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuc2V0U3R5bGVzID0gZnVuY3Rpb24oc3R5bGVzKSB7XG4gIHRoaXMuc3R5bGVzXyA9IHN0eWxlcztcbn07XG5cblxuLyoqXG4gKiAgR2V0cyB0aGUgc3R5bGVzLlxuICpcbiAqICBAcmV0dXJuIHtPYmplY3R9IFRoZSBzdHlsZXMgb2JqZWN0LlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldFN0eWxlcyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5zdHlsZXNfO1xufTtcblxuXG4vKipcbiAqIFdoZXRoZXIgem9vbSBvbiBjbGljayBpcyBzZXQuXG4gKlxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB6b29tT25DbGlja18gaXMgc2V0LlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmlzWm9vbU9uQ2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuem9vbU9uQ2xpY2tfO1xufTtcblxuLyoqXG4gKiBXaGV0aGVyIGF2ZXJhZ2UgY2VudGVyIGlzIHNldC5cbiAqXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIGF2ZXJhZ2VDZW50ZXJfIGlzIHNldC5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5pc0F2ZXJhZ2VDZW50ZXIgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuYXZlcmFnZUNlbnRlcl87XG59O1xuXG5cbi8qKlxuICogIFJldHVybnMgdGhlIGFycmF5IG9mIG1hcmtlcnMgaW4gdGhlIGNsdXN0ZXJlci5cbiAqXG4gKiAgQHJldHVybiB7QXJyYXkuPGdvb2dsZS5tYXBzLk1hcmtlcj59IFRoZSBtYXJrZXJzLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldE1hcmtlcnMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMubWFya2Vyc187XG59O1xuXG5cbi8qKlxuICogIFJldHVybnMgdGhlIG51bWJlciBvZiBtYXJrZXJzIGluIHRoZSBjbHVzdGVyZXJcbiAqXG4gKiAgQHJldHVybiB7TnVtYmVyfSBUaGUgbnVtYmVyIG9mIG1hcmtlcnMuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0VG90YWxNYXJrZXJzID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLm1hcmtlcnNfLmxlbmd0aDtcbn07XG5cblxuLyoqXG4gKiAgU2V0cyB0aGUgbWF4IHpvb20gZm9yIHRoZSBjbHVzdGVyZXIuXG4gKlxuICogIEBwYXJhbSB7bnVtYmVyfSBtYXhab29tIFRoZSBtYXggem9vbSBsZXZlbC5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5zZXRNYXhab29tID0gZnVuY3Rpb24obWF4Wm9vbSkge1xuICB0aGlzLm1heFpvb21fID0gbWF4Wm9vbTtcbn07XG5cblxuLyoqXG4gKiAgR2V0cyB0aGUgbWF4IHpvb20gZm9yIHRoZSBjbHVzdGVyZXIuXG4gKlxuICogIEByZXR1cm4ge251bWJlcn0gVGhlIG1heCB6b29tIGxldmVsLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldE1heFpvb20gPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMubWF4Wm9vbV87XG59O1xuXG5cbi8qKlxuICogIFRoZSBmdW5jdGlvbiBmb3IgY2FsY3VsYXRpbmcgdGhlIGNsdXN0ZXIgaWNvbiBpbWFnZS5cbiAqXG4gKiAgQHBhcmFtIHtBcnJheS48Z29vZ2xlLm1hcHMuTWFya2VyPn0gbWFya2VycyBUaGUgbWFya2VycyBpbiB0aGUgY2x1c3RlcmVyLlxuICogIEBwYXJhbSB7bnVtYmVyfSBudW1TdHlsZXMgVGhlIG51bWJlciBvZiBzdHlsZXMgYXZhaWxhYmxlLlxuICogIEByZXR1cm4ge09iamVjdH0gQSBvYmplY3QgcHJvcGVydGllczogJ3RleHQnIChzdHJpbmcpIGFuZCAnaW5kZXgnIChudW1iZXIpLlxuICogIEBwcml2YXRlXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuY2FsY3VsYXRvcl8gPSBmdW5jdGlvbihtYXJrZXJzLCBudW1TdHlsZXMpIHtcbiAgdmFyIGluZGV4ID0gMDtcbiAgdmFyIGNvdW50ID0gbWFya2Vycy5sZW5ndGg7XG4gIHZhciBkdiA9IGNvdW50O1xuICB3aGlsZSAoZHYgIT09IDApIHtcbiAgICBkdiA9IHBhcnNlSW50KGR2IC8gMTAsIDEwKTtcbiAgICBpbmRleCsrO1xuICB9XG5cbiAgaW5kZXggPSBNYXRoLm1pbihpbmRleCwgbnVtU3R5bGVzKTtcbiAgcmV0dXJuIHtcbiAgICB0ZXh0OiBjb3VudCxcbiAgICBpbmRleDogaW5kZXhcbiAgfTtcbn07XG5cblxuLyoqXG4gKiBTZXQgdGhlIGNhbGN1bGF0b3IgZnVuY3Rpb24uXG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbihBcnJheSwgbnVtYmVyKX0gY2FsY3VsYXRvciBUaGUgZnVuY3Rpb24gdG8gc2V0IGFzIHRoZVxuICogICAgIGNhbGN1bGF0b3IuIFRoZSBmdW5jdGlvbiBzaG91bGQgcmV0dXJuIGEgb2JqZWN0IHByb3BlcnRpZXM6XG4gKiAgICAgJ3RleHQnIChzdHJpbmcpIGFuZCAnaW5kZXgnIChudW1iZXIpLlxuICpcbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5zZXRDYWxjdWxhdG9yID0gZnVuY3Rpb24oY2FsY3VsYXRvcikge1xuICB0aGlzLmNhbGN1bGF0b3JfID0gY2FsY3VsYXRvcjtcbn07XG5cblxuLyoqXG4gKiBHZXQgdGhlIGNhbGN1bGF0b3IgZnVuY3Rpb24uXG4gKlxuICogQHJldHVybiB7ZnVuY3Rpb24oQXJyYXksIG51bWJlcil9IHRoZSBjYWxjdWxhdG9yIGZ1bmN0aW9uLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldENhbGN1bGF0b3IgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuY2FsY3VsYXRvcl87XG59O1xuXG5cbi8qKlxuICogQWRkIGFuIGFycmF5IG9mIG1hcmtlcnMgdG8gdGhlIGNsdXN0ZXJlci5cbiAqXG4gKiBAcGFyYW0ge0FycmF5Ljxnb29nbGUubWFwcy5NYXJrZXI+fSBtYXJrZXJzIFRoZSBtYXJrZXJzIHRvIGFkZC5cbiAqIEBwYXJhbSB7Ym9vbGVhbj19IG9wdF9ub2RyYXcgV2hldGhlciB0byByZWRyYXcgdGhlIGNsdXN0ZXJzLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmFkZE1hcmtlcnMgPSBmdW5jdGlvbihtYXJrZXJzLCBvcHRfbm9kcmF3KSB7XG4gIGZvciAodmFyIGkgPSAwLCBtYXJrZXI7IG1hcmtlciA9IG1hcmtlcnNbaV07IGkrKykge1xuICAgIHRoaXMucHVzaE1hcmtlclRvXyhtYXJrZXIpO1xuICB9XG4gIGlmICghb3B0X25vZHJhdykge1xuICAgIHRoaXMucmVkcmF3KCk7XG4gIH1cbn07XG5cblxuLyoqXG4gKiBQdXNoZXMgYSBtYXJrZXIgdG8gdGhlIGNsdXN0ZXJlci5cbiAqXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLk1hcmtlcn0gbWFya2VyIFRoZSBtYXJrZXIgdG8gYWRkLlxuICogQHByaXZhdGVcbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5wdXNoTWFya2VyVG9fID0gZnVuY3Rpb24obWFya2VyKSB7XG4gIG1hcmtlci5pc0FkZGVkID0gZmFsc2U7XG4gIGlmIChtYXJrZXJbJ2RyYWdnYWJsZSddKSB7XG4gICAgLy8gSWYgdGhlIG1hcmtlciBpcyBkcmFnZ2FibGUgYWRkIGEgbGlzdGVuZXIgc28gd2UgdXBkYXRlIHRoZSBjbHVzdGVycyBvblxuICAgIC8vIHRoZSBkcmFnIGVuZC5cbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIobWFya2VyLCAnZHJhZ2VuZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgbWFya2VyLmlzQWRkZWQgPSBmYWxzZTtcbiAgICAgIHRoYXQucmVwYWludCgpO1xuICAgIH0pO1xuICB9XG4gIHRoaXMubWFya2Vyc18ucHVzaChtYXJrZXIpO1xufTtcblxuXG4vKipcbiAqIEFkZHMgYSBtYXJrZXIgdG8gdGhlIGNsdXN0ZXJlciBhbmQgcmVkcmF3cyBpZiBuZWVkZWQuXG4gKlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5NYXJrZXJ9IG1hcmtlciBUaGUgbWFya2VyIHRvIGFkZC5cbiAqIEBwYXJhbSB7Ym9vbGVhbj19IG9wdF9ub2RyYXcgV2hldGhlciB0byByZWRyYXcgdGhlIGNsdXN0ZXJzLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmFkZE1hcmtlciA9IGZ1bmN0aW9uKG1hcmtlciwgb3B0X25vZHJhdykge1xuICB0aGlzLnB1c2hNYXJrZXJUb18obWFya2VyKTtcbiAgaWYgKCFvcHRfbm9kcmF3KSB7XG4gICAgdGhpcy5yZWRyYXcoKTtcbiAgfVxufTtcblxuXG4vKipcbiAqIFJlbW92ZXMgYSBtYXJrZXIgYW5kIHJldHVybnMgdHJ1ZSBpZiByZW1vdmVkLCBmYWxzZSBpZiBub3RcbiAqXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLk1hcmtlcn0gbWFya2VyIFRoZSBtYXJrZXIgdG8gcmVtb3ZlXG4gKiBAcmV0dXJuIHtib29sZWFufSBXaGV0aGVyIHRoZSBtYXJrZXIgd2FzIHJlbW92ZWQgb3Igbm90XG4gKiBAcHJpdmF0ZVxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnJlbW92ZU1hcmtlcl8gPSBmdW5jdGlvbihtYXJrZXIpIHtcbiAgdmFyIGluZGV4ID0gLTE7XG4gIGlmICh0aGlzLm1hcmtlcnNfLmluZGV4T2YpIHtcbiAgICBpbmRleCA9IHRoaXMubWFya2Vyc18uaW5kZXhPZihtYXJrZXIpO1xuICB9IGVsc2Uge1xuICAgIGZvciAodmFyIGkgPSAwLCBtOyBtID0gdGhpcy5tYXJrZXJzX1tpXTsgaSsrKSB7XG4gICAgICBpZiAobSA9PSBtYXJrZXIpIHtcbiAgICAgICAgaW5kZXggPSBpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAoaW5kZXggPT0gLTEpIHtcbiAgICAvLyBNYXJrZXIgaXMgbm90IGluIG91ciBsaXN0IG9mIG1hcmtlcnMuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgbWFya2VyLnNldE1hcChudWxsKTtcblxuICB0aGlzLm1hcmtlcnNfLnNwbGljZShpbmRleCwgMSk7XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5cbi8qKlxuICogUmVtb3ZlIGEgbWFya2VyIGZyb20gdGhlIGNsdXN0ZXIuXG4gKlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5NYXJrZXJ9IG1hcmtlciBUaGUgbWFya2VyIHRvIHJlbW92ZS5cbiAqIEBwYXJhbSB7Ym9vbGVhbj19IG9wdF9ub2RyYXcgT3B0aW9uYWwgYm9vbGVhbiB0byBmb3JjZSBubyByZWRyYXcuXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIHRoZSBtYXJrZXIgd2FzIHJlbW92ZWQuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUucmVtb3ZlTWFya2VyID0gZnVuY3Rpb24obWFya2VyLCBvcHRfbm9kcmF3KSB7XG4gIHZhciByZW1vdmVkID0gdGhpcy5yZW1vdmVNYXJrZXJfKG1hcmtlcik7XG5cbiAgaWYgKCFvcHRfbm9kcmF3ICYmIHJlbW92ZWQpIHtcbiAgICB0aGlzLnJlc2V0Vmlld3BvcnQoKTtcbiAgICB0aGlzLnJlZHJhdygpO1xuICAgIHJldHVybiB0cnVlO1xuICB9IGVsc2Uge1xuICAgcmV0dXJuIGZhbHNlO1xuICB9XG59O1xuXG5cbi8qKlxuICogUmVtb3ZlcyBhbiBhcnJheSBvZiBtYXJrZXJzIGZyb20gdGhlIGNsdXN0ZXIuXG4gKlxuICogQHBhcmFtIHtBcnJheS48Z29vZ2xlLm1hcHMuTWFya2VyPn0gbWFya2VycyBUaGUgbWFya2VycyB0byByZW1vdmUuXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSBvcHRfbm9kcmF3IE9wdGlvbmFsIGJvb2xlYW4gdG8gZm9yY2Ugbm8gcmVkcmF3LlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnJlbW92ZU1hcmtlcnMgPSBmdW5jdGlvbihtYXJrZXJzLCBvcHRfbm9kcmF3KSB7XG4gIHZhciByZW1vdmVkID0gZmFsc2U7XG5cbiAgZm9yICh2YXIgaSA9IDAsIG1hcmtlcjsgbWFya2VyID0gbWFya2Vyc1tpXTsgaSsrKSB7XG4gICAgdmFyIHIgPSB0aGlzLnJlbW92ZU1hcmtlcl8obWFya2VyKTtcbiAgICByZW1vdmVkID0gcmVtb3ZlZCB8fCByO1xuICB9XG5cbiAgaWYgKCFvcHRfbm9kcmF3ICYmIHJlbW92ZWQpIHtcbiAgICB0aGlzLnJlc2V0Vmlld3BvcnQoKTtcbiAgICB0aGlzLnJlZHJhdygpO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59O1xuXG5cbi8qKlxuICogU2V0cyB0aGUgY2x1c3RlcmVyJ3MgcmVhZHkgc3RhdGUuXG4gKlxuICogQHBhcmFtIHtib29sZWFufSByZWFkeSBUaGUgc3RhdGUuXG4gKiBAcHJpdmF0ZVxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnNldFJlYWR5XyA9IGZ1bmN0aW9uKHJlYWR5KSB7XG4gIGlmICghdGhpcy5yZWFkeV8pIHtcbiAgICB0aGlzLnJlYWR5XyA9IHJlYWR5O1xuICAgIHRoaXMuY3JlYXRlQ2x1c3RlcnNfKCk7XG4gIH1cbn07XG5cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgY2x1c3RlcnMgaW4gdGhlIGNsdXN0ZXJlci5cbiAqXG4gKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSBudW1iZXIgb2YgY2x1c3RlcnMuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0VG90YWxDbHVzdGVycyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5jbHVzdGVyc18ubGVuZ3RoO1xufTtcblxuXG4vKipcbiAqIFJldHVybnMgdGhlIGdvb2dsZSBtYXAgdGhhdCB0aGUgY2x1c3RlcmVyIGlzIGFzc29jaWF0ZWQgd2l0aC5cbiAqXG4gKiBAcmV0dXJuIHtnb29nbGUubWFwcy5NYXB9IFRoZSBtYXAuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0TWFwID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLm1hcF87XG59O1xuXG5cbi8qKlxuICogU2V0cyB0aGUgZ29vZ2xlIG1hcCB0aGF0IHRoZSBjbHVzdGVyZXIgaXMgYXNzb2NpYXRlZCB3aXRoLlxuICpcbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTWFwfSBtYXAgVGhlIG1hcC5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5zZXRNYXAgPSBmdW5jdGlvbihtYXApIHtcbiAgdGhpcy5tYXBfID0gbWFwO1xufTtcblxuXG4vKipcbiAqIFJldHVybnMgdGhlIHNpemUgb2YgdGhlIGdyaWQuXG4gKlxuICogQHJldHVybiB7bnVtYmVyfSBUaGUgZ3JpZCBzaXplLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldEdyaWRTaXplID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmdyaWRTaXplXztcbn07XG5cblxuLyoqXG4gKiBTZXRzIHRoZSBzaXplIG9mIHRoZSBncmlkLlxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBzaXplIFRoZSBncmlkIHNpemUuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuc2V0R3JpZFNpemUgPSBmdW5jdGlvbihzaXplKSB7XG4gIHRoaXMuZ3JpZFNpemVfID0gc2l6ZTtcbn07XG5cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBtaW4gY2x1c3RlciBzaXplLlxuICpcbiAqIEByZXR1cm4ge251bWJlcn0gVGhlIGdyaWQgc2l6ZS5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRNaW5DbHVzdGVyU2l6ZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5taW5DbHVzdGVyU2l6ZV87XG59O1xuXG4vKipcbiAqIFNldHMgdGhlIG1pbiBjbHVzdGVyIHNpemUuXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IHNpemUgVGhlIGdyaWQgc2l6ZS5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5zZXRNaW5DbHVzdGVyU2l6ZSA9IGZ1bmN0aW9uKHNpemUpIHtcbiAgdGhpcy5taW5DbHVzdGVyU2l6ZV8gPSBzaXplO1xufTtcblxuXG4vKipcbiAqIEV4dGVuZHMgYSBib3VuZHMgb2JqZWN0IGJ5IHRoZSBncmlkIHNpemUuXG4gKlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5MYXRMbmdCb3VuZHN9IGJvdW5kcyBUaGUgYm91bmRzIHRvIGV4dGVuZC5cbiAqIEByZXR1cm4ge2dvb2dsZS5tYXBzLkxhdExuZ0JvdW5kc30gVGhlIGV4dGVuZGVkIGJvdW5kcy5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRFeHRlbmRlZEJvdW5kcyA9IGZ1bmN0aW9uKGJvdW5kcykge1xuICB2YXIgcHJvamVjdGlvbiA9IHRoaXMuZ2V0UHJvamVjdGlvbigpO1xuXG4gIC8vIFR1cm4gdGhlIGJvdW5kcyBpbnRvIGxhdGxuZy5cbiAgdmFyIHRyID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhib3VuZHMuZ2V0Tm9ydGhFYXN0KCkubGF0KCksXG4gICAgICBib3VuZHMuZ2V0Tm9ydGhFYXN0KCkubG5nKCkpO1xuICB2YXIgYmwgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKGJvdW5kcy5nZXRTb3V0aFdlc3QoKS5sYXQoKSxcbiAgICAgIGJvdW5kcy5nZXRTb3V0aFdlc3QoKS5sbmcoKSk7XG5cbiAgLy8gQ29udmVydCB0aGUgcG9pbnRzIHRvIHBpeGVscyBhbmQgdGhlIGV4dGVuZCBvdXQgYnkgdGhlIGdyaWQgc2l6ZS5cbiAgdmFyIHRyUGl4ID0gcHJvamVjdGlvbi5mcm9tTGF0TG5nVG9EaXZQaXhlbCh0cik7XG4gIHRyUGl4LnggKz0gdGhpcy5ncmlkU2l6ZV87XG4gIHRyUGl4LnkgLT0gdGhpcy5ncmlkU2l6ZV87XG5cbiAgdmFyIGJsUGl4ID0gcHJvamVjdGlvbi5mcm9tTGF0TG5nVG9EaXZQaXhlbChibCk7XG4gIGJsUGl4LnggLT0gdGhpcy5ncmlkU2l6ZV87XG4gIGJsUGl4LnkgKz0gdGhpcy5ncmlkU2l6ZV87XG5cbiAgLy8gQ29udmVydCB0aGUgcGl4ZWwgcG9pbnRzIGJhY2sgdG8gTGF0TG5nXG4gIHZhciBuZSA9IHByb2plY3Rpb24uZnJvbURpdlBpeGVsVG9MYXRMbmcodHJQaXgpO1xuICB2YXIgc3cgPSBwcm9qZWN0aW9uLmZyb21EaXZQaXhlbFRvTGF0TG5nKGJsUGl4KTtcblxuICAvLyBFeHRlbmQgdGhlIGJvdW5kcyB0byBjb250YWluIHRoZSBuZXcgYm91bmRzLlxuICBib3VuZHMuZXh0ZW5kKG5lKTtcbiAgYm91bmRzLmV4dGVuZChzdyk7XG5cbiAgcmV0dXJuIGJvdW5kcztcbn07XG5cblxuLyoqXG4gKiBEZXRlcm1pbnMgaWYgYSBtYXJrZXIgaXMgY29udGFpbmVkIGluIGEgYm91bmRzLlxuICpcbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTWFya2VyfSBtYXJrZXIgVGhlIG1hcmtlciB0byBjaGVjay5cbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTGF0TG5nQm91bmRzfSBib3VuZHMgVGhlIGJvdW5kcyB0byBjaGVjayBhZ2FpbnN0LlxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgbWFya2VyIGlzIGluIHRoZSBib3VuZHMuXG4gKiBAcHJpdmF0ZVxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmlzTWFya2VySW5Cb3VuZHNfID0gZnVuY3Rpb24obWFya2VyLCBib3VuZHMpIHtcbiAgcmV0dXJuIGJvdW5kcy5jb250YWlucyhtYXJrZXIuZ2V0UG9zaXRpb24oKSk7XG59O1xuXG5cbi8qKlxuICogQ2xlYXJzIGFsbCBjbHVzdGVycyBhbmQgbWFya2VycyBmcm9tIHRoZSBjbHVzdGVyZXIuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuY2xlYXJNYXJrZXJzID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMucmVzZXRWaWV3cG9ydCh0cnVlKTtcblxuICAvLyBTZXQgdGhlIG1hcmtlcnMgYSBlbXB0eSBhcnJheS5cbiAgdGhpcy5tYXJrZXJzXyA9IFtdO1xufTtcblxuXG4vKipcbiAqIENsZWFycyBhbGwgZXhpc3RpbmcgY2x1c3RlcnMgYW5kIHJlY3JlYXRlcyB0aGVtLlxuICogQHBhcmFtIHtib29sZWFufSBvcHRfaGlkZSBUbyBhbHNvIGhpZGUgdGhlIG1hcmtlci5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5yZXNldFZpZXdwb3J0ID0gZnVuY3Rpb24ob3B0X2hpZGUpIHtcbiAgLy8gUmVtb3ZlIGFsbCB0aGUgY2x1c3RlcnNcbiAgZm9yICh2YXIgaSA9IDAsIGNsdXN0ZXI7IGNsdXN0ZXIgPSB0aGlzLmNsdXN0ZXJzX1tpXTsgaSsrKSB7XG4gICAgY2x1c3Rlci5yZW1vdmUoKTtcbiAgfVxuXG4gIC8vIFJlc2V0IHRoZSBtYXJrZXJzIHRvIG5vdCBiZSBhZGRlZCBhbmQgdG8gYmUgaW52aXNpYmxlLlxuICBmb3IgKHZhciBpID0gMCwgbWFya2VyOyBtYXJrZXIgPSB0aGlzLm1hcmtlcnNfW2ldOyBpKyspIHtcbiAgICBtYXJrZXIuaXNBZGRlZCA9IGZhbHNlO1xuICAgIGlmIChvcHRfaGlkZSkge1xuICAgICAgbWFya2VyLnNldE1hcChudWxsKTtcbiAgICB9XG4gIH1cblxuICB0aGlzLmNsdXN0ZXJzXyA9IFtdO1xufTtcblxuLyoqXG4gKlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnJlcGFpbnQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIG9sZENsdXN0ZXJzID0gdGhpcy5jbHVzdGVyc18uc2xpY2UoKTtcbiAgdGhpcy5jbHVzdGVyc18ubGVuZ3RoID0gMDtcbiAgdGhpcy5yZXNldFZpZXdwb3J0KCk7XG4gIHRoaXMucmVkcmF3KCk7XG5cbiAgLy8gUmVtb3ZlIHRoZSBvbGQgY2x1c3RlcnMuXG4gIC8vIERvIGl0IGluIGEgdGltZW91dCBzbyB0aGUgb3RoZXIgY2x1c3RlcnMgaGF2ZSBiZWVuIGRyYXduIGZpcnN0LlxuICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgY2x1c3RlcjsgY2x1c3RlciA9IG9sZENsdXN0ZXJzW2ldOyBpKyspIHtcbiAgICAgIGNsdXN0ZXIucmVtb3ZlKCk7XG4gICAgfVxuICB9LCAwKTtcbn07XG5cblxuLyoqXG4gKiBSZWRyYXdzIHRoZSBjbHVzdGVycy5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5yZWRyYXcgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5jcmVhdGVDbHVzdGVyc18oKTtcbn07XG5cblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIHR3byBsYXRsbmcgbG9jYXRpb25zIGluIGttLlxuICogQHNlZSBodHRwOi8vd3d3Lm1vdmFibGUtdHlwZS5jby51ay9zY3JpcHRzL2xhdGxvbmcuaHRtbFxuICpcbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTGF0TG5nfSBwMSBUaGUgZmlyc3QgbGF0IGxuZyBwb2ludC5cbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTGF0TG5nfSBwMiBUaGUgc2Vjb25kIGxhdCBsbmcgcG9pbnQuXG4gKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSBkaXN0YW5jZSBiZXR3ZWVuIHRoZSB0d28gcG9pbnRzIGluIGttLlxuICogQHByaXZhdGVcbiovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmRpc3RhbmNlQmV0d2VlblBvaW50c18gPSBmdW5jdGlvbihwMSwgcDIpIHtcbiAgaWYgKCFwMSB8fCAhcDIpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIHZhciBSID0gNjM3MTsgLy8gUmFkaXVzIG9mIHRoZSBFYXJ0aCBpbiBrbVxuICB2YXIgZExhdCA9IChwMi5sYXQoKSAtIHAxLmxhdCgpKSAqIE1hdGguUEkgLyAxODA7XG4gIHZhciBkTG9uID0gKHAyLmxuZygpIC0gcDEubG5nKCkpICogTWF0aC5QSSAvIDE4MDtcbiAgdmFyIGEgPSBNYXRoLnNpbihkTGF0IC8gMikgKiBNYXRoLnNpbihkTGF0IC8gMikgK1xuICAgIE1hdGguY29zKHAxLmxhdCgpICogTWF0aC5QSSAvIDE4MCkgKiBNYXRoLmNvcyhwMi5sYXQoKSAqIE1hdGguUEkgLyAxODApICpcbiAgICBNYXRoLnNpbihkTG9uIC8gMikgKiBNYXRoLnNpbihkTG9uIC8gMik7XG4gIHZhciBjID0gMiAqIE1hdGguYXRhbjIoTWF0aC5zcXJ0KGEpLCBNYXRoLnNxcnQoMSAtIGEpKTtcbiAgdmFyIGQgPSBSICogYztcbiAgcmV0dXJuIGQ7XG59O1xuXG5cbi8qKlxuICogQWRkIGEgbWFya2VyIHRvIGEgY2x1c3Rlciwgb3IgY3JlYXRlcyBhIG5ldyBjbHVzdGVyLlxuICpcbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTWFya2VyfSBtYXJrZXIgVGhlIG1hcmtlciB0byBhZGQuXG4gKiBAcHJpdmF0ZVxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmFkZFRvQ2xvc2VzdENsdXN0ZXJfID0gZnVuY3Rpb24obWFya2VyKSB7XG4gIHZhciBkaXN0YW5jZSA9IDQwMDAwOyAvLyBTb21lIGxhcmdlIG51bWJlclxuICB2YXIgY2x1c3RlclRvQWRkVG8gPSBudWxsO1xuICB2YXIgcG9zID0gbWFya2VyLmdldFBvc2l0aW9uKCk7XG4gIGZvciAodmFyIGkgPSAwLCBjbHVzdGVyOyBjbHVzdGVyID0gdGhpcy5jbHVzdGVyc19baV07IGkrKykge1xuICAgIHZhciBjZW50ZXIgPSBjbHVzdGVyLmdldENlbnRlcigpO1xuICAgIGlmIChjZW50ZXIpIHtcbiAgICAgIHZhciBkID0gdGhpcy5kaXN0YW5jZUJldHdlZW5Qb2ludHNfKGNlbnRlciwgbWFya2VyLmdldFBvc2l0aW9uKCkpO1xuICAgICAgaWYgKGQgPCBkaXN0YW5jZSkge1xuICAgICAgICBkaXN0YW5jZSA9IGQ7XG4gICAgICAgIGNsdXN0ZXJUb0FkZFRvID0gY2x1c3RlcjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAoY2x1c3RlclRvQWRkVG8gJiYgY2x1c3RlclRvQWRkVG8uaXNNYXJrZXJJbkNsdXN0ZXJCb3VuZHMobWFya2VyKSkge1xuICAgIGNsdXN0ZXJUb0FkZFRvLmFkZE1hcmtlcihtYXJrZXIpO1xuICB9IGVsc2Uge1xuICAgIHZhciBjbHVzdGVyID0gbmV3IENsdXN0ZXIodGhpcyk7XG4gICAgY2x1c3Rlci5hZGRNYXJrZXIobWFya2VyKTtcbiAgICB0aGlzLmNsdXN0ZXJzXy5wdXNoKGNsdXN0ZXIpO1xuICB9XG59O1xuXG5cbi8qKlxuICogQ3JlYXRlcyB0aGUgY2x1c3RlcnMuXG4gKlxuICogQHByaXZhdGVcbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5jcmVhdGVDbHVzdGVyc18gPSBmdW5jdGlvbigpIHtcbiAgaWYgKCF0aGlzLnJlYWR5Xykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIEdldCBvdXIgY3VycmVudCBtYXAgdmlldyBib3VuZHMuXG4gIC8vIENyZWF0ZSBhIG5ldyBib3VuZHMgb2JqZWN0IHNvIHdlIGRvbid0IGFmZmVjdCB0aGUgbWFwLlxuICB2YXIgbWFwQm91bmRzID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZ0JvdW5kcyh0aGlzLm1hcF8uZ2V0Qm91bmRzKCkuZ2V0U291dGhXZXN0KCksXG4gICAgICB0aGlzLm1hcF8uZ2V0Qm91bmRzKCkuZ2V0Tm9ydGhFYXN0KCkpO1xuICB2YXIgYm91bmRzID0gdGhpcy5nZXRFeHRlbmRlZEJvdW5kcyhtYXBCb3VuZHMpO1xuXG4gIGZvciAodmFyIGkgPSAwLCBtYXJrZXI7IG1hcmtlciA9IHRoaXMubWFya2Vyc19baV07IGkrKykge1xuICAgIGlmICghbWFya2VyLmlzQWRkZWQgJiYgdGhpcy5pc01hcmtlckluQm91bmRzXyhtYXJrZXIsIGJvdW5kcykpIHtcbiAgICAgIHRoaXMuYWRkVG9DbG9zZXN0Q2x1c3Rlcl8obWFya2VyKTtcbiAgICB9XG4gIH1cbn07XG5cblxuLyoqXG4gKiBBIGNsdXN0ZXIgdGhhdCBjb250YWlucyBtYXJrZXJzLlxuICpcbiAqIEBwYXJhbSB7TWFya2VyQ2x1c3RlcmVyfSBtYXJrZXJDbHVzdGVyZXIgVGhlIG1hcmtlcmNsdXN0ZXJlciB0aGF0IHRoaXNcbiAqICAgICBjbHVzdGVyIGlzIGFzc29jaWF0ZWQgd2l0aC5cbiAqIEBjb25zdHJ1Y3RvclxuICogQGlnbm9yZVxuICovXG5mdW5jdGlvbiBDbHVzdGVyKG1hcmtlckNsdXN0ZXJlcikge1xuICB0aGlzLm1hcmtlckNsdXN0ZXJlcl8gPSBtYXJrZXJDbHVzdGVyZXI7XG4gIHRoaXMubWFwXyA9IG1hcmtlckNsdXN0ZXJlci5nZXRNYXAoKTtcbiAgdGhpcy5ncmlkU2l6ZV8gPSBtYXJrZXJDbHVzdGVyZXIuZ2V0R3JpZFNpemUoKTtcbiAgdGhpcy5taW5DbHVzdGVyU2l6ZV8gPSBtYXJrZXJDbHVzdGVyZXIuZ2V0TWluQ2x1c3RlclNpemUoKTtcbiAgdGhpcy5hdmVyYWdlQ2VudGVyXyA9IG1hcmtlckNsdXN0ZXJlci5pc0F2ZXJhZ2VDZW50ZXIoKTtcbiAgdGhpcy5jZW50ZXJfID0gbnVsbDtcbiAgdGhpcy5tYXJrZXJzXyA9IFtdO1xuICB0aGlzLmJvdW5kc18gPSBudWxsO1xuICB0aGlzLmNsdXN0ZXJJY29uXyA9IG5ldyBDbHVzdGVySWNvbih0aGlzLCBtYXJrZXJDbHVzdGVyZXIuZ2V0U3R5bGVzKCksXG4gICAgICBtYXJrZXJDbHVzdGVyZXIuZ2V0R3JpZFNpemUoKSk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5zIGlmIGEgbWFya2VyIGlzIGFscmVhZHkgYWRkZWQgdG8gdGhlIGNsdXN0ZXIuXG4gKlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5NYXJrZXJ9IG1hcmtlciBUaGUgbWFya2VyIHRvIGNoZWNrLlxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgbWFya2VyIGlzIGFscmVhZHkgYWRkZWQuXG4gKi9cbkNsdXN0ZXIucHJvdG90eXBlLmlzTWFya2VyQWxyZWFkeUFkZGVkID0gZnVuY3Rpb24obWFya2VyKSB7XG4gIGlmICh0aGlzLm1hcmtlcnNfLmluZGV4T2YpIHtcbiAgICByZXR1cm4gdGhpcy5tYXJrZXJzXy5pbmRleE9mKG1hcmtlcikgIT0gLTE7XG4gIH0gZWxzZSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIG07IG0gPSB0aGlzLm1hcmtlcnNfW2ldOyBpKyspIHtcbiAgICAgIGlmIChtID09IG1hcmtlcikge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuXG4vKipcbiAqIEFkZCBhIG1hcmtlciB0aGUgY2x1c3Rlci5cbiAqXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLk1hcmtlcn0gbWFya2VyIFRoZSBtYXJrZXIgdG8gYWRkLlxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgbWFya2VyIHdhcyBhZGRlZC5cbiAqL1xuQ2x1c3Rlci5wcm90b3R5cGUuYWRkTWFya2VyID0gZnVuY3Rpb24obWFya2VyKSB7XG4gIGlmICh0aGlzLmlzTWFya2VyQWxyZWFkeUFkZGVkKG1hcmtlcikpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAoIXRoaXMuY2VudGVyXykge1xuICAgIHRoaXMuY2VudGVyXyA9IG1hcmtlci5nZXRQb3NpdGlvbigpO1xuICAgIHRoaXMuY2FsY3VsYXRlQm91bmRzXygpO1xuICB9IGVsc2Uge1xuICAgIGlmICh0aGlzLmF2ZXJhZ2VDZW50ZXJfKSB7XG4gICAgICB2YXIgbCA9IHRoaXMubWFya2Vyc18ubGVuZ3RoICsgMTtcbiAgICAgIHZhciBsYXQgPSAodGhpcy5jZW50ZXJfLmxhdCgpICogKGwtMSkgKyBtYXJrZXIuZ2V0UG9zaXRpb24oKS5sYXQoKSkgLyBsO1xuICAgICAgdmFyIGxuZyA9ICh0aGlzLmNlbnRlcl8ubG5nKCkgKiAobC0xKSArIG1hcmtlci5nZXRQb3NpdGlvbigpLmxuZygpKSAvIGw7XG4gICAgICB0aGlzLmNlbnRlcl8gPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKGxhdCwgbG5nKTtcbiAgICAgIHRoaXMuY2FsY3VsYXRlQm91bmRzXygpO1xuICAgIH1cbiAgfVxuXG4gIG1hcmtlci5pc0FkZGVkID0gdHJ1ZTtcbiAgdGhpcy5tYXJrZXJzXy5wdXNoKG1hcmtlcik7XG5cbiAgdmFyIGxlbiA9IHRoaXMubWFya2Vyc18ubGVuZ3RoO1xuICBpZiAobGVuIDwgdGhpcy5taW5DbHVzdGVyU2l6ZV8gJiYgbWFya2VyLmdldE1hcCgpICE9IHRoaXMubWFwXykge1xuICAgIC8vIE1pbiBjbHVzdGVyIHNpemUgbm90IHJlYWNoZWQgc28gc2hvdyB0aGUgbWFya2VyLlxuICAgIG1hcmtlci5zZXRNYXAodGhpcy5tYXBfKTtcbiAgfVxuXG4gIGlmIChsZW4gPT0gdGhpcy5taW5DbHVzdGVyU2l6ZV8pIHtcbiAgICAvLyBIaWRlIHRoZSBtYXJrZXJzIHRoYXQgd2VyZSBzaG93aW5nLlxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIHRoaXMubWFya2Vyc19baV0uc2V0TWFwKG51bGwpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChsZW4gPj0gdGhpcy5taW5DbHVzdGVyU2l6ZV8pIHtcbiAgICBtYXJrZXIuc2V0TWFwKG51bGwpO1xuICB9XG5cbiAgdGhpcy51cGRhdGVJY29uKCk7XG4gIHJldHVybiB0cnVlO1xufTtcblxuXG4vKipcbiAqIFJldHVybnMgdGhlIG1hcmtlciBjbHVzdGVyZXIgdGhhdCB0aGUgY2x1c3RlciBpcyBhc3NvY2lhdGVkIHdpdGguXG4gKlxuICogQHJldHVybiB7TWFya2VyQ2x1c3RlcmVyfSBUaGUgYXNzb2NpYXRlZCBtYXJrZXIgY2x1c3RlcmVyLlxuICovXG5DbHVzdGVyLnByb3RvdHlwZS5nZXRNYXJrZXJDbHVzdGVyZXIgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMubWFya2VyQ2x1c3RlcmVyXztcbn07XG5cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBib3VuZHMgb2YgdGhlIGNsdXN0ZXIuXG4gKlxuICogQHJldHVybiB7Z29vZ2xlLm1hcHMuTGF0TG5nQm91bmRzfSB0aGUgY2x1c3RlciBib3VuZHMuXG4gKi9cbkNsdXN0ZXIucHJvdG90eXBlLmdldEJvdW5kcyA9IGZ1bmN0aW9uKCkge1xuICB2YXIgYm91bmRzID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZ0JvdW5kcyh0aGlzLmNlbnRlcl8sIHRoaXMuY2VudGVyXyk7XG4gIHZhciBtYXJrZXJzID0gdGhpcy5nZXRNYXJrZXJzKCk7XG4gIGZvciAodmFyIGkgPSAwLCBtYXJrZXI7IG1hcmtlciA9IG1hcmtlcnNbaV07IGkrKykge1xuICAgIGJvdW5kcy5leHRlbmQobWFya2VyLmdldFBvc2l0aW9uKCkpO1xuICB9XG4gIHJldHVybiBib3VuZHM7XG59O1xuXG5cbi8qKlxuICogUmVtb3ZlcyB0aGUgY2x1c3RlclxuICovXG5DbHVzdGVyLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5jbHVzdGVySWNvbl8ucmVtb3ZlKCk7XG4gIHRoaXMubWFya2Vyc18ubGVuZ3RoID0gMDtcbiAgZGVsZXRlIHRoaXMubWFya2Vyc187XG59O1xuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgY2VudGVyIG9mIHRoZSBjbHVzdGVyLlxuICpcbiAqIEByZXR1cm4ge251bWJlcn0gVGhlIGNsdXN0ZXIgY2VudGVyLlxuICovXG5DbHVzdGVyLnByb3RvdHlwZS5nZXRTaXplID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLm1hcmtlcnNfLmxlbmd0aDtcbn07XG5cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBjZW50ZXIgb2YgdGhlIGNsdXN0ZXIuXG4gKlxuICogQHJldHVybiB7QXJyYXkuPGdvb2dsZS5tYXBzLk1hcmtlcj59IFRoZSBjbHVzdGVyIGNlbnRlci5cbiAqL1xuQ2x1c3Rlci5wcm90b3R5cGUuZ2V0TWFya2VycyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5tYXJrZXJzXztcbn07XG5cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBjZW50ZXIgb2YgdGhlIGNsdXN0ZXIuXG4gKlxuICogQHJldHVybiB7Z29vZ2xlLm1hcHMuTGF0TG5nfSBUaGUgY2x1c3RlciBjZW50ZXIuXG4gKi9cbkNsdXN0ZXIucHJvdG90eXBlLmdldENlbnRlciA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5jZW50ZXJfO1xufTtcblxuXG4vKipcbiAqIENhbGN1bGF0ZWQgdGhlIGV4dGVuZGVkIGJvdW5kcyBvZiB0aGUgY2x1c3RlciB3aXRoIHRoZSBncmlkLlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbkNsdXN0ZXIucHJvdG90eXBlLmNhbGN1bGF0ZUJvdW5kc18gPSBmdW5jdGlvbigpIHtcbiAgdmFyIGJvdW5kcyA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmdCb3VuZHModGhpcy5jZW50ZXJfLCB0aGlzLmNlbnRlcl8pO1xuICB0aGlzLmJvdW5kc18gPSB0aGlzLm1hcmtlckNsdXN0ZXJlcl8uZ2V0RXh0ZW5kZWRCb3VuZHMoYm91bmRzKTtcbn07XG5cblxuLyoqXG4gKiBEZXRlcm1pbmVzIGlmIGEgbWFya2VyIGxpZXMgaW4gdGhlIGNsdXN0ZXJzIGJvdW5kcy5cbiAqXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLk1hcmtlcn0gbWFya2VyIFRoZSBtYXJrZXIgdG8gY2hlY2suXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIHRoZSBtYXJrZXIgbGllcyBpbiB0aGUgYm91bmRzLlxuICovXG5DbHVzdGVyLnByb3RvdHlwZS5pc01hcmtlckluQ2x1c3RlckJvdW5kcyA9IGZ1bmN0aW9uKG1hcmtlcikge1xuICByZXR1cm4gdGhpcy5ib3VuZHNfLmNvbnRhaW5zKG1hcmtlci5nZXRQb3NpdGlvbigpKTtcbn07XG5cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBtYXAgdGhhdCB0aGUgY2x1c3RlciBpcyBhc3NvY2lhdGVkIHdpdGguXG4gKlxuICogQHJldHVybiB7Z29vZ2xlLm1hcHMuTWFwfSBUaGUgbWFwLlxuICovXG5DbHVzdGVyLnByb3RvdHlwZS5nZXRNYXAgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMubWFwXztcbn07XG5cblxuLyoqXG4gKiBVcGRhdGVzIHRoZSBjbHVzdGVyIGljb25cbiAqL1xuQ2x1c3Rlci5wcm90b3R5cGUudXBkYXRlSWNvbiA9IGZ1bmN0aW9uKCkge1xuICB2YXIgem9vbSA9IHRoaXMubWFwXy5nZXRab29tKCk7XG4gIHZhciBteiA9IHRoaXMubWFya2VyQ2x1c3RlcmVyXy5nZXRNYXhab29tKCk7XG5cbiAgaWYgKG16ICYmIHpvb20gPiBteikge1xuICAgIC8vIFRoZSB6b29tIGlzIGdyZWF0ZXIgdGhhbiBvdXIgbWF4IHpvb20gc28gc2hvdyBhbGwgdGhlIG1hcmtlcnMgaW4gY2x1c3Rlci5cbiAgICBmb3IgKHZhciBpID0gMCwgbWFya2VyOyBtYXJrZXIgPSB0aGlzLm1hcmtlcnNfW2ldOyBpKyspIHtcbiAgICAgIG1hcmtlci5zZXRNYXAodGhpcy5tYXBfKTtcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKHRoaXMubWFya2Vyc18ubGVuZ3RoIDwgdGhpcy5taW5DbHVzdGVyU2l6ZV8pIHtcbiAgICAvLyBNaW4gY2x1c3RlciBzaXplIG5vdCB5ZXQgcmVhY2hlZC5cbiAgICB0aGlzLmNsdXN0ZXJJY29uXy5oaWRlKCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIG51bVN0eWxlcyA9IHRoaXMubWFya2VyQ2x1c3RlcmVyXy5nZXRTdHlsZXMoKS5sZW5ndGg7XG4gIHZhciBzdW1zID0gdGhpcy5tYXJrZXJDbHVzdGVyZXJfLmdldENhbGN1bGF0b3IoKSh0aGlzLm1hcmtlcnNfLCBudW1TdHlsZXMpO1xuICB0aGlzLmNsdXN0ZXJJY29uXy5zZXRDZW50ZXIodGhpcy5jZW50ZXJfKTtcbiAgdGhpcy5jbHVzdGVySWNvbl8uc2V0U3VtcyhzdW1zKTtcbiAgdGhpcy5jbHVzdGVySWNvbl8uc2hvdygpO1xufTtcblxuXG4vKipcbiAqIEEgY2x1c3RlciBpY29uXG4gKlxuICogQHBhcmFtIHtDbHVzdGVyfSBjbHVzdGVyIFRoZSBjbHVzdGVyIHRvIGJlIGFzc29jaWF0ZWQgd2l0aC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzdHlsZXMgQW4gb2JqZWN0IHRoYXQgaGFzIHN0eWxlIHByb3BlcnRpZXM6XG4gKiAgICAgJ3VybCc6IChzdHJpbmcpIFRoZSBpbWFnZSB1cmwuXG4gKiAgICAgJ2hlaWdodCc6IChudW1iZXIpIFRoZSBpbWFnZSBoZWlnaHQuXG4gKiAgICAgJ3dpZHRoJzogKG51bWJlcikgVGhlIGltYWdlIHdpZHRoLlxuICogICAgICdhbmNob3InOiAoQXJyYXkpIFRoZSBhbmNob3IgcG9zaXRpb24gb2YgdGhlIGxhYmVsIHRleHQuXG4gKiAgICAgJ3RleHRDb2xvcic6IChzdHJpbmcpIFRoZSB0ZXh0IGNvbG9yLlxuICogICAgICd0ZXh0U2l6ZSc6IChudW1iZXIpIFRoZSB0ZXh0IHNpemUuXG4gKiAgICAgICdmb250RmFtaWx5JzogKHN0cmluZykgVGhlIGZvbnQgZmFtaWx5LlxuICogICAgICAnZm9udFdlaWdodCc6IChzdHJpbmcpIFRoZSBmb250IHdlaWdodC5cbiAqICAgICAnYmFja2dyb3VuZFBvc2l0aW9uOiAoc3RyaW5nKSBUaGUgYmFja2dyb3VuZCBwb3N0aXRpb24geCwgeS5cbiAqIEBwYXJhbSB7bnVtYmVyPX0gb3B0X3BhZGRpbmcgT3B0aW9uYWwgcGFkZGluZyB0byBhcHBseSB0byB0aGUgY2x1c3RlciBpY29uLlxuICogQGNvbnN0cnVjdG9yXG4gKiBAZXh0ZW5kcyBnb29nbGUubWFwcy5PdmVybGF5Vmlld1xuICogQGlnbm9yZVxuICovXG5mdW5jdGlvbiBDbHVzdGVySWNvbihjbHVzdGVyLCBzdHlsZXMsIG9wdF9wYWRkaW5nKSB7XG4gIGNsdXN0ZXIuZ2V0TWFya2VyQ2x1c3RlcmVyKCkuZXh0ZW5kKENsdXN0ZXJJY29uLCBnb29nbGUubWFwcy5PdmVybGF5Vmlldyk7XG5cbiAgdGhpcy5zdHlsZXNfID0gc3R5bGVzO1xuICB0aGlzLnBhZGRpbmdfID0gb3B0X3BhZGRpbmcgfHwgMDtcbiAgdGhpcy5jbHVzdGVyXyA9IGNsdXN0ZXI7XG4gIHRoaXMuY2VudGVyXyA9IG51bGw7XG4gIHRoaXMubWFwXyA9IGNsdXN0ZXIuZ2V0TWFwKCk7XG4gIHRoaXMuZGl2XyA9IG51bGw7XG4gIHRoaXMuc3Vtc18gPSBudWxsO1xuICB0aGlzLnZpc2libGVfID0gZmFsc2U7XG5cbiAgdGhpcy5zZXRNYXAodGhpcy5tYXBfKTtcbn1cblxuXG4vKipcbiAqIFRyaWdnZXJzIHRoZSBjbHVzdGVyY2xpY2sgZXZlbnQgYW5kIHpvb20ncyBpZiB0aGUgb3B0aW9uIGlzIHNldC5cbiAqL1xuQ2x1c3Rlckljb24ucHJvdG90eXBlLnRyaWdnZXJDbHVzdGVyQ2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgdmFyIG1hcmtlckNsdXN0ZXJlciA9IHRoaXMuY2x1c3Rlcl8uZ2V0TWFya2VyQ2x1c3RlcmVyKCk7XG5cbiAgLy8gVHJpZ2dlciB0aGUgY2x1c3RlcmNsaWNrIGV2ZW50LlxuICBnb29nbGUubWFwcy5ldmVudC50cmlnZ2VyKG1hcmtlckNsdXN0ZXJlciwgJ2NsdXN0ZXJjbGljaycsIHRoaXMuY2x1c3Rlcl8pO1xuXG4gIGlmIChtYXJrZXJDbHVzdGVyZXIuaXNab29tT25DbGljaygpKSB7XG4gICAgLy8gWm9vbSBpbnRvIHRoZSBjbHVzdGVyLlxuICAgIHRoaXMubWFwXy5maXRCb3VuZHModGhpcy5jbHVzdGVyXy5nZXRCb3VuZHMoKSk7XG4gIH1cbn07XG5cblxuLyoqXG4gKiBBZGRpbmcgdGhlIGNsdXN0ZXIgaWNvbiB0byB0aGUgZG9tLlxuICogQGlnbm9yZVxuICovXG5DbHVzdGVySWNvbi5wcm90b3R5cGUub25BZGQgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5kaXZfID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XG4gIGlmICh0aGlzLnZpc2libGVfKSB7XG4gICAgdmFyIHBvcyA9IHRoaXMuZ2V0UG9zRnJvbUxhdExuZ18odGhpcy5jZW50ZXJfKTtcbiAgICB0aGlzLmRpdl8uc3R5bGUuY3NzVGV4dCA9IHRoaXMuY3JlYXRlQ3NzKHBvcyk7XG4gICAgdGhpcy5kaXZfLmlubmVySFRNTCA9IHRoaXMuc3Vtc18udGV4dDtcbiAgfVxuXG4gIHZhciBwYW5lcyA9IHRoaXMuZ2V0UGFuZXMoKTtcbiAgcGFuZXMub3ZlcmxheU1vdXNlVGFyZ2V0LmFwcGVuZENoaWxkKHRoaXMuZGl2Xyk7XG5cbiAgdmFyIHRoYXQgPSB0aGlzO1xuICBnb29nbGUubWFwcy5ldmVudC5hZGREb21MaXN0ZW5lcih0aGlzLmRpdl8sICdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgIHRoYXQudHJpZ2dlckNsdXN0ZXJDbGljaygpO1xuICB9KTtcbn07XG5cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBwb3NpdGlvbiB0byBwbGFjZSB0aGUgZGl2IGRlbmRpbmcgb24gdGhlIGxhdGxuZy5cbiAqXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLkxhdExuZ30gbGF0bG5nIFRoZSBwb3NpdGlvbiBpbiBsYXRsbmcuXG4gKiBAcmV0dXJuIHtnb29nbGUubWFwcy5Qb2ludH0gVGhlIHBvc2l0aW9uIGluIHBpeGVscy5cbiAqIEBwcml2YXRlXG4gKi9cbkNsdXN0ZXJJY29uLnByb3RvdHlwZS5nZXRQb3NGcm9tTGF0TG5nXyA9IGZ1bmN0aW9uKGxhdGxuZykge1xuICB2YXIgcG9zID0gdGhpcy5nZXRQcm9qZWN0aW9uKCkuZnJvbUxhdExuZ1RvRGl2UGl4ZWwobGF0bG5nKTtcbiAgcG9zLnggLT0gcGFyc2VJbnQodGhpcy53aWR0aF8gLyAyLCAxMCk7XG4gIHBvcy55IC09IHBhcnNlSW50KHRoaXMuaGVpZ2h0XyAvIDIsIDEwKTtcbiAgcmV0dXJuIHBvcztcbn07XG5cblxuLyoqXG4gKiBEcmF3IHRoZSBpY29uLlxuICogQGlnbm9yZVxuICovXG5DbHVzdGVySWNvbi5wcm90b3R5cGUuZHJhdyA9IGZ1bmN0aW9uKCkge1xuICBpZiAodGhpcy52aXNpYmxlXykge1xuICAgIHZhciBwb3MgPSB0aGlzLmdldFBvc0Zyb21MYXRMbmdfKHRoaXMuY2VudGVyXyk7XG4gICAgdGhpcy5kaXZfLnN0eWxlLnRvcCA9IHBvcy55ICsgJ3B4JztcbiAgICB0aGlzLmRpdl8uc3R5bGUubGVmdCA9IHBvcy54ICsgJ3B4JztcbiAgfVxufTtcblxuXG4vKipcbiAqIEhpZGUgdGhlIGljb24uXG4gKi9cbkNsdXN0ZXJJY29uLnByb3RvdHlwZS5oaWRlID0gZnVuY3Rpb24oKSB7XG4gIGlmICh0aGlzLmRpdl8pIHtcbiAgICB0aGlzLmRpdl8uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgfVxuICB0aGlzLnZpc2libGVfID0gZmFsc2U7XG59O1xuXG5cbi8qKlxuICogUG9zaXRpb24gYW5kIHNob3cgdGhlIGljb24uXG4gKi9cbkNsdXN0ZXJJY29uLnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24oKSB7XG4gIGlmICh0aGlzLmRpdl8pIHtcbiAgICB2YXIgcG9zID0gdGhpcy5nZXRQb3NGcm9tTGF0TG5nXyh0aGlzLmNlbnRlcl8pO1xuICAgIHRoaXMuZGl2Xy5zdHlsZS5jc3NUZXh0ID0gdGhpcy5jcmVhdGVDc3MocG9zKTtcbiAgICB0aGlzLmRpdl8uc3R5bGUuZGlzcGxheSA9ICcnO1xuICB9XG4gIHRoaXMudmlzaWJsZV8gPSB0cnVlO1xufTtcblxuXG4vKipcbiAqIFJlbW92ZSB0aGUgaWNvbiBmcm9tIHRoZSBtYXBcbiAqL1xuQ2x1c3Rlckljb24ucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnNldE1hcChudWxsKTtcbn07XG5cblxuLyoqXG4gKiBJbXBsZW1lbnRhdGlvbiBvZiB0aGUgb25SZW1vdmUgaW50ZXJmYWNlLlxuICogQGlnbm9yZVxuICovXG5DbHVzdGVySWNvbi5wcm90b3R5cGUub25SZW1vdmUgPSBmdW5jdGlvbigpIHtcbiAgaWYgKHRoaXMuZGl2XyAmJiB0aGlzLmRpdl8ucGFyZW50Tm9kZSkge1xuICAgIHRoaXMuaGlkZSgpO1xuICAgIHRoaXMuZGl2Xy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuZGl2Xyk7XG4gICAgdGhpcy5kaXZfID0gbnVsbDtcbiAgfVxufTtcblxuXG4vKipcbiAqIFNldCB0aGUgc3VtcyBvZiB0aGUgaWNvbi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gc3VtcyBUaGUgc3VtcyBjb250YWluaW5nOlxuICogICAndGV4dCc6IChzdHJpbmcpIFRoZSB0ZXh0IHRvIGRpc3BsYXkgaW4gdGhlIGljb24uXG4gKiAgICdpbmRleCc6IChudW1iZXIpIFRoZSBzdHlsZSBpbmRleCBvZiB0aGUgaWNvbi5cbiAqL1xuQ2x1c3Rlckljb24ucHJvdG90eXBlLnNldFN1bXMgPSBmdW5jdGlvbihzdW1zKSB7XG4gIHRoaXMuc3Vtc18gPSBzdW1zO1xuICB0aGlzLnRleHRfID0gc3Vtcy50ZXh0O1xuICB0aGlzLmluZGV4XyA9IHN1bXMuaW5kZXg7XG4gIGlmICh0aGlzLmRpdl8pIHtcbiAgICB0aGlzLmRpdl8uaW5uZXJIVE1MID0gc3Vtcy50ZXh0O1xuICB9XG5cbiAgdGhpcy51c2VTdHlsZSgpO1xufTtcblxuXG4vKipcbiAqIFNldHMgdGhlIGljb24gdG8gdGhlIHRoZSBzdHlsZXMuXG4gKi9cbkNsdXN0ZXJJY29uLnByb3RvdHlwZS51c2VTdHlsZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgaW5kZXggPSBNYXRoLm1heCgwLCB0aGlzLnN1bXNfLmluZGV4IC0gMSk7XG4gIGluZGV4ID0gTWF0aC5taW4odGhpcy5zdHlsZXNfLmxlbmd0aCAtIDEsIGluZGV4KTtcbiAgdmFyIHN0eWxlID0gdGhpcy5zdHlsZXNfW2luZGV4XTtcbiAgdGhpcy51cmxfID0gc3R5bGVbJ3VybCddO1xuICB0aGlzLmhlaWdodF8gPSBzdHlsZVsnaGVpZ2h0J107XG4gIHRoaXMud2lkdGhfID0gc3R5bGVbJ3dpZHRoJ107XG4gIHRoaXMudGV4dENvbG9yXyA9IHN0eWxlWyd0ZXh0Q29sb3InXTtcbiAgdGhpcy5hbmNob3JfID0gc3R5bGVbJ2FuY2hvciddO1xuICB0aGlzLnRleHRTaXplXyA9IHN0eWxlWyd0ZXh0U2l6ZSddO1xuICB0aGlzLmZvbnRGYW1pbHlfID0gc3R5bGVbJ2ZvbnRGYW1pbHknXTtcbiAgdGhpcy5mb250V2VpZ2h0XyA9IHN0eWxlWydmb250V2VpZ2h0J107XG4gIHRoaXMuYmFja2dyb3VuZFBvc2l0aW9uXyA9IHN0eWxlWydiYWNrZ3JvdW5kUG9zaXRpb24nXTtcbn07XG5cblxuLyoqXG4gKiBTZXRzIHRoZSBjZW50ZXIgb2YgdGhlIGljb24uXG4gKlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5MYXRMbmd9IGNlbnRlciBUaGUgbGF0bG5nIHRvIHNldCBhcyB0aGUgY2VudGVyLlxuICovXG5DbHVzdGVySWNvbi5wcm90b3R5cGUuc2V0Q2VudGVyID0gZnVuY3Rpb24oY2VudGVyKSB7XG4gIHRoaXMuY2VudGVyXyA9IGNlbnRlcjtcbn07XG5cblxuLyoqXG4gKiBDcmVhdGUgdGhlIGNzcyB0ZXh0IGJhc2VkIG9uIHRoZSBwb3NpdGlvbiBvZiB0aGUgaWNvbi5cbiAqXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLlBvaW50fSBwb3MgVGhlIHBvc2l0aW9uLlxuICogQHJldHVybiB7c3RyaW5nfSBUaGUgY3NzIHN0eWxlIHRleHQuXG4gKi9cbkNsdXN0ZXJJY29uLnByb3RvdHlwZS5jcmVhdGVDc3MgPSBmdW5jdGlvbihwb3MpIHtcbiAgdmFyIHN0eWxlID0gW107XG4gIHN0eWxlLnB1c2goJ2JhY2tncm91bmQtaW1hZ2U6dXJsKCcgKyB0aGlzLnVybF8gKyAnKTsnKTtcbiAgdmFyIGJhY2tncm91bmRQb3NpdGlvbiA9IHRoaXMuYmFja2dyb3VuZFBvc2l0aW9uXyA/IHRoaXMuYmFja2dyb3VuZFBvc2l0aW9uXyA6ICcwIDAnO1xuICBzdHlsZS5wdXNoKCdiYWNrZ3JvdW5kLXBvc2l0aW9uOicgKyBiYWNrZ3JvdW5kUG9zaXRpb24gKyAnOycpO1xuXG4gIGlmICh0eXBlb2YgdGhpcy5hbmNob3JfID09PSAnb2JqZWN0Jykge1xuICAgIGlmICh0eXBlb2YgdGhpcy5hbmNob3JfWzBdID09PSAnbnVtYmVyJyAmJiB0aGlzLmFuY2hvcl9bMF0gPiAwICYmXG4gICAgICAgIHRoaXMuYW5jaG9yX1swXSA8IHRoaXMuaGVpZ2h0Xykge1xuICAgICAgc3R5bGUucHVzaCgnaGVpZ2h0OicgKyAodGhpcy5oZWlnaHRfIC0gdGhpcy5hbmNob3JfWzBdKSArXG4gICAgICAgICAgJ3B4OyBwYWRkaW5nLXRvcDonICsgdGhpcy5hbmNob3JfWzBdICsgJ3B4OycpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZS5wdXNoKCdoZWlnaHQ6JyArIHRoaXMuaGVpZ2h0XyArICdweDsgbGluZS1oZWlnaHQ6JyArIHRoaXMuaGVpZ2h0XyArXG4gICAgICAgICAgJ3B4OycpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHRoaXMuYW5jaG9yX1sxXSA9PT0gJ251bWJlcicgJiYgdGhpcy5hbmNob3JfWzFdID4gMCAmJlxuICAgICAgICB0aGlzLmFuY2hvcl9bMV0gPCB0aGlzLndpZHRoXykge1xuICAgICAgc3R5bGUucHVzaCgnd2lkdGg6JyArICh0aGlzLndpZHRoXyAtIHRoaXMuYW5jaG9yX1sxXSkgK1xuICAgICAgICAgICdweDsgcGFkZGluZy1sZWZ0OicgKyB0aGlzLmFuY2hvcl9bMV0gKyAncHg7Jyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlLnB1c2goJ3dpZHRoOicgKyB0aGlzLndpZHRoXyArICdweDsgdGV4dC1hbGlnbjpjZW50ZXI7Jyk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHN0eWxlLnB1c2goJ2hlaWdodDonICsgdGhpcy5oZWlnaHRfICsgJ3B4OyBsaW5lLWhlaWdodDonICtcbiAgICAgICAgdGhpcy5oZWlnaHRfICsgJ3B4OyB3aWR0aDonICsgdGhpcy53aWR0aF8gKyAncHg7IHRleHQtYWxpZ246Y2VudGVyOycpO1xuICB9XG5cbiAgdmFyIHR4dENvbG9yID0gdGhpcy50ZXh0Q29sb3JfID8gdGhpcy50ZXh0Q29sb3JfIDogJ2JsYWNrJztcbiAgdmFyIHR4dFNpemUgPSB0aGlzLnRleHRTaXplXyA/IHRoaXMudGV4dFNpemVfIDogMTE7XG4gIHZhciBmb250RmFtaWx5ID0gdGhpcy5mb250RmFtaWx5XyA/IHRoaXMuZm9udEZhbWlseV8gOiAnQXJpYWwsc2Fucy1zZXJpZic7XG4gIHZhciBmb250V2VpZ2h0ID0gdGhpcy5mb250V2VpZ2h0XyA/IHRoaXMuZm9udFdlaWdodF8gOiAnNDAwJztcblxuICBzdHlsZS5wdXNoKCdjdXJzb3I6cG9pbnRlcjsgdG9wOicgKyBwb3MueSArICdweDsgbGVmdDonICtcbiAgICAgIHBvcy54ICsgJ3B4OyBjb2xvcjonICsgdHh0Q29sb3IgKyAnOyBwb3NpdGlvbjphYnNvbHV0ZTsgZm9udC1zaXplOicgK1xuICAgICAgdHh0U2l6ZSArICdweDsgZm9udC1mYW1pbHk6JyArIGZvbnRGYW1pbHkgKyAnOyBmb250LXdlaWdodDonICsgZm9udFdlaWdodCArICc7Jyk7XG4gIHJldHVybiBzdHlsZS5qb2luKCcnKTtcbn07XG5cblxuLy8gRXhwb3J0IFN5bWJvbHMgZm9yIENsb3N1cmVcbi8vIElmIHlvdSBhcmUgbm90IGdvaW5nIHRvIGNvbXBpbGUgd2l0aCBjbG9zdXJlIHRoZW4geW91IGNhbiByZW1vdmUgdGhlXG4vLyBjb2RlIGJlbG93LlxuZ2xvYmFsWydNYXJrZXJDbHVzdGVyZXInXSA9IE1hcmtlckNsdXN0ZXJlcjtcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ2FkZE1hcmtlciddID0gTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5hZGRNYXJrZXI7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydhZGRNYXJrZXJzJ10gPSBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmFkZE1hcmtlcnM7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydjbGVhck1hcmtlcnMnXSA9XG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5jbGVhck1hcmtlcnM7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydmaXRNYXBUb01hcmtlcnMnXSA9XG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5maXRNYXBUb01hcmtlcnM7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydnZXRDYWxjdWxhdG9yJ10gPVxuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0Q2FsY3VsYXRvcjtcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ2dldEdyaWRTaXplJ10gPVxuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0R3JpZFNpemU7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydnZXRFeHRlbmRlZEJvdW5kcyddID1cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldEV4dGVuZGVkQm91bmRzO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnZ2V0TWFwJ10gPSBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldE1hcDtcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ2dldE1hcmtlcnMnXSA9IE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0TWFya2Vycztcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ2dldE1heFpvb20nXSA9IE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0TWF4Wm9vbTtcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ2dldFN0eWxlcyddID0gTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRTdHlsZXM7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydnZXRUb3RhbENsdXN0ZXJzJ10gPVxuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0VG90YWxDbHVzdGVycztcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ2dldFRvdGFsTWFya2VycyddID1cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldFRvdGFsTWFya2Vycztcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ3JlZHJhdyddID0gTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5yZWRyYXc7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydyZW1vdmVNYXJrZXInXSA9XG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5yZW1vdmVNYXJrZXI7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydyZW1vdmVNYXJrZXJzJ10gPVxuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUucmVtb3ZlTWFya2Vycztcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ3Jlc2V0Vmlld3BvcnQnXSA9XG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5yZXNldFZpZXdwb3J0O1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsncmVwYWludCddID1cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnJlcGFpbnQ7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydzZXRDYWxjdWxhdG9yJ10gPVxuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuc2V0Q2FsY3VsYXRvcjtcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ3NldEdyaWRTaXplJ10gPVxuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuc2V0R3JpZFNpemU7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydzZXRNYXhab29tJ10gPVxuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuc2V0TWF4Wm9vbTtcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ29uQWRkJ10gPSBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLm9uQWRkO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnZHJhdyddID0gTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5kcmF3O1xuXG5DbHVzdGVyLnByb3RvdHlwZVsnZ2V0Q2VudGVyJ10gPSBDbHVzdGVyLnByb3RvdHlwZS5nZXRDZW50ZXI7XG5DbHVzdGVyLnByb3RvdHlwZVsnZ2V0U2l6ZSddID0gQ2x1c3Rlci5wcm90b3R5cGUuZ2V0U2l6ZTtcbkNsdXN0ZXIucHJvdG90eXBlWydnZXRNYXJrZXJzJ10gPSBDbHVzdGVyLnByb3RvdHlwZS5nZXRNYXJrZXJzO1xuXG5DbHVzdGVySWNvbi5wcm90b3R5cGVbJ29uQWRkJ10gPSBDbHVzdGVySWNvbi5wcm90b3R5cGUub25BZGQ7XG5DbHVzdGVySWNvbi5wcm90b3R5cGVbJ2RyYXcnXSA9IENsdXN0ZXJJY29uLnByb3RvdHlwZS5kcmF3O1xuQ2x1c3Rlckljb24ucHJvdG90eXBlWydvblJlbW92ZSddID0gQ2x1c3Rlckljb24ucHJvdG90eXBlLm9uUmVtb3ZlO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gTWFya2VyQ2x1c3RlcmVyO1xuIiwiLyoqXG4gKiBqUXVlcnkgQmFyIFJhdGluZyBQbHVnaW4gdjEuMi4yXG4gKlxuICogaHR0cDovL2dpdGh1Yi5jb20vYW50ZW5uYWlvL2pxdWVyeS1iYXItcmF0aW5nXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDEyLTIwMTYgS2F6aWsgUGlldHJ1c3pld3NraVxuICpcbiAqIFRoaXMgcGx1Z2luIGlzIGF2YWlsYWJsZSB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG4gKiBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICovXG4oZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIC8vIEFNRFxuICAgICAgICBkZWZpbmUoWydqcXVlcnknXSwgZmFjdG9yeSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgICAgICAvLyBOb2RlL0NvbW1vbkpTXG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKCdqcXVlcnknKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gYnJvd3NlciBnbG9iYWxzXG4gICAgICAgIGZhY3RvcnkoalF1ZXJ5KTtcbiAgICB9XG59KGZ1bmN0aW9uICgkKSB7XG5cbiAgICB2YXIgQmFyUmF0aW5nID0gKGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIGZ1bmN0aW9uIEJhclJhdGluZygpIHtcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICAgICAgLy8gd3JhcCBlbGVtZW50IGluIGEgd3JhcHBlciBkaXZcbiAgICAgICAgICAgIHZhciB3cmFwRWxlbWVudCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBjbGFzc2VzID0gWydici13cmFwcGVyJ107XG5cbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5vcHRpb25zLnRoZW1lICE9PSAnJykge1xuICAgICAgICAgICAgICAgICAgICBjbGFzc2VzLnB1c2goJ2JyLXRoZW1lLScgKyBzZWxmLm9wdGlvbnMudGhlbWUpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0ud3JhcCgkKCc8ZGl2IC8+Jywge1xuICAgICAgICAgICAgICAgICAgICAnY2xhc3MnOiBjbGFzc2VzLmpvaW4oJyAnKVxuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIHVud3JhcCBlbGVtZW50XG4gICAgICAgICAgICB2YXIgdW53cmFwRWxlbWVudCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0udW53cmFwKCk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBmaW5kIG9wdGlvbiBieSB2YWx1ZVxuICAgICAgICAgICAgdmFyIGZpbmRPcHRpb24gPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICgkLmlzTnVtZXJpYyh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBNYXRoLmZsb29yKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gJCgnb3B0aW9uW3ZhbHVlPVwiJyArIHZhbHVlICArICdcIl0nLCBzZWxmLiRlbGVtKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIGdldCBpbml0aWFsIG9wdGlvblxuICAgICAgICAgICAgdmFyIGdldEluaXRpYWxPcHRpb24gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgaW5pdGlhbFJhdGluZyA9IHNlbGYub3B0aW9ucy5pbml0aWFsUmF0aW5nO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFpbml0aWFsUmF0aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAkKCdvcHRpb246c2VsZWN0ZWQnLCBzZWxmLiRlbGVtKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZmluZE9wdGlvbihpbml0aWFsUmF0aW5nKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIGdldCBlbXB0eSBvcHRpb25cbiAgICAgICAgICAgIHZhciBnZXRFbXB0eU9wdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciAkZW1wdHlPcHQgPSBzZWxmLiRlbGVtLmZpbmQoJ29wdGlvblt2YWx1ZT1cIicgKyBzZWxmLm9wdGlvbnMuZW1wdHlWYWx1ZSArICdcIl0nKTtcblxuICAgICAgICAgICAgICAgIGlmICghJGVtcHR5T3B0Lmxlbmd0aCAmJiBzZWxmLm9wdGlvbnMuYWxsb3dFbXB0eSkge1xuICAgICAgICAgICAgICAgICAgICAkZW1wdHlPcHQgPSAkKCc8b3B0aW9uIC8+JywgeyAndmFsdWUnOiBzZWxmLm9wdGlvbnMuZW1wdHlWYWx1ZSB9KTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJGVtcHR5T3B0LnByZXBlbmRUbyhzZWxmLiRlbGVtKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gJGVtcHR5T3B0O1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gZ2V0IGRhdGFcbiAgICAgICAgICAgIHZhciBnZXREYXRhID0gZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSBzZWxmLiRlbGVtLmRhdGEoJ2JhcnJhdGluZycpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBrZXkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhW2tleV07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBzZXQgZGF0YVxuICAgICAgICAgICAgdmFyIHNldERhdGEgPSBmdW5jdGlvbihrZXksIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi4kZWxlbS5kYXRhKCdiYXJyYXRpbmcnLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi4kZWxlbS5kYXRhKCdiYXJyYXRpbmcnKVtrZXldID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gc2F2ZSBkYXRhIG9uIGVsZW1lbnRcbiAgICAgICAgICAgIHZhciBzYXZlRGF0YU9uRWxlbWVudCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciAkb3B0ID0gZ2V0SW5pdGlhbE9wdGlvbigpO1xuICAgICAgICAgICAgICAgIHZhciAkZW1wdHlPcHQgPSBnZXRFbXB0eU9wdGlvbigpO1xuXG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gJG9wdC52YWwoKTtcbiAgICAgICAgICAgICAgICB2YXIgdGV4dCA9ICRvcHQuZGF0YSgnaHRtbCcpID8gJG9wdC5kYXRhKCdodG1sJykgOiAkb3B0LnRleHQoKTtcblxuICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBhbGxvd0VtcHR5IG9wdGlvbiBpcyBub3Qgc2V0IGxldCdzIGNoZWNrIGlmIGVtcHR5IG9wdGlvbiBleGlzdHMgaW4gdGhlIHNlbGVjdCBmaWVsZFxuICAgICAgICAgICAgICAgIHZhciBhbGxvd0VtcHR5ID0gKHNlbGYub3B0aW9ucy5hbGxvd0VtcHR5ICE9PSBudWxsKSA/XG4gICAgICAgICAgICAgICAgICAgIHNlbGYub3B0aW9ucy5hbGxvd0VtcHR5IDpcbiAgICAgICAgICAgICAgICAgICAgISEkZW1wdHlPcHQubGVuZ3RoO1xuXG4gICAgICAgICAgICAgICAgdmFyIGVtcHR5VmFsdWUgPSAoJGVtcHR5T3B0Lmxlbmd0aCkgPyAkZW1wdHlPcHQudmFsKCkgOiBudWxsO1xuICAgICAgICAgICAgICAgIHZhciBlbXB0eVRleHQgPSAoJGVtcHR5T3B0Lmxlbmd0aCkgPyAkZW1wdHlPcHQudGV4dCgpIDogbnVsbDtcblxuICAgICAgICAgICAgICAgIHNldERhdGEobnVsbCwge1xuICAgICAgICAgICAgICAgICAgICB1c2VyT3B0aW9uczogc2VsZi5vcHRpb25zLFxuXG4gICAgICAgICAgICAgICAgICAgIC8vIGluaXRpYWwgcmF0aW5nIGJhc2VkIG9uIHRoZSBPUFRJT04gdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgcmF0aW5nVmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgICAgICAgICByYXRpbmdUZXh0OiB0ZXh0LFxuXG4gICAgICAgICAgICAgICAgICAgIC8vIHJhdGluZyB3aWxsIGJlIHJlc3RvcmVkIGJ5IGNhbGxpbmcgY2xlYXIgbWV0aG9kXG4gICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsUmF0aW5nVmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbFJhdGluZ1RleHQ6IHRleHQsXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gYWxsb3cgZW1wdHkgcmF0aW5ncz9cbiAgICAgICAgICAgICAgICAgICAgYWxsb3dFbXB0eTogYWxsb3dFbXB0eSxcblxuICAgICAgICAgICAgICAgICAgICAvLyByYXRpbmcgdmFsdWUgYW5kIHRleHQgb2YgdGhlIGVtcHR5IE9QVElPTlxuICAgICAgICAgICAgICAgICAgICBlbXB0eVJhdGluZ1ZhbHVlOiBlbXB0eVZhbHVlLFxuICAgICAgICAgICAgICAgICAgICBlbXB0eVJhdGluZ1RleHQ6IGVtcHR5VGV4dCxcblxuICAgICAgICAgICAgICAgICAgICAvLyByZWFkLW9ubHkgc3RhdGVcbiAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6IHNlbGYub3B0aW9ucy5yZWFkb25seSxcblxuICAgICAgICAgICAgICAgICAgICAvLyBkaWQgdGhlIHVzZXIgYWxyZWFkeSBzZWxlY3QgYSByYXRpbmc/XG4gICAgICAgICAgICAgICAgICAgIHJhdGluZ01hZGU6IGZhbHNlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyByZW1vdmUgZGF0YSBvbiBlbGVtZW50XG4gICAgICAgICAgICB2YXIgcmVtb3ZlRGF0YU9uRWxlbWVudCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0ucmVtb3ZlRGF0YSgnYmFycmF0aW5nJyk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyByZXR1cm4gY3VycmVudCByYXRpbmcgdGV4dFxuICAgICAgICAgICAgdmFyIHJhdGluZ1RleHQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2V0RGF0YSgncmF0aW5nVGV4dCcpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gcmV0dXJuIGN1cnJlbnQgcmF0aW5nIHZhbHVlXG4gICAgICAgICAgICB2YXIgcmF0aW5nVmFsdWUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2V0RGF0YSgncmF0aW5nVmFsdWUnKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIGJ1aWxkIHdpZGdldCBhbmQgcmV0dXJuIGpRdWVyeSBlbGVtZW50XG4gICAgICAgICAgICB2YXIgYnVpbGRXaWRnZXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgJHcgPSAkKCc8ZGl2IC8+JywgeyAnY2xhc3MnOiAnYnItd2lkZ2V0JyB9KTtcblxuICAgICAgICAgICAgICAgIC8vIGNyZWF0ZSBBIGVsZW1lbnRzIHRoYXQgd2lsbCByZXBsYWNlIE9QVElPTnNcbiAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLmZpbmQoJ29wdGlvbicpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB2YWwsIHRleHQsIGh0bWwsICRhO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhbCA9ICQodGhpcykudmFsKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gY3JlYXRlIHJhdGluZ3MgLSBidXQgb25seSBpZiB2YWwgaXMgbm90IGRlZmluZWQgYXMgZW1wdHlcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbCAhPT0gZ2V0RGF0YSgnZW1wdHlSYXRpbmdWYWx1ZScpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0ID0gJCh0aGlzKS50ZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBodG1sID0gJCh0aGlzKS5kYXRhKCdodG1sJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaHRtbCkgeyB0ZXh0ID0gaHRtbDsgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAkYSA9ICQoJzxhIC8+Jywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdocmVmJzogJyMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdkYXRhLXJhdGluZy12YWx1ZSc6IHZhbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZGF0YS1yYXRpbmctdGV4dCc6IHRleHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2h0bWwnOiAoc2VsZi5vcHRpb25zLnNob3dWYWx1ZXMpID8gdGV4dCA6ICcnXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgJHcuYXBwZW5kKCRhKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAvLyBhcHBlbmQgLmJyLWN1cnJlbnQtcmF0aW5nIGRpdiB0byB0aGUgd2lkZ2V0XG4gICAgICAgICAgICAgICAgaWYgKHNlbGYub3B0aW9ucy5zaG93U2VsZWN0ZWRSYXRpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgJHcuYXBwZW5kKCQoJzxkaXYgLz4nLCB7ICd0ZXh0JzogJycsICdjbGFzcyc6ICdici1jdXJyZW50LXJhdGluZycgfSkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGFkZGl0aW9uYWwgY2xhc3NlcyBmb3IgdGhlIHdpZGdldFxuICAgICAgICAgICAgICAgIGlmIChzZWxmLm9wdGlvbnMucmV2ZXJzZSkge1xuICAgICAgICAgICAgICAgICAgICAkdy5hZGRDbGFzcygnYnItcmV2ZXJzZScpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChzZWxmLm9wdGlvbnMucmVhZG9ubHkpIHtcbiAgICAgICAgICAgICAgICAgICAgJHcuYWRkQ2xhc3MoJ2JyLXJlYWRvbmx5Jyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuICR3O1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gcmV0dXJuIGEgalF1ZXJ5IGZ1bmN0aW9uIG5hbWUgZGVwZW5kaW5nIG9uIHRoZSAncmV2ZXJzZScgc2V0dGluZ1xuICAgICAgICAgICAgdmFyIG5leHRBbGxvclByZXZpb3VzQWxsID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaWYgKGdldERhdGEoJ3VzZXJPcHRpb25zJykucmV2ZXJzZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ25leHRBbGwnO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAncHJldkFsbCc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gc2V0IHRoZSB2YWx1ZSBvZiB0aGUgc2VsZWN0IGZpZWxkXG4gICAgICAgICAgICB2YXIgc2V0U2VsZWN0RmllbGRWYWx1ZSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgLy8gY2hhbmdlIHNlbGVjdGVkIG9wdGlvblxuICAgICAgICAgICAgICAgIGZpbmRPcHRpb24odmFsdWUpLnByb3AoJ3NlbGVjdGVkJywgdHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLmNoYW5nZSgpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gcmVzZXQgc2VsZWN0IGZpZWxkXG4gICAgICAgICAgICB2YXIgcmVzZXRTZWxlY3RGaWVsZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICQoJ29wdGlvbicsIHNlbGYuJGVsZW0pLnByb3AoJ3NlbGVjdGVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRlZmF1bHRTZWxlY3RlZDtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0uY2hhbmdlKCk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBkaXNwbGF5IHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgcmF0aW5nXG4gICAgICAgICAgICB2YXIgc2hvd1NlbGVjdGVkUmF0aW5nID0gZnVuY3Rpb24odGV4dCkge1xuICAgICAgICAgICAgICAgIC8vIHRleHQgdW5kZWZpbmVkP1xuICAgICAgICAgICAgICAgIHRleHQgPSB0ZXh0ID8gdGV4dCA6IHJhdGluZ1RleHQoKTtcblxuICAgICAgICAgICAgICAgIC8vIHNwZWNpYWwgY2FzZSB3aGVuIHRoZSBzZWxlY3RlZCByYXRpbmcgaXMgZGVmaW5lZCBhcyBlbXB0eVxuICAgICAgICAgICAgICAgIGlmICh0ZXh0ID09IGdldERhdGEoJ2VtcHR5UmF0aW5nVGV4dCcpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQgPSAnJztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyB1cGRhdGUgLmJyLWN1cnJlbnQtcmF0aW5nIGRpdlxuICAgICAgICAgICAgICAgIGlmIChzZWxmLm9wdGlvbnMuc2hvd1NlbGVjdGVkUmF0aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0ucGFyZW50KCkuZmluZCgnLmJyLWN1cnJlbnQtcmF0aW5nJykudGV4dCh0ZXh0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyByZXR1cm4gcm91bmRlZCBmcmFjdGlvbiBvZiBhIHZhbHVlICgxNC40IC0+IDQwLCAwLjk5IC0+IDkwKVxuICAgICAgICAgICAgdmFyIGZyYWN0aW9uID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gTWF0aC5yb3VuZCgoKE1hdGguZmxvb3IodmFsdWUgKiAxMCkgLyAxMCkgJSAxKSAqIDEwMCk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyByZW1vdmUgYWxsIGNsYXNzZXMgZnJvbSBlbGVtZW50c1xuICAgICAgICAgICAgdmFyIHJlc2V0U3R5bGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgYWxsIGNsYXNzZXMgc3RhcnRpbmcgd2l0aCBici0qXG4gICAgICAgICAgICAgICAgc2VsZi4kd2lkZ2V0LmZpbmQoJ2EnKS5yZW1vdmVDbGFzcyhmdW5jdGlvbihpbmRleCwgY2xhc3Nlcykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKGNsYXNzZXMubWF0Y2goLyhefFxccylici1cXFMrL2cpIHx8IFtdKS5qb2luKCcgJyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBhcHBseSBzdHlsZSBieSBzZXR0aW5nIGNsYXNzZXMgb24gZWxlbWVudHNcbiAgICAgICAgICAgIHZhciBhcHBseVN0eWxlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyICRhID0gc2VsZi4kd2lkZ2V0LmZpbmQoJ2FbZGF0YS1yYXRpbmctdmFsdWU9XCInICsgcmF0aW5nVmFsdWUoKSArICdcIl0nKTtcbiAgICAgICAgICAgICAgICB2YXIgaW5pdGlhbFJhdGluZyA9IGdldERhdGEoJ3VzZXJPcHRpb25zJykuaW5pdGlhbFJhdGluZztcbiAgICAgICAgICAgICAgICB2YXIgYmFzZVZhbHVlID0gJC5pc051bWVyaWMocmF0aW5nVmFsdWUoKSkgPyByYXRpbmdWYWx1ZSgpIDogMDtcbiAgICAgICAgICAgICAgICB2YXIgZiA9IGZyYWN0aW9uKGluaXRpYWxSYXRpbmcpO1xuICAgICAgICAgICAgICAgIHZhciAkYWxsLCAkZnJhY3Rpb25hbDtcblxuICAgICAgICAgICAgICAgIHJlc2V0U3R5bGUoKTtcblxuICAgICAgICAgICAgICAgIC8vIGFkZCBjbGFzc2VzXG4gICAgICAgICAgICAgICAgJGEuYWRkQ2xhc3MoJ2JyLXNlbGVjdGVkIGJyLWN1cnJlbnQnKVtuZXh0QWxsb3JQcmV2aW91c0FsbCgpXSgpXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnYnItc2VsZWN0ZWQnKTtcblxuICAgICAgICAgICAgICAgIGlmICghZ2V0RGF0YSgncmF0aW5nTWFkZScpICYmICQuaXNOdW1lcmljKGluaXRpYWxSYXRpbmcpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgoaW5pdGlhbFJhdGluZyA8PSBiYXNlVmFsdWUpIHx8ICFmKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAkYWxsID0gc2VsZi4kd2lkZ2V0LmZpbmQoJ2EnKTtcblxuICAgICAgICAgICAgICAgICAgICAkZnJhY3Rpb25hbCA9ICgkYS5sZW5ndGgpID9cbiAgICAgICAgICAgICAgICAgICAgICAgICRhWyhnZXREYXRhKCd1c2VyT3B0aW9ucycpLnJldmVyc2UpID8gJ3ByZXYnIDogJ25leHQnXSgpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICRhbGxbKGdldERhdGEoJ3VzZXJPcHRpb25zJykucmV2ZXJzZSkgPyAnbGFzdCcgOiAnZmlyc3QnXSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICRmcmFjdGlvbmFsLmFkZENsYXNzKCdici1mcmFjdGlvbmFsJyk7XG4gICAgICAgICAgICAgICAgICAgICRmcmFjdGlvbmFsLmFkZENsYXNzKCdici1mcmFjdGlvbmFsLScgKyBmKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBjaGVjayBpZiB0aGUgZWxlbWVudCBpcyBkZXNlbGVjdGFibGU/XG4gICAgICAgICAgICB2YXIgaXNEZXNlbGVjdGFibGUgPSBmdW5jdGlvbigkZWxlbWVudCkge1xuICAgICAgICAgICAgICAgIGlmICghZ2V0RGF0YSgnYWxsb3dFbXB0eScpIHx8ICFnZXREYXRhKCd1c2VyT3B0aW9ucycpLmRlc2VsZWN0YWJsZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIChyYXRpbmdWYWx1ZSgpID09ICRlbGVtZW50LmF0dHIoJ2RhdGEtcmF0aW5nLXZhbHVlJykpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gaGFuZGxlIGNsaWNrIGV2ZW50c1xuICAgICAgICAgICAgdmFyIGF0dGFjaENsaWNrSGFuZGxlciA9IGZ1bmN0aW9uKCRlbGVtZW50cykge1xuICAgICAgICAgICAgICAgICRlbGVtZW50cy5vbignY2xpY2suYmFycmF0aW5nJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyICRhID0gJCh0aGlzKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMgPSBnZXREYXRhKCd1c2VyT3B0aW9ucycpLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0O1xuXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSAkYS5hdHRyKCdkYXRhLXJhdGluZy12YWx1ZScpO1xuICAgICAgICAgICAgICAgICAgICB0ZXh0ID0gJGEuYXR0cignZGF0YS1yYXRpbmctdGV4dCcpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGlzIGN1cnJlbnQgYW5kIGRlc2VsZWN0YWJsZT9cbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzRGVzZWxlY3RhYmxlKCRhKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBnZXREYXRhKCdlbXB0eVJhdGluZ1ZhbHVlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0ID0gZ2V0RGF0YSgnZW1wdHlSYXRpbmdUZXh0Jyk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyByZW1lbWJlciBzZWxlY3RlZCByYXRpbmdcbiAgICAgICAgICAgICAgICAgICAgc2V0RGF0YSgncmF0aW5nVmFsdWUnLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHNldERhdGEoJ3JhdGluZ1RleHQnLCB0ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgc2V0RGF0YSgncmF0aW5nTWFkZScsIHRydWUpO1xuXG4gICAgICAgICAgICAgICAgICAgIHNldFNlbGVjdEZpZWxkVmFsdWUodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBzaG93U2VsZWN0ZWRSYXRpbmcodGV4dCk7XG5cbiAgICAgICAgICAgICAgICAgICAgYXBwbHlTdHlsZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIG9uU2VsZWN0IGNhbGxiYWNrXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMub25TZWxlY3QuY2FsbChcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYsXG4gICAgICAgICAgICAgICAgICAgICAgICByYXRpbmdWYWx1ZSgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmF0aW5nVGV4dCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRcbiAgICAgICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBoYW5kbGUgbW91c2VlbnRlciBldmVudHNcbiAgICAgICAgICAgIHZhciBhdHRhY2hNb3VzZUVudGVySGFuZGxlciA9IGZ1bmN0aW9uKCRlbGVtZW50cykge1xuICAgICAgICAgICAgICAgICRlbGVtZW50cy5vbignbW91c2VlbnRlci5iYXJyYXRpbmcnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyICRhID0gJCh0aGlzKTtcblxuICAgICAgICAgICAgICAgICAgICByZXNldFN0eWxlKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgJGEuYWRkQ2xhc3MoJ2JyLWFjdGl2ZScpW25leHRBbGxvclByZXZpb3VzQWxsKCldKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnYnItYWN0aXZlJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgc2hvd1NlbGVjdGVkUmF0aW5nKCRhLmF0dHIoJ2RhdGEtcmF0aW5nLXRleHQnKSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBoYW5kbGUgbW91c2VsZWF2ZSBldmVudHNcbiAgICAgICAgICAgIHZhciBhdHRhY2hNb3VzZUxlYXZlSGFuZGxlciA9IGZ1bmN0aW9uKCRlbGVtZW50cykge1xuICAgICAgICAgICAgICAgIHNlbGYuJHdpZGdldC5vbignbW91c2VsZWF2ZS5iYXJyYXRpbmcgYmx1ci5iYXJyYXRpbmcnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgc2hvd1NlbGVjdGVkUmF0aW5nKCk7XG4gICAgICAgICAgICAgICAgICAgIGFwcGx5U3R5bGUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIHNvbWV3aGF0IHByaW1pdGl2ZSB3YXkgdG8gcmVtb3ZlIDMwMG1zIGNsaWNrIGRlbGF5IG9uIHRvdWNoIGRldmljZXNcbiAgICAgICAgICAgIC8vIGZvciBhIG1vcmUgYWR2YW5jZWQgc29sdXRpb24gY29uc2lkZXIgc2V0dGluZyBgZmFzdENsaWNrc2Agb3B0aW9uIHRvIGZhbHNlXG4gICAgICAgICAgICAvLyBhbmQgdXNpbmcgYSBsaWJyYXJ5IHN1Y2ggYXMgZmFzdGNsaWNrIChodHRwczovL2dpdGh1Yi5jb20vZnRsYWJzL2Zhc3RjbGljaylcbiAgICAgICAgICAgIHZhciBmYXN0Q2xpY2tzID0gZnVuY3Rpb24oJGVsZW1lbnRzKSB7XG4gICAgICAgICAgICAgICAgJGVsZW1lbnRzLm9uKCd0b3VjaHN0YXJ0LmJhcnJhdGluZycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuY2xpY2soKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIGRpc2FibGUgY2xpY2tzXG4gICAgICAgICAgICB2YXIgZGlzYWJsZUNsaWNrcyA9IGZ1bmN0aW9uKCRlbGVtZW50cykge1xuICAgICAgICAgICAgICAgICRlbGVtZW50cy5vbignY2xpY2suYmFycmF0aW5nJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHZhciBhdHRhY2hIYW5kbGVycyA9IGZ1bmN0aW9uKCRlbGVtZW50cykge1xuICAgICAgICAgICAgICAgIC8vIGF0dGFjaCBjbGljayBldmVudCBoYW5kbGVyXG4gICAgICAgICAgICAgICAgYXR0YWNoQ2xpY2tIYW5kbGVyKCRlbGVtZW50cyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5vcHRpb25zLmhvdmVyU3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gYXR0YWNoIG1vdXNlZW50ZXIgZXZlbnQgaGFuZGxlclxuICAgICAgICAgICAgICAgICAgICBhdHRhY2hNb3VzZUVudGVySGFuZGxlcigkZWxlbWVudHMpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGF0dGFjaCBtb3VzZWxlYXZlIGV2ZW50IGhhbmRsZXJcbiAgICAgICAgICAgICAgICAgICAgYXR0YWNoTW91c2VMZWF2ZUhhbmRsZXIoJGVsZW1lbnRzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB2YXIgZGV0YWNoSGFuZGxlcnMgPSBmdW5jdGlvbigkZWxlbWVudHMpIHtcbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgZXZlbnQgaGFuZGxlcnMgaW4gdGhlIFwiLmJhcnJhdGluZ1wiIG5hbWVzcGFjZVxuICAgICAgICAgICAgICAgICRlbGVtZW50cy5vZmYoJy5iYXJyYXRpbmcnKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHZhciBzZXR1cEhhbmRsZXJzID0gZnVuY3Rpb24ocmVhZG9ubHkpIHtcbiAgICAgICAgICAgICAgICB2YXIgJGVsZW1lbnRzID0gc2VsZi4kd2lkZ2V0LmZpbmQoJ2EnKTtcblxuICAgICAgICAgICAgICAgIGlmIChmYXN0Q2xpY2tzKSB7XG4gICAgICAgICAgICAgICAgICAgIGZhc3RDbGlja3MoJGVsZW1lbnRzKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAocmVhZG9ubHkpIHtcbiAgICAgICAgICAgICAgICAgICAgZGV0YWNoSGFuZGxlcnMoJGVsZW1lbnRzKTtcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZUNsaWNrcygkZWxlbWVudHMpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGF0dGFjaEhhbmRsZXJzKCRlbGVtZW50cyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy5zaG93ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgLy8gcnVuIG9ubHkgb25jZVxuICAgICAgICAgICAgICAgIGlmIChnZXREYXRhKCkpIHJldHVybjtcblxuICAgICAgICAgICAgICAgIC8vIHdyYXAgZWxlbWVudFxuICAgICAgICAgICAgICAgIHdyYXBFbGVtZW50KCk7XG5cbiAgICAgICAgICAgICAgICAvLyBzYXZlIGRhdGFcbiAgICAgICAgICAgICAgICBzYXZlRGF0YU9uRWxlbWVudCgpO1xuXG4gICAgICAgICAgICAgICAgLy8gYnVpbGQgJiBhcHBlbmQgd2lkZ2V0IHRvIHRoZSBET01cbiAgICAgICAgICAgICAgICBzZWxmLiR3aWRnZXQgPSBidWlsZFdpZGdldCgpO1xuICAgICAgICAgICAgICAgIHNlbGYuJHdpZGdldC5pbnNlcnRBZnRlcihzZWxmLiRlbGVtKTtcblxuICAgICAgICAgICAgICAgIGFwcGx5U3R5bGUoKTtcblxuICAgICAgICAgICAgICAgIHNob3dTZWxlY3RlZFJhdGluZygpO1xuXG4gICAgICAgICAgICAgICAgc2V0dXBIYW5kbGVycyhzZWxmLm9wdGlvbnMucmVhZG9ubHkpO1xuXG4gICAgICAgICAgICAgICAgLy8gaGlkZSB0aGUgc2VsZWN0IGZpZWxkXG4gICAgICAgICAgICAgICAgc2VsZi4kZWxlbS5oaWRlKCk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLnJlYWRvbmx5ID0gZnVuY3Rpb24oc3RhdGUpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHN0YXRlICE9PSAnYm9vbGVhbicgfHwgZ2V0RGF0YSgncmVhZE9ubHknKSA9PSBzdGF0ZSkgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgc2V0dXBIYW5kbGVycyhzdGF0ZSk7XG4gICAgICAgICAgICAgICAgc2V0RGF0YSgncmVhZE9ubHknLCBzdGF0ZSk7XG4gICAgICAgICAgICAgICAgc2VsZi4kd2lkZ2V0LnRvZ2dsZUNsYXNzKCdici1yZWFkb25seScpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy5zZXQgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHZhciBvcHRpb25zID0gZ2V0RGF0YSgndXNlck9wdGlvbnMnKTtcblxuICAgICAgICAgICAgICAgIGlmIChzZWxmLiRlbGVtLmZpbmQoJ29wdGlvblt2YWx1ZT1cIicgKyB2YWx1ZSArICdcIl0nKS5sZW5ndGggPT09IDApIHJldHVybjtcblxuICAgICAgICAgICAgICAgIC8vIHNldCBkYXRhXG4gICAgICAgICAgICAgICAgc2V0RGF0YSgncmF0aW5nVmFsdWUnLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgc2V0RGF0YSgncmF0aW5nVGV4dCcsIHNlbGYuJGVsZW0uZmluZCgnb3B0aW9uW3ZhbHVlPVwiJyArIHZhbHVlICsgJ1wiXScpLnRleHQoKSk7XG4gICAgICAgICAgICAgICAgc2V0RGF0YSgncmF0aW5nTWFkZScsIHRydWUpO1xuXG4gICAgICAgICAgICAgICAgc2V0U2VsZWN0RmllbGRWYWx1ZShyYXRpbmdWYWx1ZSgpKTtcbiAgICAgICAgICAgICAgICBzaG93U2VsZWN0ZWRSYXRpbmcocmF0aW5nVGV4dCgpKTtcblxuICAgICAgICAgICAgICAgIGFwcGx5U3R5bGUoKTtcblxuICAgICAgICAgICAgICAgIC8vIG9uU2VsZWN0IGNhbGxiYWNrXG4gICAgICAgICAgICAgICAgaWYgKCFvcHRpb25zLnNpbGVudCkge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLm9uU2VsZWN0LmNhbGwoXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmF0aW5nVmFsdWUoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhdGluZ1RleHQoKVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMuY2xlYXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgb3B0aW9ucyA9IGdldERhdGEoJ3VzZXJPcHRpb25zJyk7XG5cbiAgICAgICAgICAgICAgICAvLyByZXN0b3JlIG9yaWdpbmFsIGRhdGFcbiAgICAgICAgICAgICAgICBzZXREYXRhKCdyYXRpbmdWYWx1ZScsIGdldERhdGEoJ29yaWdpbmFsUmF0aW5nVmFsdWUnKSk7XG4gICAgICAgICAgICAgICAgc2V0RGF0YSgncmF0aW5nVGV4dCcsIGdldERhdGEoJ29yaWdpbmFsUmF0aW5nVGV4dCcpKTtcbiAgICAgICAgICAgICAgICBzZXREYXRhKCdyYXRpbmdNYWRlJywgZmFsc2UpO1xuXG4gICAgICAgICAgICAgICAgcmVzZXRTZWxlY3RGaWVsZCgpO1xuICAgICAgICAgICAgICAgIHNob3dTZWxlY3RlZFJhdGluZyhyYXRpbmdUZXh0KCkpO1xuXG4gICAgICAgICAgICAgICAgYXBwbHlTdHlsZSgpO1xuXG4gICAgICAgICAgICAgICAgLy8gb25DbGVhciBjYWxsYmFja1xuICAgICAgICAgICAgICAgIG9wdGlvbnMub25DbGVhci5jYWxsKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLFxuICAgICAgICAgICAgICAgICAgICByYXRpbmdWYWx1ZSgpLFxuICAgICAgICAgICAgICAgICAgICByYXRpbmdUZXh0KClcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy5kZXN0cm95ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gcmF0aW5nVmFsdWUoKTtcbiAgICAgICAgICAgICAgICB2YXIgdGV4dCA9IHJhdGluZ1RleHQoKTtcbiAgICAgICAgICAgICAgICB2YXIgb3B0aW9ucyA9IGdldERhdGEoJ3VzZXJPcHRpb25zJyk7XG5cbiAgICAgICAgICAgICAgICAvLyBkZXRhY2ggaGFuZGxlcnNcbiAgICAgICAgICAgICAgICBkZXRhY2hIYW5kbGVycyhzZWxmLiR3aWRnZXQuZmluZCgnYScpKTtcblxuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSB3aWRnZXRcbiAgICAgICAgICAgICAgICBzZWxmLiR3aWRnZXQucmVtb3ZlKCk7XG5cbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgZGF0YVxuICAgICAgICAgICAgICAgIHJlbW92ZURhdGFPbkVsZW1lbnQoKTtcblxuICAgICAgICAgICAgICAgIC8vIHVud3JhcCB0aGUgZWxlbWVudFxuICAgICAgICAgICAgICAgIHVud3JhcEVsZW1lbnQoKTtcblxuICAgICAgICAgICAgICAgIC8vIHNob3cgdGhlIGVsZW1lbnRcbiAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLnNob3coKTtcblxuICAgICAgICAgICAgICAgIC8vIG9uRGVzdHJveSBjYWxsYmFja1xuICAgICAgICAgICAgICAgIG9wdGlvbnMub25EZXN0cm95LmNhbGwoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgICAgICAgICAgICB0ZXh0XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBCYXJSYXRpbmcucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAob3B0aW9ucywgZWxlbSkge1xuICAgICAgICAgICAgdGhpcy4kZWxlbSA9ICQoZWxlbSk7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgJC5mbi5iYXJyYXRpbmcuZGVmYXVsdHMsIG9wdGlvbnMpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBCYXJSYXRpbmc7XG4gICAgfSkoKTtcblxuICAgICQuZm4uYmFycmF0aW5nID0gZnVuY3Rpb24gKG1ldGhvZCwgb3B0aW9ucykge1xuICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBwbHVnaW4gPSBuZXcgQmFyUmF0aW5nKCk7XG5cbiAgICAgICAgICAgIC8vIHBsdWdpbiB3b3JrcyB3aXRoIHNlbGVjdCBmaWVsZHNcbiAgICAgICAgICAgIGlmICghJCh0aGlzKS5pcygnc2VsZWN0JykpIHtcbiAgICAgICAgICAgICAgICAkLmVycm9yKCdTb3JyeSwgdGhpcyBwbHVnaW4gb25seSB3b3JrcyB3aXRoIHNlbGVjdCBmaWVsZHMuJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIG1ldGhvZCBzdXBwbGllZFxuICAgICAgICAgICAgaWYgKHBsdWdpbi5oYXNPd25Qcm9wZXJ0eShtZXRob2QpKSB7XG4gICAgICAgICAgICAgICAgcGx1Z2luLmluaXQob3B0aW9ucywgdGhpcyk7XG4gICAgICAgICAgICAgICAgaWYgKG1ldGhvZCA9PT0gJ3Nob3cnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwbHVnaW4uc2hvdyhvcHRpb25zKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBwbHVnaW4gZXhpc3RzP1xuICAgICAgICAgICAgICAgICAgICBpZiAocGx1Z2luLiRlbGVtLmRhdGEoJ2JhcnJhdGluZycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwbHVnaW4uJHdpZGdldCA9ICQodGhpcykubmV4dCgnLmJyLXdpZGdldCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBsdWdpblttZXRob2RdKG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBubyBtZXRob2Qgc3VwcGxpZWQgb3Igb25seSBvcHRpb25zIHN1cHBsaWVkXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBtZXRob2QgPT09ICdvYmplY3QnIHx8ICFtZXRob2QpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zID0gbWV0aG9kO1xuICAgICAgICAgICAgICAgIHBsdWdpbi5pbml0KG9wdGlvbnMsIHRoaXMpO1xuICAgICAgICAgICAgICAgIHJldHVybiBwbHVnaW4uc2hvdygpO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQuZXJyb3IoJ01ldGhvZCAnICsgbWV0aG9kICsgJyBkb2VzIG5vdCBleGlzdCBvbiBqUXVlcnkuYmFycmF0aW5nJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICAkLmZuLmJhcnJhdGluZy5kZWZhdWx0cyA9IHtcbiAgICAgICAgdGhlbWU6JycsXG4gICAgICAgIGluaXRpYWxSYXRpbmc6bnVsbCwgLy8gaW5pdGlhbCByYXRpbmdcbiAgICAgICAgYWxsb3dFbXB0eTpudWxsLCAvLyBhbGxvdyBlbXB0eSByYXRpbmdzP1xuICAgICAgICBlbXB0eVZhbHVlOicnLCAvLyB0aGlzIGlzIHRoZSBleHBlY3RlZCB2YWx1ZSBvZiB0aGUgZW1wdHkgcmF0aW5nXG4gICAgICAgIHNob3dWYWx1ZXM6ZmFsc2UsIC8vIGRpc3BsYXkgcmF0aW5nIHZhbHVlcyBvbiB0aGUgYmFycz9cbiAgICAgICAgc2hvd1NlbGVjdGVkUmF0aW5nOnRydWUsIC8vIGFwcGVuZCBhIGRpdiB3aXRoIGEgcmF0aW5nIHRvIHRoZSB3aWRnZXQ/XG4gICAgICAgIGRlc2VsZWN0YWJsZTp0cnVlLCAvLyBhbGxvdyB0byBkZXNlbGVjdCByYXRpbmdzP1xuICAgICAgICByZXZlcnNlOmZhbHNlLCAvLyByZXZlcnNlIHRoZSByYXRpbmc/XG4gICAgICAgIHJlYWRvbmx5OmZhbHNlLCAvLyBtYWtlIHRoZSByYXRpbmcgcmVhZHktb25seT9cbiAgICAgICAgZmFzdENsaWNrczp0cnVlLCAvLyByZW1vdmUgMzAwbXMgY2xpY2sgZGVsYXkgb24gdG91Y2ggZGV2aWNlcz9cbiAgICAgICAgaG92ZXJTdGF0ZTp0cnVlLCAvLyBjaGFuZ2Ugc3RhdGUgb24gaG92ZXI/XG4gICAgICAgIHNpbGVudDpmYWxzZSwgLy8gc3VwcmVzcyBjYWxsYmFja3Mgd2hlbiBjb250cm9sbGluZyByYXRpbmdzIHByb2dyYW1hdGljYWxseVxuICAgICAgICBvblNlbGVjdDpmdW5jdGlvbiAodmFsdWUsIHRleHQsIGV2ZW50KSB7XG4gICAgICAgIH0sIC8vIGNhbGxiYWNrIGZpcmVkIHdoZW4gYSByYXRpbmcgaXMgc2VsZWN0ZWRcbiAgICAgICAgb25DbGVhcjpmdW5jdGlvbiAodmFsdWUsIHRleHQpIHtcbiAgICAgICAgfSwgLy8gY2FsbGJhY2sgZmlyZWQgd2hlbiBhIHJhdGluZyBpcyBjbGVhcmVkXG4gICAgICAgIG9uRGVzdHJveTpmdW5jdGlvbiAodmFsdWUsIHRleHQpIHtcbiAgICAgICAgfSAvLyBjYWxsYmFjayBmaXJlZCB3aGVuIGEgd2lkZ2V0IGlzIGRlc3Ryb3llZFxuICAgIH07XG5cbiAgICAkLmZuLmJhcnJhdGluZy5CYXJSYXRpbmcgPSBCYXJSYXRpbmc7XG5cbn0pKTtcbiIsIi8qKlxuICogQHBhY2thZ2UgICAgS25vdyBSZXNlcnZhdGlvbnNcbiAqIEBzdWJwYWNrYWdlIFNpdGUgSlNcbiAqIEBjb3B5cmlnaHQgIDIwMjAgSGlnaGxhbmQgVmlzaW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogQGxpY2Vuc2UgICAgU2VlIHRoZSBmaWxlIFwiTElDRU5TRS50eHRcIiBmb3IgdGhlIGZ1bGwgbGljZW5zZSBnb3Zlcm5pbmcgdGhpcyBjb2RlLlxuICogQGF1dGhvciAgICAgSGF6ZWwgV2lsc29uIDxoYXplbEBoaWdobGFuZHZpc2lvbi5jb20+XG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbmxldCBsYW5nO1xubGV0IHNlYXJjaGRhdGEgPSBbXTtcbmxldCBzZWFyY2hEb25lID0gZmFsc2U7XG5sZXQgY2FsZW5kYXJMb2FkZWQgPSBmYWxzZTtcbmxldCBzYXZlZHdpZHRoID0gZmFsc2U7XG5sZXQgbGFyZ2U7XG5sZXQgcmVzaXplZCA9IGZhbHNlO1xuXG5pZiAoIXdpbmRvdy5sb2NhdGlvbi5vcmlnaW4pXG5cdHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gPSB3aW5kb3cubG9jYXRpb24ucHJvdG9jb2wgKyBcIi8vXCIgKyB3aW5kb3cubG9jYXRpb24uaG9zdDtcbmNvbnN0IGxpdmVzaXRlID0gd2luZG93LmxvY2F0aW9uLm9yaWdpbiArICcvJztcblxuKGZ1bmN0aW9uICgkKSB7XG5cdCQoZnVuY3Rpb24gKCkge1xuXHRcdEZvdW5kYXRpb24uYWRkVG9KcXVlcnkoKTtcblx0XHQkKGRvY3VtZW50KS5mb3VuZGF0aW9uKCk7XG5cdFx0bGFuZyA9ICQoJyNrci1sYW5nJykuZGF0YSgna3JsYW5nJyk7XG5cblx0XHRjaGVja1NjcmVlbldpZHRoKCk7XG5cdFx0JCh3aW5kb3cpLm9uKFwicmVzaXplXCIsIGZ1bmN0aW9uICgpIHtcblx0XHRcdGNoZWNrU2NyZWVuV2lkdGgoKVxuXHRcdH0pO1xuXG5cdFx0Y29uc3QgYmFycyA9ICQoJy5rci1yYXRpbmcnKTtcblx0XHRpZiAoYmFycy5sZW5ndGgpIHtcblx0XHRcdGJhcnMuYmFycmF0aW5nKCdzaG93Jywge1xuXHRcdFx0XHRzaG93VmFsdWVzOiAgICAgICAgIHRydWUsXG5cdFx0XHRcdHNob3dTZWxlY3RlZFJhdGluZzogZmFsc2Vcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdCQoZG9jdW1lbnQpLm9uKCdzdWJtaXQnLCAnLmFqYXhmb3JtJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGNvbnN0ICRmb3JtID0gJCh0aGlzKTtcblx0XHRcdCQuYWpheCh7XG5cdFx0XHRcdHR5cGU6ICAgICAnUE9TVCcsXG5cdFx0XHRcdHVybDogICAgICAkZm9ybS5hdHRyKCdhY3Rpb24nKSArICcmbGFuZz0nICsgbGFuZyxcblx0XHRcdFx0ZGF0YTogICAgICRmb3JtLnNlcmlhbGl6ZSgpLFxuXHRcdFx0XHRkYXRhVHlwZTogJ2pzb24nLFxuXHRcdFx0XHRzdWNjZXNzOiAgZnVuY3Rpb24gKHJlc3VsdCkge1xuXHRcdFx0XHRcdGlmIChyZXN1bHQuc3VjY2Vzcykge1xuXHRcdFx0XHRcdFx0aWYgKHJlc3VsdC5kYXRhKSB7XG5cdFx0XHRcdFx0XHRcdGZvcm1SZXNwb25zZSgkZm9ybS5hdHRyKCdpZCcpLCByZXN1bHQuZGF0YSk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHR3aW5kb3cubG9jYXRpb24uaHJlZiA9IGxpdmVzaXRlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHQkKCcua3ItYWpheC1tb2RhbC1lcnJvci1tZXNzYWdlJykuaHRtbChyZXN1bHQubWVzc2FnZSk7XG5cdFx0XHRcdFx0XHRjb25zdCAkbW9kYWwgPSBuZXcgRm91bmRhdGlvbi5SZXZlYWwoJCgnI0tyQWpheE1vZGFsRXJyb3InKSk7XG5cdFx0XHRcdFx0XHQkbW9kYWwub3BlbigpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0ZXJyb3I6ICAgIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHQkKCcua3ItYWpheC1tb2RhbC1lcnJvci1tZXNzYWdlJykuaHRtbCgnU29ycnkgYW4gZXJyb3IgaGFzIG9jY3VycmVkLCBwbGVhc2UgdHJ5IGFnYWluJyk7XG5cdFx0XHRcdFx0Y29uc3QgJG1vZGFsID0gbmV3IEZvdW5kYXRpb24uUmV2ZWFsKCQoJyNLckFqYXhNb2RhbEVycm9yJykpO1xuXHRcdFx0XHRcdCRtb2RhbC5vcGVuKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0pLm9uKCdoaWRlLnpmLmRyb3Bkb3duJywgJyNrci1xdW90ZS1mb3JtJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0JCgnI2d1ZXN0cycpLnRyaWdnZXIoJ2NoYW5nZScpO1xuXHRcdH0pLm9uKCdvcGVuLnpmLnJldmVhbCcsICcua3ItYWpheC1tb2RhbFtkYXRhLXJldmVhbF0nLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0Y29uc3QgbW9kYWxpZCA9IFwiI1wiICsgJCh0aGlzKS5hdHRyKCdpZCcpO1xuXHRcdFx0aWYgKCEkLnRyaW0oJChtb2RhbGlkKS5odG1sKCkpLmxlbmd0aCkge1xuXHRcdFx0XHRjb25zdCBhamF4dXJsID0gJCh0aGlzKS5kYXRhKCdhamF4dXJsJyk7XG5cdFx0XHRcdGlmIChhamF4dXJsKSB7XG5cdFx0XHRcdFx0JC5hamF4KHtcblx0XHRcdFx0XHRcdHR5cGU6ICAgICdQT1NUJyxcblx0XHRcdFx0XHRcdHVybDogICAgIGFqYXh1cmwsXG5cdFx0XHRcdFx0XHRzdWNjZXNzOiBmdW5jdGlvbiAoY29udGVudCkge1xuXHRcdFx0XHRcdFx0XHQkKG1vZGFsaWQpLmh0bWwoY29udGVudCkudHJpZ2dlcigncmVzaXplbWUuemYucmV2ZWFsJyk7XG5cdFx0XHRcdFx0XHRcdCQobW9kYWxpZCkuZm91bmRhdGlvbigpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSkub24oJ2NsaWNrJywgJy5mYXZzcGFuJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGNvbnN0ICR0aGlzID0gJCh0aGlzKTtcblxuXHRcdFx0JC5hamF4KHtcblx0XHRcdFx0dHlwZTogICAgICdQT1NUJyxcblx0XHRcdFx0dXJsOiAgICAgIGxpdmVzaXRlICsgJ2luZGV4LnBocD9vcHRpb249Y29tX2tub3dyZXMmdGFzaz1wcm9wZXJ0aWVzLmZhdm91cml0ZSZsYW5nPScgKyBsYW5nLFxuXHRcdFx0XHRkYXRhOiAgICAgeydwcm9wZXJ0eV9pZCc6ICR0aGlzLmRhdGEoJ3Byb3BlcnR5JyksICd2aWV3JzogJHRoaXMuZGF0YSgndmlldycpfSxcblx0XHRcdFx0ZGF0YVR5cGU6ICdqc29uJyxcblx0XHRcdFx0c3VjY2VzczogIGZ1bmN0aW9uIChyZXN1bHQpIHtcblx0XHRcdFx0XHRpZiAocmVzdWx0LnN1Y2Nlc3MpIHtcblx0XHRcdFx0XHRcdGlmIChyZXN1bHQuZGF0YS5hY3Rpb24gPT09ICdoaWRlbWUnKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IGVsZW1lbnQgPSBcIiNcIiArICR0aGlzLmZpbmQoJy5oYXMtdGlwJykuZGF0YSgndG9nZ2xlJyk7XG5cdFx0XHRcdFx0XHRcdCQoZWxlbWVudCkucmVtb3ZlKCk7XG5cdFx0XHRcdFx0XHRcdCR0aGlzLnBhcmVudHMoJy5rci1wcm9wZXJ0aWVzIC5rci1wcm9wZXJ0eSAuZmF2czpmaXJzdCcpLmhpZGUoJ3Nsb3cnKTtcblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAocmVzdWx0LmRhdGEuYWN0aW9uICE9PSAnbm9uZScpIHtcblx0XHRcdFx0XHRcdFx0Y29uc3QgJHRhcmdldCA9ICR0aGlzLmZpbmQoJ2kuZmEtaGVhcnQnKTtcblx0XHRcdFx0XHRcdFx0JHRhcmdldC50b2dnbGVDbGFzcygnaW4nKTtcblx0XHRcdFx0XHRcdFx0Y29uc3QgdmFsMSA9ICcjJyArICR0YXJnZXQuZGF0YSgndG9nZ2xlJyk7XG5cdFx0XHRcdFx0XHRcdCQodmFsMSkudGV4dChyZXN1bHQuZGF0YS5hY3Rpb24pLmhpZGUoKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0pLm9uKCdjbGljaycsICcuZ2V0UmVzcG9uc2VTZWFyY2gnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0Z2V0UHJvcGVydGllcygkKHRoaXMpLmRhdGEoJ2ZpZWxkJyksICQodGhpcykuZGF0YSgndmFsdWUnKSk7XG5cdFx0fSkub24oJ2NsaWNrJywgJy5rci1maWx0ZXJzLWNsb3NlJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdCQoJy5rci1maWx0ZXJzLnRvcCcpLmFkZENsYXNzKCdoaWRlbWUnKTtcblx0XHRcdCQodGhpcykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdH0pLm9uKCdjbGljaycsICcuc2lkZWJhciAua3ItZmlsdGVycyB1bC5maWx0ZXItc29ydC1saXN0IGxpLmhlYWQnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0JCh0aGlzKS5wYXJlbnQoKS5jaGlsZHJlbignbGkuY2hlY2tib3gnKS50b2dnbGUoKTtcblx0XHRcdCQodGhpcykudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdH0pLm9uKCdjbGljaycsICcjc2hvd2dhdGV3YXlzJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdCQoJyNrci1nYXRld2F5cycpLnRvZ2dsZUNsYXNzKCdoaWRlbWUnKTtcblx0XHR9KS5vbignY2xpY2snLCAnI2tyLXNob3ctc29ydGJ5JywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdCQoJy5rci1maWx0ZXJzLnRvcCcpLmFkZENsYXNzKCdoaWRlbWUnKTtcblx0XHRcdCQoJy5rci1zb3J0YnkudG9wJykudG9nZ2xlQ2xhc3MoJ2hpZGVtZScpO1xuXHRcdFx0c2V0QWN0aXZlTWVudSgnc29ydCcpO1xuXHRcdH0pLm9uKCdjbGljaycsICcja3Itc2hvdy1maWx0ZXJieScsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHQkKCcua3Itc29ydGJ5LnRvcCcpLmFkZENsYXNzKCdoaWRlbWUnKTtcblx0XHRcdCQoJy5rci1maWx0ZXJzLnRvcCcpLnRvZ2dsZUNsYXNzKCdoaWRlbWUnKTtcblx0XHRcdHNldEFjdGl2ZU1lbnUoJ2ZpbHRlcicpO1xuXHRcdH0pLm9uKCdjbGljaycsICcua3ItZmlsdGVycy1jbG9zZScsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHQkKCcua3ItZmlsdGVycy50b3AnKS5hZGRDbGFzcygnaGlkZW1lJyk7XG5cdFx0XHRzZXRBY3RpdmVNZW51KCdsaXN0Jyk7XG5cdFx0fSkub24oJ2NsaWNrJywgJy50b2dnbGVvdGhlcicsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHQkKHRoaXMpLmRhdGEoJ290aGVyJykudG9nZ2xlKCk7XG5cdFx0fSkub24oJ2NsaWNrJywgJyNrci1wcm9wZXJ0eS10YWJzIGFbaHJlZj1cIiNjYWxlbmRhclwiXScsIGZ1bmN0aW9uKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGlmICghY2FsZW5kYXJMb2FkZWQpIHtcblx0XHRcdFx0Y29uc3QgcGlkID0gJCh0aGlzKS5kYXRhKCdwaWQnKTtcblx0XHRcdFx0bG9hZENhbGVuZGFyKHBpZCk7XG5cdFx0XHRcdGNhbGVuZGFyTG9hZGVkID0gdHJ1ZTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdGlmICgkKCcua3ItcHJvcGVydGllcycpLmxlbmd0aCAmJiAhc2VhcmNoRG9uZSkge1xuXHRcdFx0Z2V0UHJvcGVydGllcygndmlldycsICQodGhpcykuZGF0YSgndmlldycpKTtcblx0XHR9XG5cblx0XHRsZXQgJHRhYnMgPSAkKCcudGFicycpO1xuXHRcdGlmICgkKCcja3ItcHJvcGVydHktdGFicycpLmxlbmd0aCAmJiAhY2FsZW5kYXJMb2FkZWQpIHtcblx0XHRcdCR0YWJzLmZpbmQoJ2EnKS5lYWNoKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0aWYgKCQodGhpcykuYXR0cignaHJlZicpID09PSBcIiNjYWxlbmRhclwiKSB7XG5cdFx0XHRcdFx0Y29uc3QgcGlkID0gJCh0aGlzKS5kYXRhKCdwaWQnKTtcblx0XHRcdFx0XHRsb2FkQ2FsZW5kYXIocGlkKTtcblx0XHRcdFx0XHRjYWxlbmRhckxvYWRlZCA9IHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblx0fSk7XG5cblx0JC5ldmVudC5zcGVjaWFsLnRvdWNoc3RhcnQgPSB7XG5cdFx0c2V0dXA6IGZ1bmN0aW9uIChfLCBucywgaGFuZGxlKSB7XG5cdFx0XHRpZiAobnMuaW5jbHVkZXMoXCJub1ByZXZlbnREZWZhdWx0XCIpKSB7XG5cdFx0XHRcdHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgaGFuZGxlLCB7cGFzc2l2ZTogZmFsc2V9KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgaGFuZGxlLCB7cGFzc2l2ZTogdHJ1ZX0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblx0JC5ldmVudC5zcGVjaWFsLnRvdWNobW92ZSA9IHtcblx0XHRzZXR1cDogZnVuY3Rpb24gKF8sIG5zLCBoYW5kbGUpIHtcblx0XHRcdGlmIChucy5pbmNsdWRlcyhcIm5vUHJldmVudERlZmF1bHRcIikpIHtcblx0XHRcdFx0dGhpcy5hZGRFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsIGhhbmRsZSwge3Bhc3NpdmU6IGZhbHNlfSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIiwgaGFuZGxlLCB7cGFzc2l2ZTogdHJ1ZX0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblxuXHRmdW5jdGlvbiBsb2FkQ2FsZW5kYXIocGlkKSB7XG5cdFx0JC5hamF4KHtcblx0XHRcdHR5cGU6ICAgICAnUE9TVCcsXG5cdFx0XHR1cmw6ICAgICAgbGl2ZXNpdGUgKyAnaW5kZXgucGhwP29wdGlvbj1jb21fa25vd3JlcyZ0YXNrPXByb3BlcnR5LmdlcmlhdHJpYyZsYW5nPScgKyBsYW5nLFxuXHRcdFx0ZGF0YVR5cGU6ICdodG1sJyxcblx0XHRcdGRhdGE6ICAgICB7XG5cdFx0XHRcdCdwaWQnOiBwaWRcblx0XHRcdH0sXG5cdFx0XHRzdWNjZXNzOiAgZnVuY3Rpb24gKGRhdGEpIHtcblx0XHRcdFx0JCgnI2NhbGVuZGFyLnRhYnMtcGFuZWwnKS5hcHBlbmQoZGF0YSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRmdW5jdGlvbiBmb3JtUmVzcG9uc2UoaWQsIGRhdGEpIHtcblx0XHRpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eSgncmVkaXJlY3QnKSkge1xuXHRcdFx0d2luZG93LmxvY2F0aW9uLnJlcGxhY2UoZGF0YS5yZWRpcmVjdCk7XG5cdFx0fSBlbHNlIGlmIChpZCA9PT0gJ2tyLWZvcm0tcGF5bWVudCcpIHtcblx0XHRcdGlmIChkYXRhLmhhc093blByb3BlcnR5KCdodG1sJykpIHtcblx0XHRcdFx0bGV0ICRtb2RhbCA9ICQoJyNrci1nYXRld2F5LW1vZGFsJyk7XG5cdFx0XHRcdCRtb2RhbC5odG1sKGRhdGEuaHRtbCkudHJpZ2dlcigncmVzaXplbWUuemYucmV2ZWFsJyk7XG5cdFx0XHRcdCRtb2RhbC5mb3VuZGF0aW9uKCdvcGVuJyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR3aW5kb3cubG9jYXRpb24uaHJlZiA9IGxpdmVzaXRlO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSBpZiAoaWQgPT09ICdrci1mb3JtLW1haWxjaGltcCcpIHtcblx0XHRcdCQoJyNyZXNwb25zZTInKS5odG1sKGRhdGEpO1xuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIGdldFByb3BlcnRpZXMoZmllbGQsIHZhbHVlKSB7XG5cdFx0JC5hamF4KHtcblx0XHRcdHVybDogICAgICBsaXZlc2l0ZSArICdpbmRleC5waHA/b3B0aW9uPWNvbV9rbm93cmVzJnZpZXc9cHJvcGVydGllcyZmb3JtYXQ9cmF3Jmxhbmc9JyArIGxhbmcsXG5cdFx0XHR0eXBlOiAgICAgJ1BPU1QnLFxuXHRcdFx0ZGF0YTogICAgIHsnZmllbGQnOiBmaWVsZCwgJ3ZhbHVlJzogdmFsdWV9LFxuXHRcdFx0ZGF0YVR5cGU6ICdqc29uJyxcblx0XHRcdHN1Y2Nlc3M6ICBmdW5jdGlvbiAoZGF0YSkge1xuXHRcdFx0XHRzZWFyY2hkYXRhID0gZGF0YTtcblx0XHRcdFx0aWYgKCFzZWFyY2hkYXRhKSB7XG5cdFx0XHRcdFx0d2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIG5vaW5zcGVjdGlvbiBPdmVybHlDb21wbGV4Qm9vbGVhbkV4cHJlc3Npb25KU1xuXHRcdFx0XHRpZiAoZmllbGQgPT09ICdvcmRlcicgfHwgZmllbGQgPT09ICd2aWV3JyB8fCBmaWVsZCA9PT0gJ2ZhdnMnIHx8IGZpZWxkID09PSAnbWFwJykge1xuXHRcdFx0XHRcdHNldEFjdGl2ZU1lbnUoc2VhcmNoZGF0YVsndmlldyddKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHNldFNlYXJjaERhdGEoc2VhcmNoZGF0YSwgZmllbGQpO1xuXHRcdFx0XHQkKCcuaGFzLXRpcCcpLmZvdW5kYXRpb24oKTtcblx0XHRcdFx0JCgnLmRyb3Bkb3duLXBhbmUnKS5mb3VuZGF0aW9uKCk7XG5cdFx0XHRcdGlmICghbGFyZ2UgJiYgZmllbGQgPT09ICdvcmRlcicpIHtcblx0XHRcdFx0XHQkKCcjc29ydGJ5JykudHJpZ2dlcignY2xpY2snKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRzZWFyY2hEb25lID0gdHJ1ZTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdGZ1bmN0aW9uIHNldFNlYXJjaERhdGEocmVzcG9uc2UsIGZpZWxkID0gJycpIHtcblx0XHRpZiAocmVzcG9uc2UpIHtcblx0XHRcdCQoJyNrci1wcm9wZXJ0aWVzLWRhdGEnKS5lbXB0eSgpLmZhZGVJbignc2xvdycpLmh0bWwocmVzcG9uc2VbJ2l0ZW1zJ10pLmZvdW5kYXRpb24oKTtcblx0XHRcdCQoJy5rci1wYWdlcicpLmh0bWwocmVzcG9uc2VbJ3BhZ2luYXRpb24nXSk7XG5cblx0XHRcdGlmIChsYXJnZSA9PT0gdHJ1ZSkge1xuXHRcdFx0XHQkKFwiI2tyLXByb3BlcnRpZXMtc2VhcmNoLW9mZi1jYW52YXNcIikuaHRtbCgnJyk7XG5cdFx0XHRcdCQoXCIja3ItcHJvcGVydGllcy1maWx0ZXJzLW9mZi1jYW52YXNcIikuaHRtbCgnJyk7XG5cdFx0XHRcdCQoXCIja3ItcHJvcGVydGllcy1zb3J0Ynktb2ZmLWNhbnZhc1wiKS5odG1sKCcnKTtcblx0XHRcdFx0JChcIiNrci1zaWRlYmFyLXNlYXJjaFwiKS5lbXB0eSgpLmh0bWwocmVzcG9uc2VbJ3NlYXJjaCddKTtcblx0XHRcdFx0JCgnI2tyLXByb3BlcnRpZXMtZmlsdGVycycpLmVtcHR5KCkuaHRtbChyZXNwb25zZVsnZmlsdGVycyddKTtcblx0XHRcdFx0JCgnI2tyLXByb3BlcnRpZXMtc29ydGJ5JykuZW1wdHkoKS5odG1sKHJlc3BvbnNlWydzb3J0YnknXSkuYWRkQ2xhc3MoJ2hpZGVtZScpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0JCgnI2tyLXByb3BlcnRpZXMtZmlsdGVycycpLmh0bWwoJycpO1xuXHRcdFx0XHQkKCcja3ItcHJvcGVydGllcy1zb3J0YnknKS5odG1sKCcnKTtcblx0XHRcdFx0JChcIiNrci1zaWRlYmFyLXNlYXJjaFwiKS5odG1sKCcnKTtcblx0XHRcdFx0JChcIiNrci1wcm9wZXJ0aWVzLWZpbHRlcnMtb2ZmLWNhbnZhc1wiKS5odG1sKHJlc3BvbnNlWydmaWx0ZXJzJ10pO1xuXHRcdFx0XHQkKFwiI2tyLXByb3BlcnRpZXMtc29ydGJ5LW9mZi1jYW52YXNcIikuaHRtbChyZXNwb25zZVsnc29ydGJ5J10pO1xuXHRcdFx0XHQkKFwiI2tyLXByb3BlcnRpZXMtc2VhcmNoLW9mZi1jYW52YXNcIikuaHRtbChyZXNwb25zZVsnc2VhcmNoJ10pO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAocmVzcG9uc2VbJ3NlYXJjaCddLmxlbmd0aCAmJiAkKCcjYXJyaXZhbGRzcCcpLmxlbmd0aCkge1xuXHRcdFx0XHQkKCdib2R5JykudHJpZ2dlcignaW5pdGFqYXhzZWFyY2gnKTtcblx0XHRcdH1cblxuXHRcdFx0JCgnLnNpZGViYXIgLmtyLWZpbHRlcnMgdWwuZmlsdGVyLXNvcnQtbGlzdCBsaS5oZWFkJykuZWFjaChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdGlmICgkKHRoaXMpLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xuXHRcdFx0XHRcdCQodGhpcykucGFyZW50KCkuY2hpbGRyZW4oJ2xpLmNoZWNrYm94Jykuc2hvdygpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdCQodGhpcykucGFyZW50KCkuY2hpbGRyZW4oJ2xpLmNoZWNrYm94JykuaGlkZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0aWYgKGZpZWxkID09PSAncGFnZScpIHtcblx0XHRcdFx0d2luZG93LnNjcm9sbFRvKDAsIDApO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIHNldEFjdGl2ZU1lbnUoaXRlbSkge1xuXHRcdGNvbnN0IGJhciA9ICQoJy5rci1zZWFyY2hiYXInKS5maW5kKCdsaScpO1xuXHRcdCQuZWFjaChiYXIsIGZ1bmN0aW9uIChpbmRleCwgYmFyKSB7XG5cdFx0XHQkKGJhcikucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuXHRcdH0pO1xuXG5cdFx0Y29uc3QgZWxlbWVudCA9ICcua3Itc2VhcmNoYmFyIGxpLicgKyBpdGVtO1xuXHRcdCQoZWxlbWVudCkuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuXHR9XG5cblx0Ly8gUmV0dXJuIHRydWUgaWYgd2lkdGggaGFzIGNoYW5nZWRcblx0ZnVuY3Rpb24gc2NyZWVuV2lkdGhIYXNDaGFuZ2VkKCkge1xuXHRcdGxhcmdlID0gRm91bmRhdGlvbi5NZWRpYVF1ZXJ5LmF0TGVhc3QoJ2xhcmdlJyk7XG5cdFx0aWYgKGxhcmdlICE9PSBzYXZlZHdpZHRoKSB7XG5cdFx0XHRzYXZlZHdpZHRoID0gbGFyZ2U7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9IGVsc2Vcblx0XHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdGZ1bmN0aW9uIGNoZWNrU2NyZWVuV2lkdGgoKSB7XG5cdFx0cmVzaXplZCA9IGZhbHNlO1xuXHRcdGlmIChzY3JlZW5XaWR0aEhhc0NoYW5nZWQoKSAmJiBzZWFyY2hkYXRhWydpdGVtcyddICYmICFyZXNpemVkKSB7XG5cdFx0XHRzZXRTZWFyY2hEYXRhKHNlYXJjaGRhdGEpO1xuXHRcdFx0cmVzaXplZCA9IHRydWU7XG5cdFx0fVxuXHR9XG5cblx0JC5ldmVudC5zcGVjaWFsLnRvdWNoc3RhcnQgPSB7XG5cdFx0c2V0dXA6IGZ1bmN0aW9uIChfLCBucywgaGFuZGxlKSB7XG5cdFx0XHRpZiAobnMuaW5jbHVkZXMoXCJub1ByZXZlbnREZWZhdWx0XCIpKSB7XG5cdFx0XHRcdHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgaGFuZGxlLCB7cGFzc2l2ZTogZmFsc2V9KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgaGFuZGxlLCB7cGFzc2l2ZTogdHJ1ZX0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblx0JC5ldmVudC5zcGVjaWFsLnRvdWNobW92ZSA9IHtcblx0XHRzZXR1cDogZnVuY3Rpb24gKF8sIG5zLCBoYW5kbGUpIHtcblx0XHRcdGlmIChucy5pbmNsdWRlcyhcIm5vUHJldmVudERlZmF1bHRcIikpIHtcblx0XHRcdFx0dGhpcy5hZGRFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsIGhhbmRsZSwge3Bhc3NpdmU6IGZhbHNlfSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIiwgaGFuZGxlLCB7cGFzc2l2ZTogdHJ1ZX0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcbn0oalF1ZXJ5KSk7IiwiLyoqXG4gKiBAcGFja2FnZSAgICBLbm93IFJlc2VydmF0aW9uc1xuICogQHN1YnBhY2thZ2UgU2l0ZSBKU1xuICogQGNvcHlyaWdodCAgMjAyMCBIaWdobGFuZCBWaXNpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBAbGljZW5zZSAgICBTZWUgdGhlIGZpbGUgXCJMSUNFTlNFLnR4dFwiIGZvciB0aGUgZnVsbCBsaWNlbnNlIGdvdmVybmluZyB0aGlzIGNvZGUuXG4gKiBAYXV0aG9yICAgICBIYXplbCBXaWxzb24gPGhhemVsQGhpZ2hsYW5kdmlzaW9uLmNvbT5cbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgkKSB7XG5cdGlmICghd2luZG93LmxvY2F0aW9uLm9yaWdpbilcblx0XHR3aW5kb3cubG9jYXRpb24ub3JpZ2luID0gd2luZG93LmxvY2F0aW9uLnByb3RvY29sICsgXCIvL1wiICsgd2luZG93LmxvY2F0aW9uLmhvc3Q7XG5cblx0bGV0IGxhbmcgPSAkKFwiI2tyLWxhbmdcIikuZGF0YSgna3JsYW5nJyk7XG5cdGxldCBteUNvbmZpcm0sICRteVRhc2s7XG5cblx0Y2xhc3MgS3Jjb25maXJtIHtcblx0XHRjb25zdHJ1Y3RvcigkZm9ybSkge1xuXHRcdFx0dGhpcy5mb3JtID0gJGZvcm07XG5cdFx0XHR0aGlzLmluaXQoKTtcblx0XHR9XG5cblx0XHRpbml0KCkge1xuXHRcdFx0dGhpcy51cGRhdGVRdW90ZSh0aGlzLmZvcm0pO1xuXHRcdH1cblxuXHRcdHVwZGF0ZVF1b3RlKCRmb3JtKSB7XG5cdFx0XHQkbXlUYXNrID0gJCgnI215dGFzaycpO1xuXHRcdFx0JG15VGFzay52YWwoJ2NvbmZpcm0uY29tcHV0ZScpO1xuXHRcdFx0alF1ZXJ5LmFqYXgoe1xuXHRcdFx0XHR0eXBlOiAgICAgJ1BPU1QnLFxuXHRcdFx0XHR1cmw6ICAgICAgJ2luZGV4LnBocD9vcHRpb249Y29tX2tub3dyZXMmdGFzaz1jb25maXJtLmNvbXB1dGUmbGFuZz0nICsgbGFuZyxcblx0XHRcdFx0ZGF0YTogICAgICRmb3JtLnNlcmlhbGl6ZUFycmF5KCksXG5cdFx0XHRcdGRhdGFUeXBlOiAnanNvbicsXG5cdFx0XHRcdHN1Y2Nlc3M6ICBmdW5jdGlvbiAocmVzdWx0KSB7XG5cdFx0XHRcdFx0JG15VGFzay52YWwoJ2NvbmZpcm0ucGF5bWVudCcpO1xuXHRcdFx0XHRcdGlmIChyZXN1bHQuc3VjY2Vzcykge1xuXHRcdFx0XHRcdFx0Y29uc3QgZGF0YSA9IHJlc3VsdC5kYXRhO1xuXHRcdFx0XHRcdFx0aWYgKGRhdGEuaGFzT3duUHJvcGVydHkoJ3JlZGlyZWN0JykpIHtcblx0XHRcdFx0XHRcdFx0d2luZG93LmxvY2F0aW9uLnJlcGxhY2UoZGF0YS5yZWRpcmVjdCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRsZXQgZGl2O1xuXHRcdFx0XHRcdFx0JC5lYWNoKHJlc3VsdC5kYXRhLnJlc3BvbnNlLCBmdW5jdGlvbiAoa2V5LCB2YWwpIHtcblx0XHRcdFx0XHRcdFx0JCgnLmhpZGVpbml0aWFsJykuc2hvdygpO1xuXHRcdFx0XHRcdFx0XHRkaXYgPSBcIiNcIiArIGtleTtcblx0XHRcdFx0XHRcdFx0JChkaXYpLnRleHQodmFsKTtcblx0XHRcdFx0XHRcdFx0JChkaXYpLmh0bWwodmFsKTtcblx0XHRcdFx0XHRcdFx0JChkaXYpLnZhbCh2YWwpO1xuXHRcdFx0XHRcdFx0XHQkKGRpdikuc2hvdygpO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdCQoJy5rci1hamF4LW1vZGFsLWVycm9yLW1lc3NhZ2UnKS5odG1sKHJlc3VsdC5tZXNzYWdlKTtcblx0XHRcdFx0XHRcdGNvbnN0ICRtb2RhbCA9IG5ldyBGb3VuZGF0aW9uLlJldmVhbCgkKCcjS3JBamF4TW9kYWxFcnJvcicpKTtcblx0XHRcdFx0XHRcdCRtb2RhbC5vcGVuKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXHQkKGZ1bmN0aW9uICgpIHtcblx0XHRsZXQgJGVsZW1lbnQgPSAkKCcja3ItZm9ybS1jb25maXJtJyk7XG5cdFx0aWYgKCRlbGVtZW50Lmxlbmd0aCkge1xuXHRcdFx0bXlDb25maXJtID0gbmV3IEtyY29uZmlybSgkZWxlbWVudCk7XG5cdFx0fVxuXHRcdCRlbGVtZW50Lm9uKCdjaGFuZ2UgY2xpY2snLCAnLmtyLWNhbGN1bGF0ZScsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHQkZWxlbWVudCA9ICQoJyNrci1mb3JtLWNvbmZpcm0nKTtcblx0XHRcdG15Q29uZmlybS51cGRhdGVRdW90ZSgkZWxlbWVudCk7XG5cdFx0fSk7XG5cblx0XHQkKGRvY3VtZW50KS5vbignY2xpY2snLCAnI2NoZWNrdGVybXMnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0aWYgKGNoZWNrVGVybXMoKSkge1xuXHRcdFx0XHQkKCcjY2hlY2t0ZXJtcycpLnRyaWdnZXIoJ3N1Ym1pdCcpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9KTtcblxuXHQvLyBub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcblx0ZnVuY3Rpb24gY2hlY2tUZXJtcygpIHtcblx0XHRsZXQgcmVzdWx0ID0gdHJ1ZTtcblx0XHRjb25zdCB0ZXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FncmVlY2hlY2snKTtcblx0XHRjb25zdCB0ZXN0YyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZ3JlZWNoZWNrYycpO1xuXHRcdGNvbnN0IHRlc3R0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FncmVlY2hlY2t0Jyk7XG5cblx0XHQvLyBub2luc3BlY3Rpb24gSlNVbnJlc29sdmVkVmFyaWFibGVcblx0XHRpZiAodGVzdCAmJiAhZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2tyLWZvcm0tcGF5bWVudCcpLmFncmVlY2hlY2suY2hlY2tlZCkge1xuXHRcdFx0cmVzdWx0ID0gZmFsc2U7XG5cdFx0fVxuXHRcdC8vIG5vaW5zcGVjdGlvbiBKU1VucmVzb2x2ZWRWYXJpYWJsZVxuXHRcdGlmICh0ZXN0YyAmJiAhZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2tyLWZvcm0tcGF5bWVudCcpLmFncmVlY2hlY2tjLmNoZWNrZWQpIHtcblx0XHRcdHJlc3VsdCA9IGZhbHNlO1xuXHRcdH1cblx0XHQvLyBub2luc3BlY3Rpb24gSlNVbnJlc29sdmVkVmFyaWFibGVcblx0XHRpZiAodGVzdHQgJiYgIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdrci1mb3JtLXBheW1lbnQnKS5hZ3JlZWNoZWNrdC5jaGVja2VkKSB7XG5cdFx0XHRyZXN1bHQgPSBmYWxzZTtcblx0XHR9XG5cblx0XHRpZiAocmVzdWx0KSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc3QgJG1vZGFsID0gbmV3IEZvdW5kYXRpb24uUmV2ZWFsKCQoJyNlcnJvck1vZGFsJykpO1xuXHRcdFx0JG1vZGFsLm9wZW4oKTtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdH1cbn0oalF1ZXJ5KSk7IiwiLyoqXG4gKiBAcGFja2FnZSAgICBLbm93IFJlc2VydmF0aW9uc1xuICogQHN1YnBhY2thZ2UgU2l0ZSBKU1xuICogQGNvcHlyaWdodCAgMjAyMCBIaWdobGFuZCBWaXNpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBAbGljZW5zZSAgICBTZWUgdGhlIGZpbGUgXCJMSUNFTlNFLnR4dFwiIGZvciB0aGUgZnVsbCBsaWNlbnNlIGdvdmVybmluZyB0aGlzIGNvZGUuXG4gKiBAYXV0aG9yICAgICBIYXplbCBXaWxzb24gPGhhemVsQGhpZ2hsYW5kdmlzaW9uLmNvbT5cbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxuaWYgKCF3aW5kb3cubG9jYXRpb24ub3JpZ2luKSB7XG5cdHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gPSB3aW5kb3cubG9jYXRpb24ucHJvdG9jb2wgKyBcIi8vXCIgKyB3aW5kb3cubG9jYXRpb24uaG9zdDtcbn1cblxuKGZ1bmN0aW9uICgkKSB7XG5cdGxldCBteUtyRG9iRW50cnk7XG5cdGxldCB0b2RheTtcblx0bGV0IGtleSA9IHtCQUNLU1BBQ0U6IDh9O1xuXG5cdGxldCBzZXR0aW5ncyA9IHtcblx0XHRjdXN0b21fdmFsaWRhdGlvbjogICAgIGZhbHNlLFxuXHRcdGRheXNfaW5fbW9udGg6ICAgICAgICAgWzMxLCAyOSwgMzEsIDMwLCAzMSwgMzAsIDMxLCAzMSwgMzAsIDMxLCAzMCwgMzFdLFxuXHRcdGRvY3VtZW50X2RhdGU6ICAgICAgICAgZmFsc2UsXG5cdFx0ZXJyb3Jib3hfeDogICAgICAgICAgICAxLFxuXHRcdGVycm9yYm94X3k6ICAgICAgICAgICAgNSxcblx0XHRmaWVsZF9oaW50X3RleHRfZGF5OiAgICdERCcsXG5cdFx0ZmllbGRfaGludF90ZXh0X21vbnRoOiAnTU0nLFxuXHRcdGZpZWxkX2hpbnRfdGV4dF95ZWFyOiAgJ1lZWVknLFxuXHRcdGZpZWxkX29yZGVyOiAgICAgICAgICAgJ0RNWScsXG5cdFx0ZmllbGRfd2lkdGhfZGF5OiAgICAgICA2LFxuXHRcdGZpZWxkX3dpZHRoX21vbnRoOiAgICAgNixcblx0XHRmaWVsZF93aWR0aF95ZWFyOiAgICAgIDcsXG5cdFx0ZmllbGRfd2lkdGhfc2VwOiAgICAgICAyLFxuXHRcdG1heF9kYXRlOiAgICAgICAgICAgICAgZmFsc2UsXG5cdFx0bWluX3llYXI6ICAgICAgICAgICAgICAxOTEwLFxuXHRcdG1vbnRoX25hbWU6ICAgICAgICAgICAgW1xuXHRcdFx0J0phbnVhcnknLCAnRmVicnVhcnknLCAnTWFyY2gnLCAnQXByaWwnLFxuXHRcdFx0J01heScsICdKdW5lJywgJ0p1bHknLCAnQXVndXN0JywgJ1NlcHRlbWJlcicsXG5cdFx0XHQnT2N0b2JlcicsICdOb3ZlbWJlcicsICdEZWNlbWJlciddLFxuXHRcdG9uX2JsdXI6ICAgICAgICAgICAgICAgZmFsc2UsXG5cdFx0b25fZXJyb3I6ICAgICAgICAgICAgICBmYWxzZSxcblx0XHRvbl9jaGFuZ2U6ICAgICAgICAgICAgIGZhbHNlLFxuXHRcdHBhcnNlX2RhdGU6ICAgICAgICAgICAgdHJ1ZSxcblx0XHRzZXBhcmF0b3I6ICAgICAgICAgICAgICcvJyxcblx0XHRzaG93X2Vycm9yczogICAgICAgICAgIHRydWUsXG5cdFx0c2hvd19oaW50czogICAgICAgICAgICB0cnVlLFxuXHRcdEVfREFZX05BTjogICAgICAgICAgICAgJ0RheSBtdXN0IGJlIGEgbnVtYmVyJyxcblx0XHRFX0RBWV9UT09fQklHOiAgICAgICAgICdEYXkgbXVzdCBiZSAxLTMxJyxcblx0XHRFX0RBWV9UT09fU01BTEw6ICAgICAgICdEYXkgbXVzdCBiZSAxLTMxJyxcblx0XHRFX0JBRF9EQVlfRk9SX01PTlRIOiAgICdPbmx5ICVkIGRheXMgaW4gJW0gJXknLFxuXHRcdEVfTU9OVEhfTkFOOiAgICAgICAgICAgJ01vbnRoIG11c3QgYmUgYSBudW1iZXInLFxuXHRcdEVfTU9OVEhfVE9PX0JJRzogICAgICAgJ01vbnRoIG11c3QgYmUgMS0xMicsXG5cdFx0RV9NT05USF9UT09fU01BTEw6ICAgICAnTW9udGggY2Fubm90IGJlIDAnLFxuXHRcdEVfWUVBUl9OQU46ICAgICAgICAgICAgJ1llYXIgbXVzdCBiZSBhIG51bWJlcicsXG5cdFx0RV9ZRUFSX0xFTkdUSDogICAgICAgICAnWWVhciBtdXN0IGJlIDQgZGlnaXRzJyxcblx0XHRFX1lFQVJfVE9PX1NNQUxMOiAgICAgICdZZWFyIG11c3Qgbm90IGJlIGJlZm9yZSAleScsXG5cdFx0RV9NSU5fREFURTogICAgICAgICAgICAnRGF0ZSBtdXN0IGJlIGFmdGVyICVEQVRFJyxcblx0XHRFX01BWF9EQVRFOiAgICAgICAgICAgICdEYXRlIG11c3Qgbm90IGJlIGluIHRoZSBmdXR1cmUnXG5cdH07XG5cblx0Y2xhc3MgS3JEb2JFbnRyeSB7XG5cdFx0Y29uc3RydWN0b3IoJGVsZW1lbnQsIG9wdGlvbnMpIHtcblx0XHRcdHRvZGF5ID0gS3JEb2JFbnRyeS5nZXRZbWQobmV3IERhdGUoKSk7XG5cblx0XHRcdHRoaXMuaW5wdXRfZGF5ID0gMDtcblx0XHRcdHRoaXMuaW5wdXRfbW9udGggPSAwO1xuXHRcdFx0dGhpcy5pbnB1dF95ZWFyID0gMDtcblx0XHRcdHRoaXMuJGVsZW1lbnQgPSAkZWxlbWVudDtcblx0XHRcdGlmIChvcHRpb25zKSB7XG5cdFx0XHRcdCQuZXh0ZW5kKHNldHRpbmdzLCBvcHRpb25zKTtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5pbml0KCk7XG5cdFx0fVxuXG5cdFx0c3RhdGljIGdldFltZChkYXRlKSB7XG5cdFx0XHRjb25zdCBtID0gZGF0ZS5nZXRNb250aCgpICsgMTtcblx0XHRcdGNvbnN0IGQgPSBkYXRlLmdldERheSgpO1xuXG5cdFx0XHRyZXR1cm4gKGRhdGUuZ2V0RnVsbFllYXIoKSArICctJyArIChtIDwgMTAgPyAnMCcgOiAnJykgKyBtICsgJy0nICsgKGQgPCAxMCA/ICcwJyA6ICcnKSArIGQpO1xuXHRcdH1cblxuXHRcdHN0YXRpYyBnZXRZbWRPYmplY3QoZGF0ZSkge1xuXHRcdFx0cmV0dXJuIChkYXRlLnllYXIgKyAnLScgKyBkYXRlLm1vbnRoICsgJy0nICsgZGF0ZS5kYXkpO1xuXHRcdH1cblxuXHRcdGFkZEVudHJ5RmllbGRzKCkge1xuXHRcdFx0bGV0IGRvYmZpZWxkID0gdGhpcztcblx0XHRcdGRvYmZpZWxkLmZpZWxkcyA9IFtdO1xuXHRcdFx0JC5lYWNoKHNldHRpbmdzLmZpZWxkX29yZGVyLnNwbGl0KCcnKSwgZnVuY3Rpb24gKGksIGZpZWxkKSB7XG5cdFx0XHRcdHN3aXRjaCAoZmllbGQpIHtcblx0XHRcdFx0XHRjYXNlICdEJzpcblx0XHRcdFx0XHRcdGRvYmZpZWxkLmJ1aWxkRmllbGQoJ2RheScsIGkpO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSAnTSc6XG5cdFx0XHRcdFx0XHRkb2JmaWVsZC5idWlsZEZpZWxkKCdtb250aCcsIGkpO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSAnWSc6XG5cdFx0XHRcdFx0XHRkb2JmaWVsZC5idWlsZEZpZWxkKCd5ZWFyJywgaSk7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRkZWZhdWx0IDpcblx0XHRcdFx0XHRcdHRocm93IFwiVW5leHBlY3RlZCBmaWVsZCBvcmRlciAnXCIgKyBmaWVsZCArIFwiJyBleHBlY3RlZCBELCBNIG9yIFlcIjtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0YWZ0ZXJQYXN0ZSh0YXJnZXQpIHtcblx0XHRcdGlmICh0aGlzLnBhcnNlRGF0ZSgkKHRhcmdldCkudmFsKCkpKSB7XG5cdFx0XHRcdHRoaXMuc2V0RGF0ZSgkKHRhcmdldCkudmFsKCkpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGJ1aWxkRmllbGQobmFtZSwgaW5kZXgpIHtcblx0XHRcdGxldCBrcmRvYmVudHJ5ID0gdGhpcztcblx0XHRcdGxldCBpbnB1dCA9IG5ldyBLckRvYklucHV0KHtcblx0XHRcdFx0bmFtZTogICAgICAgbmFtZSxcblx0XHRcdFx0a3Jkb2JlbnRyeToga3Jkb2JlbnRyeSxcblx0XHRcdFx0aW5kZXg6ICAgICAgaW5kZXgsXG5cdFx0XHRcdGhpbnRfdGV4dDogIHNldHRpbmdzLnNob3dfaGludHMgPyBzZXR0aW5nc1snZmllbGRfaGludF90ZXh0XycgKyBuYW1lXSA6IG51bGwsXG5cdFx0XHR9KTtcblxuXHRcdFx0dGhpcy5pbm5lci5hcHBlbmQoaW5wdXQuJGlucHV0KTtcblx0XHRcdHRoaXNbJ2lucHV0XycgKyBuYW1lXSA9IGlucHV0O1xuXG5cdFx0XHRpZiAoaW5kZXggPCAyKSB7XG5cdFx0XHRcdHRoaXMuaW5uZXIuYXBwZW5kKCQoJzxzcGFuIGNsYXNzPVwic2VwYXJhdG9yXCIgLz4nKS50ZXh0KHNldHRpbmdzLnNlcGFyYXRvcikpO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLmZpZWxkc1tpbmRleF0gPSBpbnB1dDtcblx0XHRcdHRoaXNbbmFtZV0gPSBpbnB1dDtcblx0XHR9XG5cblx0XHRidWlsZFVpKCkge1xuXHRcdFx0bGV0IGRvYmZpZWxkID0gdGhpcztcblx0XHRcdHRoaXMud3JhcHBlciA9ICQodGhpcy4kZWxlbWVudC53cmFwKCc8c3BhbiBjbGFzcz1cImpxLWR0ZVwiIC8+JykucGFyZW50KClbMF0pO1xuXHRcdFx0dGhpcy5pbm5lciA9ICQoJzxzcGFuIGNsYXNzPVwianEtZHRlLWlubmVyXCIgLz4nKTtcblx0XHRcdHRoaXMuYWRkRW50cnlGaWVsZHMoKTtcblx0XHRcdHRoaXMuZXJyb3Jib3ggPSAkKCc8c3BhbiBjbGFzcz1cImpxLWR0ZS1lcnJvcmJveFwiIC8+JykuaGlkZSgpO1xuXHRcdFx0dGhpcy5pbm5lci5vbigncGFzdGUnLCAnaW5wdXQnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRsZXQgaW5wdXQgPSB0aGlzO1xuXHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRkb2JmaWVsZC5hZnRlclBhc3RlKGlucHV0LCBlKTtcblx0XHRcdFx0fSwgMik7XG5cdFx0XHR9KTtcblx0XHRcdHRoaXMud3JhcHBlci5hcHBlbmQodGhpcy5pbm5lciwgdGhpcy5lcnJvcmJveCk7XG5cdFx0XHR0aGlzLnNldEZpZWxkV2lkdGhzKCk7XG5cdFx0XHR0aGlzLiRlbGVtZW50LmhpZGUoKTtcblx0XHR9XG5cblx0XHRjaGVja0RvY3VtZW50KGRvYiwgY2hpbGRkb2IsIGNsYXNzbmFtZSkge1xuXHRcdFx0bGV0IGVsZW1lbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShjbGFzc25hbWUpO1xuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRpZiAobmV3IERhdGUoZG9iKSA+IG5ldyBEYXRlKGNoaWxkZG9iKSkge1xuXHRcdFx0XHRcdGVsZW1lbnRzW2ldLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0ZWxlbWVudHNbaV0uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRjbGVhcigpIHtcblx0XHRcdHRoaXMuY2xlYXJFcnJvcignJyk7XG5cdFx0XHR0aGlzLnNldERhdGUoJycpO1xuXHRcdH1cblxuXHRcdGNsZWFyRXJyb3IoKSB7XG5cdFx0XHRkZWxldGUgdGhpcy5lcnJvcl90ZXh0O1xuXHRcdFx0dGhpcy5zaG93RXJyb3IoKTtcblx0XHR9XG5cblx0XHRkZXN0cm95KCkge1xuXHRcdFx0dGhpcy4kZWxlbWVudC5zaG93KCk7XG5cdFx0XHR0aGlzLiRlbGVtZW50LmNzcygnZGlzcGxheScsICcnKTtcblx0XHRcdHRoaXMud3JhcHBlci5maW5kKCdzcGFuJykucmVtb3ZlKCk7XG5cdFx0XHR0aGlzLiRlbGVtZW50LnVud3JhcCgpO1xuXHRcdFx0dGhpcy4kZWxlbWVudC5yZW1vdmVEYXRhKCdkYXRldGV4dGVudHJ5Jyk7XG5cdFx0XHRkZWxldGUgdGhpcy5pbm5lcjtcblx0XHRcdGRlbGV0ZSB0aGlzLndyYXBwZXI7XG5cdFx0XHRkZWxldGUgdGhpcy4kZWxlbWVudDtcblx0XHR9XG5cblx0XHRmb2N1cygpIHtcblx0XHRcdHRoaXMuZmllbGRzWzBdLnNldEZvY3VzKHRydWUpO1xuXHRcdH1cblxuXHRcdGZvY3VzRmllbGRCZWZvcmUoaW5wdXQpIHtcblx0XHRcdGNvbnN0IGluZGV4ID0gaW5wdXQuaW5kZXg7XG5cdFx0XHRpZiAoaW5kZXggPCAxKSB7XG5cdFx0XHRcdHJldHVyblxuXHRcdFx0fVxuXHRcdFx0dGhpcy5maWVsZHNbaW5kZXhdLnlpZWxkRm9jdXMoKTtcblx0XHRcdHRoaXMuZmllbGRzW2luZGV4IC0gMV0uc2V0Rm9jdXModHJ1ZSk7XG5cdFx0XHQvLyBsZXQgbmV4dCA9IHRoaXMuZmllbGRzW2luZGV4IC0gMV07XG5cdFx0XHQvLyBsZXQgdmFsID0gbmV4dC5nZXQoKTtcblx0XHRcdC8vIG5leHQuc2V0Rm9jdXMoZmFsc2UpO1xuXHRcdH1cblxuXHRcdGZvY3VzRmllbGRBZnRlcihpbnB1dCkge1xuXHRcdFx0Y29uc3QgaW5kZXggPSBpbnB1dC5pbmRleDtcblx0XHRcdGlmIChpbmRleCA+IDEpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5maWVsZHNbaW5kZXhdLnlpZWxkRm9jdXMoKTtcblx0XHRcdHRoaXMuZmllbGRzW2luZGV4ICsgMV0uc2V0Rm9jdXModHJ1ZSk7XG5cdFx0fVxuXG5cdFx0Zm9jdXNJbigpIHtcblx0XHRcdHRoaXMud3JhcHBlci5hZGRDbGFzcygnZm9jdXMnKTtcblx0XHR9XG5cblx0XHRmb2N1c091dCgpIHtcblx0XHRcdGlmIChzZXR0aW5ncy5vbl9ibHVyKSB7XG5cdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdHNlbGYud2lkZ2V0Rm9jdXNMb3N0KCk7XG5cdFx0XHRcdH0sIDIpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy53cmFwcGVyLnJlbW92ZUNsYXNzKCdmb2N1cycpO1xuXHRcdH1cblxuXHRcdGdldERhdGUoKSB7XG5cdFx0XHRyZXR1cm4gKHRoaXMuZGF5X3ZhbHVlICYmIHRoaXMubW9udGhfdmFsdWUgJiYgdGhpcy55ZWFyX3ZhbHVlKVxuXHRcdFx0ICAgICAgID8ge2RheTogdGhpcy5kYXlfdmFsdWUsIG1vbnRoOiB0aGlzLm1vbnRoX3ZhbHVlLCB5ZWFyOiB0aGlzLnllYXJfdmFsdWV9XG5cdFx0XHQgICAgICAgOiBudWxsO1xuXHRcdH1cblxuXHRcdGluaXQoKSB7XG5cdFx0XHRpZiAoIXNldHRpbmdzLm1heF9kYXRlKVxuXHRcdFx0XHRzZXR0aW5ncy5tYXhfZGF0ZSA9IHRvZGF5O1xuXHRcdFx0aWYgKCFzZXR0aW5ncy5taW5feWVhcilcblx0XHRcdFx0c2V0dGluZ3MubWluX3llYXIgPSAnMTkxMCc7XG5cblx0XHRcdHRoaXMuYnVpbGRVaSgpO1xuXHRcdFx0dGhpcy5zZXREYXRlKHRoaXMuJGVsZW1lbnQuYXR0cigndmFsdWUnKSk7XG5cdFx0XHR0aGlzLnByb3h5TGFiZWxDbGlja3MoKTtcblx0XHR9XG5cblx0XHRwYXJzZURhdGUodGV4dCkge1xuXHRcdFx0cmV0dXJuIHRoaXMucGFyc2VJc29EYXRlKHRleHQpO1xuXHRcdH1cblxuXHRcdHBhcnNlSXNvRGF0ZSh0ZXh0KSB7XG5cdFx0XHRyZXR1cm4gdGV4dCAmJiB0ZXh0Lm1hdGNoKC9eKFxcZFxcZFxcZFxcZCktKFxcZFxcZCktKFxcZFxcZCkvKSA/IHtcblx0XHRcdFx0ZGF5OiAgIFJlZ0V4cC4kMyxcblx0XHRcdFx0bW9udGg6IFJlZ0V4cC4kMixcblx0XHRcdFx0eWVhcjogIFJlZ0V4cC4kMVxuXHRcdFx0fSA6IG51bGw7XG5cdFx0fVxuXG5cdFx0cHJveHlMYWJlbENsaWNrcygpIHtcblx0XHRcdGxldCBkb2JmaWVsZCA9IHRoaXM7XG5cdFx0XHRsZXQgaWQgPSB0aGlzLiRlbGVtZW50LmF0dHIoJ2lkJyk7XG5cdFx0XHRpZiAoIWlkKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdCQoJ2xhYmVsW2Zvcj0nICsgaWQgKyAnXScpLmNsaWNrKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0ZG9iZmllbGQuZm9jdXMoKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdHNldERhdGUobmV3X2RhdGUpIHtcblx0XHRcdGxldCBkb2JmaWVsZCA9IHRoaXM7XG5cdFx0XHRuZXdfZGF0ZSA9IHRoaXMucGFyc2VEYXRlKG5ld19kYXRlKTtcblx0XHRcdGRlbGV0ZSB0aGlzLmRheV92YWx1ZTtcblx0XHRcdGRlbGV0ZSB0aGlzLm1vbnRoX3ZhbHVlO1xuXHRcdFx0ZGVsZXRlIHRoaXMueWVhcl92YWx1ZTtcblx0XHRcdHRoaXMuaW5wdXRfZGF5LnNldChuZXdfZGF0ZSA/IG5ld19kYXRlLmRheSA6ICcnKTtcblx0XHRcdHRoaXMuaW5wdXRfbW9udGguc2V0KG5ld19kYXRlID8gbmV3X2RhdGUubW9udGggOiAnJyk7XG5cdFx0XHR0aGlzLmlucHV0X3llYXIuc2V0KG5ld19kYXRlID8gbmV3X2RhdGUueWVhciA6ICcnKTtcblx0XHRcdHRoaXMuY2xlYXJFcnJvcigpO1xuXHRcdFx0dGhpcy4kZWxlbWVudC52YWwobmV3X2RhdGUpO1xuXHRcdFx0aWYgKG5ld19kYXRlKSB7XG5cdFx0XHRcdCQuZWFjaCh0aGlzLmZpZWxkcywgZnVuY3Rpb24gKGksIGlucHV0KSB7XG5cdFx0XHRcdFx0ZG9iZmllbGQudmFsaWRhdGUoaW5wdXQpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRzZXRFcnJvcihlcnJvcl90ZXh0KSB7XG5cdFx0XHR0aGlzLmVycm9yX3RleHQgPSBlcnJvcl90ZXh0O1xuXHRcdFx0dGhpcy5zaG93RXJyb3IoKTtcblx0XHR9XG5cblx0XHRzZXRGaWVsZFdpZHRocygpIHtcblx0XHRcdGxldCBhdmFpbGFibGUgPSB0aGlzLiRlbGVtZW50LndpZHRoKCkgLSAyO1xuXHRcdFx0bGV0IHRvdGFsID0gc2V0dGluZ3MuZmllbGRfd2lkdGhfeWVhciArIHNldHRpbmdzLmZpZWxkX3dpZHRoX3NlcCArIHNldHRpbmdzLmZpZWxkX3dpZHRoX21vbnRoICtcblx0XHRcdFx0c2V0dGluZ3MuZmllbGRfd2lkdGhfc2VwICsgc2V0dGluZ3MuZmllbGRfd2lkdGhfZGF5O1xuXHRcdFx0dGhpcy5pbnB1dF9kYXkuc2V0V2lkdGgoTWF0aC5mbG9vcihzZXR0aW5ncy5maWVsZF93aWR0aF9kYXkgKiBhdmFpbGFibGUgLyB0b3RhbCkpO1xuXHRcdFx0dGhpcy5pbnB1dF9tb250aC5zZXRXaWR0aChNYXRoLmZsb29yKHNldHRpbmdzLmZpZWxkX3dpZHRoX21vbnRoICogYXZhaWxhYmxlIC8gdG90YWwpKTtcblx0XHRcdHRoaXMuaW5wdXRfeWVhci5zZXRXaWR0aChNYXRoLmZsb29yKHNldHRpbmdzLmZpZWxkX3dpZHRoX3llYXIgKiBhdmFpbGFibGUgLyB0b3RhbCkpO1xuXHRcdH1cblxuXHRcdHNldFJlYWRvbmx5KG1vZGUpIHtcblx0XHRcdGlmIChtb2RlID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0bW9kZSA9IHRydWU7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLmlucHV0X2RheS5zZXRSZWFkb25seShtb2RlKTtcblx0XHRcdHRoaXMuaW5wdXRfbW9udGguc2V0UmVhZG9ubHkobW9kZSk7XG5cdFx0XHR0aGlzLmlucHV0X3llYXIuc2V0UmVhZG9ubHkobW9kZSk7XG5cdFx0XHRpZiAobW9kZSkge1xuXHRcdFx0XHR0aGlzLndyYXBwZXIuYWRkQ2xhc3MoJ3JlYWRvbmx5Jyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLndyYXBwZXIucmVtb3ZlQ2xhc3MoJ3JlYWRvbmx5Jyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0c2hvd0Vycm9yKCkge1xuXHRcdFx0bGV0IGVycm9yX3RleHQgPSB0aGlzLndpZGdldEVycm9yVGV4dCgpO1xuXHRcdFx0aWYgKHRoaXMub25fZXJyb3IpIHtcblx0XHRcdFx0dGhpcy5vbl9lcnJvcihlcnJvcl90ZXh0KTtcblx0XHRcdH1cblx0XHRcdGlmICghc2V0dGluZ3Muc2hvd19lcnJvcnMpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGVycm9yX3RleHQgPT09ICcnKSB7XG5cdFx0XHRcdHRoaXMuZXJyb3Jib3guaGlkZSgpO1xuXHRcdFx0XHR0aGlzLmVycm9yYm94LnRleHQoJycpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bGV0IHhfb2Zmc2V0ID0gKHRoaXMuaW5uZXIub3V0ZXJXaWR0aCgpICsgc2V0dGluZ3MuZXJyb3Jib3hfeCkgKyAncHgnO1xuXHRcdFx0XHRsZXQgeV9vZmZzZXQgPSBzZXR0aW5ncy5lcnJvcmJveF95ICsgJ3B4Jztcblx0XHRcdFx0dGhpcy5lcnJvcmJveC5jc3Moe2Rpc3BsYXk6ICdibG9jaycsIHBvc2l0aW9uOiAnYWJzb2x1dGUnLCB0b3A6IHlfb2Zmc2V0LCBsZWZ0OiB4X29mZnNldH0pO1xuXHRcdFx0XHR0aGlzLmVycm9yYm94LnRleHQoZXJyb3JfdGV4dCk7XG5cdFx0XHRcdHRoaXMuZXJyb3Jib3guc2hvdygpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHZhbGlkYXRlKGN1cnJlbnRfaW5wdXQpIHtcblx0XHRcdHRoaXMuJGVsZW1lbnQudmFsKCcnKTtcblx0XHRcdGlmIChjdXJyZW50X2lucHV0KSB7XG5cdFx0XHRcdGNvbnN0IHR5cGUgPSBjdXJyZW50X2lucHV0Lm5hbWU7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0aWYgKHR5cGUgPT09ICdkYXknKSB7XG5cdFx0XHRcdFx0XHR0aGlzLnZhbGlkYXRlRGF5KCk7XG5cdFx0XHRcdFx0fSBlbHNlIGlmICh0eXBlID09PSAnbW9udGgnKSB7XG5cdFx0XHRcdFx0XHR0aGlzLnZhbGlkYXRlTW9udGgoKTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHR5cGUgPT09ICd5ZWFyJykge1xuXHRcdFx0XHRcdFx0dGhpcy52YWxpZGF0ZVllYXIoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Y3VycmVudF9pbnB1dC5jbGVhckVycm9yKCk7XG5cdFx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0XHRjdXJyZW50X2lucHV0LnNldEVycm9yKGUpO1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKHRoaXMuZGF5X3ZhbHVlICYmIHRoaXMubW9udGhfdmFsdWUpIHtcblx0XHRcdFx0dGhpcy5jbGVhckVycm9yKCk7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0dGhpcy52YWxpZGF0ZURheXNJbk1vbnRoKCk7XG5cdFx0XHRcdFx0aWYgKHRoaXMueWVhcl92YWx1ZSAmJiB0aGlzLnllYXJfdmFsdWUubGVuZ3RoID09PSA0KSB7XG5cdFx0XHRcdFx0XHR0aGlzLnZhbGlkYXRlQ29tcGxldGVEYXRlKCk7XG5cdFx0XHRcdFx0XHRsZXQgZGF0ZV9zdHIgPSBLckRvYkVudHJ5LmdldFltZE9iamVjdCh0aGlzLmdldERhdGUoKSk7XG5cdFx0XHRcdFx0XHR0aGlzLiRlbGVtZW50LnZhbChkYXRlX3N0cik7XG5cdFx0XHRcdFx0XHRpZiAodGhpcy4kZWxlbWVudC5kYXRhKCdjaGlsZGRvYicpKSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMuY2hlY2tEb2N1bWVudChkYXRlX3N0ciwgdGhpcy4kZWxlbWVudC5kYXRhKCdjaGlsZGRvYicpLCB0aGlzLiRlbGVtZW50LmF0dHIoJ2lkJykpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRcdHRoaXMuc2V0RXJyb3IoZSk7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLmNsZWFyRXJyb3IoKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0dmFsaWRhdGVDb21wbGV0ZURhdGUoKSB7XG5cdFx0XHRjb25zdCBkYXRlX29iaiA9IHRoaXMuZ2V0RGF0ZSgpO1xuXHRcdFx0Y29uc3QgZGF0ZV9pc28gPSBLckRvYkVudHJ5LmdldFltZE9iamVjdChkYXRlX29iaik7XG5cblx0XHRcdGxldCBtYXhfZGF0ZSA9IHNldHRpbmdzLm1heF9kYXRlO1xuXHRcdFx0aWYgKHR5cGVvZiBtYXhfZGF0ZSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHRtYXhfZGF0ZSA9IG1heF9kYXRlLmNhbGwodGhpcyk7XG5cdFx0XHR9XG5cdFx0XHRpZiAodHlwZW9mIG1heF9kYXRlID09PSAnc3RyaW5nJykge1xuXHRcdFx0XHRtYXhfZGF0ZSA9IHRoaXMucGFyc2VEYXRlKG1heF9kYXRlKTtcblx0XHRcdH1cblx0XHRcdGlmIChtYXhfZGF0ZSkge1xuXHRcdFx0XHRpZiAoZGF0ZV9pc28gPiBzZXR0aW5ncy5tYXhfZGF0ZSkge1xuXHRcdFx0XHRcdHRocm93KHNldHRpbmdzLkVfTUFYX0RBVEUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmICh0aGlzLmN1c3RvbV92YWxpZGF0aW9uKSB7XG5cdFx0XHRcdGRhdGVfb2JqLmRhdGUgPSBuZXcgRGF0ZShcblx0XHRcdFx0XHRwYXJzZUludChkYXRlX29iai55ZWFyLCAxMCksXG5cdFx0XHRcdFx0cGFyc2VJbnQoZGF0ZV9vYmoubW9udGgsIDEwKSAtIDEsXG5cdFx0XHRcdFx0cGFyc2VJbnQoZGF0ZV9vYmouZGF5LCAxMClcblx0XHRcdFx0KTtcblx0XHRcdFx0dGhpcy5jdXN0b21fdmFsaWRhdGlvbihkYXRlX29iaik7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dmFsaWRhdGVEYXkoKSB7XG5cdFx0XHRsZXQgb3B0ID0gc2V0dGluZ3M7XG5cdFx0XHRsZXQgaW5wdXQgPSB0aGlzLmlucHV0X2RheTtcblx0XHRcdHRoaXMuZGF5X3ZhbHVlID0gdW5kZWZpbmVkO1xuXHRcdFx0bGV0IHRleHQgPSBpbnB1dC5nZXQoKTtcblx0XHRcdGlmICh0ZXh0ID09PSAnJyB8fCAodGV4dCA9PT0gJzAnICYmIGlucHV0Lmhhc19mb2N1cykpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHRleHQubWF0Y2goL1xcRC8pKSB7XG5cdFx0XHRcdHRocm93KG9wdC5FX0RBWV9OQU4pO1xuXHRcdFx0fVxuXHRcdFx0bGV0IG51bSA9IHBhcnNlSW50KHRleHQsIDEwKTtcblx0XHRcdGlmIChudW0gPCAxKSB7XG5cdFx0XHRcdHRocm93KG9wdC5FX0RBWV9UT09fU01BTEwpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKG51bSA+IDMxKSB7XG5cdFx0XHRcdHRocm93KG9wdC5FX0RBWV9UT09fQklHKTtcblx0XHRcdH1cblx0XHRcdHRleHQgPSBudW0gPCAxMCA/ICcwJyArIG51bSA6ICcnICsgbnVtO1xuXHRcdFx0aWYgKCFpbnB1dC5oYXNfZm9jdXMpIHtcblx0XHRcdFx0aW5wdXQuc2V0KHRleHQpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5kYXlfdmFsdWUgPSB0ZXh0O1xuXHRcdH1cblxuXHRcdHZhbGlkYXRlRGF5c0luTW9udGgoKSB7XG5cdFx0XHRjb25zdCBkYXkgPSBwYXJzZUludCh0aGlzLmRheV92YWx1ZSwgMTApO1xuXHRcdFx0Y29uc3QgbW9udGggPSBwYXJzZUludCh0aGlzLm1vbnRoX3ZhbHVlLCAxMCk7XG5cdFx0XHRjb25zdCB5ZWFyID0gcGFyc2VJbnQodGhpcy55ZWFyX3ZhbHVlLCAxMCk7XG5cdFx0XHRpZiAoZGF5IDwgMSB8fCBtb250aCA8IDEpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0bGV0IG1heCA9IHNldHRpbmdzLmRheXNfaW5fbW9udGhbbW9udGggLSAxXTtcblx0XHRcdGxldCBtc2cgPSBzZXR0aW5ncy5FX0JBRF9EQVlfRk9SX01PTlRIO1xuXHRcdFx0aWYgKG1vbnRoID09PSAyICYmICgnJyArIHllYXIpLmxlbmd0aCA9PT0gNCkge1xuXHRcdFx0XHRtYXggPSB5ZWFyICUgNCA/IDI4IDogeWVhciAlIDEwMCA/IDI5IDogeWVhciAlIDQwMCA/IDI4IDogMjk7XG5cdFx0XHRcdG1zZyA9IG1zZy5yZXBsYWNlKC8leS8sIHllYXIudG9TdHJpbmcoKSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRtc2cgPSBtc2cucmVwbGFjZSgvIColeS8sICcnKTtcblx0XHRcdH1cblx0XHRcdGlmIChkYXkgPiBtYXgpIHtcblx0XHRcdFx0dGhyb3cobXNnLnJlcGxhY2UoLyVkLywgbWF4LnRvU3RyaW5nKCkpLnJlcGxhY2UoLyVtLywgc2V0dGluZ3MubW9udGhfbmFtZVttb250aCAtIDFdKSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dmFsaWRhdGVNb250aCgpIHtcblx0XHRcdGxldCBpbnB1dCA9IHRoaXMuaW5wdXRfbW9udGg7XG5cdFx0XHR0aGlzLm1vbnRoX3ZhbHVlID0gdW5kZWZpbmVkO1xuXHRcdFx0bGV0IHRleHQgPSBpbnB1dC5nZXQoKTtcblx0XHRcdGlmICh0ZXh0ID09PSAnJyB8fCAodGV4dCA9PT0gJzAnICYmIGlucHV0Lmhhc19mb2N1cykpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHRleHQubWF0Y2goL1xcRC8pKSB7XG5cdFx0XHRcdHRocm93KHNldHRpbmdzLkVfTU9OVEhfTkFOKTtcblx0XHRcdH1cblx0XHRcdGxldCBudW0gPSBwYXJzZUludCh0ZXh0LCAxMCk7XG5cdFx0XHRpZiAobnVtIDwgMSkge1xuXHRcdFx0XHR0aHJvdyhzZXR0aW5ncy5FX01PTlRIX1RPT19TTUFMTCk7XG5cdFx0XHR9XG5cdFx0XHRpZiAobnVtID4gMTIpIHtcblx0XHRcdFx0dGhyb3coc2V0dGluZ3MuRV9NT05USF9UT09fQklHKTtcblx0XHRcdH1cblx0XHRcdHRleHQgPSBudW0gPCAxMCA/ICcwJyArIG51bSA6ICcnICsgbnVtO1xuXHRcdFx0aWYgKCFpbnB1dC5oYXNfZm9jdXMpIHtcblx0XHRcdFx0aW5wdXQuc2V0KHRleHQpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5tb250aF92YWx1ZSA9IHRleHQ7XG5cdFx0fVxuXG5cdFx0dmFsaWRhdGVZZWFyKCkge1xuXHRcdFx0Y29uc3QgaW5wdXQgPSB0aGlzLmlucHV0X3llYXI7XG5cdFx0XHR0aGlzLnllYXJfdmFsdWUgPSB1bmRlZmluZWQ7XG5cdFx0XHRsZXQgdGV4dCA9IGlucHV0LmdldCgpO1xuXHRcdFx0aWYgKHRleHQgPT09ICcnIHx8ICh0ZXh0ID09PSAnMCcgJiYgaW5wdXQuaGFzX2ZvY3VzKSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRpZiAodGV4dC5tYXRjaCgvXFxELykpIHtcblx0XHRcdFx0dGhyb3coc2V0dGluZ3MuRV9ZRUFSX05BTik7XG5cdFx0XHR9XG5cdFx0XHRpZiAoaW5wdXQuaGFzX2ZvY3VzKSB7XG5cdFx0XHRcdGlmICh0ZXh0Lmxlbmd0aCA+IDQpIHtcblx0XHRcdFx0XHR0aHJvdyhzZXR0aW5ncy5FX1lFQVJfTEVOR1RIKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKHRleHQubGVuZ3RoICE9PSA0KSB7XG5cdFx0XHRcdFx0dGhyb3coc2V0dGluZ3MuRV9ZRUFSX0xFTkdUSCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmICh0ZXh0Lmxlbmd0aCA9PT0gNCkge1xuXHRcdFx0XHRjb25zdCBudW0gPSBwYXJzZUludCh0ZXh0LCAxMCk7XG5cdFx0XHRcdGlmIChzZXR0aW5ncy5taW5feWVhciAmJiBudW0gPCBzZXR0aW5ncy5taW5feWVhcikge1xuXHRcdFx0XHRcdHRocm93KHNldHRpbmdzLkVfWUVBUl9UT09fU01BTEwucmVwbGFjZSgvJXkvLCBzZXR0aW5ncy5taW5feWVhcikpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHR0aGlzLnllYXJfdmFsdWUgPSB0ZXh0O1xuXHRcdH1cblxuXHRcdHdpZGdldEVycm9yVGV4dCgpIHtcblx0XHRcdGxldCBlcnJvcl90ZXh0ID0gJyc7XG5cdFx0XHQkLmVhY2godGhpcy5maWVsZHMsIGZ1bmN0aW9uIChpLCBpbnB1dCkge1xuXHRcdFx0XHRpZiAoaW5wdXQuZXJyb3JfdGV4dCkge1xuXHRcdFx0XHRcdGlmIChpbnB1dC5oYXNfZm9jdXMgfHwgZXJyb3JfdGV4dCA9PT0gJycpIHtcblx0XHRcdFx0XHRcdGVycm9yX3RleHQgPSBpbnB1dC5lcnJvcl90ZXh0XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdGlmIChlcnJvcl90ZXh0ID09PSAnJyAmJiB0aGlzLmVycm9yX3RleHQpIHtcblx0XHRcdFx0ZXJyb3JfdGV4dCA9IHRoaXMuZXJyb3JfdGV4dDtcblx0XHRcdH1cblx0XHRcdHJldHVybiBlcnJvcl90ZXh0O1xuXHRcdH1cblxuXHRcdHdpZGdldEZvY3VzTG9zdCgpIHtcblx0XHRcdGlmIChzZXR0aW5ncy5vbl9ibHVyICYmICF0aGlzLndyYXBwZXIuaXMoJy5mb2N1cycpKSB7XG5cdFx0XHRcdHNldHRpbmdzLm9uQmx1cigpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGNsYXNzIEtyRG9iSW5wdXQge1xuXHRcdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcblx0XHRcdGNvbnN0IGlucHV0ID0gdGhpcztcblx0XHRcdHRoaXMuZG9iZmllbGQgPSBvcHRpb25zLmtyZG9iZW50cnk7XG5cdFx0XHR0aGlzLm5hbWUgPSBvcHRpb25zLm5hbWU7XG5cdFx0XHR0aGlzLmluZGV4ID0gb3B0aW9ucy5pbmRleDtcblx0XHRcdHRoaXMuaGludF90ZXh0ID0gb3B0aW9ucy5oaW50X3RleHQ7XG5cdFx0XHR0aGlzLmhhc19mb2N1cyA9IGZhbHNlO1xuXHRcdFx0dGhpcy5lbXB0eSA9IHRydWU7XG5cdFx0XHR0aGlzLiRpbnB1dCA9ICQoJzxpbnB1dCB0eXBlPVwidGV4dFwiIHZhbHVlPVwiXCIgLz4nKS5hZGRDbGFzcygnanEtZHRlLScgKyB0aGlzLm5hbWUpLmF0dHIoJ2FyaWEtbGFiZWwnLCAnJyArIFwiIChcIiArIHRoaXMuaGludF90ZXh0ICsgXCIpXCIpLmZvY3VzKCQucHJveHkoaW5wdXQsICdmb2N1cycpKS5ibHVyKCQucHJveHkoaW5wdXQsICdibHVyJykpLmtleWRvd24oZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0aW5wdXQua2V5ZG93bihlKTtcblx0XHRcdFx0fSwgMilcblx0XHRcdH0pLmtleXVwKGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdGlucHV0LmtleXVwKGUpO1xuXHRcdFx0XHR9LCAyKVxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0Ymx1cigpIHtcblx0XHRcdHRoaXMuaGFzX2ZvY3VzID0gZmFsc2U7XG5cdFx0XHR0aGlzLmRvYmZpZWxkLmZvY3VzT3V0KCk7XG5cdFx0XHR0aGlzLnNob3dfaGludCgpO1xuXHRcdFx0dGhpcy5kb2JmaWVsZC52YWxpZGF0ZSh0aGlzKTtcblx0XHR9XG5cblx0XHRjbGVhckVycm9yKCkge1xuXHRcdFx0ZGVsZXRlIHRoaXMuZXJyb3JfdGV4dDtcblx0XHRcdHRoaXMuJGlucHV0LnJlbW92ZUNsYXNzKCdlcnJvcicpO1xuXHRcdH1cblxuXHRcdGZvY3VzKCkge1xuXHRcdFx0dGhpcy5rZXlfaXNfZG93biA9IGZhbHNlO1xuXHRcdFx0aWYgKHRoaXMuJGlucHV0LnByb3AoJ3JlYWRvbmx5JykpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5oYXNfZm9jdXMgPSB0cnVlO1xuXHRcdFx0dGhpcy5kb2JmaWVsZC5mb2N1c0luKCk7XG5cdFx0XHRpZiAodGhpcy4kaW5wdXQuaGFzQ2xhc3MoJ2hpbnQnKSkge1xuXHRcdFx0XHR0aGlzLiRpbnB1dC52YWwoJycpLnJlbW92ZUNsYXNzKCdoaW50Jyk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLmRvYmZpZWxkLnNob3dFcnJvcigpO1xuXHRcdH1cblxuXHRcdGdldCgpIHtcblx0XHRcdGxldCB2YWwgPSB0aGlzLiRpbnB1dC52YWwoKTtcblx0XHRcdHJldHVybiB2YWwgPT09IHRoaXMuaGludF90ZXh0ID8gJycgOiB2YWw7XG5cdFx0fVxuXG5cdFx0aXNEaWdpdEtleShlKSB7XG5cdFx0XHRsZXQga2V5Y29kZSA9IGUud2hpY2g7XG5cdFx0XHRyZXR1cm4ga2V5Y29kZSA+PSA0OCAmJiBrZXljb2RlIDw9IDU3IHx8IGtleWNvZGUgPj0gOTYgJiYga2V5Y29kZSA8PSAxMDU7XG5cdFx0fVxuXG5cdFx0a2V5ZG93bigpIHtcblx0XHRcdC8vIElnbm9yZSBrZXl1cCBldmVudHMgdGhhdCBhcnJpdmUgYWZ0ZXIgZm9jdXMgbW92ZWQgdG8gbmV4dCBmaWVsZFxuXHRcdFx0dGhpcy5rZXlfaXNfZG93biA9IHRydWU7XG5cdFx0fVxuXG5cdFx0a2V5dXAoZSkge1xuXHRcdFx0aWYgKCF0aGlzLmtleV9pc19kb3duKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdC8vIEhhbmRsZSBCYWNrc3BhY2UgLSBzaGlmdGluZyBmb2N1cyB0byBwcmV2aW91cyBmaWVsZCBpZiByZXF1aXJlZFxuXHRcdFx0bGV0IGtleWNvZGUgPSBlLndoaWNoO1xuXHRcdFx0aWYgKGtleWNvZGUgPT09IGtleS5CQUNLU1BBQ0UgJiYgdGhpcy5lbXB0eSkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5kb2JmaWVsZC5mb2N1c0ZpZWxkQmVmb3JlKHRoaXMpO1xuXHRcdFx0fVxuXHRcdFx0bGV0IHRleHQgPSB0aGlzLmdldCgpO1xuXHRcdFx0dGhpcy5lbXB0eSA9IHRleHQgPT09ICcnO1xuXG5cdFx0XHQvLyBUcmFwIGFuZCBkaXNjYXJkIHNlcGFyYXRvciBjaGFyYWN0ZXJzIC0gYWR2YW5jaW5nIGZvY3VzIGlmIHJlcXVpcmVkXG5cdFx0XHRpZiAodGV4dC5tYXRjaCgvW1xcL1xcXFwuIC1dLykpIHtcblx0XHRcdFx0dGV4dCA9IHRleHQucmVwbGFjZSgvW1xcL1xcXFwuIC1dLywgJycpO1xuXHRcdFx0XHR0aGlzLnNldCh0ZXh0KTtcblx0XHRcdFx0aWYgKCF0aGlzLmVtcHR5ICYmIHRoaXMuaW5kZXggPCAyKSB7XG5cdFx0XHRcdFx0dGhpcy5kb2JmaWVsZC5mb2N1c0ZpZWxkQWZ0ZXIodGhpcyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gQWR2YW5jZSBmb2N1cyBpZiB0aGlzIGZpZWxkIGlzIGJvdGggdmFsaWQgYW5kIGZ1bGxcblx0XHRcdGlmICh0aGlzLmRvYmZpZWxkLnZhbGlkYXRlKHRoaXMpKSB7XG5cdFx0XHRcdGxldCB3YW50ID0gdGhpcy5uYW1lID09PSAneWVhcicgPyA0IDogMjtcblx0XHRcdFx0aWYgKHRoaXMuaXNEaWdpdEtleShlKSAmJiB0ZXh0Lmxlbmd0aCA9PT0gd2FudCkge1xuXHRcdFx0XHRcdHRoaXMuZG9iZmllbGQuZm9jdXNGaWVsZEFmdGVyKHRoaXMpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0bGVmdCgpIHtcblx0XHRcdHJldHVybiB0aGlzLiRpbnB1dC5wb3NpdGlvbigpLmxlZnQ7XG5cdFx0fVxuXG5cdFx0c2V0KG5ld192YWx1ZSkge1xuXHRcdFx0dGhpcy4kaW5wdXQudmFsKG5ld192YWx1ZSkucmVtb3ZlQ2xhc3MoJ2hpbnQnKTtcblx0XHRcdGlmICghdGhpcy5oYXNfZm9jdXMpIHtcblx0XHRcdFx0dGhpcy5zaG93X2hpbnQoKTtcblx0XHRcdH1cblx0XHRcdHRoaXMuZW1wdHkgPSBuZXdfdmFsdWUgPT09ICcnO1xuXHRcdFx0dGhpcy5jbGVhckVycm9yKCk7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9XG5cblx0XHRzZXRFcnJvcih0ZXh0KSB7XG5cdFx0XHR0aGlzLmVycm9yX3RleHQgPSB0ZXh0O1xuXHRcdFx0dGhpcy4kaW5wdXQuYWRkQ2xhc3MoJ2Vycm9yJyk7XG5cdFx0XHR0aGlzLmRvYmZpZWxkLnNob3dFcnJvcigpO1xuXHRcdH1cblxuXHRcdHNldEZvY3VzKHNlbGVjdF9hbGwpIHtcblx0XHRcdGxldCAkaW5wdXQgPSB0aGlzLiRpbnB1dDtcblx0XHRcdCRpbnB1dC5mb2N1cygpO1xuXHRcdFx0aWYgKHNlbGVjdF9hbGwpIHtcblx0XHRcdFx0JGlucHV0LnNlbGVjdCgpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0JGlucHV0LnZhbCgkaW5wdXQudmFsKCkpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fVxuXG5cdFx0c2V0V2lkdGgobmV3X3dpZHRoKSB7XG5cdFx0XHR0aGlzLiRpbnB1dC53aWR0aChuZXdfd2lkdGgpO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fVxuXG5cdFx0c2hvd19oaW50KCkge1xuXHRcdFx0aWYgKHRoaXMuZ2V0KCkgPT09ICcnICYmIHR5cGVvZiAodGhpcy5oaW50X3RleHQpID09PSAnc3RyaW5nJykge1xuXHRcdFx0XHR0aGlzLiRpbnB1dC52YWwodGhpcy5oaW50X3RleHQpLmFkZENsYXNzKCdoaW50Jyk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9XG5cblx0XHR5aWVsZEZvY3VzKCkge1xuXHRcdFx0dGhpcy4kaW5wdXQuYmx1cigpO1xuXHRcdH1cblx0fVxuXG5cdCQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcblx0XHQkKCcuZG9iaXNzdWUnKS5lYWNoKGZ1bmN0aW9uICgpIHtcblx0XHRcdG15S3JEb2JFbnRyeSA9IG5ldyBLckRvYkVudHJ5KCQodGhpcyksIHt9KTtcblx0XHR9KTtcblx0fSk7XG59KGpRdWVyeSkpOyIsIi8vIG5vaW5zcGVjdGlvbiBEdXBsaWNhdGVkQ29kZVxuXG4vKipcbiAqIEBwYWNrYWdlICAgIEtub3cgUmVzZXJ2YXRpb25zXG4gKiBAc3VicGFja2FnZSBBZG1pbiBKU1xuICogQGNvcHlyaWdodCAgMjAyMCBIaWdobGFuZCBWaXNpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBAbGljZW5zZSAgICBTZWUgdGhlIGZpbGUgXCJMSUNFTlNFLnR4dFwiIGZvciB0aGUgZnVsbCBsaWNlbnNlIGdvdmVybmluZyB0aGlzIGNvZGUuXG4gKiBAYXV0aG9yICAgICBIYXplbCBXaWxzb24gPGhhemVsQGhpZ2hsYW5kdmlzaW9uLmNvbT5cbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgkKSB7XG5cblx0JChmdW5jdGlvbiAoKSB7XG5cdFx0Y29uc3QgdG90YWxHdWVzdHMgPSAkKCcjanNkYXRhJykuZGF0YSgndG90YWxndWVzdHMnKTtcblx0XHQkKCcjamZvcm1fYWR1bHRzJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcblx0XHRcdGNoYW5nZVBhcnR5U2l6ZSgxLCB0b3RhbEd1ZXN0cyk7XG5cdFx0fSk7XG5cdFx0JCgnI2pmb3JtX2NoaWxkJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcblx0XHRcdGNoYW5nZVBhcnR5U2l6ZSgyLCB0b3RhbEd1ZXN0cyk7XG5cdFx0fSk7XG5cblx0XHRpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hvd3RvYXJyaXZlJykpIHtcblx0XHRcdGNvbnN0IGhvd3RvYXJyaXZlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hvd3RvYXJyaXZlJyk7XG5cdFx0XHRsZXQgYXJyaXZhbG1lYW5zID0gaG93dG9hcnJpdmUuZ2V0QXR0cmlidXRlKCdkYXRhLW1lYW5zJyk7XG5cdFx0XHRpZiAoIWFycml2YWxtZWFucykge1xuXHRcdFx0XHRhcnJpdmFsbWVhbnMgPSAnYWlyJztcblx0XHRcdH1cblxuXHRcdFx0ZGlzcGxheUFycml2YWwoYXJyaXZhbG1lYW5zKTtcblx0XHR9XG5cblx0XHQkKCdib2R5Jykub24oJ2NsaWNrJywgJy5hbWl0ZW0nLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0ZGlzcGxheUFycml2YWwoJCh0aGlzKS5hdHRyKCdpZCcpKTtcblx0XHR9KTtcblx0fSk7XG5cblx0ZnVuY3Rpb24gY2hhbmdlUGFydHlTaXplKHR5cGUsIGd1ZXN0cykge1xuXHRcdGxldCBudW1BZHVsdHMgPSAkKCcjamZvcm1fYWR1bHRzJykudmFsKClcblx0XHRsZXQgJGlucHV0Q2hpbGQgPSAkKCcjamZvcm1fY2hpbGQnKTtcblx0XHRsZXQgbnVtQ2hpbGRyZW4gPSAkaW5wdXRDaGlsZC52YWwoKTtcblx0XHRsZXQgbWF4Q2hpbGRyZW4gPSBndWVzdHMgLSBudW1BZHVsdHM7XG5cdFx0bGV0ICRob2xkZXIgPSAkKCcjaG9sZGVyJyk7XG5cdFx0bGV0IGk7XG5cblx0XHRpZiAodHlwZSA9PT0gMSkge1xuXHRcdFx0JGlucHV0Q2hpbGQuYXR0cignbWF4JywgbWF4Q2hpbGRyZW4pO1xuXHRcdFx0aWYgKG51bUNoaWxkcmVuID4gbWF4Q2hpbGRyZW4pIHtcblx0XHRcdFx0JGlucHV0Q2hpbGQudmFsKG1heENoaWxkcmVuKTtcblx0XHRcdFx0aWYgKCFtYXhDaGlsZHJlbilcblx0XHRcdFx0XHQkaG9sZGVyLmhpZGUoKTtcblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IG51bUNoaWxkcmVuIC0gbWF4Q2hpbGRyZW47IGkrKykge1xuXHRcdFx0XHRcdFx0JGhvbGRlci5jaGlsZHJlbigpLmxhc3QoKS5yZW1vdmUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9IGVsc2UgaWYgKHR5cGUgPT09IDIpIHtcblx0XHRcdGxldCBkaWZmZXJlbmNlO1xuXHRcdFx0bGV0IGV4aXN0aW5nID0gJGhvbGRlci5jaGlsZHJlbignaW5wdXQnKS5sZW5ndGg7XG5cdFx0XHRpZiAobnVtQ2hpbGRyZW4gPiBleGlzdGluZykge1xuXHRcdFx0XHRkaWZmZXJlbmNlID0gbnVtQ2hpbGRyZW4gLSBleGlzdGluZztcblx0XHRcdFx0Zm9yIChpID0gMTsgaSA8PSBkaWZmZXJlbmNlOyBpKyspIHtcblx0XHRcdFx0XHQkaG9sZGVyLmFwcGVuZChjcmVhdGVOZXdBZ2VGaWVsZChleGlzdGluZyArIGkpKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZGlmZmVyZW5jZSA9IGV4aXN0aW5nIC0gbnVtQ2hpbGRyZW47XG5cdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBkaWZmZXJlbmNlOyBpKyspIHtcblx0XHRcdFx0XHQkaG9sZGVyLmNoaWxkcmVuKCdpbnB1dCcpLmxhc3QoKS5yZW1vdmUoKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRsZXQgbm93ID0gJGhvbGRlci5jaGlsZHJlbignaW5wdXQnKS5sZW5ndGg7XG5cdFx0XHRpZiAobm93KSB7XG5cdFx0XHRcdCRob2xkZXIuc2hvdygpO1xuXHRcdFx0fSBlbHNlIGlmICghbm93KSB7XG5cdFx0XHRcdCRob2xkZXIuaGlkZSgpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIGNyZWF0ZU5ld0FnZUZpZWxkKGNvdW50KSB7XG5cdFx0Y29uc3QgJGpzZGF0YSA9ICQoJyNqc2RhdGEnKTtcblx0XHRjb25zdCBjaGlsZE1pbkFnZSA9ICRqc2RhdGEuZGF0YSgnY2hpbGRtaW5hZ2UnKTtcblx0XHRjb25zdCBjaGlsZE1heEFnZSA9ICRqc2RhdGEuZGF0YSgnY2hpbGRtYXhhZ2UnKTtcblx0XHRsZXQgbmV3YWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcblx0XHRuZXdhZ2Uuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcIm51bWJlclwiKTtcblx0XHRuZXdhZ2Uuc2V0QXR0cmlidXRlKFwibWluXCIsIGNoaWxkTWluQWdlKTtcblx0XHRuZXdhZ2Uuc2V0QXR0cmlidXRlKFwibWF4XCIsIGNoaWxkTWF4QWdlKTtcblx0XHRuZXdhZ2Uuc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgJzInKTtcblx0XHRuZXdhZ2Uuc2V0QXR0cmlidXRlKFwic3RlcFwiLCAnMScpO1xuXHRcdG5ld2FnZS5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAnamZvcm1bY2hpbGRfYWdlc11bXScpO1xuXHRcdG5ld2FnZS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2pmb3JtX2NoaWxkX2FnZXNfJyArIGNvdW50KTtcblx0XHRuZXdhZ2Uuc2V0QXR0cmlidXRlKCdjbGFzcycsICdmbG9hdC1sZWZ0IGNoaWxkLWFnZXMgaW5wdXQtdGlueSBmb3JtLWNvbnRyb2wgdmFsaWQgZm9ybS1jb250cm9sLXN1Y2Nlc3MnKTtcblxuXHRcdHJldHVybiBuZXdhZ2U7XG5cdH1cblxuXHRmdW5jdGlvbiBkaXNwbGF5QXJyaXZhbCh2YWx1ZSkge1xuXHRcdGxldCB4ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYW1pdGVtJyk7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB4Lmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR4W2ldLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuXHRcdH1cblxuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhaXItZGF0YScpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RyYWluLWRhdGEnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhdXRvLWRhdGEnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvdGhlci1kYXRhJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblx0XHRsZXQgYXJyaXZhbGRhdGEgPSB2YWx1ZSArICctZGF0YSc7XG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYXJyaXZhbGRhdGEpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHZhbHVlKS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnamZvcm1fYXJyaXZhbF9tZWFucycpLnZhbHVlID0gdmFsdWU7XG5cdH1cbn0pKGpRdWVyeSk7IiwiLyoqXG4gKiBAcGFja2FnZSAgICBLbm93IFJlc2VydmF0aW9uc1xuICogQHN1YnBhY2thZ2UgU2l0ZSBKU1xuICogQGNvcHlyaWdodCAgMjAyMCBIaWdobGFuZCBWaXNpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBAbGljZW5zZSAgICBTZWUgdGhlIGZpbGUgXCJMSUNFTlNFLnR4dFwiIGZvciB0aGUgZnVsbCBsaWNlbnNlIGdvdmVybmluZyB0aGlzIGNvZGUuXG4gKiBAYXV0aG9yICAgICBIYXplbCBXaWxzb24gPGhhemVsQGhpZ2hsYW5kdmlzaW9uLmNvbT5cbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxuaWYgKCF3aW5kb3cubG9jYXRpb24ub3JpZ2luKSB7XG5cdHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gPSB3aW5kb3cubG9jYXRpb24ucHJvdG9jb2wgKyBcIi8vXCIgKyB3aW5kb3cubG9jYXRpb24uaG9zdDtcbn1cbmNvbnN0IGxpdmVzaXRlID0gd2luZG93LmxvY2F0aW9uLm9yaWdpbiArICcvJztcbmNvbnN0IGxhbmcgPSBcImVuXCI7XG5cbihmdW5jdGlvbiAoJCkge1xuXHRjb25zdCBtYXJrZXJzaGFwZSA9IHtcblx0XHR0eXBlOiAgICdwb2x5Jyxcblx0XHRjb29yZHM6IFsxLCAxLCAxLCAzMiwgMzcsIDMyLCAzMiwgMV1cblx0fTtcblxuXHRsZXQgbXlLcm1hcDtcblx0bGV0IG1hcERhdGEgPSBmYWxzZTtcblx0bGV0IG1hcDtcblx0bGV0IG1hcFpvb207XG5cdGxldCBpbmZvV2luZG93O1xuXHRsZXQgaW5mb1dpbmRvdzI7XG5cdGxldCBib3VuZHM7XG5cdGxldCBwcm9wZXJ0eWRpdjtcblx0bGV0IHByb3BlcnR5aWNvbjtcblx0bGV0IG1jO1xuLy9cdGxldCBiaWNvbjtcbi8vXHRsZXQgaGljb247XG4vL1x0bGV0IGxhcmdlX3NsaWRlc2hvdyA9IGZhbHNlO1xuXG5cdGxldCBzZXR0aW5ncyA9IHtcblx0XHRwcm9wZXJ0eU1hcmtlcnM6IFtdLFxuXHRcdGZpbHRlcklkczogICAgICAgW10sXG5cdFx0bWFwTWFya2VyczogICAgICBbXSxcblx0XHRtYXBUeXBlSWQ6ICAgICAgICcnLFxuXHRcdG1hcFpvb206ICAgICAgICAgMCxcblx0XHRtYXBNYXhab29tOiAgICAgIDIwLFxuXHRcdG1hcFR5cGU6ICAgICAgICAgJycsXG5cdFx0bWFwSWQ6ICAgICAgICAgICAnJyxcblx0XHRtYXJrZXJDb2xvcjogICAgICdyZWQnLFxuXHR9O1xuXG5cdGNsYXNzIEtybWFwIHtcblx0XHRjb25zdHJ1Y3RvcihzZXR0aW5ncykge1xuXHRcdFx0dGhpcy5zZXR0aW5ncyA9IHNldHRpbmdzO1xuXG5cdFx0XHQvL0luaXRpYWxpc2UgbWFwIG9wdGlvbnNcblx0XHRcdHRoaXMuZ21PcHRpb25zID0ge1xuXHRcdFx0XHRzY3JvbGx3aGVlbDogICAgICAgZmFsc2UsXG5cdFx0XHRcdHpvb206ICAgICAgICAgICAgICB0aGlzLnNldHRpbmdzLm1hcFpvb20sXG5cdFx0XHRcdG1heFpvb206ICAgICAgICAgICB0aGlzLnNldHRpbmdzLm1hcE1heFpvb20sXG5cdFx0XHRcdG1hcFR5cGVJZDogICAgICAgICB0aGlzLnNldHRpbmdzLm1hcFR5cGVJZCxcblx0XHRcdFx0c3RyZWV0Vmlld0NvbnRyb2w6IGZhbHNlXG5cdFx0XHR9O1xuXG5cdFx0XHRtYXBab29tID0gdGhpcy5zZXR0aW5ncy5tYXBab29tO1xuXHRcdFx0dGhpcy5nbWFya2VycyA9IFtdO1xuXHRcdFx0dGhpcy5jb3VudCA9IDA7XG5cblx0XHRcdHRoaXMuaW5pdE1hcCgpO1xuXHRcdH1cblxuXHRcdHN0YXRpYyBjbG9zZUtySW5mb3dpbmRvdygpIHtcblx0XHRcdCQoJyNrci1pbmZvd2luZG93JykuaGlkZSgpO1xuLy9cdFx0XHRcIiNrci1pbmZvd2luZG93XCIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblx0XHRcdGluZm9XaW5kb3cuY2xvc2UoKTtcblx0XHRcdGluZm9XaW5kb3cyLmNsb3NlKCk7XG5cdFx0fVxuXG5cdFx0Ly8gb25seSBzaG93IHZpc2libGUgbWFya2Vyc1xuXHRcdHN0YXRpYyBzaG93VmlzaWJsZU1hcmtlcnMobWFya2Vycykge1xuXHRcdFx0bGV0IGJvdW5kcyA9IG1hcC5nZXRCb3VuZHMoKTtcblx0XHRcdGxldCBjb3VudCA9IDA7XG5cblx0XHRcdGZvciAobGV0IGQgPSAwOyBkIDwgbWFya2Vycy5sZW5ndGg7IGQrKykge1xuXHRcdFx0XHRsZXQgbWFya2VyID0gbWFya2Vyc1tkXTtcblxuXHRcdFx0XHRpZiAobWFya2VyLnR5cGUgPT09ICdtYXAnKSB7XG5cdFx0XHRcdFx0aWYgKGJvdW5kcy5jb250YWlucyhtYXJrZXIuZ2V0UG9zaXRpb24oKSkgPT09IHRydWUpIHtcblx0XHRcdFx0XHRcdG1hcmtlci5zZXRWaXNpYmxlKHRydWUpO1xuXHRcdFx0XHRcdFx0Y291bnQrKztcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0bWFya2VyLnNldFZpc2libGUoZmFsc2UpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gY291bnQ7XG5cdFx0fVxuXG5cdFx0Ly8gQ2hlY2sgTWFya2VycyBhcnJheSBmb3IgZHVwbGljYXRlIHBvc2l0aW9uIGFuZCBvZmZzZXQgYSBsaXR0bGVcblx0XHRjaGVja0R1cGxpY2F0ZShjdXJyZW50KSB7XG5cdFx0XHRpZiAodGhpcy5nbWFya2Vycy5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdGxldCBkdXBzID0gMDtcblxuXHRcdFx0XHRmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5nbWFya2Vycy5sZW5ndGg7IGluZGV4KyspIHtcblx0XHRcdFx0XHRsZXQgcG9zID0gdGhpcy5nbWFya2Vyc1tpbmRleF0uZ2V0UG9zaXRpb24oKTtcblx0XHRcdFx0XHRpZiAoY3VycmVudC5lcXVhbHMocG9zKSkge1xuXHRcdFx0XHRcdFx0ZHVwcysrO1xuXHRcdFx0XHRcdFx0bGV0IGEgPSAzNjAuMCAvIGR1cHM7XG5cdFx0XHRcdFx0XHRsZXQgbmV3TGF0ID0gcG9zLmxhdCgpICsgLS4wMDAwMiAqIE1hdGguY29zKCgrYSAqIGR1cHMpIC8gMTgwICogTWF0aC5QSSk7ICAvL3hcblx0XHRcdFx0XHRcdGxldCBuZXdMbmcgPSBwb3MubG5nKCkgKyAtLjAwMDAwICogTWF0aC5zaW4oKCthICogZHVwcykgLyAxODAgKiBNYXRoLlBJKTsgIC8vWVxuXHRcdFx0XHRcdFx0Y3VycmVudCA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmcobmV3TGF0LCBuZXdMbmcpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gY3VycmVudDtcblx0XHR9XG5cblx0XHRjaGVja1pvb20oKSB7XG5cdFx0XHRpZiAobWFwWm9vbSA+IDApIHtcblx0XHRcdFx0bGV0IG15bGlzdGVuZXIgPSBtYXAuYWRkTGlzdGVuZXIoJ2lkbGUnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0Y29uc3QgY3VycmVudFpvb20gPSBtYXAuZ2V0Wm9vbSgpO1xuXHRcdFx0XHRcdGlmIChtYXBab29tID4gMCAmJiBjdXJyZW50Wm9vbSAhPT0gbWFwWm9vbSkge1xuXHRcdFx0XHRcdFx0bWFwLnNldFpvb20obWFwWm9vbSk7XG5cdFx0XHRcdFx0XHRteWxpc3RlbmVyLnJlbW92ZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Y2x1c3Rlck1hcCgpIHtcblx0XHRcdGNvbnN0IG1jT3B0aW9ucyA9IHtcblx0XHRcdFx0Z3JpZFNpemU6ICAgICAgICAgICAgMjAsXG5cdFx0XHRcdG1heFpvb206ICAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MubWFwTWF4Wm9vbSAtIDEsXG5cdFx0XHRcdGltYWdlUGF0aDogICAgICAgICAgICcvbWVkaWEvY29tX2tub3dyZXMvaW1hZ2VzL21hcmtlcmNsdXN0ZXJlci9tJyxcblx0XHRcdFx0aWdub3JlSGlkZGVuTWFya2VyczogdHJ1ZVxuXHRcdFx0fTtcblxuXHRcdFx0dGhpcy5zZXRQcm9wZXJ0eU1hcmtlcnMoKTtcblx0XHRcdHRoaXMuc2V0TWFwTWFya2VycygpO1xuXG5cdFx0XHRmb3IgKGxldCBkID0gMDsgZCA8IHRoaXMuZ21hcmtlcnMubGVuZ3RoOyBkKyspIHtcblx0XHRcdFx0bGV0IG1hcmtlciA9IHRoaXMuZ21hcmtlcnNbZF07XG5cdFx0XHRcdGlmIChtYXJrZXIudHlwZSA9PT0gJ3Byb3BlcnR5Jykge1xuXHRcdFx0XHRcdGlmICh0aGlzLnNldHRpbmdzLmZpbHRlcklkcy5pbmNsdWRlcyhtYXJrZXIucGlkKSkge1xuXHRcdFx0XHRcdFx0bWFya2VyLnNldFZpc2libGUodHJ1ZSk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdG1hcmtlci5zZXRWaXNpYmxlKGZhbHNlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0bWMgPSBuZXcgTWFya2VyQ2x1c3RlcmVyKG1hcCwgdGhpcy5nbWFya2VycywgbWNPcHRpb25zKTtcblx0XHRcdGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKG1jLCBcImNsdXN0ZXJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdCQoJyNrci1pbmZvd2luZG93JykuaGlkZSgpO1xuXHRcdFx0XHRpbmZvV2luZG93LmNsb3NlKCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0bWFwLmZpdEJvdW5kcyhib3VuZHMpO1xuXG5cdFx0XHR0aGlzLmNoZWNrWm9vbSgpO1xuXHRcdH1cblxuXHRcdC8vIENyZWF0ZSB0aGUgTWFwXG5cdFx0Y3JlYXRlTWFwKCkge1xuXHRcdFx0bWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnNldHRpbmdzLm1hcElkKSwgdGhpcy5nbU9wdGlvbnMpO1xuXHRcdFx0aW5mb1dpbmRvdyA9IG5ldyBnb29nbGUubWFwcy5JbmZvV2luZG93KCk7XG5cdFx0XHRpbmZvV2luZG93MiA9IG5ldyBnb29nbGUubWFwcy5JbmZvV2luZG93KCk7XG5cdFx0XHRib3VuZHMgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nQm91bmRzKCk7XG5cdFx0fVxuXG5cdFx0Ly8gQ3JlYXRlIHRoZSBtYXJrZXIgYW5kIHNldCB1cCB0aGUgZXZlbnQgd2luZG93XG5cdFx0Y3JlYXRlTWFwTWFya2VyKHBvaW50LCBodG1sLCBpbWFnZSwgYm94aW5mbywgbGluaywgdGl0bGUpIHtcblx0XHRcdGxldCBtYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcblx0XHRcdFx0c2hhcGU6ICAgIG1hcmtlcnNoYXBlLFxuXHRcdFx0XHRsaW5rOiAgICAgbGluayxcblx0XHRcdFx0aWNvbjogICAgIGltYWdlLFxuXHRcdFx0XHRwb3NpdGlvbjogcG9pbnQsXG5cdFx0XHRcdHRpdGxlOiAgICB0aXRsZSxcblx0XHRcdFx0bWFwOiAgICAgIG1hcCxcblx0XHRcdFx0ekluZGV4OiAgIDk5OVxuXHRcdFx0fSk7XG5cblx0XHRcdGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKG1hcmtlciwgJ21vdXNlb3ZlcicsIChmdW5jdGlvbiAoaHRtbCkge1xuXHRcdFx0XHRyZXR1cm4gZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdGluZm9XaW5kb3cyLnNldENvbnRlbnQoaHRtbCk7XG5cdFx0XHRcdFx0aW5mb1dpbmRvdzIub3BlbihtYXAsIG1hcmtlcik7XG5cdFx0XHRcdH1cblx0XHRcdH0pKGh0bWwpKTtcblxuXHRcdFx0Z29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIobWFya2VyLCAnbW91c2VvdXQnLCAoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRyZXR1cm4gZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdGluZm9XaW5kb3cyLmNsb3NlKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pKCkpO1xuXG5cdFx0XHRnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYXJrZXIsICdjbG9zZWNsaWNrJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRpbmZvV2luZG93Mi5jbG9zZSgpO1xuXHRcdFx0fSk7XG5cblx0XHRcdHRoaXMuZ21hcmtlcnMucHVzaChtYXJrZXIpO1xuXG5cdFx0XHR0aGlzLmNvdW50Kys7XG5cdFx0fVxuXG5cdFx0Y3JlYXRlUHJvcGVydHlNYXJrZXIocG9pbnQsIGh0bWwsIGJveGluZm8sIGxpbmssIHRpdGxlLCBjb2xvciwgaWQsIGltYWdlLCBwaWQpIHtcblx0XHRcdGxldCBtYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcblx0XHRcdFx0cG9zaXRpb246IHBvaW50LFxuXHRcdFx0XHRsaW5rOiAgICAgbGluayxcblx0XHRcdFx0bWFwOiAgICAgIG1hcCxcblx0XHRcdFx0aWNvbjogICAgIGltYWdlLFxuXHRcdFx0XHR0aXRsZTogICAgdGl0bGUsXG5cdFx0XHRcdHBpZDogICAgICBwaWQsXG5cdFx0XHRcdHR5cGU6ICAgICAncHJvcGVydHknLFxuXHRcdFx0XHR6SW5kZXg6ICAgdGhpcy5jb3VudCArIDEwMDBcblx0XHRcdH0pO1xuXG5cdFx0XHRwcm9wZXJ0eWRpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcblx0XHRcdC8vIGlmIChwcm9wZXJ0eWRpdiAhPT0gbnVsbCkge1xuXHRcdFx0Ly8gXHRnb29nbGUubWFwcy5ldmVudC5hZGREb21MaXN0ZW5lcihwcm9wZXJ0eWRpdiwgJ21vdXNlb3ZlcicsIGZ1bmN0aW9uICgpIHtcblx0XHRcdC8vIFx0XHRtYXJrZXIuc2V0SWNvbihcblx0XHRcdC8vIFx0XHRcdGhpY29uXG5cdFx0XHQvLyBcdFx0KVxuXHRcdFx0Ly8gXHRcdG1hcmtlci5zZXRaSW5kZXgobWFya2VyLmdldFpJbmRleCgpICsgMTAwMCk7XG5cdFx0XHQvLyBcdH0pO1xuXHRcdFx0Ly8gXHRnb29nbGUubWFwcy5ldmVudC5hZGREb21MaXN0ZW5lcihwcm9wZXJ0eWRpdiwgJ21vdXNlb3V0JywgZnVuY3Rpb24gKCkge1xuXHRcdFx0Ly8gXHRcdG1hcmtlci5zZXRJY29uKFxuXHRcdFx0Ly8gXHRcdFx0Ymljb25cblx0XHRcdC8vIFx0XHQpXG5cdFx0XHQvLyBcdFx0bWFya2VyLnNldFpJbmRleChtYXJrZXIuZ2V0WkluZGV4KCkgLSAxMDAwKTtcblx0XHRcdC8vIFx0fSk7XG5cdFx0XHQvLyB9XG5cblx0XHRcdC8vIG1hcmtlci5hZGRMaXN0ZW5lcignbW91c2VvdmVyJywgKGZ1bmN0aW9uICgpIHtcblx0XHRcdC8vIFx0bWFya2VyLnNldEljb24oXG5cdFx0XHQvLyBcdFx0aGljb25cblx0XHRcdC8vIFx0KVxuXHRcdFx0Ly8gXHRtYXJrZXIuc2V0WkluZGV4KG1hcmtlci5nZXRaSW5kZXgoKSArIDEwMDApO1xuXHRcdFx0Ly8gfSkpO1xuXHRcdFx0Ly9cblx0XHRcdC8vIG1hcmtlci5hZGRMaXN0ZW5lcignbW91c2VvdXQnLCAoZnVuY3Rpb24gKCkge1xuXHRcdFx0Ly8gXHRtYXJrZXIuc2V0SWNvbihcblx0XHRcdC8vIFx0XHRiaWNvblxuXHRcdFx0Ly8gXHQpXG5cdFx0XHQvLyBcdG1hcmtlci5zZXRaSW5kZXgobWFya2VyLmdldFpJbmRleCgpIC0gMTAwMCk7XG5cdFx0XHQvLyB9KSk7XG5cblx0XHRcdC8vIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKG1hcmtlciwgJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cdFx0XHQvLyBcdG1hcmtlci5zZXRWaXNpYmxlKGZhbHNlKTsgLy8gbWFwcyBBUEkgaGlkZSBjYWxsXG5cdFx0XHQvLyB9KTtcblxuXHRcdFx0bWFya2VyLmFkZExpc3RlbmVyKCdtb3VzZWRvd24nLCAoZnVuY3Rpb24gKGJveGluZm8pIHtcblx0XHRcdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRpbmZvV2luZG93LmNsb3NlKCk7XG5cdFx0XHRcdFx0JCgnI2tyLWluZm93aW5kb3cnKS5oaWRlKCk7XG5cdFx0XHRcdFx0aW5mb1dpbmRvdy5zZXRDb250ZW50KGh0bWwpO1xuXHRcdFx0XHRcdGluZm9XaW5kb3cub3BlbihtYXAsIG1hcmtlcik7XG5cblx0XHRcdFx0XHQkLmFqYXgoe1xuXHRcdFx0XHRcdFx0dHlwZTogICAgXCJQT1NUXCIsXG5cdFx0XHRcdFx0XHR1cmw6ICAgICBsaXZlc2l0ZSArICdpbmRleC5waHA/b3B0aW9uPWNvbV9rbm93cmVzJnRhc2s9cHJvcGVydHkubWFwaW5mb3dpbmRvdyZsYW5nPScgKyBsYW5nLFxuXHRcdFx0XHRcdFx0ZGF0YTogICAge1xuXHRcdFx0XHRcdFx0XHRpZDogcGFyc2VJbnQoYm94aW5mbylcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuXHRcdFx0XHRcdFx0XHQkKCcja3ItaW5mb3dpbmRvdycpLmZhZGVJbig0MDApLmh0bWwoZGF0YSkuc2hvdygpO1xuXHRcdFx0XHRcdFx0XHQkKFwiLmtyLWluZm93aW5kb3ctc2xpZGVzaG93XCIpLm5vdCgnLnNsaWNrLWluaXRpYWxpemVkJykuc2xpY2soe1xuXHRcdFx0XHRcdFx0XHRcdG5leHRBcnJvdzogJzxpIGNsYXNzPVwic2xpY2stbmF2IG5leHQgZmFzIGZhLWNoZXZyb24tcmlnaHQgXCI+PC9pPicsXG5cdFx0XHRcdFx0XHRcdFx0cHJldkFycm93OiAnPGkgY2xhc3M9XCJzbGljay1uYXYgcHJldiBmYXMgZmEtY2hldnJvbi1sZWZ0IFwiPjwvaT4nLFxuXHRcdFx0XHRcdFx0XHRcdGF1dG9wbGF5OiAgdHJ1ZVxuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fTtcblx0XHRcdH0pKGJveGluZm8pKTtcblxuXHRcdFx0Z29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIobWFya2VyLCAnY2xvc2VjbGljaycsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0JCgnI2tyLWluZm93aW5kb3cnKS5oaWRlKCk7XG5cdFx0XHRcdGluZm9XaW5kb3cuY2xvc2UoKTtcblx0XHRcdH0pO1xuXG5cdFx0XHR0aGlzLmdtYXJrZXJzLnB1c2gobWFya2VyKTtcblx0XHRcdGJvdW5kcy5leHRlbmQocG9pbnQpO1xuXG5cdFx0XHR0aGlzLmNvdW50Kys7XG5cdFx0fVxuXG5cdFx0Ly9Jbml0aWFsaXNlIG1hcFxuXHRcdGluaXRNYXAoKSB7XG5cdFx0XHR0aGlzLmNyZWF0ZU1hcCgpO1xuLy9cdFx0XHR0aGlzLnNldE1hcmtlckljb25zKCk7XG5cblx0XHRcdGlmICh0aGlzLnNldHRpbmdzLm1hcFR5cGUgPT09ICdjbHVzdGVyJykge1xuXHRcdFx0XHR0aGlzLmNsdXN0ZXJNYXAoKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuc29sb01hcCgpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIFJlc2V0IG1hcCB0byBpbml0aWFsIHN0YXRlXG5cdFx0cmVmcmVzaE1hcCgkbWFwbW9kYWwpIHtcblx0XHRcdGlmICh0aGlzLnNldHRpbmdzLm1hcFR5cGUgPT09ICdzb2xvJylcblx0XHRcdFx0cmV0dXJuO1xuXG5cdFx0XHRsZXQgc2VsZiA9IHRoaXM7XG5cdFx0XHRqUXVlcnkuYWpheCh7XG5cdFx0XHRcdHVybDogICAgICBsaXZlc2l0ZSArICdpbmRleC5waHA/b3B0aW9uPWNvbV9rbm93cmVzJnRhc2s9cHJvcGVydGllcy5yZWZyZXNobWFwJmxhbmc9JyArIGxhbmcsXG5cdFx0XHRcdHR5cGU6ICAgICBcIlBPU1RcIixcblx0XHRcdFx0ZGF0YVR5cGU6IFwianNvblwiLFxuXHRcdFx0XHRzdWNjZXNzOiAgZnVuY3Rpb24gKHJlc3VsdCkge1xuXHRcdFx0XHRcdGlmIChyZXN1bHQuc3VjY2Vzcykge1xuXHRcdFx0XHRcdFx0c2VsZi5zZXR0aW5ncy5maWx0ZXJJZHMgPSByZXN1bHQuZGF0YS5maWx0ZXJJZHM7XG5cdFx0XHRcdFx0XHRmb3IgKGxldCBkID0gMDsgZCA8IHNlbGYuZ21hcmtlcnMubGVuZ3RoOyBkKyspIHtcblx0XHRcdFx0XHRcdFx0bGV0IG1hcmtlciA9IHNlbGYuZ21hcmtlcnNbZF07XG5cdFx0XHRcdFx0XHRcdGlmIChtYXJrZXIudHlwZSA9PT0gJ3Byb3BlcnR5Jykge1xuXHRcdFx0XHRcdFx0XHRcdGlmIChzZWxmLnNldHRpbmdzLmZpbHRlcklkcy5pbmNsdWRlcyhtYXJrZXIucGlkKSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0bWFya2VyLnNldFZpc2libGUodHJ1ZSk7XG5cdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdG1hcmtlci5zZXRWaXNpYmxlKGZhbHNlKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0bWMucmVwYWludCgpO1xuXHRcdFx0XHRcdFx0bmV3IEZvdW5kYXRpb24uUmV2ZWFsKCRtYXBtb2RhbCk7XG5cdFx0XHRcdFx0XHQkbWFwbW9kYWwuZm91bmRhdGlvbignb3BlbicpO1xuXHRcdFx0XHRcdFx0Z29vZ2xlLm1hcHMuZXZlbnQudHJpZ2dlcihtYXAsICdyZXNpemUnKTtcblx0XHRcdFx0XHRcdCRtYXBtb2RhbC5mb3VuZGF0aW9uKCdvcGVuJyk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGFsZXJ0KHJlc3VsdC5tZXNzYWdlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdC8vIFJlc2V0IG1hcCB0byBpbml0aWFsIHN0YXRlXG5cdFx0cmVzZXRNYXAoKSB7XG5cdFx0XHRpbmZvV2luZG93LmNsb3NlKCk7XG5cdFx0XHRpbmZvV2luZG93Mi5jbG9zZSgpO1xuXHRcdFx0JCgnI2tyLWluZm93aW5kb3cnKS5oaWRlKCk7XG5cdFx0XHRtYXAuZml0Qm91bmRzKGJvdW5kcyk7XG5cblx0XHRcdHRoaXMuY2hlY2tab29tKCk7XG5cdFx0fVxuXG5cdFx0Ly8gbG9vcCB0byBzZXQgbWFwIG1hcmtlcnNcblx0XHRzZXRNYXBNYXJrZXJzKCkge1xuXHRcdFx0bGV0IHBvaW50O1xuXHRcdFx0bGV0IGFtYXJrO1xuXG5cdFx0XHRmb3IgKGxldCBkID0gMDsgZCA8IHRoaXMuc2V0dGluZ3MubWFwTWFya2Vycy5sZW5ndGg7IGQrKykge1xuXHRcdFx0XHRhbWFyayA9IHRoaXMuc2V0dGluZ3MubWFwTWFya2Vyc1tkXTtcblxuXHRcdFx0XHRsZXQgbWFya2VyaWNvbiA9IHtcblx0XHRcdFx0XHR1cmw6ICBhbWFya1snaWNvbiddLFxuXHRcdFx0XHRcdHNpemU6IG5ldyBnb29nbGUubWFwcy5TaXplKDMyLCAzNyksXG5cdFx0XHRcdFx0Ly8gT1Igc2NhbGVkU2l6ZTogbmV3IGdvb2dsZS5tYXBzLlNpemUoNDAsIDQ3KVxuXHRcdFx0XHRcdG9yaWdpbjogbmV3IGdvb2dsZS5tYXBzLlBvaW50KDAsIDApLFxuXHRcdFx0XHRcdGFuY2hvcjogbmV3IGdvb2dsZS5tYXBzLlBvaW50KDAsIDE4KVxuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdHBvaW50ID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhhbWFya1snbGF0J10sIGFtYXJrWydsbmcnXSk7XG5cdFx0XHRcdHBvaW50ID0gdGhpcy5jaGVja0R1cGxpY2F0ZShwb2ludCk7XG5cdFx0XHRcdHRoaXMuY3JlYXRlTWFwTWFya2VyKHBvaW50LCBhbWFya1snaHRtbCddLCBtYXJrZXJpY29uLCAnJywgJycsIGFtYXJrWyd0aXRsZSddKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBzZXRNYXJrZXJJY29ucygpIHtcblx0XHQvLyBcdGJpY29uID0ge1xuXHRcdC8vIFx0XHRwYXRoOiAgICAgICAgICcvbWVkaWEvY29tX2tub3dyZXMvYXNzZXRzL2ltYWdlcy9zdmcnLFxuXHRcdC8vIFx0XHRmaWxsQ29sb3I6ICAgIHRoaXMuc2V0dGluZ3MubWFya2VyQ29sb3IsXG5cdFx0Ly8gXHRcdGZpbGxPcGFjaXR5OiAgMC45LFxuXHRcdC8vIFx0XHRhbmNob3I6ICAgICAgIG5ldyBnb29nbGUubWFwcy5Qb2ludCg5LCAzNSksXG5cdFx0Ly8gXHRcdHN0cm9rZUNvbG9yOiAgXCIjZWZlZmVmXCIsXG5cdFx0Ly8gXHRcdHN0cm9rZVdlaWdodDogMC41LFxuXHRcdC8vIFx0XHRzY2FsZTogICAgICAgIDFcblx0XHQvLyBcdH07XG5cdFx0Ly8gXHRoaWNvbiA9IHtcblx0XHQvLyBcdFx0cGF0aDogICAgICAgICAnL21lZGlhL2NvbV9rbm93cmVzL2Fzc2V0cy9pbWFnZXMvc3ZnJyxcblx0XHQvLyBcdFx0ZmlsbENvbG9yOiAgICBcImdyZWVuXCIsXG5cdFx0Ly8gXHRcdGZpbGxPcGFjaXR5OiAgMSxcblx0XHQvLyBcdFx0YW5jaG9yOiAgICAgICBuZXcgZ29vZ2xlLm1hcHMuUG9pbnQoOSwgMzUpLFxuXHRcdC8vIFx0XHRzdHJva2VDb2xvcjogIFwiI2VmZWZlZlwiLFxuXHRcdC8vIFx0XHRzdHJva2VXZWlnaHQ6IDAuOCxcblx0XHQvLyBcdFx0c2NhbGU6ICAgICAgICAxLjVcblx0XHQvLyBcdH07XG5cdFx0Ly8gfVxuXG5cdFx0Ly8gbG9vcCB0byBzZXQgcHJvcGVydHkgbWFya2Vyc1xuXHRcdHNldFByb3BlcnR5TWFya2VycygpIHtcblx0XHRcdGxldCBwb2ludDtcblx0XHRcdGxldCBhbWFyaztcblxuXHRcdFx0Zm9yIChsZXQgZCA9IDA7IGQgPCB0aGlzLnNldHRpbmdzLnByb3BlcnR5TWFya2Vycy5sZW5ndGg7IGQrKykge1xuXHRcdFx0XHRhbWFyayA9IHRoaXMuc2V0dGluZ3MucHJvcGVydHlNYXJrZXJzW2RdO1xuXG5cdFx0XHRcdGlmICghZCkge1xuXHRcdFx0XHRcdHByb3BlcnR5aWNvbiA9IHtcblx0XHRcdFx0XHRcdHVybDogICAgYW1hcmtbJ2ljb24nXSxcblx0XHRcdFx0XHRcdHNpemU6ICAgbmV3IGdvb2dsZS5tYXBzLlNpemUoMzIsIDM3KSxcblx0XHRcdFx0XHRcdG9yaWdpbjogbmV3IGdvb2dsZS5tYXBzLlBvaW50KDAsIDApLFxuXHRcdFx0XHRcdFx0YW5jaG9yOiBuZXcgZ29vZ2xlLm1hcHMuUG9pbnQoMCwgMjApXG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHBvaW50ID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhhbWFya1snbGF0J10sIGFtYXJrWydsbmcnXSk7XG5cdFx0XHRcdHBvaW50ID0gdGhpcy5jaGVja0R1cGxpY2F0ZShwb2ludCk7XG5cdFx0XHRcdHRoaXMuY3JlYXRlUHJvcGVydHlNYXJrZXIocG9pbnQsIGFtYXJrWydodG1sJ10sIGFtYXJrWydib3hpbmZvJ10sIGFtYXJrWydsaW5rJ10sIGFtYXJrWyd0aXRsZSddLCBhbWFya1snY29sb3InXSwgYW1hcmtbJ2lkJ10sIHByb3BlcnR5aWNvbiwgYW1hcmtbJ3BpZCddKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRzb2xvTWFwKCkge1xuXHRcdFx0dGhpcy5zZXRQcm9wZXJ0eU1hcmtlcnMoKTtcblx0XHRcdHRoaXMuc2V0TWFwTWFya2VycygpO1xuXG5cdFx0XHRtYXAuZml0Qm91bmRzKGJvdW5kcyk7XG5cdFx0XHR0aGlzLmNoZWNrWm9vbSgpO1xuXG5cdFx0XHRpZiAodGhpcy5zZXR0aW5ncy5tYXBNYXJrZXJzLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0Y29uc3Qgc2VsZiA9IHRoaXM7XG5cblx0XHRcdFx0bGV0IG15TGlzdGVuZXIgPSBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYXAsICdpZGxlJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdGxldCBmb3VuZCA9IDA7XG5cdFx0XHRcdFx0bGV0IGN1cnJlbnRab29tID0gbWFwLmdldFpvb20oKTtcblxuXHRcdFx0XHRcdHdoaWxlICghZm91bmQpIHtcblx0XHRcdFx0XHRcdGZvdW5kID0gS3JtYXAuc2hvd1Zpc2libGVNYXJrZXJzKHNlbGYuZ21hcmtlcnMpO1xuXG5cdFx0XHRcdFx0XHRpZiAoZm91bmQpIHtcblx0XHRcdFx0XHRcdFx0bXlMaXN0ZW5lci5yZW1vdmUoKTtcblx0XHRcdFx0XHRcdFx0bWFwLnNldFpvb20oY3VycmVudFpvb20pO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0Y3VycmVudFpvb20gPSBjdXJyZW50Wm9vbSAtIDE7XG5cdFx0XHRcdFx0XHRpZiAoY3VycmVudFpvb20gPCAxMCkge1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdCQoZnVuY3Rpb24gKCkge1xuXHRcdGxldCAkbWFwbW9kYWw7XG5cblx0XHQkKCdib2R5Jykub24oJ2NsaWNrJywgJy5tYXAtdHJpZ2dlcicsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRpZiAobWFwRGF0YSkge1xuXHRcdFx0XHRteUtybWFwLnJlZnJlc2hNYXAoJG1hcG1vZGFsKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGtpY2tNYXAoJCh0aGlzKSk7XG5cdFx0XHRcdCRtYXBtb2RhbCA9ICQoJyNrci1zZWFyY2gtbWFwLW1vZGFsJyk7XG5cdFx0XHRcdG5ldyBGb3VuZGF0aW9uLlJldmVhbCgkbWFwbW9kYWwpO1xuXHRcdFx0XHQkbWFwbW9kYWwuZm91bmRhdGlvbignb3BlbicpO1xuXHRcdFx0fVxuXHRcdH0pLm9uKCdjbGljaycsICcucmVzZXRtYXAnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0bXlLcm1hcC5yZXNldE1hcCgpO1xuXHRcdH0pLm9uKCdjbGljaycsICcja3Itc2VhcmNoLW1hcC1mdWxsLWluZm93aW5kb3ctY2xvc2UnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0S3JtYXAuY2xvc2VLckluZm93aW5kb3coKTtcblx0XHR9KS5vbignY2xpY2snLCAnLmNsb3NlbWFwJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdCRtYXBtb2RhbC5mb3VuZGF0aW9uKCdjbG9zZScpO1xuXHRcdFx0JC5hamF4KHtcblx0XHRcdFx0dHlwZTogICAgXCJQT1NUXCIsXG5cdFx0XHRcdHVybDogICAgIGxpdmVzaXRlICsgJ2luZGV4LnBocD9vcHRpb249Y29tX2tub3dyZXMmdGFzaz1wcm9wZXJ0aWVzLm1hcHNlc3Npb24mbGFuZz0nICsgbGFuZyxcblx0XHRcdFx0c3VjY2VzczogZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9KS5vbignb3Blbi56Zi5yZXZlYWwnLCAnI2tyLXNlYXJjaC1tYXAtbW9kYWwnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0JCgnI2tyLXNlYXJjaC1tYXAtZnVsbCcpLmhlaWdodCgkKCcja3Itc2VhcmNoLW1hcC1tb2RhbCcpLmhlaWdodCgpKTtcblx0XHRcdGdvb2dsZS5tYXBzLmV2ZW50LnRyaWdnZXIobWFwLCBcInJlc2l6ZVwiKTtcblx0XHRcdCQuYWpheCh7XG5cdFx0XHRcdHR5cGU6ICAgIFwiUE9TVFwiLFxuXHRcdFx0XHR1cmw6ICAgICBsaXZlc2l0ZSArICdpbmRleC5waHA/b3B0aW9uPWNvbV9rbm93cmVzJnRhc2s9cHJvcGVydGllcy5tYXBzZXNzaW9uJmxhbmc9JyArIGxhbmcsXG5cdFx0XHRcdGRhdGE6ICAgIHttYXBfbW9kYWw6ICcxJ30sXG5cdFx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0XHQvLyBEb2Vzbid0IHRyaWdnZXIgaWYgaW5jbHVkZWQgYWJvdmUgPz9cblx0XHRpZiAoIW1hcERhdGEpIHtcblx0XHRcdGNvbnN0ICRzb2xvVHJpZ2dlciA9ICQoJyNrci1tYXAtc29sby10cmlnZ2VyJyk7XG5cdFx0XHQkc29sb1RyaWdnZXIub25lKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0a2lja01hcCgkc29sb1RyaWdnZXIpO1xuXHRcdFx0fSk7XG5cblx0XHRcdGlmICh3aW5kb3cubG9jYXRpb24uaHJlZi5pbmRleE9mKCcjbWFwJykgIT09IC0xICYmICRzb2xvVHJpZ2dlci5sZW5ndGgpIHtcblx0XHRcdFx0a2lja01hcCgkc29sb1RyaWdnZXIpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIFRlc3QgZm9yIGZvcmNlIG1hcFxuXHRcdGNvbnN0ICR0cmlnZ2VyID0gJCgnLm1hcC10cmlnZ2VyJyk7XG5cdFx0aWYgKCR0cmlnZ2VyLmRhdGEoJ2ZvcmNlbWFwJykpIHtcblx0XHRcdCR0cmlnZ2VyLnRyaWdnZXIoJ2NsaWNrJyk7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24ga2lja01hcCgkZWxlbSkge1xuXHRcdFx0Y29uc3QgdHlwZSA9ICRlbGVtLmRhdGEoJ3R5cGUnKTtcblx0XHRcdGxldCBwaWQgPSAwO1xuXHRcdFx0aWYgKHR5cGUgPT09ICdzb2xvJykge1xuXHRcdFx0XHRwaWQgPSAkZWxlbS5kYXRhKCdwaWQnKTtcblx0XHRcdH1cblxuXHRcdFx0alF1ZXJ5LmFqYXgoe1xuXHRcdFx0XHR1cmw6ICAgICAgbGl2ZXNpdGUgKyAnaW5kZXgucGhwP29wdGlvbj1jb21fa25vd3JlcyZ0YXNrPXByb3BlcnRpZXMubWFwZGF0YSZwaWQ9JyArIHBpZCArICcmbGFuZz0nICsgbGFuZyxcblx0XHRcdFx0dHlwZTogICAgIFwiUE9TVFwiLFxuXHRcdFx0XHRkYXRhVHlwZTogXCJqc29uXCIsXG5cdFx0XHRcdHN1Y2Nlc3M6ICBmdW5jdGlvbiAocmVzdWx0KSB7XG5cdFx0XHRcdFx0aWYgKHJlc3VsdC5zdWNjZXNzKSB7XG5cdFx0XHRcdFx0XHRzZXR0aW5ncyA9IHtcblx0XHRcdFx0XHRcdFx0bWFwSWQ6ICAgICAgICAgICAkZWxlbS5kYXRhKCd0YXJnZXQnKSxcblx0XHRcdFx0XHRcdFx0bWFwVHlwZTogICAgICAgICAkZWxlbS5kYXRhKCd0eXBlJyksXG5cdFx0XHRcdFx0XHRcdG1hcFR5cGVJZDogICAgICAgJGVsZW0uZGF0YSgnbWFwdHlwZWlkJyksXG5cdFx0XHRcdFx0XHRcdG1hcFpvb206ICAgICAgICAgcGFyc2VJbnQoJGVsZW0uZGF0YSgnem9vbScpKSxcblx0XHRcdFx0XHRcdFx0bWFwTWF4Wm9vbTogICAgICBwYXJzZUludCgkZWxlbS5kYXRhKCd6b29tbWF4JykpLFxuXHRcdFx0XHRcdFx0XHRwcm9wZXJ0eU1hcmtlcnM6IHJlc3VsdC5kYXRhLnByb3BlcnR5TWFya2Vycyxcblx0XHRcdFx0XHRcdFx0bWFwTWFya2VyczogICAgICByZXN1bHQuZGF0YS5tYXBNYXJrZXJzLFxuXHRcdFx0XHRcdFx0XHRmaWx0ZXJJZHM6ICAgICAgIHJlc3VsdC5kYXRhLmZpbHRlcklkc1xuXHRcdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdFx0bXlLcm1hcCA9IG5ldyBLcm1hcChzZXR0aW5ncyk7XG5cdFx0XHRcdFx0XHRtYXBEYXRhID0gdHJ1ZTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0YWxlcnQocmVzdWx0Lm1lc3NhZ2UpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9KTtcbn0oalF1ZXJ5KSk7IiwiLyoqXG4gKiBAcGFja2FnZSAgICBLbm93IFJlc2VydmF0aW9uc1xuICogQHN1YnBhY2thZ2UgU2l0ZSBKU1xuICogQGNvcHlyaWdodCAgMjAyMCBIaWdobGFuZCBWaXNpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBAbGljZW5zZSAgICBTZWUgdGhlIGZpbGUgXCJMSUNFTlNFLnR4dFwiIGZvciB0aGUgZnVsbCBsaWNlbnNlIGdvdmVybmluZyB0aGlzIGNvZGUuXG4gKiBAYXV0aG9yICAgICBIYXplbCBXaWxzb24gPGhhemVsQGhpZ2hsYW5kdmlzaW9uLmNvbT5cbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgkKSB7XG5cdGxldCBteUtycm91dGU7XG5cdGxldCBkaXJlY3Rpb25zRGlzcGxheTtcblx0bGV0IGRpcmVjdGlvbnNWaXNpYmxlID0gZmFsc2U7XG5cdGxldCByb3V0ZU1hcDtcblx0bGV0IG9yaWdpbjtcblx0bGV0IGRlc3RpbmF0aW9uO1xuXHRsZXQgcm91dGVNYXJrZXJzID0gW107XG5cdGxldCByb3V0ZVN0b3BQb2ludHMgPSBbXTtcblx0bGV0IHBvaW50O1xuXHRsZXQgc2VsZjtcblxuXHRsZXQgc2V0dGluZ3MgPSB7XG5cdFx0bGF0OiAgICAgICAgICAgICAgIFwiXCIsXG5cdFx0bG5nOiAgICAgICAgICAgICAgIFwiXCIsXG5cdFx0bmFtZTogICAgICAgICAgICAgIFwiXCIsXG5cdFx0aWNvbjogICAgICAgICAgICAgIFwiXCIsXG5cdFx0ZGV0b3VyOiAgICAgICAgICAgIFwiXCIsXG5cdFx0bWFwWm9vbTogICAgICAgICAgIDksXG5cdFx0bWFwTWF4Wm9vbTogICAgICAgIDIwLFxuXHRcdG1hcFR5cGVJZDogICAgICAgICBcInJvYWRtYXBcIixcblx0XHRtYXBJZDogICAgICAgICAgICAgXCJrci1tYXAtcm91dGVcIixcblx0XHRkaXJlY3Rpb25zUGFuZWw6ICAgXCJrci1kaXJlY3Rpb25zLXBhbmVsXCIsXG5cdFx0ZGlyZWN0aW9uc1NlcnZpY2U6IG51bGxcblx0fTtcblxuXHRjbGFzcyBLcnJvdXRlIHtcblx0XHRjb25zdHJ1Y3RvcigkZWxlbWVudCwgb3B0aW9ucykge1xuXHRcdFx0dGhpcy5zZXR0aW5ncyA9IHNldHRpbmdzO1xuXHRcdFx0aWYgKG9wdGlvbnMpIHtcblx0XHRcdFx0JC5leHRlbmQodGhpcy5zZXR0aW5ncywgb3B0aW9ucyk7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuc2V0dGluZ3MuZGlyZWN0aW9uc1NlcnZpY2UgPSBuZXcgZ29vZ2xlLm1hcHMuRGlyZWN0aW9uc1NlcnZpY2UoKTtcblx0XHRcdHRoaXMuaW5pdCgpO1xuXHRcdH1cblxuXHRcdHN0YXRpYyBjbGVhclJvdXRlTWFya2VycygpIHtcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcm91dGVNYXJrZXJzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdHJvdXRlTWFya2Vyc1tpXS5zZXRNYXAobnVsbCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0c3RhdGljIGNsZWFyV2F5cG9pbnRzKCkge1xuXHRcdFx0b3JpZ2luID0gbnVsbDtcblx0XHRcdHJvdXRlTWFya2VycyA9IFtdO1xuXHRcdFx0cm91dGVTdG9wUG9pbnRzID0gW107XG5cdFx0XHRkaXJlY3Rpb25zVmlzaWJsZSA9IGZhbHNlO1xuXHRcdH1cblxuXHRcdGFkZFJvdXRlTWFya2VyKGxhdGxuZykge1xuXHRcdFx0cm91dGVNYXJrZXJzLnB1c2gobmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XG5cdFx0XHRcdHBvc2l0aW9uOiBsYXRsbmcsXG5cdFx0XHRcdG1hcDogICAgICByb3V0ZU1hcCxcblx0XHRcdFx0aWNvbjogICAgIHRoaXMuc2V0dGluZ3MuZGV0b3VyXG5cdFx0XHR9KSk7XG5cdFx0fVxuXG5cdFx0Ly9cblx0XHQvLyBhZGRQcm9wZXJ0eU1hcmtlcihwb2ludCwgaHRtbCwgaW1hZ2UsIGJveGluZm8pIHtcblx0XHQvLyBcdGxldCBtYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcblx0XHQvLyBcdFx0cG9zaXRpb246IHBvaW50LFxuXHRcdC8vIFx0XHRodG1sOiAgICAgaHRtbCxcblx0XHQvLyBcdFx0bWFwOiAgICAgIHJvdXRlTWFwLFxuXHRcdC8vIFx0XHRpY29uOiAgICAgaW1hZ2UsXG5cdFx0Ly8gXHRcdHpJbmRleDogICAxXG5cdFx0Ly8gXHR9KTtcblx0XHQvL1xuXHRcdC8vIFx0bGV0IGluZm93aW5kb3cgPSBuZXcgZ29vZ2xlLm1hcHMuSW5mb1dpbmRvdyh7XG5cdFx0Ly8gXHRcdGNvbnRlbnQ6IGJveGluZm9cblx0XHQvLyBcdH0pO1xuXHRcdC8vXG5cdFx0Ly8gXHRnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYXJrZXIsICdjbGljaycsIGZ1bmN0aW9uICgpIHtcblx0XHQvLyBcdFx0Ly8gQ2hlY2sgdG8gc2VlIGlmIHRoZXJlIGlzIGFuIGluZm8gd2luZG93IHN0b3JlZCBpbiByb3V0ZUN1cnJJbmZvV2luZG93LFxuXHRcdC8vIFx0XHQvLyBpZiB0aGVyZSBpcywgd2UgdXNlIC5jbG9zZSgpIHRvIGhpZGUgdGhlIHdpbmRvd1xuXHRcdC8vIFx0XHRpZiAocm91dGVDdXJySW5mb1dpbmRvdykge1xuXHRcdC8vIFx0XHRcdHJvdXRlQ3VyckluZm9XaW5kb3cuY2xvc2UoKTtcblx0XHQvLyBcdFx0fVxuXHRcdC8vIFx0XHQvLyBQdXQgb3VyIG5ldyBpbmZvIHdpbmRvdyBpbiB0byB0aGUgcm91dGVDdXJySW5mb1dpbmRvdyB2YXJpYWJsZVxuXHRcdC8vIFx0XHRyb3V0ZUN1cnJJbmZvV2luZG93ID0gaW5mb3dpbmRvdztcblx0XHQvLyBcdFx0Ly8gT3BlbiB0aGUgd2luZG93XG5cdFx0Ly8gXHRcdGluZm93aW5kb3cub3Blbihyb3V0ZU1hcCwgbWFya2VyKTtcblx0XHQvLyBcdH0pO1xuXHRcdC8vXG5cdFx0Ly8gXHQvL2dtYXJrZXJzLnB1c2goIG1hcmtlciApO1xuXHRcdC8vIFx0cm91dGVNYXJrZXJzLnB1c2gobWFya2VyKTtcblx0XHQvLyB9XG5cblx0XHQvLyBzdGF0aWMgdXBkYXRlTW9kZSgpIHtcblx0XHQvLyBcdGlmIChkaXJlY3Rpb25zVmlzaWJsZSkge1xuXHRcdC8vIFx0XHR0aGlzLmNhbGNSb3V0ZSgpO1xuXHRcdC8vIFx0fVxuXHRcdC8vIH1cblxuXHRcdGNhbGNSb3V0ZSgpIHtcblx0XHRcdGxldCBmcm9tX2FkZHJlc3MgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZyb21fYWRkcmVzc1wiKS52YWx1ZTtcblx0XHRcdGxldCBvcmlnaW4gPSBcIlwiO1xuXG5cdFx0XHRpZiAoZnJvbV9hZGRyZXNzID09PSBcIkFkZHJlc3NcIikgZnJvbV9hZGRyZXNzID0gXCJcIjtcblx0XHRcdGlmIChmcm9tX2FkZHJlc3MpIG9yaWdpbiA9IGZyb21fYWRkcmVzcyArIFwiLFwiICsgXCJcIjtcblxuXHRcdFx0bGV0IG1vZGU7XG5cdFx0XHRzd2l0Y2ggKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW9kZVwiKS52YWx1ZSkge1xuXHRcdFx0XHRjYXNlIFwiYmljeWNsaW5nXCI6XG5cdFx0XHRcdFx0bW9kZSA9IGdvb2dsZS5tYXBzLkRpcmVjdGlvbnNUcmF2ZWxNb2RlLkJJQ1lDTElORztcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcImRyaXZpbmdcIjpcblx0XHRcdFx0XHRtb2RlID0gZ29vZ2xlLm1hcHMuRGlyZWN0aW9uc1RyYXZlbE1vZGUuRFJJVklORztcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcIndhbGtpbmdcIjpcblx0XHRcdFx0XHRtb2RlID0gZ29vZ2xlLm1hcHMuRGlyZWN0aW9uc1RyYXZlbE1vZGUuV0FMS0lORztcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0aWYgKG9yaWdpbikge1xuXHRcdFx0XHRsZXQgcmVxdWVzdCA9IHtcblx0XHRcdFx0XHRvcmlnaW46ICAgICAgICBvcmlnaW4sXG5cdFx0XHRcdFx0ZGVzdGluYXRpb246ICAgZGVzdGluYXRpb24sXG5cdFx0XHRcdFx0d2F5cG9pbnRzOiAgICAgcm91dGVTdG9wUG9pbnRzLFxuXHRcdFx0XHRcdHRyYXZlbE1vZGU6ICAgIG1vZGUsXG5cdFx0XHRcdFx0YXZvaWRIaWdod2F5czogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hpZ2h3YXlzJykuY2hlY2tlZCxcblx0XHRcdFx0XHRhdm9pZFRvbGxzOiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9sbHMnKS5jaGVja2VkXG5cdFx0XHRcdH07XG5cblx0XHRcdFx0c2VsZiA9IHRoaXM7XG5cdFx0XHRcdHRoaXMuc2V0dGluZ3MuZGlyZWN0aW9uc1NlcnZpY2Uucm91dGUocmVxdWVzdCwgZnVuY3Rpb24gKHJlc3BvbnNlLCBzdGF0dXMpIHtcblx0XHRcdFx0XHRpZiAoc3RhdHVzID09PSBnb29nbGUubWFwcy5EaXJlY3Rpb25zU3RhdHVzLk9LKSB7XG5cdFx0XHRcdFx0XHRkaXJlY3Rpb25zRGlzcGxheS5zZXREaXJlY3Rpb25zKHJlc3BvbnNlKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0YWxlcnQoXCJHb29nbGUgY291bGRuYHQgY2FsY3VsYXRlIGRpcmVjdGlvbnMgZm9yIHRoaXMgcm91dGUgYW5kIHNlbGVjdGVkIG9wdGlvbnNcIik7XG5cdFx0XHRcdFx0XHRzZWxmLnJlc2V0Um91dGUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXG5cdFx0XHRLcnJvdXRlLmNsZWFyUm91dGVNYXJrZXJzKCk7XG5cdFx0XHRkaXJlY3Rpb25zVmlzaWJsZSA9IHRydWU7XG5cdFx0fVxuXG5cdFx0aW5pdCgpIHtcblx0XHRcdGRlc3RpbmF0aW9uID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyh0aGlzLnNldHRpbmdzLmxhdCwgdGhpcy5zZXR0aW5ncy5sbmcpO1xuXG5cdFx0XHQvL0luaXRpYWxpc2UgbWFwIG9wdGlvbnNcblx0XHRcdHRoaXMubXlPcHRpb25zID0ge1xuXHRcdFx0XHRzY3JvbGx3aGVlbDogICAgICAgZmFsc2UsXG5cdFx0XHRcdHpvb206ICAgICAgICAgICAgICB0aGlzLnNldHRpbmdzLm1hcFpvb20sXG5cdFx0XHRcdG1heFpvb206ICAgICAgICAgICB0aGlzLnNldHRpbmdzLm1hcE1heFpvb20sXG5cdFx0XHRcdG1hcFR5cGVJZDogICAgICAgICB0aGlzLnNldHRpbmdzLm1hcFR5cGVJZCxcblx0XHRcdFx0c3RyZWV0Vmlld0NvbnRyb2w6IGZhbHNlLFxuXHRcdFx0XHRjZW50ZXI6ICAgICAgICAgICAgZGVzdGluYXRpb25cblx0XHRcdH07XG5cblx0XHRcdHJvdXRlTWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnNldHRpbmdzLm1hcElkKSwgdGhpcy5teU9wdGlvbnMpO1xuXHRcdFx0ZGlyZWN0aW9uc0Rpc3BsYXkgPSBuZXcgZ29vZ2xlLm1hcHMuRGlyZWN0aW9uc1JlbmRlcmVyKCk7XG5cdFx0XHRkaXJlY3Rpb25zRGlzcGxheS5zZXRNYXAocm91dGVNYXApO1xuXHRcdFx0ZGlyZWN0aW9uc0Rpc3BsYXkuc2V0UGFuZWwoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5zZXR0aW5ncy5kaXJlY3Rpb25zUGFuZWwpKTtcblxuXHRcdFx0Y29uc3QgaW1hZ2UgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VySW1hZ2UodGhpcy5zZXR0aW5ncy5pY29uKTtcblx0XHRcdHBvaW50ID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyh0aGlzLnNldHRpbmdzLmxhdCwgdGhpcy5zZXR0aW5ncy5sbmcpO1xuXG5cdFx0XHRzZWxmID0gdGhpcztcblx0XHRcdGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKHJvdXRlTWFwLCAnY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRcdFx0aWYgKHJvdXRlU3RvcFBvaW50cy5sZW5ndGggPCA5KSB7XG5cdFx0XHRcdFx0cm91dGVTdG9wUG9pbnRzLnB1c2goe2xvY2F0aW9uOiBldmVudC5sYXRMbmcsIHN0b3BvdmVyOiB0cnVlfSk7XG5cdFx0XHRcdFx0cG9pbnQgPSBldmVudC5sYXRMbmc7XG5cdFx0XHRcdFx0c2VsZi5hZGRSb3V0ZU1hcmtlcihwb2ludCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0YWxlcnQoXCJNYXhpbXVtIG51bWJlciBvZiA5IHdheXBvaW50cyByZWFjaGVkXCIpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0c2VsZiA9IHRoaXM7XG5cdFx0XHRnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lck9uY2Uocm91dGVNYXAsICdpZGxlJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRnb29nbGUubWFwcy5ldmVudC50cmlnZ2VyKHJvdXRlTWFwLCAncmVzaXplJyk7XG5cdFx0XHRcdHNlbGYuY2FsY1JvdXRlKCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRyZXNldFJvdXRlKCkge1xuXHRcdFx0S3Jyb3V0ZS5jbGVhclJvdXRlTWFya2VycygpO1xuXHRcdFx0S3Jyb3V0ZS5jbGVhcldheXBvaW50cygpO1xuXHRcdFx0ZGlyZWN0aW9uc0Rpc3BsYXkuc2V0TWFwKG51bGwpO1xuXHRcdFx0ZGlyZWN0aW9uc0Rpc3BsYXkuc2V0UGFuZWwobnVsbCk7XG5cdFx0XHRkaXJlY3Rpb25zRGlzcGxheSA9IG5ldyBnb29nbGUubWFwcy5EaXJlY3Rpb25zUmVuZGVyZXIoKTtcblx0XHRcdGRpcmVjdGlvbnNEaXNwbGF5LnNldE1hcChyb3V0ZU1hcCk7XG5cdFx0XHRkaXJlY3Rpb25zRGlzcGxheS5zZXRQYW5lbChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnNldHRpbmdzLmRpcmVjdGlvblBhbmVsKSk7XG5cblx0XHRcdHRoaXMuaW5pdCgpO1xuXHRcdH1cblx0fVxuXG5cdCQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcblx0XHQkKFwiLmtyLWRpcmVjdGlvbnMtbW9kYWxcIikub24oJ2NsaWNrJywgJyNrci1tYXAtcm91dGUnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0bGV0ICRlbGVtZW50ID0gJCh0aGlzKTtcblx0XHRcdGNvbnN0IG9wdGlvbnMgPSB7XG5cdFx0XHRcdGxhdDogICAgJGVsZW1lbnQuZGF0YSgnbGF0JyksXG5cdFx0XHRcdGxuZzogICAgJGVsZW1lbnQuZGF0YSgnbG5nJyksXG5cdFx0XHRcdG5hbWU6ICAgJGVsZW1lbnQuZGF0YSgnbmFtZScpLFxuXHRcdFx0XHRpY29uOiAgICRlbGVtZW50LmRhdGEoJ2ljb24nKSxcblx0XHRcdFx0ZGV0b3VyOiAkZWxlbWVudC5kYXRhKCdkZXRvdXInKVxuXHRcdFx0fTtcblx0XHRcdG15S3Jyb3V0ZSA9IG5ldyBLcnJvdXRlKCRlbGVtZW50LCBvcHRpb25zKTtcblx0XHR9KS5vbignY2xpY2snLCAnLnJlc2V0cm91dGUnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0bXlLcnJvdXRlLnJlc2V0Um91dGUoKTtcblx0XHR9KS5vbignY2xpY2snLCAnLmNhbGNyb3V0ZScsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRteUtycm91dGUuY2FsY1JvdXRlKCk7XG5cdFx0fSk7XG5cblx0XHRqUXVlcnkoXCJhI2dlb2NvZGVBZGRyZXNzXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdGxldCBhZGRyZXNzU3RyaW5nID1cblx0XHRcdFx0ICAgIGpRdWVyeShcIiNqZm9ybV9wcm9wZXJ0eV9zdHJlZXRcIikudmFsKClcblx0XHRcdFx0ICAgICsgXCIsIFwiXG5cdFx0XHRcdCAgICArIGpRdWVyeSgnI2pmb3JtX3Rvd25faWQnKS5maW5kKFwiOnNlbGVjdGVkXCIpLnRleHQoKVxuXHRcdFx0XHQgICAgKyBcIiBcIlxuXHRcdFx0XHQgICAgKyBqUXVlcnkoXCIjamZvcm1fcHJvcGVydHlfcG9zdGNvZGVcIikudmFsKClcblx0XHRcdFx0ICAgICsgXCIsIFwiXG5cdFx0XHRcdCAgICArIGpRdWVyeSgnI2pmb3JtX3JlZ2lvbl9pZCcpLmZpbmQoXCI6c2VsZWN0ZWRcIikudGV4dCgpXG5cdFx0XHRcdCAgICArIFwiIFwiXG5cdFx0XHRcdCAgICArIGpRdWVyeSgnI2pmb3JtX2NvdW50cnlfaWQnKS5maW5kKFwiOnNlbGVjdGVkXCIpLnRleHQoKTtcblxuXHRcdFx0bGV0IHVybCA9ICdpbmRleC5waHA/b3B0aW9uPWNvbV9rbm93cmVzJnRhc2s9cHJvcGVydHkuZ2VvY29kZSc7XG5cdFx0XHRsZXQgY29vcmQgPSBbXTtcblxuXHRcdFx0alF1ZXJ5LmFqYXgoe1xuXHRcdFx0XHR0eXBlOiAgICAgXCJQT1NUXCIsXG5cdFx0XHRcdHVybDogICAgICB1cmwsXG5cdFx0XHRcdGRhdGE6ICAgICB7YWRkcmVzczogYWRkcmVzc1N0cmluZ30sXG5cdFx0XHRcdGRhdGFUeXBlOiBcImpzb25cIixcblx0XHRcdFx0c3VjY2VzczogIGZ1bmN0aW9uIChqc29uZGF0YSkge1xuXHRcdFx0XHRcdGpRdWVyeS5lYWNoKGpzb25kYXRhLCBmdW5jdGlvbiAoa2V5LCB2YWwpIHtcblx0XHRcdFx0XHRcdGxldCBkaXYgPSBcIiNcIiArIGtleTtcblx0XHRcdFx0XHRcdGpRdWVyeShkaXYpLnZhbCh2YWwpO1xuXHRcdFx0XHRcdFx0Y29vcmRba2V5XSA9IHZhbDtcblx0XHRcdFx0XHRcdG15R21hcC5yZWZyZXNoTWFwKGNvb3JkWydsYXQnXSwgY29vcmRbJ2xuZyddLCBmYWxzZSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9KTtcbn0oalF1ZXJ5KSk7IiwiLy8gS1IgQVBQIEpTIEZpbGVzXG5pbXBvcnQgJ25wbS9qcXVlcnktYmFyLXJhdGluZy9qcXVlcnkuYmFycmF0aW5nJztcbmltcG9ydCAnbnBtL2lzLW1hcmtlci1jbHVzdGVyZXInO1xuaW1wb3J0ICdtZWRpYWpzL3NpdGUvYXBwJztcbi8vaW1wb3J0ICdtZWRpYWpzL3NpdGUvY29tYm9nZW8nO1xuaW1wb3J0ICdtZWRpYWpzL3NpdGUvY29uZmlybSc7XG5pbXBvcnQgJ21lZGlhanMvc2l0ZS9kb2JlbnRyeSc7XG5pbXBvcnQgJ21lZGlhanMvc2l0ZS9ndWVzdGRhdGEnO1xuaW1wb3J0ICdtZWRpYWpzL3NpdGUvbWFwJztcbmltcG9ydCAnbWVkaWFqcy9zaXRlL3JvdXRlJztcbi8vIGltcG9ydCAnLi9qcy9zcmMva3JhcHAvc3RyaXBlJzsiXSwibmFtZXMiOlsiTWFya2VyQ2x1c3RlcmVyIiwibWFwIiwib3B0X21hcmtlcnMiLCJvcHRfb3B0aW9ucyIsImV4dGVuZCIsImdvb2dsZSIsIm1hcHMiLCJPdmVybGF5VmlldyIsIm1hcF8iLCJtYXJrZXJzXyIsImNsdXN0ZXJzXyIsInNpemVzIiwic3R5bGVzXyIsInJlYWR5XyIsIm9wdGlvbnMiLCJncmlkU2l6ZV8iLCJtaW5DbHVzdGVyU2l6ZV8iLCJtYXhab29tXyIsImltYWdlUGF0aF8iLCJNQVJLRVJfQ0xVU1RFUl9JTUFHRV9QQVRIXyIsImltYWdlRXh0ZW5zaW9uXyIsIk1BUktFUl9DTFVTVEVSX0lNQUdFX0VYVEVOU0lPTl8iLCJ6b29tT25DbGlja18iLCJ1bmRlZmluZWQiLCJhdmVyYWdlQ2VudGVyXyIsInNldHVwU3R5bGVzXyIsInNldE1hcCIsInByZXZab29tXyIsImdldFpvb20iLCJ0aGF0IiwiZXZlbnQiLCJhZGRMaXN0ZW5lciIsInpvb20iLCJyZXNldFZpZXdwb3J0IiwicmVkcmF3IiwibGVuZ3RoIiwiYWRkTWFya2VycyIsInByb3RvdHlwZSIsIm9iajEiLCJvYmoyIiwib2JqZWN0IiwicHJvcGVydHkiLCJhcHBseSIsIm9uQWRkIiwic2V0UmVhZHlfIiwiZHJhdyIsImkiLCJzaXplIiwicHVzaCIsInVybCIsImhlaWdodCIsIndpZHRoIiwiZml0TWFwVG9NYXJrZXJzIiwibWFya2VycyIsImdldE1hcmtlcnMiLCJib3VuZHMiLCJMYXRMbmdCb3VuZHMiLCJtYXJrZXIiLCJnZXRQb3NpdGlvbiIsImZpdEJvdW5kcyIsInNldFN0eWxlcyIsInN0eWxlcyIsImdldFN0eWxlcyIsImlzWm9vbU9uQ2xpY2siLCJpc0F2ZXJhZ2VDZW50ZXIiLCJnZXRUb3RhbE1hcmtlcnMiLCJzZXRNYXhab29tIiwibWF4Wm9vbSIsImdldE1heFpvb20iLCJjYWxjdWxhdG9yXyIsIm51bVN0eWxlcyIsImluZGV4IiwiY291bnQiLCJkdiIsInBhcnNlSW50IiwiTWF0aCIsIm1pbiIsInRleHQiLCJzZXRDYWxjdWxhdG9yIiwiY2FsY3VsYXRvciIsImdldENhbGN1bGF0b3IiLCJvcHRfbm9kcmF3IiwicHVzaE1hcmtlclRvXyIsImlzQWRkZWQiLCJyZXBhaW50IiwiYWRkTWFya2VyIiwicmVtb3ZlTWFya2VyXyIsImluZGV4T2YiLCJtIiwic3BsaWNlIiwicmVtb3ZlTWFya2VyIiwicmVtb3ZlZCIsInJlbW92ZU1hcmtlcnMiLCJyIiwicmVhZHkiLCJjcmVhdGVDbHVzdGVyc18iLCJnZXRUb3RhbENsdXN0ZXJzIiwiZ2V0TWFwIiwiZ2V0R3JpZFNpemUiLCJzZXRHcmlkU2l6ZSIsImdldE1pbkNsdXN0ZXJTaXplIiwic2V0TWluQ2x1c3RlclNpemUiLCJnZXRFeHRlbmRlZEJvdW5kcyIsInByb2plY3Rpb24iLCJnZXRQcm9qZWN0aW9uIiwidHIiLCJMYXRMbmciLCJnZXROb3J0aEVhc3QiLCJsYXQiLCJsbmciLCJibCIsImdldFNvdXRoV2VzdCIsInRyUGl4IiwiZnJvbUxhdExuZ1RvRGl2UGl4ZWwiLCJ4IiwieSIsImJsUGl4IiwibmUiLCJmcm9tRGl2UGl4ZWxUb0xhdExuZyIsInN3IiwiaXNNYXJrZXJJbkJvdW5kc18iLCJjb250YWlucyIsImNsZWFyTWFya2VycyIsIm9wdF9oaWRlIiwiY2x1c3RlciIsInJlbW92ZSIsIm9sZENsdXN0ZXJzIiwic2xpY2UiLCJ3aW5kb3ciLCJzZXRUaW1lb3V0IiwiZGlzdGFuY2VCZXR3ZWVuUG9pbnRzXyIsInAxIiwicDIiLCJSIiwiZExhdCIsIlBJIiwiZExvbiIsImEiLCJzaW4iLCJjb3MiLCJjIiwiYXRhbjIiLCJzcXJ0IiwiZCIsImFkZFRvQ2xvc2VzdENsdXN0ZXJfIiwiZGlzdGFuY2UiLCJjbHVzdGVyVG9BZGRUbyIsInBvcyIsImNlbnRlciIsImdldENlbnRlciIsImlzTWFya2VySW5DbHVzdGVyQm91bmRzIiwiQ2x1c3RlciIsIm1hcEJvdW5kcyIsImdldEJvdW5kcyIsIm1hcmtlckNsdXN0ZXJlciIsIm1hcmtlckNsdXN0ZXJlcl8iLCJjZW50ZXJfIiwiYm91bmRzXyIsImNsdXN0ZXJJY29uXyIsIkNsdXN0ZXJJY29uIiwiaXNNYXJrZXJBbHJlYWR5QWRkZWQiLCJjYWxjdWxhdGVCb3VuZHNfIiwibCIsImxlbiIsInVwZGF0ZUljb24iLCJnZXRNYXJrZXJDbHVzdGVyZXIiLCJnZXRTaXplIiwibXoiLCJoaWRlIiwic3VtcyIsInNldENlbnRlciIsInNldFN1bXMiLCJzaG93Iiwib3B0X3BhZGRpbmciLCJwYWRkaW5nXyIsImNsdXN0ZXJfIiwiZGl2XyIsInN1bXNfIiwidmlzaWJsZV8iLCJ0cmlnZ2VyQ2x1c3RlckNsaWNrIiwidHJpZ2dlciIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImdldFBvc0Zyb21MYXRMbmdfIiwic3R5bGUiLCJjc3NUZXh0IiwiY3JlYXRlQ3NzIiwiaW5uZXJIVE1MIiwicGFuZXMiLCJnZXRQYW5lcyIsIm92ZXJsYXlNb3VzZVRhcmdldCIsImFwcGVuZENoaWxkIiwiYWRkRG9tTGlzdGVuZXIiLCJsYXRsbmciLCJ3aWR0aF8iLCJoZWlnaHRfIiwidG9wIiwibGVmdCIsImRpc3BsYXkiLCJvblJlbW92ZSIsInBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsInRleHRfIiwiaW5kZXhfIiwidXNlU3R5bGUiLCJtYXgiLCJ1cmxfIiwidGV4dENvbG9yXyIsImFuY2hvcl8iLCJ0ZXh0U2l6ZV8iLCJmb250RmFtaWx5XyIsImZvbnRXZWlnaHRfIiwiYmFja2dyb3VuZFBvc2l0aW9uXyIsImJhY2tncm91bmRQb3NpdGlvbiIsInR4dENvbG9yIiwidHh0U2l6ZSIsImZvbnRGYW1pbHkiLCJmb250V2VpZ2h0Iiwiam9pbiIsImdsb2JhbCIsIm1vZHVsZSIsImV4cG9ydHMiLCJmYWN0b3J5IiwiZGVmaW5lIiwiYW1kIiwicmVxdWlyZSIsImpRdWVyeSIsIiQiLCJCYXJSYXRpbmciLCJzZWxmIiwid3JhcEVsZW1lbnQiLCJjbGFzc2VzIiwidGhlbWUiLCIkZWxlbSIsIndyYXAiLCJ1bndyYXBFbGVtZW50IiwidW53cmFwIiwiZmluZE9wdGlvbiIsInZhbHVlIiwiaXNOdW1lcmljIiwiZmxvb3IiLCJnZXRJbml0aWFsT3B0aW9uIiwiaW5pdGlhbFJhdGluZyIsImdldEVtcHR5T3B0aW9uIiwiJGVtcHR5T3B0IiwiZmluZCIsImVtcHR5VmFsdWUiLCJhbGxvd0VtcHR5IiwicHJlcGVuZFRvIiwiZ2V0RGF0YSIsImtleSIsImRhdGEiLCJzZXREYXRhIiwic2F2ZURhdGFPbkVsZW1lbnQiLCIkb3B0IiwidmFsIiwiZW1wdHlUZXh0IiwidXNlck9wdGlvbnMiLCJyYXRpbmdWYWx1ZSIsInJhdGluZ1RleHQiLCJvcmlnaW5hbFJhdGluZ1ZhbHVlIiwib3JpZ2luYWxSYXRpbmdUZXh0IiwiZW1wdHlSYXRpbmdWYWx1ZSIsImVtcHR5UmF0aW5nVGV4dCIsInJlYWRPbmx5IiwicmVhZG9ubHkiLCJyYXRpbmdNYWRlIiwicmVtb3ZlRGF0YU9uRWxlbWVudCIsInJlbW92ZURhdGEiLCJidWlsZFdpZGdldCIsIiR3IiwiZWFjaCIsImh0bWwiLCIkYSIsInNob3dWYWx1ZXMiLCJhcHBlbmQiLCJzaG93U2VsZWN0ZWRSYXRpbmciLCJyZXZlcnNlIiwiYWRkQ2xhc3MiLCJuZXh0QWxsb3JQcmV2aW91c0FsbCIsInNldFNlbGVjdEZpZWxkVmFsdWUiLCJwcm9wIiwiY2hhbmdlIiwicmVzZXRTZWxlY3RGaWVsZCIsImRlZmF1bHRTZWxlY3RlZCIsInBhcmVudCIsImZyYWN0aW9uIiwicm91bmQiLCJyZXNldFN0eWxlIiwiJHdpZGdldCIsInJlbW92ZUNsYXNzIiwibWF0Y2giLCJhcHBseVN0eWxlIiwiYmFzZVZhbHVlIiwiZiIsIiRhbGwiLCIkZnJhY3Rpb25hbCIsImlzRGVzZWxlY3RhYmxlIiwiJGVsZW1lbnQiLCJkZXNlbGVjdGFibGUiLCJhdHRyIiwiYXR0YWNoQ2xpY2tIYW5kbGVyIiwiJGVsZW1lbnRzIiwib24iLCJwcmV2ZW50RGVmYXVsdCIsIm9uU2VsZWN0IiwiY2FsbCIsImF0dGFjaE1vdXNlRW50ZXJIYW5kbGVyIiwiYXR0YWNoTW91c2VMZWF2ZUhhbmRsZXIiLCJmYXN0Q2xpY2tzIiwic3RvcFByb3BhZ2F0aW9uIiwiY2xpY2siLCJkaXNhYmxlQ2xpY2tzIiwiYXR0YWNoSGFuZGxlcnMiLCJob3ZlclN0YXRlIiwiZGV0YWNoSGFuZGxlcnMiLCJvZmYiLCJzZXR1cEhhbmRsZXJzIiwiaW5zZXJ0QWZ0ZXIiLCJzdGF0ZSIsInRvZ2dsZUNsYXNzIiwic2V0Iiwic2lsZW50IiwiY2xlYXIiLCJvbkNsZWFyIiwiZGVzdHJveSIsIm9uRGVzdHJveSIsImluaXQiLCJlbGVtIiwiZm4iLCJiYXJyYXRpbmciLCJkZWZhdWx0cyIsIm1ldGhvZCIsInBsdWdpbiIsImlzIiwiZXJyb3IiLCJoYXNPd25Qcm9wZXJ0eSIsIm5leHQiLCJsYW5nIiwic2VhcmNoZGF0YSIsInNlYXJjaERvbmUiLCJjYWxlbmRhckxvYWRlZCIsInNhdmVkd2lkdGgiLCJsYXJnZSIsInJlc2l6ZWQiLCJsb2NhdGlvbiIsIm9yaWdpbiIsInByb3RvY29sIiwiaG9zdCIsImxpdmVzaXRlIiwiRm91bmRhdGlvbiIsImFkZFRvSnF1ZXJ5IiwiZm91bmRhdGlvbiIsImNoZWNrU2NyZWVuV2lkdGgiLCJiYXJzIiwiZSIsIiRmb3JtIiwiYWpheCIsInR5cGUiLCJzZXJpYWxpemUiLCJkYXRhVHlwZSIsInN1Y2Nlc3MiLCJyZXN1bHQiLCJmb3JtUmVzcG9uc2UiLCJocmVmIiwibWVzc2FnZSIsIiRtb2RhbCIsIlJldmVhbCIsIm9wZW4iLCJtb2RhbGlkIiwidHJpbSIsImFqYXh1cmwiLCJjb250ZW50IiwiJHRoaXMiLCJhY3Rpb24iLCJlbGVtZW50IiwicGFyZW50cyIsIiR0YXJnZXQiLCJ2YWwxIiwiZ2V0UHJvcGVydGllcyIsImNoaWxkcmVuIiwidG9nZ2xlIiwic2V0QWN0aXZlTWVudSIsInBpZCIsImxvYWRDYWxlbmRhciIsIiR0YWJzIiwic3BlY2lhbCIsInRvdWNoc3RhcnQiLCJzZXR1cCIsIl8iLCJucyIsImhhbmRsZSIsImluY2x1ZGVzIiwiYWRkRXZlbnRMaXN0ZW5lciIsInBhc3NpdmUiLCJ0b3VjaG1vdmUiLCJpZCIsInJlcGxhY2UiLCJyZWRpcmVjdCIsImZpZWxkIiwicmVsb2FkIiwic2V0U2VhcmNoRGF0YSIsInJlc3BvbnNlIiwiZW1wdHkiLCJmYWRlSW4iLCJoYXNDbGFzcyIsInNjcm9sbFRvIiwiaXRlbSIsImJhciIsInNjcmVlbldpZHRoSGFzQ2hhbmdlZCIsIk1lZGlhUXVlcnkiLCJhdExlYXN0IiwibXlDb25maXJtIiwiJG15VGFzayIsIktyY29uZmlybSIsImNvbnN0cnVjdG9yIiwiZm9ybSIsInVwZGF0ZVF1b3RlIiwic2VyaWFsaXplQXJyYXkiLCJkaXYiLCJjaGVja1Rlcm1zIiwidGVzdCIsImdldEVsZW1lbnRCeUlkIiwidGVzdGMiLCJ0ZXN0dCIsImFncmVlY2hlY2siLCJjaGVja2VkIiwiYWdyZWVjaGVja2MiLCJhZ3JlZWNoZWNrdCIsIm15S3JEb2JFbnRyeSIsInRvZGF5IiwiQkFDS1NQQUNFIiwic2V0dGluZ3MiLCJjdXN0b21fdmFsaWRhdGlvbiIsImRheXNfaW5fbW9udGgiLCJkb2N1bWVudF9kYXRlIiwiZXJyb3Jib3hfeCIsImVycm9yYm94X3kiLCJmaWVsZF9oaW50X3RleHRfZGF5IiwiZmllbGRfaGludF90ZXh0X21vbnRoIiwiZmllbGRfaGludF90ZXh0X3llYXIiLCJmaWVsZF9vcmRlciIsImZpZWxkX3dpZHRoX2RheSIsImZpZWxkX3dpZHRoX21vbnRoIiwiZmllbGRfd2lkdGhfeWVhciIsImZpZWxkX3dpZHRoX3NlcCIsIm1heF9kYXRlIiwibWluX3llYXIiLCJtb250aF9uYW1lIiwib25fYmx1ciIsIm9uX2Vycm9yIiwib25fY2hhbmdlIiwicGFyc2VfZGF0ZSIsInNlcGFyYXRvciIsInNob3dfZXJyb3JzIiwic2hvd19oaW50cyIsIkVfREFZX05BTiIsIkVfREFZX1RPT19CSUciLCJFX0RBWV9UT09fU01BTEwiLCJFX0JBRF9EQVlfRk9SX01PTlRIIiwiRV9NT05USF9OQU4iLCJFX01PTlRIX1RPT19CSUciLCJFX01PTlRIX1RPT19TTUFMTCIsIkVfWUVBUl9OQU4iLCJFX1lFQVJfTEVOR1RIIiwiRV9ZRUFSX1RPT19TTUFMTCIsIkVfTUlOX0RBVEUiLCJFX01BWF9EQVRFIiwiS3JEb2JFbnRyeSIsImdldFltZCIsIkRhdGUiLCJpbnB1dF9kYXkiLCJpbnB1dF9tb250aCIsImlucHV0X3llYXIiLCJkYXRlIiwiZ2V0TW9udGgiLCJnZXREYXkiLCJnZXRGdWxsWWVhciIsImdldFltZE9iamVjdCIsInllYXIiLCJtb250aCIsImRheSIsImFkZEVudHJ5RmllbGRzIiwiZG9iZmllbGQiLCJmaWVsZHMiLCJzcGxpdCIsImJ1aWxkRmllbGQiLCJhZnRlclBhc3RlIiwidGFyZ2V0IiwicGFyc2VEYXRlIiwic2V0RGF0ZSIsIm5hbWUiLCJrcmRvYmVudHJ5IiwiaW5wdXQiLCJLckRvYklucHV0IiwiaGludF90ZXh0IiwiaW5uZXIiLCIkaW5wdXQiLCJidWlsZFVpIiwid3JhcHBlciIsImVycm9yYm94Iiwic2V0RmllbGRXaWR0aHMiLCJjaGVja0RvY3VtZW50IiwiZG9iIiwiY2hpbGRkb2IiLCJjbGFzc25hbWUiLCJlbGVtZW50cyIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJjbGVhckVycm9yIiwiZXJyb3JfdGV4dCIsInNob3dFcnJvciIsImNzcyIsImZvY3VzIiwic2V0Rm9jdXMiLCJmb2N1c0ZpZWxkQmVmb3JlIiwieWllbGRGb2N1cyIsImZvY3VzRmllbGRBZnRlciIsImZvY3VzSW4iLCJmb2N1c091dCIsIndpZGdldEZvY3VzTG9zdCIsImdldERhdGUiLCJkYXlfdmFsdWUiLCJtb250aF92YWx1ZSIsInllYXJfdmFsdWUiLCJwcm94eUxhYmVsQ2xpY2tzIiwicGFyc2VJc29EYXRlIiwiUmVnRXhwIiwiJDMiLCIkMiIsIiQxIiwibmV3X2RhdGUiLCJ2YWxpZGF0ZSIsInNldEVycm9yIiwiYXZhaWxhYmxlIiwidG90YWwiLCJzZXRXaWR0aCIsInNldFJlYWRvbmx5IiwibW9kZSIsIndpZGdldEVycm9yVGV4dCIsInhfb2Zmc2V0Iiwib3V0ZXJXaWR0aCIsInlfb2Zmc2V0IiwicG9zaXRpb24iLCJjdXJyZW50X2lucHV0IiwidmFsaWRhdGVEYXkiLCJ2YWxpZGF0ZU1vbnRoIiwidmFsaWRhdGVZZWFyIiwidmFsaWRhdGVEYXlzSW5Nb250aCIsInZhbGlkYXRlQ29tcGxldGVEYXRlIiwiZGF0ZV9zdHIiLCJkYXRlX29iaiIsImRhdGVfaXNvIiwib3B0IiwiZ2V0IiwiaGFzX2ZvY3VzIiwibnVtIiwibXNnIiwidG9TdHJpbmciLCJvbkJsdXIiLCJwcm94eSIsImJsdXIiLCJrZXlkb3duIiwia2V5dXAiLCJzaG93X2hpbnQiLCJrZXlfaXNfZG93biIsImlzRGlnaXRLZXkiLCJrZXljb2RlIiwid2hpY2giLCJ3YW50IiwibmV3X3ZhbHVlIiwic2VsZWN0X2FsbCIsInNlbGVjdCIsIm5ld193aWR0aCIsInRvdGFsR3Vlc3RzIiwiY2hhbmdlUGFydHlTaXplIiwiaG93dG9hcnJpdmUiLCJhcnJpdmFsbWVhbnMiLCJnZXRBdHRyaWJ1dGUiLCJkaXNwbGF5QXJyaXZhbCIsImd1ZXN0cyIsIm51bUFkdWx0cyIsIiRpbnB1dENoaWxkIiwibnVtQ2hpbGRyZW4iLCJtYXhDaGlsZHJlbiIsIiRob2xkZXIiLCJsYXN0IiwiZGlmZmVyZW5jZSIsImV4aXN0aW5nIiwiY3JlYXRlTmV3QWdlRmllbGQiLCJub3ciLCIkanNkYXRhIiwiY2hpbGRNaW5BZ2UiLCJjaGlsZE1heEFnZSIsIm5ld2FnZSIsInNldEF0dHJpYnV0ZSIsImNsYXNzTGlzdCIsImFycml2YWxkYXRhIiwiYWRkIiwibWFya2Vyc2hhcGUiLCJjb29yZHMiLCJteUtybWFwIiwibWFwRGF0YSIsIm1hcFpvb20iLCJpbmZvV2luZG93IiwiaW5mb1dpbmRvdzIiLCJwcm9wZXJ0eWRpdiIsInByb3BlcnR5aWNvbiIsIm1jIiwicHJvcGVydHlNYXJrZXJzIiwiZmlsdGVySWRzIiwibWFwTWFya2VycyIsIm1hcFR5cGVJZCIsIm1hcE1heFpvb20iLCJtYXBUeXBlIiwibWFwSWQiLCJtYXJrZXJDb2xvciIsIktybWFwIiwiZ21PcHRpb25zIiwic2Nyb2xsd2hlZWwiLCJzdHJlZXRWaWV3Q29udHJvbCIsImdtYXJrZXJzIiwiaW5pdE1hcCIsImNsb3NlS3JJbmZvd2luZG93IiwiY2xvc2UiLCJzaG93VmlzaWJsZU1hcmtlcnMiLCJzZXRWaXNpYmxlIiwiY2hlY2tEdXBsaWNhdGUiLCJjdXJyZW50IiwiZHVwcyIsImVxdWFscyIsIm5ld0xhdCIsIm5ld0xuZyIsImNoZWNrWm9vbSIsIm15bGlzdGVuZXIiLCJjdXJyZW50Wm9vbSIsInNldFpvb20iLCJjbHVzdGVyTWFwIiwibWNPcHRpb25zIiwiZ3JpZFNpemUiLCJpbWFnZVBhdGgiLCJpZ25vcmVIaWRkZW5NYXJrZXJzIiwic2V0UHJvcGVydHlNYXJrZXJzIiwic2V0TWFwTWFya2VycyIsImNyZWF0ZU1hcCIsIk1hcCIsIkluZm9XaW5kb3ciLCJjcmVhdGVNYXBNYXJrZXIiLCJwb2ludCIsImltYWdlIiwiYm94aW5mbyIsImxpbmsiLCJ0aXRsZSIsIk1hcmtlciIsInNoYXBlIiwiaWNvbiIsInpJbmRleCIsInNldENvbnRlbnQiLCJjcmVhdGVQcm9wZXJ0eU1hcmtlciIsImNvbG9yIiwibm90Iiwic2xpY2siLCJuZXh0QXJyb3ciLCJwcmV2QXJyb3ciLCJhdXRvcGxheSIsInNvbG9NYXAiLCJyZWZyZXNoTWFwIiwiJG1hcG1vZGFsIiwiYWxlcnQiLCJyZXNldE1hcCIsImFtYXJrIiwibWFya2VyaWNvbiIsIlNpemUiLCJQb2ludCIsImFuY2hvciIsIm15TGlzdGVuZXIiLCJmb3VuZCIsImtpY2tNYXAiLCJtYXBfbW9kYWwiLCIkc29sb1RyaWdnZXIiLCJvbmUiLCIkdHJpZ2dlciIsIm15S3Jyb3V0ZSIsImRpcmVjdGlvbnNEaXNwbGF5IiwiZGlyZWN0aW9uc1Zpc2libGUiLCJyb3V0ZU1hcCIsImRlc3RpbmF0aW9uIiwicm91dGVNYXJrZXJzIiwicm91dGVTdG9wUG9pbnRzIiwiZGV0b3VyIiwiZGlyZWN0aW9uc1BhbmVsIiwiZGlyZWN0aW9uc1NlcnZpY2UiLCJLcnJvdXRlIiwiRGlyZWN0aW9uc1NlcnZpY2UiLCJjbGVhclJvdXRlTWFya2VycyIsImNsZWFyV2F5cG9pbnRzIiwiYWRkUm91dGVNYXJrZXIiLCJjYWxjUm91dGUiLCJmcm9tX2FkZHJlc3MiLCJEaXJlY3Rpb25zVHJhdmVsTW9kZSIsIkJJQ1lDTElORyIsIkRSSVZJTkciLCJXQUxLSU5HIiwicmVxdWVzdCIsIndheXBvaW50cyIsInRyYXZlbE1vZGUiLCJhdm9pZEhpZ2h3YXlzIiwiYXZvaWRUb2xscyIsInJvdXRlIiwic3RhdHVzIiwiRGlyZWN0aW9uc1N0YXR1cyIsIk9LIiwic2V0RGlyZWN0aW9ucyIsInJlc2V0Um91dGUiLCJteU9wdGlvbnMiLCJEaXJlY3Rpb25zUmVuZGVyZXIiLCJzZXRQYW5lbCIsIk1hcmtlckltYWdlIiwibGF0TG5nIiwic3RvcG92ZXIiLCJhZGRMaXN0ZW5lck9uY2UiLCJkaXJlY3Rpb25QYW5lbCIsImFkZHJlc3NTdHJpbmciLCJjb29yZCIsImFkZHJlc3MiLCJqc29uZGF0YSIsIm15R21hcCJdLCJzb3VyY2VSb290IjoiIn0=