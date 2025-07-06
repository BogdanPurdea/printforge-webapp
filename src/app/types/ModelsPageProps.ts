export type ModelsPageProps = {
    searchParams: {
        page?: string,
        sort?: "date" | "likes" | "alpha"
        filter?: string,
    }
}