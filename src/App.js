import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/Home";
import SearchPage from "./Pages/SearchPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={ <HomePage/>}
        />
        <Route
          path="/search-results"
          element={<SearchPage/>}
        />
      </Routes>
    </>
  );
};

export default App;
