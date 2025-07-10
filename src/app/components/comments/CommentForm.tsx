"use client";

import React, { useState } from "react";
import { CommentFormProps } from '@/app/types/comments/CommentFormProps';
import { Button } from "@/app/components/ui/button";
import { Textarea } from "@/app/components/ui/textarea";
import { useRouter } from "next/navigation";

export default function CommentForm({ modelId, parentId = null, existingComment, onSuccess }: CommentFormProps) {
    const router = useRouter();
    const [content, setContent] = useState(existingComment?.content || "");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isEditing = !!existingComment;

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (content.trim() === "") {
            alert("Comment cannot be empty.");
            return;
        }

        setIsSubmitting(true);

        try {
            const url = isEditing ? `/api/comments/${existingComment.id}` : "/api/comments";
            const method = isEditing ? "PUT" : "POST";

            const body = isEditing
                ? JSON.stringify({ content })
                : JSON.stringify({ content, modelId, parentId, userId: 1 }); // Hardcoded userId for now

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body,
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Something went wrong");
            }

            setContent("");
            if (onSuccess) {
                onSuccess();
            } else {
                router.refresh();
            }

        } catch (error) {
            console.error("Failed to submit comment:", error);
            alert((error as Error).message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <label htmlFor="comment-textarea" className="sr-only">{isEditing ? "Edit comment" : "Add a comment"}</label>
            <Textarea
                id="comment-textarea"
                placeholder={isEditing ? "Edit your comment..." : "Add a public comment..."}
                className="resize-none"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={3}
            />
            <div className="flex justify-end">
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : (isEditing ? "Update Comment" : "Post Comment")}
                </Button>
            </div>
        </form>
    );
}