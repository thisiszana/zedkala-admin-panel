import { getTasks } from "@/actions/task.action";
import StatusBox from "./StatusBox";

export default async function TasksList({ searchParams }) {
  const data = await getTasks(searchParams);

  if (data.code !== 200) return <div>خطا در دریافت اطلاعات</div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-8 mt-5 ml-0 md:ml-3">
      <StatusBox
        status="انجام دادن"
        taskCount={JSON.parse(JSON.stringify(data.tasks.todo)).length}
        tasks={JSON.parse(JSON.stringify(data.tasks.todo))}
      />
      <StatusBox
        status="در حال انجام"
        taskCount={JSON.parse(JSON.stringify(data.tasks.progress)).length}
        tasks={JSON.parse(JSON.stringify(data.tasks.progress))}
      />
      <StatusBox
        status="بررسی توشط مدیر"
        taskCount={JSON.parse(JSON.stringify(data.tasks.preview)).length}
        tasks={JSON.parse(JSON.stringify(data.tasks.preview))}
      />
      <StatusBox
        status="انجام شده"
        taskCount={JSON.parse(JSON.stringify(data.tasks.done)).length}
        tasks={JSON.parse(JSON.stringify(data.tasks.done))}
      />
    </div>
  );
}
