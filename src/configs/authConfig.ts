export const clientSecret = process.env.REACT_APP_SPOTIFY_SECRET_ID;
export const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;

if (!clientId || !clientSecret) {
    console.warn("❗ 클라이언트 ID 또는 시크릿이 누락되었습니다");
}