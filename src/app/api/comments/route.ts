import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { Comment } from '@/app/types/comments/Comment';

// Helper function to get the full path to the comments.json file
function getCommentsFilePath() {
  // Use process.cwd() to get the root of the project
  // Using path.join is important to ensure cross-platform compatibility
  return path.join(process.cwd(), 'src', 'app', 'data', 'comments.json');
}

/**
 * GET /api/comments
 * Retrieves comments for a specific model.
 * @param {NextRequest} request - The incoming request object.
 * @returns {NextResponse} - The response object.
 * @example /api/comments?modelId=1
 */
export async function GET(request: NextRequest) {
  try {
    // 1. Get the modelId from the URL query parameters
    const modelId = request.nextUrl.searchParams.get('modelId');

    if (!modelId) {
      return NextResponse.json({ message: 'modelId is required' }, { status: 400 });
    }

    // 2. Read the comments.json file
    const commentsFilePath = getCommentsFilePath();
    const fileContent = await fs.readFile(commentsFilePath, 'utf-8');

    // 3. Parse the JSON data
    const comments: Comment[] = JSON.parse(fileContent);

    // 4. Filter comments by modelId
    const filteredComments = comments.filter(comment => comment.modelId === modelId);

    // 5. Return the filtered comments
    return NextResponse.json(filteredComments, { status: 200 });

  } catch (error) {
    console.error('Error in GET /api/comments:', error);
    // It's good practice to return a generic error message to the client
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
    // 1. Get the comment data from the request body
    const newCommentData = await request.json();
    const { modelId, userId, content, parentId } = newCommentData;

    // Basic validation
    if (!modelId || !userId || !content) {
      return NextResponse.json({ message: 'Missing required fields: modelId, userId, content' }, { status: 400 });
    }

    // 2. Read the existing comments
    const commentsFilePath = getCommentsFilePath();
    const fileContent = await fs.readFile(commentsFilePath, 'utf-8');
    const comments: Comment[] = JSON.parse(fileContent);

    // 3. Create the new comment object
    const newComment: Comment = {
      id: String(Date.now()), // Simple unique ID generation
      createdAt: new Date().toISOString(), // ISO 8601 format
      modelId,
      userId,
      content,
      parentId: parentId || null, // parentId is optional
    };

    // 4. Add the new comment to the array
    comments.push(newComment);

    // 5. Write the updated array back to the file
    // The `null, 2` arguments format the JSON for readability
    await fs.writeFile(commentsFilePath, JSON.stringify(comments, null, 2));

    // 6. Return the newly created comment
    return NextResponse.json(newComment, { status: 201 }); // 201 Created

  } catch (error) {
    console.error('Error in POST /api/comments:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
