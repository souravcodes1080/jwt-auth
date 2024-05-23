import axios from "axios";
import React, { useEffect, useState } from "react";
import { Cookies, useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import { toast } from "react-toastify";

function Verify() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [cookies] = useCookies(["token", "email"]);
  useEffect(() => {
    if (cookies["token"]) {
      navigate("/dashboard");
    } else if (!cookies["email"]) {
      navigate("/register");
    }
  }, []);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    
    const response = await axios.post("http://localhost:8080/api/user/verify", {
      otp: Number(otp),
      email: cookies.email,
    });
    if (response.data.success) {
      toast.success(response.data.message);

      navigate("/login");
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <>
      <h1>Verify</h1>
      <p>An otp has been sent to your email address. {cookies.email}</p>
      <form onSubmit={onSubmitHandler}>
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={5}
          renderSeparator={<span>&nbsp;&nbsp;</span>}
          renderInput={(props) => <input {...props} />}
        />
        <button type="submit">Verify</button>
      </form>
    </>
  );
}

export default Verify;
