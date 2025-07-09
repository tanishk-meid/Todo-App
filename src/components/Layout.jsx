import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import API from "../utils/api";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Layout() {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const fetchTodos = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await API.get("todos/get-todo");
      setTodos(res.data.todos || []);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchTodos();
    }
  }, []);

  return (
    <>
      <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div className="layout">
        <Sidebar isOpen={isSidebarOpen} />

        {/* Overlay to dim background */}
        {isSidebarOpen && (
          <div
            className="sidebar-overlay"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}

        <div className="main-content">
          <Outlet
            context={{
              todos,
              setTodos,
              fetchTodos,
              editingTodo,
              setEditingTodo,
            }}
          />
        </div>
      </div>
    </>
  );
}

export default Layout;
