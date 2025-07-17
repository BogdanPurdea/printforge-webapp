'use client'
import Form from "next/form";
import { SearchFormProps } from "@/types/navigation/SearchFormProps";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Input } from "@/app/components/ui/input";

export default function SearchForm({ filterQuery }: SearchFormProps) {
    const [input, setInput] = useState<string>(filterQuery || "");
    const formRef = useRef<HTMLFormElement>(null);
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const sort = searchParams.get("sort") || "date";

    useEffect(() => {
        if (!formRef.current) return;
        if (input === "") return;
        const handler = setTimeout(() => {
            formRef.current?.requestSubmit();
        }, 400);
        return () => clearTimeout(handler);
    }, [input, pathname]);

    return (
        <Form ref={formRef} className="mb-8 mt-6 flex justify-center px-6" action={pathname}>
            <Input
                className="w-full max-w-md px-4 py-2 border border-input rounded-3xl focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary bg-background shadow-sm"
                type="text"
                name="filter"
                placeholder="Search models..."
                autoComplete="off"
                value={input}
                onChange={e => setInput(e.target.value)} />
            <Input type="hidden" name="sort" value={sort} />
        </Form>
    )
}