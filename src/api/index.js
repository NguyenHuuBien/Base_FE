import axios from "axios"
import { BASE_URL_DEV, BASE_URL_PROD } from "./endpoind"
import { fetchRefreshToken } from "src/service/auth";
import { ENVIRONMENT } from "src/constants/api";

const axiosClient = axios.create({
    baseURL: ENVIRONMENT === 'local' ? BASE_URL_DEV : BASE_URL_PROD,
})

axiosClient.interceptors.request.use(
    (config) => {
        const token = window.localStorage.getItem("access_token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    },
    (error) => Promise.reject(error)
)

axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originRequest = error.config;
        if (error?.response?.data?.code === 401 && originRequest._retry) {
            originRequest._retry = true;
            try {
                const res = await fetchRefreshToken();
                const { token } = res.data;
                window.localStorage.setItem("access_token", token);
                originRequest.headers.Authorization = `Bearer ${token}`;
                return axiosClient(originRequest)
            } catch (error) {
                console.log("auth error", error);
            }
        }
    }
)

export default axiosClient;