import { getModels } from '../lib/models';
import { Model } from '../types/Model';
import ModelsGrid from '../components/ModelsGrid';
import { ModelsPageProps } from '../types/ModelsPageProps';


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
  const query = (await searchParams)?.query;
  const models = await getAllModels();
  
  return (
    <section>
      
      <ModelsGrid title="3D Models" models={models} filterQuery={query} />
    </section>
  );
}