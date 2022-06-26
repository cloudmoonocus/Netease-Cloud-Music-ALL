import { defineStore } from 'pinia';
import { reqAllCategory, reqDjBanner, reqDjRecom } from '@/Api';

export default defineStore('podcast', {
    state: () => {
        return {
            // 创作翻唱
            category2001: [],
            // 新闻资讯
            category3087096: [],
            // 情感
            category3: [],
            // 电音
            category10002: [],
            // 知识
            category11: [],
            // 二次元
            category3001: [],
            // 脱口秀
            category8: [],
            // 播客轮播图
            djBanner: [],
            // 猜你喜欢
            djRecom: [],
            // 首页创作翻唱
            indexCategory2001: [],
            // 首页情感
            indexCategory3: [],
            // 首页电音
            indexCategory10002: [],
            // 首页知识
            indexCategory11: [],
            // 首页二次元
            indexCategory3001: []
        };
    },
    actions: {
        // 全部分类
        async getAllCategory(type) {
            const allCategoryResult = await reqAllCategory(type);
            if (allCategoryResult.code === 200) {
                switch (type) {
                    case 2001:
                        this.category2001 = allCategoryResult.djRadios;
                        this.indexCategory2001[0] = this.category2001[0];
                        this.indexCategory2001[1] = this.category2001[1];
                        this.indexCategory2001[2] = this.category2001[2];
                        break;
                    case 3087096:
                        this.category3087096 = allCategoryResult.djRadios;
                        break;
                    case 3:
                        this.category3 = allCategoryResult.djRadios;
                        this.indexCategory3[0] = this.category3[0];
                        this.indexCategory3[1] = this.category3[1];
                        this.indexCategory3[2] = this.category3[2];
                        break;
                    case 10002:
                        this.category10002 = allCategoryResult.djRadios;
                        this.indexCategory10002[0] = this.category10002[0];
                        this.indexCategory10002[1] = this.category10002[1];
                        this.indexCategory10002[2] = this.category10002[2];
                        break;
                    case 11:
                        this.category11 = allCategoryResult.djRadios;
                        this.indexCategory11[0] = this.category11[0];
                        this.indexCategory11[1] = this.category11[1];
                        this.indexCategory11[2] = this.category11[2];
                        break;
                    case 3001:
                        this.category3001 = allCategoryResult.djRadios;
                        this.indexCategory3001[0] = this.category3001[0];
                        this.indexCategory3001[1] = this.category3001[1];
                        this.indexCategory3001[2] = this.category3001[2];
                        break;
                    case 8:
                        this.category8 = allCategoryResult.djRadios;
                        break;
                    default:
                        break;
                }
            }
        },
        // 播客轮播图
        async getDjBanner() {
            const djBannerResult = await reqDjBanner();
            if (djBannerResult.code === 200) {
                this.djBanner = djBannerResult.data;
            }
        },
        // 猜你喜欢
        async getDjRecom() {
            const djRecomResult = await reqDjRecom();
            if (djRecomResult.code === 200) {
                this.djRecom = djRecomResult.data;
            }
        },
    },
    getters: {},
});
