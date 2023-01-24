<template>
    <v-app>
        <v-card class="pa-3 elevation-10 ma-2" rounded>
            <v-btn class="elevation-4" small @click="dialog3 = true">
                <v-icon> mdi-account-plus </v-icon> Add user
            </v-btn>
            <v-card-title>
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                ></v-text-field>
            </v-card-title>
            <v-data-table
                :headers="headers"
                :items="users"
                :search="search"
                item-key="username"
                :custom-filter="filterText"
                show-select
            >
                <template v-slot:[`item.ad_priv`]="{ item }">
                    <v-chip :color="item.ad_priv ? 'green' : 'grey'" dark>
                        <div v-if="item.ad_priv">Admin</div>
                        <div v-else>User</div>
                    </v-chip>
                </template>
                <template v-slot:[`item.actions`]="{ item }">
                    <v-btn
                        color="secondary"
                        elevation="2"
                        icon
                        x-small
                        @click="
                            currentUser = item
                            dialog = true
                            editedUser.id = currentUser.id
                            editedUser.username = currentUser.username
                            editedUser.user_email = currentUser.user_email
                            editedUser.password_hash = '##########'
                            editedUser.ad_priv = currentUser.ad_priv
                        "
                        ><v-icon>mdi-cog-outline</v-icon></v-btn
                    >
                    <v-btn
                        color="secondary"
                        elevation="2"
                        icon
                        x-small
                        @click="
                            currentUser = item
                            dialog2 = true
                        "
                        ><v-icon>mdi-account-off-outline</v-icon></v-btn
                    >
                </template>
            </v-data-table>
            <v-btn class="elevation-4" x-small icon @click="get_userData()">
                <v-icon> mdi-refresh </v-icon>
            </v-btn>
            <v-dialog
                v-model="dialog"
                max-width="50%"
                fluid
                class="teal--text text--accent-3 text-center"
            >
                <v-card>
                    <v-card-title class="text-h6"> Change User: </v-card-title>
                    <template>
                        <v-form
                            ref="form"
                            v-model="valid"
                            lazy-validation
                            class="pa-4"
                        >
                            <v-text-field
                                v-model="editedUser.username"
                                prepend-icon="person"
                                :rules="nameRules"
                                label="Username"
                                class="ma-2 mr-4"
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="editedUser.user_email"
                                prepend-icon="email"
                                :rules="emailRules"
                                label="E-mail"
                                class="ma-2 mr-4"
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="editedUser.password_hash"
                                prepend-icon="lock"
                                :rules="passwordRules"
                                label="Password"
                                class="ma-2 mr-4"
                                required
                            ></v-text-field>
                            <v-select
                                v-model="editedUser.ad_priv"
                                prepend-icon="key"
                                :items="items"
                                label="Admin"
                                class="ma-2 mr-4"
                                required
                            ></v-select>
                            <v-btn
                                color="teal accent-3"
                                text
                                @click="dialog = false"
                                rounded
                            >
                                Cancel
                            </v-btn>
                            <v-btn
                                color="teal accent-3"
                                text
                                :disabled="!valid"
                                @click="
                                    dialog = false
                                    submitUser(editedUser)
                                "
                                rounded
                            >
                                Update User
                            </v-btn>
                        </v-form>
                    </template>
                </v-card>
            </v-dialog>
            <v-dialog
                v-model="dialog2"
                max-width="50%"
                fluid
                class="teal--text text--accent-3 text-center"
            >
                <v-card>
                    <v-card-title class="text-h6"> Delete User: </v-card-title>
                    <template>
                        <div class="ma-6">
                            <h4>Username : {{ currentUser.username }}</h4>
                            <P></P>
                            <h4>Email : {{ currentUser.user_email }}</h4>
                            <p></p>
                            <h4>Admin : {{ currentUser.ad_priv }}</h4>
                        </div>
                        <v-btn
                            color="teal accent-3"
                            text
                            @click="dialog2 = false"
                            rounded
                        >
                            Cancel
                        </v-btn>
                        <v-btn
                            color="teal accent-3"
                            text
                            @click="
                                dialog2 = false
                                deleteUser(currentUser.id)
                            "
                            rounded
                        >
                            Delete User
                        </v-btn>
                    </template >
                </v-card>
            </v-dialog>

            <v-dialog
                v-model="dialog3"
                max-width="50%"
                fluid
                class="teal--text text--accent-3 text-center"
            >
                <v-card>
                    <v-card-title class="text-h6"> New User: </v-card-title>
                    <template>
                        <v-form
                            ref="form"
                            v-model="valid"
                            lazy-validation
                            class="pa-4"
                        >
                            <v-text-field
                                v-model="newUser.username"
                                prepend-icon="person"
                                :rules="nameRules"
                                label="Username"
                                class="ma-2 mr-4"
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="newUser.user_email"
                                prepend-icon="email"
                                :rules="emailRules"
                                label="E-mail"
                                class="ma-2 mr-4"
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="newUser.password_hash"
                                prepend-icon="lock"
                                :rules="passwordRules"
                                label="Password"
                                class="ma-2 mr-4"
                                required
                            ></v-text-field>
                            <v-select
                                v-model="newUser.ad_priv"
                                prepend-icon="key"
                                :items="items"
                                label="Admin"
                                class="ma-2 mr-4"
                                required
                            ></v-select>
                            <v-btn
                                color="teal accent-3"
                                text
                                @click="dialog3 = false"
                                rounded
                            >
                                Cancel
                            </v-btn>
                            <v-btn
                                color="teal accent-3"
                                text
                                :disabled="!valid"
                                @click="
                                    dialog3 = false
                                    addUser(newUser)
                                "
                                rounded
                            >
                                Create User
                            </v-btn>
                        </v-form>
                    </template>
                </v-card>
            </v-dialog>
        </v-card>
    </v-app>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

export default {
    data() {
        return {
            valid: false,
            editedUser: {
                id: null,
                username: '',
                user_email: '',
                password_hash: '',
                ad_priv: null,
            },
            newUser: {
                username: '',
                user_email: '',
                password_hash: '',
                ad_priv: false,
            },
            nameRules: [
                (v) => !!v || 'Name is required',
                (v) =>
                    (v && v.length <= 10) ||
                    'Name must be less than 10 characters',
            ],

            passwordRules: [
                (v) => !!v || 'Password is required',
                (v) =>
                    (v && v.length >= 10) ||
                    'Password must be at least 10 characters',
            ],

            emailRules: [
                (v) => !!v || 'E-mail is required',
                (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],

            items: [true, false],
            intervalId: 0,
            dialog: false,
            dialog2: false,
            dialog3: false,
            currentUser: {},
            search: '',
            headers: [
                {
                    text: 'Username',
                    align: 'start',
                    sortable: true,
                    value: 'username',
                },
                { text: 'email', value: 'user_email' },
                // { text: 'password', value: 'password_hash' },
                { text: 'Admin', value: 'ad_priv' },
                { text: 'Edit', sortable: false, value: 'actions' },
            ],
            users: [],
        }
    },
    mounted: function () {
        this.get_userData()

        this.intervalId = setInterval(async () => {
            console.log('refreshing data')
            await this.get_userData()
        }, 5000)
    },
    beforeDestroy: function () {
        if (this.intervalId !== 0) {
            console.log('clearing timer')
            clearInterval(this.intervalId)
        }
    },
    methods: {
        alpha(x) {
            console.log(x)
        },
        validate() {
            this.$refs.form.validate()
        },
        reset() {
            this.$refs.form.reset()
        },
        async get_userData() {
            try {
                let response = await Vue.axios.get(
                    `users`
                )
                this.users = response.data
            } catch (ex) {
                console.log('Exception: ' + ex)
            }
        },
        filterText(value, search, item) {
            return (
                value != null &&
                search != null &&
                typeof value === 'string' &&
                value.toString().indexOf(search) !== -1
            )
        },
        async submitUser(item) {
            let data = {
                id: item.id,
                username: item.username,
                user_email: item.user_email,
                password_hash: item.password_hash,
                ad_priv: item.ad_priv,
            }
            await Vue.axios.put(`update_user`, data)
        },
        async deleteUser(item) {
            await Vue.axios.delete(`delete_user`, { data: {id : item} })
        },
        async addUser(item) {
            let data = {
                username: item.username,
                user_email: item.user_email,
                password_hash: item.password_hash,
                ad_priv: item.ad_priv
            }
            await Vue.axios.post(`new_user`, data)
            this.newUser.username = ''
            this.newUser.user_email = ''
            this.newUser.password_hash = ''
            this.newUser.ad_priv = false
        },
    },
}
</script>

<style></style>