'use client'
import Form from "next/form";
import { SearchFormProps } from "@/app/types/SearchFormProps";
import { usePathname } from "next/navigation";

export default function SearchForm({ filterQuery }: SearchFormProps) {
    const pathname = usePathname();
    return (
        <Form className="mb-8 mt-6 flex justify-center px-6" action={pathname}>
            <input
                className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white shadow-sm"
                type="text"
                name="query"
                placeholder="Search models..."
                autoComplete="off"
                defaultValue={filterQuery || ""} />
        </Form>
    )
}