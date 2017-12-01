{{#if_eq build "standalone"}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
{{/if_eq}}
import Vue from 'vue'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

{{#alacarte}}
import {
  Vuetify,
  VApp,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VToolbar,
  transitions
} from 'vuetify'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import '../node_modules/vuetify/src/stylus/app.styl'
{{else}}
import Vuetify from 'vuetify'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import 'vuetify/dist/vuetify.css'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
{{/alacarte}}

import App from './App'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
{{#router}}
import router from './router'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
{{/router}}

{{#alacarte}}
Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    transitions
  }{{#theme}},
  theme: {
    primary: '#ee44aa',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }{{/theme}}
}){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
{{else}}
Vue.use(Vuetify{{#theme}}, { theme: {
  primary: '#ee44aa',
  secondary: '#424242',
  accent: '#82B1FF',
  error: '#FF5252',
  info: '#2196F3',
  success: '#4CAF50',
  warning: '#FFC107'
}}{{/theme}}){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
{{/alacarte}}

Vue.config.productionTip = false{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

Vue.use(VueI18n);
const i18n = new VueI18n({
    locale: navigator.language,
    messages: {
    },
});

Vue.filter("date", (string) => {
    if (string) {
        return new Date(string).toLocaleDateString();
    }
    return "";
});
Vue.filter("dateTime", (string) => {
    if (string) {
        return new Date(string).toLocaleString();
    }
    return "";
});
Vue.filter("firstLetter", (string) => {
    if (string && string.length > 1) {
        return string[0];
    }
    return "";
});
Vue.filter("daysFromNow", (string) => {
    return moment(string).diff(new Date(), "days");
});
Vue.filter("timeFromNow", (start) => {
    var duration = new Date().getTime() - start;
    return moment.utc(duration).format("HH:mm:ss.SSS");
});
Vue.filter("time", (time) => {
    return moment.utc(time).format("mm:ss");
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  {{#router}}
  router,
  {{/router}}
  {{#if_eq build "runtime"}}
  render: h => h(App){{#if_eq lintConfig "airbnb"}},{{/if_eq}}
  {{/if_eq}}
  {{#if_eq build "standalone"}}
  template: '<App/>',
  components: { App }{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
  {{/if_eq}}
}){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
