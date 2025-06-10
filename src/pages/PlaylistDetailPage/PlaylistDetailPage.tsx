import React from "react";
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
    Divider,
    IconButton,
    styled,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import useGetPlaylist from "../../hooks/useGetPlaylist";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";

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

    const { data: playlist, isLoading, isError, error } = useGetPlaylist({ playlist_id: id });
    const { data: userProfile } = useGetCurrentUserProfile();

    // 총 재생 시간 계산
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
        <Box sx={{ bgcolor: "#FFF", minHeight: "100vh" }}>
            {/* 헤더 */}
            <Container
                maxWidth={false}
                disableGutters
                sx={{ pt: 4, pb: 6, px: 4, display: "flex", gap: 6 }}
            >
                <img
                    src={playlist.images?.[0]?.url ?? "https://placehold.co/300x300?text=No+Image"}
                    alt={playlist.name}
                    width={260}
                    height={260}
                    style={{ borderRadius: 8, objectFit: "cover" }}
                />
                <Stack spacing={1} justifyContent="flex-end">
                    <Typography variant="body2">
                        {playlist.public ? "공개 플레이리스트" : "비공개 플레이리스트"}
                    </Typography>
                    <Typography variant="h3" fontWeight={800} lineHeight={1.2}>
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
                            <strong>{playlist.owner?.display_name}</strong> ·{" "}
                            {playlist.tracks.total}곡, {minutesOnly}분 {seconds}초
                        </Typography>
                    </Stack>
                    <Stack direction="row" gap={2} sx={{ mt: 2 }}>
                        {/* 재생 버튼 */}
                        <Box sx={{ mt: 4 }}>
                            <Stack
                                direction="row"
                                gap={1}
                            >
                                <GreenButton
                                    startIcon={<PlayArrowIcon sx={{ color: "#fff" }} />}
                                    disableElevation
                                >
                                    재생
                                </GreenButton>

                                <GreenButton
                                    startIcon={<ShuffleIcon sx={{ color: "#fff" }} />}
                                    disableElevation
                                >
                                    임의 재생
                                </GreenButton>
                            </Stack>
                        </Box>
                    </Stack>

                </Stack>
            </Container>

            {/* 플레이 리스트 아이템 */}
            <Container maxWidth={false} disableGutters sx={{ px: 4 }}>
                <Table
                    sx={{
                        tableLayout: "fixed",
                        "& th, & td": { border: "none", py: 1.25 },
                    }}
                >
                    <colgroup>
                        <col style={{ width: "35%" }} />
                        <col style={{ width: "25%" }} />
                        <col style={{ width: "32%" }} />
                        <col style={{ width: "8%" }} />
                    </colgroup>

                    <caption style={{ display: "none" }}>{playlist.name} tracks</caption>
                    <TableHead>
                        <TableRow>
                            <HeaderTableCell sx={{ width: 300, pl: 0.5 }}>노래</HeaderTableCell>
                            <HeaderTableCell sx={{ width: 260 }}>아티스트</HeaderTableCell>
                            <HeaderTableCell sx={{ width: 300 }}>앨범</HeaderTableCell>
                            <HeaderTableCell sx={{ width: 60, pr: 3 }}>시간</HeaderTableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {playlist.tracks.items.map((item: any, index: number) => {
                            const track = item.track;
                            return (
                                <React.Fragment key={track.id}>
                                    <BodyRow
                                        sx={{
                                            backgroundColor: index % 2 === 0 ? "#FAFAFA" : "transparent",
                                        }}
                                    >
                                        <TableCell sx={{ pl: 0 }}>
                                            <Box
                                                component="span"
                                                sx={{
                                                    display: "block",
                                                    paddingLeft: "16px",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    whiteSpace: "nowrap",
                                                }}
                                            >
                                                <Stack direction="row" gap={2} alignItems="center">
                                                    <img
                                                        src={track.album?.images?.[2]?.url ?? "https://placehold.co/40x40?text=No Image"}
                                                        width={40}
                                                        height={40}
                                                        alt={track.name}
                                                        style={{ borderRadius: 4 }}
                                                    />
                                                    <Typography fontWeight={600} noWrap>
                                                        {track.name}
                                                    </Typography>
                                                </Stack>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Box
                                                component="span"
                                                sx={{
                                                    display: "block",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    whiteSpace: "nowrap",
                                                }}
                                            >
                                                {track.artists.map((a: any) => a.name).join(", ")}
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Box
                                                component="span"
                                                sx={{
                                                    display: "block",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    whiteSpace: "nowrap",
                                                }}
                                            >
                                                {track.album?.name}
                                            </Box></TableCell>
                                        <TableCell align="right" sx={{ pr: 1 }} width={64}>
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
                                    </BodyRow>
                                </React.Fragment>
                            );
                        })}
                    </TableBody>
                </Table>
            </Container>
        </Box >
    );
};

export default PlaylistDetailPage;