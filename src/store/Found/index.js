import { defineStore } from 'pinia';
import {
    reqBanner,
    reqDailyList,
    reqDailyRecMusic,
    reqNewMusic,
    reqNewAlbum,
    reqDigitalAlbum,
    reqRankingList,
    reqHotTopic,
} from '@/Api';

export const found = defineStore('found', {
    state: () => {
        return {
            bannerImage: [],
            dailyList: [],
            dailyRcMusic: [],
            newMusic: [],
            newAlbum: [],
            newDigitalAlbum: [],
            rankingList: [],
            hotTopic: [],
        };
    },
    actions: {
        // banner图
        async getBannerImage() {
            const bannerResult = await reqBanner();
            if (bannerResult.code === 200) {
                this.bannerImage = bannerResult.banners;
            }
        },
        // 推荐歌单
        async getDailyList() {
            const dailyResult = await reqDailyList();
            if (dailyResult.code === 200) {
                this.dailyList = dailyResult.recommend;
            }
        },
        // 推荐歌曲
        async getDailyRcMusic() {
            const dailyRcMusicResult = await reqDailyRecMusic();
            if (dailyRcMusicResult.code === 200) {
                this.dailyRcMusic = dailyRcMusicResult.data.dailySongs;
            }
        },
        // 新歌
        async getNewMusic() {
            const newMusicResult = await reqNewMusic();
            if (newMusicResult.code === 200) {
                this.newMusic = newMusicResult.data;
            }
        },
        // 新碟
        async getNewAlbum() {
            const newAlbumResult = await reqNewAlbum();
            if (newAlbumResult.code === 200) {
                this.newAlbum = newAlbumResult.albums;
            }
        },
        // 数字专辑
        async getNewDigitalAlbum() {
            const newDigitalAlbumResult = await reqDigitalAlbum();
            if (newDigitalAlbumResult.code === 200) {
                this.newDigitalAlbum = newDigitalAlbumResult.products;
            }
        },
        // 数字单曲榜单
        async getRankingList() {
            const newRankingListResult = await reqRankingList();
            if (newRankingListResult.code === 200) {
                this.rankingList = newRankingListResult.products;
            }
        },
        // 热门话题
        async getHotTopic() {
            const hotTopicResult = await reqHotTopic();
            if (hotTopicResult.code === 200) {
                this.hotTopic = hotTopicResult.hot;
            }
        },
    },
    getters: {},
});
