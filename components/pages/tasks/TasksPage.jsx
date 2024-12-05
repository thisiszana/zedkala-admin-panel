import { Suspense } from "react";

import PageHeading from "@/components/shared/PageHeading";
import TasksListSkeletons from "./ui/TasksListSkeletons";
import { getServerSession } from "@/utils/session";
import CreateNewTask from "./ui/CreateNewTask";
import TasksList from "./ui/TasksList";

export default function TasksPage({ searchParams }) {
  const viewType = searchParams?.viewType || "";
  const session = getServerSession();

  return (
    <>
      <PageHeading title="وظایف" />
      <CreateNewTask session={session} />
      <Suspense key={viewType} fallback={<TasksListSkeletons />}>
        <TasksList searchParams={searchParams} />
      </Suspense>
    </>
  );
}
