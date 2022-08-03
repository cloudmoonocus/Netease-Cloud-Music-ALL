<template>
    <div style="background-color: #fff">
        <div class="rcMyHead">
            <Tabs swipeable line-height="6px" :lazy-render="true" v-if="show">
                <Tab title="歌曲">
                    <div class="rcSecond">
                        <Icon name="play-circle" style="color: #e60026; font-size: 30px; margin-left: 15px" />
                        <span>播放全部</span>
                        <span>({{ myindexData.recentSong.list.length }})</span>
                    </div>
                    <div class="rcThird">
                        <div class="rcCard" v-for="value in myindexData.recentSong.list" :key="value.resourceId">
                            <div>
                                <div>{{ value.data.name }}</div>
                                <div>{{ value.data.ar[0].name }} - {{ value.data.al.name }}</div>
                            </div>
                            <Icon class="rcIcon" name="ellipsis" @click="popupShow(value.resourceId)" />
                        </div>
                    </div>
                </Tab>
                <Tab title="视频">
                    <strong>本页未编写</strong>
                </Tab>
                <Tab title="声音">
                    <strong>本页未编写</strong>
                </Tab>
                <Tab title="歌单">
                    <strong>本页未编写</strong>
                </Tab>
                <Tab title="专辑">
                    <strong>本页未编写</strong>
                </Tab>
                <Tab title="播客">
                    <strong>本页未编写</strong>
                </Tab>
            </Tabs>
        </div>
        <MusicOperate :show="popupShowVal" :id="musicId" v-if="popupOutShow" @closePopup="closeOutPopup" />
    </div>
</template>

<script setup>
import { Tab, Tabs, Icon } from 'vant';
import MusicOperate from '@/components/MusicOperatePopup'
import myindex from '@/store/MyIndex';
import { ref, watch } from 'vue';
const myindexData = myindex();

// 获取最近播放歌曲
myindexData.getRecentSong();

const show = ref();
watch(() => myindexData.recentSong, () => {
    setTimeout(() => {
        show.value = true;
    }, 800)
})


const popupShowVal = ref(false);
const popupOutShow = ref(false);
const musicId = ref();
function popupShow(id) {
    popupShowVal.value = true;
    musicId.value = id;
    popupOutShow.value = true;
}
function closeOutPopup() {
    popupShowVal.value = false;
    popupOutShow.value = false;
}
</script>

<style lang="less" scoped>
.rcSecond {
    display: flex;
    margin-top: 20px;

    span:nth-child(2) {
        margin-left: 10px;
        height: 30px;
        line-height: 30px;
        font-size: 15px;
        font-weight: 700;
    }

    span:nth-child(3) {
        margin-left: 8px;
        height: 30px;
        line-height: 30px;
        font-size: 12px;
        color: rgb(122, 119, 119);
    }
}

.rcThird {
    margin-top: 30px;

    .rcCard {
        margin-bottom: 40px;

        div:nth-child(1) {
            width: 100%;
            height: 20px;

            div:nth-child(1) {
                margin-left: 20px;
                width: 75%;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                font-size: 15px;
            }

            div:nth-child(2) {
                margin-left: 20px;
                width: 75%;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                font-size: 10px;
                color: rgb(122, 119, 119);
            }
        }

        .rcIcon {
            float: right;
            transform: translateY(-50%);
            margin-right: 15px;
            font-size: 20px;
        }
    }
}
</style>
