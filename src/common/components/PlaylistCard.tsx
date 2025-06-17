import React from 'react';
import { Box, Typography } from '@mui/material';
import { SimplifiedPlaylist } from '../../models/playlist';
import PlayButton from '../../common/components/PlayButton';
import fallbackImage from '../../assets/no-image.jpg';

interface PlaylistCardProps {
    playlist: SimplifiedPlaylist;
}

export default function PlaylistCard({ playlist }: PlaylistCardProps) {
    return (
        <Box
            width={180}
            flexShrink={0}
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            sx={{
                position: 'relative',
                '&:hover .overlay-btn': {
                    opacity: 1,
                },
                cursor: 'pointer',
            }}
        >
            {/* 이미지 + Play 버튼 */}
            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    borderRadius: 1,
                    overflow: 'hidden',
                }}
            >
                <Box
                    component="img"
                    src={playlist.images?.[0]?.url || fallbackImage}
                    alt={playlist.name}
                    sx={{
                        width: '100%',
                        aspectRatio: '1',
                        objectFit: 'cover',
                        borderRadius: 1,
                        display: 'block',
                    }}
                />

                <Box
                    className="overlay-btn"
                    sx={{
                        position: 'absolute',
                        bottom: 8,
                        left: 8,
                        opacity: 0,
                        transition: 'opacity 0.2s ease-in-out',
                    }}
                >
                    <PlayButton hover />
                </Box>
            </Box>

            {/* 텍스트 */}
            <Typography
                variant="subtitle2"
                noWrap
                sx={{ mt: 1, width: '100%', textAlign: 'left' }}
            >
                {playlist.name}
            </Typography>
            <Typography
                variant="body2"
                color="text.secondary"
                noWrap
                sx={{ width: '100%', textAlign: 'left' }}
            >
                By {playlist.owner?.display_name}
            </Typography>
        </Box>
    );
}