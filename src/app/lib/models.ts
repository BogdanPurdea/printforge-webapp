import modelsData from "../data/models.json"
import type { Model } from "../types/Model"
import type { GetModelsParams } from "../types/GetModelsParams"


export async function getModels({ category, page = 1, limit = 9 }: GetModelsParams = {}): Promise<{ models: Model[], totalPages: number }> {
  try {
    let filteredModels = [...modelsData];
    if (category) {
      filteredModels = modelsData.filter((model: Model) =>
        model.category === category);
    }
    const totalPages = Math.ceil(filteredModels.length / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const models = filteredModels.slice(startIndex, endIndex);
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

// export async function getFavoriteModels(): Promise<Model[]> {
//   try {
//     const favoriteModels = modelsData.filter((model) => model.isLiked);
//     return favoriteModels;
//   } catch (error) {
//     console.error("Failed to get favorite models:", error);
//     throw error;
//   }
// }

// export async function setLikedModel(model: Model): Promise<Model> {
//   try {
//     const modelToFavor = await getModelById(model.id);
//     modelToFavor.isLiked = true;

//     const filePath = path.join(process.cwd(), "src/app/data/models.json");
//     fs.writeFileSync(filePath, JSON.stringify(modelsData, null, 4), "utf-8");
//     return modelToFavor;
//   } catch(error){
//     console.error("Failed to set model as liked:", error);
//     throw error;
//   }
// }

// export async function removeLikedModel(model: Model): Promise<Model> {
//   try {
//     const modelToUnfavor = await getModelById(model.id);
//     modelToUnfavor.isLiked = false;

//     const filePath = path.join(process.cwd(), "src/app/data/models.json");
//     fs.writeFileSync(filePath, JSON.stringify(modelsData, null, 4), "utf-8");
//     return modelToUnfavor;
//   } catch(error) {
//     console.error("Failed to remove model from liked:", error);
//     throw error;
//   }
// }

// export async function isLiked(model:Model): Promise<boolean> {
//   try {
//     const modelToCheck = await getModelById(model.id);
//     return modelToCheck.isLiked;
//   } catch (error) {
//     console.error("Failed to check if model is favorite:", error);
//     throw error;
//   }
//}