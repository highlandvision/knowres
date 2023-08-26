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
    }).on('click', '.kr-filters ul.filter-sort-list li.head', function (e) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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c3RlcmVyL3NyYy9tYXJrZXJjbHVzdGVyZXIuanMiLCJ3ZWJwYWNrOi8va3IvLi9ub2RlX21vZHVsZXMvanF1ZXJ5LWJhci1yYXRpbmcvanF1ZXJ5LmJhcnJhdGluZy5qcyIsIndlYnBhY2s6Ly9rci8uL3NyYy9tZWRpYS9jb21fa25vd3Jlcy9qcy9zcmMvc2l0ZS9hcHAuanMiLCJ3ZWJwYWNrOi8va3IvLi9zcmMvbWVkaWEvY29tX2tub3dyZXMvanMvc3JjL3NpdGUvY29uZmlybS5qcyIsIndlYnBhY2s6Ly9rci8uL3NyYy9tZWRpYS9jb21fa25vd3Jlcy9qcy9zcmMvc2l0ZS9kb2JlbnRyeS5qcyIsIndlYnBhY2s6Ly9rci8uL3NyYy9tZWRpYS9jb21fa25vd3Jlcy9qcy9zcmMvc2l0ZS9ndWVzdGRhdGEuanMiLCJ3ZWJwYWNrOi8va3IvLi9zcmMvbWVkaWEvY29tX2tub3dyZXMvanMvc3JjL3NpdGUvbWFwLmpzIiwid2VicGFjazovL2tyLy4vc3JjL21lZGlhL2NvbV9rbm93cmVzL2pzL3NyYy9zaXRlL3JvdXRlLmpzIiwid2VicGFjazovL2tyLy4vd2VicGFjay5idWlsZC5zaXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogTnBtIHZlcnNpb24gb2YgbWFya2VyQ2x1c3RlcmVyIHdvcmtzIGdyZWF0IHdpdGggYnJvd3NlcmlmeVxuICogRGlmZmVyZW5jZSBmcm9tIHRoZSBvcmlnaW5hbCAtIGFkZHMgYSBjb21tb25qcyBmb3JtYXQgYW5kIHJlcGxhY2VzIHdpbmRvdyB3aXRoIGdsb2JhbCBhbmQgc29tZSB1bml0IHRlc3RcbiAqIFRoZSBvcmlnaW5hbCBmdW5jdGlvbmFsaXR5IGl0J3Mgbm90IG1vZGlmaWVkIGZvciBkb2NzIGFuZCBvcmlnaW5hbCBzb3VyY2UgY2hlY2tcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9nb29nbGVtYXBzL2pzLW1hcmtlci1jbHVzdGVyZXJcbiAqL1xuXG4vKipcbiAqIEBuYW1lIE1hcmtlckNsdXN0ZXJlciBmb3IgR29vZ2xlIE1hcHMgdjNcbiAqIEB2ZXJzaW9uIHZlcnNpb24gMS4wXG4gKiBAYXV0aG9yIEx1a2UgTWFoZVxuICogQGZpbGVvdmVydmlld1xuICogVGhlIGxpYnJhcnkgY3JlYXRlcyBhbmQgbWFuYWdlcyBwZXItem9vbS1sZXZlbCBjbHVzdGVycyBmb3IgbGFyZ2UgYW1vdW50cyBvZlxuICogbWFya2Vycy5cbiAqIDxici8+XG4gKiBUaGlzIGlzIGEgdjMgaW1wbGVtZW50YXRpb24gb2YgdGhlXG4gKiA8YSBocmVmPVwiaHR0cDovL2dtYXBzLXV0aWxpdHktbGlicmFyeS1kZXYuZ29vZ2xlY29kZS5jb20vc3ZuL3RhZ3MvbWFya2VyY2x1c3RlcmVyL1wiXG4gKiA+djIgTWFya2VyQ2x1c3RlcmVyPC9hPi5cbiAqL1xuXG4vKipcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5cbi8qKlxuICogQSBNYXJrZXIgQ2x1c3RlcmVyIHRoYXQgY2x1c3RlcnMgbWFya2Vycy5cbiAqXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLk1hcH0gbWFwIFRoZSBHb29nbGUgbWFwIHRvIGF0dGFjaCB0by5cbiAqIEBwYXJhbSB7QXJyYXkuPGdvb2dsZS5tYXBzLk1hcmtlcj49fSBvcHRfbWFya2VycyBPcHRpb25hbCBtYXJrZXJzIHRvIGFkZCB0b1xuICogICB0aGUgY2x1c3Rlci5cbiAqIEBwYXJhbSB7T2JqZWN0PX0gb3B0X29wdGlvbnMgc3VwcG9ydCB0aGUgZm9sbG93aW5nIG9wdGlvbnM6XG4gKiAgICAgJ2dyaWRTaXplJzogKG51bWJlcikgVGhlIGdyaWQgc2l6ZSBvZiBhIGNsdXN0ZXIgaW4gcGl4ZWxzLlxuICogICAgICdtYXhab29tJzogKG51bWJlcikgVGhlIG1heGltdW0gem9vbSBsZXZlbCB0aGF0IGEgbWFya2VyIGNhbiBiZSBwYXJ0IG9mIGFcbiAqICAgICAgICAgICAgICAgIGNsdXN0ZXIuXG4gKiAgICAgJ3pvb21PbkNsaWNrJzogKGJvb2xlYW4pIFdoZXRoZXIgdGhlIGRlZmF1bHQgYmVoYXZpb3VyIG9mIGNsaWNraW5nIG9uIGFcbiAqICAgICAgICAgICAgICAgICAgICBjbHVzdGVyIGlzIHRvIHpvb20gaW50byBpdC5cbiAqICAgICAnYXZlcmFnZUNlbnRlcic6IChib29sZWFuKSBXZXRoZXIgdGhlIGNlbnRlciBvZiBlYWNoIGNsdXN0ZXIgc2hvdWxkIGJlXG4gKiAgICAgICAgICAgICAgICAgICAgICB0aGUgYXZlcmFnZSBvZiBhbGwgbWFya2VycyBpbiB0aGUgY2x1c3Rlci5cbiAqICAgICAnbWluaW11bUNsdXN0ZXJTaXplJzogKG51bWJlcikgVGhlIG1pbmltdW0gbnVtYmVyIG9mIG1hcmtlcnMgdG8gYmUgaW4gYVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICBjbHVzdGVyIGJlZm9yZSB0aGUgbWFya2VycyBhcmUgaGlkZGVuIGFuZCBhIGNvdW50XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzIHNob3duLlxuICogICAgICdzdHlsZXMnOiAob2JqZWN0KSBBbiBvYmplY3QgdGhhdCBoYXMgc3R5bGUgcHJvcGVydGllczpcbiAqICAgICAgICd1cmwnOiAoc3RyaW5nKSBUaGUgaW1hZ2UgdXJsLlxuICogICAgICAgJ2hlaWdodCc6IChudW1iZXIpIFRoZSBpbWFnZSBoZWlnaHQuXG4gKiAgICAgICAnd2lkdGgnOiAobnVtYmVyKSBUaGUgaW1hZ2Ugd2lkdGguXG4gKiAgICAgICAnYW5jaG9yJzogKEFycmF5KSBUaGUgYW5jaG9yIHBvc2l0aW9uIG9mIHRoZSBsYWJlbCB0ZXh0LlxuICogICAgICAgJ3RleHRDb2xvcic6IChzdHJpbmcpIFRoZSB0ZXh0IGNvbG9yLlxuICogICAgICAgJ3RleHRTaXplJzogKG51bWJlcikgVGhlIHRleHQgc2l6ZS5cbiAqICAgICAgICdmb250RmFtaWx5JzogKHN0cmluZykgVGhlIGZvbnQgZmFtaWx5LlxuICogICAgICAgJ2ZvbnRXZWlnaHQnOiAoc3RyaW5nKSBUaGUgZm9udCB3ZWlnaHQuXG4gKiAgICAgICAnYmFja2dyb3VuZFBvc2l0aW9uJzogKHN0cmluZykgVGhlIHBvc2l0aW9uIG9mIHRoZSBiYWNrZ291bmQgeCwgeS5cbiAqIEBjb25zdHJ1Y3RvclxuICogQGV4dGVuZHMgZ29vZ2xlLm1hcHMuT3ZlcmxheVZpZXdcbiAqL1xuZnVuY3Rpb24gTWFya2VyQ2x1c3RlcmVyKG1hcCwgb3B0X21hcmtlcnMsIG9wdF9vcHRpb25zKSB7XG4gIC8vIE1hcmtlckNsdXN0ZXJlciBpbXBsZW1lbnRzIGdvb2dsZS5tYXBzLk92ZXJsYXlWaWV3IGludGVyZmFjZS4gV2UgdXNlIHRoZVxuICAvLyBleHRlbmQgZnVuY3Rpb24gdG8gZXh0ZW5kIE1hcmtlckNsdXN0ZXJlciB3aXRoIGdvb2dsZS5tYXBzLk92ZXJsYXlWaWV3XG4gIC8vIGJlY2F1c2UgaXQgbWlnaHQgbm90IGFsd2F5cyBiZSBhdmFpbGFibGUgd2hlbiB0aGUgY29kZSBpcyBkZWZpbmVkIHNvIHdlXG4gIC8vIGxvb2sgZm9yIGl0IGF0IHRoZSBsYXN0IHBvc3NpYmxlIG1vbWVudC4gSWYgaXQgZG9lc24ndCBleGlzdCBub3cgdGhlblxuICAvLyB0aGVyZSBpcyBubyBwb2ludCBnb2luZyBhaGVhZCA6KVxuICB0aGlzLmV4dGVuZChNYXJrZXJDbHVzdGVyZXIsIGdvb2dsZS5tYXBzLk92ZXJsYXlWaWV3KTtcbiAgdGhpcy5tYXBfID0gbWFwO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7QXJyYXkuPGdvb2dsZS5tYXBzLk1hcmtlcj59XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICB0aGlzLm1hcmtlcnNfID0gW107XG5cbiAgLyoqXG4gICAqICBAdHlwZSB7QXJyYXkuPENsdXN0ZXI+fVxuICAgKi9cbiAgdGhpcy5jbHVzdGVyc18gPSBbXTtcblxuICB0aGlzLnNpemVzID0gWzUzLCA1NiwgNjYsIDc4LCA5MF07XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICB0aGlzLnN0eWxlc18gPSBbXTtcblxuICAvKipcbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICB0aGlzLnJlYWR5XyA9IGZhbHNlO1xuXG4gIHZhciBvcHRpb25zID0gb3B0X29wdGlvbnMgfHwge307XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICB0aGlzLmdyaWRTaXplXyA9IG9wdGlvbnNbJ2dyaWRTaXplJ10gfHwgNjA7XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICB0aGlzLm1pbkNsdXN0ZXJTaXplXyA9IG9wdGlvbnNbJ21pbmltdW1DbHVzdGVyU2l6ZSddIHx8IDI7XG5cblxuICAvKipcbiAgICogQHR5cGUgez9udW1iZXJ9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICB0aGlzLm1heFpvb21fID0gb3B0aW9uc1snbWF4Wm9vbSddIHx8IG51bGw7XG5cbiAgdGhpcy5zdHlsZXNfID0gb3B0aW9uc1snc3R5bGVzJ10gfHwgW107XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICB0aGlzLmltYWdlUGF0aF8gPSBvcHRpb25zWydpbWFnZVBhdGgnXSB8fFxuICAgICAgdGhpcy5NQVJLRVJfQ0xVU1RFUl9JTUFHRV9QQVRIXztcblxuICAvKipcbiAgICogQHR5cGUge3N0cmluZ31cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHRoaXMuaW1hZ2VFeHRlbnNpb25fID0gb3B0aW9uc1snaW1hZ2VFeHRlbnNpb24nXSB8fFxuICAgICAgdGhpcy5NQVJLRVJfQ0xVU1RFUl9JTUFHRV9FWFRFTlNJT05fO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHRoaXMuem9vbU9uQ2xpY2tfID0gdHJ1ZTtcblxuICBpZiAob3B0aW9uc1snem9vbU9uQ2xpY2snXSAhPSB1bmRlZmluZWQpIHtcbiAgICB0aGlzLnpvb21PbkNsaWNrXyA9IG9wdGlvbnNbJ3pvb21PbkNsaWNrJ107XG4gIH1cblxuICAvKipcbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICB0aGlzLmF2ZXJhZ2VDZW50ZXJfID0gZmFsc2U7XG5cbiAgaWYgKG9wdGlvbnNbJ2F2ZXJhZ2VDZW50ZXInXSAhPSB1bmRlZmluZWQpIHtcbiAgICB0aGlzLmF2ZXJhZ2VDZW50ZXJfID0gb3B0aW9uc1snYXZlcmFnZUNlbnRlciddO1xuICB9XG5cbiAgdGhpcy5zZXR1cFN0eWxlc18oKTtcblxuICB0aGlzLnNldE1hcChtYXApO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgdGhpcy5wcmV2Wm9vbV8gPSB0aGlzLm1hcF8uZ2V0Wm9vbSgpO1xuXG4gIC8vIEFkZCB0aGUgbWFwIGV2ZW50IGxpc3RlbmVyc1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKHRoaXMubWFwXywgJ3pvb21fY2hhbmdlZCcsIGZ1bmN0aW9uKCkge1xuICAgIHZhciB6b29tID0gdGhhdC5tYXBfLmdldFpvb20oKTtcblxuICAgIGlmICh0aGF0LnByZXZab29tXyAhPSB6b29tKSB7XG4gICAgICB0aGF0LnByZXZab29tXyA9IHpvb207XG4gICAgICB0aGF0LnJlc2V0Vmlld3BvcnQoKTtcbiAgICB9XG4gIH0pO1xuXG4gIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKHRoaXMubWFwXywgJ2lkbGUnLCBmdW5jdGlvbigpIHtcbiAgICB0aGF0LnJlZHJhdygpO1xuICB9KTtcblxuICAvLyBGaW5hbGx5LCBhZGQgdGhlIG1hcmtlcnNcbiAgaWYgKG9wdF9tYXJrZXJzICYmIG9wdF9tYXJrZXJzLmxlbmd0aCkge1xuICAgIHRoaXMuYWRkTWFya2VycyhvcHRfbWFya2VycywgZmFsc2UpO1xuICB9XG59XG5cblxuLyoqXG4gKiBUaGUgbWFya2VyIGNsdXN0ZXIgaW1hZ2UgcGF0aC5cbiAqXG4gKiBAdHlwZSB7c3RyaW5nfVxuICogQHByaXZhdGVcbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5NQVJLRVJfQ0xVU1RFUl9JTUFHRV9QQVRIXyA9XG4gICAgJ2h0dHA6Ly9nb29nbGUtbWFwcy11dGlsaXR5LWxpYnJhcnktdjMuZ29vZ2xlY29kZS5jb20vc3ZuL3RydW5rL21hcmtlcmNsdXN0ZXJlci8nICtcbiAgICAnaW1hZ2VzL20nO1xuXG5cbi8qKlxuICogVGhlIG1hcmtlciBjbHVzdGVyIGltYWdlIHBhdGguXG4gKlxuICogQHR5cGUge3N0cmluZ31cbiAqIEBwcml2YXRlXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuTUFSS0VSX0NMVVNURVJfSU1BR0VfRVhURU5TSU9OXyA9ICdwbmcnO1xuXG5cbi8qKlxuICogRXh0ZW5kcyBhIG9iamVjdHMgcHJvdG90eXBlIGJ5IGFub3RoZXJzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmoxIFRoZSBvYmplY3QgdG8gYmUgZXh0ZW5kZWQuXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqMiBUaGUgb2JqZWN0IHRvIGV4dGVuZCB3aXRoLlxuICogQHJldHVybiB7T2JqZWN0fSBUaGUgbmV3IGV4dGVuZGVkIG9iamVjdC5cbiAqIEBpZ25vcmVcbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5leHRlbmQgPSBmdW5jdGlvbihvYmoxLCBvYmoyKSB7XG4gIHJldHVybiAoZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgZm9yICh2YXIgcHJvcGVydHkgaW4gb2JqZWN0LnByb3RvdHlwZSkge1xuICAgICAgdGhpcy5wcm90b3R5cGVbcHJvcGVydHldID0gb2JqZWN0LnByb3RvdHlwZVtwcm9wZXJ0eV07XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9KS5hcHBseShvYmoxLCBbb2JqMl0pO1xufTtcblxuXG4vKipcbiAqIEltcGxlbWVudGFpb24gb2YgdGhlIGludGVyZmFjZSBtZXRob2QuXG4gKiBAaWdub3JlXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUub25BZGQgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5zZXRSZWFkeV8odHJ1ZSk7XG59O1xuXG4vKipcbiAqIEltcGxlbWVudGFpb24gb2YgdGhlIGludGVyZmFjZSBtZXRob2QuXG4gKiBAaWdub3JlXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZHJhdyA9IGZ1bmN0aW9uKCkge307XG5cbi8qKlxuICogU2V0cyB1cCB0aGUgc3R5bGVzIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnNldHVwU3R5bGVzXyA9IGZ1bmN0aW9uKCkge1xuICBpZiAodGhpcy5zdHlsZXNfLmxlbmd0aCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwLCBzaXplOyBzaXplID0gdGhpcy5zaXplc1tpXTsgaSsrKSB7XG4gICAgdGhpcy5zdHlsZXNfLnB1c2goe1xuICAgICAgdXJsOiB0aGlzLmltYWdlUGF0aF8gKyAoaSArIDEpICsgJy4nICsgdGhpcy5pbWFnZUV4dGVuc2lvbl8sXG4gICAgICBoZWlnaHQ6IHNpemUsXG4gICAgICB3aWR0aDogc2l6ZVxuICAgIH0pO1xuICB9XG59O1xuXG4vKipcbiAqICBGaXQgdGhlIG1hcCB0byB0aGUgYm91bmRzIG9mIHRoZSBtYXJrZXJzIGluIHRoZSBjbHVzdGVyZXIuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZml0TWFwVG9NYXJrZXJzID0gZnVuY3Rpb24oKSB7XG4gIHZhciBtYXJrZXJzID0gdGhpcy5nZXRNYXJrZXJzKCk7XG4gIHZhciBib3VuZHMgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nQm91bmRzKCk7XG4gIGZvciAodmFyIGkgPSAwLCBtYXJrZXI7IG1hcmtlciA9IG1hcmtlcnNbaV07IGkrKykge1xuICAgIGJvdW5kcy5leHRlbmQobWFya2VyLmdldFBvc2l0aW9uKCkpO1xuICB9XG5cbiAgdGhpcy5tYXBfLmZpdEJvdW5kcyhib3VuZHMpO1xufTtcblxuXG4vKipcbiAqICBTZXRzIHRoZSBzdHlsZXMuXG4gKlxuICogIEBwYXJhbSB7T2JqZWN0fSBzdHlsZXMgVGhlIHN0eWxlIHRvIHNldC5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5zZXRTdHlsZXMgPSBmdW5jdGlvbihzdHlsZXMpIHtcbiAgdGhpcy5zdHlsZXNfID0gc3R5bGVzO1xufTtcblxuXG4vKipcbiAqICBHZXRzIHRoZSBzdHlsZXMuXG4gKlxuICogIEByZXR1cm4ge09iamVjdH0gVGhlIHN0eWxlcyBvYmplY3QuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0U3R5bGVzID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnN0eWxlc187XG59O1xuXG5cbi8qKlxuICogV2hldGhlciB6b29tIG9uIGNsaWNrIGlzIHNldC5cbiAqXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIHpvb21PbkNsaWNrXyBpcyBzZXQuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuaXNab29tT25DbGljayA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy56b29tT25DbGlja187XG59O1xuXG4vKipcbiAqIFdoZXRoZXIgYXZlcmFnZSBjZW50ZXIgaXMgc2V0LlxuICpcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgYXZlcmFnZUNlbnRlcl8gaXMgc2V0LlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmlzQXZlcmFnZUNlbnRlciA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5hdmVyYWdlQ2VudGVyXztcbn07XG5cblxuLyoqXG4gKiAgUmV0dXJucyB0aGUgYXJyYXkgb2YgbWFya2VycyBpbiB0aGUgY2x1c3RlcmVyLlxuICpcbiAqICBAcmV0dXJuIHtBcnJheS48Z29vZ2xlLm1hcHMuTWFya2VyPn0gVGhlIG1hcmtlcnMuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0TWFya2VycyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5tYXJrZXJzXztcbn07XG5cblxuLyoqXG4gKiAgUmV0dXJucyB0aGUgbnVtYmVyIG9mIG1hcmtlcnMgaW4gdGhlIGNsdXN0ZXJlclxuICpcbiAqICBAcmV0dXJuIHtOdW1iZXJ9IFRoZSBudW1iZXIgb2YgbWFya2Vycy5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRUb3RhbE1hcmtlcnMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMubWFya2Vyc18ubGVuZ3RoO1xufTtcblxuXG4vKipcbiAqICBTZXRzIHRoZSBtYXggem9vbSBmb3IgdGhlIGNsdXN0ZXJlci5cbiAqXG4gKiAgQHBhcmFtIHtudW1iZXJ9IG1heFpvb20gVGhlIG1heCB6b29tIGxldmVsLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnNldE1heFpvb20gPSBmdW5jdGlvbihtYXhab29tKSB7XG4gIHRoaXMubWF4Wm9vbV8gPSBtYXhab29tO1xufTtcblxuXG4vKipcbiAqICBHZXRzIHRoZSBtYXggem9vbSBmb3IgdGhlIGNsdXN0ZXJlci5cbiAqXG4gKiAgQHJldHVybiB7bnVtYmVyfSBUaGUgbWF4IHpvb20gbGV2ZWwuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0TWF4Wm9vbSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5tYXhab29tXztcbn07XG5cblxuLyoqXG4gKiAgVGhlIGZ1bmN0aW9uIGZvciBjYWxjdWxhdGluZyB0aGUgY2x1c3RlciBpY29uIGltYWdlLlxuICpcbiAqICBAcGFyYW0ge0FycmF5Ljxnb29nbGUubWFwcy5NYXJrZXI+fSBtYXJrZXJzIFRoZSBtYXJrZXJzIGluIHRoZSBjbHVzdGVyZXIuXG4gKiAgQHBhcmFtIHtudW1iZXJ9IG51bVN0eWxlcyBUaGUgbnVtYmVyIG9mIHN0eWxlcyBhdmFpbGFibGUuXG4gKiAgQHJldHVybiB7T2JqZWN0fSBBIG9iamVjdCBwcm9wZXJ0aWVzOiAndGV4dCcgKHN0cmluZykgYW5kICdpbmRleCcgKG51bWJlcikuXG4gKiAgQHByaXZhdGVcbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5jYWxjdWxhdG9yXyA9IGZ1bmN0aW9uKG1hcmtlcnMsIG51bVN0eWxlcykge1xuICB2YXIgaW5kZXggPSAwO1xuICB2YXIgY291bnQgPSBtYXJrZXJzLmxlbmd0aDtcbiAgdmFyIGR2ID0gY291bnQ7XG4gIHdoaWxlIChkdiAhPT0gMCkge1xuICAgIGR2ID0gcGFyc2VJbnQoZHYgLyAxMCwgMTApO1xuICAgIGluZGV4Kys7XG4gIH1cblxuICBpbmRleCA9IE1hdGgubWluKGluZGV4LCBudW1TdHlsZXMpO1xuICByZXR1cm4ge1xuICAgIHRleHQ6IGNvdW50LFxuICAgIGluZGV4OiBpbmRleFxuICB9O1xufTtcblxuXG4vKipcbiAqIFNldCB0aGUgY2FsY3VsYXRvciBmdW5jdGlvbi5cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKEFycmF5LCBudW1iZXIpfSBjYWxjdWxhdG9yIFRoZSBmdW5jdGlvbiB0byBzZXQgYXMgdGhlXG4gKiAgICAgY2FsY3VsYXRvci4gVGhlIGZ1bmN0aW9uIHNob3VsZCByZXR1cm4gYSBvYmplY3QgcHJvcGVydGllczpcbiAqICAgICAndGV4dCcgKHN0cmluZykgYW5kICdpbmRleCcgKG51bWJlcikuXG4gKlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnNldENhbGN1bGF0b3IgPSBmdW5jdGlvbihjYWxjdWxhdG9yKSB7XG4gIHRoaXMuY2FsY3VsYXRvcl8gPSBjYWxjdWxhdG9yO1xufTtcblxuXG4vKipcbiAqIEdldCB0aGUgY2FsY3VsYXRvciBmdW5jdGlvbi5cbiAqXG4gKiBAcmV0dXJuIHtmdW5jdGlvbihBcnJheSwgbnVtYmVyKX0gdGhlIGNhbGN1bGF0b3IgZnVuY3Rpb24uXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0Q2FsY3VsYXRvciA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5jYWxjdWxhdG9yXztcbn07XG5cblxuLyoqXG4gKiBBZGQgYW4gYXJyYXkgb2YgbWFya2VycyB0byB0aGUgY2x1c3RlcmVyLlxuICpcbiAqIEBwYXJhbSB7QXJyYXkuPGdvb2dsZS5tYXBzLk1hcmtlcj59IG1hcmtlcnMgVGhlIG1hcmtlcnMgdG8gYWRkLlxuICogQHBhcmFtIHtib29sZWFuPX0gb3B0X25vZHJhdyBXaGV0aGVyIHRvIHJlZHJhdyB0aGUgY2x1c3RlcnMuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuYWRkTWFya2VycyA9IGZ1bmN0aW9uKG1hcmtlcnMsIG9wdF9ub2RyYXcpIHtcbiAgZm9yICh2YXIgaSA9IDAsIG1hcmtlcjsgbWFya2VyID0gbWFya2Vyc1tpXTsgaSsrKSB7XG4gICAgdGhpcy5wdXNoTWFya2VyVG9fKG1hcmtlcik7XG4gIH1cbiAgaWYgKCFvcHRfbm9kcmF3KSB7XG4gICAgdGhpcy5yZWRyYXcoKTtcbiAgfVxufTtcblxuXG4vKipcbiAqIFB1c2hlcyBhIG1hcmtlciB0byB0aGUgY2x1c3RlcmVyLlxuICpcbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTWFya2VyfSBtYXJrZXIgVGhlIG1hcmtlciB0byBhZGQuXG4gKiBAcHJpdmF0ZVxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnB1c2hNYXJrZXJUb18gPSBmdW5jdGlvbihtYXJrZXIpIHtcbiAgbWFya2VyLmlzQWRkZWQgPSBmYWxzZTtcbiAgaWYgKG1hcmtlclsnZHJhZ2dhYmxlJ10pIHtcbiAgICAvLyBJZiB0aGUgbWFya2VyIGlzIGRyYWdnYWJsZSBhZGQgYSBsaXN0ZW5lciBzbyB3ZSB1cGRhdGUgdGhlIGNsdXN0ZXJzIG9uXG4gICAgLy8gdGhlIGRyYWcgZW5kLlxuICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYXJrZXIsICdkcmFnZW5kJywgZnVuY3Rpb24oKSB7XG4gICAgICBtYXJrZXIuaXNBZGRlZCA9IGZhbHNlO1xuICAgICAgdGhhdC5yZXBhaW50KCk7XG4gICAgfSk7XG4gIH1cbiAgdGhpcy5tYXJrZXJzXy5wdXNoKG1hcmtlcik7XG59O1xuXG5cbi8qKlxuICogQWRkcyBhIG1hcmtlciB0byB0aGUgY2x1c3RlcmVyIGFuZCByZWRyYXdzIGlmIG5lZWRlZC5cbiAqXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLk1hcmtlcn0gbWFya2VyIFRoZSBtYXJrZXIgdG8gYWRkLlxuICogQHBhcmFtIHtib29sZWFuPX0gb3B0X25vZHJhdyBXaGV0aGVyIHRvIHJlZHJhdyB0aGUgY2x1c3RlcnMuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuYWRkTWFya2VyID0gZnVuY3Rpb24obWFya2VyLCBvcHRfbm9kcmF3KSB7XG4gIHRoaXMucHVzaE1hcmtlclRvXyhtYXJrZXIpO1xuICBpZiAoIW9wdF9ub2RyYXcpIHtcbiAgICB0aGlzLnJlZHJhdygpO1xuICB9XG59O1xuXG5cbi8qKlxuICogUmVtb3ZlcyBhIG1hcmtlciBhbmQgcmV0dXJucyB0cnVlIGlmIHJlbW92ZWQsIGZhbHNlIGlmIG5vdFxuICpcbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTWFya2VyfSBtYXJrZXIgVGhlIG1hcmtlciB0byByZW1vdmVcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFdoZXRoZXIgdGhlIG1hcmtlciB3YXMgcmVtb3ZlZCBvciBub3RcbiAqIEBwcml2YXRlXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUucmVtb3ZlTWFya2VyXyA9IGZ1bmN0aW9uKG1hcmtlcikge1xuICB2YXIgaW5kZXggPSAtMTtcbiAgaWYgKHRoaXMubWFya2Vyc18uaW5kZXhPZikge1xuICAgIGluZGV4ID0gdGhpcy5tYXJrZXJzXy5pbmRleE9mKG1hcmtlcik7XG4gIH0gZWxzZSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIG07IG0gPSB0aGlzLm1hcmtlcnNfW2ldOyBpKyspIHtcbiAgICAgIGlmIChtID09IG1hcmtlcikge1xuICAgICAgICBpbmRleCA9IGk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmIChpbmRleCA9PSAtMSkge1xuICAgIC8vIE1hcmtlciBpcyBub3QgaW4gb3VyIGxpc3Qgb2YgbWFya2Vycy5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBtYXJrZXIuc2V0TWFwKG51bGwpO1xuXG4gIHRoaXMubWFya2Vyc18uc3BsaWNlKGluZGV4LCAxKTtcblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cblxuLyoqXG4gKiBSZW1vdmUgYSBtYXJrZXIgZnJvbSB0aGUgY2x1c3Rlci5cbiAqXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLk1hcmtlcn0gbWFya2VyIFRoZSBtYXJrZXIgdG8gcmVtb3ZlLlxuICogQHBhcmFtIHtib29sZWFuPX0gb3B0X25vZHJhdyBPcHRpb25hbCBib29sZWFuIHRvIGZvcmNlIG5vIHJlZHJhdy5cbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdGhlIG1hcmtlciB3YXMgcmVtb3ZlZC5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5yZW1vdmVNYXJrZXIgPSBmdW5jdGlvbihtYXJrZXIsIG9wdF9ub2RyYXcpIHtcbiAgdmFyIHJlbW92ZWQgPSB0aGlzLnJlbW92ZU1hcmtlcl8obWFya2VyKTtcblxuICBpZiAoIW9wdF9ub2RyYXcgJiYgcmVtb3ZlZCkge1xuICAgIHRoaXMucmVzZXRWaWV3cG9ydCgpO1xuICAgIHRoaXMucmVkcmF3KCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSB7XG4gICByZXR1cm4gZmFsc2U7XG4gIH1cbn07XG5cblxuLyoqXG4gKiBSZW1vdmVzIGFuIGFycmF5IG9mIG1hcmtlcnMgZnJvbSB0aGUgY2x1c3Rlci5cbiAqXG4gKiBAcGFyYW0ge0FycmF5Ljxnb29nbGUubWFwcy5NYXJrZXI+fSBtYXJrZXJzIFRoZSBtYXJrZXJzIHRvIHJlbW92ZS5cbiAqIEBwYXJhbSB7Ym9vbGVhbj19IG9wdF9ub2RyYXcgT3B0aW9uYWwgYm9vbGVhbiB0byBmb3JjZSBubyByZWRyYXcuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUucmVtb3ZlTWFya2VycyA9IGZ1bmN0aW9uKG1hcmtlcnMsIG9wdF9ub2RyYXcpIHtcbiAgdmFyIHJlbW92ZWQgPSBmYWxzZTtcblxuICBmb3IgKHZhciBpID0gMCwgbWFya2VyOyBtYXJrZXIgPSBtYXJrZXJzW2ldOyBpKyspIHtcbiAgICB2YXIgciA9IHRoaXMucmVtb3ZlTWFya2VyXyhtYXJrZXIpO1xuICAgIHJlbW92ZWQgPSByZW1vdmVkIHx8IHI7XG4gIH1cblxuICBpZiAoIW9wdF9ub2RyYXcgJiYgcmVtb3ZlZCkge1xuICAgIHRoaXMucmVzZXRWaWV3cG9ydCgpO1xuICAgIHRoaXMucmVkcmF3KCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG5cblxuLyoqXG4gKiBTZXRzIHRoZSBjbHVzdGVyZXIncyByZWFkeSBzdGF0ZS5cbiAqXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHJlYWR5IFRoZSBzdGF0ZS5cbiAqIEBwcml2YXRlXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuc2V0UmVhZHlfID0gZnVuY3Rpb24ocmVhZHkpIHtcbiAgaWYgKCF0aGlzLnJlYWR5Xykge1xuICAgIHRoaXMucmVhZHlfID0gcmVhZHk7XG4gICAgdGhpcy5jcmVhdGVDbHVzdGVyc18oKTtcbiAgfVxufTtcblxuXG4vKipcbiAqIFJldHVybnMgdGhlIG51bWJlciBvZiBjbHVzdGVycyBpbiB0aGUgY2x1c3RlcmVyLlxuICpcbiAqIEByZXR1cm4ge251bWJlcn0gVGhlIG51bWJlciBvZiBjbHVzdGVycy5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRUb3RhbENsdXN0ZXJzID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmNsdXN0ZXJzXy5sZW5ndGg7XG59O1xuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgZ29vZ2xlIG1hcCB0aGF0IHRoZSBjbHVzdGVyZXIgaXMgYXNzb2NpYXRlZCB3aXRoLlxuICpcbiAqIEByZXR1cm4ge2dvb2dsZS5tYXBzLk1hcH0gVGhlIG1hcC5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRNYXAgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMubWFwXztcbn07XG5cblxuLyoqXG4gKiBTZXRzIHRoZSBnb29nbGUgbWFwIHRoYXQgdGhlIGNsdXN0ZXJlciBpcyBhc3NvY2lhdGVkIHdpdGguXG4gKlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5NYXB9IG1hcCBUaGUgbWFwLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnNldE1hcCA9IGZ1bmN0aW9uKG1hcCkge1xuICB0aGlzLm1hcF8gPSBtYXA7XG59O1xuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgc2l6ZSBvZiB0aGUgZ3JpZC5cbiAqXG4gKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSBncmlkIHNpemUuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0R3JpZFNpemUgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuZ3JpZFNpemVfO1xufTtcblxuXG4vKipcbiAqIFNldHMgdGhlIHNpemUgb2YgdGhlIGdyaWQuXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IHNpemUgVGhlIGdyaWQgc2l6ZS5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5zZXRHcmlkU2l6ZSA9IGZ1bmN0aW9uKHNpemUpIHtcbiAgdGhpcy5ncmlkU2l6ZV8gPSBzaXplO1xufTtcblxuXG4vKipcbiAqIFJldHVybnMgdGhlIG1pbiBjbHVzdGVyIHNpemUuXG4gKlxuICogQHJldHVybiB7bnVtYmVyfSBUaGUgZ3JpZCBzaXplLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldE1pbkNsdXN0ZXJTaXplID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLm1pbkNsdXN0ZXJTaXplXztcbn07XG5cbi8qKlxuICogU2V0cyB0aGUgbWluIGNsdXN0ZXIgc2l6ZS5cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gc2l6ZSBUaGUgZ3JpZCBzaXplLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnNldE1pbkNsdXN0ZXJTaXplID0gZnVuY3Rpb24oc2l6ZSkge1xuICB0aGlzLm1pbkNsdXN0ZXJTaXplXyA9IHNpemU7XG59O1xuXG5cbi8qKlxuICogRXh0ZW5kcyBhIGJvdW5kcyBvYmplY3QgYnkgdGhlIGdyaWQgc2l6ZS5cbiAqXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLkxhdExuZ0JvdW5kc30gYm91bmRzIFRoZSBib3VuZHMgdG8gZXh0ZW5kLlxuICogQHJldHVybiB7Z29vZ2xlLm1hcHMuTGF0TG5nQm91bmRzfSBUaGUgZXh0ZW5kZWQgYm91bmRzLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldEV4dGVuZGVkQm91bmRzID0gZnVuY3Rpb24oYm91bmRzKSB7XG4gIHZhciBwcm9qZWN0aW9uID0gdGhpcy5nZXRQcm9qZWN0aW9uKCk7XG5cbiAgLy8gVHVybiB0aGUgYm91bmRzIGludG8gbGF0bG5nLlxuICB2YXIgdHIgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKGJvdW5kcy5nZXROb3J0aEVhc3QoKS5sYXQoKSxcbiAgICAgIGJvdW5kcy5nZXROb3J0aEVhc3QoKS5sbmcoKSk7XG4gIHZhciBibCA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoYm91bmRzLmdldFNvdXRoV2VzdCgpLmxhdCgpLFxuICAgICAgYm91bmRzLmdldFNvdXRoV2VzdCgpLmxuZygpKTtcblxuICAvLyBDb252ZXJ0IHRoZSBwb2ludHMgdG8gcGl4ZWxzIGFuZCB0aGUgZXh0ZW5kIG91dCBieSB0aGUgZ3JpZCBzaXplLlxuICB2YXIgdHJQaXggPSBwcm9qZWN0aW9uLmZyb21MYXRMbmdUb0RpdlBpeGVsKHRyKTtcbiAgdHJQaXgueCArPSB0aGlzLmdyaWRTaXplXztcbiAgdHJQaXgueSAtPSB0aGlzLmdyaWRTaXplXztcblxuICB2YXIgYmxQaXggPSBwcm9qZWN0aW9uLmZyb21MYXRMbmdUb0RpdlBpeGVsKGJsKTtcbiAgYmxQaXgueCAtPSB0aGlzLmdyaWRTaXplXztcbiAgYmxQaXgueSArPSB0aGlzLmdyaWRTaXplXztcblxuICAvLyBDb252ZXJ0IHRoZSBwaXhlbCBwb2ludHMgYmFjayB0byBMYXRMbmdcbiAgdmFyIG5lID0gcHJvamVjdGlvbi5mcm9tRGl2UGl4ZWxUb0xhdExuZyh0clBpeCk7XG4gIHZhciBzdyA9IHByb2plY3Rpb24uZnJvbURpdlBpeGVsVG9MYXRMbmcoYmxQaXgpO1xuXG4gIC8vIEV4dGVuZCB0aGUgYm91bmRzIHRvIGNvbnRhaW4gdGhlIG5ldyBib3VuZHMuXG4gIGJvdW5kcy5leHRlbmQobmUpO1xuICBib3VuZHMuZXh0ZW5kKHN3KTtcblxuICByZXR1cm4gYm91bmRzO1xufTtcblxuXG4vKipcbiAqIERldGVybWlucyBpZiBhIG1hcmtlciBpcyBjb250YWluZWQgaW4gYSBib3VuZHMuXG4gKlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5NYXJrZXJ9IG1hcmtlciBUaGUgbWFya2VyIHRvIGNoZWNrLlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5MYXRMbmdCb3VuZHN9IGJvdW5kcyBUaGUgYm91bmRzIHRvIGNoZWNrIGFnYWluc3QuXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIHRoZSBtYXJrZXIgaXMgaW4gdGhlIGJvdW5kcy5cbiAqIEBwcml2YXRlXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuaXNNYXJrZXJJbkJvdW5kc18gPSBmdW5jdGlvbihtYXJrZXIsIGJvdW5kcykge1xuICByZXR1cm4gYm91bmRzLmNvbnRhaW5zKG1hcmtlci5nZXRQb3NpdGlvbigpKTtcbn07XG5cblxuLyoqXG4gKiBDbGVhcnMgYWxsIGNsdXN0ZXJzIGFuZCBtYXJrZXJzIGZyb20gdGhlIGNsdXN0ZXJlci5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5jbGVhck1hcmtlcnMgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5yZXNldFZpZXdwb3J0KHRydWUpO1xuXG4gIC8vIFNldCB0aGUgbWFya2VycyBhIGVtcHR5IGFycmF5LlxuICB0aGlzLm1hcmtlcnNfID0gW107XG59O1xuXG5cbi8qKlxuICogQ2xlYXJzIGFsbCBleGlzdGluZyBjbHVzdGVycyBhbmQgcmVjcmVhdGVzIHRoZW0uXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdF9oaWRlIFRvIGFsc28gaGlkZSB0aGUgbWFya2VyLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnJlc2V0Vmlld3BvcnQgPSBmdW5jdGlvbihvcHRfaGlkZSkge1xuICAvLyBSZW1vdmUgYWxsIHRoZSBjbHVzdGVyc1xuICBmb3IgKHZhciBpID0gMCwgY2x1c3RlcjsgY2x1c3RlciA9IHRoaXMuY2x1c3RlcnNfW2ldOyBpKyspIHtcbiAgICBjbHVzdGVyLnJlbW92ZSgpO1xuICB9XG5cbiAgLy8gUmVzZXQgdGhlIG1hcmtlcnMgdG8gbm90IGJlIGFkZGVkIGFuZCB0byBiZSBpbnZpc2libGUuXG4gIGZvciAodmFyIGkgPSAwLCBtYXJrZXI7IG1hcmtlciA9IHRoaXMubWFya2Vyc19baV07IGkrKykge1xuICAgIG1hcmtlci5pc0FkZGVkID0gZmFsc2U7XG4gICAgaWYgKG9wdF9oaWRlKSB7XG4gICAgICBtYXJrZXIuc2V0TWFwKG51bGwpO1xuICAgIH1cbiAgfVxuXG4gIHRoaXMuY2x1c3RlcnNfID0gW107XG59O1xuXG4vKipcbiAqXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUucmVwYWludCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgb2xkQ2x1c3RlcnMgPSB0aGlzLmNsdXN0ZXJzXy5zbGljZSgpO1xuICB0aGlzLmNsdXN0ZXJzXy5sZW5ndGggPSAwO1xuICB0aGlzLnJlc2V0Vmlld3BvcnQoKTtcbiAgdGhpcy5yZWRyYXcoKTtcblxuICAvLyBSZW1vdmUgdGhlIG9sZCBjbHVzdGVycy5cbiAgLy8gRG8gaXQgaW4gYSB0aW1lb3V0IHNvIHRoZSBvdGhlciBjbHVzdGVycyBoYXZlIGJlZW4gZHJhd24gZmlyc3QuXG4gIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgIGZvciAodmFyIGkgPSAwLCBjbHVzdGVyOyBjbHVzdGVyID0gb2xkQ2x1c3RlcnNbaV07IGkrKykge1xuICAgICAgY2x1c3Rlci5yZW1vdmUoKTtcbiAgICB9XG4gIH0sIDApO1xufTtcblxuXG4vKipcbiAqIFJlZHJhd3MgdGhlIGNsdXN0ZXJzLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnJlZHJhdyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmNyZWF0ZUNsdXN0ZXJzXygpO1xufTtcblxuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGRpc3RhbmNlIGJldHdlZW4gdHdvIGxhdGxuZyBsb2NhdGlvbnMgaW4ga20uXG4gKiBAc2VlIGh0dHA6Ly93d3cubW92YWJsZS10eXBlLmNvLnVrL3NjcmlwdHMvbGF0bG9uZy5odG1sXG4gKlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5MYXRMbmd9IHAxIFRoZSBmaXJzdCBsYXQgbG5nIHBvaW50LlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5MYXRMbmd9IHAyIFRoZSBzZWNvbmQgbGF0IGxuZyBwb2ludC5cbiAqIEByZXR1cm4ge251bWJlcn0gVGhlIGRpc3RhbmNlIGJldHdlZW4gdGhlIHR3byBwb2ludHMgaW4ga20uXG4gKiBAcHJpdmF0ZVxuKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZGlzdGFuY2VCZXR3ZWVuUG9pbnRzXyA9IGZ1bmN0aW9uKHAxLCBwMikge1xuICBpZiAoIXAxIHx8ICFwMikge1xuICAgIHJldHVybiAwO1xuICB9XG5cbiAgdmFyIFIgPSA2MzcxOyAvLyBSYWRpdXMgb2YgdGhlIEVhcnRoIGluIGttXG4gIHZhciBkTGF0ID0gKHAyLmxhdCgpIC0gcDEubGF0KCkpICogTWF0aC5QSSAvIDE4MDtcbiAgdmFyIGRMb24gPSAocDIubG5nKCkgLSBwMS5sbmcoKSkgKiBNYXRoLlBJIC8gMTgwO1xuICB2YXIgYSA9IE1hdGguc2luKGRMYXQgLyAyKSAqIE1hdGguc2luKGRMYXQgLyAyKSArXG4gICAgTWF0aC5jb3MocDEubGF0KCkgKiBNYXRoLlBJIC8gMTgwKSAqIE1hdGguY29zKHAyLmxhdCgpICogTWF0aC5QSSAvIDE4MCkgKlxuICAgIE1hdGguc2luKGRMb24gLyAyKSAqIE1hdGguc2luKGRMb24gLyAyKTtcbiAgdmFyIGMgPSAyICogTWF0aC5hdGFuMihNYXRoLnNxcnQoYSksIE1hdGguc3FydCgxIC0gYSkpO1xuICB2YXIgZCA9IFIgKiBjO1xuICByZXR1cm4gZDtcbn07XG5cblxuLyoqXG4gKiBBZGQgYSBtYXJrZXIgdG8gYSBjbHVzdGVyLCBvciBjcmVhdGVzIGEgbmV3IGNsdXN0ZXIuXG4gKlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5NYXJrZXJ9IG1hcmtlciBUaGUgbWFya2VyIHRvIGFkZC5cbiAqIEBwcml2YXRlXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuYWRkVG9DbG9zZXN0Q2x1c3Rlcl8gPSBmdW5jdGlvbihtYXJrZXIpIHtcbiAgdmFyIGRpc3RhbmNlID0gNDAwMDA7IC8vIFNvbWUgbGFyZ2UgbnVtYmVyXG4gIHZhciBjbHVzdGVyVG9BZGRUbyA9IG51bGw7XG4gIHZhciBwb3MgPSBtYXJrZXIuZ2V0UG9zaXRpb24oKTtcbiAgZm9yICh2YXIgaSA9IDAsIGNsdXN0ZXI7IGNsdXN0ZXIgPSB0aGlzLmNsdXN0ZXJzX1tpXTsgaSsrKSB7XG4gICAgdmFyIGNlbnRlciA9IGNsdXN0ZXIuZ2V0Q2VudGVyKCk7XG4gICAgaWYgKGNlbnRlcikge1xuICAgICAgdmFyIGQgPSB0aGlzLmRpc3RhbmNlQmV0d2VlblBvaW50c18oY2VudGVyLCBtYXJrZXIuZ2V0UG9zaXRpb24oKSk7XG4gICAgICBpZiAoZCA8IGRpc3RhbmNlKSB7XG4gICAgICAgIGRpc3RhbmNlID0gZDtcbiAgICAgICAgY2x1c3RlclRvQWRkVG8gPSBjbHVzdGVyO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmIChjbHVzdGVyVG9BZGRUbyAmJiBjbHVzdGVyVG9BZGRUby5pc01hcmtlckluQ2x1c3RlckJvdW5kcyhtYXJrZXIpKSB7XG4gICAgY2x1c3RlclRvQWRkVG8uYWRkTWFya2VyKG1hcmtlcik7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGNsdXN0ZXIgPSBuZXcgQ2x1c3Rlcih0aGlzKTtcbiAgICBjbHVzdGVyLmFkZE1hcmtlcihtYXJrZXIpO1xuICAgIHRoaXMuY2x1c3RlcnNfLnB1c2goY2x1c3Rlcik7XG4gIH1cbn07XG5cblxuLyoqXG4gKiBDcmVhdGVzIHRoZSBjbHVzdGVycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmNyZWF0ZUNsdXN0ZXJzXyA9IGZ1bmN0aW9uKCkge1xuICBpZiAoIXRoaXMucmVhZHlfKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gR2V0IG91ciBjdXJyZW50IG1hcCB2aWV3IGJvdW5kcy5cbiAgLy8gQ3JlYXRlIGEgbmV3IGJvdW5kcyBvYmplY3Qgc28gd2UgZG9uJ3QgYWZmZWN0IHRoZSBtYXAuXG4gIHZhciBtYXBCb3VuZHMgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nQm91bmRzKHRoaXMubWFwXy5nZXRCb3VuZHMoKS5nZXRTb3V0aFdlc3QoKSxcbiAgICAgIHRoaXMubWFwXy5nZXRCb3VuZHMoKS5nZXROb3J0aEVhc3QoKSk7XG4gIHZhciBib3VuZHMgPSB0aGlzLmdldEV4dGVuZGVkQm91bmRzKG1hcEJvdW5kcyk7XG5cbiAgZm9yICh2YXIgaSA9IDAsIG1hcmtlcjsgbWFya2VyID0gdGhpcy5tYXJrZXJzX1tpXTsgaSsrKSB7XG4gICAgaWYgKCFtYXJrZXIuaXNBZGRlZCAmJiB0aGlzLmlzTWFya2VySW5Cb3VuZHNfKG1hcmtlciwgYm91bmRzKSkge1xuICAgICAgdGhpcy5hZGRUb0Nsb3Nlc3RDbHVzdGVyXyhtYXJrZXIpO1xuICAgIH1cbiAgfVxufTtcblxuXG4vKipcbiAqIEEgY2x1c3RlciB0aGF0IGNvbnRhaW5zIG1hcmtlcnMuXG4gKlxuICogQHBhcmFtIHtNYXJrZXJDbHVzdGVyZXJ9IG1hcmtlckNsdXN0ZXJlciBUaGUgbWFya2VyY2x1c3RlcmVyIHRoYXQgdGhpc1xuICogICAgIGNsdXN0ZXIgaXMgYXNzb2NpYXRlZCB3aXRoLlxuICogQGNvbnN0cnVjdG9yXG4gKiBAaWdub3JlXG4gKi9cbmZ1bmN0aW9uIENsdXN0ZXIobWFya2VyQ2x1c3RlcmVyKSB7XG4gIHRoaXMubWFya2VyQ2x1c3RlcmVyXyA9IG1hcmtlckNsdXN0ZXJlcjtcbiAgdGhpcy5tYXBfID0gbWFya2VyQ2x1c3RlcmVyLmdldE1hcCgpO1xuICB0aGlzLmdyaWRTaXplXyA9IG1hcmtlckNsdXN0ZXJlci5nZXRHcmlkU2l6ZSgpO1xuICB0aGlzLm1pbkNsdXN0ZXJTaXplXyA9IG1hcmtlckNsdXN0ZXJlci5nZXRNaW5DbHVzdGVyU2l6ZSgpO1xuICB0aGlzLmF2ZXJhZ2VDZW50ZXJfID0gbWFya2VyQ2x1c3RlcmVyLmlzQXZlcmFnZUNlbnRlcigpO1xuICB0aGlzLmNlbnRlcl8gPSBudWxsO1xuICB0aGlzLm1hcmtlcnNfID0gW107XG4gIHRoaXMuYm91bmRzXyA9IG51bGw7XG4gIHRoaXMuY2x1c3Rlckljb25fID0gbmV3IENsdXN0ZXJJY29uKHRoaXMsIG1hcmtlckNsdXN0ZXJlci5nZXRTdHlsZXMoKSxcbiAgICAgIG1hcmtlckNsdXN0ZXJlci5nZXRHcmlkU2l6ZSgpKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbnMgaWYgYSBtYXJrZXIgaXMgYWxyZWFkeSBhZGRlZCB0byB0aGUgY2x1c3Rlci5cbiAqXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLk1hcmtlcn0gbWFya2VyIFRoZSBtYXJrZXIgdG8gY2hlY2suXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIHRoZSBtYXJrZXIgaXMgYWxyZWFkeSBhZGRlZC5cbiAqL1xuQ2x1c3Rlci5wcm90b3R5cGUuaXNNYXJrZXJBbHJlYWR5QWRkZWQgPSBmdW5jdGlvbihtYXJrZXIpIHtcbiAgaWYgKHRoaXMubWFya2Vyc18uaW5kZXhPZikge1xuICAgIHJldHVybiB0aGlzLm1hcmtlcnNfLmluZGV4T2YobWFya2VyKSAhPSAtMTtcbiAgfSBlbHNlIHtcbiAgICBmb3IgKHZhciBpID0gMCwgbTsgbSA9IHRoaXMubWFya2Vyc19baV07IGkrKykge1xuICAgICAgaWYgKG0gPT0gbWFya2VyKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59O1xuXG5cbi8qKlxuICogQWRkIGEgbWFya2VyIHRoZSBjbHVzdGVyLlxuICpcbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTWFya2VyfSBtYXJrZXIgVGhlIG1hcmtlciB0byBhZGQuXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIHRoZSBtYXJrZXIgd2FzIGFkZGVkLlxuICovXG5DbHVzdGVyLnByb3RvdHlwZS5hZGRNYXJrZXIgPSBmdW5jdGlvbihtYXJrZXIpIHtcbiAgaWYgKHRoaXMuaXNNYXJrZXJBbHJlYWR5QWRkZWQobWFya2VyKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmICghdGhpcy5jZW50ZXJfKSB7XG4gICAgdGhpcy5jZW50ZXJfID0gbWFya2VyLmdldFBvc2l0aW9uKCk7XG4gICAgdGhpcy5jYWxjdWxhdGVCb3VuZHNfKCk7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHRoaXMuYXZlcmFnZUNlbnRlcl8pIHtcbiAgICAgIHZhciBsID0gdGhpcy5tYXJrZXJzXy5sZW5ndGggKyAxO1xuICAgICAgdmFyIGxhdCA9ICh0aGlzLmNlbnRlcl8ubGF0KCkgKiAobC0xKSArIG1hcmtlci5nZXRQb3NpdGlvbigpLmxhdCgpKSAvIGw7XG4gICAgICB2YXIgbG5nID0gKHRoaXMuY2VudGVyXy5sbmcoKSAqIChsLTEpICsgbWFya2VyLmdldFBvc2l0aW9uKCkubG5nKCkpIC8gbDtcbiAgICAgIHRoaXMuY2VudGVyXyA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmcobGF0LCBsbmcpO1xuICAgICAgdGhpcy5jYWxjdWxhdGVCb3VuZHNfKCk7XG4gICAgfVxuICB9XG5cbiAgbWFya2VyLmlzQWRkZWQgPSB0cnVlO1xuICB0aGlzLm1hcmtlcnNfLnB1c2gobWFya2VyKTtcblxuICB2YXIgbGVuID0gdGhpcy5tYXJrZXJzXy5sZW5ndGg7XG4gIGlmIChsZW4gPCB0aGlzLm1pbkNsdXN0ZXJTaXplXyAmJiBtYXJrZXIuZ2V0TWFwKCkgIT0gdGhpcy5tYXBfKSB7XG4gICAgLy8gTWluIGNsdXN0ZXIgc2l6ZSBub3QgcmVhY2hlZCBzbyBzaG93IHRoZSBtYXJrZXIuXG4gICAgbWFya2VyLnNldE1hcCh0aGlzLm1hcF8pO1xuICB9XG5cbiAgaWYgKGxlbiA9PSB0aGlzLm1pbkNsdXN0ZXJTaXplXykge1xuICAgIC8vIEhpZGUgdGhlIG1hcmtlcnMgdGhhdCB3ZXJlIHNob3dpbmcuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgdGhpcy5tYXJrZXJzX1tpXS5zZXRNYXAobnVsbCk7XG4gICAgfVxuICB9XG5cbiAgaWYgKGxlbiA+PSB0aGlzLm1pbkNsdXN0ZXJTaXplXykge1xuICAgIG1hcmtlci5zZXRNYXAobnVsbCk7XG4gIH1cblxuICB0aGlzLnVwZGF0ZUljb24oKTtcbiAgcmV0dXJuIHRydWU7XG59O1xuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgbWFya2VyIGNsdXN0ZXJlciB0aGF0IHRoZSBjbHVzdGVyIGlzIGFzc29jaWF0ZWQgd2l0aC5cbiAqXG4gKiBAcmV0dXJuIHtNYXJrZXJDbHVzdGVyZXJ9IFRoZSBhc3NvY2lhdGVkIG1hcmtlciBjbHVzdGVyZXIuXG4gKi9cbkNsdXN0ZXIucHJvdG90eXBlLmdldE1hcmtlckNsdXN0ZXJlciA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5tYXJrZXJDbHVzdGVyZXJfO1xufTtcblxuXG4vKipcbiAqIFJldHVybnMgdGhlIGJvdW5kcyBvZiB0aGUgY2x1c3Rlci5cbiAqXG4gKiBAcmV0dXJuIHtnb29nbGUubWFwcy5MYXRMbmdCb3VuZHN9IHRoZSBjbHVzdGVyIGJvdW5kcy5cbiAqL1xuQ2x1c3Rlci5wcm90b3R5cGUuZ2V0Qm91bmRzID0gZnVuY3Rpb24oKSB7XG4gIHZhciBib3VuZHMgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nQm91bmRzKHRoaXMuY2VudGVyXywgdGhpcy5jZW50ZXJfKTtcbiAgdmFyIG1hcmtlcnMgPSB0aGlzLmdldE1hcmtlcnMoKTtcbiAgZm9yICh2YXIgaSA9IDAsIG1hcmtlcjsgbWFya2VyID0gbWFya2Vyc1tpXTsgaSsrKSB7XG4gICAgYm91bmRzLmV4dGVuZChtYXJrZXIuZ2V0UG9zaXRpb24oKSk7XG4gIH1cbiAgcmV0dXJuIGJvdW5kcztcbn07XG5cblxuLyoqXG4gKiBSZW1vdmVzIHRoZSBjbHVzdGVyXG4gKi9cbkNsdXN0ZXIucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmNsdXN0ZXJJY29uXy5yZW1vdmUoKTtcbiAgdGhpcy5tYXJrZXJzXy5sZW5ndGggPSAwO1xuICBkZWxldGUgdGhpcy5tYXJrZXJzXztcbn07XG5cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBjZW50ZXIgb2YgdGhlIGNsdXN0ZXIuXG4gKlxuICogQHJldHVybiB7bnVtYmVyfSBUaGUgY2x1c3RlciBjZW50ZXIuXG4gKi9cbkNsdXN0ZXIucHJvdG90eXBlLmdldFNpemUgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMubWFya2Vyc18ubGVuZ3RoO1xufTtcblxuXG4vKipcbiAqIFJldHVybnMgdGhlIGNlbnRlciBvZiB0aGUgY2x1c3Rlci5cbiAqXG4gKiBAcmV0dXJuIHtBcnJheS48Z29vZ2xlLm1hcHMuTWFya2VyPn0gVGhlIGNsdXN0ZXIgY2VudGVyLlxuICovXG5DbHVzdGVyLnByb3RvdHlwZS5nZXRNYXJrZXJzID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLm1hcmtlcnNfO1xufTtcblxuXG4vKipcbiAqIFJldHVybnMgdGhlIGNlbnRlciBvZiB0aGUgY2x1c3Rlci5cbiAqXG4gKiBAcmV0dXJuIHtnb29nbGUubWFwcy5MYXRMbmd9IFRoZSBjbHVzdGVyIGNlbnRlci5cbiAqL1xuQ2x1c3Rlci5wcm90b3R5cGUuZ2V0Q2VudGVyID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmNlbnRlcl87XG59O1xuXG5cbi8qKlxuICogQ2FsY3VsYXRlZCB0aGUgZXh0ZW5kZWQgYm91bmRzIG9mIHRoZSBjbHVzdGVyIHdpdGggdGhlIGdyaWQuXG4gKlxuICogQHByaXZhdGVcbiAqL1xuQ2x1c3Rlci5wcm90b3R5cGUuY2FsY3VsYXRlQm91bmRzXyA9IGZ1bmN0aW9uKCkge1xuICB2YXIgYm91bmRzID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZ0JvdW5kcyh0aGlzLmNlbnRlcl8sIHRoaXMuY2VudGVyXyk7XG4gIHRoaXMuYm91bmRzXyA9IHRoaXMubWFya2VyQ2x1c3RlcmVyXy5nZXRFeHRlbmRlZEJvdW5kcyhib3VuZHMpO1xufTtcblxuXG4vKipcbiAqIERldGVybWluZXMgaWYgYSBtYXJrZXIgbGllcyBpbiB0aGUgY2x1c3RlcnMgYm91bmRzLlxuICpcbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTWFya2VyfSBtYXJrZXIgVGhlIG1hcmtlciB0byBjaGVjay5cbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdGhlIG1hcmtlciBsaWVzIGluIHRoZSBib3VuZHMuXG4gKi9cbkNsdXN0ZXIucHJvdG90eXBlLmlzTWFya2VySW5DbHVzdGVyQm91bmRzID0gZnVuY3Rpb24obWFya2VyKSB7XG4gIHJldHVybiB0aGlzLmJvdW5kc18uY29udGFpbnMobWFya2VyLmdldFBvc2l0aW9uKCkpO1xufTtcblxuXG4vKipcbiAqIFJldHVybnMgdGhlIG1hcCB0aGF0IHRoZSBjbHVzdGVyIGlzIGFzc29jaWF0ZWQgd2l0aC5cbiAqXG4gKiBAcmV0dXJuIHtnb29nbGUubWFwcy5NYXB9IFRoZSBtYXAuXG4gKi9cbkNsdXN0ZXIucHJvdG90eXBlLmdldE1hcCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5tYXBfO1xufTtcblxuXG4vKipcbiAqIFVwZGF0ZXMgdGhlIGNsdXN0ZXIgaWNvblxuICovXG5DbHVzdGVyLnByb3RvdHlwZS51cGRhdGVJY29uID0gZnVuY3Rpb24oKSB7XG4gIHZhciB6b29tID0gdGhpcy5tYXBfLmdldFpvb20oKTtcbiAgdmFyIG16ID0gdGhpcy5tYXJrZXJDbHVzdGVyZXJfLmdldE1heFpvb20oKTtcblxuICBpZiAobXogJiYgem9vbSA+IG16KSB7XG4gICAgLy8gVGhlIHpvb20gaXMgZ3JlYXRlciB0aGFuIG91ciBtYXggem9vbSBzbyBzaG93IGFsbCB0aGUgbWFya2VycyBpbiBjbHVzdGVyLlxuICAgIGZvciAodmFyIGkgPSAwLCBtYXJrZXI7IG1hcmtlciA9IHRoaXMubWFya2Vyc19baV07IGkrKykge1xuICAgICAgbWFya2VyLnNldE1hcCh0aGlzLm1hcF8pO1xuICAgIH1cbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAodGhpcy5tYXJrZXJzXy5sZW5ndGggPCB0aGlzLm1pbkNsdXN0ZXJTaXplXykge1xuICAgIC8vIE1pbiBjbHVzdGVyIHNpemUgbm90IHlldCByZWFjaGVkLlxuICAgIHRoaXMuY2x1c3Rlckljb25fLmhpZGUoKTtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgbnVtU3R5bGVzID0gdGhpcy5tYXJrZXJDbHVzdGVyZXJfLmdldFN0eWxlcygpLmxlbmd0aDtcbiAgdmFyIHN1bXMgPSB0aGlzLm1hcmtlckNsdXN0ZXJlcl8uZ2V0Q2FsY3VsYXRvcigpKHRoaXMubWFya2Vyc18sIG51bVN0eWxlcyk7XG4gIHRoaXMuY2x1c3Rlckljb25fLnNldENlbnRlcih0aGlzLmNlbnRlcl8pO1xuICB0aGlzLmNsdXN0ZXJJY29uXy5zZXRTdW1zKHN1bXMpO1xuICB0aGlzLmNsdXN0ZXJJY29uXy5zaG93KCk7XG59O1xuXG5cbi8qKlxuICogQSBjbHVzdGVyIGljb25cbiAqXG4gKiBAcGFyYW0ge0NsdXN0ZXJ9IGNsdXN0ZXIgVGhlIGNsdXN0ZXIgdG8gYmUgYXNzb2NpYXRlZCB3aXRoLlxuICogQHBhcmFtIHtPYmplY3R9IHN0eWxlcyBBbiBvYmplY3QgdGhhdCBoYXMgc3R5bGUgcHJvcGVydGllczpcbiAqICAgICAndXJsJzogKHN0cmluZykgVGhlIGltYWdlIHVybC5cbiAqICAgICAnaGVpZ2h0JzogKG51bWJlcikgVGhlIGltYWdlIGhlaWdodC5cbiAqICAgICAnd2lkdGgnOiAobnVtYmVyKSBUaGUgaW1hZ2Ugd2lkdGguXG4gKiAgICAgJ2FuY2hvcic6IChBcnJheSkgVGhlIGFuY2hvciBwb3NpdGlvbiBvZiB0aGUgbGFiZWwgdGV4dC5cbiAqICAgICAndGV4dENvbG9yJzogKHN0cmluZykgVGhlIHRleHQgY29sb3IuXG4gKiAgICAgJ3RleHRTaXplJzogKG51bWJlcikgVGhlIHRleHQgc2l6ZS5cbiAqICAgICAgJ2ZvbnRGYW1pbHknOiAoc3RyaW5nKSBUaGUgZm9udCBmYW1pbHkuXG4gKiAgICAgICdmb250V2VpZ2h0JzogKHN0cmluZykgVGhlIGZvbnQgd2VpZ2h0LlxuICogICAgICdiYWNrZ3JvdW5kUG9zaXRpb246IChzdHJpbmcpIFRoZSBiYWNrZ3JvdW5kIHBvc3RpdGlvbiB4LCB5LlxuICogQHBhcmFtIHtudW1iZXI9fSBvcHRfcGFkZGluZyBPcHRpb25hbCBwYWRkaW5nIHRvIGFwcGx5IHRvIHRoZSBjbHVzdGVyIGljb24uXG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlbmRzIGdvb2dsZS5tYXBzLk92ZXJsYXlWaWV3XG4gKiBAaWdub3JlXG4gKi9cbmZ1bmN0aW9uIENsdXN0ZXJJY29uKGNsdXN0ZXIsIHN0eWxlcywgb3B0X3BhZGRpbmcpIHtcbiAgY2x1c3Rlci5nZXRNYXJrZXJDbHVzdGVyZXIoKS5leHRlbmQoQ2x1c3Rlckljb24sIGdvb2dsZS5tYXBzLk92ZXJsYXlWaWV3KTtcblxuICB0aGlzLnN0eWxlc18gPSBzdHlsZXM7XG4gIHRoaXMucGFkZGluZ18gPSBvcHRfcGFkZGluZyB8fCAwO1xuICB0aGlzLmNsdXN0ZXJfID0gY2x1c3RlcjtcbiAgdGhpcy5jZW50ZXJfID0gbnVsbDtcbiAgdGhpcy5tYXBfID0gY2x1c3Rlci5nZXRNYXAoKTtcbiAgdGhpcy5kaXZfID0gbnVsbDtcbiAgdGhpcy5zdW1zXyA9IG51bGw7XG4gIHRoaXMudmlzaWJsZV8gPSBmYWxzZTtcblxuICB0aGlzLnNldE1hcCh0aGlzLm1hcF8pO1xufVxuXG5cbi8qKlxuICogVHJpZ2dlcnMgdGhlIGNsdXN0ZXJjbGljayBldmVudCBhbmQgem9vbSdzIGlmIHRoZSBvcHRpb24gaXMgc2V0LlxuICovXG5DbHVzdGVySWNvbi5wcm90b3R5cGUudHJpZ2dlckNsdXN0ZXJDbGljayA9IGZ1bmN0aW9uKCkge1xuICB2YXIgbWFya2VyQ2x1c3RlcmVyID0gdGhpcy5jbHVzdGVyXy5nZXRNYXJrZXJDbHVzdGVyZXIoKTtcblxuICAvLyBUcmlnZ2VyIHRoZSBjbHVzdGVyY2xpY2sgZXZlbnQuXG4gIGdvb2dsZS5tYXBzLmV2ZW50LnRyaWdnZXIobWFya2VyQ2x1c3RlcmVyLCAnY2x1c3RlcmNsaWNrJywgdGhpcy5jbHVzdGVyXyk7XG5cbiAgaWYgKG1hcmtlckNsdXN0ZXJlci5pc1pvb21PbkNsaWNrKCkpIHtcbiAgICAvLyBab29tIGludG8gdGhlIGNsdXN0ZXIuXG4gICAgdGhpcy5tYXBfLmZpdEJvdW5kcyh0aGlzLmNsdXN0ZXJfLmdldEJvdW5kcygpKTtcbiAgfVxufTtcblxuXG4vKipcbiAqIEFkZGluZyB0aGUgY2x1c3RlciBpY29uIHRvIHRoZSBkb20uXG4gKiBAaWdub3JlXG4gKi9cbkNsdXN0ZXJJY29uLnByb3RvdHlwZS5vbkFkZCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmRpdl8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcbiAgaWYgKHRoaXMudmlzaWJsZV8pIHtcbiAgICB2YXIgcG9zID0gdGhpcy5nZXRQb3NGcm9tTGF0TG5nXyh0aGlzLmNlbnRlcl8pO1xuICAgIHRoaXMuZGl2Xy5zdHlsZS5jc3NUZXh0ID0gdGhpcy5jcmVhdGVDc3MocG9zKTtcbiAgICB0aGlzLmRpdl8uaW5uZXJIVE1MID0gdGhpcy5zdW1zXy50ZXh0O1xuICB9XG5cbiAgdmFyIHBhbmVzID0gdGhpcy5nZXRQYW5lcygpO1xuICBwYW5lcy5vdmVybGF5TW91c2VUYXJnZXQuYXBwZW5kQ2hpbGQodGhpcy5kaXZfKTtcblxuICB2YXIgdGhhdCA9IHRoaXM7XG4gIGdvb2dsZS5tYXBzLmV2ZW50LmFkZERvbUxpc3RlbmVyKHRoaXMuZGl2XywgJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgdGhhdC50cmlnZ2VyQ2x1c3RlckNsaWNrKCk7XG4gIH0pO1xufTtcblxuXG4vKipcbiAqIFJldHVybnMgdGhlIHBvc2l0aW9uIHRvIHBsYWNlIHRoZSBkaXYgZGVuZGluZyBvbiB0aGUgbGF0bG5nLlxuICpcbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTGF0TG5nfSBsYXRsbmcgVGhlIHBvc2l0aW9uIGluIGxhdGxuZy5cbiAqIEByZXR1cm4ge2dvb2dsZS5tYXBzLlBvaW50fSBUaGUgcG9zaXRpb24gaW4gcGl4ZWxzLlxuICogQHByaXZhdGVcbiAqL1xuQ2x1c3Rlckljb24ucHJvdG90eXBlLmdldFBvc0Zyb21MYXRMbmdfID0gZnVuY3Rpb24obGF0bG5nKSB7XG4gIHZhciBwb3MgPSB0aGlzLmdldFByb2plY3Rpb24oKS5mcm9tTGF0TG5nVG9EaXZQaXhlbChsYXRsbmcpO1xuICBwb3MueCAtPSBwYXJzZUludCh0aGlzLndpZHRoXyAvIDIsIDEwKTtcbiAgcG9zLnkgLT0gcGFyc2VJbnQodGhpcy5oZWlnaHRfIC8gMiwgMTApO1xuICByZXR1cm4gcG9zO1xufTtcblxuXG4vKipcbiAqIERyYXcgdGhlIGljb24uXG4gKiBAaWdub3JlXG4gKi9cbkNsdXN0ZXJJY29uLnByb3RvdHlwZS5kcmF3ID0gZnVuY3Rpb24oKSB7XG4gIGlmICh0aGlzLnZpc2libGVfKSB7XG4gICAgdmFyIHBvcyA9IHRoaXMuZ2V0UG9zRnJvbUxhdExuZ18odGhpcy5jZW50ZXJfKTtcbiAgICB0aGlzLmRpdl8uc3R5bGUudG9wID0gcG9zLnkgKyAncHgnO1xuICAgIHRoaXMuZGl2Xy5zdHlsZS5sZWZ0ID0gcG9zLnggKyAncHgnO1xuICB9XG59O1xuXG5cbi8qKlxuICogSGlkZSB0aGUgaWNvbi5cbiAqL1xuQ2x1c3Rlckljb24ucHJvdG90eXBlLmhpZGUgPSBmdW5jdGlvbigpIHtcbiAgaWYgKHRoaXMuZGl2Xykge1xuICAgIHRoaXMuZGl2Xy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICB9XG4gIHRoaXMudmlzaWJsZV8gPSBmYWxzZTtcbn07XG5cblxuLyoqXG4gKiBQb3NpdGlvbiBhbmQgc2hvdyB0aGUgaWNvbi5cbiAqL1xuQ2x1c3Rlckljb24ucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbigpIHtcbiAgaWYgKHRoaXMuZGl2Xykge1xuICAgIHZhciBwb3MgPSB0aGlzLmdldFBvc0Zyb21MYXRMbmdfKHRoaXMuY2VudGVyXyk7XG4gICAgdGhpcy5kaXZfLnN0eWxlLmNzc1RleHQgPSB0aGlzLmNyZWF0ZUNzcyhwb3MpO1xuICAgIHRoaXMuZGl2Xy5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gIH1cbiAgdGhpcy52aXNpYmxlXyA9IHRydWU7XG59O1xuXG5cbi8qKlxuICogUmVtb3ZlIHRoZSBpY29uIGZyb20gdGhlIG1hcFxuICovXG5DbHVzdGVySWNvbi5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuc2V0TWFwKG51bGwpO1xufTtcblxuXG4vKipcbiAqIEltcGxlbWVudGF0aW9uIG9mIHRoZSBvblJlbW92ZSBpbnRlcmZhY2UuXG4gKiBAaWdub3JlXG4gKi9cbkNsdXN0ZXJJY29uLnByb3RvdHlwZS5vblJlbW92ZSA9IGZ1bmN0aW9uKCkge1xuICBpZiAodGhpcy5kaXZfICYmIHRoaXMuZGl2Xy5wYXJlbnROb2RlKSB7XG4gICAgdGhpcy5oaWRlKCk7XG4gICAgdGhpcy5kaXZfLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5kaXZfKTtcbiAgICB0aGlzLmRpdl8gPSBudWxsO1xuICB9XG59O1xuXG5cbi8qKlxuICogU2V0IHRoZSBzdW1zIG9mIHRoZSBpY29uLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdW1zIFRoZSBzdW1zIGNvbnRhaW5pbmc6XG4gKiAgICd0ZXh0JzogKHN0cmluZykgVGhlIHRleHQgdG8gZGlzcGxheSBpbiB0aGUgaWNvbi5cbiAqICAgJ2luZGV4JzogKG51bWJlcikgVGhlIHN0eWxlIGluZGV4IG9mIHRoZSBpY29uLlxuICovXG5DbHVzdGVySWNvbi5wcm90b3R5cGUuc2V0U3VtcyA9IGZ1bmN0aW9uKHN1bXMpIHtcbiAgdGhpcy5zdW1zXyA9IHN1bXM7XG4gIHRoaXMudGV4dF8gPSBzdW1zLnRleHQ7XG4gIHRoaXMuaW5kZXhfID0gc3Vtcy5pbmRleDtcbiAgaWYgKHRoaXMuZGl2Xykge1xuICAgIHRoaXMuZGl2Xy5pbm5lckhUTUwgPSBzdW1zLnRleHQ7XG4gIH1cblxuICB0aGlzLnVzZVN0eWxlKCk7XG59O1xuXG5cbi8qKlxuICogU2V0cyB0aGUgaWNvbiB0byB0aGUgdGhlIHN0eWxlcy5cbiAqL1xuQ2x1c3Rlckljb24ucHJvdG90eXBlLnVzZVN0eWxlID0gZnVuY3Rpb24oKSB7XG4gIHZhciBpbmRleCA9IE1hdGgubWF4KDAsIHRoaXMuc3Vtc18uaW5kZXggLSAxKTtcbiAgaW5kZXggPSBNYXRoLm1pbih0aGlzLnN0eWxlc18ubGVuZ3RoIC0gMSwgaW5kZXgpO1xuICB2YXIgc3R5bGUgPSB0aGlzLnN0eWxlc19baW5kZXhdO1xuICB0aGlzLnVybF8gPSBzdHlsZVsndXJsJ107XG4gIHRoaXMuaGVpZ2h0XyA9IHN0eWxlWydoZWlnaHQnXTtcbiAgdGhpcy53aWR0aF8gPSBzdHlsZVsnd2lkdGgnXTtcbiAgdGhpcy50ZXh0Q29sb3JfID0gc3R5bGVbJ3RleHRDb2xvciddO1xuICB0aGlzLmFuY2hvcl8gPSBzdHlsZVsnYW5jaG9yJ107XG4gIHRoaXMudGV4dFNpemVfID0gc3R5bGVbJ3RleHRTaXplJ107XG4gIHRoaXMuZm9udEZhbWlseV8gPSBzdHlsZVsnZm9udEZhbWlseSddO1xuICB0aGlzLmZvbnRXZWlnaHRfID0gc3R5bGVbJ2ZvbnRXZWlnaHQnXTtcbiAgdGhpcy5iYWNrZ3JvdW5kUG9zaXRpb25fID0gc3R5bGVbJ2JhY2tncm91bmRQb3NpdGlvbiddO1xufTtcblxuXG4vKipcbiAqIFNldHMgdGhlIGNlbnRlciBvZiB0aGUgaWNvbi5cbiAqXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLkxhdExuZ30gY2VudGVyIFRoZSBsYXRsbmcgdG8gc2V0IGFzIHRoZSBjZW50ZXIuXG4gKi9cbkNsdXN0ZXJJY29uLnByb3RvdHlwZS5zZXRDZW50ZXIgPSBmdW5jdGlvbihjZW50ZXIpIHtcbiAgdGhpcy5jZW50ZXJfID0gY2VudGVyO1xufTtcblxuXG4vKipcbiAqIENyZWF0ZSB0aGUgY3NzIHRleHQgYmFzZWQgb24gdGhlIHBvc2l0aW9uIG9mIHRoZSBpY29uLlxuICpcbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuUG9pbnR9IHBvcyBUaGUgcG9zaXRpb24uXG4gKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBjc3Mgc3R5bGUgdGV4dC5cbiAqL1xuQ2x1c3Rlckljb24ucHJvdG90eXBlLmNyZWF0ZUNzcyA9IGZ1bmN0aW9uKHBvcykge1xuICB2YXIgc3R5bGUgPSBbXTtcbiAgc3R5bGUucHVzaCgnYmFja2dyb3VuZC1pbWFnZTp1cmwoJyArIHRoaXMudXJsXyArICcpOycpO1xuICB2YXIgYmFja2dyb3VuZFBvc2l0aW9uID0gdGhpcy5iYWNrZ3JvdW5kUG9zaXRpb25fID8gdGhpcy5iYWNrZ3JvdW5kUG9zaXRpb25fIDogJzAgMCc7XG4gIHN0eWxlLnB1c2goJ2JhY2tncm91bmQtcG9zaXRpb246JyArIGJhY2tncm91bmRQb3NpdGlvbiArICc7Jyk7XG5cbiAgaWYgKHR5cGVvZiB0aGlzLmFuY2hvcl8gPT09ICdvYmplY3QnKSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLmFuY2hvcl9bMF0gPT09ICdudW1iZXInICYmIHRoaXMuYW5jaG9yX1swXSA+IDAgJiZcbiAgICAgICAgdGhpcy5hbmNob3JfWzBdIDwgdGhpcy5oZWlnaHRfKSB7XG4gICAgICBzdHlsZS5wdXNoKCdoZWlnaHQ6JyArICh0aGlzLmhlaWdodF8gLSB0aGlzLmFuY2hvcl9bMF0pICtcbiAgICAgICAgICAncHg7IHBhZGRpbmctdG9wOicgKyB0aGlzLmFuY2hvcl9bMF0gKyAncHg7Jyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlLnB1c2goJ2hlaWdodDonICsgdGhpcy5oZWlnaHRfICsgJ3B4OyBsaW5lLWhlaWdodDonICsgdGhpcy5oZWlnaHRfICtcbiAgICAgICAgICAncHg7Jyk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgdGhpcy5hbmNob3JfWzFdID09PSAnbnVtYmVyJyAmJiB0aGlzLmFuY2hvcl9bMV0gPiAwICYmXG4gICAgICAgIHRoaXMuYW5jaG9yX1sxXSA8IHRoaXMud2lkdGhfKSB7XG4gICAgICBzdHlsZS5wdXNoKCd3aWR0aDonICsgKHRoaXMud2lkdGhfIC0gdGhpcy5hbmNob3JfWzFdKSArXG4gICAgICAgICAgJ3B4OyBwYWRkaW5nLWxlZnQ6JyArIHRoaXMuYW5jaG9yX1sxXSArICdweDsnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3R5bGUucHVzaCgnd2lkdGg6JyArIHRoaXMud2lkdGhfICsgJ3B4OyB0ZXh0LWFsaWduOmNlbnRlcjsnKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgc3R5bGUucHVzaCgnaGVpZ2h0OicgKyB0aGlzLmhlaWdodF8gKyAncHg7IGxpbmUtaGVpZ2h0OicgK1xuICAgICAgICB0aGlzLmhlaWdodF8gKyAncHg7IHdpZHRoOicgKyB0aGlzLndpZHRoXyArICdweDsgdGV4dC1hbGlnbjpjZW50ZXI7Jyk7XG4gIH1cblxuICB2YXIgdHh0Q29sb3IgPSB0aGlzLnRleHRDb2xvcl8gPyB0aGlzLnRleHRDb2xvcl8gOiAnYmxhY2snO1xuICB2YXIgdHh0U2l6ZSA9IHRoaXMudGV4dFNpemVfID8gdGhpcy50ZXh0U2l6ZV8gOiAxMTtcbiAgdmFyIGZvbnRGYW1pbHkgPSB0aGlzLmZvbnRGYW1pbHlfID8gdGhpcy5mb250RmFtaWx5XyA6ICdBcmlhbCxzYW5zLXNlcmlmJztcbiAgdmFyIGZvbnRXZWlnaHQgPSB0aGlzLmZvbnRXZWlnaHRfID8gdGhpcy5mb250V2VpZ2h0XyA6ICc0MDAnO1xuXG4gIHN0eWxlLnB1c2goJ2N1cnNvcjpwb2ludGVyOyB0b3A6JyArIHBvcy55ICsgJ3B4OyBsZWZ0OicgK1xuICAgICAgcG9zLnggKyAncHg7IGNvbG9yOicgKyB0eHRDb2xvciArICc7IHBvc2l0aW9uOmFic29sdXRlOyBmb250LXNpemU6JyArXG4gICAgICB0eHRTaXplICsgJ3B4OyBmb250LWZhbWlseTonICsgZm9udEZhbWlseSArICc7IGZvbnQtd2VpZ2h0OicgKyBmb250V2VpZ2h0ICsgJzsnKTtcbiAgcmV0dXJuIHN0eWxlLmpvaW4oJycpO1xufTtcblxuXG4vLyBFeHBvcnQgU3ltYm9scyBmb3IgQ2xvc3VyZVxuLy8gSWYgeW91IGFyZSBub3QgZ29pbmcgdG8gY29tcGlsZSB3aXRoIGNsb3N1cmUgdGhlbiB5b3UgY2FuIHJlbW92ZSB0aGVcbi8vIGNvZGUgYmVsb3cuXG5nbG9iYWxbJ01hcmtlckNsdXN0ZXJlciddID0gTWFya2VyQ2x1c3RlcmVyO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnYWRkTWFya2VyJ10gPSBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmFkZE1hcmtlcjtcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ2FkZE1hcmtlcnMnXSA9IE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuYWRkTWFya2Vycztcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ2NsZWFyTWFya2VycyddID1cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmNsZWFyTWFya2Vycztcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ2ZpdE1hcFRvTWFya2VycyddID1cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmZpdE1hcFRvTWFya2Vycztcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ2dldENhbGN1bGF0b3InXSA9XG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRDYWxjdWxhdG9yO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnZ2V0R3JpZFNpemUnXSA9XG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRHcmlkU2l6ZTtcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ2dldEV4dGVuZGVkQm91bmRzJ10gPVxuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0RXh0ZW5kZWRCb3VuZHM7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydnZXRNYXAnXSA9IE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0TWFwO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnZ2V0TWFya2VycyddID0gTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRNYXJrZXJzO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnZ2V0TWF4Wm9vbSddID0gTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRNYXhab29tO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnZ2V0U3R5bGVzJ10gPSBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldFN0eWxlcztcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ2dldFRvdGFsQ2x1c3RlcnMnXSA9XG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRUb3RhbENsdXN0ZXJzO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnZ2V0VG90YWxNYXJrZXJzJ10gPVxuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0VG90YWxNYXJrZXJzO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsncmVkcmF3J10gPSBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnJlZHJhdztcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ3JlbW92ZU1hcmtlciddID1cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnJlbW92ZU1hcmtlcjtcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ3JlbW92ZU1hcmtlcnMnXSA9XG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5yZW1vdmVNYXJrZXJzO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsncmVzZXRWaWV3cG9ydCddID1cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnJlc2V0Vmlld3BvcnQ7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydyZXBhaW50J10gPVxuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUucmVwYWludDtcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ3NldENhbGN1bGF0b3InXSA9XG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5zZXRDYWxjdWxhdG9yO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnc2V0R3JpZFNpemUnXSA9XG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5zZXRHcmlkU2l6ZTtcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ3NldE1heFpvb20nXSA9XG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5zZXRNYXhab29tO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnb25BZGQnXSA9IE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUub25BZGQ7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydkcmF3J10gPSBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmRyYXc7XG5cbkNsdXN0ZXIucHJvdG90eXBlWydnZXRDZW50ZXInXSA9IENsdXN0ZXIucHJvdG90eXBlLmdldENlbnRlcjtcbkNsdXN0ZXIucHJvdG90eXBlWydnZXRTaXplJ10gPSBDbHVzdGVyLnByb3RvdHlwZS5nZXRTaXplO1xuQ2x1c3Rlci5wcm90b3R5cGVbJ2dldE1hcmtlcnMnXSA9IENsdXN0ZXIucHJvdG90eXBlLmdldE1hcmtlcnM7XG5cbkNsdXN0ZXJJY29uLnByb3RvdHlwZVsnb25BZGQnXSA9IENsdXN0ZXJJY29uLnByb3RvdHlwZS5vbkFkZDtcbkNsdXN0ZXJJY29uLnByb3RvdHlwZVsnZHJhdyddID0gQ2x1c3Rlckljb24ucHJvdG90eXBlLmRyYXc7XG5DbHVzdGVySWNvbi5wcm90b3R5cGVbJ29uUmVtb3ZlJ10gPSBDbHVzdGVySWNvbi5wcm90b3R5cGUub25SZW1vdmU7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBNYXJrZXJDbHVzdGVyZXI7XG4iLCIvKipcbiAqIGpRdWVyeSBCYXIgUmF0aW5nIFBsdWdpbiB2MS4yLjJcbiAqXG4gKiBodHRwOi8vZ2l0aHViLmNvbS9hbnRlbm5haW8vanF1ZXJ5LWJhci1yYXRpbmdcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTItMjAxNiBLYXppayBQaWV0cnVzemV3c2tpXG4gKlxuICogVGhpcyBwbHVnaW4gaXMgYXZhaWxhYmxlIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cbiAqIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gKi9cbihmdW5jdGlvbiAoZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgLy8gQU1EXG4gICAgICAgIGRlZmluZShbJ2pxdWVyeSddLCBmYWN0b3J5KTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgICAgIC8vIE5vZGUvQ29tbW9uSlNcbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoJ2pxdWVyeScpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBicm93c2VyIGdsb2JhbHNcbiAgICAgICAgZmFjdG9yeShqUXVlcnkpO1xuICAgIH1cbn0oZnVuY3Rpb24gKCQpIHtcblxuICAgIHZhciBCYXJSYXRpbmcgPSAoZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgZnVuY3Rpb24gQmFyUmF0aW5nKCkge1xuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgICAgICAvLyB3cmFwIGVsZW1lbnQgaW4gYSB3cmFwcGVyIGRpdlxuICAgICAgICAgICAgdmFyIHdyYXBFbGVtZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNsYXNzZXMgPSBbJ2JyLXdyYXBwZXInXTtcblxuICAgICAgICAgICAgICAgIGlmIChzZWxmLm9wdGlvbnMudGhlbWUgIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzZXMucHVzaCgnYnItdGhlbWUtJyArIHNlbGYub3B0aW9ucy50aGVtZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgc2VsZi4kZWxlbS53cmFwKCQoJzxkaXYgLz4nLCB7XG4gICAgICAgICAgICAgICAgICAgICdjbGFzcyc6IGNsYXNzZXMuam9pbignICcpXG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gdW53cmFwIGVsZW1lbnRcbiAgICAgICAgICAgIHZhciB1bndyYXBFbGVtZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgc2VsZi4kZWxlbS51bndyYXAoKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIGZpbmQgb3B0aW9uIGJ5IHZhbHVlXG4gICAgICAgICAgICB2YXIgZmluZE9wdGlvbiA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCQuaXNOdW1lcmljKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IE1hdGguZmxvb3IodmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiAkKCdvcHRpb25bdmFsdWU9XCInICsgdmFsdWUgICsgJ1wiXScsIHNlbGYuJGVsZW0pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gZ2V0IGluaXRpYWwgb3B0aW9uXG4gICAgICAgICAgICB2YXIgZ2V0SW5pdGlhbE9wdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBpbml0aWFsUmF0aW5nID0gc2VsZi5vcHRpb25zLmluaXRpYWxSYXRpbmc7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWluaXRpYWxSYXRpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQoJ29wdGlvbjpzZWxlY3RlZCcsIHNlbGYuJGVsZW0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBmaW5kT3B0aW9uKGluaXRpYWxSYXRpbmcpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gZ2V0IGVtcHR5IG9wdGlvblxuICAgICAgICAgICAgdmFyIGdldEVtcHR5T3B0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyICRlbXB0eU9wdCA9IHNlbGYuJGVsZW0uZmluZCgnb3B0aW9uW3ZhbHVlPVwiJyArIHNlbGYub3B0aW9ucy5lbXB0eVZhbHVlICsgJ1wiXScpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCEkZW1wdHlPcHQubGVuZ3RoICYmIHNlbGYub3B0aW9ucy5hbGxvd0VtcHR5KSB7XG4gICAgICAgICAgICAgICAgICAgICRlbXB0eU9wdCA9ICQoJzxvcHRpb24gLz4nLCB7ICd2YWx1ZSc6IHNlbGYub3B0aW9ucy5lbXB0eVZhbHVlIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAkZW1wdHlPcHQucHJlcGVuZFRvKHNlbGYuJGVsZW0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiAkZW1wdHlPcHQ7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBnZXQgZGF0YVxuICAgICAgICAgICAgdmFyIGdldERhdGEgPSBmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IHNlbGYuJGVsZW0uZGF0YSgnYmFycmF0aW5nJyk7XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGtleSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGFba2V5XTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIHNldCBkYXRhXG4gICAgICAgICAgICB2YXIgc2V0RGF0YSA9IGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLmRhdGEoJ2JhcnJhdGluZycsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLmRhdGEoJ2JhcnJhdGluZycpW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBzYXZlIGRhdGEgb24gZWxlbWVudFxuICAgICAgICAgICAgdmFyIHNhdmVEYXRhT25FbGVtZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyICRvcHQgPSBnZXRJbml0aWFsT3B0aW9uKCk7XG4gICAgICAgICAgICAgICAgdmFyICRlbXB0eU9wdCA9IGdldEVtcHR5T3B0aW9uKCk7XG5cbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSAkb3B0LnZhbCgpO1xuICAgICAgICAgICAgICAgIHZhciB0ZXh0ID0gJG9wdC5kYXRhKCdodG1sJykgPyAkb3B0LmRhdGEoJ2h0bWwnKSA6ICRvcHQudGV4dCgpO1xuXG4gICAgICAgICAgICAgICAgLy8gaWYgdGhlIGFsbG93RW1wdHkgb3B0aW9uIGlzIG5vdCBzZXQgbGV0J3MgY2hlY2sgaWYgZW1wdHkgb3B0aW9uIGV4aXN0cyBpbiB0aGUgc2VsZWN0IGZpZWxkXG4gICAgICAgICAgICAgICAgdmFyIGFsbG93RW1wdHkgPSAoc2VsZi5vcHRpb25zLmFsbG93RW1wdHkgIT09IG51bGwpID9cbiAgICAgICAgICAgICAgICAgICAgc2VsZi5vcHRpb25zLmFsbG93RW1wdHkgOlxuICAgICAgICAgICAgICAgICAgICAhISRlbXB0eU9wdC5sZW5ndGg7XG5cbiAgICAgICAgICAgICAgICB2YXIgZW1wdHlWYWx1ZSA9ICgkZW1wdHlPcHQubGVuZ3RoKSA/ICRlbXB0eU9wdC52YWwoKSA6IG51bGw7XG4gICAgICAgICAgICAgICAgdmFyIGVtcHR5VGV4dCA9ICgkZW1wdHlPcHQubGVuZ3RoKSA/ICRlbXB0eU9wdC50ZXh0KCkgOiBudWxsO1xuXG4gICAgICAgICAgICAgICAgc2V0RGF0YShudWxsLCB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJPcHRpb25zOiBzZWxmLm9wdGlvbnMsXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gaW5pdGlhbCByYXRpbmcgYmFzZWQgb24gdGhlIE9QVElPTiB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICByYXRpbmdWYWx1ZTogdmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIHJhdGluZ1RleHQ6IHRleHQsXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gcmF0aW5nIHdpbGwgYmUgcmVzdG9yZWQgYnkgY2FsbGluZyBjbGVhciBtZXRob2RcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxSYXRpbmdWYWx1ZTogdmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsUmF0aW5nVGV4dDogdGV4dCxcblxuICAgICAgICAgICAgICAgICAgICAvLyBhbGxvdyBlbXB0eSByYXRpbmdzP1xuICAgICAgICAgICAgICAgICAgICBhbGxvd0VtcHR5OiBhbGxvd0VtcHR5LFxuXG4gICAgICAgICAgICAgICAgICAgIC8vIHJhdGluZyB2YWx1ZSBhbmQgdGV4dCBvZiB0aGUgZW1wdHkgT1BUSU9OXG4gICAgICAgICAgICAgICAgICAgIGVtcHR5UmF0aW5nVmFsdWU6IGVtcHR5VmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIGVtcHR5UmF0aW5nVGV4dDogZW1wdHlUZXh0LFxuXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlYWQtb25seSBzdGF0ZVxuICAgICAgICAgICAgICAgICAgICByZWFkT25seTogc2VsZi5vcHRpb25zLnJlYWRvbmx5LFxuXG4gICAgICAgICAgICAgICAgICAgIC8vIGRpZCB0aGUgdXNlciBhbHJlYWR5IHNlbGVjdCBhIHJhdGluZz9cbiAgICAgICAgICAgICAgICAgICAgcmF0aW5nTWFkZTogZmFsc2VcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIHJlbW92ZSBkYXRhIG9uIGVsZW1lbnRcbiAgICAgICAgICAgIHZhciByZW1vdmVEYXRhT25FbGVtZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgc2VsZi4kZWxlbS5yZW1vdmVEYXRhKCdiYXJyYXRpbmcnKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIHJldHVybiBjdXJyZW50IHJhdGluZyB0ZXh0XG4gICAgICAgICAgICB2YXIgcmF0aW5nVGV4dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBnZXREYXRhKCdyYXRpbmdUZXh0Jyk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyByZXR1cm4gY3VycmVudCByYXRpbmcgdmFsdWVcbiAgICAgICAgICAgIHZhciByYXRpbmdWYWx1ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBnZXREYXRhKCdyYXRpbmdWYWx1ZScpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gYnVpbGQgd2lkZ2V0IGFuZCByZXR1cm4galF1ZXJ5IGVsZW1lbnRcbiAgICAgICAgICAgIHZhciBidWlsZFdpZGdldCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciAkdyA9ICQoJzxkaXYgLz4nLCB7ICdjbGFzcyc6ICdici13aWRnZXQnIH0pO1xuXG4gICAgICAgICAgICAgICAgLy8gY3JlYXRlIEEgZWxlbWVudHMgdGhhdCB3aWxsIHJlcGxhY2UgT1BUSU9Oc1xuICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0uZmluZCgnb3B0aW9uJykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbCwgdGV4dCwgaHRtbCwgJGE7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFsID0gJCh0aGlzKS52YWwoKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBjcmVhdGUgcmF0aW5ncyAtIGJ1dCBvbmx5IGlmIHZhbCBpcyBub3QgZGVmaW5lZCBhcyBlbXB0eVxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsICE9PSBnZXREYXRhKCdlbXB0eVJhdGluZ1ZhbHVlJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQgPSAkKHRoaXMpLnRleHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGh0bWwgPSAkKHRoaXMpLmRhdGEoJ2h0bWwnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChodG1sKSB7IHRleHQgPSBodG1sOyB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICRhID0gJCgnPGEgLz4nLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2hyZWYnOiAnIycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2RhdGEtcmF0aW5nLXZhbHVlJzogdmFsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdkYXRhLXJhdGluZy10ZXh0JzogdGV4dCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnaHRtbCc6IChzZWxmLm9wdGlvbnMuc2hvd1ZhbHVlcykgPyB0ZXh0IDogJydcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAkdy5hcHBlbmQoJGEpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIC8vIGFwcGVuZCAuYnItY3VycmVudC1yYXRpbmcgZGl2IHRvIHRoZSB3aWRnZXRcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5vcHRpb25zLnNob3dTZWxlY3RlZFJhdGluZykge1xuICAgICAgICAgICAgICAgICAgICAkdy5hcHBlbmQoJCgnPGRpdiAvPicsIHsgJ3RleHQnOiAnJywgJ2NsYXNzJzogJ2JyLWN1cnJlbnQtcmF0aW5nJyB9KSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gYWRkaXRpb25hbCBjbGFzc2VzIGZvciB0aGUgd2lkZ2V0XG4gICAgICAgICAgICAgICAgaWYgKHNlbGYub3B0aW9ucy5yZXZlcnNlKSB7XG4gICAgICAgICAgICAgICAgICAgICR3LmFkZENsYXNzKCdici1yZXZlcnNlJyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYub3B0aW9ucy5yZWFkb25seSkge1xuICAgICAgICAgICAgICAgICAgICAkdy5hZGRDbGFzcygnYnItcmVhZG9ubHknKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gJHc7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyByZXR1cm4gYSBqUXVlcnkgZnVuY3Rpb24gbmFtZSBkZXBlbmRpbmcgb24gdGhlICdyZXZlcnNlJyBzZXR0aW5nXG4gICAgICAgICAgICB2YXIgbmV4dEFsbG9yUHJldmlvdXNBbGwgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpZiAoZ2V0RGF0YSgndXNlck9wdGlvbnMnKS5yZXZlcnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnbmV4dEFsbCc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdwcmV2QWxsJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBzZXQgdGhlIHZhbHVlIG9mIHRoZSBzZWxlY3QgZmllbGRcbiAgICAgICAgICAgIHZhciBzZXRTZWxlY3RGaWVsZFZhbHVlID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICAvLyBjaGFuZ2Ugc2VsZWN0ZWQgb3B0aW9uXG4gICAgICAgICAgICAgICAgZmluZE9wdGlvbih2YWx1ZSkucHJvcCgnc2VsZWN0ZWQnLCB0cnVlKTtcblxuICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0uY2hhbmdlKCk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyByZXNldCBzZWxlY3QgZmllbGRcbiAgICAgICAgICAgIHZhciByZXNldFNlbGVjdEZpZWxkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJCgnb3B0aW9uJywgc2VsZi4kZWxlbSkucHJvcCgnc2VsZWN0ZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGVmYXVsdFNlbGVjdGVkO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgc2VsZi4kZWxlbS5jaGFuZ2UoKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIGRpc3BsYXkgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCByYXRpbmdcbiAgICAgICAgICAgIHZhciBzaG93U2VsZWN0ZWRSYXRpbmcgPSBmdW5jdGlvbih0ZXh0KSB7XG4gICAgICAgICAgICAgICAgLy8gdGV4dCB1bmRlZmluZWQ/XG4gICAgICAgICAgICAgICAgdGV4dCA9IHRleHQgPyB0ZXh0IDogcmF0aW5nVGV4dCgpO1xuXG4gICAgICAgICAgICAgICAgLy8gc3BlY2lhbCBjYXNlIHdoZW4gdGhlIHNlbGVjdGVkIHJhdGluZyBpcyBkZWZpbmVkIGFzIGVtcHR5XG4gICAgICAgICAgICAgICAgaWYgKHRleHQgPT0gZ2V0RGF0YSgnZW1wdHlSYXRpbmdUZXh0JykpIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dCA9ICcnO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIHVwZGF0ZSAuYnItY3VycmVudC1yYXRpbmcgZGl2XG4gICAgICAgICAgICAgICAgaWYgKHNlbGYub3B0aW9ucy5zaG93U2VsZWN0ZWRSYXRpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi4kZWxlbS5wYXJlbnQoKS5maW5kKCcuYnItY3VycmVudC1yYXRpbmcnKS50ZXh0KHRleHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIHJldHVybiByb3VuZGVkIGZyYWN0aW9uIG9mIGEgdmFsdWUgKDE0LjQgLT4gNDAsIDAuOTkgLT4gOTApXG4gICAgICAgICAgICB2YXIgZnJhY3Rpb24gPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLnJvdW5kKCgoTWF0aC5mbG9vcih2YWx1ZSAqIDEwKSAvIDEwKSAlIDEpICogMTAwKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIHJlbW92ZSBhbGwgY2xhc3NlcyBmcm9tIGVsZW1lbnRzXG4gICAgICAgICAgICB2YXIgcmVzZXRTdHlsZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBhbGwgY2xhc3NlcyBzdGFydGluZyB3aXRoIGJyLSpcbiAgICAgICAgICAgICAgICBzZWxmLiR3aWRnZXQuZmluZCgnYScpLnJlbW92ZUNsYXNzKGZ1bmN0aW9uKGluZGV4LCBjbGFzc2VzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoY2xhc3Nlcy5tYXRjaCgvKF58XFxzKWJyLVxcUysvZykgfHwgW10pLmpvaW4oJyAnKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIGFwcGx5IHN0eWxlIGJ5IHNldHRpbmcgY2xhc3NlcyBvbiBlbGVtZW50c1xuICAgICAgICAgICAgdmFyIGFwcGx5U3R5bGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgJGEgPSBzZWxmLiR3aWRnZXQuZmluZCgnYVtkYXRhLXJhdGluZy12YWx1ZT1cIicgKyByYXRpbmdWYWx1ZSgpICsgJ1wiXScpO1xuICAgICAgICAgICAgICAgIHZhciBpbml0aWFsUmF0aW5nID0gZ2V0RGF0YSgndXNlck9wdGlvbnMnKS5pbml0aWFsUmF0aW5nO1xuICAgICAgICAgICAgICAgIHZhciBiYXNlVmFsdWUgPSAkLmlzTnVtZXJpYyhyYXRpbmdWYWx1ZSgpKSA/IHJhdGluZ1ZhbHVlKCkgOiAwO1xuICAgICAgICAgICAgICAgIHZhciBmID0gZnJhY3Rpb24oaW5pdGlhbFJhdGluZyk7XG4gICAgICAgICAgICAgICAgdmFyICRhbGwsICRmcmFjdGlvbmFsO1xuXG4gICAgICAgICAgICAgICAgcmVzZXRTdHlsZSgpO1xuXG4gICAgICAgICAgICAgICAgLy8gYWRkIGNsYXNzZXNcbiAgICAgICAgICAgICAgICAkYS5hZGRDbGFzcygnYnItc2VsZWN0ZWQgYnItY3VycmVudCcpW25leHRBbGxvclByZXZpb3VzQWxsKCldKClcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdici1zZWxlY3RlZCcpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFnZXREYXRhKCdyYXRpbmdNYWRlJykgJiYgJC5pc051bWVyaWMoaW5pdGlhbFJhdGluZykpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKChpbml0aWFsUmF0aW5nIDw9IGJhc2VWYWx1ZSkgfHwgIWYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICRhbGwgPSBzZWxmLiR3aWRnZXQuZmluZCgnYScpO1xuXG4gICAgICAgICAgICAgICAgICAgICRmcmFjdGlvbmFsID0gKCRhLmxlbmd0aCkgP1xuICAgICAgICAgICAgICAgICAgICAgICAgJGFbKGdldERhdGEoJ3VzZXJPcHRpb25zJykucmV2ZXJzZSkgPyAncHJldicgOiAnbmV4dCddKCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgJGFsbFsoZ2V0RGF0YSgndXNlck9wdGlvbnMnKS5yZXZlcnNlKSA/ICdsYXN0JyA6ICdmaXJzdCddKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgJGZyYWN0aW9uYWwuYWRkQ2xhc3MoJ2JyLWZyYWN0aW9uYWwnKTtcbiAgICAgICAgICAgICAgICAgICAgJGZyYWN0aW9uYWwuYWRkQ2xhc3MoJ2JyLWZyYWN0aW9uYWwtJyArIGYpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIHRoZSBlbGVtZW50IGlzIGRlc2VsZWN0YWJsZT9cbiAgICAgICAgICAgIHZhciBpc0Rlc2VsZWN0YWJsZSA9IGZ1bmN0aW9uKCRlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgaWYgKCFnZXREYXRhKCdhbGxvd0VtcHR5JykgfHwgIWdldERhdGEoJ3VzZXJPcHRpb25zJykuZGVzZWxlY3RhYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKHJhdGluZ1ZhbHVlKCkgPT0gJGVsZW1lbnQuYXR0cignZGF0YS1yYXRpbmctdmFsdWUnKSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBoYW5kbGUgY2xpY2sgZXZlbnRzXG4gICAgICAgICAgICB2YXIgYXR0YWNoQ2xpY2tIYW5kbGVyID0gZnVuY3Rpb24oJGVsZW1lbnRzKSB7XG4gICAgICAgICAgICAgICAgJGVsZW1lbnRzLm9uKCdjbGljay5iYXJyYXRpbmcnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgJGEgPSAkKHRoaXMpLFxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucyA9IGdldERhdGEoJ3VzZXJPcHRpb25zJyksXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ7XG5cbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9ICRhLmF0dHIoJ2RhdGEtcmF0aW5nLXZhbHVlJyk7XG4gICAgICAgICAgICAgICAgICAgIHRleHQgPSAkYS5hdHRyKCdkYXRhLXJhdGluZy10ZXh0Jyk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gaXMgY3VycmVudCBhbmQgZGVzZWxlY3RhYmxlP1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNEZXNlbGVjdGFibGUoJGEpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGdldERhdGEoJ2VtcHR5UmF0aW5nVmFsdWUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQgPSBnZXREYXRhKCdlbXB0eVJhdGluZ1RleHQnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlbWVtYmVyIHNlbGVjdGVkIHJhdGluZ1xuICAgICAgICAgICAgICAgICAgICBzZXREYXRhKCdyYXRpbmdWYWx1ZScsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgc2V0RGF0YSgncmF0aW5nVGV4dCcsIHRleHQpO1xuICAgICAgICAgICAgICAgICAgICBzZXREYXRhKCdyYXRpbmdNYWRlJywgdHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgc2V0U2VsZWN0RmllbGRWYWx1ZSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHNob3dTZWxlY3RlZFJhdGluZyh0ZXh0KTtcblxuICAgICAgICAgICAgICAgICAgICBhcHBseVN0eWxlKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gb25TZWxlY3QgY2FsbGJhY2tcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5vblNlbGVjdC5jYWxsKFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZixcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhdGluZ1ZhbHVlKCksXG4gICAgICAgICAgICAgICAgICAgICAgICByYXRpbmdUZXh0KCksXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudFxuICAgICAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIGhhbmRsZSBtb3VzZWVudGVyIGV2ZW50c1xuICAgICAgICAgICAgdmFyIGF0dGFjaE1vdXNlRW50ZXJIYW5kbGVyID0gZnVuY3Rpb24oJGVsZW1lbnRzKSB7XG4gICAgICAgICAgICAgICAgJGVsZW1lbnRzLm9uKCdtb3VzZWVudGVyLmJhcnJhdGluZycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgJGEgPSAkKHRoaXMpO1xuXG4gICAgICAgICAgICAgICAgICAgIHJlc2V0U3R5bGUoKTtcblxuICAgICAgICAgICAgICAgICAgICAkYS5hZGRDbGFzcygnYnItYWN0aXZlJylbbmV4dEFsbG9yUHJldmlvdXNBbGwoKV0oKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdici1hY3RpdmUnKTtcblxuICAgICAgICAgICAgICAgICAgICBzaG93U2VsZWN0ZWRSYXRpbmcoJGEuYXR0cignZGF0YS1yYXRpbmctdGV4dCcpKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIGhhbmRsZSBtb3VzZWxlYXZlIGV2ZW50c1xuICAgICAgICAgICAgdmFyIGF0dGFjaE1vdXNlTGVhdmVIYW5kbGVyID0gZnVuY3Rpb24oJGVsZW1lbnRzKSB7XG4gICAgICAgICAgICAgICAgc2VsZi4kd2lkZ2V0Lm9uKCdtb3VzZWxlYXZlLmJhcnJhdGluZyBibHVyLmJhcnJhdGluZycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBzaG93U2VsZWN0ZWRSYXRpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgYXBwbHlTdHlsZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gc29tZXdoYXQgcHJpbWl0aXZlIHdheSB0byByZW1vdmUgMzAwbXMgY2xpY2sgZGVsYXkgb24gdG91Y2ggZGV2aWNlc1xuICAgICAgICAgICAgLy8gZm9yIGEgbW9yZSBhZHZhbmNlZCBzb2x1dGlvbiBjb25zaWRlciBzZXR0aW5nIGBmYXN0Q2xpY2tzYCBvcHRpb24gdG8gZmFsc2VcbiAgICAgICAgICAgIC8vIGFuZCB1c2luZyBhIGxpYnJhcnkgc3VjaCBhcyBmYXN0Y2xpY2sgKGh0dHBzOi8vZ2l0aHViLmNvbS9mdGxhYnMvZmFzdGNsaWNrKVxuICAgICAgICAgICAgdmFyIGZhc3RDbGlja3MgPSBmdW5jdGlvbigkZWxlbWVudHMpIHtcbiAgICAgICAgICAgICAgICAkZWxlbWVudHMub24oJ3RvdWNoc3RhcnQuYmFycmF0aW5nJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5jbGljaygpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gZGlzYWJsZSBjbGlja3NcbiAgICAgICAgICAgIHZhciBkaXNhYmxlQ2xpY2tzID0gZnVuY3Rpb24oJGVsZW1lbnRzKSB7XG4gICAgICAgICAgICAgICAgJGVsZW1lbnRzLm9uKCdjbGljay5iYXJyYXRpbmcnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdmFyIGF0dGFjaEhhbmRsZXJzID0gZnVuY3Rpb24oJGVsZW1lbnRzKSB7XG4gICAgICAgICAgICAgICAgLy8gYXR0YWNoIGNsaWNrIGV2ZW50IGhhbmRsZXJcbiAgICAgICAgICAgICAgICBhdHRhY2hDbGlja0hhbmRsZXIoJGVsZW1lbnRzKTtcblxuICAgICAgICAgICAgICAgIGlmIChzZWxmLm9wdGlvbnMuaG92ZXJTdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBhdHRhY2ggbW91c2VlbnRlciBldmVudCBoYW5kbGVyXG4gICAgICAgICAgICAgICAgICAgIGF0dGFjaE1vdXNlRW50ZXJIYW5kbGVyKCRlbGVtZW50cyk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gYXR0YWNoIG1vdXNlbGVhdmUgZXZlbnQgaGFuZGxlclxuICAgICAgICAgICAgICAgICAgICBhdHRhY2hNb3VzZUxlYXZlSGFuZGxlcigkZWxlbWVudHMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHZhciBkZXRhY2hIYW5kbGVycyA9IGZ1bmN0aW9uKCRlbGVtZW50cykge1xuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBldmVudCBoYW5kbGVycyBpbiB0aGUgXCIuYmFycmF0aW5nXCIgbmFtZXNwYWNlXG4gICAgICAgICAgICAgICAgJGVsZW1lbnRzLm9mZignLmJhcnJhdGluZycpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdmFyIHNldHVwSGFuZGxlcnMgPSBmdW5jdGlvbihyZWFkb25seSkge1xuICAgICAgICAgICAgICAgIHZhciAkZWxlbWVudHMgPSBzZWxmLiR3aWRnZXQuZmluZCgnYScpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGZhc3RDbGlja3MpIHtcbiAgICAgICAgICAgICAgICAgICAgZmFzdENsaWNrcygkZWxlbWVudHMpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChyZWFkb25seSkge1xuICAgICAgICAgICAgICAgICAgICBkZXRhY2hIYW5kbGVycygkZWxlbWVudHMpO1xuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlQ2xpY2tzKCRlbGVtZW50cyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYXR0YWNoSGFuZGxlcnMoJGVsZW1lbnRzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLnNob3cgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAvLyBydW4gb25seSBvbmNlXG4gICAgICAgICAgICAgICAgaWYgKGdldERhdGEoKSkgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgLy8gd3JhcCBlbGVtZW50XG4gICAgICAgICAgICAgICAgd3JhcEVsZW1lbnQoKTtcblxuICAgICAgICAgICAgICAgIC8vIHNhdmUgZGF0YVxuICAgICAgICAgICAgICAgIHNhdmVEYXRhT25FbGVtZW50KCk7XG5cbiAgICAgICAgICAgICAgICAvLyBidWlsZCAmIGFwcGVuZCB3aWRnZXQgdG8gdGhlIERPTVxuICAgICAgICAgICAgICAgIHNlbGYuJHdpZGdldCA9IGJ1aWxkV2lkZ2V0KCk7XG4gICAgICAgICAgICAgICAgc2VsZi4kd2lkZ2V0Lmluc2VydEFmdGVyKHNlbGYuJGVsZW0pO1xuXG4gICAgICAgICAgICAgICAgYXBwbHlTdHlsZSgpO1xuXG4gICAgICAgICAgICAgICAgc2hvd1NlbGVjdGVkUmF0aW5nKCk7XG5cbiAgICAgICAgICAgICAgICBzZXR1cEhhbmRsZXJzKHNlbGYub3B0aW9ucy5yZWFkb25seSk7XG5cbiAgICAgICAgICAgICAgICAvLyBoaWRlIHRoZSBzZWxlY3QgZmllbGRcbiAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLmhpZGUoKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMucmVhZG9ubHkgPSBmdW5jdGlvbihzdGF0ZSkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygc3RhdGUgIT09ICdib29sZWFuJyB8fCBnZXREYXRhKCdyZWFkT25seScpID09IHN0YXRlKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICBzZXR1cEhhbmRsZXJzKHN0YXRlKTtcbiAgICAgICAgICAgICAgICBzZXREYXRhKCdyZWFkT25seScsIHN0YXRlKTtcbiAgICAgICAgICAgICAgICBzZWxmLiR3aWRnZXQudG9nZ2xlQ2xhc3MoJ2JyLXJlYWRvbmx5Jyk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLnNldCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSBnZXREYXRhKCd1c2VyT3B0aW9ucycpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuJGVsZW0uZmluZCgnb3B0aW9uW3ZhbHVlPVwiJyArIHZhbHVlICsgJ1wiXScpLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgLy8gc2V0IGRhdGFcbiAgICAgICAgICAgICAgICBzZXREYXRhKCdyYXRpbmdWYWx1ZScsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICBzZXREYXRhKCdyYXRpbmdUZXh0Jywgc2VsZi4kZWxlbS5maW5kKCdvcHRpb25bdmFsdWU9XCInICsgdmFsdWUgKyAnXCJdJykudGV4dCgpKTtcbiAgICAgICAgICAgICAgICBzZXREYXRhKCdyYXRpbmdNYWRlJywgdHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICBzZXRTZWxlY3RGaWVsZFZhbHVlKHJhdGluZ1ZhbHVlKCkpO1xuICAgICAgICAgICAgICAgIHNob3dTZWxlY3RlZFJhdGluZyhyYXRpbmdUZXh0KCkpO1xuXG4gICAgICAgICAgICAgICAgYXBwbHlTdHlsZSgpO1xuXG4gICAgICAgICAgICAgICAgLy8gb25TZWxlY3QgY2FsbGJhY2tcbiAgICAgICAgICAgICAgICBpZiAoIW9wdGlvbnMuc2lsZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMub25TZWxlY3QuY2FsbChcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMsXG4gICAgICAgICAgICAgICAgICAgICAgICByYXRpbmdWYWx1ZSgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmF0aW5nVGV4dCgpXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy5jbGVhciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBvcHRpb25zID0gZ2V0RGF0YSgndXNlck9wdGlvbnMnKTtcblxuICAgICAgICAgICAgICAgIC8vIHJlc3RvcmUgb3JpZ2luYWwgZGF0YVxuICAgICAgICAgICAgICAgIHNldERhdGEoJ3JhdGluZ1ZhbHVlJywgZ2V0RGF0YSgnb3JpZ2luYWxSYXRpbmdWYWx1ZScpKTtcbiAgICAgICAgICAgICAgICBzZXREYXRhKCdyYXRpbmdUZXh0JywgZ2V0RGF0YSgnb3JpZ2luYWxSYXRpbmdUZXh0JykpO1xuICAgICAgICAgICAgICAgIHNldERhdGEoJ3JhdGluZ01hZGUnLCBmYWxzZSk7XG5cbiAgICAgICAgICAgICAgICByZXNldFNlbGVjdEZpZWxkKCk7XG4gICAgICAgICAgICAgICAgc2hvd1NlbGVjdGVkUmF0aW5nKHJhdGluZ1RleHQoKSk7XG5cbiAgICAgICAgICAgICAgICBhcHBseVN0eWxlKCk7XG5cbiAgICAgICAgICAgICAgICAvLyBvbkNsZWFyIGNhbGxiYWNrXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5vbkNsZWFyLmNhbGwoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMsXG4gICAgICAgICAgICAgICAgICAgIHJhdGluZ1ZhbHVlKCksXG4gICAgICAgICAgICAgICAgICAgIHJhdGluZ1RleHQoKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3kgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSByYXRpbmdWYWx1ZSgpO1xuICAgICAgICAgICAgICAgIHZhciB0ZXh0ID0gcmF0aW5nVGV4dCgpO1xuICAgICAgICAgICAgICAgIHZhciBvcHRpb25zID0gZ2V0RGF0YSgndXNlck9wdGlvbnMnKTtcblxuICAgICAgICAgICAgICAgIC8vIGRldGFjaCBoYW5kbGVyc1xuICAgICAgICAgICAgICAgIGRldGFjaEhhbmRsZXJzKHNlbGYuJHdpZGdldC5maW5kKCdhJykpO1xuXG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIHdpZGdldFxuICAgICAgICAgICAgICAgIHNlbGYuJHdpZGdldC5yZW1vdmUoKTtcblxuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBkYXRhXG4gICAgICAgICAgICAgICAgcmVtb3ZlRGF0YU9uRWxlbWVudCgpO1xuXG4gICAgICAgICAgICAgICAgLy8gdW53cmFwIHRoZSBlbGVtZW50XG4gICAgICAgICAgICAgICAgdW53cmFwRWxlbWVudCgpO1xuXG4gICAgICAgICAgICAgICAgLy8gc2hvdyB0aGUgZWxlbWVudFxuICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0uc2hvdygpO1xuXG4gICAgICAgICAgICAgICAgLy8gb25EZXN0cm95IGNhbGxiYWNrXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5vbkRlc3Ryb3kuY2FsbChcbiAgICAgICAgICAgICAgICAgICAgdGhpcyxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIHRleHRcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIEJhclJhdGluZy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uIChvcHRpb25zLCBlbGVtKSB7XG4gICAgICAgICAgICB0aGlzLiRlbGVtID0gJChlbGVtKTtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCAkLmZuLmJhcnJhdGluZy5kZWZhdWx0cywgb3B0aW9ucyk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnM7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIEJhclJhdGluZztcbiAgICB9KSgpO1xuXG4gICAgJC5mbi5iYXJyYXRpbmcgPSBmdW5jdGlvbiAobWV0aG9kLCBvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHBsdWdpbiA9IG5ldyBCYXJSYXRpbmcoKTtcblxuICAgICAgICAgICAgLy8gcGx1Z2luIHdvcmtzIHdpdGggc2VsZWN0IGZpZWxkc1xuICAgICAgICAgICAgaWYgKCEkKHRoaXMpLmlzKCdzZWxlY3QnKSkge1xuICAgICAgICAgICAgICAgICQuZXJyb3IoJ1NvcnJ5LCB0aGlzIHBsdWdpbiBvbmx5IHdvcmtzIHdpdGggc2VsZWN0IGZpZWxkcy4nKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gbWV0aG9kIHN1cHBsaWVkXG4gICAgICAgICAgICBpZiAocGx1Z2luLmhhc093blByb3BlcnR5KG1ldGhvZCkpIHtcbiAgICAgICAgICAgICAgICBwbHVnaW4uaW5pdChvcHRpb25zLCB0aGlzKTtcbiAgICAgICAgICAgICAgICBpZiAobWV0aG9kID09PSAnc2hvdycpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBsdWdpbi5zaG93KG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHBsdWdpbiBleGlzdHM/XG4gICAgICAgICAgICAgICAgICAgIGlmIChwbHVnaW4uJGVsZW0uZGF0YSgnYmFycmF0aW5nJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsdWdpbi4kd2lkZ2V0ID0gJCh0aGlzKS5uZXh0KCcuYnItd2lkZ2V0Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGx1Z2luW21ldGhvZF0ob3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIG5vIG1ldGhvZCBzdXBwbGllZCBvciBvbmx5IG9wdGlvbnMgc3VwcGxpZWRcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG1ldGhvZCA9PT0gJ29iamVjdCcgfHwgIW1ldGhvZCkge1xuICAgICAgICAgICAgICAgIG9wdGlvbnMgPSBtZXRob2Q7XG4gICAgICAgICAgICAgICAgcGx1Z2luLmluaXQob3B0aW9ucywgdGhpcyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBsdWdpbi5zaG93KCk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJC5lcnJvcignTWV0aG9kICcgKyBtZXRob2QgKyAnIGRvZXMgbm90IGV4aXN0IG9uIGpRdWVyeS5iYXJyYXRpbmcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgICQuZm4uYmFycmF0aW5nLmRlZmF1bHRzID0ge1xuICAgICAgICB0aGVtZTonJyxcbiAgICAgICAgaW5pdGlhbFJhdGluZzpudWxsLCAvLyBpbml0aWFsIHJhdGluZ1xuICAgICAgICBhbGxvd0VtcHR5Om51bGwsIC8vIGFsbG93IGVtcHR5IHJhdGluZ3M/XG4gICAgICAgIGVtcHR5VmFsdWU6JycsIC8vIHRoaXMgaXMgdGhlIGV4cGVjdGVkIHZhbHVlIG9mIHRoZSBlbXB0eSByYXRpbmdcbiAgICAgICAgc2hvd1ZhbHVlczpmYWxzZSwgLy8gZGlzcGxheSByYXRpbmcgdmFsdWVzIG9uIHRoZSBiYXJzP1xuICAgICAgICBzaG93U2VsZWN0ZWRSYXRpbmc6dHJ1ZSwgLy8gYXBwZW5kIGEgZGl2IHdpdGggYSByYXRpbmcgdG8gdGhlIHdpZGdldD9cbiAgICAgICAgZGVzZWxlY3RhYmxlOnRydWUsIC8vIGFsbG93IHRvIGRlc2VsZWN0IHJhdGluZ3M/XG4gICAgICAgIHJldmVyc2U6ZmFsc2UsIC8vIHJldmVyc2UgdGhlIHJhdGluZz9cbiAgICAgICAgcmVhZG9ubHk6ZmFsc2UsIC8vIG1ha2UgdGhlIHJhdGluZyByZWFkeS1vbmx5P1xuICAgICAgICBmYXN0Q2xpY2tzOnRydWUsIC8vIHJlbW92ZSAzMDBtcyBjbGljayBkZWxheSBvbiB0b3VjaCBkZXZpY2VzP1xuICAgICAgICBob3ZlclN0YXRlOnRydWUsIC8vIGNoYW5nZSBzdGF0ZSBvbiBob3Zlcj9cbiAgICAgICAgc2lsZW50OmZhbHNlLCAvLyBzdXByZXNzIGNhbGxiYWNrcyB3aGVuIGNvbnRyb2xsaW5nIHJhdGluZ3MgcHJvZ3JhbWF0aWNhbGx5XG4gICAgICAgIG9uU2VsZWN0OmZ1bmN0aW9uICh2YWx1ZSwgdGV4dCwgZXZlbnQpIHtcbiAgICAgICAgfSwgLy8gY2FsbGJhY2sgZmlyZWQgd2hlbiBhIHJhdGluZyBpcyBzZWxlY3RlZFxuICAgICAgICBvbkNsZWFyOmZ1bmN0aW9uICh2YWx1ZSwgdGV4dCkge1xuICAgICAgICB9LCAvLyBjYWxsYmFjayBmaXJlZCB3aGVuIGEgcmF0aW5nIGlzIGNsZWFyZWRcbiAgICAgICAgb25EZXN0cm95OmZ1bmN0aW9uICh2YWx1ZSwgdGV4dCkge1xuICAgICAgICB9IC8vIGNhbGxiYWNrIGZpcmVkIHdoZW4gYSB3aWRnZXQgaXMgZGVzdHJveWVkXG4gICAgfTtcblxuICAgICQuZm4uYmFycmF0aW5nLkJhclJhdGluZyA9IEJhclJhdGluZztcblxufSkpO1xuIiwiLyoqXG4gKiBAcGFja2FnZSAgICBLbm93IFJlc2VydmF0aW9uc1xuICogQHN1YnBhY2thZ2UgU2l0ZSBKU1xuICogQGNvcHlyaWdodCAgMjAyMCBIaWdobGFuZCBWaXNpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBAbGljZW5zZSAgICBTZWUgdGhlIGZpbGUgXCJMSUNFTlNFLnR4dFwiIGZvciB0aGUgZnVsbCBsaWNlbnNlIGdvdmVybmluZyB0aGlzIGNvZGUuXG4gKiBAYXV0aG9yICAgICBIYXplbCBXaWxzb24gPGhhemVsQGhpZ2hsYW5kdmlzaW9uLmNvbT5cbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxubGV0IGxhbmc7XG5sZXQgc2VhcmNoZGF0YSA9IFtdO1xubGV0IHNlYXJjaERvbmUgPSBmYWxzZTtcbmxldCBjYWxlbmRhckxvYWRlZCA9IGZhbHNlO1xubGV0IHNhdmVkd2lkdGggPSBmYWxzZTtcbmxldCBsYXJnZTtcbmxldCByZXNpemVkID0gZmFsc2U7XG5cbmlmICghd2luZG93LmxvY2F0aW9uLm9yaWdpbilcblx0d2luZG93LmxvY2F0aW9uLm9yaWdpbiA9IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCArIFwiLy9cIiArIHdpbmRvdy5sb2NhdGlvbi5ob3N0O1xuY29uc3QgbGl2ZXNpdGUgPSB3aW5kb3cubG9jYXRpb24ub3JpZ2luICsgJy8nO1xuXG4oZnVuY3Rpb24gKCQpIHtcblx0JChmdW5jdGlvbiAoKSB7XG5cdFx0Rm91bmRhdGlvbi5hZGRUb0pxdWVyeSgpO1xuXHRcdCQoZG9jdW1lbnQpLmZvdW5kYXRpb24oKTtcblx0XHRsYW5nID0gJCgnI2tyLWxhbmcnKS5kYXRhKCdrcmxhbmcnKTtcblxuXHRcdGNoZWNrU2NyZWVuV2lkdGgoKTtcblx0XHQkKHdpbmRvdykub24oXCJyZXNpemVcIiwgZnVuY3Rpb24gKCkge1xuXHRcdFx0Y2hlY2tTY3JlZW5XaWR0aCgpXG5cdFx0fSk7XG5cblx0XHRjb25zdCBiYXJzID0gJCgnLmtyLXJhdGluZycpO1xuXHRcdGlmIChiYXJzLmxlbmd0aCkge1xuXHRcdFx0YmFycy5iYXJyYXRpbmcoJ3Nob3cnLCB7XG5cdFx0XHRcdHNob3dWYWx1ZXM6ICAgICAgICAgdHJ1ZSxcblx0XHRcdFx0c2hvd1NlbGVjdGVkUmF0aW5nOiBmYWxzZVxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0JChkb2N1bWVudCkub24oJ3N1Ym1pdCcsICcuYWpheGZvcm0nLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0Y29uc3QgJGZvcm0gPSAkKHRoaXMpO1xuXHRcdFx0JC5hamF4KHtcblx0XHRcdFx0dHlwZTogICAgICdQT1NUJyxcblx0XHRcdFx0dXJsOiAgICAgICRmb3JtLmF0dHIoJ2FjdGlvbicpICsgJyZsYW5nPScgKyBsYW5nLFxuXHRcdFx0XHRkYXRhOiAgICAgJGZvcm0uc2VyaWFsaXplKCksXG5cdFx0XHRcdGRhdGFUeXBlOiAnanNvbicsXG5cdFx0XHRcdHN1Y2Nlc3M6ICBmdW5jdGlvbiAocmVzdWx0KSB7XG5cdFx0XHRcdFx0aWYgKHJlc3VsdC5zdWNjZXNzKSB7XG5cdFx0XHRcdFx0XHRpZiAocmVzdWx0LmRhdGEpIHtcblx0XHRcdFx0XHRcdFx0Zm9ybVJlc3BvbnNlKCRmb3JtLmF0dHIoJ2lkJyksIHJlc3VsdC5kYXRhKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gbGl2ZXNpdGU7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdCQoJy5rci1hamF4LW1vZGFsLWVycm9yLW1lc3NhZ2UnKS5odG1sKHJlc3VsdC5tZXNzYWdlKTtcblx0XHRcdFx0XHRcdGNvbnN0ICRtb2RhbCA9IG5ldyBGb3VuZGF0aW9uLlJldmVhbCgkKCcjS3JBamF4TW9kYWxFcnJvcicpKTtcblx0XHRcdFx0XHRcdCRtb2RhbC5vcGVuKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRlcnJvcjogICAgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdCQoJy5rci1hamF4LW1vZGFsLWVycm9yLW1lc3NhZ2UnKS5odG1sKCdTb3JyeSBhbiBlcnJvciBoYXMgb2NjdXJyZWQsIHBsZWFzZSB0cnkgYWdhaW4nKTtcblx0XHRcdFx0XHRjb25zdCAkbW9kYWwgPSBuZXcgRm91bmRhdGlvbi5SZXZlYWwoJCgnI0tyQWpheE1vZGFsRXJyb3InKSk7XG5cdFx0XHRcdFx0JG1vZGFsLm9wZW4oKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSkub24oJ3Nob3cuemYuZHJvcGRvd24nLCAnI2tyLXNlYXJjaHJlZ2lvbi1kcm9wJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0JChcIiNrci1zZWFyY2hyZWdpb24tZHJvcFwiKS5jc3MoJ29wYWNpdHknLCAnMScpO1xuXHRcdH0pLm9uKCdzaG93LnpmLmRyb3Bkb3duJywgJyNrci1zZWFyY2hndWVzdC1kcm9wJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0JCgnI2tyLXNlYXJjaGd1ZXN0LWRyb3AnKS5jc3MoJ29wYWNpdHknLCAnMScpO1xuXHRcdH0pLm9uKCdoaWRlLnpmLmRyb3Bkb3duJywgJyNrci1zZWFyY2hyZWdpb24tZHJvcCwgI2tyLXNlYXJjaGd1ZXN0LWRyb3AnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHQkKCdib2R5JykuY3NzKCdvcGFjaXR5JywgJzEnKTtcblx0XHR9KS5vbignaGlkZS56Zi5kcm9wZG93bicsICcja3ItcXVvdGUtZm9ybScsIGZ1bmN0aW9uICgpIHtcblx0XHRcdCQoJyNndWVzdHMnKS50cmlnZ2VyKCdjaGFuZ2UnKTtcblx0XHR9KS5vbignb3Blbi56Zi5yZXZlYWwnLCAnLmtyLWFqYXgtbW9kYWxbZGF0YS1yZXZlYWxdJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGNvbnN0IG1vZGFsaWQgPSBcIiNcIiArICQodGhpcykuYXR0cignaWQnKTtcblx0XHRcdGlmICghJC50cmltKCQobW9kYWxpZCkuaHRtbCgpKS5sZW5ndGgpIHtcblx0XHRcdFx0Y29uc3QgYWpheHVybCA9ICQodGhpcykuZGF0YSgnYWpheHVybCcpO1xuXHRcdFx0XHRpZiAoYWpheHVybCkge1xuXHRcdFx0XHRcdCQuYWpheCh7XG5cdFx0XHRcdFx0XHR0eXBlOiAgICAnUE9TVCcsXG5cdFx0XHRcdFx0XHR1cmw6ICAgICBhamF4dXJsLFxuXHRcdFx0XHRcdFx0c3VjY2VzczogZnVuY3Rpb24gKGNvbnRlbnQpIHtcblx0XHRcdFx0XHRcdFx0JChtb2RhbGlkKS5odG1sKGNvbnRlbnQpLnRyaWdnZXIoJ3Jlc2l6ZW1lLnpmLnJldmVhbCcpO1xuXHRcdFx0XHRcdFx0XHQkKG1vZGFsaWQpLmZvdW5kYXRpb24oKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pLm9uKCdjbGljaycsICcuZmF2c3BhbicsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRjb25zdCAkdGhpcyA9ICQodGhpcyk7XG5cblx0XHRcdCQuYWpheCh7XG5cdFx0XHRcdHR5cGU6ICAgICAnUE9TVCcsXG5cdFx0XHRcdHVybDogICAgICBsaXZlc2l0ZSArICdpbmRleC5waHA/b3B0aW9uPWNvbV9rbm93cmVzJnRhc2s9cHJvcGVydGllcy5mYXZvdXJpdGUmbGFuZz0nICsgbGFuZyxcblx0XHRcdFx0ZGF0YTogICAgIHsncHJvcGVydHlfaWQnOiAkdGhpcy5kYXRhKCdwcm9wZXJ0eScpLCAndmlldyc6ICR0aGlzLmRhdGEoJ3ZpZXcnKX0sXG5cdFx0XHRcdGRhdGFUeXBlOiAnanNvbicsXG5cdFx0XHRcdHN1Y2Nlc3M6ICBmdW5jdGlvbiAocmVzdWx0KSB7XG5cdFx0XHRcdFx0aWYgKHJlc3VsdC5zdWNjZXNzKSB7XG5cdFx0XHRcdFx0XHRpZiAocmVzdWx0LmRhdGEuYWN0aW9uID09PSAnaGlkZW1lJykge1xuXHRcdFx0XHRcdFx0XHRjb25zdCBlbGVtZW50ID0gXCIjXCIgKyAkdGhpcy5maW5kKCcuaGFzLXRpcCcpLmRhdGEoJ3RvZ2dsZScpO1xuXHRcdFx0XHRcdFx0XHQkKGVsZW1lbnQpLnJlbW92ZSgpO1xuXHRcdFx0XHRcdFx0XHQkdGhpcy5wYXJlbnRzKCcua3ItcHJvcGVydGllcyAua3ItcHJvcGVydHkgLmZhdnM6Zmlyc3QnKS5oaWRlKCdzbG93Jyk7XG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKHJlc3VsdC5kYXRhLmFjdGlvbiAhPT0gJ25vbmUnKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnN0ICR0YXJnZXQgPSAkdGhpcy5maW5kKCdpLmZhLWhlYXJ0Jyk7XG5cdFx0XHRcdFx0XHRcdCR0YXJnZXQudG9nZ2xlQ2xhc3MoJ2luJyk7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IHZhbDEgPSAnIycgKyAkdGFyZ2V0LmRhdGEoJ3RvZ2dsZScpO1xuXHRcdFx0XHRcdFx0XHQkKHZhbDEpLnRleHQocmVzdWx0LmRhdGEuYWN0aW9uKS5oaWRlKCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9KS5vbignY2xpY2snLCAnLmdldFJlc3BvbnNlU2VhcmNoJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGdldFByb3BlcnRpZXMoJCh0aGlzKS5kYXRhKCdmaWVsZCcpLCAkKHRoaXMpLmRhdGEoJ3ZhbHVlJykpO1xuXHRcdH0pLm9uKCdjbGljaycsICcua3ItZmlsdGVycy1jbG9zZScsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHQkKCcua3ItZmlsdGVycy50b3AnKS5hZGRDbGFzcygnaGlkZW1lJyk7XG5cdFx0XHQkKHRoaXMpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblx0XHR9KS5vbignY2xpY2snLCAnLmtyLWZpbHRlcnMgdWwuZmlsdGVyLXNvcnQtbGlzdCBsaS5oZWFkJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdCQodGhpcykucGFyZW50KCkuY2hpbGRyZW4oJ2xpLmNoZWNrYm94JykudG9nZ2xlKCk7XG5cdFx0XHQkKHRoaXMpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKTtcblx0XHR9KS5vbignY2xpY2snLCAnI3Nob3dnYXRld2F5cycsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHQkKCcja3ItZ2F0ZXdheXMnKS50b2dnbGVDbGFzcygnaGlkZW1lJyk7XG5cdFx0fSkub24oJ2NsaWNrJywgJyNrci1zaG93LXNvcnRieScsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHQkKCcua3ItZmlsdGVycy50b3AnKS5hZGRDbGFzcygnaGlkZW1lJyk7XG5cdFx0XHQkKCcua3Itc29ydGJ5LnRvcCcpLnRvZ2dsZUNsYXNzKCdoaWRlbWUnKTtcblx0XHRcdHNldEFjdGl2ZU1lbnUoJ3NvcnQnKTtcblx0XHR9KS5vbignY2xpY2snLCAnI2tyLXNob3ctZmlsdGVyYnknLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0JCgnLmtyLXNvcnRieS50b3AnKS5hZGRDbGFzcygnaGlkZW1lJyk7XG5cdFx0XHQkKCcua3ItZmlsdGVycy50b3AnKS50b2dnbGVDbGFzcygnaGlkZW1lJyk7XG5cdFx0XHRzZXRBY3RpdmVNZW51KCdmaWx0ZXInKTtcblx0XHR9KS5vbignY2xpY2snLCAnLmtyLWZpbHRlcnMtY2xvc2UnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0JCgnLmtyLWZpbHRlcnMudG9wJykuYWRkQ2xhc3MoJ2hpZGVtZScpO1xuXHRcdFx0c2V0QWN0aXZlTWVudSgnbGlzdCcpO1xuXHRcdH0pLm9uKCdjbGljaycsICcudG9nZ2xlb3RoZXInLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0JCh0aGlzKS5kYXRhKCdvdGhlcicpLnRvZ2dsZSgpO1xuXHRcdH0pLm9uKCdjbGljaycsICcja3ItcHJvcGVydHktdGFicyBhW2hyZWY9XCIjY2FsZW5kYXJcIl0nLCBmdW5jdGlvbihlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRpZiAoIWNhbGVuZGFyTG9hZGVkKSB7XG5cdFx0XHRcdGNvbnN0IHBpZCA9ICQodGhpcykuZGF0YSgncGlkJyk7XG5cdFx0XHRcdGxvYWRDYWxlbmRhcihwaWQpO1xuXHRcdFx0XHRjYWxlbmRhckxvYWRlZCA9IHRydWU7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRpZiAoJCgnLmtyLXByb3BlcnRpZXMnKS5sZW5ndGggJiYgIXNlYXJjaERvbmUpIHtcblx0XHRcdGdldFByb3BlcnRpZXMoJ3ZpZXcnLCAkKHRoaXMpLmRhdGEoJ3ZpZXcnKSk7XG5cdFx0fVxuXG5cdFx0bGV0ICR0YWJzID0gJCgnLnRhYnMnKTtcblx0XHRpZiAoJCgnI2tyLXByb3BlcnR5LXRhYnMnKS5sZW5ndGggJiYgIWNhbGVuZGFyTG9hZGVkKSB7XG5cdFx0XHQkdGFicy5maW5kKCdhJykuZWFjaChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdGlmICgkKHRoaXMpLmF0dHIoJ2hyZWYnKSA9PT0gXCIjY2FsZW5kYXJcIikge1xuXHRcdFx0XHRcdGNvbnN0IHBpZCA9ICQodGhpcykuZGF0YSgncGlkJyk7XG5cdFx0XHRcdFx0bG9hZENhbGVuZGFyKHBpZCk7XG5cdFx0XHRcdFx0Y2FsZW5kYXJMb2FkZWQgPSB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cdH0pO1xuXG5cdCQuZXZlbnQuc3BlY2lhbC50b3VjaHN0YXJ0ID0ge1xuXHRcdHNldHVwOiBmdW5jdGlvbiAoXywgbnMsIGhhbmRsZSkge1xuXHRcdFx0aWYgKG5zLmluY2x1ZGVzKFwibm9QcmV2ZW50RGVmYXVsdFwiKSkge1xuXHRcdFx0XHR0aGlzLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIGhhbmRsZSwge3Bhc3NpdmU6IGZhbHNlfSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIGhhbmRsZSwge3Bhc3NpdmU6IHRydWV9KTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG5cdCQuZXZlbnQuc3BlY2lhbC50b3VjaG1vdmUgPSB7XG5cdFx0c2V0dXA6IGZ1bmN0aW9uIChfLCBucywgaGFuZGxlKSB7XG5cdFx0XHRpZiAobnMuaW5jbHVkZXMoXCJub1ByZXZlbnREZWZhdWx0XCIpKSB7XG5cdFx0XHRcdHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLCBoYW5kbGUsIHtwYXNzaXZlOiBmYWxzZX0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5hZGRFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsIGhhbmRsZSwge3Bhc3NpdmU6IHRydWV9KTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG5cblx0ZnVuY3Rpb24gbG9hZENhbGVuZGFyKHBpZCkge1xuXHRcdCQuYWpheCh7XG5cdFx0XHR0eXBlOiAgICAgJ1BPU1QnLFxuXHRcdFx0dXJsOiAgICAgIGxpdmVzaXRlICsgJ2luZGV4LnBocD9vcHRpb249Y29tX2tub3dyZXMmdGFzaz1wcm9wZXJ0eS5nZXJpYXRyaWMmbGFuZz0nICsgbGFuZyxcblx0XHRcdGRhdGFUeXBlOiAnaHRtbCcsXG5cdFx0XHRkYXRhOiAgICAge1xuXHRcdFx0XHQncGlkJzogcGlkXG5cdFx0XHR9LFxuXHRcdFx0c3VjY2VzczogIGZ1bmN0aW9uIChkYXRhKSB7XG5cdFx0XHRcdCQoJyNjYWxlbmRhci50YWJzLXBhbmVsJykuYXBwZW5kKGRhdGEpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0ZnVuY3Rpb24gZm9ybVJlc3BvbnNlKGlkLCBkYXRhKSB7XG5cdFx0aWYgKGRhdGEuaGFzT3duUHJvcGVydHkoJ3JlZGlyZWN0JykpIHtcblx0XHRcdHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKGRhdGEucmVkaXJlY3QpO1xuXHRcdH0gZWxzZSBpZiAoaWQgPT09ICdrci1mb3JtLXBheW1lbnQnKSB7XG5cdFx0XHRpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eSgnaHRtbCcpKSB7XG5cdFx0XHRcdGxldCAkbW9kYWwgPSAkKCcja3ItZ2F0ZXdheS1tb2RhbCcpO1xuXHRcdFx0XHQkbW9kYWwuaHRtbChkYXRhLmh0bWwpLnRyaWdnZXIoJ3Jlc2l6ZW1lLnpmLnJldmVhbCcpO1xuXHRcdFx0XHQkbW9kYWwuZm91bmRhdGlvbignb3BlbicpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0d2luZG93LmxvY2F0aW9uLmhyZWYgPSBsaXZlc2l0ZTtcblx0XHRcdH1cblx0XHR9IGVsc2UgaWYgKGlkID09PSAna3ItZm9ybS1tYWlsY2hpbXAnKSB7XG5cdFx0XHQkKCcjcmVzcG9uc2UyJykuaHRtbChkYXRhKTtcblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiBnZXRQcm9wZXJ0aWVzKGZpZWxkLCB2YWx1ZSkge1xuXHRcdCQuYWpheCh7XG5cdFx0XHR1cmw6ICAgICAgbGl2ZXNpdGUgKyAnaW5kZXgucGhwP29wdGlvbj1jb21fa25vd3JlcyZ2aWV3PXByb3BlcnRpZXMmZm9ybWF0PXJhdyZsYW5nPScgKyBsYW5nLFxuXHRcdFx0dHlwZTogICAgICdQT1NUJyxcblx0XHRcdGRhdGE6ICAgICB7J2ZpZWxkJzogZmllbGQsICd2YWx1ZSc6IHZhbHVlfSxcblx0XHRcdGRhdGFUeXBlOiAnanNvbicsXG5cdFx0XHRzdWNjZXNzOiAgZnVuY3Rpb24gKGRhdGEpIHtcblx0XHRcdFx0c2VhcmNoZGF0YSA9IGRhdGE7XG5cdFx0XHRcdGlmICghc2VhcmNoZGF0YSkge1xuXHRcdFx0XHRcdHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBub2luc3BlY3Rpb24gT3Zlcmx5Q29tcGxleEJvb2xlYW5FeHByZXNzaW9uSlNcblx0XHRcdFx0aWYgKGZpZWxkID09PSAnb3JkZXInIHx8IGZpZWxkID09PSAndmlldycgfHwgZmllbGQgPT09ICdmYXZzJyB8fCBmaWVsZCA9PT0gJ21hcCcpIHtcblx0XHRcdFx0XHRzZXRBY3RpdmVNZW51KHNlYXJjaGRhdGFbJ3ZpZXcnXSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRzZXRTZWFyY2hEYXRhKHNlYXJjaGRhdGEsIGZpZWxkKTtcblx0XHRcdFx0JCgnLmhhcy10aXAnKS5mb3VuZGF0aW9uKCk7XG5cdFx0XHRcdCQoJy5kcm9wZG93bi1wYW5lJykuZm91bmRhdGlvbigpO1xuXHRcdFx0XHQkKCcua3ItcHJvcGVydHkgLmNhcmQnKS5mb3VuZGF0aW9uKCk7XG5cdFx0XHRcdCQoJyNrci1vcmRlci1jbG9zZScpLnRyaWdnZXIoJ2NsaWNrJyk7XG5cdFx0XHRcdHNlYXJjaERvbmUgPSB0cnVlO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0ZnVuY3Rpb24gc2V0U2VhcmNoRGF0YShyZXNwb25zZSwgZmllbGQgPSAnJykge1xuXHRcdGlmIChyZXNwb25zZSkge1xuXHRcdFx0JCgnI2tyLXByb3BlcnRpZXMtZGF0YScpLmVtcHR5KCkuZmFkZUluKCdzbG93JykuaHRtbChyZXNwb25zZVsnaXRlbXMnXSkuZm91bmRhdGlvbigpO1xuXHRcdFx0JCgnLmtyLXBhZ2VyJykuaHRtbChyZXNwb25zZVsncGFnaW5hdGlvbiddKTtcblx0XHRcdCQoXCIja3ItcHJvcGVydGllcy1maWx0ZXJzLW9mZi1jYW52YXNcIikuaHRtbChyZXNwb25zZVsnZmlsdGVycyddKTtcblx0XHRcdCQoXCIja3ItcHJvcGVydGllcy1zb3J0Ynktb2ZmLWNhbnZhc1wiKS5odG1sKHJlc3BvbnNlWydzb3J0YnknXSk7XG5cdFx0XHQkKFwiI2tyLXByb3BlcnRpZXMtc2VhcmNoLW9mZi1jYW52YXNcIikuaHRtbChyZXNwb25zZVsnc2VhcmNoJ10pO1xuXG5cdFx0XHRpZiAocmVzcG9uc2VbJ3NlYXJjaCddLmxlbmd0aCAmJiAkKCcjYXJyaXZhbGRzcCcpLmxlbmd0aCkge1xuXHRcdFx0XHQkKCdib2R5JykudHJpZ2dlcignaW5pdGFqYXhzZWFyY2gnKTtcblx0XHRcdH1cblxuXHRcdFx0JCgnLnNpZGViYXIgLmtyLWZpbHRlcnMgdWwuZmlsdGVyLXNvcnQtbGlzdCBsaS5oZWFkJykuZWFjaChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdGlmICgkKHRoaXMpLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xuXHRcdFx0XHRcdCQodGhpcykucGFyZW50KCkuY2hpbGRyZW4oJ2xpLmNoZWNrYm94Jykuc2hvdygpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdCQodGhpcykucGFyZW50KCkuY2hpbGRyZW4oJ2xpLmNoZWNrYm94JykuaGlkZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0aWYgKGZpZWxkID09PSAncGFnZScpIHtcblx0XHRcdFx0d2luZG93LnNjcm9sbFRvKDAsIDApO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIHNldEFjdGl2ZU1lbnUoaXRlbSkge1xuXHRcdGNvbnN0IGJhciA9ICQoJy5rci1zZWFyY2hiYXInKS5maW5kKCdsaScpO1xuXHRcdCQuZWFjaChiYXIsIGZ1bmN0aW9uIChpbmRleCwgYmFyKSB7XG5cdFx0XHQkKGJhcikucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuXHRcdH0pO1xuXG5cdFx0Y29uc3QgZWxlbWVudCA9ICcua3Itc2VhcmNoYmFyIGxpLicgKyBpdGVtO1xuXHRcdCQoZWxlbWVudCkuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuXHR9XG5cblx0Ly8gUmV0dXJuIHRydWUgaWYgd2lkdGggaGFzIGNoYW5nZWRcblx0ZnVuY3Rpb24gc2NyZWVuV2lkdGhIYXNDaGFuZ2VkKCkge1xuXHRcdGxhcmdlID0gRm91bmRhdGlvbi5NZWRpYVF1ZXJ5LmF0TGVhc3QoJ2xhcmdlJyk7XG5cdFx0aWYgKGxhcmdlICE9PSBzYXZlZHdpZHRoKSB7XG5cdFx0XHRzYXZlZHdpZHRoID0gbGFyZ2U7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9IGVsc2Vcblx0XHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdGZ1bmN0aW9uIGNoZWNrU2NyZWVuV2lkdGgoKSB7XG5cdFx0cmVzaXplZCA9IGZhbHNlO1xuXHRcdGlmIChzY3JlZW5XaWR0aEhhc0NoYW5nZWQoKSAmJiBzZWFyY2hkYXRhWydpdGVtcyddICYmICFyZXNpemVkKSB7XG5cdFx0XHRzZXRTZWFyY2hEYXRhKHNlYXJjaGRhdGEpO1xuXHRcdFx0cmVzaXplZCA9IHRydWU7XG5cdFx0fVxuXHR9XG5cblx0JC5ldmVudC5zcGVjaWFsLnRvdWNoc3RhcnQgPSB7XG5cdFx0c2V0dXA6IGZ1bmN0aW9uIChfLCBucywgaGFuZGxlKSB7XG5cdFx0XHRpZiAobnMuaW5jbHVkZXMoXCJub1ByZXZlbnREZWZhdWx0XCIpKSB7XG5cdFx0XHRcdHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgaGFuZGxlLCB7cGFzc2l2ZTogZmFsc2V9KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgaGFuZGxlLCB7cGFzc2l2ZTogdHJ1ZX0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblx0JC5ldmVudC5zcGVjaWFsLnRvdWNobW92ZSA9IHtcblx0XHRzZXR1cDogZnVuY3Rpb24gKF8sIG5zLCBoYW5kbGUpIHtcblx0XHRcdGlmIChucy5pbmNsdWRlcyhcIm5vUHJldmVudERlZmF1bHRcIikpIHtcblx0XHRcdFx0dGhpcy5hZGRFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsIGhhbmRsZSwge3Bhc3NpdmU6IGZhbHNlfSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIiwgaGFuZGxlLCB7cGFzc2l2ZTogdHJ1ZX0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcbn0oalF1ZXJ5KSk7IiwiLyoqXG4gKiBAcGFja2FnZSAgICBLbm93IFJlc2VydmF0aW9uc1xuICogQHN1YnBhY2thZ2UgU2l0ZSBKU1xuICogQGNvcHlyaWdodCAgMjAyMCBIaWdobGFuZCBWaXNpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBAbGljZW5zZSAgICBTZWUgdGhlIGZpbGUgXCJMSUNFTlNFLnR4dFwiIGZvciB0aGUgZnVsbCBsaWNlbnNlIGdvdmVybmluZyB0aGlzIGNvZGUuXG4gKiBAYXV0aG9yICAgICBIYXplbCBXaWxzb24gPGhhemVsQGhpZ2hsYW5kdmlzaW9uLmNvbT5cbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgkKSB7XG5cdGlmICghd2luZG93LmxvY2F0aW9uLm9yaWdpbilcblx0XHR3aW5kb3cubG9jYXRpb24ub3JpZ2luID0gd2luZG93LmxvY2F0aW9uLnByb3RvY29sICsgXCIvL1wiICsgd2luZG93LmxvY2F0aW9uLmhvc3Q7XG5cblx0bGV0IGxhbmcgPSAkKFwiI2tyLWxhbmdcIikuZGF0YSgna3JsYW5nJyk7XG5cdGxldCBteUNvbmZpcm0sICRteVRhc2s7XG5cblx0Y2xhc3MgS3Jjb25maXJtIHtcblx0XHRjb25zdHJ1Y3RvcigkZm9ybSkge1xuXHRcdFx0dGhpcy5mb3JtID0gJGZvcm07XG5cdFx0XHR0aGlzLmluaXQoKTtcblx0XHR9XG5cblx0XHRpbml0KCkge1xuXHRcdFx0dGhpcy51cGRhdGVRdW90ZSh0aGlzLmZvcm0pO1xuXHRcdH1cblxuXHRcdHVwZGF0ZVF1b3RlKCRmb3JtKSB7XG5cdFx0XHQkbXlUYXNrID0gJCgnI215dGFzaycpO1xuXHRcdFx0JG15VGFzay52YWwoJ2NvbmZpcm0uY29tcHV0ZScpO1xuXHRcdFx0alF1ZXJ5LmFqYXgoe1xuXHRcdFx0XHR0eXBlOiAgICAgJ1BPU1QnLFxuXHRcdFx0XHR1cmw6ICAgICAgJ2luZGV4LnBocD9vcHRpb249Y29tX2tub3dyZXMmdGFzaz1jb25maXJtLmNvbXB1dGUmbGFuZz0nICsgbGFuZyxcblx0XHRcdFx0ZGF0YTogICAgICRmb3JtLnNlcmlhbGl6ZUFycmF5KCksXG5cdFx0XHRcdGRhdGFUeXBlOiAnanNvbicsXG5cdFx0XHRcdHN1Y2Nlc3M6ICBmdW5jdGlvbiAocmVzdWx0KSB7XG5cdFx0XHRcdFx0JG15VGFzay52YWwoJ2NvbmZpcm0ucGF5bWVudCcpO1xuXHRcdFx0XHRcdGlmIChyZXN1bHQuc3VjY2Vzcykge1xuXHRcdFx0XHRcdFx0Y29uc3QgZGF0YSA9IHJlc3VsdC5kYXRhO1xuXHRcdFx0XHRcdFx0aWYgKGRhdGEuaGFzT3duUHJvcGVydHkoJ3JlZGlyZWN0JykpIHtcblx0XHRcdFx0XHRcdFx0d2luZG93LmxvY2F0aW9uLnJlcGxhY2UoZGF0YS5yZWRpcmVjdCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRsZXQgZGl2O1xuXHRcdFx0XHRcdFx0JC5lYWNoKHJlc3VsdC5kYXRhLnJlc3BvbnNlLCBmdW5jdGlvbiAoa2V5LCB2YWwpIHtcblx0XHRcdFx0XHRcdFx0JCgnLmhpZGVpbml0aWFsJykuc2hvdygpO1xuXHRcdFx0XHRcdFx0XHRkaXYgPSBcIiNcIiArIGtleTtcblx0XHRcdFx0XHRcdFx0JChkaXYpLnRleHQodmFsKTtcblx0XHRcdFx0XHRcdFx0JChkaXYpLmh0bWwodmFsKTtcblx0XHRcdFx0XHRcdFx0JChkaXYpLnZhbCh2YWwpO1xuXHRcdFx0XHRcdFx0XHQkKGRpdikuc2hvdygpO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdCQoJy5rci1hamF4LW1vZGFsLWVycm9yLW1lc3NhZ2UnKS5odG1sKHJlc3VsdC5tZXNzYWdlKTtcblx0XHRcdFx0XHRcdGNvbnN0ICRtb2RhbCA9IG5ldyBGb3VuZGF0aW9uLlJldmVhbCgkKCcjS3JBamF4TW9kYWxFcnJvcicpKTtcblx0XHRcdFx0XHRcdCRtb2RhbC5vcGVuKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXHQkKGZ1bmN0aW9uICgpIHtcblx0XHRsZXQgJGVsZW1lbnQgPSAkKCcja3ItZm9ybS1jb25maXJtJyk7XG5cdFx0aWYgKCRlbGVtZW50Lmxlbmd0aCkge1xuXHRcdFx0bXlDb25maXJtID0gbmV3IEtyY29uZmlybSgkZWxlbWVudCk7XG5cdFx0fVxuXHRcdCRlbGVtZW50Lm9uKCdjaGFuZ2UgY2xpY2snLCAnLmtyLWNhbGN1bGF0ZScsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHQkZWxlbWVudCA9ICQoJyNrci1mb3JtLWNvbmZpcm0nKTtcblx0XHRcdG15Q29uZmlybS51cGRhdGVRdW90ZSgkZWxlbWVudCk7XG5cdFx0fSk7XG5cblx0XHQkKGRvY3VtZW50KS5vbignY2xpY2snLCAnI2NoZWNrdGVybXMnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0aWYgKGNoZWNrVGVybXMoKSkge1xuXHRcdFx0XHQkKCcjY2hlY2t0ZXJtcycpLnRyaWdnZXIoJ3N1Ym1pdCcpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9KTtcblxuXHQvLyBub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcblx0ZnVuY3Rpb24gY2hlY2tUZXJtcygpIHtcblx0XHRsZXQgcmVzdWx0ID0gdHJ1ZTtcblx0XHRjb25zdCB0ZXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FncmVlY2hlY2snKTtcblx0XHRjb25zdCB0ZXN0YyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZ3JlZWNoZWNrYycpO1xuXHRcdGNvbnN0IHRlc3R0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FncmVlY2hlY2t0Jyk7XG5cblx0XHQvLyBub2luc3BlY3Rpb24gSlNVbnJlc29sdmVkVmFyaWFibGVcblx0XHRpZiAodGVzdCAmJiAhZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2tyLWZvcm0tcGF5bWVudCcpLmFncmVlY2hlY2suY2hlY2tlZCkge1xuXHRcdFx0cmVzdWx0ID0gZmFsc2U7XG5cdFx0fVxuXHRcdC8vIG5vaW5zcGVjdGlvbiBKU1VucmVzb2x2ZWRWYXJpYWJsZVxuXHRcdGlmICh0ZXN0YyAmJiAhZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2tyLWZvcm0tcGF5bWVudCcpLmFncmVlY2hlY2tjLmNoZWNrZWQpIHtcblx0XHRcdHJlc3VsdCA9IGZhbHNlO1xuXHRcdH1cblx0XHQvLyBub2luc3BlY3Rpb24gSlNVbnJlc29sdmVkVmFyaWFibGVcblx0XHRpZiAodGVzdHQgJiYgIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdrci1mb3JtLXBheW1lbnQnKS5hZ3JlZWNoZWNrdC5jaGVja2VkKSB7XG5cdFx0XHRyZXN1bHQgPSBmYWxzZTtcblx0XHR9XG5cblx0XHRpZiAocmVzdWx0KSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc3QgJG1vZGFsID0gbmV3IEZvdW5kYXRpb24uUmV2ZWFsKCQoJyNlcnJvck1vZGFsJykpO1xuXHRcdFx0JG1vZGFsLm9wZW4oKTtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdH1cbn0oalF1ZXJ5KSk7IiwiLyoqXG4gKiBAcGFja2FnZSAgICBLbm93IFJlc2VydmF0aW9uc1xuICogQHN1YnBhY2thZ2UgU2l0ZSBKU1xuICogQGNvcHlyaWdodCAgMjAyMCBIaWdobGFuZCBWaXNpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBAbGljZW5zZSAgICBTZWUgdGhlIGZpbGUgXCJMSUNFTlNFLnR4dFwiIGZvciB0aGUgZnVsbCBsaWNlbnNlIGdvdmVybmluZyB0aGlzIGNvZGUuXG4gKiBAYXV0aG9yICAgICBIYXplbCBXaWxzb24gPGhhemVsQGhpZ2hsYW5kdmlzaW9uLmNvbT5cbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxuaWYgKCF3aW5kb3cubG9jYXRpb24ub3JpZ2luKSB7XG5cdHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gPSB3aW5kb3cubG9jYXRpb24ucHJvdG9jb2wgKyBcIi8vXCIgKyB3aW5kb3cubG9jYXRpb24uaG9zdDtcbn1cblxuKGZ1bmN0aW9uICgkKSB7XG5cdGxldCBteUtyRG9iRW50cnk7XG5cdGxldCB0b2RheTtcblx0bGV0IGtleSA9IHtCQUNLU1BBQ0U6IDh9O1xuXG5cdGxldCBzZXR0aW5ncyA9IHtcblx0XHRjdXN0b21fdmFsaWRhdGlvbjogICAgIGZhbHNlLFxuXHRcdGRheXNfaW5fbW9udGg6ICAgICAgICAgWzMxLCAyOSwgMzEsIDMwLCAzMSwgMzAsIDMxLCAzMSwgMzAsIDMxLCAzMCwgMzFdLFxuXHRcdGRvY3VtZW50X2RhdGU6ICAgICAgICAgZmFsc2UsXG5cdFx0ZXJyb3Jib3hfeDogICAgICAgICAgICAxLFxuXHRcdGVycm9yYm94X3k6ICAgICAgICAgICAgNSxcblx0XHRmaWVsZF9oaW50X3RleHRfZGF5OiAgICdERCcsXG5cdFx0ZmllbGRfaGludF90ZXh0X21vbnRoOiAnTU0nLFxuXHRcdGZpZWxkX2hpbnRfdGV4dF95ZWFyOiAgJ1lZWVknLFxuXHRcdGZpZWxkX29yZGVyOiAgICAgICAgICAgJ0RNWScsXG5cdFx0ZmllbGRfd2lkdGhfZGF5OiAgICAgICA2LFxuXHRcdGZpZWxkX3dpZHRoX21vbnRoOiAgICAgNixcblx0XHRmaWVsZF93aWR0aF95ZWFyOiAgICAgIDcsXG5cdFx0ZmllbGRfd2lkdGhfc2VwOiAgICAgICAyLFxuXHRcdG1pbm1heDogICAgICAgICAgICAgICAgJycsXG5cdFx0bWluX2RhdGU6ICAgICAgICAgICAgICBmYWxzZSxcblx0XHRtYXhfZGF0ZTogICAgICAgICAgICAgIGZhbHNlLFxuXHRcdG1pbl95ZWFyOiAgICAgICAgICAgICAgMTkxMCxcblx0XHRtb250aF9uYW1lOiAgICAgICAgICAgIFtcblx0XHRcdCdKYW51YXJ5JywgJ0ZlYnJ1YXJ5JywgJ01hcmNoJywgJ0FwcmlsJyxcblx0XHRcdCdNYXknLCAnSnVuZScsICdKdWx5JywgJ0F1Z3VzdCcsICdTZXB0ZW1iZXInLFxuXHRcdFx0J09jdG9iZXInLCAnTm92ZW1iZXInLCAnRGVjZW1iZXInXSxcblx0XHRvbl9ibHVyOiAgICAgICAgICAgICAgIGZhbHNlLFxuXHRcdG9uX2Vycm9yOiAgICAgICAgICAgICAgZmFsc2UsXG5cdFx0b25fY2hhbmdlOiAgICAgICAgICAgICBmYWxzZSxcblx0XHRwYXJzZV9kYXRlOiAgICAgICAgICAgIHRydWUsXG5cdFx0c2VwYXJhdG9yOiAgICAgICAgICAgICAnLycsXG5cdFx0c2hvd19lcnJvcnM6ICAgICAgICAgICB0cnVlLFxuXHRcdHNob3dfaGludHM6ICAgICAgICAgICAgdHJ1ZSxcblx0XHRFX0RBWV9OQU46ICAgICAgICAgICAgICdEYXkgbXVzdCBiZSBhIG51bWJlcicsXG5cdFx0RV9EQVlfVE9PX0JJRzogICAgICAgICAnRGF5IG11c3QgYmUgMS0zMScsXG5cdFx0RV9EQVlfVE9PX1NNQUxMOiAgICAgICAnRGF5IG11c3QgYmUgMS0zMScsXG5cdFx0RV9CQURfREFZX0ZPUl9NT05USDogICAnT25seSAlZCBkYXlzIGluICVtICV5Jyxcblx0XHRFX01PTlRIX05BTjogICAgICAgICAgICdNb250aCBtdXN0IGJlIGEgbnVtYmVyJyxcblx0XHRFX01PTlRIX1RPT19CSUc6ICAgICAgICdNb250aCBtdXN0IGJlIDEtMTInLFxuXHRcdEVfTU9OVEhfVE9PX1NNQUxMOiAgICAgJ01vbnRoIGNhbm5vdCBiZSAwJyxcblx0XHRFX1lFQVJfTkFOOiAgICAgICAgICAgICdZZWFyIG11c3QgYmUgYSBudW1iZXInLFxuXHRcdEVfWUVBUl9MRU5HVEg6ICAgICAgICAgJ1llYXIgbXVzdCBiZSA0IGRpZ2l0cycsXG5cdFx0RV9ZRUFSX1RPT19TTUFMTDogICAgICAnWWVhciBtdXN0IG5vdCBiZSBiZWZvcmUgJXknLFxuXHRcdEVfTUlOX0RBVEU6ICAgICAgICAgICAgJ0RhdGUgbXVzdCBub3QgYmUgaW4gdGhlIHBhc3QnLFxuXHRcdEVfTUFYX0RBVEU6ICAgICAgICAgICAgJ0RhdGUgbXVzdCBub3QgYmUgaW4gdGhlIGZ1dHVyZSdcblx0fTtcblxuXHRjbGFzcyBLckRvYkVudHJ5IHtcblx0XHRjb25zdHJ1Y3RvcigkZWxlbWVudCwgb3B0aW9ucykge1xuXHRcdFx0dG9kYXkgPSBLckRvYkVudHJ5LmdldFltZChuZXcgRGF0ZSgpKTtcblxuXHRcdFx0dGhpcy5pbnB1dF9kYXkgPSAwO1xuXHRcdFx0dGhpcy5pbnB1dF9tb250aCA9IDA7XG5cdFx0XHR0aGlzLmlucHV0X3llYXIgPSAwO1xuXHRcdFx0dGhpcy4kZWxlbWVudCA9ICRlbGVtZW50O1xuXHRcdFx0aWYgKG9wdGlvbnMpIHtcblx0XHRcdFx0JC5leHRlbmQoc2V0dGluZ3MsIG9wdGlvbnMpO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLmluaXQoKTtcblx0XHR9XG5cblx0XHRzdGF0aWMgZ2V0WW1kKGRhdGUpIHtcblx0XHRcdGNvbnN0IG0gPSBkYXRlLmdldE1vbnRoKCkgKyAxO1xuXHRcdFx0Y29uc3QgZCA9IGRhdGUuZ2V0RGF5KCk7XG5cblx0XHRcdHJldHVybiAoZGF0ZS5nZXRGdWxsWWVhcigpICsgJy0nICsgKG0gPCAxMCA/ICcwJyA6ICcnKSArIG0gKyAnLScgKyAoZCA8IDEwID8gJzAnIDogJycpICsgZCk7XG5cdFx0fVxuXG5cdFx0c3RhdGljIGdldFltZE9iamVjdChkYXRlKSB7XG5cdFx0XHRyZXR1cm4gKGRhdGUueWVhciArICctJyArIGRhdGUubW9udGggKyAnLScgKyBkYXRlLmRheSk7XG5cdFx0fVxuXG5cdFx0YWRkRW50cnlGaWVsZHMoKSB7XG5cdFx0XHRsZXQgZG9iZmllbGQgPSB0aGlzO1xuXHRcdFx0ZG9iZmllbGQuZmllbGRzID0gW107XG5cdFx0XHQkLmVhY2goc2V0dGluZ3MuZmllbGRfb3JkZXIuc3BsaXQoJycpLCBmdW5jdGlvbiAoaSwgZmllbGQpIHtcblx0XHRcdFx0c3dpdGNoIChmaWVsZCkge1xuXHRcdFx0XHRcdGNhc2UgJ0QnOlxuXHRcdFx0XHRcdFx0ZG9iZmllbGQuYnVpbGRGaWVsZCgnZGF5JywgaSk7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlICdNJzpcblx0XHRcdFx0XHRcdGRvYmZpZWxkLmJ1aWxkRmllbGQoJ21vbnRoJywgaSk7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlICdZJzpcblx0XHRcdFx0XHRcdGRvYmZpZWxkLmJ1aWxkRmllbGQoJ3llYXInLCBpKTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGRlZmF1bHQgOlxuXHRcdFx0XHRcdFx0dGhyb3cgXCJVbmV4cGVjdGVkIGZpZWxkIG9yZGVyICdcIiArIGZpZWxkICsgXCInIGV4cGVjdGVkIEQsIE0gb3IgWVwiO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRhZnRlclBhc3RlKHRhcmdldCkge1xuXHRcdFx0aWYgKHRoaXMucGFyc2VEYXRlKCQodGFyZ2V0KS52YWwoKSkpIHtcblx0XHRcdFx0dGhpcy5zZXREYXRlKCQodGFyZ2V0KS52YWwoKSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0YnVpbGRGaWVsZChuYW1lLCBpbmRleCkge1xuXHRcdFx0bGV0IGtyZG9iZW50cnkgPSB0aGlzO1xuXHRcdFx0bGV0IGlucHV0ID0gbmV3IEtyRG9iSW5wdXQoe1xuXHRcdFx0XHRuYW1lOiAgICAgICBuYW1lLFxuXHRcdFx0XHRrcmRvYmVudHJ5OiBrcmRvYmVudHJ5LFxuXHRcdFx0XHRpbmRleDogICAgICBpbmRleCxcblx0XHRcdFx0aGludF90ZXh0OiAgc2V0dGluZ3Muc2hvd19oaW50cyA/IHNldHRpbmdzWydmaWVsZF9oaW50X3RleHRfJyArIG5hbWVdIDogbnVsbCxcblx0XHRcdH0pO1xuXG5cdFx0XHR0aGlzLmlubmVyLmFwcGVuZChpbnB1dC4kaW5wdXQpO1xuXHRcdFx0dGhpc1snaW5wdXRfJyArIG5hbWVdID0gaW5wdXQ7XG5cblx0XHRcdGlmIChpbmRleCA8IDIpIHtcblx0XHRcdFx0dGhpcy5pbm5lci5hcHBlbmQoJCgnPHNwYW4gY2xhc3M9XCJzZXBhcmF0b3JcIiAvPicpLnRleHQoc2V0dGluZ3Muc2VwYXJhdG9yKSk7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuZmllbGRzW2luZGV4XSA9IGlucHV0O1xuXHRcdFx0dGhpc1tuYW1lXSA9IGlucHV0O1xuXHRcdH1cblxuXHRcdGJ1aWxkVWkoKSB7XG5cdFx0XHRsZXQgZG9iZmllbGQgPSB0aGlzO1xuXHRcdFx0dGhpcy53cmFwcGVyID0gJCh0aGlzLiRlbGVtZW50LndyYXAoJzxzcGFuIGNsYXNzPVwianEtZHRlXCIgLz4nKS5wYXJlbnQoKVswXSk7XG5cdFx0XHR0aGlzLmlubmVyID0gJCgnPHNwYW4gY2xhc3M9XCJqcS1kdGUtaW5uZXJcIiAvPicpO1xuXHRcdFx0dGhpcy5hZGRFbnRyeUZpZWxkcygpO1xuXHRcdFx0dGhpcy5lcnJvcmJveCA9ICQoJzxzcGFuIGNsYXNzPVwianEtZHRlLWVycm9yYm94XCIgLz4nKS5oaWRlKCk7XG5cdFx0XHR0aGlzLmlubmVyLm9uKCdwYXN0ZScsICdpbnB1dCcsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdGxldCBpbnB1dCA9IHRoaXM7XG5cdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdGRvYmZpZWxkLmFmdGVyUGFzdGUoaW5wdXQsIGUpO1xuXHRcdFx0XHR9LCAyKTtcblx0XHRcdH0pO1xuXHRcdFx0dGhpcy53cmFwcGVyLmFwcGVuZCh0aGlzLmlubmVyLCB0aGlzLmVycm9yYm94KTtcblx0XHRcdHRoaXMuc2V0RmllbGRXaWR0aHMoKTtcblx0XHRcdHRoaXMuJGVsZW1lbnQuaGlkZSgpO1xuXHRcdH1cblxuXHRcdGNoZWNrRG9jdW1lbnQoZG9iLCBjaGlsZGRvYiwgY2xhc3NuYW1lKSB7XG5cdFx0XHRsZXQgZWxlbWVudHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGNsYXNzbmFtZSk7XG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmIChuZXcgRGF0ZShkb2IpID4gbmV3IERhdGUoY2hpbGRkb2IpKSB7XG5cdFx0XHRcdFx0ZWxlbWVudHNbaV0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRlbGVtZW50c1tpXS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGNsZWFyKCkge1xuXHRcdFx0dGhpcy5jbGVhckVycm9yKCcnKTtcblx0XHRcdHRoaXMuc2V0RGF0ZSgnJyk7XG5cdFx0fVxuXG5cdFx0Y2xlYXJFcnJvcigpIHtcblx0XHRcdGRlbGV0ZSB0aGlzLmVycm9yX3RleHQ7XG5cdFx0XHR0aGlzLnNob3dFcnJvcigpO1xuXHRcdH1cblxuXHRcdGRlc3Ryb3koKSB7XG5cdFx0XHR0aGlzLiRlbGVtZW50LnNob3coKTtcblx0XHRcdHRoaXMuJGVsZW1lbnQuY3NzKCdkaXNwbGF5JywgJycpO1xuXHRcdFx0dGhpcy53cmFwcGVyLmZpbmQoJ3NwYW4nKS5yZW1vdmUoKTtcblx0XHRcdHRoaXMuJGVsZW1lbnQudW53cmFwKCk7XG5cdFx0XHR0aGlzLiRlbGVtZW50LnJlbW92ZURhdGEoJ2RhdGV0ZXh0ZW50cnknKTtcblx0XHRcdGRlbGV0ZSB0aGlzLmlubmVyO1xuXHRcdFx0ZGVsZXRlIHRoaXMud3JhcHBlcjtcblx0XHRcdGRlbGV0ZSB0aGlzLiRlbGVtZW50O1xuXHRcdH1cblxuXHRcdGZvY3VzKCkge1xuXHRcdFx0dGhpcy5maWVsZHNbMF0uc2V0Rm9jdXModHJ1ZSk7XG5cdFx0fVxuXG5cdFx0Zm9jdXNGaWVsZEJlZm9yZShpbnB1dCkge1xuXHRcdFx0Y29uc3QgaW5kZXggPSBpbnB1dC5pbmRleDtcblx0XHRcdGlmIChpbmRleCA8IDEpIHtcblx0XHRcdFx0cmV0dXJuXG5cdFx0XHR9XG5cdFx0XHR0aGlzLmZpZWxkc1tpbmRleF0ueWllbGRGb2N1cygpO1xuXHRcdFx0dGhpcy5maWVsZHNbaW5kZXggLSAxXS5zZXRGb2N1cyh0cnVlKTtcblx0XHRcdC8vIGxldCBuZXh0ID0gdGhpcy5maWVsZHNbaW5kZXggLSAxXTtcblx0XHRcdC8vIGxldCB2YWwgPSBuZXh0LmdldCgpO1xuXHRcdFx0Ly8gbmV4dC5zZXRGb2N1cyhmYWxzZSk7XG5cdFx0fVxuXG5cdFx0Zm9jdXNGaWVsZEFmdGVyKGlucHV0KSB7XG5cdFx0XHRjb25zdCBpbmRleCA9IGlucHV0LmluZGV4O1xuXHRcdFx0aWYgKGluZGV4ID4gMSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHR0aGlzLmZpZWxkc1tpbmRleF0ueWllbGRGb2N1cygpO1xuXHRcdFx0dGhpcy5maWVsZHNbaW5kZXggKyAxXS5zZXRGb2N1cyh0cnVlKTtcblx0XHR9XG5cblx0XHRmb2N1c0luKCkge1xuXHRcdFx0dGhpcy53cmFwcGVyLmFkZENsYXNzKCdmb2N1cycpO1xuXHRcdH1cblxuXHRcdGZvY3VzT3V0KCkge1xuXHRcdFx0aWYgKHNldHRpbmdzLm9uX2JsdXIpIHtcblx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0c2VsZi53aWRnZXRGb2N1c0xvc3QoKTtcblx0XHRcdFx0fSwgMik7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLndyYXBwZXIucmVtb3ZlQ2xhc3MoJ2ZvY3VzJyk7XG5cdFx0fVxuXG5cdFx0Z2V0RGF0ZSgpIHtcblx0XHRcdHJldHVybiAodGhpcy5kYXlfdmFsdWUgJiYgdGhpcy5tb250aF92YWx1ZSAmJiB0aGlzLnllYXJfdmFsdWUpXG5cdFx0XHQgICAgICAgPyB7ZGF5OiB0aGlzLmRheV92YWx1ZSwgbW9udGg6IHRoaXMubW9udGhfdmFsdWUsIHllYXI6IHRoaXMueWVhcl92YWx1ZX1cblx0XHRcdCAgICAgICA6IG51bGw7XG5cdFx0fVxuXG5cdFx0aW5pdCgpIHtcblx0XHRcdGlmICghc2V0dGluZ3MubWluX3llYXIpXG5cdFx0XHRcdHNldHRpbmdzLm1pbl95ZWFyID0gJzE5MTAnO1xuXG5cdFx0XHR0aGlzLmJ1aWxkVWkoKTtcblx0XHRcdHRoaXMuc2V0RGF0ZSh0aGlzLiRlbGVtZW50LmF0dHIoJ3ZhbHVlJykpO1xuXHRcdFx0dGhpcy5wcm94eUxhYmVsQ2xpY2tzKCk7XG5cdFx0fVxuXG5cdFx0cGFyc2VEYXRlKHRleHQpIHtcblx0XHRcdHJldHVybiB0aGlzLnBhcnNlSXNvRGF0ZSh0ZXh0KTtcblx0XHR9XG5cblx0XHRwYXJzZUlzb0RhdGUodGV4dCkge1xuXHRcdFx0cmV0dXJuIHRleHQgJiYgdGV4dC5tYXRjaCgvXihcXGRcXGRcXGRcXGQpLShcXGRcXGQpLShcXGRcXGQpLykgPyB7XG5cdFx0XHRcdGRheTogICBSZWdFeHAuJDMsXG5cdFx0XHRcdG1vbnRoOiBSZWdFeHAuJDIsXG5cdFx0XHRcdHllYXI6ICBSZWdFeHAuJDFcblx0XHRcdH0gOiBudWxsO1xuXHRcdH1cblxuXHRcdHByb3h5TGFiZWxDbGlja3MoKSB7XG5cdFx0XHRsZXQgZG9iZmllbGQgPSB0aGlzO1xuXHRcdFx0bGV0IGlkID0gdGhpcy4kZWxlbWVudC5hdHRyKCdpZCcpO1xuXHRcdFx0aWYgKCFpZCkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHQkKCdsYWJlbFtmb3I9JyArIGlkICsgJ10nKS5jbGljayhmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdGRvYmZpZWxkLmZvY3VzKCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRzZXREYXRlKG5ld19kYXRlKSB7XG5cdFx0XHRsZXQgZG9iZmllbGQgPSB0aGlzO1xuXHRcdFx0bmV3X2RhdGUgPSB0aGlzLnBhcnNlRGF0ZShuZXdfZGF0ZSk7XG5cdFx0XHRkZWxldGUgdGhpcy5kYXlfdmFsdWU7XG5cdFx0XHRkZWxldGUgdGhpcy5tb250aF92YWx1ZTtcblx0XHRcdGRlbGV0ZSB0aGlzLnllYXJfdmFsdWU7XG5cdFx0XHR0aGlzLmlucHV0X2RheS5zZXQobmV3X2RhdGUgPyBuZXdfZGF0ZS5kYXkgOiAnJyk7XG5cdFx0XHR0aGlzLmlucHV0X21vbnRoLnNldChuZXdfZGF0ZSA/IG5ld19kYXRlLm1vbnRoIDogJycpO1xuXHRcdFx0dGhpcy5pbnB1dF95ZWFyLnNldChuZXdfZGF0ZSA/IG5ld19kYXRlLnllYXIgOiAnJyk7XG5cdFx0XHR0aGlzLmNsZWFyRXJyb3IoKTtcblx0XHRcdHRoaXMuJGVsZW1lbnQudmFsKG5ld19kYXRlKTtcblx0XHRcdGlmIChuZXdfZGF0ZSkge1xuXHRcdFx0XHQkLmVhY2godGhpcy5maWVsZHMsIGZ1bmN0aW9uIChpLCBpbnB1dCkge1xuXHRcdFx0XHRcdGRvYmZpZWxkLnZhbGlkYXRlKGlucHV0KTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0c2V0RXJyb3IoZXJyb3JfdGV4dCkge1xuXHRcdFx0dGhpcy5lcnJvcl90ZXh0ID0gZXJyb3JfdGV4dDtcblx0XHRcdHRoaXMuc2hvd0Vycm9yKCk7XG5cdFx0fVxuXG5cdFx0c2V0RmllbGRXaWR0aHMoKSB7XG5cdFx0XHRsZXQgYXZhaWxhYmxlID0gdGhpcy4kZWxlbWVudC53aWR0aCgpIC0gMjtcblx0XHRcdGxldCB0b3RhbCA9IHNldHRpbmdzLmZpZWxkX3dpZHRoX3llYXIgKyBzZXR0aW5ncy5maWVsZF93aWR0aF9zZXAgKyBzZXR0aW5ncy5maWVsZF93aWR0aF9tb250aCArXG5cdFx0XHRcdHNldHRpbmdzLmZpZWxkX3dpZHRoX3NlcCArIHNldHRpbmdzLmZpZWxkX3dpZHRoX2RheTtcblx0XHRcdHRoaXMuaW5wdXRfZGF5LnNldFdpZHRoKE1hdGguZmxvb3Ioc2V0dGluZ3MuZmllbGRfd2lkdGhfZGF5ICogYXZhaWxhYmxlIC8gdG90YWwpKTtcblx0XHRcdHRoaXMuaW5wdXRfbW9udGguc2V0V2lkdGgoTWF0aC5mbG9vcihzZXR0aW5ncy5maWVsZF93aWR0aF9tb250aCAqIGF2YWlsYWJsZSAvIHRvdGFsKSk7XG5cdFx0XHR0aGlzLmlucHV0X3llYXIuc2V0V2lkdGgoTWF0aC5mbG9vcihzZXR0aW5ncy5maWVsZF93aWR0aF95ZWFyICogYXZhaWxhYmxlIC8gdG90YWwpKTtcblx0XHR9XG5cblx0XHRzZXRSZWFkb25seShtb2RlKSB7XG5cdFx0XHRpZiAobW9kZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdG1vZGUgPSB0cnVlO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5pbnB1dF9kYXkuc2V0UmVhZG9ubHkobW9kZSk7XG5cdFx0XHR0aGlzLmlucHV0X21vbnRoLnNldFJlYWRvbmx5KG1vZGUpO1xuXHRcdFx0dGhpcy5pbnB1dF95ZWFyLnNldFJlYWRvbmx5KG1vZGUpO1xuXHRcdFx0aWYgKG1vZGUpIHtcblx0XHRcdFx0dGhpcy53cmFwcGVyLmFkZENsYXNzKCdyZWFkb25seScpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy53cmFwcGVyLnJlbW92ZUNsYXNzKCdyZWFkb25seScpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHNob3dFcnJvcigpIHtcblx0XHRcdGxldCBlcnJvcl90ZXh0ID0gdGhpcy53aWRnZXRFcnJvclRleHQoKTtcblx0XHRcdGlmICh0aGlzLm9uX2Vycm9yKSB7XG5cdFx0XHRcdHRoaXMub25fZXJyb3IoZXJyb3JfdGV4dCk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIXNldHRpbmdzLnNob3dfZXJyb3JzKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdGlmIChlcnJvcl90ZXh0ID09PSAnJykge1xuXHRcdFx0XHR0aGlzLmVycm9yYm94LmhpZGUoKTtcblx0XHRcdFx0dGhpcy5lcnJvcmJveC50ZXh0KCcnKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGxldCB4X29mZnNldCA9ICh0aGlzLmlubmVyLm91dGVyV2lkdGgoKSArIHNldHRpbmdzLmVycm9yYm94X3gpICsgJ3B4Jztcblx0XHRcdFx0bGV0IHlfb2Zmc2V0ID0gc2V0dGluZ3MuZXJyb3Jib3hfeSArICdweCc7XG5cdFx0XHRcdHRoaXMuZXJyb3Jib3guY3NzKHtkaXNwbGF5OiAnYmxvY2snLCBwb3NpdGlvbjogJ2Fic29sdXRlJywgdG9wOiB5X29mZnNldCwgbGVmdDogeF9vZmZzZXR9KTtcblx0XHRcdFx0dGhpcy5lcnJvcmJveC50ZXh0KGVycm9yX3RleHQpO1xuXHRcdFx0XHR0aGlzLmVycm9yYm94LnNob3coKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR2YWxpZGF0ZShjdXJyZW50X2lucHV0KSB7XG5cdFx0XHR0aGlzLiRlbGVtZW50LnZhbCgnJyk7XG5cdFx0XHRpZiAoY3VycmVudF9pbnB1dCkge1xuXHRcdFx0XHRjb25zdCB0eXBlID0gY3VycmVudF9pbnB1dC5uYW1lO1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdGlmICh0eXBlID09PSAnZGF5Jykge1xuXHRcdFx0XHRcdFx0dGhpcy52YWxpZGF0ZURheSgpO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAodHlwZSA9PT0gJ21vbnRoJykge1xuXHRcdFx0XHRcdFx0dGhpcy52YWxpZGF0ZU1vbnRoKCk7XG5cdFx0XHRcdFx0fSBlbHNlIGlmICh0eXBlID09PSAneWVhcicpIHtcblx0XHRcdFx0XHRcdHRoaXMudmFsaWRhdGVZZWFyKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGN1cnJlbnRfaW5wdXQuY2xlYXJFcnJvcigpO1xuXHRcdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdFx0Y3VycmVudF9pbnB1dC5zZXRFcnJvcihlKTtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmICh0aGlzLmRheV92YWx1ZSAmJiB0aGlzLm1vbnRoX3ZhbHVlKSB7XG5cdFx0XHRcdHRoaXMuY2xlYXJFcnJvcigpO1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdHRoaXMudmFsaWRhdGVEYXlzSW5Nb250aCgpO1xuXHRcdFx0XHRcdGlmICh0aGlzLnllYXJfdmFsdWUgJiYgdGhpcy55ZWFyX3ZhbHVlLmxlbmd0aCA9PT0gNCkge1xuXHRcdFx0XHRcdFx0dGhpcy52YWxpZGF0ZUNvbXBsZXRlRGF0ZSgpO1xuXHRcdFx0XHRcdFx0bGV0IGRhdGVfc3RyID0gS3JEb2JFbnRyeS5nZXRZbWRPYmplY3QodGhpcy5nZXREYXRlKCkpO1xuXHRcdFx0XHRcdFx0dGhpcy4kZWxlbWVudC52YWwoZGF0ZV9zdHIpO1xuXHRcdFx0XHRcdFx0aWYgKHRoaXMuJGVsZW1lbnQuZGF0YSgnY2hpbGRkb2InKSkge1xuXHRcdFx0XHRcdFx0XHR0aGlzLmNoZWNrRG9jdW1lbnQoZGF0ZV9zdHIsIHRoaXMuJGVsZW1lbnQuZGF0YSgnY2hpbGRkb2InKSwgdGhpcy4kZWxlbWVudC5hdHRyKCdpZCcpKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0XHR0aGlzLnNldEVycm9yKGUpO1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5jbGVhckVycm9yKCk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdHZhbGlkYXRlQ29tcGxldGVEYXRlKCkge1xuXHRcdFx0Y29uc3QgZGF0ZV9vYmogPSB0aGlzLmdldERhdGUoKTtcblx0XHRcdGNvbnN0IGRhdGVfaXNvID0gS3JEb2JFbnRyeS5nZXRZbWRPYmplY3QoZGF0ZV9vYmopO1xuXHRcdFx0c2V0dGluZ3MubWlubWF4ID0gdGhpcy4kZWxlbWVudC5kYXRhKCd2YWxpZGF0aW9uJyk7XG5cblx0XHRcdGlmIChzZXR0aW5ncy5taW5tYXggPT09ICdtYXgnKSB7XG5cdFx0XHRcdGlmIChkYXRlX2lzbyA+IHRvZGF5KSB7XG5cdFx0XHRcdFx0dGhyb3coc2V0dGluZ3MuRV9NQVhfREFURSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmIChzZXR0aW5ncy5taW5tYXggPT09ICdtaW4nKSB7XG5cdFx0XHRcdGlmIChkYXRlX2lzbyA8IHRvZGF5KSB7XG5cdFx0XHRcdFx0dGhyb3coc2V0dGluZ3MuRV9NSU5fREFURSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gbGV0IG1heF9kYXRlID0gc2V0dGluZ3MubWF4X2RhdGU7XG5cdFx0XHQvLyBpZiAodHlwZW9mIG1heF9kYXRlID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHQvLyBcdG1heF9kYXRlID0gbWF4X2RhdGUuY2FsbCh0aGlzKTtcblx0XHRcdC8vIH1cblx0XHRcdC8vIGlmICh0eXBlb2YgbWF4X2RhdGUgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHQvLyBcdG1heF9kYXRlID0gdGhpcy5wYXJzZURhdGUobWF4X2RhdGUpO1xuXHRcdFx0Ly8gfVxuXHRcdFx0Ly8gaWYgKG1heF9kYXRlKSB7XG5cdFx0XHQvLyBcdGlmIChkYXRlX2lzbyA+IHNldHRpbmdzLm1heF9kYXRlKSB7XG5cdFx0XHQvLyBcdFx0dGhyb3coc2V0dGluZ3MuRV9NQVhfREFURSk7XG5cdFx0XHQvLyBcdH1cblx0XHRcdC8vIH1cblxuXHRcdFx0aWYgKHRoaXMuY3VzdG9tX3ZhbGlkYXRpb24pIHtcblx0XHRcdFx0ZGF0ZV9vYmouZGF0ZSA9IG5ldyBEYXRlKFxuXHRcdFx0XHRcdHBhcnNlSW50KGRhdGVfb2JqLnllYXIsIDEwKSxcblx0XHRcdFx0XHRwYXJzZUludChkYXRlX29iai5tb250aCwgMTApIC0gMSxcblx0XHRcdFx0XHRwYXJzZUludChkYXRlX29iai5kYXksIDEwKVxuXHRcdFx0XHQpO1xuXHRcdFx0XHR0aGlzLmN1c3RvbV92YWxpZGF0aW9uKGRhdGVfb2JqKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR2YWxpZGF0ZURheSgpIHtcblx0XHRcdGxldCBvcHQgPSBzZXR0aW5ncztcblx0XHRcdGxldCBpbnB1dCA9IHRoaXMuaW5wdXRfZGF5O1xuXHRcdFx0dGhpcy5kYXlfdmFsdWUgPSB1bmRlZmluZWQ7XG5cdFx0XHRsZXQgdGV4dCA9IGlucHV0LmdldCgpO1xuXHRcdFx0aWYgKHRleHQgPT09ICcnIHx8ICh0ZXh0ID09PSAnMCcgJiYgaW5wdXQuaGFzX2ZvY3VzKSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRpZiAodGV4dC5tYXRjaCgvXFxELykpIHtcblx0XHRcdFx0dGhyb3cob3B0LkVfREFZX05BTik7XG5cdFx0XHR9XG5cdFx0XHRsZXQgbnVtID0gcGFyc2VJbnQodGV4dCwgMTApO1xuXHRcdFx0aWYgKG51bSA8IDEpIHtcblx0XHRcdFx0dGhyb3cob3B0LkVfREFZX1RPT19TTUFMTCk7XG5cdFx0XHR9XG5cdFx0XHRpZiAobnVtID4gMzEpIHtcblx0XHRcdFx0dGhyb3cob3B0LkVfREFZX1RPT19CSUcpO1xuXHRcdFx0fVxuXHRcdFx0dGV4dCA9IG51bSA8IDEwID8gJzAnICsgbnVtIDogJycgKyBudW07XG5cdFx0XHRpZiAoIWlucHV0Lmhhc19mb2N1cykge1xuXHRcdFx0XHRpbnB1dC5zZXQodGV4dCk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLmRheV92YWx1ZSA9IHRleHQ7XG5cdFx0fVxuXG5cdFx0dmFsaWRhdGVEYXlzSW5Nb250aCgpIHtcblx0XHRcdGNvbnN0IGRheSA9IHBhcnNlSW50KHRoaXMuZGF5X3ZhbHVlLCAxMCk7XG5cdFx0XHRjb25zdCBtb250aCA9IHBhcnNlSW50KHRoaXMubW9udGhfdmFsdWUsIDEwKTtcblx0XHRcdGNvbnN0IHllYXIgPSBwYXJzZUludCh0aGlzLnllYXJfdmFsdWUsIDEwKTtcblx0XHRcdGlmIChkYXkgPCAxIHx8IG1vbnRoIDwgMSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRsZXQgbWF4ID0gc2V0dGluZ3MuZGF5c19pbl9tb250aFttb250aCAtIDFdO1xuXHRcdFx0bGV0IG1zZyA9IHNldHRpbmdzLkVfQkFEX0RBWV9GT1JfTU9OVEg7XG5cdFx0XHRpZiAobW9udGggPT09IDIgJiYgKCcnICsgeWVhcikubGVuZ3RoID09PSA0KSB7XG5cdFx0XHRcdG1heCA9IHllYXIgJSA0ID8gMjggOiB5ZWFyICUgMTAwID8gMjkgOiB5ZWFyICUgNDAwID8gMjggOiAyOTtcblx0XHRcdFx0bXNnID0gbXNnLnJlcGxhY2UoLyV5LywgeWVhci50b1N0cmluZygpKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdG1zZyA9IG1zZy5yZXBsYWNlKC8gKiV5LywgJycpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGRheSA+IG1heCkge1xuXHRcdFx0XHR0aHJvdyhtc2cucmVwbGFjZSgvJWQvLCBtYXgudG9TdHJpbmcoKSkucmVwbGFjZSgvJW0vLCBzZXR0aW5ncy5tb250aF9uYW1lW21vbnRoIC0gMV0pKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR2YWxpZGF0ZU1vbnRoKCkge1xuXHRcdFx0bGV0IGlucHV0ID0gdGhpcy5pbnB1dF9tb250aDtcblx0XHRcdHRoaXMubW9udGhfdmFsdWUgPSB1bmRlZmluZWQ7XG5cdFx0XHRsZXQgdGV4dCA9IGlucHV0LmdldCgpO1xuXHRcdFx0aWYgKHRleHQgPT09ICcnIHx8ICh0ZXh0ID09PSAnMCcgJiYgaW5wdXQuaGFzX2ZvY3VzKSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRpZiAodGV4dC5tYXRjaCgvXFxELykpIHtcblx0XHRcdFx0dGhyb3coc2V0dGluZ3MuRV9NT05USF9OQU4pO1xuXHRcdFx0fVxuXHRcdFx0bGV0IG51bSA9IHBhcnNlSW50KHRleHQsIDEwKTtcblx0XHRcdGlmIChudW0gPCAxKSB7XG5cdFx0XHRcdHRocm93KHNldHRpbmdzLkVfTU9OVEhfVE9PX1NNQUxMKTtcblx0XHRcdH1cblx0XHRcdGlmIChudW0gPiAxMikge1xuXHRcdFx0XHR0aHJvdyhzZXR0aW5ncy5FX01PTlRIX1RPT19CSUcpO1xuXHRcdFx0fVxuXHRcdFx0dGV4dCA9IG51bSA8IDEwID8gJzAnICsgbnVtIDogJycgKyBudW07XG5cdFx0XHRpZiAoIWlucHV0Lmhhc19mb2N1cykge1xuXHRcdFx0XHRpbnB1dC5zZXQodGV4dCk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLm1vbnRoX3ZhbHVlID0gdGV4dDtcblx0XHR9XG5cblx0XHR2YWxpZGF0ZVllYXIoKSB7XG5cdFx0XHRjb25zdCBpbnB1dCA9IHRoaXMuaW5wdXRfeWVhcjtcblx0XHRcdHRoaXMueWVhcl92YWx1ZSA9IHVuZGVmaW5lZDtcblx0XHRcdGxldCB0ZXh0ID0gaW5wdXQuZ2V0KCk7XG5cdFx0XHRpZiAodGV4dCA9PT0gJycgfHwgKHRleHQgPT09ICcwJyAmJiBpbnB1dC5oYXNfZm9jdXMpKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdGlmICh0ZXh0Lm1hdGNoKC9cXEQvKSkge1xuXHRcdFx0XHR0aHJvdyhzZXR0aW5ncy5FX1lFQVJfTkFOKTtcblx0XHRcdH1cblx0XHRcdGlmIChpbnB1dC5oYXNfZm9jdXMpIHtcblx0XHRcdFx0aWYgKHRleHQubGVuZ3RoID4gNCkge1xuXHRcdFx0XHRcdHRocm93KHNldHRpbmdzLkVfWUVBUl9MRU5HVEgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAodGV4dC5sZW5ndGggIT09IDQpIHtcblx0XHRcdFx0XHR0aHJvdyhzZXR0aW5ncy5FX1lFQVJfTEVOR1RIKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKHRleHQubGVuZ3RoID09PSA0KSB7XG5cdFx0XHRcdGNvbnN0IG51bSA9IHBhcnNlSW50KHRleHQsIDEwKTtcblx0XHRcdFx0aWYgKHNldHRpbmdzLm1pbl95ZWFyICYmIG51bSA8IHNldHRpbmdzLm1pbl95ZWFyKSB7XG5cdFx0XHRcdFx0dGhyb3coc2V0dGluZ3MuRV9ZRUFSX1RPT19TTUFMTC5yZXBsYWNlKC8leS8sIHNldHRpbmdzLm1pbl95ZWFyKSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHRoaXMueWVhcl92YWx1ZSA9IHRleHQ7XG5cdFx0fVxuXG5cdFx0d2lkZ2V0RXJyb3JUZXh0KCkge1xuXHRcdFx0bGV0IGVycm9yX3RleHQgPSAnJztcblx0XHRcdCQuZWFjaCh0aGlzLmZpZWxkcywgZnVuY3Rpb24gKGksIGlucHV0KSB7XG5cdFx0XHRcdGlmIChpbnB1dC5lcnJvcl90ZXh0KSB7XG5cdFx0XHRcdFx0aWYgKGlucHV0Lmhhc19mb2N1cyB8fCBlcnJvcl90ZXh0ID09PSAnJykge1xuXHRcdFx0XHRcdFx0ZXJyb3JfdGV4dCA9IGlucHV0LmVycm9yX3RleHRcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0aWYgKGVycm9yX3RleHQgPT09ICcnICYmIHRoaXMuZXJyb3JfdGV4dCkge1xuXHRcdFx0XHRlcnJvcl90ZXh0ID0gdGhpcy5lcnJvcl90ZXh0O1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGVycm9yX3RleHQ7XG5cdFx0fVxuXG5cdFx0d2lkZ2V0Rm9jdXNMb3N0KCkge1xuXHRcdFx0aWYgKHNldHRpbmdzLm9uX2JsdXIgJiYgIXRoaXMud3JhcHBlci5pcygnLmZvY3VzJykpIHtcblx0XHRcdFx0c2V0dGluZ3Mub25CbHVyKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Y2xhc3MgS3JEb2JJbnB1dCB7XG5cdFx0Y29uc3RydWN0b3Iob3B0aW9ucykge1xuXHRcdFx0Y29uc3QgaW5wdXQgPSB0aGlzO1xuXHRcdFx0dGhpcy5kb2JmaWVsZCA9IG9wdGlvbnMua3Jkb2JlbnRyeTtcblx0XHRcdHRoaXMubmFtZSA9IG9wdGlvbnMubmFtZTtcblx0XHRcdHRoaXMuaW5kZXggPSBvcHRpb25zLmluZGV4O1xuXHRcdFx0dGhpcy5oaW50X3RleHQgPSBvcHRpb25zLmhpbnRfdGV4dDtcblx0XHRcdHRoaXMuaGFzX2ZvY3VzID0gZmFsc2U7XG5cdFx0XHR0aGlzLmVtcHR5ID0gdHJ1ZTtcblx0XHRcdHRoaXMuJGlucHV0ID0gJCgnPGlucHV0IHR5cGU9XCJ0ZXh0XCIgdmFsdWU9XCJcIiAvPicpLmFkZENsYXNzKCdqcS1kdGUtJyArIHRoaXMubmFtZSkuYXR0cignYXJpYS1sYWJlbCcsICcnICsgXCIgKFwiICsgdGhpcy5oaW50X3RleHQgKyBcIilcIikuZm9jdXMoJC5wcm94eShpbnB1dCwgJ2ZvY3VzJykpLmJsdXIoJC5wcm94eShpbnB1dCwgJ2JsdXInKSkua2V5ZG93bihmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRpbnB1dC5rZXlkb3duKGUpO1xuXHRcdFx0XHR9LCAyKVxuXHRcdFx0fSkua2V5dXAoZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0aW5wdXQua2V5dXAoZSk7XG5cdFx0XHRcdH0sIDIpXG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRibHVyKCkge1xuXHRcdFx0dGhpcy5oYXNfZm9jdXMgPSBmYWxzZTtcblx0XHRcdHRoaXMuZG9iZmllbGQuZm9jdXNPdXQoKTtcblx0XHRcdHRoaXMuc2hvd19oaW50KCk7XG5cdFx0XHR0aGlzLmRvYmZpZWxkLnZhbGlkYXRlKHRoaXMpO1xuXHRcdH1cblxuXHRcdGNsZWFyRXJyb3IoKSB7XG5cdFx0XHRkZWxldGUgdGhpcy5lcnJvcl90ZXh0O1xuXHRcdFx0dGhpcy4kaW5wdXQucmVtb3ZlQ2xhc3MoJ2Vycm9yJyk7XG5cdFx0fVxuXG5cdFx0Zm9jdXMoKSB7XG5cdFx0XHR0aGlzLmtleV9pc19kb3duID0gZmFsc2U7XG5cdFx0XHRpZiAodGhpcy4kaW5wdXQucHJvcCgncmVhZG9ubHknKSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHR0aGlzLmhhc19mb2N1cyA9IHRydWU7XG5cdFx0XHR0aGlzLmRvYmZpZWxkLmZvY3VzSW4oKTtcblx0XHRcdGlmICh0aGlzLiRpbnB1dC5oYXNDbGFzcygnaGludCcpKSB7XG5cdFx0XHRcdHRoaXMuJGlucHV0LnZhbCgnJykucmVtb3ZlQ2xhc3MoJ2hpbnQnKTtcblx0XHRcdH1cblx0XHRcdHRoaXMuZG9iZmllbGQuc2hvd0Vycm9yKCk7XG5cdFx0fVxuXG5cdFx0Z2V0KCkge1xuXHRcdFx0bGV0IHZhbCA9IHRoaXMuJGlucHV0LnZhbCgpO1xuXHRcdFx0cmV0dXJuIHZhbCA9PT0gdGhpcy5oaW50X3RleHQgPyAnJyA6IHZhbDtcblx0XHR9XG5cblx0XHRpc0RpZ2l0S2V5KGUpIHtcblx0XHRcdGxldCBrZXljb2RlID0gZS53aGljaDtcblx0XHRcdHJldHVybiBrZXljb2RlID49IDQ4ICYmIGtleWNvZGUgPD0gNTcgfHwga2V5Y29kZSA+PSA5NiAmJiBrZXljb2RlIDw9IDEwNTtcblx0XHR9XG5cblx0XHRrZXlkb3duKCkge1xuXHRcdFx0Ly8gSWdub3JlIGtleXVwIGV2ZW50cyB0aGF0IGFycml2ZSBhZnRlciBmb2N1cyBtb3ZlZCB0byBuZXh0IGZpZWxkXG5cdFx0XHR0aGlzLmtleV9pc19kb3duID0gdHJ1ZTtcblx0XHR9XG5cblx0XHRrZXl1cChlKSB7XG5cdFx0XHRpZiAoIXRoaXMua2V5X2lzX2Rvd24pIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0Ly8gSGFuZGxlIEJhY2tzcGFjZSAtIHNoaWZ0aW5nIGZvY3VzIHRvIHByZXZpb3VzIGZpZWxkIGlmIHJlcXVpcmVkXG5cdFx0XHRsZXQga2V5Y29kZSA9IGUud2hpY2g7XG5cdFx0XHRpZiAoa2V5Y29kZSA9PT0ga2V5LkJBQ0tTUEFDRSAmJiB0aGlzLmVtcHR5KSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLmRvYmZpZWxkLmZvY3VzRmllbGRCZWZvcmUodGhpcyk7XG5cdFx0XHR9XG5cdFx0XHRsZXQgdGV4dCA9IHRoaXMuZ2V0KCk7XG5cdFx0XHR0aGlzLmVtcHR5ID0gdGV4dCA9PT0gJyc7XG5cblx0XHRcdC8vIFRyYXAgYW5kIGRpc2NhcmQgc2VwYXJhdG9yIGNoYXJhY3RlcnMgLSBhZHZhbmNpbmcgZm9jdXMgaWYgcmVxdWlyZWRcblx0XHRcdGlmICh0ZXh0Lm1hdGNoKC9bXFwvXFxcXC4gLV0vKSkge1xuXHRcdFx0XHR0ZXh0ID0gdGV4dC5yZXBsYWNlKC9bXFwvXFxcXC4gLV0vLCAnJyk7XG5cdFx0XHRcdHRoaXMuc2V0KHRleHQpO1xuXHRcdFx0XHRpZiAoIXRoaXMuZW1wdHkgJiYgdGhpcy5pbmRleCA8IDIpIHtcblx0XHRcdFx0XHR0aGlzLmRvYmZpZWxkLmZvY3VzRmllbGRBZnRlcih0aGlzKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBBZHZhbmNlIGZvY3VzIGlmIHRoaXMgZmllbGQgaXMgYm90aCB2YWxpZCBhbmQgZnVsbFxuXHRcdFx0aWYgKHRoaXMuZG9iZmllbGQudmFsaWRhdGUodGhpcykpIHtcblx0XHRcdFx0bGV0IHdhbnQgPSB0aGlzLm5hbWUgPT09ICd5ZWFyJyA/IDQgOiAyO1xuXHRcdFx0XHRpZiAodGhpcy5pc0RpZ2l0S2V5KGUpICYmIHRleHQubGVuZ3RoID09PSB3YW50KSB7XG5cdFx0XHRcdFx0dGhpcy5kb2JmaWVsZC5mb2N1c0ZpZWxkQWZ0ZXIodGhpcyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRsZWZ0KCkge1xuXHRcdFx0cmV0dXJuIHRoaXMuJGlucHV0LnBvc2l0aW9uKCkubGVmdDtcblx0XHR9XG5cblx0XHRzZXQobmV3X3ZhbHVlKSB7XG5cdFx0XHR0aGlzLiRpbnB1dC52YWwobmV3X3ZhbHVlKS5yZW1vdmVDbGFzcygnaGludCcpO1xuXHRcdFx0aWYgKCF0aGlzLmhhc19mb2N1cykge1xuXHRcdFx0XHR0aGlzLnNob3dfaGludCgpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5lbXB0eSA9IG5ld192YWx1ZSA9PT0gJyc7XG5cdFx0XHR0aGlzLmNsZWFyRXJyb3IoKTtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH1cblxuXHRcdHNldEVycm9yKHRleHQpIHtcblx0XHRcdHRoaXMuZXJyb3JfdGV4dCA9IHRleHQ7XG5cdFx0XHR0aGlzLiRpbnB1dC5hZGRDbGFzcygnZXJyb3InKTtcblx0XHRcdHRoaXMuZG9iZmllbGQuc2hvd0Vycm9yKCk7XG5cdFx0fVxuXG5cdFx0c2V0Rm9jdXMoc2VsZWN0X2FsbCkge1xuXHRcdFx0bGV0ICRpbnB1dCA9IHRoaXMuJGlucHV0O1xuXHRcdFx0JGlucHV0LmZvY3VzKCk7XG5cdFx0XHRpZiAoc2VsZWN0X2FsbCkge1xuXHRcdFx0XHQkaW5wdXQuc2VsZWN0KCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQkaW5wdXQudmFsKCRpbnB1dC52YWwoKSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9XG5cblx0XHRzZXRXaWR0aChuZXdfd2lkdGgpIHtcblx0XHRcdHRoaXMuJGlucHV0LndpZHRoKG5ld193aWR0aCk7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9XG5cblx0XHRzaG93X2hpbnQoKSB7XG5cdFx0XHRpZiAodGhpcy5nZXQoKSA9PT0gJycgJiYgdHlwZW9mICh0aGlzLmhpbnRfdGV4dCkgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRcdHRoaXMuJGlucHV0LnZhbCh0aGlzLmhpbnRfdGV4dCkuYWRkQ2xhc3MoJ2hpbnQnKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH1cblxuXHRcdHlpZWxkRm9jdXMoKSB7XG5cdFx0XHR0aGlzLiRpbnB1dC5ibHVyKCk7XG5cdFx0fVxuXHR9XG5cblx0JChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuXHRcdCQoJy5kb2Jpc3N1ZScpLmVhY2goZnVuY3Rpb24gKCkge1xuXHRcdFx0bXlLckRvYkVudHJ5ID0gbmV3IEtyRG9iRW50cnkoJCh0aGlzKSwge30pO1xuXHRcdH0pO1xuXHR9KTtcbn0oalF1ZXJ5KSk7IiwiLy8gbm9pbnNwZWN0aW9uIER1cGxpY2F0ZWRDb2RlXG5cbi8qKlxuICogQHBhY2thZ2UgICAgS25vdyBSZXNlcnZhdGlvbnNcbiAqIEBzdWJwYWNrYWdlIEFkbWluIEpTXG4gKiBAY29weXJpZ2h0ICAyMDIwIEhpZ2hsYW5kIFZpc2lvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIEBsaWNlbnNlICAgIFNlZSB0aGUgZmlsZSBcIkxJQ0VOU0UudHh0XCIgZm9yIHRoZSBmdWxsIGxpY2Vuc2UgZ292ZXJuaW5nIHRoaXMgY29kZS5cbiAqIEBhdXRob3IgICAgIEhhemVsIFdpbHNvbiA8aGF6ZWxAaGlnaGxhbmR2aXNpb24uY29tPlxuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24gKCQpIHtcblx0JChmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdob3d0b2Fycml2ZScpKSB7XG5cdFx0XHRjb25zdCBob3d0b2Fycml2ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdob3d0b2Fycml2ZScpO1xuXHRcdFx0bGV0IGFycml2YWxtZWFucyA9IGhvd3RvYXJyaXZlLmdldEF0dHJpYnV0ZSgnZGF0YS1tZWFucycpO1xuXHRcdFx0aWYgKCFhcnJpdmFsbWVhbnMpIHtcblx0XHRcdFx0YXJyaXZhbG1lYW5zID0gJ2Fpcic7XG5cdFx0XHR9XG5cdFx0XHRkaXNwbGF5QXJyaXZhbChhcnJpdmFsbWVhbnMpO1xuXHRcdH1cblxuXHRcdCQoJ2JvZHknKS5vbignY2xpY2snLCAnLmFtaXRlbScsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRkaXNwbGF5QXJyaXZhbCgkKHRoaXMpLmF0dHIoJ2lkJykpO1xuXHRcdH0pO1xuXHR9KTtcblxuXHRmdW5jdGlvbiBkaXNwbGF5QXJyaXZhbCh2YWx1ZSkge1xuXHRcdGxldCB4ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYW1pdGVtJyk7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB4Lmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR4W2ldLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuXHRcdH1cblxuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhaXItZGF0YScpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RyYWluLWRhdGEnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhdXRvLWRhdGEnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvdGhlci1kYXRhJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblx0XHRsZXQgYXJyaXZhbGRhdGEgPSB2YWx1ZSArICctZGF0YSc7XG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYXJyaXZhbGRhdGEpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHZhbHVlKS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnamZvcm1fYXJyaXZhbF9tZWFucycpLnZhbHVlID0gdmFsdWU7XG5cdH1cbn0pKGpRdWVyeSk7IiwiLyoqXG4gKiBAcGFja2FnZSAgICBLbm93IFJlc2VydmF0aW9uc1xuICogQHN1YnBhY2thZ2UgU2l0ZSBKU1xuICogQGNvcHlyaWdodCAgMjAyMCBIaWdobGFuZCBWaXNpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBAbGljZW5zZSAgICBTZWUgdGhlIGZpbGUgXCJMSUNFTlNFLnR4dFwiIGZvciB0aGUgZnVsbCBsaWNlbnNlIGdvdmVybmluZyB0aGlzIGNvZGUuXG4gKiBAYXV0aG9yICAgICBIYXplbCBXaWxzb24gPGhhemVsQGhpZ2hsYW5kdmlzaW9uLmNvbT5cbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxuaWYgKCF3aW5kb3cubG9jYXRpb24ub3JpZ2luKSB7XG5cdHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gPSB3aW5kb3cubG9jYXRpb24ucHJvdG9jb2wgKyBcIi8vXCIgKyB3aW5kb3cubG9jYXRpb24uaG9zdDtcbn1cbmNvbnN0IGxpdmVzaXRlID0gd2luZG93LmxvY2F0aW9uLm9yaWdpbiArICcvJztcbmNvbnN0IGxhbmcgPSBcImVuXCI7XG5cbihmdW5jdGlvbiAoJCkge1xuXHRjb25zdCBtYXJrZXJzaGFwZSA9IHtcblx0XHR0eXBlOiAgICdwb2x5Jyxcblx0XHRjb29yZHM6IFsxLCAxLCAxLCAzMiwgMzcsIDMyLCAzMiwgMV1cblx0fTtcblxuXHRsZXQgbXlLcm1hcDtcblx0bGV0IG1hcERhdGEgPSBmYWxzZTtcblx0bGV0IG1hcDtcblx0bGV0IG1hcFpvb207XG5cdGxldCBpbmZvV2luZG93O1xuXHRsZXQgaW5mb1dpbmRvdzI7XG5cdGxldCBib3VuZHM7XG5cdGxldCBwcm9wZXJ0eWRpdjtcblx0bGV0IHByb3BlcnR5aWNvbjtcblx0bGV0IG1jO1xuLy9cdGxldCBiaWNvbjtcbi8vXHRsZXQgaGljb247XG4vL1x0bGV0IGxhcmdlX3NsaWRlc2hvdyA9IGZhbHNlO1xuXG5cdGxldCBzZXR0aW5ncyA9IHtcblx0XHRwcm9wZXJ0eU1hcmtlcnM6IFtdLFxuXHRcdGZpbHRlcklkczogICAgICAgW10sXG5cdFx0bWFwTWFya2VyczogICAgICBbXSxcblx0XHRtYXBUeXBlSWQ6ICAgICAgICcnLFxuXHRcdG1hcFpvb206ICAgICAgICAgMCxcblx0XHRtYXBNYXhab29tOiAgICAgIDIwLFxuXHRcdG1hcFR5cGU6ICAgICAgICAgJycsXG5cdFx0bWFwSWQ6ICAgICAgICAgICAnJyxcblx0XHRtYXJrZXJDb2xvcjogICAgICdyZWQnLFxuXHR9O1xuXG5cdGNsYXNzIEtybWFwIHtcblx0XHRjb25zdHJ1Y3RvcihzZXR0aW5ncykge1xuXHRcdFx0dGhpcy5zZXR0aW5ncyA9IHNldHRpbmdzO1xuXG5cdFx0XHQvL0luaXRpYWxpc2UgbWFwIG9wdGlvbnNcblx0XHRcdHRoaXMuZ21PcHRpb25zID0ge1xuXHRcdFx0XHRzY3JvbGx3aGVlbDogICAgICAgZmFsc2UsXG5cdFx0XHRcdHpvb206ICAgICAgICAgICAgICB0aGlzLnNldHRpbmdzLm1hcFpvb20sXG5cdFx0XHRcdG1heFpvb206ICAgICAgICAgICB0aGlzLnNldHRpbmdzLm1hcE1heFpvb20sXG5cdFx0XHRcdG1hcFR5cGVJZDogICAgICAgICB0aGlzLnNldHRpbmdzLm1hcFR5cGVJZCxcblx0XHRcdFx0c3RyZWV0Vmlld0NvbnRyb2w6IGZhbHNlXG5cdFx0XHR9O1xuXG5cdFx0XHRtYXBab29tID0gdGhpcy5zZXR0aW5ncy5tYXBab29tO1xuXHRcdFx0dGhpcy5nbWFya2VycyA9IFtdO1xuXHRcdFx0dGhpcy5jb3VudCA9IDA7XG5cblx0XHRcdHRoaXMuaW5pdE1hcCgpO1xuXHRcdH1cblxuXHRcdHN0YXRpYyBjbG9zZUtySW5mb3dpbmRvdygpIHtcblx0XHRcdCQoJyNrci1pbmZvd2luZG93JykuaGlkZSgpO1xuLy9cdFx0XHRcIiNrci1pbmZvd2luZG93XCIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblx0XHRcdGluZm9XaW5kb3cuY2xvc2UoKTtcblx0XHRcdGluZm9XaW5kb3cyLmNsb3NlKCk7XG5cdFx0fVxuXG5cdFx0Ly8gb25seSBzaG93IHZpc2libGUgbWFya2Vyc1xuXHRcdHN0YXRpYyBzaG93VmlzaWJsZU1hcmtlcnMobWFya2Vycykge1xuXHRcdFx0bGV0IGJvdW5kcyA9IG1hcC5nZXRCb3VuZHMoKTtcblx0XHRcdGxldCBjb3VudCA9IDA7XG5cblx0XHRcdGZvciAobGV0IGQgPSAwOyBkIDwgbWFya2Vycy5sZW5ndGg7IGQrKykge1xuXHRcdFx0XHRsZXQgbWFya2VyID0gbWFya2Vyc1tkXTtcblxuXHRcdFx0XHRpZiAobWFya2VyLnR5cGUgPT09ICdtYXAnKSB7XG5cdFx0XHRcdFx0aWYgKGJvdW5kcy5jb250YWlucyhtYXJrZXIuZ2V0UG9zaXRpb24oKSkgPT09IHRydWUpIHtcblx0XHRcdFx0XHRcdG1hcmtlci5zZXRWaXNpYmxlKHRydWUpO1xuXHRcdFx0XHRcdFx0Y291bnQrKztcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0bWFya2VyLnNldFZpc2libGUoZmFsc2UpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gY291bnQ7XG5cdFx0fVxuXG5cdFx0Ly8gQ2hlY2sgTWFya2VycyBhcnJheSBmb3IgZHVwbGljYXRlIHBvc2l0aW9uIGFuZCBvZmZzZXQgYSBsaXR0bGVcblx0XHRjaGVja0R1cGxpY2F0ZShjdXJyZW50KSB7XG5cdFx0XHRpZiAodGhpcy5nbWFya2Vycy5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdGxldCBkdXBzID0gMDtcblxuXHRcdFx0XHRmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5nbWFya2Vycy5sZW5ndGg7IGluZGV4KyspIHtcblx0XHRcdFx0XHRsZXQgcG9zID0gdGhpcy5nbWFya2Vyc1tpbmRleF0uZ2V0UG9zaXRpb24oKTtcblx0XHRcdFx0XHRpZiAoY3VycmVudC5lcXVhbHMocG9zKSkge1xuXHRcdFx0XHRcdFx0ZHVwcysrO1xuXHRcdFx0XHRcdFx0bGV0IGEgPSAzNjAuMCAvIGR1cHM7XG5cdFx0XHRcdFx0XHRsZXQgbmV3TGF0ID0gcG9zLmxhdCgpICsgLS4wMDAwMiAqIE1hdGguY29zKCgrYSAqIGR1cHMpIC8gMTgwICogTWF0aC5QSSk7ICAvL3hcblx0XHRcdFx0XHRcdGxldCBuZXdMbmcgPSBwb3MubG5nKCkgKyAtLjAwMDAwICogTWF0aC5zaW4oKCthICogZHVwcykgLyAxODAgKiBNYXRoLlBJKTsgIC8vWVxuXHRcdFx0XHRcdFx0Y3VycmVudCA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmcobmV3TGF0LCBuZXdMbmcpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gY3VycmVudDtcblx0XHR9XG5cblx0XHRjaGVja1pvb20oKSB7XG5cdFx0XHRpZiAobWFwWm9vbSA+IDApIHtcblx0XHRcdFx0bGV0IG15bGlzdGVuZXIgPSBtYXAuYWRkTGlzdGVuZXIoJ2lkbGUnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0Y29uc3QgY3VycmVudFpvb20gPSBtYXAuZ2V0Wm9vbSgpO1xuXHRcdFx0XHRcdGlmIChtYXBab29tID4gMCAmJiBjdXJyZW50Wm9vbSAhPT0gbWFwWm9vbSkge1xuXHRcdFx0XHRcdFx0bWFwLnNldFpvb20obWFwWm9vbSk7XG5cdFx0XHRcdFx0XHRteWxpc3RlbmVyLnJlbW92ZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Y2x1c3Rlck1hcCgpIHtcblx0XHRcdGNvbnN0IG1jT3B0aW9ucyA9IHtcblx0XHRcdFx0Z3JpZFNpemU6ICAgICAgICAgICAgMjAsXG5cdFx0XHRcdG1heFpvb206ICAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MubWFwTWF4Wm9vbSAtIDEsXG5cdFx0XHRcdGltYWdlUGF0aDogICAgICAgICAgICcvbWVkaWEvY29tX2tub3dyZXMvaW1hZ2VzL21hcmtlcmNsdXN0ZXJlci9tJyxcblx0XHRcdFx0aWdub3JlSGlkZGVuTWFya2VyczogdHJ1ZVxuXHRcdFx0fTtcblxuXHRcdFx0dGhpcy5zZXRQcm9wZXJ0eU1hcmtlcnMoKTtcblx0XHRcdHRoaXMuc2V0TWFwTWFya2VycygpO1xuXG5cdFx0XHRmb3IgKGxldCBkID0gMDsgZCA8IHRoaXMuZ21hcmtlcnMubGVuZ3RoOyBkKyspIHtcblx0XHRcdFx0bGV0IG1hcmtlciA9IHRoaXMuZ21hcmtlcnNbZF07XG5cdFx0XHRcdGlmIChtYXJrZXIudHlwZSA9PT0gJ3Byb3BlcnR5Jykge1xuXHRcdFx0XHRcdGlmICh0aGlzLnNldHRpbmdzLmZpbHRlcklkcy5pbmNsdWRlcyhtYXJrZXIucGlkKSkge1xuXHRcdFx0XHRcdFx0bWFya2VyLnNldFZpc2libGUodHJ1ZSk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdG1hcmtlci5zZXRWaXNpYmxlKGZhbHNlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0bWMgPSBuZXcgTWFya2VyQ2x1c3RlcmVyKG1hcCwgdGhpcy5nbWFya2VycywgbWNPcHRpb25zKTtcblx0XHRcdGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKG1jLCBcImNsdXN0ZXJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdCQoJyNrci1pbmZvd2luZG93JykuaGlkZSgpO1xuXHRcdFx0XHRpbmZvV2luZG93LmNsb3NlKCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0bWFwLmZpdEJvdW5kcyhib3VuZHMpO1xuXG5cdFx0XHR0aGlzLmNoZWNrWm9vbSgpO1xuXHRcdH1cblxuXHRcdC8vIENyZWF0ZSB0aGUgTWFwXG5cdFx0Y3JlYXRlTWFwKCkge1xuXHRcdFx0bWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnNldHRpbmdzLm1hcElkKSwgdGhpcy5nbU9wdGlvbnMpO1xuXHRcdFx0aW5mb1dpbmRvdyA9IG5ldyBnb29nbGUubWFwcy5JbmZvV2luZG93KCk7XG5cdFx0XHRpbmZvV2luZG93MiA9IG5ldyBnb29nbGUubWFwcy5JbmZvV2luZG93KCk7XG5cdFx0XHRib3VuZHMgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nQm91bmRzKCk7XG5cdFx0fVxuXG5cdFx0Ly8gQ3JlYXRlIHRoZSBtYXJrZXIgYW5kIHNldCB1cCB0aGUgZXZlbnQgd2luZG93XG5cdFx0Y3JlYXRlTWFwTWFya2VyKHBvaW50LCBodG1sLCBpbWFnZSwgYm94aW5mbywgbGluaywgdGl0bGUpIHtcblx0XHRcdGxldCBtYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcblx0XHRcdFx0c2hhcGU6ICAgIG1hcmtlcnNoYXBlLFxuXHRcdFx0XHRsaW5rOiAgICAgbGluayxcblx0XHRcdFx0aWNvbjogICAgIGltYWdlLFxuXHRcdFx0XHRwb3NpdGlvbjogcG9pbnQsXG5cdFx0XHRcdHRpdGxlOiAgICB0aXRsZSxcblx0XHRcdFx0bWFwOiAgICAgIG1hcCxcblx0XHRcdFx0ekluZGV4OiAgIDk5OVxuXHRcdFx0fSk7XG5cblx0XHRcdGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKG1hcmtlciwgJ21vdXNlb3ZlcicsIChmdW5jdGlvbiAoaHRtbCkge1xuXHRcdFx0XHRyZXR1cm4gZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdGluZm9XaW5kb3cyLnNldENvbnRlbnQoaHRtbCk7XG5cdFx0XHRcdFx0aW5mb1dpbmRvdzIub3BlbihtYXAsIG1hcmtlcik7XG5cdFx0XHRcdH1cblx0XHRcdH0pKGh0bWwpKTtcblxuXHRcdFx0Z29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIobWFya2VyLCAnbW91c2VvdXQnLCAoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRyZXR1cm4gZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdGluZm9XaW5kb3cyLmNsb3NlKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pKCkpO1xuXG5cdFx0XHRnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYXJrZXIsICdjbG9zZWNsaWNrJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRpbmZvV2luZG93Mi5jbG9zZSgpO1xuXHRcdFx0fSk7XG5cblx0XHRcdHRoaXMuZ21hcmtlcnMucHVzaChtYXJrZXIpO1xuXG5cdFx0XHR0aGlzLmNvdW50Kys7XG5cdFx0fVxuXG5cdFx0Y3JlYXRlUHJvcGVydHlNYXJrZXIocG9pbnQsIGh0bWwsIGJveGluZm8sIGxpbmssIHRpdGxlLCBjb2xvciwgaWQsIGltYWdlLCBwaWQpIHtcblx0XHRcdGxldCBtYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcblx0XHRcdFx0cG9zaXRpb246IHBvaW50LFxuXHRcdFx0XHRsaW5rOiAgICAgbGluayxcblx0XHRcdFx0bWFwOiAgICAgIG1hcCxcblx0XHRcdFx0aWNvbjogICAgIGltYWdlLFxuXHRcdFx0XHR0aXRsZTogICAgdGl0bGUsXG5cdFx0XHRcdHBpZDogICAgICBwaWQsXG5cdFx0XHRcdHR5cGU6ICAgICAncHJvcGVydHknLFxuXHRcdFx0XHR6SW5kZXg6ICAgdGhpcy5jb3VudCArIDEwMDBcblx0XHRcdH0pO1xuXG5cdFx0XHRwcm9wZXJ0eWRpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcblx0XHRcdC8vIGlmIChwcm9wZXJ0eWRpdiAhPT0gbnVsbCkge1xuXHRcdFx0Ly8gXHRnb29nbGUubWFwcy5ldmVudC5hZGREb21MaXN0ZW5lcihwcm9wZXJ0eWRpdiwgJ21vdXNlb3ZlcicsIGZ1bmN0aW9uICgpIHtcblx0XHRcdC8vIFx0XHRtYXJrZXIuc2V0SWNvbihcblx0XHRcdC8vIFx0XHRcdGhpY29uXG5cdFx0XHQvLyBcdFx0KVxuXHRcdFx0Ly8gXHRcdG1hcmtlci5zZXRaSW5kZXgobWFya2VyLmdldFpJbmRleCgpICsgMTAwMCk7XG5cdFx0XHQvLyBcdH0pO1xuXHRcdFx0Ly8gXHRnb29nbGUubWFwcy5ldmVudC5hZGREb21MaXN0ZW5lcihwcm9wZXJ0eWRpdiwgJ21vdXNlb3V0JywgZnVuY3Rpb24gKCkge1xuXHRcdFx0Ly8gXHRcdG1hcmtlci5zZXRJY29uKFxuXHRcdFx0Ly8gXHRcdFx0Ymljb25cblx0XHRcdC8vIFx0XHQpXG5cdFx0XHQvLyBcdFx0bWFya2VyLnNldFpJbmRleChtYXJrZXIuZ2V0WkluZGV4KCkgLSAxMDAwKTtcblx0XHRcdC8vIFx0fSk7XG5cdFx0XHQvLyB9XG5cblx0XHRcdC8vIG1hcmtlci5hZGRMaXN0ZW5lcignbW91c2VvdmVyJywgKGZ1bmN0aW9uICgpIHtcblx0XHRcdC8vIFx0bWFya2VyLnNldEljb24oXG5cdFx0XHQvLyBcdFx0aGljb25cblx0XHRcdC8vIFx0KVxuXHRcdFx0Ly8gXHRtYXJrZXIuc2V0WkluZGV4KG1hcmtlci5nZXRaSW5kZXgoKSArIDEwMDApO1xuXHRcdFx0Ly8gfSkpO1xuXHRcdFx0Ly9cblx0XHRcdC8vIG1hcmtlci5hZGRMaXN0ZW5lcignbW91c2VvdXQnLCAoZnVuY3Rpb24gKCkge1xuXHRcdFx0Ly8gXHRtYXJrZXIuc2V0SWNvbihcblx0XHRcdC8vIFx0XHRiaWNvblxuXHRcdFx0Ly8gXHQpXG5cdFx0XHQvLyBcdG1hcmtlci5zZXRaSW5kZXgobWFya2VyLmdldFpJbmRleCgpIC0gMTAwMCk7XG5cdFx0XHQvLyB9KSk7XG5cblx0XHRcdC8vIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKG1hcmtlciwgJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cdFx0XHQvLyBcdG1hcmtlci5zZXRWaXNpYmxlKGZhbHNlKTsgLy8gbWFwcyBBUEkgaGlkZSBjYWxsXG5cdFx0XHQvLyB9KTtcblxuXHRcdFx0bWFya2VyLmFkZExpc3RlbmVyKCdtb3VzZWRvd24nLCAoZnVuY3Rpb24gKGJveGluZm8pIHtcblx0XHRcdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRpbmZvV2luZG93LmNsb3NlKCk7XG5cdFx0XHRcdFx0JCgnI2tyLWluZm93aW5kb3cnKS5oaWRlKCk7XG5cdFx0XHRcdFx0aW5mb1dpbmRvdy5zZXRDb250ZW50KGh0bWwpO1xuXHRcdFx0XHRcdGluZm9XaW5kb3cub3BlbihtYXAsIG1hcmtlcik7XG5cblx0XHRcdFx0XHQkLmFqYXgoe1xuXHRcdFx0XHRcdFx0dHlwZTogICAgXCJQT1NUXCIsXG5cdFx0XHRcdFx0XHR1cmw6ICAgICBsaXZlc2l0ZSArICdpbmRleC5waHA/b3B0aW9uPWNvbV9rbm93cmVzJnRhc2s9cHJvcGVydHkubWFwaW5mb3dpbmRvdyZsYW5nPScgKyBsYW5nLFxuXHRcdFx0XHRcdFx0ZGF0YTogICAge1xuXHRcdFx0XHRcdFx0XHRpZDogcGFyc2VJbnQoYm94aW5mbylcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuXHRcdFx0XHRcdFx0XHQkKCcja3ItaW5mb3dpbmRvdycpLmZhZGVJbig0MDApLmh0bWwoZGF0YSkuc2hvdygpO1xuXHRcdFx0XHRcdFx0XHQkKFwiLmtyLWluZm93aW5kb3ctc2xpZGVzaG93XCIpLm5vdCgnLnNsaWNrLWluaXRpYWxpemVkJykuc2xpY2soe1xuXHRcdFx0XHRcdFx0XHRcdG5leHRBcnJvdzogJzxpIGNsYXNzPVwic2xpY2stbmF2IG5leHQgZmFzIGZhLWNoZXZyb24tcmlnaHQgXCI+PC9pPicsXG5cdFx0XHRcdFx0XHRcdFx0cHJldkFycm93OiAnPGkgY2xhc3M9XCJzbGljay1uYXYgcHJldiBmYXMgZmEtY2hldnJvbi1sZWZ0IFwiPjwvaT4nLFxuXHRcdFx0XHRcdFx0XHRcdGF1dG9wbGF5OiAgdHJ1ZVxuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fTtcblx0XHRcdH0pKGJveGluZm8pKTtcblxuXHRcdFx0Z29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIobWFya2VyLCAnY2xvc2VjbGljaycsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0JCgnI2tyLWluZm93aW5kb3cnKS5oaWRlKCk7XG5cdFx0XHRcdGluZm9XaW5kb3cuY2xvc2UoKTtcblx0XHRcdH0pO1xuXG5cdFx0XHR0aGlzLmdtYXJrZXJzLnB1c2gobWFya2VyKTtcblx0XHRcdGJvdW5kcy5leHRlbmQocG9pbnQpO1xuXG5cdFx0XHR0aGlzLmNvdW50Kys7XG5cdFx0fVxuXG5cdFx0Ly9Jbml0aWFsaXNlIG1hcFxuXHRcdGluaXRNYXAoKSB7XG5cdFx0XHR0aGlzLmNyZWF0ZU1hcCgpO1xuLy9cdFx0XHR0aGlzLnNldE1hcmtlckljb25zKCk7XG5cblx0XHRcdGlmICh0aGlzLnNldHRpbmdzLm1hcFR5cGUgPT09ICdjbHVzdGVyJykge1xuXHRcdFx0XHR0aGlzLmNsdXN0ZXJNYXAoKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuc29sb01hcCgpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIFJlc2V0IG1hcCB0byBpbml0aWFsIHN0YXRlXG5cdFx0cmVmcmVzaE1hcCgkbWFwbW9kYWwpIHtcblx0XHRcdGlmICh0aGlzLnNldHRpbmdzLm1hcFR5cGUgPT09ICdzb2xvJylcblx0XHRcdFx0cmV0dXJuO1xuXG5cdFx0XHRsZXQgc2VsZiA9IHRoaXM7XG5cdFx0XHRqUXVlcnkuYWpheCh7XG5cdFx0XHRcdHVybDogICAgICBsaXZlc2l0ZSArICdpbmRleC5waHA/b3B0aW9uPWNvbV9rbm93cmVzJnRhc2s9cHJvcGVydGllcy5yZWZyZXNobWFwJmxhbmc9JyArIGxhbmcsXG5cdFx0XHRcdHR5cGU6ICAgICBcIlBPU1RcIixcblx0XHRcdFx0ZGF0YVR5cGU6IFwianNvblwiLFxuXHRcdFx0XHRzdWNjZXNzOiAgZnVuY3Rpb24gKHJlc3VsdCkge1xuXHRcdFx0XHRcdGlmIChyZXN1bHQuc3VjY2Vzcykge1xuXHRcdFx0XHRcdFx0c2VsZi5zZXR0aW5ncy5maWx0ZXJJZHMgPSByZXN1bHQuZGF0YS5maWx0ZXJJZHM7XG5cdFx0XHRcdFx0XHRmb3IgKGxldCBkID0gMDsgZCA8IHNlbGYuZ21hcmtlcnMubGVuZ3RoOyBkKyspIHtcblx0XHRcdFx0XHRcdFx0bGV0IG1hcmtlciA9IHNlbGYuZ21hcmtlcnNbZF07XG5cdFx0XHRcdFx0XHRcdGlmIChtYXJrZXIudHlwZSA9PT0gJ3Byb3BlcnR5Jykge1xuXHRcdFx0XHRcdFx0XHRcdGlmIChzZWxmLnNldHRpbmdzLmZpbHRlcklkcy5pbmNsdWRlcyhtYXJrZXIucGlkKSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0bWFya2VyLnNldFZpc2libGUodHJ1ZSk7XG5cdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdG1hcmtlci5zZXRWaXNpYmxlKGZhbHNlKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0bWMucmVwYWludCgpO1xuXHRcdFx0XHRcdFx0bmV3IEZvdW5kYXRpb24uUmV2ZWFsKCRtYXBtb2RhbCk7XG5cdFx0XHRcdFx0XHQkbWFwbW9kYWwuZm91bmRhdGlvbignb3BlbicpO1xuXHRcdFx0XHRcdFx0Z29vZ2xlLm1hcHMuZXZlbnQudHJpZ2dlcihtYXAsICdyZXNpemUnKTtcblx0XHRcdFx0XHRcdCRtYXBtb2RhbC5mb3VuZGF0aW9uKCdvcGVuJyk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGFsZXJ0KHJlc3VsdC5tZXNzYWdlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdC8vIFJlc2V0IG1hcCB0byBpbml0aWFsIHN0YXRlXG5cdFx0cmVzZXRNYXAoKSB7XG5cdFx0XHRpbmZvV2luZG93LmNsb3NlKCk7XG5cdFx0XHRpbmZvV2luZG93Mi5jbG9zZSgpO1xuXHRcdFx0JCgnI2tyLWluZm93aW5kb3cnKS5oaWRlKCk7XG5cdFx0XHRtYXAuZml0Qm91bmRzKGJvdW5kcyk7XG5cblx0XHRcdHRoaXMuY2hlY2tab29tKCk7XG5cdFx0fVxuXG5cdFx0Ly8gbG9vcCB0byBzZXQgbWFwIG1hcmtlcnNcblx0XHRzZXRNYXBNYXJrZXJzKCkge1xuXHRcdFx0bGV0IHBvaW50O1xuXHRcdFx0bGV0IGFtYXJrO1xuXG5cdFx0XHRmb3IgKGxldCBkID0gMDsgZCA8IHRoaXMuc2V0dGluZ3MubWFwTWFya2Vycy5sZW5ndGg7IGQrKykge1xuXHRcdFx0XHRhbWFyayA9IHRoaXMuc2V0dGluZ3MubWFwTWFya2Vyc1tkXTtcblxuXHRcdFx0XHRsZXQgbWFya2VyaWNvbiA9IHtcblx0XHRcdFx0XHR1cmw6ICBhbWFya1snaWNvbiddLFxuXHRcdFx0XHRcdHNpemU6IG5ldyBnb29nbGUubWFwcy5TaXplKDMyLCAzNyksXG5cdFx0XHRcdFx0Ly8gT1Igc2NhbGVkU2l6ZTogbmV3IGdvb2dsZS5tYXBzLlNpemUoNDAsIDQ3KVxuXHRcdFx0XHRcdG9yaWdpbjogbmV3IGdvb2dsZS5tYXBzLlBvaW50KDAsIDApLFxuXHRcdFx0XHRcdGFuY2hvcjogbmV3IGdvb2dsZS5tYXBzLlBvaW50KDAsIDE4KVxuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdHBvaW50ID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhhbWFya1snbGF0J10sIGFtYXJrWydsbmcnXSk7XG5cdFx0XHRcdHBvaW50ID0gdGhpcy5jaGVja0R1cGxpY2F0ZShwb2ludCk7XG5cdFx0XHRcdHRoaXMuY3JlYXRlTWFwTWFya2VyKHBvaW50LCBhbWFya1snaHRtbCddLCBtYXJrZXJpY29uLCAnJywgJycsIGFtYXJrWyd0aXRsZSddKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBzZXRNYXJrZXJJY29ucygpIHtcblx0XHQvLyBcdGJpY29uID0ge1xuXHRcdC8vIFx0XHRwYXRoOiAgICAgICAgICcvbWVkaWEvY29tX2tub3dyZXMvYXNzZXRzL2ltYWdlcy9zdmcnLFxuXHRcdC8vIFx0XHRmaWxsQ29sb3I6ICAgIHRoaXMuc2V0dGluZ3MubWFya2VyQ29sb3IsXG5cdFx0Ly8gXHRcdGZpbGxPcGFjaXR5OiAgMC45LFxuXHRcdC8vIFx0XHRhbmNob3I6ICAgICAgIG5ldyBnb29nbGUubWFwcy5Qb2ludCg5LCAzNSksXG5cdFx0Ly8gXHRcdHN0cm9rZUNvbG9yOiAgXCIjZWZlZmVmXCIsXG5cdFx0Ly8gXHRcdHN0cm9rZVdlaWdodDogMC41LFxuXHRcdC8vIFx0XHRzY2FsZTogICAgICAgIDFcblx0XHQvLyBcdH07XG5cdFx0Ly8gXHRoaWNvbiA9IHtcblx0XHQvLyBcdFx0cGF0aDogICAgICAgICAnL21lZGlhL2NvbV9rbm93cmVzL2Fzc2V0cy9pbWFnZXMvc3ZnJyxcblx0XHQvLyBcdFx0ZmlsbENvbG9yOiAgICBcImdyZWVuXCIsXG5cdFx0Ly8gXHRcdGZpbGxPcGFjaXR5OiAgMSxcblx0XHQvLyBcdFx0YW5jaG9yOiAgICAgICBuZXcgZ29vZ2xlLm1hcHMuUG9pbnQoOSwgMzUpLFxuXHRcdC8vIFx0XHRzdHJva2VDb2xvcjogIFwiI2VmZWZlZlwiLFxuXHRcdC8vIFx0XHRzdHJva2VXZWlnaHQ6IDAuOCxcblx0XHQvLyBcdFx0c2NhbGU6ICAgICAgICAxLjVcblx0XHQvLyBcdH07XG5cdFx0Ly8gfVxuXG5cdFx0Ly8gbG9vcCB0byBzZXQgcHJvcGVydHkgbWFya2Vyc1xuXHRcdHNldFByb3BlcnR5TWFya2VycygpIHtcblx0XHRcdGxldCBwb2ludDtcblx0XHRcdGxldCBhbWFyaztcblxuXHRcdFx0Zm9yIChsZXQgZCA9IDA7IGQgPCB0aGlzLnNldHRpbmdzLnByb3BlcnR5TWFya2Vycy5sZW5ndGg7IGQrKykge1xuXHRcdFx0XHRhbWFyayA9IHRoaXMuc2V0dGluZ3MucHJvcGVydHlNYXJrZXJzW2RdO1xuXG5cdFx0XHRcdGlmICghZCkge1xuXHRcdFx0XHRcdHByb3BlcnR5aWNvbiA9IHtcblx0XHRcdFx0XHRcdHVybDogICAgYW1hcmtbJ2ljb24nXSxcblx0XHRcdFx0XHRcdHNpemU6ICAgbmV3IGdvb2dsZS5tYXBzLlNpemUoMzIsIDM3KSxcblx0XHRcdFx0XHRcdG9yaWdpbjogbmV3IGdvb2dsZS5tYXBzLlBvaW50KDAsIDApLFxuXHRcdFx0XHRcdFx0YW5jaG9yOiBuZXcgZ29vZ2xlLm1hcHMuUG9pbnQoMCwgMjApXG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHBvaW50ID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhhbWFya1snbGF0J10sIGFtYXJrWydsbmcnXSk7XG5cdFx0XHRcdHBvaW50ID0gdGhpcy5jaGVja0R1cGxpY2F0ZShwb2ludCk7XG5cdFx0XHRcdHRoaXMuY3JlYXRlUHJvcGVydHlNYXJrZXIocG9pbnQsIGFtYXJrWydodG1sJ10sIGFtYXJrWydib3hpbmZvJ10sIGFtYXJrWydsaW5rJ10sIGFtYXJrWyd0aXRsZSddLCBhbWFya1snY29sb3InXSwgYW1hcmtbJ2lkJ10sIHByb3BlcnR5aWNvbiwgYW1hcmtbJ3BpZCddKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRzb2xvTWFwKCkge1xuXHRcdFx0dGhpcy5zZXRQcm9wZXJ0eU1hcmtlcnMoKTtcblx0XHRcdHRoaXMuc2V0TWFwTWFya2VycygpO1xuXG5cdFx0XHRtYXAuZml0Qm91bmRzKGJvdW5kcyk7XG5cdFx0XHR0aGlzLmNoZWNrWm9vbSgpO1xuXG5cdFx0XHRpZiAodGhpcy5zZXR0aW5ncy5tYXBNYXJrZXJzLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0Y29uc3Qgc2VsZiA9IHRoaXM7XG5cblx0XHRcdFx0bGV0IG15TGlzdGVuZXIgPSBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYXAsICdpZGxlJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdGxldCBmb3VuZCA9IDA7XG5cdFx0XHRcdFx0bGV0IGN1cnJlbnRab29tID0gbWFwLmdldFpvb20oKTtcblxuXHRcdFx0XHRcdHdoaWxlICghZm91bmQpIHtcblx0XHRcdFx0XHRcdGZvdW5kID0gS3JtYXAuc2hvd1Zpc2libGVNYXJrZXJzKHNlbGYuZ21hcmtlcnMpO1xuXG5cdFx0XHRcdFx0XHRpZiAoZm91bmQpIHtcblx0XHRcdFx0XHRcdFx0bXlMaXN0ZW5lci5yZW1vdmUoKTtcblx0XHRcdFx0XHRcdFx0bWFwLnNldFpvb20oY3VycmVudFpvb20pO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0Y3VycmVudFpvb20gPSBjdXJyZW50Wm9vbSAtIDE7XG5cdFx0XHRcdFx0XHRpZiAoY3VycmVudFpvb20gPCAxMCkge1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdCQoZnVuY3Rpb24gKCkge1xuXHRcdGxldCAkbWFwbW9kYWw7XG5cblx0XHQkKCdib2R5Jykub24oJ2NsaWNrJywgJy5tYXAtdHJpZ2dlcicsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRpZiAobWFwRGF0YSkge1xuXHRcdFx0XHRteUtybWFwLnJlZnJlc2hNYXAoJG1hcG1vZGFsKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGtpY2tNYXAoJCh0aGlzKSk7XG5cdFx0XHRcdCRtYXBtb2RhbCA9ICQoJyNrci1zZWFyY2gtbWFwLW1vZGFsJyk7XG5cdFx0XHRcdG5ldyBGb3VuZGF0aW9uLlJldmVhbCgkbWFwbW9kYWwpO1xuXHRcdFx0XHQkbWFwbW9kYWwuZm91bmRhdGlvbignb3BlbicpO1xuXHRcdFx0fVxuXHRcdH0pLm9uKCdjbGljaycsICcucmVzZXRtYXAnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0bXlLcm1hcC5yZXNldE1hcCgpO1xuXHRcdH0pLm9uKCdjbGljaycsICcja3Itc2VhcmNoLW1hcC1mdWxsLWluZm93aW5kb3ctY2xvc2UnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0S3JtYXAuY2xvc2VLckluZm93aW5kb3coKTtcblx0XHR9KS5vbignY2xpY2snLCAnLmNsb3NlbWFwJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdCRtYXBtb2RhbC5mb3VuZGF0aW9uKCdjbG9zZScpO1xuXHRcdFx0JC5hamF4KHtcblx0XHRcdFx0dHlwZTogICAgXCJQT1NUXCIsXG5cdFx0XHRcdHVybDogICAgIGxpdmVzaXRlICsgJ2luZGV4LnBocD9vcHRpb249Y29tX2tub3dyZXMmdGFzaz1wcm9wZXJ0aWVzLm1hcHNlc3Npb24mbGFuZz0nICsgbGFuZyxcblx0XHRcdFx0c3VjY2VzczogZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9KS5vbignb3Blbi56Zi5yZXZlYWwnLCAnI2tyLXNlYXJjaC1tYXAtbW9kYWwnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0JCgnI2tyLXNlYXJjaC1tYXAtZnVsbCcpLmhlaWdodCgkKCcja3Itc2VhcmNoLW1hcC1tb2RhbCcpLmhlaWdodCgpKTtcblx0XHRcdGdvb2dsZS5tYXBzLmV2ZW50LnRyaWdnZXIobWFwLCBcInJlc2l6ZVwiKTtcblx0XHRcdCQuYWpheCh7XG5cdFx0XHRcdHR5cGU6ICAgIFwiUE9TVFwiLFxuXHRcdFx0XHR1cmw6ICAgICBsaXZlc2l0ZSArICdpbmRleC5waHA/b3B0aW9uPWNvbV9rbm93cmVzJnRhc2s9cHJvcGVydGllcy5tYXBzZXNzaW9uJmxhbmc9JyArIGxhbmcsXG5cdFx0XHRcdGRhdGE6ICAgIHttYXBfbW9kYWw6ICcxJ30sXG5cdFx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0XHQvLyBEb2Vzbid0IHRyaWdnZXIgaWYgaW5jbHVkZWQgYWJvdmUgPz9cblx0XHRpZiAoIW1hcERhdGEpIHtcblx0XHRcdGNvbnN0ICRzb2xvVHJpZ2dlciA9ICQoJyNrci1tYXAtc29sby10cmlnZ2VyJyk7XG5cdFx0XHQkc29sb1RyaWdnZXIub25lKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0a2lja01hcCgkc29sb1RyaWdnZXIpO1xuXHRcdFx0fSk7XG5cblx0XHRcdGlmICh3aW5kb3cubG9jYXRpb24uaHJlZi5pbmRleE9mKCcjbWFwJykgIT09IC0xICYmICRzb2xvVHJpZ2dlci5sZW5ndGgpIHtcblx0XHRcdFx0a2lja01hcCgkc29sb1RyaWdnZXIpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIFRlc3QgZm9yIGZvcmNlIG1hcFxuXHRcdGNvbnN0ICR0cmlnZ2VyID0gJCgnLm1hcC10cmlnZ2VyJyk7XG5cdFx0aWYgKCR0cmlnZ2VyLmRhdGEoJ2ZvcmNlbWFwJykpIHtcblx0XHRcdCR0cmlnZ2VyLnRyaWdnZXIoJ2NsaWNrJyk7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24ga2lja01hcCgkZWxlbSkge1xuXHRcdFx0Y29uc3QgdHlwZSA9ICRlbGVtLmRhdGEoJ3R5cGUnKTtcblx0XHRcdGxldCBwaWQgPSAwO1xuXHRcdFx0aWYgKHR5cGUgPT09ICdzb2xvJykge1xuXHRcdFx0XHRwaWQgPSAkZWxlbS5kYXRhKCdwaWQnKTtcblx0XHRcdH1cblxuXHRcdFx0alF1ZXJ5LmFqYXgoe1xuXHRcdFx0XHR1cmw6ICAgICAgbGl2ZXNpdGUgKyAnaW5kZXgucGhwP29wdGlvbj1jb21fa25vd3JlcyZ0YXNrPXByb3BlcnRpZXMubWFwZGF0YSZwaWQ9JyArIHBpZCArICcmbGFuZz0nICsgbGFuZyxcblx0XHRcdFx0dHlwZTogICAgIFwiUE9TVFwiLFxuXHRcdFx0XHRkYXRhVHlwZTogXCJqc29uXCIsXG5cdFx0XHRcdHN1Y2Nlc3M6ICBmdW5jdGlvbiAocmVzdWx0KSB7XG5cdFx0XHRcdFx0aWYgKHJlc3VsdC5zdWNjZXNzKSB7XG5cdFx0XHRcdFx0XHRzZXR0aW5ncyA9IHtcblx0XHRcdFx0XHRcdFx0bWFwSWQ6ICAgICAgICAgICAkZWxlbS5kYXRhKCd0YXJnZXQnKSxcblx0XHRcdFx0XHRcdFx0bWFwVHlwZTogICAgICAgICAkZWxlbS5kYXRhKCd0eXBlJyksXG5cdFx0XHRcdFx0XHRcdG1hcFR5cGVJZDogICAgICAgJGVsZW0uZGF0YSgnbWFwdHlwZWlkJyksXG5cdFx0XHRcdFx0XHRcdG1hcFpvb206ICAgICAgICAgcGFyc2VJbnQoJGVsZW0uZGF0YSgnem9vbScpKSxcblx0XHRcdFx0XHRcdFx0bWFwTWF4Wm9vbTogICAgICBwYXJzZUludCgkZWxlbS5kYXRhKCd6b29tbWF4JykpLFxuXHRcdFx0XHRcdFx0XHRwcm9wZXJ0eU1hcmtlcnM6IHJlc3VsdC5kYXRhLnByb3BlcnR5TWFya2Vycyxcblx0XHRcdFx0XHRcdFx0bWFwTWFya2VyczogICAgICByZXN1bHQuZGF0YS5tYXBNYXJrZXJzLFxuXHRcdFx0XHRcdFx0XHRmaWx0ZXJJZHM6ICAgICAgIHJlc3VsdC5kYXRhLmZpbHRlcklkc1xuXHRcdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdFx0bXlLcm1hcCA9IG5ldyBLcm1hcChzZXR0aW5ncyk7XG5cdFx0XHRcdFx0XHRtYXBEYXRhID0gdHJ1ZTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0YWxlcnQocmVzdWx0Lm1lc3NhZ2UpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9KTtcbn0oalF1ZXJ5KSk7IiwiLyoqXG4gKiBAcGFja2FnZSAgICBLbm93IFJlc2VydmF0aW9uc1xuICogQHN1YnBhY2thZ2UgU2l0ZSBKU1xuICogQGNvcHlyaWdodCAgMjAyMCBIaWdobGFuZCBWaXNpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBAbGljZW5zZSAgICBTZWUgdGhlIGZpbGUgXCJMSUNFTlNFLnR4dFwiIGZvciB0aGUgZnVsbCBsaWNlbnNlIGdvdmVybmluZyB0aGlzIGNvZGUuXG4gKiBAYXV0aG9yICAgICBIYXplbCBXaWxzb24gPGhhemVsQGhpZ2hsYW5kdmlzaW9uLmNvbT5cbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgkKSB7XG5cdGxldCBteUtycm91dGU7XG5cdGxldCBkaXJlY3Rpb25zRGlzcGxheTtcblx0bGV0IGRpcmVjdGlvbnNWaXNpYmxlID0gZmFsc2U7XG5cdGxldCByb3V0ZU1hcDtcblx0bGV0IG9yaWdpbjtcblx0bGV0IGRlc3RpbmF0aW9uO1xuXHRsZXQgcm91dGVNYXJrZXJzID0gW107XG5cdGxldCByb3V0ZVN0b3BQb2ludHMgPSBbXTtcblx0bGV0IHBvaW50O1xuXHRsZXQgc2VsZjtcblxuXHRsZXQgc2V0dGluZ3MgPSB7XG5cdFx0bGF0OiAgICAgICAgICAgICAgIFwiXCIsXG5cdFx0bG5nOiAgICAgICAgICAgICAgIFwiXCIsXG5cdFx0bmFtZTogICAgICAgICAgICAgIFwiXCIsXG5cdFx0aWNvbjogICAgICAgICAgICAgIFwiXCIsXG5cdFx0ZGV0b3VyOiAgICAgICAgICAgIFwiXCIsXG5cdFx0bWFwWm9vbTogICAgICAgICAgIDksXG5cdFx0bWFwTWF4Wm9vbTogICAgICAgIDIwLFxuXHRcdG1hcFR5cGVJZDogICAgICAgICBcInJvYWRtYXBcIixcblx0XHRtYXBJZDogICAgICAgICAgICAgXCJrci1tYXAtcm91dGVcIixcblx0XHRkaXJlY3Rpb25zUGFuZWw6ICAgXCJrci1kaXJlY3Rpb25zLXBhbmVsXCIsXG5cdFx0ZGlyZWN0aW9uc1NlcnZpY2U6IG51bGxcblx0fTtcblxuXHRjbGFzcyBLcnJvdXRlIHtcblx0XHRjb25zdHJ1Y3RvcigkZWxlbWVudCwgb3B0aW9ucykge1xuXHRcdFx0dGhpcy5zZXR0aW5ncyA9IHNldHRpbmdzO1xuXHRcdFx0aWYgKG9wdGlvbnMpIHtcblx0XHRcdFx0JC5leHRlbmQodGhpcy5zZXR0aW5ncywgb3B0aW9ucyk7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuc2V0dGluZ3MuZGlyZWN0aW9uc1NlcnZpY2UgPSBuZXcgZ29vZ2xlLm1hcHMuRGlyZWN0aW9uc1NlcnZpY2UoKTtcblx0XHRcdHRoaXMuaW5pdCgpO1xuXHRcdH1cblxuXHRcdHN0YXRpYyBjbGVhclJvdXRlTWFya2VycygpIHtcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcm91dGVNYXJrZXJzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdHJvdXRlTWFya2Vyc1tpXS5zZXRNYXAobnVsbCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0c3RhdGljIGNsZWFyV2F5cG9pbnRzKCkge1xuXHRcdFx0b3JpZ2luID0gbnVsbDtcblx0XHRcdHJvdXRlTWFya2VycyA9IFtdO1xuXHRcdFx0cm91dGVTdG9wUG9pbnRzID0gW107XG5cdFx0XHRkaXJlY3Rpb25zVmlzaWJsZSA9IGZhbHNlO1xuXHRcdH1cblxuXHRcdGFkZFJvdXRlTWFya2VyKGxhdGxuZykge1xuXHRcdFx0cm91dGVNYXJrZXJzLnB1c2gobmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XG5cdFx0XHRcdHBvc2l0aW9uOiBsYXRsbmcsXG5cdFx0XHRcdG1hcDogICAgICByb3V0ZU1hcCxcblx0XHRcdFx0aWNvbjogICAgIHRoaXMuc2V0dGluZ3MuZGV0b3VyXG5cdFx0XHR9KSk7XG5cdFx0fVxuXG5cdFx0Ly9cblx0XHQvLyBhZGRQcm9wZXJ0eU1hcmtlcihwb2ludCwgaHRtbCwgaW1hZ2UsIGJveGluZm8pIHtcblx0XHQvLyBcdGxldCBtYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcblx0XHQvLyBcdFx0cG9zaXRpb246IHBvaW50LFxuXHRcdC8vIFx0XHRodG1sOiAgICAgaHRtbCxcblx0XHQvLyBcdFx0bWFwOiAgICAgIHJvdXRlTWFwLFxuXHRcdC8vIFx0XHRpY29uOiAgICAgaW1hZ2UsXG5cdFx0Ly8gXHRcdHpJbmRleDogICAxXG5cdFx0Ly8gXHR9KTtcblx0XHQvL1xuXHRcdC8vIFx0bGV0IGluZm93aW5kb3cgPSBuZXcgZ29vZ2xlLm1hcHMuSW5mb1dpbmRvdyh7XG5cdFx0Ly8gXHRcdGNvbnRlbnQ6IGJveGluZm9cblx0XHQvLyBcdH0pO1xuXHRcdC8vXG5cdFx0Ly8gXHRnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYXJrZXIsICdjbGljaycsIGZ1bmN0aW9uICgpIHtcblx0XHQvLyBcdFx0Ly8gQ2hlY2sgdG8gc2VlIGlmIHRoZXJlIGlzIGFuIGluZm8gd2luZG93IHN0b3JlZCBpbiByb3V0ZUN1cnJJbmZvV2luZG93LFxuXHRcdC8vIFx0XHQvLyBpZiB0aGVyZSBpcywgd2UgdXNlIC5jbG9zZSgpIHRvIGhpZGUgdGhlIHdpbmRvd1xuXHRcdC8vIFx0XHRpZiAocm91dGVDdXJySW5mb1dpbmRvdykge1xuXHRcdC8vIFx0XHRcdHJvdXRlQ3VyckluZm9XaW5kb3cuY2xvc2UoKTtcblx0XHQvLyBcdFx0fVxuXHRcdC8vIFx0XHQvLyBQdXQgb3VyIG5ldyBpbmZvIHdpbmRvdyBpbiB0byB0aGUgcm91dGVDdXJySW5mb1dpbmRvdyB2YXJpYWJsZVxuXHRcdC8vIFx0XHRyb3V0ZUN1cnJJbmZvV2luZG93ID0gaW5mb3dpbmRvdztcblx0XHQvLyBcdFx0Ly8gT3BlbiB0aGUgd2luZG93XG5cdFx0Ly8gXHRcdGluZm93aW5kb3cub3Blbihyb3V0ZU1hcCwgbWFya2VyKTtcblx0XHQvLyBcdH0pO1xuXHRcdC8vXG5cdFx0Ly8gXHQvL2dtYXJrZXJzLnB1c2goIG1hcmtlciApO1xuXHRcdC8vIFx0cm91dGVNYXJrZXJzLnB1c2gobWFya2VyKTtcblx0XHQvLyB9XG5cblx0XHQvLyBzdGF0aWMgdXBkYXRlTW9kZSgpIHtcblx0XHQvLyBcdGlmIChkaXJlY3Rpb25zVmlzaWJsZSkge1xuXHRcdC8vIFx0XHR0aGlzLmNhbGNSb3V0ZSgpO1xuXHRcdC8vIFx0fVxuXHRcdC8vIH1cblxuXHRcdGNhbGNSb3V0ZSgpIHtcblx0XHRcdGxldCBmcm9tX2FkZHJlc3MgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZyb21fYWRkcmVzc1wiKS52YWx1ZTtcblx0XHRcdGxldCBvcmlnaW4gPSBcIlwiO1xuXG5cdFx0XHRpZiAoZnJvbV9hZGRyZXNzID09PSBcIkFkZHJlc3NcIikgZnJvbV9hZGRyZXNzID0gXCJcIjtcblx0XHRcdGlmIChmcm9tX2FkZHJlc3MpIG9yaWdpbiA9IGZyb21fYWRkcmVzcyArIFwiLFwiICsgXCJcIjtcblxuXHRcdFx0bGV0IG1vZGU7XG5cdFx0XHRzd2l0Y2ggKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW9kZVwiKS52YWx1ZSkge1xuXHRcdFx0XHRjYXNlIFwiYmljeWNsaW5nXCI6XG5cdFx0XHRcdFx0bW9kZSA9IGdvb2dsZS5tYXBzLkRpcmVjdGlvbnNUcmF2ZWxNb2RlLkJJQ1lDTElORztcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcImRyaXZpbmdcIjpcblx0XHRcdFx0XHRtb2RlID0gZ29vZ2xlLm1hcHMuRGlyZWN0aW9uc1RyYXZlbE1vZGUuRFJJVklORztcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcIndhbGtpbmdcIjpcblx0XHRcdFx0XHRtb2RlID0gZ29vZ2xlLm1hcHMuRGlyZWN0aW9uc1RyYXZlbE1vZGUuV0FMS0lORztcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0aWYgKG9yaWdpbikge1xuXHRcdFx0XHRsZXQgcmVxdWVzdCA9IHtcblx0XHRcdFx0XHRvcmlnaW46ICAgICAgICBvcmlnaW4sXG5cdFx0XHRcdFx0ZGVzdGluYXRpb246ICAgZGVzdGluYXRpb24sXG5cdFx0XHRcdFx0d2F5cG9pbnRzOiAgICAgcm91dGVTdG9wUG9pbnRzLFxuXHRcdFx0XHRcdHRyYXZlbE1vZGU6ICAgIG1vZGUsXG5cdFx0XHRcdFx0YXZvaWRIaWdod2F5czogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hpZ2h3YXlzJykuY2hlY2tlZCxcblx0XHRcdFx0XHRhdm9pZFRvbGxzOiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9sbHMnKS5jaGVja2VkXG5cdFx0XHRcdH07XG5cblx0XHRcdFx0c2VsZiA9IHRoaXM7XG5cdFx0XHRcdHRoaXMuc2V0dGluZ3MuZGlyZWN0aW9uc1NlcnZpY2Uucm91dGUocmVxdWVzdCwgZnVuY3Rpb24gKHJlc3BvbnNlLCBzdGF0dXMpIHtcblx0XHRcdFx0XHRpZiAoc3RhdHVzID09PSBnb29nbGUubWFwcy5EaXJlY3Rpb25zU3RhdHVzLk9LKSB7XG5cdFx0XHRcdFx0XHRkaXJlY3Rpb25zRGlzcGxheS5zZXREaXJlY3Rpb25zKHJlc3BvbnNlKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0YWxlcnQoXCJHb29nbGUgY291bGRuYHQgY2FsY3VsYXRlIGRpcmVjdGlvbnMgZm9yIHRoaXMgcm91dGUgYW5kIHNlbGVjdGVkIG9wdGlvbnNcIik7XG5cdFx0XHRcdFx0XHRzZWxmLnJlc2V0Um91dGUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXG5cdFx0XHRLcnJvdXRlLmNsZWFyUm91dGVNYXJrZXJzKCk7XG5cdFx0XHRkaXJlY3Rpb25zVmlzaWJsZSA9IHRydWU7XG5cdFx0fVxuXG5cdFx0aW5pdCgpIHtcblx0XHRcdGRlc3RpbmF0aW9uID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyh0aGlzLnNldHRpbmdzLmxhdCwgdGhpcy5zZXR0aW5ncy5sbmcpO1xuXG5cdFx0XHQvL0luaXRpYWxpc2UgbWFwIG9wdGlvbnNcblx0XHRcdHRoaXMubXlPcHRpb25zID0ge1xuXHRcdFx0XHRzY3JvbGx3aGVlbDogICAgICAgZmFsc2UsXG5cdFx0XHRcdHpvb206ICAgICAgICAgICAgICB0aGlzLnNldHRpbmdzLm1hcFpvb20sXG5cdFx0XHRcdG1heFpvb206ICAgICAgICAgICB0aGlzLnNldHRpbmdzLm1hcE1heFpvb20sXG5cdFx0XHRcdG1hcFR5cGVJZDogICAgICAgICB0aGlzLnNldHRpbmdzLm1hcFR5cGVJZCxcblx0XHRcdFx0c3RyZWV0Vmlld0NvbnRyb2w6IGZhbHNlLFxuXHRcdFx0XHRjZW50ZXI6ICAgICAgICAgICAgZGVzdGluYXRpb25cblx0XHRcdH07XG5cblx0XHRcdHJvdXRlTWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnNldHRpbmdzLm1hcElkKSwgdGhpcy5teU9wdGlvbnMpO1xuXHRcdFx0ZGlyZWN0aW9uc0Rpc3BsYXkgPSBuZXcgZ29vZ2xlLm1hcHMuRGlyZWN0aW9uc1JlbmRlcmVyKCk7XG5cdFx0XHRkaXJlY3Rpb25zRGlzcGxheS5zZXRNYXAocm91dGVNYXApO1xuXHRcdFx0ZGlyZWN0aW9uc0Rpc3BsYXkuc2V0UGFuZWwoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5zZXR0aW5ncy5kaXJlY3Rpb25zUGFuZWwpKTtcblxuXHRcdFx0Y29uc3QgaW1hZ2UgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VySW1hZ2UodGhpcy5zZXR0aW5ncy5pY29uKTtcblx0XHRcdHBvaW50ID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyh0aGlzLnNldHRpbmdzLmxhdCwgdGhpcy5zZXR0aW5ncy5sbmcpO1xuXG5cdFx0XHRzZWxmID0gdGhpcztcblx0XHRcdGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKHJvdXRlTWFwLCAnY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRcdFx0aWYgKHJvdXRlU3RvcFBvaW50cy5sZW5ndGggPCA5KSB7XG5cdFx0XHRcdFx0cm91dGVTdG9wUG9pbnRzLnB1c2goe2xvY2F0aW9uOiBldmVudC5sYXRMbmcsIHN0b3BvdmVyOiB0cnVlfSk7XG5cdFx0XHRcdFx0cG9pbnQgPSBldmVudC5sYXRMbmc7XG5cdFx0XHRcdFx0c2VsZi5hZGRSb3V0ZU1hcmtlcihwb2ludCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0YWxlcnQoXCJNYXhpbXVtIG51bWJlciBvZiA5IHdheXBvaW50cyByZWFjaGVkXCIpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0c2VsZiA9IHRoaXM7XG5cdFx0XHRnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lck9uY2Uocm91dGVNYXAsICdpZGxlJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRnb29nbGUubWFwcy5ldmVudC50cmlnZ2VyKHJvdXRlTWFwLCAncmVzaXplJyk7XG5cdFx0XHRcdHNlbGYuY2FsY1JvdXRlKCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRyZXNldFJvdXRlKCkge1xuXHRcdFx0S3Jyb3V0ZS5jbGVhclJvdXRlTWFya2VycygpO1xuXHRcdFx0S3Jyb3V0ZS5jbGVhcldheXBvaW50cygpO1xuXHRcdFx0ZGlyZWN0aW9uc0Rpc3BsYXkuc2V0TWFwKG51bGwpO1xuXHRcdFx0ZGlyZWN0aW9uc0Rpc3BsYXkuc2V0UGFuZWwobnVsbCk7XG5cdFx0XHRkaXJlY3Rpb25zRGlzcGxheSA9IG5ldyBnb29nbGUubWFwcy5EaXJlY3Rpb25zUmVuZGVyZXIoKTtcblx0XHRcdGRpcmVjdGlvbnNEaXNwbGF5LnNldE1hcChyb3V0ZU1hcCk7XG5cdFx0XHRkaXJlY3Rpb25zRGlzcGxheS5zZXRQYW5lbChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnNldHRpbmdzLmRpcmVjdGlvblBhbmVsKSk7XG5cblx0XHRcdHRoaXMuaW5pdCgpO1xuXHRcdH1cblx0fVxuXG5cdCQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcblx0XHQkKFwiLmtyLWRpcmVjdGlvbnMtbW9kYWxcIikub24oJ2NsaWNrJywgJyNrci1tYXAtcm91dGUnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0bGV0ICRlbGVtZW50ID0gJCh0aGlzKTtcblx0XHRcdGNvbnN0IG9wdGlvbnMgPSB7XG5cdFx0XHRcdGxhdDogICAgJGVsZW1lbnQuZGF0YSgnbGF0JyksXG5cdFx0XHRcdGxuZzogICAgJGVsZW1lbnQuZGF0YSgnbG5nJyksXG5cdFx0XHRcdG5hbWU6ICAgJGVsZW1lbnQuZGF0YSgnbmFtZScpLFxuXHRcdFx0XHRpY29uOiAgICRlbGVtZW50LmRhdGEoJ2ljb24nKSxcblx0XHRcdFx0ZGV0b3VyOiAkZWxlbWVudC5kYXRhKCdkZXRvdXInKVxuXHRcdFx0fTtcblx0XHRcdG15S3Jyb3V0ZSA9IG5ldyBLcnJvdXRlKCRlbGVtZW50LCBvcHRpb25zKTtcblx0XHR9KS5vbignY2xpY2snLCAnLnJlc2V0cm91dGUnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0bXlLcnJvdXRlLnJlc2V0Um91dGUoKTtcblx0XHR9KS5vbignY2xpY2snLCAnLmNhbGNyb3V0ZScsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRteUtycm91dGUuY2FsY1JvdXRlKCk7XG5cdFx0fSk7XG5cblx0XHRqUXVlcnkoXCJhI2dlb2NvZGVBZGRyZXNzXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdGxldCBhZGRyZXNzU3RyaW5nID1cblx0XHRcdFx0ICAgIGpRdWVyeShcIiNqZm9ybV9wcm9wZXJ0eV9zdHJlZXRcIikudmFsKClcblx0XHRcdFx0ICAgICsgXCIsIFwiXG5cdFx0XHRcdCAgICArIGpRdWVyeSgnI2pmb3JtX3Rvd25faWQnKS5maW5kKFwiOnNlbGVjdGVkXCIpLnRleHQoKVxuXHRcdFx0XHQgICAgKyBcIiBcIlxuXHRcdFx0XHQgICAgKyBqUXVlcnkoXCIjamZvcm1fcHJvcGVydHlfcG9zdGNvZGVcIikudmFsKClcblx0XHRcdFx0ICAgICsgXCIsIFwiXG5cdFx0XHRcdCAgICArIGpRdWVyeSgnI2pmb3JtX3JlZ2lvbl9pZCcpLmZpbmQoXCI6c2VsZWN0ZWRcIikudGV4dCgpXG5cdFx0XHRcdCAgICArIFwiIFwiXG5cdFx0XHRcdCAgICArIGpRdWVyeSgnI2pmb3JtX2NvdW50cnlfaWQnKS5maW5kKFwiOnNlbGVjdGVkXCIpLnRleHQoKTtcblxuXHRcdFx0bGV0IHVybCA9ICdpbmRleC5waHA/b3B0aW9uPWNvbV9rbm93cmVzJnRhc2s9cHJvcGVydHkuZ2VvY29kZSc7XG5cdFx0XHRsZXQgY29vcmQgPSBbXTtcblxuXHRcdFx0alF1ZXJ5LmFqYXgoe1xuXHRcdFx0XHR0eXBlOiAgICAgXCJQT1NUXCIsXG5cdFx0XHRcdHVybDogICAgICB1cmwsXG5cdFx0XHRcdGRhdGE6ICAgICB7YWRkcmVzczogYWRkcmVzc1N0cmluZ30sXG5cdFx0XHRcdGRhdGFUeXBlOiBcImpzb25cIixcblx0XHRcdFx0c3VjY2VzczogIGZ1bmN0aW9uIChqc29uZGF0YSkge1xuXHRcdFx0XHRcdGpRdWVyeS5lYWNoKGpzb25kYXRhLCBmdW5jdGlvbiAoa2V5LCB2YWwpIHtcblx0XHRcdFx0XHRcdGxldCBkaXYgPSBcIiNcIiArIGtleTtcblx0XHRcdFx0XHRcdGpRdWVyeShkaXYpLnZhbCh2YWwpO1xuXHRcdFx0XHRcdFx0Y29vcmRba2V5XSA9IHZhbDtcblx0XHRcdFx0XHRcdG15R21hcC5yZWZyZXNoTWFwKGNvb3JkWydsYXQnXSwgY29vcmRbJ2xuZyddLCBmYWxzZSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9KTtcbn0oalF1ZXJ5KSk7IiwiLy8gS1IgQVBQIEpTIEZpbGVzXG5pbXBvcnQgJ25wbS9qcXVlcnktYmFyLXJhdGluZy9qcXVlcnkuYmFycmF0aW5nJztcbmltcG9ydCAnbnBtL2lzLW1hcmtlci1jbHVzdGVyZXInO1xuaW1wb3J0ICdtZWRpYWpzL3NpdGUvYXBwJztcbi8vaW1wb3J0ICdtZWRpYWpzL3NpdGUvY29tYm9nZW8nO1xuaW1wb3J0ICdtZWRpYWpzL3NpdGUvY29uZmlybSc7XG5pbXBvcnQgJ21lZGlhanMvc2l0ZS9kb2JlbnRyeSc7XG5pbXBvcnQgJ21lZGlhanMvc2l0ZS9ndWVzdGRhdGEnO1xuaW1wb3J0ICdtZWRpYWpzL3NpdGUvbWFwJztcbmltcG9ydCAnbWVkaWFqcy9zaXRlL3JvdXRlJztcbi8vIGltcG9ydCAnLi9qcy9zcmMva3JhcHAvc3RyaXBlJzsiXSwibmFtZXMiOlsiTWFya2VyQ2x1c3RlcmVyIiwibWFwIiwib3B0X21hcmtlcnMiLCJvcHRfb3B0aW9ucyIsImV4dGVuZCIsImdvb2dsZSIsIm1hcHMiLCJPdmVybGF5VmlldyIsIm1hcF8iLCJtYXJrZXJzXyIsImNsdXN0ZXJzXyIsInNpemVzIiwic3R5bGVzXyIsInJlYWR5XyIsIm9wdGlvbnMiLCJncmlkU2l6ZV8iLCJtaW5DbHVzdGVyU2l6ZV8iLCJtYXhab29tXyIsImltYWdlUGF0aF8iLCJNQVJLRVJfQ0xVU1RFUl9JTUFHRV9QQVRIXyIsImltYWdlRXh0ZW5zaW9uXyIsIk1BUktFUl9DTFVTVEVSX0lNQUdFX0VYVEVOU0lPTl8iLCJ6b29tT25DbGlja18iLCJ1bmRlZmluZWQiLCJhdmVyYWdlQ2VudGVyXyIsInNldHVwU3R5bGVzXyIsInNldE1hcCIsInByZXZab29tXyIsImdldFpvb20iLCJ0aGF0IiwiZXZlbnQiLCJhZGRMaXN0ZW5lciIsInpvb20iLCJyZXNldFZpZXdwb3J0IiwicmVkcmF3IiwibGVuZ3RoIiwiYWRkTWFya2VycyIsInByb3RvdHlwZSIsIm9iajEiLCJvYmoyIiwib2JqZWN0IiwicHJvcGVydHkiLCJhcHBseSIsIm9uQWRkIiwic2V0UmVhZHlfIiwiZHJhdyIsImkiLCJzaXplIiwicHVzaCIsInVybCIsImhlaWdodCIsIndpZHRoIiwiZml0TWFwVG9NYXJrZXJzIiwibWFya2VycyIsImdldE1hcmtlcnMiLCJib3VuZHMiLCJMYXRMbmdCb3VuZHMiLCJtYXJrZXIiLCJnZXRQb3NpdGlvbiIsImZpdEJvdW5kcyIsInNldFN0eWxlcyIsInN0eWxlcyIsImdldFN0eWxlcyIsImlzWm9vbU9uQ2xpY2siLCJpc0F2ZXJhZ2VDZW50ZXIiLCJnZXRUb3RhbE1hcmtlcnMiLCJzZXRNYXhab29tIiwibWF4Wm9vbSIsImdldE1heFpvb20iLCJjYWxjdWxhdG9yXyIsIm51bVN0eWxlcyIsImluZGV4IiwiY291bnQiLCJkdiIsInBhcnNlSW50IiwiTWF0aCIsIm1pbiIsInRleHQiLCJzZXRDYWxjdWxhdG9yIiwiY2FsY3VsYXRvciIsImdldENhbGN1bGF0b3IiLCJvcHRfbm9kcmF3IiwicHVzaE1hcmtlclRvXyIsImlzQWRkZWQiLCJyZXBhaW50IiwiYWRkTWFya2VyIiwicmVtb3ZlTWFya2VyXyIsImluZGV4T2YiLCJtIiwic3BsaWNlIiwicmVtb3ZlTWFya2VyIiwicmVtb3ZlZCIsInJlbW92ZU1hcmtlcnMiLCJyIiwicmVhZHkiLCJjcmVhdGVDbHVzdGVyc18iLCJnZXRUb3RhbENsdXN0ZXJzIiwiZ2V0TWFwIiwiZ2V0R3JpZFNpemUiLCJzZXRHcmlkU2l6ZSIsImdldE1pbkNsdXN0ZXJTaXplIiwic2V0TWluQ2x1c3RlclNpemUiLCJnZXRFeHRlbmRlZEJvdW5kcyIsInByb2plY3Rpb24iLCJnZXRQcm9qZWN0aW9uIiwidHIiLCJMYXRMbmciLCJnZXROb3J0aEVhc3QiLCJsYXQiLCJsbmciLCJibCIsImdldFNvdXRoV2VzdCIsInRyUGl4IiwiZnJvbUxhdExuZ1RvRGl2UGl4ZWwiLCJ4IiwieSIsImJsUGl4IiwibmUiLCJmcm9tRGl2UGl4ZWxUb0xhdExuZyIsInN3IiwiaXNNYXJrZXJJbkJvdW5kc18iLCJjb250YWlucyIsImNsZWFyTWFya2VycyIsIm9wdF9oaWRlIiwiY2x1c3RlciIsInJlbW92ZSIsIm9sZENsdXN0ZXJzIiwic2xpY2UiLCJ3aW5kb3ciLCJzZXRUaW1lb3V0IiwiZGlzdGFuY2VCZXR3ZWVuUG9pbnRzXyIsInAxIiwicDIiLCJSIiwiZExhdCIsIlBJIiwiZExvbiIsImEiLCJzaW4iLCJjb3MiLCJjIiwiYXRhbjIiLCJzcXJ0IiwiZCIsImFkZFRvQ2xvc2VzdENsdXN0ZXJfIiwiZGlzdGFuY2UiLCJjbHVzdGVyVG9BZGRUbyIsInBvcyIsImNlbnRlciIsImdldENlbnRlciIsImlzTWFya2VySW5DbHVzdGVyQm91bmRzIiwiQ2x1c3RlciIsIm1hcEJvdW5kcyIsImdldEJvdW5kcyIsIm1hcmtlckNsdXN0ZXJlciIsIm1hcmtlckNsdXN0ZXJlcl8iLCJjZW50ZXJfIiwiYm91bmRzXyIsImNsdXN0ZXJJY29uXyIsIkNsdXN0ZXJJY29uIiwiaXNNYXJrZXJBbHJlYWR5QWRkZWQiLCJjYWxjdWxhdGVCb3VuZHNfIiwibCIsImxlbiIsInVwZGF0ZUljb24iLCJnZXRNYXJrZXJDbHVzdGVyZXIiLCJnZXRTaXplIiwibXoiLCJoaWRlIiwic3VtcyIsInNldENlbnRlciIsInNldFN1bXMiLCJzaG93Iiwib3B0X3BhZGRpbmciLCJwYWRkaW5nXyIsImNsdXN0ZXJfIiwiZGl2XyIsInN1bXNfIiwidmlzaWJsZV8iLCJ0cmlnZ2VyQ2x1c3RlckNsaWNrIiwidHJpZ2dlciIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImdldFBvc0Zyb21MYXRMbmdfIiwic3R5bGUiLCJjc3NUZXh0IiwiY3JlYXRlQ3NzIiwiaW5uZXJIVE1MIiwicGFuZXMiLCJnZXRQYW5lcyIsIm92ZXJsYXlNb3VzZVRhcmdldCIsImFwcGVuZENoaWxkIiwiYWRkRG9tTGlzdGVuZXIiLCJsYXRsbmciLCJ3aWR0aF8iLCJoZWlnaHRfIiwidG9wIiwibGVmdCIsImRpc3BsYXkiLCJvblJlbW92ZSIsInBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsInRleHRfIiwiaW5kZXhfIiwidXNlU3R5bGUiLCJtYXgiLCJ1cmxfIiwidGV4dENvbG9yXyIsImFuY2hvcl8iLCJ0ZXh0U2l6ZV8iLCJmb250RmFtaWx5XyIsImZvbnRXZWlnaHRfIiwiYmFja2dyb3VuZFBvc2l0aW9uXyIsImJhY2tncm91bmRQb3NpdGlvbiIsInR4dENvbG9yIiwidHh0U2l6ZSIsImZvbnRGYW1pbHkiLCJmb250V2VpZ2h0Iiwiam9pbiIsImdsb2JhbCIsIm1vZHVsZSIsImV4cG9ydHMiLCJmYWN0b3J5IiwiZGVmaW5lIiwiYW1kIiwicmVxdWlyZSIsImpRdWVyeSIsIiQiLCJCYXJSYXRpbmciLCJzZWxmIiwid3JhcEVsZW1lbnQiLCJjbGFzc2VzIiwidGhlbWUiLCIkZWxlbSIsIndyYXAiLCJ1bndyYXBFbGVtZW50IiwidW53cmFwIiwiZmluZE9wdGlvbiIsInZhbHVlIiwiaXNOdW1lcmljIiwiZmxvb3IiLCJnZXRJbml0aWFsT3B0aW9uIiwiaW5pdGlhbFJhdGluZyIsImdldEVtcHR5T3B0aW9uIiwiJGVtcHR5T3B0IiwiZmluZCIsImVtcHR5VmFsdWUiLCJhbGxvd0VtcHR5IiwicHJlcGVuZFRvIiwiZ2V0RGF0YSIsImtleSIsImRhdGEiLCJzZXREYXRhIiwic2F2ZURhdGFPbkVsZW1lbnQiLCIkb3B0IiwidmFsIiwiZW1wdHlUZXh0IiwidXNlck9wdGlvbnMiLCJyYXRpbmdWYWx1ZSIsInJhdGluZ1RleHQiLCJvcmlnaW5hbFJhdGluZ1ZhbHVlIiwib3JpZ2luYWxSYXRpbmdUZXh0IiwiZW1wdHlSYXRpbmdWYWx1ZSIsImVtcHR5UmF0aW5nVGV4dCIsInJlYWRPbmx5IiwicmVhZG9ubHkiLCJyYXRpbmdNYWRlIiwicmVtb3ZlRGF0YU9uRWxlbWVudCIsInJlbW92ZURhdGEiLCJidWlsZFdpZGdldCIsIiR3IiwiZWFjaCIsImh0bWwiLCIkYSIsInNob3dWYWx1ZXMiLCJhcHBlbmQiLCJzaG93U2VsZWN0ZWRSYXRpbmciLCJyZXZlcnNlIiwiYWRkQ2xhc3MiLCJuZXh0QWxsb3JQcmV2aW91c0FsbCIsInNldFNlbGVjdEZpZWxkVmFsdWUiLCJwcm9wIiwiY2hhbmdlIiwicmVzZXRTZWxlY3RGaWVsZCIsImRlZmF1bHRTZWxlY3RlZCIsInBhcmVudCIsImZyYWN0aW9uIiwicm91bmQiLCJyZXNldFN0eWxlIiwiJHdpZGdldCIsInJlbW92ZUNsYXNzIiwibWF0Y2giLCJhcHBseVN0eWxlIiwiYmFzZVZhbHVlIiwiZiIsIiRhbGwiLCIkZnJhY3Rpb25hbCIsImlzRGVzZWxlY3RhYmxlIiwiJGVsZW1lbnQiLCJkZXNlbGVjdGFibGUiLCJhdHRyIiwiYXR0YWNoQ2xpY2tIYW5kbGVyIiwiJGVsZW1lbnRzIiwib24iLCJwcmV2ZW50RGVmYXVsdCIsIm9uU2VsZWN0IiwiY2FsbCIsImF0dGFjaE1vdXNlRW50ZXJIYW5kbGVyIiwiYXR0YWNoTW91c2VMZWF2ZUhhbmRsZXIiLCJmYXN0Q2xpY2tzIiwic3RvcFByb3BhZ2F0aW9uIiwiY2xpY2siLCJkaXNhYmxlQ2xpY2tzIiwiYXR0YWNoSGFuZGxlcnMiLCJob3ZlclN0YXRlIiwiZGV0YWNoSGFuZGxlcnMiLCJvZmYiLCJzZXR1cEhhbmRsZXJzIiwiaW5zZXJ0QWZ0ZXIiLCJzdGF0ZSIsInRvZ2dsZUNsYXNzIiwic2V0Iiwic2lsZW50IiwiY2xlYXIiLCJvbkNsZWFyIiwiZGVzdHJveSIsIm9uRGVzdHJveSIsImluaXQiLCJlbGVtIiwiZm4iLCJiYXJyYXRpbmciLCJkZWZhdWx0cyIsIm1ldGhvZCIsInBsdWdpbiIsImlzIiwiZXJyb3IiLCJoYXNPd25Qcm9wZXJ0eSIsIm5leHQiLCJsYW5nIiwic2VhcmNoZGF0YSIsInNlYXJjaERvbmUiLCJjYWxlbmRhckxvYWRlZCIsInNhdmVkd2lkdGgiLCJsYXJnZSIsInJlc2l6ZWQiLCJsb2NhdGlvbiIsIm9yaWdpbiIsInByb3RvY29sIiwiaG9zdCIsImxpdmVzaXRlIiwiRm91bmRhdGlvbiIsImFkZFRvSnF1ZXJ5IiwiZm91bmRhdGlvbiIsImNoZWNrU2NyZWVuV2lkdGgiLCJiYXJzIiwiZSIsIiRmb3JtIiwiYWpheCIsInR5cGUiLCJzZXJpYWxpemUiLCJkYXRhVHlwZSIsInN1Y2Nlc3MiLCJyZXN1bHQiLCJmb3JtUmVzcG9uc2UiLCJocmVmIiwibWVzc2FnZSIsIiRtb2RhbCIsIlJldmVhbCIsIm9wZW4iLCJjc3MiLCJtb2RhbGlkIiwidHJpbSIsImFqYXh1cmwiLCJjb250ZW50IiwiJHRoaXMiLCJhY3Rpb24iLCJlbGVtZW50IiwicGFyZW50cyIsIiR0YXJnZXQiLCJ2YWwxIiwiZ2V0UHJvcGVydGllcyIsImNoaWxkcmVuIiwidG9nZ2xlIiwic2V0QWN0aXZlTWVudSIsInBpZCIsImxvYWRDYWxlbmRhciIsIiR0YWJzIiwic3BlY2lhbCIsInRvdWNoc3RhcnQiLCJzZXR1cCIsIl8iLCJucyIsImhhbmRsZSIsImluY2x1ZGVzIiwiYWRkRXZlbnRMaXN0ZW5lciIsInBhc3NpdmUiLCJ0b3VjaG1vdmUiLCJpZCIsInJlcGxhY2UiLCJyZWRpcmVjdCIsImZpZWxkIiwicmVsb2FkIiwic2V0U2VhcmNoRGF0YSIsInJlc3BvbnNlIiwiZW1wdHkiLCJmYWRlSW4iLCJoYXNDbGFzcyIsInNjcm9sbFRvIiwiaXRlbSIsImJhciIsInNjcmVlbldpZHRoSGFzQ2hhbmdlZCIsIk1lZGlhUXVlcnkiLCJhdExlYXN0IiwibXlDb25maXJtIiwiJG15VGFzayIsIktyY29uZmlybSIsImNvbnN0cnVjdG9yIiwiZm9ybSIsInVwZGF0ZVF1b3RlIiwic2VyaWFsaXplQXJyYXkiLCJkaXYiLCJjaGVja1Rlcm1zIiwidGVzdCIsImdldEVsZW1lbnRCeUlkIiwidGVzdGMiLCJ0ZXN0dCIsImFncmVlY2hlY2siLCJjaGVja2VkIiwiYWdyZWVjaGVja2MiLCJhZ3JlZWNoZWNrdCIsIm15S3JEb2JFbnRyeSIsInRvZGF5IiwiQkFDS1NQQUNFIiwic2V0dGluZ3MiLCJjdXN0b21fdmFsaWRhdGlvbiIsImRheXNfaW5fbW9udGgiLCJkb2N1bWVudF9kYXRlIiwiZXJyb3Jib3hfeCIsImVycm9yYm94X3kiLCJmaWVsZF9oaW50X3RleHRfZGF5IiwiZmllbGRfaGludF90ZXh0X21vbnRoIiwiZmllbGRfaGludF90ZXh0X3llYXIiLCJmaWVsZF9vcmRlciIsImZpZWxkX3dpZHRoX2RheSIsImZpZWxkX3dpZHRoX21vbnRoIiwiZmllbGRfd2lkdGhfeWVhciIsImZpZWxkX3dpZHRoX3NlcCIsIm1pbm1heCIsIm1pbl9kYXRlIiwibWF4X2RhdGUiLCJtaW5feWVhciIsIm1vbnRoX25hbWUiLCJvbl9ibHVyIiwib25fZXJyb3IiLCJvbl9jaGFuZ2UiLCJwYXJzZV9kYXRlIiwic2VwYXJhdG9yIiwic2hvd19lcnJvcnMiLCJzaG93X2hpbnRzIiwiRV9EQVlfTkFOIiwiRV9EQVlfVE9PX0JJRyIsIkVfREFZX1RPT19TTUFMTCIsIkVfQkFEX0RBWV9GT1JfTU9OVEgiLCJFX01PTlRIX05BTiIsIkVfTU9OVEhfVE9PX0JJRyIsIkVfTU9OVEhfVE9PX1NNQUxMIiwiRV9ZRUFSX05BTiIsIkVfWUVBUl9MRU5HVEgiLCJFX1lFQVJfVE9PX1NNQUxMIiwiRV9NSU5fREFURSIsIkVfTUFYX0RBVEUiLCJLckRvYkVudHJ5IiwiZ2V0WW1kIiwiRGF0ZSIsImlucHV0X2RheSIsImlucHV0X21vbnRoIiwiaW5wdXRfeWVhciIsImRhdGUiLCJnZXRNb250aCIsImdldERheSIsImdldEZ1bGxZZWFyIiwiZ2V0WW1kT2JqZWN0IiwieWVhciIsIm1vbnRoIiwiZGF5IiwiYWRkRW50cnlGaWVsZHMiLCJkb2JmaWVsZCIsImZpZWxkcyIsInNwbGl0IiwiYnVpbGRGaWVsZCIsImFmdGVyUGFzdGUiLCJ0YXJnZXQiLCJwYXJzZURhdGUiLCJzZXREYXRlIiwibmFtZSIsImtyZG9iZW50cnkiLCJpbnB1dCIsIktyRG9iSW5wdXQiLCJoaW50X3RleHQiLCJpbm5lciIsIiRpbnB1dCIsImJ1aWxkVWkiLCJ3cmFwcGVyIiwiZXJyb3Jib3giLCJzZXRGaWVsZFdpZHRocyIsImNoZWNrRG9jdW1lbnQiLCJkb2IiLCJjaGlsZGRvYiIsImNsYXNzbmFtZSIsImVsZW1lbnRzIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImNsZWFyRXJyb3IiLCJlcnJvcl90ZXh0Iiwic2hvd0Vycm9yIiwiZm9jdXMiLCJzZXRGb2N1cyIsImZvY3VzRmllbGRCZWZvcmUiLCJ5aWVsZEZvY3VzIiwiZm9jdXNGaWVsZEFmdGVyIiwiZm9jdXNJbiIsImZvY3VzT3V0Iiwid2lkZ2V0Rm9jdXNMb3N0IiwiZ2V0RGF0ZSIsImRheV92YWx1ZSIsIm1vbnRoX3ZhbHVlIiwieWVhcl92YWx1ZSIsInByb3h5TGFiZWxDbGlja3MiLCJwYXJzZUlzb0RhdGUiLCJSZWdFeHAiLCIkMyIsIiQyIiwiJDEiLCJuZXdfZGF0ZSIsInZhbGlkYXRlIiwic2V0RXJyb3IiLCJhdmFpbGFibGUiLCJ0b3RhbCIsInNldFdpZHRoIiwic2V0UmVhZG9ubHkiLCJtb2RlIiwid2lkZ2V0RXJyb3JUZXh0IiwieF9vZmZzZXQiLCJvdXRlcldpZHRoIiwieV9vZmZzZXQiLCJwb3NpdGlvbiIsImN1cnJlbnRfaW5wdXQiLCJ2YWxpZGF0ZURheSIsInZhbGlkYXRlTW9udGgiLCJ2YWxpZGF0ZVllYXIiLCJ2YWxpZGF0ZURheXNJbk1vbnRoIiwidmFsaWRhdGVDb21wbGV0ZURhdGUiLCJkYXRlX3N0ciIsImRhdGVfb2JqIiwiZGF0ZV9pc28iLCJvcHQiLCJnZXQiLCJoYXNfZm9jdXMiLCJudW0iLCJtc2ciLCJ0b1N0cmluZyIsIm9uQmx1ciIsInByb3h5IiwiYmx1ciIsImtleWRvd24iLCJrZXl1cCIsInNob3dfaGludCIsImtleV9pc19kb3duIiwiaXNEaWdpdEtleSIsImtleWNvZGUiLCJ3aGljaCIsIndhbnQiLCJuZXdfdmFsdWUiLCJzZWxlY3RfYWxsIiwic2VsZWN0IiwibmV3X3dpZHRoIiwiaG93dG9hcnJpdmUiLCJhcnJpdmFsbWVhbnMiLCJnZXRBdHRyaWJ1dGUiLCJkaXNwbGF5QXJyaXZhbCIsImNsYXNzTGlzdCIsImFycml2YWxkYXRhIiwiYWRkIiwibWFya2Vyc2hhcGUiLCJjb29yZHMiLCJteUtybWFwIiwibWFwRGF0YSIsIm1hcFpvb20iLCJpbmZvV2luZG93IiwiaW5mb1dpbmRvdzIiLCJwcm9wZXJ0eWRpdiIsInByb3BlcnR5aWNvbiIsIm1jIiwicHJvcGVydHlNYXJrZXJzIiwiZmlsdGVySWRzIiwibWFwTWFya2VycyIsIm1hcFR5cGVJZCIsIm1hcE1heFpvb20iLCJtYXBUeXBlIiwibWFwSWQiLCJtYXJrZXJDb2xvciIsIktybWFwIiwiZ21PcHRpb25zIiwic2Nyb2xsd2hlZWwiLCJzdHJlZXRWaWV3Q29udHJvbCIsImdtYXJrZXJzIiwiaW5pdE1hcCIsImNsb3NlS3JJbmZvd2luZG93IiwiY2xvc2UiLCJzaG93VmlzaWJsZU1hcmtlcnMiLCJzZXRWaXNpYmxlIiwiY2hlY2tEdXBsaWNhdGUiLCJjdXJyZW50IiwiZHVwcyIsImVxdWFscyIsIm5ld0xhdCIsIm5ld0xuZyIsImNoZWNrWm9vbSIsIm15bGlzdGVuZXIiLCJjdXJyZW50Wm9vbSIsInNldFpvb20iLCJjbHVzdGVyTWFwIiwibWNPcHRpb25zIiwiZ3JpZFNpemUiLCJpbWFnZVBhdGgiLCJpZ25vcmVIaWRkZW5NYXJrZXJzIiwic2V0UHJvcGVydHlNYXJrZXJzIiwic2V0TWFwTWFya2VycyIsImNyZWF0ZU1hcCIsIk1hcCIsIkluZm9XaW5kb3ciLCJjcmVhdGVNYXBNYXJrZXIiLCJwb2ludCIsImltYWdlIiwiYm94aW5mbyIsImxpbmsiLCJ0aXRsZSIsIk1hcmtlciIsInNoYXBlIiwiaWNvbiIsInpJbmRleCIsInNldENvbnRlbnQiLCJjcmVhdGVQcm9wZXJ0eU1hcmtlciIsImNvbG9yIiwibm90Iiwic2xpY2siLCJuZXh0QXJyb3ciLCJwcmV2QXJyb3ciLCJhdXRvcGxheSIsInNvbG9NYXAiLCJyZWZyZXNoTWFwIiwiJG1hcG1vZGFsIiwiYWxlcnQiLCJyZXNldE1hcCIsImFtYXJrIiwibWFya2VyaWNvbiIsIlNpemUiLCJQb2ludCIsImFuY2hvciIsIm15TGlzdGVuZXIiLCJmb3VuZCIsImtpY2tNYXAiLCJtYXBfbW9kYWwiLCIkc29sb1RyaWdnZXIiLCJvbmUiLCIkdHJpZ2dlciIsIm15S3Jyb3V0ZSIsImRpcmVjdGlvbnNEaXNwbGF5IiwiZGlyZWN0aW9uc1Zpc2libGUiLCJyb3V0ZU1hcCIsImRlc3RpbmF0aW9uIiwicm91dGVNYXJrZXJzIiwicm91dGVTdG9wUG9pbnRzIiwiZGV0b3VyIiwiZGlyZWN0aW9uc1BhbmVsIiwiZGlyZWN0aW9uc1NlcnZpY2UiLCJLcnJvdXRlIiwiRGlyZWN0aW9uc1NlcnZpY2UiLCJjbGVhclJvdXRlTWFya2VycyIsImNsZWFyV2F5cG9pbnRzIiwiYWRkUm91dGVNYXJrZXIiLCJjYWxjUm91dGUiLCJmcm9tX2FkZHJlc3MiLCJEaXJlY3Rpb25zVHJhdmVsTW9kZSIsIkJJQ1lDTElORyIsIkRSSVZJTkciLCJXQUxLSU5HIiwicmVxdWVzdCIsIndheXBvaW50cyIsInRyYXZlbE1vZGUiLCJhdm9pZEhpZ2h3YXlzIiwiYXZvaWRUb2xscyIsInJvdXRlIiwic3RhdHVzIiwiRGlyZWN0aW9uc1N0YXR1cyIsIk9LIiwic2V0RGlyZWN0aW9ucyIsInJlc2V0Um91dGUiLCJteU9wdGlvbnMiLCJEaXJlY3Rpb25zUmVuZGVyZXIiLCJzZXRQYW5lbCIsIk1hcmtlckltYWdlIiwibGF0TG5nIiwic3RvcG92ZXIiLCJhZGRMaXN0ZW5lck9uY2UiLCJkaXJlY3Rpb25QYW5lbCIsImFkZHJlc3NTdHJpbmciLCJjb29yZCIsImFkZHJlc3MiLCJqc29uZGF0YSIsIm15R21hcCJdLCJzb3VyY2VSb290IjoiIn0=