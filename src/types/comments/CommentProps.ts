import { CommentWithChildren } from '@/types/comments/CommentWithChildren';
import { User } from '@/types/users/User';

export type CommentProps = {
  comment: CommentWithChildren;
  user: User | null; 
  modelId: string;
};