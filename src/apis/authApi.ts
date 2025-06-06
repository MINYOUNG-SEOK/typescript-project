import axios from "axios"
import { CLIENT_ID, CLIENT_SECRET } from "../configs/authConfig"
import { ClientCredentialTokenResponse, ExchangeTokenResponse } from "models/auth"
import { REDIRECT_URI } from "../configs/commonConfig";

const encodedBase64 = (data: string): string => {
    if (typeof window !== "undefined") {
        const utf8Bytes = new TextEncoder().encode(data); // UTF-8 인코딩
        let binary = '';
        utf8Bytes.forEach((byte) => {
            binary += String.fromCharCode(byte);
        });
        return btoa(binary); // Base64 인코딩
    } else {
        return Buffer.from(data, "utf-8").toString("base64");
    }
};

export const getClientCredentialToken = async (): Promise<ClientCredentialTokenResponse> => {
    try {
        const body = new URLSearchParams({
            grant_type: "client_credentials"
        })
        const response = await axios.post("https://accounts.spotify.com/api/token", body, {
            headers: {
                Authorization: `Basic ${encodedBase64(CLIENT_ID + ":" + CLIENT_SECRET)}`,
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
        return response.data
    } catch (error) {
        throw new Error("Fail to fetch credential token")
    }
};

export const exchangeToken = async (code: string, codeVerifier: string): Promise<ExchangeTokenResponse> => {
    try {
        const url = "https://accounts.spotify.com/api/token"
        if (!CLIENT_ID || !REDIRECT_URI) {
            throw new Error("Missing required parameters")
        }
        const body = new URLSearchParams({
            client_id: CLIENT_ID,
            grant_type: 'authorization_code',
            code,
            redirect_uri: REDIRECT_URI,
            code_verifier: codeVerifier,
        });

        const response = await axios.post(url, body, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        });
        return response.data;
    } catch (error) {
        throw new Error("fail to fetch token")
    }
};