'use client';

import ModelUploadForm from "@/app/components/models/ModelUploadForm";
import { getAllCategories } from "@/lib/client/categories";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Category } from '@/types/categories/Category';

export default function UploadPage() {
    const searchParams = useSearchParams();
    const uploaderId = searchParams.get('uploaderId');
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const allCategories = await getAllCategories();
            setCategories(allCategories);
        };
        fetchCategories();
    }, []);

    return (
        <div className="container mx-auto p-4 py-8">
            <h1 className="text-4xl font-bold mb-8">
                Upload a new 3D Model
            </h1>
            <ModelUploadForm categories={categories} uploaderId={uploaderId ? Number(uploaderId) : undefined} />
        </div>
    );
}