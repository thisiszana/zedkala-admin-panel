import moment from "moment-jalaali";
import { Badge, Empty } from "antd";

import { getServerSession } from "@/utils/session";
import { images } from "@/constants";
import Image from "next/image";
import TaskActions from "./TaskActions";
import EditTask from "./EditTask";
import { Clock } from "@/components/icons/Icons";

export default function StatusBox({ status, taskCount, tasks }) {
  const session = getServerSession();
  return (
    <div className="flex flex-col gap-5">
      <Badge count={taskCount} className="custom-badge">
        <h3 className="h3">{status}</h3>
      </Badge>
      <div className="bg-lightGray rounded-box p-box flex flex-col gap-4">
        {tasks.length !== 0 ? (
          tasks.map((task) => (
            <div
              key={task._id}
              className="rounded-box p-box border bg-white flex flex-col gap-4"
            >
              <div className="flex justify-between gap-2">
                <div className="flex items-center gap-3">
                  <Clock
                    size={17}
                    wrapperClassName="cardShadow p-3 rounded-btn"
                  />
                  <p className="text-darkGray text-p1 capitalize">
                    {moment(task.dueDate).fromNow()}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <EditTask
                    id={JSON.parse(JSON.stringify(task._id))}
                    session={JSON.parse(JSON.stringify(session))}
                  />
                  <TaskActions
                    id={JSON.parse(JSON.stringify(task._id))}
                    currentStatus={JSON.parse(JSON.stringify(task.status))}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <p className="font-medium">{task.title}</p>
                <p className="text-darkGray text-p1">{task.description}</p>
              </div>
              <div className="flex justify-between items-center gap-2 w-full">
                <div className="flex items-center gap-3">
                  <Image
                    src={task?.createdBy?.images || images.admin}
                    width={200}
                    height={200}
                    style={{ width: "50px", height: "50px" }}
                    alt="user"
                    radius="full"
                    className="w-[100px] h-[100px] mb-2 rounded-full"
                  />
                  <div>
                    <p className="text-p1 font-medium">
                      {task?.createdBy?.username}
                    </p>
                    {task?.createdBy?.firstName && (
                      <p className="text-p2 text-darkGray -mt-1">
                        {task?.createdBy?.firstName}
                      </p>
                    )}
                  </div>
                </div>
                <p className="text-darkGray text-p2">
                  {moment(task.createdAt).format("jYYYY/jMM/jDD")}
                </p>
              </div>
            </div>
          ))
        ) : (
          <Empty description="تسکی وجود ندارد" />
        )}
      </div>
    </div>
  );
}
