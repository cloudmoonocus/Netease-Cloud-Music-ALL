import { defineStore } from 'pinia';

export default defineStore('onplaying', {
    state: () => {
        return {
            playList: [
                {
                    playNow: false,
                    id: null,
                    imageUrl: null,
                    title: null,
                    musicUrl: null,
                },
            ],
            playNow: {
                playNow: null,
                id: null,
                imageUrl: null,
                title: null,
                musicUrl: null,
            },
            default: {
                playNow: true,
                id: 0,
                imageUrl:
                    'https://img.88icon.com/upload/jpg/20210523/30a94ae562e501dd8c0b8565c151d3ad_53767_800_800.jpg!88con',
                title: '暂无任何音乐播放哦~',
                musicUrl: null,
            },
        };
    },
    actions: {
        judageNow() {
            let newArray = this.playList.map((m) => {
                return m.playNow === true ? m : undefined;
            });
            if (newArray.length === 1 && newArray[0] == undefined) {
                this.playNow = this.default;
            } else {
                this.playNow = newArray[0];
            }
        },
    },
    getters: {},
});
