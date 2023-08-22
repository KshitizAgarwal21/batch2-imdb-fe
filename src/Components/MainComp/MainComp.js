import React, { useEffect, useState } from "react";
import MovieCarousel from "../MovieCarousel/MovieCarousel";
import Main from "../Main/Main";
import FallbackComp from "../FallbackComp";
import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedLayout from "../ProtectedLayout/ProtectedLayout";
import Footer from "../Footer/Footer";
const Explore = React.lazy(() => import("../Explore/Explore"));
export default function MainComp() {
  return (
    <div>
      <Main />
      <h1 style={{ color: "yellow", marginLeft: "40px" }}>What to watch</h1>

      <MovieCarousel
        heading="Top Picks"
        api="https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1"
        auth="tmdb"
      ></MovieCarousel>
      <Routes>
        <Route path="/" element={<ProtectedLayout />}>
          <Route
            path="/"
            element={
              <MovieCarousel
                heading="From Your Watchlist"
                api="http://localhost:8080/watchlist/mywatchlist"
                auth="own"
              />
            }
          ></Route>
        </Route>
      </Routes>
      <MovieCarousel
        heading="Popular"
        api="https://api.themoviedb.org/3/movie/popular?language=en-US&page=1"
        auth="tmdb"
      ></MovieCarousel>
      <Suspense fallback={<FallbackComp />}>
        <Explore />
      </Suspense>
    </div>
  );
}
