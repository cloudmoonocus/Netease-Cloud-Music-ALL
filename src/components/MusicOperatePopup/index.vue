<template>
    <Popup v-model:show="show" round position="bottom" :style="{ height: '18%', backgroundColor: '#fff' }"
        @click-overlay="emits('closePopup')" teleport="#app">
        <CellGroup class="group" :border="false">
            <Cell title="&nbsp;&nbsp;下一首播放" :border="false" icon="play-circle-o" @click="nextPlay" />
            <Cell title="&nbsp;&nbsp;收藏到歌单" :border="false" icon="sign" id="no" />
        </CellGroup>
    </Popup>
</template>

<script setup>
import { reqMusicLyric, reqMusicUrl } from '@/Api';
import onplaying from '@/store/OnPlaying';
import { Popup, Cell, CellGroup, Toast } from 'vant';
import { ref } from 'vue';

const onplayingData = onplaying();

const props = defineProps({
    show: Boolean,
    data: Object,
});

const emits = defineEmits(['closePopup']);
const show = ref(false);
show.value = props.show;

async function nextPlay() {
    Toast.loading({
        message: '添加中...',
        forbidClick: true,
    });
    // 获取点击歌曲的Url
    const urlResult = await reqMusicUrl(props.data.id)
    // 获取点击歌曲的歌词
    const lyricResult = await reqMusicLyric(props.data.id)
    let data = {};
    if (urlResult.code === 200) {
        let newLyricArray = lyricResult.lrc.lyric.split(/[(\r\n)\r\n]+/).map((item) => {
            let minute = item.slice(1, 3);
            let second = item.slice(4, 6);
            let millisecond = item.slice(7, 10);
            let lyric = item.slice(11, item.length);
            if (isNaN(Number(millisecond))) {
                millisecond = item.slice(7, 9);
                lyric = item.slice(10, item.length);
            }
            let time = Number(minute) * 60 + Number(second) + Number(millisecond) / 1000;
            return { minute, second, millisecond, lyric, time }
        })
        newLyricArray.forEach((item, i) => {
            if (i === newLyricArray.length - 1) {
                item.lyric = 'Made By Cloudmoon';
                item.nextTime = 99999;
            } else {
                item.nextTime = newLyricArray[i + 1].time;
            }
        });
        if (onplayingData.playList.length >= 2) {
            if (props.data.id === onplayingData.playList[onplayingData.playNow.index + 1].id) {
            } else {
                for (let index = 0; index < onplayingData.playList.length; index++) {
                    if (onplayingData.playList[index].index > onplayingData.playNow.index) {
                        onplayingData.playList[index].index++;
                    }
                    if (onplayingData.playList[index].id === props.data.id) {
                        onplayingData.playList.splice(index, 1);
                        for (let index2 = index; index2 < onplayingData.playList.length; index2++) {
                            onplayingData.playList[index2].index--;
                        }
                    }
                }
                data = {
                    play: false,
                    playNow: false,
                    index: (onplayingData.playNow.index + 1),
                    id: props.data.id,
                    imageUrl: props.data.url,
                    title: props.data.title,
                    author: props.data.author,
                    musicUrl: urlResult.data[0].url,
                    lyricDetail: [newLyricArray],
                }
                onplayingData.playList.push(data);
            }
        } else if (onplayingData.playList.length === 1) {
            if (props.data.id === onplayingData.playList[0].id) {

            } else {
                data = {
                    play: false,
                    playNow: false,
                    index: (onplayingData.playNow.index + 1),
                    id: props.data.id,
                    imageUrl: props.data.url,
                    title: props.data.title,
                    author: props.data.author,
                    musicUrl: urlResult.data[0].url,
                    lyricDetail: [newLyricArray],
                }
                onplayingData.playList.push(data);
            }
        } else {
            data = {
                play: true,
                playNow: true,
                index: 0,
                id: props.data.id,
                imageUrl: props.data.url,
                title: props.data.title,
                author: props.data.author,
                musicUrl: urlResult.data[0].url,
                lyricDetail: [newLyricArray],
            }
            onplayingData.playList.push(data);
        }
    }
    onplayingData.judageNow();
    emits('closePopup');
}
</script>

<style lang="less" scoped>
.group {
    margin-top: 2%;

    #no {
        text-decoration: line-through;
    }
}
</style>
