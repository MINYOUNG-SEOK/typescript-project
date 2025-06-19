import { Box, Grid, Typography } from '@mui/material';
import useSearchItemsByKeyword from '../../../hooks/useSearchItemsByKeyword';
import React from 'react';
import ErrorMessage from '../../../common/components/ErrorMessage';
import TrackCard from '../../../common/components/TrackCard';
import SkeletonCard from '../../../common/components/SkeletonCard';
import btnMoreIcon from '../../../assets/btn-more.svg';

const keywords = [
    '모아나',
    '엘리멘탈',
    '토이스토리',
    '주토피아',
    '뮬란',
    'frozen',
];

const AnimationMainTracks = () => {
    // 각 키워드별로 1곡씩만 뽑기
    const results = keywords.map((q) => useSearchItemsByKeyword({ q, type: ['track'], limit: 3 }));
    const isLoading = results.some(r => r.isLoading);
    const error = results.find(r => r.error)?.error;
    // 각 검색 결과에서 첫 번째 곡만 추출, 중복 제거
    const tracks = results
        .map(r => r.data?.pages?.[0]?.tracks?.items?.[0])
        .filter((track): track is any => !!track && !!track.id)
        .reduce((acc, track) => {
            if (!acc.find(t => t.id === track.id)) acc.push(track);
            return acc;
        }, [] as any[]);

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
                    애니메이션 대표곡 셀렉션
                </Typography>
                <img
                    src={btnMoreIcon}
                    alt="more"
                    style={{ width: 20, height: 20, cursor: 'pointer' }}
                />
            </Box>
            {/* 곡 리스트 */}
            <Grid container spacing={2}>
                {isLoading ? (
                    Array.from({ length: 6 }).map((_, idx) => (
                        <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2 }} key={idx}>
                            <SkeletonCard />
                        </Grid>
                    ))
                ) : tracks.length > 0 ? (
                    tracks.map((track) => (
                        <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2 }} key={track.id}>
                            <TrackCard track={track} isLogin={false} />
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

export default AnimationMainTracks; 