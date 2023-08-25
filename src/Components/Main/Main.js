import React, { useEffect, useState } from "react";
import "./main.css";
import axios from "axios";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
let myinterval;
let historyItems = [];
export default function Main() {
  const [moviearr, setMovieArr] = useState([]);
  const [moviearr2, setMovieArr2] = useState([]);
  const [arr, setArr] = useState([1, 2, 3]);
  const [i, setI] = useState(1);
  const [currentMovie, setCurrentMovie] = useState({});
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  let autoupdate = () => {
    setIndex((prev) => prev + 1);
    setI((prev) => prev + 1);
    // setCurrentMovie((prev) => moviearr[moviearr.indexOf(prev) + 1]);
  };

  useEffect(() => {
    if (index > moviearr.length - 1) {
      setIndex(0);
      setI(1);
    }
    if (index < 0) {
      setIndex(moviearr.length - 1);
    }
  }, [index]);
  const handleForward = () => {
    clearInterval(myinterval);
    if (index == moviearr.length - 1) {
      setIndex(0);
    } else {
      setIndex((prev) => prev + 1);
    }
  };
  const handleBackward = () => {
    clearInterval(myinterval);
    if (index == 0) {
      setIndex(-1);
    } else {
      setIndex((prev) => prev - 1);
    }
  };
  function handleVideo(elem) {
    if (Cookies.get("history")) {
      const oldItems = JSON.parse(Cookies.get("history"));

      historyItems = [...oldItems];
      historyItems.push({ title: elem.title, poster_path: elem.poster_path });
      console.log(historyItems);
      Cookies.set("history", JSON.stringify(historyItems));
    } else {
      historyItems.push({ title: elem.title, poster_path: elem.poster_path });
      Cookies.set("history", JSON.stringify(historyItems));
    }

    navigate("/play/" + elem.id);
  }

  const getMovies = async () => {
    const res = await axios.get(
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
      {
        headers: {
          Authorization:
            "Bearer " +
            "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlM2JmMzY2NDAwNmY2YzBhMWY0MWNkNWRmYzdlNTgxYSIsInN1YiI6IjY0ZDNhOGYwZGQ5MjZhMDFlYTlkMzhmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.F2M3pNrTSw2w6k8Idhwnd2Chnoojm97Or3WcLck5EkA", //the token is a variable which holds the token
        },
      }
    );
    setMovieArr(res.data.results);
    setMovieArr2(res.data.results);
    setCurrentMovie(res.data.results[0]);
  };
  useEffect(() => {
    myinterval = setInterval(autoupdate, 1000);
  }, []);
  useEffect(() => {
    getMovies();

    // setCurrentMovie(movies[0]);
  }, []);
  return (
    <div className="main-container">
      <div className="horizontal-carousel">
        <button className="car-nav-left" onClick={handleBackward}>
          {"<"}
        </button>
        <img
          src={
            `https://image.tmdb.org/t/p/w1280/` + moviearr[index]?.poster_path
          }
          className="banner"
        ></img>
        <button className="car-nav-right" onClick={handleForward}>
          {">"}
        </button>
        <div className="title">
          {/* <a href={currentMovie.video_link}> */}
          <PlayCircleOutlineIcon
            style={{ fontSize: "60px" }}
            onClick={() => {
              handleVideo(moviearr[index]);
            }}
          />{" "}
          {/* </a> */}
          <h1>{moviearr[index]?.title}</h1>
        </div>
      </div>
      <div className="vertical-carousel">
        <h2>Up Next</h2>
        {index != moviearr.length - 1 && (
          <>
            {index >= moviearr.length - 3 && index <= moviearr.length - 1 && (
              <>
                <div className="vertical-movie">
                  <div className="poster">
                    <img
                      src={
                        `https://image.tmdb.org/t/p/w92` +
                        moviearr[0]?.poster_path
                      }
                    ></img>
                  </div>
                  <div className="details">
                    <PlayCircleOutlineIcon style={{ fontSize: "40px" }} />
                    <p>{moviearr[0]?.original_title}</p>
                    <p>{moviearr[0]?.release_date}</p>
                  </div>
                </div>
                <div className="vertical-movie">
                  <div className="poster">
                    <img
                      src={
                        `https://image.tmdb.org/t/p/w92` +
                        moviearr[1]?.poster_path
                      }
                    ></img>
                  </div>
                  <div className="details">
                    <PlayCircleOutlineIcon style={{ fontSize: "40px" }} />
                    <p>{moviearr[1]?.original_title}</p>
                    <p>{moviearr[1]?.release_date}</p>
                  </div>
                </div>
                <div className="vertical-movie">
                  <div className="poster">
                    <img
                      src={
                        `https://image.tmdb.org/t/p/w92` +
                        moviearr[2]?.poster_path
                      }
                    ></img>
                  </div>
                  <div className="details">
                    <PlayCircleOutlineIcon style={{ fontSize: "40px" }} />
                    <p>{moviearr[2]?.original_title}</p>
                    <p>{moviearr[2]?.release_date}</p>
                  </div>
                </div>
              </>
            )}
            {index >= 0 && index < moviearr.length - 3 && (
              <>
                {" "}
                <div className="vertical-movie">
                  <div className="poster">
                    <img
                      src={
                        `https://image.tmdb.org/t/p/w92` +
                        moviearr[index + 1]?.poster_path
                      }
                    ></img>
                  </div>
                  <div className="details">
                    <PlayCircleOutlineIcon style={{ fontSize: "40px" }} />
                    <p>{moviearr[index + 1]?.original_title}</p>
                    <p>{moviearr[index + 1]?.release_date}</p>
                  </div>
                </div>
                <div className="vertical-movie">
                  <div className="poster">
                    <img
                      src={
                        `https://image.tmdb.org/t/p/w92` +
                        moviearr[index + 2]?.poster_path
                      }
                    ></img>
                  </div>
                  <div className="details">
                    <PlayCircleOutlineIcon style={{ fontSize: "40px" }} />
                    <p>{moviearr[index + 2]?.original_title}</p>
                    <p>{moviearr[index + 2]?.release_date}</p>
                  </div>
                </div>
                <div className="vertical-movie">
                  <div className="poster">
                    <img
                      src={
                        `https://image.tmdb.org/t/p/w92` +
                        moviearr[index + 3]?.poster_path
                      }
                    ></img>
                  </div>
                  <div className="details">
                    <PlayCircleOutlineIcon style={{ fontSize: "40px" }} />
                    <p>{moviearr[index + 3]?.original_title}</p>
                    <p>{moviearr[index + 3]?.release_date}</p>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
