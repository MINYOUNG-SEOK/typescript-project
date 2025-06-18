// src/common/components/MyPlaylistSubMenu.tsx
import React, { useState, useCallback } from 'react'
import {
    Popper,
    Paper,
    ClickAwayListener,
    MenuList,
    MenuItem,
    Typography,
    CircularProgress,
    Snackbar,
    Alert,
    Box,
} from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useQueryClient } from '@tanstack/react-query'
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile'
import useInfinitePlaylists from '../../hooks/useInfinitePlaylists'
import useAddTracksToPlaylist from '../../hooks/useAddTracksToPlaylist'
import { getPlaylistItems } from '../../apis/playlistApi'
import { ConfirmAddDialog } from './ConfirmAddDialog'
import { Track } from '../../models/track'

interface Props {
    anchorEl: HTMLElement | null
    open: boolean
    onClose: () => void
    isLogin: boolean
    track: Track
}

export default function MyPlaylistSubMenu({
    anchorEl,
    open,
    onClose,
    isLogin,
    track,
}: Props) {
    const queryClient = useQueryClient()
    const [snackOpen, setSnackOpen] = useState(false)
    const [confirmOpen, setConfirmOpen] = useState(false)
    const [pendingPlaylistId, setPendingPlaylistId] = useState<string>('')

    const { data: user } = useGetCurrentUserProfile()
    const isLoggedIn = Boolean(user)

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
        useInfinitePlaylists()

    const addTracks = useAddTracksToPlaylist()

    // 실제 추가 로직
    const handleAdd = (playlistId: string) => {
        addTracks.mutate(
            { playlist_id: playlistId, uris: [track.uri], position: 0 }, // 최상단으로
            {
                onSuccess: () => {
                    setSnackOpen(true)
                    queryClient.invalidateQueries({ queryKey: ['current-user-playlists'] })
                    onClose()
                },
            }
        )
    }

    // 클릭 시 중복 확인
    const handleClick = async (playlistId: string) => {
        try {
            const res = await getPlaylistItems({ playlist_id: playlistId, limit: 100, offset: 0 })
            const exists = res.items.some(item => item.track.uri === track.uri)
            if (exists) {
                setPendingPlaylistId(playlistId)
                setConfirmOpen(true)
            } else {
                handleAdd(playlistId)
            }
        } catch {
            // 에러 시 바로 추가
            handleAdd(playlistId)
        }
    }

    const handleScroll = useCallback(
        (e: React.UIEvent<HTMLElement>) => {
            const el = e.currentTarget
            if (
                el.scrollTop + el.clientHeight >= el.scrollHeight - 50 &&
                hasNextPage &&
                !isFetchingNextPage
            ) {
                fetchNextPage()
            }
        },
        [fetchNextPage, hasNextPage, isFetchingNextPage]
    )

    return (
        <>
            <Popper open={open} anchorEl={anchorEl} placement="right-start">
                <Paper
                    sx={{ width: 300, maxHeight: 400, overflowY: 'auto' }}
                    onScroll={handleScroll}
                >
                    <ClickAwayListener onClickAway={onClose}>
                        {isLoggedIn ? (
                            <MenuList dense>
                                {data?.pages.flatMap(p => p.items).map(pl => (
                                    <MenuItem key={pl.id} onClick={() => handleClick(pl.id)}>
                                        {pl.name}
                                    </MenuItem>
                                ))}
                                {isFetchingNextPage && (
                                    <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                                        <CircularProgress size={20} />
                                    </Box>
                                )}
                            </MenuList>
                        ) : (
                            <Box p={2}>
                                <Typography variant="subtitle1" fontWeight="bold">
                                    플레이리스트를 만드세요.
                                </Typography>
                                <Typography variant="body2">
                                    로그인 후 이용해 주세요.
                                </Typography>
                            </Box>
                        )}
                    </ClickAwayListener>
                </Paper>
            </Popper>

            <Snackbar
                open={snackOpen}
                autoHideDuration={2000}
                onClose={() => setSnackOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setSnackOpen(false)}
                    severity="success"
                    variant="filled"
                    icon={<CheckCircleIcon fontSize="inherit" />}
                    sx={{ width: '100%', backgroundColor: '#1db954', borderRadius: 2 }}
                >
                    Added to Playlist
                </Alert>

            </Snackbar>

            <ConfirmAddDialog
                open={confirmOpen}
                onClose={() => setConfirmOpen(false)}
                onConfirm={() => {
                    handleAdd(pendingPlaylistId)
                    setConfirmOpen(false)
                }}
            />
        </>
    )
}