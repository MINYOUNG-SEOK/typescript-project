import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import {
    Box,
    Container,
    Stack,
    Typography,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button,
    IconButton,
    styled,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ImageWithFallback from "../../common/components/ImageWithFallbackProps";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";

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
    whiteSpace: "nowrap",
});

const BodyRow = styled(TableRow)({
    cursor: "pointer",
    "&:hover": { background: "#f2f2f2" },
});

const containerProps = { maxWidth: false as const, disableGutters: true as const };
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

const formatMs = (ms: number) => {
    const total = Math.floor(ms / 1000);
    const m = Math.floor(total / 60);
    const s = total % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
};

const FavoritesPage: React.FC = () => {
    const { data: userProfile } = useGetCurrentUserProfile();
    const [favorites, setFavorites] = React.useState<any[]>([]);
    const accessToken = localStorage.getItem("access_token");

    useEffect(() => {
        const stored = localStorage.getItem("favorites");
        if (stored) setFavorites(JSON.parse(stored));
    }, []);

    if (!accessToken) {
        return (
            <Container sx={{ mt: 8 }}>
                <Typography variant="body1" align="center" color="text.secondary">
                    로그인 후 확인 가능한 페이지입니다.
                </Typography>
            </Container>
        );
    }

    const toggleFavorite = (id: string) => {
        const next = favorites.filter(t => t.id !== id);
        setFavorites(next);
        localStorage.setItem("favorites", JSON.stringify(next));
    };

    if (!favorites) return <Navigate to="/" replace />;

    const totalMs = favorites.reduce((sum, t) => sum + (t.duration_ms ?? 0), 0);
    const totalSec = Math.floor(totalMs / 1000);
    const minutesOnly = Math.floor(totalSec / 60);
    const seconds = totalSec % 60;

    const headerImg = favorites[0]?.album?.images?.[0]?.url ?? "";

    return (
        <Box sx={{ display: "flex", flexDirection: "column", bgcolor: "#FFF" }}>
            {/* 헤더 */}
            <Container {...containerProps} sx={headerWrapperSx}>
                <Box
                    component={ImageWithFallback}
                    src={headerImg}
                    fallbackSrc="https://placehold.co/300x300?text=No+Image"
                    alt={favorites[0]?.name ?? "Favorites"}
                    sx={{
                        width: { xs: 150, sm: 200 },
                        height: { xs: 150, sm: 200 },
                        borderRadius: 2,
                        objectFit: "cover",
                    }}
                />
                <Stack
                    sx={{ gap: 2, alignSelf: { md: "center" } }}
                    justifyContent={{ xs: "center", md: "flex-end" }}
                    alignItems={{ xs: "center", md: "flex-start" }}
                >
                    <Typography variant="body2">즐겨찾기한 노래</Typography>
                    <Typography
                        fontWeight={700}
                        lineHeight={1.2}
                        sx={{ fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" } }}
                    >
                        Favorites
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <ImageWithFallback
                            src={userProfile?.images?.[0]?.url ?? ""}
                            fallbackSrc="https://placehold.co/28x28?text=No+Image"
                            alt={userProfile?.display_name ?? "User"}
                            width={28}
                            height={28}
                            style={{ borderRadius: "50%" }}
                        />
                        <Typography variant="body2">
                            <strong>{userProfile?.display_name}</strong> · {favorites.length}곡, {minutesOnly}분 {seconds}초
                        </Typography>
                    </Stack>
                    <Stack direction="row" gap={2} sx={{ mt: 2 }}>
                        <GreenButton startIcon={<PlayArrowIcon sx={{ color: "#fff" }} />}>
                            재생
                        </GreenButton>
                        <GreenButton startIcon={<ShuffleIcon sx={{ color: "#fff" }} />}>
                            임의 재생
                        </GreenButton>
                    </Stack>
                </Stack>
            </Container>

            {/* 테이블 */}
            <Box sx={{ flex: 1, mt: 4 }}>
                <Container {...containerProps} sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
                    <Table sx={{ width: "100%", tableLayout: "fixed", "& th, & td": { border: "none", py: 1.25 } }}>
                        <TableHead>
                            <TableRow>
                                <HeaderTableCell sx={{ width: { xs: "100%", md: "35%" } }}>노래</HeaderTableCell>
                                <HeaderTableCell sx={{ display: { xs: "none", md: "table-cell" } }}>아티스트</HeaderTableCell>
                                <HeaderTableCell sx={{ display: { xs: "none", sm: "none", md: "table-cell" } }}>앨범</HeaderTableCell>
                                <HeaderTableCell
                                    align="left"
                                    sx={{ width: 80, display: { xs: "none", sm: "none", md: "none", lg: "table-cell" } }}
                                >
                                    시간
                                </HeaderTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {[...favorites].reverse().map((track, i) => {
                                const isFav = true;
                                return (
                                    <BodyRow
                                        key={track.id ?? i}
                                        sx={{ backgroundColor: i % 2 === 0 ? "#FAFAFA" : "transparent", overflow: "visible", }}

                                    >
                                        <TableCell
                                            sx={{
                                                pl: 2,
                                                position: "relative",
                                                display: "flex",
                                                alignItems: "center",
                                                overflow: "visible",
                                            }}
                                        >
                                            <IconButton
                                                className="favBtn"
                                                onClick={() => toggleFavorite(track.id)}
                                                disableRipple
                                                sx={{
                                                    backgroundColor: "transparent",
                                                    position: "absolute",
                                                    left: -40,
                                                    top: "50%",
                                                    transform: "translateY(-50%)",
                                                    opacity: 1,
                                                    transition: "opacity 0.2s",
                                                }}
                                                aria-label="즐겨찾기 해제"
                                            >
                                                <FavoriteIcon sx={{ color: "red" }} />
                                            </IconButton>

                                            <Box sx={{ position: "relative", display: "inline-block" }}>
                                                <ImageWithFallback
                                                    src={track.album?.images?.[2]?.url}
                                                    fallbackSrc="https://placehold.co/50x50?text=No+Image"
                                                    width={50}
                                                    height={50}
                                                    alt={track.name}
                                                    style={{ display: 'block', borderRadius: 4, objectFit: "cover" }}
                                                />
                                                <Box
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
                                                        transition: "opacity 0.2s",
                                                        "&:hover": { opacity: 1 },
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
                                                <Typography noWrap sx={{ display: { xs: "block", md: "none" } }}>
                                                    {track.artists.map((a: any) => a.name).join(", ")}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                                            <Typography noWrap sx={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                                                {track.artists.map((a: any) => a.name).join(", ")}
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ display: { xs: "none", sm: "none", md: "table-cell" } }}>
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
                                            <Typography>{formatMs(track.duration_ms)}</Typography>
                                        </TableCell>
                                    </BodyRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Container>
            </Box>
        </Box>
    );
};

export default FavoritesPage;