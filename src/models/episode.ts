import { ExternalUrls, SpotifyImage } from "./commonType";

export interface Episode {
    id: string;
    name: string;
    description: string;
    duration_ms: number;
    release_date: string;
    explicit: boolean;
    language?: string;
    images: SpotifyImage[];
    is_externally_hosted: boolean;
    is_playable: boolean;
    type: "episode";
    uri: string;
}