import logo from "./logo.svg";
import "./App.css";
import Header from "./Components/Header/Header";
import Ad from "./Components/Advertisment/Ad";
import Main from "./Components/Main/Main";
import React, { useState, useEffect } from "react";
import MovieCarousel from "./Components/MovieCarousel/MovieCarousel";
import ProtectedLayout from "./Components/ProtectedLayout/ProtectedLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import FallbackComp from "./Components/FallbackComp";
import Play from "./Components/Play/Play";
import MainComp from "./Components/MainComp/MainComp";
import Footer from "./Components/Footer/Footer";
import Login from "./Components/Login/Login";

function App() {
  const [authButton, setAuthButton] = useState("Sign in");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setAuthButton("Sign Out");
    }
  }, []);
  return (
    <GoogleOAuthProvider clientId="389088782021-n86h8rplmrhivt5kc70rf14q0mn92c60.apps.googleusercontent.com">
      <>
        <BrowserRouter>
          <Header authButton={authButton} />
          <Ad />

          <Routes>
            <Route path="/" element={<MainComp />}></Route>
            <Route path="/play/:id" element={<Play />}></Route>
            <Route
              path="/login"
              element={<Login setAuthButton={setAuthButton} />}
            />
          </Routes>
          <Footer />
        </BrowserRouter>
      </>
    </GoogleOAuthProvider>
  );
}

export default App;
