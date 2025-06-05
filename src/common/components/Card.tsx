import { Box, Typography } from '@mui/material';
import PlayButton from './PlayButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

interface CardProps {
    image: string;
    name: string;
    artistName?: string;
}


const Card = ({ image, name, artistName }: CardProps) => {
    const fallbackImage = "/no-image.jpg";

    return (
        <Box
            sx={{
                position: 'relative',
                '&:hover .overlay-btn': {
                    opacity: 1,
                },
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    borderRadius: 2,
                    overflow: 'hidden',
                }}
            >
                <Box
                    component="img"
                    src={image?.trim() ? image : fallbackImage}
                    onError={(e) => {
                        e.currentTarget.src = fallbackImage;
                    }}
                    alt={name}
                    sx={{
                        width: '100%',
                        aspectRatio: '1 / 1',
                        objectFit: 'cover',
                        display: 'block',
                        borderRadius: 2,
                    }}
                />

                {/* 재생 버튼 */}
                <Box
                    className="overlay-btn"
                    sx={{
                        position: 'absolute',
                        bottom: 8,
                        left: 8,
                        opacity: 0,
                        transition: 'opacity 0.2s ease-in-out',
                    }}
                >
                    <PlayButton hover />
                </Box>
            </Box>

            {/* 텍스트 */}
            <Box mt={0.5}>
                <Typography fontSize="0.9rem" fontWeight={600} noWrap>
                    {name}
                </Typography>
                {artistName && (
                    <Typography fontSize="0.8rem" color="text.secondary" noWrap>
                        {artistName}
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default Card;