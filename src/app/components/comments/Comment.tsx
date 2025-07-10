"use client";

import Image from "next/image";
import CommentForm from "@/app/components/comments/CommentForm";
import { Button } from "@/app/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { CommentProps } from '@/app/types/comments/CommentProps';

import { FaEdit, FaReply, FaTrash } from "react-icons/fa";

export default function Comment({ comment, user, modelId }: CommentProps) {
    const router = useRouter();
    const [isReplying, setIsReplying] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const currentMockUserId = 1;
    const isAuthor = user?.id === currentMockUserId;

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this comment and all its replies?")) {
            return;
        }

        try {
            const res = await fetch(`/api/comments/${comment.id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                throw new Error("Failed to delete comment");
            }

            router.refresh();
        } catch (error) {
            console.error(error);
            alert("Error deleting comment.");
        }
    };

    const handleReplySuccess = () => {
        setIsReplying(false);
        router.refresh();
    };

    const handleEditSuccess = () => {
        setIsEditing(false);
        router.refresh();
    };

    return (
        <div className="flex items-start space-x-4">
            <Image
                src={user?.avatar || "/default-avatar.png"}
                alt={user?.name || "Anonymous user"}
                width={40}
                height={40}
                className="rounded-full"
            />
            <div className="flex-1">
                <div className="flex items-center space-x-2">
                    <p className="font-bold">{user?.name || "Anonymous"}</p>
                    <p className="text-xs text-gray-500">
                        {new Date(comment.createdAt).toLocaleDateString()}
                    </p>
                </div>

                {isEditing ? (
                    <CommentForm
                        modelId={modelId}
                        parentId={comment.parentId}
                        existingComment={comment}
                        onSuccess={handleEditSuccess}
                    />
                ) : (
                    <p className="mt-1 text-gray-800 dark:text-gray-300">{comment.content}</p>
                )}

                <div className="flex items-center space-x-4 mt-2 text-sm">
                    <Button variant="ghost" size="sm" onClick={() => setIsReplying(!isReplying)}>
                        <FaReply className="mr-2" />
                        Reply
                    </Button>
                    {isAuthor && (
                        <>
                            <Button variant="ghost" size="sm" onClick={() => setIsEditing(!isEditing)}>
                                <FaEdit className="mr-2" />
                                Edit
                            </Button>
                            <Button variant="ghost" size="sm" onClick={handleDelete} className="text-red-500 hover:text-red-600">
                                <FaTrash className="mr-2" />
                                Delete
                            </Button>
                        </>
                    )}
                </div>

                {isReplying && (
                    <div className="mt-4">
                        <CommentForm modelId={modelId} parentId={comment.id} onSuccess={handleReplySuccess} />
                    </div>
                )}

                {/* Recursively render child comments */}
                {comment.children && comment.children.length > 0 && (
                    <div className="mt-4 pl-8 border-l-2 border-gray-200 dark:border-gray-700">
                        {comment.children.map(childComment => (
                            <Comment
                                key={childComment.id}
                                comment={childComment}
                                user={childComment.user}
                                modelId={modelId}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}