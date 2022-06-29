<template>
    <MyLoading v-show="outShow" />
    <transition name="van-fade">
        <div style="background-color: #fff" v-show="inShow">
            <Tabs title-active-color="#e60026" ref="tabs">
                <Tab title="华语">
                    <div class="out">
                        <div class="card" v-for="value in foundData.languageChinaList" :key="value.albumId">
                            <van-image :src="value.coverUrl" :alt="value.albumName" width="130" height="130">
                                <template v-slot:loading>
                                    <van-loading type="spinner" size="20" />
                                </template>
                            </van-image>
                            <div class="musicTitle">{{ value.albumName }}</div>
                            <div class="author">{{ value.artistName }}</div>
                            <div class="price">￥{{ value.price }}</div>
                        </div>
                    </div>
                </Tab>
                <Tab title="欧美">
                    <div class="out">
                        <div class="card" v-for="value in foundData.languageEuropeList" :key="value.albumId">
                            <van-image :src="value.coverUrl" :alt="value.albumName" width="130" height="130">
                                <template v-slot:loading>
                                    <van-loading type="spinner" size="20" />
                                </template>
                            </van-image>
                            <div class="musicTitle">{{ value.albumName }}</div>
                            <div class="author">{{ value.artistName }}</div>
                            <div class="price">￥{{ value.price }}</div>
                        </div>
                    </div>
                </Tab>
                <Tab title="韩国">
                    <div class="out">
                        <div class="card" v-for="value in foundData.languageKoreaList" :key="value.albumId">
                            <van-image :src="value.coverUrl" :alt="value.albumName" width="130" height="130">
                                <template v-slot:loading>
                                    <van-loading type="spinner" size="20" />
                                </template>
                            </van-image>
                            <div class="musicTitle">{{ value.albumName }}</div>
                            <div class="author">{{ value.artistName }}</div>
                            <div class="price">￥{{ value.price }}</div>
                        </div>
                    </div>
                </Tab>
                <Tab title="日本">
                    <div class="out">
                        <div class="card" v-for="value in foundData.languageJapanList" :key="value.albumId">
                            <van-image :src="value.coverUrl" :alt="value.albumName" width="130" height="130">
                                <template v-slot:loading>
                                    <van-loading type="spinner" size="20" />
                                </template>
                            </van-image>
                            <div class="musicTitle">{{ value.albumName }}</div>
                            <div class="author">{{ value.artistName }}</div>
                            <div class="price">￥{{ value.price }}</div>
                        </div>
                    </div>
                </Tab>
            </Tabs>
        </div>
    </transition>
</template>

<script setup>
import { Tab, Tabs, Icon } from 'vant';
import { Image as VanImage } from 'vant';
import { found } from '@/store/Found';
import { ref, watch } from 'vue';
const foundData = found();

const tabs = ref();

const outShow = ref(true);
const inShow = ref(false);

watch(() => foundData.languageJapanList, () => {
    if (foundData.languageJapanList.length) {
        setTimeout(() => {
            outShow.value = false;
            inShow.value = true;
            tabs.value.resize();
        }, 700);
    }
})

// 华语
foundData.getLanguage('Z_H');
// 欧美
foundData.getLanguage('E_A');
// 韩国
foundData.getLanguage('KR');
// 日本
foundData.getLanguage('JP');
</script>

<style lang="less" scoped>
.out {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    width: 95%;
    margin: 0 auto;
    margin-top: 10px;

    .card {
        margin-top: 20px;
        width: 130px;

        .musicTitle {
            margin-top: -3px;
            width: 130px;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            font-size: 12px;
        }

        .author {
            margin-top: 1px;
            width: 130px;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            font-size: 10px;
            color: rgb(122, 119, 119);
        }

        .price {
            margin-top: 1px;
            font-size: 10px;
            font-weight: 700;
            color: #e60026;
        }
    }
}
</style>
