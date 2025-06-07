import { ExternalUrls, Owner, SpotifyImage } from "./commonType";
import { ApiResponse } from "./apiResponse";

export interface GetCurrentUserPlaylistRequest {
    limit?: number;
    offset?: number;
}

export interface SimplifiedPlaylist {
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
    tracks: {
        href: string;
        total: number;
    };
    type: "playlist";
    uri: string;
    primary_color: string | null;
}

export type GetCurrentUserPlaylistsResponse = ApiResponse<SimplifiedPlaylist>;