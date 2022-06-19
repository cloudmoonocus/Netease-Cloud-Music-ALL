<template>
    <!-- 顶部 -->
    <Sticky :offset-top="0" v-if="$route.meta.activeHeader">
        <Nav-bar :title="title">
            <template #left>
                <Icon @click="show = true;" name="wap-nav" size="25" style="color: #e60026" />
            </template>
            <template #right>
                <Icon name="search" size="25" style="color: #e60026" @click="$router.push('/search')" />
            </template>
        </Nav-bar>
    </Sticky>
    <!-- 侧边栏 -->
    <Popup v-model:show="show" position="left" :style="{ height: '100%', width: '80%', float: 'left' }"
        class="van-popup">
        <div class="headDiv" @click="goSignIn">
            <van-image round width="35px" height="35px" :src="avatarUrl" fit="cover" position="left"
                class="van-image" />
            <span class="headSpan">{{ nickname }}</span>
            <Icon name="arrow" class="head-van-icon" />
        </div>
        <br />
        <Cell-group inset>
            <Cell title="&nbsp;我的消息" icon="chat-o" is-link />
            <Cell title="&nbsp;云贝中心" icon="cash-back-record" is-link />
            <Cell title="&nbsp;创作者中心" icon="bulb-o" is-link />
        </Cell-group>
        <br />
        <Cell-group inset>
            <Cell title="音乐服务" />
            <Cell title="&nbsp;云村有票" icon="description" is-link />
            <Cell title="&nbsp;商城" icon="shopping-cart-o" is-link />
            <Cell title="&nbsp;Beat交易平台" icon="shop-o" is-link />
            <Cell title="&nbsp;游戏专区" icon="award-o" is-link />
            <Cell title="&nbsp;口袋彩铃" icon="phone-circle-o" is-link />
        </Cell-group>
        <br />
        <Cell-group inset>
            <Cell title="其他" />
            <Cell title="&nbsp;设置" icon="setting-o" is-link />
            <Cell title="&nbsp;夜间模式" icon="closed-eye" is-link>
                <template #right-icon>
                    <Switch v-model="checked" size="24" />
                </template>
            </Cell>
            <Cell title="&nbsp;定时关闭" icon="underway-o" is-link />
            <Cell title="&nbsp;个性装扮" icon="contact" is-link />
            <Cell title="&nbsp;边听边存" icon="down" is-link />
            <Cell title="&nbsp;在线听歌免流量" icon="debit-pay" is-link />
            <Cell title="&nbsp;音乐黑名单" icon="close" is-link />
            <Cell title="&nbsp;青少年模式" icon="certificate" is-link />
            <Cell title="&nbsp;音乐闹钟" icon="tosend" is-link />
        </Cell-group>
        <br />
        <Cell-group inset>
            <Cell title="&nbsp;我的订单" icon="records" is-link />
            <Cell title="&nbsp;优惠券" icon="coupon-o" is-link />
            <Cell title="&nbsp;我的客服" icon="exchange" is-link />
            <Cell title="&nbsp;分享网易云音乐" icon="share-o" is-link />
            <Cell title="&nbsp;个人信息收集和使用清单" icon="warning-o" is-link />
            <Cell title="&nbsp;个人信息第三方共享清单" icon="browsing-history-o" is-link />
            <Cell title="&nbsp;个人信息与隐私保护" icon="cart-o" is-link />
            <Cell title="&nbsp;关于" icon="info-o" is-link />
        </Cell-group>
        <br />
        <Cell-group inset>
            <Cell center style="color: #e60026" title="退出登录/关闭" @click="logOut" />
        </Cell-group>
        <br />
    </Popup>
</template>

<script setup>
import { Icon, Sticky, NavBar, Popup, Cell, CellGroup, ConfigProvider, Switch, Toast, Dialog } from 'vant';
import { Image as VanImage } from 'vant';
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { reqLogOut, reqSignInState } from '@/Api';
import router from '@/routers';
const route = useRoute();

// 顶部标题
const title = ref('网易云音乐');
// 改变顶部标题
watch(route, () => {
    title.value = route.meta.title;
});
// 控制展示侧边栏
const show = ref(false);
// 侧边栏的名称和头像
const nickname = ref('');
const avatarUrl = ref('');
onMounted(async () => {
    let stateResult = await reqSignInState();
    if (stateResult.data.code === 200) {
        nickname.value = stateResult.data.profile.nickname;
        avatarUrl.value = stateResult.data.profile.avatarUrl;
    }
})
// 跳转登录界面
function goSignIn() {
    if (localStorage.getItem('cookie')) {
        Dialog.alert({
            message: '💖💖未制作个人主页💖💖',
            theme: 'round-button',
        })
    } else {
        router.push('/index');
        show = false;
    }
}
// 控制开关夜间模式（样式作用，无任何作用）
const checked = ref(false);
// 退出登录
async function logOut() {
    let logOutResult = await reqLogOut();
    if (logOutResult.code === 200) {
        localStorage.removeItem('cookie');
        Toast.success('退出成功');
    }
}

</script>

<style lang="less" scoped>
.headDiv {
    display: flex;

    .van-image {
        margin: 10px 10px;
    }

    .headSpan {
        font-size: 20px;
        margin-top: 12px;
    }

    .head-van-icon {
        font-size: 24px;
        margin-top: 14px;
    }
}
</style>
