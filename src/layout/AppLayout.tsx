import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import {
    Box,
    Typography,
    styled,
    Button,
    useMediaQuery,
    Drawer,
    IconButton,
    ButtonBase,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';

const Layout = styled('div')({
    display: 'flex',
    height: '100vh',
    backgroundColor: '#f9f9f9',
});

const Sidebar = styled('aside')({
    width: 280,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    borderRight: '1px solid #ddd',
    padding: '20px 16px',
    boxSizing: 'border-box',
});

const SidebarTitle = styled(Typography)({
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

const StyledNavLink = styled(NavLink)(({ theme }) => ({
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

const Header = styled('header')({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: 64,
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e5e5e5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 24px',
    zIndex: 1100,
});

const Main = styled('main')({
    flex: 1,
    marginTop: 64,
    padding: '24px',
    overflowY: 'auto',
    backgroundColor: '#fff',
});

const AppLayout = () => {
    const isMobile = useMediaQuery('(max-width:900px)');
    const [open, setOpen] = useState(false);
    const toggleSidebar = () => setOpen((prev) => !prev);

    const SidebarContent = (
        <Sidebar>
            <SidebarTitle>Lime Music</SidebarTitle>
            <NavList>
                <li>
                    <StyledNavLink to="/" end onClick={() => setOpen(false)}>
                        <HomeIcon fontSize="small" sx={{ color: '#1db954' }} />
                        홈
                    </StyledNavLink>
                </li>
                <li>
                    <StyledNavLink to="/search" onClick={() => setOpen(false)}>
                        <SearchIcon fontSize="small" sx={{ color: '#1db954' }} />
                        검색하기
                    </StyledNavLink>
                </li>
                <li>
                    <StyledNavLink to="/playlist" onClick={() => setOpen(false)}>
                        <LibraryMusicIcon fontSize="small" sx={{ color: '#1db954' }} />
                        나의 플레이 리스트
                    </StyledNavLink>
                </li>
            </NavList>
        </Sidebar>
    );

    return (
        <Layout>
            {/* PC 전용 사이드바 */}
            {!isMobile && SidebarContent}

            {/* 헤더 */}
            <Header>
                <Box display="flex" alignItems="center" gap={1}>
                    {isMobile ? (
                        <IconButton onClick={toggleSidebar}>
                            <MenuIcon />
                        </IconButton>
                    ) : (
                        <ButtonBase
                            component={NavLink}
                            to="/"
                            sx={{
                                textDecoration: 'none',
                                color: 'inherit',
                                '&.active': {
                                    color: 'inherit',
                                },
                            }}
                        >
                            <Typography fontSize="1.1rem" fontWeight={700}>
                                Lime Music
                            </Typography>
                        </ButtonBase>
                    )}
                </Box>

                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: '#1db954',
                        color: '#fff',
                        fontWeight: 600,
                        borderRadius: 999,
                        textTransform: 'none',
                        px: 3,
                        boxShadow: 'none',
                        '&:hover': {
                            backgroundColor: '#17a74a',
                            boxShadow: 'none',
                        },
                    }}
                >
                    로그인
                </Button>
            </Header>

            {/* 모바일 전용 Drawer */}
            <Drawer
                anchor="left"
                open={open}
                onClose={toggleSidebar}
                ModalProps={{ keepMounted: true }}
            >
                {SidebarContent}
            </Drawer>

            {/* Main */}
            <Main>
                <Outlet />
            </Main>
        </Layout>
    );
};

export default AppLayout;