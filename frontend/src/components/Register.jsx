import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast } from "react-toastify";
function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [cookies, setCookies] = useCookies(["token", "email"]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (cookies["token"]) {
      navigate("/dashboard");
    }
  }, []);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true)
    const response = await axios.post(
      "http://localhost:8080/api/user/register",
      {
        username,
        email,
        password,
      }
    );

    if (response.data.success) {
        // toast.success(response.data.message)
        setCookies("email", email)
      navigate("/verify");
    }else{
        toast.error(response.data.message)
    }
    setLoading(false)
  };
  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={onSubmitHandler}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
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
        <button type="submit" className={`${loading} ? loading: null`}>Register</button>
      </form>
      <p>
        Already have an account?{" "}
        <span onClick={() => navigate("/login")}>Login</span>
      </p>
    </>
  );
}

export default Register;
