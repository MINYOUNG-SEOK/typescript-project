type SelectTopResultParams = {
    artists: any[];
    tracks: any[];
    albums: any[];
    playlists: any[];
};

export function selectTopResult({
    artists,
    tracks,
    albums,
    playlists
}: SelectTopResultParams) {
    if (artists.length > 0) return { type: 'artist', data: artists[0] };
    if (tracks.length > 0) return { type: 'track', data: tracks[0] };
    if (albums.length > 0) return { type: 'album', data: albums[0] };
    if (playlists.length > 0) return { type: 'playlist', data: playlists[0] };
    return null;
}