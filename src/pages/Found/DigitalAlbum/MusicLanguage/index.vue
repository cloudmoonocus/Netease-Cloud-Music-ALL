<template>
    <div style="background-color: #fff">
        <Tabs title-active-color="#e60026">
            <Tab title="华语">
                <div class="out">
                    <div class="card" v-for="value in foundData.languageChinaList" :key="value.albumId">
                        <img v-lazy="value.coverUrl" :alt="value.albumName" />
                        <div class="musicTitle">{{ value.albumName }}</div>
                        <div class="author">{{ value.artistName }}</div>
                        <div class="price">￥{{ value.price }}</div>
                    </div>
                </div>
            </Tab>
            <Tab title="欧美">
                <div class="out">
                    <div class="card" v-for="value in foundData.languageEuropeList" :key="value.albumId">
                        <img v-lazy="value.coverUrl" :alt="value.albumName" />
                        <div class="musicTitle">{{ value.albumName }}</div>
                        <div class="author">{{ value.artistName }}</div>
                        <div class="price">￥{{ value.price }}</div>
                    </div>
                </div>
            </Tab>
            <Tab title="韩国">
                <div class="out">
                    <div class="card" v-for="value in foundData.languageKoreaList" :key="value.albumId">
                        <img v-lazy="value.coverUrl" :alt="value.albumName" />
                        <div class="musicTitle">{{ value.albumName }}</div>
                        <div class="author">{{ value.artistName }}</div>
                        <div class="price">￥{{ value.price }}</div>
                    </div>
                </div>
            </Tab>
            <Tab title="日本">
                <div class="out">
                    <div class="card" v-for="value in foundData.languageJapanList" :key="value.albumId">
                        <img v-lazy="value.coverUrl" :alt="value.albumName" />
                        <div class="musicTitle">{{ value.albumName }}</div>
                        <div class="author">{{ value.artistName }}</div>
                        <div class="price">￥{{ value.price }}</div>
                    </div>
                </div>
            </Tab>
        </Tabs>
    </div>
</template>

<script setup>
import { Tab, Tabs, Icon } from 'vant';
import { found } from '@/store/Found';
const foundData = found();

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

        img {
            height: 130px;
            width: 130px;
        }

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
