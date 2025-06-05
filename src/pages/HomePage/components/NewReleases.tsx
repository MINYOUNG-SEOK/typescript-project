import { Typography } from '@mui/material'
import useGetNewReleases from '../../../hooks/useGetNewReleases'
import React from 'react'

const NewReleases = () => {
    const { data, error, isLoading } = useGetNewReleases();
    console.log("ddd", data)
    return (
        <div>
            <Typography variant="h1" paddingTop="8px">
                New Released Albums
            </Typography>
        </div>
    );
};

export default NewReleases;
