import React from "react";
import { useOutletContext } from "react-router-dom";

function List() {
  const { todos } = useOutletContext();

  return (
    <div className="todo-list-container">
      <h2 className="todo-heading">Todo List</h2>
      {todos.length === 0 ? (
        <div className="no-todos-message">
             <p>No todos found.</p>
        </div>
      ) : (
        <table className="todo-table">
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo, index) => (
              <tr key={todo._id}>
                <td>{index + 1}</td>
                <td>{todo.title}</td>
                <td>{todo.description}</td>
                <td>{todo.isCompleted ? "Completed" : "Incomplete"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default List;
