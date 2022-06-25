import { defineStore } from 'pinia';
import { reqAllCategory } from '@/Api';

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
                        break;
                    case 3087096:
                        this.category3087096 = allCategoryResult.djRadios;
                        break;
                    case 3:
                        this.category3 = allCategoryResult.djRadios;
                        break;
                    case 10002:
                        this.category10002 = allCategoryResult.djRadios;
                        break;
                    case 11:
                        this.category11 = allCategoryResult.djRadios;
                        break;
                    case 3001:
                        this.category3001 = allCategoryResult.djRadios;
                        break;
                    case 8:
                        this.category8 = allCategoryResult.djRadios;
                        break;
                    default:
                        break;
                }
            }
        },
    },
    getters: {},
});
