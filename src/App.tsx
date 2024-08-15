import { useSyncedStore } from "@syncedstore/react";
import { store } from "./collab/store";

export default function App() {
  const state = useSyncedStore(store);

  return (
    <div className="max-w-2xl mx-auto my-12">
      <h1 className="font-bold text-2xl mb-6">Collaborative Todo list ✨</h1>
      <ul className="text-lg max-w-44">
        {state.todos.map((todo, i) => {
          return (
            <li key={i} className="flex group justify-between">
              <label>
                <input
                  className="mr-2"
                  type="checkbox"
                  checked={todo.completed}
                  onClick={() => (todo.completed = !todo.completed)}
                />
                <span className={todo.completed ? "line-through" : ""}>
                  {todo.title}
                </span>
              </label>
              <button
                className="opacity-0 group-hover:opacity-100 h-7 w-7 bg-orange-200 text-center rounded-full font-bold"
                onClick={() => state.todos.splice(i)}
              >
                x
              </button>
            </li>
          );
        })}
      </ul>
      <input
        placeholder="Enter a todo item and hit enter"
        type="text"
        className="mt-2 rounded-xl w-56 max-w-full p-2 border border-stone-100 shadow-sm"
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            const target = event.target as HTMLInputElement;
            // Add a todo item using the text added in the textfield
            state.todos.push({ completed: false, title: target.value });
            target.value = "";
          }
        }}
      />
    </div>
  );
}
