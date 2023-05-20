import React from "react";
import Main from "./components/Main.jsx";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Stations from "./components/Stations.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/stations" element={<Stations />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;