import { Model } from "@/app/types/Model";

export type ModelsGridProps = {
    title: string,
    models: Model[],
    filterQuery?: string | undefined
}