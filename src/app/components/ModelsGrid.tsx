import { ModelsGridProps } from "@/app/types/ModelsGridProps";
import ModelCard from "@/app/components/ModelCard";
import { ModelCardSkeleton } from "./ModelCardSkeleton";

export default function ModelsGrid({ title, models }: ModelsGridProps) {
    return (
        <section className="flex flex-col items-center justify-between p-24">
            <h1 className="text-4xl font-bold mb-8">{title}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {
                    
                    models.length > 0
                        ? models.map((model) => (
                            <ModelCard key={model.id} model={model} />
                        ))
                        : Array.from({ length: 12 }).map((_, idx) => (
                            <ModelCardSkeleton key={idx} />
                        ))
                }
            </div>
        </section>
    );
} 