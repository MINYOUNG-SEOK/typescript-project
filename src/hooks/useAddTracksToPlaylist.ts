import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addTracksToPlaylist } from '../apis/playlistApi';
import { AddTracksToPlaylistRequest } from '../models/playlist';

export default function useAddTracksToPlaylist() {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: (params: AddTracksToPlaylistRequest) =>
            addTracksToPlaylist(params),
        onSuccess: (_data, { playlist_id }) => {
            qc.invalidateQueries({ queryKey: ['playlist-items', playlist_id] });
        },
        onError: (error: any) => {
            console.error('트랙 추가 실패', error);
            // 얼럿 & 토스트
        },
    });
}