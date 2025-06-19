import React from 'react'
import NewReleases from './components/NewReleases'
import CategoryRecommendations from './components/CategoryRecommendations'
import SummerTracks from './components/SummerTracks'
import AnimationMainTracks from './components/DisneyTracks'
import DramaOstPlaylists from './components/DramaOstPlaylists'
import WorkoutPlaylists from './components/WorkoutPlaylists'
import CafePlaylists from './components/CafePlaylists'

const HomePage = () => {
    return (
        <div>
            <NewReleases />
            <SummerTracks />
            <AnimationMainTracks />
            <DramaOstPlaylists />
            <WorkoutPlaylists />
            <CafePlaylists />
            {/* <CategoryRecommendations /> */}
        </div>
    )
}

export default HomePage
