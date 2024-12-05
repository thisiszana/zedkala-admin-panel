import Image from "next/image";

import { Tooltip } from "antd";

import { images } from "@/constants";

export default function TaskAssistants({ assistants = [] }) {
  if (!assistants || assistants.length === 0) {
    return (
      <p className="text-sm text-gray-500">
        همکاری برای این تسک تعیین نشده است.
      </p>
    );
  }

  return (
    <div className="flex items-center gap-2 mt-4">
      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
        همکاران:
      </p>
      <div className="flex items-center gap-2">
        {assistants.map((assistant) => (
          <Tooltip
            key={assistant.userId}
            title={`نام کاربری: ${assistant.username}`}
          >
            <Image
              src={assistant.userId.images || images.admin} 
              alt={assistant.username}
              width={40}
              height={40}
              className="rounded-full border border-gray-200 shadow-sm"
            />
          </Tooltip>
        ))}
      </div>
    </div>
  );
}
