
import { getUserById } from "@/app/lib/users";
import { getModels } from "@/app/lib/models";
import ModelsGrid from "@/app/components/models/ModelsGrid";
import { UserProfilePageParams } from "@/app/types/users/UserProfilePageParams";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import PaginationControls from "@/app/components/models/PaginationControls";
import Image from "next/image";

export default async function UserProfilePage({ params, searchParams }: UserProfilePageParams) {
    const { id } = await params;
    const { page, sort, filter } = await searchParams;
    const idNum = parseInt(id);
    if (isNaN(idNum)) {
        notFound();
    }
    const pageNum = page ? parseInt(page) : 1;

    const [user, { models, totalPages }] = await Promise.all([
        getUserById(idNum),
        getModels({ uploaderId: idNum, page: pageNum, filterQuery: filter })
    ]);

    const queryString = new URLSearchParams({
        ...(sort && { sort }),
        ...(filter && { filter }),
    }).toString();

    if (!user) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left">
                <Image
                    src={user.avatar}
                    alt={`${user.name}'s avatar`}
                    width={128}
                    height={128}
                    className="w-32 h-32 rounded-full mr-0 md:mr-8 mb-4 md:mb-0"
                />
                <div className="flex-1">
                    <h1 className="text-4xl font-bold mb-2">{user.name}</h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">{user.bio}</p>
                </div>
            </div>

            <div className="mt-12">
                <div className="flex justify-center items-center mb-6">
                    <Link href={{ pathname: "/users/upload", query: { uploaderId: user.id } }}>
                        <Button variant="default" size="default">
                            Upload Model
                        </Button>
                    </Link>
                </div>
                <ModelsGrid title="Uploaded models" models={models} />
                <PaginationControls
                    currentPage={pageNum}
                    totalPages={totalPages}
                    baseUrl={`/users/${id}${queryString ? `?query=${queryString}` : ''}`}
                />
            </div>
        </div>
    );
}
