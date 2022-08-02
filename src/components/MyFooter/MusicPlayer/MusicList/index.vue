<template>
    <Popup v-model:show="listShow" position="bottom" :style="{ paddingBottom: '5px', height: '50%', paddingTop: '5px' }"
        @click-overlay="closeList" round style="background-color: #fff;" close-on-popstate safe-area-inset-bottom>
        <NavBar>
            <template #left>
                <span>当前播放</span>
                <span>({{ onplayingData.playList.length }})</span>
            </template>
            <template #right>
                <Icon name="delete-o" size="20" color="#000" @click.stop="deleteAll" />
            </template>
        </NavBar>
        <div class="list">
            <div class="card" v-for="value in onplayingData.playList" :key="value"
                @click="playMusic(value.id, value.imageUrl, value.title, value.author)">
                <span class="title">{{ value.title }}</span>
                <span class="author">- {{ value.author }}</span>
                <Icon name="cross" class="cross" @click.stop="clearMusic(value.id)" />
            </div>
        </div>
    </Popup>
</template>

<script setup>
import { Popup, NavBar, Icon, Toast } from 'vant';
import { ref, watch } from 'vue';
import { reqMusicLyric, reqMusicUrl } from '@/Api';
import onplaying from '@/store/OnPlaying';

const onplayingData = onplaying();

const listShow = ref(false);

const props = defineProps({
    show: Boolean
})

const emits = defineEmits(['changeShow'])

watch(props, () => {
    listShow.value = props.show;
})

// 点击遮罩层关闭
function closeList() {
    listShow.value = false;
    emits('changeShow', listShow.value);
}

function clearMusic(id) {
    let playIs = onplayingData.playNow.play;
    for (let index = 0; index < onplayingData.playList.length; index++) {
        if (onplayingData.playList[index].id === id) {
            if (onplayingData.playList[index].id === onplayingData.playNow.id) {
                if (onplayingData.playList[index].index === (onplayingData.playList.length - 1)) {
                    onplayingData.playList[0].playNow = true;
                } else {
                    onplayingData.playList[index + 1].playNow = true;
                }
            }
            onplayingData.playList.splice(index, 1);
            for (let index2 = index; index2 < onplayingData.playList.length; index2++) {
                onplayingData.playList[index2].index--;
            }
        }
    }
    onplayingData.judageNow();
    onplayingData.playNow.play = playIs;
}
function deleteAll() {
    onplayingData.playList = [];
    onplayingData.judageNow();
}

function playMusic(id, imageUrl, title, author) {
    play(id, imageUrl, title, author);
}
async function play(id, imageUrl, title, author) {
    Toast.loading({
        message: '添加中...',
        forbidClick: true,
    });
    // 获取点击歌曲的Url
    const urlResult = await reqMusicUrl(id);
    // 获取点击歌曲的歌词
    const lyricResult = await reqMusicLyric(id);
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
            return { minute, second, millisecond, lyric, time };
        });
        newLyricArray.forEach((item, i) => {
            if (i === newLyricArray.length - 1) {
                item.lyric = 'Made By Cloudmoon';
                item.nextTime = 99999;
            } else {
                item.nextTime = newLyricArray[i + 1].time;
            }
        });
        let data = {};
        if (onplayingData.playList.length) {
            for (let index = 0; index < onplayingData.playList.length; index++) {
                onplayingData.playList[index].index++;
                if (onplayingData.playList[index].id === id) {
                    onplayingData.playList.splice(index, 1);
                    for (let index2 = index; index2 < onplayingData.playList.length; index2++) {
                        onplayingData.playList[index2].index--;
                    }
                }
            }
            data = {
                play: true,
                playNow: true,
                index: 0,
                id: id,
                imageUrl: imageUrl,
                title: title,
                author: author,
                musicUrl: urlResult.data[0].url,
                lyricDetail: [newLyricArray],
            };
        } else {
            data = {
                play: true,
                playNow: true,
                index: 0,
                id: id,
                imageUrl: imageUrl,
                title: title,
                author: author,
                musicUrl: urlResult.data[0].url,
                lyricDetail: [newLyricArray],
            };
        }
        onplayingData.playList.push(data);
        onplayingData.judageNow();
    }
}
</script>

<style lang="less" scoped>
.list {
    .card {
        height: 50px;
        display: flex;
        align-items: center;
        position: relative;

        .title {
            padding-left: 20px;
            font-size: 15px;
            max-width: 120px;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
        }

        .author {
            padding-left: 5px;
            font-size: 11px;
            color: rgb(122, 119, 119);
            max-width: 130px;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
        }

        .cross {
            position: absolute;
            right: 3px;
            text-align: right;
            padding-right: 20px;
            font-size: 17px;
        }
    }
}
</style>
