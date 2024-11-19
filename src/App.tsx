import React from "react";
import "./App.css";
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Showcase from "./pages/Showcase";
import AndroidClient from "./pages/AndroidClient";

const App: React.FC = () => {
  return (
    <Router>
      {/* <nav>
        <Link to="/">Home</Link> | <Link to="/client">Android Client</Link>
      </nav> */}
      <Routes>
        {/* <Route path="/" element={<Showcase />} /> */}
        <Route path="/" element={<AndroidClient />} />
      </Routes>
    </Router>
  );
};

export default App;
