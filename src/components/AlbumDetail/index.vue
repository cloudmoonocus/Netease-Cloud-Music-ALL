<template>
    <Popup
        v-model:show="albumShow"
        :style="{ height: '100%', width: '100%', backgroundColor: '#fff' }"
        duration="0.1"
        :overlay="false"
        transition-appear
        close-on-popstate
        class="popup"
    >
        <div class="outTop">
            <NavBar left-arrow @click-left="closeAlbumDetail" class="nav">
                <template #left>
                    <Icon name="arrow-left" size="20" style="color: #fff" />
                    <span style="margin-left: 15px">歌单</span>
                </template>
            </NavBar>
            <div class="top">
                <img
                    src="https://p2.music.126.net/yRM8cp2DVTNOZPZpoWe98g==/109951164444465905.jpg?param=140y140"
                    alt=""
                />
                <div class="right">
                    <div>【翻唱】好听的歌都没有完整版</div>
                    <div>
                        <img
                            src="https://p1.music.126.net/Zsomx4T9sIcmHbUhUoLFYg==/109951167480093327.jpg?param=180y180"
                            alt=""
                        />
                        <span>氟西汀终究还是没了丶</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="list">
            <div class="middle">
                <div><Icon name="shop-collect-o" class="iconMiddle" /><span>8242</span></div>
                <span>|</span>
                <div><Icon name="chat-o" class="iconMiddle" /><span>8242</span></div>
                <span>|</span>
                <div><Icon name="share-o" class="iconMiddle" /><span>8242</span></div>
            </div>
            <!-- 播放全部 -->
            <div class="playAll">
                <Icon
                    name="play-circle"
                    style="color: #e60026; font-size: 30px; margin-left: 15px; line-height: 30px"
                />
                <span>播放全部</span>
            </div>
            <!-- 歌曲列表 -->
            <div class="musicList">
                <div class="card" v-for="dailyRecMusics in foundData.dailyRcMusic">
                    <van-image
                        width="55"
                        height="55"
                        :src="dailyRecMusics.al.picUrl"
                        :alt="dailyRecMusics.name"
                        class="cardImage"
                        radius="10"
                    >
                        <template v-slot:loading>
                            <van-loading type="spinner" size="20" />
                        </template>
                    </van-image>
                    <div>{{ dailyRecMusics.name }}</div>
                    <span>{{ dailyRecMusics.ar[0].name }}</span>
                    <Icon name="more-o" class="more-o" />
                </div>
            </div>
        </div>
    </Popup>
</template>

<script setup>
import { Popup, NavBar, Icon } from 'vant';
import { Image as VanImage } from 'vant';
import { ref, watch } from 'vue';
import { found } from '@/store/Found';
const foundData = found();
foundData.getDailyRcMusic();

const albumShow = ref(false);

const props = defineProps({
    show: Boolean,
});

const emits = defineEmits(['changeAlbumInShow']);

watch(props, () => {
    albumShow.value = props.show;
});

// 点击摁钮关闭
function closeAlbumDetail() {
    albumShow.value = false;
    emits('changeAlbumInShow', albumShow.value);
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
            background: url(https://p2.music.126.net/yRM8cp2DVTNOZPZpoWe98g==/109951164444465905.jpg?param=140y140);
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
            font-size: 15px;

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
