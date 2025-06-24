export type CategoryPageProps = {
    params: Promise<{
        categoryName: string;
    }>,
    searchParams: Promise<{
        query?: string;
    }>,
}