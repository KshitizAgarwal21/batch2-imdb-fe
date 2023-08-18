import { Box } from "@mui/material";
import React from "react";
import Histor from "../History/Histor";

export default function Login() {
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
        <input type="text"></input>
        <br />
        <br />
        <label for="">Password</label>
        <input type="text"></input>
        <br />
        <br />
        <button className="ftr-btn">Sign in</button>
        <img
          src="https://miro.medium.com/v2/resize:fit:1400/1*u0bwdudgoyKjSLntsRcqiw.png"
          className="gsi"
        ></img>
      </Box>
      <Histor />
    </div>
  );
}
