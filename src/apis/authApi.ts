import axios from "axios"
import { clientId, clientSecret } from "../configs/authConfig"
import { ClientCredentialTokenResponse } from "models/auth"

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

export const getClientCredientialToken = async (): Promise<ClientCredentialTokenResponse> => {
    try {
        const body = new URLSearchParams({
            grant_type: "client_credentials"
        })
        const response = await axios.post("https://accounts.spotify.com/api/token", body, {
            headers: {
                Authorization: `Basic ${encodedBase64(clientId + ":" + clientSecret)}`,
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
        return response.data
    } catch (error) {
        throw new Error("Fail to fetch credential token")

    }
}