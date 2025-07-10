
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import ModelsGridSkeleton from '@/app/components/models/ModelsGridSkeleton';

export default function UserProfilePageSkeleton() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left">
                <div className="mr-0 md:mr-8 mb-4 md:mb-0">
                    <Skeleton circle={true} height={128} width={128} />
                </div>
                <div className="flex-1">
                    <h1 className="text-4xl font-bold mb-2">
                        <Skeleton width={300} />
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                        <Skeleton count={2} />
                    </p>
                </div>
            </div>

            <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6 text-center md:text-left">
                    <Skeleton width={200} />
                </h2>
                <ModelsGridSkeleton />
            </div>
        </div>
    );
};
