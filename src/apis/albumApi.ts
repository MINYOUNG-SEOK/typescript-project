import axios from "axios"
import { SPOTIFY_BASE_URL } from "../configs/commonConfig"
import { GetNewReleasesResponse } from "../models/album";
import { GetCategoriesResponse } from "../models/category";
import { GetCategoryPlaylistsResponse } from "../models/categoryPlaylistsResponse";

export const getNewReleases = async (ClientCredentialToken: string): Promise<GetNewReleasesResponse> => {
    try {
        const response = await axios.get(`${SPOTIFY_BASE_URL}/browse/new-releases?limit=6`, {
            headers: {
                Authorization: `Bearer ${ClientCredentialToken}`,
            },
        })
        return response.data;
    } catch (error) {
        throw new Error("Fail to fetch new releases")
    }
}

// 카테고리 리스트 6개
export const getCategories = async (token: string): Promise<GetCategoriesResponse> => {
    const response = await axios.get<GetCategoriesResponse>(
        `${SPOTIFY_BASE_URL}/browse/categories`,
        {
            headers: { Authorization: `Bearer ${token}` },
            params: { limit: 6 },
        }
    );
    return response.data;
};

// 특정 카테고리의 플레이리스트 6개
export const getCategoryPlaylists = async (
    token: string,
    categoryId: string
): Promise<GetCategoryPlaylistsResponse> => {
    const response = await axios.get<GetCategoryPlaylistsResponse>(
        `${SPOTIFY_BASE_URL}/browse/categories/${categoryId}/playlists`,
        {
            headers: { Authorization: `Bearer ${token}` },
            params: { limit: 6 },
        }
    );
    return response.data;
};