import { Comment } from '@/types/comments/Comment';
import { User } from '@/types/users/User';

export interface CommentWithChildren extends Comment {
  user: User | null;
  children: CommentWithChildren[];
}