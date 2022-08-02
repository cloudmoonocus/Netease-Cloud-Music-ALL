import { reqMusicLyric, reqMusicUrl } from '@/Api';
import onplaying from '@/store/OnPlaying';
const onplayingData = onplaying();
import { Toast } from 'vant';

export async function play(id, imageUrl, title, author) {
    Toast.loading({
        message: '添加中...',
        forbidClick: true,
    });
    // 获取点击歌曲的Url
    const urlResult = await reqMusicUrl(id);
    // 获取点击歌曲的歌词
    const lyricResult = await reqMusicLyric(id);
    if (urlResult.code === 200) {
        let newLyricArray = lyricResult.lrc.lyric.split(/[(\r\n)\r\n]+/).map((item) => {
            let minute = item.slice(1, 3);
            let second = item.slice(4, 6);
            let millisecond = item.slice(7, 10);
            let lyric = item.slice(11, item.length);
            if (isNaN(Number(millisecond))) {
                millisecond = item.slice(7, 9);
                lyric = item.slice(10, item.length);
            }
            let time = Number(minute) * 60 + Number(second) + Number(millisecond) / 1000;
            return { minute, second, millisecond, lyric, time };
        });
        newLyricArray.forEach((item, i) => {
            if (i === newLyricArray.length - 1) {
                item.lyric = 'Made By Cloudmoon';
                item.nextTime = 99999;
            } else {
                item.nextTime = newLyricArray[i + 1].time;
            }
        });
        let data = {};
        if (onplayingData.playList.length) {
            for (let index = 0; index < onplayingData.playList.length; index++) {
                onplayingData.playList[index].index++;
                if (onplayingData.playList[index].id === id) {
                    onplayingData.playList.splice(index, 1);
                    for (let index2 = index; index2 < onplayingData.playList.length; index2++) {
                        onplayingData.playList[index2].index--;
                    }
                }
            }
            data = {
                play: true,
                playNow: true,
                index: 0,
                id: id,
                imageUrl: imageUrl,
                title: title,
                author: author,
                musicUrl: urlResult.data[0].url,
                lyricDetail: [newLyricArray],
            };
        } else {
            data = {
                play: true,
                playNow: true,
                index: 0,
                id: id,
                imageUrl: imageUrl,
                title: title,
                author: author,
                musicUrl: urlResult.data[0].url,
                lyricDetail: [newLyricArray],
            };
        }
        onplayingData.playList.push(data);
        onplayingData.judageNow();
    }
}
