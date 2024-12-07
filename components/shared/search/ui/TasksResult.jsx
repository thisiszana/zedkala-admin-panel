import Link from "next/link";
import moment from "moment-jalaali";
import { Avatar, Badge, Tooltip } from "antd";
import CustomBadge from "../../CustomBadge";
import { shorterText } from "@/utils/fun";
import { icons, tasksStatus } from "@/constants";

moment.locale("fa");
moment.loadPersian({ usePersianDigits: true });

const TasksResult = ({ tasks, closeModal }) => {
  return (
    <div>
      <h1 className="text-h3 font-medium mb-4">نتایج وظایف</h1>
      {tasks.map((task) => {
        const isExpired =
          moment().isAfter(moment(task.dueDate.expiresAt)) &&
          task.status !== "Done";
        const taskStatus = tasksStatus.find((t) => t.value === task.status);
        return (
          <div
            key={task._id}
            className="hoverable rounded-btn p-4 space-y-4 cardShadow3 border bg-white mb-4 relative"
          >
            <div className="flex justify-between items-center">
              <p className="text-p1 font-medium">{task.title}</p>
              <CustomBadge
                title={taskStatus ? taskStatus.label : task.status}
                colors={
                  task.status === "Todo"
                    ? "text-darkBlue bg-lightBlue"
                    : task.status === "Progress"
                    ? "text-darkOrange bg-lightOrange"
                    : "text-darkGreen bg-lightGreen"
                }
              />
            </div>
            <p className="text-p2 text-darkGray">
              {shorterText(task.description, 100)}
            </p>
            <hr />
            <div className="flex items-center justify-between flex-wrap gap-4">
              <Link
                href={`/account/admin/${task.createdBy._id}`}
                className="flex items-center gap-3"
                onClick={closeModal}
              >
                <Avatar
                  src={task.createdBy.images}
                  size={40}
                  alt={task.createdBy.username}
                />
                <div>
                  <p className="text-p1 font-medium">
                    {task.createdBy.username}
                  </p>
                  <p className="text-p2 text-darkGray">
                    {shorterText(task.createdBy.firstName, 15)}
                  </p>
                </div>
              </Link>

              <p className="text-p2 text-darkGray">
                {moment(task.createdAt).fromNow()}
              </p>
            </div>
            <hr />
            <div className="flex items-center justify-between mt-4">
              <Tooltip
                title={
                  isExpired
                    ? "این تسک منقضی شده است"
                    : `مهلت: ${moment(task.dueDate.expiresAt).format(
                        "jYYYY/jMM/jDD"
                      )}`
                }
              >
                <Badge
                  count={isExpired ? "منقضی‌شده" : "فعال"}
                  style={{
                    backgroundColor: isExpired ? "#ff4d4f" : "#52c41a",
                    color: "#fff",
                  }}
                />
              </Tooltip>
              <div className="flex items-center gap-2 text-darkGray">
                {icons.chat}
                <span>{task.comments.length} نظر</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TasksResult;
