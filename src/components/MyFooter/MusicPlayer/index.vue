<template>
    <div class="playerOut" @click="showMusicDetail">
        <div :class="{ leftImage: true, leftAnimate: animationClass, animatePause: !animationClass }">
            <img :src="onplayingData.playNow.imageUrl" />
        </div>
        <div class="name">
            <span>{{ onplayingData.playNow.title }}</span>
            <span v-if="onplayingData.playNow.id != 0" style="margin-left: 10px;">- {{ onplayingData.playNow.author
            }}</span>
        </div>
        <div class="pause" @click.stop="musicPause" v-show="onplayingData.playList.length">
            <Circle v-model:current-rate="currentRate" :stroke-width="50" size="30px" color="#000" layer-color="#eee"
                :text="onplayingData.playNow.play === true ? '||' : '▶'" :speed="spead" />
        </div>
        <div class="list" @click.stop="showMusicList">
            <Icon name="bars" />
        </div>
    </div>
    <audio ref="audio" :src="`https://music.163.com/song/media/outer/url?id=${onplayingData.playNow.id}.mp3`"></audio>
    <MusicDetail :show="detailShow" :data="musicDetail" @changeShow="changeDetailShow" />
    <MusicList :show="listShow" @changeShow="changeListShow" />
</template>

<script setup>
import { Circle, Icon } from 'vant'
import { ref, watch } from 'vue';
import MusicDetail from '@/components/MyFooter/MusicPlayer/MusicDetail'
import MusicList from '@/components/MyFooter/MusicPlayer/MusicList'
import onplaying from '@/store/OnPlaying';
const onplayingData = onplaying();

const currentRate = ref(0);
const detailShow = ref(false);
const listShow = ref(false);

const animationClass = ref(false);

const spead = ref(onplayingData.spead);
const time = ref(onplayingData.totalTime);
watch(() => onplayingData.totalTime, () => {
    time.value = onplayingData.totalTime;
    spead.value = onplayingData.spead;
})

function roundFun(value, n) {
    return Math.round(value * Math.pow(10, n)) / Math.pow(10, n);
}

const musicDetail = ref(null);
watch(() => onplayingData.playNow.id, () => {
    musicDetail.value = onplayingData.playNow
})

watch(() => onplayingData.playNow.play, () => {
    if (onplayingData.playNow.play === true) {
        animationClass.value = true;
    } else {
        animationClass.value = false;
    }
})

// 展示歌曲详情页
function showMusicDetail() {
    if (onplayingData.playList.length) {
        detailShow.value = true;
    }
}
function changeDetailShow(value) {
    detailShow.value = value;
}

const audio = ref();
// 暂停/开始歌曲
function musicPause() {
    if (audio.value.paused) {
        audio.value.play();
        onplayingData.playNow.play = true;
    } else {
        audio.value.pause();
        onplayingData.playNow.play = false;
    }
}
watch(() => onplayingData.playNow.id, () => {
    if (onplayingData.playNow.play) {
        audio.value.autoplay = true;
    }
})

// 展示歌曲列表
function showMusicList() {
    listShow.value = true;
}
function changeListShow(value) {
    listShow.value = value;
}
</script>

<style lang="less" scoped>
.playerOut {
    position: relative;
    width: 100%;
    height: 55px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    background-color: #fff;

    .leftImage {
        position: absolute;
        top: 5px;
        left: 10px;
        height: 40px;
        width: 40px;
        line-height: 50px;
        border-radius: 20px;
        background-color: #000;

        img {
            height: 30px;
            width: 30px;
            margin-left: 5px;
            margin-top: 50%;
            transform: translateY(-50%);
            border-radius: 17.5px;
        }
    }

    .leftAnimate {
        animation-duration: 6s;
        animation-name: rotate;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
        animation-play-state: running;

        @keyframes rotate {
            0% {
                transform: rotate(0deg)
            }

            100% {
                transform: rotate(360deg)
            }
        }
    }

    .animatePause {
        animation-play-state: paused;
    }

    .name {
        display: inline-block;
        position: absolute;
        line-height: 50px;
        font-size: 14px;
        left: 60px;
        max-width: 200px;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }

    .pause {
        display: inline-block;
        position: absolute;
        margin-top: 8px;
        right: 55px;
    }

    .list {
        display: inline-block;
        position: absolute;
        font-size: 30px;
        line-height: 50px;
        right: 15px;
    }

}
</style>
