<template>
    <div style="background-color: #fff">
        <Tabs>
            <Tab title="关注">
                <div class="out" v-if="myindexData.userInfor.followNum">
                    <div class="card" v-for="value in myindexData.followList" :key="value.userId">
                        <img :src="value.avatarUrl" :alt="value.nickname">
                        <div class="name">{{ value.nickname }}</div>
                    </div>
                </div>
                <div v-if="!myindexData.userInfor.followNum" style="height: 86vh; background-color:#fff;">
                    <Empty image="error" description="暂无关注" />
                </div>
            </Tab>
            <Tab title="粉丝">
                <Notice-bar color="#1989fa" background="#ecf9ff" left-icon="info-o">
                    由于网易限制，取消关注必须验证手机，但没有提供验证码接口，因此取消关注的状态码为400，也就是说在本网站无法取消关注
                </Notice-bar>
                <Notice-bar color="#1989fa" background="#ecf9ff" left-icon="info-o">
                    关注次数过多也会触发验证码，总的来说不推荐在此页操作
                </Notice-bar>
                <div v-if="judge">
                    <div class="out" v-if="myindexData.userInfor.fansNum">
                        <div class="fanCard" v-for="value in myindexData.fansList">
                            <img :src="value.avatarUrl" :alt="value.nickname">
                            <div class="middle">
                                <div class="name">{{ value.nickname }}</div>
                                <div class="intro">{{ value.signature }}</div>
                            </div>
                            <div :class="{ huiguan: !value.followed }" v-if="!value.followed"
                                @click="follow(value.userId)">
                                + 回关
                            </div>
                            <div :class="{ huguan: value.followed }" v-if="value.followed"
                                @click="cancelFollow(value.userId)">
                                互相关注
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="!myindexData.userInfor.fansNum" style="height: 86vh; background-color:#fff;">
                    <Empty image="error" description="暂无粉丝" />
                </div>
            </Tab>
        </Tabs>
    </div>
</template>

<script setup>
import { Tab, Tabs, Empty, Notify, NoticeBar } from 'vant';
import { reqIsFollow } from '@/Api';
import myindex from '@/store/MyIndex';
import { nextTick, ref } from 'vue';
const myindexData = myindex();

const judge = ref(true);
console.error(judge.value);

// 关注/取消关注
async function follow(id) {
    let followResult = await reqIsFollow(id, 1);
    if (followResult.code === 200) {
        Notify({ type: 'success', message: '关注成功' });
        judge.value = false;
        console.error(judge.value);
        myindexData.getUserInfor();
        nextTick();
        judge.value = true;
        console.error(judge.value);
    }
}
async function cancelFollow(id) {
    let followResult = await reqIsFollow(id, 0);
    if (followResult.code === 200) {
        Notify({ type: 'success', message: '取消关注成功' });
    }
}


</script>

<style lang="less" scoped>
.out {
    padding-top: 5px;
    margin-left: 25px;
    padding-bottom: 15px;

    .card {
        margin-top: 20px;
        width: 100%;
        height: 60px;

        img {
            float: left;
            height: 60px;
            width: 60px;
            border-radius: 30px;
        }

        div {
            float: left;
            margin-left: 20px;
            line-height: 60px;
            font-size: 15px;
        }
    }

    .fanCard {
        margin-top: 20px;
        width: 100%;
        height: 60px;

        img {
            float: left;
            width: 60px;
            height: 60px;
            border-radius: 30px;
        }

        .middle {
            float: left;
            width: 50%;
            margin-top: 15px;
            margin-left: 15px;

            .name {
                width: 80%;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                font-size: 15px;
            }

            .intro {
                width: 80%;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                font-size: 12px;
                color: rgb(122, 119, 119);
            }
        }

        .huiguan {
            float: right;
            padding: 5px 10px;
            margin-top: 15px;
            margin-right: 15px;
            border: 1px solid #e60026;
            border-radius: 10px;
            font-size: 12px;
            color: #e60026;
        }

        .huguan {
            float: right;
            padding: 5px 8px;
            margin-top: 15px;
            margin-right: 15px;
            border: 1px solid rgb(122, 119, 119);
            border-radius: 10px;
            font-size: 12px;
            color: rgb(122, 119, 119);
        }
    }
}
</style>
