function Task({ id, name, completed, onComplete, onDelete }) {
  return (
    <div className="flex my-4 bg-white rounded-md gap-2 pr-2" id={`task-${id}`}>
      <div className="w-[4px] bg-blue-800/70 rounded-l-md text-transparent shrink-0"></div>
      <div className="flex items-center gap-2 w-full">
        <div
          className={`my-4 px-1 rounded-sm text-sm font-bold border-[1px] border-blue-800/70 cursor-pointer ${
            completed ? "text-white bg-blue-800/70" : "text-transparent"
          }`}
          onClick={() => {
            onComplete(id);
          }}
        >
          V
        </div>
        <p className={`${completed ? "line-through" : ""} overflow-auto`}>
          {name}
        </p>
        <div
          className="px-1 rounded-lg text-slate-500/50 text-sm font-bold ml-auto cursor-pointer"
          onClick={() => {
            onDelete(id);
          }}
        >
          X
        </div>
      </div>
    </div>
  );
}

export { Task };
