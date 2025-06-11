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
    borderRadius: "8px",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    position: "relative",
    overflow: "hidden",
    color: "#222",

    "&:link": {
        color: "#222",
    },
    "&:visited": {
        color: "#222",
    },
    "&.active": {
        backgroundColor: "#f2f2f2",
    },
    // "&::before": {
    //     content: '""',
    //     position: "absolute",
    //     left: 0,
    //     top: 0,
    //     bottom: 0,
    //     width: 4,
    //     background: "linear-gradient(180deg, #1db954, #1ed760)",
    //     borderRadius: 1,
    //     opacity: 0,
    //     transition: "opacity 0.2s ease",
    // },
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
            {/* 플레이리스트가 없는 경우 */}
            {data?.pages?.[0]?.items?.length === 0 && !isFetchingNextPage && (
                <li>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        textAlign="center"
                        sx={{ py: 4 }}
                    >
                        플레이리스트가 없습니다.
                    </Typography>
                </li>
            )}
            {/* 플레이리스트가 있을 때 */}
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
                                            "https://placehold.co/50x50?text=No Image"
                                        }
                                        alt={pl.name}
                                        width={50}
                                        height={50}
                                        style={{
                                            borderRadius: 8,
                                            objectFit: "cover",
                                            flexShrink: 0,
                                        }}
                                    />
                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                        <Typography fontSize="0.9rem" fontWeight={600}
                                            sx={{
                                                display: "-webkit-box",
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: "vertical",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                            }}>
                                            {pl.name}
                                        </Typography>
                                        <Typography fontSize="0.8rem" color="text.secondary" noWrap>
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
                                        [`${StyledLink}:hover &`]: {
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