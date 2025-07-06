import Link from 'next/link';
import { PaginationControlsProps } from '../types/PaginationControlsProps';

export default function PaginationControls({ currentPage, totalPages, baseUrl = '/3d-models' }: PaginationControlsProps) {
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  const hasPrevPage = prevPage >= 1;
  const hasNextPage = nextPage <= totalPages;

  return (
    <div className="flex justify-center items-center space-x-4 my-8">
      <Link 
        href={`${baseUrl}?page=${prevPage}`}
        className={`px-4 py-2 border rounded-lg ${!hasPrevPage ? 'pointer-events-none text-gray-400 bg-gray-800' : 'text-white bg-gray-700 hover:bg-gray-600'}`}
        aria-disabled={!hasPrevPage}
        tabIndex={!hasPrevPage ? -1 : undefined}
      >
        Previous
      </Link>

      <span className="">
        Page {currentPage} of {totalPages}
      </span>

      <Link 
        href={`${baseUrl}?page=${nextPage}`}
        className={`px-4 py-2 border rounded-lg ${!hasNextPage ? 'pointer-events-none text-gray-400 bg-gray-800' : 'text-white bg-gray-700 hover:bg-gray-600'}`}
        aria-disabled={!hasNextPage}
        tabIndex={!hasNextPage ? -1 : undefined}
      >
        Next
      </Link>
    </div>
  );
};