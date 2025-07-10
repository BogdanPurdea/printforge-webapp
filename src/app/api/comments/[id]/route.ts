import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';
import { Comment } from '@/app/types/comments/Comment';

// Helper function to get the full path to the comments.json file
function getCommentsFilePath() {
  return path.join(process.cwd(), 'src', 'app', 'data', 'comments.json');
}

/**
 * PUT /api/comments/[id]
 * Updates an existing comment.
 * @param {NextRequest} request - The incoming request object.
 * @param {{ params: { id: string } }} { params } - The route parameters.
 * @returns {NextResponse} - The response object.
 */
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // 1. Get the comment ID from the route parameters
    const commentId = (await params).id;

    // 2. Get the updated content from the request body
    // For a PUT request, we typically only expect the fields that can be changed.
    const { content } = await request.json();

    if (!content) {
      return NextResponse.json({ message: 'Content field is required' }, { status: 400 });
    }

    // 3. Read the comments.json file
    const commentsFilePath = getCommentsFilePath();
    const fileContent = await fs.readFile(commentsFilePath, 'utf-8');
    const comments: Comment[] = JSON.parse(fileContent);

    // 4. Find the index of the comment to update
    const commentIndex = comments.findIndex(comment => comment.id === commentId);

    // 5. Handle case where comment is not found
    if (commentIndex === -1) {
      return NextResponse.json({ message: 'Comment not found' }, { status: 404 });
    }

    // 6. Update the comment's content
    comments[commentIndex].content = content;

    // 7. Write the updated array back to the file
    await fs.writeFile(commentsFilePath, JSON.stringify(comments, null, 2));

    // 8. Return the updated comment
    return NextResponse.json(comments[commentIndex], { status: 200 });

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
    // 1. Get the comment ID from the route parameters
    const commentIdToDelete = (await params).id;

    // 2. Read the comments.json file
    const commentsFilePath = getCommentsFilePath();
    const fileContent = await fs.readFile(commentsFilePath, 'utf-8');
    const comments: Comment[] = JSON.parse(fileContent);

    // 3. Check if the comment to be deleted exists
    const commentExists = comments.some(comment => comment.id === commentIdToDelete);
    if (!commentExists) {
      return NextResponse.json({ message: 'Comment not found' }, { status: 404 });
    }

    // 4. Filter out the comment and its direct children
    const filteredComments = comments.filter(comment => 
      comment.id !== commentIdToDelete && comment.parentId !== commentIdToDelete
    );

    // 5. Write the filtered array back to the file
    await fs.writeFile(commentsFilePath, JSON.stringify(filteredComments, null, 2));

    // 6. Return a success response
    // A 204 No Content response is standard for a successful DELETE operation when no body is returned.
    return new NextResponse(null, { status: 204 });

  } catch (error) {
    console.error('Error in DELETE /api/comments/[id]:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
