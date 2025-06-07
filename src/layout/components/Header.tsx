import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import LoginButton from '../../common/components/LoginButton';
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile';

const HeaderContainer = styled('header')({
    position: 'fixed',
    top: 0, left: 0, right: 0,
    height: 64,
    backgroundColor: '#fff',
    borderBottom: '1px solid #e5e5e5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 24px',
    zIndex: 1100,
});

const ProfileContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
});

interface HeaderProps {
    isMobile: boolean;
    toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ isMobile, toggleSidebar }) => {
    const accessToken = !!localStorage.getItem("access_token");
    const { data: userProfile } = useGetCurrentUserProfile();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    const handleHelp = () => {
        window.open('https://support.spotify.com/', '_blank');
        handleMenuClose();
    };

    const handleSettings = () => {
        window.open('https://spotify.com/kr-ko/account/overview/', '_blank');
        handleMenuClose();
    };

    const handleLogout = () => {
        handleMenuClose();
        if (window.confirm('로그아웃 하시겠습니까?')) {
            localStorage.removeItem('access_token');
            window.location.reload();
        }
    };

    return (
        <HeaderContainer>
            <Box display="flex" alignItems="center" gap={1}>
                {isMobile
                    ? <IconButton onClick={toggleSidebar}><MenuIcon /></IconButton>
                    : (
                        <ButtonBase
                            component={NavLink}
                            to="/"
                            sx={{ textDecoration: 'none', color: 'inherit', '&.active': { color: 'inherit' } }}
                        >
                            <Typography fontSize="1.4rem" fontWeight={700}>Lime Music</Typography>
                        </ButtonBase>
                    )
                }
            </Box>

            {accessToken ? (
                <ProfileContainer>
                    <Avatar
                        src={userProfile?.images?.[0]?.url}
                        alt={userProfile?.display_name ?? 'User'}
                        onClick={handleMenuOpen}
                        sx={{
                            width: { xs: 30, sm: 35, md: 40 },
                            height: { xs: 30, sm: 35, md: 40 },
                        }}
                    />
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleMenuClose}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                        keepMounted
                        slotProps={{
                            paper: {
                                sx: {
                                    minWidth: { xs: 150, sm: 200, md: 240 },
                                    py: 0,
                                    '& .MuiList-root': { pt: 0, pb: 0 },
                                }
                            },
                            list: {
                                autoFocus: false,
                                autoFocusItem: false,
                            }
                        }}
                    >
                        <MenuItem
                            onClick={handleHelp}
                            disableRipple
                            sx={{
                                borderBottom: '1px solid #ddd',
                                '&:last-of-type': { borderBottom: 0 },
                                '&:hover': { backgroundColor: '#f2f2f2' },
                            }}
                        >
                            도움말
                        </MenuItem>
                        <MenuItem
                            onClick={handleSettings}
                            disableRipple
                            sx={{
                                borderBottom: '1px solid #ddd',
                                '&:last-of-type': { borderBottom: 0 },
                                '&:hover': { backgroundColor: '#f2f2f2' },
                            }}
                        >
                            내 계정
                        </MenuItem>
                        <MenuItem
                            onClick={handleLogout}
                            disableRipple
                            sx={{
                                borderBottom: '1px solid #ddd',
                                '&:last-of-type': { borderBottom: 0 },
                                '&:hover': { backgroundColor: '#f2f2f2' },
                            }}
                        >
                            로그아웃
                        </MenuItem>
                    </Menu>
                </ProfileContainer>
            ) : (
                <LoginButton />
            )}
        </HeaderContainer>
    );
};

export default Header;