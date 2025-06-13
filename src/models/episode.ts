import { ExternalUrls, SpotifyImage, Restriction } from "./commonType";

export interface Episode {
    id: string;
    name: string;
    description: string;
    html_description: string;
    duration_ms: number;
    release_date: string;
    release_date_precision: string;
    explicit: boolean;
    external_urls: ExternalUrls;
    href: string;
    images: SpotifyImage[];
    is_externally_hosted: boolean;
    is_playable: boolean;
    type: "episode";
    uri: string;
    resume_point?: {
        fully_played?: boolean;
        resume_position_ms?: number;
    };
    restrictions?: Restriction;
    show: Show;
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

export type SimplifiedEpisode = Omit<Episode, "show">;
