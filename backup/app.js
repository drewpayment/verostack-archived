import Vue from 'vue';
import page from 'page';
import routes from './routes'

/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */


const app = new Vue({
    el: '#app',
    data: {
        ViewComponent: { render: h => h('div', 'loading...') }
    },
    render (h) { return h(this.ViewComponent) }
});

Object.keys(routes).forEach(route => {
    let component = routes[route];
    const Component = require('./pages/' + component + '.vue');
    page(route, () => app.ViewComponent = Component);
});

page('*', () => app.ViewComponent = require('./pages/404.vue'));
page();
