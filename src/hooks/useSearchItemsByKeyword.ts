import { useInfiniteQuery } from "@tanstack/react-query";
import { searchItemsByKeyword } from "../apis/searchApi";
import { SearchRequestParams, SearchResponse } from "models/search";
import useClientCredentialToken from "./useClientCredentialToken";

const useSearchItemsByKeyword = (params: SearchRequestParams) => {
  const token = useClientCredentialToken();

  return useInfiniteQuery<
    SearchResponse,                // queryFn 반환 타입 (한 페이지 데이터)
    Error,                         // 에러 타입
    SearchResponse,                // select 후 데이터 타입 (동일)
    ["search", SearchRequestParams], // queryKey 타입
    number                         // pageParam 타입 (number: offset)
  >({
    queryKey: ["search", params],

    queryFn: async ({ pageParam = 0 }) => {
      // if (!token) throw new Error("no token available");
      return searchItemsByKeyword(token, {
        ...params,
        offset: pageParam,
      });
    },


    getNextPageParam: (lastPage) => {
      // tracks 우선 → artists → albums 순서로 next URL 가져오기
      const nextUrl =
        lastPage.tracks?.next ||
        lastPage.artists?.next ||
        lastPage.albums?.next;

      if (!nextUrl) return undefined;

      const off = new URL(nextUrl).searchParams.get("offset");
      return off ? parseInt(off, 10) : undefined;
    },

    initialPageParam: 0,

    enabled: params.q.trim().length > 0,
    staleTime: Infinity,
  });
};

export default useSearchItemsByKeyword;