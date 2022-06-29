import { defineStore } from 'pinia';
import {
    reqUserInfor,
    reqFollowList,
    reqFansList,
    reqUserLV,
    reqRencentSong,
    reqBuy,
    reqAlbumList,
    reqMv,
    reqLikeMusic,
    reqLikeList,
} from '@/Api';

export default defineStore('myindex', {
    state: () => {
        return {
            userInfor: {},
            recentSong: [],
            buy: [],
            followList: [],
            fansList: [],
            albumList: [],
            mv: [],
            likeMusic: [],
            likeListCreate: [],
            likeListCollect: [],
            isOk: false,
        };
    },
    actions: {
        // 获取用户信息
        async getUserInfor() {
            let userInforResult = await reqUserInfor();
            if (userInforResult.code === 200) {
                this.userInfor = userInforResult;
                this.getUserFollowList(userInforResult.profile.userId);
                this.getUserFansList(userInforResult.profile.userId);
                this.getUserLV();
                this.getLikeMusic(userInforResult.profile.userId);
                this.getMusicList(userInforResult.profile.userId);
            }
        },
        // 获取关注数量并增加到用户信息
        async getUserFollowList(id) {
            let userFollowListResult = await reqFollowList(id)
            if (userFollowListResult.code === 200) {
                this.userInfor = { ...this.userInfor, followNum: userFollowListResult.follow.length };
                this.followList = userFollowListResult.follow;
            }
        },
        // 获取用户粉丝数量并添加到用户信息
        async getUserFansList(id) {
            let userFansListResult = await reqFansList(id)
            if (userFansListResult.code === 200) {
                this.userInfor = { ...this.userInfor, fansNum: userFansListResult.size };
                this.fansList = userFansListResult.followeds;
            }
        },
        // 获取用户等级信息并添加到用户信息
        async getUserLV() {
            let userLVResult = await reqUserLV();
            if (userLVResult.code === 200) {
                this.userInfor = { ...this.userInfor, LV: userLVResult.data.level }
            }
        },
        // 最近歌曲
        async getRecentSong() {
            let recentSongResult = await reqRencentSong();
            if (recentSongResult.code === 200) {
                this.recentSong = recentSongResult.data;
            }
        },
        // 已购单曲
        async getBuy() {
            let buyResult = await reqBuy();
            if (buyResult.code === 200) {
                this.buy = buyResult.data;
            }
        },
        // 收藏的专辑
        async getAlbumList() {
            let albumListResult = await reqAlbumList();
            if (albumListResult.code === 200) {
                this.albumList = albumListResult.data;
            }
        },
        // 收藏的视频
        async getMv() {
            let mvResult = await reqMv();
            if (mvResult.code === 200) {
                this.mv = mvResult.data;
            }
        },
        // 喜欢的音乐
        async getLikeMusic(id) {
            let likeMusicResult = await reqLikeMusic(id);
            if (likeMusicResult.code === 200) {
                this.likeMusic = likeMusicResult;
            }
        },
        // 获取用户歌单
        async getMusicList(id) {
            let likeListResult = await reqLikeList(id);
            if (likeListResult.code === 200) {
                this.likeListCreate = [];
                this.likeListCollect = [];
                for (let index = 1; index < likeListResult.playlist.length; index++) {
                    if (likeListResult.playlist[index].creator.userId === id) {
                        this.likeListCreate.push(likeListResult.playlist[index]);
                    } else {
                        this.likeListCollect.push(likeListResult.playlist[index]);
                    };
                }
                this.isOk = true;
            }
        }
    },
    getters: {}
})
