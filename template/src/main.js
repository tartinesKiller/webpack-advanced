{{#if_eq build "standalone"}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
{{/if_eq}}
import Vue from "vue";
import VueI18n from "vue-i18n";
import moment from "moment";
import { store } from "./store";
import translations from "./translations";

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
} from "vuetify";
import "../node_modules/vuetify/src/stylus/app.styl"
{{else}}
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.css";
{{/alacarte}}

import App from "./App";
{{#router}}
import router from "./router";
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
        primary: "#ee44aa",
        secondary: "#424242",
        accent: "#82B1FF",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107"
    }{{/theme}}
});
{{else}}
Vue.use(Vuetify{{#theme}}, { theme: {
    primary: "#ee44aa",
    secondary: "#424242",
    accent: "#82B1FF",
    error: "#FF5252",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FFC107"
}}{{/theme}});
{{/alacarte}}

Vue.config.productionTip = false;

Vue.use(VueI18n);
const i18n = new VueI18n({
    locale: navigator.language,
    messages: translations,
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
    el: "#app",
    store,
    {{#router}}
    router,
    i18n,
    {{/router}}
    {{#if_eq build "runtime"}}
    render: h => h(App),
    {{/if_eq}}
    {{#if_eq build "standalone"}}
    template: "<App/>",
    components: { App },
    {{/if_eq}}
});
