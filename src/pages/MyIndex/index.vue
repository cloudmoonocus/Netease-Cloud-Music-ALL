<template>
    <!-- “我的”页面有 “最近播放（歌曲）” “已购（单曲）” “我的好友（关注）（粉丝）” “收藏（无：声音、K歌、直播）”界面 -->
    <router-view />
    <MyLoading v-if="$route.path == '/myindex'" v-show="outShow" />
    <transition name="van-fade">
        <div v-if="$route.path == '/myindex'" v-show="inShow">
            <div v-if="Object.keys(myindexData.userInfor).length">
                <!-- 主页头部 -->
                <div class="myHead">
                    <van-image :src="myindexData.userInfor.profile.avatarUrl" radius="50" height="75" width="75"
                        class="headImage" />
                    <div class="headName">{{ myindexData.userInfor.profile.nickname }}</div>
                    <div class="headInfor">
                        {{ myindexData.userInfor.followNum }} 关注 | {{ myindexData.userInfor.fansNum }} 粉丝
                        | Lv.{{ myindexData.userInfor.LV }}
                    </div>
                </div>
                <!-- 功能列表 -->
                <div class="second">
                    <Grid :gutter="5" class="grid" icon-size="25px" column-num="4">
                        <Grid-item v-for="value in grids" :key="value.id" :icon="value.icon" :text="value.text"
                            :to="value.path" :class="{ gridIn: value.show, gridInNO: !value.show }" />
                    </Grid>
                </div>
                <!-- 喜欢的音乐 -->
                <div class="third">
                    <img src="@/assets/images/myIndex/like.jpeg" alt="喜欢的音乐" />
                    <div>我喜欢的音乐</div>
                    <div v-if="Object.keys(myindexData.likeMusic).length">
                        {{ myindexData.likeMusic.ids.length }}首
                    </div>
                    <div v-if="!Object.keys(myindexData.likeMusic).length">0首</div>
                    <div>
                        <Icon name="like" />
                        <span>心动模式</span>
                    </div>
                </div>
                <!-- 创建歌单/收藏歌单 -->
                <Tabs v-if="judge" style="margin-top: 5px" scrollspy sticky background="#eee" line-height="8px"
                    :lazy-render="false" offset-top="45px" ref="tabs">
                    <Tab title="创建歌单">
                        <!-- 创建歌单 -->
                        <div class="fourth">
                            <div>
                                <span>创建歌单({{ myindexData.likeListCreate.length }}个)</span>
                                <Icon name="plus" class="plus" @click="isCreateShow" />
                            </div>
                            <div>
                                <!-- 歌单 -->
                                <div class="card" v-for="value in myindexData.likeListCreate"
                                    @click.stop="changeAlbumShow(value.id)" :key="value.id">
                                    <img :src="value.coverImgUrl" :alt="value.name" />
                                    <div>{{ value.name }}</div>
                                    <div>{{ value.trackCount }}首</div>
                                    <div>
                                        <Icon name="more-o" @click.stop="isMoreShow(value.name, value.id)" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Tab>
                    <Tab title="收藏歌单">
                        <!-- 收藏歌单 -->
                        <div class="fourth">
                            <div>
                                <span>收藏歌单({{ myindexData.likeListCollect.length }}个)</span>
                            </div>
                            <div>
                                <!-- 歌单 -->
                                <div class="card" v-for="value in myindexData.likeListCollect"
                                    @click.stop="changeAlbumShow(value.id)" :key="value.id">
                                    <img :src="value.coverImgUrl" :alt="value.name" />
                                    <div>{{ value.name }}</div>
                                    <div>{{ value.trackCount }}首</div>
                                    <div>
                                        <Icon name="more-o" @click.stop="isMoreShow(value.name, value.id)" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Tab>
                </Tabs>
                <AlbumDetail :show="albumShow" @changeAlbumInShow="changeAlbumOutShow" />
                <!-- 创建歌单弹出层 -->
                <Action-sheet v-model:show="createShow" title="创建音乐歌单">
                    <Cell-group inset>
                        <Field v-model.trim="newMusicList" placeholder="输入新建歌单标题名" maxlength="40" clearable required
                            autofocus />
                        <Checkbox-group v-model="checked">
                            <!-- 共享歌单需要会员，于是直接禁用了 -->
                            <Checkbox name="shareList" class="checked" checked-color="#e60026" disabled
                                style="text-decoration: line-through">设置为共享歌单（和好友一起管理）
                                <Tag round type="danger">限免30天</Tag>
                            </Checkbox>
                            <Checkbox :name="10" class="checked" checked-color="#e60026">设置为私密歌单</Checkbox>
                        </Checkbox-group>
                        <Button round type="primary" size="large" class="submitList" color="#e60026"
                            @click="createList">完成创建</Button>
                    </Cell-group>
                </Action-sheet>
                <!-- 歌单操作 -->
                <Action-sheet v-model:show="moreShow" :title="moreName">
                    <Button size="large" color="#fff" style="color: #000" icon="share-o" type="primary"
                        @click="isShare">
                        分享
                    </Button>
                    <Button size="large" color="#fff" style="color: #000; margin-bottom: 10px" icon="delete-o"
                        type="primary" @click="deleteList">
                        删除
                    </Button>
                </Action-sheet>
                <!-- 分享弹出层 -->
                <Share-sheet v-model:show="showShare" title="立即分享" :options="options" style="background-color: #fff" />
                <!-- 底部 -->
                <Tip />
                <!-- 防止底部遮挡 -->
                <div style="height: 60px; width: 100%"></div>
            </div>
        </div>
    </transition>
</template>

<script setup>
import {
    Grid,
    GridItem,
    Swipe,
    SwipeItem,
    Icon,
    Divider,
    ActionSheet,
    Field,
    CellGroup,
    Checkbox,
    CheckboxGroup,
    Tag,
    Button,
    ShareSheet,
    Dialog,
    Notify,
    Toast,
    Tab,
    Tabs,
} from 'vant';
import { Image as VanImage } from 'vant';
import Tip from '@/components/Tip';
import { nextTick, ref, watch } from 'vue';
import { reqCreateList, reqDeleteList } from '@/Api';
import { getAlbumList } from '@/plugins/ClickAlbum';
import myindex from '@/store/MyIndex';
import AlbumDetail from '@/components/AlbumDetail';
const myindexData = myindex();

const outShow = ref(true);
const inShow = ref(false);
const tabs = ref();

watch(
    () => myindexData.isOk,
    () => {
        if (myindexData.isOk) {
            outShow.value = false;
            tabs.value.resize();
            inShow.value = true;
        }
    }
);

// 获取用户信息
myindexData.getUserInfor();

// 功能列表
const grids = [
    { id: 1, icon: 'play-circle', text: '最近播放', path: '/myindex/rencently', show: true },
    { id: 2, icon: 'graphic', text: '本地/下载', path: '/myindex/local-download', show: false },
    { id: 3, icon: 'live', text: '云盘', path: '/myindex/cloudpan', show: false },
    { id: 4, icon: 'shop-collect', text: '已购', path: '/myindex/buy', show: true },
    { id: 5, icon: 'manager', text: '我的好友', path: '/myindex/friends', show: true },
    { id: 6, icon: 'like', text: '收藏和赞', path: '/myindex/collection-praise', show: true },
    { id: 7, icon: 'audio', text: '我的播客', path: '/myindex/index-podcast', show: false },
    { id: 8, icon: 'new', text: '音乐罐子', path: '/myindex/musicbottle', show: false },
];

// 判断展示歌单操作的弹出框
const moreShow = ref(false);
const moreName = ref();
const moreId = ref();
function isMoreShow(name, id) {
    moreShow.value = !moreShow.value;
    moreName.value = name;
    moreId.value = id;
}

// 点击分享摁钮的操作
const showShare = ref(false);
function isShare() {
    moreShow.value = false;
    showShare.value = true;
}

// 分享的图片和文字
const options = [
    [
        { name: '复制链接', icon: 'link' },
        { name: '微信', icon: 'wechat' },
        { name: '朋友圈', icon: 'wechat-moments' },
        { name: '微博', icon: 'weibo' },
        { name: 'QQ', icon: 'qq' },
    ],
];

const judge = ref(true);
// 删除歌单
function deleteList() {
    moreShow.value = false;
    Dialog.confirm({
        title: 'WARM PROMPT',
        message: '确定要删除此歌单吗?',
    })
        .then(async () => {
            // 确认的调用
            let deleteResult = await reqDeleteList(moreId.value);
            if (deleteResult.code === 200) {
                Notify({ type: 'success', message: '🔔删除成功！', color: '#fff', background: '#e60026' });
                judge.value = false;
                myindexData.getUserInfor();
                judge.value = true;
            }
        })
        .catch(() => {
            // 取消的调用
            moreName = '';
            moreId.value = '';
        });
}

// 判断展示创建歌单的弹出框
const createShow = ref(false);
function isCreateShow() {
    createShow.value = !createShow.value;
}
// 新歌单的名字
const newMusicList = ref('');
// 新歌单的选项(只要和选择框的name属性相同就为选中)
const checked = ref(['no', '']);
// 创建歌单
async function createList() {
    if (newMusicList.value === '') {
        Toast.fail('请输入歌单名');
    } else {
        let createListResult = await reqCreateList(newMusicList.value, checked.value[2]);
        if (createListResult.code === 200) {
            Notify({ type: 'success', message: '创建成功' });
            createShow.value = false;
            newMusicList.value = '';
            checked.value[1] = 0;
            judge.value = false;
            myindexData.getUserInfor();
            judge.value = true;
        }
    }
}

const albumShow = ref(false);
// 展示歌单详情
function changeAlbumShow(id) {
    getAlbumList(id);
    albumShow.value = true;
}
function changeAlbumOutShow(value) {
    albumShow.value = value;
}
</script>

<style lang="less" scoped>
.myHead {
    position: relative;
    margin: 0 auto;
    margin-top: 40px;
    border-radius: 10px;
    width: 90%;
    height: 110px;
    background-color: #fff;

    .headImage {
        position: absolute;
        margin: 0 auto;
        top: -30%;
        left: 50%;
        transform: translateX(-50%);
    }

    .headName {
        position: absolute;
        top: 50px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 15px;
        font-weight: 700;
    }

    .headInfor {
        position: absolute;
        top: 80px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 10px;
        color: rgb(122, 119, 119);
    }
}

.second {
    .grid {
        margin: 0 auto;
        margin-top: 10px;
        width: 92%;
    }

    .gridIn {
        color: #e60026;
    }

    .gridInNO {
        color: #e60026;
        text-decoration: line-through;
    }
}

.third {
    position: relative;
    margin: 0 auto;
    margin-top: 10px;
    height: 90px;
    width: 90%;
    background-color: #fff;
    border-radius: 10px;

    img:nth-child(1) {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        margin-left: 15px;
        height: 60px;
        border-radius: 10px;
    }

    div:nth-child(2) {
        position: absolute;
        top: 30%;
        left: 85px;
        font-size: 15px;
    }

    div:nth-child(3) {
        position: absolute;
        top: 52%;
        left: 85px;
        font-size: 10px;
        font-weight: 700;
        color: rgb(122, 119, 119);
    }

    div:nth-child(4) {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 10px;
        border: #eee solid 1px;
        padding: 3px;
        width: 70px;
        border-radius: 10px;
        font-size: 13px;
    }
}

.fourth {
    margin: 0 auto;
    margin-top: 10px;
    padding-top: 15px;
    border-radius: 10px;
    width: 90%;
    background-color: #fff;

    div:nth-child(1)::after {
        content: '';
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
    }

    div:nth-child(1) {
        font-size: 13px;
        color: rgb(122, 119, 119);

        span {
            float: left;
            margin-left: 15px;
        }

        .plus {
            float: right;
            font-size: 23px;
            margin-right: 10px;
        }

        .more-o {
            float: right;
            font-size: 22px;
            margin-right: 15px;
        }
    }

    div:nth-child(2) {
        .card {
            position: relative;
            height: 90px;

            img:nth-child(1) {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                margin-left: 15px;
                height: 60px;
                border-radius: 10px;
            }

            div:nth-child(2) {
                position: absolute;
                top: 30%;
                left: 85px;
                width: 200px;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                font-size: 15px;
                color: #000;
            }

            div:nth-child(3) {
                position: absolute;
                top: 52%;
                left: 85px;
                font-size: 10px;
                font-weight: 700;
                color: rgb(122, 119, 119);
            }

            div:nth-child(4) {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                right: 10px;
                font-size: 22px;
                color: rgb(122, 119, 119);
            }
        }
    }
}

.checked {
    margin-top: 10px;
    margin-left: 10px;
    font-size: 13px;
}

.submitList {
    margin-top: 15px;
    margin-bottom: 20px;
    width: 50%;
    height: 43px;
    margin-left: 50%;
    transform: translateX(-50%);
}

.showShare {
    background-color: #fff;
}
</style>
