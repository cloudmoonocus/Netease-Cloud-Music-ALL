import requests from './ajax';

// 时间戳，用来标记无需缓存
let timeNow = Date.now();

// *登录相关API
// #region
// !登录(验证码)
export const reqSignIn = (phone) =>
    requests({
        url: `/captcha/sent?phone=${phone}&timestamp=${timeNow}`,
        method: 'post',
        withCredentials: true,
    });
// !验证手机号是否注册
export const reqIfPhoneExist = (phone) =>
    requests({
        url: `/cellphone/existence/check?phone=${phone}&timestamp=${timeNow}`,
        method: 'post',
        withCredentials: true,
    });
// !登录
export const reqSignInFinal = (phone, captcha) =>
    requests({
        url: `/login/cellphone?phone=${phone}&captcha=${captcha}&timestamp=${timeNow}`,
        method: 'post',
        withCredentials: true,
    });
// !游客登录
export const reqFriendsSignIn = () =>
    requests({
        url: `/register/anonimous`,
        method: 'get',
        withCredentials: true,
    });
// !退出登录
export const reqLogOut = () =>
    requests({
        url: `/logout?timestamp=${timeNow}`,
        method: 'post',
        withCredentials: true,
    });
// !获取登录状态
export const reqSignInState = () =>
    requests({
        url: `/login/status?timestamp=${timeNow}`,
        method: 'post',
        withCredentials: true,
    });
// #endregion

// *发现页API
// #region
// #region
// !首页banner图
export const reqBanner = () =>
    requests({
        url: `/banner?type=2`,
        method: 'get',
        withCredentials: true,
    });
// !每日推荐歌单
export const reqDailyList = () =>
    requests({
        url: `/recommend/resource`,
        method: 'get',
        withCredentials: true,
    });
// !每日推荐歌曲
export const reqDailyRecMusic = () =>
    requests({
        url: `/recommend/songs`,
        method: 'get',
        withCredentials: true,
    });
// !新歌（华语）
export const reqNewMusic = () =>
    requests({
        url: `/top/song?type=7`,
        method: 'get',
        withCredentials: true,
    });
// !新碟（华语）
export const reqNewAlbum = () =>
    requests({
        url: `/album/new?area=ZH&limit=50`,
        method: 'get',
        withCredentials: true,
    });
// !数字专辑
export const reqDigitalAlbum = () =>
    requests({
        url: `/album/list?limit=50`,
        method: 'get',
        withCredentials: true,
    });
// !榜单（原榜单接口失效，采用数字单曲榜单）
export const reqRankingList = () =>
    requests({
        url: `/album/songsaleboard?albumType=1`,
        method: 'get',
        withCredentials: true,
    });
// !热门话题
export const reqHotTopic = () =>
    requests({
        url: `/hot/topic`,
        method: 'get',
        withCredentials: true,
    });
// #endregion
