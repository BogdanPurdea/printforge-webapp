import NavCategories from "@/app/components/layout/NavCategories";
import { ChildrenProps } from "@/types/shared/ChildrenProps";

export default function ModelsLayout({ children }: ChildrenProps) {
    return (
        <div className="relative flex flex-col md:flex-row min-h-screen">
            <NavCategories />
            <main className="flex-1 p-4 md:ml-64 text-foreground">{children}</main>
        </div>
    )
}
