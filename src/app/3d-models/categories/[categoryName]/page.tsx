import { CategoryPageProps } from "@/app/types/CategoryPageProps";
import { getCategoryBySlug } from "@/app/lib/categories";
import { getModels } from "@/app/lib/models";
import ModelsGrid from "@/app/components/ModelsGrid";
import PaginationControls from "@/app/components/PaginationControls";

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
    const { categoryName } = await params;
    const category = await getCategoryBySlug(categoryName);

    const pageStr = (await searchParams).page ?? '1';
    let pageNum = parseInt(pageStr, 10);
    if (isNaN(pageNum) || pageNum < 1) {
        pageNum = 1;
    }

    const { models: filteredModels, totalPages } = await getModels({ 
        category: category.slug,
        page: pageNum
    });

    return (
        <section>
            <ModelsGrid title={`${category.displayName}`} models={filteredModels}></ModelsGrid>
            <PaginationControls 
                currentPage={pageNum}
                totalPages={totalPages}
                baseUrl={`/3d-models/categories/${categoryName}`}
            />
        </section>
    )
}

