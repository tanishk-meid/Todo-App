import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Todomanager from "./components/Todomanager";
import Layout from "./components/Layout";
import Cards from "./components/Cards";
import List from "./components/List";
import Managecards from "./components/Managecards";
import Dashboard from "./components/Dashboard";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/*  Wrap protected routes inside Layout */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        {/*  Pages shown inside <Outlet /> */}
        <Route index element={<Dashboard />} />
        <Route path="create" element={<Todomanager />} />
        <Route path="cards" element={<Cards />} />
        <Route path="list" element={<List />} />
        <Route path="manage" element={<Managecards />} />
      </Route>
    </Routes>
  );
}

