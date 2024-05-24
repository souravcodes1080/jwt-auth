import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" exact element={<Homepage />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/dashboard" exact element={<Dashboard />} />
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
    </div>
  );
}

export default App;
