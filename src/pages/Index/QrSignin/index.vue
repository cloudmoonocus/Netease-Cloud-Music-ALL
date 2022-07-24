<template>
    <div class="out">
        <qrcode-vue :value="data.qrUrl" :size="data.size" level="H" v-if="qrRefresh" class="qr" />
    </div>
</template>

<script setup>
import { reqQrKey, reqQrCreateImg, reqQrTime } from '@/Api';
import { onMounted, reactive, ref } from 'vue';
import QrcodeVue from 'qrcode.vue';
import { Dialog, Notify, Toast } from 'vant';
import router from '@/routers';

let timer;
const data = reactive({
    qrUrl: null,
    size: 200,
    key: null,
});
const qrRefresh = ref(false);

onMounted(async () => {
    Dialog.alert({
        title: '温馨提示',
        message: '二维码扫描后存在延迟，等待几分钟后显示授权成功后即可。若没有自动跳转，刷新页面即可',
    });
    getQrImg();
});

async function getQrImg() {
    const keyResult = await reqQrKey();
    if (keyResult.code === 200) {
        data.key = keyResult.data.unikey;
        const imgResult = await reqQrCreateImg(data.key);
        if (imgResult.code === 200) {
            data.qrUrl = imgResult.data.qrurl;
            qrRefresh.value = true;
        }
    }
}

timer = setInterval(async () => {
    const statusResult = await reqQrTime(data.key);
    if (statusResult.code === 800) {
        Dialog.alert({
            message: '二维码已过期，点击确认重新获取',
        }).then(() => {
            qrRefresh.value = false;
            getQrImg();
        });
    } else if (statusResult.code === 803) {
        clearInterval(timer);
        Notify({ type: 'success', message: '授权登录成功' });
        localStorage.setItem('cookie', statusResult.cookie);
        router.push('/found');
    } else if (statusResult.code === 802) {
        Toast.success('扫码成功，等待确认');
    }
}, 3000);
</script>

<style lang="less" scoped>
.out {
    background-color: #fff;
    height: 100vh;

    .qr {
        margin-left: 50%;
        transform: translateX(-50%);
        margin-top: 50%;
    }
}
</style>
