import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPanel from "./Components/AdminPanel";
import UserView from "./Components/UserView";
import BidsManagement from "./Components/BidsManagement";
import "./App.css";
import Home from "./Components/Home";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/user" element={<UserView />} />
          <Route path="/bids" element={<BidsManagement />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;