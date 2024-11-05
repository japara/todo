import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabaseClient";

function Todo() {
  // Define the function to fetch todos from Supabase
  const getTodos = async () => {
    const { data, error } = await supabase.from("todos").select("*");
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

  // Handle loading state
  if (isLoading) return <p>Loading...</p>;

  // Handle error state
  if (error) return <p>Error: {error.message}</p>;

  // Background color array
  const bgColors = ["#E3EBFC", "#FBF0E4", "#E4F6FC", "#FCE4E4"];

  return (
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
            className="p-6 rounded-lg shadow-md text-left max-w-[22%] w-full overflow-hidden"
          >
            <h2 className="mb-4">{formattedDate}</h2>
            <p className="truncate">{todo.description}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Todo;
