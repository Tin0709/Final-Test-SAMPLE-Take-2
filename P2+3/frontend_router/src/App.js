import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import Home from "./pages/Home";
import Customers from "./pages/Customers";
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            Home
          </NavLink>
          <NavLink
            to="/customers"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            Customers
          </NavLink>
        </nav>

        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/customers/*" element={<Customers />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
