import React from 'react';
import { Box, Typography } from '@mui/material';
import { SimplifiedEpisode } from '../../models/episode';
import PlayButton from '../../common/components/PlayButton';
import fallbackImage from '../../assets/no-image.jpg';

interface EpisodeCardProps {
    episode: SimplifiedEpisode;
}

export default function EpisodeCard({ episode }: EpisodeCardProps) {
    return (
        <Box
            className="card-root"
            width={180}
            flexShrink={0}
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            sx={{
                position: 'relative',
                cursor: 'pointer',
                '&:hover .overlay-btn': {
                    opacity: 1,
                    transform: 'translate(0%, 0%)',
                },
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
                    src={episode.images?.[0]?.url || fallbackImage}
                    alt={episode.name}
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
                {episode.name}
            </Typography>
            <Typography
                variant="body2"
                color="text.secondary"
                noWrap
                sx={{ width: '100%', textAlign: 'left' }}
            >
                {episode.description?.slice(0, 50)}...
            </Typography>
        </Box>
    );
}