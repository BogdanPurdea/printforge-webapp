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
    const [likedModels, setLikedModels] = useState<Model[]>([]);

    useEffect(() => {
        const fetchModels = async () => {
            try {
                const { models } = await getModels();
                const likedModels = models.filter(model => likes.includes(model.id))
                setLikedModels(likedModels);
            } catch (error) {
                console.error('Error fetching models:', error);
            };
        }
        fetchModels();
    }, [likes]);

    return (
        <ModelsGridErrorBoundary>
            {likedModels.length === 0 ? (
                <div className="text-center max-w-7xl mx-auto mt-10">
                    <h1 className="text-2xl md:text-4xl font-bold mb-4">My Liked Models</h1>
                    <p className="text-lg text-gray-600">You haven&#39;t liked any models yet.</p>
                    <p className="text-md text-muted-foreground mt-2">Click the heart icon on a model to save it here.</p>
                </div>
            ) : (
                <ModelsGrid title="My Liked Models" models={likedModels} />
            )}
        </ModelsGridErrorBoundary>
    );
}