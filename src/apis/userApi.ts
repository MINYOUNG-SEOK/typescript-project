import { CreatePlaylistRequest, Playlist } from "../models/playlist";
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

export const createPlaylist = async (user_id: string, params: CreatePlaylistRequest): Promise<Playlist> => {
    try {
        const response = await api.post(`/users/${user_id}/playlists`, {
            params
        })
        return response.data
    }
    catch (error) {
        throw new Error("fail to create playlist")
    }
}