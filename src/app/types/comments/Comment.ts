export interface Comment {
  id: string;
  modelId: string;
  userId: string;
  parentId: string | null;
  content: string;
  createdAt: string;
}