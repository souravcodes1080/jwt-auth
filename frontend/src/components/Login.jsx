import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";

import "./css/register.css";
import hero from "../assets/hero.png";
import logo from "../assets/logo.png";
import google from "../assets/google.png";
import github from "../assets/github.png";
import eyeOpen from "../assets/eyeOpen.jpg";
import eyeClose from "../assets/eyeClose.jpg";
import loader from "../assets/loader.png";

function Login() {
  const { loading, setLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["token", "username", "email"]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hide, setHide] = useState(true);

  useEffect(() => {
    if (cookies["token"]) {
      navigate("/dashboard");
    }
  }, []);

  const onSubmitHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    const response = await axios.post("http://localhost:8080/api/user/login", {
      email,
      password,
    });

    if (response.data.success) {
      setCookie("token", response.data.token);
      setCookie("username", response.data.username);
      setCookie("email", response.data.email);
      navigate("/dashboard");
      setLoading(false);
    } else {
      toast.error(response.data.message);
      setLoading(false);
    }
  };
  return (
    <div className="auth">
      <div className="register-page">
        <div className="register-form">
          <div className="register-form-wrapper">
            <img src={logo} alt="" className="logo" />
            <h2>Welcome Back!</h2>
            <p className="desc">Login with your email and get started.</p>
            <form onSubmit={onSubmitHandler} style={{ gap: "15px" }}>
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
                  placeholder="Enter your password"
                />
                <div onClick={() => setHide(!hide)}>
                  {hide ? (
                    <img
                      className="hide"
                      src={eyeClose}
                      alt=""
                      width={"20px"}
                    />
                  ) : (
                    <img className="hide" src={eyeOpen} alt="" width={"20px"} />
                  )}
                </div>
              </div>
              <div className="input-wrapper terms">
                <div>
                  <input type="checkbox" />
                  <label>Remember me</label>
                </div>
                <span>Forgot Password?</span>
              </div>

              <button
                type="submit"
                className={loading ? "loading login-btn" : " login-btn"}
              >
                {loading ? (
                  <img src={loader} className="loader" width={"14px"} />
                ) : (
                  "Login"
                )}
              </button>
              <p>
                Dont't have an account?{" "}
                <span onClick={() => navigate("/")}>Sign Up</span>
              </p>
            </form>
            <div className="or">
              <div></div>
              <p>or</p>
              <div></div>
            </div>

            <button className="google-btn">
              <img src={google} alt="" width={"20px"} />
              Login in with Google
            </button>
            <button className="google-btn">
              {" "}
              <img src={github} alt="" width={"20px"} />
              Login in with Github
            </button>
          </div>
        </div>
        <div className="register-image">
          <img src={hero} alt="hero pic" />
        </div>
      </div>
    </div>
  );
}

export default Login;
