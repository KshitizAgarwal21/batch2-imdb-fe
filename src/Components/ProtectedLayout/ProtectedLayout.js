import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { isExpired, decodeToken } from "react-jwt";
export default function ProtectedLayout() {
  const [isLoggedin, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const now = Math.floor(Date.now() / 1000);
    if (localStorage.getItem("token")) {
      if (isExpired(localStorage.getItem("token"))) {
      } else {
        setLoggedIn(true);
      }
    }
  }, []);
  return (
    <div>
      {isLoggedin ? (
        <>
          <Outlet />
        </>
      ) : (
        <>
          <h2 style={{ color: "white", marginLeft: "40px" }}>
            From Your Watchlist {">"}
          </h2>
          <div className="unauth">
            <AddBoxIcon style={{ color: "#fff" }} />
            <p>Sign in to access your Watchlist</p>
            <p>
              Save shows and movies to keep track of what you want to watch.
            </p>
            <button className="signin" onClick={() => navigate("/login")}>
              Sign in to IMDB
            </button>
          </div>
        </>
      )}
    </div>
  );
}
