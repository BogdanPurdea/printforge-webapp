export async function createComment(commentData: { content: string, modelId: string, parentId: string | null, userId: string }): Promise<any> {
    const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(commentData),
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to create comment");
    }
    return res.json();
}

export async function updateComment(commentId: string, content: string): Promise<any> {
    const res = await fetch(`/api/comments/${commentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update comment");
    }
    return res.json();
}
export async function deleteComment(commentId: string): Promise<void> {
    const res = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE",
    });

    if (!res.ok) {
        throw new Error("Failed to delete comment");
    }
}
