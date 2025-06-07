import { ExplicitContent, ExternalUrls, Followers, SpotifyImage } from "./commonType";

export interface User {
    country?: string;
    display_name: string | null;
    email?: string;
    explicit_content?: ExplicitContent;
    external_urls: ExternalUrls;
    followers: Followers;
    href: string;
    id: string;
    images: SpotifyImage[];
    product?: string;
    type: string;
    uri: string;
}