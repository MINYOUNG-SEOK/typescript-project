import React from 'react';
import { Box, IconButton, ButtonBase, Typography, useMediaQuery, styled, CircularProgress, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';
import LoginButton from '../../common/components/LoginButton';
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile';

const HeaderContainer = styled('header')({
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

interface HeaderProps {
    isMobile: boolean;
    toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ isMobile, toggleSidebar }) => {
    const { data: userProfile, isLoading } = useGetCurrentUserProfile();
    return (
        <HeaderContainer>
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
                            '&.active': { color: 'inherit' },
                        }}
                    >
                        <Typography fontSize="1.1rem" fontWeight={700}>
                            Lime Music
                        </Typography>
                    </ButtonBase>
                )}
            </Box>

            {userProfile ? (
                <Avatar
                    src={userProfile.images?.[0]?.url}
                    alt={userProfile.display_name ?? 'User'}
                    sx={{ width: 32, height: 32 }} />
            ) : (
                <LoginButton />
            )}
        </HeaderContainer>
    );
};

export default Header;