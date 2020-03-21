<template>
    <div style="height: 100vh; width: 100%">
        <GmapMap :center="currentCenter" :zoom="currentZoom" map-type-id="roadmap" style="width: 100%; height: 100%" :options="googlemap_options" ref="mapRef">
            <gmap-info-window :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen" @closeclick="infoWinOpen = false"></gmap-info-window>
            <GmapMarker :key="index" v-for="(m, index) in markers" :position="m.position" :clickable="true" :draggable="false" @click="toggleInfoWindow(m, index)" title="test" />
        </GmapMap>
    </div>
</template>

<script>
import { latLng } from 'leaflet';
import { LMap, LTileLayer, LMarker, LPopup, LTooltip } from 'vue2-leaflet';
import {gmapApi} from 'vue2-google-maps';
export default {
    name: 'Example',
    components: {
        LMap,
        LTileLayer,
        LMarker,
        LPopup,
        LTooltip
    },
    data() {
        return {
            zoom: 6,
            center: latLng(38.705241986824156, -220.30883396789451 + 360),
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            withPopup: latLng(35.66634784801858, 139.75972976237588),
            withTooltip: latLng(35.66634784801858, 139.75972976237588),
            currentZoom: 6,
            currentCenter: latLng(38.705241986824156, -220.30883396789451 + 360),
            showParagraph: false,
            mapOptions: {
                zoomSnap: 0.5
            },
            showMap: true,
            markers: [
                {
                    position: {
                        lat: 35.66634784801858,
                        lng: 139.75972976237588
                    },
                    infoText: '<strong>Marker 1</strong>'
                },
                { position: { lat: 10, lng: 11 } },
                { position: { lat: 11, lng: 10 } },
                { position: { lat: 9, lng: 10 } },
                { position: { lat: 10, lng: 9 } }
            ],
            googlemap_options: {
                zoomControl: true,
                mapTypeControl: false,
                scaleControl: false,
                streetViewControl: false,
                rotateControl: false,
                fullscreenControl: true,
                disableDefaultUI: true,
                clickableIcons: true,
                gestureHandling: 'cooperative',
                backgroundColor: 'white'
            },
            infoWindowPos: null,
            infoWinOpen: false,
            currentMidx: null,

            infoOptions: {
                content: '',
                //optional: offset infowindow so it visually sits nicely on top of our marker
                pixelOffset: {
                    width: 0,
                    height: -40
                }
            }
        };
    },
    computed: {
        google: gmapApi
      },
    methods: {
        zoomUpdate(zoom) {
            this.currentZoom = zoom;
        },
        centerUpdate(center) {
            this.currentCenter = center;
        },
        showLongText() {
            this.showParagraph = !this.showParagraph;
        },
        innerClick() {
            alert('Click!');
        },
        toggleInfoWindow: function(marker, idx) {
            this.$refs.mapRef.$mapPromise.then(map => {
                map.panTo(marker.position);
                this.smoothZoom(map, 19, this.currentZoom);
            });
            this.infoWindowPos = marker.position;
            this.infoOptions.content = marker.infoText;
            console.log(marker);

            //check if its the same marker that was selected if yes toggle
            if (this.currentMidx == idx) {
                this.infoWinOpen = !this.infoWinOpen;
            }
            //if different marker set infowindow to open and reset current marker index
            else {
                this.infoWinOpen = true;
                this.currentMidx = idx;
            }
        },
        // the smooth zoom function
        smoothZoom(map, max, cnt) {
            if (cnt >= max) {
                return;
            } else {
                let that = this;
                this.$refs.mapRef.$mapPromise.then(map => {
                    var z = this.google.maps.event.addListener(map, 'zoom_changed', function(event) {
                        that.google.maps.event.removeListener(z);
                        that.smoothZoom(map, max, cnt + 1);
                    });
                    setTimeout(function() {
                        map.setZoom(cnt);
                    }, 70); // 80ms is what I found to work well on my system -- it might not work well on all systems
                });
            }
        }
    }
};
</script>
