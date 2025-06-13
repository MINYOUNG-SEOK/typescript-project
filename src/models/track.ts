import { SimplifiedAlbum } from "./album";
import { Artist } from "./artist";
import { ExternalUrls, Restriction, SpotifyImage } from "./commonType";

export interface Track {
    album: SimplifiedAlbum;
    artists?: Artist[];
    available_markets?: string[];
    disc_number?: number;
    duration_ms?: number;
    explicit?: boolean;
    external_ids?: {
        isrc: string;
        ean: string;
        upc: string;
    };
    external_urls?: ExternalUrls;
    href?: string;
    id?: string;
    is_playable?: boolean;
    linked_from?: Track;
    restrictions?: Restriction;

    name?: string;
    popularity?: number;
    preview_url?: string | null;
    track_number?: number;
    type: "track";
    uri?: string;
    is_local?: boolean;
}


export interface Show {
    available_markets: string[];
    copyrights: {
        text?: string;
        type?: string;
    };
    description: string;
    explicit: boolean;
    html_description: string;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: SpotifyImage[];
    is_externally_hosted: boolean;
    media_type: string;
    name: string;
    publisher: string;
    type: "show";
    uri: string;
    total_episodes: number;
}

export interface Copyright {
    text: string;
    type: string;
}

export interface SimplifiedAudiobook {
    authors: { name: string }[];
    available_markets: string[];
    copyrights: Copyright[];
    description: string;
    html_description: string;
    edition?: string;
    explicit: boolean;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: SpotifyImage[];
    languages: string[];
    media_type: string;
    name: string;
    narrators: { name: string }[];
    publisher: string;
    type: "audiobook";
    uri: string;
    total_chapters: number;
}