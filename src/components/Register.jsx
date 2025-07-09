import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../utils/api";

function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("users/create", {fullName, email, password });
      toast.success("Account created successfully!")
      navigate("/login");
    } catch (err) {
      toast.error(
        "Registration failed: " +
          (err.response?.data?.message || "Something went wrong.")
      );
    }
  };

  return (
    <div className="main-container">
      <div className="auth-container">
        <form onSubmit={handleSubmit} className="todo-form">
          <h2>User Register</h2>
           <div className="input-icon-container">
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              required
              onChange={(e) => setFullName(e.target.value)}
            />
            <i className="fa-solid fa-user input-icon-right"></i>
          </div>
          <div className="input-icon-container">
            <input
              type="email"
              placeholder="Email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <i className="fa-solid fa-user input-icon-right"></i>
          </div>

          <div className="input-icon-container">
            <input
              type="password"
              placeholder="Password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <i className="fa-solid fa-key input-icon-right"></i>
          </div>

          <button type="submit">Register</button>
          <p style={{ textAlign: "center" }}>
            if you have an account?{" "}
            <Link to="/login">Login your account</Link>
          </p>
        </form>

        <div className="side-box">
          <div className="overlay-text">
            <h2>Welcome To User <br/> Registration </h2>
            <p>
              Lorem ipsuing elit. Molomos totam est voluptatum i omos totam est voluptatum i
              ure sit consectetur ill
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
