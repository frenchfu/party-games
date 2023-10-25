

/**
 * 下載檔案
 * @param {*} data 檔案串流內容
 * @param {*} type 下載檔案格式
 * @param {*} filename 檔名
 */
export const downloadFile = (data, type, filename) => {
    let blob = new Blob([data], { type: type });
    let link = document.createElement('a');
    // 針對IE做處理
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveBlob(blob, filename);
    } else {
        link.href = window.URL.createObjectURL(blob);
        link.download = filename;
        link.click();
        window.URL.revokeObjectURL(link.href);
        link = null;
    }
}

export const getFileName = (path) => {
    if (path) return path.split('/')[path.split('/').length - 1];
    else return '';
};