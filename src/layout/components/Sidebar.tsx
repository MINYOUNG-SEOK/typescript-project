import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
    styled,
    Typography,
    Drawer,
    useMediaQuery,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    IconButton,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from '@mui/icons-material/Close';
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import useInfinitePlaylists from "../../hooks/useInfinitePlaylists";
import useCreatePlaylist from "../../hooks/useCreatePlaylist";
import PlayList from "./PlayList";
import { createPlaylist } from "../../apis/playlistApi";

interface SidebarProps {
    open: boolean;
    onClose: () => void;
}

const Root = styled("aside")<{ width: number }>(({ width }) => ({
    width,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#ffffff",
    borderRight: "1px solid #ddd",
    boxSizing: "border-box",
    position: "relative",
}));

const ResizeHandle = styled("div")({
    position: "absolute",
    top: 0,
    right: 0,
    width: 8,
    height: "100%",
    cursor: "col-resize",
    zIndex: 10,
    backgroundColor: "transparent",
    transition: "background-color 0.2s ease",
    "&:hover": { backgroundColor: "#f0f0f0" },
    "&::before": {
        content: '""',
        width: 3,
        height: 40,
        background: "#bbb",
        borderRadius: 2,
        transition: "background 0.2s ease",
    },
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
    fontSize: "1.4rem",
    fontWeight: 700,
    marginBottom: "24px",
    // color: "#1db954",
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
    borderRadius: "8px",
    transition: "background 0.2s, color 0.2s",
    "&:hover": { backgroundColor: "#f9f9f9" },
    "&.active": {
        backgroundColor: "#f2f2f2",
        color: theme.palette.primary.main,
    },
}));

const StyledNavItem = styled("div")({
    display: "flex",
    alignItems: "center",
    gap: "16px",
    fontSize: "1rem",
    color: "#222",
    padding: "10px 14px",
    borderRadius: "8px",
    cursor: "pointer",
});

const CreatePlaylistButton = styled(Button)({
    textTransform: "none",
    fontWeight: 600,
    borderRadius: 8,
    paddingInline: 24,
    width: "100%",
    marginTop: "8px",
    backgroundColor: "#1db954",
    color: "#fff",
    "&:hover": { backgroundColor: "#1aa34a" },
    marginBottom: "12px",
});

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
    const isMobile = useMediaQuery("(max-width:1200px)");
    const accessToken = localStorage.getItem("access_token");
    const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);
    const [sidebarWidth, setSidebarWidth] = useState(320);

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
        useInfinitePlaylists(10);

    const { ref, inView } = useInView();
    const { mutate: createPlaylist } = useCreatePlaylist();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [newName, setNewName] = useState("");

    useEffect(() => {
        if (inView && hasNextPage) fetchNextPage();
    }, [inView, hasNextPage, fetchNextPage]);

    const handleMouseDown = (e: React.MouseEvent) => {
        const startX = e.clientX;
        const startWidth = sidebarWidth;
        const MIN_WIDTH = 240;
        const MAX_WIDTH = 500;
        const onMouseMove = (moveEvent: MouseEvent) => {
            const newWidth = startWidth + (moveEvent.clientX - startX);
            if (newWidth >= MIN_WIDTH && newWidth <= MAX_WIDTH) {
                setSidebarWidth(newWidth);
            }
        };
        const onMouseUp = () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        };
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
    };

    // 새 플레이리스트 바로 생성
    const handleCreatePlaylist = () => {
        createPlaylist({ name: "나의 플레이리스트" });
    };

    const handleCreate = () => {
        createPlaylist({ name: newName });
        setDialogOpen(false);
        setNewName("");
    };


    const content = (
        <Root width={sidebarWidth}>
            <FixedSection>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: 56, padding: '0 0 0 0' }}>
                    <Title sx={{ lineHeight: 1, display: 'flex', alignItems: 'center', mb: 0 }}>Lime Music</Title>
                    {isMobile && (
                        <IconButton onClick={onClose} sx={{ ml: 1 }}>
                            <CloseIcon />
                        </IconButton>
                    )}
                </div>
                <NavList>
                    <li>
                        <StyledLink to="/" end onClick={onClose}>
                            <HomeIcon fontSize="medium" sx={{ color: "#1db954" }} />
                            홈
                        </StyledLink>
                    </li>
                    <li>
                        <StyledLink to="/search" onClick={onClose}>
                            <SearchIcon fontSize="medium" sx={{ color: "#1db954" }} />
                            검색하기
                        </StyledLink>
                    </li>
                    <li>
                        <StyledLink to="/favorites" onClick={onClose}>
                            <FavoriteBorderIcon fontSize="small" sx={{ color: "#1db954" }} />
                            즐겨찾는 노래
                        </StyledLink>
                    </li>
                    <li>
                        <StyledNavItem onClick={() => setIsPlaylistOpen((p) => !p)}>
                            <LibraryMusicIcon fontSize="medium" sx={{ color: "#1db954" }} />
                            나의 플레이리스트
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
                <ScrollableSection ref={ref}>
                    {accessToken && (
                        <CreatePlaylistButton
                            startIcon={<AddIcon />}
                            onClick={() => createPlaylist({ name: "나의 플레이리스트" })}
                        >
                            새로 만들기
                        </CreatePlaylistButton>
                    )}

                    {!accessToken ? (
                        <Typography variant="body2" sx={{ color: "text.secondary", mt: 1, pl: "54px" }}>
                            아직 회원이 아니신가요?
                            <br />
                            <a
                                href="https://www.spotify.com/signup/"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ textDecoration: "underline", color: "#1db954", fontWeight: 500 }}
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

            {!isMobile && <ResizeHandle onMouseDown={handleMouseDown} />}

            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                <DialogTitle>새 플레이리스트 만들기</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        label="플레이리스트 이름"
                        fullWidth
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)}>취소</Button>
                    <Button onClick={handleCreate} disabled={!newName.trim() || isLoading}>
                        생성
                    </Button>
                </DialogActions>
            </Dialog>
        </Root>
    );

    return isMobile ? (
        <Drawer anchor="left" open={open} onClose={onClose} ModalProps={{ keepMounted: true }}>
            {content}
        </Drawer>
    ) : (
        content
    );
};

export default Sidebar;