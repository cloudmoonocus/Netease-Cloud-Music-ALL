<template>
    <!-- 输入手机号页面 -->
    <div class="phoneOut" style="background-color: #fff; height:97vh" v-show="loginShow">
        <div>登录体验更多精彩</div>
        <div>未注册手机号登录后将自动创建账号</div>
        <Field v-model.trim="tel" clearable clear-icon="cross" placeholder="请输入手机号(仅支持+86)" maxlength="11"
            class="phoneInput" />
        <Button type="primary" size="large" round color="#e60026" class="phoneButton" @click="next">下一步</Button>
    </div>
    <!-- 输入验证码页面 -->
    <div class="verificationCode" style="background-color: #fff; height:100vh" v-show="!loginShow">
        <div class="please">请输入验证码</div>
        <div class="sendGroup">
            <div class="send">已发送至+86&nbsp;{{ proTel }}</div>
            <span class="resetSend" v-show="countDown != 0">重新发送{{ countDown }}s</span>
            <span class="resetSend" v-show="countDown === 0" @click="resetSend">重新发送</span>
        </div>
        <password-input :value="verificationValue" :gutter="10" :focused="showKeyboard" :mask="false" :length="4"
            @focus="showKeyboard = true" class="password-input" />
        <Button type="primary" size="large" round color="#e60026" class="submit" @click="submit">提交</Button>
        <number-keyboard v-model="verificationValue" :show="showKeyboard" @blur="showKeyboard = false" />
    </div>
</template>

<script setup>
import { Field, Button, Toast, PasswordInput, NumberKeyboard, Notify } from "vant";
import { ref, watch } from "vue";
import { reqSignIn, reqIfPhoneExist, reqSignInFinal } from "@/Api";

// 获取输入的手机号
const tel = ref('');
// 获取展示手机号
const proTel = ref('');
// 利用正则表达式去除输入的非数字
watch(tel, () => {
    tel.value = tel.value.replace(/[^\d]/g, '')
});
// 倒计时时间
const time = 60;
// 发送验证码倒计时
const countDown = ref(time);
// 登录页是否渲染
const loginShow = ref(true);
// 定时器函数
function fcCountDown() {
    const countDownTime = setInterval(() => {
        --countDown.value;
        if (countDown.value === 0) {
            clearInterval(countDownTime);
        };
    }, 1000);
}
// 手机号的相关操作
async function next() {
    if (tel.value) {
        if (tel.value.length < 11) {
            Toast({
                message: '请输入11位的手机号',
            });
        } else {
            let ifPhoneResult = await reqIfPhoneExist(tel.value)
            if (ifPhoneResult.exist === 1) {
                const phoneResult = await reqSignIn(tel.value);
                if (phoneResult.code === 400 && phoneResult.message === '发送验证码超过限制:每个手机号一天只能发5条验证码') {
                    Notify({ type: 'danger', message: '🔔一个手机号每天最多能发送五次验证码' });
                } else if (phoneResult.code === 200) {
                    // 手机号中间变为星号
                    proTel.value = tel.value.replace(/(\d{3})\d*(\d{4})/, "$1****$2");
                    loginShow.value = false;
                    fcCountDown();
                }
            } else if (ifPhoneResult.exist === -1) {
                Notify({ type: 'danger', message: '🔔请先到网易云音乐官网注册' });
            }
        }
    } else {
        Toast({
            message: '请输入手机号',
        });
    }
};
// 重新发送二维码
async function resetSend() {
    countDown.value = time;
    let phoneResult = await reqSignIn(tel.value);
    if (phoneResult.code === 200) {
        fcCountDown();
    };
}
// 验证码输入的内容
const verificationValue = ref('');
// 提交验证码之后操作
async function submit() {
    const codeResult = await reqSignInFinal(tel.value, verificationValue.value);
    console.log(codeResult);
    if (codeResult.code === 200) {
        Toast.success('登录成功');
    } else {
        Toast.fail('登录失败');
    }
}
// 是否展示数字键盘
const showKeyboard = ref(true);

</script>

<style lang="less" scoped>
.phoneOut {
    padding: 20px;
    padding-bottom: 0;

    div:nth-child(1) {
        font-size: 20px;
    }

    div:nth-child(2) {
        margin-top: 5px;
        font-size: 15px;
        color: rgb(122, 119, 119);
    }

    .phoneInput {
        width: 95%;
        margin: 0 auto;
        margin-top: 5px;
        border-bottom: 1px solid rgb(122, 119, 119);
    }

    .phoneButton {
        height: 40px;
        margin-top: 30px;
    }
}

.verificationCode {

    .please {
        padding-top: 20px;
        margin-left: 20px;
        font-size: 20px;
    }

    .sendGroup {
        margin-top: 5px;
        margin-left: 20px;
        color: rgb(122, 119, 119);

        .send {
            font-size: 13px;
        }

        .resetSend:nth-child(2) {
            margin-top: 5px;
            font-size: 13px;
        }

        .resetSend:nth-child(3) {
            padding: 2px 5px;
            border-radius: 10px;
            margin-top: 5px;
            background-color: #e60026;
            font-size: 13px;
            color: #fff;
        }
    }

    .submit {
        width: 80%;
        margin-left: 50%;
        transform: translateX(-50%);
        height: 40px;
        margin-top: 30px;
    }

    .password-input {
        margin-top: 30px;
    }

}
</style>