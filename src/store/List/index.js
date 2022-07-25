import { defineStore } from 'pinia';

export default defineStore('list', {
    state: () => {
        return {
            albumInfor:{},
            albumlist: [],
        };
    },
    actions: {},
    getters: {},
});
