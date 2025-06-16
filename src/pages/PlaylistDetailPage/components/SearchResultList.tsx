import React, { useState, useRef, useEffect } from 'react';
import {
    Box,
    Typography,
    Avatar,
    IconButton,
    Grid,
    CircularProgress,
} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useInView } from 'react-intersection-observer';

import { Track } from '../../../models/track';
import { Artist } from '../../../models/artist';
import { SimplifiedAlbum } from '../../../models/album';

type Props = {
    topArtist?: Artist;
    topTrack?: Track;
    topAlbum?: SimplifiedAlbum;
    tracks: Track[];
    artists: Artist[];
    albums: SimplifiedAlbum[];
};

const SearchResultList: React.FC<Props> = ({
    topArtist,
    topTrack,
    topAlbum,
    tracks,
    artists,
    albums,
}) => {
    const albumsRef = useRef<HTMLDivElement>(null);
    const artistsRef = useRef<HTMLDivElement>(null);

    const [showLeftArtists, setShowLeftArtists] = useState(false);
    const [showRightArtists, setShowRightArtists] = useState(false);
    const [showLeftAlbums, setShowLeftAlbums] = useState(false);
    const [showRightAlbums, setShowRightAlbums] = useState(false);

    // infinite scroll for tracks
    const { ref: loadMoreRef, inView } = useInView({ threshold: 0 });
    const [visibleCount, setVisibleCount] = useState(20);

    // load more when last item in view
    useEffect(() => {
        if (inView && visibleCount < tracks.length) {
            setVisibleCount(prev => prev + 20);
        }
    }, [inView, tracks.length, visibleCount]);

    const visibleTracks = tracks.slice(0, visibleCount);

    const updateArrows = (
        ref: HTMLDivElement | null,
        setLeft: (v: boolean) => void,
        setRight: (v: boolean) => void
    ) => {
        if (!ref) return;
        const { scrollLeft, scrollWidth, clientWidth } = ref;
        setLeft(scrollLeft > 0);
        setRight(scrollLeft + clientWidth < scrollWidth - 1);
    };

    const onScrollArtists = () =>
        updateArrows(artistsRef.current, setShowLeftArtists, setShowRightArtists);
    const onScrollAlbums = () =>
        updateArrows(albumsRef.current, setShowLeftAlbums, setShowRightAlbums);

    const scroll = (ref: HTMLDivElement | null, offset: number) => {
        if (ref) ref.scrollBy({ left: offset, behavior: 'smooth' });
    };

    useEffect(() => {
        updateArrows(artistsRef.current, setShowLeftArtists, setShowRightArtists);
    }, [artists]);

    useEffect(() => {
        updateArrows(albumsRef.current, setShowLeftAlbums, setShowRightAlbums);
    }, [albums]);

    return (
        <Box>
            {/* 인기 검색 결과 */}
            <Box mb={8}>
                <Typography
                    mb={1}
                    variant="h6"
                    fontWeight="bold"
                >
                    인기 검색 결과
                </Typography>
                <Grid container spacing={2}>
                    {topArtist && (
                        <Grid item xs={12} sm={4}>
                            <Box
                                sx={{
                                    width: 280,
                                    height: 88,
                                    bgcolor: '#f5f5f5',
                                    display: 'flex',
                                    alignItems: 'center',
                                    p: 2,
                                    borderRadius: 2,
                                }}
                            >
                                <Avatar
                                    src={topArtist.images?.[0]?.url}
                                    sx={{ width: 60, height: 60, mr: 2 }}
                                />
                                <Box>
                                    <Typography fontWeight="bold">{topArtist.name}</Typography>
                                    <Typography variant="body2" color="text.secondary">아티스트</Typography>
                                </Box>
                            </Box>
                        </Grid>
                    )}

                    {topAlbum && (
                        <Grid item xs={12} sm={4}>
                            <Box
                                sx={{
                                    width: 280,
                                    height: 88,
                                    bgcolor: '#f5f5f5',
                                    display: 'flex',
                                    alignItems: 'center',
                                    p: 2,
                                    borderRadius: 2,
                                }}
                            >
                                <Avatar
                                    variant="square"
                                    src={topAlbum.images?.[0]?.url}
                                    sx={{ width: 60, height: 60, mr: 2, borderRadius: 1 }}
                                />
                                <Box>
                                    <Typography fontWeight="bold">{topAlbum.name}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        앨범 • {topAlbum.artists?.[0]?.name}
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                    )}

                    {topTrack && (
                        <Grid item xs={12} sm={4}>
                            <Box
                                sx={{
                                    width: 280,
                                    height: 88,
                                    bgcolor: '#f5f5f5',
                                    display: 'flex',
                                    alignItems: 'center',
                                    p: 2,
                                    borderRadius: 2,
                                }}
                            >
                                <Avatar
                                    variant="square"
                                    src={topTrack.album?.images?.[0]?.url}
                                    sx={{ width: 60, height: 60, mr: 2, borderRadius: 1 }}
                                />
                                <Box>
                                    <Typography fontWeight="bold">{topTrack.name}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        노래 • {topTrack.artists?.[0]?.name}
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                    )}
                </Grid>
            </Box>

            {/* 아티스트 리스트 */}
            {artists.length > 0 && (
                <Box mb={6} position="relative">
                    <Typography mb={1} variant="h6" fontWeight="bold">
                        아티스트
                    </Typography>

                    {showLeftArtists && (
                        <IconButton
                            onClick={() => scroll(artistsRef.current, -240)}
                            sx={{
                                position: 'absolute', top: '50%', left: 0,
                                transform: 'translateY(-50%)', zIndex: 1,
                                bgcolor: 'rgba(255,255,255,0.8)', '&:hover': { bgcolor: 'rgba(255,255,255,1)' },
                                boxShadow: 1,
                            }}
                        >
                            <ChevronLeftIcon />
                        </IconButton>
                    )}

                    <Box
                        ref={artistsRef}
                        onScroll={onScrollArtists}
                        sx={{
                            display: 'flex', width: '100%', flexWrap: 'nowrap', gap: 3,
                            overflowX: 'auto', '&::-webkit-scrollbar': { display: 'none' },
                            scrollbarWidth: 'none', msOverflowStyle: 'none', py: 1,
                        }}
                    >
                        {artists.map(artist => (
                            <Box key={artist.id} sx={{ flex: '0 0 auto', textAlign: 'center' }}>
                                <Avatar
                                    src={artist.images?.[0]?.url}
                                    sx={{ width: 120, height: 120, mx: 'auto' }}
                                />
                                <Typography
                                    noWrap
                                    sx={{ maxWidth: 120, mx: 'auto', mt: 1 }}
                                >
                                    {artist.name}
                                </Typography>
                            </Box>
                        ))}
                    </Box>

                    {showRightArtists && (
                        <IconButton
                            onClick={() => scroll(artistsRef.current, 240)}
                            sx={{
                                position: 'absolute', top: '50%', right: 0,
                                transform: 'translateY(-50%)', zIndex: 1,
                                bgcolor: 'rgba(255,255,255,0.8)', '&:hover': { bgcolor: 'rgba(255,255,255,1)' },
                                boxShadow: 1,
                            }}
                        >
                            <ChevronRightIcon />
                        </IconButton>
                    )}
                </Box>
            )}

            {/* 앨범 리스트 */}
            {albums.length > 0 && (
                <Box mb={6} position="relative">
                    <Typography
                        mb={1}
                        variant="h6"
                        fontWeight="bold"
                    >
                        앨범
                    </Typography>

                    {showLeftAlbums && (
                        <IconButton
                            onClick={() => scroll(albumsRef.current, -240)}
                            sx={{
                                position: 'absolute', top: '50%', left: 0,
                                transform: 'translateY(-50%)', zIndex: 1,
                                bgcolor: 'rgba(255,255,255,0.8)', '&:hover': { bgcolor: 'rgba(255,255,255,1)' },
                                boxShadow: 1,
                            }}
                        >
                            <ChevronLeftIcon />
                        </IconButton>
                    )}

                    <Box
                        ref={albumsRef}
                        onScroll={onScrollAlbums}
                        sx={{
                            display: 'flex', width: '100%', flexWrap: 'nowrap', gap: 2,
                            overflowX: 'auto', '&::-webkit-scrollbar': { display: 'none' },
                            scrollbarWidth: 'none', msOverflowStyle: 'none', py: 1,
                        }}
                    >
                        {albums.map(album => (
                            <Box key={album.id} sx={{ flex: '0 0 auto', textAlign: 'center' }}>
                                <Avatar
                                    variant="square"
                                    src={album.images?.[0]?.url}
                                    sx={{ width: 120, height: 120, borderRadius: 2, mx: 'auto' }}
                                />
                                <Typography noWrap sx={{ maxWidth: 200, mx: 'auto', mt: 1 }}>
                                    {album.name}
                                </Typography>
                                <Typography variant="caption" color="text.secondary" noWrap sx={{ maxWidth: 200, mx: 'auto' }}>
                                    {album.artists?.[0]?.name}
                                </Typography>
                            </Box>
                        ))}
                    </Box>

                    {showRightAlbums && (
                        <IconButton
                            onClick={() => scroll(albumsRef.current, 240)}
                            sx={{
                                position: 'absolute', top: '50%', right: 0,
                                transform: 'translateY(-50%)', zIndex: 1,
                                bgcolor: 'rgba(255,255,255,0.8)', '&:hover': { bgcolor: 'rgba(255,255,255,1)' },
                                boxShadow: 1,
                            }}
                        >
                            <ChevronRightIcon />
                        </IconButton>
                    )}
                </Box>
            )}

            {/* 곡 리스트 */}
            {tracks.length > 0 && (
                <Box mb={4}>
                    <Typography mb={1} variant="h6" fontWeight="bold">
                        노래
                    </Typography>

                    {visibleTracks.map((track, index) => {
                        const isLast = index === visibleTracks.length - 1;
                        return (
                            <Box
                                key={track.id ?? index}
                                ref={isLast ? loadMoreRef : undefined}
                                display="flex"
                                alignItems="center"
                                py={1}
                            >
                                <Avatar
                                    variant="square"
                                    src={track.album?.images?.[0]?.url}
                                    sx={{ width: 48, height: 48, mr: 2 }}
                                />
                                <Box>
                                    <Typography noWrap>{track.name}</Typography>
                                    <Typography variant="body2" color="text.secondary" noWrap>
                                        {track.artists?.[0]?.name}
                                    </Typography>
                                </Box>
                            </Box>
                        );
                    })}

                    {inView && visibleCount < tracks.length && (
                        <Box textAlign="center" py={2}>
                            <CircularProgress size={24} sx={{ color: "#d9d9d9" }} />
                        </Box>
                    )}
                </Box>
            )}
        </Box>
    );
};

export default SearchResultList;


