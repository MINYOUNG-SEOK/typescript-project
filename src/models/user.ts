import {
    ExplicitContent,
    ExternalUrls,
    Followers,
    SpotifyImage,
} from "./commonType";

export interface PublicUser {
    display_name: string | null;
    external_urls: ExternalUrls;
    followers: Followers;
    href: string;
    id: string;
    images: SpotifyImage[];
    type: "user";
    uri: string;
}

export interface PrivateUser extends PublicUser {
    country?: string;
    email?: string;
    explicit_content?: ExplicitContent;
    product?: string;
}


export type User = PrivateUser;