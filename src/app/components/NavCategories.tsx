'use client'

import { getAllCategories } from "@/app/lib/categories";
import { Category } from "../types/Category";
import NavLink from "../components/NavLink";
import { usePathname } from "next/navigation";
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
        <aside className="sticky top-0 z-10 w-full bg-white border-b border-gray-200 md:fixed md:w-64 md:top-1/2 md:-translate-y-1/2 md:border-none" >
            <div className="relative" >
                <nav className="sticky top-0 z-10 w-full bg-white border-b border-gray-200 md:fixed md:w-64 md:top-1/2 md:-translate-y-1/2 md:border-none" >
                    <ul className="flex px-4 py-3 space-x-4 whitespace-nowrap md:flex-col md:p-0 md:space-x-0 md:space-y-3" >
                        <NavLink href="/3d-models" isActive={isActive("/3d-models")}> All </NavLink>
                        {
                            categories.map((category: Category) =>
                                <NavLink
                                    key={category.slug}
                                    href={`/3d-models/categories/${category.slug}`}
                                    isActive={isActive(`/3d-model/categories/${category.slug}`)}
                                > {category.displayName} </NavLink>
                            )
                        }
                    </ul>
                </nav>
            </div>
        </aside>
    )
}