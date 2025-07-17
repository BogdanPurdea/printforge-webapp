import { Category } from "@/types/categories/Category";

export async function getAllCategories(): Promise<Category[]> {
    try {
        const response = await fetch('/api/categories');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const categories = await response.json();
        return categories;
    } catch (error) {
        console.error("Failed to get all categories:", error);
        throw new Error("Failed to get all categories");
    }
}

export async function getCategoryBySlug(slug: string): Promise<Category> {
    try {
        const response = await fetch(`/api/categories?slug=${slug}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const category = await response.json();
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