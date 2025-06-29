import { Box, Grid, Typography } from '@mui/material';
import useSearchItemsByKeyword from '../../../hooks/useSearchItemsByKeyword';
import React from 'react';
import ErrorMessage from '../../../common/components/ErrorMessage';
import Card from '../../../common/components/Card';
import SkeletonCard from '../../../common/components/SkeletonCard';
import btnMoreIcon from '../../../assets/btn-more.svg';
import { SEARCH_TYPE } from '../../../models/search';
import { Track } from '../../../models/track';

const SummerTracks = () => {
    const { data, error, isLoading } = useSearchItemsByKeyword({ q: '여름', type: [SEARCH_TYPE.Track], limit: 6 });
    const tracks: Track[] = data?.pages?.[0]?.tracks?.items?.slice(0, 6) ?? [];

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
                    여름에 듣기 좋은 곡
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
                    tracks.map((track: Track) => (
                        <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2 }} key={track.id}>
                            <Card
                                image={track.album?.images?.[0]?.url || ''}
                                name={track.name}
                                artistName={track.artists?.map((a: any) => a.name).join(', ')}
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

export default SummerTracks; 