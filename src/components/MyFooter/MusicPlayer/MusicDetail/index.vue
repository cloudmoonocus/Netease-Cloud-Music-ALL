<template>
    <Popup v-model:show="detailShow" position="bottom" :style="{ height: '100%' }" close-on-popstate>
        <NavBar :title="props.data.title" arrow-down :border="false" @click-left="closeDetail" class="bgc0"
            @click.stop="">
            <template #left>
                <Icon name="arrow-down" size="25" color="#000" />
            </template>
        </NavBar>
        <div id="firstPlayer" v-show="firstPlayer">
            <div id="click" @click="showLyric">
                <div class="imgbgc">
                    <img :src="onplayingData.playNow.imageUrl" alt="onplayingData.playNow.title"
                        :class="{ iconPause: !onplayingData.playNow.play }">
                </div>
                <img src="@/assets/images/needle.png"
                    :class="{ needle: !onplayingData.playNow.play, needleActive: onplayingData.playNow.play }">
            </div>
        </div>
        <div id="secondLyric" v-show="secondLyric" @click="showLyric">
            <div id="lyric">
                <div v-for="value in onplayingData.playNow.lyricDetail[0]" :key="value" id="infor"
                    :data-time="value.time"
                    :class="{ current: (onplayingData.currentTime >= value.time && onplayingData.currentTime < value.nextTime) }">
                    {{ value.lyric }}
                </div>
            </div>
        </div>
        <div id="component">
            <div class="siler">{{ showSlider() }}</div>
            <Slider v-model="value" active-color="#e60026" inactive-color="#ccc" @change="changeSlider" class="bottom"
                button-size="12px">
            </Slider>
            <div class="fuc">
                <i class="iconfont icon-xiayigexiayishou" @click="lastMusic" style="transform:rotate(180deg)"></i>
                <i :class="pause" @click="musicPause"></i>
                <i class="iconfont icon-xiayigexiayishou" @click="nextMusic"></i>
            </div>
        </div>
    </Popup>
</template>

<script setup>
import { watch } from 'vue';
import { Popup, Slider, NavBar, Icon } from 'vant';
import { ref } from 'vue';
import onplaying from '@/store/OnPlaying';
const onplayingData = onplaying();

const props = defineProps({
    show: Boolean,
    data: Object,
})

const emits = defineEmits(['changeShow'])

const detailShow = ref(props.show);
watch(props, () => {
    detailShow.value = props.show;
})

// 点击左上角关闭
function closeDetail() {
    detailShow.value = false;
    emits('changeShow', detailShow.value);
}

const firstPlayer = ref(true);
const secondLyric = ref(false);
function showLyric() {
    firstPlayer.value = !firstPlayer.value;
    secondLyric.value = !secondLyric.value;
}

const pause = ref('iconfont icon-zanting')
watch(() => [onplayingData.playNow.id, onplayingData.playNow.play], () => {
    if (onplayingData.playNow.play) {
        pause.value = 'iconfont icon-zanting1';
    } else {
        pause.value = 'iconfont icon-zanting';
    }
})

function musicPause() {
    onplayingData.playNow.play = !onplayingData.playNow.play;
}

function nextMusic() {
    for (let index = 0; index < onplayingData.playList.length; index++) {
        if (onplayingData.playList[index].playNow) {
            onplayingData.playList[index].playNow = false;
        }
    }
    if (onplayingData.playNow.index === (onplayingData.playList.length - 1)) {
        onplayingData.playList[0].playNow = true;
        onplayingData.playList[0].play = true;
    } else {
        onplayingData.playList[onplayingData.playNow.index + 1].playNow = true;
        onplayingData.playList[onplayingData.playNow.index + 1].play = true;
    }
    onplayingData.judageNow();
}
function lastMusic() {
    for (let index = 0; index < onplayingData.playList.length; index++) {
        if (onplayingData.playList[index].playNow) {
            onplayingData.playList[index].playNow = false;
        }
    }
    if (onplayingData.playNow.index === 0) {
        onplayingData.playList[(onplayingData.playList.length - 1)].playNow = true;
        onplayingData.playList[(onplayingData.playList.length - 1)].play = true;
    } else {
        onplayingData.playList[onplayingData.playNow.index - 1].playNow = true;
        onplayingData.playList[onplayingData.playNow.index - 1].play = true;
    }
    onplayingData.judageNow();
}

const value = ref(0);
watch(() => onplayingData.currentTime, () => {
    value.value = parseInt((onplayingData.currentTime / onplayingData.totalTime) * 100);
    if (props.show) {
        let lyricAll = document.querySelector("#lyric")
        let lyricLine = document.querySelector('#infor.current');
        let scrollTop = lyricLine.offsetTop - lyricAll.clientHeight / 2;
        if (Math.abs(lyricLine.getBoundingClientRect().top - (lyricLine.offsetTop - scrollTop)) > 60) {
            setTimeout(() => {
                lyricAll.scroll({ top: lyricLine.offsetTop - lyricAll.clientHeight / 2, behavior: 'auto' })
            }, 2000);
        } else {
            lyricAll.scroll({ top: lyricLine.offsetTop - lyricAll.clientHeight / 2, behavior: 'smooth' })
        }
    }
    if (onplayingData.currentTime == onplayingData.totalTime) {
        onplayingData.currentTime = 0;
        for (let index = 0; index < onplayingData.playList.length; index++) {
            if (onplayingData.playList[index].playNow) {
                onplayingData.playList[index].playNow = false;
            }
        }
        if (onplayingData.playNow.index === (onplayingData.playList.length - 1)) {
            onplayingData.playList[0].playNow = true;
            onplayingData.playList[0].play = true;
        } else {
            onplayingData.playList[onplayingData.playNow.index + 1].playNow = true;
            onplayingData.playList[onplayingData.playNow.index + 1].play = true;
        }
        onplayingData.judageNow();
    }
})

function changeSlider() {
    onplayingData.slider = true;
    onplayingData.playNow.play = true;
    onplayingData.currentTime = value.value / 100 * onplayingData.totalTime;
    let lyricAll = document.querySelector("#lyric")
    let lyricLine = document.querySelector('#infor.current');
    lyricAll.scroll({ top: lyricLine.offsetTop - lyricAll.clientHeight / 2, behavior: 'auto' })
}

function showSlider() {
    let time = parseInt(onplayingData.currentTime);
    let minute = parseInt(time / 60);
    let second = parseInt(time % 60);
    let time2 = parseInt(onplayingData.totalTime);
    let minute2 = parseInt(time2 / 60);
    let second2 = parseInt(time2 % 60);
    minute = Number(minute);
    second = Number(second);
    minute2 = Number(minute2);
    second2 = Number(second2);
    if (second > 60) {
        minute++;
        second -= 60;
    }
    if (second2 > 60) {
        minute2++;
        second2 -= 60;
    }
    if (second.toString().length === 1) {
        second = '0' + second;
    }
    if (minute.toString().length === 1) {
        minute = '0' + minute;
    }
    if (second2.toString().length === 1) {
        second2 = '0' + second2;
    }
    if (minute2.toString().length === 1) {
        minute2 = '0' + minute2;
    }
    return (`${minute}:${second} / ${minute2}:${second2}`);
}
</script>

<style lang="less" scoped>
.bgc0 {
    background-image: linear-gradient(to left top, #ebeff9, #e7eaf3, #e2e6ee, #dee1e8, #dadde3, #d9dde3, #d8dde2, #d7dde2, #d9e1e6, #dae6e9, #dceaec, #dfeeee);
    height: 6%;
}

#firstPlayer {
    background-image: linear-gradient(to left top, #eefbf8, #e6f5f5, #e0eff2, #dae9ef, #d6e2eb, #d1dde6, #cbd7e2, #c6d2dd, #bccdd6, #b3c8cf, #abc3c6, #a5bebc);
    height: 94%;
    width: 100%;

    #click {
        height: 72%;

        .imgbgc {
            display: inline-block;

            display: flex;
            justify-content: center;
            align-items: center;

            position: absolute;
            z-index: 6;
            top: 15%;
            left: 50%;
            transform: translateX(-50%);

            background-color: #000;
            background: radial-gradient(circle, rgb(167, 166, 166), rgb(0, 0, 0));
            border-radius: 50%;
            height: 250px;
            width: 250px;

            img {
                border-radius: 50%;
                height: 160px;
                width: 160px;

                animation: record 10s linear infinite;
                animation-play-state: running;

                @keyframes record {
                    0% {
                        transform: rotate(0deg);
                    }

                    100% {
                        transform: rotate(720deg);
                    }
                }
            }

        }

        .needle {
            height: 150px;
            position: absolute;
            left: 35%;
            top: 8%;
            z-index: 10;
            transform-origin: right top;
            transform: rotate(-72deg);
            transition: all 2s;
        }

        .needleActive {
            height: 150px;
            position: absolute;
            left: 35%;
            top: 8%;
            z-index: 10;
            transform-origin: right top;
            transform: rotate(-54deg);
            transition: all 2s;
        }
    }
}

#secondLyric {
    background-image: linear-gradient(to left top, #eefbf8, #e6f5f5, #e0eff2, #dae9ef, #d6e2eb, #d1dde6, #cbd7e2, #c6d2dd, #bccdd6, #b3c8cf, #abc3c6, #a5bebc);
    height: 94%;
    width: 100%;

    #lyric {
        display: flex;
        flex-direction: column;
        align-items: center;
        scroll-behavior: auto;

        padding-top: 55%;
        font-size: 13px;
        height: 38%;
        color: #000;

        overflow: scroll;

        #infor {
            margin-top: 30px;
        }

        .current {
            font-size: 14px;
            color: #e60026;
        }
    }
}

#component {
    position: absolute;
    height: 50px;
    width: 100%;
    bottom: 10vh;

    .siler {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        font-size: 15px;
        bottom: 50px;
    }

    .bottom {
        bottom: 35px;
        margin: 0 auto;
        width: 85%;
        height: 4px;

        .custom-button {
            width: 26px;
            color: #000;
            font-size: 13px;
            line-height: 18px;
            text-align: center;
            background-image: linear-gradient(to left top, #eefbf8, #e6f5f5, #e0eff2, #dae9ef, #d6e2eb, #d1dde6, #cbd7e2, #c6d2dd, #bccdd6, #b3c8cf, #abc3c6, #a5bebc);
            border-radius: 100px;
        }
    }

    .fuc {
        margin-top: 15px;
        display: flex;
        justify-content: space-evenly;
        color: rgb(18, 18, 20);
        height: 50px;

        i:nth-child(1) {
            line-height: 50px;
            font-size: 30px;
        }

        i:nth-child(2) {
            line-height: 50px;
            font-size: 55px;
        }

        i:nth-child(3) {
            line-height: 50px;
            font-size: 30px;
        }


    }
}

.iconPause {
    animation-play-state: paused !important;
}
</style>
