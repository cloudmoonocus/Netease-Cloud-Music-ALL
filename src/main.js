import { createApp } from 'vue';
import App from './App.vue';
import 'amfe-flexible/index.js';
import router from '@/routers';
import './assets/icons/iconfont.css';
import { createPinia } from 'pinia';
import { Lazyload } from 'vant';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Lazyload);

app.mount('#app');
