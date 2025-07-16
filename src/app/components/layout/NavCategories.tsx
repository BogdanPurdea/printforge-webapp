'use client'

import { getAllCategories } from "@/app/lib/client/categories";
import { Category } from "@/app/types/categories/Category";
import NavLink from "@/app/components/layout/NavLink";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const getCategories = async (): Promise<Category[]> => {
    try {
        const categories = await getAllCategories();
        return categories
    } catch (error) {
        console.error("Error fetching categories: ", error);
        throw error;
    }
}

export default function NavCategories() {
    const [categories, setCategories] = useState<Category[]>([]);
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const sort = searchParams.get("sort");
    const isActive = (href: string): boolean => pathname === href;
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categories = await getCategories();
                setCategories(categories);
            } catch (error) {
                console.error("Failed to fetch categories: ", error);
            }
        }
        fetchCategories();
    }, []);
    return (
        <nav className="sticky top-0 z-10 w-full bg-background border-b border-primary md:fixed md:w-64 md:top-1/2 md:-translate-y-1/2 md:border-b-0 md:border-r md:h-auto md:max-h-[90vh] md:overflow-y-auto md:p-4">
            <ul className="flex px-1 md:px-0 py-3 space-x-4 whitespace-nowrap md:flex-col md:p-0 md:space-x-0 md:space-y-3 overflow-x-auto md:overflow-x-visible scrollbar-thin scrollbar-thumb-primary scrollbar-track-secondary md:scrollbar-none">
                <NavLink href={{pathname: "/3d-models"}} isActive={isActive("/3d-models")}> All </NavLink>
                {
                    categories.map((category: Category) =>
                        <NavLink
                            key={category.slug}
                            href={{
                                pathname: `/3d-models/categories/${category.slug}`,
                                query: sort ? { sort } : undefined
                            }}
                            isActive={isActive(`/3d-models/categories/${category.slug}`)}
                        > {category.displayName} </NavLink>
                    )
                }
            </ul>
        </nav>
    )
}