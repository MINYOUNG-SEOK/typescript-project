import { AuthUrlParams } from "models/auth";
import { base64encode, generateRandomString, sha256 } from "./crypto";
import { CLIENT_ID } from "../configs/authConfig";
import { REDIRECT_URI } from "../configs/commonConfig";

// 짧은 시간 대기 함수 (Promise를 반환하여 await 가능하도록)
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getSpotifyAuthUrl = async () => {
    const codeVerifier = generateRandomString(64);
    const hashed = await sha256(codeVerifier)
    const codeChallenge = base64encode(hashed);
    const clientId = CLIENT_ID;
    const redirectUri = REDIRECT_URI;
    const scope = 'user-read-private user-read-email';
    const authUrl = new URL("https://accounts.spotify.com/authorize")

    // Local Storage에 code_verifier 저장
    window.localStorage.setItem('code_verifier', codeVerifier);

    if (clientId && redirectUri) {
        const params: AuthUrlParams = {
            response_type: 'code',
            client_id: clientId,
            scope,
            code_challenge_method: 'S256',
            code_challenge: codeChallenge,
            redirect_uri: redirectUri,
        };
        authUrl.search = new URLSearchParams(Object.entries(params)).toString();

        // 리다이렉트 전에 잠시 대기 
        await delay(100);
        window.location.href = authUrl.toString();
    }
}