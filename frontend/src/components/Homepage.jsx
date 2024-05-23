import React, { useEffect, useState } from "react";
import "./components.css";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import hero from "../assets/hero.png";
import logo from "../assets/logo.png";
import google from "../assets/google.png";
import github from "../assets/github.png";
import axios from "axios";
import { toast } from "react-toastify";
function Homepage() {
  const navigate = useNavigate();
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
    const response = await axios.post(
      "http://localhost:8080/api/user/register",
      {
        username,
        email,
        password,
      }
    );

    if (response.data.success) {
      toast.success(response.data.message);
      setCookies("email", email);
      navigate("/verify");
    } else {
      toast.error(response.data.message);
    }
  };
  return (
    <>
      <div className="auth">
        <div className="register-page">
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
                    required
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create strong password"
                  />
                </div>
                <div className="input-wrapper terms">
                  <input
                    required
                    type="checkbox"
                    placeholder="Create strong password"
                  />
                  <label>agree to terms and condition</label>
                </div>

                <button type="submit">Register</button>
              </form>
              <div className="or">
                <div></div>
                <p>or</p>
                <div></div>
              </div>

              <button className="google-btn" >
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
          <div className="register-image">
            <img src={hero} alt="hero pic" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepage;
