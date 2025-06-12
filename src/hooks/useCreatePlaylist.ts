import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createPlaylist } from '../apis/playlistApi'
import { CreatePlaylistRequest } from 'models/playlist'
import useGetCurrentUserProfile from './useGetCurrentUserProfile'

const useCreatePlaylist = () => {
    const queryClient = useQueryClient()
    const { data: user } = useGetCurrentUserProfile()

    return useMutation({
        mutationFn: (params: CreatePlaylistRequest) => {
            if (!user) {
                return Promise.reject(new Error('user is not defined'))
            }
            return createPlaylist(user.id, params)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["current-user-playlists"] })
            console.log('성공')
        },
        onError: (err: Error) => {
            console.error('실패:', err.message)
        }
    })
}

export default useCreatePlaylist