import useGetCurrentUserPlaylists from '../../hooks/useGetCurrentUserPlaylists'
import React from 'react'

const Library = () => {
    const { data } = useGetCurrentUserPlaylists({ limit: 10, offset: 0 })
    console.log("ddd", data)
    return (
        <div>
            안녕
        </div>
    )
}

export default Library
