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
        <div class="pause" @click.stop="musicPause">
            <Circle v-model:current-rate="currentRate" :stroke-width="50" size="30px" color="#000" layer-color="#eee"
                text="▶" :speed="10" />
        </div>
        <div class="list" @click.stop="showMusicList">
            <Icon name="bars" />
        </div>
    </div>
    <MusicDetail :show="detailShow" @changeShow="changeDetailShow" />
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

watch(() => onplayingData.playNow.play, () => {
    if (onplayingData.playNow.play === true) {
        animationClass.value = true;
    } else {
        animationClass.value = false;
    }
})

// 展示歌曲详情页
function showMusicDetail() {
    detailShow.value = true;
}
function changeDetailShow(value) {
    detailShow.value = value;
}

// 暂停/开始歌曲
function musicPause() {

}

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
