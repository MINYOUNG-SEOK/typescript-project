import { useInfiniteQuery } from "@tanstack/react-query";
import {
    GetCurrentUserPlaylistsResponse,
} from "models/playlist";
import { getCurrentUserPlaylists } from "../apis/playlistApi";

const useInfinitePlaylists = (limit: number = 20) => {
    const accessToken = localStorage.getItem("access_token");

    return useInfiniteQuery<GetCurrentUserPlaylistsResponse, Error, GetCurrentUserPlaylistsResponse, string[], number>({
        queryKey: ["current-user-playlists"],
        queryFn: ({ pageParam }) =>
            getCurrentUserPlaylists({ limit, offset: pageParam }),
        getNextPageParam: (lastPage) => {
            const { total, offset, limit } = lastPage;
            const nextOffset = offset + limit;
            return nextOffset < total ? nextOffset : undefined;
        },
        initialPageParam: 0,
        enabled: !!accessToken,
    });
};

export default useInfinitePlaylists;