import { Model } from './Model';

export type ModelCardProps = {
    model: Model,
    onLikeChange?: (modelId: number) => void
}