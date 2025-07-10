import React from 'react';
import CommentSkeleton from '@/app/components/comments/CommentSkeleton';

export default function CommentsSkeleton(){
  return (
    <div className="space-y-4 mt-8">
      <h2 className="text-xl font-bold">Comments</h2>
      <CommentSkeleton />
      <CommentSkeleton />
      <CommentSkeleton />
    </div>
  );
};