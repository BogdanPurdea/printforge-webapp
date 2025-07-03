import { ModelsGridProps } from "@/app/types/ModelsGridProps";
import ModelCard from "@/app/components/ModelCard";
import { Model } from "@/app/types/Model";
import SortForm from "./SortForm";
import SearchForm from '@/app/components/SearchForm';
import { Suspense } from "react";

export default async function ModelsGrid({ title, models, searchParams }: ModelsGridProps) {
    const filterQuery = (await searchParams)?.filter || "";
    const sortBy = (await searchParams)?.sort || "date";
    const filteredModels = models.filter((model: Model) => {
        const query = filterQuery?.toLowerCase() ?? "";
        return model.name.toLowerCase().includes(query) ||
            model.description.toLowerCase().includes(query);
    });
    const sortedModels = filteredModels.sort((a, b) => {
        if (sortBy === "date") {
            return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
        }
        if (sortBy === "likes") {
            return (b.likes ?? 0) - (a.likes ?? 0);
        }
        if (sortBy === "alpha") {
            return a.name.localeCompare(b.name);
        }
        return 0;
    })
    const displayModels = sortedModels;
    console.log()
    return (
        <section className="px-6 md:px-24 py-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4 max-w-7xl mx-auto">
                <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-0 text-center md:text-left">{title}</h1>
                <SortForm />
                <SearchForm filterQuery={filterQuery} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {
                    displayModels.map((model) => (
                        <ModelCard key={model.id} model={model} />
                    ))
                }
            </div>
        </section>
    );
}