import React from "react";
import { Link } from "react-router-dom";


function Sidebar({ isOpen }) {
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <Link to="/dashboard" className="sidebar-link">
         <i className="fa-solid fa-chart-line"></i> Dashboard
      </Link>
      <Link to="/dashboard/create" className="sidebar-link">
        <i className="fa-solid fa-plus"></i> Create
      </Link>
      <Link to="/dashboard/cards" className="sidebar-link">
        <i className="fa-solid fa-window-maximize"></i> Cards
      </Link>
      <Link to="/dashboard/list" className="sidebar-link">
         <i className="fa-solid fa-rectangle-list"></i> List
      </Link>
      <Link to="/dashboard/manage" className="sidebar-link">
        <i className="fa-solid fa-rectangle-list"></i> Manage Todo
      </Link>
    </div>
  );
}

export default Sidebar;
