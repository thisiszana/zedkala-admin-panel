import { getTasks } from "@/actions/task.action";
import StatusBox from "./StatusBox";

export default async function TasksList() {
  const data = await getTasks();
  
  if (data.code !== 200) return <div>خطا در دریافت اطلاعات</div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8 mt-5 ml-3">
      <StatusBox
        status="انجام دادن"
        taskCount={data.tasks.todo.length}
        tasks={data.tasks.todo}
      />
      <StatusBox
        status="در حال انجام"
        taskCount={data.tasks.progress.length}
        tasks={data.tasks.progress}
      />
      <StatusBox
        status="انجام شده"
        taskCount={data.tasks.done.length}
        tasks={data.tasks.done}
      />
    </div>
  );
}
