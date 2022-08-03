<template>
    <!-- 全部分类的内组件，使用时传参即可 -->
    <div style="background-color: #fff; padding-top: 10px; padding-bottom: 10px">
        <div class="card" v-for="value in props.list">
            <van-image :src="value.picUrl" :alt="value.name" radius="10" class="myImage">
                <template v-slot:loading>
                    <van-loading type="spinner" size="20" />
                </template>
            </van-image>
            <div>
                <div>{{ value.name }}</div>
                <div>{{ value.rcmdtext }}</div>
                <div>
                    <span><i class="iconfont icon-bofangzhong"></i>{{ value.programCount }}</span>
                    <span><i class="iconfont icon-kaishi"></i>{{ value.playCount }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Image as VanImage } from 'vant';

// 获取父组件传来的数据
const props = defineProps({
    list: Array
})
</script>

<style lang="less" scoped>
.card {
    display: flex;
    margin-top: 10px;
    margin-bottom: 15px;

    .myImage {
        margin-left: 20px;
        height: 85px;
        width: 85px;
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;

        div:nth-child(1) {
            margin-left: 15px;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            font-size: 14px;
        }

        div:nth-child(2) {
            margin-left: 15px;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            font-size: 11px;
            color: rgb(122, 119, 119);
        }

        div:nth-child(3) {
            margin-left: 15px;
            font-size: 10px;
            color: rgb(122, 119, 119);

            span:nth-child(1) {
                i {
                    margin-right: 3px;
                    font-size: 10px;
                }
            }

            span:nth-child(2) {
                margin-left: 10px;

                i {
                    margin-right: 3px;
                    font-size: 10px;
                }
            }
        }
    }
}
</style>
