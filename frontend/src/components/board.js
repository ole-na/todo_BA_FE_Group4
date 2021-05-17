import React from "react";
import Todo from "./todo";

export default function Board({ state, todos, onDelete, onAdvance }) {
  return (
    <div className="todo-board">
      <h2>{state}</h2>
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
          onAdvance={onAdvance}
          onDescription={() => alert(todo.description)}
        />
      ))}
    </div>
  );
}
