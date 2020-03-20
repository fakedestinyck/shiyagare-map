<template>
    <div style="height: 100vh; width: 100%">
        <l-map v-if="showMap" :zoom="zoom" :center="center" :options="mapOptions" style="height: 100%" @update:center="centerUpdate" @update:zoom="zoomUpdate">
            <l-tile-layer :url="url" :attribution="attribution" />
            <l-marker :lat-lng="withPopup">
                <l-popup>
                    <div @click="innerClick">
                        <p>ビーフン東<span style="color: lightcoral">台湾料理</span></p>
                        <p>什锦米粉</p>
                        <el-image
                              style="width: 100px; height: 100px"
                              src="http://arashinishiyagare-map.test/images/1584347918QQ20200316-2.png"
                              fit="scale-down"></el-image>
                        <p v-show="showParagraph">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sed pretium nisl, ut sagittis sapien. Sed vel sollicitudin nisi. Donec finibus semper
                            metus id malesuada.
                        </p>
                    </div>
                </l-popup>
            </l-marker>
            <!-- <l-marker :lat-lng="withTooltip">
                <l-tooltip :options="{ permanent: false, interactive: true }">
                    <div @click="innerClick">
                        I am a tooltip
                        <p v-show="showParagraph">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sed pretium nisl, ut sagittis sapien. Sed vel sollicitudin nisi. Donec finibus semper
                            metus id malesuada.
                        </p>
                    </div>
                </l-tooltip>
            </l-marker> -->
        </l-map>
    </div>
</template>

<script>
import { latLng } from 'leaflet';
import { LMap, LTileLayer, LMarker, LPopup, LTooltip } from 'vue2-leaflet';

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
            showMap: true
        };
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
        }
    }
};
</script>
