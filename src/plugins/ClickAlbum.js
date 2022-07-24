import { reqAlbumDetail } from "@/Api";
import { Toast } from "vant";
import list from "@/store/List";
const listData = list();

export async function getAlbumList(id) {
    Toast.loading({
        message: '加载中...',
    });
    const albumListResult = await reqAlbumDetail(id);
    listData.albumlist = albumListResult.songs;
}
