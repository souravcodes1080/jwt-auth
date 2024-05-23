import axios from "axios";
import React, { useEffect, useState } from "react";
import { Cookies, useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
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

    console.log(typeof otp + " " + cookies.email);
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
      <p>An otp has been sent to your email address.</p>
      <form onSubmit={onSubmitHandler}>
        <input
          type="number"
          placeholder="Enter yor otp"
          onChange={(e) => setOtp(e.target.value)}
          value={otp}
        />
        <button type="submit">Verify</button>
      </form>
    </>
  );
}

export default Verify;
