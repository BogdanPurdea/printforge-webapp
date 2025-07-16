import { PrismaClient } from '@prisma/client';
import models from '../src/app/data/models.json';
import users from '../src/app/data/users.json';
import categories from '../src/app/data/categories.json';
import comments from '../src/app/data/comments.json';
import likes from '../src/app/data/likes.json';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: users,
  });

  await prisma.category.createMany({
    data: categories,
  });

  await prisma.model.createMany({
    data: models.map((model) => ({
      ...model,
      createdAt: new Date(model.createdAt),
      updatedAt: new Date(model.updatedAt),
    })),
  });

  await prisma.comment.createMany({
    data: comments.map((comment) => ({
      ...comment,
      userId: String(comment.userId),
      modelId: String(comment.modelId),
      createdAt: new Date(comment.createdAt),
      parentId: comment.parentId ? String(comment.parentId) : null,
    })),
  });

  await prisma.like.createMany({
    data: likes,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });