import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { styled, Typography, Drawer, useMediaQuery } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import useGetCurrentUserPlaylists from "../../hooks/useGetCurrentUserPlaylists";
import { motion } from "framer-motion";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Root = styled("aside")({
    width: 280,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#ffffff",
    borderRight: "1px solid #ddd",
    padding: "20px 16px",
    boxSizing: "border-box",
    overflowY: "auto",
});

const Title = styled(Typography)({
    fontSize: "1.4rem",
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
    fontSize: "0.95rem",
    color: "#222",
    padding: "10px 14px",
    borderRadius: "8px",
    "&.active": {
        backgroundColor: "#f2f2f2",
        color: theme.palette.primary.main,
    },
    "&:hover": {
        backgroundColor: "#f2f2f2",
    },
}));

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

    const { data, isLoading, isError } = useGetCurrentUserPlaylists({
        limit: 50,
        offset: 0,
    });

    const content = (
        <Root>
            <Title>Lime Music</Title>

            <NavList>
                <li>
                    <StyledLink to="/" end onClick={onClose}>
                        <HomeIcon fontSize="small" sx={{ color: "#1db954" }} />
                        홈
                    </StyledLink>
                </li>
                <li>
                    <StyledLink to="/search" onClick={onClose}>
                        <SearchIcon fontSize="small" sx={{ color: "#1db954" }} />
                        검색하기
                    </StyledLink>
                </li>

                <li>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "10px 14px",
                            borderRadius: "8px",
                            cursor: "pointer",
                            color: "#222",
                            fontSize: "0.95rem",
                        }}
                        onClick={() => setIsPlaylistOpen((prev) => !prev)}
                    >
                        <span style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                            <LibraryMusicIcon fontSize="small" sx={{ color: "#1db954" }} />
                            나의 플레이리스트
                        </span>

                        <motion.div

                            animate={{
                                rotate: isPlaylistOpen ? 180 : 0,
                                scale: [1, 1.2, 1],
                            }}
                            transition={{
                                duration: 0.35,
                                ease: "easeInOut",
                            }}
                            style={{ display: "flex", alignItems: "center" }}
                        >
                            <KeyboardArrowDownIcon fontSize="small" />
                        </motion.div>
                    </div>

                    {isPlaylistOpen && (
                        !accessToken ? (
                            <Typography
                                variant="body2"
                                sx={{ color: "text.secondary", px: 2, mt: 1 }}
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
                            <Typography sx={{ mt: 1, px: 2 }}>로딩 중...</Typography>
                        ) : isError ? (
                            <Typography color="error" sx={{ mt: 1, px: 2 }}>
                                불러오기 실패
                            </Typography>
                        ) : (
                            <PlaylistList style={{ paddingLeft: "24px" }}>
                                {data?.items.map((pl) => (
                                    <li key={pl.id}>
                                        <StyledLink to={`/playlist/${pl.id}`} onClick={onClose}>
                                            {pl.name}
                                        </StyledLink>
                                    </li>
                                ))}
                            </PlaylistList>
                        )
                    )}
                </li>
            </NavList>




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