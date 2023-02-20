import { useState } from "react";

function AddTask({ onAdd }) {
  const [form, setForm] = useState({
    taskName: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.taskName.trim()) return;
    onAdd(form.taskName);
    setForm({ ...form, taskName: "" });
  };
  return (
    <form className="flex gap-2" onSubmit={onSubmit}>
      <input
        id="task_name"
        type="text rounded-lg"
        value={form.taskName}
        className="flex-1 p-4"
        onChange={(e) => {
          setForm({ ...form, taskName: e.target.value });
        }}
      ></input>
      <input
        type="submit"
        className="rounded-lg text-white bg-blue-800/70 py-2 px-4 text-2xl cursor-pointer"
        value="+"
      ></input>
    </form>
  );
}

export { AddTask };
