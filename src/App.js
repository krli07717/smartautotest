import { ProgressBar, Task, AddTask } from "./components";
import { useTasks } from "./hooks";
import { useState, useEffect } from "react";

function App() {
  const { tasks, operation, completeRate, maxId } = useTasks();
  const [moveDoneToEnd, setMoveDoneToEnd] = useState(false);

  useEffect(() => {
    document
      .querySelector(`#task-${maxId}`)
      ?.scrollIntoView({ behavior: "smooth" });
  }, [maxId]);

  return (
    <div className="p-8 text-slate-600 md:px-16 lg:px-28 xl:px-48 2xl:px-60">
      <header>
        <h1 className="text-2xl">Todo List</h1>
        <h2 className="text-md">Add things to do</h2>
      </header>
      <main className="my-4">
        <hr className="border-slate-400 border-1 rounded-xl my-4" />
        <ProgressBar value={completeRate} />
        <div className="h-[50vh] overflow-auto task-scroll">
          {tasks
            .sort((a, b) => {
              if (!moveDoneToEnd) return a.timestamp - b.timestamp;
              if (a.completed === b.completed) return a.timestamp - b.timestamp;
              if (a.completed && !b.completed) return 1;
              if (!a.completed && b.completed) return -1;
            })
            .map((task) => (
              <Task
                key={task.id}
                id={task.id}
                name={task.name}
                completed={task.completed}
                onComplete={operation.onComplete}
                onDelete={operation.onDelete}
              />
            ))}
        </div>
        <hr className="border-slate-400 border-1 rounded-xl my-4" />
        <div
          className="w-fit ml-auto flex gap-2 items-center cursor-pointer"
          onClick={() => {
            setMoveDoneToEnd((b) => !b);
          }}
        >
          <p>Move done things to end?</p>
          <div
            className={`transition ease-in-out duration-200 w-12 rounded-2xl ${
              moveDoneToEnd ? "bg-blue-600/70" : "bg-white"
            }`}
          >
            <div
              className={`transition ease-in-out duration-200 w-8 rounded-full text-transparent border-4  ${
                moveDoneToEnd
                  ? "ml-auto bg-white border-blue-600/70"
                  : "bg-blue-600/70 border-white"
              }`}
            >
              _
            </div>
          </div>
        </div>

        <div>
          <p className="text-md">Add to list</p>
          <AddTask onAdd={operation.onAdd} />
        </div>
      </main>
    </div>
  );
}

export default App;
