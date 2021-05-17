import "./App.css";
import React, { useEffect, useState } from "react";
import * as todoApi from "./services/todo-api.js";
import Board from "./components/board";

function App() {
  const [todos, setTodos] = useState([]);
  const [description, setDescription] = useState("");
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    todoApi.getTodos().then((loadedTodos) => setTodos(loadedTodos));
  }, []);

  const openTodos = todos.filter((item) => item.status == "OPEN");
  const inProgressTodos = todos.filter((item) => item.status == "IN_PROGRESS");
  const doneTodos = todos.filter((item) => item.status == "DONE");

  function addTodo(description) {
    const newTodoDto = { description, status: "OPEN" };
    console.log(newTodoDto);
    todoApi
      .postTodo(newTodoDto)
      .then((newTodo) => {
        const updatedTodos = [...todos, newTodo];
        console.log(updatedTodos);
        setTodos(updatedTodos);
      })
      .catch((error) => {
        console.log("Add Todo Error:", error);
        setError(error);
      })
      .finally((isLoading) => {
        setIsLoading(false);
      });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (description === "") {
      return;
    }
    console.log("Desc:", description);
    addTodo(description);
    setDescription("");
  };
  function advanceTodo(todo) {
    if (todo.status === "OPEN") {
      todo.status = "IN_PROGRESS";
    } else {
      todo.status = "DONE";
    }
    todoApi
      .putTodo(todo)
      .then((updatedTodo) => {
        const newList = todos.map((todo) =>
          todo.id === updatedTodo.id ? updatedTodo : todo
        );
        setTodos(newList);
      })
      .catch((error) => {
        console.log("Add Todo Error:", error);
        // setError(error);
      })
      .finally((isLoading) => {
        // setIsLoading(false);
      });
  }

  function deleteTodo(todo) {
    todoApi
      .deleteTodo(todo)
      .then(() => {
        const newList = todos.filter((item) => item.id !== todo.id);
        setTodos(newList);
      })
      .catch((error) => {
        console.log("Add Todo Error:", error);
        // setError(error);
      })
      .finally((isLoading) => {
        // setIsLoading(false);
      });
  }

  return (
    <div className="App">
      <header>
        <h1>ToDo Tool</h1>
      </header>
      <main>
        <Board
          state="OPEN"
          todos={openTodos}
          onDelete={deleteTodo}
          onAdvance={advanceTodo}
        />
        <Board
          state="IN PROGRESS"
          todos={inProgressTodos}
          onDelete={deleteTodo}
          onAdvance={advanceTodo}
        />
        <Board
          state="DONE"
          todos={doneTodos}
          onDelete={deleteTodo}
          onAdvance={advanceTodo}
        />

        <form className="todo-add" onSubmit={handleSubmit}>
          <input
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <button className="button glow-on-hover" type="submit">
            Add Todo
          </button>
        </form>
      </main>
    </div>
  );
}

export default App;
