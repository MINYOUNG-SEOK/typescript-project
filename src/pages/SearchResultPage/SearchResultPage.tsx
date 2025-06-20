import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, CircularProgress, Alert } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import useSearchItemsByKeyword from '../../hooks/useSearchItemsByKeyword';
import { SEARCH_TYPE } from '../../models/search';
import SearchResultList from '../SearchResultPage/components/SearchResultList';
import { selectTopResult } from '../../utils/selectTopResult';

export default function SearchResultPage() {
  const { keyword = '' } = useParams<{ keyword: string }>();
  const q = decodeURIComponent(keyword);

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSearchItemsByKeyword({
    q,
    type: [
      SEARCH_TYPE.Track,
      SEARCH_TYPE.Artist,
      SEARCH_TYPE.Album,
      SEARCH_TYPE.Playlist,
      SEARCH_TYPE.Show,
      SEARCH_TYPE.Episode
    ]
  });

  const tracks = data?.pages.flatMap(p => p.tracks?.items ?? []).filter(Boolean) ?? [];
  const albums = data?.pages.flatMap(p => p.albums?.items ?? []).filter(Boolean) ?? [];
  const artists = data?.pages.flatMap(p => p.artists?.items ?? []).filter(Boolean) ?? [];
  const playlists = data?.pages.flatMap(p => p.playlists?.items ?? []).filter(Boolean) ?? [];
  const shows = data?.pages.flatMap(p => p.shows?.items ?? []).filter(Boolean) ?? [];
  const episodes = data?.pages.flatMap(p => p.episodes?.items ?? []).filter(Boolean) ?? [];

  const topResult = selectTopResult({
    artists,
    tracks,
    albums,
    playlists
  });

  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <Box textAlign="center" py={4}>
        <CircularProgress sx={{ color: '#d9d9d9' }} />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box textAlign="center" py={4}>
        <Alert severity="error">
          검색 중 오류가 발생했습니다: {(error as Error).message}
        </Alert>
      </Box>
    );
  }

  return (
    <Box p={0} mx="auto">
      <SearchResultList
        topResult={topResult}
        tracks={tracks}
        albums={albums}
        artists={artists.filter(a => a.id !== topResult?.data?.id)}
        playlists={playlists}
        shows={shows}
        episodes={episodes}
      />
      <Box ref={ref} />
    </Box>
  );
}