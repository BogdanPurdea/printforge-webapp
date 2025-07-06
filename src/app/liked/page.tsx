'use client'

import { useEffect, useState } from 'react';
import { useLikes } from '@/app/hooks/useLikes';
import { getModels } from '@/app/lib/models';
import { Model } from '@/app/types/Model';
import ModelsGrid from '@/app/components/ModelsGrid';
import ModelsGridErrorBoundary from '@/app/components/ModelsGridErrorBoundary';
import ModelsGridSkeleton from '../components/ModelsGridSkeleton';

export default function LikedModelsPage() {
    const { likes } = useLikes();
    const [sourceModels, setSourceModels] = useState<Model[]>([]);
    const [displayedModels, setDisplayedModels] = useState<Model[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchModels = async () => {
            try {
                setIsLoading(true);
                const models = await getModels();
                setSourceModels(models);
            } catch (error) {
                console.error('Error fetching models:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchModels();
    }, [likes]);

    useEffect(() => {
        if (sourceModels.length > 0) {
            const currentLikedModels = sourceModels.filter(model => likes.includes(model.id));
            setDisplayedModels(currentLikedModels);
        }
    }, [likes, sourceModels]);

    const handleLikeChange = (modelId: number) => {
        setDisplayedModels(currentModels =>
            currentModels.filter(model => model.id !== modelId)
        );
    };

    if (isLoading) {
        return <ModelsGridSkeleton />;
    }

    return (
        <ModelsGridErrorBoundary>
            {displayedModels.length === 0 ? (
                <div className="text-center max-w-7xl mx-auto mt-10">
                    <h1 className="text-2xl md:text-4xl font-bold mb-4">My Liked Models</h1>
                    <p className="text-lg text-gray-600">You haven't liked any models yet.</p>
                    <p className="text-md text-gray-500 mt-2">Click the heart icon on a model to save it here.</p>
                </div>
            ) : (
                <ModelsGrid title="My Liked Models" models={displayedModels} onLikeChange={handleLikeChange} />
            )}
        </ModelsGridErrorBoundary>
    );
}