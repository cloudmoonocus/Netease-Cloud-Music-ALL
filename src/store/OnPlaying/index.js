import { defineStore } from 'pinia';

export default defineStore('onplaying', {
    state: () => {
        return {
            playList: [],
            playNow: {
                play: null,
                playNow: null,
                index: null,
                id: null,
                imageUrl: null,
                title: null,
                author: null,
                musicUrl: null,
                lyricDetail: [],
            },
            default: {
                play: false,
                playNow: true,
                index: 0,
                id: 0,
                imageUrl:
                    'https://img.88icon.com/upload/jpg/20210523/30a94ae562e501dd8c0b8565c151d3ad_53767_800_800.jpg!88con',
                title: '暂无任何音乐播放哦~',
                author: null,
                musicUrl: null,
                lyricDetail: [],
            },
            totalTime: null,
            spead: null,
        };
    },
    actions: {
        judageNow() {
            if (this.playList.length === 0) {
                this.playNow = this.default;
            } else {
                this.playList.sort(function (val1, val2) {
                    return val1.index - val2.index;
                });
                for (let index = 0; index < this.playList.length; index++) {
                    if (this.playList[index].playNow === true) {
                        this.playNow = this.playList[index];
                        break;
                    }
                }
            }
            let { minute, second, millisecond } =
                this.playNow.lyricDetail[0][[this.playNow.lyricDetail[0].length - 2]];
            minute = Number(minute);
            second = Number(second);
            millisecond = Number(millisecond);
            let totalMI = minute * 60 + second + millisecond / 1000;
            this.totalTime = totalMI;
            this.spead = 100 / this.totalTime;
            const playnow = this.playNow;
            const playlist = this.playList;
            let localData = { playnow, playlist };
            localStorage.setItem('localPlayer', JSON.stringify(localData));
        },
    },
    getters: {},
});
