
'use client'

import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Label } from '@/app/components/ui/label';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { Button } from '@/app/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/app/components/ui/select"
import { ModelUploadFormProps } from '@/app/types/ModelUploadFormProps';
import { useState, useEffect } from 'react';

export default function ModelUploadForm({ categories }: ModelUploadFormProps) {
    const { register, handleSubmit, watch, control, formState: { errors } } = useForm();
    const router = useRouter();
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [statusMessage, setStatusMessage] = useState<string | null>(null);
    const imageFile = watch('image');

    useEffect(() => {
        if (imageFile && imageFile.length > 0) {
            const file = imageFile[0];
            setImagePreview(URL.createObjectURL(file));
        } else {
            setImagePreview(null);
        }
    }, [imageFile])

    const onSubmit = async (data: any) => {
        setIsSubmitting(true);
        setStatusMessage('Uploading...');
        const formData = new FormData();

        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('category', data.category);
        formData.append('image', data.image[0]);

        try {
            const response = await fetch('/api/models', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setStatusMessage('Upload successful! Redirecting...');
                router.push('/3d-models');
            } else {
                const errorData = await response.json();
                setStatusMessage(`Error: ${errorData.message || 'Upload failed.'}`);
                setIsSubmitting(false);
            }
        } catch (error) {
            console.error("Failed to submit form:", error);
            setStatusMessage('An error occurred while connecting to the server.');
            setIsSubmitting(false);
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div>
                <Label htmlFor="name">Model Name</Label>
                <Input
                    id="name"
                    type="text"
                    {...register('name', { required: 'Model name is required' })}
                    className="shadow-sm mt-1"
                    disabled={isSubmitting}
                />
                {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name.message as string}</p>}
            </div>
            <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    {...register('description', { required: 'Description is required' })}
                    rows={4}
                    className="shadow-sm mt-1"
                    disabled={isSubmitting}
                />
                {errors.description && <p className="mt-2 text-sm text-red-600">{errors.description.message as string}</p>}
            </div>
            <div>
                <Label htmlFor="category">Category</Label>
                <Controller
                    name="category"
                    control={control}
                    rules={{ required: 'Category is required' }}
                    render={({ field }) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isSubmitting}>
                            <SelectTrigger className="w-full shadow-sm mt-1">
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((category) => (
                                    <SelectItem key={category.slug} value={category.slug}>
                                        {category.displayName}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                />
                {errors.category && <p className="mt-2 text-sm text-red-600">{errors.category.message as string}</p>}
            </div>
            <div>
                <Label htmlFor="image">Model Image</Label>
                <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    {...register('image', { required: 'Image is required' })}
                    disabled={isSubmitting}
                    className="shadow-sm mt-1"
                />
                {errors.image && <p className="mt-2 text-sm text-red-600">{errors.image.message as string}</p>}
            </div>
            {imagePreview && (
                <div>
                    <p className="block text-sm font-medium text-gray-700 dark:text-gray-300">Image Preview</p>
                    <img src={imagePreview} alt="Image Preview" className="mt-2 h-48 w-auto rounded-lg" />
                </div>
            )}
            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Uploading...' : 'Upload Model'}
            </Button>
            {statusMessage && <p className="mt-4 text-sm">{statusMessage}</p>}
        </form>
    )
}
