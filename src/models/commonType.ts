export interface ExternalUrls {
    spotify: string;
}

export interface SpotifyImage {
    url: string;
    height: number | null;
    width: number | null;
}

export interface Restriction {
    reason?: string;
}