import React from 'react';
import { Box, Typography } from '@mui/material';
import { Track } from '../../../models/track';

type Props = { list: Track[] };
const SearchResultList: React.FC<Props> = ({ list }) => {
    return (
        <Box>
            {list.map(track => (
                <Box
                    key={track.id}
                    sx={{ display: 'flex', alignItems: 'center', py: 1 }}
                >
                    <img src={track.album.images[0].url} width={40} height={40} alt={track.name} />
                    <Typography sx={{ ml: 2 }}>{track.name}</Typography>
                </Box>
            ))}
        </Box>
    );
};

export default SearchResultList;