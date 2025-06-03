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
        <section className="flex min-h-screen flex-row items-center justify-between p-30">
            <img src={model.image} alt={model.name} className="w-full max-w-md mb-6 mr-10 ml-10" />
            <div className="flex flex-col items-start justify-start max-w-md">
            <div className="mt-4 flex items-center justify-between">
                <FaRegHeart className="w-5 h-5 text-gray-400" aria-hidden="true" />
                <span className="text-sm text-gray-500 ml-1">{model.likes}</span>
            </div>
            <h1 className="text-4xl font-bold mb-4 mt-4">{model.name}</h1>
            <Pill className="bg-blue-100 text-blue-800">{model.category}</Pill>
            <p className="text-lg mb-4 mt-4">{model.description}</p>
            <p className="text-sm text-gray-500">Added on {new Date(model.dateAdded).toLocaleDateString()}</p>
            </div>
        </section>
    )
}