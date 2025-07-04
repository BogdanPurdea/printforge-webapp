import { getModels } from '../lib/models';
import { Model } from '../types/Model';
import ModelsGrid from '../components/ModelsGrid';
import { ModelsPageProps } from '../types/ModelsPageProps';
import ModelsGridErrorBoundary from '../components/ModelsGridErrorBoundary';


const getAllModels = async (): Promise<Model[]> => {
  try {
    const models = await getModels();
    return models;
  } catch (error) {
    console.error('Error fetching models:', error);
    throw error;
  }
};

export default async function ModelsPage({ searchParams }: ModelsPageProps) {
  const models = await getAllModels();

  return (
    <section>
      <ModelsGridErrorBoundary >
        <ModelsGrid title="3D Models" models={models} searchParams={searchParams} />
      </ModelsGridErrorBoundary>
    </section>
  );
}