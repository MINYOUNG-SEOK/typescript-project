import { ExternalUrls, SpotifyImage, Artist } from "./commonType";

export interface Track {
    album: {
        id: string;
        name: string;
        images: SpotifyImage[];
        release_date: string;
        uri: string;
    };
    artists: Artist[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    href: string;
    id: string;
    is_local: boolean;
    name: string;
    preview_url: string | null;
    track_number: number;
    type: "track";
    uri: string;
}

