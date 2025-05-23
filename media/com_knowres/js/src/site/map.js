/**
 * @package    Know Reservations
 * @subpackage Site JS
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

"use strict";

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
        markerColor: 'red',
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
                        let newLat = pos.lat() + -.00002 * Math.cos((+a * dups) / 180 * Math.PI);  //x
                        let newLng = pos.lng() + -.00000 * Math.sin((+a * dups) / 180 * Math.PI);  //Y
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

            google.maps.event.addListener(marker, 'mouseover', (function (html) {
                return function () {
                    infoWindow2.setContent(html);
                    infoWindow2.open(map, marker);
                };
            })(html));

            google.maps.event.addListener(marker, 'mouseout', (function () {
                return function () {
                    infoWindow2.close();
                };
            })());

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
            marker.addListener('mousedown', (function (boxinfo) {
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
            })(boxinfo));

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
            if (this.settings.mapType === 'solo')
                return;

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
                this.createPropertyMarker(point, amark['html'], amark['boxinfo'], amark['link'], amark['title'],
                    amark['color'], amark['id'], propertyicon, amark['pid']);
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
                data: {map_modal: '1'},
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
}(jQuery));