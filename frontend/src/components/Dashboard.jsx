import axios from "axios";
import React, { useEffect, useState } from "react";
import { Cookies, useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["token", "email"]);

  const [data, setData] = useState([]);

  const fetchData = async () => {
    const response = await axios.get("http://localhost:8080/api/user", {
      headers: {
        "x-auth-token": cookies["token"],
      },
    });

    if (response.data.success) {
      setData(response.data.users);
    }
  };

  const handleLogout = () => {
    removeCookie(["token"]);
    removeCookie(["email" ]);
    removeCookie(["username" ]);
    navigate("/");
  };

  useEffect(() => {
    if (!cookies["token"]) {
      navigate("/");
    }
    fetchData();
  }, []);
  return (
    <>
      <h1>Dashboard</h1>
      <h3>Welcome {cookies.username}</h3>
      {data.map((user, index) => (
        <div key={index}>{user.username}</div>
      ))}
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </>
  );
}

export default Dashboard;
