import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabaseClient";
import { useUser } from "@clerk/clerk-react";

function Todo() {
  const { user } = useUser();
  const [task, setTask] = useState("");

  // Log user ID for verification
  // console.log("User ID:", user?.id);

  // Define the function to fetch todos from Supabase
  const getTodos = async () => {
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .eq("user_id", user.id);
    console.log(data);

    if (error) {
      throw new Error(error.message);
    }
    return data;
  };

  const {
    data: todos,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  // Function to add a new task directly
  const handleAddTask = async () => {
    if (task.trim() !== "" && user) {
      try {
        console.log(task);
        const { data, error } = await supabase.from("todos").insert([
          {
            description: task,
            created_at: new Date().toISOString(),
            user_id: user.id,
          },
        ]);

        if (error) {
          throw new Error(error.message);
        }

        console.log("Task added:", data);
        setTask("");
      } catch (error) {
        console.error("Error adding task:", error.message);
      }
    }
  };

  // Handle loading state
  if (isLoading) return <p>Loading...</p>;

  // Handle error state
  if (error) return <p>Error: {error.message}</p>;

  // Background color array
  const bgColors = ["#E3EBFC", "#FBF0E4", "#E4F6FC", "#FCE4E4"];

  return (
    <div className="justify-center items-center flex flex-col">
      {/* Input for adding a new task */}
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="m-4 w-[50%] h-[48px] bg-[#FFFFFF] py-]10px] px-[14px] border-[1px] text-[16px]"
        placeholder="+ Add task"
      />
      <button
        onClick={handleAddTask}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Task
      </button>

      {/* Task List */}
      <div className="flex flex-row flex-wrap gap-6">
        {todos.map((todo, index) => {
          // Convert created_at to dd-mm-yyyy format
          const date = new Date(todo.created_at);
          const formattedDate = `${String(date.getUTCDate()).padStart(
            2,
            "0"
          )}-${String(date.getUTCMonth() + 1).padStart(
            2,
            "0"
          )}-${date.getUTCFullYear()}`;

          // Determine background color based on the index
          const bgColor = bgColors[index % bgColors.length];

          return (
            <div
              key={todo.id}
              style={{ backgroundColor: bgColor }}
              className="p-6 rounded-lg shadow-md text-left max-w-[22%] w-full h-fit"
            >
              <h2 className="mb-4">{formattedDate}</h2>
              <p className="text-balance break-all">{todo.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Todo;
