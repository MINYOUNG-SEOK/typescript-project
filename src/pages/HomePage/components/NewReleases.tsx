import { Box, Grid, Typography } from '@mui/material'
import useGetNewReleases from '../../../hooks/useGetNewReleases'
import React from 'react'
import ErrorMessage from '../../../common/components/ErrorMessage';
import Card from '../../../common/components/Card';
import SkeletonCard from '../../../common/components/SkeletonCard';
import btnMoreIcon from '../../../assets/btn-more.svg'


const NewReleases = () => {
    const { data, error, isLoading } = useGetNewReleases();

    React.useEffect(() => {
        if (data) {
            console.log("데이터는", data);
        }
    }, [data]);

    if (error) {
        return <ErrorMessage errorMessage={error.message} />
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
                        }
                    }}
                >
                    최신곡
                </Typography>
                <img
                    src={btnMoreIcon}
                    alt="more"
                    style={{ width: 20, height: 20, cursor: "pointer" }}
                />
            </Box>

            {/* 앨범 리스트 */}
            <Grid container spacing={2}>
                {isLoading ? (
                    Array.from({ length: 6 }).map((_, idx) => (
                        <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2 }} key={idx}>
                            <SkeletonCard />
                        </Grid>
                    ))
                ) : data && data.albums.items.length > 0 ? (
                    data?.albums.items.map((album) => (
                        <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2 }} key={album.id}>
                            <Card
                                image={album.images?.[0]?.url}
                                name={album.name}
                                artistName={album.artists?.[0]?.name}
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

export default NewReleases;
