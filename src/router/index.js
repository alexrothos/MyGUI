import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        alias: '/home',
        name: 'home',
        component: Home,
    },
    // {
    //     path: '/about',
    //     name: 'about',
    //     component: () => import('../views/About.vue'),
    // },
    {
        path: '/Monitors',
        name: 'monitors',
        component: () => import('../views/Monitors.vue'),
    },
    {
        path: '/Users',
        name: 'users',
        component: () => import('../views/UsersManagement.vue'),
    },
    {
        path: '/Login',
        name: 'login',
        component: () => import('../views/Login.vue'),
    },
    {
        path: '/Logout',
        name: 'logout',
        component: () => import('../views/Logout.vue'),
    },
]

const router = new VueRouter({
    // Removes the /#/ from the url.
    mode: 'history',
    routes,
})

export default router
