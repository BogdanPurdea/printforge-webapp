export type ModelsPageProps = {
    searchParams: Promise<{
        page?: string,
        sort?: "date" | "likes" | "alpha"
        query?: string,
    }>
}