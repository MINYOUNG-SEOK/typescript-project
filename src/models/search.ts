import { SimplifiedAlbum } from "./album";
import { ApiResponse } from "./apiResponse";
import { Artist } from "./artist";
import { Episode, SimplifiedEpisode } from "./episode";
import { SimplifiedPlaylist } from "./playlist";
import { Show, SimplifiedAudiobook, Track } from "./track";

export const enum SEARCH_TYPE {
    Track = "track",
    Album = "album",
    Playlist = "playlist",
    Show = "show",
    Episode = "episode",
    AudioBook = "audiobook",
    Artist = "artist",

}

export interface SearchRequestParams {
    q: string;
    type: SEARCH_TYPE[];
    market?: string;
    limit?: number;
    offset?: number;
    include_external?: string;
}

export interface SearchResponse {
    artists?: ApiResponse<Artist>;
    albums?: ApiResponse<SimplifiedAlbum>;
    tracks?: ApiResponse<Track>;
    playlists?: ApiResponse<SimplifiedPlaylist>;
    show?: ApiResponse<Show>;
    episode?: ApiResponse<SimplifiedEpisode>;
    audiobook?: ApiResponse<SimplifiedAudiobook>;
}