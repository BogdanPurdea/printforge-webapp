import { ModelDetailPageProps } from "@/app/types/ModelDetailPageProps"
import { getModelById } from "@/app/lib/models"
import Pill from "@/app/components/Pill"
import { FaRegHeart } from "react-icons/fa6"


async function fetchModelDetails(id: string) {
    try {
        const model = await getModelById(id);
        return model;
    } catch (error) {
        console.error('Error fetching model details:', error);
        throw error;
    }
}

export default async function ModelDetailPage({ params }: ModelDetailPageProps) {
    const { id } = await params;
    const model = await fetchModelDetails(id);

    return (
        <section className="flex flex-col md:flex-row min-h-screen items-center justify-between px-4 py-8 md:p-20 gap-8">
            <img
                src={model.image}
                alt={model.name}
                className="w-full max-w-xs md:max-w-md mb-6 md:mb-0 md:mr-10 md:ml-10 rounded-lg shadow"
            />
            <div className="flex flex-col items-center md:items-start justify-start w-full max-w-md">
                <div className="mt-4 flex items-center justify-center md:justify-between w-full">
                    <FaRegHeart className="w-5 h-5 text-gray-400" aria-hidden="true" />
                    <span className="text-sm text-gray-500 ml-1">{model.likes}</span>
                </div>
                <h1 className="text-2xl md:text-4xl font-bold mb-4 mt-4 text-center md:text-left">{model.name}</h1>
                <Pill className="bg-blue-100 text-blue-800 mb-4">{model.category}</Pill>
                <p className="text-base md:text-lg mb-4 mt-4 text-center md:text-left">{model.description}</p>
                <p className="text-sm text-gray-500 text-center md:text-left">Added on {new Date(model.dateAdded).toLocaleDateString()}</p>
            </div>
        </section>
    )
}