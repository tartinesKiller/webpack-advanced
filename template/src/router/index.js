import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";
import Login from "../components/login/Login";
import { ServiceAuth } from "../services/serviceAuth";
import { store } from "../store";

Vue.use(Router);

const _auth = new ServiceAuth();

// eslint-disable-next-line no-unused-vars
function isAuth () {
    var isInVuex = store.getters.isLoggedIn;
    var user;
    if (!isInVuex) {
        user = _auth.getUser();
        if (!user) { // définitivement non
            return false;
        } else { // connecté sur le serveur, on stocke le user récupéré
            store.dispatch("setLoggedIn", user);
            return true;
        }
    } else { // est déjà dans le store, si n'est plus sur le serveur, se verra demandé de fournir ses identifiants
        return true;
    }
}

// eslint-disable-next-line no-unused-vars
function requireAuth (to, from, next) {
    if (isAuth()) {
        next();
    } else {
        next("/login");
    }
}

// eslint-disable-next-line no-unused-vars
function isConfigured () {
    var settings = store.getters.settings;
    return Object.keys(settings.locations).length && settings.mimeAudio !== "";
}

// eslint-disable-next-line no-unused-vars
function requireConfigured (to, from, next) {
    if (isConfigured()) {
        next();
    } else {
        next("/settings");
    }
}

// eslint-disable-next-line no-unused-vars
function requireAuthAndConfigured (to, from, next) {
    if (!isAuth()) {
        next("/login");
    } else if (!isConfigured()) {
        next("/settings");
    } else {
        next();
    }
}

export default new Router({
    routes: [
        {
            path: "/login",
            component: Login,
            beforeEnter: (to, from, next) => {
                if (store.getters.isLoggedIn && _auth.getUser()) { // c'est sûr, il est logué
                    next("/");
                } else {
                    next();
                }
            },
        },
        { path: "/", name: "HelloWorld", component: HelloWorld, beforeEnter: requireAuth },
    ],
    scrollBehavior (to, from, savedPosition) {
        if (to.hash) {
            return {
                selector: to.hash,
            };
        } else if (savedPosition) {
            return savedPosition;
        } else {
            return { x: 0, y: 0 };
        }
    },
});
