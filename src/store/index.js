import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        auth: false,
        user: {
            id: null,
            username: '',
            email: '',
            token: '',
            ad_priv: null,
        },
        items: [
            {
                title: 'Home',
                icon: 'mdi-airplane',
                to: '/',
                visible: true,
            },
            {
                title: 'Monitors',
                icon: 'mdi-monitor',
                to: '/Monitors',
                visible: true,
            },
            {
                title: 'Users Management',
                icon: 'mdi-account-outline',
                to: '/Users',
                visible: false,
            },            
            {
                title: 'Logout',
                icon: 'mdi-logout',
                to: '/Logout',
                visible: true,
            }
            // {
            //     title: 'About',
            //     icon: 'mdi-information-outline',
            //     to: '/about',
            //     visible: true,
            // },
        ],
    },
    getters: {
        user: (state) => {
            return state.user
        },
    },
    mutations: {
        user(state, user) {
            state.user.username = user.username
            state.user.email = user.email
            state.user.id = user.id
            state.user.token = user.token
            state.user.ad_priv = user.ad_priv
            state.items[2].visible = user.ad_priv
            state.auth = true
        },
    },
    actions: {
        user(context, user) {
            context.commit('user', user)
        },
    },
    modules: {},
})
