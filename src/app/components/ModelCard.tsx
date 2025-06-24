import Link from "next/link"
import { FaRegHeart } from "react-icons/fa6"
import Pill from "./Pill"
import { ModelCardProps } from "../types/ModelCardProps"

export default function ModelCard({ model }: ModelCardProps) {
    return (
        <Link href={`/3d-models/${model.id}`} className="block hover:shadow-lg transition-all duration-300 hover:scale-105" aria-labelledby={`model-${model.id}-title`}>
            <div key={model.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                <img src={model.image} alt={model.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                    <h2 className="text-lg font-semibold mb-2 text-gray-900">{model.name}</h2>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{model.description}</p>
                    <div className="flex items-center justify-between">
                        <Pill className="bg-gray-100 text-gray-700 border border-gray-200">{model.category}</Pill>
                        <div className="flex items-center gap-1 text-gray-500">
                            <FaRegHeart className="w-4 h-4" aria-hidden="true" />
                            <span className="text-sm">{model.likes}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}