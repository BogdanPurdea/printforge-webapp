export type CategoryPageProps = {
    params: {
        categoryName: string;
    };
    searchParams: {
        page?: string;
        filter?: string;
        sort?: "date" | "likes" | "alpha";
    };
};