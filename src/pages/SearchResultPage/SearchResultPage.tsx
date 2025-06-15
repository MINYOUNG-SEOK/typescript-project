import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, CircularProgress, Alert } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import useSearchItemsByKeyword from '../../hooks/useSearchItemsByKeyword';
import { SEARCH_TYPE } from '../../models/search';
import SearchResultList from '../PlaylistDetailPage/components/SearchResultList';

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
  } = useSearchItemsByKeyword({ q, type: [SEARCH_TYPE.Track, SEARCH_TYPE.Artist, SEARCH_TYPE.Album] });

  const tracks = data?.pages.flatMap(p => p.tracks?.items ?? []) ?? [];
  const artists = data?.pages.flatMap(p => p.artists?.items ?? []) ?? [];
  const albums = data?.pages.flatMap(p => p.albums?.items ?? []) ?? [];

  const topArtist = artists[0];
  const topTrack = tracks[0];
  const topAlbum = albums[0];

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
    <Box p={2} maxWidth={1400} mx="auto">
      <SearchResultList
        topArtist={topArtist}
        topTrack={topTrack}
        topAlbum={topAlbum}
        tracks={tracks}
        artists={artists}
        albums={albums}
      />
      {/* 무한스크롤용 ref: Songs LoadMore 하단에 걸려있음 */}
      <Box ref={ref} />
    </Box>
  );
}