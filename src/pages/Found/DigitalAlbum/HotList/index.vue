<template>
    <MyLoading v-show="outShow" />
    <transition name="van-fade">
        <div style="background-color: #fff" v-show="inShow">
            <div class="head">
                <Tabs type="card" ref="tabs">
                    <!-- 数字专辑 -->
                    <Tab title="数字专辑榜">
                        <div class="myBody">
                            <Tabs title-active-color="#e60026" :lazy-render="true">
                                <Tab title="日榜">
                                    <div class="first">
                                        <span>榜单每半小时更新1次&nbsp;</span>
                                        <Icon name="warning-o" />
                                    </div>
                                    <!-- 前三的左侧排名标签为three，非前三标签为noThree -->
                                    <!-- 排名上升的标签为up，下降的为down，不变的为no（无需加<span>） -->
                                    <div class="second">
                                        <div class="card" v-for="value in foundData.dailyRankingList0"
                                            :key="value.rank + 1">
                                            <div>
                                                <div
                                                    :class="{ three: ((value.rank + 1) <= 3), noThree: ((value.rank + 1) > 3) }">
                                                    {{ value.rank + 1 }}</div>
                                                <div
                                                    :class="{ up: (value.rankIncr > 0), down: (value.rankIncr < 0), no: (value.rankIncr === 0) }">
                                                    <Icon :name="value.rankIncr > 0 ? 'arrow-up' : 'arrow-down'"
                                                        v-show="value.rankIncr" />
                                                    <Icon name="minus" v-show="!value.rankIncr" />
                                                    <span v-show="value.rankIncr">{{ Math.abs(value.rankIncr) }}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <van-image :src="value.coverUrl" :alt="value.albumName" radius="4"
                                                    height="80" width="80" class="myImage">
                                                    <template v-slot:loading>
                                                        <van-loading type="spinner" size="20" />
                                                    </template>
                                                </van-image>
                                                <div>{{ value.albumName }}</div>
                                                <div>已售{{ formatNumber(value.saleNum) }}张</div>
                                                <div>支持</div>
                                            </div>
                                        </div>
                                    </div>
                                </Tab>
                                <Tab title="周榜">
                                    <div class="first">
                                        <span>榜单每半小时更新1次&nbsp;</span>
                                        <Icon name="warning-o" />
                                    </div>
                                    <!-- 前三的左侧排名标签为three，非前三标签为noThree -->
                                    <!-- 排名上升的标签为up，下降的为down，不变的为no（无序加<span>） -->
                                    <div class="second">
                                        <div class="card" v-for="value in foundData.weekRankingList0"
                                            :key="value.rank + 1">
                                            <div>
                                                <div
                                                    :class="{ three: ((value.rank + 1) <= 3), noThree: ((value.rank + 1) > 3) }">
                                                    {{ value.rank + 1 }}</div>
                                                <div
                                                    :class="{ up: (value.rankIncr > 0), down: (value.rankIncr < 0), no: (value.rankIncr === 0) }">
                                                    <Icon :name="value.rankIncr > 0 ? 'arrow-up' : 'arrow-down'"
                                                        v-show="value.rankIncr" />
                                                    <Icon name="minus" v-show="!value.rankIncr" />
                                                    <span v-show="value.rankIncr">{{ Math.abs(value.rankIncr) }}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <van-image :src="value.coverUrl" :alt="value.albumName" radius="4"
                                                    height="80" width="80" class="myImage">
                                                    <template v-slot:loading>
                                                        <van-loading type="spinner" size="20" />
                                                    </template>
                                                </van-image>
                                                <div>{{ value.albumName }}</div>
                                                <div>已售{{ formatNumber(value.saleNum) }}张</div>
                                                <div>支持</div>
                                            </div>
                                        </div>
                                    </div>
                                </Tab>
                                <!-- 年度总榜只做了2022年 -->
                                <Tab title="2022年榜">
                                    <div class="first">
                                        <span>榜单每半小时更新1次&nbsp;</span>
                                        <Icon name="warning-o" />
                                    </div>
                                    <!-- 前三的左侧排名标签为three，非前三标签为noThree -->
                                    <!-- 年榜无排名变动 -->
                                    <div class="second">
                                        <div class="card" v-for="value in foundData.yearRankingList0"
                                            :key="value.rank + 1">
                                            <div>
                                                <div
                                                    :class="{ three: ((value.rank + 1) <= 3), noThree: ((value.rank + 1) > 3) }">
                                                    {{ value.rank + 1 }}</div>
                                                <div
                                                    :class="{ up: (value.rankIncr > 0), down: (value.rankIncr < 0), no: (value.rankIncr === 0) }">
                                                    <Icon :name="value.rankIncr > 0 ? 'arrow-up' : 'arrow-down'"
                                                        v-show="value.rankIncr" />
                                                    <Icon name="minus" v-show="!value.rankIncr" />
                                                    <span v-show="value.rankIncr">{{ Math.abs(value.rankIncr) }}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <van-image :src="value.coverUrl" :alt="value.albumName" radius="4"
                                                    height="80" width="80" class="myImage">
                                                    <template v-slot:loading>
                                                        <van-loading type="spinner" size="20" />
                                                    </template>
                                                </van-image>
                                                <div>{{ value.albumName }}</div>
                                                <div>已售{{ formatNumber(value.saleNum) }}张</div>
                                                <div>支持</div>
                                            </div>
                                        </div>
                                    </div>
                                </Tab>
                                <Tab title="总榜">
                                    <div class="first">
                                        <span>榜单每半小时更新1次&nbsp;</span>
                                        <Icon name="warning-o" />
                                    </div>
                                    <!-- 前三的左侧排名标签为three，非前三标签为noThree -->
                                    <!-- 总榜无排名变动 -->
                                    <div class="second">
                                        <div class="card" v-for="value in foundData.totalRankingList0"
                                            :key="value.rank + 1">
                                            <div>
                                                <div
                                                    :class="{ three: ((value.rank + 1) <= 3), noThree: ((value.rank + 1) > 3) }">
                                                    {{ value.rank + 1 }}</div>
                                                <div
                                                    :class="{ up: (value.rankIncr > 0), down: (value.rankIncr < 0), no: (value.rankIncr === 0) }">
                                                    <Icon :name="value.rankIncr > 0 ? 'arrow-up' : 'arrow-down'"
                                                        v-show="value.rankIncr" />
                                                    <Icon name="minus" v-show="!value.rankIncr" />
                                                    <span v-show="value.rankIncr">{{ Math.abs(value.rankIncr) }}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <van-image :src="value.coverUrl" :alt="value.albumName" radius="4"
                                                    height="80" width="80" class="myImage">
                                                    <template v-slot:loading>
                                                        <van-loading type="spinner" size="20" />
                                                    </template>
                                                </van-image>
                                                <div>{{ value.albumName }}</div>
                                                <div>已售{{ formatNumber(value.saleNum) }}张</div>
                                                <div>支持</div>
                                            </div>
                                        </div>
                                    </div>
                                </Tab>
                            </Tabs>
                        </div>
                    </Tab>
                    <!-- 数字单曲 -->
                    <Tab title="数字单曲榜">
                        <div class="myBody">
                            <Tabs title-active-color="#e60026" :lazy-render="true">
                                <Tab title="日榜">
                                    <div class="first">
                                        <span>榜单每半小时更新1次&nbsp;</span>
                                        <Icon name="warning-o" />
                                    </div>
                                    <!-- 前三的左侧排名标签为three，非前三标签为noThree -->
                                    <!-- 排名上升的标签为up，下降的为down，不变的为no（无序加<span>） -->
                                    <div class="second">
                                        <div class="card" v-for="value in foundData.dailyRankingList1"
                                            :key="value.rank + 1">
                                            <div>
                                                <div
                                                    :class="{ three: ((value.rank + 1) <= 3), noThree: ((value.rank + 1) > 3) }">
                                                    {{ value.rank + 1 }}</div>
                                                <div
                                                    :class="{ up: (value.rankIncr > 0), down: (value.rankIncr < 0), no: (value.rankIncr === 0) }">
                                                    <Icon :name="value.rankIncr > 0 ? 'arrow-up' : 'arrow-down'"
                                                        v-show="value.rankIncr" />
                                                    <Icon name="minus" v-show="!value.rankIncr" />
                                                    <span v-show="value.rankIncr">{{ Math.abs(value.rankIncr) }}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <van-image :src="value.coverUrl" :alt="value.albumName" radius="4"
                                                    height="80" width="80" class="myImage">
                                                    <template v-slot:loading>
                                                        <van-loading type="spinner" size="20" />
                                                    </template>
                                                </van-image>
                                                <div>{{ value.albumName }}</div>
                                                <div>已售{{ formatNumber(value.saleNum) }}张</div>
                                                <div>支持</div>
                                            </div>
                                        </div>
                                    </div>
                                </Tab>
                                <Tab title="周榜">
                                    <div class="first">
                                        <span>榜单每半小时更新1次&nbsp;</span>
                                        <Icon name="warning-o" />
                                    </div>
                                    <!-- 前三的左侧排名标签为three，非前三标签为noThree -->
                                    <!-- 排名上升的标签为up，下降的为down，不变的为no（无序加<span>） -->
                                    <div class="second">
                                        <div class="card" v-for="value in foundData.weekRankingList1"
                                            :key="value.rank + 1">
                                            <div>
                                                <div
                                                    :class="{ three: ((value.rank + 1) <= 3), noThree: ((value.rank + 1) > 3) }">
                                                    {{ value.rank + 1 }}</div>
                                                <div
                                                    :class="{ up: (value.rankIncr > 0), down: (value.rankIncr < 0), no: (value.rankIncr === 0) }">
                                                    <Icon :name="value.rankIncr > 0 ? 'arrow-up' : 'arrow-down'"
                                                        v-show="value.rankIncr" />
                                                    <Icon name="minus" v-show="!value.rankIncr" />
                                                    <span v-show="value.rankIncr">{{ Math.abs(value.rankIncr) }}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <van-image :src="value.coverUrl" :alt="value.albumName" radius="4"
                                                    height="80" width="80" class="myImage">
                                                    <template v-slot:loading>
                                                        <van-loading type="spinner" size="20" />
                                                    </template>
                                                </van-image>
                                                <div>{{ value.albumName }}</div>
                                                <div>已售{{ formatNumber(value.saleNum) }}张</div>
                                                <div>支持</div>
                                            </div>
                                        </div>
                                    </div>
                                </Tab>
                                <!-- 年度总榜只做了2022年 -->
                                <Tab title="2022年榜">
                                    <div class="first">
                                        <span>榜单每半小时更新1次&nbsp;</span>
                                        <Icon name="warning-o" />
                                    </div>
                                    <!-- 前三的左侧排名标签为three，非前三标签为noThree -->
                                    <!-- 年榜无排名变动 -->
                                    <div class="second">
                                        <div class="card" v-for="value in foundData.yearRankingList1"
                                            :key="value.rank + 1">
                                            <div>
                                                <div
                                                    :class="{ three: ((value.rank + 1) <= 3), noThree: ((value.rank + 1) > 3) }">
                                                    {{ value.rank + 1 }}</div>
                                                <div
                                                    :class="{ up: (value.rankIncr > 0), down: (value.rankIncr < 0), no: (value.rankIncr === 0) }">
                                                    <Icon :name="value.rankIncr > 0 ? 'arrow-up' : 'arrow-down'"
                                                        v-show="value.rankIncr" />
                                                    <Icon name="minus" v-show="!value.rankIncr" />
                                                    <span v-show="value.rankIncr">{{ Math.abs(value.rankIncr) }}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <van-image :src="value.coverUrl" :alt="value.albumName" radius="4"
                                                    height="80" width="80" class="myImage">
                                                    <template v-slot:loading>
                                                        <van-loading type="spinner" size="20" />
                                                    </template>
                                                </van-image>
                                                <div>{{ value.albumName }}</div>
                                                <div>已售{{ formatNumber(value.saleNum) }}张</div>
                                                <div>支持</div>
                                            </div>
                                        </div>
                                    </div>
                                </Tab>
                                <Tab title="总榜">
                                    <div class="first">
                                        <span>榜单每半小时更新1次&nbsp;</span>
                                        <Icon name="warning-o" />
                                    </div>
                                    <!-- 前三的左侧排名标签为three，非前三标签为noThree -->
                                    <!-- 总榜无排名变动 -->
                                    <div class="second">
                                        <div class="card" v-for="value in foundData.totalRankingList1"
                                            :key="value.rank + 1">
                                            <div>
                                                <div
                                                    :class="{ three: ((value.rank + 1) <= 3), noThree: ((value.rank + 1) > 3) }">
                                                    {{ value.rank + 1 }}</div>
                                                <div
                                                    :class="{ up: (value.rankIncr > 0), down: (value.rankIncr < 0), no: (value.rankIncr === 0) }">
                                                    <Icon :name="value.rankIncr > 0 ? 'arrow-up' : 'arrow-down'"
                                                        v-show="value.rankIncr" />
                                                    <Icon name="minus" v-show="!value.rankIncr" />
                                                    <span v-show="value.rankIncr">{{ Math.abs(value.rankIncr) }}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <van-image :src="value.coverUrl" :alt="value.albumName" radius="4"
                                                    height="80" width="80" class="myImage">
                                                    <template v-slot:loading>
                                                        <van-loading type="spinner" size="20" />
                                                    </template>
                                                </van-image>
                                                <div>{{ value.albumName }}</div>
                                                <div>已售{{ formatNumber(value.saleNum) }}张</div>
                                                <div>支持</div>
                                            </div>
                                        </div>
                                    </div>
                                </Tab>
                            </Tabs>
                        </div>
                    </Tab>
                </Tabs>
            </div>
        </div>
    </transition>
</template>

<script setup>
import { Tab, Tabs, Icon } from 'vant';
import { Image as VanImage } from 'vant';
import { found } from '@/store/Found';
import { formatNumber } from '@/plugins/DigitalConverter'
import { ref, watch } from 'vue';
const foundData = found();

const tabs = ref();

const outShow = ref(true);
const inShow = ref(false);

watch(() => foundData.totalRankingList1, () => {
    if (foundData.totalRankingList1.length) {
        setTimeout(() => {
            outShow.value = false;
            inShow.value = true;
            tabs.value.resize();
        }, 400);
    }
})


// 数字专辑日榜
foundData.getAllRankingList('daily', 0)
// 数字专辑周榜
foundData.getAllRankingList('week', 0)
// 数字专辑年榜
foundData.getAllRankingList('year', 0)
// 数字专辑总榜
foundData.getAllRankingList('total', 0)
// 数字单曲日榜
foundData.getAllRankingList('daily', 1)
// 数字单曲周榜
foundData.getAllRankingList('week', 1)
// 数字单曲年榜
foundData.getAllRankingList('year', 1)
// 数字单曲总榜
foundData.getAllRankingList('total', 1)
</script>

<style lang="less" scoped>
.head {
    padding-top: 20px;
}

.myBody {
    border-top: 1px solid #eee;
    width: 95%;
    margin: 0 auto;
    margin-top: 10px;

    .first {
        margin-top: 10px;
        font-size: 13px;
    }

    .second {
        margin-top: 10px;

        .card {
            display: flex;
            margin-top: 10px;
            height: 80px;

            div:nth-child(1) {
                width: 10%;

                .three {
                    margin-left: 20%;
                    margin-top: 50%;
                    font-size: 25px;
                    font-weight: 700;
                    color: #c0112e;
                }

                .noThree {
                    margin-left: 20%;
                    margin-top: 50%;
                    font-size: 20px;
                    color: rgb(122, 119, 119);
                }

                .up {
                    margin-left: 20%;
                    font-size: 10px;
                    font-weight: 700;
                    color: #e60026;

                    span {
                        font-weight: 400;
                        color: rgb(122, 119, 119);
                    }
                }

                .down {
                    margin-left: 20%;
                    font-size: 10px;
                    font-weight: 700;
                    color: rgb(25, 165, 165);

                    span {
                        font-weight: 400;
                        color: rgb(122, 119, 119);
                    }
                }

                .no {
                    margin-left: 20%;
                    font-size: 10px;
                    font-weight: 700;
                    color: rgb(122, 119, 119);
                }
            }

            div:nth-child(2) {
                position: relative;
                width: 85%;
                margin-left: 10px;

                .myImage {
                    position: absolute;
                }

                div:nth-child(2) {
                    position: absolute;
                    top: 20px;
                    margin-left: 90px;
                    width: 135px;
                    overflow: hidden;
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                    font-size: 14px;
                }

                div:nth-child(3) {
                    position: absolute;
                    top: 45px;
                    margin-left: 90px;
                    font-size: 10px;
                    color: rgb(122, 119, 119);
                }

                div:nth-child(4) {
                    position: absolute;
                    top: 30px;
                    right: 10px;
                    padding: 2px 10px;
                    border: #e60026 solid 1px;
                    border-radius: 10px;
                    font-size: 13px;
                    color: #e60026;
                }
            }
        }
    }
}
</style>
