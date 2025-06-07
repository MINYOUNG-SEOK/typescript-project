import { AuthUrlParams } from "models/auth";
import { base64encode, generateRandomString, sha256 } from "../utils/crypto";
import { CLIENT_ID } from "../configs/authConfig";
import { REDIRECT_URI } from "../configs/commonConfig";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getSpotifyAuthUrl = async () => {
    const codeVerifier = generateRandomString(64);
    const hashed = await sha256(codeVerifier);
    const codeChallenge = base64encode(hashed);

    window.localStorage.setItem('code_verifier', codeVerifier);

    if (!CLIENT_ID || !REDIRECT_URI) {
        throw new Error("Missing CLIENT_ID or REDIRECT_URI");
    }

    const params: AuthUrlParams = {
        response_type: 'code',
        client_id: CLIENT_ID,
        scope: 'user-read-private user-read-email',
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
        redirect_uri: REDIRECT_URI,
    };
    const authUrl = new URL("https://accounts.spotify.com/authorize");
    authUrl.search = new URLSearchParams(Object.entries(params)).toString();

    await delay(100);
    window.location.href = authUrl.toString();
};