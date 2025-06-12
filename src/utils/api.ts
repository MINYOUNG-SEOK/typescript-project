import axios from "axios";
import { SPOTIFY_BASE_URL } from "../configs/commonConfig";

const api = axios.create({
    baseURL: SPOTIFY_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        if (config.headers) {
            delete config.headers.Authorization;
        }
    }
    return config;
});

let hasRedirected = false; // 중복 리다이렉트 방지용 플래그

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (
            error.response &&
            error.response.status === 401 &&
            !hasRedirected
        ) {
            hasRedirected = true;

            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            localStorage.removeItem("code_verifier");

            console.warn("401 Unauthorized: Access token expired or invalid. Logging out...");
            window.location.href = "/";
        }
        return Promise.reject(error);
    }
);

export default api;