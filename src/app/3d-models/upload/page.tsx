import ModelUploadForm from "@/app/components/ModelUploadForm";
import { getAllCategories } from "@/app/lib/categories";

export default async function UploadPage() {
    const categories = await getAllCategories();
    return (
        <div className="container mx-auto p-4 py-8">
            <h1 className="text-4xl font-bold mb-8">
                Upload a new 3D Model
            </h1>
            <ModelUploadForm categories={categories}/>
        </div>
    );
}