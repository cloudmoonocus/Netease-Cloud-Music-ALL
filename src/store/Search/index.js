import { reqHotSearch, reqSearchResult, reqSearchSuggest } from '@/Api';
import { defineStore } from 'pinia';

export default defineStore('search', {
    state: () => {
        return {
            hotSearch: [],
            searchSuggest: {},
            result: []
        };
    },
    actions: {
        // 获取热门搜索
        async getHotSearch() {
            let hotSearchResult = await reqHotSearch();
            if (hotSearchResult.code === 200) {
                this.hotSearch = hotSearchResult.data;
            }
        },
        // 获取搜索建议
        async getSearchSuggest(keyWord) {
            let searchSuggestResult = await reqSearchSuggest(keyWord);
            if (searchSuggestResult.code === 200) {
                this.searchSuggest = searchSuggestResult.result;
            }
        },
        // 获取搜索结果
        async getSearchResult(keyWord) {
            let searchResult = await reqSearchResult(keyWord);
            if (searchResult.code === 200) {
                this.result = searchResult.result.songs;
            }
        },
    },
    getters: {},
});
