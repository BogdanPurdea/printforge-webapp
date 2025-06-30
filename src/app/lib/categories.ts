import categories from "../data/categories.json"
import { Category } from "../types/Category"

export async function getAllCategories(): Promise<Category[]> {
    try {
        return categories;
    } catch (error) {
        console.error("Failed to get all categories:", error);
        throw new Error("Failed to get all categories");
    }
}

export async function getCategoryBySlug(slug: string): Promise<Category> {
    try {
        const category = categories.find(c => c.slug === slug);
        if (!category) {
            throw new Error(`Category with slug ${slug} not found`)
        }
        return category;
    } catch (error) {
        console.error(`Failed to get category by slug (${slug}):`, error);
        throw error;
    }
}

export async function getDisplayNameFromSlug(slug: string): Promise<string> {
    try {
        const category = await getCategoryBySlug(slug);
        return category.displayName;
    } catch (error) {
        console.error(`Failed to get display name from slug (${slug}):`, error);
        throw error;
    }
}
