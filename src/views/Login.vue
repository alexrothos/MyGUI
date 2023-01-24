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
                                Sign in to BIDS Monitoring
                            </h3>
                            <v-form>
                                <v-text-field
                                    v-model="username"
                                    label="Username"
                                    :rules="nameRules"
                                    prepend-icon="person"
                                    type="text"
                                    color="teal accent-3"
                                    class="ma-2 mr-4"
                                />
                                <v-text-field
                                    v-model="password"
                                    label="Password"
                                    :rules="passwordRules"
                                    prepend-icon="lock"
                                    type="password"
                                    color="teal accent-3"
                                    class="ma-2 mr-4"
                                />
                            </v-form>
                        </v-card-text>
                        <v-btn
                            rounded
                            color="teal accent-3"
                            dark
                            class="ma-5 elevation-4"
                            @click="
                                loginUser()
                                dialog = true
                            "
                            >SIGN IN</v-btn
                        >
                    </v-card>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            username: '',
            password: '',
            nameRules: [(v) => !!v || 'Name is required'],
            passwordRules: [(v) => !!v || 'Password is required'],
        }
    },
    props: {},
    methods: {
        async loginUser() {
            try {
                let res = await axios.post('/login', {
                    username: this.username,
                    password: this.password,
                })
                if (res['data']) {
                    this.$store.dispatch('user', {
                        username: res.data.username,
                        email: res.data.email,
                        id: res.data.id,
                        token: res.data.token,
                        ad_priv: res.data.ad_priv
                    })
                    localStorage.setItem('token', res.data.token)
                    axios.defaults.headers.common['Authorization'] = res.data.token
                   // this.$router.replace('/')
                    this.$router.push('/') 
                }
            } catch (err) {
                alert(err.response.data)
            }
        },
    },
}
</script>
