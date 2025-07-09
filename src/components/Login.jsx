import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../utils/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("users/login", { email, password });
      localStorage.setItem("token", res.data.accessToken);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      toast.error("Login failed: " + (err.response?.data?.message || "Something went wrong."));
    }
  };
  return (
    <div className="main-container">
      <div className="auth-container">
        
        <form onSubmit={handleSubmit} className="todo-form">
          <h2>User Login</h2>
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
          <button type="submit">Login</button>
          <p style={{ textAlign: "center"}}>
            Don't have an account?{" "}
            <Link to="/register">Create your account</Link>
          </p>
        </form>

        <div className="side-box">
         <div className="overlay-text">
           <h2>Welcome To User <br/> Login</h2>
           
           <p>
             Lorem ipsuing elit. Molomos totam est voluptatum I omos totam est voluptatum i
             ure sit consectetur ill
           </p>
         </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
