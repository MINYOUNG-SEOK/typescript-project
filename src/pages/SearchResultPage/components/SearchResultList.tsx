import React from 'react';
import { Box, Typography } from '@mui/material';

import ArtistCard from '../../../common/components/ArtistCard';
import TrackCard from '../../../common/components/TrackCard';
import AlbumCard from '../../../common/components/AlbumCard';
import PlaylistCard from '../../../common/components/PlaylistCard';
import ShowCard from '../../../common/components/ShowCard';
import EpisodeCard from '../../../common/components/EpisodeCard';
import ScrollRow from '../../../common/components/ScrollRow';

import { Artist } from '../../../models/artist';
import { Track, Show } from '../../../models/track';
import { SimplifiedAlbum } from '../../../models/album';
import { SimplifiedPlaylist } from '../../../models/playlist';
import { SimplifiedEpisode } from '../../../models/episode';

interface TopResult {
    type: 'artist' | 'track' | 'album' | 'playlist';
    data: Artist | Track | SimplifiedAlbum | SimplifiedPlaylist;
}

interface SearchResultListProps {
    topResult: TopResult | null;
    tracks: Track[];
    albums: SimplifiedAlbum[];
    artists: Artist[];
    playlists: SimplifiedPlaylist[];
    shows: Show[];
    episodes: SimplifiedEpisode[];
}

export default function SearchResultList({
    topResult,
    tracks,
    albums,
    artists,
    playlists,
    shows,
    episodes
}: SearchResultListProps) {
    return (
        <Box display="flex" flexDirection="column" gap={6}>

            {/* 상위 결과 */}
            {topResult && (
                <Box>
                    <Typography variant="h6" mb={2}>상위 결과</Typography>
                    {topResult.type === 'artist' && (
                        <ArtistCard artist={topResult.data as Artist} />
                    )}
                    {topResult.type === 'track' && (
                        <TrackCard track={topResult.data as Track} />
                    )}
                    {topResult.type === 'album' && (
                        <AlbumCard album={topResult.data as SimplifiedAlbum} />
                    )}
                    {topResult.type === 'playlist' && (
                        <PlaylistCard playlist={topResult.data as SimplifiedPlaylist} />
                    )}
                </Box>
            )}

            {/* 곡 */}
            {tracks.length > 0 && (
                <ScrollRow title="곡">
                    {tracks.filter(track => track && track.id).slice(0, 20).map(track => (
                        <TrackCard key={track.id} track={track} />
                    ))}
                </ScrollRow>
            )}

            {/* 앨범 */}
            {albums.length > 0 && (
                <ScrollRow title="앨범">
                    {albums.filter(album => album && album.id).slice(0, 20).map(album => (
                        <AlbumCard key={album.id} album={album} />
                    ))}
                </ScrollRow>
            )}

            {/* 아티스트 */}
            {artists.length > 0 && (
                <ScrollRow title="아티스트">
                    {artists.filter(artist => artist && artist.id).slice(0, 20).map(artist => (
                        <ArtistCard key={artist.id} artist={artist} />
                    ))}
                </ScrollRow>
            )}

            {/* 플레이리스트 */}
            {playlists.length > 0 && (
                <ScrollRow title="플레이리스트">
                    {playlists.filter(playlist => playlist && playlist.id).slice(0, 20).map(playlist => (
                        <PlaylistCard key={playlist.id} playlist={playlist} />
                    ))}
                </ScrollRow>
            )}

            {/* 팟캐스트 */}
            {shows.length > 0 && (
                <ScrollRow title="팟캐스트">
                    {shows.filter(show => show && show.id).slice(0, 20).map(show => (
                        <ShowCard key={show.id} show={show} />
                    ))}
                </ScrollRow>
            )}

            {/* 에피소드 */}
            {episodes.length > 0 && (
                <ScrollRow title="에피소드">
                    {episodes.filter(episode => episode && episode.id).slice(0, 20).map(episode => (
                        <EpisodeCard key={episode.id} episode={episode} />
                    ))}
                </ScrollRow>
            )}
        </Box>
    );
}