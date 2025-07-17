import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { prisma } from "@/lib/server/prisma";

// Define the path to the public directory for storing images
const publicFolderPath = path.join(process.cwd(), 'public', 'models');

// Helper function to ensure the directory exists
async function ensureDirectoryExists(dirPath: string) {
    try {
        await fs.mkdir(dirPath, { recursive: true });
    } catch (error) {
        // Ignore the error if the directory already exists
        if ((error as NodeJS.ErrnoException).code !== 'EEXIST') {
            throw error;
        }
    }
}

export async function POST(request: NextRequest) {
    try {
        // Ensure the public/models directory exists
        await ensureDirectoryExists(publicFolderPath);

        const data = await request.formData();
        const name = data.get('name') as string;
        const description = data.get('description') as string;
        const categorySlug = data.get('category') as string; // Renamed to avoid conflict with Prisma field
        const image = data.get('image') as File;
        const userId = data.get('uploaderId') as string; // Renamed to match Prisma field

        if (!name || !description || !categorySlug || !image || !userId) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        // Handle the image upload
        const imageName = `${Date.now()}_${image.name.replace(/\s+/g, '_')}`;
        const imagePath = path.join(publicFolderPath, imageName);
        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);
        await fs.writeFile(imagePath, buffer);

        // Find the category ID using the slug
        const category = await prisma.category.findUnique({
            where: { slug: categorySlug },
            select: { id: true },
        });

        if (!category) {
            return NextResponse.json({ message: `Category with slug ${categorySlug} not found` }, { status: 404 });
        }

        // Create the new model object in the database
        const newModel = await prisma.model.create({
            data: {
                name,
                description,
                imageUrl: `/models/${imageName}`, // Public path to the image
                userId,
                categoryId: category.id,
            },
        });

        return NextResponse.json(newModel, { status: 201 });
    } catch (error) {
        console.error('Error in POST /api/models:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}