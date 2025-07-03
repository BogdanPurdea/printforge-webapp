'use client'

import { useSearchParams, useRouter, usePathname } from "next/navigation"

export default function SortForm() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const sortBy = searchParams.get("sort") || "date";

    function handleSortChange(value: string) {
        const params = new URLSearchParams(searchParams);
        params.set("sort", value);
        router.push(`${pathname}?${params.toString()}`);
    }

    return (
        <form className="flex gap-2 justify-center md:justify-start">
            <button
                type="button"
                className={`px-3 py-1 rounded ${sortBy === "date" ? "bg-orange-400 text-white" : "bg-gray-200"}`}
                onClick={() => handleSortChange("date")}
            >
                Date
            </button>
            <button
                type="button"
                className={`px-3 py-1 rounded ${sortBy === "likes" ? "bg-orange-400 text-white" : "bg-gray-200"}`}
                onClick={() => handleSortChange("likes")}
            >
                Likes
            </button>
            <button
                type="button"
                className={`px-3 py-1 rounded ${sortBy === "alpha" ? "bg-orange-400 text-white" : "bg-gray-200"}`}
                onClick={() => handleSortChange("alpha")}
            >
                A-Z
            </button>
        </form>
    )
}