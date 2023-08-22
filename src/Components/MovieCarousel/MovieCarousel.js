import React, { useEffect, useRef, useState } from "react";
import "./moviecarousel.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Rating from "@mui/material/Rating";
import star from "../../assets/star.png";
import axios from "axios";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};
export default function MovieCarousel(props) {
  const cardelem = useRef();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [movies, setMovies] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const addToWatchlist = async (item) => {
    try {
      const resp = await axios.post(
        "http://localhost:8080/watchlist/addtowatchlist",
        item,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if (resp.status == 200) {
        window.location.reload();
        alert(resp.data.msg);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleBackward = () => {
    // document.getElementById("cards").scrollBy({
    //   top: 100,
    //   left: -1000,
    //   behavior: "smooth",
    // });
    cardelem.current.scrollBy({
      top: 100,
      left: -1000,
      behavior: "smooth",
    });
  };
  const handleForward = () => {
    // document.getElementById("cards").scrollBy({
    //   top: 100,
    //   left: 1000,
    //   behavior: "smooth",
    // });
    console.log(cardelem);
    cardelem.current.scrollBy({
      top: 100,
      left: 1000,
      behavior: "smooth",
    });
  };
  const getMovies = async () => {
    console.log(props);
    if (props.auth == "own") {
      const res = await axios.get(props.api, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      console.log(res.data);
      setMovies(res.data.results);
    } else {
      const res = await axios.get(props.api, {
        headers: {
          Authorization:
            "Bearer " +
            "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlM2JmMzY2NDAwNmY2YzBhMWY0MWNkNWRmYzdlNTgxYSIsInN1YiI6IjY0ZDNhOGYwZGQ5MjZhMDFlYTlkMzhmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.F2M3pNrTSw2w6k8Idhwnd2Chnoojm97Or3WcLck5EkA", //the token is a variable which holds the token
        },
      });
      setMovies(res.data.results);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);
  return (
    <div>
      <h2 style={{ color: "white", marginLeft: "40px" }}>{props.heading}</h2>

      <div className="carousel-container">
        <button className="moviecar-nav-left" onClick={handleBackward}>
          {"<"}
        </button>
        <button className="moviecar-nav-right" onClick={handleForward}>
          {">"}
        </button>
        <div className="cards" ref={cardelem}>
          {movies?.map((elem, index) => {
            return (
              <>
                {" "}
                <div className="card">
                  <button
                    className="overlay"
                    onClick={() => {
                      addToWatchlist(elem);
                    }}
                  >
                    +
                  </button>
                  <img
                    src={`https://image.tmdb.org/t/p/w185` + elem.poster_path}
                  ></img>
                  <div className="movie-details">
                    <span>⭐️ {elem.vote_average}</span>{" "}
                    <span onClick={handleOpen}>Rate</span>
                    <p className="movie-title">
                      {index + 1}. {elem.original_title}
                    </p>
                    <button className="add">+ Watchlist</button>
                    <br></br>
                    <button className="watchtrailer">Trailer</button>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img src={star} className="rating-star"></img>
          <span className="rating-star-value">{value}</span>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Rate This
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Oppenheimer
          </Typography>
          <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
          <button className="rate">Rate</button>
        </Box>
      </Modal>
    </div>
  );
}
