export interface Category {
    href: string;
    icons: Array<{
        height: number | null;
        url: string;
        width: number | null;
    }>;
    id: string;
    name: string;
}