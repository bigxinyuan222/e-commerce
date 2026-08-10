// 统一时间格式化工具

/**
 * 格式化日期时间：xxxx年xx月xx日 xx时xx分
 * 今年以内省略年份：xx月xx日 xx时xx分
 */
export function formatDateTime(time: string | number | Date): string {
    if (!time) return '';
    const date = new Date(time);
    if (isNaN(date.getTime())) return String(time);

    const now = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    if (year === now.getFullYear()) {
        return `${month}月${day}日 ${hours}时${minutes}分`;
    }
    return `${year}年${month}月${day}日 ${hours}时${minutes}分`;
}

/**
 * 格式化时间：xx时xx分
 */
export function formatTime(time: string | number | Date): string {
    if (!time) return '';
    const date = new Date(time);
    if (isNaN(date.getTime())) return String(time);

    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}时${minutes}分`;
}
