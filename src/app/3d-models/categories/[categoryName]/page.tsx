import { CategoryPageProps } from "@/app/types/CategoryPageProps";
import { getCategoryBySlug } from "@/app/lib/categories";

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { categoryName } = await params;
    const category = await getCategoryBySlug(categoryName);
    return (
        <h1>{category.displayName}</h1>
    )
}

