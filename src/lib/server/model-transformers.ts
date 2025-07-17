import { Model as PrismaModel } from '@prisma/client';
import { Model } from '@/types/models/Model';

export function transformPrismaModelToAppModel(prismaModel: PrismaModel & { author?: { name: string }; category?: { name: string; slug: string }; _count?: { likedBy: number } }): Model {
    return {
        id: prismaModel.id,
        name: prismaModel.name,
        description: prismaModel.description,
        likes: prismaModel._count?.likedBy || 0,
        image: prismaModel.imageUrl,
        category: prismaModel.category?.slug || '',
        dateAdded: prismaModel.createdAt.toISOString(),
        uploaderId: prismaModel.userId,
        uploaderName: prismaModel.author?.name || 'Unknown',
    };
}
