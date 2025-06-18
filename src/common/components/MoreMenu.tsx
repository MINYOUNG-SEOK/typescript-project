import React, { useState } from 'react'
import {
    Popper,
    Paper,
    ClickAwayListener,
    MenuList,
    MenuItem,
    ListItemText,
    ListItemIcon,
    IconButton,
} from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import AddIcon from '@mui/icons-material/Add'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import QueueMusicIcon from '@mui/icons-material/QueueMusic'
import ShareIcon from '@mui/icons-material/Share'
import LinkIcon from '@mui/icons-material/Link'
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'
import MyPlaylistSubMenu from './MyPlaylistSubMenu'
import { Track } from '../../models/track'

interface MoreMenuProps {
    anchorEl: HTMLElement | null
    onClose: () => void
    isLogin: boolean
    track: Track
}

export default function MoreMenu({
    anchorEl,
    onClose,
    isLogin,
    track,
}: MoreMenuProps) {
    const [subOpen, setSubOpen] = useState(false)

    const toggleSub = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation()
        setSubOpen(v => !v)
    }

    return (
        <>
            <Popper open={Boolean(anchorEl)} anchorEl={anchorEl} placement="top-end">                <ClickAwayListener onClickAway={onClose}>
                <Paper sx={{ backgroundColor: '#f2f2f2' }}>
                    <MenuList dense>
                        <MenuItem onClick={toggleSub}>
                            <ListItemText>플레이리스트에 추가</ListItemText>
                            <ListItemIcon><PlaylistAddIcon fontSize="small" /></ListItemIcon>
                        </MenuItem>
                        <MenuItem>
                            <ListItemText>즐겨찾는 노래에 저장</ListItemText>
                            <ListItemIcon><AddIcon fontSize="small" /></ListItemIcon>
                        </MenuItem>
                        <MenuItem>
                            <ListItemText>바로 다음에 재생</ListItemText>
                            <ListItemIcon><PlayArrowIcon fontSize="small" /></ListItemIcon>
                        </MenuItem>
                        <MenuItem>
                            <ListItemText>마지막 항목 재생</ListItemText>
                            <ListItemIcon><QueueMusicIcon fontSize="small" /></ListItemIcon>
                        </MenuItem>
                        <MenuItem>
                            <ListItemText>공유</ListItemText>
                            <ListItemIcon><ShareIcon fontSize="small" /></ListItemIcon>
                        </MenuItem>
                        <MenuItem>
                            <ListItemText>링크 복사</ListItemText>
                            <ListItemIcon><LinkIcon fontSize="small" /></ListItemIcon>
                        </MenuItem>
                    </MenuList>
                </Paper>
            </ClickAwayListener>
            </Popper>

            <MyPlaylistSubMenu
                anchorEl={anchorEl}
                open={subOpen}
                onClose={() => setSubOpen(false)}
                track={track}
                isLogin={isLogin}
            />
        </>
    )
}