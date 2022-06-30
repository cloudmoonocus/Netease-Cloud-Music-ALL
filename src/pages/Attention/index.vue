<template>
    <div class="head">
        <div class="allFriend" @click="allFriend">
            <Icon name="more-o" class="icon" />
            <span>全部好友</span>
        </div>
    </div>

    <div class="second">
        <span>我的关注</span>
        <s>朋友</s>
        <s>音乐人</s>
        <span>全部</span>
    </div>
    <Empty image="error" description="动态消息未编写" style="background-color: #fff; height: 70.5vh;" />
    <!-- 网络错误 -->
</template>

<script setup>
import router from '@/routers';
import { Icon, Empty } from 'vant';
import { onMounted } from 'vue';

onMounted(() => {
    checkLength();
});

// 超出文字长度变为省略号
function checkLength() {
    let cname = document.getElementsByClassName('cname');
    for (let i = 0; i < cname.length; i++) {
        let nowLength = cname[i].textContent.length;
        if (nowLength > 4) {
            cname[i].innerHTML = cname[i].innerHTML.substr(0, 4) + '...';
        }
    }
}

// 全部好友跳转
function allFriend() {
    router.push('/myindex/friends')
}
</script>

<style lang="less" scoped>
.head {
    display: flex;
    justify-content: space-evenly;
    padding-bottom: 10px;
    background-color: #fff;

    .friend {
        display: flex;
        flex-direction: column;
        margin-top: 10px;

        img:nth-child(1) {
            border-radius: 20px;
            height: 40px;
            width: 40px;
        }

        span:nth-child(2) {
            font-size: 13px;
            display: inline-block;
            text-align: center;
            margin-top: 4px;
            color: rgb(122, 119, 119);
        }
    }

    .allFriend {
        display: flex;
        flex-direction: column;
        margin-top: 10px;

        .icon {
            font-size: 40px;
            margin-left: 5px;
            height: 40px;
            width: 40px;
        }

        span {
            font-size: 13px;
            display: inline-block;
            text-align: center;
            margin-top: 4px;
            color: rgb(122, 119, 119);
        }
    }
}

.second {
    background-color: #fff;
    height: 30px;

    span:nth-child(1) {
        float: left;
        margin-top: 10px;
        margin-left: 10px;
        font-size: 13px;
        font-weight: 700;
    }

    s:nth-child(2) {
        float: right;
        margin-top: 10px;
        margin-right: 18px;
        font-size: 13px;
    }

    s:nth-child(3) {
        float: right;
        margin-top: 10px;
        margin-right: 18px;
        font-size: 13px;
    }

    span:nth-child(4) {
        float: right;
        margin-top: 10px;
        margin-right: 18px;
        font-size: 13px;
        font-weight: 700;
    }
}
</style>
