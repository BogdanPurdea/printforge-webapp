import { Model } from "@/app/types/Model";

export type ModelsGridProps = {
    title: string,
    models: Model[],
    searchParams: Promise<{
        sort?: "date" | "likes" | "alpha"
        filter?: string,
    }>
}