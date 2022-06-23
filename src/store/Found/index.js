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
    reqHighQuality,
    reqAllRankingList,
    reqLanguage,
    reqNewAirtistMusic,
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
            newDigitalAlbumShou: [],
            rankingList: [],
            hotTopic: [],
            highQulityList: [],
            highQulityChina: [],
            highQulityPop: [],
            highQulityRap: [],
            highQulityEle: [],
            highQulityRock: [],
            highQulityAncient: [],
            dailyRankingList0: [],
            weekRankingList0: [],
            yearRankingList0: [],
            totalRankingList0: [],
            dailyRankingList1: [],
            weekRankingList1: [],
            yearRankingList1: [],
            totalRankingList1: [],
            languageChinaList: [],
            languageEuropeList: [],
            languageKoreaList: [],
            languageJapanList: [],
            newAirtistMusic: [],
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
                for (let index = 0; index < 6; index++) {
                    this.newDigitalAlbumShou[index] = this.newDigitalAlbum[index];
                }
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
        // 精品歌单
        async getHighQulity(tag, num) {
            const highQulityResult = await reqHighQuality(tag, num);
            if (highQulityResult.code === 200) {
                switch (tag) {
                    case '':
                        this.highQulityList = highQulityResult.playlists;
                        break;
                    case '华语':
                        this.highQulityChina = highQulityResult.playlists;
                        break;
                    case '流行':
                        this.highQulityPop = highQulityResult.playlists;
                        break;
                    case '说唱':
                        this.highQulityRap = highQulityResult.playlists;
                        break;
                    case '电子':
                        this.highQulityEle = highQulityResult.playlists;
                        break;
                    case '摇滚':
                        this.highQulityRock = highQulityResult.playlists;
                        break;
                    case '古风':
                        this.highQulityAncient = highQulityResult.playlists;
                        break;
                    default:
                        break;
                }
            }
        },
        // 专辑/单曲榜单
        async getAllRankingList(type, albumType) {
            const allRankingResult = await reqAllRankingList(type, albumType);
            if (allRankingResult.code === 200) {
                switch (albumType) {
                    case 0:
                        switch (type) {
                            case 'daily':
                                this.dailyRankingList0 = allRankingResult.products;
                                break;
                            case 'week':
                                this.weekRankingList0 = allRankingResult.products;
                                break;
                            case 'year':
                                this.yearRankingList0 = allRankingResult.products;
                                break;
                            case 'total':
                                this.totalRankingList0 = allRankingResult.products;
                                break;
                            default:
                                break;
                        }
                        break;
                    case 1:
                        switch (type) {
                            case 'daily':
                                this.dailyRankingList1 = allRankingResult.products;
                                break;
                            case 'week':
                                this.weekRankingList1 = allRankingResult.products;
                                break;
                            case 'year':
                                this.yearRankingList1 = allRankingResult.products;
                                break;
                            case 'total':
                                this.totalRankingList1 = allRankingResult.products;
                                break;
                            default:
                                break;
                        }
                        break;
                    default:
                        break;
                }
            }
        },
        // 风格馆
        async getLanguage(language) {
            const languageResult = await reqLanguage(language);
            if (languageResult.code === 200) {
                switch (language) {
                    case 'Z_H':
                        this.languageChinaList = languageResult.albumProducts;
                        break;
                    case 'E_A':
                        this.languageEuropeList = languageResult.albumProducts;
                        break;
                    case 'KR':
                        this.languageKoreaList = languageResult.albumProducts;
                        break;
                    case 'JP':
                        this.languageJapanList = languageResult.albumProducts;
                        break;
                    default:
                        break;
                }
            }
        },
        // 关注歌手新歌
        async getNewAirtistMusic() {
            const newAirtistMusicResult = await reqNewAirtistMusic();
            if (newAirtistMusicResult.code === 200) {
                this.newAirtistMusic = newAirtistMusicResult.data.newWorks;
            }
        },
    },
    getters: {},
});
