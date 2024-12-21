import { images } from "@/constants";
import Image from "next/image";

export default function BannerList({ banner }) {
  if (!banner || banner.length === 0) {
    return <p className="text-center text-gray-500">بنری وجود ندارد!</p>;
  }

  console.log("banner", banner);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {banner.map((item) => (
        <div
          className="bg-white border border-gray-200 rounded-lg shadow-md p-4 text-center"
          key={item._id.toString()}
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            {item.title}
          </h3>
          {item.images && item.images.length > 0 && (
            <Image
              src={item.images[0] || images.imageNotFound}
              width={800}
              height={800}
              alt={item.title}
              className="w-full h-40 object-cover rounded-md mb-3"
            />
          )}
          <p className="text-sm text-gray-600">
            وضعیت:{" "}
            <span className="font-medium">
              {item.published ? "منتشر شده" : "منتشر نشده"}
            </span>
          </p>
          <p className="text-sm text-gray-600">ترتیب: {item.order}</p>
        </div>
      ))}
    </div>
  );
}
