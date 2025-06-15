import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addTracksToPlaylist } from '../apis/playlistApi'
import { AddTracksToPlaylistRequest } from '../models/playlist'

export default function useAddTracksToPlaylist() {
    const qc = useQueryClient()

    return useMutation({
        mutationFn: (params: AddTracksToPlaylistRequest) =>
            addTracksToPlaylist(params),

        onSuccess: (_data, { playlist_id }) => {
            // 이 플레이리스트의 상세 아이템 목록을 다시 불러오도록
            qc.invalidateQueries({ queryKey: ['playlist-items', playlist_id] })
            qc.invalidateQueries({ queryKey: ['playlist-detail', playlist_id] })

            // 사이드바가 보고 있는 "나의 플레이리스트" 목록도 갱신
            qc.invalidateQueries({ queryKey: ['current-user-playlists'] })
        },

        onError: (error: any) => {
            console.error('트랙 추가 실패', error)
        },
    })
}