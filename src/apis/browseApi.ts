import axios from 'axios'
import { SPOTIFY_BASE_URL } from '../configs/commonConfig'
import { getClientCredentialToken } from './authApi'
import { Category } from '../models/browse'

interface GetCategoriesResponse {
    categories: {
        items: Category[]
        total: number
        limit: number
        offset: number
        href: string
        next: string | null
        previous: string | null
    }
}

export const getCategories = async (limit = 20): Promise<Category[]> => {
    // 1. 로컬에 유저 토큰이 없으면 client-credential 토큰으로 대체
    let token = localStorage.getItem('access_token')
    if (!token) {
        const resp = await getClientCredentialToken()
        token = resp.access_token
    }

    // 2. interceptor 없는 axios 인스턴스로 요청
    const res = await axios.get<GetCategoriesResponse>(
        `${SPOTIFY_BASE_URL}/browse/categories`,
        {
            params: { limit },
            headers: { Authorization: `Bearer ${token}` },
        }
    )
    return res.data.categories.items
}