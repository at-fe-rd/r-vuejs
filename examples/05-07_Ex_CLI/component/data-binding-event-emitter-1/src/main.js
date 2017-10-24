// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import accounting from './assets/js/accounting';
Vue.config.productionTip = false


Vue.filter("toCurrency",function(value){
  return accounting.formatMoney(value);
});

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
});