import React, { useState, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom"; 
import { toast } from "react-toastify";
import API from "../utils/api";

function Todomanager() {
  const { todos, setTodos, editingTodo, setEditingTodo,} = useOutletContext();
  const navigate = useNavigate(); 
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);


  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title || "");
      setDescription(editingTodo.description || "");
      setIsCompleted(!!editingTodo.isCompleted);
    } else {
     
      setTitle("");
      setDescription("");
      setIsCompleted(false);
    }
  }, [editingTodo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingTodo) {
        
        const res = await API.patch(`/todos/update-todo/${editingTodo._id}`, {
          title,
          description,
          isCompleted,
        });
        const updatedTodo = res.data.todo;

        setTodos((prev) =>
          prev.map((todo) =>
            todo._id === updatedTodo._id ? updatedTodo : todo
          )
        );

        setEditingTodo(null); 
        setTitle("");
        setDescription("");
        setIsCompleted(false);
        toast.success("Todo updated successfully!");
        navigate("/dashboard/manage"); 
      } else {
        
        const res = await API.post("todos/create", {
          title,
          description,
          isCompleted,
        });
        setTodos([...todos, res.data.todo]);

        toast.success("Todo created successfully!");
      }

      //  Reset form
      setTitle("");
      setDescription("");
      setIsCompleted(false);
    } catch (err) {
      toast.error("Error submitting todo");
    }
  };

  return (
    <div className="main-container">
      <form className="todo-form" onSubmit={handleSubmit}>
        <h2>{editingTodo ? "Edit Todo" : "Create Todo"}</h2>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <div className="checkbox-container">
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={(e) => setIsCompleted(e.target.checked)}
          />
          <span>Completed</span>
        </div>

        <button type="submit">{editingTodo ? "Update" : "Create"} Todo</button>
      </form>
    </div>
  );
}

export default Todomanager;
