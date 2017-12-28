/**
 * 获得url的appName
 * @return {string}      app名字
 */
export function getUrlParam(param) {
    const search = window.location.search.slice(1);
    const querys = search.split('&');
    const urlParams = {};
    querys.forEach((query) => {
        const arr = query.split('=');
        urlParams[arr[0]] = arr[1];
    });

    return urlParams[param] ?
            window.decodeURIComponent(urlParams[param]) : undefined;
}
