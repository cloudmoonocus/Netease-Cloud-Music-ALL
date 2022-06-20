<template>
    <div style="background-color: #fff">
        <!-- 顶部图片 -->
        <div class="head">
            <div class="pure_top"></div>
        </div>
        <!-- 第二层-播放全部- -->
        <div class="second">
            <Icon name="play-circle" style="color: #e60026; font-size: 30px; margin-left: 15px" />
            <span>播放全部</span>
        </div>
        <!-- 歌曲列表 -->
        <div class="third">
            <div class="card" v-for="dailyRecMusics in foundData.dailyRcMusic">
                <img :src="dailyRecMusics.al.picUrl" :alt="dailyRecMusics.name" />
                <div>{{ dailyRecMusics.name }}</div>
                <span v-for="nameDate in dailyRecMusics.ar">{{ nameDate.name }}</span>
                <Icon name="play-circle-o" class="play-circle-o" />
                <Icon name="more-o" class="more-o" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { Icon } from 'vant';
import { found } from '@/store/Found';
const foundData = found();
</script>

<style lang="less" scoped>
.head {
    .pure_top {
        width: 100%;
        height: 200px;
        position: relative;
        z-index: 100;
        overflow: hidden;
    }

    .pure_top::after {
        content: '';
        width: 140%;
        height: 200px;
        position: absolute;
        left: -20%;
        top: 0;
        z-index: 100;
        border-radius: 0 0 130px 130px;
        background-image: url('@/assets/images/Found/headDaily.jpg');
        background-size: 100% 100%;
    }
}

.second {
    display: flex;
    margin-top: 10px;

    span:nth-child(2) {
        margin-left: 15px;
        height: 30px;
        line-height: 30px;
        font-size: 15px;
        font-weight: 700;
    }
}

.third {
    margin-top: 20px;

    .card {
        position: relative;
        height: 80px;

        img:nth-child(1) {
            position: absolute;
            margin-left: 15px;
            border-radius: 10px;
            height: 55px;
            width: 55px;
        }

        div:nth-child(2) {
            position: absolute;
            left: 80px;
            top: 5px;
            width: 160px;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            font-size: 13px;
        }

        span:nth-child(3) {
            position: absolute;
            left: 80px;
            top: 23px;
            width: 110px;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            font-size: 10px;
            color: rgb(122, 119, 119);
        }

        span:nth-child(4) {
            position: absolute;
            left: 80px;
            top: 38px;
            width: 110px;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            font-size: 10px;
            color: rgb(122, 119, 119);
        }

        .play-circle-o {
            position: absolute;
            top: 10px;
            right: 55px;
            color: rgb(122, 119, 119);
        }

        .more-o {
            position: absolute;
            top: 10px;
            right: 10px;
            color: rgb(122, 119, 119);
        }
    }
}
</style>
