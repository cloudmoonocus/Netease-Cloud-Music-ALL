import { defineStore } from 'pinia';

export default defineStore('onplaying', {
    state: () => {
        return {
            playList: [],
            playNow: {
                playNow: null,
                index: null,
                id: null,
                imageUrl: null,
                title: null,
                musicUrl: null,
                lyricDetail: [],
            },
            default: {
                playNow: true,
                index: 0,
                id: 0,
                imageUrl:
                    'https://img.88icon.com/upload/jpg/20210523/30a94ae562e501dd8c0b8565c151d3ad_53767_800_800.jpg!88con',
                title: '暂无任何音乐播放哦~',
                musicUrl: null,
                lyricDetail: [],
            },
        };
    },
    actions: {
        judageNow() {
            if (this.playList.length === 0) {
                this.playNow = this.default;
            } else {
                let newArray = this.playList.map((m) => {
                    return m.playNow === true ? m : undefined;
                });
                this.playNow = newArray[0];
            }
        },
    },
    getters: {},
});
