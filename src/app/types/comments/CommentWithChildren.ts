import { Comment } from '@/app/types/comments/Comment';
import { User } from '@/app/types/users/User';

export interface CommentWithChildren extends Comment {
  user: User | null;
  children: CommentWithChildren[];
}