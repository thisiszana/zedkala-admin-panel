import Skeleton from "@/components/shared/Skeleton";

export default function TasksListSkeletons() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8 mt-5">
      {Array(9)
        .fill(null)
        .map((item, index) => (
          <Skeleton
            key={index}
            className="rounded-xl w-full p-5 flex flex-col gap-4 ml-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Skeleton
                  bgColor="bg-gray-300"
                  className="h-10 w-10 rounded-lg"
                />
                <Skeleton
                  bgColor="bg-gray-300"
                  className="h-3 w-20 rounded-lg"
                />
              </div>
              <div className="flex items-center gap-3">
                <Skeleton
                  bgColor="bg-gray-300"
                  className="h-6 w-6 rounded-lg"
                />
                <Skeleton
                  bgColor="bg-gray-300"
                  className="h-6 w-6 rounded-lg"
                />
              </div>
            </div>
            <Skeleton
              bgColor="bg-gray-300"
              className="h-6 w-3/4 rounded-full"
            />
            <Skeleton
              bgColor="bg-gray-300"
              className="h-4 w-full rounded-full"
            />
            <Skeleton
              bgColor="bg-gray-300"
              className="h-4 w-full rounded-full"
            />
            <Skeleton
              bgColor="bg-gray-300"
              className="h-4 w-1/2 rounded-full"
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Skeleton
                  bgColor="bg-gray-300"
                  className="h-10 w-10 rounded-full"
                />
                <div className="space-y-2">
                  <Skeleton
                    bgColor="bg-gray-300"
                    className="h-2 w-24 rounded-full"
                  />
                  <Skeleton
                    bgColor="bg-gray-300"
                    className="h-2 w-16 rounded-full"
                  />
                </div>
              </div>
              <Skeleton
                bgColor="bg-gray-300"
                className="h-3 w-16 rounded-full"
              />
            </div>
          </Skeleton>
        ))}
    </div>
  );
}
