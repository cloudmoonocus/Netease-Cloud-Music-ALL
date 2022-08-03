<template>
    <!-- 登录使用二维码登录，手机号登录可能会显示登录有风险 -->
    <router-view />
    <!-- 登陆主界面 -->
    <div class="out" v-if="$route.path == '/index'">
        <i class="iconfont icon-wangyiyunyinyueclick logo"></i>
        <div class="bottom">
            <div class="qr" @click="$router.push('/index/qrsignin')">
                <Icon name="enlarge" class="first" />
                <div>二维码登录</div>
            </div>
            <div class="phone" @click="$router.push('/index/phonesignin')">
                <Icon name="phone-circle" class="first" />
                <div>手机登录</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Icon } from 'vant';
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

        .qr {
            .first {
                margin-left: 50%;
                transform: translateX(-50%);
            }

            div:nth-child(2) {
                font-size: 15px;
            }
        }

        .phone {
            .first {
                margin-left: 50%;
                transform: translateX(-50%);
            }

            div:nth-child(2) {
                font-size: 15px;
            }
        }
    }
}
</style>
