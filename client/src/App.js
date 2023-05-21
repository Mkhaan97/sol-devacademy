import React from "react";
import MainPage from "./pages/MainPage";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SecondPage from "./pages/SecondPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/stations" element={<SecondPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;