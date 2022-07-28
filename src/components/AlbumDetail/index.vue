<template>
    <Popup v-model:show="albumShow" :style="{ height: '100%', width: '100%', backgroundColor: '#fff' }" duration="0.1"
        :overlay="false" transition-appear close-on-popstate class="popup" v-if="musicListShow">
        <div class="outTop">
            <NavBar left-arrow @click-left="closeAlbumDetail" class="nav">
                <template #left>
                    <Icon name="arrow-left" size="20" style="color: #fff" />
                    <span style="margin-left: 15px">歌单</span>
                </template>
            </NavBar>
            <div class="top">
                <img :src="listData.albumInfor.coverImgUrl" :alt="listData.albumInfor.name" />
                <div class="right">
                    <div>{{ listData.albumInfor.name }}</div>
                    <div>
                        <img :src="listData.albumInfor.creator.avatarUrl" :alt="listData.albumInfor.creator.nickname" />
                        <span>{{ listData.albumInfor.creator.nickname }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="list">
            <div class="middle">
                <div>
                    <Icon name="shop-collect-o" class="iconMiddle" /><span>{{
                            formatNumber(listData.albumInfor.subscribedCount)
                    }}</span>
                </div>
                <span>|</span>
                <div>
                    <Icon name="chat-o" class="iconMiddle" /><span>{{
                            formatNumber(listData.albumInfor.commentCount)
                    }}</span>
                </div>
                <span>|</span>
                <div>
                    <Icon name="share-o" class="iconMiddle" /><span>{{
                            formatNumber(listData.albumInfor.shareCount)
                    }}</span>
                </div>
            </div>
            <!-- 播放全部 -->
            <div class="playAll">
                <Icon name="play-circle"
                    style="color: #e60026; font-size: 30px; margin-left: 15px; line-height: 30px" />
                <span>播放全部</span>
            </div>
            <!-- 歌曲列表 -->
            <div class="musicList">
                <div class="card" v-for="data in listData.albumlist" :key="data.id">
                    <van-image width="55" height="55" :src="data.al.picUrl" :alt="data.name" class="cardImage"
                        radius="10">
                        <template v-slot:loading>
                            <van-loading type="spinner" size="20" />
                        </template>
                    </van-image>
                    <div>{{ data.name }}</div>
                    <span>{{ data.ar[0].name }}</span>
                    <Icon name="more-o" class="more-o" @click="popupShow(data.id)" />
                </div>
            </div>
        </div>
    </Popup>
    <MusicOperate :show="popupShowVal" :id="musicId" v-if="popupOutShow" @closePopup="closeOutPopup" />
</template>

<script setup>
import { Popup, NavBar, Icon } from 'vant';
import { Image as VanImage } from 'vant';
import { ref, watch } from 'vue';
import { formatNumber } from '@/plugins/DigitalConverter';
import MusicOperate from '@/components/MusicOperatePopup'
import list from '@/store/List';
const listData = list();

const albumShow = ref(false);
const musicListShow = ref(false);
const backgroundImage = ref();

const props = defineProps({
    show: Boolean,
});

const emits = defineEmits(['changeAlbumInShow']);

watch(props, () => {
    albumShow.value = props.show;
});

watch(
    () => listData.albumlist,
    () => {
        backgroundImage.value = 'url(' + listData.albumInfor.coverImgUrl + ')';
        musicListShow.value = true;
    }
);

// 点击摁钮关闭
function closeAlbumDetail() {
    albumShow.value = false;
    emits('changeAlbumInShow', albumShow.value);
}

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
.popup {
    .outTop {
        height: 32%;

        .nav {
            color: #fff;
            background-color: rgba(0, 0, 0, 0);
            border-bottom: none;
        }

        &::after {
            position: absolute;
            height: 30%;
            width: 100%;
            border-radius: 0 0 35px 35px;
            top: 0;
            z-index: -1;
            background: v-bind(backgroundImage);
            background-size: cover;
            content: '';
            filter: blur(10px);
        }

        .top {
            width: 90%;
            height: 100px;
            margin: 0 auto;
            margin-top: 15px;

            img:nth-child(1) {
                float: left;
                width: 100px;
                height: 100px;
                border-radius: 10px;
            }

            .right {
                float: left;
                width: 67%;
                padding-top: 13px;
                margin-left: 3%;

                div:nth-child(1) {
                    letter-spacing: 3px;
                    font-size: 15px;
                    font-weight: 400;
                    color: #fff;
                    overflow: hidden;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                }

                div:nth-child(2) {
                    height: 25px;
                    margin-top: 10px;
                    line-height: 25px;

                    img:nth-child(1) {
                        float: left;
                        height: 25px;
                        width: 25px;
                    }

                    span:nth-child(2) {
                        float: left;
                        margin-left: 7px;
                        height: 25px;
                        width: 160px;
                        font-size: 10px;
                        overflow: hidden;
                        display: -webkit-box;
                        -webkit-line-clamp: 1;
                        -webkit-box-orient: vertical;
                        color: #ccc;
                    }
                }
            }
        }
    }

    .list {
        border-top: 1px #000;

        .middle {
            top: 30%;
            position: absolute;
            display: flex;
            justify-content: space-evenly;
            width: 65%;
            left: 50%;
            transform: translateX(-50%);
            border-radius: 15px;
            background-color: #fff;
            box-shadow: 0px 2px 10px #ccc;
            line-height: 30px;
            font-size: 12px;

            .iconMiddle {
                margin-right: 5px;
            }
        }

        .playAll {
            display: flex;
            margin-top: 35px;
            height: 30px;

            span:nth-child(2) {
                margin-left: 15px;
                height: 30px;
                line-height: 30px;
                font-size: 15px;
                font-weight: 700;
            }
        }

        .musicList {
            margin-top: 20px;

            .card {
                position: relative;
                height: 80px;

                .cardImage {
                    position: absolute;
                    margin-left: 15px;
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
                    color: rgb(161, 159, 159);
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

                .more-o {
                    position: absolute;
                    top: 10px;
                    right: 20px;
                    color: rgb(122, 119, 119);
                }
            }
        }
    }
}
</style>
