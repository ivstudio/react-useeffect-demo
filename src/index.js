import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

function App() {
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("loading");

  const url = "https://jsonplaceholder.typicode.com/posts";

  useEffect(() => {
    async function fetchTodos() {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw Error(`Error status ${response.status}`);
        }

        const data = await response.json();
        setTodos(data);
        setStatus("success");
      } catch (e) {
        setStatus("error");
      }
    }

    fetchTodos();
  }, []);

  if (status === "error") {
    return <div>Something went wrong...</div>;
  }

  return (
    <div>
      {status === "loading"
        ? "loading..."
        : todos.map((todo) => (
            <ul key={todo.id}>
              <li>{todo.title}</li>
              <li>{todo.body}</li>
            </ul>
          ))}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
