import { createApp } from 'vue';
import App from './App.vue';
import 'amfe-flexible/index.js';
import router from '@/routers';
import './assets/icons/iconfont.css';
import { createPinia } from 'pinia';
import { Lazyload } from 'vant';

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.use(Lazyload, {
    lazyComponent: true,
});
app.mount('#app');
