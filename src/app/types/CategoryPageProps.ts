export type CategoryPageProps = {
    params: {
        categoryName: string;
    },
    searchParams: {
        sort?: "date" | "likes" | "alpha";
        filter?: string;
        page?: string;
    }
}