import api from '../utils/api'
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
    const res = await api.get<GetCategoriesResponse>('/browse/categories', {
        params: { limit }
    })
    return res.data.categories.items
}