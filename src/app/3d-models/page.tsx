import { getAllModels } from '../lib/models';
import { Model } from '../types/Model';
import ModelCard from '../components/ModelCard';


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
    <section className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-8">3D Models</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {models.map((model: Model) => (
          <ModelCard key={model.id} model={model} />
        ))}
      </div>
    </section>
  );
}