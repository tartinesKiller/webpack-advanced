<template>
    <div id='login'>
        <v-layout row justify-center>
            <v-flex xs12 sm10 md6 lg5 >
                <v-alert value="true" color="warning">
                    <v-icon>lock</v-icon> \{\{ $t("requireLogin") \}\}
                </v-alert>
            </v-flex>
        </v-layout>
        <br />
        <v-layout row justify-center>
            <v-flex xs12 sm10 md6 lg3>
                <transition appear name="slide-x-transition">
                    <v-card>
                            <v-card-title primary-title>
                                <div class="headline">\{\{ $t("login") \}\}</div>
                            </v-card-title>
                            <v-card-text>
                                <v-text-field :label="$t('lblUsername')" v-model="vm.username" required autofocus :error="error"></v-text-field>
                                <v-text-field :label="$t('lblPassword')" v-model="vm.password" type="password" :error="error" required @keyup.enter="login(vm)"></v-text-field>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn flat color="success" @click="login(vm)" :loading="inProgress" :disabled="inProgress">Login</v-btn>
                            </v-card-actions>
                        </v-card>
                </transition>
            </v-flex>
        </v-layout>
    </div>
</template>
<i18n>
{
  "en": {
    "requireLogin": "This service is available only to registered users. Enter your credentials.",
    "lblUsername": "Username",
    "lblPassword": "Password",
    "login": "Login"
  },
  "fr": {
    "requireLogin": "Ce service requiert d'être authentifié. Veuillez vous connecter.",
    "lblUsername": "Nom d'utilisateur",
    "lblPassword": "Mot de passe",
    "login": "Connexion"
  }
}
</i18n>

<script>
import { mapActions, mapGetters } from "vuex";
import { EventBus } from "../../EventBus";
export default {
    name: "login",
    data () {
        return {
            vm: {
                username: undefined,
                password: undefined,
            },
            loadInProgress: false,
            error: false,
        };
    },
    methods: {
        ...mapActions(["login"]),
    },
    computed: {
        ...mapGetters(["inProgress"]),
    },
    created () {
        EventBus.$on("login", () => {
            this.$router.push("/");
        });
        EventBus.$on("login_error", () => {
            this.error = true;
        });
    },
};
</script>

<style scoped>

</style>
