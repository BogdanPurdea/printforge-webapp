import { getModels } from '../lib/models';
import ModelsGrid from '../components/ModelsGrid';
import { ModelsPageProps } from '../types/ModelsPageProps';
import ModelsGridErrorBoundary from '../components/ModelsGridErrorBoundary';
import PaginationControls from '../components/PaginationControls';

export default async function ModelsPage({ searchParams }: ModelsPageProps) {
  const pageStr = (await searchParams).page ?? '1';
  let pageNum = parseInt(pageStr);
  if (isNaN(pageNum) || pageNum < 1) {
    pageNum = 1;
  }
  const { models, totalPages } = await getModels({ page: pageNum });

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