import React from "react";

function TodoItem({ todo, index, toggleComplete, deleteTodo }) {
  return (
    <div className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <span onClick={() => toggleComplete(index)}>{todo.text}</span>
      <button onClick={() => toggleComplete(index)}>
        {todo.completed ? "Undo" : "Done"}
      </button>
      <button onClick={() => deleteTodo(index)}>Delete</button>
    </div>
  );
}

export default TodoItem;
