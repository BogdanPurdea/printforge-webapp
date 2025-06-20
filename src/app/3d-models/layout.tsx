import { getAllCategories } from "@/app/lib/categories";
import Link from "next/link";
import { Category } from "@app/types/Category";
import { Albert_Sans } from "next/font/google";

const albertSans = Albert_Sans({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    display: 'swap',
});

const getCategories = async (): Promise<Category[]> => {
    try {
        const categories = await getAllCategories();
        return categories
    } catch (error) {
        console.error("Error fetching categories: ", error);
        throw error;
    }
}

export default async function ModelsLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const categories = await getCategories();
    return (
        <section className={`${albertSans}`}>
            <nav className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center m-8">
                <Link href="/3d-models">All</Link>
                {categories.map((category: Category) =>
                    <Link key={category.slug} href={`/3d-model/categories/${category.slug}`}>{category.displayName}</Link>
                )}
            </nav>
            {children}
        </section>
    )
}
