import { Comment } from '@/app/types/comments/Comment';

export type CommentFormProps = {
  modelId: string;
  onSuccess?: () => void;
  parentId?: string | null;
  existingComment?: Comment;
};
