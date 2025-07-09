import React from "react";
import { useOutletContext } from "react-router-dom";

function Cards() {
  const { todos } = useOutletContext();

  return (
    <div className="todo-list-grid">
      {todos.map((todo, index) => {
         

        return (
          <div className="todo-item-card" key={index}>
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>
            <p style={{ fontSize: "10px" }}>
              {todo.isCompleted ? "✅ Completed" : "❌ Incomplete"}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default Cards;
