import { useQuery } from "@tanstack/react-query";
import {
    GetCurrentUserPlaylistRequest,
    GetCurrentUserPlaylistsResponse,
} from "models/playlist";
import { getCurrentUserPlaylists } from "../apis/playlistApi";

const useGetCurrentUserPlaylists = (params: GetCurrentUserPlaylistRequest) => {
    const accessToken = localStorage.getItem("access_token")

    return useQuery<GetCurrentUserPlaylistsResponse, Error>({
        queryKey: [
            "current-user-playlists",
            `${params.limit ?? 0}`,
            `${params.offset ?? 0}`,
        ],
        queryFn: () => getCurrentUserPlaylists(params),
        enabled: !!accessToken,
    });
};

export default useGetCurrentUserPlaylists;