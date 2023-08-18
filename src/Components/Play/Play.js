import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
export default function Play() {
  const [play, setPlay] = useState(false);
  const [playbutton, setplaybutton] = useState("Play");
  const [videokey, setVideoKey] = useState();
  let { id } = useParams();
  useEffect(() => {
    setplaybutton(play ? "Pause" : "Play");
  }, [play]);

  const getMovieTrailer = async () => {
    const resp = await axios.get(
      "https://api.themoviedb.org/3/movie/" + id + "/videos?language=en-US",
      {
        headers: {
          Authorization:
            "Bearer " +
            "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlM2JmMzY2NDAwNmY2YzBhMWY0MWNkNWRmYzdlNTgxYSIsInN1YiI6IjY0ZDNhOGYwZGQ5MjZhMDFlYTlkMzhmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.F2M3pNrTSw2w6k8Idhwnd2Chnoojm97Or3WcLck5EkA", //the token is a variable which holds the token
        },
      }
    );
    var movie = resp.data.results.filter((elem) => {
      return elem.type === "Trailer" && elem.name === "Official Trailer";
    });

    setVideoKey(movie[0].key);
  };

  useEffect(() => {
    getMovieTrailer();
  }, []);
  return (
    <div>
      <Box sx={{ width: "70%", textAlign: "center", padding: "40px" }}>
        <ReactPlayer
          url={"https://youtube.com/watch?v=" + videokey}
          playing={play}
          width="100%"
          height="500px"
          controls={true}
          // onStart={() => setPlay(true)}
          // onPause={() => setPlay(!play)}
        />
        <button
          onClick={() => {
            setPlay(!play);
            setplaybutton(!play ? "Pause" : "Play");
          }}
          className="playpause"
        >
          {playbutton}
        </button>
      </Box>
    </div>
  );
}
