<template>
    <router-view />
    <div style="background-color: #fff; z-index: -10; padding-bottom: 20px;"
        v-if="$route.path == '/found/digitalalbum'">
        <!-- 轮播图 -->
        <div class="head">
            <Swipe :autoplay="3500" lazy-render class="swiper" round>
                <Swipe-item v-for="image in foundData.bannerImage" :key="image">
                    <img :src="image.pic" class="swiperIn" />
                </Swipe-item>
            </Swipe>
        </div>
        <!-- 功能列表 -->
        <div class="second">
            <div class="fun" @click="routerHotList">
                <div>
                    <Icon name="fire-o" class="icon" />
                </div>
                <div>畅销榜</div>
            </div>
            <div class="fun" @click="routerMusicLanguage">
                <div>
                    <Icon name="expand-o" class="icon" />
                </div>
                <div>风格馆</div>
            </div>
            <div class="fun" @click="routerBuy">
                <div>
                    <Icon name="passed" class="icon" />
                </div>
                <div>已购</div>
            </div>
        </div>
        <!-- 最新上架 -->
        <div class="third">
            <div @click="routerMusicLanguage">
                <span>最新上架&nbsp;</span>
                <Icon name="arrow" />
            </div>
            <div>
                <!-- 列表 -->
                <div class="card" v-for="value in foundData.newDigitalAlbum.splice(0, 48)" :key="value.albumId">
                    <img v-lazy="value.coverUrl" :alt="value.albumName" :title="value.albumName" />
                    <div class="imgTitle">{{ value.albumName }}</div>
                    <div class="author">{{ value.artistName }}</div>
                    <div class="money">￥{{ value.price }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Swipe, SwipeItem, Icon } from 'vant';
import router from '@/routers';
import { found } from '@/store/Found';
const foundData = found();

function routerHotList() {
    router.push('/found/digitalalbum/hotlist');
}
function routerMusicLanguage() {
    router.push('/found/digitalalbum/musiclanguage');
}
function routerBuy() {
    router.push('/myindex/buy');
}
</script>

<style lang="less" scoped>
.head {
    .swiper {
        margin-left: 50%;
        transform: translate(-50%);
        padding-top: 10px;
        height: 140px;
        width: 92%;
    }

    .swiperIn {
        margin-left: 50%;
        transform: translate(-50%);
        border-radius: 5px;
        width: 100%;
        width: 340px;
    }
}

.second {
    display: flex;
    justify-content: space-evenly;
    padding-bottom: 10px;
    border-bottom: solid 1px #eee;

    .fun {
        display: flex;
        flex-direction: column;
        margin-top: 10px;
        width: 65px;

        div:nth-child(1) {
            margin: 0 auto;
            background-color: #e60026;
            height: 45px;
            width: 45px;
            border-radius: 22.5px;

            .icon {
                line-height: 45px;
                margin-left: 50%;
                transform: translateX(-50%);
                font-size: 30px;
                color: #fff;
            }
        }

        div:nth-child(2) {
            margin: 0 auto;
            margin-top: 3px;
            // width: 70px;
            font-size: 13px;
            text-align: center;
            color: rgb(122, 119, 119);
        }
    }
}

.third {
    width: 90%;
    margin: 0 auto;

    div:nth-child(1) {
        margin-top: 25px;
        font-size: 17px;
        font-weight: 700;
    }

    div:nth-child(2) {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;

        .card {
            position: relative;
            margin-top: 15px;
            width: 100px;
            height: 140px;
            font-size: 10px;
            font-weight: 400;

            img {
                height: 100px;
                width: 100px;
            }

            .imgTitle {
                position: absolute;
                top: 105px;
                width: 100px;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                color: #000;
            }

            .author {
                position: absolute;
                top: 118px;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                color: rgb(122, 119, 119);
            }

            .money {
                position: absolute;
                top: 130px;
                color: #e60026;
            }
        }
    }
}
</style>
