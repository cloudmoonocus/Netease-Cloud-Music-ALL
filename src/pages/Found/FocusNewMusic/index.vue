<template>
    <MyLoading v-show="outShow" />
    <transition name="van-fade">
        <div v-show="inShow">
            <div class="first"></div>
            <div class="out">
                <div class="card" v-for="value in foundData.newAirtistMusic" :key="value.songLists[0].name"
                    style="background-color: #fff;"
                    @click="playMusic(value.songLists[0].id, value.songLists[0].al.picUrl, value.songLists[0].name, value.blockTitle.artistName)">
                    <van-image :src="value.songLists[0].al.picUrl" :alt="value.songLists[0].name" width="55" height="55"
                        radius="10" class="cardImage" fit="cover" position="center">
                        <template v-slot:loading>
                            <van-loading type="spinner" size="20" />
                        </template>
                    </van-image>
                    <div>{{ value.songLists[0].name }}</div>
                    <span>{{ value.blockTitle.artistName }}</span>
                    <Icon name="more-o" class="more-o"
                        @click.stop="popupShow(value.songLists[0].id, value.songLists[0].al.picUrl, value.songLists[0].name, value.blockTitle.artistName)" />
                </div>
            </div>
            <MusicOperate :show="popupShowVal" :data="musicData" v-if="popupOutShow" @closePopup="closeOutPopup" />
        </div>
    </transition>
</template>

<script setup>
import { Icon } from 'vant';
import { Image as VanImage } from 'vant';
import { found } from '@/store/Found';
import { ref, watch } from 'vue';
import MusicOperate from '@/components/MusicOperatePopup';
import { play } from '@/plugins/play';

const foundData = found();

const outShow = ref(true);
const inShow = ref(false);

watch(() => foundData.newAirtistMusic, () => {
    if (foundData.newAirtistMusic.length) {
        outShow.value = false;
        inShow.value = true;
    }
})

foundData.getNewAirtistMusic();

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

// 播放音乐
function playMusic(id, imageUrl, title) {
    play(id, imageUrl, title);
}
</script>

<style lang="less" scoped>
.first {
    height: 20px;
    background-color: #fff;
}

.out {
    .card {
        position: relative;
        height: 80px;

        .cardImage {
            position: absolute;
            margin-left: 15px;
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
