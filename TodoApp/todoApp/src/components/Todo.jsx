import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabaseClient";
import { useUser } from "@clerk/clerk-react";

function Todo() {
  const { user } = useUser();
  const [task, setTask] = useState("");
  const [menuOpen, setMenuOpen] = useState({});
  const queryClient = useQueryClient();

  const getTodos = async () => {
    if (!user) return [];
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .eq("user_id", user.id);

    if (error) {
      throw new Error(error.message);
    }
    return data;
  };

  const {
    data: todos = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["todos", user?.id],
    queryFn: getTodos,
    enabled: !!user,
  });

  const handleAddTask = async () => {
    if (task.trim() !== "" && user) {
      try {
        const { data, error } = await supabase.from("todos").insert([
          {
            description: task,
            created_at: new Date().toISOString(),
            user_id: user.id,
            important: null,
            complate: null,
          },
        ]);

        if (error) {
          throw new Error(error.message);
        }

        setTask("");
        queryClient.invalidateQueries(["todos", user.id]);
      } catch (error) {
        console.error("Error adding task:", error.message);
      }
    }
  };

  const toggleMenu = (id) => {
    setMenuOpen((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleDeleteTask = async (id) => {
    try {
      const { error } = await supabase.from("todos").delete().eq("id", id);
      if (error) throw new Error(error.message);
      queryClient.invalidateQueries(["todos", user.id]);
      setMenuOpen((prev) => ({ ...prev, [id]: false }));
    } catch (error) {
      console.error("Error deleting task:", error.message);
    }
  };

  const handleMarkImportant = async (id, currentStatus) => {
    try {
      const { error } = await supabase
        .from("todos")
        .update({ important: !currentStatus })
        .eq("id", id);
      if (error) throw new Error(error.message);
      queryClient.invalidateQueries(["todos", user.id]);
      setMenuOpen((prev) => ({ ...prev, [id]: false }));
    } catch (error) {
      console.error("Error marking task as important:", error.message);
    }
  };

  const handleMarkDone = async (id, currentStatus) => {
    try {
      const { error } = await supabase
        .from("todos")
        .update({ complate: !currentStatus })
        .eq("id", id);
      if (error) throw new Error(error.message);
      queryClient.invalidateQueries(["todos", user.id]);
      setMenuOpen((prev) => ({ ...prev, [id]: false }));
    } catch (error) {
      console.error("Error marking task as done:", error.message);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const bgColors = ["#E3EBFC", "#FBF0E4", "#E4F6FC", "#FCE4E4"];

  return (
    <div className="justify-center items-center flex flex-col">
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="m-4 w-[50%] h-[48px] bg-[#FFFFFF] py-2 px-4 border border-gray-300 text-[16px] rounded-lg"
        placeholder="+ Add task"
      />
      <button
        onClick={handleAddTask}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Task
      </button>

      <div className="flex flex-row flex-wrap gap-6">
        {todos.map((todo, index) => {
          const date = new Date(todo.created_at);
          const formattedDate = `${String(date.getUTCDate()).padStart(
            2,
            "0"
          )}-${String(date.getUTCMonth() + 1).padStart(
            2,
            "0"
          )}-${date.getUTCFullYear()}`;

          const bgColor = bgColors[index % bgColors.length];

          return (
            <div
              key={todo.id}
              style={{ backgroundColor: bgColor }}
              className="p-6 rounded-lg shadow-md text-left max-w-[22%] w-full h-fit relative"
            >
              <h2 className="mb-4">{formattedDate}</h2>
              <p className="text-balance break-all">{todo.description}</p>

              <button
                className="absolute top-2 right-2"
                onClick={() => toggleMenu(todo.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v.01M12 12v.01M12 18v.01"
                  />
                </svg>
              </button>

              {menuOpen[todo.id] && (
                <div className="absolute top-8 right-2 bg-white shadow-md border rounded-lg p-2 z-10">
                  <ul>
                    <li
                      className="hover:bg-gray-100 p-2 cursor-pointer"
                      onClick={() =>
                        handleMarkImportant(todo.id, todo.important)
                      }
                    >
                      {todo.important
                        ? "Unmark Important"
                        : "Mark as Important"}
                    </li>
                    <li
                      className="hover:bg-gray-100 p-2 cursor-pointer"
                      onClick={() => handleMarkDone(todo.id, todo.complate)}
                    >
                      {todo.complate ? "Undo Mark as Done" : "Mark as Done"}
                    </li>
                    <li
                      className="hover:bg-gray-100 p-2 cursor-pointer text-red-500"
                      onClick={() => handleDeleteTask(todo.id)}
                    >
                      Delete
                    </li>
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Todo;
