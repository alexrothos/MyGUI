<template>
    <v-app id="inspire">
        <v-navigation-drawer v-model="drawer" app>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="text-h6">
                        BIDS
                    </v-list-item-title>
                    <v-list-item-subtitle>
                        Monitoring System
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list dense nav v-if="$store.state['auth']">
                <v-list-item
                    v-for="item in activeItems"
                    :key="item.title"
                    :to="item.to"
                    link
                >

                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>

                </v-list-item>
            </v-list>
            <v-list v-else>
                <v-list-item :key="login_item.title" :to="login_item.to" link>

                    <v-list-item-icon>
                        <v-icon>{{ login_item.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>{{
                            login_item.title
                        }}</v-list-item-title>

                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar
            app
            color="primary"
            dark
            shrink-on-scroll
            src="bg_airplane.jpg"
        >
            <template v-slot:img="{ props }">
                <v-img
                    v-bind="props"
                    gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
                ></v-img>
            </template>
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>BIDS Monitoring System</v-toolbar-title>
            <v-spacer></v-spacer>

        </v-app-bar>

        <v-main>
            <router-view />
        </v-main>
    </v-app>
</template>

<script>

export default {
    name: 'app',
    dialog: false,

    data() {
        return {
            drawer: null,
            login_item: {
                title: 'Login',
                icon: 'mdi-login',
                to: '/Login',
            },
        }
    },
    computed: {
            activeItems: function() {
                return this.$store.state.items.filter(function(item) {
                    return item.visible
                })
            }
    },
}
</script>
