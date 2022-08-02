import { reqMusicLyric, reqMusicUrl } from '@/Api';
import onplaying from '@/store/OnPlaying';
const onplayingData = onplaying();
import { Toast, Notify } from 'vant';

export function playAll(data) {
    onplayingData.playList = [];
    Toast.loading({
        message: '添加中...',
        forbidClick: true,
        duration: 0,
    });
    var num = 0;
    data.map(async (m) => {
        let urlResult = await reqMusicUrl(m.id);
        let lyricResult = await reqMusicLyric(m.id);
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
        let musicData = {
            play: false,
            playNow: false,
            index: num,
            id: m.id,
            imageUrl: m.al.picUrl,
            title: m.al.name,
            author: m.ar[0].name,
            musicUrl: urlResult.data[0].url,
            lyricDetail: [newLyricArray],
        };
        onplayingData.playList.push(musicData);
        if (musicData.index === 0) {
            musicData.playNow = true;
            musicData.play = true;
        }
        num++;
        judage(data.length, num);
    });

    function judage(length, num) {
        if (length === ++num) {
            onplayingData.judageNow();
            Notify({
                message: '添加成功',
                type: 'success',
                position: 'bottom',
            });
            Toast.clear();
        }
    }
}
