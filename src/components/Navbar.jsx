import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


function Navbar({ toggleSidebar }) {
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

   useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData?.fullName) {
      setUserName(userData.fullName);
    }
  }, []);

  const toggleDropdown = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
  localStorage.removeItem("token");
  navigate("/login");
};
  

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="toggle-btn" onClick={toggleSidebar}>
          <i className="fa-solid fa-bars"></i>
        </button>
        <h4>Todo App</h4>
      </div>

      <div className="navbar-right">
        <span className="username">Welcome, {userName}</span>
        <img
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          alt="Profile"
          className="profile-icon"
          onClick={toggleDropdown}
        />
        {open && (
          <div className="dropdown">
            <div className="arrow-up"></div> 
            <button onClick={handleLogout} className="logout-button">
              <i className="fa-solid fa-right-from-bracket"></i>
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
