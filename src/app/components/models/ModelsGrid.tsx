'use client'

import { ModelsGridProps } from "@/app/types/models/ModelsGridProps";
import ModelCard from "@/app/components/models/ModelCard";
import SortControls from "@/app/components/models/SortControls";
import SearchForm from '@/app/components/models/SearchForm';
import { useSearchParams } from "next/navigation";

export default function ModelsGrid({ title, models }: ModelsGridProps) {
    const searchParams = useSearchParams();
    const filterQuery = searchParams.get('filter') || "";
    const sortBy = searchParams.get('sort') || "date";

    const sortedModels = [...models].sort((a, b) => {
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
    });

    return (
        <section className="px-6 md:px-24 py-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4 max-w-7xl mx-auto">
                <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-0 text-center md:text-left">{title}</h1>
                <SortControls />
                <SearchForm filterQuery={filterQuery} />
            </div>
            {sortedModels.length === 0 && filterQuery ? (
                 <div className="text-center max-w-7xl mx-auto">
                    <p className="text-lg text-gray-600">No models found for your search.</p>
                    <p className="text-md text-muted-foreground mt-2">Try a different search term.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {sortedModels.map((model) => (
                        <ModelCard key={model.id} model={model}/>
                    ))}
                </div>
            )}
        </section>
    );
}