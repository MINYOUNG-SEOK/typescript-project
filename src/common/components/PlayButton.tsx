import { IconButton } from '@mui/material';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';

interface PlayButtonProps {
    onClick?: () => void;
    hover?: boolean;
}

const PlayButton = ({ onClick, hover = false }: PlayButtonProps) => {
    return (
        <IconButton
            onClick={onClick}
            sx={{
                width: 40,
                height: 40,
                backgroundColor: hover ? '#1DB954' : 'rgba(255, 255, 255, 0.1)',
                color: '#fff',
                backdropFilter: 'blur(4px)',
                borderRadius: '50%',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                    backgroundColor: '#1DB954',
                },
            }}
        >
            <PlayArrowRoundedIcon />
        </IconButton>
    );
};

export default PlayButton;