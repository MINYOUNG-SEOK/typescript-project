import { SimplifiedAlbum } from "./album";
import { Artist } from "./artist";
import { ExternalUrls, Restriction } from "./commonType";

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