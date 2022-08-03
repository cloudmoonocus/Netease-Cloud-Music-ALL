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
import '@/directives/wave.js';

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
if (JSON.parse(localStorage.getItem('localPlayer'))) {
    onplayingData.playList = JSON.parse(localStorage.getItem('localPlayer')).playlist;
    onplayingData.playNow = JSON.parse(localStorage.getItem('localPlayer')).playnow;
    onplayingData.judageNow();
    if (onplayingData.playNow.id != 0) {
        onplayingData.playNow.play = false;
    }
} else {
    onplayingData.judageNow();
}
