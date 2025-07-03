export type ModelsPageProps = {
    searchParams: Promise<{
        sort?: "date" | "likes" | "alpha"
        filter?: string,
    }>
}