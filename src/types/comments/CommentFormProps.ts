import { Comment } from '@/types/comments/Comment';

export type CommentFormProps = {
  modelId: string;
  onSuccess?: () => void;
  parentId?: string | null;
  existingComment?: Comment;
};
