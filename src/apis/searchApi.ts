import axios from 'axios'
import { SPOTIFY_BASE_URL } from '../configs/commonConfig'
import { getClientCredentialToken } from './authApi'
import { SearchRequestParams, SearchResponse } from '../models/search'

export const searchItemsByKeyword = async (
    tokenIn?: string,
    params?: SearchRequestParams
): Promise<SearchResponse> => {
    // 1) 토큰 확보
    let token = tokenIn
    if (!token) {
        const resp = await getClientCredentialToken()
        token = resp.access_token
    }

    if (!params) {
        throw new Error('검색 파라미터가 없습니다.')
    }

    const { q, type, limit = 20, offset = 0 } = params

    // 2) 배열 → "track,artist,album" 형태로 변환
    const typeParam = Array.isArray(type) ? type.join(',') : type

    // 3) interceptor 없는 axios 를 직접 사용
    const res = await axios.get<SearchResponse>(
        `${SPOTIFY_BASE_URL}/search`,
        {
            params: { q, type: typeParam, limit, offset },
            headers: { Authorization: `Bearer ${token}` },
        }
    )

    return res.data
}