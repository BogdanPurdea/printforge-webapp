import modelsData from "../data/models.json"
import type { Model } from "../types/Model"
import type { GetModelsParams } from "../types/GetModelsParams"

export async function getModels({ category }: GetModelsParams = {}): Promise<Model[]> {
  try {
    let filteredModels = [...modelsData];
    if(category) {
      filteredModels = modelsData.filter((model: Model) => 
        model.category === category);
    }
    return filteredModels;
  } catch (error) {
    console.error("Failed to get models:", error);
    throw new Error("Failed to get models");
  }
}

export async function getModelById(id: string | number): Promise<Model> {
  try {
    const foundModel = modelsData.find(
      (model: Model) => model.id.toString() === id.toString()
    )
    if (!foundModel) {
      throw new Error(`Model with id ${id} not found`)
    }
    return foundModel
  } catch (error) {
    console.error(`Failed to get model by id (${id}):`, error);
    throw error;
  }
}