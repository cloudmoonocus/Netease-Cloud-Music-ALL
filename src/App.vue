<template>
    <MyHeader />
    <router-view></router-view>
    <MyFooter />
</template>

<script setup>
import MyHeader from '@/components/MyHeader';
import MyFooter from '@/components/MyFooter';

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// 禁止环形进度条展示
NProgress.configure({ showSpinner: false })
</script>

<style lang="less">
// 修改进度条npropress的颜色
#nprogress {
    .bar {
        background: #e60026 !important;

    }

    .peg {
        box-shadow:
            2.3px 2.8px 2.2px rgba(0, 0, 0, 0.07),
            5.6px 6.7px 5.3px rgba(0, 0, 0, 0.05),
            10.5px 12.5px 10px rgba(0, 0, 0, 0.042),
            18.8px 22.3px 17.9px rgba(0, 0, 0, 0.035),
            35.1px 41.8px 33.4px rgba(0, 0, 0, 0.028),
            84px 100px 80px rgba(0, 0, 0, 0.02) !important;
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
