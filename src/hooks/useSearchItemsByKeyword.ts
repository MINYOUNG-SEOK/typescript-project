import { useInfiniteQuery } from "@tanstack/react-query"
import { searchItemsByKeyword } from "../apis/searchApi"
import { SearchRequestParams, SearchResponse } from "models/search"
import useClientCredentialToken from "./useClientCredentialToken"

const useSearchItemsByKeyword = (params: SearchRequestParams) => {
    const token = useClientCredentialToken()

    return useInfiniteQuery<
        SearchResponse,                       // 1) queryFn 페이지 반환 타입
        Error,                                // 2) 에러 타입
        SearchResponse,                       // 3) select 후 최종 데이터 타입
        ["search", SearchRequestParams],      // 4) queryKey 튜플 타입
        number                                // 5) pageParam 의 타입 (여기에 number 명시!)
    >({
        queryKey: ["search", params],
        queryFn: async ({ pageParam = 0 }) => {
            if (!token) throw new Error("no token available")
            return searchItemsByKeyword(token, {
                ...params,
                offset: pageParam,
            })
        },
        getNextPageParam: lastPage => {
            const nextUrl = lastPage.tracks?.next
            if (!nextUrl) return undefined
            const off = new URL(nextUrl).searchParams.get("offset")
            return off ? parseInt(off, 10) : undefined
        },
        initialPageParam: 0,
        enabled: params.q.trim().length > 0,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        staleTime: Infinity,
    })
}

export default useSearchItemsByKeyword