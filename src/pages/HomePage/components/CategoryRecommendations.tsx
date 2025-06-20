import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import useGetCategories from "../../../hooks/useGetCategories";
import useGetCategoryPlaylists from "../../../hooks/useGetCategoryPlaylists";
import ErrorMessage from "../../../common/components/ErrorMessage";
import Card from "../../../common/components/Card";
import SkeletonCard from "../../../common/components/SkeletonCard";
import btnMoreIcon from "../../../assets/btn-more.svg";

const CategoryRecommendations: React.FC = () => {
    const { data: catData, error: catError, isLoading: catLoading } = useGetCategories();
    const firstCategoryId = catData?.categories.items[0]?.id ?? "";
    const { data: plData, error: plError, isLoading: plLoading } = useGetCategoryPlaylists(firstCategoryId);

    if (catError || plError) {
        return <ErrorMessage errorMessage={(catError || plError)!.message} />;
    }

    const isLoading = catLoading || plLoading;
    const playlists = plData?.playlists.items ?? [];

    return (
        <div>
            <Box display="flex" alignItems="center" p="24px 0" gap={1}>
                <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{ fontSize: { xs: '1.05rem', sm: '1.1rem', md: '1.15rem', lg: '1.2rem', xl: '1.5rem' } }}
                >
                    추천 플레이리스트
                </Typography>
                <img src={btnMoreIcon} alt="more" style={{ width: 20, height: 20, cursor: "pointer" }} />
            </Box>
            <Grid container spacing={2}>
                {isLoading ? (
                    Array.from({ length: 6 }).map((_, idx) => (
                        <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2 }} key={idx}>
                            <SkeletonCard />
                        </Grid>
                    ))
                ) : playlists.length > 0 ? (
                    playlists.map((pl) => (
                        <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2 }} key={pl.id}>
                            <Card
                                image={pl.images[0]?.url ?? ""}
                                name={pl.name}
                                artistName={pl.description ?? ""}
                            />
                        </Grid>
                    ))
                ) : (
                    <Grid size={{ xs: 12 }}>
                        <Typography variant="body1" color="text.secondary">
                            데이터가 없습니다.
                        </Typography>
                    </Grid>
                )}
            </Grid>
        </div>
    );
};

export default CategoryRecommendations;