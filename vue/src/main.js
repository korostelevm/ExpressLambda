import Vue from 'vue'
import App from './App.vue'
import './components/_globals'
import vueCustomElement from 'vue-custom-element'
import { EventBus } from './EventBus.js';
Vue.use(vueCustomElement);

Vue.prototype.$api = 'http://localhost:3000/'
Vue.prototype.$dispatch = function(channel, o) {
  window.dispatchEvent(new CustomEvent(`microfrontend:${channel}`, {
    detail: o,
  }));
}
EventBus.globals = {
  analytics_timers: {}
}
Vue.prototype.$time_stop = function(action, category = 'Interaction', label = 'anonymous') {
  
  try{
    if (window.gtag) {
      var elapsed = (new Date()).getTime() - EventBus.globals.analytics_timers[[action, category, label].join('').replace(/\s/g,'')]
      var event = {
        event_category: category,
        event_label: label,
        value: elapsed
      }
      console.log(category, action, label, elapsed)

      delete EventBus.globals.analytics_timers[[action, category, label].join('').replace(/\s/g,'')]
      gtag("event", action, event);
    }
  }catch(e){
    console.warn(e)
  }
}

Vue.prototype.$count = function(action, category = 'Interaction', label = 'anonymous') {
  try{
    if (window.gtag) {
      var event = {
        event_category: category,
        event_label: label,
        value: 1
      }
      gtag("event", action, event);
    }
  }catch(e){
    console.warn(e)
  }
}

Vue.prototype.$time_start = function(action, category = 'Interaction', label = 'anonymous') {
  try{
    EventBus.globals.analytics_timers[[action, category, label].join('').replace(/\s/g,'')] = (new Date()).getTime()
  }catch(e){
    console.warn(e)
  }
}

Vue.mixin({
  methods: {
    get_auth_header: function() {
      try{
        var user = JSON.parse(sessionStorage.getItem('user'))
        return user.id_token
      }catch(e){
        console.warn(e)
        return null
      }
    },
  }
})


Vue.config.productionTip = false
Vue.customElement('express-lambda-ui', App);
