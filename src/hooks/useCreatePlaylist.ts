import { useMutation } from '@tanstack/react-query'
import { createPlaylist } from '../apis/userApi'
import React from 'react'

const useCreatePlaylist = () => {
    return useMutation({
        mutationFn: () => {
            return createPlaylist()
        }
    })
    onSeuccess: () => {

    }
}

export default useCreatePlaylist
