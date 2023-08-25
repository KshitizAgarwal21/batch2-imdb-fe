import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { GoogleLogin } from "@leecheuk/react-google-login";
import { GoogleLogin } from "@react-oauth/google";
import Histor from "../History/Histor";
import Cookies from "js-cookie";

export default function Login(props) {
  const [formData, setFormData] = useState({});

  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData((prev) => {
      setFormData({ ...prev, [e.target.name]: e.target.value });
    });
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  const sendToken = async (token) => {
    const resp = await axios.post("http://localhost:8080/login/oauth", {
      token: token.credential,
    });

    if (
      (resp.status == 200 && resp.data.msg == "Already verified user") ||
      resp.data.msg == "oauth successfull"
    ) {
      localStorage.setItem("token", resp.data.token);

      navigate("/");
    }
  };
  const handleSignin = async () => {
    const resp = await axios.post(
      "http://localhost:8080/login/loginapi",
      formData
    );
    localStorage.setItem("token", resp.data.token);
    props.setAuthButton("Sign out");
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
        {/* <img
          src="https://miro.medium.com/v2/resize:fit:1400/1*u0bwdudgoyKjSLntsRcqiw.png"
          className="gsi"
        ></img> */}
        <GoogleLogin
          onSuccess={(credentialResponse) => sendToken(credentialResponse)}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </Box>
      <Histor />
    </div>
  );
}
