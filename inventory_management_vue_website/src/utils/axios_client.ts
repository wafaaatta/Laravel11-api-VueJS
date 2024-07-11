import axios, { AxiosError } from "axios";
import { apiUrl } from "@/constants/app_constants";

import { getAuthenticationToken } from "./authentication";
import ApiError from "./ApiError";

const axiosHttp = axios.create({
    baseURL: apiUrl,
});

axiosHttp.interceptors.request.use((config) => {
    console.log('inside request intercept');
    
    
    const auth_token = getAuthenticationToken()
    console.log(auth_token);
    config.headers['Authorization'] = `Bearer ${auth_token}`
    
    return config;
},(error) => {
    return Promise.reject(error);
})

axiosHttp.interceptors.response.use((response) => {    
    return response
}, (error: AxiosError) => {
    return ApiError.from(error)
})


export default axiosHttp