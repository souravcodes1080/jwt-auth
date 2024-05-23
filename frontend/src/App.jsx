import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Routes, Route} from "react-router-dom"
import Homepage from './components/Homepage'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
function App() {
  return (
    <div className='app-container'>
      <Routes>
        <Route path="/" exact element={<Homepage/>}/>
        <Route path="/login" exact element={<Login/>}/>
        <Route path="/register" exact element={<Register/>}/>
        <Route path="/dashboard" exact element={<Dashboard/>}/>
      </Routes>
      <ToastContainer />
    </div>
    
  )
}

export default App