'use client';
import { getAllModels } from '../lib/models';
import { Model } from '../types/Model';
import ModelsGrid from '../components/ModelsGrid';
import { useEffect, useState } from 'react';

const getModels = async (): Promise<Model[]> => {
  try {
    const models = await getAllModels();
    return models;
  } catch (error) {
    console.error('Error fetching models:', error);
    throw error;
  }
};

export default function ModelsPage() {
  const [models, setModels] = useState<Model[]>([]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      const data = await getModels();
      setModels(data);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ModelsGrid title="3D Models" models={models} />
  );

}