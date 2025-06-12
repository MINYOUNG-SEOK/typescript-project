import { useInfiniteQuery } from "@tanstack/react-query";
import { getPlaylistItems } from "../apis/playlistApi";
import { GetPlaylistItemsRequest } from "../models/playlist";

const PAGE_SIZE = 10;

const useGetPlaylistItems = (params: GetPlaylistItemsRequest) => {
    return useInfiniteQuery({
        queryKey: ['playlist-items', params.playlist_id],
        queryFn: async ({ pageParam = 0 }) => {
            const response = await getPlaylistItems({
                ...params,
                offset: pageParam,
                limit: PAGE_SIZE,
            });
            return response;
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            const loaded = allPages.reduce((acc, page) => acc + page.items.length, 0);
            return loaded < lastPage.total ? loaded : undefined;
        }
    });
};

export default useGetPlaylistItems;