import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useParams } from "react-router-dom";
import CustomerDetails from "../components/CustomerDetails";

const Customers = () => {
  const [customers, setCustomers] = useState([]);

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
            <Link to={`${customer.id}`}>{customer.name}</Link>
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
