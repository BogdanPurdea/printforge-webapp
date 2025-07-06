import { CategoryPageProps } from "@/app/types/CategoryPageProps";
import { getCategoryBySlug } from "@/app/lib/categories";
import { getModels } from "@/app/lib/models";
import ModelsGrid from "@/app/components/ModelsGrid";

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { categoryName } = await params;
    const category = await getCategoryBySlug(categoryName);
    const filteredModels = await getModels({ category: category.slug });
    return (
        <ModelsGrid title={`${category.displayName}`} models={filteredModels}></ModelsGrid>
    )
}

