import { getTasks } from "@/actions/task.action";
import StatusBox from "./StatusBox";

export default async function TasksList({ searchParams }) {
  const data = await getTasks(searchParams);

  if (data.code !== 200) return <div>خطا در دریافت اطلاعات</div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-8 mt-5 ml-0 md:ml-3">
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
        status="بررسی توشط مدیر"
        taskCount={data.tasks.preview.length}
        tasks={data.tasks.preview}
      />
      <StatusBox
        status="انجام شده"
        taskCount={data.tasks.done.length}
        tasks={data.tasks.done}
      />
    </div>
  );
}
