import React from 'react';
import { Box, Typography } from '@mui/material';
import { Show } from '../../models/track';
import PlayButton from '../../common/components/PlayButton';
import fallbackImage from '../../assets/no-image.jpg';

interface ShowCardProps {
    show: Show;
}

export default function ShowCard({ show }: ShowCardProps) {
    return (
        <Box
            width={{ xs: 120, md: 180 }}
            flexShrink={0}
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            sx={{
                position: 'relative',
                '&:hover .overlay-btn': { opacity: 1 },
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
                    src={show.images?.[0]?.url || fallbackImage}
                    alt={show.name}
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
            <Typography
                variant="subtitle2"
                noWrap
                sx={{ mt: 1, width: '100%', textAlign: 'left' }}
            >
                {show.name}
            </Typography>
            <Typography
                variant="body2"
                color="text.secondary"
                noWrap
                sx={{ width: '100%', textAlign: 'left' }}
            >
                {show.publisher}
            </Typography>
        </Box>
    );
}