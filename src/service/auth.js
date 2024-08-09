import axiosClient from "src/api";
import { AUTH } from "src/api/endpoind";

export const fetchLogin = async (payload) => {
    try {
        const response = await axiosClient.post(
            AUTH.LOGIN,
            { ...payload }
        )

        return response.data
    } catch (err) {
        console.log("Login error ===>>>", err);
    }
}

export const fetchRegister = async (payload) => {
    try {
        const response = await axiosClient.post(
            AUTH.REGISTER,
            { ...payload }
        )

        return response.data
    } catch (err) {
        console.log("Register error ===>>>", err);
    }
}

export const fetchLogout = async () => {
    try {
        const response = await axiosClient.delete(AUTH.LOGOUT)

        return response.data
    } catch (err) {
        console.log("Logout error ===>>>", err);
    }
}

export const fetchRefreshToken = async () => {
    try {
        const refreshToken = window.localStorage.getItem("refresh_token");
        const response = await axiosClient.post(AUTH.REFRESH_TOKEN, {
            headers: { Authorization: `Bearer ${refreshToken}` }
        })

        return response.data
    } catch (err) {
        console.log("Refresh token error ===>>>", err);
    }
}