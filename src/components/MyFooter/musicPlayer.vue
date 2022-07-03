<template>
    <div class="playerOut">
        <div class="leftImage leftAnimate">
            <img src="http://p1.music.126.net/JnQmWLPgIh97PZnBtpPKOA==/109951164274045767.jpg?param=140y140" />
        </div>
        <div class="name">
            <span>xxxxxxxxxxxxxx</span>
        </div>
        <div class="pause">
            <Circle v-model:current-rate="currentRate" :stroke-width="50" size="30px" color="#000" layer-color="#eee"
                text="▶" :speed="10" />
        </div>
        <div class="list">
            <Icon name="bars" />
        </div>
    </div>
</template>

<script setup>
import { Circle, Icon } from 'vant'
import { ref } from 'vue';

const currentRate = ref(0);
</script>

<style lang="less" scoped>
.playerOut {
    position: relative;
    width: 100%;
    height: 50px;
    background-color: #fff;

    .leftImage {
        position: absolute;
        top: 5px;
        left: 10px;
        height: 40px;
        width: 40px;
        line-height: 50px;
        border-radius: 20px;
        background-color: #000;

        img {
            height: 30px;
            width: 30px;
            margin-left: 5px;
            margin-top: 50%;
            transform: translateY(-50%);
            border-radius: 17.5px;
        }
    }

    .leftAnimate {
        animation-duration: 6s;
        animation-name: rotate;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
        animation-play-state: running;

        @keyframes rotate {
            0% {
                transform: rotate(0deg)
            }

            100% {
                transform: rotate(360deg)
            }
        }
    }

    .animatePause {
        animation-play-state: paused;
    }

    .name {
        display: inline-block;
        position: absolute;
        line-height: 50px;
        font-size: 20px;
        left: 60px;
    }

    .pause {
        display: inline-block;
        position: absolute;
        margin-top: 8px;
        right: 55px;
    }

    .list {
        display: inline-block;
        position: absolute;
        font-size: 30px;
        line-height: 50px;
        right: 15px;
    }

}
</style>
