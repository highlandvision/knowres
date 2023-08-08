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
        $("#kr-properties-filters-off-canvas").html(response['filters']);
        $("#kr-properties-sortby-off-canvas").html(response['sortby']); // $("#kr-properties-filters-off-canvas").html('');
        // $("#kr-properties-sortby-off-canvas").html('');

        $("#kr-sidebar-search").empty().html(response['search']); // $('#kr-properties-filters').empty().html(response['filters']);
        // $('#kr-properties-sortby').empty().html(response['sortby']).addClass('hideme');
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


 //import 'mediajs/site/
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// combogeo';





 // import './js/src/krapp/stripe';

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["common"], () => (__webpack_exec__("./webpack.build.site.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LEVBQUUsTUFKQztRQUtYQyxPQUFPLEVBQUcsVUFBVTJWLFFBQVYsRUFBb0I7VUFDN0JsZSxNQUFNLENBQUM2QyxJQUFQLENBQVlxYixRQUFaLEVBQXNCLFVBQVUxYyxHQUFWLEVBQWVLLEdBQWYsRUFBb0I7WUFDekMsSUFBSXFLLEdBQUcsR0FBRyxNQUFNMUssR0FBaEI7WUFDQXhCLE1BQU0sQ0FBQ2tNLEdBQUQsQ0FBTixDQUFZckssR0FBWixDQUFnQkEsR0FBaEI7WUFDQW1jLEtBQUssQ0FBQ3hjLEdBQUQsQ0FBTCxHQUFhSyxHQUFiO1lBQ0FzYyxNQUFNLENBQUM1RCxVQUFQLENBQWtCeUQsS0FBSyxDQUFDLEtBQUQsQ0FBdkIsRUFBZ0NBLEtBQUssQ0FBQyxLQUFELENBQXJDLEVBQThDLEtBQTlDO1VBQ0EsQ0FMRDtRQU1BO01BWlUsQ0FBWjtJQWNBLENBL0JEO0VBZ0NBLENBbkREO0FBb0RBLENBblBBLEVBbVBDaGUsTUFuUEQsQ0FBRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1ZBO0FBQ0E7QUFDQTtDQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Q0FFQSIsInNvdXJjZXMiOlsid2VicGFjazovL2tyLy4vbm9kZV9tb2R1bGVzL2lzLW1hcmtlci1jbHVzdGVyZXIvc3JjL21hcmtlcmNsdXN0ZXJlci5qcyIsIndlYnBhY2s6Ly9rci8uL25vZGVfbW9kdWxlcy9qcXVlcnktYmFyLXJhdGluZy9qcXVlcnkuYmFycmF0aW5nLmpzIiwid2VicGFjazovL2tyLy4vc3JjL21lZGlhL2NvbV9rbm93cmVzL2pzL3NyYy9zaXRlL2FwcC5qcyIsIndlYnBhY2s6Ly9rci8uL3NyYy9tZWRpYS9jb21fa25vd3Jlcy9qcy9zcmMvc2l0ZS9jb25maXJtLmpzIiwid2VicGFjazovL2tyLy4vc3JjL21lZGlhL2NvbV9rbm93cmVzL2pzL3NyYy9zaXRlL2RvYmVudHJ5LmpzIiwid2VicGFjazovL2tyLy4vc3JjL21lZGlhL2NvbV9rbm93cmVzL2pzL3NyYy9zaXRlL2d1ZXN0ZGF0YS5qcyIsIndlYnBhY2s6Ly9rci8uL3NyYy9tZWRpYS9jb21fa25vd3Jlcy9qcy9zcmMvc2l0ZS9tYXAuanMiLCJ3ZWJwYWNrOi8va3IvLi9zcmMvbWVkaWEvY29tX2tub3dyZXMvanMvc3JjL3NpdGUvcm91dGUuanMiLCJ3ZWJwYWNrOi8va3IvLi93ZWJwYWNrLmJ1aWxkLnNpdGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBOcG0gdmVyc2lvbiBvZiBtYXJrZXJDbHVzdGVyZXIgd29ya3MgZ3JlYXQgd2l0aCBicm93c2VyaWZ5XG4gKiBEaWZmZXJlbmNlIGZyb20gdGhlIG9yaWdpbmFsIC0gYWRkcyBhIGNvbW1vbmpzIGZvcm1hdCBhbmQgcmVwbGFjZXMgd2luZG93IHdpdGggZ2xvYmFsIGFuZCBzb21lIHVuaXQgdGVzdFxuICogVGhlIG9yaWdpbmFsIGZ1bmN0aW9uYWxpdHkgaXQncyBub3QgbW9kaWZpZWQgZm9yIGRvY3MgYW5kIG9yaWdpbmFsIHNvdXJjZSBjaGVja1xuICogaHR0cHM6Ly9naXRodWIuY29tL2dvb2dsZW1hcHMvanMtbWFya2VyLWNsdXN0ZXJlclxuICovXG5cbi8qKlxuICogQG5hbWUgTWFya2VyQ2x1c3RlcmVyIGZvciBHb29nbGUgTWFwcyB2M1xuICogQHZlcnNpb24gdmVyc2lvbiAxLjBcbiAqIEBhdXRob3IgTHVrZSBNYWhlXG4gKiBAZmlsZW92ZXJ2aWV3XG4gKiBUaGUgbGlicmFyeSBjcmVhdGVzIGFuZCBtYW5hZ2VzIHBlci16b29tLWxldmVsIGNsdXN0ZXJzIGZvciBsYXJnZSBhbW91bnRzIG9mXG4gKiBtYXJrZXJzLlxuICogPGJyLz5cbiAqIFRoaXMgaXMgYSB2MyBpbXBsZW1lbnRhdGlvbiBvZiB0aGVcbiAqIDxhIGhyZWY9XCJodHRwOi8vZ21hcHMtdXRpbGl0eS1saWJyYXJ5LWRldi5nb29nbGVjb2RlLmNvbS9zdm4vdGFncy9tYXJrZXJjbHVzdGVyZXIvXCJcbiAqID52MiBNYXJrZXJDbHVzdGVyZXI8L2E+LlxuICovXG5cbi8qKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cblxuLyoqXG4gKiBBIE1hcmtlciBDbHVzdGVyZXIgdGhhdCBjbHVzdGVycyBtYXJrZXJzLlxuICpcbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTWFwfSBtYXAgVGhlIEdvb2dsZSBtYXAgdG8gYXR0YWNoIHRvLlxuICogQHBhcmFtIHtBcnJheS48Z29vZ2xlLm1hcHMuTWFya2VyPj19IG9wdF9tYXJrZXJzIE9wdGlvbmFsIG1hcmtlcnMgdG8gYWRkIHRvXG4gKiAgIHRoZSBjbHVzdGVyLlxuICogQHBhcmFtIHtPYmplY3Q9fSBvcHRfb3B0aW9ucyBzdXBwb3J0IHRoZSBmb2xsb3dpbmcgb3B0aW9uczpcbiAqICAgICAnZ3JpZFNpemUnOiAobnVtYmVyKSBUaGUgZ3JpZCBzaXplIG9mIGEgY2x1c3RlciBpbiBwaXhlbHMuXG4gKiAgICAgJ21heFpvb20nOiAobnVtYmVyKSBUaGUgbWF4aW11bSB6b29tIGxldmVsIHRoYXQgYSBtYXJrZXIgY2FuIGJlIHBhcnQgb2YgYVxuICogICAgICAgICAgICAgICAgY2x1c3Rlci5cbiAqICAgICAnem9vbU9uQ2xpY2snOiAoYm9vbGVhbikgV2hldGhlciB0aGUgZGVmYXVsdCBiZWhhdmlvdXIgb2YgY2xpY2tpbmcgb24gYVxuICogICAgICAgICAgICAgICAgICAgIGNsdXN0ZXIgaXMgdG8gem9vbSBpbnRvIGl0LlxuICogICAgICdhdmVyYWdlQ2VudGVyJzogKGJvb2xlYW4pIFdldGhlciB0aGUgY2VudGVyIG9mIGVhY2ggY2x1c3RlciBzaG91bGQgYmVcbiAqICAgICAgICAgICAgICAgICAgICAgIHRoZSBhdmVyYWdlIG9mIGFsbCBtYXJrZXJzIGluIHRoZSBjbHVzdGVyLlxuICogICAgICdtaW5pbXVtQ2x1c3RlclNpemUnOiAobnVtYmVyKSBUaGUgbWluaW11bSBudW1iZXIgb2YgbWFya2VycyB0byBiZSBpbiBhXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsdXN0ZXIgYmVmb3JlIHRoZSBtYXJrZXJzIGFyZSBoaWRkZW4gYW5kIGEgY291bnRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgaXMgc2hvd24uXG4gKiAgICAgJ3N0eWxlcyc6IChvYmplY3QpIEFuIG9iamVjdCB0aGF0IGhhcyBzdHlsZSBwcm9wZXJ0aWVzOlxuICogICAgICAgJ3VybCc6IChzdHJpbmcpIFRoZSBpbWFnZSB1cmwuXG4gKiAgICAgICAnaGVpZ2h0JzogKG51bWJlcikgVGhlIGltYWdlIGhlaWdodC5cbiAqICAgICAgICd3aWR0aCc6IChudW1iZXIpIFRoZSBpbWFnZSB3aWR0aC5cbiAqICAgICAgICdhbmNob3InOiAoQXJyYXkpIFRoZSBhbmNob3IgcG9zaXRpb24gb2YgdGhlIGxhYmVsIHRleHQuXG4gKiAgICAgICAndGV4dENvbG9yJzogKHN0cmluZykgVGhlIHRleHQgY29sb3IuXG4gKiAgICAgICAndGV4dFNpemUnOiAobnVtYmVyKSBUaGUgdGV4dCBzaXplLlxuICogICAgICAgJ2ZvbnRGYW1pbHknOiAoc3RyaW5nKSBUaGUgZm9udCBmYW1pbHkuXG4gKiAgICAgICAnZm9udFdlaWdodCc6IChzdHJpbmcpIFRoZSBmb250IHdlaWdodC5cbiAqICAgICAgICdiYWNrZ3JvdW5kUG9zaXRpb24nOiAoc3RyaW5nKSBUaGUgcG9zaXRpb24gb2YgdGhlIGJhY2tnb3VuZCB4LCB5LlxuICogQGNvbnN0cnVjdG9yXG4gKiBAZXh0ZW5kcyBnb29nbGUubWFwcy5PdmVybGF5Vmlld1xuICovXG5mdW5jdGlvbiBNYXJrZXJDbHVzdGVyZXIobWFwLCBvcHRfbWFya2Vycywgb3B0X29wdGlvbnMpIHtcbiAgLy8gTWFya2VyQ2x1c3RlcmVyIGltcGxlbWVudHMgZ29vZ2xlLm1hcHMuT3ZlcmxheVZpZXcgaW50ZXJmYWNlLiBXZSB1c2UgdGhlXG4gIC8vIGV4dGVuZCBmdW5jdGlvbiB0byBleHRlbmQgTWFya2VyQ2x1c3RlcmVyIHdpdGggZ29vZ2xlLm1hcHMuT3ZlcmxheVZpZXdcbiAgLy8gYmVjYXVzZSBpdCBtaWdodCBub3QgYWx3YXlzIGJlIGF2YWlsYWJsZSB3aGVuIHRoZSBjb2RlIGlzIGRlZmluZWQgc28gd2VcbiAgLy8gbG9vayBmb3IgaXQgYXQgdGhlIGxhc3QgcG9zc2libGUgbW9tZW50LiBJZiBpdCBkb2Vzbid0IGV4aXN0IG5vdyB0aGVuXG4gIC8vIHRoZXJlIGlzIG5vIHBvaW50IGdvaW5nIGFoZWFkIDopXG4gIHRoaXMuZXh0ZW5kKE1hcmtlckNsdXN0ZXJlciwgZ29vZ2xlLm1hcHMuT3ZlcmxheVZpZXcpO1xuICB0aGlzLm1hcF8gPSBtYXA7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtBcnJheS48Z29vZ2xlLm1hcHMuTWFya2VyPn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHRoaXMubWFya2Vyc18gPSBbXTtcblxuICAvKipcbiAgICogIEB0eXBlIHtBcnJheS48Q2x1c3Rlcj59XG4gICAqL1xuICB0aGlzLmNsdXN0ZXJzXyA9IFtdO1xuXG4gIHRoaXMuc2l6ZXMgPSBbNTMsIDU2LCA2NiwgNzgsIDkwXTtcblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHRoaXMuc3R5bGVzXyA9IFtdO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHRoaXMucmVhZHlfID0gZmFsc2U7XG5cbiAgdmFyIG9wdGlvbnMgPSBvcHRfb3B0aW9ucyB8fCB7fTtcblxuICAvKipcbiAgICogQHR5cGUge251bWJlcn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHRoaXMuZ3JpZFNpemVfID0gb3B0aW9uc1snZ3JpZFNpemUnXSB8fCA2MDtcblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHRoaXMubWluQ2x1c3RlclNpemVfID0gb3B0aW9uc1snbWluaW11bUNsdXN0ZXJTaXplJ10gfHwgMjtcblxuXG4gIC8qKlxuICAgKiBAdHlwZSB7P251bWJlcn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHRoaXMubWF4Wm9vbV8gPSBvcHRpb25zWydtYXhab29tJ10gfHwgbnVsbDtcblxuICB0aGlzLnN0eWxlc18gPSBvcHRpb25zWydzdHlsZXMnXSB8fCBbXTtcblxuICAvKipcbiAgICogQHR5cGUge3N0cmluZ31cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHRoaXMuaW1hZ2VQYXRoXyA9IG9wdGlvbnNbJ2ltYWdlUGF0aCddIHx8XG4gICAgICB0aGlzLk1BUktFUl9DTFVTVEVSX0lNQUdFX1BBVEhfO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgdGhpcy5pbWFnZUV4dGVuc2lvbl8gPSBvcHRpb25zWydpbWFnZUV4dGVuc2lvbiddIHx8XG4gICAgICB0aGlzLk1BUktFUl9DTFVTVEVSX0lNQUdFX0VYVEVOU0lPTl87XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgdGhpcy56b29tT25DbGlja18gPSB0cnVlO1xuXG4gIGlmIChvcHRpb25zWyd6b29tT25DbGljayddICE9IHVuZGVmaW5lZCkge1xuICAgIHRoaXMuem9vbU9uQ2xpY2tfID0gb3B0aW9uc1snem9vbU9uQ2xpY2snXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHRoaXMuYXZlcmFnZUNlbnRlcl8gPSBmYWxzZTtcblxuICBpZiAob3B0aW9uc1snYXZlcmFnZUNlbnRlciddICE9IHVuZGVmaW5lZCkge1xuICAgIHRoaXMuYXZlcmFnZUNlbnRlcl8gPSBvcHRpb25zWydhdmVyYWdlQ2VudGVyJ107XG4gIH1cblxuICB0aGlzLnNldHVwU3R5bGVzXygpO1xuXG4gIHRoaXMuc2V0TWFwKG1hcCk7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICB0aGlzLnByZXZab29tXyA9IHRoaXMubWFwXy5nZXRab29tKCk7XG5cbiAgLy8gQWRkIHRoZSBtYXAgZXZlbnQgbGlzdGVuZXJzXG4gIHZhciB0aGF0ID0gdGhpcztcbiAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIodGhpcy5tYXBfLCAnem9vbV9jaGFuZ2VkJywgZnVuY3Rpb24oKSB7XG4gICAgdmFyIHpvb20gPSB0aGF0Lm1hcF8uZ2V0Wm9vbSgpO1xuXG4gICAgaWYgKHRoYXQucHJldlpvb21fICE9IHpvb20pIHtcbiAgICAgIHRoYXQucHJldlpvb21fID0gem9vbTtcbiAgICAgIHRoYXQucmVzZXRWaWV3cG9ydCgpO1xuICAgIH1cbiAgfSk7XG5cbiAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIodGhpcy5tYXBfLCAnaWRsZScsIGZ1bmN0aW9uKCkge1xuICAgIHRoYXQucmVkcmF3KCk7XG4gIH0pO1xuXG4gIC8vIEZpbmFsbHksIGFkZCB0aGUgbWFya2Vyc1xuICBpZiAob3B0X21hcmtlcnMgJiYgb3B0X21hcmtlcnMubGVuZ3RoKSB7XG4gICAgdGhpcy5hZGRNYXJrZXJzKG9wdF9tYXJrZXJzLCBmYWxzZSk7XG4gIH1cbn1cblxuXG4vKipcbiAqIFRoZSBtYXJrZXIgY2x1c3RlciBpbWFnZSBwYXRoLlxuICpcbiAqIEB0eXBlIHtzdHJpbmd9XG4gKiBAcHJpdmF0ZVxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLk1BUktFUl9DTFVTVEVSX0lNQUdFX1BBVEhfID1cbiAgICAnaHR0cDovL2dvb2dsZS1tYXBzLXV0aWxpdHktbGlicmFyeS12My5nb29nbGVjb2RlLmNvbS9zdm4vdHJ1bmsvbWFya2VyY2x1c3RlcmVyLycgK1xuICAgICdpbWFnZXMvbSc7XG5cblxuLyoqXG4gKiBUaGUgbWFya2VyIGNsdXN0ZXIgaW1hZ2UgcGF0aC5cbiAqXG4gKiBAdHlwZSB7c3RyaW5nfVxuICogQHByaXZhdGVcbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5NQVJLRVJfQ0xVU1RFUl9JTUFHRV9FWFRFTlNJT05fID0gJ3BuZyc7XG5cblxuLyoqXG4gKiBFeHRlbmRzIGEgb2JqZWN0cyBwcm90b3R5cGUgYnkgYW5vdGhlcnMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iajEgVGhlIG9iamVjdCB0byBiZSBleHRlbmRlZC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmoyIFRoZSBvYmplY3QgdG8gZXh0ZW5kIHdpdGguXG4gKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBuZXcgZXh0ZW5kZWQgb2JqZWN0LlxuICogQGlnbm9yZVxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmV4dGVuZCA9IGZ1bmN0aW9uKG9iajEsIG9iajIpIHtcbiAgcmV0dXJuIChmdW5jdGlvbihvYmplY3QpIHtcbiAgICBmb3IgKHZhciBwcm9wZXJ0eSBpbiBvYmplY3QucHJvdG90eXBlKSB7XG4gICAgICB0aGlzLnByb3RvdHlwZVtwcm9wZXJ0eV0gPSBvYmplY3QucHJvdG90eXBlW3Byb3BlcnR5XTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0pLmFwcGx5KG9iajEsIFtvYmoyXSk7XG59O1xuXG5cbi8qKlxuICogSW1wbGVtZW50YWlvbiBvZiB0aGUgaW50ZXJmYWNlIG1ldGhvZC5cbiAqIEBpZ25vcmVcbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5vbkFkZCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnNldFJlYWR5Xyh0cnVlKTtcbn07XG5cbi8qKlxuICogSW1wbGVtZW50YWlvbiBvZiB0aGUgaW50ZXJmYWNlIG1ldGhvZC5cbiAqIEBpZ25vcmVcbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5kcmF3ID0gZnVuY3Rpb24oKSB7fTtcblxuLyoqXG4gKiBTZXRzIHVwIHRoZSBzdHlsZXMgb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuc2V0dXBTdHlsZXNfID0gZnVuY3Rpb24oKSB7XG4gIGlmICh0aGlzLnN0eWxlc18ubGVuZ3RoKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgZm9yICh2YXIgaSA9IDAsIHNpemU7IHNpemUgPSB0aGlzLnNpemVzW2ldOyBpKyspIHtcbiAgICB0aGlzLnN0eWxlc18ucHVzaCh7XG4gICAgICB1cmw6IHRoaXMuaW1hZ2VQYXRoXyArIChpICsgMSkgKyAnLicgKyB0aGlzLmltYWdlRXh0ZW5zaW9uXyxcbiAgICAgIGhlaWdodDogc2l6ZSxcbiAgICAgIHdpZHRoOiBzaXplXG4gICAgfSk7XG4gIH1cbn07XG5cbi8qKlxuICogIEZpdCB0aGUgbWFwIHRvIHRoZSBib3VuZHMgb2YgdGhlIG1hcmtlcnMgaW4gdGhlIGNsdXN0ZXJlci5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5maXRNYXBUb01hcmtlcnMgPSBmdW5jdGlvbigpIHtcbiAgdmFyIG1hcmtlcnMgPSB0aGlzLmdldE1hcmtlcnMoKTtcbiAgdmFyIGJvdW5kcyA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmdCb3VuZHMoKTtcbiAgZm9yICh2YXIgaSA9IDAsIG1hcmtlcjsgbWFya2VyID0gbWFya2Vyc1tpXTsgaSsrKSB7XG4gICAgYm91bmRzLmV4dGVuZChtYXJrZXIuZ2V0UG9zaXRpb24oKSk7XG4gIH1cblxuICB0aGlzLm1hcF8uZml0Qm91bmRzKGJvdW5kcyk7XG59O1xuXG5cbi8qKlxuICogIFNldHMgdGhlIHN0eWxlcy5cbiAqXG4gKiAgQHBhcmFtIHtPYmplY3R9IHN0eWxlcyBUaGUgc3R5bGUgdG8gc2V0LlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnNldFN0eWxlcyA9IGZ1bmN0aW9uKHN0eWxlcykge1xuICB0aGlzLnN0eWxlc18gPSBzdHlsZXM7XG59O1xuXG5cbi8qKlxuICogIEdldHMgdGhlIHN0eWxlcy5cbiAqXG4gKiAgQHJldHVybiB7T2JqZWN0fSBUaGUgc3R5bGVzIG9iamVjdC5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRTdHlsZXMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuc3R5bGVzXztcbn07XG5cblxuLyoqXG4gKiBXaGV0aGVyIHpvb20gb24gY2xpY2sgaXMgc2V0LlxuICpcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgem9vbU9uQ2xpY2tfIGlzIHNldC5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5pc1pvb21PbkNsaWNrID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnpvb21PbkNsaWNrXztcbn07XG5cbi8qKlxuICogV2hldGhlciBhdmVyYWdlIGNlbnRlciBpcyBzZXQuXG4gKlxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiBhdmVyYWdlQ2VudGVyXyBpcyBzZXQuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuaXNBdmVyYWdlQ2VudGVyID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmF2ZXJhZ2VDZW50ZXJfO1xufTtcblxuXG4vKipcbiAqICBSZXR1cm5zIHRoZSBhcnJheSBvZiBtYXJrZXJzIGluIHRoZSBjbHVzdGVyZXIuXG4gKlxuICogIEByZXR1cm4ge0FycmF5Ljxnb29nbGUubWFwcy5NYXJrZXI+fSBUaGUgbWFya2Vycy5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRNYXJrZXJzID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLm1hcmtlcnNfO1xufTtcblxuXG4vKipcbiAqICBSZXR1cm5zIHRoZSBudW1iZXIgb2YgbWFya2VycyBpbiB0aGUgY2x1c3RlcmVyXG4gKlxuICogIEByZXR1cm4ge051bWJlcn0gVGhlIG51bWJlciBvZiBtYXJrZXJzLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldFRvdGFsTWFya2VycyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5tYXJrZXJzXy5sZW5ndGg7XG59O1xuXG5cbi8qKlxuICogIFNldHMgdGhlIG1heCB6b29tIGZvciB0aGUgY2x1c3RlcmVyLlxuICpcbiAqICBAcGFyYW0ge251bWJlcn0gbWF4Wm9vbSBUaGUgbWF4IHpvb20gbGV2ZWwuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuc2V0TWF4Wm9vbSA9IGZ1bmN0aW9uKG1heFpvb20pIHtcbiAgdGhpcy5tYXhab29tXyA9IG1heFpvb207XG59O1xuXG5cbi8qKlxuICogIEdldHMgdGhlIG1heCB6b29tIGZvciB0aGUgY2x1c3RlcmVyLlxuICpcbiAqICBAcmV0dXJuIHtudW1iZXJ9IFRoZSBtYXggem9vbSBsZXZlbC5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRNYXhab29tID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLm1heFpvb21fO1xufTtcblxuXG4vKipcbiAqICBUaGUgZnVuY3Rpb24gZm9yIGNhbGN1bGF0aW5nIHRoZSBjbHVzdGVyIGljb24gaW1hZ2UuXG4gKlxuICogIEBwYXJhbSB7QXJyYXkuPGdvb2dsZS5tYXBzLk1hcmtlcj59IG1hcmtlcnMgVGhlIG1hcmtlcnMgaW4gdGhlIGNsdXN0ZXJlci5cbiAqICBAcGFyYW0ge251bWJlcn0gbnVtU3R5bGVzIFRoZSBudW1iZXIgb2Ygc3R5bGVzIGF2YWlsYWJsZS5cbiAqICBAcmV0dXJuIHtPYmplY3R9IEEgb2JqZWN0IHByb3BlcnRpZXM6ICd0ZXh0JyAoc3RyaW5nKSBhbmQgJ2luZGV4JyAobnVtYmVyKS5cbiAqICBAcHJpdmF0ZVxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmNhbGN1bGF0b3JfID0gZnVuY3Rpb24obWFya2VycywgbnVtU3R5bGVzKSB7XG4gIHZhciBpbmRleCA9IDA7XG4gIHZhciBjb3VudCA9IG1hcmtlcnMubGVuZ3RoO1xuICB2YXIgZHYgPSBjb3VudDtcbiAgd2hpbGUgKGR2ICE9PSAwKSB7XG4gICAgZHYgPSBwYXJzZUludChkdiAvIDEwLCAxMCk7XG4gICAgaW5kZXgrKztcbiAgfVxuXG4gIGluZGV4ID0gTWF0aC5taW4oaW5kZXgsIG51bVN0eWxlcyk7XG4gIHJldHVybiB7XG4gICAgdGV4dDogY291bnQsXG4gICAgaW5kZXg6IGluZGV4XG4gIH07XG59O1xuXG5cbi8qKlxuICogU2V0IHRoZSBjYWxjdWxhdG9yIGZ1bmN0aW9uLlxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oQXJyYXksIG51bWJlcil9IGNhbGN1bGF0b3IgVGhlIGZ1bmN0aW9uIHRvIHNldCBhcyB0aGVcbiAqICAgICBjYWxjdWxhdG9yLiBUaGUgZnVuY3Rpb24gc2hvdWxkIHJldHVybiBhIG9iamVjdCBwcm9wZXJ0aWVzOlxuICogICAgICd0ZXh0JyAoc3RyaW5nKSBhbmQgJ2luZGV4JyAobnVtYmVyKS5cbiAqXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuc2V0Q2FsY3VsYXRvciA9IGZ1bmN0aW9uKGNhbGN1bGF0b3IpIHtcbiAgdGhpcy5jYWxjdWxhdG9yXyA9IGNhbGN1bGF0b3I7XG59O1xuXG5cbi8qKlxuICogR2V0IHRoZSBjYWxjdWxhdG9yIGZ1bmN0aW9uLlxuICpcbiAqIEByZXR1cm4ge2Z1bmN0aW9uKEFycmF5LCBudW1iZXIpfSB0aGUgY2FsY3VsYXRvciBmdW5jdGlvbi5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRDYWxjdWxhdG9yID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmNhbGN1bGF0b3JfO1xufTtcblxuXG4vKipcbiAqIEFkZCBhbiBhcnJheSBvZiBtYXJrZXJzIHRvIHRoZSBjbHVzdGVyZXIuXG4gKlxuICogQHBhcmFtIHtBcnJheS48Z29vZ2xlLm1hcHMuTWFya2VyPn0gbWFya2VycyBUaGUgbWFya2VycyB0byBhZGQuXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSBvcHRfbm9kcmF3IFdoZXRoZXIgdG8gcmVkcmF3IHRoZSBjbHVzdGVycy5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5hZGRNYXJrZXJzID0gZnVuY3Rpb24obWFya2Vycywgb3B0X25vZHJhdykge1xuICBmb3IgKHZhciBpID0gMCwgbWFya2VyOyBtYXJrZXIgPSBtYXJrZXJzW2ldOyBpKyspIHtcbiAgICB0aGlzLnB1c2hNYXJrZXJUb18obWFya2VyKTtcbiAgfVxuICBpZiAoIW9wdF9ub2RyYXcpIHtcbiAgICB0aGlzLnJlZHJhdygpO1xuICB9XG59O1xuXG5cbi8qKlxuICogUHVzaGVzIGEgbWFya2VyIHRvIHRoZSBjbHVzdGVyZXIuXG4gKlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5NYXJrZXJ9IG1hcmtlciBUaGUgbWFya2VyIHRvIGFkZC5cbiAqIEBwcml2YXRlXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUucHVzaE1hcmtlclRvXyA9IGZ1bmN0aW9uKG1hcmtlcikge1xuICBtYXJrZXIuaXNBZGRlZCA9IGZhbHNlO1xuICBpZiAobWFya2VyWydkcmFnZ2FibGUnXSkge1xuICAgIC8vIElmIHRoZSBtYXJrZXIgaXMgZHJhZ2dhYmxlIGFkZCBhIGxpc3RlbmVyIHNvIHdlIHVwZGF0ZSB0aGUgY2x1c3RlcnMgb25cbiAgICAvLyB0aGUgZHJhZyBlbmQuXG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKG1hcmtlciwgJ2RyYWdlbmQnLCBmdW5jdGlvbigpIHtcbiAgICAgIG1hcmtlci5pc0FkZGVkID0gZmFsc2U7XG4gICAgICB0aGF0LnJlcGFpbnQoKTtcbiAgICB9KTtcbiAgfVxuICB0aGlzLm1hcmtlcnNfLnB1c2gobWFya2VyKTtcbn07XG5cblxuLyoqXG4gKiBBZGRzIGEgbWFya2VyIHRvIHRoZSBjbHVzdGVyZXIgYW5kIHJlZHJhd3MgaWYgbmVlZGVkLlxuICpcbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTWFya2VyfSBtYXJrZXIgVGhlIG1hcmtlciB0byBhZGQuXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSBvcHRfbm9kcmF3IFdoZXRoZXIgdG8gcmVkcmF3IHRoZSBjbHVzdGVycy5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5hZGRNYXJrZXIgPSBmdW5jdGlvbihtYXJrZXIsIG9wdF9ub2RyYXcpIHtcbiAgdGhpcy5wdXNoTWFya2VyVG9fKG1hcmtlcik7XG4gIGlmICghb3B0X25vZHJhdykge1xuICAgIHRoaXMucmVkcmF3KCk7XG4gIH1cbn07XG5cblxuLyoqXG4gKiBSZW1vdmVzIGEgbWFya2VyIGFuZCByZXR1cm5zIHRydWUgaWYgcmVtb3ZlZCwgZmFsc2UgaWYgbm90XG4gKlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5NYXJrZXJ9IG1hcmtlciBUaGUgbWFya2VyIHRvIHJlbW92ZVxuICogQHJldHVybiB7Ym9vbGVhbn0gV2hldGhlciB0aGUgbWFya2VyIHdhcyByZW1vdmVkIG9yIG5vdFxuICogQHByaXZhdGVcbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5yZW1vdmVNYXJrZXJfID0gZnVuY3Rpb24obWFya2VyKSB7XG4gIHZhciBpbmRleCA9IC0xO1xuICBpZiAodGhpcy5tYXJrZXJzXy5pbmRleE9mKSB7XG4gICAgaW5kZXggPSB0aGlzLm1hcmtlcnNfLmluZGV4T2YobWFya2VyKTtcbiAgfSBlbHNlIHtcbiAgICBmb3IgKHZhciBpID0gMCwgbTsgbSA9IHRoaXMubWFya2Vyc19baV07IGkrKykge1xuICAgICAgaWYgKG0gPT0gbWFya2VyKSB7XG4gICAgICAgIGluZGV4ID0gaTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKGluZGV4ID09IC0xKSB7XG4gICAgLy8gTWFya2VyIGlzIG5vdCBpbiBvdXIgbGlzdCBvZiBtYXJrZXJzLlxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIG1hcmtlci5zZXRNYXAobnVsbCk7XG5cbiAgdGhpcy5tYXJrZXJzXy5zcGxpY2UoaW5kZXgsIDEpO1xuXG4gIHJldHVybiB0cnVlO1xufTtcblxuXG4vKipcbiAqIFJlbW92ZSBhIG1hcmtlciBmcm9tIHRoZSBjbHVzdGVyLlxuICpcbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTWFya2VyfSBtYXJrZXIgVGhlIG1hcmtlciB0byByZW1vdmUuXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSBvcHRfbm9kcmF3IE9wdGlvbmFsIGJvb2xlYW4gdG8gZm9yY2Ugbm8gcmVkcmF3LlxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgbWFya2VyIHdhcyByZW1vdmVkLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnJlbW92ZU1hcmtlciA9IGZ1bmN0aW9uKG1hcmtlciwgb3B0X25vZHJhdykge1xuICB2YXIgcmVtb3ZlZCA9IHRoaXMucmVtb3ZlTWFya2VyXyhtYXJrZXIpO1xuXG4gIGlmICghb3B0X25vZHJhdyAmJiByZW1vdmVkKSB7XG4gICAgdGhpcy5yZXNldFZpZXdwb3J0KCk7XG4gICAgdGhpcy5yZWRyYXcoKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxuXG4vKipcbiAqIFJlbW92ZXMgYW4gYXJyYXkgb2YgbWFya2VycyBmcm9tIHRoZSBjbHVzdGVyLlxuICpcbiAqIEBwYXJhbSB7QXJyYXkuPGdvb2dsZS5tYXBzLk1hcmtlcj59IG1hcmtlcnMgVGhlIG1hcmtlcnMgdG8gcmVtb3ZlLlxuICogQHBhcmFtIHtib29sZWFuPX0gb3B0X25vZHJhdyBPcHRpb25hbCBib29sZWFuIHRvIGZvcmNlIG5vIHJlZHJhdy5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5yZW1vdmVNYXJrZXJzID0gZnVuY3Rpb24obWFya2Vycywgb3B0X25vZHJhdykge1xuICB2YXIgcmVtb3ZlZCA9IGZhbHNlO1xuXG4gIGZvciAodmFyIGkgPSAwLCBtYXJrZXI7IG1hcmtlciA9IG1hcmtlcnNbaV07IGkrKykge1xuICAgIHZhciByID0gdGhpcy5yZW1vdmVNYXJrZXJfKG1hcmtlcik7XG4gICAgcmVtb3ZlZCA9IHJlbW92ZWQgfHwgcjtcbiAgfVxuXG4gIGlmICghb3B0X25vZHJhdyAmJiByZW1vdmVkKSB7XG4gICAgdGhpcy5yZXNldFZpZXdwb3J0KCk7XG4gICAgdGhpcy5yZWRyYXcoKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTtcblxuXG4vKipcbiAqIFNldHMgdGhlIGNsdXN0ZXJlcidzIHJlYWR5IHN0YXRlLlxuICpcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gcmVhZHkgVGhlIHN0YXRlLlxuICogQHByaXZhdGVcbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5zZXRSZWFkeV8gPSBmdW5jdGlvbihyZWFkeSkge1xuICBpZiAoIXRoaXMucmVhZHlfKSB7XG4gICAgdGhpcy5yZWFkeV8gPSByZWFkeTtcbiAgICB0aGlzLmNyZWF0ZUNsdXN0ZXJzXygpO1xuICB9XG59O1xuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIGNsdXN0ZXJzIGluIHRoZSBjbHVzdGVyZXIuXG4gKlxuICogQHJldHVybiB7bnVtYmVyfSBUaGUgbnVtYmVyIG9mIGNsdXN0ZXJzLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldFRvdGFsQ2x1c3RlcnMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuY2x1c3RlcnNfLmxlbmd0aDtcbn07XG5cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBnb29nbGUgbWFwIHRoYXQgdGhlIGNsdXN0ZXJlciBpcyBhc3NvY2lhdGVkIHdpdGguXG4gKlxuICogQHJldHVybiB7Z29vZ2xlLm1hcHMuTWFwfSBUaGUgbWFwLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldE1hcCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5tYXBfO1xufTtcblxuXG4vKipcbiAqIFNldHMgdGhlIGdvb2dsZSBtYXAgdGhhdCB0aGUgY2x1c3RlcmVyIGlzIGFzc29jaWF0ZWQgd2l0aC5cbiAqXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLk1hcH0gbWFwIFRoZSBtYXAuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuc2V0TWFwID0gZnVuY3Rpb24obWFwKSB7XG4gIHRoaXMubWFwXyA9IG1hcDtcbn07XG5cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBzaXplIG9mIHRoZSBncmlkLlxuICpcbiAqIEByZXR1cm4ge251bWJlcn0gVGhlIGdyaWQgc2l6ZS5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRHcmlkU2l6ZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5ncmlkU2l6ZV87XG59O1xuXG5cbi8qKlxuICogU2V0cyB0aGUgc2l6ZSBvZiB0aGUgZ3JpZC5cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gc2l6ZSBUaGUgZ3JpZCBzaXplLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnNldEdyaWRTaXplID0gZnVuY3Rpb24oc2l6ZSkge1xuICB0aGlzLmdyaWRTaXplXyA9IHNpemU7XG59O1xuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgbWluIGNsdXN0ZXIgc2l6ZS5cbiAqXG4gKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSBncmlkIHNpemUuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0TWluQ2x1c3RlclNpemUgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMubWluQ2x1c3RlclNpemVfO1xufTtcblxuLyoqXG4gKiBTZXRzIHRoZSBtaW4gY2x1c3RlciBzaXplLlxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBzaXplIFRoZSBncmlkIHNpemUuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuc2V0TWluQ2x1c3RlclNpemUgPSBmdW5jdGlvbihzaXplKSB7XG4gIHRoaXMubWluQ2x1c3RlclNpemVfID0gc2l6ZTtcbn07XG5cblxuLyoqXG4gKiBFeHRlbmRzIGEgYm91bmRzIG9iamVjdCBieSB0aGUgZ3JpZCBzaXplLlxuICpcbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTGF0TG5nQm91bmRzfSBib3VuZHMgVGhlIGJvdW5kcyB0byBleHRlbmQuXG4gKiBAcmV0dXJuIHtnb29nbGUubWFwcy5MYXRMbmdCb3VuZHN9IFRoZSBleHRlbmRlZCBib3VuZHMuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0RXh0ZW5kZWRCb3VuZHMgPSBmdW5jdGlvbihib3VuZHMpIHtcbiAgdmFyIHByb2plY3Rpb24gPSB0aGlzLmdldFByb2plY3Rpb24oKTtcblxuICAvLyBUdXJuIHRoZSBib3VuZHMgaW50byBsYXRsbmcuXG4gIHZhciB0ciA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoYm91bmRzLmdldE5vcnRoRWFzdCgpLmxhdCgpLFxuICAgICAgYm91bmRzLmdldE5vcnRoRWFzdCgpLmxuZygpKTtcbiAgdmFyIGJsID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhib3VuZHMuZ2V0U291dGhXZXN0KCkubGF0KCksXG4gICAgICBib3VuZHMuZ2V0U291dGhXZXN0KCkubG5nKCkpO1xuXG4gIC8vIENvbnZlcnQgdGhlIHBvaW50cyB0byBwaXhlbHMgYW5kIHRoZSBleHRlbmQgb3V0IGJ5IHRoZSBncmlkIHNpemUuXG4gIHZhciB0clBpeCA9IHByb2plY3Rpb24uZnJvbUxhdExuZ1RvRGl2UGl4ZWwodHIpO1xuICB0clBpeC54ICs9IHRoaXMuZ3JpZFNpemVfO1xuICB0clBpeC55IC09IHRoaXMuZ3JpZFNpemVfO1xuXG4gIHZhciBibFBpeCA9IHByb2plY3Rpb24uZnJvbUxhdExuZ1RvRGl2UGl4ZWwoYmwpO1xuICBibFBpeC54IC09IHRoaXMuZ3JpZFNpemVfO1xuICBibFBpeC55ICs9IHRoaXMuZ3JpZFNpemVfO1xuXG4gIC8vIENvbnZlcnQgdGhlIHBpeGVsIHBvaW50cyBiYWNrIHRvIExhdExuZ1xuICB2YXIgbmUgPSBwcm9qZWN0aW9uLmZyb21EaXZQaXhlbFRvTGF0TG5nKHRyUGl4KTtcbiAgdmFyIHN3ID0gcHJvamVjdGlvbi5mcm9tRGl2UGl4ZWxUb0xhdExuZyhibFBpeCk7XG5cbiAgLy8gRXh0ZW5kIHRoZSBib3VuZHMgdG8gY29udGFpbiB0aGUgbmV3IGJvdW5kcy5cbiAgYm91bmRzLmV4dGVuZChuZSk7XG4gIGJvdW5kcy5leHRlbmQoc3cpO1xuXG4gIHJldHVybiBib3VuZHM7XG59O1xuXG5cbi8qKlxuICogRGV0ZXJtaW5zIGlmIGEgbWFya2VyIGlzIGNvbnRhaW5lZCBpbiBhIGJvdW5kcy5cbiAqXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLk1hcmtlcn0gbWFya2VyIFRoZSBtYXJrZXIgdG8gY2hlY2suXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLkxhdExuZ0JvdW5kc30gYm91bmRzIFRoZSBib3VuZHMgdG8gY2hlY2sgYWdhaW5zdC5cbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdGhlIG1hcmtlciBpcyBpbiB0aGUgYm91bmRzLlxuICogQHByaXZhdGVcbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5pc01hcmtlckluQm91bmRzXyA9IGZ1bmN0aW9uKG1hcmtlciwgYm91bmRzKSB7XG4gIHJldHVybiBib3VuZHMuY29udGFpbnMobWFya2VyLmdldFBvc2l0aW9uKCkpO1xufTtcblxuXG4vKipcbiAqIENsZWFycyBhbGwgY2x1c3RlcnMgYW5kIG1hcmtlcnMgZnJvbSB0aGUgY2x1c3RlcmVyLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmNsZWFyTWFya2VycyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnJlc2V0Vmlld3BvcnQodHJ1ZSk7XG5cbiAgLy8gU2V0IHRoZSBtYXJrZXJzIGEgZW1wdHkgYXJyYXkuXG4gIHRoaXMubWFya2Vyc18gPSBbXTtcbn07XG5cblxuLyoqXG4gKiBDbGVhcnMgYWxsIGV4aXN0aW5nIGNsdXN0ZXJzIGFuZCByZWNyZWF0ZXMgdGhlbS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0X2hpZGUgVG8gYWxzbyBoaWRlIHRoZSBtYXJrZXIuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUucmVzZXRWaWV3cG9ydCA9IGZ1bmN0aW9uKG9wdF9oaWRlKSB7XG4gIC8vIFJlbW92ZSBhbGwgdGhlIGNsdXN0ZXJzXG4gIGZvciAodmFyIGkgPSAwLCBjbHVzdGVyOyBjbHVzdGVyID0gdGhpcy5jbHVzdGVyc19baV07IGkrKykge1xuICAgIGNsdXN0ZXIucmVtb3ZlKCk7XG4gIH1cblxuICAvLyBSZXNldCB0aGUgbWFya2VycyB0byBub3QgYmUgYWRkZWQgYW5kIHRvIGJlIGludmlzaWJsZS5cbiAgZm9yICh2YXIgaSA9IDAsIG1hcmtlcjsgbWFya2VyID0gdGhpcy5tYXJrZXJzX1tpXTsgaSsrKSB7XG4gICAgbWFya2VyLmlzQWRkZWQgPSBmYWxzZTtcbiAgICBpZiAob3B0X2hpZGUpIHtcbiAgICAgIG1hcmtlci5zZXRNYXAobnVsbCk7XG4gICAgfVxuICB9XG5cbiAgdGhpcy5jbHVzdGVyc18gPSBbXTtcbn07XG5cbi8qKlxuICpcbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5yZXBhaW50ID0gZnVuY3Rpb24oKSB7XG4gIHZhciBvbGRDbHVzdGVycyA9IHRoaXMuY2x1c3RlcnNfLnNsaWNlKCk7XG4gIHRoaXMuY2x1c3RlcnNfLmxlbmd0aCA9IDA7XG4gIHRoaXMucmVzZXRWaWV3cG9ydCgpO1xuICB0aGlzLnJlZHJhdygpO1xuXG4gIC8vIFJlbW92ZSB0aGUgb2xkIGNsdXN0ZXJzLlxuICAvLyBEbyBpdCBpbiBhIHRpbWVvdXQgc28gdGhlIG90aGVyIGNsdXN0ZXJzIGhhdmUgYmVlbiBkcmF3biBmaXJzdC5cbiAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGNsdXN0ZXI7IGNsdXN0ZXIgPSBvbGRDbHVzdGVyc1tpXTsgaSsrKSB7XG4gICAgICBjbHVzdGVyLnJlbW92ZSgpO1xuICAgIH1cbiAgfSwgMCk7XG59O1xuXG5cbi8qKlxuICogUmVkcmF3cyB0aGUgY2x1c3RlcnMuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUucmVkcmF3ID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuY3JlYXRlQ2x1c3RlcnNfKCk7XG59O1xuXG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgZGlzdGFuY2UgYmV0d2VlbiB0d28gbGF0bG5nIGxvY2F0aW9ucyBpbiBrbS5cbiAqIEBzZWUgaHR0cDovL3d3dy5tb3ZhYmxlLXR5cGUuY28udWsvc2NyaXB0cy9sYXRsb25nLmh0bWxcbiAqXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLkxhdExuZ30gcDEgVGhlIGZpcnN0IGxhdCBsbmcgcG9pbnQuXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLkxhdExuZ30gcDIgVGhlIHNlY29uZCBsYXQgbG5nIHBvaW50LlxuICogQHJldHVybiB7bnVtYmVyfSBUaGUgZGlzdGFuY2UgYmV0d2VlbiB0aGUgdHdvIHBvaW50cyBpbiBrbS5cbiAqIEBwcml2YXRlXG4qL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5kaXN0YW5jZUJldHdlZW5Qb2ludHNfID0gZnVuY3Rpb24ocDEsIHAyKSB7XG4gIGlmICghcDEgfHwgIXAyKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICB2YXIgUiA9IDYzNzE7IC8vIFJhZGl1cyBvZiB0aGUgRWFydGggaW4ga21cbiAgdmFyIGRMYXQgPSAocDIubGF0KCkgLSBwMS5sYXQoKSkgKiBNYXRoLlBJIC8gMTgwO1xuICB2YXIgZExvbiA9IChwMi5sbmcoKSAtIHAxLmxuZygpKSAqIE1hdGguUEkgLyAxODA7XG4gIHZhciBhID0gTWF0aC5zaW4oZExhdCAvIDIpICogTWF0aC5zaW4oZExhdCAvIDIpICtcbiAgICBNYXRoLmNvcyhwMS5sYXQoKSAqIE1hdGguUEkgLyAxODApICogTWF0aC5jb3MocDIubGF0KCkgKiBNYXRoLlBJIC8gMTgwKSAqXG4gICAgTWF0aC5zaW4oZExvbiAvIDIpICogTWF0aC5zaW4oZExvbiAvIDIpO1xuICB2YXIgYyA9IDIgKiBNYXRoLmF0YW4yKE1hdGguc3FydChhKSwgTWF0aC5zcXJ0KDEgLSBhKSk7XG4gIHZhciBkID0gUiAqIGM7XG4gIHJldHVybiBkO1xufTtcblxuXG4vKipcbiAqIEFkZCBhIG1hcmtlciB0byBhIGNsdXN0ZXIsIG9yIGNyZWF0ZXMgYSBuZXcgY2x1c3Rlci5cbiAqXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLk1hcmtlcn0gbWFya2VyIFRoZSBtYXJrZXIgdG8gYWRkLlxuICogQHByaXZhdGVcbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5hZGRUb0Nsb3Nlc3RDbHVzdGVyXyA9IGZ1bmN0aW9uKG1hcmtlcikge1xuICB2YXIgZGlzdGFuY2UgPSA0MDAwMDsgLy8gU29tZSBsYXJnZSBudW1iZXJcbiAgdmFyIGNsdXN0ZXJUb0FkZFRvID0gbnVsbDtcbiAgdmFyIHBvcyA9IG1hcmtlci5nZXRQb3NpdGlvbigpO1xuICBmb3IgKHZhciBpID0gMCwgY2x1c3RlcjsgY2x1c3RlciA9IHRoaXMuY2x1c3RlcnNfW2ldOyBpKyspIHtcbiAgICB2YXIgY2VudGVyID0gY2x1c3Rlci5nZXRDZW50ZXIoKTtcbiAgICBpZiAoY2VudGVyKSB7XG4gICAgICB2YXIgZCA9IHRoaXMuZGlzdGFuY2VCZXR3ZWVuUG9pbnRzXyhjZW50ZXIsIG1hcmtlci5nZXRQb3NpdGlvbigpKTtcbiAgICAgIGlmIChkIDwgZGlzdGFuY2UpIHtcbiAgICAgICAgZGlzdGFuY2UgPSBkO1xuICAgICAgICBjbHVzdGVyVG9BZGRUbyA9IGNsdXN0ZXI7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKGNsdXN0ZXJUb0FkZFRvICYmIGNsdXN0ZXJUb0FkZFRvLmlzTWFya2VySW5DbHVzdGVyQm91bmRzKG1hcmtlcikpIHtcbiAgICBjbHVzdGVyVG9BZGRUby5hZGRNYXJrZXIobWFya2VyKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgY2x1c3RlciA9IG5ldyBDbHVzdGVyKHRoaXMpO1xuICAgIGNsdXN0ZXIuYWRkTWFya2VyKG1hcmtlcik7XG4gICAgdGhpcy5jbHVzdGVyc18ucHVzaChjbHVzdGVyKTtcbiAgfVxufTtcblxuXG4vKipcbiAqIENyZWF0ZXMgdGhlIGNsdXN0ZXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuY3JlYXRlQ2x1c3RlcnNfID0gZnVuY3Rpb24oKSB7XG4gIGlmICghdGhpcy5yZWFkeV8pIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBHZXQgb3VyIGN1cnJlbnQgbWFwIHZpZXcgYm91bmRzLlxuICAvLyBDcmVhdGUgYSBuZXcgYm91bmRzIG9iamVjdCBzbyB3ZSBkb24ndCBhZmZlY3QgdGhlIG1hcC5cbiAgdmFyIG1hcEJvdW5kcyA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmdCb3VuZHModGhpcy5tYXBfLmdldEJvdW5kcygpLmdldFNvdXRoV2VzdCgpLFxuICAgICAgdGhpcy5tYXBfLmdldEJvdW5kcygpLmdldE5vcnRoRWFzdCgpKTtcbiAgdmFyIGJvdW5kcyA9IHRoaXMuZ2V0RXh0ZW5kZWRCb3VuZHMobWFwQm91bmRzKTtcblxuICBmb3IgKHZhciBpID0gMCwgbWFya2VyOyBtYXJrZXIgPSB0aGlzLm1hcmtlcnNfW2ldOyBpKyspIHtcbiAgICBpZiAoIW1hcmtlci5pc0FkZGVkICYmIHRoaXMuaXNNYXJrZXJJbkJvdW5kc18obWFya2VyLCBib3VuZHMpKSB7XG4gICAgICB0aGlzLmFkZFRvQ2xvc2VzdENsdXN0ZXJfKG1hcmtlcik7XG4gICAgfVxuICB9XG59O1xuXG5cbi8qKlxuICogQSBjbHVzdGVyIHRoYXQgY29udGFpbnMgbWFya2Vycy5cbiAqXG4gKiBAcGFyYW0ge01hcmtlckNsdXN0ZXJlcn0gbWFya2VyQ2x1c3RlcmVyIFRoZSBtYXJrZXJjbHVzdGVyZXIgdGhhdCB0aGlzXG4gKiAgICAgY2x1c3RlciBpcyBhc3NvY2lhdGVkIHdpdGguXG4gKiBAY29uc3RydWN0b3JcbiAqIEBpZ25vcmVcbiAqL1xuZnVuY3Rpb24gQ2x1c3RlcihtYXJrZXJDbHVzdGVyZXIpIHtcbiAgdGhpcy5tYXJrZXJDbHVzdGVyZXJfID0gbWFya2VyQ2x1c3RlcmVyO1xuICB0aGlzLm1hcF8gPSBtYXJrZXJDbHVzdGVyZXIuZ2V0TWFwKCk7XG4gIHRoaXMuZ3JpZFNpemVfID0gbWFya2VyQ2x1c3RlcmVyLmdldEdyaWRTaXplKCk7XG4gIHRoaXMubWluQ2x1c3RlclNpemVfID0gbWFya2VyQ2x1c3RlcmVyLmdldE1pbkNsdXN0ZXJTaXplKCk7XG4gIHRoaXMuYXZlcmFnZUNlbnRlcl8gPSBtYXJrZXJDbHVzdGVyZXIuaXNBdmVyYWdlQ2VudGVyKCk7XG4gIHRoaXMuY2VudGVyXyA9IG51bGw7XG4gIHRoaXMubWFya2Vyc18gPSBbXTtcbiAgdGhpcy5ib3VuZHNfID0gbnVsbDtcbiAgdGhpcy5jbHVzdGVySWNvbl8gPSBuZXcgQ2x1c3Rlckljb24odGhpcywgbWFya2VyQ2x1c3RlcmVyLmdldFN0eWxlcygpLFxuICAgICAgbWFya2VyQ2x1c3RlcmVyLmdldEdyaWRTaXplKCkpO1xufVxuXG4vKipcbiAqIERldGVybWlucyBpZiBhIG1hcmtlciBpcyBhbHJlYWR5IGFkZGVkIHRvIHRoZSBjbHVzdGVyLlxuICpcbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTWFya2VyfSBtYXJrZXIgVGhlIG1hcmtlciB0byBjaGVjay5cbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdGhlIG1hcmtlciBpcyBhbHJlYWR5IGFkZGVkLlxuICovXG5DbHVzdGVyLnByb3RvdHlwZS5pc01hcmtlckFscmVhZHlBZGRlZCA9IGZ1bmN0aW9uKG1hcmtlcikge1xuICBpZiAodGhpcy5tYXJrZXJzXy5pbmRleE9mKSB7XG4gICAgcmV0dXJuIHRoaXMubWFya2Vyc18uaW5kZXhPZihtYXJrZXIpICE9IC0xO1xuICB9IGVsc2Uge1xuICAgIGZvciAodmFyIGkgPSAwLCBtOyBtID0gdGhpcy5tYXJrZXJzX1tpXTsgaSsrKSB7XG4gICAgICBpZiAobSA9PSBtYXJrZXIpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cblxuLyoqXG4gKiBBZGQgYSBtYXJrZXIgdGhlIGNsdXN0ZXIuXG4gKlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5NYXJrZXJ9IG1hcmtlciBUaGUgbWFya2VyIHRvIGFkZC5cbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdGhlIG1hcmtlciB3YXMgYWRkZWQuXG4gKi9cbkNsdXN0ZXIucHJvdG90eXBlLmFkZE1hcmtlciA9IGZ1bmN0aW9uKG1hcmtlcikge1xuICBpZiAodGhpcy5pc01hcmtlckFscmVhZHlBZGRlZChtYXJrZXIpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKCF0aGlzLmNlbnRlcl8pIHtcbiAgICB0aGlzLmNlbnRlcl8gPSBtYXJrZXIuZ2V0UG9zaXRpb24oKTtcbiAgICB0aGlzLmNhbGN1bGF0ZUJvdW5kc18oKTtcbiAgfSBlbHNlIHtcbiAgICBpZiAodGhpcy5hdmVyYWdlQ2VudGVyXykge1xuICAgICAgdmFyIGwgPSB0aGlzLm1hcmtlcnNfLmxlbmd0aCArIDE7XG4gICAgICB2YXIgbGF0ID0gKHRoaXMuY2VudGVyXy5sYXQoKSAqIChsLTEpICsgbWFya2VyLmdldFBvc2l0aW9uKCkubGF0KCkpIC8gbDtcbiAgICAgIHZhciBsbmcgPSAodGhpcy5jZW50ZXJfLmxuZygpICogKGwtMSkgKyBtYXJrZXIuZ2V0UG9zaXRpb24oKS5sbmcoKSkgLyBsO1xuICAgICAgdGhpcy5jZW50ZXJfID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhsYXQsIGxuZyk7XG4gICAgICB0aGlzLmNhbGN1bGF0ZUJvdW5kc18oKTtcbiAgICB9XG4gIH1cblxuICBtYXJrZXIuaXNBZGRlZCA9IHRydWU7XG4gIHRoaXMubWFya2Vyc18ucHVzaChtYXJrZXIpO1xuXG4gIHZhciBsZW4gPSB0aGlzLm1hcmtlcnNfLmxlbmd0aDtcbiAgaWYgKGxlbiA8IHRoaXMubWluQ2x1c3RlclNpemVfICYmIG1hcmtlci5nZXRNYXAoKSAhPSB0aGlzLm1hcF8pIHtcbiAgICAvLyBNaW4gY2x1c3RlciBzaXplIG5vdCByZWFjaGVkIHNvIHNob3cgdGhlIG1hcmtlci5cbiAgICBtYXJrZXIuc2V0TWFwKHRoaXMubWFwXyk7XG4gIH1cblxuICBpZiAobGVuID09IHRoaXMubWluQ2x1c3RlclNpemVfKSB7XG4gICAgLy8gSGlkZSB0aGUgbWFya2VycyB0aGF0IHdlcmUgc2hvd2luZy5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICB0aGlzLm1hcmtlcnNfW2ldLnNldE1hcChudWxsKTtcbiAgICB9XG4gIH1cblxuICBpZiAobGVuID49IHRoaXMubWluQ2x1c3RlclNpemVfKSB7XG4gICAgbWFya2VyLnNldE1hcChudWxsKTtcbiAgfVxuXG4gIHRoaXMudXBkYXRlSWNvbigpO1xuICByZXR1cm4gdHJ1ZTtcbn07XG5cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBtYXJrZXIgY2x1c3RlcmVyIHRoYXQgdGhlIGNsdXN0ZXIgaXMgYXNzb2NpYXRlZCB3aXRoLlxuICpcbiAqIEByZXR1cm4ge01hcmtlckNsdXN0ZXJlcn0gVGhlIGFzc29jaWF0ZWQgbWFya2VyIGNsdXN0ZXJlci5cbiAqL1xuQ2x1c3Rlci5wcm90b3R5cGUuZ2V0TWFya2VyQ2x1c3RlcmVyID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLm1hcmtlckNsdXN0ZXJlcl87XG59O1xuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgYm91bmRzIG9mIHRoZSBjbHVzdGVyLlxuICpcbiAqIEByZXR1cm4ge2dvb2dsZS5tYXBzLkxhdExuZ0JvdW5kc30gdGhlIGNsdXN0ZXIgYm91bmRzLlxuICovXG5DbHVzdGVyLnByb3RvdHlwZS5nZXRCb3VuZHMgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGJvdW5kcyA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmdCb3VuZHModGhpcy5jZW50ZXJfLCB0aGlzLmNlbnRlcl8pO1xuICB2YXIgbWFya2VycyA9IHRoaXMuZ2V0TWFya2VycygpO1xuICBmb3IgKHZhciBpID0gMCwgbWFya2VyOyBtYXJrZXIgPSBtYXJrZXJzW2ldOyBpKyspIHtcbiAgICBib3VuZHMuZXh0ZW5kKG1hcmtlci5nZXRQb3NpdGlvbigpKTtcbiAgfVxuICByZXR1cm4gYm91bmRzO1xufTtcblxuXG4vKipcbiAqIFJlbW92ZXMgdGhlIGNsdXN0ZXJcbiAqL1xuQ2x1c3Rlci5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuY2x1c3Rlckljb25fLnJlbW92ZSgpO1xuICB0aGlzLm1hcmtlcnNfLmxlbmd0aCA9IDA7XG4gIGRlbGV0ZSB0aGlzLm1hcmtlcnNfO1xufTtcblxuXG4vKipcbiAqIFJldHVybnMgdGhlIGNlbnRlciBvZiB0aGUgY2x1c3Rlci5cbiAqXG4gKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSBjbHVzdGVyIGNlbnRlci5cbiAqL1xuQ2x1c3Rlci5wcm90b3R5cGUuZ2V0U2l6ZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5tYXJrZXJzXy5sZW5ndGg7XG59O1xuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgY2VudGVyIG9mIHRoZSBjbHVzdGVyLlxuICpcbiAqIEByZXR1cm4ge0FycmF5Ljxnb29nbGUubWFwcy5NYXJrZXI+fSBUaGUgY2x1c3RlciBjZW50ZXIuXG4gKi9cbkNsdXN0ZXIucHJvdG90eXBlLmdldE1hcmtlcnMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMubWFya2Vyc187XG59O1xuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgY2VudGVyIG9mIHRoZSBjbHVzdGVyLlxuICpcbiAqIEByZXR1cm4ge2dvb2dsZS5tYXBzLkxhdExuZ30gVGhlIGNsdXN0ZXIgY2VudGVyLlxuICovXG5DbHVzdGVyLnByb3RvdHlwZS5nZXRDZW50ZXIgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuY2VudGVyXztcbn07XG5cblxuLyoqXG4gKiBDYWxjdWxhdGVkIHRoZSBleHRlbmRlZCBib3VuZHMgb2YgdGhlIGNsdXN0ZXIgd2l0aCB0aGUgZ3JpZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5DbHVzdGVyLnByb3RvdHlwZS5jYWxjdWxhdGVCb3VuZHNfID0gZnVuY3Rpb24oKSB7XG4gIHZhciBib3VuZHMgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nQm91bmRzKHRoaXMuY2VudGVyXywgdGhpcy5jZW50ZXJfKTtcbiAgdGhpcy5ib3VuZHNfID0gdGhpcy5tYXJrZXJDbHVzdGVyZXJfLmdldEV4dGVuZGVkQm91bmRzKGJvdW5kcyk7XG59O1xuXG5cbi8qKlxuICogRGV0ZXJtaW5lcyBpZiBhIG1hcmtlciBsaWVzIGluIHRoZSBjbHVzdGVycyBib3VuZHMuXG4gKlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5NYXJrZXJ9IG1hcmtlciBUaGUgbWFya2VyIHRvIGNoZWNrLlxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgbWFya2VyIGxpZXMgaW4gdGhlIGJvdW5kcy5cbiAqL1xuQ2x1c3Rlci5wcm90b3R5cGUuaXNNYXJrZXJJbkNsdXN0ZXJCb3VuZHMgPSBmdW5jdGlvbihtYXJrZXIpIHtcbiAgcmV0dXJuIHRoaXMuYm91bmRzXy5jb250YWlucyhtYXJrZXIuZ2V0UG9zaXRpb24oKSk7XG59O1xuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgbWFwIHRoYXQgdGhlIGNsdXN0ZXIgaXMgYXNzb2NpYXRlZCB3aXRoLlxuICpcbiAqIEByZXR1cm4ge2dvb2dsZS5tYXBzLk1hcH0gVGhlIG1hcC5cbiAqL1xuQ2x1c3Rlci5wcm90b3R5cGUuZ2V0TWFwID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLm1hcF87XG59O1xuXG5cbi8qKlxuICogVXBkYXRlcyB0aGUgY2x1c3RlciBpY29uXG4gKi9cbkNsdXN0ZXIucHJvdG90eXBlLnVwZGF0ZUljb24gPSBmdW5jdGlvbigpIHtcbiAgdmFyIHpvb20gPSB0aGlzLm1hcF8uZ2V0Wm9vbSgpO1xuICB2YXIgbXogPSB0aGlzLm1hcmtlckNsdXN0ZXJlcl8uZ2V0TWF4Wm9vbSgpO1xuXG4gIGlmIChteiAmJiB6b29tID4gbXopIHtcbiAgICAvLyBUaGUgem9vbSBpcyBncmVhdGVyIHRoYW4gb3VyIG1heCB6b29tIHNvIHNob3cgYWxsIHRoZSBtYXJrZXJzIGluIGNsdXN0ZXIuXG4gICAgZm9yICh2YXIgaSA9IDAsIG1hcmtlcjsgbWFya2VyID0gdGhpcy5tYXJrZXJzX1tpXTsgaSsrKSB7XG4gICAgICBtYXJrZXIuc2V0TWFwKHRoaXMubWFwXyk7XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmICh0aGlzLm1hcmtlcnNfLmxlbmd0aCA8IHRoaXMubWluQ2x1c3RlclNpemVfKSB7XG4gICAgLy8gTWluIGNsdXN0ZXIgc2l6ZSBub3QgeWV0IHJlYWNoZWQuXG4gICAgdGhpcy5jbHVzdGVySWNvbl8uaGlkZSgpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBudW1TdHlsZXMgPSB0aGlzLm1hcmtlckNsdXN0ZXJlcl8uZ2V0U3R5bGVzKCkubGVuZ3RoO1xuICB2YXIgc3VtcyA9IHRoaXMubWFya2VyQ2x1c3RlcmVyXy5nZXRDYWxjdWxhdG9yKCkodGhpcy5tYXJrZXJzXywgbnVtU3R5bGVzKTtcbiAgdGhpcy5jbHVzdGVySWNvbl8uc2V0Q2VudGVyKHRoaXMuY2VudGVyXyk7XG4gIHRoaXMuY2x1c3Rlckljb25fLnNldFN1bXMoc3Vtcyk7XG4gIHRoaXMuY2x1c3Rlckljb25fLnNob3coKTtcbn07XG5cblxuLyoqXG4gKiBBIGNsdXN0ZXIgaWNvblxuICpcbiAqIEBwYXJhbSB7Q2x1c3Rlcn0gY2x1c3RlciBUaGUgY2x1c3RlciB0byBiZSBhc3NvY2lhdGVkIHdpdGguXG4gKiBAcGFyYW0ge09iamVjdH0gc3R5bGVzIEFuIG9iamVjdCB0aGF0IGhhcyBzdHlsZSBwcm9wZXJ0aWVzOlxuICogICAgICd1cmwnOiAoc3RyaW5nKSBUaGUgaW1hZ2UgdXJsLlxuICogICAgICdoZWlnaHQnOiAobnVtYmVyKSBUaGUgaW1hZ2UgaGVpZ2h0LlxuICogICAgICd3aWR0aCc6IChudW1iZXIpIFRoZSBpbWFnZSB3aWR0aC5cbiAqICAgICAnYW5jaG9yJzogKEFycmF5KSBUaGUgYW5jaG9yIHBvc2l0aW9uIG9mIHRoZSBsYWJlbCB0ZXh0LlxuICogICAgICd0ZXh0Q29sb3InOiAoc3RyaW5nKSBUaGUgdGV4dCBjb2xvci5cbiAqICAgICAndGV4dFNpemUnOiAobnVtYmVyKSBUaGUgdGV4dCBzaXplLlxuICogICAgICAnZm9udEZhbWlseSc6IChzdHJpbmcpIFRoZSBmb250IGZhbWlseS5cbiAqICAgICAgJ2ZvbnRXZWlnaHQnOiAoc3RyaW5nKSBUaGUgZm9udCB3ZWlnaHQuXG4gKiAgICAgJ2JhY2tncm91bmRQb3NpdGlvbjogKHN0cmluZykgVGhlIGJhY2tncm91bmQgcG9zdGl0aW9uIHgsIHkuXG4gKiBAcGFyYW0ge251bWJlcj19IG9wdF9wYWRkaW5nIE9wdGlvbmFsIHBhZGRpbmcgdG8gYXBwbHkgdG8gdGhlIGNsdXN0ZXIgaWNvbi5cbiAqIEBjb25zdHJ1Y3RvclxuICogQGV4dGVuZHMgZ29vZ2xlLm1hcHMuT3ZlcmxheVZpZXdcbiAqIEBpZ25vcmVcbiAqL1xuZnVuY3Rpb24gQ2x1c3Rlckljb24oY2x1c3Rlciwgc3R5bGVzLCBvcHRfcGFkZGluZykge1xuICBjbHVzdGVyLmdldE1hcmtlckNsdXN0ZXJlcigpLmV4dGVuZChDbHVzdGVySWNvbiwgZ29vZ2xlLm1hcHMuT3ZlcmxheVZpZXcpO1xuXG4gIHRoaXMuc3R5bGVzXyA9IHN0eWxlcztcbiAgdGhpcy5wYWRkaW5nXyA9IG9wdF9wYWRkaW5nIHx8IDA7XG4gIHRoaXMuY2x1c3Rlcl8gPSBjbHVzdGVyO1xuICB0aGlzLmNlbnRlcl8gPSBudWxsO1xuICB0aGlzLm1hcF8gPSBjbHVzdGVyLmdldE1hcCgpO1xuICB0aGlzLmRpdl8gPSBudWxsO1xuICB0aGlzLnN1bXNfID0gbnVsbDtcbiAgdGhpcy52aXNpYmxlXyA9IGZhbHNlO1xuXG4gIHRoaXMuc2V0TWFwKHRoaXMubWFwXyk7XG59XG5cblxuLyoqXG4gKiBUcmlnZ2VycyB0aGUgY2x1c3RlcmNsaWNrIGV2ZW50IGFuZCB6b29tJ3MgaWYgdGhlIG9wdGlvbiBpcyBzZXQuXG4gKi9cbkNsdXN0ZXJJY29uLnByb3RvdHlwZS50cmlnZ2VyQ2x1c3RlckNsaWNrID0gZnVuY3Rpb24oKSB7XG4gIHZhciBtYXJrZXJDbHVzdGVyZXIgPSB0aGlzLmNsdXN0ZXJfLmdldE1hcmtlckNsdXN0ZXJlcigpO1xuXG4gIC8vIFRyaWdnZXIgdGhlIGNsdXN0ZXJjbGljayBldmVudC5cbiAgZ29vZ2xlLm1hcHMuZXZlbnQudHJpZ2dlcihtYXJrZXJDbHVzdGVyZXIsICdjbHVzdGVyY2xpY2snLCB0aGlzLmNsdXN0ZXJfKTtcblxuICBpZiAobWFya2VyQ2x1c3RlcmVyLmlzWm9vbU9uQ2xpY2soKSkge1xuICAgIC8vIFpvb20gaW50byB0aGUgY2x1c3Rlci5cbiAgICB0aGlzLm1hcF8uZml0Qm91bmRzKHRoaXMuY2x1c3Rlcl8uZ2V0Qm91bmRzKCkpO1xuICB9XG59O1xuXG5cbi8qKlxuICogQWRkaW5nIHRoZSBjbHVzdGVyIGljb24gdG8gdGhlIGRvbS5cbiAqIEBpZ25vcmVcbiAqL1xuQ2x1c3Rlckljb24ucHJvdG90eXBlLm9uQWRkID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuZGl2XyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xuICBpZiAodGhpcy52aXNpYmxlXykge1xuICAgIHZhciBwb3MgPSB0aGlzLmdldFBvc0Zyb21MYXRMbmdfKHRoaXMuY2VudGVyXyk7XG4gICAgdGhpcy5kaXZfLnN0eWxlLmNzc1RleHQgPSB0aGlzLmNyZWF0ZUNzcyhwb3MpO1xuICAgIHRoaXMuZGl2Xy5pbm5lckhUTUwgPSB0aGlzLnN1bXNfLnRleHQ7XG4gIH1cblxuICB2YXIgcGFuZXMgPSB0aGlzLmdldFBhbmVzKCk7XG4gIHBhbmVzLm92ZXJsYXlNb3VzZVRhcmdldC5hcHBlbmRDaGlsZCh0aGlzLmRpdl8pO1xuXG4gIHZhciB0aGF0ID0gdGhpcztcbiAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkRG9tTGlzdGVuZXIodGhpcy5kaXZfLCAnY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICB0aGF0LnRyaWdnZXJDbHVzdGVyQ2xpY2soKTtcbiAgfSk7XG59O1xuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgcG9zaXRpb24gdG8gcGxhY2UgdGhlIGRpdiBkZW5kaW5nIG9uIHRoZSBsYXRsbmcuXG4gKlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5MYXRMbmd9IGxhdGxuZyBUaGUgcG9zaXRpb24gaW4gbGF0bG5nLlxuICogQHJldHVybiB7Z29vZ2xlLm1hcHMuUG9pbnR9IFRoZSBwb3NpdGlvbiBpbiBwaXhlbHMuXG4gKiBAcHJpdmF0ZVxuICovXG5DbHVzdGVySWNvbi5wcm90b3R5cGUuZ2V0UG9zRnJvbUxhdExuZ18gPSBmdW5jdGlvbihsYXRsbmcpIHtcbiAgdmFyIHBvcyA9IHRoaXMuZ2V0UHJvamVjdGlvbigpLmZyb21MYXRMbmdUb0RpdlBpeGVsKGxhdGxuZyk7XG4gIHBvcy54IC09IHBhcnNlSW50KHRoaXMud2lkdGhfIC8gMiwgMTApO1xuICBwb3MueSAtPSBwYXJzZUludCh0aGlzLmhlaWdodF8gLyAyLCAxMCk7XG4gIHJldHVybiBwb3M7XG59O1xuXG5cbi8qKlxuICogRHJhdyB0aGUgaWNvbi5cbiAqIEBpZ25vcmVcbiAqL1xuQ2x1c3Rlckljb24ucHJvdG90eXBlLmRyYXcgPSBmdW5jdGlvbigpIHtcbiAgaWYgKHRoaXMudmlzaWJsZV8pIHtcbiAgICB2YXIgcG9zID0gdGhpcy5nZXRQb3NGcm9tTGF0TG5nXyh0aGlzLmNlbnRlcl8pO1xuICAgIHRoaXMuZGl2Xy5zdHlsZS50b3AgPSBwb3MueSArICdweCc7XG4gICAgdGhpcy5kaXZfLnN0eWxlLmxlZnQgPSBwb3MueCArICdweCc7XG4gIH1cbn07XG5cblxuLyoqXG4gKiBIaWRlIHRoZSBpY29uLlxuICovXG5DbHVzdGVySWNvbi5wcm90b3R5cGUuaGlkZSA9IGZ1bmN0aW9uKCkge1xuICBpZiAodGhpcy5kaXZfKSB7XG4gICAgdGhpcy5kaXZfLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIH1cbiAgdGhpcy52aXNpYmxlXyA9IGZhbHNlO1xufTtcblxuXG4vKipcbiAqIFBvc2l0aW9uIGFuZCBzaG93IHRoZSBpY29uLlxuICovXG5DbHVzdGVySWNvbi5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uKCkge1xuICBpZiAodGhpcy5kaXZfKSB7XG4gICAgdmFyIHBvcyA9IHRoaXMuZ2V0UG9zRnJvbUxhdExuZ18odGhpcy5jZW50ZXJfKTtcbiAgICB0aGlzLmRpdl8uc3R5bGUuY3NzVGV4dCA9IHRoaXMuY3JlYXRlQ3NzKHBvcyk7XG4gICAgdGhpcy5kaXZfLnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgfVxuICB0aGlzLnZpc2libGVfID0gdHJ1ZTtcbn07XG5cblxuLyoqXG4gKiBSZW1vdmUgdGhlIGljb24gZnJvbSB0aGUgbWFwXG4gKi9cbkNsdXN0ZXJJY29uLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5zZXRNYXAobnVsbCk7XG59O1xuXG5cbi8qKlxuICogSW1wbGVtZW50YXRpb24gb2YgdGhlIG9uUmVtb3ZlIGludGVyZmFjZS5cbiAqIEBpZ25vcmVcbiAqL1xuQ2x1c3Rlckljb24ucHJvdG90eXBlLm9uUmVtb3ZlID0gZnVuY3Rpb24oKSB7XG4gIGlmICh0aGlzLmRpdl8gJiYgdGhpcy5kaXZfLnBhcmVudE5vZGUpIHtcbiAgICB0aGlzLmhpZGUoKTtcbiAgICB0aGlzLmRpdl8ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLmRpdl8pO1xuICAgIHRoaXMuZGl2XyA9IG51bGw7XG4gIH1cbn07XG5cblxuLyoqXG4gKiBTZXQgdGhlIHN1bXMgb2YgdGhlIGljb24uXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHN1bXMgVGhlIHN1bXMgY29udGFpbmluZzpcbiAqICAgJ3RleHQnOiAoc3RyaW5nKSBUaGUgdGV4dCB0byBkaXNwbGF5IGluIHRoZSBpY29uLlxuICogICAnaW5kZXgnOiAobnVtYmVyKSBUaGUgc3R5bGUgaW5kZXggb2YgdGhlIGljb24uXG4gKi9cbkNsdXN0ZXJJY29uLnByb3RvdHlwZS5zZXRTdW1zID0gZnVuY3Rpb24oc3Vtcykge1xuICB0aGlzLnN1bXNfID0gc3VtcztcbiAgdGhpcy50ZXh0XyA9IHN1bXMudGV4dDtcbiAgdGhpcy5pbmRleF8gPSBzdW1zLmluZGV4O1xuICBpZiAodGhpcy5kaXZfKSB7XG4gICAgdGhpcy5kaXZfLmlubmVySFRNTCA9IHN1bXMudGV4dDtcbiAgfVxuXG4gIHRoaXMudXNlU3R5bGUoKTtcbn07XG5cblxuLyoqXG4gKiBTZXRzIHRoZSBpY29uIHRvIHRoZSB0aGUgc3R5bGVzLlxuICovXG5DbHVzdGVySWNvbi5wcm90b3R5cGUudXNlU3R5bGUgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGluZGV4ID0gTWF0aC5tYXgoMCwgdGhpcy5zdW1zXy5pbmRleCAtIDEpO1xuICBpbmRleCA9IE1hdGgubWluKHRoaXMuc3R5bGVzXy5sZW5ndGggLSAxLCBpbmRleCk7XG4gIHZhciBzdHlsZSA9IHRoaXMuc3R5bGVzX1tpbmRleF07XG4gIHRoaXMudXJsXyA9IHN0eWxlWyd1cmwnXTtcbiAgdGhpcy5oZWlnaHRfID0gc3R5bGVbJ2hlaWdodCddO1xuICB0aGlzLndpZHRoXyA9IHN0eWxlWyd3aWR0aCddO1xuICB0aGlzLnRleHRDb2xvcl8gPSBzdHlsZVsndGV4dENvbG9yJ107XG4gIHRoaXMuYW5jaG9yXyA9IHN0eWxlWydhbmNob3InXTtcbiAgdGhpcy50ZXh0U2l6ZV8gPSBzdHlsZVsndGV4dFNpemUnXTtcbiAgdGhpcy5mb250RmFtaWx5XyA9IHN0eWxlWydmb250RmFtaWx5J107XG4gIHRoaXMuZm9udFdlaWdodF8gPSBzdHlsZVsnZm9udFdlaWdodCddO1xuICB0aGlzLmJhY2tncm91bmRQb3NpdGlvbl8gPSBzdHlsZVsnYmFja2dyb3VuZFBvc2l0aW9uJ107XG59O1xuXG5cbi8qKlxuICogU2V0cyB0aGUgY2VudGVyIG9mIHRoZSBpY29uLlxuICpcbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTGF0TG5nfSBjZW50ZXIgVGhlIGxhdGxuZyB0byBzZXQgYXMgdGhlIGNlbnRlci5cbiAqL1xuQ2x1c3Rlckljb24ucHJvdG90eXBlLnNldENlbnRlciA9IGZ1bmN0aW9uKGNlbnRlcikge1xuICB0aGlzLmNlbnRlcl8gPSBjZW50ZXI7XG59O1xuXG5cbi8qKlxuICogQ3JlYXRlIHRoZSBjc3MgdGV4dCBiYXNlZCBvbiB0aGUgcG9zaXRpb24gb2YgdGhlIGljb24uXG4gKlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5Qb2ludH0gcG9zIFRoZSBwb3NpdGlvbi5cbiAqIEByZXR1cm4ge3N0cmluZ30gVGhlIGNzcyBzdHlsZSB0ZXh0LlxuICovXG5DbHVzdGVySWNvbi5wcm90b3R5cGUuY3JlYXRlQ3NzID0gZnVuY3Rpb24ocG9zKSB7XG4gIHZhciBzdHlsZSA9IFtdO1xuICBzdHlsZS5wdXNoKCdiYWNrZ3JvdW5kLWltYWdlOnVybCgnICsgdGhpcy51cmxfICsgJyk7Jyk7XG4gIHZhciBiYWNrZ3JvdW5kUG9zaXRpb24gPSB0aGlzLmJhY2tncm91bmRQb3NpdGlvbl8gPyB0aGlzLmJhY2tncm91bmRQb3NpdGlvbl8gOiAnMCAwJztcbiAgc3R5bGUucHVzaCgnYmFja2dyb3VuZC1wb3NpdGlvbjonICsgYmFja2dyb3VuZFBvc2l0aW9uICsgJzsnKTtcblxuICBpZiAodHlwZW9mIHRoaXMuYW5jaG9yXyA9PT0gJ29iamVjdCcpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMuYW5jaG9yX1swXSA9PT0gJ251bWJlcicgJiYgdGhpcy5hbmNob3JfWzBdID4gMCAmJlxuICAgICAgICB0aGlzLmFuY2hvcl9bMF0gPCB0aGlzLmhlaWdodF8pIHtcbiAgICAgIHN0eWxlLnB1c2goJ2hlaWdodDonICsgKHRoaXMuaGVpZ2h0XyAtIHRoaXMuYW5jaG9yX1swXSkgK1xuICAgICAgICAgICdweDsgcGFkZGluZy10b3A6JyArIHRoaXMuYW5jaG9yX1swXSArICdweDsnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3R5bGUucHVzaCgnaGVpZ2h0OicgKyB0aGlzLmhlaWdodF8gKyAncHg7IGxpbmUtaGVpZ2h0OicgKyB0aGlzLmhlaWdodF8gK1xuICAgICAgICAgICdweDsnKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB0aGlzLmFuY2hvcl9bMV0gPT09ICdudW1iZXInICYmIHRoaXMuYW5jaG9yX1sxXSA+IDAgJiZcbiAgICAgICAgdGhpcy5hbmNob3JfWzFdIDwgdGhpcy53aWR0aF8pIHtcbiAgICAgIHN0eWxlLnB1c2goJ3dpZHRoOicgKyAodGhpcy53aWR0aF8gLSB0aGlzLmFuY2hvcl9bMV0pICtcbiAgICAgICAgICAncHg7IHBhZGRpbmctbGVmdDonICsgdGhpcy5hbmNob3JfWzFdICsgJ3B4OycpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZS5wdXNoKCd3aWR0aDonICsgdGhpcy53aWR0aF8gKyAncHg7IHRleHQtYWxpZ246Y2VudGVyOycpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBzdHlsZS5wdXNoKCdoZWlnaHQ6JyArIHRoaXMuaGVpZ2h0XyArICdweDsgbGluZS1oZWlnaHQ6JyArXG4gICAgICAgIHRoaXMuaGVpZ2h0XyArICdweDsgd2lkdGg6JyArIHRoaXMud2lkdGhfICsgJ3B4OyB0ZXh0LWFsaWduOmNlbnRlcjsnKTtcbiAgfVxuXG4gIHZhciB0eHRDb2xvciA9IHRoaXMudGV4dENvbG9yXyA/IHRoaXMudGV4dENvbG9yXyA6ICdibGFjayc7XG4gIHZhciB0eHRTaXplID0gdGhpcy50ZXh0U2l6ZV8gPyB0aGlzLnRleHRTaXplXyA6IDExO1xuICB2YXIgZm9udEZhbWlseSA9IHRoaXMuZm9udEZhbWlseV8gPyB0aGlzLmZvbnRGYW1pbHlfIDogJ0FyaWFsLHNhbnMtc2VyaWYnO1xuICB2YXIgZm9udFdlaWdodCA9IHRoaXMuZm9udFdlaWdodF8gPyB0aGlzLmZvbnRXZWlnaHRfIDogJzQwMCc7XG5cbiAgc3R5bGUucHVzaCgnY3Vyc29yOnBvaW50ZXI7IHRvcDonICsgcG9zLnkgKyAncHg7IGxlZnQ6JyArXG4gICAgICBwb3MueCArICdweDsgY29sb3I6JyArIHR4dENvbG9yICsgJzsgcG9zaXRpb246YWJzb2x1dGU7IGZvbnQtc2l6ZTonICtcbiAgICAgIHR4dFNpemUgKyAncHg7IGZvbnQtZmFtaWx5OicgKyBmb250RmFtaWx5ICsgJzsgZm9udC13ZWlnaHQ6JyArIGZvbnRXZWlnaHQgKyAnOycpO1xuICByZXR1cm4gc3R5bGUuam9pbignJyk7XG59O1xuXG5cbi8vIEV4cG9ydCBTeW1ib2xzIGZvciBDbG9zdXJlXG4vLyBJZiB5b3UgYXJlIG5vdCBnb2luZyB0byBjb21waWxlIHdpdGggY2xvc3VyZSB0aGVuIHlvdSBjYW4gcmVtb3ZlIHRoZVxuLy8gY29kZSBiZWxvdy5cbmdsb2JhbFsnTWFya2VyQ2x1c3RlcmVyJ10gPSBNYXJrZXJDbHVzdGVyZXI7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydhZGRNYXJrZXInXSA9IE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuYWRkTWFya2VyO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnYWRkTWFya2VycyddID0gTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5hZGRNYXJrZXJzO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnY2xlYXJNYXJrZXJzJ10gPVxuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuY2xlYXJNYXJrZXJzO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnZml0TWFwVG9NYXJrZXJzJ10gPVxuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZml0TWFwVG9NYXJrZXJzO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnZ2V0Q2FsY3VsYXRvciddID1cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldENhbGN1bGF0b3I7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydnZXRHcmlkU2l6ZSddID1cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldEdyaWRTaXplO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnZ2V0RXh0ZW5kZWRCb3VuZHMnXSA9XG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRFeHRlbmRlZEJvdW5kcztcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ2dldE1hcCddID0gTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRNYXA7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydnZXRNYXJrZXJzJ10gPSBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldE1hcmtlcnM7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydnZXRNYXhab29tJ10gPSBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldE1heFpvb207XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydnZXRTdHlsZXMnXSA9IE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0U3R5bGVzO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnZ2V0VG90YWxDbHVzdGVycyddID1cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldFRvdGFsQ2x1c3RlcnM7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydnZXRUb3RhbE1hcmtlcnMnXSA9XG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRUb3RhbE1hcmtlcnM7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydyZWRyYXcnXSA9IE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUucmVkcmF3O1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsncmVtb3ZlTWFya2VyJ10gPVxuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUucmVtb3ZlTWFya2VyO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsncmVtb3ZlTWFya2VycyddID1cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnJlbW92ZU1hcmtlcnM7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydyZXNldFZpZXdwb3J0J10gPVxuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUucmVzZXRWaWV3cG9ydDtcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ3JlcGFpbnQnXSA9XG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5yZXBhaW50O1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnc2V0Q2FsY3VsYXRvciddID1cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnNldENhbGN1bGF0b3I7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydzZXRHcmlkU2l6ZSddID1cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnNldEdyaWRTaXplO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnc2V0TWF4Wm9vbSddID1cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnNldE1heFpvb207XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydvbkFkZCddID0gTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5vbkFkZDtcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ2RyYXcnXSA9IE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZHJhdztcblxuQ2x1c3Rlci5wcm90b3R5cGVbJ2dldENlbnRlciddID0gQ2x1c3Rlci5wcm90b3R5cGUuZ2V0Q2VudGVyO1xuQ2x1c3Rlci5wcm90b3R5cGVbJ2dldFNpemUnXSA9IENsdXN0ZXIucHJvdG90eXBlLmdldFNpemU7XG5DbHVzdGVyLnByb3RvdHlwZVsnZ2V0TWFya2VycyddID0gQ2x1c3Rlci5wcm90b3R5cGUuZ2V0TWFya2VycztcblxuQ2x1c3Rlckljb24ucHJvdG90eXBlWydvbkFkZCddID0gQ2x1c3Rlckljb24ucHJvdG90eXBlLm9uQWRkO1xuQ2x1c3Rlckljb24ucHJvdG90eXBlWydkcmF3J10gPSBDbHVzdGVySWNvbi5wcm90b3R5cGUuZHJhdztcbkNsdXN0ZXJJY29uLnByb3RvdHlwZVsnb25SZW1vdmUnXSA9IENsdXN0ZXJJY29uLnByb3RvdHlwZS5vblJlbW92ZTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IE1hcmtlckNsdXN0ZXJlcjtcbiIsIi8qKlxuICogalF1ZXJ5IEJhciBSYXRpbmcgUGx1Z2luIHYxLjIuMlxuICpcbiAqIGh0dHA6Ly9naXRodWIuY29tL2FudGVubmFpby9qcXVlcnktYmFyLXJhdGluZ1xuICpcbiAqIENvcHlyaWdodCAoYykgMjAxMi0yMDE2IEthemlrIFBpZXRydXN6ZXdza2lcbiAqXG4gKiBUaGlzIHBsdWdpbiBpcyBhdmFpbGFibGUgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuICogaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAqL1xuKGZ1bmN0aW9uIChmYWN0b3J5KSB7XG4gICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICAvLyBBTURcbiAgICAgICAgZGVmaW5lKFsnanF1ZXJ5J10sIGZhY3RvcnkpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICAgICAgLy8gTm9kZS9Db21tb25KU1xuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZSgnanF1ZXJ5JykpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGJyb3dzZXIgZ2xvYmFsc1xuICAgICAgICBmYWN0b3J5KGpRdWVyeSk7XG4gICAgfVxufShmdW5jdGlvbiAoJCkge1xuXG4gICAgdmFyIEJhclJhdGluZyA9IChmdW5jdGlvbigpIHtcblxuICAgICAgICBmdW5jdGlvbiBCYXJSYXRpbmcoKSB7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgICAgIC8vIHdyYXAgZWxlbWVudCBpbiBhIHdyYXBwZXIgZGl2XG4gICAgICAgICAgICB2YXIgd3JhcEVsZW1lbnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgY2xhc3NlcyA9IFsnYnItd3JhcHBlciddO1xuXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYub3B0aW9ucy50aGVtZSAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKCdici10aGVtZS0nICsgc2VsZi5vcHRpb25zLnRoZW1lKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLndyYXAoJCgnPGRpdiAvPicsIHtcbiAgICAgICAgICAgICAgICAgICAgJ2NsYXNzJzogY2xhc3Nlcy5qb2luKCcgJylcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyB1bndyYXAgZWxlbWVudFxuICAgICAgICAgICAgdmFyIHVud3JhcEVsZW1lbnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLnVud3JhcCgpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gZmluZCBvcHRpb24gYnkgdmFsdWVcbiAgICAgICAgICAgIHZhciBmaW5kT3B0aW9uID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoJC5pc051bWVyaWModmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gTWF0aC5mbG9vcih2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuICQoJ29wdGlvblt2YWx1ZT1cIicgKyB2YWx1ZSAgKyAnXCJdJywgc2VsZi4kZWxlbSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBnZXQgaW5pdGlhbCBvcHRpb25cbiAgICAgICAgICAgIHZhciBnZXRJbml0aWFsT3B0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIGluaXRpYWxSYXRpbmcgPSBzZWxmLm9wdGlvbnMuaW5pdGlhbFJhdGluZztcblxuICAgICAgICAgICAgICAgIGlmICghaW5pdGlhbFJhdGluZykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJCgnb3B0aW9uOnNlbGVjdGVkJywgc2VsZi4kZWxlbSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZpbmRPcHRpb24oaW5pdGlhbFJhdGluZyk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBnZXQgZW1wdHkgb3B0aW9uXG4gICAgICAgICAgICB2YXIgZ2V0RW1wdHlPcHRpb24gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgJGVtcHR5T3B0ID0gc2VsZi4kZWxlbS5maW5kKCdvcHRpb25bdmFsdWU9XCInICsgc2VsZi5vcHRpb25zLmVtcHR5VmFsdWUgKyAnXCJdJyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoISRlbXB0eU9wdC5sZW5ndGggJiYgc2VsZi5vcHRpb25zLmFsbG93RW1wdHkpIHtcbiAgICAgICAgICAgICAgICAgICAgJGVtcHR5T3B0ID0gJCgnPG9wdGlvbiAvPicsIHsgJ3ZhbHVlJzogc2VsZi5vcHRpb25zLmVtcHR5VmFsdWUgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRlbXB0eU9wdC5wcmVwZW5kVG8oc2VsZi4kZWxlbSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuICRlbXB0eU9wdDtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIGdldCBkYXRhXG4gICAgICAgICAgICB2YXIgZ2V0RGF0YSA9IGZ1bmN0aW9uKGtleSkge1xuICAgICAgICAgICAgICAgIHZhciBkYXRhID0gc2VsZi4kZWxlbS5kYXRhKCdiYXJyYXRpbmcnKTtcblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Yga2V5ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YVtrZXldO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gc2V0IGRhdGFcbiAgICAgICAgICAgIHZhciBzZXREYXRhID0gZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0uZGF0YSgnYmFycmF0aW5nJywgdmFsdWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0uZGF0YSgnYmFycmF0aW5nJylba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIHNhdmUgZGF0YSBvbiBlbGVtZW50XG4gICAgICAgICAgICB2YXIgc2F2ZURhdGFPbkVsZW1lbnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgJG9wdCA9IGdldEluaXRpYWxPcHRpb24oKTtcbiAgICAgICAgICAgICAgICB2YXIgJGVtcHR5T3B0ID0gZ2V0RW1wdHlPcHRpb24oKTtcblxuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9ICRvcHQudmFsKCk7XG4gICAgICAgICAgICAgICAgdmFyIHRleHQgPSAkb3B0LmRhdGEoJ2h0bWwnKSA/ICRvcHQuZGF0YSgnaHRtbCcpIDogJG9wdC50ZXh0KCk7XG5cbiAgICAgICAgICAgICAgICAvLyBpZiB0aGUgYWxsb3dFbXB0eSBvcHRpb24gaXMgbm90IHNldCBsZXQncyBjaGVjayBpZiBlbXB0eSBvcHRpb24gZXhpc3RzIGluIHRoZSBzZWxlY3QgZmllbGRcbiAgICAgICAgICAgICAgICB2YXIgYWxsb3dFbXB0eSA9IChzZWxmLm9wdGlvbnMuYWxsb3dFbXB0eSAhPT0gbnVsbCkgP1xuICAgICAgICAgICAgICAgICAgICBzZWxmLm9wdGlvbnMuYWxsb3dFbXB0eSA6XG4gICAgICAgICAgICAgICAgICAgICEhJGVtcHR5T3B0Lmxlbmd0aDtcblxuICAgICAgICAgICAgICAgIHZhciBlbXB0eVZhbHVlID0gKCRlbXB0eU9wdC5sZW5ndGgpID8gJGVtcHR5T3B0LnZhbCgpIDogbnVsbDtcbiAgICAgICAgICAgICAgICB2YXIgZW1wdHlUZXh0ID0gKCRlbXB0eU9wdC5sZW5ndGgpID8gJGVtcHR5T3B0LnRleHQoKSA6IG51bGw7XG5cbiAgICAgICAgICAgICAgICBzZXREYXRhKG51bGwsIHtcbiAgICAgICAgICAgICAgICAgICAgdXNlck9wdGlvbnM6IHNlbGYub3B0aW9ucyxcblxuICAgICAgICAgICAgICAgICAgICAvLyBpbml0aWFsIHJhdGluZyBiYXNlZCBvbiB0aGUgT1BUSU9OIHZhbHVlXG4gICAgICAgICAgICAgICAgICAgIHJhdGluZ1ZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgcmF0aW5nVGV4dDogdGV4dCxcblxuICAgICAgICAgICAgICAgICAgICAvLyByYXRpbmcgd2lsbCBiZSByZXN0b3JlZCBieSBjYWxsaW5nIGNsZWFyIG1ldGhvZFxuICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbFJhdGluZ1ZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxSYXRpbmdUZXh0OiB0ZXh0LFxuXG4gICAgICAgICAgICAgICAgICAgIC8vIGFsbG93IGVtcHR5IHJhdGluZ3M/XG4gICAgICAgICAgICAgICAgICAgIGFsbG93RW1wdHk6IGFsbG93RW1wdHksXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gcmF0aW5nIHZhbHVlIGFuZCB0ZXh0IG9mIHRoZSBlbXB0eSBPUFRJT05cbiAgICAgICAgICAgICAgICAgICAgZW1wdHlSYXRpbmdWYWx1ZTogZW1wdHlWYWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgZW1wdHlSYXRpbmdUZXh0OiBlbXB0eVRleHQsXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gcmVhZC1vbmx5IHN0YXRlXG4gICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiBzZWxmLm9wdGlvbnMucmVhZG9ubHksXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gZGlkIHRoZSB1c2VyIGFscmVhZHkgc2VsZWN0IGEgcmF0aW5nP1xuICAgICAgICAgICAgICAgICAgICByYXRpbmdNYWRlOiBmYWxzZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gcmVtb3ZlIGRhdGEgb24gZWxlbWVudFxuICAgICAgICAgICAgdmFyIHJlbW92ZURhdGFPbkVsZW1lbnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLnJlbW92ZURhdGEoJ2JhcnJhdGluZycpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gcmV0dXJuIGN1cnJlbnQgcmF0aW5nIHRleHRcbiAgICAgICAgICAgIHZhciByYXRpbmdUZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGdldERhdGEoJ3JhdGluZ1RleHQnKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIHJldHVybiBjdXJyZW50IHJhdGluZyB2YWx1ZVxuICAgICAgICAgICAgdmFyIHJhdGluZ1ZhbHVlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGdldERhdGEoJ3JhdGluZ1ZhbHVlJyk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBidWlsZCB3aWRnZXQgYW5kIHJldHVybiBqUXVlcnkgZWxlbWVudFxuICAgICAgICAgICAgdmFyIGJ1aWxkV2lkZ2V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyICR3ID0gJCgnPGRpdiAvPicsIHsgJ2NsYXNzJzogJ2JyLXdpZGdldCcgfSk7XG5cbiAgICAgICAgICAgICAgICAvLyBjcmVhdGUgQSBlbGVtZW50cyB0aGF0IHdpbGwgcmVwbGFjZSBPUFRJT05zXG4gICAgICAgICAgICAgICAgc2VsZi4kZWxlbS5maW5kKCdvcHRpb24nKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdmFsLCB0ZXh0LCBodG1sLCAkYTtcblxuICAgICAgICAgICAgICAgICAgICB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNyZWF0ZSByYXRpbmdzIC0gYnV0IG9ubHkgaWYgdmFsIGlzIG5vdCBkZWZpbmVkIGFzIGVtcHR5XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWwgIT09IGdldERhdGEoJ2VtcHR5UmF0aW5nVmFsdWUnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dCA9ICQodGhpcykudGV4dCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaHRtbCA9ICQodGhpcykuZGF0YSgnaHRtbCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGh0bWwpIHsgdGV4dCA9IGh0bWw7IH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgJGEgPSAkKCc8YSAvPicsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnaHJlZic6ICcjJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZGF0YS1yYXRpbmctdmFsdWUnOiB2YWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2RhdGEtcmF0aW5nLXRleHQnOiB0ZXh0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdodG1sJzogKHNlbGYub3B0aW9ucy5zaG93VmFsdWVzKSA/IHRleHQgOiAnJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICR3LmFwcGVuZCgkYSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgLy8gYXBwZW5kIC5ici1jdXJyZW50LXJhdGluZyBkaXYgdG8gdGhlIHdpZGdldFxuICAgICAgICAgICAgICAgIGlmIChzZWxmLm9wdGlvbnMuc2hvd1NlbGVjdGVkUmF0aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICR3LmFwcGVuZCgkKCc8ZGl2IC8+JywgeyAndGV4dCc6ICcnLCAnY2xhc3MnOiAnYnItY3VycmVudC1yYXRpbmcnIH0pKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBhZGRpdGlvbmFsIGNsYXNzZXMgZm9yIHRoZSB3aWRnZXRcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5vcHRpb25zLnJldmVyc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgJHcuYWRkQ2xhc3MoJ2JyLXJldmVyc2UnKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5vcHRpb25zLnJlYWRvbmx5KSB7XG4gICAgICAgICAgICAgICAgICAgICR3LmFkZENsYXNzKCdici1yZWFkb25seScpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiAkdztcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIHJldHVybiBhIGpRdWVyeSBmdW5jdGlvbiBuYW1lIGRlcGVuZGluZyBvbiB0aGUgJ3JldmVyc2UnIHNldHRpbmdcbiAgICAgICAgICAgIHZhciBuZXh0QWxsb3JQcmV2aW91c0FsbCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmIChnZXREYXRhKCd1c2VyT3B0aW9ucycpLnJldmVyc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICduZXh0QWxsJztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3ByZXZBbGwnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIHNldCB0aGUgdmFsdWUgb2YgdGhlIHNlbGVjdCBmaWVsZFxuICAgICAgICAgICAgdmFyIHNldFNlbGVjdEZpZWxkVmFsdWUgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgIC8vIGNoYW5nZSBzZWxlY3RlZCBvcHRpb25cbiAgICAgICAgICAgICAgICBmaW5kT3B0aW9uKHZhbHVlKS5wcm9wKCdzZWxlY3RlZCcsIHRydWUpO1xuXG4gICAgICAgICAgICAgICAgc2VsZi4kZWxlbS5jaGFuZ2UoKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIHJlc2V0IHNlbGVjdCBmaWVsZFxuICAgICAgICAgICAgdmFyIHJlc2V0U2VsZWN0RmllbGQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkKCdvcHRpb24nLCBzZWxmLiRlbGVtKS5wcm9wKCdzZWxlY3RlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kZWZhdWx0U2VsZWN0ZWQ7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLmNoYW5nZSgpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gZGlzcGxheSB0aGUgY3VycmVudGx5IHNlbGVjdGVkIHJhdGluZ1xuICAgICAgICAgICAgdmFyIHNob3dTZWxlY3RlZFJhdGluZyA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgICAgICAgICAgICAgICAvLyB0ZXh0IHVuZGVmaW5lZD9cbiAgICAgICAgICAgICAgICB0ZXh0ID0gdGV4dCA/IHRleHQgOiByYXRpbmdUZXh0KCk7XG5cbiAgICAgICAgICAgICAgICAvLyBzcGVjaWFsIGNhc2Ugd2hlbiB0aGUgc2VsZWN0ZWQgcmF0aW5nIGlzIGRlZmluZWQgYXMgZW1wdHlcbiAgICAgICAgICAgICAgICBpZiAodGV4dCA9PSBnZXREYXRhKCdlbXB0eVJhdGluZ1RleHQnKSkge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0ID0gJyc7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gdXBkYXRlIC5ici1jdXJyZW50LXJhdGluZyBkaXZcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5vcHRpb25zLnNob3dTZWxlY3RlZFJhdGluZykge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLnBhcmVudCgpLmZpbmQoJy5ici1jdXJyZW50LXJhdGluZycpLnRleHQodGV4dCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gcmV0dXJuIHJvdW5kZWQgZnJhY3Rpb24gb2YgYSB2YWx1ZSAoMTQuNCAtPiA0MCwgMC45OSAtPiA5MClcbiAgICAgICAgICAgIHZhciBmcmFjdGlvbiA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGgucm91bmQoKChNYXRoLmZsb29yKHZhbHVlICogMTApIC8gMTApICUgMSkgKiAxMDApO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gcmVtb3ZlIGFsbCBjbGFzc2VzIGZyb20gZWxlbWVudHNcbiAgICAgICAgICAgIHZhciByZXNldFN0eWxlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGFsbCBjbGFzc2VzIHN0YXJ0aW5nIHdpdGggYnItKlxuICAgICAgICAgICAgICAgIHNlbGYuJHdpZGdldC5maW5kKCdhJykucmVtb3ZlQ2xhc3MoZnVuY3Rpb24oaW5kZXgsIGNsYXNzZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChjbGFzc2VzLm1hdGNoKC8oXnxcXHMpYnItXFxTKy9nKSB8fCBbXSkuam9pbignICcpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gYXBwbHkgc3R5bGUgYnkgc2V0dGluZyBjbGFzc2VzIG9uIGVsZW1lbnRzXG4gICAgICAgICAgICB2YXIgYXBwbHlTdHlsZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciAkYSA9IHNlbGYuJHdpZGdldC5maW5kKCdhW2RhdGEtcmF0aW5nLXZhbHVlPVwiJyArIHJhdGluZ1ZhbHVlKCkgKyAnXCJdJyk7XG4gICAgICAgICAgICAgICAgdmFyIGluaXRpYWxSYXRpbmcgPSBnZXREYXRhKCd1c2VyT3B0aW9ucycpLmluaXRpYWxSYXRpbmc7XG4gICAgICAgICAgICAgICAgdmFyIGJhc2VWYWx1ZSA9ICQuaXNOdW1lcmljKHJhdGluZ1ZhbHVlKCkpID8gcmF0aW5nVmFsdWUoKSA6IDA7XG4gICAgICAgICAgICAgICAgdmFyIGYgPSBmcmFjdGlvbihpbml0aWFsUmF0aW5nKTtcbiAgICAgICAgICAgICAgICB2YXIgJGFsbCwgJGZyYWN0aW9uYWw7XG5cbiAgICAgICAgICAgICAgICByZXNldFN0eWxlKCk7XG5cbiAgICAgICAgICAgICAgICAvLyBhZGQgY2xhc3Nlc1xuICAgICAgICAgICAgICAgICRhLmFkZENsYXNzKCdici1zZWxlY3RlZCBici1jdXJyZW50JylbbmV4dEFsbG9yUHJldmlvdXNBbGwoKV0oKVxuICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2JyLXNlbGVjdGVkJyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWdldERhdGEoJ3JhdGluZ01hZGUnKSAmJiAkLmlzTnVtZXJpYyhpbml0aWFsUmF0aW5nKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoKGluaXRpYWxSYXRpbmcgPD0gYmFzZVZhbHVlKSB8fCAhZikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgJGFsbCA9IHNlbGYuJHdpZGdldC5maW5kKCdhJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgJGZyYWN0aW9uYWwgPSAoJGEubGVuZ3RoKSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAkYVsoZ2V0RGF0YSgndXNlck9wdGlvbnMnKS5yZXZlcnNlKSA/ICdwcmV2JyA6ICduZXh0J10oKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAkYWxsWyhnZXREYXRhKCd1c2VyT3B0aW9ucycpLnJldmVyc2UpID8gJ2xhc3QnIDogJ2ZpcnN0J10oKTtcblxuICAgICAgICAgICAgICAgICAgICAkZnJhY3Rpb25hbC5hZGRDbGFzcygnYnItZnJhY3Rpb25hbCcpO1xuICAgICAgICAgICAgICAgICAgICAkZnJhY3Rpb25hbC5hZGRDbGFzcygnYnItZnJhY3Rpb25hbC0nICsgZik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gY2hlY2sgaWYgdGhlIGVsZW1lbnQgaXMgZGVzZWxlY3RhYmxlP1xuICAgICAgICAgICAgdmFyIGlzRGVzZWxlY3RhYmxlID0gZnVuY3Rpb24oJGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWdldERhdGEoJ2FsbG93RW1wdHknKSB8fCAhZ2V0RGF0YSgndXNlck9wdGlvbnMnKS5kZXNlbGVjdGFibGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiAocmF0aW5nVmFsdWUoKSA9PSAkZWxlbWVudC5hdHRyKCdkYXRhLXJhdGluZy12YWx1ZScpKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIGhhbmRsZSBjbGljayBldmVudHNcbiAgICAgICAgICAgIHZhciBhdHRhY2hDbGlja0hhbmRsZXIgPSBmdW5jdGlvbigkZWxlbWVudHMpIHtcbiAgICAgICAgICAgICAgICAkZWxlbWVudHMub24oJ2NsaWNrLmJhcnJhdGluZycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciAkYSA9ICQodGhpcyksXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zID0gZ2V0RGF0YSgndXNlck9wdGlvbnMnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDtcblxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gJGEuYXR0cignZGF0YS1yYXRpbmctdmFsdWUnKTtcbiAgICAgICAgICAgICAgICAgICAgdGV4dCA9ICRhLmF0dHIoJ2RhdGEtcmF0aW5nLXRleHQnKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBpcyBjdXJyZW50IGFuZCBkZXNlbGVjdGFibGU/XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0Rlc2VsZWN0YWJsZSgkYSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gZ2V0RGF0YSgnZW1wdHlSYXRpbmdWYWx1ZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dCA9IGdldERhdGEoJ2VtcHR5UmF0aW5nVGV4dCcpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gcmVtZW1iZXIgc2VsZWN0ZWQgcmF0aW5nXG4gICAgICAgICAgICAgICAgICAgIHNldERhdGEoJ3JhdGluZ1ZhbHVlJywgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBzZXREYXRhKCdyYXRpbmdUZXh0JywgdGV4dCk7XG4gICAgICAgICAgICAgICAgICAgIHNldERhdGEoJ3JhdGluZ01hZGUnLCB0cnVlKTtcblxuICAgICAgICAgICAgICAgICAgICBzZXRTZWxlY3RGaWVsZFZhbHVlKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgc2hvd1NlbGVjdGVkUmF0aW5nKHRleHQpO1xuXG4gICAgICAgICAgICAgICAgICAgIGFwcGx5U3R5bGUoKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBvblNlbGVjdCBjYWxsYmFja1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLm9uU2VsZWN0LmNhbGwoXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmF0aW5nVmFsdWUoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhdGluZ1RleHQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50XG4gICAgICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gaGFuZGxlIG1vdXNlZW50ZXIgZXZlbnRzXG4gICAgICAgICAgICB2YXIgYXR0YWNoTW91c2VFbnRlckhhbmRsZXIgPSBmdW5jdGlvbigkZWxlbWVudHMpIHtcbiAgICAgICAgICAgICAgICAkZWxlbWVudHMub24oJ21vdXNlZW50ZXIuYmFycmF0aW5nJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciAkYSA9ICQodGhpcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmVzZXRTdHlsZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICRhLmFkZENsYXNzKCdici1hY3RpdmUnKVtuZXh0QWxsb3JQcmV2aW91c0FsbCgpXSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2JyLWFjdGl2ZScpO1xuXG4gICAgICAgICAgICAgICAgICAgIHNob3dTZWxlY3RlZFJhdGluZygkYS5hdHRyKCdkYXRhLXJhdGluZy10ZXh0JykpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gaGFuZGxlIG1vdXNlbGVhdmUgZXZlbnRzXG4gICAgICAgICAgICB2YXIgYXR0YWNoTW91c2VMZWF2ZUhhbmRsZXIgPSBmdW5jdGlvbigkZWxlbWVudHMpIHtcbiAgICAgICAgICAgICAgICBzZWxmLiR3aWRnZXQub24oJ21vdXNlbGVhdmUuYmFycmF0aW5nIGJsdXIuYmFycmF0aW5nJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHNob3dTZWxlY3RlZFJhdGluZygpO1xuICAgICAgICAgICAgICAgICAgICBhcHBseVN0eWxlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBzb21ld2hhdCBwcmltaXRpdmUgd2F5IHRvIHJlbW92ZSAzMDBtcyBjbGljayBkZWxheSBvbiB0b3VjaCBkZXZpY2VzXG4gICAgICAgICAgICAvLyBmb3IgYSBtb3JlIGFkdmFuY2VkIHNvbHV0aW9uIGNvbnNpZGVyIHNldHRpbmcgYGZhc3RDbGlja3NgIG9wdGlvbiB0byBmYWxzZVxuICAgICAgICAgICAgLy8gYW5kIHVzaW5nIGEgbGlicmFyeSBzdWNoIGFzIGZhc3RjbGljayAoaHR0cHM6Ly9naXRodWIuY29tL2Z0bGFicy9mYXN0Y2xpY2spXG4gICAgICAgICAgICB2YXIgZmFzdENsaWNrcyA9IGZ1bmN0aW9uKCRlbGVtZW50cykge1xuICAgICAgICAgICAgICAgICRlbGVtZW50cy5vbigndG91Y2hzdGFydC5iYXJyYXRpbmcnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmNsaWNrKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBkaXNhYmxlIGNsaWNrc1xuICAgICAgICAgICAgdmFyIGRpc2FibGVDbGlja3MgPSBmdW5jdGlvbigkZWxlbWVudHMpIHtcbiAgICAgICAgICAgICAgICAkZWxlbWVudHMub24oJ2NsaWNrLmJhcnJhdGluZycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB2YXIgYXR0YWNoSGFuZGxlcnMgPSBmdW5jdGlvbigkZWxlbWVudHMpIHtcbiAgICAgICAgICAgICAgICAvLyBhdHRhY2ggY2xpY2sgZXZlbnQgaGFuZGxlclxuICAgICAgICAgICAgICAgIGF0dGFjaENsaWNrSGFuZGxlcigkZWxlbWVudHMpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYub3B0aW9ucy5ob3ZlclN0YXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGF0dGFjaCBtb3VzZWVudGVyIGV2ZW50IGhhbmRsZXJcbiAgICAgICAgICAgICAgICAgICAgYXR0YWNoTW91c2VFbnRlckhhbmRsZXIoJGVsZW1lbnRzKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBhdHRhY2ggbW91c2VsZWF2ZSBldmVudCBoYW5kbGVyXG4gICAgICAgICAgICAgICAgICAgIGF0dGFjaE1vdXNlTGVhdmVIYW5kbGVyKCRlbGVtZW50cyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdmFyIGRldGFjaEhhbmRsZXJzID0gZnVuY3Rpb24oJGVsZW1lbnRzKSB7XG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGV2ZW50IGhhbmRsZXJzIGluIHRoZSBcIi5iYXJyYXRpbmdcIiBuYW1lc3BhY2VcbiAgICAgICAgICAgICAgICAkZWxlbWVudHMub2ZmKCcuYmFycmF0aW5nJyk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB2YXIgc2V0dXBIYW5kbGVycyA9IGZ1bmN0aW9uKHJlYWRvbmx5KSB7XG4gICAgICAgICAgICAgICAgdmFyICRlbGVtZW50cyA9IHNlbGYuJHdpZGdldC5maW5kKCdhJyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZmFzdENsaWNrcykge1xuICAgICAgICAgICAgICAgICAgICBmYXN0Q2xpY2tzKCRlbGVtZW50cyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHJlYWRvbmx5KSB7XG4gICAgICAgICAgICAgICAgICAgIGRldGFjaEhhbmRsZXJzKCRlbGVtZW50cyk7XG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVDbGlja3MoJGVsZW1lbnRzKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhdHRhY2hIYW5kbGVycygkZWxlbWVudHMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMuc2hvdyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIC8vIHJ1biBvbmx5IG9uY2VcbiAgICAgICAgICAgICAgICBpZiAoZ2V0RGF0YSgpKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICAvLyB3cmFwIGVsZW1lbnRcbiAgICAgICAgICAgICAgICB3cmFwRWxlbWVudCgpO1xuXG4gICAgICAgICAgICAgICAgLy8gc2F2ZSBkYXRhXG4gICAgICAgICAgICAgICAgc2F2ZURhdGFPbkVsZW1lbnQoKTtcblxuICAgICAgICAgICAgICAgIC8vIGJ1aWxkICYgYXBwZW5kIHdpZGdldCB0byB0aGUgRE9NXG4gICAgICAgICAgICAgICAgc2VsZi4kd2lkZ2V0ID0gYnVpbGRXaWRnZXQoKTtcbiAgICAgICAgICAgICAgICBzZWxmLiR3aWRnZXQuaW5zZXJ0QWZ0ZXIoc2VsZi4kZWxlbSk7XG5cbiAgICAgICAgICAgICAgICBhcHBseVN0eWxlKCk7XG5cbiAgICAgICAgICAgICAgICBzaG93U2VsZWN0ZWRSYXRpbmcoKTtcblxuICAgICAgICAgICAgICAgIHNldHVwSGFuZGxlcnMoc2VsZi5vcHRpb25zLnJlYWRvbmx5KTtcblxuICAgICAgICAgICAgICAgIC8vIGhpZGUgdGhlIHNlbGVjdCBmaWVsZFxuICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0uaGlkZSgpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy5yZWFkb25seSA9IGZ1bmN0aW9uKHN0YXRlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzdGF0ZSAhPT0gJ2Jvb2xlYW4nIHx8IGdldERhdGEoJ3JlYWRPbmx5JykgPT0gc3RhdGUpIHJldHVybjtcblxuICAgICAgICAgICAgICAgIHNldHVwSGFuZGxlcnMoc3RhdGUpO1xuICAgICAgICAgICAgICAgIHNldERhdGEoJ3JlYWRPbmx5Jywgc3RhdGUpO1xuICAgICAgICAgICAgICAgIHNlbGYuJHdpZGdldC50b2dnbGVDbGFzcygnYnItcmVhZG9ubHknKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMuc2V0ID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgb3B0aW9ucyA9IGdldERhdGEoJ3VzZXJPcHRpb25zJyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoc2VsZi4kZWxlbS5maW5kKCdvcHRpb25bdmFsdWU9XCInICsgdmFsdWUgKyAnXCJdJykubGVuZ3RoID09PSAwKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICAvLyBzZXQgZGF0YVxuICAgICAgICAgICAgICAgIHNldERhdGEoJ3JhdGluZ1ZhbHVlJywgdmFsdWUpO1xuICAgICAgICAgICAgICAgIHNldERhdGEoJ3JhdGluZ1RleHQnLCBzZWxmLiRlbGVtLmZpbmQoJ29wdGlvblt2YWx1ZT1cIicgKyB2YWx1ZSArICdcIl0nKS50ZXh0KCkpO1xuICAgICAgICAgICAgICAgIHNldERhdGEoJ3JhdGluZ01hZGUnLCB0cnVlKTtcblxuICAgICAgICAgICAgICAgIHNldFNlbGVjdEZpZWxkVmFsdWUocmF0aW5nVmFsdWUoKSk7XG4gICAgICAgICAgICAgICAgc2hvd1NlbGVjdGVkUmF0aW5nKHJhdGluZ1RleHQoKSk7XG5cbiAgICAgICAgICAgICAgICBhcHBseVN0eWxlKCk7XG5cbiAgICAgICAgICAgICAgICAvLyBvblNlbGVjdCBjYWxsYmFja1xuICAgICAgICAgICAgICAgIGlmICghb3B0aW9ucy5zaWxlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5vblNlbGVjdC5jYWxsKFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhdGluZ1ZhbHVlKCksXG4gICAgICAgICAgICAgICAgICAgICAgICByYXRpbmdUZXh0KClcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLmNsZWFyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSBnZXREYXRhKCd1c2VyT3B0aW9ucycpO1xuXG4gICAgICAgICAgICAgICAgLy8gcmVzdG9yZSBvcmlnaW5hbCBkYXRhXG4gICAgICAgICAgICAgICAgc2V0RGF0YSgncmF0aW5nVmFsdWUnLCBnZXREYXRhKCdvcmlnaW5hbFJhdGluZ1ZhbHVlJykpO1xuICAgICAgICAgICAgICAgIHNldERhdGEoJ3JhdGluZ1RleHQnLCBnZXREYXRhKCdvcmlnaW5hbFJhdGluZ1RleHQnKSk7XG4gICAgICAgICAgICAgICAgc2V0RGF0YSgncmF0aW5nTWFkZScsIGZhbHNlKTtcblxuICAgICAgICAgICAgICAgIHJlc2V0U2VsZWN0RmllbGQoKTtcbiAgICAgICAgICAgICAgICBzaG93U2VsZWN0ZWRSYXRpbmcocmF0aW5nVGV4dCgpKTtcblxuICAgICAgICAgICAgICAgIGFwcGx5U3R5bGUoKTtcblxuICAgICAgICAgICAgICAgIC8vIG9uQ2xlYXIgY2FsbGJhY2tcbiAgICAgICAgICAgICAgICBvcHRpb25zLm9uQ2xlYXIuY2FsbChcbiAgICAgICAgICAgICAgICAgICAgdGhpcyxcbiAgICAgICAgICAgICAgICAgICAgcmF0aW5nVmFsdWUoKSxcbiAgICAgICAgICAgICAgICAgICAgcmF0aW5nVGV4dCgpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMuZGVzdHJveSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IHJhdGluZ1ZhbHVlKCk7XG4gICAgICAgICAgICAgICAgdmFyIHRleHQgPSByYXRpbmdUZXh0KCk7XG4gICAgICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSBnZXREYXRhKCd1c2VyT3B0aW9ucycpO1xuXG4gICAgICAgICAgICAgICAgLy8gZGV0YWNoIGhhbmRsZXJzXG4gICAgICAgICAgICAgICAgZGV0YWNoSGFuZGxlcnMoc2VsZi4kd2lkZ2V0LmZpbmQoJ2EnKSk7XG5cbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgd2lkZ2V0XG4gICAgICAgICAgICAgICAgc2VsZi4kd2lkZ2V0LnJlbW92ZSgpO1xuXG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGRhdGFcbiAgICAgICAgICAgICAgICByZW1vdmVEYXRhT25FbGVtZW50KCk7XG5cbiAgICAgICAgICAgICAgICAvLyB1bndyYXAgdGhlIGVsZW1lbnRcbiAgICAgICAgICAgICAgICB1bndyYXBFbGVtZW50KCk7XG5cbiAgICAgICAgICAgICAgICAvLyBzaG93IHRoZSBlbGVtZW50XG4gICAgICAgICAgICAgICAgc2VsZi4kZWxlbS5zaG93KCk7XG5cbiAgICAgICAgICAgICAgICAvLyBvbkRlc3Ryb3kgY2FsbGJhY2tcbiAgICAgICAgICAgICAgICBvcHRpb25zLm9uRGVzdHJveS5jYWxsKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgdGV4dFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgQmFyUmF0aW5nLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKG9wdGlvbnMsIGVsZW0pIHtcbiAgICAgICAgICAgIHRoaXMuJGVsZW0gPSAkKGVsZW0pO1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zID0gJC5leHRlbmQoe30sICQuZm4uYmFycmF0aW5nLmRlZmF1bHRzLCBvcHRpb25zKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucztcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gQmFyUmF0aW5nO1xuICAgIH0pKCk7XG5cbiAgICAkLmZuLmJhcnJhdGluZyA9IGZ1bmN0aW9uIChtZXRob2QsIG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcGx1Z2luID0gbmV3IEJhclJhdGluZygpO1xuXG4gICAgICAgICAgICAvLyBwbHVnaW4gd29ya3Mgd2l0aCBzZWxlY3QgZmllbGRzXG4gICAgICAgICAgICBpZiAoISQodGhpcykuaXMoJ3NlbGVjdCcpKSB7XG4gICAgICAgICAgICAgICAgJC5lcnJvcignU29ycnksIHRoaXMgcGx1Z2luIG9ubHkgd29ya3Mgd2l0aCBzZWxlY3QgZmllbGRzLicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBtZXRob2Qgc3VwcGxpZWRcbiAgICAgICAgICAgIGlmIChwbHVnaW4uaGFzT3duUHJvcGVydHkobWV0aG9kKSkge1xuICAgICAgICAgICAgICAgIHBsdWdpbi5pbml0KG9wdGlvbnMsIHRoaXMpO1xuICAgICAgICAgICAgICAgIGlmIChtZXRob2QgPT09ICdzaG93Jykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGx1Z2luLnNob3cob3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gcGx1Z2luIGV4aXN0cz9cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBsdWdpbi4kZWxlbS5kYXRhKCdiYXJyYXRpbmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGx1Z2luLiR3aWRnZXQgPSAkKHRoaXMpLm5leHQoJy5ici13aWRnZXQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwbHVnaW5bbWV0aG9kXShvcHRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gbm8gbWV0aG9kIHN1cHBsaWVkIG9yIG9ubHkgb3B0aW9ucyBzdXBwbGllZFxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgbWV0aG9kID09PSAnb2JqZWN0JyB8fCAhbWV0aG9kKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucyA9IG1ldGhvZDtcbiAgICAgICAgICAgICAgICBwbHVnaW4uaW5pdChvcHRpb25zLCB0aGlzKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGx1Z2luLnNob3coKTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkLmVycm9yKCdNZXRob2QgJyArIG1ldGhvZCArICcgZG9lcyBub3QgZXhpc3Qgb24galF1ZXJ5LmJhcnJhdGluZycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgJC5mbi5iYXJyYXRpbmcuZGVmYXVsdHMgPSB7XG4gICAgICAgIHRoZW1lOicnLFxuICAgICAgICBpbml0aWFsUmF0aW5nOm51bGwsIC8vIGluaXRpYWwgcmF0aW5nXG4gICAgICAgIGFsbG93RW1wdHk6bnVsbCwgLy8gYWxsb3cgZW1wdHkgcmF0aW5ncz9cbiAgICAgICAgZW1wdHlWYWx1ZTonJywgLy8gdGhpcyBpcyB0aGUgZXhwZWN0ZWQgdmFsdWUgb2YgdGhlIGVtcHR5IHJhdGluZ1xuICAgICAgICBzaG93VmFsdWVzOmZhbHNlLCAvLyBkaXNwbGF5IHJhdGluZyB2YWx1ZXMgb24gdGhlIGJhcnM/XG4gICAgICAgIHNob3dTZWxlY3RlZFJhdGluZzp0cnVlLCAvLyBhcHBlbmQgYSBkaXYgd2l0aCBhIHJhdGluZyB0byB0aGUgd2lkZ2V0P1xuICAgICAgICBkZXNlbGVjdGFibGU6dHJ1ZSwgLy8gYWxsb3cgdG8gZGVzZWxlY3QgcmF0aW5ncz9cbiAgICAgICAgcmV2ZXJzZTpmYWxzZSwgLy8gcmV2ZXJzZSB0aGUgcmF0aW5nP1xuICAgICAgICByZWFkb25seTpmYWxzZSwgLy8gbWFrZSB0aGUgcmF0aW5nIHJlYWR5LW9ubHk/XG4gICAgICAgIGZhc3RDbGlja3M6dHJ1ZSwgLy8gcmVtb3ZlIDMwMG1zIGNsaWNrIGRlbGF5IG9uIHRvdWNoIGRldmljZXM/XG4gICAgICAgIGhvdmVyU3RhdGU6dHJ1ZSwgLy8gY2hhbmdlIHN0YXRlIG9uIGhvdmVyP1xuICAgICAgICBzaWxlbnQ6ZmFsc2UsIC8vIHN1cHJlc3MgY2FsbGJhY2tzIHdoZW4gY29udHJvbGxpbmcgcmF0aW5ncyBwcm9ncmFtYXRpY2FsbHlcbiAgICAgICAgb25TZWxlY3Q6ZnVuY3Rpb24gKHZhbHVlLCB0ZXh0LCBldmVudCkge1xuICAgICAgICB9LCAvLyBjYWxsYmFjayBmaXJlZCB3aGVuIGEgcmF0aW5nIGlzIHNlbGVjdGVkXG4gICAgICAgIG9uQ2xlYXI6ZnVuY3Rpb24gKHZhbHVlLCB0ZXh0KSB7XG4gICAgICAgIH0sIC8vIGNhbGxiYWNrIGZpcmVkIHdoZW4gYSByYXRpbmcgaXMgY2xlYXJlZFxuICAgICAgICBvbkRlc3Ryb3k6ZnVuY3Rpb24gKHZhbHVlLCB0ZXh0KSB7XG4gICAgICAgIH0gLy8gY2FsbGJhY2sgZmlyZWQgd2hlbiBhIHdpZGdldCBpcyBkZXN0cm95ZWRcbiAgICB9O1xuXG4gICAgJC5mbi5iYXJyYXRpbmcuQmFyUmF0aW5nID0gQmFyUmF0aW5nO1xuXG59KSk7XG4iLCIvKipcbiAqIEBwYWNrYWdlICAgIEtub3cgUmVzZXJ2YXRpb25zXG4gKiBAc3VicGFja2FnZSBTaXRlIEpTXG4gKiBAY29weXJpZ2h0ICAyMDIwIEhpZ2hsYW5kIFZpc2lvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIEBsaWNlbnNlICAgIFNlZSB0aGUgZmlsZSBcIkxJQ0VOU0UudHh0XCIgZm9yIHRoZSBmdWxsIGxpY2Vuc2UgZ292ZXJuaW5nIHRoaXMgY29kZS5cbiAqIEBhdXRob3IgICAgIEhhemVsIFdpbHNvbiA8aGF6ZWxAaGlnaGxhbmR2aXNpb24uY29tPlxuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG5sZXQgbGFuZztcbmxldCBzZWFyY2hkYXRhID0gW107XG5sZXQgc2VhcmNoRG9uZSA9IGZhbHNlO1xubGV0IGNhbGVuZGFyTG9hZGVkID0gZmFsc2U7XG5sZXQgc2F2ZWR3aWR0aCA9IGZhbHNlO1xubGV0IGxhcmdlO1xubGV0IHJlc2l6ZWQgPSBmYWxzZTtcblxuaWYgKCF3aW5kb3cubG9jYXRpb24ub3JpZ2luKVxuXHR3aW5kb3cubG9jYXRpb24ub3JpZ2luID0gd2luZG93LmxvY2F0aW9uLnByb3RvY29sICsgXCIvL1wiICsgd2luZG93LmxvY2F0aW9uLmhvc3Q7XG5jb25zdCBsaXZlc2l0ZSA9IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gKyAnLyc7XG5cbihmdW5jdGlvbiAoJCkge1xuXHQkKGZ1bmN0aW9uICgpIHtcblx0XHRGb3VuZGF0aW9uLmFkZFRvSnF1ZXJ5KCk7XG5cdFx0JChkb2N1bWVudCkuZm91bmRhdGlvbigpO1xuXHRcdGxhbmcgPSAkKCcja3ItbGFuZycpLmRhdGEoJ2tybGFuZycpO1xuXG5cdFx0Y2hlY2tTY3JlZW5XaWR0aCgpO1xuXHRcdCQod2luZG93KS5vbihcInJlc2l6ZVwiLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRjaGVja1NjcmVlbldpZHRoKClcblx0XHR9KTtcblxuXHRcdGNvbnN0IGJhcnMgPSAkKCcua3ItcmF0aW5nJyk7XG5cdFx0aWYgKGJhcnMubGVuZ3RoKSB7XG5cdFx0XHRiYXJzLmJhcnJhdGluZygnc2hvdycsIHtcblx0XHRcdFx0c2hvd1ZhbHVlczogICAgICAgICB0cnVlLFxuXHRcdFx0XHRzaG93U2VsZWN0ZWRSYXRpbmc6IGZhbHNlXG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHQkKGRvY3VtZW50KS5vbignc3VibWl0JywgJy5hamF4Zm9ybScsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRjb25zdCAkZm9ybSA9ICQodGhpcyk7XG5cdFx0XHQkLmFqYXgoe1xuXHRcdFx0XHR0eXBlOiAgICAgJ1BPU1QnLFxuXHRcdFx0XHR1cmw6ICAgICAgJGZvcm0uYXR0cignYWN0aW9uJykgKyAnJmxhbmc9JyArIGxhbmcsXG5cdFx0XHRcdGRhdGE6ICAgICAkZm9ybS5zZXJpYWxpemUoKSxcblx0XHRcdFx0ZGF0YVR5cGU6ICdqc29uJyxcblx0XHRcdFx0c3VjY2VzczogIGZ1bmN0aW9uIChyZXN1bHQpIHtcblx0XHRcdFx0XHRpZiAocmVzdWx0LnN1Y2Nlc3MpIHtcblx0XHRcdFx0XHRcdGlmIChyZXN1bHQuZGF0YSkge1xuXHRcdFx0XHRcdFx0XHRmb3JtUmVzcG9uc2UoJGZvcm0uYXR0cignaWQnKSwgcmVzdWx0LmRhdGEpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0d2luZG93LmxvY2F0aW9uLmhyZWYgPSBsaXZlc2l0ZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0JCgnLmtyLWFqYXgtbW9kYWwtZXJyb3ItbWVzc2FnZScpLmh0bWwocmVzdWx0Lm1lc3NhZ2UpO1xuXHRcdFx0XHRcdFx0Y29uc3QgJG1vZGFsID0gbmV3IEZvdW5kYXRpb24uUmV2ZWFsKCQoJyNLckFqYXhNb2RhbEVycm9yJykpO1xuXHRcdFx0XHRcdFx0JG1vZGFsLm9wZW4oKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGVycm9yOiAgICBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0JCgnLmtyLWFqYXgtbW9kYWwtZXJyb3ItbWVzc2FnZScpLmh0bWwoJ1NvcnJ5IGFuIGVycm9yIGhhcyBvY2N1cnJlZCwgcGxlYXNlIHRyeSBhZ2FpbicpO1xuXHRcdFx0XHRcdGNvbnN0ICRtb2RhbCA9IG5ldyBGb3VuZGF0aW9uLlJldmVhbCgkKCcjS3JBamF4TW9kYWxFcnJvcicpKTtcblx0XHRcdFx0XHQkbW9kYWwub3BlbigpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9KS5vbignc2hvdy56Zi5kcm9wZG93bicsICcja3Itc2VhcmNocmVnaW9uLWRyb3AnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHQkKFwiI2tyLXNlYXJjaHJlZ2lvbi1kcm9wXCIpLmNzcygnb3BhY2l0eScsICcxJyk7XG5cdFx0fSkub24oJ3Nob3cuemYuZHJvcGRvd24nLCAnI2tyLXNlYXJjaGd1ZXN0LWRyb3AnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHQkKCcja3Itc2VhcmNoZ3Vlc3QtZHJvcCcpLmNzcygnb3BhY2l0eScsICcxJyk7XG5cdFx0fSkub24oJ2hpZGUuemYuZHJvcGRvd24nLCAnI2tyLXNlYXJjaHJlZ2lvbi1kcm9wLCAja3Itc2VhcmNoZ3Vlc3QtZHJvcCcsIGZ1bmN0aW9uICgpIHtcblx0XHRcdCQoJ2JvZHknKS5jc3MoJ29wYWNpdHknLCAnMScpO1xuXHRcdH0pLm9uKCdoaWRlLnpmLmRyb3Bkb3duJywgJyNrci1xdW90ZS1mb3JtJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0JCgnI2d1ZXN0cycpLnRyaWdnZXIoJ2NoYW5nZScpO1xuXHRcdH0pLm9uKCdvcGVuLnpmLnJldmVhbCcsICcua3ItYWpheC1tb2RhbFtkYXRhLXJldmVhbF0nLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0Y29uc3QgbW9kYWxpZCA9IFwiI1wiICsgJCh0aGlzKS5hdHRyKCdpZCcpO1xuXHRcdFx0aWYgKCEkLnRyaW0oJChtb2RhbGlkKS5odG1sKCkpLmxlbmd0aCkge1xuXHRcdFx0XHRjb25zdCBhamF4dXJsID0gJCh0aGlzKS5kYXRhKCdhamF4dXJsJyk7XG5cdFx0XHRcdGlmIChhamF4dXJsKSB7XG5cdFx0XHRcdFx0JC5hamF4KHtcblx0XHRcdFx0XHRcdHR5cGU6ICAgICdQT1NUJyxcblx0XHRcdFx0XHRcdHVybDogICAgIGFqYXh1cmwsXG5cdFx0XHRcdFx0XHRzdWNjZXNzOiBmdW5jdGlvbiAoY29udGVudCkge1xuXHRcdFx0XHRcdFx0XHQkKG1vZGFsaWQpLmh0bWwoY29udGVudCkudHJpZ2dlcigncmVzaXplbWUuemYucmV2ZWFsJyk7XG5cdFx0XHRcdFx0XHRcdCQobW9kYWxpZCkuZm91bmRhdGlvbigpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSkub24oJ2NsaWNrJywgJy5mYXZzcGFuJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGNvbnN0ICR0aGlzID0gJCh0aGlzKTtcblxuXHRcdFx0JC5hamF4KHtcblx0XHRcdFx0dHlwZTogICAgICdQT1NUJyxcblx0XHRcdFx0dXJsOiAgICAgIGxpdmVzaXRlICsgJ2luZGV4LnBocD9vcHRpb249Y29tX2tub3dyZXMmdGFzaz1wcm9wZXJ0aWVzLmZhdm91cml0ZSZsYW5nPScgKyBsYW5nLFxuXHRcdFx0XHRkYXRhOiAgICAgeydwcm9wZXJ0eV9pZCc6ICR0aGlzLmRhdGEoJ3Byb3BlcnR5JyksICd2aWV3JzogJHRoaXMuZGF0YSgndmlldycpfSxcblx0XHRcdFx0ZGF0YVR5cGU6ICdqc29uJyxcblx0XHRcdFx0c3VjY2VzczogIGZ1bmN0aW9uIChyZXN1bHQpIHtcblx0XHRcdFx0XHRpZiAocmVzdWx0LnN1Y2Nlc3MpIHtcblx0XHRcdFx0XHRcdGlmIChyZXN1bHQuZGF0YS5hY3Rpb24gPT09ICdoaWRlbWUnKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IGVsZW1lbnQgPSBcIiNcIiArICR0aGlzLmZpbmQoJy5oYXMtdGlwJykuZGF0YSgndG9nZ2xlJyk7XG5cdFx0XHRcdFx0XHRcdCQoZWxlbWVudCkucmVtb3ZlKCk7XG5cdFx0XHRcdFx0XHRcdCR0aGlzLnBhcmVudHMoJy5rci1wcm9wZXJ0aWVzIC5rci1wcm9wZXJ0eSAuZmF2czpmaXJzdCcpLmhpZGUoJ3Nsb3cnKTtcblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAocmVzdWx0LmRhdGEuYWN0aW9uICE9PSAnbm9uZScpIHtcblx0XHRcdFx0XHRcdFx0Y29uc3QgJHRhcmdldCA9ICR0aGlzLmZpbmQoJ2kuZmEtaGVhcnQnKTtcblx0XHRcdFx0XHRcdFx0JHRhcmdldC50b2dnbGVDbGFzcygnaW4nKTtcblx0XHRcdFx0XHRcdFx0Y29uc3QgdmFsMSA9ICcjJyArICR0YXJnZXQuZGF0YSgndG9nZ2xlJyk7XG5cdFx0XHRcdFx0XHRcdCQodmFsMSkudGV4dChyZXN1bHQuZGF0YS5hY3Rpb24pLmhpZGUoKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0pLm9uKCdjbGljaycsICcuZ2V0UmVzcG9uc2VTZWFyY2gnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0Z2V0UHJvcGVydGllcygkKHRoaXMpLmRhdGEoJ2ZpZWxkJyksICQodGhpcykuZGF0YSgndmFsdWUnKSk7XG5cdFx0fSkub24oJ2NsaWNrJywgJy5rci1maWx0ZXJzLWNsb3NlJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdCQoJy5rci1maWx0ZXJzLnRvcCcpLmFkZENsYXNzKCdoaWRlbWUnKTtcblx0XHRcdCQodGhpcykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdH0pLm9uKCdjbGljaycsICcuc2lkZWJhciAua3ItZmlsdGVycyB1bC5maWx0ZXItc29ydC1saXN0IGxpLmhlYWQnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0JCh0aGlzKS5wYXJlbnQoKS5jaGlsZHJlbignbGkuY2hlY2tib3gnKS50b2dnbGUoKTtcblx0XHRcdCQodGhpcykudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdH0pLm9uKCdjbGljaycsICcjc2hvd2dhdGV3YXlzJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdCQoJyNrci1nYXRld2F5cycpLnRvZ2dsZUNsYXNzKCdoaWRlbWUnKTtcblx0XHR9KS5vbignY2xpY2snLCAnI2tyLXNob3ctc29ydGJ5JywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdCQoJy5rci1maWx0ZXJzLnRvcCcpLmFkZENsYXNzKCdoaWRlbWUnKTtcblx0XHRcdCQoJy5rci1zb3J0YnkudG9wJykudG9nZ2xlQ2xhc3MoJ2hpZGVtZScpO1xuXHRcdFx0c2V0QWN0aXZlTWVudSgnc29ydCcpO1xuXHRcdH0pLm9uKCdjbGljaycsICcja3Itc2hvdy1maWx0ZXJieScsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHQkKCcua3Itc29ydGJ5LnRvcCcpLmFkZENsYXNzKCdoaWRlbWUnKTtcblx0XHRcdCQoJy5rci1maWx0ZXJzLnRvcCcpLnRvZ2dsZUNsYXNzKCdoaWRlbWUnKTtcblx0XHRcdHNldEFjdGl2ZU1lbnUoJ2ZpbHRlcicpO1xuXHRcdH0pLm9uKCdjbGljaycsICcua3ItZmlsdGVycy1jbG9zZScsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHQkKCcua3ItZmlsdGVycy50b3AnKS5hZGRDbGFzcygnaGlkZW1lJyk7XG5cdFx0XHRzZXRBY3RpdmVNZW51KCdsaXN0Jyk7XG5cdFx0fSkub24oJ2NsaWNrJywgJy50b2dnbGVvdGhlcicsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHQkKHRoaXMpLmRhdGEoJ290aGVyJykudG9nZ2xlKCk7XG5cdFx0fSkub24oJ2NsaWNrJywgJyNrci1wcm9wZXJ0eS10YWJzIGFbaHJlZj1cIiNjYWxlbmRhclwiXScsIGZ1bmN0aW9uKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGlmICghY2FsZW5kYXJMb2FkZWQpIHtcblx0XHRcdFx0Y29uc3QgcGlkID0gJCh0aGlzKS5kYXRhKCdwaWQnKTtcblx0XHRcdFx0bG9hZENhbGVuZGFyKHBpZCk7XG5cdFx0XHRcdGNhbGVuZGFyTG9hZGVkID0gdHJ1ZTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdGlmICgkKCcua3ItcHJvcGVydGllcycpLmxlbmd0aCAmJiAhc2VhcmNoRG9uZSkge1xuXHRcdFx0Z2V0UHJvcGVydGllcygndmlldycsICQodGhpcykuZGF0YSgndmlldycpKTtcblx0XHR9XG5cblx0XHRsZXQgJHRhYnMgPSAkKCcudGFicycpO1xuXHRcdGlmICgkKCcja3ItcHJvcGVydHktdGFicycpLmxlbmd0aCAmJiAhY2FsZW5kYXJMb2FkZWQpIHtcblx0XHRcdCR0YWJzLmZpbmQoJ2EnKS5lYWNoKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0aWYgKCQodGhpcykuYXR0cignaHJlZicpID09PSBcIiNjYWxlbmRhclwiKSB7XG5cdFx0XHRcdFx0Y29uc3QgcGlkID0gJCh0aGlzKS5kYXRhKCdwaWQnKTtcblx0XHRcdFx0XHRsb2FkQ2FsZW5kYXIocGlkKTtcblx0XHRcdFx0XHRjYWxlbmRhckxvYWRlZCA9IHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblx0fSk7XG5cblx0JC5ldmVudC5zcGVjaWFsLnRvdWNoc3RhcnQgPSB7XG5cdFx0c2V0dXA6IGZ1bmN0aW9uIChfLCBucywgaGFuZGxlKSB7XG5cdFx0XHRpZiAobnMuaW5jbHVkZXMoXCJub1ByZXZlbnREZWZhdWx0XCIpKSB7XG5cdFx0XHRcdHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgaGFuZGxlLCB7cGFzc2l2ZTogZmFsc2V9KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgaGFuZGxlLCB7cGFzc2l2ZTogdHJ1ZX0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblx0JC5ldmVudC5zcGVjaWFsLnRvdWNobW92ZSA9IHtcblx0XHRzZXR1cDogZnVuY3Rpb24gKF8sIG5zLCBoYW5kbGUpIHtcblx0XHRcdGlmIChucy5pbmNsdWRlcyhcIm5vUHJldmVudERlZmF1bHRcIikpIHtcblx0XHRcdFx0dGhpcy5hZGRFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsIGhhbmRsZSwge3Bhc3NpdmU6IGZhbHNlfSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIiwgaGFuZGxlLCB7cGFzc2l2ZTogdHJ1ZX0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblxuXHRmdW5jdGlvbiBsb2FkQ2FsZW5kYXIocGlkKSB7XG5cdFx0JC5hamF4KHtcblx0XHRcdHR5cGU6ICAgICAnUE9TVCcsXG5cdFx0XHR1cmw6ICAgICAgbGl2ZXNpdGUgKyAnaW5kZXgucGhwP29wdGlvbj1jb21fa25vd3JlcyZ0YXNrPXByb3BlcnR5LmdlcmlhdHJpYyZsYW5nPScgKyBsYW5nLFxuXHRcdFx0ZGF0YVR5cGU6ICdodG1sJyxcblx0XHRcdGRhdGE6ICAgICB7XG5cdFx0XHRcdCdwaWQnOiBwaWRcblx0XHRcdH0sXG5cdFx0XHRzdWNjZXNzOiAgZnVuY3Rpb24gKGRhdGEpIHtcblx0XHRcdFx0JCgnI2NhbGVuZGFyLnRhYnMtcGFuZWwnKS5hcHBlbmQoZGF0YSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRmdW5jdGlvbiBmb3JtUmVzcG9uc2UoaWQsIGRhdGEpIHtcblx0XHRpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eSgncmVkaXJlY3QnKSkge1xuXHRcdFx0d2luZG93LmxvY2F0aW9uLnJlcGxhY2UoZGF0YS5yZWRpcmVjdCk7XG5cdFx0fSBlbHNlIGlmIChpZCA9PT0gJ2tyLWZvcm0tcGF5bWVudCcpIHtcblx0XHRcdGlmIChkYXRhLmhhc093blByb3BlcnR5KCdodG1sJykpIHtcblx0XHRcdFx0bGV0ICRtb2RhbCA9ICQoJyNrci1nYXRld2F5LW1vZGFsJyk7XG5cdFx0XHRcdCRtb2RhbC5odG1sKGRhdGEuaHRtbCkudHJpZ2dlcigncmVzaXplbWUuemYucmV2ZWFsJyk7XG5cdFx0XHRcdCRtb2RhbC5mb3VuZGF0aW9uKCdvcGVuJyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR3aW5kb3cubG9jYXRpb24uaHJlZiA9IGxpdmVzaXRlO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSBpZiAoaWQgPT09ICdrci1mb3JtLW1haWxjaGltcCcpIHtcblx0XHRcdCQoJyNyZXNwb25zZTInKS5odG1sKGRhdGEpO1xuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIGdldFByb3BlcnRpZXMoZmllbGQsIHZhbHVlKSB7XG5cdFx0JC5hamF4KHtcblx0XHRcdHVybDogICAgICBsaXZlc2l0ZSArICdpbmRleC5waHA/b3B0aW9uPWNvbV9rbm93cmVzJnZpZXc9cHJvcGVydGllcyZmb3JtYXQ9cmF3Jmxhbmc9JyArIGxhbmcsXG5cdFx0XHR0eXBlOiAgICAgJ1BPU1QnLFxuXHRcdFx0ZGF0YTogICAgIHsnZmllbGQnOiBmaWVsZCwgJ3ZhbHVlJzogdmFsdWV9LFxuXHRcdFx0ZGF0YVR5cGU6ICdqc29uJyxcblx0XHRcdHN1Y2Nlc3M6ICBmdW5jdGlvbiAoZGF0YSkge1xuXHRcdFx0XHRzZWFyY2hkYXRhID0gZGF0YTtcblx0XHRcdFx0aWYgKCFzZWFyY2hkYXRhKSB7XG5cdFx0XHRcdFx0d2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIG5vaW5zcGVjdGlvbiBPdmVybHlDb21wbGV4Qm9vbGVhbkV4cHJlc3Npb25KU1xuXHRcdFx0XHRpZiAoZmllbGQgPT09ICdvcmRlcicgfHwgZmllbGQgPT09ICd2aWV3JyB8fCBmaWVsZCA9PT0gJ2ZhdnMnIHx8IGZpZWxkID09PSAnbWFwJykge1xuXHRcdFx0XHRcdHNldEFjdGl2ZU1lbnUoc2VhcmNoZGF0YVsndmlldyddKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHNldFNlYXJjaERhdGEoc2VhcmNoZGF0YSwgZmllbGQpO1xuXHRcdFx0XHQkKCcuaGFzLXRpcCcpLmZvdW5kYXRpb24oKTtcblx0XHRcdFx0JCgnLmRyb3Bkb3duLXBhbmUnKS5mb3VuZGF0aW9uKCk7XG5cdFx0XHRcdGlmICghbGFyZ2UgJiYgZmllbGQgPT09ICdvcmRlcicpIHtcblx0XHRcdFx0XHQkKCcjc29ydGJ5JykudHJpZ2dlcignY2xpY2snKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRzZWFyY2hEb25lID0gdHJ1ZTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdGZ1bmN0aW9uIHNldFNlYXJjaERhdGEocmVzcG9uc2UsIGZpZWxkID0gJycpIHtcblx0XHRpZiAocmVzcG9uc2UpIHtcblx0XHRcdCQoJyNrci1wcm9wZXJ0aWVzLWRhdGEnKS5lbXB0eSgpLmZhZGVJbignc2xvdycpLmh0bWwocmVzcG9uc2VbJ2l0ZW1zJ10pLmZvdW5kYXRpb24oKTtcblx0XHRcdCQoJy5rci1wYWdlcicpLmh0bWwocmVzcG9uc2VbJ3BhZ2luYXRpb24nXSk7XG5cblx0XHRcdGlmIChsYXJnZSA9PT0gdHJ1ZSkge1xuXHRcdFx0XHQkKFwiI2tyLXByb3BlcnRpZXMtc2VhcmNoLW9mZi1jYW52YXNcIikuaHRtbCgnJyk7XG5cdFx0XHRcdCQoXCIja3ItcHJvcGVydGllcy1maWx0ZXJzLW9mZi1jYW52YXNcIikuaHRtbChyZXNwb25zZVsnZmlsdGVycyddKTtcblx0XHRcdFx0JChcIiNrci1wcm9wZXJ0aWVzLXNvcnRieS1vZmYtY2FudmFzXCIpLmh0bWwocmVzcG9uc2VbJ3NvcnRieSddKTtcblxuXHRcdFx0XHQvLyAkKFwiI2tyLXByb3BlcnRpZXMtZmlsdGVycy1vZmYtY2FudmFzXCIpLmh0bWwoJycpO1xuXHRcdFx0XHQvLyAkKFwiI2tyLXByb3BlcnRpZXMtc29ydGJ5LW9mZi1jYW52YXNcIikuaHRtbCgnJyk7XG5cdFx0XHRcdCQoXCIja3Itc2lkZWJhci1zZWFyY2hcIikuZW1wdHkoKS5odG1sKHJlc3BvbnNlWydzZWFyY2gnXSk7XG5cdFx0XHRcdC8vICQoJyNrci1wcm9wZXJ0aWVzLWZpbHRlcnMnKS5lbXB0eSgpLmh0bWwocmVzcG9uc2VbJ2ZpbHRlcnMnXSk7XG5cdFx0XHRcdC8vICQoJyNrci1wcm9wZXJ0aWVzLXNvcnRieScpLmVtcHR5KCkuaHRtbChyZXNwb25zZVsnc29ydGJ5J10pLmFkZENsYXNzKCdoaWRlbWUnKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdCQoJyNrci1wcm9wZXJ0aWVzLWZpbHRlcnMnKS5odG1sKCcnKTtcblx0XHRcdFx0JCgnI2tyLXByb3BlcnRpZXMtc29ydGJ5JykuaHRtbCgnJyk7XG5cdFx0XHRcdCQoXCIja3Itc2lkZWJhci1zZWFyY2hcIikuaHRtbCgnJyk7XG5cdFx0XHRcdCQoXCIja3ItcHJvcGVydGllcy1maWx0ZXJzLW9mZi1jYW52YXNcIikuaHRtbChyZXNwb25zZVsnZmlsdGVycyddKTtcblx0XHRcdFx0JChcIiNrci1wcm9wZXJ0aWVzLXNvcnRieS1vZmYtY2FudmFzXCIpLmh0bWwocmVzcG9uc2VbJ3NvcnRieSddKTtcblx0XHRcdFx0JChcIiNrci1wcm9wZXJ0aWVzLXNlYXJjaC1vZmYtY2FudmFzXCIpLmh0bWwocmVzcG9uc2VbJ3NlYXJjaCddKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHJlc3BvbnNlWydzZWFyY2gnXS5sZW5ndGggJiYgJCgnI2Fycml2YWxkc3AnKS5sZW5ndGgpIHtcblx0XHRcdFx0JCgnYm9keScpLnRyaWdnZXIoJ2luaXRhamF4c2VhcmNoJyk7XG5cdFx0XHR9XG5cblx0XHRcdCQoJy5zaWRlYmFyIC5rci1maWx0ZXJzIHVsLmZpbHRlci1zb3J0LWxpc3QgbGkuaGVhZCcpLmVhY2goZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRpZiAoJCh0aGlzKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcblx0XHRcdFx0XHQkKHRoaXMpLnBhcmVudCgpLmNoaWxkcmVuKCdsaS5jaGVja2JveCcpLnNob3coKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQkKHRoaXMpLnBhcmVudCgpLmNoaWxkcmVuKCdsaS5jaGVja2JveCcpLmhpZGUoKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdGlmIChmaWVsZCA9PT0gJ3BhZ2UnKSB7XG5cdFx0XHRcdHdpbmRvdy5zY3JvbGxUbygwLCAwKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiBzZXRBY3RpdmVNZW51KGl0ZW0pIHtcblx0XHRjb25zdCBiYXIgPSAkKCcua3Itc2VhcmNoYmFyJykuZmluZCgnbGknKTtcblx0XHQkLmVhY2goYmFyLCBmdW5jdGlvbiAoaW5kZXgsIGJhcikge1xuXHRcdFx0JChiYXIpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcblx0XHR9KTtcblxuXHRcdGNvbnN0IGVsZW1lbnQgPSAnLmtyLXNlYXJjaGJhciBsaS4nICsgaXRlbTtcblx0XHQkKGVsZW1lbnQpLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcblx0fVxuXG5cdC8vIFJldHVybiB0cnVlIGlmIHdpZHRoIGhhcyBjaGFuZ2VkXG5cdGZ1bmN0aW9uIHNjcmVlbldpZHRoSGFzQ2hhbmdlZCgpIHtcblx0XHRsYXJnZSA9IEZvdW5kYXRpb24uTWVkaWFRdWVyeS5hdExlYXN0KCdsYXJnZScpO1xuXHRcdGlmIChsYXJnZSAhPT0gc2F2ZWR3aWR0aCkge1xuXHRcdFx0c2F2ZWR3aWR0aCA9IGxhcmdlO1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fSBlbHNlXG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRmdW5jdGlvbiBjaGVja1NjcmVlbldpZHRoKCkge1xuXHRcdHJlc2l6ZWQgPSBmYWxzZTtcblx0XHRpZiAoc2NyZWVuV2lkdGhIYXNDaGFuZ2VkKCkgJiYgc2VhcmNoZGF0YVsnaXRlbXMnXSAmJiAhcmVzaXplZCkge1xuXHRcdFx0c2V0U2VhcmNoRGF0YShzZWFyY2hkYXRhKTtcblx0XHRcdHJlc2l6ZWQgPSB0cnVlO1xuXHRcdH1cblx0fVxuXG5cdCQuZXZlbnQuc3BlY2lhbC50b3VjaHN0YXJ0ID0ge1xuXHRcdHNldHVwOiBmdW5jdGlvbiAoXywgbnMsIGhhbmRsZSkge1xuXHRcdFx0aWYgKG5zLmluY2x1ZGVzKFwibm9QcmV2ZW50RGVmYXVsdFwiKSkge1xuXHRcdFx0XHR0aGlzLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIGhhbmRsZSwge3Bhc3NpdmU6IGZhbHNlfSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIGhhbmRsZSwge3Bhc3NpdmU6IHRydWV9KTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG5cdCQuZXZlbnQuc3BlY2lhbC50b3VjaG1vdmUgPSB7XG5cdFx0c2V0dXA6IGZ1bmN0aW9uIChfLCBucywgaGFuZGxlKSB7XG5cdFx0XHRpZiAobnMuaW5jbHVkZXMoXCJub1ByZXZlbnREZWZhdWx0XCIpKSB7XG5cdFx0XHRcdHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLCBoYW5kbGUsIHtwYXNzaXZlOiBmYWxzZX0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5hZGRFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsIGhhbmRsZSwge3Bhc3NpdmU6IHRydWV9KTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG59KGpRdWVyeSkpOyIsIi8qKlxuICogQHBhY2thZ2UgICAgS25vdyBSZXNlcnZhdGlvbnNcbiAqIEBzdWJwYWNrYWdlIFNpdGUgSlNcbiAqIEBjb3B5cmlnaHQgIDIwMjAgSGlnaGxhbmQgVmlzaW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogQGxpY2Vuc2UgICAgU2VlIHRoZSBmaWxlIFwiTElDRU5TRS50eHRcIiBmb3IgdGhlIGZ1bGwgbGljZW5zZSBnb3Zlcm5pbmcgdGhpcyBjb2RlLlxuICogQGF1dGhvciAgICAgSGF6ZWwgV2lsc29uIDxoYXplbEBoaWdobGFuZHZpc2lvbi5jb20+XG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoJCkge1xuXHRpZiAoIXdpbmRvdy5sb2NhdGlvbi5vcmlnaW4pXG5cdFx0d2luZG93LmxvY2F0aW9uLm9yaWdpbiA9IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCArIFwiLy9cIiArIHdpbmRvdy5sb2NhdGlvbi5ob3N0O1xuXG5cdGxldCBsYW5nID0gJChcIiNrci1sYW5nXCIpLmRhdGEoJ2tybGFuZycpO1xuXHRsZXQgbXlDb25maXJtLCAkbXlUYXNrO1xuXG5cdGNsYXNzIEtyY29uZmlybSB7XG5cdFx0Y29uc3RydWN0b3IoJGZvcm0pIHtcblx0XHRcdHRoaXMuZm9ybSA9ICRmb3JtO1xuXHRcdFx0dGhpcy5pbml0KCk7XG5cdFx0fVxuXG5cdFx0aW5pdCgpIHtcblx0XHRcdHRoaXMudXBkYXRlUXVvdGUodGhpcy5mb3JtKTtcblx0XHR9XG5cblx0XHR1cGRhdGVRdW90ZSgkZm9ybSkge1xuXHRcdFx0JG15VGFzayA9ICQoJyNteXRhc2snKTtcblx0XHRcdCRteVRhc2sudmFsKCdjb25maXJtLmNvbXB1dGUnKTtcblx0XHRcdGpRdWVyeS5hamF4KHtcblx0XHRcdFx0dHlwZTogICAgICdQT1NUJyxcblx0XHRcdFx0dXJsOiAgICAgICdpbmRleC5waHA/b3B0aW9uPWNvbV9rbm93cmVzJnRhc2s9Y29uZmlybS5jb21wdXRlJmxhbmc9JyArIGxhbmcsXG5cdFx0XHRcdGRhdGE6ICAgICAkZm9ybS5zZXJpYWxpemVBcnJheSgpLFxuXHRcdFx0XHRkYXRhVHlwZTogJ2pzb24nLFxuXHRcdFx0XHRzdWNjZXNzOiAgZnVuY3Rpb24gKHJlc3VsdCkge1xuXHRcdFx0XHRcdCRteVRhc2sudmFsKCdjb25maXJtLnBheW1lbnQnKTtcblx0XHRcdFx0XHRpZiAocmVzdWx0LnN1Y2Nlc3MpIHtcblx0XHRcdFx0XHRcdGNvbnN0IGRhdGEgPSByZXN1bHQuZGF0YTtcblx0XHRcdFx0XHRcdGlmIChkYXRhLmhhc093blByb3BlcnR5KCdyZWRpcmVjdCcpKSB7XG5cdFx0XHRcdFx0XHRcdHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKGRhdGEucmVkaXJlY3QpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0bGV0IGRpdjtcblx0XHRcdFx0XHRcdCQuZWFjaChyZXN1bHQuZGF0YS5yZXNwb25zZSwgZnVuY3Rpb24gKGtleSwgdmFsKSB7XG5cdFx0XHRcdFx0XHRcdCQoJy5oaWRlaW5pdGlhbCcpLnNob3coKTtcblx0XHRcdFx0XHRcdFx0ZGl2ID0gXCIjXCIgKyBrZXk7XG5cdFx0XHRcdFx0XHRcdCQoZGl2KS50ZXh0KHZhbCk7XG5cdFx0XHRcdFx0XHRcdCQoZGl2KS5odG1sKHZhbCk7XG5cdFx0XHRcdFx0XHRcdCQoZGl2KS52YWwodmFsKTtcblx0XHRcdFx0XHRcdFx0JChkaXYpLnNob3coKTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHQkKCcua3ItYWpheC1tb2RhbC1lcnJvci1tZXNzYWdlJykuaHRtbChyZXN1bHQubWVzc2FnZSk7XG5cdFx0XHRcdFx0XHRjb25zdCAkbW9kYWwgPSBuZXcgRm91bmRhdGlvbi5SZXZlYWwoJCgnI0tyQWpheE1vZGFsRXJyb3InKSk7XG5cdFx0XHRcdFx0XHQkbW9kYWwub3BlbigpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cblx0JChmdW5jdGlvbiAoKSB7XG5cdFx0bGV0ICRlbGVtZW50ID0gJCgnI2tyLWZvcm0tY29uZmlybScpO1xuXHRcdGlmICgkZWxlbWVudC5sZW5ndGgpIHtcblx0XHRcdG15Q29uZmlybSA9IG5ldyBLcmNvbmZpcm0oJGVsZW1lbnQpO1xuXHRcdH1cblx0XHQkZWxlbWVudC5vbignY2hhbmdlIGNsaWNrJywgJy5rci1jYWxjdWxhdGUnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0JGVsZW1lbnQgPSAkKCcja3ItZm9ybS1jb25maXJtJyk7XG5cdFx0XHRteUNvbmZpcm0udXBkYXRlUXVvdGUoJGVsZW1lbnQpO1xuXHRcdH0pO1xuXG5cdFx0JChkb2N1bWVudCkub24oJ2NsaWNrJywgJyNjaGVja3Rlcm1zJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGlmIChjaGVja1Rlcm1zKCkpIHtcblx0XHRcdFx0JCgnI2NoZWNrdGVybXMnKS50cmlnZ2VyKCdzdWJtaXQnKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fSk7XG5cblx0Ly8gbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG5cdGZ1bmN0aW9uIGNoZWNrVGVybXMoKSB7XG5cdFx0bGV0IHJlc3VsdCA9IHRydWU7XG5cdFx0Y29uc3QgdGVzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZ3JlZWNoZWNrJyk7XG5cdFx0Y29uc3QgdGVzdGMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWdyZWVjaGVja2MnKTtcblx0XHRjb25zdCB0ZXN0dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZ3JlZWNoZWNrdCcpO1xuXG5cdFx0Ly8gbm9pbnNwZWN0aW9uIEpTVW5yZXNvbHZlZFZhcmlhYmxlXG5cdFx0aWYgKHRlc3QgJiYgIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdrci1mb3JtLXBheW1lbnQnKS5hZ3JlZWNoZWNrLmNoZWNrZWQpIHtcblx0XHRcdHJlc3VsdCA9IGZhbHNlO1xuXHRcdH1cblx0XHQvLyBub2luc3BlY3Rpb24gSlNVbnJlc29sdmVkVmFyaWFibGVcblx0XHRpZiAodGVzdGMgJiYgIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdrci1mb3JtLXBheW1lbnQnKS5hZ3JlZWNoZWNrYy5jaGVja2VkKSB7XG5cdFx0XHRyZXN1bHQgPSBmYWxzZTtcblx0XHR9XG5cdFx0Ly8gbm9pbnNwZWN0aW9uIEpTVW5yZXNvbHZlZFZhcmlhYmxlXG5cdFx0aWYgKHRlc3R0ICYmICFkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgna3ItZm9ybS1wYXltZW50JykuYWdyZWVjaGVja3QuY2hlY2tlZCkge1xuXHRcdFx0cmVzdWx0ID0gZmFsc2U7XG5cdFx0fVxuXG5cdFx0aWYgKHJlc3VsdCkge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnN0ICRtb2RhbCA9IG5ldyBGb3VuZGF0aW9uLlJldmVhbCgkKCcjZXJyb3JNb2RhbCcpKTtcblx0XHRcdCRtb2RhbC5vcGVuKCk7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHR9XG59KGpRdWVyeSkpOyIsIi8qKlxuICogQHBhY2thZ2UgICAgS25vdyBSZXNlcnZhdGlvbnNcbiAqIEBzdWJwYWNrYWdlIFNpdGUgSlNcbiAqIEBjb3B5cmlnaHQgIDIwMjAgSGlnaGxhbmQgVmlzaW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogQGxpY2Vuc2UgICAgU2VlIHRoZSBmaWxlIFwiTElDRU5TRS50eHRcIiBmb3IgdGhlIGZ1bGwgbGljZW5zZSBnb3Zlcm5pbmcgdGhpcyBjb2RlLlxuICogQGF1dGhvciAgICAgSGF6ZWwgV2lsc29uIDxoYXplbEBoaWdobGFuZHZpc2lvbi5jb20+XG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbmlmICghd2luZG93LmxvY2F0aW9uLm9yaWdpbikge1xuXHR3aW5kb3cubG9jYXRpb24ub3JpZ2luID0gd2luZG93LmxvY2F0aW9uLnByb3RvY29sICsgXCIvL1wiICsgd2luZG93LmxvY2F0aW9uLmhvc3Q7XG59XG5cbihmdW5jdGlvbiAoJCkge1xuXHRsZXQgbXlLckRvYkVudHJ5O1xuXHRsZXQgdG9kYXk7XG5cdGxldCBrZXkgPSB7QkFDS1NQQUNFOiA4fTtcblxuXHRsZXQgc2V0dGluZ3MgPSB7XG5cdFx0Y3VzdG9tX3ZhbGlkYXRpb246ICAgICBmYWxzZSxcblx0XHRkYXlzX2luX21vbnRoOiAgICAgICAgIFszMSwgMjksIDMxLCAzMCwgMzEsIDMwLCAzMSwgMzEsIDMwLCAzMSwgMzAsIDMxXSxcblx0XHRkb2N1bWVudF9kYXRlOiAgICAgICAgIGZhbHNlLFxuXHRcdGVycm9yYm94X3g6ICAgICAgICAgICAgMSxcblx0XHRlcnJvcmJveF95OiAgICAgICAgICAgIDUsXG5cdFx0ZmllbGRfaGludF90ZXh0X2RheTogICAnREQnLFxuXHRcdGZpZWxkX2hpbnRfdGV4dF9tb250aDogJ01NJyxcblx0XHRmaWVsZF9oaW50X3RleHRfeWVhcjogICdZWVlZJyxcblx0XHRmaWVsZF9vcmRlcjogICAgICAgICAgICdETVknLFxuXHRcdGZpZWxkX3dpZHRoX2RheTogICAgICAgNixcblx0XHRmaWVsZF93aWR0aF9tb250aDogICAgIDYsXG5cdFx0ZmllbGRfd2lkdGhfeWVhcjogICAgICA3LFxuXHRcdGZpZWxkX3dpZHRoX3NlcDogICAgICAgMixcblx0XHRtaW5tYXg6ICAgICAgICAgICAgICAgICcnLFxuXHRcdG1pbl9kYXRlOiAgICAgICAgICAgICAgZmFsc2UsXG5cdFx0bWF4X2RhdGU6ICAgICAgICAgICAgICBmYWxzZSxcblx0XHRtaW5feWVhcjogICAgICAgICAgICAgIDE5MTAsXG5cdFx0bW9udGhfbmFtZTogICAgICAgICAgICBbXG5cdFx0XHQnSmFudWFyeScsICdGZWJydWFyeScsICdNYXJjaCcsICdBcHJpbCcsXG5cdFx0XHQnTWF5JywgJ0p1bmUnLCAnSnVseScsICdBdWd1c3QnLCAnU2VwdGVtYmVyJyxcblx0XHRcdCdPY3RvYmVyJywgJ05vdmVtYmVyJywgJ0RlY2VtYmVyJ10sXG5cdFx0b25fYmx1cjogICAgICAgICAgICAgICBmYWxzZSxcblx0XHRvbl9lcnJvcjogICAgICAgICAgICAgIGZhbHNlLFxuXHRcdG9uX2NoYW5nZTogICAgICAgICAgICAgZmFsc2UsXG5cdFx0cGFyc2VfZGF0ZTogICAgICAgICAgICB0cnVlLFxuXHRcdHNlcGFyYXRvcjogICAgICAgICAgICAgJy8nLFxuXHRcdHNob3dfZXJyb3JzOiAgICAgICAgICAgdHJ1ZSxcblx0XHRzaG93X2hpbnRzOiAgICAgICAgICAgIHRydWUsXG5cdFx0RV9EQVlfTkFOOiAgICAgICAgICAgICAnRGF5IG11c3QgYmUgYSBudW1iZXInLFxuXHRcdEVfREFZX1RPT19CSUc6ICAgICAgICAgJ0RheSBtdXN0IGJlIDEtMzEnLFxuXHRcdEVfREFZX1RPT19TTUFMTDogICAgICAgJ0RheSBtdXN0IGJlIDEtMzEnLFxuXHRcdEVfQkFEX0RBWV9GT1JfTU9OVEg6ICAgJ09ubHkgJWQgZGF5cyBpbiAlbSAleScsXG5cdFx0RV9NT05USF9OQU46ICAgICAgICAgICAnTW9udGggbXVzdCBiZSBhIG51bWJlcicsXG5cdFx0RV9NT05USF9UT09fQklHOiAgICAgICAnTW9udGggbXVzdCBiZSAxLTEyJyxcblx0XHRFX01PTlRIX1RPT19TTUFMTDogICAgICdNb250aCBjYW5ub3QgYmUgMCcsXG5cdFx0RV9ZRUFSX05BTjogICAgICAgICAgICAnWWVhciBtdXN0IGJlIGEgbnVtYmVyJyxcblx0XHRFX1lFQVJfTEVOR1RIOiAgICAgICAgICdZZWFyIG11c3QgYmUgNCBkaWdpdHMnLFxuXHRcdEVfWUVBUl9UT09fU01BTEw6ICAgICAgJ1llYXIgbXVzdCBub3QgYmUgYmVmb3JlICV5Jyxcblx0XHRFX01JTl9EQVRFOiAgICAgICAgICAgICdEYXRlIG11c3Qgbm90IGJlIGluIHRoZSBwYXN0Jyxcblx0XHRFX01BWF9EQVRFOiAgICAgICAgICAgICdEYXRlIG11c3Qgbm90IGJlIGluIHRoZSBmdXR1cmUnXG5cdH07XG5cblx0Y2xhc3MgS3JEb2JFbnRyeSB7XG5cdFx0Y29uc3RydWN0b3IoJGVsZW1lbnQsIG9wdGlvbnMpIHtcblx0XHRcdHRvZGF5ID0gS3JEb2JFbnRyeS5nZXRZbWQobmV3IERhdGUoKSk7XG5cblx0XHRcdHRoaXMuaW5wdXRfZGF5ID0gMDtcblx0XHRcdHRoaXMuaW5wdXRfbW9udGggPSAwO1xuXHRcdFx0dGhpcy5pbnB1dF95ZWFyID0gMDtcblx0XHRcdHRoaXMuJGVsZW1lbnQgPSAkZWxlbWVudDtcblx0XHRcdGlmIChvcHRpb25zKSB7XG5cdFx0XHRcdCQuZXh0ZW5kKHNldHRpbmdzLCBvcHRpb25zKTtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5pbml0KCk7XG5cdFx0fVxuXG5cdFx0c3RhdGljIGdldFltZChkYXRlKSB7XG5cdFx0XHRjb25zdCBtID0gZGF0ZS5nZXRNb250aCgpICsgMTtcblx0XHRcdGNvbnN0IGQgPSBkYXRlLmdldERheSgpO1xuXG5cdFx0XHRyZXR1cm4gKGRhdGUuZ2V0RnVsbFllYXIoKSArICctJyArIChtIDwgMTAgPyAnMCcgOiAnJykgKyBtICsgJy0nICsgKGQgPCAxMCA/ICcwJyA6ICcnKSArIGQpO1xuXHRcdH1cblxuXHRcdHN0YXRpYyBnZXRZbWRPYmplY3QoZGF0ZSkge1xuXHRcdFx0cmV0dXJuIChkYXRlLnllYXIgKyAnLScgKyBkYXRlLm1vbnRoICsgJy0nICsgZGF0ZS5kYXkpO1xuXHRcdH1cblxuXHRcdGFkZEVudHJ5RmllbGRzKCkge1xuXHRcdFx0bGV0IGRvYmZpZWxkID0gdGhpcztcblx0XHRcdGRvYmZpZWxkLmZpZWxkcyA9IFtdO1xuXHRcdFx0JC5lYWNoKHNldHRpbmdzLmZpZWxkX29yZGVyLnNwbGl0KCcnKSwgZnVuY3Rpb24gKGksIGZpZWxkKSB7XG5cdFx0XHRcdHN3aXRjaCAoZmllbGQpIHtcblx0XHRcdFx0XHRjYXNlICdEJzpcblx0XHRcdFx0XHRcdGRvYmZpZWxkLmJ1aWxkRmllbGQoJ2RheScsIGkpO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSAnTSc6XG5cdFx0XHRcdFx0XHRkb2JmaWVsZC5idWlsZEZpZWxkKCdtb250aCcsIGkpO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSAnWSc6XG5cdFx0XHRcdFx0XHRkb2JmaWVsZC5idWlsZEZpZWxkKCd5ZWFyJywgaSk7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRkZWZhdWx0IDpcblx0XHRcdFx0XHRcdHRocm93IFwiVW5leHBlY3RlZCBmaWVsZCBvcmRlciAnXCIgKyBmaWVsZCArIFwiJyBleHBlY3RlZCBELCBNIG9yIFlcIjtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0YWZ0ZXJQYXN0ZSh0YXJnZXQpIHtcblx0XHRcdGlmICh0aGlzLnBhcnNlRGF0ZSgkKHRhcmdldCkudmFsKCkpKSB7XG5cdFx0XHRcdHRoaXMuc2V0RGF0ZSgkKHRhcmdldCkudmFsKCkpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGJ1aWxkRmllbGQobmFtZSwgaW5kZXgpIHtcblx0XHRcdGxldCBrcmRvYmVudHJ5ID0gdGhpcztcblx0XHRcdGxldCBpbnB1dCA9IG5ldyBLckRvYklucHV0KHtcblx0XHRcdFx0bmFtZTogICAgICAgbmFtZSxcblx0XHRcdFx0a3Jkb2JlbnRyeToga3Jkb2JlbnRyeSxcblx0XHRcdFx0aW5kZXg6ICAgICAgaW5kZXgsXG5cdFx0XHRcdGhpbnRfdGV4dDogIHNldHRpbmdzLnNob3dfaGludHMgPyBzZXR0aW5nc1snZmllbGRfaGludF90ZXh0XycgKyBuYW1lXSA6IG51bGwsXG5cdFx0XHR9KTtcblxuXHRcdFx0dGhpcy5pbm5lci5hcHBlbmQoaW5wdXQuJGlucHV0KTtcblx0XHRcdHRoaXNbJ2lucHV0XycgKyBuYW1lXSA9IGlucHV0O1xuXG5cdFx0XHRpZiAoaW5kZXggPCAyKSB7XG5cdFx0XHRcdHRoaXMuaW5uZXIuYXBwZW5kKCQoJzxzcGFuIGNsYXNzPVwic2VwYXJhdG9yXCIgLz4nKS50ZXh0KHNldHRpbmdzLnNlcGFyYXRvcikpO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLmZpZWxkc1tpbmRleF0gPSBpbnB1dDtcblx0XHRcdHRoaXNbbmFtZV0gPSBpbnB1dDtcblx0XHR9XG5cblx0XHRidWlsZFVpKCkge1xuXHRcdFx0bGV0IGRvYmZpZWxkID0gdGhpcztcblx0XHRcdHRoaXMud3JhcHBlciA9ICQodGhpcy4kZWxlbWVudC53cmFwKCc8c3BhbiBjbGFzcz1cImpxLWR0ZVwiIC8+JykucGFyZW50KClbMF0pO1xuXHRcdFx0dGhpcy5pbm5lciA9ICQoJzxzcGFuIGNsYXNzPVwianEtZHRlLWlubmVyXCIgLz4nKTtcblx0XHRcdHRoaXMuYWRkRW50cnlGaWVsZHMoKTtcblx0XHRcdHRoaXMuZXJyb3Jib3ggPSAkKCc8c3BhbiBjbGFzcz1cImpxLWR0ZS1lcnJvcmJveFwiIC8+JykuaGlkZSgpO1xuXHRcdFx0dGhpcy5pbm5lci5vbigncGFzdGUnLCAnaW5wdXQnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRsZXQgaW5wdXQgPSB0aGlzO1xuXHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRkb2JmaWVsZC5hZnRlclBhc3RlKGlucHV0LCBlKTtcblx0XHRcdFx0fSwgMik7XG5cdFx0XHR9KTtcblx0XHRcdHRoaXMud3JhcHBlci5hcHBlbmQodGhpcy5pbm5lciwgdGhpcy5lcnJvcmJveCk7XG5cdFx0XHR0aGlzLnNldEZpZWxkV2lkdGhzKCk7XG5cdFx0XHR0aGlzLiRlbGVtZW50LmhpZGUoKTtcblx0XHR9XG5cblx0XHRjaGVja0RvY3VtZW50KGRvYiwgY2hpbGRkb2IsIGNsYXNzbmFtZSkge1xuXHRcdFx0bGV0IGVsZW1lbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShjbGFzc25hbWUpO1xuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRpZiAobmV3IERhdGUoZG9iKSA+IG5ldyBEYXRlKGNoaWxkZG9iKSkge1xuXHRcdFx0XHRcdGVsZW1lbnRzW2ldLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0ZWxlbWVudHNbaV0uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRjbGVhcigpIHtcblx0XHRcdHRoaXMuY2xlYXJFcnJvcignJyk7XG5cdFx0XHR0aGlzLnNldERhdGUoJycpO1xuXHRcdH1cblxuXHRcdGNsZWFyRXJyb3IoKSB7XG5cdFx0XHRkZWxldGUgdGhpcy5lcnJvcl90ZXh0O1xuXHRcdFx0dGhpcy5zaG93RXJyb3IoKTtcblx0XHR9XG5cblx0XHRkZXN0cm95KCkge1xuXHRcdFx0dGhpcy4kZWxlbWVudC5zaG93KCk7XG5cdFx0XHR0aGlzLiRlbGVtZW50LmNzcygnZGlzcGxheScsICcnKTtcblx0XHRcdHRoaXMud3JhcHBlci5maW5kKCdzcGFuJykucmVtb3ZlKCk7XG5cdFx0XHR0aGlzLiRlbGVtZW50LnVud3JhcCgpO1xuXHRcdFx0dGhpcy4kZWxlbWVudC5yZW1vdmVEYXRhKCdkYXRldGV4dGVudHJ5Jyk7XG5cdFx0XHRkZWxldGUgdGhpcy5pbm5lcjtcblx0XHRcdGRlbGV0ZSB0aGlzLndyYXBwZXI7XG5cdFx0XHRkZWxldGUgdGhpcy4kZWxlbWVudDtcblx0XHR9XG5cblx0XHRmb2N1cygpIHtcblx0XHRcdHRoaXMuZmllbGRzWzBdLnNldEZvY3VzKHRydWUpO1xuXHRcdH1cblxuXHRcdGZvY3VzRmllbGRCZWZvcmUoaW5wdXQpIHtcblx0XHRcdGNvbnN0IGluZGV4ID0gaW5wdXQuaW5kZXg7XG5cdFx0XHRpZiAoaW5kZXggPCAxKSB7XG5cdFx0XHRcdHJldHVyblxuXHRcdFx0fVxuXHRcdFx0dGhpcy5maWVsZHNbaW5kZXhdLnlpZWxkRm9jdXMoKTtcblx0XHRcdHRoaXMuZmllbGRzW2luZGV4IC0gMV0uc2V0Rm9jdXModHJ1ZSk7XG5cdFx0XHQvLyBsZXQgbmV4dCA9IHRoaXMuZmllbGRzW2luZGV4IC0gMV07XG5cdFx0XHQvLyBsZXQgdmFsID0gbmV4dC5nZXQoKTtcblx0XHRcdC8vIG5leHQuc2V0Rm9jdXMoZmFsc2UpO1xuXHRcdH1cblxuXHRcdGZvY3VzRmllbGRBZnRlcihpbnB1dCkge1xuXHRcdFx0Y29uc3QgaW5kZXggPSBpbnB1dC5pbmRleDtcblx0XHRcdGlmIChpbmRleCA+IDEpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5maWVsZHNbaW5kZXhdLnlpZWxkRm9jdXMoKTtcblx0XHRcdHRoaXMuZmllbGRzW2luZGV4ICsgMV0uc2V0Rm9jdXModHJ1ZSk7XG5cdFx0fVxuXG5cdFx0Zm9jdXNJbigpIHtcblx0XHRcdHRoaXMud3JhcHBlci5hZGRDbGFzcygnZm9jdXMnKTtcblx0XHR9XG5cblx0XHRmb2N1c091dCgpIHtcblx0XHRcdGlmIChzZXR0aW5ncy5vbl9ibHVyKSB7XG5cdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdHNlbGYud2lkZ2V0Rm9jdXNMb3N0KCk7XG5cdFx0XHRcdH0sIDIpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy53cmFwcGVyLnJlbW92ZUNsYXNzKCdmb2N1cycpO1xuXHRcdH1cblxuXHRcdGdldERhdGUoKSB7XG5cdFx0XHRyZXR1cm4gKHRoaXMuZGF5X3ZhbHVlICYmIHRoaXMubW9udGhfdmFsdWUgJiYgdGhpcy55ZWFyX3ZhbHVlKVxuXHRcdFx0ICAgICAgID8ge2RheTogdGhpcy5kYXlfdmFsdWUsIG1vbnRoOiB0aGlzLm1vbnRoX3ZhbHVlLCB5ZWFyOiB0aGlzLnllYXJfdmFsdWV9XG5cdFx0XHQgICAgICAgOiBudWxsO1xuXHRcdH1cblxuXHRcdGluaXQoKSB7XG5cdFx0XHRpZiAoIXNldHRpbmdzLm1pbl95ZWFyKVxuXHRcdFx0XHRzZXR0aW5ncy5taW5feWVhciA9ICcxOTEwJztcblxuXHRcdFx0dGhpcy5idWlsZFVpKCk7XG5cdFx0XHR0aGlzLnNldERhdGUodGhpcy4kZWxlbWVudC5hdHRyKCd2YWx1ZScpKTtcblx0XHRcdHRoaXMucHJveHlMYWJlbENsaWNrcygpO1xuXHRcdH1cblxuXHRcdHBhcnNlRGF0ZSh0ZXh0KSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5wYXJzZUlzb0RhdGUodGV4dCk7XG5cdFx0fVxuXG5cdFx0cGFyc2VJc29EYXRlKHRleHQpIHtcblx0XHRcdHJldHVybiB0ZXh0ICYmIHRleHQubWF0Y2goL14oXFxkXFxkXFxkXFxkKS0oXFxkXFxkKS0oXFxkXFxkKS8pID8ge1xuXHRcdFx0XHRkYXk6ICAgUmVnRXhwLiQzLFxuXHRcdFx0XHRtb250aDogUmVnRXhwLiQyLFxuXHRcdFx0XHR5ZWFyOiAgUmVnRXhwLiQxXG5cdFx0XHR9IDogbnVsbDtcblx0XHR9XG5cblx0XHRwcm94eUxhYmVsQ2xpY2tzKCkge1xuXHRcdFx0bGV0IGRvYmZpZWxkID0gdGhpcztcblx0XHRcdGxldCBpZCA9IHRoaXMuJGVsZW1lbnQuYXR0cignaWQnKTtcblx0XHRcdGlmICghaWQpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0JCgnbGFiZWxbZm9yPScgKyBpZCArICddJykuY2xpY2soZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRkb2JmaWVsZC5mb2N1cygpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0c2V0RGF0ZShuZXdfZGF0ZSkge1xuXHRcdFx0bGV0IGRvYmZpZWxkID0gdGhpcztcblx0XHRcdG5ld19kYXRlID0gdGhpcy5wYXJzZURhdGUobmV3X2RhdGUpO1xuXHRcdFx0ZGVsZXRlIHRoaXMuZGF5X3ZhbHVlO1xuXHRcdFx0ZGVsZXRlIHRoaXMubW9udGhfdmFsdWU7XG5cdFx0XHRkZWxldGUgdGhpcy55ZWFyX3ZhbHVlO1xuXHRcdFx0dGhpcy5pbnB1dF9kYXkuc2V0KG5ld19kYXRlID8gbmV3X2RhdGUuZGF5IDogJycpO1xuXHRcdFx0dGhpcy5pbnB1dF9tb250aC5zZXQobmV3X2RhdGUgPyBuZXdfZGF0ZS5tb250aCA6ICcnKTtcblx0XHRcdHRoaXMuaW5wdXRfeWVhci5zZXQobmV3X2RhdGUgPyBuZXdfZGF0ZS55ZWFyIDogJycpO1xuXHRcdFx0dGhpcy5jbGVhckVycm9yKCk7XG5cdFx0XHR0aGlzLiRlbGVtZW50LnZhbChuZXdfZGF0ZSk7XG5cdFx0XHRpZiAobmV3X2RhdGUpIHtcblx0XHRcdFx0JC5lYWNoKHRoaXMuZmllbGRzLCBmdW5jdGlvbiAoaSwgaW5wdXQpIHtcblx0XHRcdFx0XHRkb2JmaWVsZC52YWxpZGF0ZShpbnB1dCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHNldEVycm9yKGVycm9yX3RleHQpIHtcblx0XHRcdHRoaXMuZXJyb3JfdGV4dCA9IGVycm9yX3RleHQ7XG5cdFx0XHR0aGlzLnNob3dFcnJvcigpO1xuXHRcdH1cblxuXHRcdHNldEZpZWxkV2lkdGhzKCkge1xuXHRcdFx0bGV0IGF2YWlsYWJsZSA9IHRoaXMuJGVsZW1lbnQud2lkdGgoKSAtIDI7XG5cdFx0XHRsZXQgdG90YWwgPSBzZXR0aW5ncy5maWVsZF93aWR0aF95ZWFyICsgc2V0dGluZ3MuZmllbGRfd2lkdGhfc2VwICsgc2V0dGluZ3MuZmllbGRfd2lkdGhfbW9udGggK1xuXHRcdFx0XHRzZXR0aW5ncy5maWVsZF93aWR0aF9zZXAgKyBzZXR0aW5ncy5maWVsZF93aWR0aF9kYXk7XG5cdFx0XHR0aGlzLmlucHV0X2RheS5zZXRXaWR0aChNYXRoLmZsb29yKHNldHRpbmdzLmZpZWxkX3dpZHRoX2RheSAqIGF2YWlsYWJsZSAvIHRvdGFsKSk7XG5cdFx0XHR0aGlzLmlucHV0X21vbnRoLnNldFdpZHRoKE1hdGguZmxvb3Ioc2V0dGluZ3MuZmllbGRfd2lkdGhfbW9udGggKiBhdmFpbGFibGUgLyB0b3RhbCkpO1xuXHRcdFx0dGhpcy5pbnB1dF95ZWFyLnNldFdpZHRoKE1hdGguZmxvb3Ioc2V0dGluZ3MuZmllbGRfd2lkdGhfeWVhciAqIGF2YWlsYWJsZSAvIHRvdGFsKSk7XG5cdFx0fVxuXG5cdFx0c2V0UmVhZG9ubHkobW9kZSkge1xuXHRcdFx0aWYgKG1vZGUgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRtb2RlID0gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdHRoaXMuaW5wdXRfZGF5LnNldFJlYWRvbmx5KG1vZGUpO1xuXHRcdFx0dGhpcy5pbnB1dF9tb250aC5zZXRSZWFkb25seShtb2RlKTtcblx0XHRcdHRoaXMuaW5wdXRfeWVhci5zZXRSZWFkb25seShtb2RlKTtcblx0XHRcdGlmIChtb2RlKSB7XG5cdFx0XHRcdHRoaXMud3JhcHBlci5hZGRDbGFzcygncmVhZG9ubHknKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMud3JhcHBlci5yZW1vdmVDbGFzcygncmVhZG9ubHknKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRzaG93RXJyb3IoKSB7XG5cdFx0XHRsZXQgZXJyb3JfdGV4dCA9IHRoaXMud2lkZ2V0RXJyb3JUZXh0KCk7XG5cdFx0XHRpZiAodGhpcy5vbl9lcnJvcikge1xuXHRcdFx0XHR0aGlzLm9uX2Vycm9yKGVycm9yX3RleHQpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCFzZXR0aW5ncy5zaG93X2Vycm9ycykge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRpZiAoZXJyb3JfdGV4dCA9PT0gJycpIHtcblx0XHRcdFx0dGhpcy5lcnJvcmJveC5oaWRlKCk7XG5cdFx0XHRcdHRoaXMuZXJyb3Jib3gudGV4dCgnJyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRsZXQgeF9vZmZzZXQgPSAodGhpcy5pbm5lci5vdXRlcldpZHRoKCkgKyBzZXR0aW5ncy5lcnJvcmJveF94KSArICdweCc7XG5cdFx0XHRcdGxldCB5X29mZnNldCA9IHNldHRpbmdzLmVycm9yYm94X3kgKyAncHgnO1xuXHRcdFx0XHR0aGlzLmVycm9yYm94LmNzcyh7ZGlzcGxheTogJ2Jsb2NrJywgcG9zaXRpb246ICdhYnNvbHV0ZScsIHRvcDogeV9vZmZzZXQsIGxlZnQ6IHhfb2Zmc2V0fSk7XG5cdFx0XHRcdHRoaXMuZXJyb3Jib3gudGV4dChlcnJvcl90ZXh0KTtcblx0XHRcdFx0dGhpcy5lcnJvcmJveC5zaG93KCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dmFsaWRhdGUoY3VycmVudF9pbnB1dCkge1xuXHRcdFx0dGhpcy4kZWxlbWVudC52YWwoJycpO1xuXHRcdFx0aWYgKGN1cnJlbnRfaW5wdXQpIHtcblx0XHRcdFx0Y29uc3QgdHlwZSA9IGN1cnJlbnRfaW5wdXQubmFtZTtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRpZiAodHlwZSA9PT0gJ2RheScpIHtcblx0XHRcdFx0XHRcdHRoaXMudmFsaWRhdGVEYXkoKTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHR5cGUgPT09ICdtb250aCcpIHtcblx0XHRcdFx0XHRcdHRoaXMudmFsaWRhdGVNb250aCgpO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAodHlwZSA9PT0gJ3llYXInKSB7XG5cdFx0XHRcdFx0XHR0aGlzLnZhbGlkYXRlWWVhcigpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRjdXJyZW50X2lucHV0LmNsZWFyRXJyb3IoKTtcblx0XHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRcdGN1cnJlbnRfaW5wdXQuc2V0RXJyb3IoZSk7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAodGhpcy5kYXlfdmFsdWUgJiYgdGhpcy5tb250aF92YWx1ZSkge1xuXHRcdFx0XHR0aGlzLmNsZWFyRXJyb3IoKTtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHR0aGlzLnZhbGlkYXRlRGF5c0luTW9udGgoKTtcblx0XHRcdFx0XHRpZiAodGhpcy55ZWFyX3ZhbHVlICYmIHRoaXMueWVhcl92YWx1ZS5sZW5ndGggPT09IDQpIHtcblx0XHRcdFx0XHRcdHRoaXMudmFsaWRhdGVDb21wbGV0ZURhdGUoKTtcblx0XHRcdFx0XHRcdGxldCBkYXRlX3N0ciA9IEtyRG9iRW50cnkuZ2V0WW1kT2JqZWN0KHRoaXMuZ2V0RGF0ZSgpKTtcblx0XHRcdFx0XHRcdHRoaXMuJGVsZW1lbnQudmFsKGRhdGVfc3RyKTtcblx0XHRcdFx0XHRcdGlmICh0aGlzLiRlbGVtZW50LmRhdGEoJ2NoaWxkZG9iJykpIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5jaGVja0RvY3VtZW50KGRhdGVfc3RyLCB0aGlzLiRlbGVtZW50LmRhdGEoJ2NoaWxkZG9iJyksIHRoaXMuJGVsZW1lbnQuYXR0cignaWQnKSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdFx0dGhpcy5zZXRFcnJvcihlKTtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuY2xlYXJFcnJvcigpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHR2YWxpZGF0ZUNvbXBsZXRlRGF0ZSgpIHtcblx0XHRcdGNvbnN0IGRhdGVfb2JqID0gdGhpcy5nZXREYXRlKCk7XG5cdFx0XHRjb25zdCBkYXRlX2lzbyA9IEtyRG9iRW50cnkuZ2V0WW1kT2JqZWN0KGRhdGVfb2JqKTtcblx0XHRcdHNldHRpbmdzLm1pbm1heCA9IHRoaXMuJGVsZW1lbnQuZGF0YSgndmFsaWRhdGlvbicpO1xuXG5cdFx0XHRpZiAoc2V0dGluZ3MubWlubWF4ID09PSAnbWF4Jykge1xuXHRcdFx0XHRpZiAoZGF0ZV9pc28gPiB0b2RheSkge1xuXHRcdFx0XHRcdHRocm93KHNldHRpbmdzLkVfTUFYX0RBVEUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAoc2V0dGluZ3MubWlubWF4ID09PSAnbWluJykge1xuXHRcdFx0XHRpZiAoZGF0ZV9pc28gPCB0b2RheSkge1xuXHRcdFx0XHRcdHRocm93KHNldHRpbmdzLkVfTUlOX0RBVEUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIGxldCBtYXhfZGF0ZSA9IHNldHRpbmdzLm1heF9kYXRlO1xuXHRcdFx0Ly8gaWYgKHR5cGVvZiBtYXhfZGF0ZSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0Ly8gXHRtYXhfZGF0ZSA9IG1heF9kYXRlLmNhbGwodGhpcyk7XG5cdFx0XHQvLyB9XG5cdFx0XHQvLyBpZiAodHlwZW9mIG1heF9kYXRlID09PSAnc3RyaW5nJykge1xuXHRcdFx0Ly8gXHRtYXhfZGF0ZSA9IHRoaXMucGFyc2VEYXRlKG1heF9kYXRlKTtcblx0XHRcdC8vIH1cblx0XHRcdC8vIGlmIChtYXhfZGF0ZSkge1xuXHRcdFx0Ly8gXHRpZiAoZGF0ZV9pc28gPiBzZXR0aW5ncy5tYXhfZGF0ZSkge1xuXHRcdFx0Ly8gXHRcdHRocm93KHNldHRpbmdzLkVfTUFYX0RBVEUpO1xuXHRcdFx0Ly8gXHR9XG5cdFx0XHQvLyB9XG5cblx0XHRcdGlmICh0aGlzLmN1c3RvbV92YWxpZGF0aW9uKSB7XG5cdFx0XHRcdGRhdGVfb2JqLmRhdGUgPSBuZXcgRGF0ZShcblx0XHRcdFx0XHRwYXJzZUludChkYXRlX29iai55ZWFyLCAxMCksXG5cdFx0XHRcdFx0cGFyc2VJbnQoZGF0ZV9vYmoubW9udGgsIDEwKSAtIDEsXG5cdFx0XHRcdFx0cGFyc2VJbnQoZGF0ZV9vYmouZGF5LCAxMClcblx0XHRcdFx0KTtcblx0XHRcdFx0dGhpcy5jdXN0b21fdmFsaWRhdGlvbihkYXRlX29iaik7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dmFsaWRhdGVEYXkoKSB7XG5cdFx0XHRsZXQgb3B0ID0gc2V0dGluZ3M7XG5cdFx0XHRsZXQgaW5wdXQgPSB0aGlzLmlucHV0X2RheTtcblx0XHRcdHRoaXMuZGF5X3ZhbHVlID0gdW5kZWZpbmVkO1xuXHRcdFx0bGV0IHRleHQgPSBpbnB1dC5nZXQoKTtcblx0XHRcdGlmICh0ZXh0ID09PSAnJyB8fCAodGV4dCA9PT0gJzAnICYmIGlucHV0Lmhhc19mb2N1cykpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHRleHQubWF0Y2goL1xcRC8pKSB7XG5cdFx0XHRcdHRocm93KG9wdC5FX0RBWV9OQU4pO1xuXHRcdFx0fVxuXHRcdFx0bGV0IG51bSA9IHBhcnNlSW50KHRleHQsIDEwKTtcblx0XHRcdGlmIChudW0gPCAxKSB7XG5cdFx0XHRcdHRocm93KG9wdC5FX0RBWV9UT09fU01BTEwpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKG51bSA+IDMxKSB7XG5cdFx0XHRcdHRocm93KG9wdC5FX0RBWV9UT09fQklHKTtcblx0XHRcdH1cblx0XHRcdHRleHQgPSBudW0gPCAxMCA/ICcwJyArIG51bSA6ICcnICsgbnVtO1xuXHRcdFx0aWYgKCFpbnB1dC5oYXNfZm9jdXMpIHtcblx0XHRcdFx0aW5wdXQuc2V0KHRleHQpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5kYXlfdmFsdWUgPSB0ZXh0O1xuXHRcdH1cblxuXHRcdHZhbGlkYXRlRGF5c0luTW9udGgoKSB7XG5cdFx0XHRjb25zdCBkYXkgPSBwYXJzZUludCh0aGlzLmRheV92YWx1ZSwgMTApO1xuXHRcdFx0Y29uc3QgbW9udGggPSBwYXJzZUludCh0aGlzLm1vbnRoX3ZhbHVlLCAxMCk7XG5cdFx0XHRjb25zdCB5ZWFyID0gcGFyc2VJbnQodGhpcy55ZWFyX3ZhbHVlLCAxMCk7XG5cdFx0XHRpZiAoZGF5IDwgMSB8fCBtb250aCA8IDEpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0bGV0IG1heCA9IHNldHRpbmdzLmRheXNfaW5fbW9udGhbbW9udGggLSAxXTtcblx0XHRcdGxldCBtc2cgPSBzZXR0aW5ncy5FX0JBRF9EQVlfRk9SX01PTlRIO1xuXHRcdFx0aWYgKG1vbnRoID09PSAyICYmICgnJyArIHllYXIpLmxlbmd0aCA9PT0gNCkge1xuXHRcdFx0XHRtYXggPSB5ZWFyICUgNCA/IDI4IDogeWVhciAlIDEwMCA/IDI5IDogeWVhciAlIDQwMCA/IDI4IDogMjk7XG5cdFx0XHRcdG1zZyA9IG1zZy5yZXBsYWNlKC8leS8sIHllYXIudG9TdHJpbmcoKSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRtc2cgPSBtc2cucmVwbGFjZSgvIColeS8sICcnKTtcblx0XHRcdH1cblx0XHRcdGlmIChkYXkgPiBtYXgpIHtcblx0XHRcdFx0dGhyb3cobXNnLnJlcGxhY2UoLyVkLywgbWF4LnRvU3RyaW5nKCkpLnJlcGxhY2UoLyVtLywgc2V0dGluZ3MubW9udGhfbmFtZVttb250aCAtIDFdKSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dmFsaWRhdGVNb250aCgpIHtcblx0XHRcdGxldCBpbnB1dCA9IHRoaXMuaW5wdXRfbW9udGg7XG5cdFx0XHR0aGlzLm1vbnRoX3ZhbHVlID0gdW5kZWZpbmVkO1xuXHRcdFx0bGV0IHRleHQgPSBpbnB1dC5nZXQoKTtcblx0XHRcdGlmICh0ZXh0ID09PSAnJyB8fCAodGV4dCA9PT0gJzAnICYmIGlucHV0Lmhhc19mb2N1cykpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHRleHQubWF0Y2goL1xcRC8pKSB7XG5cdFx0XHRcdHRocm93KHNldHRpbmdzLkVfTU9OVEhfTkFOKTtcblx0XHRcdH1cblx0XHRcdGxldCBudW0gPSBwYXJzZUludCh0ZXh0LCAxMCk7XG5cdFx0XHRpZiAobnVtIDwgMSkge1xuXHRcdFx0XHR0aHJvdyhzZXR0aW5ncy5FX01PTlRIX1RPT19TTUFMTCk7XG5cdFx0XHR9XG5cdFx0XHRpZiAobnVtID4gMTIpIHtcblx0XHRcdFx0dGhyb3coc2V0dGluZ3MuRV9NT05USF9UT09fQklHKTtcblx0XHRcdH1cblx0XHRcdHRleHQgPSBudW0gPCAxMCA/ICcwJyArIG51bSA6ICcnICsgbnVtO1xuXHRcdFx0aWYgKCFpbnB1dC5oYXNfZm9jdXMpIHtcblx0XHRcdFx0aW5wdXQuc2V0KHRleHQpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5tb250aF92YWx1ZSA9IHRleHQ7XG5cdFx0fVxuXG5cdFx0dmFsaWRhdGVZZWFyKCkge1xuXHRcdFx0Y29uc3QgaW5wdXQgPSB0aGlzLmlucHV0X3llYXI7XG5cdFx0XHR0aGlzLnllYXJfdmFsdWUgPSB1bmRlZmluZWQ7XG5cdFx0XHRsZXQgdGV4dCA9IGlucHV0LmdldCgpO1xuXHRcdFx0aWYgKHRleHQgPT09ICcnIHx8ICh0ZXh0ID09PSAnMCcgJiYgaW5wdXQuaGFzX2ZvY3VzKSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRpZiAodGV4dC5tYXRjaCgvXFxELykpIHtcblx0XHRcdFx0dGhyb3coc2V0dGluZ3MuRV9ZRUFSX05BTik7XG5cdFx0XHR9XG5cdFx0XHRpZiAoaW5wdXQuaGFzX2ZvY3VzKSB7XG5cdFx0XHRcdGlmICh0ZXh0Lmxlbmd0aCA+IDQpIHtcblx0XHRcdFx0XHR0aHJvdyhzZXR0aW5ncy5FX1lFQVJfTEVOR1RIKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKHRleHQubGVuZ3RoICE9PSA0KSB7XG5cdFx0XHRcdFx0dGhyb3coc2V0dGluZ3MuRV9ZRUFSX0xFTkdUSCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmICh0ZXh0Lmxlbmd0aCA9PT0gNCkge1xuXHRcdFx0XHRjb25zdCBudW0gPSBwYXJzZUludCh0ZXh0LCAxMCk7XG5cdFx0XHRcdGlmIChzZXR0aW5ncy5taW5feWVhciAmJiBudW0gPCBzZXR0aW5ncy5taW5feWVhcikge1xuXHRcdFx0XHRcdHRocm93KHNldHRpbmdzLkVfWUVBUl9UT09fU01BTEwucmVwbGFjZSgvJXkvLCBzZXR0aW5ncy5taW5feWVhcikpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHR0aGlzLnllYXJfdmFsdWUgPSB0ZXh0O1xuXHRcdH1cblxuXHRcdHdpZGdldEVycm9yVGV4dCgpIHtcblx0XHRcdGxldCBlcnJvcl90ZXh0ID0gJyc7XG5cdFx0XHQkLmVhY2godGhpcy5maWVsZHMsIGZ1bmN0aW9uIChpLCBpbnB1dCkge1xuXHRcdFx0XHRpZiAoaW5wdXQuZXJyb3JfdGV4dCkge1xuXHRcdFx0XHRcdGlmIChpbnB1dC5oYXNfZm9jdXMgfHwgZXJyb3JfdGV4dCA9PT0gJycpIHtcblx0XHRcdFx0XHRcdGVycm9yX3RleHQgPSBpbnB1dC5lcnJvcl90ZXh0XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdGlmIChlcnJvcl90ZXh0ID09PSAnJyAmJiB0aGlzLmVycm9yX3RleHQpIHtcblx0XHRcdFx0ZXJyb3JfdGV4dCA9IHRoaXMuZXJyb3JfdGV4dDtcblx0XHRcdH1cblx0XHRcdHJldHVybiBlcnJvcl90ZXh0O1xuXHRcdH1cblxuXHRcdHdpZGdldEZvY3VzTG9zdCgpIHtcblx0XHRcdGlmIChzZXR0aW5ncy5vbl9ibHVyICYmICF0aGlzLndyYXBwZXIuaXMoJy5mb2N1cycpKSB7XG5cdFx0XHRcdHNldHRpbmdzLm9uQmx1cigpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGNsYXNzIEtyRG9iSW5wdXQge1xuXHRcdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcblx0XHRcdGNvbnN0IGlucHV0ID0gdGhpcztcblx0XHRcdHRoaXMuZG9iZmllbGQgPSBvcHRpb25zLmtyZG9iZW50cnk7XG5cdFx0XHR0aGlzLm5hbWUgPSBvcHRpb25zLm5hbWU7XG5cdFx0XHR0aGlzLmluZGV4ID0gb3B0aW9ucy5pbmRleDtcblx0XHRcdHRoaXMuaGludF90ZXh0ID0gb3B0aW9ucy5oaW50X3RleHQ7XG5cdFx0XHR0aGlzLmhhc19mb2N1cyA9IGZhbHNlO1xuXHRcdFx0dGhpcy5lbXB0eSA9IHRydWU7XG5cdFx0XHR0aGlzLiRpbnB1dCA9ICQoJzxpbnB1dCB0eXBlPVwidGV4dFwiIHZhbHVlPVwiXCIgLz4nKS5hZGRDbGFzcygnanEtZHRlLScgKyB0aGlzLm5hbWUpLmF0dHIoJ2FyaWEtbGFiZWwnLCAnJyArIFwiIChcIiArIHRoaXMuaGludF90ZXh0ICsgXCIpXCIpLmZvY3VzKCQucHJveHkoaW5wdXQsICdmb2N1cycpKS5ibHVyKCQucHJveHkoaW5wdXQsICdibHVyJykpLmtleWRvd24oZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0aW5wdXQua2V5ZG93bihlKTtcblx0XHRcdFx0fSwgMilcblx0XHRcdH0pLmtleXVwKGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdGlucHV0LmtleXVwKGUpO1xuXHRcdFx0XHR9LCAyKVxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0Ymx1cigpIHtcblx0XHRcdHRoaXMuaGFzX2ZvY3VzID0gZmFsc2U7XG5cdFx0XHR0aGlzLmRvYmZpZWxkLmZvY3VzT3V0KCk7XG5cdFx0XHR0aGlzLnNob3dfaGludCgpO1xuXHRcdFx0dGhpcy5kb2JmaWVsZC52YWxpZGF0ZSh0aGlzKTtcblx0XHR9XG5cblx0XHRjbGVhckVycm9yKCkge1xuXHRcdFx0ZGVsZXRlIHRoaXMuZXJyb3JfdGV4dDtcblx0XHRcdHRoaXMuJGlucHV0LnJlbW92ZUNsYXNzKCdlcnJvcicpO1xuXHRcdH1cblxuXHRcdGZvY3VzKCkge1xuXHRcdFx0dGhpcy5rZXlfaXNfZG93biA9IGZhbHNlO1xuXHRcdFx0aWYgKHRoaXMuJGlucHV0LnByb3AoJ3JlYWRvbmx5JykpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5oYXNfZm9jdXMgPSB0cnVlO1xuXHRcdFx0dGhpcy5kb2JmaWVsZC5mb2N1c0luKCk7XG5cdFx0XHRpZiAodGhpcy4kaW5wdXQuaGFzQ2xhc3MoJ2hpbnQnKSkge1xuXHRcdFx0XHR0aGlzLiRpbnB1dC52YWwoJycpLnJlbW92ZUNsYXNzKCdoaW50Jyk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLmRvYmZpZWxkLnNob3dFcnJvcigpO1xuXHRcdH1cblxuXHRcdGdldCgpIHtcblx0XHRcdGxldCB2YWwgPSB0aGlzLiRpbnB1dC52YWwoKTtcblx0XHRcdHJldHVybiB2YWwgPT09IHRoaXMuaGludF90ZXh0ID8gJycgOiB2YWw7XG5cdFx0fVxuXG5cdFx0aXNEaWdpdEtleShlKSB7XG5cdFx0XHRsZXQga2V5Y29kZSA9IGUud2hpY2g7XG5cdFx0XHRyZXR1cm4ga2V5Y29kZSA+PSA0OCAmJiBrZXljb2RlIDw9IDU3IHx8IGtleWNvZGUgPj0gOTYgJiYga2V5Y29kZSA8PSAxMDU7XG5cdFx0fVxuXG5cdFx0a2V5ZG93bigpIHtcblx0XHRcdC8vIElnbm9yZSBrZXl1cCBldmVudHMgdGhhdCBhcnJpdmUgYWZ0ZXIgZm9jdXMgbW92ZWQgdG8gbmV4dCBmaWVsZFxuXHRcdFx0dGhpcy5rZXlfaXNfZG93biA9IHRydWU7XG5cdFx0fVxuXG5cdFx0a2V5dXAoZSkge1xuXHRcdFx0aWYgKCF0aGlzLmtleV9pc19kb3duKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdC8vIEhhbmRsZSBCYWNrc3BhY2UgLSBzaGlmdGluZyBmb2N1cyB0byBwcmV2aW91cyBmaWVsZCBpZiByZXF1aXJlZFxuXHRcdFx0bGV0IGtleWNvZGUgPSBlLndoaWNoO1xuXHRcdFx0aWYgKGtleWNvZGUgPT09IGtleS5CQUNLU1BBQ0UgJiYgdGhpcy5lbXB0eSkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5kb2JmaWVsZC5mb2N1c0ZpZWxkQmVmb3JlKHRoaXMpO1xuXHRcdFx0fVxuXHRcdFx0bGV0IHRleHQgPSB0aGlzLmdldCgpO1xuXHRcdFx0dGhpcy5lbXB0eSA9IHRleHQgPT09ICcnO1xuXG5cdFx0XHQvLyBUcmFwIGFuZCBkaXNjYXJkIHNlcGFyYXRvciBjaGFyYWN0ZXJzIC0gYWR2YW5jaW5nIGZvY3VzIGlmIHJlcXVpcmVkXG5cdFx0XHRpZiAodGV4dC5tYXRjaCgvW1xcL1xcXFwuIC1dLykpIHtcblx0XHRcdFx0dGV4dCA9IHRleHQucmVwbGFjZSgvW1xcL1xcXFwuIC1dLywgJycpO1xuXHRcdFx0XHR0aGlzLnNldCh0ZXh0KTtcblx0XHRcdFx0aWYgKCF0aGlzLmVtcHR5ICYmIHRoaXMuaW5kZXggPCAyKSB7XG5cdFx0XHRcdFx0dGhpcy5kb2JmaWVsZC5mb2N1c0ZpZWxkQWZ0ZXIodGhpcyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gQWR2YW5jZSBmb2N1cyBpZiB0aGlzIGZpZWxkIGlzIGJvdGggdmFsaWQgYW5kIGZ1bGxcblx0XHRcdGlmICh0aGlzLmRvYmZpZWxkLnZhbGlkYXRlKHRoaXMpKSB7XG5cdFx0XHRcdGxldCB3YW50ID0gdGhpcy5uYW1lID09PSAneWVhcicgPyA0IDogMjtcblx0XHRcdFx0aWYgKHRoaXMuaXNEaWdpdEtleShlKSAmJiB0ZXh0Lmxlbmd0aCA9PT0gd2FudCkge1xuXHRcdFx0XHRcdHRoaXMuZG9iZmllbGQuZm9jdXNGaWVsZEFmdGVyKHRoaXMpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0bGVmdCgpIHtcblx0XHRcdHJldHVybiB0aGlzLiRpbnB1dC5wb3NpdGlvbigpLmxlZnQ7XG5cdFx0fVxuXG5cdFx0c2V0KG5ld192YWx1ZSkge1xuXHRcdFx0dGhpcy4kaW5wdXQudmFsKG5ld192YWx1ZSkucmVtb3ZlQ2xhc3MoJ2hpbnQnKTtcblx0XHRcdGlmICghdGhpcy5oYXNfZm9jdXMpIHtcblx0XHRcdFx0dGhpcy5zaG93X2hpbnQoKTtcblx0XHRcdH1cblx0XHRcdHRoaXMuZW1wdHkgPSBuZXdfdmFsdWUgPT09ICcnO1xuXHRcdFx0dGhpcy5jbGVhckVycm9yKCk7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9XG5cblx0XHRzZXRFcnJvcih0ZXh0KSB7XG5cdFx0XHR0aGlzLmVycm9yX3RleHQgPSB0ZXh0O1xuXHRcdFx0dGhpcy4kaW5wdXQuYWRkQ2xhc3MoJ2Vycm9yJyk7XG5cdFx0XHR0aGlzLmRvYmZpZWxkLnNob3dFcnJvcigpO1xuXHRcdH1cblxuXHRcdHNldEZvY3VzKHNlbGVjdF9hbGwpIHtcblx0XHRcdGxldCAkaW5wdXQgPSB0aGlzLiRpbnB1dDtcblx0XHRcdCRpbnB1dC5mb2N1cygpO1xuXHRcdFx0aWYgKHNlbGVjdF9hbGwpIHtcblx0XHRcdFx0JGlucHV0LnNlbGVjdCgpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0JGlucHV0LnZhbCgkaW5wdXQudmFsKCkpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fVxuXG5cdFx0c2V0V2lkdGgobmV3X3dpZHRoKSB7XG5cdFx0XHR0aGlzLiRpbnB1dC53aWR0aChuZXdfd2lkdGgpO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fVxuXG5cdFx0c2hvd19oaW50KCkge1xuXHRcdFx0aWYgKHRoaXMuZ2V0KCkgPT09ICcnICYmIHR5cGVvZiAodGhpcy5oaW50X3RleHQpID09PSAnc3RyaW5nJykge1xuXHRcdFx0XHR0aGlzLiRpbnB1dC52YWwodGhpcy5oaW50X3RleHQpLmFkZENsYXNzKCdoaW50Jyk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9XG5cblx0XHR5aWVsZEZvY3VzKCkge1xuXHRcdFx0dGhpcy4kaW5wdXQuYmx1cigpO1xuXHRcdH1cblx0fVxuXG5cdCQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcblx0XHQkKCcuZG9iaXNzdWUnKS5lYWNoKGZ1bmN0aW9uICgpIHtcblx0XHRcdG15S3JEb2JFbnRyeSA9IG5ldyBLckRvYkVudHJ5KCQodGhpcyksIHt9KTtcblx0XHR9KTtcblx0fSk7XG59KGpRdWVyeSkpOyIsIi8vIG5vaW5zcGVjdGlvbiBEdXBsaWNhdGVkQ29kZVxuXG4vKipcbiAqIEBwYWNrYWdlICAgIEtub3cgUmVzZXJ2YXRpb25zXG4gKiBAc3VicGFja2FnZSBBZG1pbiBKU1xuICogQGNvcHlyaWdodCAgMjAyMCBIaWdobGFuZCBWaXNpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBAbGljZW5zZSAgICBTZWUgdGhlIGZpbGUgXCJMSUNFTlNFLnR4dFwiIGZvciB0aGUgZnVsbCBsaWNlbnNlIGdvdmVybmluZyB0aGlzIGNvZGUuXG4gKiBAYXV0aG9yICAgICBIYXplbCBXaWxzb24gPGhhemVsQGhpZ2hsYW5kdmlzaW9uLmNvbT5cbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgkKSB7XG5cdCQoZnVuY3Rpb24gKCkge1xuXHRcdGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaG93dG9hcnJpdmUnKSkge1xuXHRcdFx0Y29uc3QgaG93dG9hcnJpdmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaG93dG9hcnJpdmUnKTtcblx0XHRcdGxldCBhcnJpdmFsbWVhbnMgPSBob3d0b2Fycml2ZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtbWVhbnMnKTtcblx0XHRcdGlmICghYXJyaXZhbG1lYW5zKSB7XG5cdFx0XHRcdGFycml2YWxtZWFucyA9ICdhaXInO1xuXHRcdFx0fVxuXHRcdFx0ZGlzcGxheUFycml2YWwoYXJyaXZhbG1lYW5zKTtcblx0XHR9XG5cblx0XHQkKCdib2R5Jykub24oJ2NsaWNrJywgJy5hbWl0ZW0nLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0ZGlzcGxheUFycml2YWwoJCh0aGlzKS5hdHRyKCdpZCcpKTtcblx0XHR9KTtcblx0fSk7XG5cblx0ZnVuY3Rpb24gZGlzcGxheUFycml2YWwodmFsdWUpIHtcblx0XHRsZXQgeCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FtaXRlbScpO1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgeC5sZW5ndGg7IGkrKykge1xuXHRcdFx0eFtpXS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcblx0XHR9XG5cblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWlyLWRhdGEnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0cmFpbi1kYXRhJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXV0by1kYXRhJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3RoZXItZGF0YScpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cdFx0bGV0IGFycml2YWxkYXRhID0gdmFsdWUgKyAnLWRhdGEnO1xuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGFycml2YWxkYXRhKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh2YWx1ZSkuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2pmb3JtX2Fycml2YWxfbWVhbnMnKS52YWx1ZSA9IHZhbHVlO1xuXHR9XG59KShqUXVlcnkpOyIsIi8qKlxuICogQHBhY2thZ2UgICAgS25vdyBSZXNlcnZhdGlvbnNcbiAqIEBzdWJwYWNrYWdlIFNpdGUgSlNcbiAqIEBjb3B5cmlnaHQgIDIwMjAgSGlnaGxhbmQgVmlzaW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogQGxpY2Vuc2UgICAgU2VlIHRoZSBmaWxlIFwiTElDRU5TRS50eHRcIiBmb3IgdGhlIGZ1bGwgbGljZW5zZSBnb3Zlcm5pbmcgdGhpcyBjb2RlLlxuICogQGF1dGhvciAgICAgSGF6ZWwgV2lsc29uIDxoYXplbEBoaWdobGFuZHZpc2lvbi5jb20+XG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbmlmICghd2luZG93LmxvY2F0aW9uLm9yaWdpbikge1xuXHR3aW5kb3cubG9jYXRpb24ub3JpZ2luID0gd2luZG93LmxvY2F0aW9uLnByb3RvY29sICsgXCIvL1wiICsgd2luZG93LmxvY2F0aW9uLmhvc3Q7XG59XG5jb25zdCBsaXZlc2l0ZSA9IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gKyAnLyc7XG5jb25zdCBsYW5nID0gXCJlblwiO1xuXG4oZnVuY3Rpb24gKCQpIHtcblx0Y29uc3QgbWFya2Vyc2hhcGUgPSB7XG5cdFx0dHlwZTogICAncG9seScsXG5cdFx0Y29vcmRzOiBbMSwgMSwgMSwgMzIsIDM3LCAzMiwgMzIsIDFdXG5cdH07XG5cblx0bGV0IG15S3JtYXA7XG5cdGxldCBtYXBEYXRhID0gZmFsc2U7XG5cdGxldCBtYXA7XG5cdGxldCBtYXBab29tO1xuXHRsZXQgaW5mb1dpbmRvdztcblx0bGV0IGluZm9XaW5kb3cyO1xuXHRsZXQgYm91bmRzO1xuXHRsZXQgcHJvcGVydHlkaXY7XG5cdGxldCBwcm9wZXJ0eWljb247XG5cdGxldCBtYztcbi8vXHRsZXQgYmljb247XG4vL1x0bGV0IGhpY29uO1xuLy9cdGxldCBsYXJnZV9zbGlkZXNob3cgPSBmYWxzZTtcblxuXHRsZXQgc2V0dGluZ3MgPSB7XG5cdFx0cHJvcGVydHlNYXJrZXJzOiBbXSxcblx0XHRmaWx0ZXJJZHM6ICAgICAgIFtdLFxuXHRcdG1hcE1hcmtlcnM6ICAgICAgW10sXG5cdFx0bWFwVHlwZUlkOiAgICAgICAnJyxcblx0XHRtYXBab29tOiAgICAgICAgIDAsXG5cdFx0bWFwTWF4Wm9vbTogICAgICAyMCxcblx0XHRtYXBUeXBlOiAgICAgICAgICcnLFxuXHRcdG1hcElkOiAgICAgICAgICAgJycsXG5cdFx0bWFya2VyQ29sb3I6ICAgICAncmVkJyxcblx0fTtcblxuXHRjbGFzcyBLcm1hcCB7XG5cdFx0Y29uc3RydWN0b3Ioc2V0dGluZ3MpIHtcblx0XHRcdHRoaXMuc2V0dGluZ3MgPSBzZXR0aW5ncztcblxuXHRcdFx0Ly9Jbml0aWFsaXNlIG1hcCBvcHRpb25zXG5cdFx0XHR0aGlzLmdtT3B0aW9ucyA9IHtcblx0XHRcdFx0c2Nyb2xsd2hlZWw6ICAgICAgIGZhbHNlLFxuXHRcdFx0XHR6b29tOiAgICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5tYXBab29tLFxuXHRcdFx0XHRtYXhab29tOiAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5tYXBNYXhab29tLFxuXHRcdFx0XHRtYXBUeXBlSWQ6ICAgICAgICAgdGhpcy5zZXR0aW5ncy5tYXBUeXBlSWQsXG5cdFx0XHRcdHN0cmVldFZpZXdDb250cm9sOiBmYWxzZVxuXHRcdFx0fTtcblxuXHRcdFx0bWFwWm9vbSA9IHRoaXMuc2V0dGluZ3MubWFwWm9vbTtcblx0XHRcdHRoaXMuZ21hcmtlcnMgPSBbXTtcblx0XHRcdHRoaXMuY291bnQgPSAwO1xuXG5cdFx0XHR0aGlzLmluaXRNYXAoKTtcblx0XHR9XG5cblx0XHRzdGF0aWMgY2xvc2VLckluZm93aW5kb3coKSB7XG5cdFx0XHQkKCcja3ItaW5mb3dpbmRvdycpLmhpZGUoKTtcbi8vXHRcdFx0XCIja3ItaW5mb3dpbmRvd1wiLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cdFx0XHRpbmZvV2luZG93LmNsb3NlKCk7XG5cdFx0XHRpbmZvV2luZG93Mi5jbG9zZSgpO1xuXHRcdH1cblxuXHRcdC8vIG9ubHkgc2hvdyB2aXNpYmxlIG1hcmtlcnNcblx0XHRzdGF0aWMgc2hvd1Zpc2libGVNYXJrZXJzKG1hcmtlcnMpIHtcblx0XHRcdGxldCBib3VuZHMgPSBtYXAuZ2V0Qm91bmRzKCk7XG5cdFx0XHRsZXQgY291bnQgPSAwO1xuXG5cdFx0XHRmb3IgKGxldCBkID0gMDsgZCA8IG1hcmtlcnMubGVuZ3RoOyBkKyspIHtcblx0XHRcdFx0bGV0IG1hcmtlciA9IG1hcmtlcnNbZF07XG5cblx0XHRcdFx0aWYgKG1hcmtlci50eXBlID09PSAnbWFwJykge1xuXHRcdFx0XHRcdGlmIChib3VuZHMuY29udGFpbnMobWFya2VyLmdldFBvc2l0aW9uKCkpID09PSB0cnVlKSB7XG5cdFx0XHRcdFx0XHRtYXJrZXIuc2V0VmlzaWJsZSh0cnVlKTtcblx0XHRcdFx0XHRcdGNvdW50Kys7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdG1hcmtlci5zZXRWaXNpYmxlKGZhbHNlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGNvdW50O1xuXHRcdH1cblxuXHRcdC8vIENoZWNrIE1hcmtlcnMgYXJyYXkgZm9yIGR1cGxpY2F0ZSBwb3NpdGlvbiBhbmQgb2Zmc2V0IGEgbGl0dGxlXG5cdFx0Y2hlY2tEdXBsaWNhdGUoY3VycmVudCkge1xuXHRcdFx0aWYgKHRoaXMuZ21hcmtlcnMubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRsZXQgZHVwcyA9IDA7XG5cblx0XHRcdFx0Zm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuZ21hcmtlcnMubGVuZ3RoOyBpbmRleCsrKSB7XG5cdFx0XHRcdFx0bGV0IHBvcyA9IHRoaXMuZ21hcmtlcnNbaW5kZXhdLmdldFBvc2l0aW9uKCk7XG5cdFx0XHRcdFx0aWYgKGN1cnJlbnQuZXF1YWxzKHBvcykpIHtcblx0XHRcdFx0XHRcdGR1cHMrKztcblx0XHRcdFx0XHRcdGxldCBhID0gMzYwLjAgLyBkdXBzO1xuXHRcdFx0XHRcdFx0bGV0IG5ld0xhdCA9IHBvcy5sYXQoKSArIC0uMDAwMDIgKiBNYXRoLmNvcygoK2EgKiBkdXBzKSAvIDE4MCAqIE1hdGguUEkpOyAgLy94XG5cdFx0XHRcdFx0XHRsZXQgbmV3TG5nID0gcG9zLmxuZygpICsgLS4wMDAwMCAqIE1hdGguc2luKCgrYSAqIGR1cHMpIC8gMTgwICogTWF0aC5QSSk7ICAvL1lcblx0XHRcdFx0XHRcdGN1cnJlbnQgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKG5ld0xhdCwgbmV3TG5nKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGN1cnJlbnQ7XG5cdFx0fVxuXG5cdFx0Y2hlY2tab29tKCkge1xuXHRcdFx0aWYgKG1hcFpvb20gPiAwKSB7XG5cdFx0XHRcdGxldCBteWxpc3RlbmVyID0gbWFwLmFkZExpc3RlbmVyKCdpZGxlJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdGNvbnN0IGN1cnJlbnRab29tID0gbWFwLmdldFpvb20oKTtcblx0XHRcdFx0XHRpZiAobWFwWm9vbSA+IDAgJiYgY3VycmVudFpvb20gIT09IG1hcFpvb20pIHtcblx0XHRcdFx0XHRcdG1hcC5zZXRab29tKG1hcFpvb20pO1xuXHRcdFx0XHRcdFx0bXlsaXN0ZW5lci5yZW1vdmUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGNsdXN0ZXJNYXAoKSB7XG5cdFx0XHRjb25zdCBtY09wdGlvbnMgPSB7XG5cdFx0XHRcdGdyaWRTaXplOiAgICAgICAgICAgIDIwLFxuXHRcdFx0XHRtYXhab29tOiAgICAgICAgICAgICB0aGlzLnNldHRpbmdzLm1hcE1heFpvb20gLSAxLFxuXHRcdFx0XHRpbWFnZVBhdGg6ICAgICAgICAgICAnL21lZGlhL2NvbV9rbm93cmVzL2ltYWdlcy9tYXJrZXJjbHVzdGVyZXIvbScsXG5cdFx0XHRcdGlnbm9yZUhpZGRlbk1hcmtlcnM6IHRydWVcblx0XHRcdH07XG5cblx0XHRcdHRoaXMuc2V0UHJvcGVydHlNYXJrZXJzKCk7XG5cdFx0XHR0aGlzLnNldE1hcE1hcmtlcnMoKTtcblxuXHRcdFx0Zm9yIChsZXQgZCA9IDA7IGQgPCB0aGlzLmdtYXJrZXJzLmxlbmd0aDsgZCsrKSB7XG5cdFx0XHRcdGxldCBtYXJrZXIgPSB0aGlzLmdtYXJrZXJzW2RdO1xuXHRcdFx0XHRpZiAobWFya2VyLnR5cGUgPT09ICdwcm9wZXJ0eScpIHtcblx0XHRcdFx0XHRpZiAodGhpcy5zZXR0aW5ncy5maWx0ZXJJZHMuaW5jbHVkZXMobWFya2VyLnBpZCkpIHtcblx0XHRcdFx0XHRcdG1hcmtlci5zZXRWaXNpYmxlKHRydWUpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRtYXJrZXIuc2V0VmlzaWJsZShmYWxzZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdG1jID0gbmV3IE1hcmtlckNsdXN0ZXJlcihtYXAsIHRoaXMuZ21hcmtlcnMsIG1jT3B0aW9ucyk7XG5cdFx0XHRnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYywgXCJjbHVzdGVyY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHQkKCcja3ItaW5mb3dpbmRvdycpLmhpZGUoKTtcblx0XHRcdFx0aW5mb1dpbmRvdy5jbG9zZSgpO1xuXHRcdFx0fSk7XG5cblx0XHRcdG1hcC5maXRCb3VuZHMoYm91bmRzKTtcblxuXHRcdFx0dGhpcy5jaGVja1pvb20oKTtcblx0XHR9XG5cblx0XHQvLyBDcmVhdGUgdGhlIE1hcFxuXHRcdGNyZWF0ZU1hcCgpIHtcblx0XHRcdG1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5zZXR0aW5ncy5tYXBJZCksIHRoaXMuZ21PcHRpb25zKTtcblx0XHRcdGluZm9XaW5kb3cgPSBuZXcgZ29vZ2xlLm1hcHMuSW5mb1dpbmRvdygpO1xuXHRcdFx0aW5mb1dpbmRvdzIgPSBuZXcgZ29vZ2xlLm1hcHMuSW5mb1dpbmRvdygpO1xuXHRcdFx0Ym91bmRzID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZ0JvdW5kcygpO1xuXHRcdH1cblxuXHRcdC8vIENyZWF0ZSB0aGUgbWFya2VyIGFuZCBzZXQgdXAgdGhlIGV2ZW50IHdpbmRvd1xuXHRcdGNyZWF0ZU1hcE1hcmtlcihwb2ludCwgaHRtbCwgaW1hZ2UsIGJveGluZm8sIGxpbmssIHRpdGxlKSB7XG5cdFx0XHRsZXQgbWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XG5cdFx0XHRcdHNoYXBlOiAgICBtYXJrZXJzaGFwZSxcblx0XHRcdFx0bGluazogICAgIGxpbmssXG5cdFx0XHRcdGljb246ICAgICBpbWFnZSxcblx0XHRcdFx0cG9zaXRpb246IHBvaW50LFxuXHRcdFx0XHR0aXRsZTogICAgdGl0bGUsXG5cdFx0XHRcdG1hcDogICAgICBtYXAsXG5cdFx0XHRcdHpJbmRleDogICA5OTlcblx0XHRcdH0pO1xuXG5cdFx0XHRnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYXJrZXIsICdtb3VzZW92ZXInLCAoZnVuY3Rpb24gKGh0bWwpIHtcblx0XHRcdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRpbmZvV2luZG93Mi5zZXRDb250ZW50KGh0bWwpO1xuXHRcdFx0XHRcdGluZm9XaW5kb3cyLm9wZW4obWFwLCBtYXJrZXIpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KShodG1sKSk7XG5cblx0XHRcdGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKG1hcmtlciwgJ21vdXNlb3V0JywgKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRpbmZvV2luZG93Mi5jbG9zZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KSgpKTtcblxuXHRcdFx0Z29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIobWFya2VyLCAnY2xvc2VjbGljaycsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0aW5mb1dpbmRvdzIuY2xvc2UoKTtcblx0XHRcdH0pO1xuXG5cdFx0XHR0aGlzLmdtYXJrZXJzLnB1c2gobWFya2VyKTtcblxuXHRcdFx0dGhpcy5jb3VudCsrO1xuXHRcdH1cblxuXHRcdGNyZWF0ZVByb3BlcnR5TWFya2VyKHBvaW50LCBodG1sLCBib3hpbmZvLCBsaW5rLCB0aXRsZSwgY29sb3IsIGlkLCBpbWFnZSwgcGlkKSB7XG5cdFx0XHRsZXQgbWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XG5cdFx0XHRcdHBvc2l0aW9uOiBwb2ludCxcblx0XHRcdFx0bGluazogICAgIGxpbmssXG5cdFx0XHRcdG1hcDogICAgICBtYXAsXG5cdFx0XHRcdGljb246ICAgICBpbWFnZSxcblx0XHRcdFx0dGl0bGU6ICAgIHRpdGxlLFxuXHRcdFx0XHRwaWQ6ICAgICAgcGlkLFxuXHRcdFx0XHR0eXBlOiAgICAgJ3Byb3BlcnR5Jyxcblx0XHRcdFx0ekluZGV4OiAgIHRoaXMuY291bnQgKyAxMDAwXG5cdFx0XHR9KTtcblxuXHRcdFx0cHJvcGVydHlkaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG5cdFx0XHQvLyBpZiAocHJvcGVydHlkaXYgIT09IG51bGwpIHtcblx0XHRcdC8vIFx0Z29vZ2xlLm1hcHMuZXZlbnQuYWRkRG9tTGlzdGVuZXIocHJvcGVydHlkaXYsICdtb3VzZW92ZXInLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHQvLyBcdFx0bWFya2VyLnNldEljb24oXG5cdFx0XHQvLyBcdFx0XHRoaWNvblxuXHRcdFx0Ly8gXHRcdClcblx0XHRcdC8vIFx0XHRtYXJrZXIuc2V0WkluZGV4KG1hcmtlci5nZXRaSW5kZXgoKSArIDEwMDApO1xuXHRcdFx0Ly8gXHR9KTtcblx0XHRcdC8vIFx0Z29vZ2xlLm1hcHMuZXZlbnQuYWRkRG9tTGlzdGVuZXIocHJvcGVydHlkaXYsICdtb3VzZW91dCcsIGZ1bmN0aW9uICgpIHtcblx0XHRcdC8vIFx0XHRtYXJrZXIuc2V0SWNvbihcblx0XHRcdC8vIFx0XHRcdGJpY29uXG5cdFx0XHQvLyBcdFx0KVxuXHRcdFx0Ly8gXHRcdG1hcmtlci5zZXRaSW5kZXgobWFya2VyLmdldFpJbmRleCgpIC0gMTAwMCk7XG5cdFx0XHQvLyBcdH0pO1xuXHRcdFx0Ly8gfVxuXG5cdFx0XHQvLyBtYXJrZXIuYWRkTGlzdGVuZXIoJ21vdXNlb3ZlcicsIChmdW5jdGlvbiAoKSB7XG5cdFx0XHQvLyBcdG1hcmtlci5zZXRJY29uKFxuXHRcdFx0Ly8gXHRcdGhpY29uXG5cdFx0XHQvLyBcdClcblx0XHRcdC8vIFx0bWFya2VyLnNldFpJbmRleChtYXJrZXIuZ2V0WkluZGV4KCkgKyAxMDAwKTtcblx0XHRcdC8vIH0pKTtcblx0XHRcdC8vXG5cdFx0XHQvLyBtYXJrZXIuYWRkTGlzdGVuZXIoJ21vdXNlb3V0JywgKGZ1bmN0aW9uICgpIHtcblx0XHRcdC8vIFx0bWFya2VyLnNldEljb24oXG5cdFx0XHQvLyBcdFx0Ymljb25cblx0XHRcdC8vIFx0KVxuXHRcdFx0Ly8gXHRtYXJrZXIuc2V0WkluZGV4KG1hcmtlci5nZXRaSW5kZXgoKSAtIDEwMDApO1xuXHRcdFx0Ly8gfSkpO1xuXG5cdFx0XHQvLyBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYXJrZXIsICdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHRcdFx0Ly8gXHRtYXJrZXIuc2V0VmlzaWJsZShmYWxzZSk7IC8vIG1hcHMgQVBJIGhpZGUgY2FsbFxuXHRcdFx0Ly8gfSk7XG5cblx0XHRcdG1hcmtlci5hZGRMaXN0ZW5lcignbW91c2Vkb3duJywgKGZ1bmN0aW9uIChib3hpbmZvKSB7XG5cdFx0XHRcdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0aW5mb1dpbmRvdy5jbG9zZSgpO1xuXHRcdFx0XHRcdCQoJyNrci1pbmZvd2luZG93JykuaGlkZSgpO1xuXHRcdFx0XHRcdGluZm9XaW5kb3cuc2V0Q29udGVudChodG1sKTtcblx0XHRcdFx0XHRpbmZvV2luZG93Lm9wZW4obWFwLCBtYXJrZXIpO1xuXG5cdFx0XHRcdFx0JC5hamF4KHtcblx0XHRcdFx0XHRcdHR5cGU6ICAgIFwiUE9TVFwiLFxuXHRcdFx0XHRcdFx0dXJsOiAgICAgbGl2ZXNpdGUgKyAnaW5kZXgucGhwP29wdGlvbj1jb21fa25vd3JlcyZ0YXNrPXByb3BlcnR5Lm1hcGluZm93aW5kb3cmbGFuZz0nICsgbGFuZyxcblx0XHRcdFx0XHRcdGRhdGE6ICAgIHtcblx0XHRcdFx0XHRcdFx0aWQ6IHBhcnNlSW50KGJveGluZm8pXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0c3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcblx0XHRcdFx0XHRcdFx0JCgnI2tyLWluZm93aW5kb3cnKS5mYWRlSW4oNDAwKS5odG1sKGRhdGEpLnNob3coKTtcblx0XHRcdFx0XHRcdFx0JChcIi5rci1pbmZvd2luZG93LXNsaWRlc2hvd1wiKS5ub3QoJy5zbGljay1pbml0aWFsaXplZCcpLnNsaWNrKHtcblx0XHRcdFx0XHRcdFx0XHRuZXh0QXJyb3c6ICc8aSBjbGFzcz1cInNsaWNrLW5hdiBuZXh0IGZhcyBmYS1jaGV2cm9uLXJpZ2h0IFwiPjwvaT4nLFxuXHRcdFx0XHRcdFx0XHRcdHByZXZBcnJvdzogJzxpIGNsYXNzPVwic2xpY2stbmF2IHByZXYgZmFzIGZhLWNoZXZyb24tbGVmdCBcIj48L2k+Jyxcblx0XHRcdFx0XHRcdFx0XHRhdXRvcGxheTogIHRydWVcblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH07XG5cdFx0XHR9KShib3hpbmZvKSk7XG5cblx0XHRcdGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKG1hcmtlciwgJ2Nsb3NlY2xpY2snLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdCQoJyNrci1pbmZvd2luZG93JykuaGlkZSgpO1xuXHRcdFx0XHRpbmZvV2luZG93LmNsb3NlKCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0dGhpcy5nbWFya2Vycy5wdXNoKG1hcmtlcik7XG5cdFx0XHRib3VuZHMuZXh0ZW5kKHBvaW50KTtcblxuXHRcdFx0dGhpcy5jb3VudCsrO1xuXHRcdH1cblxuXHRcdC8vSW5pdGlhbGlzZSBtYXBcblx0XHRpbml0TWFwKCkge1xuXHRcdFx0dGhpcy5jcmVhdGVNYXAoKTtcbi8vXHRcdFx0dGhpcy5zZXRNYXJrZXJJY29ucygpO1xuXG5cdFx0XHRpZiAodGhpcy5zZXR0aW5ncy5tYXBUeXBlID09PSAnY2x1c3RlcicpIHtcblx0XHRcdFx0dGhpcy5jbHVzdGVyTWFwKCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLnNvbG9NYXAoKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBSZXNldCBtYXAgdG8gaW5pdGlhbCBzdGF0ZVxuXHRcdHJlZnJlc2hNYXAoJG1hcG1vZGFsKSB7XG5cdFx0XHRpZiAodGhpcy5zZXR0aW5ncy5tYXBUeXBlID09PSAnc29sbycpXG5cdFx0XHRcdHJldHVybjtcblxuXHRcdFx0bGV0IHNlbGYgPSB0aGlzO1xuXHRcdFx0alF1ZXJ5LmFqYXgoe1xuXHRcdFx0XHR1cmw6ICAgICAgbGl2ZXNpdGUgKyAnaW5kZXgucGhwP29wdGlvbj1jb21fa25vd3JlcyZ0YXNrPXByb3BlcnRpZXMucmVmcmVzaG1hcCZsYW5nPScgKyBsYW5nLFxuXHRcdFx0XHR0eXBlOiAgICAgXCJQT1NUXCIsXG5cdFx0XHRcdGRhdGFUeXBlOiBcImpzb25cIixcblx0XHRcdFx0c3VjY2VzczogIGZ1bmN0aW9uIChyZXN1bHQpIHtcblx0XHRcdFx0XHRpZiAocmVzdWx0LnN1Y2Nlc3MpIHtcblx0XHRcdFx0XHRcdHNlbGYuc2V0dGluZ3MuZmlsdGVySWRzID0gcmVzdWx0LmRhdGEuZmlsdGVySWRzO1xuXHRcdFx0XHRcdFx0Zm9yIChsZXQgZCA9IDA7IGQgPCBzZWxmLmdtYXJrZXJzLmxlbmd0aDsgZCsrKSB7XG5cdFx0XHRcdFx0XHRcdGxldCBtYXJrZXIgPSBzZWxmLmdtYXJrZXJzW2RdO1xuXHRcdFx0XHRcdFx0XHRpZiAobWFya2VyLnR5cGUgPT09ICdwcm9wZXJ0eScpIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoc2VsZi5zZXR0aW5ncy5maWx0ZXJJZHMuaW5jbHVkZXMobWFya2VyLnBpZCkpIHtcblx0XHRcdFx0XHRcdFx0XHRcdG1hcmtlci5zZXRWaXNpYmxlKHRydWUpO1xuXHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRtYXJrZXIuc2V0VmlzaWJsZShmYWxzZSk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdG1jLnJlcGFpbnQoKTtcblx0XHRcdFx0XHRcdG5ldyBGb3VuZGF0aW9uLlJldmVhbCgkbWFwbW9kYWwpO1xuXHRcdFx0XHRcdFx0JG1hcG1vZGFsLmZvdW5kYXRpb24oJ29wZW4nKTtcblx0XHRcdFx0XHRcdGdvb2dsZS5tYXBzLmV2ZW50LnRyaWdnZXIobWFwLCAncmVzaXplJyk7XG5cdFx0XHRcdFx0XHQkbWFwbW9kYWwuZm91bmRhdGlvbignb3BlbicpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRhbGVydChyZXN1bHQubWVzc2FnZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHQvLyBSZXNldCBtYXAgdG8gaW5pdGlhbCBzdGF0ZVxuXHRcdHJlc2V0TWFwKCkge1xuXHRcdFx0aW5mb1dpbmRvdy5jbG9zZSgpO1xuXHRcdFx0aW5mb1dpbmRvdzIuY2xvc2UoKTtcblx0XHRcdCQoJyNrci1pbmZvd2luZG93JykuaGlkZSgpO1xuXHRcdFx0bWFwLmZpdEJvdW5kcyhib3VuZHMpO1xuXG5cdFx0XHR0aGlzLmNoZWNrWm9vbSgpO1xuXHRcdH1cblxuXHRcdC8vIGxvb3AgdG8gc2V0IG1hcCBtYXJrZXJzXG5cdFx0c2V0TWFwTWFya2VycygpIHtcblx0XHRcdGxldCBwb2ludDtcblx0XHRcdGxldCBhbWFyaztcblxuXHRcdFx0Zm9yIChsZXQgZCA9IDA7IGQgPCB0aGlzLnNldHRpbmdzLm1hcE1hcmtlcnMubGVuZ3RoOyBkKyspIHtcblx0XHRcdFx0YW1hcmsgPSB0aGlzLnNldHRpbmdzLm1hcE1hcmtlcnNbZF07XG5cblx0XHRcdFx0bGV0IG1hcmtlcmljb24gPSB7XG5cdFx0XHRcdFx0dXJsOiAgYW1hcmtbJ2ljb24nXSxcblx0XHRcdFx0XHRzaXplOiBuZXcgZ29vZ2xlLm1hcHMuU2l6ZSgzMiwgMzcpLFxuXHRcdFx0XHRcdC8vIE9SIHNjYWxlZFNpemU6IG5ldyBnb29nbGUubWFwcy5TaXplKDQwLCA0Nylcblx0XHRcdFx0XHRvcmlnaW46IG5ldyBnb29nbGUubWFwcy5Qb2ludCgwLCAwKSxcblx0XHRcdFx0XHRhbmNob3I6IG5ldyBnb29nbGUubWFwcy5Qb2ludCgwLCAxOClcblx0XHRcdFx0fTtcblxuXHRcdFx0XHRwb2ludCA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoYW1hcmtbJ2xhdCddLCBhbWFya1snbG5nJ10pO1xuXHRcdFx0XHRwb2ludCA9IHRoaXMuY2hlY2tEdXBsaWNhdGUocG9pbnQpO1xuXHRcdFx0XHR0aGlzLmNyZWF0ZU1hcE1hcmtlcihwb2ludCwgYW1hcmtbJ2h0bWwnXSwgbWFya2VyaWNvbiwgJycsICcnLCBhbWFya1sndGl0bGUnXSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gc2V0TWFya2VySWNvbnMoKSB7XG5cdFx0Ly8gXHRiaWNvbiA9IHtcblx0XHQvLyBcdFx0cGF0aDogICAgICAgICAnL21lZGlhL2NvbV9rbm93cmVzL2Fzc2V0cy9pbWFnZXMvc3ZnJyxcblx0XHQvLyBcdFx0ZmlsbENvbG9yOiAgICB0aGlzLnNldHRpbmdzLm1hcmtlckNvbG9yLFxuXHRcdC8vIFx0XHRmaWxsT3BhY2l0eTogIDAuOSxcblx0XHQvLyBcdFx0YW5jaG9yOiAgICAgICBuZXcgZ29vZ2xlLm1hcHMuUG9pbnQoOSwgMzUpLFxuXHRcdC8vIFx0XHRzdHJva2VDb2xvcjogIFwiI2VmZWZlZlwiLFxuXHRcdC8vIFx0XHRzdHJva2VXZWlnaHQ6IDAuNSxcblx0XHQvLyBcdFx0c2NhbGU6ICAgICAgICAxXG5cdFx0Ly8gXHR9O1xuXHRcdC8vIFx0aGljb24gPSB7XG5cdFx0Ly8gXHRcdHBhdGg6ICAgICAgICAgJy9tZWRpYS9jb21fa25vd3Jlcy9hc3NldHMvaW1hZ2VzL3N2ZycsXG5cdFx0Ly8gXHRcdGZpbGxDb2xvcjogICAgXCJncmVlblwiLFxuXHRcdC8vIFx0XHRmaWxsT3BhY2l0eTogIDEsXG5cdFx0Ly8gXHRcdGFuY2hvcjogICAgICAgbmV3IGdvb2dsZS5tYXBzLlBvaW50KDksIDM1KSxcblx0XHQvLyBcdFx0c3Ryb2tlQ29sb3I6ICBcIiNlZmVmZWZcIixcblx0XHQvLyBcdFx0c3Ryb2tlV2VpZ2h0OiAwLjgsXG5cdFx0Ly8gXHRcdHNjYWxlOiAgICAgICAgMS41XG5cdFx0Ly8gXHR9O1xuXHRcdC8vIH1cblxuXHRcdC8vIGxvb3AgdG8gc2V0IHByb3BlcnR5IG1hcmtlcnNcblx0XHRzZXRQcm9wZXJ0eU1hcmtlcnMoKSB7XG5cdFx0XHRsZXQgcG9pbnQ7XG5cdFx0XHRsZXQgYW1hcms7XG5cblx0XHRcdGZvciAobGV0IGQgPSAwOyBkIDwgdGhpcy5zZXR0aW5ncy5wcm9wZXJ0eU1hcmtlcnMubGVuZ3RoOyBkKyspIHtcblx0XHRcdFx0YW1hcmsgPSB0aGlzLnNldHRpbmdzLnByb3BlcnR5TWFya2Vyc1tkXTtcblxuXHRcdFx0XHRpZiAoIWQpIHtcblx0XHRcdFx0XHRwcm9wZXJ0eWljb24gPSB7XG5cdFx0XHRcdFx0XHR1cmw6ICAgIGFtYXJrWydpY29uJ10sXG5cdFx0XHRcdFx0XHRzaXplOiAgIG5ldyBnb29nbGUubWFwcy5TaXplKDMyLCAzNyksXG5cdFx0XHRcdFx0XHRvcmlnaW46IG5ldyBnb29nbGUubWFwcy5Qb2ludCgwLCAwKSxcblx0XHRcdFx0XHRcdGFuY2hvcjogbmV3IGdvb2dsZS5tYXBzLlBvaW50KDAsIDIwKVxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRwb2ludCA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoYW1hcmtbJ2xhdCddLCBhbWFya1snbG5nJ10pO1xuXHRcdFx0XHRwb2ludCA9IHRoaXMuY2hlY2tEdXBsaWNhdGUocG9pbnQpO1xuXHRcdFx0XHR0aGlzLmNyZWF0ZVByb3BlcnR5TWFya2VyKHBvaW50LCBhbWFya1snaHRtbCddLCBhbWFya1snYm94aW5mbyddLCBhbWFya1snbGluayddLCBhbWFya1sndGl0bGUnXSwgYW1hcmtbJ2NvbG9yJ10sIGFtYXJrWydpZCddLCBwcm9wZXJ0eWljb24sIGFtYXJrWydwaWQnXSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0c29sb01hcCgpIHtcblx0XHRcdHRoaXMuc2V0UHJvcGVydHlNYXJrZXJzKCk7XG5cdFx0XHR0aGlzLnNldE1hcE1hcmtlcnMoKTtcblxuXHRcdFx0bWFwLmZpdEJvdW5kcyhib3VuZHMpO1xuXHRcdFx0dGhpcy5jaGVja1pvb20oKTtcblxuXHRcdFx0aWYgKHRoaXMuc2V0dGluZ3MubWFwTWFya2Vycy5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdGNvbnN0IHNlbGYgPSB0aGlzO1xuXG5cdFx0XHRcdGxldCBteUxpc3RlbmVyID0gZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIobWFwLCAnaWRsZScsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRsZXQgZm91bmQgPSAwO1xuXHRcdFx0XHRcdGxldCBjdXJyZW50Wm9vbSA9IG1hcC5nZXRab29tKCk7XG5cblx0XHRcdFx0XHR3aGlsZSAoIWZvdW5kKSB7XG5cdFx0XHRcdFx0XHRmb3VuZCA9IEtybWFwLnNob3dWaXNpYmxlTWFya2VycyhzZWxmLmdtYXJrZXJzKTtcblxuXHRcdFx0XHRcdFx0aWYgKGZvdW5kKSB7XG5cdFx0XHRcdFx0XHRcdG15TGlzdGVuZXIucmVtb3ZlKCk7XG5cdFx0XHRcdFx0XHRcdG1hcC5zZXRab29tKGN1cnJlbnRab29tKTtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGN1cnJlbnRab29tID0gY3VycmVudFpvb20gLSAxO1xuXHRcdFx0XHRcdFx0aWYgKGN1cnJlbnRab29tIDwgMTApIHtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQkKGZ1bmN0aW9uICgpIHtcblx0XHRsZXQgJG1hcG1vZGFsO1xuXG5cdFx0JCgnYm9keScpLm9uKCdjbGljaycsICcubWFwLXRyaWdnZXInLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0aWYgKG1hcERhdGEpIHtcblx0XHRcdFx0bXlLcm1hcC5yZWZyZXNoTWFwKCRtYXBtb2RhbCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRraWNrTWFwKCQodGhpcykpO1xuXHRcdFx0XHQkbWFwbW9kYWwgPSAkKCcja3Itc2VhcmNoLW1hcC1tb2RhbCcpO1xuXHRcdFx0XHRuZXcgRm91bmRhdGlvbi5SZXZlYWwoJG1hcG1vZGFsKTtcblx0XHRcdFx0JG1hcG1vZGFsLmZvdW5kYXRpb24oJ29wZW4nKTtcblx0XHRcdH1cblx0XHR9KS5vbignY2xpY2snLCAnLnJlc2V0bWFwJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdG15S3JtYXAucmVzZXRNYXAoKTtcblx0XHR9KS5vbignY2xpY2snLCAnI2tyLXNlYXJjaC1tYXAtZnVsbC1pbmZvd2luZG93LWNsb3NlJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdEtybWFwLmNsb3NlS3JJbmZvd2luZG93KCk7XG5cdFx0fSkub24oJ2NsaWNrJywgJy5jbG9zZW1hcCcsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHQkbWFwbW9kYWwuZm91bmRhdGlvbignY2xvc2UnKTtcblx0XHRcdCQuYWpheCh7XG5cdFx0XHRcdHR5cGU6ICAgIFwiUE9TVFwiLFxuXHRcdFx0XHR1cmw6ICAgICBsaXZlc2l0ZSArICdpbmRleC5waHA/b3B0aW9uPWNvbV9rbm93cmVzJnRhc2s9cHJvcGVydGllcy5tYXBzZXNzaW9uJmxhbmc9JyArIGxhbmcsXG5cdFx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSkub24oJ29wZW4uemYucmV2ZWFsJywgJyNrci1zZWFyY2gtbWFwLW1vZGFsJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdCQoJyNrci1zZWFyY2gtbWFwLWZ1bGwnKS5oZWlnaHQoJCgnI2tyLXNlYXJjaC1tYXAtbW9kYWwnKS5oZWlnaHQoKSk7XG5cdFx0XHRnb29nbGUubWFwcy5ldmVudC50cmlnZ2VyKG1hcCwgXCJyZXNpemVcIik7XG5cdFx0XHQkLmFqYXgoe1xuXHRcdFx0XHR0eXBlOiAgICBcIlBPU1RcIixcblx0XHRcdFx0dXJsOiAgICAgbGl2ZXNpdGUgKyAnaW5kZXgucGhwP29wdGlvbj1jb21fa25vd3JlcyZ0YXNrPXByb3BlcnRpZXMubWFwc2Vzc2lvbiZsYW5nPScgKyBsYW5nLFxuXHRcdFx0XHRkYXRhOiAgICB7bWFwX21vZGFsOiAnMSd9LFxuXHRcdFx0XHRzdWNjZXNzOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0pO1xuXG5cdFx0Ly8gRG9lc24ndCB0cmlnZ2VyIGlmIGluY2x1ZGVkIGFib3ZlID8/XG5cdFx0aWYgKCFtYXBEYXRhKSB7XG5cdFx0XHRjb25zdCAkc29sb1RyaWdnZXIgPSAkKCcja3ItbWFwLXNvbG8tdHJpZ2dlcicpO1xuXHRcdFx0JHNvbG9UcmlnZ2VyLm9uZSgnY2xpY2snLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdGtpY2tNYXAoJHNvbG9UcmlnZ2VyKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRpZiAod2luZG93LmxvY2F0aW9uLmhyZWYuaW5kZXhPZignI21hcCcpICE9PSAtMSAmJiAkc29sb1RyaWdnZXIubGVuZ3RoKSB7XG5cdFx0XHRcdGtpY2tNYXAoJHNvbG9UcmlnZ2VyKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBUZXN0IGZvciBmb3JjZSBtYXBcblx0XHRjb25zdCAkdHJpZ2dlciA9ICQoJy5tYXAtdHJpZ2dlcicpO1xuXHRcdGlmICgkdHJpZ2dlci5kYXRhKCdmb3JjZW1hcCcpKSB7XG5cdFx0XHQkdHJpZ2dlci50cmlnZ2VyKCdjbGljaycpO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGtpY2tNYXAoJGVsZW0pIHtcblx0XHRcdGNvbnN0IHR5cGUgPSAkZWxlbS5kYXRhKCd0eXBlJyk7XG5cdFx0XHRsZXQgcGlkID0gMDtcblx0XHRcdGlmICh0eXBlID09PSAnc29sbycpIHtcblx0XHRcdFx0cGlkID0gJGVsZW0uZGF0YSgncGlkJyk7XG5cdFx0XHR9XG5cblx0XHRcdGpRdWVyeS5hamF4KHtcblx0XHRcdFx0dXJsOiAgICAgIGxpdmVzaXRlICsgJ2luZGV4LnBocD9vcHRpb249Y29tX2tub3dyZXMmdGFzaz1wcm9wZXJ0aWVzLm1hcGRhdGEmcGlkPScgKyBwaWQgKyAnJmxhbmc9JyArIGxhbmcsXG5cdFx0XHRcdHR5cGU6ICAgICBcIlBPU1RcIixcblx0XHRcdFx0ZGF0YVR5cGU6IFwianNvblwiLFxuXHRcdFx0XHRzdWNjZXNzOiAgZnVuY3Rpb24gKHJlc3VsdCkge1xuXHRcdFx0XHRcdGlmIChyZXN1bHQuc3VjY2Vzcykge1xuXHRcdFx0XHRcdFx0c2V0dGluZ3MgPSB7XG5cdFx0XHRcdFx0XHRcdG1hcElkOiAgICAgICAgICAgJGVsZW0uZGF0YSgndGFyZ2V0JyksXG5cdFx0XHRcdFx0XHRcdG1hcFR5cGU6ICAgICAgICAgJGVsZW0uZGF0YSgndHlwZScpLFxuXHRcdFx0XHRcdFx0XHRtYXBUeXBlSWQ6ICAgICAgICRlbGVtLmRhdGEoJ21hcHR5cGVpZCcpLFxuXHRcdFx0XHRcdFx0XHRtYXBab29tOiAgICAgICAgIHBhcnNlSW50KCRlbGVtLmRhdGEoJ3pvb20nKSksXG5cdFx0XHRcdFx0XHRcdG1hcE1heFpvb206ICAgICAgcGFyc2VJbnQoJGVsZW0uZGF0YSgnem9vbW1heCcpKSxcblx0XHRcdFx0XHRcdFx0cHJvcGVydHlNYXJrZXJzOiByZXN1bHQuZGF0YS5wcm9wZXJ0eU1hcmtlcnMsXG5cdFx0XHRcdFx0XHRcdG1hcE1hcmtlcnM6ICAgICAgcmVzdWx0LmRhdGEubWFwTWFya2Vycyxcblx0XHRcdFx0XHRcdFx0ZmlsdGVySWRzOiAgICAgICByZXN1bHQuZGF0YS5maWx0ZXJJZHNcblx0XHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRcdG15S3JtYXAgPSBuZXcgS3JtYXAoc2V0dGluZ3MpO1xuXHRcdFx0XHRcdFx0bWFwRGF0YSA9IHRydWU7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGFsZXJ0KHJlc3VsdC5tZXNzYWdlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblx0fSk7XG59KGpRdWVyeSkpOyIsIi8qKlxuICogQHBhY2thZ2UgICAgS25vdyBSZXNlcnZhdGlvbnNcbiAqIEBzdWJwYWNrYWdlIFNpdGUgSlNcbiAqIEBjb3B5cmlnaHQgIDIwMjAgSGlnaGxhbmQgVmlzaW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogQGxpY2Vuc2UgICAgU2VlIHRoZSBmaWxlIFwiTElDRU5TRS50eHRcIiBmb3IgdGhlIGZ1bGwgbGljZW5zZSBnb3Zlcm5pbmcgdGhpcyBjb2RlLlxuICogQGF1dGhvciAgICAgSGF6ZWwgV2lsc29uIDxoYXplbEBoaWdobGFuZHZpc2lvbi5jb20+XG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoJCkge1xuXHRsZXQgbXlLcnJvdXRlO1xuXHRsZXQgZGlyZWN0aW9uc0Rpc3BsYXk7XG5cdGxldCBkaXJlY3Rpb25zVmlzaWJsZSA9IGZhbHNlO1xuXHRsZXQgcm91dGVNYXA7XG5cdGxldCBvcmlnaW47XG5cdGxldCBkZXN0aW5hdGlvbjtcblx0bGV0IHJvdXRlTWFya2VycyA9IFtdO1xuXHRsZXQgcm91dGVTdG9wUG9pbnRzID0gW107XG5cdGxldCBwb2ludDtcblx0bGV0IHNlbGY7XG5cblx0bGV0IHNldHRpbmdzID0ge1xuXHRcdGxhdDogICAgICAgICAgICAgICBcIlwiLFxuXHRcdGxuZzogICAgICAgICAgICAgICBcIlwiLFxuXHRcdG5hbWU6ICAgICAgICAgICAgICBcIlwiLFxuXHRcdGljb246ICAgICAgICAgICAgICBcIlwiLFxuXHRcdGRldG91cjogICAgICAgICAgICBcIlwiLFxuXHRcdG1hcFpvb206ICAgICAgICAgICA5LFxuXHRcdG1hcE1heFpvb206ICAgICAgICAyMCxcblx0XHRtYXBUeXBlSWQ6ICAgICAgICAgXCJyb2FkbWFwXCIsXG5cdFx0bWFwSWQ6ICAgICAgICAgICAgIFwia3ItbWFwLXJvdXRlXCIsXG5cdFx0ZGlyZWN0aW9uc1BhbmVsOiAgIFwia3ItZGlyZWN0aW9ucy1wYW5lbFwiLFxuXHRcdGRpcmVjdGlvbnNTZXJ2aWNlOiBudWxsXG5cdH07XG5cblx0Y2xhc3MgS3Jyb3V0ZSB7XG5cdFx0Y29uc3RydWN0b3IoJGVsZW1lbnQsIG9wdGlvbnMpIHtcblx0XHRcdHRoaXMuc2V0dGluZ3MgPSBzZXR0aW5ncztcblx0XHRcdGlmIChvcHRpb25zKSB7XG5cdFx0XHRcdCQuZXh0ZW5kKHRoaXMuc2V0dGluZ3MsIG9wdGlvbnMpO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLnNldHRpbmdzLmRpcmVjdGlvbnNTZXJ2aWNlID0gbmV3IGdvb2dsZS5tYXBzLkRpcmVjdGlvbnNTZXJ2aWNlKCk7XG5cdFx0XHR0aGlzLmluaXQoKTtcblx0XHR9XG5cblx0XHRzdGF0aWMgY2xlYXJSb3V0ZU1hcmtlcnMoKSB7XG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHJvdXRlTWFya2Vycy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRyb3V0ZU1hcmtlcnNbaV0uc2V0TWFwKG51bGwpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHN0YXRpYyBjbGVhcldheXBvaW50cygpIHtcblx0XHRcdG9yaWdpbiA9IG51bGw7XG5cdFx0XHRyb3V0ZU1hcmtlcnMgPSBbXTtcblx0XHRcdHJvdXRlU3RvcFBvaW50cyA9IFtdO1xuXHRcdFx0ZGlyZWN0aW9uc1Zpc2libGUgPSBmYWxzZTtcblx0XHR9XG5cblx0XHRhZGRSb3V0ZU1hcmtlcihsYXRsbmcpIHtcblx0XHRcdHJvdXRlTWFya2Vycy5wdXNoKG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xuXHRcdFx0XHRwb3NpdGlvbjogbGF0bG5nLFxuXHRcdFx0XHRtYXA6ICAgICAgcm91dGVNYXAsXG5cdFx0XHRcdGljb246ICAgICB0aGlzLnNldHRpbmdzLmRldG91clxuXHRcdFx0fSkpO1xuXHRcdH1cblxuXHRcdC8vXG5cdFx0Ly8gYWRkUHJvcGVydHlNYXJrZXIocG9pbnQsIGh0bWwsIGltYWdlLCBib3hpbmZvKSB7XG5cdFx0Ly8gXHRsZXQgbWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XG5cdFx0Ly8gXHRcdHBvc2l0aW9uOiBwb2ludCxcblx0XHQvLyBcdFx0aHRtbDogICAgIGh0bWwsXG5cdFx0Ly8gXHRcdG1hcDogICAgICByb3V0ZU1hcCxcblx0XHQvLyBcdFx0aWNvbjogICAgIGltYWdlLFxuXHRcdC8vIFx0XHR6SW5kZXg6ICAgMVxuXHRcdC8vIFx0fSk7XG5cdFx0Ly9cblx0XHQvLyBcdGxldCBpbmZvd2luZG93ID0gbmV3IGdvb2dsZS5tYXBzLkluZm9XaW5kb3coe1xuXHRcdC8vIFx0XHRjb250ZW50OiBib3hpbmZvXG5cdFx0Ly8gXHR9KTtcblx0XHQvL1xuXHRcdC8vIFx0Z29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIobWFya2VyLCAnY2xpY2snLCBmdW5jdGlvbiAoKSB7XG5cdFx0Ly8gXHRcdC8vIENoZWNrIHRvIHNlZSBpZiB0aGVyZSBpcyBhbiBpbmZvIHdpbmRvdyBzdG9yZWQgaW4gcm91dGVDdXJySW5mb1dpbmRvdyxcblx0XHQvLyBcdFx0Ly8gaWYgdGhlcmUgaXMsIHdlIHVzZSAuY2xvc2UoKSB0byBoaWRlIHRoZSB3aW5kb3dcblx0XHQvLyBcdFx0aWYgKHJvdXRlQ3VyckluZm9XaW5kb3cpIHtcblx0XHQvLyBcdFx0XHRyb3V0ZUN1cnJJbmZvV2luZG93LmNsb3NlKCk7XG5cdFx0Ly8gXHRcdH1cblx0XHQvLyBcdFx0Ly8gUHV0IG91ciBuZXcgaW5mbyB3aW5kb3cgaW4gdG8gdGhlIHJvdXRlQ3VyckluZm9XaW5kb3cgdmFyaWFibGVcblx0XHQvLyBcdFx0cm91dGVDdXJySW5mb1dpbmRvdyA9IGluZm93aW5kb3c7XG5cdFx0Ly8gXHRcdC8vIE9wZW4gdGhlIHdpbmRvd1xuXHRcdC8vIFx0XHRpbmZvd2luZG93Lm9wZW4ocm91dGVNYXAsIG1hcmtlcik7XG5cdFx0Ly8gXHR9KTtcblx0XHQvL1xuXHRcdC8vIFx0Ly9nbWFya2Vycy5wdXNoKCBtYXJrZXIgKTtcblx0XHQvLyBcdHJvdXRlTWFya2Vycy5wdXNoKG1hcmtlcik7XG5cdFx0Ly8gfVxuXG5cdFx0Ly8gc3RhdGljIHVwZGF0ZU1vZGUoKSB7XG5cdFx0Ly8gXHRpZiAoZGlyZWN0aW9uc1Zpc2libGUpIHtcblx0XHQvLyBcdFx0dGhpcy5jYWxjUm91dGUoKTtcblx0XHQvLyBcdH1cblx0XHQvLyB9XG5cblx0XHRjYWxjUm91dGUoKSB7XG5cdFx0XHRsZXQgZnJvbV9hZGRyZXNzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmcm9tX2FkZHJlc3NcIikudmFsdWU7XG5cdFx0XHRsZXQgb3JpZ2luID0gXCJcIjtcblxuXHRcdFx0aWYgKGZyb21fYWRkcmVzcyA9PT0gXCJBZGRyZXNzXCIpIGZyb21fYWRkcmVzcyA9IFwiXCI7XG5cdFx0XHRpZiAoZnJvbV9hZGRyZXNzKSBvcmlnaW4gPSBmcm9tX2FkZHJlc3MgKyBcIixcIiArIFwiXCI7XG5cblx0XHRcdGxldCBtb2RlO1xuXHRcdFx0c3dpdGNoIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1vZGVcIikudmFsdWUpIHtcblx0XHRcdFx0Y2FzZSBcImJpY3ljbGluZ1wiOlxuXHRcdFx0XHRcdG1vZGUgPSBnb29nbGUubWFwcy5EaXJlY3Rpb25zVHJhdmVsTW9kZS5CSUNZQ0xJTkc7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJkcml2aW5nXCI6XG5cdFx0XHRcdFx0bW9kZSA9IGdvb2dsZS5tYXBzLkRpcmVjdGlvbnNUcmF2ZWxNb2RlLkRSSVZJTkc7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJ3YWxraW5nXCI6XG5cdFx0XHRcdFx0bW9kZSA9IGdvb2dsZS5tYXBzLkRpcmVjdGlvbnNUcmF2ZWxNb2RlLldBTEtJTkc7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChvcmlnaW4pIHtcblx0XHRcdFx0bGV0IHJlcXVlc3QgPSB7XG5cdFx0XHRcdFx0b3JpZ2luOiAgICAgICAgb3JpZ2luLFxuXHRcdFx0XHRcdGRlc3RpbmF0aW9uOiAgIGRlc3RpbmF0aW9uLFxuXHRcdFx0XHRcdHdheXBvaW50czogICAgIHJvdXRlU3RvcFBvaW50cyxcblx0XHRcdFx0XHR0cmF2ZWxNb2RlOiAgICBtb2RlLFxuXHRcdFx0XHRcdGF2b2lkSGlnaHdheXM6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoaWdod2F5cycpLmNoZWNrZWQsXG5cdFx0XHRcdFx0YXZvaWRUb2xsczogICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvbGxzJykuY2hlY2tlZFxuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdHNlbGYgPSB0aGlzO1xuXHRcdFx0XHR0aGlzLnNldHRpbmdzLmRpcmVjdGlvbnNTZXJ2aWNlLnJvdXRlKHJlcXVlc3QsIGZ1bmN0aW9uIChyZXNwb25zZSwgc3RhdHVzKSB7XG5cdFx0XHRcdFx0aWYgKHN0YXR1cyA9PT0gZ29vZ2xlLm1hcHMuRGlyZWN0aW9uc1N0YXR1cy5PSykge1xuXHRcdFx0XHRcdFx0ZGlyZWN0aW9uc0Rpc3BsYXkuc2V0RGlyZWN0aW9ucyhyZXNwb25zZSk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGFsZXJ0KFwiR29vZ2xlIGNvdWxkbmB0IGNhbGN1bGF0ZSBkaXJlY3Rpb25zIGZvciB0aGlzIHJvdXRlIGFuZCBzZWxlY3RlZCBvcHRpb25zXCIpO1xuXHRcdFx0XHRcdFx0c2VsZi5yZXNldFJvdXRlKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblxuXHRcdFx0S3Jyb3V0ZS5jbGVhclJvdXRlTWFya2VycygpO1xuXHRcdFx0ZGlyZWN0aW9uc1Zpc2libGUgPSB0cnVlO1xuXHRcdH1cblxuXHRcdGluaXQoKSB7XG5cdFx0XHRkZXN0aW5hdGlvbiA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmcodGhpcy5zZXR0aW5ncy5sYXQsIHRoaXMuc2V0dGluZ3MubG5nKTtcblxuXHRcdFx0Ly9Jbml0aWFsaXNlIG1hcCBvcHRpb25zXG5cdFx0XHR0aGlzLm15T3B0aW9ucyA9IHtcblx0XHRcdFx0c2Nyb2xsd2hlZWw6ICAgICAgIGZhbHNlLFxuXHRcdFx0XHR6b29tOiAgICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5tYXBab29tLFxuXHRcdFx0XHRtYXhab29tOiAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5tYXBNYXhab29tLFxuXHRcdFx0XHRtYXBUeXBlSWQ6ICAgICAgICAgdGhpcy5zZXR0aW5ncy5tYXBUeXBlSWQsXG5cdFx0XHRcdHN0cmVldFZpZXdDb250cm9sOiBmYWxzZSxcblx0XHRcdFx0Y2VudGVyOiAgICAgICAgICAgIGRlc3RpbmF0aW9uXG5cdFx0XHR9O1xuXG5cdFx0XHRyb3V0ZU1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5zZXR0aW5ncy5tYXBJZCksIHRoaXMubXlPcHRpb25zKTtcblx0XHRcdGRpcmVjdGlvbnNEaXNwbGF5ID0gbmV3IGdvb2dsZS5tYXBzLkRpcmVjdGlvbnNSZW5kZXJlcigpO1xuXHRcdFx0ZGlyZWN0aW9uc0Rpc3BsYXkuc2V0TWFwKHJvdXRlTWFwKTtcblx0XHRcdGRpcmVjdGlvbnNEaXNwbGF5LnNldFBhbmVsKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuc2V0dGluZ3MuZGlyZWN0aW9uc1BhbmVsKSk7XG5cblx0XHRcdGNvbnN0IGltYWdlID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlckltYWdlKHRoaXMuc2V0dGluZ3MuaWNvbik7XG5cdFx0XHRwb2ludCA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmcodGhpcy5zZXR0aW5ncy5sYXQsIHRoaXMuc2V0dGluZ3MubG5nKTtcblxuXHRcdFx0c2VsZiA9IHRoaXM7XG5cdFx0XHRnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihyb3V0ZU1hcCwgJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0XHRcdGlmIChyb3V0ZVN0b3BQb2ludHMubGVuZ3RoIDwgOSkge1xuXHRcdFx0XHRcdHJvdXRlU3RvcFBvaW50cy5wdXNoKHtsb2NhdGlvbjogZXZlbnQubGF0TG5nLCBzdG9wb3ZlcjogdHJ1ZX0pO1xuXHRcdFx0XHRcdHBvaW50ID0gZXZlbnQubGF0TG5nO1xuXHRcdFx0XHRcdHNlbGYuYWRkUm91dGVNYXJrZXIocG9pbnQpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGFsZXJ0KFwiTWF4aW11bSBudW1iZXIgb2YgOSB3YXlwb2ludHMgcmVhY2hlZFwiKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdHNlbGYgPSB0aGlzO1xuXHRcdFx0Z29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXJPbmNlKHJvdXRlTWFwLCAnaWRsZScsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0Z29vZ2xlLm1hcHMuZXZlbnQudHJpZ2dlcihyb3V0ZU1hcCwgJ3Jlc2l6ZScpO1xuXHRcdFx0XHRzZWxmLmNhbGNSb3V0ZSgpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0cmVzZXRSb3V0ZSgpIHtcblx0XHRcdEtycm91dGUuY2xlYXJSb3V0ZU1hcmtlcnMoKTtcblx0XHRcdEtycm91dGUuY2xlYXJXYXlwb2ludHMoKTtcblx0XHRcdGRpcmVjdGlvbnNEaXNwbGF5LnNldE1hcChudWxsKTtcblx0XHRcdGRpcmVjdGlvbnNEaXNwbGF5LnNldFBhbmVsKG51bGwpO1xuXHRcdFx0ZGlyZWN0aW9uc0Rpc3BsYXkgPSBuZXcgZ29vZ2xlLm1hcHMuRGlyZWN0aW9uc1JlbmRlcmVyKCk7XG5cdFx0XHRkaXJlY3Rpb25zRGlzcGxheS5zZXRNYXAocm91dGVNYXApO1xuXHRcdFx0ZGlyZWN0aW9uc0Rpc3BsYXkuc2V0UGFuZWwoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5zZXR0aW5ncy5kaXJlY3Rpb25QYW5lbCkpO1xuXG5cdFx0XHR0aGlzLmluaXQoKTtcblx0XHR9XG5cdH1cblxuXHQkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG5cdFx0JChcIi5rci1kaXJlY3Rpb25zLW1vZGFsXCIpLm9uKCdjbGljaycsICcja3ItbWFwLXJvdXRlJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdGxldCAkZWxlbWVudCA9ICQodGhpcyk7XG5cdFx0XHRjb25zdCBvcHRpb25zID0ge1xuXHRcdFx0XHRsYXQ6ICAgICRlbGVtZW50LmRhdGEoJ2xhdCcpLFxuXHRcdFx0XHRsbmc6ICAgICRlbGVtZW50LmRhdGEoJ2xuZycpLFxuXHRcdFx0XHRuYW1lOiAgICRlbGVtZW50LmRhdGEoJ25hbWUnKSxcblx0XHRcdFx0aWNvbjogICAkZWxlbWVudC5kYXRhKCdpY29uJyksXG5cdFx0XHRcdGRldG91cjogJGVsZW1lbnQuZGF0YSgnZGV0b3VyJylcblx0XHRcdH07XG5cdFx0XHRteUtycm91dGUgPSBuZXcgS3Jyb3V0ZSgkZWxlbWVudCwgb3B0aW9ucyk7XG5cdFx0fSkub24oJ2NsaWNrJywgJy5yZXNldHJvdXRlJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdG15S3Jyb3V0ZS5yZXNldFJvdXRlKCk7XG5cdFx0fSkub24oJ2NsaWNrJywgJy5jYWxjcm91dGUnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0bXlLcnJvdXRlLmNhbGNSb3V0ZSgpO1xuXHRcdH0pO1xuXG5cdFx0alF1ZXJ5KFwiYSNnZW9jb2RlQWRkcmVzc1wiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0XHRsZXQgYWRkcmVzc1N0cmluZyA9XG5cdFx0XHRcdCAgICBqUXVlcnkoXCIjamZvcm1fcHJvcGVydHlfc3RyZWV0XCIpLnZhbCgpXG5cdFx0XHRcdCAgICArIFwiLCBcIlxuXHRcdFx0XHQgICAgKyBqUXVlcnkoJyNqZm9ybV90b3duX2lkJykuZmluZChcIjpzZWxlY3RlZFwiKS50ZXh0KClcblx0XHRcdFx0ICAgICsgXCIgXCJcblx0XHRcdFx0ICAgICsgalF1ZXJ5KFwiI2pmb3JtX3Byb3BlcnR5X3Bvc3Rjb2RlXCIpLnZhbCgpXG5cdFx0XHRcdCAgICArIFwiLCBcIlxuXHRcdFx0XHQgICAgKyBqUXVlcnkoJyNqZm9ybV9yZWdpb25faWQnKS5maW5kKFwiOnNlbGVjdGVkXCIpLnRleHQoKVxuXHRcdFx0XHQgICAgKyBcIiBcIlxuXHRcdFx0XHQgICAgKyBqUXVlcnkoJyNqZm9ybV9jb3VudHJ5X2lkJykuZmluZChcIjpzZWxlY3RlZFwiKS50ZXh0KCk7XG5cblx0XHRcdGxldCB1cmwgPSAnaW5kZXgucGhwP29wdGlvbj1jb21fa25vd3JlcyZ0YXNrPXByb3BlcnR5Lmdlb2NvZGUnO1xuXHRcdFx0bGV0IGNvb3JkID0gW107XG5cblx0XHRcdGpRdWVyeS5hamF4KHtcblx0XHRcdFx0dHlwZTogICAgIFwiUE9TVFwiLFxuXHRcdFx0XHR1cmw6ICAgICAgdXJsLFxuXHRcdFx0XHRkYXRhOiAgICAge2FkZHJlc3M6IGFkZHJlc3NTdHJpbmd9LFxuXHRcdFx0XHRkYXRhVHlwZTogXCJqc29uXCIsXG5cdFx0XHRcdHN1Y2Nlc3M6ICBmdW5jdGlvbiAoanNvbmRhdGEpIHtcblx0XHRcdFx0XHRqUXVlcnkuZWFjaChqc29uZGF0YSwgZnVuY3Rpb24gKGtleSwgdmFsKSB7XG5cdFx0XHRcdFx0XHRsZXQgZGl2ID0gXCIjXCIgKyBrZXk7XG5cdFx0XHRcdFx0XHRqUXVlcnkoZGl2KS52YWwodmFsKTtcblx0XHRcdFx0XHRcdGNvb3JkW2tleV0gPSB2YWw7XG5cdFx0XHRcdFx0XHRteUdtYXAucmVmcmVzaE1hcChjb29yZFsnbGF0J10sIGNvb3JkWydsbmcnXSwgZmFsc2UpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fSk7XG59KGpRdWVyeSkpOyIsIi8vIEtSIEFQUCBKUyBGaWxlc1xuaW1wb3J0ICducG0vanF1ZXJ5LWJhci1yYXRpbmcvanF1ZXJ5LmJhcnJhdGluZyc7XG5pbXBvcnQgJ25wbS9pcy1tYXJrZXItY2x1c3RlcmVyJztcbmltcG9ydCAnbWVkaWFqcy9zaXRlL2FwcCc7XG4vL2ltcG9ydCAnbWVkaWFqcy9zaXRlL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy8gY29tYm9nZW8nO1xuaW1wb3J0ICdtZWRpYWpzL3NpdGUvY29uZmlybSc7XG5pbXBvcnQgJ21lZGlhanMvc2l0ZS9kb2JlbnRyeSc7XG5pbXBvcnQgJ21lZGlhanMvc2l0ZS9ndWVzdGRhdGEnO1xuaW1wb3J0ICdtZWRpYWpzL3NpdGUvbWFwJztcbmltcG9ydCAnbWVkaWFqcy9zaXRlL3JvdXRlJztcbi8vIGltcG9ydCAnLi9qcy9zcmMva3JhcHAvc3RyaXBlJzsiXSwibmFtZXMiOlsiTWFya2VyQ2x1c3RlcmVyIiwibWFwIiwib3B0X21hcmtlcnMiLCJvcHRfb3B0aW9ucyIsImV4dGVuZCIsImdvb2dsZSIsIm1hcHMiLCJPdmVybGF5VmlldyIsIm1hcF8iLCJtYXJrZXJzXyIsImNsdXN0ZXJzXyIsInNpemVzIiwic3R5bGVzXyIsInJlYWR5XyIsIm9wdGlvbnMiLCJncmlkU2l6ZV8iLCJtaW5DbHVzdGVyU2l6ZV8iLCJtYXhab29tXyIsImltYWdlUGF0aF8iLCJNQVJLRVJfQ0xVU1RFUl9JTUFHRV9QQVRIXyIsImltYWdlRXh0ZW5zaW9uXyIsIk1BUktFUl9DTFVTVEVSX0lNQUdFX0VYVEVOU0lPTl8iLCJ6b29tT25DbGlja18iLCJ1bmRlZmluZWQiLCJhdmVyYWdlQ2VudGVyXyIsInNldHVwU3R5bGVzXyIsInNldE1hcCIsInByZXZab29tXyIsImdldFpvb20iLCJ0aGF0IiwiZXZlbnQiLCJhZGRMaXN0ZW5lciIsInpvb20iLCJyZXNldFZpZXdwb3J0IiwicmVkcmF3IiwibGVuZ3RoIiwiYWRkTWFya2VycyIsInByb3RvdHlwZSIsIm9iajEiLCJvYmoyIiwib2JqZWN0IiwicHJvcGVydHkiLCJhcHBseSIsIm9uQWRkIiwic2V0UmVhZHlfIiwiZHJhdyIsImkiLCJzaXplIiwicHVzaCIsInVybCIsImhlaWdodCIsIndpZHRoIiwiZml0TWFwVG9NYXJrZXJzIiwibWFya2VycyIsImdldE1hcmtlcnMiLCJib3VuZHMiLCJMYXRMbmdCb3VuZHMiLCJtYXJrZXIiLCJnZXRQb3NpdGlvbiIsImZpdEJvdW5kcyIsInNldFN0eWxlcyIsInN0eWxlcyIsImdldFN0eWxlcyIsImlzWm9vbU9uQ2xpY2siLCJpc0F2ZXJhZ2VDZW50ZXIiLCJnZXRUb3RhbE1hcmtlcnMiLCJzZXRNYXhab29tIiwibWF4Wm9vbSIsImdldE1heFpvb20iLCJjYWxjdWxhdG9yXyIsIm51bVN0eWxlcyIsImluZGV4IiwiY291bnQiLCJkdiIsInBhcnNlSW50IiwiTWF0aCIsIm1pbiIsInRleHQiLCJzZXRDYWxjdWxhdG9yIiwiY2FsY3VsYXRvciIsImdldENhbGN1bGF0b3IiLCJvcHRfbm9kcmF3IiwicHVzaE1hcmtlclRvXyIsImlzQWRkZWQiLCJyZXBhaW50IiwiYWRkTWFya2VyIiwicmVtb3ZlTWFya2VyXyIsImluZGV4T2YiLCJtIiwic3BsaWNlIiwicmVtb3ZlTWFya2VyIiwicmVtb3ZlZCIsInJlbW92ZU1hcmtlcnMiLCJyIiwicmVhZHkiLCJjcmVhdGVDbHVzdGVyc18iLCJnZXRUb3RhbENsdXN0ZXJzIiwiZ2V0TWFwIiwiZ2V0R3JpZFNpemUiLCJzZXRHcmlkU2l6ZSIsImdldE1pbkNsdXN0ZXJTaXplIiwic2V0TWluQ2x1c3RlclNpemUiLCJnZXRFeHRlbmRlZEJvdW5kcyIsInByb2plY3Rpb24iLCJnZXRQcm9qZWN0aW9uIiwidHIiLCJMYXRMbmciLCJnZXROb3J0aEVhc3QiLCJsYXQiLCJsbmciLCJibCIsImdldFNvdXRoV2VzdCIsInRyUGl4IiwiZnJvbUxhdExuZ1RvRGl2UGl4ZWwiLCJ4IiwieSIsImJsUGl4IiwibmUiLCJmcm9tRGl2UGl4ZWxUb0xhdExuZyIsInN3IiwiaXNNYXJrZXJJbkJvdW5kc18iLCJjb250YWlucyIsImNsZWFyTWFya2VycyIsIm9wdF9oaWRlIiwiY2x1c3RlciIsInJlbW92ZSIsIm9sZENsdXN0ZXJzIiwic2xpY2UiLCJ3aW5kb3ciLCJzZXRUaW1lb3V0IiwiZGlzdGFuY2VCZXR3ZWVuUG9pbnRzXyIsInAxIiwicDIiLCJSIiwiZExhdCIsIlBJIiwiZExvbiIsImEiLCJzaW4iLCJjb3MiLCJjIiwiYXRhbjIiLCJzcXJ0IiwiZCIsImFkZFRvQ2xvc2VzdENsdXN0ZXJfIiwiZGlzdGFuY2UiLCJjbHVzdGVyVG9BZGRUbyIsInBvcyIsImNlbnRlciIsImdldENlbnRlciIsImlzTWFya2VySW5DbHVzdGVyQm91bmRzIiwiQ2x1c3RlciIsIm1hcEJvdW5kcyIsImdldEJvdW5kcyIsIm1hcmtlckNsdXN0ZXJlciIsIm1hcmtlckNsdXN0ZXJlcl8iLCJjZW50ZXJfIiwiYm91bmRzXyIsImNsdXN0ZXJJY29uXyIsIkNsdXN0ZXJJY29uIiwiaXNNYXJrZXJBbHJlYWR5QWRkZWQiLCJjYWxjdWxhdGVCb3VuZHNfIiwibCIsImxlbiIsInVwZGF0ZUljb24iLCJnZXRNYXJrZXJDbHVzdGVyZXIiLCJnZXRTaXplIiwibXoiLCJoaWRlIiwic3VtcyIsInNldENlbnRlciIsInNldFN1bXMiLCJzaG93Iiwib3B0X3BhZGRpbmciLCJwYWRkaW5nXyIsImNsdXN0ZXJfIiwiZGl2XyIsInN1bXNfIiwidmlzaWJsZV8iLCJ0cmlnZ2VyQ2x1c3RlckNsaWNrIiwidHJpZ2dlciIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImdldFBvc0Zyb21MYXRMbmdfIiwic3R5bGUiLCJjc3NUZXh0IiwiY3JlYXRlQ3NzIiwiaW5uZXJIVE1MIiwicGFuZXMiLCJnZXRQYW5lcyIsIm92ZXJsYXlNb3VzZVRhcmdldCIsImFwcGVuZENoaWxkIiwiYWRkRG9tTGlzdGVuZXIiLCJsYXRsbmciLCJ3aWR0aF8iLCJoZWlnaHRfIiwidG9wIiwibGVmdCIsImRpc3BsYXkiLCJvblJlbW92ZSIsInBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsInRleHRfIiwiaW5kZXhfIiwidXNlU3R5bGUiLCJtYXgiLCJ1cmxfIiwidGV4dENvbG9yXyIsImFuY2hvcl8iLCJ0ZXh0U2l6ZV8iLCJmb250RmFtaWx5XyIsImZvbnRXZWlnaHRfIiwiYmFja2dyb3VuZFBvc2l0aW9uXyIsImJhY2tncm91bmRQb3NpdGlvbiIsInR4dENvbG9yIiwidHh0U2l6ZSIsImZvbnRGYW1pbHkiLCJmb250V2VpZ2h0Iiwiam9pbiIsImdsb2JhbCIsIm1vZHVsZSIsImV4cG9ydHMiLCJmYWN0b3J5IiwiZGVmaW5lIiwiYW1kIiwicmVxdWlyZSIsImpRdWVyeSIsIiQiLCJCYXJSYXRpbmciLCJzZWxmIiwid3JhcEVsZW1lbnQiLCJjbGFzc2VzIiwidGhlbWUiLCIkZWxlbSIsIndyYXAiLCJ1bndyYXBFbGVtZW50IiwidW53cmFwIiwiZmluZE9wdGlvbiIsInZhbHVlIiwiaXNOdW1lcmljIiwiZmxvb3IiLCJnZXRJbml0aWFsT3B0aW9uIiwiaW5pdGlhbFJhdGluZyIsImdldEVtcHR5T3B0aW9uIiwiJGVtcHR5T3B0IiwiZmluZCIsImVtcHR5VmFsdWUiLCJhbGxvd0VtcHR5IiwicHJlcGVuZFRvIiwiZ2V0RGF0YSIsImtleSIsImRhdGEiLCJzZXREYXRhIiwic2F2ZURhdGFPbkVsZW1lbnQiLCIkb3B0IiwidmFsIiwiZW1wdHlUZXh0IiwidXNlck9wdGlvbnMiLCJyYXRpbmdWYWx1ZSIsInJhdGluZ1RleHQiLCJvcmlnaW5hbFJhdGluZ1ZhbHVlIiwib3JpZ2luYWxSYXRpbmdUZXh0IiwiZW1wdHlSYXRpbmdWYWx1ZSIsImVtcHR5UmF0aW5nVGV4dCIsInJlYWRPbmx5IiwicmVhZG9ubHkiLCJyYXRpbmdNYWRlIiwicmVtb3ZlRGF0YU9uRWxlbWVudCIsInJlbW92ZURhdGEiLCJidWlsZFdpZGdldCIsIiR3IiwiZWFjaCIsImh0bWwiLCIkYSIsInNob3dWYWx1ZXMiLCJhcHBlbmQiLCJzaG93U2VsZWN0ZWRSYXRpbmciLCJyZXZlcnNlIiwiYWRkQ2xhc3MiLCJuZXh0QWxsb3JQcmV2aW91c0FsbCIsInNldFNlbGVjdEZpZWxkVmFsdWUiLCJwcm9wIiwiY2hhbmdlIiwicmVzZXRTZWxlY3RGaWVsZCIsImRlZmF1bHRTZWxlY3RlZCIsInBhcmVudCIsImZyYWN0aW9uIiwicm91bmQiLCJyZXNldFN0eWxlIiwiJHdpZGdldCIsInJlbW92ZUNsYXNzIiwibWF0Y2giLCJhcHBseVN0eWxlIiwiYmFzZVZhbHVlIiwiZiIsIiRhbGwiLCIkZnJhY3Rpb25hbCIsImlzRGVzZWxlY3RhYmxlIiwiJGVsZW1lbnQiLCJkZXNlbGVjdGFibGUiLCJhdHRyIiwiYXR0YWNoQ2xpY2tIYW5kbGVyIiwiJGVsZW1lbnRzIiwib24iLCJwcmV2ZW50RGVmYXVsdCIsIm9uU2VsZWN0IiwiY2FsbCIsImF0dGFjaE1vdXNlRW50ZXJIYW5kbGVyIiwiYXR0YWNoTW91c2VMZWF2ZUhhbmRsZXIiLCJmYXN0Q2xpY2tzIiwic3RvcFByb3BhZ2F0aW9uIiwiY2xpY2siLCJkaXNhYmxlQ2xpY2tzIiwiYXR0YWNoSGFuZGxlcnMiLCJob3ZlclN0YXRlIiwiZGV0YWNoSGFuZGxlcnMiLCJvZmYiLCJzZXR1cEhhbmRsZXJzIiwiaW5zZXJ0QWZ0ZXIiLCJzdGF0ZSIsInRvZ2dsZUNsYXNzIiwic2V0Iiwic2lsZW50IiwiY2xlYXIiLCJvbkNsZWFyIiwiZGVzdHJveSIsIm9uRGVzdHJveSIsImluaXQiLCJlbGVtIiwiZm4iLCJiYXJyYXRpbmciLCJkZWZhdWx0cyIsIm1ldGhvZCIsInBsdWdpbiIsImlzIiwiZXJyb3IiLCJoYXNPd25Qcm9wZXJ0eSIsIm5leHQiLCJsYW5nIiwic2VhcmNoZGF0YSIsInNlYXJjaERvbmUiLCJjYWxlbmRhckxvYWRlZCIsInNhdmVkd2lkdGgiLCJsYXJnZSIsInJlc2l6ZWQiLCJsb2NhdGlvbiIsIm9yaWdpbiIsInByb3RvY29sIiwiaG9zdCIsImxpdmVzaXRlIiwiRm91bmRhdGlvbiIsImFkZFRvSnF1ZXJ5IiwiZm91bmRhdGlvbiIsImNoZWNrU2NyZWVuV2lkdGgiLCJiYXJzIiwiZSIsIiRmb3JtIiwiYWpheCIsInR5cGUiLCJzZXJpYWxpemUiLCJkYXRhVHlwZSIsInN1Y2Nlc3MiLCJyZXN1bHQiLCJmb3JtUmVzcG9uc2UiLCJocmVmIiwibWVzc2FnZSIsIiRtb2RhbCIsIlJldmVhbCIsIm9wZW4iLCJjc3MiLCJtb2RhbGlkIiwidHJpbSIsImFqYXh1cmwiLCJjb250ZW50IiwiJHRoaXMiLCJhY3Rpb24iLCJlbGVtZW50IiwicGFyZW50cyIsIiR0YXJnZXQiLCJ2YWwxIiwiZ2V0UHJvcGVydGllcyIsImNoaWxkcmVuIiwidG9nZ2xlIiwic2V0QWN0aXZlTWVudSIsInBpZCIsImxvYWRDYWxlbmRhciIsIiR0YWJzIiwic3BlY2lhbCIsInRvdWNoc3RhcnQiLCJzZXR1cCIsIl8iLCJucyIsImhhbmRsZSIsImluY2x1ZGVzIiwiYWRkRXZlbnRMaXN0ZW5lciIsInBhc3NpdmUiLCJ0b3VjaG1vdmUiLCJpZCIsInJlcGxhY2UiLCJyZWRpcmVjdCIsImZpZWxkIiwicmVsb2FkIiwic2V0U2VhcmNoRGF0YSIsInJlc3BvbnNlIiwiZW1wdHkiLCJmYWRlSW4iLCJoYXNDbGFzcyIsInNjcm9sbFRvIiwiaXRlbSIsImJhciIsInNjcmVlbldpZHRoSGFzQ2hhbmdlZCIsIk1lZGlhUXVlcnkiLCJhdExlYXN0IiwibXlDb25maXJtIiwiJG15VGFzayIsIktyY29uZmlybSIsImNvbnN0cnVjdG9yIiwiZm9ybSIsInVwZGF0ZVF1b3RlIiwic2VyaWFsaXplQXJyYXkiLCJkaXYiLCJjaGVja1Rlcm1zIiwidGVzdCIsImdldEVsZW1lbnRCeUlkIiwidGVzdGMiLCJ0ZXN0dCIsImFncmVlY2hlY2siLCJjaGVja2VkIiwiYWdyZWVjaGVja2MiLCJhZ3JlZWNoZWNrdCIsIm15S3JEb2JFbnRyeSIsInRvZGF5IiwiQkFDS1NQQUNFIiwic2V0dGluZ3MiLCJjdXN0b21fdmFsaWRhdGlvbiIsImRheXNfaW5fbW9udGgiLCJkb2N1bWVudF9kYXRlIiwiZXJyb3Jib3hfeCIsImVycm9yYm94X3kiLCJmaWVsZF9oaW50X3RleHRfZGF5IiwiZmllbGRfaGludF90ZXh0X21vbnRoIiwiZmllbGRfaGludF90ZXh0X3llYXIiLCJmaWVsZF9vcmRlciIsImZpZWxkX3dpZHRoX2RheSIsImZpZWxkX3dpZHRoX21vbnRoIiwiZmllbGRfd2lkdGhfeWVhciIsImZpZWxkX3dpZHRoX3NlcCIsIm1pbm1heCIsIm1pbl9kYXRlIiwibWF4X2RhdGUiLCJtaW5feWVhciIsIm1vbnRoX25hbWUiLCJvbl9ibHVyIiwib25fZXJyb3IiLCJvbl9jaGFuZ2UiLCJwYXJzZV9kYXRlIiwic2VwYXJhdG9yIiwic2hvd19lcnJvcnMiLCJzaG93X2hpbnRzIiwiRV9EQVlfTkFOIiwiRV9EQVlfVE9PX0JJRyIsIkVfREFZX1RPT19TTUFMTCIsIkVfQkFEX0RBWV9GT1JfTU9OVEgiLCJFX01PTlRIX05BTiIsIkVfTU9OVEhfVE9PX0JJRyIsIkVfTU9OVEhfVE9PX1NNQUxMIiwiRV9ZRUFSX05BTiIsIkVfWUVBUl9MRU5HVEgiLCJFX1lFQVJfVE9PX1NNQUxMIiwiRV9NSU5fREFURSIsIkVfTUFYX0RBVEUiLCJLckRvYkVudHJ5IiwiZ2V0WW1kIiwiRGF0ZSIsImlucHV0X2RheSIsImlucHV0X21vbnRoIiwiaW5wdXRfeWVhciIsImRhdGUiLCJnZXRNb250aCIsImdldERheSIsImdldEZ1bGxZZWFyIiwiZ2V0WW1kT2JqZWN0IiwieWVhciIsIm1vbnRoIiwiZGF5IiwiYWRkRW50cnlGaWVsZHMiLCJkb2JmaWVsZCIsImZpZWxkcyIsInNwbGl0IiwiYnVpbGRGaWVsZCIsImFmdGVyUGFzdGUiLCJ0YXJnZXQiLCJwYXJzZURhdGUiLCJzZXREYXRlIiwibmFtZSIsImtyZG9iZW50cnkiLCJpbnB1dCIsIktyRG9iSW5wdXQiLCJoaW50X3RleHQiLCJpbm5lciIsIiRpbnB1dCIsImJ1aWxkVWkiLCJ3cmFwcGVyIiwiZXJyb3Jib3giLCJzZXRGaWVsZFdpZHRocyIsImNoZWNrRG9jdW1lbnQiLCJkb2IiLCJjaGlsZGRvYiIsImNsYXNzbmFtZSIsImVsZW1lbnRzIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImNsZWFyRXJyb3IiLCJlcnJvcl90ZXh0Iiwic2hvd0Vycm9yIiwiZm9jdXMiLCJzZXRGb2N1cyIsImZvY3VzRmllbGRCZWZvcmUiLCJ5aWVsZEZvY3VzIiwiZm9jdXNGaWVsZEFmdGVyIiwiZm9jdXNJbiIsImZvY3VzT3V0Iiwid2lkZ2V0Rm9jdXNMb3N0IiwiZ2V0RGF0ZSIsImRheV92YWx1ZSIsIm1vbnRoX3ZhbHVlIiwieWVhcl92YWx1ZSIsInByb3h5TGFiZWxDbGlja3MiLCJwYXJzZUlzb0RhdGUiLCJSZWdFeHAiLCIkMyIsIiQyIiwiJDEiLCJuZXdfZGF0ZSIsInZhbGlkYXRlIiwic2V0RXJyb3IiLCJhdmFpbGFibGUiLCJ0b3RhbCIsInNldFdpZHRoIiwic2V0UmVhZG9ubHkiLCJtb2RlIiwid2lkZ2V0RXJyb3JUZXh0IiwieF9vZmZzZXQiLCJvdXRlcldpZHRoIiwieV9vZmZzZXQiLCJwb3NpdGlvbiIsImN1cnJlbnRfaW5wdXQiLCJ2YWxpZGF0ZURheSIsInZhbGlkYXRlTW9udGgiLCJ2YWxpZGF0ZVllYXIiLCJ2YWxpZGF0ZURheXNJbk1vbnRoIiwidmFsaWRhdGVDb21wbGV0ZURhdGUiLCJkYXRlX3N0ciIsImRhdGVfb2JqIiwiZGF0ZV9pc28iLCJvcHQiLCJnZXQiLCJoYXNfZm9jdXMiLCJudW0iLCJtc2ciLCJ0b1N0cmluZyIsIm9uQmx1ciIsInByb3h5IiwiYmx1ciIsImtleWRvd24iLCJrZXl1cCIsInNob3dfaGludCIsImtleV9pc19kb3duIiwiaXNEaWdpdEtleSIsImtleWNvZGUiLCJ3aGljaCIsIndhbnQiLCJuZXdfdmFsdWUiLCJzZWxlY3RfYWxsIiwic2VsZWN0IiwibmV3X3dpZHRoIiwiaG93dG9hcnJpdmUiLCJhcnJpdmFsbWVhbnMiLCJnZXRBdHRyaWJ1dGUiLCJkaXNwbGF5QXJyaXZhbCIsImNsYXNzTGlzdCIsImFycml2YWxkYXRhIiwiYWRkIiwibWFya2Vyc2hhcGUiLCJjb29yZHMiLCJteUtybWFwIiwibWFwRGF0YSIsIm1hcFpvb20iLCJpbmZvV2luZG93IiwiaW5mb1dpbmRvdzIiLCJwcm9wZXJ0eWRpdiIsInByb3BlcnR5aWNvbiIsIm1jIiwicHJvcGVydHlNYXJrZXJzIiwiZmlsdGVySWRzIiwibWFwTWFya2VycyIsIm1hcFR5cGVJZCIsIm1hcE1heFpvb20iLCJtYXBUeXBlIiwibWFwSWQiLCJtYXJrZXJDb2xvciIsIktybWFwIiwiZ21PcHRpb25zIiwic2Nyb2xsd2hlZWwiLCJzdHJlZXRWaWV3Q29udHJvbCIsImdtYXJrZXJzIiwiaW5pdE1hcCIsImNsb3NlS3JJbmZvd2luZG93IiwiY2xvc2UiLCJzaG93VmlzaWJsZU1hcmtlcnMiLCJzZXRWaXNpYmxlIiwiY2hlY2tEdXBsaWNhdGUiLCJjdXJyZW50IiwiZHVwcyIsImVxdWFscyIsIm5ld0xhdCIsIm5ld0xuZyIsImNoZWNrWm9vbSIsIm15bGlzdGVuZXIiLCJjdXJyZW50Wm9vbSIsInNldFpvb20iLCJjbHVzdGVyTWFwIiwibWNPcHRpb25zIiwiZ3JpZFNpemUiLCJpbWFnZVBhdGgiLCJpZ25vcmVIaWRkZW5NYXJrZXJzIiwic2V0UHJvcGVydHlNYXJrZXJzIiwic2V0TWFwTWFya2VycyIsImNyZWF0ZU1hcCIsIk1hcCIsIkluZm9XaW5kb3ciLCJjcmVhdGVNYXBNYXJrZXIiLCJwb2ludCIsImltYWdlIiwiYm94aW5mbyIsImxpbmsiLCJ0aXRsZSIsIk1hcmtlciIsInNoYXBlIiwiaWNvbiIsInpJbmRleCIsInNldENvbnRlbnQiLCJjcmVhdGVQcm9wZXJ0eU1hcmtlciIsImNvbG9yIiwibm90Iiwic2xpY2siLCJuZXh0QXJyb3ciLCJwcmV2QXJyb3ciLCJhdXRvcGxheSIsInNvbG9NYXAiLCJyZWZyZXNoTWFwIiwiJG1hcG1vZGFsIiwiYWxlcnQiLCJyZXNldE1hcCIsImFtYXJrIiwibWFya2VyaWNvbiIsIlNpemUiLCJQb2ludCIsImFuY2hvciIsIm15TGlzdGVuZXIiLCJmb3VuZCIsImtpY2tNYXAiLCJtYXBfbW9kYWwiLCIkc29sb1RyaWdnZXIiLCJvbmUiLCIkdHJpZ2dlciIsIm15S3Jyb3V0ZSIsImRpcmVjdGlvbnNEaXNwbGF5IiwiZGlyZWN0aW9uc1Zpc2libGUiLCJyb3V0ZU1hcCIsImRlc3RpbmF0aW9uIiwicm91dGVNYXJrZXJzIiwicm91dGVTdG9wUG9pbnRzIiwiZGV0b3VyIiwiZGlyZWN0aW9uc1BhbmVsIiwiZGlyZWN0aW9uc1NlcnZpY2UiLCJLcnJvdXRlIiwiRGlyZWN0aW9uc1NlcnZpY2UiLCJjbGVhclJvdXRlTWFya2VycyIsImNsZWFyV2F5cG9pbnRzIiwiYWRkUm91dGVNYXJrZXIiLCJjYWxjUm91dGUiLCJmcm9tX2FkZHJlc3MiLCJEaXJlY3Rpb25zVHJhdmVsTW9kZSIsIkJJQ1lDTElORyIsIkRSSVZJTkciLCJXQUxLSU5HIiwicmVxdWVzdCIsIndheXBvaW50cyIsInRyYXZlbE1vZGUiLCJhdm9pZEhpZ2h3YXlzIiwiYXZvaWRUb2xscyIsInJvdXRlIiwic3RhdHVzIiwiRGlyZWN0aW9uc1N0YXR1cyIsIk9LIiwic2V0RGlyZWN0aW9ucyIsInJlc2V0Um91dGUiLCJteU9wdGlvbnMiLCJEaXJlY3Rpb25zUmVuZGVyZXIiLCJzZXRQYW5lbCIsIk1hcmtlckltYWdlIiwibGF0TG5nIiwic3RvcG92ZXIiLCJhZGRMaXN0ZW5lck9uY2UiLCJkaXJlY3Rpb25QYW5lbCIsImFkZHJlc3NTdHJpbmciLCJjb29yZCIsImFkZHJlc3MiLCJqc29uZGF0YSIsIm15R21hcCJdLCJzb3VyY2VSb290IjoiIn0=