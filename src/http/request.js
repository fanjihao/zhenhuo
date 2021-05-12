import http from "./index";
import QS from "qs"
// http.defaults.baseURL = 'http://192.167.6.130:9000';
// http.defaults.baseURL = 'http://192.167.6.154:9000';
// http.defaults.baseURL = 'http://192.167.6.154:8081';
// http.defaults.baseURL = 'http://192.167.6.130:8081';
// http.defaults.baseURL = 'http://110.89.45.40:1080',
// http.defaults.baseURL = 'http://192..45.40:1080',
http.defaults.baseURL = 'http://192.167.6.18:9000';

http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
export function get(url, params) {
    return new Promise((resolve, reject) => {
        http.get(url, {
            params: params
        }).then(res => {
            resolve(res.data);

        }).catch(err => {
            reject(err.data)
        })
    });
}

export function post(url, params) {
    return new Promise((resolve, reject) => {
        http.post(url, QS.stringify(params))
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}
export default http;