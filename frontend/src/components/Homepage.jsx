import React, { useEffect, useState } from "react";
import "./css/register.css";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import hero from "../assets/hero.png";
import logo from "../assets/logo.png";
import google from "../assets/google.png";
import github from "../assets/github.png";
import eyeOpen from "../assets/eyeOpen.jpg";
import eyeClose from "../assets/eyeClose.jpg";
import OtpInput from "react-otp-input";
import axios from "axios";
import loader from "../assets/loader.png";
import { toast } from "react-toastify";
function Homepage() {
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(["token", "email"]);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hide, setHide] = useState(true);

  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  useEffect(() => {
    if (cookies["token"]) {
      navigate("/dashboard");
    }
  }, []);

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
      
      setCookies("email", email);
      setShowOtp(true);
      // navigate("/verify");
    } else {
      toast.error(response.data.message);
      setLoading(false);
    }
  };

  const onSubmitOtp = async (e) => {
    setLoading(true);
    e.preventDefault();

    const response = await axios.post("http://localhost:8080/api/user/verify", {
      otp: Number(otp),
      email: cookies.email,
    });
    if (response.data.success) {
      
      navigate("/login");
      setLoading(false);
    } else {
      toast.error(response.data.message);
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    setLoading(true);
    const response = await axios.post("http://localhost:8080/api/user/resend", {
      email: cookies.email,
    });
    if (response.data.success) {
      toast.success(response.data.message);
      setLoading(false);
    } else {
      toast.error(response.data.message);
      setLoading(false);
    }
  };
  return (
    <>
      <div className="auth">
        <div className="register-page">
          {showOtp ? (
            <div className="register-form">
              <div className="register-form-wrapper">
                <img src={logo} alt="" className="logo" />
                <h2>Verify Otp</h2>
                <p className="desc">
                  An otp has been sent to your email address.
                </p>
                <form onSubmit={onSubmitOtp}>
                  <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={5}
                    shouldAutoFocus={true}
                    containerStyle={true}
                    className={"otp-input"}
                    inputStyle={true}
                    renderSeparator={<span>&nbsp;&nbsp;</span>}
                    renderInput={(props) => (
                      <input {...props} className="otp-input" />
                    )}
                  />
                  <button type="submit" className={loading ? "loading" : ""}>
                    {loading ? (
                      <img src={loader} className="loader" width={"14px"} />
                    ) : (
                      "Verify"
                    )}
                  </button>
                  <p className="resend" onClick={resendOtp}>
                  {loading ? (
                      <img src={loader} className="loader" width={"14px"} />
                    ) : (
                      "Resend Otp?"
                    )}
                  </p>
                </form>
              </div>
            </div>
          ) : (
            <div className="register-form">
              <div className="register-form-wrapper">
                <img src={logo} alt="" className="logo" />
                <h2>Welcome to Dev!</h2>
                <p className="desc">
                  Register with your email and get started.
                </p>
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
                        <img
                          className="hide"
                          src={eyeClose}
                          alt=""
                          width={"20px"}
                        />
                      ) : (
                        <img
                          className="hide"
                          src={eyeOpen}
                          alt=""
                          width={"20px"}
                        />
                      )}
                    </div>
                  </div>
                  {/* <div className="input-wrapper terms">
                  <div>

                  <input
                    required
                    type="checkbox"
                    placeholder="Create strong password"
                  />
                  <label>agree to terms and condition</label>
                  </div>
                </div> */}

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
          )}

          <div className="register-image">
            <img src={hero} alt="hero pic" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepage;
