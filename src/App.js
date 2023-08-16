import logo from "./logo.svg";
import "./App.css";
import Header from "./Components/Header/Header";
import Ad from "./Components/Advertisment/Ad";
import Main from "./Components/Main/Main";
import React, { useState } from "react";
import MovieCarousel from "./Components/MovieCarousel/MovieCarousel";
import ProtectedLayout from "./Components/ProtectedLayout/ProtectedLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import FallbackComp from "./Components/FallbackComp";
import Play from "./Components/Play/Play";
import MainComp from "./Components/MainComp/MainComp";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Ad />

        <Routes>
          <Route path="/" element={<MainComp />}></Route>
          <Route path="/play/:id" element={<Play />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
