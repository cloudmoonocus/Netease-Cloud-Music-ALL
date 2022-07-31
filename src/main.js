import { createApp } from 'vue';
import App from './App.vue';
import 'amfe-flexible/index.js';
import router from '@/routers';
import './assets/icons/iconfont.css';
import { createPinia } from 'pinia';
import { Lazyload, Loading } from 'vant';
import MyLoading from '@/components/Loading';
import MyEmpty from '@/components/MyEmpty';
import MusicList from '@/components/MusicList';
import onplaying from './store/OnPlaying';

const app = createApp(App);

app.component('MyLoading', MyLoading);
app.component('MyEmpty', MyEmpty);
app.component('MusicList', MusicList);

app.use(createPinia());
app.use(router);
app.use(Lazyload);
app.use(Loading);

app.mount('#app');

const onplayingData = onplaying();
onplayingData.playList = JSON.parse(localStorage.getItem('localPlayer')).playlist;
onplayingData.playNow = JSON.parse(localStorage.getItem('localPlayer')).playnow;
onplayingData.judageNow();

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
