import React, { useEffect, useState } from "react";
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
    Skeleton,
    Dialog,
    DialogTitle,
    DialogContent,
    keyframes,
    DialogActions,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add'
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import useGetPlaylist from "../../hooks/useGetPlaylist";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";
import useGetPlaylistItems from "../../hooks/useGetPlaylistItems";
import { useInView } from "react-intersection-observer";
import ImageWithFallback from "../../common/components/ImageWithFallbackProps";
import EmptyPlaylistWithSearch from "./components/EmptyPlaylistWithSearch";
import useAddTracksToPlaylist from "../../hooks/useAddTracksToPlaylist";
import { ConfirmAddDialog } from "../../common/components/ConfirmAddDialog";
import useRemoveTracksFromPlaylist from "../../hooks/useRemoveTracksFromPlaylist"
import { ConfirmDeleteDialog } from "../../common/components/ConfirmDeleteDialog"


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
    '@media (max-width:400px)': {
        paddingInline: 12,
        fontSize: '0.875rem',
    },
});

const AddButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#fff',
    color: '#1db954',
    border: '1px solid #1db954',
    textTransform: 'none',
    fontWeight: 600,
    borderRadius: 8,
    paddingInline: 24,
    gap: 3,
    boxShadow: 'none',
    transition: 'background-color 0.3s, box-shadow 0.3s',
    '&:hover': {
        backgroundColor: '#f0faf1',
    },
    '&.highlight': {
        animation: `${pulse} 2s infinite`,
    },
    '@media (max-width:400px)': {
        paddingInline: 12,
        fontSize: '0.875rem',
    },
}))

const pulse = keyframes`
  0%   { box-shadow: 0 0 0 0 rgba(29,185,84,0.7); }
  70%  { box-shadow: 0 0 0 10px rgba(29,185,84,0); }
  100% { box-shadow: 0 0 0 0 rgba(29,185,84,0); }
`

const HeaderTableCell = styled(TableCell)({
    color: "#6e6e73",
    fontWeight: 700,
    fontSize: 14,
    whiteSpace: "nowrap",
});

const BodyRow = styled(TableRow)({
    cursor: "pointer",
    "&:hover": { background: "#f2f2f2" },
    "&:hover .favBtn": { opacity: 1 },
    "&:hover .deleteBtn": { opacity: 1 },
});

const containerProps = {
    maxWidth: false as const,
    disableGutters: true as const,
};
const headerWrapperSx = {
    pt: { xs: 2, sm: 2 },
    pb: { xs: 2, sm: 2 },
    px: { xs: 0, sm: 3, md: 4 },
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    alignItems: { xs: "center", sm: "center" },
    rowGap: { xs: 2, sm: 2 },
    columnGap: { xs: 2, sm: 6 },
    textAlign: { xs: "center", md: "left" },
};

const PlaylistDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const accessToken = localStorage.getItem("access_token");

    // 모달 열림 상태
    const [openSearch, setOpenSearch] = useState(false);
    const handleOpen = () => setOpenSearch(true);
    const handleClose = () => setOpenSearch(false);

    // 중복 확인용 다이얼로그 상태
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [pendingUri, setPendingUri] = useState<string>("");

    // 삭제 확인용 다이얼로그 상태
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);



    // 플레이리스트 아이템 조회
    const { data: playlistItemsData } = useGetPlaylistItems({ playlist_id: id! });

    // 추가 뮤테이션 훅
    const addTracksMutation = useAddTracksToPlaylist();

    const removeTracksMutation = useRemoveTracksFromPlaylist();

    const handleAddTrack = (trackUri: string) => {
        if (!id) return;
        // URI에서 ID만 뽑아내기
        const trackId = trackUri.split(":").pop()!;
        // 현재 로드된 모든 트랙 ID 배열
        const existingIds: string[] =
            playlistItemsData?.pages.flatMap(page =>
                page.items
                    // track이 null이면 undefined 반환
                    .map(item => item.track?.id)
                    // undefined 제거
                    .filter((id): id is string => id != null)
            ) ?? [];

        if (existingIds.includes(trackId)) {
            // 중복이면 다이얼로그 열기
            setPendingUri(trackUri);
            setConfirmOpen(true);
        } else {
            // 중복 아니면 바로 추가
            addTracksMutation.mutate({
                playlist_id: id,
                uris: [trackUri],
                position: 0,
            });
        }
    };

    // 추가 성공 시 모달 닫기
    useEffect(() => {
        if (addTracksMutation.isSuccess) {
            setConfirmOpen(false);
            handleClose();
        }
    }, [addTracksMutation.isSuccess]);

    // 삭제 
    const handleDeleteTrack = (trackId: string) => {
        setPendingDeleteId(trackId)
        setDeleteConfirmOpen(true)
    }



    if (!accessToken) {
        return (
            <Container sx={{ mt: 8 }}>
                <Typography variant="body1" align="center" color="text.secondary">
                    로그인 후 확인 가능한 페이지입니다.
                </Typography>
            </Container>
        )
    }

    if (!id) return <Navigate to="/" replace />;

    const { data: playlist, isLoading, isError, error } = useGetPlaylist({ playlist_id: id });
    const { data: userProfile } = useGetCurrentUserProfile();
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
        useGetPlaylistItems({ playlist_id: id });

    const { ref, inView } = useInView({ threshold: 0 });
    useEffect(() => {
        if (inView && hasNextPage) fetchNextPage();
    }, [inView, hasNextPage, fetchNextPage]);

    // 즐겨찾기 로컬 상태 관리
    const [favorites, setFavorites] = React.useState<any[]>(() => {
        const stored = localStorage.getItem("favorites");
        return stored ? JSON.parse(stored) : [];
    });
    const toggleFavorite = (track: any) => {
        setFavorites(prev => {
            const exists = prev.find((t: any) => t.id === track.id);
            let next: any[];
            if (exists) {
                next = prev.filter((t: any) => t.id !== track.id);
            } else {
                next = [...prev, track];
            }
            localStorage.setItem("favorites", JSON.stringify(next));
            return next;
        });
    };

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

    if (isLoading) {
        return (
            <Container {...containerProps} sx={headerWrapperSx}>
                <Box sx={{ width: 260, height: 260, borderRadius: 2, overflow: "hidden" }}>
                    <Skeleton variant="rectangular" width="100%" height="100%" animation="wave" />
                </Box>
                <Stack spacing={1} sx={{ flex: 1 }}>
                    <Skeleton variant="text" width={100} height={20} />
                    <Skeleton variant="text" width="80%" height={40} />
                    <Skeleton variant="text" width="60%" height={20} />
                    <Skeleton variant="text" width="40%" height={20} />
                    <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                        <Skeleton variant="rectangular" width={100} height={40} sx={{ borderRadius: 2 }} />
                        <Skeleton variant="rectangular" width={100} height={40} sx={{ borderRadius: 2 }} />
                    </Stack>
                </Stack>
            </Container>
        );
    }

    if (isError || !playlist) {
        return (
            <Container sx={{ mt: 8 }}>
                <Alert severity="error">
                    {(error as Error)?.message ?? "플레이리스트 정보를 가져올 수 없습니다."}
                </Alert>
            </Container>
        )
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", bgcolor: "#FFF" }}>
            {/* 헤더 */}
            <Container {...containerProps} sx={headerWrapperSx}>
                <Box
                    component={ImageWithFallback}
                    src={playlist.images?.[0]?.url}
                    fallbackSrc="https://placehold.co/300x300?text=No+Image"
                    alt={playlist.name}
                    sx={{
                        width: { xs: 150, sm: 200 },
                        height: { xs: 150, sm: 200 },
                        borderRadius: 2,
                        objectFit: "cover",
                        mb: { xs: 0 }
                    }}
                />
                <Stack
                    sx={{ gap: 2, alignSelf: { md: "center" } }}
                    justifyContent={{ xs: "center", md: "flex-end" }}
                    alignItems={{ xs: "center", md: "flex-start" }}
                >
                    <Typography variant="body2">
                        {playlist.public ? "공개 플레이리스트" : "비공개 플레이리스트"}
                    </Typography>
                    <Typography
                        fontWeight={700}
                        lineHeight={1.2}
                        sx={{ fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" } }}
                    >
                        {playlist.name}
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 0 }}>
                        <ImageWithFallback
                            src={userProfile?.images?.[0]?.url}
                            fallbackSrc="https://placehold.co/28x28?text=No+Image"
                            alt={playlist.owner?.display_name ?? '플레이리스트 소유자'}
                            width={28}
                            height={28}
                            style={{ borderRadius: "50%" }}
                        />
                        <Typography variant="body2">
                            <strong>{playlist.owner?.display_name}</strong> · {playlist.tracks.total}곡, {minutesOnly}분 {seconds}초
                        </Typography>
                    </Stack>
                    <Stack direction="row" gap={2} sx={{ mt: { xs: 2, sm: 2 } }}>
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
                        <AddButton
                            className={playlist.tracks.total === 0 ? "highlight" : ""}
                            onClick={handleOpen}>  <AddIcon fontSize="small" />
                            추가
                        </AddButton>
                    </Stack>
                </Stack>
            </Container>

            {/* 트랙 리스트 or 빈 안내 */}
            <Container {...containerProps} sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
                {playlist.tracks.total === 0 ? (
                    <Box textAlign="center" py={6}>
                        <Typography variant="h6" gutterBottom>
                            플레이리스트가 비어있습니다.
                        </Typography>
                        <Typography color="text.secondary" gutterBottom>
                            상단에 “추가” 버튼을 눌러 플레이 리스트에 추가할 곡을 찾아보세요.
                        </Typography>
                    </Box>
                ) : (
                    <Box sx={{ width: '100%' }}>
                        <Table size="small"
                            sx={{
                                width: "100%",
                                tableLayout: "fixed",
                                "& th, & td": { border: "none", py: 1.0 },
                            }}
                        >
                            <TableHead>
                                <TableRow>
                                    <HeaderTableCell sx={{ width: { xs: "100%", md: "35%" }, whiteSpace: "nowrap" }}>
                                        노래
                                    </HeaderTableCell>
                                    <HeaderTableCell sx={{ width: "40%", display: { xs: "none", md: "table-cell" } }}>
                                        아티스트
                                    </HeaderTableCell>
                                    <HeaderTableCell sx={{ width: "32%", display: { xs: "none", sm: "none", md: "table-cell" } }}>
                                        앨범
                                    </HeaderTableCell>
                                    <HeaderTableCell
                                        align="left"
                                        sx={{ width: 80, display: { xs: "none", sm: "none", md: "none", lg: "table-cell" } }}
                                    >
                                        시간
                                    </HeaderTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {data?.pages.flatMap((page, pageIndex) =>
                                    page.items.map((item: any, i: number) => {
                                        const track = item.track;
                                        const index = pageIndex * 20 + i;
                                        const isFav = favorites.some((t: any) => t.id === track.id);
                                        return (
                                            <BodyRow
                                                key={`${pageIndex}-${i}-${track.id}`}
                                                sx={{
                                                    backgroundColor: index % 2 === 0 ? "#FAFAFA" : "transparent",
                                                    "&:hover .overlay": { opacity: 1 },

                                                }}
                                            >
                                                <TableCell
                                                    sx={{
                                                        pl: 2,
                                                        position: "relative",
                                                        display: "flex",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <IconButton
                                                        className="favBtn"
                                                        onClick={() => toggleFavorite(track)} disableRipple
                                                        sx={{
                                                            backgroundColor: "transparent",
                                                            position: "absolute",
                                                            left: -40,
                                                            top: "50%",
                                                            transform: "translateY(-50%)",
                                                            opacity: isFav ? 1 : 0,
                                                            transition: "opacity 0.2s",

                                                        }}
                                                        aria-label="즐겨찾기"
                                                    >
                                                        {isFav
                                                            ? <FavoriteIcon sx={{ color: "red" }} />
                                                            : <FavoriteBorderIcon sx={{ color: "red" }} />
                                                        }
                                                    </IconButton>

                                                    <Box sx={{ position: "relative", display: "inline-block" }}>
                                                        <ImageWithFallback
                                                            src={track.album?.images?.[2]?.url}
                                                            fallbackSrc="https://placehold.co/50x50?text=No+Image"
                                                            width={50}
                                                            height={50}
                                                            alt={track.name}
                                                            style={{ display: 'block', borderRadius: 8, objectFit: "cover" }}
                                                        />
                                                        <Box
                                                            className="overlay"
                                                            sx={{
                                                                position: "absolute",
                                                                top: 0,
                                                                left: 0,
                                                                width: "100%",
                                                                height: "100%",
                                                                display: "flex",
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                                borderRadius: 8,
                                                                opacity: 0,
                                                            }}
                                                        >
                                                            <PlayArrowIcon sx={{ color: "#fff", fontSize: 32 }} />
                                                        </Box>
                                                    </Box>

                                                    <Box
                                                        sx={{
                                                            ml: 2,
                                                            overflow: "hidden",
                                                            textOverflow: "ellipsis",
                                                            whiteSpace: "nowrap",
                                                        }}
                                                    >
                                                        <Typography fontWeight={600} noWrap>
                                                            {track.name}
                                                        </Typography>
                                                        <Typography
                                                            noWrap
                                                            sx={{ display: { xs: "block", md: "none" } }}
                                                        >
                                                            {track.artists.map((a: any) => a.name).join(", ")}
                                                        </Typography>
                                                    </Box>
                                                </TableCell>

                                                <TableCell sx={{ overflow: "hidden", display: { xs: "none", md: "table-cell" } }}>
                                                    <Typography
                                                        noWrap
                                                        sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                                                    >
                                                        {track.artists.map((a: any) => a.name).join(", ")}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell
                                                    sx={{
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis",
                                                        whiteSpace: "nowrap",
                                                        display: { xs: "none", sm: "none", md: "table-cell" },
                                                    }}
                                                >
                                                    <Typography noWrap sx={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                                                        {track.album?.name}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell
                                                    align="left"
                                                    sx={{
                                                        pr: 1,
                                                        verticalAlign: "middle",
                                                        display: { xs: "none", sm: "none", md: "none", lg: "table-cell" },
                                                    }}
                                                >
                                                    <Stack direction="row" gap={1} alignItems="center">
                                                        <Typography>{formatMs(track.duration_ms)}</Typography>

                                                    </Stack>
                                                </TableCell>

                                                <TableCell align="right" sx={{ px: 0, width: 48 }}>
                                                    <IconButton
                                                        className="deleteBtn"
                                                        onClick={() => {
                                                            setPendingDeleteId(track.id);
                                                            setDeleteConfirmOpen(true);
                                                        }}
                                                        sx={{ opacity: 0, transition: "opacity 0.2s" }}
                                                        aria-label="트랙 삭제"
                                                    >
                                                        <DeleteIcon fontSize="small" />
                                                    </IconButton>
                                                </TableCell>
                                            </BodyRow>
                                        );
                                    })
                                )}
                                {hasNextPage && (
                                    <TableRow>
                                        <TableCell colSpan={4} align="center" ref={ref}>
                                            {isFetchingNextPage && (
                                                <CircularProgress size={24} sx={{ color: "#d9d9d9" }} />
                                            )}
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </Box>
                )}
            </Container>


            {/* 검색 모달 */}
            <Dialog
                open={openSearch}
                onClose={handleClose}
                fullWidth
                maxWidth="sm"
                PaperProps={{
                    sx: {
                        bgcolor: '#ffffff',
                        boxShadow: 24,
                        borderRadius: 2,
                    },
                }}
            >
                <DialogTitle sx={{ m: 0, p: 2, position: 'relative' }}>
                    플레이리스트에 곡 추가
                    <IconButton
                        aria-label="닫기"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent dividers sx={{ bgcolor: '#ffffff' }}>
                    <EmptyPlaylistWithSearch
                        onClose={handleClose}
                        onAddTrack={handleAddTrack}
                    />
                </DialogContent>
            </Dialog>


            {/* 중복 확인 다이얼로그 */}
            <ConfirmAddDialog
                open={confirmOpen}
                onClose={() => setConfirmOpen(false)}
                onConfirm={() => {
                    if (id && pendingUri) {
                        addTracksMutation.mutate({
                            playlist_id: id,
                            uris: [pendingUri],
                            position: 0,
                        });
                    }
                }}
            />

            {/* 삭제 확인 다이얼로그 */}
            <ConfirmDeleteDialog
                open={deleteConfirmOpen}
                onClose={() => setDeleteConfirmOpen(false)}
                onConfirm={() => {
                    if (id && pendingDeleteId) {
                        removeTracksMutation.mutate({
                            playlist_id: id,
                            uris: [`spotify:track:${pendingDeleteId}`],
                        });
                    }
                }}
            />


        </Box>
    );
};

export default PlaylistDetailPage;