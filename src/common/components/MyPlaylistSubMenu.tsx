import React from 'react';
import { Menu, MenuItem, Box, Typography } from '@mui/material';
import useInfinitePlaylists from '../../hooks/useInfinitePlaylists';

interface MyPlaylistSubMenuProps {
    anchorEl: HTMLElement | null;
    open: boolean;
    onClose: () => void;
    isLogin: boolean;
}

export default function MyPlaylistSubMenu({
    anchorEl,
    open,
    onClose,
    isLogin,
}: MyPlaylistSubMenuProps) {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfinitePlaylists();

    return (
        <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={onClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        >
            {isLogin ? (
                <Box
                    sx={{ width: 300, maxHeight: 400, overflowY: 'auto' }}
                    onScroll={(e) => {
                        const el = e.currentTarget;
                        if (el.scrollTop + el.clientHeight >= el.scrollHeight - 50 && hasNextPage && !isFetchingNextPage) {
                            fetchNextPage();
                        }
                    }}
                >
                    {/* 플레이리스트 아이템 */}
                    {data?.pages.flatMap(page => page.items).map(p => (
                        <MenuItem key={p.id}>{p.name}</MenuItem>
                    ))}
                    {isFetchingNextPage && <Typography p={2}>로딩중...</Typography>}
                </Box>
            ) : (
                <Box p={2} width={300}>
                    <Typography variant="subtitle1" fontWeight="bold">플레이리스트를 만드세요.</Typography>
                    <Typography variant="body2">공유하려면 로그인하세요.</Typography>
                </Box>
            )}
        </Menu>
    );
}