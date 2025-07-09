import React, { useState, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import API from "../utils/api";

function ManageCards() {
  const { todos, setTodos, setEditingTodo } = useOutletContext();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTodos, setFilteredTodos] = useState(todos);
  const [viewTodo, setViewTodo] = useState(null);

  useEffect(() => {
    setFilteredTodos(
      todos.filter((todo) =>
        todo.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, todos]);

  const handleEdit = (todo) => {
    setEditingTodo(todo);
    navigate("/dashboard/create");
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/todos/delete-todo/${id}`);
      setTodos((prev) => prev.filter((todo) => todo._id !== id));
      toast.success("Todo deleted successfully!");
    } catch (error) {
      toast.error("Error deleting todo"); 
    }
  };

  const handleDownload = () => {
    const worksheet = XLSX.utils.json_to_sheet(todos);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Todos");
    XLSX.writeFile(workbook, "todos.xlsx");
  };

  return (
    <div className="manage-todo-section">
      <div className="manage-top-bar">
        <input
          type="text"
          placeholder="Search todos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button style={{ padding: "12px 14px", fontSize: "14px" }} onClick={handleDownload}>
          Download Excel
        </button>
      </div>

      <div className="table-wrapper">
        <table className="todo-table">
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTodos.map((todo, index) => (
              <tr key={todo._id}>
                <td>{index + 1}</td>
                <td>{todo.title}</td>
                <td>{todo.description}</td>
                <td>
                  {todo.isCompleted ? (
                    <span className="text-success">Completed</span>
                  ) : (
                    <span className="text-danger">Incomplete</span>
                  )}
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="view-btn" title="View" onClick={() => setViewTodo(todo)}>
                      <i className="fa-solid fa-eye"></i>
                    </button>
                    <button
                      className="edit-btn"
                      title="Edit"
                      onClick={() => handleEdit(todo)}
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button
                      className="delete-btn"
                      title="Delete"
                      onClick={() => handleDelete(todo._id)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/*  Slide-In View Panel */}
      {viewTodo && (
        <div className="slide-panel">
          <div className="slide-panel-header">
            <h3>Todo Details</h3>
            
          </div>
          <div className="slide-panel-content">
            <p><strong>Title:</strong> {viewTodo.title}</p>
            <p><strong>Description:</strong> {viewTodo.description}</p>
            <p><strong>Status:</strong> {viewTodo.isCompleted ? "completed" : "Incomplete"}</p>
          </div>
          <button className="close-btn" onClick={() => setViewTodo(null)}>
              Close
            </button>
        </div>
      )}
    </div>
  );
}

export default ManageCards;
