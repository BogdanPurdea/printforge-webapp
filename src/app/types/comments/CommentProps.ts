import { CommentWithChildren } from '@/app/types/comments/CommentWithChildren';
import { User } from '@/app/types/users/User';

export type CommentProps = {
  comment: CommentWithChildren;
  user: User | null; 
  modelId: string;
};