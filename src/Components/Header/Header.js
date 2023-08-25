import React, { useEffect, useState } from "react";
import "./header.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 100,
  height: 100,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function Header(props) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  return (
    <div>
      <header>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/575px-IMDB_Logo_2016.svg.png"
          className="logo"
        ></img>
        <Button onClick={handleOpen} style={{ color: "#fff" }}>
          Menu
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="menubox">
            <div className="menubox-header">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/575px-IMDB_Logo_2016.svg.png"
                className="logo"
              ></img>
              <span
                onClick={() => {
                  setOpen(false);
                }}
                className="close"
              >
                X
              </span>
            </div>
            <div className="menubox-body">
              <div className="content">
                <h3>Movies</h3>
                <p>Item 1</p>
                <p>Item 2</p>
              </div>
              <div className="content">
                <h3>TV Shows</h3>
                <p>Item 1</p>
                <p>Item 2</p>
              </div>
              <div className="content">
                <h3>Awards and Events</h3>
                <p>Item 1</p>
                <p>Item 2</p>
              </div>
              <div className="content">
                <h3>Celebs</h3>
                <p>Item 1</p>
                <p>Item 2</p>
              </div>
              <div className="content">
                <h3>Community</h3>
                <p>Item 1</p>
                <p>Item 2</p>
              </div>
              <div className="content">
                <h3>Watch</h3>
                <p>Item 1</p>
                <p>Item 2</p>
              </div>
            </div>
          </Box>
        </Modal>
        <select className="search-select">
          <option>All</option>
          <option>Title</option>
        </select>
        <input className="search" type="text" placeholder="Search IMDB"></input>

        <button className="watchlist">+WatchList</button>
        <button
          className="watchlist"
          onClick={() => {
            if (localStorage.getItem("token")) {
              localStorage.removeItem("token");
              Cookies.remove("history");
              window.location.reload();
            } else {
              navigate("/login");
            }
          }}
        >
          {props.authButton}
        </button>
        <select className="language-select">
          <default>EN</default>
          <option>EN</option>
          <option>Hi</option>
        </select>
      </header>
    </div>
  );
}
