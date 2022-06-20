<template>
    <div class="head">
        <!-- 此处未展示全部标签 -->
        <Tabs swipeable line-height="8px" :lazy-render="true" offset-top="40px" animated sticky>
            <!-- 歌单列表 -->
            <Tab title="精品">
                <div class="out">
                    <!-- 歌单 -->
                    <div class="card" v-for="value in foundData.highQulityList">
                        <img :alt="value.name" v-lazy="value.coverImgUrl" />
                        <div>
                            <Icon name="play-circle-o" class="icon" />
                            <span>{{ formatNumber(value.playCount) }}</span>
                        </div>
                        <div>{{ value.name }}</div>
                    </div>
                </div>
            </Tab>
            <Tab title="华语">
                <div class="out">
                    <!-- 歌单 -->
                    <div class="card" v-for="value in foundData.highQulityChina">
                        <img :alt="value.name" v-lazy="value.coverImgUrl" />
                        <div>
                            <Icon name="play-circle-o" class="icon" />
                            <span>{{ formatNumber(value.playCount) }}</span>
                        </div>
                        <div>{{ value.name }}</div>
                    </div>
                </div>
            </Tab>
            <Tab title="流行">
                <div class="out">
                    <!-- 歌单 -->
                    <div class="card" v-for="value in foundData.highQulityPop">
                        <img :alt="value.name" v-lazy="value.coverImgUrl" />
                        <div>
                            <Icon name="play-circle-o" class="icon" />
                            <span>{{ formatNumber(value.playCount) }}</span>
                        </div>
                        <div>{{ value.name }}</div>
                    </div>
                </div>
            </Tab>
            <Tab title="说唱">
                <div class="out">
                    <!-- 歌单 -->
                    <div class="card" v-for="value in foundData.highQulityRap">
                        <img :alt="value.name" v-lazy="value.coverImgUrl" />
                        <div>
                            <Icon name="play-circle-o" class="icon" />
                            <span>{{ formatNumber(value.playCount) }}</span>
                        </div>
                        <div>{{ value.name }}</div>
                    </div>
                </div>
            </Tab>
            <Tab title="电子">
                <div class="out">
                    <!-- 歌单 -->
                    <div class="card" v-for="value in foundData.highQulityEle">
                        <img :alt="value.name" v-lazy="value.coverImgUrl" />
                        <div>
                            <Icon name="play-circle-o" class="icon" />
                            <span>{{ formatNumber(value.playCount) }}</span>
                        </div>
                        <div>{{ value.name }}</div>
                    </div>
                </div>
            </Tab>
            <Tab title="摇滚">
                <div class="out">
                    <!-- 歌单 -->
                    <div class="card" v-for="value in foundData.highQulityRock">
                        <img :alt="value.name" v-lazy="value.coverImgUrl" />
                        <div>
                            <Icon name="play-circle-o" class="icon" />
                            <span>{{ formatNumber(value.playCount) }}</span>
                        </div>
                        <div>{{ value.name }}</div>
                    </div>
                </div>
            </Tab>
            <Tab title="古风">
                <div class="out">
                    <!-- 歌单 -->
                    <div class="card" v-for="value in foundData.highQulityAncient">
                        <img :alt="value.name" v-lazy="value.coverImgUrl" />
                        <div>
                            <Icon name="play-circle-o" class="icon" />
                            <span>{{ formatNumber(value.playCount) }}</span>
                        </div>
                        <div>{{ value.name }}</div>
                    </div>
                </div>
            </Tab>
        </Tabs>
    </div>
</template>

<script setup>
import { Icon, Tab, Tabs } from 'vant';
import { formatNumber } from '@/plugins/DigitalConverter'
import { found } from "@/store/Found";
const foundData = found();
// 精品
foundData.getHighQulity('', 99)
// 华语
foundData.getHighQulity('华语', 99)
// 流行
foundData.getHighQulity('流行', 99)
// 说唱
foundData.getHighQulity('说唱', 99)
// 电子
foundData.getHighQulity('电子', 99)
// 摇滚
foundData.getHighQulity('摇滚', 99)
// 古风
foundData.getHighQulity('古风', 99)
</script>

<style lang="less" scoped>
.head {
    .out {
        display: flex;
        flex-flow: wrap;
        justify-content: space-evenly;

        .card {
            position: relative;
            margin-top: 15px;
            width: 100px;

            img {
                height: 100px;
                width: 100px;
                border-radius: 13px;
            }

            div:nth-child(2) {
                position: absolute;
                top: 5px;
                right: 5px;
                border-radius: 15px;
                background-color: rgb(131, 127, 127);
                color: #fff;
                font-size: 10px;

                .icon {
                    margin-left: 3px;
                }

                span {
                    margin-right: 3px;
                }
            }

            div:nth-child(3) {
                font-size: 13px;
                // 超过两行隐藏
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
        }
    }
}
</style>
