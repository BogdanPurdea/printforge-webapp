import { CategoryPageProps } from "@/app/types/categories/CategoryPageProps";
import { getCategoryBySlug } from "@/app/lib/categories";
import { getModels } from "@/app/lib/models";
import ModelsGrid from "@/app/components/models/ModelsGrid";
import PaginationControls from "@/app/components/models/PaginationControls";
import { notFound } from "next/navigation";

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
    const { categoryName } = await params;
    const { page, sort, filter } = await searchParams;
    const category = await getCategoryBySlug(categoryName);
    if (!category) {
        return notFound();
    }
    const pageNum = page ? parseInt(page, 10) : 1;

    const { models: filteredModels, totalPages } = await getModels({
        category: category.slug,
        page: pageNum,
        filterQuery: filter
    });

    const queryString = new URLSearchParams({
        ...(sort && { sort }),
        ...(filter && { filter }),
    }).toString();

    return (
        <section>
            <ModelsGrid title={`${category.displayName}`} models={filteredModels}></ModelsGrid>
            <PaginationControls
                currentPage={pageNum}
                totalPages={totalPages}
                baseUrl={`/3d-models/categories/${categoryName}${queryString ? `?${queryString}` : ''}`}
            />
        </section>
    )
}

