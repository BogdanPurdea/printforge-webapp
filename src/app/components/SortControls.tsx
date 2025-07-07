'use client'

import { useSearchParams, useRouter, usePathname } from "next/navigation"

export default function SortControls() {
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
        <div className="flex gap-2 justify-center md:justify-start">
            <button
                type="button"
                className={`px-3 py-1 rounded ${sortBy === "date" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}
                onClick={() => handleSortChange("date")}
            >
                Date
            </button>
            <button
                type="button"
                className={`px-3 py-1 rounded ${sortBy === "likes" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}
                onClick={() => handleSortChange("likes")}
            >
                Likes
            </button>
            <button
                type="button"
                className={`px-3 py-1 rounded ${sortBy === "alpha" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}
                onClick={() => handleSortChange("alpha")}
            >
                A-Z
            </button>
        </div>
    )
}