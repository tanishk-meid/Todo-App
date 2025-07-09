
import AllRoutes from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css';

function App() {
  return (
    <>
      <AllRoutes />
      <ToastContainer position="top-right" autoClose={1000} closeButton={false} />
    </>
  );
}

export default App;
