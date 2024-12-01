import PageHeading from "@/components/shared/PageHeading";
import CreateNewTask from "./ui/CreateNewTask";
import { getServerSession } from "@/utils/session";

export default function TasksPage() {
  const session = getServerSession();
  
  return (
    <>
      <PageHeading title="وظایف" />
      <CreateNewTask session={session} />
    </>
  );
}
