import Skeleton from "@/components/shared/Skeleton";

export default function CommentSkeleton() {
  return (
    <div className="w-full flex flex-wrap sm:flex-nowrap items-start justify-between px-2 py-4 border rounded-lg shadow-md bg-gray-100">
      <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
        <div className="flex flex-col items-center gap-1">
          <Skeleton bgColor="bg-gray-300" className="h-10 w-10 rounded-full" />
          <div className="flex flex-wrap gap-2 mt-2 justify-center">
            {Array(3)
              .fill(null)
              .map((_, index) => (
                <Skeleton
                  key={index}
                  bgColor="bg-gray-300"
                  className="h-4 w-12 rounded-md"
                />
              ))}
          </div>
        </div>
        <div className="flex flex-col mr-1">
          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            <Skeleton bgColor="bg-gray-300" className="h-4 w-24 rounded-full" />
            <Skeleton bgColor="bg-gray-300" className="h-3 w-16 rounded-full" />
          </div>
          <Skeleton
            bgColor="bg-gray-300"
            className="h-4 w-[180px] sm:w-[240px] md:w-[300px] rounded-full mt-2"
          />
        </div>
      </div>
      <div className="flex items-center flex-col gap-2 mt-4 sm:mt-0">
        <Skeleton bgColor="bg-gray-300" className="h-6 w-6 rounded-full" />
        <Skeleton bgColor="bg-gray-300" className="h-4 w-16 rounded-full" />
      </div>
    </div>
  );
}
