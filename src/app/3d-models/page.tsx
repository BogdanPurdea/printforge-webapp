import { getModels } from '@/app/lib/models';
import ModelsGrid from '@/app/components/models/ModelsGrid';
import { ModelsPageProps } from '@/app/types/models/ModelsPageProps';
import ModelsGridErrorBoundary from '@/app/components/models/ModelsGridErrorBoundary';
import PaginationControls from '@/app/components/models/PaginationControls';

export default async function ModelsPage({ searchParams }: ModelsPageProps) {
  const pageStr = (await searchParams).page ?? '1';
  let pageNum = parseInt(pageStr);
  if (isNaN(pageNum) || pageNum < 1) {
    pageNum = 1;
  }
  const filterQuery = (await searchParams).filter ?? '';
  const { models, totalPages } = await getModels({ page: pageNum, filterQuery });

  return (
    <section>
      <ModelsGridErrorBoundary >
        <ModelsGrid title="3D Models" models={models} />
      </ModelsGridErrorBoundary>
      <PaginationControls 
        currentPage={pageNum}
        totalPages={totalPages}
      />
    </section>
  );
}