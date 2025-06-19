import { Box, Grid, Typography } from '@mui/material';
import useSearchItemsByKeyword from '../../../hooks/useSearchItemsByKeyword';
import React from 'react';
import ErrorMessage from '../../../common/components/ErrorMessage';
import Card from '../../../common/components/Card';
import SkeletonCard from '../../../common/components/SkeletonCard';
import btnMoreIcon from '../../../assets/btn-more.svg';

const WorkoutPlaylists = () => {
    // 운동 관련 플레이리스트 20개 받아서 조건에 맞는 6개만 보여줌
    const { data, error, isLoading } = useSearchItemsByKeyword({ q: '운동', type: ['playlist'], limit: 20 });
    const playlists = data?.pages?.[0]?.playlists?.items?.filter(
        pl => pl && Array.isArray(pl.images) && pl.images.length > 0 && pl.name && pl.owner
    )?.slice(0, 6) ?? [];

    if (error) {
        return <ErrorMessage errorMessage={error.message} />;
    }
    return (
        <div>
            {/* 헤더 + 버튼 아이콘 */}
            <Box display="flex" alignItems="center" padding="24px 0" gap={1}>
                <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{
                        fontSize: {
                            xs: '1.2rem',
                            sm: '1.3rem',
                            md: '1.4rem',
                            lg: '1.5rem',
                        },
                    }}
                >
                    운동할 때 듣기 좋은 플레이리스트
                </Typography>
                <img
                    src={btnMoreIcon}
                    alt="more"
                    style={{ width: 20, height: 20, cursor: 'pointer' }}
                />
            </Box>
            {/* 플레이리스트 리스트 */}
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
                                image={pl.images?.[0]?.url || ''}
                                name={pl.name}
                                artistName={pl.owner?.display_name}
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

export default WorkoutPlaylists; 