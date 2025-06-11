import { GetCurrentUserPlaylistRequest, GetCurrentUserPlaylistsResponse, GetPlaylistItemsRequest, GetPlaylistItemsResponse, GetPlaylistRequest, Playlist, PlaylistTrack } from "models/playlist"
import api from "../utils/api"

export const getCurrentUserPlaylists = async ({
    limit, offset }: GetCurrentUserPlaylistRequest): Promise<GetCurrentUserPlaylistsResponse> => {
    try {
        const response = await api.get(`/me/playlists`, {
            params: { limit, offset }
        });
        return response.data;
    }
    catch (error) {
        throw new Error("fail to fetch current user playlists")
    }
};

export const getPlaylist = async (params: GetPlaylistRequest): Promise<Playlist> => {
    try {
        const response = await api.get(`/playlists/${params.playlist_id}`, {
            params,
        });
        return response.data;
    }
    catch (error) {
        throw new Error("fail to fetch playlist detail")
    }
}


export const getPlaylistItems = async (params: GetPlaylistItemsRequest): Promise<GetPlaylistItemsResponse> => {
    const { playlist_id, ...query } = params;
    const response = await api.get(`/playlists/${playlist_id}/tracks`, {
        params: query,
    });
    return response.data;
};