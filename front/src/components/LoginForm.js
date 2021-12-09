/* 

PAGE BUILT BY: MATTHEW

*/

import "../App.css";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function LoginForm({ setUser }) {
  let navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const [error, setError] = useState("");

  async function handleLogin(event) {
    event.preventDefault();
    setError("");

    if (!userInfo.email) {
      setError("Please input an email address!");
      return;
    }
    if (!userInfo.pwd || userInfo.pwd.length < 6) {
      setError("Password should not be less than 6 characters!");
      return;
    }

    const getInputUser = {
      method: "Post",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfo),
    };

    const rawData = await fetch("/api/login", getInputUser);
    if (rawData.status === 200) {
      const fetchData = await fetch("/api/user/data");
      const res = await fetchData.json();
      setUser(res.username);
      navigate("/products");
    } else {
      const res = await rawData.json();
      setError(res.msg || "Something went wrong, please try again!");
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div className="form-group">
        <div className="mb-3">
          <label htmlFor="Input-Email-Login"> Email Address </label>
          <input
            type="email"
            className="form-control"
            id="Input-Email-Login"
            aria-describedby="emailHelp"
            name="email"
            onChange={(e) => {
              setUserInfo({ ...userInfo, email: e.target.value });
            }}
          />
        </div>
      </div>
      <div className="form-group">
        <div className="mb-3">
          <label htmlFor="Input-Password-Login" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="Input-Password-Login"
            name="pwd"
            onChange={(e) => {
              setUserInfo({ ...userInfo, pwd: e.target.value });
            }}
          />
        </div>
      </div>
      <div className="form-group register-margin headup">
        <div className="mb-3">{error}</div>
      </div>
      <button type="submit" className="btn btn-color btn-block">
        Submit
      </button>
    </form>
  );
}

export default LoginForm;