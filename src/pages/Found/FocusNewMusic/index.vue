<template>
    <MyLoading v-show="outShow" />
    <transition name="van-fade">
        <div v-show="inShow">
            <div class="first"></div>
            <div class="out">
                <div class="card" v-for="value in foundData.newAirtistMusic" style="background-color: #fff;">
                    <van-image :src="value.blockTitle.imgUrl" :alt="value.blockTitle.resourceName" width="55"
                        height="55" radius="10" class="cardImage" fit="cover" position="center">
                        <template v-slot:loading>
                            <van-loading type="spinner" size="20" />
                        </template>
                    </van-image>
                    <div>{{ value.blockTitle.resourceName }}</div>
                    <span>{{ value.blockTitle.artistName }}</span>
                    <Icon name="play-circle-o" class="play-circle-o" />
                    <Icon name="more-o" class="more-o" />
                </div>
            </div>
        </div>
    </transition>
</template>

<script setup>
import { Icon } from 'vant';
import { Image as VanImage } from 'vant';
import { found } from '@/store/Found';
import { ref, watch } from 'vue';
const foundData = found();

const outShow = ref(true);
const inShow = ref(false);

watch(() => foundData.newAirtistMusic, () => {
    if (foundData.newAirtistMusic.length) {
        setTimeout(() => {
            outShow.value = false;
            inShow.value = true;
        }, 1000);
    }
})

foundData.getNewAirtistMusic();
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
