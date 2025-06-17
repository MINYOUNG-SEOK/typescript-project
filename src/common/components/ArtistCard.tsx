import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import { Artist } from '../../models/artist';
import PlayButton from '../../common/components/PlayButton';
import fallbackImage from '../../assets/no-image.jpg';

interface ArtistCardProps {
    artist: Artist;
}

export default function ArtistCard({ artist }: ArtistCardProps) {
    return (
        <Box
            width={180}
            flexShrink={0}
            display="flex"
            flexDirection="column"
            alignItems="center"
            sx={{
                cursor: 'pointer',
                '&:hover .overlay-btn': {
                    opacity: 1,
                    transform: 'translateY(-8px)',
                },
            }}
        >
            <Box sx={{ position: 'relative' }}>
                <Box
                    sx={{
                        width: 180,
                        height: 180,
                        borderRadius: '50%',
                        overflow: 'hidden',
                    }}
                >
                    <Avatar
                        src={artist.images?.[0]?.url || fallbackImage}
                        alt={artist.name}
                        sx={{
                            width: '100%',
                            height: '100%',
                            display: 'block',
                        }}
                    />
                </Box>

                <Box
                    className="overlay-btn"
                    sx={{
                        position: 'absolute',
                        bottom: -15,
                        left: '10%',
                        transform: 'translate(-50%, 0)',
                        opacity: 0,
                        transition: 'opacity 0.2s ease, transform 0.2s ease',
                    }}
                >
                    <PlayButton hover />
                </Box>
            </Box>

            <Typography
                variant="subtitle1"
                noWrap
                sx={{ mt: 1, width: '100%', textAlign: 'center' }}
            >
                {artist.name}
            </Typography>
        </Box>
    );
}