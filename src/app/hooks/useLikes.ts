'use client'

import { useState, useEffect, useCallback } from 'react';
import { getLikesFromStorage, saveLikesToStorage } from '@/app/lib/client/likes';

export function useLikes() {
    const [likes, setLikes] = useState<string[]>([]);

    useEffect(() => {
        setLikes(getLikesFromStorage());
    }, []);

    const toggleLike = useCallback((modelId: string) => {
        setLikes(currentLikes => {
            const newLikes = currentLikes.includes(modelId)
                ? currentLikes.filter(id => id !== modelId)
                : [...currentLikes, modelId];
            saveLikesToStorage(newLikes);
            return newLikes;
        });
    }, []);

    const isLiked = useCallback((modelId: string) => {
        return likes.includes(modelId);
    }, [likes]);

    return { likes, toggleLike, isLiked }
}