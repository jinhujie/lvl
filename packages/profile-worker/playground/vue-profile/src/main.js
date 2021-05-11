import Vue from 'vue'
import App from './App.vue'
import Service from './service/service';

Vue.config.productionTip = false
Vue.prototype.$jsonp = function(url, options) {
  return new Service().get(url, options);
}

new Vue({
  render: function (h) { return h(App) },
}).$mount('#app')
