import React, { useState } from 'react';
import {
    Menu,
    MenuItem,
    ListItemText,
    ListItemIcon,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import RadioIcon from '@mui/icons-material/Radio';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ShareIcon from '@mui/icons-material/Share';
import LinkIcon from '@mui/icons-material/Link';
import CodeIcon from '@mui/icons-material/Code';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

import MyPlaylistSubMenu from './MyPlaylistSubMenu';

export default function MoreMenu({ anchorEl, onClose, isLogin }) {
    const [playlistAnchor, setPlaylistAnchor] = useState(null);

    return (
        <>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={onClose}
                PaperProps={{
                    sx: {
                        backgroundColor: '#f2f2f2',
                    },
                }}
            >

                <MenuItem
                    onMouseEnter={(e) => setPlaylistAnchor(e.currentTarget)}
                    onMouseLeave={() => setPlaylistAnchor(null)}
                    sx={{ display: 'flex', justifyContent: 'space-between', minWidth: 200 }}
                >
                    <ListItemText>플레이리스트에 추가</ListItemText>
                    <PlaylistAddIcon fontSize="small" />
                </MenuItem>

                <MenuItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <ListItemText>즐겨찾는 노래에 저장</ListItemText>
                    <AddIcon fontSize="small" />
                </MenuItem>

                <MenuItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <ListItemText>바로 다음에 재생</ListItemText>
                    <PlayArrowIcon fontSize="small" />
                </MenuItem>

                <MenuItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <ListItemText>마지막 항목 재생</ListItemText>
                    <QueueMusicIcon fontSize="small" />
                </MenuItem>

                <MenuItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <ListItemText>공유</ListItemText>
                    <ShareIcon fontSize="small" />
                </MenuItem>

                <MenuItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <ListItemText>링크 복사</ListItemText>
                    <LinkIcon fontSize="small" />
                </MenuItem>

            </Menu>

            <MyPlaylistSubMenu
                anchorEl={playlistAnchor}
                open={Boolean(playlistAnchor)}
                onClose={() => setPlaylistAnchor(null)}
                isLogin={isLogin}
            />
        </>
    );
}