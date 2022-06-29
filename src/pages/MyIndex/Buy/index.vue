<template>
    <div style="background-color: #fff">
        <div class="out">
            <div v-if="myindexData.buy.list">
                <div class="card" v-for="value in myindexData.buy.list">
                    <van-image height="120" width="120" :src="value.picUrl" :alt="value.albumName" class="myImage">
                        <template v-slot:loading>
                            <van-loading type="spinner" size="20" />
                        </template>
                    </van-image>
                    <div class="right">
                        <div class="title">{{ value.albumName }}</div>
                        <div class="author">{{ value.artistName }}</div>
                        <div class="buy">已购{{ formatNumber(value.boughtCount) }}首</div>
                    </div>
                </div>
            </div>
            <div v-if="!myindexData.buy.list" style="height: 92vh; background-color:#fff;">
                <Empty image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png" image-size="80"
                    description="暂无购买的单曲" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { Image as VanImage } from 'vant';
import { Empty } from 'vant'
import myindex from '@/store/MyIndex';
import { formatNumber } from '@/plugins/DigitalConverter'
const myindexData = myindex();

// 获取数据
myindexData.getBuy();
</script>

<style lang="less" scoped>
.out {
    padding-top: 5px;
    margin-left: 15px;

    .card {
        margin-top: 15px;
        padding-bottom: 15px;
        width: 100%;
        height: 120px;

        .myImage {
            float: left;
        }

        .right {
            float: left;
            margin-left: 10px;
            height: 100px;
            width: 60%;

            .title {
                margin-top: 15px;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                font-size: 20px;
            }

            .author {
                margin-top: 5px;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                font-size: 15px;
                color: rgb(122, 119, 119);
            }

            .buy {
                margin-top: 5px;
                font-size: 15px;
                color: rgb(122, 119, 119);
            }
        }
    }
}
</style>
