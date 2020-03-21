import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import './plugins/element.js'
import './plugins/leaflet.js'
import "leaflet/dist/leaflet.css"
import './plugins/googlemaps.js'

// Fix leaflet missing icon problem
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});
// -------------------------------

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
