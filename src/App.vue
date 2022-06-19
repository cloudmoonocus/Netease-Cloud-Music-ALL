<template>
    <MyHeader />
    <router-view></router-view>
    <MyFooter />
</template>

<script setup>
import MyHeader from '@/components/MyHeader';
import MyFooter from '@/components/MyFooter';
</script>

<style lang="less">
// 修改进度条npropress的颜色
#nprogress {
    .bar {
        background: #e60026 !important;
    }

    .peg {
        box-shadow: 0 0 10px #e60026, 0 0 5px #e60026 !important;
    }

    .spinner-icon {
        border-top-color: #e60026 !important;
        border-left-color: #e60026 !important;
    }
}

// overflow: hidden;
// display: -webkit-box;
// -webkit-line-clamp: 1;
// -webkit-box-orient: vertical;
</style>
