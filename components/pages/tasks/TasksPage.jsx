import { Suspense } from "react";

import PageHeading from "@/components/shared/PageHeading";
import Loaderbar from "@/components/shared/Loaderbar";
import { getServerSession } from "@/utils/session";
import CreateNewTask from "./ui/CreateNewTask";
import TasksList from "./ui/TasksList";

export default function TasksPage() {
  const session = getServerSession();

  return (
    <>
      <PageHeading title="وظایف" />
      <CreateNewTask session={session} />
      <Suspense fallback={<Loaderbar />}>
        {" "}
        {/* این لوادر باید بعدا تغیر کند! */}
        <TasksList />
      </Suspense>
    </>
  );
}
