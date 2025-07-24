import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import CustomerDetails from "../components/CustomerDetails";
import { useSelector } from "react-redux";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const favorites = useSelector((state) => state.favorites);

  useEffect(() => {
    fetch("http://localhost:3001/customers")
      .then((res) => res.json())
      .then((data) => setCustomers(data));
  }, []);

  return (
    <div>
      <h2>Customers</h2>
      <ul>
        {customers.map((customer) => (
          <li key={customer.id}>
            <Link
              to={`${customer.id}`}
              style={{ fontWeight: favorites[customer.id] ? "bold" : "normal" }}
            >
              {customer.name}
            </Link>
          </li>
        ))}
      </ul>

      <Routes>
        <Route path=":id" element={<CustomerDetails />} />
        <Route path="" element={<p>Customer Home</p>} />
      </Routes>
    </div>
  );
};

export default Customers;
