import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getCategoryPlaylists } from "../apis/albumApi";
import useClientCredentialToken from "./useClientCredentialToken";
import { GetCategoryPlaylistsResponse } from "../models/categoryPlaylistsResponse";

const useGetCategoryPlaylists = (
    categoryId: string
): UseQueryResult<GetCategoryPlaylistsResponse, Error> => {
    const token = useClientCredentialToken();
    return useQuery<GetCategoryPlaylistsResponse, Error>({
        queryKey: ["category-playlists", categoryId],
        queryFn: () => {
            if (!token) throw new Error("No token available");
            return getCategoryPlaylists(token, categoryId);
        },
        enabled: Boolean(token && categoryId),
    });
};

export default useGetCategoryPlaylists;