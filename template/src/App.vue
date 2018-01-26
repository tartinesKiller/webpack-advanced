<template>
    <v-app :light="lightTheme" :dark="!lightTheme" :class="{ noAnim: !animationsEnabled }">
        <v-navigation-drawer app fixed clipped enable-resize-watcher dark class="secondary" v-model="drawer" v-if="isLoggedIn">
            <v-list>
                <template v-for="item in latmenuItem">
                    <v-divider v-if="item.separator" :key="item.title" />
                    <v-list-tile :key="item.title" :to="item.routerLink" ripple>
                        <v-list-tile-action>
                            <v-badge :value="item.badge()" v-if="item.badge()" right>
                                <span slot="badge">\{{ item.badgeContent() }}</span>
                                <v-icon dark>\{{ item.icon }}</v-icon>
                            </v-badge>
                            <v-icon v-else dark>\{{ item.icon }}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>\{{ item.title }}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </template>
            </v-list>
        </v-navigation-drawer>
        <v-slide-y-transition mode="out-in">
            <v-toolbar fixed clipped-left class="primary" app>
                <v-toolbar-side-icon @click.stop="drawer = !drawer" v-if="isLoggedIn" />
                <v-avatar tile class="pl-3">
                    <img src="/static/icon.png">
                </v-avatar>
                <v-toolbar-title class="clickable" v-text="title" @click="$router.push('/')"></v-toolbar-title>
                <v-spacer></v-spacer>
                <v-fade-transition mode="out-in">
                    <v-progress-circular indeterminate color="accent" v-if="bgTaskRunning">
                        <v-icon class="accent--text">file_upload</v-icon>
                    </v-progress-circular>
                </v-fade-transition>
                <v-menu bottom left>
                    <v-avatar class="red ma-3" slot="activator" v-show="isLoggedIn">
                        <span class="white--text headline">\{{ username | firstLetter }}</span>
                    </v-avatar>
                    <v-list>
                        <v-list-tile @click="logout">
                            <v-list-tile-title>Logout</v-list-tile-title>
                        </v-list-tile>
                    </v-list>
                </v-menu>
            </v-toolbar>
        </v-slide-y-transition>
        <v-content>
            <router-view>
                <v-slide-x-transition mode="out-in">
                    <v-container fluid>

                    </v-container>
                </v-slide-x-transition>
            </router-view>
        </v-content>
        <v-snackbar :timeout="snackbar.timeout" v-model="snackbar.show">
            \{{ snackbar.text }}
        </v-snackbar>
    </v-app>
</template>

<script>
import { EventBus } from "./EventBus";
import { mapGetters, mapActions } from "vuex";
export default {
    data () {
        return {
            title: "My super dupper app",
            snackbar: {
                text: "",
                timeout: 3000,
                show: false,
            },
            drawer: false,
            latmenuItem: [
                { title: this.$t("hey"), icon: "people", routerLink: {name: ""}, badge: () => false },
            ],
            indexTab: 0,
        };
    },
    computed: {
        ...mapGetters([ "username", "isLoggedIn", "lightTheme", "animationsEnabled", "bgTaskRunning" ]),
    },
    created () {
        EventBus.$on("snackbar", this.showSnackbar);
        EventBus.$on("logout", () => {
            this.$router.push("/login");
            EventBus.$emit("snackbar", this.$t("logout"), 3000);
        });
        EventBus.$on("login", user => {
            EventBus.$emit("snackbar", this.$t("welcome", { username: user.UserName }), 3000);
        });

        window.addEventListener("resize", () => {
            if (screen.width < 600) {
                document.getElementById("viewport").setAttribute("content", "initial-scale=0.7");
            } else {
                document.getElementById("viewport").setAttribute("content", "initial-scale=1");
            }
        });
        window.dispatchEvent(new Event("resize"));
    },
    methods: {
        ...mapActions(["logout"]),
        showSnackbar (message, timeout) {
            this.snackbar.text = message;
            this.snackbar.timeout = timeout;
            this.snackbar.show = true;
        },
    },
};
</script>

<style scoped>
    .clickable {
        cursor: pointer;
        transition: color 0.3s;
    }

    .clickable:hover {
        color: lightgray;
    }

    #app {
        transition: background-color 0.3s;
    }
</style>
<style>
    .noselect {
        -webkit-touch-callout: none;
        /* iOS Safari */
        -webkit-user-select: none;
        /* Safari */
        -khtml-user-select: none;
        /* Konqueror HTML */
        -moz-user-select: none;
        /* Firefox */
        -ms-user-select: none;
        /* Internet Explorer/Edge */
        user-select: none;
        /* Non-prefixed version, currently
        supported by Chrome and Opera */
    }

    .toolbar__title {
        -webkit-touch-callout: none;
        /* iOS Safari */
        -webkit-user-select: none;
        /* Safari */
        -khtml-user-select: none;
        /* Konqueror HTML */
        -moz-user-select: none;
        /* Firefox */
        -ms-user-select: none;
        /* Internet Explorer/Edge */
        user-select: none;
        /* Non-prefixed version, currently
        supported by Chrome and Opera */
    }

    /* * { transition: none !important } */

    .noAnim * {
        transition: none !important;
    }

    .datatable__expand-content:not(.v-leave-to) {
        height: auto !important;
    }

    .center {
        margin-left: auto !important;
        margin-right: auto !important;
    }

    .fullwidth {
        width: 100% !important;
    }
    .fullheight {
        height: 100% !important;
    }
</style>
<style lang="stylus">
    @import './stylus/main'
</style>
