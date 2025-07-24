import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";

import Home from "./pages/Home";
import Customers from "./pages/Customers";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <NavLink
            to="/"
            end
            style={({ isActive }) => ({
              padding: "8px",
              backgroundColor: isActive ? "#ddd" : "#f5f5f5",
            })}
          >
            Home
          </NavLink>
          <NavLink
            to="/customers"
            style={({ isActive }) => ({
              padding: "8px",
              backgroundColor: isActive ? "#ddd" : "#f5f5f5",
            })}
          >
            Customers
          </NavLink>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/customers/*" element={<Customers />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
