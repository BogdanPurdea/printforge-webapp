import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "@/app/lib/server/prisma";

/**
 * PUT /api/comments/[id]
 * Updates an existing comment.
 * @param {NextRequest} request - The incoming request object.
 * @param {{ params: { id: string } }} { params } - The route parameters.
 * @returns {NextResponse} - The response object.
 */
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const commentId = params.id;
    const { content } = await request.json();

    if (!content) {
      return NextResponse.json({ message: 'Content field is required' }, { status: 400 });
    }

    const updatedComment = await prisma.comment.update({
      where: { id: commentId },
      data: { content },
    });

    return NextResponse.json(updatedComment, { status: 200 });

  } catch (error) {
    console.error('Error in PUT /api/comments/[id]:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

/**
 * DELETE /api/comments/[id]
 * Deletes a comment and its direct replies.
 * @param {NextRequest} request - The incoming request object.
 * @param {{ params: { id: string } }} { params } - The route parameters.
 * @returns {NextResponse} - The response object.
 */
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const commentIdToDelete = await params.id;

    // Delete the comment and its direct replies
    await prisma.comment.deleteMany({
      where: {
        OR: [
          { id: commentIdToDelete },
          { parentId: commentIdToDelete },
        ],
      },
    });

    return new NextResponse(null, { status: 204 });

  } catch (error) {
    console.error('Error in DELETE /api/comments/[id]:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}