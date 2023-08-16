import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
export default function Play() {
  const [play, setPlay] = useState(false);
  const [playbutton, setplaybutton] = useState("Play");
  let { id } = useParams();
  useEffect(() => {
    setplaybutton(play ? "Pause" : "Play");
  }, [play]);

  useEffect(() => {
    console.log("call api with " + id);
  }, []);
  return (
    <div>
      <Box sx={{ width: "70%", textAlign: "center", padding: "40px" }}>
        <ReactPlayer
          url="http://localhost:3000/sample.mov"
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
