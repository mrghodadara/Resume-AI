import { Skeleton } from '@/components/ui/skeleton';

const ResumeCardSkeleton = () => {
  return (
    <div className="relative aspect-[1/1.2] flex flex-col animate-pulse">
      <div className="flex-grow">
        <div className="bg-gray-900 rounded-lg h-full flex flex-col">
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="w-20 h-20 rounded-full bg-gray-800" />
          </div>

          <div className="h-[52px] bg-gray-800/50 backdrop-blur-sm rounded-b-lg flex justify-center items-center">
            <div className="h-6 bg-gray-800 backdrop-blur-sm rounded-lg flex justify-center items-center w-32" />
          </div>
        </div>
      </div>
      <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-gray-800" />
    </div>
  );
};

export default ResumeCardSkeleton;
