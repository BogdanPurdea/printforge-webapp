import { getAllModels } from '../lib/models';
import { Model } from '../types/Model';
import ModelsGrid from '../components/ModelsGrid';

const getModels = async (): Promise<Model[]> => {
  try {
    const models = await getAllModels();
    return models;
  } catch (error) {
    console.error('Error fetching models:', error);
    throw error;
  }
};

export default async function ModelsPage() {
  const models = await getModels();

  return (
    <ModelsGrid title="3D Models" models={models} />
  );

}