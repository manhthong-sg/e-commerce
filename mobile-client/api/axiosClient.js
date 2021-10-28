import axios from "axios";
import queryString from "query-string";

const axiosClient = axios.create({
    baseURL: 'http://192.168.1.7:3000/',
    headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
    paramsSerializer: params => queryString.stringify(params)
});

axiosClient.interceptors.request.use(async (config) => config);

axiosClient.interceptors.response.use((res) => {
        if (res && res.data) {
            return res.data;
        }
        return res;
}, (err) => {
    throw err;
});

export default axiosClient; 