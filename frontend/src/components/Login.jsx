import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie'
import { toast } from "react-toastify";
function Login() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['token']);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

    useEffect(()=>{
        if(cookies['token']){
            navigate("/dashboard")
        }
    }, [])

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:8080/api/user/login", {
      email,
      password,
    });

    if (response.data.success) {
      setCookie('token', response.data.token)
      toast.success(response.data.message)
      navigate("/dashboard")
    } else {
        toast.error(response.data.message)
     
    }
  };
  return (
    <>
      <h1>Login</h1>
      <form action="" onSubmit={onSubmitHandler}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account?{" "}
        <span onClick={() => navigate("/register")}>Register</span>
      </p>
    </>
  );
}

export default Login;
