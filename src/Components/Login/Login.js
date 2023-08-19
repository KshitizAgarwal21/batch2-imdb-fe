import { Box } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Histor from "../History/Histor";

export default function Login() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData((prev) => {
      setFormData({ ...prev, [e.target.name]: e.target.value });
    });
  };
  const handleSignin = async () => {
    const resp = await axios.post(
      "http://localhost:8080/login/loginapi",
      formData
    );
    localStorage.setItem("token", resp.data.token);
    navigate("/");
  };
  return (
    <div>
      <Box
        sx={{
          margin: "0 auto",
          width: "fit-content",
          height: "400px",
          borderRadius: "20px",
          border: "1px solid yellow",
          marginTop: "30px",
          background: "#fff",
          boxSizing: "border-box",
          padding: "45px",
        }}
      >
        <h2>Sign in</h2>
        <label for="">Email</label>
        <input
          type="text"
          onChange={(e) => handleChange(e)}
          name="username"
        ></input>
        <br />
        <br />
        <label for="">Password</label>
        <input
          type="text"
          onChange={(e) => handleChange(e)}
          name="password"
        ></input>
        <br />
        <br />
        <button className="ftr-btn" onClick={handleSignin}>
          Sign in
        </button>
        <img
          src="https://miro.medium.com/v2/resize:fit:1400/1*u0bwdudgoyKjSLntsRcqiw.png"
          className="gsi"
        ></img>
      </Box>
      <Histor />
    </div>
  );
}
