
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { Model } from '@/app/types/models/Model';

// Define the path to the models.json file
const modelsFilePath = path.join(process.cwd(), 'src', 'app', 'data', 'models.json');

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
        const category = data.get('category') as string;
        const image = data.get('image') as File;
        const uploaderId = data.get('uploaderId') as string;

        if (!name || !description || !category || !image) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        // Read the existing models from the JSON file
        const modelsJson = await fs.readFile(modelsFilePath, 'utf-8');
        const models: Model[] = JSON.parse(modelsJson);

        // Handle the image upload
        const imageName = `${Date.now()}_${image.name.replace(/\s+/g, '_')}`;
        const imagePath = path.join(publicFolderPath, imageName);
        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);
        await fs.writeFile(imagePath, buffer);

        // Create the new model object
        const newModel: Model = {
            id: (models.length + 1), // Simple ID generation
            name,
            description,
            category, // This should be the category slug
            likes: 0,
            image: `/models/${imageName}`, // Public path to the image
            dateAdded: new Date().toISOString(),
            uploaderId: Number(uploaderId),
        };

        // Add the new model to the array and write back to the file
        models.push(newModel);
        await fs.writeFile(modelsFilePath, JSON.stringify(models, null, 2));

        return NextResponse.json(newModel, { status: 201 });
    } catch (error) {
        console.error('Error in POST /api/models:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
