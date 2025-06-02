import React from 'react';
import { Outlet } from "react-router-dom";
import { Box, Typography, styled, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import AddIcon from '@mui/icons-material/Add';

const Layout = styled("div")({
    display: "flex",
    height: "100vh",
    padding: "8px",
});

const Sidebar = styled("div")(({ theme }) => ({
    width: "331px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    [theme.breakpoints.down("sm")]: {
        display: "none",
    },
}));

const Panel = styled(Box)(({ theme }) => ({
    borderRadius: "8px",
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    padding: "16px",
}));

const NavList = styled("ul")({
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "16px",
});

const StyledNavLink = styled(NavLink)(({ theme }) => ({
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: "20px",
    color: theme.palette.text.secondary,
    "&:hover, &.active": {
        color: theme.palette.text.primary,
    },
}));

const LibraryHeader = styled(Box)({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "16px",
});

const PlaylistCard = styled(Box)(({ theme }) => ({
    borderRadius: "8px",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    padding: "16px",
    color: "#fff",

}));

const AppLayout = () => {
    return (
        <Layout>
            <Sidebar>
                <Panel>
                    <NavList>
                        <li>
                            <StyledNavLink to="/" end>
                                <HomeIcon />
                                <Typography variant="body1" fontWeight={700}>Home</Typography>
                            </StyledNavLink>
                        </li>
                        <li>
                            <StyledNavLink to="/search">
                                <SearchIcon />
                                <Typography variant="body1" fontWeight={700}>Search</Typography>
                            </StyledNavLink>
                        </li>
                    </NavList>
                </Panel>

                <Panel>
                    <LibraryHeader>
                        <Box display="flex" alignItems="center" gap="20px">
                            <LibraryMusicIcon />
                            <Typography variant="body1" fontWeight={700}>Your Library</Typography>
                        </Box>
                        <AddIcon
                            sx={{
                                color: "#fb5b82",
                                cursor: "pointer",
                                "&:hover": {
                                    color: "#fc9272",
                                },
                            }}
                        />
                    </LibraryHeader>

                    <PlaylistCard>
                        <Typography fontWeight={700} sx={{ fontSize: "1rem" }}>
                            Create your first playlist
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 2 }}>
                            It's easy, we'll help you
                        </Typography>
                        <Button variant="contained" color="secondary" sx={{ borderRadius: "999px", textTransform: "none", fontWeight: 700 }}>
                            Create playlist
                        </Button>
                    </PlaylistCard>
                </Panel>
            </Sidebar>

            <Outlet />
        </Layout>
    );
};

export default AppLayout;