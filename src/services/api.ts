import axios from "axios";

export const BASE_URL = "http://localhost:8080";

const api = axios.create({
    baseURL: BASE_URL,
});

api.interceptors.request.use(async function (config) {
    try {
        const {data: {accessToken}} = await axios.get<{accessToken:string, refreshToken:string}>("/api/token");
        config.headers.Authorization = `Bearer ${accessToken}`;
    } catch (error) {
        console.error("interceptors: ", error);
    }
    return config;
});

export default api;