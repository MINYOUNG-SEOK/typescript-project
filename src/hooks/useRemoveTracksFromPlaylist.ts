// src/hooks/useRemoveTracksFromPlaylist.ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { removeTracksFromPlaylist } from '../apis/playlistApi'

type RemoveTracksParams = {
    playlist_id: string
    uris: string[]
}

export default function useRemoveTracksFromPlaylist() {
    const qc = useQueryClient()

    return useMutation<
        void,
        Error,
        RemoveTracksParams
    >({
        mutationFn: ({ playlist_id, uris }) =>
            removeTracksFromPlaylist({
                playlist_id,
                tracks: uris.map(uri => ({ uri, positions: [] }))
            }),
        onSuccess: (_data, { playlist_id }) => {
            // 플레이리스트 상세/항목 무효화
            qc.invalidateQueries({ queryKey: ['playlist-items', playlist_id] })
            qc.invalidateQueries({ queryKey: ['playlist-detail', playlist_id] })
            // 사이드바: 내 플레이리스트 무한스크롤 훅 무효화
            qc.invalidateQueries({ queryKey: ['current-user-playlists'] })
        },
        onError: (error: any) => {
            console.error('트랙 삭제 실패', error)
        },
    })
}