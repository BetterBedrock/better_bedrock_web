import React from "react";
import "./App.css";
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Showcase from "./pages/Showcase";
import AndroidClient from "./pages/AndroidClient";
import Home from "./pages/Home";
import Loading from "./pages/Loading";
import Download from "./pages/Download";
import FAQ from "./pages/FAQ";

const App: React.FC = () => {
  return (
    <Router>
      {/* <nav>
        <Link to="/">Home</Link> | <Link to="/client">Android Client</Link>
      </nav> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="loading" element={<Loading />} />
        <Route path="showcase" element={<Showcase />} />
        <Route path="client" element={<AndroidClient />} />
        <Route path="download" element={<Download />} />
        <Route path="faq" element={<FAQ />} />
      </Routes>
    </Router>
  );
};

export default App;
