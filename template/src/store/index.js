import Vuex from "vuex";
import Vue from "vue";
import { ServiceAuth } from "../services/serviceAuth";
import createPersistedState from "vuex-persistedstate";
import { EventBus } from "../EventBus";

Vue.use(Vuex);

const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_USER = "LOGIN_USER";
const LOGOUT = "LOGOUT";
const IN_PROGRESS = "IN_PROGRESS";
const TOGGLE_THEME = "TOGGLE_THEME";
const TOGGLE_ANIMATIONS = "TOGGLE_ANIMATIONS";
const SET_ANIMATIONS_ENABLED = "SET_ANIMATIONS_ENABLED";
const SET_BG_TASK_RUNNING = "SET_BG_TASK_RUNNING";

const _auth = new ServiceAuth();

export const store = new Vuex.Store({
    plugins: [createPersistedState({
        paths: [
            "settings",
        ],
    })],
    state: {
        settings: {
            light: true,
            animations: true,
        },
        backgroundTaskInProgress: false,
        user: undefined,
        loggedIn: false,
        inProgress: false,
    },
    mutations: {
        [SET_BG_TASK_RUNNING] (state, value) {
            state.backgroundTaskInProgress = value;
        },
        [IN_PROGRESS] (state) {
            state.inProgress = true;
        },
        [LOGIN_SUCCESS] (state) {
            state.loggedIn = true;
        },
        [LOGIN_USER] (state, user) {
            Vue.set(state, "user", user);
            state.inProgress = false;
        },
        [LOGOUT] (state) {
            state.user = undefined;
            state.loggedIn = false;
            state.inProgress = false;
        },
        [TOGGLE_THEME] (state) {
            state.settings.light = !state.settings.light;
        },
        [TOGGLE_ANIMATIONS] (state) {
            state.settings.animations = !state.settings.animations;
        },
        [SET_ANIMATIONS_ENABLED] (state, value) {
            state.settings.animations = value;
        },
    },
    actions: {
        login ({ commit }, creds) {
            commit(IN_PROGRESS);
            _auth.login(creds.username, creds.password).then(response => {
                commit(LOGIN_SUCCESS);
                _auth.getUserAsync().then(response => {
                    commit(LOGIN_USER, response.data);
                    EventBus.$emit("login", response.data);
                }).catch(error => {
                    console.error(error);
                    alert(error.message);
                    commit(LOGOUT);
                });
            }).catch(error => {
                if (error.response.status === 401) { // erreur d'auth
                    commit(LOGOUT);
                    EventBus.$emit("login_error");
                } else {
                    console.log(error);
                    commit(LOGOUT);
                    EventBus.$emit("login_error");
                }
            });
        },
        setLoggedIn ({ commit }, user) {
            commit(LOGIN_SUCCESS);
            commit(LOGIN_USER, user);
        },
        logout ({ commit }) {
            _auth.logout().then(response => {
                commit(LOGOUT);
                EventBus.$emit("logout");
            }).catch(error => {
                console.log(error);
                alert(error.message);
            });
        },
        toggleTheme ({commit}) {
            commit(TOGGLE_THEME);
        },
        toggleAnimations ({commit}) {
            commit(TOGGLE_ANIMATIONS);
        },
        setAnimationEnabled ({commit}, value) {
            commit(SET_ANIMATIONS_ENABLED, value);
        },
        setBgTaskRunning ({commit}, value) {
            commit(SET_BG_TASK_RUNNING, value);
        },
    },
    getters: {
        isLoggedIn: state => state.loggedIn,
        username: state => {
            if (!state.user) {
                return "";
            }
            return state.user.UserName;
        },
        bgTaskRunning: state => state.backgroundTaskInProgress,
        inProgress: state => state.inProgress,
        lightTheme: state => state.settings.light,
        user: state => state.user,
        animationsEnabled: state => state.settings.animations,
    },
});
