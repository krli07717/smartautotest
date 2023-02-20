import { useState, useEffect } from "react";

const LOCAL_STORAGE_KEY = "smartautotasks";

function useTasks(key) {
  const [tasks, setTasks] = useState(() => {
    const localStorageTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (localStorageTasks?.length) {
      return JSON.parse(localStorageTasks);
    }
    return [];
  });

  const maxId = tasks.reduce((id, task) => {
    if (task.id > id) return task.id;
    return id;
  }, 0);

  const completeRate =
    tasks.length === 0
      ? 0
      : Math.round(
          (tasks.filter((task) => task.completed).length / tasks.length) * 100
        );

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const onComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const onDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const onAdd = (taskName) => {
    const newTask = {
      id: maxId + 1,
      name: taskName,
      completed: false,
      timestamp: new Date().getTime(),
    };
    setTasks((task) => [...task, newTask]);
  };

  const operation = {
    onComplete,
    onDelete,
    onAdd,
  };

  return {
    tasks,
    operation,
    completeRate,
    maxId,
  };
}

export { useTasks };
