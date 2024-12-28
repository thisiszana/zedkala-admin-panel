import Image from "next/image";
import moment from "moment-jalaali";
import { Badge, Empty, Tooltip } from "antd";
import { Clock } from "@/components/icons/Icons";
import TaskProgressBar from "./TaskProgressBar";
import TaskAssistants from "./TaskAssistants";
import TaskActions from "./TaskActions";
import { images } from "@/constants";
import EditTask from "./EditTask";
import { getServerSession } from "@/utils/session";
import TaskDescription from "./TaskDescription ";

moment.locale("fa");
moment.loadPersian({ usePersianDigits: true });

export default function StatusBox({ status, taskCount, tasks }) {
  const session = getServerSession();
  return (
    <div className="flex flex-col gap-5">
      <Badge count={taskCount} className="custom-badge">
        <h3 className="h3 dark:text-lightGray">{status}</h3>
      </Badge>
      <div className="bg-lightGray dark:bg-dark2 rounded-box p-box flex flex-col gap-4">
        {tasks.length !== 0 ? (
          tasks.map((task) => {
            console.log(task?.taskOwner)
            return (
              <div
                key={task._id}
                className="rounded-box p-box border bg-white flex flex-col gap-4 dark:bg-dark1"
                style={{ background: task.background }}
              >
                {task.status !== "Done" && (
                  <TaskProgressBar
                    createdAt={task.dueDate.startAt}
                    dueDate={task.dueDate.expiresAt}
                  />
                )}
                <div className="flex justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <Clock
                      size={17}
                      wrapperClassName="cardShadow p-3 rounded-btn text-dark1"
                    />

                    <p className="text-darkGray text-p1 capitalize">
                      {task.status === "Done"
                        ? "تسک انجام شد"
                        : moment(task.dueDate.startAt).fromNow()}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <EditTask
                      id={JSON.parse(JSON.stringify(task._id))}
                      session={JSON.parse(JSON.stringify(session))}
                    />
                    <TaskActions
                      id={JSON.parse(JSON.stringify(task._id))}
                      currentStatus={JSON.parse(JSON.stringify(task.status))}
                      currentUser={JSON.parse(JSON.stringify(session.userId))}
                      currentRoll={JSON.parse(JSON.stringify(session.roll))}
                    />
                  </div>
                </div>

                <TaskDescription task={task}/>

                <div className="flex items-center gap-3 mt-3">
                  {task.createdBy.roll === "OWNER" &&
                    (task?.taskOwner ? (
                      <div className="flex items-center gap-3">
                        <Image
                          src={task?.taskOwner?.userId.images || images.admin}
                          width={40}
                          height={40}
                          alt={task?.taskOwner?.username}
                          className="rounded-full"
                        />
                        <p className="text-p1 text-dark1">
                          این تسک برای {task.taskOwner.username} است
                        </p>
                      </div>
                    ) : (
                      <p className="text-p1 text-darkGray">
                        این تسک برای همه است
                      </p>
                    ))}
                </div>

                <TaskAssistants assistants={task.taskAssistants} />

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
                      <p className="text-p1 font-medium text-dark1">
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
                { task.reviews?.length > 0 && (
                  <div className="text-darkGray text-p2 mt-3">
                    <p className="font-medium text-dark1">نظر مدیر: </p>
                    <p>{task.reviews[task.reviews.length - 1].reviewComment}</p>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <Empty description="تسکی وجود ندارد" className="empty-description" />
        )}
      </div>
    </div>
  );
}
