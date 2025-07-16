import { prisma } from "@/app/lib/server/prisma"
import type { Model } from "@/app/types/models/Model"
import type { GetModelsParams } from "@/app/types/models/GetModelsParams"
import { transformPrismaModelToAppModel } from "@/app/lib/server/model-transformers";

export async function getModels({ category, uploaderId, filterQuery, page = 1, limit = 9 }: GetModelsParams = {}): Promise<{ models: Model[], totalPages: number }> {
  try {
    const where: any = {};

    if (category) {
      where.category = { slug: category };
    }

    if (uploaderId) {
      where.userId = uploaderId.toString();
    }

    if (filterQuery) {
      const lowerCaseQuery = filterQuery.toLowerCase();
      where.OR = [
        { name: { contains: lowerCaseQuery, mode: 'insensitive' } },
        { description: { contains: lowerCaseQuery, mode: 'insensitive' } }
      ];
    }

    const [models, totalCount] = await Promise.all([
      prisma.model.findMany({
        where,
        include: {
          author: { select: { name: true } },
          category: { select: { name: true, slug: true } },
          _count: { select: { likedBy: true } }
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.model.count({ where })
    ]);

    const transformedModels = models.map(transformPrismaModelToAppModel);

    const totalPages = Math.ceil(totalCount / limit);

    return { models: transformedModels, totalPages };
  } catch (error) {
    console.error("Failed to get models:", error);
    throw new Error("Failed to get models");
  }
}


export async function getModelById(id: string | number): Promise<Model> {
  try {
    const foundModel = await prisma.model.findUnique({
      where: { id: id.toString() },
      include: {
        author: { select: { name: true } },
        category: { select: { name: true, slug: true } },
        _count: { select: { likedBy: true } }
      }
    });
    
    if (!foundModel) {
      throw new Error(`Model with id ${id} not found`);
    }

    return transformPrismaModelToAppModel(foundModel);
  } catch (error) {
    console.error(`Failed to get model by id (${id}):`, error);
    throw error;
  }
}