import React from "react";
import { NavLink } from "react-router-dom";
import { CircularProgress, styled, Typography, IconButton } from "@mui/material";
import { useInView } from "react-intersection-observer";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const StyledLink = styled(NavLink)(({ theme }) => ({
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "16px",
    padding: "10px 12px",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    position: "relative",
    overflow: "hidden",
    color: "#222", // 기본 색상

    // 💡 이 아래 세 줄이 핵심입니다.
    "&:link": {
        color: "#222",
    },
    "&:visited": {
        color: "#222",
    },
    "&:hover": {
        transform: "translateY(-2px)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        backgroundColor: "#f9f9f9",
    },
    "&::before": {
        content: '""',
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        width: 4,
        background: "linear-gradient(180deg, #1db954, #1ed760)",
        borderRadius: 1,
        opacity: 0,
        transition: "opacity 0.2s ease",
    },
    "&:hover::before": {
        opacity: 1,
    },
}));

const CardContent = styled("div")({
    display: "flex",
    alignItems: "center",
    gap: "14px",
    flex: 1,
});

const StyledList = styled("ul")({
    listStyle: "none",
    padding: 0,
    margin: "12px 0",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
});

interface PlaylistListProps {
    data: any;
    fetchNextPage: () => void;
    hasNextPage?: boolean;
    isFetchingNextPage?: boolean;
    onClose: () => void;
}

const PlayList: React.FC<PlaylistListProps> = ({
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    onClose,
}) => {
    const { ref, inView } = useInView();

    React.useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    return (
        <StyledList>
            {data?.pages.map((page: any) =>
                page.items.map((pl: any, idx: number, arr: any[]) => {
                    const isLast = idx === arr.length - 1;
                    return (
                        <li key={pl.id} ref={isLast ? ref : null}>
                            <StyledLink to={`/playlist/${pl.id}`} onClick={onClose}>
                                <CardContent>
                                    <img
                                        src={
                                            pl.images?.[0]?.url ||
                                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSAySszMhWPAD-i4hov3Km4ss4Pvxjiacx6Q&s"
                                        }
                                        alt={pl.name}
                                        width={50}
                                        height={50}
                                        style={{
                                            borderRadius: 6,
                                            objectFit: "cover",
                                            flexShrink: 0,
                                        }}
                                    />
                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                        <Typography fontSize="1rem" fontWeight={600}
                                            sx={{
                                                display: "-webkit-box",
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: "vertical",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                            }}>
                                            {pl.name}
                                        </Typography>
                                        <Typography fontSize="0.875rem" color="text.secondary" noWrap>
                                            {pl.owner.display_name}의 플레이리스트
                                        </Typography>
                                    </div>
                                </CardContent>
                                <IconButton
                                    sx={{
                                        opacity: 0,
                                        transition: "opacity 0.2s ease",
                                        "&:hover": { opacity: 1 },
                                        pointerEvents: "none",
                                        ".MuiListItem:hover &": {
                                            opacity: 1,
                                            pointerEvents: "auto",
                                        },
                                    }}
                                    size="small"
                                >
                                    <PlayArrowIcon sx={{ color: "#1db954" }} />
                                </IconButton>
                            </StyledLink>
                        </li>
                    );
                })
            )}
            {isFetchingNextPage && (
                <div style={{ display: "flex", justifyContent: "center", padding: "16px 0" }}>
                    <CircularProgress size={24} sx={{ color: "#d9d9d9" }} />
                </div>
            )}
        </StyledList>
    );
};

export default PlayList;