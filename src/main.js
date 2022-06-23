import { createApp } from 'vue';
import App from './App.vue';
import 'amfe-flexible/index.js';
import router from '@/routers';
import './assets/icons/iconfont.css';
import { createPinia } from 'pinia';
import { Lazyload, Loading } from 'vant';
import MyLoading from '@/components/Loading';

const app = createApp(App);

app.component('MyLoading', MyLoading);

app.use(createPinia());
app.use(router);
app.use(Lazyload);
app.use(Loading);

app.mount('#app');

// 火山引擎监控
import browserClient from '@apmplus/web';

browserClient('init', {
    aid: 372146,
    userId: '356660222',
    env: 'production/staging',
    release: '1.0.0',
    plugins: {
        pageview: {
            routeMode: 'history',
        },
    },
});

// 开启上报
browserClient('start');
