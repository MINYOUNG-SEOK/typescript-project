// types/playlist.ts
import { ExternalUrls, Followers, Owner, SpotifyImage } from "./commonType";
import { ApiResponse } from "./apiResponse";
import { Track } from "./track";
import { Episode } from "./episode";
import { PublicUser } from "./user";

/* ───────── 요청 DTO ───────── */
export interface GetCurrentUserPlaylistRequest {
    limit?: number;
    offset?: number;
}

export interface GetPlaylistRequest {
    playlist_id: string;
    market?: string;
    fields?: string;
    additional_types?: string;
}

interface BasePlaylist {
    collaborative: boolean;
    description: string | null;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: SpotifyImage[];
    name: string;
    owner: Owner;
    public: boolean | null;
    snapshot_id: string;
    type: "playlist";
    uri: string;
    primary_color: string | null;
}

export interface SimplifiedPlaylist extends BasePlaylist {
    tracks: {
        href: string;
        total: number;
    };
}

export interface Playlist extends BasePlaylist {
    tracks: ApiResponse<PlaylistTrack>;
    followers: Followers;
}

export interface PlaylistTrack {
    added_at: string | null;
    added_by: PublicUser | null;
    is_local: boolean;
    video_thumbnail?: {
        url: string | null;
    };
    track: Track | Episode | null;
}

export type GetCurrentUserPlaylistsResponse =
    ApiResponse<SimplifiedPlaylist>;