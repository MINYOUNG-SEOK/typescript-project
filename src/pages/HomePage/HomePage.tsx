import React from 'react'
import NewReleases from './components/NewReleases'
import CategoryRecommendations from './components/CategoryRecommendations'
import SummerTracks from './components/SummerTracks'
import AnimationMainTracks from './components/DisneyTracks'
import DramaOstPlaylists from './components/DramaOstPlaylists'
import WorkoutPlaylists from './components/WorkoutPlaylists'
import CafePlaylists from './components/CafePlaylists'
import { Box } from '@mui/material'

const HomePage = () => {
    return (
        <div>
            <NewReleases />
            <Box mt={5}>
                <SummerTracks />
            </Box>
            <Box mt={5}>
                <AnimationMainTracks />
            </Box>
            <Box mt={5}>
                <DramaOstPlaylists />
            </Box>
            <Box mt={5}>
                <WorkoutPlaylists />
            </Box>
            <Box mt={5}>
                <CafePlaylists />
            </Box>
            {/* <CategoryRecommendations /> */}
        </div>
    )
}

export default HomePage
