<template>
    <MyLoading v-show="outShow" />
    <transition name="van-fade">
        <div style="background-color: #fff" v-show="inShow">
            <!-- 顶部图片 -->
            <div class="head">
                <div class="pure_top"></div>
            </div>
            <!-- 第二层-播放全部- -->
            <div class="second">
                <Icon name="play-circle" style="color: #e60026; font-size: 30px; margin-left: 15px; line-height: 30px"
                    @click="playMusicAll" />
                <span>播放全部</span>
            </div>
            <!-- 歌曲列表 -->
            <div class="third">
                <div class="card" v-for="dailyRecMusics in foundData.dailyRcMusic" :key="dailyRecMusics.id"
                    @click="playMusic(dailyRecMusics.id, dailyRecMusics.al.picUrl, dailyRecMusics.name, dailyRecMusics.ar[0].name)">
                    <van-image width="55" height="55" :src="dailyRecMusics.al.picUrl" :alt="dailyRecMusics.name"
                        class="cardImage" radius="10">
                        <template v-slot:loading>
                            <van-loading type="spinner" size="20" />
                        </template>
                    </van-image>
                    <div>{{ dailyRecMusics.name }}</div>
                    <span>{{ dailyRecMusics.ar[0].name }}</span>
                    <Icon name="more-o" class="more-o"
                        @click.stop="popupShow(dailyRecMusics.id, dailyRecMusics.al.picUrl, dailyRecMusics.name, dailyRecMusics.ar[0].name)" />
                </div>
            </div>
            <MusicOperate :show="popupShowVal" :data="musicData" v-if="popupOutShow" @closePopup="closeOutPopup" />
        </div>
    </transition>
</template>

<script setup>
import { Icon } from 'vant';
import { Image as VanImage } from 'vant';
import { ref } from 'vue';
import { found } from '@/store/Found';
import MusicOperate from '@/components/MusicOperatePopup'
import { playAll } from '@/plugins/playAll'
import { play } from '@/plugins/play'

const outShow = ref(true);
const inShow = ref(false);

const foundData = found();

setTimeout(() => {
    outShow.value = false;
    inShow.value = true;
}, 200);

const popupShowVal = ref(false);
const popupOutShow = ref(false);
const musicData = ref();
function popupShow(id, url, title, author) {
    popupShowVal.value = true;
    musicData.value = { id, url, title, author };
    popupOutShow.value = true;
}
function closeOutPopup() {
    popupShowVal.value = false;
    popupOutShow.value = false;
}

// 播放全部音乐
function playMusicAll() {
    playAll(foundData.dailyRcMusic);
}
// 播放音乐
function playMusic(id, imageUrl, title, author) {
    play(id, imageUrl, title, author);
}
</script>

<style lang="less" scoped>
.head {
    .pure_top {
        width: 100%;
        height: 200px;
        position: relative;
        overflow: hidden;
    }

    .pure_top::after {
        content: '';
        width: 140%;
        height: 200px;
        position: absolute;
        left: -20%;
        top: 0;
        border-radius: 0 0 130px 130px;
        background-image: url('~@/assets/images/Found/headDaily.jpg');
        background-size: 100% 100%;
    }
}

.second {
    display: flex;
    margin-top: 10px;
    height: 30px;

    span:nth-child(2) {
        margin-left: 15px;
        height: 30px;
        line-height: 30px;
        font-size: 15px;
        font-weight: 700;
    }
}

.third {
    margin-top: 20px;

    .card {
        position: relative;
        height: 80px;

        .cardImage {
            position: absolute;
            margin-left: 15px;
            height: 55px;
            width: 55px;
        }

        div:nth-child(2) {
            position: absolute;
            left: 80px;
            top: 5px;
            width: 160px;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            font-size: 13px;
        }

        span:nth-child(3) {
            position: absolute;
            left: 80px;
            top: 23px;
            width: 110px;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            font-size: 10px;
            color: rgb(122, 119, 119);
        }

        span:nth-child(4) {
            position: absolute;
            left: 80px;
            top: 38px;
            width: 110px;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            font-size: 10px;
            color: rgb(122, 119, 119);
        }

        .play-circle-o {
            position: absolute;
            top: 10px;
            right: 55px;
            color: rgb(122, 119, 119);
        }

        .more-o {
            position: absolute;
            top: 10px;
            right: 10px;
            color: rgb(122, 119, 119);
        }
    }
}
</style>
