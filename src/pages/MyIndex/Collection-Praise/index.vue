<template>
    <div style="background-color: #fff;">
        <Tabs line-height="7px">
            <Tab title="专辑">
                <div class="album" v-if="myindexData.albumList.length">
                    <div class="card" v-for="value in myindexData.albumList" :key="value.id">
                        <img :src="value.picUrl" :alt="value.name" />
                        <div>{{ value.name }}</div>
                        <div>{{ value.artists[0].name }}&nbsp;&nbsp;{{ value.size }}首</div>
                        <Icon name="more-o" class="more-o" />
                    </div>
                </div>
                <Empty v-if="!myindexData.albumList.length"
                    image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png" image-size="80"
                    description="暂无收藏的专辑" style="background-color: #fff; height:87vh" />
            </Tab>
            <Tab title="视频">
                <div class="video" v-if="myindexData.mv.length">
                    <div class="card" v-for="value in myindexData.mv">
                        <img :src="value.coverUrl" />
                        <div>{{ value.title }}</div>
                        <div>{{ value.creator[0].userName }}</div>
                        <div>? / ? 收藏</div>
                    </div>
                </div>
                <Empty v-if="!myindexData.mv.length"
                    image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png" image-size="80"
                    description="暂无收藏的视频" style="background-color: #fff; height:87vh" />
            </Tab>
        </Tabs>
    </div>
</template>

<script setup>
import { Tab, Tabs, Icon, Empty } from 'vant';
import myindex from '@/store/MyIndex';
const myindexData = myindex();

// 获取收藏专辑
myindexData.getAlbumList();
// 获取收藏视频
myindexData.getMv();


</script>

<style lang="less" scoped>
.album {
    margin-top: 20px;

    .card {
        position: relative;
        height: 80px;

        img:nth-child(1) {
            position: absolute;
            margin-left: 15px;
            border-radius: 10px;
            height: 55px;
        }

        div:nth-child(2) {
            position: absolute;
            left: 80px;
            top: 10px;
            font-size: 13px;
        }

        div:nth-child(3) {
            position: absolute;
            left: 80px;
            top: 30px;
            font-size: 10px;
            color: rgb(122, 119, 119);
        }

        .play-circle-o {
            position: absolute;
            top: 10px;
            right: 55px;
            color: rgb(122, 119, 119);
        }

        .more-o {
            position: absolute;
            top: 10px;
            right: 10px;
            color: rgb(122, 119, 119);
        }
    }
}

.video {
    margin-top: 20px;

    .card {
        margin-top: 15px;
        position: relative;
        height: 100px;

        img:nth-child(1) {
            position: absolute;
            left: 15px;
            top: -5px;
            border-radius: 10px;
            width: 180px;
            height: 100px;
        }

        div:nth-child(2) {
            position: absolute;
            left: 210px;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            font-size: 13px;
        }

        div:nth-child(3) {
            position: absolute;
            left: 210px;
            top: 45px;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            font-size: 10px;
            color: rgb(122, 119, 119);
        }

        div:nth-child(4) {
            position: absolute;
            left: 210px;
            top: 60px;
            font-size: 10px;
            color: rgb(122, 119, 119);
        }
    }
}
</style>
