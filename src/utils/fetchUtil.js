import server from '../config/server';

export function fetchGet(url, query={}, option = {}) {
    let isOk;
    let serializeQuery = serialize(query);
    let finalUrl = `${server.backend}${url}` + (serializeQuery?`?${serializeQuery}`:'');
    console.log('%c start:  ' + finalUrl, 'color: green');
    return new Promise((resolve, reject) => {
        fetch(finalUrl, {
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        })
            .then((response) => {
                isOk = !!response.ok
                return response.json();
            })
            .then((responseData) => {
                if (isOk) {
                    resolve(responseData);
                } else {
                    reject(responseData);
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}


export function fetchPost(url) {

}

export function fetchPut(url) {

}

export function fetchDelete(url) {

}

export function serialize(obj) {
    var str = [];
    for (var p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
}