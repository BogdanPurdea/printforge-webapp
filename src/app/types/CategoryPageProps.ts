export type CategoryPageProps = {
    params: Promise<{
        categoryName: string;
    }>,
    searchParams: Promise<{
        sort?: "date" | "likes" | "alpha"
        filter?: string,
    }>
}