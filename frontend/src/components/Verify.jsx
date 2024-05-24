import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import OTPInput from "react-otp-input";
import axios from "axios";

import { toast } from "react-toastify";
import loader from "../assets/loader.png";
import logo from "../assets/logo.png";

function Verify({ setShowOtp }) {
  const { loading, setLoading, email } = useContext(AuthContext);
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const onSubmitOtp = async (e) => {
    setLoading(true);
    e.preventDefault();

    const response = await axios.post("http://localhost:8080/api/user/verify", {
      otp: Number(otp),
      email: email,
    });
    if (response.data.success) {
      navigate("/login");
      toast.success(response.data.message);
      setLoading(false);
    } else {
      toast.error(response.data.message);
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    setLoading(true);
    const response = await axios.post("http://localhost:8080/api/user/resend", {
      email: email,
    });
    if (response.data.success) {
      toast.success(response.data.message);
      // TODO: countdown
      setLoading(false);
    } else {
      toast.error(response.data.message);
      setLoading(false);
    }
  };


  return (
    <div className="register-form">
      <div className="register-form-wrapper">
        <img src={logo} alt="brand-logo" className="logo" />
        <h2>Verify Otp</h2>
        <p className="desc">An otp has been sent to your email address.</p>
        <span className="change" onClick={() => setShowOtp(false)}>
          Change email?
        </span>
        <form onSubmit={onSubmitOtp}>
          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={5}
            shouldAutoFocus={true}
            containerStyle={true}
            className={"otp-input"}
            inputStyle={true}
            renderSeparator={<span>&nbsp;&nbsp;</span>}
            renderInput={(props) => <input {...props} className="otp-input" />}
          />
          <button type="submit" className={loading ? "loading" : ""}>
            {loading ? (
              <img src={loader} className="loader" width={"14px"} />
            ) : (
              "Verify"
            )}
          </button>
          <p className="resend" onClick={resendOtp}>
      Resend Otp?
    </p>
        </form>
      </div>
    </div>
  );
}

export default Verify;
