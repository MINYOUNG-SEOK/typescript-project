import { useQuery } from '@tanstack/react-query'
import { getCategories } from '../apis/browseApi'
import { Category } from '../models/browse'

export default function useGetCategories() {
    return useQuery<Category[], Error>({
        queryKey: ['categories'],
        queryFn: () => getCategories(20),
        staleTime: 1000 * 60 * 5,
    })
}