import React from "react";
import { NavLink } from "react-router-dom";
import { CircularProgress, styled, Typography } from "@mui/material";
import { useInView } from "react-intersection-observer";

const StyledLink = styled(NavLink)(({ theme }) => ({
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: "16px",
    fontSize: "1.05rem",
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

const StyledList = styled("ul")({
    listStyle: "none",
    padding: 0,
    margin: 0,
    marginTop: "8px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
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
        <StyledList style={{ overflowY: "auto", paddingRight: "4px" }}>
            {data?.pages.map((page: any) =>
                page.items.map((pl: any, idx: number, arr: any[]) => {
                    const isLast = idx === arr.length - 1;
                    return (
                        <li
                            key={pl.id}
                            ref={isLast ? ref : null}
                            style={{
                                borderBottom: "1px solid #d9d9d9",
                                paddingBottom: "8px",
                                paddingTop: "8px",
                            }}
                        >
                            <StyledLink
                                to={`/playlist/${pl.id}`}
                                onClick={onClose}
                            >
                                <img
                                    src={
                                        pl.images?.[0]?.url ||
                                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSAySszMhWPAD-i4hov3Km4ss4Pvxjiacx6Q&s"
                                    }
                                    alt={pl.name}
                                    width={50}
                                    height={50}
                                    style={{
                                        borderRadius: 4,
                                        objectFit: "cover",
                                        flexShrink: 0,
                                    }}
                                />
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <Typography fontSize="1rem" fontWeight={600}>
                                        {pl.name}
                                    </Typography>
                                    <Typography fontSize="0.875rem" color="text.secondary">
                                        플레이리스트 • {pl.owner.display_name}
                                    </Typography>
                                </div>
                            </StyledLink>
                        </li>
                    );
                })
            )}
            <li style={{ height: "16px" }} aria-hidden="true" />
            {isFetchingNextPage && (
                <div style={{ display: "flex", justifyContent: "center", padding: "16px 0" }}>
                    <CircularProgress size={24}
                        sx={{
                            color: "#d9d9d9",
                        }} />
                </div>
            )}
        </StyledList>
    );
};

export default PlayList;