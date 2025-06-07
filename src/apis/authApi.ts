import axios from "axios";
import { CLIENT_ID, CLIENT_SECRET } from "../configs/authConfig";
import { REDIRECT_URI } from "../configs/commonConfig";
import { ClientCredentialTokenResponse, ExchangeTokenResponse } from "../models/auth";

const encodedBase64 = (data: string): string => {
    const utf8Bytes = new TextEncoder().encode(data);
    let binary = "";
    utf8Bytes.forEach(byte => binary += String.fromCharCode(byte));
    return btoa(binary);
};

export const getClientCredentialToken = async (): Promise<ClientCredentialTokenResponse> => {
    const body = new URLSearchParams({ grant_type: "client_credentials" });
    const resp = await axios.post("https://accounts.spotify.com/api/token", body, {
        headers: {
            Authorization: `Basic ${encodedBase64(CLIENT_ID + ":" + CLIENT_SECRET)}`,
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });
    return resp.data;
};

export const exchangeToken = async (
    code: string,
    codeVerifier: string
): Promise<ExchangeTokenResponse> => {
    const body = new URLSearchParams({
        client_id: CLIENT_ID,
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI,
        code_verifier: codeVerifier,
    });
    const resp = await axios.post("https://accounts.spotify.com/api/token", body, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
    });
    return resp.data;
};