<template>
    <v-app>
        <v-main>
            <v-container fluid class="ma-2">
                <v-row class="ml-2 text-center">
                    <v-card class="elevation-10" rounded>
                        <v-card-text class="ma-2">
                            <h3
                                class="text-center display-1 teal--text text--accent-3 ma-2"
                            >
                            Are you sure you want to logout?
                            </h3>
                        </v-card-text>
                        <v-btn
                            rounded
                            color="teal accent-3"
                            dark
                            class="ma-5 elevation-4"
                            @click="
                                logoutUser()
                            "
                            >Logout</v-btn
                        >
                    </v-card>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>

export default {
    data() {
        return {
        }
    },
    props: {},
    methods: {
        logoutUser() {
            this.$store.dispatch('user', {
                username: '',
                email: '',
                id: '',
                token: '',
            })
            this.$store.state['auth'] = false
            localStorage.setItem('token', '')
            this.$router.replace('/login')
        },
    },
}
</script>
