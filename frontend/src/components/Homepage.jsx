import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import Verify from "./Verify";
import Register from "./Register";

import "./css/register.css";
import hero from "../assets/hero.png";

function Homepage() {
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(["token"]);

  const [showOtp, setShowOtp] = useState(false);

  useEffect(() => {
    if (cookies["token"]) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <>
      <div className="auth">
        <div className="register-page">
          {showOtp ? (
            <Verify setShowOtp={setShowOtp} />
          ) : (
            <Register setShowOtp={setShowOtp} />
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
