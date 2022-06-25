<template>
    <Notice-bar left-icon="info-o">
        播放数为0是该接口返回的播放数全部为0,但未调用其他接口来获取数量
    </Notice-bar>
    <div class="head">
        <Tabs swipeable duration="0" :lazy-render="false" line-height="7" ref="tabs">
            <Tab title="创作翻唱">
                <!-- 内容 -->
                <Presentation :list="podcastData.category2001" />
            </Tab>
            <Tab title="新闻资讯">
                <!-- 内容 -->
                <Presentation :list="podcastData.category3087096" />
            </Tab>
            <Tab title="情感">
                <!-- 内容 -->
                <Presentation :list="podcastData.category3" />
            </Tab>
            <Tab title="电音">
                <!-- 内容 -->
                <Presentation :list="podcastData.category10002" />
            </Tab>
            <Tab title="知识">
                <!-- 内容 -->
                <Presentation :list="podcastData.category11" />
            </Tab>
            <Tab title="二次元">
                <!-- 内容 -->
                <Presentation :list="podcastData.category3001" />
            </Tab>
            <Tab title="脱口秀">
                <!-- 内容 -->
                <Presentation :list="podcastData.category8" />
            </Tab>
        </Tabs>
    </div>
</template>

<script setup>
import { Tab, Tabs, NoticeBar } from 'vant';
import Presentation from './Presentation.vue';
import podcast from '@/store/Podcast';
const podcastData = podcast();

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

</script>

<style lang="less" scoped>
</style>
