import React from 'react';
import { Box, Typography } from '@mui/material';
import { SimplifiedAlbum } from '../../models/album';
import PlayButton from '../../common/components/PlayButton';
import fallbackImage from '../../assets/no-image.jpg';

interface AlbumCardProps {
    album: SimplifiedAlbum;
}

export default function AlbumCard({ album }: AlbumCardProps) {
    return (
        <Box
            className="card-root" // ✅ 반드시 필요!
            width={{ xs: 120, md: 180 }}
            flexShrink={0}
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            sx={{
                position: 'relative',
                cursor: 'pointer',
            }}
        >
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
                    src={album.images?.[0]?.url || fallbackImage}
                    alt={album.name}
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
                        transform: 'translate(-20%, 20%)',
                        transition: 'opacity 0.3s ease, transform 0.3s ease',
                        '.card-root:hover &': {
                            opacity: 1,
                            transform: 'translate(0%, 0%)',
                        },
                    }}
                >
                    <PlayButton hover />
                </Box>
            </Box>
            <Typography
                variant="subtitle2"
                noWrap
                sx={{ mt: 1, width: '100%', textAlign: 'left' }}
            >
                {album.name}
            </Typography>
            <Typography
                variant="body2"
                color="text.secondary"
                noWrap
                sx={{ width: '100%', textAlign: 'left' }}
            >
                {album.artists?.map(a => a.name).join(', ')}
            </Typography>
        </Box>
    );
}