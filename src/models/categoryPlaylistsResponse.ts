export interface Playlist {
    id: string;
    name: string;
    images: { url: string }[];
    description: string | null;
}

export interface GetCategoryPlaylistsResponse {
    playlists: {
        items: Playlist[];
    };
}