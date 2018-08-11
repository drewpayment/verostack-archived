import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './pages/Home'
import Login from './pages/Login'
import Reset from './pages/Reset'
import MyDashboard from './pages/MyDashboard'
import CompanyAdminDashboard from './pages/CompanyAdminDashboard'
import SystemAdminDashboard from './pages/SystemAdminDashboard'
import ClientDetail from './pages/ClientDetail'
import NewClient from './pages/NewClient'
import UserDetail from './pages/UserDetail'
import NewUser from './pages/NewUser'

Vue.use(VueRouter);

const routes = [

    // common routes
    { path: '/', component: Home },

    // authentication routes
    { path: '/login', component: Login },
    { path: '/reset', component: Reset },

    // main dashboards where user is sent after authentication
    { path: '/my-dashboard', component: MyDashboard },
    { path: '/admin-dashboard', component: CompanyAdminDashboard },
    { path: '/sys-admin-dashboard', component: SystemAdminDashboard },

    // client routes
    { path: '/client/:clientId', name: 'clientDetail', component: ClientDetail, props: true },
    { path: '/client/new', name: 'newClient', component: NewClient },

    // user routes
    { path: '/users/:userId', name: 'userDetail', component: UserDetail, props: true },
    { path: '/users/new', name: 'newUser', component: NewUser }

];


const router = new VueRouter({
    // need to configure laravel to handle page refreshes if we enable this
    // and get rid of the hashbang
    // mode: 'history',
    routes,
    linkActiveClass: 'active'
});

export {
    router
}