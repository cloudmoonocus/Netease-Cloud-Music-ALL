// !数字单位转换

export function formatNumber(num) {
    num = Number(num);
    if (num == 0) {
        return num + '';
    } else if (num > 1 && num < 10000) {
        return num + '';
    } else if (num >= 10000 && num < 99999999) {
        return (num / 10000).toFixed(1) + '万';
    } else if (num > 99999999) {
        return (num / 100000000).toFixed(1) + '亿';
    }
}
