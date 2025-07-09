import Link from "next/link"
import Pill from "./Pill"
import { ModelCardProps } from "../types/ModelCardProps"
import LikeButton from "./LikeButton"
import Image from "next/image"

export default function ModelCard({ model }: ModelCardProps) {

    return (
        <div className="bg-card rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 overflow-hidden h-full flex flex-col">
            <Link href={`/3d-models/${model.id}`} className="block" aria-labelledby={`model-${model.id}-title`}>
                <Image src={model.image} alt={model.name} width={300} height={200} className="w-full h-48 object-cover" />
            </Link>
            <div className="p-4 flex flex-col flex-grow">
                <Link href={`/3d-models/${model.id}`} className="block" aria-labelledby={`model-${model.id}-title`}>
                    <h2 id={`model-${model.id}-title`} className="text-lg font-semibold mb-2 text-gray-900 hover:text-orange-accent transition-colors">{model.name}</h2>
                </Link>
                <p className="text-sm text-muted-foreground mb-1">by <Link href={`/users/${model.uploaderId}`} className="text-orange-accent hover:underline">{model.uploaderName}</Link></p>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2 flex-grow">{model.description}</p>
                <div className="flex items-center justify-between mt-auto">
                    <Pill>{model.category}</Pill>
                    <div className="flex items-center gap-2">
                        <LikeButton
                            modelId={model.id}
                        />
                        <span className="text-sm text-muted-foreground">{model.likes}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}