<template>
    <router-view />
    <div v-if="$route.path == '/found'">
        <!-- 轮播图 -->
        <div>
            <Swipe :autoplay="3500" lazy-render class="swiper" round>
                <Swipe-item v-for="image in foundData.bannerImage" :key="image">
                    <img :src="image.pic" class="swiperIn" />
                </Swipe-item>
            </Swipe>
        </div>
        <!-- 功能列表 -->
        <div>
            <Grid :gutter="5" class="grid" icon-size="25px" column-num="4">
                <Grid-item v-for="value in grids" :key="value.id" :icon="value.icon" :text="value.text" :to="value.path"
                    class="gridIn" />
            </Grid>
        </div>
        <!-- 推荐歌单 -->
        <div class="rec1">
            <div class="recChild">
                <span class="recommention">推荐歌单</span>
                <a class="more" @click="$router.push('/found/musiclist')">更多 ></a>
            </div>
            <Grid :border="false" :column-num="3" class="vanGridItemParent" :center="false">
                <Grid-item class="vanGridItem" v-for="dailyLists in foundData.dailyList" :key="dailyLists.id">
                    <van-image class="vanImage" radius="5" :src="dailyLists.picUrl" />
                    <a :title="dailyLists.name">{{ dailyLists.name }}</a>
                </Grid-item>
            </Grid>
        </div>
        <!-- 推荐歌曲 -->
        <div class="rec2">
            <div>
                <span class="recommention">推荐歌曲</span>
                <a class="more2" @click="$router.push('/found/dailyrecommendation')">播放
                    <Icon name="play-circle-o" />
                </a>
            </div>
            <Grid :column-num="1" direction="horizontal" class="vanGrid" :center="false" icon-size="35">
                <!-- 通过splice方法控制循环的长度 -->
                <Grid-item v-for="dailyRcMusics in foundData.dailyRcMusic.splice(0, 4)" :key="dailyRcMusics.al.id"
                    :icon="dailyRcMusics.al.picUrl" :text="dailyRcMusics.name" class="indent" />
            </Grid>
        </div>
        <!-- 新歌 新碟 数字专辑 -->
        <div class="rec3">
            <Tabs v-model:active="active" swipeable :lazy-render="false">
                <Tab title="新歌">
                    <Grid :column-num="1" direction="horizontal" class="vanGrid" :center="false" icon-size="35">
                        <Grid-item v-for="newMusics in foundData.newMusic.slice(0, 5)" :key="newMusics.album.id"
                            :icon="newMusics.album.picUrl" :text="newMusics.name" class="indent" />
                    </Grid>
                </Tab>
                <Tab title="新碟">
                    <Grid :column-num="1" direction="horizontal" class="vanGrid" :center="false" icon-size="35">
                        <Grid-item v-for="newAlbum in foundData.newAlbum.slice(0, 5)" :key="newAlbum.id"
                            :icon="newAlbum.picUrl" :text="newAlbum.name" class="indent" />
                    </Grid>
                </Tab>
                <Tab title="数字专辑">
                    <Grid :column-num="1" direction="horizontal" class="vanGrid" :center="false" icon-size="35">
                        <Grid-item v-for="newDigitalAlbum in foundData.newDigitalAlbum.slice(0, 5)"
                            :key="newDigitalAlbum.albumId" :icon="newDigitalAlbum.coverUrl"
                            :text="newDigitalAlbum.albumName" class="indent" />
                    </Grid>
                </Tab>
            </Tabs>
        </div>
        <!-- 排行榜 -->
        <div class="rec4">
            <div class="recChild">
                <span class="recommention">排行榜&nbsp;&nbsp;</span>
                <a class="more" @click="$router.push('/found/rankinglist')">更多 ></a>
            </div>
            <Grid :column-num="1" direction="horizontal" class="vanGrid" :center="false" icon-size="35">
                <Grid-item v-for="rankingLists in foundData.rankingList.slice(0, 5)" :key="rankingLists.rank"
                    :icon="rankingLists.coverUrl" :text="rankingLists.albumName" class="indent" />
            </Grid>
        </div>
        <!-- 热门话题 -->
        <div class="rec5">
            <div class="recChild">
                <span class="recommention">热门话题</span>
            </div>
            <Grid :column-num="1" direction="horizontal" class="vanGrid" :center="false" icon-size="35">
                <Grid-item v-for="hotTopics in foundData.hotTopic" :key="hotTopics.actId" :icon="hotTopics.sharePicUrl"
                    :text="hotTopics.title" class="indent" />
            </Grid>
        </div>
        <!-- 底部 -->
        <Tip />
        <!-- 防止底部遮挡 -->
        <div style="height: 60px; width: 100%"></div>
    </div>
</template>

<script setup>
import { Swipe, SwipeItem, Grid, GridItem, Icon, Tab, Tabs } from 'vant';
import { Image as VanImage } from 'vant';
import Tip from '@/components/Tip';
import { ref } from 'vue';
import { found } from '@/store/Found';
const foundData = found();

const active = ref(0);


// banner图
foundData.getBannerImage();

// 功能列表
const grids = [
    { id: 1, icon: 'hot', text: '每日推荐', path: '/found/dailyrecommendation' },
    { id: 2, icon: 'audio', text: '私人FM', path: '/found/privatefm' },
    { id: 3, icon: 'column', text: '歌单', path: '/found/musiclist' },
    { id: 4, icon: 'descending', text: '排行榜', path: '/found/rankinglist' },
    { id: 5, icon: 'coupon', text: '数字专辑', path: '/found/digitalalbum' },
    { id: 6, icon: 'graphic', text: '有声书', path: '/podcast/soundbook' },
    { id: 7, icon: 'music', text: '关注新歌', path: '/found/focusnewmusic' },
    { id: 8, icon: 'fire', text: '歌房', path: '/found/musichouse' },
];

// 推荐歌单
foundData.getDailyList();

// 推荐歌曲
foundData.getDailyRcMusic();

// 新歌
foundData.getNewMusic();

// 新碟
foundData.getNewAlbum();

// 数字专辑
foundData.getNewDigitalAlbum();

// 数字单曲榜单
foundData.getRankingList();

// 热门话题
foundData.getHotTopic();
</script>

<style scoped>
.swiper {
    margin-left: 50%;
    transform: translate(-50%);
    margin-top: 10px;
    height: 140px;
    width: 92%;
}

.swiperIn {
    margin-left: 50%;
    transform: translate(-50%);
    width: 100%;
    width: 340px;
}

.swiperIn {
    width: 340px;
    height: 140px;
    border-radius: 10px;
}

.grid {
    margin: 0 auto;
    margin-top: 10px;
    width: 92%;
}

.gridIn {
    color: #e60026;
}

.rec1 {
    background-color: #fff;
    margin: 0 auto;
    margin-top: 10px;
    width: 91%;
}

.rec2 {
    background-color: #fff;
    margin: 0 auto;
    margin-top: 10px;
    width: 91%;
}

.rec3 {
    background-color: #fff;
    margin: 0 auto;
    margin-top: 10px;
    width: 91%;
}

.rec4 {
    background-color: #fff;
    margin: 0 auto;
    margin-top: 10px;
    width: 91%;
}

.rec5 {
    background-color: #fff;
    margin: 0 auto;
    margin-top: 10px;
    width: 91%;
}

.recChild {
    display: flex;
    height: 30px;
}

.recommention {
    margin-left: 10px;
    margin-top: 12px;
    font-size: 15px;
    font-weight: 700;
}

.more {
    margin-left: 61%;
    margin-top: 10px;
    padding: 1px 5px;
    font-size: 13px;
    border: #eee solid 1px;
    border-radius: 10px;
    width: 40px;
    height: 18px;
}

.more2 {
    margin-left: 58%;
    margin-top: 10px;
    padding: 1px 5px;
    font-size: 13px;
    border: #eee solid 1px;
    border-radius: 10px;
    width: 48px;
    height: 18px;
}

.vanImage {
    border-radius: 10px;
    width: 95px;
}

.vanGridItemParent {
    display: flex;
    align-items: flex-start;
}

.vanGridItem {
    display: flex;
    flex-direction: column;
    justify-content: center;
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

.rec2 {
    margin-top: 10px;
}

.vanGrid {
    margin-top: 15px;
}

.indent {
    margin-left: 15px;
}
</style>
