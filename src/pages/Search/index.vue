<template>
    <Search v-model.trim="searchValue" placeholder="请输入您要搜索的内容" shape="round" clearable @search="onSearch" />
    <!-- 热搜 -->
    <div class="hot" v-show="hotShow">
        <div class="first">
            <span>热搜榜</span>
            <span>
                <Icon name="play-circle" /> 播放
            </span>
        </div>
        <Divider :hairline="false" />
        <div class="list">
            <div class="card" v-for="(value, index) in searchData.hotSearch" :key="index"
                @click="hotSearch(value.searchWord)">
                <span :class="{ three: index < 3, noThree: index >= 3 }">{{ ++index }}</span>
                <span>{{ value.searchWord }}</span>
            </div>
        </div>
    </div>
    <!-- 搜索建议 -->
    <div class="suggest" v-show="suggestShow">
        <div class="card" v-for="(value, index) in searchData.searchSuggest.allMatch" :key="index"
            @click="inputSuggest(value.keyword)">
            <Icon name="search" class="icon" />
            <span>{{ value.keyword }}</span>
        </div>
    </div>
    <!-- 搜索结果 -->
    <div class="result" v-show="resultShow">
        <div class="top">
            <Icon name="play-circle" style="color: #e60026; font-size: 30px; margin-left: 15px; line-height: 30px"
                @click="playMusicAll" />
            <span>播放全部</span>
        </div>
        <div class="listResult">
            <div class="cardResult" v-for="(value, index) in searchData.result" :key="value.id"
                style="background-color: #fff"
                @click="playMusic(value.id, value.al.picUrl, value.name, value.ar[0].name)">
                <van-image :src="value.al.picUrl" :alt="value.name" width="55" height="55" radius="10" class="cardImage"
                    fit="cover" position="center">
                    <template v-slot:loading>
                        <van-loading type="spinner" size="20" />
                    </template>
                </van-image>
                <div>{{ value.name }}</div>
                <span>{{ value.ar[0].name }}</span>
                <Icon name="play-circle-o" class="play-circle-o" />
                <Icon name="more-o" class="more-o" @click.stop="popupShow(value.id)" />
            </div>
        </div>
        <MusicOperate :show="popupShowVal" :data="musicData" v-if="popupOutShow" @closePopup="closeOutPopup" />
    </div>
</template>

<script setup>
import { Search, Icon, Divider } from 'vant';
import { Image as VanImage } from 'vant';
import { ref, watch } from 'vue';
import { play } from '@/plugins/play.js';
import { playAll } from '@/plugins/playAll.js';
import MusicOperate from '@/components/MusicOperatePopup'
import search from '@/store/Search';
const searchData = search();

// 搜索内容
const searchValue = ref('');
// 搜索建议时的操作
const hotShow = ref(true);
const suggestShow = ref(false);
watch(searchValue, () => {
    if (searchValue.value) {
        hotShow.value = false;
        resultShow.value = false;
        suggestShow.value = true;
    } else {
        hotShow.value = true;
        suggestShow.value = false;
        resultShow.value = false;
    }
});

// 防抖
function debounce(fn, arg) {
    let timeout = null;
    return function () {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            fn.call(this, arg);
        }, 1000);
    };
}
function getSuggest() {
    searchData.getSearchSuggest(searchValue.value);
}
// 获取搜索建议
watch(searchValue, () => {
    if (searchValue.value) {
        const fun = debounce(getSuggest);
        fun();
    }
});
function inputSuggest(value) {
    searchValue.value = value;
    setTimeout(() => {
        hotShow.value = false;
        suggestShow.value = false;
        resultShow.value = true;
        searchData.getSearchResult(searchValue.value);
    }, 1200);
}

// 获取搜索结果
const resultShow = ref(false);
function onSearch() {
    hotShow.value = false;
    suggestShow.value = false;
    resultShow.value = true;
    searchData.getSearchResult(searchValue.value);
}
// 获取热搜
searchData.getHotSearch();

function hotSearch(hotSearchWord) {
    searchValue.value = hotSearchWord;
    setTimeout(() => {
        hotShow.value = false;
        suggestShow.value = false;
        resultShow.value = true;
        searchData.getSearchResult(searchValue.value);
    }, 1200);
}

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

function playMusicAll() {
    playAll(searchData.result);
}

function playMusic(id, imageUrl, title, author) {
    play(id, imageUrl, title, author);
}
</script>

<style lang="less" scoped>
.hot {
    width: 80%;
    margin: 0 auto;
    margin-top: 15px;
    padding: 20px 20px 2px;
    border-radius: 10px;
    background-color: #fff;

    .first {
        position: relative;
        height: 30px;

        span:nth-child(1) {
            position: absolute;
            font-weight: 700;
            font-size: 20px;
        }

        span:nth-child(2) {
            position: absolute;
            right: 0;
            padding: 4px 10px;
            border: solid rgb(122, 119, 119) 1px;
            border-radius: 20px;
            font-size: 13px;
            color: rgb(122, 119, 119);
        }
    }

    .list {
        .card {
            position: relative;
            margin-bottom: 15px;
            height: 25px;

            .three {
                position: absolute;
                font-size: 20px;
                font-weight: 700;
                line-height: 25px;
                color: #e60026;
            }

            .noThree {
                position: absolute;
                font-size: 16px;
                line-height: 25px;
                width: 15px;
                color: rgb(122, 119, 119);
            }

            span:nth-child(2) {
                position: absolute;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                font-size: 16px;
                line-height: 25px;
                left: 45px;
            }
        }
    }
}

.suggest {
    height: 85vh;
    background-color: #fff;

    .card {
        padding-top: 15px;
        height: 35px;
        background-color: #fff;

        .icon {
            position: absolute;
            left: 10px;
            line-height: 35px;
            font-size: 25px;
            color: rgb(143, 140, 140);
        }

        span:nth-child(2) {
            position: absolute;
            left: 45px;
            width: 85%;
            line-height: 35px;
            border-bottom: #eee solid 1px;
            font-size: 15px;
        }
    }
}

.result {
    .top {
        display: flex;
        padding-top: 10px;
        height: 40px;
        background-color: #fff;

        span:nth-child(2) {
            margin-left: 15px;
            height: 30px;
            line-height: 30px;
            font-size: 15px;
            font-weight: 700;
        }
    }

    .listResult {
        .cardResult {
            position: relative;
            padding-top: 15px;
            height: 80px;
            display: flex;
            align-items: center;

            .cardImage {
                position: absolute;
                margin-left: 15px;
            }

            div:nth-child(2) {
                position: absolute;
                left: 90px;
                top: 40px;
                width: 160px;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                font-size: 13px;
            }

            span:nth-child(3) {
                position: absolute;
                left: 90px;
                top: 55px;
                width: 110px;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                font-size: 10px;
                color: rgb(122, 119, 119);
            }

            .play-circle-o {
                font-size: 25px;
                position: absolute;
                right: 50px;
                color: rgb(122, 119, 119);
            }

            .more-o {
                font-size: 25px;
                position: absolute;
                right: 10px;
                color: rgb(122, 119, 119);
            }
        }
    }
}
</style>
