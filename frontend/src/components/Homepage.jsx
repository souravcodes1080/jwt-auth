import React, { useEffect } from 'react'
import "./components.css"
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie';
function Homepage() {
    const navigate = useNavigate();
    const [cookie] = useCookies(['token'])
    useEffect(()=>{
      if(cookie['token']){
        navigate("/dashboard")
      }
    }, [])
  return (
    <>
        <div className="homepage-wrapper">
            <button className='signup-btn' onClick={()=>navigate('/register')}>Sign Up</button>
            <button className='login-btn' onClick={()=>navigate('/login')}>Login</button>
        </div>
    </>
  )
}

export default Homepage