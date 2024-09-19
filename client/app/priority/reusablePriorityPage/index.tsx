"use client";

import { useAppSelector } from "@/app/redux";
import { Priority, Task, useGetTasksByUserQuery } from "@/state/api";
import { useState } from "react";

type Props = {
  priority: Priority;
};

const ReusablePriorityPage = ({ priority }: Props) => {
  const [view, setView] = useState("list");
  const [isModalNewtaskOpen, setIsModalNewtaskOpen] = useState(false);

  const userId = 1;
  const {
    data: tasks,
    isLoading,
    isError: isTaskError,
  } = useGetTasksByUserQuery(userId || 0, { skip: userId === null });

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const filteredTasks = tasks?.filter(
    (task: Task) => task.priority === priority,
  );

  return <div>ReusablePriorityPage</div>;
};

export default ReusablePriorityPage;
