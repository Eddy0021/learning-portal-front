import './assets/stylesheets/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia';

import { AgGridVue } from "ag-grid-vue3";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

import '@fortawesome/fontawesome-free/css/all.css'

import PrimeVue from 'primevue/config';
import Avatar from 'primevue/avatar';
import InputSwitch from 'primevue/inputswitch';
import Dialog from 'primevue/dialog';
import Calendar from 'primevue/calendar';
import Password from 'primevue/password';

import LazyLoadDirective from './directives/lazyLoadDirective';

const app = createApp(App);
app.use(createPinia());
app.use(PrimeVue);
app.use(router);
app.component('Avatar', Avatar);
app.component('InputSwitch', InputSwitch);
app.component('Dialog', Dialog);
app.component('Calendar', Calendar);
app.component('Password', Password);
app.component('AgGridVue', AgGridVue);
app.directive('lazyload', LazyLoadDirective);
app.mount('#app');