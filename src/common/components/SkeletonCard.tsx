import { Skeleton, Box } from '@mui/material';

const SkeletonCard = () => {
    return (
        <Box
            sx={{
                width: '100%',
                aspectRatio: '1 / 1',
                borderRadius: 2,
                overflow: 'hidden',
            }}
        >
            <Skeleton
                variant="rectangular"
                animation="wave"
                width="100%"
                height="100%"
                sx={{ bgcolor: '#e0e0e0' }}
            />
        </Box>
    );
};

export default SkeletonCard;