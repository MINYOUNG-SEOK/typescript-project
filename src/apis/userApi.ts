import { User } from "../models/user";
import api from "../utils/api";

export const getGetCurrentUserProfile = async (): Promise<User> => {

    try {
        const response = await api.get(`/me`)

        return response.data;
    } catch (error) {
        console.error("[/me] failed:", error);
        throw new Error("fail to fetch user profile");
    }
};

