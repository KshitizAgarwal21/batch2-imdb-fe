import React, { useEffect, useState } from "react";
import "./main.css";
import axios from "axios";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { useNavigate } from "react-router-dom";
export default function Main() {
  const [moviearr, setMovieArr] = useState([]);
  const [moviearr2, setMovieArr2] = useState([]);
  const [i, setI] = useState(1);
  const [currentMovie, setCurrentMovie] = useState({});
  const navigate = useNavigate();
  const handleForward = () => {
    if (moviearr.indexOf(currentMovie) == moviearr.length - 1) {
      setCurrentMovie(moviearr[0]);
      setI(0);
    } else if (moviearr.indexOf(currentMovie) == moviearr.length - 2) {
      setCurrentMovie(moviearr[moviearr.indexOf(currentMovie) + 1]);
      setI(0);
    } else {
      setCurrentMovie(moviearr[moviearr.indexOf(currentMovie) + 1]);
      setI(moviearr.indexOf(currentMovie) + 2);
    }
  };
  const handleBackward = () => {
    if (moviearr.indexOf(currentMovie) == 0) {
      setCurrentMovie(moviearr[moviearr.length - 1]);
      setI(0);
    } else if (moviearr.indexOf(currentMovie) == 1) {
      setCurrentMovie(moviearr[0]);
      setI(0);
    } else {
      setCurrentMovie(moviearr[moviearr.indexOf(currentMovie) - 1]);
      console.log(moviearr);

      setI(moviearr.indexOf(currentMovie) + 1);
    }
  };
  function handleVideo(elem) {
    navigate("/play/" + elem);
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
          src={`https://image.tmdb.org/t/p/w1280/` + currentMovie.poster_path}
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
              handleVideo(currentMovie.id);
            }}
          />{" "}
          {/* </a> */}
          <h1>{currentMovie.title}</h1>
        </div>
      </div>
      <div className="vertical-carousel">
        <h2>Up Next</h2>

        {moviearr2
          .slice(i, moviearr2.length)
          .filter((elem, index) => index < 3)
          .map((elem) => {
            return (
              <>
                <div className="vertical-movie">
                  <div className="poster">
                    <img
                      src={`https://image.tmdb.org/t/p/w92` + elem.poster_path}
                    ></img>
                  </div>
                  <div className="details">
                    <PlayCircleOutlineIcon style={{ fontSize: "40px" }} />
                    <p>{elem.original_title}</p>
                    <p>{elem.release_date}</p>
                  </div>
                </div>
              </>
            );
          })}
      </div>
    </div>
  );
}
