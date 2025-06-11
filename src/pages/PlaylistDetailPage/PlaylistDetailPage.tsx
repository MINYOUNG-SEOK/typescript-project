import React, { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import {
    Box,
    Container,
    CircularProgress,
    Alert,
    Stack,
    Typography,
    Button,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton,
    styled,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import useGetPlaylist from "../../hooks/useGetPlaylist";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";
import useGetPlaylistItems from "../../hooks/useGetPlaylistItems";
import { useInView } from "react-intersection-observer";

const formatMs = (ms: number) => {
    const total = Math.floor(ms / 1000);
    const m = Math.floor(total / 60);
    const s = total % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
};

const GreenButton = styled(Button)({
    textTransform: "none",
    fontWeight: 600,
    borderRadius: 8,
    paddingInline: 24,
    backgroundColor: "#1db954",
    color: "#fff",
    "&:hover": { backgroundColor: "#1aa34a" },
});

const HeaderTableCell = styled(TableCell)({
    color: "#6e6e73",
    fontWeight: 700,
    fontSize: 14,
});

const BodyRow = styled(TableRow)({
    cursor: "pointer",
    "&:hover": { background: "#f2f2f2" },
});

const PlaylistDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    if (!id) return <Navigate to="/" replace />;

    const theme = useTheme();
    const isTablet = useMediaQuery("(max-width:1000px)");
    const isMobile = useMediaQuery("(max-width:600px)");
    const isXSmall = useMediaQuery("(max-width:500px)");

    const { data: playlist, isLoading, isError, error } = useGetPlaylist({ playlist_id: id });
    const { data: userProfile } = useGetCurrentUserProfile();
    // 무한스크롤 쿼리 선언
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useGetPlaylistItems({ playlist_id: id });
    // 뷰포트 진입 감지
    const { ref, inView } = useInView({ threshold: 0 });
    // 감지되면 다음 페이지
    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    const totalMs = React.useMemo(() => {
        if (!playlist) return 0;
        return playlist.tracks.items.reduce(
            (sum: number, it: any) => sum + (it.track?.duration_ms ?? 0),
            0
        );
    }, [playlist]);

    const totalSeconds = Math.floor(totalMs / 1000);
    const minutesOnly = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    if (isLoading)
        return (
            <Container sx={{ mt: 8, textAlign: "center" }}>
                <CircularProgress />
            </Container>
        );

    if (isError || !playlist)
        return (
            <Container sx={{ mt: 8 }}>
                <Alert severity="error">
                    {(error as Error)?.message ?? "플레이리스트 정보를 가져올 수 없습니다."}
                </Alert>
            </Container>
        );

    return (
        <Box
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                bgcolor: "#FFF",
            }}
        >

            <Box sx={{ flex: "0 0 auto" }}>
                <Container
                    maxWidth={false}
                    disableGutters
                    sx={{
                        pt: 4,
                        pb: 6,
                        px: {
                            xs: 0,
                            sm: 3,
                            md: 4,
                        },
                        display: "flex",
                        flexDirection: isTablet ? "column" : "row",
                        alignItems: isTablet ? "center" : "flex-start",
                        gap: 6,
                        textAlign: isTablet ? "center" : "left",
                    }}
                >
                    <img
                        src={playlist.images?.[0]?.url ?? "https://placehold.co/300x300?text=No+Image"}
                        alt={playlist.name}
                        width={260}
                        height={260}
                        style={{ borderRadius: 8, objectFit: "cover" }}
                    />
                    <Stack
                        spacing={1}
                        justifyContent={isTablet ? "center" : "flex-end"}
                        alignItems={isTablet ? "center" : "flex-start"}
                        sx={{
                            alignSelf: isTablet ? "auto" : "center",
                        }}
                    >
                        <Typography variant="body2">
                            {playlist.public ? "공개 플레이리스트" : "비공개 플레이리스트"}
                        </Typography>
                        <Typography
                            fontWeight={700}
                            lineHeight={1.2}
                            sx={{
                                fontSize: {
                                    xs: "1.5rem",
                                    sm: "2rem",
                                    md: "2.5rem",
                                },
                            }}
                        >
                            {playlist.name}
                        </Typography>
                        <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
                            <img
                                src={userProfile?.images?.[0]?.url}
                                alt={playlist.owner?.display_name ?? '플레이리스트 소유자'}
                                width={28}
                                height={28}
                                style={{ borderRadius: "50%" }}
                            />
                            <Typography variant="body2">
                                <strong>{playlist.owner?.display_name}</strong> · {playlist.tracks.total}곡, {minutesOnly}분 {seconds}초
                            </Typography>
                        </Stack>
                        <Stack direction="row" gap={2} sx={{ mt: 2 }}>
                            <Box sx={{ mt: 4 }}>
                                <Stack direction="row" gap={1}>
                                    <GreenButton startIcon={<PlayArrowIcon sx={{ color: "#fff" }} />} disableElevation>
                                        재생
                                    </GreenButton>
                                    <GreenButton startIcon={<ShuffleIcon sx={{ color: "#fff" }} />} disableElevation>
                                        임의 재생
                                    </GreenButton>
                                </Stack>
                            </Box>
                        </Stack>
                    </Stack>
                </Container>
            </Box>

            <Box
                sx={{
                    flex: "1 1 auto",
                    overflowY: "auto",
                    height: "100%",
                    scrollbarWidth: "none",
                    "&::-webkit-scrollbar": {
                        display: "none",
                    },
                }}
            >
                <Container
                    maxWidth={false}
                    disableGutters
                    sx={{
                        px: {
                            xs: 0,
                            sm: 3,
                            md: 4,
                        },
                    }}
                >
                    <Table sx={{ tableLayout: "fixed", "& th, & td": { border: "none", py: 1.25 } }}>
                        <colgroup>
                            <col style={{ width: "35%" }} />
                            {!isTablet && <col style={{ width: "40%" }} />}
                            {!isMobile && <col style={{ width: "32%" }} />}
                            {!isXSmall && <col style={{ width: "10%" }} />}
                        </colgroup>
                        <caption style={{ display: "none" }}>{playlist.name} tracks</caption>
                        <TableHead>
                            <TableRow>
                                <HeaderTableCell sx={{ width: 300, pl: 0.5 }}>노래</HeaderTableCell>
                                {!isTablet && <HeaderTableCell sx={{ width: 260 }}>아티스트</HeaderTableCell>}
                                {!isMobile && <HeaderTableCell sx={{ width: 300 }}>앨범</HeaderTableCell>}
                                {!isXSmall && <HeaderTableCell sx={{ width: 60, pr: 3 }}>시간</HeaderTableCell>}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data?.pages.flatMap((page, pageIndex) =>
                                page.items.map((item: any, i: number) => {
                                    const track = item.track;
                                    const index = pageIndex * 20 + i;
                                    return (
                                        <React.Fragment key={track.id ?? `${index}`}>                            <BodyRow sx={{ backgroundColor: index % 2 === 0 ? "#FAFAFA" : "transparent" }}>
                                            <TableCell sx={{ pl: 2 }}>
                                                <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                                                    <Stack direction="row" gap={2} alignItems="center">
                                                        <img
                                                            src={track.album?.images?.[2]?.url ?? "https://placehold.co/40x40?text=No Image"}
                                                            width={40}
                                                            height={40}
                                                            alt={track.name}
                                                            style={{ borderRadius: 4 }}
                                                        />
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                flexDirection: "column",
                                                                justifyContent: "center",
                                                                overflow: "hidden",
                                                                maxWidth: "100%",
                                                                flexShrink: 1,
                                                            }}
                                                        >
                                                            <Typography
                                                                fontWeight={600}
                                                                noWrap
                                                                sx={{
                                                                    overflow: "hidden",
                                                                    textOverflow: "ellipsis",
                                                                    whiteSpace: "nowrap",
                                                                    maxWidth: "100%",
                                                                }}
                                                            >
                                                                {track.name}
                                                            </Typography>
                                                            {isTablet && (
                                                                <Typography
                                                                    noWrap
                                                                    sx={{
                                                                        overflow: "hidden",
                                                                        textOverflow: "ellipsis",
                                                                        whiteSpace: "nowrap",
                                                                        maxWidth: "100%",
                                                                    }}
                                                                >
                                                                    {track.artists.map((a: any) => a.name).join(", ")}
                                                                </Typography>
                                                            )}
                                                        </Box>
                                                    </Stack>
                                                </Box>
                                            </TableCell>

                                            {!isTablet && (
                                                <TableCell sx={{ overflow: "hidden" }}>
                                                    <Typography
                                                        noWrap
                                                        sx={{
                                                            overflow: "hidden",
                                                            textOverflow: "ellipsis",
                                                            whiteSpace: "nowrap",
                                                            maxWidth: "100%",
                                                        }}
                                                    >
                                                        {track.artists.map((a: any) => a.name).join(", ")}
                                                    </Typography>
                                                </TableCell>
                                            )}
                                            {!isMobile && (
                                                <TableCell
                                                    sx={{
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis",
                                                        whiteSpace: "nowrap",
                                                    }}
                                                >
                                                    <Typography noWrap sx={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                                                        {track.album?.name}
                                                    </Typography>
                                                </TableCell>
                                            )}
                                            {!isXSmall && (
                                                <TableCell align="right" sx={{ pr: 1, verticalAlign: "middle" }} width={64}>
                                                    <Stack direction="row" gap={1} alignItems="center">
                                                        <Typography>{formatMs(track.duration_ms)}</Typography>
                                                        <IconButton
                                                            size="small"
                                                            aria-label="메뉴"
                                                            sx={{
                                                                "& svg": { fontSize: 20 },
                                                                color: "#1db954",
                                                                opacity: 0,
                                                                transition: "opacity 0.2s",
                                                                ".MuiTableRow-hover:hover &": { opacity: 1 },
                                                            }}
                                                        >
                                                            <MoreHorizIcon />
                                                        </IconButton>
                                                    </Stack>
                                                </TableCell>
                                            )}
                                        </BodyRow>
                                        </React.Fragment>
                                    );
                                })
                            )}

                            {/* 무한 스크롤 트리거 */}
                            {hasNextPage && (
                                <TableRow>
                                    <TableCell colSpan={4} align="center" ref={ref}>
                                        {isFetchingNextPage && (
                                            <CircularProgress size={24} sx={{ color: "#d9d9d9" }} />
                                        )}                                </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </Container>
            </Box>

        </Box >
    );
};

export default PlaylistDetailPage;
