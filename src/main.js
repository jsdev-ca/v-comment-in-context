import Vue from 'vue';

import Avatar from './components/atoms/Avatar.vue';
import Badge from './components/atoms/Badge.vue';
import router from './router';
import App from './App.vue';

Vue.component('avatar', Avatar);
Vue.component('badge', Badge);

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
