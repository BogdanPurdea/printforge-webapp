
import modelsData from "../data/models.json"
import usersData from "../data/users.json"
import type { Model } from "../types/Model"
import type { GetModelsParams } from "../types/GetModelsParams"

export async function getModels({ category, uploaderId, filterQuery, page = 1, limit = 9 }: GetModelsParams = {}): Promise<{ models: Model[], totalPages: number }> {
  try {
    let filteredModels = [...modelsData];

    if (category) {
      filteredModels = modelsData.filter((model: Model) =>
        model.category === category);
    }

    if (uploaderId) {
      filteredModels = filteredModels.filter((model: Model) =>
        model.uploaderId.toString() === uploaderId.toString());
    }

    if (filterQuery) {
      const lowerCaseQuery = filterQuery.toLowerCase();
      filteredModels = filteredModels.filter((model: Model) =>
        model.name.toLowerCase().includes(lowerCaseQuery) ||
        model.description.toLowerCase().includes(lowerCaseQuery)
      );
    }

    const modelsWithUploader = filteredModels.map(model => {
      const uploader = usersData.find(user => user.id === model.uploaderId);
      return { ...model, uploaderName: uploader ? uploader.name : 'Unknown' };
    });

    const totalPages = Math.ceil(modelsWithUploader.length / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const models = modelsWithUploader.slice(startIndex, endIndex);

    return { models, totalPages };
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
