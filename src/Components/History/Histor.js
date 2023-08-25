import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { color } from "@mui/system";
export default function Histor() {
  const [cookieMovies, setCookieMovies] = useState([]);
  useEffect(() => {
    if (Cookies.get("history")) {
      console.log(JSON.parse(Cookies.get("history")));
      setCookieMovies(JSON.parse(Cookies.get("history")));
    }
  }, []);

  return (
    <div style={{ display: "flex" }}>
      {cookieMovies?.map((elem) => {
        return (
          <>
            <div>
              <p style={{ color: "white", marginLeft: "20px" }}>{elem.title}</p>
              <img
                style={{ marginLeft: "20px" }}
                src={`https://image.tmdb.org/t/p/w185` + elem.poster_path}
              ></img>
            </div>
          </>
        );
      })}
    </div>
  );
}
