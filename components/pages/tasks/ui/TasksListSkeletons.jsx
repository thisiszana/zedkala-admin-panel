import Skeleton from "@/components/shared/Skeleton";

export default function TasksListSkeletons() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-5">
      {Array(4)
        .fill(null)
        .map((_, index) => (
          <Skeleton
            key={index}
            className="rounded-xl w-full p-5 flex flex-col gap-4 border shadow-sm"
          >
            <Skeleton bgColor="bg-gray-300" className="h-4 w-full rounded-lg" />
            <div className="flex flex-col gap-2">
              <Skeleton
                bgColor="bg-gray-300"
                className="h-6 w-3/4 rounded-lg"
              />
              <Skeleton
                bgColor="bg-gray-300"
                className="h-4 w-full rounded-lg"
              />
            </div>
            <div className="flex items-center gap-4">
              <Skeleton
                bgColor="bg-gray-300"
                className="h-10 w-10 rounded-full"
              />
              <div className="flex flex-col gap-2">
                <Skeleton
                  bgColor="bg-gray-300"
                  className="h-4 w-24 rounded-lg"
                />
                <Skeleton
                  bgColor="bg-gray-300"
                  className="h-3 w-16 rounded-lg"
                />
              </div>
            </div>
            <div className="flex justify-between items-center mt-3">
              <Skeleton bgColor="bg-gray-300" className="h-6 w-16 rounded-lg" />
              <Skeleton
                bgColor="bg-gray-300"
                className="h-6 w-6 rounded-full"
              />
            </div>
          </Skeleton>
        ))}
    </div>
  );
}
