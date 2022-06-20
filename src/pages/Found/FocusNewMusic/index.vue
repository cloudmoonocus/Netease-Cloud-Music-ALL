<template>
    <div class="first"></div>
    <div class="out">
        <div class="card" v-for="value in foundData.newAirtistMusic" style="background-color: #fff;">
            <img v-lazy="value.blockTitle.imgUrl" :alt="value.blockTitle.resourceName" />
            <div>{{ value.blockTitle.resourceName }}</div>
            <span>{{ value.blockTitle.artistName }}</span>
            <Icon name="play-circle-o" class="play-circle-o" />
            <Icon name="more-o" class="more-o" />
        </div>
    </div>
</template>

<script setup>
import { Icon } from 'vant';
import { found } from '@/store/Found';
const foundData = found();
foundData.getNewAirtistMusic();
</script>

<style lang="less" scoped>
.first {
    height: 20px;
    background-color: #fff;
}

.out {
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
