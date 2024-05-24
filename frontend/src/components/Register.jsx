import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import logo from "../assets/logo.png";
import google from "../assets/google.png";
import github from "../assets/github.png";
import eyeOpen from "../assets/eyeOpen.jpg";
import eyeClose from "../assets/eyeClose.jpg";
import loader from "../assets/loader.png";
import { toast } from "react-toastify";

function Register({ setShowOtp }) {

  const { loading, setLoading, email, setEmail } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hide, setHide] = useState(true);

  useEffect(() => {
    console.log(email);
  }, [email]);
  const onSubmitHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:8080/api/user/register",
      {
        username,
        email,
        password,
      }
    );
    if (response.data.success) {
      setLoading(false);
      setShowOtp(true);
    } else {
      toast.error(response.data.message);
      setLoading(false);
    }
  };

  return (
    <div className="register-form">
      <div className="register-form-wrapper">
        <img src={logo} alt="" className="logo" />
        <h2>Welcome to Dev!</h2>
        <p className="desc">Register with your email and get started.</p>
        <form onSubmit={onSubmitHandler}>
          <div className="input-wrapper">
            <label>Username*</label>
            <input
              required
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
            />
          </div>
          <div className="input-wrapper">
            <label>Email*</label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
            />
          </div>
          <div className="input-wrapper">
            <label>Password*</label>
            <input
              className="password"
              required
              type={hide ? "password" : "text"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create strong password"
            />
            <div onClick={() => setHide(!hide)}>
              {hide ? (
                <img className="hide" src={eyeClose} alt="" width={"20px"} />
              ) : (
                <img className="hide" src={eyeOpen} alt="" width={"20px"} />
              )}
            </div>
          </div>
          <button type="submit" className={loading ? "loading" : ""}>
            {loading ? (
              <img src={loader} className="loader" width={"14px"} />
            ) : (
              "Register"
            )}
          </button>
          <p>
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}>Log In</span>
          </p>
        </form>
        <div className="or">
          <div></div>
          <p>or</p>
          <div></div>
        </div>

        <button className="google-btn">
          <img src={google} alt="" width={"20px"} />
          Sign in with Google
        </button>
        <button className="google-btn">
          {" "}
          <img src={github} alt="" width={"20px"} />
          Sign in with Github
        </button>
      </div>
    </div>
  );
}

export default Register;
