export type ModelsPageProps = {
    searchParams: Promise<{
        page?: string,
        sort?: "date" | "likes" | "alpha"
        filter?: string,
    }>
}