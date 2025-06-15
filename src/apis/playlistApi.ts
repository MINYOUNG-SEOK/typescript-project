import { AddTracksToPlaylistRequest, CreatePlaylistRequest, GetCurrentUserPlaylistRequest, GetCurrentUserPlaylistsResponse, GetPlaylistItemsRequest, GetPlaylistItemsResponse, GetPlaylistRequest, Playlist, PlaylistTrack, RemoveTracksFromPlaylistRequest } from "models/playlist"
import api from "../utils/api"
import axios from "axios";

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

export const createPlaylist = async (user_id: string, params: CreatePlaylistRequest): Promise<Playlist> => {
    try {
        const { name, playlistpublic, collaborative, description } = params
        const response = await api.post(`/users/${user_id}/playlists`, {
            name,
            public: playlistpublic,
            collaborative,
            description
        })
        return response.data
    }
    catch (error) {
        throw new Error("fail to create playlist")
    }
}

export const addTracksToPlaylist = async ({
    playlist_id,
    uris,
    position
}: AddTracksToPlaylistRequest): Promise<void> => {
    try {
        await api.post(`/playlists/${playlist_id}/tracks`, { uris, position });
    } catch (error) {
        throw new Error("fail to add tracks to playlist");
    }
};

export const removeTracksFromPlaylist = async (
    params: RemoveTracksFromPlaylistRequest
): Promise<void> => {
    try {
        await api.request({
            method: 'DELETE',
            url: `/playlists/${params.playlist_id}/tracks`,
            data: {
                tracks: params.tracks
            }
        });
    } catch (error) {
        throw new Error('fail to remove tracks from playlist');
    }
};