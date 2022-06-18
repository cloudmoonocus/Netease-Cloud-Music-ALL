<template>
    <!-- 登录只做了手机号登录 -->
    <router-view />
    <!-- 登陆主界面 -->
    <div class="out" v-if="$route.path == '/index'">
        <i class="iconfont icon-wangyiyunyinyueclick logo"></i>
        <div class="bottom">
            <div class="phone" @click="$router.push('/index/phonesignin')">
                <Icon name="phone-circle" class="first" />
                <div>手机登录</div>
            </div>
            <div class="tourist">
                <Icon name="friends" class="first" @click="friendsSignIn" />
                <div>游客访问</div>
            </div>
        </div>
        <div class="infor">
            <div>登录接口为官方提供</div>
            <div>您在此输入的信息不会发送给任何个人</div>
            <div>仅用于该项目获取您的软件用户信息</div>
            <div>Made By Cloudmoon</div>
        </div>
    </div>
</template>

<script setup>
import { Icon } from 'vant'
import { reqFriendsSignIn } from '@/Api'
import router from '@/routers';

// 游客登录
async function friendsSignIn() {
    let friendsSignResult = await reqFriendsSignIn();
    if (friendsSignResult.code === 200) {
        router.push('/found')
        console.log(friendsSignResult.cookie);
    }
}
</script>

<style lang="less" scoped>
.out {
    height: 100vh;
    background-color: #db2b1e;

    .logo {
        display: inline-block;
        margin-left: 50%;
        transform: translateX(-50%);
        margin-top: 25%;
        width: 90px;
        height: 90px;
        background-color: #f32a25;
        border-radius: 45px;
        text-align: center;
        font-size: 70px;
        color: #fff;
    }

    .bottom {
        display: flex;
        justify-content: space-around;
        width: 80%;
        margin: 0 auto;
        margin-top: 70%;
        font-size: 45px;
        color: #fff;

        .phone {
            .first {
                margin-left: 50%;
                transform: translateX(-50%);
            }

            div:nth-child(2) {
                font-size: 15px;
            }
        }

        .tourist {
            .first {
                margin-left: 50%;
                transform: translateX(-55%);
            }

            div:nth-child(2) {
                font-size: 15px;
            }
        }
    }

    .infor {
        position: fixed;
        bottom: 5px;
        left: 50%;
        transform: translateX(-50%);
        text-align: center;
        font-size: 8px;
    }

}
</style>