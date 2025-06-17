import React, { useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Track } from '../../models/track';
import PlayButton from '../../common/components/PlayButton';
import MoreMenu from './MoreMenu';
import fallbackImage from '../../assets/no-image.jpg';

interface TrackCardProps {
    track: Track;
    isLogin: boolean;
}

export default function TrackCard({ track, isLogin }: TrackCardProps) {
    const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

    const openMenu = (e: React.MouseEvent) => {
        e.stopPropagation();
        setMenuAnchor(e.currentTarget);
    };

    const closeMenu = () => setMenuAnchor(null);

    return (
        <Box
            width={180}
            flexShrink={0}
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            sx={{
                position: 'relative',
                '&:hover .overlay-btn': { opacity: 1 },
                '&:hover .more-btn': { opacity: 1 },
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
                    src={track.album?.images?.[0]?.url || fallbackImage}
                    alt={track.name}
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

                {/* ... 아이콘 */}
                <IconButton
                    className="more-btn"
                    onClick={openMenu}
                    sx={{
                        position: 'absolute',
                        bottom: 8,
                        right: 8,
                        opacity: 0,
                        transition: 'opacity 0.2s ease-in-out',
                        color: '#fff',
                        backgroundColor: 'rgba(0,0,0,0.4)',
                        '&:hover': { backgroundColor: 'rgba(0,0,0,0.6)' },
                    }}
                >
                    <MoreHorizIcon />
                </IconButton>
            </Box>

            <Typography variant="subtitle2" noWrap sx={{ mt: 1, width: '100%', textAlign: 'left' }}>
                {track.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap sx={{ width: '100%', textAlign: 'left' }}>
                {track.artists?.map(a => a.name).join(', ')}
            </Typography>

            <MoreMenu
                anchorEl={menuAnchor}
                onClose={closeMenu}
                track={track}
                isLogin={isLogin}
            />
        </Box>
    );
}