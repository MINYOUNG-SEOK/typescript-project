import React from 'react';
import { NavLink } from 'react-router-dom';
import { styled, Typography, Drawer, useMediaQuery } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';

const Root = styled('aside')({
    width: 280,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    borderRight: '1px solid #ddd',
    padding: '20px 16px',
    boxSizing: 'border-box',
});

const Title = styled(Typography)({
    fontSize: '1.4rem',
    fontWeight: 700,
    marginBottom: '24px',
});

const NavList = styled('ul')({
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
});

const StyledLink = styled(NavLink)(({ theme }) => ({
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    fontSize: '0.95rem',
    color: '#222',
    padding: '10px 14px',
    borderRadius: '8px',
    '&.active': {
        backgroundColor: '#f2f2f2',
        color: theme.palette.primary.main,
    },
    '&:hover': {
        backgroundColor: '#f2f2f2',
    },
}));

interface SidebarProps {
    open: boolean;
    onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
    const isMobile = useMediaQuery('(max-width:900px)');

    const content = (
        <Root>
            <Title>Lime Music</Title>
            <NavList>
                <li>
                    <StyledLink to="/" end onClick={onClose}>
                        <HomeIcon fontSize="small" sx={{ color: '#1db954' }} />
                        홈
                    </StyledLink>
                </li>
                <li>
                    <StyledLink to="/search" onClick={onClose}>
                        <SearchIcon fontSize="small" sx={{ color: '#1db954' }} />
                        검색하기
                    </StyledLink>
                </li>
                <li>
                    <StyledLink to="/playlist" onClick={onClose}>
                        <LibraryMusicIcon fontSize="small" sx={{ color: '#1db954' }} />
                        나의 플레이리스트
                    </StyledLink>
                </li>
            </NavList>
        </Root>
    );

    return isMobile
        ? <Drawer anchor="left" open={open} onClose={onClose} ModalProps={{ keepMounted: true }}>{content}</Drawer>
        : content;
};

export default Sidebar;