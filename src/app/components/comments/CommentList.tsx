import React from "react";
import { Comment as CommentType } from "@/types/comments/Comment";
import { User } from "@/types/users/User";
import { getUsersByIds } from "@/lib/server/users";
import Comment from "@/app/components/comments/Comment";
import CommentForm from "@/app/components/comments/CommentForm";
import { CommentWithChildren } from "@/types/comments/CommentWithChildren";
import { CommentListProps } from "@/types/comments/CommentListProps";

async function getComments(modelId: string): Promise<CommentType[]> {
    const res = await fetch(`http://localhost:3000/api/comments?modelId=${modelId}`, {
        cache: "no-store",
    });
    if (!res.ok) {
        throw new Error("Failed to fetch comments");
    }
    return res.json();
}

function nestComments(comments: CommentType[], usersById: Map<string, User>): (CommentWithChildren & { user: User | null })[] {
    const commentMap = new Map<string, CommentWithChildren & { user: User | null }>();

    comments.forEach(comment => {
        const user = usersById.get(comment.userId) || null;
        commentMap.set(comment.id, { ...comment, user, children: [] });
    });

    const nestedComments: (CommentWithChildren & { user: User | null })[] = [];

    commentMap.forEach(comment => {
        if (comment.parentId) {
            const parent = commentMap.get(comment.parentId);
            if (parent) {
                parent.children.push(comment);
            }
        } else {
            nestedComments.push(comment);
        }
    });

    return nestedComments;
}

export default async function CommentList({ modelId }: CommentListProps) {
    const comments = await getComments(modelId);
    const userIds = [...new Set(comments.map(comment => comment.userId))];
    const users = await getUsersByIds(userIds);
    const usersById = new Map(users.map(user => [String(user.id), user]));

    const nestedComments = nestComments(comments, usersById);

    return (
        <div className="mt-8 font-sans">
            <h2 className="text-2xl font-bold mb-4">Comments ({comments.length})</h2>

            <CommentForm modelId={modelId} />

            <div className="space-y-6 mt-6">
                {nestedComments.map(comment => (
                    <Comment key={comment.id} comment={comment} user={comment.user} modelId={modelId} />
                ))}
            </div>
        </div>
    );
}