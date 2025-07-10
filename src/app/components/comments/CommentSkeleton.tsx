import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function CommentSkeleton() {
  return (
    <div className="flex items-start space-x-4 p-4">
      <Skeleton circle={true} height={40} width={40} />
      <div className="flex-1 space-y-2 py-1">
        <Skeleton height={16} width={'25%'} />
        <Skeleton height={16} width={'75%'} />
      </div>
    </div>
  );
};
