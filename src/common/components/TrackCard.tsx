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
            className="card-root"
            sx={{
                position: 'relative',
                '&:hover .overlay-btn': { opacity: 1 },
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    borderRadius: 2,
                    overflow: 'hidden',
                }}
            >
                <Box
                    component="img"
                    src={track.album?.images?.[0]?.url || fallbackImage}
                    alt={track.name}
                    sx={{
                        width: '100%',
                        aspectRatio: '1 / 1',
                        objectFit: 'cover',
                        display: 'block',
                        borderRadius: 2,
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

            <Box mt={0.5}>
                <Typography fontSize="0.9rem" fontWeight={600} noWrap>
                    {track.name}
                </Typography>
                <Typography fontSize="0.8rem" color="text.secondary" noWrap>
                    {track.artists?.map(a => a.name).join(', ')}
                </Typography>
            </Box>

            <MoreMenu
                anchorEl={menuAnchor}
                onClose={closeMenu}
                track={track}
                isLogin={isLogin}
            />
        </Box>
    );
}