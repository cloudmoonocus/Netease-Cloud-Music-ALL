<template>
    <router-view />
    <div v-if="$route.path == '/podcast'">
        <!-- 功能列表 -->
        <div>
            <Grid :gutter="5" class="grid" icon-size="25px" column-num="3">
                <Grid-item v-for="value in grids" :key="value.id" :icon="value.icon" :text="value.text" :to="value.path"
                    :class="{ gridIn: value.text != '全部分类', gridInRight: value.text === '全部分类' }" />
            </Grid>
        </div>
        <!-- 轮播图 -->
        <div>
            <Swipe :autoplay="3500" lazy-render class="swiper" round ref="swipe">
                <Swipe-item v-for="value in podcastData.djBanner" :key="value.targetId">
                    <van-image :src="value.pic" class="swiperIn" radius="10">
                        <template v-slot:loading>
                            <van-loading type="spinner" size="20" />
                        </template>
                    </van-image>
                </Swipe-item>
            </Swipe>
        </div>
        <!-- 猜你喜欢 -->
        <div class="rec1">
            <div class="recChild">
                <span class="recommention">猜你喜欢</span>
            </div>
            <Grid :border="false" :column-num="3" class="vanGridItemParent">
                <Grid-item class="vanGridItem" v-for="value in podcastData.djRecom">
                    <van-image class="vanImage" radius="5" :src="value.picUrl" />
                    <a :title="value.name">{{ value.name }}</a>
                </Grid-item>
            </Grid>
        </div>
        <!-- 创作翻唱 -->
        <div class="rec1">
            <div class="recChild" @click="$router.push('/podcast/allcategories')">
                <span class="recommention">创作翻唱</span>
            </div>
            <Grid :border="false" :column-num="3" class="vanGridItemParent">
                <Grid-item class="vanGridItem" v-for="value in podcastData.indexCategory2001" :key="value.id">
                    <van-image class="vanImage" radius="5" :src="value.picUrl">
                        <template v-slot:loading>
                            <van-loading type="spinner" size="20" />
                        </template>
                    </van-image>
                    <a :title="value.name">{{ value.name }}</a>
                </Grid-item>
            </Grid>
        </div>
        <!-- 情感 -->
        <div class="rec1">
            <div class="recChild">
                <span class="recommention">情感</span>
            </div>
            <Grid :border="false" :column-num="3" class="vanGridItemParent">
                <Grid-item class="vanGridItem" v-for="value in podcastData.indexCategory3" :key="value.id">
                    <van-image class="vanImage" radius="5" :src="value.picUrl">
                        <template v-slot:loading>
                            <van-loading type="spinner" size="20" />
                        </template>
                    </van-image>
                    <a :title="value.name">{{ value.name }}</a>
                </Grid-item>
            </Grid>
        </div>
        <!-- 电音 -->
        <div class="rec1">
            <div class="recChild">
                <span class="recommention">电音</span>
            </div>
            <Grid :border="false" :column-num="3" class="vanGridItemParent">
                <Grid-item class="vanGridItem" v-for="value in podcastData.indexCategory10002" :key="value.id">
                    <van-image class="vanImage" radius="5" :src="value.picUrl">
                        <template v-slot:loading>
                            <van-loading type="spinner" size="20" />
                        </template>
                    </van-image>
                    <a :title="value.name">{{ value.name }}</a>
                </Grid-item>
            </Grid>
        </div>
        <!-- 知识 -->
        <div class="rec1">
            <div class="recChild">
                <span class="recommention">知识</span>
            </div>
            <Grid :border="false" :column-num="3" class="vanGridItemParent">
                <Grid-item class="vanGridItem" v-for="value in podcastData.indexCategory11" :key="value.id">
                    <van-image class="vanImage" radius="5" :src="value.picUrl">
                        <template v-slot:loading>
                            <van-loading type="spinner" size="20" />
                        </template>
                    </van-image>
                    <a :title="value.name">{{ value.name }}</a>
                </Grid-item>
            </Grid>
        </div>
        <!-- 二次元 -->
        <div class="rec1">
            <div class="recChild">
                <span class="recommention">二次元</span>
            </div>
            <Grid :border="false" :column-num="3" class="vanGridItemParent">
                <Grid-item class="vanGridItem" v-for="value in podcastData.indexCategory3001" :key="value.id">
                    <van-image class="vanImage" radius="5" :src="value.picUrl">
                        <template v-slot:loading>
                            <van-loading type="spinner" size="20" />
                        </template>
                    </van-image>
                    <a :title="value.name">{{ value.name }}</a>
                </Grid-item>
            </Grid>
        </div>
        <!-- 底部 -->
        <Tip />
        <!-- 防止底部遮挡 -->
        <div style="height: 60px; width: 100%"></div>
    </div>
</template>

<script setup>
import { Grid, GridItem, Swipe, SwipeItem } from 'vant';
import { Image as VanImage } from 'vant';
import Tip from '@/components/Tip';
import podcast from '@/store/Podcast';
const podcastData = podcast();

// 功能列表
const grids = [
    { id: 1, icon: 'audio', text: '我的播客', path: '/podcast/mypodcast' },
    { id: 2, icon: 'expand', text: '全部分类', path: '/podcast/allcategories' },
    { id: 3, icon: 'descending', text: '排行榜', path: '/podcast/podcastrankinglist' },
    { id: 4, icon: 'closed-eye', text: '助眠解压', path: '/podcast/nightsleep' },
    { id: 5, icon: 'graphic', text: '有声书', path: '/podcast/soundbook' },
    { id: 6, icon: 'live', text: '广播电台', path: '/podcast/fm' },
];

// 全部分类
// 创作翻唱
podcastData.getAllCategory(2001);
// 新闻资讯
podcastData.getAllCategory(3087096);
// 情感
podcastData.getAllCategory(3);
// 电音
podcastData.getAllCategory(10002);
// 知识
podcastData.getAllCategory(11);
// 二次元
podcastData.getAllCategory(3001);
// 脱口秀
podcastData.getAllCategory(8);

// 轮播图
podcastData.getDjBanner();
// 猜你喜欢
podcastData.getDjRecom();
</script>

<style lang="less" scoped>
.grid {
    margin: 0 auto;
    margin-top: 10px;
    width: 92%;
}

.gridIn {
    color: #e60026;
    text-decoration: line-through;
}

.gridInRight {
    color: #e60026;
}

.swiper {
    margin-left: 50%;
    transform: translate(-50%);
    margin-top: 10px;
    height: 140px;
    width: 91%;
}

.swiperIn {
    margin-left: 50%;
    transform: translate(-50%);
    width: 100%;
    height: 140px;
}

.rec1 {
    background-color: #fff;
    margin: 0 auto;
    margin-top: 10px;
    /* margin-bottom: 30px; */
    width: 91%;
    /* height: 190px; */
}

.recChild {
    display: flex;
    height: 30px;
}

.vanImage {
    border-radius: 10px;
    width: 95px;
}

.vanGridItem {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.vanGridItemParent {
    display: flex;
    align-items: flex-start;
}

.vanGridItem a {
    margin-top: 4px;
    font-size: 10px;
    width: 95px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}

.recommention {
    margin-left: 10px;
    margin-top: 12px;
    font-size: 15px;
    font-weight: 700;
}
</style>
