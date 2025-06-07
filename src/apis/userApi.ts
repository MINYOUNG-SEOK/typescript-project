import axios from "axios"
import { SPOTIFY_BASE_URL } from "../configs/commonConfig"
import { User } from "../models/user";

export const getGetCurrentUserProfile = async (): Promise<User> => {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("No access token");

    try {
        const response = await axios.get(`${SPOTIFY_BASE_URL}/me`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("[/me] failed:", error);
        throw new Error("fail to fetch user profile");
    }
};