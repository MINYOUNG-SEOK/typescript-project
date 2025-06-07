import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
    styled,
    Typography,
    Drawer,
    useMediaQuery,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import useInfinitePlaylists from "../../hooks/useInfinitePlaylists";
import { motion } from "framer-motion";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useInView } from "react-intersection-observer";
import PlayList from "./PlayList";

const Root = styled("aside")({
    width: 300,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#ffffff",
    borderRight: "1px solid #ddd",
    boxSizing: "border-box",
});

const FixedSection = styled("div")({
    padding: "20px 16px 0",
    flexShrink: 0,
});

const ScrollableSection = styled("div")({
    flexGrow: 1,
    overflowY: "auto",
    padding: "0 16px 16px",
});

const Title = styled(Typography)({
    fontSize: "1.2rem",
    fontWeight: 700,
    marginBottom: "24px",
});

const NavList = styled("ul")({
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "16px",
});

const StyledLink = styled(NavLink)(({ theme }) => ({
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: "16px",
    fontSize: "1rem",
    color: "#222",
    padding: "10px 14px",
    borderRadius: "4px",
    "&.active": {
        backgroundColor: "#f2f2f2",
        color: theme.palette.primary.main,
    },
    "&:hover": {
        backgroundColor: "#f2f2f2",
    },
    "&:visited": {
        color: "#222",
    },
}));

const StyledNavItem = styled("div")({
    display: "flex",
    alignItems: "center",
    gap: "16px",
    fontSize: "1rem",
    color: "#222",
    padding: "10px 14px",
    borderRadius: "4px",
    cursor: "pointer",
    "&:hover": {
        backgroundColor: "#f2f2f2",
    },
});

const PlaylistList = styled("ul")({
    listStyle: "none",
    padding: 0,
    margin: 0,
    marginTop: "12px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
});

interface SidebarProps {
    open: boolean;
    onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
    const isMobile = useMediaQuery("(max-width:900px)");
    const accessToken = localStorage.getItem("access_token");
    const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
    } = useInfinitePlaylists(10);

    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    const content = (
        <Root>
            <FixedSection>
                <Title>Lime Music</Title>
                <NavList>
                    <li>
                        <StyledLink to="/" end onClick={onClose}>
                            <HomeIcon fontSize="small" sx={{ color: "#1db954" }} />
                            <Typography fontSize="1rem" fontWeight={500}>홈</Typography>
                        </StyledLink>
                    </li>
                    <li>
                        <StyledLink to="/search" onClick={onClose}>
                            <SearchIcon fontSize="small" sx={{ color: "#1db954" }} />
                            <Typography fontSize="1rem" fontWeight={500}>검색하기</Typography>
                        </StyledLink>
                    </li>
                    <li>
                        <StyledNavItem onClick={() => setIsPlaylistOpen((prev) => !prev)}>
                            <LibraryMusicIcon fontSize="medium" sx={{ color: "#1db954" }} />
                            <Typography fontSize="1rem" fontWeight={500}>
                                나의 플레이리스트
                            </Typography>
                            <motion.div
                                animate={{ rotate: isPlaylistOpen ? 180 : 0, scale: [1, 1.2, 1] }}
                                transition={{ duration: 0.35, ease: "easeInOut" }}
                                style={{ marginLeft: "auto" }}
                            >
                                <KeyboardArrowDownIcon fontSize="small" />
                            </motion.div>
                        </StyledNavItem>
                    </li>
                </NavList>
            </FixedSection>

            {isPlaylistOpen && (
                <ScrollableSection>
                    {!accessToken ? (
                        <Typography
                            variant="body2"
                            sx={{ color: "text.secondary", mt: 1, pl: "54px" }}
                        >
                            아직 회원이 아니신가요?
                            <br />
                            <a
                                href="https://www.spotify.com/signup/"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    textDecoration: "underline",
                                    color: "#1db954",
                                    fontWeight: 500,
                                }}
                            >
                                라임뮤직 가입하러 가기
                            </a>
                        </Typography>
                    ) : isLoading ? (
                        <Typography sx={{ mt: 1 }}>로딩 중...</Typography>
                    ) : isError ? (
                        <Typography color="error" sx={{ mt: 1 }}>
                            불러오기 실패
                        </Typography>
                    ) : (
                        <PlayList
                            data={data}
                            fetchNextPage={fetchNextPage}
                            hasNextPage={hasNextPage}
                            isFetchingNextPage={isFetchingNextPage}
                            onClose={onClose}
                        />
                    )}
                </ScrollableSection>
            )}
        </Root>
    );

    return isMobile ? (
        <Drawer
            anchor="left"
            open={open}
            onClose={onClose}
            ModalProps={{ keepMounted: true }}
        >
            {content}
        </Drawer>
    ) : (
        content
    );
};

export default Sidebar;