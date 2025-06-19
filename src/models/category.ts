export interface Category {
    id: string;
    name: string;
    icons: { url: string }[];
}

export interface GetCategoriesResponse {
    categories: {
        items: Category[];
    };
}