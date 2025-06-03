import Link from "next/link"
import { FaRegHeart } from "react-icons/fa6"
import Pill from "./Pill"
import { ModelCardProps } from "../types/ModelCardProps"

export default function ModelCard({ model }: ModelCardProps) {
    return (
        <Link href={`/3d-models/${model.id}`} className="block hover:shadow-lg transition-shadow duration-300" aria-labelledby={`model-${model.id}-title`}>
            <div key={model.id} className="h-95 bg-white shadow-md rounded-lg p-4">
                <img src={model.image} alt={model.name} className="w-full h-48 object-cover rounded-t-lg" />
                <h2 className="text-xl font-semibold mt-4">{model.name}</h2>
                <p className="text-gray-600 mt-2">{model.description}</p>
                <div className="mt-4 flex items-center justify-between">
                    <Pill className="bg-blue-100 text-blue-800">{model.category}</Pill>
                    <FaRegHeart className="w-5 h-5 text-gray-400" aria-hidden="true" />
                    <span className="text-gray-500">{model.likes}</span>
                    <span className="text-gray-500">{new Date(model.dateAdded).toLocaleDateString()}</span>
                </div>
            </div>
        </Link>
    )
}