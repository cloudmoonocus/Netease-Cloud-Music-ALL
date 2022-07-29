<template>
    <div v-if="$route.meta.show">
        <Sticky :offset-bottom="49" position="bottom">
            <MusicPlayer />
        </Sticky>
        <Tabbar fixed v-model="active" active-color="#ee0a24" inactive-color="#000">
            <TabbarItem replace to="/found" icon="music">发现</TabbarItem>
            <TabbarItem replace to="/podcast" icon="audio">播客</TabbarItem>
            <TabbarItem replace to="/myindex" icon="manager">我的</TabbarItem>
            <TabbarItem replace to="/attention" icon="like">关注</TabbarItem>
            <TabbarItem replace to="/cloudsquare" icon="shop">云村</TabbarItem>
        </Tabbar>
    </div>
</template>

<script setup>
import { Tabbar, TabbarItem, Sticky } from 'vant';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import MusicPlayer from '@/components/MyFooter/MusicPlayer';
let route = useRoute();

const active = ref(-1);
setTimeout(() => {
    active.value = route.meta.active;
}, 800);
</script>

<style lang="less" scoped>
</style>
