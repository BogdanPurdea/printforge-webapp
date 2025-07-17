import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "@/lib/server/prisma";

/**
 * GET /api/comments
 * Retrieves comments for a specific model.
 * @param {NextRequest} request - The incoming request object.
 * @returns {NextResponse} - The response object.
 * @example /api/comments?modelId=1
 */
export async function GET(request: NextRequest) {
  try {
    const modelId = request.nextUrl.searchParams.get('modelId');

    if (!modelId) {
      return NextResponse.json({ message: 'modelId is required' }, { status: 400 });
    }

    const comments = await prisma.comment.findMany({
      where: { modelId },
      include: {
        author: {
          select: {
            name: true,
            avatarUrl: true,
          },
        },
        parent: {
          select: {
            id: true,
            content: true,
            author: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(comments, { status: 200 });

  } catch (error) {
    console.error('Error in GET /api/comments:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

/**
 * POST /api/comments
 * Creates a new comment.
 * @param {NextRequest} request - The incoming request object.
 * @returns {NextResponse} - The response object.
 */
export async function POST(request: NextRequest) {
  try {
    const { modelId, userId, content, parentId } = await request.json();

    if (!modelId || !userId || !content) {
      return NextResponse.json({ message: 'Missing required fields: modelId, userId, content' }, { status: 400 });
    }

    const newComment = await prisma.comment.create({
      data: {
        modelId,
        userId,
        content,
        parentId,
      },
    });

    return NextResponse.json(newComment, { status: 201 });

  } catch (error) {
    console.error('Error in POST /api/comments:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}