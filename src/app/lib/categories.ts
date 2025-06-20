import categories from "../data/categories.json"
import { Category } from "../types/Category"

export async function getAllCategories(): Promise<Category[]> {
    return categories;
}

export async function getCategoryBySlug(slug: string): Promise<Category> {
    const category = categories.find(c => c.slug === slug);
    if (!category) {
        throw new Error(`Category with slug ${slug} not found`)
    }
    return category;
}

export async function getDisplayNameFromSlug(slug: string): Promise<string> {
    const category = await getCategoryBySlug(slug);
    return category.displayName;
}
