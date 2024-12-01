import { Suspense } from "react";

import PageHeading from "@/components/shared/PageHeading";
import Loaderbar from "@/components/shared/Loaderbar";
import { getServerSession } from "@/utils/session";
import CreateNewTask from "./ui/CreateNewTask";
import TasksList from "./ui/TasksList";
import TasksListSkeletons from "./ui/TasksListSkeletons";

export default function TasksPage({ searchParams }) {
  const sort = searchParams?.sort || "";
  const session = getServerSession();

  return (
    <>
      <PageHeading title="وظایف" />
      <CreateNewTask session={session} />
      <Suspense key={sort} fallback={<TasksListSkeletons />}>
        <TasksList />
      </Suspense>
    </>
  );
}
