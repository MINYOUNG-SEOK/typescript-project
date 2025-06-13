import { useInfiniteQuery } from "@tanstack/react-query"
import { searchItemsByKeyword } from "../apis/searchApi"
import { SearchRequestParams } from "models/search"
import useClientCredentialToken from "./useClientCredentialToken"

const useSearchItemsByKeyword = (params: SearchRequestParams) => {
    const ClientCredentialToken = useClientCredentialToken()

    return useInfiniteQuery({
        queryKey: ["search", params],
        queryFn: ({ pageParam = 0 }) => {
            if (!ClientCredentialToken) throw new Error("no token available")
            return searchItemsByKeyword(ClientCredentialToken, { ...params, offset: pageParam })
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            const nextPageUrl =
                lastPage.tracks?.next ||
                lastPage.artists?.next ||
                lastPage.albums?.next ||
                lastPage.audiobook?.next;

            if (nextPageUrl) {
                const nextOffset = new URL(nextPageUrl).searchParams.get("offset")
                return nextOffset ? parseInt(nextOffset) : undefined
            }
            return undefined;
        },
        enabled: params.q.trim().length > 0,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        staleTime: Infinity,
    })
}

export default useSearchItemsByKeyword;